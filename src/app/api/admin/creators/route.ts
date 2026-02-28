import { NextRequest, NextResponse } from 'next/server'
import { requireAdminUser, toApiErrorResponse } from '@/lib/adminAuth'
import { getServerSupabaseServiceClient } from '@/lib/supabaseServer'

const CREATOR_SLUG_REGEX = /^[a-z0-9][a-z0-9_-]{0,63}$/

const normalizeSlug = (value: unknown): string | null => {
  if (typeof value !== 'string') return null
  const normalized = value.trim().toLowerCase()
  return CREATOR_SLUG_REGEX.test(normalized) ? normalized : null
}

const normalizeText = (value: unknown): string | null => {
  if (typeof value !== 'string') return null
  const normalized = value.trim()
  return normalized.length > 0 ? normalized : null
}

const normalizeHttpsUrl = (value: unknown): string | null => {
  const textValue = normalizeText(value)
  if (!textValue) return null

  try {
    const parsed = new URL(textValue)
    if (parsed.protocol !== 'https:') return null
    return parsed.toString()
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request)
    const supabase = getServerSupabaseServiceClient()

    const { data, error } = await supabase
      .from('creators')
      .select('slug, display_name, ios_url, android_url, is_active, notes, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ creators: data ?? [] })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminUser(request)
    const supabase = getServerSupabaseServiceClient()
    const payload = (await request.json()) as Record<string, unknown>

    const slug = normalizeSlug(payload.slug)
    const displayName = normalizeText(payload.display_name)
    const iosUrl = normalizeHttpsUrl(payload.ios_url)
    const androidUrl = normalizeHttpsUrl(payload.android_url)
    const notes = normalizeText(payload.notes)
    const isActive = typeof payload.is_active === 'boolean' ? payload.is_active : true

    if (!slug) {
      return NextResponse.json(
        { error: 'Invalid slug. Use lowercase letters, numbers, underscores, or hyphens.' },
        { status: 400 }
      )
    }

    if (!displayName) {
      return NextResponse.json({ error: 'display_name is required' }, { status: 400 })
    }

    if (!iosUrl && !androidUrl) {
      return NextResponse.json(
        { error: 'At least one valid https URL is required (ios_url or android_url).' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('creators')
      .insert({
        slug,
        display_name: displayName,
        ios_url: iosUrl,
        android_url: androidUrl,
        is_active: isActive,
        notes,
      })
      .select('slug, display_name, ios_url, android_url, is_active, notes, created_at, updated_at')
      .single()

    if (error) {
      const statusCode = error.code === '23505' ? 409 : 500
      return NextResponse.json({ error: error.message }, { status: statusCode })
    }

    return NextResponse.json({ creator: data }, { status: 201 })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}
