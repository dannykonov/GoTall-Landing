'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, Eye, Calendar, Clock, Monitor, Smartphone, Tablet, MousePointerClick, TrendingUp } from 'lucide-react'
import { getAnalytics, getRecentVisits, getPopularPages, getClickAnalytics } from '@/lib/analytics'

interface AnalyticsData {
  date: string
  total_visits: number
  unique_sessions: number
  top_pages: Array<{ page: string; visits: number }>
}

interface Visit {
  id: string
  session_id: string
  page_path: string
  referrer?: string
  device_type: string
  browser: string
  os: string
  country?: string
  city?: string
  created_at: string
}

interface ClickAnalytics {
  total_clicks: number;
  click_breakdown: Record<string, number>;
  platform_breakdown: Record<string, number>;
  ios_clicks: number;
  android_clicks: number;
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [recentVisits, setRecentVisits] = useState<Visit[]>([])
  const [popularPages, setPopularPages] = useState<Array<{ page: string; count: number }>>([])
  const [clickData, setClickData] = useState<ClickAnalytics>({
    total_clicks: 0,
    click_breakdown: {},
    platform_breakdown: {},
    ios_clicks: 0,
    android_clicks: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState(7) // days

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    try {
      console.log('=== LOADING ANALYTICS DATA ===')
      
      const [analyticsData, visitsData, pagesData, clicksData] = await Promise.all([
        getAnalytics(),
        getRecentVisits(50),
        getPopularPages(timeRange),
        getClickAnalytics()
      ])
      
      console.log('Analytics data:', analyticsData)
      console.log('Recent visits data:', visitsData)
      console.log('Popular pages data:', pagesData)
      console.log('Click analytics:', clicksData)
      
      setAnalytics(analyticsData || [])
      setRecentVisits(visitsData || [])
      setPopularPages(pagesData || [])
      setClickData(clicksData || {
        total_clicks: 0,
        click_breakdown: {},
        platform_breakdown: {},
        ios_clicks: 0,
        android_clicks: 0,
      })
      
      console.log('=== DATA SET TO STATE ===')
      console.log('Analytics state:', analyticsData?.length || 0, 'records')
      console.log('Recent visits state:', visitsData?.length || 0, 'records')
      console.log('Popular pages state:', pagesData?.length || 0, 'records')
      console.log('Clicks state:', clicksData)
      
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fix: Properly aggregate analytics data by date to avoid double-counting hourly records
  const dailyAggregates = analytics.reduce((acc, record) => {
    if (!acc[record.date]) {
      acc[record.date] = {
        totalVisits: 0,
        uniqueSessions: 0
      }
    }
    acc[record.date].totalVisits += record.total_visits
    acc[record.date].uniqueSessions = Math.max(acc[record.date].uniqueSessions, record.unique_sessions)
    return acc
  }, {} as Record<string, { totalVisits: number; uniqueSessions: number }>)

  const totalVisits = Object.values(dailyAggregates).reduce((sum, day) => sum + day.totalVisits, 0)
  const totalSessions = Object.values(dailyAggregates).reduce((sum, day) => sum + day.uniqueSessions, 0)
  
  // Calculate unique days for proper average calculation
  const uniqueDays = Object.keys(dailyAggregates).length

  const deviceStats = recentVisits.reduce((acc, visit) => {
    acc[visit.device_type] = (acc[visit.device_type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const browserStats = recentVisits.reduce((acc, visit) => {
    acc[visit.browser] = (acc[visit.browser] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  console.log('=== RENDERING DASHBOARD ===')
  console.log('Total visits:', totalVisits)
  console.log('Total sessions:', totalSessions)
  console.log('Recent visits length:', recentVisits.length)
  console.log('Popular pages length:', popularPages.length)
  console.log('Device stats:', deviceStats)
  console.log('Click data:', clickData)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-circular font-bold">Analytics Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                console.log('🧪 Manual analytics refresh triggered');
                loadAnalyticsData();
              }}
              className="bg-primary-neon text-black px-4 py-2 rounded-lg font-semibold hover:bg-primary-neon/90 transition-colors"
            >
              🔄 Refresh Data
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(Number(e.target.value))}
              className="bg-primary-dark-gray border border-gray-600 rounded-lg px-4 py-2 text-white"
            >
              <option value={1}>Last 24 hours</option>
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Visits</p>
                <p className="text-3xl font-bold text-primary-neon">{totalVisits}</p>
              </div>
              <Eye className="w-8 h-8 text-primary-neon" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Unique Sessions</p>
                <p className="text-3xl font-bold text-white">{totalSessions}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg. Sessions/Day</p>
                <p className="text-3xl font-bold text-white">
                  {uniqueDays ? Math.round(totalSessions / uniqueDays) : 0}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">App Clicks</p>
                <p className="text-3xl font-bold text-orange-400">{clickData.total_clicks}</p>
              </div>
              <MousePointerClick className="w-8 h-8 text-orange-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Platform Clicks</p>
                <p className="text-3xl font-bold text-purple-400">{clickData.ios_clicks + clickData.android_clicks}</p>
                <p className="text-xs text-gray-500 mt-1">
                  iOS: {clickData.ios_clicks} | Android: {clickData.android_clicks}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Visits */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4">Recent Visits</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2 text-sm text-gray-400">Time</th>
                    <th className="p-2 text-sm text-gray-400">Path</th>
                    <th className="p-2 text-sm text-gray-400">Device</th>
                    <th className="p-2 text-sm text-gray-400">Browser</th>
                    <th className="p-2 text-sm text-gray-400">OS</th>
                    <th className="p-2 text-sm text-gray-400">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVisits.slice(0, 10).map(visit => (
                    <tr key={visit.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="p-2 text-sm whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-500" />
                          {new Date(visit.created_at).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="p-2 text-sm">{visit.page_path}</td>
                      <td className="p-2 text-sm">{visit.device_type}</td>
                      <td className="p-2 text-sm">{visit.browser}</td>
                      <td className="p-2 text-sm">{visit.os}</td>
                      <td className="p-2 text-sm">{visit.city || 'Unknown'}, {visit.country || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Popular Pages & Devices */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold mb-4">Popular Pages</h2>
              <ul className="space-y-3">
                {popularPages.map(page => (
                  <li key={page.page} className="flex justify-between items-center text-sm">
                    <span className="truncate">{page.page}</span>
                    <span className="font-bold">{page.count} views</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold mb-4">Click Breakdown</h2>
              <ul className="space-y-3">
                {Object.entries(clickData.click_breakdown).map(([event, count]) => (
                  <li key={event} className="flex justify-between items-center text-sm">
                    <span className="truncate">{event}</span>
                    <span className="font-bold">{count} clicks</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
            >
              <h2 className="text-xl font-bold mb-4">Platform Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🍎</span>
                    </div>
                    <span className="text-white font-medium">iOS (App Store)</span>
                  </div>
                  <span className="text-2xl font-bold text-primary-neon">{clickData.ios_clicks}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🤖</span>
                    </div>
                    <span className="text-white font-medium">Android (Google Play)</span>
                  </div>
                  <span className="text-2xl font-bold text-green-400">{clickData.android_clicks}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Device Types</p>
                </div>
                <div className="flex items-center space-x-2">
                  {Object.keys(deviceStats).map((device) => {
                    const Icon = device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor
                    return (
                      <div key={device} className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-primary-neon" />
                        <span className="text-white capitalize">{device}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 