import { FORCE_TIKTOK_BROWSER } from '@/lib/featureFlags'

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
  
  // Enhanced TikTok browser detection patterns
  const tiktokPatterns = [
    'tiktok',
    'bytedance',
    'musical.ly',
    'aweme',
    'douyin',
    'snssdk',
    'tt_webview'
  ]
  
  // Use conservative detection to avoid false positives on normal web browsers.
  // Some sites/extensions define globals like window.tt/window.TikTok.
  const hasTikTokUserAgentPattern = tiktokPatterns.some(pattern => userAgent.includes(pattern))
  const hasTikTokWebkitBridge = (window as any).webkit?.messageHandlers?.TikTok !== undefined

  const isTikTok = FORCE_TIKTOK_BROWSER || hasTikTokUserAgentPattern || hasTikTokWebkitBridge

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

  // For TikTok browser, use the simple redirect page approach
  try {
    // Extract platform from URL
    let platform = 'ios'
    if (url.includes('play.google.com')) {
      platform = 'android'
    }
    
    // Use the simple redirect pages as shown in the images
    const redirectUrl = `${window.location.origin}/${platform}-redirect`
    window.open(redirectUrl, '_blank', 'noopener,noreferrer')
    return true
  } catch (e) {
    console.log('Failed to open redirect page:', e)
    return false
  }
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

// Updated function to use the simple redirect page approach
export async function handleTikTokDownload(platform: 'ios' | 'android'): Promise<boolean> {
  const { isTikTokBrowser } = detectTikTokBrowser()
  
  if (!isTikTokBrowser) {
    return false
  }

  try {
    // Use the simple redirect pages as shown in the images
    const redirectUrl = `${window.location.origin}/${platform}-redirect`
    
    // Try multiple methods to open the redirect page
    const methods = [
      // Method 1: Direct window.open with target="_blank"
      () => {
        const newWindow = window.open(redirectUrl, '_blank', 'noopener,noreferrer')
        if (newWindow) {
          newWindow.focus()
          return true
        }
        return false
      },
      
      // Method 2: Try without target
      () => {
        const newWindow = window.open(redirectUrl)
        if (newWindow) {
          newWindow.focus()
          return true
        }
        return false
      },
      
      // Method 3: Use location.href
      () => {
        window.location.href = redirectUrl
        return true
      },
      
      // Method 4: Try JavaScript redirect page as fallback
      () => {
        const jsRedirectUrl = `${window.location.origin}/open-${platform}`
        const newWindow = window.open(jsRedirectUrl, '_blank', 'noopener,noreferrer')
        if (newWindow) {
          newWindow.focus()
          return true
        }
        return false
      }
    ]

    for (const method of methods) {
      try {
        const result = method()
        if (result) {
          return true
        }
      } catch (e) {
        console.log('Method failed:', e)
      }
    }

    return false
  } catch (e) {
    console.log('Failed to open redirect page:', e)
    return false
  }
}

// Alternative function that tries to open app store directly with enhanced methods
export async function handleDirectAppStoreDownload(platform: 'ios' | 'android'): Promise<boolean> {
  const { isTikTokBrowser } = detectTikTokBrowser()
  
  if (!isTikTokBrowser) {
    return false
  }

  const urls = {
    ios: 'https://apps.apple.com/us/app/gotall/id6747467975',
    android: 'https://play.google.com/store/apps/details?id=app.gotall.play&pli=1'
  }

  const url = urls[platform]
  
  // Enhanced methods for direct app store access
  const methods = [
    // Method 1: Try with different window features
    () => {
      try {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer,popup,scrollbars=yes,resizable=yes')
        if (newWindow) {
          newWindow.focus()
          return true
        }
      } catch (e) {
        console.log('Window.open with features failed')
      }
      return false
    },
    
    // Method 2: Try with user gesture simulation
    () => {
      try {
        const link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.style.display = 'none'
        document.body.appendChild(link)
        
        // Simulate user interaction
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        })
        link.dispatchEvent(event)
        
        setTimeout(() => {
          document.body.removeChild(link)
        }, 100)
        
        return true
      } catch (e) {
        console.log('User gesture simulation failed')
      }
      return false
    },
    
    // Method 3: Try with iframe method
    () => {
      try {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        document.body.appendChild(iframe)
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 2000)
        return true
      } catch (e) {
        console.log('Iframe method failed')
      }
      return false
    },
    
    // Method 4: Try with location.assign
    () => {
      try {
        window.location.assign(url)
        return true
      } catch (e) {
        console.log('Location.assign failed')
      }
      return false
    }
  ]

  for (const method of methods) {
    try {
      const result = method()
      if (result) {
        return true
      }
    } catch (e) {
      console.log('Method failed:', e)
    }
  }

  return false
} 