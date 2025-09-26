import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    // Update CSS custom properties based on theme
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      
      // Dark theme colors
      root.style.setProperty('--bg-primary', '#0a0f1c')
      root.style.setProperty('--bg-secondary', '#1a2332')
      root.style.setProperty('--bg-tertiary', '#2a3441')
      root.style.setProperty('--text-primary', '#ffffff')
      root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.7)')
      root.style.setProperty('--text-tertiary', 'rgba(255, 255, 255, 0.5)')
      root.style.setProperty('--border-primary', 'rgba(255, 255, 255, 0.1)')
      root.style.setProperty('--border-secondary', 'rgba(255, 255, 255, 0.05)')
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.08)')
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.12)')
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.4)')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
      
      // Light theme colors
      root.style.setProperty('--bg-primary', '#f8fafc')
      root.style.setProperty('--bg-secondary', '#ffffff')
      root.style.setProperty('--bg-tertiary', '#f1f5f9')
      root.style.setProperty('--text-primary', '#1e293b')
      root.style.setProperty('--text-secondary', 'rgba(30, 41, 59, 0.8)')
      root.style.setProperty('--text-tertiary', 'rgba(30, 41, 59, 0.6)')
      root.style.setProperty('--border-primary', 'rgba(30, 41, 59, 0.1)')
      root.style.setProperty('--border-secondary', 'rgba(30, 41, 59, 0.05)')
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.7)')
      root.style.setProperty('--glass-border', 'rgba(30, 41, 59, 0.1)')
      root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
