import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { jrHarukaUrl, jrKansaiAreaPass, jrKansaiMiniPass, kansaiAreaPassSameDayPrep } from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";

// CTA links — both in Klook's 5% passes-and-transport band. The pass listing (1107)
// is a new constant in lib/klook-links.ts, confirmed live through the www.klook.com
// search index on 25 Oct 2026; the Haruka link (18400) is the one
// /guides/transport/haruka-vs-nankai-rapit already uses, reused rather than re-minted.
const KANSAI_PASS_URL = jrKansaiAreaPass.url;
const HARUKA_URL = jrHarukaUrl;

// Re-read on 3 November 2026 (task jtk-20261103-06):
//   - westjr.co.jp/global/en/ticket/westqr/kansaiarea/ — WEST QR prices, validity,
//     coverage, HARUKA reserved-seat rule, sales channel (overseas agencies only),
//     activation and eligibility.
//   - westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai/ —
//     the old pass: "Sales ended as of September 30, 2026" and its superseded prices.
//   - westjr.co.jp/global/en/ticket/westqr/kansaimini/ — Kansai Mini Pass.
//   - westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/ and
//     westjr.co.jp/global/en/ticket/westqr/haruka/ — HARUKA One-way Ticket fares.
//   - japanrailpass.net/en/purchase/price/ — nationwide JAPAN RAIL PASS after the
//     1 October 2026 revision.
//   - osaka-amazing-pass.com/en/ — Osaka Amazing Pass prices.
//   - the 23 Dec 2024 joint notice by JR West and nine other operators (hanshin.co.jp
//     press PDF) — KANSAI ONE PASS sales end.
// The Kansai WIDE Area Pass figure was read on 25 October 2026; JR West's page for it
// returned 404 on 3 November, so it carries its own date.
const CHECKED = checkedLabel("2026-11-03");
const WIDE_CHECKED = checkedLabel("2026-10-25");

const QR_1_DAY = "¥2,700";
const QR_4_DAY = "¥6,700";

const priceRows = [
  { days: "1 day", qrAdult: QR_1_DAY, qrChild: "¥1,350", oldAdult: "¥2,800", oldChild: "¥1,400" },
  { days: "2 days", qrAdult: "¥4,700", qrChild: "¥2,350", oldAdult: "¥4,800", oldChild: "¥2,400" },
  { days: "3 days", qrAdult: "¥5,500", qrChild: "¥2,750", oldAdult: "¥5,800", oldChild: "¥2,900" },
  { days: "4 days", qrAdult: QR_4_DAY, qrChild: "¥3,350", oldAdult: "¥7,000", oldChild: "¥3,500" },
];

const lineRows = [
  {
    service: "Kansai-Airport Express HARUKA, non-reserved seats",
    allowed: "✓ Unlimited",
    note: "The airport train, from Kansai Airport to Tennoji, Shin-Osaka and Kyoto. This is the single biggest reason to hold the pass.",
  },
  {
    service: "Kansai-Airport Express HARUKA, ordinary-car reserved seat",
    allowed: "✓ Twice",
    note: "Two reserved seats are included at no extra charge. Book them on the WEST-QR website from 30 days before boarding — JR West states they cannot be booked on the train, at ticket machines or at ticket counters.",
  },
  {
    service: "HARUKA Green Car (first class)",
    allowed: "✗ Not covered",
    note: "Needs separate tickets. The pass covers ordinary cars only.",
  },
  {
    service: "JR West Special Rapid, Rapid and Local trains",
    allowed: "✓ Unlimited",
    note: "The ordinary network inside the valid area: Osaka–Kyoto, Osaka–Kobe, Osaka–Nara, Osaka–Himeji and the rest.",
  },
  {
    service: "Shinkansen (Tokaido and Sanyo)",
    allowed: "✗ Never",
    note: "Not on this pass at any length. Shin-Osaka to Kyoto by shinkansen is a separate ticket even on the day your pass is valid.",
  },
  {
    service: "Any other limited express",
    allowed: "✗ Not covered",
    note: "The HARUKA is the only limited express on the pass. Thunderbird, Kuroshio and the rest need their own tickets.",
  },
  {
    service: "Private railways — Hankyu, Keihan, Kintetsu, Nankai",
    allowed: "✗ Not covered",
    note: "The pass is a JR West ticket; JR West's old-pass page sells Keihan and Hankyu access only as separate vouchers. Kyoto's and Osaka's handiest lines for sightseeing are often these, not JR.",
  },
  {
    service: "Osaka Metro, Kyoto subway and city buses",
    allowed: "✗ Not covered",
    note: "No subway, no city bus. Inside either city you still need an IC card or a city pass on top.",
  },
  {
    service: "Paid seats on JR trains (A-Seat) and local Green Cars",
    allowed: "✗ Extra charge",
    note: "Ordinary seats on Special Rapid, Rapid and Local trains are covered; the paid A-Seat and Green Car upgrades are not.",
  },
];

