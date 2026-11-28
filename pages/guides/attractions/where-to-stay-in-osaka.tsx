import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import { STAY22_OSAKA_MAPS } from "../../../lib/stay22";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import { whereToStayOsakaAreas, whereToStayOsakaTripPrep } from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Where to Stay in Osaka — four areas compared on the lines that serve them and
 * the Kansai Airport route to each, rather than on hotels.
 *
 * Same rule as where-to-stay-in-tokyo: no hotel names, no room impressions and no
 * nightly rates anywhere, because none of the three can be verified from here and
 * two of them move with your dates. That is also why the Klook area hotel search
 * sits directly under the comparison rather than at the foot of the page.
 *
 * Every figure below carries the operator or official body that published it and
 * the date it was read:
 *
 *   nankai.co.jp                    Rapi:t "minimum time of 34 minutes", the        26 Oct 2026
 *                                   limited-express surcharge and the onboard fee
 *   westjr.co.jp                    HARUKA discounted one-way prices, and the       26 Oct 2026
 *                                   increase that takes effect on 1 Nov 2026
 *   kyoto.travel                    Osaka–Kyoto times by JR, Hankyu and Keihan,     26 Oct 2026
 *                                   and KIX–Kyoto on the Haruka
 *   visitnara.jp                    Osaka–Nara and Tennoji–Nara journey times       26 Oct 2026
 *   discover.osaka-info.jp          Universal City Station to the USJ gates, and    26 Oct 2026
 *                                   the run from Osaka Station
 *   www8.cao.go.jp (Cabinet Office)  the public-holiday dates in the booking Q       26 Oct 2026
 *   osaka-info.jp                   Shin-Osaka to Osaka Station approx. 4 min (JR    19 Nov 2026
 *                                   Kyoto Line) and to Umeda approx. 7 min
 *                                   (Midosuji), on /special/universal/tourism/;
 *                                   Shin-Osaka to Namba about 20 min on
 *                                   /special/universal/course03/; Shin-Osaka to
 *                                   Shinsaibashi approx. 12 min on /spot/post_8/
 *   nankai.co.jp / westjr.co.jp     Rapi:t minimum 34 min, ¥700/¥350 charge;        19 Nov 2026
 *                                   HARUKA ¥1,600 / ¥1,900 — re-read
 *
 * 19 Nov 2026 (task jtk-20261119-I01): the page had no impressions while the Tokyo
 * and Kyoto versions did, and its title and H1 led with "USJ" — the word usj-hotels
 * (13 Nov) now owns. So the page is narrowed to the area comparison (Namba,
 * Shinsaibashi, Umeda, Tennoji, Universal City), Shinsaibashi is added as its own
 * area, and the USJ hotel question is handed to usj-hotels in one sentence.
 *
 * The Osaka Amazing Pass price comes from lib/attraction-prices.ts, which carries
 * its own source and check date. No Klook price appears anywhere: Klook answers
 * automated reads of its product pages with HTTP 403.
 */

/** The date this page's own figures were read off the operators' and official sites. */
const OWN = checkedLabel("2026-10-26");

/** Rapi:t minimum time and HARUKA fares re-read on nankai.co.jp and westjr.co.jp. */
const TODAY = checkedLabel("2026-11-19");

/** Shin-Osaka journey times read on the Osaka Convention & Tourism Bureau's site. */
const SHIN_OSAKA = checkedLabel("2026-11-19");


type Area = {
  area: string;
  who: string;
  /** Stations and lines — network facts, not timings. */
  lines: string;
  /** Journey times we could verify, each with its source. */
  times: string;
  /** How Kansai Airport reaches it. */
  airport: string;
};

/**
 * Three Midosuji Line hubs and one outlier. Ordered by who should pick them: the
 * first-trip default, then the JR base, then the cheaper southern base, then the
 * one area whose whole argument is a single theme park.
 */
