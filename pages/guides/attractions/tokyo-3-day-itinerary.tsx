import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  klookEsim,
  keiseiSkylinerUrl,
  naritaBusSubwayCombo,
  naritaExpressRoundTripUrl,
  shibuyaSkyTicketUrl,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoSightseeingBusTour,
  tokyoStayAreas,
  tokyoSubwayTicket,
  tokyoTowerTicket,
} from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygShibuyaSky, gygTeamlabPlanets, gygTokyo } from "../../../lib/gyg-links";

/**
 * A three-day Tokyo itinerary, written as a booking plan rather than a list of sights.
 *
 * Every price and every opening hour on this page is either read out of
 * lib/attraction-prices.ts — which carries the operator and the date each figure was
 * checked — or verified against the operator's own site on 21 Oct 2026 and dated below
 * (Senso-ji's hondo hours on senso-ji.jp, Meiji Jingu's sunrise/sunset hours and free
 * admission on meijijingu.or.jp). The "time to allow" column is our own planning
 * allowance and is labelled as such; it is not an operator figure.
 *
 * No Klook price appears anywhere: Klook answers automated reads of its product pages
 * with HTTP 403, so there is no figure here we could have verified.
 */

/** Opening hours read off the two free sights' own sites on this date. */
const HOURS_CHECKED = "2026-10-21";
const HOURS = checkedLabel(HOURS_CHECKED);

type Stop = {
  time: string;
  place: string;
  /** Our planning allowance, not an operator figure. */
  allow: string;
  getting: string;
  booking: string;
};

const day1: Stop[] = [
  {
    time: "Morning, from opening",
    place: "Meiji Jingu and the Harajuku approach",
    allow: "1–1.5 hours",
    getting: "JR Yamanote Line to Harajuku; the shrine entrance is beside the station",
    booking: "No ticket — free, and open sunrise to sunset",
  },
  {
    time: "Late morning",
    place: "Takeshita Street and Omotesando",
    allow: "1.5 hours",
    getting: "On foot from the shrine",
    booking: "No",
  },
  {
    time: "Early afternoon",
    place: "Shibuya Scramble Crossing, Hachiko and the backstreets",
    allow: "1.5 hours",
    getting: "One Yamanote stop from Harajuku, or about 20 minutes on foot",
    booking: "No",
  },
  {
    time: "Mid-afternoon",
    place: "Shinjuku — the Metropolitan Government Building decks and Shinjuku Gyoen",
    allow: "2 hours",
    getting: "Yamanote Line from Shibuya to Shinjuku",
    booking: "No — the Tocho decks charge nothing at all",
  },
  {
    time: "Late afternoon / sunset",
    place: "SHIBUYA SKY, on top of Shibuya Scramble Square",
    allow: "1–1.5 hours",
    getting: "Back to Shibuya on the Yamanote; the entrance is inside the station building",
    booking: "Yes — a timed slot, and sunset is the one that sells out",
  },
  {
    time: "Evening",
    place: "Shinjuku: Omoide Yokocho and the Kabukicho izakaya streets",
    allow: "2–3 hours",
    getting: "Yamanote Line from Shibuya",
    booking: "No, unless you want a guided crawl",
  },
];

const day2: Stop[] = [
  {
    time: "Early morning",
    place: "Senso-ji and Nakamise-dori, Asakusa",
    allow: "1.5–2 hours",
    getting: "Ginza Line or Toei Asakusa Line to Asakusa",
    booking: "No ticket — the main hall opens 06:00 (06:30 October–March)",
  },
  {
    time: "Late morning",
    place: "TOKYO SKYTREE, Floor 350 (and Floor 450 if the air is clear)",
    allow: "2 hours with Solamachi below it",
    getting: "One stop on the Tobu Skytree Line from Asakusa, or about 20 minutes on foot",
    booking: "Advised — the same-day counter adds a service fee per ticket",
  },
  {
    time: "Early afternoon",
    place: "Akihabara",
    allow: "2 hours",
    getting: "Toei Asakusa Line or Ginza Line, changing to the JR Sobu or Yamanote",
    booking: "No",
  },
  {
    time: "Mid-afternoon",
    place: "teamLab Planets TOKYO, Toyosu",
    allow: "2 hours, including the entry queue",
    getting: "Yurikamome to Shin-Toyosu, or Yurakucho Line to Toyosu",
    booking: "Required — a 30-minute entry slot, with no walk-up counter",
  },
  {
    time: "Evening",
    place: "Toyosu, Ginza or Tsukishima for dinner",
    allow: "2 hours",
    getting: "Yurakucho Line from Toyosu",
    booking: "No",
  },
];

