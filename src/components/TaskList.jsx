import TaskItem from './TaskItem'
import './TaskList.css'

function TaskList({ tasks }) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          text={task.text}
          priority={task.priority}
          completed={task.completed}
        />
      ))}
    </ul>
  )
}

export default TaskList
