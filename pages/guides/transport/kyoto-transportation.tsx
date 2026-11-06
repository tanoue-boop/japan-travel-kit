import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { jrKansaiAreaPass, kyotoStayAreas, kyotoTransportTripPrep } from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * Sources for this page, read on 5 November 2026 unless a date is given. Every
 * fare and time in a table comes from one of these; nothing here is first-hand,
 * and no Klook price appears (Klook answers automated reads with HTTP 403).
 *
 *   city.kyoto.lg.jp/kotsu         page 0000204850 (fares and passes, dated 14 May
 *                                  2026), 0000324695 (how to ride, 1 Dec 2024),
 *                                  0000351261 (resident-priority fare, 3 Jun 2026),
 *                                  0000358942 (EX buses and the pass, 9 Oct 2026),
 *                                  0000359584 (autumn 2026 crowd measures),
 *                                  0000028337 (the withdrawn Bus 1-Day Pass)
 *   www2.city.kyoto.lg.jp/kotsu    webguide fare_bus (¥230 / ¥120), fare_tika
 *                                  (subway ¥220–¥360, from 1 Oct 2025),
 *                                  limited_express (EX100 / EX101 stops, times,
 *                                  front-door boarding), howtoride_bus, and the
 *                                  busdia pages for routes 100, 101 and 205
 *   keihan.co.jp                   the Gion-Shijo fare table, revised 1 Oct 2025
 *   keifuku.co.jp                  Randen ¥250 / ¥120 and IC cards. Its 3 March
 *                                  2023 notice gives the same ¥250; older pages
 *                                  on randen.keifuku.co.jp were not reachable
 *   jr-odekake.net                 Inari about 5 minutes from platforms 8–10;
 *                                  Emmachi 7–11 minutes then bus 204 or 205 for
 *                                  about 9; Tofukuji and Keihan to Kiyomizu-dera
 *   kyoto.travel                   JR to Saga-Arashiyama about 11 minutes by Rapid;
 *                                  Karasuma line to Kitaoji about 15 minutes plus
 *                                  bus about 15; commuting peaks 7:00–9:00 and
 *                                  18:00–19:00
 *   hankyu.co.jp                   timetable: Limited Express Osaka-umeda to
 *                                  Kyoto-kawaramachi about 43 minutes
 *
 * Deliberately absent: JR and Hankyu fares. Neither was readable on the operator's
 * own site and the transit-search figures are not an official source, so the
 * tables say that instead of printing them. Taxi and bicycle figures went for the
 * same reason. A claimed tourist-peak window on Higashioji-dori was also dropped:
 * the city publishes its measures, not an hour-by-hour crowd figure.
 */
const CHECKED = checkedLabel("2026-11-05");

const PASS_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1266287&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F118071-kyoto-city-subway-and-bus-ticket%2F";

const fareRows = [
  { mode: "City Bus (flat-fare area)",            useFor: "The last stretch to a temple",               adult: "¥230",        child: "¥120",        ic: "Yes" },
  { mode: "Sightseeing Express EX100 / EX101",    useFor: "Kyoto Station to Kiyomizu-dera, Gion and Ginkaku-ji, Saturdays, Sundays and holidays", adult: "¥500", child: "¥250", ic: "Yes" },
  { mode: "Subway (Karasuma and Tozai lines)",    useFor: "Fast north–south and east–west trunk rides", adult: "¥220–¥360 by distance", child: "¥110–¥180", ic: "Yes" },
  { mode: "Keihan: Gion-Shijo to Fushimi-Inari",  useFor: "Downtown to the shrine without a bus",       adult: "¥240",        child: "Not checked", ic: "Yes" },
  { mode: "Keihan: Gion-Shijo to Kiyomizu-Gojo",  useFor: "The Kiyomizu-dera walk from the river",      adult: "¥180",        child: "Not checked", ic: "Yes" },
  { mode: "Randen (Keifuku), whole line",         useFor: "Shijo-Omiya or the Tozai Line to Arashiyama", adult: "¥250 flat",  child: "¥120",        ic: "Yes" },
  { mode: "JR local trains and Hankyu",           useFor: "Fushimi Inari, Arashiyama, Osaka",           adult: "By distance: see the operator", child: "By distance", ic: "Yes" },
];

