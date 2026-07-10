"use client";

import { useEffect, useRef, useState } from "react";
import type { IProject, ISheet } from "@theatre/core";

// How often the intro replays:
// - Workshop pages: every visit (per-mount ref; a fresh mount replays it).
// - Home showcase (`remember`): once per full page load — navigating away and
//   back resumes the docked loop, since the WeakSet below outlives the mount.
//   Scroll-away/scroll-back never replays either (the scenes stay mounted).
// A scroll-away DURING the intro replays it from the top next time.
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
      if (!introPlayed.current) {
        sheet.sequence.position = 0;
        const finished = await sheet.sequence.play({ range: [0, introEnd] });
        if (!finished || cancelled) return;
        introPlayed.current = true;
        if (remember) remembered.add(sheet);
      }
      setIntroDone(true);
      // Resume the loop from wherever it was paused; snap in if outside the range.
      if (sheet.sequence.position < introEnd || sheet.sequence.position >= loopEnd) {
        sheet.sequence.position = introEnd;
      }
      sheet.sequence.play({ range: [introEnd, loopEnd], iterationCount: Infinity });
    });

    return () => {
      cancelled = true;
      sheet.sequence.pause();
    };
  }, [enabled, project, sheet, introEnd, loopEnd, remember]);

  return introDone;
}
