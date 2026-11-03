import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  galaNaebaSkiDayTripTokyo,
  jrEastPass,
  jrTokyoWidePass,
  karuizawaShinkansenDayTrip,
  klookEsim,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * ---------------------------------------------------------------------------
 * /guides/transport/jr-east-pass — written 3 Nov 2026
 *
 * The one fact that shapes this page: JR East stopped selling the JR EAST PASS
 * (Tohoku area) and the JR EAST PASS (Nagano, Niigata area) on 13 March 2026 and
 * replaced both, from 14 March 2026, with a single JR EAST PASS for 5 or 10
 * consecutive days. Readers still search for the two area passes, so the page
 * answers that question directly rather than describing products that are gone.
 *
 * Sourcing, read on 3 November 2026. jreast.co.jp answers automated reads with
 * HTTP 403, so its pages were read through a jreast.co.jp-restricted search
 * index — the same fallback tokyo-wide-pass.tsx documents:
 *   - /en/multi/pass/eastpass.html: ¥35,000 (child ¥17,500) for 5 days and
 *     ¥50,000 (child ¥25,000) for 10 days, consecutive days from the day you
 *     choose; JR East lines including BRT, Tokyo Monorail, Aoimori Railway, IGR
 *     Iwate Galaxy Railway, Sendai Airport Transit, Sanriku Railway, Hokuetsu
 *     Express and Echigo Tokimeki Railway (Naoetsu–Arai).
 *   - /e/press/pdf/0128_pass_en.pdf (28 Jan 2026): the new pass from 14 March
 *     2026, reserved seats in ordinary cars of limited express (shinkansen
 *     included), express and local trains, non-Japanese passport holders, and the
 *     end of sales of both area passes on 13 March 2026.
 *   - JR East's own worked example on its pass page: Narita Express plus the
 *     Tohoku Shinkansen to Aomori via Sendai in reserved ordinary seats at about
 *     ¥52,000 bought separately, against the ¥35,000 5-day pass.
 * The Hokuriku Shinkansen limit at Joetsumyoko (the end of the JR East-operated
 * section) is stated by japan-guide, KKday and NAVITIME's pass guides as well
 * as JR East's 2020 pass release for the same section; the official map could
 * not be opened, so the page frames it as "the JR East section".
 *
 * Carried from our own pages with their dates: the JR TOKYO Wide Pass ¥16,000
 * and the N'EX ¥3,140 single (tokyo-wide-pass, 30 Oct 2026), the Hokuriku Arch
 * Pass ¥35,000 (tokyo-to-kanazawa, 26 Oct 2026) and the JAPAN RAIL PASS
 * ¥53,000 / ¥84,000 / ¥105,000 after 1 Oct 2026 (jr-pass-guide).
 *
 * Deliberately absent: Tokyo–Sendai, Tokyo–Nagano and Tokyo–Echigo-Yuzawa
 * single fares. JR East publishes no readable English fare table for them, so
 * the arithmetic uses JR East's own worked example instead of a guessed fare.
 * No Klook price appears; Klook's listing 1418 was confirmed through the
 * www.klook.com search index on 3 Nov 2026.
 * ---------------------------------------------------------------------------
 */

const CHECKED_ISO = "2026-11-03";
const CHECKED = checkedLabel(CHECKED_ISO);
const WIDE_CHECKED = checkedLabel("2026-10-30");
const ARCH_CHECKED = checkedLabel("2026-10-26");

const PASS_5 = "¥35,000";
const PASS_10 = "¥50,000";
const MODEL_ROUTE = "¥52,000";

const TITLE = "JR East Pass (2026): Price, Coverage and Is It Worth It?";
const DESCRIPTION =
  "JR East Pass 2026: ¥35,000 for 5 days or ¥50,000 for 10, one pass for Tohoku and Nagano-Niigata since March 2026. Shinkansen covered, Kanazawa not.";

