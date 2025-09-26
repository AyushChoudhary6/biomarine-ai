import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, ZoomIn, Download } from 'lucide-react'

const OtolithGallery = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Generate otolith data from available images
  const otolithData = useMemo(() => {
    const data = []
    for (let i = 1; i <= 36; i++) {
      const num = String(i).padStart(5, '0')
      data.push({
        id: i,
        filename: `CMLREOTL${num}.jpg`,
        species: ['Cod', 'Salmon', 'Tuna', 'Mackerel', 'Herring'][Math.floor(Math.random() * 5)],
        age: Math.floor(Math.random() * 10) + 1,
        length: Math.floor(Math.random() * 50) + 20,
        weight: Math.floor(Math.random() * 1000) + 100,
        location: ['North Atlantic', 'Pacific', 'Mediterranean', 'Baltic Sea'][Math.floor(Math.random() * 4)],
        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
        category: ['Fresh', 'Processed', 'Analyzed'][Math.floor(Math.random() * 3)]
      })
    }
    return data
  }, [])

  const filteredData = useMemo(() => {
    return otolithData.filter(item => {
      const matchesSearch = item.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
  }, [otolithData, searchTerm, selectedCategory])

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Otolith Gallery</h1>
          <p className="text-white/70 text-lg">
            Comprehensive collection of fish otoliths for research and analysis
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by species or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-400"
              >
                <option value="all">All Categories</option>
                <option value="fresh">Fresh</option>
                <option value="processed">Processed</option>
                <option value="analyzed">Analyzed</option>
              </select>

              <div className="flex items-center bg-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-white/60 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-white/60 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-white/70">
            Showing {filteredData.length} of {otolithData.length} otoliths
          </p>
        </motion.div>

        {/* Gallery */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300"
              >
                <div className="relative aspect-square bg-primary-900/20">
                  <img
                    src={`/otoliths/${item.filename}`}
                    alt={`Otolith ${item.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30">
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">{item.species}</h3>
                  <p className="text-white/60 text-sm mb-2">{item.location}</p>
                  <div className="flex justify-between text-white/70 text-xs">
                    <span>Age: {item.age}y</span>
                    <span>{item.length}cm</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.category === 'Fresh' ? 'bg-green-500/20 text-green-400' :
                      item.category === 'Processed' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.category}
                    </span>
                    <button className="text-white/60 hover:text-primary-400">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Species</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Length</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredData.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-white/5"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.filename}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.species}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{item.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{item.age} years</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">{item.length} cm</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.category === 'Fresh' ? 'bg-green-500/20 text-green-400' :
                          item.category === 'Processed' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="text-white/60 hover:text-primary-400">
                            <ZoomIn className="w-4 h-4" />
                          </button>
                          <button className="text-white/60 hover:text-primary-400">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OtolithGallery
