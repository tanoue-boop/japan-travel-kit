import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  jrEastPassNaganoNiigata,
  karuizawaShinjukuDayTour,
  karuizawaShinkansenDayTrip,
  karuizawaShiraitoOutletDayTour,
  karuizawaSkiSnowDayTour,
  shinkansenTokyoKaruizawa,
} from "../../../lib/klook-links";

/**
 * Karuizawa as a day trip from Tokyo — the Hokuriku Shinkansen resort town, as distinct from
 * the three Fuji-area guides and from Nikko and Kamakura.
 *
 * What is dated in the copy, and where it came from, all read on 22 Oct 2026:
 *
 * - Journey time: the Karuizawa Tourism Association's own access page (slow-style.com,
 *   "東京駅→軽井沢駅（約1時間15分）") and Nagano Prefecture's official tourism database
 *   (db.go-nagano.net, "60 minutes to Karuizawa Station on the Hokuriku Shinkansen").
 * - Highway bus: Seibu Bus's own Chikuma Line page — Bus-ta Shinjuku and Ikebukuro East Exit
 *   to Karuizawa-ekimae, 171 km, about 196–202 minutes, ¥2,600 adult (¥2,550 online) and
 *   ¥1,300 child (¥1,270) for the Karuizawa/Saku/Komoro zone.
 * - The day's shape: the Karuizawa Tourist Association's own published one-day bus course,
 *   which carries real bus times.
 * - Shiraito Falls and Kumoba Pond: the association's own spot pages.
 * - The outlet: karuizawa-psp.jp, plus Nagano Prefecture's "some 220 shops".
 * - Ski season: princehotels.co.jp's own 2026-27 season dates.
 *
 * No yen fare appears for the shinkansen, deliberately. JR East's own site answers automated
 * reads with HTTP 403 across the whole domain, so there was no official figure to verify, and
 * rule one on this site is that an unverified number does not get written. The page says so in
 * the open rather than borrowing a figure from an aggregator.
 *
 * No Klook price appears either, for the usual reason — Klook answers automated reads of its
 * product pages with HTTP 403.
 */

/** Everything dated below was read off those operators' own sites on this date. */
const CHECKED_ISO = "2026-10-22";
const CHECKED = checkedLabel(CHECKED_ISO);

const routeRows = [
  {
    route: "Hokuriku Shinkansen, Tokyo Station → Karuizawa",
    time: "About 1 hr 15 min on the tourism association's own access page; Nagano Prefecture's tourism site says 60 minutes",
    fare: "No figure printed here — see the note below the table",
    notes: "Asama and Hakutaka services, direct with no transfer. The fastest trains skip the Takasaki-area stops",
  },
  {
    route: "Highway bus, Bus-ta Shinjuku or Ikebukuro East Exit → Karuizawa-ekimae",
    time: "171 km, about 196–202 minutes",
    fare: "¥2,600 adult, ¥1,300 child; ¥2,550 and ¥1,270 booked online",
    notes: "Seibu Bus's Chikuma Line, which runs on to Komoro, Tomi and Ueda. Roughly three times the journey time for a fraction of the fare",
  },
  {
    route: "Hokuriku Shinkansen with a JR East regional pass",
    time: "Same trains, same times",
    fare: "Pass price varies by product and length",
    notes: "JR East's Nagano/Niigata area pass names Karuizawa as one of the places it reaches from Tokyo — worth pricing only if Nagano or Niigata is also on your trip",
  },
];

