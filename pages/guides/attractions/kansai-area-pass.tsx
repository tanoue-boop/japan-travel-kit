import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { jrHarukaUrl, jrKansaiAreaPass, jrKansaiMiniPass } from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA links — both in Klook's 5% passes-and-transport band. The pass listing (1107)
// is a new constant in lib/klook-links.ts, confirmed live through the www.klook.com
// search index on 25 Oct 2026; the Haruka link (18400) is the one
// /guides/transport/haruka-vs-nankai-rapit already uses, reused rather than re-minted.
const KANSAI_PASS_URL = jrKansaiAreaPass.url;
const HARUKA_URL = jrHarukaUrl;

// Every yen figure on this page was read off westjr.co.jp on 25 October 2026: the
// WEST QR Kansai Area Pass page for the current prices and rules, the (now
// sales-ended) Kansai Area Pass page for the superseded prices and the valid area,
// the Kansai Mini Pass and Kansai WIDE Area Pass pages, and the HARUKA One-way
// Ticket page for the airport singles the pass is measured against.
const CHECKED = checkedLabel("2026-10-25");

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
    note: "Two reserved seats are included at no extra charge. Reserve before boarding — JR West states you cannot reserve on the train.",
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
    note: "JR West states Keihan and Hankyu require separate vouchers. Kyoto's and Osaka's handiest lines for sightseeing are often these, not JR.",
  },
  {
    service: "Osaka Metro, Kyoto subway and city buses",
    allowed: "✗ Not covered",
    note: "No subway, no city bus. Inside either city you still need an IC card or a city pass on top.",
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
    price: "¥2,200 to Kyoto through 31 October 2026; ¥2,700 from 1 November 2026",
    covers: "One airport journey only — no travel between cities afterwards",
    pick: "Only if the airport run is the single JR ride of your whole trip",
  },
  {
    option: "Kansai WIDE Area Pass",
    price: "¥12,000 for 5 consecutive days, adult (¥6,000 child)",
    covers: "Everything above plus reserved Sanyo Shinkansen seats Shin-Osaka ⇄ Okayama, and Takamatsu, Kinosaki Onsen, Amanohashidate, Tottori and Shirahama",
    pick: "If Himeji is not the far edge of your trip — day trips beyond Kansai change the answer",
  },
  {
    option: "JAPAN RAIL PASS (nationwide)",
    price: "From ¥50,000 for 7 days, Ordinary Car",
    covers: "Nationwide JR including most shinkansen — far more than Kansai, at roughly seven times the 4-day Kansai price",
    pick: "Only once Tokyo is in the itinerary; see our JR Pass guide for the break-even",
  },
];

const worthRows = [
  {
    plan: "Flying into Kansai Airport and going straight to Kyoto",
    verdict: "✓ Buy the 1-day pass",
    why: `From 1 November 2026 the discounted HARUKA One-way Ticket to Kyoto is ¥2,700 — exactly the price of a 1-day pass. At that point the pass costs nothing extra and every JR ride you take the same day is free on top. Before 1 November the single is ¥2,200, so the pass needs about ¥500 of further JR travel to break even.`,
  },
  {
    plan: "Three or four days of Osaka, Kyoto, Nara and Kobe with JR between them",
    verdict: "✓ Buy the 3- or 4-day pass",
    why: `${QR_4_DAY} over four days covers both airport runs and the intercity hops. The airport legs alone — ¥2,700 in to Kyoto and ¥1,900 out to Osaka from 1 November 2026 — are ¥4,600 of the ¥6,700, leaving very little to make up.`,
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
    title: "Reserve your two HARUKA seats before you board",
    desc: "The pass includes unlimited HARUKA non-reserved travel plus an ordinary-car reserved seat twice. JR West states reserved seating cannot be booked on the train, so do it at a ticket office or online — worth it on the airport run with luggage, and worth saving for the two legs where you will have cases.",
  },
  {
    title: "Buy the voucher before you fly, then activate it on the day",
    desc: "JR West sells the WEST QR version as a voucher through overseas travel agencies and resellers; you register it on the WEST-QR site, then press the \"Use ticket\" button after 04:00 on your start day and scan the QR code at the gates. There is no paper pass and no exchange queue — but you do need a working phone, which is its own argument for having data on arrival.",
  },
  {
    title: "Have your passport with you",
    desc: "Eligibility is a foreign-government passport with Temporary Visitor entry status. Carry it when you collect or activate the pass; Japanese nationals and foreign residents of Japan are not eligible at all.",
  },
];

