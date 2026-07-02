// Industry Services — client sketch: title, then a single table-like row of
// head topics, each with a photo card on top and its own text cell attached
// directly below (no overlay — the copy never sits on top of the image).
// Photo areas are placeholders with the site's engineering-grid motif — drop
// real photos into /public/services and swap each placeholder <div> for
// <Image ... fill className="object-cover" />.

const SERVICES = [
  {
    title: "Rapid Deployment",
    body: "Quick turnaround for mission-critical UAV solutions.",
  },
  {
    title: "Built to Last",
    body: "Robust designs engineered for demanding environments.",
  },
  {
    title: "Precision Engineering",
    body: "Custom-built UAVs tailored to your exact specifications.",
  },
  {
    title: "Full Support",
    body: "End-to-end assistance from design to deployment.",
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full px-6 py-6 md:px-12 md:py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          Industry Services
        </h1>
        <p className="mt-5 max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
          From first brief to field deployment — UAV engineering delivered as a
          service, built around your mission.
        </p>

        {/* Table-like row: the container's tinted background shows through the
            1px gaps, drawing the cell dividers at every breakpoint for free.
            4-up on desktop, 2-up on tablets, stacked on phones. Square corners
            (no radius) so it reads as a table, not a card grid. */}
        <div className="mt-14 grid grid-cols-1 gap-px border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <ServiceCell key={s.title} index={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCell({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  return (
    <div className="flex flex-col bg-[#F1E8DA]">
      {/* Photo card — swap for <Image src={`/services/${...}.jpg`} alt="" fill className="object-cover" />.
          No text on top of it; the copy lives in its own cell right below. */}
      <div className="group relative min-h-[220px] overflow-hidden bg-navy/[0.05] md:min-h-[260px]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px] transition-transform duration-500 ease-out group-hover:scale-105" />
      </div>

      {/* Text cell — attached directly under the photo card, same unit. */}
      <div className="p-6">
        <span className="text-xs font-bold uppercase tracking-widest text-navy/40">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 text-xl font-black uppercase tracking-tight text-navy">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">{body}</p>
      </div>
    </div>
  );
}
