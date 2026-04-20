"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/sim-cards",      label: "SIM Cards",   icon: "📱" },
  { href: "/wifi-pocket",    label: "Pocket WiFi", icon: "📶" },
  { href: "/transportation", label: "Transport",   icon: "🚅" },
  { href: "/money",          label: "Money",       icon: "💴" },
];

export default function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="header__inner">
        {/* Logo */}
        <Link href="/" className="logo">
          <span className="logo__icon">🗾</span>
          <span className="logo__text">
            Japan <em>Travel Kit</em>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="header-nav">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="header-nav__link">
              <span>{l.icon}</span>{l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href="/sim-cards" className="btn-nav header-cta">
          Get Connected →
        </Link>

        {/* Hamburger */}
        <button
          className={`hamburger${open ? " open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
        </button>
      </div>

      {/* Mobile nav */}
      <nav className={`mobile-nav${open ? " open" : ""}`}>
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="mobile-nav__link"
            onClick={() => setOpen(false)}
          >
            <span className="mobile-nav__icon">{l.icon}</span>
            {l.label}
          </Link>
        ))}
        <Link
          href="/sim-cards"
          className="btn-primary mobile-nav__cta"
          onClick={() => setOpen(false)}
        >
          Get Connected →
        </Link>
      </nav>
    </header>
  );
}
