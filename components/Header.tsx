"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/sim-cards", label: "SIM Cards" },
  { href: "/wifi-pocket", label: "Pocket WiFi" },
  { href: "/transportation", label: "Transportation" },
  { href: "/money", label: "Money & Payment" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-japan-red">🇯🇵</span>
            <span className="text-slate-900">Japan</span>
            <span className="text-japan-red">Travel Kit</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-japan-red font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-slate-700 mb-1" />
            <div className="w-5 h-0.5 bg-slate-700 mb-1" />
            <div className="w-5 h-0.5 bg-slate-700" />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 px-1 text-slate-600 hover:text-japan-red font-medium text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
