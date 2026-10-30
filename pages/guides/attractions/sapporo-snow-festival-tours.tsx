import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  asahiyamaZooWinterDayTour,
  jozankeiHotSpringBusTrip,
  jrHokkaidoRailPass,
  klookEsim,
  lakeShikotsuIceFestivalHalfDayTour,
  lakeShikotsuIceFestivalShuttleBus,
  newChitoseSapporoSharedTransfer,
  noboribetsuToyaOtaruDayTour,
  otaruSnowParkDayTour,
  sapporoJozankeiBuddhaDayTour,
  sapporoSnowFestivalStayAreas,
  sapporoSnowFestivalTripPrep,
  sapporoSnowParkHalfDayTour,
  sapporoTvTowerMoiwaSetTicket,
} from "../../../lib/klook-links";

/**
 * The Sapporo Snow Festival, written for the reader searching "Sapporo Snow
 * Festival Tours". Added 30 Oct 2026, deliberately early: the 2027 dates are
 * already published and the eight nights they cover are the booking this event
 * actually requires.
 *
 * The honest shape of this page, and the reason it is not a tour round-up:
 * the festival itself is free and needs no tour. The organising committee's own
 * FAQ says so in one line — 「全会場無料です」 — and all three sites are a park,
 * a street and a city sports hall. So the page answers the four questions a
 * reader has (when, where, is it free, do I need a tour) before it sells
 * anything, and what it then sells is the week around the festival: the days
 * out of Sapporo that only run in this season, the airport leg, the island pass
 * and the rooms. Nothing on Klook sells the Snow Festival, and this page does
 * not pretend otherwise.
 *
 * How it differs from japan-winter-itinerary, which also carries these dates:
 * that page is a twelve-day national route with a February Hokkaido variant;
 * this one is the event, its three sites, its hours and its arithmetic.
 *
 * Sources. Read on 30 October 2026:
 *   snowfes.com/news/948.html  the committee's own announcement of the 77th
 *                              edition — 「2027年2月4日（木）から11日（木・祝）
 *                              の8日間」, the Odori site 「西1丁目から西11丁目」,
 *                              the Susukino site 「南4条通から南6条通までの駅前
 *                              通」, the Tsudome site at the city sports facility,
 *                              and さっぽろスノースポーツパーク2027 on 12–14
 *                              February 2027 as a linked event.
 *   snowfes.com/faq/           「全会場無料です」 — all sites free; Odori viewable
 *                              at any time with lighting to 22:00; Susukino
 *                              viewable at any time with illumination to 23:00
 *                              (22:00 on the final day); Tsudome 10:00–16:00,
 *                              with attraction reception possibly closing early
 *                              when crowded.
 *   snowfes.com/news/946.html  the notice that closed the 76th festival on
 *                              11 February 2026 and announced the 2027 dates in
 *                              the same breath — which is why the dates have been
 *                              public for eight months.
 *   jrhokkaido.co.jp/airport/  特別快速「エアポート」最速33分 and 快速「エアポー
 *                              ト」最速37分 between Sapporo and New Chitose, six
 *                              trains an hour in the daytime, 札幌〜新千歳空港
 *                              1,230円, and the uシート reserved seat at ¥1,000
 *                              (¥800 ticketless) on top of the fare.
 *   jrhokkaido.co.jp/global/   JR Hokkaido's own Sapporo↔Otaru page: the Rapid
 *     .../travel/airport_otaru   Airport at about 33 to 41 minutes, the local at
 *                              about 46, and an ¥800 fare, with the reserved seat
 *                              at ¥1,000 on top.
 *   city.sapporo.jp            the Transportation Bureau's own fares — a one-zone
 *     /st/josyaken/            subway ride at ¥210 adult and ¥110 child, the
 *                              weekday 地下鉄専用1日乗車券 at ¥830 and ¥420, and
 *                              the weekend-and-holiday ドニチカキップ at ¥520 and
 *                              ¥260.
 *   snowfes.com/news/842.html  the Tsudome shuttle as run in 2026: Eiwamachi
 *                              (栄町) subway station to the site, ¥200 adult one
 *                              way, cash only, free for children of elementary
 *                              age and under, for over-65s and for disabled
 *                              visitors, with no subway-to-shuttle transfer
 *                              discount. Labelled as the 2026 arrangement
 *                              throughout, because the 2027 shuttle has not been
 *                              announced.
 *
 * Carried from japan-winter-itinerary, where they were read off the Japan
 * Meteorological Agency's 1991–2020 normals for Sapporo (station 47412) on
 * 28 October 2026: the February monthly mean of −2.7°C, the mean daily maximum
 * of 0.4°C and minimum of −6.2°C, and February snowfall of 116 cm.
 *
 * Deliberately absent: a visitor-number figure. The committee publishes one per
 * edition as a PDF and the two site totals in the 2026 release did not add to
 * the headline total an automated read returned, so no figure here would be
 * reliable. The booking argument is made from the published dates instead.
 *
 * Nothing here is first-hand, and no Klook price appears: Klook answers
 * automated reads of its product pages with HTTP 403.
 */

