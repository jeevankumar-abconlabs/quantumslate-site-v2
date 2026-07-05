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
// are expensive to rebuild), but its render loop pauses whenever it drifts
// more than a viewport offscreen so distant canvases cost nothing per frame.
// The div reserves the full-viewport slot so content below never jumps.
function LazyStage({ Scene }: { Scene: ComponentType<{ paused?: boolean }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Before the stylesheet applies, every h-[100dvh] placeholder is 0px
        // tall, the page collapses into the viewport, and everything reports
        // "intersecting" at once. Ignore until the div has real height.
        if (entry.boundingClientRect.height === 0) return;
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setShow(true);
      },
      { rootMargin: "100% 0px" }, // start loading one viewport early
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-[55dvh] w-full md:h-[100dvh]">
      {show && <Scene paused={!near} />}
    </div>
  );
}

export default function HomeShowcase() {
  return (
    <>
      <LazyStage Scene={WorkshopDrone} />
      <WorkshopTitle label="Drones" />
      <LazyStage Scene={RcPlane} />
      <WorkshopTitle label="RC Planes" />
      <LazyStage Scene={Rocket3D} />
      <WorkshopTitle label="Rockets" />
    </>
  );
}
