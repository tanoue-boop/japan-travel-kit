import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const transportOptions = [
  { mode: "City Subway", coverage: "Airport, Hakata, Tenjin", price: "¥210–¥360 / ride", bestFor: "Airport transfer, Hakata–Tenjin corridor", icCard: "✓" },
  { mode: "Nishitetsu Train", coverage: "Tenjin → Dazaifu, Yanagawa", price: "From ¥650", bestFor: "Dazaifu Tenmangu day trip", icCard: "✓" },
  { mode: "Nishitetsu Bus", coverage: "Citywide", price: "From ¥170", bestFor: "Ohori Park, Fukuoka Tower, outer areas", icCard: "✓" },
  { mode: "Taxi", coverage: "Door-to-door", price: "¥730 flag fall", bestFor: "Groups, luggage, late night", icCard: "✓" },
];

const dayPasses = [
  { pass: "Fukuoka City Subway 1-Day Pass", price: "¥640", covers: "All 3 subway lines", bestFor: "Airport + city sightseeing" },
  { pass: "Fukuoka Tourist City Pass (1-day)", price: "¥1,500", covers: "Subway + Nishitetsu bus + some trains", bestFor: "Full-day city + suburbs exploration" },
  { pass: "Nishitetsu 1-Day Bus Pass", price: "¥700", covers: "All Nishitetsu city buses", bestFor: "Flexible bus travel around Fukuoka" },
];

const dazaifuSteps = [
  {
    title: "Get to Tenjin Station",
    desc: "Take the Fukuoka City Subway Kūkō Line to Tenjin Station. From Hakata it takes about 5 minutes (¥210). From Fukuoka Airport, the ride to Tenjin takes around 11 minutes (¥310).",
  },
  {
    title: "Transfer to Nishitetsu Tenjin Omuta Line",
    desc: "At Tenjin Station, follow signs to Nishitetsu Fukuoka (Tenjin) Station — it's a short walk through the underground passages. Board a Nishitetsu Omuta Line train towards Futsukaichi.",
  },
  {
    title: "Change at Futsukaichi for the Dazaifu Line",
    desc: "Ride to Nishitetsu-Futsukaichi (about 22 minutes, ¥430), then change platforms and board the 2-stop Dazaifu Line. The total journey from Tenjin takes around 35 minutes.",
  },
  {
    title: "Walk to Dazaifu Tenmangu Shrine",
    desc: "From Nishitetsu-Dazaifu Station, walk 5 minutes through the covered shopping street lined with traditional sweet shops and souvenir stalls. The main shrine gate is at the end of the path.",
  },
];

const tipsItems = [
  {
    title: "Fukuoka Airport is 2 subway stops from Hakata",
    desc: "The Fukuoka City Subway's Kūkō Line connects the airport directly to Hakata Station in just 6 minutes (¥260). This is one of the closest airport-to-city connections in Japan — no bus or private transfer needed.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.5l-10-9-10 9" />
        <path d="M6 21V11l6-5 6 5v10" />
      </svg>
    ),
  },
  {
    title: "Suica and Nimoca both work on all Fukuoka transit",
    desc: "Nimoca is Fukuoka's local IC card (issued by Nishitetsu), but Suica, Pasmo, ICOCA, and other nationwide IC cards work identically on the subway, Nishitetsu trains, and most Nishitetsu buses. No need to buy a Nimoca if you already have a Suica.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "Tenjin and Hakata are the two main hubs",
    desc: "Almost all Fukuoka transport passes through either Hakata Station (JR, Shinkansen, subway) or Tenjin (subway, Nishitetsu trains and buses). Once you understand these two hubs, getting around is straightforward. They're 5 minutes apart on the subway.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
  },
];

const fromFukuoka = [
  { from: "Hiroshima (Nozomi)", duration: "~50 min", notes: "JR Pass valid on Hikari/Kodama; add ~15 min" },
  { from: "Osaka (Nozomi)", duration: "~2 hrs 20 min", notes: "JR Pass valid on Hikari; add ~30 min" },
  { from: "Kyoto (Nozomi)", duration: "~2 hrs 35 min", notes: "JR Pass valid on Hikari; add ~30 min" },
  { from: "Tokyo (Nozomi)", duration: "~5 hrs", notes: "JR Pass valid on Hikari; add ~30 min" },
];

