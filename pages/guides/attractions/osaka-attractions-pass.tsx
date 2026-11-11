import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  kyotoNaraArashiyamaTour,
  kyotoHighlightBusTour,
  osakaAmazingPassUrl,
  osakaAmazingPassTripPrep,
} from "../../../lib/klook-links";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA links — Klook affiliate redirects (tracking links, both listings confirmed live
// 19 Oct 2026). The pass link is shared with the ticket price table.
const OSAKA_AMAZING_PASS_URL = osakaAmazingPassUrl;
const KAIYUKAN_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304901&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F598-osaka-aquarium-kaiyukan-japan%2F";

/*
 * Every figure below was read on 9 Nov 2026 off the official pass site:
 *   - prices, sale period, day boundary, e-ticket and purchase rules: osaka-amazing-pass.com/en/info.html
 *   - versions and participating railways: osaka-amazing-pass.com/en/howto_about_1day.html
 *   - child pass, payment, 4-per-purchase: osaka-amazing-pass.com/en/faq.html
 *   - the 41 attractions, their regular fees and conditions: osaka-amazing-pass.com/en/service_free.html
 * Cross-checked the same day on the venues' own sites: Umeda Sky ¥2,000 (skybldg.co.jp),
 * Tsutenkaku ¥1,500 (tsutenkaku.co.jp/annai), HEP FIVE wheel ¥1,000 (hepfive.jp).
 * The ¥240 fare and the ¥820 / ¥620 Enjoy Eco Card are Osaka Metro's, read 4 Nov 2026
 * for /guides/transport/osaka-metro-pass.
 * The 2025 edition was also ¥3,500 / ¥5,000 (Hankyu Hanshin Holdings' pass page,
 * enjoy-osaka-kyoto-kobe.com, 9 Nov 2026), so there was no 2026 price rise to describe:
 * the ¥2,500 / ¥3,300 this page carried until 9 Nov 2026 was simply out of date.
 * The 1-day price and check date are owned by lib/attraction-prices.ts.
 */
const PASS_1_DAY = PRICES.osakaAmazingPass.adult;
const PASS_2_DAY = "¥5,000";
const CHECKED = checkedLabel(PRICES.osakaAmazingPass.checked);
const METRO_CHECKED = "4 November 2026";
const TITLE = "Osaka Amazing Pass 2026: ¥3,500 Price, Is It Worth It?";
const DESCRIPTION =
  "Osaka Amazing Pass price 2026: ¥3,500 for 1 day, ¥5,000 for 2 (checked 9 Nov). Is it worth it? Break-even table, when to activate, what's excluded.";

const officialLink = { color: "var(--red)", fontWeight: 600 } as const;

const priceRows = [
  { version: "OSAKA AMAZING PASS 1 day", price: "¥3,500", valid: "One day, 3:00 to 2:59 the next morning", note: "On sale 25 Mar 2026 – 31 Mar 2027" },
  { version: "OSAKA AMAZING PASS 2 day", price: "¥5,000", valid: "Two consecutive days", note: "On sale 25 Mar 2026 – 31 Mar 2027" },
  { version: "Itami Airport (ITM) version, 1 day / 2 day", price: "¥3,800 / ¥5,400", valid: "As above", note: "Adds the Osaka Monorail from Osaka Airport and Kita-Osaka Kyuko; not usable at Kansai Airport" },
  { version: "Kansai Airport (KIX) version, 28 hours", price: "¥5,300", valid: "28 hours from first use", note: "On sale from 1 Oct 2026; adds one Nankai ride, Kansai Airport → Namba only" },
];

/** Regular adult fees as printed on the pass's own attraction list, 9 Nov 2026. */
const facilityRows = [
  { attraction: "Osaka Castle Museum (main tower)", fee: "¥1,200", pass: "✓ Free", note: "Includes the Toyotomi Stone Wall Museum" },
  { attraction: "Osaka-jo Gozabune Boat (castle moat)", fee: "¥1,800", pass: "✓ Free", note: "10:00–16:30; exchange at the counter" },
  { attraction: "Osaka Castle Nishinomaru Garden", fee: "¥300", pass: "✓ Free", note: "9:00–17:00; closed Mondays" },
  { attraction: "Umeda Sky Building Kuchu-Teien Observatory", fee: "¥2,000", pass: "✓ Free until 15:00", note: "From 15:00 the pass gives 10% off instead" },
  { attraction: "HEP FIVE Ferris Wheel", fee: "¥1,000", pass: "✓ Free", note: "HEP FIVE lists 11:00–23:00, last boarding 22:45" },
  { attraction: "Tombori River Cruise (Dotonbori)", fee: "¥2,000", pass: "✓ Free", note: "Every 30 min, 11:00–21:00; exchange for a time slot" },
  { attraction: "Tsutenkaku Tower Observation Deck", fee: "¥1,500", pass: "✓ Free", note: "9:00–21:45; time-slot booking required" },
  { attraction: "Shitennoji Temple", fee: "¥800", pass: "✓ Free", note: "Complex ¥500 + garden ¥300" },
  { attraction: "Osaka Tennoji Zoo", fee: "¥800", pass: "✓ Free", note: "Closed Mondays" },
  { attraction: "Tempozan Giant Ferris Wheel", fee: "¥1,000", pass: "✓ Free", note: "Next to the Kaiyukan, which is not on the pass" },
  { attraction: "Universal Studios Japan", fee: "—", pass: "✗ Not included", note: "Own Studio Pass, sold separately" },
  { attraction: "Osaka Aquarium Kaiyukan", fee: "—", pass: "✗ Not included", note: "Own ticket, priced by date" },
];

/** What a day costs without the pass: admissions plus a weekday Enjoy Eco Card (¥820). */
const breakEvenRows = [
  { day: "Castle, Umeda Sky (before 15:00), Tombori cruise", sums: "¥1,200 + ¥2,000 + ¥2,000", admissions: "¥5,200", without: "¥6,020", verdict: "Pass ahead by ¥2,520" },
  { day: "Castle, Umeda Sky, HEP FIVE wheel", sums: "¥1,200 + ¥2,000 + ¥1,000", admissions: "¥4,200", without: "¥5,020", verdict: "Pass ahead by ¥1,520" },
  { day: "Castle keep, Gozabune boat, Nishinomaru Garden", sums: "¥1,200 + ¥1,800 + ¥300", admissions: "¥3,300", without: "¥4,120", verdict: "Pass ahead by ¥620" },
  { day: "Tsutenkaku, Shitennoji, Tennoji Zoo", sums: "¥1,500 + ¥800 + ¥800", admissions: "¥3,100", without: "¥3,920", verdict: "Pass ahead by ¥420" },
  { day: "Castle keep only, then shopping", sums: "¥1,200", admissions: "¥1,200", without: "¥2,020", verdict: "Skip the pass: ¥1,480 dearer" },
];

const compareRows = [
  { item: "Price", one: "¥3,500", two: "¥5,000", eco: "¥820 weekdays, ¥620 weekends and holidays", ic: "Pay per ride (¥240 for 3–7 km)" },
  { item: "Rides", one: "Osaka Metro, city buses, New Tram, and Hankyu, Hanshin, Keihan, Kintetsu and Nankai mainly within Osaka city", two: "Same, on two consecutive days", eco: "Osaka Metro and city buses", ic: "Any line, including JR" },
  { item: "Admissions", one: "About 40 free", two: "About 40 free, on either day", eco: "Discounts at some venues", ic: "None" },
  { item: "Children", one: "No child pass; same price for all ages", two: "No child pass", eco: "¥310", ic: "Child IC card fares" },
  { item: "Best for", one: "One sightseeing day with 3+ paid stops", two: "Two city days, both with paid stops", eco: "A day of rides with few paid stops", ic: "Two or three rides a day" },
];

const whoFor = [
  {
    title: "Worth it if…",
    desc: `Your day has three paid stops from the list — Osaka Castle, the Umeda Sky Building before 15:00 and the Tombori River Cruise is the strongest combination at ¥5,200 — plus the subway between them. At ${PASS_1_DAY} the pass needs more than it used to, and three paid stops is where it starts to pay.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  {
    title: "Skip it if…",
    desc: "Your Osaka list is mostly USJ and the Kaiyukan — neither is on the pass — or the day has one or two paid stops. A ¥820 Enjoy Eco Card, or an ICOCA for a handful of rides, costs less.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  },
  {
    title: "1-day vs 2-day",
    desc: `The 2-day pass is ${PASS_2_DAY}, ¥1,500 more than one day. Against a 1-day pass plus a ¥820 Enjoy Eco Card for the second day (¥4,320), the 2-day pass wins as soon as day two has more than ¥680 of paid admissions — one Tsutenkaku visit does it. Prices checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="16" y1="2" x2="16" y2="6" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Buy online with a credit card",
    desc: "The official pass is sold online through SURUTTO QRtto; the only counter sale is at the Kansai Tourist Information Center. Payment is by credit card only — debit cards are not accepted — and one purchase covers up to four passes. Klook also sells it with an English checkout.",
  },
  {
    title: "Use a smartphone, not a screenshot",
    desc: "It is an e-ticket with no paper version. You need an internet-connected smartphone or tablet with a camera, and the official site states that screenshots and printouts are not accepted — the live QR code is what you show.",
  },
  {
    title: "Press \"Start Using\" after 3:00 on your sightseeing day",
    desc: "A pass day runs from 3:00 to 2:59 the next morning. Starting it between midnight and 2:59 ends it at 3:00, so do not activate it on the way home from a late night. You must start it within three months of purchase and by 31 March 2027.",
  },
  {
    title: "Scan the QR at gates, bus exits and admissions",
    desc: "Show the QR code at ticket gates, when you get off a bus, and at each attraction. At stations without QR gates, show it to station staff. Reserved-seat limited express trains need an extra ticket.",
  },
];

const faqItems = [
  {
    q: "How much is the Osaka Amazing Pass in 2026?",
    a: `The 1-day pass is ${PASS_1_DAY} and the 2-day pass is ${PASS_2_DAY}, on sale from 25 March 2026 to 31 March 2027. The Itami Airport version is ¥3,800 / ¥5,400 and the Kansai Airport 28-hour ticket is ¥5,300. Prices read off osaka-amazing-pass.com on ${CHECKED}.`,
  },
  {
    q: "Is the Osaka Amazing Pass worth it?",
    a: `For a day with three paid stops, yes. Osaka Castle (¥1,200), the Umeda Sky Building observatory before 15:00 (¥2,000) and the Tombori River Cruise (¥2,000) come to ¥5,200 at regular fees, against ${PASS_1_DAY} with the subway included. A day with one or two paid stops, or one built around USJ or the Kaiyukan, does not pay. Fees from the pass's official attraction list, ${CHECKED}.`,
  },
  {
    q: "What's included in the Osaka Amazing Pass?",
    a: `Unlimited rides on Osaka Metro, city buses (some routes excluded), the New Tram, and Hankyu, Hanshin, Keihan, Kintetsu and Nankai trains mainly within Osaka city, plus free entry to about 40 attractions — the official list had 41 entries on ${CHECKED}, including Osaka Castle Museum, the Umeda Sky observatory, Tsutenkaku and the Tombori River Cruise.`,
  },
  {
    q: "Does the Osaka Amazing Pass include USJ or Kaiyukan?",
    a: "No. Universal Studios Japan and the Osaka Aquarium Kaiyukan are not on the pass's attraction list. Each sells its own ticket: USJ through its Studio Pass and Kaiyukan on a date-based price calendar. If one of them is the reason you are in Osaka, give it its own day and do not buy a pass for that day.",
  },
  {
    q: "Is the Osaka Amazing Pass digital?",
    a: `Yes, e-ticket only: there is no paper pass. You show a live QR code on a smartphone at gates and attractions, and the official site says screenshots and printouts are not accepted. Checked ${CHECKED}.`,
  },
  {
    q: "Should I get the 1-day or 2-day Osaka Amazing Pass?",
    a: `The 2-day pass (${PASS_2_DAY}) covers two consecutive days. It beats a 1-day pass plus a ¥820 Enjoy Eco Card on the second day once that day has more than ¥680 of paid admissions. If day two is USJ or the Kaiyukan, buy the 1-day pass.`,
  },
  {
    q: "Does the Osaka Amazing Pass include transport?",
    a: "Yes: Osaka Metro, city buses (some routes excluded), the New Tram, and the five private railways mainly within Osaka city. Reserved-seat limited express trains cost extra, and airport limousine buses are not covered. JR is not on the official list of participating lines.",
  },
  {
    q: "Is there a child Osaka Amazing Pass?",
    a: `No. The official FAQ states that passes for children are not sold, and the price is the same for adults and children, so a child pays ${PASS_1_DAY} too. For children, Osaka Metro's Enjoy Eco Card is ¥310 (Osaka Metro, ${METRO_CHECKED}). Checked ${CHECKED}.`,
  },
  {
    q: "Does the Osaka Amazing Pass cover the train from Kansai Airport?",
    a: "The standard pass does not. The Kansai Airport version (¥5,300, 28 hours from first use) includes one Nankai ride from Kansai Airport Station to Namba — not the return — and a reserved-seat limited express such as the Rapi:t still needs an extra ticket. The Itami Airport version is not usable at Kansai Airport.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/osaka-attractions-pass") } });

