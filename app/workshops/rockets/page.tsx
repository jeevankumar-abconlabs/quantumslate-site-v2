import type { Metadata } from "next";
import Rocket3D from "../../components/Rocket";
import WorkshopTitle from "../../components/WorkshopTitle";
import WorkshopDetails from "../../components/WorkshopDetails";

// md+: the "Rockets" title renders inside the scene (right side, after the
// rocket docks left). Mobile: WorkshopTitle shows it below the scene instead.
export const metadata: Metadata = {
  title: "Model Rocketry Workshop — Build & Launch a Real Rocket | QuantumSlate",
  description:
    "Engineer and launch your own model rocket with QuantumSlate: fin design, motor mounting, parachute recovery, and a live countdown launch. Hands-on rocketry workshop for students and enthusiasts in India.",
};

export default function RocketsPage() {
  return (
    <main className="flex-1 bg-[#F1E8DA]">
      <Rocket3D />
      <WorkshopTitle label="Rockets" />
      <WorkshopDetails workshop="rockets" />
    </main>
  );
}
