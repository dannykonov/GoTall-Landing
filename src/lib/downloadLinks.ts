import { getActiveCreatorSlug } from './attribution'
import { CREATOR_LINK_OVERRIDES } from './creatorLinkOverrides'

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

const getValidatedCreatorOverrides = (): Record<string, Partial<Record<DownloadPlatform, string>>> => {
  const validated: Record<string, Partial<Record<DownloadPlatform, string>>> = {}

  for (const [rawSlug, links] of Object.entries(CREATOR_LINK_OVERRIDES)) {
    const creatorSlug = rawSlug.trim().toLowerCase()
    if (!creatorSlug) continue

    const ios = isValidExternalUrl(links.ios) ? links.ios : undefined
    const android = isValidExternalUrl(links.android) ? links.android : undefined

    if ((links.ios && !ios) || (links.android && !android)) {
      console.warn(`Invalid creator link override for "${creatorSlug}"; expected https URLs`)
    }

    if (ios || android) {
      validated[creatorSlug] = { ios, android }
    }
  }

  return validated
}

const VALIDATED_CREATOR_LINK_OVERRIDES = getValidatedCreatorOverrides()

export const getDownloadLinksForCreator = (creatorSlug?: string | null): DownloadLinks => {
  if (!creatorSlug) return { ...DEFAULT_DOWNLOAD_LINKS }

  const override = VALIDATED_CREATOR_LINK_OVERRIDES[creatorSlug.trim().toLowerCase()]
  if (!override) return { ...DEFAULT_DOWNLOAD_LINKS }

  return {
    ios: override.ios || DEFAULT_DOWNLOAD_LINKS.ios,
    android: override.android || DEFAULT_DOWNLOAD_LINKS.android,
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
