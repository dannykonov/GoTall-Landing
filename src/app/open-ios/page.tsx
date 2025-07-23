'use client'

import { useEffect } from 'react'

export default function OpenIOSPage() {
  useEffect(() => {
    // JavaScript redirect to force Safari opening
    window.location.replace("https://apps.apple.com/us/app/gotall/id6747467975");
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-primary-neon rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Opening App Store...
        </h1>
        
        <p className="text-gray-600">
          Redirecting to download GoTall...
        </p>
      </div>
    </div>
  )
} 