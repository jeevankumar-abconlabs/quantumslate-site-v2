import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  colorScheme: "only light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quantumslate.in"),
  title: {
    default:
      "QuantumSlate | Drone, Aircraft & Rocket Workshops + UAV Defence Solutions in India",
    template: "%s | QuantumSlate",
  },
  description:
    "QuantumSlate is an indigenous Indian aerospace company: hands-on drone, aircraft and rocket building workshops for students, national Drone Olympics™ competitions, and UAV surveillance systems for defence and police forces.",
  keywords: [
    "QuantumSlate",
    "drone workshop India",
    "drone building workshop for students",
    "aerospace workshop India",
    "UAV training India",
    "model rocketry workshop",
    "RC plane workshop",
    "STEM aerospace education",
    "drone competition India",
    "tethered surveillance drone",
    "defence UAV India",
    "aeromodelling workshop Chennai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://quantumslate.in",
    siteName: "QuantumSlate",
    title: "QuantumSlate | Drone, Aircraft & Rocket Workshops in India",
    description:
      "Build a real drone, aircraft or rocket with your own hands — then fly it in a national showdown. Plus UAV solutions for defence and public safety.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "QuantumSlate | Drone, Aircraft & Rocket Workshops in India",
    description:
      "Hands-on aerospace workshops, national drone competitions, and UAV defence solutions from India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Organization + WebSite structured data — feeds Google's knowledge panel and
// helps it pick sitelinks (About, Workshops, Defence…) for brand searches.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://quantumslate.in/#org",
      name: "QuantumSlate",
      legalName: "QuantumSlate Private Limited",
      url: "https://quantumslate.in",
      logo: "https://quantumslate.in/logo/quantumslate-logo.png",
      email: "quantumslateofficial@gmail.com",
      description:
        "Indigenous Indian aerospace company building UAVs, tethered surveillance drones and autonomous VTOL aircraft, and running hands-on drone, aircraft and rocket workshops for students.",
      sameAs: [
        "https://www.linkedin.com/company/quantum-slate/",
        "https://www.instagram.com/quantum_slate/",
      ],
      areaServed: "IN",
    },
    {
      "@type": "WebSite",
      "@id": "https://quantumslate.in/#website",
      url: "https://quantumslate.in",
      name: "QuantumSlate",
      publisher: { "@id": "https://quantumslate.in/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
