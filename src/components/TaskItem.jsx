import './TaskItem.css'
import {useState} from 'react'
function TaskItem({ text, priority, completed ,onToggle,onDelete,onEdit}) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(text)

  function startEditing (){
    setDraft(text)
    setIsEditing(true)
  }
  async function saveEdit() {
    const trimmed = draft.trim()
    if (trimmed === ''|| trimmed === text){
      setIsEditing(false)
      return
    }
    const saved = await onEdit(trimmed)
    if(saved) setIsEditing(false)
  }
  
  function handleKeyDown(e) {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') setIsEditing(false)
  }

  return (
    <li className="task-item">
      <input
        className="task-check"
        type="checkbox"
        checked = {completed}
        onChange = {onToggle}
        aria-label={text}
      />
      {isEditing ? (
        <input
          className="task-edit"
          type="text"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <span
          className={completed ? 'task-text task-done' : 'task-text'}
          onDoubleClick={startEditing}
          title="Double-click to edit"
        >
          {text}
        </span>
      )}

      <span className={`badge badge-${priority.toLowerCase()}`}>{priority}</span>
      <button
        className="task-delete"
        type="button"
        aria-label="Delete task"
        onClick={onDelete}
      >
        🗑
      </button>
    </li>
  )
}

export default TaskItem