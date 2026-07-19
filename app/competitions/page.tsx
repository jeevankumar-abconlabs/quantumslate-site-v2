import type { Metadata } from "next";
import Competitions from "../components/Competitions";

export const metadata: Metadata = {
  title: "Drone Olympics™ & Aircraft Olympics™ — National Level Competitions",
  description:
    "Every QuantumSlate workshop ends on a national stage: fly your hand-built quadcopter in the Drone Olympics™ or earn your wings in the Aircraft Olympics™ aerobatics showdown.",
  alternates: { canonical: "/competitions" },
};

export default function CompetitionsPage() {
  return (
    <main className="flex-1 pt-28 bg-[#F1E8DA]">
      <Competitions />
    </main>
  );
}
