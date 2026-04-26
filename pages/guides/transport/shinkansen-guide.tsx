import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const shinkansenLines = [
  { line: "Tokaido", route: "Tokyo – Osaka", speed: "285 km/h" },
  { line: "Sanyo", route: "Osaka – Fukuoka", speed: "300 km/h" },
  { line: "Tohoku", route: "Tokyo – Sapporo", speed: "320 km/h" },
  { line: "Hokuriku", route: "Tokyo – Kanazawa", speed: "260 km/h" },
  { line: "Kyushu", route: "Fukuoka – Kagoshima", speed: "260 km/h" },
];

const ticketPrices = [
  { route: "Tokyo → Kyoto", nonReserved: "¥13,320", reserved: "¥13,850" },
  { route: "Tokyo → Osaka", nonReserved: "¥13,870", reserved: "¥14,400" },
  { route: "Tokyo → Hiroshima", nonReserved: "¥18,490", reserved: "¥19,080" },
  { route: "Tokyo → Fukuoka", nonReserved: "¥22,220", reserved: "¥22,750" },
  { route: "Tokyo → Sapporo", nonReserved: "¥22,690", reserved: "¥23,430" },
];

const ticketTypes = [
  {
    rank: 1,
    name: "Non-reserved (自由席 — Jiyuuseki)",
    desc: "Sit in any unreserved carriage on a first-come, first-served basis. Slightly cheaper than reserved, but you may have to stand during peak periods. Not available on Nozomi or Mizuho services. Fine for off-peak travel.",
  },
  {
    rank: 2,
    name: "Reserved (指定席 — Shiteiseki)",
    desc: "A specific seat on a specific train is guaranteed. Only slightly more expensive than non-reserved — worth it for long routes, peak travel, or anyone travelling with luggage. Strongly recommended for first-timers.",
  },
  {
    rank: 3,
    name: "Green Car (グリーン車)",
    desc: "Japan's equivalent of business class. Wider seats, more legroom, and quieter carriages. A 50–100% premium over standard reserved fares. Good for longer routes like Tokyo–Fukuoka if you want extra comfort.",
  },
  {
    rank: 4,
    name: "Gran Class (グランクラス)",
    desc: "Premium first class with fully reclining seats, meal service, and dedicated attendants. Available only on select Tohoku and Hokuriku Shinkansen services. Treat this as a splurge — prices are significantly higher.",
  },
];

const jrPassPros = [
  "Multiple long-distance routes in one trip (e.g. Tokyo + Kyoto + Hiroshima + Osaka)",
  "Unlimited travel flexibility without budgeting per journey",
  "Also covers most JR local trains, buses, and the Narita Express",
  "Reservation of Hikari and Kodama seats at no extra charge",
];

const jrPassCons = [
  "Nozomi and Mizuho (the fastest Tokaido / Sanyo services) are excluded",
  "The 7-day pass costs ~¥50,000 — only worth it for multi-route itineraries",
  "Must be purchased outside Japan (or at select airports on arrival)",
  "Hikari adds 15–30 min to Tokyo–Osaka vs Nozomi — a trade-off for pass users",
];

const buyingSteps = [
  {
    title: "Book online before you fly",
    desc: "Klook and the official JR website both allow advance reservation of reserved seats. Online booking opens months ahead — useful for Golden Week, summer holidays, and New Year.",
  },
  {
    title: "Buy at a Midori no Madoguchi (ticket office)",
    desc: "Every major JR station has a staffed ticket counter (みどりの窓口). English-speaking staff are available at large stations. You can book here on the day, but popular services fill quickly.",
  },
  {
    title: "Use a self-service ticket machine (券売機)",
    desc: "Most JR stations have self-service machines with English interfaces. Non-reserved tickets and same-day reserved seats can be purchased here. Accepts cash; some machines accept credit cards.",
  },
  {
    title: "Pass through the Shinkansen gate",
    desc: "Insert your paper ticket or pass into the gate — it returns automatically. IC cards (Suica / Pasmo) do not cover Shinkansen fares; you always need a separate Shinkansen ticket regardless of IC balance.",
  },
];

