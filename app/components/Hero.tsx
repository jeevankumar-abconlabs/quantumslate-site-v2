"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import DroneModel from "./DroneModel";
import { project, sheet, STUDIO_ENABLED } from "../theatre/drone";
import { heroProject, heroSheet } from "../theatre/hero";
import { introState } from "../introState";

// Play the hero drone's authored entrance (if any) once the site is revealed.
// Plays a single time and holds on the final frame — no looping back to start.
function playHero() {
  heroProject.ready.then(() => {
    heroSheet.sequence.pause();
    heroSheet.sequence.position = 0;
    heroSheet.sequence.play({ iterationCount: 1 });
  });
}

// Tell the global Navbar the hero is on screen so it can fade in.
function reveal(setRevealed: (v: boolean) => void) {
  introState.played = true;
  setRevealed(true);
  window.dispatchEvent(new Event("hero:revealed"));
}

export default function Hero() {
  const [revealed, setRevealed] = useState(introState.played);
  const [crashed, setCrashed] = useState(false);
  // Gate the intro on the drone + HDRI actually finishing, so the fly-in never
  // plays against a blank screen. drei tracks every loader in one global store.
  const { active, progress } = useProgress();
  const [assetsReady, setAssetsReady] = useState(introState.played);

  // Pause the hero sequence on unmount to release resources and reset state.
  useEffect(() => {
    return () => {
      heroSheet.sequence.pause();
    };
  }, []);

  // Lock page scroll while the cinematic intro plays — the action is all in the
  // hero, so don't let the user scroll past it. Unlocks the moment it reveals.
  useEffect(() => {
    if (STUDIO_ENABLED || revealed) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [revealed]);

  useEffect(() => {
    if (!active && progress === 100) setAssetsReady(true);
  }, [active, progress]);

  // Safety net: never trap the user behind a stuck loader if an asset stalls.
  // ponytail: 12s ceiling; raise it if real-world loads legitimately run longer.
  useEffect(() => {
    if (introState.played) return;
    const t = setTimeout(() => setAssetsReady(true), 12000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (introState.played) {
      playHero();
      return;
    }
    // Editor mode: let Studio drive the timeline; don't auto-play or reveal the overlay.
    if (STUDIO_ENABLED) return;
    // Wait until the model is loaded so the entrance animates the real drone.
    if (!assetsReady) return;

    // Reduced motion: skip the fly-in and show the site immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal(setRevealed);
      playHero();
      return;
    }
    let cancelled = false;
    let revealTimer: ReturnType<typeof setTimeout>;
    project.ready.then(() => {
      // Play the authored drone intro once. When the drone crashes, shake +
      // cut to black, hold a beat, then reveal the site.
      sheet.sequence.play({ range: [0, 2.933] }).then((finished) => {
        if (!finished || cancelled) return;
        setCrashed(true); // triggers the shake + black flash
        revealTimer = setTimeout(() => {
          if (cancelled) return;
          reveal(setRevealed); // black fades out, site fades in
          playHero();
        }, 850);
      });
    });
    return () => {
      cancelled = true;
      clearTimeout(revealTimer);
      sheet.sequence.pause();
    };
  }, [assetsReady]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#F1E8DA]">
      {/* ponytail: hero background image removed for now — it interfered with
          the intro animation lock. Re-add the orientation-based <Image> pair
          when the animation issue is sorted. */}

      <DroneModel revealed={revealed} />

      {/* Crash cut-to-black: snaps in as the drone hits, holds, then fades to reveal the site. */}
      {crashed && (
        <div
          className={`pointer-events-none absolute inset-0 z-40 bg-black ${
            revealed
              ? "opacity-0 transition-opacity duration-700 ease-out"
              : "opacity-100 transition-opacity duration-150 ease-in"
          }`}
        />
      )}

      {/* Preloader: covers the scene until assets are in, then fades as the drone flies in. */}
      {!STUDIO_ENABLED && !introState.played && (
        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-background transition-opacity duration-700 ease-out ${
            assetsReady ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="relative h-24 w-24">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-navy/10"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                className="text-navy transition-[stroke-dashoffset] duration-200 ease-out"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-base font-semibold tabular-nums text-navy">
              {Math.round(progress)}%
            </span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-navy">
            QuantumSlate
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 flex -translate-y-[10vh] flex-col items-center justify-center px-6 text-center">
        <h1
          className={`break-words text-[clamp(1.75rem,8vw,7rem)] font-black uppercase leading-[0.95] tracking-tight text-navy transition-all duration-1000 ease-out ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          QUANTUMSLATE
        </h1>
        <p
          className={`mt-6 max-w-[min(36rem,90vw)] text-[clamp(0.95rem,2.4vw,1.2rem)] leading-relaxed text-foreground/80 transition-all duration-1000 ease-out ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: revealed ? "150ms" : "0ms" }}
        >
          Pioneering the future of aerospace innovation through hands-on workshops
          and cutting-edge UAV solutions
        </p>
      </div>
    </div>
  );
}
