"use client";

import dynamic from "next/dynamic";

// Three.js + Theatre need the browser, so render the whole hero client-side only.
// Reserve the hero's full-viewport space while the client-only chunk loads, so
// the sections below don't paint at the top and then jump down when it mounts.
const Hero = dynamic(() => import("./Hero"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#F1E8DA]" />
  ),
});

export default function DroneScene() {
  return <Hero />;
}
