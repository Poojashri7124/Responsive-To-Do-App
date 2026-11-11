import { useSelector } from 'react-redux'
import {
  selectAllTodos,
  selectActiveTodos,
  selectCompletedTodos,
} from '../features/todos/todoSlice'
import TaskItem from './TaskItem'

const emptyMessages = {
  All: 'No tasks yet. Add one above!',
  Active: 'No active tasks.',
  Completed: 'No completed tasks yet.',
}

// todos without a due date go to the end
function byDueDate(a, b) {
  if (!a.dueDate && !b.dueDate) return 0
  if (!a.dueDate) return 1
  if (!b.dueDate) return -1
  return a.dueDate.localeCompare(b.dueDate)
}

// filter comes from the route, query from the search box
function TaskList({ filter, query, sortByDue }) {
  const allTodos = useSelector(selectAllTodos)
  const activeTodos = useSelector(selectActiveTodos)
  const completedTodos = useSelector(selectCompletedTodos)

  // the route decides which selector's list we show
  let todos = allTodos
  if (filter === 'Active') todos = activeTodos
  if (filter === 'Completed') todos = completedTodos

  // calculated while rendering - no second state
  const search = query.trim().toLowerCase()

  // .filter() gives a NEW array, so sorting it does not touch the store
  const visibleTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search)
  )

  if (sortByDue) {
    visibleTodos.sort(byDueDate)
  }

  if (visibleTodos.length === 0) {
    const message = search !== '' ? 'No tasks match your search.' : emptyMessages[filter]
    return (
      <p className="px-6.5 py-[30px] text-center text-[15px] text-[#8a86a8] md:px-8 dark:text-[#a6a3c7]">
        {message}
      </p>
    )
  }

  return (
    <ul className="px-6.5 md:px-8">
      {visibleTodos.map((todo) => (
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