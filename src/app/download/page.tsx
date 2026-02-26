'use client'

import { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'
import { getActiveDownloadLinks } from '@/lib/downloadLinks'

function DownloadPageContent() {
  const searchParams = useSearchParams()
  const platform = searchParams.get('platform') as 'ios' | 'android' | null
  const { track } = useAnalytics()
  const [countdown, setCountdown] = useState(3)
  const [showManual, setShowManual] = useState(false)

  const urls = getActiveDownloadLinks()

  const platformName = platform === 'ios' ? 'App Store' : 'Google Play'
  const browserName = platform === 'ios' ? 'Safari' : 'Chrome'

  useEffect(() => {
    if (!platform || !urls[platform]) {
      setShowManual(true)
      return
    }

    // Track the download page visit
    track('download_page_visited', { platform })

    // Auto-redirect after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Try to redirect to app store
          window.location.href = urls[platform]
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [platform, track])

  const handleManualDownload = () => {
    if (platform && urls[platform]) {
      track('manual_download_clicked', { platform })
      window.location.href = urls[platform]
    }
  }

  const handleCopyLink = async () => {
    if (platform && urls[platform]) {
      try {
        await navigator.clipboard.writeText(urls[platform])
        track('download_link_copied', { platform })
        alert('Link copied to clipboard!')
      } catch (e) {
        console.error('Failed to copy link:', e)
      }
    }
  }

  if (showManual || !platform) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Download GoTall
          </h1>
          
          <p className="text-gray-600 mb-6">
            Choose your platform to download the app:
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = urls.ios}
              className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download for iOS
            </button>
            
            <button
              onClick={() => window.location.href = urls.android}
              className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Download for Android
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="currentColor">
            {platform === 'ios' ? (
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            ) : (
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
            )}
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Opening {platformName}...
        </h1>
        
        <p className="text-gray-600 mb-6">
          Redirecting you to download GoTall in {countdown} seconds
        </p>
        
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-brand-gradient h-2 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: `${(countdown / 3) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleManualDownload}
            className="w-full bg-brand-gradient text-black py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Download Now
          </button>
          
          <button
            onClick={handleCopyLink}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Copy Download Link
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            If the download doesn't start automatically, tap "Download Now" above
          </p>
        </div>
      </motion.div>
    </div>
  )
}

function DownloadPageFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Preparing download...
        </h1>
      </div>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<DownloadPageFallback />}>
      <DownloadPageContent />
    </Suspense>
  )
}