// The Drone workshop details section, below the flying-drone hero: the DRONE
// heading + description/spec list (left) and a tilted collage of workshop photos
// (right — placeholders until real images land in /public).

const SPECS = [
  "Build the airframe from the frame up",
  "Wire the motors, ESCs, and flight controller",
  "Tune and calibrate it for a stable first flight",
  "Fly it — your own machine, in the air",
];

// 3–5 placeholder frames; tilts give the scattered-photo look from the sketch.
const PHOTOS = ["-rotate-6", "rotate-3 mt-10", "rotate-6 -mt-4", "-rotate-3 mt-6"];

export default function DroneWorkshop() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Heading + description + spec list */}
          <div>
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
              Drone
            </h2>
            <p className="mt-5 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              Build your own drone from the frame up — wire the motors, set it up,
              and take it through its very first flight. No prior experience
              needed, just the curiosity to make something that flies.
            </p>
            <ul className="mt-8 space-y-3">
              {SPECS.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-navy"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Workshop photos — tilted placeholder collage */}
          <div className="grid grid-cols-2 gap-5">
            {PHOTOS.map((tilt, i) => (
              <div
                key={i}
                className={`${tilt} aspect-[4/3] overflow-hidden rounded-2xl border border-navy/10 bg-navy/[0.05] shadow-[0_8px_30px_rgba(20,39,78,0.08)] transition-transform duration-300 hover:rotate-0`}
              >
                <div className="h-full w-full bg-[linear-gradient(to_right,rgba(12,31,60,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,31,60,0.10)_1px,transparent_1px)] bg-[size:24px_24px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
