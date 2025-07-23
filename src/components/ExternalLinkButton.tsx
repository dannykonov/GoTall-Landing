'use client'

import { ReactNode } from 'react'
import { useTikTokBrowser } from '@/hooks/useTikTokBrowser'

interface ExternalLinkButtonProps {
  href: string
  children: ReactNode
  className?: string
  fallbackMessage?: string
  onClick?: () => void
}

export default function ExternalLinkButton({ 
  href, 
  children, 
  className = '',
  fallbackMessage,
  onClick
}: ExternalLinkButtonProps) {
  const { openInExternalBrowser } = useTikTokBrowser()

  const handleClick = async () => {
    if (onClick) {
      onClick()
    }
    
    await openInExternalBrowser(href, fallbackMessage)
  }

  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
} 