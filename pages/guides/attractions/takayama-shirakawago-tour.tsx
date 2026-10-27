import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  klookEsim,
  shirakawagoGokayamaKanazawaBusTour,
  shirakawagoKanazawaDayTour,
  shirakawagoLightUpTakayamaDayTour,
  shirakawagoLineBusTicket,
  shirakawagoObservationDeckDayTour,
  shirakawagoTakayamaKanazawaDayTour,
  shirakawagoTakayamaOldTownDayTour,
  takayamaShirakawagoGokayamaUnescoTour,
  takayamaShirakawagoNagoyaDayTrip,
  takayamaShirakawagoOneDayBusTour,
} from "../../../lib/klook-links";

/**
 * A Takayama and Shirakawa-go tour, written as a which-departure guide.
 * Added 27 Oct 2026.
 *
 * Every fare and journey time on this page was read off the operating bus
 * company's own site on 27 October 2026:
 *  - the ¥2,800 Takayama Nohi Bus Center → Shirakawa-go fare, the ¥4,200 to
 *    Kanazawa Station, the ¥3,800 to Toyama and the ¥3,300 to Takaoka, the
 *    ¥2,800 / ¥2,400 / ¥2,200 fares onward from Shirakawa-go, the "2h5m–2h20m"
 *    Takayama–Kanazawa journey time, the "approximately 50 minutes" Takayama →
 *    Shirakawa-go figure, the R-marked reservation-required services and the two
 *    reservation centre numbers, from nouhibus.co.jp (Nohi Bus);
 *  - the ¥2,800 adult / ¥1,400 child Kanazawa Station West Exit → Shirakawa-go
 *    fare, the 1h15m journey, the ¥4,200 / ¥2,100 fare and 2h15m to Takayama,
 *    and the 座席指定制 reserved-seating rule, from hokutetsu.co.jp (Hokuriku
 *    Railroad).
 *
 * The winter light-up dates and rules are the Shirakawa-go Tourist
 * Association's own, from its event page for the 41st (2027) event, read the
 * same day. That page is the reason this guide states the event is
 * reservation-only rather than describing it as something you can turn up to.
 *
 * Tour durations, stops and guide languages are as the Klook listings describe
 * them, confirmed through the www.klook.com search index on 27 Oct 2026 — Klook
 * answers automated reads of its product pages with HTTP 403, which is also why
 * no Klook price appears anywhere on this page.
 *
 * One deliberate gap: Nohi Bus publishes its round-trip (往復) Shirakawa-go
 * ticket price only inside its Japanese reservation flow, not as a table, so
 * only the one-way fares are printed here.
 */

const OWN_ISO = "2026-10-27";
const OWN = checkedLabel(OWN_ISO);

const NOHI_ONE_WAY = "¥2,800";
const HOKUTETSU_ONE_WAY = "¥2,800";
const NOHI_TAKAYAMA_KANAZAWA = "¥4,200";

/** The three places a Takayama and Shirakawa-go tour can start from. */
const departureRows = [
  {
    from: "Nagoya",
    length: "About 11 hours on the listing",
    stops: "Shirakawa-go and the Takayama old town, roughly two hours at each",
    included: "Coach from Nagoya Station; a Hida beef or buffet lunch is offered on one of the two listings rather than included on both",
    pick: "The default if you are coming off the Tokaido Shinkansen. It is the longest day of the three and the one that needs no overnight anywhere in Chubu.",
  },
  {
    from: "Kanazawa",
    length: "8 to 10 hours on the listing",
    stops: "Shirakawa-go and the Takayama old town; a second Kanazawa listing adds the Gokayama villages",
    included: "An English-speaking licensed guide, and the choice of a round trip back to Kanazawa or a one-way drop-off in Takayama",
    pick: "The best-value version if you are already on the Hokuriku Shinkansen, and the only one that will leave you in Takayama rather than bring you back.",
  },
  {
    from: "Takayama",
    length: "7 hours 20 minutes on the listing",
    stops: "Ainokura in Gokayama, the Gassho-zukuri Minkaen open-air museum and the Shiroyama Tenshukaku observation deck",
    included: "The Nohi Bus run and the stops above, with a Japanese-speaking assistant rather than an English guide",
    pick: "The one to take if you are staying in Takayama and want the deck and Gokayama as well — but read the guide-language line first.",
  },
];

