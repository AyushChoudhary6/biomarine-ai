import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { Sun, Moon, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ThemeToggle = ({ className = '' }) => {
  const { theme, setTheme, toggleTheme } = useTheme()

  const themes = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'system', icon: Monitor, label: 'System' }
  ]

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
    } else {
      setTheme(newTheme)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/10">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          const isActive = theme === themeOption.id
          
          return (
            <motion.button
              key={themeOption.id}
              onClick={() => handleThemeChange(themeOption.id)}
              className={`
                relative p-2 rounded-full transition-all duration-200
                ${isActive 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white/80'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="theme-indicator"
                    className="absolute inset-0 bg-primary-500/30 border border-primary-400/50 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
              <Icon className="w-4 h-4 relative z-10" />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default ThemeToggle