const compareRows = [
  {
    option: "WEST QR Kansai Area Pass",
    price: `${QR_1_DAY} (1 day) to ${QR_4_DAY} (4 days), adult`,
    covers: "JR West ordinary trains around Osaka, Kyoto, Kobe, Nara, Himeji, Wakayama, Otsu, Tsuruga and Iga-Ueno, plus unlimited HARUKA non-reserved and two reserved HARUKA seats",
    pick: "The default for a Kansai-only trip that starts or ends at Kansai Airport",
  },
  {
    option: "Kansai Mini Pass",
    price: "¥3,000 for 3 consecutive days, adult (¥1,500 child)",
    covers: "Rapid and local JR West trains plus the Kansai-Airport Rapid Service. The HARUKA needs a separate limited express ticket",
    pick: "Cheapest option if you will do the airport run on the slow Rapid rather than the HARUKA",
  },
  {
    option: "HARUKA One-way Ticket",
    price: "¥1,600 Tennoji, ¥1,900 Osaka / Shin-Osaka, ¥2,300 Kobe, ¥2,200 Nara, ¥2,700 Kyoto (from Kansai Airport)",
    covers: "One airport journey only — no travel between cities afterwards",
    pick: "Only if the airport run is the single JR ride of your whole trip",
  },
  {
    option: "Kansai WIDE Area Pass",
    price: `¥12,000 for 5 consecutive days, adult (¥6,000 child) — read ${WIDE_CHECKED}`,
    covers: "Everything above plus reserved Sanyo Shinkansen seats Shin-Osaka ⇄ Okayama, and Takamatsu, Kinosaki Onsen, Amanohashidate, Tottori and Shirahama",
    pick: "If Himeji is not the far edge of your trip — day trips beyond Kansai change the answer",
  },
  {
    option: "OSAKA AMAZING PASS",
    price: "¥3,500 for 1 day, ¥5,000 for 2 days",
    covers: "Free rides on the buses and trains on its Osaka network map plus entry to its listed attractions — a city pass, not a regional rail pass",
    pick: "For a day spent inside Osaka. It does not replace the Kansai pass's airport run or the Kyoto and Nara hops",
  },
  {
    option: "JAPAN RAIL PASS (nationwide, after the 1 October 2026 revision)",
    price: "7 days, Ordinary Car: ¥50,000 on the official website, ¥53,000 as an Exchange Order from an overseas agency",
    covers: "Nationwide JR including most shinkansen — far more than Kansai, at over seven times the 4-day Kansai price",
    pick: "Only once Tokyo is in the itinerary; see our JR Pass guide for the break-even",
  },
];

const worthRows = [
  {
    plan: "Flying into Kansai Airport and going straight to Kyoto",
    verdict: "✓ Buy the 1-day pass",
    why: `The discounted HARUKA One-way Ticket to Kyoto is ¥2,700 for tickets sold from 1 November 2026 — exactly the price of a 1-day pass. The pass costs nothing extra and every JR ride you take the same day is free on top.`,
  },
  {
    plan: "Three or four days of Osaka, Kyoto, Nara and Kobe with JR between them",
    verdict: "✓ Buy the 3- or 4-day pass",
    why: `${QR_4_DAY} over four days covers both airport runs and the intercity hops. The airport legs alone — ¥2,700 in to Kyoto and ¥1,900 out of Osaka on HARUKA singles — are ¥4,600 of the ¥6,700, leaving ¥2,100 to make up.`,
  },
  {
    plan: "Staying in one city and sightseeing on foot, subway and bus",
    verdict: "✗ Skip it",
    why: "The pass does not touch the Osaka Metro, the Kyoto subway or any city bus. If your days are spent inside one city, an IC card plus a city pass is the cheaper pair, and the pass just duplicates the airport run.",
  },
  {
    plan: "Kyoto temple-hopping with Hankyu, Keihan or Kintetsu",
    verdict: "✗ Wrong pass",
    why: "Fushimi Inari, Arashiyama and Nara are all reachable on private lines that this pass does not cover. Check which operator serves the stops you actually want before buying a JR product.",
  },
  {
    plan: "Tokyo in the same trip, or a shinkansen leg",
    verdict: "✗ Not this one",
    why: "No shinkansen at any length, and the valid area stops well short of Tokyo. Either price a nationwide JAPAN RAIL PASS or buy the shinkansen leg separately and keep the Kansai pass for the Kansai days.",
  },
  {
    plan: "You hold a Japanese passport or live in Japan",
    verdict: "✗ Not eligible",
    why: "JR West sells it only to holders of a passport issued by a foreign government entering Japan as a Temporary Visitor. Japanese nationals cannot use it, and nor can foreign nationals with permanent residence in Japan.",
  },
];

