'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useTikTokBrowser } from '@/hooks/useTikTokBrowser'
import TikTokDownloadModal from './TikTokDownloadModal'

interface DownloadButtonsProps {
  variant?: 'single' | 'dual'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  trackingPrefix?: string
}

export default function DownloadButtons({ 
  variant = 'dual', 
  size = 'lg', 
  className = '',
  trackingPrefix = 'download'
}: DownloadButtonsProps) {
  const { track } = useAnalytics()
  const { isTikTokBrowser, handleDownload } = useTikTokBrowser()
  const [modalState, setModalState] = useState<{ isOpen: boolean; platform: 'ios' | 'android' | null }>({
    isOpen: false,
    platform: null
  })
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    // Set origin only on client side
    setOrigin(window.location.origin)
  }, [])

  const handlePlatformClick = (platform: 'ios' | 'android') => {
    track(`${trackingPrefix}_${platform}_clicked`, { platform })
  }

  const handleAppStoreClick = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the default link navigation
    handlePlatformClick('ios')
    
    if (isTikTokBrowser) {
      // Use landing page approach for TikTok
      const success = await handleDownload('ios')
      
      if (!success) {
        // Fallback to modal with instructions
        setModalState({ isOpen: true, platform: 'ios' })
      }
    } else {
      // Normal behavior for regular browsers
      window.open('https://apps.apple.com/us/app/gotall/id6747467975', '_blank', 'noopener,noreferrer')
    }
  }

  const handleGooglePlayClick = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent the default link navigation
    handlePlatformClick('android')
    
    if (isTikTokBrowser) {
      // Use landing page approach for TikTok
      const success = await handleDownload('android')
      
      if (!success) {
        // Fallback to modal with instructions
        setModalState({ isOpen: true, platform: 'android' })
      }
    } else {
      // Normal behavior for regular browsers
      window.open('https://play.google.com/store/apps/details?id=app.gotall.play&pli=1', '_blank', 'noopener,noreferrer')
    }
  }

  const closeModal = () => {
    setModalState({ isOpen: false, platform: null })
  }

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  // Don't render until we have the origin (client-side only)
  if (!origin) {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto ${className}`}>
        <div className="bg-gray-200 animate-pulse rounded-xl h-[60px] w-full sm:min-w-[200px]"></div>
        <div className="bg-gray-200 animate-pulse rounded-xl h-[60px] w-full sm:min-w-[200px]"></div>
      </div>
    )
  }

  if (variant === 'single') {
    return (
      <>
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto ${className}`}>
          {/* iOS Button with target="_blank" and rel="noopener" */}
          <a 
            href="https://apps.apple.com/us/app/gotall/id6747467975"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleAppStoreClick}
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-black text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200 inline-flex items-center justify-center ${sizeClasses[size]} w-full sm:min-w-[200px] h-[56px] sm:h-[60px]`}
            >
              <svg className={`${iconSizes[size]} mr-3`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">Download on the</div>
                <div className="font-bold">App Store</div>
              </div>
            </motion.button>
          </a>

          {/* Android Button with target="_blank" and rel="noopener" */}
          <a 
            href="https://play.google.com/store/apps/details?id=app.gotall.play&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGooglePlayClick}
            className="w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-black text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200 inline-flex items-center justify-center ${sizeClasses[size]} w-full sm:min-w-[200px] h-[56px] sm:h-[60px]`}
            >
              <svg className={`${iconSizes[size]} mr-3`} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-80">GET IT ON</div>
                <div className="font-bold">Google Play</div>
              </div>
            </motion.button>
          </a>
        </div>

        {modalState.isOpen && modalState.platform && (
          <TikTokDownloadModal
            isOpen={modalState.isOpen}
            onClose={closeModal}
            platform={modalState.platform}
          />
        )}
      </>
    )
  }

  // Dual variant - side by side buttons
  return (
    <>
      <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto ${className}`}>
        {/* iOS Button with target="_blank" and rel="noopener" */}
        <a 
          href="https://apps.apple.com/us/app/gotall/id6747467975"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAppStoreClick}
          className="w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary-neon text-black px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-primary-neon/90 transition-colors inline-flex items-center justify-center group w-full sm:min-w-[140px] h-[48px] sm:h-auto"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </motion.button>
        </a>

        {/* Android Button with target="_blank" and rel="noopener" */}
        <a 
          href="https://play.google.com/store/apps/details?id=app.gotall.play&pli=1"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleGooglePlayClick}
          className="w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary-neon text-black px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-primary-neon/90 transition-colors inline-flex items-center justify-center group w-full sm:min-w-[140px] h-[48px] sm:h-auto"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            </svg>
            Google Play
          </motion.button>
        </a>
      </div>

      {modalState.isOpen && modalState.platform && (
        <TikTokDownloadModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          platform={modalState.platform}
        />
      )}
    </>
  )
} 