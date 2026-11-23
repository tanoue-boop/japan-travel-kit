import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { osakaStayAreas } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

const attractionRoutes = [
  { dest: "Dotonbori",        from: "Namba",         line: "Walk",             time: "5 min",  price: "Free" },
  { dest: "Universal Studios", from: "Osaka",         line: "JR Yumesaki Line", time: "15 min", price: "¥200" },
  { dest: "Osaka Castle",     from: "Tanimachi-yonchome", line: "Osaka Metro",  time: "10 min", price: "From ¥190 (Namba ¥240)" },
  { dest: "Shinsekai",        from: "Dobutsuenmae",   line: "Osaka Metro",      time: "5 min",  price: "From ¥190" },
  { dest: "Tenpozan",         from: "Osakako",        line: "Osaka Metro (Chuo)", time: "20 min", price: "From ¥190 (Namba ¥290)" },
];

// C01 (23 Nov 2026): re-read on subway.osakametro.co.jp. The Enjoy Eco Card is ¥820 / ¥620 / child
// ¥310, covers Osaka Metro and Osaka City Bus but not Yumeshima Station, with discounts at about 20
// spots (en/guide/page/enjoy-eco.php). The Yoh-okoshi 30h Pass is ¥1,200 / ¥600, Osaka Metro only
// including Yumeshima, no buses, on sale 1 Oct 2026 – 30 Sep 2027 (digital_joshaken.php). The
// ¥1,800 2-day "Osaka Metro Pass" this page listed is the 48-hour ticket whose sale ended on
// 30 Sep 2026 (osaka-metro-pass guide). Fares ¥190–¥390 and Umeda–Namba ¥240 are the official
// figures read on 20 Nov 2026 for the osaka-metro-pass guide.
const FARES_CHECKED = "2026-11-23";
const ECO_URL = "https://subway.osakametro.co.jp/en/guide/page/enjoy-eco.php";
const DIGITAL_URL = "https://subway.osakametro.co.jp/guide/fare/category_digital_tickets/digital_tickets/digital_joshaken.php";
const FARES_URL = "https://subway.osakametro.co.jp/en/guide/fare/fare/price.php";

const dayPasses = [
  { pass: "Which to buy",              price: "¥620–¥1,200", bestFor: "4+ rides in a day: Enjoy Eco Card. 2–3 rides: ICOCA or Suica. Midday to the next evening: Yoh-okoshi 30h Pass", worth: "Enjoy Eco Card for most days" },
  { pass: "Enjoy Eco Card (weekday)",  price: "¥820",   bestFor: "Full day sightseeing — anyone can buy", worth: "Yes, from the 4th ¥240 ride" },
  { pass: "Enjoy Eco Card (Sat, Sun & holidays)", price: "¥620", bestFor: "Weekend & holiday visits", worth: "Yes, from the 3rd ¥240 ride" },
  { pass: "Yoh-okoshi 30h Pass (digital)", price: "¥1,200", bestFor: "30 hours from first use, Osaka Metro only (incl. Yumeshima), no buses", worth: "If your 30 hours span two days" },
  { pass: "Single fare (ICOCA / ticket)", price: "¥190–¥390", bestFor: "Umeda–Namba is ¥240", worth: "Cheapest for 2–3 rides" },
];

const passCompareRows = [
  { feature: "Who can buy",        eco: "Anyone (residents & tourists)", pass: "Anyone, in the e METRO app or on the Surutto QRtto site" },
  { feature: "Price",             eco: "¥820 weekday / ¥620 Sat, Sun & holidays", pass: "¥1,200" },
  { feature: "Child price",        eco: "¥310",                          pass: "¥600" },
  { feature: "Duration",          eco: "1 day",                         pass: "30 hours from first use; start within 30 days of buying" },
  { feature: "Covers",            eco: "Osaka Metro + Osaka City Bus",  pass: "Osaka Metro only (no buses)" },
  { feature: "Reaches Yumeshima", eco: "No (Yumeshima Station excluded)", pass: "Yes" },
  { feature: "Attraction discounts", eco: "About 20 sightseeing spots", pass: "20+ facilities" },
  { feature: "On sale",           eco: "Station ticket machines",        pass: "1 Oct 2026 – 30 Sep 2027" },
];

