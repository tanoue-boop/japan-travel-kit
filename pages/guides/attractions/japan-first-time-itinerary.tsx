import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import fares from "../../../data/jr-fares.json";
import { gygShibuyaSky, gygTeamlabPlanets, type GygListing } from "../../../lib/gyg-links";
import {
  dotonboriDaytimeFoodTour,
  firstTimeBeforeYouFlyPrep,
  firstTimeItineraryStayAreas,
  fujiHakoneDayTour,
  hakoneFreepass,
  hanedaLimousineBus,
  jrHarukaUrl,
  jrPassWholeJapan,
  klookEsim,
  kyotoCityFushimiArashiyamaTour,
  kyotoGionNightWalkingTour,
  kyotoNaraKiyomizuTour,
  nankaiRapitUrl,
  naritaExpressRoundTripUrl,
  naritaLimousineBus,
  nikkoCulturalDayTourUrl,
  osakaAmazingPass,
  osakaCastleTicket,
  shibuyaSkyTicketUrl,
  shinkansenTokyoKyoto,
  shinkansenTokyoOsaka,
  teamlabPlanetsTicketUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  usjStudioPassUrl,
} from "../../../lib/klook-links";

/**
 * The first-time Japan page, added 4 Nov 2026. It starts from the questions a
 * first-time visitor asks before choosing a route: how many days, which cities, is
 * the JR Pass worth it, is cash needed, what has to be booked. The nine days answer
 * those questions. It does not repeat tokyo-kyoto-osaka-7-day-itinerary, which is
 * organised around the two moving days of a single week, and its tables are its own.
 *
 * This page's own reads, all 4 November 2026:
 *   smart-ex.jp          Tokyo–Kyoto ¥13,970 Nozomi, ¥13,650 Hikari/Kodama; Tokyo–Shin-Osaka
 *                        ¥14,520 Nozomi, ¥14,200 Hikari/Kodama (tables as of 1 April 2025);
 *                        sale from 5:30 one year ahead, seats confirmed after 8:00 one month out
 *   japanrailpass.net    the Ordinary pass prices; the ¥4,960 NOZOMI/MIZUHO ticket
 *   JR Central           "about 2 hours" Tokyo–Kyoto; 2h21m Tokyo–Shin-Osaka; Seat E; baggage
 *   visitnara.jp         Kyoto–Nara about 34 minutes by Kintetsu limited express, 41 by JR
 *   odakyu-global.com    Romancecar Shinjuku–Hakone-Yumoto about 80 minutes
 *   tobu.co.jp           SPACIA X Asakusa–Tobu-Nikko 7:50 → 9:39 and 9:00 → 10:50
 *   ghibli-museum.jp     reserved tickets only; on sale 10:00 JST on the 10th for the next
 *                        month; nothing sold at the museum
 *
 * Carried over with their own earlier dates: the attraction prices in
 * lib/attraction-prices.ts, the Kyoto–Osaka times and Haruka prices (25 Oct, shown on
 * the 7-day page), and the cash guidance (27 Oct, cash-vs-card-japan). The "allow"
 * column is our own planning allowance and is labelled. The N'EX and Kyoto–Osaka fares
 * in the JR Pass table are our rounded reference values out of data/jr-fares.json and
 * are labelled. No Klook price appears: Klook's product pages answer HTTP 403.
 */

const OWN = checkedLabel("2026-11-04");
const EARLIER = checkedLabel("2026-10-25");
const CASH = checkedLabel("2026-10-27");

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const narita = fares.segments.find((s) => s.id === "narita-tokyo")!;
const kyotoOsaka = fares.segments.find((s) => s.id === "kyoto-osaka")!;

const JR_PASS_ONLINE = 50000;
const JR_PASS_ORDER = 53000;
const TOKYO_KYOTO_HIKARI = 13650;
const HARUKA_OSAKA = 1900;
const RAIL_TOTAL = narita.fareYen + TOKYO_KYOTO_HIKARI + kyotoOsaka.fareYen + HARUKA_OSAKA;

