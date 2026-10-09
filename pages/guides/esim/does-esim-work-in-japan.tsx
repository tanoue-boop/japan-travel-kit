import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  getProvider,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Networks, prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

const networkRows = [
  { provider: "Airalo",        network: getProvider("airalo").network,  coverage: "Excellent in cities, good rural" },
  { provider: "eSIM Go",       network: getProvider("esimgo").network,  coverage: "Excellent — broadest rural reach" },
  { provider: "Holafly",       network: getProvider("holafly").network, coverage: "Excellent in cities, good rural" },
  { provider: "Sakura Mobile", network: getProvider("sakura").network,  coverage: "Excellent — broadest rural reach" },
];

const preflightChecks = [
  "Phone is eSIM-compatible (see list below)",
  "Phone is carrier-unlocked",
  "iOS or Android is up to date",
  "eSIM purchased and QR code saved as a screenshot",
  "Plan activation timing confirmed (some activate on first use, others on a fixed date)",
];

const whereItWorks = [
  {
    title: "Major cities",
    desc: "Tokyo, Osaka, Kyoto, Yokohama, Nagoya, Sapporo, Fukuoka — full 4G/5G across the entire city footprint, including subways and underground malls.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" /><line x1="9" y1="9" x2="9" y2="9" /><line x1="9" y1="13" x2="9" y2="13" /><line x1="9" y1="17" x2="9" y2="17" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Regional cities",
    desc: "Hiroshima, Sendai, Kanazawa, Kumamoto, Nagasaki — reliable coverage throughout each city and on the JR lines connecting them.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" /><path d="M5 21V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v13" /><line x1="9" y1="9" x2="9" y2="13" /><line x1="15" y1="9" x2="15" y2="13" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Rural & mountain areas",
    desc: "Coverage is strong on popular tourist routes (Hakone, Nikko, Takayama), but pockets of weak signal exist deep in the mountains. Docomo-based providers handle this best.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 18 9 12 14 17 21 10" /><polyline points="14 10 21 10 21 17" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Shinkansen (bullet train)",
    desc: "Yes — works comfortably for browsing and messaging. Brief drops happen in long tunnels but signal returns within seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="10" rx="2" /><line x1="8" y1="20" x2="8" y2="18" /><line x1="16" y1="20" x2="16" y2="18" />
      </svg>
    ),
    works: true,
  },
  {
    title: "Mt. Fuji climbing routes",
    desc: "Lower stations and most of the trail have working signal. Coverage near the summit is patchy and weather-dependent. Don't rely on data above the 8th station.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20l5-8 4 5 3-4 6 7H3z" /><circle cx="17" cy="6" r="2" />
      </svg>
    ),
    works: true,
  },
];

const faqItems = [
  {
    q: "Does eSIM work in rural Japan?",
    a: "Generally, yes. eSIM providers in Japan run on Docomo or SoftBank — both have strong nationwide coverage, including most rural and tourist areas. Docomo has the broadest reach, especially in mountainous regions. Very remote villages or deep mountains may have weak signal regardless of carrier.",
  },
  {
    q: "Does eSIM work on the Shinkansen?",
    a: "Yes. eSIMs work reliably on the Shinkansen because Docomo and SoftBank have tower coverage along the entire high-speed rail network. You may briefly lose signal inside long tunnels (especially on the Tokaido and Sanyo lines), but it reconnects automatically within seconds. Onboard WiFi is also available as a fallback.",
  },
  {
    q: "Which eSIM has the best coverage in Japan?",
    a: "Providers on Docomo (Airalo's Docomo plans, eSIM Go, Sakura Mobile) have the widest rural coverage. Providers on SoftBank (Holafly, Airalo's SoftBank plans) are excellent in cities and tourist areas but slightly weaker in remote mountains. For city-only trips, the difference isn't noticeable.",
  },
  {
    q: "Can I use eSIM at Japanese airports?",
    a: "Yes — and that's the whole point. If you activate your eSIM before flying, you'll have a live 4G/5G signal the moment you turn off airplane mode at Narita, Haneda, Kansai, New Chitose, Fukuoka, or any other Japanese airport. No need to queue at airport SIM vending machines.",
  },
  {
    q: "Does eSIM work in Kyoto and Osaka?",
    a: "Yes, excellently. Kyoto and Osaka have dense Docomo and SoftBank 4G/5G coverage including all temples, tourist districts, subway lines, and Universal Studios Japan. Any major eSIM provider will work reliably.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/does-esim-work-in-japan") } });

