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

/** Every figure on this page was read on this date. */
const CHECKED_ISO = "2026-11-03";
const CHECKED = checkedLabel(CHECKED_ISO);

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
  { date: "1 March", sunset: "17:54", note: "Deck still daylight at 17:00; a 17:15 entry gets the whole transition" },
  { date: "31 March", sunset: "18:18", note: "Cherry season — the busiest fortnight of the Osaka year" },
  { date: "1 July", sunset: "19:15", note: "Latest sunset of the year. Enter by 18:30" },
  { date: "1 September", sunset: "18:25", note: "Warm rooftop, long twilight — the easiest sunset to plan" },
  { date: "30 September", sunset: "17:44", note: "Sunset is already before 18:00 and dropping fast" },
  { date: "1 December", sunset: "16:47", note: "Earliest sunset of the year. Golden hour is mid-afternoon" },
  { date: "31 December", sunset: "16:57", note: "Still dark by 17:30 — six hours of night view left before closing" },
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
    a: `The Umeda Sky Building entrance fee is ¥2,000 for an adult and ¥500 for a child aged 4 to 12, with under-4s free — the operator's own published prices for the Kuchu Teien Observatory. Visitors with a disability certificate pay ¥1,000 / ¥250, and groups of 10 or more ¥1,800 / ¥450. An Osaka Amazing Pass gets you in free from 9:30 to 15:00 and gives 10% off from 15:00 to 22:00. All read on ${CHECKED}.`,
  },
  {
    q: "What is the Umeda Sky Building ticket price for kids?",
    a: `¥500 for a child aged 4 to 12, and free under 4 — a quarter of the ¥2,000 adult price. A child with a disability certificate pays ¥250, and in a group of 10 or more a child ticket is ¥450. From 13 the adult price applies. Prices from the operator's site, read on ${CHECKED}.`,
  },
  {
    q: "What are the Umeda Sky Building opening hours?",
    a: `The Kuchu Teien Observatory is open 9:30 to 22:30 with last admission at 22:00. The operator's site prints no regular closing day, but it does run special event days — the Yodogawa fireworks evening, for example — on special tickets and hours, so check the site before a date that clashes with a big event. The 22:30 close is later than Harukas 300 (22:00, last entry 21:30) and Tsutenkaku's general deck (21:45, last entry 21:15). Read on ${CHECKED}.`,
  },
  {
    q: "Can you pay by card, and are there cheaper tickets online?",
    a: `Yes to both. The operator lists cash and credit cards (and certain contract coupons) at the 39th-floor counter. Its Japanese site also sells a date-specific web-only ticket through asoview that it describes as a better deal than the counter, without printing the amount, and its English site links to a Klook ticket. On the Osaka Amazing Pass you do not buy a ticket at all before 15:00. Read on ${CHECKED}.`,
  },
  {
    q: "What is on the rooftop and in the basement of the Umeda Sky Building?",
    a: `The rooftop (RF) is a 360-degree open-air observation floor, and the operator's Japanese site lists a feature called Lumi Sky Walk on that level. Below it, 40F has cafe SKY 40 with counter seats, and 39F has the ticket counter, a gallery shop, the Chinese restaurant Sangu and Sky Lounge Stardust. At street level and below, B1F–1F is Takimi Koji, a Showa-retro street of restaurants and shops that you can walk into without a ticket. Floor list read on ${CHECKED}.`,
  },
  {
    q: "What is the best time to visit the Umeda Sky Building?",
    a: "Thirty to forty-five minutes before sunset, if you only go once. The rooftop is a genuinely open-air ring with no glass and no roof, so the light matters more here than at a glazed deck — and one entry gets you daylight, golden hour and the lit city in sequence. The catch is the pass: free entry with the Osaka Amazing Pass ends at 15:00, which in December is already after golden hour has started. If you are on the pass, go in the morning and accept the daylight view; if you are buying a single ticket, go at sunset.",
  },
  {
    q: "What time is sunset in Osaka?",
    a: `It swings by about two and a half hours across the year, which is why a generic “go at sunset” is useless without a date. The National Astronomical Observatory of Japan's published times for Osaka in 2026: 16:47 on 1 December, which is the earliest sunset of the year; 17:54 on 1 March; 18:18 on 31 March; 19:15 on 1 July, the latest of the year; 18:25 on 1 September; and 17:44 by 30 September. Enter 30 to 45 minutes before whichever of those matches your trip.`,
  },
  {
    q: "How long do you need at the Umeda Sky Building?",
    a: "Klook's own listing allows one to two hours, and that fits the building: three observatory levels — the 39th floor where you ticket, the indoor 40th floor with its 35-metre glass counter, and the open-air rooftop above it — plus the see-through escalator up from the 35th. An hour is enough if you are only there for the view. Two hours is the honest figure if you want to sit with a drink at the glass counter or wait out the light changing on the roof.",
  },
  {
    q: "How do I get to Umeda Sky Building from Osaka Station?",
    a: `On foot: Osaka's official tourism site gives 7 minutes from JR Osaka Station and 9 minutes from Hankyu Osaka-Umeda or Osaka Metro Umeda (a sister page on the same site says about 10). Head north-west from the station complex; the building sits on the far side of the rail lines, and the operator's route from each station includes a 40-metre underground walkway under the tracks, which is why the walk feels longer than the distance. No bus, no transfer and nothing to book. Read on ${CHECKED}.`,
  },
  {
    q: "Do you need to book Umeda Sky Building tickets in advance?",
    a: "No. There is no timed-entry slot, and the counter on the 39th floor sells tickets for cash or credit card. Booking ahead buys you convenience instead: an English checkout and a card issued abroad that works on Klook, or the cheaper date-specific web ticket the operator sells through asoview in Japanese. If you are on the Amazing Pass and arriving before 15:00, you do not buy a ticket at all.",
  },
  {
    q: "Is Umeda Sky Building free with the Osaka Amazing Pass?",
    a: `Only from 9:30 to 15:00, and this is the detail most guides skip. The pass is ${PASS_1_DAY} for one day and the Umeda deck is one of its 40-plus free admissions — but only until 15:00. From 15:00 the pass becomes a 10% discount, so an evening visit still costs about ¥1,800 on top of the pass. The arithmetic that works: a pass day with the Umeda deck before 15:00 (¥2,000), Osaka Castle (¥1,200) and the HEP FIVE Ferris wheel (¥1,000) is ¥4,200 of admissions against a ${PASS_1_DAY} pass (official price, checked 9 November 2026), before you count a single subway ride. Two stops alone, at ¥3,200, only clear it once the day's subway rides are added. The arithmetic that does not: buying the pass for a sunset trip up this one building.`,
  },
  {
    q: "Umeda Sky Building or Harukas 300 — which should you pick?",
    a: `Different products at a similar price, and the choice is open air against altitude. The Umeda deck is an unroofed 360-degree rooftop ring, ¥2,000, open until 22:30, seven minutes from JR Osaka Station, and free on the Amazing Pass before 15:00. Harukas 300 sits on top of what its operator calls Japan's tallest building, in Tennoji, at ¥2,200 at the counter or ¥1,980 as a web advance ticket, open 9:00 to 22:00 with last entry at 21:30 — and it is not on the Amazing Pass facility list. Pick Umeda for the open rooftop, the late close and the location; pick Harukas for the sheer height. Both read on ${CHECKED}.`,
  },
  {
    q: "Is the Umeda Sky Building good with children?",
    a: "Yes, and the pricing is the reason: ¥500 for ages 4 to 12 and free below that, which is a quarter of the adult rate and cheaper per head than almost anything else in central Osaka. The practical notes are the escalator, which small children either love or do not, and the rooftop, which is open to the sky and the wind at 173 metres — hold hands and bring a layer. There is no timed slot to work around and no minimum stay, so it folds into an afternoon easily.",
  },
  {
    q: "What happens if it rains, and is the rooftop ever closed?",
    a: "Two of the three observatory levels are indoors — the 39th floor where you ticket and the 40th with its glass counter — so a wet day still buys you the view from behind glass. The top level is the one that suffers: it is an open-air ring with no cover, so rain lands on you and strong wind is felt at full strength, and the operator states that the rooftop may be closed in heavy rain. If the roof is the reason you are going, watch the forecast and keep the date flexible rather than booking a fixed one.",
  },
  {
    q: "Is there a free observation deck in Osaka instead?",
    a: `Not a 173-metre one. The lower part of the Umeda Sky Building — the atrium and the Takimi Koji basement — costs nothing to walk into, and the building's exterior with the gap between the towers is the famous shot anyway, so you can see the architecture for free and skip the deck. If the ¥2,000 is the sticking point, the better move is a pass day: the Amazing Pass at ${PASS_1_DAY} covers this deck before 15:00, Osaka Castle, the Nishinomaru Garden, the HEP FIVE Ferris wheel at ¥1,000 and the river cruises, plus the subway in between.`,
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/umeda-sky-building-tickets") },
});

