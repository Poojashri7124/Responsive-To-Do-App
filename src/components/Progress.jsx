import { useTodos } from '../context/TodoContext'
import { useTodoStats } from '../hooks/useTodoStats'
import './Progress.css'

function Progress() {
  const { todos } = useTodos()
  const { completed, total, percent } = useTodoStats(todos)

  return (
    <div className="progress">
      <div className="progress-info">
        <span>Progress</span>
        <span>
          {completed} of {total} done · {percent}%
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default Progress