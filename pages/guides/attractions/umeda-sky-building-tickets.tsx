import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaNaniWonderNightBusTour,
  osakaPrivateWalkingTour,
  umedaSkyBuildingTicket,
  umedaSkySameDayPrep,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Umeda Sky Building — the Kuchu Teien Observatory, and the one Osaka admission where
 * the Amazing Pass has a clock on it.
 *
 * Re-checked on 3 Nov 2026 (task jtk-20261103-04), this time against the operator itself:
 *
 * - skybldg.co.jp/en/ and /en/observatory/: ¥2,000 adult / ¥500 ages 4–12 / under-4s free,
 *   ¥1,000 / ¥250 for visitors with a disability certificate, groups of 10+ at ¥1,800 /
 *   ¥450; 9:30–22:30, last admission 22:00; "Rooftop may be closed in case of heavy rain";
 *   Amazing Pass / e-Pass free 9:30–15:00 and 10% off 15:00–22:00; cash and credit cards
 *   at the counter; floor list (39F counter, shop, restaurant, lounge; 40F cafe SKY 40;
 *   RF 360° open-air deck); Takimi Koji retro street on B1F–1F. No regular closing day
 *   is printed, so the page no longer says "open every day of the year".
 * - skybldg.co.jp/observatory/ (Japanese): advance web tickets with a date choice are
 *   sold through asoview as "WEB限定のおトクなチケット", amount not printed — the old
 *   "up to ¥200 under" line is gone. RF lists "ルミ・スカイ・ウォーク" by name only.
 * - abenoharukas-300.jp/observatory/ and /observatory/ticket/: 9:00–22:00, last entry
 *   21:30; counter ¥2,200 adult / ¥900 child, web advance ¥1,980 / ¥810.
 * - tsutenkaku.co.jp/annai/: general deck ¥1,500 adult (15+), 9:00–21:45, last entry
 *   21:15; ¥1,800 from 30 Dec 2026 to 3 Jan 2027.
 * - osaka-amazing-pass.com/en/service_free.html: Umeda free until 15:00, 10% off after;
 *   Tsutenkaku needs a time slot booked at the facility; Harukas 300 not listed.
 * - osaka-info.jp/en/spot/umeda-sky-building/: 7 min from JR Osaka, 9 min from Hankyu /
 *   Osaka Metro Umeda (a sister page on the same site says about 10).
 *
 * Original sources, read on 23 Oct 2026 and nothing here first-hand:
 *
 * - osaka-info.jp (Osaka Convention & Tourism Bureau, the city's official tourism site),
 *   both the English and the Japanese spot pages for the building: the ¥2,000 / ¥500
 *   admission, the 9:30–22:30 hours, the 7- and 9-minute walks from the Umeda stations,
 *   and the 39F / 40F / rooftop floor layout with the 35F→39F see-through escalator.
 * - osaka-amazing-pass.com/en/service_free.html, the pass operator's own facility list:
 *   the regular fee in both age bands, and the 15:00 cut-off after which the pass is a
 *   10% discount rather than free entry. Same page for the Tsutenkaku comparison row.
 * - The www.klook.com search index for activity 35861: hours 09:30–22:30, last entry
 *   22:00, and Klook's own 1–2 hour duration estimate. Klook answers automated reads of
 *   /activity/ pages with HTTP 403, so the index is the route the queue doc prescribes.
 * - eco.mtk.nao.ac.jp (National Astronomical Observatory of Japan) for the Osaka sunset
 *   table — the actual published times, not an approximation.
 * - osaka-info.jp again for the Harukas 300 comparison row (300 m, 58–60F, 9:00–22:00,
 *   last entry 21:30, ¥2,200, built over Osaka-Abenobashi Station).
 *
 * The one judgement call worth flagging: the operator's own site, skybldg.co.jp, answers
 * automated reads with HTTP 503, so every figure below comes from the city tourism board,
 * the pass operator or Klook rather than from the building's own pages. All three agree on
 * ¥2,000 / ¥500 and 9:30–22:30, which is why those numbers are stated plainly.
 *
 * No Klook price appears: the product page cannot be read, so no figure could be verified.
 */

/**
 * Re-checked on 12 Nov 2026 (task jtk-20261112-R01):
 *
 * - skybldg.co.jp/en/observatory/: ¥2,000 / ¥500 (4–12) / under-4 free, ¥1,000 / ¥250 with a
 *   disability certificate, groups of 10+ ¥1,800 / ¥450; 9:30–22:30, last admission 22:00;
 *   no regular closing day printed; rooftop may close in heavy rain; Amazing Pass / e-Pass
 *   free 9:30–15:00, 10% off 15:00–22:00; online tickets linked to Klook.
 * - abenoharukas-300.jp/observatory/ and /observatory/ticket/: 9:00–22:00, last entry 21:30;
 *   counter ¥2,200 adult / ¥900 child (6–14), web advance ¥1,980 / ¥810, 5 and under free.
 * - eco.mtk.nao.ac.jp/koyomi/dni/2026/s2811, s2812, s2801, s2802 (Osaka, 34.6833°N
 *   135.4833°E): the November–February sunset rows below.
 */
const LAST_CHECKED_ISO = "2026-11-12";
const LAST_CHECKED = checkedLabel(LAST_CHECKED_ISO);
const OFFICIAL_URL = "https://www.skybldg.co.jp/en/observatory/";
const HARUKAS_URL = "https://www.abenoharukas-300.jp/observatory/ticket/";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s2811.html";

/** Figures not re-read on 12 Nov (floor list, asoview web ticket, walking times) were read on this date. */
const CHECKED_ISO = "2026-11-03";
const CHECKED = checkedLabel(CHECKED_ISO);

/** "Last checked" line printed directly under each table. */
function LastChecked({ url, label }: { url: string; label: string }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {LAST_CHECKED_ISO} · Source:{" "}
      <a href={url} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>{label}</a>
    </p>
  );
}

