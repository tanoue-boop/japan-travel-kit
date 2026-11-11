import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  fujiHakoneDayTour,
  hakoneLoopBusTour,
  kamakuraEnoshimaDayTourUrl,
  klookEsim,
  legolandDiscoveryCenterTokyoTicket,
  sanrioPurolandTicket,
  tokyoDisneyOneDayPassport,
  tokyoKidsCityDayPrep,
  tokyoKidsDisneyDayPrep,
  tokyoKidsStayAreas,
  tokyoPrivateAirportTransfer,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { gygTokyoDisneyResort } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { PRICES, checkedLabel } from "../../../lib/attraction-prices";

/**
 * A five-day Tokyo route for a family, written for the exact phrase "Tokyo Itinerary
 * with Kids". Added 3 Nov 2026 (task jtk-20261103-01).
 *
 * The page is organised around the three things that make a family trip different
 * from the adult itineraries this site already has: (1) which days need a ticket
 * bought weeks ahead — Disney, Sanrio Puroland and LEGOLAND Discovery Center all
 * sell by date; (2) where to sleep, because a nap break or an early park start is
 * a hotel decision; (3) what children pay on the trains.
 *
 * Read on 3 November 2026 for this page:
 *   tokyometro.jp/lang_en/ticket/guide/age/   "A child fare applies to persons age six to
 *                                             eleven", "Up to two toddlers can ride the
 *                                             subway free of charge as long as they are
 *                                             accompanied by an adult or a child", infants
 *                                             under one free, a 12-year-old still in
 *                                             elementary school counts as a child.
 *   jreast.co.jp/en/multi/nex/tickets/        children 6–11 pay half the basic fare and
 *                                             limited-express charge; toddlers (1–5) and
 *                                             babies ride free, but a ticket is required for
 *                                             the third and further toddler with one adult,
 *                                             and for a toddler occupying their own reserved
 *                                             seat. The page answers automated reads with
 *                                             HTTP 403, so it was read through the
 *                                             jreast.co.jp search index.
 *   tokyometro.jp (tips / considerations)     Tokyo Metro states it is working to make
 *                                             stations stroller friendly, so a stroller can
 *                                             reach the platform from the entrance without
 *                                             stairs; asks stroller users to keep the brakes
 *                                             on and hold the handle. Read through the search
 *                                             index.
 *   legolanddiscoverycenter.com/tokyo/en/     online tickets "From ¥2,350" to "Up To
 *     tickets/ and plan/opening-times/        ¥3,300" by date and time; "Children under 3
 *                                             visit for free"; "Adults MUST be accompanied
 *                                             by a child" (15 and under). Hours set per day
 *                                             (09:30–19:00 on 3 Nov, 10:00–18:00 on 4 Nov);
 *                                             4D Cinema closed 30 Nov – 4 Dec 2026.
 *   puroland.jp/guide/baby/ and /qa/          no strollers on the 1st and 2nd floors on
 *                                             weekends, holidays and weekdays when the park
 *                                             closes at 18:00; elevators, not escalators;
 *                                             strollers folded in the stroller parking.
 *                                             Read through the puroland.jp search index.
 *   tokyodisneyresort.jp (service pages)      stroller rental at ¥1,000 a day — but the
 *                                             same site's park-service pages list stroller
 *                                             rental among temporarily suspended services,
 *                                             so the page says to check rather than to rely.
 *
 * Carried from our own pages, each with its original check date: the Tokyo Disney
 * 1-Day Passport minimums and sales rules (28 Oct 2026), Sanrio Puroland's Day
 * Passport range (20 Oct 2026), the Tokyo Subway Ticket (19 Oct 2026), the
 * airport-train and limousine-bus fares (25 Oct 2026), Kotoku-in (19 Oct 2026), the
 * Hakone Freepass and Romancecar (19 Oct 2026) and the JAPAN RAIL PASS after the
 * 1 October 2026 revision (30 Oct 2026).
 *
 * Nothing here is first-hand, and no Klook price appears.
 */
const CHECKED_ISO = "2026-11-03";
const CHECKED = checkedLabel(CHECKED_ISO);
const DISNEY_CHECKED = checkedLabel("2026-10-28");
const AIRPORT_CHECKED = checkedLabel("2026-10-25");
const JRPASS_CHECKED = checkedLabel("2026-10-30");
const SANRIO = PRICES.sanrioPuroland;
const SUBWAY = PRICES.tokyoSubwayTicket;
const HAKONE = PRICES.hakoneFreepass;
const KOTOKUIN = PRICES.kotokuin;

