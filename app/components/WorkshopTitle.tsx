"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Standalone title section that reveals on scroll — shared by the workshop pages
// (Drones, RC Planes, …). Pass the heading text via `label`.
export default function WorkshopTitle({ label }: { label: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const t = ScrollTrigger.create({
      trigger: titleRef.current,
      start: "top 85%",
      onEnter: () =>
        gsap.fromTo(
          titleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        ),
    });
    return () => t.kill();
  }, []);

  return (
    <section className="flex min-h-[40vh] w-full items-center justify-center px-6">
      <h1
        ref={titleRef}
        className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy opacity-0"
      >
        {label}
      </h1>
    </section>
  );
}
