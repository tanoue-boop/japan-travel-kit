import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

const attractionRoutes = [
  { dest: "Dotonbori",        from: "Namba",         line: "Walk",             time: "5 min",  price: "Free" },
  { dest: "Universal Studios", from: "Osaka",         line: "JR Yumesaki Line", time: "15 min", price: "¥200" },
  { dest: "Osaka Castle",     from: "Tanimachi-yonchome", line: "Osaka Metro",  time: "10 min", price: "¥230" },
  { dest: "Shinsekai",        from: "Dobutsuenmae",   line: "Osaka Metro",      time: "5 min",  price: "¥180" },
  { dest: "Tenpozan",         from: "Osakako",        line: "Osaka Metro (Chuo)", time: "20 min", price: "¥240" },
];

const dayPasses = [
  { pass: "Enjoy Eco Card (weekday)",  price: "¥820",   bestFor: "Full day sightseeing — anyone can buy", worth: "Yes" },
  { pass: "Enjoy Eco Card (weekend)",  price: "¥620",   bestFor: "Weekend & holiday visits",             worth: "Yes" },
  { pass: "Osaka Metro Pass 2-day",    price: "¥1,800", bestFor: "Two consecutive sightseeing days",      worth: "Yes" },
];

const passCompareRows = [
  { feature: "Who can buy",        eco: "Anyone (residents & tourists)", pass: "Short-term foreign visitors*" },
  { feature: "Price",             eco: "¥820 weekday / ¥620 weekend",   pass: "2-day ¥1,800 (1-day also sold)" },
  { feature: "Child price",        eco: "¥310",                          pass: "Confirm at purchase" },
  { feature: "Duration",          eco: "1 day",                         pass: "1 or 2 days" },
  { feature: "Covers",            eco: "Osaka Metro + city buses",      pass: "Osaka Metro + city buses" },
  { feature: "Reaches Yumeshima", eco: "Yes (Chuo Line)",               pass: "Yes — incl. the Expo 2025 site" },
  { feature: "Attraction discounts", eco: "~30 facilities",             pass: "Confirm — varies" },
  { feature: "Sold on Klook",     eco: "No (station machines)",         pass: "Yes" },
];

const passVsRows = [
  { scenario: "One day, on a weekend or holiday", pick: "Enjoy Eco Card", note: "At ¥620 it's the cheapest unlimited day in any major Japanese city — and anyone can buy it." },
  { scenario: "One day, on a weekday",            pick: "Enjoy Eco Card", note: "Still good value at ¥820, and it comes with ~30 attraction discounts." },
  { scenario: "Two full days of sightseeing",     pick: "Osaka Metro Pass", note: "The 2-day pass at ¥1,800 spreads the cost and saves swapping tickets each day." },
  { scenario: "Only 2–3 rides in a day",          pick: "ICOCA / Suica",  note: "Pay-as-you-go is cheaper than any day pass at this level of use." },
];

