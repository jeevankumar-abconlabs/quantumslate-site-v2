// Closing call-to-action band — solid navy panel that drives to the contact
// page. Last thing before the footer; turns attention into an enquiry.
import Link from "next/link";

export default function CtaBand({
  title = "Build something that flies.",
  body = "Bring a hands-on aerospace workshop to your school, college, or team. Tell us what you're after and we'll take it from there.",
  cta = "Enquire Now",
}: {
  title?: string;
  body?: string;
  cta?: string;
}) {
  return (
    <section className="w-full px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl bg-navy px-8 py-16 text-center md:px-12 md:py-20">
        <h2 className="mx-auto max-w-3xl text-[clamp(1.75rem,5vw,3.25rem)] font-black uppercase leading-[1.05] tracking-tight text-background">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-background/70">
          {body}
        </p>
        <Link
          href="/contact"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-navy transition-transform duration-300 hover:scale-105"
        >
          {cta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