/** Nohi Bus and Hokuriku Railroad fares, each against the operator's own site. */
const busRows = [
  {
    route: "Takayama Nohi Bus Center → Shirakawa-go",
    time: "Approximately 50 minutes",
    fare: `${NOHI_ONE_WAY} one way, adult`,
    book: "Some departures are marked R (reservation required) on the timetable; the rest are non-reserved",
    source: `nouhibus.co.jp, ${OWN}`,
  },
  {
    route: "Kanazawa Station West Exit → Shirakawa-go",
    time: "1 hour 15 minutes",
    fare: `${HOKUTETSU_ONE_WAY} adult, ¥1,400 child`,
    book: "Reserved seating (座席指定制) — Hokuriku Railroad states you must book before boarding",
    source: `hokutetsu.co.jp, ${OWN}`,
  },
  {
    route: "Takayama → Kanazawa Station (through Shirakawa-go)",
    time: "2 hours 5 minutes to 2 hours 20 minutes",
    fare: `${NOHI_TAKAYAMA_KANAZAWA} one way, adult (¥2,100 child on the Hokuriku Railroad table)`,
    book: "Reservation required on the Kanazawa Line",
    source: `nouhibus.co.jp and hokutetsu.co.jp, ${OWN}`,
  },
  {
    route: "Shirakawa-go → Kanazawa Station",
    time: "1 hour 15 minutes",
    fare: "¥2,800 one way, adult",
    book: "Reserved seating — book in advance",
    source: `nouhibus.co.jp, ${OWN}`,
  },
  {
    route: "Shirakawa-go → Toyama Station",
    time: "Not published as a figure on the fare page",
    fare: "¥2,400 one way, adult",
    book: "Reservation required on most departures",
    source: `nouhibus.co.jp, ${OWN}`,
  },
  {
    route: "Shirakawa-go → Takaoka / Shin-Takaoka Station",
    time: "Not published as a figure on the fare page",
    fare: "¥2,200 one way, adult",
    book: "Reservation required on most departures",
    source: `nouhibus.co.jp, ${OWN}`,
  },
];

/** Tour against doing it on the service bus. */
const compareRows = [
  {
    option: "Nohi service bus from Takayama, no tour",
    cost: `${NOHI_ONE_WAY} each way on Nohi Bus's own fare, about 50 minutes`,
    gets: "Shirakawa-go on your own clock, for as long or as short as the timetable allows, with nothing reserved on the non-R departures.",
    pick: "The cheapest version by a wide margin, and the right one if you are already sleeping in Takayama and only want the village.",
  },
  {
    option: "Guided day from Takayama",
    cost: "Check the listing for your date",
    gets: "Ainokura in Gokayama, the Gassho-zukuri Minkaen museum and the Shiroyama Tenshukaku deck, which three separate bus legs would otherwise be.",
    pick: "If Gokayama is on the list. Reaching Ainokura and Shirakawa-go in the same day on service buses is tight; the listing does it in 7 hours 20.",
  },
  {
    option: "Guided day from Kanazawa",
    cost: "Check the listing for your date",
    gets: "Both the village and the Takayama old town with an English-speaking licensed guide, and optionally a one-way drop-off in Takayama.",
    pick: "The best fit for a Hokuriku Shinkansen trip — and the one that lets the day double as the journey from Kanazawa to Takayama.",
  },
  {
    option: "Guided day from Nagoya",
    cost: "Check the listing for your date",
    gets: "Roughly two hours at each of Shirakawa-go and Takayama, with the whole 11 hours of driving handled.",
    pick: "If you have one day out of Nagoya and no intention of staying in the mountains. Doing it from Nagoya by train and bus in a day is possible but joyless.",
  },
  {
    option: "Guided day with the Ogimachi observation deck ticketed",
    cost: "Check the listing for your date",
    gets: "The deck access sold as part of the booking rather than left to a shuttle queue on the day.",
    pick: "If the view over the thatched roofs is the photograph you came for.",
  },
  {
    option: "Winter light-up day from Takayama",
    cost: "Check the listing for your date",
    gets: "A 5 to 5.5-hour evening on one of the four 2027 light-up dates, with the choice of the open-air museum or the Ogimachi Castle Ruins deck.",
    pick: "The only realistic way in if you are not sleeping in the village — the event is reservation-only and sells no same-day tickets at all.",
  },
];

