"use client";

import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

type Props = { scrollProgress: MotionValue<number> };

function Lights() {
  return (
    <>
      <ambientLight intensity={0.25} color="#ffffff" />
      <pointLight position={[3, 4, 3]} intensity={5} color="#14B8A6" />
      <pointLight position={[-4, -1, 2]} intensity={2.5} color="#0D9488" />
      <pointLight position={[0, -3, 5]} intensity={1.2} color="#ffffff" />
      {/* Rim light from behind */}
      <pointLight position={[0, 1, -3]} intensity={1.8} color="#0f4a4a" />
    </>
  );
}

function DevBot({ scrollProgress }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const scroll = scrollProgress.get();
    const t = state.clock.elapsedTime;

    groupRef.current.position.y = Math.sin(t * 0.85) * 0.08;
    groupRef.current.rotation.y = scroll * Math.PI * 3.5;
    groupRef.current.rotation.z = Math.sin(t * 0.22) * 0.022;

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.42) * 0.14;
      headRef.current.rotation.x = Math.sin(t * 0.28) * 0.055;
    }
  });

  const teal = "#0D9488";
  const tealL = "#14B8A6";
  const dark = "#0a0d14";
  const mid = "#141c28";

  return (
    <group ref={groupRef}>
      {/* HEAD */}
      <group ref={headRef} position={[0, 0.95, 0]}>
        <RoundedBox args={[0.46, 0.46, 0.44]} radius={0.1} smoothness={6}>
          <meshStandardMaterial color={mid} metalness={0.85} roughness={0.12} />
        </RoundedBox>

        {/* Visor */}
        <mesh position={[0, 0.02, 0.225]}>
          <planeGeometry args={[0.3, 0.14]} />
          <meshStandardMaterial color={tealL} emissive={tealL} emissiveIntensity={1.5} transparent opacity={0.95} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.08, 0.04, 0.226]}>
          <boxGeometry args={[0.058, 0.058, 0.001]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3.5} />
        </mesh>
        <mesh position={[0.08, 0.04, 0.226]}>
          <boxGeometry args={[0.058, 0.058, 0.001]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={3.5} />
        </mesh>

        {/* Smile */}
        {([-0.06, 0, 0.06] as number[]).map((x, i) => (
          <mesh key={i} position={[x, -0.042 + (i === 1 ? -0.008 : 0), 0.226]}>
            <boxGeometry args={[0.026, 0.02, 0.001]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2.2} />
          </mesh>
        ))}

        {/* Antenna */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.16, 6]} />
          <meshStandardMaterial color={mid} metalness={0.95} roughness={0.08} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.034, 12, 12]} />
          <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={2.5} />
        </mesh>

        {/* Side accent strips */}
        {([-0.234, 0.234] as number[]).map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.01, 0.24, 0.24]} />
            <meshStandardMaterial color={teal} metalness={0.7} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* NECK */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.09, 0.1, 0.1, 8]} />
        <meshStandardMaterial color={dark} metalness={0.65} roughness={0.28} />
      </mesh>

      {/* TORSO */}
      <RoundedBox args={[0.6, 0.7, 0.38]} radius={0.05} smoothness={4} position={[0, 0.28, 0]}>
        <meshStandardMaterial color={dark} metalness={0.6} roughness={0.18} />
      </RoundedBox>

      {/* Chest screen */}
      <RoundedBox args={[0.32, 0.24, 0.015]} radius={0.025} position={[0, 0.32, 0.2]}>
        <meshStandardMaterial color={teal} emissive={teal} emissiveIntensity={0.8} />
      </RoundedBox>

      {/* Code lines */}
      {([
        { x: -0.07, y: 0.4, w: 0.16, o: 0.7 },
        { x: -0.04, y: 0.35, w: 0.12, o: 0.5 },
        { x: 0.02, y: 0.3, w: 0.18, o: 0.4 },
        { x: -0.05, y: 0.25, w: 0.14, o: 0.3 },
      ] as { x: number; y: number; w: number; o: number }[]).map(({ x, y, w, o }, i) => (
        <mesh key={i} position={[x, y, 0.21]}>
          <boxGeometry args={[w, 0.017, 0.001]} />
          <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1.5} transparent opacity={o} />
        </mesh>
      ))}

      {/* Shoulder pads */}
      {([-0.4, 0.4] as number[]).map((x, i) => (
        <RoundedBox key={i} args={[0.2, 0.1, 0.32]} radius={0.04} position={[x, 0.56, 0]}>
          <meshStandardMaterial color={teal} metalness={0.75} roughness={0.18} />
        </RoundedBox>
      ))}

      {/* ARMS */}
      {([
        { x: -0.44, sign: 1 },
        { x: 0.44, sign: -1 },
      ] as { x: number; sign: number }[]).map(({ x, sign }, i) => (
        <group key={i}>
          <mesh position={[x, 0.26, 0]} rotation={[0, 0, sign * -0.12]}>
            <cylinderGeometry args={[0.072, 0.062, 0.44, 8]} />
            <meshStandardMaterial color={mid} metalness={0.55} roughness={0.28} />
          </mesh>
          <mesh position={[x + sign * -0.03, -0.06, 0.05]} rotation={[0.25, 0, sign * -0.08]}>
            <cylinderGeometry args={[0.062, 0.052, 0.38, 8]} />
            <meshStandardMaterial color={mid} metalness={0.55} roughness={0.28} />
          </mesh>
          <RoundedBox args={[0.11, 0.1, 0.09]} radius={0.025} position={[x + sign * -0.05, -0.26, 0.1]}>
            <meshStandardMaterial color={dark} metalness={0.65} roughness={0.2} />
          </RoundedBox>
        </group>
      ))}

      {/* WAIST */}
      <RoundedBox args={[0.52, 0.1, 0.34]} radius={0.04} position={[0, -0.07, 0]}>
        <meshStandardMaterial color={mid} metalness={0.65} roughness={0.22} />
      </RoundedBox>

      {/* LEGS */}
      {([-0.17, 0.17] as number[]).map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.35, 0]}>
            <cylinderGeometry args={[0.1, 0.088, 0.44, 8]} />
            <meshStandardMaterial color={mid} metalness={0.48} roughness={0.32} />
          </mesh>
          <mesh position={[x, -0.66, 0.015]} rotation={[0.06, 0, 0]}>
            <cylinderGeometry args={[0.088, 0.078, 0.36, 8]} />
            <meshStandardMaterial color={mid} metalness={0.48} roughness={0.32} />
          </mesh>
          <RoundedBox args={[0.22, 0.09, 0.3]} radius={0.03} position={[x, -0.88, 0.05]}>
            <meshStandardMaterial color={teal} metalness={0.68} roughness={0.18} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

export default function Character3DScene({ scrollProgress }: Props) {
  const [xOffset, setXOffset] = useState(0.32);

  useEffect(() => {
    const update = () => setXOffset(window.innerWidth >= 1024 ? 0.32 : 0);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0.05, 2.5], fov: 48 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <Lights />
      <Suspense fallback={null}>
        <group position={[xOffset, 0, 0]}>
          <DevBot scrollProgress={scrollProgress} />
        </group>
      </Suspense>
    </Canvas>
  );
}
