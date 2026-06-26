"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, useAnimations, useGLTF } from "@react-three/drei";
import type { Group } from "three";

const MODEL = "/3d-models/drone/scene.gltf";
const BIND_Y = 5; // the "Center" joint's bind-pose Y

function Drone({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL);

  // The hover clip lifts the root joint to Y~16 (skinned, so the camera framing
  // never sees it and the drone shoots to the top). Rebase that one track to bob
  // around its bind pose instead, keeping the hover motion but staying centred.
  useMemo(() => {
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
        if (max < 10) continue; // only the lifted root track; idempotent on HMR
        const offset = (min + max) / 2 - BIND_Y;
        for (let i = 1; i < v.length; i += 3) v[i] -= offset;
      }
    }
  }, [animations]);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions["hover"]; // baked idle animation
    if (!action) return;
    if (animate) action.reset().fadeIn(0.4).play();
    else action.stop();
    return () => {
      action.fadeOut(0.4);
    };
  }, [animate, actions]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL);

export default function DroneModel() {
  // Respect prefers-reduced-motion (skill mandate for motion above static).
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimate(!m.matches);
    update();
    m.addEventListener("change", update);
    return () => m.removeEventListener("change", update);
  }, []);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 40 }}>
      <Suspense fallback={null}>
        {/* Stage auto-frames and lights the model, so it stays centred at any screen size. */}
        <Stage environment="city" intensity={0.4} adjustCamera={1.1} shadows="contact">
          <Drone animate={animate} />
        </Stage>
      </Suspense>
    </Canvas>
  );
}
