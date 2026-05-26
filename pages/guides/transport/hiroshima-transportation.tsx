import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const transportOptions = [
  { mode: "Tram (Streetcar)", coverage: "City centre", price: "¥180 / ride", bestFor: "Peace Park, Hiroshima Castle, Shukkeien", icCard: "✓" },
  { mode: "JR Train", coverage: "Wider area", price: "From ¥170", bestFor: "Miyajima access (Miyajimaguchi)", icCard: "✓" },
  { mode: "Bus", coverage: "Suburbs", price: "¥180+", bestFor: "Flexibility, outer districts", icCard: "✓" },
  { mode: "Taxi", coverage: "Door-to-door", price: "¥700 flag fall", bestFor: "Groups, luggage, late night", icCard: "✓" },
];

const dayPasses = [
  { pass: "Tram 1-Day Pass", price: "¥700", covers: "All tram lines citywide", bestFor: "City-centre sightseeing" },
  { pass: "Visit Hiroshima Tourist Pass (1-day)", price: "¥840", covers: "All tram lines + some city buses", bestFor: "Flexible city exploration" },
  { pass: "JR + Ferry (with JR Pass)", price: "Covered", covers: "JR San'yo Line + JR Miyajima Ferry", bestFor: "Miyajima day trip" },
];

const miyajimaSteps = [
  {
    title: "Take the JR San'yo Line to Miyajimaguchi",
    desc: "Trains run from Hiroshima Station every 15–20 minutes. The journey takes approximately 26 minutes. JR Pass holders travel for free on this leg — a significant saving.",
  },
  {
    title: "Walk to the JR Ferry terminal (5 min)",
    desc: "From Miyajimaguchi Station, walk 5 minutes to the ferry terminal. There are two operators: JR Ferry (free with JR Pass) and Matsudai Kisen (private, ¥200 one-way). Both cross to Miyajima in about 10 minutes.",
  },
  {
    title: "Take the ferry to Miyajima",
    desc: "Ferries depart approximately every 15 minutes. The crossing offers great views of the floating torii gate as you approach. JR Pass holders should make sure they board the JR ferry, not the private one.",
  },
  {
    title: "Check the tide times before you go",
    desc: "The famous Itsukushima torii gate appears to float at high tide and stands on exposed sand at low tide — two completely different experiences. Check the tide schedule at the tourism office or online to plan your visit accordingly.",
  },
];

const tipsItems = [
  {
    title: "Board trams at the rear door — pay at the front",
    desc: "Hiroshima's trams use rear-door boarding and front-door exit with fare payment. Tap your IC card as you exit, or drop the flat ¥180 cash fare in the box beside the driver. Have exact change ready if paying cash.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
        <line x1="7" y1="21" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    title: "Visit Miyajima early morning to avoid crowds",
    desc: "Miyajima is one of Japan's most-visited islands and gets extremely crowded from mid-morning. Take the first or second ferry of the day to experience the shrine area before tour groups arrive. Many deer roam freely near the ferry terminal.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    title: "The Peace Park is fully walkable from the tram",
    desc: "The Hiroshima Peace Memorial Park, A-Bomb Dome, and Peace Memorial Museum are all within easy walking distance of the Genbaku Dome-mae tram stop (Lines 2 and 6). No taxi or additional transport is needed.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" />
        <path d="M9 20l3-7 3 7" /><path d="M6 12l6-7 6 7" />
      </svg>
    ),
  },
];

const fromHiroshima = [
  { from: "Tokyo (Nozomi)", duration: "~4 hrs", notes: "JR Pass valid on Hikari (not Nozomi); add ~30 min" },
  { from: "Osaka (Nozomi)", duration: "~1 hr 30 min", notes: "JR Pass valid on Hikari; add ~15 min" },
  { from: "Kyoto (Nozomi)", duration: "~1 hr 40 min", notes: "JR Pass valid on Hikari; add ~15 min" },
  { from: "Fukuoka/Hakata", duration: "~50 min", notes: "Closest major city; all shinkansen types" },
];

const faqItems = [
  {
    q: "What is the best way to get around Hiroshima?",
    a: "The Hiroshima tram (streetcar) is the best way to explore the city centre. A single ride costs ¥180 flat, IC cards are accepted, and the network covers all major tourist attractions including the Peace Memorial Park, Hiroshima Castle, and Shukkeien Garden. A 1-day tram pass (¥700) is worth buying if you plan more than four journeys.",
  },
  {
    q: "Can I use JR Pass to get to Miyajima?",
    a: "Yes. The JR Pass covers the JR San'yo Line from Hiroshima Station to Miyajimaguchi, and also covers the JR-operated Miyajima Ferry. This makes Miyajima essentially free with a JR Pass — one of its best-value inclusions. Note: the private Matsudai Kisen ferry is not covered by JR Pass.",
  },
  {
    q: "How do I get from Hiroshima to Miyajima?",
    a: "Take the JR San'yo Line from Hiroshima Station to Miyajimaguchi (about 26 minutes), then walk 5 minutes to the ferry terminal and board the JR Ferry to Miyajima (10 minutes). The total journey from Hiroshima Station to Miyajima takes about 40–45 minutes. JR Pass holders travel the entire route for free.",
  },
  {
    q: "Is Hiroshima easy to get around?",
    a: "Yes. Hiroshima is one of the most tourist-friendly cities in Japan for navigation. The tram network is simple, stops are announced in English and Japanese, and all major attractions are concentrated within a compact area. IC cards (Suica, ICOCA) work on the tram, JR trains, and most buses. First-time visitors typically have no difficulty.",
  },
  {
    q: "How long should I spend in Hiroshima?",
    a: "Most visitors spend 1–2 days in Hiroshima. One full day allows you to visit the Peace Memorial Park, A-Bomb Dome, and Peace Memorial Museum in the morning, and Miyajima in the afternoon. Two days gives a more relaxed pace — including Hiroshima Castle, Shukkeien Garden, and a longer stay on Miyajima to see the torii gate at different tide times.",
  },
];

