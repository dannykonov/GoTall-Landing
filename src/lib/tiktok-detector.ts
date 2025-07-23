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

  // Enhanced methods for TikTok browser
  const methods = [
    // Method 1: Try to open in new window with different target
    () => {
      try {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer,popup')
        if (newWindow) {
          newWindow.focus()
          return true
        }
      } catch (e) {
        console.log('Window.open with popup failed')
      }
      return false
    },
    
    // Method 2: Try to open in new window without target
    () => {
      try {
        const newWindow = window.open(url)
        if (newWindow) {
          newWindow.focus()
          return true
        }
      } catch (e) {
        console.log('Window.open without target failed')
      }
      return false
    },

    // Method 3: Try to trigger external browser with special URL scheme
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

    // Method 5: Try to use custom URL scheme
    () => {
      try {
        const customUrl = `gotall://download?url=${encodeURIComponent(url)}`
        window.location.href = customUrl
        return true
      } catch (e) {
        console.log('Custom URL scheme failed')
      }
      return false
    },

    // Method 6: Try to use iframe method
    () => {
      try {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        document.body.appendChild(iframe)
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 1000)
        return true
      } catch (e) {
        console.log('Iframe method failed')
      }
      return false
    },

    // Method 7: Try to use location.assign
    () => {
      try {
        window.location.assign(url)
        return true
      } catch (e) {
        console.log('Location.assign failed')
      }
      return false
    },

    // Method 8: Try to use location.replace
    () => {
      try {
        window.location.replace(url)
        return true
      } catch (e) {
        console.log('Location.replace failed')
      }
      return false
    },

    // Method 9: Try to use link element
    () => {
      try {
        const link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        return true
      } catch (e) {
        console.log('Link element method failed')
      }
      return false
    },

    // Method 10: Try to copy to clipboard and show instructions
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

  // Try each method with a small delay between attempts
  for (let i = 0; i < methods.length; i++) {
    try {
      const result = await methods[i]()
      if (result) {
        // Add a small delay before trying the next method
        await new Promise(resolve => setTimeout(resolve, 100))
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

// New function to handle TikTok-specific download flow
export async function handleTikTokDownload(platform: 'ios' | 'android'): Promise<boolean> {
  const { isTikTokBrowser } = detectTikTokBrowser()
  
  if (!isTikTokBrowser) {
    return false
  }

  const urls = {
    ios: 'https://apps.apple.com/us/app/gotall/id6747467975',
    android: 'https://play.google.com/store/apps/details?id=app.gotall.play&pli=1'
  }

  const url = urls[platform]
  
  // Try multiple approaches for TikTok
  const approaches = [
    // Approach 1: Try to open with a delay
    async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return await openInExternalBrowser(url)
    },
    
    // Approach 2: Try to show instructions first, then attempt download
    async () => {
      showTikTokInstructions()
      await new Promise(resolve => setTimeout(resolve, 1000))
      return await openInExternalBrowser(url)
    },
    
    // Approach 3: Try to copy link and show manual instructions
    async () => {
      try {
        await navigator.clipboard.writeText(url)
        alert(`Link copied! Please:\n1. Open your external browser\n2. Paste the link\n3. Download the app`)
        return true
      } catch (e) {
        return false
      }
    }
  ]

  for (const approach of approaches) {
    try {
      const result = await approach()
      if (result) {
        return true
      }
    } catch (e) {
      console.log('Approach failed:', e)
    }
  }

  return false
} 