import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { priceById, checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  dotonboriCityCruise,
  jrHarukaUrl,
  kobeFerrisKitanoArimaRokkoDayTour,
  kuromonMarketFoodTour,
  kyotoNaraKiyomizuTour,
  nankaiRapitUrl,
  osakaAmazingPass,
  osakaAmazingPassKaiyukanCombo,
  osakaAquariumKaiyukanTicket,
  osakaCastleTicket,
  osakaThreeDayStayAreas,
  osakaThreeDayTripPrep,
  osakaWalkingFoodTour,
  usjExpressPassUrl,
  usjStudioPassUrl,
} from "../../../lib/klook-links";

/**
 * Three days in Osaka, added 10 Nov 2026.
 *
 * How it differs from its neighbours:
 *  - osaka-2-day-itinerary is two days with no USJ day and no day trip;
 *  - osaka-kyoto-3-day-itinerary splits three days across two cities;
 *  - this page keeps all three days in Osaka, puts Universal Studios Japan in the
 *    middle, and makes Day 3 a choice between the bay, Nara and Kobe.
 *
 * Sources and dates:
 *  - Osaka Amazing Pass ¥3,500 / ¥5,000, sales period and the 3:00–2:59 pass day,
 *    read on osaka-amazing-pass.com/en/info.html on 10 Nov 2026;
 *  - the castle, garden, cruise, Kaiyukan, Umeda deck and Enjoy Eco Card figures
 *    carry the dates on which the site's own guides read them off the operators;
 *  - Todai-ji from lib/attraction-prices.ts; Kintetsu, Hanshin and the Nara and
 *    Kobe journey times from the Nara and Kobe day-trip guides, with their dates.
 * USJ is date-tiered, so no gate price is printed. No Klook price appears.
 */

const PASS_ISO = "2026-11-10";
const PASS_CHECKED = checkedLabel(PASS_ISO);
const PASS_1_DAY = PRICES.osakaAmazingPass.adult; // ¥3,500, re-read 10 Nov 2026
const PASS_2_DAY = "¥5,000";

const CASTLE_CHECKED = checkedLabel("2026-10-23");
const KAIYUKAN_CHECKED = checkedLabel("2026-10-22");
const OSAKA_OWN = checkedLabel("2026-10-27");
const TODAIJI_CHECKED = checkedLabel(PRICES.todaiji.checked);
const NARA_TIMES = checkedLabel("2026-10-26");
const KINTETSU_FARES = checkedLabel("2026-11-04");
const RAPIT_CHECKED = checkedLabel("2026-10-26");

/** Official adult price, from data/attraction-prices.json (osakaCastle). */
const CASTLE_ADULT = priceById("osakaCastle").adult;
const GARDEN_ADULT = "¥300";
const CRUISE_ADULT = "¥2,000";
/** Official adult price, from data/attraction-prices.json (umedaSky). */
const UMEDA_ADULT = priceById("umedaSky").adult;
const ECO_WEEKDAY = "¥820";
const ECO_WEEKEND = "¥620";
const TODAIJI_ADULT = PRICES.todaiji.adult;
const KINTETSU_NARA = "¥680";
const HANSHIN_KOBE = "¥600";

const ROUTE = "/guides/attractions/osaka-3-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

type Stop = {
  time: string;
  place: string;
  /** Planning allowance, not an operator figure. */
  allow: string;
  getting: string;
  booking: string;
};

