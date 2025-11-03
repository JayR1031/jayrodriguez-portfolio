'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    // Initialize cursor position
    const initX = window.innerWidth / 2
    const initY = window.innerHeight / 2
    mouseX = initX
    mouseY = initY
    followerX = initX
    followerY = initY
    cursor.style.left = `${initX}px`
    cursor.style.top = `${initY}px`
    cursor.style.opacity = '1'
    follower.style.left = `${initX}px`
    follower.style.top = `${initY}px`
    follower.style.opacity = '0.2'

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      cursor.style.left = `${mouseX}px`
      cursor.style.top = `${mouseY}px`

      // Check for interactive elements
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        gsap.to(cursor, { scale: 1.5, opacity: 0.8 })
        gsap.to(follower, { scale: 2, opacity: 0.3 })
      } else {
        gsap.to(cursor, { scale: 1, opacity: 1 })
        gsap.to(follower, { scale: 1, opacity: 0.2 })
      }
    }

    const updateFollower = () => {
      const dx = mouseX - followerX
      const dy = mouseY - followerY

      followerX += dx * 0.1
      followerY += dy * 0.1

      follower.style.left = `${followerX}px`
      follower.style.top = `${followerY}px`

      requestAnimationFrame(updateFollower)
    }

    updateFollower()
    window.addEventListener('mousemove', updateCursor)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 rounded-full bg-primary-400 pointer-events-none z-[9999] mix-blend-difference"
        style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 rounded-full border-2 border-primary-400/30 pointer-events-none z-[9998] mix-blend-difference"
        style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}