function SourceNote({ children }: { children: ReactNode }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      {children}
    </p>
  );
}

function PassCta() {
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
      <KlookLink href={OSAKA_AMAZING_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 220px" }}>
        Check the Osaka Amazing Pass on Klook →
      </KlookLink>
    </div>
  );
}

export default function OsakaAttractionsPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" />
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
              route: "/guides/attractions/osaka-attractions-pass",
              headline: TITLE,
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Osaka Amazing Pass", item: "https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" },
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Osaka Amazing Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Amazing Pass 2026:<br />¥3,500 Price — Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            {PASS_1_DAY} for one day, {PASS_2_DAY} for two: unlimited city trains and buses plus about 40 free
            admissions. It pays on a day with three paid stops — and not at USJ or the Kaiyukan.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Break-even table"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText} style={{ marginTop: 0 }}>
              <strong>The Osaka Amazing Pass is {PASS_1_DAY} for one day and {PASS_2_DAY} for two in 2026</strong>{" "}
              (official site, checked {CHECKED}). It gives unlimited rides on Osaka Metro, city buses and the private
              railways within Osaka city, and free entry to about 40 attractions. It pays on a day with three or more
              paid stops — for example Osaka Castle, the Umeda Sky Building and the Tombori River Cruise, ¥5,200 at
              regular fees. Universal Studios Japan and the Kaiyukan are not included.
            </p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "1rem" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1-day pass</p>
                <p className={styles.verdictStatValue}>{PASS_1_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2-day pass</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Not included</p>
                <p className={styles.verdictStatValue}>USJ &amp; Kaiyukan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Format</p>
                <p className={styles.verdictStatValue}>E-ticket only</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={OSAKA_AMAZING_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Osaka Amazing Pass →
              </KlookLink>
              <KlookLink href={KAIYUKAN_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kaiyukan Aquarium Ticket →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is the Osaka Amazing Pass in 2026?</h2>
          <p className={styles.bodyText}>
            {PASS_1_DAY} for one day and {PASS_2_DAY} for two consecutive days, on sale from 25 March 2026 to 31 March
            2027. There is one price for every age: no child pass is sold.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Version", "Price", "Valid for", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.version}>
                      <td className={styles.tdProvider}>{row.version}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}><strong>{row.price}</strong></td>
                      <td style={{ fontSize: "0.88rem" }}>{row.valid}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourceNote>
            Read off{" "}
            <a href="https://osaka-amazing-pass.com/en/info.html" target="_blank" rel="noopener noreferrer">
              osaka-amazing-pass.com/en/info.html
            </a>{" "}
            and the official version page on {CHECKED}. Older guides quoting ¥2,500 and ¥3,300 are out of date.
          </SourceNote>
        </section>

        {/* Worth it after the price increase */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Is it worth it?</span>
          <h2 className={styles.sectionTitle}>Is the Osaka Amazing Pass Worth It After the Price Increase?</h2>
          <p className={styles.bodyText}>
            Yes, on a day with three paid stops; no, on a day with one. The official figures show no rise in 2026 — the
            2025 edition was also ¥3,500 / ¥5,000 — but against the ¥2,500 that older guides still print, the pass now
            needs a fuller day before it pays.
          </p>
          <p className={styles.bodyText}>
            The table prices each day without the pass: the regular admissions plus a weekday Enjoy Eco Card (¥820) for the
            subway. Where that comes to more than {PASS_1_DAY}, the pass is ahead.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day plan", "Regular fees", "Admissions", "Without the pass (+ ¥820)", `Against ${PASS_1_DAY}`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakEvenRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider}>{row.day}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sums}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.admissions}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.without}</td>
                      <td style={{ fontSize: "0.88rem" }}><strong>{row.verdict}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourceNote>
            Admission fees are the regular adult fees on the pass&apos;s official attraction list,{" "}
            <a href="https://osaka-amazing-pass.com/en/service_free.html" target="_blank" rel="noopener noreferrer">
              osaka-amazing-pass.com/en/service_free.html
            </a>
            , read {CHECKED}; the Umeda Sky, Tsutenkaku and HEP FIVE figures match the venues&apos; own sites the same day.
            Enjoy Eco Card price from Osaka Metro, {METRO_CHECKED}. At the weekend the card is ¥620, which narrows each margin
            by ¥200.
          </SourceNote>
          <p className={styles.bodyText}>
            Two details move the sums. The Umeda Sky Building is free only until 15:00 — after that the pass gives 10% off —
            so put it in the morning; our{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets" style={officialLink}>
              Umeda Sky Building tickets guide
            </Link>{" "}
            has the hours. And the castle on its own does not pay: the keep, the moat boat and the garden come to ¥3,300,
            which needs the subway to clear the pass — the{" "}
            <Link href="/guides/attractions/osaka-castle-tickets" style={officialLink}>
              Osaka Castle tickets guide
            </Link>{" "}
            prices each one.
          </p>
          <PassCta />
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Facility table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Included vs not</span>
          <h2 className={styles.sectionTitle}>What Does the Osaka Amazing Pass Cover?</h2>
          <p className={styles.bodyText}>
            About 40 attractions — the official list had 41 entries on {CHECKED} — plus unlimited rides on Osaka Metro,
            city buses (some routes excluded), the New Tram, and Hankyu, Hanshin, Keihan, Kintetsu and Nankai trains mainly
            within Osaka city. These are the paid stops most first-time itineraries include.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Attraction", "Regular adult fee", "With the pass", "Condition"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {facilityRows.map((row) => (
                    <tr key={row.attraction}>
                      <td className={styles.tdProvider}>{row.attraction}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.fee}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourceNote>
            Fees and conditions from the official attraction list, read {CHECKED}. The list changes during the year, so
            check it for your date.
          </SourceNote>
        </section>

        {/* 1-day vs 2-day vs no pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compared</span>
          <h2 className={styles.sectionTitle}>1-Day or 2-Day Osaka Amazing Pass — or No Pass at All?</h2>
          <p className={styles.bodyText}>
            Take the 1-day pass for one full sightseeing day, the 2-day pass only if both days have paid stops, and an Enjoy
            Eco Card or ICOCA on days that are mostly rides. The 2-day pass beats a 1-day pass plus an ¥820 Enjoy Eco Card
            once the second day has more than ¥680 of paid admissions.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Amazing Pass 1 day", "Amazing Pass 2 day", "Enjoy Eco Card", "ICOCA (IC card)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.one}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.two}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.eco}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.ic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourceNote>
            Amazing Pass figures from the official site, {CHECKED}. Enjoy Eco Card and fare from Osaka Metro, {METRO_CHECKED};
            the full comparison is in our{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={officialLink}>
              Osaka Metro pass vs Enjoy Eco Card guide
            </Link>
            .
          </SourceNote>
        </section>

        {/* Airport versions */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Airport versions</span>
          <h2 className={styles.sectionTitle}>Which Osaka Amazing Pass Is for Airport Arrivals?</h2>
          <p className={styles.bodyText}>
            <strong>Itami (ITM) version, ¥3,800 / ¥5,400:</strong> the standard pass plus the Osaka Monorail from Osaka Airport
            to Bampaku-kinen-koen and the Kita-Osaka Kyuko, with the Expo&apos;70 Commemorative Park added. It suits a domestic
            arrival at Itami; it cannot be used at Kansai Airport.
          </p>
          <p className={styles.bodyText}>
            <strong>Kansai Airport (KIX) 28-hour ticket, ¥5,300:</strong> on sale from 1 October 2026, valid for 28 hours from
            first use, and it adds one Nankai ride from Kansai Airport Station to Namba — not the return journey. A
            reserved-seat limited express such as the Rapi:t still needs an extra ticket. It suits an afternoon landing
            followed by a full sightseeing day in the city; if you land late at night, the 28 hours run out before you use them.
            Compare the airport trains in our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={officialLink}>
              Haruka vs Nankai Rapi:t guide
            </Link>
            . Checked {CHECKED}.
          </p>
        </section>

        {/* Activation */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>What Time Should You Activate the Osaka Amazing Pass?</h2>
          <p className={styles.bodyText}>
            In the morning of your sightseeing day, after 3:00. A pass day runs from 3:00 to 2:59 the next morning, and a pass
            started between midnight and 2:59 stops working at 3:00 — so never start it on the way back from a late night.
          </p>
          <p className={styles.bodyText}>
            Starting late in the day costs money too. The Gozabune boat stops at 16:30, Nishinomaru Garden at 17:00, and the
            Umeda Sky Building is free only until 15:00, so a pass started at lunchtime loses the stops that make it pay. The
            evening options — the Tombori River Cruise to 21:00, Tsutenkaku to 21:45, the HEP FIVE wheel to 22:45 — are the
            ones to leave until last. Times from the official attraction list and the venues, {CHECKED}. The{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={officialLink}>
              Osaka 2-day itinerary
            </Link>{" "}
            puts the stops in that order.
          </p>
        </section>

        {/* How to buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Buy and Use the Osaka Amazing Pass?</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <SourceNote>Purchase and use rules from the official site and FAQ, read {CHECKED}. Klook prices vary by date, so check the listing for your date.</SourceNote>
          <PassCta />
        </section>

        <KlookTripPrep
          label="Same trip"
          heading="What to Book for the Same Osaka Trip"
          intro="The pass covers the city's trains and about 40 admissions. These are the parts of the same trip it does not cover."
          items={osakaAmazingPassTripPrep}
        />

        <BookingEsimCard lead="Using the pass's QR code all day? Get mobile data before you land." />

        {/* Not included */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Not on the pass</span>
          <h2 className={styles.sectionTitle}>Which Attractions Are Not Included?</h2>
          <p className={styles.bodyText}>
            Universal Studios Japan and the Osaka Aquarium Kaiyukan are the two big names missing — buy those separately and
            give them their own day. Kaiyukan sells its own ticket on a date-based calendar; the Tempozan Giant Ferris Wheel
            next door and the Captain Line ferry, which links the Kaiyukan side with the USJ side, are on the pass.
          </p>
          <p className={styles.bodyText}>
            Some listed venues are closed or seasonal. On {CHECKED} the official list showed the Osaka Museum of Housing and
            Living closed from 1 September 2026 to 5 January 2027, the National Museum of Art, Osaka not valid from 4 November
            2026 to 31 March 2027, the OSAKA WHEEL (Itami version only) closed for maintenance with no reopening date, and the
            Okawa River Sakura Cruise running only from 24 March to 12 April. Special exhibitions, reserved-seat limited
            express trains, airport limousine buses and travel outside the eligible area all cost extra.
          </p>
          <p className={styles.bodyText}>
            For the theme park, see our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={officialLink}>
              Universal Studios Japan tickets and Express Pass guide
            </Link>
            ; for the aquarium, the{" "}
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" style={officialLink}>
              Kaiyukan tickets guide
            </Link>
            . Our{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={officialLink}>
              things to do in Osaka round-up
            </Link>{" "}
            splits a trip into pass days and USJ or Kaiyukan days, and the{" "}
            <Link href="/guides/attractions" style={officialLink}>
              things to do in Japan hub
            </Link>{" "}
            has the other cities.
          </p>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Osaka Amazing Pass FAQ</h2>
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
          heading="Days Out From the Same Base"
          intro="Osaka is the cheapest place in Kansai to sleep, which makes it the sensible departure point for the Kyoto and Nara days. Open a listing for the current price on your date."
          tours={[kyotoNaraArashiyamaTour, kyotoHighlightBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 10 Nov 2026: three days in Osaka, with USJ and a Nara or Kobe day. */}
            <Link href="/guides/attractions/osaka-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 3 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/dotonbori-river-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18l-2 4H5z" />
                  <path d="M5 17V9h14v8" />
                  <path d="M12 3v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Dotonbori River Cruise (2026): Price, Times, Pier and the Pass</p>
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
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a8 8 0 0 1 16 0v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
                  <path d="M12 3v8M9 6h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass vs Enjoy Eco Card (2026): Which to Buy?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Metro, IC Cards &amp; Passes</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning a pass day in Osaka?</h2>
            <p className={styles.ctaBannerDesc}>
              The Osaka Amazing Pass covers the city&apos;s trains and about 40 admissions. The Kaiyukan aquarium is not on
              it, so book that ticket separately.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={OSAKA_AMAZING_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Osaka Amazing Pass →
              </KlookLink>
              <KlookLink href={KAIYUKAN_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kaiyukan Ticket →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
