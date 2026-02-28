import { NextRequest, NextResponse } from 'next/server'
import { getServerSupabaseAnonClient } from '@/lib/supabaseServer'

const CREATOR_SLUG_REGEX = /^[a-z0-9][a-z0-9_-]{0,63}$/

const normalizeCreatorSlug = (value: string | null): string | null => {
  if (!value) return null
  const normalized = value.trim().toLowerCase()
  return CREATOR_SLUG_REGEX.test(normalized) ? normalized : null
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getServerSupabaseAnonClient()
    const slug = normalizeCreatorSlug(request.nextUrl.searchParams.get('slug'))

    if (slug) {
      const { data, error } = await supabase
        .from('creators')
        .select('slug, display_name, ios_url, android_url, is_active')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      if (!data) {
        return NextResponse.json({ creator: null }, { status: 404 })
      }

      return NextResponse.json({ creator: data })
    }

    const { data, error } = await supabase
      .from('creators')
      .select('slug, display_name, ios_url, android_url')
      .eq('is_active', true)
      .order('slug', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ creators: data ?? [] })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unexpected server error' },
      { status: 500 }
    )
  }
}
