// Competitions page:
//  1. NEW — 2026 Olympics hero: two poster images side-by-side with
//     registration + rulebook buttons for each event.
//  2. EXISTING (pushed down) — previous national-level competitions section
//     re-titled "Our Previous Competitions".

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ── 2026 Olympics data ───────────────────────────────────────────────── */

const OLYMPICS_2026 = [
  {
    name: "Drone Olympics",
    poster: "/olympicsposters/Drone_Olympics_2026.webp",
    alt: "Drone Olympics 2026 poster — QuantumSlate presents the national drone flying competition at Velammal Bodhi Campus, Ponneri, Chennai",
    registerHref:
      "https://docs.google.com/forms/d/e/1FAIpQLSdPZydI9ZF_MPhWKVK5F7ye3gHPE6QgT1430LzJLsQfiEKgpw/viewform",
    rulebookHref:
      "https://drive.google.com/file/d/1FHSjYSzaCpjd-7gaJKtoMTQvEZG2MCfE/view",
  },
  {
    name: "Aircraft Olympics",
    poster: "/olympicsposters/Aircraft_Olympics_2026.webp",
    alt: "Aircraft Olympics 2026 poster — QuantumSlate presents the national aeromodelling competition at Velammal Bodhi Campus, Ponneri, Chennai",
    registerHref:
      "https://docs.google.com/forms/d/e/1FAIpQLSeITSNuomKNYOVj-UHF15ik0biO_72f8hrFEb4l9_gTfn_Vbg/viewform",
    rulebookHref:
      "https://drive.google.com/file/d/1TAv6EJnqgaCJXl5L1ZTx1Zpu-bS8d61Z/view",
  },
];

/* ── Previous competitions (existing data, unchanged) ─────────────── */

const PREVIOUS_OLYMPICS = [
  {
    name: "Drone Olympics",
    href: "/workshops/drones",
    tagline: "Head-to-head flying showdown",
    copy: "Every quadcopter built in the drone workshop meets the field in one final gate run.",
  },
  {
    name: "Aircraft Olympics",
    href: "/workshops/rc-planes",
    tagline: "Aerobatics showdown",
    copy: "Every fixed-wing aircraft built in the aircraft workshop earns its wings in the sky.",
  },
];

/* ── Fade-in on scroll hook ──────────────────────────────────────────── */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function Competitions() {
  const heroFade = useFadeIn();
  const prevFade = useFadeIn();

  return (
    <section id="competitions" className="w-full">
      {/* ═══════════════════════════════════════════════════════════════
          2026 Olympics — Hero Section
          ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-navy px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-10 text-center text-[clamp(1.6rem,5vw,3.25rem)] font-black uppercase leading-[1.05] tracking-tight text-background">
            Drone &amp; Aircraft Olympics™ 2026
          </h1>

          {/* Poster grid */}
          <div
            ref={heroFade.ref}
            className={`mt-10 grid gap-10 md:grid-cols-2 transition-all duration-700 ${
              heroFade.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {OLYMPICS_2026.map((evt) => (
              <div key={evt.name} className="flex flex-col items-center">
                {/* Poster */}
                <div
                  className="relative w-full overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.02]"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src={evt.poster}
                    alt={evt.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
                  {/* Register */}
                  <a
                    href={evt.registerHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#F1E8DA] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-navy shadow-lg transition-all duration-200 hover:bg-[#e8ddd0] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                    Register Now
                  </a>

                  {/* Rule Book */}
                  <a
                    href={evt.rulebookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#F1E8DA] bg-transparent px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[#F1E8DA] transition-all duration-200 hover:bg-[#F1E8DA] hover:text-navy hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    Rule Book
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          Our Previous Competitions — existing content, pushed down
          ═══════════════════════════════════════════════════════════════ */}
      <div className="px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          {/* ── Title band: full-width navy bar on top, untouched photo below ── */}
          <div
            ref={prevFade.ref}
            className={`transition-all duration-700 ${
              prevFade.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="mb-6 text-center text-[clamp(1.5rem,4vw,2.5rem)] font-black uppercase leading-[1.1] tracking-tight text-navy">
              Our Previous Competitions
            </h2>
            <h3 className="whitespace-nowrap bg-navy px-5 py-4 text-center text-[clamp(1.1rem,4.3vw,3.25rem)] font-black uppercase leading-none tracking-tight text-background md:px-10 md:py-7">
              National Level Competitions
            </h3>
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[21/9]">
              <Image
                src="/competitions/title-card.webp"
                alt="QuantumSlate competitors with their fleet of hand-built aircraft and drones at a national event"
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
            </div>
          </div>

          {/* ── Face-off: every build leads to one of two flagship showdowns ── */}
          <div className="mt-16 md:mt-24">
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-navy/50">
              Every Build Leads Here
            </p>
            <h3 className="mt-3 text-center text-[clamp(1.75rem,4vw,2.75rem)] font-black uppercase leading-[1] tracking-tight text-navy">
              The Showdown Awaits
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-center text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              Every student who completes a QuantumSlate workshop gets to
              compete in its finale. Build a drone, and you fly it in the
              Drone Olympics™. Build an aircraft, and you fly it in the
              Aircraft Olympics™.
            </p>

            <div className="relative mt-10 flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-3">
              {PREVIOUS_OLYMPICS.map((o, i) => (
                <Link
                  key={o.name}
                  href={o.href}
                  className={`group relative flex flex-col justify-between overflow-hidden bg-navy px-8 py-14 text-center transition-colors hover:bg-navy/90 md:px-10 md:py-20 ${
                    i === 0 ? "order-1" : "order-3"
                  } md:order-none`}
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                      {o.tagline}
                    </p>
                    <h4 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-black uppercase leading-[0.95] tracking-tight text-background">
                      {o.name}
                      <sup className="ml-1 text-[0.35em] font-bold align-super">
                        ™
                      </sup>
                    </h4>
                    <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-background/70">
                      {o.copy}
                    </p>
                  </div>
                  <span className="mx-auto mt-8 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold transition-colors group-hover:text-background">
                    See the Workshop
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </Link>
              ))}

              {/* Gold "AND" badge — centred over the seam on desktop, an inline
                  divider between the stacked panels on mobile. */}
              <div className="order-2 pointer-events-none relative z-10 -my-[22px] flex justify-center md:absolute md:inset-y-0 md:left-1/2 md:order-none md:my-0 md:-translate-x-1/2 md:items-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-gold text-sm font-black uppercase tracking-widest text-navy">
                  And
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
