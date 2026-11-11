import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  dotonboriCityCruise,
  dotonboriDaytimeFoodTour,
  dotonboriNaniwaSightseeingBoat,
  dotonboriTonboriRaveCruise,
  nambaBarHoppingNightTour,
  osakaAmazingPass,
  osakaCastleUmedaTonboriDayTour,
  osakaWonderCruise,
} from "../../../lib/klook-links";

/**
 * Dotonbori river cruise — the Tombori River Cruise, and the three other boats
 * that run the same stretch of water.
 *
 * Sources, all re-read on 1 Nov 2026, and nothing here first-hand:
 *
 * - osaka-info.jp (Osaka Convention & Tourism Bureau, the city's official tourism
 *   body), the English spot page for the Tombori River Cruise: the ¥2,000 /
 *   ¥1,000 / ¥500 fares, the 20-minute run, the 11:00–21:00 schedule on the hour
 *   and half hour, Tazaemonbashi Pier and the Don Quijote Dotonbori 1F reception,
 *   the 5–10 minute walks from Namba, Shinsaibashi and Nipponbashi, the ticket
 *   office opening an hour before the first departure, the no-phone-reservations
 *   rule, the online booking window closing 10 minutes before departure, the
 *   free-for-one-preschooler-per-adult rule, and the Osaka e-Pass inclusion.
 * - osaka-amazing-pass.com/en/service_free.html, the pass operator's own free-
 *   admission list: the same three fares, the same 11:00–21:00 half-hourly
 *   schedule, the 13, 24 and 25 July closures, the voucher-exchange-for-a-timed-
 *   slot rule, "Boarding is only allowed at the time stated on the ticket", the
 *   warning that evening cruises sell out and should be exchanged in the daytime,
 *   "You can't go on board when all seats are taken", and the river-conditions
 *   suspension clause.
 * - suito-osaka.jp (Aqua Metropolis Osaka, the city/prefecture cruise portal) for
 *   the operator name — Ipponmatsu Kaiun — the ~20 minute duration, the
 *   Tazaemonbashi Pier departure, and the boat being listed as 屋根なし, without
 *   a roof. That last line is the whole of the wet-weather answer below.
 * - osaka-info.jp/experience/en/osaka/spot/396, the same tourism body's listing
 *   for WONDER CRUISE・PIRATES, new to this page on 1 Nov 2026: the 20-minute
 *   Dotonbori course at ¥1,000 / ¥500, the 30–40 minute one-way Osaka Cruise
 *   course at ¥1,800 / ¥900, Nipponbashi Pier and the WONDER PUB ticket booth,
 *   the 60-passenger capacity and the advance-reservation advice. That makes the
 *   Wonder boat the one rival on this river with officially published fares, and
 *   it undercuts the Tombori boat by half.
 * - The www.klook.com search index for the four boat listings and the two food
 *   walks linked here. Klook answers automated reads of /activity/ pages with
 *   HTTP 403, so the index is the route the queue doc prescribes.
 *
 * Two judgement calls worth flagging:
 *
 * 1. The operator's own site, ipponmatsu.co.jp, was still down for maintenance on
 *    1 Nov 2026 — the same posted PHP-vulnerability notice as on 23 Oct, with the
 *    cruise detail pages unreachable and only a phone number given. Every figure
 *    below therefore comes from the city tourism body and the pass operator
 *    rather than from the boat company's own pages. Those two agree line for line
 *    on the fares and the schedule, which is why the numbers are stated plainly.
 * 2. Klook has no standalone en-US listing for the operator's own Tombori River
 *    Cruise. It sells the other Dotonbori boats and the pass that includes the
 *    Tombori one free. The page says so rather than implying one is the other.
 *
 * No Klook price appears anywhere: the product pages cannot be read.
 */

/** Every figure on this page was read on this date. */
const CHECKED_ISO = "2026-11-01";
const CHECKED = checkedLabel(CHECKED_ISO);

/** The pass price is owned by lib/attraction-prices.ts, shared with the ticket price table. */
const PASS_1_DAY = PRICES.osakaAmazingPass.adult;

