'use client'

import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Neural Network Node
function NeuralNode({ position, delay = 0 }: { position: [number, number, number], delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() + delay
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.2
      meshRef.current.scale.set(scale, scale, scale)
      
      // Floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3
      
      // Subtle rotation
      meshRef.current.rotation.z = time * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color="#667eea"
        emissive="#667eea"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Neural Network Connection
function NeuralConnection({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
    ]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [start, end])

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: "#667eea", transparent: true, opacity: 0.3 }))} />
  )
}

// AI Neural Network Visualization
export function AINeuralNetwork() {
  const nodes: [number, number, number][] = [
    [-3, 2, -4],
    [-1, 3, -4],
    [1, 2, -4],
    [3, 3, -4],
    [-2, 0, -5],
    [0, 1, -5],
    [2, 0, -5],
    [-1, -2, -4],
    [1, -1, -4],
  ]

  return (
    <group>
      {nodes.map((node, i) => (
        <NeuralNode key={i} position={node} delay={i * 0.1} />
      ))}
      {/* Create connections between nodes */}
      {nodes.slice(0, -1).map((start, i) => (
        <NeuralConnection key={i} start={start} end={nodes[i + 1]} />
      ))}
    </group>
  )
}

// AI Data Flow Particles
export function AIDataFlow() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 300
  const positions = useRef(new Float32Array(particleCount * 3))
  const velocities = useRef(new Float32Array(particleCount * 3))

  // Initialize particles
  useEffect(() => {
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions.current[i] = (Math.random() - 0.5) * 20
      positions.current[i + 1] = (Math.random() - 0.5) * 20
      positions.current[i + 2] = (Math.random() - 0.5) * 20
      
      velocities.current[i] = (Math.random() - 0.5) * 0.02
      velocities.current[i + 1] = (Math.random() - 0.5) * 0.02
      velocities.current[i + 2] = (Math.random() - 0.5) * 0.02
    }
  }, [])

  useFrame(() => {
    if (particlesRef.current && particlesRef.current.geometry) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] += velocities.current[i]
        posArray[i + 1] += velocities.current[i + 1]
        posArray[i + 2] += velocities.current[i + 2]
        
        // Wrap around boundaries
        if (Math.abs(posArray[i]) > 10) velocities.current[i] *= -1
        if (Math.abs(posArray[i + 1]) > 10) velocities.current[i + 1] *= -1
        if (Math.abs(posArray[i + 2]) > 10) velocities.current[i + 2] *= -1
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#4facfe"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  )
}

// AI Processing Visualization - Rotating Neural Layers
export function AINeuralLayers() {
  const layer1Ref = useRef<THREE.Group>(null)
  const layer2Ref = useRef<THREE.Group>(null)
  const layer3Ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (layer1Ref.current) {
      layer1Ref.current.rotation.y = time * 0.3
      layer1Ref.current.position.y = Math.sin(time * 0.5) * 0.5
    }
    
    if (layer2Ref.current) {
      layer2Ref.current.rotation.y = -time * 0.4
      layer2Ref.current.position.y = Math.cos(time * 0.6) * 0.5
    }
    
    if (layer3Ref.current) {
      layer3Ref.current.rotation.y = time * 0.25
      layer3Ref.current.position.y = Math.sin(time * 0.7) * 0.5
    }
  })

  const createLayer = (radius: number, nodes: number, color: string) => (
    <group>
      {Array.from({ length: nodes }).map((_, i) => {
        const angle = (i / nodes) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
            />
          </mesh>
        )
      })}
    </group>
  )

  return (
    <group position={[0, 0, -6]}>
      <group ref={layer1Ref}>{createLayer(1.5, 8, '#667eea')}</group>
      <group ref={layer2Ref}>{createLayer(2.2, 12, '#764ba2')}</group>
      <group ref={layer3Ref}>{createLayer(3, 16, '#f093fb')}</group>
    </group>
  )
}

// AI Matrix Rain Effect
export function AIMatrixRain() {
  const columns = 20
  const rows = 30
  const particles: Array<{ x: number; y: number; speed: number; delay: number }> = []

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      particles.push({
        x: (i / columns - 0.5) * 20,
        y: (j / rows - 0.5) * 20,
        speed: Math.random() * 0.02 + 0.01,
        delay: Math.random() * 5,
      })
    }
  }

  return (
    <group>
      {particles.map((p, i) => (
        <mesh
          key={i}
          position={[p.x, p.y, -8]}
        >
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial
            color={Math.random() > 0.5 ? '#00f2fe' : '#4facfe'}
            emissive={Math.random() > 0.5 ? '#00f2fe' : '#4facfe'}
            emissiveIntensity={0.3}
            transparent
            opacity={Math.random() * 0.5 + 0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

