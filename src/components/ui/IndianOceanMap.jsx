import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Waves, Fish, Thermometer, Eye, Info } from 'lucide-react'

const IndianOceanMap = ({ analysisResult }) => {
  const [selectedRegion, setSelectedRegion] = useState(null)

  // Accurate Indian Ocean regions with precise coordinates and marine data
  const oceanRegions = [
    {
      id: 'bay-of-bengal',
      name: 'Bay of Bengal',
      coordinates: { x: 72, y: 42 },
      species: 1247,
      temperature: '26-29°C',
      depth: '2000-4000m',
      biodiversity: 'Very High',
      salinity: '32-34 PSU',
      endemicSpecies: ['Hilsa', 'Indian Mackerel', 'Pomfret', 'Rohu'],
      threats: ['Overfishing', 'Pollution', 'Climate Change'],
      conservation: 'Marine Protected Areas: 12'
    },
    {
      id: 'arabian-sea',
      name: 'Arabian Sea',
      coordinates: { x: 52, y: 45 },
      species: 956,
      temperature: '24-28°C',
      depth: '1000-3500m',
      biodiversity: 'High',
      salinity: '35-37 PSU',
      endemicSpecies: ['Kingfish', 'Tuna', 'Sardines', 'Barracuda'],
      threats: ['Industrial Pollution', 'Shipping Traffic'],
      conservation: 'Marine Protected Areas: 8'
    },
    {
      id: 'lakshadweep-sea',
      name: 'Lakshadweep Sea',
      coordinates: { x: 45, y: 62 },
      species: 643,
      temperature: '27-30°C',
      depth: '200-1000m',
      biodiversity: 'Very High',
      salinity: '34-36 PSU',
      endemicSpecies: ['Reef Fish', 'Angelfish', 'Butterflyfish', 'Coral Trout'],
      threats: ['Coral Bleaching', 'Tourism Impact'],
      conservation: 'Coral Reef Protection: Active'
    },
    {
      id: 'andaman-sea',
      name: 'Andaman Sea',
      coordinates: { x: 85, y: 58 },
      species: 1124,
      temperature: '25-28°C',
      depth: '500-2000m',
      biodiversity: 'Extremely High',
      salinity: '33-35 PSU',
      endemicSpecies: ['Grouper', 'Snapper', 'Coral Trout', 'Mangrove Fish'],
      threats: ['Illegal Fishing', 'Habitat Loss'],
      conservation: 'UNESCO Biosphere Reserve'
    }
  ]

  // Major coastal cities and research stations
  const coastalAreas = [
    { name: 'Mumbai Coast', x: 48, y: 52, species: 234, type: 'major-port' },
    { name: 'Chennai Coast', x: 65, y: 58, species: 312, type: 'research-hub' },
    { name: 'Kochi Coast', x: 52, y: 65, species: 189, type: 'fishing-port' },
    { name: 'Visakhapatnam Coast', x: 72, y: 50, species: 267, type: 'naval-base' },
    { name: 'Goa Coast', x: 50, y: 57, species: 198, type: 'tourism-hub' }
  ]

  // Ocean currents
  const oceanCurrents = [
    {
      id: 'southwest-monsoon',
      path: 'M 20,40 Q 40,35 60,45 Q 80,55 95,65',
      name: 'Southwest Monsoon Current'
    },
    {
      id: 'northeast-monsoon', 
      path: 'M 95,70 Q 75,60 55,50 Q 35,45 15,55',
      name: 'Northeast Monsoon Current'
    }
  ]

  const getRegionColor = (biodiversity) => {
    switch (biodiversity) {
      case 'Extremely High': return 'text-green-300 bg-green-500/30'
      case 'Very High': return 'text-green-400 bg-green-500/20'
      case 'High': return 'text-blue-400 bg-blue-500/20'
      case 'Moderate': return 'text-yellow-400 bg-yellow-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getPortTypeIcon = (type) => {
    switch (type) {
      case 'research-hub': return '🔬'
      case 'major-port': return '⚓'
      case 'fishing-port': return '🐟'
      case 'naval-base': return '🚢'
      case 'tourism-hub': return '🏖️'
      default: return '📍'
    }
  }

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Waves className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Indian Ocean Marine Distribution</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          Interactive Marine Biodiversity Map
        </div>
      </div>

      <div className="relative">
        {/* Enhanced Map Container */}
        <div className="relative w-full h-[500px] rounded-lg border border-border overflow-hidden">
          {/* Ocean Background */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #2563eb 50%, #3b82f6 75%, #60a5fa 100%)' }}
          >
            <defs>
              <radialGradient id="deepWater" cx="50%" cy="60%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#1e293b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* Deep ocean areas */}
            <ellipse cx="65" cy="70" rx="25" ry="15" fill="url(#deepWater)" />
            <ellipse cx="45" cy="55" rx="20" ry="25" fill="url(#deepWater)" />

            {/* Ocean currents */}
            {oceanCurrents.map((current, index) => (
              <motion.path
                key={current.id}
                d={current.path}
                stroke="#60a5fa"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4,2"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: index * 0.5, repeat: Infinity, repeatType: "loop" }}
              />
            ))}

            {/* Islands */}
            <circle cx="48" cy="75" r="1.5" fill="#10b981" />
            <circle cx="25" cy="65" r="2" fill="#10b981" />
            <ellipse cx="87" cy="58" rx="3" ry="8" fill="#10b981" />
          </svg>

          {/* Ocean Regions */}
          {oceanRegions.map((region, index) => (
            <motion.div
              key={region.id}
              className="absolute group cursor-pointer"
              style={{ 
                left: `${region.coordinates.x}%`, 
                top: `${region.coordinates.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelectedRegion(region)}
            >
              <div className={`relative w-5 h-5 rounded-full border-2 border-white shadow-lg ${getRegionColor(region.biodiversity)}`}>
                <div className="absolute inset-0 rounded-full animate-ping opacity-75"></div>
                <Fish className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <div className="bg-card/98 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl min-w-72">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-foreground text-lg">{region.name}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRegionColor(region.biodiversity)}`}>
                      {region.biodiversity}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground block">Species:</span>
                      <span className="text-foreground font-semibold">{region.species.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Temperature:</span>
                      <span className="text-foreground font-semibold">{region.temperature}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Depth:</span>
                      <span className="text-foreground font-semibold">{region.depth}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Salinity:</span>
                      <span className="text-foreground font-semibold">{region.salinity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Coastal Areas */}
          {coastalAreas.map((area, index) => (
            <motion.div
              key={area.name}
              className="absolute group"
              style={{ 
                left: `${area.x}%`, 
                top: `${area.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-white shadow-lg relative">
                <span className="absolute -top-1 -right-1 text-xs">
                  {getPortTypeIcon(area.type)}
                </span>
              </div>
              
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl whitespace-nowrap">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{getPortTypeIcon(area.type)}</span>
                    <p className="text-sm font-semibold text-foreground">{area.name}</p>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Species:</span>
                      <span className="text-foreground font-medium">{area.species}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Analysis Result Highlight */}
          {analysisResult && (
            <motion.div
              className="absolute z-30"
              style={{ 
                left: '72%', 
                top: '42%',
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-red-500 rounded-full border-3 border-white shadow-xl animate-pulse relative">
                  <Fish className="w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-40"></div>
                </div>
                
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-500/90 backdrop-blur-sm border border-red-400 rounded-lg px-3 py-2 shadow-lg">
                    <p className="text-xs font-bold text-white whitespace-nowrap flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {analysisResult.species.name} Detected
                    </p>
                    <p className="text-xs text-red-100">
                      {analysisResult.species.confidence}% confidence
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center">
              <Info className="w-4 h-4 mr-2 text-primary" />
              Map Legend
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-green-500/30 border border-green-400 rounded-full flex items-center justify-center">
                    <Fish className="w-2 h-2 text-green-400" />
                  </div>
                  <span className="text-muted-foreground">Ocean Regions</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full border border-white"></div>
                  <span className="text-muted-foreground">Coastal Areas</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-muted-foreground">Land/Islands</span>
                </div>
              </div>
              {analysisResult && (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-red-500 rounded-full border border-white flex items-center justify-center">
                      <Fish className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-muted-foreground">Species Location</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Region Details Panel */}
        <div className="mt-8 space-y-6">
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card/50 rounded-xl p-6 border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-foreground">{selectedRegion.name}</h4>
                <button 
                  onClick={() => setSelectedRegion(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground flex items-center">
                    <Thermometer className="w-4 h-4 mr-2 text-primary" />
                    Environmental
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span className="text-foreground font-medium">{selectedRegion.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Depth:</span>
                      <span className="text-foreground font-medium">{selectedRegion.depth}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground flex items-center">
                    <Fish className="w-4 h-4 mr-2 text-primary" />
                    Biodiversity
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Species:</span>
                      <span className="text-foreground font-medium">{selectedRegion.species.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className={`font-medium ${getRegionColor(selectedRegion.biodiversity).split(' ')[0]}`}>
                        {selectedRegion.biodiversity}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-semibold text-foreground flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-primary" />
                    Conservation
                  </h5>
                  <div className="text-sm">
                    <span className="text-green-400 font-medium">{selectedRegion.conservation}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <h5 className="font-semibold text-foreground mb-3">Key Species</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.endemicSpecies.map((species) => (
                    <div key={species} className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium">
                      {species}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-primary/10 to-marine-500/10 rounded-xl p-6 border border-primary/20"
            >
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center">
                <Fish className="w-5 h-5 mr-2 text-primary" />
                Species Analysis Result
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-muted-foreground block text-sm">Identified:</span>
                  <span className="text-foreground font-bold text-lg">{analysisResult.species.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-sm">Region:</span>
                  <span className="text-foreground font-bold text-lg">{analysisResult.geographical.region}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-sm">Confidence:</span>
                  <span className="text-green-400 font-bold text-lg">{analysisResult.species.confidence}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IndianOceanMap
