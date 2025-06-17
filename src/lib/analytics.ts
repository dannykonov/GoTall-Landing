import { supabase } from './supabase'

// Generate a session ID that persists for the browser session
const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server'
  
  let sessionId = sessionStorage.getItem('gotall_session_id')
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem('gotall_session_id', sessionId)
  }
  return sessionId
}

// Detect device type based on screen width and user agent
const getDeviceType = (): string => {
  if (typeof window === 'undefined') return 'unknown'
  
  const width = window.innerWidth
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (width <= 768 || /mobile|android|iphone|ipad|phone/i.test(userAgent)) {
    return 'mobile'
  } else if (width <= 1024 || /tablet|ipad/i.test(userAgent)) {
    return 'tablet'
  } else {
    return 'desktop'
  }
}

// Extract browser name from user agent
const getBrowser = (): string => {
  if (typeof window === 'undefined') return 'unknown'
  
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (userAgent.includes('chrome') && !userAgent.includes('edg')) return 'Chrome'
  if (userAgent.includes('firefox')) return 'Firefox'
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) return 'Safari'
  if (userAgent.includes('edg')) return 'Edge'
  if (userAgent.includes('opera')) return 'Opera'
  
  return 'Other'
}

// Extract OS name from user agent
const getOS = (): string => {
  if (typeof window === 'undefined') return 'unknown'
  
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (userAgent.includes('windows')) return 'Windows'
  if (userAgent.includes('macintosh') || userAgent.includes('mac os')) return 'macOS'
  if (userAgent.includes('linux')) return 'Linux'
  if (userAgent.includes('android')) return 'Android'
  if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'iOS'
  
  return 'Other'
}

// Get location data (you might want to use a geolocation service)
const getLocationData = async (): Promise<{ country?: string; city?: string }> => {
  try {
    // You can replace this with a more sophisticated geolocation service
    // For now, we'll leave it empty and you can integrate with services like:
    // - ipapi.co
    // - ipgeolocation.io
    // - MaxMind GeoIP2
    return {}
  } catch (error) {
    console.warn('Failed to get location data:', error)
    return {}
  }
}

// Main function to track a page visit
export const trackPageVisit = async (customPath?: string): Promise<void> => {
  try {
    if (typeof window === 'undefined') return // Skip during SSR
    
    const sessionId = getSessionId()
    const pagePath = customPath || window.location.pathname
    const referrer = document.referrer || null
    const userAgent = navigator.userAgent
    const deviceType = getDeviceType()
    const browser = getBrowser()
    const os = getOS()
    const location = await getLocationData()
    
    const visitData = {
      session_id: sessionId,
      page_path: pagePath,
      referrer,
      user_agent: userAgent,
      country: location.country || null,
      city: location.city || null,
      device_type: deviceType,
      browser,
      os,
      created_at: new Date().toISOString(),
    }
    
    // Insert visit data into Supabase
    const { error } = await supabase
      .from('visits')
      .insert([visitData])
    
    if (error) {
      // Only log if it's not a permission error we can ignore
      if (error.code !== '42501') {
        console.warn('Analytics tracking error:', error)
      }
    } else {
      console.log('Visit tracked:', pagePath)
    }
  } catch (error) {
    console.warn('Failed to track visit:', error)
  }
}

// Track custom events (for button clicks, form submissions, etc.)
export const trackEvent = async (eventName: string, eventData?: Record<string, any>): Promise<void> => {
  try {
    if (typeof window === 'undefined') return
    
    const sessionId = getSessionId()
    const pagePath = window.location.pathname
    
    // For custom events, we'll store them in the same visits table with a special format
    const visitData = {
      session_id: sessionId,
      page_path: `${pagePath}#event:${eventName}`,
      referrer: eventData ? JSON.stringify(eventData) : null,
      user_agent: navigator.userAgent,
      device_type: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      created_at: new Date().toISOString(),
    }
    
    const { error } = await supabase
      .from('visits')
      .insert([visitData])
    
    if (error) {
      // Only log if it's not a permission error we can ignore
      if (error.code !== '42501') {
        console.warn('Event tracking error:', error)
      }
    } else {
      console.log('Event tracked:', eventName)
    }
  } catch (error) {
    console.warn('Failed to track event:', error)
  }
}

