import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import FilterTabs from './components/FilterTabs'
import TodoPage from './pages/TodoPage'
import Stats from './pages/Stats'
import TodoDetail from './pages/TodoDetail'
import NotFound from './pages/NotFound'
import { fetchTodos, selectTodosError } from './features/todos/todoSlice'

const tabs = [
  { label: 'All', to: '/', end: true },
  { label: 'Active', to: '/active' },
  { label: 'Completed', to: '/completed' },
  { label: 'Stats', to: '/stats' },
]

function App() {
  const dispatch = useDispatch()
  const error = useSelector(selectTodosError)

  // GET when the app opens
  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    // mobile: page has a margin, desktop (md:) fills the whole screen
    <div className="min-h-screen bg-[#ecebff] p-[15px_17px] md:bg-white md:p-0 dark:bg-[#121120] dark:md:bg-[#1c1b2e]">
      <div className="mx-auto flex max-w-[480px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_45px_rgba(79,70,229,0.16)] md:min-h-screen md:max-w-none md:rounded-none md:shadow-none dark:bg-[#1c1b2e]">
        <Header title="My Tasks" date="Saturday, 31 October 2026" />

        <div className="mx-auto w-full max-w-[1000px] flex-1">
          <FilterTabs tabs={tabs} />

          {error && (
            <p className="mx-6.5 my-4 rounded-[10px] bg-[#fde2e4] px-3.5 py-3 text-left text-[15px] text-[#d62839] md:mx-8 dark:bg-[#43202a] dark:text-[#ff8d98]">
              {error}
            </p>
          )}

          <Routes>
            <Route path="/" element={<TodoPage filter="All" />} />
            <Route path="/active" element={<TodoPage filter="Active" />} />
            <Route path="/completed" element={<TodoPage filter="Completed" />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/todo/:id" element={<TodoDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App