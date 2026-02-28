'use client'

import { useCallback, useEffect, useState } from 'react'
import { adminFetch } from '@/lib/adminClient'

interface CreatorRecord {
  slug: string
  display_name: string
  ios_url: string | null
  android_url: string | null
  is_active: boolean
  notes: string | null
  created_at: string
  updated_at: string
}

interface CreatorFormState {
  slug: string
  display_name: string
  ios_url: string
  android_url: string
  notes: string
}

const EMPTY_FORM: CreatorFormState = {
  slug: '',
  display_name: '',
  ios_url: '',
  android_url: '',
  notes: '',
}

const DEFAULT_BASE_URL = 'https://www.gotall.app'

export default function AdminCreatorsPage() {
  const [creators, setCreators] = useState<CreatorRecord[]>([])
  const [form, setForm] = useState<CreatorFormState>(EMPTY_FORM)
  const [loading, setLoading] = useState(true)
  const [savingSlug, setSavingSlug] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL)

  const loadCreators = useCallback(async () => {
    setLoading(true)
    setErrorMessage(null)

    try {
      const response = await adminFetch('/api/admin/creators')
      const payload = (await response.json()) as { creators?: CreatorRecord[]; error?: string }

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to load creators')
      }

      setCreators(payload.creators ?? [])
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load creators')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin)
    }
    void loadCreators()
  }, [loadCreators])

  const handleFormChange = (field: keyof CreatorFormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  const handleCreate = async () => {
    setErrorMessage(null)
    setCreating(true)

    try {
      const response = await adminFetch('/api/admin/creators', {
        method: 'POST',
        body: JSON.stringify({
          slug: form.slug.trim().toLowerCase(),
          display_name: form.display_name.trim(),
          ios_url: form.ios_url.trim() || null,
          android_url: form.android_url.trim() || null,
          notes: form.notes.trim() || null,
        }),
      })

      const payload = (await response.json()) as { creator?: CreatorRecord; error?: string }
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to create creator')
      }

      if (payload.creator) {
        setCreators((previous) => [payload.creator as CreatorRecord, ...previous])
      }
      setForm(EMPTY_FORM)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to create creator')
    } finally {
      setCreating(false)
    }
  }

  const updateCreatorField = (slug: string, field: keyof CreatorRecord, value: string | boolean) => {
    setCreators((previous) =>
      previous.map((creator) =>
        creator.slug === slug
          ? {
              ...creator,
              [field]: value,
            }
          : creator
      )
    )
  }

  const handleSaveCreator = async (creator: CreatorRecord) => {
    setSavingSlug(creator.slug)
    setErrorMessage(null)

    try {
      const response = await adminFetch(`/api/admin/creators/${creator.slug}`, {
        method: 'PATCH',
        body: JSON.stringify({
          display_name: creator.display_name.trim(),
          ios_url: creator.ios_url?.trim() || null,
          android_url: creator.android_url?.trim() || null,
          notes: creator.notes?.trim() || null,
          is_active: creator.is_active,
        }),
      })

      const payload = (await response.json()) as { creator?: CreatorRecord; error?: string }
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to update creator')
      }

      if (payload.creator) {
        setCreators((previous) =>
          previous.map((item) => (item.slug === creator.slug ? (payload.creator as CreatorRecord) : item))
        )
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update creator')
    } finally {
      setSavingSlug(null)
    }
  }

  const handleToggleActive = async (creator: CreatorRecord) => {
    setSavingSlug(creator.slug)
    setErrorMessage(null)

    try {
      const response = await adminFetch(`/api/admin/creators/${creator.slug}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !creator.is_active }),
      })

      const payload = (await response.json()) as { creator?: CreatorRecord; error?: string }
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to update creator status')
      }

      if (payload.creator) {
        setCreators((previous) =>
          previous.map((item) => (item.slug === creator.slug ? (payload.creator as CreatorRecord) : item))
        )
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update creator status')
    } finally {
      setSavingSlug(null)
    }
  }

  const handleCopyCreatorLink = async (slug: string) => {
    const creatorUrl = `${baseUrl}/?c=${slug}`
    try {
      await navigator.clipboard.writeText(creatorUrl)
    } catch {
      setErrorMessage('Failed to copy link to clipboard')
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold">Creator Links</h2>
        <p className="text-primary-gray text-sm">
          Add creators and manage their singular attribution links without a redeploy.
        </p>
      </section>

      {errorMessage ? (
        <div className="rounded-xl border border-red-700 bg-red-950/20 p-4 text-sm text-red-300">
          {errorMessage}
        </div>
      ) : null}

      <section className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4 sm:p-6 space-y-4">
        <h3 className="text-lg font-semibold">Add Creator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={form.slug}
            onChange={(event) => handleFormChange('slug', event.target.value)}
            placeholder="slug (e.g. dobbin)"
            className="px-3 py-2 rounded-lg bg-black border border-gray-700"
          />
          <input
            value={form.display_name}
            onChange={(event) => handleFormChange('display_name', event.target.value)}
            placeholder="Display name"
            className="px-3 py-2 rounded-lg bg-black border border-gray-700"
          />
          <input
            value={form.ios_url}
            onChange={(event) => handleFormChange('ios_url', event.target.value)}
            placeholder="iOS URL (https://...)"
            className="px-3 py-2 rounded-lg bg-black border border-gray-700 md:col-span-2"
          />
          <input
            value={form.android_url}
            onChange={(event) => handleFormChange('android_url', event.target.value)}
            placeholder="Android URL (https://...)"
            className="px-3 py-2 rounded-lg bg-black border border-gray-700 md:col-span-2"
          />
          <textarea
            value={form.notes}
            onChange={(event) => handleFormChange('notes', event.target.value)}
            placeholder="Notes (optional)"
            rows={2}
            className="px-3 py-2 rounded-lg bg-black border border-gray-700 md:col-span-2"
          />
        </div>
        <button
          onClick={() => void handleCreate()}
          disabled={creating}
          className="px-4 py-2 rounded-lg bg-brand-gradient text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {creating ? 'Creating...' : 'Create creator'}
        </button>
      </section>

      <section className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Existing Creators</h3>
          <button
            onClick={() => void loadCreators()}
            className="px-3 py-2 rounded-lg border border-gray-700 text-sm text-primary-gray hover:text-white"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-primary-gray">Loading creators...</p>
        ) : creators.length === 0 ? (
          <p className="text-primary-gray">No creators found yet.</p>
        ) : (
          <div className="space-y-4">
            {creators.map((creator) => {
              const creatorUrl = `${baseUrl}/?c=${creator.slug}`
              const isSaving = savingSlug === creator.slug

              return (
                <div key={creator.slug} className="border border-gray-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{creator.display_name}</p>
                      <p className="text-xs text-primary-gray">Slug: {creator.slug}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full w-fit ${
                        creator.is_active
                          ? 'bg-green-900/50 text-green-300 border border-green-700'
                          : 'bg-gray-900 text-gray-400 border border-gray-700'
                      }`}
                    >
                      {creator.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <label className="text-xs text-primary-gray">
                      Display name
                      <input
                        value={creator.display_name}
                        onChange={(event) =>
                          updateCreatorField(creator.slug, 'display_name', event.target.value)
                        }
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-sm"
                      />
                    </label>
                    <label className="text-xs text-primary-gray">
                      iOS URL
                      <input
                        value={creator.ios_url || ''}
                        onChange={(event) => updateCreatorField(creator.slug, 'ios_url', event.target.value)}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-sm"
                      />
                    </label>
                    <label className="text-xs text-primary-gray">
                      Android URL
                      <input
                        value={creator.android_url || ''}
                        onChange={(event) =>
                          updateCreatorField(creator.slug, 'android_url', event.target.value)
                        }
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-sm"
                      />
                    </label>
                    <label className="text-xs text-primary-gray">
                      Notes
                      <textarea
                        rows={2}
                        value={creator.notes || ''}
                        onChange={(event) => updateCreatorField(creator.slug, 'notes', event.target.value)}
                        className="mt-1 w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-sm"
                      />
                    </label>
                  </div>

                  <div className="bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm">
                    <p className="text-primary-gray text-xs mb-1">Creator link</p>
                    <p className="break-all">{creatorUrl}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => void handleSaveCreator(creator)}
                      disabled={isSaving}
                      className="px-3 py-2 rounded-lg bg-brand-gradient text-black text-sm font-semibold disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => void handleToggleActive(creator)}
                      disabled={isSaving}
                      className="px-3 py-2 rounded-lg border border-gray-700 text-sm text-primary-gray hover:text-white disabled:opacity-50"
                    >
                      {creator.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => void handleCopyCreatorLink(creator.slug)}
                      className="px-3 py-2 rounded-lg border border-gray-700 text-sm text-primary-gray hover:text-white"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
