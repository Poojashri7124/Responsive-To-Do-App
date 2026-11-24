
import { useState } from 'react'
import type { ChangeEvent, FocusEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { addTodo, selectAllTodos } from '../features/todos/todoSlice'
import { validate } from '../utils/validateTodo'
import { getToday } from '../utils/date'

// Define form types
type Priority = 'High' | 'Medium' | 'Low'

interface TaskFormValues {
  text: string
  priority: Priority
  dueDate: string
}

interface FormErrors {
  text?: string
  dueDate?: string
}

type ValidatedField = 'text' | 'dueDate'

const emptyForm: TaskFormValues = {
  text: '',
  priority: 'Medium',
  dueDate: '',
}

// Shared look of the three fields
const fieldClass =
  'h-11 min-w-0 rounded-[10px] border bg-white px-4 text-[15px] text-[#1e1b3a] placeholder:text-[#8a86a8] focus:outline-none dark:bg-[#26243d] dark:text-[#ecebff] dark:[color-scheme:dark]'

const errorClass =
  'mt-1 min-h-5 text-[13px] text-red-600 dark:text-[#ff8d98]'

// Red border when the field has an error
function borderClass(hasError: boolean): string {
  return hasError
    ? 'border-red-500'
    : 'border-[#d9d6f5] focus:border-[#6366f1] dark:border-[#3a3860]'
}

function TaskForm() {
  const dispatch = useDispatch<AppDispatch>()

  const todos = useSelector((state: RootState) =>
    selectAllTodos(state)
  )

  const [form, setForm] = useState<TaskFormValues>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [saving, setSaving] = useState<boolean>(false)

  // Controlled inputs: every field is stored in form
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // When the user leaves a field, check it
  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const name = e.target.name as ValidatedField
    const found = validate(form, todos)

    setErrors((prev) => ({
      ...prev,
      [name]: found[name],
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const found = validate(form, todos)
    setErrors(found)

    if (Object.keys(found).length > 0) return

    setSaving(true)

    try {
      await dispatch(
        addTodo({
          text: form.text.trim(),
          priority: form.priority,
          dueDate: form.dueDate,
        })
      ).unwrap()

      setForm(emptyForm)
      setErrors({})
    } catch (err: unknown) {
      // Keep the entered values if saving fails
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid grid-cols-[1fr_auto] items-start gap-x-[ 9px] gap-y-2.5 px-6.5 pt-5 pb-4 md:grid-cols-[1fr_auto_auto_auto] md:gap-x-2.5 md:px-8 md:pb-1"
    >
      {/* Task text */}
      <div className="order-1 col-span-2 md:col-span-1">
        <input
          className={`${fieldClass} w-full ${borderClass(!!errors.text)}`}
          type="text"
          name="text"
          placeholder="Add a new task"
          value={form.text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p className={errorClass}>{errors.text}</p>
      </div>

      {/* Priority */}
      <select
        className={`${fieldClass} order-3 ${borderClass(false)} md:order-2`}
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Due date */}
      <div className="order-2 col-span-2 md:order-3 md:col-span-1">
        <input
          className={`${fieldClass} w-full md:w-[ 170px] ${borderClass(!!errors.dueDate)}`}
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
      className="order-4 h-11 cursor-pointer rounded-[10px] bg-[#4f46e5] px-[18px] text-base font-bold text-white hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60 md:px-[26px] dark:bg-[#5b52f0]"        type="submit"
        disabled={saving}
      >
        {saving ? 'Saving…' : 'Add'}
      </button>
    </form>
  )
}

export default TaskForm
