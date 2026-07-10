import WorkshopDrone from "../../components/WorkshopDrone";
import WorkshopTitle from "../../components/WorkshopTitle";
import WorkshopDetails from "../../components/WorkshopDetails";

// md+: the "Drones" title renders inside the scene (right side, after the
// drone docks left). Mobile: WorkshopTitle shows it below the scene instead.
export default function DronesPage() {
  return (
    <main className="flex-1 bg-[#F1E8DA]">
      <WorkshopDrone />
      <WorkshopTitle label="Drones" />
      <WorkshopDetails workshop="drones" />
    </main>
  );
}
