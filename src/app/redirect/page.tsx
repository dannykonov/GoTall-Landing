'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function RedirectPage() {
  const searchParams = useSearchParams()
  const platform = searchParams.get('platform') as 'ios' | 'android' | null
  const { track } = useAnalytics()

  const urls = {
    ios: 'https://apps.apple.com/us/app/gotall/id6747467975',
    android: 'https://play.google.com/store/apps/details?id=app.gotall.play&pli=1'
  }

  useEffect(() => {
    if (platform && urls[platform]) {
      // Track the redirect attempt
      track('redirect_page_visited', { platform })
      
      // Immediate redirect to app store
      window.location.href = urls[platform]
    } else {
      // Fallback to main page if no platform specified
      window.location.href = '/'
    }
  }, [platform, track])

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