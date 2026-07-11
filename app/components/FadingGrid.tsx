// Fading navy grid backdrop (same treatment as the hero) — absolutely fills
// the nearest relative parent, behind everything, clicks pass through.
export default function FadingGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--navy) 1px, transparent 1px), linear-gradient(to bottom, var(--navy) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        opacity: 0.14,
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
      }}
    />
  );
}
