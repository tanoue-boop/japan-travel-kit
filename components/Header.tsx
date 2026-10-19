"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Header.module.css";

// One menu, one destination each. Until 2026-10-09 the header carried a Guides dropdown of
// the five hubs *and* a second row of /sim-cards, /wifi-pocket, /transport and /money links;
// the October crawl showed those resolved to the same hubs, so visitors and crawlers saw
// every category twice. The hubs are now the only category entry point — individual buying
// guides are reached from the hubs and the header CTA.
//
// Reordered 2026-10-19. Things to Do is now the largest category and the one the traffic and
// the bookings come from, so it leads; eSIM, which the nav was built around in September,
// moves down to where its share of the site actually sits. Destinations is a dropdown over
// the three city hubs, which is the way most visitors describe what they are looking for
// ("things to do in Kyoto") rather than by our category names.
const destinationItems = [
  { href: "/guides/attractions/things-to-do-tokyo", label: "Tokyo" },
  { href: "/guides/attractions/things-to-do-kyoto", label: "Kyoto" },
  { href: "/guides/attractions/things-to-do-osaka", label: "Osaka" },
  { href: "/guides/attractions#daytrips",           label: "Day Trips" },
];

// Text only, in both menus. The coloured category icons in public/icons were dropped on
// 2026-10-19 with the rest of the template palette — five words carry the nav fine, and a
// single-colour icon beside each one added nothing a label does not already say.
const navItems = [
  { href: "/guides/attractions", label: "Things to Do"   },
  { href: "/guides/transport",   label: "Getting Around" },
  { href: "/guides/esim",        label: "eSIM & SIM"     },
  { href: "/guides/money",       label: "Money"          },
];

const CTA_HREF = "/guides/attractions";
const CTA_LABEL = "Find Tours & Tickets →";

export default function Header() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [destOpen, setDestOpen]   = useState(false);
  const destRef                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close the Destinations dropdown on an outside click or Escape — it opens on click as
  // well as hover so it works on a touch screen that is wide enough for the desktop nav.
  useEffect(() => {
    if (!destOpen) return;
    const onClick = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDestOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [destOpen]);

  return (
    <header className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Japan <em>Travel Kit</em></span>
          <span className={styles.logoTag}>Tickets, tours &amp; trip prep</span>
        </Link>

        {/* Text-only on desktop so all five fit beside the logo and the CTA. */}
        <nav className={styles.nav}>
          <Link href={navItems[0].href} className={styles.navLink}>
            {navItems[0].label}
          </Link>

          <div
            ref={destRef}
            className={styles.navGroup}
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}
          >
            <button
              type="button"
              className={styles.navLink}
              aria-expanded={destOpen}
              aria-haspopup="true"
              onClick={() => setDestOpen((v) => !v)}
            >
              Destinations
              <svg className={styles.navChevron} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`${styles.dropdown}${destOpen ? ` ${styles.dropdownOpen}` : ""}`}>
              {destinationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.dropdownLink}
                  onClick={() => setDestOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {navItems.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.cta}>
          <Link href={CTA_HREF} className={styles.ctaBtn}>{CTA_LABEL}</Link>
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

      {/* Mobile: Destinations is an always-expanded list rather than a second tap target. */}
      <nav className={`${styles.mobileNav}${open ? ` ${styles.open}` : ""}`}>
        <p className={styles.mobileLabel}>Guides</p>
        <Link href={navItems[0].href} className={styles.mobileLink} onClick={() => setOpen(false)}>
          {navItems[0].label}
        </Link>

        <p className={styles.mobileLabel}>Destinations</p>
        <div className={styles.mobileSub}>
          {destinationItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.mobileSubLink} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>

        <p className={styles.mobileLabel}>Plan your trip</p>
        {navItems.slice(1).map((item) => (
          <Link key={item.href} href={item.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="/guides" className={styles.mobileLink} onClick={() => setOpen(false)}>
          All Guides
        </Link>

        <Link href={CTA_HREF} className={styles.mobileCta} onClick={() => setOpen(false)}>
          {CTA_LABEL}
        </Link>
      </nav>
    </header>
  );
}