const priceRows = [
  { item: "5 consecutive days", adult: PASS_5, child: "¥17,500", note: "Starting on the day you choose." },
  { item: "10 consecutive days", adult: PASS_10, child: "¥25,000", note: "Only ¥15,000 more than the 5-day pass." },
  {
    item: "Children 0 to 5",
    adult: "—",
    child: "Free",
    note: "Klook's listing states under-sixes ride free if they do not occupy a seat.",
  },
  {
    item: "Who can buy it",
    adult: "Non-Japanese passport holders",
    child: "—",
    note: "JR East sells it only to holders of a non-Japanese passport; bring the original to collect it.",
  },
];

/** The withdrawn passes against the current one. */
const areaRows = [
  {
    pass: "JR EAST PASS (Tohoku area)",
    status: "✗ Sales ended 13 March 2026",
    covered: "Tohoku, Akita, Yamagata shinkansen and JR East's northern lines",
    now: "Covered by the single JR EAST PASS",
  },
  {
    pass: "JR EAST PASS (Nagano, Niigata area)",
    status: "✗ Sales ended 13 March 2026",
    covered: "Joetsu Shinkansen, Hokuriku Shinkansen to Joetsumyoko, Nagano and Niigata lines",
    now: "Covered by the single JR EAST PASS",
  },
  {
    pass: "JR EAST PASS (current)",
    status: "✓ On sale since 14 March 2026",
    covered: "Every JR East line, both former areas, plus the partner railways below",
    now: `${PASS_5} for 5 days or ${PASS_10} for 10, consecutive`,
  },
];

const coverageRows = [
  {
    service: "Tohoku, Akita, Yamagata and Joetsu shinkansen",
    allowed: "✓ Included",
    note: "Reserved or non-reserved ordinary-car seats on JR East's shinkansen, so Sendai, Morioka, Aomori, Akita, Yamagata and Niigata are all on the pass.",
  },
  {
    service: "Hokuriku Shinkansen, Tokyo – Joetsumyoko",
    allowed: "✓ JR East section only",
    note: "Karuizawa and Nagano are covered. Beyond Joetsumyoko the line is operated by JR West, so Toyama and Kanazawa are not.",
  },
  {
    service: "JR East limited express, express, rapid and local trains (including BRT)",
    allowed: "✓ Included",
    note: "Including the Narita Express from Narita Airport.",
  },
  {
    service: "Tokyo Monorail, Aoimori, IGR Iwate Galaxy, Sendai Airport Transit, Sanriku, Hokuetsu Express, Echigo Tokimeki (Naoetsu–Arai)",
    allowed: "✓ Included",
    note: "The partner railways JR East lists for this pass.",
  },
  {
    service: "Hokkaido Shinkansen (Shin-Aomori – Shin-Hakodate-Hokuto)",
    allowed: "✗ Not covered",
    note: "Operated by JR Hokkaido. JR East sells a separate JR East–South Hokkaido Rail Pass for that.",
  },
  {
    service: "Tokaido Shinkansen (Tokyo – Kyoto – Osaka)",
    allowed: "✗ Not covered",
    note: "Operated by JR Central. No JR East pass covers it.",
  },
  {
    service: "Green Car and GranClass",
    allowed: "✗ Extra charge",
    note: "The pass covers ordinary cars only.",
  },
  {
    service: "Tokyo Metro, Toei subway, city buses",
    allowed: "✗ Not covered",
    note: "Use an IC card for city travel.",
  },
];

const fareRows = [
  {
    journey: "JR East's own example: Narita Express + Tohoku Shinkansen to Aomori via Sendai, reserved",
    fare: `About ${MODEL_ROUTE}`,
    source: `JR East, checked ${CHECKED}`,
    note: `Against ${PASS_5} for the 5-day pass — about ¥17,000 saved.`,
  },
  {
    journey: "Narita Airport → Tokyo, N'EX single",
    fare: "¥3,140",
    source: `JR East, read ${WIDE_CHECKED}`,
    note: "On the pass if the airport run falls inside your pass days.",
  },
  {
    journey: "Tokyo ⇄ Sendai, Nagano or Echigo-Yuzawa singles",
    fare: "Not printed",
    source: "—",
    note: "JR East publishes no readable English fare table for these routes, so they are left out rather than guessed. Check them on JR East's route search for your own dates.",
  },
];

