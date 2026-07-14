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

// ── Responsive scene framing ─────────────────────────────────────────────
// The theatre keyframes are authored for a 16:9 desktop. The CSS layout
// switches at Tailwind's `md` breakpoint, and the scene framing follows the
// SAME breakpoint (computed from the canvas CSS size, which spans the
// viewport) so the two can never disagree:
//  - phones (<768px wide): the title lives BELOW the scene, so the model
//    spins in place at centre, nudged down clear of the floating navbar;
//  - md+ (tablets & desktops): the desktop dock-left framing, with the dock
//    offset and model scale multiplied by `desktopness` — how the viewport's
//    aspect compares to the authored 16:9 — so a portrait iPad shows the same
//    composition as desktop, just proportionally narrower. Nothing clips and
//    the model never overlaps the in-scene title.
const AUTHORED_ASPECT = 16 / 9;
const MD_BREAKPOINT = 768; // keep in sync with Tailwind's `md:`
export function desktopness(size: { width: number; height: number }) {
  if (size.width < MD_BREAKPOINT) return 0;
  return Math.min(1, size.width / size.height / AUTHORED_ASPECT);
}

// Scale for the inner model group: the authored desktop 0.9 shrinks with the
// framing on md+; phones keep the world-unit clamp (bigger floor so the model
// still reads on small screens).
export function modelScale(
  size: { width: number; height: number },
  worldWidth: number,
) {
  const k = desktopness(size);
  return k > 0 ? 0.72 * k : Math.min(0.72, Math.max(0.4, worldWidth / 7.5));
}

// Phone framing: the canvas is 70dvh tall and bottom-anchored inside a 55dvh
// section, so its top 15dvh is cropped away. Centre the model in the VISIBLE
// strip: shift it down from the canvas centre by half the crop (as a fraction
// of canvas height), after cancelling the model's authored y. Keep the dvh
// numbers in sync with the scene components' h-[70dvh] / h-[55dvh] classes.
const CANVAS_DVH = 70;
const SECTION_DVH = 55;
const MOBILE_CENTER_SHIFT = (CANVAS_DVH - SECTION_DVH) / (2 * CANVAS_DVH);

// Phone-only: sit the flat, wide models (drone, plane) well below the strip
// centre — dead-centred under the navbar they read as floating too high.
// ponytail: eyeballed fraction of canvas height (~9dvh of the 70dvh canvas).
const PHONE_NUDGE_DOWN = 0.13;
export const PHONE_LOW_CENTER = MOBILE_CENTER_SHIFT + PHONE_NUDGE_DOWN;

// Free vertical band on the phone strip below the floating navbar — for TALL
// models (the rocket) whose nose would otherwise slide under it. The band
// runs to the bottom of the strip (the scroll cue lives below the scene, in
// WorkshopTitle), buying a much larger rocket whose centre sits lower, nudged
// down away from the navbar. Returns canvas-height fractions; null on md+,
// where the desktop framing has room.
// ponytail: navbar px eyeballed from the rendered floating navbar.
const NAVBAR_PX = 88;
const BOTTOM_MARGIN_PX = 12;
export function phoneFreeBand(size: { width: number; height: number }) {
  if (desktopness(size) > 0) return null;
  const crop = size.height * ((CANVAS_DVH - SECTION_DVH) / CANVAS_DVH);
  const top = crop + NAVBAR_PX;
  const bottom = size.height - BOTTOM_MARGIN_PX;
  return {
    centerShift: (top + bottom) / 2 / size.height - 0.5,
    heightFrac: (bottom - top) / size.height,
  };
}

// Apply the framing each frame on a static wrapper group AROUND the theatre
// e.group (the e.group itself rotates, so offsetting inside it would swing
// the model on an arm). Call from the model's useFrame with the inner group
// ref — expects <group> → <e.group> → <group ref>.
export function compensateDockX(
  group: Group,
  size: { width: number; height: number },
  camera: PerspectiveCamera,
  centerShift?: number, // phone vertical placement override (rocket fit)
) {
  const eGroup = group.parent;
  const wrapper = eGroup?.parent;
  if (!eGroup || !wrapper || (wrapper as { isScene?: boolean }).isScene) return;
  const k = desktopness(size);
  wrapper.position.x = (k - 1) * eGroup.position.x;
  const viewHeight =
    2 * (camera.position.z - eGroup.position.z) * Math.tan((camera.fov * Math.PI) / 360);
  wrapper.position.y =
    k > 0
      ? 0
      : -eGroup.position.y - (centerShift ?? MOBILE_CENTER_SHIFT) * viewHeight;
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
