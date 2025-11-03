'use client'

import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { InteractiveSphere, InteractiveCube } from './InteractiveElements'

function ParticleField() {
  const particles = 5000
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
      <pointsMaterial size={0.1} color="#667eea" transparent opacity={0.6} />
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
      <mesh ref={mesh1} position={[-5, 0, -5]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#667eea"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      <mesh ref={mesh2} position={[5, 0, -3]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#764ba2"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
      <mesh ref={mesh3} position={[0, 0, -7]}>
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
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#667eea" />
        <ParticleField />
        <FloatingGeometry />
        <InteractiveSphere />
        <InteractiveCube />
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
      </Canvas>
    </div>
  )
}

