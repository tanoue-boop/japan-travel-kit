import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const cols = [
  {
    title: "Guides",
    links: [
      { href: "/guides",                          label: "All Guides"        },
      { href: "/guides/esim/best-esim-japan",     label: "Best eSIM Japan"   },
    ],
  },
  {
    title: "Connectivity",
    links: [
      { href: "/sim-cards",   label: "SIM Cards & eSIM" },
      { href: "/wifi-pocket", label: "Pocket WiFi"       },
    ],
  },
  {
    title: "Getting Around",
    links: [
      { href: "/transportation", label: "Transportation"   },
      { href: "/money",          label: "Money & Payment" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/disclaimer",     label: "Affiliate Disclaimer" },
      { href: "/privacy-policy", label: "Privacy Policy"       },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.logoRow}>
              <span className={styles.logoIcon}>
                <Image src="/icons/logo.svg" width={40} height={40} alt="Japan Travel Kit logo" unoptimized />
              </span>
              <span className={styles.logoText}>Japan Travel Kit</span>
            </Link>
            <p className={styles.desc}>
              Practical, unbiased travel info for foreign visitors to Japan.
              Prepared before you land.
            </p>
            <span className={styles.status}>
              <span className={styles.dot} />
              Updated April 2025
            </span>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <p className={styles.colTitle}>{col.title}</p>
              <div className={styles.links}>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.link}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Japan Travel Kit. All rights reserved.
          </p>
          <p className={styles.aff}>
            This site contains affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
