
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTodos } from '../context/TodoContext'
import { useTodo } from '../hooks/useTodo'

function TodoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateTodo, deleteTodo } = useTodos()

  const { todo, loading, error } = useTodo(id)

  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [completed, setCompleted] = useState(false)
  const [dueDate, setDueDate] = useState('')
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (todo) {
      setText(todo.text)
      setPriority(todo.priority)
      setCompleted(todo.completed)
      setDueDate(todo.dueDate || '')
      setError({})
    }
  }, [todo])

  const today = new Date()
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  
  ].join('-')

  function validate(form){
    const newErrors = {}
    if (form.text.trim().length < 3){
      newErrors.text = 'Task must contain at least 3 characters'
    }
    if (form.dueDate && form.dueDate < minDate){
      newErrors.duedate = 'Due date cannot be in the past'
    }
    return newErrors
  }
  function handleBlur(field){
    const form = {text, priority, completed, dueDate}
    const validationErrors = validate(form)
    seterrors((prev) => {
      const updated = {...prev}
      if (validationerrors[field]){
        update[field] = validationErrors[field]
      }
      else{
        delete updated[field]
      }
      return updated
    })
  }
//example commit in new branch
  async function handleSubmit(e) {
    e.preventDefault()

    const trimmed = text.trim()

    if (trimmed.length < 3) {
      alert('Task must contain at least 3 characters.')
      return
    }

    const today = new Date()
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-')

    if (dueDate && dueDate < todayString) {
      alert('Due date cannot be in the past.')
      return
    }

    const updated = await updateTodo(id, {
      text: trimmed,
      priority,
      completed,
      dueDate,
    })

    if (updated) navigate('/')
  }

  async function handleDelete() {
    const deleted = await deleteTodo(id)
    if (deleted) navigate('/')
  }

  if (loading) {
    return (
      <p className="py-6 text-center text-gray-500 dark:text-gray-400">
        Loading…
      </p>
    )
  }

  if (error || !todo) {
    return (
      <div className="space-y-4">
        <p className="text-red-500">{error || 'Todo not found.'}</p>

        <Link
          to="/"
          className="inline-block text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← Back to my tasks
        </Link>
      </div>
    )
  }

  return (
    <form
      className="mx-auto w-full max-w-xl space-y-5 rounded-xl bg-gray-50 p-5 dark:bg-gray-800 sm:p-6"
      onSubmit={handleSubmit}
    >
      <Link
        to="/"
        className="inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        ← Back to my tasks
      </Link>

      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        Todo details
      </h2>

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="detail-text"
        >
          Task
        </label>

        <input
          id="detail-text"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="detail-priority"
        >
          Priority
        </label>

        <select
          id="detail-priority"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="detail-date"
        >
          Due date
        </label>

        <input
          id="detail-date"
          type="date"
          min={new Date().toLocaleDateString('en-CA')}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 accent-indigo-600"
        />
        Completed
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          className="flex-1 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
          type="submit"
        >
          Save
        </button>

        <button
          className="flex-1 rounded-lg bg-red-500 px-5 py-3 font-medium text-white hover:bg-red-600"
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