/** The pass price is owned by lib/attraction-prices.ts, shared with the ticket price table. */
const PASS_1_DAY = PRICES.osakaAmazingPass.adult;

const priceRows = [
  {
    tier: "Adult",
    price: "¥2,000",
    what: "The counter price on the 39th floor, payable in cash or by credit card. The operator's Japanese site also sells a cheaper date-specific web ticket through asoview, without printing the amount",
  },
  {
    tier: "Child — ages 4 to 12",
    price: "¥500",
    what: "A quarter of the adult rate, which is unusually generous for an Osaka deck",
  },
  {
    tier: "Under 4",
    price: "Free",
    what: "No ticket needed",
  },
  {
    tier: "Visitors with a disability certificate",
    price: "¥1,000 / ¥250",
    what: "Adult / ages 4–12, bought at the observatory counter on showing the certificate",
  },
  {
    tier: "Groups of 10 or more",
    price: "¥1,800 / ¥450",
    what: "Adult / ages 4–12, handled at the 39th-floor counter",
  },
  {
    tier: "Osaka Amazing Pass holder, entering before 15:00",
    price: "Free",
    what: "One entry, included in the pass — this is the window that decides whether the pass pays",
  },
  {
    tier: "Osaka Amazing Pass holder, entering from 15:00",
    price: "10% off",
    what: "So about ¥1,800 for an adult. The pass does not cover a sunset or night visit",
  },
];

/** From skybldg.co.jp/en/observatory/ and the Japanese /observatory/ page, read 3 Nov 2026. */
const floorRows = [
  { floor: "RF (rooftop)", what: "360-degree open-air observation floor; the Japanese site also lists Lumi Sky Walk here", ticket: "Yes — may close in heavy rain" },
  { floor: "40F", what: "Indoor floor with cafe SKY 40 and counter seats along the window", ticket: "Yes" },
  { floor: "39F", what: "Ticket counter, gallery shop, Chinese restaurant Sangu, Sky Lounge Stardust", ticket: "Counter and shop level" },
  { floor: "35F–39F", what: "The way up to the observatory, through the gap between the two towers", ticket: "Reached by the observatory's own entrance, not the office lifts" },
  { floor: "B1F–1F", what: "Takimi Koji — a Showa-retro street of restaurants and shops, with an ATM and post office", ticket: "No" },
];

const hoursRows = [
  { what: "Observatory open", when: "9:30 – 22:30" },
  { what: "Last entry", when: "22:00" },
  { what: "Closed days", when: "No regular closing day is printed on the operator's site; special event days (such as the Yodogawa fireworks) run on special tickets and hours" },
  { what: "Bad weather", when: "The open-air rooftop may be closed in heavy rain; the 39F and 40F floors are indoors" },
  { what: "Free entry with the Osaka Amazing Pass", when: "9:30 – 15:00 only; 10% off from 15:00 to 22:00" },
  { what: "How long to allow", when: "1 – 2 hours (Klook's own estimate for the listing)" },
];

/**
 * Osaka sunset times, from the National Astronomical Observatory of Japan's own
 * ephemeris for Osaka (lat 34.6833°, lon 135.4833°), 2026. These are the dates that
 * bracket the year: 1 December is the earliest sunset of the year, 1 July the latest.
 */