const areas: Area[] = [
  {
    area: "Namba",
    who: "First trips, Dotonbori evenings, and flying home out of Kansai",
    lines:
      "Nankai Namba, the Kansai Airport terminus; Osaka Metro Midosuji, Yotsubashi and Sennichimae; Kintetsu Osaka-Namba; JR Namba a few minutes west",
    times:
      "Shin-Osaka about 20 min on the Midosuji Line, no change; Kintetsu-Nara approx. 34 min on the Kintetsu Express; Kyoto's Gion-Shijo and Sanjo approx. 48 min on the Keihan limited express from Yodoyabashi; Dotonbori and Kuromon Market on foot",
    airport:
      "Nankai Rapi:t, a minimum of 34 min with no transfer — the limited express ticket is ¥700 for an adult and ¥350 for a child on top of the ordinary fare",
  },
  {
    area: "Shinsaibashi",
    who: "Shopping and Dotonbori on foot, one stop from the Namba terminals",
    lines:
      "Osaka Metro Midosuji and Nagahori Tsurumi-ryokuchi lines; Namba is the next Midosuji stop south",
    times:
      "Shin-Osaka approx. 12 min on the Midosuji Line; the covered Shinsaibashi-suji arcade runs south into Dotonbori",
    airport:
      "No direct train: one Midosuji stop to Namba, then the Nankai Rapi:t (minimum 34 min)",
  },
  {
    area: "Umeda / Osaka Station",
    who: "Arriving or leaving by JR or shinkansen, and Kyoto day trips",
    lines:
      "JR Osaka — the Osaka Loop Line, the Kyoto and Kobe lines and the Yumesaki through services; Osaka Metro Midosuji at Umeda; Hankyu and Hanshin Osaka-umeda; Shin-Osaka two stops up the Midosuji Line for the shinkansen",
    times:
      "Shin-Osaka approx. 4 min on the JR Kyoto Line (approx. 7 min on the Midosuji Line from Umeda); Kyoto Station approx. 30 min on the JR Special Rapid; Kyoto-Kawaramachi approx. 45 min on the Hankyu; JR Nara approx. 52 min on the JR Rapid; Universal City about 20 min",
    airport:
      "JR Haruka direct to Osaka and Shin-Osaka — the discounted one-way for foreign passport holders is ¥1,900 for an adult (prices changed for tickets sold from 1 Nov 2026)",
  },
  {
    area: "Tennoji",
    who: "Haruka arrivals, Nara days, and a quieter southern base",
    lines:
      "JR Tennoji — the Osaka Loop Line, the Yamatoji Line to Nara, the Hanwa Line and every Haruka; Osaka Metro Midosuji and Tanimachi; Kintetsu Osaka-Abenobashi",
    times:
      "JR Nara approx. 36 min on the JR Rapid — the fastest of the three Osaka bases to Nara; Namba and Umeda are up the same Midosuji Line",
    airport:
      "JR Haruka direct, and the first city stop on it — the discounted one-way is ¥1,600 for an adult",
  },
  {
    area: "Universal City",
    who: "A Universal Studios Japan day, especially if you want to be at the gates at opening",
    lines:
      "Universal City on the JR Yumesaki (Sakurajima) Line, usually reached by changing at Nishikujo off the Osaka Loop Line — no Osaka Metro line serves it. Bentencho, the next Loop Line stop after Nishikujo and also on the Osaka Metro Chuo Line, is the off-site base on the same side of the city",
    times:
      "The USJ gates approx. 5 min on foot from Universal City Station; about 20 min from Osaka Station on the Yumesaki Line",
    airport:
      "No direct train: the Haruka or the Loop Line as far as Osaka Station or Nishikujo, then the Yumesaki Line",
  },
];

/** Haruka journey times: kansai-airport.or.jp, the same reading haruka-vs-nankai-rapit uses. */
const HARUKA_TIMES = checkedLabel("2026-11-06");

/**
 * The at-a-glance table (added 12 Nov 2026, rebuilt 19 Nov 2026 around the three
 * runs a hotel choice in Osaka is actually made against: Kansai Airport, Shin-Osaka
 * for the shinkansen, and the USJ gates). Only times an operator or official guide
 * publishes; "—" where there is no direct train and no published time.
 */
const quickRows = [
  {
    area: "Namba",
    stations: "Namba (Midosuji), Nankai Namba, Kintetsu Osaka-Namba",
    kix: "Nankai Rapi:t, direct, min. 34 min",
    shinOsaka: "Midosuji Line, direct, about 20 min",
    usj: "—",
    bestFor: "A first trip, Dotonbori evenings, flying out of Kansai",
  },
  {
    area: "Shinsaibashi",
    stations: "Shinsaibashi (Midosuji, Nagahori Tsurumi-ryokuchi)",
    kix: "Via Namba (1 stop), then the Rapi:t",
    shinOsaka: "Midosuji Line, direct, approx. 12 min",
    usj: "—",
    bestFor: "Shopping, the arcade and Dotonbori on foot",
  },
  {
    area: "Umeda / Osaka Station",
    stations: "JR Osaka, Umeda (Midosuji), Hankyu and Hanshin Osaka-umeda",
    kix: "JR Haruka, direct, about 45 min (¥1,900 one-way*)",
    shinOsaka: "JR Kyoto Line approx. 4 min (Midosuji approx. 7 min)",
    usj: "About 20 min by JR",
    bestFor: "Moving around: the shinkansen, Kyoto days, Kobe",
  },
  {
    area: "Tennoji",
    stations: "JR Tennoji, Tennoji (Midosuji), Kintetsu Osaka-Abenobashi",
    kix: "JR Haruka, direct, about 30 min (¥1,600 one-way*)",
    shinOsaka: "Midosuji Line, direct",
    usj: "—",
    bestFor: "Haruka arrivals, Nara days, a quieter base",
  },
  {
    area: "Universal City (USJ)",
    stations: "Universal City (JR Yumesaki Line)",
    kix: "No direct train",
    shinOsaka: "No direct train (JR via Osaka Station)",
    usj: "Approx. 5 min on foot",
    bestFor: "A USJ day, at the gates at opening",
  },
];

