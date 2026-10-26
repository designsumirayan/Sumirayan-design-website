import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
function Sculpture({ paused }: { paused: boolean }) {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }) => {
    if (!group.current || paused) return;
    group.current.rotation.y = clock.elapsedTime * 0.12 + pointer.x * 0.15;
    group.current.rotation.x = 0.25 + pointer.y * 0.1;
  });
  return (
    <group ref={group} rotation={[0.25, 0.3, -0.35]}>
      <mesh>
        <torusKnotGeometry args={[1.45, 0.42, 160, 24, 2, 3]} />
        <meshPhysicalMaterial color="#2479e8" metalness={0.88} roughness={0.2} clearcoat={1} />
      </mesh>
      <mesh rotation={[1.1, 0.7, 0]} scale={1.17}>
        <torusGeometry args={[1.75, 0.055, 12, 100]} />
        <meshStandardMaterial
          color="#ff513f"
          emissive="#ed3024"
          emissiveIntensity={0.65}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}
export default function BrandSculpture({ paused }: { paused: boolean }) {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.8], fov: 42 }}
      frameloop={paused ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 5, 4]} intensity={4} color="#b7dbff" />
      <pointLight position={[-4, 1, 2]} intensity={65} color="#ff3f32" />
      <pointLight position={[1, -3, 4]} intensity={45} color="#ffffff" />
      <Sculpture paused={paused} />
    </Canvas>
  );
}
