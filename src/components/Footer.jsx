
import { useTodos } from '../context/TodoContext'
import { useTodoStats } from '../hooks/useTodoStats'

function Footer() {
  const { todos, clearCompleted } = useTodos()
  const { pending } = useTodoStats(todos)

  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
      {/* Pending task count */}
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {pending} {pending === 1 ? 'task' : 'tasks'} left
      </span>

      {/* Clear completed button */}
      <button
        className="rounded-lg px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
        type="button"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
