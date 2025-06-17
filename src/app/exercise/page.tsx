'use client'

import { useState } from 'react'
import FeaturePage from '@/components/FeaturePage'
import WaitlistModal from '@/components/WaitlistModal'

const exerciseReviews = [
  {
    name: "Tom Martinez",
    text: "The exercise recommendations are perfectly tailored for height growth. I've seen amazing results following the program.",
    rating: 5,
    avatar: "/avatars/tom.jpg"
  },
  {
    name: "Lisa Chang",
    text: "Finally found exercises that actually help with growth! The form guidance and progress tracking are excellent.",
    rating: 5,
    avatar: "/avatars/lisa.jpg"
  },
  {
    name: "Ryan Smith",
    text: "Great variety of exercises and clear instructions. The progress tracking keeps me motivated.",
    rating: 4,
    avatar: "/avatars/ryan.jpg"
  }
]

const howItWorksSteps = [
  {
    title: "Assessment & Plan",
    description: "Complete a fitness assessment to receive a personalized exercise plan based on your growth phase and current fitness level."
  },
  {
    title: "Daily Workouts",
    description: "Follow guided exercise routines with video demonstrations focusing on height-promoting movements."
  },
  {
    title: "Form Correction",
    description: "Use our AI-powered form analysis to ensure you're performing exercises correctly for maximum benefit."
  },
  {
    title: "Track Progress",
    description: "Monitor your flexibility, strength gains, and posture improvements over time with detailed analytics."
  }
]

const whyItMattersPoints = [
  {
    title: "Spinal Decompression",
    description: "Stretching and hanging exercises help decompress your spine, creating space for natural growth."
  },
  {
    title: "Posture Improvement",
    description: "Better posture can instantly add inches to your height while supporting long-term spinal health."
  },
  {
    title: "Growth Hormone Boost",
    description: "High-intensity exercises naturally stimulate growth hormone production, supporting height development."
  },
  {
    title: "Bone Strengthening",
    description: "Weight-bearing exercises promote healthy bone density and development when done correctly."
  }
]

export default function ExercisePage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <>
      <FeaturePage
        title="Exercise Optimization"
        subtitle="Growth-promoting exercises tailored to your body"
        description="Our exercise system is designed specifically to promote height growth through targeted movements and proper form. Get personalized workout plans, form guidance, and progress tracking."
        features={[
          "Personalized exercise plans based on your growth phase",
          "3D form guidance for optimal exercise execution",
          "Progressive overload tracking for consistent results",
          "Focus on exercises that promote bone growth",
          "Integration with fitness trackers and smart devices",
          "Recovery monitoring to prevent overtraining"
        ]}
        reviews={exerciseReviews}
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