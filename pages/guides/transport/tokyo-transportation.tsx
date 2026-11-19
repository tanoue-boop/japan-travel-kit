import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { tokyoStayAreas } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/*
 * Scope (Nov 16 I01): this page answers "how do I get around inside Tokyo" — lines, what a ride
 * costs, IC cards and a day's budget. Japan-wide fares and passes are the /guides/transport hub;
 * the Tokyo Subway Ticket's ride-by-ride break-even is /guides/attractions/tokyo-subway-ticket.
 *
 * Fares, all checked 16 November 2026:
 * - JR East: fare table in its 1 Aug 2025 approval release (20250801_ho03.pdf), in force since
 *   14 March 2026 — 1–3 km ¥155 IC / ¥160 ticket, 4–6 km ¥199 / ¥200, 7–10 km ¥209 / ¥210; the
 *   old "Yamanote Line" fare band was merged into the trunk-line band.
 * - Tokyo Free Kippu ¥1,720 (child ¥860) from 14 March 2026: JR East pamphlet2.pdf.
 * - Tokyo Metro single fares and the Metro / Toei passes: tokyometro.jp, the same figures the
 *   Tokyo Subway Ticket guide re-read on 16 November 2026 (¥1,000 / ¥1,500 / ¥2,000 since 14 March).
 * Route fares below are the band for each pair's JR / Metro distance (Shibuya–Harajuku 1.2 km,
 * Shinjuku–Shibuya 3.4 km, Tokyo–Ueno 3.6 km, Ginza Line Asakusa–Shibuya 14.2 km).
 */
const METRO_CHECKED = "16 November 2026";
const LAST_CHECKED = "2026-11-16";
const JR_FARES = "https://www.jreast.co.jp/press/2025/20250801_ho03.pdf";
const JR_PASSES = "https://www.jreast.co.jp/2026unchin-kaitei/assets/pdf/pamphlet2.pdf";
const METRO_FARES = "https://www.tokyometro.jp/en/ticket/regular/index.html";
const METRO_PASSES = "https://www.tokyometro.jp/en/ticket/travel/index.html";

const TITLE = "How to Get Around Tokyo 2026: Train Fares, Suica & Passes";
const H1_LINE1 = "How to Get Around Tokyo (2026):";
const H1_LINE2 = "Trains, Subway Fares & Which Pass";
const DESCRIPTION =
  "How to get around Tokyo in 2026: JR rides from ¥155 and Tokyo Metro from ¥178 on Suica, about ¥620–¥840 a day, key routes and when a subway pass pays off.";

const fareRows = [
  { op: "Most central hops (either network)", band: "Up to about 10 km", ic: "¥155–¥209", ticket: "¥160–¥210" },
  { op: "JR East (Yamanote, Chuo, Sobu)", band: "1–3 km", ic: "¥155", ticket: "¥160" },
  { op: "JR East", band: "4–6 km", ic: "¥199", ticket: "¥200" },
  { op: "JR East", band: "7–10 km", ic: "¥209", ticket: "¥210" },
  { op: "Tokyo Metro", band: "1–6 km", ic: "¥178", ticket: "¥180" },
  { op: "Tokyo Metro", band: "7–11 km", ic: "¥209", ticket: "¥210" },
  { op: "Tokyo Metro", band: "12–19 km", ic: "¥252", ticket: "¥260" },
];

const dailyRows = [
  { day: "Typical sightseeing day: 4 rides", payg: "About ¥620–¥840", better: "Pay as you go, or the 72-hour Subway Ticket (¥667 a day) if all 4 are subway" },
  { day: "Light day: 2 rides", payg: "About ¥310–¥420", better: "Pay as you go" },
  { day: "Busy day: 6 rides", payg: "About ¥930–¥1,250", better: "Tokyo Subway Ticket if they are Metro / Toei rides" },
  { day: "Mostly JR (Yamanote loop)", payg: "¥155–¥209 a ride", better: "Suica or PASMO — the Subway Ticket does not cover JR" },
];

