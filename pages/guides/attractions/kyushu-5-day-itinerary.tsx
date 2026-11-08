import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  asoTakachihoFukuokaTour,
  dazaifuYanagawaDayTour,
  fukuokaStayAreas,
  jrKyushuRailPass,
  klookEsim,
  kumamotoCastleHotels,
  kumamotoCastleTakachihoTour,
  kumamotoTakachihoRailwayTour,
  kyushuItineraryTripPrep,
  nagasakiInasayamaDayTour,
  nagasakiSmallGroupDayTour,
  oneStationHotelKumamoto,
  takachihoAsoBeefLunchTour,
  yufuinBeppuNoMoriTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * Five days in northern Kyushu, based in Fukuoka. Added 7 Nov 2026.
 *
 * Read on 7 November 2026:
 *
 *   jrkyushu.co.jp                Rail pass prices, coverage and seat limits. Hakata–Kumamoto
 *                                 shortest 32 min, ¥5,310 undiscounted, online ¥3,900–¥4,800.
 *                                 Hakata–Yufuin ¥6,130, online ¥5,600, on sale one month ahead
 *                                 at 10:00. Hakata–Nagasaki shortest 1 h 20, online from ¥3,400.
 *                                 Aso Boy timetable as of January 2026.
 *   aso-volcano.jp                Level 2 since 1 Sep 2026, about 1 km off-limits, summit plaza
 *                                 access from 2 Sep. That is the latest update on the page.
 *   castle.kumamoto-guide.jp      Hours, fees, gates, shuttle
 *   kumamoto-guide.jp             Tram flat fare ¥200 / ¥100
 *   takachiho-kanko.info          Boat booking rules, status at 10:11 on 7 Nov, buses
 *   city.nagasaki.lg.jp           Museum hours, ¥200, about an hour (page dated 11 Nov 2024)
 *   dazaifu.org                   Times from Hakata, Tenjin and the airport
 *   gofukuoka.jp                  Yatai from 18:00, over 100 stalls
 *
 * Read on 6 November 2026 and reused from yufuin-beppu-tour-from-fukuoka: Yufuin no Mori
 * and Sonic times, online Sonic fare from ¥2,950, the Beppu hells ticket.
 *
 * Gaps left open on purpose: the undiscounted Hakata–Beppu and Hakata–Nagasaki fares were
 * only on private sites, so the pass table uses the cheapest official online fare and says
 * "or more". The Kumamoto tram time and Glover Garden's hours and fee were not readable on
 * an official page, so the page prints none. A Klook listing says the Nagasaki museum shuts
 * on Mondays; the city's page does not, so that is left out. Tour rows come from the
 * www.klook.com search index because Klook answers automated reads with HTTP 403. No Klook
 * price appears.
 */

const OWN = checkedLabel("2026-11-07");
const PREV = checkedLabel("2026-11-06");

type DayRow = { when: string; plan: string; time: string; move: string; book: string };
type DayCta = { href: string; label: string };
type DayPlan = {
  label: string;
  heading: string;
  answer: string;
  rows: DayRow[];
  note?: string;
  ctas: DayCta[];
};

