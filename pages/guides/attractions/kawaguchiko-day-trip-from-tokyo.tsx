import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  fujiPhotographyDayTour,
  kawaguchikoPrivateDayTour,
  kawaguchikoYamanakakoBusTour,
  mtFujiPass,
  tokyoMtFujiHighwayBus,
} from "../../../lib/klook-links";

/**
 * The Kawaguchiko-only day trip, as distinct from the two Fuji guides either side of it:
 * mt-fuji-day-trip-tokyo is the independent route to the mountain in general, and
 * mt-fuji-day-tour-from-tokyo compares the coach tours that go to the Subaru Line Fifth
 * Station. This page is the north-shore day — Chureito Pagoda, Oishi Park, the ropeway,
 * the lake boat and Oshino Hakkai — and nothing above the lake.
 *
 * Every fare, hour and journey time below was read off the operator's own site on
 * 21 Oct 2026 and is dated in the copy: bus.fujikyu.co.jp (highway bus and the
 * Kawaguchiko sightseeing bus), fujikyu-railway.jp (Otsuki–Kawaguchiko fares),
 * mtfujiropeway.jp (ropeway), fujigokokisen.jp (the lake boats) and
 * vill.oshino.lg.jp plus en.fujiyoshida.net (Oshino Hakkai and Arakurayama Sengen Park).
 * The Mt. Fuji Pass figures come from lib/attraction-prices.ts, which carries its own date.
 *
 * No Klook price appears: Klook answers automated reads of its product pages with HTTP
 * 403, so there is no figure here we could have verified.
 */

/** Everything on this page except the Mt. Fuji Pass was read off its operator on this date. */
const CHECKED_ISO = "2026-10-21";
const CHECKED = checkedLabel(CHECKED_ISO);
/** The pass keeps the date from the guide that verified it. */
const PASS_CHECKED = checkedLabel(PRICES.mtFujiPass.checked);

const routeRows = [
  {
    route: "Highway bus, Shinjuku → Kawaguchiko Station",
    time: "Listed as approximately 1 hr 45 min",
    fare: "¥2,200 adult (¥2,000 booked online); child ¥1,100 / ¥1,000",
    notes: "The default. Direct, no transfer, and the most departures of any route on the list",
  },
  {
    route: "Highway bus, Tokyo Station / Ueno",
    time: "About 130 min",
    fare: "From ¥2,300 adult",
    notes: "Useful if you are based on the Marunouchi or Ueno side rather than west Tokyo",
  },
  {
    route: "Highway bus, Shibuya",
    time: "About 120 min",
    fare: "From ¥2,300 adult",
    notes: "Also serves Fuji-Q Highland and Mt. Fuji Station on the way",
  },
  {
    route: "Highway bus, Haneda Airport / Shinagawa",
    time: "About 180 min",
    fare: "From ¥2,300 adult",
    notes: "Goes straight from the airport, which saves a city transfer on an arrival day",
  },
  {
    route: "Train: JR Chuo Line to Otsuki, then Fujikyu Railway",
    time: "Fujikyu leg Otsuki → Kawaguchiko",
    fare: "¥1,170 adult, ¥590 child; limited express supplement ¥400 adult / ¥200 child",
    notes: "The Fujikyu portion is a private line, so a JR Pass stops at Otsuki and you pay this part",
  },
];

