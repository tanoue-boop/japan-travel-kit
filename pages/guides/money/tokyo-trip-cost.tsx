import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  hanedaLimousineBus,
  keiseiSkylinerUrl,
  klookEsim,
  shibuyaSkyTicketUrl,
  teamlabPlanetsTicketUrl,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
  tokyoTripCostPrep,
  tokyoTripCostTopPrep,
  whereToStayTokyoAreas,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Trip to Tokyo cost. Added 9 Nov 2026 (task-jtk-20261109-02).
 *
 * Why this page exists: on Bing, "trip to tokyo cost", "trip to tokyo japan cost" and
 * "trip to tokyo budget" all landed on /guides/money/japan-travel-budget, which answers
 * for Japan as a whole, and took no clicks. This page answers for Tokyo only;
 * japan-travel-budget keeps Japan-wide days, intercity rail and the JR Pass.
 *
 * How the numbers are built:
 *  - The middle tier is the Tokyo Metropolitan Government's own survey of foreign
 *    visitors for January–December 2025 (令和7年 国・地域別外国人旅行者行動特性調査,
 *    published 30 June 2026): ¥199,874 spent in Tokyo per visitor, of which ¥65,199
 *    accommodation, ¥41,428 food and drink, ¥17,340 transport inside Tokyo and ¥56,970
 *    shopping, over an average of 6.9 nights in Tokyo. The total and the accommodation
 *    figure were read on metro.tokyo.lg.jp and sangyo-rodo.metro.tokyo.lg.jp on
 *    9 Nov 2026; the other lines and the 6.9 nights come from the results summary PDF
 *    (別紙1, metro.tokyo.lg.jp/documents/d/tosei/20260630_17_01), read through the
 *    search index on 9 Nov 2026 because the PDF's text layer could not be extracted.
 *    Per night = the survey figure divided by 6.9, rounded to ¥10.
 *  - The cross-check is the Japan Tourism Agency's 2025 calendar-year prefecture table
 *    (インバウンド消費動向調査 【参考】都道府県別集計表, 表1-2, mlit.go.jp, read
 *    9 Nov 2026): Tokyo ¥157,319 per visitor, excluding transport between prefectures.
 *  - The saving and top tiers are built from published prices, not statistics: the
 *    chain-restaurant and hotel-restaurant menu prices and the Tokyo Combination Ticket
 *    that japan-travel-budget read on 27 Oct 2026, the Tokyo Subway Ticket (tokyometro.jp,
 *    9 Nov 2026), and the admissions in lib/attraction-prices.ts with their own dates.
 *  - No room rate is printed for the saving and top tiers. Tokyo's lodging-tax bands
 *    (tax.metro.tokyo.lg.jp, 27 Oct 2026) mark where they sit; the live rate is Klook's.
 *  - Airport fares from the operators as dated on tokyo-airport-transfer (25 Oct 2026).
 *  - No dollar figure, because the rate moves daily; no Klook price.
 */

const ROUTE = "/guides/money/tokyo-trip-cost";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-09");
const BUDGET_READ = checkedLabel("2026-10-27");
const AIRPORT = checkedLabel("2026-10-25");
const DECKS = checkedLabel("2026-11-06");
const SKY = checkedLabel(PRICES.shibuyaSky.checked);
const BORDERLESS = checkedLabel(PRICES.teamlabBorderless.checked);

const yen = (n: number) => `¥${Math.round(n).toLocaleString("en-US")}`;
const round10 = (n: number) => Math.round(n / 10) * 10;
const round100 = (n: number) => Math.round(n / 100) * 100;

// ── Tokyo Metropolitan Government, 2025 survey (per visitor, inside Tokyo) ─────────
const TMG_NIGHTS = 6.9;
const TMG_TOTAL = 199874;
const TMG_ROOM = 65199;
const TMG_FOOD = 41428;
const TMG_TRANSPORT = 17340;
const TMG_SHOPPING = 56970;
const perNight = (n: number) => round10(n / TMG_NIGHTS);
const AVG_ROOM = perNight(TMG_ROOM); // 9,450
const AVG_FOOD = perNight(TMG_FOOD); // 6,000
const AVG_TRANSPORT = perNight(TMG_TRANSPORT); // 2,510
const AVG_SHOPPING = perNight(TMG_SHOPPING); // 8,260
const AVG_CORE = AVG_ROOM + AVG_FOOD + AVG_TRANSPORT; // 17,960

