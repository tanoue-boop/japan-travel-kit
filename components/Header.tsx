"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";

const navLinks = [
  { href: "/guides",         label: "Guides",      icon: "📖" },
  { href: "/sim-cards",      label: "SIM Cards",   icon: "📱" },
  { href: "/wifi-pocket",    label: "Pocket WiFi", icon: "📶" },
  { href: "/transportation", label: "Transport",   icon: "🚅" },
  { href: "/money",          label: "Money",       icon: "💴" },
];

export default function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🗾</span>
          <span className={styles.logoText}>Japan <em>Travel Kit</em></span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              <span>{l.icon}</span>{l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Link href="/sim-cards" className={styles.ctaBtn}>Get Connected →</Link>
        </div>

        <button
          className={`${styles.hamburger}${open ? ` ${styles.open}` : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </div>

      <nav className={`${styles.mobileNav}${open ? ` ${styles.open}` : ""}`}>
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
            <span className={styles.mobileIcon}>{l.icon}</span>
            {l.label}
          </Link>
        ))}
        <Link href="/sim-cards" className={styles.mobileCta} onClick={() => setOpen(false)}>
          Get Connected →
        </Link>
      </nav>
    </header>
  );
}