/** Figures read off the official sites for this page. */
const OWN_ISO = "2026-10-30";
const OWN = checkedLabel(OWN_ISO);

/** JMA normals, carried from our winter itinerary. */
const JMA_CHECKED = checkedLabel("2026-10-28");

const FEB_MEAN = "−2.7°C";
const FEB_MAX = "0.4°C";
const FEB_MIN = "−6.2°C";
const FEB_SNOW = "116 cm";
const AIRPORT_FARE = "¥1,230";
const SUBWAY_FARE = "¥210";
const SUBWAY_DAY_PASS = "¥830";
const DONICHIKA = "¥520";
const SHUTTLE_FARE = "¥200";

/** The three sites, straight off the committee's announcement and FAQ. */
const siteRows = [
  {
    site: "Odori site (大通会場)",
    where: "Odori Park, West 1 to West 11 — eleven blocks in a straight line, starting at the foot of the Sapporo TV Tower",
    when: "Viewable at any time during the festival; sculptures lit until 22:00",
    cost: "Free",
    what: "The large snow sculptures, the citizens' sculpture competition and the food stalls. This is the site people mean when they say the Snow Festival",
  },
  {
    site: "Susukino site (すすきの会場)",
    where: "Ekimae-dori between South 4 and South 6 — the main street through the nightlife district",
    when: "Viewable at any time; illuminated until 23:00, and until 22:00 on the final day",
    cost: "Free",
    what: "Ice sculptures rather than snow ones, at street level between the bars. The latest-running of the three, and a short walk or one subway stop from Odori",
  },
  {
    site: "Tsudome site (つどーむ会場)",
    where: "The Sapporo city sports facility 「つどーむ」, out at the north-east end of the Toho subway line",
    when: "10:00–16:00 only. Attraction reception can close earlier when crowded",
    cost: "Free to enter; some attractions inside are paid",
    what: "Snow slides, snow rafting and the hands-on activities — the family site, and the only one with a closing time rather than a lighting time",
  },
];

/** What Klook actually sells around the festival, and when each one fits. */
const tourRows = [
  {
    tour: "Otaru, Shiroi Koibito Park & snow park day",
    adds: "The canal town 33 to 41 minutes west by Rapid Airport, its steam clock and a snow-play stop, as one booked day",
    fits: "A full day. Pair it with a festival evening rather than with another day out",
    note: "Otaru runs its own Snow Light Path in the same stretch of February, which is the reason this day is better in festival week than in December",
  },
  {
    tour: "Asahiyama Zoo winter day trip",
    adds: "Asahikawa's zoo in the one season the penguins walk, plus the Biei hills, with a snowmobile stop offered inside the booking",
    fits: "A long full day — the furthest of these from Sapporo",
    note: "A winter-season departure rather than a year-round one, so the listing itself is only open for part of the year",
  },
  {
    tour: "Lake Shikotsu ice festival, as a half day or a shuttle seat",
    adds: "The other February ice event on this side of Hokkaido, lit after dark",
    fits: "A half day or an evening, which is exactly the shape of a festival day with a free afternoon",
    note: "Sold both ways: as a guided half day and as a plain round-trip coach seat. The seat is the cheaper way to go if you do not want a guide",
  },
  {
    tour: "Jozankei — the hot-spring day, or the Hill of the Buddha day",
    adds: "The gorge and onsen town under an hour south of the city, or the same trip with Tadao Ando's Hill of the Buddha and Shiroi Koibito Park attached",
    fits: "Either a half day or a full one, depending on which listing",
    note: "The best answer to the real problem of a festival trip: the sites are outdoors and you will want an indoor middle to the day",
  },
  {
    tour: "Wonderland Sapporo snow park half day",
    adds: "A snow park outside the city with hotel pick-up and a Genghis Khan barbecue",
    fits: "A half day",
    note: "The listing is specifically the version for travellers not carrying ski gear, which is most people on a festival trip",
  },
  {
    tour: "Noboribetsu, Lake Toya & Otaru day",
    adds: "A panoramic run south and west — the hot-spring valley, the caldera lake and the canal town in one day",
    fits: "A long full day, for a trip with a spare one",
    note: "Worth it on a four-or-more-day trip. On three days it costs you a festival evening you cannot get back",
  },
];