// ── Japan Tourism Agency, 2025 prefecture table, Tokyo, all purposes ─────────────
const JTA_TOTAL = 157319;
const JTA_ROOM = 59644;
const JTA_FOOD = 31899;
const JTA_TRANSPORT = 4287;
const JTA_FUN = 5426;
const JTA_SHOPPING = 47590;

// ── Published prices ─────────────────────────────────────────────────────────
const SUBWAY_24 = 1000;
const SUBWAY_48 = 1500;
const SUBWAY_72 = 2000;
const SUBWAY_72_PER_DAY = Math.round(SUBWAY_72 / 3); // 667
const TOKYO_COMBINATION = 1720;
const ONIGIRI_HANDROLLED = 196.56;
const HIDAKAYA_RAMEN = 420;
const GYUDON_IN = 498;
const NADAMAN_LUNCH = 9000;
const NADAMAN_DINNER = 28000;
const KOURAKUEN_RAMEN = 490;

const TOWER = 1500; // Tokyo Tower Main Deck, PRICES.tokyoTower.adult
const SKY_EARLY = Number(PRICES.shibuyaSky.adult.split(" / ")[0].replace(/[^\d]/g, "")); // 2,700
const SKY_LATE = Number(PRICES.shibuyaSky.adult.split(" / ")[1].replace(/[^\d]/g, "")); // 3,400
const PLANETS_FROM = 3800; // PRICES.teamlabPlanets.adult, "from"

// Saving: two onigiri, a ¥420 chuka soba, a ¥498 beef bowl; 72-hour pass per day; free decks.
const SAVE_FOOD = round10(ONIGIRI_HANDROLLED * 2 + HIDAKAYA_RAMEN + GYUDON_IN); // 1,310
const SAVE_DAY = SAVE_FOOD + SUBWAY_72_PER_DAY; // 1,977

// Standard: the survey's average room, food and transport, plus one paid deck.
const MID_LOW = AVG_CORE + TOWER;
const MID_HIGH = AVG_CORE + SKY_LATE;

// Top: one hotel-restaurant course a day, the Combination Ticket, two timed tickets,
// and a room from the bottom of Tokyo's ¥200 lodging-tax band.
const TOP_FOOD_LOW = round10(ONIGIRI_HANDROLLED * 2 + NADAMAN_LUNCH); // 9,390
const TOP_FOOD_HIGH = round10(ONIGIRI_HANDROLLED * 2 + KOURAKUEN_RAMEN + NADAMAN_DINNER); // 28,880
const TOP_SIGHTS = PLANETS_FROM + SKY_LATE; // 7,200
const TOP_ROOM_FLOOR = 15200; // a ¥15,000 room plus ¥200 lodging tax
const TOP_DAY_LOW = TOP_FOOD_LOW + TOKYO_COMBINATION + TOP_SIGHTS + TOP_ROOM_FLOOR;

type TierRow = { item: string; save: string; mid: string; top: string; source: string };

