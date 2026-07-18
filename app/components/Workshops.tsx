// Our Workshops — three hands-on builds. Solid brand colours, no gradients.
// Card image areas are placeholders; drop real photos into /public and swap to <img>.
// Each card links to its workshop page; the Drones card opens the 3D drone scene.
import Link from "next/link";

export const WORKSHOPS = [
  {
    title: "Drones",
    href: "/workshops/drones",
    body: "Build a drone from raw components to first flight — frame, motors, wiring, and all. Ends in the head-to-head Drone Olympics™.",
  },
  {
    title: "RC Planes",
    href: "/workshops/rc-planes",
    body: "Design and build your own aircraft, then fly it — from maiden flight to aerobatic rolls in the Aircraft Olympics™.",
  },
  {
    title: "Model Rockets",
    href: "/workshops/rockets",
    body: "Engineer a real rocket — fins, motor, parachute recovery — and send it up with a live countdown launch.",
  },
];

export default function Workshops() {
  return (
    <section id="workshops" className="w-full px-6 py-6 md:px-12 md:py-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          Our Workshops
        </h2>
        <p className="mt-5 text-[clamp(1.1rem,2.2vw,1.6rem)] font-semibold text-navy">
          Three hands-on builds. One journey from blueprint to lift-off.
        </p>
        <p className="mt-4 max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
          Hands-on aerospace workshops for students, engineers, and hobbyists —
          drone building, RC plane design, and model rocketry. Learn to design,
          build, and fly the real thing. No prior experience needed.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WORKSHOPS.map((w) => (
            <Card key={w.title} title={w.title} href={w.href} body={w.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden border border-navy/10 bg-navy/[0.03] transition-colors hover:border-gold/40"
    >
      {/* Image placeholder with faint engineering grid */}
      <div className="relative aspect-[4/3] bg-navy/[0.05]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(12,31,60,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,31,60,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <span className="absolute bottom-4 left-5 text-xs font-medium uppercase tracking-widest text-navy/40">
          {title}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-black uppercase tracking-tight text-navy">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">{body}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold transition-colors group-hover:text-navy">
          Learn More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
