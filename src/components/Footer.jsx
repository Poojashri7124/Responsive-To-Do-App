import { useDispatch, useSelector } from 'react-redux'
import { clearCompleted, selectTodoStats } from '../features/todos/todoSlice'

function Footer() {
  const dispatch = useDispatch()
  const { pending } = useSelector(selectTodoStats)

  return (
    <footer className="flex items-center justify-between px-6.5 py-5 md:px-8">
      <span className="text-[13px] text-[#6b6890] md:text-sm dark:text-[#a6a3c7]">
        {pending} {pending === 1 ? 'task' : 'tasks'} left
      </span>
      <button
        className="cursor-pointer text-sm text-[#4f46e5] md:text-[15px] dark:text-[#a5a0ff]"
        type="button"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  )
}

export default Footer