// Get analytics data (improved with real-time processing)
export const getAnalytics = async (startDate?: string, endDate?: string) => {
  try {
    console.log('Fetching analytics data...')
    
    // Calculate date range
    const end = endDate || new Date().toISOString().split('T')[0]
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    console.log(`Date range: ${start} to ${end}`)
    
    // Try to get aggregated data first
    try {
      const { data: aggregatedData, error: aggError } = await supabase
        .from('visit_analytics')
        .select('*')
        .gte('date', start)
        .lte('date', end)
        .is('hour', null)
        .order('date', { ascending: false })
      
      if (!aggError && aggregatedData && aggregatedData.length > 0) {
        console.log('Using aggregated data:', aggregatedData.length, 'records')
        return aggregatedData.map(row => ({
          date: row.date,
          total_visits: row.total_visits,
          unique_sessions: row.unique_sessions,
          top_pages: []
        }))
      }
    } catch (aggError) {
      console.warn('Aggregated data not available, using raw data')
    }
    
    // Fallback to raw data processing
    const { data: visitsData, error: visitsError } = await supabase
      .from('visits')
      .select('*')
      .gte('created_at', start + 'T00:00:00.000Z')
      .lte('created_at', end + 'T23:59:59.999Z')
      .not('page_path', 'like', '%#event:%')
    
    if (visitsError) {
      console.error('Failed to fetch visits:', visitsError)
      return []
    }
    
    console.log(`Found ${visitsData?.length || 0} visits`)
    
    // Process data manually
    const dailyStats: Record<string, { visits: number; sessions: Set<string>; pages: Record<string, number> }> = {}
    
    visitsData?.forEach(visit => {
      const date = visit.created_at.split('T')[0]
      if (!dailyStats[date]) {
        dailyStats[date] = { visits: 0, sessions: new Set(), pages: {} }
      }
      dailyStats[date].visits++
      dailyStats[date].sessions.add(visit.session_id)
      dailyStats[date].pages[visit.page_path] = (dailyStats[date].pages[visit.page_path] || 0) + 1
    })
    
    // Convert to expected format
    const result = Object.entries(dailyStats).map(([date, stats]) => ({
      date,
      total_visits: stats.visits,
      unique_sessions: stats.sessions.size,
      top_pages: Object.entries(stats.pages)
        .map(([page, visits]) => ({ page, visits }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 5)
    })).sort((a, b) => b.date.localeCompare(a.date))
    
    console.log('Analytics result:', result)
    return result
    
  } catch (error) {
    console.error('Failed to get analytics:', error)
    return []
  }
}

// Get real-time visit data
export const getRecentVisits = async (limit: number = 100) => {
  try {
    console.log('Fetching recent visits...')
    
    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Failed to get recent visits:', error)
      return []
    }
    
    console.log('Recent visits:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Failed to get recent visits:', error)
    return []
  }
}

