const CREATOR_QUERY_PARAM = 'c'
const ATTRIBUTION_STORAGE_KEY = 'gotall_creator_attribution'
const CREATOR_SLUG_REGEX = /^[a-z0-9][a-z0-9_-]{0,63}$/

export interface CreatorAttribution {
  creator_slug: string | null
  first_touch_creator: string | null
  first_touch_at: string | null
  first_touch_path: string | null
  last_touch_creator: string | null
  last_touch_at: string | null
  last_touch_path: string | null
}

const EMPTY_ATTRIBUTION: CreatorAttribution = {
  creator_slug: null,
  first_touch_creator: null,
  first_touch_at: null,
  first_touch_path: null,
  last_touch_creator: null,
  last_touch_at: null,
  last_touch_path: null,
}

const normalizeCreatorSlug = (value: string | null): string | null => {
  if (!value) return null

  const normalized = value.trim().toLowerCase()
  if (!CREATOR_SLUG_REGEX.test(normalized)) return null

  return normalized
}

const toOptionalString = (value: unknown): string | null => {
  return typeof value === 'string' && value.length > 0 ? value : null
}

const sanitizeAttribution = (value: unknown): CreatorAttribution => {
  if (!value || typeof value !== 'object') return { ...EMPTY_ATTRIBUTION }

  const raw = value as Record<string, unknown>
  const firstTouchCreator = normalizeCreatorSlug(toOptionalString(raw.first_touch_creator))
  const lastTouchCreator = normalizeCreatorSlug(toOptionalString(raw.last_touch_creator))

  return {
    creator_slug: lastTouchCreator || firstTouchCreator || null,
    first_touch_creator: firstTouchCreator,
    first_touch_at: toOptionalString(raw.first_touch_at),
    first_touch_path: toOptionalString(raw.first_touch_path),
    last_touch_creator: lastTouchCreator,
    last_touch_at: toOptionalString(raw.last_touch_at),
    last_touch_path: toOptionalString(raw.last_touch_path),
  }
}

const readStoredAttribution = (): CreatorAttribution => {
  if (typeof window === 'undefined') return { ...EMPTY_ATTRIBUTION }

  try {
    const rawValue = localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!rawValue) return { ...EMPTY_ATTRIBUTION }

    return sanitizeAttribution(JSON.parse(rawValue))
  } catch {
    return { ...EMPTY_ATTRIBUTION }
  }
}

const persistAttribution = (attribution: CreatorAttribution): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // Ignore storage errors so tracking never blocks the UI.
  }
}

export const captureCreatorAttributionFromUrl = (): CreatorAttribution => {
  if (typeof window === 'undefined') return { ...EMPTY_ATTRIBUTION }

  const creatorFromUrl = normalizeCreatorSlug(
    new URLSearchParams(window.location.search).get(CREATOR_QUERY_PARAM)
  )
  const stored = readStoredAttribution()

  if (!creatorFromUrl) {
    return stored
  }

  const now = new Date().toISOString()
  const currentPath = `${window.location.pathname}${window.location.search}`
  const nextAttribution: CreatorAttribution = {
    creator_slug: creatorFromUrl,
    first_touch_creator: stored.first_touch_creator || creatorFromUrl,
    first_touch_at: stored.first_touch_creator ? stored.first_touch_at : now,
    first_touch_path: stored.first_touch_creator ? stored.first_touch_path : currentPath,
    last_touch_creator: creatorFromUrl,
    last_touch_at: now,
    last_touch_path: currentPath,
  }

  persistAttribution(nextAttribution)
  return nextAttribution
}

export const getCreatorAttribution = (): CreatorAttribution => {
  return readStoredAttribution()
}

export const getActiveCreatorSlug = (): string | null => {
  const attribution = captureCreatorAttributionFromUrl()
  return attribution.creator_slug
}
