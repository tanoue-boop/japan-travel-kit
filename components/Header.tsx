"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";

// Content guide hubs (surfaced via the Guides dropdown)
const guideHubs = [
  { href: "/guides",             label: "All Guides",   iconSrc: "/icons/icon-guide.svg",       iconAlt: "All Guides icon" },
  { href: "/guides/esim",        label: "eSIM",         iconSrc: "/icons/icon-sim.svg",         iconAlt: "eSIM guides icon" },
  { href: "/guides/transport",   label: "Transport",    iconSrc: "/icons/icon-transport.svg",   iconAlt: "Transport guides icon" },
  { href: "/guides/money",       label: "Money",        iconSrc: "/icons/icon-money.svg",       iconAlt: "Money guides icon" },
  { href: "/guides/attractions", label: "Things to Do", iconSrc: "/icons/icon-attractions.svg", iconAlt: "Things to Do icon" },
];

// Commercial landing pages (kept as-is)
const commercialLinks = [
  { href: "/sim-cards",      label: "SIM Cards",   iconSrc: "/icons/icon-sim.svg",       iconAlt: "SIM Cards icon" },
  { href: "/wifi-pocket",    label: "Pocket WiFi", iconSrc: "/icons/icon-wifi.svg",      iconAlt: "Pocket WiFi icon" },
  { href: "/transportation", label: "Transport",   iconSrc: "/icons/icon-transport.svg", iconAlt: "Transport icon" },
  { href: "/money",          label: "Money",       iconSrc: "/icons/icon-money.svg",     iconAlt: "Money icon" },
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
          {/* Guides dropdown → 5 content hubs */}
          <div className={styles.dropdown}>
            <button type="button" className={`${styles.navLink} ${styles.dropdownTrigger}`} aria-haspopup="true">
              <Image src="/icons/icon-guide.svg" width={20} height={20} alt="Guides icon" unoptimized />
              Guides
              <svg className={styles.dropChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={styles.dropdownPanel}>
              {guideHubs.map((h) => (
                <Link key={h.href} href={h.href} className={styles.dropdownLink}>
                  <Image src={h.iconSrc} width={18} height={18} alt={h.iconAlt} unoptimized />
                  {h.label}
                </Link>
              ))}
            </div>
          </div>

          {commercialLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              <Image src={l.iconSrc} width={20} height={20} alt={l.iconAlt} unoptimized />
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
        <p className={styles.mobileLabel}>Guides</p>
        {guideHubs.map((h) => (
          <Link key={h.href} href={h.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
            <span className={styles.mobileIcon}>
              <Image src={h.iconSrc} width={20} height={20} alt={h.iconAlt} unoptimized />
            </span>
            {h.label}
          </Link>
        ))}
        <p className={styles.mobileLabel}>Compare &amp; Book</p>
        {commercialLinks.map((l) => (
          <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
            <span className={styles.mobileIcon}>
              <Image src={l.iconSrc} width={20} height={20} alt={l.iconAlt} unoptimized />
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