const faqItems = [
  {
    q: "How do I visit Shirakawa-go from Takayama?",
    a: `On the Nohi Bus Shirakawa-go Line, which Nohi Bus's own site puts at approximately 50 minutes and ${NOHI_ONE_WAY} one way for an adult from the Takayama Nohi Bus Center, next to JR Takayama Station. Read on ${OWN}. There is no train — Shirakawa-go has no railway station at all, which is the single fact that shapes every plan on this page. The bus continues through the village to Kanazawa (¥2,800 onward), Toyama (¥2,400) and Takaoka (¥2,200), so the same ride can be a day trip or the first half of a journey out of the mountains. The alternative is a guided day out of Takayama, which is listed at 7 hours 20 minutes and adds Ainokura in Gokayama, the Gassho-zukuri Minkaen open-air museum and the Shiroyama Tenshukaku observation deck — three stops a service bus will not join up for you.`,
  },
  {
    q: "Is a Shirakawa-go tour worth it?",
    a: `It depends entirely on where you are starting from, and the answer flips. From Takayama, no, not for the village alone: the service bus is about 50 minutes and ${NOHI_ONE_WAY}, the village is small enough to walk, and a tour mostly buys you a timetable. From Takayama it becomes worth it the moment you want Gokayama or the observation deck as well, because those are separate bus legs. From Kanazawa it is usually worth it — the guided day is 8 to 10 hours with an English-speaking licensed guide and covers both Shirakawa-go and the Takayama old town, which is two reserved bus bookings and a lot of clock-watching if you do it yourself. From Nagoya it is nearly always worth it, because the alternative is roughly 11 hours of your own connections.`,
  },
  {
    q: "Do I need to book the Shirakawa-go bus in advance?",
    a: `From Kanazawa, yes, always. Hokuriku Railroad states the Kanazawa–Shirakawa-go service is reserved-seating (座席指定制) and that you must book before boarding; the fare is ${HOKUTETSU_ONE_WAY} for an adult and ¥1,400 for a child, on a journey of 1 hour 15 minutes. From Takayama it is mixed: Nohi Bus marks some departures R for "reservation required" on its own timetable and states that everything except those is non-reserved, so there are walk-up seats — but they are finite and this is a single-lane mountain road in a region with no train alternative. Book either end if your day depends on it. Nohi Bus's reservation centre is (0577) 32-1688, 9:00 to 17:00, and the Hokuriku Railroad centre for the Kanazawa Line is (076) 234-0123, 9:00 to 18:00. All read on ${OWN}.`,
  },
  {
    q: "When is the Shirakawa-go light-up?",
    a: `The Shirakawa-go Tourist Association has published the 41st event as four evenings only: 11, 17, 24 and 31 January 2027, each from 17:30 to 19:30. Read on ${OWN}. The important part is not the dates but the access rule — the association states it is a complete advance-reservation system (完全事前予約制), that you cannot take part by simply turning up without a reservation, and that no entry tickets are sold on the day. It lists five permitted ways in: staying overnight in the village (which comes with an observation-deck ticket), your own car with a reserved parking space, a taxi using a reserved parking space, a highway-bus tour with a participating carrier, or a travel agency's bus tour — and it notes that the car, taxi and agency-tour routes do not include deck access. Everyone must hold an entry ticket beforehand and wear it visibly.`,
  },
  {
    q: "How long do you need in Shirakawa-go?",
    a: `Two hours covers the village, three if you go up to the observation deck and into a house. Ogimachi is one walkable settlement, not a town: the thatched farmhouses, the Gassho-zukuri Minkaen open-air museum on the far bank and the Shiroyama Tenshukaku viewpoint above it are the whole of it. That is why the Nagoya coach days allow roughly two hours here and spend the rest of their eleven on the road, and why a guided day from Takayama earns its keep by adding Gokayama rather than by adding time in Shirakawa-go. If you want the village quiet, the answer is to sleep there — the coaches arrive late morning and leave mid-afternoon.`,
  },
  {
    q: "Can you do Takayama and Shirakawa-go in one day?",
    a: `Yes, and that is exactly what the Nagoya and Kanazawa listings are for. Both the Nagoya days (about 11 hours) and the Kanazawa days (8 to 10 hours) cover the village and the Takayama old town in one round trip. Doing it yourself in a day from either city means three reserved bus legs and no slack: Kanazawa to Takayama alone is 2 hours 15 minutes and ${NOHI_TAKAYAMA_KANAZAWA} on the operators' own figures. The honest alternative, if you have the nights, is to split it — Takayama is a town worth an evening in its own right, with the morning markets along the Miyagawa and the Sanmachi merchant streets, and Shirakawa-go becomes a half day from there rather than the back half of a long one.`,
  },
  {
    q: "What does the bus cost from Kanazawa to Shirakawa-go?",
    a: `${HOKUTETSU_ONE_WAY} for an adult and ¥1,400 for a child one way, on Hokuriku Railroad's own fare table, for a journey it gives as 1 hour 15 minutes from the Kanazawa Station West Exit. Read on ${OWN}. Carrying on to Takayama is ¥4,200 adult and ¥2,100 child, with a journey of 2 hours 15 minutes — and Nohi Bus, which operates the line jointly, gives the Takayama–Kanazawa run as 2 hours 5 minutes to 2 hours 20 minutes. Both operators sell the same seats, so the route works in either direction at the same price. Note that this is a reserved service: there is no walk-up fallback on the Kanazawa side.`,
  },
  {
    q: "Is Shirakawa-go worth it in summer, or only in the snow?",
    a: `It is a year-round village and a winter photograph. The thatched gassho-zukuri farmhouses, the museum and the deck are all open outside winter, and the rice terraces in front of them are green from late spring — the village is a working UNESCO World Heritage site rather than a seasonal attraction. What is seasonal is the snow, and specifically the light-up, which the tourist association now runs on four January evenings under a reservation-only system. If your trip is not in January, nothing is closed to you; if it is, the light-up is the one thing here you cannot decide on the day.`,
  },
  {
    q: "Is a Shirakawa-go day good with children?",
    a: `Reasonably, with two caveats that are about the bus rather than the village. Ogimachi itself is flat, short and outdoors, the houses you can go into are genuinely interesting to look at from the inside, and child fares are published — ¥1,400 on the Kanazawa bus against ¥2,800 for an adult, and ¥2,100 against ¥4,200 through to Takayama. The caveats: the walk up to the Shiroyama Tenshukaku deck is a climb, and the coach days are long. Eleven hours out of Nagoya with two hours at each end of it is a lot of seat time for a small child; the Takayama departures, at 7 hours 20 minutes or less, are the gentler option.`,
  },
  {
    q: "Does the JR Pass cover the bus to Shirakawa-go?",
    a: `No. The Nohi Bus and Hokuriku Railroad services to Shirakawa-go are private highway buses, not JR buses, so no nationwide or regional JR pass covers them — you pay the fares above on top. What a pass can cover is the rail that gets you to the trailhead: the Hokuriku Shinkansen to Kanazawa, or the Tokaido Shinkansen to Nagoya, or the Takayama Main Line limited express up from Nagoya. Our JR Pass guide works through whether that is worth buying for your own route, and our Tokyo to Kanazawa guide has the Hokuriku Shinkansen side of it.`,
  },
];

