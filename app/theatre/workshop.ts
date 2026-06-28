import { getProject } from "@theatre/core";
import workshopDroneState from "../../public/json-files/workshops/drone-workshop.json";

// Separate project/JSON for the Workshops "Drones" card flight, authored in
// Studio independently of the hero. Set NEXT_PUBLIC_THEATRE_TARGET=drones (and
// NEXT_PUBLIC_THEATRE_STUDIO=1) to edit it. The Studio editor itself is booted
// once in ../theatre/drone.ts; this module just exposes the sheet to author.
//
// ponytail: ships with an empty sequence — until you author keyframes in Studio
// the click reveals the text instantly. Author the fly-away, then export the
// state over public/json-files/workshop-drone.json.
export const workshopProject = getProject("QuantumSlate Workshop Drone", {
  state: workshopDroneState,
});
export const workshopSheet = workshopProject.sheet("Drones");
