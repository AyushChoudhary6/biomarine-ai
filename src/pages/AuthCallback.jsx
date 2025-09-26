import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const AuthCallback = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login } = useAuth()

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get('token')
        const userStr = searchParams.get('user')
        const error = searchParams.get('error')

        if (error) {
          console.error('OAuth error:', error)
          navigate('/login?error=oauth_failed')
          return
        }

        if (token && userStr) {
          // Store token and user data
          const userData = JSON.parse(decodeURIComponent(userStr))
          
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(userData))
          
          // Update auth context
          await login({ token, user: userData })
          
          // Redirect to dashboard
          navigate('/dashboard')
        } else {
          navigate('/login?error=missing_data')
        }
      } catch (error) {
        console.error('Error processing OAuth callback:', error)
        navigate('/login?error=processing_failed')
      }
    }

    handleOAuthCallback()
  }, [searchParams, navigate, login])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-white/70">Processing authentication...</p>
      </div>
    </div>
  )
}

export default AuthCallback
