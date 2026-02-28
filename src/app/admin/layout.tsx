'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { isCurrentUserAdmin } from '@/lib/adminClient'
import { supabase } from '@/lib/supabase'

type GuardState = 'loading' | 'allowed' | 'denied'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [guardState, setGuardState] = useState<GuardState>('loading')
  const [signingOut, setSigningOut] = useState(false)

  const isLoginRoute = pathname === '/admin/login'

  useEffect(() => {
    const checkAccess = async () => {
      if (isLoginRoute) {
        setGuardState('allowed')
        return
      }

      const admin = await isCurrentUserAdmin()
      if (!admin) {
        setGuardState('denied')
        router.replace(`/admin/login?next=${encodeURIComponent(pathname || '/admin')}`)
        return
      }

      setGuardState('allowed')
    }

    void checkAccess()
  }, [isLoginRoute, pathname, router])

  const handleSignOut = async () => {
    setSigningOut(true)
    await supabase.auth.signOut()
    setSigningOut(false)
    router.replace('/admin/login')
  }

  const activePathClass = useMemo(() => {
    return {
      dashboard: pathname === '/admin' ? 'text-primary-neon' : 'text-primary-gray',
      creators: pathname === '/admin/creators' ? 'text-primary-neon' : 'text-primary-gray',
    }
  }, [pathname])

  if (guardState === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-primary-gray">Loading admin...</p>
      </div>
    )
  }

  if (isLoginRoute) {
    return <>{children}</>
  }

  if (guardState === 'denied') {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-gray-800 px-4 sm:px-6 lg:px-12 py-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-primary-gray">GoTall</p>
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/admin" className={`text-sm font-medium ${activePathClass.dashboard}`}>
              Attribution
            </Link>
            <Link href="/admin/creators" className={`text-sm font-medium ${activePathClass.creators}`}>
              Creators
            </Link>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="px-3 py-2 rounded-lg border border-gray-700 text-sm text-primary-gray hover:text-white hover:border-gray-500 transition-colors disabled:opacity-50"
            >
              {signingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