export default function HiroshimaTransportationPage() {
  return (
    <>
      <Head>
        <title>Getting Around Hiroshima 2026: Trams, Trains &amp; Miyajima | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get around Hiroshima in 2026. We cover trams, JR trains, the Miyajima ferry, day passes, and IC cards — with tips for first-time visitors."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport/hiroshima-transportation" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Getting Around Hiroshima 2026: Trams, Trains & Miyajima | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport/hiroshima-transportation" />
        <meta property="og:description" content="How to get around Hiroshima in 2026. We cover trams, JR trains, the Miyajima ferry, day passes, and IC cards — with tips for first-time visitors." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Getting Around Hiroshima 2026: Trams, Trains & Miyajima | Japan Travel Kit" />
        <meta name="twitter:description" content="How to get around Hiroshima in 2026. We cover trams, JR trains, the Miyajima ferry, day passes, and IC cards — with tips for first-time visitors." />
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
              headline: "Getting Around Hiroshima (2026): Trams, Trains & Miyajima",
              dateModified: "2026-05-02",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Getting Around Hiroshima", item: "https://japan-travel-kit.com/guides/transport/hiroshima-transportation" },
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
          <span className={styles.breadCurrent}>Getting Around Hiroshima</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚃</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Getting Around Hiroshima (2026):<br />Trams, Trains &amp; Miyajima
          </h1>
          <p className={styles.heroSubtitle}>
            Hiroshima is compact and easy to navigate. Here&apos;s everything you need to get around
            the city — and how to reach Miyajima Island.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "Including Miyajima", "Beginner Friendly"].map((t) => (
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
                <p className={styles.verdictStatValue}>Hiroshima tram (streetcar)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for Miyajima</p>
                <p className={styles.verdictStatValue}>JR Train + JR Ferry</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>IC Card works?</p>
                <p className={styles.verdictStatValue}>Yes — trams &amp; trains</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>The tram is your main tool</strong> for the city centre at ¥180 per ride.
              For Miyajima, take the JR San&apos;yo Line to Miyajimaguchi, then the JR Ferry —
              both free with a JR Pass.
            </p>
          </div>
        </div>

        {/* Transport comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Options</span>
          <h2 className={styles.sectionTitle}>Getting Around Hiroshima City</h2>
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

        {/* Hiroshima Tram */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>City transport</span>
          <h2 className={styles.sectionTitle}>Hiroshima Tram (Streetcar)</h2>
          <p className={styles.bodyText}>
            Hiroshima&apos;s tram network — one of the oldest in Japan, having survived the atomic
            bombing — is the backbone of tourist transport in the city. With a flat ¥180 fare
            for adults across the entire network, it is also one of Japan&apos;s most straightforward
            transit systems.
          </p>
          <p className={styles.bodyText}>
            The tram connects Hiroshima Station (east) with the Peace Memorial Park area and
            Hiroshima Castle in the city centre, running frequently throughout the day.
            Key stops include <strong>Genbaku Dome-mae</strong> (A-Bomb Dome, Peace Park) and
            <strong> Kamiya-cho</strong> (city centre shopping). Lines 2 and 6 are the most
            useful for tourists.
          </p>
          <p className={styles.bodyText}>
            IC cards (Suica, ICOCA, Nimoca) are accepted on all tram routes. Simply tap on as
            you board at the rear door and tap again as you exit at the front.
            A <strong>1-day tram pass (¥700)</strong> breaks even at four journeys and is
            recommended for any full day of sightseeing.
          </p>
        </section>

        {/* Getting to Miyajima */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Day trip guide</span>
          <h2 className={styles.sectionTitle}>Getting to Miyajima Island</h2>
          <div className={styles.stepsList}>
            {miyajimaSteps.map((step, i) => (
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
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1284449&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F17095-hiroshima-tourist-pass-kyushu-fukuoka-kumamoto%2F"
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.25rem", display: "inline-block" }}
          >
            Get Hiroshima Tourist Pass on Klook →
          </a>
        </section>

        {/* Getting to/from Hiroshima */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Shinkansen</span>
          <h2 className={styles.sectionTitle}>Getting To &amp; From Hiroshima</h2>
          <p className={styles.bodyText}>
            Hiroshima is served by the San&apos;yo Shinkansen, placing it within easy reach of
            Osaka, Kyoto, and Tokyo. JR Pass holders can travel on all Hikari and Kodama
            shinkansen services for free; Nozomi is excluded but adds only 15–30 minutes to journeys.
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
                  {fromHiroshima.map((row) => (
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            If you don&apos;t have a JR Pass and plan to travel the Tokyo–Hiroshima or
            Osaka–Hiroshima route, the pass usually pays for itself on this single journey.
          </p>
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
          <h2 className={styles.sectionTitle}>Tips for Getting Around Hiroshima</h2>
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
              From shinkansen and JR Pass to IC cards and city guides — our transport
              section covers every way to get around Japan.
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