type Stop = { time: string; place: string; allow: string; getting: string; booking: string };
type Pick = { label: string; url: string };
type Day = {
  n: number;
  heading: string;
  intro: ReactNode;
  stops: Stop[];
  picks: Pick[];
  gyg?: GygListing;
};

const days: Day[] = [
  {
    n: 1,
    heading: "Day 1 — Land in Tokyo and Stay Close to the Hotel",
    intro:
      "Your first day is about the airport run, data and a short evening walk. Do not plan a sight for it: immigration, baggage and the ride into the city take most of the time you have.",
    stops: [
      { time: "Morning or afternoon", place: "Narita or Haneda: immigration, baggage, eSIM on", allow: "1–1.5 hours", getting: "n/a", booking: "eSIM, before you fly" },
      { time: "Afternoon", place: "Airport to your Tokyo hotel", allow: "40 minutes to 1.5 hours", getting: "Narita Express or limousine bus from Narita; limousine bus or Keikyu from Haneda", booking: "Worth booking" },
      { time: "Night", place: "Your own neighbourhood, and an early night", allow: "2 hours", getting: "On foot", booking: "No" },
    ],
    picks: [
      { label: "Narita Express round trip →", url: naritaExpressRoundTripUrl },
      { label: "Narita limousine bus →", url: naritaLimousineBus.url },
      { label: "Haneda limousine bus →", url: hanedaLimousineBus.url },
      { label: "Klook eSIM →", url: klookEsim.url },
    ],
  },
  {
    n: 2,
    heading: "Day 2 — teamLab, Harajuku and Shibuya at Sunset",
    intro: (
      <>
        Your one full Tokyo day holds the two bookings most likely to sell out. teamLab Planets is a
        30-minute slot with nothing sold on site, and SHIBUYA SKY goes on sale at 00:00 Japan time two
        weeks ahead, with sunset the slot that goes. Prices are {PRICES.teamlabPlanets.adult} and{" "}
        {PRICES.shibuyaSky.adult} (read {checkedLabel(PRICES.teamlabPlanets.checked)} and{" "}
        {checkedLabel(PRICES.shibuyaSky.checked)}). Klook&apos;s SHIBUYA SKY listing now says that for
        visits from 19 November 2026 its buyers must bring the original passport for everyone in the party,
        and that QR codes are not accepted (read {OWN}), so pack them.
      </>
    ),
    stops: [
      { time: "Morning", place: "teamLab Planets, Toyosu", allow: "2 hours", getting: "Yurakucho Line to Toyosu", booking: "Required: timed entry" },
      { time: "Afternoon", place: "Meiji Jingu, then Harajuku and Omotesando on foot", allow: "3 hours", getting: "Subway to Meiji-jingumae", booking: "No" },
      { time: "Night", place: "SHIBUYA SKY at sunset, then dinner in Shibuya", allow: "3 hours", getting: "On foot down Cat Street, or one stop", booking: "Yes: book the sunset slot" },
    ],
    picks: [
      { label: "teamLab Planets tickets →", url: teamlabPlanetsTicketUrl },
      { label: "Shibuya Sky tickets →", url: shibuyaSkyTicketUrl },
      { label: "Tokyo Subway Ticket →", url: tokyoSubwayTicket.url },
    ],
    gyg: gygShibuyaSky,
  },
  {
    n: 3,
    heading: "Day 3 — Hakone or Nikko as a Day Trip From Tokyo",
    intro: (
      <>
        Pick one. Hakone is lake, ropeway and a chance of Mt Fuji, about 80 minutes from Shinjuku on the
        Romancecar. Nikko is shrines and forest, about 1 hour 50 from Asakusa on the SPACIA X, whose
        timetable shows 9:00 arriving at 10:50. Both read on {OWN}. The Hakone Freepass is{" "}
        {PRICES.hakoneFreepass.adult} for two days from Shinjuku, with no 1-day version (read{" "}
        {checkedLabel(PRICES.hakoneFreepass.checked)}). If you would rather not plan it, take a coach day.
      </>
    ),
    stops: [
      { time: "Morning", place: "Train or coach out of Tokyo", allow: "1.5–2 hours", getting: "Romancecar from Shinjuku, or SPACIA X from Asakusa", booking: "Reserve the limited express seat or the tour" },
      { time: "Afternoon", place: "Hakone loop, or Toshogu and Kegon Falls", allow: "4–5 hours", getting: "The Freepass modes in Hakone; bus in Nikko", booking: "Freepass (Hakone)" },
      { time: "Night", place: "Back in Tokyo; pack for tomorrow", allow: "2 hours", getting: "Train or coach", booking: "No" },
    ],
    picks: [
      { label: "Mt Fuji & Hakone day tour →", url: fujiHakoneDayTour.url },
      { label: "Hakone Freepass →", url: hakoneFreepass.url },
      { label: "Nikko day tour →", url: nikkoCulturalDayTourUrl },
    ],
  },
  {
    n: 4,
    heading: "Day 4 — Asakusa, Then the Shinkansen to Kyoto",
    intro: (
      <>
        Spend the morning in Asakusa, leave the bags at your hotel, then ride west in the afternoon. The
        train is about 2 hours on a Nozomi on JR Central&apos;s own figure, at ¥13,970 on smartEX. Seat E
        is the Mt Fuji side. A case over 160 cm needs a seat with a baggage area, reserved in advance.
      </>
    ),
    stops: [
      { time: "Morning", place: "Senso-ji and Nakamise-dori, Asakusa", allow: "2 hours", getting: "Ginza or Toei Asakusa Line", booking: "No" },
      { time: "Afternoon", place: "Tokyo Station to Kyoto Station", allow: "About 2 hours on the train", getting: "Tokaido Shinkansen, Nozomi", booking: "Worth reserving" },
      { time: "Night", place: "Check in, then Pontocho or Gion on foot", allow: "2–3 hours", getting: "City bus or subway", booking: "Optional: guided Gion walk" },
    ],
    picks: [
      { label: "Tokyo → Kyoto tickets →", url: shinkansenTokyoKyoto.url },
      { label: "Gion night walking tour →", url: kyotoGionNightWalkingTour.url },
    ],
  },
  {
    n: 5,
    heading: "Day 5 — Fushimi Inari, Kiyomizu-dera and Kyoto's East Side",
    intro:
      "Start at Fushimi Inari as early as you can manage: it costs nothing to walk in, so the only thing to beat is the crowd. Then cross to the east side for Kiyomizu-dera, which opens at 06:00. Almost nothing in Kyoto needs a booking, which is why this is the one day you can change on the morning.",
    stops: [
      { time: "Morning", place: "Fushimi Inari, the torii gates", allow: "2–3 hours", getting: "JR Nara Line to Inari, or Keihan to Fushimi-Inari", booking: "No" },
      { time: "Afternoon", place: "Kiyomizu-dera, Sannenzaka and Ninenzaka", allow: "3 hours", getting: "City bus from the station", booking: "No: pay at the gate" },
      { time: "Night", place: "Gion and Hanamikoji, with a guide if you want the history", allow: "2–3 hours", getting: "On foot from Kiyomizu-dera", booking: "Only for a guided walk" },
    ],
    picks: [
      { label: "Kyoto one-day tour →", url: kyotoCityFushimiArashiyamaTour.url },
      { label: "Gion night walking tour →", url: kyotoGionNightWalkingTour.url },
    ],
  },
  {
    n: 6,
    heading: "Day 6 — Nara as a Day Trip From Kyoto",
    intro: (
      <>
        Nara is about 34 minutes from Kyoto Station by Kintetsu limited express and about 41 by JR, on the
        official Nara guide, read {OWN}. Nara Park and the deer are free, and the Great Buddha Hall at
        Todai-ji is {PRICES.todaiji.adult} (read {checkedLabel(PRICES.todaiji.checked)}). A half day is
        enough, which leaves the afternoon for a second Kyoto neighbourhood. Klook&apos;s coach day covers
        Kiyomizu-dera, Fushimi Inari and Nara Park in one departure, if you skipped them on Day 5.
      </>
    ),
    stops: [
      { time: "Morning", place: "Kyoto Station to Nara, then Nara Park and Todai-ji", allow: "3–4 hours", getting: "Kintetsu limited express or JR", booking: "No, or book the tour" },
      { time: "Afternoon", place: "Back to Kyoto: Arashiyama or Kinkaku-ji", allow: "3 hours", getting: "JR or city bus", booking: "No" },
      { time: "Night", place: "Dinner near the station; pack for Osaka", allow: "2 hours", getting: "On foot", booking: "No" },
    ],
    picks: [{ label: "Kyoto & Nara day trip →", url: kyotoNaraKiyomizuTour.url }],
  },
  {
    n: 7,
    heading: "Day 7 — Kyoto to Osaka, and a Food Tour in Dotonbori",
    intro: (
      <>
        The shortest move of the trip: about 30 minutes on the JR Special Rapid, with no reservation and
        no need for the shinkansen (read {EARLIER}). Leave early, drop the bags at your hotel, and be in
        Dotonbori by 11:00 for the food tour Klook lists at 11:00 to 14:00.
      </>
    ),
    stops: [
      { time: "Morning", place: "Kyoto Station to Osaka; drop the bags", allow: "1.5 hours", getting: "JR Special Rapid, or Hankyu or Keihan", booking: "No" },
      { time: "Afternoon", place: "Dotonbori food tour, then Kuromon Market or Shinsaibashi", allow: "4 hours", getting: "Midosuji Line to Namba", booking: "Yes, for the tour" },
      { time: "Night", place: "Dotonbori after dark", allow: "2–3 hours", getting: "On foot", booking: "No" },
    ],
    picks: [{ label: "Dotonbori food tour →", url: dotonboriDaytimeFoodTour.url }],
  },
  {
    n: 8,
    heading: "Day 8 — Osaka Castle, or a Day at Universal Studios Japan",
    intro: (
      <>
        Choose by who you are travelling with. The city day is the Osaka Amazing Pass, at{" "}
        {PRICES.osakaAmazingPass.adult} for one day (read {checkedLabel(PRICES.osakaAmazingPass.checked)}),
        which covers the subway and the castle. The park day is Universal Studios Japan, which stopped
        selling at the gate in May 2025, so that ticket has to be bought before you arrive.
      </>
    ),
    stops: [
      { time: "Morning", place: "Osaka Castle, or USJ from opening", allow: "3 hours, or the whole day", getting: "Osaka Metro, or JR Yumesaki Line", booking: "USJ: required. Castle: no" },
      { time: "Afternoon", place: "Umeda or a river cruise, or more USJ", allow: "3–4 hours", getting: "Osaka Metro", booking: "No" },
      { time: "Night", place: "Last dinner in Namba or Umeda", allow: "2–3 hours", getting: "On foot", booking: "No" },
    ],
    picks: [
      { label: "Osaka Amazing Pass →", url: osakaAmazingPass.url },
      { label: "Osaka Castle ticket →", url: osakaCastleTicket.url },
      { label: "USJ Studio Pass →", url: usjStudioPassUrl },
    ],
  },
  {
    n: 9,
    heading: "Day 9 — Fly Home From Kansai or Haneda",
    intro: (
      <>
        Kansai is the easy way out: the Rapi:t runs from Namba in a minimum of 34 minutes, and the Haruka
        one-way is ¥1,900 from Osaka or Shin-Osaka (read {EARLIER}). If your ticket is fixed to Haneda, take
        a Nozomi from Shin-Osaka to Shinagawa, then the Keikyu to the airport. The Nozomi is ¥14,520 on
        smartEX to Tokyo or Shinagawa, read {OWN}, so leave a full morning for that ending.
      </>
    ),
    stops: [
      { time: "Morning", place: "Check out; Kansai Airport by Rapi:t or Haruka", allow: "1–1.5 hours", getting: "Rapi:t from Namba, or Haruka from Shin-Osaka or Tennoji", booking: "Worth booking" },
      { time: "Morning, Haneda option", place: "Shin-Osaka to Shinagawa, then Keikyu to Haneda", allow: "4 hours door to door", getting: "Nozomi, then Keikyu", booking: "Reserve the seat" },
      { time: "Afternoon", place: "Check in and fly", allow: "At least 2 hours at the airport", getting: "n/a", booking: "No" },
    ],
    picks: [
      { label: "Nankai Rapi:t →", url: nankaiRapitUrl },
      { label: "JR Haruka →", url: jrHarukaUrl },
      { label: "Shin-Osaka → Tokyo tickets →", url: shinkansenTokyoOsaka.url },
    ],
  },
];

