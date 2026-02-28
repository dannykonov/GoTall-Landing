import { getActiveCreatorSlug } from './attribution'

export type DownloadPlatform = 'ios' | 'android'

export interface DownloadLinks {
  ios: string
  android: string
}

const DEFAULT_DOWNLOAD_LINKS: DownloadLinks = {
  ios: 'https://apps.apple.com/us/app/gotall/id6747467975',
  android: 'https://play.google.com/store/apps/details?id=app.gotall.play&pli=1',
}

const isValidExternalUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') return false
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const normalizeCreatorSlug = (creatorSlug?: string | null): string | null => {
  if (!creatorSlug) return null
  const normalized = creatorSlug.trim().toLowerCase()
  return normalized.length > 0 ? normalized : null
}

export const getDownloadLinksForCreator = (creatorSlug?: string | null): DownloadLinks => {
  const normalizedSlug = normalizeCreatorSlug(creatorSlug)
  if (!normalizedSlug) return { ...DEFAULT_DOWNLOAD_LINKS }
  return { ...DEFAULT_DOWNLOAD_LINKS }
}

interface CreatorLinksResponse {
  creator?: {
    slug: string
    display_name: string
    ios_url: string | null
    android_url: string | null
  } | null
}

export const resolveDownloadLinksForCreator = async (
  creatorSlug?: string | null
): Promise<DownloadLinks> => {
  const normalizedSlug = normalizeCreatorSlug(creatorSlug)
  const fallbackLinks = getDownloadLinksForCreator(normalizedSlug)

  if (!normalizedSlug || typeof window === 'undefined') {
    return fallbackLinks
  }

  try {
    const response = await fetch(`/api/public/creator-links?slug=${encodeURIComponent(normalizedSlug)}`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) {
      return fallbackLinks
    }

    const payload = (await response.json()) as CreatorLinksResponse
    const creator = payload.creator
    if (!creator) {
      return fallbackLinks
    }

    const ios = isValidExternalUrl(creator.ios_url) ? creator.ios_url : undefined
    const android = isValidExternalUrl(creator.android_url) ? creator.android_url : undefined

    return {
      ios: ios || fallbackLinks.ios,
      android: android || fallbackLinks.android,
    }
  } catch {
    return fallbackLinks
  }
}

export const getActiveDownloadLinks = (): DownloadLinks => {
  const activeCreator = getActiveCreatorSlug()
  return getDownloadLinksForCreator(activeCreator)
}

export const getDownloadUrlForPlatform = (
  platform: DownloadPlatform,
  creatorSlug?: string | null
): string => {
  const links = getDownloadLinksForCreator(creatorSlug)
  return links[platform]
}

export const getDefaultDownloadLinks = (): DownloadLinks => {
  return { ...DEFAULT_DOWNLOAD_LINKS }
}
