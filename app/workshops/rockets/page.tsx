import Rocket3D from "../../components/Rocket";
import WorkshopTitle from "../../components/WorkshopTitle";
import WorkshopDetails from "../../components/WorkshopDetails";

// md+: the "Rockets" title renders inside the scene (right side, after the
// rocket docks left). Mobile: WorkshopTitle shows it below the scene instead.
export default function RocketsPage() {
  return (
    <main className="flex-1 bg-[#F1E8DA]">
      <Rocket3D />
      <WorkshopTitle label="Rockets" />
      <WorkshopDetails workshop="rockets" />
    </main>
  );
}
