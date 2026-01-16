'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DownloadButtons from '@/components/DownloadButtons'
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={trackLogoClick}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src="/logo.svg"
                alt="GoTall logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-circular font-bold text-lg sm:text-xl">GoTall</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
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
            <DownloadButtons 
              variant="dual" 
              size="sm" 
              trackingPrefix="nav"
              className="scale-75"
            />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-primary-neon transition-colors ml-auto"
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
            <div className="px-4 py-4 space-y-2">
              <Link href="/" className="block px-3 py-3 text-white hover:text-primary-neon transition-colors rounded-lg">
                Home
              </Link>
              
              {features.map((feature) => (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className="block px-3 py-3 text-white hover:text-primary-neon transition-colors rounded-lg"
                  onClick={() => trackFeatureClick(feature.name)}
                >
                  {feature.name}
                </Link>
              ))}
              
              <Link 
                href="/community" 
                className="block px-3 py-3 text-white hover:text-primary-neon transition-colors rounded-lg"
                onClick={trackCommunityClick}
              >
                Community
              </Link>

              <Link 
                href="/support" 
                className="block px-3 py-3 text-white hover:text-primary-neon transition-colors rounded-lg"
              >
                Support
              </Link>
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <DownloadButtons 
                  variant="dual" 
                  size="sm" 
                  trackingPrefix="nav_mobile"
                  className="scale-90"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 