const days: DayPlan[] = [
  {
    label: "Day 1",
    heading: "Day 1: What Should You Do in Fukuoka?",
    answer:
      "Stay around Hakata and Tenjin, then eat at a yatai. There is nothing to book for the stalls, so this is the easy day after a flight.",
    rows: [
      {
        when: "Morning",
        plan: "Arrive and leave your bags at a Hakata Station hotel",
        time: "Depends on your flight",
        move: "Subway Airport Line to Hakata",
        book: "Hotel",
      },
      {
        when: "Afternoon",
        plan: "Tenjin, or teamLab Forest Fukuoka if you want a ticketed stop",
        time: "About an hour inside teamLab",
        move: "Subway to Tojinmachi, then 15 minutes on foot or a bus",
        book: "teamLab slot only",
      },
      {
        when: "Night",
        plan: "Yatai food stalls, over 100 across the city",
        time: "From 18:00. Keep it short, because seats are limited",
        move: "Walk from Tenjin or take the subway",
        book: "Nothing. A stall may stay shut in a storm",
      },
    ],
    ctas: [
      { href: fukuokaStayAreas[1].url, label: "Hotels at Hakata Station →" },
      { href: klookEsim.url, label: "Klook Japan eSIM →" },
    ],
  },
  {
    label: "Day 2",
    heading: "Day 2: Should You Take a Tour or the Train to Yufuin and Beppu?",
    answer:
      "Take a tour if you want both towns in one day. Take the train if the Yufuin no Mori is the point, or if you are buying the rail pass.",
    rows: [
      {
        when: "Morning",
        plan: "Tour leaves Fukuoka, or the Yufuin no Mori leaves Hakata",
        time: "Train 2 hours 12 to 2 hours 21 minutes to Yufuin",
        move: "Coach, or limited express",
        book: "Tour, or a reserved seat. All seats are reserved",
      },
      {
        when: "Afternoon",
        plan: "Yufuin town and Kinrin Lake, then the Beppu hells",
        time: "Hells open 8:00 to 17:00. Common ticket ¥2,400",
        move: "Included on a tour. By train it needs a cross-country leg",
        book: "Check whether your tour covers the hells",
      },
      {
        when: "Night",
        plan: "Back to Hakata",
        time: "Tour total 10 to 10.5 hours. Sonic from the Beppu line shortest 2 hours 1 minute",
        move: "Coach, or limited express Sonic",
        book: "Second night in Fukuoka",
      },
    ],
    note: `Tour lengths, train times and the hells ticket read ${PREV}. Our Yufuin and Beppu tour guide compares six listings.`,
    ctas: [
      { href: yufuinBeppuNoMoriTour.url, label: "Yufuin & Beppu tour →" },
      { href: jrKyushuRailPass.url, label: "JR Kyushu Rail Pass →" },
    ],
  },
  {
    label: "Day 3",
    heading: "Day 3: How Long Do You Need at Kumamoto Castle?",
    answer:
      "Allow the afternoon. The castle's site gives no visit length, only a warning to leave time for ticket queues. Last admission is 16:00, and the shinkansen from Hakata takes as little as 32 minutes, so you do not need an early start.",
    rows: [
      {
        when: "Morning",
        plan: "Shinkansen from Hakata to Kumamoto, then bags to your hotel",
        time: "Shortest 32 minutes. Over 50 trains a day each way",
        move: "Kyushu Shinkansen",
        book: "Online fare needs 7 days' notice",
      },
      {
        when: "Afternoon",
        plan: "Kumamoto Castle, then Sakura-no-Baba Josaien",
        time: "Open 9:00 to 17:00. Last admission 16:00, last tower entry 16:30",
        move: "City tram, flat ¥200. Free shuttle from Josaien to the South Gate, every 10 to 15 minutes",
        book: "Advance tickets are sold online. Adults ¥800, pupils ¥300",
      },
      {
        when: "Night",
        plan: "One night in Kumamoto",
        time: "Early night for an 08:00 tour",
        move: "Tram or on foot",
        book: "Kumamoto hotel",
      },
    ],
    note: `Weekdays use the South Gate only; weekends and holidays open the North Gate as well. Wheeled bags are not allowed in the tower, and the ticketed area has no lockers. Closed 29 December. Read ${OWN} from the castle's own site and Kumamoto City.`,
    ctas: [
      { href: oneStationHotelKumamoto.url, label: "ONE STATION HOTEL KUMAMOTO →" },
      { href: kumamotoCastleHotels.url, label: "Hotels near Kumamoto Castle →" },
    ],
  },
  {
    label: "Day 4",
    heading: "Day 4: Can You Do Aso and Takachiho in One Day?",
    answer:
      "Yes, on a tour of about 9.5 to 10.5 hours. On your own it does not work as a day trip, because the buses are too few.",
    rows: [
      {
        when: "Morning",
        plan: "Tour leaves Kumamoto at 08:00, or Fukuoka at 07:50",
        time: "9.5 to 10.5 hours in total, by listing",
        move: "Coach",
        book: "Tour",
      },
      {
        when: "Afternoon",
        plan: "Takachiho Gorge and the Aso grasslands",
        time: "About 40 minutes on foot from the car park to the gorge and back, on one listing",
        move: "Included",
        book: "Boat, if not in your package. Online only",
      },
      {
        when: "Night",
        plan: "Shinkansen back to Hakata",
        time: "Tour ends about 17:30. Shortest 32 minutes",
        move: "Kyushu Shinkansen",
        book: "Third night in Fukuoka",
      },
    ],
    note: `Tour times are from Klook listings read ${OWN}. Listings warn of a lot of walking and stairs at the gorge.`,
    ctas: [
      { href: kumamotoTakachihoRailwayTour.url, label: "Tour from Kumamoto →" },
      { href: asoTakachihoFukuokaTour.url, label: "Tour from Fukuoka →" },
    ],
  },
  {
    label: "Day 5",
    heading: "Day 5: Should You Choose Nagasaki or Dazaifu?",
    answer:
      "Choose Nagasaki if your flight is late or you add a night. Choose Dazaifu if you fly home on Day 5, because it is on the way to the airport.",
    rows: [
      {
        when: "Nagasaki: morning",
        plan: "Train from Hakata, or the 8:00 small-group tour",
        time: "Shortest 1 hour 20 minutes",
        move: "Relay Kamome and Nishi Kyushu Shinkansen",
        book: "Online fare from ¥3,400, or the tour",
      },
      {
        when: "Nagasaki: afternoon",
        plan: "Atomic Bomb Museum and the Peace Park, then Glover Garden",
        time: "Museum about 1 hour, 8:30 to 17:30, last entry 17:00. ¥200",
        move: "City tram",
        book: "Nothing for the museum",
      },
      {
        when: "Dazaifu: morning",
        plan: "Dazaifu Tenmangu from Hakata",
        time: "About 45 minutes from Hakata, about 30 from Tenjin",
        move: "Subway and Nishitetsu, or the Tabibito bus",
        book: "Nothing",
      },
      {
        when: "Dazaifu: afternoon",
        plan: "On to Fukuoka Airport",
        time: "About 25 minutes by bus to the international terminal, about 50 by train",
        move: "Tabibito bus, or Nishitetsu and subway",
        book: "Your flight",
      },
    ],
    note: `Museum hours are for April and September to March; it shuts 29 to 31 December. Read ${OWN} from Nagasaki City and dazaifu.org. Check Glover Garden's own site for its hours, which change by season.`,
    ctas: [
      { href: nagasakiSmallGroupDayTour.url, label: "Nagasaki day trip →" },
      { href: dazaifuYanagawaDayTour.url, label: "Dazaifu & Yanagawa day →" },
    ],
  },
];

