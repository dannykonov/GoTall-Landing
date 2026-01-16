'use client'

import { motion } from 'framer-motion'
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
  const sleepMockupsSection = (
    <section className="py-20 px-4 bg-primary-dark-gray/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-circular font-bold text-white mb-6">
            Sleep tracking in action
          </h2>
          <p className="text-xl text-primary-gray max-w-2xl mx-auto">
            See how GoTall helps you build better sleep habits with actionable recommendations and streak tracking.
          </p>
        </motion.div>

        <div className="flex justify-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center w-full"
          >
            <div className="mb-6 mx-auto max-w-md">
              <img
                src="/feature-screenshots/sleep for big iphones copy.png"
                alt="GoTall Sleep Tracking"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Sleep Tracking</h3>
            <p className="text-primary-gray">
              Track your sleep quality, stay consistent, and get simple recommendations to optimize recovery and growth hormone release.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )

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
      additionalContent={sleepMockupsSection}
    />
  )
} 