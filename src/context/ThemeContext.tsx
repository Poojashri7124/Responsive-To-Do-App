
import {
  createContext,
  useContext,
  useEffect,
} from 'react'
import type { ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Define theme values
type Theme = 'light' | 'dark'

// Define context structure
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Create context with an initial null value
const ThemeContext = createContext<ThemeContextType | null>(null)

// Define provider props
interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Save theme in localStorage
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')

  // Apply dark class to HTML element
  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    )
  }, [theme])

  // Toggle between light and dark
  function toggleTheme(): void {
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

// Custom hook
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme must be used inside <ThemeProvider>')
  }

  return context
}
