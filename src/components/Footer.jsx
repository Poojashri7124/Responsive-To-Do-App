import './Footer.css'

function Footer({ remaining, onClear }) {
  return (
    <footer className="footer">
      <span className="footer-count">
        {remaining} {remaining === 1 ? 'task' : 'tasks'} left
      </span>
      <button className="footer-clear" type="button" onClick={onClear}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer