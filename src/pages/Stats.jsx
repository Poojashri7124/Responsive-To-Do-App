import { useTodos } from '../context/TodoContext'
import { useTodoStats } from '../hooks/useTodoStats'
import './Stats.css'

function Stats() {
  const { todos, loading } = useTodos()
  const { total, completed, pending, percent, byPriority } = useTodoStats(todos)

  if (loading) {
    return <p className="status">Loading…</p>
  }

  return (
    <div className="stats">
      <div className="stats-grid">
        <div className="stats-box">
          <span className="stats-number">{total}</span>
          <span className="stats-label">Total</span>
        </div>
        <div className="stats-box">
          <span className="stats-number">{completed}</span>
          <span className="stats-label">Completed</span>
        </div>
        <div className="stats-box">
          <span className="stats-number">{pending}</span>
          <span className="stats-label">Pending</span>
        </div>
        <div className="stats-box">
          <span className="stats-number">{percent}%</span>
          <span className="stats-label">Done</span>
        </div>
      </div>

      <h2 className="stats-title">By priority</h2>
      <ul className="stats-list">
        {byPriority.map((item) => (
          <li key={item.name} className="stats-row">
            <span className={`stats-chip stats-chip-${item.name.toLowerCase()}`}>
              {item.name}
            </span>
            <span className="stats-count">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Stats