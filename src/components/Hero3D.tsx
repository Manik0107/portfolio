import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Neural network node component
function NeuralNode({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Neural connection line
function NeuralConnection({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const lineRef = useRef<THREE.Line>(null);
  
  const points = useMemo(() => {
    const curve = new THREE.LineCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(20);
  }, [start, end]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({ 
    color: '#2dd4bf', 
    transparent: true, 
    opacity: 0.3 
  }), []);

  return (
    <primitive object={new THREE.Line(geometry, lineMaterial)} ref={lineRef} />
  );
}

// Particle field for ambient effect
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3b82f6"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main neural network mesh
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate neural network structure
  const { nodes, connections } = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    const connectionPairs: { start: [number, number, number]; end: [number, number, number] }[] = [];
    
    // Create layers of nodes
    const layers = [4, 6, 8, 6, 4];
    let nodeIndex = 0;
    
    layers.forEach((nodeCount, layerIndex) => {
      const layerX = (layerIndex - 2) * 1.2;
      
      for (let i = 0; i < nodeCount; i++) {
        const nodeY = (i - (nodeCount - 1) / 2) * 0.5;
        const nodeZ = (Math.random() - 0.5) * 0.3;
        nodePositions.push([layerX, nodeY, nodeZ]);
        
        // Connect to previous layer
        if (layerIndex > 0) {
          const prevLayerStart = layers.slice(0, layerIndex).reduce((a, b) => a + b, 0) - layers[layerIndex - 1];
          for (let j = 0; j < layers[layerIndex - 1]; j++) {
            if (Math.random() > 0.5) {
              connectionPairs.push({
                start: nodePositions[prevLayerStart + j],
                end: [layerX, nodeY, nodeZ],
              });
            }
          }
        }
        nodeIndex++;
      }
    });
    
    return { nodes: nodePositions, connections: connectionPairs };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {nodes.map((pos, i) => (
        <NeuralNode key={i} position={pos} delay={i * 0.2} />
      ))}
      {connections.map((conn, i) => (
        <NeuralConnection key={i} start={conn.start} end={conn.end} />
      ))}
    </group>
  );
}

// Central glowing orb
function CentralOrb() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[0.8, 64, 64]} position={[0, 0, -1]}>
        <MeshDistortMaterial
          color="#3b82f6"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#2dd4bf"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

// Main 3D scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2dd4bf" />
      <spotLight
        position={[0, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#f59e0b"
      />
      
      <NeuralNetwork />
      <CentralOrb />
      <ParticleField />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
}