const stopRows = [
  {
    stop: "Kyu-Karuizawa Ginza (Old Karuizawa Ginza Street)",
    what: "A 750 m shopping street of bakeries, coffee shops, souvenir stores and eateries — the town's old centre",
    access: "About 5 minutes by bus from Karuizawa Station, then a short walk from the Kyukaruizawa stop",
    source: "Karuizawa Tourist Association",
  },
  {
    stop: "Karuizawa Prince Shopping Plaza",
    what: "An outlet mall of some 220 shops set around a pond and lawns",
    access: "On the south side of Karuizawa Station — the one major stop that needs no bus at all",
    source: "karuizawa-psp.jp; shop count from Nagano Prefecture's tourism site",
  },
  {
    stop: "Shiraito Falls",
    what: "A waterfall 3 m high and 70 m wide, fed by groundwater that falls in hundreds of strands like white thread",
    access: "About 23 minutes by Kusakaru Kotsu bus from Karuizawa Station on the association's own one-day course",
    source: "Karuizawa Tourist Association",
  },
  {
    stop: "Kumoba Pond",
    what: "Also called Swan Lake — a small pond with a 1 km path round it, at its best in the fresh-green and autumn-leaf seasons",
    access: "A short Seibu Bus ride from the Kyu-Karuizawa side; the association runs a station shuttle in foliage season",
    source: "Karuizawa Tourist Association",
  },
  {
    stop: "Harunire Terrace",
    what: "Nine buildings holding 16 shops and restaurants, in the Hoshino area",
    access: "About 15 minutes on from Kumoba Pond by bus, per the association's one-day course",
    source: "Karuizawa Tourist Association",
  },
];

const compareRows = [
  {
    aspect: "Getting there",
    diy: "Shinkansen in about an hour to an hour and a quarter, or the Seibu Bus in about 3 hr 20 min for ¥2,600",
    tour: "Coach from Shinjuku or central Tokyo, with the travelling built into the day",
  },
  {
    aspect: "What it costs",
    diy: "Transport plus local bus fares. Shiraito Falls, Kumoba Pond and Kyu-Karuizawa Ginza publish no admission fee on the association's listings",
    tour: "One price covering transport and the route. Open the listing for the figure on your date",
  },
  {
    aspect: "How many stops fit",
    diy: "Three, if you accept the bus timetable. The association's own one-day course does Shiraito Falls, Kyu-Karuizawa, Kumoba Pond and Harunire Terrace between 09:20 and 16:10",
    tour: "Typically the waterfall, the pond and the outlet in one run, which is the combination hardest to do yourself",
  },
  {
    aspect: "Flexibility",
    diy: "Total. Shinkansen services run through the day, so a slow lunch costs you nothing but a later train",
    tour: "None. The coach leaves when it leaves, and the outlet gets the time the itinerary gives it",
  },
  {
    aspect: "What goes wrong",
    diy: "The buses. The three headline stops are on different routes in different directions, and a missed connection removes a stop rather than delaying it",
    tour: "Weather and traffic. A coach from Tokyo has a long motorway run at each end and no way to shorten it",
  },
  {
    aspect: "Who it suits",
    diy: "Anyone whose day is really about one thing — the outlet, or the old street, or the pond in October",
    tour: "Anyone who wants the waterfall as well as the shopping, or who would rather not own the timetable",
  },
];

