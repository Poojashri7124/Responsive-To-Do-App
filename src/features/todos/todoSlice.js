import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import {
  getTodos,
  addTodo as apiAddTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
} from '../../api.js'

/* ---------- Thunks: each one calls json-server ---------- */

// GET
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  return await getTodos()
})

// POST - todo = { text, priority, dueDate }
export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  return await apiAddTodo({ ...todo, completed: false })
})

// PATCH completed - we only get the id, so read the current value from the store
export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (id, { getState }) => {
    const todo = getState().todos.items.find((t) => t.id === id)
    return await apiUpdateTodo(id, { completed: !todo.completed })
  }
)

// PATCH any fields (edit text, priority, due date...) - arg = { id, changes }
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, changes }) => {
    return await apiUpdateTodo(id, changes)
  }
)

// DELETE - returns the id so the reducer knows what to remove
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await apiDeleteTodo(id)
  return id
})

// DELETE every completed todo on the server
export const clearCompleted = createAsyncThunk(
  'todos/clearCompleted',
  async (_, { getState }) => {
    const completed = getState().todos.items.filter((t) => t.completed)
    const results = await Promise.allSettled(
      completed.map((t) => apiDeleteTodo(t.id))
    )

    // only the ids the server really deleted
    const deletedIds = completed
      .filter((t, i) => results[i].status === 'fulfilled')
      .map((t) => t.id)

    return { deletedIds, failedCount: completed.length - deletedIds.length }
  }
)

/* ---------- Slice ---------- */

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  // The list only changes in the "fulfilled" cases = after the server answered.
  // (state.items.push is allowed here because createSlice uses Immer.)
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Could not load todos. Is json-server running on port 3001?'
      })

      // addTodo
      .addCase(addTodo.pending, (state) => {
        state.error = null
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(addTodo.rejected, (state) => {
        state.error = 'Could not add the todo. Please try again.'
      })

      // toggleTodo
      .addCase(toggleTodo.pending, (state) => {
        state.error = null
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(toggleTodo.rejected, (state) => {
        state.error = 'Could not update the todo. Please try again.'
      })

      // updateTodo
      .addCase(updateTodo.pending, (state) => {
        state.error = null
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })
      .addCase(updateTodo.rejected, (state) => {
        state.error = 'Could not save the change. Please try again.'
      })

      // deleteTodo
      .addCase(deleteTodo.pending, (state) => {
        state.error = null
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload)
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.error = 'Could not delete the todo. Please try again.'
      })

      // clearCompleted
      .addCase(clearCompleted.pending, (state) => {
        state.error = null
      })
      .addCase(clearCompleted.fulfilled, (state, action) => {
        const { deletedIds, failedCount } = action.payload
        state.items = state.items.filter((t) => !deletedIds.includes(t.id))
        if (failedCount > 0) {
          state.error = 'Some completed todos could not be deleted. Please try again.'
        }
      })
      .addCase(clearCompleted.rejected, (state) => {
        state.error = 'Could not clear the completed todos. Please try again.'
      })
  },
})

export default todosSlice.reducer

/* ---------- Selectors: components read data only through these ---------- */

export const selectAllTodos = (state) => state.todos.items
export const selectTodosStatus = (state) => state.todos.status
export const selectTodosError = (state) => state.todos.error

// createSelector remembers the result, so the same list is returned
// until the todos really change (no useless re-renders)
export const selectActiveTodos = createSelector([selectAllTodos], (todos) =>
  todos.filter((todo) => !todo.completed)
)

export const selectCompletedTodos = createSelector([selectAllTodos], (todos) =>
  todos.filter((todo) => todo.completed)
)

const priorities = ['High', 'Medium', 'Low']

export const selectTodoStats = createSelector([selectAllTodos], (todos) => {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const pending = total - completed
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const byPriority = priorities.map((name) => ({
    name,
    count: todos.filter((t) => t.priority === name).length,
  }))

  return { total, completed, pending, percent, byPriority }
})