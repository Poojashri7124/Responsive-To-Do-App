import { useSelector } from 'react-redux'
import { selectTodoStats } from '../features/todos/todoSlice'

function Progress() {
  const { completed, total, percent } = useSelector(selectTodoStats)

  return (
    <div className="px-6.5 pt-5 md:px-8">
      <div className="mb-2 flex justify-between text-[13px] text-[#6b6890] dark:text-[#a6a3c7]">
        <span>Progress</span>
        <span>
          {completed} of {total} done · {percent}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#eeedff] dark:bg-[#2d2a55]">
        <div
          className="h-full rounded-full bg-[#4f46e5] transition-[width] duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default Progress