const faqItems = [
  {
    q: "How much is the Kansai Area Pass?",
    a: `JR West's current version, the WEST QR Kansai Area Pass, is ${QR_1_DAY} for 1 day, ¥4,700 for 2 days, ¥5,500 for 3 days and ${QR_4_DAY} for 4 days for an adult, with children aged 6 to 11 at exactly half those figures. The older Kansai Area Pass it replaced was ¥2,800 / ¥4,800 / ¥5,800 / ¥7,000. All prices read off westjr.co.jp on ${CHECKED}.`,
  },
  {
    q: "Is the Kansai Area Pass discontinued?",
    a: `The old version is. JR West's own page states that sales of the Kansai Area Pass "ended as of September 30, 2026", and that passes bought by that date stay valid for their full validity period. What replaced it is the WEST QR Kansai Area Pass — the same 1-to-4-day product, slightly cheaper, delivered as a QR code you scan at the ticket gate instead of a paper pass. So the pass still exists; the thing that changed is how you buy and carry it. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Kansai Area Pass worth it?",
    a: `It usually is for a trip that flies into Kansai Airport and moves between Kansai cities by JR, and it usually is not for a trip spent inside one city. The clearest case: from 1 November 2026 the discounted HARUKA One-way Ticket from Kansai Airport to Kyoto is ¥2,700 — identical to a 1-day pass — so the pass is the same money with every other JR ride that day thrown in. The clearest case against: the pass covers no subway, no city bus and no private railway, so a Kyoto trip built around the Keihan and Hankyu lines gets almost nothing from it. Figures checked ${CHECKED}.`,
  },
  {
    q: "Can you use the Kansai Area Pass on the Haruka from Kansai Airport?",
    a: "Yes, and this is the point of it. The pass allows unlimited rides on non-reserved seats on the Limited Express HARUKA, plus an ordinary-car reserved seat on the HARUKA twice at no extra charge. The HARUKA runs from Kansai Airport to Tennoji, Shin-Osaka and Kyoto. Reserve the two seats in advance — JR West says reserved seating cannot be booked once you are on board.",
  },
  {
    q: "Does the Kansai Area Pass cover the Shinkansen?",
    a: "No. The Kansai Area Pass does not cover the Tokaido or Sanyo Shinkansen at any length, so Shin-Osaka to Kyoto by bullet train is a separate ticket even on a day your pass is valid. The HARUKA is the only limited express it covers; every other limited express needs its own ticket. If you want a Kansai pass with a shinkansen section, that is the 5-day Kansai WIDE Area Pass at ¥12,000, which includes reserved Sanyo Shinkansen seats between Shin-Osaka and Okayama.",
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
    a: "They answer different trips. The nationwide pass starts at ¥50,000 for 7 days and covers most shinkansen across the country; the 4-day Kansai pass is ¥6,700 and covers ordinary JR trains in one region. If your whole trip is Kansai, the regional pass wins by an order of magnitude. The nationwide pass only starts to make sense once Tokyo, Hiroshima or Kyushu are in the itinerary — our JR Pass guide has the break-even arithmetic for that.",
  },
  {
    q: "How long is the pass valid, and does it have to be consecutive days?",
    a: "Consecutive days, and the clock is generous at one end only: the WEST QR version is valid from 04:00 on your start day to 24:00 on the last day, Japan time. A gap day in the middle of your Kansai leg is a day you have paid for and not used, which is the main reason a 4-day pass sometimes loses to two singles.",
  },
  {
    q: "Who is allowed to buy it?",
    a: "Holders of a passport issued by a foreign government, entering Japan with Temporary Visitor status. Japanese nationals cannot use the pass, and nor can non-Japanese passport holders with permanent residence in Japan. You need to present the passport when you collect or activate it, so the name on the voucher has to match.",
  },
];

const TITLE = "Kansai Area Pass (2026): Prices and Is It Worth It?";
const DESCRIPTION =
  "Kansai Area Pass prices for 2026: JR West now sells the WEST QR version at ¥2,700 for 1 day to ¥6,700 for 4 — what it covers, and whether it pays off.";

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
            Kansai Area Pass (2026):<br />Prices, What It Covers &amp; Is It Worth It?
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
              The <strong>Kansai Area Pass</strong> is JR West&apos;s 1-to-4-day ticket for unlimited travel on
              JR West local, rapid and special rapid trains around <strong>Osaka, Kyoto, Kobe, Nara and
              Himeji</strong>, plus the Kansai-Airport Express <strong>HARUKA</strong> from Kansai Airport —
              about 75 minutes to Kyoto, 30 to Tennoji. JR West <strong>ended sales of the old pass on 30
              September 2026</strong>; the current product is the <strong>WEST QR Kansai Area Pass</strong> at{" "}
              {QR_1_DAY} for 1 day, ¥4,700 for 2, ¥5,500 for 3 and {QR_4_DAY} for 4, adult, with children
              aged 6 to 11 at half. It does <strong>not</strong> cover the shinkansen, any limited express
              other than the HARUKA, the subways, city buses, or the private railways — Hankyu, Keihan,
              Kintetsu and Nankai all charge separately. Prices read off westjr.co.jp on {CHECKED}.
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
          <h2 className={styles.sectionTitle}>How Much Is the Kansai Area Pass?</h2>
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
          <h2 className={styles.sectionTitle}>Which Trains Can You Use It On?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The exclusions decide this purchase more often than the inclusions do. Read the bottom half of the
            table first.
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
          <h2 className={styles.sectionTitle}>How Do You Use It From Kansai Airport to Kyoto or Osaka?</h2>
          <p className={styles.bodyText}>
            Activate the pass on your arrival day and walk to the HARUKA platform at Kansai Airport. The
            HARUKA runs to <strong>Tennoji</strong>, <strong>Shin-Osaka</strong> and <strong>Kyoto</strong>,
            and the pass covers non-reserved seats on it without limit — plus two ordinary-car reserved seats,
            which is what you want on the day you are carrying cases. JR West states that reserved seats
            cannot be booked once you are aboard, so do it at the ticket office before you board.
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
            Every figure read off westjr.co.jp on {CHECKED}, except the nationwide pass — see our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            for the current price and the break-even calculator. Note the date on the HARUKA One-way Ticket
            row: JR West has published a price rise from 1 November 2026, taking the Kyoto single from ¥2,200
            to ¥2,700 and the Tennoji single from ¥1,300 to ¥1,600. That rise is what makes the 1-day pass a
            straightforward buy from November.
          </p>
        </section>

        {/* Is the pass worth it — judgement table, with the CTA directly after */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Is the pass worth it?</span>
          <h2 className={styles.sectionTitle}>Is the Kansai Area Pass Worth It for Your Trip?</h2>
          <div className={styles.tableWrap}>
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
            sells to foreign passport holders. Through 31 October 2026 that is ¥1,300 to Tennoji, ¥1,800 to
            Osaka or Shin-Osaka, ¥2,200 to Kyoto, ¥2,000 to Kobe and ¥1,800 to Nara. From{" "}
            <strong>1 November 2026</strong> the same tickets become ¥1,600, ¥1,900, ¥2,700, ¥2,300 and
            ¥2,200. Those are the numbers the pass has to beat.
          </p>
          <p className={styles.bodyText}>
            <strong>A Kyoto arrival, 1-day pass ({QR_1_DAY}).</strong> From 1 November the Kyoto single is
            ¥2,700 — the pass price exactly. You pay nothing extra for the airport run and every JR ride that
            day, including a Kyoto–Nara or Kyoto–Osaka hop, rides free on top. Before 1 November the single is
            ¥2,200 and the pass needs about ¥500 of further JR travel to break even, which one trip out to
            Nara or Kobe clears.
          </p>
          <p className={styles.bodyText}>
            <strong>Four days across Kansai, 4-day pass ({QR_4_DAY}).</strong> Fly into Kansai and out of it:
            from 1 November, Kyoto in at ¥2,700 and Osaka out at ¥1,900 is ¥4,600 of the {QR_4_DAY} spent on
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
