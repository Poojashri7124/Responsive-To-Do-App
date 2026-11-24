
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import Progress from '../components/Progress'
import TaskForm from '../components/TaskForm'
import SearchBar from '../components/SearchBar'
import TaskList from '../components/TaskList'
import Footer from '../components/Footer'
import {
  selectAllTodos,
  selectTodosStatus,
  selectTodosError,
} from '../features/todos/todoSlice'

type TodoPageProps = {
  filter: 'All' | 'Active' | 'Completed'
}

// One page used by "/", "/active" and "/completed".
// The "filter" prop comes from the route.
function TodoPage({ filter }: TodoPageProps) {
  const todos = useSelector((state: RootState) => selectAllTodos(state))
  const status = useSelector((state: RootState) => selectTodosStatus(state))
  const error = useSelector((state: RootState) => selectTodosError(state))
  const loading = status === 'idle' || status === 'loading'
  const [query, setQuery] = useState('') // only this page needs the search text
  const [sortByDue, setSortByDue] = useState(false)

  // hide the list when loading, or when loading failed (nothing to show)
  const showList = !loading && !(error && todos.length === 0)

  return (
    <>
      <Progress />
      <TaskForm />
      <SearchBar query={query} onChange={setQuery} />

      <label className="flex cursor-pointer items-center gap-2 px-6.5 pb-4 text-sm text-[#6b6890] md:px-8 dark:text-[#a6a3c7]">
        <input
          className="accent-[#4f46e5]"
          type="checkbox"
          checked={sortByDue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSortByDue(e.target.checked)}
        />
        Sort by due date
      </label>

      {loading && (
        <p className="px-6.5 py-[ 30px] text-center text-[15px] text-[#8a86a8] md:px-8 dark:text-[#a6a3c7]">
          Loading…
        </p>
      )}
      {showList && <TaskList filter={filter} query={query} sortByDue={sortByDue} />}

      <Footer />
    </>
  )
}

export default TodoPage
