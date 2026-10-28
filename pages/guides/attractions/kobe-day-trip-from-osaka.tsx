import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kisshokichiKobeBeefCourse,
  klookEsim,
  kobeBeefHarbourKitanoDayTour,
  kobeBeefSakuraTeppanyaki,
  kobeFerrisKitanoArimaRokkoDayTour,
  kobeHimejiPrivateTourBeefLunch,
  kobePrivateHalfDayWalkingTour,
  kobeSandaOutletArimaBeefLunchTour,
  osakaStayAreas,
  rokkosanTouristPass,
} from "../../../lib/klook-links";

/**
 * A Kobe day trip out of Osaka, written as a routes-and-reservations guide.
 * Added 27 Oct 2026.
 *
 * Every figure on this page was read off an operator's or an official tourism
 * body's own site on 27 October 2026:
 *  - the approximately 30 minutes between Sannomiya and Osaka-Umeda "by JR,
 *    Hanshin or Hankyu lines", and the three rail legs back from Arima Onsen,
 *    from feel-kobe.jp — VISIT KOBE, the Kobe Tourism Bureau's own travel guide;
 *  - the ¥600 adult / ¥300 child Osaka-Namba to Kobe-Sannomiya fare, from
 *    Hanshin Electric Railway's own English fare table;
 *  - the Hankyu One-Day Pass FY2026 price, coverage and validity, from
 *    hankyu.co.jp;
 *  - the City Loop and Port Loop 1-day and 2-day prices and the attraction
 *    discounts, from kobeloop.bus-japan.net, the Shinki Bus operator site;
 *  - Kazamidori no Yakata's admission, combined ticket, City Loop rate, hours
 *    and closed Tuesday, from kobe-kazamidori.com;
 *  - Kobe Port Tower's two admission tiers and its 9:00–23:00 hours, from
 *    kobe-port-tower.com;
 *  - the Rokko Cable Car's fares, hours and journey time, from rokkocable.com,
 *    the operating railway's own site;
 *  - the Kobe beef definition, the grade and BMS thresholds and the 1983
 *    association, from feel-kobe.jp's own Kobe beef guide.
 *
 * Two deliberate gaps, both stated in the body rather than hidden. First, the
 * single-ride JR, Hankyu and Hanshin fares from Osaka-Umeda: all three operators
 * publish those only through a JavaScript route-search tool, so the one fare
 * table any of them publishes as text (Hanshin's, from Osaka-Namba) is the one
 * figure here. Second, the Kobe Beef Marketing & Distribution Promotion
 * Association's own restaurant register: kobe-niku.jp answers automated reads
 * with HTTP 403, so this page does not claim to have checked it.
 *
 * The Arima figures are carried over from our own Arima Onsen guide, which read
 * them off arimaspa-kingin.jp and nishinihonjrbus.co.jp on 25 Oct 2026, and the
 * table says so. No Klook price appears anywhere — Klook answers automated reads
 * of its product pages with HTTP 403.
 */

const OWN_ISO = "2026-10-27";
const OWN = checkedLabel(OWN_ISO);
/** The date our Arima guide read the bathhouse and coach figures below. */
const ARIMA_CHECKED = checkedLabel("2026-10-25");

const LOOP_1_DAY = "¥800";
const LOOP_2_DAY = "¥1,200";
const KAZAMIDORI = "¥500";
const KAZAMIDORI_PAIR = "¥800";
const PORT_TOWER = "¥1,200";
const CABLE_RETURN = "¥1,550";
const HANKYU_PASS = "¥1,300";

