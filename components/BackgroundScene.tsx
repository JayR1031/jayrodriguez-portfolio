'use client'

import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

function ParticleField() {
  const particles = 2000
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
      <pointsMaterial size={0.08} color="#667eea" transparent opacity={0.5} />
    </points>
  )
}


export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 70 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.9} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#667eea" />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <ParticleField />
        <Stars radius={100} depth={50} count={600} factor={4} fade speed={0.8} />
      </Canvas>
    </div>
  )
}