const faqItems = [
  {
    q: "What is the best way to get around Fukuoka?",
    a: "The Fukuoka City Subway is the fastest and simplest option for the main tourist corridor — airport, Hakata, and Tenjin. For outer areas and day trips to Dazaifu or Yanagawa, use Nishitetsu trains and buses. Both accept IC cards (Suica, Nimoca). For most tourists, the subway plus Nishitetsu covers everything.",
  },
  {
    q: "How do I get from Fukuoka Airport to the city centre?",
    a: "Take the Fukuoka City Subway Kūkō Line from Fukuoka Airport Station. To Hakata it takes 6 minutes (¥260); to Tenjin about 11 minutes (¥310). Trains run every 5–8 minutes during the day. It is one of the fastest and cheapest airport-to-city connections in Japan — no need for a bus or taxi.",
  },
  {
    q: "How do I get to Dazaifu from Fukuoka?",
    a: "Take the Fukuoka City Subway to Tenjin Station, then walk to Nishitetsu Fukuoka (Tenjin) Station and board the Nishitetsu Tenjin Omuta Line. Change at Nishitetsu-Futsukaichi for the 2-stop Dazaifu Line. Total journey time is around 35 minutes from Tenjin; the fare is approximately ¥650 each way. IC cards are accepted throughout.",
  },
  {
    q: "Does the JR Pass work in Fukuoka?",
    a: "The JR Pass covers JR trains in and around Fukuoka, including the Shinkansen (Hikari and Kodama, not Nozomi) at Hakata Station. However, it does NOT cover the Fukuoka City Subway or Nishitetsu trains and buses — those are separate private operators. For city transport, you'll still need IC card credit or a day pass.",
  },
  {
    q: "Is Fukuoka easy to get around as a first-time visitor?",
    a: "Yes — Fukuoka is one of the most navigable cities in Japan for tourists. The subway has only three short lines, all announcements are made in English, and IC card signs are clear. The compact city layout means most tourist attractions are within 20 minutes of Hakata or Tenjin. It is a great introduction to Japanese urban transit.",
  },
];

const canonicalUrl = "https://japan-travel-kit.com/guides/transport/fukuoka-transportation";

