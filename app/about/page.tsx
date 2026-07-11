import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About QuantumSlate — Indigenous Aerospace, Defence & Drone Technology Company in India",
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
    title: "About QuantumSlate — Aerospace, Defence & Autonomous Technologies",
    description:
      "Indigenous aerospace and deep-technology company advancing defence capabilities, unmanned systems, and hands-on aerospace education.",
    images: ["/about-us/about-us-general-1.webp"],
  },
};

// Alternating editorial sections: image left / content right, then flipped.
const SECTIONS = [
  {
    heading: "Building the Future of Defence, Aerospace & Autonomous Technologies",
    image: "/about-us/about-us-general-4.webp",
    alt: "QuantumSlate founder addressing a group of engineering students at an outdoor aerospace session",
    body: [
      "QuantumSlate Private Limited is an indigenous aerospace and deep-technology company dedicated to advancing defence capabilities, unmanned systems, and aerospace innovation through engineering excellence and next-generation technology.",
      "We believe technological self-reliance is the foundation of national security. Our mission is to contribute towards building a stronger, smarter, and more resilient defence ecosystem for India.",
    ],
  },
  {
    heading: "Aerospace & Deep Technology",
    image: "/about-us/about-us-general-1.webp",
    alt: "Fleet of hand-built RC aircraft and UAV prototypes lined up on an airfield before flight testing",
    body: [
      "Founded by Syed Rayan R, QuantumSlate operates at the intersection of engineering, aerospace research, artificial intelligence, robotics, and real-world operational deployment — designing unmanned systems that bridge the gap between research laboratories and practical field applications.",
      "Our expertise spans UAV design and manufacturing, aerial robotics, aerospace systems engineering, drone operations, autonomous technologies, and advanced electronics integration.",
    ],
  },
  {
    heading: "Defence & Strategic Technology",
    image: "/about-us/about-us-general-2.webp",
    alt: "QuantumSlate engineers performing final checks on a fixed-wing UAV before a field demonstration",
    body: [
      "Defence innovation forms the core of our research and development. We design unmanned aerial systems for surveillance and reconnaissance, tethered drone systems for continuous 24/7 aerial monitoring, autonomous aerial robotics, mission-specific UAV platforms, and AI-assisted aerial intelligence systems.",
      "From the Adyar Police drone unit to a 24/7 tethered surveillance system for the 96th Field Regiment in Gwalior and an autonomous fixed-wing VTOL aircraft for a Territorial Army base in Jammu & Kashmir, our platforms support government organizations, defence establishments, and emergency response agencies with reliable, indigenous, future-ready solutions.",
    ],
  },
  {
    heading: "Research, Innovation & Engineering Excellence",
    image: "/about-us/about-us-general-3.webp",
    alt: "Student engineering team assembling a quadcopter drone at a QuantumSlate competition booth",
    body: [
      "Our multidisciplinary engineering teams work on autonomous flight systems, embedded electronics, flight control, AI and machine vision, drone swarm technologies, robotics and automation, aerospace structures, and mission planning and control.",
      "The objective is simple: transform complex engineering concepts into scalable, deployable, mission-ready technologies that address modern industrial and defence challenges.",
    ],
  },
  {
    heading: "Education & Workforce Development",
    image: "/about-us/about-us-general-5.webp",
    alt: "Classroom drone workshop with a laser-cut quadcopter and balsa-wood RC plane on the desks",
    body: [
      "Innovation is sustained by nurturing the next generation of engineers. We invest in aerospace innovation labs, drone training programs, engineering bootcamps, UAV certification programs, research-based learning, and industry-oriented STEM education.",
      "These programs equip students, researchers, and professionals with hands-on experience in UAV design, avionics, embedded systems, flight operations, and aerospace engineering — bridging the gap between academia and industry.",
    ],
  },
  {
    heading: "Our Vision & Mission",
    image: "/about-us/about-us-general-6.webp",
    alt: "School students building foam aircraft wings during a hands-on QuantumSlate aerospace workshop",
    body: [
      "Vision: to become a globally recognized leader in defence innovation, aerospace technologies, and autonomous systems by developing indigenous, intelligent, and sustainable engineering solutions that contribute to national security and technological self-reliance.",
      "Mission: to engineer advanced aerospace and defence technologies that solve real-world challenges while empowering industries, institutions, and future innovators through research, education, and engineering excellence.",
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
            An indigenous aerospace and deep-technology company advancing{" "}
            <span className="font-medium text-navy">defence capabilities</span>,{" "}
            <span className="font-medium text-navy">unmanned systems</span>, and{" "}
            <span className="font-medium text-navy">aerospace education</span>{" "}
            across India.
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
                  <h2 className="text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl">
                    {s.heading}
                  </h2>
                  {s.body.map((p) => (
                    <p
                      key={p.slice(0, 32)}
                      className="mt-4 text-[clamp(0.95rem,1.3vw,1.05rem)] leading-relaxed text-foreground/70"
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
              Every innovation at QuantumSlate is engineered with purpose —
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