/** Sources for the table, printed under it so every number is attributable. */
const sourceNote = [
  `The Rapi:t time and surcharge are Nankai's own, re-read on ${TODAY} — an extra ¥300 applies if you buy the limited express ticket onboard, and the ticketless service is ¥150 less.`,
  `HARUKA prices are JR West's discounted one-way ticket for holders of a foreign passport entering Japan as a temporary visitor, re-read on ${TODAY}; JR West notes the prices changed for tickets sold on or after 1 November 2026.`,
  `Osaka–Kyoto times are from kyoto.travel, the official Kyoto travel guide, read on ${OWN}.`,
  `Osaka–Nara and Tennoji–Nara times are from visitnara.jp, Nara Prefecture's official travel guide, read on ${OWN}.`,
  `The Universal City figures are from the Osaka Convention & Tourism Bureau's own site, read on ${OWN}.`,
  `The Shin-Osaka times — approximately 4 minutes to Osaka Station on the JR Kyoto Line, approximately 7 to Umeda and approximately 12 to Shinsaibashi on the Midosuji Line, and about 20 to Namba — are from the same Bureau's site, read on ${SHIN_OSAKA}.`,
].join(" ");

const faqItems = [
  {
    q: "What is the best area to stay in Osaka?",
    a: `Namba, for most trips. It is on the Midosuji Line, it puts Dotonbori and Kuromon Market within walking distance, and it is the Nankai terminus — so the run to Kansai Airport starts under your hotel rather than after a change with the cases. Nankai puts the Rapi:t at a minimum of 34 minutes between Kansai Airport and Namba with no transfer, re-read on ${TODAY}. The case for Umeda instead is JR: Shin-Osaka is approximately 4 minutes away on the JR Kyoto Line, so if you are arriving by shinkansen or spending days in Kyoto, the northern hub saves you the crossing. Shinsaibashi is the Namba choice one stop north, and Universal City only pays off on a trip built around USJ.`,
  },
  {
    q: "Is Namba or Umeda better to stay in?",
    a: `Namba for a first trip, Umeda if your trip runs on JR. They are the two ends of the useful stretch of the Midosuji Line, so neither is far from the other — what differs is which network is at the door. Namba is Nankai (Kansai Airport), Kintetsu (Nara) and three subway lines, with the nightlife on foot. Umeda is JR Osaka — the Loop Line, the Kyoto and Kobe lines, and the Yumesaki through services to Universal City — plus Hankyu and Hanshin. On the official Kyoto travel guide's figures, read on ${OWN}, Osaka Station to Kyoto Station is approximately 30 minutes on the JR Special Rapid, which is the single strongest argument for the northern base.`,
  },
  {
    q: "Where should I stay in Osaka for USJ?",
    a: `At Universal City if the trip is built around the park: Universal City Station on the JR Yumesaki Line is approximately five minutes on foot from the gates, on the Osaka Convention & Tourism Bureau's own figures read on ${OWN}. Otherwise stay in Umeda, about 20 minutes from the park by JR from Osaka Station, so the other days keep the full network. The Universal City hotels are a small cluster that a large domestic crowd books first, so check those dates earliest.`,
  },
  {
    q: "Where should I stay in Osaka near Kansai Airport?",
    a: `It depends on which train you would rather take, and the two go to different places. The Nankai Rapi:t runs to Namba in a minimum of 34 minutes with no transfer, with a ¥700 adult limited express ticket on top of the ordinary fare. The JR Haruka runs direct to Tennoji, Osaka, Shin-Osaka and Kyoto; JR West's discounted one-way for foreign passport holders is ¥1,600 to Tennoji and ¥1,900 to Osaka or Shin-Osaka for an adult (prices changed for tickets sold from 1 November 2026). Both re-read on ${TODAY}. So: Namba if you are flying in and out of Kansai, Tennoji if you want the shortest Haruka leg, Umeda if you are continuing by shinkansen.`,
  },
  {
    q: "How early should I book an Osaka hotel?",
    a: `There is no number here, because no operator publishes one — availability and price are per-hotel and per-date. What is published is the calendar. Japan's Cabinet Office lists Showa Day on 29 April, Constitution Memorial Day on 3 May, Greenery Day on 4 May and Children's Day on 5 May — Golden Week — plus Mountain Day on 11 August, read on ${OWN}; those weeks, the New Year period and the cherry-blossom and autumn-leaf weeks are when domestic demand is added to yours. Osaka has one local pressure on top of that: Universal Studios Japan draws a domestic crowd that books the Universal City hotels first, so if that area is your choice it is the one to check earliest. The practical step is to open the area searches for your real dates and compare two or three.`,
  },
];

