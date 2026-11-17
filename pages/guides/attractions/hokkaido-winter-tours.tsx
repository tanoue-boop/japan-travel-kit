import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  asahiyamaWinterBluePondTour,
  hokkaidoWinterToursTripPrep,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  otaruSnowParkDayTour,
  sapporoSnowFestivalStayAreas,
} from "../../../lib/klook-links";
import {
  asahiyamaBieiHighlightsTour,
  sapporoKokusaiOtaruDayTour,
  yoichiOtaruWalkingTour,
} from "../../../lib/klook-links-winter-hokkaido";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Hokkaido winter tours from Sapporo, written as a which-day-tour comparison.
 * Added 16 Nov 2026 (task-jtk-20261116-02).
 *
 * Next to its neighbours:
 *  - furano-biei-tour compares Furano and Biei tours across the year;
 *  - otaru-day-trip-from-sapporo is the Otaru day in detail, train first;
 *  - sapporo-3-day-itinerary puts one of these days into a three-day plan;
 *  - this page answers "which winter day tour from Sapporo", side by side, with the
 *    winter-only dates each one depends on.
 *
 * Official reads on 16 Nov 2026:
 *   city.asahikawa.hokkaido.jp/asahiyamazoo/news-blog/news.html (notice 6 Nov 2026)
 *       winter season 11 Nov 2026 – 7 Apr 2027, 10:30–15:30, last entry 15:00;
 *       closed 30 Dec – 1 Jan; penguin walk late Dec to mid Mar in snow, 11:00 and
 *       14:30 (11:00 only in March), start announced on the zoo's SNS, may be suspended
 *   city.asahikawa.hokkaido.jp/asahiyamazoo/generalinformation/d052849.html
 *       adult ¥1,000, junior-high age and under free (page updated 1 Oct 2026)
 *   biei-hokkaido.jp/ja/27188/ (notice 21 Oct 2026)
 *       Blue Pond light-up 22 Oct 2026 – 21 Apr 2027; Dec 16:30, Jan 17:00, Feb 17:30,
 *       Mar 18:00 start, all to 21:00; Shirahige Falls lit all year, sunset to 21:00
 *   biei-hokkaido.jp/ja/shirogane-blue-pond/  Blue Pond 20 min by car or Dohoku bus from
 *       JR Biei Station; snow hides the blue water in winter; may be cancelled in bad weather
 *   jrhokkaido.co.jp/global/english/ticket/regular/  Sapporo–Asahikawa ¥5,440 (Lilac/Kamui,
 *       all seats reserved); Asahikawa–Biei local ¥680; Sapporo–Otaru ¥800 (non-reserved,
 *       IC card OK)
 *   jrhokkaido.co.jp/global/english/travel/model/winter03.html  Sapporo → Asahikawa 1hr 25min;
 *       Asahikawa Sta → Asahiyama Zoo 40 min by bus; Sapporo → Otaru 35 min; Sapporo White
 *       Illumination late Nov to mid March
 *   snowfes.com/news/948.html  77th Sapporo Snow Festival 4–11 Feb 2027 (notice 13 Jul 2026)
 *   hyoutou-special.asia  Chitose–Lake Shikotsu Ice Festival 30 Jan – 23 Feb 2027, 10:00–20:00,
 *       lit 16:30–20:00; junior high and up ¥1,000 weekdays, ¥3,000 weekends and holidays,
 *       primary age free
 *
 * Carried with their own date: Otaru Snow Light Path 6–13 Feb 2027 (otaru.gr.jp, 6 Nov 2026).
 * Tour contents are as the Klook listings describe them (www.klook.com search index,
 * 16 Nov 2026; 181785 on 6 Nov 2026). No Klook price is printed.
 */

const ROUTE = "/guides/attractions/hokkaido-winter-tours";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-16");
const OTARU_LIGHTS = checkedLabel("2026-11-06");

type TourRow = { tour: string; where: string; length: string; season: string; who: string };