const day1: Stop[] = [
  {
    time: "9:00, at opening",
    place: "Osaka Castle main tower, then the Nishinomaru Garden",
    allow: "1.5–2 hours",
    getting: "Osaka Metro to Tanimachi 4-chome, or JR Osakajokoen — about 15–20 minutes on foot to the tower",
    booking: "No slot. Free on the Amazing Pass",
  },
  {
    time: "Lunch",
    place: "Kuromon Ichiba Market, Nipponbashi",
    allow: "1–1.5 hours",
    getting: "Tanimachi Line or Sakaisuji Line to Nipponbashi",
    booking: "Only for a guided food walk",
  },
  {
    time: "Afternoon",
    place: "Shinsaibashi-suji arcade, then the Tombori River Cruise",
    allow: "1.5 hours, plus about 40 minutes for the boat",
    getting: "On foot from Kuromon, under cover most of the way",
    booking: "Timed boat ticket; on the pass, exchange it at the desk during the day for an evening slot",
  },
  {
    time: "Early evening",
    place: "Dotonbori, the Glico sign and Hozenji Yokocho",
    allow: "2 hours",
    getting: "On foot from the pier",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Shinsekai and Tsutenkaku for kushikatsu",
    allow: "2 hours",
    getting: "Midosuji Line from Namba to Dobutsuen-mae (on the pass)",
    booking: "No",
  },
];

const day2: Stop[] = [
  {
    time: "Before opening",
    place: "Universal Studios Japan",
    allow: "The whole day",
    getting: "JR from Osaka Station on the Yumesaki Line, usually with a change at Nishikujo — about 20 minutes on the Osaka Convention & Tourism Bureau's figure",
    booking: "Yes — a date-specified Studio Pass, sold online",
  },
  {
    time: "On arrival in the park",
    place: "Super Nintendo World area timed entry",
    allow: "Depends on the time you are given",
    getting: "Through the park's own app, on the day",
    booking: "Free in the park's app on the day",
  },
  {
    time: "Evening",
    place: "Back to your base for dinner — Dotonbori from Namba, or the Umeda food halls",
    allow: "2 hours",
    getting: "JR back to Osaka Station; the Midosuji Line on to Namba",
    booking: "No",
  },
];

const day3Bay: Stop[] = [
  {
    time: "From opening",
    place: "Osaka Aquarium Kaiyukan, Tempozan",
    allow: "2–2.5 hours in one visit",
    getting: "Osaka Metro Chuo Line to Osakako, about 5 minutes on foot",
    booking: "Yes in practice — a 15-minute entry slot; not on the Amazing Pass",
  },
  {
    time: "Lunch",
    place: "Tempozan Marketplace and the Giant Ferris Wheel",
    allow: "1–1.5 hours",
    getting: "Next door to the aquarium",
    booking: "No",
  },
  {
    time: "Afternoon to evening",
    place: "Umeda Sky Building, Kuchu Teien Observatory, then Umeda",
    allow: "1–1.5 hours on the deck",
    getting: "Chuo Line to Hommachi, Midosuji Line to Umeda, about 7 minutes on foot",
    booking: "No — the counter sells same-day tickets until 22:00",
  },
];

const day3Nara: Stop[] = [
  {
    time: "Morning",
    place: "Kintetsu Express, Osaka-Namba → Kintetsu-Nara",
    allow: "About 34 minutes",
    getting: `${KINTETSU_NARA} adult, no reserved seat`,
    booking: "No",
  },
  {
    time: "Late morning",
    place: "Nara Park and the deer, then Todai-ji's Great Buddha Hall",
    allow: "2–3 hours",
    getting: "On foot from Kintetsu-Nara",
    booking: `No — ${TODAIJI_ADULT} at the gate; the park is free`,
  },
  {
    time: "Afternoon",
    place: "Kasuga Taisha and Naramachi, then the train back",
    allow: "2 hours",
    getting: "On foot, then Kintetsu back to Namba",
    booking: "No",
  },
];

