import Link from "next/link";

// Clean, responsive footer in the brand palette (navy / ivory). Columns mirror
// the navbar; only /about is a real page so far (rest are "#" placeholders).

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "About", href: "/about" },
      { label: "Workshops", href: "#" },
      { label: "Competitions", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Services", href: "#" },
      { label: "Defence", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-navy/10 text-foreground">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-12 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-unbounded font-black uppercase tracking-tighter text-navy"
            >
              QUANTUM<span className="text-navy/60">SLATE</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              Pioneering the future of aerospace innovation through hands-on
              workshops and cutting-edge UAV solutions.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="#"
                aria-label="QuantumSlate on LinkedIn"
                className="text-navy/70 transition-colors hover:text-navy"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="QuantumSlate on Instagram"
                className="text-navy/70 transition-colors hover:text-navy"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.982c2.937 0 3.285.011 4.445.064 1.072.049 1.654.228 2.042.379.513.199.879.437 1.263.821.385.385.623.751.822 1.264.151.388.33.97.379 2.042.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445c-.049 1.072-.228 1.654-.379 2.042-.199.513-.437.879-.822 1.263-.384.385-.75.623-1.263.822-.388.151-.97.33-2.042.379-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064c-1.072-.049-1.654-.228-2.042-.379a3.408 3.408 0 0 1-1.264-.822 3.408 3.408 0 0 1-.821-1.263c-.151-.388-.33-.97-.379-2.042-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445c.049-1.072.228-1.654.379-2.042.199-.513.437-.879.821-1.264.385-.384.751-.622 1.264-.821.388-.151.97-.33 2.042-.379 1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066-1.171.054-1.97.24-2.67.511a5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948c-.272.7-.458 1.499-.512 2.67C1.013 8.638 1 9.013 1 12s.013 3.362.066 4.535c.054 1.171.24 1.97.512 2.67a5.392 5.392 0 0 0 1.269 1.949 5.392 5.392 0 0 0 1.948 1.269c.7.272 1.499.458 2.67.512C8.638 22.987 9.013 23 12 23s3.362-.013 4.535-.066c1.171-.054 1.97-.24 2.67-.512a5.392 5.392 0 0 0 1.949-1.269 5.392 5.392 0 0 0 1.269-1.948c.272-.7.458-1.499.512-2.67C22.987 15.362 23 14.987 23 12s-.013-3.362-.066-4.535c-.054-1.171-.24-1.97-.512-2.67a5.392 5.392 0 0 0-1.269-1.949 5.392 5.392 0 0 0-1.948-1.269c-.7-.272-1.499-.458-2.67-.512C15.362 1.013 14.987 1 12 1zm0 5.351A5.649 5.649 0 1 0 12 17.65 5.649 5.649 0 0 0 12 6.351zm0 9.316A3.667 3.667 0 1 1 12 8.333a3.667 3.667 0 0 1 0 7.334zm5.872-9.539a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
            {COLUMNS.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-navy/50">
                  {heading}
                </h4>
                {links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="text-sm text-foreground/70 transition-colors hover:text-navy"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-navy/50">
                Get in touch
              </h4>
              <a
                href="mailto:quantumslateofficial@gmail.com"
                className="whitespace-nowrap text-sm text-foreground/70 transition-colors hover:text-navy"
              >
                quantumslateofficial@gmail.com
              </a>
              <span className="text-sm text-foreground/50">
                Aerospace education · India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-navy/10 pt-6 text-xs text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} QuantumSlate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-navy">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-navy">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
