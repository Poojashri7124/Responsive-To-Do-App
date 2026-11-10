
import { useState } from 'react'
import Progress from '../components/Progress'
import TaskForm from '../components/TaskForm'
import SearchBar from '../components/SearchBar'
import TaskList from '../components/TaskList'
import Footer from '../components/Footer'
import { useTodos } from '../context/TodoContext'

function TodoPage({ filter }) {
  const { todos, loading, error } = useTodos()

  const [query, setQuery] = useState('')

  // Hide the list while loading
  const showList = !loading && !(error && todos.length === 0)

  return (
    <div className="flex flex-col gap-5">

      {/* Task progress */}
      <Progress />

      {/* Add todo form */}
      <TaskForm />

      {/* Search tasks */}
      <SearchBar
        query={query}
        onChange={setQuery}
      />

      {/* Loading message */}
      {loading && (
        <p className="py-6 text-center text-gray-500 dark:text-gray-400">
          Loading…
        </p>
      )}

      {/* Task list */}
      {showList && (
        <TaskList
          filter={filter}
          query={query}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default TodoPage