const sunsetRows = [
  { date: "November – February", sunset: "16:47 – 17:53", note: "Winter answer: enter between about 16:00 and 17:15, depending on the date below" },
  { date: "1 November", sunset: "17:05", note: "Enter by about 16:30" },
  { date: "15 November", sunset: "16:54", note: "Enter by about 16:15" },
  { date: "30 November", sunset: "16:47", note: "The earliest sunsets of the year fall either side of the turn of the month" },
  { date: "1 December", sunset: "16:47", note: "Golden hour is mid-afternoon — inside the 15:00 Amazing Pass window" },
  { date: "15 December", sunset: "16:49", note: "Enter by about 16:10" },
  { date: "31 December", sunset: "16:57", note: "Dark by about 17:30, with five hours of night view left before closing" },
  { date: "1 January", sunset: "16:58", note: "Enter by about 16:15 (2026 table)" },
  { date: "15 January", sunset: "17:10", note: "Enter by about 16:30 (2026 table)" },
  { date: "1 February", sunset: "17:27", note: "Enter by about 16:45 (2026 table)" },
  { date: "15 February", sunset: "17:41", note: "Enter by about 17:00 (2026 table)" },
  { date: "28 February", sunset: "17:53", note: "Enter by about 17:10 (2026 table)" },
  { date: "31 March", sunset: "18:18", note: "Cherry season — the busiest fortnight of the Osaka year" },
  { date: "1 July", sunset: "19:15", note: "Latest sunset of the year. Enter by 18:30" },
  { date: "1 September", sunset: "18:25", note: "Warm rooftop, long twilight — the easiest sunset to plan" },
  { date: "30 September", sunset: "17:44", note: "Sunset is already before 18:00 and dropping fast" },
];

/** Which ticket fits which visit — the decision an AI summary does not make for you. */
const choiceRows = [
  {
    situation: "Daytime visit plus at least two other paid Osaka sights the same day",
    pick: "Osaka Amazing Pass, entering the deck before 15:00",
    why: "The deck (¥2,000), Osaka Castle (¥1,200) and the HEP FIVE wheel (¥1,000) add up to more than the pass; after 15:00 the pass is only 10% off here",
  },
  {
    situation: "Sunset or night view, nothing else paid that day",
    pick: "A single observatory ticket — counter or online",
    why: "No time slots and nothing sells out, so online booking buys an English checkout and a foreign card, not a guaranteed slot",
  },
  {
    situation: "First day in Osaka, want the castle, the deck and Dotonbori without planning the route",
    pick: "A guided day tour that includes Umeda",
    why: "One meeting point and one booking; check the stops and the cancellation window on the listing before paying",
  },
];

const deckRows = [
  {
    deck: "Umeda Sky Building (Kuchu Teien)",
    height: "173 m — 39F, 40F and the open-air rooftop",
    price: "¥2,000 adult / ¥500 ages 4–12",
    hours: "9:30 – 22:30 (last entry 22:00)",
    area: "Umeda — 7 min from JR Osaka Station",
    pass: "Free with the Amazing Pass before 15:00, 10% off after",
  },
  {
    deck: "Harukas 300 (Abeno Harukas)",
    height: "The top floors of what the operator calls Japan's tallest building, with a roofless deck on 58F",
    price: "¥2,200 adult / ¥900 child at the counter; ¥1,980 / ¥810 web advance",
    hours: "9:00 – 22:00 (last entry 21:30)",
    area: "Tennoji — built over Kintetsu Osaka-Abenobashi Station",
    pass: "Not on the Amazing Pass facility list",
  },
  {
    deck: "Tsutenkaku",
    height: "The Shinsekai landmark tower",
    price: "¥1,500 adult, age 15+ (¥1,800 from 30 Dec to 3 Jan)",
    hours: "9:00 – 21:45 (last entry 21:15)",
    area: "Shinsekai — Ebisucho / Dobutsuen-mae",
    pass: "Free with the Amazing Pass, but you book a time slot at the facility",
  },
];