const dailyRows: TierRow[] = [
  {
    item: "Room (per person, per night)",
    save: "Under ¥10,000, the band that pays no Tokyo lodging tax. Check room rates on Klook for your dates",
    mid: `${yen(AVG_ROOM)}: the 2025 average, ${yen(TMG_ROOM)} over ${TMG_NIGHTS} nights`,
    top: "¥15,000 and over, where Tokyo adds ¥200 a night of lodging tax. Check room rates on Klook for your dates",
    source: `Average: Tokyo Metropolitan Government 2025 survey, read ${OWN}. Bands: tax.metro.tokyo.lg.jp, ${BUDGET_READ}`,
  },
  {
    item: "Food and drink",
    save: `${yen(SAVE_FOOD)}: two 7-Eleven onigiri, a ¥420 Hidakaya chuka soba, a ¥498 Yoshinoya beef bowl`,
    mid: `${yen(AVG_FOOD)}: the 2025 average, ${yen(TMG_FOOD)} over ${TMG_NIGHTS} nights`,
    top: `${yen(TOP_FOOD_LOW)}–${yen(TOP_FOOD_HIGH)}: one Imperial Hotel Nadaman course, ¥9,000 at lunch or ¥28,000 at dinner`,
    source: `Average: the same survey. Menu prices: the chains' and imperialhotel.co.jp, read ${BUDGET_READ}`,
  },
  {
    item: "Getting around Tokyo",
    save: `${yen(SUBWAY_72_PER_DAY)}: the ¥2,000 72-hour Tokyo Subway Ticket spread over three days`,
    mid: `${yen(AVG_TRANSPORT)}: the 2025 average, ${yen(TMG_TRANSPORT)} over ${TMG_NIGHTS} nights`,
    top: `${yen(TOKYO_COMBINATION)}: the Tokyo Combination Ticket (Metro, Toei, JR, buses and trams in the 23 wards)`,
    source: `tokyometro.jp: the subway pass ${OWN}, the Combination Ticket ${BUDGET_READ}`,
  },
  {
    item: "Sightseeing",
    save: "¥0: the Tokyo Metropolitan Government Building decks, Senso-ji and Meiji Jingu charge nothing",
    mid: `${yen(TOWER)}–${yen(SKY_LATE)}: one deck, from Tokyo Tower's Main Deck to SHIBUYA SKY booked online from 15:00`,
    top: `${yen(TOP_SIGHTS)}: teamLab Planets (from ¥3,800) and SHIBUYA SKY at sunset (${yen(SKY_LATE)})`,
    source: `Operators via our price records: SHIBUYA SKY ${SKY}; Tokyo Tower, teamLab Planets ${DECKS}`,
  },
  {
    item: "Total per day",
    save: `About ${yen(round10(SAVE_DAY))} plus the room`,
    mid: `About ${yen(round100(MID_LOW))}–${yen(round100(MID_HIGH))}, room included`,
    top: `From about ${yen(round100(TOP_DAY_LOW))}, room included`,
    source: "The sum of the rows above. Shopping and flights are not included",
  },
];

const tripRows = [3, 5, 7].map((n) => ({
  length: `${n} days / ${n} nights`,
  save: `About ${yen(round100(SAVE_DAY * n))} plus ${n} nights of room`,
  mid: `About ${yen(round100(MID_LOW * n))}–${yen(round100(MID_HIGH * n))}`,
  top: `From about ${yen(round100(TOP_DAY_LOW * n))}`,
  pass: n === 3 ? "One 72-hour subway ticket covers it" : n === 5 ? "A 72-hour ticket plus IC fares, or a 48 + 72 hour pair" : "Two 72-hour tickets plus a day on an IC card",
}));

const surveyRows = [
  { item: "Accommodation", tmg: yen(TMG_ROOM), perNight: yen(AVG_ROOM), jta: yen(JTA_ROOM) },
  { item: "Food and drink", tmg: yen(TMG_FOOD), perNight: yen(AVG_FOOD), jta: yen(JTA_FOOD) },
  { item: "Transport inside Tokyo", tmg: yen(TMG_TRANSPORT), perNight: yen(AVG_TRANSPORT), jta: yen(JTA_TRANSPORT) },
  { item: "Shopping", tmg: yen(TMG_SHOPPING), perNight: yen(AVG_SHOPPING), jta: yen(JTA_SHOPPING) },
  { item: "Entertainment and services", tmg: "Not separated in the sources checked", perNight: "—", jta: yen(JTA_FUN) },
  { item: "Total spent in Tokyo", tmg: yen(TMG_TOTAL), perNight: yen(perNight(TMG_TOTAL)), jta: yen(JTA_TOTAL) },
];