const stopRows = [
  {
    stop: "Arakurayama Sengen Park (Chureito Pagoda)",
    price: "No admission fee published on the official listing",
    hours: "Open 24 hours; seasonal evening illumination between 16:00 and 21:50",
    getting: "398 steps up from the park entrance; about 25 minutes on foot from Shimoyoshida Station on the Fujikyu Railway Line",
    source: "en.fujiyoshida.net",
  },
  {
    stop: "Oishi Park, on the north shore of Lake Kawaguchi",
    price: "Free to walk",
    hours: "Open park — no gate",
    getting: "Red Line sightseeing bus from Kawaguchiko Station",
    source: "bus.fujikyu.co.jp (bus route)",
  },
  {
    stop: "Mt. Fuji Panoramic Ropeway",
    price: "Round trip ¥1,200 adult and ¥600 child from 1 November 2026",
    hours: "Closed 7–18 December 2026 for annual inspection",
    getting: "Lower station is by the Kawaguchiko lakeside, a Red Line bus stop from the station",
    source: "mtfujiropeway.jp",
  },
  {
    stop: "Lake Kawaguchiko sightseeing boat",
    price: "Appare ¥1,000 adult / ¥500 child; Ensoleillé ¥1,000 / ¥500 one way, ¥1,800 / ¥900 round trip",
    hours: "Published per season — check the operator's business-hours page for your date",
    getting: "Boarding at the Kawaguchiko lakeside, near the ropeway station",
    source: "fujigokokisen.jp",
  },
  {
    stop: "Oshino Hakkai (the eight spring-water ponds)",
    price: "Free, except Sokonashi-ike: ¥300 adult (junior high and over), ¥150 child, ¥100 ages 1 to pre-school",
    hours: "The ponds can be seen 24 hours; Sokonashi-ike is inside the Hannoki Bayashi museum grounds, 09:00–17:00",
    getting: "Bus from Kawaguchiko or Fujisan Station — it is inland, away from the lake",
    source: "vill.oshino.lg.jp",
  },
];

const passRows = [
  {
    option: "Kawaguchiko sightseeing bus, 1-day pass",
    adult: "¥1,500",
    child: "¥750",
    what: "Unlimited rides on the Red, Green and Blue Lines around Kawaguchiko, Saiko and the Motosuko lakes",
  },
  {
    option: "Kawaguchiko sightseeing bus, 2-day pass",
    adult: "¥2,000",
    child: "¥1,000",
    what: "The same three lines over two consecutive days — only worth it if you stay the night",
  },
  {
    option: "Single ride on the sightseeing bus",
    adult: "From ¥180",
    child: "—",
    what: "Zone-based fare, no reservation; the Red Line is a scheduled local bus",
  },
  {
    option: "Mt. Fuji Pass, 1 day",
    adult: PRICES.mtFujiPass.adult,
    child: PRICES.mtFujiPass.child,
    what: "Unlimited buses and trains across the whole Fuji area plus the ropeway and the lake cruise — sold to foreign passport holders only",
  },
];

