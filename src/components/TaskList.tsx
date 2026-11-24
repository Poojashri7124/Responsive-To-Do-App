
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import {
  selectAllTodos,
  selectActiveTodos,
  selectCompletedTodos,
} from '../features/todos/todoSlice'
import TaskItem from './TaskItem'

// Define filter options
type Filter = 'All' | 'Active' | 'Completed'

// Define Todo structure
interface Todo {
  id: number | string
  text: string
  priority: 'High' | 'Medium' | 'Low'
  completed: boolean
  dueDate: string
}

// Define component props
interface TaskListProps {
  filter: Filter
  query: string
  sortByDue: boolean
}

const emptyMessages: Record<Filter, string> = {
  All: 'No tasks yet. Add one above!',
  Active: 'No active tasks.',
  Completed: 'No completed tasks yet.',
}

// Todos without a due date go to the end
function byDueDate(a: Todo, b: Todo): number {
  if (!a.dueDate && !b.dueDate) return 0
  if (!a.dueDate) return 1
  if (!b.dueDate) return -1

  return a.dueDate.localeCompare(b.dueDate)
}

// Filter comes from the route, query from the search box
function TaskList({ filter, query, sortByDue }: TaskListProps) {
  const allTodos = useSelector((state: RootState) =>
    selectAllTodos(state)
  )

  const activeTodos = useSelector((state: RootState) =>
    selectActiveTodos(state)
  )

  const completedTodos = useSelector((state: RootState) =>
    selectCompletedTodos(state)
  )

  // The route decides which selector's list we show
  let todos: Todo[] = allTodos

  if (filter === 'Active') todos = activeTodos
  if (filter === 'Completed') todos = completedTodos

  // Calculated while rendering - no second state
  const search = query.trim().toLowerCase()

  // Filter gives a new array
  const visibleTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search)
  )

  if (sortByDue) {
    visibleTodos.sort(byDueDate)
  }

  if (visibleTodos.length === 0) {
    const message =
      search !== '' ? 'No tasks match your search.' : emptyMessages[filter]

    return (
      <p className="px-6.5 py-[ 30px] text-center text-[15px] text-[#8a86a8] md:px-8 dark:text-[#a6a3c7]">
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
