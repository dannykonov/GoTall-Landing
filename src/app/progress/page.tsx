'use client'

import { useState } from 'react'
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
        screenshotAlt="Progress tracking and analytics dashboard"
        howItWorks={howItWorksSteps}
        whyItMatters={whyItMattersPoints}
        onWaitlistClick={() => setIsWaitlistOpen(true)}
      />
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </>
  )
} 