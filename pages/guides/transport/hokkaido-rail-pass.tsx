import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  furanoBieiBluePondDayTour,
  japanWinterStayAreas,
  jrHokkaidoRailPass,
  klookEsim,
  newChitoseAirportTransfers,
  otaruSnowParkDayTour,
  sapporoFuranoAreaPass,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * ---------------------------------------------------------------------------
 * /guides/transport/hokkaido-rail-pass — written 3 Nov 2026
 *
 * Sourcing. Every yen figure is the operator's own, read on 3 November 2026:
 *
 *   - jrhokkaido.co.jp/global/english/ticket/railpass/ — read directly. The
 *     Hokkaido Rail Pass at ¥22,000 / ¥28,000 / ¥37,000 (5 / 7 / 10 consecutive
 *     days) bought in advance and ¥23,000 / ¥29,000 / ¥38,000 at a station in
 *     Hokkaido, child (6–11) ¥11,000 / ¥14,000 / ¥18,500 and ¥11,500 / ¥14,500 /
 *     ¥19,000; JR Hokkaido lines except the Hokkaido Shinkansen; some JR Hokkaido
 *     buses but not intercity or temporary ones; no South Hokkaido Railway,
 *     streetcar or subway; Green Car needs the limited express and Green charges;
 *     start date cannot be changed; all non-Japanese passport holders. The two
 *     4-day area passes on the same page: Sapporo–Furano ¥11,000 / ¥12,000
 *     (child ¥5,500 / ¥6,000), no Tomamu; Sapporo–Noboribetsu ¥10,000 / ¥11,000
 *     (child ¥5,000 / ¥5,500), no Toya.
 *   - jrhokkaido.co.jp/global/english/ticket/regular/ — read directly. One-way
 *     fares, reserved seat included on limited expresses: Sapporo–Hakodate
 *     ¥9,770, –Asahikawa ¥5,440, –Furano ¥5,440 (Furano Lavender Express, summer
 *     only), –Noboribetsu ¥4,890, –Toya ¥6,690, –Kushiro ¥10,320, –Abashiri
 *     ¥10,870, –Wakkanai ¥14,420; New Chitose Airport–Sapporo ¥1,230
 *     non-reserved; Sapporo–Otaru ¥800; Asahikawa–Furano ¥1,380, –Biei ¥680;
 *     Shin-Hakodate-Hokuto–Tokyo ¥23,760 on the Hokkaido Shinkansen.
 *   - jrhokkaido.co.jp/global/english/travel/model/furano.html — read directly.
 *     JR Hokkaido's own 4-day worked example: ¥29,270 at normal fares against
 *     the ¥11,000 Sapporo–Furano Area Pass; Asahikawa 1 hr 25 min on the
 *     Lilac/Kamui and Furano 2 hr on the seasonal Furano Lavender Express.
 *
 * Carried from our JR Pass guide: the national JAPAN RAIL PASS at ¥53,000 /
 * ¥84,000 / ¥105,000 after the 1 October 2026 revision.
 *
 * Deliberately absent: fares JR Hokkaido does not publish on those pages
 * (Sapporo–Biei direct, Hakodate–Toya and the like) are left out of the
 * arithmetic rather than guessed. The under-six rule is as Klook's listing
 * states it. Nothing here is first-hand, and no Klook price appears.
 * ---------------------------------------------------------------------------
 */

const CHECKED_ISO = "2026-11-03";
const CHECKED = checkedLabel(CHECKED_ISO);

const PASS_5 = "¥22,000";
const PASS_7 = "¥28,000";
const PASS_10 = "¥37,000";

const TITLE = "Hokkaido Rail Pass (2026): Price and Is It Worth It?";
const DESCRIPTION =
  "Hokkaido Rail Pass 2026: ¥22,000 for 5 days, ¥28,000 for 7, ¥37,000 for 10 bought in advance. What it covers, why no Shinkansen, and the trips it pays for.";

