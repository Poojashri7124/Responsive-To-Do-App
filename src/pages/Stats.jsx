import './Stats.css'

const priorities = ['High', 'Medium', 'Low']

function Stats({ tasks, loading }) {
  if (loading) {
    return <p className="status">Loading…</p>
  }

  // all calculated while rendering from the shared tasks
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

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
        {priorities.map((name) => (
          <li key={name} className="stats-row">
            <span className={`stats-chip stats-chip-${name.toLowerCase()}`}>
              {name}
            </span>
            <span className="stats-count">
              {tasks.filter((t) => t.priority === name).length}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Stats