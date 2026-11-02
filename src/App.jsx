import {useState} from 'react' 
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import FilterTabs from './components/FilterTabs'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import initialTasks from './data.js'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('All')

  function addTask(text,priority){
    const newTask = {id: Date.now(),text,priority, completed: false}
    setTasks([...tasks, newTask])
  }
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  function clearCompleted(){
    setTasks(tasks.filter((task) => !task.completed))
    
  }
  const visibleTasks = tasks.filter((task) => {
    if(filter === 'Active') return !task.completed
    if(filter === 'Completed') return task.completed
    return true
  })
  const remaining = tasks.filter((task) => !task.completed).length

  return (
    <div className="app">
      <div className="card">
        <Header title="My Tasks" date="Monday, 2 November 2026" />
        <TaskForm onAdd={addTask} />
        <FilterTabs
          tabs={['All', 'Active', 'Completed']}
          activeTab={filter}
          onChange={setFilter}
        />
        <TaskList
          tasks={visibleTasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
        <Footer remaining={remaining} onClear={clearCompleted} />
      </div>
    </div>
  )
}

export default App