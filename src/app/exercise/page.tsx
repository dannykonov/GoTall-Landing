'use client'

import { motion } from 'framer-motion'
import FeaturePage from '@/components/FeaturePage'

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

  const exerciseMockupsSection = (
    <section className="py-20 px-4 bg-primary-dark-gray/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-circular font-bold text-white mb-6">
            Exercise plans in action
          </h2>
          <p className="text-xl text-primary-gray max-w-2xl mx-auto">
            See how GoTall guides you through targeted exercises and posture improvements designed to maximize your height potential.
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
                src="/landing-screenshots/exercises for big iphones copy.png" 
                alt="GoTall Exercise Routine"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Exercise Routine</h3>
            <p className="text-primary-gray">
              Follow guided, height-focused workouts and stretches with a simple daily routine designed to build consistency and support your growth journey.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )

  return (
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
      additionalContent={exerciseMockupsSection}
    />
  )
} 