/** Getting between the sites and in from the airport, on the operators' own figures. */
const transportRows = [
  {
    leg: "New Chitose Airport → Sapporo, Rapid Airport",
    time: "33 minutes at fastest on the Special Rapid, 37 on the Rapid",
    fare: `${AIRPORT_FARE} adult; the uシート reserved seat is ¥1,000 more, or ¥800 bought ticketless`,
    note: `JR Hokkaido runs six of these an hour in the daytime — one Special Rapid, three Rapid and two Section Rapid. Read ${OWN}.`,
  },
  {
    leg: "New Chitose Airport → Sapporo, booked transfer",
    time: "By road, so weather-dependent in February",
    fare: "Per seat, by date — Klook blocks automated price reads, so open the listing",
    note: "The listing requires 45 minutes after a domestic arrival and 90 after an international one, which makes it a before-you-fly booking rather than an on-the-day one.",
  },
  {
    leg: "Sapporo Station → Odori",
    time: "One subway stop, or about 10 minutes on foot — much of it underground",
    fare: `${SUBWAY_FARE} adult, ¥110 child for a one-zone ride`,
    note: `The underground concourse between the two stations is the reason a Sapporo Station base works in February at all. Fares read ${OWN}.`,
  },
  {
    leg: "Odori → Susukino",
    time: "One subway stop on the Namboku line, or a walk of a few blocks",
    fare: `${SUBWAY_FARE} adult`,
    note: "The two sites are close enough that most people walk it, and the Susukino lights run an hour later than Odori's.",
  },
  {
    leg: "Sapporo → Tsudome site",
    time: "Toho subway line to Eiwamachi, then a shuttle bus",
    fare: `In 2026 the shuttle was ${SHUTTLE_FARE} adult one way, cash only; free for children of elementary age and under, over-65s and disabled visitors`,
    note: "The 2026 arrangement, from the committee's own notice — the 2027 shuttle has not been announced. There was no subway-to-shuttle transfer discount, and the site closes at 16:00.",
  },
  {
    leg: "Subway day tickets",
    time: "One calendar day",
    fare: `${SUBWAY_DAY_PASS} adult and ¥420 child on a weekday; ${DONICHIKA} and ¥260 at weekends, on public holidays and 29 December to 3 January`,
    note: `Sapporo City Transportation Bureau's own prices, read ${OWN}. Against a ${SUBWAY_FARE} one-zone ride, the weekend ticket pays from three rides and the weekday one from four.`,
  },
];

const bookingWindow = [
  {
    title: "Now, if your trip is February 2027 — the room",
    desc: "The dates have been public since 11 February 2026, when the committee announced them in the same notice that closed the 76th festival. Eight fixed nights in one city, known a year ahead, is the definition of a date everyone books early. We publish no occupancy figure because none is published — but this is the only part of a festival trip with no fallback.",
  },
  {
    title: "Before you fly — the airport leg and the island pass",
    desc: "The train is ¥1,230 and needs nothing booked, but a February road transfer does: the shared listing requires 45 minutes after a domestic arrival and 90 after an international one. The JR Hokkaido Rail Pass only pays if the trip leaves the city for Otaru, Asahikawa or Noboribetsu — price it against single fares rather than buying it by default.",
  },
  {
    title: "Weeks ahead — the seasonal day trips",
    desc: "The Asahiyama Zoo winter day, the Lake Shikotsu ice festival half day and the snow parks are seasonal listings rather than year-round ones, and they run in exactly the weeks the festival does. That is also when the coaches out of Sapporo are fullest, which is the argument for holding one before you arrive.",
  },
  {
    title: "Nothing at all — the festival itself",
    desc: "All three sites are free on the committee's own FAQ. Odori and Susukino are a park and a street you walk into at any hour, and Tsudome is free to enter with some paid attractions inside. There is no ticket, no slot and nothing to book, which is the single most useful fact on this page.",
  },
];

