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
  hiroshimaMiyajimaFerryDayTour,
  hiroshimaMiyajimaJoinDayTour,
  jrKansaiHiroshimaAreaPass,
  jrPassWholeJapan,
  kansaiHiroshimaPassTripPrep,
  osakaHiroshimaMiyajimaBulletTrainDayTrip,
  shinkansenOsakaHiroshima,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * JR West Kansai-Hiroshima Area Pass, added 21 Nov 2026 (task-jtk-20261121-02).
 *
 * How it splits from its neighbours — this page is the pass that reaches Hiroshima:
 *  - kansai-area-pass is Kansai only (no shinkansen at all), 1–4 days
 *  - osaka-to-hiroshima-shinkansen is the train itself, all tickets compared
 *  - hiroshima-2-day-itinerary / hiroshima-miyajima-day-trip are what to do there
 *
 * Every figure below was read on 21 Nov 2026 by node fetch:
 *  - pass ¥17,000 / ¥8,500, 5 consecutive days, 0:00 to 24:00; reserved Sanyo Shinkansen
 *    Shin-Osaka ⇔ Hiroshima; reserved HARUKA, KUROSHIO, KONOTORI, KINOSAKI; JR West
 *    conventional lines; JR West Miyajima Ferry with the ¥100 visitor tax; WEST JAPAN JR
 *    BUS route buses, not expressway buses; not Hiroshima ⇔ Hakata, Tokaido or Kyushu
 *    Shinkansen; Green cars need extra tickets; foreign passport + Temporary Visitor;
 *    exchange order bought abroad, exchanged within 3 months:
 *    westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_hiroshima/
 *  - Kansai WIDE Area Pass ¥12,000 / ¥6,000, 5 days: .../jrwest-rail-pass/kansai_wide/
 *  - WEST QR Kansai Area Pass ¥2,700 / ¥4,700 / ¥5,500 / ¥6,700 (1–4 days), no shinkansen:
 *    westjr.co.jp/global/en/ticket/westqr/kansaiarea/
 *  - HARUKA One-way Ticket, Kansai Airport → Osaka / Shin-Osaka ¥1,900, → Kyoto ¥2,700:
 *    westjr.co.jp/global/en/ticket/westqr/haruka/
 *  - Smart EX, NOZOMI / MIZUHO, regular season, adult one way (product sold from
 *    15 Sep 2026): Shin-Osaka ⇔ Hiroshima ¥10,750 reserved, ¥9,890 non-reserved;
 *    Shin-Osaka ⇔ Okayama ¥6,260 reserved: tickets.jr-odekake.net shnId=126000198
 *  - JAPAN RAIL PASS 7-day Ordinary ¥50,000 online / ¥53,000 overseas; NOZOMI / MIZUHO
 *    need a special ticket for pass holders: japanrailpass.net/en/purchase/price/ and /en/about_jrp/
 * No Klook price is printed.
 */
const CHECKED_ISO = "2026-11-21";
const CHECKED = checkedLabel(CHECKED_ISO);

const PASS_URL = "https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_hiroshima/";
const WIDE_URL = "https://www.westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai_wide/";
const AREA_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";
const HARUKA_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/haruka/";
const SMARTEX_URL = "https://tickets.jr-odekake.net/shohindb/view/consumer/tokutoku/detail.html?shnId=126000198&depArea=02";
const JRP_PRICE_URL = "https://japanrailpass.net/en/purchase/price/";
const JRP_ABOUT_URL = "https://japanrailpass.net/en/about_jrp/";

const PASS = "¥17,000";
const SINGLE = "¥10,750";
const RETURN = "¥21,500";
const SAVING = "¥4,500";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

