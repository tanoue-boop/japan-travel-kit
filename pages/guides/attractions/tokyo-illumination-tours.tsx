import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  klookEsim,
  skyhopHopOnHopOffBus,
  skytreeTicket,
  tokyoBayDinnerCruiseSymphony,
  tokyoBaySunsetBoatCruise,
  tokyoBaySunsetCruise,
  tokyoBayYakatabuneDinnerShow,
  tokyoMegaIllumiTicket,
  tokyoNightTourAkihabaraShibuya,
  tokyoOpenTopBusSightseeing,
  tokyoStayAreas,
  tokyoSubwayTicket,
  tokyoTowerTicket,
  yomiurilandTicket,
} from "../../../lib/klook-links";
import { gygTokyo, gygTokyoEntryTickets, gygTokyoSkytree } from "../../../lib/gyg-links";

/**
 * Tokyo Illuminations 2026 — the winter season, as a dated table rather than a
 * gallery.
 *
 * The rule this page is built on: a display appears below only if its *operator*
 * has announced the 2026–27 season. Everything in the table is read off the
 * operator's own site or its own press release, and carries the date it was read.
 * Two Tokyo displays people will look for are deliberately absent for that
 * reason, and the page says so plainly rather than printing last year's dates:
 *
 *   青の洞窟 SHIBUYA (Blue Grotto Shibuya)  — no 2026–27 announcement from the
 *                                             organising committee as at OWN_CHECKED
 *   カレッタ汐留 (Caretta Shiodome)          — likewise
 *
 * Sources read on OWN_CHECKED (26 Oct 2026):
 *
 *   mec.co.jp / Mitsubishi Estate release  Marunouchi Illumination 2026 period
 *   Tokyo Midtown Management release       MIDTOWN CHRISTMAS 2026, MIDTOWN YAESU
 *   roppongihills.com                      Keyakizaka Illumination period & hours
 *   tokyo-skytree.jp                       Dream Christmas 2026 period & hours
 *   Tokyo Dome Co. release                 TOKYO SNOW DOME CITY period & hours
 *   Sapporo Real Estate Development rel.   Baccarat ETERNAL LIGHTS, Yebisu
 *   tokyomegaillumi.jp                     Tokyo Mega Illumi period, hours, prices
 *   Yomiuriland release                    Jewellumination 2026 period & hours
 *
 * One cell in the table is a dash: the Marunouchi committee has published the
 * 2026 period but not the 2026 lighting hours, and an unverified figure is worse
 * than a dash. No Klook price appears anywhere — Klook answers automated reads of
 * its product pages with HTTP 403.
 */

/** The date every figure on this page was read off its operator's own source. */
const OWN_CHECKED = "2026-10-26";
const OWN = checkedLabel(OWN_CHECKED);

type Display = {
  name: string;
  /** Area, and the station the operator or its own access page names. */
  where: string;
  /** The 2026–27 season, as the operator announced it. */
  period: string;
  /** Lighting hours, or "—" where the operator has not published them. */
  hours: string;
  /** Free or paid, and what the money buys. */
  ticket: string;
  source: string;
};

/**
 * Ordered east-to-west rather than by size: Tokyo Station, then Skytree, then the
 * Roppongi pair, then the outliers — which is also the order a reader walking
 * them in one evening would take.
 */
