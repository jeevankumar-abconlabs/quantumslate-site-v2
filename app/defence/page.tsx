import Link from "next/link";
import Defence from "../components/Defence";

const MISSIONS = [
  {
    title: "Adyar Police Drone Unit",
    subtitle: "Drone-Based Public Safety & Surveillance Initiative",
    label: "Public Safety Ops",
    body: [
      "QuantumSlate collaborated with the Adyar Police Unit to support the integration of drone technology into modern policing operations. The initiative focused on demonstrating the application of unmanned aerial systems for public safety, crowd monitoring, emergency response, traffic management, disaster assessment, and surveillance.",
      "The project showcased how aerial intelligence can provide law enforcement agencies with enhanced situational awareness, rapid area assessment, and real-time decision support, enabling more effective and technology-driven policing.",
    ],
  },
  {
    // ponytail: client asked not to name the regiment or location here.
    title: "Indian Army Field Regiment",
    subtitle: "Development of a 24/7 Tethered Aerial Surveillance System",
    label: "Tethered Surveillance",
    body: [
      "QuantumSlate undertook the design and development of a 24/7 Tethered Drone Surveillance System to address the need for continuous aerial monitoring in strategic environments.",
      "Unlike conventional drones with limited flight endurance, the tethered platform is designed for uninterrupted operation through a continuous power supply, enabling persistent surveillance, perimeter security, reconnaissance, and real-time monitoring. The system is intended to enhance operational awareness while reducing deployment time and increasing mission efficiency.",
    ],
  },
  {
    title: "Territorial Army Base, Jammu & Kashmir",
    subtitle: "Autonomous Fixed-Wing VTOL Aircraft Development",
    label: "VTOL Aircraft",
    body: [
      "QuantumSlate developed an Autonomous Fixed-Wing VTOL (Vertical Take-Off and Landing) Aircraft designed for operations in challenging terrains where conventional runways are unavailable.",
      "The platform combines the vertical take-off capability of multirotor systems with the long-range efficiency of fixed-wing aircraft, enabling autonomous flight for reconnaissance, aerial mapping, surveillance, logistics support, and mission planning. Designed with intelligent flight control, autonomous navigation, and mission adaptability, the aircraft supports operations in mountainous, remote, and strategically demanding environments.",
    ],
  },
];

export default function DefencePage() {
  return (
    <main className="flex-1 pt-28 bg-[#F1E8DA]">
      <Defence />

      {/* ── Defence-focused initiatives + closing ── */}
      <section className="w-full px-6 pb-16 pt-8 md:px-12 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-6xl">
          {/* ── Mission-oriented projects: copy left, photo right ── */}
          <div>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-tight text-navy">
              Mission-Oriented Projects &amp; Strategic Collaborations
            </h2>
            <p className="mt-6 max-w-3xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              Through collaborative engineering initiatives with defence
              establishments and law enforcement agencies, we deliver
              innovative, mission-oriented solutions that enhance surveillance,
              operational efficiency, and autonomous aerial capabilities.
            </p>

            <div className="mt-14 flex flex-col gap-16 md:gap-24">
              {MISSIONS.map((m) => (
                <article
                  key={m.title}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy/60">
                      {m.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl">
                      {m.subtitle}
                    </h3>
                    {m.body.map((p) => (
                      <p
                        key={p.slice(0, 32)}
                        className="mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  {/* Photo placeholder — swap for <Image fill className="object-cover" /> */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden border border-navy/10 bg-navy/[0.05] md:order-2">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
                    <span className="absolute bottom-4 left-5 text-xs font-medium uppercase tracking-widest text-navy/40">
                      {m.label}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-12 max-w-3xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
            Through these technologies, QuantumSlate aims to support government
            organizations, defence establishments, emergency response agencies,
            and strategic industries with reliable, indigenous, and
            future-ready solutions.
          </p>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-gold hover:text-navy"
          >
            Enquire Now
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
