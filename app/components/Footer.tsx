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
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="QuantumSlate on X"
                className="text-navy/70 transition-colors hover:text-navy"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
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
