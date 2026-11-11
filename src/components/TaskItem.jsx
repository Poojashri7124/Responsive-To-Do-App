import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleTodo, updateTodo, deleteTodo } from '../features/todos/todoSlice'
import { priorityColors } from '../utils/priorityColors'
import { getToday, formatDate } from '../utils/date'

function TaskItem({ id, text, priority, completed, dueDate }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(text)

  // overdue = has a due date, it is before today, and the task is not done
  const overdue = dueDate && !completed && dueDate < getToday()

  function startEditing() {
    setDraft(text)
    setIsEditing(true)
  }

  async function saveEdit() {
    const trimmed = draft.trim()
    // empty or unchanged -> just close, no request
    if (trimmed === '' || trimmed === text) {
      setIsEditing(false)
      return
    }
    try {
      await dispatch(updateTodo({ id, changes: { text: trimmed } })).unwrap()
      setIsEditing(false) // close only after the server said OK
    } catch (err) {
      // failed: stay in edit mode (the error banner is shown by App)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') setIsEditing(false)
  }

  return (
    <li className="flex items-center gap-3 border-b border-[#f1f0fa] py-3.5 dark:border-[#2c2a48]">
      <input
        className="grid h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none place-content-center rounded-[5px] border-[1.5px] border-[#b9b5e6] bg-white checked:border-[#4f46e5] checked:bg-[#4f46e5] checked:after:text-xs checked:after:leading-none checked:after:text-white checked:after:content-['✓'] dark:border-[#5a577f] dark:bg-[#26243d] dark:checked:border-[#5b52f0] dark:checked:bg-[#5b52f0]"
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodo(id))}
        aria-label={text}
      />

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            className="h-[34px] w-full min-w-0 rounded-lg border border-[#4f46e5] bg-white px-2.5 text-sm text-[#1e1b3a] outline-none md:text-[15px] dark:bg-[#26243d] dark:text-[#ecebff]"
            type="text"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)}
          />
        ) : (
          <span
            className={`block text-sm leading-[21px] wrap-anywhere md:text-[15px] ${
              completed ? 'text-[#a9a6c8] line-through dark:text-[#6f6c96]' : ''
            }`}
            onDoubleClick={startEditing}
            title="Double-click to edit"
          >
            {text}
          </span>
        )}

        {dueDate && (
          <p
            className={`mt-0.5 text-xs ${
              overdue
                ? 'font-semibold text-red-600 dark:text-[#ff8d98]'
                : 'text-[#8a86a8] dark:text-[#a6a3c7]'
            }`}
          >
            Due {formatDate(dueDate)}
            {overdue && ' · Overdue'}
          </p>
        )}
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-0.5 text-[11px] leading-[18px] font-bold ${priorityColors[priority]}`}
      >
        {priority}
      </span>
      <Link
        className="shrink-0 text-xl leading-none text-[#8a86a8] hover:text-[#4f46e5]"
        to={`/todo/${id}`}
        aria-label="View details"
        title="View details"
      >
        ›
      </Link>
      <button
        className="shrink-0 cursor-pointer text-[13px] opacity-45 hover:opacity-80 md:text-[15px]"
        type="button"
        aria-label="Delete task"
        onClick={() => dispatch(deleteTodo(id))}
      >
        🗑
      </button>
    </li>
  )
}

export default TaskItem