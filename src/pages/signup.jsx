import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Book, GraduationCap, FileText, Building, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const SignUp = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    country: '',
    userType: '',
    qualifications: '',
    popularArticle: '',
    institute: '',
    specialization: '',
    yearsOfExperience: 0,
    researchInterests: []
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Prepare data for API (remove confirmPassword and empty researcher fields)
      const { confirmPassword, ...registrationData } = formData

      // Only include researcher fields if userType is researcher
      if (registrationData.userType === 'student') {
        delete registrationData.qualifications
        delete registrationData.popularArticle
        delete registrationData.institute
        delete registrationData.specialization
        delete registrationData.yearsOfExperience
        delete registrationData.researchInterests
      } else {
        // Convert researchInterests array to proper format
        if (registrationData.researchInterests && Array.isArray(registrationData.researchInterests)) {
          registrationData.researchInterests = registrationData.researchInterests.filter(item => item.length > 0)
        }
      }

      const result = await register(registrationData)
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'userType') {
      // Clear researcher-specific fields when switching to student
      if (value === 'student') {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          qualifications: '',
          popularArticle: '',
          institute: '',
          specialization: '',
          yearsOfExperience: 0,
          researchInterests: []
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }
    } else if (name === 'researchInterests') {
      // Handle research interests as comma-separated string
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(item => item.trim()).filter(item => item.length > 0)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="min-h-screen pt-8 mb-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">Join Our Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create your account to access research tools, collaborate with scientists, and contribute to marine science.
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Display */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}
            
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-white/70 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-white/70 text-sm font-medium mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-white/70 text-sm font-medium mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-white/70 text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-white/70 text-sm font-medium mb-2">
                  Country *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors"
                  >
                    <option value="">Select your country</option>
                    <option value="india">India</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                    <option value="japan">Japan</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* User Type Selection */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-4">
                I am a *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative cursor-pointer ${formData.userType === 'student' ? 'glass-strong' : 'glass-subtle'} rounded-lg p-4 transition-all duration-300 hover:scale-105`}>
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={formData.userType === 'student'}
                    onChange={handleChange}
                    className="absolute opacity-0"
                    required
                  />
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-6 h-6 text-primary-400" />
                    <div>
                      <p className="text-white font-medium">Student</p>
                      <p className="text-white/60 text-sm">Marine science student</p>
                    </div>
                  </div>
                </label>

                <label className={`relative cursor-pointer ${formData.userType === 'researcher' ? 'glass-strong' : 'glass-subtle'} rounded-lg p-4 transition-all duration-300 hover:scale-105`}>
                  <input
                    type="radio"
                    name="userType"
                    value="researcher"
                    checked={formData.userType === 'researcher'}
                    onChange={handleChange}
                    className="absolute opacity-0"
                    required
                  />
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-primary-400" />
                    <div>
                      <p className="text-white font-medium">Researcher</p>
                      <p className="text-white/60 text-sm">Professional researcher</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Researcher-specific fields */}
            {formData.userType === 'researcher' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="qualifications" className="block text-white/70 text-sm font-medium mb-2">
                    Qualifications *
                  </label>
                  <div className="relative">
                    <Book className="absolute left-3 top-3 text-white/60 w-5 h-5" />
                    <textarea
                      id="qualifications"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                      placeholder="List your academic qualifications and degrees..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="popularArticle" className="block text-white/70 text-sm font-medium mb-2">
                    Notable Publication/Research
                  </label>
                  <input
                    type="text"
                    id="popularArticle"
                    name="popularArticle"
                    value={formData.popularArticle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Enter the title of your notable publication or research"
                  />
                </div>

                <div>
                  <label htmlFor="specialization" className="block text-white/70 text-sm font-medium mb-2">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Enter your area of specialization"
                  />
                </div>

                <div>
                  <label htmlFor="yearsOfExperience" className="block text-white/70 text-sm font-medium mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Years of research experience"
                  />
                </div>

                <div>
                  <label htmlFor="researchInterests" className="block text-white/70 text-sm font-medium mb-2">
                    Research Interests
                  </label>
                  <textarea
                    id="researchInterests"
                    name="researchInterests"
                    value={formData.researchInterests.join(', ')}
                    onChange={(e) => handleChange({ target: { name: 'researchInterests', value: e.target.value } })}
                    rows={2}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                    placeholder="Enter your research interests (separated by commas)"
                  />
                  <p className="text-white/50 text-xs mt-1">Separate interests with commas (e.g., Marine Biology, Oceanography, Climate Change)</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg transition-all ${
                isSubmitting
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-white/70">
                Already have an account?{' '}
                <a href="/login" className="text-primary-400 hover:text-primary-300 transition-colors">
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">Benefits of Joining</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: 'Access Research Tools',
                description: 'Use our advanced AI models and analysis tools'
              },
              {
                icon: Book,
                title: 'Collaborate Globally',
                description: 'Connect with marine researchers worldwide'
              },
              {
                icon: GraduationCap,
                title: 'Contribute to Science',
                description: 'Share your data and participate in research'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center p-4"
              >
                <benefit.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUp