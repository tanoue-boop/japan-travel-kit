import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { whereToStayOsakaAreas, whereToStayOsakaTripPrep } from "../../../lib/klook-links";

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
 *
 * The Osaka Amazing Pass price comes from lib/attraction-prices.ts, which carries
 * its own source and check date. No Klook price appears anywhere: Klook answers
 * automated reads of its product pages with HTTP 403.
 */

/** The date this page's own figures were read off the operators' and official sites. */
const OWN = checkedLabel("2026-10-26");

/** The pass price's own check date, from lib/attraction-prices.ts. */
const PASS_CHECKED = checkedLabel(PRICES.osakaAmazingPass.checked);

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
      "Kintetsu-Nara approx. 34 min on the Kintetsu Express; Kyoto's Gion-Shijo and Sanjo approx. 48 min on the Keihan limited express from Yodoyabashi; Dotonbori and Kuromon Market on foot",
    airport:
      "Nankai Rapi:t, a minimum of 34 min with no transfer — the limited express ticket is ¥700 for an adult and ¥350 for a child on top of the ordinary fare",
  },
  {
    area: "Umeda / Osaka Station",
    who: "Arriving or leaving by JR or shinkansen, and Kyoto day trips",
    lines:
      "JR Osaka — the Osaka Loop Line, the Kyoto and Kobe lines and the Yumesaki through services; Osaka Metro Midosuji at Umeda; Hankyu and Hanshin Osaka-umeda; Shin-Osaka two stops up the Midosuji Line for the shinkansen",
    times:
      "Kyoto Station approx. 30 min on the JR Special Rapid; Kyoto-Kawaramachi approx. 45 min on the Hankyu; JR Nara approx. 52 min on the JR Rapid; Universal City about 20 min",
    airport:
      "JR Haruka direct to Osaka and Shin-Osaka — the discounted one-way for foreign passport holders is ¥1,800 for an adult through 31 Oct 2026 and ¥1,900 from 1 Nov 2026",
  },
  {
    area: "Tennoji",
    who: "Haruka arrivals, Nara days, and a quieter southern base",
    lines:
      "JR Tennoji — the Osaka Loop Line, the Yamatoji Line to Nara, the Hanwa Line and every Haruka; Osaka Metro Midosuji and Tanimachi; Kintetsu Osaka-Abenobashi",
    times:
      "JR Nara approx. 36 min on the JR Rapid — the fastest of the three Osaka bases to Nara; Namba and Umeda are up the same Midosuji Line",
    airport:
      "JR Haruka direct, and the first city stop on it — the discounted one-way is ¥1,300 for an adult through 31 Oct 2026 and ¥1,600 from 1 Nov 2026",
  },
  {
    area: "Universal City",
    who: "A Universal Studios Japan day, especially if you want to be at the gates at opening",
    lines:
      "Universal City on the JR Yumesaki (Sakurajima) Line, usually reached by changing at Nishikujo off the Osaka Loop Line — no Osaka Metro line serves it",
    times:
      "The USJ gates approx. 5 min on foot from Universal City Station; about 20 min from Osaka Station on the Yumesaki Line",
    airport:
      "No direct train: the Haruka or the Loop Line as far as Osaka Station or Nishikujo, then the Yumesaki Line",
  },
];

/** Sources for the table, printed under it so every number is attributable. */
const sourceNote = [
  `The Rapi:t time and surcharge are Nankai's own, read on ${OWN} — an extra ¥300 applies if you buy the limited express ticket onboard, and the ticketless service is ¥150 less.`,
  `HARUKA prices are JR West's discounted one-way ticket for holders of a foreign passport entering Japan as a temporary visitor, read on ${OWN}; the 1 November 2026 increase is JR West's own published change.`,
  `Osaka–Kyoto times are from kyoto.travel, the official Kyoto travel guide, read on ${OWN}.`,
  `Osaka–Nara and Tennoji–Nara times are from visitnara.jp, Nara Prefecture's official travel guide, read on ${OWN}.`,
  `The Universal City figures are from the Osaka Convention & Tourism Bureau's own site, read on ${OWN}.`,
].join(" ");

