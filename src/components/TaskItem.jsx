
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTodos } from '../context/TodoContext'

function TaskItem({
  id,
  text,
  priority,
  completed,
  dueDate,
}) {
  const { toggleTodo, updateTodo, deleteTodo } = useTodos()

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(text)

  // Check whether the task is overdue
  const today = new Date()
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  const isOverdue =
    dueDate && dueDate < todayString && !completed

  function startEditing() {
    setDraft(text)
    setIsEditing(true)
  }

  async function saveEdit() {
    const trimmed = draft.trim()

    if (trimmed === '' || trimmed === text) {
      setIsEditing(false)
      return
    }

    const updated = await updateTodo(id, { text: trimmed })

    if (updated) setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') setIsEditing(false)
  }

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:gap-4 sm:p-4">

      {/* Complete checkbox */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
        aria-label={text}
        className="h-5 w-5 shrink-0 cursor-pointer accent-indigo-600"
      />

      {/* Task text */}
      <div className="min-w-0 flex-1">

        {isEditing ? (
          <input
            type="text"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={saveEdit}
            className="w-full rounded-lg border border-indigo-400 bg-white p-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-200 dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <span
            className={`break-words text-sm sm:text-base ${
              completed
                ? 'text-gray-400 line-through'
                : 'text-gray-800 dark:text-gray-100'
            }`}
            onDoubleClick={startEditing}
            title="Double-click to edit"
          >
            {text}
          </span>
        )}

        {/* Due date */}
        {dueDate && (
          <p
            className={`mt-1 text-xs ${
              isOverdue
                ? 'font-semibold text-red-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Due: {dueDate}
            {isOverdue && ' (Overdue)'}
          </p>
        )}
      </div>

      {/* Priority badge */}
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
          priority === 'High'
            ? 'bg-red-100 text-red-700'
            : priority === 'Medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
        }`}
      >
        {priority}
      </span>

      {/* View details */}
      <Link
        to={`/todo/${id}`}
        aria-label="View details"
        title="View details"
        className="shrink-0 text-xl font-bold text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400"
      >
        ›
      </Link>

      {/* Delete */}
      <button
        type="button"
        aria-label="Delete task"
        onClick={() => deleteTodo(id)}
        className="shrink-0 rounded-lg px-2 py-1 text-red-500 transition hover:bg-red-100 dark:hover:bg-red-900/30"
      >
        🗑
      </button>
    </li>
  )
}

export default TaskItem
