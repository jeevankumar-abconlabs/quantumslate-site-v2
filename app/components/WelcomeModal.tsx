"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { introState } from "../introState";

// Module-level flag: resets to false on every fresh page load / refresh.
// This means the modal shows once per page load but NOT again on SPA
// route changes within the same load.
let hasShownThisLoad = false;
//mods in welcome popup
export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Already shown during this page load — skip.
    if (hasShownThisLoad) return;

    const isHome = pathname === "/";

    // On home page wait for the cinematic hero intro to finish.
    if (isHome && !introState.played) {
      const onReveal = () => {
        hasShownThisLoad = true;
        setTimeout(() => setIsOpen(true), 600);
      };
      window.addEventListener("hero:revealed", onReveal);

      // Safety fallback if the event never fires
      const fallbackTimer = setTimeout(() => {
        hasShownThisLoad = true;
        setIsOpen(true);
      }, 13500);

      return () => {
        window.removeEventListener("hero:revealed", onReveal);
        clearTimeout(fallbackTimer);
      };
    } else {
      // Any other page: show shortly after mount
      const timer = setTimeout(() => {
        hasShownThisLoad = true;
        setIsOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Clean Dialogue Box */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-navy p-6 sm:p-8 text-background shadow-2xl border border-gold/30">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Drone &amp; Aircraft Olympics™ 2026
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/70">
            24 &amp; 25 October 2026 · Velammal Bodhi Campus, Ponneri, Chennai
          </p>
        </div>

        {/* Poster Showcase Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] overflow-hidden shadow-lg border border-white/10">
            <Image
              src="/olympicsposters/Drone_Olympics_2026.png"
              alt="Drone Olympics 2026 Poster"
              fill
              sizes="(max-width: 640px) 40vw, 250px"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden shadow-lg border border-white/10">
            <Image
              src="/olympicsposters/Aircraft_Olympics_2026.png"
              alt="Aircraft Olympics 2026 Poster"
              fill
              sizes="(max-width: 640px) 40vw, 250px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Action Button strictly to /competitions */}
        <div className="mt-6 flex flex-col gap-2">
          <Link
            href="/competitions"
            onClick={handleClose}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#F1E8DA] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-navy shadow-md transition-all hover:bg-[#e8ddd0] hover:shadow-lg active:translate-y-0.5"
          >
            <span>Go to Registrations &amp; Rule Books</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <button
            onClick={handleClose}
            className="mt-1 text-center text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
