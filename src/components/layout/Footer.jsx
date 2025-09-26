import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Waves, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  ExternalLink,
  Heart
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Research Areas',
      links: [
        { name: 'Marine Biology', href: '/research#marine-biology' },
        { name: 'Oceanography', href: '/research#oceanography' },
        { name: 'Climate Science', href: '/research#climate' },
        { name: 'Otolith Studies', href: '/otoliths' },
        { name: 'AI/ML Models', href: '/ai-models' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Data Portal', href: '/dashboard' },
        { name: 'Upload Data', href: '/upload' },
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api' },
        { name: 'Publications', href: '/publications' },
      ]
    },
    {
      title: 'About CMLRE',
      links: [
        { name: 'Our Mission', href: '/about#mission' },
        { name: 'Research Team', href: '/about#team' },
        { name: 'Partnerships', href: '/about#partnerships' },
        { name: 'Careers', href: '/careers' },
        { name: 'News & Updates', href: '/news' },
      ]
    }
  ]

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/cmlre' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/cmlre' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/cmlre' },
  ]

  return (
    <footer className="footer-gradient border-t border-surface">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-marine-500 rounded-lg rotate-45"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-ocean-400 to-primary-600 rounded-lg -rotate-45"></div>
                <Waves className="absolute inset-2 text-white z-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">CMLRE</h3>
                <p className="text-sm text-muted-foreground">Center for Marine Life Research & Education</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Advancing marine science through innovative research, cutting-edge technology, 
              and collaborative data sharing to understand and protect our ocean ecosystems.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>Marine Research Campus, Ocean City</span>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Phone className="w-4 h-4 mr-2 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span>info@cmlre.org</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="text-foreground font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center group"
                    >
                      {link.name}
                      {link.href.startsWith('http') && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground text-sm">Follow us:</span>
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass-panel hover:bg-accent text-muted-foreground hover:text-primary transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              )
            })}
          </div>

          {/* Copyright */}
          <div className="flex items-center text-muted-foreground text-sm">
            <span>© {currentYear} CMLRE. Made with</span>
            <Heart className="w-4 h-4 mx-1 text-coral-500 fill-current" />
            <span>for marine conservation</span>
          </div>
        </div>

        {/* Additional Links */}
        <div className="flex flex-wrap justify-center lg:justify-end mt-4 space-x-6 text-xs text-muted-foreground/70">
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Use
          </Link>
          <Link to="/accessibility" className="hover:text-primary transition-colors">
            Accessibility
          </Link>
          <Link to="/sitemap" className="hover:text-primary transition-colors">
            Sitemap
          </Link>
        </div>
      </div>

      {/* Animated Wave Effect */}
      <div className="relative overflow-hidden h-2">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-600 via-marine-500 to-ocean-600"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>
    </footer>
  )
}

export default Footer
