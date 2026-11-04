import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getTodo } from '../api.js'
import './TodoDetail.css'

function TodoDetail({ onUpdate, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()

  // data, loading, error for this page
  const [todo, setTodo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // the edit form
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [completed, setCompleted] = useState(false)

  // fetch this one todo by id - works after a refresh too
  useEffect(() => {
    async function loadTodo() {
      try {
        setLoading(true)
        setError(null)
        const data = await getTodo(id)
        setTodo(data)
        setText(data.text)
        setPriority(data.priority)
        setCompleted(data.completed)
      } catch (err) {
        setTodo(null)
        setError('Could not load this todo. It may not exist, or json-server is not running.')
      } finally {
        setLoading(false)
      }
    }

    loadTodo()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed === '') return

    const updated = await onUpdate(id, { text: trimmed, priority, completed })
    if (updated) navigate('/') // go back only after the server said OK
  }

  async function handleDelete() {
    const deleted = await onDelete(id)
    if (deleted) navigate('/')
  }

  if (loading) {
    return <p className="status">Loading…</p>
  }

  if (error || !todo) {
    return (
      <div className="detail">
        <p className="detail-error">{error}</p>
        <Link className="detail-back" to="/">
          ← Back to my tasks
        </Link>
      </div>
    )
  }

  return (
    <form className="detail" onSubmit={handleSubmit}>
      <Link className="detail-back" to="/">
        ← Back to my tasks
      </Link>
      <h2 className="detail-title">Todo details</h2>

      <label className="detail-label" htmlFor="detail-text">Task</label>
      <input
        id="detail-text"
        className="detail-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label className="detail-label" htmlFor="detail-priority">Priority</label>
      <select
        id="detail-priority"
        className="detail-input"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <label className="detail-check">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>

      <div className="detail-actions">
        <button className="detail-save" type="submit">Save</button>
        <button className="detail-delete" type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </form>
  )
}

export default TodoDetail