const displays: Display[] = [
  {
    name: "Marunouchi Illumination 2026",
    where: "Marunouchi Nakadori, about 1.2 km of it — Tokyo Station (Marunouchi side), Nijubashimae or Yurakucho",
    period: "12 Nov 2026 – 14 Feb 2027",
    hours: "—",
    ticket: "Free — a public street, no ticket of any kind",
    source: "Mitsubishi Estate release",
  },
  {
    name: "MIDTOWN YAESU CHRISTMAS 2026",
    where: "Tokyo Midtown Yaesu, 1F Galleria and atrium — connected underground to Tokyo Station",
    period: "19 Nov – 25 Dec 2026; the YAESU WINTER LIGHTS run on to 14 Feb 2027",
    hours: "16:00 – 23:00",
    ticket: "Free",
    source: "Tokyo Midtown Management release",
  },
  {
    name: "Dream Christmas 2026 at TOKYO SKYTREE",
    where: "The tower itself, Sumida — Tokyo Skytree Station or Oshiage",
    period: "5 Nov 2026 – 24 Feb 2027",
    hours: "Tower lighting 17:30 – 22:00; to midnight on 24 and 25 Dec; from about 18:20 on the opening night, and dark on a handful of dates the tower lists",
    ticket: "Free to look at from the street; the Tembo Deck is a separate ticket",
    source: "tokyo-skytree.jp",
  },
  {
    name: "Roppongi Hills Keyakizaka Illumination",
    where: "Keyakizaka-dori, about 400 m of it — Roppongi (Hibiya and Oedo lines)",
    period: "5 Nov – 25 Dec 2026",
    hours: "17:00 – 22:00; the operator notes the opening night starts at a different time",
    ticket: "Free — a public street",
    source: "roppongihills.com",
  },
  {
    name: "MIDTOWN CHRISTMAS 2026 — MIDWINTER LIGHTS and the Dreaming Tree",
    where: "Tokyo Midtown garden, Roppongi — Roppongi (Hibiya and Oedo lines)",
    period: "26 Nov – 25 Dec 2026",
    hours: "17:00 – 23:00",
    ticket: "Free; the Midtown ice rink beside it is a paid ticket",
    source: "Tokyo Midtown Management release",
  },
  {
    name: "Tokyo Midtown Path of Light (光の散歩道)",
    where: "Midtown garden and Plaza 1F, Roppongi — the same block as the above",
    period: "26 Nov 2026 – 23 Feb 2027",
    hours: "17:00 – 23:00",
    ticket: "Free",
    source: "Tokyo Midtown Management release",
  },
  {
    name: "Baccarat ETERNAL LIGHTS, Yebisu Garden Place",
    where: "Centre Plaza, Yebisu Garden Place — Ebisu (JR Yamanote and Hibiya lines)",
    period: "Chandelier 14 Nov 2026 – 11 Jan 2027; the garden illumination on to 28 Feb 2027",
    hours: "Chandelier 11:00 – 23:00 (from 17:00 on the 14 Nov opening day); the illumination 16:00 – 23:00",
    ticket: "Free — an open plaza",
    source: "Sapporo Real Estate Development release",
  },
  {
    name: "TOKYO SNOW DOME CITY, Tokyo Dome City",
    where: "Across the whole Tokyo Dome City site, Bunkyo — Suidobashi, Korakuen or Kasuga",
    period: "19 Nov 2026 – 28 Feb 2027 (102 nights)",
    hours: "17:00 – 24:00, varying with sunset and with events on site",
    ticket: "Free to enter the site",
    source: "Tokyo Dome Co. release",
  },
  {
    name: "Tokyo Mega Illumi, Oi Racecourse",
    where: "The Oi Racecourse infield, Shinagawa — Oi Keibajo-mae on the Tokyo Monorail, about 2 minutes on foot",
    period: "31 Oct 2026 – 10 Jan 2027; closed on race days and on the dates its own calendar marks",
    hours: "16:30 – 21:00, last entry 20:00",
    ticket: "Paid — from ¥800 adult (18+) and from ¥400 elementary to high school, preschool free; priced by date",
    source: "tokyomegaillumi.jp",
  },
  {
    name: "Yomiuriland Jewellumination 2026",
    where: "Inside Yomiuriland, Inagi — Keio Yomiuri-Land on the Keio Sagamihara Line, then the gondola or the shuttle bus",
    period: "29 Oct 2026 – 4 Apr 2027, 138 nights",
    hours: "16:00 – 20:30, varying by period",
    ticket: "Paid — the display is inside the amusement park, so it needs a park ticket",
    source: "Yomiuriland release",
  },
];

/** The three shapes an illumination evening takes. One is a tour, two are not. */
const whoFor: { title: string; desc: string }[] = [
  {
    title: "Walk it yourself if…",
    desc: "Your evening is Marunouchi, Yaesu or the Roppongi pair. Each of those is one street or one garden, they are free, they need no booking at all, and the two Roppongi displays are a seven-minute walk apart. The only thing worth buying is a subway ticket, because Tokyo Metro and Toei do not take a foreign contactless card at the gate.",
  },
  {
    title: "Take a tour or a cruise if…",
    desc: "You want more than one district in a night and you do not want to work out the changes in the dark. A guided evening or an open-top bus does the routing; a bay cruise gives you Rainbow Bridge, Tokyo Tower and the Odaiba waterfront from the water, which no walk can. Both are fixed departures, so they are a booking rather than a decision.",
  },
  {
    title: "Buy a ticket if…",
    desc: "The display you want is Tokyo Mega Illumi at Oi Racecourse or the Jewellumination at Yomiuriland. These two are not streets — they are ticketed venues with a last entry, priced by date, and the Mega Illumi is dark on race days. Those are the only two on this page where turning up on the wrong night means not getting in.",
  },
];

