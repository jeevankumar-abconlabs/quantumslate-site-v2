"use client";

// About Us — editorial layout: big heading + copy on the left, image carousel
// on the right. Solid brand colours only, no gradients.
// Slides are placeholder tiles; drop real photos into /public and swap to <img>.
import { useState } from "react";

const SLIDES = ["Workshop", "Drones", "RC Aviation", "Rocketry"];

export default function About() {
  return (
    <section id="about" className="w-full px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: heading + copy */}
        <div className="flex flex-col">
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
            About Us
          </h1>
          <p className="mt-8 max-w-prose text-justify text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
            QuantumSlate is at the forefront of aerospace education and
            innovation. We specialize in delivering immersive offline workshops
            that transform theoretical knowledge into practical expertise. Our
            mission is to empower the next generation of aerospace engineers and
            enthusiasts through hands-on learning experiences in{" "}
            <span className="font-medium text-navy">drone technology</span>,{" "}
            <span className="font-medium text-navy">RC aviation</span>, and{" "}
            <span className="font-medium text-navy">rocketry</span>.
          </p>
        </div>

        {/* Right: image carousel */}
        <Carousel />
      </div>
    </section>
  );
}

function Carousel() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-navy/10">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((label) => (
            <Slide key={label} label={label} />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2">
        {SLIDES.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={`Show ${label}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-gold" : "w-1.5 bg-navy/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Slide({ label }: { label: string }) {
  return (
    <div className="relative flex h-full w-full shrink-0 items-end bg-navy/[0.04]">
      {/* Faint engineering grid, echoing the hero. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(12,31,60,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,31,60,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <span className="relative m-5 text-xs font-medium uppercase tracking-widest text-navy/50">
        {label}
      </span>
    </div>
  );
}
