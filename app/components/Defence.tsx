"use client";

// Defence — a 3D coverflow gallery (client sketch: rotating photo slides + a
// short caption below). Built on framer-motion (already installed) so the
// spring motion is smooth without pulling in a carousel library.
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SLIDES = [
  { alt: "Classroom Training", caption: "UAV systems training for army personnel, from airframe anatomy to flight electronics." },
  { alt: "Field Briefing", caption: "Fixed-wing UAV briefing with unit officers ahead of a field flying session." },
  { alt: "Hands-On Instruction", caption: "Hands-on aircraft handling instruction with troops on the parade ground." },
  { alt: "Outdoor Build Session", caption: "Airframes, electronics, and tools laid out for an outdoor assembly session." },
  { alt: "Range Operations", caption: "Tethered drone operations over the range for persistent aerial observation." },
  { alt: "Tethered Quadcopter", caption: "Tethered quadcopter staged on its pad ahead of a surveillance flight." },
  { alt: "Field Trials", caption: "Custom-built surveillance quadcopter holding a low hover during field trials." },
  { alt: "Persistent Surveillance", caption: "A powered tether keeps the aircraft on station for long-endurance monitoring." },
].map((s, i) => ({ ...s, src: `/defence-page-loop/defence-page-${i + 1}.webp` }));

export default function Defence() {
  const n = SLIDES.length;
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  // Wrap-around navigation so the ring loops seamlessly in either direction.
  const go = (i: number) => setActive(((i % n) + n) % n);

  // Auto-advance every 3s. Re-arms on each `active` change, so manual nav also
  // resets the clock. Pauses only for reduced-motion users.
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), 3000);
    return () => clearTimeout(t);
  }, [active, reduce, n]);

  return (
    // overflow-x-clip: side cards translate past the viewport edge; clip them
    // here so they can't widen the page on mobile (clip, not hidden, so no
    // scroll container and vertical overflow stays visible).
    <section id="defence" className="w-full overflow-x-clip px-6 py-6 md:px-12 md:py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          Defence
        </h1>
        <p className="mt-5 max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
          At QuantumSlate, defence innovation forms the core of our research
          and development efforts. Modern defence operations increasingly rely
          on autonomous systems, real-time intelligence, aerial surveillance,
          and advanced robotics. We are committed to developing
          technologies that strengthen operational capabilities while reducing
          human risk in complex environments.
        </p>

        {/* ── 3D coverflow ── */}
        <div
          className="relative mt-14 flex h-[clamp(260px,42vw,460px)] items-center justify-center [perspective:1600px]"
          role="group"
          aria-roledescription="carousel"
        >
          <div className="relative h-full w-[clamp(240px,52vw,440px)] [transform-style:preserve-3d]">
            {SLIDES.map((slide, i) => {
              // Shortest circular distance, so cards wrap around the ring.
              let offset = i - active;
              if (offset > n / 2) offset -= n;
              else if (offset < -n / 2) offset += n;
              const abs = Math.abs(offset);
              const hidden = abs > 2;
              return (
                <motion.button
                  key={slide.alt}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={slide.alt}
                  aria-current={i === active}
                  className="absolute inset-0 origin-center cursor-pointer overflow-hidden border border-navy/10 bg-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  style={{ zIndex: 10 - abs, pointerEvents: hidden ? "none" : "auto" }}
                  animate={{
                    x: reduce ? `${offset * 100}%` : `${offset * 58}%`,
                    rotateY: reduce ? 0 : offset * -38,
                    z: -abs * 180,
                    scale: Math.max(1 - abs * 0.16, 0.62),
                    opacity: hidden ? 0 : 1,
                    filter: i === active ? "brightness(1)" : "brightness(0.7)",
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }
                  }
                >
                  {/* alt="" — the button's aria-label already names the slide */}
                  <img
                    src={slide.src}
                    alt=""
                    loading={abs > 1 ? "lazy" : "eager"}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Arrows — loop, so never disabled */}
          <Arrow side="left" onClick={() => go(active - 1)} />
          <Arrow side="right" onClick={() => go(active + 1)} />
        </div>

        {/* ── Caption + dots ── */}
        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-6 text-center">
          <div className="min-h-[3.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70"
              >
                <span className="font-bold text-navy">{SLIDES[active].alt}.</span>{" "}
                {SLIDES[active].caption}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.alt}
                type="button"
                aria-label={`Show ${s.alt}`}
                aria-current={i === active}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-gold" : "w-1.5 bg-navy/25 hover:bg-navy/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 z-20 -translate-y-1/2 rounded-full border border-navy/10 bg-background/70 p-3 text-navy backdrop-blur-md transition-all hover:scale-110 ${
        side === "left" ? "left-0 md:-left-2" : "right-0 md:-right-2"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {side === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}