export default function FukuokaTransportationPage() {
  return (
    <>
      <Head>
        <title>Getting Around Fukuoka (2026): Subway, Trains & Buses | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get around Fukuoka in 2026. Subway, Nishitetsu trains and buses, Dazaifu day trip, IC cards, and day passes — explained for first-time visitors."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Getting Around Fukuoka (2026): Subway, Trains & Buses Explained" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:description" content="How to get around Fukuoka in 2026. Subway, Nishitetsu, day passes, and the Dazaifu day trip — all explained clearly for tourists." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Getting Around Fukuoka (2026): Subway, Trains & Buses Explained" />
        <meta name="twitter:description" content="How to get around Fukuoka in 2026. Subway, Nishitetsu, day passes, and the Dazaifu day trip — all explained clearly for tourists." />
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
              headline: "Getting Around Fukuoka (2026): Subway, Trains & Buses Explained",
              dateModified: "2026-05-26",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Getting Around Fukuoka", item: canonicalUrl },
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
          <span className={styles.breadCurrent}>Getting Around Fukuoka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚇</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Getting Around Fukuoka (2026):<br />Subway, Trains &amp; Buses Explained
          </h1>
          <p className={styles.heroSubtitle}>
            Fukuoka is compact and easy to navigate. Here&apos;s everything you need to get around
            the city — and how to reach Dazaifu.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Including Dazaifu Day Trip", "Beginner Friendly"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best for city</p>
                <p className={styles.verdictStatValue}>Fukuoka City Subway</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for Dazaifu</p>
                <p className={styles.verdictStatValue}>Nishitetsu Train</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>IC Card works?</p>
                <p className={styles.verdictStatValue}>Yes — subway &amp; Nishitetsu</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>The subway covers the main tourist corridor</strong> from the airport through Hakata to Tenjin. For day trips to Dazaifu Tenmangu Shrine, use Nishitetsu trains from Tenjin. Both accept Suica and Nimoca IC cards.
            </p>
          </div>
        </div>

        {/* Transport comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Options</span>
          <h2 className={styles.sectionTitle}>Getting Around Fukuoka</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Coverage", "Price", "Best For", "IC Card"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportOptions.map((row) => (
                    <tr key={row.mode}>
                      <td className={styles.tdProvider}>{row.mode}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.coverage}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td className={styles.tdBestFor}>{row.bestFor}</td>
                      <td style={{ fontWeight: 700, color: "#16a34a" }}>{row.icCard}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Fukuoka City Subway */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>City transport</span>
          <h2 className={styles.sectionTitle}>Fukuoka City Subway</h2>
          <p className={styles.bodyText}>
            Fukuoka&apos;s subway has three short lines and is easy to navigate even for first-time visitors.
            The most important line for tourists is the <strong>Kūkō Line (Airport Line)</strong>,
            which runs directly from Fukuoka Airport through Hakata Station and Tenjin —
            Fukuoka&apos;s two main hubs — then continues west to Meinohama.
          </p>
          <p className={styles.bodyText}>
            The airport to Hakata journey takes just 6 minutes (¥260), and Hakata to Tenjin is
            another 5 minutes (¥210). This makes Fukuoka one of the best-connected airports
            in all of Japan — landing and arriving at your hotel can take under 30 minutes total.
          </p>
          <p className={styles.bodyText}>
            All IC cards (Suica, Pasmo, Nimoca, ICOCA) work on the subway. A
            <strong> 1-day subway pass (¥640)</strong> pays for itself after three rides and is worth
            buying if you plan to move around the city throughout the day.
          </p>
        </section>

        {/* Nishitetsu */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Suburban transport</span>
          <h2 className={styles.sectionTitle}>Nishitetsu Trains &amp; Buses</h2>
          <p className={styles.bodyText}>
            Nishitetsu (Nishi-Nippon Railroad) operates the trains and buses that connect Fukuoka
            to destinations the subway doesn&apos;t reach. For tourists, the key route is the
            <strong> Nishitetsu Tenjin Omuta Line</strong>, which departs from Nishitetsu Fukuoka
            (Tenjin) Station and connects to Dazaifu and Yanagawa — the two most popular day trips
            from Fukuoka.
          </p>
          <p className={styles.bodyText}>
            Nishitetsu buses are the primary way to reach areas without subway coverage, including
            Ohori Park, Fukuoka Tower in the Momochi waterfront district, and Canal City Hakata
            (though Canal City is also within a 15-minute walk of Hakata Station).
          </p>
          <p className={styles.bodyText}>
            IC cards work on all Nishitetsu trains and the Fukuoka city bus network. The
            <strong> Fukuoka Tourist City Pass (¥1,500/day)</strong> covers subway, Nishitetsu buses,
            and some trains — useful if you plan to visit both Dazaifu and multiple city attractions
            in a single day.
          </p>
        </section>

        {/* Getting to Dazaifu */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Day trip guide</span>
          <h2 className={styles.sectionTitle}>Getting to Dazaifu Tenmangu Shrine</h2>
          <div className={styles.stepsList}>
            {dazaifuSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Day Passes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day passes</span>
          <h2 className={styles.sectionTitle}>Day Pass Options</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price", "Covers", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayPasses.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.covers}</td>
                      <td className={styles.tdBestFor}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <a
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1285111&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F26871-fukuoka-subway-unlimited-pass%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.25rem", display: "inline-block" }}
          >
            Get Fukuoka City Subway Pass on Klook →
          </a>
        </section>

        {/* Getting to/from Fukuoka (Shinkansen) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Shinkansen</span>
          <h2 className={styles.sectionTitle}>Getting To &amp; From Fukuoka</h2>
          <p className={styles.bodyText}>
            Hakata Station is the western terminus of the Tokaido-Sanyo Shinkansen — the main
            bullet train route connecting Fukuoka with Hiroshima, Osaka, Kyoto, and Tokyo. JR Pass
            holders can travel on Hikari and Kodama services for free; Nozomi (the fastest service)
            is excluded but the time difference is typically 15–30 minutes.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "Journey Time", "JR Pass Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fromFukuoka.map((row) => (
                    <tr key={row.from}>
                      <td className={styles.tdProvider}>{row.from}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.duration}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <a
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1rem", display: "inline-block" }}
          >
            Get JR Pass on Klook →
          </a>
        </section>

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>Tips for Getting Around Fukuoka</h2>
          <div className={styles.whoForGrid}>
            {tipsItems.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
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
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10h18" /><path d="M3 14h18" />
                  <path d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                  <path d="M7 18l-2 3" /><path d="M17 18l2 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
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
            <h2 className={styles.ctaBannerTitle}>Planning more Japan transport?</h2>
            <p className={styles.ctaBannerDesc}>
              From shinkansen and JR Pass to IC cards and city guides — our transport section covers every way to get around Japan.
            </p>
            <Link href="/guides/transport" className={styles.ctaBannerBtn}>
              View All Transport Guides →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
