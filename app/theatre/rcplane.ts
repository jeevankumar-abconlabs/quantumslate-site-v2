import { getProject } from "@theatre/core";
import rcPlaneState from "../../public/json-files/workshops/rcplane-workshop.json";
// Importing this boots Theatre Studio in dev when NEXT_PUBLIC_THEATRE_STUDIO=1.
export { STUDIO_ENABLED } from "./studioInit";

// Independent project/sheet for the Workshops "RC Planes" model, authored in Studio
// separately from the drone. Starts with an empty sequence — the plane just sits at
// its JSX default placement until you animate it.
//
// To edit: set NEXT_PUBLIC_THEATRE_STUDIO=1 in .env, restart dev, open
// /workshops/rc-planes, and author keyframes on the "Plane" object in the Studio
// timeline. Then export the state and save it over
// public/json-files/workshops/rcplane.json.
export const rcPlaneProject = getProject("QuantumSlate RC Plane", {
  state: rcPlaneState,
});
export const rcPlaneSheet = rcPlaneProject.sheet("RC Planes");