const ROUTE = "/guides/attractions/tokyo-itinerary-with-kids";
const SLUG = "tokyo-itinerary-with-kids";

type Row = { when: string; plan: string; time: string; move: string; book: string; stroller: string };
type BookItem = { label: string; url: string; band: string };
type Day = { id: string; title: string; lead: string; rows: Row[]; book: BookItem[] };

const days: Day[] = [
  {
    id: "day-1",
    title: "Day 1: Arrive, Check In and Keep It Short",
    lead: "The first day is the airport and the hotel and nothing that needs a ticket. Children who have just flown do not need a plan; they need the shortest route to a bed, which is why the transfer is the one thing on this day worth booking.",
    rows: [
      {
        when: "Morning / afternoon",
        plan: "Land at Haneda or Narita and go to the hotel",
        time: "Haneda: 11–14 min to Shinagawa on Keikyu. Narita: from 53 min to Tokyo on the N'EX, or 1 h 50 min by limousine bus to Tokyo Station",
        move: "Keikyu ¥330 (Haneda → Shinagawa); Tokyo Monorail ¥520 adult, ¥260 child; N'EX ¥3,140 to Tokyo; limousine bus ¥3,100 Narita → Tokyo Station, ¥1,200 Haneda → Tokyo Station",
        book: "Optional — a private transfer or the limousine bus, if you have luggage and a stroller",
        stroller: "Bus: stroller travels as luggage. Trains: see the stroller question below",
      },
      {
        when: "Late afternoon",
        plan: "A walk near the hotel — Marunouchi or the Imperial Palace East Gardens side of Tokyo Station",
        time: "1–2 hours",
        move: "On foot",
        book: "No",
        stroller: "Pavement and lifts; no operator figure",
      },
      {
        when: "Evening",
        plan: "An early dinner and an early night",
        time: "—",
        move: "—",
        book: "No",
        stroller: "—",
      },
    ],
    book: [
      { label: "Private transfer, Haneda or Narita → your hotel", url: tokyoPrivateAirportTransfer.url, band: "Transfer" },
      { label: "Klook Japan eSIM", url: klookEsim.url, band: "Data" },
    ],
  },
  {
    id: "day-2",
    title: "Day 2: Tokyo Disneyland or Tokyo DisneySea",
    lead: "The one day on this route with a hard deadline: a Disney date goes on sale two months ahead at 14:00 Japan time, the parks do not sell tickets at the gate, and the resort's FAQ says that if a date sells out you cannot enter. Book this day first.",
    rows: [
      {
        when: "Morning",
        plan: "Arrive for opening at Disneyland or DisneySea (one park per ticket)",
        time: "Full day — opening hours are set per date on the resort's calendar",
        move: "JR Keiyo Line, Tokyo Station → Maihama, about 15–20 min",
        book: "Yes — a date- and park-specified 1-Day Passport",
        stroller: "The resort lists stroller rental at ¥1,000 a day, and also lists it among temporarily suspended services — check the app before relying on it",
      },
      {
        when: "Afternoon",
        plan: "A nap or a rest — back to a Maihama hotel if you are staying there",
        time: "1–2 hours",
        move: "Disney Resort Line monorail, or on foot",
        book: "A Maihama or Urayasu hotel, if you want the break",
        stroller: "—",
      },
      {
        when: "Evening",
        plan: "Back into the park for the evening, or an early return to Tokyo",
        time: "Until closing, or not",
        move: "Keiyo Line back to Tokyo Station",
        book: "No (same ticket — check the re-entry rule for your date)",
        stroller: "—",
      },
    ],
    book: [
      { label: "Tokyo Disney Resort 1-Day Passport", url: tokyoDisneyOneDayPassport.url, band: "Park ticket" },
    ],
  },
  {
    id: "day-3",
    title: "Day 3: Odaiba and LEGOLAND Discovery Center Tokyo",
    lead: "An indoor morning, which makes this the day to swap with Day 4 or 5 if the forecast is bad. LEGOLAND Discovery Center sells online tickets by date and time, children under 3 go free, and adults cannot go in without a child.",
    rows: [
      {
        when: "Morning",
        plan: "LEGOLAND Discovery Center Tokyo, 3rd floor of DECKS Tokyo Beach",
        time: "2–3 hours (Klook listing's estimate)",
        move: "Yurikamome or Rinkai Line to Odaiba — neither is covered by the Tokyo Subway Ticket",
        book: "Yes — online tickets are priced by date and time, from ¥2,350 to ¥3,300",
        stroller: "Not stated on the official ticket page — ask the venue",
      },
      {
        when: "Afternoon",
        plan: "Odaiba's seafront and the shopping malls around DECKS",
        time: "2–3 hours",
        move: "On foot",
        book: "No",
        stroller: "No operator figure",
      },
      {
        when: "Evening",
        plan: "Back to the hotel; a sightseeing bus tour fits here on a non-park day instead",
        time: "—",
        move: "Yurikamome or Rinkai back to the city",
        book: "No",
        stroller: "—",
      },
    ],
    book: [
      { label: "LEGOLAND Discovery Center Tokyo ticket", url: legolandDiscoveryCenterTokyoTicket.url, band: "Ticket" },
      { label: "Tokyo sightseeing bus day tour", url: tokyoSightseeingBusTour.url, band: "Tour" },
    ],
  },
  {
    id: "day-4",
    title: "Day 4: Sanrio Puroland at Tama Center",
    lead: "Indoors again, and the second date-priced ticket: Puroland's Day Passport runs from ¥3,900 to ¥6,900 for an adult and ¥2,800 to ¥5,800 for ages 3–17 depending on the date, under-3s are free, and the park also wants an arrival reservation on top of the ticket.",
    rows: [
      {
        when: "Morning",
        plan: "Train west to Tama Center",
        time: "Allow the morning",
        move: "Keio Line or Odakyu Line from Shinjuku — not covered by the Tokyo Subway Ticket",
        book: "Yes — the Day Passport and the park's arrival reservation",
        stroller: "Use the walkway from Tama Center Station to the 3rd-floor entrance",
      },
      {
        when: "Midday / afternoon",
        plan: "Sanrio Puroland — shows, parades, the boat ride",
        time: "3–5 hours (Klook listing's estimate)",
        move: "On foot inside the building",
        book: "Included in the passport",
        stroller: "Not allowed on floors 1 and 2 on weekends, holidays and 18:00-closing weekdays; elevators only; fold it in the stroller parking",
      },
      {
        when: "Evening",
        plan: "Back to Shinjuku",
        time: "—",
        move: "Keio or Odakyu",
        book: "No",
        stroller: "—",
      },
    ],
    book: [
      { label: "Sanrio Puroland ticket", url: sanrioPurolandTicket.url, band: "Ticket" },
      { label: "Tokyo Subway Ticket (for the city half of the day)", url: tokyoSubwayTicket.url, band: "Pass" },
    ],
  },
  {
    id: "day-5",
    title: "Day 5: A Day Out — Kamakura or Hakone",
    lead: "One day out of the city, chosen by age. Kamakura is an hour on one JR train and costs little once you are there; Hakone is a longer day built around boats and a ropeway, better for children old enough to enjoy the ride rather than sleep through it. Both have a guided coach version if the trains sound like hard work.",
    rows: [
      {
        when: "Morning",
        plan: "Kamakura: the Great Buddha at Kotoku-in and Hase-dera — or Hakone: the loop by train, cable car, ropeway and lake cruise",
        time: "Full day either way",
        move: "Kamakura: JR Yokosuka Line from Tokyo Station, about 50–60 min. Hakone: Odakyu Romancecar from Shinjuku to Hakone-Yumoto",
        book: "Kamakura: no. Hakone: the Freepass and the Romancecar seat, or a coach tour",
        stroller: "No operator figure for either — temple paths and the Hakone transfers involve steps",
      },
      {
        when: "Afternoon",
        plan: "Kamakura: the Enoden tram along the coast. Hakone: Lake Ashi cruise",
        time: "2–3 hours",
        move: "Enoden, or the Hakone loop",
        book: "No (Freepass covers the Hakone loop)",
        stroller: "—",
      },
      {
        when: "Evening",
        plan: "Back to Tokyo; fly home on Day 6, or stay on",
        time: "—",
        move: "JR, or Odakyu",
        book: "No",
        stroller: "—",
      },
    ],
    book: [
      { label: "Kamakura & Enoshima day tour from Tokyo", url: kamakuraEnoshimaDayTourUrl, band: "Tour" },
      { label: hakoneLoopBusTour.title, url: hakoneLoopBusTour.url, band: "Tour" },
    ],
  },
];

