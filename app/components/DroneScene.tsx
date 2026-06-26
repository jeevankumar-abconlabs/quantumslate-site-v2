"use client";

import dynamic from "next/dynamic";

// Three.js needs the browser (WebGL), so render it client-side only.
const DroneModel = dynamic(() => import("./DroneModel"), { ssr: false });

export default function DroneScene() {
  return <DroneModel />;
}