const passVsRows = [
  { scenario: "One day, on a weekend or holiday", pick: "Enjoy Eco Card", note: "At ¥620 it pays for itself on the third ¥240 ride — and anyone can buy it." },
  { scenario: "One day, on a weekday",            pick: "Enjoy Eco Card", note: "¥820 pays for itself on the fourth ¥240 ride, with discounts at about 20 sightseeing spots." },
  { scenario: "Midday to the next evening",       pick: "Yoh-okoshi 30h Pass", note: "¥1,200 for 30 hours from first use; the old ¥1,800 2-day pass is no longer sold." },
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
    a: "An IC card (Suica or ICOCA) is the most flexible way to get around Osaka. It works on Osaka Metro, JR lines, private railways and local buses — tap in, tap out, and the correct fare is deducted automatically. For a day of four or more subway rides, buy the Enjoy Eco Card: ¥820 on weekdays, ¥620 on Saturdays, Sundays and holidays (Osaka Metro, checked 23 November 2026).",
  },
  {
    q: "How much does Osaka transportation cost per day?",
    a: "Between ¥620 and ¥820 for unlimited Osaka Metro and Osaka City Bus rides on the Enjoy Eco Card (weekend and weekday price), or ¥190–¥390 per ride on ICOCA. A sightseeing day of Namba, Osaka Castle, Umeda and Tennoji comes to ¥1,010 in single fares, so the card saves ¥190 on a weekday and ¥390 at the weekend. Fares from Osaka Metro, checked 20 and 23 November 2026.",
  },
  {
    q: "Is a day pass worth it in Osaka?",
    a: "Yes, more often than in Tokyo. The Enjoy Eco Card (¥820 on weekdays) pays for itself on the fourth ¥240 ride, which is easy to hit on a full sightseeing day; on Saturdays, Sundays and holidays it drops to ¥620 and breaks even on the third. A single Midosuji Line hop from Umeda to Namba is ¥240. The 2-day Osaka Metro Pass (¥1,800) is no longer sold; for a midday-to-next-evening span, the ¥1,200 Yoh-okoshi 30h Pass covers 30 hours of Osaka Metro.",
  },
  {
    q: "Can I use Suica in Osaka?",
    a: "Yes. Suica is accepted on Osaka Metro, JR West, and most private railways in the Kansai region. If you already have a Suica from Tokyo, simply top it up and use it in Osaka — no need to buy a separate ICOCA card. Both cards are interchangeable across Japan.",
  },
  {
    q: "Enjoy Eco Card or Yoh-okoshi 30h Pass: which covers Yumeshima?",
    a: "Only the Yoh-okoshi 30h Pass. Osaka Metro's Enjoy Eco Card page excludes Yumeshima Station, while the ¥1,200 Yoh-okoshi 30h Pass (child ¥600) covers all Osaka Metro lines including Yumeshima but no buses, for 30 hours from first use; it is sold in the e METRO app and on the Surutto QRtto site from 1 October 2026 to 30 September 2027. For a single day in the city, the ¥620–¥820 Enjoy Eco Card is cheaper. Checked 23 November 2026.",
  },
];

// C01 (23 Nov 2026): 7 impressions at 9.1, 0 clicks. Fares, passes and ICOCA lead the title, and
// the lead answers what a day of transport costs.
const TITLE = "Osaka Transportation 2026: Metro Fares, Passes & ICOCA";
const H1_TEXT = "Osaka Transportation 2026: Metro Fares, Day Passes & ICOCA";
const DESCRIPTION =
  "Osaka transportation 2026: Metro fares ¥190–¥390 a ride, Enjoy Eco Card day pass ¥820 (¥620 weekends) from the 4th ride, and ICOCA or Suica for the rest.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/osaka-transportation") } });

