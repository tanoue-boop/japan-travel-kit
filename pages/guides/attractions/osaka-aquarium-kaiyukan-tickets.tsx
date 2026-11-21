import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kaiyukanLegolandCombo,
  kaiyukanNifrelCombo,
  kaiyukanSameDayCards,
  kaiyukanSameDayPrep,
  osakaAmazingPassKaiyukanCombo,
  osakaAquariumKaiyukanTicket,
  osakaPrivateWalkingTour,
  osakaMetroDayPass,
  osakaSkyVistaHalfDayBusTour,
  santaMariaDayCruise,
  osakaSightsHighRatePrep,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// The three same-day cards under the main CTA (task-jtk-20261115-P01) leave the lower
// blocks, so nothing is listed twice.
const notInTopCards = (item: { url: string }) => !kaiyukanSameDayCards.some((c) => c.url === item.url);

/**
 * Osaka Aquarium Kaiyukan — the Tempozan aquarium, and the one major Osaka attraction
 * the Amazing Pass does not cover.
 *
 * Sources, all on the operator's own site, kaiyukan.com:
 * - Re-checked 8 Nov 2026: /info/group/ (the only page that prints the full price bands
 *   as text, plus the ¥3,200 and ¥3,500 tier notes), /info/ticket/ (dynamic pricing,
 *   e-tickets from about 30 days before, date-and-time entry, window sells same-day
 *   only), /info/ticket/kaiyukan/ (2 and under free, disability half price plus one
 *   carer), /info/access/ (Osakako Exit 1 approx. 5 min, approx. 1,000 parking spaces),
 *   /program/night/ (17:00–20:00, last admission 19:00, varies by season),
 *   /about/news/20564.html (re-entry ended 15 June 2026), /info/area/ (baby care room,
 *   nursing room, lockers, wheelchair loan, cafe) and /thv/general/ (Ferris wheel 112.5 m).
 * - Last read 22 Oct 2026 and not re-printed on the pages above on 8 Nov: the 15-minute
 *   entry unit, the three official set tickets and the Santa Maria details.
 * - Re-checked 19 Nov 2026 (task-jtk-20261119-R08): all of the above except the
 *   15-minute unit, plus the group page's "90–120 minutes for one lap", the Santa Maria
 *   fares and Kaiyukan set price on suijo-bus.osaka, and the Amazing Pass participating
 *   list (no Kaiyukan; wheel, Santa Maria, Captain Line and LEGOLAND listed).
 * - Not given on any official page checked on 19 Nov: a crowd forecast, stroller rules,
 *   or November–New Year prices as text (the calendar is per date).
 *
 * Three things that would be easy to get wrong and are deliberately spelled out:
 *
 * - Kaiyukan runs 価格変動制 — dynamic pricing. There is no single admission figure, and
 *   any page quoting one flat number is quoting one day of the calendar. The bands are
 *   the honest answer, and the per-date figure lives on the operator's calendar.
 * - Re-entry ended on 15 June 2026. A lot of third-party advice still assumes you can
 *   leave for lunch at the Marketplace and come back. You cannot.
 * - There is no official Kaiyukan + Tempozan Giant Ferris Wheel set ticket. The
 *   aquarium's own set tickets are Santa Maria, LEGOLAND and the Captain Line shuttle;
 *   the wheel is a separate operator in the same complex.
 *
 * No Klook price appears: the Klook listing is the place to check the figure for a
 * date, and with a date-based price calendar behind it, a single number would be wrong
 * most days anyway.
 */

/**
 * Prices, booking rules, access, evening hours, the 90–120 minute lap and the three set
 * tickets: re-checked on kaiyukan.com on this date (task-jtk-20261119-R08). Same day:
 * suijo-bus.osaka/intro/santamaria/ (Santa Maria fares and the Kaiyukan set price) and
 * osaka-amazing-pass.com/en/service_free.html (Kaiyukan not listed; the wheel, the
 * Santa Maria, the Captain Line and LEGOLAND are).
 */
const CHECKED_ISO = "2026-11-19";
const CHECKED = checkedLabel(CHECKED_ISO);
/** The 15-minute entry unit and the 10:00 / 20:00 hours pattern: last read on this date. */
const SET_CHECKED = checkedLabel("2026-10-22");

const OFFICIAL = {
  bands: "https://www.kaiyukan.com/info/group/",
  ticket: "https://www.kaiyukan.com/info/ticket/",
  calendar: "https://www.kaiyukan.com/info/ticket/kaiyukan/",
  night: "https://www.kaiyukan.com/program/night/",
  access: "https://www.kaiyukan.com/info/access/",
  harbor: "https://www.kaiyukan.com/thv/general/",
  captainLine: "https://www.kaiyukan.com/thv/captline/",
  santaMaria: "https://suijo-bus.osaka/intro/santamaria/",
  amazingPass: "https://osaka-amazing-pass.com/en/service_free.html",
};

