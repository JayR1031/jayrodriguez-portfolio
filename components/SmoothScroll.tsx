'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    // Enhanced smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Add subtle parallax effect on scroll
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          const parallaxElements = document.querySelectorAll('[data-parallax]')
          
          parallaxElements.forEach((el) => {
            const element = el as HTMLElement
            const speed = parseFloat(element.dataset.parallax || '0.5')
            const yPos = -(scrolled * speed)
            element.style.transform = `translate3d(0, ${yPos}px, 0)`
          })
          
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}

