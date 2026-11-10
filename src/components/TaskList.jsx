
import { useTodos } from '../context/TodoContext'
import TaskItem from './TaskItem'

const emptyMessages = {
  All: 'No tasks yet. Add one above!',
  Active: 'No active tasks.',
  Completed: 'No completed tasks yet.',
}

function TaskList({ filter, query }) {
  const { todos } = useTodos()

  // Search filter
  const search = query.trim().toLowerCase()

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'Active' && todo.completed) return false
    if (filter === 'Completed' && !todo.completed) return false

    return todo.text.toLowerCase().includes(search)
  })

  // Sort by due date
  const sortedTodos = [...visibleTodos].sort((a, b) => {
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1

    return a.dueDate.localeCompare(b.dueDate)
  })

  // Empty message
  if (sortedTodos.length === 0) {
    const message =
      search !== ''
        ? 'No tasks match your search.'
        : emptyMessages[filter]

    return (
      <p className="py-8 text-center text-gray-500 dark:text-gray-400">
        {message}
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {sortedTodos.map((todo) => (
        <TaskItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          priority={todo.priority}
          completed={todo.completed}
          dueDate={todo.dueDate}
        />
      ))}
    </ul>
  )
}

export default TaskList
