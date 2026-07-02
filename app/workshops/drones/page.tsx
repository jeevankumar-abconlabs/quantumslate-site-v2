import WorkshopDrone from "../../components/WorkshopDrone";
import WorkshopTitle from "../../components/WorkshopTitle";
import DroneWorkshop from "../../components/DroneWorkshop";

export default function DronesPage() {
  return (
    <main className="flex-1 bg-[#F1E8DA]">
      <WorkshopDrone />
      <WorkshopTitle label="Drones" />
      <DroneWorkshop />
    </main>
  );
}