/** Table 1: the tours side by side. First row is the answer. */
const tourRows: TourRow[] = [
  {
    tour: "If unsure, pick this: winter Asahiyama Zoo + Shirahige Falls + Blue Pond light-up",
    where: "Asahikawa and Biei (Shirogane)",
    length: "A full day, back in Sapporo after dark (see the listing)",
    season: "Zoo winter season 11 Nov 2026 – 7 Apr 2027; penguin walk late Dec – mid Mar; Blue Pond lit 22 Oct 2026 – 21 Apr 2027",
    who: "First winter trip to Hokkaido; anyone who wants the penguin walk and the lit pond in one booking",
  },
  {
    tour: "Asahiyama Zoo, Biei Blue Pond & Ningle Terrace (snowmobile option)",
    where: "Asahikawa, Biei, Furano (Ningle Terrace)",
    length: "A full day; sold on several routes",
    season: "Same zoo and pond dates; the snowmobile is a winter option at extra cost",
    who: "Travellers who want a snow activity added to the zoo day",
  },
  {
    tour: "Otaru, Shiroi Koibito Park & snow park",
    where: "Otaru and west Sapporo",
    length: "A day",
    season: "Snow season; Otaru Snow Light Path 6–13 Feb 2027",
    who: "Families and a first day in Sapporo; the shortest drive",
  },
  {
    tour: "Yoichi & Otaru walking tour",
    where: "Nikka Yoichi distillery, a sake brewery, Otaru canal",
    length: "A day by train and bus, about 4 km of walking",
    season: "Year-round; winter means walking on snow",
    who: "Whisky drinkers; small groups with an English-speaking assistant",
  },
  {
    tour: "Sapporo Kokusai ski or snow-play day + Otaru",
    where: "Sapporo Kokusai ski area and Otaru",
    length: "About 10 hours",
    season: "Ski season",
    who: "Beginners to advanced skiers who want Otaru on the way back",
  },
  {
    tour: "Lake Shikotsu Ice Festival half day",
    where: "Lake Shikotsu, Chitose",
    length: "Half day, into the evening",
    season: "Festival 30 Jan – 23 Feb 2027, lit 16:30–20:00",
    who: "Anyone in Sapporo in February who has a free afternoon",
  },
];

/** Table 2: tour against JR and route bus, on official times and fares. */
const diyRows = [
  {
    trip: "Asahiyama Zoo",
    diy: "JR Lilac/Kamui to Asahikawa, 1h25m, ¥5,440 one way (all seats reserved), then 40 min by bus",
    changes: "1 change (train → bus)",
    risk: "Last entry 15:00; a delayed train on snow eats into a short zoo day",
    verdict: "Train works for the zoo alone if you start early",
  },
  {
    trip: "Asahiyama Zoo + Blue Pond light-up",
    diy: "As above, back to Asahikawa, local train to Biei (¥680), then Dohoku bus about 20 min to the pond",
    changes: "3 changes",
    risk: "The pond is lit after dark, well beyond Biei Station; buses back are few and roads are icy",
    verdict: "Take a tour",
  },
  {
    trip: "Otaru",
    diy: "JR Rapid Airport, 35 min, ¥800 one way; an IC card is enough for non-reserved cars",
    changes: "None",
    risk: "Low; the canal is a walk from Otaru Station",
    verdict: "Go by train unless you want the snow park too",
  },
  {
    trip: "Lake Shikotsu Ice Festival",
    diy: "A seasonal shuttle bus or a route bus via Chitose",
    changes: "Depends on the bus",
    risk: "The site is lit until 20:00; the ride back is on dark mountain roads",
    verdict: "Tour or shuttle seat",
  },
];

/** Table 3: winter events, official dates only. */
const eventRows = [
  {
    event: "Sapporo Snow Festival 2027",
    dates: "4–11 Feb 2027 (Odori, Susukino, Tsudome)",
    note: "Free; book Sapporo rooms first",
    source: `snowfes.com, ${OWN}`,
  },
  {
    event: "Asahiyama Zoo penguin walk",
    dates: "About late Dec to mid Mar, 11:00 and 14:30 (March: 11:00 only)",
    note: "In snow only; start announced on the zoo's social media; may be suspended for weather",
    source: `city.asahikawa.hokkaido.jp, ${OWN}`,
  },
  {
    event: "Asahiyama Zoo winter season",
    dates: "11 Nov 2026 – 7 Apr 2027, 10:30–15:30, last entry 15:00; closed 30 Dec – 1 Jan",
    note: "Adult ¥1,000; junior-high age and under free",
    source: `city.asahikawa.hokkaido.jp, ${OWN}`,
  },
  {
    event: "Blue Pond light-up, Biei",
    dates: "22 Oct 2026 – 21 Apr 2027; from 16:30 (Dec), 17:00 (Jan), 17:30 (Feb), 18:00 (Mar), to 21:00",
    note: "Snow covers the water; may be cancelled in bad weather",
    source: `biei-hokkaido.jp, ${OWN}`,
  },
  {
    event: "Chitose–Lake Shikotsu Ice Festival",
    dates: "30 Jan – 23 Feb 2027, 10:00–20:00, lit 16:30–20:00",
    note: "¥1,000 weekdays, ¥3,000 weekends and holidays (junior high and up)",
    source: `hyoutou-special.asia, ${OWN}`,
  },
  {
    event: "Otaru Snow Light Path",
    dates: "6–13 Feb 2027",
    note: "Evening candles along the canal",
    source: `otaru.gr.jp, ${OTARU_LIGHTS}`,
  },
];

const faqItems = [
  {
    q: "What are the best Hokkaido winter tours from Sapporo?",
    a: `Three kinds: Asahiyama Zoo with the Biei Blue Pond light-up, Otaru (with a snow park or the Yoichi distillery), and a snow-activity day such as a snowmobile option or Sapporo Kokusai skiing. If you take one, take the winter Asahiyama and Blue Pond day: the penguin walk runs only from about late December to mid-March, and the pond is lit only from 22 October 2026 to 21 April 2027 (official sites, read ${OWN}).`,
  },
  {
    q: "When is the Asahiyama Zoo penguin walk?",
    a: `In the snow season, from about late December to mid-March, at 11:00 and 14:30; in March at 11:00 only. The zoo announces the first walk on its social media and may suspend it for weather or snow conditions. The winter season runs 11 November 2026 to 7 April 2027, 10:30 to 15:30, closed 30 December to 1 January (read ${OWN}).`,
  },
  {
    q: "Is the Blue Pond lit up in winter?",
    a: `Yes. Biei lights the Blue Pond from 22 October 2026 to 21 April 2027, from 16:30 in December, 17:00 in January, 17:30 in February and 18:00 in March, until 21:00. Snow covers the water in winter, so you see lit trees and snow rather than blue water, and the lights can be cancelled in bad weather (read ${OWN}).`,
  },
  {
    q: "Should I take a tour or go by train in winter?",
    a: "By train for Otaru (35 minutes, ¥800) and for Asahiyama Zoo alone if you start early. Take a tour for the zoo plus the Blue Pond light-up: by JR and bus that is three changes, the pond is lit after dark far from Biei Station, and the roads are icy.",
  },
  {
    q: "How long is a Sapporo winter day tour?",
    a: "Most are a full day; the Sapporo Kokusai ski and Otaru day is listed at about 10 hours, and the Lake Shikotsu ice festival trip is a half day into the evening. Check the listing for pick-up time and return before you book.",
  },
  {
    q: "What happens if snow delays the tour?",
    a: "Klook's winter Hokkaido listings warn that snow can delay the coach, that stops may be swapped or shortened, and that a late arrival can miss the penguin walk. Read the cancellation and weather terms on the listing, and keep a spare day rather than booking the tour on your last day.",
  },
  {
    q: "When is the Sapporo Snow Festival 2027?",
    a: `4 to 11 February 2027, at Odori Park, Susukino and Tsudome (snowfes.com, read ${OWN}). The Lake Shikotsu Ice Festival overlaps it (30 January to 23 February 2027), and the Otaru Snow Light Path runs 6 to 13 February 2027.`,
  },
  {
    q: "What should I wear on a Hokkaido winter tour?",
    a: "Clothes for well below freezing and boots with grip. The zoo warns its paths are hilly and slippery in snow, and the Blue Pond and Lake Shikotsu are visited after dark, the coldest part of the day.",
  },
];

const TITLE = "Hokkaido Winter Tours 2026-27: Best Day Tours From Sapporo";
const DESCRIPTION =
  "Hokkaido Winter Tours compared: a Sapporo winter day tour to Asahiyama Zoo and the lit Blue Pond, Otaru or skiing. Which Hokkaido winter tour from Sapporo?";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function HokkaidoWinterToursPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Hokkaido Winter Tours", item: URL },
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
          <span className={styles.breadCurrent}>Hokkaido Winter Tours</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hokkaido Winter Tours 2026-27:<br />Which Sapporo Winter Day Tour to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Six day tours out of Sapporo side by side — the zoo where penguins walk in the snow, the lit Blue Pond,
            Otaru, Yoichi, skiing and the ice festival — with the winter-only dates each one depends on.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official winter dates, dated", "Tour vs train table", "No Klook prices — check your date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best first pick</p>
                <p className={styles.verdictStatValue}>Asahiyama Zoo + Blue Pond light-up</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Penguin walk</p>
                <p className={styles.verdictStatValue}>Late Dec – mid Mar, 11:00 &amp; 14:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Blue Pond lit</p>
                <p className={styles.verdictStatValue}>22 Oct 2026 – 21 Apr 2027</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Snow Festival 2027</p>
                <p className={styles.verdictStatValue}>4–11 February</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Hokkaido winter tours</strong> from Sapporo come in three kinds: <strong>Asahiyama Zoo with the
              Biei Blue Pond light-up</strong>, <strong>Otaru or Yoichi</strong>, and a <strong>snow-activity day</strong>{" "}
              (a snowmobile option or Sapporo Kokusai skiing). Each is a full day; the ski and Otaru day is listed at
              about 10 hours, and the Lake Shikotsu ice festival is a half day. The zoo&apos;s penguin walk runs only from
              about <strong>late December to mid-March</strong> (11:00 and 14:30), and the pond is lit from{" "}
              <strong>22 October 2026 to 21 April 2027</strong>. If you book one, book the winter zoo and Blue Pond day.
              Dates read on the zoo&apos;s and Biei&apos;s official sites {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={asahiyamaWinterBluePondTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Winter Zoo &amp; Blue Pond Tour →
              </KlookLink>
              <KlookLink href={asahiyamaBieiHighlightsTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Zoo + Snowmobile Option →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>What Are the Best Hokkaido Winter Tours From Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The winter Asahiyama and Blue Pond day, because both of its highlights exist only in winter. Otaru is the
            easy day and works by train (see our{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip from Sapporo</Link> guide); a snow day suits travellers who came for the snow itself. Every{" "}
            <strong>Hokkaido winter tour from Sapporo</strong> below meets in the city.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Where it goes", "Length", "Winter dates it depends on", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={thStyle}>{row.tour}</td>
                      <td style={thStyle}>{row.where}</td>
                      <td style={thStyle}>{row.length}</td>
                      <td style={thStyle}>{row.season}</td>
                      <td style={thStyle}>{row.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/news-blog/news.html" target="_blank" rel="noopener">Asahiyama Zoo winter notice</a>,{" "}
            <a href="https://www.biei-hokkaido.jp/ja/27188/" target="_blank" rel="noopener">Biei light-up notice</a>,{" "}
            <a href="https://hyoutou-special.asia/" target="_blank" rel="noopener">Lake Shikotsu Ice Festival</a>. Tour
            lengths and contents are as the Klook listings describe them; Otaru Snow Light Path dates from otaru.gr.jp,{" "}
            {OTARU_LIGHTS}. Klook does not publish a fixed price — open a listing for your date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={asahiyamaWinterBluePondTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Winter zoo + Blue Pond light-up →
            </KlookLink>
            <KlookLink href={otaruSnowParkDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Otaru + snow park →
            </KlookLink>
            <KlookLink href={yoichiOtaruWalkingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yoichi &amp; Otaru →
            </KlookLink>
          </div>
        </section>

        {/* Penguin walk */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Asahiyama Zoo</span>
          <h2 className={styles.sectionTitle}>When Is the Asahiyama Zoo Penguin Walk?</h2>
          <p className={styles.bodyText}>
            From about <strong>late December to mid-March</strong>, once there is snow, at <strong>11:00 and 14:30</strong>;
            in March at 11:00 only. The zoo announces the first walk on its social media and may suspend a walk or change
            the route for weather. The winter season runs <strong>11 November 2026 to 7 April 2027</strong>, 10:30 to
            15:30 with last entry at 15:00, and the zoo is closed 30 December to 1 January. Admission is ¥1,000 for
            adults and free for junior-high age and under (read {OWN}).
          </p>
          <p className={styles.bodyText}>
            <strong>What this means for a booking:</strong> choose a tour date between late December and mid-March, and
            pick a listing that arrives before 14:30. Klook&apos;s winter listings warn that snow can delay the coach and
            a late arrival can miss the walk.
          </p>
        </section>

        {/* Blue Pond */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Biei</span>
          <h2 className={styles.sectionTitle}>Is the Blue Pond Lit Up in Winter?</h2>
          <p className={styles.bodyText}>
            Yes — from <strong>22 October 2026 to 21 April 2027</strong>, starting at 16:30 in December, 17:00 in January,
            17:30 in February and 18:00 in March, and ending at 21:00. Snow covers the water, so in winter the light
            show plays on snow, larch trees and falling flakes rather than blue water. Nearby Shirahige Falls is lit all
            year from sunset to 21:00. The lights can be cancelled in bad weather (biei-hokkaido.jp, read {OWN}).
          </p>
          <p className={styles.bodyText}>
            The pond is about 20 minutes by car or Dohoku bus from JR Biei Station, so a lit visit after a zoo day is
            the part that is hard without a coach. Year-round Furano and Biei tours are compared in our{" "}
            <Link href="/guides/attractions/furano-biei-tour">Furano and Biei tour guide</Link>.
          </p>
        </section>

        {/* Tour vs train */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or train</span>
          <h2 className={styles.sectionTitle}>Should I Take a Tour or Go by Train in Winter?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Train for Otaru, tour for the Blue Pond. The zoo alone works by JR and bus if you leave early; adding the lit
            pond means three changes, after dark, on icy roads.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day out", "By JR and bus", "Changes", "Winter risk", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {diyRows.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider} style={thStyle}>{row.trip}</td>
                      <td style={thStyle}>{row.diy}</td>
                      <td style={thStyle}>{row.changes}</td>
                      <td style={thStyle}>{row.risk}</td>
                      <td style={thStyle}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/ticket/regular/index.html" target="_blank" rel="noopener">JR Hokkaido fares</a>,{" "}
            <a href="https://www.jrhokkaido.co.jp/global/english/travel/model/winter03.html" target="_blank" rel="noopener">JR Hokkaido winter route</a>,{" "}
            <a href="https://www.biei-hokkaido.jp/ja/shirogane-blue-pond/" target="_blank" rel="noopener">Biei Blue Pond access</a>. Adult
            one-way fares; children aged 6–11 pay half. The Otaru day in full is in our{" "}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo">Otaru day trip from Sapporo guide</Link>.
          </p>
        </section>

        {/* Booking terms */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you pay</span>
          <h2 className={styles.sectionTitle}>What Should I Check Before Booking a Winter Tour?</h2>
          <p className={styles.bodyText}>
            Three lines on the listing: the <strong>weather terms</strong> (snow can delay the coach or swap a stop), the{" "}
            <strong>cancellation window</strong>, and <strong>what is included</strong> — the winter Asahiyama listing
            includes zoo admission, while lunch at the zoo is at your own cost. Do not book it on your last day in
            Hokkaido: if snow cancels or shortens it, there is no day to move to.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Is a Snowmobile Included?
          </h3>
          <p className={styles.bodyText}>
            Not in the price. The Asahiyama, Blue Pond and Ningle Terrace listing sells the snowmobile as a winter option
            at extra cost, on some of its routes; check which route your date runs.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={asahiyamaBieiHighlightsTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Zoo, Blue Pond &amp; snowmobile option →
            </KlookLink>
            <KlookLink href={sapporoKokusaiOtaruDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Sapporo Kokusai ski + Otaru →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book With a Hokkaido Winter Tour"
          intro="The tour, a room near the pick-up, the pass if you go by train, the airport leg and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={hokkaidoWinterToursTripPrep}
        />

        {/* Events */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Winter events</span>
          <h2 className={styles.sectionTitle}>Which Winter Events Can a Sapporo Tour Reach?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Early to mid-February is the busiest stretch: the Snow Festival, the Lake Shikotsu Ice Festival and the
            Otaru Snow Light Path all overlap, and rooms in Sapporo go first.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Event", "Dates (official)", "Notes", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {eventRows.map((row) => (
                    <tr key={row.event}>
                      <td className={styles.tdProvider} style={thStyle}>{row.event}</td>
                      <td style={thStyle}>{row.dates}</td>
                      <td style={thStyle}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.snowfes.com/news/948.html" target="_blank" rel="noopener">snowfes.com</a>,{" "}
            <a href="https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/generalinformation/d052849.html" target="_blank" rel="noopener">Asahiyama Zoo admission</a>,{" "}
            <a href="https://www.biei-hokkaido.jp/ja/27188/" target="_blank" rel="noopener">biei-hokkaido.jp</a>,{" "}
            <a href="https://hyoutou-special.asia/" target="_blank" rel="noopener">hyoutou-special.asia</a>. Festival-week
            plans are in our <Link href="/guides/attractions/sapporo-snow-festival-tours">Sapporo Snow Festival guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={lakeShikotsuIceFestivalHalfDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Lake Shikotsu ice festival half day →
            </KlookLink>
          </div>
        </section>

        {/* Planning */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Planning</span>
          <h2 className={styles.sectionTitle}>How Many Winter Tours Fit Into a Sapporo Trip?</h2>
          <p className={styles.bodyText}>
            One or two. A three-night stay usually has the city on one day, Otaru on another and one long coach day; our{" "}
            <Link href="/guides/attractions/sapporo-3-day-itinerary">Sapporo 3 day itinerary</Link> lays that out. A week
            with a second base is in our{" "}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary">Hokkaido 7 day itinerary</Link>, and a Japan-wide
            plan with Sapporo as the February swap is in our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link>.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Are Winter Tours OK With Children?
          </h3>
          <p className={styles.bodyText}>
            Yes, with warm layers: zoo admission is free for junior-high age and under, and the Otaru and snow-park day
            has the shortest drive. The full Asahiyama and Blue Pond day is long and ends after dark, so it suits older
            children better.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Should I Wear?
          </h3>
          <p className={styles.bodyText}>
            Clothes for well below freezing and boots with grip. The zoo warns that its hilly paths can be slippery in
            snow, and both the Blue Pond and Lake Shikotsu are visited after dark.
          </p>
        </section>

        <KlookStayAreas
          heading="Where to Stay for Sapporo Winter Tours"
          intro="Most coach days meet near Sapporo Station or Odori. Room prices change by date, so each area links to Klook's hotel search."
          areas={[sapporoSnowFestivalStayAreas[0], sapporoSnowFestivalStayAreas[1], sapporoSnowFestivalStayAreas[2]]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Pick-up messages, snow delays and the penguin-walk notice all arrive on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
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
          heading="Winter Day Tours From Sapporo"
          intro="Two Asahiyama days, two Otaru days, a ski day and the ice festival. Durations, pick-up and inclusions are on each listing."
          tours={[
            asahiyamaWinterBluePondTour,
            asahiyamaBieiHighlightsTour,
            otaruSnowParkDayTour,
            yoichiOtaruWalkingTour,
            sapporoKokusaiOtaruDayTour,
            lakeShikotsuIceFestivalHalfDayTour,
          ]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/sapporo-3-day-itinerary", title: "Sapporo 3 Day Itinerary (2027): Winter, Otaru & Asahiyama" },
              { href: "/guides/attractions/furano-biei-tour", title: "Furano & Biei Day Tour from Sapporo: Winter Light-Ups" },
              { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo (2027)" },
              { href: "/guides/attractions/sapporo-snow-festival-tours", title: "Sapporo Snow Festival Tours (2027): 4–11 Feb" },
              { href: "/guides/attractions/sapporo-ski-day-trip", title: "Sapporo Ski Day Trip 2026-27" },
              { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
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
            <h2 className={styles.ctaBannerTitle}>One winter day that only happens in winter</h2>
            <p className={styles.ctaBannerDesc}>
              Pick a date between late December and mid-March, book the zoo and Blue Pond coach, and keep a spare day
              for snow.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={asahiyamaWinterBluePondTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Winter Asahiyama Tour →
              </KlookLink>
              <KlookLink href={sapporoSnowFestivalStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Hotels at Sapporo Station →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
