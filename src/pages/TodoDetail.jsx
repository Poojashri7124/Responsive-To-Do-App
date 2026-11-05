import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTodos } from '../context/TodoContext'
import { useTodo } from '../hooks/useTodo'
import './TodoDetail.css'

function TodoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateTodo, deleteTodo } = useTodos()

  // this one todo comes from our own hook (fetched by id, works after refresh)
  const { todo, loading, error } = useTodo(id)

  // the edit form
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [completed, setCompleted] = useState(false)

  // fill the form when the todo arrives
  useEffect(() => {
    if (todo) {
      setText(todo.text)
      setPriority(todo.priority)
      setCompleted(todo.completed)
    }
  }, [todo])

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed === '') return

    const updated = await updateTodo(id, { text: trimmed, priority, completed })
    if (updated) navigate('/') // go back only after the server said OK
  }

  async function handleDelete() {
    const deleted = await deleteTodo(id)
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