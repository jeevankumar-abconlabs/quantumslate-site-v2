// Defence preview for the home page — short paragraph with two layered
// placeholder images (same PhotoPair format as the About Us section) and a
// Learn More button pointing to the full /defence page.
import Link from "next/link";

export default function DefencePreview() {
  return (
    <section id="defence-preview" className="w-full px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Layered photo pair — same layout as About Us. Drop real photos
              into /public/defence and swap each placeholder for
              <Image src={...} alt={...} fill className="object-cover" />. */}
          <div className="relative pb-10 md:pb-14 pl-8 md:pl-12">
            <div className="relative aspect-[4/3] overflow-hidden border border-navy/10">
              {/* Main placeholder */}
              <div className="absolute inset-0 bg-navy/[0.05]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <span className="absolute bottom-4 left-5 text-xs font-medium uppercase tracking-widest text-navy/40">
                Defence
              </span>
            </div>
            <div className="absolute bottom-0 left-0 aspect-[4/3] w-[48%] overflow-hidden border-[6px] border-[#F1E8DA]">
              {/* Inset placeholder */}
              <div className="absolute inset-0 bg-navy/[0.05]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col">
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
              Defence
            </h2>
            <p className="mt-6 max-w-prose text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              QuantumSlate develops indigenous aerospace technologies for
              defence, public safety, and emergency response. From unmanned
              aerial systems for surveillance and reconnaissance to tethered
              drone platforms for 24/7 monitoring, autonomous fixed-wing VTOL
              aircraft, and AI-assisted aerial intelligence — our
              mission-oriented solutions support government organisations,
              defence establishments, and law enforcement agencies across India
              with reliable, future-ready technology.
            </p>

            <Link
              href="/defence"
              className="mt-10 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-navy px-7 text-xs font-bold uppercase tracking-widest text-[#F1E8DA] transition-all duration-300 hover:scale-105 hover:bg-navy/90"
            >
              Learn More
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
