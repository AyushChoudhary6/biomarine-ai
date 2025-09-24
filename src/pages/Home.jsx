import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { 
  ArrowRight, 
  Database, 
  Brain, 
  Microscope, 
  BarChart3,
  Users,
  Globe,
  Waves,
  ChevronDown,
  Play,
  Upload
} from 'lucide-react'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

// Hero Section
const HeroSection = () => {
  const { theme } = useTheme()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/Bg.png" 
          alt="Marine background" 
          className="w-full h-full object-cover"
        />
        {/* Theme-based overlay */}
        <div className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-slate-900/85 via-blue-900/75 to-indigo-900/85' 
            : 'bg-gradient-to-br from-white/85 via-blue-50/80 to-cyan-50/85'
        }`}></div>
      </div>
      
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              theme === 'dark' ? 'bg-primary-400' : 'bg-primary-600'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <span className="block">Center for</span>
              <span className="block text-gradient-ocean">
                Marine Research
              </span>
            </h1>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-white/80' : 'text-slate-700'
            }`}
          >
            Advancing ocean science through cutting-edge AI, collaborative research, 
            and innovative data solutions to protect marine ecosystems worldwide.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link
              to="/research"
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center"
            >
              Explore Research
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/data-upload"
              className={`group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 flex items-center ${
                theme === 'dark' 
                  ? 'border-white/20 text-white hover:bg-white/10' 
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Upload className="mr-2 w-5 h-5" />
              Upload Data
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`p-2 rounded-full ${
                theme === 'dark' ? 'bg-white/10' : 'bg-slate-900/10'
              }`}
            >
              <ChevronDown className={`w-6 h-6 ${
                theme === 'dark' ? 'text-white/60' : 'text-slate-600'
              }`} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Marine Elements */}
      <motion.div
        className="absolute bottom-10 left-10 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Waves className={`w-12 h-12 ${
          theme === 'dark' ? 'text-primary-400' : 'text-primary-600'
        }`} />
      </motion.div>
    </section>
  )
}

// Features Section
const FeaturesSection = () => {
  const { theme } = useTheme()
  
  const features = [
    {
      icon: Database,
      title: 'Advanced Data Management',
      description: 'Secure, scalable storage and analysis of marine research data with real-time collaboration tools.',
      link: '/dashboard'
    },
    {
      icon: Brain,
      title: 'AI/ML Integration',
      description: 'Cutting-edge machine learning models for species identification, behavior analysis, and predictive modeling.',
      link: '/ai-models'
    },
    {
      icon: Microscope,
      title: 'Otolith Analysis',
      description: 'Comprehensive otolith database with AI-powered identification and age estimation tools.',
      link: '/otolith-gallery'
    },
    {
      icon: Globe,
      title: 'Global Collaboration',
      description: 'Connect with researchers worldwide, share data, and contribute to marine conservation efforts.',
      link: '/research'
    }
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.h2 
          variants={itemVariants}
          className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          Research Features
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className={`text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-white/70' : 'text-slate-600'
          }`}
        >
          Discover our comprehensive suite of tools and resources for marine research
        </motion.p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group"
            >
              <Link 
                to={feature.link}
                className="block h-full p-8 glass rounded-xl hover:glass-strong transition-all duration-300 hover:scale-105"
              >
                <div className={`p-4 rounded-xl mb-6 w-fit ${
                  theme === 'dark' ? 'bg-primary-500/20' : 'bg-primary-100'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    theme === 'dark' ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-white/70' : 'text-slate-600'
                }`}>
                  {feature.description}
                </p>
                <div className={`mt-4 flex items-center text-sm font-medium ${
                  theme === 'dark' ? 'text-primary-400' : 'text-primary-600'
                } group-hover:translate-x-1 transition-transform`}>
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}

// Statistics Section
const StatsSection = () => {
  const { theme } = useTheme()
  
  const stats = [
    { value: '50,000+', label: 'Research Samples', icon: Database },
    { value: '98.5%', label: 'AI Accuracy', icon: Brain },
    { value: '150+', label: 'Species Identified', icon: Microscope },
    { value: '25+', label: 'Global Partners', icon: Globe }
  ]

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' 
        ? 'bg-gradient-to-r from-slate-900/50 to-blue-900/50' 
        : 'bg-gradient-to-r from-blue-50 to-indigo-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className={`p-4 rounded-xl w-fit mx-auto mb-4 ${
                  theme === 'dark' ? 'bg-primary-500/20' : 'bg-primary-100'
                }`}>
                  <Icon className={`w-8 h-8 ${
                    theme === 'dark' ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                </div>
                <motion.div
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-4xl md:text-5xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {stat.value}
                </motion.div>
                <p className={`text-lg ${
                  theme === 'dark' ? 'text-white/70' : 'text-slate-600'
                }`}>
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  const { theme } = useTheme()
  
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Join the Marine Research Revolution
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-white/70' : 'text-slate-600'
          }`}>
            Contribute to groundbreaking marine science research. Upload your data, 
            access our AI models, and collaborate with scientists worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/data-upload"
              className="btn-primary"
            >
              <Upload className="mr-2 w-5 h-5" />
              Start Contributing
            </Link>
            <Link
              to="/contact"
              className="btn-secondary"
            >
              Contact Research Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Home Component
const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  )
}

export default Home
