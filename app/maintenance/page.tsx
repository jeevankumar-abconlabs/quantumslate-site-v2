import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Maintenance",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="flex-1 bg-[#F1E8DA] flex items-center justify-center px-6 py-24 text-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#002166]">
          We&apos;ll be right back
        </h1>
        <p className="mt-4 text-[#002166]/70 max-w-md mx-auto">
          QuantumSlate is undergoing scheduled maintenance. Please check back
          shortly.
        </p>
      </div>
    </main>
  );
}
