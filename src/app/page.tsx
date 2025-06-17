'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Apple, 
  Moon, 
  Dumbbell, 
  Users, 
  BarChart3,
  ArrowRight,
  Star,
  MessageCircle,
  ThumbsUp
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import WaitlistModal from '@/components/WaitlistModal'
import Link from 'next/link'

export default function HomePage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const features = [
    {
      icon: TrendingUp,
      title: 'Growth Estimator',
      description: 'Get personalized growth projections based on your genetics, age, and current height',
      href: '/progress'
    },
    {
      icon: Apple,
      title: 'Nutrition Tracker',
      description: 'Track calories, protein, and nutrients essential for optimal growth',
      href: '/nutrition'
    },
    {
      icon: Moon,
      title: 'Sleep Tracker',
      description: 'Monitor sleep quality when your growth hormone peaks',
      href: '/sleep'
    },
    {
      icon: Dumbbell,
      title: 'Exercise Plans',
      description: 'Height-focused exercises and stretching routines',
      href: '/exercise'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with others on their growth journey',
      href: '/community'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Visualize your growth journey with detailed charts',
      href: '/progress'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Enter Your Data',
      description: 'Input your parents\' height, current height, age, and ethnicity for accurate projections'
    },
    {
      number: '02',
      title: 'Get Your Goal',
      description: 'Receive a personalized growth target (e.g., 2 inches in 6 months) based on your profile'
    },
    {
      number: '03',
      title: 'Follow Your Plan',
      description: 'Complete daily nutrition, sleep, and exercise tasks optimized for growth'
    },
    {
      number: '04',
      title: 'Track Progress',
      description: 'Monitor your weekly progress and adjust your routine for maximum results'
    }
  ]

  const communityPosts = [
    {
      user: 'Alex M.',
      avatar: '🧑‍💻',
      content: 'Will I get taller if I\'m 17? My parents are both pretty short...',
      likes: 24,
      replies: 8,
      timeAgo: '2h ago'
    },
    {
      user: 'Sarah K.',
      avatar: '👩‍🦰',
      content: 'Been following the nutrition plan for 3 weeks and already feeling more energetic! 💪',
      likes: 41,
      replies: 12,
      timeAgo: '5h ago'
    },
    {
      user: 'Mike T.',
      avatar: '👨‍🏫',
      content: 'The sleep tracking feature is a game changer. Never realized how much deep sleep matters for growth!',
      likes: 35,
      replies: 6,
      timeAgo: '1d ago'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navigation onWaitlistClick={() => setIsWaitlistOpen(true)} />
      
      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center bg-primary-neon/10 border border-primary-neon/20 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-primary-neon mr-2" />
              <span className="text-primary-neon text-sm font-medium">Now in Beta</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-circular font-bold text-white mb-6 leading-tight">
              Unlock Your
              <span className="text-primary-neon block">Growth Potential</span>
              with GoTall
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-gray mb-8 max-w-3xl mx-auto">
              Track your height journey, optimize health habits, and grow up to 
              <span className="text-primary-neon font-semibold"> 2–3 inches in 6 months</span>.
            </p>
            
            <button 
              onClick={() => setIsWaitlistOpen(true)}
              className="bg-primary-neon text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-neon/90 transition-colors inline-flex items-center group"
            >
              Join the Waitlist
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          {/* App Screenshot Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary-dark-gray to-black rounded-3xl p-8 border border-gray-700 shadow-2xl">
              <div className="bg-black rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-neon/10 to-transparent" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-primary-neon rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">App Screenshot</h3>
                  <p className="text-primary-gray">Beautiful, minimal interface coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-circular font-bold text-white mb-6">
              Everything you need to grow
            </h2>
            <p className="text-xl text-primary-gray max-w-2xl mx-auto">
              Comprehensive tools and insights designed to maximize your height potential through data-driven optimization.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="bg-primary-dark-gray rounded-2xl p-8 border border-gray-700 hover:border-primary-neon/50 transition-all duration-300 group cursor-pointer h-full">
                    <div className="w-12 h-12 bg-primary-neon/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-neon/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary-neon" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-neon transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-primary-gray">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-primary-dark-gray/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-circular font-bold text-white mb-6">
              How it works
            </h2>
            <p className="text-xl text-primary-gray max-w-2xl mx-auto">
              Get started on your growth journey in four simple steps
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-neon rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-black">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-primary-gray">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Community Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-circular font-bold text-white mb-6">
              Join the community
            </h2>
            <p className="text-xl text-primary-gray max-w-2xl mx-auto">
              Connect with thousands chasing their growth goals, share progress, and get support
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {communityPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary-dark-gray rounded-2xl p-6 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-neon/10 flex items-center justify-center mr-3">
                    <span className="text-lg">{post.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{post.user}</h4>
                    <p className="text-sm text-primary-gray">{post.timeAgo}</p>
                  </div>
                </div>
                <p className="text-white mb-4">{post.content}</p>
                <div className="flex items-center space-x-4 text-primary-gray text-sm">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.replies}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/community">
              <button className="bg-primary-neon text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-neon/90 transition-colors inline-flex items-center group">
                Join the Community
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-neon/10 to-primary-neon/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-circular font-bold text-white mb-6">
              Ready to start growing?
            </h2>
            <p className="text-xl text-primary-gray mb-8">
              Join thousands already on their growth journey. Be the first to know when GoTall launches.
            </p>
            <button 
              onClick={() => setIsWaitlistOpen(true)}
              className="bg-primary-neon text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-neon/90 transition-colors inline-flex items-center group"
            >
              Let's Grow Together
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark-gray/50 py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-neon rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">GT</span>
                </div>
                <span className="text-white font-circular font-bold text-xl">GoTall</span>
              </div>
              <p className="text-primary-gray">
                Unlock your growth potential with data-driven health optimization.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <div className="space-y-2">
                {['Nutrition', 'Sleep', 'Exercise', 'Progress'].map((item) => (
                  <Link key={item} href={`/${item.toLowerCase()}`} className="block text-primary-gray hover:text-primary-neon transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-primary-gray hover:text-primary-neon transition-colors">Home</Link>
                <Link href="/community" className="block text-primary-gray hover:text-primary-neon transition-colors">Community</Link>
                <button onClick={() => setIsWaitlistOpen(true)} className="block text-primary-gray hover:text-primary-neon transition-colors">Join Waitlist</button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-primary-gray mb-4">Get growth tips and updates</p>
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="bg-primary-neon text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-neon/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-primary-gray">
            <p>&copy; 2025 GoTall. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
      />
    </div>
  )
}