const firstTimerTips = [
  {
    title: "Book reserved seats early for peak dates",
    desc: "Shinkansen services fill quickly on weekends, public holidays, and during peak seasons (Golden Week in late April–May, Obon in mid-August, New Year). Book as soon as your dates are confirmed.",
  },
  {
    title: "Sit in seat D or E for Mount Fuji views",
    desc: "Travelling from Tokyo toward Osaka or Kyoto on the Tokaido Shinkansen? Mount Fuji appears on the right side of the train (seats D and E, window side). Best seen around Shin-Fuji station, roughly 40 minutes from Tokyo.",
  },
  {
    title: "Buy ekiben and drinks before boarding",
    desc: "Station bento boxes (ekiben) are one of Japan's great food traditions. Buy them in the station building or on the platform — selection is better and less rushed than inside the train. Budget ¥800–¥1,500.",
  },
  {
    title: "Oversized luggage requires advance booking",
    desc: "Bags with a total dimension over 160cm (length + width + height) must be stored in a designated oversized baggage space. This is free but must be reserved when you buy your ticket — it cannot be done on the day.",
  },
];

const faqItems = [
  {
    q: "Can I use the JR Pass on the Shinkansen?",
    a: "Yes — the JR Pass covers most Shinkansen services, including Hikari and Kodama on the Tokaido Shinkansen. However, it does not cover Nozomi or Mizuho (the fastest and most frequent services on the Tokyo–Osaka corridor). If you plan to use the JR Pass, book Hikari services, which add only 15–30 minutes compared to Nozomi.",
  },
  {
    q: "Do I need to book Shinkansen tickets in advance?",
    a: "For reserved seats, yes — especially during peak travel periods. Non-reserved carriages are available without advance booking, but you risk standing on a busy service. On the Tokaido Shinkansen (Tokyo–Osaka), trains run every few minutes, so if one non-reserved carriage is full, the next departure is rarely far away.",
  },
  {
    q: "Can I take luggage on the Shinkansen?",
    a: "Yes. Standard luggage goes in the overhead rack above your seat. Bags with a total dimension exceeding 160cm (length + width + height) must be pre-booked into a designated oversized baggage space — free of charge, but must be reserved when you buy your ticket. There is no luggage check-in or storage service on the train.",
  },
  {
    q: "Is the Shinkansen faster than flying within Japan?",
    a: "For most city pairs up to 4 hours, yes — once you factor in airport check-in, security, and city-centre transit time. Tokyo to Osaka takes about 2h 15min on Nozomi vs 3–4 hours door-to-door by plane. For routes over 5 hours (e.g. Tokyo–Sapporo), flying is faster in the air, but total journey times can still be comparable.",
  },
  {
    q: "Can I eat on the Shinkansen?",
    a: "Yes — eating on the Shinkansen is perfectly normal and part of Japanese travel culture. Station bento boxes (ekiben) are sold on platforms and in station buildings. Some services also have a food trolley in the aisle. Green Car and Gran Class passengers receive meal service on select routes.",
  },
];