const whoFor = [
  {
    title: "Go by highway bus if…",
    desc: `You want the simplest version. Shinjuku to Kawaguchiko Station is listed at approximately 1 hour 45 minutes with no transfer, at ¥2,200 for an adult or ¥2,000 booked online, and the bus also runs from Tokyo Station, Shibuya, Akihabara, Ikebukuro and Haneda. It is the one route where a late start still leaves you a usable day. Fares and times read off the Fujikyu bus site on ${CHECKED}.`,
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
    title: "Go by train if…",
    desc: `The Chureito Pagoda is the point of your day. The pagoda is at Shimoyoshida, which is a Fujikyu Railway station a few stops short of Kawaguchiko — so the train lets you do the pagoda first and the lake afterwards without doubling back. The Fujikyu leg from Otsuki is ¥1,170 for an adult and ¥590 for a child, plus ¥400 for a limited express seat, and it is a private line a JR Pass does not cover. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
  {
    title: "Take a tour if…",
    desc: "You would rather not plan the connections, or you want the Fifth Station on the mountain itself as well as the lake. A coach collapses the day into one booking and removes the two things most likely to go wrong — missing the Red Line bus, and missing the last bus home. It also removes your ability to wait out a cloud.",
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
    title: "Pick two or three stops, not five",
    desc: "The Kawaguchiko area is not compact. The Chureito Pagoda is on the railway several stops from the lake, Oishi Park is along the north shore, and Oshino Hakkai is inland on a different bus. Two of those plus the ropeway or the boat is a full day; attempting all of them is a day spent waiting at bus stops.",
  },
  {
    title: "Book the outbound leg, then work out the bus pass",
    desc: `The highway bus is a reserved seat, so that is the first booking. Once you know your arrival time, decide between single fares and a pass: the Kawaguchiko sightseeing bus is from ¥180 a ride on a zone fare, and the 1-day pass across the Red, Green and Blue Lines is ¥1,500 for an adult and ¥750 for a child. Three or more hops pays for the pass; two does not. Read off the Fujikyu bus site on ${CHECKED}.`,
  },
  {
    title: "Decide whether the Mt. Fuji Pass is a different question",
    desc: `It is. The Mt. Fuji Pass is ${PRICES.mtFujiPass.adult} for one day and covers unlimited buses and trains across the whole Fuji area plus the ropeway and the lake cruise, but it is sold only to foreign passport holders and your passport is checked at purchase. For a single day confined to the north shore, the ¥1,500 local bus pass plus individual tickets is usually less. Pass prices checked ${PASS_CHECKED}.`,
  },
  {
    title: "Check the ropeway before you build an afternoon on it",
    desc: `The Mt. Fuji Panoramic Ropeway publishes a round-trip fare of ¥1,200 for an adult and ¥600 for a child from 1 November 2026, and it closes entirely from 7 to 18 December 2026 for annual inspection. Occasional maintenance days also cut the last ascent short. Read off the operator's own notice on ${CHECKED}.`,
  },
  {
    title: "Fix the return leg before you start sightseeing",
    desc: "This is the step people skip and regret. Both the bus and the direct train thin out through the evening, and the Kawaguchiko area has no useful late service back to Tokyo. Book the return at the same time as the outbound and treat it as the hard edge of the day.",
  },
  {
    title: "Accept that the mountain may be in cloud",
    desc: "Fuji makes its own weather and spends a great deal of the year hidden. Nobody can sell you a guarantee, so choose stops — the lake shore, the spring-water ponds, the pagoda itself — that you would be happy with on a grey day. The cooler, drier months and the earlier part of the day give better odds.",
  },
];

