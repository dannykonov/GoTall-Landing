import { createClient } from '@supabase/supabase-js'

const getEnv = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

const createServerClient = (key: string) => {
  return createClient(getEnv('NEXT_PUBLIC_SUPABASE_URL'), key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export const getServerSupabaseAnonClient = () => {
  return createServerClient(getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'))
}

export const getServerSupabaseServiceClient = () => {
  return createServerClient(getEnv('SUPABASE_SERVICE_ROLE_KEY'))
}
