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
import { checkedLabel, priceById, PRICES } from "../../../lib/attraction-prices";
import {
  fujiPhotographyDayTour,
  hakoneFreepass,
  hakonePrivateDayTour,
  kamakuraEnoshimaDayTourUrl,
  kamakuraHakonePrivateCarTour,
  kawaguchikoYamanakakoBusTour,
  nikkoPrivateDayTour,
  nikkoWorldHeritageDayTour,
  shibuyaSkyTicketUrl,
  skytreeTicket,
  teamlabPlanetsTicketUrl,
  tokyoMtFujiHighwayBus,
  tokyoSevenDayStayAreas,
  tokyoSevenDayTripPrep,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Seven days in Tokyo, added 12 Nov 2026 (task-jtk-20261112-01).
 *
 * How it differs from its neighbours:
 *  - tokyo-2-day / tokyo-3-day stay inside the city;
 *  - tokyo-5-day-itinerary is three city days plus Kawaguchiko and Kamakura;
 *  - this page is four city days plus three day trips (Hakone, Nikko, and Kamakura
 *    or Kawaguchiko), with the day trips spread out so a wet day can be swapped.
 *
 * Sources and dates:
 *  - NIKKO PASS WORLD HERITAGE AREA (¥3,000 adult / ¥1,500 child, 2 days, one Asakusa ⇄
 *    Shimo-Imaichi round trip plus Tobu buses in the World Heritage area, limited
 *    express not included, foreign travellers only) read on tobu.co.jp/en/ticket/nikko/city.html
 *    on 12 Nov 2026;
 *  - Tobu Asakusa → Nikko "about two hours" and Toshogu hours from the Nikko guide
 *    (toshogu.jp / tobu.co.jp, 19 Oct 2026); Toshogu admission from lib/attraction-prices;
 *  - Romancecar ~80 min and the ¥1,200 surcharge from odakyu-global.com, read
 *    9 Nov 2026 for the Hakone day-trip guide; the Freepass from lib/attraction-prices;
 *  - Shinjuku → Kawaguchiko bus, 1 h 45 min, ¥2,200 (¥2,000 online), bus.fujikyu.co.jp,
 *    21 Oct 2026 (Kawaguchiko guide);
 *  - Tokyo → Kamakura "about 50 to 60 minutes" on JR (Kamakura guide; JR fare not priced
 *    there either); temple admissions from lib/attraction-prices;
 *  - Tokyo Subway Ticket prices and break-even from the subway-ticket guide
 *    (tokyometro.jp, 8 Nov 2026) and lib/attraction-prices;
 *  - JR Tokyo Wide Pass ¥16,000 / 3 consecutive days (jreast.co.jp, 10 Nov 2026);
 *  - JAPAN RAIL PASS 7-day ¥53,000 Exchange Order / ¥50,000 official site
 *    (japanrailpass.net, 11 Nov 2026, from the 3-week itinerary);
 *  - 7-day cost ¥136,200–¥149,500 per person from the Tokyo trip cost guide.
 * No Klook price appears.
 */

const NIKKO_PASS_CHECKED = checkedLabel("2026-11-12");
const NIKKO_TIME_CHECKED = checkedLabel("2026-10-19");
const ROMANCECAR_CHECKED = checkedLabel("2026-11-09");
const FUJIKYU_CHECKED = checkedLabel("2026-10-21");
const SUBWAY_CHECKED = checkedLabel(PRICES.tokyoSubwayTicket.checked);
const WIDE_PASS_CHECKED = checkedLabel("2026-11-10");
const JR_PASS_CHECKED = checkedLabel("2026-11-11");
const COST_CHECKED = checkedLabel("2026-11-09");

const NIKKO_PASS_WHA = "¥3,000";
const ROMANCECAR_SURCHARGE = "¥1,200";
const KAWAGUCHIKO_BUS = "¥2,200";
const KAWAGUCHIKO_BUS_ONLINE = "¥2,000";
const WIDE_PASS = "¥16,000";
const JR_PASS_7 = "¥53,000";
const JR_PASS_7_ONLINE = "¥50,000";
const WEEK_COST = "¥136,200–¥149,500";
/** Official adult price, from data/attraction-prices.json (nikkoToshogu). */
const TOSHOGU_ADULT = priceById("nikkoToshogu").adult;

const ROUTE = "/guides/attractions/tokyo-7-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

type Day = { day: string; area: string; sights: string; move: string; book: string };

const days: Day[] = [
  {
    day: "Day 1",
    area: "Asakusa & Ueno",
    sights: "Senso-ji and Nakamise-dori, Ueno Park, Ameyoko, Tokyo Skytree at dusk",
    move: "Ginza Line / Toei Asakusa Line",
    book: "Skytree ticket; 24-hour Tokyo Subway Ticket",
  },
  {
    day: "Day 2",
    area: "Shibuya, Harajuku & Shinjuku",
    sights: "Meiji Jingu, Takeshita Street, the Scramble Crossing, SHIBUYA SKY at sunset, Omoide Yokocho",
    move: "JR Yamanote Line (not on the subway ticket)",
    book: "SHIBUYA SKY sunset slot",
  },
  {
    day: "Day 3",
    area: "Hakone (day trip)",
    sights: "Hakone-Yumoto, Owakudani by ropeway, the Lake Ashi boat, Hakone Shrine",
    move: "Odakyu Romancecar from Shinjuku, about 80 min",
    book: "Hakone Freepass, or a Hakone day tour",
  },
  {
    day: "Day 4",
    area: "Tsukiji, Toyosu & Odaiba",
    sights: "Tsukiji Outer Market breakfast, teamLab Planets, Odaiba seafront",
    move: "Hibiya / Yurakucho lines, then the Yurikamome",
    book: "teamLab Planets time slot; 24-hour subway ticket",
  },
  {
    day: "Day 5",
    area: "Nikko (day trip)",
    sights: "Toshogu Shrine, Shinkyo Bridge, Kegon Falls and Lake Chuzenji",
    move: "Tobu from Asakusa, about 2 hours — or a tour from Shinjuku",
    book: "Nikko day tour, or the NIKKO PASS",
  },
  {
    day: "Day 6",
    area: "Kamakura or Kawaguchiko (day trip)",
    sights: "Kamakura: the Great Buddha, Hase-dera, the Enoden. Kawaguchiko: Mt. Fuji views, Chureito Pagoda",
    move: "Kamakura: JR from Tokyo Station, 50–60 min. Kawaguchiko: highway bus from Shinjuku, 1 h 45 min",
    book: "Kawaguchiko bus seat or a Fuji tour; Kamakura needs nothing",
  },
  {
    day: "Day 7",
    area: "Ginza & Tokyo Station",
    sights: "Imperial Palace East Gardens, Ginza, Tokyo Station's Marunouchi side; fly home",
    move: "Marunouchi / Ginza lines; Narita Express or Keisei Skyliner",
    book: "Airport train or bus",
  },
];

type Trip = { trip: string; from: string; time: string; fare: string; tour: string; source: string };

const trips: Trip[] = [
  {
    trip: "Hakone — the easiest day trip with the most to ride",
    from: "Shinjuku",
    time: "About 80 min by Romancecar",
    fare: `Hakone Freepass ${PRICES.hakoneFreepass.adult} (2-day, from Shinjuku) + Romancecar surcharge ${ROMANCECAR_SURCHARGE} each way`,
    tour: "On your own the Freepass covers the whole loop; a tour or private guide saves the connections and the queue at the ropeway",
    source: `odakyu-global.com, ${checkedLabel(PRICES.hakoneFreepass.checked)} (Freepass), ${ROMANCECAR_CHECKED} (Romancecar)`,
  },
  {
    trip: "Nikko — shrines and waterfalls, the longest day",
    from: "Asakusa",
    time: "About 2 hours by Tobu",
    fare: `NIKKO PASS WORLD HERITAGE AREA ${NIKKO_PASS_WHA} adult (2 days: one Asakusa ⇄ Shimo-Imaichi round trip plus Tobu buses around the shrines); limited express charged on top`,
    tour: "Toshogu and Kegon Falls are a bus ride apart; a tour joins them in one day and meets in Shinjuku",
    source: `tobu.co.jp, ${NIKKO_PASS_CHECKED}; journey time ${NIKKO_TIME_CHECKED}`,
  },
  {
    trip: "Kamakura — the short one",
    from: "Tokyo Station (Shinjuku by the Shonan-Shinjuku Line)",
    time: "About 50–60 min by JR, no change",
    fare: "Ordinary JR fare, not priced here; temples " + `${PRICES.kotokuin.adult} (Great Buddha) and ${PRICES.hasedera.adult} (Hase-dera)`,
    tour: "Easy on your own; a tour adds Enoshima without working out the Enoden",
    source: `kotoku-in.jp / hasedera.jp, ${checkedLabel(PRICES.kotokuin.checked)}`,
  },
  {
    trip: "Kawaguchiko — the Mt. Fuji day",
    from: "Shinjuku (Busta Shinjuku)",
    time: "Approximately 1 h 45 min by highway bus",
    fare: `${KAWAGUCHIKO_BUS} adult one way, ${KAWAGUCHIKO_BUS_ONLINE} booked online`,
    tour: "A tour reaches the viewpoints (Chureito Pagoda, Oishi Park) without the local buses; on your own, book the return bus",
    source: `bus.fujikyu.co.jp, ${FUJIKYU_CHECKED}`,
  },
];

const passRows = [
  {
    pass: "Tokyo Subway Ticket, 24 hours",
    price: `${PRICES.tokyoSubwayTicket.adult} adult, ${PRICES.tokyoSubwayTicket.child} child`,
    use: "Days 1 and 4 — Asakusa, Ueno, Tsukiji and Toyosu are all Metro or Toei stops",
    verdict: "Pays at about 5–6 subway rides in the 24 hours",
  },
  {
    pass: "Tokyo Subway Ticket, 48 / 72 hours",
    price: "¥1,500 / ¥2,000 adult",
    use: "Only if your city days run back to back — on this plan the day trips sit between them",
    verdict: "The clock keeps running through a Hakone or Nikko day, when the subway is barely used",
  },
  {
    pass: "Hakone Freepass, 2 days from Shinjuku",
    price: `${PRICES.hakoneFreepass.adult} adult, ${PRICES.hakoneFreepass.child} child`,
    use: "Day 3",
    verdict: "Worth it for the full loop: Odakyu's own comparison puts the same trip at ¥9,200 using JR (odakyu-global.com, 25 Oct 2026). Romancecar surcharge extra",
  },
  {
    pass: "NIKKO PASS WORLD HERITAGE AREA, 2 days",
    price: `${NIKKO_PASS_WHA} adult, ¥1,500 child`,
    use: "Day 5, on your own",
    verdict: "Covers the train from Asakusa and back plus the buses up to the shrines; foreign travellers only",
  },
  {
    pass: "JR Tokyo Wide Pass, 3 consecutive days",
    price: `${WIDE_PASS} adult`,
    use: "Only if three JR-heavy day trips fall on consecutive days",
    verdict: "Does not cover Odakyu to Hakone, the subway or the Tokaido Shinkansen — not a fit for this plan",
  },
];

const bookRows = [
  { what: "Hotel (6 nights)", when: "As soon as the dates are fixed", why: "One hotel for the whole week; Shinjuku is where three of the day trips start. Check the cancellation policy before you pay" },
  { what: "SHIBUYA SKY sunset slot (Day 2)", when: "00:00 JST, two weeks ahead", why: "Sunset slots sell out first; online is ¥300 cheaper than the counter" },
  { what: "teamLab Planets (Day 4)", when: "As soon as the date is fixed", why: "Timed 30-minute entry, nothing sold on site, price changes by date" },
  { what: "Nikko and Hakone day tours (Days 3 and 5)", when: "1–2 weeks ahead; earlier for autumn leaves", why: "Group tours run on set dates and fill on weekends. Read what each listing says about cancellation and bad weather" },
  { what: "Kawaguchiko highway bus (Day 6)", when: "Before you fly", why: "Reserved seats in both directions; the return decides how long you get at the lake" },
  { what: "Tokyo Skytree (Day 1)", when: "A few days ahead", why: "Booking ahead is cheaper than the same-day counter" },
];

const faqItems = [
  {
    q: "How should I spend 7 days in Tokyo?",
    a: "Four days in the city and three day trips: Day 1 Asakusa and Ueno, Day 2 Shibuya, Harajuku and Shinjuku, Day 3 Hakone, Day 4 Tsukiji, Toyosu and Odaiba, Day 5 Nikko, Day 6 Kamakura or Kawaguchiko, and Day 7 Ginza and Tokyo Station before the flight. Keeping a city day between the day trips means a rainy forecast can be swapped rather than wasted.",
  },
  {
    q: "Is one week in Tokyo too long?",
    a: "No — a week is the length at which Tokyo stops competing with the day trips. Three days cover the city's main clusters; the other four give you Hakone, Nikko and Kamakura or Mt. Fuji without dropping a Tokyo district to make room.",
  },
  {
    q: "Which day trips from Tokyo are worth it in 7 days?",
    a: `Hakone (about 80 minutes by Romancecar from Shinjuku), Nikko (about 2 hours by Tobu from Asakusa) and one of Kamakura (50–60 minutes by JR from Tokyo Station) or Kawaguchiko (1 hour 45 minutes by highway bus from Shinjuku, ${KAWAGUCHIKO_BUS} one way). Pick Kawaguchiko if seeing Mt. Fuji matters most, Kamakura for an easier day.`,
  },
  {
    q: "Do I need a JR Pass for a week in Tokyo?",
    a: `No. The 7-day JAPAN RAIL PASS is ${JR_PASS_7} as an Exchange Order (${JR_PASS_7_ONLINE} on the official website, japanrailpass.net, ${JR_PASS_CHECKED}), and on this plan JR only carries you to Kamakura and around the Yamanote Line. Hakone is Odakyu, Nikko is Tobu, Kawaguchiko is a highway bus and the city days are mostly subway.`,
  },
  {
    q: "Is the Tokyo Subway Ticket worth it for 7 days?",
    a: `Buy 24-hour tickets for the heavy subway days rather than one 72-hour ticket. On this plan the city days are split by day trips, and a 72-hour ticket keeps counting through them. A 24-hour ticket is ${PRICES.tokyoSubwayTicket.adult} and pays at about five or six rides (tokyometro.jp, ${SUBWAY_CHECKED}). It does not cover JR, including the Yamanote Line.`,
  },
  {
    q: "Where should I stay for a week in Tokyo?",
    a: "Shinjuku, if you only move hotel once — or not at all. The Romancecar to Hakone and the highway bus to Kawaguchiko leave from there, and the Nikko group tour meets there. Tokyo Station / Marunouchi is the alternative if your day trips are mostly by JR, and Ueno or Asakusa if you are going to Nikko on your own by Tobu.",
  },
  {
    q: "How much does a week in Tokyo cost?",
    a: `About ${WEEK_COST} per person for 7 days and 7 nights at a standard level, according to the Tokyo trip cost guide, which works from the Tokyo Metropolitan Government's visitor survey (read ${COST_CHECKED}). The day trips add their own transport — for example the ${PRICES.hakoneFreepass.adult} Hakone Freepass or the ${NIKKO_PASS_WHA} NIKKO PASS.`,
  },
  {
    q: "What happens to a day trip if it rains?",
    a: "Swap it with a city day. That is why this plan never puts two day trips in a row. Hakone's ropeway and the Lake Ashi boat can stop in strong wind, and Mt. Fuji is often hidden by cloud, so check the forecast the evening before. For a booked tour, read the listing's cancellation and weather terms before paying.",
  },
];

const TITLE = "Tokyo 7 Day Itinerary (2026): Day Trips, Passes & Bookings";
const DESCRIPTION =
  "Tokyo 7 day itinerary: 7 days in Tokyo as 4 city days plus Hakone, Nikko and Kamakura or Kawaguchiko. One week in Tokyo with passes, costs and bookings.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const related = [
  { href: "/guides/attractions/tokyo-5-day-itinerary", title: "Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day" },
  { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary" },
  { href: "/guides/attractions/tokyo-2-day-itinerary", title: "Tokyo 2 Day Itinerary" },
  { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip From Tokyo 2026: Itinerary, Cost, Tours" },
  { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip From Tokyo (2026): Costs and Tour or Not" },
  { href: "/guides/attractions/kamakura-day-trip", title: "Kamakura Day Trip From Tokyo (2026): Temples and Fares" },
  { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "Kawaguchiko Day Trip From Tokyo 2026: ¥2,200 Bus or Tour" },
  { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket 2026: 24/48/72-Hour Price, Worth It?" },
  { href: "/guides/attractions/hakone-free-pass", title: "Hakone Free Pass 2026: ¥7,100 From Shinjuku, Is It Worth It?" },
  { href: "/guides/transport/tokyo-wide-pass", title: "JR Tokyo Wide Pass Price (2026): ¥16,000 — Is It Worth It?" },
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

export default function Tokyo7DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo 7 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo 7 Day Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo 7 Day Itinerary (2026):<br />4 City Days and 3 Day Trips
          </h1>
          <p className={styles.heroSubtitle}>
            One week in Tokyo from one hotel — Hakone, Nikko and Kamakura or Mt. Fuji in between the city
            days, with the passes that pay and the bookings that have a date on them.
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
                <p className={styles.verdictStatValue}>4 — Asakusa, Shibuya, the bay, Ginza</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day trips</p>
                <p className={styles.verdictStatValue}>3 — Hakone, Nikko, Kamakura or Fuji</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Base</p>
                <p className={styles.verdictStatValue}>One hotel, ideally Shinjuku</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Tokyo 7 day itinerary</strong> works best as 4 days in the city — Asakusa and Ueno,
              Shibuya, Harajuku and Shinjuku, Tsukiji, Toyosu and Odaiba, then Ginza and Tokyo Station — plus 3
              day trips: <strong>Hakone</strong> (about 80 minutes from Shinjuku), <strong>Nikko</strong> (about
              2 hours from Asakusa) and <strong>Kamakura</strong> (50–60 minutes from Tokyo Station) or{" "}
              <strong>Kawaguchiko</strong> for Mt. Fuji (1 hour 45 minutes from Shinjuku). Use 24-hour{" "}
              <strong>Tokyo Subway Tickets</strong> ({PRICES.tokyoSubwayTicket.adult} each) on the subway-heavy
              city days and the <strong>Hakone Freepass</strong> ({PRICES.hakoneFreepass.adult} from Shinjuku)
              for Hakone; a JR Pass does not pay. Book the hotel, the SHIBUYA SKY sunset slot and teamLab Planets
              first.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Only five days? See the{" "}
              <Link href="/guides/attractions/tokyo-5-day-itinerary">Tokyo 5 day itinerary</Link>. Three? See the{" "}
              <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoSevenDayStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hotels in Shinjuku →
              </KlookLink>
              <KlookLink href={nikkoWorldHeritageDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Nikko day tour from Tokyo →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same visit"
          heading="Book These for the Week"
          intro="The hotel for all six nights, the Nikko day as one booking, the subway ticket for the city days, the Hakone pass and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoSevenDayTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day by day</span>
          <h2 className={styles.sectionTitle}>How Should I Spend 7 Days in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Four city days and three day trips, alternating, from one hotel. Each row is one day: the area, the
            main sights, how you get around and what needs booking before you go.
          </p>
          <SimpleTable
            head={["Day", "Area", "Main sights", "Getting around", "What to book"]}
            rows={days.map((d) => [d.day, d.area, d.sights, d.move, d.book])}
          />
          <p className={styles.bodyText} style={note}>
            Journey times from the operators (Odakyu {ROMANCECAR_CHECKED}, Tobu {NIKKO_TIME_CHECKED}, Fujikyu{" "}
            {FUJIKYU_CHECKED}) as read for the day-trip guides linked below. If your flight lands in the evening,
            make Day 1 a Shinjuku evening and move Asakusa to Day 7.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>City days</span>
          <h2 className={styles.sectionTitle}>What Should I Do on the Four Tokyo Days?</h2>
          <p className={styles.bodyText}>
            One side of the city per day, so you never cross Tokyo twice. <strong>Day 1</strong> is old Tokyo:
            Senso-ji early, Ueno Park and Ameyoko, and Tokyo Skytree for the evening view.{" "}
            <strong>Day 2</strong> is the west: Meiji Jingu in the morning, Harajuku and the Scramble Crossing,
            SHIBUYA SKY at sunset ({PRICES.shibuyaSky.adult} online, before / from 15:00), then Shinjuku&apos;s
            Omoide Yokocho. <strong>Day 4</strong> is the bay: breakfast at Tsukiji Outer Market, teamLab Planets
            ({PRICES.teamlabPlanets.adult}) in Toyosu, then Odaiba. <strong>Day 7</strong> is Ginza, the Imperial
            Palace East Gardens and Tokyo Station, which is also where the Narita Express leaves.
          </p>
          <p className={styles.bodyText}>
            The hour-by-hour version of these days, with every admission dated, is in the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">Tokyo 5 day itinerary</Link> and the{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link> guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              SHIBUYA SKY ticket →
            </KlookLink>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets ticket →
            </KlookLink>
            <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Skytree ticket →
            </KlookLink>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Subway Ticket →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day trips</span>
          <h2 className={styles.sectionTitle}>Which Day Trips From Tokyo Are Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Hakone and Nikko, plus Kamakura or Kawaguchiko. Hakone is the most varied day, Nikko the most
            impressive and the longest, Kamakura the easiest, and Kawaguchiko the one for Mt. Fuji.
          </p>
          <SimpleTable
            head={["Day trip", "Leaves from", "Journey time", "Official fare / pass (adult)", "Tour or on your own?", "Source & date checked"]}
            rows={trips.map((t) => [t.trip, t.from, t.time, t.fare, t.tour, t.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {NIKKO_PASS_CHECKED} for the NIKKO PASS (
            <a href="https://www.tobu.co.jp/en/ticket/nikko/city.html" target="_blank" rel="noopener noreferrer">tobu.co.jp</a>
            ); the other dates are in the table. Official sites:{" "}
            <a href="https://odakyu-global.com/passes/hakone-freepass/" target="_blank" rel="noopener noreferrer">odakyu-global.com</a>,{" "}
            <a href="https://bus.fujikyu.co.jp/" target="_blank" rel="noopener noreferrer">bus.fujikyu.co.jp</a>.
            The JR fare to Kamakura is not priced on this site; pay it with an IC card.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            Should I take a tour or go on my own?
          </h3>
          <p className={styles.bodyText}>
            On your own for Hakone and Kamakura — the Freepass and the JR line make both simple. A tour earns
            its keep on the Nikko day, where Toshogu and Kegon Falls are a bus ride apart and Toshogu closes at
            16:00 from November to March, and on the Fuji day if you want several viewpoints without the local
            buses. Private tours (Nikko, Hakone, or Kamakura and Hakone by chartered car) suit families and
            groups who want to set the pace. Full detail is in the{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone day trip</Link>,{" "}
            <Link href="/guides/attractions/nikko-day-trip">Nikko day trip</Link>,{" "}
            <Link href="/guides/attractions/kamakura-day-trip">Kamakura day trip</Link> and{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo">Kawaguchiko day trip</Link> guides.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nikkoWorldHeritageDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nikko day tour →
            </KlookLink>
            <KlookLink href={hakonePrivateDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hakone private day tour →
            </KlookLink>
            <KlookLink href={kamakuraEnoshimaDayTourUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kamakura &amp; Enoshima day tour →
            </KlookLink>
            <KlookLink href={fujiPhotographyDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Mt. Fuji viewpoints day tour →
            </KlookLink>
          </div>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>
            Kamakura or Kawaguchiko for Day 6?
          </h3>
          <p className={styles.bodyText}>
            Kawaguchiko if Mt. Fuji is the reason you came — but the mountain is often in cloud, so keep the day
            flexible and look at the forecast the evening before. Kamakura if you want a shorter, easier day after
            Nikko, or if you are travelling with small children. Either way, book the Kawaguchiko return bus
            before you go; Kamakura needs no booking at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoMtFujiHighwayBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo – Mt. Fuji highway bus →
            </KlookLink>
            <KlookLink href={kawaguchikoYamanakakoBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kawaguchiko day bus tour →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Passes</span>
          <h2 className={styles.sectionTitle}>Which Passes Pay Off for a Week in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            24-hour Tokyo Subway Tickets on Days 1 and 4, the Hakone Freepass on Day 3 and, if you go to Nikko on
            your own, the NIKKO PASS on Day 5. Nothing else.
          </p>
          <SimpleTable
            head={["Pass", "Official price", "Where it fits on this plan", "Does it pay?"]}
            rows={passRows.map((r) => [r.pass, r.price, r.use, r.verdict])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: Tokyo Subway Ticket {SUBWAY_CHECKED} (
            <a href={PRICES.tokyoSubwayTicket.sourceUrl} target="_blank" rel="noopener noreferrer">tokyometro.jp</a>
            ); Hakone Freepass {checkedLabel(PRICES.hakoneFreepass.checked)} (
            <a href={PRICES.hakoneFreepass.sourceUrl} target="_blank" rel="noopener noreferrer">odakyu-global.com</a>
            ); NIKKO PASS {NIKKO_PASS_CHECKED} (tobu.co.jp); JR Tokyo Wide Pass {WIDE_PASS_CHECKED} (jreast.co.jp).
            The break-even for the subway ticket is worked out in the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket guide</Link>, the Hakone
            arithmetic in the <Link href="/guides/attractions/hakone-free-pass">Hakone Free Pass guide</Link>,
            and the JR option in the <Link href="/guides/transport/tokyo-wide-pass">JR Tokyo Wide Pass guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo Subway Ticket →
            </KlookLink>
            <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hakone Freepass →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Do I Need a JR Pass for a Week in Tokyo?</h2>
          <p className={styles.bodyText}>
            No. The 7-day JAPAN RAIL PASS is {JR_PASS_7} as an Exchange Order from an overseas agency and{" "}
            {JR_PASS_7_ONLINE} on the official website (japanrailpass.net, {JR_PASS_CHECKED}). On this plan JR
            carries you to Kamakura and around the Yamanote Line, and that is all: Hakone is Odakyu, Nikko by
            Tobu is a private railway, Kawaguchiko is a highway bus, and the city days are mostly subway. The
            regional JR Tokyo Wide Pass ({WIDE_PASS} for three consecutive days, {WIDE_PASS_CHECKED}) covers
            Nikko only on the JR–Tobu through limited expresses and does not cover Odakyu to Hakone, so it only
            pays if you rearrange the week around three JR day trips in a row. If Tokyo is the first leg of a
            longer trip, see the <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link>.
          </p>
        </section>

        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>What Should I Book Before the Trip, and When?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The hotel first, then the three timed tickets, then the day trips. Everything else on the plan is
            walk-up.
          </p>
          <SimpleTable
            head={["What", "When to book", "Why"]}
            rows={bookRows.map((r) => [r.what, r.when, r.why])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: SHIBUYA SKY rules {checkedLabel(PRICES.shibuyaSky.checked)} (
            <a href={PRICES.shibuyaSky.sourceUrl} target="_blank" rel="noopener noreferrer">shibuya-scramble-square.com</a>
            ); teamLab Planets {checkedLabel(PRICES.teamlabPlanets.checked)} (
            <a href={PRICES.teamlabPlanets.sourceUrl} target="_blank" rel="noopener noreferrer">teamlabplanets.dmm.com</a>
            ). Tour timing is a planning guide, not an operator rule.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Before paying for any tour, read its cancellation policy and what it says about bad weather. The
            Hakone ropeway and boat and the Mt. Fuji views are the parts of this week most exposed to wind and
            cloud; the Nikko day is the one most likely to fill on autumn weekends.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay for a Week in Tokyo?</h2>
          <p className={styles.bodyText}>
            In one hotel in Shinjuku — the Romancecar to Hakone and the highway bus to Kawaguchiko leave from
            there, and the Nikko group tour meets there. Tokyo Station / Marunouchi is the alternative if your day
            trips are mostly by JR (Kamakura, or the shinkansen towards Nikko), and Ueno or Asakusa suits a Nikko
            day on your own by Tobu. The full comparison is in{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link>.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for a Tokyo Week"
          intro="Availability and price are per date, so each area links to Klook's hotel search for it."
          areas={tokyoSevenDayStayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Budget</span>
          <h2 className={styles.sectionTitle}>How Much Does a Week in Tokyo Cost?</h2>
          <p className={styles.bodyText}>
            About {WEEK_COST} per person for 7 days and 7 nights at a standard level, from the{" "}
            <Link href="/guides/money/tokyo-trip-cost">Tokyo trip cost guide</Link>, which works from the Tokyo
            Metropolitan Government&apos;s visitor survey (read {COST_CHECKED}). On top of that come the day
            trips: the Hakone Freepass ({PRICES.hakoneFreepass.adult}) plus the Romancecar surcharge (
            {ROMANCECAR_SURCHARGE} each way), the NIKKO PASS ({NIKKO_PASS_WHA}) and Toshogu (
            {TOSHOGU_ADULT}), and either the Kamakura temples ({PRICES.kotokuin.adult} and{" "}
            {PRICES.hasedera.adult}) or the Kawaguchiko bus ({KAWAGUCHIKO_BUS} each way). Tour prices change by
            date on Klook and are not listed here.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Quick questions</span>
          <h2 className={styles.sectionTitle}>Is This Week Good With Kids?</h2>
          <p className={styles.bodyText}>
            Yes, with Kamakura rather than Kawaguchiko on Day 6. The bay day (teamLab Planets, Odaiba) and Hakone&apos;s
            ropeway and pirate-ship boat are the strongest days for children; Nikko is the longest, and a private
            tour makes it easier with small children than two trains and a bus. Child prices for the passes are
            about half the adult price.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>What should I wear on the day trips?</h3>
          <p className={styles.bodyText}>
            Shoes with grip: Toshogu and Hase-dera have stone steps, and Hakone and Nikko are higher and colder
            than the city — take a warm layer from October to April.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>What is the best time of year for a week in Tokyo?</h3>
          <p className={styles.bodyText}>
            Late March to May and October to November. Autumn colour reaches Nikko before Tokyo, and the clearest
            Mt. Fuji views tend to come in the colder months. Avoid Golden Week (late April to early May) if you can:
            the day-trip trains and tours fill first.
          </p>
        </section>

        <BookingEsimCard lead="Seven days, three day-trip meeting points and a QR code for every ticket — get mobile data before you land." />

        <KlookTourPicks
          heading="If You Would Rather Have a Guide for the Day Trips"
          intro="Group and private versions of the Nikko, Hakone, Kamakura and Mt. Fuji days. Klook prices change by date, so open a listing for the figure on your dates."
          tours={[
            nikkoWorldHeritageDayTour,
            nikkoPrivateDayTour,
            hakonePrivateDayTour,
            kamakuraHakonePrivateCarTour,
            fujiPhotographyDayTour,
          ]}
        />

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
            <h2 className={styles.ctaBannerTitle}>One hotel, four city days, three day trips</h2>
            <p className={styles.ctaBannerDesc}>
              Book the hotel and the Nikko day first, then the timed tickets for Days 1, 2 and 4.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoSevenDayStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Shinjuku hotels →
              </KlookLink>
              <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Hakone Freepass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
