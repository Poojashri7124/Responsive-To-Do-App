
import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Save theme in localStorage
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // Apply dark class to HTML element
  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    )
  }, [theme])

  // Toggle between light and dark
  function toggleTheme() {
    setTheme((prev) =>
      prev === 'light' ? 'dark' : 'light'
    )
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
