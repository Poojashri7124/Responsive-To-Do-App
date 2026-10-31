import Header from './components/Header'
import TaskForm from './components/TaskForm'
import FilterTabs from './components/FilterTabs'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import tasks from './data/todos.json'
import './App.css'

function App() {
  const remaining = tasks.filter((task) => !task.completed).length

  return (
    <div className="app">
      <div className="card">
        <Header title="My Tasks" date="Saturday, 31 October 2026" />
        <TaskForm />
        <FilterTabs tabs={['All', 'Active', 'Completed']} activeTab="Completed" />
        <TaskList tasks={tasks} />
        <Footer remaining={remaining} />
      </div>
    </div>
  )
}

export default App