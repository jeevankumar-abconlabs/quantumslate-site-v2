import DroneScene from "./components/DroneScene";
import AboutPreview from "./components/AboutPreview";
import Workshops from "./components/Workshops";
import HomeShowcase from "./components/HomeShowcase";
import CtaBand from "./components/CtaBand";

export default function Home() {
  return (
    <main className="flex-1 bg-[#F1E8DA]">
      <DroneScene />
      <AboutPreview />
      <Workshops />
      <HomeShowcase />
      <CtaBand />
    </main>
  );
}
