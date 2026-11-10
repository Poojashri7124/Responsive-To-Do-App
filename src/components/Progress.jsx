
import { useTodos } from '../context/TodoContext'
import { useTodoStats } from '../hooks/useTodoStats'

function Progress() {
  const { todos } = useTodos()
  const { completed, total, percent } = useTodoStats(todos)

  return (
    <div className="rounded-xl bg-indigo-50 p-4 dark:bg-gray-800">
      {/* Progress information */}
      <div className="mb-3 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-200">
        <span>Progress</span>

        <span>
          {completed} of {total} done · {percent}%
        </span>
      </div>

      {/* Progress bar background */}
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        {/* Progress bar fill */}
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default Progress
