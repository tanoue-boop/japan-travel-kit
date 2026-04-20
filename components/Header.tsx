"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";

const navLinks = [
  { href: "/guides",         label: "Guides",      iconSrc: "/icons/icon-guide.svg" },
  { href: "/sim-cards",      label: "SIM Cards",   iconSrc: "/icons/icon-sim.svg" },
  { href: "/wifi-pocket",    label: "Pocket WiFi", iconSrc: "/icons/icon-wifi.svg" },
  { href: "/transportation", label: "Transport",   iconSrc: "/icons/icon-transport.svg" },
  { href: "/money",          label: "Money",       iconSrc: "/icons/icon-money.svg" },
];

export default function Header() {
  const [open, setOpen]         = useState(false);
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
          <span className={styles.logoIcon}>
            <Image src="/icons/logo.svg" width={33} height={30} alt="Japan Travel Kit logo" unoptimized />
          </span>
          <span className={styles.logoText}>Japan <em>Travel Kit</em></span>
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              <Image src={l.iconSrc} width={20} height={20} alt="" unoptimized />
              {l.label}
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
            <span className={styles.mobileIcon}>
              <Image src={l.iconSrc} width={20} height={20} alt="" unoptimized />
            </span>
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
