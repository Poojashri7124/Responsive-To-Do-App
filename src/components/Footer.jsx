import { useTodos } from '../context/TodoContext'
import { useTodoStats } from '../hooks/useTodoStats'
import './Footer.css'

function Footer() {
  const { todos, clearCompleted } = useTodos()
  const { pending } = useTodoStats(todos)

  return (
    <footer className="footer">
      <span className="footer-count">
        {pending} {pending === 1 ? 'task' : 'tasks'} left
      </span>
      <button className="footer-clear" type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer