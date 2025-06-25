'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationTracking } from '@/hooks/useAnalytics'

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [featuresOpen, setFeaturesOpen] = useState(false)

  const { trackFeatureClick, trackCommunityClick, trackLogoClick, trackNavigationClick } = useNavigationTracking()

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setIsSticky(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const features = [
    { name: 'Nutrition', href: '/nutrition' },
    { name: 'Sleep', href: '/sleep' },
    { name: 'Exercise', href: '/exercise' },
    { name: 'Progress', href: '/progress' },
  ]

  const navClassName = isMounted && isSticky 
    ? 'bg-black/95 backdrop-blur-sm border-b border-primary-dark-gray' 
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={trackLogoClick}>
            <div className="w-8 h-8 bg-primary-neon rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">GT</span>
            </div>
            <span className="text-white font-circular font-bold text-xl">GoTall</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-primary-neon transition-colors">
              Home
            </Link>
            
            {/* Features Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setFeaturesOpen(true)}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <button className="flex items-center space-x-1 text-white hover:text-primary-neon transition-colors">
                <span>Features</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-primary-dark-gray rounded-lg border border-gray-700 shadow-xl"
                  >
                    {features.map((feature) => (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        className="block px-4 py-3 text-white hover:text-primary-neon hover:bg-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => trackFeatureClick(feature.name)}
                      >
                        {feature.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/community" 
              className="text-white hover:text-primary-neon transition-colors"
              onClick={trackCommunityClick}
            >
              Community
            </Link>

            <Link 
              href="/support" 
              className="text-white hover:text-primary-neon transition-colors"
            >
              Support
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="https://apps.apple.com/us/app/gotall/id6747467975" target="_blank" rel="noopener noreferrer">
              <button 
                onClick={() => trackNavigationClick('desktop')}
                className="bg-primary-neon text-black px-6 py-2 rounded-lg font-medium hover:bg-primary-neon/90 transition-colors"
              >
                Download App
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-primary-neon transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-sm border-t border-primary-dark-gray"
          >
            <div className="px-4 py-2 space-y-1">
              <Link href="/" className="block px-3 py-2 text-white hover:text-primary-neon transition-colors">
                Home
              </Link>
              
              {features.map((feature) => (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className="block px-3 py-2 text-white hover:text-primary-neon transition-colors"
                  onClick={() => trackFeatureClick(feature.name)}
                >
                  {feature.name}
                </Link>
              ))}
              
              <Link 
                href="/community" 
                className="block px-3 py-2 text-white hover:text-primary-neon transition-colors"
                onClick={trackCommunityClick}
              >
                Community
              </Link>

              <Link 
                href="/support" 
                className="block px-3 py-2 text-white hover:text-primary-neon transition-colors"
              >
                Support
              </Link>
              
              <Link href="https://apps.apple.com/us/app/gotall/id6747467975" target="_blank" rel="noopener noreferrer">
                <button 
                  onClick={() => trackNavigationClick('mobile')}
                  className="w-full mt-4 bg-primary-neon text-black px-6 py-2 rounded-lg font-medium hover:bg-primary-neon/90 transition-colors"
                >
                  Download App
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 