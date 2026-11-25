import { useTodos } from '../context/TodoContext'
import TaskItem from './TaskItem'
import './TaskList.css'

const emptyMessages = {
  All: 'No tasks yet. Add one above!',
  Active: 'No active tasks.',
  Completed: 'No completed tasks yet.',
}

// filter comes from the route, query from the search box
function TaskList({ filter, query }) {
  const { todos } = useTodos()

  // calculated while rendering - no second state
  const search = query.trim().toLowerCase()

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'Active' && todo.completed) return false
    if (filter === 'Completed' && !todo.completed) return false
    return todo.text.toLowerCase().includes(search)
  })

  if (visibleTodos.length === 0) {
    const message = search !== '' ? 'No tasks match your search.' : emptyMessages[filter]
    return <p className="task-empty">{message}</p>
  }

  return (
    <ul className="task-list">
      {visibleTodos.map((todo) => (
        <TaskItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          priority={todo.priority}
          completed={todo.completed}
        />
      ))}
    </ul>
  )
}

export default TaskList