const osakaLines = [
  {
    title: "Osaka Metro (8 lines)",
    desc: "The main subway network covering the entire city. Eight colour-coded lines reach Umeda, Namba, Shinsaibashi, Tennoji, and every major tourist destination. IC cards accepted on all lines.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
        <path d="M4 11H2v5l2 2h16l2-2v-5H4Z" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "JR Lines in Osaka",
    desc: "JR West operates several lines through Osaka, including the Osaka Loop Line (Kanjo Line) — a circular route similar to Tokyo's Yamanote Line — and the JR Yumesaki Line directly to Universal Studios Japan.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "Private Railways & IC Cards",
    desc: "Osaka is also served by private railways including Hankyu, Hanshin, Kintetsu, and Nankai — useful for day trips to Kyoto, Kobe, and Nara. IC cards (Suica or ICOCA) work on all these networks.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
];

const trainTips = [
  {
    title: "Use Namba and Umeda as your hubs",
    desc: "Most of Osaka's main attractions are within easy reach of either Namba (south) or Umeda/Osaka (north). Plan your days around these two hubs and you'll spend minimal time on trains.",
  },
  {
    title: "Buy the Enjoy Eco Card on weekends",
    desc: "If you're visiting on a Saturday or Sunday, the Enjoy Eco Card gives you unlimited Osaka Metro rides for just ¥620 — cheaper than three single journeys. Buy it at any station ticket machine.",
  },
  {
    title: "Use Google Maps for all routing",
    desc: "Google Maps handles Osaka's multi-operator network seamlessly — Metro, JR, and private railways all appear in one search. It shows real-time schedules, IC card fares, and transfer instructions.",
  },
  {
    title: "Dotonbori is best explored on foot",
    desc: "The Dotonbori and Shinsaibashi area in Namba is extremely walkable. Once you're in the area, put the phone away and explore on foot — the streets are pedestrian-friendly and dense with sights.",
  },
];

const faqItems = [
  {
    q: "What is the best way to get around Osaka?",
    a: "An IC card (Suica or ICOCA) is the most flexible and cost-effective way to get around Osaka. It works on Osaka Metro, JR lines, private railways, and local buses — tap in, tap out, and the correct fare is deducted automatically. For heavy sightseeing days, consider an Osaka Metro day pass (¥820) or the Enjoy Eco Card on weekends (¥620).",
  },
  {
    q: "Is a day pass worth it in Osaka?",
    a: "Yes, more often than in Tokyo. The Enjoy Eco Card (¥820 on weekdays) pays for itself after four journeys, which is easy to hit on a full sightseeing day. On weekends and holidays it drops to ¥620 and breaks even at three rides. A single Midosuji Line hop from Umeda to Namba is ¥230, so the maths adds up quickly once you're moving around the city. For two consecutive days, the 2-day Osaka Metro Pass (about ¥1,800) is the better buy.",
  },
  {
    q: "Can I use Suica in Osaka?",
    a: "Yes. Suica is accepted on Osaka Metro, JR West, and most private railways in the Kansai region. If you already have a Suica from Tokyo, simply top it up and use it in Osaka — no need to buy a separate ICOCA card. Both cards are interchangeable across Japan.",
  },
  {
    q: "How do I get from Osaka to Kyoto?",
    a: "The fastest and most affordable way is the JR Shinkaisoku (Special Rapid) from Osaka Station to Kyoto — takes about 15 minutes and costs around ¥580 with an IC card. Hankyu trains from Umeda and Kintetsu trains from Namba also connect the cities at a similar price. The shinkansen is overkill for this short distance.",
  },
  {
    q: "Is Osaka easy to navigate without Japanese?",
    a: "Yes — Osaka is very tourist-friendly. Station signs, platform announcements, and ticket machines are all available in English. Google Maps works reliably throughout the city. Osaka Metro stations are colour-coded and numbered, making navigation straightforward even if you can't read Japanese characters.",
  },
  {
    q: "Osaka Metro Pass or Enjoy Eco Card — which should tourists buy?",
    a: "For a single day, the Enjoy Eco Card is usually the better pick — it's cheaper (¥620 at weekends, ¥820 on weekdays), anyone can buy it, and it includes around 30 attraction discounts. For two consecutive days of heavy sightseeing, the 2-day Osaka Metro Pass (about ¥1,800) spreads the cost and saves swapping tickets. If you'll only take a couple of rides, skip both and use a pay-as-you-go ICOCA.",
  },
  {
    q: "Does the day pass cover the trip to Yumeshima?",
    a: "Yes. Both the Enjoy Eco Card and the Osaka Metro Pass cover the Chuo Line out to Yumeshima, the island that hosted the Expo 2025 site. As always with extended-area coverage, treat it as a 2026 guide and confirm current conditions before you travel.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/osaka-transportation") } });