// (1) Pass × price × days × coverage. Row 1 is the answer.
const passRows: ReactNode[][] = [
  ["Short answer", `${PASS}, 5 days`, "The only JR West pass in this list that reaches Hiroshima by shinkansen", "Kansai plus a Hiroshima day or night"],
  [
    "Kansai-Hiroshima Area Pass",
    `${PASS} adult · ¥8,500 child · 5 consecutive days`,
    "Reserved Sanyo Shinkansen seats Shin-Osaka ⇔ Hiroshima; reserved HARUKA, KUROSHIO, KONOTORI, KINOSAKI; JR West local and rapid lines; JR Miyajima Ferry; West JR Bus route buses",
    "Osaka / Kyoto base with Hiroshima and Miyajima in the five days",
  ],
  [
    "Kansai WIDE Area Pass",
    "¥12,000 adult · ¥6,000 child · 5 consecutive days",
    "Reserved Sanyo Shinkansen seats Shin-Osaka ⇔ Okayama only, plus Kinosaki, Amanohashidate, Shirahama, Takamatsu and Tottori",
    "Okayama or Himeji, not Hiroshima",
  ],
  [
    "Kansai Area Pass (WEST QR)",
    "¥2,700 (1 day) · ¥4,700 (2) · ¥5,500 (3) · ¥6,700 (4), adult",
    "JR West ordinary trains around Osaka, Kyoto, Nara, Kobe and Himeji; HARUKA non-reserved, plus two reserved rides. No shinkansen at all",
    "Kansai only",
  ],
  [
    "JAPAN RAIL PASS, 7-day Ordinary",
    "¥50,000 online · ¥53,000 through an overseas agent",
    "All JR lines; the NOZOMI and MIZUHO need a special extra ticket for pass holders",
    "Tokyo and Hiroshima in the same week",
  ],
];

// (2) Osaka ⇄ Hiroshima on singles against the pass. Row 1 is the answer.
const breakEvenRows: ReactNode[][] = [
  ["Short answer: one Osaka ⇄ Hiroshima return", RETURN, PASS, `Pass ${SAVING} cheaper`],
  ["Shin-Osaka ⇄ Hiroshima return, reserved (Smart EX ¥10,750 × 2)", RETURN, PASS, `Pass ${SAVING} cheaper`],
  ["Same return, non-reserved (¥9,890 × 2)", "¥19,780", PASS, "Pass ¥2,780 cheaper"],
  ["Return + HARUKA Kansai Airport ⇄ Shin-Osaka (¥1,900 × 2)", "¥25,300", PASS, "Pass ¥8,300 cheaper"],
  ["Return + HARUKA Kansai Airport ⇄ Kyoto (¥2,700 × 2)", "¥26,900", PASS, "Pass ¥9,900 cheaper"],
  ["One way only, Shin-Osaka → Hiroshima, then on west", SINGLE, PASS, "Single ¥6,250 cheaper — the pass stops at Hiroshima"],
  ["Shin-Osaka ⇄ Okayama return only (¥6,260 × 2)", "¥12,520", PASS, "Single ¥4,480 cheaper; the ¥12,000 WIDE pass is the one to price"],
];