const passRows = [
  {
    plan: "Tours on Days 2 and 4, Kumamoto by train, Dazaifu on Day 5",
    standard: "¥10,620",
    cheapest: "¥7,800",
    verdict: "Single tickets win. No pass",
  },
  {
    plan: "Tours on Days 2 and 4, Kumamoto and Nagasaki by train",
    standard: "¥17,420 or more",
    cheapest: "¥14,600",
    verdict: "Close. The 5-day pass only helps if you cannot book ahead",
  },
  {
    plan: "Yufuin no Mori both ways on Day 2, Kumamoto by train, tour on Day 4",
    standard: "¥22,880",
    cheapest: "¥19,000",
    verdict: "3-day pass at ¥15,000 wins, used on Days 2 to 4",
  },
  {
    plan: "Yufuin no Mori out, Sonic back from Beppu, Kumamoto and Nagasaki by train",
    standard: "¥26,500 or more",
    cheapest: "¥23,150",
    verdict: "5-day pass at ¥17,000 wins",
  },
];

const fareRows = [
  { route: "Hakata ↔ Kumamoto", time: "Shortest 32 minutes", regular: "¥5,310", online: "¥3,900 to ¥4,800, 7 days ahead" },
  { route: "Hakata ↔ Yufuin", time: "2 hours 12 to 2 hours 21 minutes", regular: "¥6,130", online: "¥5,600" },
  { route: "Hakata ↔ Oita and Beppu line", time: "Shortest 2 hours 1 minute", regular: "Not readable on JR Kyushu's site", online: "From ¥2,950, 3 days ahead" },
  { route: "Hakata ↔ Nagasaki", time: "Shortest 1 hour 20 minutes", regular: "Not readable on JR Kyushu's site", online: "From ¥3,400" },
];

