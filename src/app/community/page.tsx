'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, MessageCircle, ThumbsUp, TrendingUp, Clock, Search, Filter, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import DownloadButtons from '@/components/DownloadButtons'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState('trending')
  const { track } = useAnalytics()

  const posts = [
    {
      id: 1,
      user: 'Alex M.',
      avatar: '🧑‍💻',
      timeAgo: '2h ago',
      title: 'Will I get taller at 17?',
      content: 'My parents are both pretty short (5\'4" and 5\'7"). I\'m currently 5\'6" and just turned 17. Is there still hope for me to grow a few more inches? What should I focus on?',
      likes: 24,
      replies: 8,
      category: 'Questions'
    },
    {
      id: 2,
      user: 'Sarah K.',
      avatar: '👩‍🦰',
      timeAgo: '4h ago',
      title: 'Week 3 Nutrition Update - Feeling Great!',
      content: 'Been following the nutrition plan for 3 weeks now and I\'m already feeling more energetic! 💪 My protein intake has increased by 40% and I\'m hitting my calorie targets consistently.',
      likes: 41,
      replies: 12,
      category: 'Progress'
    },
    {
      id: 3,
      user: 'Mike T.',
      avatar: '👨‍🏫',
      timeAgo: '6h ago',
      title: 'Sleep Tracking Changed Everything',
      content: 'The sleep tracking feature is a game changer. Never realized how much deep sleep matters for growth! Went from 6.5 hours to 8.5 hours consistently.',
      likes: 35,
      replies: 6,
      category: 'Tips'
    },
    {
      id: 4,
      user: 'Emma W.',
      avatar: '👩‍🎓',
      timeAgo: '8h ago',
      title: 'Best Stretching Exercises?',
      content: 'What are the most effective stretching exercises for height? I\'ve been doing the cobra pose and hanging exercises. Any other recommendations?',
      likes: 18,
      replies: 15,
      category: 'Exercise'
    },
    {
      id: 5,
      user: 'David L.',
      avatar: '👨‍💼',
      timeAgo: '12h ago',
      title: 'Growth Spurts at 19 - Is It Possible?',
      content: 'I know growth plates typically close around 18, but I\'ve heard some people can still grow until 21. Has anyone experienced late growth spurts?',
      likes: 52,
      replies: 23,
      category: 'Questions'
    },
    {
      id: 6,
      user: 'Lily Chen',
      avatar: '👩‍⚕️',
      timeAgo: '1d ago',
      title: 'Nutrition Timing for Growth Hormone',
      content: 'Learned that eating protein before bed can help with growth hormone release during sleep. Been trying it for a week - anyone else doing this?',
      likes: 29,
      replies: 9,
      category: 'Nutrition'
    }
  ]

  const stats = [
    { label: 'Community Members', value: '12,450', icon: Users },
    { label: 'Posts This Week', value: '1,247', icon: MessageCircle },
    { label: 'Success Stories', value: '436', icon: TrendingUp }
  ]

  const categories = [
    { name: 'All', key: 'all' },
    { name: 'Trending', key: 'trending' },
    { name: 'Questions', key: 'questions' },
    { name: 'Progress', key: 'progress' },
    { name: 'Tips', key: 'tips' }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-primary-neon/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary-neon" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-circular font-bold text-white mb-6">
              Community
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-gray mb-8 max-w-2xl mx-auto">
              Ask questions. Share progress. Get inspired.
            </p>
            
            <DownloadButtons 
              variant="single" 
              size="lg" 
              trackingPrefix="community_hero"
            />
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700 text-center"
              >
                <stat.icon className="w-8 h-8 text-primary-neon mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary-gray">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Feed */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-3 bg-primary-dark-gray border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-neon transition-colors"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-3 bg-primary-dark-gray border border-gray-600 rounded-lg text-white hover:border-primary-neon transition-colors">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveFilter(category.key)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    activeFilter === category.key
                      ? 'bg-primary-neon text-black'
                      : 'bg-primary-dark-gray text-white hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary-dark-gray rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary-neon/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{post.avatar}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-white">{post.user}</h4>
                      <span className="text-xs bg-primary-neon/20 text-primary-neon px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <div className="flex items-center text-primary-gray text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.timeAgo}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-3">{post.title}</h3>
                    <p className="text-primary-gray mb-4">{post.content}</p>
                    
                    <div className="flex items-center space-x-6 text-primary-gray">
                      <button className="flex items-center space-x-2 hover:text-primary-neon transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-primary-neon transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.replies}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join CTA */}
          <div className="mt-12 text-center">
            <p className="text-primary-gray mb-4">Want to join the conversation?</p>
            <DownloadButtons 
              variant="dual" 
              size="md" 
              trackingPrefix="community_bottom"
            />
          </div>
        </div>
      </section>
    </div>
  )
} 