import React from 'react'
import { motion } from 'framer-motion'
import { Microscope, Fish, Waves, FlaskConical } from 'lucide-react'

const Research = () => {
  const researchAreas = [
    {
      icon: Microscope,
      title: 'Otolith Analysis',
      description: 'Advanced microscopic analysis of fish otoliths for age determination and species identification',
      image: '/src/assets/CMLREOTL00001.jpg'
    },
    {
      icon: Fish,
      title: 'Marine Biology',
      description: 'Comprehensive studies of marine life behavior, habitat, and biodiversity',
      image: '/src/assets/CMLREOTL00010.jpg'
    },
    {
      icon: Waves,
      title: 'Ocean Dynamics',
      description: 'Research into ocean currents, temperature patterns, and ecosystem interactions',
      image: '/src/assets/CMLREOTL00020.jpg'
    },
    {
      icon: FlaskConical,
      title: 'Water Chemistry',
      description: 'Analysis of water composition, pollution levels, and chemical impact on marine life',
      image: '/src/assets/CMLREOTL00030.jpg'
    }
  ]

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">Research Areas</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Exploring the depths of marine science through cutting-edge research and innovative methodologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <area.icon className="absolute top-4 right-4 w-8 h-8 text-primary-400 z-20" />
                <div className="w-full h-full bg-primary-900/20 flex items-center justify-center">
                  <area.icon className="w-24 h-24 text-primary-400/30" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{area.title}</h3>
                <p className="text-white/70 leading-relaxed">{area.description}</p>
                <button className="mt-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 glass rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Collaborative Research</h2>
          <p className="text-white/70 mb-8 max-w-3xl mx-auto">
            We partner with leading institutions worldwide to advance marine science through 
            collaborative research projects and data sharing initiatives.
          </p>
          <button className="btn-primary">
            View Publications
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Research