const whoFor = [
  {
    title: "Take the shinkansen if…",
    desc: `You want the day to be short at both ends. The Karuizawa Tourism Association puts Tokyo Station to Karuizawa Station at about 1 hour 15 minutes, and Nagano Prefecture's own tourism site says 60 minutes on the faster services — either way it is the shortest approach of any mountain day trip from Tokyo. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
  {
    title: "Take the highway bus if…",
    desc: `The fare matters more than the clock. Seibu Bus's Chikuma Line runs from Bus-ta Shinjuku and Ikebukuro East Exit to Karuizawa-ekimae — 171 km, listed at about 196 to 202 minutes — at ¥2,600 for an adult and ¥1,300 for a child, or ¥2,550 and ¥1,270 booked online. That is around three hours twenty each way, which makes it an overnight route more than a day-trip one. Read off seibubus.co.jp on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M3 11h18" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="16.5" cy="19" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Take a coach tour if…",
    desc: "You want Shiraito Falls and the outlet on the same day. Those two are the awkward pairing: the falls are a 23-minute bus ride out of town on one route and the outlet is at the station, so doing both independently means building the day around two bus timetables. A coach is bought precisely to remove that.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18l6-13 5 8 3-4 4 9z" />
        <line x1="2" y1="21" x2="22" y2="21" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide whether the day is shopping or scenery",
    desc: "This is the whole plan in one question. The outlet is at the station and needs no bus; Shiraito Falls is 23 minutes out of town on a Kusakaru Kotsu service; Kyu-Karuizawa Ginza and Kumoba Pond are on a third axis towards the old resort. Pick which of those three directions owns your afternoon and the rest of the day arranges itself.",
  },
  {
    title: "Copy the association's own one-day bus course",
    desc: `The Karuizawa Tourist Association publishes a bus-only day trip, and it is better than anything you would improvise: Karuizawa Station, the 09:20 bus to Shiraito Falls arriving 09:43, on to Kyu-Karuizawa (19 minutes plus an 8-minute walk) for the Shaw Memorial Chapel and the 750 m Ginza street, the 14:04 Seibu Bus to Kumoba Pond at 14:20 for about half an hour, 15 minutes on to Harunire Terrace for an hour, and the 15:55 bus back, reaching the station at 16:10. Read on ${CHECKED}; check the current timetable before you rely on those departures.`,
  },
  {
    title: "Book the train, not the day",
    desc: "Hokuriku Shinkansen services run through the day and a non-reserved seat needs no commitment to a particular train, so there is no booking window to beat here the way there is for a Disney date or a Shibuya Sky sunset slot. Reserve a seat if you are travelling at a weekend or in foliage season; otherwise buy on the day.",
  },
  {
    title: "Price a pass only if Karuizawa is not the whole trip",
    desc: "A single Tokyo–Karuizawa round trip almost never justifies a rail pass. JR East's Nagano/Niigata area pass lists Karuizawa among the places it reaches from Tokyo, and it starts paying when Nagano, Matsumoto, Hakuba or Niigata are also on the itinerary. Work it out against your actual route rather than against the day.",
  },
  {
    title: "Check the season before you fix the date",
    desc: `Karuizawa's calendar is sharper than Tokyo's. The association publishes notices each autumn about road restrictions around Kumoba Pond and a return shuttle between Karuizawa Station and Rokuhontsuji/Kumoba Pond, which tells you how busy that one pond gets; and the Karuizawa Prince Hotel Ski Resort's own site gives its 2026-27 season as 31 October 2026 to 31 March 2027 for the Ski Centre and East areas, with the West area from 19 December 2026 to 22 March 2027. Both read on ${CHECKED}.`,
  },
  {
    title: "Fix the return before you start",
    desc: "The last useful services thin out in the evening, and the bus and the train thin out differently. Settle your way home first — it is the one decision that turns a relaxed day into a rushed one if you leave it until the afternoon.",
  },
];