const howManyDaysRows = [
  { days: "7 days", route: "Tokyo, Kyoto and Osaka, no day trips", verdict: "The minimum for three cities. See our 7-day itinerary" },
  { days: "9 days", route: "Tokyo 3 nights, Kyoto 3, Osaka 2, plus Hakone or Nikko and Nara", verdict: "Our pick for a first trip, and the plan on this page" },
  { days: "10 days", route: "Adds Hiroshima or a slower pace", verdict: "See our 10-day itinerary" },
  { days: "14 days", route: "Adds Mt Fuji, Hiroshima and spare days", verdict: "See our 14-day itinerary" },
];

const railRows = [
  { leg: "Narita to Tokyo, Narita Express", fare: yen(narita.fareYen), source: `Our rounded reference value, as of September 2026` },
  { leg: "Tokyo to Kyoto, Hikari reserved", fare: yen(TOKYO_KYOTO_HIKARI), source: `smart-ex.jp table dated 1 April 2025, read ${OWN}` },
  { leg: "Kyoto to Osaka, JR Special Rapid", fare: yen(kyotoOsaka.fareYen), source: "Our rounded reference value, as of September 2026" },
  { leg: "Osaka to Kansai Airport, Haruka", fare: yen(HARUKA_OSAKA), source: `westjr.co.jp, read ${EARLIER}` },
  { leg: "Total JR spend, one adult", fare: yen(RAIL_TOTAL), source: "Our arithmetic. Add a short local fare for Nara" },
  { leg: "7-day JR Pass, Ordinary", fare: `${yen(JR_PASS_ONLINE)} online, ${yen(JR_PASS_ORDER)} from an agency`, source: `japanrailpass.net, read ${OWN}` },
];

