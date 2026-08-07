import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

function Orbs() {
  const ref = useRef<Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.08;
  });
  return (
    <group ref={ref}>
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-2.6, 0.6, -1]}>
          <icosahedronGeometry args={[1.1, 1]} />
          <MeshDistortMaterial color="#1F5AAE" distort={0.35} speed={1.6} roughness={0.15} metalness={0.9} />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1}>
        <mesh position={[2.4, -0.8, -1.5]}>
          <torusKnotGeometry args={[0.8, 0.28, 160, 28]} />
          <MeshDistortMaterial color="#F51A23" distort={0.3} speed={2} roughness={0.2} metalness={0.85} />
        </mesh>
      </Float>
      <Float speed={1} floatIntensity={2}>
        <mesh position={[0.2, 0.2, -3]}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshStandardMaterial color="#0F2238" metalness={0.9} roughness={0.1} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function Dust() {
  const ref = useRef<Mesh>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.04; });
  const count = 60;
  return (
    <group ref={ref as never}>
      {Array.from({ length: count }).map((_, i) => {
        const r = 4 + Math.random() * 4;
        const a = (i / count) * Math.PI * 2;
        const y = (Math.random() - 0.5) * 6;
        return (
          <mesh key={i} position={[Math.cos(a) * r, y, Math.sin(a) * r]}>
            <sphereGeometry args={[0.025 + Math.random() * 0.035, 8, 8]} />
            <meshBasicMaterial color={i % 5 === 0 ? "#F51A23" : "#6FA8FF"} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Scene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`} aria-hidden>
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 20% 10%, oklch(0.45 0.18 255 / 0.25), transparent 60%), radial-gradient(50% 40% at 90% 90%, oklch(0.55 0.22 27 / 0.18), transparent 60%)" }} />
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ pointerEvents: "none" }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} color="#6FA8FF" />
          <directionalLight position={[-5, -2, 2]} intensity={0.7} color="#F51A23" />
          <Orbs />
          <Dust />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