/** Getting from Osaka to Sannomiya, and around Kobe once you are there. */
const accessRows = [
  {
    route: "Osaka-Umeda → Sannomiya, JR / Hankyu / Hanshin",
    time: "Approx. 30 min",
    fare: "Ordinary fare, nothing reserved — see the note",
    note: `The time is VISIT KOBE's own figure for all three operators, read ${OWN}. None of the three publishes the single fare as text rather than through a route-search tool, so we do not print one.`,
  },
  {
    route: "Osaka-Namba → Kobe-Sannomiya, Hanshin",
    time: "Direct on the Hanshin Namba Line through service",
    fare: "¥600 adult, ¥300 child",
    note: `The one Osaka–Kobe fare an operator publishes as a table: Hanshin Electric Railway's own English fare list, read ${OWN}. The route to use if you are staying in Namba rather than Umeda.`,
  },
  {
    route: "Hankyu One-Day Pass (FY2026)",
    time: "All day",
    fare: `${HANKYU_PASS} adult, credit card only`,
    note: `All Hankyu Railway lines except the Kobe Kosoku Line, usable on any day within three months of purchase, on sale through 30 April 2027. Read off hankyu.co.jp ${OWN}. Worth it only if Kobe is one of two or three Hankyu trips that day.`,
  },
  {
    route: "City Loop + Port Loop bus, in Kobe",
    time: "Unlimited rides, 1 or 2 days",
    fare: `${LOOP_1_DAY} adult / ¥400 child for 1 day; ${LOOP_2_DAY} / ¥600 for 2 days`,
    note: `The sightseeing loop that links Sannomiya, Kitano, Nankinmachi, Meriken Park and Harborland. Shinki Bus's own prices, read ${OWN}. It also cuts Kazamidori no Yakata to ¥450 and gives ¥100 off the umie MOSAIC Ferris wheel.`,
  },
  {
    route: "Rokko Cable Car, up the mountain",
    time: "Approx. 10 min each way, departures every 10–20 min, 07:00–21:00",
    fare: `¥800 one way adult (¥400 child), ${CABLE_RETURN} round trip (¥780)`,
    note: `Kobe Rokko Railway's own fares and timetable, read ${OWN}. The cable car is the whole reason the Rokko night view is a realistic evening on a day trip — it runs until 21:00.`,
  },
  {
    route: "Sannomiya → Arima Onsen, West JR Bus",
    time: "About 30 min",
    fare: "¥780 one way, ¥700 on the operator's advance fare",
    note: `From Sannomiya Bus Terminal or Shin-Kobe, no changes. Fares read for our Arima guide on ${ARIMA_CHECKED}. The rail alternative back, on VISIT KOBE's own figures, is Arima Onsen → Arimaguchi 4 min, → Tanigami 10 min, → Sannomiya 10 min on the subway Hokushin Line.`,
  },
];

/** The five places a Kobe day actually chooses between. */
const placeRows = [
  {
    place: "Kitano Ijinkan — the foreign-residence street",
    allow: "1.5–2 hours for two or three houses and the hill",
    getting: "About 15 minutes uphill on foot from Sannomiya, or the City Loop bus",
    cost: `Kazamidori no Yakata ${KAZAMIDORI}, or ${KAZAMIDORI_PAIR} for it plus Moegi no Yakata; free for high school age and under`,
    verdict: "The thing Kobe has that nowhere else in Kansai does. Two houses is plenty — there are a dozen and they rhyme.",
  },
  {
    place: "Meriken Park and the Port Tower",
    allow: "1–1.5 hours",
    getting: "About 15 minutes on foot south from Sannomiya, downhill, or the Port Loop bus",
    cost: `The park is free. Port Tower ${PORT_TOWER} adult for the observation area plus the rooftop, ¥1,000 for the observation area alone`,
    verdict: "The postcard half of the city, and the half that costs nothing if you skip the tower. Open until 23:00, which no other stop here is.",
  },
  {
    place: "Nankinmachi — Kobe's Chinatown",
    allow: "45 minutes to an hour",
    getting: "About 10 minutes on foot between Sannomiya and Meriken Park — it is on the way",
    cost: "Free to walk; street food is cash-and-counter",
    verdict: "Three streets, not a district. Treat it as the lunch stop between Kitano and the harbour rather than a destination.",
  },
  {
    place: "Mt. Rokko and the night view",
    allow: "3 hours from Sannomiya and back, more if you add the mountain's attractions",
    getting: "Local train or bus to Rokko Cable Shimo, then the cable car — about 10 minutes up",
    cost: `${CABLE_RETURN} round trip on the cable car, adult, plus the city leg`,
    verdict: "The one stop that turns a half day into a full one, and it is an evening rather than an afternoon. The cable car's last run is 21:00.",
  },
  {
    place: "Arima Onsen, over the mountain",
    allow: "Half a day on its own",
    getting: "About 30 minutes by West JR Bus from Sannomiya, ¥780",
    cost: "Kin no Yu ¥800, Gin no Yu ¥700, both on a ¥1,200 2-Spa Ticket",
    verdict: "A second day trip rather than a stop on this one — unless you take a guided day that does the city and the onsen together.",
  },
];

