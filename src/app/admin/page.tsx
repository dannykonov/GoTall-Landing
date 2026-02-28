'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { adminFetch } from '@/lib/adminClient'

interface AttributionSummary {
  opens: number
  open_sessions: number
  clicks: number
  click_sessions: number
  ctr_percent: number
  event_ctr_percent: number
}

interface AttributionByCreator {
  creator_slug: string
  opens: number
  clicks: number
  open_sessions: number
  click_sessions: number
  ctr_percent: number
  event_ctr_percent: number
}

interface AttributionByDate {
  date: string
  opens: number
  clicks: number
  open_sessions: number
  click_sessions: number
  ctr_percent: number
  event_ctr_percent: number
}

interface AttributionResponse {
  selected_creator_slug?: string | null
  summary: AttributionSummary
  by_creator: AttributionByCreator[]
  by_date: AttributionByDate[]
}

interface CreatorOption {
  slug: string
  display_name: string
}

const formatDate = (date: Date): string => date.toISOString().slice(0, 10)

const getDefaultRange = () => {
  const endDate = new Date()
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  }
}

const FALLBACK_RESPONSE: AttributionResponse = {
  summary: {
    opens: 0,
    open_sessions: 0,
    clicks: 0,
    click_sessions: 0,
    ctr_percent: 0,
    event_ctr_percent: 0,
  },
  by_creator: [],
  by_date: [],
}

const formatNumber = (value: number) => value.toLocaleString('en-US')

