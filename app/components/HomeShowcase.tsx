"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentType } from "react";
import WorkshopTitle from "./WorkshopTitle";

// The three workshop 3D scenes, reused verbatim on the home page. Dynamic +
// ssr:false keeps their three.js/theatre chunks (and each component's
// module-level useGLTF.preload) out of the initial load — the drone GLTF is
// already cached by the hero, the plane/rocket fetch just-in-time below.
const WorkshopDrone = dynamic(() => import("./WorkshopDrone"), { ssr: false });
const RcPlane = dynamic(() => import("./RcPlane"), { ssr: false });
const Rocket3D = dynamic(() => import("./Rocket"), { ssr: false });

// Mounts a scene only once its placeholder scrolls within a viewport of view,
// so the scenes load one by one as the user approaches — never all at once.
// Once mounted a scene stays mounted (its WebGL context and compiled shaders
// are expensive to rebuild), but its render loop only runs while the stage is
// in sight, so offscreen canvases cost nothing per frame and intros can't
// play unseen.
// The div reserves the full-viewport slot so content below never jumps.
function LazyStage({
  Scene,
}: {
  Scene: ComponentType<{ paused?: boolean; rememberIntro?: boolean }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Before the stylesheet applies, every h-[100dvh] placeholder is 0px
    // tall, the page collapses into the viewport, and everything reports
    // "intersecting" at once. Ignore until the div has real height.

    // Mount (and start loading assets) one viewport early…
    const mountIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.height === 0) return;
        if (entry.isIntersecting) {
          setShow(true);
          mountIo.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    // …but only animate once the MODEL is actually in sight: the model sits in
    // the middle of the stage, so waiting for ~60% of the stage guarantees the
    // intro plays in front of the user instead of just below the fold. Pause
    // again only when the stage is fully offscreen — never freeze a model the
    // user can still see.
    const playIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.height === 0) return;
        if (entry.intersectionRatio >= 0.6) setNear(true);
        else if (!entry.isIntersecting) setNear(false);
      },
      { threshold: [0, 0.6] },
    );
    mountIo.observe(el);
    playIo.observe(el);
    return () => {
      mountIo.disconnect();
      playIo.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="h-[55dvh] w-full md:h-[70dvh]">
      {show && <Scene paused={!near} rememberIntro />}
    </div>
  );
}

export default function HomeShowcase() {
  return (
    <>
      {/* md+: titles + descriptions live inside each scene (model docks left,
          content on the right). Mobile: WorkshopTitle shows each title below
          its scene. */}
      <LazyStage Scene={WorkshopDrone} />
      <WorkshopTitle
        label="Drones"
        description="Build a drone from raw components to first flight: frame, motors, wiring, and all. Ends in the head-to-head Drone Olympics™."
        href="/workshops/drones"
      />
      <LazyStage Scene={RcPlane} />
      <WorkshopTitle
        label="Aircraft"
        description="Design and build your own aircraft, then fly it, from maiden flight to aerobatic rolls in the Aircraft Olympics™."
        href="/workshops/rc-planes"
      />
      <LazyStage Scene={Rocket3D} />
      <WorkshopTitle
        label="Rockets"
        description="Engineer a real rocket with fins, motor, and parachute recovery, and send it up with a live countdown launch."
        href="/workshops/rockets"
      />
    </>
  );
}
