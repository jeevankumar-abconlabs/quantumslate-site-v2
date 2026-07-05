"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { workshopProject, workshopSheet, STUDIO_ENABLED } from "../theatre/workshop";
import { useLoopedSequence } from "../theatre/useLoopedSequence";
import { useDroneInstance } from "./droneInstance";

// Last authored keyframe — play 0→here, then a 2s gap, then loop.
const MOTION_END = 2.967;

// Identical to the hero drone in DroneModel: the normalized hover clone, the same
// responsive scale (bigger floor so it reads on phones), and the same light pointer
// parallax layered on top of the authored hover.
function Drone() {
  const { group, object } = useDroneInstance();
  // viewport.width is in world units, so it's smaller on narrow phones — a lower
  // floor shrinks the drone there while desktop still caps at 0.9.
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
    </group>
  );
}

// `paused` (home page, scene far offscreen): stop the frameloop and the theatre
// loop so a mounted-but-distant canvas costs nothing per frame.
export default function WorkshopDrone({ paused = false }: { paused?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Loop motion → 2s gap. In editor mode, let Studio drive the playhead instead.
  useLoopedSequence(mounted && !paused && !STUDIO_ENABLED, workshopProject, workshopSheet, MOTION_END);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {mounted && (
        <Canvas dpr={[1, 2]} frameloop={paused ? "never" : "always"}>
          <SheetProvider sheet={workshopSheet}>
            <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment files="/hdri/potsdamer_platz_1k.hdr" />
            <e.group theatreKey="Drone" position={[0, -1.6, 0]} scale={3}>
              <Suspense fallback={null}>
                <Drone />
              </Suspense>
            </e.group>
          </SheetProvider>
        </Canvas>
      )}

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
