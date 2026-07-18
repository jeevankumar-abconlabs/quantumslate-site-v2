// National Level Competitions:
//  1. A title band with the group photo living behind the heading (kept as-is).
//  2. An editorial discipline index — hairline-divided rows, each with an
//     oversized number, the discipline, a one-liner, and a wide photo strip.
// Solid brand colours only, no gradients. Photo areas are placeholders with the
// site's engineering-grid motif — drop real photos into /public/competitions
// and swap each placeholder <div> for <Image ... fill className="object-cover" />.

import Image from "next/image";

const DISCIPLINES = [
  {
    name: "Drone Racing",
    copy: "Head-to-head FPV and line-of-sight racing: reflexes, tuning, and nerve at full throttle through the gates.",
  },
  {
    name: "RC Precision",
    copy: "Judged aerobatic routines and spot-landing challenges, where smooth, exact flying beats raw speed.",
  },
  {
    name: "Model Rocketry",
    copy: "Altitude and recovery contests: stable builds, clean parachute deployments, and the tightest apogee predictions.",
  },
  {
    name: "Payload Challenge",
    copy: "Engineering missions: lift, carry, and deliver a payload within strict weight, size, and time budgets.",
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

        {/* ── Discipline index: intro, then hairline-divided numbered rows ── */}
        <div className="mt-16 md:mt-24">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black uppercase leading-[1] tracking-tight text-navy">
              Where We Compete
            </h2>
            <div>
              <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
                We take our builders beyond the workshop and onto the national
                stage. Across drone racing, precision RC aerobatics, rocketry,
                and payload engineering, our teams put months of hands-on work
                to the test against the best in the country: flying, launching,
                and competing under real pressure.
              </p>
              <p className="mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
                Each discipline demands its own craft, but the journey is the
                same: design it, build it, trust it, and fly it when the
                countdown hits zero.
              </p>
            </div>
          </div>

          <div className="mt-14 divide-y divide-navy/10 border-y border-navy/10">
            {DISCIPLINES.map((d, i) => (
              <article
                key={d.name}
                className="grid items-center gap-6 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14 md:py-12"
              >
                <div className="flex items-start gap-5 md:gap-7">
                  <span className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-tight text-navy/15 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-xl font-black uppercase tracking-tight text-navy md:text-2xl">
                      {d.name}
                    </h3>
                    <p className="mt-3 max-w-md text-[clamp(0.9rem,1.3vw,1.05rem)] leading-relaxed text-foreground/70">
                      {d.copy}
                    </p>
                  </div>
                </div>
                <PhotoTile span="aspect-[16/9] md:aspect-[16/6]" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoTile({ span }: { span: string }) {
  return (
    <div
      className={`relative overflow-hidden border border-navy/10 bg-navy/[0.05] ${span}`}
    >
      {/* Engineering-grid placeholder — swap for a real <Image fill> per discipline. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
    </div>
  );
}
