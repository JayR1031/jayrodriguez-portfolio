'use client'

import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function InteractiveSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Enhanced mouse following with stronger response
      meshRef.current.rotation.x += (mouseRef.current.y * 0.8 - meshRef.current.rotation.x) * 0.15
      meshRef.current.rotation.y += (mouseRef.current.x * 0.8 - meshRef.current.rotation.y) * 0.15
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1
      meshRef.current.scale.set(scale, scale, scale)
      
      // Enhanced floating motion
      meshRef.current.position.y = 2 + Math.sin(time * 0.5) * 0.8
      meshRef.current.position.x = 3 + Math.cos(time * 0.3) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={[3, 2, -5]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#667eea"
        transparent
        opacity={0.5}
        wireframe
        emissive="#667eea"
        emissiveIntensity={0.4}
        wireframeLinewidth={2}
      />
    </mesh>
  )
}

function InteractiveCube() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Stronger mouse interaction
      meshRef.current.rotation.x += (mouseRef.current.y * 0.6 - meshRef.current.rotation.x) * 0.15
      meshRef.current.rotation.y += (mouseRef.current.x * 0.6 - meshRef.current.rotation.y) * 0.15
      meshRef.current.rotation.z += (time * 0.3 - meshRef.current.rotation.z) * 0.1
      
      // Dynamic scaling
      const scale = 1 + Math.cos(time * 1.5) * 0.15
      meshRef.current.scale.set(scale, scale, scale)
      
      // Enhanced movement
      meshRef.current.position.y = -2 + Math.cos(time * 0.7) * 0.8
      meshRef.current.position.x = -3 + Math.sin(time * 0.4) * 0.6
    }
  })

  return (
    <mesh ref={meshRef} position={[-3, -2, -4]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        color="#764ba2"
        transparent
        opacity={0.5}
        wireframe
        emissive="#764ba2"
        emissiveIntensity={0.4}
        wireframeLinewidth={2}
      />
    </mesh>
  )
}

export { InteractiveSphere, InteractiveCube }

