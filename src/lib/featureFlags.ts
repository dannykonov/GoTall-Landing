const TRUE_VALUES = new Set(['1', 'true', 'yes', 'on'])

const parseBooleanEnv = (value: string | undefined, defaultValue: boolean): boolean => {
  if (!value) return defaultValue
  return TRUE_VALUES.has(value.toLowerCase())
}

// false (default): use normal app store links even in TikTok browser.
// true: enable TikTok-specific redirect + fallback modal flow.
export const ENABLE_TIKTOK_REDIRECT_FLOW = parseBooleanEnv(
  process.env.NEXT_PUBLIC_ENABLE_TIKTOK_REDIRECT_FLOW,
  false
)
