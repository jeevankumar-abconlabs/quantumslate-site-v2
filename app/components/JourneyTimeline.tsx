"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Step = { title: string; body: string; finale?: boolean };

// Scroll-driven journey timeline: a navy rail fills top-to-bottom as the user
// scrolls, and each step brightens from dimmed to full as it crosses the
// viewport — so the step you're reading is always the highlighted one.
export default function JourneyTimeline({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLOListElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // End the rail at the LAST badge's centre, not the bottom of the list —
    // the last step's text would otherwise leave a dangling line below it.
    const size = () => {
      const last = root.current?.querySelector<HTMLElement>("li:last-child");
      if (!last) return;
      const h = `${last.offsetTop}px`;
      if (track.current) track.current.style.height = h;
      if (rail.current) rail.current.style.height = h;
    };
    size();
    ScrollTrigger.addEventListener("refreshInit", size);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rail.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-step]", root.current).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.25, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
            },
          },
        );
      });
    }, root);
    return () => {
      ScrollTrigger.removeEventListener("refreshInit", size);
      ctx.revert();
    };
  }, []);

  return (
    <ol ref={root} className="relative mt-12">
      {/* Rail: faint track + scroll-filled navy line, centred on the badges;
          height (first badge → last badge) is set in the effect above. */}
      <div ref={track} className="absolute left-[17px] top-[17px] w-px bg-navy/10" />
      <div
        ref={rail}
        className="absolute left-[17px] top-[17px] w-px origin-top bg-navy"
        style={{ transform: "scaleY(0)" }}
      />
      {steps.map((step, i) => (
        <li
          key={step.title}
          data-step
          className="relative grid grid-cols-[35px_1fr] gap-x-6 pb-14 last:pb-0 md:gap-x-8"
        >
          <span
            className={`z-10 flex h-[35px] w-[35px] items-center justify-center rounded-full text-sm font-bold ${
              step.finale
                ? "bg-gold text-navy"
                : "bg-navy text-background"
            }`}
          >
            {i + 1}
          </span>
          <div className="pt-1">
            <h4
              className={`text-[clamp(1.1rem,2vw,1.4rem)] font-bold tracking-tight ${
                step.finale ? "text-gold" : "text-navy"
              }`}
            >
              {step.title}
            </h4>
            <p className="mt-2 max-w-xl text-[clamp(0.95rem,1.4vw,1.05rem)] leading-relaxed text-foreground/70">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
