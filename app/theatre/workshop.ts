import { getProject } from "@theatre/core";
import workshopDroneState from "../../public/json-files/workshops/drone-3.json";
// Importing this boots Theatre Studio in dev when NEXT_PUBLIC_THEATRE_STUDIO=1.
export { STUDIO_ENABLED } from "./studioInit";

// Independent project/sheet for the Workshops "Drones" drone, authored in Studio
// separately from the hero. The seed JSON places it at the hero's resting pose with
// an empty sequence, so it looks identical until you animate it.
//
// To edit: set NEXT_PUBLIC_THEATRE_STUDIO=1 and NEXT_PUBLIC_THEATRE_TARGET=drones in
// .env, restart dev, open /workshops/drones, and author keyframes on the "Drone"
// object in the Studio timeline. Then export the state and save it over
// public/json-files/workshops/drone-workshop.json.
export const workshopProject = getProject("QuantumSlate Workshop Drone", {
  state: workshopDroneState,
});
export const workshopSheet = workshopProject.sheet("Drones");
