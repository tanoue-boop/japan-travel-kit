import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  fujiPhotographyDayTour,
  hakonePrivateDayTour,
  kamakuraEnoshimaDayTourUrl,
  kawaguchikoYamanakakoBusTour,
  keiseiSkylinerUrl,
  naritaLimousineBus,
  nikkoWorldHeritageDayTour,
  shibuyaSkyTicketUrl,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoFourDayStayAreas,
  tokyoFourDayTripPrep,
  tokyoMtFujiHighwayBus,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Four days in Tokyo, added 19 Nov 2026 (task-jtk-20261119-01).
 *
 * How it differs from its neighbours:
 *  - tokyo-3-day-itinerary stays inside the city;
 *  - this page is three city days plus one day trip (Kawaguchiko or Nikko), and the
 *    question it settles is whether one 72-hour Tokyo Subway Ticket covers it;
 *  - tokyo-5-day-itinerary is three city days plus Kawaguchiko and Kamakura;
 *  - tokyo-7-day-itinerary is four city days plus three day trips.
 *
 * Sources and dates:
 *  - Tokyo Subway Ticket ¥1,000 / ¥1,500 / ¥2,000 (24 / 48 / 72 h), tokyometro.jp, via
 *    lib/attraction-prices (checked 11 Nov 2026); Tokyo Metro IC fares from ¥178, as read
 *    for the Tokyo trip cost guide (9 Nov 2026);
 *  - Shinjuku → Kawaguchiko highway bus, 1 h 45 min, ¥2,200 (¥2,000 online),
 *    bus.fujikyu.co.jp, 21 Oct 2026;
 *  - NIKKO PASS WORLD HERITAGE AREA ¥3,000 adult, tobu.co.jp, 12 Nov 2026; Tobu from
 *    Asakusa "about two hours", 19 Oct 2026;
 *  - Enoshima-Kamakura Freepass from Shinjuku ¥1,640 adult / ¥430 child, 1 day,
 *    odakyu-global.com, read 19 Nov 2026; JR Tokyo → Kamakura 50–60 min (Kamakura guide);
 *  - Hakone Freepass from lib/attraction-prices; Romancecar ~80 min and ¥1,200 surcharge,
 *    odakyu-global.com, 9 Nov 2026;
 *  - Admissions (Skytree, SHIBUYA SKY, teamLab Planets) from lib/attraction-prices;
 *  - Cost lines from the Tokyo trip cost guide: the Tokyo Metropolitan Government 2025
 *    visitor survey per night (room ¥9,450, food ¥6,000, transport ¥2,510) and its
 *    standard-day range ¥19,460–¥21,360, read 9 Nov 2026; airport fares 25 Oct 2026.
 * No Klook price appears.
 */

const SUBWAY_CHECKED = checkedLabel(PRICES.tokyoSubwayTicket.checked);
const IC_CHECKED = checkedLabel("2026-11-09");
const FUJIKYU_CHECKED = checkedLabel("2026-10-21");
const NIKKO_PASS_CHECKED = checkedLabel("2026-11-12");
const NIKKO_TIME_CHECKED = checkedLabel("2026-10-19");
const ENOSHIMA_CHECKED = checkedLabel("2026-11-19");
const ROMANCECAR_CHECKED = checkedLabel("2026-11-09");
const COST_CHECKED = checkedLabel("2026-11-09");
const AIRPORT_CHECKED = checkedLabel("2026-10-25");

const SUBWAY_72 = "¥2,000";
const SUBWAY_48 = "¥1,500";
const IC_FROM = "¥178";
const KAWAGUCHIKO_BUS = "¥2,200";
const KAWAGUCHIKO_RETURN = "¥4,400";
const KAWAGUCHIKO_RETURN_ONLINE = "¥4,000";
const NIKKO_PASS_WHA = "¥3,000";
const ENOSHIMA_FREEPASS = "¥1,640";
const ROMANCECAR_SURCHARGE = "¥1,200";
const HAKONE_DAY = "¥9,500";