const TITLE = "Umeda Sky Building Tickets 2026: Price, Hours & Entrance Fee";
const DESC =
  "Umeda Sky Building tickets: entrance fee ¥2,000 adult, ¥500 ages 4–12. Open 9:30–22:30, last entry 22:00; allow 1–2 hours. Free on Amazing Pass to 15:00.";

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
            Umeda Sky Building Tickets 2026:<br />Price, Hours and Entrance Fee
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
              <strong>In short:</strong> Umeda Sky Building tickets are <strong>¥2,000</strong> for an
              adult and <strong>¥500</strong> for a child aged 4 to 12, with under-4s free. The
              Kuchu Teien Observatory — three levels at <strong>173 metres</strong>, topped by a
              360-degree open-air rooftop — is open{" "}
              <strong>9:30 to 22:30 with last entry at 22:00</strong>, and Klook&apos;s own listing
              allows <strong>one to two hours</strong>. It is a{" "}
              <strong>7-minute walk from JR Osaka Station</strong> and 9 minutes from Hankyu
              Osaka-Umeda or Osaka Metro Umeda. There are no timed slots and the counter sells
              tickets on the day, so the only real decision is the hour: the{" "}
              <strong>Osaka Amazing Pass covers this deck free only until 15:00</strong>, and from
              15:00 it is 10% off — which means the pass and the sunset view rarely overlap. All
              read on {CHECKED}.
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

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Umeda Sky Building Tickets: Price, Hours and How to Buy</h2>
          <p className={styles.bodyText}>
            The Kuchu Teien Observatory at the Umeda Sky Building costs{" "}
            <strong>¥2,000 for an adult and ¥500 for a child aged 4 to 12</strong> (under-4s free),
            and it is open <strong>9:30 to 22:30 with last admission at 22:00</strong> — the
            operator&apos;s own figures, read on {CHECKED}. You can buy a ticket{" "}
            <strong>on the day at the 39th-floor counter</strong> (cash or credit card) or{" "}
            <strong>in advance online</strong> — Klook in English, or the operator&apos;s cheaper
            date-specific web ticket on asoview in Japanese. The{" "}
            <strong>Osaka Amazing Pass gets you in free from 9:30 to 15:00</strong> and gives 10%
            off from 15:00 to 22:00, so it covers a daytime visit but not a sunset one.
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
            <strong>¥500 for a child aged 4 to 12</strong>, read off the operator&apos;s site on{" "}
            {CHECKED}. One flat price per age band, with no premium slots; the only variable is the
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices read on {CHECKED} from the operator&apos;s own site (skybldg.co.jp), with the pass
            conditions matching the Osaka Amazing Pass operator&apos;s facility list the same day.
            Subject to change — confirm before you buy. For the admissions in this guide
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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            That <strong>22:30 close</strong> is the deck&apos;s quiet advantage. It is later than
            Harukas 300 (22:00) and Tsutenkaku&apos;s general deck (21:45), and it is still three
            hours past sunset in midsummer, when sunset in Osaka is as late as 19:15. If your day is
            already full, this is the attraction you can do after dinner. Hours read off the
            operator&apos;s site on {CHECKED}; it runs special event days on separate tickets, so
            check the site before a date with a big event such as the Yodogawa fireworks.
          </p>
        </section>

        {/* Best time / sunset */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Best time to go</span>
          <h2 className={styles.sectionTitle}>What Time Is Best for Sunset at Umeda Sky Building?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Enter 30 to 45 minutes before sunset</strong> — between about 16:00 in early
            December and about 18:30 in early July — and one ticket gets you daylight, golden hour
            and the night view from the open rooftop. &quot;Go at sunset&quot; is useless advice without a date, because Osaka sunset moves by
            about <strong>two and a half hours</strong> across the year. These are the published
            times from the National Astronomical Observatory of Japan&apos;s own ephemeris for Osaka
            in 2026 — enter 30 to 45 minutes before the one that matches your trip:
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
          <h2 className={styles.sectionTitle}>Umeda Sky Building vs Harukas 300 vs Tsutenkaku</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Osaka has three paid decks and they are genuinely different purchases — one is the
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every row re-read on {CHECKED} from the operator&apos;s own site — skybldg.co.jp,
            abenoharukas-300.jp and tsutenkaku.co.jp — with the pass column from the Osaka Amazing
            Pass operator&apos;s facility list. Umeda&apos;s 173 m height is from Osaka&apos;s official
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
          <h2 className={styles.sectionTitle}>Do You Need to Book Umeda Sky Building Tickets in Advance?</h2>
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
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas Compared</p>
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