const priceRows = [
  {
    item: "Osaka Amazing Pass",
    price: `${PASS_1_DAY} 1 day, ${PASS_2_DAY} 2 consecutive days (one price for all ages)`,
    note: "A pass day runs 3:00 to 2:59; each facility once. On sale 25 March 2026 – 31 March 2027. Not USJ, not the Kaiyukan",
    source: `osaka-amazing-pass.com/en, ${PASS_CHECKED}`,
  },
  {
    item: "Osaka Castle main tower (Day 1)",
    price: `${CASTLE_ADULT} adult, ¥600 university and high-school students with ID, free below that`,
    note: "9:00–18:00, last admission 17:30; free on the pass",
    source: `osakacastle.net, ${CASTLE_CHECKED}`,
  },
  {
    item: "Nishinomaru Garden (Day 1)",
    price: `${GARDEN_ADULT} (¥350 in cherry-blossom season)`,
    note: "Closed Mondays; free on the pass",
    source: `Osaka Amazing Pass facility list, ${CASTLE_CHECKED}`,
  },
  {
    item: "Tombori River Cruise (Day 1)",
    price: `${CRUISE_ADULT} adult, ¥500 elementary-school child`,
    note: "About 20 minutes; departures 11:00–21:00; free on the pass",
    source: `Osaka's official tourism site and the pass facility list, ${CASTLE_CHECKED}`,
  },
  {
    item: "Universal Studios Japan 1-Day Studio Pass (Day 2)",
    price: "Changes by date — check the official date-by-date price",
    note: "Online only; Super Nintendo World area timed entry through the park's app",
    source: "usj.co.jp (date-tiered, so no single figure)",
  },
  {
    item: "Osaka Aquarium Kaiyukan (Day 3, bay option)",
    price: "¥2,700–3,200 adult by date, ¥700–800 aged 3 and over",
    note: "15-minute slots, e-tickets from about 30 days ahead, no re-entry since 15 June 2026",
    source: `kaiyukan.com, ${KAIYUKAN_CHECKED}`,
  },
  {
    item: "Umeda Sky Building, Kuchu Teien (Day 3, bay option)",
    price: `${UMEDA_ADULT} adult, ¥500 aged 4–12`,
    note: "9:30–22:30, last admission 22:00",
    source: `skybldg.co.jp, ${OSAKA_OWN}`,
  },
  {
    item: "Enjoy Eco Card (Day 3 transport)",
    price: `${ECO_WEEKDAY} weekday, ${ECO_WEEKEND} weekend or holiday, ¥310 child`,
    note: "Unlimited Osaka Metro and city buses for one day, no admissions",
    source: `subway.osakametro.co.jp, ${OSAKA_OWN}`,
  },
  {
    item: "Todai-ji Great Buddha Hall (Day 3, Nara option)",
    price: `${TODAIJI_ADULT} adult, ${PRICES.todaiji.child} ages 6–12`,
    note: "Nara Park and the deer are free",
    source: `todaiji.or.jp, ${TODAIJI_CHECKED}`,
  },
  {
    item: "Kintetsu Osaka-Namba → Kintetsu-Nara",
    price: `${KINTETSU_NARA} adult, one way`,
    note: `About 34 minutes on the Kintetsu Express (Nara Prefecture's travel guide, ${NARA_TIMES})`,
    source: `kintetsu.co.jp, ${KINTETSU_FARES}`,
  },
  {
    item: "Hanshin Osaka-Namba → Kobe-Sannomiya (Kobe option)",
    price: `${HANSHIN_KOBE} adult, ¥300 child, one way`,
    note: "Direct on the Hanshin Namba Line through service; Umeda → Sannomiya is about 30 minutes by JR, Hankyu or Hanshin (VISIT KOBE)",
    source: `hanshin.co.jp and feel-kobe.jp, ${OSAKA_OWN}`,
  },
];