export default function OsakaTransportationPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/osaka-transportation" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/osaka-transportation" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
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
            __html: articleJsonLd({
              route: "/guides/transport/osaka-transportation",
              headline: TITLE,
              description: DESCRIPTION,
              updated,
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Getting Around Osaka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            {H1_TEXT}
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
        {/* Answer first */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>A day of Osaka transportation costs ¥620–¥820 on the Enjoy Eco Card (¥820 weekdays, ¥620
            Saturdays, Sundays and holidays), or ¥190–¥390 a ride on an ICOCA or Suica, with Umeda–Namba at ¥240.</strong>{" "}
            The network is the Osaka Metro — the Midosuji Line links Shin-Osaka, Umeda, Namba and Tennoji — plus
            JR for Universal Studios and day trips, and the Enjoy Eco Card pays off from the fourth ¥240 ride on a
            weekday. The <strong>¥3,500{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass</Link></strong>{" "}
            only pays off if the admissions you will use come to more than the ¥2,680 difference (Osaka Metro
            prices checked 23 November 2026; more in our{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass guide</Link>).
          </p>
          <p className={styles.bodyText}>
            Arriving from Tokyo or flying in? The{" "}
            <Link href="/guides/transport" style={{ color: "var(--text)", fontWeight: 600 }}>Japan transportation guide</Link>{" "}
            sets the shinkansen, the Kansai Airport trains and the regional JR passes against each other.
          </p>
        </section>

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
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Suica IC Card on Klook →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

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
            journey from Umeda to Namba costs ¥240 and takes about 7 minutes. This one
            route covers the majority of what most visitors want to see in Osaka.
          </p>
        </section>

        {/* Where to stay for easy transport */}
        <KlookStayAreas
          heading="Where to Stay So Getting Around Is Easy"
          intro="In Osaka the answer is unusually simple: stay on the Midosuji Line. It runs north to south through every hub a visitor needs, trains come every 2–3 minutes, and end-to-end fares are small change. These three stops are the ones worth booking around."
          areas={osakaStayAreas}
        />

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
                      <td style={{ color: "var(--accent)", fontWeight: 600 }}>{row.worth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Last checked: {FARES_CHECKED}. Official:{" "}
            <a href={ECO_URL} target="_blank" rel="noopener noreferrer">Enjoy Eco Card</a>,{" "}
            <a href={DIGITAL_URL} target="_blank" rel="noopener noreferrer">Yoh-okoshi 30h Pass</a>,{" "}
            <a href={FARES_URL} target="_blank" rel="noopener noreferrer">Osaka Metro fares</a>.
          </p>
          <p className={styles.bodyText}>
            Unlike Tokyo, day passes in Osaka are genuinely good value for sightseers. The break-even
            point is four ¥240 journeys for the ¥820 weekday Enjoy Eco Card — and just three at the ¥620
            weekend price — which most visitors hit before lunch. The Enjoy Eco Card is open to residents
            and tourists alike (no passport needed) and is sold at any Osaka Metro station ticket machine;
            it also unlocks discounts at about 20 sightseeing spots, but it does not cover Yumeshima Station.
            The 2-day Osaka Metro Pass is no longer sold; the nearest thing is the ¥1,200 Yoh-okoshi 30h Pass. To
            choose between the passes, with a sample day priced ride by ride, see our{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass</Link> guide. One of the
            Amazing Pass&apos;s free admissions is a five-minute walk from Namba Station: the{" "}
            <Link href="/guides/attractions/dotonbori-river-cruise">Dotonbori river cruise (Tombori River Cruise)</Link>,
            which leaves Tazaemonbashi Pier every 30 minutes.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Enjoy Eco Card vs Yoh-okoshi 30h Pass
          </h3>
          <div className={styles.tableWrap} style={{ marginTop: "0.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Enjoy Eco Card", "Yoh-okoshi 30h Pass"].map((h) => (
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
            Last checked: {FARES_CHECKED} on{" "}
            <a href={ECO_URL} target="_blank" rel="noopener noreferrer">subway.osakametro.co.jp (Enjoy Eco Card)</a> and{" "}
            <a href={DIGITAL_URL} target="_blank" rel="noopener noreferrer">its digital tickets page</a>.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
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
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1267428&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F11515-osaka-metro-1-2-day-pass-osaka%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Buy Osaka Metro Day Pass on Klook →
            </KlookLink>
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
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Pre-order Suica IC Card on Klook →
            </KlookLink>
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
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-faint)" }}>
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
            <strong>To Nara:</strong> Kintetsu runs from Osaka-Namba to Kintetsu-Nara. If you will ride Kintetsu more than once, our{" "}
            <Link href="/guides/transport/kintetsu-rail-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kintetsu Rail Pass guide
            </Link>{" "}
            prices the 1day, 2day and 5day passes against single tickets.
          </p>
          <p className={styles.bodyText}>
            <strong>From Kansai Airport (KIX):</strong> The JR Haruka reaches Shin-Osaka in about 50 minutes (¥1,900 on
            JR West&apos;s HARUKA One-way Ticket for foreign visitors) and Tennoji in about 30. The Nankai Rapi:t reaches
            Namba in a minimum of 34 minutes for ¥1,410 on Nankai&apos;s Rapi:t Digital Ticket — the better pick if your
            accommodation is in or around Namba (JR West, Nankai and Kansai Airport, checked 23 Nov 2026). Our{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--text)", fontWeight: 600 }}>
              Osaka airport transfer
            </Link>{" "}
            table compares train, bus and private car to Namba, Umeda, Shin-Osaka and Kyoto, with Itami too.
          </p>
          <div style={{ margin: "1.5rem 0" }}>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265374&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F599-kansai-airport-namba-train-ticket-osaka%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Book Nankai Rapi:t (KIX → Namba) on Klook →
            </KlookLink>
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

        <EsimCtaBottom />

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
            {/* Added 4 Nov 2026: the rail pass guide for this route. */}
            <Link href="/guides/transport/kintetsu-rail-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kintetsu Rail Pass (2026): Prices and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka 2026: Namba vs Umeda vs USJ, the Best Areas Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-castle-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V9l2-2 2 2V5l4-3 4 3v4l2-2 2 2v12z" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Castle Tickets (2026): Prices, Hours and What the Pass Covers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/umeda-sky-building-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="5" height="15" />
                  <rect x="15" y="6" width="5" height="15" />
                  <path d="M4 6h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Umeda Sky Building Tickets (2026): Prices, Hours and the Best Time to Go</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-4 7-6 11-6 3 0 5 1 7 3-2 2-4 3-7 3-4 0-8-2-11 0z" />
                  <circle cx="15" cy="9" r="0.8" fill="currentColor" stroke="none" />
                  <path d="M3 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Aquarium Kaiyukan Tickets (2026): Prices, Hours and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10h18M5 10V7l7-4 7 4v3" />
                  <path d="M6 10v10M18 10v10M3 20h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="16" rx="2" />
                  <path d="M4 11h16M8 19l-1 2M16 19l1 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass vs Enjoy Eco Card (2026): Which Should Tourists Buy?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer 2026: Train vs Bus from KIX &amp; Itami</p>
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
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="16" rx="2" />
                  <path d="M4 11h16M8 19l-1 2M16 19l1 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
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
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Suica on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
