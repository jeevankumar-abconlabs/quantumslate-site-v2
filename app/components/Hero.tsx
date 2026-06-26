"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import DroneModel from "./DroneModel";
import { project, sheet, STUDIO_ENABLED } from "../theatre/drone";
import { heroProject, heroSheet } from "../theatre/hero";

// Play the hero drone's authored entrance (if any) once the site is revealed.
function playHero() {
  heroProject.ready.then(() => heroSheet.sequence.play());
}

const NAV_LINKS = [
  "About",
  "Workshops",
  "Competitions",
  "Services",
  "Contact",
  "Defence",
];

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Gate the intro on the drone + HDRI actually finishing, so the fly-in never
  // plays against a blank screen. drei tracks every loader in one global store.
  const { active, progress } = useProgress();
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) setAssetsReady(true);
  }, [active, progress]);

  // Safety net: never trap the user behind a stuck loader if an asset stalls.
  // ponytail: 12s ceiling; raise it if real-world loads legitimately run longer.
  useEffect(() => {
    const t = setTimeout(() => setAssetsReady(true), 12000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Editor mode: let Studio drive the timeline; don't auto-play or reveal the overlay.
    if (STUDIO_ENABLED) return;
    // Wait until the model is loaded so the entrance animates the real drone.
    if (!assetsReady) return;

    // Reduced motion: skip the fly-in and show the site immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      playHero();
      return;
    }
    let cancelled = false;
    project.ready.then(() => {
      // Play the authored drone intro once, then reveal the site when it lands.
      sheet.sequence.play({ range: [0, 2.933] }).then((finished) => {
        if (finished && !cancelled) {
          setRevealed(true);
          playHero();
        }
      });
    });
    return () => {
      cancelled = true;
    };
  }, [assetsReady]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-background">
      {/* Faint engineering grid, fading out toward the edges. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,39,78,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,39,78,0.12)_1px,transparent_1px)] bg-[size:clamp(36px,6vw,64px)_clamp(36px,6vw,64px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
      />

      <DroneModel revealed={revealed} />

      {/* Preloader: covers the scene until assets are in, then fades as the drone flies in. */}
      {!STUDIO_ENABLED && (
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

      {/* Floating, rounded, blurred navbar (Apple-style). */}
      <header
        className={`absolute inset-x-0 top-4 z-10 flex justify-center px-4 transition-all duration-700 ease-out ${
          revealed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex h-14 w-full items-center justify-between rounded-full border border-navy/10 bg-background/55 px-6 shadow-[0_8px_30px_rgba(20,39,78,0.08)] backdrop-blur-xl md:w-auto md:justify-start md:gap-8">
          <span className="text-base font-semibold tracking-tight text-navy">
            QuantumSlate
          </span>
          <ul className="hidden items-center gap-7 text-sm text-navy/90 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="transition-colors hover:text-navy">
                  {link}
                </a>
              </li>
            ))}
          </ul>
          {/* Hamburger: mobile only */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="text-navy md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Sliding mobile menu */}
      <div
        className={`fixed inset-0 z-20 flex flex-col bg-background px-8 py-7 text-navy transition-transform duration-500 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">
            QuantumSlate
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="text-navy"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="mt-12 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-4xl font-bold tracking-tight"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto text-xs text-navy/60">
          <p>quantumslateofficial@gmail.com</p>
          <p>aerospace education · india</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex -translate-y-[10vh] flex-col items-center justify-center px-6 text-center">
        <h1
          className={`text-[clamp(2.5rem,9vw,7rem)] font-semibold tracking-tight text-navy transition-all duration-1000 ease-out ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          QuantumSlate
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