const whoFor = [
  {
    title: "Go before 15:00 if…",
    desc: `You are holding an Osaka Amazing Pass. Free entry with the pass stops at 15:00 — after that it is a 10% discount, so roughly ¥1,800 instead of nothing. A morning or early-afternoon visit is the only version of this deck the pass actually pays for. Read on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "Go at sunset if…",
    desc: "You want the one thing this deck does better than any other in Osaka: an unroofed 360-degree ring, open to the sky, as the city lights come on. Enter 30 to 45 minutes before sunset and you get daylight, golden hour and the night view on one ticket. Check the sunset table below — in Osaka it moves by two and a half hours across the year.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "Go late if…",
    desc: `You want it quiet. The deck is open until 22:30 with last entry at 22:00, which is later than Harukas 300 and later than Tsutenkaku — and two hours after sunset even in midsummer. A 21:00 entry is the same view with a fraction of the crowd, and you can still buy a ticket at the counter. Hours read on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide the hour before you decide the ticket",
    desc: "This is the whole decision on this page. Before 15:00 the Amazing Pass gets you in free; at sunset it does not. Sunset is the better visit and the pass is the cheaper one, and they do not overlap — so pick which you are optimising for first.",
  },
  {
    title: "Look up sunset for your actual date",
    desc: "Osaka sunset runs from 16:47 in early December to 19:15 at the start of July. That is a two-and-a-half-hour swing, and it is the difference between a mid-afternoon golden hour and a 19:00 one. The table further down has the published times for the dates that bracket the year.",
  },
  {
    title: "Buy ahead if you want an English checkout or a foreign card",
    desc: "There is no timed-entry slot here and the 39th-floor counter sells tickets for cash or credit card, so advance booking is about convenience rather than availability. The operator's Japanese site sells a cheaper date-specific web ticket through asoview; Klook's listing is the English-language route to the same admission, taking a foreign card and giving you a code to scan. Check the cancellation window shown on your own booking before you pay — it is set per listing, not per venue.",
  },
  {
    title: "Allow 15 minutes on top for the escalator",
    desc: "Ticketing is on the 39th floor, and the way up is the see-through escalator that crosses the open gap between the two towers from the 35th. It is a photo stop in its own right and the reason the building is on postcards, so do not treat the lift ride as dead time.",
  },
  {
    title: "Dress for a roof, not a room",
    desc: "The top floor is a 360-degree open-air ring 173 metres up with nothing above it. It is windier and colder than the street at any time of year, and there is no weather cover on that level — the 40th floor below it is indoor, with a 35-metre glass counter along the window. Bring a layer in winter and expect your hair to lose.",
  },
];

const faqItems = [
  {
    q: "How much is the Umeda Sky Building entrance fee?",
    a: `The Umeda Sky Building entrance fee is ¥2,000 for an adult and ¥500 for a child aged 4 to 12, with under-4s free. Visitors with a disability certificate pay ¥1,000 / ¥250, and groups of 10 or more ¥1,800 / ¥450. The Osaka Amazing Pass gets you in free from 9:30 to 15:00 and gives 10% off from 15:00 to 22:00. Official prices from skybldg.co.jp, last checked ${LAST_CHECKED}.`,
  },
  {
    q: "What are the Umeda Sky Building opening hours, and how long do you need?",
    a: `The Kuchu Teien Observatory is open 9:30 to 22:30 with last admission at 22:00, and no regular closing day is printed on the operator's site. Allow one to two hours (Klook's estimate for its listing). Special event days such as the Yodogawa fireworks run on special tickets and hours, and the open-air rooftop may close in heavy rain. Hours last checked ${LAST_CHECKED}.`,
  },
  {
    q: "Do I need to book Umeda Sky Building in advance?",
    a: "No. There is no timed-entry slot and tickets are sold on the day at the 39th-floor counter. Booking ahead is about convenience: an English checkout on a foreign card through Klook, which the operator's English site links to. The busy hours are the one before sunset and the run-up to the 15:00 pass cut-off; the quietest are mid-morning and after 21:00. If you hold an Osaka Amazing Pass and arrive before 15:00, you do not buy a ticket at all.",
  },
  {
    q: "What time is sunset at Umeda Sky Building?",
    a: "From November to February, sunset in Osaka falls between 16:47 and 17:53, according to the National Astronomical Observatory of Japan's 2026 table for Osaka: 17:05 on 1 November, 16:54 on 15 November, 16:47 on 30 November and 1 December, 16:57 on 31 December, 17:10 on 15 January and 17:41 on 15 February. In summer it is as late as 19:15 (1 July). Enter 30 to 45 minutes before sunset to see daylight, golden hour and the night view on one ticket.",
  },
  {
    q: "Is Umeda Sky Building worth it vs Abeno Harukas?",
    a: `They are different products at a similar price. Umeda is ¥2,000, an open-air 360-degree rooftop, open until 22:30 (last entry 22:00), seven minutes from JR Osaka Station and free on the Amazing Pass before 15:00. Harukas 300 at Abeno Harukas is ¥2,200 at the counter or ¥1,980 as a web advance ticket, open 9:00 to 22:00 (last entry 21:30), higher, and not on the Amazing Pass list. Pick Umeda for the open rooftop, the late close and the Osaka Station location; pick Harukas for height. Both operators' prices last checked ${LAST_CHECKED}.`,
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/umeda-sky-building-tickets") },
});

