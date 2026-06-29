"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

// Circular percentage preloader, same look as the hero. Covers its parent (which
// must be `relative`) until drei's loaders finish, then fades out. Drop it inside a
// 3D section whose model is heavy enough to be worth a loading state.
// ponytail: 15s safety ceiling so a stalled asset never traps the user.
export default function Preloader({
  label = "QuantumSlate",
  onReady,
}: {
  label?: string;
  onReady?: () => void;
}) {
  const { active, progress } = useProgress();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) setReady(true);
  }, [active, progress]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 15000);
    return () => clearTimeout(t);
  }, []);

  // Tell the parent the moment loading is done, so it can start its animation as
  // the preloader fades instead of behind it.
  useEffect(() => {
    if (ready) onReady?.();
  }, [ready, onReady]);

  const C = 2 * Math.PI * 44;

  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-background transition-opacity duration-700 ease-out ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-navy/10" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className="text-navy transition-[stroke-dashoffset] duration-200 ease-out"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-base font-semibold tabular-nums text-navy">
          {Math.round(progress)}%
        </span>
      </div>
      <span className="text-sm font-semibold tracking-tight text-navy">{label}</span>
    </div>
  );
}
