"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";

// One menu, one destination each. Until 2026-10-09 the header carried a Guides dropdown of
// the five hubs *and* a second row of /sim-cards, /wifi-pocket, /transport and /money links;
// the October crawl showed those resolved to the same hubs, so visitors and crawlers saw
// every category twice. The hubs are now the only category entry point — individual buying
// guides are reached from the hubs and the "Get Connected" CTA.
const navItems = [
  { href: "/guides/esim",        label: "eSIM & SIM",    iconSrc: "/icons/icon-sim.svg",         iconAlt: "eSIM guides icon" },
  { href: "/guides/transport",   label: "Getting Around", iconSrc: "/icons/icon-transport.svg",   iconAlt: "Transport guides icon" },
  { href: "/guides/money",       label: "Money",          iconSrc: "/icons/icon-money.svg",       iconAlt: "Money guides icon" },
  { href: "/guides/attractions", label: "Things to Do",   iconSrc: "/icons/icon-attractions.svg", iconAlt: "Things to Do icon" },
  { href: "/guides",             label: "All Guides",     iconSrc: "/icons/icon-guide.svg",       iconAlt: "All Guides icon" },
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

        {/* Text-only on desktop so all five fit beside the logo and the CTA. */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Link href="/guides/esim/best-esim-japan" className={styles.ctaBtn}>Get Connected →</Link>
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
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
            <span className={styles.mobileIcon}>
              <Image src={item.iconSrc} width={20} height={20} alt={item.iconAlt} unoptimized />
            </span>
            {item.label}
          </Link>
        ))}
        <Link href="/guides/esim/best-esim-japan" className={styles.mobileCta} onClick={() => setOpen(false)}>
          Get Connected →
        </Link>
      </nav>
    </header>
  );
}
