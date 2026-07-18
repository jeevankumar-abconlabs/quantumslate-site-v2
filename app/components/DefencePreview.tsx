// Defence preview for the home page — heading + intro below it (same pattern
// as Our Workshops), then three alternating image/content rows in the same
// editorial style as WorkshopDetails. Drop real photos into /public/defence
// and swap each placeholder for <Image src={...} alt={...} fill className="object-cover" />.
import Link from "next/link";

const ROWS = [
  {
    heading: "Defence Innovation at Our Core",
    label: "Surveillance UAS",
    content: (
      <p className="mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
        At QuantumSlate, defence innovation forms the core of our research and
        development efforts. Modern defence operations increasingly rely on
        autonomous systems, real-time intelligence, aerial surveillance, and
        advanced robotics — and we build for exactly that world.
      </p>
    ),
  },
  {
    heading: "What We Design and Build",
    label: "Tethered Systems",
    content: (
      <ul className="mt-4 flex flex-col gap-2.5 text-[clamp(0.9rem,1.3vw,1rem)] leading-relaxed text-foreground/70">
        {[
          ["Unmanned Aerial Systems (UAS)", "surveillance, reconnaissance, inspection, and mission support."],
          ["Tethered Drone Systems", "continuous aerial monitoring, border security, disaster response, and strategic observation."],
          ["Autonomous Aerial Robotics", "defence, homeland security, and critical infrastructure monitoring."],
          ["Mission-Specific UAV Platforms", "customized operational requirements."],
          ["AI-Assisted Aerial Intelligence", "data collection, situational awareness, and decision support."],
        ].map(([title, body]) => (
          <li key={title} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-navy" />
            <span>
              <span className="font-semibold text-navy">{title}</span> — {body}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    heading: "Reliable, Indigenous, Future-Ready",
    label: "Aerial Robotics",
    content: (
      <p className="mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
        Our technologies strengthen operational capabilities while reducing
        human risk in complex environments — supporting government
        organizations, defence establishments, emergency response agencies, and
        strategic industries with reliable, indigenous, and future-ready
        solutions.
      </p>
    ),
  },
];

export default function DefencePreview() {
  return (
    <section id="defence-preview" className="w-full px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* ── Heading + intro, same pattern as Our Workshops ── */}
        <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          Defence
        </h2>
        <p className="mt-5 text-[clamp(1.1rem,2.2vw,1.6rem)] font-semibold text-navy">
          Indigenous aerial technology for those who protect.
        </p>

        {/* ── Alternating editorial rows: photo one side, content the other ── */}
        <div className="mt-14 flex flex-col gap-16 md:gap-24">
          {ROWS.map((row, i) => (
            <article
              key={row.heading}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
            >
              <div
                className={`relative aspect-[3/2] w-full overflow-hidden border border-navy/10 bg-navy/[0.05] ${
                  i % 2 === 0 ? "md:order-2" : ""
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
                <span className="absolute bottom-4 left-5 text-xs font-medium uppercase tracking-widest text-navy/40">
                  {row.label}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl">
                  {row.heading}
                </h3>
                {row.content}
                {i === ROWS.length - 1 && (
                  <Link
                    href="/defence"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-gold hover:text-navy"
                  >
                    Learn More
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