const faqItems = [
  {
    q: "How do you get from Tokyo to Kawaguchiko?",
    a: `The highway bus is the simplest route: Shinjuku to Kawaguchiko Station is listed at approximately 1 hour 45 minutes, direct, at ¥2,200 for an adult or ¥2,000 if you book online, with child fares at ¥1,100 and ¥1,000. The same operator runs buses from Tokyo Station and Ueno (about 130 minutes, from ¥2,300), Shibuya (about 120 minutes, from ¥2,300), Akihabara and Ikebukuro (from ¥2,200) and Haneda Airport via Shinagawa (about 180 minutes, from ¥2,300). By rail you take the JR Chuo Line to Otsuki and change to the Fujikyu Railway, where Otsuki to Kawaguchiko is ¥1,170 for an adult and ¥590 for a child, plus a ¥400 limited express supplement. All figures read off the Fujikyu bus and Fujikyu Railway sites on ${CHECKED}.`,
  },
  {
    q: "Is Kawaguchiko worth a day trip from Tokyo?",
    a: "Yes, if you want to look at Mt. Fuji rather than stand on it. The north shore of Lake Kawaguchi is where the photographs come from — the Chureito Pagoda above Fujiyoshida, the lake at Oishi Park, the spring-fed ponds at Oshino Hakkai — and all of it is reachable on public transport in a day. What a day trip here does not give you is the mountain itself: the Fuji Subaru Line Fifth Station is a separate journey up a toll road with no station, and that is the thing coach tours exist for.",
  },
  {
    q: "How long does a Kawaguchiko day trip take?",
    a: "A full day, not a half day. The fastest direct leg is listed at about 1 hour 45 minutes each way, so three and a half hours are gone before you have seen anything, and the stops around the lake are far enough apart that moving between two of them takes a real bite out of the afternoon. Plan it as the only thing you do that day, and fix your return before you leave Tokyo.",
  },
  {
    q: "What is there to do in Kawaguchiko in one day?",
    a: `Five things carry the area, and you can fit two or three. The Chureito Pagoda in Arakurayama Sengen Park is 398 steps up from the entrance and about 25 minutes on foot from Shimoyoshida Station, open 24 hours with no admission fee published on the official listing. Oishi Park on the north shore is a free lakeside walk. The Mt. Fuji Panoramic Ropeway runs up Mt. Tenjo for a round trip of ¥1,200 adult and ¥600 child from 1 November 2026. The lake boats are ¥1,000 for an adult and ¥500 for a child. Oshino Hakkai, inland, is free to walk except Sokonashi-ike, which sits inside the Hannoki Bayashi museum grounds at ¥300 for an adult and ¥150 for a child, 09:00 to 17:00. All checked ${CHECKED}.`,
  },
  {
    q: "How do you get around once you are in Kawaguchiko?",
    a: `On the Kawaguchiko sightseeing bus, which runs three colour-coded lines — the Red Line around the north shore of Lake Kawaguchi including Oishi Park, the Green Line around Lake Saiko, and the Blue Line out to Narusawa, Shoji and Lake Motosu. It is a scheduled local bus, so there is nothing to reserve. A single ride starts at ¥180 on a zone-based fare, and an unlimited pass across all three lines is ¥1,500 for an adult and ¥750 for a child for one day, or ¥2,000 and ¥1,000 for two. Read off the Fujikyu bus site on ${CHECKED}.`,
  },
  {
    q: "Do you need the Mt. Fuji Pass for a Kawaguchiko day trip?",
    a: `Usually not. The Mt. Fuji Pass covers unlimited buses and trains across the whole Mt. Fuji area plus the ropeway and the lake cruise, at ${PRICES.mtFujiPass.adult} for one day, ¥10,200 for two and ¥12,400 for three for an adult, with half price for a child — and it is sold to foreign passport holders only, with a passport check at purchase. For one day confined to the north shore, the ¥1,500 local bus pass plus the ropeway and boat tickets individually comes to less. The pass earns its price when you are moving across the whole Fuji area or staying more than a day. Pass prices checked ${PASS_CHECKED}; bus pass prices ${CHECKED}.`,
  },
  {
    q: "When is the best time of day and year to go?",
    a: "Earlier is better on both counts. Mt. Fuji is more often visible in the cooler, drier months than in the warm, humid ones, and more often in the morning than the afternoon — but that is a tendency, not a promise, and a Tokyo forecast tells you very little about what the summit is doing. The practical consequence is to take the earliest bus you are willing to take, and to check a Kawaguchiko-area forecast the night before rather than a Tokyo one.",
  },
  {
    q: "Can you do Kawaguchiko with children?",
    a: `It works, with fewer stops. The journey is long enough that two destinations plus lunch is a realistic day for a child, and the 398 steps at the Chureito Pagoda are the one stop that may not suit everybody. The things children tend to like best are the two with child fares: the ropeway at ¥600 for a child from 1 November 2026, and the lake boat at ¥500. Oshino Hakkai is flat, free to walk and short. Fuji-Q Highland is also on the same bus route if an amusement park is the better use of the day — our Fuji-Q guide covers its passes. Checked ${CHECKED}.`,
  },
  {
    q: "What happens if it rains, and what should I wear?",
    a: "Rain takes the mountain out of the day, so a wet forecast is a genuine reason to swap the date if you can — this is one of the few day trips where the weather is most of the product. If you go anyway, the indoor-ish options are the lake boat and the museums around the north shore; the ropeway can stop running in poor weather. Dress for a place noticeably cooler and windier than Tokyo, especially on the ropeway and at the top of the pagoda steps, and wear shoes you are happy climbing 398 steps in.",
  },
  {
    q: "Kawaguchiko or the Fuji Subaru Line Fifth Station?",
    a: "Kawaguchiko if you want to see Fuji, the Fifth Station if you want to be on it. The north shore gives you the classic views — the pagoda, the lake, the ponds — and is entirely doable on public transport. The Fifth Station is halfway up the mountain by road, has no railway station, and needs a further bus on a thin timetable, which is why nearly every coach tour from Tokyo is built around it. Our Mt. Fuji day tour comparison covers which itineraries go where.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/kawaguchiko-day-trip-from-tokyo") },
});

