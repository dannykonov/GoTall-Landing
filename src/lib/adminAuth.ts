import { NextRequest, NextResponse } from 'next/server'
import { getServerSupabaseServiceClient } from './supabaseServer'

export class ApiAuthError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

const getBearerToken = (request: NextRequest): string => {
  const header = request.headers.get('authorization') || request.headers.get('Authorization')
  if (!header) {
    throw new ApiAuthError(401, 'Missing Authorization header')
  }

  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) {
    throw new ApiAuthError(401, 'Invalid Authorization header format')
  }

  return token
}

export interface AdminUserContext {
  id: string
  email: string | null
}

export const requireAdminUser = async (request: NextRequest): Promise<AdminUserContext> => {
  const accessToken = getBearerToken(request)
  const supabase = getServerSupabaseServiceClient()

  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken)
  if (userError || !userData.user) {
    throw new ApiAuthError(401, 'Invalid or expired session')
  }

  const { data: adminRow, error: adminError } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', userData.user.id)
    .maybeSingle()

  if (adminError) {
    throw new ApiAuthError(500, `Failed to check admin access: ${adminError.message}`)
  }

  if (!adminRow) {
    throw new ApiAuthError(403, 'Admin access required')
  }

  return {
    id: userData.user.id,
    email: userData.user.email ?? null,
  }
}

export const toApiErrorResponse = (
  error: unknown,
  fallbackMessage: string = 'Unexpected server error'
) => {
  if (error instanceof ApiAuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message || fallbackMessage }, { status: 500 })
  }

  return NextResponse.json({ error: fallbackMessage }, { status: 500 })
}
