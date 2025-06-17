import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageVisit, trackEvent } from '@/lib/analytics'

export function useAnalytics() {
  const pathname = usePathname()

  // Track page visits automatically
  useEffect(() => {
    // Small delay to ensure page is fully loaded
    const timeoutId = setTimeout(() => {
      trackPageVisit(pathname)
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  // Helper function for tracking custom events
  const track = useCallback((eventName: string, eventData?: Record<string, any>) => {
    trackEvent(eventName, eventData)
  }, [])

  return { track }
}

// Specialized hooks for common events
export function useWaitlistTracking() {
  const { track } = useAnalytics()

  const trackWaitlistOpen = useCallback(() => {
    track('waitlist_modal_opened')
  }, [track])

  const trackWaitlistSubmit = useCallback((success: boolean, email?: string) => {
    track('waitlist_form_submitted', { 
      success, 
      email_domain: email ? email.split('@')[1] : undefined 
    })
  }, [track])

  const trackWaitlistClose = useCallback(() => {
    track('waitlist_modal_closed')
  }, [track])

  return {
    trackWaitlistOpen,
    trackWaitlistSubmit,
    trackWaitlistClose
  }
}

export function useNavigationTracking() {
  const { track } = useAnalytics()

  const trackFeatureClick = useCallback((featureName: string) => {
    track('feature_clicked', { feature: featureName })
  }, [track])

  const trackCommunityClick = useCallback(() => {
    track('community_clicked')
  }, [track])

  const trackLogoClick = useCallback(() => {
    track('logo_clicked')
  }, [track])

  return {
    trackFeatureClick,
    trackCommunityClick,
    trackLogoClick
  }
} 