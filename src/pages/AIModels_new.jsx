import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Download, 
  Upload, 
  Settings, 
  Play, 
  BarChart3,
  Eye,
  CheckCircle,
  Clock,
  Cpu,
  Zap
} from 'lucide-react'

const AIModels = () => {
  const [selectedModel, setSelectedModel] = useState('otolith-classifier')
  const [isTraining, setIsTraining] = useState(false)

  const models = [
    {
      id: 'otolith-classifier',
      name: 'Otolith Species Classifier',
      description: 'Advanced deep learning model for fish species identification from otolith images',
      accuracy: '98.5%',
      status: 'active',
      version: '2.1.0',
      icon: Brain,
      trainingData: '15,847 samples',
      parameters: '12.3M'
    },
    {
      id: 'age-estimator',
      name: 'Age Estimation Model',
      description: 'Neural network for determining fish age from otolith growth patterns',
      accuracy: '94.2%',
      status: 'training',
      version: '1.8.5',
      icon: Clock,
      trainingData: '8,392 samples',
      parameters: '8.7M'
    },
    {
      id: 'morphology-analyzer',
      name: 'Morphology Analyzer',
      description: 'Computer vision model for otolith shape and structure analysis',
      accuracy: '91.8%',
      status: 'inactive',
      version: '1.5.2',
      icon: Eye,
      trainingData: '6,215 samples',
      parameters: '15.1M'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20'
      case 'training': return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
      case 'inactive': return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    }
  }

  const selectedModelData = models.find(m => m.id === selectedModel)

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gradient-ocean mb-6">
            AI/ML Models Hub
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Advanced artificial intelligence models for marine life research and species identification
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Model List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Available Models</h2>
              <div className="space-y-4">
                {models.map((model, index) => {
                  const Icon = model.icon
                  
                  return (
                    <motion.button
                      key={model.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onClick={() => setSelectedModel(model.id)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                        selectedModel === model.id
                          ? 'glass-strong glow'
                          : 'glass-subtle hover:glass'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-primary-500/20 text-primary-400">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-white text-sm mb-1">
                              {model.name}
                            </h3>
                            <p className="text-white/60 text-xs leading-relaxed">
                              {model.description.substring(0, 60)}...
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(model.status)}`}>
                            {model.status}
                          </div>
                          <span className="text-xs text-white/60">{model.accuracy}</span>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Model Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            {selectedModelData && (
              <div className="space-y-6">
                {/* Model Header */}
                <div className="glass rounded-xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 rounded-xl bg-primary-500/20 text-primary-400">
                        <selectedModelData.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {selectedModelData.name}
                        </h2>
                        <p className="text-white/70">
                          {selectedModelData.description}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg border font-medium ${getStatusColor(selectedModelData.status)}`}>
                      <span className="capitalize">{selectedModelData.status}</span>
                    </div>
                  </div>

                  {/* Model Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Accuracy', value: selectedModelData.accuracy, icon: BarChart3 },
                      { label: 'Version', value: selectedModelData.version, icon: Settings },
                      { label: 'Parameters', value: selectedModelData.parameters, icon: Brain },
                      { label: 'Training Data', value: selectedModelData.trainingData, icon: Upload }
                    ].map((stat, index) => (
                      <div key={stat.label} className="card-minimal text-center">
                        <stat.icon className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-white/60 text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Actions */}
                <div className="glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Model Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button 
                      className={`btn-primary ${isTraining ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isTraining}
                      onClick={() => setIsTraining(!isTraining)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isTraining ? 'Training...' : 'Start Training'}
                    </button>
                    <button className="btn-secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Export Model
                    </button>
                    <button className="btn-ghost">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Data
                    </button>
                    <button className="btn-ghost">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </button>
                  </div>
                </div>

                {/* Training Progress */}
                {isTraining && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-xl p-6"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">Training Progress</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Epoch 15/50</span>
                        <span className="text-white">30% Complete</span>
                      </div>
                      <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '30%' }}
                          transition={{ duration: 2, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Loss:</span>
                          <span className="ml-2 text-white font-mono">0.0234</span>
                        </div>
                        <div>
                          <span className="text-white/60">Accuracy:</span>
                          <span className="ml-2 text-white font-mono">94.2%</span>
                        </div>
                        <div>
                          <span className="text-white/60">Val Loss:</span>
                          <span className="ml-2 text-white font-mono">0.0312</span>
                        </div>
                        <div>
                          <span className="text-white/60">ETA:</span>
                          <span className="ml-2 text-white font-mono">2h 15m</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AIModels
