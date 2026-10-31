import './TaskForm.css'

function TaskForm() {
  return (
    <div className="task-form">
      <input className="task-input" type="text" placeholder="Add a new task" />
      <select className="task-select" defaultValue="Medium">
        <option>HIGH</option>
        <option>MEDIUM</option>
        <option>LOW</option>
      </select>
      <button className="task-add" type="button">Add</button>
    </div>
  )
}

export default TaskForm
