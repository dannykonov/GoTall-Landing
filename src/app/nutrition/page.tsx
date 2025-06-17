'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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

  const nutritionMockupsSection = (
    <section className="py-20 px-4 bg-primary-dark-gray/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-circular font-bold text-white mb-6">
            Nutrition tracking in action
          </h2>
          <p className="text-xl text-primary-gray max-w-2xl mx-auto">
            See how GoTall helps you optimize your nutrition for maximum growth potential with detailed tracking and smart recommendations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="mb-6 mx-auto max-w-sm">
              <img 
                src="/GoTall Mockups/nutrition.png" 
                alt="GoTall Nutrition Goals"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Nutrition Goals</h3>
            <p className="text-primary-gray">
              Track your daily macros and micronutrients with detailed breakdowns and progress towards your optimal growth nutrition goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="mb-6 mx-auto max-w-sm">
              <img 
                src="/GoTall Mockups/coffee.png" 
                alt="GoTall Smart Recommendations"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Smart Recommendations</h3>
            <p className="text-primary-gray">
              Get personalized food suggestions and meal recommendations based on your current intake and growth optimization needs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )

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
        howItWorks={howItWorksSteps}
        whyItMatters={whyItMattersPoints}
        onWaitlistClick={() => setIsWaitlistOpen(true)}
        additionalContent={nutritionMockupsSection}
      />
      
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </>
  )
} 