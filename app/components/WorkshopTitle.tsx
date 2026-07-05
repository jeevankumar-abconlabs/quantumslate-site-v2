// Standalone title section shared by the workshop pages and the home showcase
// (Drones, RC Planes, …). Pass the heading text via `label`. Static — the old
// scroll-reveal fade caused visible flicker.
export default function WorkshopTitle({ label }: { label: string }) {
  return (
    <section className="flex min-h-[22vh] w-full items-center justify-center px-6 md:min-h-[40vh]">
      <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-navy">
        {label}
      </h1>
    </section>
  );
}