// From tokyo-trip-cost: per night, 2025 survey, rounded to ¥10; four days = four nights.
const ROOM_4 = "¥37,800";
const FOOD_4 = "¥24,000";
const TRANSPORT_4 = "¥10,040";
const FOUR_DAY_COST = "¥77,800–¥85,400";
const FOUR_DAY_SAVE = "¥7,900";
const FOUR_DAY_TOP = "¥134,000";

const ROUTE = "/guides/attractions/tokyo-4-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

type Day = { day: string; area: string; move: string; time: string; book: ReactNode };

const days: Day[] = [
  {
    day: "Day 1",
    area: "Asakusa, Ueno & Tokyo Skytree — Senso-ji, Ueno Park, Ameyoko, Skytree at dusk",
    move: "Ginza Line and Toei Asakusa Line — on the subway ticket (about 4 rides)",
    time: "A full day; Skytree about 1–1.5 hours",
    book: (
      <>
        <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored nofollow noopener">Skytree ticket</KlookLink>; start the{" "}
        <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener">72-hour Subway Ticket</KlookLink>
      </>
    ),
  },
  {
    day: "Day 2",
    area: "Shibuya, Harajuku & Shinjuku — Meiji Jingu, Takeshita Street, the Scramble Crossing, Omoide Yokocho",
    move: "Fukutoshin Line (Meiji-jingumae, Shibuya, Shinjuku-sanchome) — on the subway ticket; the JR Yamanote Line is not",
    time: "A full day; SHIBUYA SKY about 1 hour at sunset",
    book: (
      <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored nofollow noopener">SHIBUYA SKY sunset slot</KlookLink>
    ),
  },
  {
    day: "Day 3",
    area: "Day trip — Kawaguchiko (Mt. Fuji) or Nikko",
    move: "Kawaguchiko: highway bus from Busta Shinjuku, 1 h 45 min. Nikko: Tobu from Asakusa, about 2 hours",
    time: "Leave by 08:00, back in the evening",
    book: (
      <>
        <KlookLink href={fujiPhotographyDayTour.url} target="_blank" rel="sponsored nofollow noopener">Mt. Fuji day tour</KlookLink> or{" "}
        <KlookLink href={nikkoWorldHeritageDayTour.url} target="_blank" rel="sponsored nofollow noopener">Nikko day tour</KlookLink>
      </>
    ),
  },
  {
    day: "Day 4",
    area: "Tsukiji, Ginza & Odaiba — Tsukiji Outer Market breakfast, Ginza, teamLab Planets, Odaiba seafront",
    move: "Hibiya Line to Tsukiji (last hours of the 72-hour ticket), Yurakucho Line to Toyosu, Yurikamome to Odaiba (not covered)",
    time: "Morning to late afternoon; teamLab Planets about 1.5–2 hours",
    book: (
      <>
        <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored nofollow noopener">teamLab Planets time slot</KlookLink>; airport train or bus
      </>
    ),
  },
];

type Trip = { trip: string; time: string; fare: string; tour: string; source: string };