/** Ticket type × age × price. Row 1 is the answer most readers need. */
const priceRows = [
  {
    ticket: "Best buy: admission e-ticket (date and time)",
    who: "Adult (大人) — high-school age or 16 and over",
    price: "¥2,700 – ¥3,200",
    what: "Price set per date; e-tickets on sale from about 30 days before. The operator's booking notes: ¥3,200 dates take reservations from 15:00 only, ¥3,500 dates take none",
  },
  {
    ticket: "Admission",
    who: "Child (こども) — elementary and junior-high pupils",
    price: "¥1,400 – ¥1,650",
    what: "Roughly half the adult rate across the band",
  },
  {
    ticket: "Admission",
    who: "Infant (幼児) — 3 and over",
    price: "¥700 – ¥800",
    what: "A quarter of the adult rate",
  },
  {
    ticket: "Admission",
    who: "2 and under",
    price: "Free",
    what: "No ticket needed",
  },
  {
    ticket: "Admission, disability discount",
    who: "Certificate holder plus one carer",
    price: "Half the fee above",
    what: "A booklet, the Mirairo ID app or My Number Portal all count as proof; screenshots do not",
  },
  {
    ticket: "Kaiyukan + Santa Maria day cruise set",
    who: "Adult / junior high / elementary",
    price: "From ¥4,200 / ¥2,900 / ¥2,150",
    what: "Against ¥4,700 / ¥3,400 / ¥2,400 bought separately at the lowest admission; the cruise operator notes the set price may change in busy periods",
  },
];

/** When to go: only what the operator's own pages say, then what it means. Row 1 is the answer. */
const timingRows = [
  {
    when: "Best bet",
    official: "Admission is a variable price set per date, to match demand",
    means: "Pick a date at the low end of the price calendar, ideally a weekday out of school holidays, and an entry time from mid-afternoon",
  },
  {
    when: "Busiest (top-priced) dates",
    official: "¥3,200 adult dates: reservations from 15:00 only. ¥3,500 adult dates: no reservations taken",
    means: "A high calendar price is the crowd warning. On those dates plan an afternoon visit",
  },
  {
    when: "Turning up without a ticket",
    official: "The window sells same-day tickets only, from opening to last admission; you may not get your preferred time and may have to wait",
    means: "Buy the date-and-time e-ticket instead, from about 30 days before",
  },
  {
    when: "From 17:00",
    official: "Evening programme 17:00–20:00, last admission 19:00; times change by season",
    means: "The same ticket with the lights and music changed — the late slot most people skip",
  },
  {
    when: "One lap",
    official: "90–120 minutes round the one-way route; re-entry ended on 15 June 2026",
    means: "Leave two hours inside, and eat before or after rather than halfway through",
  },
];

/** Nearby things to pair with the aquarium, with time and the official price. Row 1 is the answer. */
const nearbyRows = [
  {
    what: "Easiest pairing: Santa Maria day cruise",
    time: "About 45 min; day sailings 11:00–16:00, every hour",
    price: "Adult ¥2,000, elementary ¥1,000 (one preschooler free per adult)",
    pass: "Yes",
    note: "Boards at Kaiyukan Nishi Hatoba beside the aquarium. Closed 31 Dec and 12 Jan – 5 Feb; weather and sea dependent",
  },
  {
    what: "Tempozan Giant Ferris Wheel (112.5 m)",
    time: "Next door; open 10:00–21:00 weekdays, 10:00–22:00 weekends and holidays",
    price: "¥1,000 (the pass's listed regular fee)",
    pass: "Yes",
    note: "Separate operator, so no Kaiyukan + wheel set ticket. The cruise operator sells a wheel + Santa Maria set",
  },
  {
    what: "Captain Line boat to Universal Studios Japan",
    time: "About 10 min crossing; 9:30–20:00, timetable changes by month",
    price: "¥1,700 round trip (the pass's listed regular fee)",
    pass: "Yes",
    note: "Universal City Port is about 5 min on foot from Universal City Station (JR Yumesaki Line). Kaiyukan sells a Captain Line set ticket",
  },
  {
    what: "LEGOLAND Discovery Center Osaka",
    time: "Same complex; weekdays 10:00–18:00 (last entry 16:00), weekends 10:00–19:00 (last entry 17:00)",
    price: "See the operator's site",
    pass: "Listed dates only, with advance reservation",
    note: "No adults-only or children-only groups. Kaiyukan sells a LEGOLAND set ticket",
  },
];

/** Hours, entry rules and facilities, each with the official page it came from. */
const factRows = [
  {
    item: "How tickets work",
    value: "Date-and-time entry, dynamic price per date; e-tickets on sale from, in principle, 30 days before",
    source: "kaiyukan.com/info/ticket/",
    checked: CHECKED,
  },
  {
    item: "Ticket window",
    value: "Same-day tickets only, from opening to last admission; your preferred entry time may be gone",
    source: "kaiyukan.com/info/ticket/",
    checked: CHECKED,
  },
  {
    item: "Busiest-date rules",
    value: "¥3,200 adult dates: bookings from 15:00 only. ¥3,500 adult dates: no bookings taken",
    source: "kaiyukan.com/info/group/",
    checked: CHECKED,
  },
  {
    item: "Evening programme",
    value: "17:00–20:00, last admission 19:00; times change by season",
    source: "kaiyukan.com/program/night/",
    checked: CHECKED,
  },
  {
    item: "Re-entry",
    value: "Ended from 15 June 2026 — one entry per ticket",
    source: "kaiyukan.com/about/news/20564.html",
    checked: CHECKED,
  },
  {
    item: "Under 3",
    value: "2 and under free",
    source: "kaiyukan.com/info/ticket/kaiyukan/",
    checked: CHECKED,
  },
  {
    item: "Babies",
    value: "Baby care room (changing beds, formula-water dispenser) and nursing room",
    source: "kaiyukan.com/info/area/",
    checked: CHECKED,
  },
  {
    item: "Lockers and wheelchairs",
    value: "Lockers near the entrance, in Kaiyukan Hall and by the museum shop; wheelchair loan at the information desk",
    source: "kaiyukan.com/info/area/",
    checked: CHECKED,
  },
  {
    item: "Getting there",
    value: "Osakako Station (Chuo Line) Exit 1, approx. 5 min on foot; approx. 1,000 parking spaces",
    source: "kaiyukan.com/info/access/",
    checked: CHECKED,
  },
];

