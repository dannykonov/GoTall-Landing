import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageVisit, trackEvent } from '@/lib/analytics'
import { captureCreatorAttributionFromUrl } from '@/lib/attribution'

export function useAnalytics() {
  const pathname = usePathname()

  // Track page visits automatically
  useEffect(() => {
    // Small delay to ensure page is fully loaded
    const timeoutId = setTimeout(() => {
      captureCreatorAttributionFromUrl()
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

  const trackNavigationClick = useCallback((deviceType: string) => {
    track('nav_cta_clicked', { device: deviceType })
  }, [track])

  return {
    trackFeatureClick,
    trackCommunityClick,
    trackLogoClick,
    trackNavigationClick
  }
} 