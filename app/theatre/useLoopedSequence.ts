"use client";

import { useEffect, useRef, useState } from "react";
import type { IProject, ISheet } from "@theatre/core";

// How often the intro replays:
// - Workshop pages: every visit (per-mount ref; a fresh mount replays it).
// - Home showcase (`remember`): once per full page load — navigating away and
//   back resumes the docked loop, since the WeakSet below outlives the mount.
//   Scroll-away/scroll-back never replays either (the scenes stay mounted).
// A scroll-away DURING the intro lets it finish off-screen (the sequence keeps
// advancing; only the canvas render loop stops), so the user never comes back
// to a half-played intro.
const remembered = new WeakSet<ISheet>();

// Play the intro (0 → introEnd) once, then loop [introEnd, loopEnd] forever.
// Returns true once the intro has finished — use it to reveal the title.
export function useIntroThenLoop(
  enabled: boolean,
  project: IProject,
  sheet: ISheet,
  introEnd: number,
  loopEnd: number,
  remember = false,
) {
  const introPlayed = useRef(remember && remembered.has(sheet));
  const [introDone, setIntroDone] = useState(introPlayed.current);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    project.ready.then(async () => {
      if (cancelled) return;
      // ponytail: client dropped the fly-in intro, skip straight to the loop.
      introPlayed.current = true;
      if (remember) remembered.add(sheet);
      // Off-screen by the time the intro wrapped up: the sequence rests at
      // introEnd; the loop (and title reveal) start on the next enable.
      if (cancelled) return;
      setIntroDone(true);
      // Resume the loop from wherever it was paused; snap in if outside the range.
      if (sheet.sequence.position < introEnd || sheet.sequence.position >= loopEnd) {
        sheet.sequence.position = introEnd;
      }
      sheet.sequence.play({ range: [introEnd, loopEnd], iterationCount: Infinity });
    });

    return () => {
      cancelled = true;
      // Pause only the docked loop. An in-flight intro keeps playing to
      // completion off-screen and stops at introEnd on its own.
      if (introPlayed.current) sheet.sequence.pause();
    };
  }, [enabled, project, sheet, introEnd, loopEnd, remember]);

  return introDone;
}