const TITLE = "Takayama and Shirakawa-go Tour (2026): Which Departure, and the Bus If You Go Alone";
const DESCRIPTION =
  "A Takayama and Shirakawa-go Tour runs from Nagoya (about 11 hours), Kanazawa (8–10 hours with an English guide) or Takayama itself (7h20m). With Nohi Bus's ¥2,800 fare, the reserved Kanazawa bus, and the four reservation-only 2027 light-up dates.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/takayama-shirakawago-tour") },
});

export default function TakayamaShirakawagoTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/takayama-shirakawago-tour" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/takayama-shirakawago-tour" />
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
              route: "/guides/attractions/takayama-shirakawago-tour",
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
                  name: "Takayama and Shirakawa-go Tour",
                  item: "https://www.japan-travel-kit.com/guides/attractions/takayama-shirakawago-tour",
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
          <span className={styles.breadCurrent}>Takayama and Shirakawa-go Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Takayama and Shirakawa-go Tour (2026):<br />Which Departure, and the Bus If You Go Alone
          </h1>
          <p className={styles.heroSubtitle}>
            There is no train to Shirakawa-go, which is why this is a bus question rather than a rail one.
            Three cities run the day, and only one of them gives you an English guide.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Operator fares, dated", "Nagoya / Kanazawa / Takayama"].map((t) => (
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
                <p className={styles.verdictStatLabel}>From Takayama</p>
                <p className={styles.verdictStatValue}>~50 min, {NOHI_ONE_WAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Kanazawa</p>
                <p className={styles.verdictStatValue}>1h 15m, {HOKUTETSU_ONE_WAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Guided day length</p>
                <p className={styles.verdictStatValue}>7h20m – 11h</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2027 light-up</p>
                <p className={styles.verdictStatValue}>4 evenings, booking only</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Takayama and Shirakawa-go Tour</strong> starts in one of three places, and that choice
              decides the whole day. From <strong>Nagoya</strong> it is a coach day of{" "}
              <strong>about 11 hours</strong> with roughly two hours at each of the two stops. From{" "}
              <strong>Kanazawa</strong> it is <strong>8 to 10 hours</strong> with an{" "}
              <strong>English-speaking licensed guide</strong>, and it can be booked as a one-way drop-off in
              Takayama rather than a round trip. From <strong>Takayama</strong> itself the guided day runs{" "}
              <strong>7 hours 20 minutes</strong> and adds Ainokura in Gokayama, the Gassho-zukuri Minkaen
              museum and the Shiroyama Tenshukaku deck — but with a Japanese-speaking assistant, not an English
              guide. Going alone, Nohi Bus charges <strong>{NOHI_ONE_WAY}</strong> one way for the{" "}
              <strong>50-minute</strong> run from Takayama, and Hokuriku Railroad <strong>{HOKUTETSU_ONE_WAY}</strong>{" "}
              for the <strong>1 hour 15 minute</strong> run from Kanazawa — which is reserved-seating and must be
              booked. There is no railway station in Shirakawa-go at all. Fares and times read off the operators&apos;
              own sites on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                English-Guided Day From Kanazawa →
              </KlookLink>
              <KlookLink href={takayamaShirakawagoNagoyaDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Day Trip From Nagoya →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why This Is a Bus Decision, Not a Train One</h2>
          <p className={styles.bodyText}>
            Shirakawa-go has no railway station. The nearest rail is at Takayama, about 50 minutes away by
            highway bus, or at Kanazawa, an hour and a quarter in the other direction — and the single road
            between them is the only way in. Everything awkward about planning this trip follows from that one
            fact: there is no turn-up-and-go train, no IC card tap, and on the Kanazawa side no walk-up seat
            either.
          </p>
          <p className={styles.bodyText}>
            What you are going to see is a working UNESCO World Heritage village. Ogimachi is a single
            walkable settlement of thatched <em>gassho-zukuri</em> farmhouses on a river flat, with an
            open-air museum of relocated houses across the water and a viewpoint on the hill above. Two
            hours covers it; three if you go up to the deck and inside a house. That is why the coach days
            out of Nagoya spend nine of their eleven hours elsewhere, and why the question is which departure
            rather than how long to stay.
          </p>
          <p className={styles.bodyText}>
            <strong>Takayama</strong> is the other half of the name and a genuine town rather than a stop: the
            morning markets along the Miyagawa, the Sanmachi merchant streets, the sake breweries. Most
            packaged days give it about as long as they give the village, which is enough for a walk and not
            enough for a morning market. If both matter to you, the honest answer is a night in Takayama and
            a half day out to Shirakawa-go — and the Kanazawa listing that drops you in Takayama instead of
            driving you back is the one that makes that cheap.
          </p>
        </section>

        {/* Departure comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which departure</span>
          <h2 className={styles.sectionTitle}>Nagoya, Kanazawa or Takayama — Which Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The three columns that actually decide it are the length, what the day includes beyond the village,
            and the language the guide speaks. Only the values Klook&apos;s own listings state are below —
            durations, stops and inclusions, confirmed on {OWN}. No price appears, because Klook&apos;s product
            pages refuse automated reads and a coach fare moves with the season in any case.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Departs", "Length", "What it covers", "What's included", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {departureRows.map((row) => (
                    <tr key={row.from}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.from}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.stops}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.included}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            One line in that table is worth reading twice. The Takayama departure is the most generous
            itinerary of the three — Gokayama, the open-air museum and the observation deck — and it is the
            one guided by a Japanese-speaking assistant rather than an English guide. If you want commentary
            in English, the Kanazawa day is the listing that promises it. If you want the stops and do not
            mind reading the plaques yourself, the Takayama day is shorter and covers more ground.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={takayamaShirakawagoGokayamaUnescoTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Takayama: Gokayama &amp; the deck →
            </KlookLink>
            <KlookLink href={shirakawagoGokayamaKanazawaBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kanazawa: with Gokayama →
            </KlookLink>
            <KlookLink href={shirakawagoTakayamaOldTownDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nagoya: Hida beef lunch option →
            </KlookLink>
          </div>
        </section>

        {/* Bus fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Going alone</span>
          <h2 className={styles.sectionTitle}>What Does the Bus to Shirakawa-go Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Every figure below is the operating company&apos;s own published fare, with the site it came from
            and the date it was read. Two operators share the line — Nohi Bus out of Takayama and Hokuriku
            Railroad out of Kanazawa — and they sell the same seats, so the route works in either direction
            at the same price.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Journey time", "Official fare", "Reservation", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {busRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.book}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm with the operator at booking. Nohi Bus publishes its round-trip
            Shirakawa-go ticket price only inside its own reservation flow rather than as a table, so only
            one-way fares are printed here; Klook sells the same Nohi seat as a one-way or round-trip voucher
            if you would rather not telephone a Japanese call centre. No JR pass covers either operator —
            both are private highway buses.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shirakawagoLineBusTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nohi Shirakawa-go Line bus ticket →
            </KlookLink>
          </div>
        </section>

        {/* Reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book the Shirakawa-go Bus in Advance?</h2>
          <p className={styles.bodyText}>
            From Kanazawa, yes, without exception. Hokuriku Railroad states on its own page that the service
            is reserved-seating — <em>座席指定制</em> — and that you must book before you board. There is no
            standing and no walk-up. Read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            From Takayama it is mixed, and the distinction is printed on Nohi Bus&apos;s own timetable: some
            departures carry an <strong>R</strong> for reservation required, and the company states that
            everything except those is non-reserved. So there are walk-up seats on the Takayama side — a
            useful thing to know if your plans change at breakfast. What there is not is a second bus if the
            first one fills. This is one road through a mountain valley with no rail alternative, which in
            practice means you should book anything your day depends on and treat the non-reserved
            departures as a fallback rather than a plan.
          </p>
          <p className={styles.bodyText}>
            The reservation centres, both read on {OWN}: Nohi Bus on <strong>(0577) 32-1688</strong>, 9:00 to
            17:00, and Hokuriku Railroad&apos;s centre for the Kanazawa Line on <strong>(076) 234-0123</strong>,
            9:00 to 18:00. If a Japanese-language phone call is not how you want to start the day, the
            Klook voucher for the same Nohi seat and the guided days below both sidestep it — which is most of
            the reason a tour wins on this particular route more often than it does elsewhere in Japan.
          </p>
        </section>

        {/* Light-up */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>When Is the Shirakawa-go Light-Up, and Can You Just Turn Up?</h2>
          <p className={styles.bodyText}>
            The Shirakawa-go Tourist Association has announced the 41st event as four evenings only:{" "}
            <strong>11, 17, 24 and 31 January 2027</strong>, each running{" "}
            <strong>17:30 to 19:30</strong>. Read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            And no, you cannot just turn up. The association states the event runs on a{" "}
            <strong>complete advance-reservation system</strong> (<em>完全事前予約制</em>), that turning up on
            the day without a reservation means you cannot take part, and that{" "}
            <strong>no entry tickets are sold on the day</strong>. It lists exactly five ways in: an overnight
            stay in the village, which comes with an observation-deck ticket; your own car with a reserved
            parking space; a taxi using a reserved parking space; a highway-bus tour with a participating
            carrier; or a travel agency&apos;s bus tour. The car, taxi and agency-tour routes do not include
            deck access. Everyone taking part has to hold an entry ticket beforehand and wear it where it can
            be seen.
          </p>
          <p className={styles.bodyText}>
            Read practically, that leaves two realistic options for a visitor without a car: sleep in the
            village — a handful of farmhouse minshuku, booked out months ahead — or take one of the bus tours
            that holds the tickets and the parking for you. Klook&apos;s light-up day out of Takayama is listed
            at 5 to 5.5 hours with the choice of entering the open-air museum or the Ogimachi Castle Ruins
            observation deck. Because the dates are fixed and the capacity is not elastic, this is the one
            booking on this page where the question is availability rather than price, and the answer moves
            week by week.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shirakawagoLightUpTakayamaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Light-up day from Takayama →
            </KlookLink>
            <KlookLink href={shirakawagoObservationDeckDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Day tour with deck access →
            </KlookLink>
          </div>
        </section>

        {/* Tour vs DIY */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Tour or Service Bus — Which Is Better Value?</h2>
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
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.gets}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Four things to settle on a listing rather than here, because none of them is a published figure.
            Whether your date is running at all — the mountain coach days have minimum party sizes and will
            cancel below them. What the cancellation window is: the Takayama UNESCO listing states a 100%
            cancellation fee from three days out, which is stricter than most of what we link anywhere else
            on this site. Whether the lunch is included or an upgrade, which differs between the two Nagoya
            listings. And whether the observation-deck access is in the price, because on some listings it is
            an option. For the rail that gets you to any of these three cities, our{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link> covers the
            Hokuriku Shinkansen end and our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> the rest.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              English-guided day from Kanazawa →
            </KlookLink>
            <KlookLink href={shirakawagoKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shirakawa-go + Kanazawa in a day →
            </KlookLink>
            <KlookLink href={takayamaShirakawagoOneDayBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Takayama: the village and the old town →
            </KlookLink>
          </div>
        </section>

        {/* Fitting it into a trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fitting it in</span>
          <h2 className={styles.sectionTitle}>Where Does Shirakawa-go Fit in a Japan Itinerary?</h2>
          <p className={styles.bodyText}>
            Between Tokyo and Kyoto, going the long way round. The classic shape is Tokyo → Kanazawa on the
            Hokuriku Shinkansen, then the bus south through Shirakawa-go to Takayama, then the Takayama Main
            Line down to Nagoya and the Tokaido Shinkansen on to Kyoto — a loop that costs you a day and a
            half and takes you through the only part of central Japan the Golden Route misses entirely. The
            Kanazawa listing that drops you in Takayama rather than returning to Kanazawa exists precisely
            for that shape.
          </p>
          <p className={styles.bodyText}>
            On a shorter trip it is harder to justify. A{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary">10-day Japan itinerary</Link> can take
            the detour at the cost of a Kyoto night; a{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">14-day itinerary</Link> absorbs it
            comfortably. Under a week, do not: the village is two hours of walking at the end of several
            hours of bus, and there is more within reach of Kyoto itself — our{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">things to do in Kyoto guide</Link> is the
            honest comparison. If you are in Chubu for other reasons, the{" "}
            <Link href="/guides/attractions/ghibli-park-tickets">Ghibli Park</Link> and{" "}
            <Link href="/guides/attractions/legoland-japan-tickets">LEGOLAND Japan</Link> guides cover the
            Nagoya end of the same region.
          </p>
        </section>

        <KlookTourPicks
          heading="Guided Days to Shirakawa-go and Takayama"
          intro="Grouped by where they start. The two Nagoya days are the longest and need no overnight in the mountains; the Kanazawa pair are the English-guided option and one of them will drop you in Takayama; the Takayama departures are the shortest and cover the most ground. Open a listing for availability and the current price on your dates."
          tours={[
            shirakawagoTakayamaKanazawaDayTour,
            takayamaShirakawagoGokayamaUnescoTour,
            takayamaShirakawagoNagoyaDayTrip,
            shirakawagoTakayamaOldTownDayTour,
            shirakawagoGokayamaKanazawaBusTour,
            takayamaShirakawagoOneDayBusTour,
            shirakawagoObservationDeckDayTour,
            shirakawagoLightUpTakayamaDayTour,
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
          <h2 className={styles.sectionTitle}>One Thing to Sort Before You Get on the Bus</h2>
          <p className={styles.bodyText}>
            Data, and on this route for a concrete reason: the thing most likely to go wrong is a bus, and
            every fallback is online. Nohi Bus and Hokuriku Railroad publish live timetables and run their
            reservations through Japanese-language systems, the coach days email their pick-up points the
            night before, and the single road in closes in heavy snow — the listings say so themselves.
            An eSIM activated before you fly turns all of that into something you can check from a bus stop
            in a valley with no station.{" "}
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
            <Link href="/guides/transport/tokyo-to-kanazawa" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kanazawa (2026): Kagayaki Times, Seats and Whether a Pass Pays</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
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
            <Link href="/guides/attractions/japan-10-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2 4 4 .5-3 3 .8 4L12 17l-3.8 1.5.8-4-3-3 4-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing &amp; What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/ghibli-park-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0-6 6c0 4 6 12 6 12s6-8 6-12a6 6 0 0 0-6-6z" />
                  <circle cx="12" cy="9" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ghibli Park Tickets (2026): Prices, When They Go On Sale and How to Buy From Overseas</p>
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
            <h2 className={styles.ctaBannerTitle}>One road in, three cities it leaves from</h2>
            <p className={styles.ctaBannerDesc}>
              Pick the departure, not the tour. Kanazawa for an English guide and the option of ending in
              Takayama, Takayama for Gokayama and the deck, Nagoya if you have one day and no mountain night.
              And if January is your month, book the light-up before anything else — there are four evenings
              and no tickets on the door.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Guided Days →
              </KlookLink>
              <KlookLink href={shirakawagoLineBusTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Nohi Bus Ticket →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