const day3: Stop[] = [
  {
    time: "Morning",
    place: "Imperial Palace East Gardens and the Marunouchi side of Tokyo Station",
    allow: "1.5–2 hours",
    getting: "Any line to Tokyo Station; the Marunouchi exit faces the palace",
    booking: "No ticket, but the gardens close on set days — check the week you go",
  },
  {
    time: "Late morning",
    place: "Ginza, plus Character Street inside Tokyo Station",
    allow: "1.5 hours",
    getting: "On foot, or one stop on the Marunouchi Line",
    booking: "No",
  },
  {
    time: "Early afternoon",
    place: "Tsukiji Outer Market",
    allow: "1.5 hours",
    getting: "Hibiya Line to Tsukiji or Oedo Line to Tsukijishijo",
    booking: "No — but most of it winds down by mid-afternoon",
  },
  {
    time: "Mid-afternoon",
    place: "Zojo-ji and Shiba Park, with Tokyo Tower behind the main gate",
    allow: "1 hour",
    getting: "Toei Mita Line to Onarimon or Oedo Line to Daimon",
    booking: "No",
  },
  {
    time: "Late afternoon into the evening",
    place: "Tokyo Tower Main Deck",
    allow: "1 hour",
    getting: "A short walk through Shiba Park from Zojo-ji",
    booking: "Not needed for the Main Deck; only the Top Deck Tour is timed",
  },
  {
    time: "Evening",
    place: "Roppongi, Shimbashi or back to your own neighbourhood",
    allow: "2 hours",
    getting: "Hibiya or Oedo Line from Kamiyacho / Akabanebashi",
    booking: "No",
  },
];

/** The ticketed stops, with the figure and the date from lib/attraction-prices.ts. */
const ticketRows = [
  {
    stop: "SHIBUYA SKY (Day 1)",
    price: `${PRICES.shibuyaSky.adult} adult online, ${PRICES.shibuyaSky.atDoor} at the door`,
    hours: "Per-date calendar — open the official page for your own date",
    booking: PRICES.shibuyaSky.booking,
    note: PRICES.shibuyaSky.bookingNote,
    checked: PRICES.shibuyaSky.checked,
    source: PRICES.shibuyaSky.source,
  },
  {
    stop: "TOKYO SKYTREE, Floor 350 (Day 2)",
    price: `${PRICES.tokyoSkytree.adult} adult, ${PRICES.tokyoSkytree.child} child`,
    hours: "10:00–22:00 with last admission 21:00 on the date we checked; the calendar varies by day",
    booking: PRICES.tokyoSkytree.booking,
    note: PRICES.tokyoSkytree.bookingNote,
    checked: PRICES.tokyoSkytree.checked,
    source: PRICES.tokyoSkytree.source,
  },
  {
    stop: "teamLab Planets TOKYO (Day 2)",
    price: `${PRICES.teamlabPlanets.adult} adult, ${PRICES.teamlabPlanets.child} child`,
    hours: "Listed 08:00–22:00 and varying by date, with last admission an hour before closing",
    booking: PRICES.teamlabPlanets.booking,
    note: PRICES.teamlabPlanets.bookingNote,
    checked: PRICES.teamlabPlanets.checked,
    source: PRICES.teamlabPlanets.source,
  },
  {
    stop: "Tokyo Tower, Main Deck (Day 3)",
    price: `${PRICES.tokyoTower.adult} adult, ${PRICES.tokyoTower.child} child`,
    hours: "9:00–23:00 with last admission 22:30",
    booking: PRICES.tokyoTower.booking,
    note: PRICES.tokyoTower.bookingNote,
    checked: PRICES.tokyoTower.checked,
    source: PRICES.tokyoTower.source,
  },
  {
    stop: "Tokyo Metropolitan Government Building decks (Day 1)",
    price: PRICES.tochoDeck.adult,
    hours: "Varies, and which of the two decks is open varies with it",
    booking: PRICES.tochoDeck.booking,
    note: PRICES.tochoDeck.bookingNote,
    checked: PRICES.tochoDeck.checked,
    source: PRICES.tochoDeck.source,
  },
  {
    stop: "Senso-ji, Asakusa (Day 2)",
    price: "No admission charge published for the main hall",
    hours: "Main hall 06:00–17:00, opening 06:30 from October to March",
    booking: "Not needed",
    note: "Walk in. The hall opens long before anything else on this itinerary, which is why Day 2 starts here.",
    checked: HOURS_CHECKED,
    source: "senso-ji.jp",
  },
  {
    stop: "Meiji Jingu, Harajuku (Day 1)",
    price: "Free",
    hours: "Sunrise to sunset, published month by month — 05:40–16:40 in October",
    booking: "Not needed",
    note: "The shrine itself is free and open every day of the year; facilities inside keep shorter hours, mainly 09:00–16:00.",
    checked: HOURS_CHECKED,
    source: "meijijingu.or.jp",
  },
  {
    stop: "Tokyo Subway Ticket (all three days)",
    price: `${PRICES.tokyoSubwayTicket.adult} / ¥1,500 / ¥2,000 adult for 24 / 48 / 72 hours`,
    hours: "n/a",
    booking: PRICES.tokyoSubwayTicket.booking,
    note: PRICES.tokyoSubwayTicket.bookingNote,
    checked: PRICES.tokyoSubwayTicket.checked,
    source: PRICES.tokyoSubwayTicket.source,
  },
];

