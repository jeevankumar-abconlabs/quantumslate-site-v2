import Link from "next/link";
import JourneyTimeline from "./JourneyTimeline";
import type { Step } from "./JourneyTimeline";

// Workshop details section, below each workshop's 3D hero — About-page-style
// alternating editorial rows: paragraph left / image right, then mirrored.
// Photo areas are engineering-grid placeholders — drop real photos into
// /public and swap each placeholder for <Image fill className="object-cover" />.

type Section = { heading: string; body: string };

const WORKSHOPS = {
  drones: {
    title: "Drone",
    sections: [
      {
        heading: "From Raw Components to First Flight",
        body: "QuantumSlate's hands-on drone building workshop takes you from a box of raw components to a quadcopter you pilot yourself. Guided by the same engineers who design UAVs and tethered surveillance systems for defence and police units across India, you assemble the airframe, wire the motors and ESCs, configure the flight controller, and take your machine through its very first flight.",
      },
      {
        heading: "Real UAV Engineering, Not Slides",
        body: "Along the way you pick up real UAV engineering skills — aerodynamics, embedded electronics, firmware configuration, and safe flight operations — the same fundamentals our team applies on mission-deployed aerial systems. No prior experience needed; the workshop is open to school students, engineering undergraduates, and hobbyists alike.",
      },
      {
        heading: "Built for the Drone Olympics™",
        body: "Everything builds up to the Drone Olympics™, our flagship head-to-head flying showdown, where your machine goes up against the rest of the field. You leave with the confidence to assemble, tune, and repair a quadcopter on your own — and a clear picture of where drone engineering can take you, from FPV flying to India's growing UAV industry.",
      },
    ] as Section[],
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
      { title: "Drone Olympics™", body: "Put your machine to the test against the rest in our flagship flying showdown.", finale: true },
    ] as Step[],
  },
  "rc-planes": {
    title: "Aircraft",
    sections: [
      {
        heading: "Design It, Build It, Fly It",
        body: "Learn aerodynamics the way pilots and aircraft designers do — by building a radio-controlled plane and flying it. In QuantumSlate's aircraft workshop you design and build the fuselage, wings, and tail from scratch, fit the servos, receiver, and motor, then balance and trim your aircraft for its maiden flight.",
      },
      {
        heading: "Aerospace Engineering You Can Feel",
        body: "Every session is grounded in real aerospace engineering: lift and drag, control surfaces, centre of gravity, and trim — concepts you feel through the transmitter sticks, not slides. Your own design choices play out in the air: a longer wing glides flatter, a forward battery steadies the nose.",
      },
      {
        heading: "Built for the Aircraft Olympics™",
        body: "Everything builds up to the Aircraft Olympics™, our flagship head-to-head aerobatics showdown, where the aircraft you built takes on the rest of the field in rolls, loops, and precision passes. You leave knowing how to design, build, trim, and repair a fixed-wing aircraft on your own — and a clear picture of where aviation can take you, from competitive aeromodelling to India's aerospace industry.",
      },
    ] as Section[],
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
      { title: "Aircraft Olympics™", body: "Rolls, loops, and precision passes — put your airmanship to the test against the field.", finale: true },
    ] as Step[],
  },
  rockets: {
    title: "Rockets",
    sections: [
      {
        heading: "A Real Launch at the End of Every Build",
        body: "QuantumSlate's model rocketry workshop puts a real launch at the end of every build. You engineer a rocket from the airframe up — shape the fins for stability, build the body and nose cone, mount the motor, and pack the parachute recovery system — then clear it through pad checks for a live countdown launch.",
      },
      {
        heading: "The Physics of Spaceflight, Hands-On",
        body: "The physics behind spaceflight — thrust, stability, apogee, recovery — taught hands-on, the way aerospace engineers actually work. You build it, you launch it, and you recover what you flew. Open to students and enthusiasts of every level; curiosity is the only prerequisite.",
      },
      {
        heading: "Launch Day, Run Like a Range",
        body: "Launch day runs like a real range operation — flight cards, pad assignments, a safety perimeter, and a countdown for every rocket. Each flight climbs off the rail, deploys its parachute, and comes home, and every builder walks away with their rocket, their flight story, and the itch to build a bigger one.",
      },
    ] as Section[],
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
  const { title, sections, skills, timeline } = WORKSHOPS[workshop];

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-12 md:py-28">
        <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          {title}
        </h2>

        {/* ── Alternating editorial rows: copy one side, photo the other ── */}
        <div className="mt-16 flex flex-col gap-16 md:gap-24">
          {sections.map((s, i) => (
            <article
              key={s.heading}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
            >
              <div
                className={`relative aspect-[3/2] w-full overflow-hidden border border-navy/10 bg-navy/[0.05] ${
                  i % 2 === 0 ? "md:order-2" : ""
                }`}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.10)_1px,transparent_1px)] bg-[size:28px_28px]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold leading-snug tracking-tight text-navy md:text-3xl">
                  {s.heading}
                </h3>
                <p className="mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
                  {s.body}
                </p>
                {i === sections.length - 1 && (
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-gold hover:text-navy"
                  >
                    Enquire Now
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* ── Timeline — activities that build up to the finale ── */}
        <div className="mt-24 md:mt-32">
          <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-black uppercase tracking-tight text-navy">
            The Journey
          </h3>
          <JourneyTimeline steps={timeline} />
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
