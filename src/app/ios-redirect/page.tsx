'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function IOSRedirectPage() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://apps.apple.com/us/app/gotall/id6747467975')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = 'https://apps.apple.com/us/app/gotall/id6747467975'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header with back button */}
      <div className="pt-8 pb-6 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center text-primary-neon hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to GoTall</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <section className="px-4 sm:px-6 lg:px-12 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="w-20 h-20 bg-primary-neon/10 border border-primary-neon/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-circular font-bold text-white mb-4">
              Opening App Store...
            </h1>
            
            <p className="text-lg sm:text-xl text-primary-gray mb-8">
              Redirecting you to download GoTall on iOS
            </p>

            {/* Instructions card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-primary-dark-gray rounded-2xl p-6 sm:p-8 border border-gray-700 mb-8"
            >
              <h3 className="text-xl font-bold text-white mb-4">If this doesn't work:</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-neon/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-neon font-bold text-sm">1</span>
                  </span>
                  <span className="text-primary-gray">Search for "GoTall" in the App Store</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-neon/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-neon font-bold text-sm">2</span>
                  </span>
                  <span className="text-primary-gray">Copy and paste this link in Safari:</span>
                </div>
                <div className="bg-black rounded-lg p-3 border border-gray-600">
                  <code className="text-primary-neon text-sm break-all">
                    https://apps.apple.com/us/app/gotall/id6747467975
                  </code>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-neon/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-neon font-bold text-sm">3</span>
                  </span>
                  <span className="text-primary-gray">Open this link in your external browser</span>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <button 
                onClick={handleCopyLink}
                className="w-full bg-primary-neon text-black font-semibold py-4 px-6 rounded-xl hover:bg-primary-neon/90 transition-colors flex items-center justify-center"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy App Store Link
                  </>
                )}
              </button>

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-transparent text-primary-neon border-2 border-primary-neon font-semibold py-4 px-6 rounded-xl hover:bg-primary-neon/10 transition-colors"
                >
                  Return to Landing Page
                </motion.button>
              </Link>
            </motion.div>

            {/* Help text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 text-sm text-primary-gray"
            >
              <p>Having trouble? Try opening this page in Safari or Chrome</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 