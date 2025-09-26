import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  Camera, 
  Award, 
  Book, 
  Building, 
  Calendar,
  Shield,
  Database,
  Upload,
  Download,
  BarChart3,
  Users,
  Globe,
  Microscope,
  Bell,
  Settings,
  LogOut,
  Brain,
  AlertCircle
} from 'lucide-react'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Profile = () => {
  const { user, isAuthenticated, loading, updateProfile, refreshProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [editData, setEditData] = useState({})
  const [updateLoading, setUpdateLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate])

  // Initialize edit data when user data is available
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '',
        qualifications: user.qualifications || '',
        popularArticle: user.popularArticle || '',
        institute: user.institute || '',
        specialization: user.specialization || '',
        yearsOfExperience: user.yearsOfExperience || 0,
        researchInterests: user.researchInterests || []
      })
    }
  }, [user])

  // Refresh profile data on component mount
  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile()
    }
  }, [isAuthenticated, refreshProfile])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">No User Data</h2>
          <p className="text-white/70 mb-4">Unable to load profile information</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    try {
      setUpdateLoading(true)
      setError('')
      
      const result = await updateProfile(editData)
      
      if (result.success) {
        setIsEditing(false)
      } else {
        setError(result.error || 'Failed to update profile')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset edit data to current user data
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '',
        qualifications: user.qualifications || '',
        popularArticle: user.popularArticle || '',
        institute: user.institute || '',
        specialization: user.specialization || '',
        yearsOfExperience: user.yearsOfExperience || 0,
        researchInterests: user.researchInterests || []
      })
    }
    setIsEditing(false)
    setError('')
  }

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Scalable sections that can be easily extended
  const profileSections = {
    profile: {
      title: 'Profile Information',
      icon: User,
      content: (
        <div className="space-y-6">
          {/* Basic Info Card */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Basic Information</h3>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: User, label: 'Full Name', field: 'name', type: 'text' },
                { icon: Mail, label: 'Email', field: 'email', type: 'email' },
                { icon: Phone, label: 'Phone', field: 'phone', type: 'tel' },
                { icon: MapPin, label: 'Country', field: 'country', type: 'text' },
                { icon: Calendar, label: 'Member Since', field: 'createdAt', type: 'text', readOnly: true },
                { icon: Building, label: 'Institute', field: 'institute', type: 'text' }
              ].map((item) => (
                <div key={item.field}>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    {item.label}
                  </label>
                  <div className="relative">
                    <item.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    {isEditing && !item.readOnly ? (
                      <input
                        type={item.type}
                        value={editData[item.field] || ''}
                        onChange={(e) => handleChange(item.field, e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors"
                      />
                    ) : (
                      <div className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg text-white">
                        {item.field === 'createdAt' 
                          ? new Date(user[item.field]).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })
                          : user[item.field] || 'Not provided'
                        }
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={handleSave}
                  disabled={updateLoading}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                    updateLoading
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {updateLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
                <button 
                  onClick={handleCancel}
                  disabled={updateLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
                >
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>

          {/* Professional Information */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">User Type</label>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Award className="w-5 h-5 text-primary-400" />
                  <span className="text-white capitalize">{user.userType || 'Not specified'}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Experience</label>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  {isEditing ? (
                    <input
                      type="number"
                      value={editData.yearsOfExperience || 0}
                      onChange={(e) => handleChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                      className="bg-transparent text-white focus:outline-none w-20"
                      min="0"
                    />
                  ) : (
                    <span className="text-white">{user.yearsOfExperience || 0} years</span>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white/70 text-sm font-medium mb-2">Qualifications</label>
                {isEditing ? (
                  <textarea
                    value={editData.qualifications || ''}
                    onChange={(e) => handleChange('qualifications', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors min-h-[100px]"
                    placeholder="Enter your qualifications..."
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-lg text-white">
                    {user.qualifications || 'No qualifications provided'}
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white/70 text-sm font-medium mb-2">Notable Publication</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.popularArticle || ''}
                    onChange={(e) => handleChange('popularArticle', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Enter your most notable publication..."
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-lg text-white">
                    {user.popularArticle || 'No publication provided'}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-white/70 text-sm font-medium mb-2">Specialization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.specialization || ''}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="Enter your specialization..."
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-lg text-white">
                    {user.specialization || 'No specialization provided'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Research Stats */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Research Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: Book, label: 'Publications', value: user.researchStats?.publications || 0, color: 'text-blue-400' },
                { icon: Users, label: 'Citations', value: user.researchStats?.citations || 0, color: 'text-green-400' },
                { icon: Database, label: 'Projects', value: user.researchStats?.projects || 0, color: 'text-purple-400' },
                { icon: Upload, label: 'Data Uploads', value: user.researchStats?.dataUploads || 0, color: 'text-yellow-400' },
                { icon: Microscope, label: 'Species ID', value: user.researchStats?.speciesIdentified || 0, color: 'text-pink-400' },
                { icon: Brain, label: 'AI Models', value: user.researchStats?.modelsTrained || 0, color: 'text-indigo-400' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-4 text-center"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Research Interests */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Research Interests</h3>
            {isEditing ? (
              <div>
                <textarea
                  value={editData.researchInterests?.join(', ') || ''}
                  onChange={(e) => handleChange('researchInterests', e.target.value.split(',').map(item => item.trim()).filter(item => item))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors min-h-[100px]"
                  placeholder="Enter research interests separated by commas..."
                />
                <p className="text-white/50 text-sm mt-2">Separate interests with commas</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.researchInterests && user.researchInterests.length > 0 ? (
                  user.researchInterests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-200 text-sm"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-white/70">No research interests provided</p>
                )}
              </div>
            )}
          </div>
        </div>
      ),
    },
    // Add other tabs here if needed
  }

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 hover:bg-primary-700 rounded-full flex items-center justify-center transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-2">{user.name || 'User Profile'}</h1>
          <p className="text-xl text-muted-foreground">{user.email}</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <span className="px-3 py-1 bg-primary-600/20 border border-primary-500/30 rounded-full text-primary-200 text-sm capitalize">
              {user.userType || 'Member'}
            </span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg text-red-200 hover:bg-red-600/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-lg p-1">
            {Object.entries(profileSections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-colors ${
                  activeTab === key
                    ? 'bg-primary-600 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {profileSections[activeTab]?.content}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile