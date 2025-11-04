'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useFeedback } from '@/components/FeedbackProvider'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const { trigger } = useFeedback()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        {
          y: -100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      )
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    if (typeof window !== 'undefined') {
      trigger()
      const element = document.querySelector(href)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 80

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    setIsOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect py-3' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="text-xl md:text-2xl font-bold text-gradient hover:scale-105 transform transition-all duration-300"
        >
          Jay Rodriguez
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="relative group text-sm font-medium hover:text-primary-400 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50"
          onClick={() => { trigger(); setIsOpen(!isOpen) }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`fixed top-0 right-0 h-full w-64 transform transition-transform duration-300 md:hidden z-40 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="flex flex-col pt-20 px-6 space-y-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-lg font-medium text-white hover:text-primary-400 transition-colors py-2"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

