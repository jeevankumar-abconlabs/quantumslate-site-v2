import DroneScene from "./components/DroneScene";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background">
      <div className="h-[100dvh] w-full">
        <DroneScene />
      </div>
    </main>
  );
}