/** How an evening actually gets booked, in order. */
const steps = [
  {
    title: "Pick the night by what is open, not by what looks best",
    desc: "The seasons do not overlap neatly: Keyakizaka and the Roppongi Christmas displays end on 25 December, while Marunouchi, Tokyo Dome City and Yebisu run deep into February. A trip in the first week of November has Skytree, Keyakizaka and the Mega Illumi and almost nothing else; a trip in late January has the long-running ones and no Christmas markets at all.",
  },
  {
    title: "Group by district, not by ranking",
    desc: "Roppongi gives you two displays in one walk. Tokyo Station gives you Marunouchi Nakadori and Midtown Yaesu without leaving the station complex. Trying to pair Oi Racecourse with Roppongi in one evening is the mistake — that is a 40-minute journey in each direction at the hour the trains are fullest.",
  },
  {
    title: "Book the ticketed two, and only those, before the night",
    desc: "Tokyo Mega Illumi has a last entry of 20:00 and prices that move by date, and Yomiuriland is a park ticket rather than a display ticket. Both are the kind of booking that is easier on a reseller than on a Japanese ticket page from abroad. Nothing else on this page sells a ticket at all.",
  },
  {
    title: "Settle the moving-around before you leave the hotel",
    desc: "A free display costs nothing and the evening still costs you fares. A 24, 48 or 72-hour Tokyo Subway Ticket covers Tokyo Metro and Toei — which reaches Roppongi, Nijubashimae and Korakuen — but not JR, so Ebisu and Tokyo Station on the Yamanote are outside it. If the evening is a tour or a cruise instead, the meeting point and the boarding time are the two things to screenshot.",
  },
];