const whoFor = [
  {
    title: "Buy a date-and-time e-ticket if…",
    desc: `You are going at a weekend, in a holiday period, or at all if you can plan it. The operator's own e-ticket fixes your date and entry time and goes on sale from about 30 days before your visit date, and the operator warns that a same-day window ticket may not get you the time you want. Read on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <circle cx="12" cy="15" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Go late in the day if…",
    desc: `You want it quieter and you want it cheaper. From 17:00 the lighting and music change for the evening programme, and on a 20:00-closing day the last admission is 19:00. Dates in the top ¥3,200 adult tier only accept reservations from 15:00, so the busiest days push you towards the better half of them anyway. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "Buy a combo if…",
    desc: "Your day is the whole Tempozan waterfront rather than the tank. The aquarium's own set tickets add the Santa Maria harbour cruise, the Captain Line shuttle to Universal City, or LEGOLAND next door. Note what is not on that list: the Tempozan Giant Ferris Wheel is a separate operator, so there is no official aquarium-and-wheel ticket.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15h18l-2 5H5z" />
        <path d="M12 3v9M12 3l6 3-6 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check your date on the price calendar before anything else",
    desc: `Kaiyukan runs dynamic pricing — 価格変動制 in its own words — so the admission is set per date to match demand. There is no single figure to look up: the adult band runs ¥2,700 to ¥3,200, and the operator also notes a ¥3,200 tier that only takes bookings from 15:00 and a ¥3,500 tier that takes none at all. Your date decides which. Read on ${CHECKED}.`,
  },
  {
    title: "Pick an entry time, not just a day",
    desc: `The official e-ticket is a date-and-time ticket (read on ${CHECKED}), with entry set in 15-minute units (read on ${SET_CHECKED}). That is the lever you have over the crowd: the operator holds visitor numbers steady per time slot, and on its busiest dates it only takes bookings from 15:00.`,
  },
  {
    title: "Book from about 30 days out",
    desc: `The operator states that e-tickets go on sale from, in principle, 30 days before your visit date, and that the window sells same-day tickets only, from opening to last admission. So there is a real booking window here — not the two-week midnight scramble a timed Tokyo deck demands, but far from unlimited either. Read on ${CHECKED}.`,
  },
  {
    title: "Use a reseller if you want an English checkout or a foreign card",
    desc: "The official e-ticket system is Japanese-first. Klook's listing is the English-language route to the same admission, taking a foreign card and giving you a code to scan — and it is also where the combo tickets and the Osaka Amazing Pass bundle sit in one place. Confirm the cancellation window and whether your listing is date-specified before you pay, because both are set per listing.",
  },
  {
    title: "Plan to stay inside — re-entry has ended",
    desc: `This is the rule many third-party guides have not caught up with. Kaiyukan ended re-entry on 15 June 2026, stating that it wanted to keep visitor numbers steady within each time slot. Lunch at the Tempozan Marketplace and a second lap afterwards is no longer an option: one entry, one visit. Read on ${CHECKED}.`,
  },
];

/** The five questions in the FAQPage markup (task-jtk-20261119-R08). */
const faqItems = [
  {
    q: "How much are Kaiyukan tickets?",
    a: `Kaiyukan tickets cost ¥2,700–¥3,200 for an adult (high-school age or 16 and over), ¥1,400–¥1,650 for an elementary or junior-high child and ¥700–¥800 for an infant aged 3 and over; anyone 2 or under is free. The aquarium uses dynamic pricing, so the exact figure is set per date on its price calendar and busier dates sit at the top of the band. Disability certificate holders and one carer pay half. The Kaiyukan + Santa Maria cruise set starts at ¥4,200 for an adult. Read off kaiyukan.com and suijo-bus.osaka on ${CHECKED}.`,
  },
  {
    q: "Do you need to book Osaka Aquarium tickets in advance?",
    a: `Not compulsory, but advised. Entry is by date and time; the ticket window sells same-day tickets only and warns that you may not get your preferred time and may have to wait, while the official e-ticket fixes your slot and goes on sale from about 30 days before your visit. On its top-priced dates the operator's booking notes are stricter: ¥3,200 adult dates take reservations from 15:00 only and ¥3,500 dates take none. Read on ${CHECKED}.`,
  },
  {
    q: "How long do you need at Kaiyukan?",
    a: `The aquarium itself puts one lap of its one-way route at 90–120 minutes. The route takes you to the top floor and spirals down past the tanks, including the Pacific tank with the whale sharks, so you walk it once. Since re-entry ended on 15 June 2026, plan it as one unbroken block and add time for the Santa Maria cruise (about 45 minutes) or the Ferris wheel next door. Read on ${CHECKED}.`,
  },
  {
    q: "What is the best time to visit Kaiyukan?",
    a: `A weekday date at the low end of the price calendar, entering from mid-afternoon. The operator does not publish a crowd forecast, but the price is set to match demand, its top-priced (¥3,200) dates take reservations from 15:00 only, and the evening programme runs 17:00–20:00 with last admission at 19:00 (times change by season). Read on ${CHECKED}.`,
  },
  {
    q: "Is the Osaka Amazing Pass valid at Kaiyukan?",
    a: `No. Kaiyukan is not on the Osaka Amazing Pass list of participating attractions checked on ${CHECKED}. The pass (¥3,500 for 1 day) does cover three things right next to it — the Tempozan Giant Ferris Wheel, the Santa Maria day cruise and the Captain Line boat to Universal City Port — so it can still pay on a Tempozan day if you add those. Klook also sells an Amazing Pass + Kaiyukan bundle as one checkout.`,
  },
];