const worthRows = [
  {
    plan: "Tokyo → Sendai → Aomori and back over 5 days",
    verdict: "✓ Buy it",
    why: `JR East's own example prices the northbound half alone at about ${MODEL_ROUTE} against ${PASS_5}.`,
  },
  {
    plan: "Tokyo plus a Tohoku loop and a Niigata or Nagano leg in 10 days",
    verdict: "✓ Buy the 10-day",
    why: `${PASS_10} covers both former areas; before March 2026 this needed two separate passes.`,
  },
  {
    plan: "Tokyo with day trips to Nikko, Karuizawa or GALA Yuzawa only",
    verdict: "✗ Wrong pass",
    why: "The ¥16,000 3-day JR TOKYO Wide Pass covers those day trips for less than half the price.",
  },
  {
    plan: "Tokyo to Kanazawa",
    verdict: "✗ Wrong pass",
    why: "The pass stops at Joetsumyoko. The Hokuriku Arch Pass (¥35,000) covers Tokyo–Kanazawa–Osaka.",
  },
  {
    plan: "Tokyo plus Kyoto and Osaka",
    verdict: "✗ Wrong pass",
    why: "The Tokaido Shinkansen is not on it. Price the nationwide JR Pass or buy that leg separately.",
  },
];

const passRows = [
  {
    pass: "JR EAST PASS",
    price: `${PASS_5} (5 days) / ${PASS_10} (10 days)`,
    covers: "All JR East lines incl. Tohoku, Joetsu, Akita, Yamagata shinkansen and Hokuriku to Joetsumyoko",
    pick: "Tohoku, Niigata or Nagano beyond a day trip from Tokyo",
  },
  {
    pass: "JR TOKYO Wide Pass",
    price: "¥16,000 (3 days)",
    covers: "JR East around Kanto, plus Fujikyu to Kawaguchiko, Karuizawa and GALA Yuzawa",
    pick: "A Tokyo base with two or three day trips",
  },
  {
    pass: "Hokuriku Arch Pass",
    price: "¥35,000 (7 days)",
    covers: "Tokyo–Kanazawa–Osaka via the Hokuriku Shinkansen",
    pick: "Tokyo to Kanazawa and on to Kansai",
  },
  {
    pass: "JAPAN RAIL PASS (nationwide)",
    price: "¥53,000 / ¥84,000 / ¥105,000 (7 / 14 / 21 days)",
    covers: "JR nationwide incl. Tokaido and Hokkaido shinkansen (not Nozomi/Mizuho without supplement)",
    pick: "A trip that covers both eastern and western Japan",
  },
];

const buySteps = [
  {
    title: "Buy online before you fly",
    desc: `Through JR East's JR-EAST Train Reservation site or a reseller such as Klook, whose voucher is exchanged at a major JR East station. Checked ${CHECKED}.`,
  },
  {
    title: "Collect it with your original passport",
    desc: "At a JR East Travel Service Center or a reserved-seat ticket machine with a passport reader. A photocopy is not accepted.",
  },
  {
    title: "Pick consecutive days",
    desc: "The 5 or 10 days run back to back from the start date. There is no flexible version any more — the old area passes' 'any 5 days in 14' option ended with them.",
  },
  {
    title: "Reserve seats before boarding",
    desc: "Reserved ordinary-car seats are included. Get the seat ticket at a machine or JR ticket office before you board, especially for all-reserved trains such as the Hayabusa.",
  },
];

