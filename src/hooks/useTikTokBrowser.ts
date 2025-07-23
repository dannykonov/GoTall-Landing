import { useState, useEffect } from 'react'
import { detectTikTokBrowser, openInExternalBrowser, TikTokBrowserInfo, handleTikTokDownload } from '@/lib/tiktok-detector'

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

  const handleDownload = async (platform: 'ios' | 'android') => {
    return await handleTikTokDownload(platform)
  }

  return {
    isTikTokBrowser: browserInfo.isTikTokBrowser,
    userAgent: browserInfo.userAgent,
    platform: browserInfo.platform,
    openInExternalBrowser: handleExternalLink,
    handleDownload
  }
} 