"use client";

import { useEffect } from "react";
import type { IProject, ISheet } from "@theatre/core";

// Loop a sheet's sequence as: play the motion (0 → motionEnd), hold for `gapMs`,
// repeat. This skips the authored dead time after the last keyframe (just drag the
// sequence `length` down or leave it — we only ever play up to motionEnd) and gives
// a precise, code-controlled gap between cycles.
export function useLoopedSequence(
  enabled: boolean,
  project: IProject,
  sheet: ISheet,
  motionEnd: number,
  gapMs = 2000,
) {
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    project.ready.then(async () => {
      while (!cancelled) {
        sheet.sequence.position = 0;
        const finished = await sheet.sequence.play({ range: [0, motionEnd] });
        if (!finished || cancelled) return;
        await new Promise<void>((resolve) => {
          timer = setTimeout(resolve, gapMs);
        });
      }
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      sheet.sequence.pause();
    };
  }, [enabled, project, sheet, motionEnd, gapMs]);
}
