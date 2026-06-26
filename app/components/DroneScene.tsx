"use client";

import dynamic from "next/dynamic";

// Three.js + Theatre need the browser, so render the whole hero client-side only.
const Hero = dynamic(() => import("./Hero"), { ssr: false });

export default function DroneScene() {
  return <Hero />;
}
