"use client";

// One place every animated drone on the site goes through. The GLTF is loaded
// and cached ONCE by useGLTF (no re-download), but each caller gets its OWN
// skinned clone — independent skeleton + AnimationMixer — so no two drones ever
// fight over a single shared Object3D. Add a new drone scene? Call this hook;
// don't render the raw cached `scene`.
import { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Box3, LoopRepeat, Vector3 } from "three";
import type { AnimationClip, Group, Object3D, PerspectiveCamera } from "three";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";

export const DRONE_MODEL = "/3d-models/drone/scene.gltf";
const BIND_Y = 5; // the "Center" joint's bind-pose Y

// The hover clip lifts the root joint to Y~16 (skinned, so framing never sees it).
// Rebase that one track to bob around its bind pose instead. Idempotent — safe to
// run per instance even though the clips are shared.
export function rebaseHover(animations: AnimationClip[]) {
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

// Deterministically normalize a fresh skinned clone to a ~1-unit box centered at
// the origin. drei's <Center>/<Resize> can't reliably measure a skinned clone
// (it renders scaled to ~0 → invisible/tiny), so do it by hand.
export function normalize(scene: Object3D): Object3D {
  const c = skeletonClone(scene);
  c.updateWorldMatrix(true, true);
  const size = new Box3().setFromObject(c).getSize(new Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  c.scale.setScalar(1 / maxDim);
  c.updateWorldMatrix(true, true);
  const center = new Box3().setFromObject(c).getCenter(new Vector3());
  c.position.sub(center);
  return c;
}

// Theatre keyframes frame the models for the desktop layout: docked left
// (title on the right) and fairly high. On mobile the title lives below the
// scene instead, so the model should spin in place at centre, nudged down
// clear of the floating navbar. Each frame, counteract the e.group's authored
// x — and add the downward nudge — on a static wrapper group AROUND it (the
// e.group itself rotates, so offsetting inside it would swing the model on an
// arm): portrait screens get the full correction (k=0), and it fades out as
// the canvas widens until the authored framing at 16:9 (k=1). Call from the
// model's useFrame with the inner group ref — expects <group> → <e.group> →
// <group ref>.
const AUTHORED_ASPECT = 16 / 9;
const CENTERED_ASPECT = 1; // portrait and squarer: full correction
// ponytail: eyeballed against iPhone-height viewports — model drops ~8% of the
// canvas height, expressed at the model's own depth so all three scenes share it.
const MOBILE_DROP_FRAC = 0.08;
export function compensateDockX(group: Group, aspect: number, camera: PerspectiveCamera) {
  const eGroup = group.parent;
  const wrapper = eGroup?.parent;
  if (!eGroup || !wrapper || (wrapper as { isScene?: boolean }).isScene) return;
  const k = Math.min(1, Math.max(0, (aspect - CENTERED_ASPECT) / (AUTHORED_ASPECT - CENTERED_ASPECT)));
  wrapper.position.x = (k - 1) * eGroup.position.x;
  const viewHeight =
    2 * (camera.position.z - eGroup.position.z) * Math.tan((camera.fov * Math.PI) / 360);
  wrapper.position.y = (k - 1) * MOBILE_DROP_FRAC * viewHeight;
}

// A self-contained drone instance: its own normalized clone + the looping hover
// clip already playing. Render { object } inside a <group ref={group}> and place
// that group however the scene needs (Theatre, manual scale, etc).
export function useDroneInstance() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(DRONE_MODEL);
  useMemo(() => rebaseHover(animations), [animations]);
  const object = useMemo(() => normalize(scene), [scene]);

  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const a = actions["hover"];
    if (!a) return;
    a.reset().setLoop(LoopRepeat, Infinity).fadeIn(0.4).play();
    return () => {
      a.fadeOut(0.4);
    };
  }, [actions]);

  return { group, object };
}

useGLTF.preload(DRONE_MODEL);
