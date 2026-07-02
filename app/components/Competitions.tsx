// National Level Competitions — matches the client sketch:
//  1. A title band with the group photo living behind the heading (panel 9).
//  2. A description + curated image mosaic of the disciplines (panel 10).
// Solid brand colours only, no gradients. Photo areas are placeholders with the
// site's engineering-grid motif — drop real photos into /public/competitions
// and swap each placeholder <div> for <Image ... fill className="object-cover" />.

// Tile shapes for the mosaic — labels kept only as alt text for the real photos.
const TILES = [
  { alt: "Drone Racing", span: "sm:col-span-2 aspect-[16/10] sm:aspect-[16/7]" }, // feature
  { alt: "RC Precision", span: "aspect-square" },
  { alt: "Model Rocketry", span: "aspect-square" },
  { alt: "Payload Challenge", span: "sm:col-span-2 aspect-[16/9] sm:aspect-[21/8]" },
];

export default function Competitions() {
  return (
    <section id="competitions" className="w-full px-6 py-6 md:px-12 md:py-8">
      <div className="mx-auto max-w-6xl">
        {/* ── Title band: group photo behind the heading ── */}
        <div className="relative overflow-hidden rounded-3xl bg-navy">
          {/* Group photo goes here — sits behind the title at reduced opacity,
              echoing the hero. Replace this placeholder with the real photo:
              <Image src="/competitions/group.jpg" alt="" fill priority
                     className="object-cover opacity-40" /> */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[linear-gradient(to_right,rgba(241,232,218,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(241,232,218,0.25)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <span className="pointer-events-none absolute bottom-5 right-6 text-[11px] font-medium uppercase tracking-widest text-background/30">
            Group Photo
          </span>

          <div className="relative flex min-h-[calc(100dvh-9.5rem)] flex-col items-center justify-center px-6 py-20 text-center">
            <h1 className="max-w-4xl text-[clamp(2rem,7vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight text-background">
              National Level Competitions
            </h1>
          </div>
        </div>

        {/* ── Description + disciplines mosaic ── */}
        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          {/* Left: copy */}
          <div className="flex flex-col md:sticky md:top-28 md:self-start">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-black uppercase leading-[1] tracking-tight text-navy">
              Where We Compete
            </h2>
            <p className="mt-6 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              We take our builders beyond the workshop and onto the national
              stage. Across drone racing, precision RC aerobatics, rocketry, and
              payload engineering, our teams put months of hands-on work to the
              test against the best in the country — flying, launching, and
              competing under real pressure.
            </p>
            <p className="mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              Each discipline demands its own craft, but the journey is the same:
              design it, build it, trust it, and fly it when the countdown hits
              zero.
            </p>
          </div>

          {/* Right: curated image mosaic — one feature tile + supporting tiles */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TILES.map((t) => (
              <PhotoTile key={t.alt} span={t.span} />
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
      className={`relative overflow-hidden rounded-3xl border border-navy/10 bg-navy/[0.05] ${span}`}
    >
      {/* Engineering-grid placeholder — swap for a real <Image fill> per discipline. */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
    </div>
  );
}