const steps = [
  {
    title: "Check that your route is actually JR",
    desc: "Do this before the arithmetic. Osaka–Kyoto, Osaka–Kobe, Osaka–Nara and Osaka–Himeji are all JR West routes the pass covers. Fushimi Inari on the Keihan, Arashiyama on the Hankyu or the Randen, and Nara on the Kintetsu are not. If most of your sightseeing stops sit on private lines, no amount of adding up makes a JR pass the right purchase.",
  },
  {
    title: "Count the days, not the rides",
    desc: `The pass is sold for 1, 2, 3 or 4 consecutive days, at ${QR_1_DAY}, ¥4,700, ¥5,500 and ${QR_4_DAY} for an adult, children half. Consecutive is the word that matters: a gap day in the middle is a day you have paid for. If your Kansai days are split either side of a Tokyo leg, buy two short passes or none. Prices checked ${CHECKED}.`,
  },
  {
    title: "Reserve your two HARUKA seats online before you board",
    desc: "The pass includes unlimited HARUKA non-reserved travel plus an ordinary-car reserved seat twice. JR West states the reserved seats are booked on the WEST-QR website from 30 days before boarding — not on the train, at ticket machines or at ticket counters. Worth it on the airport run with luggage, and worth saving for the two legs where you will have cases.",
  },
  {
    title: "Buy the voucher before you fly, then activate it on the day",
    desc: "JR West sells the WEST QR version only as a voucher through overseas travel agencies; it states the pass cannot be bought at travel agencies in Japan or through JR-WEST Online Train Reservation, and there is no station sale. You register the voucher on the WEST-QR site, then press the \"Use ticket\" button after 04:00 on your start day and scan the QR code at the gates. There is no paper pass and no exchange queue — but you do need a phone with internet access, which is its own argument for having data on arrival.",
  },
  {
    title: "Check you are eligible before you buy",
    desc: "Eligibility is a foreign-government passport with Temporary Visitor entry status. Japanese nationals — including those with permanent residence abroad — are not eligible at all, so check this before the voucher is issued.",
  },
];