const fixedRows = [
  { item: "Narita to the city: Keisei Skyliner", price: "¥2,580 one way (IC ¥2,567), 41 min to Keisei-Ueno", source: `Keisei, ${AIRPORT}` },
  { item: "Narita to the city: Narita Express (N'EX)", price: "¥3,140 to Tokyo; ¥3,330 to Shinagawa, Shibuya or Shinjuku", source: `JR East, ${AIRPORT}` },
  { item: "Narita to the city: Keisei Access Express", price: "¥1,280 to Nippori or Keisei-Ueno, the cheapest train", source: `Keisei, ${AIRPORT}` },
  { item: "Haneda to the city: Keikyu", price: "¥330 to Shinagawa (IC ¥327), 11 min from Terminal 3", source: `Keikyu, ${AIRPORT}` },
  { item: "Haneda to the city: limousine bus", price: "¥1,200 to Tokyo Station; ¥1,400 to Shinjuku", source: `Airport Limousine, ${AIRPORT}` },
  { item: "Tokyo Subway Ticket (visitors)", price: `${yen(SUBWAY_24)} / ${yen(SUBWAY_48)} / ${yen(SUBWAY_72)} for 24 / 48 / 72 hours; child half`, source: `tokyometro.jp, ${OWN}` },
  { item: "SHIBUYA SKY", price: `${PRICES.shibuyaSky.adult} online (before / from 15:00); ${PRICES.shibuyaSky.atDoor} at the counter`, source: `${PRICES.shibuyaSky.source}, ${SKY}` },
  { item: "TOKYO SKYTREE, Floor 350", price: `${PRICES.tokyoSkytree.adult} adult; same-day counter adds ¥500`, source: `tokyo-skytree.jp, ${DECKS}` },
  { item: "Tokyo Tower, Main Deck", price: `${PRICES.tokyoTower.adult} adult, same price at the door`, source: `tokyotower.co.jp, ${DECKS}` },
  { item: "teamLab Planets TOKYO", price: `${PRICES.teamlabPlanets.adult} adult, priced by date; timed slots only`, source: `teamlabplanets.dmm.com, ${DECKS}` },
  { item: "teamLab Borderless", price: `${PRICES.teamlabBorderless.adult} adult; ¥200 more bought on site`, source: `teamlab.art, ${BORDERLESS}` },
  { item: "Tokyo Metropolitan Government Building decks", price: "Free, no ticket", source: `metro.tokyo.lg.jp, ${DECKS}` },
  { item: "Tokyo lodging tax, per person per night", price: "¥0 under ¥10,000; ¥100 from ¥10,000; ¥200 from ¥15,000. A flat 3% from 1 April 2027, with stays under ¥13,000 untaxed", source: `tax.metro.tokyo.lg.jp, ${BUDGET_READ}` },
];

const savings = [
  {
    title: "Buy the subway pass, not single fares",
    desc: `The 72-hour Tokyo Subway Ticket is ${yen(SUBWAY_72)}. Tokyo Metro's IC fares start at ¥178, so the pass is ahead from the twelfth short ride, and it covers Toei lines too. It does not cover JR, including the Yamanote Line.`,
  },
  {
    title: "Take the train from the airport, not a taxi",
    desc: "Narita's flat-fare taxis start at ¥23,500 with tolls on top; the Keisei Access Express is ¥1,280 and the Skyliner ¥2,580. From Haneda, Keikyu is ¥330 to Shinagawa.",
  },
  {
    title: "Book the timed tickets online",
    desc: `SHIBUYA SKY is ¥300 cheaper online than at the counter, Skytree's same-day counter adds ¥500 a ticket, and teamLab Borderless costs ¥200 more on site. Figures as dated in the table above.`,
  },
  {
    title: "Keep the room under ¥10,000 a person",
    desc: "Below ¥10,000 per person per night Tokyo charges no lodging tax at all. The band is set by the rate per person, not per room, so sharing a room can move you into it.",
  },
  {
    title: "Use the free viewpoints",
    desc: "The Tokyo Metropolitan Government Building decks in Shinjuku are free and need no ticket. Senso-ji and Meiji Jingu charge no admission either.",
  },
];

