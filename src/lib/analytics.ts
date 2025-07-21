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

    // Check if this is a platform-specific click event
    if (eventName.includes('_ios_clicked') || eventName.includes('_android_clicked')) {
      const platform = eventName.includes('_ios_clicked') ? 'ios' : 'android'
      const sessionId = getSessionId()
      
      const { error } = await supabase
        .from('app_clicks')
        .insert([{
          event_name: eventName,
          platform: platform,
          metadata: {
            ...eventData,
            session_id: sessionId,
            device_type: getDeviceType(),
            browser: getBrowser(),
            os: getOS()
          }
        }])
      
      if (error) {
        if (error.code !== '42501') { 
          console.warn('Platform click tracking error:', error)
        }
      } else {
        console.log('Platform click tracked:', eventName, platform)
      }
    } else {
      // Fallback to original app_clicks table for non-platform events
      const { error } = await supabase
        .from('app_clicks')
        .insert([{
          event_name: eventName,
          metadata: eventData || null
        }])
      
      if (error) {
        if (error.code !== '42501') { 
          console.warn('Event tracking error:', error)
        }
      } else {
        console.log('Event tracked:', eventName)
      }
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
    
    // Skip visit_analytics table and always use raw data for accuracy
    console.log('Using raw visits data for accurate calculations')
    
    // Fetch raw data processing
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

export const getClickAnalytics = async () => {
  try {
    console.log('🔍 Starting getClickAnalytics...')
    
    // Fetch ALL click data by using pagination
    let allClicks: any[] = [];
    let page = 0;
    const pageSize = 1000; // Supabase's max per page
    let hasMore = true;

    while (hasMore) {
      console.log(`📄 Fetching page ${page + 1} (offset: ${page * pageSize})...`);
      
      const { data: pageData, error } = await supabase
        .from('app_clicks')
        .select('event_name, platform, created_at')
        .range(page * pageSize, (page + 1) * pageSize - 1)
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`❌ Supabase error on page ${page + 1}:`, error);
        break;
      }

      if (!pageData || pageData.length === 0) {
        console.log(`📄 No more data on page ${page + 1}, stopping pagination`);
        hasMore = false;
        break;
      }

      console.log(`📄 Page ${page + 1}: Got ${pageData.length} records`);
      allClicks.push(...pageData);

      // If we got less than pageSize, we've reached the end
      if (pageData.length < pageSize) {
        console.log(`📄 Last page reached (got ${pageData.length} < ${pageSize})`);
        hasMore = false;
      }

      page++;
      
      // Safety break to prevent infinite loops
      if (page > 10) {
        console.warn('⚠️ Stopping pagination after 10 pages for safety');
        break;
      }
    }

    console.log(`📊 Total records fetched: ${allClicks.length}`);

    if (allClicks.length === 0) {
      console.log('ℹ️ No clicks data found in app_clicks table')
      return { total_clicks: 0, click_breakdown: {}, platform_breakdown: {}, ios_clicks: 0, android_clicks: 0 };
    }

    console.log(`✅ Found ${allClicks.length} total clicks in app_clicks table`)

    const total_clicks = allClicks.length;

    // Process event breakdown
    const click_breakdown = allClicks.reduce((acc, curr) => {
      acc[curr.event_name || 'unknown'] = (acc[curr.event_name || 'unknown'] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Process platform breakdown
    const platform_breakdown = allClicks.reduce((acc, curr) => {
      if (curr.platform) {
        acc[curr.platform] = (acc[curr.platform] || 0) + 1;
      } else {
        // If no platform specified, try to infer from event name
        if (curr.event_name?.includes('_ios_') || curr.event_name?.includes('ios')) {
          acc['ios'] = (acc['ios'] || 0) + 1;
        } else if (curr.event_name?.includes('_android_') || curr.event_name?.includes('android')) {
          acc['android'] = (acc['android'] || 0) + 1;
        } else {
          acc['unknown'] = (acc['unknown'] || 0) + 1;
        }
      }
      return acc;
    }, {} as Record<string, number>);

    const ios_clicks = platform_breakdown['ios'] || 0;
    const android_clicks = platform_breakdown['android'] || 0;

    const result = {
      total_clicks,
      click_breakdown,
      platform_breakdown,
      ios_clicks,
      android_clicks,
    };

    console.log('📈 Final click analytics result:', result);
    console.log(`📊 Platform summary: iOS=${ios_clicks}, Android=${android_clicks}, Total=${total_clicks}`);
    return result;
  } catch (error) {
    console.error('💥 Failed to get click analytics:', error);
    return {
      total_clicks: 0,
      click_breakdown: {},
      platform_breakdown: {},
      ios_clicks: 0,
      android_clicks: 0,
    };
  }
}; 