import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="notfound">
      <h2 className="notfound-code">404</h2>
      <p className="notfound-text">Page not found.</p>
      <Link className="notfound-link" to="/">
        Back to my tasks
      </Link>
    </div>
  )
}

export default NotFound