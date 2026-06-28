"use client";

// The Drones workshop scene. The drone banks in from the left, hovers, then
// exits — and the "Drones" title fades in once it's gone. The flight is a plain
// useFrame timeline (not Theatre): it always plays on load, every load, no
// timeline-subscription race. Tune the phase times / positions below.
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import type { Group } from "three";
import { useDroneInstance } from "./droneInstance";

const IN_END = 1.2; // s — entered and reached center
const HOLD_END = 2.9; // s — hovers at center until here
const OUT_END = 4.1; // s — exited to the left by here
const ENTER_X = -9; // start/exit x, off-screen left (world units)

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

function Drone({ onGone }: { onGone: () => void }) {
  // Own normalized clone + looping hover, independent of every other drone.
  const { group, object } = useDroneInstance();
  const flight = useRef<Group>(null);
  const t = useRef(0);
  const done = useRef(false);

  // Keep the drone a sensible fraction of the screen across viewports.
  const width = useThree((s) => s.viewport.width);
  const scale = Math.min(2.6, Math.max(1.4, width / 4));

  useFrame((_, delta) => {
    const g = flight.current;
    if (!g) return;
    t.current += delta;
    const time = t.current;
    if (time < IN_END) {
      const p = easeInOut(time / IN_END);
      g.position.x = ENTER_X * (1 - p);
      g.rotation.z = (1 - p) * 0.35; // bank out of the entry
    } else if (time < HOLD_END) {
      g.position.x = 0;
      g.rotation.z = 0;
    } else if (time < OUT_END) {
      const p = easeInOut((time - HOLD_END) / (OUT_END - HOLD_END));
      g.position.x = ENTER_X * p;
      g.rotation.z = -p * 0.35; // bank into the exit
    } else if (!done.current) {
      done.current = true;
      onGone();
    }
  });

  return (
    <group ref={flight} scale={scale} position-x={ENTER_X}>
      <group ref={group}>
        <primitive object={object} />
      </group>
    </group>
  );
}

export default function WorkshopDrone() {
  // Client-only: gate the Canvas behind mount so three never runs during SSR.
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => setMounted(true), []);

  const onGone = useCallback(() => setGone(true), []);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {mounted && (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Environment files="/hdri/potsdamer_platz_1k.hdr" />
          <Suspense fallback={null}>
            <Drone onGone={onGone} />
          </Suspense>
        </Canvas>
      )}

      {/* The title appears once the drone has flown off. */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out ${
          gone ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          Drones
        </h1>
      </div>
    </section>
  );
}