const TITLE = "Umeda Sky Building Tickets 2026: Price, Hours & Sunset Times";
const DESC =
  "Umeda Sky Building tickets: entrance fee ¥2,000 adult, ¥500 ages 4–12. Open 9:30–22:30, last entry 22:00. Sunset times by month, plus a Klook ticket link.";

export default function UmedaSkyBuildingTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/umeda-sky-building-tickets" />
        {hreflangLinks("/guides/attractions/umeda-sky-building-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/umeda-sky-building-tickets" />
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
              route: "/guides/attractions/umeda-sky-building-tickets",
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Umeda Sky Building Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/umeda-sky-building-tickets",
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
          <span className={styles.breadCurrent}>Umeda Sky Building Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Umeda Sky Building Tickets 2026:<br />Price, Hours &amp; Sunset Times
          </h1>
          <p className={styles.heroSubtitle}>
            The open-air rooftop ring 173 metres above Umeda, seven minutes from Osaka Station.
            One ticket, no time slots — and one 15:00 deadline that decides whether the city
            pass is worth buying.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "Osaka sunset times by season"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Admission</p>
                <p className={styles.verdictStatValue}>¥2,000 adult / ¥500 child</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>9:30–22:30, last entry 22:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting there</p>
                <p className={styles.verdictStatValue}>7 min walk, JR Osaka Station</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Amazing Pass</p>
                <p className={styles.verdictStatValue}>Free before 15:00 only</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              The Umeda Sky Building entrance fee is <strong>¥2,000 for an adult</strong> and{" "}
              <strong>¥500 for a child aged 4 to 12</strong>, with under-4s free. The Kuchu Teien
              Observatory is open <strong>9:30 to 22:30, last entry 22:00</strong>, and a visit
              takes <strong>1 to 2 hours</strong>. Tickets are sold on the day with no time slots,
              and the <strong>Osaka Amazing Pass gets you in free only from 9:30 to 15:00</strong>.
              Official figures last checked {LAST_CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={umedaSkyBuildingTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Umeda Sky Building tickets on Klook →
              </KlookLink>
              <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Osaka Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Umeda Sky Building Tickets: Price, Hours and How to Buy</h2>
          <p className={styles.bodyText}>
            An Umeda Sky Building ticket costs <strong>¥2,000 for an adult and ¥500 for a child
            aged 4 to 12</strong>, and under-4s go free. The observatory is open{" "}
            <strong>9:30 to 22:30 with last admission at 22:00</strong>, and one to two hours is
            enough for all three levels. In winter (November to February) Osaka sunset falls
            between <strong>16:47 and 17:53</strong>, so a sunset visit means entering between
            about 16:00 and 17:15.
          </p>
          <p className={styles.bodyText}>
            You can buy a ticket <strong>on the day at the 39th-floor counter</strong> or{" "}
            <strong>in advance online</strong> — Klook in English, which the operator&apos;s English
            site links to, or the operator&apos;s date-specific web ticket on asoview in Japanese
            (read on {CHECKED}). The{" "}
            <strong>Osaka Amazing Pass gets you in free from 9:30 to 15:00</strong> and gives 10%
            off from 15:00 to 22:00, so it covers a daytime visit but not a sunset one — our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass break-even table</Link>{" "}
            shows when the pass pays. Prices and hours last checked {LAST_CHECKED} on the
            operator&apos;s site.
          </p>
          <p className={styles.bodyText}>
            Two 40-storey towers, 173 metres high, joined at the top by a ring — that is the whole
            idea, and it is why the building is on every Osaka postcard. The paid part is the{" "}
            <strong>Kuchu Teien Observatory</strong>, literally the &quot;mid-air garden&quot;, which
            spans three levels: the <strong>39th floor</strong> where you buy and scan your ticket,
            the indoor <strong>40th floor</strong> with a 35-metre glass counter along the window,
            and above that the <strong>open-air rooftop</strong> — a full 360-degree circuit with
            nothing over your head.
          </p>
          <p className={styles.bodyText}>
            The way up is part of it. A see-through escalator crosses the open gap between the two
            towers from the 35th floor to the 39th, which is both the best-known photograph in the
            building and the reason the ticket queue is upstairs rather than at street level. Floor
            layout and access read off Osaka&apos;s official tourism site on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Unlike the timed decks in Tokyo, there is nothing to schedule here: no 15-minute entry
            slots, no release date, no sunset slot to fight over. What there is instead is a{" "}
            <strong>15:00 cut-off on the city pass</strong>, and that single line decides how most
            people should plan the visit. The rest of this page is the prices, the hours, the sunset
            arithmetic and that one decision.
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            What is on each floor — rooftop to basement
          </h3>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Floor", "What is there", "Ticket needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {floorRows.map((row) => (
                    <tr key={row.floor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.floor}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.ticket}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Floor list from the operator&apos;s English and Japanese observatory pages, read on{" "}
            {CHECKED}. The Japanese page names Lumi Sky Walk on the rooftop floor without describing
            it, so this page does not either.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the Umeda Sky Building Entrance Fee?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The entrance fee is <strong>¥2,000 for an adult</strong> and{" "}
            <strong>¥500 for a child aged 4 to 12</strong>, the operator&apos;s official counter
            price. One flat price per age band, with no premium slots; the only variable is the
            pass, and the pass has a clock on it:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Who / when", "Price", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.tier}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tier}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/ (official)" />
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The pass rows match the Osaka Amazing Pass operator&apos;s facility list, read on{" "}
            {CHECKED}. Subject to change — confirm before you buy. For the admissions in this guide
            across the rest of Japan, each with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            What is the Umeda Sky Building ticket price for kids?
          </h3>
          <p className={styles.bodyText}>
            <strong>¥500 for ages 4 to 12, and free under 4</strong> — a quarter of the adult price.
            From 13 the ¥2,000 adult ticket applies. A child with a disability certificate pays ¥250
            and a child in a group of 10 or more ¥450. For a family day around the deck, our{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary">Osaka 2-day itinerary</Link> puts
            the deck on day two, after the aquarium and before the 15:00 pass cut-off.
          </p>
        </section>

        {/* Hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Are the Umeda Sky Building Opening Hours?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The observatory is open <strong>9:30 to 22:30, with last entry at 22:00</strong>, and
            the operator prints no regular closing day. Allow one to two hours.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Time"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/ (official)" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            That <strong>22:30 close</strong> is the deck&apos;s quiet advantage. It is later than
            Harukas 300 (22:00) and Tsutenkaku&apos;s general deck (21:45), and it is still three
            hours past sunset in midsummer, when sunset in Osaka is as late as 19:15. If your day is
            already full, this is the attraction you can do after dinner. The operator runs
            special event days on separate tickets, so
            check the site before a date with a big event such as the Yodogawa fireworks.
          </p>
        </section>

        {/* Best time / sunset */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Best time to go</span>
          <h2 className={styles.sectionTitle}>What Time Is Sunset at Umeda Sky Building?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From November to February, sunset in Osaka is between <strong>16:47 and 17:53</strong>;
            in early July it is as late as 19:15. <strong>Enter 30 to 45 minutes before
            sunset</strong> and one ticket gets you daylight, golden hour and the night view from
            the open rooftop. These are the published times from the National Astronomical
            Observatory of Japan&apos;s 2026 table for Osaka — for a 2027 date, open the same
            NAOJ page for that year:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Date", "Sunset in Osaka", "What it means on the roof"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sunsetRows.map((row) => (
                    <tr key={row.date}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.date}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.sunset}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked url={NAOJ_URL} label="National Astronomical Observatory of Japan, Osaka sunrise/sunset table (official)" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two consequences worth spelling out. First, <strong>in winter the sunset is inside the
            pass window and in summer it is not</strong>: on 1 December golden hour has begun before
            15:00, so a pass holder can have both the free entry and the light, while on 1 July
            sunset is four hours after the pass cut-off. Second, the deck stays open long after dark
            in every season, so if you miss the light you have not missed the visit — the night view
            from the roof is the other half of what you paid for, and it is the easier half to get.
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={umedaSkyBuildingTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Umeda Sky Building ticket on Klook →
            </KlookLink>
            <KlookLink href={osakaNaniWonderNightBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Night bus from Osaka Station →
            </KlookLink>
          </div>
        </section>

        {/* Crowds */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Crowds</span>
          <h2 className={styles.sectionTitle}>How Busy Does It Get, and When Is It Quietest?</h2>
          <p className={styles.bodyText}>
            There is no booking system here, which cuts both ways: nothing sells out, and nothing
            caps the number of people on the roof either. The two pressure points are predictable
            from the ticketing rather than from guesswork. <strong>The hour before sunset</strong> is
            the peak, because that is when everyone wants the same twenty metres of west-facing
            railing. And <strong>the run-up to 15:00</strong> is a second, less obvious peak, because
            that is the deadline for free entry on the Osaka Amazing Pass and the Osaka e-Pass alike.
          </p>
          <p className={styles.bodyText}>
            The quietest paid hours are the ones either side of those: mid-morning after 9:30, and
            late evening from about 21:00, when the view is identical and the last entry is still an
            hour away. Cherry season — late March into mid-April — and the summer holidays lift the
            baseline everywhere in Osaka, and the 31 March row in the table above is in exactly that
            fortnight. Our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link>{" "}
            lays out how the rest of a city day fits around a deck visit.
          </p>
        </section>

        {/* Compare */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is Umeda Sky Building Worth It vs Abeno Harukas?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Yes, if you want an open-air rooftop, a late close and a deck next to Osaka
            Station:</strong> Umeda is ¥2,000 against ¥2,200 at the Harukas 300 counter (¥1,980 web
            advance), and it stays open half an hour later. Pick Abeno Harukas if sheer height
            matters more than open air. Osaka has three paid decks and they are genuinely different purchases — one is the
            tallest, one is open to the sky, one is the cheapest and sits in the old Shinsekai
            quarter. The pass column is the one most comparisons leave out, and it is where the
            money is:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Height / layout", "Adult price", "Hours", "Area", "Osaka Amazing Pass"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem", whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked url={HARUKAS_URL} label="abenoharukas-300.jp (official), with skybldg.co.jp for Umeda" />
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The Umeda and Harukas 300 rows were re-read on {LAST_CHECKED}; the Tsutenkaku row
            (tsutenkaku.co.jp) and the pass column (the Osaka Amazing Pass operator&apos;s facility
            list) on {CHECKED}. Umeda&apos;s 173 m height is from Osaka&apos;s official
            tourism site. Note the two asymmetries: <strong>Harukas 300 is not on the Amazing Pass
            facility list</strong>, so its price is payable on any pass day, and <strong>Tsutenkaku asks you to book a time
            slot at the facility</strong> even with a pass, which the other two do not. Subject to
            change — confirm before you travel.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Umeda Sky Building from Osaka Station?</h2>
          <p className={styles.bodyText}>
            On foot: it is a <strong>7-minute walk from JR Osaka Station</strong> and about{" "}
            <strong>9 minutes from Hankyu Osaka-Umeda or the Osaka Metro Umeda station</strong>,
            north-west through the New Umeda City block (Osaka&apos;s official tourism site; one of
            its sister pages says about 10). The reason it feels longer than seven minutes is the
            railway: the operator&apos;s step-by-step route from each station includes a 40-metre
            underground walkway beneath the tracks, so the building disappears from view for part
            of the walk. Keep going — it reappears. Once inside, use the observatory&apos;s own
            entrance rather than the office lifts.
          </p>
          <p className={styles.bodyText}>
            Umeda is the northern hub of the Midosuji Line, so getting to Osaka Station in the first
            place is the easy part from anywhere in the city. Our{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka guide</Link>{" "}
            explains how the Midosuji Line joins Umeda to Namba and Tennoji, and the{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass guide</Link> works out
            whether a day pass beats tapping a card on a day with several stops in it, and our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka guide</Link>{" "}
            compares Umeda with Namba as a base. Walking times read on {CHECKED}.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book Umeda Sky Building in Advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>No.</strong> There is no timed-entry slot, and the 39th-floor counter sells
            tickets on the day for cash or credit card. Book ahead only for convenience: Klook for
            an English checkout on a foreign card, or the operator&apos;s cheaper date-specific web
            ticket on asoview if you can work through Japanese. If you hold an Osaka Amazing Pass and
            arrive before 15:00, buy nothing.
          </p>
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
          <h3 className={styles.pickName} style={{ marginTop: "1.5rem", marginBottom: "0.6rem" }}>
            Which Umeda Sky Building ticket should you choose?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Choose by the hour you go.</strong> Same-day tickets are sold at the counter
            and nothing sells out, but the hour before sunset and the run-up to 15:00 are the
            crowded times, and any online booking carries its own cancellation window — check it on
            the listing before you pay.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your visit", "Best pick", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {choiceRows.map((row) => (
                    <tr key={row.situation}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.situation}</td>
                      <td style={{ fontSize: "0.86rem", fontWeight: 600 }}>{row.pick}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked url={OFFICIAL_URL} label="skybldg.co.jp/en/observatory/ (official)" />
          <p className={styles.bodyText} style={{ marginTop: "0.5rem" }}>
            For the full list of what the pass covers and the 1-day versus 2-day arithmetic, see the{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={umedaSkyBuildingTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Umeda Sky Building tickets on Klook →
            </KlookLink>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Daytime visit? Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={osakaCastleUmedaTonboriDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              With the castle and the river cruise →
            </KlookLink>
          </div>
        </section>

        {/* Same-day bookings (3 Nov 2026): directly after the advance-or-counter and
            pass-or-ticket decision, because the observatory ticket is assumed to sit in
            Klook's low special-activity band. Existing ticket and pass links are unchanged. */}
        <KlookTripPrep
          label="Book for the same day"
          heading="What to Book Alongside Your Umeda Sky Building Ticket"
          intro="The deck is an hour or two; the rest of the day still needs dinner, a bed near Umeda, the ride in from Kansai Airport and data on your phone. These four are booked on the same Klook account as the ticket. No prices are quoted — open each listing for the current figure."
          items={umedaSkySameDayPrep}
        />

        {/* The pass question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The pass question</span>
          <h2 className={styles.sectionTitle}>Is Umeda Sky Building Free with the Osaka Amazing Pass?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, but only from 9:30 to 15:00.</strong> The Umeda Sky Building is one of the
            40-plus free admissions on the Osaka Amazing Pass (and the Osaka e-Pass), but both the
            building&apos;s site and the pass operator&apos;s facility list restrict pass entry to{" "}
            <strong>before 15:00</strong>; from 15:00 the pass is worth
            a <strong>10% discount</strong> instead, so an evening visit still costs about ¥1,800 on
            top of the {PASS_1_DAY} you paid for the pass. That is the single most expensive
            misunderstanding available on an Osaka pass day, and almost nothing written about this
            deck mentions it.
          </p>
          <p className={styles.bodyText}>
            The arithmetic, with the pass at {PASS_1_DAY} for one day (official price, checked 9
            November 2026). <strong>This deck before 15:00 (¥2,000)</strong> and{" "}
            <strong>Osaka Castle&apos;s main tower (¥1,200)</strong> are ¥3,200 of admissions — just
            under the pass, so they need the day&apos;s subway rides to come out ahead. Add the{" "}
            <strong>HEP FIVE Ferris wheel (¥1,000)</strong>, five minutes from Umeda, and it is ¥4,200,
            clear of the pass before a single ride is counted. A pass bought for an evening trip up
            this one building loses money outright. Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass price and break-even table</Link>{" "}
            has the full inclusion list, the 2-day price and the exclusions, and our{" "}
            <Link href="/guides/attractions/osaka-castle-tickets">Osaka Castle tickets guide</Link>{" "}
            does the same arithmetic from the castle end, where three paid things sit inside one set
            of walls. Facility conditions read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass on Klook →
            </KlookLink>
            <KlookLink href={umedaSkyBuildingTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Just the observatory →
            </KlookLink>
          </div>
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
          heading="The Rest of an Osaka Day"
          intro="An hour or two on the roof leaves most of a day unspent, and Umeda is the far north of the city from Dotonbori and the castle. The first of these covers the castle and the deck together; the second is the walking version. Klook prices change by date, so open a listing for the current figure and the meeting point."
          tours={[osakaCastleUmedaTonboriDayTour, osakaPrivateWalkingTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
                  <path d="M12 6v12" strokeDasharray="2 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass 2026: ¥3,500 Price, Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-5 9-7 14-4 2 1 3 3 4 4-3 5-9 7-14 4-2-1-3-3-4-4z" />
                  <circle cx="8" cy="11" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Aquarium Kaiyukan Tickets (2026): Prices, Hours and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
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
                <p className={styles.relatedTitle}>Osaka 2 Day Itinerary (2026): Day by Day, and Bookings</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4M8 14h3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Kyoto 3 Day Itinerary (2026): Day by Day &amp; Bookings</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2v8a2 2 0 0 0 4 0V2M8 10v12M16 2c-2 2-2 6 0 8v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Food Tour (2026): Which to Book and What You Eat</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l9-5 9 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka 2026: Namba vs Umeda vs USJ, the Best Areas Compared</p>
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
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="16" height="12" rx="2" />
                  <path d="M4 11h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass 2026: Price, 1-Day vs 2-Day &amp; Enjoy Eco Card Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Which View Is Worth Paying For</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
                  <path d="M9 10h6M9 14h6" />
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
            <h2 className={styles.ctaBannerTitle}>Pick the hour, then the ticket</h2>
            <p className={styles.ctaBannerDesc}>
              Nothing sells out here, so the only decision that costs you money is the time of day:
              free with the Amazing Pass before 15:00, or the better light and the night view on a
              single ticket after it. Book ahead for an English checkout and a foreign card that
              works, and check the cancellation window shown on your own booking before you pay.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={umedaSkyBuildingTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Umeda Sky Building tickets on Klook →
              </KlookLink>
              <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Osaka Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
