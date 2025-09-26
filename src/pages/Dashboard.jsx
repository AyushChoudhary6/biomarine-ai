import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Activity, Database } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Research Dashboard</h1>
          <p className="text-white/70 text-lg">Real-time insights into marine research data and analytics</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Database, title: 'Total Samples', value: '15,847', change: '+12%' },
            { icon: Activity, title: 'Active Studies', value: '23', change: '+5%' },
            { icon: TrendingUp, title: 'Species Identified', value: '156', change: '+8%' },
            { icon: BarChart3, title: 'Data Quality', value: '94%', change: '+2%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <stat.icon className="w-8 h-8 text-primary-400" />
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-4">{stat.value}</h3>
              <p className="text-white/70 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Dashboard Coming Soon</h2>
          <p className="text-white/70">
            Advanced analytics and visualization tools are being developed to provide 
            comprehensive insights into marine research data.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