export default function AdminAttributionPage() {
  const defaultRange = useMemo(() => getDefaultRange(), [])
  const [startDate, setStartDate] = useState(defaultRange.startDate)
  const [endDate, setEndDate] = useState(defaultRange.endDate)
  const [creatorSlugFilter, setCreatorSlugFilter] = useState<string>('all')
  const [creatorOptions, setCreatorOptions] = useState<CreatorOption[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [data, setData] = useState<AttributionResponse>(FALLBACK_RESPONSE)

  const loadCreatorOptions = useCallback(async () => {
    try {
      const response = await adminFetch('/api/admin/creators')
      if (!response.ok) return

      const payload = (await response.json()) as {
        creators?: Array<{ slug: string; display_name: string; is_active: boolean }>
      }

      const options = (payload.creators ?? [])
        .filter((creator) => creator.is_active)
        .map((creator) => ({ slug: creator.slug, display_name: creator.display_name }))

      setCreatorOptions(options)
    } catch {
      // Non-blocking: attribution data can still load without creator options.
    }
  }, [])

  const loadAttribution = useCallback(async () => {
    setLoading(true)
    setErrorMessage(null)

    try {
      const queryParams = new URLSearchParams({ startDate, endDate })
      if (creatorSlugFilter !== 'all') {
        queryParams.set('creatorSlug', creatorSlugFilter)
      }

      const query = queryParams.toString()
      const response = await adminFetch(`/api/admin/attribution?${query}`)

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string }
        throw new Error(payload.error || 'Failed to fetch attribution analytics')
      }

      const payload = (await response.json()) as AttributionResponse
      setData(payload)
    } catch (error) {
      setData(FALLBACK_RESPONSE)
      setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch attribution analytics')
    } finally {
      setLoading(false)
    }
  }, [creatorSlugFilter, startDate, endDate])

  useEffect(() => {
    void loadCreatorOptions()
  }, [loadCreatorOptions])

  useEffect(() => {
    void loadAttribution()
  }, [loadAttribution])

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Attribution Overview</h2>
          <p className="text-primary-gray text-sm">
            Conversion events are filtered to true store-click intents. Primary rate is session-based CVR.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
          <label className="text-sm text-primary-gray">
            Creator
            <select
              value={creatorSlugFilter}
              onChange={(event) => setCreatorSlugFilter(event.target.value)}
              className="block mt-1 px-3 py-2 rounded-lg bg-black border border-gray-700 text-white min-w-[180px]"
            >
              <option value="all">All creators</option>
              {creatorOptions.map((creator) => (
                <option key={creator.slug} value={creator.slug}>
                  {creator.display_name} ({creator.slug})
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-primary-gray">
            Start date
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="block mt-1 px-3 py-2 rounded-lg bg-black border border-gray-700 text-white"
            />
          </label>
          <label className="text-sm text-primary-gray">
            End date
            <input
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="block mt-1 px-3 py-2 rounded-lg bg-black border border-gray-700 text-white"
            />
          </label>
          <button
            onClick={() => void loadAttribution()}
            disabled={loading}
            className="h-[42px] px-4 rounded-lg bg-brand-gradient text-black font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </section>

      {errorMessage ? (
        <div className="rounded-xl border border-red-700 bg-red-950/20 p-4 text-sm text-red-300">
          {errorMessage}
        </div>
      ) : null}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4">
          <p className="text-xs text-primary-gray uppercase tracking-wide">Opens</p>
          <p className="text-2xl font-semibold mt-2">{formatNumber(data.summary.opens)}</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4">
          <p className="text-xs text-primary-gray uppercase tracking-wide">Open Sessions</p>
          <p className="text-2xl font-semibold mt-2">{formatNumber(data.summary.open_sessions)}</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4">
          <p className="text-xs text-primary-gray uppercase tracking-wide">Clicks</p>
          <p className="text-2xl font-semibold mt-2">{formatNumber(data.summary.clicks)}</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4">
          <p className="text-xs text-primary-gray uppercase tracking-wide">Converted Sessions</p>
          <p className="text-2xl font-semibold mt-2">{formatNumber(data.summary.click_sessions)}</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4">
          <p className="text-xs text-primary-gray uppercase tracking-wide">CVR (Session)</p>
          <p className="text-2xl font-semibold mt-2">{data.summary.ctr_percent.toFixed(2)}%</p>
          <p className="text-xs text-primary-gray mt-1">Event CTR: {data.summary.event_ctr_percent.toFixed(2)}%</p>
        </div>
      </section>

      <section className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">
          Opens vs Clicks Trend {creatorSlugFilter !== 'all' ? `(${creatorSlugFilter})` : ''}
        </h3>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.by_date}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
              <XAxis dataKey="date" stroke="#a3a3a3" />
              <YAxis stroke="#a3a3a3" />
              <Tooltip
                contentStyle={{ backgroundColor: '#111111', border: '1px solid #333333', borderRadius: 8 }}
              />
              <Legend />
              <Line type="monotone" dataKey="opens" stroke="#B5FF00" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="clicks" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-xl border border-gray-800 bg-primary-dark-gray p-4 sm:p-6">
        <h3 className="text-lg font-semibold mb-4">
          {creatorSlugFilter === 'all' ? 'Top Creators' : `Creator Breakdown (${creatorSlugFilter})`}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-primary-gray border-b border-gray-800">
                <th className="py-3 pr-4 font-medium">Creator</th>
                <th className="py-3 pr-4 font-medium">Opens</th>
                <th className="py-3 pr-4 font-medium">Clicks</th>
                <th className="py-3 pr-4 font-medium">CVR (Session)</th>
                <th className="py-3 pr-4 font-medium">Event CTR</th>
              </tr>
            </thead>
            <tbody>
              {data.by_creator.length === 0 ? (
                <tr>
                  <td className="py-4 text-primary-gray" colSpan={5}>
                    No creator attribution data for this range yet.
                  </td>
                </tr>
              ) : (
                data.by_creator.map((creator) => (
                  <tr key={creator.creator_slug} className="border-b border-gray-900">
                    <td className="py-3 pr-4">{creator.creator_slug}</td>
                    <td className="py-3 pr-4">{formatNumber(creator.opens)}</td>
                    <td className="py-3 pr-4">{formatNumber(creator.clicks)}</td>
                    <td className="py-3 pr-4">{creator.ctr_percent.toFixed(2)}%</td>
                    <td className="py-3 pr-4">{creator.event_ctr_percent.toFixed(2)}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
