// Mobile-only title + description section below each workshop scene — the user
// scrolls down from the 3D stage to the heading, body text, and Learn More CTA.
// On md+ the content lives inside the scene (right of the docked model), so
// this section hides itself there.
import Link from "next/link";

export default function WorkshopTitle({
  label,
  description,
  href,
}: {
  label: string;
  description?: string;
  href?: string;
}) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-5 px-6 py-10 md:hidden">
      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy text-center">
        {label}
      </h1>
      {description && (
        <p className="max-w-sm text-center text-[clamp(0.9rem,3.5vw,1.05rem)] leading-relaxed text-foreground/70">
          {description}
        </p>
      )}
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-navy/30 transition-all duration-300 hover:scale-105 hover:bg-navy/90"
        >
          Learn More
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}