const routeRows = [
  { to: "Fushimi Inari",  route: "JR Nara Line, platforms 8–10, to Inari. The shrine is in front of the exit",                     time: "About 5 min",                       fare: "JR fare" },
  { to: "Arashiyama",     route: "JR Sagano Line Rapid to Saga-Arashiyama, then about 8 minutes on foot to Togetsu-kyo",           time: "About 11 min by Rapid",             fare: "JR fare" },
  { to: "Kinkaku-ji",     route: "Karasuma subway to Kitaoji, then bus 205 or 204 to Kinkakuji-michi",                             time: "About 15 + 15 min",                 fare: "¥260 + ¥230" },
  { to: "Kinkaku-ji (by JR)", route: "JR Sagano Line to Emmachi, then bus 204 or 205 to Kinkakuji-michi",                          time: "About 7–11 + 9 min",                fare: "JR fare + ¥230" },
  { to: "Kiyomizu-dera",  route: "EX100 or EX101 to Gojo-zaka, Saturdays, Sundays and holidays",                                   time: "About 12 min",                      fare: "¥500" },
  { to: "Kiyomizu-dera (any day)", route: "JR Nara Line to Tofukuji, Keihan to Kiyomizu-Gojo, then about 20 minutes on foot",     time: "About 25 min plus the transfer",    fare: "JR + Keihan fare" },
  { to: "Ginkaku-ji",     route: "EX100 to Ginkakuji-mae, Saturdays, Sundays and holidays",                                        time: "About 30 min",                      fare: "¥500" },
  { to: "Ginkaku-ji (any day)", route: "Karasuma subway to Imadegawa, then city bus. This is the city's own advice for avoiding the direct bus", time: "Not published", fare: "Subway + ¥230" },
];

const dayPasses = [
  { pass: "Subway & Bus 1-Day Pass",    price: "¥1,100 (child ¥550)", coverage: "Both subway lines, all city buses including EX100 / EX101, and set routes on Kyoto Bus, Keihan Bus and JR Bus", bestFor: "Full sightseeing days with five or more rides" },
  { pass: "Subway 1-Day Pass",          price: "¥800 (child ¥400)",   coverage: "Both subway lines only",             bestFor: "Days along the Karasuma and Tozai lines" },
];

const breakEvenRows = [
  { rides: "3 bus rides",                 payg: "¥690",   pass: "Pay per ride, saves ¥410" },
  { rides: "4 bus rides",                 payg: "¥920",   pass: "Pay per ride, saves ¥180" },
  { rides: "5 bus rides",                 payg: "¥1,150", pass: "Pass, saves ¥50" },
  { rides: "2 EX buses + 2 city buses",   payg: "¥1,460", pass: "Pass, saves ¥360" },
  { rides: "3 subway (¥260) + 3 bus",     payg: "¥1,470", pass: "Pass, saves ¥370" },
];

const passVsRows = [
  { scenario: "Five or more rides mixing bus and subway", pick: "Subway & Bus Pass", note: "Kinkaku-ji, Ginkaku-ji and Kiyomizu-dera all end in a bus ride or a walk, and the pass covers the EX buses with no extra charge." },
  { scenario: "Four or more rides, all on the subway",    pick: "Subway-only Pass",  note: "¥800 against ¥880 at the lowest ¥220 fare, and it pays sooner on longer rides." },
  { scenario: "Arashiyama or Fushimi Inari by train",     pick: "Suica / ICOCA",     note: "JR and the Randen are not covered by either pass, so pay per ride on these days." },
  { scenario: "Four rides or fewer",                      pick: "Suica / ICOCA",     note: "Pay-as-you-go is cheaper than the ¥1,100 pass at this level of use." },
];