const trips: Trip[] = [
  {
    trip: "Kawaguchiko (Mt. Fuji) — the pick for a first trip, if the forecast is clear",
    time: "1 h 45 min each way by highway bus from Busta Shinjuku",
    fare: `${KAWAGUCHIKO_RETURN} round trip (${KAWAGUCHIKO_BUS} each way; ${KAWAGUCHIKO_RETURN_ONLINE} booked online)`,
    tour: "Yes — tours reach Chureito Pagoda, Oishi Park and Oshino Hakkai without the local buses",
    source: `bus.fujikyu.co.jp, ${FUJIKYU_CHECKED}`,
  },
  {
    trip: "Nikko — shrines and Kegon Falls, the pick if Fuji is in cloud",
    time: "About 2 hours each way by Tobu from Asakusa",
    fare: `${NIKKO_PASS_WHA}: NIKKO PASS WORLD HERITAGE AREA, one Asakusa ⇄ Shimo-Imaichi round trip plus Tobu buses (limited express extra)`,
    tour: "Yes — a group day from Shinjuku joins Toshogu and Kegon Falls, a bus ride apart on your own",
    source: `tobu.co.jp, ${NIKKO_PASS_CHECKED}; time ${NIKKO_TIME_CHECKED}`,
  },
  {
    trip: "Kamakura — the short, easy day",
    time: "50–60 min each way by JR from Tokyo Station",
    fare: `${ENOSHIMA_FREEPASS}: Enoshima-Kamakura Freepass from Shinjuku (Odakyu there and back plus unlimited Enoden, 1 day). JR fare not priced here`,
    tour: "Yes, with Enoshima — but the easiest of the four to do alone",
    source: `odakyu-global.com, ${ENOSHIMA_CHECKED}`,
  },
  {
    trip: "Hakone — the most to ride, the most expensive",
    time: "About 80 min each way by Romancecar from Shinjuku",
    fare: `${HAKONE_DAY}: Hakone Freepass ${PRICES.hakoneFreepass.adult} (2-day, from Shinjuku) plus the Romancecar surcharge ${ROMANCECAR_SURCHARGE} each way`,
    tour: "Yes — a private day avoids the ropeway queue and the connections",
    source: `odakyu-global.com, ${checkedLabel(PRICES.hakoneFreepass.checked)} (Freepass), ${ROMANCECAR_CHECKED} (Romancecar)`,
  },
];

const costRows = [
  {
    item: "4 days in Tokyo, standard level (room, food, city transport, one paid sight a day)",
    cost: `${FOUR_DAY_COST} per person`,
    note: "Four times the standard day in the Tokyo trip cost guide; before flights and shopping",
  },
  {
    item: "Room, 4 nights",
    cost: ROOM_4,
    note: "¥9,450 per person per night, the 2025 average in the Tokyo Metropolitan Government survey",
  },
  {
    item: "Food and drink, 4 days",
    cost: FOOD_4,
    note: "¥6,000 a day, the same survey's average",
  },
  {
    item: "Getting around Tokyo, 4 days",
    cost: `${TRANSPORT_4} survey average; ${SUBWAY_72} on this plan`,
    note: "One 72-hour Tokyo Subway Ticket, plus IC fares for the Yamanote Line and the Yurikamome",
  },
  {
    item: "Day 3 transport, on your own",
    cost: `${NIKKO_PASS_WHA} (Nikko) to ${HAKONE_DAY} (Hakone)`,
    note: `Kawaguchiko ${KAWAGUCHIKO_RETURN}, Kamakura ${ENOSHIMA_FREEPASS}; a tour replaces this line`,
  },
  {
    item: "Tickets on this plan",
    cost: `${PRICES.tokyoSkytree.adult} + ${PRICES.shibuyaSky.adult} + ${PRICES.teamlabPlanets.adult}`,
    note: "Skytree, SHIBUYA SKY (before / from 15:00) and teamLab Planets, adult, official prices",
  },
  {
    item: "Airport, each way",
    cost: "¥2,580 (Skyliner, Narita) / ¥330 (Keikyu, Haneda)",
    note: `Operators' fares, ${AIRPORT_CHECKED}`,
  },
  {
    item: "Saving / top-end, 4 days",
    cost: `About ${FOUR_DAY_SAVE} plus the room / from about ${FOUR_DAY_TOP}`,
    note: "The guide's saving and top-end days, times four",
  },
];