/** Further questions shown on the page but kept out of the FAQPage markup. */
const moreFaqItems = [
  {
    q: "Why does the Kaiyukan ticket price change by date?",
    a: `Because the aquarium chose to. Kaiyukan states that it has introduced 価格変動制 — dynamic pricing — in order to set a "fair price" matching demand and so admit more visitors. In practice that means a quiet Tuesday in February and a Golden Week Saturday are different products at different prices, and no fixed figure on any third-party page can be right for both. It also means the price itself is a crowd signal: if your date is at the top of the band, it is going to be busy. The stated reason and the variable-price notice read on ${CHECKED}.`,
  },
  {
    q: "What are the Osaka Aquarium Kaiyukan opening hours?",
    a: `They vary by date, and the operator publishes them on a calendar rather than as a fixed schedule — it asks visitors to check their own date, which is the honest instruction to pass on. The pattern to expect is a 10:00 opening and a 20:00 close, with last admission one hour before closing, and closing days are a handful in January and February (read on ${SET_CHECKED}). The evening programme page gives 17:00–20:00 with last admission at 19:00 and notes that times change by season (read on ${CHECKED}). Confirm your date on the calendar before you build a day around it.`,
  },
  {
    q: "Are there coin lockers at Kaiyukan?",
    a: `Yes, in three places: near the aquarium entrance, in Kaiyukan Hall and near the museum shop. The ones in the hall and by the shop can be used without an aquarium ticket, and there are more lockers in the Tempozan Marketplace and under the Ferris wheel. Wheelchairs are lent at the information desk. Read off kaiyukan.com/info/area/ on ${CHECKED}.`,
  },
  {
    q: "Are Kaiyukan tickets more expensive over the New Year holidays?",
    a: `Check the calendar for your date, because the official pages checked on ${CHECKED} do not print November-to-New-Year prices as text — each date's figure appears only on the price calendar. What the operator does publish is the shape of the top end: adult dates at ¥3,200 accept bookings from 15:00 only, and adult dates at ¥3,500 accept no bookings at all. If your date is in a holiday period, look it up as soon as e-tickets open, about 30 days ahead.`,
  },
  {
    q: "How do you get to Osaka Aquarium Kaiyukan?",
    a: `The main route is Osaka Metro's Chuo Line to Osakako Station — officially 大阪港駅（海遊館前）, "Osakako, in front of Kaiyukan" — then Exit 1 and about a five-minute walk. From the Universal Studios side, the Captain Line shuttle boat lands at Kaiyukan Nishi Hatoba, right at the door. Osaka City Bus stops at Tempozan Harbor Village and Nankai Bus at Kaiyukan (Tempozan), and there are around 1,000 parking spaces. All read off kaiyukan.com/info/access/ on ${CHECKED}.`,
  },
  {
    q: "Can you re-enter Kaiyukan if you go out for lunch?",
    a: `No, not any more — and this is the detail most guides still get wrong. Kaiyukan announced that it would end re-entry from 15 June 2026, giving as its reason that it wanted to hold visitor numbers steady within each time slot so people could look at the exhibits at their own pace. Eat before you go in or after you come out; the Tempozan Marketplace next door is where most people do, and your admission ticket also works as a discount coupon there. Read on ${CHECKED}.`,
  },
  {
    q: "Can you combine Kaiyukan with the Tempozan Ferris wheel or the Santa Maria?",
    a: `Partly, and the distinction matters when you are buying. The aquarium sells official set tickets for three things: the Santa Maria, a sailing-ship replica that cruises Osaka Harbour in about 45 minutes (adult set from ¥4,200); the Captain Line shuttle to Universal City Port, about ten minutes across the water; and LEGOLAND Discovery Center Osaka in the same complex. The Tempozan Giant Ferris Wheel — 112.5 metres, in the same Harbor Village — is not on that list and is run by a separate operator, so there is no official aquarium-and-wheel ticket; buy that one on the day, or use the Osaka Amazing Pass, which covers it. All read on ${CHECKED}.`,
  },
  {
    q: "Is Kaiyukan worth it with small children?",
    a: `It is one of the easier major attractions in Osaka for a family, with the caveats being practical rather than about enjoyment. Entry is free under 3 and ¥700–800 for a 3-year-old and up, the route is a single one-way walk rather than a maze, and the headline exhibits — the whale sharks in the Pacific tank, the Antarctic penguins — are the ones small children actually want. The building has a baby care room with changing beds and a formula-water dispenser, plus a nursing room. The things to plan around are the end of re-entry, which makes the visit one unbroken block, and the operator's own 90–120 minutes for one lap. The official pages checked do not set out stroller rules, so ask at the entrance if you need to know before you go. Prices and facilities read on ${CHECKED}.`,
  },
  {
    q: "Is Kaiyukan a good rainy-day option in Osaka?",
    a: "One of the best, with one gap. The aquarium is entirely indoors and the Tempozan Marketplace next door is covered, so a wet afternoon costs you nothing inside — but Exit 1 at Osakako is still a five-minute walk away, and the two obvious pairings, the Santa Maria harbour cruise and the Ferris wheel, are exactly the parts of a Tempozan day the rain spoils. The Santa Maria in particular sails subject to weather and sea conditions. If the forecast is bad, buy the admission alone and leave the water for another day.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/osaka-aquarium-kaiyukan-tickets") },
});

