import Link from "next/link";

const cols = [
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
    title: "About",
    links: [
      { href: "/about",                label: "About Us"             },
      { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
      { href: "/privacy-policy",       label: "Privacy Policy"       },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <Link href="/" className="footer__logo">
              <span className="footer__logo-icon">🗾</span>
              <span className="footer__logo-text">Japan Travel Kit</span>
            </Link>
            <p className="footer__brand-desc">
              Practical, unbiased travel info for foreign visitors to Japan.
              Prepared before you land.
            </p>
            <span className="footer__brand-status">
              <span className="footer__status-dot" />
              Updated April 2025
            </span>
          </div>

          {/* Nav cols */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="footer__col-title">{col.title}</p>
              <div className="footer__links">
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} className="footer__link">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} Japan Travel Kit. All rights reserved.
          </p>
          <p className="footer__aff">
            This site contains affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
