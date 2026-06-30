"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import * as THREE from "three";
import type { Group } from "three";
import { rocketProject, rocketSheet, STUDIO_ENABLED } from "../theatre/rocket";
import { useLoopedSequence } from "../theatre/useLoopedSequence";
import { normalize } from "./droneInstance";
import Preloader from "./Preloader";

// Last authored keyframe — play 0→here, then a 2s gap, then loop.
const MOTION_END = 2.967;

const ROCKET_MODEL = "/3d-models/rocket/scene.gltf";

// ponytail: flame tuning knobs — normalized model space (rocket ~1 unit tall,
// nose +y). Nudge ENGINE_Y to sit on the nozzle; flip the sign of the spawn
// velocity's y if the model's nose points the other way.
const FLAME_COUNT = 90;
const ENGINE_Y = -0.55;

// Additive particle plume that emits from the nozzle. Lives inside the rocket
// group, so it follows every parallax/Theatre transform automatically.
function Flame() {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, parts } = useMemo(() => {
    const positions = new Float32Array(FLAME_COUNT * 3);
    const colors = new Float32Array(FLAME_COUNT * 3);
    const parts = Array.from({ length: FLAME_COUNT }, () => ({
      age: Math.random() * 0.5,
      life: 0.35 + Math.random() * 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(0.8 + Math.random() * 0.7),
      vz: (Math.random() - 0.5) * 0.25,
    }));
    for (let i = 0; i < FLAME_COUNT; i++) positions[i * 3 + 1] = ENGINE_Y;
    return { positions, colors, parts };
  }, []);

  const hot = useMemo(() => new THREE.Color("#fff3b0"), []);
  const cool = useMemo(() => new THREE.Color("#ff3b00"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame((_, dt) => {
    const delta = Math.min(dt, 0.05); // guard against tab-refocus jumps
    for (let i = 0; i < FLAME_COUNT; i++) {
      const p = parts[i];
      p.age += delta;
      if (p.age >= p.life) {
        // Respawn at the nozzle with a fresh cone of velocity.
        p.age = 0;
        p.vx = (Math.random() - 0.5) * 0.25;
        p.vy = -(0.8 + Math.random() * 0.7);
        p.vz = (Math.random() - 0.5) * 0.25;
        positions[i * 3] = (Math.random() - 0.5) * 0.08;
        positions[i * 3 + 1] = ENGINE_Y;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
      } else {
        positions[i * 3] += p.vx * delta;
        positions[i * 3 + 1] += p.vy * delta;
        positions[i * 3 + 2] += p.vz * delta;
      }
      // Fade hot (yellow-white) → cool (red-orange) over the particle's life.
      tmp.copy(hot).lerp(cool, p.age / p.life);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// The rocket GLTF ships no animation clips, so this is just a normalized clone
// (centered ~1-unit box) with the same responsive scale + pointer parallax as the
// drone/plane. Theatre places/animates the wrapping <e.group> on top.
function Rocket() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(ROCKET_MODEL);
  const object = useMemo(() => normalize(scene), [scene]);

  const width = useThree((s) => s.viewport.width);
  const scale = Math.min(0.9, Math.max(0.5, width / 6));

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += (state.pointer.x * 0.15 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-state.pointer.y * 0.1 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={object} />
      <Flame />
    </group>
  );
}

useGLTF.preload(ROCKET_MODEL);

export default function Rocket3D() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setMounted(true), []);

  // Loop motion → 2s gap, but only after the model has loaded (preloader's onReady)
  // so the first cycle plays in view. In editor mode, let Studio drive the playhead.
  useLoopedSequence(loaded && !STUDIO_ENABLED, rocketProject, rocketSheet, MOTION_END);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {mounted && (
        <Canvas dpr={[1, 2]}>
          <SheetProvider sheet={rocketSheet}>
            <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment preset="city" />
            <e.group theatreKey="Rocket" position={[0, 0, 0]} scale={3}>
              <Suspense fallback={null}>
                <Rocket />
              </Suspense>
            </e.group>
          </SheetProvider>
        </Canvas>
      )}

      {/* Heavy model — cover the scene with a percentage preloader until it's in. */}
      {mounted && <Preloader label="Rockets" onReady={() => setLoaded(true)} />}

      {/* Scroll cue — a bright pill button. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <span className="flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-navy/30">
          Scroll
          <span className="animate-bounce text-base leading-none">↓</span>
        </span>
      </div>
    </section>
  );
}