const faqItems = [
  {
    q: "Is Karuizawa a good day trip from Tokyo?",
    a: `Yes, and the journey time is the reason. The Karuizawa Tourism Association's own access page puts Tokyo Station to Karuizawa Station at about 1 hour 15 minutes on the Hokuriku Shinkansen, and Nagano Prefecture's tourism site gives 60 minutes on the faster services — shorter than Nikko by Tobu limited express (about two hours from Asakusa) and shorter than the Kawaguchiko highway bus (about 1 hour 45 minutes from Shinjuku). What you get at the other end is a cool, wooded resort town with an outlet mall at the station, a 750 m old shopping street, a waterfall and a pond, rather than one headline sight. If you need a single unmissable thing to look at, Nikko or Kawaguchiko has it and Karuizawa does not. Checked ${CHECKED}.`,
  },
  {
    q: "How long does the shinkansen take from Tokyo to Karuizawa, and what does it cost?",
    a: `The official figures we could verify put it at 60 to 75 minutes direct, with no transfer: the Karuizawa Tourism Association says about 1 hour 15 minutes from Tokyo Station, Nagano Prefecture's tourism database says 60 minutes. Services are the Asama and the Hakutaka, and tickets are sold in four classes — non-reserved ordinary, reserved ordinary, reserved Green Car and reserved Gran Class. We do not print a yen fare: JR East's own website answers automated requests with an HTTP 403 across the whole domain, so there was no official figure for us to verify, and we would rather leave a gap than copy one from an aggregator. Check it at a ticket machine, at a JR window or on the operator's own booking site. All read on ${CHECKED}.`,
  },
  {
    q: "Is there a cheaper way to get to Karuizawa than the shinkansen?",
    a: `Yes — the highway bus, if you are willing to spend the time. Seibu Bus's Chikuma Line runs from Bus-ta Shinjuku and Ikebukuro Station East Exit to Karuizawa-ekimae, a distance its own page gives as 171 km and a journey of about 196 to 202 minutes, at ¥2,600 for an adult and ¥1,300 for a child, or ¥2,550 and ¥1,270 booked online. That is roughly three hours twenty each way against an hour or so by train. For a day trip the train usually wins on the arithmetic that matters — six and a half hours on a bus is most of the daylight. Read off seibubus.co.jp on ${CHECKED}.`,
  },
  {
    q: "What is there to do in Karuizawa in one day?",
    a: `Five places carry a day, on three different bus axes. Kyu-Karuizawa Ginza is a 750 m street of bakeries, cafés, souvenir shops and restaurants, about five minutes by bus from the station. Karuizawa Prince Shopping Plaza is an outlet of some 220 shops set around a pond and lawns, on the south side of the station and needing no bus. Shiraito Falls is 3 m high and 70 m wide, fed by groundwater falling in hundreds of white strands, about 23 minutes out by bus. Kumoba Pond — Swan Lake — has a 1 km path round it and is at its best in the fresh-green and autumn-leaf seasons. Harunire Terrace, in the Hoshino area, is nine buildings holding 16 shops and restaurants. Descriptions and access from the Karuizawa Tourist Association, karuizawa-psp.jp and Nagano Prefecture's tourism site, read on ${CHECKED}.`,
  },
  {
    q: "How do you get around Karuizawa without a car?",
    a: `By local bus, and the association has done the work for you: it publishes a one-day bus course that runs Karuizawa Station → Shiraito Falls (09:20, arriving 09:43) → Kyu-Karuizawa for the Shaw Memorial Chapel and the Ginza street (19 minutes plus an 8-minute walk) → Kumoba Pond (14:04, arriving 14:20, about 30 minutes there) → Harunire Terrace (15 minutes on, about an hour there) → back to Karuizawa Station (15:55, arriving 16:10). Two operators are involved, Kusakaru Kotsu out to the falls and Seibu Bus around the old resort, which is exactly why improvising goes wrong. Read on ${CHECKED} — confirm the current timetable before you build a day on those departures.`,
  },
  {
    q: "Can you do the outlet and Shiraito Falls on the same day?",
    a: "Independently, it is the hardest combination on the list, and that is the honest case for a coach tour. The outlet is at Karuizawa Station, the falls are about 23 minutes out of town on a different operator's route, and the old resort area is a third direction again — so doing all three means three bus legs with waits between them. The Klook day tours that pair Shiraito Falls, Kumoba Pond and the Prince Shopping Plaza exist because that is the day most visitors want and the one the local timetables fight hardest.",
  },
  {
    q: "When is the best time of year for a Karuizawa day trip?",
    a: `Autumn first, then winter, then high summer. Karuizawa sits high enough that Nagano Prefecture's own tourism material describes it as cool even in summer and long famous as a retreat from the heat — which also means its autumn arrives earlier than Tokyo's. Kumoba Pond is the set piece, and you can measure the demand by the response: the tourism association publishes notices each autumn about road restrictions around the pond and runs a return shuttle bus between Karuizawa Station and Rokuhontsuji/Kumoba Pond. Winter brings skiing unusually early — the Karuizawa Prince Hotel Ski Resort's own site gives its 2026-27 season as 31 October 2026 to 31 March 2027 for the Ski Centre and East areas, and 19 December 2026 to 22 March 2027 for the West area, across 14 courses — and the association also runs seasonal evening light-ups at Shiraito Falls in midwinter and midsummer. Dates change every year, so check the association and the resort for yours. Read on ${CHECKED}.`,
  },
  {
    q: "Do you need to book a Karuizawa day trip in advance?",
    a: "The transport, sometimes; the day, no. Nothing in Karuizawa is a timed-entry ticket — the falls, the pond and the old street publish no admission fee on the association's listings, and the outlet is a shopping mall. What does sell out is a seat: reserved shinkansen seats at weekends and in foliage season, the highway bus, and the join-in coach tours, which run to a fixed capacity on a fixed date. If a coach day is your plan, that is the booking to make early; if you are going by train under your own steam, a non-reserved seat means you can decide on the morning.",
  },
  {
    q: "Does a rail pass cover Tokyo to Karuizawa?",
    a: "It depends which pass, and for a single day trip the answer is usually that it is not worth buying one. The Hokuriku Shinkansen between Tokyo and Karuizawa is a JR East line, and JR East's Nagano/Niigata area pass lists Karuizawa among the destinations it reaches from Tokyo alongside Nagano, Matsumoto, Hakuba and Niigata. That is a regional pass sold for a run of consecutive days, so it earns its price when the rest of your trip goes further into Nagano or on to Niigata — not when the only journey on it is one round trip to a resort town. Price it against your actual route.",
  },
  {
    q: "Karuizawa or Kawaguchiko for a day out of Tokyo?",
    a: "Kawaguchiko if you want to look at Mt. Fuji; Karuizawa if you want a town. The north shore of Lake Kawaguchi is about 1 hour 45 minutes and ¥2,200 from Shinjuku by highway bus and the whole product is the mountain, which means a cloudy day costs you most of what you went for. Karuizawa is an hour or so by shinkansen and the day is a street, an outlet, a waterfall and a pond — nothing in it depends on the weather clearing. Karuizawa is also the easier day with a late start, because the trains run through the day.",
  },
  {
    q: "Karuizawa or Nikko?",
    a: "Nikko has the famous sight; Karuizawa has the easier day. Nikko is about two hours from Asakusa on a Tobu limited express and its draw is Toshogu Shrine — a UNESCO-listed mausoleum with a ¥1,600 adult admission — plus Kegon Falls and Lake Chuzenji up a mountain road served by local buses. That is a full, slightly demanding day. Karuizawa is an hour away, has no admission fee to speak of, and asks much less of you. Choose Nikko if you want to see something historically significant and Karuizawa if you want a pleasant day in the mountains with shopping in it.",
  },
  {
    q: "Is Karuizawa worth it with children, or on a wet day?",
    a: "With children, yes, if the day leans on the outlet and Harunire Terrace rather than the bus rides — the journey out is short by day-trip standards and the Prince Shopping Plaza's lawns and pond are the easiest part of the town to spend an unplanned hour in. On a wet day Karuizawa holds up better than any Fuji-area trip, since the outlet and the Harunire Terrace shops are the point rather than a view; Shiraito Falls is an outdoor walk and Kumoba Pond's 1 km path is exposed, so those are the two to drop. Dress for a place noticeably cooler than Tokyo in any season.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/karuizawa-day-trip-from-tokyo") },
});

