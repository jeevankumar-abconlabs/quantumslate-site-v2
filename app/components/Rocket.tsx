"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import type { Group, PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { rocketProject, rocketSheet, STUDIO_ENABLED } from "../theatre/rocket";
import { useIntroThenLoop } from "../theatre/useLoopedSequence";
import { compensateDockX, normalize } from "./droneInstance";
import Preloader from "./Preloader";

// Intro: spin at centre (0→2.967), then dock to the left (→3.967). After that
// the [3.967, 7.967] segment (one slow full turn while docked) loops forever.
const INTRO_END = 3.967;
const LOOP_END = 7.967;

const ROCKET_MODEL = "/3d-models/rocket/Yellow_Toy_Rocket.gltf";

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
    compensateDockX(group.current, state.viewport.aspect, state.camera as ThreePerspectiveCamera);
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={object} />
    </group>
  );
}

useGLTF.preload(ROCKET_MODEL);

// `paused` (home page, scene far offscreen): stop the frameloop and the theatre
// loop so a mounted-but-distant canvas costs nothing per frame. `rememberIntro`
// (home page): don't replay the intro after a route change back to home.
export default function Rocket3D({
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
  // view), then the rocket docks left and spins forever. Studio drives in editor mode.
  const introDone = useIntroThenLoop(
    loaded && !paused && !STUDIO_ENABLED,
    rocketProject,
    rocketSheet,
    INTRO_END,
    LOOP_END,
    rememberIntro,
  );

  return (
    // Mobile: section shorter than the bottom-anchored canvas, cropping the
    // camera's dead space off the top. Desktop: canvas fills the section.
    <section className="relative h-[55dvh] w-full overflow-hidden md:h-[100dvh]">
      {mounted && (
        <div className="absolute inset-x-0 bottom-0 h-[70dvh] md:inset-0 md:h-auto">
        <Canvas dpr={[1, 2]} frameloop={paused ? "never" : "always"}>
          <SheetProvider sheet={rocketSheet}>
            <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment files="/hdri/potsdamer_platz_1k.hdr" />
            {/* Static wrapper: compensateDockX cancels the dock-left on narrow screens here. */}
            <group>
              <e.group theatreKey="Rocket" position={[0, 0, 0]} scale={3}>
                <Suspense fallback={null}>
                  <Rocket />
                </Suspense>
              </e.group>
            </group>
          </SheetProvider>
        </Canvas>
        </div>
      )}

      {/* Heavy model — cover the scene with a percentage preloader until it's in. */}
      {mounted && <Preloader label="Rockets" onReady={() => setLoaded(true)} />}

      {/* Title fades in on the right once the rocket has docked left (md+ only —
          mobile shows the WorkshopTitle section below the scene instead). */}
      <div className="pointer-events-none absolute inset-y-0 right-6 hidden items-center md:flex md:right-[20%]">
        <h1
          className={`text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy transition-opacity duration-700 ${
            introDone ? "opacity-100" : "opacity-0"
          }`}
        >
          Rockets
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
