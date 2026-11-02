import TaskItem from './TaskItem'
import './TaskList.css'

const emptyMessages = {
  All: 'No tasks available.',
  Active: 'No active tasks.',
  Completed : 'No completed Tasks.'
}
function TaskList({ tasks, filter,onToggle,onDelete }) {
  if(tasks.length === 0){
    return <p className="task-empty">{emptyMessages[filter]}</p>
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          text={task.text}
          priority={task.priority}
          completed={task.completed}
          onToggle = {() => onToggle(task.id)}
          onDelete = {() => onDelete(task.id)}
        />
      ))}
    </ul>
  )
}

export default TaskList
