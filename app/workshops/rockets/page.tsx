import Rocket3D from "../../components/Rocket";
import WorkshopTitle from "../../components/WorkshopTitle";

export default function RocketsPage() {
  return (
    <main className="flex-1">
      <Rocket3D />
      <WorkshopTitle label="Rockets" />
    </main>
  );
}
