"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Text,
  Stars,
  Float,
  Html,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// Portal positions for collision detection
const PORTAL_POSITIONS = [
  { position: [0, 0, -8], href: "/galleries/ballet" },
  { position: [7, 0, -4], href: "/galleries/princess" },
  { position: [-7, 0, -4], href: "/galleries/adventures" },
  { position: [-9, 0, 4], href: "/about" },
  { position: [9, 0, 4], href: "/family" },
] as const;

// Cute Pixar-style chibi ballerina - 2 year old girl with light brown hair
function BalletDancer() {
  const { camera } = useThree();
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const rotationRef = useRef(0);
  const positionRef = useRef(new THREE.Vector3(0, 0, 8));
  const timeRef = useRef(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    const speed = 0.07;
    const rotSpeed = 0.04;
    const keys = keysRef.current;
    let moving = false;

    if (keys["KeyA"] || keys["ArrowLeft"]) rotationRef.current += rotSpeed;
    if (keys["KeyD"] || keys["ArrowRight"]) rotationRef.current -= rotSpeed;

    const forward = new THREE.Vector3(
      Math.sin(rotationRef.current),
      0,
      Math.cos(rotationRef.current)
    );

    if (keys["KeyW"] || keys["ArrowUp"]) {
      positionRef.current.addScaledVector(forward, -speed);
      moving = true;
    }
    if (keys["KeyS"] || keys["ArrowDown"]) {
      positionRef.current.addScaledVector(forward, speed);
      moving = true;
    }

    positionRef.current.x = Math.max(-18, Math.min(18, positionRef.current.x));
    positionRef.current.z = Math.max(-18, Math.min(18, positionRef.current.z));

    groupRef.current.position.copy(positionRef.current);
    groupRef.current.rotation.y = rotationRef.current;

    // Cute bouncy dance animation
    if (moving) {
      const bounce = Math.sin(t * 8) * 0.05;
      const sway = Math.sin(t * 4) * 0.1;
      if (bodyRef.current) {
        bodyRef.current.position.y = bounce;
        bodyRef.current.rotation.z = sway * 0.3;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 0.8 + Math.sin(t * 8) * 0.5;
        leftArmRef.current.rotation.x = Math.sin(t * 4) * 0.3;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.8 - Math.sin(t * 8) * 0.5;
        rightArmRef.current.rotation.x = Math.sin(t * 4 + 1) * 0.3;
      }
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(t * 8) * 0.4;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = Math.sin(t * 8 + Math.PI) * 0.4;
      }
    } else {
      // Idle breathing
      const breath = Math.sin(t * 2) * 0.02;
      if (bodyRef.current) {
        bodyRef.current.position.y = breath;
        bodyRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 0.3 + Math.sin(t * 1.5) * 0.1;
        leftArmRef.current.rotation.x = 0;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.3 - Math.sin(t * 1.5) * 0.1;
        rightArmRef.current.rotation.x = 0;
      }
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
    }

    // Camera follow
    const cameraOffset = new THREE.Vector3(
      Math.sin(rotationRef.current) * 4,
      2.5,
      Math.cos(rotationRef.current) * 4
    );
    camera.position.lerp(positionRef.current.clone().add(cameraOffset), 0.05);
    const lookTarget = positionRef.current.clone();
    lookTarget.y = 0.6;
    camera.lookAt(lookTarget);

    // Portal collision
    for (const portal of PORTAL_POSITIONS) {
      const dx = positionRef.current.x - portal.position[0];
      const dz = positionRef.current.z - portal.position[2];
      if (Math.sqrt(dx * dx + dz * dz) < 1.5) {
        router.push(portal.href);
        break;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 8]} scale={0.8}>
      {/* Soft character lighting */}
      <pointLight position={[0, 1.5, 1]} color="#fff5ee" intensity={1.5} distance={4} />
      <pointLight position={[-1, 1, -0.5]} color="#ffb6c1" intensity={0.8} distance={3} />

      {/* Rotate 180 degrees so character faces forward */}
      <group ref={bodyRef} rotation={[0, Math.PI, 0]}>
        {/* === TUTU - Fluffy pink layers === */}
        <group position={[0, 0.35, 0]}>
          {[0, 0.03, 0.06, 0.09].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} rotation={[0.1 - i * 0.02, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.28 - i * 0.04, 0.06, 32]} />
              <meshStandardMaterial
                color={i === 0 ? "#fff0f5" : i === 1 ? "#ffb6c1" : "#ff91a4"}
                transparent
                opacity={0.9}
                roughness={0.8}
              />
            </mesh>
          ))}
        </group>

        {/* === BODY - Cute round torso === */}
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#ff91a4" roughness={0.6} />
        </mesh>

        {/* === HEAD - Big cute head (chibi proportions) === */}
        <group position={[0, 0.85, 0]}>
          {/* Face - soft peachy skin */}
          <mesh>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial color="#ffe4d0" roughness={0.7} />
          </mesh>

          {/* Light brown hair - back */}
          <mesh position={[0, 0.05, -0.08]}>
            <sphereGeometry args={[0.21, 32, 32]} />
            <meshStandardMaterial color="#b5896a" roughness={0.9} />
          </mesh>

          {/* Hair - bangs */}
          <mesh position={[0, 0.12, 0.12]} rotation={[0.3, 0, 0]}>
            <sphereGeometry args={[0.12, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#c49a7a" roughness={0.9} />
          </mesh>

          {/* Pigtails / buns */}
          <mesh position={[0.18, 0.08, -0.05]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#b5896a" roughness={0.9} />
          </mesh>
          <mesh position={[-0.18, 0.08, -0.05]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#b5896a" roughness={0.9} />
          </mesh>

          {/* Pink ribbons on pigtails */}
          <mesh position={[0.18, 0.14, -0.02]}>
            <boxGeometry args={[0.06, 0.03, 0.02]} />
            <meshStandardMaterial color="#ff69b4" />
          </mesh>
          <mesh position={[-0.18, 0.14, -0.02]}>
            <boxGeometry args={[0.06, 0.03, 0.02]} />
            <meshStandardMaterial color="#ff69b4" />
          </mesh>

          {/* Big sparkly eyes */}
          <mesh position={[0.07, -0.02, 0.18]}>
            <sphereGeometry args={[0.045, 32, 32]} />
            <meshStandardMaterial color="#4a3520" />
          </mesh>
          <mesh position={[-0.07, -0.02, 0.18]}>
            <sphereGeometry args={[0.045, 32, 32]} />
            <meshStandardMaterial color="#4a3520" />
          </mesh>
          {/* Eye shine */}
          <mesh position={[0.08, 0, 0.22]}>
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.06, 0, 0.22]}>
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Rosy cheeks */}
          <mesh position={[0.12, -0.06, 0.14]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#ffb6c1" transparent opacity={0.5} />
          </mesh>
          <mesh position={[-0.12, -0.06, 0.14]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#ffb6c1" transparent opacity={0.5} />
          </mesh>

          {/* Little smile */}
          <mesh position={[0, -0.1, 0.2]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.03, 0.008, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#e07070" />
          </mesh>

          {/* Tiny tiara */}
          <mesh position={[0, 0.2, 0.1]} rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.06, 0.01, 8, 32, Math.PI]} />
            <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.24, 0.12]}>
            <octahedronGeometry args={[0.025, 0]} />
            <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* === ARMS - Chubby little arms === */}
        <group ref={leftArmRef} position={[-0.18, 0.55, 0]}>
          <mesh position={[0, -0.08, 0]}>
            <capsuleGeometry args={[0.04, 0.1, 8, 16]} />
            <meshStandardMaterial color="#ffe4d0" roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.18, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#ffe4d0" roughness={0.7} />
          </mesh>
        </group>
        <group ref={rightArmRef} position={[0.18, 0.55, 0]}>
          <mesh position={[0, -0.08, 0]}>
            <capsuleGeometry args={[0.04, 0.1, 8, 16]} />
            <meshStandardMaterial color="#ffe4d0" roughness={0.7} />
          </mesh>
          <mesh position={[0, -0.18, 0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#ffe4d0" roughness={0.7} />
          </mesh>
        </group>

        {/* === LEGS - Little ballerina legs === */}
        <group ref={leftLegRef} position={[-0.06, 0.25, 0]}>
          <mesh position={[0, -0.1, 0]}>
            <capsuleGeometry args={[0.045, 0.12, 8, 16]} />
            <meshStandardMaterial color="#ffe4d0" roughness={0.7} />
          </mesh>
          {/* Pink ballet slipper */}
          <mesh position={[0, -0.22, 0.02]}>
            <capsuleGeometry args={[0.035, 0.04, 8, 16]} />
            <meshStandardMaterial color="#ffb6c1" roughness={0.5} />
          </mesh>
        </group>
        <group ref={rightLegRef} position={[0.06, 0.25, 0]}>
          <mesh position={[0, -0.1, 0]}>
            <capsuleGeometry args={[0.045, 0.12, 8, 16]} />
            <meshStandardMaterial color="#ffe4d0" roughness={0.7} />
          </mesh>
          {/* Pink ballet slipper */}
          <mesh position={[0, -0.22, 0.02]}>
            <capsuleGeometry args={[0.035, 0.04, 8, 16]} />
            <meshStandardMaterial color="#ffb6c1" roughness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Pixar-style magical portal - whimsical archway design
function Portal({
  position,
  color,
  emoji,
  title,
  href,
  rotation = 0
}: {
  position: [number, number, number];
  color: string;
  emoji: string;
  title: string;
  href: string;
  rotation?: number;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const starRef = useRef<THREE.Group>(null);
  const portalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (starRef.current) {
      starRef.current.rotation.y = t * 0.5;
      starRef.current.position.y = 2.8 + Math.sin(t * 2) * 0.1;
    }
    if (portalRef.current) {
      // Swirling portal effect
      portalRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Cute rounded base - like a stage */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.6, 1.8, 0.16, 32]} />
        <meshStandardMaterial color="#2d1f3d" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.5, 1.6, 0.08, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Archway pillars - round and cute */}
      <mesh position={[-1.2, 1.2, 0]}>
        <capsuleGeometry args={[0.18, 2, 16, 16]} />
        <meshStandardMaterial color="#f5f0ff" roughness={0.5} />
      </mesh>
      <mesh position={[1.2, 1.2, 0]}>
        <capsuleGeometry args={[0.18, 2, 16, 16]} />
        <meshStandardMaterial color="#f5f0ff" roughness={0.5} />
      </mesh>

      {/* Decorative balls on pillars */}
      <mesh position={[-1.2, 2.4, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      <mesh position={[1.2, 2.4, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>

      {/* Curved arch top */}
      <mesh position={[0, 2.5, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.2, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#f5f0ff" roughness={0.5} />
      </mesh>

      {/* Magical swirling portal inside */}
      <mesh ref={portalRef} position={[0, 1.3, 0.05]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1 : 0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inner glow */}
      <mesh position={[0, 1.3, 0.02]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* Floating star decoration */}
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.4}>
        <group ref={starRef} position={[0, 2.8, 0.2]}>
          <mesh
            onClick={() => router.push(href)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 2 : 1}
              roughness={0.2}
            />
          </mesh>
        </group>
      </Float>

      {/* Cute little hearts/stars around arch */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.sin((i / 5) * Math.PI) * 1.4,
            2.5 + Math.cos((i / 5) * Math.PI) * 0.5,
            0.1
          ]}
          scale={0.08}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* Soft glow lights */}
      <pointLight position={[0, 1.3, 1]} color={color} intensity={2} distance={5} />
      <pointLight position={[0, 2.5, 0.5]} color="#ffffff" intensity={1} distance={3} />

      {/* Emoji on top */}
      <Html position={[0, 3.5, 0]} center>
        <div className="text-4xl select-none pointer-events-none"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          {emoji}
        </div>
      </Html>

      {/* Title plaque */}
      <group position={[0, 0.4, 1.5]}>
        <mesh>
          <boxGeometry args={[1.2, 0.35, 0.1]} />
          <meshStandardMaterial color="#2d1f3d" roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </group>

      {/* Hover indicator */}
      {hovered && (
        <Html position={[0, 1.3, 0.5]} center>
          <div className="text-xs text-white whitespace-nowrap bg-black/60 px-3 py-1.5 rounded-full">
            Walk in!
          </div>
        </Html>
      )}
    </group>
  );
}

// Main title floating in center - positioned higher to avoid overlap
function CenterTitle() {
  return (
    <group position={[0, 8, 0]}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          fontSize={1.5}
          color="#f5e6d3"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
        >
          {"Noulie's World"}
        </Text>
      </Float>

      {/* Crown above title */}
      <Html position={[0, 1.5, 0]} center>
        <div className="text-6xl">👑</div>
      </Html>
    </group>
  );
}

// Grid overlay
function GridFloor() {
  return (
    <gridHelper
      args={[40, 40, "#ff6b9d", "#1a1a2e"]}
      position={[0, 0.01, 0]}
    />
  );
}

// Floating particles
function Particles() {
  const particles = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = Math.random() * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ff6b9d" transparent opacity={0.6} />
    </points>
  );
}

// Ground with subtle reflections
function EnhancedGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial
        color="#080810"
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Simple but effective lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 10, 0]} intensity={2} color="#ff6b9d" distance={25} />
      <pointLight position={[10, 5, 10]} intensity={1} color="#9d4edd" distance={15} />
      <pointLight position={[-10, 5, -10]} intensity={1} color="#87ceeb" distance={15} />

      {/* Stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={0.5} />

      {/* Enhanced ground */}
      <EnhancedGround />
      <GridFloor />
      <Particles />

      {/* Center title */}
      <CenterTitle />

      {/* Gallery Portals arranged in a wider circle */}
      <Portal
        position={[0, 0, -8]}
        color="#ff6b9d"
        emoji="🩰"
        title="Ballet"
        href="/galleries/ballet"
      />
      <Portal
        position={[7, 0, -4]}
        color="#9d4edd"
        emoji="👑"
        title="Princess"
        href="/galleries/princess"
        rotation={-0.6}
      />
      <Portal
        position={[-7, 0, -4]}
        color="#87ceeb"
        emoji="✨"
        title="Adventures"
        href="/galleries/adventures"
        rotation={0.6}
      />

      {/* Other section portals */}
      <Portal
        position={[-9, 0, 4]}
        color="#d4af37"
        emoji="💖"
        title="About"
        href="/about"
        rotation={0.8}
      />
      <Portal
        position={[9, 0, 4]}
        color="#98fb98"
        emoji="👨‍👩‍👧"
        title="Family"
        href="/family"
        rotation={-0.8}
      />

      {/* Ballet dancer character - controlled by player */}
      <BalletDancer />
    </>
  );
}

