'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Users, Eye, Calendar, Clock, Monitor, Smartphone, Tablet, UserPlus, TrendingUp } from 'lucide-react'
import { getAnalytics, getRecentVisits, getPopularPages, getWaitlistAnalytics, getRecentSignups } from '@/lib/analytics'

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

interface WaitlistAnalytics {
  total_signups: number
  signups_today: number
  signups_yesterday: number
  signups_this_week: number
  signups_this_month: number
  daily_breakdown: { date: string; signups: number }[]
}

interface Signup {
  id: string
  name: string
  email: string
  created_at: string
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [recentVisits, setRecentVisits] = useState<Visit[]>([])
  const [popularPages, setPopularPages] = useState<Array<{ page: string; count: number }>>([])
  const [waitlistData, setWaitlistData] = useState<WaitlistAnalytics>({
    total_signups: 0,
    signups_today: 0,
    signups_yesterday: 0,
    signups_this_week: 0,
    signups_this_month: 0,
    daily_breakdown: []
  })
  const [recentSignups, setRecentSignups] = useState<Signup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState(7) // days

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    try {
      console.log('=== LOADING ANALYTICS DATA ===')
      
      const [analyticsData, visitsData, pagesData, waitlistAnalytics, signupsData] = await Promise.all([
        getAnalytics(),
        getRecentVisits(50),
        getPopularPages(timeRange),
        getWaitlistAnalytics(),
        getRecentSignups(15)
      ])
      
      console.log('Analytics data:', analyticsData)
      console.log('Recent visits data:', visitsData)
      console.log('Popular pages data:', pagesData)
      console.log('Waitlist analytics:', waitlistAnalytics)
      console.log('Recent signups:', signupsData)
      
      setAnalytics(analyticsData || [])
      setRecentVisits(visitsData || [])
      setPopularPages(pagesData || [])
      setWaitlistData(waitlistAnalytics || {
        total_signups: 0,
        signups_today: 0,
        signups_yesterday: 0,
        signups_this_week: 0,
        signups_this_month: 0,
        daily_breakdown: []
      })
      setRecentSignups(signupsData || [])
      
      console.log('=== DATA SET TO STATE ===')
      console.log('Analytics state:', analyticsData?.length || 0, 'records')
      console.log('Recent visits state:', visitsData?.length || 0, 'records')
      console.log('Popular pages state:', pagesData?.length || 0, 'records')
      console.log('Waitlist state:', waitlistAnalytics)
      
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
  console.log('Waitlist data:', waitlistData)

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
                <p className="text-gray-400 text-sm">Total Signups</p>
                <p className="text-3xl font-bold text-orange-400">{waitlistData.total_signups}</p>
              </div>
              <UserPlus className="w-8 h-8 text-orange-400" />
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
                <p className="text-gray-400 text-sm">Signups Today</p>
                <p className="text-3xl font-bold text-emerald-400">{waitlistData.signups_today}</p>
                <p className="text-xs text-gray-500">Yesterday: {waitlistData.signups_yesterday}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
          </motion.div>
        </div>

        {/* Waitlist Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">This Week</h2>
              <Calendar className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-2xl font-bold text-indigo-400">{waitlistData.signups_this_week}</p>
            <p className="text-sm text-gray-400">signups this week</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">This Month</h2>
              <Calendar className="w-6 h-6 text-pink-400" />
            </div>
            <p className="text-2xl font-bold text-pink-400">{waitlistData.signups_this_month}</p>
            <p className="text-sm text-gray-400">signups this month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Signups</h2>
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-cyan-400">{recentSignups.length}</p>
            <p className="text-sm text-gray-400">in the last 15 signups</p>
          </motion.div>
        </div>

        {/* Popular Pages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4">Popular Pages</h2>
            <div className="space-y-3">
              {popularPages.length > 0 ? (
                popularPages.slice(0, 5).map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-primary-neon font-bold">{index + 1}</span>
                      <span className="text-white">{page.page}</span>
                    </div>
                    <span className="text-gray-400">{page.count} visits</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No page data available</p>
              )}
            </div>
          </motion.div>

          {/* Device Types */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4">Device Types</h2>
            <div className="space-y-3">
              {Object.keys(deviceStats).length > 0 ? (
                Object.entries(deviceStats).map(([device, count]) => {
                  const Icon = device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor
                  const percentage = recentVisits.length ? Math.round((count / recentVisits.length) * 100) : 0
                  
                  return (
                    <div key={device} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-primary-neon" />
                        <span className="text-white capitalize">{device}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">{count}</span>
                        <span className="text-primary-neon text-sm">({percentage}%)</span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-gray-400">No device data available</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Visits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4">Recent Visits</h2>
            <div className="overflow-x-auto">
              {recentVisits.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="pb-3 text-gray-400">Time</th>
                      <th className="pb-3 text-gray-400">Page</th>
                      <th className="pb-3 text-gray-400">Device</th>
                      <th className="pb-3 text-gray-400">Browser</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentVisits.slice(0, 10).map((visit) => (
                      <tr key={visit.id} className="border-b border-gray-700">
                        <td className="py-3 text-gray-300 text-xs">
                          {new Date(visit.created_at).toLocaleString()}
                        </td>
                        <td className="py-3 text-white">{visit.page_path}</td>
                        <td className="py-3 text-gray-300 capitalize">{visit.device_type}</td>
                        <td className="py-3 text-gray-300">{visit.browser}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400">No recent visits data available</p>
              )}
            </div>
          </motion.div>

          {/* Recent Signups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4">Recent Waitlist Signups</h2>
            <div className="overflow-x-auto">
              {recentSignups.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="pb-3 text-gray-400">Name</th>
                      <th className="pb-3 text-gray-400">Email</th>
                      <th className="pb-3 text-gray-400">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSignups.slice(0, 10).map((signup) => (
                      <tr key={signup.id} className="border-b border-gray-700">
                        <td className="py-3 text-white font-medium">{signup.name}</td>
                        <td className="py-3 text-gray-300 truncate max-w-xs">{signup.email}</td>
                        <td className="py-3 text-gray-300 text-xs">
                          {new Date(signup.created_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400">No recent signups available</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 