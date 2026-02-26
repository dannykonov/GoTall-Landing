type CreatorLinkOverrides = Record<string, Partial<Record<'ios' | 'android', string>>>

// Add or update creators here. The key must match `?c=<slug>`.
export const CREATOR_LINK_OVERRIDES: CreatorLinkOverrides = {
  dobbin: {
    ios: 'https://gotall.sng.link/D1s0b/svcb?_smtype=3',
    android: 'https://gotall.sng.link/D1s0b/svcb?_smtype=3',
  },
}
