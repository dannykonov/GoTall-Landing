'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useActiveDownloadLinks } from '@/hooks/useActiveDownloadLinks'

interface QRCodeDownloadProps {
  isOpen: boolean
  onClose: () => void
  platform: 'ios' | 'android'
}

export default function QRCodeDownload({ isOpen, onClose, platform }: QRCodeDownloadProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  const { downloadLinks } = useActiveDownloadLinks()
  const url = downloadLinks[platform]
  const platformName = platform === 'ios' ? 'App Store' : 'Google Play'
  
  useEffect(() => {
    if (isOpen && url) {
      // Generate QR code using a free QR code API
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
      setQrCodeUrl(qrApiUrl)
    }
  }, [isOpen, url])

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
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4"
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
                Scan to Download
              </h3>
              
              <p className="text-gray-600 mb-6">
                Scan this QR code with your camera to open the {platformName}
              </p>
              
              {qrCodeUrl && (
                <div className="mb-6">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code for app download"
                    className="mx-auto border-2 border-gray-200 rounded-lg"
                    width="200"
                    height="200"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                <button
                  onClick={onClose}
                  className="w-full py-3 px-4 bg-brand-gradient text-black rounded-xl font-semibold hover:opacity-90 transition-opacity duration-200"
                >
                  Got it!
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 