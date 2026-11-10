
import { useTheme } from '../context/ThemeContext'

function Header({ title, date }) {
  const { theme, toggleTheme } = useTheme()

  const next = theme === 'light' ? 'dark' : 'light'

  return (
    <header className="flex items-center justify-between bg-indigo-600 px-5 py-6 text-white sm:px-8">
      {/* Title and date */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          {title}
        </h1>

        <p className="mt-1 text-sm text-indigo-100">
          {date}
        </p>
      </div>

      {/* Dark mode toggle */}
      <button
        className="rounded-full bg-white/20 p-3 text-xl transition hover:bg-white/30"
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