const passPriceRows = [
  { pass: "Northern Kyushu", days3: "¥15,000", days5: "¥17,000", days7: "Not sold", seats: "Up to 6 free" },
  { pass: "All Kyushu", days3: "¥22,000", days5: "¥24,000", days7: "¥26,000", seats: "Unlimited free" },
  { pass: "Southern Kyushu", days3: "¥12,000", days5: "Not sold", days7: "Not sold", seats: "Up to 6 free" },
];

const tourRows = [
  {
    tour: kumamotoTakachihoRailwayTour,
    name: "Takachiho Gorge & Minamiaso Railway",
    from: "Kumamoto",
    time: "9.5 hours, 08:00 to 17:30",
    note: "Fits a night in Kumamoto. Minami Aso Railway fares are extra. The Australian site says to pick a departure city at checkout",
  },
  {
    tour: asoTakachihoFukuokaTour,
    name: "Mt. Aso & Takachiho Gorge",
    from: "Fukuoka",
    time: "10.2 hours, 07:50 to 18:00",
    note: "No meals. Kusasenri replaces the crater while it is closed. The URL and some Klook sites name Kumamoto Castle, so check the stops",
  },
  {
    tour: takachihoAsoBeefLunchTour,
    name: "Takachiho, Aso & Kusasenri with beef lunch",
    from: "Fukuoka",
    time: "About 9.5 to 10.5 hours",
    note: "Lunch on the route, boat optional. The title says Miyazaki and Kumamoto, but Fukuoka is the departure shown",
  },
  {
    tour: kumamotoCastleTakachihoTour,
    name: "Kumamoto Castle, Josaien & Takachiho",
    from: "Fukuoka",
    time: "10.5 hours",
    note: "Other Klook sites name the Takachiho Railway and Amano Iwato instead of the castle. From 1 December to 28 February the train is swapped for Dazaifu",
  },
];

const stayRows = [
  {
    nights: "Nights 1 and 2",
    base: "Hakata Station, Fukuoka",
    why: "The shinkansen, the Sonic and the Yufuin no Mori all leave from here",
    href: fukuokaStayAreas[1].url,
    cta: "Hakata hotels",
  },
  {
    nights: "Night 3",
    base: "Kumamoto Station",
    why: "One night saves a trip back to Fukuoka before the 08:00 tour. ONE STATION HOTEL is listed as adjacent to the station",
    href: oneStationHotelKumamoto.url,
    cta: "ONE STATION HOTEL",
  },
  {
    nights: "Night 3, other option",
    base: "Kumamoto Castle area",
    why: "Closer to the castle and the evening in town, further from the train",
    href: kumamotoCastleHotels.url,
    cta: "Hotels near the castle",
  },
  {
    nights: "Night 4",
    base: "Hakata or Tenjin",
    why: "Hakata for a Nagasaki morning. Tenjin is about 30 minutes from Dazaifu if that is your Day 5",
    href: fukuokaStayAreas[2].url,
    cta: "Tenjin hotels",
  },
];

const prepRows = [
  {
    item: "Yufuin no Mori seat",
    when: "On sale one month before travel, at 10:00",
    why: "All seats are reserved, none can be reserved on board, and JR Kyushu says seats are often full",
  },
  {
    item: "Takachiho Gorge boat",
    when: "Online from 9:00 two weeks before, until 9:00 two days before",
    why: "No phone bookings and no waiting list. The boats for 7 to 9 November had no same-day tickets when the page was checked",
  },
  {
    item: "Hakata–Kumamoto online fare",
    when: "At least 7 days ahead",
    why: "The ¥3,900 to ¥4,800 fare is limited and priced by train",
  },
  {
    item: "Sonic online fare",
    when: "At least 3 days ahead",
    why: "This is the fare that starts at ¥2,950",
  },
  {
    item: "Day 2 and Day 4 tours",
    when: "Once your dates are fixed",
    why: "Sell-out dates are per tour. Tours can miss their minimum, and related listings confirm any typhoon or heavy snow cancellation by 18:00 the day before",
  },
  {
    item: "Kumamoto hotel",
    when: "Before the tour",
    why: "The hotel decides which departure works, so settle both together",
  },
];