/** Table 1 — JR Hokkaido's own price list. */
const priceRows = [
  { type: "5 consecutive days", adultPre: PASS_5, adultStation: "¥23,000", childPre: "¥11,000", childStation: "¥11,500" },
  { type: "7 consecutive days", adultPre: PASS_7, adultStation: "¥29,000", childPre: "¥14,000", childStation: "¥14,500" },
  { type: "10 consecutive days", adultPre: PASS_10, adultStation: "¥38,000", childPre: "¥18,500", childStation: "¥19,000" },
];

/** Table 2 — what is on the pass. */
const coverageRows = [
  {
    service: "JR Hokkaido limited express, rapid and local trains",
    allowed: "✓ Included",
    note: "Reserved or non-reserved seats in ordinary cars. Every limited express seat is now reserved, so get a seat ticket issued before you board — it costs nothing extra.",
  },
  {
    service: "Rapid Airport (New Chitose Airport ⇄ Sapporo ⇄ Otaru)",
    allowed: "✓ Included",
    note: "The airport run is ¥1,230 each way in a non-reserved seat at normal fare, so the pass starts working the moment you land.",
  },
  {
    service: "Some JR Hokkaido buses",
    allowed: "△ Some routes",
    note: "JR Hokkaido lists the covered routes in a PDF; intercity and temporary buses are excluded.",
  },
  {
    service: "Hokkaido Shinkansen (Shin-Hakodate-Hokuto and south)",
    allowed: "✗ Not covered",
    note: "JR Hokkaido excludes it by name. Shin-Hakodate-Hokuto to Tokyo is a separate ¥23,760 ticket at normal fare.",
  },
  {
    service: "Green Car (first class)",
    allowed: "✗ Extra charge",
    note: "Pay the limited express charge plus the Green charge on top of the pass.",
  },
  {
    service: "Sapporo subway, streetcars, South Hokkaido Railway",
    allowed: "✗ Not covered",
    note: "The pass stops at JR gates. Inside Sapporo you still need a Kitaca/Suica card or a subway day ticket.",
  },
  {
    service: "SL Fuyu-no-Shitsugen (winter steam train)",
    allowed: "✗ Extra seat charge",
    note: "JR Hokkaido lists a separate reserved-seat charge for this one train.",
  },
];

/** Table 3 — normal fares the arithmetic is built from. All one way. */
const fareRows = [
  { journey: "New Chitose Airport → Sapporo (Rapid Airport, non-reserved)", fare: "¥1,230", note: "¥2,230 in the reserved uシート car." },
  { journey: "Sapporo → Otaru (Rapid Airport, non-reserved)", fare: "¥800", note: "¥1,800 reserved." },
  { journey: "Sapporo → Asahikawa (Ltd. Exp. Lilac / Kamui)", fare: "¥5,440", note: "1 hr 25 min on JR Hokkaido's model route." },
  { journey: "Sapporo → Furano (Furano Lavender Express)", fare: "¥5,440", note: "Summer only; about 2 hr. Asahikawa–Furano local is ¥1,380, Asahikawa–Biei ¥680." },
  { journey: "Sapporo → Noboribetsu (Ltd. Exp. Hokuto / Suzuran)", fare: "¥4,890", note: "Toya is ¥6,690." },
  { journey: "Sapporo → Hakodate (Ltd. Exp. Hokuto)", fare: "¥9,770", note: "The single journey that does most to pay for the pass." },
  { journey: "Sapporo → Kushiro (Ltd. Exp. Ozora)", fare: "¥10,320", note: "Obihiro is ¥8,120." },
  { journey: "Sapporo → Abashiri (Ltd. Exp. Okhotsk)", fare: "¥10,870", note: "For the drift-ice coast in winter." },
  { journey: "Sapporo → Wakkanai (Ltd. Exp. Soya)", fare: "¥14,420", note: "The northern tip — one way is already two-thirds of a 5-day pass." },
];

