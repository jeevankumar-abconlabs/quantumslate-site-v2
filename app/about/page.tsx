import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About QuantumSlate: Indigenous Aerospace, Defence & Drone Technology Company in India",
  description:
    "QuantumSlate Private Limited is an indigenous aerospace and deep-technology company building UAVs, tethered surveillance drones, autonomous VTOL aircraft, and hands-on aerospace education programs across India.",
  keywords: [
    "QuantumSlate",
    "aerospace company India",
    "drone manufacturer India",
    "UAV design and development",
    "tethered drone surveillance",
    "defence technology India",
    "drone training programs",
    "STEM aerospace education",
  ],
  openGraph: {
    title: "About QuantumSlate: Aerospace, Defence & Autonomous Technologies",
    description:
      "Indigenous aerospace and deep-technology company advancing defence capabilities, unmanned systems, and hands-on aerospace education.",
    images: ["/about-us-page/about-us-page-1.webp"],
  },
  alternates: { canonical: "/about" },
};

// Alternating editorial sections: image left / content right, then flipped.
const SECTIONS = [
  {
    heading: "Defence Division",
    image: "/about-us-page/about-us-page-3.webp",
    alt: "QuantumSlate engineers performing final checks on a fixed-wing UAV before a field demonstration",
    body: [
      "Our Defence Division focuses on developing and supplying advanced drones and UAVs for surveillance, reconnaissance, and border security applications. By combining practical education with indigenous defence innovation, QuantumSlate is committed to building future-ready engineers and delivering cutting-edge unmanned solutions for national security.",
    ],
  },
  {
    heading: "EdTech Division",
    image: "/about-us/about-us-general-5.webp",
    alt: "Classroom drone workshop with a laser-cut quadcopter and balsa-wood aircraft on the desks",
    body: [
      "Through our EdTech Division, we conduct hands-on workshops and training programs in UAV Technologies, Drone Engineering, RC Aircraft, Rocketry, and Aerospace Systems, while collaborating with educational institutions to establish innovation clubs that nurture young engineers. We also organize Drone Olympics™ and Aircraft Olympics™, preparing students to design, build, and compete at national and international levels.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 pt-28 bg-[#F1E8DA]">
      <section className="w-full px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
            About Us
          </h1>
          <p className="mt-6 max-w-3xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
            QuantumSlate Pvt. Ltd. is an EdTech and Defence Technology company
            dedicated to advancing innovation in aerospace, unmanned systems,
            and emerging technologies.
          </p>

          <div className="mt-16 flex flex-col gap-16 md:gap-24">
            {SECTIONS.map((s, i) => (
              <article
                key={s.heading}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <div
                  className={`relative aspect-[3/2] w-full overflow-hidden border border-navy/10 ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    preload={i === 0}
                  />
                </div>
                <div>
                  {s.body.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="text-[clamp(0.95rem,1.3vw,1.05rem)] leading-relaxed text-foreground/70"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Philosophy band */}
          <div className="mt-20 border border-navy/10 bg-navy px-8 py-12 text-center md:py-16">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#C7B7A3]">
              Our Philosophy
            </p>
            <p className="mt-4 text-2xl font-black uppercase tracking-tight text-[#F1E8DA] md:text-4xl">
              Innovation. Engineering. Impact.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#F1E8DA]/70 md:text-base">
              Every innovation at QuantumSlate is engineered with purpose:
              strengthening defence capabilities, advancing aerospace
              technology, and empowering the next generation of engineers to
              build solutions that create lasting impact.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "QuantumSlate Private Limited",
            founder: { "@type": "Person", name: "Syed Rayan R" },
            email: "quantumslateofficial@gmail.com",
            telephone: "+91 95976 53900",
            description:
              "Indigenous aerospace and deep-technology company advancing defence capabilities, unmanned aerial systems, and aerospace education in India.",
            knowsAbout: [
              "Unmanned Aerial Systems",
              "Tethered Drone Surveillance",
              "Autonomous VTOL Aircraft",
              "Drone Training & STEM Education",
            ],
          }),
        }}
      />
    </main>
  );
}