const fareRows = [
  {
    tier: "Adult",
    price: "¥2,000",
    what: "The counter fare at Tazaemonbashi Pier, and the figure the pass is measured against",
  },
  {
    tier: "Student (junior high school age and over)",
    price: "¥1,000",
    what: "Half the adult fare — one of the few Osaka attractions with a student band at all",
  },
  {
    tier: "Child (elementary school)",
    price: "¥500",
    what: "A quarter of the adult fare",
  },
  {
    tier: "Preschool child",
    price: "Free",
    what: "One per paying adult rides free; a second preschooler pays the ¥500 child fare",
  },
  {
    tier: "Osaka Amazing Pass holder",
    price: "Free",
    what: "One ride, included — but you must exchange the pass for a timed ticket at the reception desk first",
  },
  {
    tier: "Osaka e-Pass holder",
    price: "Free",
    what: "Also listed as a free facility on the city's own e-Pass pages",
  },
];

const scheduleRows = [
  { what: "First departure", when: "11:00" },
  { what: "Last departure", when: "21:00" },
  { what: "Interval", when: "Every 30 minutes — on the hour and on the half hour, so 21 sailings a day" },
  { what: "Time on the water", when: "About 20 minutes" },
  { what: "Boarding point", when: "Tazaemonbashi Pier, Tonbori River Walk (north bank), a minute from Ebisubashi" },
  { what: "Reception", when: "1F of the Don Quijote Dotonbori store, directly in front of the pier" },
  { what: "Ticket office opens", when: "One hour before the first departure of the day — 10:00" },
  { what: "Online booking closes", when: "10 minutes before departure (prepaid)" },
  { what: "Phone reservations", when: "Not accepted" },
  { what: "Closed days in 2026", when: "13, 24 and 25 July" },
  { what: "Suspensions", when: "Subject to change without notice for river conditions and vessel maintenance" },
];

const boatRows = [
  {
    boat: "Tombori River Cruise (Ipponmatsu Kaiun)",
    run: "About 20 minutes, 11:00–21:00 every half hour",
    fare: "¥2,000 adult / ¥1,000 student / ¥500 child",
    pass: "Free with the Osaka Amazing Pass and the Osaka e-Pass",
    sold: "Counter at Tazaemonbashi Pier, or the operator's own online booking",
  },
  {
    boat: "Wonder Cruise — Dotonbori course",
    run: "20 minutes, a loop of the Dotonbori stretch",
    fare: "¥1,000 adult / ¥500 child",
    pass: "Not listed as a pass facility",
    sold: "Nipponbashi Pier, ticket booth at the WONDER PUB shop beside it",
  },
  {
    boat: "Wonder Cruise — Osaka Cruise course",
    run: "30–40 minutes, one way between Nipponbashi and Hachikenyahama",
    fare: "¥1,800 adult / ¥900 child",
    pass: "Not listed as a pass facility",
    sold: "Same booth — limited runs, so the listing advises reserving ahead",
  },
  {
    boat: "Naniwa sightseeing boat",
    run: "30 minutes, per the Klook listing",
    fare: "Check the current fare on the listing",
    pass: "Not a pass facility",
    sold: "Klook, in English, on a foreign card",
  },
  {
    boat: "Dotonbori city cruise",
    run: "20 minutes, per the Klook listing",
    fare: "Check the current fare on the listing",
    pass: "Not a pass facility",
    sold: "Klook — lounge seating, your own drinks allowed, pets welcome",
  },
  {
    boat: "TONBORIRAVE cruise",
    run: "A DJ boat rather than a sightseeing run",
    fare: "Check the current fare on the listing",
    pass: "Not a pass facility",
    sold: "Klook — the listing bundles free Piccadilly nightclub entry",
  },
];

