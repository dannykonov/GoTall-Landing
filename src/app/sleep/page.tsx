'use client'

import { useState } from 'react'
import FeaturePage from '@/components/FeaturePage'
import WaitlistModal from '@/components/WaitlistModal'

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
  }
]

export default function SleepPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <>
      <FeaturePage
        title="Sleep Optimization"
        subtitle="Maximize growth hormone release with better sleep"
        description="Our advanced sleep tracking system helps you optimize your rest for maximum growth hormone production. Get personalized sleep schedules, cycle tracking, and environmental recommendations."
        features={[
          "Smart sleep cycle tracking to optimize growth hormone release",
          "Personalized bedtime recommendations based on your schedule",
          "Environmental factors monitoring (temperature, light, noise)",
          "Sleep quality scoring with detailed breakdown",
          "Integration with popular sleep tracking devices",
          "Customized wake-up times for optimal recovery"
        ]}
        reviews={sleepReviews}
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