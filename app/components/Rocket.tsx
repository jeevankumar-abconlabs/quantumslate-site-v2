"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import type { Group } from "three";
import { rocketProject, rocketSheet, STUDIO_ENABLED } from "../theatre/rocket";
import { useLoopedSequence } from "../theatre/useLoopedSequence";
import { normalize } from "./droneInstance";
import Preloader from "./Preloader";

// Last authored keyframe — play 0→here, then a 2s gap, then loop.
const MOTION_END = 2.967;

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
    group.current.rotation.y += (state.pointer.x * 0.15 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-state.pointer.y * 0.1 - group.current.rotation.x) * 0.05;
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={object} />
    </group>
  );
}

useGLTF.preload(ROCKET_MODEL);

// `paused` (home page, scene far offscreen): stop the frameloop and the theatre
// loop so a mounted-but-distant canvas costs nothing per frame.
export default function Rocket3D({ paused = false }: { paused?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setMounted(true), []);

  // Loop motion → 2s gap, but only after the model has loaded (preloader's onReady)
  // so the first cycle plays in view. In editor mode, let Studio drive the playhead.
  useLoopedSequence(loaded && !paused && !STUDIO_ENABLED, rocketProject, rocketSheet, MOTION_END);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {mounted && (
        <Canvas dpr={[1, 2]} frameloop={paused ? "never" : "always"}>
          <SheetProvider sheet={rocketSheet}>
            <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment files="/hdri/potsdamer_platz_1k.hdr" />
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