const faqItems = [
  {
    q: "When is the Sapporo Snow Festival 2027?",
    a: `4 to 11 February 2027 — eight days. The organising committee's own announcement reads 「2027年2月4日（木）から11日（木・祝）の8日間」, so the dates are confirmed rather than estimated, and they cover all three sites. A linked event, さっぽろスノースポーツパーク2027, follows on 12 to 14 February 2027. One thing worth knowing about the Tsudome site: it is the only one with a closing time, 10:00 to 16:00, rather than a lighting time. Read on ${OWN}. The committee publishes the following year's dates as it closes each edition — the 2027 dates were announced on 11 February 2026 — so if you are reading this for 2028, that notice is where it will appear first.`,
  },
  {
    q: "Is the Sapporo Snow Festival free?",
    a: `Yes. The committee's own FAQ answers it in three characters — 「全会場無料です」, all venues free — and nothing on the festival requires a ticket. The practical version, read on ${OWN}: the Odori site is a public park, viewable at any time during the eight days, with the sculptures lit until 22:00. The Susukino site is a public street, viewable at any time, illuminated until 23:00 and until 22:00 on the final day. The Tsudome site is free to enter and open 10:00 to 16:00, with some of the activities inside charged separately and attraction reception liable to close early when it is crowded. So the money on a festival trip goes on the room, the flight and the days out — not on the festival.`,
  },
  {
    q: "Do I need a tour for the Sapporo Snow Festival?",
    a: `No — and you should be suspicious of anything sold as one. All three sites are free and walk-in, Odori and Susukino are a park and a street a few blocks apart, and the Tsudome site is a subway ride plus a short shuttle. There is no queue to skip and no ticket to hold. What a tour is genuinely useful for on this trip is the other half of each day: the festival sites are entirely outdoors in a month whose mean daily maximum is ${FEB_MAX}, so most people want an indoor or out-of-town middle to the day and a lit evening at Odori. That is what the listings on this page are — the Otaru canal day, the Asahiyama Zoo winter day, the Lake Shikotsu ice festival in the evening, a Jozankei onsen half day, a snow park. None of them is a Snow Festival tour, because none exists and none is needed.`,
  },
  {
    q: "Where should I stay for the Snow Festival?",
    a: `Sapporo Station or Susukino, and the difference is which end of the evening you care about. Sapporo Station is one subway stop from Odori and much of the walk between the two is underground, which matters more than any view when the mean February daily maximum is ${FEB_MAX} — and it is where the Rapid Airport from New Chitose puts you down. Susukino puts the ice-sculpture site on the street outside: that site runs along Ekimae-dori between South 4 and South 6 and is lit until 23:00, so the late half of the festival ends in a walk rather than a last train. Otaru — 33 to 41 minutes out on the JR Hakodate Line by Rapid Airport and ¥800 on JR Hokkaido's own figures — is the sensible fallback if Sapporo is full, and runs its own Snow Light Path in the same weeks. Whatever you choose, the dates have been public since February 2026, so this is the booking to settle first.`,
  },
  {
    q: "How cold is Sapporo in February and what should I wear?",
    a: `Cold enough that it changes what you pack, but not expedition cold. On the Japan Meteorological Agency's 1991–2020 normals for Sapporo, February averages ${FEB_MEAN} for the month, with a mean daily maximum of ${FEB_MAX} and a mean daily minimum of ${FEB_MIN}, and ${FEB_SNOW} of snowfall in the month. Read ${JMA_CHECKED}. Three things follow. The daily maximum sits at about freezing, so the snow sculptures are not melting and the ground is not wet — it is hard-packed and slippery, which makes footwear with grip the single most useful item. Every building, shop, train and subway concourse is heated hard, so layers you can shed beat one thick coat you cannot. And the sculptures are best after dark, which is when the temperature is at its minimum rather than its mean: that evening hour at Odori is the coldest part of the trip and the reason gloves, a hat and something over your face are not optional.`,
  },
  {
    q: "How do I get from New Chitose Airport to Sapporo?",
    a: `The Rapid Airport train, in 33 to 37 minutes for ${AIRPORT_FARE}. JR Hokkaido's own figures, read ${OWN}: the Special Rapid is 33 minutes at fastest and the Rapid 37, with six services an hour through the middle of the day — one Special Rapid, three Rapid and two Section Rapid. Car 4 is the reserved uシート, which costs ¥1,000 on top of the fare or ¥800 if you reserve it ticketless, and is worth it in February precisely because the ordinary cars fill with ski bags. The alternative is a booked road transfer, which has one genuine advantage for a festival trip — it ends at your hotel door rather than at a station with cases in the snow — and one condition: the listing requires 45 minutes after a domestic arrival and 90 after an international one, so it is bought before you fly.`,
  },
  {
    q: "How do you get between the three festival sites?",
    a: `Odori and Susukino on foot, Tsudome by subway and shuttle. Odori and Susukino are a few blocks apart on the same street, one Namboku Line stop if the weather is against you, and Sapporo Station is one stop the other way with an underground concourse most of the distance. A one-zone subway ride is ${SUBWAY_FARE} for an adult and ¥110 for a child. Tsudome is the outlier: the Toho Line to Eiwamachi and then a shuttle bus, which in 2026 was ${SHUTTLE_FARE} for an adult one way, cash only, and free for children of elementary age and under, for over-65s and for disabled visitors — with no transfer discount from the subway. The 2027 shuttle has not been announced. If you are making three or more subway rides in a day, the Transportation Bureau's day tickets are ${SUBWAY_DAY_PASS} on a weekday and ${DONICHIKA} at weekends and on public holidays. All fares read ${OWN} except the shuttle, which is the 2026 notice.`,
  },
  {
    q: "How many days do you need for the Sapporo Snow Festival?",
    a: `Three nights is the honest minimum and four is better. The festival itself is two half-days: an afternoon at Odori to see the carving detail and an evening at Odori and Susukino to see them lit, which are genuinely different experiences of the same sculptures. Tsudome is a third half-day and only worth it with children, because it closes at 16:00 and is the furthest out. That leaves the rest of your days for the things that are only sold in this season — the Otaru canal day, the Asahiyama Zoo winter departure, the Lake Shikotsu ice festival evening, a Jozankei onsen afternoon. Two nights works but spends one of them on the airport legs; five lets you add Noboribetsu or Lake Toya without giving up a lit evening.`,
  },
  {
    q: "Is the Snow Festival good for children?",
    a: `The Tsudome site is built for them, and it is the one with rules attached. It is free to enter, open 10:00 to 16:00, and the snow slides and snow rafting are the point of it — but some attractions inside are paid and the committee's own FAQ warns that reception can close earlier than 16:00 when it is crowded, so this is a morning rather than an afternoon. The Odori and Susukino sites are free, open at any hour and fine with children, with the obvious caveat that the best viewing is after dark at the coldest point of the day. Two cost notes: the Tsudome shuttle was free for children of elementary age and under in 2026, and a child's subway day ticket is ¥420 on a weekday and ¥260 at a weekend against a ¥110 one-zone ride.`,
  },
  {
    q: "Is the JR Hokkaido Rail Pass worth it for a festival trip?",
    a: `Only if the trip leaves Sapporo. The airport leg is ${AIRPORT_FARE} each way on JR Hokkaido's own figure, so a return airport run is about ¥2,460 — nowhere near a pass. The pass starts to pay when Otaru, Asahikawa or Noboribetsu are also on the plan as independent trips rather than as booked coach days, because those are the legs with real fares attached. A festival trip that stays in the city and buys two guided days does not need it at all: the guided days include their own transport, and inside Sapporo the Transportation Bureau's ${SUBWAY_DAY_PASS} weekday and ${DONICHIKA} weekend subway tickets are the only pass that does anything. Price it against your own legs before you buy — that is the whole method, and it is the same one our JR Pass guide uses for the national pass.`,
  },
  {
    q: "What else is on in Hokkaido during festival week?",
    a: `Two things that are worth planning around. The committee's own announcement adds さっぽろスノースポーツパーク2027 on 12 to 14 February 2027, immediately after the festival closes — so a trip that arrives late in the eight days catches both. And the Lake Shikotsu ice festival runs in the same stretch of February, south of the city, which is why it is sold both as a guided half day and as a plain shuttle seat. Otaru's Snow Light Path is the third, in the same weeks and the same 33 to 41 minutes west. Dates and the linked event read on ${OWN} from the committee's notice; the Otaru and Lake Shikotsu events are the ones the Klook listings on this page cover, so check the exact dates on the listing for your year before you build an evening on either.`,
  },
];