/** Table 4 — break-even on four real trip shapes. */
const worthRows = [
  {
    plan: "5 days: airport in and out, Hakodate return, Asahikawa return",
    normal: "¥32,880",
    pass: `${PASS_5} (5-day)`,
    verdict: "✓ Saves ¥10,880",
    why: "¥1,230 × 2 + ¥9,770 × 2 + ¥5,440 × 2. The Hakodate return alone is ¥19,540.",
  },
  {
    plan: "7 days: airport in and out, Hakodate return, Kushiro return, Asahikawa return",
    normal: "¥53,520",
    pass: `${PASS_7} (7-day)`,
    verdict: "✓ Saves ¥25,520",
    why: "Long east and south runs are where the island pass is unbeatable.",
  },
  {
    plan: "4 days from Sapporo: airport, Otaru, Furano and Biei, Asahikawa",
    normal: "¥29,270",
    pass: "¥11,000 (Sapporo–Furano Area Pass)",
    verdict: "Area pass wins",
    why: "JR Hokkaido's own worked example. The 5-day island pass would also pay, but the area pass costs half as much.",
  },
  {
    plan: "Sapporo base, airport plus one Otaru day",
    normal: "¥4,060",
    pass: `${PASS_5} (5-day)`,
    verdict: "✗ Skip it",
    why: "¥1,230 × 2 + ¥800 × 2. Pay as you go with an IC card.",
  },
];

/** Table 5 — the passes people confuse. */
const passRows = [
  {
    pass: "Hokkaido Rail Pass",
    price: `${PASS_5} / ${PASS_7} / ${PASS_10} (5 / 7 / 10 days)`,
    covers: "All JR Hokkaido lines except the Hokkaido Shinkansen, plus some JR Hokkaido buses",
    pick: "Trips that go beyond the Sapporo–Asahikawa line: Hakodate, Kushiro, Abashiri, Wakkanai",
  },
  {
    pass: "Sapporo–Furano Area Pass",
    price: "¥11,000 for 4 days",
    covers: "New Chitose Airport, Sapporo, Otaru, Asahikawa, Biei, Furano. Not Tomamu, not JR buses",
    pick: "A Sapporo base with Furano, Biei or Asahikawa days",
  },
  {
    pass: "Sapporo–Noboribetsu Area Pass",
    price: "¥10,000 for 4 days",
    covers: "New Chitose Airport, Sapporo, Otaru, Noboribetsu. Not Toya, not JR buses",
    pick: "A Sapporo base with a Noboribetsu onsen night",
  },
  {
    pass: "JAPAN RAIL PASS (nationwide)",
    price: "¥53,000 / ¥84,000 / ¥105,000 (7 / 14 / 21 days)",
    covers: "JR lines nationwide, including the Hokkaido Shinkansen",
    pick: "Only when you go overland from Honshu to Hokkaido inside the same trip",
  },
];

const buySteps = [
  {
    title: "Buy before you fly, or at the station in Hokkaido",
    desc: `Bought in advance — through the JR-EAST Train Reservation site, a travel agent outside Japan, or a reseller such as Klook — the pass is ¥1,000 cheaper than at the station (¥500 for children). JR Hokkaido also sells it at designated counters and passport-reader ticket machines at New Chitose Airport and Sapporo stations. Checked ${CHECKED}.`,
  },
  {
    title: "Collect it with your original passport",
    desc: "JR Hokkaido requires a valid passport; a residence card or a passport copy will not do. A voucher bought in advance is exchanged at a designated counter or machine — New Chitose Airport Station is the one most arrivals use.",
  },
  {
    title: "Choose the start date carefully — it cannot be changed",
    desc: "The 5, 7 or 10 days are consecutive from the start date you choose, and JR Hokkaido states that date cannot be changed. There is no flexible-day version.",
  },
  {
    title: "Get a seat ticket before each limited express",
    desc: "All limited express seats are reserved, and a reserved seat ticket is needed before boarding. It costs nothing extra on the pass; collect it at a ticket machine or counter.",
  },
];

