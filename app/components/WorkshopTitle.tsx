// Mobile-only title section below each workshop scene — the user scrolls down
// from the 3D stage to the heading. On md+ the title lives inside the scene
// (right of the docked model), so this section hides itself there.
export default function WorkshopTitle({ label }: { label: string }) {
  return (
    <section className="flex min-h-[22vh] w-full items-center justify-center px-6 md:hidden">
      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
        {label}
      </h1>
    </section>
  );
}
