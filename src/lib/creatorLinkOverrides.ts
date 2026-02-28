type CreatorLinkOverrides = Record<string, Partial<Record<'ios' | 'android', string>>>

// Deprecated: creator links are now managed via `public.creators` and `/api/public/creator-links`.
// This file remains only as historical reference.
export const CREATOR_LINK_OVERRIDES: CreatorLinkOverrides = {
  dobbin: {
    ios: 'https://gotall.sng.link/D1s0b/svcb?_smtype=3',
    android: 'https://gotall.sng.link/D1s0b/svcb?_smtype=3',
  },
}
