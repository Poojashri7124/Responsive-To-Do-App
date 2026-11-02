import './TaskItem.css'

function TaskItem({ text, priority, completed ,onToggle,onDelete}) {
  return (
    <li className="task-item">
      <input
        className="task-check"
        type="checkbox"
        checked = {completed}
        onChange = {onToggle}
        aria-label={text}
      />
      <span className={completed ? 'task-text task-done' : 'task-text'}>
        {text}
      </span>
      <span className={`badge badge-${priority.toLowerCase()}`}>{priority}</span>
      <button 
        className="task-delete" 
        type="button" 
        aria-label="Delete task"
        onClick = {onDelete}>
        🗑
      </button>
    </li>
  )
}

export default TaskItem