const TITLE = "Sapporo Snow Festival Tours (2027): 4–11 Feb, Free Sites";
const DESCRIPTION =
  "Sapporo Snow Festival tours, and what you need: the 77th festival runs 4–11 February 2027 across three free sites, so the tours are the days around it.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/sapporo-snow-festival-tours") },
});

export default function SapporoSnowFestivalToursPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/sapporo-snow-festival-tours" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/sapporo-snow-festival-tours" />
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
            __html: articleJsonLd({
              route: "/guides/attractions/sapporo-snow-festival-tours",
              headline: TITLE,
              description: DESCRIPTION,
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
                  name: "Sapporo Snow Festival Tours",
                  item: "https://www.japan-travel-kit.com/guides/attractions/sapporo-snow-festival-tours",
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
          <span className={styles.breadCurrent}>Sapporo Snow Festival Tours</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sapporo Snow Festival Tours (2027):<br />the Dates, the Free Sites and What to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Eight days, three sites, no ticket. The tours worth booking are the days around the festival —
            and the room is the only thing with no fallback.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2027 dates from the committee", "All three sites free", "Fares and hours, dated"].map((t) => (
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
                <p className={styles.verdictStatLabel}>When</p>
                <p className={styles.verdictStatValue}>4–11 February 2027, eight days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Odori, Susukino and Tsudome</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Admission</p>
                <p className={styles.verdictStatValue}>Free at all three sites</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Do you need a tour?</p>
                <p className={styles.verdictStatValue}>No — book the room and the days out</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              Looking for <strong>Sapporo Snow Festival tours</strong>, the first thing to know is that you do
              not need one. The <strong>77th Sapporo Snow Festival runs 4 to 11 February 2027</strong>, eight
              days, across three sites — <strong>Odori Park from West 1 to West 11</strong>,{" "}
              <strong>Susukino on Ekimae-dori between South 4 and South 6</strong>, and the{" "}
              <strong>Tsudome</strong> city sports facility — and the organising committee&apos;s own FAQ says
              all of them are <strong>free</strong>. Odori is viewable at any hour with the sculptures lit
              until <strong>22:00</strong>, Susukino until <strong>23:00</strong> (22:00 on the final day), and
              Tsudome is open <strong>10:00–16:00</strong> with some paid activities inside. There is no
              ticket, no slot and no queue to skip. What is worth booking is the week around it: the room,
              which is the only part with no fallback, and the out-of-town days that run only in this season —
              Otaru, Asahiyama Zoo, the Lake Shikotsu ice festival, a Jozankei onsen afternoon. February in
              Sapporo averages <strong>{FEB_MAX}</strong> for a daily maximum, which is why every festival day
              needs an indoor middle. Festival details read on {OWN}; the temperature normal{" "}
              {JMA_CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={sapporoSnowFestivalStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Sapporo Hotels for Those Dates →
              </KlookLink>
              <KlookLink href={otaruSnowParkDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                The Otaru Day Out →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Dates and sites */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Dates &amp; sites</span>
          <h2 className={styles.sectionTitle}>When Is the Sapporo Snow Festival 2027, and Where?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>4 to 11 February 2027</strong>, eight days, on the organising committee&apos;s own
            announcement — 「2027年2月4日（木）から11日（木・祝）の8日間」. These are confirmed dates, not an
            estimate from previous years, and the same notice names all three sites and their boundaries. A
            linked event, the Sapporo Snow Sports Park, follows on <strong>12 to 14 February 2027</strong>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Site", "Where exactly", "Hours", "Admission", "What is there"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteRows.map((row) => (
                    <tr key={row.site}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.site}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Dates and site boundaries from the Sapporo Snow Festival Executive Committee&apos;s own
            announcement of the 77th edition; the hours and the admission line from the committee&apos;s own
            FAQ, which answers the fee question with 「全会場無料です」. Both read on {OWN}. The committee
            notes that 2027 information will be updated as it is confirmed, so check the site boundaries again
            closer to the date — and note that the Susukino site&apos;s southern limit moved from South 7 in
            2026 to South 6 for 2027.
          </p>
        </section>

        {/* Free, and no tour needed */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Is it free?</span>
          <h2 className={styles.sectionTitle}>Is the Sapporo Snow Festival Free, and Do You Need a Tour?</h2>
          <p className={styles.bodyText}>
            Free, and no. The committee&apos;s FAQ answers the fee question in one line —{" "}
            <strong>「全会場無料です」</strong>, all venues free — and nothing about the festival requires a
            ticket. The Odori site is a public park you walk into at any hour of the eight days. The Susukino
            site is a public street. The Tsudome site is free to enter, with some of the activities inside
            charged separately and, on the committee&apos;s own warning, reception that can close before 16:00
            when it is busy. Read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            That makes this unusual among the events on this site: there is no queue to skip, no timed entry,
            and so no honest version of a &ldquo;skip the line&rdquo; product. We could find no Klook listing
            that sells the Sapporo Snow Festival itself, and there should not be one. What a booking genuinely
            buys on a festival trip is the <strong>other half of each day</strong>. The sites are entirely
            outdoors in a month whose mean daily maximum is <strong>{FEB_MAX}</strong> on the JMA normals, and
            the sculptures are at their best after dark — so the shape of a good festival day is an
            out-of-town morning or an indoor afternoon, then a lit evening at Odori and Susukino. The listings
            below are that first half.
          </p>
          <p className={styles.bodyText}>
            One ticket is worth a mention because of where it is rather than what it is: the{" "}
            <strong>Sapporo TV Tower</strong> observation deck stands at West 1, which is exactly where the
            Odori site&apos;s eleven blocks of sculptures begin, so it is the one paid thing at this festival
            that shows you something walking cannot — the whole site in a straight line, lit.{" "}
            <KlookLink href={sapporoTvTowerMoiwaSetTicket.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See the TV Tower and Moiwa set ticket →
            </KlookLink>
          </p>
        </section>

        {/* The tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The tours</span>
          <h2 className={styles.sectionTitle}>Which Tours Are Worth Booking in Festival Week?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The ones that are only sold in this season, and the ones that give an outdoor day an indoor
            middle. Every listing below was confirmed live and on sale on {OWN}; none of them is a Snow
            Festival tour, and each row says what it actually adds and what shape of day it fits. No prices
            appear, because Klook answers automated reads of its product pages with an error — open the
            listing for the figure on your dates.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Listing", "What it adds", "What shape of day", "The thing to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adds}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fits}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>How to choose between them.</strong> If you have three nights, take one full day out and
            one half day, and keep two evenings for Odori and Susukino lit — the carving detail in daylight
            and the lighting after dark are different experiences of the same sculptures, and most people
            regret missing one. If you have four or more, the long Noboribetsu and Lake Toya day becomes
            worth it. If you are travelling with children, Tsudome in the morning and a snow park in the
            afternoon is the version of this trip that works. And whatever you book, check the cancellation
            window: these are February departures in Hokkaido, and a coach day is the thing a snow day takes
            away.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={otaruSnowParkDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Otaru &amp; snow park day →
            </KlookLink>
            <KlookLink href={asahiyamaZooWinterDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Asahiyama Zoo winter day →
            </KlookLink>
            <KlookLink href={lakeShikotsuIceFestivalHalfDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Lake Shikotsu ice festival →
            </KlookLink>
            <KlookLink href={jozankeiHotSpringBusTrip.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Jozankei onsen day →
            </KlookLink>
          </div>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay for the Snow Festival?</h2>
          <p className={styles.bodyText}>
            <strong>Sapporo Station or Susukino</strong>, and the choice is about which end of the evening
            matters to you. Sapporo Station is one subway stop from Odori with much of the walk underground,
            and it is where the Rapid Airport train from New Chitose puts you down — on eight outdoor days at
            a mean daily maximum of {FEB_MAX}, being able to go back indoors between sites is worth more than
            a view. <strong>Susukino</strong> puts the ice-sculpture site on the street outside and is lit
            until 23:00, so the late half of the festival is a walk home. <strong>Otaru</strong>, 33 to 41
            minutes west on the JR Hakodate Line by Rapid Airport, is the fallback when Sapporo is full and runs its own Snow
            Light Path in the same weeks.
          </p>
          <p className={styles.bodyText}>
            On timing, we will be precise about what is and is not verified. The{" "}
            <strong>dates have been public since 11 February 2026</strong>, when the committee announced the
            2027 edition in the same notice that closed the 76th — so eight fixed nights in one city have been
            known for eight months, which is the strongest argument there is for booking early. What we
            deliberately do not publish is an occupancy or sell-out figure: none is published, and we are not
            going to invent one. Treat the room as the booking with no fallback and everything else as
            flexible.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Three Bases Above"
          intro="Which rooms are left and at what price is a per-date question, so each base links into Klook's own hotel search for it. For festival dates the thing to compare is not the nightly rate but how far you are from a heated building — which is what the why line on each one is about."
          areas={sapporoSnowFestivalStayAreas}
        />

        {/* Weather */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather &amp; clothing</span>
          <h2 className={styles.sectionTitle}>How Cold Is Sapporo in February, and What Should You Wear?</h2>
          <p className={styles.bodyText}>
            On the Japan Meteorological Agency&apos;s 1991–2020 normals for Sapporo, February averages{" "}
            <strong>{FEB_MEAN}</strong> for the month, with a <strong>mean daily maximum of {FEB_MAX}</strong>{" "}
            and a <strong>mean daily minimum of {FEB_MIN}</strong>, and <strong>{FEB_SNOW}</strong> of snowfall
            across the month. Read {JMA_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Three practical consequences, all of which follow from those numbers rather than from anyone&apos;s
            impressions. First, a daily maximum at about freezing means the snow underfoot is hard-packed and
            slippery rather than wet, so grip matters more than waterproofing — this is the single most useful
            thing to get right. Second, every building, train and subway concourse in Sapporo is heated hard,
            which makes layers you can shed better than one thick coat you cannot; the underground concourse
            between Sapporo Station and Odori exists for exactly this reason and is part of how you plan a
            festival evening. Third, the sculptures are best after dark, which is when the temperature is at
            its minimum rather than its mean — so the hour you most want to be outside is the coldest hour of
            the day, and gloves, a hat and something over your face are not optional extras. Our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link> carries the
            same JMA normals for Tokyo, Kyoto and Osaka beside Sapporo&apos;s, which is the comparison that
            explains why Hokkaido needs different clothes from the rest of a Japan trip.
          </p>
        </section>

        {/* Getting there and around */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get From New Chitose Airport to Sapporo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The <strong>Rapid Airport train, in 33 to 37 minutes for {AIRPORT_FARE}</strong>. That is JR
            Hokkaido&apos;s own figure and it is the answer for almost every arrival. The table below adds the
            rest: what the reserved seat costs, how you reach each festival site, and the two subway day
            tickets — each against the operator&apos;s own published price.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "Time", "Fare", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.leg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things to decide rather than read. The <strong>uシート reserved seat</strong> on car 4 costs
            ¥1,000 on top of the fare, or ¥800 reserved ticketless, and in February it earns that: the
            ordinary cars fill with ski bags on the airport run. And the{" "}
            <strong>JR Hokkaido Rail Pass</strong> only pays if the trip leaves the city — a return airport run
            is about ¥2,460 of fares, so the pass is a decision about Otaru, Asahikawa and Noboribetsu rather
            than about the airport. Price it against your own legs. Fares read {OWN}; our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> uses the same method for the
            national pass.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={newChitoseSapporoSharedTransfer.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              New Chitose → Sapporo transfer →
            </KlookLink>
            <KlookLink href={jrHokkaidoRailPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR Hokkaido Rail Pass →
            </KlookLink>
            <KlookLink href={lakeShikotsuIceFestivalShuttleBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Lake Shikotsu shuttle seat →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One more arrival-day booking that is not transport: data. Three outdoor sites, a shuttle whose
            2027 timetable is not yet published, and February weather that changes a plan on the day — every
            notice about any of that arrives on your phone rather than at a counter.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against the
            alternatives.
          </p>
        </section>

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>What Do You Actually Need to Book, and When?</h2>
          <p className={styles.bodyText}>
            Four things, in this order — and the festival is not one of them. Sorted by how far ahead each has
            to be settled.
          </p>
          <div className={styles.whoForGrid}>
            {bookingWindow.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Cancellation terms matter more on this trip than on most, for a reason specific to Hokkaido in
            February: a snow day does not close the festival — the sites are outdoors and free, and the
            sculptures are still there — but it can close a road out of the city and hold a flight. So check
            the window on any coach day you book, and if you are flying on the last morning, do not book the
            first departure of the day out of New Chitose.
          </p>
        </section>

        {/* Trip prep */}
        <KlookTripPrep
          label="Before you go"
          heading="What a Festival Trip Books Before It Flies"
          intro="Four bookings sit outside the eight days themselves: data, the island pass to price against your route, the airport leg as a seat rather than a platform, and the room — which on fixed dates announced a year ahead is the one with no fallback. Klook blocks automated price reads, so open a listing for the figure on your own dates."
          items={sapporoSnowFestivalTripPrep}
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

        {/* Klook tours */}
        <KlookTourPicks
          heading="The Days Out That Only Run in This Season"
          intro="Four seasonal departures out of Sapporo, for the half of each festival day that is not spent at Odori. All of them are winter-only or winter-weighted listings rather than year-round ones, which is why they are worth opening before you arrive rather than on the morning."
          tours={[otaruSnowParkDayTour, asahiyamaZooWinterDayTour, sapporoJozankeiBuddhaDayTour, noboribetsuToyaOtaruDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/japan-winter-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Winter Itinerary: 12 Days, Day by Day (2027)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-ski-travel-insurance" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Ski Travel Insurance (2027): What Actually Needs Covering</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-illumination-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Illumination Tours (2026): Dates, Free Spots and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide (2026): Prices, Coverage and Whether It Pays</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="2" width="12" height="20" rx="2" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan (2026): Providers, Prices and Which to Pick</p>
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
            <h2 className={styles.ctaBannerTitle}>Eight free days, and one booking with no fallback</h2>
            <p className={styles.ctaBannerDesc}>
              The festival costs nothing and needs nothing booked. The room for 4 to 11 February 2027 does —
              and so do the out-of-town days that only run in these weeks.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={sapporoSnowFestivalStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Sapporo Hotels →
              </KlookLink>
              <KlookLink href={sapporoSnowParkHalfDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Snow Park Half Day →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
