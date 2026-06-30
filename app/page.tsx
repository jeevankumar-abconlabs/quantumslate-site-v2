import DroneScene from "./components/DroneScene";
import AboutPreview from "./components/AboutPreview";
import Workshops from "./components/Workshops";
import CtaBand from "./components/CtaBand";

export default function Home() {
  return (
    <main className="flex-1">
      <DroneScene />
      <AboutPreview />
      <Workshops />
      <CtaBand />
    </main>
  );
}