// Title rebuilt 12 Nov 2026 (task jtk-20261112-I01): the requested
// "Where to Stay in Osaka 2026: Namba vs Umeda vs USJ (Best Areas)" is 63 characters,
// so the three areas go in brackets to keep the whole <title> under 60.
// Rebuilt again 19 Nov 2026 (task jtk-20261119-I01): "USJ" left the title so the page
// stops competing with usj-hotels; Shinsaibashi is the third area named instead (59 chars).
// Rebuilt 22 Nov 2026 (task jtk-20261122-I01): still 0 impressions while indexed, so the
// title leads with the plain query and "first-timers" (the itineraries and usj-hotels own
// the other angles), and the section headings became the questions searchers type (58 chars).
// Rebuilt 27 Nov 2026 (task jtk-20261127-I01): a fourth check with 0 impressions, so the page
// becomes the "Namba vs Umeda" comparison: the area table moved directly under the Quick Answer,
// Tennoji named in the title, Haruka one-way prices added to the airport column (56 chars).
// If it still has no impressions on 10 Dec 2026, it is the merge candidate.
const TITLE = "Where to Stay in Osaka (2026): Namba vs Umeda vs Tennoji";
const DESCRIPTION =
  "Where to stay in Osaka: Namba for a first trip (Rapi:t to Kansai Airport in 34 min), Umeda for Shin-Osaka (4 min by JR), Tennoji for the ¥1,600 Haruka.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/where-to-stay-in-osaka") } });