const passRows = [
  {
    day: "Day 1 — castle, Kuromon, Dotonbori, Shinsekai",
    paid: `Castle ${CASTLE_ADULT} + garden ${GARDEN_ADULT} + cruise ${CRUISE_ADULT} = ¥3,500, plus 3–4 subway rides`,
    pass: "Yes — 1-day pass",
    why: "Three paid stops on the pass equal its price before the rides are counted",
  },
  {
    day: "Day 2 — Universal Studios Japan",
    paid: "Studio Pass (date-tiered) and the JR ride",
    pass: "No",
    why: "The park is not on the pass, and JR is not one of its lines",
  },
  {
    day: "Day 3 — Kaiyukan and Umeda",
    paid: `Kaiyukan ¥2,700–3,200 + Umeda deck ${UMEDA_ADULT}`,
    pass: "Usually no",
    why: `The Kaiyukan is not on the pass and the Umeda deck is free only before 15:00. An ${ECO_WEEKDAY} Enjoy Eco Card covers the subway`,
  },
  {
    day: "Day 3 — Nara",
    paid: `Kintetsu ${KINTETSU_NARA} each way + Todai-ji ${TODAIJI_ADULT}`,
    pass: "No",
    why: "The pass ends at the Osaka city limits",
  },
  {
    day: "Day 3 — Kobe",
    paid: `Hanshin ${HANSHIN_KOBE} each way from Namba + Kobe admissions`,
    pass: "No",
    why: "Kobe is outside the pass area",
  },
];

const stayRows = [
  {
    area: "Namba",
    good: "Dotonbori and Kuromon on foot; Kintetsu to Nara and Hanshin to Kobe from Osaka-Namba; Nankai Rapi:t to Kansai Airport",
    catch: "Loud late at night; the USJ day starts with the Midosuji Line up to Umeda and then JR",
    pick: "The default for three days, especially if Day 3 is Nara",
  },
  {
    area: "Umeda / Osaka Station",
    good: "JR to Universal City starts here; JR, Hankyu and Hanshin to Kobe; Shin-Osaka two stops up the Midosuji Line",
    catch: "About 20 minutes of Midosuji Line from the Day 1 evening in Minami",
    pick: "Arriving or leaving by shinkansen, or Day 3 is Kobe",
  },
  {
    area: "Universal City (USJ)",
    good: "Walk to the park gates before opening",
    catch: "JR Yumesaki Line only — no Osaka Metro station, so Day 1 and Day 3 both start with a change",
    pick: "Only if the park is the main reason for the trip",
  },
];

const faqItems = [
  {
    q: "Is 3 days in Osaka enough?",
    a: `Yes, for the city plus one of Universal Studios Japan or a day trip, and just about for both. Day 1 covers the castle and Minami, Day 2 is the park, and Day 3 is either the Kaiyukan and Umeda or a day in Nara or Kobe. What three days does not hold is USJ, the bay and a day trip all together — pick two of the three. For two days, see the Osaka 2 day itinerary; for a trip that also takes in Kyoto, see the Osaka Kyoto 3 day itinerary.`,
  },
  {
    q: "Which day should I use the Osaka Amazing Pass?",
    a: `Day 1. The 1-day pass is ${PASS_1_DAY} (${PASS_2_DAY} for two consecutive days), read on osaka-amazing-pass.com on ${PASS_CHECKED}. Day 1's castle tower (${CASTLE_ADULT}), Nishinomaru Garden (${GARDEN_ADULT}) and Tombori cruise (${CRUISE_ADULT}) add up to ¥3,500, so the subway rides are the saving. Do not use it on the USJ day: the park is not on the pass and the JR ride there is not covered. On Day 3 the Kaiyukan is not a pass facility either, and Nara and Kobe are outside the pass area.`,
  },
  {
    q: "Should I go to Nara or Kobe on day 3?",
    a: `Nara if you want the classic sights: Kintetsu from Osaka-Namba takes about 34 minutes for ${KINTETSU_NARA}, the deer park is free, and Todai-ji's Great Buddha Hall is ${TODAIJI_ADULT}. Kobe if you want the harbour, the Kitano streets and a Kobe beef meal: about 30 minutes from Umeda, or ${HANSHIN_KOBE} direct from Namba on the Hanshin line. Neither needs a booking unless you want a guided day or a reserved Kobe beef table.`,
  },
  {
    q: "Where should I stay for 3 days in Osaka?",
    a: "Namba for most trips. Dotonbori is on foot for the Day 1 evening, and Kintetsu to Nara, Hanshin to Kobe and the Nankai train to Kansai Airport all leave from Osaka-Namba. Pick Umeda if you arrive by shinkansen or Day 3 is Kobe. Stay at Universal City only if the park is the main reason for the trip, because it is on the JR Yumesaki Line and has no subway station.",
  },
  {
    q: "What should I book before going to Osaka for 3 days?",
    a: "The USJ Studio Pass first: it is date-specified and sold online, and the Express Passes are limited per day. Then the Kaiyukan if Day 3 is the bay: entry is a 15-minute slot, e-tickets go on sale about 30 days ahead, and the counter sells same-day only. The Amazing Pass, the castle, Dotonbori, Kuromon, Nara and Kobe need no advance booking. Check the cancellation policy on the listing for your date before you buy the USJ and Kaiyukan tickets.",
  },
  {
    q: "How much does a 3 day Osaka itinerary cost in admissions?",
    a: `Day 1 is ¥3,500 of admissions, or just the ${PASS_1_DAY} pass. Day 2 is the Studio Pass, whose price changes by date on the park's official site. Day 3 is ¥2,700–3,200 for the Kaiyukan plus ${UMEDA_ADULT} for the Umeda deck, or about ${TODAIJI_ADULT} for Todai-ji plus ${KINTETSU_NARA} each way on Kintetsu for Nara. Sources and check dates are in the price table on this page.`,
  },
  {
    q: "Does this itinerary work with kids or in the rain?",
    a: "Yes. With children, USJ and the Kaiyukan are the two strongest days, and Kaiyukan is ¥700–800 from age 3. In rain, the Shinsaibashi arcade and Kuromon Market are covered, and the castle tower and the Kaiyukan are indoors. Rain mainly affects the open-top Tombori boat and Nara Park, so swap Day 3 to the bay if the forecast is wet.",
  },
];

