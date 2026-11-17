import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  fukuokaStayAreas,
  jrKyushuPassTripPrep,
  jrKyushuRailPass,
  yufuinBeppuNoMoriTour,
  nagasakiSmallGroupDayTour,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * ---------------------------------------------------------------------------
 * /guides/transport/jr-kyushu-rail-pass — written 15 Nov 2026
 * (task-jtk-20261115-02)
 *
 * Next to its neighbours:
 *  - jr-pass-guide answers "is the nationwide pass worth it";
 *  - kyushu-5-day-itinerary and fukuoka-2-day-itinerary answer "what to do each day";
 *  - this page answers "which of the three Kyushu-only passes, and does it beat tickets".
 *
 * Sourcing, read on 15 November 2026:
 *
 *   - jrkyushu.co.jp/english/railpass/railpass.html — prices: All Kyushu 3/5/7 days
 *     ¥22,000 / ¥24,000 / ¥26,000 (child ¥11,000 / ¥12,000 / ¥13,000); Northern Kyushu
 *     3/5 days ¥15,000 / ¥17,000 (child ¥7,500 / ¥8,500); Southern Kyushu 3 days ¥12,000
 *     (child ¥6,000). Child 6–11. Consecutive days only. Kyushu Shinkansen: All Kyushu
 *     Hakata–Kagoshima-Chuo, Northern Hakata–Kumamoto only, Southern Kumamoto–
 *     Kagoshima-Chuo only. Nishi Kyushu Shinkansen (Kamome): All and Northern. Sanyo
 *     Shinkansen Hakata–Kokura: none. Free seat reservations: All unlimited, Northern and
 *     Southern up to 6 (online-booking reservations do not count). KRP Option Ticket
 *     ¥1,000 per section, ¥1,500 for D&S trains. Excluded: JR Kyushu buses, Seven Stars,
 *     Aru Ressha, Kanpachi/Ichiroku, subways, other companies. Refund before the first day
 *     with a 10% charge, none after. Eligibility: non-Japanese passport, temporary
 *     visitor, living outside Japan; purchaser only. The page notes different prices on
 *     JR Kyushu's own online booking site; those are not printed here.
 *   - jrkyushu.co.jp/railway/kaitei/pdf/241217_unchinkaitei_guidebook.pdf — JR Kyushu's
 *     guidebook to the 1 April 2025 fare revision. Each discount ticket is printed with
 *     its saving against the undiscounted fare plus reserved-seat charge (normal season),
 *     so the regular one-way fares are price + saving: Hakata–Kagoshima-Chuo ¥11,420 +
 *     ¥530 = ¥11,950 (also ¥11,200 + ¥750); Hakata–Nagasaki ¥4,500 + ¥1,990 = ¥6,490
 *     (also ¥3,850 + ¥2,640, ¥3,400 + ¥3,090); Hakata–Yufuin (Yufuin no Mori) ¥5,600 +
 *     ¥530 = ¥6,130; Hakata–Kumamoto ¥5,310 + ¥530 = ¥5,840 (also ¥3,900–¥4,800 with
 *     ¥1,940–¥1,040); Kumamoto–Kagoshima-Chuo ¥7,440 + ¥530 = ¥7,970.
 *
 * Nothing here is first-hand, and no Klook price appears.
 * ---------------------------------------------------------------------------
 */

const CHECKED_ISO = "2026-11-15";
const CHECKED = checkedLabel(CHECKED_ISO);
const OFFICIAL = "https://www.jrkyushu.co.jp/english/railpass/railpass.html";
const FARE_SOURCE = "https://www.jrkyushu.co.jp/railway/kaitei/pdf/241217_unchinkaitei_guidebook.pdf";

const TITLE = "JR Kyushu Rail Pass 2026: Price, Which Pass & Worth It?";
const DESCRIPTION =
  "JR Kyushu Rail Pass 2026: All Kyushu ¥22,000–¥26,000, Northern Kyushu Rail Pass ¥15,000 or ¥17,000, Southern ¥12,000. JR Kyushu Pass price vs real fares.";