const faqItems = [
  {
    q: "When do Tokyo illuminations start?",
    a: `Between late October and the end of November, and 2026 is unusually early at the front end. On the operators' own announcements, read on ${OWN}: Yomiuriland's Jewellumination opened on 29 October 2026 and Tokyo Mega Illumi at Oi Racecourse on 31 October; TOKYO SKYTREE's Dream Christmas and the Roppongi Hills Keyakizaka Illumination both started on 5 November; Marunouchi on 12 November; Yebisu Garden Place on 14 November; Tokyo Dome City and Midtown Yaesu on 19 November; and Tokyo Midtown in Roppongi last, on 26 November. If you are in Tokyo in the first half of November, four of the ten are already lit and the Roppongi garden is not.`,
  },
  {
    q: "What is the best illumination in Tokyo?",
    a: "Marunouchi Nakadori, if you only have one evening — about 1.2 km of champagne-gold street trees that runs from 12 November 2026 to 14 February 2027, which makes it both the longest season and the easiest to reach, straight out of Tokyo Station. For a shorter, denser walk, the Roppongi Hills Keyakizaka slope is the one with Tokyo Tower framed at the bottom of it, and the Tokyo Midtown garden is a seven-minute walk from the top of that slope, so the two together are one evening rather than two. If you want a display that is an event rather than a street, that is Tokyo Mega Illumi at Oi Racecourse — and that one is ticketed, with a last entry at 20:00.",
  },
  {
    q: "Are Tokyo illuminations free?",
    a: "Most of them, yes. Eight of the ten displays in the table on this page cost nothing: Marunouchi, Midtown Yaesu, the Skytree tower lighting seen from the street, Keyakizaka, both Tokyo Midtown displays, Yebisu Garden Place and the whole of Tokyo Dome City. They are public streets, plazas and gardens, so there is no ticket to buy and no slot to book. Two are paid, and for different reasons: Tokyo Mega Illumi is a ticketed venue with date-based pricing from ¥800 for an adult, and the Yomiuriland Jewellumination sits inside an amusement park, so what you buy is park admission. Paid extras sit beside the free ones too — the Midtown ice rink and the Skytree observation deck are both separate tickets.",
  },
  {
    q: "What time do Tokyo illuminations turn on?",
    a: `Mostly 16:00 or 17:00, and the useful thing is when they turn off. On the operators' published hours, read on ${OWN}: Midtown Yaesu and Yebisu Garden Place light at 16:00, Keyakizaka and both Tokyo Midtown displays at 17:00, Tokyo Dome City at 17:00 and the Skytree tower at 17:30. Closing runs 22:00 at Keyakizaka and the Skytree tower, 23:00 at Midtown, Yaesu and Yebisu, and midnight at Tokyo Dome City — which makes Korakuen the one to leave until last. The two ticketed venues are the opposite shape: Tokyo Mega Illumi runs 16:30 to 21:00 with last entry at 20:00, and the Yomiuriland display 16:00 to 20:30. Sunset in Tokyo is around 16:30 in December, so a 17:00 start is genuinely dark.`,
  },
  {
    q: "How do I see several illuminations in one night?",
    a: "Three ways, and which one fits depends on how far apart your choices are. If they are in one district — the Roppongi pair, or Marunouchi and Midtown Yaesu — walk, because each pair is under ten minutes apart and the subway would cost you more time than it saves. If they are spread across the city, an open-top bus or a hop-on hop-off ticket does the routing for you; the 70-minute open-top loop runs past Tokyo Station, Marunouchi, Akasaka, Roppongi, Tokyo Tower and Ginza, which is most of this page's list in one sitting. And if what you actually want is the skyline rather than the streets, a Tokyo Bay cruise gives you Rainbow Bridge, Tokyo Tower and the Odaiba waterfront lit from the water. The buses and the boats are fixed departures on fixed dates, so they are the part of an illumination evening that has to be booked ahead.",
  },
  {
    q: "Do Tokyo illuminations need tickets or reservations?",
    a: "Only two of the ten do. Tokyo Mega Illumi sells a dated ticket, prices it by date, closes on race days and stops admitting at 20:00 — so turning up on the wrong evening means not getting in. Yomiuriland needs a park ticket, which is a different purchase from an illumination ticket and covers the rides as well. Everything else on this page is a street or a plaza with no gate. What does get booked out in December is not the lights but everything around them: the bay cruises, the guided evenings and the restaurant terraces along Marunouchi Nakadori. If your evening includes any of those, that is the reservation, not the display.",
  },
  {
    q: "When do Tokyo illuminations end?",
    a: "25 December for the Christmas ones, and well into the new year for the rest — which is the single most useful thing to know if you are travelling in January. Keyakizaka, both Roppongi Christmas displays, Midtown Yaesu's Christmas programme and the Skytree's Christmas decorations all finish on 25 December 2026. After that, Marunouchi runs to 14 February 2027, Tokyo Midtown's Path of Light and the Skytree lighting to late February, Yebisu Garden Place and Tokyo Dome City to 28 February, the Mega Illumi to 10 January, and the Yomiuriland Jewellumination all the way to 4 April 2027. A January trip to Tokyo is not too late for illuminations; it is just too late for the markets.",
  },
  {
    q: "Which night of the week is least crowded?",
    a: "A weekday before the middle of December, and a weekday in January most of all. The crush is concentrated in the three weekends before Christmas and on Christmas Eve itself, which in Japan is a couples' evening rather than a family one — Marunouchi Nakadori and the Keyakizaka slope are both genuinely difficult to photograph on those nights. Ticketed venues price this in: Tokyo Mega Illumi charges by date, so a weekday is cheaper as well as quieter. The displays that stay open past 23:00 give you the other lever — Tokyo Dome City runs to midnight, and the last hour anywhere is a different place from the first.",
  },
  {
    q: "Can you see the illuminations from an observation deck?",
    a: `Not really, and it is worth saying plainly before you spend a ticket on it. An illumination is a street-level thing — tree trunks, a slope, a tunnel of lights — and from 150 or 350 metres up it disappears into the general glow of the city. What a deck is good for on a winter evening is the opposite view: the whole lit city at once, with Mt. Fuji on a clear dry night, which is what December and January are good for. The Skytree's Floor 350 is ${PRICES.tokyoSkytree.adult} for an adult and Tokyo Tower's Main Deck ${PRICES.tokyoTower.adult}, on the operators' own prices. The free decks at the Tokyo Metropolitan Government Building in Shinjuku are ${PRICES.tochoDeck.adult}, which is the version to use if you want both a deck and a street in one evening. Our Tokyo observation decks comparison puts the four side by side.`,
  },
  {
    q: "What should I wear to a Tokyo illumination?",
    a: "More than you think, because an illumination evening is two to three hours spent standing still outdoors. Tokyo in December and January is cold and dry rather than freezing — but the Keyakizaka slope and the Oi Racecourse infield are both exposed, and the bay cruises are colder again once the boat is moving. A proper coat, gloves and something over the ears; shoes you can stand in rather than walk in. Nothing on this page has a dress code, including the dinner cruises, though a few of the Symphony's dinner plans ask for smart-casual rather than sportswear — check the listing for the plan you book.",
  },
  {
    q: "Do Tokyo illuminations work with kids?",
    a: "Yes, with one change: pick the venues rather than the streets. Tokyo Dome City is the easiest of the lot with children — the whole site is lit, there is an amusement park inside it and it runs to midnight, so an early evening there is no rush. Tokyo Mega Illumi lets preschool children in free and the listing describes a light tunnel and a fountain show rather than a boulevard. Yomiuriland is a theme park first and an illumination second, which is either the point or the problem depending on the age. The Roppongi and Marunouchi streets are the ones to skip with a pushchair in late December: they are at their busiest exactly when a small child has had enough.",
  },
  {
    q: "What happens if it rains?",
    a: "Illuminations are the rare Tokyo plan that rain improves, up to a point: wet asphalt doubles every light in it, and the Marunouchi and Keyakizaka photographs people remember are mostly taken in the wet. The things rain does ruin are the open-top bus, which is open-topped, and an observation deck, where low cloud shows you cloud. Of the ten displays here, Midtown Yaesu is the only one substantially under cover — it is inside the Galleria — and the Skytree's Solamachi mall beneath the tower is the indoor hour next to it. A bay cruise sails in rain; the open deck of it does not.",
  },
  {
    q: "How much does a Tokyo illumination evening cost?",
    a: `Nothing for the lights themselves in eight cases out of ten, and the real cost is getting between them. The only admissions on this page are Tokyo Mega Illumi, from ¥800 for an adult and ¥400 for a school-age child with preschool free, and Yomiuriland, where what you buy is a park ticket. Both read off the operators' own sites on ${OWN}. Against that, a 24-hour Tokyo Subway Ticket is ${PRICES.tokyoSubwayTicket.adult} and the 72-hour version ¥2,000, which covers Roppongi, Nijubashimae and Korakuen but not the JR Yamanote Line to Ebisu. The optional extras — a guided evening, an open-top bus, a bay cruise, a deck ticket — are what actually move the figure, and none of them is required to see a single light. We publish no food or hotel estimate for the evening, on purpose.`,
  },
];

