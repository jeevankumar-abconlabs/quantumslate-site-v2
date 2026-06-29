import RcPlane from "../../components/RcPlane";
import WorkshopTitle from "../../components/WorkshopTitle";

export default function RcPlanesPage() {
  return (
    <main className="flex-1">
      <RcPlane />
      <WorkshopTitle label="RC Planes" />
    </main>
  );
}