/** Table 1 — the three passes, JR Kyushu's own list. First row is the default pick. */
const priceRows = [
  {
    pass: "Northern Kyushu (most Fukuoka trips)",
    days: "3 days / 5 days",
    adult: "¥15,000 / ¥17,000",
    child: "¥7,500 / ¥8,500",
    area: "Fukuoka, Saga, Nagasaki, Oita (Yufuin, Beppu) and Kumamoto; Kyushu Shinkansen Hakata–Kumamoto only",
  },
  {
    pass: "All Kyushu",
    days: "3 / 5 / 7 days",
    adult: "¥22,000 / ¥24,000 / ¥26,000",
    child: "¥11,000 / ¥12,000 / ¥13,000",
    area: "Every JR Kyushu line, including Shimonoseki; the whole Kyushu Shinkansen Hakata–Kagoshima-Chuo",
  },
  {
    pass: "Southern Kyushu",
    days: "3 days",
    adult: "¥12,000",
    child: "¥6,000",
    area: "Kumamoto, Oita, Miyazaki and Kagoshima south of Kumamoto and Oita; Kyushu Shinkansen Kumamoto–Kagoshima-Chuo only",
  },
];

/** Table 2 — JR Kyushu's regular one-way fares, the pass's competition. */
const fareRows = [
  { route: "Hakata → Kagoshima-Chuo (Kyushu Shinkansen)", regular: "¥11,950", ret: "¥23,900", online: "¥11,200 (Kyushu Net Hayatoku 7)" },
  { route: "Hakata → Nagasaki (Relay Kamome + Kamome)", regular: "¥6,490", ret: "¥12,980", online: "¥3,400 (Watashitachi mo Kamome Hayatoku 7)" },
  { route: "Hakata → Yufuin (Yufuin no Mori)", regular: "¥6,130", ret: "¥12,260", online: "¥5,600 (Kyushu Net Kippu)" },
  { route: "Hakata → Kumamoto (Kyushu Shinkansen)", regular: "¥5,840", ret: "¥11,680", online: "¥3,900–¥4,800 (Kyushu Net Hayatoku 7)" },
  { route: "Kumamoto → Kagoshima-Chuo (Kyushu Shinkansen)", regular: "¥7,970", ret: "¥15,940", online: "¥7,440 (Kyushu Net Kippu)" },
];

/** Table 3 — break-even on the trips people actually plan. First row is the conclusion. */
const worthRows = [
  {
    plan: "Hakata ⇄ Nagasaki and Hakata ⇄ Yufuin within 3–5 days",
    tickets: "¥25,240",
    pass: "Northern 3-day ¥15,000 (5-day ¥17,000)",
    verdict: "✓ Pass saves ¥8,240 or more",
  },
  {
    plan: "Hakata ⇄ Kagoshima-Chuo return",
    tickets: "¥23,900",
    pass: "All Kyushu 3-day ¥22,000",
    verdict: "✓ Pass saves ¥1,900",
  },
  {
    plan: "A week: Nagasaki, Yufuin and Kagoshima returns from Hakata",
    tickets: "¥49,140",
    pass: "All Kyushu 7-day ¥26,000",
    verdict: "✓ Pass saves ¥23,140",
  },
  {
    plan: "Kumamoto ⇄ Kagoshima-Chuo return",
    tickets: "¥15,940",
    pass: "Southern 3-day ¥12,000",
    verdict: "✓ Pass saves ¥3,940",
  },
  {
    plan: "Hakata ⇄ Nagasaki return only",
    tickets: "¥12,980",
    pass: "Northern 3-day ¥15,000",
    verdict: "✗ Tickets win by ¥2,020",
  },
  {
    plan: "Hakata ⇄ Yufuin return only",
    tickets: "¥12,260",
    pass: "Northern 3-day ¥15,000",
    verdict: "✗ Tickets win by ¥2,740",
  },
];