export default function DoesEsimWorkInJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Does eSIM Work in Japan? (2026): Complete Answer | Japan Travel Kit</title>
        <meta
          name="description"
          content="Yes, eSIM works excellently in Japan on Docomo and SoftBank networks. We explain coverage, compatible phones, and the best eSIM providers to use."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" />
        <meta property="og:title" content="Does eSIM Work in Japan? (2026): Complete Answer" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" />
        <meta property="og:description" content="Yes, eSIM works excellently in Japan on Docomo and SoftBank networks. We explain coverage, compatible phones, and the best eSIM providers to use." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Does eSIM Work in Japan? (2026): Complete Answer" />
        <meta name="twitter:description" content="Yes, eSIM works excellently in Japan on Docomo and SoftBank networks. We explain coverage, compatible phones, and the best eSIM providers to use." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Does eSIM Work in Japan", item: "https://www.japan-travel-kit.com/guides/esim/does-esim-work-in-japan" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Does eSIM Work in Japan? (2026): Everything You Need to Know",
              dateModified: updated.iso,
              author: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Does eSIM Work in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📶</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Does eSIM Work in Japan? (2026):<br />Everything You Need to Know
          </h1>
          <p className={styles.heroSubtitle}>
            Yes. The question worth asking is whether <em>your</em> phone will work —
            that is where Japan eSIMs actually fail.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Quick Answer", "All Phones"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclosure */}
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>Yes ✓</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              Japan is one of the easiest countries in the world to use an eSIM in: there is no
              registration requirement, no passport check, no tourist-SIM paperwork, and every
              Japan eSIM rides a tier-one carrier. So the answer to the question as asked is an
              unqualified yes. <strong>What actually goes wrong is at your end, not Japan&apos;s</strong>{" "}
              — a carrier-locked handset, a phone with no eSIM hardware, or a device bought in a
              market where eSIM was disabled. The three checks below are the whole risk.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Check 1 — hardware</p>
                <p className={styles.verdictStatValue}>An EID in Settings → About</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Check 2 — carrier lock</p>
                <p className={styles.verdictStatValue}>The #1 cause of failure</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Check 3 — where you bought it</p>
                <p className={styles.verdictStatValue}>Mainland China: no eSIM at all</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest way to test it</p>
                <p className={styles.verdictStatValue}>eSIM Go, from {priceFrom("esimgo")}</p>
              </div>
            </div>
            <a
              href={link("airalo")}
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get a Japan eSIM →
            </a>
          </div>
        </div>

        {/* Yes, eSIM works */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>Why Japan Is an Easy Place to Use an eSIM</h2>
          <p className={styles.bodyText}>
            Some countries make prepaid data awkward for visitors — mandatory SIM registration,
            ID checks at a carrier shop, plans that can only be bought in-country. Japan does none
            of that for eSIMs. You buy online from abroad, install over WiFi at home, and switch
            the profile on when you land. Nothing has to be shown to anyone.
          </p>
          <p className={styles.bodyText}>
            Coverage is not the limiting factor either. Every Japan eSIM sold to tourists runs on
            Docomo, SoftBank or KDDI, all of which have effectively universal 4G and expanding 5G.
            That holds in the places tourists actually are: city streets, underground stations,
            temples, the popular hiking routes, and the Shinkansen between cities.
          </p>
          <p className={styles.bodyText}>
            Which leaves your handset as the only real variable — and the rest of this page is
            about checking it. Once your phone passes, see our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              full comparison of the four Japan eSIM providers
            </Link>{" "}
            for which plan to buy. Prices on this page checked {pricesCheckedAt}.
          </p>
        </section>

        {/* Networks table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Networks</span>
          <h2 className={styles.sectionTitle}>Which Networks Do Japan eSIMs Use?</h2>
          <p className={styles.bodyText}>
            Every Japan eSIM runs on one of the two major Japanese carriers. Both networks are
            excellent — the difference matters most in remote rural areas, where Docomo has a
            slight edge.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Network</th>
                    <th>Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {networkRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td className={styles.tdNetwork}>{row.network}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Phone compatibility */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Check 1 &amp; 3 — hardware and market</span>
          <h2 className={styles.sectionTitle}>Does My Phone Support eSIM?</h2>
          <p className={styles.bodyText}>
            Almost every flagship phone made since 2018 supports eSIM. Here&apos;s a quick rule of
            thumb — if your device is on this list, you&apos;re good to go.
          </p>
          <div className={styles.pickGrid} style={{ marginTop: "1rem" }}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>iPhone (all supported)</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>iPhone XS, XS Max, XR (2018) and later</li>
                <li><span className={styles.proIcon}>+</span>iPhone 11, 12, 13, 14, 15, 16 series</li>
                <li><span className={styles.proIcon}>+</span>iPhone SE (2nd gen and later)</li>
                <li><span className={styles.proIcon}>+</span>U.S. iPhone 14 and later — eSIM-only</li>
              </ul>
            </div>
            <div className={styles.pickPros} style={{ background: "#eef5ff", borderColor: "#bcd4ff" }}>
              <p className={styles.pickListLabel}>Android (major models)</p>
              <ul className={styles.pickList}>
                <li><span className={styles.proIcon}>+</span>Google Pixel 3a and later (3a, 4–9)</li>
                <li><span className={styles.proIcon}>+</span>Samsung Galaxy S20 and later (S20–S25)</li>
                <li><span className={styles.proIcon}>+</span>Samsung Galaxy Z Flip / Fold (all models)</li>
                <li><span className={styles.proIcon}>+</span>Samsung Galaxy Note 20 series</li>
                <li><span className={styles.proIcon}>+</span>Most recent Oppo, OnePlus, Motorola flagships</li>
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>One important caveat:</strong> some iPhones sold in Japan and certain Samsung
            models sold in Hong Kong don&apos;t support eSIM. If your phone was purchased in those
            markets, check the model number against Apple or Samsung&apos;s eSIM compatibility list
            before buying a plan.
          </p>
        </section>

        {/* Pre-flight checks */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Check 2 — carrier lock</span>
          <h2 className={styles.sectionTitle}>What You Need to Check Before Flying</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros} style={{ gridColumn: "1 / -1" }}>
              <p className={styles.pickListLabel}>Checklist</p>
              <ul className={styles.pickList}>
                {preflightChecks.map((c) => (
                  <li key={c}><span className={styles.proIcon}>✓</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The most common reason a Japan eSIM doesn&apos;t work is that the phone is carrier-locked
            — not a fault with the eSIM itself. If you&apos;re unsure, contact your home carrier and
            ask whether your handset is fully unlocked for international use.
          </p>
        </section>

        {/* Where does eSIM work */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Coverage map</span>
          <h2 className={styles.sectionTitle}>Where Does eSIM Work in Japan?</h2>
          <div className={styles.whoForGrid}>
            {whereItWorks.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best eSIMs */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Recommended providers</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for Japan</h2>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1b4b", marginTop: "1rem", marginBottom: "0.5rem" }}>
            Airalo — Best Overall
          </h3>
          <p className={styles.bodyText}>
            The most popular Japan eSIM. Tiered plans from 1 GB up to 20 GB plus unlimited, on{" "}
            {getProvider("airalo").network}, and an iOS app that installs the profile for you —
            useful if you are not confident navigating your phone&apos;s eSIM menus.
            From {priceFromLabel("airalo")}.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get Airalo Japan eSIM →
          </a>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1b4b", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            eSIM Go — Best Budget
          </h3>
          <p className={styles.bodyText}>
            The cheapest way to find out whether your handset takes a Japan eSIM at all: plans
            start at {priceFromLabel("esimgo")} on {getProvider("esimgo").network}, which also
            gives it the broadest rural reach of the four. Choose this if price is your priority
            and you only need a small data allowance.
          </p>
          <a
            href={link("esimgo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            Get eSIM Go Japan eSIM →
          </a>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1b4b", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            Unlimited data — Airalo or Holafly
          </h3>
          <p className={styles.bodyText}>
            If you would rather not track usage at all, both sell unlimited Japan plans:
            Airalo from {unlimitedFromLabel("airalo")} and Holafly from {unlimitedFromLabel("holafly")}.
            Neither is unmetered in the strict sense — Airalo applies a fair-use policy and Holafly
            caps hotspot use at 1 GB/day — so read the plan note before buying if you intend to tether.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-flex" }}
          >
            {HOLAFLY_ALT_LABEL}
          </a>
          <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.6rem", lineHeight: 1.6 }}>
            {HOLAFLY_ALT_NOTE}
          </p>
        </section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Common Questions</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{i + 1}. {item.q}</span>
                  <svg className={styles.faqChevron} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={styles.faqBody}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related Guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-iphone" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan on iPhone (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-data-plans" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Every Japan eSIM Data Plan Compared</p>
                <span className={styles.relatedArrow}>View comparison →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card vs eSIM (2026): Which Should You Choose?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to pick a Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              See how Airalo, Holafly, eSIM Go, and Sakura Mobile compare on price, coverage,
              and features — with our top picks for every type of trip.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              View Full eSIM Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