const TITLE = "Osaka Aquarium Kaiyukan Tickets 2026: Price, Best Time to Go";
const DESC =
  "Kaiyukan tickets 2026: Osaka Aquarium adults ¥2,700–3,200 by date, kids ¥1,400–1,650, age 3+ ¥700–800. Timed e-tickets 30 days ahead; Osakako 5 min.";

export default function OsakaAquariumKaiyukanTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-aquarium-kaiyukan-tickets" />
        {hreflangLinks("/guides/attractions/osaka-aquarium-kaiyukan-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-aquarium-kaiyukan-tickets" />
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
              route: "/guides/attractions/osaka-aquarium-kaiyukan-tickets",
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
                  name: "Osaka Aquarium Kaiyukan Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/osaka-aquarium-kaiyukan-tickets",
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
          <span className={styles.breadCurrent}>Osaka Aquarium Kaiyukan Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka Aquarium Kaiyukan Tickets 2026: <br />Price &amp; Best Time to Go
          </h1>
          <p className={styles.heroSubtitle}>
            Kaiyukan tickets by age, the official signals on when it is busy, how long one lap takes,
            and what to pair with it at Tempozan — the Ferris wheel, the Santa Maria cruise and the
            boat to Universal Studios.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official price bands, dated", "Re-entry rule explained"].map((t) => (
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

        {/* Answer-first opening paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Osaka Aquarium Kaiyukan tickets cost ¥2,700–¥3,200 for an adult, ¥1,400–¥1,650
            for an elementary or junior-high child and ¥700–¥800 for an infant aged 3 and over, and
            under-3s go free</strong> — the price is set per date under the aquarium&apos;s dynamic
            pricing, so busier dates sit at the top of the band (kaiyukan.com, checked {CHECKED}).
            Entry is by date and time: booking is not compulsory, but the window sells same-day tickets
            only and may not have your time, so the official e-ticket, on sale from about 30 days
            before, is the safe route. Kaiyukan is about a 5-minute walk from Exit 1 of Osakako Station
            on the Osaka Metro Chuo Line, and the aquarium puts one lap of its one-way route at 90–120
            minutes.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Kaiyukan tickets for your date on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards
          heading="What to book for the same Kaiyukan day"
          cards={kaiyukanSameDayCards}
          footnote={
            <>
              Riding the subway more than seeing paid sights?{" "}
              <KlookLink href={osakaMetroDayPass.url} adPlacement="same-day-cards" target="_blank" rel="sponsored nofollow noopener">
                The Osaka Metro 1-day / 2-day pass on Klook →
              </KlookLink>{" "}
              (the Enjoy Eco Card is the station-machine version — compared in our{" "}
              <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass guide</Link>).
            </>
          }
        />

        <EsimCtaTop />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Adult admission</p>
                <p className={styles.verdictStatValue}>¥2,700–3,200, by date</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>How long to allow</p>
                <p className={styles.verdictStatValue}>90–120 min, one way round</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting there</p>
                <p className={styles.verdictStatValue}>Osakako Exit 1, 5 min walk</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Booking</p>
                <p className={styles.verdictStatValue}>Dated e-ticket, 30 days ahead</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Osaka Aquarium Kaiyukan tickets do not have one price. The
              aquarium runs dynamic pricing, so an adult pays somewhere between{" "}
              <strong>¥2,700 and ¥3,200</strong> depending on the date, a school-age child{" "}
              <strong>¥1,400–1,650</strong>, an infant of 3 and over <strong>¥700–800</strong>, and
              under-3s nothing. Buy the official date-and-time e-ticket, which fixes your entry time
              and opens about <strong>30 days</strong> before your visit — the ticket window sells
              same-day only, so that is also how you skip the queue.
              Allow <strong>90–120 minutes</strong> (the aquarium&apos;s own figure for one lap) and plan
              it as one unbroken block:{" "}
              <strong>re-entry ended on 15 June 2026</strong>. It is a five-minute walk from Exit 1
              at Osakako on the Chuo Line, and it is <strong>not</strong> covered by the Osaka
              Amazing Pass. All read off kaiyukan.com on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Kaiyukan tickets on Klook →
              </KlookLink>
              <KlookLink href={osakaAmazingPassKaiyukanCombo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                With the Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Osaka Aquarium Kaiyukan?</h2>
          <p className={styles.bodyText}>
            Kaiyukan is the aquarium at Tempozan, on the water in Osaka&apos;s Minato ward, and it is
            built around one idea: a walk through the habitats of the Pacific Rim, with the
            enormous Pacific tank and its whale sharks at the centre of it. The operator puts
            the collection at roughly <strong>620 species and 30,000 creatures</strong>, which
            includes the Antarctic penguins most visitors come out talking about.
          </p>
          <p className={styles.bodyText}>
            Three things make the ticket worth thinking about rather than just buying. The price
            moves with the date, so there is a cheap version of this visit and an expensive one. The
            entry time is fixed when you book, which is the only real control you have over the
            crowd. And since June 2026 you cannot leave and come back, so the visit has to be
            planned as one block rather than split around lunch. The rest of this page is those
            three decisions and the numbers behind them.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Are Kaiyukan Tickets in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult Kaiyukan ticket costs ¥2,700 to ¥3,200 and a child&apos;s ¥1,400 to ¥1,650,
            depending on the date — Kaiyukan states that admission is a variable price (入館料は変動価格),
            and the figure for your day appears on its price calendar. Ticket type by age:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Who", "Price (official)", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket + row.who}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.who}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} — <a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a>{" "}
            (price bands and booking notes), <a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>{" "}
            (dynamic pricing, price calendar, disability rule) and{" "}
            <a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a> (set ticket).
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The group-booking page is the one that prints the bands as text, while the main ticket
            page shows the exact figure only once you pick a date on its calendar. The pages checked
            do not print November-to-New-Year prices as text, so look up holiday dates on the calendar
            itself. Subject to change — confirm your own date before you buy. For admissions across
            the rest of Japan, each with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Kaiyukan tickets for your date on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook&apos;s price also moves by date, so check the listing for your day and its
            cancellation terms before you pay.
          </p>
        </section>

        {/* Official facts table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rules and facilities</span>
          <h2 className={styles.sectionTitle}>What Are the Kaiyukan Ticket Rules, Hours and Facilities?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Entry is by date and time, re-entry has ended, and the evening runs to 20:00 with last
            admission at 19:00. Each line below is from the official page named, with the date it was
            checked:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Official", "Source", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.8rem" }}>{row.source}</td>
                      <td style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Which Kaiyukan Ticket Should You Buy?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kaiyukan admission on Klook →
            </KlookLink>
            <KlookLink href={kaiyukanLegolandCombo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              With LEGOLAND next door →
            </KlookLink>
            <KlookLink href={kaiyukanNifrelCombo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              With NIFREL at Expocity →
            </KlookLink>
          </div>
        </section>

        {/* Hours */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hours and crowds</span>
          <h2 className={styles.sectionTitle}>What Is the Best Time to Visit Kaiyukan?</h2>
          <p className={styles.bodyText}>
            <strong>A weekday date at the low end of the price calendar, entering from mid-afternoon.</strong>{" "}
            The official pages checked on {CHECKED} do not publish a crowd forecast, but the booking rules
            point the same way: on its top-priced adult dates (¥3,200) Kaiyukan takes reservations from
            15:00 only, and the evening programme runs <strong>17:00–20:00 with last admission at
            19:00</strong>, with times changing by season.
          </p>
          <div className={styles.tableWrap} style={{ margin: "1rem 0" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["When", "What the official pages say", "What it means for you"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row.when}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.official}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.means}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} — <a href={OFFICIAL.calendar} target="_blank" rel="noopener">kaiyukan.com/info/ticket/kaiyukan/</a>,{" "}
            <a href={OFFICIAL.bands} target="_blank" rel="noopener">kaiyukan.com/info/group/</a> (booking notes and the
            90–120 minute lap), <a href={OFFICIAL.ticket} target="_blank" rel="noopener">kaiyukan.com/info/ticket/</a>{" "}
            (window sales) and <a href={OFFICIAL.night} target="_blank" rel="noopener">kaiyukan.com/program/night/</a>.
          </p>
          <p className={styles.bodyText}>
            Opening hours sit on the same calendar as the prices, published per date, and the site asks
            you to check your own day. The shape to expect is a <strong>10:00 opening and a 20:00 close,
            with last admission an hour before</strong>, and closing days are a small number of dates in
            January and February (read on {SET_CHECKED}). From 17:00 the lighting and music change for the
            evening programme — the same ticket and the same tanks, in the half of the day the price
            calendar steers you towards on its busiest dates.
          </p>
        </section>

        {/* Time needed */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Time needed</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need at Kaiyukan?</h2>
          <p className={styles.bodyText}>
            <strong>90–120 minutes, by the aquarium&apos;s own count.</strong> Kaiyukan&apos;s group page
            gives that time for one lap of the building (read on {CHECKED}): the route takes you to the top
            floor and then down past the tanks in one direction, so you walk it once. Add time if you
            want to stand at the Pacific tank for the whale sharks or stop at Cafe R.O.F, which sits
            behind the Japan Trench tank with some seats facing it.
          </p>
          <p className={styles.bodyText}>
            That leaves most of the day. Tempozan is out on the bay, so the simplest pairing is the other
            half of the waterfront — the Ferris wheel or the Santa Maria — or Universal Studios Japan
            across the water. Our{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary">Osaka 2-day itinerary</Link> puts
            Kaiyukan into a full day with the routing worked out, the{" "}
            <Link href="/guides/attractions/osaka-3-day-itinerary">Osaka 3-day itinerary</Link> gives it
            the bay-side afternoon, and the{" "}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">Osaka and Kyoto 3-day
            itinerary</Link> uses it as the rainy-day or child-led option for Day 3.
          </p>
        </section>

        {/* Re-entry */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Re-entry</span>
          <h2 className={styles.sectionTitle}>Can You Re-enter Kaiyukan?</h2>
          <p className={styles.bodyText}>
            <strong>No.</strong> Kaiyukan ended re-entry from <strong>15 June 2026</strong>, announced on
            21 May 2026 as one of its measures to keep the number of visitors per time slot steady so that
            people can look at the exhibits at their own pace (kaiyukan.com/about/news/20564.html, checked{" "}
            {CHECKED}).
          </p>
          <p className={styles.bodyText}>
            Eat before you go in or after you come out. The drink stand SEA SAW is in the area before the
            ticket gate, the Tempozan Marketplace is next door, and lockers in Kaiyukan Hall and by the
            museum shop can be used without a ticket — useful for leaving bags before you go through.
          </p>
        </section>

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Is Kaiyukan Easy With Babies and Small Children?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, on the official facilities list.</strong> Anyone 2 or under goes free, and the
            building has a <strong>baby care room</strong> with changing beds and a formula-water
            dispenser, plus a <strong>nursing room</strong>. Wheelchairs are lent at the information
            desk. All read off kaiyukan.com on {CHECKED}. The official pages checked do not set out
            stroller rules, so ask at the entrance if that decides your day.
          </p>
          <p className={styles.bodyText}>
            The plan for a family is the same as anyone&apos;s, only more so: book an entry time so a
            small child is not standing in the same-day queue, and remember that with re-entry gone a nap
            or a meal has to happen before or after, not halfway through. If the trip is built around
            children, our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka guide</Link>{" "}
            compares bases, including Universal City, which is a short Captain Line crossing from the
            aquarium.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book Osaka Aquarium Tickets in Advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Not compulsory, but advised.</strong> The ticket window sells same-day tickets only
            and warns that you may not get your preferred entry time, while the official date-and-time
            e-ticket goes on sale from about 30 days before (kaiyukan.com/info/ticket/, read on{" "}
            {CHECKED}). How to book it, step by step:
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
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check Kaiyukan tickets on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Same day, same booking"
          heading="What Else Should You Book for a Kaiyukan Day?"
          intro="Two to three hours at the aquarium leaves the rest of the day open, and the pass that skips Kaiyukan still pays on the other day. These book on the same Klook account as the ticket."
          items={kaiyukanSameDayPrep.filter(notInTopCards)}
        />

        {/* Combos */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Combos</span>
          <h2 className={styles.sectionTitle}>What Can You Combine With Kaiyukan Nearby?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>The Santa Maria harbour cruise is the easiest pairing:</strong> it boards at the pier
            beside the aquarium and takes about 45 minutes. The aquarium sells official set tickets for
            three things — the Santa Maria, the Captain Line boat and LEGOLAND — and the Osaka Amazing
            Pass covers the wheel, the cruise and the Captain Line, though not Kaiyukan itself:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "Time", "Price (official)", "Amazing Pass?", "Worth knowing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {nearbyRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} — <a href={OFFICIAL.santaMaria} target="_blank" rel="noopener">suijo-bus.osaka/intro/santamaria/</a>{" "}
            (cruise fares, length, pier), <a href={OFFICIAL.amazingPass} target="_blank" rel="noopener">osaka-amazing-pass.com/en/service_free.html</a>{" "}
            (hours, closures, listed fees and pass coverage), <a href={OFFICIAL.captainLine} target="_blank" rel="noopener">kaiyukan.com/thv/captline/</a>{" "}
            and <a href={OFFICIAL.harbor} target="_blank" rel="noopener">kaiyukan.com/thv/general/</a> (crossing time, wheel height).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={santaMariaDayCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Santa Maria cruise on Klook →
            </KlookLink>
            <KlookLink href={kaiyukanLegolandCombo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kaiyukan + LEGOLAND on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Note what is <strong>not</strong> on the aquarium&apos;s set-ticket list. The <strong>Tempozan
            Giant Ferris Wheel</strong> — 112.5 metres above the ground and one of the largest in the
            world, in the same Harbor Village as the aquarium — is run by a separate operator, so there is
            no official aquarium-and-wheel combination. Buy that ticket on the day. The{" "}
            <strong>Captain Line</strong> set ticket is the one worth a second look if your trip
            includes Universal Studios Japan: it is a ten-minute boat crossing from Universal City
            Port straight to the aquarium&apos;s door, which turns two attractions on opposite sides
            of the water into one afternoon. Our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets and Express Pass guide</Link>{" "}
            covers what the park itself needs booking-wise, and our{" "}
            <Link href="/guides/attractions/usj-hotels">USJ hotels guide</Link> compares the Universal
            City rooms one crossing away. Set tickets and the wheel&apos;s 112.5 m height read off
            kaiyukan.com on {CHECKED}.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Kaiyukan?</h2>
          <p className={styles.bodyText}>
            Osaka Metro&apos;s <strong>Chuo Line to Osakako Station</strong>, which the aquarium
            calls 大阪港駅（海遊館前） — &quot;Osakako, in front of Kaiyukan&quot; — then{" "}
            <strong>Exit 1 and about a five-minute walk</strong>. That is the route almost everyone
            takes, and the Chuo Line runs through the middle of the city, so Hommachi is a direct
            ride and most other central stations are one change away. Our{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka guide</Link>{" "}
            explains how the Chuo Line fits the rest of the network, and the{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass guide</Link> works out
            whether a day pass beats tapping an IC card on a day like this one.
          </p>
          <p className={styles.bodyText}>
            Three other ways in, all from the operator&apos;s own access page: the{" "}
            <strong>Captain Line</strong> shuttle boat from Universal City Port, which lands at
            Kaiyukan Nishi Hatoba right at the entrance; Osaka City Bus to Tempozan Harbor Village or
            Nankai Bus to Kaiyukan (Tempozan), both a few steps from the door; and by car, with around
            1,000 parking spaces. All read on {CHECKED}.
          </p>
        </section>

        {/* The pass question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The pass question</span>
          <h2 className={styles.sectionTitle}>Is the Osaka Amazing Pass Valid at Kaiyukan?</h2>
          <p className={styles.bodyText}>
            <strong>No</strong> — Kaiyukan is not on the pass&apos;s list of participating attractions
            (osaka-amazing-pass.com, read on {CHECKED}), and it is the single most expensive thing the
            pass leaves out. The pass (¥3,500 for 1 day, ¥5,000 for 2 days) bundles unlimited Osaka Metro
            and city bus travel with free entry to about 40 facilities, including Osaka Castle, the Umeda
            Sky Building observatory and the river cruises (among them the{" "}
            <Link href="/guides/attractions/dotonbori-river-cruise">Dotonbori river cruise</Link>, ¥2,000
            without the pass) — and, right next to the aquarium, the
            Tempozan Giant Ferris Wheel, the Santa Maria day cruise and the Captain Line. Universal
            Studios Japan is not on it either. Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link>{" "}
            has the full inclusion list and the break-even arithmetic.
          </p>
          <p className={styles.bodyText}>
            The consequence is about scheduling rather than money. A city day that takes in three or
            four pass facilities is where the pass earns its price; a day built around Kaiyukan is
            not, so buying a second pass day for it wastes most of what you paid for. The shape that
            works — and the one our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link>{" "}
            lays out across a two or three-day trip — is one pass day for the city and one unpassed
            day for the blockbuster. If you would rather settle both in a single checkout anyway,
            Klook sells the Amazing Pass with a Kaiyukan ticket attached, which is the only product
            that does.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={osakaAmazingPassKaiyukanCombo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Amazing Pass + Kaiyukan on Klook →
            </KlookLink>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Just the aquarium →
            </KlookLink>
          </div>
        </section>

        {/* 21 Nov 2026 (P01): the 5% castle and Umeda tickets and a 6.5% day tour, just before the FAQ. GA4 placement kaiyukan-highrate-faq. */}
        <div data-placement="kaiyukan-highrate-faq">
          <KlookTripPrep
            label="Same trip"
            heading="Which Other Osaka Sights Can You Book for the Same Trip?"
            intro="Kaiyukan takes two to three hours, which leaves room for the castle or the Umeda deck that evening or the next day. Both are covered by the Osaka Amazing Pass, so these are for a trip without it."
            items={osakaSightsHighRatePrep}
            adPlacement="kaiyukan-highrate-faq"
          />
        </div>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Kaiyukan Tickets: Common Questions</h2>
          <div className={styles.faqList}>
            {[...faqItems, ...moreFaqItems].map((item, i) => (
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
          intro="Kaiyukan takes two to three hours of a day, which leaves the other half open — and Tempozan is a long way from the parts of Osaka most people want to see. This one covers the Castle, Dotonbori and Shinsekai end of the city. Klook prices change by date, so open a listing for the current figure and the meeting point."
          tours={[osakaSkyVistaHalfDayBusTour, osakaPrivateWalkingTour].filter(notInTopCards)}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 3 Nov 2026: the first Okinawa page — for a reader adding the islands to the trip. */}
            <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Okinawa Churaumi Aquarium Tickets 2026: Price, Hours, Access</p>
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
            <Link href="/guides/attractions/umeda-sky-building-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="5" height="15" />
                  <rect x="15" y="6" width="5" height="15" />
                  <path d="M4 6h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Umeda Sky Building Tickets (2026): Prices, Hours and the Best Time to Go</p>
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
                <p className={styles.relatedTitle}>Osaka Amazing Pass 2026: ¥3,500, Worth It? + 1-Day Plan</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
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
            <h2 className={styles.ctaBannerTitle}>Pick the slot, not just the day</h2>
            <p className={styles.ctaBannerDesc}>
              The price moves by date and the crowd moves by hour, so the entry time is the decision
              worth making. Book ahead for an English checkout, a foreign card that works, and a
              code to scan instead of a window queue — and check the cancellation window shown for
              your own date before you pay.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Kaiyukan tickets on Klook →
              </KlookLink>
              <KlookLink href={osakaAmazingPassKaiyukanCombo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
                With the Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
