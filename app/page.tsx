import DroneScene from "./components/DroneScene";
import Workshops from "./components/Workshops";

export default function Home() {
  return (
    <main className="flex-1">
      <DroneScene />
      <Workshops />
    </main>
  );
}