export default function OsakaTransportationPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Getting Around Osaka 2026: Subway, Trains &amp; IC Cards | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get around Osaka in 2026. We explain the Midosuji Line, Osaka Metro day passes, IC cards, and key routes to top attractions — with 2026 fares."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/osaka-transportation" />
        <meta property="og:title" content="Getting Around Osaka 2026: Subway, Trains & IC Cards" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/osaka-transportation" />
        <meta property="og:description" content="How to get around Osaka in 2026. We explain the Midosuji Line, Osaka Metro day passes, IC cards, and key routes to top attractions — with 2026 fares." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Getting Around Osaka 2026: Subway, Trains & IC Cards" />
        <meta name="twitter:description" content="How to get around Osaka in 2026. We explain the Midosuji Line, Osaka Metro day passes, IC cards, and key routes to top attractions — with 2026 fares." />
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
              headline: "Getting Around Osaka (2026): Subway, Trains & IC Cards Explained",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Getting Around Osaka", item: "https://www.japan-travel-kit.com/guides/transport/osaka-transportation" },
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
          <span className={styles.breadCurrent}>Getting Around Osaka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚇</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Getting Around Osaka (2026):<br />Subway, Trains &amp; IC Cards Explained
          </h1>
          <p className={styles.heroSubtitle}>
            Osaka&apos;s subway system is one of the easiest in Japan to navigate. Here&apos;s everything you need to get around the city like a local.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Subway & Trains", "Day Pass Comparison"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Option</p>
                <p className={styles.verdictStatValue}>IC Card (Suica / ICOCA)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Most Useful Line</p>
                <p className={styles.verdictStatValue}>Midosuji Line</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day Pass Worth It?</p>
                <p className={styles.verdictStatValue}>Yes — especially on weekends</p>
              </div>
            </div>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Suica IC Card on Klook →
            </a>
          </div>
        </div>

        {/* Osaka Network Basics */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Osaka&apos;s Transport Network: The Basics</h2>
          <div className={styles.whoForGrid}>
            {osakaLines.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            Compared to Tokyo, Osaka&apos;s network is notably simpler. The Osaka Metro&apos;s grid-based layout means
            most journeys involve at most one transfer. An IC card handles all operators seamlessly —
            you don&apos;t need to understand the network structure to use it effectively.
          </p>
        </section>

        {/* The Midosuji Line */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Essential line</span>
          <h2 className={styles.sectionTitle}>The Midosuji Line</h2>
          <p className={styles.bodyText}>
            The Midosuji Line is Osaka&apos;s equivalent of Tokyo&apos;s Yamanote Line — the single most important
            route for tourists. It runs north to south through the heart of the city, connecting all of
            Osaka&apos;s major hubs in a single straight line.
          </p>
          <p className={styles.bodyText}>
            Key stations on the Midosuji Line include: <strong>Umeda</strong> (shopping, Osaka Station connections,
            department stores), <strong>Shinsaibashi</strong> (America-mura, fashion, shopping arcades),
            <strong> Namba</strong> (Dotonbori, Kuromon Market, nightlife), and <strong>Tennoji</strong> (Abeno Harukas,
            Shinsekai gateway, zoo).
          </p>
          <p className={styles.bodyText}>
            Trains run every 2–3 minutes during the day and every 5–8 minutes late at night. A single
            journey from Umeda to Namba costs ¥230 with an IC card and takes about 7 minutes. This one
            route covers the majority of what most visitors want to see in Osaka.
          </p>
        </section>

        {/* Day Passes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day passes</span>
          <h2 className={styles.sectionTitle}>Osaka Metro Day Pass Options</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price", "Best For", "Worth It?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayPasses.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td className={styles.tdBestFor}>{row.bestFor}</td>
                      <td style={{ color: "#15803d", fontWeight: 600 }}>{row.worth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Unlike Tokyo, day passes in Osaka are genuinely good value for sightseers. The break-even
            point is about four journeys for the ¥820 weekday Enjoy Eco Card — and just three at the ¥620
            weekend price — which most visitors hit before lunch. The Enjoy Eco Card is open to residents
            and tourists alike (no passport needed) and is sold at any Osaka Metro station ticket machine;
            it also unlocks discounts at around 30 Osaka attractions. The tourist-oriented Osaka Metro Pass
            is sold in 1-day and 2-day versions, with the 2-day pass the version most travellers buy.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1b4b", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Enjoy Eco Card vs Osaka Metro Pass
          </h3>
          <div className={styles.tableWrap} style={{ marginTop: "0.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Enjoy Eco Card", "Osaka Metro Pass"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passCompareRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.eco}</td>
                      <td>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            *Eligibility and prices are a 2026 guide — confirm the current conditions when you buy.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0d1b4b", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Which pass fits your trip?
          </h3>
          <div className={styles.tableWrap} style={{ marginTop: "0.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Our pick", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passVsRows.map((row) => (
                    <tr key={row.scenario}>
                      <td className={styles.tdProvider}>{row.scenario}</td>
                      <td className={styles.tdPrice}>{row.pick}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ margin: "1.5rem 0" }}>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1267428&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F11515-osaka-metro-1-2-day-pass-osaka%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Buy Osaka Metro Day Pass on Klook →
            </a>
          </div>
        </section>

        {/* IC Card section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>IC cards</span>
          <h2 className={styles.sectionTitle}>IC Card in Osaka: Suica &amp; ICOCA</h2>
          <p className={styles.bodyText}>
            <strong>ICOCA</strong> is the Kansai region&apos;s IC card, issued by JR West. <strong>Suica</strong> (issued
            by JR East) also works throughout Osaka — both are fully interchangeable across all Osaka Metro,
            JR, private railways, buses, and convenience stores.
          </p>
          <p className={styles.bodyText}>
            If you already have a Suica from Tokyo, use it in Osaka — no need to get a separate ICOCA.
            You can also add Suica to your iPhone via the Wallet app or to Android via Google Pay. Alternatively,
            pre-order a physical Suica on Klook to have it ready before you land.
          </p>
          <div style={{ margin: "1.5rem 0" }}>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Pre-order Suica IC Card on Klook →
            </a>
          </div>
        </section>

        {/* Key Attractions */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Key routes</span>
          <h2 className={styles.sectionTitle}>Getting to Key Attractions</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Destination", "Nearest Station", "Line", "Journey Time"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attractionRoutes.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdNetwork}>{row.from}</td>
                      <td className={styles.tdBestFor}>{row.line}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#9ca3af" }}>
            Journey times are approximate from Namba or the listed nearest station. IC card fares vary by distance.
          </p>
        </section>

        {/* Getting to/from Osaka */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Arriving in Osaka</span>
          <h2 className={styles.sectionTitle}>Getting To &amp; From Osaka</h2>
          <p className={styles.bodyText}>
            <strong>From Tokyo:</strong> The Tokaido Shinkansen connects Tokyo Station to Shin-Osaka in approximately
            2 hours 30 minutes. Nozomi trains are the fastest and cost around ¥14,000 one-way.
            JR Pass holders must use Hikari trains on this route, adding around 20–30 minutes.
          </p>
          <p className={styles.bodyText}>
            <strong>From Kyoto:</strong> Osaka is only 15 minutes from Kyoto on the JR Shinkaisoku (Special Rapid)
            — one of the best-value short trips in Japan. Hankyu and Kintetsu also connect the cities affordably.
            Many visitors base themselves in Osaka and day-trip to Kyoto.
          </p>
          <p className={styles.bodyText}>
            <strong>From Kansai Airport (KIX):</strong> The JR Haruka express reaches Shin-Osaka in 50 minutes (¥3,640)
            or Tennoji in 33 minutes. The Nankai Rapi:t reaches Namba in 38 minutes for ¥1,450 — better value if
            your accommodation is in or around Namba. Pre-book the Rapi:t on Klook for guaranteed seating and
            convenience.
          </p>
          <div style={{ margin: "1.5rem 0" }}>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265374&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F599-kansai-airport-namba-train-ticket-osaka%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Book Nankai Rapi:t (KIX → Namba) on Klook →
            </a>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>Tips for Getting Around Osaka</h2>
          <div className={styles.stepsList}>
            {trainTips.map((tip, i) => (
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
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Transport Options →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Pre-order your Suica IC Card</h2>
            <p className={styles.ctaBannerDesc}>
              Works in Osaka, Kyoto, and Tokyo. Skip the queue at the station and tap straight through
              the turnstile when you arrive.
            </p>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Suica on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
