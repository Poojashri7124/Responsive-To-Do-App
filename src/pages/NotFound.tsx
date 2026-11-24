
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="px-5 py-8 text-center sm:px-6 sm:py-10">
      <h2 className="text-4xl font-bold text-indigo-600 sm:text-5xl">
        404
      </h2>

      <p className="my-3 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        Page not found.
      </p>

      <Link
        className="text-sm text-indigo-600 hover:underline dark:text-indigo-400 sm:text-base"
        to="/"
      >
        Back to my tasks
      </Link>
    </div>
  )
}

export default NotFound