const faqItems = [
  {
    q: "How much does a trip to Tokyo cost per day?",
    a: `About ${yen(round100(MID_LOW))}–${yen(round100(MID_HIGH))} per person per day for a standard trip, before flights and shopping: the room (${yen(AVG_ROOM)}), food (${yen(AVG_FOOD)}) and transport (${yen(AVG_TRANSPORT)}) that foreign visitors spent per night in Tokyo in 2025, on the Tokyo Metropolitan Government's survey, plus one paid observation deck. A saving trip is about ${yen(round10(SAVE_DAY))} a day plus the room; a top-end one is from about ${yen(round100(TOP_DAY_LOW))}.`,
  },
  {
    q: "How much is a 5-day trip to Tokyo?",
    a: `About ${yen(round100(MID_LOW * 5))}–${yen(round100(MID_HIGH * 5))} per person at the standard level, room included, before flights and shopping. Add the airport both ways: ¥5,160 on the Skyliner from Narita, or ¥660 on Keikyu from Haneda, on the operators' fares read ${AIRPORT}.`,
  },
  {
    q: "How much spending money do you need per day in Tokyo?",
    a: `Apart from the room: about ${yen(round10(SAVE_DAY))} a day on a tight budget, and about ${yen(round10(AVG_FOOD + AVG_TRANSPORT + TOWER))}–${yen(round10(AVG_FOOD + AVG_TRANSPORT + SKY_LATE))} at the 2025 average for food and transport plus one paid deck. Shopping averaged a further ${yen(AVG_SHOPPING)} a night. Not all of it needs to be cash; our guide to how much yen to bring covers the cash part.`,
  },
  {
    q: "How expensive is Tokyo for tourists in 2026?",
    a: `Less than its reputation on the daily lines. A subway ride is from ¥178, a chain bowl of chuka soba ¥420 and the Tokyo Metropolitan Government Building decks cost nothing. The room is the expensive line: it averaged ${yen(AVG_ROOM)} per person per night in 2025, ${Math.round((TMG_ROOM / TMG_TOTAL) * 100)}% of everything visitors spent in Tokyo, and the largest single category in the Tokyo Metropolitan Government's survey.`,
  },
  {
    q: "How much is a hotel in Tokyo per night?",
    a: `Foreign visitors spent an average of ${yen(TMG_ROOM)} on accommodation over ${TMG_NIGHTS} nights in Tokyo in 2025, about ${yen(AVG_ROOM)} per person per night (Tokyo Metropolitan Government survey). That is an average, not a rate: room prices change with the date and the district, so check room rates on Klook for your dates. Tokyo adds no lodging tax under ¥10,000 per person per night.`,
  },
  {
    q: "What should you pay for before you fly to Tokyo?",
    a: "The hotel first, because it is the largest line and the only one that moves with the date. Then the timed tickets you want (a SHIBUYA SKY sunset slot opens online at 00:00 Japan time two weeks ahead; teamLab Planets sells only timed slots), the airport train, the subway pass and an eSIM. There is no fixed sell-out date for rooms or slots, because it moves with the season and the weekday; check the listing for your date.",
  },
  {
    q: "How can you cut the cost of a Tokyo trip?",
    a: "Use the 72-hour Tokyo Subway Ticket (¥2,000) instead of single fares, take the train rather than a taxi from the airport, book SHIBUYA SKY and Skytree online, keep the room under ¥10,000 a person to avoid the lodging tax, and use the free Tokyo Metropolitan Government Building decks.",
  },
  {
    q: "How much does a Tokyo trip cost with children?",
    a: `Less per child on the fixed lines: the Tokyo Subway Ticket is half price for a child (¥500 / ¥750 / ¥1,000), Tokyo Tower's Main Deck is ${PRICES.tokyoTower.child} for a child and teamLab Planets ${PRICES.teamlabPlanets.child}. The official sources checked do not give a per-child figure for food or rooms, so price the room for the whole family on your dates.`,
  },
];

