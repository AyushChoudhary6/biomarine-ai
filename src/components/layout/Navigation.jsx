import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Home,
  BarChart3,
  Database,
  Upload,
  Microscope,
  Brain,
  Info,
  Mail,
  Waves
} from 'lucide-react'
import { clsx } from 'clsx'

// Custom CMLRE Logo Component
const CMLRELogo = () => (
  <div className="flex items-center space-x-3">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-marine-500 rounded-lg rotate-45 animate-pulse"></div>
      <div className="absolute inset-1 bg-gradient-to-br from-ocean-400 to-primary-600 rounded-lg -rotate-45"></div>
      <Waves className="absolute inset-2 text-white z-10" />
    </div>
    <div className="hidden md:block">
      <h1 className="text-xl font-bold text-white">BioMarine</h1>
      <p className="text-xs text-white/70">Marine Research</p>
    </div>
  </div>
)


import ThemeToggle from '../ui/ThemeToggle'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    // { name: 'Research', path: '/research', icon: Database },
    // { name: 'Upload', path: '/upload', icon: Upload },
    { name: 'Otoliths', path: '/otoliths', icon: Microscope },
    { name: 'AI Models', path: '/ai-models', icon: Brain },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
   // { name: 'signup', path: '/signup', icon: Waves },
   // { name: 'login', path: '/login', icon: Waves },
    { name: 'profile', path: '/profile', icon: Waves },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-ocean-950/95 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 z-50">
              <CMLRELogo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={clsx(
                        'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        isActive(item.path)
                          ? 'bg-primary-600/30 text-white border border-primary-500/50 shadow-glow-primary'
                          : 'text-white/80 hover:text-white hover:bg-white/10 hover:shadow-md'
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Theme Toggle & Mobile menu */}
            <div className="flex items-center space-x-3">
              <ThemeToggle className="hidden sm:block" />
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-primary-400 transition-colors p-2"
                  aria-label="Toggle menu"
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </motion.div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-ocean-950/98 backdrop-blur-lg border-t border-white/10"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={clsx(
                        'flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                        isActive(item.path)
                          ? 'bg-primary-600/30 text-white border border-primary-500/50'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      )}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })}

                {/* Mobile Theme Toggle */}
                <div className="px-4 py-3 border-t border-white/10 mt-2 pt-4 sm:hidden">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-16"></div>
    </>
  )
}

export default Navigation