/** Child fares, as the two operators publish them. */
const fareRows = [
  { who: "Under 1", metro: "Free", jr: "Free" },
  {
    who: "Ages 1–5 (preschool)",
    metro: "Free — up to two per accompanying adult or child; the third pays the child fare",
    jr: "Free — but the third and further toddler with one adult needs a child ticket, and so does a toddler taking their own reserved seat",
  },
  {
    who: "Ages 6–11 (elementary school)",
    metro: "Child fare — half the adult fare (a 12-year-old still in elementary school counts as a child)",
    jr: "Child fare — half the basic fare and half the limited-express charge",
  },
  { who: "12 and over", metro: "Adult fare", jr: "Adult fare" },
];

/** What to book before you fly, and when each opens. */
const bookingRows = [
  {
    what: "Tokyo Disney 1-Day Passport",
    opens: "Two months ahead, at 14:00 Japan time, for the same date",
    risk: "Sells out by date; not sold at the parks; no refunds for your own change of plan (resort FAQ)",
    price: "From ¥8,900 adult, ¥7,400 ages 12–17, ¥5,300 ages 4–11; 3 and under free",
  },
  {
    what: "Sanrio Puroland Day Passport",
    opens: "By date, plus a separate arrival reservation",
    risk: "Priced by date — a weekday is cheaper than a weekend",
    price: `${SANRIO.adult} adult, ${SANRIO.child} ages 3–17; under 3 free`,
  },
  {
    what: "LEGOLAND Discovery Center Tokyo",
    opens: "Online, by date and time",
    risk: "Priced by date and time; adults only with a child",
    price: "Online from ¥2,350 to ¥3,300; under 3 free",
  },
  {
    what: "Hotel (Maihama, Tokyo Station, Shinjuku)",
    opens: "Any time",
    risk: "Maihama rooms around school holidays go first",
    price: "Check on Klook",
  },
];