const bookingWindow = [
  {
    title: "Book before you fly",
    desc: "teamLab Planets, because entry is a 30-minute slot with no walk-up counter and the popular windows go weeks out. The SHIBUYA SKY sunset slot, for the same reason. And the airport train or bus for your arrival, because the one queue you cannot plan around is the one you join after a long flight.",
  },
  {
    title: "Book a few days out",
    desc: "Tokyo Skytree, where booking ahead is simply cheaper than the same-day counter, and the Top Deck Tour at Tokyo Tower if you want the higher level. A guided day tour, if you would rather hand one of the three days to somebody else.",
  },
  {
    title: "Do not bother booking",
    desc: "Senso-ji, Meiji Jingu, the Scramble Crossing, Tsukiji Outer Market, Zojo-ji, the Tokyo Tower Main Deck and the free Metropolitan Government Building decks. None of them sell a timed ticket, and queuing for a slot you do not need is the most common way a Tokyo itinerary loses an afternoon.",
  },
];

const faqItems = [
  {
    q: "How many days do you need in Tokyo?",
    a: "Three full days is the point at which Tokyo stops feeling rushed: one for the west side (Harajuku, Shibuya, Shinjuku), one for the east (Asakusa, Skytree, Toyosu) and one for the centre (the Imperial Palace, Ginza, Tsukiji, Tokyo Tower). Two days means dropping one of those three halves of the city. Five or more lets you add a day trip to Kawaguchiko, Hakone or Nikko without losing a city day, which is the single best use of a fourth and fifth day.",
  },
  {
    q: "Is 3 days enough for Tokyo?",
    a: "Yes, for a first visit — as long as you treat the three days as three districts rather than three wish-lists, and accept that you will not see Mt. Fuji on this trip without giving up a city day. The itinerary above fits each day inside one part of the city, which is what makes it survive contact with reality: the longest single journey in it is a Yamanote hop, not a cross-city trek. The planning risk in three days is not distance, it is timed tickets, and there are only two of those.",
  },
  {
    q: "Which Tokyo attractions need booking in advance?",
    a: `In this itinerary, two. teamLab Planets TOKYO requires a date- and time-specified ticket — entry is a 30-minute window and there is no walk-up counter — and SHIBUYA SKY needs a slot if you want sunset, which is the one window of its day that sells out. Tokyo Skytree is worth booking because the same-day counter adds a service fee rather than because it sells out. The Tokyo Tower Main Deck, Senso-ji, Meiji Jingu, the Imperial Palace East Gardens, Tsukiji Outer Market and the free Metropolitan Government Building decks sell no timed ticket at all. Prices and booking rules checked against each operator's own site; see the dated table above for the figures and dates.`,
  },
  {
    q: "What is the best order to do a Tokyo 3 day itinerary in?",
    a: "Put the day with the timed ticket you care most about first, so a cancelled slot still has two days to move into. Beyond that, group by geography rather than by theme: west Tokyo on one day, east Tokyo on another, the centre on the third. If you arrive late in the evening, start the three days the following morning instead of trying to salvage the arrival day — the airport run plus check-in eats most of an evening on its own.",
  },
  {
    q: "Do I need a Tokyo Subway Ticket for three days?",
    a: `It depends on whether your days look like the ones above. The Tokyo Subway Ticket is ${PRICES.tokyoSubwayTicket.adult} for 24 hours, ¥1,500 for 48 and ¥2,000 for 72, and it covers every Tokyo Metro and Toei Subway line — but not JR, including the Yamanote Line this itinerary leans on for the Harajuku–Shibuya–Shinjuku stretch. If you plan to use the subway heavily on the Asakusa and Toyosu day and the central day, the 72-hour version is easy to justify; if most of your hops are Yamanote, an IC card is the better default. Prices checked ${checkedLabel(PRICES.tokyoSubwayTicket.checked)} on ${PRICES.tokyoSubwayTicket.source}.`,
  },
  {
    q: "Where should I stay for a 3 day Tokyo itinerary?",
    a: "On the Yamanote loop, and ideally at a station that is also a subway interchange — Shinjuku, Tokyo Station / Marunouchi, or the Ueno and Asakusa side. The three areas below are picked on that basis rather than on atmosphere: with three days and two timed tickets, the thing that costs you time is a base that needs two changes to reach anything.",
  },
  {
    q: "Can I do a Mt. Fuji day trip inside three days in Tokyo?",
    a: "You can, but it replaces a city day rather than slotting into one — the direct train from Shinjuku to Kawaguchiko is roughly an hour and three-quarters each way, and the Fujikyu highway bus from Shinjuku is listed at about 1 hour 45 minutes for ¥2,200 one way, or ¥2,000 booked online. In three days that trade is usually a bad one, because it costs you a third of the city. With four or five days it is the obvious addition, and our Kawaguchiko day trip guide covers the version of the day that is actually doable.",
  },
  {
    q: "Is three days in Tokyo enough with children?",
    a: "Three days works with children if you cut the number of stops per day rather than the number of days — four stops instead of six, with the timed ticket in the morning while everyone is fresh. The two ticketed stops in this itinerary both publish child rates, and the free sights (Senso-ji, Meiji Jingu, Shiba Park, the Metropolitan Government Building decks) carry no risk if a day falls apart. The ticket prices and child rates we have checked, with the date for each, are in the table above.",
  },
  {
    q: "What should I book for the arrival and departure days?",
    a: "The airport leg, and your data. Narita to central Tokyo is a train or a limousine bus rather than a taxi, and both can be bought before you fly; Haneda is close enough to the city that the decision matters less. An eSIM activated before departure means you are not looking for airport Wi-Fi to find your platform. Our Tokyo airport transfer guide works through which of the Narita and Haneda routes suits which part of the city.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-3-day-itinerary") } });

