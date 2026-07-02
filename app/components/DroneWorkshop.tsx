import Link from "next/link";

// The Drone workshop details section, below the flying-drone hero: the DRONE
// heading + description (left), a neatly arranged grid of workshop photos
// (right — placeholders until real images land in /public), and a timeline of
// activities that build up to the Drone Olympics.

// Workshop journey — each step builds on the last; the final one is the payoff.
const TIMELINE = [
  {
    title: "Fundamentals & Frame Build",
    body: "Learn how drones fly, then assemble the airframe from the frame up.",
  },
  {
    title: "Electronics & Wiring",
    body: "Wire the motors, ESCs, and flight controller, and configure the firmware.",
  },
  {
    title: "Calibration & First Flight",
    body: "Tune and calibrate your build, then take it through its very first flight.",
  },
  {
    title: "Drone Olympics",
    body: "Put your machine to the test against the rest in our flagship flying showdown.",
    finale: true,
  },
];

export default function DroneWorkshop() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Heading + description + CTA */}
          <div>
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
              Drone
            </h2>
            {/* ponytail: placeholder copy — swap for the exact description text */}
            <p className="mt-5 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              Build your own drone from the frame up — wire the motors, set it up,
              and take it through its very first flight. No prior experience
              needed, just the curiosity to make something that flies. Over the
              workshop you go from raw components to a machine you fly yourself,
              ending with a head-to-head Drone Olympics.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-gold hover:text-navy"
            >
              Enquire Now
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Workshop photos — neat, uniform grid (placeholders for now) */}
          <div className="grid grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] overflow-hidden border border-navy/10 bg-navy/[0.05] shadow-[0_8px_30px_rgba(20,39,78,0.08)]"
              >
                <div className="h-full w-full bg-[linear-gradient(to_right,rgba(12,31,60,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,31,60,0.10)_1px,transparent_1px)] bg-[size:24px_24px]" />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline — activities that lead up to the Drone Olympics */}
        <div className="mt-24 md:mt-32">
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-tight text-navy">
            The Journey
          </h3>
          <ol className="relative mt-12 ml-3 border-l border-navy/15">
            {TIMELINE.map((step, i) => (
              <li key={step.title} className="relative ml-8 pb-12 last:pb-0">
                {/* Node on the line */}
                <span
                  className={`absolute -left-[2.55rem] top-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    step.finale
                      ? "bg-gold text-navy"
                      : "border border-navy/20 bg-background text-navy"
                  }`}
                >
                  {i + 1}
                </span>
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