const faqItems = [
  {
    q: "How much is the Hokkaido Rail Pass?",
    a: "Bought in advance, the Hokkaido Rail Pass is ¥22,000 for 5 consecutive days, ¥28,000 for 7 and ¥37,000 for 10 for an adult. Bought at a station in Hokkaido it is ¥1,000 more: ¥23,000, ¥29,000 and ¥38,000. Children aged 6 to 11 pay ¥11,000, ¥14,000 and ¥18,500 in advance. These are JR Hokkaido's own prices, checked on 3 November 2026.",
  },
  {
    q: "Is the Hokkaido Rail Pass worth it?",
    a: "Yes, if you travel beyond Sapporo. A Sapporo–Hakodate return is ¥19,540 at normal fares, and five days that add an Asahikawa return and the airport run come to ¥32,880 — ¥10,880 more than the ¥22,000 pass. No, if you stay on the Sapporo–Otaru–Furano–Asahikawa line: there the ¥11,000 Sapporo–Furano Area Pass is cheaper. JR Hokkaido's own example puts four such days at ¥29,270 in normal fares.",
  },
  {
    q: "Does the Hokkaido Rail Pass cover the Shinkansen?",
    a: "No. JR Hokkaido excludes the Hokkaido Shinkansen by name, so Shin-Hakodate-Hokuto to Shin-Aomori or Tokyo is a separate ticket — ¥23,760 to Tokyo at normal fare. The nationwide JAPAN RAIL PASS does cover the Hokkaido Shinkansen.",
  },
  {
    q: "Where do I buy and pick up the Hokkaido Rail Pass?",
    a: "Buy it in advance through JR-EAST Train Reservation, a travel agent outside Japan or a reseller such as Klook, or buy it at a station in Hokkaido for ¥1,000 more. Collect or buy it at designated counters or passport-reader ticket machines; JR Hokkaido names New Chitose Airport and Sapporo stations for the machines. Bring your original passport — a copy or residence card is not accepted.",
  },
  {
    q: "Hokkaido Rail Pass or Sapporo–Furano Area Pass?",
    a: "Take the ¥11,000 Sapporo–Furano Area Pass if every trip is on the line between New Chitose Airport, Sapporo, Otaru, Asahikawa, Biei and Furano within four days. Take the Hokkaido Rail Pass if Hakodate, Noboribetsu, Toya, Kushiro, Abashiri or Wakkanai are on the plan, or if you need more than four days.",
  },
  {
    q: "Is the Hokkaido Rail Pass consecutive or flexible?",
    a: "Consecutive. JR Hokkaido sells only 5, 7 and 10 consecutive-day versions, starting on the date you choose, and that start date cannot be changed afterwards.",
  },
  {
    q: "Does the Hokkaido Rail Pass include seat reservations?",
    a: "Yes, in ordinary cars at no extra charge. All limited express seats in Hokkaido are reserved, so you need a reserved seat ticket before boarding. Green Car seats cost the limited express charge plus the Green charge on top.",
  },
  {
    q: "Does it cover the Sapporo subway or buses?",
    a: "It does not cover the Sapporo subway, streetcars or the South Hokkaido Railway. Some JR Hokkaido bus routes are covered, but intercity and temporary buses are not. The two area passes cover no JR Hokkaido bus at all.",
  },
  {
    q: "Who can buy the Hokkaido Rail Pass, and do small children need one?",
    a: "JR Hokkaido sells it to all non-Japanese passport holders. Klook's listing adds that Japanese permanent residents are not eligible through Klook. Children aged 6 to 11 pay the child price; Klook's listing states children aged 0 to 5 travel free if they do not occupy a seat.",
  },
  {
    q: "Is the Hokkaido Rail Pass cheaper than the JR Pass?",
    a: "Much cheaper for a Hokkaido-only trip: ¥28,000 for 7 days against ¥53,000 for the nationwide 7-day JAPAN RAIL PASS since the 1 October 2026 revision. The JR Pass only makes sense if you also travel overland from Honshu, because it covers the Hokkaido Shinkansen.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/hokkaido-rail-pass") } });

