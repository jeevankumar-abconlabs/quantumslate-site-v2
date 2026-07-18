import Services from "../components/Services";
import CtaBand from "../components/CtaBand";

export default function ServicesPage() {
  return (
    <main className="flex-1 pt-28 bg-[#F1E8DA]">
      <Services />
      <CtaBand
        title="Have a mission that needs a UAV?"
        body="From rapid prototypes to field-ready systems. Tell us the problem and our engineering team will scope, build, and deliver the solution."
        cta="Start a Project"
      />
    </main>
  );
}
