
import { useTodos } from '../context/TodoContext'
import { useTodoStats } from '../hooks/useTodoStats'

function Stats() {
  const { todos, loading } = useTodos()
  const { total, completed, pending, percent, byPriority } = useTodoStats(todos)

  if (loading) {
    return (
      <p className="py-6 text-center text-gray-500 dark:text-gray-400">
        Loading…
      </p>
    )
  }

  return (
    <div className="space-y-6">

      {/* Statistics cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-indigo-50 p-5 text-center dark:bg-indigo-950">
          <span className="block text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {total}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Total
          </span>
        </div>

        <div className="rounded-xl bg-green-50 p-5 text-center dark:bg-green-950">
          <span className="block text-3xl font-bold text-green-600 dark:text-green-400">
            {completed}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Completed
          </span>
        </div>

        <div className="rounded-xl bg-orange-50 p-5 text-center dark:bg-orange-950">
          <span className="block text-3xl font-bold text-orange-600 dark:text-orange-400">
            {pending}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Pending
          </span>
        </div>

        <div className="rounded-xl bg-purple-50 p-5 text-center dark:bg-purple-950">
          <span className="block text-3xl font-bold text-purple-600 dark:text-purple-400">
            {percent}%
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Done
          </span>
        </div>
      </div>

      {/* Priority statistics */}
      <section className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          By priority
        </h2>

        <ul className="space-y-3">
          {byPriority.map((item) => (
            <li
              key={item.name}
              className="flex items-center justify-between rounded-lg bg-white p-3 dark:bg-gray-700"
            >
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  item.name === 'High'
                    ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                    : item.name === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                    : 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                }`}
              >
                {item.name}
              </span>

              <span className="font-semibold text-gray-800 dark:text-white">
                {item.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  )
}

export default Stats