const whoFor = [
  {
    title: "Go after dark if…",
    desc: "You want the version that is on every postcard. The Glico sign, the neon on the Ebisubashi frontages and the reflections off the water are the point of this cruise, and none of them exist at 14:00. The last departure is 21:00, so even in midsummer — when Osaka sunset is past 19:00 — there are four night sailings left after the light goes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "Go in daylight if…",
    desc: `You are on a pass and want the day to work, or you have children with you. Daytime departures are the easy ones to get a slot on — the pass operator's own advice is to exchange your voucher during the day because the evening boats go first — and a 20-minute ride at 13:00 costs a pass holder nothing and slots between two other stops. Advice as published on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  {
    title: "Pick a different boat if…",
    desc: "You want a cheaper fare, a seat rather than a bench, a longer ride, or a drink in your hand. The Tombori boat is the frequent, pass-covered one; the Wonder Cruise runs the same 20 minutes for half the money from Nipponbashi Pier, and the other Dotonbori operators sell a 30-minute run, a lounge-seat cruise that lets you bring your own drinks, and a DJ boat with club entry attached. Same river, different evenings.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h18l-2 4H5z" />
        <path d="M5 17V9h14v8" />
        <path d="M12 3v6" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide whether you are on a pass before you buy anything",
    desc: `This is the only decision on the page that moves money. The Tombori River Cruise is a free admission on the Osaka Amazing Pass, which is ${PASS_1_DAY} for one day — so if a pass day is already in your plan, you do not buy a cruise ticket at all. If it is not, the counter fare is ¥2,000 for an adult, and the Wonder Cruise from Nipponbashi Pier is ¥1,000 for a 20-minute Dotonbori loop, which is the cheaper single ticket on this river.`,
  },
  {
    title: "If you are on a pass, exchange the voucher early in the day",
    desc: "A pass does not get you onto a boat by itself. You exchange it at the reception desk for a ticket with a time printed on it, and the operator states that boarding is only allowed at the time on that ticket. The pass operator's own note says the evening cruises fill first and that you should do the exchange during the daytime — so walk past the pier on your way to something else and sort the slot then.",
  },
  {
    title: "If you are paying, buy at the counter or online — not by phone",
    desc: "Same-day tickets are sold at the ticket office by the pier, which opens an hour before the first departure of the day. There are no phone reservations. Online booking is available up to 10 minutes before a departure and is prepaid, which is the version worth using on a Friday or Saturday evening.",
  },
  {
    title: "Find the pier, which is easier than the address suggests",
    desc: "Tazaemonbashi Pier sits on the Tonbori River Walk promenade on the north bank, and the reception is on the first floor of the Don Quijote Dotonbori store — the one with the Ferris wheel on the side of it. It is a 5 to 10 minute walk from Namba, Shinsaibashi or Nipponbashi stations, all of which put you on the wrong bank, so cross at Ebisubashi or Tazaemonbashi.",
  },
  {
    title: "Allow about 40 minutes door to door, not 20",
    desc: "The cruise is 20 minutes. The queue at the reception desk, the walk down to the pontoon and the boarding of a boat that holds a couple of dozen people are the other half. If you are threading this between a dinner booking and a show, treat it as a 40-minute block.",
  },
];

const faqItems = [
  {
    q: "How much is the Dotonbori River Cruise?",
    a: `¥2,000 for an adult. The Tombori River Cruise — the operator's boat from Tazaemonbashi Pier — is ¥2,000 for an adult, ¥1,000 for a student from junior high school age up, and ¥500 for an elementary-school child, with one preschooler free per paying adult. Both Osaka's official tourism body and the Osaka Amazing Pass operator's own facility list publish the same three figures. It is free with the Osaka Amazing Pass and free with the Osaka e-Pass, in both cases after you exchange the pass for a timed ticket at the reception desk. The other Dotonbori boats price themselves separately — the Wonder Cruise from Nipponbashi Pier is ¥1,000 for its 20-minute Dotonbori course, and the Klook-sold boats publish their own fares on their listings. All read on ${CHECKED}.`,
  },
  {
    q: "How long is the Tombori River Cruise?",
    a: `About 20 minutes on the water, running the Dotonbori canal through the heart of Minami and back. That is short by cruise standards and it is the right length: the stretch of river it covers is only a few hundred metres of neon frontage, and a longer boat would simply go round again. Budget closer to 40 minutes door to door once the reception desk, the walk to the pontoon and the boarding are counted. Duration as published by Osaka's official tourism site and the Aqua Metropolis Osaka cruise portal, read on ${CHECKED}.`,
  },
  {
    q: "What time does the Dotonbori River Cruise run?",
    a: `Departures run from 11:00 to 21:00, every 30 minutes — on the hour and on the half hour, so 21 sailings a day, every day except 13, 24 and 25 July in 2026. The ticket office by the pier opens one hour before the first departure, which makes it 10:00. That 21:00 last boat is the number that matters when you are planning: it is late enough that a night cruise fits after dinner in any season, and it means the evening slots are the scarce ones rather than the daytime ones. Schedule read on ${CHECKED}; it is subject to change for river conditions and vessel maintenance.`,
  },
  {
    q: "What time is the last Dotonbori River Cruise boat?",
    a: `21:00, every day the boat runs. Because every departure costs the same, the last sailing is the cheapest way to get the fully lit version of Dotonbori — but it is also inside the window the pass operator says sells out first, so it is the one slot worth securing in advance rather than turning up for. If you are on a pass, exchange the voucher for a 20:30 or 21:00 ticket during the daytime; if you are paying, the operator's web booking stays open until 10 minutes before departure. Last-departure time read on ${CHECKED} from Osaka's official tourism site and the pass operator's facility list, which agree.`,
  },
  {
    q: "Where do you board the Dotonbori River Cruise?",
    a: "At Tazaemonbashi Pier, on the Tonbori River Walk promenade along the north bank of the Dotonbori canal, about a minute east of Ebisubashi. The reception desk is on the first floor of the Don Quijote Dotonbori store directly in front of the pier, which is the landmark to aim for rather than the pier itself. It is a 5 to 10 minute walk from Namba, Shinsaibashi or Nipponbashi stations. All three leave you on the south side with the Glico sign, so you cross at Ebisubashi or Tazaemonbashi to reach the boat. Note that the Wonder Cruise, a different operator, boards at Nipponbashi Pier instead — so check which boat your ticket is for before you walk to a pontoon.",
  },
  {
    q: "What is the difference between the Dotonbori river cruise and the Tombori River Cruise?",
    a: `They are the same boat under two names. “Tombori River Cruise” (とんぼりリバークルーズ) is the official product name, operated by Ipponmatsu Kaiun, and it is what appears on the ticket, on the pier and on the Osaka Amazing Pass free-admission list. “Dotonbori river cruise” is the descriptive phrase most visitors search for, and it also gets used loosely for any of the boats on this canal — including the Wonder Cruise from Nipponbashi Pier and the Klook-sold city cruise, Naniwa sightseeing boat and TONBORIRAVE DJ boat, which are different operators at different fares. If the pass is the reason you are riding, the Tombori boat is the only one of them it covers. Names and operator checked on ${CHECKED}.`,
  },
  {
    q: "Is there a cheaper Dotonbori boat ride than the ¥2,000 Tombori River Cruise?",
    a: `Yes, if you are not on a pass. Osaka's official tourism body lists the Wonder Cruise Dotonbori course at ¥1,000 for an adult and ¥500 for a child for a 20-minute loop of the same stretch — half the Tombori fare for the same length of ride — boarding at Nipponbashi Pier with the ticket booth at the WONDER PUB shop beside it. Its longer Osaka Cruise course, a one-way 30 to 40 minutes between Nipponbashi and Hachikenyahama, is ¥1,800 adult and ¥900 child. The trade-offs are that it has limited runs per course, so the listing advises reserving ahead, and that no Osaka pass covers it. If you are holding an Osaka Amazing Pass, the Tombori boat is free and the comparison does not arise. Fares read on ${CHECKED}.`,
  },
  {
    q: "Is the Dotonbori River Cruise free with the Osaka Amazing Pass?",
    a: `Yes — the Tombori River Cruise is one of the free admissions on the Osaka Amazing Pass, with no time cut-off of the kind the Umeda Sky Building has. It is also free on the Osaka e-Pass. The condition is procedural rather than financial: you exchange the pass at the reception desk for a ticket with a departure time on it, and the operator states that boarding is only allowed at the time stated on the ticket. The pass operator also warns that evening cruises sell out quickly and recommends exchanging during the daytime. With the pass at ${PASS_1_DAY} for a day, a ¥2,000 cruise plus Osaka Castle's ¥1,200 main tower is most of the way to break-even before you count a single subway ride. Conditions read on ${CHECKED}.`,
  },
  {
    q: "Do you need to book the Dotonbori River Cruise in advance?",
    a: "Not usually, but the evening is a different question from the afternoon. Same-day tickets are sold at the ticket office by the pier, which opens an hour before the first departure, and on a weekday afternoon you can simply turn up. There are no phone reservations. For a Friday or Saturday night sailing, use the operator's online booking — it stays open until 10 minutes before departure and is prepaid — or, if you are on a pass, exchange your voucher for an evening slot early in the day, because the operator's own guidance is that the night boats go first.",
  },
  {
    q: "Is the Dotonbori River Cruise better at night or during the day?",
    a: "At night, if you only ride once. The thing you are paying for is the Glico sign, the neon frontages and the lights off the water, and all of them need darkness. Daytime has two arguments in its favour and they are both practical: the slots are easier to get, and a pass holder trying to fit several free admissions into one day will find the 13:00 sailing easier to work around than the 19:30. Our Umeda Sky Building guide has the published Osaka sunset times by season if you want to pick the sailing that catches the light changing.",
  },
  {
    q: "Does the Dotonbori River Cruise run in the rain?",
    a: `Usually yes, but bring a layer and a hood: the boat is listed as having no roof on the Aqua Metropolis Osaka cruise portal, read on ${CHECKED}, which is what lets it pass under the low Dotonbori bridges. The published cancellation trigger is not rain as such — the pass operator's facility list says the service can be suspended because of river conditions or vessel maintenance. Treat heavy rain and high water as the risk rather than a shower, and if the weather is marginal, the covered alternative in the same few streets is a food walk rather than a boat.`,
  },
  {
    q: "Which Dotonbori cruise should you pick?",
    a: "The Tombori River Cruise if you hold an Osaka pass or want the most frequent ride — it is the ¥2,000, 20-minute, half-hourly boat and the only one the passes cover. The Wonder Cruise Dotonbori course if you are paying cash and want the same 20 minutes for ¥1,000, boarding at Nipponbashi Pier instead, and you do not mind reserving ahead because it has limited runs. The Naniwa sightseeing boat if you want the longer run at 30 minutes. The Dotonbori city cruise if you would rather have lounge seating and your own drink on board; its listing also says pets are welcome, which is unusual. The TONBORIRAVE boat if you are starting a night out rather than sightseeing — it is a DJ cruise with free Piccadilly nightclub entry attached. Same river, quite different evenings.",
  },
  {
    q: "Is the Dotonbori River Cruise good with children?",
    a: "Yes, and the fare structure says so: ¥500 for an elementary-school child against ¥2,000 for an adult. Twenty minutes is short enough to hold a small child's attention, the commentary is lively rather than reverent, and there is nothing to queue for in the way that an observation deck or a theme park ride demands. The things to plan around are the open boat — no roof, so sun in August and wind in January — and the fact that a timed ticket means arriving before the time printed on it rather than when you get there.",
  },
  {
    q: "What else is there to do around Dotonbori either side of the cruise?",
    a: "Twenty minutes on a boat is not an evening, and the streets either side of the pier are the densest eating in Japan. The daytime option is a food walk — the join-in Dotonbori tour listed at 11:00 to 14:00 covers kushikatsu, takoyaki, a seasonal lunch set and a dessert for a group of two to ten. The evening option is a bar crawl through Namba and the back streets rather than the Dotonbori strip itself. Both are the same few hundred metres of city that the cruise shows you from the water.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/dotonbori-river-cruise") },
});

