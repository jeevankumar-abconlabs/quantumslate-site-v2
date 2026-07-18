"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import type { PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { workshopProject, workshopSheet, STUDIO_ENABLED } from "../theatre/workshop";
import { useIntroThenLoop } from "../theatre/useLoopedSequence";
import { compensateDockX, modelScale, PHONE_LOW_CENTER, useDroneInstance } from "./droneInstance";
import FadingGrid from "./FadingGrid";
import Preloader from "./Preloader";

// Intro: fly in at centre (0→2.967), then dock to the left (→3.967). After that
// the [3.967, 7.967] segment (one slow full turn while docked) loops forever.
const INTRO_END = 3.967;
const LOOP_END = 7.967;

// Identical to the hero drone in DroneModel: the normalized hover clone, the same
// responsive scale (bigger floor so it reads on phones), and the same light pointer
// parallax layered on top of the authored hover.
function Drone() {
  const { group, object } = useDroneInstance();
  // Scale follows the framing: proportional to the desktop composition on md+,
  // world-unit clamp on phones (see modelScale).
  const size = useThree((s) => s.size);
  const worldWidth = useThree((s) => s.viewport.width);
  const scale = modelScale(size, worldWidth);

  useFrame((state) => {
    if (!group.current) return;
    compensateDockX(
      group.current,
      state.size,
      state.camera as ThreePerspectiveCamera,
      PHONE_LOW_CENTER,
    );
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setMounted(true), []);

  // One intro run at centre (only after the model has loaded, so it plays in
  // view), then the drone docks left and spins forever. Studio drives in editor mode.
  const introDone = useIntroThenLoop(
    loaded && !paused && !STUDIO_ENABLED,
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
    <section className="relative h-[55dvh] w-full overflow-hidden md:h-[70dvh]">
      <FadingGrid />
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
              <e.group theatreKey="Drone" position={[0, 0, 0]} scale={2.4}>
                <Suspense fallback={null}>
                  <Drone />
                </Suspense>
              </e.group>
            </group>
          </SheetProvider>
        </Canvas>
        </div>
      )}

      {/* Cover the scene with a percentage preloader until the model is in. */}
      {mounted && <Preloader label="Drones" onReady={() => setLoaded(true)} />}

      {/* Title + description + Learn More fade in on the right once the drone
          has docked left (md+ only — mobile shows WorkshopTitle below). */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-6 hidden flex-col items-start justify-center gap-5 transition-opacity duration-700 md:flex md:right-[12%] lg:right-[16%] ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-[clamp(2rem,5vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          Drones
        </h1>
        <p className="max-w-xs text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed text-foreground/70">
          Build a drone from raw components to first flight — frame, motors,
          wiring, and all. Ends in the head-to-head Drone Olympics™.
        </p>
        <a
          href="/workshops/drones"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-navy/30 transition-all duration-300 hover:scale-105 hover:bg-navy/90"
        >
          Learn More
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
