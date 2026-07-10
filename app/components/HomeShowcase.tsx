"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import WorkshopTitle from "./WorkshopTitle";
import { WORKSHOPS } from "./Workshops";

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
    <div ref={ref} className="h-[55dvh] w-full md:h-[100dvh]">
      {show && <Scene paused={!near} rememberIntro />}
    </div>
  );
}

// Short two-line teaser below each animation — same copy as the Workshops
// cards (imported so they never drift) — with a Learn More button to the
// workshop's dedicated page, where the detailed content lives.
function WorkshopBlurb({ index }: { index: number }) {
  const { body, href } = WORKSHOPS[index];
  return (
    <section className="flex w-full flex-col items-center px-6 pb-16 pt-2 text-center md:pb-24">
      <p className="max-w-xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
        {body}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-gold hover:text-navy"
      >
        Learn More
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

export default function HomeShowcase() {
  return (
    <>
      {/* md+: titles live inside each scene (model docks left, title on the
          right). Mobile: WorkshopTitle shows each title below its scene.
          Each scene is followed by a two-line blurb + Learn More button. */}
      <LazyStage Scene={WorkshopDrone} />
      <WorkshopTitle label="Drones" />
      <WorkshopBlurb index={0} />
      <LazyStage Scene={RcPlane} />
      <WorkshopTitle label="RC Planes" />
      <WorkshopBlurb index={1} />
      <LazyStage Scene={Rocket3D} />
      <WorkshopTitle label="Rockets" />
      <WorkshopBlurb index={2} />
    </>
  );
}
