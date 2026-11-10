import { createContext, useContext, useReducer, useState, useEffect } from 'react'
import {
  getTodos,
  addTodo as apiAddTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
} from '../api.js'

const TodoContext = createContext(null)

// The reducer only changes state. It never calls the API.
function todoReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return action.payload
    case 'ADD':
      return [...state, action.payload]
    case 'TOGGLE':
    case 'UPDATE':
      return state.map((t) => (t.id === action.payload.id ? action.payload : t))
    case 'DELETE':
      return state.filter((t) => t.id !== action.payload)
    case 'CLEAR_COMPLETED':
      // payload = the ids the server really deleted
      return state.filter((t) => !action.payload.includes(t.id))
    default:
      return state
  }
}

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // GET when the app opens
  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true)
        setError(null)
        const data = await getTodos()
        dispatch({ type: 'LOAD', payload: data })
      } catch (err) {
        setError('Could not load todos. Is json-server running on port 3001?')
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  // Every function below: call the API first, dispatch only after it worked.

  // POST - returns true/false so the form knows whether to clear itself
  async function addTodo(text, priority,dueDate) {
    try {
      setError(null)
      const created = await apiAddTodo({ text, priority, dueDate,completed: false })
      dispatch({ type: 'ADD', payload: created })
      return true
    } catch (err) {
      setError('Could not add the todo. Please try again.')
      return false
    }
  }

  // PATCH completed
  async function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id)
    try {
      setError(null)
      const updated = await apiUpdateTodo(id, { completed: !todo.completed })
      dispatch({ type: 'TOGGLE', payload: updated })
    } catch (err) {
      setError('Could not update the todo. Please try again.')
    }
  }

  // PATCH any fields (text, priority...) - returns the updated todo or null
  async function updateTodo(id, changes) {
    try {
      setError(null)
      const updated = await apiUpdateTodo(id, changes)
      dispatch({ type: 'UPDATE', payload: updated })
      return updated
    } catch (err) {
      setError('Could not update the todo. Please try again.')
      return null
    }
  }

  // DELETE - returns true/false
  async function deleteTodo(id) {
    try {
      setError(null)
      await apiDeleteTodo(id)
      dispatch({ type: 'DELETE', payload: id })
      return true
    } catch (err) {
      setError('Could not delete the todo. Please try again.')
      return false
    }
  }

  // DELETE every completed todo on the server, then update the screen
  async function clearCompleted() {
    const completed = todos.filter((t) => t.completed)
    if (completed.length === 0) return

    setError(null)
    const results = await Promise.allSettled(
      completed.map((t) => apiDeleteTodo(t.id))
    )

    const deletedIds = completed
      .filter((t, i) => results[i].status === 'fulfilled')
      .map((t) => t.id)

    dispatch({ type: 'CLEAR_COMPLETED', payload: deletedIds })

    if (deletedIds.length < completed.length) {
      setError('Some completed todos could not be deleted. Please try again.')
    }
  }

  const value = {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

// The hook every component uses: const { todos, addTodo } = useTodos()
export function useTodos() {
  const context = useContext(TodoContext)
  if (context === null) {
    throw new Error('useTodos must be used inside <TodoProvider>')
  }
  return context
}