export default function HokkaidoRailPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/hokkaido-rail-pass" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/hokkaido-rail-pass" />
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
                  name: "Hokkaido Rail Pass",
                  item: "https://www.japan-travel-kit.com/guides/transport/hokkaido-rail-pass",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/hokkaido-rail-pass",
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
          <span className={styles.breadCurrent}>Hokkaido Rail Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hokkaido Rail Pass (2026):<br />Price, What It Covers &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            JR Hokkaido&apos;s own island pass, priced against the fares it replaces — and against the two cheaper
            area passes that beat it on a Sapporo-based trip.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Official JR Hokkaido figures", "Break-even on real routes"].map((t) => (
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
                <p className={styles.verdictStatLabel}>5 / 7 / 10 days</p>
                <p className={styles.verdictStatValue}>{PASS_5} / {PASS_7} / {PASS_10}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bought at a station</p>
                <p className={styles.verdictStatValue}>¥1,000 more</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Limited expresses</p>
                <p className={styles.verdictStatValue}>Yes, seats included</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hokkaido Shinkansen</p>
                <p className={styles.verdictStatValue}>Not covered</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Hokkaido Rail Pass</strong> costs <strong>{PASS_5}</strong> for 5 consecutive days,{" "}
              <strong>{PASS_7}</strong> for 7 and <strong>{PASS_10}</strong> for 10 when bought in advance, or ¥23,000,
              ¥29,000 and ¥38,000 at a station in Hokkaido (children 6–11 half). It covers every JR Hokkaido limited
              express, rapid and local train — including the Rapid Airport from New Chitose — with reserved seats at no
              extra charge, plus some JR Hokkaido buses, but <strong>not the Hokkaido Shinkansen</strong> south of
              Shin-Hakodate-Hokuto, the Sapporo subway or Green Car seats. It pays for itself once Hakodate or the far
              east is on the plan: a Sapporo–Hakodate return alone is <strong>¥19,540</strong>, so five days with that,
              an Asahikawa return and the airport run cost ¥32,880 at normal fares. On a Sapporo-based trip limited to
              Otaru, Furano, Biei and Asahikawa, the <strong>¥11,000 Sapporo–Furano Area Pass</strong> is the better
              buy. Prices read off jrhokkaido.co.jp on {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={jrHokkaidoRailPass.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Hokkaido Rail Pass on Klook →
              </KlookLink>
              <KlookLink
                href={sapporoFuranoAreaPass.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Sapporo–Furano Area Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the Hokkaido Rail Pass?</h2>
          <p className={styles.bodyText}>
            {PASS_5}, {PASS_7} or {PASS_10} for an adult, depending on whether you need 5, 7 or 10 consecutive days.
            Buying before you arrive saves ¥1,000 per adult and ¥500 per child.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult, in advance", "Adult, at station", "Child (6–11), in advance", "Child, at station"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider}>{row.type}</td>
                      <td className={styles.tdPrice}>{row.adultPre}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adultStation}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.childPre}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.childStation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            JR Hokkaido&apos;s own price list, read on {CHECKED}. Sold all year. The under-six rule is as Klook&apos;s
            listing states it: children aged 0 to 5 travel free if they do not occupy a seat.
          </p>
        </section>

        {/* Coverage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it covers</span>
          <h2 className={styles.sectionTitle}>Which Trains Can I Use With the Hokkaido Rail Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Every JR Hokkaido line except the Hokkaido Shinkansen: limited express, rapid and local trains, in reserved
            or non-reserved ordinary-car seats. The exclusions are what usually decide the purchase.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Service", "On the pass?", "What that means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverageRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allowed}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Coverage read off JR Hokkaido&apos;s pass page on {CHECKED}. For the subway and IC cards the pass leaves
            out, see{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              IC cards in Japan
            </Link>
            .
          </p>
        </section>

        {/* Shinkansen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shinkansen</span>
          <h2 className={styles.sectionTitle}>Does the Hokkaido Rail Pass Cover the Shinkansen?</h2>
          <p className={styles.bodyText}>
            No. JR Hokkaido excludes the <strong>Hokkaido Shinkansen</strong> by name, so the line from
            Shin-Hakodate-Hokuto south through the Seikan Tunnel to Shin-Aomori and Tokyo is always a separate ticket —
            ¥23,760 one way from Shin-Hakodate-Hokuto to Tokyo at JR Hokkaido&apos;s own normal fare.
          </p>
          <p className={styles.bodyText}>
            If you are arriving overland from Tokyo, there are two ways to handle it: buy that one shinkansen leg and
            start the Hokkaido pass at Hakodate, or price a pass that crosses the strait. The nationwide{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              JAPAN RAIL PASS
            </Link>{" "}
            covers the Hokkaido Shinkansen, and our{" "}
            <Link href="/guides/transport/jr-east-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR East Pass guide
            </Link>{" "}
            covers the JR East side of the trip.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Hokkaido Rail Pass Worth It?</h2>
          <p className={styles.bodyText}>
            Add up the journeys you would buy anyway. Every fare below is JR Hokkaido&apos;s own one-way fare, with the
            limited express seat included. Short local legs JR Hokkaido does not list on its English fare page (for
            example Sapporo–Biei direct) are left out rather than guessed, which only makes the pass look slightly
            worse than it is.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journey (one way)", "Normal fare", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.journey}>
                      <td className={styles.tdProvider}>{row.journey}</td>
                      <td className={styles.tdPrice}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares read off JR Hokkaido&apos;s regular-ticket page on {CHECKED}. Children aged 6 to 11 pay half.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Normal fares", "Pass", "Verdict", "How it adds up"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td className={styles.tdPrice}>{row.normal}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The rule of thumb.</strong> One Sapporo–Hakodate return (¥19,540) gets you almost all the way to a
            5-day pass. One Kushiro, Abashiri or Wakkanai trip does the same. If your trip has neither, compare the area
            passes below before you buy.
          </p>
          <p className={styles.bodyText}>
            Before you pay, check two things on the listing, because neither is a fare: the{" "}
            <strong>cancellation terms</strong> (the start date cannot be changed once the pass is issued) and{" "}
            <strong>which station exchanges your voucher</strong> — a late landing at New Chitose can mean collecting
            the pass the next morning.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Hokkaido Rail Pass →
            </KlookLink>
            <KlookLink href={sapporoFuranoAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Compare the Sapporo–Furano Area Pass →
            </KlookLink>
          </div>
        </section>

        {/* Area pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Hokkaido Rail Pass or Sapporo–Furano Area Pass?</h2>
          <p className={styles.bodyText}>
            The Sapporo–Furano Area Pass is ¥11,000 for 4 days and covers New Chitose Airport, Sapporo, Otaru,
            Asahikawa, Biei and Furano. If every trip is on that line, it costs half the 5-day island pass. JR
            Hokkaido&apos;s own example — airport to Sapporo, a Furano and Biei day, an Asahikawa day, then Otaru and
            back to the airport — comes to ¥29,270 at normal fares.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price (adult, in advance)", "What it covers", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Hokkaido pass prices read off jrhokkaido.co.jp on {CHECKED}; the area passes are ¥1,000 more at a station
            and are sold or exchanged only at specific stations (New Chitose Airport, Sapporo, and Asahikawa or
            Noboribetsu). The JAPAN RAIL PASS prices are the overseas-agency prices since the 1 October 2026 revision,
            from our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>
            .
          </p>
        </section>

        {/* JR Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Should I Use the JR Pass in Hokkaido Instead?</h2>
          <p className={styles.bodyText}>
            Only if Hokkaido is one part of a longer rail trip. For travel inside Hokkaido, the 7-day Hokkaido Rail
            Pass is {PASS_7} against <strong>¥53,000</strong> for the nationwide 7-day JAPAN RAIL PASS. The JR Pass
            earns its price only when you also travel overland from Honshu, because the Hokkaido Shinkansen leg
            (¥23,760 one way from Shin-Hakodate-Hokuto to Tokyo) is included. If you fly into New Chitose, take the
            Hokkaido pass.
          </p>
        </section>

        {/* Buying */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Do I Buy and Pick Up the Hokkaido Rail Pass?</h2>
          <div className={styles.stepsList}>
            {buySteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Eligibility differs slightly by seller. <strong>JR Hokkaido</strong> sells the pass to all non-Japanese
            passport holders; <strong>Klook&apos;s listing</strong> adds that Japanese permanent residents are not
            eligible. If you live in Japan on a foreign passport, check this before you pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              View the Hokkaido Rail Pass →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Seat reservations, train delays and the voucher all live on your phone, so a working data connection from
            landing matters. Our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              best eSIM for Japan
            </Link>{" "}
            comparison ranks the options on verified prices.
          </p>
        </section>

        {/* Reservations and arrival */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Do I Need to Reserve Seats With the Hokkaido Rail Pass?</h2>
          <p className={styles.bodyText}>
            Yes, on limited expresses. JR Hokkaido states that all limited express seats are reserved and a reserved
            seat ticket is needed before boarding — free with the pass, issued at a ticket machine or counter. Rapid
            and local trains, including the Rapid Airport, need no reservation.
          </p>
          <p className={styles.bodyText}>
            For arrival with ski bags or a hotel the train does not reach, a booked transfer from New Chitose is the
            alternative to the Rapid Airport. Our{" "}
            <Link href="/guides/attractions/niseko-ski-tours" style={{ color: "var(--red)", fontWeight: 600 }}>
              Niseko ski guide
            </Link>{" "}
            compares the resort coaches.
          </p>
          <KlookLink
            href={newChitoseAirportTransfers.url}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-block" }}
          >
            Compare New Chitose airport transfers on Klook →
          </KlookLink>
        </section>

        {/* Day trips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trips</span>
          <h2 className={styles.sectionTitle}>Train or Tour for Furano, Biei and Otaru?</h2>
          <p className={styles.bodyText}>
            The pass gets you to Asahikawa, Biei and Furano stations, but the Blue Pond and the flower hills around Biei
            are a drive from the station. A coach day from Sapporo covers those stops in one booking. Otaru, by
            contrast, is ¥800 and a short ride on the Rapid Airport, and is easy without a tour — see our{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Otaru day trip guide
            </Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              7-day Hokkaido itinerary
            </Link>
            , which works the pass arithmetic day by day.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={furanoBieiBluePondDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Furano &amp; Biei Day Tour →
            </KlookLink>
            <KlookLink href={japanWinterStayAreas[6].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Hotels near Sapporo Station →
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
          heading="What a Hokkaido Rail Trip Books Next"
          intro="The pass covers the trains; these listings cover the days at the other end. Open a listing for the current price on your dates."
          tours={[jrHokkaidoRailPass, furanoBieiBluePondDayTour, otaruSnowParkDayTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 7 Nov 2026: the coach alternative to the Furano Line. */}
            <Link href="/guides/attractions/furano-biei-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Furano Biei Tour from Sapporo (2026): Winter vs Summer</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {[
              { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day" },
              { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo" },
              { href: "/guides/attractions/sapporo-snow-festival-tours", title: "Sapporo Snow Festival Tours" },
              { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours" },
              { href: "/guides/transport/jr-east-pass", title: "JR East Pass (2026): Price and Is It Worth It?" },
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Cost 2026: New Prices & Is It Worth It?" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
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
            <h2 className={styles.ctaBannerTitle}>One Hakodate return almost pays for it</h2>
            <p className={styles.ctaBannerDesc}>
              {PASS_5} for 5 days of JR Hokkaido trains, seats included. Staying between Sapporo and Furano? The ¥11,000
              area pass is the cheaper choice.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Hokkaido Rail Pass →
              </KlookLink>
              <KlookLink href={sapporoFuranoAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Sapporo–Furano Area Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
