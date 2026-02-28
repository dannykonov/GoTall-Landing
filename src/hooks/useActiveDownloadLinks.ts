'use client'

import { useCallback, useEffect, useState } from 'react'
import { captureCreatorAttributionFromUrl, getCreatorAttribution } from '@/lib/attribution'
import {
  DownloadLinks,
  getActiveDownloadLinks,
  getDownloadLinksForCreator,
  resolveDownloadLinksForCreator,
} from '@/lib/downloadLinks'

const getCapturedCreatorSlug = () => {
  const attribution = getCreatorAttribution()
  return attribution.creator_slug || attribution.last_touch_creator || attribution.first_touch_creator || null
}

export function useActiveDownloadLinks() {
  const [downloadLinks, setDownloadLinks] = useState<DownloadLinks>(() => getActiveDownloadLinks())
  const [activeCreatorSlug, setActiveCreatorSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return getCapturedCreatorSlug()
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)

  const refreshLinks = useCallback(async () => {
    if (typeof window === 'undefined') return

    setIsReady(false)
    const captured = captureCreatorAttributionFromUrl()
    const slug = captured.creator_slug || captured.last_touch_creator || captured.first_touch_creator || null
    setActiveCreatorSlug(slug)

    const fallback = getDownloadLinksForCreator(slug)
    setDownloadLinks(fallback)

    if (!slug) {
      setIsReady(true)
      return
    }

    setIsLoading(true)
    try {
      const resolved = await resolveDownloadLinksForCreator(slug)
      setDownloadLinks(resolved)
    } finally {
      setIsLoading(false)
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    void refreshLinks()
  }, [refreshLinks])

  return {
    downloadLinks,
    activeCreatorSlug,
    isLoading,
    isReady,
    refreshLinks,
  }
}
