'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FeaturePage from '@/components/FeaturePage'
import WaitlistModal from '@/components/WaitlistModal'

const progressReviews = [
  {
    name: "Kevin Zhang",
    text: "The progress tracking features are incredible. Being able to see my growth journey visualized keeps me motivated.",
    rating: 5,
    avatar: "/avatars/kevin.jpg"
  },
  {
    name: "Maria Garcia",
    text: "Love how the app combines all metrics into an easy-to-understand growth score. The predictions are surprisingly accurate!",
    rating: 5,
    avatar: "/avatars/maria.jpg"
  },
  {
    name: "John Taylor",
    text: "The detailed analytics and progress charts help me understand what's working and what needs adjustment.",
    rating: 4,
    avatar: "/avatars/john.jpg"
  }
]

const howItWorksSteps = [
  {
    title: "Input Baseline Data",
    description: "Enter your current height, family history, and health metrics to establish your growth baseline."
  },
  {
    title: "Daily Measurements",
    description: "Take consistent height measurements using our guided measurement protocol for accurate tracking."
  },
  {
    title: "AI Growth Analysis",
    description: "Our AI analyzes your data to predict growth patterns and identify factors affecting your progress."
  },
  {
    title: "Actionable Insights",
    description: "Receive personalized recommendations based on your progress data to optimize your growth journey."
  }
]

const whyItMattersPoints = [
  {
    title: "Pattern Recognition",
    description: "Tracking helps identify growth patterns, plateaus, and the effectiveness of different strategies."
  },
  {
    title: "Motivation & Goals",
    description: "Visual progress charts and milestone achievements keep you motivated throughout your growth journey."
  },
  {
    title: "Data-Driven Decisions",
    description: "Make informed adjustments to your nutrition, sleep, and exercise based on real progress data."
  },
  {
    title: "Growth Predictions",
    description: "AI-powered projections help set realistic expectations and plan for your growth potential."
  }
]

export default function ProgressPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const progressMockupsSection = (
    <section className="py-20 px-4 bg-primary-dark-gray/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-circular font-bold text-white mb-6">
            Progress tracking in action
          </h2>
          <p className="text-xl text-primary-gray max-w-2xl mx-auto">
            See how GoTall helps you visualize your growth journey with comprehensive tracking and AI-powered insights.
          </p>
        </motion.div>
        
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center max-w-md"
          >
            <div className="mb-6 mx-auto max-w-sm">
              <img 
                src="/GoTall Mockups/homescreen.png" 
                alt="GoTall Progress Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Growth Dashboard</h3>
            <p className="text-primary-gray">
              Monitor your height progress with detailed analytics, growth projections, and personalized insights all in one comprehensive dashboard.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )

  return (
    <>
      <FeaturePage
        title="Progress Tracking"
        subtitle="Visualize and predict your growth journey"
        description="Track your height progress with advanced analytics and predictive modeling. Get detailed insights into your growth patterns and personalized projections based on your data."
        features={[
          "Daily height tracking with morning/evening variations",
          "Advanced analytics with growth pattern recognition",
          "AI-powered height prediction based on multiple factors",
          "Visual progress charts and milestone tracking",
          "Comprehensive health metrics dashboard",
          "Monthly progress reports with actionable insights"
        ]}
        reviews={progressReviews}
        howItWorks={howItWorksSteps}
        whyItMatters={whyItMattersPoints}
        onWaitlistClick={() => setIsWaitlistOpen(true)}
        additionalContent={progressMockupsSection}
      />
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </>
  )
} 