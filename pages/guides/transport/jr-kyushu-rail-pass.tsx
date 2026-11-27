import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  fukuokaStayAreas,
  klookEsim,
  jrKyushuPassTripPrep,
  jrKyushuRailPass,
  jrKyushuSameDayCards,
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
 * Re-read on 23 November 2026 (task-jtk-20261123-R06):
 *
 *   - railpass.html — same prices, area and seat rules as above; no 2026 revision notice.
 *     The newest revision linked from the page is english/pdf/price_revision2025.pdf
 *     (3 Feb 2025): from 1 April 2025 Northern 3/5 days ¥12,000/¥15,000 → ¥15,000/¥17,000,
 *     All Kyushu 3/5/7 days ¥20,000/¥22,500/¥25,000 → ¥22,000/¥24,000/¥26,000, Southern
 *     3 days ¥10,000 → ¥12,000. Kamome + relay limited express at Takeo-Onsen counts as one
 *     reservation. english/news lists no 2026 rail pass notice; no "20260409" price-revision
 *     PDF was found on jrkyushu.co.jp.
 *   - english/pdf/railpass_guidebook.pdf (dated 2026.4.1) — station/travel agency price vs
 *     JR KYUSHU RAIL PASS Online Booking price: All 3/5/7 days ¥22,000/¥21,000,
 *     ¥24,000/¥23,000, ¥26,000/¥25,000; Northern 3/5 days ¥15,000/¥14,000, ¥17,000/¥16,000;
 *     Southern 3 days ¥12,000/¥11,000. JR Kyushu Mobile Pass (Fukuoka and suburbs) 2 days
 *     ¥3,500. Hisatsu Line Yatsushiro–Yoshimatsu and Yoshimatsu–Hayato suspended (Apr 2026).
 *   - jrkyushu.co.jp/train/kyushu-de-ao/ and the 25 Sep 2026 news release — the 1 October
 *     2026 pass is a separate product, 旅して応援！「九州であおう」乗り放題パス: adult ¥23,000,
 *     child ¥3,000 (child only with an adult), 3 consecutive days, use 1 Oct – 24 Dec 2026
 *     (starts up to 22 Dec), sold 26 Sep – 21 Dec 2026 from 1 month ahead at 5:30 to the day
 *     before, only on JR九州インターネット列車予約. All JR Kyushu lines incl. Kyushu and Nishi
 *     Kyushu Shinkansen, ordinary-car unreserved seats only; all-reserved trains such as the
 *     Yufuin no Mori cannot be boarded on it alone; no Hakata–Kokura, no Hakata–Hakata-Minami.
 *     ¥1,000 per adult pass donated to Kumamoto Prefecture for earthquake recovery.
 *
 * Nothing here is first-hand, and no Klook price appears.
 * ---------------------------------------------------------------------------
 */

const CHECKED_ISO = "2026-11-23";
const CHECKED = checkedLabel(CHECKED_ISO);
const OFFICIAL = "https://www.jrkyushu.co.jp/english/railpass/railpass.html";
const GUIDEBOOK = "https://www.jrkyushu.co.jp/english/pdf/railpass_guidebook.pdf";
const REVISION_2025 = "https://www.jrkyushu.co.jp/english/pdf/price_revision2025.pdf";
const AOU_PASS = "https://www.jrkyushu.co.jp/train/kyushu-de-ao/";
const FARE_SOURCE = "https://www.jrkyushu.co.jp/railway/kaitei/pdf/241217_unchinkaitei_guidebook.pdf";

const TITLE = "JR Kyushu Rail Pass 2026: Prices, New Oct 1 Pass & Worth It?";
const DESCRIPTION =
  "JR Kyushu Rail Pass 2026: All Kyushu ¥22,000–¥26,000, Northern ¥15,000/¥17,000, Southern ¥12,000. The Oct 1 ¥23,000 pass, Yufuin no Mori seats, break-even.";

