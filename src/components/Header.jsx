import { useTheme } from '../context/ThemeContext'

function Header({ title, date }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'light' ? 'dark' : 'light'

  return (
    <header className="bg-[#4f46e5] text-white dark:bg-[#5b52f0]">
      <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6.5 pt-7 pb-6 md:px-8">
        <div>
          <h1 className="text-[28px] leading-[1.2] font-bold">{title}</h1>
          <p className="mt-[5px] text-sm leading-[1.4] opacity-85">{date}</p>
        </div>
        <button
          className="h-[42px] w-[42px] shrink-0 cursor-pointer rounded-full bg-white/20 text-xl leading-none hover:bg-white/30"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${next} theme`}
          title={`Switch to ${next} theme`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

export default Header