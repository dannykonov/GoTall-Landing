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
      <div className="pt-4 sm:pt-8 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center text-primary-neon hover:text-white transition-colors mb-4 sm:mb-8"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="font-medium text-sm sm:text-base">Back to GoTall</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <section className="px-4 sm:px-6 lg:px-12 pb-8 sm:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-neon/10 border border-primary-neon/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-circular font-bold text-white mb-3 sm:mb-4">
              Download GoTall
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-primary-gray mb-4 sm:mb-6 px-2 sm:px-0">
              Unfortunately, TikTok's browser doesn't allow direct links to app stores. Here's how to download GoTall:
            </p>

            {/* Info box */}
            <div className="bg-primary-neon/10 border border-primary-neon/20 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
              <p className="text-primary-neon text-sm sm:text-base">
                <strong>Note:</strong> TikTok restricts external app store links for security reasons. This is normal behavior, not an error.
              </p>
            </div>

            {/* Instructions card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-primary-dark-gray rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700 mb-6 sm:mb-8"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Follow these steps to download GoTall:</h3>
              <div className="space-y-3 sm:space-y-4 text-left">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-primary-neon/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-neon font-bold text-xs sm:text-sm">1</span>
                  </span>
                  <span className="text-primary-gray text-sm sm:text-base">Copy the download link below</span>
                </div>
                <div className="bg-black rounded-lg p-2 sm:p-3 border border-gray-600">
                  <code className="text-primary-neon text-xs sm:text-sm break-all">
                    https://apps.apple.com/us/app/gotall/id6747467975
                  </code>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-primary-neon/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-neon font-bold text-xs sm:text-sm">2</span>
                  </span>
                  <span className="text-primary-gray text-sm sm:text-base">Open Safari or another browser</span>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-primary-neon/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-neon font-bold text-xs sm:text-sm">3</span>
                  </span>
                  <span className="text-primary-gray text-sm sm:text-base">Paste the link and download GoTall</span>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <button 
                onClick={handleCopyLink}
                className="w-full bg-primary-neon text-black font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-primary-neon/90 transition-colors flex items-center justify-center text-sm sm:text-base mb-8 sm:mb-10"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Copy App Store Link
                  </>
                )}
              </button>

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-transparent text-primary-neon border-2 border-primary-neon font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-primary-neon/10 transition-colors text-sm sm:text-base"
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
              className="mt-6 sm:mt-8 text-xs sm:text-sm text-primary-gray px-2 sm:px-0"
            >
              <p>Having trouble? Try opening this page in Safari or Chrome</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 