/** Table 4 — what each pass covers, as JR Kyushu lists it. */
const coverageRows = [
  {
    service: "Kyushu Shinkansen (Mizuho, Sakura, Tsubame)",
    all: "✓ Hakata–Kagoshima-Chuo",
    north: "△ Hakata–Kumamoto only",
    south: "△ Kumamoto–Kagoshima-Chuo only",
  },
  { service: "Nishi Kyushu Shinkansen (Kamome, to Nagasaki)", all: "✓", north: "✓", south: "✗" },
  { service: "Yufuin no Mori, Sonic and most limited expresses", all: "✓", north: "✓", south: "✗ (only a few, e.g. Aso Boy!, A-Train, Kyushu Odan Tokkyu)" },
  { service: "Free reserved seats", all: "Unlimited", north: "Up to 6", south: "Up to 6" },
  { service: "Sanyo Shinkansen Hakata–Kokura", all: "✗", north: "✗", south: "✗" },
  { service: "36+3 sightseeing train", all: "Green Car, extra charge", north: "Green Car, extra charge", south: "Green Car, extra charge" },
  { service: "Seven Stars, Aru Ressha, Kanpachi/Ichiroku", all: "✗", north: "✗", south: "✗" },
  { service: "JR Kyushu buses, Fukuoka subway, other railways", all: "✗", north: "✗", south: "✗" },
];

const faqItems = [
  {
    q: "How much is the JR Kyushu Rail Pass in 2026?",
    a: "JR Kyushu's own price list (checked 15 November 2026): All Kyushu ¥22,000 for 3 days, ¥24,000 for 5 and ¥26,000 for 7; Northern Kyushu ¥15,000 for 3 days and ¥17,000 for 5; Southern Kyushu ¥12,000 for 3 days. Children aged 6 to 11 pay half. JR Kyushu notes that its own online booking site has different prices.",
  },
  {
    q: "Which JR Kyushu pass should I buy?",
    a: "Northern Kyushu if the trip is Fukuoka with Nagasaki, Yufuin, Beppu or Kumamoto. All Kyushu if you ride the shinkansen from Hakata to Kagoshima-Chuo, or go to Miyazaki. Southern Kyushu only if you start in Kumamoto and stay south of it, because it does not cover Hakata at all.",
  },
  {
    q: "Is the JR Kyushu Rail Pass worth it?",
    a: "Only with two or more long trips. Hakata–Nagasaki and Hakata–Yufuin returns cost ¥25,240 at JR Kyushu's regular fares against ¥15,000 for the 3-day Northern pass. A single Nagasaki or Yufuin return (¥12,980 or ¥12,260) is cheaper on tickets, and cheaper still with JR Kyushu's online fares.",
  },
  {
    q: "Can I use the JR Kyushu Pass on the Shinkansen?",
    a: "Yes, within its area. All Kyushu covers the Kyushu Shinkansen from Hakata to Kagoshima-Chuo; Northern covers Hakata–Kumamoto and the Kamome to Nagasaki; Southern covers Kumamoto–Kagoshima-Chuo. No version covers the Sanyo Shinkansen between Hakata and Kokura, which is JR West.",
  },
  {
    q: "Are the days consecutive?",
    a: "Yes. JR Kyushu states the pass must be used on consecutive days. Before the first valid day you can get a refund less a 10% handling charge; from the first valid day there is no refund.",
  },
  {
    q: "How many seat reservations are included?",
    a: "All Kyushu includes unlimited free seat reservations. Northern and Southern Kyushu include up to six; reservations made on JR Kyushu's rail pass online booking site do not count towards the six. Beyond that, a KRP Option Ticket is ¥1,000 per section, or ¥1,500 on design and story trains.",
  },
  {
    q: "Is the Yufuin no Mori covered by the Northern Kyushu Rail Pass?",
    a: "Yes. JR Kyushu lists the Yufuin no Mori, the Sonic and the Kamome as covered by both the Northern and the All Kyushu pass, and not by the Southern pass. A reserved seat on the Northern pass uses one of its six free reservations unless you book it on JR Kyushu's rail pass online booking site.",
  },
  {
    q: "Who can buy the JR Kyushu Rail Pass?",
    a: "Non-Japanese passport holders visiting on a temporary visitor stay who live outside Japan. You need the passport on board, and the pass can only be used by the person who bought it.",
  },
  {
    q: "JR Kyushu Rail Pass or the national JR Pass?",
    a: "For a trip that stays in Kyushu, the regional pass: the Northern 5-day is ¥17,000. The nationwide JR Pass starts at ¥53,000 for 7 days and only makes sense if you also ride the shinkansen to and from Honshu — see our JR Pass guide.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/jr-kyushu-rail-pass") } });