const faqItems = [
  {
    q: "How much is the JR East Pass?",
    a: "The JR EAST PASS costs ¥35,000 for 5 consecutive days (child ¥17,500) or ¥50,000 for 10 consecutive days (child ¥25,000). These are JR East's prices since 14 March 2026, checked on 3 November 2026.",
  },
  {
    q: "Which JR East Pass should I buy, Tohoku or Nagano-Niigata?",
    a: "Neither exists any more. JR East ended sales of the Tohoku-area and Nagano/Niigata-area passes on 13 March 2026 and replaced both with one JR EAST PASS that covers every JR East line. Choose between the 5-day (¥35,000) and 10-day (¥50,000) versions instead.",
  },
  {
    q: "Is the JR East Pass worth it?",
    a: "Yes for long trips north of Tokyo. JR East's own example — the Narita Express plus the Tohoku Shinkansen to Aomori via Sendai in reserved seats — costs about ¥52,000 bought separately, against ¥35,000 for the 5-day pass. For day trips from Tokyo only, the ¥16,000 JR TOKYO Wide Pass is cheaper.",
  },
  {
    q: "Does the JR East Pass cover the Hokuriku Shinkansen to Kanazawa?",
    a: "No. It covers the Hokuriku Shinkansen only on JR East's section, from Tokyo to Joetsumyoko, so Karuizawa and Nagano are on it but Toyama and Kanazawa are not. For Kanazawa, look at the Hokuriku Arch Pass (¥35,000) or buy the ticket separately.",
  },
  {
    q: "Can I reserve seats with the JR East Pass?",
    a: "Yes, reserved seats in ordinary cars are included at no extra charge. Get the seat ticket at a reserved-seat ticket machine or JR ticket office before boarding. Green Car and GranClass seats cost extra.",
  },
  {
    q: "Is the JR East Pass consecutive or flexible?",
    a: "Consecutive. The current pass runs for 5 or 10 days in a row from the start date you choose. The flexible 'any 5 days within 14' format belonged to the old area passes, which ended in March 2026.",
  },
  {
    q: "What is the difference between the JR East Pass and the Tokyo Wide Pass?",
    a: "The JR TOKYO Wide Pass is ¥16,000 for 3 days around the Kanto area, including Kawaguchiko, Nikko, Karuizawa and GALA Yuzawa. The JR EAST PASS is ¥35,000 for 5 days and covers all of JR East, including Sendai, Aomori, Akita, Yamagata, Niigata and Nagano.",
  },
  {
    q: "Does the JR East Pass cover the Narita Express and the Tokyo Monorail?",
    a: "Yes. The Narita Express is a JR East train, and the Tokyo Monorail to Haneda is one of the partner railways on the pass.",
  },
  {
    q: "Does the JR East Pass get me to Hokkaido?",
    a: "No. The Hokkaido Shinkansen beyond Shin-Aomori is operated by JR Hokkaido. JR East sells a separate JR East–South Hokkaido Rail Pass for that route, and once in Hokkaido the Hokkaido Rail Pass covers the island.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/jr-east-pass") } });