const faqItems = [
  {
    q: "Is 4 days enough for Tokyo?",
    a: "Yes, for a first visit. Three city days cover the three clusters most visitors come for — Asakusa and Ueno, Shibuya, Harajuku and Shinjuku, and Tsukiji, Ginza and the bay — and the fourth day is a day trip to Kawaguchiko for Mt. Fuji or to Nikko. What 4 days leaves out is a second day trip; that is the 5-day plan.",
  },
  {
    q: "What is the best 4-day Tokyo itinerary for first-timers?",
    a: "Day 1 Asakusa, Ueno and Tokyo Skytree; Day 2 Shibuya, Harajuku and Shinjuku with SHIBUYA SKY at sunset; Day 3 a day trip to Kawaguchiko or Nikko; Day 4 Tsukiji Outer Market, Ginza, teamLab Planets and Odaiba. Each city day stays on one side of Tokyo, so no day crosses the city twice.",
  },
  {
    q: "Do you need the Tokyo Subway Ticket for 4 days?",
    a: `One 72-hour ticket (${SUBWAY_72}, tokyometro.jp, ${SUBWAY_CHECKED}) is enough. Started on your first ride of Day 1, it runs to the same time on Day 4, covering Days 1 and 2, the ride to the Day 3 bus or train, and the Tsukiji morning. That is about 12 rides, and with Tokyo Metro IC fares from ${IC_FROM} it pays from roughly the 12th short ride. It does not cover JR, including the Yamanote Line, or the Yurikamome to Odaiba.`,
  },
  {
    q: "Which day trip fits a 4-day Tokyo trip?",
    a: `Kawaguchiko for Mt. Fuji: 1 hour 45 minutes by highway bus from Shinjuku, ${KAWAGUCHIKO_RETURN} round trip (bus.fujikyu.co.jp, ${FUJIKYU_CHECKED}). Swap to Nikko (about 2 hours from Asakusa, ${NIKKO_PASS_WHA} NIKKO PASS) if the Fuji forecast is cloudy, or Kamakura (${ENOSHIMA_FREEPASS} Freepass from Shinjuku) for an easier day.`,
  },
  {
    q: "Where should you stay for 4 days in Tokyo?",
    a: "Shinjuku, in one hotel for all four nights: Day 2 ends there and the Kawaguchiko bus leaves from Busta Shinjuku on Day 3. Choose Ueno or Asakusa instead if your day trip is Nikko or you land at Narita on the Skyliner, and Tokyo Station if you leave on the Narita Express.",
  },
  {
    q: "How much do 4 days in Tokyo cost?",
    a: `About ${FOUR_DAY_COST} per person at a standard level, room, food, city transport and one paid sight a day included, before flights and shopping — four times the standard day in the Tokyo trip cost guide, which works from the Tokyo Metropolitan Government's 2025 visitor survey (read ${COST_CHECKED}). Add the day-trip transport (${NIKKO_PASS_WHA}–${HAKONE_DAY}) and the airport.`,
  },
  {
    q: "What should I book before a 4-day Tokyo trip?",
    a: "The hotel, the SHIBUYA SKY sunset slot for Day 2, a teamLab Planets time slot for Day 4 and the Day 3 tour or Kawaguchiko bus seat. Skytree is cheaper booked ahead than at the same-day counter. Everything else on the plan — Senso-ji, Meiji Jingu, Tsukiji Outer Market — needs no ticket.",
  },
  {
    q: "What if it rains on the day trip?",
    a: "Swap Day 3 with Day 4, or switch the destination: Nikko's shrines and Kamakura's temples still work in rain, Mt. Fuji does not. Check the forecast the evening before, and read a tour listing's cancellation and bad-weather terms before paying.",
  },
];

