"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function PulsingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.08;
      meshRef.current.scale.setScalar(s);
      meshRef.current.rotation.x += 0.004;
      meshRef.current.rotation.y += 0.006;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.1, 1]} />
      <meshStandardMaterial color="#8ab4ff" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function OrbitingParticles() {
  const group = useRef<THREE.Group>(null);
  const count = 120;
  const radius = 2.6;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.12;
  });
  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#a78bfa" transparent opacity={0.85} />
      </points>
    </group>
  );
}

export default function AICoreScene() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-[38vh] max-h-[420px] w-full md:w-[70%] lg:w-[55%] -z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={0.6} />
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
          <PulsingCore />
          <OrbitingParticles />
        </Float>
      </Canvas>
    </div>
  );
}


