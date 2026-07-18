// Defence teaser for the home page — copy left, layered three-photo collage
// right (same editorial style as the About Us preview). Full content lives on
// /defence. Photo slots are engineering-grid placeholders — drop real photos
// into /public/defence and swap each for <Image fill className="object-cover" />.
import Image from "next/image";
import Link from "next/link";

export default function DefencePreview() {
  return (
    <section id="defence-preview" className="w-full px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Copy */}
          <div className="flex flex-col">
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
              Defence
            </h2>
            <p className="mt-6 max-w-prose text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              At QuantumSlate, defence innovation forms the core of our research
              and development. We design and build{" "}
              <span className="font-medium text-navy">unmanned aerial systems</span>,{" "}
              <span className="font-medium text-navy">tethered drones</span>, and{" "}
              <span className="font-medium text-navy">AI-assisted aerial intelligence</span>{" "}
              that strengthen operational capabilities while reducing human
              risk: reliable, indigenous, future-ready solutions for those who
              protect.
            </p>
            <Link
              href="/defence"
              className="mt-10 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-navy px-7 text-xs font-bold uppercase tracking-widest text-[#F1E8DA] transition-all duration-300 hover:scale-105 hover:bg-navy/90"
            >
              Learn More
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Layered three-photo collage — About-Us style: main photo with two
              cream-framed insets overlapping opposite corners. */}
          {/* Main photo with one cream-framed inset overlapping the top-right
              corner — same scale as the About Us photo pair. */}
          <div className="relative pr-8 pt-8 md:pr-12 md:pt-10">
            <div className="relative aspect-[4/3] overflow-hidden border border-navy/10">
              <Image
                src="/defence/defence-home-1.webp"
                alt="QuantumSlate unmanned aerial system in the field"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 top-0 aspect-square w-[38%] overflow-hidden border-[6px] border-[#F1E8DA]">
              <Image
                src="/defence/defence-home-2.webp"
                alt="QuantumSlate drone platform up close"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
