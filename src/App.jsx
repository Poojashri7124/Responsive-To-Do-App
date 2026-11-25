import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import FilterTabs from './components/FilterTabs'
import TodoPage from './pages/TodoPage'
import Stats from './pages/Stats'
import TodoDetail from './pages/TodoDetail'
import NotFound from './pages/NotFound'
import { useTodos } from './context/TodoContext'
import './App.css'

const tabs = [
  { label: 'All', to: '/', end: true },
  { label: 'Active', to: '/active' },
  { label: 'Completed', to: '/completed' },
  { label: 'Stats', to: '/stats' },
]

function App() {
  const { error } = useTodos()

  return (
    <div className="app">
      <div className="card">
        <Header title="My Tasks" date="Saturday, 31 October 2026" />

        <div className="content">
          <FilterTabs tabs={tabs} />

          {error && <p className="status status-error">{error}</p>}

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