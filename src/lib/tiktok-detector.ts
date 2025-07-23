export interface TikTokBrowserInfo {
  isTikTokBrowser: boolean
  userAgent: string
  platform: string
}

export function detectTikTokBrowser(): TikTokBrowserInfo {
  if (typeof window === 'undefined') {
    return {
      isTikTokBrowser: false,
      userAgent: '',
      platform: ''
    }
  }

  const userAgent = navigator.userAgent.toLowerCase()
  const platform = navigator.platform.toLowerCase()
  
  // TikTok browser detection patterns
  const tiktokPatterns = [
    'tiktok',
    'bytedance',
    'musical.ly',
    'aweme',
    'douyin'
  ]
  
  // Check if any TikTok patterns are in the user agent
  const isTikTok = tiktokPatterns.some(pattern => userAgent.includes(pattern)) ||
                  (window as any).TikTok !== undefined ||
                  (window as any).tt !== undefined

  return {
    isTikTokBrowser: isTikTok,
    userAgent: navigator.userAgent,
    platform
  }
}

export async function openInExternalBrowser(url: string, fallbackMessage?: string): Promise<boolean> {
  const { isTikTokBrowser } = detectTikTokBrowser()
  
  if (!isTikTokBrowser) {
    // For regular browsers, use normal behavior
    window.open(url, '_blank', 'noopener,noreferrer')
    return true
  }

  // For TikTok browser, try multiple methods to open external browser
  const methods = [
    // Method 1: Try to open in new window
    () => {
      try {
        const newWindow = window.open(url, '_blank')
        if (newWindow) {
          newWindow.focus()
          return true
        }
      } catch (e) {
        console.log('Window.open failed')
      }
      return false
    },
    
    // Method 2: Try to trigger external browser with special URL scheme
    () => {
      try {
        const externalUrl = `external://${url}`
        window.location.href = externalUrl
        return true
      } catch (e) {
        console.log('External URL scheme failed')
      }
      return false
    },
    
    // Method 3: Try to copy to clipboard and show instructions
    async () => {
      try {
        await navigator.clipboard.writeText(url)
        const message = fallbackMessage || 'Link copied to clipboard! Please paste it in your external browser to download the app.'
        alert(message)
        return true
      } catch (e) {
        console.log('Clipboard method failed')
      }
      return false
    },
    
    // Method 4: Try to use intent URL for Android
    () => {
      try {
        const intentUrl = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`
        window.location.href = intentUrl
        return true
      } catch (e) {
        console.log('Intent URL failed')
      }
      return false
    },
    
    // Final fallback: direct navigation
    () => {
      try {
        window.location.href = url
        return true
      } catch (e) {
        console.log('Direct navigation failed')
      }
      return false
    }
  ]

  // Try each method until one succeeds
  for (const method of methods) {
    try {
      const result = await method()
      if (result) {
        return true
      }
    } catch (e) {
      console.log('Method failed:', e)
    }
  }

  return false
}

export function showTikTokInstructions(): void {
  const instructions = `
To download the app:
1. Copy the link below
2. Open your external browser (Safari/Chrome)
3. Paste the link and press Enter

iOS: https://apps.apple.com/us/app/gotall/id6747467975
Android: https://play.google.com/store/apps/details?id=app.gotall.play&pli=1
  `.trim()
  
  alert(instructions)
} 