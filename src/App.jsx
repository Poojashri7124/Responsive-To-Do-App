import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import FilterTabs from './components/FilterTabs'
import TodoPage from './pages/TodoPage'
import Stats from './pages/Stats'
import TodoDetail from './pages/TodoDetail'
import NotFound from './pages/NotFound'
import { getTodos, addTodo, updateTodo, deleteTodo } from './api.js'
import './App.css'

const tabs = [
  { label: 'All', to: '/', end: true },
  { label: 'Active', to: '/active' },
  { label: 'Completed', to: '/completed' },
  { label: 'Stats', to: '/stats' },
]

function App() {
  // shared state lives here, above <Routes>
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  // GET when the app opens
  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true)
        setError(null)
        const data = await getTodos()
        setTasks(data)
      } catch (err) {
        setError('Could not load todos. Is json-server running on port 3001?')
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  // POST - returns true/false so the form knows whether to clear itself
  async function addTask(text, priority) {
    try {
      setError(null)
      const created = await addTodo({ text, priority, completed: false })
      setTasks((prev) => [...prev, created])
      return true
    } catch (err) {
      setError('Could not add the todo. Please try again.')
      return false
    }
  }

  // PATCH any fields - returns the updated todo, or null if it failed
  async function updateTask(id, changes) {
    try {
      setError(null)
      const updated = await updateTodo(id, changes)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      return updated
    } catch (err) {
      setError('Could not update the todo. Please try again.')
      return null
    }
  }

  function toggleTask(id) {
    const task = tasks.find((t) => t.id === id)
    return updateTask(id, { completed: !task.completed })
  }

  async function editTask(id, text) {
    const updated = await updateTask(id, { text })
    return updated !== null
  }

  // DELETE - returns true/false
  async function deleteTask(id) {
    try {
      setError(null)
      await deleteTodo(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
      return true
    } catch (err) {
      setError('Could not delete the todo. Please try again.')
      return false
    }
  }

  // DELETE every completed todo on the server, then update the screen
  async function clearCompleted() {
    const completed = tasks.filter((t) => t.completed)
    if (completed.length === 0) return

    setError(null)
    const results = await Promise.allSettled(
      completed.map((t) => deleteTodo(t.id))
    )

    // only remove the ones the server really deleted
    const deletedIds = completed
      .filter((t, i) => results[i].status === 'fulfilled')
      .map((t) => t.id)

    setTasks((prev) => prev.filter((t) => !deletedIds.includes(t.id)))

    if (deletedIds.length < completed.length) {
      setError('Some completed todos could not be deleted. Please try again.')
    }
  }

  const pageProps = {
    tasks,
    loading,
    error,
    query,
    onQueryChange: setQuery,
    onAdd: addTask,
    onToggle: toggleTask,
    onEdit: editTask,
    onDelete: deleteTask,
    onClear: clearCompleted,
  }

  return (
    <div className="app">
      <div className="card">
        <Header title="My Tasks" date="Wednesday, 4 November 2026" />
        <FilterTabs tabs={tabs} />

        {error && <p className="status status-error">{error}</p>}

        <Routes>
          <Route path="/" element={<TodoPage filter="All" {...pageProps} />} />
          <Route path="/active" element={<TodoPage filter="Active" {...pageProps} />} />
          <Route path="/completed" element={<TodoPage filter="Completed" {...pageProps} />} />
          <Route path="/stats" element={<Stats tasks={tasks} loading={loading} />} />
          <Route
            path="/todo/:id"
            element={<TodoDetail onUpdate={updateTask} onDelete={deleteTask} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App