const TITLE = "Dotonbori River Cruise 2026: ¥2,000, 20 Min, Tombori Times";
const DESC =
  "Dotonbori River Cruise price and times: the Tombori boat is ¥2,000, runs 20 minutes and leaves every half hour, 11:00–21:00. Compare the boats and book.";

export default function DotonboriRiverCruisePage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/dotonbori-river-cruise" />
        {hreflangLinks("/guides/attractions/dotonbori-river-cruise")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/dotonbori-river-cruise" />
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
              route: "/guides/attractions/dotonbori-river-cruise",
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
                  name: "Dotonbori River Cruise",
                  item: "https://www.japan-travel-kit.com/guides/attractions/dotonbori-river-cruise",
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
          <span className={styles.breadCurrent}>Dotonbori River Cruise</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Dotonbori River Cruise 2026:<br />Price, Times and the Tombori Boat
          </h1>
          <p className={styles.heroSubtitle}>
            ¥2,000 for an adult, about 20 minutes, and a departure from Tazaemonbashi Pier
            every half hour between 11:00 and 21:00 — free with the Osaka Amazing Pass if
            you exchange the voucher before the evening boats fill.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares, dated", "Six options compared"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Fare</p>
                <p className={styles.verdictStatValue}>¥2,000 adult / ¥500 child</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time on the water</p>
                <p className={styles.verdictStatValue}>About 20 minutes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Departures</p>
                <p className={styles.verdictStatValue}>11:00–21:00, every half hour</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Osaka Amazing Pass</p>
                <p className={styles.verdictStatValue}>Free, all day</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              The <strong>Dotonbori River Cruise</strong> — officially the{" "}
              <strong>Tombori River Cruise</strong>, run by{" "}
              <strong>Ipponmatsu Kaiun</strong> — costs <strong>¥2,000</strong> for an adult,
              runs <strong>about 20 minutes</strong>, and leaves{" "}
              <strong>Tazaemonbashi Pier</strong> on the Tonbori River Walk, a minute from
              Ebisubashi, <strong>every 30 minutes from 11:00 to 21:00</strong>. It is{" "}
              <strong>free with the Osaka Amazing Pass</strong>.
            </p>
            <p className={styles.verdictText}>
              The rest of the detail: <strong>¥1,000</strong> for a student from junior high
              school age up, <strong>¥500</strong> for an elementary-school child, and one
              preschooler free per paying adult. Reception is on the 1F of the Don Quijote
              Dotonbori store, directly in front of the pier. The{" "}
              <strong>Osaka e-Pass</strong> covers it too, with no afternoon cut-off on either
              pass — but a pass does not board you: you exchange it at the reception desk for
              a ticket with a departure time printed on it, and the pass operator warns that
              the evening cruises sell out first. Same-day tickets are sold at the pier from
              an hour before the first departure (10:00); online booking closes 10 minutes
              before a departure and there are no phone bookings. All read on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Osaka Amazing Pass on Klook →
              </KlookLink>
              <KlookLink href={dotonboriCityCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Book a Dotonbori cruise in English →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Dotonbori River Cruise?</h2>
          <p className={styles.bodyText}>
            A <strong>20-minute, ¥2,000</strong> ride on a low, open boat called the{" "}
            <strong>Tombori River Cruise</strong>, run by <strong>Ipponmatsu Kaiun</strong>{" "}
            from <strong>Tazaemonbashi Pier</strong> every half hour from{" "}
            <strong>11:00 to 21:00</strong>, and{" "}
            <strong>free on the Osaka Amazing Pass</strong>. &ldquo;Dotonbori river
            cruise&rdquo; is what visitors search for; <strong>Tombori River Cruise</strong>{" "}
            is the name on the ticket, the pier sign and the pass operator&apos;s free-admission
            list, so it is the one to look for on the ground.
          </p>
          <p className={styles.bodyText}>
            It runs the few hundred metres of water that the Glico sign, the Ebisubashi crowds
            and the giant mechanical crab all face onto, with a guide on board doing the
            commentary in the brisk Osaka register the city is known for.
          </p>
          <p className={styles.bodyText}>
            The reason it is worth twenty minutes is sightlines. Dotonbori at street level is
            a crush — you are shoulder to shoulder on Ebisubashi trying to photograph a sign
            you cannot stand back from. From the water you are below the crowd with a clear
            run at the frontages, and the bridges pass close enough overhead to explain why
            the boats have no roof.
          </p>
          <p className={styles.bodyText}>
            There is no timed-entry system to fight over, no release date, and no sell-out
            risk on a weekday afternoon. What there is instead is a{" "}
            <strong>voucher-exchange rule for pass holders</strong> and an evening that fills
            before the day does — and between them those two lines decide how most people
            should plan this. The rest of the page is the fares, the schedule, the pier, and
            the four boats that work the same stretch of river.
          </p>
        </section>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the Dotonbori River Cruise?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>¥2,000 for an adult, ¥1,000 for a student, ¥500 for a child.</strong> One
            fare per age band, the same at every departure — there is no premium for a night
            sailing, which is unusual and is the quiet reason this is good value:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Who", "Fare", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
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
            Fares read on {CHECKED} from Osaka&apos;s official tourism site and the Osaka
            Amazing Pass operator&apos;s own free-admission list, which print the same three
            figures. The boat company&apos;s own site was offline for maintenance on the check
            date, so those are the sources behind every number here. Subject to change —
            confirm before you pay. For admissions across the rest of Japan, each
            with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Schedule */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Times &amp; pier</span>
          <h2 className={styles.sectionTitle}>What Time Does the Dotonbori River Cruise Run?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>From 11:00 to 21:00, every 30 minutes</strong> — on the hour and on the
            half hour, every day except 13, 24 and 25 July in 2026. The ticket office by the
            pier opens an hour before the first departure, so <strong>10:00</strong>:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Twenty-one sailings a day is the useful figure. It means the cruise is something
            you fit around the rest of the evening rather than something the evening is built
            around, and the <strong>21:00 last boat</strong> is late enough that it still works
            after dinner in any season. Schedule read on {CHECKED}.
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            How Long Is the Tombori River Cruise?
          </h3>
          <p className={styles.bodyText}>
            <strong>About 20 minutes on the water.</strong> Osaka&apos;s official tourism site
            prints 20 minutes and the Aqua Metropolis Osaka cruise portal prints
            &ldquo;approx. 20 minutes&rdquo;, both read on {CHECKED}. Plan{" "}
            <strong>about 40 minutes door to door</strong> instead: the reception desk, the
            walk down to the pontoon and the boarding of a boat that holds a couple of dozen
            people are the other half. Twenty minutes is the right length for the route — the
            stretch of river is only a few hundred metres of neon frontage, and a longer boat
            would simply go round again.
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            Where Do You Board the Dotonbori River Cruise?
          </h3>
          <p className={styles.bodyText}>
            At <strong>Tazaemonbashi Pier</strong>, on the Tonbori River Walk promenade along
            the <strong>north bank</strong> of the Dotonbori canal, roughly a minute east of
            Ebisubashi. Aim for the landmark rather than the pier: reception is on the{" "}
            <strong>1F of the Don Quijote Dotonbori store</strong> — the one with the Ferris
            wheel on the side of it — directly in front of the pontoon. It is a 5 to 10 minute
            walk from <strong>Namba</strong>, <strong>Shinsaibashi</strong> or{" "}
            <strong>Nipponbashi</strong> stations, all of which leave you on the south bank
            with the Glico sign, so cross at Ebisubashi or Tazaemonbashi to reach the boat.
            Our{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka guide</Link>{" "}
            covers how the Midosuji Line joins Namba to Umeda and Tennoji. Location and walking
            times read on {CHECKED}.
          </p>

          <h3 className={styles.pickName} style={{ marginTop: "1.75rem", marginBottom: "0.6rem" }}>
            Same-Day Tickets vs Booking Ahead — and When the Boats Sell Out
          </h3>
          <p className={styles.bodyText}>
            The two routes are not equivalent, and the difference only matters after dark.{" "}
            <strong>Same-day</strong>: the ticket office by the pier sells for the next
            available sailing from 10:00, and the pass operator&apos;s own wording is blunt
            about the limit — &ldquo;You can&apos;t go on board when all seats are
            taken.&rdquo; <strong>Ahead</strong>: the operator&apos;s web reservation is
            prepaid and stays open until <strong>10 minutes before departure</strong>, which
            is the version worth using for a Friday or Saturday evening. Telephone
            reservations are not accepted at all.
          </p>
          <p className={styles.bodyText}>
            On which slots go first, the only published guidance is the pass
            operator&apos;s, and it is specific: exchange your voucher{" "}
            <strong>during the daytime</strong>, because <strong>the evening cruises sell
            out quickly</strong>. Read straight, that makes the sailings after dark — the
            19:00 to 21:00 run of departures, and more so at a weekend — the scarce ones, and
            a weekday afternoon the turn-up-and-ride window. There are no published occupancy
            figures beyond that, so treat anything more precise as guesswork rather than a
            number. Guidance read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass — cruise included →
            </KlookLink>
            <KlookLink href={dotonboriCityCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Book a Dotonbori cruise slot ahead →
            </KlookLink>
          </div>
        </section>

        {/* Night or day */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Best time to go</span>
          <h2 className={styles.sectionTitle}>
            Is the Dotonbori River Cruise Better at Night or During the Day?
          </h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            <strong>Night, if you ride once</strong> — the neon is the product, and the fare is
            the same at every departure, so the view is free. But the pass changes the answer,
            because the slot you can actually get is not always the slot you want:
          </p>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            If you want to catch the light actually changing, pick the sailing against the
            date: our{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets">Umeda Sky Building guide</Link>{" "}
            carries the published Osaka sunset times by season, which swing by about two and a
            half hours across the year.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={dotonboriTonboriRaveCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              The night-out DJ cruise →
            </KlookLink>
            <KlookLink href={dotonboriNaniwaSightseeingBoat.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              The 30-minute sightseeing boat →
            </KlookLink>
          </div>
        </section>

        {/* Compare the boats */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which Dotonbori Cruise Should You Pick?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Several operators work this stretch of water and they are not interchangeable. Two
            asymmetries matter. First, <strong>only the Tombori boat is a pass facility</strong>,
            and Klook does not sell it as a standalone listing — so if you are on an Osaka
            pass, the boat you want is the one you book at a desk rather than on your phone.
            Second, the one rival with officially published fares, the{" "}
            <strong>Wonder Cruise</strong> from Nipponbashi Pier,{" "}
            <strong>runs a 20-minute Dotonbori loop for ¥1,000 — half the Tombori fare</strong>,
            which is the answer if you are paying cash and not carrying a pass.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Boat", "Length of ride", "Fare", "On the Osaka passes?", "Where it is sold"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {boatRows.map((row) => (
                    <tr key={row.boat}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.boat}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.run}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tombori figures from Osaka&apos;s official tourism site and the pass operator&apos;s
            facility list; the two Wonder Cruise rows from the same tourism body&apos;s own
            WONDER CRUISE・PIRATES listing; the last three rows describe what each Klook
            listing itself states. All read on {CHECKED}. Klook prices change by date, so
            no Klook fare is quoted here — open a listing for the current
            figure and the cancellation window, which is set per listing rather than per
            operator. Subject to change.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={dotonboriCityCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Lounge-seat city cruise →
            </KlookLink>
            <KlookLink href={osakaWonderCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Wonder Cruise →
            </KlookLink>
          </div>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book the Dotonbori River Cruise</h2>
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
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass on Klook →
            </KlookLink>
            <KlookLink href={osakaCastleUmedaTonboriDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Castle, Umeda deck and the cruise in a day →
            </KlookLink>
          </div>
        </section>

        {/* The pass question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The pass question</span>
          <h2 className={styles.sectionTitle}>
            Is the Dotonbori River Cruise Free with the Osaka Amazing Pass?
          </h2>
          <p className={styles.bodyText}>
            <strong>Yes, all day.</strong> The Tombori River Cruise is one of the 40-plus free
            admissions on the Osaka Amazing Pass and it carries{" "}
            <strong>no afternoon cut-off</strong> — which is worth saying plainly, because the
            Umeda Sky Building on the same pass stops being free at 15:00. It is also a free
            facility on the Osaka e-Pass.
          </p>
          <p className={styles.bodyText}>
            The catch is a queue rather than a clock. A pass does not board you: you exchange
            it at the reception desk for a ticket with a departure time printed on it, and the
            operator states that <strong>boarding is only allowed at the time on the
            ticket</strong>. Their own published advice is that the evening cruises sell out
            quickly and that you should do the exchange during the daytime. In practice that
            means walking past the Don Quijote on your way to lunch and taking the 19:30 slot
            then, rather than turning up at 19:20 and finding the next free boat is at 21:00.
          </p>
          <p className={styles.bodyText}>
            The arithmetic needs a third stop. With the pass at {PASS_1_DAY} for one day (official
            price, checked 9 November 2026), the cruise (¥2,000) plus Osaka Castle&apos;s main tower
            (¥1,200) is ¥3,200 of admissions — just under the pass — and the Umeda deck before 15:00
            takes it to ¥5,200. Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass price and break-even table</Link>{" "}
            has the full inclusion list, the two-day price and the exclusions, and our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link>{" "}
            lays out which parts of a city day the pass pays for and which it does not.
            Conditions read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
            <KlookLink href={dotonboriDaytimeFoodTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Dotonbori food walk, 11:00–14:00 →
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
          heading="The Hours Either Side of the Boat"
          intro="Twenty minutes on the water leaves the rest of the evening open, and the streets around the pier are the densest eating in Japan. The first of these is the daytime walk, the second the after-dark one. Klook prices change by date, so open a listing for the current figure and the meeting point."
          tours={[dotonboriDaytimeFoodTour, nambaBarHoppingNightTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/osaka-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v8a6 6 0 0 0 12 0V3" />
                  <path d="M12 17v4M9 21h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Food Tour (2026): Which One to Book, Times and What You Eat</p>
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
                <p className={styles.relatedTitle}>Osaka 2 Day Itinerary (2026): Day by Day, and What to Book</p>
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
            <Link href="/guides/attractions/osaka-go-kart" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h2l1-3h12l1 3h2" />
                  <path d="M5 12v5h14v-5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Go Kart 2026: IDP Rules, Routes and Which Tour to Book</p>
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
            <Link href="/guides/attractions/umeda-sky-building-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="6" height="18" />
                  <rect x="14" y="3" width="6" height="18" />
                  <path d="M4 7h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Umeda Sky Building Tickets (2026): Prices, Hours and the Best Time to Go</p>
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
            <Link href="/guides/attractions/tokyo-bay-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18l-2 4H5z" />
                  <path d="M5 17V9h14v8" />
                  <path d="M12 3v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices</p>
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
            <h2 className={styles.ctaBannerTitle}>Sort the slot, not the ticket</h2>
            <p className={styles.ctaBannerDesc}>
              At ¥2,000 the fare is the small part. The scarce thing is an evening departure,
              and the pass that makes the ride free still needs a voucher exchanged at the desk
              before the night boats fill. Check the cancellation window shown on your own
              booking before you pay — it is set per listing, not per operator.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Osaka Amazing Pass on Klook →
              </KlookLink>
              <KlookLink href={dotonboriCityCruise.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Book a Dotonbori cruise →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