export default function WhereToStayInOsakaPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-osaka" />
        {hreflangLinks("/guides/attractions/where-to-stay-in-osaka")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-osaka" />
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
              route: "/guides/attractions/where-to-stay-in-osaka",
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Where to Stay in Osaka",
                  item: "https://www.japan-travel-kit.com/guides/attractions/where-to-stay-in-osaka",
                },
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Where to Stay in Osaka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Where to Stay in Osaka (2026): <br />Namba vs Umeda vs Tennoji, Compared by Station
          </h1>
          <p className={styles.heroSubtitle}>
            Namba, Shinsaibashi, Umeda, Tennoji and Universal City, compared on the stations under them rather
            than on hotels — because in Osaka the station decides your airport run and your shinkansen.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "5 areas compared", "Official journey times"].map((t) => (
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
                <p className={styles.verdictStatLabel}>First trip</p>
                <p className={styles.verdictStatValue}>Namba</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Moving around (shinkansen, airport)</p>
                <p className={styles.verdictStatValue}>Umeda — Shin-Osaka approx. 4 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shopping, one stop from Namba</p>
                <p className={styles.verdictStatValue}>Shinsaibashi — Shin-Osaka approx. 12 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Universal Studios Japan</p>
                <p className={styles.verdictStatValue}>Universal City — 5 min walk</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              For a first trip, stay in <strong>Namba</strong>: Dotonbori is on foot and the Nankai Rapi:t
              reaches Kansai Airport in a minimum of 34 minutes with no change. If you will be moving around —
              the shinkansen, Kyoto days — stay in <strong>Umeda</strong>, approximately 4 minutes from Shin-Osaka
              on the JR Kyoto Line and about 45 minutes from Kansai Airport on the JR Haruka; if Universal Studios
              Japan is the point of the trip, stay at <strong>Universal City</strong>, about 5 minutes on foot
              from the gates.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={whereToStayOsakaAreas[1].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Namba hotels on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Area comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Namba vs Umeda vs Tennoji: Which Is the Best Area to Stay in Osaka?</h2>
          <p className={styles.bodyText}>
            <strong>Namba wins for a first trip, Umeda for the shinkansen, Tennoji for the cheapest Haruka leg
            (¥1,600) and Nara, Universal City for a USJ day.</strong> The table puts each area&apos;s main
            stations next to the official journey time to the three places a hotel choice in Osaka turns on —
            Kansai Airport, Shin-Osaka and the USJ gates; a dash means there is no direct train and no
            published time.
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "0.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Main stations", "Kansai Airport", "Shin-Osaka", "USJ gates", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Verdict</td>
                    <td colSpan={5} style={{ fontSize: "0.9rem" }}>
                      <strong>First trip → Namba · Shinkansen → Umeda · Haruka and Nara → Tennoji · Shopping → Shinsaibashi · USJ → Universal City</strong>
                    </td>
                  </tr>
                  {quickRows.map((r) => (
                    <tr key={r.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{r.area}</td>
                      <td style={{ fontSize: "0.85rem" }}>{r.stations}</td>
                      <td style={{ fontSize: "0.85rem" }}>{r.kix}</td>
                      <td style={{ fontSize: "0.85rem" }}>{r.shinOsaka}</td>
                      <td style={{ fontSize: "0.85rem" }}>{r.usj}</td>
                      <td style={{ fontSize: "0.88rem" }}>{r.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-27 —{" "}
            <a href="https://www.nankai.co.jp/en_railway/rapit" target="_blank" rel="noopener noreferrer">nankai.co.jp</a>{" "}
            (Rapi:t, minimum 34 min),{" "}
            <a href="https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/" target="_blank" rel="noopener noreferrer">westjr.co.jp</a>{" "}
            (HARUKA routes; *the discounted one-way for foreign passport holders: ¥1,600 Tennoji, ¥1,900
            Osaka / Shin-Osaka, adult) and the Osaka Convention &amp; Tourism Bureau&apos;s{" "}
            <a href="https://osaka-info.jp/en/special/universal/tourism/" target="_blank" rel="noopener noreferrer">osaka-info.jp</a>{" "}
            (Shin-Osaka to Osaka Station and Umeda),{" "}
            <a href="https://osaka-info.jp/en/special/universal/course03/" target="_blank" rel="noopener noreferrer">to Namba</a> and{" "}
            <a href="https://osaka-info.jp/en/spot/post_8/" target="_blank" rel="noopener noreferrer">to Shinsaibashi</a>.
            Haruka journey times are Kansai Airport&apos;s own, read on {HARUKA_TIMES}; the USJ times are from{" "}
            <a href="https://osaka-info.jp/en/" target="_blank" rel="noopener noreferrer">osaka-info.jp</a>, read on {OWN}.
          </p>
        </section>

        <EsimCtaTop />

        {/* Answer-first intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay in Osaka?</h2>
          <p className={styles.bodyText}>
            <strong>Where to stay in Osaka</strong>: Namba if it is your first trip, Umeda if getting around
            matters most, and Universal City or Bentencho if USJ is the reason you are going. Namba is the
            Nankai terminus — the Rapi:t reaches Kansai Airport in a <strong>minimum of 34 minutes</strong>{" "}
            with no transfer, and Shin-Osaka is <strong>about 20 minutes</strong> up the Midosuji Line — while
            Umeda is <strong>approximately 4 minutes</strong> from Shin-Osaka on the JR Kyoto Line and{" "}
            <strong>about 45 minutes</strong> from Kansai Airport on the JR Haruka. Universal City Station is{" "}
            <strong>about 5 minutes</strong> on foot from the USJ gates; Bentencho is the next JR Loop Line
            stop after Nishikujo, where the line to Universal City starts.
          </p>
          <p className={styles.bodyText}>
            The other two areas are variations on those. <strong>Shinsaibashi</strong> is one Midosuji stop
            north of Namba, approximately 12 minutes from Shin-Osaka, with the covered arcade running down
            into Dotonbori. <strong>Tennoji</strong> is the shortest Haruka leg from the airport and the
            fastest run to Nara (<strong>approximately 36 minutes</strong> to JR Nara). A Midosuji Line base also makes an evening
            at Nagai easy — our{" "}
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets">teamLab Botanical Garden Osaka tickets</Link>{" "}
            guide has the price and the after-dark hours of the garden, 10 minutes on foot from Nagai Station.
          </p>
          <p className={styles.bodyText}>
            What follows is the comparison behind that, and what it leaves out on purpose. There are no hotel
            names, no room impressions and no nightly rates on this page: none of the three can be verified
            here, and two of them change with your dates. Every journey time below carries the operator
            or official body that published it and the date it was read.
          </p>
        </section>

        {/* Line-by-line detail */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Detail</span>
          <h2 className={styles.sectionTitle}>How Do the Five Osaka Areas Compare Line by Line?</h2>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
            Osaka is simpler than Tokyo in one respect: four of the five areas below are stops on the same
            subway line, the Midosuji, so the choice between them is mostly a choice of which{" "}
            <em>other</em> network is at the door — Nankai, JR or Kintetsu. The fifth is not on the subway
            at all.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Who it suits", "Stations & lines", "Verified journey times", "From Kansai Airport"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areas.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.lines}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.times}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.airport}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {sourceNote} Journey times exclude the walk to and from the platform, and none of them is a
            guarantee for a particular departure.
          </p>
        </section>

        {/* Klook hotels — directly under the comparison, which is the point of the page. */}
        <KlookStayAreas
          heading="Where to Stay in Osaka: Hotel Search by Area"
          intro="This is the step the comparison above cannot finish. Which rooms are left, at what price, is a per-date question, so each area below links straight into Klook's own hotel search for that district — set your dates and compare two or three of them against each other."
          areas={whereToStayOsakaAreas}
          maps={STAY22_OSAKA_MAPS}
        />

        {/* Question headings */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>First trips</span>
          <h2 className={styles.sectionTitle}>What Is the Best Area to Stay in Osaka?</h2>
          <p className={styles.bodyText}>
            <strong>Namba</strong>, for most trips. It is on the Midosuji Line, it puts Dotonbori and Kuromon
            Market within walking distance, and it is the Nankai terminus — so the run to Kansai Airport
            starts under your hotel rather than after a change with the cases. From a Namba hotel the{" "}
            <Link href="/guides/attractions/dotonbori-river-cruise">Dotonbori River Cruise at Tazaemonbashi Pier</Link>{" "}
            is a 5 to 10 minute walk, with boats every 30 minutes until 21:00.
          </p>
          <p className={styles.bodyText}>
            The counter-argument is JR. If you are arriving from Kyoto, connecting to the shinkansen at
            Shin-Osaka, or spending a day at Universal Studios, the northern hub at Umeda saves you the
            crossing every time. Both are on the same Midosuji Line, so neither choice is a mistake — which
            is why the honest version of this answer is that the area matters less in Osaka than it does in
            Tokyo. Our{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka guide</Link> covers the
            lines that make that true, and our{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro day pass</Link> guide works out whether
            the ¥820 pass from either base beats paying per ride.
          </p>
          <p className={styles.bodyText}>
            How many nights you have changes the answer less than you would expect. On a short stay, our{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary">Osaka 2 day itinerary</Link> keeps both
            evenings in Minami, which is the case for Namba or Shinsaibashi; the{" "}
            <Link href="/guides/attractions/osaka-3-day-itinerary">Osaka 3 day itinerary</Link> adds a USJ
            day and a day trip, which is where an Umeda base starts to earn its place. And if you are still
            deciding what the days hold, our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link> lists the sights and
            which of them the{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass</Link> covers.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Minami</span>
          <h2 className={styles.sectionTitle}>Is Namba or Shinsaibashi Better to Stay In?</h2>
          <p className={styles.bodyText}>
            <strong>Namba if you fly in and out of Kansai, Shinsaibashi if you arrive by shinkansen.</strong>{" "}
            They are one Midosuji stop apart with Dotonbori between them, so the evenings are the same; what
            differs is the station. Namba has the Nankai terminus for the Rapi:t and Kintetsu for Nara.
            Shinsaibashi is approximately 12 minutes from Shin-Osaka on the Midosuji Line, against about 20
            minutes to Namba, on the Osaka Convention &amp; Tourism Bureau&apos;s own figures read on{" "}
            {SHIN_OSAKA}, and the covered Shinsaibashi-suji arcade runs south into Dotonbori — useful on a
            wet day.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={whereToStayOsakaAreas[1].url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Namba hotels on Klook →
            </KlookLink>
            <KlookLink href={whereToStayOsakaAreas[4].url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Shinsaibashi hotels on Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Is Namba or Umeda Better to Stay In?</h2>
          <p className={styles.bodyText}>
            <strong>Namba for a first trip, Umeda if your trip runs on JR.</strong> They are the two ends of
            the useful stretch of the Midosuji Line, so neither is far from the other — what differs is which
            network is at the door.
          </p>
          <p className={styles.bodyText}>
            Namba is Nankai (Kansai Airport), Kintetsu (Nara) and three subway lines, with the nightlife on
            foot. Umeda is JR Osaka — the Loop Line, the Kyoto and Kobe lines, and the Yumesaki through
            services towards Universal City — plus Hankyu and Hanshin, and Shin-Osaka two stops up for the
            shinkansen. Coming straight from Tokyo, our{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen">Tokyo to Osaka shinkansen</Link> guide has
            the Nozomi fare, the journey time and where to book the seat. On the official Kyoto travel guide&apos;s figures, read on {OWN}, Osaka Station to
            Kyoto Station is approximately 30 minutes on the JR Special Rapid, which is the strongest single
            argument for the northern base. An Umeda base also puts the{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets">Umeda Sky Building observation deck</Link>{" "}
            a short walk from Osaka Station, and it stays open until 22:30.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Theme parks</span>
          <h2 className={styles.sectionTitle}>Where to Stay in Osaka for USJ?</h2>
          <p className={styles.bodyText}>
            <strong>Only if USJ is the point of the trip.</strong> The park is approximately five minutes on
            foot from Universal City Station on the JR Yumesaki Line, and about 20 minutes from Osaka Station
            — both on the Osaka Convention &amp; Tourism Bureau&apos;s own figures, read on {OWN} — but every
            other day starts with a JR ride and a change, and no Osaka Metro pass reaches the area.
          </p>
          <p className={styles.bodyText}>
            If USJ is the reason you are going, our{" "}
            <Link href="/guides/attractions/usj-hotels">USJ hotels guide</Link> compares the official hotels
            by the gates one by one. For everyone else, Umeda is the base that keeps the park 20 minutes away
            without giving up the rest of the network, and Bentencho, the next Loop Line stop after Nishikujo,
            sits on the same side of the city. The tickets are the bigger constraint than the hotel: our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">Universal Studios Japan Express Pass guide</Link>{" "}
            covers the date-specified Studio Pass and the Express Pass, which USJ sells in a limited number
            each day and which often sells out in advance on weekends and Japanese public holidays. A
            Universal City base also puts the aquarium one boat ride away — the Captain Line crosses to
            Kaiyukan in about ten minutes; see our{" "}
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets">Osaka Aquarium Kaiyukan tickets guide</Link>.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day trips</span>
          <h2 className={styles.sectionTitle}>Where to Stay in Osaka for Day Trips to Kyoto and Nara?</h2>
          <p className={styles.bodyText}>
            <strong>Umeda for Kyoto, Tennoji or Namba for Nara.</strong> On the official Kyoto travel guide,
            read on {OWN}, Osaka Station to Kyoto Station is approximately 30 minutes on the JR Special
            Rapid, Osaka-umeda to Kyoto-Kawaramachi approximately 45 minutes on the Hankyu, and Yodoyabashi
            to Gion-Shijo approximately 48 minutes on the Keihan limited express.
          </p>
          <p className={styles.bodyText}>
            For Nara, Nara Prefecture&apos;s own travel guide gives Tennoji to JR Nara at approximately 36
            minutes on the JR Rapid and Osaka-Namba to Kintetsu-Nara at approximately 34 minutes on the
            Kintetsu Express, against approximately 52 minutes from Osaka Station — read on {OWN}. None of
            those four trains is reserved, so there is nothing to book and no departure to make; our{" "}
            <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link> has the walking order
            inside the park, and our{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka">Kyoto and Nara day tour comparison</Link>{" "}
            covers the coach alternative if you would rather pair the two in one day.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Airport</span>
          <h2 className={styles.sectionTitle}>Where to Stay in Osaka Near Kansai Airport?</h2>
          <p className={styles.bodyText}>
            <strong>It depends which train you would rather take</strong>, because the two go to different
            places. The Nankai Rapi:t runs to Namba in a minimum of 34 minutes with no transfer, with a ¥700
            adult and ¥350 child limited express ticket on top of the ordinary fare. The JR Haruka runs
            direct to Tennoji, Osaka, Shin-Osaka and Kyoto.
          </p>
          <p className={styles.bodyText}>
            JR West&apos;s discounted one-way Haruka ticket — sold only to holders of a foreign passport
            entering as a temporary visitor — is ¥1,600 to Tennoji and ¥1,900 to Osaka or Shin-Osaka for an
            adult; JR West notes the prices changed for tickets sold on or after 1 November 2026. Both
            operators re-read on {TODAY}.
            So: Namba if you are flying in and out of Kansai, Tennoji if you want the shortest Haruka leg,
            Umeda if you are continuing by shinkansen. Our{" "}
            <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer</Link> guide gives
            the cheapest and fastest ride to each area by train, bus or private car, and our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Nankai Rapi:t comparison</Link>{" "}
            takes the two head to head. Our{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary">10 days in Japan itinerary</Link>{" "}
            ends on exactly this run: two Osaka nights in Namba and the flight home from Kansai on Day 10.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How Early Should You Book an Osaka Hotel?</h2>
          <p className={styles.bodyText}>
            <strong>There is no number here, because no operator publishes one.</strong> Availability and price
            are per-hotel and per-date, so a &ldquo;book X weeks ahead&rdquo; figure would be invented. What
            is published is the calendar.
          </p>
          <p className={styles.bodyText}>
            Japan&apos;s Cabinet Office lists Showa Day on 29 April, Constitution Memorial Day on 3 May,
            Greenery Day on 4 May and Children&apos;s Day on 5 May — Golden Week — plus Mountain Day on 11
            August, read on {OWN}. Those weeks, the New Year period and the cherry-blossom and autumn-leaf
            weeks are when domestic demand lands on top of yours. Osaka has one local pressure on top of
            that: Universal Studios Japan draws a large domestic crowd, and the Universal City hotels are a
            small cluster, so if that is your pick it is the one to check earliest. Either way the useful
            step is the same — open the area searches for your real dates and party size, and compare two or
            three districts.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={whereToStayOsakaAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Umeda hotels on Klook →
            </KlookLink>
            <KlookLink href={whereToStayOsakaAreas[3].url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Universal City hotels on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Supporting Klook block — the airport tickets and the pass the area choice rides on. */}
        <KlookTripPrep
          label="Booked alongside"
          heading="What Else Does the Area You Pick Decide?"
          intro="Each of these follows from the area rather than the other way round: which airport train you want depends on whether your base is a Nankai station or a JR one, and whether the city pass pays off depends on how far your hotel is from the things you want to see."
          items={whereToStayOsakaTripPrep}
        />

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

        <p className={styles.bodyText}>
          Walking the Kumano Kodo from Osaka? The Kuroshio to Kii-Tanabe leaves from Shin-Osaka and Tennoji; our <Link href="/guides/attractions/kumano-kodo-tour">Kumano Kodo tour guide</Link> compares the day tours and the two-day walk.
        </p>

        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 13 Nov 2026: the official hotels by the USJ gates. */}
            <Link href="/guides/attractions/usj-hotels" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>USJ Hotels (2026): Official Hotels Near Universal Studios Japan</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Osaka Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 1 Nov 2026: the Minami question — if you sleep in Namba or Shinsaibashi, the pier is a walk away. */}
            <Link href="/guides/attractions/dotonbori-river-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18l-2 4H5z" />
                  <path d="M5 17V9h14v8" />
                  <path d="M12 3v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Dotonbori River Cruise 2026: Price, Times and the Tombori Boat</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 30 Oct 2026: the three-day itinerary that turns on whether you sleep in Osaka or Kyoto. */}
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
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c0-6 3-9 7-10-1 5-3 8-7 10z" />
                  <path d="M12 21c0-6-3-9-7-10 1 5 3 8 7 10z" />
                  <path d="M12 21V11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Botanical Garden Osaka Tickets: Prices &amp; Hours</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v8a6 6 0 0 0 12 0V3" />
                  <path d="M12 17v4M9 21h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Food Tour (2026): Which One to Book, Times and What You Eat</p>
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
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.9 6.3 6.9.8-5 4.7 1.3 6.8L12 17.4l-6.1 3.2L7.2 13.8l-5-4.7 6.9-.8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-5-20-5v4l12 1-12 1z" />
                  <line x1="4" y1="21" x2="20" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer 2026: Train vs Bus from KIX &amp; Itami</p>
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
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Express Pass 2026: Types &amp; Prices</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass 2026: Osaka Subway Pass Price &amp; Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass 2026: ¥3,500, Worth It? + 1-Day Plan</p>
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
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
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
            <h2 className={styles.ctaBannerTitle}>Pick the station, then check the dates</h2>
            <p className={styles.ctaBannerDesc}>
              The comparison above narrows Osaka to two areas at most. Which rooms are left, and at what
              price, is a question only your dates can answer — so open the hotel search for each and compare
              them side by side.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={whereToStayOsakaAreas[1].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Check Namba hotels on Klook →
              </KlookLink>
              <KlookLink href={whereToStayOsakaAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                Check Umeda hotels on Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
