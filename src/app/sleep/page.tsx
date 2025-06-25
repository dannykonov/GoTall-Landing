'use client'

import { useState } from 'react'
import FeaturePage from '@/components/FeaturePage'

const sleepReviews = [
  {
    name: "David Park",
    text: "The sleep optimization features have helped me improve my sleep quality dramatically. I can feel the difference in my recovery and growth.",
    rating: 5,
    avatar: "/avatars/david.jpg"
  },
  {
    name: "Emma Wilson",
    text: "I love how the app tracks my sleep cycles and gives recommendations for optimal growth hormone release. Game changer!",
    rating: 5,
    avatar: "/avatars/emma.jpg"
  },
  {
    name: "James Lee",
    text: "The sleep tracking and recommendations are incredibly detailed. It's helped me optimize my rest for better growth results.",
    rating: 4,
    avatar: "/avatars/james.jpg"
  },
  {
    name: "Ryan Smith",
    text: "The sleep tracking and recommendations are incredibly detailed. It's helped me optimize my rest for better growth results.",
    rating: 4,
    avatar: "/avatars/ryan.jpg"
  }
]

const howItWorksSteps = [
  {
    title: "Setup Sleep Tracking",
    description: "Connect your phone or wearable device to automatically monitor your sleep patterns and cycles."
  },
  {
    title: "Analyze Sleep Quality",
    description: "Our AI analyzes your sleep stages, duration, and quality to identify areas for improvement."
  },
  {
    title: "Get Personalized Schedule",
    description: "Receive customized bedtime and wake-up recommendations based on your age and growth goals."
  },
  {
    title: "Build Better Habits",
    description: "Follow sleep hygiene recommendations and track your progress toward optimal sleep patterns."
  },
  {
    title: "Receive Detailed Weekly Reports",
    description: "Receive detailed weekly reports to understand your sleep patterns and how they correlate with your growth progress."
  }
]

const whyItMattersPoints = [
  {
    title: "Growth Hormone Peak",
    description: "80% of growth hormone is released during deep sleep phases, making quality sleep crucial for height development."
  },
  {
    title: "Sleep Duration Matters",
    description: "Teenagers need 8-10 hours of sleep nightly for optimal growth spurts and physical development."
  },
  {
    title: "Consistent Sleep Cycles",
    description: "Regular sleep schedules help regulate your body's natural growth and recovery cycles."
  },
  {
    title: "Recovery and Repair",
    description: "Deep sleep allows your body to repair tissues, strengthen bones, and process growth hormones effectively."
  },
  {
    title: "Regulation of Circadian Rhythm",
    description: "Consistent sleep schedules regulate your circadian rhythm, which is crucial for predictable growth hormone release and overall health."
  }
]

export default function SleepPage() {
  return (
    <FeaturePage
      title="Sleep Tracking"
      subtitle="Optimize your sleep for maximum growth hormone release"
      description="Quality sleep is when your body produces the most growth hormone. Our smart sleep tracking helps you improve sleep quality, find your optimal sleep schedule, and wake up energized."
      features={[
        "Personalized sleep schedule recommendations",
        "AI-driven insights to improve sleep quality",
        "Smart alarm to wake you up in your lightest sleep phase",
        "Correlation analysis between sleep and growth progress",
        "Guided meditations and relaxation sounds for better sleep",
        "Integration with wearables like Apple Watch and Oura Ring"
      ]}
      reviews={sleepReviews}
      howItWorks={howItWorksSteps}
      whyItMatters={whyItMattersPoints}
    />
  )
} 