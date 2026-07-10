"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import type { PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { workshopProject, workshopSheet, STUDIO_ENABLED } from "../theatre/workshop";
import { useIntroThenLoop } from "../theatre/useLoopedSequence";
import { compensateDockX, useDroneInstance } from "./droneInstance";

// Intro: fly in at centre (0→2.967), then dock to the left (→3.967). After that
// the [3.967, 7.967] segment (one slow full turn while docked) loops forever.
const INTRO_END = 3.967;
const LOOP_END = 7.967;

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
    compensateDockX(group.current, state.viewport.aspect, state.camera as ThreePerspectiveCamera);
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={object} />
    </group>
  );
}

// `paused` (home page, scene far offscreen): stop the frameloop and the theatre
// loop so a mounted-but-distant canvas costs nothing per frame. `rememberIntro`
// (home page): don't replay the intro after a route change back to home.
export default function WorkshopDrone({
  paused = false,
  rememberIntro = false,
}: {
  paused?: boolean;
  rememberIntro?: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // One intro run at centre, then the drone docks left and spins forever.
  // In editor mode, let Studio drive the playhead instead.
  const introDone = useIntroThenLoop(
    mounted && !paused && !STUDIO_ENABLED,
    workshopProject,
    workshopSheet,
    INTRO_END,
    LOOP_END,
    rememberIntro,
  );

  return (
    // Mobile: the camera framing leaves dead space above the model, so the
    // section is shorter than the canvas and the bottom-anchored canvas gets
    // its top cropped away. Desktop: canvas fills the full-viewport section.
    <section className="relative h-[55dvh] w-full overflow-hidden md:h-[100dvh]">
      {mounted && (
        <div className="absolute inset-x-0 bottom-0 h-[70dvh] md:inset-0 md:h-auto">
        <Canvas dpr={[1, 2]} frameloop={paused ? "never" : "always"}>
          <SheetProvider sheet={workshopSheet}>
            <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment files="/hdri/potsdamer_platz_1k.hdr" />
            {/* Static wrapper: compensateDockX cancels the dock-left on narrow screens here. */}
            <group>
              <e.group theatreKey="Drone" position={[0, -1.6, 0]} scale={3}>
                <Suspense fallback={null}>
                  <Drone />
                </Suspense>
              </e.group>
            </group>
          </SheetProvider>
        </Canvas>
        </div>
      )}

      {/* Title fades in on the right once the drone has docked left (md+ only —
          mobile shows the WorkshopTitle section below the scene instead). */}
      <div className="pointer-events-none absolute inset-y-0 right-6 hidden items-center md:flex md:right-[20%]">
        <h1
          className={`text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy transition-opacity duration-700 ${
            introDone ? "opacity-100" : "opacity-0"
          }`}
        >
          Drones
        </h1>
      </div>

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