export default function JrKyushuRailPassPage({ updated }: { updated: PageUpdated }) {
  const muted = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
  const sourceLink = { color: "var(--text)", fontWeight: 600 } as const;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/jr-kyushu-rail-pass" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/jr-kyushu-rail-pass" />
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "JR Kyushu Rail Pass",
                  item: "https://www.japan-travel-kit.com/guides/transport/jr-kyushu-rail-pass",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/jr-kyushu-rail-pass",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>JR Kyushu Rail Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            JR Kyushu Rail Pass (2026):<br />Price, Which Pass to Buy &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            All Kyushu, Northern Kyushu and Southern Kyushu side by side, priced against JR Kyushu&apos;s own fares
            from Hakata to Nagasaki, Yufuin and Kagoshima.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Official JR Kyushu figures", "Break-even on real routes"].map((t) => (
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
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Northern Kyushu 3 / 5 days</p>
                <p className={styles.verdictStatValue}>¥15,000 / ¥17,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>All Kyushu 3 / 5 / 7 days</p>
                <p className={styles.verdictStatValue}>¥22,000–¥26,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Southern Kyushu 3 days</p>
                <p className={styles.verdictStatValue}>¥12,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pays for itself</p>
                <p className={styles.verdictStatValue}>2+ long returns</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>JR Kyushu Rail Pass</strong> comes in three versions: <strong>All Kyushu</strong> at ¥22,000
              for 3 days, ¥24,000 for 5 and ¥26,000 for 7; <strong>Northern Kyushu</strong> at ¥15,000 for 3 days and
              ¥17,000 for 5; and <strong>Southern Kyushu</strong> at ¥12,000 for 3 days (JR Kyushu, checked {CHECKED};
              children 6–11 half). Take All Kyushu if you ride the shinkansen from Hakata to Kagoshima-Chuo, and
              Northern Kyushu for Fukuoka with Nagasaki, Yufuin or Beppu. It pays once you make two long trips:
              Hakata–Nagasaki and Hakata–Yufuin returns cost ¥25,240 on regular tickets against ¥15,000 for the 3-day
              Northern pass, but one Nagasaki return alone (¥12,980) is cheaper without it.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={jrKyushuRailPass.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                JR Kyushu Rail Pass on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the JR Kyushu Rail Pass in 2026?</h2>
          <p className={styles.bodyText}>
            ¥12,000 to ¥26,000 for an adult, depending on the area and the number of days. Most visitors flying into
            Fukuoka need the <strong>Northern Kyushu Rail Pass</strong>, at ¥15,000 for 3 days or ¥17,000 for 5.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Days", "Adult", "Child (6–11)", "Area"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.days}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked {CHECKED} on{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener" style={sourceLink}>
              JR Kyushu&apos;s rail pass page
            </a>
            . JR Kyushu notes that its own online booking site sells at different prices; those are not shown here.
            No 2026 price change is announced on that page.
          </p>
        </section>

        {/* Which pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which pass</span>
          <h2 className={styles.sectionTitle}>Which JR Kyushu Pass Should I Buy?</h2>
          <p className={styles.bodyText}>
            <strong>Northern Kyushu</strong> if your trip is Fukuoka plus Nagasaki, Yufuin, Beppu, Saga or Kumamoto.{" "}
            <strong>All Kyushu</strong> if Kagoshima or Miyazaki is on the route, or if you need 7 days.{" "}
            <strong>Southern Kyushu</strong> only if you start in Kumamoto or Kagoshima and stay south: it does not
            reach Hakata, and it covers only a few limited expresses.
          </p>
          <p className={styles.bodyText}>
            The line between the two smaller passes is Kumamoto. North of it — including the Kamome to Nagasaki and the
            Yufuin no Mori — is Northern. South of it — the shinkansen to Kagoshima-Chuo — is Southern. Riding Hakata
            to Kagoshima in one go needs All Kyushu.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the JR Kyushu Rail Pass Worth It?</h2>
          <p className={styles.bodyText}>
            Yes for two long returns in 3 to 5 days; no for a single day trip. The table below adds up JR Kyushu&apos;s
            regular fares (ticket plus reserved seat, normal season) for the trips most visitors plan.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Regular tickets", "Pass", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td className={styles.tdPrice}>{row.tickets}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            The one-way fares behind those sums, from Hakata unless stated:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journey (one way)", "Regular fare", "Return", "JR Kyushu online fare"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td className={styles.tdPrice}>{row.regular}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.ret}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.online}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked {CHECKED}. Regular fares are worked from{" "}
            <a href={FARE_SOURCE} target="_blank" rel="noopener" style={sourceLink}>
              JR Kyushu&apos;s guidebook to the April 2025 fare revision
            </a>
            , which prints each online ticket with its saving against the regular adult reserved-seat fare in the
            normal season. Online fares are limited in number and some must be booked 3 or 7 days ahead. Children
            pay half.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Before you pay,</strong> check two things that are not fares. JR Kyushu refunds an unused pass
            less 10% only before its first day, and the days run consecutively from that start — so fix the dates of
            your long trips first. And if one leg is a single day trip, JR Kyushu&apos;s own online tickets (from
            ¥3,400 to Nagasaki) can beat the pass outright.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKyushuRailPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the JR Kyushu Rail Pass →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book With a JR Kyushu Rail Pass"
          intro="The pass, a bed at Hakata, the one tour that can replace a pass day, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={jrKyushuPassTripPrep}
        />

        {/* Coverage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it covers</span>
          <h2 className={styles.sectionTitle}>Which Trains Can I Use With the JR Kyushu Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR Kyushu trains inside the pass area, including shinkansen and limited expresses in ordinary cars. The
            exclusions — the Hakata–Kokura shinkansen, the luxury sightseeing trains and every non-JR line — are what
            catch people out.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Train or service", "All Kyushu", "Northern", "Southern"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverageRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.all}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.north}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.south}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked {CHECKED} on{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener" style={sourceLink}>
              jrkyushu.co.jp
            </a>
            . The Northern pass excludes the Nichirin, Ibusuki no Tamatebako, Umisachi Yamasachi and Kirishima limited
            expresses. Reservations made on JR Kyushu&apos;s rail pass online booking site do not count towards the
            six free ones; more cost ¥1,000 per section (¥1,500 on design and story trains).
          </p>
        </section>

        {/* Shinkansen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shinkansen</span>
          <h2 className={styles.sectionTitle}>Can I Use the JR Kyushu Pass on the Shinkansen?</h2>
          <p className={styles.bodyText}>
            Yes, inside its area. All Kyushu covers the Kyushu Shinkansen end to end, Hakata to Kagoshima-Chuo, plus
            the Kamome to Nagasaki. Northern covers Hakata–Kumamoto and the Kamome. Southern covers Kumamoto–
            Kagoshima-Chuo only.
          </p>
          <p className={styles.bodyText}>
            No version covers the <strong>Sanyo Shinkansen between Hakata and Kokura</strong>, which belongs to JR
            West, so arriving from Osaka or Hiroshima by shinkansen means a separate ticket as far as Hakata. If most
            of your trip is on Honshu, compare the{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              nationwide JR Pass
            </Link>
            , which starts at ¥53,000 for 7 days.
          </p>
        </section>

        {/* Reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Seats</span>
          <h2 className={styles.sectionTitle}>Do I Need Seat Reservations With the JR Kyushu Pass?</h2>
          <p className={styles.bodyText}>
            Not for unreserved cars, but a reserved seat is worth having on the Yufuin no Mori and the Kamome. All Kyushu includes unlimited free reservations;
            Northern and Southern include six, and seats reserved through JR Kyushu&apos;s rail pass online booking
            site do not use them up. The Yufuin no Mori is the train to book first: JR Kyushu puts its seats on sale one
            month ahead at 10:00 (read on JR Kyushu&apos;s site on 7 November 2026 for our Kyushu itinerary).
          </p>
        </section>

        {/* Buying */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Do I Buy the JR Kyushu Rail Pass, and Who Can Use It?</h2>
          <p className={styles.bodyText}>
            JR Kyushu sells it on its rail pass online booking site, through overseas travel agencies — it names JTB,
            Nippon Travel Agency, JALPAK, KKday, Klook and Ctrip — and at JR Kyushu ticket offices (Midori-no-madoguchi)
            in Kyushu. It is for non-Japanese passport holders on a temporary visitor stay who live outside Japan. Carry
            the passport when you ride; only the buyer can use the pass.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKyushuRailPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              View the JR Kyushu Rail Pass →
            </KlookLink>
            <KlookLink href={fukuokaStayAreas[1].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hotels at Hakata Station →
            </KlookLink>
          </div>
        </section>

        {/* Tour vs pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tour or pass</span>
          <h2 className={styles.sectionTitle}>Pass or Day Tour for Yufuin and Nagasaki?</h2>
          <p className={styles.bodyText}>
            If Yufuin and Beppu are your only day out of Fukuoka, a coach day covers both towns and the Beppu hells in
            one booking, without a pass. Our{" "}
            <Link href="/guides/attractions/yufuin-beppu-tour-from-fukuoka" style={{ color: "var(--red)", fontWeight: 600 }}>
              Yufuin and Beppu tour guide
            </Link>{" "}
            compares the routes. For a longer trip, the{" "}
            <Link href="/guides/attractions/kyushu-5-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              5-day Kyushu itinerary
            </Link>{" "}
            works the Northern pass sums day by day, and the{" "}
            <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              Fukuoka 2-day itinerary
            </Link>{" "}
            shows why two days in the city rarely need one.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yufuinBeppuNoMoriTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Yufuin &amp; Beppu day tour →
            </KlookLink>
            <KlookLink href={nagasakiSmallGroupDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Nagasaki day tour →
            </KlookLink>
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

        <KlookTourPicks
          heading="What a Kyushu Rail Trip Books Next"
          intro="The pass covers the trains; these listings cover the days at the other end. Open a listing for the current price on your dates."
          tours={[jrKyushuRailPass, yufuinBeppuNoMoriTour, nagasakiSmallGroupDayTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5 Day Itinerary (2026): Fukuoka, Beppu, Kumamoto and Takachiho" },
              { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2 Day Itinerary (2026): Dazaifu, Yanagawa or Yufuin" },
              { href: "/guides/attractions/yufuin-beppu-tour-from-fukuoka", title: "Yufuin and Beppu Tour from Fukuoka (2026): Tours vs Train" },
              { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking" },
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Price 2026: 7, 14 & 21-Day Costs and Is It Worth It?" },
              { href: "/guides/transport/osaka-to-hiroshima-shinkansen", title: "Osaka to Hiroshima Shinkansen" },
              { href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass (2026): Price and Is It Worth It?" },
              { href: "/guides/transport", title: "More Transport Guides →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                    <path d="M12 7v10" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two long trips and the pass is ahead</h2>
            <p className={styles.ctaBannerDesc}>
              Nagasaki and Yufuin returns from Hakata are ¥25,240 on tickets — the Northern Kyushu Rail Pass is ¥15,000
              for 3 days.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrKyushuRailPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the JR Kyushu Rail Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
