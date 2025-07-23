import { useState, useEffect } from 'react'
import { detectTikTokBrowser, openInExternalBrowser, TikTokBrowserInfo } from '@/lib/tiktok-detector'

export function useTikTokBrowser() {
  const [browserInfo, setBrowserInfo] = useState<TikTokBrowserInfo>({
    isTikTokBrowser: false,
    userAgent: '',
    platform: ''
  })

  useEffect(() => {
    setBrowserInfo(detectTikTokBrowser())
  }, [])

  const handleExternalLink = async (url: string, fallbackMessage?: string) => {
    return await openInExternalBrowser(url, fallbackMessage)
  }

  return {
    isTikTokBrowser: browserInfo.isTikTokBrowser,
    userAgent: browserInfo.userAgent,
    platform: browserInfo.platform,
    openInExternalBrowser: handleExternalLink
  }
} 