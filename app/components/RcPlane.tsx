"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import type { Group } from "three";
import { rcPlaneProject, rcPlaneSheet, STUDIO_ENABLED } from "../theatre/rcplane";
import { useLoopedSequence } from "../theatre/useLoopedSequence";
import { normalize } from "./droneInstance";

const PLANE_MODEL = "/3d-models/rcplane/scene.gltf";
// Last authored keyframe — play 0→here, then a 2s gap, then loop.
const MOTION_END = 3.7;

// The plane GLTF ships no animation clips, so this is just a normalized clone
// (centered ~1-unit box) with the same responsive scale + pointer parallax as the
// drone. Theatre places/animates the wrapping <e.group> on top.
function Plane() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(PLANE_MODEL);
  const object = useMemo(() => normalize(scene), [scene]);

  // The GLTF's spinning part is the "propeller" node — spin it about its own hub.
  const propeller = useMemo(() => object.getObjectByName("propeller"), [object]);

  const width = useThree((s) => s.viewport.width);
  const scale = Math.min(0.9, Math.max(0.5, width / 6));

  useFrame((state, delta) => {
    // ponytail: spin knob — bump speed, or switch to .x/.y if it tumbles instead
    // of spinning flat (depends on how the model exported the prop's axis).
    if (propeller) propeller.rotation.y += delta * 25;

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

useGLTF.preload(PLANE_MODEL);

// `paused` (home page, scene far offscreen): stop the frameloop and the theatre
// loop so a mounted-but-distant canvas costs nothing per frame.
export default function RcPlane({ paused = false }: { paused?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Loop motion → 2s gap. In editor mode, let Studio drive the playhead instead.
  useLoopedSequence(mounted && !paused && !STUDIO_ENABLED, rcPlaneProject, rcPlaneSheet, MOTION_END);

  return (
    // Mobile: section shorter than the bottom-anchored canvas, cropping the
    // camera's dead space off the top. Desktop: canvas fills the section.
    <section className="relative h-[55dvh] w-full overflow-hidden md:h-[100dvh]">
      {mounted && (
        <div className="absolute inset-x-0 bottom-0 h-[70dvh] md:inset-0 md:h-auto">
        <Canvas dpr={[1, 2]} frameloop={paused ? "never" : "always"}>
          <SheetProvider sheet={rcPlaneSheet}>
            <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment files="/hdri/potsdamer_platz_1k.hdr" />
            <e.group theatreKey="Plane" position={[0, 0, 0]} scale={3}>
              <Suspense fallback={null}>
                <Plane />
              </Suspense>
            </e.group>
          </SheetProvider>
        </Canvas>
        </div>
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
