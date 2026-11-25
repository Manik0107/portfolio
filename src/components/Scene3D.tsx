import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

const LIME = '#c3f24e';
const CORAL = '#ff6b4a';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/* Liquid chrome core with a thin wireframe shell */
function ChromeOrb({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (inner.current && !reduced) {
      inner.current.rotation.y += delta * 0.14;
      inner.current.rotation.x = Math.sin(t * 0.22) * 0.18;
    }
    if (group.current && !reduced) {
      group.current.rotation.z = Math.sin(t * 0.18) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <Float
        speed={reduced ? 0 : 1.3}
        rotationIntensity={reduced ? 0 : 0.35}
        floatIntensity={reduced ? 0 : 0.7}
      >
        <group ref={inner}>
          <mesh castShadow>
            <icosahedronGeometry args={[1.02, 20]} />
            <MeshDistortMaterial
              color="#0d0d11"
              metalness={1}
              roughness={0.22}
              emissive={LIME}
              emissiveIntensity={0.025}
              distort={reduced ? 0 : 0.28}
              speed={reduced ? 0 : 1.3}
              envMapIntensity={1.05}
            />
          </mesh>

          {/* Lime wireframe shell */}
          <mesh scale={1.15}>
            <icosahedronGeometry args={[1.02, 1]} />
            <meshBasicMaterial color={LIME} wireframe transparent opacity={0.07} />
          </mesh>

          {/* Coral accent shell, slightly larger */}
          <mesh scale={1.32} rotation={[0.4, 0.2, 0.1]}>
            <icosahedronGeometry args={[1.02, 1]} />
            <meshBasicMaterial color={CORAL} wireframe transparent opacity={0.035} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

/* Orbiting technical rings */
function OrbitRings({ reduced }: { reduced: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reduced) return;
    if (a.current) a.current.rotation.z += delta * 0.18;
    if (b.current) b.current.rotation.x += delta * 0.12;
    if (c.current) c.current.rotation.y -= delta * 0.09;
  });

  return (
    <group>
      <mesh ref={a} rotation={[Math.PI / 2.1, 0, 0]}>
        <torusGeometry args={[1.62, 0.005, 8, 160]} />
        <meshBasicMaterial color={LIME} transparent opacity={0.3} />
      </mesh>
      <mesh ref={b} rotation={[0.5, 0.9, 0]}>
        <torusGeometry args={[1.92, 0.004, 8, 160]} />
        <meshBasicMaterial color="#f2efe9" transparent opacity={0.14} />
      </mesh>
      <mesh ref={c} rotation={[1.1, 0.2, 0.6]}>
        <torusGeometry args={[1.42, 0.004, 8, 160]} />
        <meshBasicMaterial color={CORAL} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* Deep ambient particle field */
function ParticleField({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 480;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current && !reduced) {
      ref.current.rotation.y += delta * 0.012;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#cfd0c7"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.32}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Camera parallax rig driven by pointer */
function ParallaxRig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.current.x * 0.22 - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (pointer.current.y * 0.16 - group.current.rotation.x) * 0.03;
    group.current.position.x += (pointer.current.x * 0.35 - group.current.position.x) * 0.03;
    group.current.position.y += (-pointer.current.y * 0.25 - group.current.position.y) * 0.03;
  });

  return <group ref={group}>{children}</group>;
}

function SceneContent({ reduced }: { reduced: boolean }) {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <>
      <ambientLight intensity={0.22} />
      <directionalLight position={[5, 6, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[0, 3, 4]} intensity={6} distance={18} color="#ffffff" />
      <pointLight position={[-4, 2, 3]} intensity={3} distance={16} color={LIME} />
      <pointLight position={[4, -3, 2]} intensity={2} distance={16} color={CORAL} />

      <Environment resolution={256}>
        <Lightformer intensity={1.8} position={[0, 4, -6]} scale={[12, 12, 1]} color="#f2efe9" />
        <Lightformer intensity={0.8} position={[6, 2, 2]} scale={[6, 8, 1]} color={LIME} />
        <Lightformer intensity={0.5} position={[-6, 0, 2]} scale={[6, 10, 1]} color={CORAL} />
        <Lightformer intensity={0.7} position={[0, -6, 0]} scale={[12, 12, 1]} color="#6b6b78" />
      </Environment>

      <ParallaxRig>
        <group
          position={isMobile ? [1.6, 2.2, -2.8] : [3.55, 0.65, -1.9]}
          scale={isMobile ? 0.42 : 0.95}
        >
          <ChromeOrb reduced={reduced} />
          <OrbitRings reduced={reduced} />
        </group>
        <ParticleField reduced={reduced} />
      </ParallaxRig>
    </>
  );
}

export default function Scene3D() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <SceneContent reduced={reduced} />
      </Canvas>
      {/* Separation veil so the scene never competes with foreground content */}
      <div className="absolute inset-0 bg-background/25" />
    </div>
  );
}
