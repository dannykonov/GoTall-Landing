'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { isCurrentUserAdmin } from '@/lib/adminClient'
import { supabase } from '@/lib/supabase'

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextFromQuery = searchParams.get('next')
  const nextPath = nextFromQuery && nextFromQuery.startsWith('/admin') ? nextFromQuery : '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)
  const [isMagicLinkSubmitting, setIsMagicLinkSubmitting] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [infoMessage, setInfoMessage] = useState<string | null>(null)

  useEffect(() => {
    const checkExistingSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        setCheckingSession(false)
        return
      }

      const admin = await isCurrentUserAdmin()
      if (admin) {
        router.replace(nextPath)
        return
      }

      await supabase.auth.signOut()
      setErrorMessage('This account is not in admin_users yet. Ask an admin to grant access.')
      setCheckingSession(false)
    }

    void checkExistingSession()
  }, [nextPath, router])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setInfoMessage(null)
    setIsPasswordSubmitting(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setIsPasswordSubmitting(false)
      return
    }

    const isAdmin = await isCurrentUserAdmin()
    if (!isAdmin) {
      await supabase.auth.signOut()
      setErrorMessage('This account is not in admin_users yet. Ask an admin to grant access.')
      setIsPasswordSubmitting(false)
      return
    }

    router.replace(nextPath)
  }

  const handleMagicLinkLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail) {
      setErrorMessage('Enter your email first.')
      return
    }

    setErrorMessage(null)
    setInfoMessage(null)
    setIsMagicLinkSubmitting(true)

    const safeNextPath = nextPath.startsWith('/admin') ? nextPath : '/admin'
    const redirectTo = `${window.location.origin}${safeNextPath}`

    const { error } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        emailRedirectTo: redirectTo,
        shouldCreateUser: false,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsMagicLinkSubmitting(false)
      return
    }

    setInfoMessage('Magic link sent. Open your email and click the link to sign in.')
    setIsMagicLinkSubmitting(false)
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-primary-gray">Checking session...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-primary-dark-gray border border-gray-700 rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-primary-gray text-sm mb-6">
          Sign in with your Supabase auth account to access attribution analytics. Passwordless magic link is
          supported.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-primary-gray mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-primary-neon"
            />
          </div>

          <button
            type="button"
            onClick={handleMagicLinkLogin}
            disabled={isMagicLinkSubmitting}
            className="w-full bg-brand-gradient text-black py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isMagicLinkSubmitting ? 'Sending magic link...' : 'Send Magic Link (No Password)'}
          </button>

          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-primary-dark-gray px-2 text-primary-gray">or sign in with password</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-primary-gray mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-primary-neon"
            />
          </div>

          {infoMessage ? <p className="text-sm text-green-400">{infoMessage}</p> : null}
          {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}

          <button
            type="submit"
            disabled={isPasswordSubmitting}
            className="w-full bg-brand-gradient text-black py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isPasswordSubmitting ? 'Signing in...' : 'Sign in with Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