const TITLE = "Osaka 3 Day Itinerary (2026): Day by Day, and What to Book";
const DESCRIPTION =
  "Osaka 3 day itinerary: the castle and Dotonbori, then USJ, then the Kaiyukan, Nara or Kobe. 3 days in Osaka with the Amazing Pass day, costs and hotels.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

function StopTable({ rows }: { rows: Stop[] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Time", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.place}>
                <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const crumbSep = (
  <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const related = [
  { href: "/guides/attractions/osaka-2-day-itinerary", title: "Osaka 2 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "Osaka Kyoto 3 Day Itinerary (2026): Day by Day & Bookings" },
  { href: "/guides/attractions/osaka-attractions-pass", title: "Osaka Amazing Pass 2026: ¥3,500 Price, Is It Worth It?" },
  { href: "/guides/attractions/usj-tickets-express-pass", title: "Universal Studios Japan Tickets and Express Pass" },
  { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "Osaka Aquarium Kaiyukan Tickets" },
  { href: "/guides/attractions/osaka-castle-tickets", title: "Osaka Castle Tickets" },
  { href: "/guides/attractions/nara-day-trip", title: "Nara Day Trip on Your Own (2026): Trains, Times and Todai-ji" },
  { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka (2026)" },
  { href: "/guides/attractions/kyoto-nara-day-tour-from-osaka", title: "Kyoto and Nara Day Tour from Osaka" },
  { href: "/guides/attractions/where-to-stay-in-osaka", title: "Where to Stay in Osaka (2026): Best Areas Compared" },
  { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka (2026)" },
  { href: "/guides/attractions/osaka-go-kart", title: "Osaka Go Kart 2026: IDP Rules, Routes and Which Tour to Book" },
  { href: "/guides/transport/haruka-vs-nankai-rapit", title: "HARUKA vs Nankai Rapi:t: Kansai Airport to Osaka" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

export default function Osaka3DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Osaka 3 Day Itinerary", item: URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {crumbSep}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {crumbSep}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Osaka 3 Day Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka 3 Day Itinerary (2026):<br />Minami, USJ and a Day Trip
          </h1>
          <p className={styles.heroSubtitle}>
            One pass day, one park day and one choice for the last day — with a table for each, the
            official prices and the bookings that have a date on them.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "A table for each day"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 1 (pass day)</p>
                <p className={styles.verdictStatValue}>Castle, Kuromon, Dotonbori, Shinsekai</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Universal Studios Japan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 3</p>
                <p className={styles.verdictStatValue}>Kaiyukan + Umeda, or Nara, or Kobe</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              For an <strong>Osaka 3 day itinerary</strong>, spend <strong>Day 1</strong> on Osaka Castle
              and Minami (Kuromon Market, the Tombori cruise, Dotonbori, Shinsekai and Tsutenkaku),{" "}
              <strong>Day 2</strong> at <strong>Universal Studios Japan</strong>, and <strong>Day 3</strong>{" "}
              at the Kaiyukan and Umeda — or on a day trip to <strong>Nara</strong> or{" "}
              <strong>Kobe</strong>. Use the <strong>Osaka Amazing Pass</strong> ({PASS_1_DAY} for 1 day,
              official price checked {PASS_CHECKED}) on Day 1 only, when three paid stops are on it; do not
              use it on the USJ day. Stay in <strong>Namba</strong> or <strong>Umeda</strong>. Book the USJ
              ticket first and the Kaiyukan slot second; nothing else needs booking ahead.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Only two days? See the{" "}
              <Link href="/guides/attractions/osaka-2-day-itinerary">Osaka 2 day itinerary</Link>. Want Kyoto
              in the same three days? See the{" "}
              <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">Osaka Kyoto 3 day itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Osaka Amazing Pass for Day 1 →
              </KlookLink>
              <KlookLink href={osakaThreeDayStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hotels in Namba →
              </KlookLink>
            </div>
          </div>
        </div>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should I Spend 3 Days in Osaka?</h2>
          <p className={styles.bodyText}>
            The simplest Osaka itinerary for 3 days gives each day one area. Minami (Namba, Dotonbori, Kuromon) and the castle sit close together
            on the subway, Universal Studios Japan is a separate JR ride and takes a whole day, and the bay,
            Nara and Kobe are each a day of their own. Mixing them costs you cross-city rides.
          </p>
          <p className={styles.bodyText}>
            The order matters for two reasons. Day 1 is the day the Amazing Pass pays for itself, so it
            should be a day full of pass facilities. And USJ goes in the middle so that Day 3 can be
            switched — to the bay if it rains, to Nara or Kobe if it is fine.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>Day 1 — Osaka Castle, Kuromon Market and Dotonbori</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The pass day. Start at the castle at opening, walk the covered arcades south, take the Tombori
            boat, and finish in Dotonbori and Shinsekai after dark.
          </p>
          <StopTable rows={day1} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 1:</strong> the Amazing Pass, if you are using it. The castle
            ticket and the cruise are only worth buying separately if you are not on the pass. Details are
            in the <Link href="/guides/attractions/osaka-castle-tickets">Osaka Castle tickets guide</Link>{" "}
            and the <Link href="/guides/attractions/dotonbori-river-cruise">Dotonbori river cruise guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={osakaCastleTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Castle ticket →
            </KlookLink>
            <KlookLink href={dotonboriCityCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Dotonbori cruise →
            </KlookLink>
            <KlookLink href={kuromonMarketFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kuromon Market food walk →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Day 2 — Universal Studios Japan</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A full day in the park. Get there before opening, sort out Super Nintendo World entry in the
            park&apos;s app as soon as you are inside, and come back to your base for dinner.
          </p>
          <StopTable rows={day2} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 2:</strong> the Studio Pass, which is date-specified and sold
            online. The price changes by date, so check the official date-by-date price for your day. An
            Express Pass is optional and limited per day; it does not include park admission. The full
            breakdown is in the{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets and Express Pass guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={usjStudioPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              USJ Studio Pass on Klook →
            </KlookLink>
            <KlookLink href={usjExpressPassUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              USJ Express Pass on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book these with your USJ ticket"
          heading="Book These on the Same Day as Your USJ Ticket"
          intro="The pass for Day 1, the hotel, a Day 3 tour, the airport train and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={osakaThreeDayTripPrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 3</span>
          <h2 className={styles.sectionTitle}>Day 3 — the Kaiyukan and Umeda, or a Day Trip</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Option A: the bay and Umeda.</strong> The better choice in rain or with children. The
            Kaiyukan has no re-entry, so have lunch at Tempozan after the visit.
          </p>
          <StopTable rows={day3Bay} />
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kaiyukan ticket →
            </KlookLink>
            <KlookLink href={osakaWalkingFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka walking &amp; food tour →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
            <strong>Option B: Nara.</strong> The classic day trip, with no booking needed.
          </p>
          <StopTable rows={day3Nara} />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Option C: Kobe.</strong> About 30 minutes from Umeda by JR, Hankyu or Hanshin, or{" "}
            {HANSHIN_KOBE} direct from Namba on the Hanshin line. The day covers the harbour, the Kitano
            streets and a Kobe beef meal; see the{" "}
            <Link href="/guides/attractions/kobe-day-trip-from-osaka">Kobe day trip guide</Link>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Further afield: Hiroshima.</strong> From Shin-Osaka the fastest Sanyo Shinkansen
            reaches Hiroshima in about 1 hour 20 minutes with no change, so the Peace Memorial Park
            works as a long Day 3 rather than an overnight trip. The fares, the trains a JR Pass
            covers and the JR West pass that fits this trip are in the{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen">Osaka to Hiroshima Shinkansen guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoNaraKiyomizuTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kyoto &amp; Nara day tour from Osaka →
            </KlookLink>
            <KlookLink href={kobeFerrisKitanoArimaRokkoDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kobe day tour from Osaka →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The &ldquo;time to allow&rdquo; column in every day table is a planning allowance, not an
            operator figure. Prices and hours are in the dated table below.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Nara or Kobe</span>
          <h2 className={styles.sectionTitle}>Should I Go to Nara or Kobe on Day 3?</h2>
          <p className={styles.bodyText}>
            Nara for temples and the deer; Kobe for the harbour, the old foreign quarter and a Kobe beef
            meal. Nara is about 34 minutes from Osaka-Namba on Kintetsu for {KINTETSU_NARA}, and the only
            admission on a standard visit is Todai-ji at {TODAIJI_ADULT}. Kobe is about 30 minutes from
            Umeda. If you would rather add Kyoto as well, a guided Kyoto and Nara day from Osaka covers
            both — see the{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka">Kyoto and Nara day tour guide</Link>{" "}
            and the <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link>.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Costs</span>
          <h2 className={styles.sectionTitle}>How Much Do 3 Days in Osaka Cost in Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Official prices only, each with its source and the date it was checked.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Official price", "Notes", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm at booking. Klook prices change by date and are not listed here, so
            open a listing for the figure on yours. More figures are in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The pass</span>
          <h2 className={styles.sectionTitle}>Which Day Should I Use the Osaka Amazing Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Day 1 only, on the 1-day pass. The 2-day pass ({PASS_2_DAY}) has to be two consecutive days,
            and with USJ on Day 2 the second day would be wasted.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Paid stops (official prices)", "Use the pass?", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.day}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.paid}</td>
                      <td style={{ fontSize: "0.88rem" }}><strong>{row.pass}</strong></td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Pass price from osaka-amazing-pass.com, checked {PASS_CHECKED}. If you do want the pass and
            the Kaiyukan in one checkout, Klook sells a combo. The full break-even is in the{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Amazing Pass →
            </KlookLink>
            <KlookLink href={osakaAmazingPassKaiyukanCombo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Amazing Pass + Kaiyukan combo →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay for 3 Days in Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Namba for most trips, Umeda for shinkansen arrivals, Universal City only for a park-first trip.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "What is close", "The catch", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stayRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.good}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.catch}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Room rates change by hotel and date, so none are listed. The{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={{ color: "var(--text)", fontWeight: 600 }}>
              where to stay in Osaka guide
            </Link>{" "}
            compares more areas.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Three Areas"
          intro="Availability and price are per date, so each area links to Klook's hotel search for it."
          areas={osakaThreeDayStayAreas}
        />

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>What Should I Book Before I Go?</h2>
          <div className={styles.whoForGrid}>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>First — the USJ Studio Pass</p>
              <p className={styles.whoForDesc}>Date-specified and sold online. Express Passes are limited per day, so busy dates go first.</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>About 30 days ahead — the Kaiyukan</p>
              <p className={styles.whoForDesc}>E-tickets open about 30 days before your date, entry is a 15-minute slot, and the counter sells same-day only.</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>Any time — the Amazing Pass</p>
              <p className={styles.whoForDesc}>Not date-specified: activate it on the day, within three months of purchase and by 31 March 2027.</p>
            </div>
            <div className={styles.whoForCard}>
              <p className={styles.whoForTitle}>No booking — the rest</p>
              <p className={styles.whoForDesc}>The castle, Kuromon, Dotonbori, Shinsekai, the Umeda deck, Nara and Kobe are all walk-up.</p>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Before buying the USJ and Kaiyukan tickets, check the cancellation policy on the listing for your
            date — they are the two tickets with a date fixed in them.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get From Kansai Airport to My Hotel?</h2>
          <p className={styles.bodyText}>
            To Namba, take the Nankai Rapi:t: a minimum of 34 minutes with no transfer, and a ¥700
            limited express ticket on top of the fare (Nankai, checked {RAPIT_CHECKED}). To Tennoji, Osaka
            or Shin-Osaka, take the JR HARUKA; the discounted one-way for foreign visitors is ¥1,600 to
            Tennoji and ¥1,900 to Osaka or Shin-Osaka from 1 November 2026 (JR West, checked {OSAKA_OWN}).
            Neither is on the Amazing Pass. See{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit">HARUKA vs Nankai Rapi:t</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nankaiRapitUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nankai Rapi:t ticket →
            </KlookLink>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR HARUKA ticket →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Is it enough?</span>
          <h2 className={styles.sectionTitle}>Is 3 Days in Osaka Enough?</h2>
          <p className={styles.bodyText}>
            Yes for the city plus USJ or a day trip. Three days fit the castle and Minami, a full park day
            and one more day, but not USJ, the bay and a day trip together. With four days, do both Day 3
            options.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>What if it rains, or I have kids?</h3>
          <p className={styles.bodyText}>
            Rain: take Option A on Day 3 — the Kaiyukan, the castle tower and the arcades are indoors or
            covered; the Tombori boat is open-top. Kids: USJ and the Kaiyukan are the two strongest days,
            and the Kaiyukan is ¥700–800 from age 3.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>What is the best time for Dotonbori and the Umeda deck?</h3>
          <p className={styles.bodyText}>
            Both after dark. The Tombori boats in the evening go first, so pass holders should exchange the
            pass at the desk during the day. The Umeda deck is open until 22:30, with last admission at 22:00.
          </p>
        </section>

        <BookingEsimCard lead="Using QR tickets and the USJ app for three days? Get mobile data before you land." />

        <KlookTourPicks
          heading="If You Would Rather Have a Guide for a Day"
          intro="A food walk for Day 1 or Day 3, and guided versions of the Nara and Kobe days. Klook prices change by date, so open a listing for the figure on your dates."
          tours={[kuromonMarketFoodTour, osakaWalkingFoodTour, kyotoNaraKiyomizuTour, kobeFerrisKitanoArimaRokkoDayTour]}
        />

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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
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

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three days: one pass day, one park day, one choice</h2>
            <p className={styles.ctaBannerDesc}>
              Book the USJ date first, the Kaiyukan slot if Day 3 is the bay, and use the Amazing Pass on
              Day 1.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Amazing Pass →
              </KlookLink>
              <KlookLink href={usjStudioPassUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the USJ Studio Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