/** Admissions and hours, each against the operator's own site with the date read. */
const priceRows = [
  {
    item: "Kazamidori no Yakata (Weathercock House), Kitano",
    price: `${KAZAMIDORI} adult; ${KAZAMIDORI_PAIR} combined with Moegi no Yakata; ¥450 with a City Loop 1-day pass; free high school age and under`,
    hours: "9:00–17:00, last entry 16:45",
    closed: "The third Tuesday of every month — the following day instead if that Tuesday is a holiday",
    source: `kobe-kazamidori.com, ${OWN}`,
  },
  {
    item: "Kobe Port Tower, Meriken Park",
    price: `${PORT_TOWER} adult for the observation area and rooftop, ¥1,000 observation area only; ¥500 / ¥400 for a primary or middle-school child; free for toddlers on the lower floor`,
    hours: "9:00–23:00, last admission 22:30",
    closed: "Open all year apart from maintenance and reserved events",
    source: `kobe-port-tower.com, ${OWN}`,
  },
  {
    item: "Rokko Cable Car",
    price: `¥800 one way adult, ¥400 child; ${CABLE_RETURN} round trip adult, ¥780 child`,
    hours: "07:00–21:00, every 10–20 minutes, about 10 minutes each way",
    closed: "A 30-minute interval around midday on weekdays",
    source: `rokkocable.com, ${OWN}`,
  },
  {
    item: "City Loop + Port Loop bus pass",
    price: `${LOOP_1_DAY} adult / ¥400 child for 1 day; ${LOOP_2_DAY} / ¥600 for 2 days`,
    hours: "Unlimited rides on both routes on the day",
    closed: "Sold at the Sannomiya and Shin-Kobe information centres, the Shinki Bus terminal and on board",
    source: `kobeloop.bus-japan.net, ${OWN}`,
  },
  {
    item: "Hankyu One-Day Pass (FY2026)",
    price: `${HANKYU_PASS} adult, credit card only`,
    hours: "Any one day within three months of purchase",
    closed: "All Hankyu lines except the Kobe Kosoku Line; on sale to 30 April 2027",
    source: `hankyu.co.jp, ${OWN}`,
  },
  {
    item: "Arima Onsen — Kin no Yu and Gin no Yu",
    price: "¥800 and ¥700 adult; ¥1,200 for the 2-Spa Ticket covering both",
    hours: "Kin no Yu 08:00–22:00 (last entry 21:30); Gin no Yu 09:00–21:00 (last entry 20:30)",
    closed: "Kin no Yu the 2nd and 4th Tuesday, Gin no Yu the 1st and 3rd — they do not overlap",
    source: `arimaspa-kingin.jp, read for our Arima guide ${ARIMA_CHECKED}`,
  },
];

/** Tour versus doing it yourself. */
const compareRows = [
  {
    option: "Train over, City Loop pass in Kobe",
    cost: `About 30 minutes each way plus a ${LOOP_1_DAY} loop pass; admissions on top`,
    gets: "Kitano, Nankinmachi, Meriken Park and Harborland at your own speed, with nothing reserved and nothing to be late for.",
    pick: "The default, and the cheapest by a wide margin. Kobe is a compact, walkable city — this is the version most people should do.",
  },
  {
    option: "Train over, private guide for half a day",
    cost: "Check the listing for your date",
    gets: "A local guide for the Kitano and harbour half of the city, on a route you set, with the train arranged by you.",
    pick: "If you want the architecture and the port history explained rather than read off plaques, but still want to choose your own trains.",
  },
  {
    option: "Guided coach day from Osaka — city, Arima and the Rokko night view",
    cost: "Check the listing for your date",
    gets: "The harbour Ferris wheel, Kitano, the Arima Onsen town and the Mt. Rokko night view in one round trip, with the routing and the timings handled.",
    pick: "If you want the mountain and the onsen as well as the city. That combination is not realistic on public transport inside one day.",
  },
  {
    option: "The same day with the Kobe beef meal in the price",
    cost: "Check the listing for your date",
    gets: "The same circuit with the Kobe beef course booked as part of it, rather than a restaurant you have to reserve separately.",
    pick: "If the beef is the actual reason for the trip and you would rather not spend the week before emailing restaurants.",
  },
  {
    option: "Kobe plus Himeji Castle, private car",
    cost: "Check the listing for your date",
    gets: "Himeji Castle and the Kobe stops in one private day with an English-speaking driver, and a Kobe beef lunch as an upgrade.",
    pick: "If you have one day for western Kansai and want the castle as well. Doing both by train in a day means spending it on platforms.",
  },
  {
    option: "Rokkosan Tourist Pass",
    cost: "Check the listing for your date",
    gets: "The transport to and around Mt. Rokko — the cable car and the Rokko Sanjo buses — plus discounts at the mountain attractions.",
    pick: "If the mountain is the point of the day and the city is the thing you pass through on the way to it.",
  },
];