/** Districts worth sleeping in if the trip is built around winter evenings. */
const stayIntro =
  "Beside a station on the lines the displays sit on — because an illumination evening ends at 22:00 or later, in the cold, at the hour the Yamanote loop is at its worst. Shinjuku and Ueno both put you on the loop with the free Metropolitan Government decks and the Ginza Line respectively; Tokyo Station is the one to pick if Marunouchi Nakadori and Midtown Yaesu are the evening, because both of them are a walk from its exits rather than a ride.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/tokyo-illumination-tours") },
});

const TITLE = "Tokyo Illuminations 2026: Dates, Hours and the Free Ones";
const DESC =
  "Tokyo Illuminations 2026: the opening and closing nights, the lighting hours and which of the 7 displays are free, each with the operator's own figures.";
const ROUTE = "/guides/attractions/tokyo-illumination-tours";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const sectionIntro: ReactNode = (
  <>
    Ten Tokyo displays have published their 2026&ndash;27 season, and eight of them are free. The
    season opens on <strong>29 October 2026</strong> at Yomiuriland and runs to{" "}
    <strong>4 April 2027</strong> there; in the centre of the city the first lights are the TOKYO
    SKYTREE and the Roppongi Hills Keyakizaka slope on <strong>5 November</strong>, Marunouchi
    Nakadori&apos;s 1.2 km of street trees on <strong>12 November</strong>, and the Tokyo Midtown
    garden last on <strong>26 November</strong>. Most light at 16:00 or 17:00 and go dark between
    22:00 and midnight, the Christmas ones finish on <strong>25 December</strong>, and only two of
    the ten &mdash; Tokyo Mega Illumi at Oi Racecourse and the Yomiuriland Jewellumination &mdash;
    need a ticket at all. Every figure below was read off the operator&apos;s own site or its own
    press release on {OWN}.
  </>
);

