import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Mesh } from "three";

function Knot({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        <torusKnotGeometry args={[1, 0.32, 180, 32]} />
        <MeshDistortMaterial color={color} distort={0.35} speed={2} roughness={0.15} metalness={0.85} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });
  const count = 80;
  return (
    <group ref={ref as never}>
      {Array.from({ length: count }).map((_, i) => {
        const r = 4 + Math.random() * 4;
        const a = (i / count) * Math.PI * 2;
        const y = (Math.random() - 0.5) * 6;
        return (
          <mesh key={i} position={[Math.cos(a) * r, y, Math.sin(a) * r]}>
            <sphereGeometry args={[0.03 + Math.random() * 0.04, 8, 8]} />
            <meshBasicMaterial color={i % 5 === 0 ? "#F51A23" : "#6FA8FF"} />
          </mesh>
        );
      })}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#6FA8FF" />
        <directionalLight position={[-5, -2, 2]} intensity={0.8} color="#F51A23" />
        <Knot position={[-2.2, 0.4, 0]} color="#1F5AAE" speed={1} />
        <Knot position={[2.2, -0.4, -1]} color="#F51A23" speed={0.7} />
        <Float speed={1} floatIntensity={2}>
          <mesh position={[0, 0, -2]}>
            <icosahedronGeometry args={[1.3, 1]} />
            <meshStandardMaterial color="#0F2238" metalness={0.9} roughness={0.1} wireframe />
          </mesh>
        </Float>
        <Particles />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