const TITLE = "Tokyo 4 Day Itinerary (2026): Day by Day, Day Trip & Costs";
const DESCRIPTION =
  "Tokyo 4 day itinerary: 4 days in Tokyo as Asakusa, Shibuya, a Mt. Fuji or Nikko day trip, then Tsukiji and Odaiba. Tokyo itinerary 4 days with costs.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary (2026): What to Book, and in What Order" },
  { href: "/guides/attractions/tokyo-5-day-itinerary", title: "Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day" },
  { href: "/guides/attractions/tokyo-7-day-itinerary", title: "Tokyo 7 Day Itinerary (2026): Day Trips, Passes & Bookings" },
  { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket 2026: 24/48/72-Hour Price, Worth It?" },
  { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "Kawaguchiko Day Trip From Tokyo 2026: ¥2,200 Bus or Tour" },
  { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip From Tokyo (2026): Costs and Tour or Not" },
  { href: "/guides/attractions/kamakura-day-trip", title: "Kamakura Day Trip From Tokyo (2026): Temples and Fares" },
  { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip From Tokyo 2026: Itinerary, Cost, Tours" },
  { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas Compared" },
  { href: "/guides/money/tokyo-trip-cost", title: "Trip to Tokyo Cost (2026): Per Day, 5-Day and 7-Day Totals" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
const h3 = { fontSize: "1.1rem", marginTop: "1.5rem" } as const;

export default function Tokyo4DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo 4 Day Itinerary", item: URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {crumbSep}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {crumbSep}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Tokyo 4 Day Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo 4 Day Itinerary (2026): <br />3 City Days and 1 Day Trip
          </h1>
          <p className={styles.heroSubtitle}>
            4 days in Tokyo from one hotel — old Tokyo, the west side, Mt. Fuji or Nikko, then the bay — on one
            72-hour subway ticket, with the four things to book before you fly.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares, dated", "No Klook prices — check per date"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>City days</p>
                <p className={styles.verdictStatValue}>3 — Asakusa, Shibuya, Tsukiji & Odaiba</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day trip</p>
                <p className={styles.verdictStatValue}>1 — Kawaguchiko or Nikko</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Subway pass</p>
                <p className={styles.verdictStatValue}>One 72-hour ticket, {SUBWAY_72}</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The best <strong>Tokyo 4 day itinerary</strong> is Day 1 Asakusa, Ueno and Tokyo Skytree, Day 2
              Shibuya, Harajuku and Shinjuku, Day 3 a day trip to <strong>Kawaguchiko</strong> for Mt. Fuji (1 hour
              45 minutes by bus from Shinjuku) or <strong>Nikko</strong> (about 2 hours from Asakusa), and Day 4
              Tsukiji, Ginza and Odaiba. One 72-hour <strong>Tokyo Subway Ticket</strong> ({SUBWAY_72} adult,
              tokyometro.jp, checked {SUBWAY_CHECKED}) is enough for the city: started on Day 1, it lasts until the
              same hour on Day 4 and covers about 12 rides, which is where it pays. It does not cover JR, the
              Yurikamome or the day-trip bus or train. Book the hotel, the SHIBUYA SKY sunset slot, teamLab Planets
              and the Day 3 tour first.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Only three days? See the{" "}
              <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link>. Five, with a
              second day trip? The <Link href="/guides/attractions/tokyo-5-day-itinerary">Tokyo 5 day itinerary</Link>.
              A full week? The <Link href="/guides/attractions/tokyo-7-day-itinerary">Tokyo 7 day itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={fujiPhotographyDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Mt. Fuji day tour from Tokyo →
              </KlookLink>
              <KlookLink href={tokyoFourDayStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Hotels in Shinjuku →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same visit"
          heading="Book These for the Four Days"
          intro="The hotel for all four nights, the Day 3 tour, the 72-hour subway ticket, the airport train and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoFourDayTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day by day</span>
          <h2 className={styles.sectionTitle}>What Is the Best 4-Day Tokyo Itinerary for First-Timers?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Old Tokyo, the west side, a day out of the city, then the bay — one side of Tokyo per day, from one
            hotel. Each row is one day: where you go, how you move, how long it takes and the one thing to book.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Tokyo itinerary 4 days: the day table</h3>
          <SimpleTable
            head={["Day", "Where", "Getting around", "Time needed", "Book ahead"]}
            rows={days.map((d) => [d.day, d.area, d.move, d.time, d.book])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: Tokyo Subway Ticket {SUBWAY_CHECKED} (
            <a href={PRICES.tokyoSubwayTicket.sourceUrl} target="_blank" rel="noopener noreferrer">tokyometro.jp</a>
            ); Kawaguchiko bus {FUJIKYU_CHECKED} (
            <a href="https://bus.fujikyu.co.jp/" target="_blank" rel="noopener noreferrer">bus.fujikyu.co.jp</a>
            ); Tobu to Nikko {NIKKO_TIME_CHECKED} (
            <a href="https://www.tobu.co.jp/en/ticket/nikko/city.html" target="_blank" rel="noopener noreferrer">tobu.co.jp</a>
            ). Time at each sight is a planning guide. If you land in the evening, use the first night for
            Shinjuku and start Day 1 the next morning.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The city days</span>
          <h2 className={styles.sectionTitle}>What Should You Do on Days 1, 2 and 4?</h2>
          <p className={styles.bodyText}>
            <strong>Day 1</strong> is old Tokyo: Senso-ji before the crowds, Nakamise-dori, Ueno Park and Ameyoko,
            then Tokyo Skytree ({PRICES.tokyoSkytree.adult}, cheaper booked ahead than at the same-day counter) for
            the evening view. <strong>Day 2</strong> is the west: Meiji Jingu in the morning, Takeshita Street in
            Harajuku, the Scramble Crossing and SHIBUYA SKY at sunset ({PRICES.shibuyaSky.adult} online, before /
            from 15:00), then Omoide Yokocho in Shinjuku. <strong>Day 4</strong> is the bay: breakfast at Tsukiji
            Outer Market, a walk through Ginza, teamLab Planets in Toyosu ({PRICES.teamlabPlanets.adult}, timed
            entry, nothing sold on site — see the{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets">teamLab Planets tickets</Link> guide) and the
            Odaiba seafront before the airport. Prefer shoes-on art in central Tokyo? Swap in Azabudai Hills with
            our <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless tickets</Link> guide
            — its timed slots open around the 1st of the month, two months ahead.
          </p>
          <p className={styles.bodyText}>
            The hour-by-hour versions of these districts are in the{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> and{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo Skytree ticket →
            </KlookLink>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              SHIBUYA SKY ticket →
            </KlookLink>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              teamLab Planets ticket →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Subway pass</span>
          <h2 className={styles.sectionTitle}>Do You Need the Tokyo Subway Ticket for 4 Days?</h2>
          <p className={styles.bodyText}>
            Yes — one 72-hour ticket ({SUBWAY_72} adult, half for children) and nothing longer. Start it with the
            first ride of Day 1; at 72 hours it runs to the same time on Day 4, so it covers the Asakusa and
            Shibuya days, the ride to the Day 3 bus or train, and the Tsukiji morning. That is about 12 rides on
            this plan, and with Tokyo Metro IC fares from {IC_FROM} (read {IC_CHECKED}) it pays from roughly the
            12th short ride — sooner on longer ones like Shinjuku to Asakusa. A 48-hour ticket ({SUBWAY_48}) for
            Days 1–2 with IC fares on Day 4 is the alternative if your Day 3 starts at a station you can walk to.
          </p>
          <p className={styles.bodyText}>
            It covers Tokyo Metro and Toei lines only — not the JR Yamanote Line, not the Yurikamome to Odaiba, and
            not the bus to Kawaguchiko or Tobu to Nikko. The full break-even is in the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo Subway Ticket (72 hours) →
            </KlookLink>
            <KlookLink href={naritaLimousineBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Narita limousine bus →
            </KlookLink>
            <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Keisei Skyliner →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 3</span>
          <h2 className={styles.sectionTitle}>Which Day Trip Fits a 4-Day Tokyo Trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Kawaguchiko, for Mt. Fuji, if the forecast is clear; Nikko if it is not. Kamakura is the short, cheap
            alternative and Hakone the long, expensive one. All four are possible on your own and as a tour.
          </p>
          <SimpleTable
            head={["Day trip", "Journey time", "Round-trip fare / pass (adult)", "Tour available?", "Source & date checked"]}
            rows={trips.map((t) => [t.trip, t.time, t.fare, t.tour, t.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: Kawaguchiko {FUJIKYU_CHECKED} (
            <a href="https://bus.fujikyu.co.jp/" target="_blank" rel="noopener noreferrer">bus.fujikyu.co.jp</a>
            ); NIKKO PASS {NIKKO_PASS_CHECKED} (
            <a href="https://www.tobu.co.jp/en/ticket/nikko/city.html" target="_blank" rel="noopener noreferrer">tobu.co.jp</a>
            ); Enoshima-Kamakura Freepass {ENOSHIMA_CHECKED} (
            <a href="https://odakyu-global.com/passes/enoshima-kamakura-freepass/" target="_blank" rel="noopener noreferrer">odakyu-global.com</a>
            ); Hakone Freepass {checkedLabel(PRICES.hakoneFreepass.checked)} (
            <a href={PRICES.hakoneFreepass.sourceUrl} target="_blank" rel="noopener noreferrer">odakyu-global.com</a>
            ). Tour prices change by date on Klook and are not listed here.
          </p>

          <h3 className={styles.sectionTitle} style={h3}>Should you take a tour or go on your own?</h3>
          <p className={styles.bodyText}>
            On your own to Kawaguchiko if you only want the lake shore — book the return bus before you go. Take
            a tour if you want Chureito Pagoda, Oishi Park and Oshino Hakkai in one day, or for Nikko, where
            Toshogu and Kegon Falls are a bus ride apart. Read each listing&apos;s cancellation and bad-weather
            terms before paying: Mt. Fuji is often in cloud, and tours run whether it shows or not. More in the{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko</Link>,{" "}
            <Link href="/guides/attractions/nikko-day-trip">Nikko</Link>,{" "}
            <Link href="/guides/attractions/kamakura-day-trip">Kamakura</Link> and{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone</Link> day-trip guides; the
            Hakone pass prices from Shinjuku and Odawara, and whether one day is enough to make it pay, are in
            our <Link href="/guides/attractions/hakone-free-pass">Hakone Freepass</Link> guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={fujiPhotographyDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Mt. Fuji viewpoints day tour →
            </KlookLink>
            <KlookLink href={nikkoWorldHeritageDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nikko day tour →
            </KlookLink>
            <KlookLink href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo – Mt. Fuji highway bus →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Length</span>
          <h2 className={styles.sectionTitle}>Is 4 Days Enough for Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes, for a first visit: three city days reach the clusters most visitors come for, and the fourth
            leaves the city for Mt. Fuji or Nikko. What 4 days cannot fit is a second day trip or a theme park day
            — add a day for Kamakura (the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5-day plan</Link>) or for Tokyo Disney. With
            only three days, drop the day trip and follow the{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">3-day plan</Link>.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Budget</span>
          <h2 className={styles.sectionTitle}>How Much Do 4 Days in Tokyo Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About {FOUR_DAY_COST} per person at a standard level, before flights and shopping, with the day trip
            and the airport on top.
          </p>
          <SimpleTable head={["Item", "Cost (per person)", "Basis"]} rows={costRows.map((r) => [r.item, r.cost, r.note])} />
          <p className={styles.bodyText} style={note}>
            Last checked: survey figures and the standard day {COST_CHECKED}, from the{" "}
            <Link href="/guides/money/tokyo-trip-cost">Tokyo trip cost guide</Link> (Tokyo Metropolitan
            Government,{" "}
            <a href="https://www.metro.tokyo.lg.jp/" target="_blank" rel="noopener noreferrer">metro.tokyo.lg.jp</a>
            ); admissions {checkedLabel(PRICES.tokyoSkytree.checked)} (
            <a href={PRICES.tokyoSkytree.sourceUrl} target="_blank" rel="noopener noreferrer">tokyo-skytree.jp</a>
            ), {checkedLabel(PRICES.shibuyaSky.checked)} (
            <a href={PRICES.shibuyaSky.sourceUrl} target="_blank" rel="noopener noreferrer">SHIBUYA SKY</a>
            ), {checkedLabel(PRICES.teamlabPlanets.checked)} (
            <a href={PRICES.teamlabPlanets.sourceUrl} target="_blank" rel="noopener noreferrer">teamlabplanets.dmm.com</a>
            ). No room rate is printed for the saving and top-end tiers; check Klook for your dates.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay for 4 Days in Tokyo?</h2>
          <p className={styles.bodyText}>
            Shinjuku, in one hotel for all four nights — Day 2 ends there and the Kawaguchiko bus leaves from
            Busta Shinjuku on Day 3. Ueno or Asakusa suits a Nikko day trip and a Skyliner arrival from Narita;
            Tokyo Station suits a Narita Express departure and puts Ginza and Tsukiji close for Day 4. The full
            comparison is in <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link>.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for 4 Days in Tokyo"
          intro="Availability and price are per date, so each area links to Klook's hotel search for it. Read the cancellation terms before paying."
          areas={tokyoFourDayStayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Quick questions</span>
          <h2 className={styles.sectionTitle}>Is This 4-Day Plan Good With Kids?</h2>
          <p className={styles.bodyText}>
            Yes, with Kamakura or a Mt. Fuji tour rather than Nikko on Day 3 — Nikko is the longest day. The bay
            day (teamLab Planets, Odaiba) is the strongest day for children; teamLab Planets is{" "}
            {PRICES.teamlabPlanets.child} for ages 4–12. The subway ticket&apos;s child price is half the adult
            price.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>What is the best time of year for 4 days in Tokyo?</h3>
          <p className={styles.bodyText}>
            Late March to May and October to November. Mt. Fuji tends to show more clearly in the colder months.
            Avoid Golden Week (late April to early May) if you can — the day-trip buses and tours fill first.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>What should you wear?</h3>
          <p className={styles.bodyText}>
            Walking shoes: every city day is mostly on foot. teamLab Planets is walked barefoot, with water up to
            adult knee height in some rooms, so trousers that roll up help, and Kawaguchiko and Nikko are colder than the city — take a
            warm layer from October to April.
          </p>
        </section>

        <BookingEsimCard lead="Four days, three timed QR tickets and a tour meeting point on Day 3 — get mobile data before you land." />

        <KlookTourPicks
          heading="Day 3 With a Guide"
          intro="Group and private versions of the four day trips on this page. Klook prices change by date, so open a listing for the figure on your dates."
          tours={[fujiPhotographyDayTour, kawaguchikoYamanakakoBusTour, nikkoWorldHeritageDayTour, hakonePrivateDayTour]}
        />
        <p className={styles.bodyText} style={note}>
          For Kamakura, the{" "}
          <KlookLink href={kamakuraEnoshimaDayTourUrl} target="_blank" rel="sponsored nofollow noopener">Kamakura &amp; Enoshima day tour</KlookLink>{" "}
          adds Enoshima without working out the Enoden.
        </p>

        <EsimCtaBottom />

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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>One hotel, three city days, one day trip</h2>
            <p className={styles.ctaBannerDesc}>
              Book the hotel and the Day 3 tour first, then the timed tickets for Days 1, 2 and 4.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoFourDayStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Shinjuku hotels →
              </KlookLink>
              <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Tokyo Subway Ticket →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