// Get popular pages
export const getPopularPages = async (days: number = 7) => {
  try {
    console.log('Fetching popular pages...')
    
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
    
    const { data, error } = await supabase
      .from('visits')
      .select('page_path')
      .gte('created_at', startDate)
      .not('page_path', 'like', '%#event:%') // Exclude custom events
    
    if (error) {
      console.error('Failed to get popular pages:', error)
      return []
    }
    
    // Count visits per page
    const pageCounts: Record<string, number> = {}
    data?.forEach(visit => {
      pageCounts[visit.page_path] = (pageCounts[visit.page_path] || 0) + 1
    })
    
    // Convert to sorted array
    const result = Object.entries(pageCounts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
    
    console.log('Popular pages:', result)
    return result
  } catch (error) {
    console.error('Failed to get popular pages:', error)
    return []
  }
}

// Get waitlist analytics
export const getWaitlistAnalytics = async () => {
  try {
    console.log('Fetching waitlist analytics...')
    
    // Try to use the RPC function first
    try {
      const { data: summaryData, error: summaryError } = await supabase
        .rpc('get_waitlist_summary')
      
      if (!summaryError && summaryData && summaryData.length > 0) {
        console.log('Waitlist summary from RPC:', summaryData[0])
        return summaryData[0]
      } else {
        console.warn('RPC function failed:', summaryError)
      }
    } catch (rpcError) {
      console.warn('RPC function not available:', rpcError)
    }
    
    // Fallback to direct queries with better error handling
    console.log('Using direct queries as fallback...')
    
    try {
      // Get current date in proper format
      const now = new Date()
      const today = now.toISOString().split('T')[0]
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      
      console.log('Query dates:', { today, yesterday })
      
      // Test basic connection first
      const { data: testData, error: testError } = await supabase
        .from('waitlist')
        .select('id')
        .limit(1)
      
      if (testError) {
        console.error('Waitlist table access test failed:', testError)
        throw testError
      }
      
      console.log('Waitlist table accessible, test data:', testData)
      
      // Get all counts in parallel with detailed logging
      const queries = await Promise.allSettled([
        supabase.from('waitlist').select('*', { count: 'exact', head: true }),
        supabase.from('waitlist').select('*', { count: 'exact', head: true })
          .gte('created_at', today + 'T00:00:00.000Z')
          .lt('created_at', today + 'T23:59:59.999Z'),
        supabase.from('waitlist').select('*', { count: 'exact', head: true })
          .gte('created_at', yesterday + 'T00:00:00.000Z')
          .lt('created_at', yesterday + 'T23:59:59.999Z'),
        supabase.from('waitlist').select('*', { count: 'exact', head: true })
          .gte('created_at', now.getFullYear() + '-W' + String(Math.ceil(now.getDate() / 7)).padStart(2, '0') + '-1T00:00:00.000Z'),
        supabase.from('waitlist').select('*', { count: 'exact', head: true })
          .gte('created_at', now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-01T00:00:00.000Z')
      ])
      
      console.log('Query results:', queries)
      
      const totalResult = queries[0].status === 'fulfilled' ? queries[0].value : { count: 0, error: queries[0].reason }
      const todayResult = queries[1].status === 'fulfilled' ? queries[1].value : { count: 0, error: queries[1].reason }
      const yesterdayResult = queries[2].status === 'fulfilled' ? queries[2].value : { count: 0, error: queries[2].reason }
      const weekResult = queries[3].status === 'fulfilled' ? queries[3].value : { count: 0, error: queries[3].reason }
      const monthResult = queries[4].status === 'fulfilled' ? queries[4].value : { count: 0, error: queries[4].reason }
      
      console.log('Processed results:', {
        total: totalResult.count,
        today: todayResult.count,
        yesterday: yesterdayResult.count,
        week: weekResult.count,
        month: monthResult.count
      })
      
      const result = {
        total_signups: totalResult.count || 0,
        signups_today: todayResult.count || 0,
        signups_yesterday: yesterdayResult.count || 0,
        signups_this_week: weekResult.count || 0,
        signups_this_month: monthResult.count || 0,
        daily_breakdown: []
      }
      
      console.log('Final waitlist analytics result:', result)
      return result
      
    } catch (directError) {
      console.error('Direct queries failed:', directError)
      
      // Last resort: try to get just the basic count
      try {
        const { count } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })
        
        console.log('Basic count query result:', count)
        
        return {
          total_signups: count || 0,
          signups_today: 0,
          signups_yesterday: 0,
          signups_this_week: 0,
          signups_this_month: 0,
          daily_breakdown: []
        }
      } catch (basicError) {
        console.error('Even basic count failed:', basicError)
        throw basicError
      }
    }
    
  } catch (error) {
    console.error('Failed to get waitlist analytics:', error)
    return {
      total_signups: 0,
      signups_today: 0,
      signups_yesterday: 0,
      signups_this_week: 0,
      signups_this_month: 0,
      daily_breakdown: []
    }
  }
}

// Get recent waitlist signups
export const getRecentSignups = async (limit: number = 20) => {
  try {
    console.log('Fetching recent signups...')
    
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Failed to get recent signups:', error)
      return []
    }
    
    console.log('Recent signups:', data?.length || 0)
    return data || []
  } catch (error) {
    console.error('Failed to get recent signups:', error)
    return []
  }
} 