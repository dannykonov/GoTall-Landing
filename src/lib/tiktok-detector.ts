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
  
  // Check if any TikTok patterns are in the user agent
  const isTikTok = tiktokPatterns.some(pattern => userAgent.includes(pattern)) ||
                  (window as any).TikTok !== undefined ||
                  (window as any).tt !== undefined ||
                  (window as any).webkit?.messageHandlers?.TikTok !== undefined

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

  // For TikTok browser, try to open our custom landing page first
  try {
    // Extract platform from URL
    let platform = 'ios'
    if (url.includes('play.google.com')) {
      platform = 'android'
    }
    
    // Try redirect page first (immediate redirect)
    const redirectPageUrl = `${window.location.origin}/redirect?platform=${platform}`
    window.open(redirectPageUrl, '_blank', 'noopener,noreferrer')
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

// New function to handle TikTok-specific download flow using landing page
export async function handleTikTokDownload(platform: 'ios' | 'android'): Promise<boolean> {
  const { isTikTokBrowser } = detectTikTokBrowser()
  
  if (!isTikTokBrowser) {
    return false
  }

  try {
    // Try multiple approaches for TikTok
    const approaches = [
      // Approach 1: Try redirect page (immediate redirect)
      () => {
        const redirectPageUrl = `${window.location.origin}/redirect?platform=${platform}`
        const newWindow = window.open(redirectPageUrl, '_blank', 'noopener,noreferrer')
        if (newWindow) {
          newWindow.focus()
          return true
        }
        return false
      },
      
      // Approach 2: Try download page (with countdown)
      () => {
        const downloadPageUrl = `${window.location.origin}/download?platform=${platform}`
        const newWindow = window.open(downloadPageUrl, '_blank', 'noopener,noreferrer')
        if (newWindow) {
          newWindow.focus()
          return true
        }
        return false
      },
      
      // Approach 3: Try direct app store with enhanced methods
      () => {
        const urls = {
          ios: 'https://apps.apple.com/us/app/gotall/id6747467975',
          android: 'https://play.google.com/store/apps/details?id=app.gotall.play&pli=1'
        }
        
        const url = urls[platform]
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer,popup')
        if (newWindow) {
          newWindow.focus()
          return true
        }
        return false
      },
      
      // Approach 4: Try with location.href
      () => {
        const redirectPageUrl = `${window.location.origin}/redirect?platform=${platform}`
        window.location.href = redirectPageUrl
        return true
      }
    ]

    for (const approach of approaches) {
      try {
        const result = approach()
        if (result) {
          return true
        }
      } catch (e) {
        console.log('Approach failed:', e)
      }
    }

    return false
  } catch (e) {
    console.log('Failed to open download page:', e)
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