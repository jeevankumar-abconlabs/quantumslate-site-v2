import Link from "next/link";

// Workshop details section, below each workshop's 3D hero — laid out like the
// Competitions description: the copy (heading + blurb + CTA) sticks on the
// left and slides along while the image mosaic on the right scrolls past.
// Photo areas are engineering-grid placeholders — drop real photos into
// /public and swap each placeholder for <Image fill className="object-cover" />.

// Same mosaic rhythm as Competitions: feature tile, two squares, one wide.
const TILE_SPANS = [
  "sm:col-span-2 aspect-[16/10] sm:aspect-[16/7]",
  "aspect-square",
  "aspect-square",
  "sm:col-span-2 aspect-[16/9] sm:aspect-[21/8]",
];

type Step = { title: string; body: string; finale?: boolean };

const WORKSHOPS = {
  drones: {
    title: "Drone",
    blurb:
      "QuantumSlate's hands-on drone building workshop takes you from a box of raw components to a quadcopter you pilot yourself. Guided by the same engineers who design UAVs and tethered surveillance systems for defence and police units across India, you assemble the airframe, wire the motors and ESCs, configure the flight controller, and take your machine through its very first flight.",
    intro:
      "Along the way you pick up real UAV engineering skills — aerodynamics, embedded electronics, firmware configuration, and safe flight operations — the same fundamentals our team applies on mission-deployed aerial systems. No prior experience needed; the workshop is open to school students, engineering undergraduates, and hobbyists alike. It all builds up to the Drone Olympics, our flagship head-to-head flying showdown.",
    skills: [
      "Drone anatomy & airframe assembly",
      "Motor, ESC & flight-controller wiring",
      "Firmware setup & calibration",
      "Piloting & flight safety",
    ],
    timeline: [
      { title: "Fundamentals & Frame Build", body: "How drones generate lift and stay stable — propellers, thrust, and control loops — then assemble your airframe from the frame up." },
      { title: "Electronics & Wiring", body: "Wire the motors, ESCs, and flight controller, solder the power distribution, and flash and configure the firmware." },
      { title: "Calibration & First Flight", body: "Calibrate sensors, tune the controls, run pre-flight checks, and take your build through hover, climb, and landing." },
      { title: "Drone Olympics", body: "Put your machine to the test against the rest in our flagship flying showdown.", finale: true },
    ] as Step[],
  },
  "rc-planes": {
    title: "RC Planes",
    blurb:
      "Learn aerodynamics the way pilots and aircraft designers do — by building a radio-controlled plane and flying it. In QuantumSlate's RC plane workshop you design and build the fuselage, wings, and tail from scratch, fit the servos, receiver, and motor, then balance and trim your aircraft for its maiden flight.",
    intro:
      "Every session is grounded in real aerospace engineering: lift and drag, control surfaces, centre of gravity, and trim — concepts you feel through the transmitter sticks, not slides. By the finale you're flying rolls, loops, and precision passes in the aerobatics showdown, with an aircraft you built yourself.",
    skills: [
      "Aerodynamics & aircraft design",
      "Airframe construction — fuselage, wings & tail",
      "Servo, receiver & motor installation",
      "Trimming, take-off & landing",
    ],
    timeline: [
      { title: "Aerodynamics & Airframe Build", body: "Why planes fly — lift, drag, thrust, and stability — then build the fuselage, wings, and tail from scratch." },
      { title: "Control Surfaces & Electronics", body: "Fit the servos, receiver, and motor, and link ailerons, elevator, and rudder to your transmitter." },
      { title: "Trim & Maiden Flight", body: "Balance the centre of gravity, set your control throws, and take your aircraft through its first take-off and landing." },
      { title: "Aerobatics Showdown", body: "Rolls, loops, and precision passes — put your airmanship to the test against the field.", finale: true },
    ] as Step[],
  },
  rockets: {
    title: "Rockets",
    blurb:
      "QuantumSlate's model rocketry workshop puts a real launch at the end of every build. You engineer a rocket from the airframe up — shape the fins for stability, build the body and nose cone, mount the motor, and pack the parachute recovery system — then clear it through pad checks for a live countdown launch.",
    intro:
      "The physics behind spaceflight — thrust, stability, apogee, recovery — taught hands-on, the way aerospace engineers actually work. You build it, you launch it, and you recover what you flew. Open to students and enthusiasts of every level; curiosity is the only prerequisite.",
    skills: [
      "Rocket stability & fin design",
      "Airframe & nose-cone construction",
      "Motor mounting & parachute recovery",
      "Launch operations & range safety",
    ],
    timeline: [
      { title: "Rocketry Fundamentals & Airframe", body: "What keeps a rocket stable in flight — centre of pressure vs. gravity — then build the body, fins, and nose cone." },
      { title: "Motors & Recovery Systems", body: "Mount the motor, pack the parachute, and rig the recovery so your rocket comes home intact." },
      { title: "Integration & Pad Checks", body: "Assemble, weigh, and safety-check the full stack until it's cleared for flight." },
      { title: "Launch Day", body: "A live countdown, a hard climb off the rail, and a recovery you rigged yourself.", finale: true },
    ] as Step[],
  },
};

export default function WorkshopDetails({ workshop }: { workshop: keyof typeof WORKSHOPS }) {
  const { title, blurb, intro, skills, timeline } = WORKSHOPS[workshop];

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        {/* ── Description + photo mosaic: copy sticks and slides along with the images ── */}
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <div className="flex flex-col md:sticky md:top-28 md:self-start">
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
              {title}
            </h2>
            <p className="mt-5 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              {blurb}
            </p>
            <p className="mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
              {intro}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-navy px-7 py-3 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-gold hover:text-navy"
            >
              Enquire Now
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Right: curated image mosaic — one feature tile + supporting tiles */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TILE_SPANS.map((span, i) => (
              <div
                key={i}
                className={`relative overflow-hidden border border-navy/10 bg-navy/[0.05] ${span}`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline — activities that build up to the finale ── */}
        <div className="mt-24 md:mt-32">
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-tight text-navy">
            The Journey
          </h3>
          <ol className="relative mt-12 ml-3 border-l border-navy/15">
            {timeline.map((step, i) => (
              <li key={step.title} className="relative ml-8 pb-12 last:pb-0">
                <span
                  className={`absolute -left-[2.55rem] top-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    step.finale
                      ? "bg-gold text-navy"
                      : "border border-navy/20 bg-background text-navy"
                  }`}
                >
                  {i + 1}
                </span>
                <h4
                  className={`text-[clamp(1.1rem,2vw,1.4rem)] font-bold tracking-tight ${
                    step.finale ? "text-gold" : "text-navy"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="mt-2 max-w-xl text-[clamp(0.95rem,1.4vw,1.05rem)] leading-relaxed text-foreground/70">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Skills — what participants walk away with ── */}
        <div className="mt-24 md:mt-32">
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-tight text-navy">
            What You&apos;ll Take Away
          </h3>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="border border-navy/10 bg-navy/[0.03] px-6 py-5 text-[clamp(0.95rem,1.4vw,1.05rem)] font-semibold text-navy"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