const checklistRows = [
  { item: "Hotels", when: "As soon as your dates are fixed; earliest for blossom and autumn colour", detail: "All three cities, by area, in the section below" },
  { item: "Ghibli Museum, if you want it", when: "10:00 Japan time on the 10th of the month before your visit", detail: "Reserved tickets only, and nothing is sold at the museum. Buy through the channels on the museum's own ticket page" },
  { item: "SHIBUYA SKY", when: "00:00 Japan time, two weeks ahead", detail: "Sunset goes first. Book the moment your date opens, and bring your passport if you buy on Klook" },
  { item: "teamLab Planets", when: "As early as you can; no walk-up", detail: "A 30-minute slot, and the official store sells nothing on site" },
  { item: "Shinkansen seat", when: "smartEX opens one year ahead, seats confirmed one month out; JR reserved seats on sale at 10:00 one month ahead", detail: "Essential on the dates every Nozomi is reserved, and for bags over 160 cm" },
  { item: "USJ, if Day 8 is a park day", when: "Before you arrive", detail: "The gate stopped selling tickets in May 2025" },
  { item: "Airport transfer", when: "A few days ahead", detail: "The one queue you cannot plan around after a long flight" },
  { item: "eSIM", when: "Before you fly", detail: "Every timed ticket arrives as a QR code" },
];

