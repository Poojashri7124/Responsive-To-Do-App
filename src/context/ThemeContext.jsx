import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // saved in localStorage, so it stays after a refresh
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  
  // add the class "dark" to <body> in dark mode (CSS: .dark .card { ... })
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error('useTheme must be used inside <ThemeProvider>')
  }
  return context
}