const faqItems = [
  {
    q: "What is the best area to stay in Osaka?",
    a: `Namba, for most trips. It is on the Midosuji Line, it puts Dotonbori and Kuromon Market within walking distance, and it is the Nankai terminus — so the run to Kansai Airport starts under your hotel rather than after a change with the cases. Nankai puts the Rapi:t at a minimum of 34 minutes between Kansai Airport and Namba with no transfer, read on ${OWN}. The case for Umeda instead is JR: if you are arriving from Kyoto or connecting to the shinkansen at Shin-Osaka, the northern hub saves you the crossing.`,
  },
  {
    q: "Namba or Umeda: which is better?",
    a: `Namba for a first trip, Umeda if your trip runs on JR. They are the two ends of the useful stretch of the Midosuji Line, so neither is far from the other — what differs is which network is at the door. Namba is Nankai (Kansai Airport), Kintetsu (Nara) and three subway lines, with the nightlife on foot. Umeda is JR Osaka — the Loop Line, the Kyoto and Kobe lines, and the Yumesaki through services to Universal City — plus Hankyu and Hanshin. On the official Kyoto travel guide's figures, read on ${OWN}, Osaka Station to Kyoto Station is approximately 30 minutes on the JR Special Rapid, which is the single strongest argument for the northern base.`,
  },
  {
    q: "Where to stay in Osaka for Universal Studios Japan?",
    a: `Either Universal City itself, or Umeda. The park is approximately five minutes on foot from Universal City Station on the JR Yumesaki Line, and about 20 minutes from Osaka Station — both on the Osaka Convention & Tourism Bureau's own figures, read on ${OWN}. Staying at Universal City buys you the walk rather than the train on a day you want to be at the gates at opening; staying at Umeda keeps you on the main network for the rest of the trip and costs you that 20 minutes twice. One thing to settle first either way: Universal Studios Japan is not on the Osaka Amazing Pass, and the JR fare to Universal City is not covered by any Osaka Metro pass.`,
  },
  {
    q: "Where to stay in Osaka for day trips to Kyoto and Nara?",
    a: `Umeda for Kyoto, Tennoji or Namba for Nara. On the official Kyoto travel guide, read on ${OWN}, Osaka Station to Kyoto Station is approximately 30 minutes on the JR Special Rapid, Osaka-umeda to Kyoto-Kawaramachi approximately 45 minutes on the Hankyu, and Yodoyabashi to Gion-Shijo approximately 48 minutes on the Keihan limited express. For Nara, Nara Prefecture's own travel guide gives Tennoji to JR Nara at approximately 36 minutes on the JR Rapid and Osaka-Namba to Kintetsu-Nara at approximately 34 minutes on the Kintetsu Express, against approximately 52 minutes from Osaka Station — read on ${OWN}. None of those four trains is reserved, so there is nothing to book.`,
  },
  {
    q: "Which area is best from Kansai Airport?",
    a: `It depends on which train you would rather take, and the two go to different places. The Nankai Rapi:t runs to Namba in a minimum of 34 minutes with no transfer, with a ¥700 adult limited express ticket on top of the ordinary fare. The JR Haruka runs direct to Tennoji, Osaka, Shin-Osaka and Kyoto; JR West's discounted one-way for foreign passport holders is ¥1,300 to Tennoji and ¥1,800 to Osaka or Shin-Osaka through 31 October 2026, rising to ¥1,600 and ¥1,900 on 1 November 2026. Both read on ${OWN}. So: Namba if you are flying in and out of Kansai, Tennoji if you want the shortest Haruka leg, Umeda if you are continuing by shinkansen.`,
  },
  {
    q: "How early should I book an Osaka hotel?",
    a: `We publish no number, because no operator publishes one — availability and price are per-hotel and per-date. What is published is the calendar. Japan's Cabinet Office lists Showa Day on 29 April, Constitution Memorial Day on 3 May, Greenery Day on 4 May and Children's Day on 5 May — Golden Week — plus Mountain Day on 11 August, read on ${OWN}; those weeks, the New Year period and the cherry-blossom and autumn-leaf weeks are when domestic demand is added to yours. Osaka has one local pressure on top of that: Universal Studios Japan draws a domestic crowd that books the Universal City hotels first, so if that area is your choice it is the one to check earliest. The practical step is to open the area searches for your real dates and compare two or three.`,
  },
  {
    q: "Is it better to stay in Osaka or Kyoto for a Kansai trip?",
    a: `If you are flying out of Kansai, Osaka — and the reason is the last morning rather than the sightseeing. On the official Kyoto travel guide's figures, read on ${OWN}, the Haruka takes approximately 80 minutes from Kansai Airport to Kyoto, against a minimum of 34 minutes to Namba on the Rapi:t. Osaka is also cheaper to eat in and has the later evenings; Kyoto has the temples and the earlier mornings. A common split is two or three Kyoto nights and one or two Osaka nights at the end, which is how our seven and ten-day itineraries are built.`,
  },
  {
    q: "Which Osaka area is cheapest to stay in?",
    a: "We cannot verify rates, so we will not rank the areas by price — but the structural point is that Tennoji is the southern end of the useful Midosuji stretch and the furthest from the nightlife, which is usually where the saving sits, and it is also the shortest Haruka leg from the airport. Shin-Imamiya and Dobutsuenmae, one stop further, are cheaper again and on the same line. Whether that saving survives contact with your dates is a question for the searches below.",
  },
  {
    q: "Do you need the Osaka Amazing Pass if you stay centrally?",
    a: `It depends on how many rides your day has in it rather than where you sleep. The pass is ${PRICES.osakaAmazingPass.adult} for one day and ¥3,300 for two, and it bundles unlimited Osaka Metro and city buses with more than 40 free admissions — read on ${PASS_CHECKED}. If your base is Namba or Umeda and you are walking most of the day, an IC card is cheaper; if you are hopping between the castle, the Umeda deck and the bay, the pass wins. Two things it does not cover, and both catch people out: Universal Studios Japan and the Kaiyukan.`,
  },
  {
    q: "Is Osaka a good base for the whole Kansai region?",
    a: "Yes, better than most people expect, and it is the cheapest way to see Kansai on one hotel bill. From the three Midosuji hubs you can reach Kyoto in about half an hour by JR, Nara in about 35 minutes, and Kobe, Himeji and Arima on day trips west — all without moving hotels. The limit is Kyoto's mornings: the famous temples are quietest before the day-trippers arrive, which is the one thing a Kyoto base buys that an Osaka base cannot.",
  },
];

