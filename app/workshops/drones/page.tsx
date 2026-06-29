import WorkshopDrone from "../../components/WorkshopDrone";
import DronesTitle from "../../components/DronesTitle";
import DroneWorkshop from "../../components/DroneWorkshop";

export default function DronesPage() {
  return (
    <main className="flex-1">
      <WorkshopDrone />
      <DronesTitle />
      <DroneWorkshop />
    </main>
  );
}