const faqItems = [
  {
    q: "What if I already bought a paper Kansai Area Pass?",
    a: `It stays valid. JR West states sales ended on 30 September 2026 and that passes bought by that date remain valid for their full validity period. To refund one, JR West asks for the pass plus its three vouchers (Kyoto City Subway, Keihan and Hankyu), charges a 10% handling fee with a ¥220 minimum per pass, and refunds nothing after use has started or the pass has expired. Exchanged passes are refunded at JR West station ticket counters only. Read on westjr.co.jp on 6 Nov 2026.`,
  },
  {
    q: "How much is the JR Kansai Area Pass in 2026?",
    a: `JR West's current version, the WEST QR Kansai Area Pass, is ${QR_1_DAY} for 1 day, ¥4,700 for 2 days, ¥5,500 for 3 days and ${QR_4_DAY} for 4 days for an adult, with children aged 6 to 11 at ¥1,350 / ¥2,350 / ¥2,750 / ¥3,350. The older paper Kansai Area Pass it replaced was ¥2,800 / ¥4,800 / ¥5,800 / ¥7,000. All prices read off westjr.co.jp on ${CHECKED}.`,
  },
  {
    q: "Can I buy the Kansai Area Pass at the station or online in Japan?",
    a: `No. JR West states the WEST QR Kansai Area Pass is sold as a voucher by overseas travel agencies only — it cannot be bought at travel agencies in Japan or through JR-WEST Online Train Reservation, and JR West lists no station sale. You register the voucher on the WEST-QR website and press "Use ticket" after 04:00 on your first day; the QR code on your phone is the ticket. JR West does not publish different prices by sales channel. Checked ${CHECKED}.`,
  },
  {
    q: "Is the HARUKA single cheaper than the 1-day Kansai Area Pass now?",
    a: `Not to Kyoto. For tickets sold from 1 November 2026 the HARUKA One-way Ticket from Kansai Airport is ¥2,700 to Kyoto — the same as a 1-day pass — so the pass is the better buy for a Kyoto arrival. To Tennoji (¥1,600) or Osaka / Shin-Osaka (¥1,900) the single is cheaper, and the 1-day pass only wins if you take more JR rides the same day. Fares read off westjr.co.jp on ${CHECKED}.`,
  },
  {
    q: "Is the Kansai One Pass discontinued?",
    a: `Yes, it is being withdrawn — and it is a different product from the Kansai Area Pass. KANSAI ONE PASS is a rechargeable IC card for visitors, not a JR pass. In a joint notice dated 23 December 2024, JR West and nine other operators said sales would end operator by operator from 1 November 2025 as stock runs out, with all sales due to end by the end of fiscal 2026 (March 2027), when its shop and attraction perks also end. Cards already bought stay usable as a rechargeable IC card. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Kansai Area Pass discontinued?",
    a: `The old version is. JR West's own page states that sales of the Kansai Area Pass "ended as of September 30, 2026", and that passes bought by that date stay valid for their full validity period. What replaced it is the WEST QR Kansai Area Pass — the same 1-to-4-day product, slightly cheaper, delivered as a QR code you scan at the ticket gate instead of a paper pass. So the pass still exists; the thing that changed is how you buy and carry it. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Kansai Area Pass worth it?",
    a: `It usually is for a trip that flies into Kansai Airport and moves between Kansai cities by JR, and it usually is not for a trip spent inside one city. The clearest case: the discounted HARUKA One-way Ticket from Kansai Airport to Kyoto is ¥2,700 for tickets sold from 1 November 2026 — identical to a 1-day pass — so the pass is the same money with every other JR ride that day thrown in. The clearest case against: the pass covers no subway, no city bus and no private railway, so a Kyoto trip built around the Keihan and Hankyu lines gets almost nothing from it. Figures checked ${CHECKED}.`,
  },
  {
    q: "Can you use the Kansai Area Pass on the Haruka from Kansai Airport?",
    a: `Yes, and this is the point of it. The pass allows unlimited rides on non-reserved seats on the Limited Express HARUKA, plus an ordinary-car reserved seat on the HARUKA twice at no extra charge; the Green Car needs separate tickets. The HARUKA runs from Kansai Airport to Tennoji, Shin-Osaka and Kyoto. Book the two reserved seats on the WEST-QR website from 30 days before boarding — JR West says they cannot be booked on the train, at ticket machines or at ticket counters. Checked ${CHECKED}.`,
  },
  {
    q: "Does the Kansai Area Pass cover the Shinkansen?",
    a: `No. The Kansai Area Pass does not cover the Tokaido or Sanyo Shinkansen at any length, so Shin-Osaka to Kyoto by bullet train is a separate ticket even on a day your pass is valid. The HARUKA is the only limited express it covers; every other limited express needs its own ticket. If you want a Kansai pass with a shinkansen section, that is the 5-day Kansai WIDE Area Pass, ¥12,000 when read on ${WIDE_CHECKED}, which includes reserved Sanyo Shinkansen seats between Shin-Osaka and Okayama.`,
  },
  {
    q: "Does it work on the Osaka Metro, the Kyoto subway or city buses?",
    a: "No. This is a JR West product and it stops at JR gates. Inside Osaka you will still want an IC card or the Osaka Metro pass; inside Kyoto, the subway and bus day pass. The practical pattern for most Kansai trips is a rail pass for the days you move between cities and a city pass or IC card for the days you do not.",
  },
  {
    q: "Kansai Area Pass or Kansai Mini Pass?",
    a: "The difference is the HARUKA. The Kansai Mini Pass is ¥3,000 for 3 consecutive days and covers rapid and local JR West trains plus the Kansai-Airport Rapid Service, but a separate limited express ticket is required for the HARUKA. The 3-day Kansai Area Pass is ¥5,500 and includes the HARUKA outright. If you are happy riding the slower Kansai-Airport Rapid into Osaka and do not need the direct Kyoto run, the Mini Pass is ¥2,500 cheaper. If you are heading straight to Kyoto with luggage, pay for the Area Pass.",
  },
  {
    q: "Kansai Area Pass or a JAPAN RAIL PASS?",
    a: "They answer different trips. Since the 1 October 2026 revision the nationwide 7-day Ordinary pass is ¥50,000 on the official website or ¥53,000 as an Exchange Order from an overseas agency (japanrailpass.net, read 3 November 2026), and it covers most shinkansen across the country; the 4-day Kansai pass is ¥6,700 and covers ordinary JR trains in one region. If your whole trip is Kansai, the regional pass wins by an order of magnitude. The nationwide pass only starts to make sense once Tokyo, Hiroshima or Kyushu are in the itinerary — our JR Pass guide has the break-even arithmetic for that.",
  },
  {
    q: "How long is the pass valid, and does it have to be consecutive days?",
    a: "Consecutive days, and the clock is generous at one end only: the WEST QR version is valid from 04:00 on your start day to 24:00 on the last day, Japan time. A gap day in the middle of your Kansai leg is a day you have paid for and not used, which is the main reason a 4-day pass sometimes loses to two singles.",
  },
  {
    q: "Who is allowed to buy it?",
    a: "Holders of a passport issued by a foreign government, entering Japan with Temporary Visitor status. Japanese nationals cannot use the pass, and nor can non-Japanese passport holders with permanent residence in Japan. Checked on JR West's WEST QR page, 3 November 2026.",
  },
];