const TITLE = "Karuizawa Day Trip From Tokyo (2026): Shinkansen Times, the Five Stops and Tour vs DIY";
const DESC =
  "A Karuizawa day trip from Tokyo in 2026: the Hokuriku Shinkansen takes 60 to 75 minutes, the Seibu highway bus about 3 hr 20 min for ¥2,600 — plus the official one-day bus course, the outlet, Shiraito Falls and when a coach tour beats doing it yourself.";

export default function KaruizawaDayTripFromTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/karuizawa-day-trip-from-tokyo" />
        {hreflangLinks("/guides/attractions/karuizawa-day-trip-from-tokyo")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/karuizawa-day-trip-from-tokyo" />
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
              route: "/guides/attractions/karuizawa-day-trip-from-tokyo",
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
                  name: "Karuizawa Day Trip From Tokyo",
                  item: "https://www.japan-travel-kit.com/guides/attractions/karuizawa-day-trip-from-tokyo",
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
          <span className={styles.breadCurrent}>Karuizawa Day Trip From Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Karuizawa Day Trip From Tokyo (2026):<br />Shinkansen Times, the Five Stops and Tour vs DIY
          </h1>
          <p className={styles.heroSubtitle}>
            An hour or so up the Hokuriku Shinkansen for an outlet mall, an old shopping street, a
            waterfall and a pond. Here is how far apart they really are, and what that does to a day.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official times & fares, dated", "Tour vs doing it yourself"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Tokyo → Karuizawa</p>
                <p className={styles.verdictStatValue}>60–75 min, Hokuriku Shinkansen</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Highway bus</p>
                <p className={styles.verdictStatValue}>~3 hr 20 min, ¥2,600 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Admission fees</p>
                <p className={styles.verdictStatValue}>None published for the main stops</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Stops that fit in a day</p>
                <p className={styles.verdictStatValue}>Three, on three bus axes</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a Karuizawa day trip from Tokyo is 60 to 75 minutes each way
              on the Hokuriku Shinkansen — about 1 hour 15 minutes according to the town&apos;s own
              tourism association, 60 on Nagano Prefecture&apos;s tourism site — which makes it the
              shortest mountain day trip out of the city. The catch is at the other end: the outlet
              mall is at the station, Shiraito Falls is about 23 minutes out by bus, and Kyu-Karuizawa
              Ginza and Kumoba Pond are in a third direction, so three stops is a realistic day and
              five is not. The Seibu Bus from Shinjuku or Ikebukuro is ¥2,600 but takes about 3 hours
              20 minutes. Figures read off the operators&apos; own sites on {CHECKED}.
            </p>
            <KlookLink
              href={karuizawaShinjukuDayTour.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check Karuizawa day tours on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Intro / scope */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Karuizawa, and Why Go for a Day?</h2>
          <p className={styles.bodyText}>
            Karuizawa is a highland resort town in eastern Nagano, on the Hokuriku Shinkansen line an
            hour or so out of Tokyo. Nagano Prefecture&apos;s own tourism material describes it as cool
            even in summer and long famous as a place to escape the heat, which is the short version of
            its history: foreign missionaries and then Tokyo families built summer houses here, and the
            town that grew up around them is wooded, walkable and noticeably better supplied with
            bakeries than its size would suggest.
          </p>
          <p className={styles.bodyText}>
            What it does not have is a single unmissable sight. There is no Toshogu and no Mt. Fuji
            here — the day is a 750 m old shopping street, an outlet mall of some 220 shops, a
            waterfall, a pond with a path round it, and a terrace of restaurants in the woods. That
            makes Karuizawa the most weather-proof day trip from Tokyo and the least dramatic one, and
            it is worth knowing which of those you are buying before you book.
          </p>
          <p className={styles.bodyText}>
            It is also the easiest to reach. Compare it with the alternatives on this site:{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko</Link> is
            about 1 hour 45 minutes from Shinjuku by bus and the mountain may be in cloud;{" "}
            <Link href="/guides/attractions/nikko-day-trip">Nikko</Link> is about two hours from
            Asakusa and then local buses up a mountain road;{" "}
            <Link href="/guides/attractions/kamakura-day-trip">Kamakura</Link> is the only one that
            beats Karuizawa on travel time. Karuizawa sits between them: short journey, soft day.
          </p>
        </section>

        {/* Routes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get From Tokyo to Karuizawa?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Journey time", "One-way fare", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Shinkansen journey times from the Karuizawa Tourism Association&apos;s access page and
            Nagano Prefecture&apos;s tourism database; bus distance, duration and fares from Seibu
            Bus&apos;s own Chikuma Line page. All read on {CHECKED} and subject to change.{" "}
            <strong>On the shinkansen fare:</strong> we print no yen figure because JR East&apos;s own
            website answers automated requests with an HTTP 403 across the whole domain, so there was
            nothing official for us to verify — and a figure we cannot check does not go on this site.
            Tickets are sold in four classes (non-reserved ordinary, reserved ordinary, reserved Green
            Car and reserved Gran Class); check the fare at a machine, a JR window or the
            operator&apos;s own booking site. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            works through whether a pass earns its price across a whole trip.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKaruizawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo–Karuizawa shinkansen on Klook →
            </KlookLink>
            <KlookLink href={jrEastPassNaganoNiigata.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR EAST PASS (Nagano / Niigata) →
            </KlookLink>
          </div>
        </section>

        {/* Which version */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which version</span>
          <h2 className={styles.sectionTitle}>Train, Bus or a Coach Tour?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The stops */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What to see</span>
          <h2 className={styles.sectionTitle}>What Is There to Do in Karuizawa in One Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Five places carry the town, and the column that matters is the third one — they are not
            near each other. None of the five publishes an admission fee on the tourism
            association&apos;s listings, so the cost of a Karuizawa day is transport and lunch.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "What it is", "Getting there from the station", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stopRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.access}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Descriptions and access read off the Karuizawa Tourist Association&apos;s own spot pages
            and published one-day bus course, karuizawa-psp.jp and Nagano Prefecture&apos;s tourism
            database on {CHECKED}. The Prince Shopping Plaza publishes its hours per day on its own
            site — check yours rather than assuming a standard closing time.
          </p>
        </section>

        {/* The official day */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>Planning the Day</h2>
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
        </section>

        {/* Tour vs DIY */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Should You Take a Tour or Do It Yourself?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Karuizawa is one of the few day trips from Tokyo where doing it yourself is genuinely easy
            — the train is direct and frequent, and nothing needs a timed ticket. The case for a coach
            is narrower than usual, and it is entirely about the local buses.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Shinkansen + local buses", "Join-in coach tour"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.aspect}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.aspect}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.diy}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The decision rule is short. If your day is about one thing — the outlet, or the old street,
            or Kumoba Pond in October — go by train and do it yourself; the shinkansen runs through the
            day and you will not need a tour to see one place well. If you want Shiraito Falls{" "}
            <em>and</em> the shopping, a coach is bought to solve the timetable, and that is a real
            problem it really solves. Either way, a join-in coach runs to a fixed capacity on a fixed
            date, so it is the one part of a Karuizawa day worth booking early — unlike the train.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={karuizawaShinjukuDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Karuizawa day tour from Shinjuku →
            </KlookLink>
            <KlookLink href={karuizawaShinkansenDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              The shinkansen day trip listing →
            </KlookLink>
          </div>
        </section>

        {/* Seasons */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Seasons</span>
          <h2 className={styles.sectionTitle}>When Should You Go — Autumn or Winter?</h2>
          <p className={styles.bodyText}>
            <strong>Autumn is the obvious answer.</strong> Karuizawa is high enough that its colour
            turns earlier than Tokyo&apos;s, and Kumoba Pond — the pond with the 1 km path, which the
            tourism association describes as at its best in the fresh-green and autumn-leaf seasons —
            is the picture everyone comes for. The association&apos;s own notice board is the best
            evidence of how busy that gets: each autumn it publishes road restrictions around the pond
            and runs a return shuttle bus between Karuizawa Station and the Rokuhontsuji/Kumoba Pond
            area. If you are going in foliage season, go early in the day, use the shuttle, and do not
            plan to arrive by car.
          </p>
          <p className={styles.bodyText}>
            <strong>Winter is the surprise.</strong> The Karuizawa Prince Hotel Ski Resort, which is on
            the station side of town, publishes a 2026-27 season of 31 October 2026 to 31 March 2027
            for its Ski Centre and East areas, with the West area running 19 December 2026 to 22 March
            2027, across 14 courses — an October opening is extraordinarily early for Japan, and it is
            the only place within about an hour of Tokyo where you can ski before the shortest day. The
            tourism association also runs evening light-ups at Shiraito Falls in midwinter and
            midsummer. Both read on {CHECKED}; dates are set each year, so check the resort and the
            association for yours.
          </p>
          <p className={styles.bodyText}>
            Summer is what the town was built for and is correspondingly busy; spring is quiet and the
            fresh green is genuinely good. The one thing that holds in every season is temperature —
            Karuizawa is noticeably cooler than Tokyo, and the Kumoba Pond path and the walk at
            Shiraito Falls are both exposed. Dress a layer up from whatever Tokyo asks for.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={karuizawaSkiSnowDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Karuizawa ski &amp; snow day tour →
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
          heading="The Guided Versions of This Day"
          intro="Three Karuizawa day tours out of Tokyo, the ski-season version, and the shinkansen seats if you would rather own the itinerary. Klook blocks automated price reads, so open a listing for the figure and the departure point on your date."
          tours={[
            karuizawaShinjukuDayTour,
            karuizawaShiraitoOutletDayTour,
            karuizawaShinkansenDayTrip,
            karuizawaSkiSnowDayTour,
            shinkansenTokyoKaruizawa,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nikko-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20h16M6 20V9l6-5 6 5v11" />
                  <path d="M10 20v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nikko Day Trip From Tokyo (2026): Getting There, Costs and Whether to Take a Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kamakura-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21c1.5-4 4-6 7-6s5.5 2 7 6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera and the Fares</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the coach, or just the seat</h2>
            <p className={styles.ctaBannerDesc}>
              A join-in coach runs to a fixed capacity on a fixed date and is the one part of a
              Karuizawa day worth settling early — especially in foliage season. If you would rather
              own the itinerary, the shinkansen seats are sold on the same account. Klook checks out in
              English and takes foreign cards.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={karuizawaShinjukuDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Karuizawa day tours on Klook →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