// Loading screen
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#030305]">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">👑</div>
        <p className="text-cream text-lg">Entering the Kingdom...</p>
      </div>
    </div>
  );
}

// Instructions overlay
function Instructions({ onStart }: { onStart: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#030305]/95 z-50">
      <div className="text-center max-w-md px-6">
        <div className="text-6xl mb-6">🩰</div>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-cream mb-4">
          Noulie&apos;s World
        </h1>
        <p className="text-cream/60 mb-8">
          Guide the ballet princess through her magical kingdom
        </p>

        <div className="bg-white/5 rounded-xl p-6 mb-8 text-left border border-white/10">
          <h3 className="text-pink font-medium mb-4">Controls:</h3>
          <ul className="space-y-2 text-cream/80 text-sm">
            <li><span className="text-pink">W / ↑</span> — Dance forward</li>
            <li><span className="text-pink">S / ↓</span> — Dance backward</li>
            <li><span className="text-pink">A / ←</span> — Turn left</li>
            <li><span className="text-pink">D / →</span> — Turn right</li>
            <li><span className="text-pink">Click portals</span> — Enter galleries</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="px-8 py-4 bg-gradient-to-r from-pink to-purple text-white rounded-full text-lg font-medium hover:scale-105 transition-transform"
        >
          Start Dancing
        </button>
      </div>
    </div>
  );
}

// Lightweight post-processing - just bloom for glow
function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}

export function World3D() {
  const [started, setStarted] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already entered the world before
    const hasEntered = sessionStorage.getItem("hasEnteredWorld") === "true";
    setStarted(hasEntered);
  }, []);

  // Show loading while checking sessionStorage
  if (started === null) {
    return <div className="fixed inset-0 bg-[#030305]" />;
  }

  return (
    <div className="fixed inset-0 bg-[#030305]">
      {!started && <Instructions onStart={() => {
        sessionStorage.setItem("hasEnteredWorld", "true");
        setStarted(true);
      }} />}

      <Canvas
        camera={{ fov: 60, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={1}
      >
        <Suspense fallback={null}>
          {started && (
            <>
              <Scene />
              <PostProcessing />
            </>
          )}
        </Suspense>
      </Canvas>

      {!started && <Loader />}
    </div>
  );
}