const busTips = [
  {
    title: "Most buses: board at the rear, pay at the front when you exit",
    desc: "Kyoto City Bus's own guide says to board through the rear door, press the stop button, and pay at the front as you get off. On a flat-fare bus you touch your IC card on the fare box for about a second, once, on the way out.",
  },
  {
    title: "EX100 and EX101 work the other way round",
    desc: "On the Sightseeing Express buses you board at the front, pay or show your pass there, and leave by the rear door. Do not assume every Kyoto bus works like the last one you rode.",
  },
  {
    title: "Paying cash",
    desc: "Fare boxes give change, and 500-yen coins and 1,000-yen notes can go straight in. Change 2,000-, 5,000- and 10,000-yen notes before you board. Tell the driver first if you are paying for two or more people.",
  },
  {
    title: "Routes 100, 101 and 205 are the ones to know",
    desc: "Route 100 links Kyoto Station with Gojo-zaka, Kiyomizu-michi, Gion, Okazaki and Ginkaku-ji. Route 101 runs between Kyoto Station and Gojo-zaka. Route 205 is a loop through Kyoto Station, Shijo-Kawaramachi and Kinkakuji-michi.",
  },
];

const crowdTips = [
  {
    title: "Ride the train first and the bus last",
    desc: "Kyoto City's advice for autumn 2026 is the same shape as this page: from Kyoto Station, take the subway to Kitaoji and a bus to Kinkaku-ji, the subway to Imadegawa and a bus to Ginkaku-ji, and the subway to Kujo and a bus toward Higashiyama.",
  },
  {
    title: "Use the EX bus if it is a Saturday, Sunday or holiday",
    desc: "EX100 and EX101 stop only at the main sights. Morning departures from Kyoto Station run roughly every 7 to 8 minutes, from about 9:00 to about 12:30 in the current timetable. Check the timetable for your date.",
  },
  {
    title: "In autumn, switch to the subway in the late afternoon",
    desc: "Between 31 October and 29 November 2026, on Saturdays, Sundays and holidays, the city offers a free bus-to-subway transfer at Higashiyama-Sanjo (15:45–19:20) and from Kinkakuji-michi to Kitaoji (15:00–17:30). Those windows show when it is working hardest to thin out the buses.",
  },
  {
    title: "Avoid the commuter peaks and watch the app",
    desc: "The city's tourism site names 7:00–9:00 and 18:00–19:00 as the commuting peaks, on top of cherry-blossom and autumn-leaf season. Kyoto City Bus's Pocket Loca plus+ app shows where a bus is and how full it is.",
  },
  {
    title: "Leave big suitcases out of it",
    desc: "The city asks visitors not to bring large luggage on to buses. Use same-day hotel delivery or storage at the station, or take a train or taxi for that leg.",
  },
];