// Title and H1 are one string, so the result has nothing else to rewrite it from.
const TITLE = "Tokyo Trip Cost (2026): Daily Budget for 3, 5 & 7 Days";
const DESCRIPTION =
  `Tokyo trip cost 2026: about ${yen(round100(MID_LOW))}–${yen(round100(MID_HIGH))} a day per person standard, ` +
  `${yen(round10(SAVE_DAY))} plus the room on a budget, from ${yen(round100(TOP_DAY_LOW))} top end. Book Tokyo hotels on Klook.`;

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function TokyoTripCostPage({ updated }: { updated: PageUpdated }) {
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
              mainEntity: faqItems.slice(0, 5).map((item) => ({
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
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Trip to Tokyo Cost", item: URL },
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Trip to Tokyo Cost</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {TITLE}
          </h1>
          <p className={styles.heroSubtitle}>
            What visitors actually spent in Tokyo in 2025, on the city government&apos;s own survey, next to the
            published fares and ticket prices you pay on arrival.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Government survey, 2025", "Official fares, dated", "3, 5 and 7-day totals"].map((t) => (
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

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Saving, per day</p>
                <p className={styles.verdictStatValue}>~{yen(round10(SAVE_DAY))} + room</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Standard, per day</p>
                <p className={styles.verdictStatValue}>{yen(round100(MID_LOW))}–{yen(round100(MID_HIGH))}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Top end, per day</p>
                <p className={styles.verdictStatValue}>From {yen(round100(TOP_DAY_LOW))}</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Tokyo trip costs about {yen(round100(MID_LOW))}–{yen(round100(MID_HIGH))} per person per
              day</strong> at a standard level, room included, excluding flights and shopping. On a tight budget it is
              about <strong>{yen(round10(SAVE_DAY))} a day plus the room</strong>, and at the top end from about{" "}
              <strong>{yen(round100(TOP_DAY_LOW))} a day</strong>, room included. At the standard level, 3 days is about{" "}
              {yen(round100(MID_LOW * 3))}–{yen(round100(MID_HIGH * 3))}, 5 days about{" "}
              {yen(round100(MID_LOW * 5))}–{yen(round100(MID_HIGH * 5))} and 7 days about{" "}
              {yen(round100(MID_LOW * 7))}–{yen(round100(MID_HIGH * 7))}. The standard day is a {yen(AVG_ROOM)} room,{" "}
              {yen(AVG_FOOD)} of food and {yen(AVG_TRANSPORT)} of transport (the 2025 per-night average for foreign
              visitors to Tokyo, on the Tokyo Metropolitan Government&apos;s survey, read {OWN}) plus one paid
              observation deck.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={whereToStayTokyoAreas[1].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo hotel prices →
              </KlookLink>
              <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Tokyo Subway Ticket →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Klook, all four bands, above the first H2 for a reader who has the number. */}
        <KlookTripPrep
          label="Budget set? Book these first"
          heading="The Lines You Can Pay for Before You Fly"
          intro="The room, the subway pass, the airport leg and data. Klook prices change by date, so open each listing for the figure on your dates."
          items={tokyoTripCostTopPrep}
          adPlacement="budget-top"
          headingLevel={3}
        />

        <EsimCtaTop />

        {/* Scope */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What this page covers</span>
          <h2 className={styles.sectionTitle}>Tokyo Only, Not the Whole of Japan</h2>
          <p className={styles.bodyText}>
            This page prices a stay in Tokyo: the room, food, the subway and the sights inside the city, and the
            airport at either end. Long-distance rail (a shinkansen to Kyoto, a JR Pass) is not in it; our{" "}
            <Link href="/guides/money/japan-travel-budget">Japan travel budget</Link> covers a trip across several
            cities and when the JR Pass pays off. How much of the daily money to carry as cash is in{" "}
            <Link href="/guides/money/how-much-yen-to-bring-japan">how much yen to bring to Japan</Link>.
          </p>
        </section>

        {/* Per-day table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Per day, by category</span>
          <h2 className={styles.sectionTitle}>How Much Does a Trip to Tokyo Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About <strong>{yen(round10(AVG_CORE))} per person per night</strong> on the room, food and transport
            alone, if you spend what the average foreign visitor spent in Tokyo in 2025. Three tiers, per person,
            per day:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Saving", "Standard (2025 average)", "Top end", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dailyRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.save}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.mid}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.top}</td>
                      <td style={{ fontSize: "0.8rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The standard column divides the Tokyo Metropolitan Government&apos;s 2025 per-visitor figures by the
            survey&apos;s average of {TMG_NIGHTS} nights in Tokyo, rounded to ¥10. The saving and top-end columns use
            published prices instead, because the survey gives only an average. No room rate is printed for those
            two columns: the bands come from Tokyo&apos;s lodging tax, and the live rate depends on your dates. The
            top-end total counts a room at the bottom of the ¥200 band (¥15,000 plus tax).
          </p>
        </section>

        {/* Trip totals */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Trip totals</span>
          <h2 className={styles.sectionTitle}>How Much Is a 5-Day Trip to Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About <strong>{yen(round100(MID_LOW * 5))}–{yen(round100(MID_HIGH * 5))} per person</strong> at the
            standard level, room included, before flights and shopping. Three days is about{" "}
            {yen(round100(MID_LOW * 3))}–{yen(round100(MID_HIGH * 3))} and a week about{" "}
            {yen(round100(MID_LOW * 7))}–{yen(round100(MID_HIGH * 7))}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip length", "Saving", "Standard", "Top end", "Subway pass that fits"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tripRows.map((row) => (
                    <tr key={row.length}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.save}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.mid}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.top}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Per person, one night counted per day, from the per-day table above. Add the airport both ways from the
            fixed-cost table further down: ¥5,160 on the Skyliner from Narita, or ¥660 on Keikyu from Haneda. No
            dollar figure is printed, because the exchange rate moves daily.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For the days themselves, our{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5 day Tokyo itinerary</Link> and{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> show which tickets
            each day needs.
          </p>
        </section>

        {/* Spending money */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Spending money</span>
          <h2 className={styles.sectionTitle}>How Much Spending Money Do You Need per Day in Tokyo?</h2>
          <p className={styles.bodyText}>
            Apart from the room, about <strong>{yen(round10(SAVE_DAY))} a day</strong> on a tight budget and about{" "}
            <strong>
              {yen(round10(AVG_FOOD + AVG_TRANSPORT + TOWER))}–{yen(round10(AVG_FOOD + AVG_TRANSPORT + SKY_LATE))}
            </strong>{" "}
            at the 2025 average: {yen(AVG_FOOD)} of food, {yen(AVG_TRANSPORT)} of transport and one paid deck. Shopping
            is the line people forget: the same survey puts it at {yen(TMG_SHOPPING)} per visitor, about{" "}
            {yen(AVG_SHOPPING)} a night.
          </p>
          <p className={styles.bodyText}>
            Most of that can go on a card, and the subway pass and timed tickets can be paid before you fly. The
            part that has to be cash (some temples, market stalls, coin lockers) is smaller; our{" "}
            <Link href="/guides/money/how-much-yen-to-bring-japan">how much yen to bring guide</Link> sizes it, and
            our <Link href="/guides/money/currency-exchange-japan">currency exchange guide</Link> compares the
            airport counters, city bureaux and ATMs for getting that cash. Which machines take a foreign card,
            from 7-Eleven to Japan Post Bank, is in our{" "}
            <Link href="/guides/money/atms-in-japan">ATMs in Japan guide</Link>.
          </p>
          <p className={styles.bodyText}>
            Nothing needs adding on top for tips: JNTO says restaurants, taxis and hotels in Japan do not expect
            one. What can appear instead, such as an izakaya&apos;s seating charge, is in our guide to{" "}
            <Link href="/guides/money/tipping-in-japan">tipping in Japan</Link>.
          </p>
        </section>

        {/* Survey */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What visitors spend</span>
          <h2 className={styles.sectionTitle}>What Did Visitors Actually Spend in Tokyo in 2025?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>{yen(TMG_TOTAL)} per visitor</strong>, on the Tokyo Metropolitan Government&apos;s survey of
            16,008 foreign visitors who left from Haneda and Narita in January–December 2025, up 9.6% on 2024. The
            Japan Tourism Agency&apos;s national survey, counted differently, puts Tokyo at {yen(JTA_TOTAL)}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Category", "Tokyo Metropolitan Government, per visitor", `Per night (÷ ${TMG_NIGHTS})`, "Japan Tourism Agency, per visitor"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {surveyRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.tmg}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.perNight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.jta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tokyo Metropolitan Government: 令和7年 国・地域別外国人旅行者行動特性調査 (published 30 June 2026), spending
            inside Tokyo, average {TMG_NIGHTS} nights in Tokyo; read on metro.tokyo.lg.jp {OWN}. Japan Tourism Agency:
            インバウンド消費動向調査, 2025 calendar year, prefecture table 1-2 (all purposes), which excludes transport
            between prefectures and gives no nights figure, so no per-night column is derived from it; read on
            mlit.go.jp {OWN}. Its &ldquo;Total&rdquo; also includes a package-tour line not shown here.
          </p>
        </section>

        {/* Expensive? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Is it expensive?</span>
          <h2 className={styles.sectionTitle}>Is Tokyo Expensive for Tourists in 2026?</h2>
          <p className={styles.bodyText}>
            On the daily lines, less than its reputation: a subway ride from ¥178 on an IC card, a chain bowl of chuka
            soba for ¥420, and a 202-metre deck in Shinjuku that costs nothing. The expensive line is the room. It was{" "}
            <strong>{Math.round((TMG_ROOM / TMG_TOTAL) * 100)}% of everything foreign visitors spent in Tokyo</strong>{" "}
            in 2025 and the largest category in the survey, up 12.9% on 2024 (¥57,747 to {yen(TMG_ROOM)}). The two
            things that move a Tokyo budget most are therefore the dates you book and the area you sleep in.
          </p>
        </section>

        {/* Fixed costs */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fixed costs</span>
          <h2 className={styles.sectionTitle}>What Are the Fixed Costs of a Tokyo Trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            These are published prices, the same for every traveller, so they can be fixed before you fly. Each
            figure carries the date it was read off the operator&apos;s site.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "Official price", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fixedRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change; confirm with each operator. No Klook price appears on this page, because Klook prices
            change by date. Every airport route is compared in our{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Keisei Skyliner (Narita) →
            </KlookLink>
            <KlookLink href={hanedaLimousineBus.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Haneda limousine bus →
            </KlookLink>
            <KlookLink href={shibuyaSkyTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              SHIBUYA SKY ticket →
            </KlookLink>
            <KlookLink href={teamlabPlanetsTicketUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              teamLab Planets ticket →
            </KlookLink>
          </div>
        </section>

        {/* Hotel */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The room</span>
          <h2 className={styles.sectionTitle}>How Much Is a Hotel in Tokyo per Night?</h2>
          <p className={styles.bodyText}>
            On average, about <strong>{yen(AVG_ROOM)} per person per night</strong>: foreign visitors spent{" "}
            {yen(TMG_ROOM)} on accommodation over {TMG_NIGHTS} nights in Tokyo in 2025. That is an average across
            hostels and luxury hotels, not a rate you can book. Room prices change with the date and the district,
            so check room rates on Klook for your dates. Below ¥10,000 per person per night, Tokyo charges no
            lodging tax; ¥100 is added from ¥10,000 and ¥200 from ¥15,000 (tax.metro.tokyo.lg.jp, {BUDGET_READ}).
          </p>
          <p className={styles.bodyText}>
            Which area to search decides more than the price: our{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo guide</Link> compares the
            five bases by line and airport.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for Five Tokyo Bases"
          intro="Room prices change by date, so each area links to Klook's hotel search for it. Search with your own dates for the figure."
          areas={whereToStayTokyoAreas}
        />

        {/* Cut the cost */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Saving</span>
          <h2 className={styles.sectionTitle}>How Can You Cut the Cost of a Tokyo Trip?</h2>
          <p className={styles.bodyText}>
            Five savings with a published number on both sides:
          </p>
          <div className={styles.whoForGrid}>
            {savings.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Before you fly */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you fly</span>
          <h2 className={styles.sectionTitle}>What Should You Pay for Before You Fly?</h2>
          <p className={styles.bodyText}>
            The hotel first, because it is the largest line and the only one that moves with the date. Then any
            timed ticket you want: a SHIBUYA SKY sunset slot opens online at 00:00 Japan time two weeks ahead, and
            teamLab Planets sells only timed slots with nothing at the door. The airport train, the subway pass and
            an eSIM can all be bought ahead and collected or activated on arrival. There is no fixed sell-out date
            for rooms or slots, because it moves with the season and the weekday; check the listing for your date.
          </p>
        </section>

        <KlookTripPrep
          label="Fix these before you fly"
          heading="Book the Fixed Lines of a Tokyo Budget Now"
          intro="The room, the subway pass, the airport leg, one guided day and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoTripCostPrep}
        />

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>How Much Does a Tokyo Trip Cost with Children?</h2>
          <p className={styles.bodyText}>
            Less per child on the fixed lines. The Tokyo Subway Ticket is half price for a child (¥500 / ¥750 /
            ¥1,000), Tokyo Tower&apos;s Main Deck is {PRICES.tokyoTower.child}, Skytree {PRICES.tokyoSkytree.child} and
            teamLab Planets {PRICES.teamlabPlanets.child} (dated in the table above). The official sources checked do
            not give a per-child figure for food or rooms, so price the room for the whole family on your dates.
          </p>
        </section>

        <EsimCtaBottom />

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
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
          </p>
        </section>

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/money/japan-travel-budget", title: "Japan Travel Budget 2026: Cost per Day, Rail and the JR Pass" },
              { href: "/guides/money/how-much-yen-to-bring-japan", title: "How Much Yen to Bring to Japan 2026: Cash per Day" },
              { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary (2026): What to Book, and in What Order" },
              { href: "/guides/attractions/tokyo-5-day-itinerary", title: "Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day" },
              { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas, Compared by Line and Airport" },
              { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?" },
              { href: "/guides/money", title: "More Money & Payment Guides →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
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

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>The room decides a Tokyo budget</h2>
            <p className={styles.ctaBannerDesc}>
              Price the hotel on your own dates first, then fix the subway pass and the airport leg. Everything else
              is a daily line you control on the ground.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={whereToStayTokyoAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Hotels in Shinjuku →
              </KlookLink>
              <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Day Tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
