
import { useState } from 'react'
import { useTodos } from '../context/TodoContext'

function TaskForm() {
  const { addTodo, todos } = useTodos()

  const [form, setForm] = useState({
    text: '',
    priority: 'Medium',
    dueDate: '',
  })

  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  // Get today's date in local format
  const today = new Date()
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  // Validate form fields
  function validate(form) {
    const newErrors = {}
    const trimmedText = form.text.trim()

    if (!trimmedText) {
      newErrors.text = 'Task is required'
    } else if (trimmedText.length < 3) {
      newErrors.text = 'Task must be at least 3 characters'
    } else if (
      todos.some(
        (todo) =>
          todo.text.trim().toLowerCase() ===
          trimmedText.toLowerCase()
      )
    ) {
      newErrors.text = 'This task already exists'
    }

    if (form.dueDate && form.dueDate < minDate) {
      newErrors.dueDate = 'Due date cannot be in the past'
    }

    return newErrors
  }

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  // Validate when leaving a field
  function handleBlur(e) {
    const { name } = e.target
    const validationErrors = validate(form)

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name] || '',
    }))
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSaving(true)

    try {
      const added = await addTodo(
        form.text.trim(),
        form.priority,
        form.dueDate
      )

      if (added) {
        setForm({
          text: '',
          priority: 'Medium',
          dueDate: '',
        })

        setErrors({})
      }
    } finally {
      setIsSaving(false)
    }
  }

  // Reusable input styling
  const inputClass = (field) =>
    `w-full min-w-0 rounded-lg border p-3 outline-none transition
    ${
      errors[field]
        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
        : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-600'
    }
    bg-white text-gray-800 dark:bg-gray-800 dark:text-white`

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid grid-cols-1 gap-3 rounded-xl bg-white p-4 shadow-md dark:bg-gray-900 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_160px_180px_auto]"
    >
      {/* Task input */}
      <div className="min-w-0">
        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
          Task
        </label>

        <input
          type="text"
          name="text"
          placeholder="Add a new task"
          value={form.text}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass('text')}
        />

        {errors.text && (
          <p className="mt-1 text-sm text-red-500">
            {errors.text}
          </p>
        )}
      </div>

      {/* Priority selection */}
      <div>
        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
          Priority
        </label>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className={inputClass('priority')}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* Due date */}
      <div>
        <label className="mb-2 block font-medium text-gray-700 dark:text-gray-200">
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          min={minDate}
          value={form.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass('dueDate')}
        />

        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-500">
            {errors.dueDate}
          </p>
        )}
      </div>

      {/* Submit button */}
      <div className="flex items-end">
        <button
          type="submit"
          disabled={isSaving}
          className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