export default function TokyoIlluminationsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
              route: ROUTE,
              headline: TITLE,
              description: DESC,
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
                { "@type": "ListItem", position: 4, name: "Tokyo Illuminations 2026", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo Illuminations 2026</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Illuminations 2026:<br />Dates, Hours and Which Ones Are Free
          </h1>
          <p className={styles.heroSubtitle}>
            Ten displays whose operators have announced the 2026&ndash;27 season, with the opening
            and closing nights, the lighting hours and the two that need a ticket.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Operator dates, each checked", "8 of 10 are free"].map((t) => (
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

        {/* Quick Answer Box — the answer, before anything else */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>{sectionIntro}</p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Season</p>
                <p className={styles.verdictStatValue}>29 Oct 2026 – 4 Apr 2027</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Usual lighting hours</p>
                <p className={styles.verdictStatValue}>16:00 or 17:00 until 22:00–24:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free displays</p>
                <p className={styles.verdictStatValue}>8 of the 10 below</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Needs booking</p>
                <p className={styles.verdictStatValue}>The two ticketed venues, and any tour or cruise</p>
              </div>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo night tours on Klook →
              </KlookLink>
              <GygCompareButton slug="tokyo-illumination-tours" listing={gygTokyo} />
            </div>
          </div>
        </div>

        {/* The table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The 2026&ndash;27 season</span>
          <h2 className={styles.sectionTitle}>When Do Tokyo Illuminations Start, and When Do They End?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Between 29 October and 26 November, and then they end in two waves &mdash; 25 December
            for the Christmas displays, late February or later for the rest. Every row below is the
            operator&apos;s own announcement for the 2026&ndash;27 season, read on {OWN}. Nothing
            here is carried over from last winter: a display whose operator has not announced this
            season is not in the table at all.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Display", "Where & nearest station", "2026–27 period", "Lighting hours", "Ticket", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displays.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.name}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.where}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem", whiteSpace: "normal" }}>{row.period}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.82rem" }}>
                        {row.source}, {OWN}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change &mdash; confirm on the operator&apos;s own page before you travel, and
            note that several of these displays go dark on a handful of individual dates each season.
            The dash in the Marunouchi row is deliberate: the committee has announced the 2026 period
            but not the 2026 lighting hours, and we print only figures we could read off an
            operator&apos;s own source. Two displays Tokyo visitors often search for &mdash; the Blue
            Grotto in Shibuya and Caretta Shiodome &mdash; are absent for the same reason: neither
            organiser had announced a 2026&ndash;27 season as at {OWN}, so there is nothing to print.
          </p>
        </section>

        {/* Which one, and why */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Choosing</span>
          <h2 className={styles.sectionTitle}>What Is the Best Illumination in Tokyo?</h2>
          <p className={styles.bodyText}>
            Marunouchi Nakadori, if you have one evening and you are starting from the middle of the
            city. It is about 1.2 km of champagne-gold street trees running out of Tokyo Station, it
            has the longest season of the ten &mdash; 12 November 2026 to 14 February 2027 &mdash;
            and it costs nothing. Midtown Yaesu is connected to the same station underground, which
            makes those two a single evening with no train in it.
          </p>
          <p className={styles.bodyText}>
            <strong>If you want a shorter, denser walk,</strong> go to Roppongi instead. The Keyakizaka
            slope is about 400 m with Tokyo Tower framed at the far end of it, lit 17:00&ndash;22:00
            from 5 November to 25 December; the Tokyo Midtown garden is a few minutes up the road and
            runs 17:00&ndash;23:00 from 26 November. Between 26 November and 25 December those two
            overlap, which is the three weeks when one Roppongi evening gets you both.
          </p>
          <p className={styles.bodyText}>
            <strong>If you want an event rather than a street,</strong> that is Tokyo Mega Illumi on
            the Oi Racecourse infield &mdash; a ticketed site with a light tunnel and a fountain
            show, 16:30&ndash;21:00 with last entry at 20:00, and dark on race days. It is also the
            one on this list with a published end: 10 January 2027. Tokyo Dome City is the free
            equivalent, lit across the whole site until midnight, which is the latest finish of the
            ten and the easiest with children.
          </p>
          <p className={styles.bodyText}>
            And if what you are actually picturing is the lit skyline rather than lit trees, that is a
            different purchase. An{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">observation deck</Link> or a{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise">Tokyo Bay cruise</Link> gives you the
            city as a whole &mdash; Rainbow Bridge, Tokyo Tower, the Odaiba waterfront &mdash; which
            no street-level display does.
          </p>
        </section>

        {/* Free or paid */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Free or paid</span>
          <h2 className={styles.sectionTitle}>Are Tokyo Illuminations Free, and What Needs Booking?</h2>
          <p className={styles.bodyText}>
            Eight of the ten are free, and the two that are not are the only two where the date
            matters. That is the whole booking question on this page &mdash; here is how an evening
            divides.
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            <strong>What actually sells out in December, and what cannot.</strong> A free street
            cannot sell out &mdash; it just gets crowded, and the three weekends before Christmas and
            Christmas Eve itself are when that bites. What does sell out is everything booked around
            the lights: the bay cruises on the weekend evenings in December, the guided night tours,
            and a dated Mega Illumi ticket on a Saturday. Those also differ on cancellation, which is
            worth reading on the listing before the date is fixed rather than after &mdash; terms
            vary by product, and we do not restate them here because they change. For the two
            ticketed venues the practical argument for a reseller is the same as elsewhere in Japan:
            an English checkout, a foreign card accepted, and a QR code rather than a Japanese
            ticket page.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoMegaIllumiTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Mega Illumi ticket →
            </KlookLink>
            <KlookLink href={yomiurilandTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Yomiuriland admission →
            </KlookLink>
            <GygCompareButton slug="tokyo-illumination-tours" listing={gygTokyoEntryTickets} />
          </div>
        </section>

        {/* Several in one night — the tour and cruise section */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>More than one in a night</span>
          <h2 className={styles.sectionTitle}>How Do I See Several Illuminations in One Night?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By district if they are close, and by bus or boat if they are not. Two displays in the
            same district are a walk: the Roppongi pair are minutes apart, and Marunouchi Nakadori
            and Midtown Yaesu are both reached from Tokyo Station without going outside for long.
            Anything wider than that is a routing problem in the dark, at the hour the trains are
            fullest, in December &mdash; which is exactly what a fixed-departure tour or a cruise
            exists to solve.
          </p>
          <p className={styles.bodyText}>
            <strong>The open-top bus</strong> is the closest thing to an illumination tour on sale:
            a 70-minute loop whose published route runs Tokyo Station, Marunouchi, Akasaka, Meiji
            Jingu Gaien, Roppongi, Tokyo Tower and Ginza, with recorded guidance in six languages.
            A hop-on hop-off ticket is the version to buy if you want to get off at two of those
            rather than ride past all of them. Both are weather-exposed by design, so a wet forecast
            is the one thing that argues against them.
          </p>
          <p className={styles.bodyText}>
            <strong>A guided evening</strong> solves a different problem. The join-in night tour runs
            about 4 hours 50 minutes from Ueno Station through Akihabara to the Shibuya crossing with
            the train fares between the stops included, which is the lit city at street level rather
            than a list of displays. It is the right pick if your December evening is really about
            being out in Tokyo after dark.
          </p>
          <p className={styles.bodyText}>
            <strong>A Tokyo Bay cruise</strong> is the one that shows you something a walk cannot.
            The Symphony sails from Hinode Pier with Rainbow Bridge, Tokyo Tower and the Skytree on
            the route; a yakatabune houseboat is the smaller, lower, more traditional version of the
            same water; and a plain sunset sailing is the no-dinner option that finishes after the
            city has changed over. All three run to fixed departures, and December weekends are when
            they go first. Our{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise">Tokyo Bay cruise guide</Link> sets out
            which boat suits which evening.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo night tour →
            </KlookLink>
            <KlookLink href={tokyoOpenTopBusSightseeing.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Open-top sightseeing bus →
            </KlookLink>
            <KlookLink href={skyhopHopOnHopOffBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hop-on hop-off bus →
            </KlookLink>
            <KlookLink href={tokyoBaySunsetCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Bay sunset cruise →
            </KlookLink>
            <KlookLink href={tokyoBayDinnerCruiseSymphony.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Symphony dinner cruise →
            </KlookLink>
          </div>
        </section>

        {/* How to plan the evening */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Should You Plan a Tokyo Illumination Evening?</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One more thing to settle before you leave the hotel, and it is not a ticket: data. Every
            lighting time in the table above can change on an individual date, the two ticketed
            venues arrive as a QR code in an inbox, and finding the Keyakizaka slope or the Oi
            Racecourse north gate in the dark is a map problem.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares
            the providers, and our{" "}
            <Link href="/guides/esim/japan-esim-data-plans">Japan eSIM data plans guide</Link> works
            out how much data a few days of maps and tickets actually uses.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Subway Ticket (24 / 48 / 72 h) →
            </KlookLink>
            <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              TOKYO SKYTREE ticket →
            </KlookLink>
            <KlookLink href={tokyoTowerTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Tower ticket →
            </KlookLink>
            <GygCompareButton slug="tokyo-illumination-tours" listing={gygTokyoSkytree} />
          </div>
        </section>

        {/* Where to stay */}
        <KlookStayAreas
          heading="Where Should You Stay for a Tokyo Illumination Trip?"
          intro={stayIntro}
          areas={tokyoStayAreas}
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

        <KlookTourPicks
          heading="The Evenings Around the Lights"
          intro="An illumination fills an hour or two of an evening and most of them are free, which leaves the rest of the night open and unpaid for. These are the things that are actually booked on a Tokyo winter evening — a boat, a bus, a guided few hours. Klook blocks automated price reads, so open a listing for the figure on your own date."
          tours={[
            tokyoNightTourAkihabaraShibuya,
            tokyoOpenTopBusSightseeing,
            tokyoBayYakatabuneDinnerShow,
            tokyoBaySunsetBoatCruise,
          ]}
        />

        {/* Second seller for the two ticketed displays */}
        <GygCompare
          slug="tokyo-illumination-tours"
          heading="If a Dated Ticket or a December Cruise Has Gone"
          intro="The two ticketed displays on this page price by date, and a December weekend cruise sells out weeks before the weekday beside it does. Neither problem is fixed by reordering an evening, because the lights are only on for a fixed number of nights. GetYourGuide carries the Tokyo entry tickets, the Skytree and the wider Tokyo catalogue, which is the second place to look for the same date."
          listings={[gygTokyoEntryTickets, gygTokyoSkytree, gygTokyo]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 30 Oct 2026: the other winter lights trip — free, outdoors and on fixed dates. */}
            <Link href="/guides/attractions/sapporo-snow-festival-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sapporo Snow Festival Tours (2027): 4–11 Feb, Free Sites</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-winter-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10" />
                  <path d="M12 6l-2.5-2M12 6l2.5-2M12 18l-2.5 2M12 18l2.5 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Winter Itinerary: 12 Days, Day by Day (2027)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V8l8-5 8 5v12" />
                  <path d="M4 14h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-bay-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18l-2 4H5z" />
                  <path d="M5 17V9h14v8" />
                  <line x1="12" y1="3" x2="12" y2="9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V8l8-5 8 5v12" />
                  <path d="M4 14h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V9l8-5 8 5v11" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="10" rx="2" />
                  <line x1="7" y1="12" x2="17" y2="12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules</p>
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
            <h2 className={styles.ctaBannerTitle}>The lights are free. The evening around them is not.</h2>
            <p className={styles.ctaBannerDesc}>
              Eight of these ten displays need no ticket and no booking at all. What does need
              booking is the boat, the bus or the guided few hours you build the evening around
              &mdash; and in December those go before the weekend does. Klook checks out in English
              and takes foreign cards the Japanese ticket pages sometimes reject.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Book a Tokyo night tour on Klook →
              </KlookLink>
              <GygCompareButton slug="tokyo-illumination-tours" listing={gygTokyo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
