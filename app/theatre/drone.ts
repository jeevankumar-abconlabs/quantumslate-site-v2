import { getProject } from "@theatre/core";
import droneState from "../../public/json-files/drone-animation.json";
export { STUDIO_ENABLED } from "./studioInit";

// Which drone Studio shows for authoring: "intro" (the fly-in) or "hero" (resting).
// Set NEXT_PUBLIC_THEATRE_TARGET=intro in .env to edit the intro animation.
export const STUDIO_TARGET =
  process.env.NEXT_PUBLIC_THEATRE_TARGET === "intro" ? "intro" : "hero";


// The authored animation, exported from Studio, is the single source of truth.
export const project = getProject("QuantumSlate Drone", {
  state: droneState,
});
export const sheet = project.sheet("Drone Scene");
