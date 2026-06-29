"use client";

// Animation editor toggle. Set NEXT_PUBLIC_THEATRE_STUDIO=1 in .env to edit in dev;
// off otherwise (and always off in production builds).
export const STUDIO_ENABLED =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_THEATRE_STUDIO === "1";

// Theatre Studio (the visual editor) loads dynamically and only once, so its bundle
// never ships to production and HMR doesn't double-register it.
if (typeof window !== "undefined" && STUDIO_ENABLED) {
  const g = globalThis as { __theatreStudioInit?: boolean };
  if (!g.__theatreStudioInit) {
    g.__theatreStudioInit = true;
    void (async () => {
      const studio = (await import("@theatre/studio")).default;
      const extension = (await import("@theatre/r3f/dist/extension")).default;
      studio.extend(extension);
      studio.initialize();
    })();
  }
}
