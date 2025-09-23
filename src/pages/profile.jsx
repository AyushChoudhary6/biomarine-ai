import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
    Brain
} from 'lucide-react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    // Basic Information
    username: 'Dr. Marine Researcher',
    email: 'researcher@cmlre.org',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    joinDate: 'January 15, 2022',
    
    // Professional Information
    userType: 'Researcher',
    qualifications: 'PhD in Marine Biology, MSc in Oceanography',
    popularArticle: 'Advanced Otolith Analysis using Machine Learning',
    institute: 'Center for Marine Life Research & Education',
    specialization: 'Marine Ecology, Species Identification',
    yearsOfExperience: 8,
    
    // Research Stats
    researchStats: {
      publications: 24,
      collaborations: 15,
      dataUploads: 347,
      speciesIdentified: 156,
      modelsTrained: 8,
      datasetsContributed: 12
    },
    
    // Recent Activity
    recentActivity: [
      { type: 'upload', description: 'Uploaded otolith dataset', time: '2 hours ago' },
      { type: 'analysis', description: 'Completed species analysis', time: '1 day ago' },
      { type: 'publication', description: 'Published research paper', time: '3 days ago' },
      { type: 'collaboration', description: 'Joined research project', time: '1 week ago' }
    ],
    
    // Research Interests
    researchInterests: [
      'Otolith Analysis',
      'Marine Biodiversity',
      'AI in Marine Research',
      'Climate Change Impact',
      'Species Conservation'
    ]
  })

  const [editData, setEditData] = useState({ ...profileData })

  const handleSave = () => {
    setProfileData({ ...editData })
    setIsEditing(false)
    // Here you would typically make an API call to save the data
  }

  const handleCancel = () => {
    setEditData({ ...profileData })
    setIsEditing(false)
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: User, label: 'Full Name', field: 'username', type: 'text' },
                { icon: Mail, label: 'Email', field: 'email', type: 'email' },
                { icon: Phone, label: 'Phone', field: 'phone', type: 'tel' },
                { icon: MapPin, label: 'Country', field: 'country', type: 'text' },
                { icon: Calendar, label: 'Member Since', field: 'joinDate', type: 'text', readOnly: true },
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
                        value={editData[item.field]}
                        onChange={(e) => handleChange(item.field, e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors"
                      />
                    ) : (
                      <div className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg text-white">
                        {profileData[item.field]}
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
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button 
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
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
                  <span className="text-white">{profileData.userType}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Experience</label>
                <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <span className="text-white">{profileData.yearsOfExperience} years</span>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white/70 text-sm font-medium mb-2">Qualifications</label>
                {isEditing ? (
                  <textarea
                    value={editData.qualifications}
                    onChange={(e) => handleChange('qualifications', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors min-h-[100px]"
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-lg text-white">
                    {profileData.qualifications}
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white/70 text-sm font-medium mb-2">Notable Publication</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.popularArticle}
                    onChange={(e) => handleChange('popularArticle', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400 transition-colors"
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-lg text-white">
                    {profileData.popularArticle}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Research Interests */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Research Interests</h3>
            <div className="flex flex-wrap gap-3">
              {profileData.researchInterests.map((interest, index) => (
                <span key={index} className="px-4 py-2 bg-primary-600/20 text-primary-400 rounded-full text-sm">
                  {interest}
                </span>
              ))}
              {isEditing && (
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors">
                  + Add Interest
                </button>
              )}
            </div>
          </div>
        </div>
      )
    },
    
    stats: {
      title: 'Research Statistics',
      icon: BarChart3,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(profileData.researchStats).map(([key, value]) => {
            const icons = {
              publications: Book,
              collaborations: Users,
              dataUploads: Upload,
              speciesIdentified: Microscope,
              modelsTrained: Brain,
              datasetsContributed: Database
            }
            const IconComponent = icons[key] || BarChart3
            
            return (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-6 text-center"
              >
                <IconComponent className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-white/70 text-sm capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
              </motion.div>
            )
          })}
        </div>
      )
    },
    
    activity: {
      title: 'Recent Activity',
      icon: Calendar,
      content: (
        <div className="glass rounded-xl p-6">
          <div className="space-y-4">
            {profileData.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg"
              >
                <div className={`p-2 rounded-lg ${
                  activity.type === 'upload' ? 'bg-blue-500/20 text-blue-400' :
                  activity.type === 'analysis' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'publication' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {activity.type === 'upload' && <Upload className="w-4 h-4" />}
                  {activity.type === 'analysis' && <Microscope className="w-4 h-4" />}
                  {activity.type === 'publication' && <Book className="w-4 h-4" />}
                  {activity.type === 'collaboration' && <Users className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.description}</p>
                  <p className="text-white/60 text-sm">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    
    settings: {
      title: 'Account Settings',
      icon: Settings,
      content: (
        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { label: 'Email Notifications', default: true },
                { label: 'Research Updates', default: true },
                { label: 'Collaboration Requests', default: true },
                { label: 'New Publications', default: false }
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white">{setting.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={setting.default} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Public Profile</p>
                  <p className="text-white/60 text-sm">Allow others to see your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Research Data Sharing</p>
                  <p className="text-white/60 text-sm">Allow collaborative research</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass rounded-xl p-6 border border-red-500/20">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors">
                Export All Data
              </button>
              <button className="w-full text-left p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Profile Dashboard</h1>
          <p className="text-white/70 text-lg">Manage your account and research profile</p>
        </motion.div>

        {/* Profile Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary-600 rounded-full hover:bg-primary-700 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">{profileData.username}</h2>
              <p className="text-primary-400 mb-2">{profileData.userType}</p>
              <p className="text-white/70 mb-4">{profileData.institute}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-center">
                  <div className="text-white font-bold text-lg">{profileData.researchStats.publications}</div>
                  <div className="text-white/70 text-sm">Publications</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg">{profileData.yearsOfExperience}+</div>
                  <div className="text-white/70 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-lg">{profileData.researchStats.collaborations}</div>
                  <div className="text-white/70 text-sm">Collaborations</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-3">
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-white" />
              </button>
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-white" />
              </button>
              <button className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                <LogOut className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-2 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {Object.entries(profileSections).map(([key, section]) => {
              const Icon = section.icon
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                    activeTab === key 
                      ? 'bg-primary-600 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Active Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {profileSections[activeTab]?.content}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile