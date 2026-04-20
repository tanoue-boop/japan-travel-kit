import Link from "next/link";

const columns = [
  {
    title: "Connectivity",
    links: [
      { href: "/sim-cards",   label: "SIM Cards & eSIM"  },
      { href: "/wifi-pocket", label: "Pocket WiFi"        },
    ],
  },
  {
    title: "Getting Around",
    links: [
      { href: "/transportation", label: "Transportation"    },
      { href: "/money",          label: "Money & Payment"  },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about",                label: "About Us"              },
      { href: "/affiliate-disclosure", label: "Affiliate Disclosure"  },
      { href: "/privacy-policy",       label: "Privacy Policy"        },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-crimson-500 rounded-lg flex items-center justify-center text-sm">
                🗾
              </div>
              <span className="font-display font-bold text-white text-lg">
                Japan Travel Kit
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/40 mb-5">
              Practical, unbiased travel info for foreign visitors to Japan. Prepared before you land.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 text-xs text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Updated April 2025
            </div>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Japan Travel Kit. All rights reserved.</p>
          <p>
            This site contains affiliate links. We may earn a commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
