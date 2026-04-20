"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/sim-cards",      label: "SIM Cards",      icon: "📱" },
  { href: "/wifi-pocket",    label: "Pocket WiFi",    icon: "📶" },
  { href: "/transportation", label: "Transport",      icon: "🚅" },
  { href: "/money",          label: "Money",          icon: "💴" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-crimson-500 rounded-lg flex items-center justify-center text-base shadow-sm group-hover:shadow-glow transition-shadow duration-300">
              🗾
            </div>
            <div className="leading-tight">
              <span className="font-display font-bold text-navy-800 text-lg tracking-tight">
                Japan
              </span>
              <span className="font-display font-bold text-crimson-500 text-lg tracking-tight ml-1">
                Travel Kit
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-crimson-500 hover:bg-crimson-50 transition-all duration-150"
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/sim-cards" className="btn-primary py-2.5 px-5 text-xs">
              Get Connected →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-80 pb-4" : "max-h-0"}`}>
          <div className="border-t border-gray-100 pt-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-crimson-50 hover:text-crimson-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/sim-cards"
                className="btn-primary w-full justify-center py-3"
                onClick={() => setMobileOpen(false)}
              >
                Get Connected →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
