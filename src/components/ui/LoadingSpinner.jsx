import React from 'react'
import { motion } from 'framer-motion'
import { Waves } from 'lucide-react'
import { clsx } from 'clsx'

const LoadingSpinner = ({ size = 'medium', className = '', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-20 h-20'
  }

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }

  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      {/* Main Loading Animation */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className={clsx(
            'border-4 border-primary-200/20 border-t-primary-500 rounded-full',
            sizeClasses[size]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className={clsx(
            'absolute inset-2 border-2 border-marine-200/20 border-b-marine-400 rounded-full',
            size === 'small' ? 'inset-1' : size === 'large' ? 'inset-3' : 'inset-2'
          )}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Waves 
              className={clsx(
                'text-primary-500',
                size === 'small' ? 'w-3 h-3' : 
                size === 'large' ? 'w-8 h-8' : 'w-5 h-5'
              )} 
            />
          </motion.div>
        </div>
      </div>

      {/* Loading Text */}
      {text && (
        <motion.p
          className={clsx(
            'mt-4 text-white/70 font-medium',
            textSizeClasses[size]
          )}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {text}
        </motion.p>
      )}

      {/* Floating Dots Animation */}
      <div className="flex space-x-1 mt-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-primary-400 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Alternative pulse loader
export const PulseLoader = ({ className = '' }) => (
  <div className={clsx('flex space-x-2', className)}>
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        className="w-3 h-3 bg-primary-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: index * 0.2,
          ease: 'easeInOut'
        }}
      />
    ))}
  </div>
)

// Skeleton loader for content
export const SkeletonLoader = ({ className = '', lines = 3 }) => (
  <div className={clsx('animate-pulse space-y-3', className)}>
    {Array.from({ length: lines }).map((_, index) => (
      <div key={index} className="flex space-x-4">
        <div className="rounded-full bg-white/10 h-4 w-4"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
)

// Wave loader for marine theme
export const WaveLoader = ({ className = '' }) => (
  <div className={clsx('flex items-end space-x-1', className)}>
    {[0, 1, 2, 3, 4].map((index) => (
      <motion.div
        key={index}
        className="w-2 bg-gradient-to-t from-primary-600 to-marine-400 rounded-full"
        style={{ height: Math.random() * 20 + 10 }}
        animate={{
          scaleY: [1, 2, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: index * 0.1,
          ease: 'easeInOut'
        }}
      />
    ))}
  </div>
)

export default LoadingSpinner