const faqItems = [
  {
    q: "Is the Kansai Hiroshima Area Pass worth it?",
    a: `Yes, if your five days include one Osaka–Hiroshima return. JR's own Smart EX price for a reserved Shin-Osaka–Hiroshima seat is ${SINGLE} one way, so the return is ${RETURN}; the pass is ${PASS} and saves ${SAVING} before you count the HARUKA from Kansai Airport, the Kansai local trains or the Miyajima ferry. It is not worth it for a one-way trip to Hiroshima and on west, or for Okayama alone. Checked ${CHECKED}.`,
  },
  {
    q: "Does it cover the shinkansen to Hiroshima?",
    a: "Yes. JR West lists reserved seats on the Sanyo Shinkansen between Shin-Osaka and Hiroshima as included, and names no train type as excluded on that section. Book each seat before boarding; non-reserved seats are not available on all-reserved trains, and Green Car seats need extra tickets. It does not cover Hiroshima to Hakata, the Tokaido Shinkansen to Kyoto or Tokyo, or the Kyushu Shinkansen.",
  },
  {
    q: "Kansai Hiroshima pass vs JR Pass: which is better?",
    a: `The Kansai-Hiroshima Area Pass, unless Tokyo is in the same week. It is ${PASS} for 5 days against ¥50,000 for the 7-day JAPAN RAIL PASS bought online (¥53,000 through an overseas agent), and the national pass still needs a special extra ticket for the NOZOMI and MIZUHO. The JR Pass only makes sense if a Tokyo–Kansai shinkansen journey and Hiroshima fall inside one 7-day window.`,
  },
  {
    q: "Can you visit Miyajima with the Kansai Hiroshima pass?",
    a: "Yes. JR West lists the JR West Miyajima Ferry (Miyajimaguchi ⇔ Miyajima) as included, along with local trains on JR West lines in the valid area; Miyajimaguchi is on the JR Sanyo Line west of Hiroshima, so check it on JR West's area map before you go. The Miyajima Visitor Tax of ¥100 is paid separately on boarding. The other operator's ferry from the same pier is not a JR West service and is not on the pass.",
  },
  {
    q: "How much is the JR West Kansai Hiroshima pass?",
    a: `${PASS} for an adult and ¥8,500 for a child aged 6–11, for 5 consecutive days, valid from 0:00 on the first day to 24:00 on the last. There is one length only. JR West sells it to holders of a foreign passport entering Japan as a Temporary Visitor, through JR-WEST ONLINE TRAIN RESERVATION from one month before or as an exchange order from a travel agency, exchanged within 3 months. Checked on JR West's own page ${CHECKED}.`,
  },
  {
    q: "What is the difference between the Kansai Area Pass and the Kansai Hiroshima Area Pass?",
    a: "Hiroshima. The Kansai Area Pass (¥2,700–¥6,700 for 1–4 days) covers JR West ordinary trains and the HARUKA around Osaka, Kyoto, Nara and Kobe and cannot be used on the shinkansen at all. The Kansai-Hiroshima Area Pass (¥17,000, 5 days) adds reserved Sanyo Shinkansen seats as far as Hiroshima, the limited expresses and the Miyajima ferry. If Hiroshima is not on the trip, the cheaper pass is the right one.",
  },
  {
    q: "Does the Kansai Hiroshima pass cover the HARUKA from Kansai Airport?",
    a: "Yes, including reserved seats. JR West lists the HARUKA among the limited expresses whose reserved seats are included, so the airport run at the start or end of your five days costs nothing more. Outside the five days, the HARUKA One-way Ticket is ¥1,900 to Osaka or Shin-Osaka and ¥2,700 to Kyoto.",
  },
];

// The primary query leads the title, H1 and description word for word.
const TITLE = "Kansai Hiroshima Area Pass 2026: ¥17,000 & Is It Worth It?";
const DESCRIPTION =
  "Kansai Hiroshima Area Pass: JR West Kansai Hiroshima pass price ¥17,000 for 5 days, shinkansen to Hiroshima in. Is the Kansai Hiroshima pass worth it?";
