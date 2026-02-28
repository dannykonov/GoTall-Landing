import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser, toApiErrorResponse } from '@/lib/adminAuth'
import { getServerSupabaseServiceClient } from '@/lib/supabaseServer'

interface FunnelRow {
  date: string
  creator_slug: string
  opens: number
  open_sessions: number
  clicks: number
  click_sessions: number
  ctr_percent: number
}

const getPercent = (numerator: number, denominator: number): number => {
  if (!denominator) return 0
  return Number(((numerator / denominator) * 100).toFixed(2))
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/
const CREATOR_SLUG_REGEX = /^[a-z0-9][a-z0-9_-]{0,63}$/

const formatDate = (date: Date): string => {
  return date.toISOString().slice(0, 10)
}

const parseDate = (raw: string | null, fallback: Date): string => {
  if (!raw) return formatDate(fallback)
  if (!DATE_REGEX.test(raw)) return formatDate(fallback)
  return raw
}

const parseCreatorSlug = (raw: string | null): string | null => {
  if (!raw) return null
  const normalized = raw.trim().toLowerCase()
  if (!CREATOR_SLUG_REGEX.test(normalized)) return null
  return normalized
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request)
    const supabase = getServerSupabaseServiceClient()

    const today = new Date()
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const startDate = parseDate(request.nextUrl.searchParams.get('startDate'), thirtyDaysAgo)
    const endDate = parseDate(request.nextUrl.searchParams.get('endDate'), today)
    const rawCreatorSlug = request.nextUrl.searchParams.get('creatorSlug')
    const creatorSlug = parseCreatorSlug(rawCreatorSlug)

    if (rawCreatorSlug && !creatorSlug) {
      return NextResponse.json({ error: 'Invalid creatorSlug format' }, { status: 400 })
    }

    const { data, error } = await supabase.rpc('get_creator_attribution_funnel', {
      start_date: startDate,
      end_date: endDate,
      creator_slug_filter: creatorSlug,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const rows = ((data ?? []) as FunnelRow[]).sort((a, b) => a.date.localeCompare(b.date))

    const totals = rows.reduce(
      (acc, row) => {
        acc.opens += Number(row.opens) || 0
        acc.openSessions += Number(row.open_sessions) || 0
        acc.clicks += Number(row.clicks) || 0
        acc.clickSessions += Number(row.click_sessions) || 0
        return acc
      },
      { opens: 0, openSessions: 0, clicks: 0, clickSessions: 0 }
    )

    const byCreatorMap = new Map<
      string,
      { creator_slug: string; opens: number; clicks: number; open_sessions: number; click_sessions: number }
    >()

    const byDateMap = new Map<
      string,
      { date: string; opens: number; clicks: number; open_sessions: number; click_sessions: number }
    >()

    rows.forEach((row) => {
      const creator = byCreatorMap.get(row.creator_slug) ?? {
        creator_slug: row.creator_slug,
        opens: 0,
        clicks: 0,
        open_sessions: 0,
        click_sessions: 0,
      }

      creator.opens += Number(row.opens) || 0
      creator.clicks += Number(row.clicks) || 0
      creator.open_sessions += Number(row.open_sessions) || 0
      creator.click_sessions += Number(row.click_sessions) || 0
      byCreatorMap.set(row.creator_slug, creator)

      const day = byDateMap.get(row.date) ?? {
        date: row.date,
        opens: 0,
        clicks: 0,
        open_sessions: 0,
        click_sessions: 0,
      }
      day.opens += Number(row.opens) || 0
      day.clicks += Number(row.clicks) || 0
      day.open_sessions += Number(row.open_sessions) || 0
      day.click_sessions += Number(row.click_sessions) || 0
      byDateMap.set(row.date, day)
    })

    const byCreator = Array.from(byCreatorMap.values())
      .map((row) => ({
        ...row,
        ctr_percent: getPercent(row.click_sessions, row.open_sessions),
        event_ctr_percent: getPercent(row.clicks, row.opens),
      }))
      .sort((a, b) => b.clicks - a.clicks)

    const byDate = Array.from(byDateMap.values())
      .map((row) => ({
        ...row,
        ctr_percent: getPercent(row.click_sessions, row.open_sessions),
        event_ctr_percent: getPercent(row.clicks, row.opens),
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    const summary = {
      opens: totals.opens,
      open_sessions: totals.openSessions,
      clicks: totals.clicks,
      click_sessions: totals.clickSessions,
      ctr_percent: getPercent(totals.clickSessions, totals.openSessions),
      event_ctr_percent: getPercent(totals.clicks, totals.opens),
    }

    return NextResponse.json({
      date_range: { startDate, endDate },
      selected_creator_slug: creatorSlug,
      summary,
      by_creator: byCreator,
      by_date: byDate,
      rows,
    })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}
