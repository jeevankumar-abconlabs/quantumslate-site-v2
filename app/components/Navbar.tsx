"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { introState } from "../introState";

type NavLink =
  | { name: string; href: string }
  | { name: string; children: { name: string; href: string }[] };

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [revealed, setRevealed] = useState(!isHome);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);   // desktop hover
  const [mobileSub, setMobileSub] = useState<string | null>(null); // mobile accordion

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Workshops",
      children: [
        { name: "Drones",    href: "/workshops/drones"    },
        { name: "RC Planes", href: "/workshops/rc-planes" },
        { name: "Rockets",   href: "/workshops/rockets"   },
      ],
    },
    { name: "Competitions", href: "/competitions" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Defence", href: "/defence" },
  ];

  // Only the first Home load waits for the drone intro to finish. Other routes,
  // and returns to Home after the intro already played, show immediately.
  useEffect(() => {
    if (!isHome || introState.played) {
      setRevealed(true);
      return;
    }
    setRevealed(false);
    const onReveal = () => setRevealed(true);
    window.addEventListener("hero:revealed", onReveal);
    const t = setTimeout(() => setRevealed(true), 13000); // fallback
    return () => {
      window.removeEventListener("hero:revealed", onReveal);
      clearTimeout(t);
    };
  }, [isHome]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeMobile = () => { setIsOpen(false); setMobileSub(null); };

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[1200px] z-40 px-6 sm:px-8 py-2.5 bg-background/55 backdrop-blur-md border border-navy/10 rounded-full shadow-[0_8px_30px_rgba(20,39,78,0.08)] transition-all duration-700 ease-out top-4 sm:top-6 ${
          revealed ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="font-black text-[14px] sm:text-[16px] md:text-[18px] tracking-tight text-navy uppercase"
          >
            QUANTUM<span className="text-navy">SLATE</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              "children" in link ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(link.name)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <button
                    className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-navy/70 hover:text-navy transition-colors duration-200 cursor-pointer"
                    aria-expanded={openMenu === link.name}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === link.name ? "rotate-180 text-navy" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {openMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-60"
                      >
                        <div className="bg-background/95 backdrop-blur-md border border-navy/10 rounded-2xl p-2 shadow-2xl">
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-3 rounded-xl text-[13px] font-medium text-navy/70 hover:text-navy hover:bg-navy/[0.06] transition-colors duration-200"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-sans text-[13px] font-medium text-navy/70 hover:text-navy transition-colors duration-200"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center justify-center px-7 h-9 rounded-full font-unbounded font-bold text-[11px] uppercase tracking-widest bg-navy text-background hover:bg-navy/90 hover:scale-105 transition-all duration-300"
          >
            Book Now
          </Link>

          {/* Mobile hamburger — hidden when panel is open (X lives inside panel) */}
          <button
            onClick={() => setIsOpen(true)}
            className={`lg:hidden p-2 rounded-lg text-navy/80 hover:text-navy transition-colors cursor-pointer ${isOpen ? "invisible" : ""}`}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </nav>

      {/* ── Full-screen mobile panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-background flex flex-col px-8 pt-6 pb-10 lg:hidden overflow-y-auto"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between mb-14">
              <Link
                href="/"
                onClick={closeMobile}
                className="font-black text-[15px] tracking-tight text-navy uppercase"
              >
                QUANTUM<span className="text-navy">SLATE</span>
              </Link>
              <button
                onClick={closeMobile}
                className="p-2 text-navy/70 hover:text-navy transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links — large, staggered */}
            <div className="flex flex-col flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-navy/10"
                >
                  {"children" in link ? (
                    <>
                      <button
                        onClick={() => setMobileSub(mobileSub === link.name ? null : link.name)}
                        className="w-full flex items-center justify-between py-4 font-unbounded font-black text-[2.6rem] sm:text-[3.2rem] leading-none text-navy hover:text-navy/70 transition-colors duration-200 cursor-pointer text-left"
                        aria-expanded={mobileSub === link.name}
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          className={`w-7 h-7 flex-shrink-0 transition-transform duration-300 ${mobileSub === link.name ? "rotate-180 text-navy" : "text-navy/50"}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobileSub === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pb-4 pl-1">
                              {link.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  onClick={closeMobile}
                                  className="font-unbounded font-bold text-xl sm:text-2xl text-navy/55 hover:text-navy py-2.5 transition-colors duration-200"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="block py-4 font-unbounded font-black text-[2.6rem] sm:text-[3.2rem] leading-none text-navy hover:text-navy/70 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="mt-10 pt-6 border-t border-navy/20"
            >
              <p className="font-mono text-[11px] text-navy/40 tracking-wide">
                quantumslateofficial@gmail.com
              </p>
              <p className="font-mono text-[11px] text-navy/40 tracking-wide mt-1">
                aerospace education · india
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
