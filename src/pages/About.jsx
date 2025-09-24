import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Award, Globe, Microscope, Heart } from 'lucide-react'

const About = () => {
  const team = [
    {
      name: "Dr. Marine Rodriguez",
      role: "Lead Marine Biologist",
      image: "/api/placeholder/150/150",
      bio: "20+ years of experience in marine ecosystem research and otolith analysis."
    },
    {
      name: "Prof. David Chen",
      role: "AI Research Director",
      image: "/api/placeholder/150/150",
      bio: "Pioneer in applying machine learning to marine biology and species classification."
    },
    {
      name: "Dr. Sarah Ocean",
      role: "Data Science Lead",
      image: "/api/placeholder/150/150",
      bio: "Expert in big data analytics and statistical modeling for marine research."
    },
    {
      name: "Dr. James Deep",
      role: "Field Research Coordinator",
      image: "/api/placeholder/150/150",
      bio: "Coordinates global data collection and field research initiatives."
    }
  ]

  const values = [
    {
      icon: Microscope,
      title: "Scientific Excellence",
      description: "Committed to the highest standards of scientific rigor and research methodology"
    },
    {
      icon: Globe,
      title: "Global Collaboration",
      description: "Working with international partners to advance marine science worldwide"
    },
    {
      icon: Heart,
      title: "Ocean Conservation",
      description: "Dedicated to protecting marine ecosystems for future generations"
    },
    {
      icon: Award,
      title: "Innovation",
      description: "Pioneering new technologies and methodologies in marine research"
    }
  ]

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">About CMLRE</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Center for Marine Life Research & Education - Pioneering the future of marine science 
            through advanced research, education, and technological innovation.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-8"
          >
            <Target className="w-12 h-12 text-primary-400 mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To advance the understanding of marine ecosystems through innovative research, 
              cutting-edge technology, and collaborative education. We strive to provide 
              comprehensive insights into marine life patterns, species identification, 
              and ecosystem health for the benefit of scientific community and ocean conservation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-8"
          >
            <Globe className="w-12 h-12 text-primary-400 mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To be the leading global center for marine life research and education, 
              setting new standards in scientific discovery and technological innovation. 
              We envision a future where advanced AI and machine learning tools enable 
              unprecedented insights into marine biodiversity and ecosystem dynamics.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <value.icon className="w-10 h-10 text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="w-24 h-24 bg-primary-600/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-primary-400 text-sm mb-3">{member.role}</p>
                <p className="text-white/70 text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { year: "2010", event: "CMLRE founded with a focus on traditional marine biology research" },
                { year: "2015", event: "First AI-powered species classification system developed" },
                { year: "2018", event: "Expanded to include otolith analysis and age determination research" },
                { year: "2020", event: "Launched collaborative international research programs" },
                { year: "2022", event: "Integrated machine learning models achieved 95%+ accuracy" },
                { year: "2024", event: "Advanced AI platform launched for global marine research community" }
              ].map((milestone, index) => (
                <div key={milestone.year} className="flex items-center space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/70">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Research Community</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Collaborate with us to advance marine science and contribute to ocean conservation efforts.
          </p>
          <button className="btn-primary mr-4">
            Become a Partner
          </button>
          <button className="btn-secondary">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default About