const TITLE = "JR Kansai Area Pass 2026: ¥2,700 a Day, HARUKA Included";
const DESCRIPTION =
  "JR Kansai Area Pass price 2026: ¥2,700 for 1 day, ¥6,700 for 4. Covers the HARUKA from Kansai Airport and JR local trains; no Shinkansen, subway or Hankyu.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/kansai-area-pass") } });

export default function KansaiAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kansai-area-pass" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kansai-area-pass" />
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
              route: "/guides/attractions/kansai-area-pass",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Kansai Area Pass", item: "https://www.japan-travel-kit.com/guides/attractions/kansai-area-pass" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: "/guides/attractions/kansai-area-pass",
              name: "WEST QR Kansai Area Pass",
              description: DESCRIPTION,
              brand: "JR West",
              currency: "JPY",
              lowPrice: 2700,
              highPrice: 6700,
              offerCount: 4,
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
          <span className={styles.breadCurrent}>Kansai Area Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            JR Kansai Area Pass (2026):<br />Price, Coverage &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            JR West stopped selling the paper version on 30 September 2026. The replacement is cheaper, it is
            a QR code, and it still turns the airport run into the whole region.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official JR West prices", "What changed on 1 October"].map((t) => (
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

        {/* The answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The <strong>JR Kansai Area Pass</strong> costs <strong>{QR_1_DAY} for 1 day and {QR_4_DAY} for 4 days</strong>{" "}
            as a WEST QR ticket, the version JR West sells now that the paper pass ended on 30 September 2026. It
            pays for itself fastest on the airport run: the HARUKA from Kansai Airport is included, then JR trains
            to Kyoto, Osaka, Kobe, Nara and Himeji. It does not cover the Shinkansen, the subways or private
            railways such as Hankyu. Prices read off westjr.co.jp on {CHECKED}.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1 day</p>
                <p className={styles.verdictStatValue}>{QR_1_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>4 days</p>
                <p className={styles.verdictStatValue}>{QR_4_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Haruka</p>
                <p className={styles.verdictStatValue}>Included (2 reserved)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinkansen</p>
                <p className={styles.verdictStatValue}>Not included</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>JR Kansai Area Pass</strong> costs <strong>{QR_1_DAY} for 1 day</strong>, ¥4,700 for
              2, ¥5,500 for 3 and <strong>{QR_4_DAY} for 4 days</strong> (adult; children 6–11 half — JR
              West&apos;s WEST QR Kansai Area Pass, read off westjr.co.jp on {CHECKED}). It gives unlimited
              non-reserved rides on the <strong>HARUKA between Kansai Airport and Tennoji, Shin-Osaka and
              Kyoto</strong> (plus two reserved seats) and on JR West Special Rapid, Rapid and Local trains
              around Osaka, Kyoto, Kobe, Nara and Himeji. It does <strong>not</strong> cover the shinkansen,
              any other limited express, the Osaka Metro or Kyoto subway, city buses, or the private railways
              — Hankyu, Keihan, Kintetsu and Nankai. It pays off when you <strong>land at Kansai Airport and
              head for Kyoto</strong>: the HARUKA single to Kyoto is also ¥2,700, so the 1-day pass costs the
              same and every other JR ride that day is free. The paper version stopped selling on 30 September
              2026.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kansai Area Pass on Klook →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Single Haruka Ticket Instead →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Kansai Area Pass?</h2>
          <p className={styles.bodyText}>
            It is the smallest and cheapest of JR West&apos;s regional passes, and the one most first-time
            Kansai visitors actually need. For 1 to 4 consecutive days it gives unlimited rides on JR West
            ordinary trains — local, Rapid and Special Rapid — inside an area JR West describes as covering{" "}
            <strong>Osaka, Kyoto, Kobe, Nara, Himeji, Wakayama, Otsu, Tsuruga and Iga-Ueno</strong>, and it
            adds the one thing a plain IC card cannot: the Kansai-Airport Express HARUKA, unlimited in
            non-reserved seats and twice in an ordinary-car reserved seat.
          </p>
          <p className={styles.bodyText}>
            One change matters more than the price in 2026. JR West&apos;s own page now states that sales of
            the Kansai Area Pass <strong>ended as of 30 September 2026</strong>, with passes bought before
            that date still valid for their full period. The product has not gone away — it has become the{" "}
            <strong>WEST QR Kansai Area Pass</strong>, the same 1-to-4-day coverage sold as a QR code you
            register online and scan at the gate, at slightly lower prices. If you read an older guide
            quoting ¥2,800 for a day, that is the superseded figure.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much is the JR Kansai Area Pass in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {QR_1_DAY} for 1 day up to {QR_4_DAY} for 4 consecutive days for an adult, and exactly half for a
            child aged 6 to 11. JR West sells it only as a WEST QR voucher through overseas travel agencies — not
            at stations, not at travel agencies in Japan and not through JR-WEST Online Train Reservation — and
            publishes no separate price by sales channel.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Length", "WEST QR adult", "WEST QR child", "Old pass, adult", "Old pass, child"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.days}</td>
                      <td className={styles.tdPrice}>{row.qrAdult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.qrChild}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.oldAdult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.oldChild}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Both columns read off westjr.co.jp on {CHECKED}. The WEST QR prices are the ones in force; the
            old-pass column is there only so you can recognise a stale quote. The QR version is valid from
            04:00 on the start day to 24:00 on the last day, Japan time, over consecutive days. Child rates
            are for ages 6 to 11 and are exactly half the adult figure at every length.
          </p>
        </section>

        {/* Lines table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Included vs not</span>
          <h2 className={styles.sectionTitle}>What does the Kansai Area Pass cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR West ordinary trains — Special Rapid, Rapid and Local — inside the Kansai valid area, plus the
            HARUKA airport express (unlimited non-reserved, two reserved seats). Nothing else: no shinkansen, no
            other limited express, no subway, bus or private railway. The exclusions decide this purchase more
            often than the inclusions do.
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
                  {lineRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allowed}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Coverage read off westjr.co.jp on {CHECKED}. For the city layer the pass leaves out, see{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Osaka
            </Link>{" "}
            and{" "}
            <Link href="/guides/transport/kyoto-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Kyoto
            </Link>
            , both of which cover the subway, bus and{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              IC card
            </Link>{" "}
            options you will still need on top.
          </p>
        </section>

        {/* Airport use */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>From the airport</span>
          <h2 className={styles.sectionTitle}>Can I use the Kansai Area Pass on the Haruka from Kansai Airport?</h2>
          <p className={styles.bodyText}>
            Yes — non-reserved seats on the HARUKA without limit, plus an ordinary-car reserved seat twice; the
            Green Car is extra. Press &quot;Use ticket&quot; on your arrival day (after 04:00), scan the QR code
            at the JR gate at Kansai Airport and board the HARUKA to <strong>Tennoji</strong>,{" "}
            <strong>Shin-Osaka</strong> or <strong>Kyoto</strong>.
          </p>
          <p className={styles.bodyText}>
            The two reserved seats are what you want on the day you are carrying cases. JR West states they are
            booked on the WEST-QR website from 30 days before boarding, and cannot be booked on the train, at
            ticket machines or at ticket counters — so book them before you fly. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            For Namba and the Dotonbori side of Osaka, the HARUKA does not help — that is the Nankai, which
            the pass does not cover. Our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={{ color: "var(--red)", fontWeight: 600 }}>
              Haruka vs Nankai Rapi:t comparison
            </Link>{" "}
            sets the two routes against each other by destination rather than by fare, and the broader{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka airport transfer guide
            </Link>{" "}
            covers Itami as well. In short: your hotel decides whether this pass is the right airport ticket
            at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Kansai Area Pass with the Haruka →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Haruka One-way Ticket →
            </KlookLink>
          </div>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Kansai Area Pass vs the Haruka Ticket, Mini Pass and JR Pass</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Price (adult)", "What it covers", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            JR West figures read off westjr.co.jp on {CHECKED} (the Kansai WIDE Area Pass on {WIDE_CHECKED});
            the nationwide pass off japanrailpass.net and the OSAKA AMAZING PASS off its official site, both on{" "}
            {CHECKED}. The HARUKA One-way Ticket is the discounted single for foreign passport holders entering
            as temporary visitors; the fares shown apply to tickets sold from 1 November 2026, when JR West
            raised them — the Kyoto single now equals the 1-day pass. For the nationwide pass break-even, see
            our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>
            . ICOCA &amp; HARUKA is left out: JR West&apos;s current English pages did not show a price for it
            on the check date.
          </p>
        </section>

        {/* Is the pass worth it — judgement table, with the CTA directly after */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Is the pass worth it?</span>
          <h2 className={styles.sectionTitle}>Is the Kansai Area Pass worth it?</h2>
          <p className={styles.bodyText}>
            Yes if you fly into Kansai Airport and travel between Kansai cities by JR; no if you stay in one
            city on the subway. The test is simple: add up the HARUKA singles and JR fares you would otherwise
            buy, and compare.
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Round trip on HARUKA singles", "Singles total", "Pass for the same days", "Difference"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Kansai Airport → Kyoto, then Osaka → Kansai Airport, 3 days</td>
                    <td>¥2,700 + ¥1,900 = ¥4,600</td>
                    <td className={styles.tdPrice}>¥5,500 (3-day)</td>
                    <td style={{ fontSize: "0.88rem" }}>Pass needs ¥900 of other JR rides over 3 days</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Kansai Airport → Kyoto, then Kyoto → Kansai Airport, 4 days</td>
                    <td>¥2,700 + ¥2,700 = ¥5,400</td>
                    <td className={styles.tdPrice}>{QR_4_DAY} (4-day)</td>
                    <td style={{ fontSize: "0.88rem" }}>Pass needs ¥1,300 of other JR rides over 4 days</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Kansai Airport → Kyoto only, same-day JR hops</td>
                    <td>¥2,700</td>
                    <td className={styles.tdPrice}>{QR_1_DAY} (1-day)</td>
                    <td style={{ fontSize: "0.88rem" }}>Same price — every other JR ride that day is free</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Kansai Airport → Tennoji only, nothing else</td>
                    <td>¥1,600</td>
                    <td className={styles.tdPrice}>{QR_1_DAY} (1-day)</td>
                    <td style={{ fontSize: "0.88rem" }}>Single is ¥1,100 cheaper — skip the pass</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            HARUKA One-way Ticket fares (tickets sold from 1 November 2026) and pass prices read off
            westjr.co.jp on {CHECKED}, adult. The single is a one-way product, so a round trip is two singles.
            The pass covers the return only if both airport runs fall inside its consecutive days.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              The pass pays — check the Kansai Area Pass →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              The single wins — check the Haruka ticket →
            </KlookLink>
          </div>
          <KlookTripPrep
            label="Book for the same days"
            heading="What to Book Alongside the Kansai Area Pass"
            intro="The pass moves you between cities; the rest of those days is a guided day where the JR lines stop short, a bed on the JR lines the pass covers and data for the QR code. No prices are quoted — open each listing for the current figure."
            items={kansaiAreaPassSameDayPrep}
          />
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
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things to settle on the listing rather than here, because neither is a published fare: which
            version of the pass is being sold for your travel date — the QR code or an exchange order you
            collect in Japan — and the cancellation terms, which matter because the pass is tied to
            consecutive dates you nominate. Vouchers are typically sold with a redemption window rather than a
            fixed date, so check that window against your flight before you buy.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Kansai Area Pass →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Compare a Single Haruka Ticket →
            </KlookLink>
          </div>
        </section>

        {/* Break-even itineraries */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Which Itineraries Pay the Pass Back?</h2>
          <p className={styles.bodyText}>
            The honest comparator for a visitor is not the standard fare but the discounted{" "}
            <strong>HARUKA One-way Ticket</strong>, which is the cheapest legitimate airport single JR West
            sells to foreign passport holders. For tickets sold from <strong>1 November 2026</strong> that is
            ¥1,600 to Tennoji, ¥1,900 to Osaka or Shin-Osaka, ¥2,700 to Kyoto, ¥2,300 to Kobe and ¥2,200 to
            Nara. Those are the numbers the pass has to beat.
          </p>
          <p className={styles.bodyText}>
            <strong>A Kyoto arrival, 1-day pass ({QR_1_DAY}).</strong> The Kyoto single is ¥2,700 — the pass
            price exactly. You pay nothing extra for the airport run and every JR ride that day, including a
            Kyoto–Nara or Kyoto–Osaka hop, rides free on top.
          </p>
          <p className={styles.bodyText}>
            <strong>Four days across Kansai, 4-day pass ({QR_4_DAY}).</strong> Fly into Kansai and out of it:
            Kyoto in at ¥2,700 and Osaka out at ¥1,900 is ¥4,600 of the {QR_4_DAY} spent on
            the two airport legs alone. The remaining ¥2,100 has to come from four days of intercity hops —
            Kyoto to Nara, Osaka to Kobe, Osaka to Himeji — which it comfortably does if you use JR for them.
            It does <em>not</em> if those days are spent inside one city on the subway, because none of that is
            on the pass.
          </p>
          <p className={styles.bodyText}>
            <strong>Where it fails.</strong> A trip with a gap day in the middle of the pass window, or one
            that reaches Nara on the Kintetsu and Arashiyama on the Hankyu, or one that includes a shinkansen
            leg to Tokyo. In all three the arithmetic is lost before you start. Fares checked {CHECKED}.
          </p>
        </section>

        {/* Kansai One Pass — a different product people search alongside this one */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Not the same product</span>
          <h2 className={styles.sectionTitle}>Is the Kansai One Pass discontinued?</h2>
          <p className={styles.bodyText}>
            Yes — sales are being wound down, and it was never a JR rail pass. KANSAI ONE PASS is a
            rechargeable transit IC card for visitors. In a joint notice dated 23 December 2024, JR West, Hankyu,
            Kintetsu, Keihan, Nankai, Hanshin, Osaka Metro, Osaka City Bus and the Kyoto and Kobe municipal
            transport bureaus said each operator would stop selling it from 1 November 2025 once its stock ran
            out, with all sales due to end by the end of fiscal 2026 (March 2027).
          </p>
          <p className={styles.bodyText}>
            The same notice says cards already bought keep working as a rechargeable IC card, while the shop and
            attraction perks end with fiscal 2026. The card was never a substitute for the Kansai Area Pass: an IC
            card pays each fare, the pass replaces them. Checked {CHECKED}.
          </p>
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
          heading="The Two Kansai Rail Passes Side by Side"
          intro="Both listings are the JR West products described above, sold with an English checkout. The Area Pass includes the Haruka; the Mini Pass is cheaper and does not. Open a listing for the current price on your dates."
          tours={[jrKansaiAreaPass, jrKansaiMiniPass]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 6 Nov 2026: the Kii Mountains pilgrimage road, as a day from Osaka or a two-day walk. */}
            <Link href="/guides/attractions/kumano-kodo-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kumano Kodo Tour (2026): Day Trips, the Nakahechi and How Far You Walk</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 6 Nov 2026: the sandbar and the Ine boathouses as a day out. */}
            <Link href="/guides/attractions/amanohashidate-ine-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Amanohashidate Day Trip (2026): Ine Boathouses, Tours and Trains From Kyoto</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 5 Nov 2026: west of the pass area, for a longer loop. */}
            <Link href="/guides/attractions/hiroshima-peace-memorial-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hiroshima Peace Memorial Tour: Guides, Museum &amp; Tickets</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            {/* Added 30 Oct 2026: the itinerary this pass is usually bought for, with the three-day break-even worked through. */}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Kyoto 3 Day Itinerary (2026): Day by Day &amp; Bookings</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 3 Nov 2026 (jtk-20261103-06): two JR day trips the pass covers end to end. */}
            <Link href="/guides/attractions/himeji-castle-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V9l3-2 4 2 4-2 3 2v12" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Himeji Castle Day Trip (2026): ¥2,500 Admission and Times</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kobe-day-trip-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kobe Day Trip from Osaka (2026): Routes, the Beef and What Fits in a Day</p>
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
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-6-7 10-3-4z" />
                  <path d="M12 16l-1 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18M7 21l1.5-4M17 21l-1.5-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
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
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
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
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
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
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18h18M6 18V9l6-5 6 5v9" />
                  <path d="M9 18v-5h6v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?</p>
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
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Turn the airport run into the whole region</h2>
            <p className={styles.ctaBannerDesc}>
              One to four days of JR West trains around Osaka, Kyoto, Kobe, Nara and Himeji, with the Haruka
              from Kansai Airport included. If the airport run is your only JR ride, buy the single instead.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Kansai Area Pass →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Haruka Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
