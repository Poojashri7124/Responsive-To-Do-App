import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, selectAllTodos } from '../features/todos/todoSlice'
import { validate } from '../utils/validateTodo.js'
import { getToday } from '../utils/date'

const emptyForm = { text: '', priority: 'Medium', dueDate: '' }

// shared look of the three fields
const fieldClass =
  'h-11 min-w-0 rounded-[10px] border bg-white px-4 text-[15px] text-[#1e1b3a] placeholder:text-[#8a86a8] focus:outline-none dark:bg-[#26243d] dark:text-[#ecebff] dark:[color-scheme:dark]'

// The error line always takes its space (min-h-5), even when it is empty.
// If it appeared / disappeared, the layout would jump and a click on the
// Add button could be lost.
const errorClass = 'mt-1 min-h-5 text-[13px] text-red-600 dark:text-[#ff8d98]'

// red border when the field has an error
function borderClass(hasError) {
  return hasError
    ? 'border-red-500'
    : 'border-[#d9d6f5] focus:border-[#6366f1] dark:border-[#3a3860]'
}

function TaskForm() {
  const dispatch = useDispatch()
  const todos = useSelector(selectAllTodos)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // controlled inputs: every field is stored in "form"
  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // when the user leaves a field, check it
  function handleBlur(e) {
    const { name } = e.target
    const found = validate(form, todos)
    setErrors({ ...errors, [name]: found[name] })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const found = validate(form, todos)
    setErrors(found)
    if (Object.keys(found).length > 0) return // errors: don't submit

    setSaving(true)
    try {
      // unwrap() throws if the thunk failed (e.g. json-server is stopped)
      await dispatch(
        addTodo({
          text: form.text.trim(),
          priority: form.priority,
          dueDate: form.dueDate,
        })
      ).unwrap()

      setForm(emptyForm) // success: clear the form and the errors
      setErrors({})
    } catch (err) {
      // failed: keep what the user typed (the error banner is shown by App)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid grid-cols-[1fr_auto] items-start gap-x-[9px] gap-y-2.5 px-6.5 pt-5 pb-4 md:grid-cols-[1fr_auto_auto_auto] md:gap-x-2.5 md:px-8 md:pb-1"
    >
      {/* task text */}
      <div className="order-1 col-span-2 md:col-span-1">
        <input
          className={`${fieldClass} w-full ${borderClass(errors.text)}`}
          type="text"
          name="text"
          placeholder="Add a new task"
          value={form.text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className={errorClass}>{errors.text}</p>
      </div>

      {/* priority */}
      <select
        className={`${fieldClass} order-3 ${borderClass(false)} md:order-2`}
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      {/* due date (can't be in the past) */}
      <div className="order-2 col-span-2 md:order-3 md:col-span-1">
        <input
          className={`${fieldClass} w-full md:w-[170px] ${borderClass(errors.dueDate)}`}
          type="date"
          name="dueDate"
          min={getToday()}
          value={form.dueDate}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-label="Due date"
          title="Due date (optional)"
        />
        <p className={errorClass}>{errors.dueDate}</p>
      </div>

      <button
        className="order-4 h-11 cursor-pointer rounded-[10px] bg-[#4f46e5] px-[18px] text-base font-bold text-white hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60 md:px-[26px] dark:bg-[#5b52f0]"
        type="submit"
        disabled={saving}
      >
        {saving ? 'Saving…' : 'Add'}
      </button>
    </form>
  )
}

export default TaskForm