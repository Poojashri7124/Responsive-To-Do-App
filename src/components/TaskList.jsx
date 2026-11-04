import TaskItem from './TaskItem'
import './TaskList.css'

const emptyMessages = {
  All: 'No tasks yet. Add one above!',
  Active: 'No active tasks.',
  Completed: 'No completed tasks yet.',
}

function TaskList({ tasks, filter, searching, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    const message = searching ? 'No tasks match your search.' : emptyMessages[filter]
    return <p className="task-empty">{message}</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          text={task.text}
          priority={task.priority}
          completed={task.completed}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onEdit={(newText) => onEdit(task.id, newText)}
        />
      ))}
    </ul>
  )
}

export default TaskList