const faqItems = [
  {
    q: "How many days do you need in Japan for a first trip?",
    a: "Nine days is our recommendation: three nights in Tokyo, three in Kyoto and two in Osaka, with one day trip from Tokyo and one from Kyoto. Seven days is the minimum for all three cities but leaves no room for a day trip. Anything shorter works better with one or two cities rather than three.",
  },
  {
    q: "What is the best route for a first time in Japan?",
    a: "Tokyo, then Kyoto, then Osaka, flying into Tokyo and home from Kansai. That way no leg is repeated and the last day is a short airport run rather than a long train. If your ticket returns from Haneda, keep the same route and take the shinkansen back on the last morning, or run the trip in reverse.",
  },
  {
    q: "Is the JR Pass worth it for a first-time itinerary?",
    a: `No, not on this route. The JR legs here come to about ${yen(RAIL_TOTAL)} for one adult, against ${yen(JR_PASS_ONLINE)} for a 7-day pass online and ${yen(JR_PASS_ORDER)} from an overseas agency, read on japanrailpass.net on ${OWN}. A nine-day trip also outlasts a 7-day pass, and the 14-day pass is ¥80,000 online. The pass does not cover the Nozomi without a ¥4,960 ticket either. It starts to pay when the same week reaches Hiroshima, Kanazawa or Tohoku.`,
  },
  {
    q: "What should I book before my first trip to Japan?",
    a: "Hotels first, then the things with a fixed sale date: the Ghibli Museum on the 10th of the month before, SHIBUYA SKY two weeks ahead, and teamLab Planets as early as you can. Add the shinkansen seat, USJ if you are going, the airport transfer and an eSIM. Most of Kyoto, including Fushimi Inari, needs no booking at all.",
  },
  {
    q: "Do I need cash in Japan?",
    a: `Yes, a little. Our cash vs card guide lists four places cash still recurs: temple and shrine admissions, market stalls and street food, small independent restaurants, and local buses and coin lockers. Carrying ¥10,000 to ¥20,000 and topping up at a convenience-store ATM covers those. Guidance from ${CASH}.`,
  },
  {
    q: "Where should I stay on a first trip to Japan?",
    a: "Tokyo Station or Shinjuku in Tokyo, Kyoto Station or Gion in Kyoto, and Namba or Umeda in Osaka. Pick by the moving days: Tokyo Station puts the shinkansen under your hotel, Kyoto Station has the Nara trains and the sightseeing buses, and Namba has the Nankai train to Kansai Airport.",
  },
  {
    q: "How do you get from Tokyo to Kyoto, and from Kyoto to Osaka?",
    a: `Tokyo to Kyoto is the Tokaido Shinkansen, about 2 hours on a Nozomi at ¥13,970 on smartEX, or ¥13,650 on a Hikari or Kodama, read ${OWN}. Kyoto to Osaka is about 30 minutes on the JR Special Rapid, with no reservation and no shinkansen needed.`,
  },
  {
    q: "Is 9 days too long for Tokyo, Kyoto and Osaka?",
    a: "No. Three nights in each of the first two cities is what makes the day trips possible, and the only full day you spend inside Tokyo is Day 2, with the Day 4 morning in Asakusa on top. If you would rather have more Tokyo, drop the Day 3 day trip.",
  },
  {
    q: "Does this first-time itinerary work with kids?",
    a: "Yes, with fewer stops a day. Keep the timed ticket in the morning, and use Day 8 for Universal Studios Japan or the castle depending on age. Most ticketed stops publish child rates, and our attraction prices table lists them with their check dates. Shinkansen child fares are about half the adult fare, at ¥7,250 on a Nozomi to Shin-Osaka on smartEX.",
  },
  {
    q: "What if it rains on my first trip to Japan?",
    a: "teamLab Planets is indoors, so swap it with a walking day if the forecast turns. Move SHIBUYA SKY if you can, because an open-air rooftop in cloud shows you cloud. In Osaka, the Shinsaibashi arcade keeps you dry into Dotonbori. Hakone loses the most in rain, since the view is most of the point, so if you have a choice on Day 3, take Nikko instead.",
  },
];

