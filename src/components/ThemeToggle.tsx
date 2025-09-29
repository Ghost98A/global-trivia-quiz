import { useTheme } from '../contexts/ThemeContext'

function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme()

  const handleToggle = () => {
    if (theme === 'system') {
      setTheme(actualTheme === 'dark' ? 'light' : 'dark')
    } else if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const getIcon = () => {
    if (actualTheme === 'dark') {
      return '☀️'
    }
    return '🌙'
  }

  const getLabel = () => {
    if (theme === 'system') {
      return 'Auto'
    }
    return actualTheme === 'dark' ? 'Light' : 'Dark'
  }

  return (
    <button
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={`Switch to ${getLabel()} mode`}
      title={theme === 'system' ? `System theme (${actualTheme})` : `${theme} mode`}
    >
      <span className="theme-icon">{getIcon()}</span>
      <span className="theme-label">{getLabel()}</span>
    </button>
  )
}

export default ThemeToggle