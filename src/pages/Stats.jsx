import { useSelector } from 'react-redux'
import { selectTodoStats, selectTodosStatus } from '../features/todos/todoSlice'
import { priorityColors } from '../utils/priorityColors'

const boxClass = 'flex flex-col gap-0.5 rounded-xl bg-[#f5f4ff] p-4 dark:bg-[#26243d]'
const numberClass = 'text-[28px] font-bold text-[#4f46e5] dark:text-[#a5a0ff]'
const labelClass = 'text-sm text-[#6b6890] dark:text-[#a6a3c7]'

function Stats() {
  const status = useSelector(selectTodosStatus)
  const { total, completed, pending, percent, byPriority } = useSelector(selectTodoStats)

  if (status === 'idle' || status === 'loading') {
    return (
      <p className="px-6.5 py-[30px] text-center text-[15px] text-[#8a86a8] md:px-8 dark:text-[#a6a3c7]">
        Loading…
      </p>
    )
  }

  return (
    <div className="px-6.5 pt-5 pb-7 md:px-8">
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-3">
        <div className={boxClass}>
          <span className={numberClass}>{total}</span>
          <span className={labelClass}>Total</span>
        </div>
        <div className={boxClass}>
          <span className={numberClass}>{completed}</span>
          <span className={labelClass}>Completed</span>
        </div>
        <div className={boxClass}>
          <span className={numberClass}>{pending}</span>
          <span className={labelClass}>Pending</span>
        </div>
        <div className={boxClass}>
          <span className={numberClass}>{percent}%</span>
          <span className={labelClass}>Done</span>
        </div>
      </div>

      <h2 className="mt-6 mb-2 text-[15px] font-semibold">By priority</h2>
      <ul>
        {byPriority.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between border-b border-[#f1f0fa] py-3 dark:border-[#2c2a48]"
          >
            <span
              className={`rounded-full px-3 py-0.5 text-[11px] leading-[18px] font-bold ${priorityColors[item.name]}`}
            >
              {item.name}
            </span>
            <span className="text-base font-semibold">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Stats