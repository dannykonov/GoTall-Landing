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
import DownloadButtons from '@/components/DownloadButtons'
import Link from 'next/link'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function HomePage() {
  const { track } = useAnalytics()

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
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-primary-neon/10 border border-primary-neon/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6">
              <Star className="w-4 h-4 text-primary-neon mr-2" />
              <span className="text-primary-neon text-sm font-medium">Backed by Science</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-circular font-bold text-white mb-4 sm:mb-6 leading-tight">
              Unlock Your
              <span className="text-primary-neon block">Growth Potential</span>
              with GoTall
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl text-primary-gray mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0">
              Track your height journey, optimize health habits, and grow up to 
              <span className="text-primary-neon font-semibold"> 2–3 inches in 6 months</span>.
            </p>
            
            <div className="flex justify-center px-4 sm:px-0">
              <DownloadButtons 
                variant="single" 
                size="lg" 
                trackingPrefix="hero"
                className="w-full max-w-md sm:max-w-none"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-circular font-bold text-white mb-4 sm:mb-6">
              Everything you need to grow
            </h2>
            <p className="text-lg sm:text-xl text-primary-gray max-w-2xl mx-auto px-4 sm:px-0">
              Comprehensive tools and insights designed to maximize your height potential through data-driven optimization.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div 
                    className="bg-primary-dark-gray rounded-2xl p-6 sm:p-8 border border-gray-700 hover:border-primary-neon/50 transition-all duration-300 group cursor-pointer h-full"
                    onClick={() => track('feature_card_clicked', { feature: feature.title })}
                  >
                    <div className="w-12 h-12 bg-primary-neon/10 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary-neon/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary-neon" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary-neon transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-primary-gray text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Mockups Preview */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-primary-dark-gray/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-circular font-bold text-white mb-4 sm:mb-6">
              See GoTall in action
            </h2>
            <p className="text-lg sm:text-xl text-primary-gray max-w-2xl mx-auto px-4 sm:px-0">
              Get a preview of the GoTall app experience with these key features designed to optimize your growth journey.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center flex flex-col"
            >
              <div className="mb-6 mx-auto w-full max-w-sm flex justify-center items-center h-[500px]">
                <img 
                  src="/landing-screenshots/first locked logo.png" 
                  alt="GoTall Project Your Height"
                  className="w-full h-96 object-contain rounded-2xl shadow-2xl"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Project Your Height</h3>
              <p className="text-primary-gray text-sm sm:text-base">
                See your potential height growth with AI-powered projections and track your journey to reaching your genetic potential.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center flex flex-col items-center justify-center"
            >
              <div className="mb-6 mx-auto w-full max-w-lg flex justify-center items-center h-[500px]">
                <img 
                  src="/landing-screenshots/ai coach for big iphones copy.png" 
                  alt="GoTall Coach"
                  className="w-full h-[450px] object-contain rounded-2xl shadow-2xl"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Personal Coach</h3>
              <p className="text-primary-gray text-sm sm:text-base">
                Get personalized coaching and guidance tailored to your unique growth journey with expert advice and motivation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center flex flex-col"
            >
              <div className="mb-6 mx-auto w-full max-w-sm flex justify-center items-center h-[500px]">
                <img 
                  src="/landing-screenshots/exercises for big iphones copy.png" 
                  alt="GoTall Exercise Routine"
                  className="w-full h-96 object-contain rounded-2xl shadow-2xl"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Exercise Routine</h3>
              <p className="text-primary-gray text-sm sm:text-base">
                Follow guided, height-focused workouts and stretches with a simple daily routine designed to build consistency and support your growth journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Backed by Science Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* CDC Logo Placeholder */}
            <div className="mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl flex items-center justify-center mb-4">
                <img 
                  src="/logo.svg" 
                  alt="GoTall logo"
                  className="w-16 sm:w-20 h-auto"
                />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-circular font-bold text-white mb-4 sm:mb-6">
              Built on Science. Informed by Data.
            </h2>
            
            <p className="text-lg sm:text-xl text-primary-gray max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              GoTall uses insights and recommendations based on data from trusted health organizations, including the CDC, to help users make healthy lifestyle choices that may support natural growth potential.
            </p>
            
            <div className="mb-6 sm:mb-8">
              <a 
                href="https://www.cdc.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-neon hover:text-primary-neon/80 font-semibold text-base sm:text-lg underline underline-offset-4 transition-colors"
                onClick={() => track('cdc_resources_clicked')}
              >
                View CDC Resources
              </a>
            </div>
            
            <p className="text-sm text-primary-gray/80 max-w-3xl mx-auto px-4 sm:px-0">
              <strong>Note:</strong> GoTall is not affiliated with or endorsed by the CDC. All health guidance is based on publicly available research.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-primary-dark-gray/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-circular font-bold text-white mb-4 sm:mb-6">
              How it works
            </h2>
            <p className="text-lg sm:text-xl text-primary-gray max-w-2xl mx-auto px-4 sm:px-0">
              Get started on your growth journey in four simple steps
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-black">{step.number}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-primary-gray text-sm sm:text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Community Preview */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-circular font-bold text-white mb-4 sm:mb-6">
              Join the community
            </h2>
            <p className="text-lg sm:text-xl text-primary-gray max-w-2xl mx-auto px-4 sm:px-0">
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
                className="bg-primary-dark-gray rounded-2xl p-4 sm:p-6 border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-neon/10 flex items-center justify-center mr-3">
                    <span className="text-lg">{post.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{post.user}</div>
                    <div className="text-sm text-primary-gray">{post.timeAgo}</div>
                  </div>
                </div>
                <p className="text-primary-gray text-sm sm:text-base mb-4">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-primary-gray">
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.replies}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/community">
              <button 
                className="bg-brand-gradient text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center group"
                onClick={() => track('community_preview_clicked')}
              >
                Join the Community
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-r from-brand-start/10 to-brand-end/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-circular font-bold text-white mb-4 sm:mb-6">
              Ready to unlock your growth potential?
            </h2>
            <p className="text-lg sm:text-xl text-primary-gray mb-6 sm:mb-8 px-4 sm:px-0">
              Join the waitlist and be the first to experience the future of height optimization.
            </p>
            <div className="flex justify-center px-4 sm:px-0">
              <DownloadButtons 
                variant="single" 
                size="lg" 
                trackingPrefix="final"
                className="w-full max-w-md sm:max-w-none"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
