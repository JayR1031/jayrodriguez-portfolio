import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jay Rodriguez - AI Safety Researcher & Software Engineer',
  description: 'Northeastern University Grad Student | AI Safety Researcher | Software Engineer | Machine Learning, Deep Learning & Computer Vision Enthusiast',
  keywords: ['Jay Rodriguez', 'AI Safety', 'Machine Learning', 'Software Engineer', 'Deep Learning', 'Computer Vision'],
  authors: [{ name: 'Jay Rodriguez' }],
  openGraph: {
    title: 'Jay Rodriguez - Portfolio',
    description: 'AI Safety Researcher & Software Engineer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