/** Table 1 — the three passes, JR Kyushu's own list. First row is the default pick. */
const priceRows = [
  {
    pass: "Northern Kyushu (Fukuoka, Yufuin, Nagasaki)",
    days: "3 days / 5 days",
    adult: "¥15,000 / ¥17,000",
    online: "¥14,000 / ¥16,000",
    child: "¥7,500 / ¥8,500",
    area: "Fukuoka, Saga, Nagasaki, Oita (Yufuin, Beppu) and Kumamoto; Kyushu Shinkansen Hakata–Kumamoto only",
  },
  {
    pass: "All Kyushu (Hakata ⇄ Kagoshima-Chuo)",
    days: "3 / 5 / 7 days",
    adult: "¥22,000 / ¥24,000 / ¥26,000",
    online: "¥21,000 / ¥23,000 / ¥25,000",
    child: "¥11,000 / ¥12,000 / ¥13,000",
    area: "Every JR Kyushu line, including Shimonoseki; the whole Kyushu Shinkansen Hakata–Kagoshima-Chuo",
  },
  {
    pass: "Southern Kyushu",
    days: "3 days",
    adult: "¥12,000",
    online: "¥11,000",
    child: "¥6,000",
    area: "Kumamoto, Oita, Miyazaki and Kagoshima south of Kumamoto and Oita; Kyushu Shinkansen Kumamoto–Kagoshima-Chuo only",
  },
];

/** Table — what changed. First row is the conclusion. */
const changeRows = [
  { pass: "2026: no new prices for the tourist pass", before: "—", after: "Unchanged since 1 April 2025", change: "New, separate ¥23,000 pass from 1 Oct 2026" },
  { pass: "Northern Kyushu 3 days", before: "¥12,000", after: "¥15,000", change: "+¥3,000" },
  { pass: "Northern Kyushu 5 days", before: "¥15,000", after: "¥17,000", change: "+¥2,000" },
  { pass: "All Kyushu 3 days", before: "¥20,000", after: "¥22,000", change: "+¥2,000" },
  { pass: "All Kyushu 5 days", before: "¥22,500", after: "¥24,000", change: "+¥1,500" },
  { pass: "All Kyushu 7 days", before: "¥25,000", after: "¥26,000", change: "+¥1,000" },
  { pass: "Southern Kyushu 3 days", before: "¥10,000", after: "¥12,000", change: "+¥2,000" },
];

/** Table — the 1 October 2026 pass against the 3-day All Kyushu pass. First row is the conclusion. */
const aouRows = [
  {
    item: "Verdict",
    aou: "Cheaper only with children: 1 adult + 1 child ¥26,000",
    krp: "Cheaper for adults (¥22,000 each), and the only one with free reserved seats; 1 adult + 1 child ¥33,000",
  },
  { item: "Adult / child", aou: "¥23,000 / ¥3,000 (child only with an adult)", krp: "¥22,000 / ¥11,000 (online booking ¥21,000)" },
  { item: "Days", aou: "3 consecutive days, used 1 Oct – 24 Dec 2026", krp: "3 consecutive days, all year" },
  { item: "Trains", aou: "All JR Kyushu lines incl. Kyushu and Nishi-Kyushu Shinkansen", krp: "All JR Kyushu lines incl. Kyushu and Nishi-Kyushu Shinkansen" },
  { item: "Seats", aou: "Unreserved ordinary cars only", krp: "Unreserved, plus unlimited free reserved seats" },
  { item: "Yufuin no Mori", aou: "✗ All-reserved train: needs a separate reserved-seat express ticket", krp: "✓ Free reserved seat" },
  { item: "Where sold", aou: "JR Kyushu Internet Train Reservation only, until 21 Dec 2026", krp: "Overseas agencies, JR Kyushu Rail Pass Online Booking, JR Kyushu stations" },
];