const faqItems = [
  {
    q: "Is 5 days enough for Kyushu?",
    a: `Yes, for the northern half: Fukuoka, Beppu, Yufuin, Kumamoto, Aso, Takachiho and either Nagasaki or Dazaifu. It is not enough to add Kagoshima or Miyazaki at a sensible pace. Two of the five days are coach days of about 10 hours, so expect a full trip rather than a slow one.`,
  },
  {
    q: "Is the JR Kyushu Rail Pass worth it for 5 days?",
    a: `It depends on how many days you ride. The Northern Kyushu 5-day pass is ¥17,000. If tours cover Days 2 and 4, you only ride to Kumamoto and perhaps Nagasaki, and single tickets of ¥7,800 to ¥14,600 at the cheapest online fares win or come close. If you take the train to Yufuin as well, the pass wins. Prices read ${OWN} from JR Kyushu.`,
  },
  {
    q: "Should I take a tour or the train to Yufuin and Beppu?",
    a: `Take a tour for both towns in one day: 10 to 10.5 hours with no connections. Take the train if the Yufuin no Mori is the point, or for Yufuin alone. It takes 2 hours 12 to 2 hours 21 minutes from Hakata, all seats are reserved, and it runs only on the days of JR Kyushu's calendar. Read ${PREV} and ${OWN}.`,
  },
  {
    q: "Where should I stay in Kyushu for 5 days?",
    a: "Fukuoka for three nights and Kumamoto for one. Hakata Station is the best base because the shinkansen and the limited expresses all start there. Sleep in Kumamoto on Day 3 for an 08:00 tour on Day 4. If you would rather not move hotel, stay four nights in Fukuoka and take a tour from there.",
  },
  {
    q: "Can you do Takachiho as a day trip?",
    a: `Yes, by tour. Klook's day tours take about 9.5 to 10.5 hours from Kumamoto or Fukuoka. By public transport it is not practical. Takachiho's own access page lists 4 buses a day from Fukuoka Airport, about 3 hours 30 minutes, and one a day from Kumamoto Station, about 3 hours, all needing a reservation, and no train. Read ${OWN}.`,
  },
  {
    q: "Can you visit the Aso crater?",
    a: `Plan on not reaching it. aso-volcano.jp showed Level 2 at its latest update, on 1 September 2026, with the area within about 1 km of the crater off-limits and the summit plaza reopening on 2 September. Klook listings say the crater is closed and swap in Kusasenri or Kamishikimi Kumanoimasu Shrine. Check the official site on the day. Read ${OWN}.`,
  },
  {
    q: "What is the best season to visit Kyushu?",
    a: `Autumn, for colour at Kinrin Lake in November, but it is also when the Takachiho boats sell out: 7 to 9 November had no same-day tickets. In winter, one Takachiho tour drops its train from 1 December to 28 February, and heavy snow can cancel tours. Avoid the June rainy season and typhoons if you can, because the boats and coach days depend on the weather.`,
  },
  {
    q: "Do you need a car for this itinerary?",
    a: "No. Tours cover the two days that are hard without one, and the train covers the rest. A car only helps if you want your own stops around Aso, or a group makes it cheaper.",
  },
  {
    q: "What happens if it rains?",
    a: "Check each stop on the morning. The Takachiho boats can stop for high water, Kumamoto Castle may close in severe weather, and a yatai may not open in a storm. Nagasaki's museum is your indoor option. Several tour listings say they run as planned and give no refund if the scenery disappoints.",
  },
  {
    q: "Can you do this itinerary with children?",
    a: "Yes, but Days 2 and 4 are about 10 hours each, mostly on a coach, and listings warn of many stairs at the gorge. Kumamoto Castle is ¥300 for elementary and junior high pupils and free under 6. The rail pass is half price for ages 6 to 11. Check each tour's child rule, because the age bands are not listed here.",
  },
  {
    q: "What should you wear at Takachiho?",
    a: "Shoes you can climb stairs in. One listing puts the walk from the car park to the gorge and back at about 40 minutes, with a lot of walking and stairs, and advises against the tour for elderly travelers, pregnant women and people with heart or leg conditions.",
  },
];