const TITLE = "Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day";
const DESC =
  "A Kawaguchiko day trip from Tokyo in 2026: the ¥2,200 highway bus from Shinjuku in about 1 hr 45 min, official fares for the ropeway, lake boat and sightseeing bus, and the two or three stops that actually fit.";

export default function KawaguchikoDayTripFromTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kawaguchiko-day-trip-from-tokyo" />
        {hreflangLinks("/guides/attractions/kawaguchiko-day-trip-from-tokyo")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kawaguchiko-day-trip-from-tokyo" />
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
              route: "/guides/attractions/kawaguchiko-day-trip-from-tokyo",
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
                  name: "Kawaguchiko Day Trip From Tokyo",
                  item: "https://www.japan-travel-kit.com/guides/attractions/kawaguchiko-day-trip-from-tokyo",
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
          <span className={styles.breadCurrent}>Kawaguchiko Day Trip From Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kawaguchiko Day Trip From Tokyo (2026):<br />Routes, Fares and What Fits in a Day
          </h1>
          <p className={styles.heroSubtitle}>
            The north shore of Lake Kawaguchi is about 1 hour 45 minutes and ¥2,200 from Shinjuku by
            bus. Here is what that buys, and how many stops a single day really holds.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares, dated", "Chureito, lake & Oshino Hakkai"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Shinjuku → Kawaguchiko</p>
                <p className={styles.verdictStatValue}>~1 hr 45 min, ¥2,200 one way</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Booked online</p>
                <p className={styles.verdictStatValue}>¥2,000 adult, ¥1,000 child</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Local bus pass</p>
                <p className={styles.verdictStatValue}>¥1,500 a day (child ¥750)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Stops that fit in a day</p>
                <p className={styles.verdictStatValue}>Two or three, not five</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a Kawaguchiko day trip from Tokyo is a direct highway bus of
              about 1 hour 45 minutes from Shinjuku, listed at ¥2,200 for an adult or ¥2,000 booked
              online, and a day on the north shore of the lake. Pick two or three of the five things
              there — the Chureito Pagoda, Oishi Park, the Mt. Fuji Panoramic Ropeway, the lake boat and
              Oshino Hakkai — because they are spread across a railway line, a lake shore and an inland
              bus route. The local sightseeing bus is from ¥180 a ride, or ¥1,500 for a day of unlimited
              rides. Fares read off the Fujikyu bus site on {CHECKED}.
            </p>
            <a
              href={tokyoMtFujiHighwayBus.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check Tokyo–Kawaguchiko bus seats on Klook →
            </a>
          </div>
        </div>

        {/* Intro / scope */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What a Kawaguchiko Day Actually Covers</h2>
          <p className={styles.bodyText}>
            Kawaguchiko is the north-shore town on Lake Kawaguchi, and it is where almost every
            photograph of Mt. Fuji you have seen was taken from. That is the whole appeal: you are
            looking at the mountain across water or over a pagoda roof, not standing on it. The five
            things worth the trip are the Chureito Pagoda in Arakurayama Sengen Park, the lakeside at
            Oishi Park, the Mt. Fuji Panoramic Ropeway up Mt. Tenjo, the sightseeing boat on the lake,
            and the spring-water ponds at Oshino Hakkai, inland.
          </p>
          <p className={styles.bodyText}>
            This guide is deliberately narrower than the two either side of it. If you want the
            independent route to the Fuji area in general — the direct limited express, what the Mt.
            Fuji Pass covers, which season gives the best odds of a clear summit — that is our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">Mt. Fuji day trip guide</Link>. If
            you want the Fuji Subaru Line Fifth Station, on the mountain itself, there is no train to it
            and a coach is the sensible route: our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt. Fuji day tour comparison</Link>{" "}
            covers which itineraries go where. This page is the lake.
          </p>
        </section>

        {/* Routes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get From Tokyo to Kawaguchiko?</h2>
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
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Bus times and fares read off the Fujikyu bus site, and the Otsuki–Kawaguchiko fares off the
            Fujikyu Railway site, on {CHECKED}. Subject to change — confirm when you book. Note that the
            Fujikyu Railway is a private line, so a Japan Rail Pass covers you only as far as Otsuki; our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            works through whether a pass earns its price across the rest of a trip.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo–Kawaguchiko bus on Klook →
            </a>
          </div>
        </section>

        {/* Which version */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which version</span>
          <h2 className={styles.sectionTitle}>Bus, Train or a Tour?</h2>
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

        {/* The five stops */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What to see</span>
          <h2 className={styles.sectionTitle}>What Is There to Do in Kawaguchiko in One Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Five stops carry the area, and a day holds two or three of them. Every price and hour below
            is the operator&apos;s own, with the site it came from.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Admission", "Hours / closures", "Getting there", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stopRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            All five read off those operators&apos; own sites on {CHECKED}, and subject to change. The
            ropeway fare above is the figure its operator published as taking effect on 1 November 2026;
            check the current one before you go. For the admissions we track across the rest of Japan,
            each with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Local transport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>Is the Sightseeing Bus Pass Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Three or more hops, yes; two, no. The Kawaguchiko sightseeing bus runs three colour-coded
            lines out of Kawaguchiko Station — Red around the north shore of Lake Kawaguchi, Green around
            Lake Saiko, Blue out to Narusawa, Shoji and Lake Motosu — as scheduled local buses with
            nothing to reserve.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Adult", "Child", "What it covers"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Sightseeing bus prices read off the Fujikyu bus site on {CHECKED}; Mt. Fuji Pass prices off
            the official Fujikyu pass site on {PASS_CHECKED}. The Mt. Fuji Pass is sold to foreign
            passport holders only and your passport is checked at purchase.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={mtFujiPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Mt. Fuji Pass on Klook →
            </a>
          </div>
        </section>

        {/* Planning steps */}
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            If the Kawaguchiko day is replacing a city day, it is worth knowing what it costs you: our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> sets out
            what three days in the city actually hold, and the honest answer is that a Fuji day inside
            three is a bad trade. If you would rather have a hot-spring loop than a mountain view,{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone</Link> is the easier of
            the two to do independently, because one pass covers the whole circuit. And if the roller
            coasters are the real draw,{" "}
            <Link href="/guides/attractions/fuji-q-highland-tickets">Fuji-Q Highland</Link> is on the
            same bus route.
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
          heading="The Guided Versions of This Day"
          intro="Three Kawaguchiko-area day tours out of Tokyo and the seat-only bus, for when the connections are the part you would rather not own. Klook blocks automated price reads, so open a listing for the figure and the departure point on your date."
          tours={[kawaguchikoYamanakakoBusTour, fujiPhotographyDayTour, kawaguchikoPrivateDayTour, tokyoMtFujiHighwayBus]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip From Tokyo (2026): Shinkansen Times and the Five Stops</p>
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
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18" />
                  <circle cx="7.5" cy="19" r="1.5" />
                  <circle cx="16.5" cy="19" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/fuji-q-highland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fuji-Q Highland Tickets (2026): Free Pass Prices, the Q Pack &amp; How to Get There</p>
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
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
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
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the leg that decides the day</h2>
            <p className={styles.ctaBannerDesc}>
              The highway bus is a reserved seat and the last useful services back to Tokyo go in the
              evening, so the outbound and the return are the two bookings worth settling first. Klook
              checks out in English and takes foreign cards.
            </p>
            <a href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Tokyo–Kawaguchiko bus tickets on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
