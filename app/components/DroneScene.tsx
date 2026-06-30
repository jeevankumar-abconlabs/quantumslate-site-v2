"use client";

import dynamic from "next/dynamic";

// Three.js + Theatre need the browser, so render the whole hero client-side only.
// Reserve the hero's full-viewport space while the client-only chunk loads, so
// the sections below don't paint at the top and then jump down when it mounts.
const Hero = dynamic(() => import("./Hero"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.12)_1px,transparent_1px)] bg-[size:clamp(36px,6vw,64px)_clamp(36px,6vw,64px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
    </div>
  ),
});

export default function DroneScene() {
  return <Hero />;
}