const faqItems = [
  {
    q: "How do I get from Osaka to Kobe?",
    a: `Take a train to Sannomiya, and it barely matters which. VISIT KOBE, the Kobe Tourism Bureau's own travel guide, puts Sannomiya and Osaka-Umeda at approximately 30 minutes apart "by JR, Hanshin or Hankyu lines" — three competing operators on roughly parallel tracks, all terminating within a few minutes' walk of each other in central Kobe. Read on ${OWN}. From Namba rather than Umeda, Hanshin's own fare table gives Osaka-Namba to Kobe-Sannomiya at ¥600 for an adult and ¥300 for a child on the Namba Line through service, read the same day. None of the three is a reserved train, so there is nothing to book and no reason to buy a rail pass for the hop alone.`,
  },
  {
    q: "Is Kobe worth a day trip from Osaka?",
    a: `Yes, with one caveat: go for what Kobe is rather than what it is not. It has no famous temple and no castle — what it has is a hillside of 19th-century Western merchant houses in Kitano, a working harbour with a park and a tower you can go up until 23:00, a three-street Chinatown, a mountain with a cable car and a night view over the bay, and the beef. All of that is about 30 minutes from Osaka, which makes it the shortest big day trip in Kansai. If you only have one day out of Osaka and have not seen Kyoto or Nara, go there first; Kobe is the second or third day trip, not the first.`,
  },
  {
    q: "Where can I eat Kobe beef on a day trip?",
    a: `In Kobe itself, and the thing to settle is the reservation rather than the restaurant. VISIT KOBE's own Kobe beef guide names Misono — the teppanyaki restaurant it dates to 1945 — Kobe Steak Ishida, which it says has six Kobe branches, and KOBE PLAISIR, and it notes that Arima Onsen ryokan serve it too; read on ${OWN}. Lunch is the practical slot on a day trip: it is the service with the most availability and it leaves the evening for the Rokko night view. Two routes make the booking itself simple — a restaurant course reserved in advance, or a guided day that has the Kobe beef meal inside the price. We have not checked the Kobe Beef Marketing & Distribution Promotion Association's own register of authorised shops, because its site refuses automated reads, so treat any list of "certified" restaurants on third-party pages with the same caution we are applying here.`,
  },
  {
    q: "Kobe or Nara — which day trip from Osaka?",
    a: `Nara first, Kobe second, if you are choosing one. Nara is the older and more obviously Japanese day out — the Great Buddha Hall at Todai-ji, the deer park that costs nothing, a compact walk from the station — and it is about 35 minutes from Osaka. Kobe is the one to pick if you have already done temples, if you want a harbour and a mountain rather than shrines, or if the beef is the point. There is also a practical argument for Kobe on a short trip: it is on the same side of Osaka as Himeji and Arima Onsen, so it slots into a western-Kansai day in a way Nara does not. Our Nara day trip guide covers the other side of the choice.`,
  },
  {
    q: "How long do you need in Kobe?",
    a: `Half a day for the city, a full day if you add the mountain. Kitano, Nankinmachi and Meriken Park are a single walk — downhill from the foreign-residence street, through Chinatown, out to the harbour — and three to four hours covers all three comfortably. What converts that into a full day is Mt. Rokko: the cable car is about 10 minutes each way and the round trip from Sannomiya is roughly three hours, and because the view is the point you want to be up there at dusk. The cable car's last run is 21:00, read off the operating railway's own timetable on ${OWN}, which is what makes an evening ascent and a late train back to Osaka work at all.`,
  },
  {
    q: "Do you need a pass for a Kobe day trip?",
    a: `Not for the trains, usually, and possibly for the buses. There is no reserved train to Osaka and no surcharge, so a pass only pays if you are making several trips. In the city, the ${LOOP_1_DAY} City Loop and Port Loop 1-day ticket — ¥400 for a child, or ${LOOP_2_DAY} and ¥600 for two days — is the one that often does pay, because the Kitano hill and the harbour are at opposite ends of a 15-minute uphill walk each. It also cuts Kazamidori no Yakata to ¥450 and gives ¥100 off the umie MOSAIC Ferris wheel and ¥500 off the Concerto cruise. Prices and discounts read off the Shinki Bus operator site on ${OWN}. If you already hold a JR West regional pass, the JR leg from Osaka is covered — our Kansai Area Pass guide works through which version covers what.`,
  },
  {
    q: "What does a Kobe day trip cost in admissions?",
    a: `Very little, because the best of Kobe is outdoors. Meriken Park, the Kitano streets themselves, Nankinmachi and the Harborland waterfront are all free. The paid stops are optional: Kazamidori no Yakata is ${KAZAMIDORI} or ${KAZAMIDORI_PAIR} with Moegi no Yakata next door, Kobe Port Tower is ${PORT_TOWER} for the observation area plus the rooftop and ¥1,000 without it, and the Rokko Cable Car is ${CABLE_RETURN} return for an adult. A full day that does Kitano, the tower and the mountain comes to about ¥3,550 of admissions and cable car for one adult, plus the trains. Every figure read off the operators' own sites on ${OWN}.`,
  },
  {
    q: "Can you do Kobe and Arima Onsen in the same day?",
    a: `On a guided coach day, comfortably; on public transport, only if you give up the city. Arima is administratively part of Kobe but it sits on the far side of Mt. Rokko: the West JR Bus from Sannomiya is about 30 minutes and ¥780 one way, and the baths close between 21:00 and 22:00, so a day that does Kitano, the harbour and Arima is three journeys and a lot of clock-watching. The guided versions from Osaka exist precisely because they fit the harbour, Kitano, Arima and the Rokko night view into one vehicle. If you would rather do Arima properly, treat it as its own day trip — our Arima Onsen guide has the coach timetable, the bath prices and the closed Tuesdays, which do not overlap between the two bathhouses.`,
  },
  {
    q: "Is Kobe good with children, or in the rain?",
    a: `Reasonably, with the usual caveat about hills. For children, the harbour end is the strong half: Meriken Park is open space, the umie MOSAIC Ferris wheel is beside it, the Port Tower is ¥500 for a primary-school child and ¥400 for the observation area alone, and Kitano is free for high school age and under. The Kitano hill itself is a genuine climb — that is what the City Loop bus is for. In rain, the Nankinmachi streets and the Kitano house interiors are fine and the Port Tower is indoors until 23:00, but the two things the day is really built around, the harbour walk and the Rokko night view, both need weather. On a wet forecast, a Kobe beef lunch and two Kitano houses is still a good afternoon; the mountain is not.`,
  },
  {
    q: "Is the Mt. Rokko night view worth the trip up?",
    a: `If the sky is clear and you are not in a hurry, yes — it is the best thing on this page and the only one that cannot be had in Osaka. The cable car runs 07:00 to 21:00 every 10 to 20 minutes and takes about 10 minutes, at ¥800 one way or ${CABLE_RETURN} return for an adult, read off the operator's own site on ${OWN}. The honest arithmetic is time rather than money: the round trip from Sannomiya is about three hours, which on a day trip is the same three hours as Kitano plus the harbour. If the forecast is marginal, do the city and keep the mountain for a Kobe day with an overnight attached — or take a guided day that already has the ascent, the timings and the ride back to Osaka in it.`,
  },
  {
    q: "What exactly is Kobe beef?",
    a: `A brand rather than a cut, and a narrow one. VISIT KOBE states that Kobe beef "is a brand name that is only given to the small quantity of meat from pure-bred Tajima cattle in Hyogo Prefecture" that meets the standard, which it gives as meat quality grade 4 or above and a beef marbling standard of 6 or above; the same page puts it at under 0.2% of Japan's beef market and dates the Kobe Beef Marketing & Distribution Promotion Association to 1983. Read on ${OWN}. In practice that means two things for a day trip: the price reflects genuine scarcity rather than tourist markup, and the restaurants that serve it are few enough that a Saturday evening without a reservation is a real risk.`,
  },
];

