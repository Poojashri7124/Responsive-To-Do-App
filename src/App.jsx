import { useState, useEffect } from 'react'
import Header from './components/Header'
import Progress from './components/Progress'
import TaskForm from './components/TaskForm'
import SearchBar from './components/SearchBar'
import FilterTabs from './components/FilterTabs'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import { getTodos, addTodo, updateTodo, deleteTodo } from './api.js'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')
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

  // PATCH completed
  async function toggleTask(id) {
    const task = tasks.find((t) => t.id === id)
    try {
      setError(null)
      const updated = await updateTodo(id, { completed: !task.completed })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      setError('Could not update the todo. Please try again.')
    }
  }

  // PATCH text (bonus: double-click to edit)
  async function editTask(id, text) {
    try {
      setError(null)
      const updated = await updateTodo(id, { text })
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
      return true
    } catch (err) {
      setError('Could not save the change. Please try again.')
      return false
    }
  }

  // DELETE
  async function deleteTask(id) {
    try {
      setError(null)
      await deleteTodo(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError('Could not delete the todo. Please try again.')
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

  // calculated while rendering - no second state
  const search = query.trim().toLowerCase()

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Active' && task.completed) return false
    if (filter === 'Completed' && !task.completed) return false
    return task.text.toLowerCase().includes(search)
  })

  const remaining = tasks.filter((task) => !task.completed).length
  const done = tasks.length - remaining

  // hide the list when loading, or when loading failed (nothing to show)
  const showList = !loading && !(error && tasks.length === 0)

  return (
    <div className="app">
      <div className="card">
        <Header title="My Tasks" date="Tuesday, 3 November 2026" />
        <Progress done={done} total={tasks.length} />
        <TaskForm onAdd={addTask} />
        <SearchBar query={query} onChange={setQuery} />
        <FilterTabs
          tabs={['All', 'Active', 'Completed']}
          activeTab={filter}
          onChange={setFilter}
        />

        {error && <p className="status status-error">{error}</p>}
        {loading && <p className="status">Loading…</p>}
        {showList && (
          <TaskList
            tasks={visibleTasks}
            filter={filter}
            searching={search !== ''}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        )}

        <Footer remaining={remaining} onClear={clearCompleted} />
      </div>
    </div>
  )
}

export default App