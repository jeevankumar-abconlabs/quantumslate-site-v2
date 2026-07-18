import type { Metadata } from "next";
import WorkshopDrone from "../../components/WorkshopDrone";
import WorkshopTitle from "../../components/WorkshopTitle";
import WorkshopDetails from "../../components/WorkshopDetails";

// md+: the "Drones" title renders inside the scene (right side, after the
// drone docks left). Mobile: WorkshopTitle shows it below the scene instead.
export const metadata: Metadata = {
  title: "Drone Building Workshop: Build & Fly Your Own Drone | QuantumSlate",
  description:
    "Hands-on drone building workshop by QuantumSlate: assemble the airframe, wire motors and flight controller, and fly the drone you built. UAV training for students and hobbyists in India. No experience needed.",
};

export default function DronesPage() {
  return (
    <main className="flex-1 bg-[#F1E8DA]">
      <WorkshopDrone />
      <WorkshopTitle label="Drones" />
      <WorkshopDetails workshop="drones" />
    </main>
  );
}
