'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { useAnalytics } from '@/hooks/useAnalytics'
import TikTokDownloadModal from '@/components/TikTokDownloadModal'

export default function TikTokLandingPage() {
  const { track } = useAnalytics()
  const [qrOpen, setQrOpen] = useState(false)

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