const keyRoutes = [
  { from: "Shibuya",  to: "Harajuku", line: "JR Yamanote Line",   time: "2 min",  price: "¥155" },
  { from: "Shinjuku", to: "Shibuya",  line: "JR Yamanote Line",   time: "5 min",  price: "¥199" },
  { from: "Tokyo",    to: "Ueno",     line: "JR Yamanote Line",   time: "8 min",  price: "¥199" },
  { from: "Asakusa",  to: "Shibuya",  line: "Tokyo Metro Ginza Line", time: "About 30 min", price: "¥252" },
];

const dayPasses = [
  { pass: "Tokyo Subway Ticket (24 / 48 / 72-hour)", price: "¥1,000 / ¥1,500 / ¥2,000", covers: "Tokyo Metro + Toei Subway, from first use", worth: "Often (72-hour)" },
  { pass: "Tokyo Metro 24-hour Ticket", price: "¥700", covers: "Tokyo Metro only, 24 hours from first use", worth: "Sometimes" },
  { pass: "Common One-day Ticket (Metro & Toei)", price: "¥1,100", covers: "Tokyo Metro + Toei Subway, one day", worth: "Sometimes" },
  { pass: "Tokyo Free Kippu",  price: "¥1,720", covers: "JR in the 23 wards + Tokyo Metro + Toei, one day", worth: "Rarely" },
];

const subwayVsIcRows = [
  { scenario: "1–3 subway rides per day",   pick: "Suica / Pasmo", note: "Pay-as-you-go is cheaper and more flexible at this level of use." },
  { scenario: "4+ subway rides per day",    pick: "Subway Ticket", note: "The flat-rate pass beats per-ride fares once you're hopping around a lot." },
  { scenario: "Using JR (Yamanote) a lot",  pick: "Suica / Pasmo", note: "The Subway Ticket does not cover JR lines — an IC card does." },
  { scenario: "One intense sightseeing day", pick: "Subway Ticket", note: "A packed day of Asakusa → Ueno → Ginza → Roppongi → Shibuya easily clears 5 rides." },
];

const tokyoLines = [
  {
    title: "JR Lines (Japan Railways)",
    desc: "JR East operates the Yamanote Line and several other key Tokyo routes. You pay per journey — IC cards work on all JR lines and there's no day pass that covers JR alone in Tokyo.",
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
    title: "Tokyo Metro (9 lines)",
    desc: "The main subway network covering central Tokyo with 9 colour-coded lines. Reaches Shibuya, Shinjuku, Akihabara, Ginza, Roppongi, and most major tourist areas. IC cards accepted.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "Toei Subway (4 lines)",
    desc: "Operated by the Tokyo Metropolitan Government. Four lines — Asakusa, Mita, Shinjuku, and Oedo. Not part of the Tokyo Metro network, so transfers between the two are charged separately.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M3 15h18M9 3v18" />
      </svg>
    ),
  },
];

const trainTips = [
  {
    title: "Avoid rush hour",
    desc: "Tokyo trains are extremely crowded during morning rush (07:30–09:00) and evening rush (17:30–19:30). If you have a flexible schedule, leave your hotel after 09:30 for a much more comfortable experience.",
  },
  {
    title: "Women-only carriages",
    desc: "Most Tokyo train lines designate one or two carriages as women-only during rush hours (typically 07:30–09:30 on weekdays). These are clearly marked on the platform floor. Men should board other carriages during these times.",
  },
  {
    title: "Keep noise to a minimum",
    desc: "Tokyo trains are quiet. Phone calls are considered rude — step onto the platform if you need to call. On Priority Seating (silvery-grey seats near the doors), phones should be on silent.",
  },
  {
    title: "Use Google Maps for routing",
    desc: "Google Maps is the most reliable navigation tool for Tokyo's complex train network. It shows real-time routes, transfers, fares, and even which carriage to board for the fastest exit. Apple Maps and Hyperdia are also useful.",
  },
];

