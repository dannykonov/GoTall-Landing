'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Shield,
  Clock,
  Calculator,
  Users,
  HelpCircle
} from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function SupportPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const faqs = [
    {
      id: 1,
      icon: Users,
      question: "How do I join the waitlist?",
      answer: "Simply click the 'Join the Waitlist' button on our homepage or any page, enter your email address, and we'll notify you as soon as GoTall launches. You'll be among the first to access all our growth optimization features."
    },
    {
      id: 2,
      icon: Calculator,
      question: "How do you calculate growth projections?",
      answer: "Our algorithm considers multiple factors including your parents' heights, current age, ethnicity, growth plate status, and current height. We use established medical research and growth charts to provide personalized projections based on your unique genetic and physiological profile."
    },
    {
      id: 3,
      icon: Shield,
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption to protect all your personal data. Your health information is never shared with third parties, and you have full control over your data. We comply with all privacy regulations and maintain the highest security standards."
    },
    {
      id: 4,
      icon: Clock,
      question: "How long until I see results?",
      answer: "Results vary by individual, but most users report improvements in energy levels and posture within 2-3 weeks. Measurable height changes typically occur over 3-6 months when following our comprehensive nutrition, sleep, and exercise recommendations consistently."
    },
    {
      id: 5,
      icon: HelpCircle,
      question: "What age groups can use GoTall?",
      answer: "GoTall is designed for individuals aged 13-25, when growth plates are typically still open. However, users of any age can benefit from our health optimization features for better posture, nutrition, and overall wellness."
    },
    {
      id: 6,
      icon: MessageCircle,
      question: "Do you have a community feature?",
      answer: "Yes! GoTall includes a supportive community where users share their journey, ask questions, and motivate each other. It's a safe space moderated by our team to ensure positive and helpful interactions."
    }
  ]

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-primary-neon/10 border border-primary-neon/20 rounded-full px-4 py-2 mb-6">
              <HelpCircle className="w-4 h-4 text-primary-neon mr-2" />
              <span className="text-primary-neon text-sm font-medium">Support Center</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-circular font-bold text-white mb-6 leading-tight">
              Need help?
              <span className="text-primary-neon block">We've got your back.</span>
            </h1>
            
            <p className="text-xl text-primary-gray mb-8 max-w-2xl mx-auto">
              Get answers to your questions, learn how to maximize your growth potential, 
              and connect with our support team whenever you need assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-circular font-bold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-primary-gray max-w-2xl mx-auto">
              Have a specific question or need personalized help? We're here to support your growth journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-primary-dark-gray rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-neon/10 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-primary-neon" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Email Support</h3>
                    <p className="text-primary-gray">Get help within 24 hours</p>
                  </div>
                </div>
                <a 
                  href="mailto:support@gotall.app"
                  className="inline-flex items-center text-primary-neon hover:text-primary-neon/80 transition-colors font-medium"
                >
                  support@gotall.app
                  <Mail className="w-4 h-4 ml-2" />
                </a>
              </div>

              <div className="bg-primary-dark-gray rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">What we can help with:</h3>
                <ul className="space-y-2 text-primary-gray">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-brand-mid rounded-full mr-3"></div>
                    Account and subscription questions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-brand-mid rounded-full mr-3"></div>
                    Growth projection explanations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-brand-mid rounded-full mr-3"></div>
                    App feature guidance
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-brand-mid rounded-full mr-3"></div>
                    Technical support
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-brand-mid rounded-full mr-3"></div>
                    Privacy and security concerns
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-brand-mid rounded-full mr-3"></div>
                    And anything else you need help with
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary-dark-gray rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-neon transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-neon transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-neon transition-colors"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-neon transition-colors resize-vertical"
                      placeholder="Tell us more about your question or issue..."
                    />
                  </div>

                  <a
                    href={`mailto:support@gotall.app?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                    className="w-full bg-brand-gradient text-black py-3 rounded-lg font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center group"
                  >
                    Send Message
                    <Mail className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-circular font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-primary-gray">
              Find quick answers to the most common questions about GoTall.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary-dark-gray rounded-2xl border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-neon/10 rounded-lg flex items-center justify-center mr-4">
                      <faq.icon className="w-5 h-5 text-primary-neon" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  </div>
                  {openFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-primary-neon" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary-gray" />
                  )}
                </button>
                
                {openFaq === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-8 pb-6"
                  >
                    <div className="pl-14">
                      <p className="text-primary-gray leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-brand-start/10 to-brand-end/5 rounded-3xl p-8 border border-primary-neon/20"
          >
            <h2 className="text-2xl md:text-3xl font-circular font-bold text-white mb-4">
              Ready to start your growth journey?
            </h2>
            <p className="text-lg text-primary-gray mb-6">
              Join thousands of others waiting for GoTall to launch.
            </p>
            <button 
              className="bg-brand-gradient text-black px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center group"
            >
              Join the Waitlist
              <Mail className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 