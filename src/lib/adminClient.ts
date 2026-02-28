'use client'

import { supabase } from '@/lib/supabase'

export const getAccessToken = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getSession()
  if (error) return null
  return data.session?.access_token ?? null
}

export const isCurrentUserAdmin = async (): Promise<boolean> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
  if (sessionError || !sessionData.session?.user) return false

  const { data, error } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', sessionData.session.user.id)
    .maybeSingle()

  if (error) return false
  return Boolean(data)
}

export const adminFetch = async (input: string, init?: RequestInit): Promise<Response> => {
  const token = await getAccessToken()
  if (!token) {
    throw new Error('You must be signed in to continue')
  }

  const headers = new Headers(init?.headers)
  headers.set('Authorization', `Bearer ${token}`)

  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  return fetch(input, {
    ...init,
    headers,
  })
}