const TITLE = "Kobe Day Trip from Osaka (2026): Routes and the Beef";
const DESCRIPTION =
  "A Kobe day trip from Osaka is about 30 minutes to Sannomiya. The Weathercock House is ¥500, the Port Tower ¥1,200 and the City Loop day pass ¥800.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/kobe-day-trip-from-osaka") },
});

export default function KobeDayTripFromOsakaPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kobe-day-trip-from-osaka" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kobe-day-trip-from-osaka" />
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
              route: "/guides/attractions/kobe-day-trip-from-osaka",
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
                  name: "Kobe Day Trip from Osaka",
                  item: "https://www.japan-travel-kit.com/guides/attractions/kobe-day-trip-from-osaka",
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
          <span className={styles.breadCurrent}>Kobe Day Trip from Osaka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kobe Day Trip from Osaka (2026):<br />Routes, the Beef and What Fits in a Day
          </h1>
          <p className={styles.heroSubtitle}>
            Three competing railways cover the same half hour, and almost everything worth seeing at the
            far end is free. The two things that need planning are the mountain and the meal.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares & admissions, dated", "Half-day and full-day plans"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Osaka → Sannomiya</p>
                <p className={styles.verdictStatValue}>Approx. 30 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>City bus pass</p>
                <p className={styles.verdictStatValue}>{LOOP_1_DAY} a day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kitano / Port Tower</p>
                <p className={styles.verdictStatValue}>{KAZAMIDORI} / {PORT_TOWER}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Rokko Cable Car</p>
                <p className={styles.verdictStatValue}>{CABLE_RETURN} return</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Kobe day trip from Osaka</strong> is about <strong>30 minutes</strong> to{" "}
              <strong>Sannomiya</strong> — VISIT KOBE&apos;s own figure for JR, Hanshin and Hankyu alike,
              with no reserved train and nothing to book. From Namba, Hanshin publishes{" "}
              <strong>¥600</strong> adult and ¥300 child. In the city, a single walk covers the three free
              headline sights: the <strong>Kitano Ijinkan</strong> foreign-residence street uphill from the
              station, <strong>Nankinmachi</strong> Chinatown on the way down, and{" "}
              <strong>Meriken Park</strong> on the harbour. The paid stops are optional —{" "}
              <strong>Kazamidori no Yakata {KAZAMIDORI}</strong> (or {KAZAMIDORI_PAIR} with Moegi no Yakata),{" "}
              <strong>Kobe Port Tower {PORT_TOWER}</strong>, open until 23:00, and the{" "}
              <strong>Rokko Cable Car at {CABLE_RETURN} return</strong>, running to 21:00 for the night view
              over the bay. A {LOOP_1_DAY} City Loop and Port Loop day pass links them. Three to four hours
              does the city; the mountain makes it a full day. All figures read off the operators&apos; own
              sites on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kobeFerrisKitanoArimaRokkoDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Guided Kobe Day From Osaka →
              </KlookLink>
              <KlookLink href={kobeBeefSakuraTeppanyaki.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Reserve a Kobe Beef Table →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Kobe Is the Easiest Day Trip Out of Osaka</h2>
          <p className={styles.bodyText}>
            Because three railway companies compete over the same half hour of track. JR, Hankyu and Hanshin
            all run from Osaka to central Kobe and all three terminate within a few minutes&apos; walk of
            each other at Sannomiya, which means there is no reserved seat to buy, no surcharge, no pass to
            calculate and no wrong train. You turn up and go. VISIT KOBE, the Kobe Tourism Bureau&apos;s own
            travel guide, gives the journey as approximately 30 minutes on any of the three.
          </p>
          <p className={styles.bodyText}>
            What you get at the far end is a city with a different shape from anywhere else in Kansai.
            Kobe has no great temple and no castle keep. It has a narrow strip between the mountains and the
            sea, with a hillside of 19th-century Western merchant houses at the top, a three-street Chinatown
            in the middle, a working harbour with a park and a tower at the bottom, and a cable car up to a
            night view over Osaka Bay. Nearly all of that strip is walkable in a single downhill line, and
            most of it is free.
          </p>
          <p className={styles.bodyText}>
            So the planning effort goes on two things only: whether the day includes{" "}
            <strong>Mt. Rokko</strong>, which is three hours and an evening rather than an afternoon, and
            whether it includes a <strong>Kobe beef</strong> meal, which is the one thing here that can
            genuinely be sold out. Everything else you can decide on the train.
          </p>
        </section>

        {/* Access table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get From Osaka to Kobe?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Any of the three railways, and then a bus pass once you arrive. One honest note on the fare
            column: JR, Hankyu and Hanshin all publish single fares only through a route-search tool rather
            than as a table, so the only Osaka–Kobe fare printed below is the one Hanshin publishes as text.
            We would rather give you one checked figure than four plausible ones.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route or ticket", "Time", "Fare", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            If you already hold a JR West regional pass, the JR leg is covered and the question answers
            itself — our{" "}
            <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass guide</Link> sets out which
            version covers what, including the WEST QR replacement for the pass JR West stopped selling on
            30 September 2026. For the Osaka end of the journey, our{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka guide</Link> explains
            how the Midosuji Line and IC cards fit together, and our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card guide</Link> covers tapping through on all
            three operators without buying a ticket at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={rokkosanTouristPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Rokkosan Tourist Pass →
            </KlookLink>
            <KlookLink href={kobePrivateHalfDayWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Private half day in Kobe →
            </KlookLink>
          </div>
        </section>

        {/* What to see */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The route</span>
          <h2 className={styles.sectionTitle}>What Do You Actually Do in Kobe in a Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Walk downhill. Kitano is above Sannomiya, Nankinmachi is below it and Meriken Park is on the
            water, so the three city sights line up as one continuous descent of about 40 minutes&apos;
            walking in total. The two that are not on that line — Mt. Rokko and Arima Onsen — are the
            decisions, not the defaults.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "Time to allow", "Getting there", "What it costs", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {placeRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.getting}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The &ldquo;time to allow&rdquo; column is our own planning allowance, not an operator figure.
            The walking times between Sannomiya, Kitano and Meriken Park are approximate and uphill in one
            direction, which is the practical argument for the {LOOP_1_DAY} loop bus pass. Admissions, cable
            car fares and hours are in the dated table below. The Arima figures are from our{" "}
            <Link href="/guides/attractions/arima-onsen-day-trip" style={{ color: "var(--text)", fontWeight: 600 }}>
              Arima Onsen day trip guide
            </Link>, read on {ARIMA_CHECKED}.
          </p>
        </section>

        {/* Prices & hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>How Much Does a Kobe Day Trip Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A full day that does Kitano, the Port Tower and the mountain is about <strong>¥3,550</strong> of
            admissions and cable car for one adult, plus the trains. A half day that skips the paid interiors
            costs the fare and nothing else. Every figure below is the operator&apos;s own published price,
            with the site it came from and the date it was read.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Official price", "Hours", "Closed / conditions", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.closed}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm at booking. The one date to check against your own before you set
            the day is Kazamidori no Yakata&apos;s <strong>third Tuesday</strong>, which is its monthly
            closure, and Arima&apos;s two bathhouses close on different Tuesdays again. No Klook price
            appears anywhere on this page: Klook answers automated reads of its product pages with an error,
            so no figure from it could be verified.
          </p>
        </section>

        {/* Kobe beef */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The beef</span>
          <h2 className={styles.sectionTitle}>Where Can You Eat Kobe Beef on a Day Trip — and Does It Need Booking?</h2>
          <p className={styles.bodyText}>
            Start with what the brand actually is, because it explains the price and the scarcity. VISIT KOBE
            states that Kobe beef &ldquo;is a brand name that is only given to the small quantity of meat
            from pure-bred Tajima cattle in Hyogo Prefecture&rdquo; that clears the standard — which it gives
            as <strong>meat quality grade 4 or above and a beef marbling standard of 6 or above</strong> —
            and puts the result at <strong>under 0.2% of Japan&apos;s beef market</strong>. The{" "}
            <strong>Kobe Beef Marketing &amp; Distribution Promotion Association</strong>, which it dates to{" "}
            <strong>1983</strong>, exists to hold that line. Read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            On a day trip, the practical decisions are three. <strong>Lunch rather than dinner</strong>: it
            is the service with the most availability, it is usually the cheaper menu at the same
            restaurants, and it leaves the evening free for the Rokko night view — which is the one thing
            about Kobe that has to happen after dark. <strong>Book it before you travel</strong>: the
            restaurants that serve the real thing are few, teppanyaki counters are small, and a Saturday
            evening walk-in is a genuine risk rather than a theoretical one. And decide{" "}
            <strong>whether you want the meal inside a booking or beside one</strong> — a reserved restaurant
            course leaves your day your own, while a guided day with the Kobe beef course in the price
            removes the reservation problem entirely.
          </p>
          <p className={styles.bodyText}>
            VISIT KOBE&apos;s own Kobe beef guide names Misono — which it dates to 1945 as the original
            teppanyaki restaurant — Kobe Steak Ishida, which it says has six Kobe branches, and KOBE
            PLAISIR, and it notes that Arima Onsen ryokan serve it as well. One thing we will not claim: we
            have not read the association&apos;s own register of authorised shops, because kobe-niku.jp
            refuses automated reads, so nothing on this page should be taken as a certification check. If
            that matters to you, ask the restaurant for its registration number at booking.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kobeBeefSakuraTeppanyaki.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Teppanyaki course in Kobe →
            </KlookLink>
            <KlookLink href={kisshokichiKobeBeefCourse.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Second restaurant option →
            </KlookLink>
            <KlookLink href={kobeBeefHarbourKitanoDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Day tour with the beef included →
            </KlookLink>
          </div>
        </section>

        {/* Half day vs full day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How long to give it</span>
          <h2 className={styles.sectionTitle}>Is Half a Day Enough, or Do You Need a Full One?</h2>
          <p className={styles.bodyText}>
            Half a day is honestly enough for the city. The downhill line — two Kitano houses, Nankinmachi,
            Meriken Park and the harbour — is three to four hours including lunch, and because it is a walk
            rather than a circuit there is no dead time in it. Add about 30 minutes each way on the train and
            you are back in Osaka for dinner.
          </p>
          <p className={styles.bodyText}>
            A full day means one of two additions, and they do not combine. <strong>Mt. Rokko</strong>: the
            cable car runs 07:00 to 21:00 every 10 to 20 minutes and takes about 10 minutes, at{" "}
            {CABLE_RETURN} return for an adult, and the round trip from Sannomiya is roughly three hours —
            worth it for a clear evening and pointless in cloud. Or <strong>Arima Onsen</strong>, about 30
            minutes and ¥780 by coach from Sannomiya, where the two municipal bathhouses close between 21:00
            and 22:00 and shut on different Tuesdays. Trying to do the city, the mountain and the onsen on
            public transport in one day is the mistake this page exists to prevent; that specific
            combination is what the guided coach days are for.
          </p>
        </section>

        {/* Tour vs DIY */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Should You Take a Tour or Just Get the Train?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "What it costs", "What it gets you", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.gets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Three things to settle on a listing rather than here, because none of them is a published figure.
            Whether a guided departure is actually running on your date — several of the Rokko and Arima
            coach days have a minimum party size and will cancel below it, with notice. What the cancellation
            window is, which matters more for a mountain night view than for anything else on this page.
            And whether the Kobe beef course on a tour is included or an upgrade, because the two listings
            that offer it handle that differently. For the version that adds the castle, our{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip">Himeji Castle day trip guide</Link> has
            the admission and the train times from Osaka.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kobeFerrisKitanoArimaRokkoDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kobe, Arima &amp; Rokko day →
            </KlookLink>
            <KlookLink href={kobeHimejiPrivateTourBeefLunch.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kobe + Himeji private day →
            </KlookLink>
            <KlookLink href={kobeSandaOutletArimaBeefLunchTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Outlets, Arima &amp; lunch →
            </KlookLink>
          </div>
        </section>

        {/* Kobe or Nara */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which day trip</span>
          <h2 className={styles.sectionTitle}>Kobe or Nara — Which Day Trip From Osaka?</h2>
          <p className={styles.bodyText}>
            If you are only taking one day out of Osaka, take Nara. It is about 35 minutes away, the deer
            park costs nothing, the Great Buddha Hall at Todai-ji is the single most impressive building
            within an hour of the city, and the whole of it is a compact walk from the station. It is also
            the day that feels least like the city you just left, which is what a day trip is for.
          </p>
          <p className={styles.bodyText}>
            Kobe is the second or third. Pick it over Nara if you have already seen temples, if a harbour and
            a mountain appeal more than shrines, if you are travelling with someone who wants the beef, or if
            it is raining — Kobe has more indoors than Nara does. It also has a practical advantage on a
            longer trip: Kobe, Himeji and Arima Onsen all lie west of Osaka, so they combine with each other
            in a way Nara does not. Our{" "}
            <Link href="/guides/attractions/nara-day-trip">Nara day trip guide</Link> has the other side of
            the comparison, and our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link> lists
            every Kansai day we have written up in one place.
          </p>
        </section>

        {/* Where to stay — the Osaka base this day runs from */}
        <KlookStayAreas
          heading="Where to Base Yourself in Osaka for Kansai Day Trips"
          intro="This is a day trip, so the hotel question is an Osaka one: which of the three Midosuji Line hubs you sleep at decides how long the 30 minutes to Sannomiya actually takes door to door. Umeda is the one with the JR, Hankyu and Hanshin Kobe lines all underneath it, which is why it leads for a trip with Kobe in it."
          areas={osakaStayAreas}
        />

        <KlookTourPicks
          heading="Guided Kobe Days Out of Osaka"
          intro="All five are round trips from Osaka, and they differ in what else they reach: the harbour and Kitano with the mountain night view, the same circuit with the Kobe beef course inside the price, Himeji Castle as well in a private car, the Sanda outlets with Arima, or a local guide for half a day in the city itself. Open a listing for availability and the current price on your dates."
          tours={[
            kobeFerrisKitanoArimaRokkoDayTour,
            kobeBeefHarbourKitanoDayTour,
            kobeHimejiPrivateTourBeefLunch,
            kobeSandaOutletArimaBeefLunchTour,
            kobePrivateHalfDayWalkingTour,
          ]}
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

        {/* Before you go — the eSIM slot */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>One Thing to Sort Before the Day Itself</h2>
          <p className={styles.bodyText}>
            Data, and on this particular day trip for a specific reason: the Kobe plan is the one on this
            site most likely to change while you are standing in it. Whether you go up Mt. Rokko depends on
            the sky at four in the afternoon, the restaurant confirmation is an email, and the three
            railways back to Osaka run to three different timetables from three adjacent stations. An eSIM
            activated before departure means all of that is a decision rather than a guess.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against
            the alternatives.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
            <Link href="/guides/attractions/arima-onsen-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 14c0-3 3-4 3-7M12 14c0-3 3-4 3-7M19 14c0-3-3-4-3-7" />
                  <path d="M3 18h18v3H3z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Arima Onsen Day Trip (2026): From Osaka or Kobe, and What the Baths Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/himeji-castle-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Himeji Castle Day Trip (2026): ¥2,500 Admission, and Times From Osaka &amp; Kyoto</p>
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
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c2 3 4 4 4 7a4 4 0 0 1-8 0c0-3 2-4 4-7z" />
                  <path d="M12 14v7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
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
            <h2 className={styles.ctaBannerTitle}>Half an hour from Osaka, and mostly free</h2>
            <p className={styles.ctaBannerDesc}>
              Get the train, buy the {LOOP_1_DAY} loop pass and walk downhill. The two things worth booking
              before you travel are the Kobe beef table and — if the mountain and the onsen are both on the
              list — a guided day that fits them into one.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kobeFerrisKitanoArimaRokkoDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Guided Kobe Days →
              </KlookLink>
              <KlookLink href={kobeBeefSakuraTeppanyaki.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kobe Beef Tables →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
