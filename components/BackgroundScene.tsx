'use client'

import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { InteractiveSphere, InteractiveCube } from './InteractiveElements'
import { AINeuralNetwork, AIDataFlow, AINeuralLayers } from './AIAnimations'

function ParticleField() {
  const particles = 1200
  const positions = new Float32Array(particles * 3)

  for (let i = 0; i < particles * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 50
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#667eea" transparent opacity={0.35} />
    </points>
  )
}

function FloatingGeometry() {
  const mesh1 = useRef<THREE.Mesh>(null)
  const mesh2 = useRef<THREE.Mesh>(null)
  const mesh3 = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (mesh1.current && mesh2.current && mesh3.current) {
      const animate = () => {
        const time = Date.now() * 0.001
        mesh1.current!.rotation.x = time * 0.5
        mesh1.current!.rotation.y = time * 0.3
        mesh2.current!.rotation.x = time * 0.4
        mesh2.current!.rotation.y = time * 0.5
        mesh3.current!.rotation.x = time * 0.3
        mesh3.current!.rotation.y = time * 0.4

        mesh1.current!.position.y = Math.sin(time) * 2
        mesh2.current!.position.y = Math.cos(time * 1.5) * 2
        mesh3.current!.position.y = Math.sin(time * 0.8) * 2

        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [])

  return (
    <>
      <mesh ref={mesh1} position={[-8, -2, -12]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#667eea"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      <mesh ref={mesh2} position={[9, 1, -10]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#764ba2"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      <mesh ref={mesh3} position={[0, -3, -14]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#f093fb"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </>
  )
}

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 70 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.35} color="#667eea" />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        
        <ParticleField />
        <FloatingGeometry />
        {/* Pull interactive shapes away from hero center */}
        {/* <InteractiveSphere /> */}
        {/* <InteractiveCube /> */}
        
        {/* AI-themed animations */}
        {/* Keep only one subtle AI animation to reduce busyness */}
        <AINeuralLayers />
        
        <Stars radius={100} depth={40} count={400} factor={3} fade speed={0.6} />
      </Canvas>
    </div>
  )
}

