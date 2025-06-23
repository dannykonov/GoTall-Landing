import type { Metadata } from 'next'
import SupportPageClient from './SupportPageClient'

export const metadata: Metadata = {
  title: "Support - GoTall | Help & FAQ",
  description: "Get help with GoTall. Find answers to frequently asked questions about growth projections, data security, and more. Contact our support team for personalized assistance.",
  keywords: "GoTall support, height growth help, FAQ, customer service, growth projections, data security",
  openGraph: {
    title: "Support - GoTall | Help & FAQ",
    description: "Get help with GoTall. Find answers to frequently asked questions about growth projections, data security, and more.",
    url: "https://gotall.app/support",
    siteName: "GoTall",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support - GoTall | Help & FAQ",
    description: "Get help with GoTall. Find answers to frequently asked questions about growth projections, data security, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SupportPage() {
  return <SupportPageClient />
} 