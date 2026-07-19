import type { Metadata } from "next";

// Metadata lives here because page.tsx is a client component.
export const metadata: Metadata = {
  title: "Contact & Bookings — Workshops, Competitions and Defence Enquiries",
  description:
    "Book a QuantumSlate drone, aircraft or rocket workshop, enter the Drone Olympics™, or discuss defence UAV solutions. Email quantumslateofficial@gmail.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
