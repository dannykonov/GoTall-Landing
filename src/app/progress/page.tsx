'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FeaturePage from '@/components/FeaturePage'

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
  },
  {
    name: "Ryan Smith",
    text: "The progress tracking features are incredible. Being able to see my growth journey visualized keeps me motivated.",
    rating: 5,
    avatar: "/avatars/ryan.jpg"
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
    description: "Receive weekly and monthly reports summarizing your progress, with actionable insights for continuous improvement."
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
  },
  {
    title: "Understanding Your Progress",
    description: "Understanding your progress helps you stay consistent and make informed decisions about your health habits."
  }
]

export default function ProgressPage() {

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
                src="/landing-screenshots/first locked logo.png" 
                alt="GoTall Project Your Height"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Project Your Height</h3>
            <p className="text-primary-gray">
              Visualize your height potential with AI-powered growth projections and track your progress toward reaching your genetic height goals.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )

  return (
    <FeaturePage
      title="Progress Tracking"
      subtitle="Visualize your growth journey with detailed analytics"
      description="Our progress tracking system allows you to monitor your height, nutrition, sleep, and exercise data all in one place. Get insights, celebrate milestones, and stay motivated."
      features={[
        "Interactive charts to visualize your growth over time",
        "Milestone tracking for short-term and long-term goals",
        "Correlation analysis between habits and growth",
        "Secure photo log to visually track posture changes",
        "Comprehensive health dashboard with all your data",
        "Gamified experience with achievements and rewards"
      ]}
      reviews={progressReviews}
      howItWorks={howItWorksSteps}
      whyItMatters={whyItMattersPoints}
      additionalContent={progressMockupsSection}
    />
  )
} 