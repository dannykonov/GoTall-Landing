'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useTikTokBrowser } from '@/hooks/useTikTokBrowser'
import TikTokDownloadModal from '@/components/TikTokDownloadModal'

export default function TikTokLandingPage() {
  const { track } = useAnalytics()
  const [qrOpen, setQrOpen] = useState(false)
  const { isTikTokBrowser, handleDownload } = useTikTokBrowser()

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://apps.apple.com/us/app/gotall/id6747467975')
      track('tiktok_copy_appstore_link_clicked')
    } catch (e) {
      // noop
    }
  }

  const handleShowQR = () => {
    setQrOpen(true)
    track('tiktok_qr_shown')
  }

  const handleCloseQR = () => setQrOpen(false)

  const handleGooglePlayClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    track('tiktok_android_clicked', { platform: 'android' })
    if (isTikTokBrowser) {
      const success = await handleDownload('android')
      if (!success) setQrOpen(true)
    } else {
      window.open('https://play.google.com/store/apps/details?id=app.gotall.play&pli=1', '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section - TikTok specific instructions */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-primary-neon/10 border border-primary-neon/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <span className="text-primary-neon text-sm font-medium">TikTok mode</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-circular font-bold text-white mb-4 sm:mb-6 leading-tight">
              Open the App Store and search
              <span className="text-primary-neon block">“GoTall”</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-primary-gray mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              TikTok blocks App Store links. For the fastest install: tap ⋯ in TikTok and choose “Open in Safari”, then search for <span className="text-white font-semibold">GoTall</span>.
            </p>

            {/* Screenshot placeholder */}
            <div className="mx-auto max-w-2xl mb-6 sm:mb-8">
              <img
                src="/app-store-search.png"
                alt="Search GoTall on the App Store"
                className="w-full h-auto rounded-2xl border border-gray-800 shadow-2xl"
              />
            </div>

            {/* Android button (identical style to the main page "single" variant) */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <a 
                href="https://play.google.com/store/apps/details?id=app.gotall.play&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGooglePlayClick}
                className="w-full sm:w-auto max-w-md"
              >
                <button
                  className="bg-black text-white border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-200 inline-flex items-center justify-center px-6 py-4 text-lg w-full h-[56px] sm:h-[60px]"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">GET IT ON</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleCopyLink}
                className="bg-primary-neon text-black px-6 py-3 rounded-xl font-semibold hover:bg-primary-neon/90 transition-colors"
              >
                Copy App Store Link
              </button>

              <button
                onClick={handleShowQR}
                className="bg-transparent text-primary-neon border-2 border-primary-neon px-6 py-3 rounded-xl font-semibold hover:bg-primary-neon/10 transition-colors"
              >
                Show QR Code
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Keep rest of landing content minimal to reduce redundancy */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center text-primary-gray">
          <p>
            Tip: On iPhone in Safari, you’ll see Apple’s Smart App Banner at the top for a one‑tap install.
          </p>
        </div>
      </section>

      {/* Reuse existing modal for QR/link instructions (iOS focus) */}
      {qrOpen && (
        <TikTokDownloadModal isOpen={qrOpen} onClose={handleCloseQR} platform="ios" />
      )}
    </div>
  )
}


