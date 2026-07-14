"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import type { Group, PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { rcPlaneProject, rcPlaneSheet, STUDIO_ENABLED } from "../theatre/rcplane";
import { useIntroThenLoop } from "../theatre/useLoopedSequence";
import { compensateDockX, modelScale, normalize, PHONE_LOW_CENTER } from "./droneInstance";
import FadingGrid from "./FadingGrid";
import Preloader from "./Preloader";

const PLANE_MODEL = "/3d-models/rcplane/scene.gltf";
// Intro: spin at centre (0→3.7), then dock to the left (→4.7). After that the
// [4.7, 8.7] segment (one slow full turn while docked) loops forever.
const INTRO_END = 4.7;
const LOOP_END = 8.7;

// The plane GLTF ships no animation clips, so this is just a normalized clone
// (centered ~1-unit box) with the same responsive scale + pointer parallax as the
// drone. Theatre places/animates the wrapping <e.group> on top.
function Plane() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(PLANE_MODEL);
  const object = useMemo(() => normalize(scene), [scene]);

  // The GLTF's spinning part is the "propeller" node — spin it about its own hub.
  const propeller = useMemo(() => object.getObjectByName("propeller"), [object]);

  // Scale follows the framing: proportional to the desktop composition on md+,
  // world-unit clamp on phones (see modelScale).
  const size = useThree((s) => s.size);
  const worldWidth = useThree((s) => s.viewport.width);
  const scale = modelScale(size, worldWidth);

  useFrame((state, delta) => {
    // ponytail: spin knob — bump speed, or switch to .x/.y if it tumbles instead
    // of spinning flat (depends on how the model exported the prop's axis).
    if (propeller) propeller.rotation.y += delta * 25;

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

useGLTF.preload(PLANE_MODEL);

// `paused` (home page, scene far offscreen): stop the frameloop and the theatre
// loop so a mounted-but-distant canvas costs nothing per frame. `rememberIntro`
// (home page): don't replay the intro after a route change back to home.
export default function RcPlane({
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
  // view), then the plane docks left and spins forever. Studio drives in editor mode.
  const introDone = useIntroThenLoop(
    loaded && !paused && !STUDIO_ENABLED,
    rcPlaneProject,
    rcPlaneSheet,
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
          <SheetProvider sheet={rcPlaneSheet}>
            <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment files="/hdri/potsdamer_platz_1k.hdr" />
            {/* Static wrapper: compensateDockX cancels the dock-left on narrow screens here. */}
            <group>
              <e.group theatreKey="Plane" position={[0, 0, 0]} scale={2.4}>
                <Suspense fallback={null}>
                  <Plane />
                </Suspense>
              </e.group>
            </group>
          </SheetProvider>
        </Canvas>
        </div>
      )}

      {/* Cover the scene with a percentage preloader until the model is in. */}
      {mounted && <Preloader label="RC Planes" onReady={() => setLoaded(true)} />}

      {/* Title + description + Learn More fade in on the right once the plane
          has docked left (md+ only — mobile shows WorkshopTitle below). */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-6 hidden flex-col items-start justify-center gap-5 transition-opacity duration-700 md:flex md:right-[12%] lg:right-[16%] ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-[clamp(2rem,5vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          RC Planes
        </h1>
        <p className="max-w-xs text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed text-foreground/70">
          Design and build your own aircraft, then fly it — from maiden flight
          to aerobatic rolls in the final showdown.
        </p>
        <a
          href="/workshops/rc-planes"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-navy/30 transition-all duration-300 hover:scale-105 hover:bg-navy/90"
        >
          Learn More
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
