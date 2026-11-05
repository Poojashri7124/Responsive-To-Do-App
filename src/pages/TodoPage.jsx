import { useState } from 'react'
import Progress from '../components/Progress'
import TaskForm from '../components/TaskForm'
import SearchBar from '../components/SearchBar'
import TaskList from '../components/TaskList'
import Footer from '../components/Footer'
import { useTodos } from '../context/TodoContext'

// One page used by "/", "/active" and "/completed".
// The "filter" prop comes from the route.
function TodoPage({ filter }) {
  const { todos, loading, error } = useTodos()
  const [query, setQuery] = useState('') // only this page needs the search text

  // hide the list when loading, or when loading failed (nothing to show)
  const showList = !loading && !(error && todos.length === 0)

  return (
    <>
      <Progress />
      <TaskForm />
      <SearchBar query={query} onChange={setQuery} />

      {loading && <p className="status">Loading…</p>}
      {showList && <TaskList filter={filter} query={query} />}

      <Footer />
    </>
  )
}

export default TodoPage