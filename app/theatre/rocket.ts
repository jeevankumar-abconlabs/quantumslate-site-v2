import { getProject } from "@theatre/core";
import rocketState from "../../public/json-files/workshops/rocket-workshop.json";
// Importing this boots Theatre Studio in dev when NEXT_PUBLIC_THEATRE_STUDIO=1.
export { STUDIO_ENABLED } from "./studioInit";

// Independent project/sheet for the Workshops "Rockets" model, authored in Studio
// separately. Starts with an empty sequence — the rocket just sits at its JSX
// default placement until you animate it.
//
// To edit: set NEXT_PUBLIC_THEATRE_STUDIO=1 in .env, restart dev, open
// /workshops/rockets, and author keyframes on the "Rocket" object in the Studio
// timeline. Then export the state and save it over
// public/json-files/workshops/rocket.json.
export const rocketProject = getProject("QuantumSlate Rocket", {
  state: rocketState,
});
export const rocketSheet = rocketProject.sheet("Rockets");
