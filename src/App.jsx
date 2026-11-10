
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import FilterTabs from './components/FilterTabs'
import TodoPage from './pages/TodoPage'
import Stats from './pages/Stats'
import TodoDetail from './pages/TodoDetail'
import NotFound from './pages/NotFound'
import { useTodos } from './context/TodoContext'

const tabs = [
  { label: 'All', to: '/', end: true },
  { label: 'Active', to: '/active' },
  { label: 'Completed', to: '/completed' },
  { label: 'Stats', to: '/stats' },
]

function App() {
  const { error } = useTodos()

  // Get current date dynamically
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#ecebff] px-4 py-8 text-[#1e1b3a] dark:bg-gray-950 dark:text-white sm:px-6 md:px-8">

      {/* Main card */}
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-900">

        {/* Header */}
        <Header title="My Tasks" date={today} />

        {/* Main content */}
        <div className="p-4 sm:p-6 md:p-8">

          <FilterTabs tabs={tabs} />

          {/* Error message */}
          {error && (
            <p className="my-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
              {error}
            </p>
          )}

          {/* Application routes */}
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
