'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useActiveDownloadLinks } from '@/hooks/useActiveDownloadLinks'

export default function TikTokLandingPage() {
  const { track } = useAnalytics()
  const { downloadLinks } = useActiveDownloadLinks()

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(downloadLinks.ios)
      track('tiktok_ios_copy_link_clicked')
    } catch (e) {
      // noop
    }
  }

  const handleGooglePlayClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    track('tiktok_android_clicked', { platform: 'android' })
    window.open(downloadLinks.android, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-circular font-bold text-white mb-4 sm:mb-6 leading-tight">
              You’re on the right track — let’s get GoTall
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-gray mb-2 sm:mb-3 max-w-2xl mx-auto px-4 sm:px-0">
              Choose your platform below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two equal sections: Android and iOS */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Android card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary-dark-gray rounded-2xl p-6 sm:p-8 border border-gray-700"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Android</h2>
            <p className="text-primary-gray mb-6">Download GoTall on Google Play.</p>
            <a 
              href={downloadLinks.android}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGooglePlayClick}
            >
              <button
                className="bg-brand-gradient text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center w-full"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Open Google Play
              </button>
            </a>
          </motion.div>

          {/* iOS card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-primary-dark-gray rounded-2xl p-6 sm:p-8 border border-gray-700"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">iPhone</h2>
            <p className="text-primary-gray mb-4">Search “GoTall” in the App Store. Here’s what it looks like:</p>

            <div className="mb-6">
              <img
                src="/IMG_1608.jpg"
                alt="GoTall on the App Store"
                className="w-full h-auto rounded-xl border border-gray-700"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full bg-transparent text-primary-neon border-2 border-primary-neon font-semibold py-3 px-6 rounded-xl hover:bg-primary-neon/10 transition-colors"
              >
                Copy App Store Link
              </button>
              <p className="text-primary-gray text-sm">Paste the link in Safari or any external browser.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


