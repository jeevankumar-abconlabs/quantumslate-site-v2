// Mobile-only title section below each workshop scene — the user scrolls down
// from the 3D stage to the heading. On md+ the title lives inside the scene
// (right of the docked model), so this section hides itself there.
// 45dvh + the scene's 55dvh = one full phone viewport: just the model, the
// title, and the scroll pill — the next section starts offscreen.
export default function WorkshopTitle({ label }: { label: string }) {
  return (
    <section className="flex min-h-[45dvh] w-full flex-col items-center justify-center gap-5 px-6 py-6 md:hidden">
      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
        {label}
      </h1>
      <span className="flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-navy/30">
        Scroll
        <span className="animate-bounce text-base leading-none">↓</span>
      </span>
    </section>
  );
}
