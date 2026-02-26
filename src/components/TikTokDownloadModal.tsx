'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { getActiveDownloadLinks } from '@/lib/downloadLinks'

interface TikTokDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  platform: 'ios' | 'android'
}

export default function TikTokDownloadModal({ isOpen, onClose, platform }: TikTokDownloadModalProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const downloadLinks = getActiveDownloadLinks()
  const url = downloadLinks[platform]
  const platformName = platform === 'ios' ? 'App Store' : 'Google Play'
  const browserName = platform === 'ios' ? 'Safari' : 'Chrome'
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Failed to copy link:', e)
    }
  }
  
  const handleTryAgain = () => {
    setCopied(false)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const toggleQR = () => {
    setShowQR(!showQR)
  }

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                  {platform === 'ios' ? (
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  ) : (
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  )}
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Download GoTall
              </h3>
              
              <p className="text-gray-600 mb-4">
                TikTok doesn't allow app store links. Here's how to download GoTall:
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> TikTok restricts external app store links for security reasons. This is normal behavior, not an error.
                </p>
              </div>
              
              {!showQR ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-brand-mid rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-sm font-bold">1</span>
                      </div>
                      <p className="text-gray-700 text-left">
                        Use TikTok's "Open in External Browser" button (recommended)
                      </p>
                    </div>
                    
                    <div className="text-center text-gray-500 text-sm">OR</div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-brand-mid rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-sm font-bold">2</span>
                      </div>
                      <p className="text-gray-700 text-left">
                        Copy the download link below
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-brand-mid rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-sm font-bold">3</span>
                      </div>
                      <p className="text-gray-700 text-left">
                        Open {browserName} or another browser
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-brand-mid rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-sm font-bold">4</span>
                      </div>
                      <p className="text-gray-700 text-left">
                        Paste the link and download GoTall
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleCopyLink}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        copied 
                          ? 'bg-brand-mid text-black'
                          : 'bg-brand-gradient text-black hover:opacity-90 transition-opacity'
                      }`}
                    >
                      {copied ? '✓ Link Copied!' : 'Copy Download Link'}
                    </button>
                    
                    <button
                      onClick={toggleQR}
                      className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      Show QR Code Instead
                    </button>
                    
                    <button
                      onClick={handleTryAgain}
                      className="w-full py-3 px-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      Try Opening Again
                    </button>
                    
                    <button
                      onClick={onClose}
                      className="w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                      Scan this QR code with your camera to open the {platformName}
                    </p>
                    <img 
                      src={qrCodeUrl} 
                      alt="QR Code for app download"
                      className="mx-auto border-2 border-gray-200 rounded-lg"
                      width="200"
                      height="200"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={toggleQR}
                      className="w-full py-3 px-4 bg-brand-gradient text-black rounded-xl font-semibold hover:opacity-90 transition-opacity duration-200"
                    >
                      Show Link Instead
                    </button>
                    
                    <button
                      onClick={onClose}
                      className="w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 