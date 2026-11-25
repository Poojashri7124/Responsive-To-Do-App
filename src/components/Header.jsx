import { useTheme } from '../context/ThemeContext'
import './Header.css'

function Header({ title, date }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'light' ? 'dark' : 'light'

  return (
    <header className="header">
      <div>
        <h1 className="header-title">{title}</h1>
        <p className="header-date">{date}</p>
      </div>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${next} theme`}
        title={`Switch to ${next} theme`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}

export default Header