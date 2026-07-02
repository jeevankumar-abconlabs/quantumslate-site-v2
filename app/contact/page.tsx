"use client";

// Contact page: a message form (left) that hands off to the visitor's mail
// client via a prefilled mailto, and direct contact details (right).
// ponytail: mailto handoff — no backend. Add a form action when one exists.

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const EMAIL = "quantumslateofficial@gmail.com";

const INTERESTS = [
  "Drone Workshop",
  "RC Plane Workshop",
  "Rocket Workshop",
  "Competition / Drone Olympics",
  "Defence Services",
  "Other",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [org, setOrg] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${interest} enquiry from ${name || "the website"}`);
    const body = encodeURIComponent(
      `${message}\n\nInterested in: ${interest}` +
        `\n\n— ${name}${org ? `, ${org}` : ""}${from ? ` (${from})` : ""}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl border border-navy/15 bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-foreground/40 focus:border-navy";

  return (
    <main className="flex-1 bg-[#F1E8DA]">
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-foreground/70">
          Questions about a workshop, a competition, or working together? Send us
          a message and we&apos;ll get back to you.
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left — message form (in a card) */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 rounded-3xl border border-navy/10 bg-navy/[0.03] p-8 md:p-10"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-navy">
                Name <span className="text-gold">*</span>
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy">
                Email <span className="text-gold">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
                placeholder="you@institution.edu"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="org" className="mb-2 block text-sm font-semibold text-navy">
                Organization / Institution
              </label>
              <input
                id="org"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="School, college, or company name"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="interest" className="mb-2 block text-sm font-semibold text-navy">
                I&apos;m interested in <span className="text-gold">*</span>
              </label>
              <select
                id="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                required
                className={`${field} ${interest ? "" : "text-foreground/40"}`}
              >
                <option value="" disabled>
                  Select a workshop or service…
                </option>
                {INTERESTS.map((opt) => (
                  <option key={opt} value={opt} className="text-foreground">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-navy">
                Message <span className="text-gold">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder="Tell us about your institution, expected student count, and what you'd like to achieve…"
                className={`${field} resize-y`}
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-gold hover:text-navy"
            >
              Send Message
              <span aria-hidden="true">→</span>
            </button>
          </form>

          {/* Right — reach us directly (sizes to its content, doesn't stretch) */}
          <div className="self-start rounded-3xl border border-navy/10 bg-navy/[0.03] p-8 md:p-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-navy/50">
              Reach Us Directly
            </h2>

            <div className="mt-8 flex flex-col gap-7">
              <div className="flex items-start gap-4">
                <Mail className="mt-0.5 h-6 w-6 flex-shrink-0 text-navy" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold text-navy">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-1 block text-foreground/70 transition-colors hover:text-navy"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-6 w-6 flex-shrink-0 text-navy" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold text-navy">Phone</p>
                  <a
                    href="tel:+919597653900"
                    className="mt-1 block text-foreground/70 transition-colors hover:text-navy"
                  >
                    +91 9597653900
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-6 w-6 flex-shrink-0 text-navy" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-semibold text-navy">Location</p>
                  <p className="mt-1 text-foreground/70">Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-navy">Follow Us</p>
                <div className="mt-3 flex items-center gap-4">
                  <a
                    href="#"
                    aria-label="QuantumSlate on LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-background transition-colors hover:bg-gold hover:text-navy"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="QuantumSlate on Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-background transition-colors hover:bg-gold hover:text-navy"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.982c2.937 0 3.285.011 4.445.064 1.072.049 1.654.228 2.042.379.513.199.879.437 1.263.821.385.385.623.751.822 1.264.151.388.33.97.379 2.042.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445c-.049 1.072-.228 1.654-.379 2.042-.199.513-.437.879-.822 1.263-.384.385-.75.623-1.263.822-.388.151-.97.33-2.042.379-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064c-1.072-.049-1.654-.228-2.042-.379a3.408 3.408 0 0 1-1.264-.822 3.408 3.408 0 0 1-.821-1.263c-.151-.388-.33-.97-.379-2.042-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445c.049-1.072.228-1.654.379-2.042.199-.513.437-.879.821-1.264.385-.384.751-.622 1.264-.821.388-.151.97-.33 2.042-.379 1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066-1.171.054-1.97.24-2.67.511a5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948c-.272.7-.458 1.499-.512 2.67C1.013 8.638 1 9.013 1 12s.013 3.362.066 4.535c.054 1.171.24 1.97.512 2.67a5.392 5.392 0 0 0 1.269 1.949 5.392 5.392 0 0 0 1.948 1.269c.7.272 1.499.458 2.67.512C8.638 22.987 9.013 23 12 23s3.362-.013 4.535-.066c1.171-.054 1.97-.24 2.67-.512a5.392 5.392 0 0 0 1.949-1.269 5.392 5.392 0 0 0 1.269-1.948c.272-.7.458-1.499.512-2.67C22.987 15.362 23 14.987 23 12s-.013-3.362-.066-4.535c-.054-1.171-.24-1.97-.512-2.67a5.392 5.392 0 0 0-1.269-1.949 5.392 5.392 0 0 0-1.948-1.269c-.7-.272-1.499-.458-2.67-.512C15.362 1.013 14.987 1 12 1zm0 5.351A5.649 5.649 0 1 0 12 17.65 5.649 5.649 0 0 0 12 6.351zm0 9.316A3.667 3.667 0 1 1 12 8.333a3.667 3.667 0 0 1 0 7.334zm5.872-9.539a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