const TITLE = "Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport";
const DESCRIPTION =
  "Where to Stay in Osaka in 2026: four areas compared on the lines that serve them, the Kansai Airport route to each and the Kyoto and Nara day trips from the door — with journey times read off the operators' own sites.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/where-to-stay-in-osaka") } });

export default function WhereToStayInOsakaPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE} | Japan Travel Kit</title>
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
              headline: "Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport",
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Where to Stay in Osaka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Where to Stay in Osaka (2026):<br />Best Areas, Compared by Line and Airport
          </h1>
          <p className={styles.heroSubtitle}>
            Four areas, compared on the lines that serve them rather than on hotels — because in Osaka the
            station decides your airport run and your day trips.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "4 areas compared", "Operator journey times"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Kyoto day trips</p>
                <p className={styles.verdictStatValue}>Umeda — 30 min by JR</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kansai Airport</p>
                <p className={styles.verdictStatValue}>Namba — Rapi:t, min 34 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Universal Studios</p>
                <p className={styles.verdictStatValue}>Universal City — 5 min walk</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> pick Namba for a first trip and for flying out of Kansai, Umeda if
              your trip runs on JR or includes Kyoto days, Tennoji for the shortest Haruka leg and a quieter
              base, and Universal City if a USJ day is the fixed point. Then do the part an answer cannot do
              — check what is left on your dates.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={whereToStayOsakaAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Namba hotels on Klook →
              </a>
            </div>
          </div>
        </div>

        {/* Answer-first intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay in Osaka?</h2>
          <p className={styles.bodyText}>
            <strong>Where to stay in Osaka</strong> comes down to four areas, and for a first trip the answer
            is <strong>Namba</strong>: it is on the Midosuji Line, Dotonbori and Kuromon Market are on foot,
            and it is the Nankai terminus — Nankai puts the Rapi:t at a{" "}
            <strong>minimum of 34 minutes</strong> from Kansai Airport with no transfer. Choose{" "}
            <strong>Umeda / Osaka Station</strong> if your trip runs on JR or has Kyoto days in it, where the
            JR Special Rapid reaches Kyoto Station in <strong>approximately 30 minutes</strong>;{" "}
            <strong>Tennoji</strong> for the shortest Haruka leg from the airport and the fastest run to Nara
            (<strong>approximately 36 minutes</strong> to JR Nara); and{" "}
            <strong>Universal City</strong> if a Universal Studios Japan day is the fixed point of the trip —
            the gates are <strong>about five minutes</strong> on foot from the station.
          </p>
          <p className={styles.bodyText}>
            What follows is the comparison behind that, and what it leaves out on purpose. There are no hotel
            names, no room impressions and no nightly rates on this page: we cannot verify any of the three
            from here, and two of them change with your dates. Every journey time below carries the operator
            or official body that published it and the date we read it.
          </p>
        </section>

        {/* Area comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Osaka Areas Compared</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Osaka is simpler than Tokyo in one respect: three of the four areas below are stops on the same
            subway line, the Midosuji, so the choice between them is mostly a choice of which{" "}
            <em>other</em> network is at the door — Nankai, JR or Kintetsu. The fourth is not on the subway
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
        />

        {/* Question headings */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>First trips</span>
          <h2 className={styles.sectionTitle}>What Is the Best Area to Stay in Osaka?</h2>
          <p className={styles.bodyText}>
            <strong>Namba</strong>, for most trips. It is on the Midosuji Line, it puts Dotonbori and Kuromon
            Market within walking distance, and it is the Nankai terminus — so the run to Kansai Airport
            starts under your hotel rather than after a change with the cases.
          </p>
          <p className={styles.bodyText}>
            The counter-argument is JR. If you are arriving from Kyoto, connecting to the shinkansen at
            Shin-Osaka, or spending a day at Universal Studios, the northern hub at Umeda saves you the
            crossing every time. Both are on the same line and about 20 minutes apart, so neither choice is a
            mistake — which is why the honest version of this answer is that the area matters less in Osaka
            than it does in Tokyo. Our{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka guide</Link> covers the
            lines and the day passes that make that true.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Namba or Umeda: Which Is Better?</h2>
          <p className={styles.bodyText}>
            <strong>Namba for a first trip, Umeda if your trip runs on JR.</strong> They are the two ends of
            the useful stretch of the Midosuji Line, so neither is far from the other — what differs is which
            network is at the door.
          </p>
          <p className={styles.bodyText}>
            Namba is Nankai (Kansai Airport), Kintetsu (Nara) and three subway lines, with the nightlife on
            foot. Umeda is JR Osaka — the Loop Line, the Kyoto and Kobe lines, and the Yumesaki through
            services towards Universal City — plus Hankyu and Hanshin, and Shin-Osaka two stops up for the
            shinkansen. On the official Kyoto travel guide&apos;s figures, read on {OWN}, Osaka Station to
            Kyoto Station is approximately 30 minutes on the JR Special Rapid, which is the strongest single
            argument for the northern base.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Theme parks</span>
          <h2 className={styles.sectionTitle}>Where to Stay in Osaka for Universal Studios Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Either Universal City itself, or Umeda.</strong> The park is approximately five minutes
            on foot from Universal City Station on the JR Yumesaki Line, and about 20 minutes from Osaka
            Station — both on the Osaka Convention &amp; Tourism Bureau&apos;s own figures, read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            Staying at Universal City buys you the walk rather than the train on the one day you want to be
            at the gates at opening; staying at Umeda keeps you on the main network for the rest of the trip
            and costs you those 20 minutes twice. Two things to settle before you choose either way: USJ is{" "}
            <em>not</em> on the Osaka Amazing Pass, and the JR fare to Universal City is not covered by any
            Osaka Metro pass. The tickets themselves are the bigger constraint — USJ sells date-specified
            Studio Passes online and Super Nintendo World needs timed entry on top, which our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets and Express Pass guide</Link>{" "}
            works through.
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
          <h2 className={styles.sectionTitle}>Which Area Is Best From Kansai Airport?</h2>
          <p className={styles.bodyText}>
            <strong>It depends which train you would rather take</strong>, because the two go to different
            places. The Nankai Rapi:t runs to Namba in a minimum of 34 minutes with no transfer, with a ¥700
            adult and ¥350 child limited express ticket on top of the ordinary fare. The JR Haruka runs
            direct to Tennoji, Osaka, Shin-Osaka and Kyoto.
          </p>
          <p className={styles.bodyText}>
            JR West&apos;s discounted one-way Haruka ticket — sold only to holders of a foreign passport
            entering as a temporary visitor — is ¥1,300 to Tennoji and ¥1,800 to Osaka or Shin-Osaka through
            31 October 2026, rising to ¥1,600 and ¥1,900 on 1 November 2026. Both operators read on {OWN}.
            So: Namba if you are flying in and out of Kansai, Tennoji if you want the shortest Haruka leg,
            Umeda if you are continuing by shinkansen. Our{" "}
            <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer guide</Link> compares
            every route, and our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Nankai Rapi:t comparison</Link>{" "}
            takes the two head to head.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>How Early Should You Book an Osaka Hotel?</h2>
          <p className={styles.bodyText}>
            <strong>We publish no number, because no operator publishes one.</strong> Availability and price
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
            <a href={whereToStayOsakaAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Umeda hotels on Klook →
            </a>
            <a href={whereToStayOsakaAreas[3].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Universal City hotels on Klook →
            </a>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
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
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
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
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
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
              <a href={whereToStayOsakaAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Namba hotels on Klook →
              </a>
              <a href={whereToStayOsakaAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Check Umeda hotels on Klook →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