export default function ShinkansenGuidePage() {
  return (
    <>
      <Head>
        <title>Shinkansen Guide 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Everything you need to know about Japan's bullet train. We cover ticket types, prices, JR Pass tips, and how to book — before your first ride."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport/shinkansen-guide" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Shinkansen Guide 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport/shinkansen-guide" />
        <meta property="og:description" content="Everything you need to know about Japan's bullet train. We cover ticket types, prices, JR Pass tips, and how to book — before your first ride." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shinkansen Guide 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="Everything you need to know about Japan's bullet train. We cover ticket types, prices, JR Pass tips, and how to book — before your first ride." />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Shinkansen Guide 2026: Tickets, Passes & Tips for First-Timers",
              dateModified: "2026-04-26",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://japan-travel-kit.com",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around", item: "https://japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Shinkansen Guide", item: "https://japan-travel-kit.com/guides/transport/shinkansen-guide" },
              ],
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Shinkansen Guide</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚄</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Shinkansen Guide 2026:<br />Tickets, Passes &amp; Tips for First-Timers
          </h1>
          <p className={styles.heroSubtitle}>
            Japan&apos;s bullet train is fast, punctual, and easy to use —
            once you know how. Here&apos;s everything you need before you board.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All Shinkansen Lines", "Beginner Friendly"].map((t) => (
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
            This doesn&apos;t affect our recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Top Speed</p>
                <p className={styles.verdictStatValue}>Up to 320 km/h</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tokyo → Kyoto</p>
                <p className={styles.verdictStatValue}>~2h 15min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Most Tourist-Friendly</p>
                <p className={styles.verdictStatValue}>Tokaido Shinkansen</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Key rule:</strong> Nozomi and Mizuho (the fastest services) are <strong>not covered by the JR Pass</strong>.
              Book reserved seats in advance for peak dates — services fill quickly on weekends and holidays.
            </p>
            <a
              href="#"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Book Shinkansen Tickets on Klook →
            </a>
          </div>
        </div>

        {/* What Is the Shinkansen? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Shinkansen?</h2>
          <p className={styles.bodyText}>
            The Shinkansen (新幹線) is Japan&apos;s high-speed rail network, operating since 1964.
            It connects Japan&apos;s major cities at speeds of up to 320 km/h — among the fastest commercial
            trains in the world. The network covers most of the main island of Honshu, with extensions
            into Kyushu and Hokkaido.
          </p>
          <p className={styles.bodyText}>
            What makes the Shinkansen remarkable isn&apos;t just speed: it&apos;s reliability.
            The average delay across the entire network is under one minute per departure.
            Trains depart and arrive to the second. For travellers used to European or American rail,
            it&apos;s a genuinely different experience.
          </p>
          <p className={styles.bodyText}>
            For most tourist itineraries — Tokyo to Kyoto, Kyoto to Hiroshima, Osaka to Fukuoka —
            the Shinkansen is faster door-to-door than flying, once you factor in airport travel and check-in.
            It also drops you directly into city centres rather than 40 minutes outside them.
          </p>
        </section>

        {/* Main Lines */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Network</span>
          <h2 className={styles.sectionTitle}>Main Shinkansen Lines</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Line", "Route", "Top Speed"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shinkansenLines.map((row) => (
                    <tr key={row.line}>
                      <td className={styles.tdProvider}>{row.line}</td>
                      <td className={styles.tdNetwork}>{row.route}</td>
                      <td className={styles.tdPrice}>{row.speed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            The Tokaido Shinkansen (Tokyo–Osaka) is the world&apos;s busiest high-speed rail corridor and the most relevant for most tourist itineraries.
            The Tohoku Shinkansen connects Tokyo to Sendai, Aomori, and — via the Hokkaido Shinkansen — Sapporo.
          </p>
        </section>

        {/* Ticket Types */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Ticket types</span>
          <h2 className={styles.sectionTitle}>Shinkansen Ticket Types Explained</h2>
          <div className={styles.stepsList}>
            {ticketTypes.map((type) => (
              <div key={type.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{type.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{type.name}</p>
                  <p className={styles.stepDesc}>{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Costs</span>
          <h2 className={styles.sectionTitle}>How Much Does the Shinkansen Cost?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Non-reserved", "Reserved"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketPrices.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td className={styles.tdPrice}>{row.nonReserved}</td>
                      <td style={{ fontWeight: 600, color: "#0d1b4b" }}>{row.reserved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Prices are for the Nozomi / fastest Tokaido Shinkansen service (standard ordinary class).
            Fares include the base fare and express surcharge. Green Car and Gran Class cost significantly more.
            JR Pass holders travel at no additional charge on most services except Nozomi and Mizuho.
          </p>
        </section>

        {/* JR Pass vs Individual Tickets */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Planning</span>
          <h2 className={styles.sectionTitle}>JR Pass vs Buying Individual Tickets</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>JR Pass makes sense if…</p>
              <ul className={styles.pickList}>
                {jrPassPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Buy individual tickets if…</p>
              <ul className={styles.pickList}>
                {jrPassCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            The JR Pass 7-day ordinary pass costs around ¥50,000. A round trip Tokyo–Kyoto on Nozomi costs
            roughly ¥27,700 — so a pass only pays off if your itinerary includes multiple long-distance legs.
            Use the{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR Pass Guide
            </Link>{" "}
            to calculate your specific itinerary cost.
          </p>
        </section>

        {/* How to Buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How to Buy Shinkansen Tickets</h2>
          <div className={styles.stepsList}>
            {buyingSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Shinkansen Tickets on Klook →
          </a>
        </section>

        {/* Tips for First-Timers */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>First-timer tips</span>
          <h2 className={styles.sectionTitle}>Tips for First-Time Shinkansen Riders</h2>
          <div className={styles.stepsList}>
            {firstTimerTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <line x1="9" y1="3" x2="9" y2="10" />
                  <line x1="15" y1="3" x2="15" y2="10" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                  <line x1="9" y1="14" x2="9" y2="14" />
                  <line x1="12" y1="14" x2="12" y2="14" />
                  <line x1="15" y1="14" x2="15" y2="14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book your Shinkansen tickets now</h2>
            <p className={styles.ctaBannerDesc}>
              Reserve your seats before you fly — popular services fill up fast on weekends and public holidays.
            </p>
            <a
              href="#"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Book on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
