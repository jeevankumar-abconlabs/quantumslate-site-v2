import { getProject } from "@theatre/core";
import heroState from "../../public/json-files/hero-drone.json";

// Separate project/JSON for the hero (resting) drone, authored independently in Studio.
export const heroProject = getProject("QuantumSlate Hero", {
  state: heroState,
});
export const heroSheet = heroProject.sheet("Hero");