const TITLE = "Tokyo 3 Day Itinerary (2026): What to Book, in What Order";
const DESC =
  "A Tokyo 3 day itinerary built around the bookings: west, east and central Tokyo day by day, official ticket prices, and the 2 stops that need a timed slot.";

export default function Tokyo3DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-3-day-itinerary" />
        {hreflangLinks("/guides/attractions/tokyo-3-day-itinerary")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-3-day-itinerary" />
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
              route: "/guides/attractions/tokyo-3-day-itinerary",
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
                { "@type": "ListItem", position: 4, name: "Tokyo 3 Day Itinerary", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-3-day-itinerary" },
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
          <span className={styles.breadCurrent}>Tokyo 3 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo 3 Day Itinerary (2026):<br />What to Book, and in What Order
          </h1>
          <p className={styles.heroSubtitle}>
            Three days, three districts, and only two stops that need a timed ticket. The plan below is
            arranged so one sold-out slot never costs you a day.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Day-by-day tables", "Official prices, dated"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Day 1</p>
                <p className={styles.verdictStatValue}>West: Harajuku, Shibuya, Shinjuku</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>East: Asakusa, Skytree, Toyosu</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 3</p>
                <p className={styles.verdictStatValue}>Centre: Palace, Ginza, Tokyo Tower</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must book ahead</p>
                <p className={styles.verdictStatValue}>teamLab Planets, Shibuya Sky sunset</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a workable Tokyo 3 day itinerary gives each day one side of the
              city — west, east and centre — so the longest journey of any day is a single Yamanote hop.
              Only two stops in it genuinely need booking: teamLab Planets TOKYO, whose entry is a
              30-minute slot sold with no walk-up counter, and the SHIBUYA SKY sunset window. Everything
              else on the three days is walk-in, and four of the stops charge nothing at all. Adult
              admission for the ticketed stops ran {PRICES.shibuyaSky.adult} (Shibuya Sky online),{" "}
              {PRICES.tokyoSkytree.adult} (Skytree Floor 350), {PRICES.teamlabPlanets.adult} (teamLab
              Planets) and {PRICES.tokyoTower.adult} (Tokyo Tower Main Deck) on the dates in the table
              below.
            </p>
            <KlookLink
              href={tokyoSubwayTicket.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check the Tokyo Subway Ticket on Klook →
            </KlookLink>
          </div>
        </div>

        {/* How many days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Many Days Do You Need in Tokyo?</h2>
          <p className={styles.bodyText}>
            Three, for a first visit. Tokyo is not one city centre with suburbs around it; it is a string
            of centres along a loop line, and each of the three big clusters — the west around
            Harajuku, Shibuya and Shinjuku, the east around Asakusa, Skytree and Toyosu, and the centre
            around Tokyo Station, Ginza and Shiba — is a full day on its own. Two days means giving one of
            them up. The fourth and fifth days are where a day trip belongs, not the third.
          </p>
          <p className={styles.bodyText}>
            What this guide does differently is treat the three days as a booking problem. Most of Tokyo
            is walk-in, and the handful of attractions that are not will quietly decide your schedule if
            you let them. So each day below carries its own table — time of day, where, how long to
            allow, how you get there, and whether it needs booking — and the Klook listings for that
            day&apos;s bookings sit directly underneath it.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>Day 1 — West Tokyo: Harajuku, Shibuya and Shinjuku</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            One side of the Yamanote loop, three stops apart, finishing on a rooftop. Day 1 is first
            because it holds the slot most likely to be sold out — the SHIBUYA SKY sunset window — and a
            failed booking on Day 1 can still move to Day 2 or Day 3.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Time of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {day1.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 1.</strong> The subway ticket, if your three days look like
            these; the Shibuya Sky slot, if you want sunset. Shibuya Sky is also the one stop here where
            the booking route matters as much as the ticket — the official site has rejected many
            foreign-issued cards since July 2024, which is covered in full in our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets guide</Link>. The
            Metropolitan Government Building decks in Shinjuku are the free alternative if the slot has
            gone; our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">Tokyo observation decks comparison</Link>{" "}
            puts the four side by side.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Shibuya Sky tickets →
            </KlookLink>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Tokyo Subway Ticket →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Day 2 — East Tokyo: Asakusa, Skytree and Toyosu</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The old-town side, and the day with the one genuinely compulsory booking. Senso-ji&apos;s
            main hall opens at 06:00 — 06:30 from October to March — which makes an early start here
            cheaper in crowds than anywhere else in the itinerary.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Time of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {day2.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 2.</strong> teamLab Planets, without exception — the entry
            window is 30 minutes, there is no counter at the museum, and the popular slots go weeks
            ahead. Our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets">teamLab Planets tickets guide</Link>{" "}
            also covers what to wear, because parts of it are walked barefoot through water. Skytree is
            worth booking for a different reason: the same-day counter adds a service fee per ticket, so
            buying ahead is cheaper rather than safer — the detail is in our{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets">Tokyo Skytree tickets guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check teamLab Planets tickets →
            </KlookLink>
            <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check TOKYO SKYTREE tickets →
            </KlookLink>
          </div>
        </section>

        {/* Day 3 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 3</span>
          <h2 className={styles.sectionTitle}>Day 3 — Central Tokyo: the Palace, Ginza and Tokyo Tower</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The day with nothing compulsory in it, which is exactly why it goes last: by now you know
            how fast you move, and this is the day to shorten, lengthen or hand to a guided coach.
            Tokyo Tower closes at 23:00 with last admission at 22:30 — later than any other major deck
            in the city — so a slow afternoon does not cost you the view.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Time of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {day3.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allow}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 3.</strong> Nothing, unless you want the Tokyo Tower Top Deck
            Tour, which is timed and sold separately from the Main Deck — our{" "}
            <Link href="/guides/attractions/tokyo-tower-tickets">Tokyo Tower tickets guide</Link> sets
            out the difference. The other option for Day 3 is to stop planning it: a guided sightseeing
            coach ties the Imperial Palace gardens, Asakusa and Skytree together with commentary, which
            is the version to pick if three days of navigating sounds like work.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The &ldquo;time to allow&rdquo; column in all three tables is our own planning allowance, not
            an operator figure. Opening hours and prices are in the dated table below, each against the
            operator&apos;s own site.
          </p>
        </section>

        <KlookTourPicks
          heading="The Day-3 Alternative: Hand It to a Coach"
          intro="A guided loop of the big central sights, or the city pass that covers getting between them yourself. Klook blocks automated price reads, so open a listing for the figure on your date."
          tours={[tokyoSightseeingBusTour, tokyoSubwayTicket, tokyoTowerTicket]}
        />

        {/* The two bookings this itinerary can break on are teamLab Planets and the
            Shibuya Sky sunset slot, so those are the two the second seller is for.
            Every Klook link and every dated price above is unchanged. */}
        <GygCompare
          slug="tokyo-3-day-itinerary"
          heading="If a Timed Slot Has Already Gone"
          intro="This plan survives most things, but not a sold-out teamLab Planets slot or a Shibuya Sky sunset that went weeks ago — reorder the days and you still need the ticket. Both are sold on GetYourGuide as well, and the full Tokyo catalogue is there if you are rebuilding a day from scratch."
          listings={[gygTeamlabPlanets, gygShibuyaSky, gygTokyo]}
        />

        {/* Prices and hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>What Does a Tokyo 3 Day Itinerary Cost in Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Less than most people expect, because four of the stops above are free. Every figure below is
            the operator&apos;s own published price, with the site it was read off and the date it was
            read — not an estimate, and not a Klook price.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Official price", "Opening hours", "Booking", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        <strong>{row.booking}</strong> — {row.note}
                      </td>
                      <td style={{ fontSize: "0.82rem" }}>
                        {row.source}, {checkedLabel(row.checked)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm at booking. The Senso-ji and Meiji Jingu rows were read off those
            two sites on {HOURS}; every other row carries the date from our own guide for that ticket.
            The ticketed stops also appear, with the same figures and dates, in the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Booking window */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Attractions Need Booking in Advance?</h2>
          <p className={styles.bodyText}>
            Two of the fourteen stops above, and that is the single most useful thing to know before you
            start planning. Here is the whole itinerary sorted by how far ahead each thing has to be
            bought.
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
            Cancellation is the other half of this. Tokyo weather can ruin a rooftop and nothing else,
            so the two timed tickets are worth buying through a route that lets you move or cancel them —
            which is the practical argument for booking the decks and teamLab through Klook rather than
            an operator site that may also reject a foreign card. Our{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo guide</Link> lists
            the same split across the whole city rather than just this itinerary.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets on Klook →
            </KlookLink>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shibuya Sky on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Where to stay */}
        <KlookStayAreas
          heading="Where to Stay for Three Days in Tokyo"
          intro="With three days and two timed tickets, the base that costs you least is the one on the Yamanote loop that is also a subway interchange. These three are picked on that basis — Shinjuku and Shibuya for the Day 1 side of the city, Ueno and Asakusa for Day 2, Tokyo Station for Day 3 and for anything you add afterwards."
          areas={tokyoStayAreas}
        />

        {/* Getting in and out */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Arrival &amp; onward</span>
          <h2 className={styles.sectionTitle}>How Do You Get From the Airport, and On to Kyoto?</h2>
          <p className={styles.bodyText}>
            Three days in Tokyo almost always has an airport day at each end, and often a shinkansen at
            the far end. Both are worth settling before you fly, for the same reason: they are the two
            parts of the trip where a queue costs you hours rather than minutes.
          </p>
          <p className={styles.bodyText}>
            <strong>From Narita.</strong> The Narita Express runs to Tokyo Station, Shinjuku and Shibuya
            without a transfer, which covers all three of the bases above. The Keisei Skyliner is the
            faster option if you are staying on the Ueno and Asakusa side. The limousine bus is the one
            to pick with large luggage or a hotel that is not beside a station, and Klook sells it
            bundled with the subway pass, which is one booking instead of two. Journey times and the
            full route-by-route comparison are in our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>.
          </p>
          <p className={styles.bodyText}>
            <strong>From Haneda.</strong> Close enough to central Tokyo that the choice matters much
            less — the Keikyu Line and the Tokyo Monorail both reach the Yamanote loop quickly, and that
            same guide covers both.
          </p>
          <p className={styles.bodyText}>
            <strong>On to Kyoto or Osaka.</strong> If these three days are the first leg of a longer
            trip, the Tokaido Shinkansen from Tokyo Station is the obvious next move, and the question is
            only whether a rail pass earns its price across the rest of your route. Our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> compares the train
            types and fares, and our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works through the
            break-even — which, for a trip that is only Tokyo plus one other city, usually comes out
            against the pass. For getting around within the three days, our{" "}
            <Link href="/guides/transport/tokyo-transportation">Getting Around Tokyo guide</Link>
            {" "}explains how IC cards and the subway lines fit together.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Narita Express round trip →
            </KlookLink>
            <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Keisei Skyliner ticket →
            </KlookLink>
            <KlookLink href={naritaBusSubwayCombo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Narita bus + subway pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One more arrival-day booking that is not transport: data. Every timed ticket on this
            itinerary is a QR code in an inbox, and every one of the &ldquo;getting there&rdquo; columns
            above assumes you can open a map. An eSIM activated before departure means none of that
            depends on finding airport Wi-Fi.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it
            against the alternatives.
          </p>
        </section>

        {/* Four or five days */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Is three enough?</span>
          <h2 className={styles.sectionTitle}>Is 3 Days Enough for Tokyo?</h2>
          <p className={styles.bodyText}>
            For a first visit, yes — provided you do not try to put a day trip inside it. The honest
            trade is this: a Mt. Fuji or Hakone day out of Tokyo is a whole day, not an excursion, and
            spending one of three on it means dropping a third of the city. With four or five days the
            same trip is the best thing you can add.
          </p>
          <p className={styles.bodyText}>
            If you do want to make the swap, the two day trips worth the trade are{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko</Link>, for the
            Fuji viewpoints and the lake, and{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone</Link>, for the
            hot-spring loop that a single pass covers end to end. The independent route to the Fuji side
            is in our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo">Mt. Fuji day trip guide</Link>, and
            the guided versions are compared in our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt. Fuji day tour comparison</Link>.
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V11l4-3 5 4 5-4 4 3v10z" />
                  <path d="M12 21v-5" />
                  <path d="M7 11V6l2-2 2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disneyland Tickets 2026: Prices, Rules &amp; DisneySea</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-night-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 3h14l-1 9a6 6 0 0 1-12 0z" />
                  <path d="M12 21v-3M8 21h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Night Food Tour (2026): Omoide Yokocho, Golden Gai and the 20+ Rule</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-illumination-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="4" />
                  <path d="M12 2v2M12 18v4M4 10H2M22 10h-2M5.6 3.6 7 5M18.4 3.6 17 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-10-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-joypolis-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <circle cx="12" cy="10" r="2" />
                  <path d="M8 20h8M12 16v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Joypolis Tickets (2026): Passport Prices, Hours &amp; Height Limits</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
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
            <Link href="/guides/attractions/teamlab-borderless-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Borderless Tickets (2026): Price, How to Book and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 20V8l8-5 8 5v12" />
                  <path d="M4 14h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Prices, How to Book &amp; Planets vs Borderless</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-6-6 11-3-4-5-1z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer (2026): Narita and Haneda to the City</p>
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
            <h2 className={styles.ctaBannerTitle}>Settle the two timed tickets first</h2>
            <p className={styles.ctaBannerDesc}>
              teamLab Planets and the Shibuya Sky sunset slot are the only two bookings that can break
              this itinerary, and both go weeks ahead. Klook checks out in English, takes foreign cards
              the official sites sometimes reject, and keeps all three days on one account.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Book the timed tickets on Klook →
              </KlookLink>
              <GygCompareButton slug="tokyo-3-day-itinerary" listing={gygTeamlabPlanets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