/** The trip-length choice, laid out. */
const lengthRows = [
  { days: "3 days", keep: "Day 1 (arrival), Day 2 (Disney), and one of Days 3–4", lose: "The day out and one indoor attraction" },
  { days: "4 days", keep: "Days 1–2, one of Day 3 (LEGOLAND) or Day 4 (Sanrio), and Day 5", lose: "Pick by age and by which character your children care about" },
  { days: "5 days", keep: "All five days as written", lose: "Nothing — and Day 6 is a flexible departure morning" },
  { days: "6+ days", keep: "Add the second Disney park, or a second day out", lose: "—" },
];

const faqItems = [
  {
    q: "How many days in Tokyo with kids?",
    a: "Four to five days is enough for one Disney day, one indoor character attraction, one day out of the city and a gentle arrival day — which is this itinerary. Three days works if the trip is really about Disney; six or more lets you do both Disney parks, which need a ticket each.",
  },
  {
    q: "Is Tokyo Disneyland or DisneySea better for young kids?",
    a: `For preschool and early-elementary children, Disneyland is the usual pick: it is built around the classic Fantasyland rides, characters and parades. DisneySea is themed around ports of call and suits older children and adults more. Each is a separate 1-Day Passport — from ¥8,900 for an adult, ¥7,400 for ages 12–17 and ¥5,300 for ages 4–11 by the resort's own published minimums, with children 3 and under free (read ${DISNEY_CHECKED}).`,
  },
  {
    q: "Are Tokyo trains stroller friendly?",
    a: `Mostly, if you avoid the rush. Tokyo Metro states it is working to make its stations stroller friendly so a stroller can reach the platform from the entrance without stairs, and asks stroller users to keep the brakes on and hold the handle on board. Each station's barrier-free page shows where the lifts are. Avoid weekday commuting hours, and expect steps at temples and in Hakone. Read ${CHECKED}.`,
  },
  {
    q: "Where should families stay in Tokyo?",
    a: "Tokyo Station for the fewest changes — the airport trains and buses, the Keiyo Line to Disney and the JR line to Kamakura all start there. Maihama or Urayasu for a night or two around the Disney day, if your children need a nap break. Shinjuku if Sanrio Puroland and Hakone are both on the list, because the Keio and Odakyu lines start there.",
  },
  {
    q: "Do kids need a ticket on Tokyo trains?",
    a: `Under-6s ride free on Tokyo Metro and JR East — up to two per paying adult — and 6 to 11-year-olds pay half. A third preschooler with one adult needs a child ticket, and on JR a preschooler taking their own reserved seat (on the N'EX, for example) needs one too. Read on the operators' own pages, ${CHECKED}.`,
  },
  {
    q: "Is a JR Pass worth it for Tokyo with kids?",
    a: `No, not for this route. Since the 1 October 2026 revision the 7-day Ordinary pass is ¥53,000 for an adult and ¥27,000 for a child (read ${JRPASS_CHECKED}), and the only JR legs here are the airport train, the Keiyo Line to Maihama and the Yokosuka Line to Kamakura — a few thousand yen. The pass starts to pay when you add a shinkansen trip to Kyoto or Osaka.`,
  },
  {
    q: "What can we do in Tokyo with kids on a rainy day?",
    a: "Swap in the two indoor days: LEGOLAND Discovery Center in Odaiba and Sanrio Puroland at Tama Center are both inside buildings. Disney is mostly outdoors, so if you have not yet bought the Disney date, check the forecast before you choose it — a date-specified passport cannot be refunded for a change of plan.",
  },
  {
    q: "Does the Tokyo Subway Ticket work for this itinerary?",
    a: `For the city half of it. The ${SUBWAY.adult} 24-hour ticket (${SUBWAY.child} for a child; 48 and 72-hour versions too) covers Tokyo Metro and Toei only — not JR, not the Yurikamome or Rinkai lines to Odaiba, and not the Keio or Odakyu lines to Tama Center or Hakone. Carried from our subway ticket guide, read ${checkedLabel(SUBWAY.checked)}.`,
  },
];