const ROUTE = "/guides/transport/kansai-hiroshima-area-pass";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function KansaiHiroshimaAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Kansai Hiroshima Area Pass", item: `https://www.japan-travel-kit.com${ROUTE}` },
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
          <span className={styles.breadCurrent}>Kansai Hiroshima Area Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kansai Hiroshima Area Pass (2026): <br />JR West Kansai Hiroshima Pass Price &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            JR West&apos;s five-day pass from Osaka and Kyoto to Hiroshima and Miyajima, priced against JR&apos;s own
            shinkansen fares, the Kansai Area Pass and the national JR Pass.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR West's own prices", "Break-even on Smart EX fares"].map((t) => (
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
            The <strong>Kansai Hiroshima Area Pass</strong> is JR West&apos;s <strong>{PASS} pass for 5
            consecutive days</strong> (¥8,500 for a child), and it <strong>includes reserved seats on the Sanyo
            Shinkansen from Shin-Osaka to Hiroshima</strong>, the HARUKA from Kansai Airport, JR West local trains
            across Kansai and the JR ferry to Miyajima. A reserved Shin-Osaka–Hiroshima seat is {SINGLE} one way on
            JR&apos;s own Smart EX price, so one return costs {RETURN} and the pass is <strong>{SAVING} cheaper on
            that trip alone</strong>. It beats the ¥50,000 7-day JR Pass for any Kansai-plus-Hiroshima week, and the
            Kansai Area Pass (¥2,700–¥6,700) does not go to Hiroshima at all — it has no shinkansen. All prices were
            checked on JR West&apos;s and the JR Group&apos;s own pages on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The line between this pass and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>
              JR Kansai Area Pass
            </Link>{" "}
            is Hiroshima: stay inside Osaka, Kyoto, Nara and Kobe and the cheaper pass wins; go to Hiroshima and this
            one does. Every ticket for the train itself is compared on{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>
              Osaka to Hiroshima by shinkansen
            </Link>
            .
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
                <p className={styles.verdictStatLabel}>Pass, 5 days, adult</p>
                <p className={styles.verdictStatValue}>{PASS}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Osaka ⇄ Hiroshima return, singles</p>
                <p className={styles.verdictStatValue}>{RETURN}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Saved on one return</p>
                <p className={styles.verdictStatValue}>{SAVING}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinkansen section</p>
                <p className={styles.verdictStatValue}>Shin-Osaka ⇔ Hiroshima</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              Buy it if one Hiroshima return falls inside your five days. Start the five days on the morning you land
              at Kansai Airport and the HARUKA is covered too.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Staying a night in Hiroshima on the pass? Our{" "}
              <Link href="/guides/attractions/hiroshima-2-day-itinerary">2 days in Hiroshima itinerary</Link>{" "}
              plans the city on Day 1 and Miyajima on Day 2.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={jrKansaiHiroshimaAreaPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Check the pass on Klook →
              </KlookLink>
              <KlookLink href={hiroshimaMiyajimaFerryDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Hiroshima &amp; Miyajima day tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What Should You Book with the Kansai Hiroshima Area Pass?"
          intro="The pass, the Hiroshima day it is bought for, a room if you stay the night, data for the seat reservations and the airport train. Klook prices change by date, so open a listing for the figure on your days."
          items={kansaiHiroshimaPassTripPrep}
        />

        <EsimCtaTop />

        {/* (1) Pass table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price and coverage</span>
          <h2 className={styles.sectionTitle}>JR West Kansai Hiroshima Pass Price: What Does It Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {PASS} for 5 consecutive days, one length only, from 0:00 on the first day to 24:00 on the last. Here it
            is beside the three passes a Kansai traveller usually weighs it against.
          </p>
          <Table head={["Pass", "Price and days", "What it covers", "Pick it for"]} rows={passRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} — <Source href={PASS_URL}>JR West, Kansai-Hiroshima Area Pass</Source>,{" "}
            <Source href={WIDE_URL}>JR West, Kansai WIDE Area Pass</Source>,{" "}
            <Source href={AREA_URL}>JR West, Kansai Area Pass (WEST QR)</Source>,{" "}
            <Source href={JRP_PRICE_URL}>JAPAN RAIL PASS prices</Source>,{" "}
            <Source href={JRP_ABOUT_URL}>JAPAN RAIL PASS conditions</Source>. JR West passes are for holders of a
            foreign passport entering Japan as a Temporary Visitor. Not covered by the Kansai-Hiroshima pass: the
            Sanyo Shinkansen Hiroshima ⇔ Hakata, the Tokaido Shinkansen Shin-Osaka ⇔ Tokyo, the Kyushu Shinkansen,
            expressway buses and Green Cars without an extra ticket.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKansaiHiroshimaAreaPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the Kansai-Hiroshima Area Pass →
            </KlookLink>
          </div>
        </section>

        {/* (2) Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Kansai Hiroshima Area Pass Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, with one Osaka–Hiroshima return in the five days: {RETURN} on singles against {PASS}, so the pass
            is {SAVING} ahead before any other ride. It loses on a one-way trip to Hiroshima that carries on west,
            and on an Okayama-only day.
          </p>
          <Table head={["Trip in the 5 days", "Singles", "Pass", "Result"]} rows={breakEvenRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} — <Source href={SMARTEX_URL}>Smart EX Service fares (JR Odekake Net)</Source>,{" "}
            <Source href={HARUKA_URL}>JR West, HARUKA One-way Ticket</Source>,{" "}
            <Source href={PASS_URL}>JR West, Kansai-Hiroshima Area Pass</Source>. Smart EX prices are JR&apos;s online
            fares for one adult on a NOZOMI or MIZUHO in the regular season; busy and peak dates cost more, quieter
            dates less. The ¥10,750 single is for a reserved Ordinary seat; Green Car is ¥14,410.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKansaiHiroshimaAreaPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Buy the pass for your dates →
            </KlookLink>
            <KlookLink href={shinkansenOsakaHiroshima.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              One way only? Osaka → Hiroshima tickets →
            </KlookLink>
          </div>
        </section>

        {/* Shinkansen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The shinkansen</span>
          <h2 className={styles.sectionTitle}>Does It Cover the Shinkansen to Hiroshima?</h2>
          <p className={styles.bodyText}>
            Yes — reserved seats on the Sanyo Shinkansen between Shin-Osaka and Hiroshima are included, and JR West
            names no train type as excluded on that section. Reserve each seat before you board: on all-reserved
            trains there are no non-reserved seats to fall back on. The pass stops at Hiroshima, so Hakata, the
            Tokaido Shinkansen to Kyoto or Tokyo and the Kyushu Shinkansen are separate tickets. From Kyoto, ride
            the JR Kyoto Line to Shin-Osaka on the pass and change there.
          </p>
          <p className={styles.bodyText}>
            A case over 160 cm (length + width + height) needs a reserved seat with an oversized baggage area on the
            Sanyo Shinkansen — or send it ahead with{" "}
            <Link href="/guides/transport/japan-luggage-delivery" style={linkStyle}>
              Japan luggage delivery
            </Link>{" "}
            and ride with a day pack.
          </p>
        </section>

        {/* vs JR Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Against the national pass</span>
          <h2 className={styles.sectionTitle}>Kansai Hiroshima Pass vs JR Pass: Which Should You Buy?</h2>
          <p className={styles.bodyText}>
            The Kansai-Hiroshima pass, unless Tokyo is in the same week. It costs {PASS} for 5 days; the 7-day
            JAPAN RAIL PASS is ¥50,000 bought on the official site and ¥53,000 through an overseas agent — almost
            three times as much — and a JR Pass holder still needs a special extra ticket for the NOZOMI and MIZUHO.
            The national pass is the one to price only if a Tokyo–Kansai shinkansen journey and Hiroshima fall
            inside one 7-day window; the{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>
              JR Pass guide
            </Link>{" "}
            does that arithmetic.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Compare the JR Pass on Klook →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="The pass's shinkansen seats are reserved before boarding, and the Miyajima ferry times and the tide table are checked the same way — on your phone." />

        {/* Miyajima */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Miyajima</span>
          <h2 className={styles.sectionTitle}>Can You Visit Miyajima with It?</h2>
          <p className={styles.bodyText}>
            Yes. JR West lists its Miyajima Ferry (Miyajimaguchi ⇔ Miyajima) as included, and local trains on JR
            West lines in the valid area — Miyajimaguchi is on the JR Sanyo Line west of Hiroshima; confirm it on
            JR West&apos;s area map. The Miyajima Visitor Tax of ¥100 is paid separately when you board the ferry. The
            other operator&apos;s ferry from the same pier is not JR West and is not covered, so follow the JR signs.
            How to fit the Peace Memorial Park and the island into one day is on the{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" style={linkStyle}>
              Hiroshima and Miyajima day trip
            </Link>{" "}
            page, and the two-day version on the{" "}
            <Link href="/guides/attractions/hiroshima-2-day-itinerary" style={linkStyle}>
              Hiroshima 2 day itinerary
            </Link>
            .
          </p>
          <p className={styles.bodyText}>
            The pass handles the trains and the boat but not the day itself. A guided Hiroshima and Miyajima tour
            does the routing and the timing; one listing even starts from Osaka with the bullet train included,
            which is the alternative to buying the pass at all for a single day out.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hiroshimaMiyajimaFerryDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Hiroshima &amp; Miyajima with the ferry →
            </KlookLink>
            <KlookLink href={osakaHiroshimaMiyajimaBulletTrainDayTrip.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              From Osaka with the bullet train →
            </KlookLink>
          </div>
        </section>

        {/* How to buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Do You Buy the Kansai Hiroshima Area Pass?</h2>
          <p className={styles.bodyText}>
            Two ways, both before you travel. Through JR-WEST ONLINE TRAIN RESERVATION, from one month before the
            first day (10:00 JST), paid by credit card and collected at a station machine or ticket office with your
            passport — passes bought there can also reserve their seats online. Or from a travel agency as an
            exchange order, exchanged in Japan within 3 months of issue. Only holders of a foreign passport entering
            Japan as a Temporary Visitor can use it. The five days are consecutive and are not extended for delays
            or cancelled trains, so pick the start day around the Hiroshima trip and, ideally, the arrival at Kansai
            Airport.
          </p>
        </section>

        <KlookTourPicks
          heading="Bookings for a Kansai and Hiroshima Week"
          intro="The pass, the Hiroshima day, and the one-way shinkansen ticket for trips that do not come back. Open a listing for the current price on your dates."
          tours={[jrKansaiHiroshimaAreaPass, hiroshimaMiyajimaFerryDayTour, hiroshimaMiyajimaJoinDayTour, osakaHiroshimaMiyajimaBulletTrainDayTrip, shinkansenOsakaHiroshima]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Going further than Hiroshima? The <Link href="/guides/transport/sanyo-sanin-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Sanyo-San&apos;in Area Pass</Link> runs the shinkansen to Hakata and adds the San&apos;in coast, and the <Link href="/guides/transport/jr-west-all-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>JR West All Area Pass</Link> adds Kanazawa too. For Kansai day trips only, compare the <Link href="/guides/transport/kansai-wide-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Kansai WIDE Area Pass</Link> and the <Link href="/guides/transport/kansai-sanin-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Kansai-San&apos;in Area Pass</Link>.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Already in Hiroshima, or starting from Okayama? The <Link href="/guides/transport/hiroshima-yamaguchi-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Hiroshima-Yamaguchi Area Pass</Link> (Mihara to Hakata) and the <Link href="/guides/transport/okayama-hiroshima-yamaguchi-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Okayama-Hiroshima-Yamaguchi Area Pass</Link> (Okayama to Hakata) are the five-day passes for the western end, and the <Link href="/guides/transport/all-shikoku-rail-pass" style={{ color: "var(--red)", fontWeight: 600 }}>ALL SHIKOKU Rail Pass</Link> covers the island across the bridge.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A stop in Okayama on the pass: the <Link href="/guides/attractions/betty-smith-jeans-making-experience" style={{ color: "var(--red)", fontWeight: 600 }}>Betty Smith jeans-making experience</Link> in Kurashiki, from ¥11,000.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            At Okayama, <Link href="/guides/attractions/okayama-castle-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Okayama Castle</Link> is ¥500 for ages 15 and over and free for younger children.
          </p>
        </section>
        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Kansai Hiroshima Area Pass FAQ</h2>
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
            {[
              ["/guides/attractions/kansai-area-pass", "JR Kansai Area Pass 2026: Price, Coverage & Is It Worth It?"],
              ["/guides/transport/osaka-to-hiroshima-shinkansen", "Osaka to Hiroshima Shinkansen (2026): Time and Price"],
              ["/guides/attractions/hiroshima-miyajima-day-trip", "Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?"],
              ["/guides/attractions/hiroshima-2-day-itinerary", "2 Days in Hiroshima: Day-by-Day Itinerary (2026)"],
              ["/guides/transport/jr-pass-guide", "JR Pass Price 2026: New Prices From Oct 1 & Is It Worth It?"],
              ["/guides/transport/haruka-vs-nankai-rapit", "Haruka vs Rapi:t 2026: Which Kansai Airport Train?"],
              ["/guides/transport", "More Transport Guides →"],
            ].map(([href, title]) => (
              <Link key={href} href={href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="4" width="14" height="13" rx="3" />
                    <path d="M8 21l2-4M16 21l-2-4M5 11h14" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>One Hiroshima return pays for it</h2>
            <p className={styles.ctaBannerDesc}>
              {RETURN} on singles against {PASS} for five days, with the HARUKA, Kansai&apos;s JR lines and the
              Miyajima ferry included.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrKansaiHiroshimaAreaPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Kansai-Hiroshima Area Pass →
              </KlookLink>
              <KlookLink href={hiroshimaMiyajimaFerryDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Hiroshima &amp; Miyajima tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
