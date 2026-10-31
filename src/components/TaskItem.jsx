import './TaskItem.css'

function TaskItem({ text, priority, completed }) {
  return (
    <li className="task-item">
      <input
        className="task-check"
        type="checkbox"
        defaultChecked={completed}
        aria-label={text}
      />
      <span className={completed ? 'task-text task-done' : 'task-text'}>
        {text}
      </span>
      <span className={`badge badge-${priority.toLowerCase()}`}>{priority}</span>
      <button className="task-delete" type="button" aria-label="Delete task">
        🗑
      </button>
    </li>
  )
}

export default TaskItem
