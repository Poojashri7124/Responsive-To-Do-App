import { useState } from 'react'
import './TaskForm.css'

function TaskForm({ onAdd }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('Medium')

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed === '') return // empty tasks are not added

    const added = await onAdd(trimmed, priority)
    if (added) setText('') // clear the box only after the server said OK
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="task-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button className="task-add" type="submit">Add</button>
    </form>
  )
}

export default TaskForm