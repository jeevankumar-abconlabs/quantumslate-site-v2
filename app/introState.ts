// Has the cinematic hero intro already played this page load? Module state, so
// it resets on a full reload (first impression still plays) but survives
// client-side navigation — returning to Home then reveals instantly instead of
// replaying the fly-in and waiting on loaders that never re-fire for cached assets.
export const introState = { played: false };
