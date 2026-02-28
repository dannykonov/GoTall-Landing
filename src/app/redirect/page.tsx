'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'
import { useActiveDownloadLinks } from '@/hooks/useActiveDownloadLinks'

function RedirectPageContent() {
  const searchParams = useSearchParams()
  const platform = searchParams.get('platform') as 'ios' | 'android' | null
  const { track } = useAnalytics()

  const { downloadLinks: urls, isReady } = useActiveDownloadLinks()

  useEffect(() => {
    if (!isReady) return

    if (platform && urls[platform]) {
      // Track the redirect attempt
      track('redirect_page_visited', { platform })
      
      // Immediate redirect to app store
      window.location.href = urls[platform]
    } else {
      // Fallback to main page if no platform specified
      window.location.href = '/'
    }
  }, [isReady, platform, track, urls])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-brand-gradient rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Redirecting...
        </h1>
        
        <p className="text-gray-600">
          Opening app store to download GoTall...
        </p>
      </div>
    </div>
  )
}

function RedirectPageFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Preparing redirect...
        </h1>
      </div>
    </div>
  )
}

export default function RedirectPage() {
  return (
    <Suspense fallback={<RedirectPageFallback />}>
      <RedirectPageContent />
    </Suspense>
  )
}