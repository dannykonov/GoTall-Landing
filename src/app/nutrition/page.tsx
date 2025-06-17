'use client'

import { useState } from 'react'
import FeaturePage from '@/components/FeaturePage'
import WaitlistModal from '@/components/WaitlistModal'

const nutritionReviews = [
  {
    name: "Alex Chen",
    text: "The nutrition tracking and recommendations have completely changed my growth journey. I've seen significant improvements in just 3 months!",
    rating: 5,
    avatar: "/avatars/alex.jpg"
  },
  {
    name: "Sarah Miller",
    text: "Finally, an app that understands the connection between nutrition and height growth. The meal plans are easy to follow.",
    rating: 5,
    avatar: "/avatars/sarah.jpg"
  },
  {
    name: "Mike Johnson",
    text: "The personalized nutrition advice is spot-on. I've learned so much about how different foods affect growth.",
    rating: 4,
    avatar: "/avatars/mike.jpg"
  }
]

const howItWorksSteps = [
  {
    title: "Set Your Goals",
    description: "Input your current height, target goals, and dietary preferences to get personalized recommendations."
  },
  {
    title: "Track Your Meals",
    description: "Log your food intake using our extensive database or barcode scanner for accurate nutrient tracking."
  },
  {
    title: "Get Smart Recommendations",
    description: "Receive real-time suggestions for foods and nutrients that promote optimal growth."
  },
  {
    title: "Monitor Your Progress",
    description: "Track how your nutrition impacts your growth journey with detailed analytics and insights."
  }
]

const whyItMattersPoints = [
  {
    title: "Protein for Growth",
    description: "Adequate protein intake is essential for bone development and muscle growth during your active growth phase."
  },
  {
    title: "Essential Vitamins",
    description: "Vitamins D, K, and minerals like calcium and zinc play crucial roles in bone health and height development."
  },
  {
    title: "Growth Hormone Support",
    description: "Proper nutrition timing and composition can optimize natural growth hormone release, especially during sleep."
  },
  {
    title: "Energy for Development",
    description: "Sufficient calories ensure your body has the energy needed for growth processes and cellular development."
  }
]

export default function NutritionPage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  return (
    <>
      <FeaturePage
        title="Nutrition Optimization"
        subtitle="Fuel your growth with personalized nutrition plans"
        description="Our advanced nutrition tracking system helps you optimize your diet for maximum height potential. Get personalized meal plans, nutrient tracking, and real-time recommendations based on your goals."
        features={[
          "Personalized meal plans based on your age, current height, and growth goals",
          "Real-time nutrient tracking with focus on growth-promoting vitamins and minerals",
          "Smart recommendations for food combinations that maximize nutrient absorption",
          "Weekly meal prep suggestions and shopping lists",
          "Integration with popular food delivery services",
          "Regular updates based on your progress and changing needs"
        ]}
        reviews={nutritionReviews}
        screenshotAlt="Nutrition tracking and meal planning interface"
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