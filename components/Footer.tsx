import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.css";

const cols = [
  {
    title: "Guides",
    links: [
      { href: "/guides",             label: "All Guides"   },
      { href: "/guides/esim",        label: "eSIM"         },
      { href: "/guides/transport",   label: "Transport"    },
      { href: "/guides/money",       label: "Money"        },
      { href: "/guides/attractions", label: "Things to Do" },
    ],
  },
  {
    title: "Connectivity",
    links: [
      { href: "/guides/esim/best-esim-japan",           label: "Best eSIM for Japan" },
      { href: "/guides/esim/pocket-wifi-vs-esim-japan", label: "Pocket WiFi vs eSIM" },
      { href: "/guides/esim/japan-esim-data-plans",     label: "All Data Plans"      },
    ],
  },
  {
    // Was "Getting Around" pointing at /transportation and /money. Those pages were merged
    // into the hubs already listed under Guides (2026-10-09), so this column now surfaces
    // the individual guides visitors arrive on most instead of repeating the hub links.
    title: "Popular Guides",
    links: [
      { href: "/guides/transport/jr-pass-worth-it", label: "Is the JR Pass Worth It?" },
      { href: "/guides/transport/ic-cards-japan",   label: "Suica & IC Cards"         },
      { href: "/guides/money/cash-vs-card-japan",   label: "Cash vs Card"             },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/about",          label: "About"                },
      { href: "/disclaimer",     label: "Affiliate Disclaimer" },
      { href: "/privacy-policy", label: "Privacy Policy"       },
    ],
  },
];

// Set in next.config.js at build time; falls back to "now" for dev.
const buildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? Date.now());
const updatedLabel = `Updated ${buildDate.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })}`;

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
              {updatedLabel}
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
