"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import type { Group, PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { rocketProject, rocketSheet, STUDIO_ENABLED } from "../theatre/rocket";
import { useIntroThenLoop } from "../theatre/useLoopedSequence";
import { compensateDockX, modelScale, normalize, phoneFreeBand } from "./droneInstance";
import FadingGrid from "./FadingGrid";
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

  // Scale follows the framing: proportional to the desktop composition on md+,
  // world-unit clamp on phones (see modelScale). The rocket is a TALL model
  // (its normalized 1-unit max-dim is the length), so on phones additionally
  // cap the scale to the free band between the navbar and the scroll pill, and
  // centre it in that band — otherwise the nose slides under the navbar.
  // ponytail: 5 = this scene's theatre-authored e.group scale.
  const size = useThree((s) => s.size);
  const worldWidth = useThree((s) => s.viewport.width);
  const worldHeight = useThree((s) => s.viewport.height);
  const band = phoneFreeBand(size);
  const scale = Math.min(
    modelScale(size, worldWidth),
    band ? (band.heightFrac * worldHeight) / 5 : Infinity,
  );

  useFrame((state) => {
    if (!group.current) return;
    compensateDockX(
      group.current,
      state.size,
      state.camera as ThreePerspectiveCamera,
      phoneFreeBand(state.size)?.centerShift,
    );
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
    <section className="relative h-[55dvh] w-full overflow-hidden md:h-[70dvh]">
      <FadingGrid />
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
              <e.group theatreKey="Rocket" position={[0, 0, 0]} scale={2.4}>
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

      {/* Title + description + Learn More fade in on the right once the rocket
          has docked left (md+ only — mobile shows WorkshopTitle below). */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-6 hidden flex-col items-start justify-center gap-5 transition-opacity duration-700 md:flex md:right-[12%] lg:right-[16%] ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-[clamp(2rem,5vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          Rockets
        </h1>
        <p className="max-w-xs text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed text-foreground/70">
          Engineer a real rocket with fins, motor, and parachute recovery, and
          send it up with a live countdown launch.
        </p>
        <a
          href="/workshops/rockets"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-navy/30 transition-all duration-300 hover:scale-105 hover:bg-navy/90"
        >
          Learn More
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