/** Table — free reserved seats. First row is the conclusion. */
const seatRows = [
  { pass: "All Kyushu", free: "Unlimited", after: "—", yufuin: "✓ Reserve as often as you like" },
  { pass: "Northern Kyushu", free: "Up to 6", after: "Express ticket per train", yufuin: "✓ Each Yufuin no Mori seat uses 1 of the 6" },
  { pass: "Southern Kyushu", free: "Up to 6", after: "Express ticket per train", yufuin: "✗ Not covered" },
  { pass: "Seats booked ahead on JR Kyushu Rail Pass Online Booking", free: "Not counted in the 6", after: "¥1,000 per section (¥1,500 on design & story trains)", yufuin: "Paid KRP Option Ticket" },
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
    a: "All Kyushu is ¥22,000 for 3 days, ¥24,000 for 5 and ¥26,000 for 7; Northern Kyushu ¥15,000 for 3 days and ¥17,000 for 5; Southern Kyushu ¥12,000 for 3 days (JR Kyushu, checked 23 November 2026; children 6–11 half). These prices have applied since 1 April 2025, and JR Kyushu's own Rail Pass Online Booking sells each one for ¥1,000 less. The ¥23,000 pass on sale from 1 October 2026 is a different, limited-time pass.",
  },
  {
    q: "Does the JR Kyushu Pass cover the Yufuin no Mori?",
    a: "Yes, the All Kyushu and Northern Kyushu passes cover it, the Southern pass does not. Every seat on the Yufuin no Mori is reserved, so book one: it is free and unlimited on All Kyushu, and uses one of the six free reservations on Northern Kyushu. The 1 October 2026 ¥23,000 pass is for unreserved seats only and cannot be used on the Yufuin no Mori by itself.",
  },
  {
    q: "Does the JR Kyushu Pass cover the Nishi-Kyushu Shinkansen?",
    a: "Yes. The All Kyushu and Northern Kyushu passes cover the Nishi-Kyushu Shinkansen Kamome from Takeo-Onsen to Nagasaki and the Relay Kamome from Hakata; the Southern pass does not. A Relay Kamome plus Kamome transfer at Takeo-Onsen counts as one seat reservation. No version covers the Sanyo Shinkansen between Hakata and Kokura.",
  },
  {
    q: "Northern vs All Kyushu: which one should I buy?",
    a: "Northern Kyushu (¥15,000 for 3 days) if the trip is Fukuoka with Yufuin, Beppu, Nagasaki or Kumamoto. All Kyushu (¥22,000 for 3 days) if you ride the shinkansen from Hakata to Kagoshima-Chuo or go to Miyazaki: a Hakata–Kagoshima-Chuo return alone is ¥23,900 on regular tickets.",
  },
  {
    q: "Is the JR Kyushu Pass worth it?",
    a: "With two or more long trips, yes. Hakata–Nagasaki and Hakata–Yufuin returns cost ¥25,240 at JR Kyushu's regular fares against ¥15,000 for the 3-day Northern pass. A single Nagasaki or Yufuin return (¥12,980 or ¥12,260) is cheaper on tickets, and cheaper still with JR Kyushu's online fares.",
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>JR Kyushu Rail Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            JR Kyushu Rail Pass 2026: <br />Prices, the New Oct 1 Pass &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            All Kyushu, Northern Kyushu and Southern Kyushu side by side, what changed in 2025 and 2026, and the
            break-even against JR Kyushu&apos;s own fares to Nagasaki, Yufuin and Kagoshima.
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
              The <strong>JR Kyushu Rail Pass</strong> costs <strong>¥22,000 / ¥24,000 / ¥26,000</strong> for 3 / 5 / 7
              days of All Kyushu, <strong>¥15,000 / ¥17,000</strong> for 3 / 5 days of Northern Kyushu and{" "}
              <strong>¥12,000</strong> for 3 days of Southern Kyushu — prices in force since 1 April 2025 and unchanged
              in 2026 (JR Kyushu, checked {CHECKED}; ¥1,000 less on JR Kyushu&apos;s own online booking). Buy All Kyushu
              if you ride Hakata ⇄ Kagoshima-Chuo, and Northern Kyushu if the trip is only Fukuoka, Yufuin and Nagasaki.
              The ¥23,000 pass that JR Kyushu launched for 1 October 2026 is a separate, limited-time pass for
              unreserved seats only, valid until 24 December 2026.
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

        {/* Same-day cards under the pass button (26 Nov 2026, task-jtk-20261126-P01):
            Hakata hotels and two Fukuoka day tours 6.5%, Klook eSIM 20%. */}
        <KlookSameDayCards
          heading="Book with the pass: a Hakata bed, the day trips, data"
          cards={jrKyushuSameDayCards}
        />

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the JR Kyushu Rail Pass in 2026?</h2>
          <p className={styles.bodyText}>
            ¥12,000 to ¥26,000 for an adult, depending on the area and the number of days. Most visitors flying into
            Fukuoka need the <strong>Northern Kyushu Rail Pass</strong>, at ¥15,000 for 3 days or ¥17,000 for 5; a
            Hakata ⇄ Kagoshima-Chuo shinkansen return needs <strong>All Kyushu</strong>, from ¥22,000.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Days", "Adult (station / agency)", "Adult (JR Kyushu online booking)", "Child (6–11)", "Area"].map((h) => (
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
                      <td style={{ fontSize: "0.88rem" }}>{row.online}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked: {CHECKED_ISO} on{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener" style={sourceLink}>
              JR Kyushu&apos;s rail pass page
            </a>{" "}
            ({OFFICIAL}) and the online booking prices in{" "}
            <a href={GUIDEBOOK} target="_blank" rel="noopener" style={sourceLink}>
              JR Kyushu&apos;s rail pass guidebook
            </a>{" "}
            (dated 1 April 2026). JR Kyushu also sells a 2-day JR Kyushu Mobile Pass for Fukuoka and its suburbs at
            ¥3,500.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKyushuRailPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              JR Kyushu Rail Pass on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Booking the same trip:</strong> a Yufuin and Beppu coach day or a Nagasaki day tour from Hakata
            replaces one pass day, and a Japan eSIM covers the train apps and seat bookings on the way.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <KlookLink href={yufuinBeppuNoMoriTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yufuin &amp; Beppu day tour from Fukuoka →
            </KlookLink>
            <KlookLink href={nagasakiSmallGroupDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nagasaki day tour from Hakata →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Klook Japan eSIM →
            </KlookLink>
          </div>
        </section>

        {/* What changed */}
        <section className={styles.comparisonSection} id="oct-2026-pass">
          <span className={styles.sectionLabel}>2025 and 2026 changes</span>
          <h2 className={styles.sectionTitle}>Did the JR Kyushu Rail Pass Change on 1 October 2026?</h2>
          <p className={styles.bodyText}>
            No. The tourist pass prices are the ones JR Kyushu set on <strong>1 April 2025</strong>, when every
            version rose by ¥1,000 to ¥3,000, and JR Kyushu&apos;s pass page lists no 2026 revision. What started on
            1 October 2026 is a separate pass, <strong>&ldquo;Kyushu de Aou&rdquo; (九州であおう)</strong>: ¥23,000 for 3
            days on every JR Kyushu line, unreserved seats only, sold until 21 December 2026.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass (adult)", "Before 1 Apr 2025", "Now", "Change"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {changeRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.before}</td>
                      <td className={styles.tdPrice}>{row.after}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            The 1 October 2026 pass against the 3-day All Kyushu Rail Pass:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Kyushu de Aou pass (1 Oct – 24 Dec 2026)", "All Kyushu Rail Pass, 3 days"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aouRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.aou}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.krp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked: {CHECKED_ISO} on{" "}
            <a href={REVISION_2025} target="_blank" rel="noopener" style={sourceLink}>
              JR Kyushu&apos;s notice of the April 2025 revision
            </a>{" "}
            ({REVISION_2025}) and{" "}
            <a href={AOU_PASS} target="_blank" rel="noopener" style={sourceLink}>
              JR Kyushu&apos;s Kyushu de Aou page
            </a>{" "}
            ({AOU_PASS}, Japanese). The Kyushu de Aou pass goes on sale one month before the first day at 5:30 and
            can be started up to 22 December 2026; JR Kyushu donates ¥1,000 per adult pass to Kumamoto Prefecture
            for earthquake recovery. It does not cover the Sanyo Shinkansen Hakata–Kokura or the Hakata-Minami Line.
          </p>
        </section>

        {/* Which pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which pass</span>
          <h2 className={styles.sectionTitle}>Northern vs All Kyushu: Which One?</h2>
          <p className={styles.bodyText}>
            <strong>Northern Kyushu</strong> (¥15,000 for 3 days) if your trip is Fukuoka plus Nagasaki, Yufuin, Beppu,
            Saga or Kumamoto; <strong>All Kyushu</strong> (¥22,000 for 3 days) as soon as Kagoshima-Chuo or Miyazaki is
            on the route — a Hakata ⇄ Kagoshima-Chuo return alone is ¥23,900 on regular tickets.
          </p>
          <p className={styles.bodyText}>
            In detail: <strong>Northern Kyushu</strong> if your trip is Fukuoka plus Nagasaki, Yufuin, Beppu, Saga or Kumamoto.{" "}
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
          <h2 className={styles.sectionTitle}>Is the JR Kyushu Pass Worth It?</h2>
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
            Last checked: {CHECKED_ISO} ({FARE_SOURCE}). Regular fares are worked from{" "}
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
            Last checked: {CHECKED_ISO} on{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener" style={sourceLink}>
              jrkyushu.co.jp
            </a>
            . JR Kyushu&apos;s April 2026 guidebook lists the Hisatsu Line between Yatsushiro and Yoshimatsu, and
            between Yoshimatsu and Hayato, as suspended after heavy rain. The Northern pass excludes the Nichirin, Ibusuki no Tamatebako, Umisachi Yamasachi and Kirishima limited
            expresses. Reservations made on JR Kyushu&apos;s rail pass online booking site do not count towards the
            six free ones; more cost ¥1,000 per section (¥1,500 on design and story trains).
          </p>
        </section>

        {/* Shinkansen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shinkansen</span>
          <h2 className={styles.sectionTitle}>Does It Cover the Nishi-Kyushu Shinkansen?</h2>
          <p className={styles.bodyText}>
            Yes, on the All Kyushu and Northern Kyushu passes: the Nishi-Kyushu Shinkansen Kamome from Takeo-Onsen to
            Nagasaki and the Relay Kamome limited express from Hakata to Takeo-Onsen are both covered, and a Relay
            Kamome plus Kamome booking counts as one seat reservation. The Southern pass does not cover it.
          </p>
          <p className={styles.bodyText}>
            On the Kyushu Shinkansen, All Kyushu covers Hakata to Kagoshima-Chuo end to end, Northern covers
            Hakata–Kumamoto and Southern covers Kumamoto–Kagoshima-Chuo only.
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
        <section className={styles.comparisonSection} id="seats">
          <span className={styles.sectionLabel}>Yufuin no Mori &amp; seats</span>
          <h2 className={styles.sectionTitle}>Does the JR Kyushu Pass Cover the Yufuin no Mori?</h2>
          <p className={styles.bodyText}>
            Yes — the All Kyushu and Northern Kyushu passes cover the Yufuin no Mori, the Southern pass does not. Every
            seat on it is reserved, so book one: free and unlimited on All Kyushu, one of six free reservations on
            Northern Kyushu. The ¥23,000 Kyushu de Aou pass of October–December 2026 cannot be used on the Yufuin no
            Mori without a separate reserved-seat express ticket.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Free reserved seats", "After the free ones", "Yufuin no Mori"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seatRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.free}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.after}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.yufuin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={muted}>
            Last checked: {CHECKED_ISO} on{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener" style={sourceLink}>
              JR Kyushu&apos;s rail pass page
            </a>{" "}
            ({OFFICIAL}). Free reservations are made at a JR Kyushu ticket office (Midori-no-madoguchi) or a
            reserved-seat ticket machine in Kyushu. The Yufuin no Mori is the train to book first: JR Kyushu puts its
            seats on sale one month ahead at 10:00 (read on JR Kyushu&apos;s site on 7 November 2026 for our Kyushu
            itinerary).
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
              Yufuin Beppu day trip from Fukuoka guide
            </Link>{" "}
            compares the routes. For a longer trip, the{" "}
            <Link href="/guides/attractions/kyushu-5-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              5-day Kyushu itinerary
            </Link>{" "}
            works the Northern pass sums day by day, and the{" "}
            <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              Fukuoka 2-day itinerary
            </Link>{" "}
            shows why two days in the city rarely need one. A rail pass does not cover the Fukuoka City Subway to
            Tojinmachi either, so for the museum by the dome see our{" "}
            <Link href="/guides/attractions/teamlab-fukuoka-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              teamLab Fukuoka tickets
            </Link>{" "}
            guide for the price, hours and the hour it takes.
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

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            In Nagasaki Prefecture, the two tickets worth booking before you go are <Link href="/guides/attractions/huis-ten-bosch-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Huis Ten Bosch</Link> and the <Link href="/guides/attractions/gunkanjima-tour" style={{ color: "var(--red)", fontWeight: 600 }}>Battleship Island landing tour</Link>.
          </p>
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
