"use client";

import Link from "next/link";

import { useCallback, useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import DroneModel from "./DroneModel";
import FadingGrid from "./FadingGrid";
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
  // True once the intro drone has actually painted a few real frames (not just
  // finished network-loading) — see DroneModel's IntroDrone for why that gap
  // matters. Gates both the preloader fade-out and the sequence start so the
  // Theatre clock never ticks during a GPU compile stall.
  const [primed, setPrimed] = useState(introState.played);
  const handleIntroPrimed = useCallback(() => setPrimed(true), []);

  // Pause the hero sequence on unmount to release resources and reset state.
  useEffect(() => {
    return () => {
      heroSheet.sequence.pause();
    };
  }, []);

  // Lock page scroll while the cinematic intro plays — the action is all in the
  // hero, so don't let the user scroll past it. Unlocks the moment it reveals.
  // Locks <html> too, not just <body>: globals.css sets `overflow-x: clip` on
  // html for the iPad gutter fix, which per spec stops body's overflow from
  // propagating to the viewport scrollbox — html is what actually scrolls now.
  useEffect(() => {
    if (STUDIO_ENABLED || revealed) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = "";
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
    const t = setTimeout(() => {
      setAssetsReady(true);
      setPrimed(true);
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (introState.played) {
      playHero();
      return;
    }
    // Editor mode: let Studio drive the timeline; don't auto-play or reveal the overlay.
    if (STUDIO_ENABLED) return;
    // Wait until the model is loaded AND actually painting real frames, so the
    // entrance animates from a warmed-up GPU instead of skipping keyframes.
    if (!assetsReady || !primed) return;

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
  }, [assetsReady, primed]);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#F1E8DA]">
      <FadingGrid />

      {/* ponytail: hero background image removed for now — it interfered with
          the intro animation lock. Re-add the orientation-based <Image> pair
          when the animation issue is sorted. */}

      <DroneModel revealed={revealed} onIntroPrimed={handleIntroPrimed} />

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
            primed ? "pointer-events-none opacity-0" : "opacity-100"
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
          className={`transition-all duration-1000 ease-out ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <img
            src="/logo/quantumslate-logo.png"
            alt="QuantumSlate"
            className="w-[clamp(16rem,72vw,56rem)]"
          />
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

      {/* ── Registration ticker ── */}
      <div
        className={`pointer-events-auto absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-[#C7B7A3]/30 bg-[#002166]/90 backdrop-blur-sm transition-all duration-700 ease-out ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          transitionDelay: revealed ? "400ms" : "0ms",
          paddingBottom: "env(safe-area-inset-bottom)"
        }}
      >
        {/* top hairline accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C7B7A3]/60 to-transparent" />

        <div className="flex items-center">
          {/* Left badge — stays fixed */}
          <div className="flex shrink-0 items-center gap-2 border-r border-[#C7B7A3]/20 px-3 py-2 sm:px-4 sm:py-2.5">
            {/* broadcast icon */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C7B7A3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M3 11l19-9-9 19-2-8-8-2z" />
            </svg>
            {/* label hidden on mobile — icon alone is enough */}
            <span className="hidden sm:inline whitespace-nowrap text-[13px] font-black uppercase tracking-[0.2em] text-[#F1E8DA]">
              Registrations Open
            </span>
          </div>

          {/* Scrolling track */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div
              className="flex w-max gap-0"
              style={{ animation: "ticker-scroll var(--ticker-dur, 28s) linear infinite" }}
            >
              {/* Duplicate the content for a seamless loop */}
              {[0, 1].map((pass) => (
                <div key={pass} className="flex items-center" aria-hidden={pass === 1}>
                  {[
                    { label: "Drone Olympics\u2122 2026" },
                    { label: "Aircraft Olympics\u2122 2026" },
                  ].map(({ label }) => (
                    <>
                      <span
                        key={label}
                        className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[#F1E8DA]/80"
                      >
                        <span>{label}</span>
                        <span className="text-[#C7B7A3]/50">/</span>
                        <span className="font-medium tracking-normal normal-case text-[#C7B7A3]">
                          24 &amp; 25 Oct 2026
                        </span>
                        {/* venue: hidden on mobile */}
                        <span className="hidden sm:inline text-[#C7B7A3]/50">/</span>
                        <span className="hidden sm:inline font-medium tracking-normal normal-case text-[#C7B7A3]">
                          Velammal Bodhi Campus, Ponneri, Chennai
                        </span>
                      </span>
                      {/* separator bar */}
                      <span className="h-3 w-px bg-[#C7B7A3]/25" />
                    </>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right CTA — stays fixed */}
          <div className="shrink-0 border-l border-[#C7B7A3]/20 px-2 py-1.5 sm:px-3">
            <Link
              href="/competitions"
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#F1E8DA] px-3 sm:px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#002166] transition-all hover:bg-white active:scale-95"
            >
              <span className="hidden sm:inline">Register</span>
              <span className="sm:hidden">Join</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* faster on mobile since less content is shown */
        :root { --ticker-dur: 18s; }
        @media (min-width: 640px) { :root { --ticker-dur: 28s; } }
      `}</style>
    </div>
  );
}
