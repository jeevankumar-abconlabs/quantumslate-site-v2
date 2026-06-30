// Condensed About teaser for the home page — short blurb, compact stat cards,
// a link to the full /about page, and an image on the right. No gradients.
import Link from "next/link";

const STATS = [
  { value: "500+", label: "Workshop Participants" },
  { value: "50+", label: "Successful Events" },
  { value: "3", label: "Core Workshops" },
  { value: "100%", label: "Hands-On Learning" },
];

export default function AboutPreview() {
  return (
    <section id="about" className="w-full px-6 py-6 md:px-12 md:py-8">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Left: copy + stats + CTA */}
        <div className="flex flex-col">
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
            About Us
          </h2>
          <p className="mt-6 text-justify text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
            QuantumSlate brings aerospace education to life through immersive,
            hands-on workshops in drone technology, RC aviation, and rocketry —
            turning theory into the real thing.
          </p>

          <div className="mt-10 grid w-full max-w-[340px] grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-navy/10 bg-navy/[0.03] p-4"
              >
                <div className="text-2xl font-black tracking-tight text-navy">
                  {s.value}
                </div>
                <div className="mt-0.5 text-xs font-medium text-foreground/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="mt-8 inline-flex h-11 w-fit items-center justify-center rounded-full bg-gold px-7 text-xs font-bold uppercase tracking-widest text-navy transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Link>
        </div>

        {/* Right: image placeholder */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-navy/10 bg-navy/[0.04]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(12,31,60,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,31,60,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
          <span className="absolute bottom-5 left-5 text-xs font-medium uppercase tracking-widest text-navy/40">
            QuantumSlate
          </span>
        </div>
      </div>
    </section>
  );
}
