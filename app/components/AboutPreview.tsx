// Condensed About teaser for the home page — two editorial rows: copy left /
// layered photo pair right, then mirrored. No gradients.
import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "500+", label: "Participants" },
  { value: "50+", label: "Events" },
  { value: "3", label: "Core Workshops" },
];

export default function AboutPreview() {
  return (
    <section id="about" className="w-full px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 md:gap-24">
        {/* Row 1: copy left, photos right */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col">
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
              About Us
            </h2>
            <p className="mt-6 max-w-prose text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              QuantumSlate is an indigenous aerospace company building drones,
              autonomous aircraft, and the engineers who fly them. Our hands-on
              workshops in{" "}
              <span className="font-medium text-navy">drone technology</span>,{" "}
              <span className="font-medium text-navy">RC aviation</span>, and{" "}
              <span className="font-medium text-navy">rocketry</span> turn
              theory into the real thing.
            </p>

            {/* Inline stat row, hairline dividers instead of cards */}
            <div className="mt-10 flex w-fit divide-x divide-navy/15">
              {STATS.map((s) => (
                <div key={s.label} className="px-5 first:pl-0 last:pr-0">
                  <div className="text-3xl font-black tracking-tight text-navy">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-xs font-medium text-foreground/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PhotoPair
            main={{
              src: "/about-us/about-us-general-1.webp",
              alt: "Hand-built RC aircraft and UAV prototypes lined up before flight testing",
            }}
            inset={{
              src: "/about-us/about-us-general-6.webp",
              alt: "Students building foam aircraft wings at a QuantumSlate workshop",
            }}
          />
        </div>

        {/* Row 2: photos left, copy right */}
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <PhotoPair
            main={{
              src: "/about-us/about-us-general-4.webp",
              alt: "QuantumSlate founder addressing a group of engineering students outdoors",
            }}
            inset={{
              src: "/about-us/about-us-general-3.webp",
              alt: "Student team assembling a quadcopter drone at a competition booth",
            }}
            className="md:order-1"
            mirrored
          />
          <div className="flex flex-col md:order-2">
            <h3 className="text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl">
              From Classrooms to the Field
            </h3>
            <p className="mt-4 max-w-prose text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              From unmanned aerial systems and tethered surveillance platforms
              to aerospace innovation labs in schools and colleges, we design,
              build, and teach with one goal: technological self-reliance for
              India.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex h-11 w-fit items-center justify-center rounded-full bg-gold px-7 text-xs font-bold uppercase tracking-widest text-navy transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Layered photo pair: main image with a smaller one overlapping a bottom
// corner. Padding reserves room for the overlap at every breakpoint.
function PhotoPair({
  main,
  inset,
  mirrored = false,
  className = "",
}: {
  main: { src: string; alt: string };
  inset: { src: string; alt: string };
  mirrored?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative pb-10 md:pb-14 ${
        mirrored ? "pr-8 md:pr-12" : "pl-8 md:pl-12"
      } ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden border border-navy/10">
        <Image
          src={main.src}
          alt={main.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div
        className={`absolute bottom-0 aspect-[4/3] w-[48%] overflow-hidden border-[6px] border-[#F1E8DA] ${
          mirrored ? "right-0" : "left-0"
        }`}
      >
        <Image
          src={inset.src}
          alt={inset.alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