const faqItems = [
  {
    q: "What is the best way to get around Tokyo?",
    a: "By train, paying with a Suica or PASMO IC card. The same card works on JR East (including the Yamanote Line), Tokyo Metro, Toei Subway and local buses: tap in, tap out, and the fare is taken automatically, so you never need to work out a ticket price or which company runs the line.",
  },
  {
    q: "How much is a train ride in Tokyo?",
    a: `¥155 to ¥209 on an IC card for most central hops. JR East's fares since 14 March 2026 are ¥155 for 1–3 km, ¥199 for 4–6 km and ¥209 for 7–10 km (¥160 / ¥200 / ¥210 on a paper ticket), and Tokyo Metro charges ¥178 for 1–6 km and ¥209 for 7–11 km. Checked on jreast.co.jp and tokyometro.jp, ${METRO_CHECKED}.`,
  },
  {
    q: "How much does transport cost per day in Tokyo?",
    a: "About ¥620 to ¥840 for a typical day of four train rides paid by IC card, and roughly ¥930 to ¥1,250 for a busy day of six. A pass only beats that when most of the rides are on the subway: the 72-hour Tokyo Subway Ticket works out at ¥667 a day, but it does not cover JR lines.",
  },
  {
    q: "How do I get from Shinjuku to Shibuya?",
    a: "Take the JR Yamanote Line: about 5 minutes and ¥199 on an IC card (¥200 by ticket), since the 3.4 km trip falls in JR East's 4–6 km fare band. From Shinjuku, follow the green Yamanote Line signs and board a train towards Shibuya and Shinagawa.",
  },
  {
    q: "Is the Tokyo Subway Ticket worth it?",
    a: `Usually on the 72-hour version. The adult prices are ¥1,000 (24-hour), ¥1,500 (48-hour) and ¥2,000 (72-hour) since 14 March 2026, against ¥178–¥209 for most Tokyo Metro rides on an IC card, so the 72-hour ticket pays off from about four subway rides a day. It does not cover JR, so a Yamanote-heavy trip is cheaper on Suica. Prices from tokyometro.jp, checked ${METRO_CHECKED}; the ride-by-ride table is in the Tokyo Subway Ticket guide.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/tokyo-transportation") } });

export default function TokyoTransportationPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          name="description"
          content={DESCRIPTION}
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-transportation" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-transportation" />
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
              route: "/guides/transport/tokyo-transportation",
              headline: `${H1_LINE1} ${H1_LINE2}`,
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
                { "@type": "ListItem", position: 4, name: "How to Get Around Tokyo", item: "https://www.japan-travel-kit.com/guides/transport/tokyo-transportation" },
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
          <span className={styles.breadCurrent}>How to Get Around Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            {H1_LINE1} <br />{H1_LINE2}
          </h1>
          <p className={styles.heroSubtitle}>
            Getting around inside Tokyo: what a ride costs on JR and the subway, which IC card to tap, a day&apos;s
            transport budget and the routes visitors use most.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2026 fares", "Inside Tokyo"].map((t) => (
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
            <p className={styles.verdictText} style={{ marginTop: 0 }}>
              The way to get around Tokyo is by train with a Suica or PASMO card, which works on JR, Tokyo Metro,
              Toei Subway and buses. A JR ride starts at <strong>¥155</strong> on an IC card (¥160 by ticket)
              since the 14 March 2026 fare rise, and a Tokyo Metro ride at <strong>¥178</strong>, so most central
              hops cost ¥155–¥209. A sightseeing day of four rides comes to about <strong>¥620–¥840</strong>; a
              pass only pays off on days that are mostly subway. Fares checked {METRO_CHECKED}.
            </p>
            <div className={styles.verdictGrid} style={{ marginTop: "1rem" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pay with</p>
                <p className={styles.verdictStatValue}>Suica / PASMO</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Minimum fare (IC)</p>
                <p className={styles.verdictStatValue}>JR ¥155 · Metro ¥178</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Per day, 4 rides</p>
                <p className={styles.verdictStatValue}>About ¥620–¥840</p>
              </div>
            </div>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.verdictBtn}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Get Suica IC Card on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fares</span>
          <h2 className={styles.sectionTitle}>How Much Is a Train Ride in Tokyo?</h2>
          <p className={styles.bodyText}>
            ¥155 to ¥209 on an IC card for most rides inside central Tokyo. Fares go by distance, and since 14
            March 2026 the JR lines inside the Yamanote loop use the same fare table as the rest of JR East&apos;s
            main lines.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Operator", "Distance", "Adult IC fare", "Adult ticket"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={`${row.op}-${row.band}`}>
                      <td className={styles.tdProvider}>{row.op}</td>
                      <td>{row.band}</td>
                      <td className={styles.tdPrice}>{row.ic}</td>
                      <td>{row.ticket}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. JR East fares from its{" "}
            <a href={JR_FARES} target="_blank" rel="noopener noreferrer">fare revision release</a> (in force since
            14 March 2026); Tokyo Metro fares from{" "}
            <a href={METRO_FARES} target="_blank" rel="noopener noreferrer">tokyometro.jp</a>. Toei Subway sets its
            own fares.
          </p>
        </section>

        {/* Per day */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Budget</span>
          <h2 className={styles.sectionTitle}>How Much Does Transport Cost per Day in Tokyo?</h2>
          <p className={styles.bodyText}>
            About ¥620–¥840 for a typical day of four rides paid by IC card. The figures below multiply the fares
            above; a pass is only cheaper on a day that is mostly Tokyo Metro and Toei.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your day", "Pay as you go (IC)", "Cheaper option"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider}>{row.day}</td>
                      <td className={styles.tdPrice}>{row.payg}</td>
                      <td>{row.better}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Tokyo Subway Ticket price from{" "}
            <a href={METRO_PASSES} target="_blank" rel="noopener noreferrer">tokyometro.jp</a>. For the airport legs,
            the{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={{ color: "var(--text)", fontWeight: 600 }}>Tokyo airport transfer guide</Link>{" "}
            compares Narita to Tokyo and Haneda to Tokyo by train, bus and taxi, and the{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus" style={{ color: "var(--text)", fontWeight: 600 }}>Airport Limousine Bus Tokyo</Link>{" "}
            page has every bus fare and timetable time; for the shinkansen and the JR Pass, the{" "}
            <Link href="/guides/transport" style={{ color: "var(--text)", fontWeight: 600 }}>Japan transportation guide</Link>{" "}
            has the nationwide fares; for a whole trip&apos;s numbers, see the{" "}
            <Link href="/guides/money/tokyo-trip-cost" style={{ color: "var(--text)", fontWeight: 600 }}>Tokyo trip cost</Link>{" "}
            breakdown.
          </p>
        </section>

        <EsimCtaTop />

        {/* Tokyo Network Basics */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Which Train Lines Will You Use in Tokyo?</h2>
          <p className={styles.bodyText}>
            Three networks: JR East, Tokyo Metro and Toei Subway. One IC card covers all three, so the only
            thing the split changes is the fare.
          </p>
          <div className={styles.whoForGrid}>
            {tokyoLines.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            The good news: you don&apos;t need to memorise all of this. An IC card works across all operators,
            and Google Maps handles routing automatically. Just tap in, follow the map, and tap out.
          </p>
        </section>

        {/* Yamanote Line */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Essential line</span>
          <h2 className={styles.sectionTitle}>Why Is the Yamanote Line the Most Useful Line?</h2>
          <p className={styles.bodyText}>
            The Yamanote Line is the green circular JR line that loops around central Tokyo. It&apos;s the single most
            useful line for tourists and connects almost every major destination in one continuous loop.
          </p>
          <p className={styles.bodyText}>
            Key stations on the Yamanote Line include: <strong>Shinjuku</strong> (shopping, nightlife),
            <strong> Shibuya</strong> (scramble crossing, fashion), <strong>Harajuku</strong> (Takeshita Street, Meiji Shrine),
            <strong> Ebisu &amp; Osaki</strong> (quieter dining), <strong>Shinagawa</strong> (shinkansen connections),
            <strong> Tokyo</strong> (Tokyo Station, Imperial Palace), <strong>Ueno</strong> (museums, zoo, Senso-ji nearby),
            <strong> Akihabara</strong> (electronics, anime), and <strong>Ikebukuro</strong> (shopping, Sunshine City).
          </p>
          <p className={styles.bodyText}>
            Because it&apos;s a loop, you can travel in either direction — just pick the direction with fewer stops.
            Trains run every 2–4 minutes during the day and every 5–10 minutes late at night. Last trains run around midnight;
            after that, a taxi or ride-share is your only option.
          </p>
        </section>

        {/* Metro & Toei */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Subway</span>
          <h2 className={styles.sectionTitle}>How Do Tokyo Metro and Toei Subway Differ?</h2>
          <p className={styles.bodyText}>
            Tokyo Metro operates 9 lines covering central and eastern Tokyo, including the Ginza Line (oldest subway
            in Asia), Hibiya Line, and Chiyoda Line. Toei Subway adds 4 more lines, including the Oedo Line which
            reaches Roppongi, Shinjuku, and Asakusa in a loop shape.
          </p>
          <p className={styles.bodyText}>
            The practical difference for visitors: Tokyo Metro and Toei are separate companies with separate fare
            tables, and the cheaper Tokyo Metro 24-hour Ticket does not cover the Toei lines. An IC card works out
            the fare on either automatically.
          </p>
          <p className={styles.bodyText}>
            The <strong>Tokyo Metro 24-hour Ticket (¥700 adult, ¥350 child)</strong> covers all 9 Metro lines unlimited
            for 24 hours from first use. Single Metro rides cost ¥178–¥324 on an IC card depending on distance, so it makes sense if
            you plan four or more Metro rides in that window — for example, a day visiting Asakusa, Ginza, Roppongi,
            and Omotesando. If your day also uses the Toei lines, the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket</Link> (24, 48 or 72 hours) covers
            both networks. Prices and fares from tokyometro.jp, checked {METRO_CHECKED}.
          </p>
        </section>

        {/* IC Card section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>IC cards</span>
          <h2 className={styles.sectionTitle}>Suica or PASMO: Which IC Card Do You Need in Tokyo?</h2>
          <p className={styles.bodyText}>
            <strong>Suica</strong> (issued by JR East) and <strong>Pasmo</strong> (issued by Tokyo Metro and private railways)
            are interchangeable for all practical purposes in Tokyo. Both work on every train, subway, bus, and in most
            convenience stores, vending machines, and some restaurants.
          </p>
          <p className={styles.bodyText}>
            The easiest way to get a Suica is through the <strong>Wallet app on iPhone</strong> — no physical card
            required. Alternatively, buy a physical Suica or Pasmo at any major station, or pre-order a Suica on Klook
            before you travel to have it ready to use when you land. Android phones bought outside Japan generally cannot
            run the mobile versions, and the no-deposit Welcome Suica and TOURIST PASMO expire after 28 days — our{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              IC cards in Japan guide
            </Link>{" "}
            compares Suica, PASMO and ICOCA with their deposits and refunds.
          </p>
          <div style={{ margin: "1.5rem 0" }}>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Pre-order Suica IC Card on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Key Routes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Key routes</span>
          <h2 className={styles.sectionTitle}>How Long and How Much Are the Main Tokyo Routes?</h2>
          <p className={styles.bodyText}>
            Under ¥260 on an IC card for each of these: the short JR hops on the Yamanote Line cost ¥155–¥199
            and Asakusa to Shibuya across the city on the Ginza Line ¥252.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "To", "Line", "Time", "Price (IC)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keyRoutes.map((row) => (
                    <tr key={`${row.from}-${row.to}`}>
                      <td className={styles.tdProvider}>{row.from}</td>
                      <td className={styles.tdProvider}>{row.to}</td>
                      <td className={styles.tdNetwork}>{row.line}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-faint)" }}>
            Adult IC fares for each trip&apos;s distance band; paper tickets cost ¥1–¥8 more. Times are typical
            journey times. Last checked: {LAST_CHECKED}; fares from the JR East and Tokyo Metro sources above.
          </p>
        </section>

        {/* Where to stay for easy transport */}
        <KlookStayAreas
          heading="Where to Stay So Getting Around Is Easy"
          intro="Tokyo is big enough that your hotel decides how much of your day you spend on trains. The rule of thumb is to sleep on the Yamanote loop, or one or two stops off it: anything on that circle reaches the rest of the city without a transfer. Three areas do that best."
          areas={tokyoStayAreas}
        />

        {/* Day Passes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day passes</span>
          <h2 className={styles.sectionTitle}>Is a Day Pass Worth It in Tokyo?</h2>
          <p className={styles.bodyText}>
            Rarely, unless the day is mostly subway. Pay as you go with an IC card for JR-heavy or light days; the
            72-hour Tokyo Subway Ticket is the one pass that often pays.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price", "Covers", "Worth It?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayPasses.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td className={styles.tdBestFor}>{row.covers}</td>
                      <td style={{ color: row.worth === "Rarely" ? "var(--accent)" : "var(--text)", fontWeight: 600 }}>{row.worth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Adult prices; children pay half. Tokyo Subway Ticket, Tokyo Metro 24-hour
            Ticket and Common One-day Ticket from{" "}
            <a href={METRO_PASSES} target="_blank" rel="noopener noreferrer">tokyometro.jp</a>; Tokyo Free Kippu
            (¥1,600 before 14 March 2026) from JR East&apos;s{" "}
            <a href={JR_PASSES} target="_blank" rel="noopener noreferrer">2026 price list</a>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For most tourists, pay-as-you-go with an IC card is cheaper and more flexible. Day passes only make
            financial sense on unusually busy days of sightseeing with many short journeys.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Is the Tokyo Subway Ticket worth it?
          </h3>
          <p className={styles.bodyText}>
            The Tokyo Subway Ticket is the pass most visitors actually consider: unlimited Tokyo Metro and Toei
            Subway rides for 24, 48 or 72 hours from first use at ¥1,000 / ¥1,500 / ¥2,000, but{" "}
            <strong>not JR lines</strong>, including the Yamanote Line. The ride-by-ride break-even, where to buy
            it and how the QR version works are in our{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket</Link> price and break-even guide.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Subway Ticket vs Suica / Pasmo
          </h3>
          <div className={styles.tableWrap} style={{ marginTop: "0.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your day", "Our pick", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subwayVsIcRows.map((row) => (
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Where to buy: online from Tokyo Metro&apos;s official sales page (standard or QR version), or from Klook,
            whose listing gives the collection or QR instructions for your date.
          </p>
          <div style={{ margin: "1.5rem 0" }}>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1267427&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1552-subway-ticket-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Buy Tokyo Subway Ticket on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>How Do You Avoid the Rush Hour and Other Train Mistakes?</h2>
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
            {/*
              Added 30 Oct 2026: the nationwide pass, whose price changed on 1 October. A reader
              arriving here is deciding between city transport, a regional pass and the national
              one, and this guide stopped short of the last of those.
            */}
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Cost 2026: New Prices &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 30 Oct 2026: the JR East pass for the day trips this city guide stops at. */}
            <Link href="/guides/transport/tokyo-wide-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Tokyo Wide Pass 2026: Price, Map &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-limousine-bus" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="12" rx="2" />
                  <path d="M2 11h20" />
                  <circle cx="7" cy="19" r="1.5" />
                  <circle cx="17" cy="19" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airport Limousine Bus Tokyo 2026: Fares, Times &amp; Booking</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket 2026: Price for 24, 48 or 72 Hours, and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Timed Itinerary, Cost and Tours</p>
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
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget 2026: Trip to Tokyo Japan Cost &amp; How Much Things Cost</p>
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
              Skip the queues at Tokyo Station. Get your Suica ready before you land and tap straight through
              the turnstile on arrival.
            </p>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Get Suica on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