const TITLE = "First Time Japan Itinerary (2026): 9 Days, Day by Day";
const DESC =
  "First Time Japan Itinerary for 9 days: Tokyo 3 nights, Kyoto 3, Osaka 2, plus Hakone and Nara. What to book each day, JR Pass maths and cash to carry.";
const ROUTE = "/guides/attractions/japan-first-time-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function JapanFirstTimeItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated }),
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
                { "@type": "ListItem", position: 4, name: "First Time Japan Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>First Time Japan Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            First Time Japan Itinerary (2026):<br />9 Days, Day by Day
          </h1>
          <p className={styles.heroSubtitle}>
            How many days you need, which cities to see, whether the JR Pass pays, and what to book
            before you fly.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Day 1 to Day 9 tables", "JR Pass maths included", "Before-you-fly checklist"].map((t) => (
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

        {/* Lead paragraph: the whole answer, before anything else. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A good <strong>first time Japan itinerary</strong> takes <strong>9 days</strong>: three nights in
            Tokyo with a day trip to Hakone or Nikko, three in Kyoto with a day trip to Nara, and two in Osaka,
            flying home from Kansai or Haneda. The long trains are short: about 2 hours from Tokyo to Kyoto on
            the shinkansen and about 30 minutes from Kyoto to Osaka. Skip the JR Pass on this route, because
            the JR legs come to about {yen(RAIL_TOTAL)} against {yen(JR_PASS_ONLINE)} for the cheapest pass.
            Book hotels first, then SHIBUYA SKY, teamLab Planets and your shinkansen seat. Prices read on {OWN}.
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
                <p className={styles.verdictStatLabel}>Days you need</p>
                <p className={styles.verdictStatValue}>9 days, 8 nights</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Route</p>
                <p className={styles.verdictStatValue}>Tokyo → Kyoto → Osaka</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass?</p>
                <p className={styles.verdictStatValue}>No: single tickets are cheaper</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cash to carry</p>
                <p className={styles.verdictStatValue}>¥10,000 to ¥20,000</p>
              </div>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={firstTimeItineraryStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo Hotels on Klook →
              </KlookLink>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Tokyo → Kyoto Shinkansen →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* How many days */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>How long</span>
          <h2 className={styles.sectionTitle}>How Many Days Do You Need in Japan for a First Trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Nine, if you can. Seven days covers the three cities and nothing else; nine adds Hakone or Nikko and
            Nara without adding a fourth hotel. Our{" "}
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary">7-day</Link>,{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary">10-day</Link> and{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">14-day</Link> plans cover the other lengths.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip length", "What fits", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {howManyDaysRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.days}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Route */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The route</span>
          <h2 className={styles.sectionTitle}>What Is the Best Route for a First Time in Japan?</h2>
          <p className={styles.bodyText}>
            Tokyo, then Kyoto, then Osaka, on a ticket into Tokyo and home from Kansai, so that no leg is
            repeated. Hakone or Nikko fits from Tokyo and Nara fits from Kyoto, which is why those two are the
            day trips here. If your flights are a return to Haneda, keep the same order and take the shinkansen
            back on the last morning, as Day 9 sets out.
          </p>
        </section>

        {/* Before you fly */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Checklist</span>
          <h2 className={styles.sectionTitle}>What Should I Book Before My First Trip to Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Hotels first, then anything with a fixed sale date. This is the order, with when each one opens or
            tightens. Sale dates read on {OWN}; the SHIBUYA SKY and teamLab rules read{" "}
            {checkedLabel(PRICES.shibuyaSky.checked)} and {checkedLabel(PRICES.teamlabPlanets.checked)}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Booking", "When", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {checklistRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <KlookTripPrep
          label="Book before you fly"
          heading="What to Book First, in One Place"
          intro="A hotel in each city, the day trips, the airport run and your data. These eight cover them, and each opens the live listing so you can check availability on your dates."
          items={firstTimeBeforeYouFlyPrep}
        />

        {/* Day 1 to Day 9 */}
        {days.map((day) => (
          <section key={day.n} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>Day {day.n}</span>
            <h2 className={styles.sectionTitle}>{day.heading}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{day.intro}</p>
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["When", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {day.stops.map((row) => (
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
            <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
              <strong>What to book for Day {day.n}:</strong>
            </p>
            <div className={styles.pickCtaRow}>
              {day.picks.map((pick) => (
                <KlookLink key={pick.url} href={pick.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                  {pick.label}
                </KlookLink>
              ))}
              {day.gyg ? <GygCompareButton slug="japan-first-time-itinerary" listing={day.gyg} /> : null}
              {day.n === 2 ? <GygCompareButton slug="japan-first-time-itinerary" listing={gygTeamlabPlanets} /> : null}
            </div>
          </section>
        ))}

        <p className={styles.bodyText} style={{ marginTop: "-1.5rem", marginBottom: "3.5rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          The &ldquo;time to allow&rdquo; column in all nine tables is our own planning allowance, not an
          operator figure. Hours and prices change, so confirm them on the day.
        </p>

        <KlookStayAreas
          heading="Where Should You Stay on a First Trip to Japan?"
          intro="Three hotels for eight nights: three in Tokyo, three in Kyoto and two in Osaka. Two areas per city, chosen around the moving days, and each link opens Klook's hotel search for that area."
          areas={firstTimeItineraryStayAreas}
        />

        {/* JR Pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for a First-Time Itinerary?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            No. Every JR leg of this plan adds up to about {yen(RAIL_TOTAL)} for one adult, and the cheapest
            pass is {yen(JR_PASS_ONLINE)}. A nine-day trip also runs past a 7-day pass, and the 14-day pass is
            ¥80,000 online or ¥84,000 from an agency. Hakone, Nikko from Asakusa and the Kintetsu to Nara are
            not JR at all.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "Fare", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {railRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem", whiteSpace: "normal" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            On a pass you would also ride the Hikari rather than the Nozomi, or pay ¥4,960 for the Nozomi
            ticket on the Tokyo to Kyoto leg. The Haneda ending adds a second long train but still falls well
            short. Our <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> runs the break-even for
            your own route, and our{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen">Tokyo to Osaka shinkansen guide</Link> has
            every fare for the line.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto single tickets →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS, if your route grows →
            </KlookLink>
          </div>
        </section>

        {/* Getting around */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>How Do You Get Around Tokyo, Kyoto and Osaka?</h2>
          <p className={styles.bodyText}>
            On an IC card or a day pass. In Tokyo the Tokyo Subway Ticket is {PRICES.tokyoSubwayTicket.adult}{" "}
            for 24 hours, ¥1,500 for 48 and ¥2,000 for 72 (read{" "}
            {checkedLabel(PRICES.tokyoSubwayTicket.checked)}), but it does not cover JR or the Yamanote Line. In
            Kyoto most of the trip is bus and on foot, and in Osaka the Amazing Pass covers the Metro. Our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card guide</Link> sets out the cards.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Subway Ticket →
            </KlookLink>
            <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo sightseeing bus day →
            </KlookLink>
          </div>
        </section>

        {/* Cash */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Money</span>
          <h2 className={styles.sectionTitle}>Do I Need Cash in Japan?</h2>
          <p className={styles.bodyText}>
            Yes, a little: carry <strong>¥10,000 to ¥20,000</strong> and top up at a convenience-store ATM. Cash
            still recurs at temple and shrine admissions, market stalls and street food, small independent
            restaurants, and local buses and coin lockers, which is a fair description of your Kyoto days. Our{" "}
            <Link href="/guides/money/cash-vs-card-japan">cash vs card guide</Link> has the detail and the ATM
            limits, read {CASH}, and <Link href="/guides/money/japan-travel-budget">our budget guide</Link>{" "}
            prices the whole trip.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/japan-5-day-itinerary", title: "Japan 5 Day Itinerary: Tokyo and Kyoto, Day by Day (2026)" },
              { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day" },
              { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day" },
              { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
              { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary (2026): What to Book, and in What Order" },
              { href: "/guides/transport/tokyo-to-osaka-shinkansen", title: "Tokyo to Osaka Shinkansen: Times, Fares, JR Pass" },
              { href: "/guides/money/cash-vs-card-japan", title: "Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen" },
            ].map((card) => (
              <Link key={card.href} href={card.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{card.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Start with the hotels</h2>
            <p className={styles.ctaBannerDesc}>
              Fix your three bases first, and every other date on this page follows from them.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={firstTimeItineraryStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Tokyo Hotels →
              </KlookLink>
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                See Klook eSIM Options →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
