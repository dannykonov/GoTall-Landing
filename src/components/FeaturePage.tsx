'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'

interface Review {
  name: string
  text: string
  rating: number
  avatar: string
}

interface HowItWorksStep {
  title: string
  description: string
}

interface WhyItMattersPoint {
  title: string
  description: string
}

interface FeaturePageProps {
  title: string
  subtitle: string
  description: string
  features: string[]
  reviews: Review[]
  howItWorks: HowItWorksStep[]
  whyItMatters: WhyItMattersPoint[]
  onWaitlistClick: () => void
  additionalContent?: React.ReactNode
}

export default function FeaturePage({
  title,
  subtitle,
  description,
  features,
  reviews,
  howItWorks,
  whyItMatters,
  onWaitlistClick,
  additionalContent
}: FeaturePageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onWaitlistClick={onWaitlistClick} />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-circular font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">{subtitle}</p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">{description}</p>
          
          <button 
            onClick={onWaitlistClick}
            className="bg-primary-neon text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-neon/90 transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      </motion.section>

      {/* Additional Content (e.g., Mockups) */}
      {additionalContent}

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-20 px-4 bg-primary-dark-gray/30"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-circular font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-400">Simple steps to optimize your {title.toLowerCase()}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-neon rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-circular font-bold mb-6">Key Features</h2>
            <p className="text-xl text-gray-400">Everything you need for optimal {title.toLowerCase()}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-primary-dark-gray p-6 rounded-lg border border-gray-700"
              >
                <p className="text-lg text-white">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why It Matters Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="py-20 px-4 bg-primary-dark-gray/30"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-circular font-bold mb-6">Why It Matters</h2>
            <p className="text-xl text-gray-400">The science behind optimizing your {title.toLowerCase()}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyItMatters.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{point.title}</h3>
                <p className="text-gray-300">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-circular font-bold mb-6">What Users Say</h2>
            <p className="text-xl text-gray-400">Real results from real people</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-primary-dark-gray p-6 rounded-lg border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-600 mr-4 flex items-center justify-center">
                    <span className="text-white font-medium">{review.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{review.name}</h3>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-primary-neon">★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="py-20 px-4 bg-gradient-to-r from-primary-neon/10 to-primary-neon/5"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-circular font-bold mb-6">
            Ready to optimize your {title.toLowerCase()}?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of others who are already seeing results with GoTall
          </p>
          <button 
            onClick={onWaitlistClick}
            className="bg-primary-neon text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-neon/90 transition-colors"
          >
            Join Waitlist Now
          </button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black border-t border-primary-dark-gray py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary-neon rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">GT</span>
            </div>
            <span className="text-white font-circular font-bold text-xl">GoTall</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 GoTall. All rights reserved. Unlock your growth potential.
          </p>
        </div>
      </footer>
    </div>
  )
} 