const TITLE = "Kyushu 5 Day Itinerary (2026): Route, Rail Pass & Tours";
const H1_LINE = "Kyushu 5 Day Itinerary (2026):";
const DESCRIPTION =
  "Kyushu 5 Day Itinerary: Fukuoka, Beppu, Kumamoto and Takachiho. This Kyushu itinerary 5 days plan has day tables, rail pass maths, hotels and sale dates.";

const ROUTE = "/guides/attractions/kyushu-5-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/yufuin-beppu-tour-from-fukuoka", title: "Yufuin and Beppu Tour from Fukuoka (2026): Tours vs Train" },
  { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking" },
  { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?" },
  { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
  { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day" },
];

const smallNote = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" };

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function Kyushu5DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kyushu 5 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Kyushu 5 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE}<br />Fukuoka, Beppu, Kumamoto and Takachiho
          </h1>
          <p className={styles.heroSubtitle}>
            Northern Kyushu from one main base, with one night away. The real choices are which days go by tour,
            and whether the rail pass then pays.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares & times, dated", "Rail pass worked out", "What to book first"].map((t) => (
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

        {/* Lead paragraph: the whole answer, in the body rather than the hero. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Kyushu 5 Day Itinerary</strong> works best from Fukuoka: Hakata and Tenjin on Day 1, Beppu and
            Yufuin on Day 2 (<strong>10 to 10.5 hours</strong> by tour), Kumamoto Castle on Day 3 (as little as{" "}
            <strong>32 minutes</strong> by shinkansen), Aso and Takachiho on Day 4, and Nagasaki or Dazaifu on Day 5.
            The JR Kyushu Northern pass costs <strong>¥17,000 for 5 days</strong>. It pays if you ride to Yufuin and
            Kumamoto by train, and not if tours cover Days 2 and 4. Takachiho has too few buses for a day trip on your
            own, so a tour is the realistic way there. Read {OWN} from JR Kyushu and the official sites named below.
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
                <p className={styles.verdictStatLabel}>Where to sleep</p>
                <p className={styles.verdictStatValue}>Fukuoka 3 nights, Kumamoto 1</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Northern Kyushu pass</p>
                <p className={styles.verdictStatValue}>¥15,000 for 3 days, ¥17,000 for 5</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Takachiho</p>
                <p className={styles.verdictStatValue}>Tour of 9.5 to 10.5 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Aso crater</p>
                <p className={styles.verdictStatValue}>Plan on not reaching it</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book the Takachiho tour first, because it decides your Kumamoto night. Then
              choose tour or train for Yufuin, and price the rail pass last.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kumamotoTakachihoRailwayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Takachiho Tour From Kumamoto →
              </KlookLink>
              <KlookLink href={yufuinBeppuNoMoriTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Yufuin &amp; Beppu Tour →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Enough time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The route</span>
          <h2 className={styles.sectionTitle}>Is 5 Days Enough for Kyushu?</h2>
          <p className={styles.bodyText}>
            Yes, for the northern half of the island. This route has one change of hotel and two long tour days.
            Kagoshima and Miyazaki city are left out to keep that pace. If you are arriving
            from Honshu, this route joins the end of our{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14 day itinerary</Link> or{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary">10 day itinerary</Link>, after{" "}
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip">Hiroshima and Miyajima</Link>.
          </p>
        </section>

        {/* Days */}
        {days.map((day, i) => (
          <Fragment key={day.label}>
          <section className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{day.label}</span>
            <h2 className={styles.sectionTitle}>{day.heading}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{day.answer}</p>
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["When", "Plan", "Time needed", "Getting there", "Book ahead", "Checked"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {day.rows.map((row) => (
                      <tr key={row.when}>
                        <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.when}</td>
                        <td style={{ fontSize: "0.86rem" }}>{row.plan}</td>
                        <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                        <td style={{ fontSize: "0.86rem" }}>{row.move}</td>
                        <td style={{ fontSize: "0.86rem" }}>{row.book}</td>
                        <td style={{ fontSize: "0.82rem" }}>{day.label === "Day 2" ? PREV : OWN}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {day.note && <p className={styles.bodyText} style={smallNote}>{day.note}</p>}
            {day.label === "Day 1" && (
              <p className={styles.bodyText} style={smallNote}>
                Details are in our <Link href="/guides/attractions/teamlab-fukuoka-tickets">teamLab Forest Fukuoka guide</Link>.
                Yatai hours are from Fukuoka City, which says stalls open from 18:00.
              </p>
            )}
            {day.label === "Day 2" && (
              <p className={styles.bodyText} style={smallNote}>
                See the <Link href="/guides/attractions/yufuin-beppu-tour-from-fukuoka">Yufuin and Beppu tour guide</Link> before
                you choose.
              </p>
            )}
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              {day.ctas.map((cta) => (
                <KlookLink key={cta.label} href={cta.href} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                  {cta.label}
                </KlookLink>
              ))}
            </div>
          </section>
          {i === 0 && <BookingEsimCard lead="Planning the Kyushu route? Get mobile data before you land." />}
          </Fragment>
        ))}

        {/* Takachiho */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 4 tours</span>
          <h2 className={styles.sectionTitle}>Which Takachiho and Aso Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Book the Kumamoto departure if you are sleeping there on Day 3. If you stay in Fukuoka all week, pick the
            beef lunch tour for an easier day, or the 07:50 tour if you would rather choose your own lunch.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "From", "Length", "Good to know", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.tour.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.name}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={smallNote}>
            These rows summarise the listings, and not every field is shown for every tour. Listing details change by
            date. Klook&apos;s sites name some of these tours differently, so
            open the listing and confirm the stops, the meeting point and the price before you pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={takachihoAsoBeefLunchTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tour with beef lunch →
            </KlookLink>
            <KlookLink href={kumamotoCastleTakachihoTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tour with Kumamoto Castle →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Takachiho</span>
          <h2 className={styles.sectionTitle}>Can You Do Takachiho as a Day Trip?</h2>
          <p className={styles.bodyText}>
            By tour, yes. By bus, no. Takachiho&apos;s tourism association lists 4 buses a day from Fukuoka Airport,
            about 3 hours 30 minutes, and one a day from Kumamoto Station, about 3 hours. All need a reservation. Its
            access page lists no train to the town. That is why this route gives Takachiho a tour rather than a
            night, but with more time, one night there would solve it. Read {OWN}.
          </p>
          <p className={styles.bodyText}>
            The gorge boats need their own plan. They are sold online only, from 9:00 two weeks before until 9:00 two
            days before, with no phone bookings and no waiting list. If a boat matters to you, buy a tour that
            includes it. Related listings refund the boat fee if the boats stop for weather or high water.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Aso</span>
          <h2 className={styles.sectionTitle}>Can You Visit the Aso Crater?</h2>
          <p className={styles.bodyText}>
            Plan on not reaching it. The latest update on aso-volcano.jp is 1 September 2026: alert Level 2, with the
            area within about 1 km of the crater off-limits and the summit plaza reopening at 9:00 on 2 September.
            Klook listings say the crater is closed for now and swap in Kusasenri or Kamishikimi Kumanoimasu Shrine.
            Check the official site on the day, and do not book a tour for the crater alone. Read {OWN}.
          </p>
          <p className={styles.bodyText}>
            If you want Aso by train, the all-reserved Aso Boy runs from Kumamoto to Miyaji in about 1 hour 35 minutes,
            with departures at 9:57 and 13:36 on the timetable of January 2026. JR Kyushu lists Nos. 1 and 2 as cancelled
            on 14 November, so check its calendar.
          </p>
        </section>

        {/* Rail pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rail pass</span>
          <h2 className={styles.sectionTitle}>Is the JR Kyushu Rail Pass Worth It for 5 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Only if you ride most days. Book tours for Days 2 and 4 and you will not use it enough. Take the Yufuin no
            Mori and Kumamoto by train, and even the cheapest single tickets cost more than the pass. Every train in
            these tables is inside the Northern pass, so you do not need All Kyushu.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your plan", "Tickets, standard fares", "Tickets, cheapest online fares", "Verdict", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.plan}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.standard}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.cheapest}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={smallNote}>
            Adult one-way totals from the fare table below, doubled for a return. Where JR Kyushu&apos;s standard fare
            was not readable, the sum uses the cheapest online fare and says &ldquo;or more&rdquo;. The last row leaves
            out the Yufuin to Beppu leg. Cheapest fares have limited seats, so you may pay more than that column shows.
          </p>

          <div className={styles.tableWrap} style={{ marginTop: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route (adult, one way)", "Time", "Reserved seat, standard", "Cheapest online", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.regular}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.online}</td>
                      <td style={{ fontSize: "0.82rem" }}>jrkyushu.co.jp, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.tableWrap} style={{ marginTop: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass (adult)", "3 days", "5 days", "7 days", "Seat reservations", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passPriceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.days3}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.days5}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.days7}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.seats}</td>
                      <td style={{ fontSize: "0.82rem" }}>jrkyushu.co.jp, {OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Before you buy:</strong> the days must be consecutive, and the pass is for non-Japanese visitors on
            a temporary visitor stamp. Children aged 6 to 11 pay half. Free seat reservations are made at JR ticket offices
            or machines. Online seat bookings cost ¥1,000 per section, or ¥1,500 on sightseeing trains. JR Kyushu says
            its online booking site has different prices, and does not list them, so compare before you pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKyushuRailPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the JR Kyushu Rail Pass →
            </KlookLink>
          </div>
        </section>

        {/* Where to stay */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay in Kyushu for 5 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Fukuoka for three nights and Kumamoto for one. Sleep in Kumamoto on Day 3, then return to Hakata after the
            Day 4 tour. To avoid moving hotel, stay four nights in Hakata and take a Fukuoka tour on Day 4.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Night", "Base", "Why", "On Klook"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stayRows.map((row) => (
                    <tr key={row.nights}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.nights}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.base}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.86rem" }}>
                        <KlookLink href={row.href} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.cta}
                        </KlookLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Booking checklist */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Checklist</span>
          <h2 className={styles.sectionTitle}>What Should You Book Before You Go?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Two sale dates are fixed: the Yufuin no Mori opens one month ahead and the Takachiho boats two weeks ahead.
            Put those in your calendar, and book the rest when your dates are set.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "When to book", "Why", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prepRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={smallNote}>
            Cancellation terms differ by listing, and not every one is listed here. Related listings do not refund late
            arrival, leaving the group, or a closed Mt. Aso on some fees. Read yours before you pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kumamotoTakachihoRailwayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check your Takachiho date →
            </KlookLink>
            <KlookLink href={nagasakiInasayamaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nagasaki with the night view →
            </KlookLink>
          </div>
        </section>

        {/* Season */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>When to go</span>
          <h2 className={styles.sectionTitle}>What Is the Best Season to Visit Kyushu?</h2>
          <p className={styles.bodyText}>
            Autumn is the pick, with colour at Kinrin Lake in November, though Takachiho&apos;s boats get busy: the
            page showed no same-day tickets for 7 to 9 November. In winter, one tour swaps its train for Dazaifu from
            1 December to 28 February, and heavy snow can cancel coach days. The June rainy season and typhoons matter
            most on Days 2 and 4, so leave yourself a spare day if you can.
          </p>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="What Should You Book for Five Days in Kyushu?"
          intro="Five days, two hotels and two long tours. Open a listing for the price on your dates."
          items={kyushuItineraryTripPrep}
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
          heading="Kyushu Day Tours on Klook"
          intro="One listing for each long day. Open one for the current price, the meeting point and the package options on your date."
          tours={[
            yufuinBeppuNoMoriTour,
            kumamotoTakachihoRailwayTour,
            asoTakachihoFukuokaTour,
            nagasakiSmallGroupDayTour,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{guide.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Five days, two long tours, one rail decision</h2>
            <p className={styles.ctaBannerDesc}>
              Book Takachiho first, because it sets your Kumamoto night. The rest of the trip follows from it.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kumamotoTakachihoRailwayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Takachiho Tour →
              </KlookLink>
              <KlookLink href={oneStationHotelKumamoto.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Kumamoto Hotel →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
