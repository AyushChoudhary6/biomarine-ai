import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from './contexts/ThemeContext'

// Layout Components
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Page Components (Lazy loaded for better performance)
const Home = React.lazy(() => import('./pages/Home'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Research = React.lazy(() => import('./pages/Research'))
const DataUpload = React.lazy(() => import('./pages/DataUpload'))
const OtolithGallery = React.lazy(() => import('./pages/OtolithGallery'))
const AIModels = React.lazy(() => import('./pages/AIModels'))
const About = React.lazy(() => import('./pages/About'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Signup = React.lazy(() => import('./pages/signup'))
const Login = React.lazy(() => import('./pages/login'))
const Profile = React.lazy(() => import('./pages/profile'))


// Error Boundary for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-ocean-900 to-marine-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  const { theme } = useTheme()
  
  return (
    <ErrorBoundary>
      <div className={`min-h-screen transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100'
      }`}>
        {/* Enhanced Background Effects */}
        <div className={`fixed inset-0 pointer-events-none ${
          theme === 'dark' ? 'bg-mesh opacity-20' : 'bg-mesh opacity-10'
        }`} />
        
        {/* Subtle animated background */}
        <div className={`fixed inset-0 pointer-events-none overflow-hidden ${
          theme === 'dark' ? 'opacity-30' : 'opacity-20'
        }`}>
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-primary-500/20 to-accent-500/20' 
              : 'bg-gradient-to-br from-primary-200/40 to-accent-200/40'
          } animate-float`} />
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-accent-500/20 to-primary-500/20' 
              : 'bg-gradient-to-br from-accent-200/40 to-primary-200/40'
          } animate-float`} style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="flex-1">
          <Suspense 
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="large" />
              </div>
            }
          >
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Home />
                  </motion.div>
                } 
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/research" element={<Research />} />
              <Route path="/upload" element={<DataUpload />} />
              <Route path="/otoliths" element={<OtolithGallery />} />
              <Route path="/ai-models" element={<AIModels />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* 404 Route */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen flex items-center justify-center text-white">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold mb-4">404</h1>
                      <p className="text-xl mb-8">Page not found</p>
                      <a 
                        href="/" 
                        className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors inline-block"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </Suspense>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
