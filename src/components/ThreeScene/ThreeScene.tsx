import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Animated Sphere Component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Rotating Torus Component
function RotatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 0, 0]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial color="#ec4899" wireframe />
    </mesh>
  );
}

// Particle System
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#a855f7" transparent opacity={0.6} />
    </points>
  );
}

// Floating Cubes
function FloatingCubes() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Float
          key={i}
          speed={1 + i * 0.2}
          rotationIntensity={0.5 + i * 0.1}
          floatIntensity={0.5 + i * 0.1}
        >
          <mesh position={[
            Math.cos(i * 1.2) * 4,
            Math.sin(i * 0.8) * 2,
            Math.sin(i * 1.5) * 3
          ]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color={`hsl(${270 + i * 20}, 70%, 60%)`}
              emissive={`hsl(${270 + i * 20}, 70%, 30%)`}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

interface ThreeSceneProps {
  className?: string;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />

        {/* 3D Objects */}
        <AnimatedSphere />
        <RotatingTorus />
        <FloatingCubes />
        <ParticleField />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

