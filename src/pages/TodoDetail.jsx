import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllTodos, updateTodo, deleteTodo } from '../features/todos/todoSlice'
import { useTodo } from '../hooks/useTodo'
import { validate } from '../utils/validateTodo.js'

const fieldClass =
  'h-11 rounded-[10px] border bg-white px-4 text-[15px] text-[#1e1b3a] focus:outline-none dark:bg-[#26243d] dark:text-[#ecebff] dark:[color-scheme:dark]'
const labelClass = 'mt-3 mb-1.5 text-sm text-[#6b6890] dark:text-[#a6a3c7]'
// always takes its space, so the Save button never jumps when an error appears
const errorClass = 'mt-1 min-h-5 text-[13px] text-red-600 dark:text-[#ff8d98]'

function borderClass(hasError) {
  return hasError
    ? 'border-red-500'
    : 'border-[#d9d6f5] focus:border-[#6366f1] dark:border-[#3a3860]'
}

function TodoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const todos = useSelector(selectAllTodos)

  // this one todo comes from our own hook (fetched by id, works after refresh)
  const { todo, loading, error } = useTodo(id)

  // the edit form + its errors
  const [form, setForm] = useState({ text: '', priority: 'Medium', dueDate: '', completed: false })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // fill the form when the todo arrives
  useEffect(() => {
    if (todo) {
      setForm({
        text: todo.text,
        priority: todo.priority,
        dueDate: todo.dueDate || '',
        completed: todo.completed,
      })
    }
  }, [todo])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  function handleBlur(e) {
    const { name } = e.target
    const found = validate(form, todos, todo)
    setErrors({ ...errors, [name]: found[name] })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const found = validate(form, todos, todo)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSaving(true)
    try {
      await dispatch(
        updateTodo({
          id,
          changes: {
            text: form.text.trim(),
            priority: form.priority,
            dueDate: form.dueDate,
            completed: form.completed,
          },
        })
      ).unwrap()

      navigate('/') // go back only after the server said OK
    } catch (err) {
      // failed: stay here (the error banner is shown by App)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    try {
      await dispatch(deleteTodo(id)).unwrap()
      navigate('/')
    } catch (err) {
      // failed: stay here (the error banner is shown by App)
    }
  }

  if (loading) {
    return (
      <p className="px-6.5 py-[30px] text-center text-[15px] text-[#8a86a8] md:px-8 dark:text-[#a6a3c7]">
        Loading…
      </p>
    )
  }

  if (error || !todo) {
    return (
      <div className="flex max-w-[560px] flex-col px-6.5 pt-[22px] pb-7 md:px-8">
        <p className="mb-3.5 rounded-[10px] bg-[#fde2e4] px-3.5 py-3 text-[15px] text-[#d62839] dark:bg-[#43202a] dark:text-[#ff8d98]">
          {error}
        </p>
        <Link className="text-sm text-[#4f46e5] dark:text-[#a5a0ff]" to="/">
          ← Back to my tasks
        </Link>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex max-w-[560px] flex-col px-6.5 pt-[22px] pb-7 md:px-8"
    >
      <Link className="text-sm text-[#4f46e5] dark:text-[#a5a0ff]" to="/">
        ← Back to my tasks
      </Link>
      <h2 className="mt-4 mb-2.5 text-xl font-bold">Todo details</h2>

      <label className={labelClass} htmlFor="detail-text">Task</label>
      <input
        id="detail-text"
        className={`${fieldClass} ${borderClass(errors.text)}`}
        type="text"
        name="text"
        value={form.text}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p className={errorClass}>{errors.text}</p>

      <label className={labelClass} htmlFor="detail-priority">Priority</label>
      <select
        id="detail-priority"
        className={`${fieldClass} ${borderClass(false)}`}
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <label className={labelClass} htmlFor="detail-date">Due date</label>
      <input
        id="detail-date"
        className={`${fieldClass} ${borderClass(errors.dueDate)}`}
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p className={errorClass}>{errors.dueDate}</p>

      <label className="mt-4 flex items-center gap-2 text-[15px]">
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={handleChange}
        />
        Completed
      </label>

      <div className="mt-[22px] flex gap-2.5">
        <button
          className="h-11 cursor-pointer rounded-[10px] bg-[#4f46e5] px-[22px] text-[15px] font-bold text-white hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#5b52f0]"
          type="submit"
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          className="h-11 cursor-pointer rounded-[10px] border border-[#f3b7bd] bg-white px-[22px] text-[15px] font-bold text-[#d62839] dark:bg-[#1c1b2e]"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </form>
  )
}

export default TodoDetail