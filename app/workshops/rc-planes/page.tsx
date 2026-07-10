import RcPlane from "../../components/RcPlane";
import WorkshopTitle from "../../components/WorkshopTitle";
import WorkshopDetails from "../../components/WorkshopDetails";

// md+: the "RC Planes" title renders inside the scene (right side, after the
// plane docks left). Mobile: WorkshopTitle shows it below the scene instead.
export default function RcPlanesPage() {
  return (
    <main className="flex-1 bg-[#F1E8DA]">
      <RcPlane />
      <WorkshopTitle label="RC Planes" />
      <WorkshopDetails workshop="rc-planes" />
    </main>
  );
}