const subwayLines = [
  {
    title: "Karasuma Line (north–south)",
    desc: "Runs from Kokusaikaikan in the north through Kyoto Station to Takeda in the south. Key stops: Kyoto Station, Kujo (buses toward Higashiyama), Shijo, Karasuma Oike, Imadegawa (buses to Ginkaku-ji) and Kitaoji (buses to Kinkaku-ji).",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
        <line x1="7" y1="21" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    title: "Tozai Line (east–west)",
    desc: "Runs from Rokujizo in the southeast to Uzumasa Tenjingawa in the west. Key stops: Sanjo Keihan, Higashiyama, Nijojo-mae and Uzumasa Tenjingawa, where you change to the Randen for Arashiyama.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
        <line x1="7" y1="21" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    title: "Transfer at Karasuma Oike",
    desc: "The two lines intersect at Karasuma Oike — Kyoto's main transfer hub. From here you can reach anywhere on the subway network, and connecting bus routes extend coverage to areas without a direct subway stop.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
];

const kyotoAccess = [
  {
    title: "From Tokyo: Shinkansen (2 hr 15 min)",
    desc: "The Nozomi (fastest, not JR Pass valid) takes about 2 hours 15 minutes from Tokyo Station. The Hikari (JR Pass valid) takes roughly 2 hours 45 minutes. Trains depart every 10 minutes during peak hours. IC cards do not cover Shinkansen fares — use a separate ticket or JR Pass.",
  },
  {
    title: "From Osaka (Shin-Osaka): Shinkansen (15 min)",
    desc: "The quickest option by train. Alternatively, a Hankyu Kyoto Line Limited Express from Osaka-umeda reaches Kyoto-kawaramachi in about 43 minutes on Hankyu's timetable. It is not JR Pass valid, and it puts you downtown rather than at Kyoto Station.",
  },
  {
    title: "From Kansai Airport (KIX): Haruka Express (75 min)",
    desc: "The JR Haruka runs directly from KIX to Kyoto Station in 75 minutes, stopping at Shin-Osaka. From ¥3,640 non-reserved. Foreign visitors can purchase a discounted Haruka ticket by showing a foreign passport at the JR counter. JR Pass holders ride free — validate your pass at the airport JR counter before boarding.",
  },
];

const tips = [
  {
    title: "Sort out your IC card before you arrive",
    desc: "A card already on your phone, or one bought at the airport, means one less machine to find at Kyoto Station on the busiest day of your trip.",
  },
  {
    title: "Walk between nearby sights — Kyoto rewards it",
    desc: "The Higashiyama area stretches from Kiyomizudera to Nanzenji and is walkable end-to-end in under an hour. Side streets and quiet shrines that buses skip are the best part.",
  },
  {
    title: "Avoid taxis in narrow tourist areas",
    desc: "Central Kyoto streets are tight and traffic around Gion and Higashiyama moves slowly in season. On a short hop, walking is usually the better call.",
  },
  {
    title: "Check the live bus position before you wait",
    desc: "Kyoto City Bus's Pocket Loca plus+ app shows how close a bus is and how crowded it is, which is the fastest way to decide between waiting and walking to a station.",
  },
];

const faqItems = [
  {
    q: "Is the bus free in Kyoto?",
    a: "No. Kyoto city buses are not free for visitors. The flat fare is ¥230 for adults and ¥120 for children, and the EX100 and EX101 Sightseeing Express buses are ¥500 and ¥250. Riders with a Subway & Bus 1-Day Pass pay nothing extra.",
  },
  {
    q: "Do I need a day pass for Kyoto buses?",
    a: "No, only if you will make five or more rides. The old ¥700 Bus 1-Day Pass is gone: sales ended on 30 September 2023 and use ended on 31 March 2024. The current option is the Subway & Bus 1-Day Pass at ¥1,100 (¥550 for children), which also covers both subway lines. At ¥230 a bus ride it pays from the fifth ride. On a lighter day, a pay-as-you-go IC card is cheaper.",
  },
  {
    q: "Can I use my Suica IC card in Kyoto?",
    a: "Yes. Suica, ICOCA and PASMO work on Kyoto City Bus and both subway lines, and transport IC cards are also accepted on the Randen and Kyoto's railways. They do not cover Shinkansen fares, which need a separate ticket or a JR Pass.",
  },
  {
    q: "What is the best way to get from Kyoto Station to Kinkaku-ji?",
    a: "Take the Karasuma subway to Kitaoji (about 15 minutes, ¥260), then bus 205 or 204 to Kinkakuji-michi (about 15 minutes, ¥230). You can also take JR to Emmachi and change to the same buses. Bus 205 runs direct from Kyoto Station, but it is the option most exposed to crowds and delay.",
  },
  {
    q: "How do I get to Arashiyama from central Kyoto?",
    a: "From Kyoto Station, take the JR Sagano Line to Saga-Arashiyama, about 11 minutes by Rapid, then walk about 8 minutes to Togetsu-kyo. From the centre, take the Tozai Line to Uzumasa Tenjingawa and the Randen to Arashiyama (flat ¥250, IC cards accepted), or the Hankyu Line with a change at Katsura. Kyoto's tourism site advises against the city bus from Kyoto Station on this route.",
  },
  {
    q: "What are the EX100 and EX101 buses in Kyoto?",
    a: "They are Kyoto City Bus's Sightseeing Express services, running on Saturdays, Sundays and holidays since 1 June 2024. EX100 stops at Gojo-zaka for Kiyomizu-dera, Gion, Okazaki and Ginkaku-ji, and EX101 runs between Kyoto Station and Gojo-zaka. The fare is ¥500 (¥250 for children), and the Subway & Bus 1-Day Pass covers it. You board at the front.",
  },
  {
    q: "Will tourists pay more for Kyoto buses?",
    a: "Possibly, but not yet. Kyoto City plans a resident-priority fare within fiscal 2027: ¥200 for residents and about ¥350–¥400 for everyone else, subject to national approval. As of 5 November 2026 the only fare in force is the ¥230 flat fare.",
  },
  {
    q: "Is the Kyoto subway English-friendly?",
    a: "Yes. Stations and tickets are straightforward to use in English, and with only two lines there are few ways to go wrong. An IC card removes the ticket machine from the journey altogether.",
  },
  {
    q: "Subway & Bus Pass or Subway-only Pass — which should I buy?",
    a: "Choose the Subway & Bus Pass (¥1,100) if your day mixes buses and subway and reaches five rides. Choose the cheaper Subway-only Pass (¥800) only if you'll stay on the Karasuma and Tozai lines all day. If you'll take just a few rides, skip both and use an IC card.",
  },
  {
    q: "Does the day pass cover JR trains to Arashiyama?",
    a: "No. The pass covers both subway lines, all city buses and set routes on three other bus companies, but not JR. The JR Sagano Line to Saga-Arashiyama and the JR Nara Line to Inari and Uji need a pay-as-you-go IC card or a ticket. The pass also does not work toward Kibune or the Mt Hiei summit.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/kyoto-transportation") } });

