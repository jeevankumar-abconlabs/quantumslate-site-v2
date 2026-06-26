"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Resize, useAnimations, useGLTF } from "@react-three/drei";
import { Box3, LoopRepeat, Vector3 } from "three";
import type { AnimationClip, Group } from "three";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { SheetProvider, editable as e, PerspectiveCamera } from "@theatre/r3f";
import { sheet, STUDIO_ENABLED, STUDIO_TARGET } from "../theatre/drone";
import { heroSheet } from "../theatre/hero";

const MODEL = "/3d-models/drone/scene.gltf";
const BIND_Y = 5; // the "Center" joint's bind-pose Y

// The hover clip lifts the root joint to Y~16 (skinned, so framing never sees it).
// Rebase that one track to bob around its bind pose instead. Idempotent.
function rebaseHover(animations: AnimationClip[]) {
  for (const clip of animations) {
    for (const track of clip.tracks) {
      if (!track.name.endsWith(".position")) continue;
      const v = track.values;
      let min = Infinity;
      let max = -Infinity;
      for (let i = 1; i < v.length; i += 3) {
        min = Math.min(min, v[i]);
        max = Math.max(max, v[i]);
      }
      if (max < 10) continue; // only the lifted root track
      const offset = (min + max) / 2 - BIND_Y;
      for (let i = 1; i < v.length; i += 3) v[i] -= offset;
    }
  }
}

// Keep the drone a sensible fraction of the screen across viewports: shrink it on
// narrow phones (where a fixed world-size drone would dominate), cap it on desktop.
// ponytail: width-based heuristic; tune the divisor/clamp if framing feels off.
function useResponsiveScale() {
  const width = useThree((s) => s.viewport.width);
  return Math.min(0.9, Math.max(0.68, width / 11));
}

function useHover(group: React.RefObject<Group | null>, animations: AnimationClip[]) {
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const action = actions["hover"];
    if (!action) return;
    action.reset().setLoop(LoopRepeat, Infinity).fadeIn(0.4).play();
    return () => {
      action.fadeOut(0.4);
    };
  }, [actions]);
}

// Intro drone: Theatre choreographs the fly-in; the hover clip loops inside.
function IntroDrone() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL);
  useMemo(() => rebaseHover(animations), [animations]);
  useHover(group, animations);
  const scale = useResponsiveScale();

  return (
    <group scale={4 * scale}>
      <Center>
        <Resize>
          <group ref={group}>
            <primitive object={scene} />
          </group>
        </Resize>
      </Center>
    </group>
  );
}

// Hero drone: an independent skinned clone, placed/animated via the Hero sheet.
function HeroDrone() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL);
  useMemo(() => rebaseHover(animations), [animations]);

  // Normalize the clone to a ~1-unit box centered at origin, deterministically
  // (Resize/Center don't reliably measure a fresh skinned clone).
  const cloned = useMemo(() => {
    const c = skeletonClone(scene);
    c.updateWorldMatrix(true, true);
    const size = new Box3().setFromObject(c).getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    c.scale.setScalar(1 / maxDim);
    c.updateWorldMatrix(true, true);
    const center = new Box3().setFromObject(c).getCenter(new Vector3());
    c.position.sub(center);
    return c;
  }, [scene]);

  useHover(group, animations);
  const scale = useResponsiveScale();

  // Light parallax: ease a small tilt toward the pointer (bones drive the hover,
  // so the group's own rotation is free to use). ponytail: ±0.15rad feels alive
  // without fighting the authored pose; bump the factors if you want more sway.
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += (state.pointer.x * 0.15 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-state.pointer.y * 0.1 - group.current.rotation.x) * 0.05;
  });

  // Scale about the centered clone's origin, so the authored placement holds.
  return (
    <group ref={group} scale={scale}>
      <primitive object={cloned} />
    </group>
  );
}

useGLTF.preload(MODEL);

export default function DroneModel({ revealed }: { revealed: boolean }) {
  // In editor mode, show whichever drone is being authored (NEXT_PUBLIC_THEATRE_TARGET).
  const showIntro = STUDIO_ENABLED ? STUDIO_TARGET === "intro" : !revealed;
  const showHero = STUDIO_ENABLED ? STUDIO_TARGET === "hero" : revealed;

  return (
    <Canvas dpr={[1, 2]}>
      <SheetProvider sheet={sheet}>
        {/* Camera and intro drone are on the "Drone Scene" sheet. */}
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 8]} fov={40} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Environment preset="city" />

        {showIntro && (
          <e.group theatreKey="Drone">
            <Suspense fallback={null}>
              <IntroDrone />
            </Suspense>
          </e.group>
        )}

        {showHero && (
          <SheetProvider sheet={heroSheet}>
            <e.group theatreKey="HeroDrone" position={[0, -1.6, 0]} scale={3}>
              <Suspense fallback={null}>
                <HeroDrone />
              </Suspense>
            </e.group>
          </SheetProvider>
        )}
      </SheetProvider>
    </Canvas>
  );
}