const TITLE = "Tokyo Itinerary with Kids: 5 Days, Day by Day (2026)";
const DESCRIPTION =
  "A Tokyo itinerary with kids over 5 days: Disney, LEGOLAND Discovery, Sanrio Puroland and a day out, plus child train fares, strollers and family hotels.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const thStyle = { fontSize: "0.82rem" } as const;
const tdSmall = { fontSize: "0.86rem" } as const;
const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TokyoItineraryWithKidsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        {hreflangLinks(ROUTE)}
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }),
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
                { "@type": "ListItem", position: 4, name: "Tokyo Itinerary with Kids", item: `https://www.japan-travel-kit.com${ROUTE}` },
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
          <span className={styles.breadCurrent}>Tokyo Itinerary with Kids</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Itinerary with Kids:<br />5 Days, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            One Disney day, two indoor character days, one day out of the city — with the tickets that
            sell by date, what children pay on the trains, and where a family should sleep.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "Child fares & strollers", "Where families stay"].map((t) => (
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

        {/* Lead — the whole answer first. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Tokyo itinerary with kids</strong> works best over <strong>five days</strong>: an easy
            arrival day, <strong>Tokyo Disneyland or DisneySea</strong> on Day 2 (about 15–20 minutes from
            Tokyo Station on the JR Keiyo Line), <strong>LEGOLAND Discovery Center</strong> in Odaiba on Day 3
            (2–3 hours), <strong>Sanrio Puroland</strong> at Tama Center on Day 4 (3–5 hours), and a day out to
            Kamakura (about an hour by JR) or Hakone on Day 5. Book Disney first — dates open two months ahead
            at 14:00 Japan time and are not sold at the gate — then Puroland and LEGOLAND, which both price by
            date. Under-6s ride Tokyo Metro and JR free (up to two per adult) and 6 to 11-year-olds pay half.
            Base yourselves at Tokyo Station, with a night in Maihama if your children need a nap break on the
            Disney day. Child fares read on {CHECKED}; ticket prices carried with their own check dates below.
          </p>
        </section>

        {/* Quick answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>How long</p>
                <p className={styles.verdictStatValue}>4–5 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book first</p>
                <p className={styles.verdictStatValue}>Disney — 2 months ahead</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kids on trains</p>
                <p className={styles.verdictStatValue}>Under 6 free · 6–11 half</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Base</p>
                <p className={styles.verdictStatValue}>Tokyo Station (+ Maihama)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> lock in the Disney date the day it opens, put the two indoor days where
              the forecast is worst, and keep Day 1 for nothing but the hotel.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoDisneyOneDayPassport.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Disney tickets on Klook →
              </KlookLink>
              <GygCompareButton slug={SLUG} listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>

        {/* Overview table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The plan</span>
          <h2 className={styles.sectionTitle}>What Does a 5-Day Tokyo Itinerary with Kids Look Like?</h2>
          <p className={styles.bodyText}>
            One big day, two indoor days, one day out and an arrival day — so no two long days sit back to back,
            and the indoor days can move if it rains.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Where", "What needs booking"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={styles.tdProvider}>Day 1</td><td style={tdSmall}>Arrive; hotel; short walk</td><td style={tdSmall}>Airport transfer (optional)</td></tr>
                  <tr><td className={styles.tdProvider}>Day 2</td><td style={tdSmall}>Tokyo Disneyland or DisneySea</td><td style={tdSmall}>1-Day Passport — two months ahead</td></tr>
                  <tr><td className={styles.tdProvider}>Day 3</td><td style={tdSmall}>Odaiba — LEGOLAND Discovery Center (indoor)</td><td style={tdSmall}>Dated online ticket</td></tr>
                  <tr><td className={styles.tdProvider}>Day 4</td><td style={tdSmall}>Tama Center — Sanrio Puroland (indoor)</td><td style={tdSmall}>Dated passport + arrival reservation</td></tr>
                  <tr><td className={styles.tdProvider}>Day 5</td><td style={tdSmall}>Kamakura or Hakone</td><td style={tdSmall}>Nothing for Kamakura; Freepass or a tour for Hakone</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Day by day */}
        {days.map((day) => (
          <section key={day.id} id={day.id} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{day.id.replace("day-", "Day ")}</span>
            <h2 className={styles.sectionTitle}>{day.title}</h2>
            <p className={styles.bodyText}>{day.lead}</p>
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["When", "Plan", "Time", "Getting there", "Book ahead?", "Stroller"].map((h) => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {day.rows.map((row) => (
                      <tr key={row.when}>
                        <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.when}</td>
                        <td style={tdSmall}>{row.plan}</td>
                        <td style={tdSmall}>{row.time}</td>
                        <td style={tdSmall}>{row.move}</td>
                        <td style={tdSmall}>{row.book}</td>
                        <td style={tdSmall}>{row.stroller}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
              <strong>Book for this day:</strong>
            </p>
            <div className={styles.pickCtaRow}>
              {day.book.map((item) => (
                <KlookLink key={item.url} href={item.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                  {item.label} →
                </KlookLink>
              ))}
            </div>
            {day.id === "day-1" && (
              <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Airport fares and times are the operators&apos; own (Keikyu, Tokyo Monorail, JR East, Airport
                Limousine), carried from our{" "}
                <Link href="/guides/transport/tokyo-airport-transfer" style={{ color: "var(--text)", fontWeight: 600 }}>
                  Tokyo airport transfer guide
                </Link>{" "}
                and read on {AIRPORT_CHECKED}.
              </p>
            )}
            {day.id === "day-2" && (
              <>
                <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Prices and sales rules are Tokyo Disney Resort&apos;s own, carried from our{" "}
                  <Link href="/guides/attractions/tokyo-disney-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
                    Tokyo Disney tickets guide
                  </Link>{" "}
                  (read {DISNEY_CHECKED}). Stroller rental read on the resort&apos;s own pages on {CHECKED}.
                </p>
                <KlookTripPrep
                  label="Book for the same day"
                  heading="What to Book Alongside Your Disney Ticket"
                  intro="The park ticket is one booking; the day around it — a bed close to the gate, the ride in from the airport, data for the app — is the rest."
                  items={tokyoKidsDisneyDayPrep}
                />
              </>
            )}
            {day.id === "day-3" && (
              <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                LEGOLAND Discovery Center&apos;s prices, the under-3 rule and the accompanied-adults rule are off its
                own ticket page, read {CHECKED}. Hours are set per day — the official calendar showed 09:30–19:00 and
                10:00–18:00 on consecutive days that week — and the 4D Cinema is closed for maintenance from 30
                November to 4 December 2026.
              </p>
            )}
            {day.id === "day-4" && (
              <>
                <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Passport range from puroland.jp, carried from our{" "}
                  <Link href="/guides/attractions/sanrio-puroland-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
                    Sanrio Puroland tickets guide
                  </Link>{" "}
                  (read {checkedLabel(SANRIO.checked)}). Stroller rules from the park&apos;s own baby-guide and FAQ
                  pages, read {CHECKED}.
                </p>
                <KlookTripPrep
                  label="Book for the same day"
                  heading="What Else to Book for the Odaiba and Sanrio Days"
                  intro="The two indoor days need a ticket each, and around them the same three things: getting across the city, a seated half-day for the children who are done walking, and data for the e-tickets."
                  items={tokyoKidsCityDayPrep}
                />
              </>
            )}
            {day.id === "day-5" && (
              <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Kotoku-in is {KOTOKUIN.adult} for an adult and {KOTOKUIN.child} for ages 6–12 (read{" "}
                {checkedLabel(KOTOKUIN.checked)}). The Hakone Freepass from Shinjuku is {HAKONE.adult} adult and{" "}
                {HAKONE.child} child for two days, and the Romancecar adds ¥1,200 adult and ¥600 child from
                Shinjuku to Hakone-Yumoto (Odakyu, read {checkedLabel(HAKONE.checked)}). Both days are covered in our{" "}
                <Link href="/guides/attractions/kamakura-day-trip" style={{ color: "var(--text)", fontWeight: 600 }}>Kamakura</Link>{" "}
                and{" "}
                <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>Hakone</Link>{" "}
                day-trip guides.
              </p>
            )}
          </section>
        ))}

        {/* Booking timing — what AI answers do not finish */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Before you fly</span>
          <h2 className={styles.sectionTitle}>What Should You Book Before You Go, and When?</h2>
          <p className={styles.bodyText}>
            Three tickets on this route are sold by date, and one of them can sell out completely. In order:
            Disney the day your date opens, then Puroland and LEGOLAND once the Disney day is fixed, then the
            hotels around them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Booking", "When it opens", "What can go wrong", "Official price"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={tdSmall}>{row.opens}</td>
                      <td style={tdSmall}>{row.risk}</td>
                      <td className={styles.tdPrice} style={tdSmall}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Disney read {DISNEY_CHECKED}; Puroland {checkedLabel(SANRIO.checked)}; LEGOLAND Discovery Center {CHECKED}.
            Prices change by date — confirm at checkout.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={tokyoDisneyOneDayPassport.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Disney 1-Day Passport on Klook →
            </KlookLink>
            <KlookLink href={sanrioPurolandTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Sanrio Puroland on Klook →
            </KlookLink>
            <KlookLink href={legolandDiscoveryCenterTokyoTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              LEGOLAND Discovery Center on Klook →
            </KlookLink>
          </div>
        </section>

        {/* How many days */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Trip length</span>
          <h2 className={styles.sectionTitle}>How Many Days in Tokyo with Kids?</h2>
          <p className={styles.bodyText}>
            Four to five. Fewer than four turns the trip into Disney plus jet lag; more than five is where the
            second Disney park, or a second day out, starts to make sense. With older children who have read
            the books, a sixth day can be the{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets">Harry Potter studio tour in Nerima</Link>{" "}
            — indoors, three to four hours, free for ages 3 and under, with a junior rate for 12–17 and a child
            rate for 4–11 on the official price list.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip length", "Keep", "Drop"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lengthRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.days}</td>
                      <td style={tdSmall}>{row.keep}</td>
                      <td style={tdSmall}>{row.lose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Disneyland vs DisneySea */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which park</span>
          <h2 className={styles.sectionTitle}>Is Tokyo Disneyland or DisneySea Better for Young Kids?</h2>
          <p className={styles.bodyText}>
            Disneyland, for most families with preschool and early-elementary children — it is the park built
            around Fantasyland, the characters and the parades. DisneySea is themed around ports of call and
            leans towards older children and adults. You cannot do both on one ticket: each park is its own
            date-specified passport, and the resort&apos;s FAQ says the one-day Park Hopper is not currently on
            sale (read {DISNEY_CHECKED}). If you want both, it is two days — the six-day version of this plan.
          </p>
        </section>

        {/* Child fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Child fares</span>
          <h2 className={styles.sectionTitle}>Do Kids Need a Ticket on Tokyo Trains?</h2>
          <p className={styles.bodyText}>
            Not under 6 — up to two per paying adult ride free on Tokyo Metro and JR East — and 6 to 11-year-olds
            pay half. The exceptions are a third preschooler with one adult, and on JR a preschooler taking their
            own reserved seat, such as on the N&apos;EX from Narita.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Age", "Tokyo Metro", "JR East"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={tdSmall}>{row.metro}</td>
                      <td style={tdSmall}>{row.jr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tokyo Metro&apos;s fare-age page and JR East&apos;s N&apos;EX ticket page, read {CHECKED}. Tokyo Metro
            rounds a child fare up to the nearest ¥10 on a paper ticket and down to the nearest ¥1 on an IC card.
          </p>
        </section>

        {/* Strollers */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Strollers</span>
          <h2 className={styles.sectionTitle}>Are Tokyo Trains Stroller Friendly?</h2>
          <p className={styles.bodyText}>
            Mostly yes, outside the rush. Tokyo Metro states it is working to make its stations stroller friendly
            so a stroller can get from the entrance to the platform without stairs, and asks stroller users to
            keep the brakes on and hold the handle on board; each station&apos;s barrier-free page shows the lifts
            (read {CHECKED}). The pinch points on this route are elsewhere: Sanrio Puroland bans strollers on its
            first two floors on busy days, Disney&apos;s own rental is listed as suspended on some of its pages, and
            Kamakura&apos;s temples and the Hakone transfers involve steps. A lightweight folding stroller and a
            carrier between them cover every day here.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should Families Stay in Tokyo?</h2>
          <p className={styles.bodyText}>
            Tokyo Station, for the fewest changes with children and luggage: the N&apos;EX and the limousine buses
            from both airports arrive there, the Keiyo Line leaves from it for Maihama, and the Yokosuka Line for
            Kamakura. Add one or two nights in Maihama around the Disney day if your children still nap. Choose
            Shinjuku instead if Sanrio Puroland and Hakone are both in the plan.
          </p>
        </section>
        <KlookStayAreas
          heading="Hotels for a Family Trip to Tokyo"
          intro="Four bases, each tied to a day in this itinerary — not a ranking of neighbourhoods. Klook's hotel search for each area opens with your dates."
          areas={tokyoKidsStayAreas}
        />

        {/* JR Pass / long-distance */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Long-distance</span>
          <h2 className={styles.sectionTitle}>Do You Need a JR Pass for Tokyo with Kids?</h2>
          <p className={styles.bodyText}>
            No. Since the 1 October 2026 revision the 7-day Ordinary JAPAN RAIL PASS is ¥53,000 for an adult and
            ¥27,000 for a child, the 14-day ¥84,000 and the 21-day ¥105,000 (JR Group, read {JRPASS_CHECKED}). The JR
            legs on this route — the N&apos;EX, the Keiyo Line to Maihama and the Yokosuka Line to Kamakura — come
            nowhere near that. The Hakone option is on Odakyu, which no JR Pass covers. A pass starts to pay only
            when you add a shinkansen to Kyoto or Osaka; our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>JR Pass guide</Link> has the
            break-even calculator.
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
          heading="Day Tours for the Fifth Day"
          intro="If the trains to Hakone or Fuji sound like hard work with children, these are the coach versions — one seat each, one booking, back in Tokyo the same evening."
          tours={[hakoneLoopBusTour, fujiHakoneDayTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/tokyo-disney-tickets", title: "Tokyo Disneyland Tickets 2026: Prices, Rules & DisneySea" },
              { href: "/guides/attractions/sanrio-puroland-tickets", title: "Sanrio Puroland Tickets (2026): Prices, Variable Pricing & How to Book" },
              { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport" },
              { href: "/guides/attractions/tokyo-5-day-itinerary", title: "Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day" },
              { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary (2026): What to Book, and in What Order" },
              { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?" },
              { href: "/guides/attractions/tokyo-snow-day-trip", title: "Tokyo Snow Day Trip (2026–27): Yeti, Fujiten or Gala" },
              { href: "/guides/transport/tokyo-airport-transfer", title: "Tokyo Airport Transfer Guide (2026): Narita & Haneda to the City" },
              { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?" },
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

        {/* CTA banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the Disney day first</h2>
            <p className={styles.ctaBannerDesc}>
              Dates open two months ahead at 14:00 Japan time and are not sold at the gate. Everything else on
              this itinerary can be fitted around the day you get.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={tokyoDisneyOneDayPassport.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Disney tickets →
              </KlookLink>
              <KlookLink href={tokyoKidsStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Station hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