export default function KyotoTransportationPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Kyoto Transportation 2026: Getting Around Kyoto by Bus</title>
        <meta
          name="description"
          content="Kyoto Transportation guide: Getting Around Kyoto by subway, JR and the ¥230 city bus, when the ¥1,100 day pass pays, and the fastest routes to each sight."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/kyoto-transportation" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kyoto Transportation 2026: Getting Around Kyoto by Bus" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/kyoto-transportation" />
        <meta property="og:description" content="Kyoto Transportation guide: Getting Around Kyoto by subway, JR and the ¥230 city bus, when the ¥1,100 day pass pays, and the fastest routes to each sight." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kyoto Transportation 2026: Getting Around Kyoto by Bus" />
        <meta name="twitter:description" content="Kyoto Transportation guide: Getting Around Kyoto by subway, JR and the ¥230 city bus, when the ¥1,100 day pass pays, and the fastest routes to each sight." />
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
              route: "/guides/transport/kyoto-transportation",
              headline: "Kyoto Transportation (2026): Getting Around Kyoto by Bus, Subway & Train",
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
                { "@type": "ListItem", position: 1, name: "Home",                        item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",                      item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around",  item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Getting Around Kyoto",        item: "https://www.japan-travel-kit.com/guides/transport/kyoto-transportation" },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Getting Around Kyoto</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Kyoto Transportation (2026):<br />Getting Around Kyoto by Bus, Subway &amp; Train
          </h1>
          <p className={styles.heroSubtitle}>
            Fares, routes and the day-pass sum, taken from the operators&apos; own sites, so you spend the day at the temples and not at a bus stop.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official Fare Table", "Day Pass Break-Even"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Answer-first opening paragraph */}
        <p className={styles.bodyText}>
          The short answer on Kyoto transportation: use the two subway lines, JR and the private railways as your trunk
          routes, and ride the city bus (a flat <strong>¥230</strong>) only for the last stretch. If you will make five or
          more rides in a day, buy the <strong>¥1,100 Subway &amp; Bus 1-Day Pass</strong>; below that, pay per ride with
          ICOCA or Suica. Fares confirmed with Kyoto City&apos;s Transportation Bureau on {CHECKED}.
        </p>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for most visitors</p>
                <p className={styles.verdictStatValue}>Subway + JR, bus last</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Subway &amp; Bus pass</p>
                <p className={styles.verdictStatValue}>¥1,100 (adult)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>IC card works on</p>
                <p className={styles.verdictStatValue}>Buses, subway, JR, Randen</p>
              </div>
            </div>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.verdictBtn}
              target="_blank"
              rel="sponsored noopener"
            >
              Get Suica IC Card on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Fare table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is the best way to get around Kyoto?</h2>
          <p className={styles.bodyText}>
            By train first and bus last. The subway, JR, Keihan and the Randen do not sit in traffic, so use them for the
            long part of each journey, then take a ¥230 bus or walk the last stretch. Each line charges its own fare, as
            the table shows.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", textAlign: "left", color: "var(--text-muted)" }}>
                  One-way fares, confirmed {CHECKED} with Kyoto City Transportation Bureau, Keihan and Keifuku Electric
                  Railway.
                </caption>
                <thead>
                  <tr>
                    {["Mode", "Use it for", "Adult", "Child", "IC card"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.mode}>
                      <td className={styles.tdProvider}>{row.mode}</td>
                      <td className={styles.tdBestFor}>{row.useFor}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.ic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            We could not read an official JR or Hankyu fare for these trips, so we print none. Use the operator&apos;s fare
            search before you travel. Taxis and rental bikes are left out for the same reason.
          </p>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Is Kyoto easy to get around without a car?
          </h3>
          <p className={styles.bodyText}>
            Yes. You do not need a car in Kyoto: every sight on this page has a train or bus route from Kyoto Station, and
            driving puts you in the same traffic as the buses. The harder part is getting the order right, which is why
            the route table below starts with the train.
          </p>
        </section>

        {/* Fastest routes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Routes</span>
          <h2 className={styles.sectionTitle}>How do I get from Kyoto Station to Fushimi Inari, Arashiyama or Kinkaku-ji?</h2>
          <p className={styles.bodyText}>
            Take the JR Nara Line to Inari for Fushimi Inari, the JR Sagano Line to Saga-Arashiyama for Arashiyama, and the
            Karasuma subway plus a bus for Kinkaku-ji. Kiyomizu-dera and Ginkaku-ji are the two where the EX bus is worth
            it on a Saturday, Sunday or holiday. Ride times are the operators&apos; own and leave out walking and waiting.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", textAlign: "left", color: "var(--text-muted)" }}>
                  Confirmed {CHECKED} with JR West&apos;s JR Odekake, Kyoto City Transportation Bureau and the Kyoto City
                  Tourism Association&apos;s kyoto.travel. The subway fare is the 3–7 km band and the bus time is the
                  association&apos;s figure.
                </caption>
                <thead>
                  <tr>
                    {["To", "Route", "Ride time", "Adult fare"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.to}>
                      <td className={styles.tdProvider}>{row.to}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.fare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For where these rides fit into a real day, see{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={{ fontWeight: 600 }}>
              the best things to do in Kyoto
            </Link>
            . In Arashiyama, the{" "}
            <Link href="/guides/attractions/sagano-romantic-train-tickets" style={{ fontWeight: 600 }}>
              Sagano Romantic Train
            </Link>{" "}
            starts a short walk from Saga-Arashiyama Station.
          </p>
        </section>

        {/* Is the bus free */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Bus fares</span>
          <h2 className={styles.sectionTitle}>Is the bus free in Kyoto?</h2>
          <p className={styles.bodyText}>
            No. Kyoto city buses are not free: the flat fare is <strong>¥230 for adults and ¥120 for children</strong>,
            confirmed {CHECKED}. The only way to ride without paying each time is to hold a day pass.
          </p>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            How much is the bus in Kyoto?
          </h3>
          <p className={styles.bodyText}>
            ¥230 a ride for an adult anywhere in the flat-fare area. The EX100 and
            EX101 Sightseeing Express buses cost ¥500 (¥250 for children). Outside the flat-fare area, on numbered-ticket
            buses, the fare depends on where you board and get off, so take a ticket as you board.
          </p>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Will Kyoto bus fares go up for tourists?
          </h3>
          <p className={styles.bodyText}>
            Not yet, but it is planned. Kyoto City&apos;s Transportation Bureau proposes a resident-priority fare within
            fiscal 2027 (April 2027 to March 2028): ¥200 for residents and about ¥350–¥400 for everyone else. It needs
            national approval, and the final fare is not set. The only fare in force on {CHECKED} is ¥230.
          </p>
        </section>

        {/* City Bus section */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>City bus</span>
          <h2 className={styles.sectionTitle}>How do Kyoto city buses work?</h2>
          <p className={styles.bodyText}>
            On most buses you board at the rear and pay at the front as you get off. EX100 and EX101 reverse that: you
            board at the front and pay as you get on. That difference has been in place since the EX buses began on
            1 June 2024.
          </p>
          <div className={styles.stepsList}>
            {busTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Crowds */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Crowds</span>
          <h2 className={styles.sectionTitle}>How do I avoid crowded buses in Kyoto?</h2>
          <p className={styles.bodyText}>
            Ride the subway or a train as far as you can, then take the bus for the last stop or two. Kyoto City&apos;s own
            crowd plan for autumn 2026 says exactly that. The Higashiyama side is where it concentrates its measures.
          </p>
          <div className={styles.stepsList}>
            {crowdTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subway section */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Fast option</span>
          <h2 className={styles.sectionTitle}>How does the Kyoto subway work?</h2>
          <p className={styles.bodyText}>
            Kyoto&apos;s municipal subway has just two lines, and they cross at Karasuma Oike. Fares run from ¥220 to ¥360 by
            distance (child ¥110 to ¥180) and IC cards work on both lines. When buses are stuck in tourist traffic, the
            subway keeps moving.
          </p>
          <div className={styles.whoForGrid}>
            {subwayLines.map((line) => (
              <div key={line.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{line.icon}</div>
                <p className={styles.whoForTitle}>{line.title}</p>
                <p className={styles.whoForDesc}>{line.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IC Card section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Essential tool</span>
          <h2 className={styles.sectionTitle}>Can I use Suica or ICOCA in Kyoto?</h2>
          <p className={styles.bodyText}>
            Yes. Kyoto City Bus names ICOCA, Suica and PASMO, and IC cards also work on both subway lines, JR local trains
            and the Randen. On a flat-fare bus you touch once as you get off. If the balance falls short, the bus takes what
            is on the card and you pay the rest in cash.
          </p>
          <p className={styles.bodyText}>
            For the ways to get a card, including Apple Wallet and which Android phones do and do not work, see our{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ fontWeight: 600 }}>IC card guide</Link>. An IC card does
            not lower the fare: it saves you handling coins at every stop.
          </p>
          <KlookLink
            href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
          >
            Get Suica IC Card on Klook →
          </KlookLink>
        </section>

        {/* Day Pass table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day passes</span>
          <h2 className={styles.sectionTitle}>Which Kyoto day pass should I buy?</h2>
          <p className={styles.bodyText}>
            Buy the ¥1,100 Subway &amp; Bus 1-Day Pass for a day of five or more rides, the ¥800 Subway 1-Day Pass only if
            you will stay on the subway, and neither on a day built around JR. Prices confirmed {CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price", "Coverage", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayPasses.map((p) => (
                    <tr key={p.pass}>
                      <td className={styles.tdProvider}>{p.pass}</td>
                      <td className={styles.tdPrice}>{p.price}</td>
                      <td className={styles.tdNetwork}>{p.coverage}</td>
                      <td className={styles.tdBestFor}>{p.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The pass is sold at City Bus and Subway Information Offices, subway stations, bus depots, some convenience
            stores and on city buses, where it can sell out. It is a separate ticket, not something loaded on to your IC
            card. On your first bus ride you feed it into the reader, which prints the date; after that, show the date to
            the driver as you get off. It is not a 24-hour ticket: it runs until the end of service on the day you use it.
          </p>
          <p className={styles.bodyText}>
            <strong>The ¥700 bus pass is gone.</strong> Older guides still mention a ¥700 Bus 1-Day Pass. Sales ended on
            30 September 2023 and use ended on 31 March 2024, and the bureau moved visitors to the ¥1,100 pass to take
            pressure off the buses.
          </p>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Is the Kyoto subway and bus pass worth it?
          </h3>
          <p className={styles.bodyText}>
            Yes, from five rides. Four ¥230 bus rides come to ¥920 and five come to ¥1,150, so the fifth ride is where the
            ¥1,100 pass wins. It wins sooner on longer subway rides or an EX bus at ¥500. Our{" "}
            <Link href="/guides/transport/kyoto-subway-bus-pass" style={{ fontWeight: 600 }}>Kyoto Subway &amp; Bus Pass guide</Link>{" "}
            works through a full day.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "0.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", padding: "0.6rem 0.75rem", fontSize: "0.82rem", textAlign: "left", color: "var(--text-muted)" }}>
                  Worked from Kyoto City Transportation Bureau&apos;s adult fares, confirmed {CHECKED}.
                </caption>
                <thead>
                  <tr>
                    {["Your day", "Pay per ride", "Cheaper option against ¥1,100"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakEvenRows.map((row) => (
                    <tr key={row.rides}>
                      <td className={styles.tdProvider}>{row.rides}</td>
                      <td className={styles.tdPrice}>{row.payg}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Which pass (or no pass) fits your day?
          </h3>
          <div className={styles.tableWrap} style={{ marginTop: "0.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your day", "Our pick", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passVsRows.map((row) => (
                    <tr key={row.scenario}>
                      <td className={styles.tdProvider}>{row.scenario}</td>
                      <td className={styles.tdPrice}>{row.pick}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            You can also buy a voucher online via Klook in advance and exchange it for the pass after you arrive. If your
            trip also takes in Osaka, Nara or Kobe, compare the JR-only{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ fontWeight: 600 }}>Kansai Area Pass</Link> instead:
            it covers the JR lines to Inari and Saga-Arashiyama, which the Kyoto passes do not.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={PASS_URL} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Book Kyoto Bus &amp; Subway Day Pass on Klook →
            </KlookLink>
            <KlookLink href={jrKansaiAreaPass.url} className={styles.pickCtaInternal} target="_blank" rel="sponsored noopener">
              Check the Kansai Area Pass on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book with the pass"
          heading="What to Book for the Same Day"
          intro="The pass and your IC card sort out the rides inside the city. These are the bookings the rest of the trip needs: a guided day if you would rather skip the routing, a bed on a train line, the shinkansen, and data for live bus positions."
          items={kyotoTransportTripPrep}
        />

        {/* Where to stay for easy transport */}
        <KlookStayAreas
          heading="Where to Stay So Getting Around Is Easy"
          intro="Kyoto's sights are spread out and the buses that reach them crawl in peak season, so a hotel near a subway line or a bus terminus saves real time. Stay where the 100 and 101 bus routes or the two subway lines pass, and most temple days start with a short walk rather than a transfer."
          areas={kyotoStayAreas}
        />

        {/* Getting to/from Kyoto */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Getting here</span>
          <h2 className={styles.sectionTitle}>Getting To and From Kyoto</h2>
          <div className={styles.stepsList}>
            {kyotoAccess.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265372&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F18400-jr-haruka-airport-express-train-tickets-osaka%2F"
              className={styles.pickCta}
              target="_blank"
              rel="sponsored noopener"
            >
              Book Haruka Airport Express on Klook →
            </KlookLink>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
              className={styles.pickCtaInternal}
              target="_blank"
              rel="sponsored noopener"
            >
              Book JR Pass on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>Tips for Getting Around Kyoto</h2>
          <div className={styles.whoForGrid}>
            {tips.map((tip) => (
              <div key={tip.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <p className={styles.whoForTitle}>{tip.title}</p>
                <p className={styles.whoForDesc}>{tip.desc}</p>
              </div>
            ))}
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 6 Nov 2026: the grove, the walk and who needs a guide. */}
            <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Arashiyama Bamboo Forest Tour (2026): Best Time, Tours and Routes From Kyoto</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 6 Nov 2026: three nights in Kyoto, with a day trip. */}
            <Link href="/guides/attractions/kyoto-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto 3 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-6 7 6v11" />
                  <path d="M9 21v-5h6v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Things to Do in Kyoto</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sagano-romantic-train-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sagano Romantic Train Tickets</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 5 Nov 2026: the shrine as a guided walk, with the hike time and trains. */}
            <Link href="/guides/attractions/fushimi-inari-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M6 11h12M8 7v14M16 7v14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fushimi Inari Tour 2026: Hike Time, Hours &amp; Best Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 29 Oct 2026: the two-day plan is where the bus-versus-train
                question on this page actually gets decided, route by route. */}
            <Link href="/guides/attractions/kyoto-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-subway-bus-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="13" rx="2" />
                  <path d="M3 11h18M7 17v2M17 17v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Is the Kyoto Subway &amp; Bus 1-Day Pass Worth It? (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Don&apos;t forget your eSIM</h2>
            <p className={styles.ctaBannerDesc}>
              Google Maps and real-time bus trackers need mobile data. A Japan eSIM means you&apos;re connected before you leave the airport — no SIM swap, no roaming fees.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              Find the Best eSIM for Japan →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
