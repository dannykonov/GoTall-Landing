import { NextRequest, NextResponse } from 'next/server'
import { ApiAuthError, requireAdminUser, toApiErrorResponse } from '@/lib/adminAuth'
import { getServerSupabaseServiceClient } from '@/lib/supabaseServer'

const CREATOR_SLUG_REGEX = /^[a-z0-9][a-z0-9_-]{0,63}$/

const normalizeSlug = (value: string): string | null => {
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

interface RouteParams {
  params: Promise<{
    slug: string
  }>
}

const getCreatorSlugFromParams = async (paramsPromise: RouteParams['params']) => {
  const params = await paramsPromise
  const slug = normalizeSlug(params.slug)
  if (!slug) {
    throw new ApiAuthError(400, 'Invalid creator slug')
  }
  return slug
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminUser(request)
    const slug = await getCreatorSlugFromParams(params)
    const supabase = getServerSupabaseServiceClient()

    const { data, error } = await supabase
      .from('creators')
      .select('slug, display_name, ios_url, android_url, is_active, notes, created_at, updated_at')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    return NextResponse.json({ creator: data })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminUser(request)
    const slug = await getCreatorSlugFromParams(params)
    const supabase = getServerSupabaseServiceClient()
    const payload = (await request.json()) as Record<string, unknown>

    const updatePayload: Record<string, unknown> = {}

    if ('display_name' in payload) {
      const displayName = normalizeText(payload.display_name)
      if (!displayName) {
        return NextResponse.json({ error: 'display_name must be a non-empty string' }, { status: 400 })
      }
      updatePayload.display_name = displayName
    }

    if ('ios_url' in payload) {
      const iosUrl = payload.ios_url === null ? null : normalizeHttpsUrl(payload.ios_url)
      if (payload.ios_url !== null && !iosUrl) {
        return NextResponse.json({ error: 'ios_url must be a valid https URL' }, { status: 400 })
      }
      updatePayload.ios_url = iosUrl
    }

    if ('android_url' in payload) {
      const androidUrl = payload.android_url === null ? null : normalizeHttpsUrl(payload.android_url)
      if (payload.android_url !== null && !androidUrl) {
        return NextResponse.json({ error: 'android_url must be a valid https URL' }, { status: 400 })
      }
      updatePayload.android_url = androidUrl
    }

    if ('is_active' in payload) {
      if (typeof payload.is_active !== 'boolean') {
        return NextResponse.json({ error: 'is_active must be a boolean' }, { status: 400 })
      }
      updatePayload.is_active = payload.is_active
    }

    if ('notes' in payload) {
      updatePayload.notes = payload.notes === null ? null : normalizeText(payload.notes)
    }

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ error: 'No valid fields provided to update' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('creators')
      .update(updatePayload)
      .eq('slug', slug)
      .select('slug, display_name, ios_url, android_url, is_active, notes, created_at, updated_at')
      .single()

    if (error) {
      const statusCode = error.code === 'PGRST116' ? 404 : 500
      return NextResponse.json({ error: error.message }, { status: statusCode })
    }

    return NextResponse.json({ creator: data })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminUser(request)
    const slug = await getCreatorSlugFromParams(params)
    const supabase = getServerSupabaseServiceClient()

    const { error } = await supabase.from('creators').delete().eq('slug', slug)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return toApiErrorResponse(error)
  }
}
