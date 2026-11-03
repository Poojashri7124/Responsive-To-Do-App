import './Progress.css'

function Progress({ done, total }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <div className="progress">
      <div className="progress-info">
        <span>Progress</span>
        <span>
          
          {done} of {total} done · {percent}%  
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default Progress