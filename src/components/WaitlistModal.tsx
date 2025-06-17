'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            name: formData.name || null,
            email: formData.email,
            created_at: new Date().toISOString(),
          }
        ])

      if (error) throw error

      setIsSuccess(true)
      setFormData({ name: '', email: '' })
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 3000)
    } catch (error: any) {
      setError(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ name: '', email: '' })
    setError('')
    setIsSuccess(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-primary-dark-gray rounded-2xl p-8 w-full max-w-md border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {!isSuccess ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-circular font-bold text-white">
                    Join the Waitlist
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-primary-gray mb-6">
                  Be the first to know when GoTall launches and start your growth journey.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-neon transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-neon transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !formData.email}
                    className="w-full bg-primary-neon text-black py-3 rounded-lg font-medium hover:bg-primary-neon/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? 'Joining...' : "Let's Grow"}
                  </button>
                </form>

                <p className="text-xs text-primary-gray mt-4 text-center">
                  We'll never spam you. Unsubscribe at any time.
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-neon rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-2xl font-circular font-bold text-white mb-2">
                  Welcome aboard!
                </h2>
                <p className="text-primary-gray">
                  You're now on the GoTall waitlist. We'll notify you as soon as we launch!
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 