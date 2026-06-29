"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import type { Group } from "three";
import { rcPlaneProject, rcPlaneSheet, STUDIO_ENABLED } from "../theatre/rcplane";
import { normalize } from "./droneInstance";

const PLANE_MODEL = "/3d-models/rcplane/scene.gltf";

// The plane GLTF ships no animation clips, so this is just a normalized clone
// (centered ~1-unit box) with the same responsive scale + pointer parallax as the
// drone. Theatre places/animates the wrapping <e.group> on top.
function Plane() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(PLANE_MODEL);
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

useGLTF.preload(PLANE_MODEL);

export default function RcPlane() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Play the authored animation on a loop. In editor mode, let Studio drive the
  // playhead instead so you can scrub and author keyframes.
  useEffect(() => {
    if (!mounted) return;
    if (STUDIO_ENABLED) return;
    rcPlaneProject.ready.then(() => {
      rcPlaneSheet.sequence.pause();
      rcPlaneSheet.sequence.position = 0;
      rcPlaneSheet.sequence.play({ iterationCount: Infinity });
    });
    return () => rcPlaneSheet.sequence.pause();
  }, [mounted]);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {mounted && (
        <Canvas dpr={[1, 2]}>
          <SheetProvider sheet={rcPlaneSheet}>
            <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Environment preset="city" />
            <e.group theatreKey="Plane" position={[0, 0, 0]} scale={3}>
              <Suspense fallback={null}>
                <Plane />
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
