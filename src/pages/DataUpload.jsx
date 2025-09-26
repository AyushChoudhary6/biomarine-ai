import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileImage, CheckCircle, AlertCircle, X } from 'lucide-react'

const DataUpload = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState({})

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.name.endsWith('.csv') || file.name.endsWith('.xlsx')
    )
    
    validFiles.forEach(file => {
      const fileId = Date.now() + Math.random()
      setUploadedFiles(prev => [...prev, { id: fileId, file, status: 'uploading' }])
      
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }))
        
        if (progress >= 100) {
          clearInterval(interval)
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, status: 'completed' } : f
          ))
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev }
              delete newProgress[fileId]
              return newProgress
            })
          }, 2000)
        }
      }, 500)
    })
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    setUploadProgress(prev => {
      const newProgress = { ...prev }
      delete newProgress[fileId]
      return newProgress
    })
  }

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Data Upload Center</h1>
          <p className="text-white/70 text-lg">
            Upload research data, images, and documents for analysis and processing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-8 mb-8"
        >
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging 
                ? 'border-primary-400 bg-primary-400/10' 
                : 'border-white/30 hover:border-primary-400/50'
            }`}
          >
            <Upload className="w-16 h-16 text-primary-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              {isDragging ? 'Drop files here' : 'Upload Research Data'}
            </h3>
            <p className="text-white/70 mb-6">
              Drag and drop files or click to browse. Supports images, CSV, and Excel files.
            </p>
            <input
              type="file"
              multiple
              accept="image/*,.csv,.xlsx,.xls"
              onChange={(e) => handleFiles(Array.from(e.target.files))}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn-primary cursor-pointer inline-block"
            >
              Choose Files
            </label>
          </div>
        </motion.div>

        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Upload Progress</h3>
            <div className="space-y-4">
              {uploadedFiles.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                  <FileImage className="w-8 h-8 text-primary-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{item.file.name}</p>
                    <p className="text-white/60 text-sm">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {uploadProgress[item.id] && (
                      <div className="mt-2">
                        <div className="bg-white/20 rounded-full h-2">
                          <div
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[item.id]}%` }}
                          />
                        </div>
                        <p className="text-white/60 text-sm mt-1">
                          {Math.round(uploadProgress[item.id])}%
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : item.status === 'error' ? (
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    ) : null}
                    <button
                      onClick={() => removeFile(item.id)}
                      className="text-white/60 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DataUpload
