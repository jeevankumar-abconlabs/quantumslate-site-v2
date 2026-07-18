// National Level Competitions:
//  1. A title band with the group photo living behind the heading (kept as-is).
//  2. A "versus" face-off band — every workshop track converges on one of two
//     flagship showdowns. Two solid-navy panels split by a gold "OR" badge
//     that overlaps both on desktop and stacks between them on mobile.
// Solid brand colours only, no gradients.

import Image from "next/image";
import Link from "next/link";

const OLYMPICS = [
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

export default function Competitions() {
  return (
    <section id="competitions" className="w-full px-6 py-6 md:px-12 md:py-8">
      <div className="mx-auto max-w-6xl">
        {/* ── Title band: full-width navy bar on top, untouched photo below ── */}
        <div>
          <h1 className="whitespace-nowrap bg-navy px-5 py-4 text-center text-[clamp(1.1rem,4.3vw,3.25rem)] font-black uppercase leading-none tracking-tight text-background md:px-10 md:py-7">
            National Level Competitions
          </h1>
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
          <h2 className="mt-3 text-center text-[clamp(1.75rem,4vw,2.75rem)] font-black uppercase leading-[1] tracking-tight text-navy">
            The Showdown Awaits
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
            Every student who completes a QuantumSlate workshop gets to
            compete in its finale. Build a drone, and you fly it in the
            Drone Olympics™. Build an aircraft, and you fly it in the
            Aircraft Olympics™.
          </p>

          <div className="relative mt-10 grid gap-3 md:grid-cols-2 md:gap-3">
            {OLYMPICS.map((o) => (
              <Link
                key={o.name}
                href={o.href}
                className="group relative flex flex-col justify-between overflow-hidden bg-navy px-8 py-14 text-center transition-colors hover:bg-navy/90 md:px-10 md:py-20"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                    {o.tagline}
                  </p>
                  <h3 className="mt-4 text-[clamp(2rem,5vw,3.25rem)] font-black uppercase leading-[0.95] tracking-tight text-background">
                    {o.name}
                    <sup className="ml-1 text-[0.35em] font-bold align-super">™</sup>
                  </h3>
                  <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-background/70">
                    {o.copy}
                  </p>
                </div>
                <span className="mx-auto mt-8 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold transition-colors group-hover:text-background">
                  See the Workshop
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </Link>
            ))}

            {/* Gold "AND" badge — centred over the seam on desktop, an inline
                divider between the stacked panels on mobile. */}
            <div className="pointer-events-none relative -my-6 flex justify-center md:absolute md:inset-y-0 md:left-1/2 md:my-0 md:-translate-x-1/2 md:items-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-gold text-sm font-black uppercase tracking-widest text-navy">
                And
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
