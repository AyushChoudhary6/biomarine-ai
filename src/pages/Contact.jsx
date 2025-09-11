import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, User, MessageSquare, Clock, Globe } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      alert('Message sent successfully! We will get back to you soon.')
    }, 2000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@cmlre.org",
      link: "mailto:info@cmlre.org"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Ocean Drive, Marine City, MC 12345",
      link: "#"
    },
    {
      icon: Globe,
      title: "Website",
      details: "www.cmlre.org",
      link: "https://cmlre.org"
    }
  ]

  const offices = [
    {
      name: "Main Research Facility",
      address: "123 Ocean Drive, Marine City, MC 12345",
      phone: "+1 (555) 123-4567",
      email: "main@cmlre.org"
    },
    {
      name: "Pacific Research Station",
      address: "456 Coastal Boulevard, Pacific Bay, PB 67890",
      phone: "+1 (555) 234-5678",
      email: "pacific@cmlre.org"
    },
    {
      name: "Atlantic Marine Lab",
      address: "789 Harbor Street, Atlantic Shore, AS 13579",
      phone: "+1 (555) 345-6789",
      email: "atlantic@cmlre.org"
    }
  ]

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our research team for collaborations, inquiries, 
            or to learn more about our marine science initiatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/70 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white/70 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/70 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-white/60 w-5 h-5" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-primary-400 transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={info.title}
                    href={info.link}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <info.icon className="w-5 h-5 text-primary-400" />
                    <div>
                      <p className="text-white/60 text-sm">{info.title}</p>
                      <p className="text-white group-hover:text-primary-400 transition-colors">
                        {info.details}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Office Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-primary-400" />
                  <span className="text-white/70">Monday - Friday</span>
                </div>
                <p className="text-white ml-7">8:00 AM - 6:00 PM</p>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-primary-400" />
                  <span className="text-white/70">Saturday</span>
                </div>
                <p className="text-white ml-7">9:00 AM - 2:00 PM</p>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-primary-400" />
                  <span className="text-white/70">Sunday</span>
                </div>
                <p className="text-white ml-7">Closed</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Office Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-4">{office.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                    <p className="text-white/70 text-sm">{office.address}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary-400" />
                    <a 
                      href={`tel:${office.phone.replace(/\D/g, '')}`}
                      className="text-white/70 text-sm hover:text-primary-400 transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary-400" />
                    <a 
                      href={`mailto:${office.email}`}
                      className="text-white/70 text-sm hover:text-primary-400 transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 glass rounded-xl p-8"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: "How can I collaborate with CMLRE on research projects?",
                a: "We welcome collaborations with researchers, institutions, and organizations. Contact us through the form above or email us at partnerships@cmlre.org to discuss potential opportunities."
              },
              {
                q: "Can I access your otolith database for my research?",
                a: "Yes, we provide access to our database for qualified researchers. Please submit a formal request detailing your research objectives and intended use of the data."
              },
              {
                q: "Do you offer internship or fellowship programs?",
                a: "We offer various internship and fellowship opportunities throughout the year. Visit our careers page or contact us for current openings and application procedures."
              },
              {
                q: "How can I contribute data to your research initiatives?",
                a: "We actively seek data contributions from researchers worldwide. Please use our Data Upload portal or contact our data management team for specific requirements and protocols."
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-6 last:border-b-0">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
