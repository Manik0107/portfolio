import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated neural network nodes for project card
function NeuralNodes({ color = '#3b82f6' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const nodes = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      positions.push([
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 0.5,
      ]);
    }
    return positions;
  }, []);

  const connections = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.6) {
          lines.push({ start: nodes[i], end: nodes[j] });
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
      {connections.map((conn, i) => (
        <ConnectionLine key={i} start={conn.start} end={conn.end} color={color} />
      ))}
    </group>
  );
}

function ConnectionLine({ 
  start, 
  end, 
  color 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  color: string;
}) {
  const lineRef = useRef<THREE.Line>(null);
  
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  const material = useMemo(() => new THREE.LineBasicMaterial({ 
    color, 
    transparent: true, 
    opacity: 0.4 
  }), [color]);

  useFrame((state) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />;
}

function Scene({ color }: { color: string }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={color} />
      <NeuralNodes color={color} />
    </>
  );
}

interface ProjectCard3DProps {
  colorScheme?: 'primary' | 'accent' | 'gold';
}

export default function ProjectCard3D({ colorScheme = 'primary' }: ProjectCard3DProps) {
  const colors = {
    primary: '#3b82f6',
    accent: '#2dd4bf',
    gold: '#f59e0b',
  };

  return (
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene color={colors[colorScheme]} />
      </Canvas>
    </div>
  );
}