export default function JrEastPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/jr-east-pass" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/jr-east-pass" />
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
                  name: "JR East Pass",
                  item: "https://www.japan-travel-kit.com/guides/transport/jr-east-pass",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/jr-east-pass",
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
          <span className={styles.breadCurrent}>JR East Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            JR East Pass (2026):<br />Price, Coverage &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            One pass for all of eastern Japan since March 2026 — what JR East charges, where it stops, and when the
            Tokyo Wide Pass or JR Pass is the better buy.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Official JR East figures", "Old area passes explained"].map((t) => (
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
                <p className={styles.verdictStatLabel}>5 days (adult)</p>
                <p className={styles.verdictStatValue}>{PASS_5}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>10 days (adult)</p>
                <p className={styles.verdictStatValue}>{PASS_10}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Days</p>
                <p className={styles.verdictStatValue}>Consecutive</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kanazawa</p>
                <p className={styles.verdictStatValue}>Not covered</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>JR East Pass</strong> (JR EAST PASS) costs <strong>{PASS_5}</strong> for 5 consecutive days
              or <strong>{PASS_10}</strong> for 10 (children ¥17,500 and ¥25,000). Since 14 March 2026 it is a single
              pass: the old <strong>Tohoku-area and Nagano/Niigata-area passes stopped being sold on 13 March 2026</strong>,
              and the 5-day flexible format went with them. It covers every JR East line in ordinary-car reserved or
              non-reserved seats — the <strong>Tohoku, Akita, Yamagata and Joetsu shinkansen</strong> and the{" "}
              <strong>Hokuriku Shinkansen as far as Joetsumyoko</strong> (so Karuizawa and Nagano, not Kanazawa) —
              plus the Narita Express, Tokyo Monorail and six partner railways. It does not cover the Tokaido or Hokkaido
              shinkansen. JR East&apos;s own example, the N&apos;EX plus the Tohoku Shinkansen to Aomori via Sendai,
              costs about <strong>{MODEL_ROUTE}</strong> bought separately. For Tokyo day trips only, the ¥16,000
              3-day <strong>JR TOKYO Wide Pass</strong> is cheaper; for a Japan-wide trip, the ¥53,000 7-day JR Pass.
              Checked {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={jrEastPass.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                JR East Pass on Klook →
              </KlookLink>
              <KlookLink
                href={jrTokyoWidePass.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                JR Tokyo Wide Pass Instead →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the JR East Pass?</h2>
          <p className={styles.bodyText}>
            {PASS_5} for 5 consecutive days or {PASS_10} for 10. Children aged 6 to 11 pay half.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child (6–11)", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            JR East&apos;s pass page and its 28 January 2026 press release, read on {CHECKED}. The under-six rule is
            as Klook&apos;s listing states it.
          </p>
        </section>

        {/* Area passes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tohoku or Nagano-Niigata?</span>
          <h2 className={styles.sectionTitle}>Which JR East Pass Should I Buy, Tohoku or Nagano-Niigata?</h2>
          <p className={styles.bodyText}>
            Neither — both are gone. JR East ended sales of the two area passes on 13 March 2026 and replaced them the
            next day with one JR EAST PASS that covers both former areas. Older guides that compare the two are
            describing passes you can no longer buy.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Status", "Area", "Today"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.status}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covered}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.now}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            So the real choice is <strong>5 or 10 days</strong>. Take the 5-day pass for one region (a Tohoku loop, or
            Niigata and Nagano). Take the 10-day pass if you want both, or a slower trip — it is only ¥15,000 more.
          </p>
        </section>

        {/* Coverage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it covers</span>
          <h2 className={styles.sectionTitle}>What Does the JR East Pass Cover?</h2>
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
            Lines and partner railways as JR East lists them, read on {CHECKED}. Check the boundary stations on JR
            East&apos;s official map if your trip goes near the edge.
          </p>
        </section>

        {/* Hokuriku */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kanazawa</span>
          <h2 className={styles.sectionTitle}>Does the JR East Pass Cover the Hokuriku Shinkansen to Kanazawa?</h2>
          <p className={styles.bodyText}>
            Only part of the way. JR East operates the Hokuriku Shinkansen from Tokyo to <strong>Joetsumyoko</strong>,
            and that is the section on the pass — enough for <strong>Karuizawa</strong> and <strong>Nagano</strong>.
            From Joetsumyoko on to Toyama and <strong>Kanazawa</strong> the line belongs to JR West and is not covered.
          </p>
          <p className={styles.bodyText}>
            For Kanazawa, the Hokuriku Arch Pass (¥35,000, read {ARCH_CHECKED}) covers Tokyo–Kanazawa–Osaka. Our{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Kanazawa guide
            </Link>{" "}
            compares it with single tickets.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the JR East Pass Worth It?</h2>
          <p className={styles.bodyText}>
            On a long trip north, clearly yes. JR East&apos;s own worked example — the Narita Express plus the Tohoku
            Shinkansen to Aomori via Sendai, in reserved seats — costs about {MODEL_ROUTE} bought separately against{" "}
            {PASS_5} for the 5-day pass. Single fares for Tokyo–Sendai, Tokyo–Nagano and Tokyo–Echigo-Yuzawa are not
            printed here, because JR East publishes no readable English fare table for them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journey", "Normal fare", "Source", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.journey}>
                      <td className={styles.tdProvider}>{row.journey}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Verdict", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things to check on the listing before you pay: the <strong>cancellation terms</strong>, and{" "}
            <strong>which station exchanges the voucher</strong>. Ski-season shinkansen and autumn-foliage weekends in
            Tohoku fill early, so reserve seats as soon as you have the pass.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the JR East Pass →
            </KlookLink>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Compare the Tokyo Wide Pass →
            </KlookLink>
          </div>
        </section>

        {/* Pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>JR East Pass vs Tokyo Wide Pass vs the JR Pass</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price (adult)", "What it covers", "When to pick it"].map((h) => (
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
            JR EAST PASS read {CHECKED}; Tokyo Wide Pass from our{" "}
            <Link href="/guides/transport/tokyo-wide-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo Wide Pass guide
            </Link>{" "}
            ({WIDE_CHECKED}); JAPAN RAIL PASS overseas-agency prices since 1 October 2026 from our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>
            .
          </p>
        </section>

        {/* Buying */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Do I Buy and Pick Up the JR East Pass?</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              View the JR East Pass →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Seat reservations and the voucher are on your phone, so working data from landing matters. See our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              best eSIM for Japan
            </Link>{" "}
            comparison.
          </p>
        </section>

        {/* Seats */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Can I Reserve Seats With the JR East Pass?</h2>
          <p className={styles.bodyText}>
            Yes. Reserved seats in ordinary cars are part of the pass at no extra charge. Get the seat ticket at a
            reserved-seat ticket machine or a JR ticket office before boarding. Green Car and GranClass need a
            separate fee.
          </p>
        </section>

        {/* Day trips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trips</span>
          <h2 className={styles.sectionTitle}>Pass or Tour for GALA Yuzawa and Karuizawa?</h2>
          <p className={styles.bodyText}>
            Both are on the JR East Pass, but if they are your only trips out of Tokyo, the ¥16,000 Tokyo Wide Pass
            or a booked day tour costs less. Our{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              GALA Yuzawa ski day trip
            </Link>
            ,{" "}
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Karuizawa day trip
            </Link>{" "}
            and{" "}
            <Link href="/guides/attractions/nikko-day-trip" style={{ color: "var(--red)", fontWeight: 600 }}>
              Nikko day trip
            </Link>{" "}
            guides compare the options.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={galaNaebaSkiDayTripTokyo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              GALA Yuzawa Ski Day Trip →
            </KlookLink>
            <KlookLink href={karuizawaShinkansenDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Karuizawa Shinkansen Day Trip →
            </KlookLink>
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

        <KlookTourPicks
          heading="What a JR East Trip Books Next"
          intro="The pass covers the trains; these listings cover the days at the other end. Open a listing for the current price on your dates."
          tours={[jrEastPass, galaNaebaSkiDayTripTokyo, karuizawaShinkansenDayTrip]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/transport/tokyo-wide-pass", title: "JR Tokyo Wide Pass (2026): Price and Is It Worth It?" },
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Cost 2026: New Prices & Is It Worth It?" },
              { href: "/guides/transport/tokyo-to-kanazawa", title: "Tokyo to Kanazawa (2026): Kagayaki Times, Seats and Whether a Pass Pays" },
              { href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass (2026): Price and Is It Worth It?" },
              { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "Gala Yuzawa Ski Day Trip from Tokyo" },
              { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "Karuizawa Day Trip From Tokyo" },
              { href: "/guides/attractions/jigokudani-snow-monkey-tour", title: "Snow Monkey Tour from Tokyo: Jigokudani Guide" },
              { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip From Tokyo" },
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
            <h2 className={styles.ctaBannerTitle}>One pass for Tohoku, Niigata and Nagano</h2>
            <p className={styles.ctaBannerDesc}>
              {PASS_5} for 5 days or {PASS_10} for 10, shinkansen seats included. Only doing day trips from Tokyo? The
              Tokyo Wide Pass is less than half the price.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrEastPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the JR East Pass →
              </KlookLink>
              <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Tokyo Wide Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
