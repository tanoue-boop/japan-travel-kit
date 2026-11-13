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
  hokurikuArchPass,
  kanazawaGeishaKenrokuenCastleDayTour,
  kanazawaHotels,
  kanazawaKenrokuenHigashiChayaDayTour,
  kanazawaTwoDayStayAreas,
  kanazawaTwoDayTripPrep,
  klookEsim,
  shinkansenTokyoKanazawa,
  shirakawagoGokayamaKanazawaBusTour,
  shirakawagoKanazawaDayTour,
  shirakawagoTakayamaKanazawaDayTour,
  vasaraKimonoKanazawa,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Two days in Kanazawa with a Shirakawa-go day, written as a routing-and-booking
 * plan. Added 13 Nov 2026 (task-jtk-20261113-01).
 *
 * Next to its neighbours:
 *  - takayama-shirakawago-tour answers "which Shirakawa-go tour, from where";
 *  - tokyo-to-kanazawa answers "which train, what it costs";
 *  - hokuriku-arch-pass answers "is the pass worth it";
 *  - this page answers "how to spend two days in Kanazawa, and what to book for each".
 *
 * Official reads on 13 Nov 2026:
 *   shiro-niwa.pref.ishikawa.lg.jp   Kenroku-en ¥320 adult (18+), ¥100 ages 6–17, 65+ free
 *     /kenrokuen-garden/info.html    with ID; 8:00–17:00 (last entry 16:30) 16 Oct–end Feb,
 *                                    7:00–18:00 (last 17:30) 1 Mar–15 Oct; free early
 *                                    entry from 6:00 Nov–Feb (last entry 7:30, Renchimon
 *                                    and Zuishinzaka gates only, leave 15 min before paid
 *                                    opening); Kenroku-en +1 combined ticket ¥500
 *   .../kanazawa-castle/info/open.php  Castle park free; 8:00–17:00 16 Oct–end Feb,
 *                                    7:00–18:00 1 Mar–15 Oct; early opening 6:00 Nov–Feb
 *   .../kanazawa-castle/info/fee.php Hishi Yagura, Gojikken Nagaya, Hashizume-mon ¥320 /
 *                                    ¥100, 9:00–16:30 (last 16:00); Gyokusen-an matcha ¥1,000
 *   kanazawa21.jp                    "From Today to Tomorrow", 31 Oct 2026–18 Apr 2027:
 *                                    ¥1,200 (web ¥1,000), university ¥800, school ¥400
 *                                    (web ¥300), 65+ ¥1,000; 10:00–18:00, Fri–Sat to 20:00;
 *                                    long closure 6 May 2027 – March 2028 (planned)
 *   hokutetsu.co.jp /highway-bus/    Kanazawa Station West Exit ⇄ Shirakawa-go ¥2,800 adult,
 *     shirakawa/ and /takayama/      ¥1,400 child, 1h15m; Takayama ¥4,200 / ¥2,100, 2h15m;
 *                                    seat-reserved (座席指定制), sale from one month before;
 *                                    timetable dated 1 Apr 2025
 *   hokutetsu.co.jp /tourism-bus/    Kanazawa loop bus from East Exit stop 7, right loop about
 *     castle-town/                   every 15 min 8:30–18:00, left loop about every 20 min
 *                                    8:38–17:58; ¥220 / ¥110 a ride (revised 1 Apr 2026)
 *   hokutetsu.co.jp /ticket/         One-day pass ¥800 / ¥400, not sold on the bus
 *     kanazawa-oneday/
 *   hokutetsu.co.jp /news/           Light-up bus 2027: Kanazawa 14:30 → Shirakawa-go
 *     shirakawago-lightup2027/       16:30–19:50 → Kanazawa 21:50, ¥18,500 adult, ¥16,500
 *                                    child, return bus and observation-deck ticket included
 *   shirakawa-go.gr.jp/events/441/   41st light-up: 11, 17, 24, 31 January 2027,
 *                                    17:30–19:30, full advance reservation, no tickets on
 *                                    the day; gate from 15:30; −10°C to 0°C, icy roads
 *
 * Carried with their own dates: the Tokyo–Kanazawa ¥14,400 eTicket fare and the Hokuriku
 * Arch Pass ¥35,000 (JR West, 11 Nov 2026, read for tokyo-to-kanazawa), the 2h28m
 * fastest time (JR West, 27 Oct 2026), and Nohi Bus's ¥2,900 Kanazawa–Shirakawa-go
 * fare from 1 December 2026 (nouhibus.co.jp, 6 Nov 2026, read for takayama-shirakawago-tour).
 *
 * Not printed: Omicho Market's hours (no single official figure for the stalls), the
 * teahouse prices in Higashi Chaya, Shirakawa-go house admissions, and any Klook price.
 */

const ROUTE = "/guides/attractions/kanazawa-2-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-13");
const RAIL = checkedLabel("2026-11-11");
const RAIL_TIME = checkedLabel("2026-10-27");
const NOHI = checkedLabel("2026-11-06");

const KENROKUEN = "¥320";
const CASTLE_TURRETS = "¥320";
const MUSEUM = "¥1,200";
const BUS_SHIRAKAWA = "¥2,800";
const LOOP_RIDE = "¥220";
const LOOP_DAY = "¥800";
const SHINKANSEN = "¥14,400";
const ARCH_PASS = "¥35,000";

type Row = { day: string; area: string; sights: string; move: string; book: string };

/** Table 1: the two days at a glance — first row is the answer. */
const overviewRows: Row[] = [
  {
    day: "Day 1",
    area: "Central Kanazawa",
    sights: "Omicho Market, Higashi Chaya district, Kenroku-en, Kanazawa Castle Park, 21st Century Museum",
    move: "Loop bus from Kanazawa Station and on foot",
    book: "Hotel; kimono rental if you want one",
  },
  {
    day: "Day 2",
    area: "Shirakawa-go (+ Takayama)",
    sights: "The Ogimachi gassho-zukuri village and observation deck; Takayama old town on a tour",
    move: "Reserved bus, 1h15m each way, or a guided bus tour",
    book: "Bus seat or tour — both must be booked",
  },
];

type Stop = { time: string; place: string; allow: string; getting: string; booking: string };

const day1: Stop[] = [
  {
    time: "Early morning",
    place: "Kenroku-en free early entry (Nov–Feb from 6:00, last entry 7:30) — or Omicho Market for breakfast",
    allow: "45 min–1 hour",
    getting: "Loop bus or taxi; early entry only by the Renchimon and Zuishinzaka gates",
    booking: "No. Early visitors leave 15 minutes before the paid opening",
  },
  {
    time: "Morning",
    place: "Kenroku-en Garden (paid hours)",
    allow: "1–1.5 hours",
    getting: "Loop bus to Kenrokuen-shita / Kanazawa-jo, 18 minutes on the right loop",
    booking: `No — ${KENROKUEN} at the gate, cash, card or IC card`,
  },
  {
    time: "Late morning",
    place: "Kanazawa Castle Park via Ishikawa-mon; the rebuilt Hishi Yagura and Gojikken Nagaya",
    allow: "1 hour",
    getting: "On foot across the road from Kenroku-en",
    booking: `No — the park is free; the turrets are ${CASTLE_TURRETS}`,
  },
  {
    time: "Midday",
    place: "Lunch at Omicho Market",
    allow: "1 hour",
    getting: "Loop bus to Musashigatsuji / Omi-cho Market",
    booking: "No",
  },
  {
    time: "Afternoon",
    place: "21st Century Museum of Contemporary Art (closed Mondays)",
    allow: "1–1.5 hours",
    getting: "Loop bus to Hirosaka / 21st Century Museum",
    booking: "Optional web ticket, ¥200 cheaper for an adult",
  },
  {
    time: "Late afternoon",
    place: "Higashi Chaya district — the teahouse street, at its quietest after the day buses",
    allow: "1–1.5 hours",
    getting: "Loop bus to Hashiba-cho, 12 minutes from the station on the right loop",
    booking: "No; a teahouse visit is booked with the house",
  },
];

const day2: Stop[] = [
  {
    time: "8:00–9:40",
    place: "Reserved bus from Kanazawa Station West Exit (stop 4)",
    allow: "1h15m",
    getting: "Hokutetsu, Nohi or Meitetsu highway bus; first bus 8:00, arriving 9:15",
    booking: "Yes — every seat is reserved; sales open one month before",
  },
  {
    time: "Morning",
    place: "Ogimachi village: the gassho-zukuri houses and the Wada house",
    allow: "2–3 hours (the tourist association's own guide figure)",
    getting: "On foot from the Shirakawa-go bus terminal",
    booking: "No",
  },
  {
    time: "Late morning",
    place: "Ogimachi Castle Ruins observation deck",
    allow: "45 minutes",
    getting: "Walk 15–20 minutes from behind the Wada house, or the shuttle bus",
    booking: "No (except on light-up nights)",
  },
  {
    time: "Afternoon",
    place: "Back to Kanazawa — or on to Takayama (about 50 minutes by Nohi Bus)",
    allow: "1h15m to Kanazawa",
    getting: "Buses back from 8:50 to 17:55 (the last arrives 19:10)",
    booking: "Yes — book the return seat with the outbound one",
  },
  {
    time: "Evening",
    place: "Dinner near Kanazawa Station, or a night in Takayama",
    allow: "—",
    getting: "On foot",
    booking: "Takayama hotel if you go on",
  },
];

/** Table 2: getting there and around. */
const transportRows = [
  {
    route: "Tokyo → Kanazawa, Hokuriku Shinkansen",
    time: "2h28m at the fastest (Kagayaki)",
    fare: `${SHINKANSEN} reserved Ordinary, regular season (JR West eTicket)`,
    book: "Kagayaki is all-reserved; seats on sale 10:00 one month before",
    source: `JR West, fare ${RAIL}, time ${RAIL_TIME}`,
  },
  {
    route: "Kanazawa Station West Exit → Shirakawa-go, highway bus",
    time: "1h15m",
    fare: `${BUS_SHIRAKAWA} adult, ¥1,400 child one way on Hokutetsu's page. Nohi Bus's table shows ¥2,900 adult from 1 December 2026`,
    book: "Seat-reserved — book before boarding, from one month ahead",
    source: `hokutetsu.co.jp ${OWN}; nouhibus.co.jp ${NOHI}`,
  },
  {
    route: "Kanazawa → Takayama (via Shirakawa-go), highway bus",
    time: "2h15m",
    fare: "¥4,200 adult, ¥2,100 child on Hokutetsu's page (Nohi Bus: ¥4,400 adult from 1 December 2026)",
    book: "Seat-reserved",
    source: `hokutetsu.co.jp ${OWN}; nouhibus.co.jp ${NOHI}`,
  },
  {
    route: "Kanazawa loop bus (城下まち金沢周遊バス)",
    time: "Station → Higashi Chaya 12 min, → Kenroku-en 18 min (right loop)",
    fare: `${LOOP_RIDE} adult, ¥110 child a ride; one-day pass ${LOOP_DAY} / ¥400`,
    book: "No. Right loop about every 15 min 8:30–18:00, left loop about every 20 min. The day pass is not sold on board",
    source: `hokutetsu.co.jp, ${OWN}`,
  },
];

/** Table 3: admissions. */
const ticketRows = [
  {
    stop: "Kenroku-en Garden",
    price: `${KENROKUEN} adult (18+), ¥100 ages 6–17; 65+ free with ID`,
    hours: "8:00–17:00 (16 Oct–end Feb), 7:00–18:00 (1 Mar–15 Oct); last entry 30 min before",
    note: "Free early entry from 6:00 in Nov–Feb. Kenroku-en +1 combined ticket ¥500",
  },
  {
    stop: "Kanazawa Castle Park",
    price: "Free park; Hishi Yagura, Gojikken Nagaya and Hashizume-mon ¥320 adult, ¥100 ages 6–17",
    hours: "Park 8:00–17:00 (16 Oct–end Feb); turrets 9:00–16:30, last entry 16:00",
    note: "Gyokusen-an tea house: matcha with a sweet ¥1,000",
  },
  {
    stop: "21st Century Museum of Contemporary Art",
    price: `${MUSEUM} adult (web ¥1,000), university ¥800, school ages ¥400 (web ¥300), 65+ ¥1,000`,
    hours: "10:00–18:00, Fri–Sat to 20:00; closed Mondays",
    note: "Current special exhibition runs to 18 April 2027. The museum plans to close from 6 May 2027 to March 2028",
  },
];

/** Table 4: when to book. */
const bookingRows = [
  {
    what: "Shirakawa-go bus seats (both ways)",
    when: "One month before the day — the earliest the operator sells",
    why: "Every seat on the Kanazawa–Shirakawa-go buses is reserved; no seat, no ride",
  },
  {
    what: "Shirakawa-go winter light-up (11, 17, 24, 31 Jan 2027)",
    when: "Already on sale — route-bus tours opened 13 Oct to 2 Nov 2026",
    why: "Full advance reservation, no tickets on the day, and the gate closes to non-ticket holders from 15:30",
  },
  {
    what: "Tokyo–Kanazawa shinkansen",
    when: "From 10:00 one month before",
    why: "The Kagayaki has no non-reserved cars",
  },
  {
    what: "Kanazawa hotel",
    when: "With the bus seats",
    why: "Near the station makes the Day 2 start a walk",
  },
  {
    what: "Shirakawa-go tour from Kanazawa",
    when: "As soon as the date is fixed",
    why: "Dates are sold per departure; check the cancellation terms on the listing for snow before you pay",
  },
];

const faqItems = [
  {
    q: "Is 2 days in Kanazawa enough?",
    a: `Yes, for the city and one day trip. Day 1 covers Kenroku-en (${KENROKUEN}), Kanazawa Castle Park (free), Omicho Market, the 21st Century Museum and Higashi Chaya by loop bus. Day 2 is Shirakawa-go, 1h15m away by reserved bus. Prices read on official sites ${OWN}.`,
  },
  {
    q: "Can I visit Shirakawa-go as a day trip from Kanazawa?",
    a: `Yes. Reserved buses leave Kanazawa Station West Exit from 8:00 and take 1h15m; the fare is ${BUS_SHIRAKAWA} one way on Hokutetsu's page (${OWN}), and Nohi Bus lists ¥2,900 from 1 December 2026. The last bus back leaves Shirakawa-go at 17:55. Book both seats as soon as sales open, one month ahead.`,
  },
  {
    q: "Can I see Shirakawa-go and Takayama in one day from Kanazawa?",
    a: "Yes, but by public bus it is three reserved legs and a tight day. The simpler way is a join-in tour from Kanazawa that covers both, with an English-speaking guide, listed at 8 to 10 hours; one listing lets you finish in Takayama instead of returning.",
  },
  {
    q: "Is the Hokuriku Arch Pass worth it for Kanazawa?",
    a: `Only if Kanazawa sits between Tokyo and Kyoto or Osaka on one trip. The pass is ${ARCH_PASS} for 7 days and does not cover the Tokaido Shinkansen. A Tokyo–Kanazawa reserved eTicket is ${SHINKANSEN} one way, so a simple Tokyo–Kanazawa return is cheaper as tickets. Read on JR West ${RAIL}.`,
  },
  {
    q: "Do I need to book the Shirakawa-go light-up?",
    a: "Yes. The 2027 light-up runs on 11, 17, 24 and 31 January, 17:30–19:30, and is full advance reservation only — no tickets are sold on the day, and from 15:30 people without a ticket cannot enter the village. Hokutetsu's light-up bus from Kanazawa is ¥18,500 adult including the return bus and an observation-deck ticket.",
  },
  {
    q: "What should I wear in Kanazawa and Shirakawa-go in winter?",
    a: "Warm, waterproof layers. The Shirakawa-go Tourist Association says light-up evenings run between −10°C and 0°C with frozen roads, and recommends a warm coat, waterproof insulated boots, ice spikes and a flashlight. Kenroku-en's paths are gravel and can be slippery.",
  },
  {
    q: "How do I get around Kanazawa?",
    a: `By the loop bus from Kanazawa Station East Exit, stop 7. It is ${LOOP_RIDE} a ride, or ${LOOP_DAY} for a one-day pass that also covers city buses in the central area. The pass is sold at Hokutetsu counters and some hotels, not on the bus.`,
  },
  {
    q: "Is the 21st Century Museum open?",
    a: "Yes until spring 2027. The current exhibition runs to 18 April 2027, and the museum plans a long closure from 6 May 2027 to March 2028. It is closed on Mondays.",
  },
];

const TITLE = "Kanazawa 2 Day Itinerary (2026): Kanazawa and Shirakawa-go";
const DESCRIPTION =
  "Kanazawa 2 day itinerary: Kenroku-en, the castle and Higashi Chaya on Day 1, Shirakawa-go by 1h15m bus on Day 2. 2 days in Kanazawa and Shirakawa-go.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function Kanazawa2DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kanazawa 2 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Kanazawa 2 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kanazawa 2 Day Itinerary (2026):<br />2 Days in Kanazawa and Shirakawa-go
          </h1>
          <p className={styles.heroSubtitle}>
            One day for the garden, the castle and the teahouse streets; one day for the gassho-zukuri village.
            The reserved bus seat is the part that decides whether Day 2 happens.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & hours, dated", "A table for each day", "Winter light-up rules"].map((t) => (
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 1</p>
                <p className={styles.verdictStatValue}>Kenroku-en, castle, Omicho, Higashi Chaya</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Shirakawa-go (+ Takayama on a tour)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>To Shirakawa-go</p>
                <p className={styles.verdictStatValue}>Reserved bus 1h15m, {BUS_SHIRAKAWA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>Hokuriku Shinkansen, 2h28m fastest</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Kanazawa 2 day itinerary</strong> works as one day in the city and one day out. On{" "}
              <strong>Day 1</strong>, ride the loop bus and walk Kenroku-en (<strong>{KENROKUEN}</strong>), Kanazawa
              Castle Park (free), Omicho Market, the 21st Century Museum and the Higashi Chaya district. On{" "}
              <strong>Day 2</strong>, take the reserved bus to <strong>Shirakawa-go</strong> — about{" "}
              <strong>1 hour 15 minutes</strong> from Kanazawa Station, <strong>{BUS_SHIRAKAWA}</strong> one way — or
              a guided tour that adds Takayama. From Tokyo, the Hokuriku Shinkansen takes{" "}
              <strong>2h28m</strong> at the fastest. Garden and bus figures read on the operators&apos; sites {OWN};
              train time {RAIL_TIME}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Shirakawa-go &amp; Takayama Tour →
              </KlookLink>
              <KlookLink href={kanazawaHotels.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kanazawa Hotels →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Should I Spend 2 Days in Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            City first, village second. Day 1 needs no booking and fits around your train in; Day 2 runs on a
            reserved bus or a tour, so it goes on the day you can fix a month ahead. Our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour guide</Link>{" "}
            compares the tours from Kanazawa, Nagoya and Takayama; this page is about fitting Shirakawa-go into two
            days in Kanazawa.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Area", "What to see", "Getting around", "What to book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {overviewRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={thStyle}>{row.day}</td>
                      <td style={thStyle}>{row.area}</td>
                      <td style={thStyle}>{row.sights}</td>
                      <td style={thStyle}>{row.move}</td>
                      <td style={thStyle}>{row.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}: shiro-niwa.pref.ishikawa.lg.jp (Kenroku-en and Kanazawa Castle), hokutetsu.co.jp
            (buses), kanazawa21.jp.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>What Should I Do on Day 1 in Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Kenroku-en and the castle in the morning, Omicho for lunch, the museum and Higashi Chaya in the
            afternoon. Everything is on the loop bus, which leaves Kanazawa Station East Exit (stop 7) about every
            15 minutes on the right loop.
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
                      <td className={styles.tdProvider} style={thStyle}>{row.time}</td>
                      <td style={thStyle}>{row.place}</td>
                      <td style={thStyle}>{row.allow}</td>
                      <td style={thStyle}>{row.getting}</td>
                      <td style={thStyle}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Loop bus times from hokutetsu.co.jp, garden hours from shiro-niwa.pref.ishikawa.lg.jp, both {OWN}.
            &ldquo;Time to allow&rdquo; is a planning allowance, not an official figure.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>What to book for Day 1.</strong> Nothing is required. A kimono rental near the castle turns the
            garden and the teahouse street into the photos most people come for, and a guided day covers the same
            three places with someone explaining them.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={vasaraKimonoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kimono rental in Kanazawa →
            </KlookLink>
            <KlookLink href={kanazawaGeishaKenrokuenCastleDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Guided Kanazawa day →
            </KlookLink>
            <KlookLink href={kanazawaKenrokuenHigashiChayaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Bus day with temarizushi →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>Can I Visit Shirakawa-go as a Day Trip From Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — it is the easiest day trip from Kanazawa. Reserved buses leave Kanazawa Station West Exit from{" "}
            <strong>8:00</strong> and take <strong>1h15m</strong>; the last one back leaves Shirakawa-go at{" "}
            <strong>17:55</strong>. Every seat is reserved, so book both ways when sales open one month before.
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
                      <td className={styles.tdProvider} style={thStyle}>{row.time}</td>
                      <td style={thStyle}>{row.place}</td>
                      <td style={thStyle}>{row.allow}</td>
                      <td style={thStyle}>{row.getting}</td>
                      <td style={thStyle}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Bus times from Hokutetsu&apos;s timetables (revised 1 April 2025), read {OWN}; the 2–3 hour village
            figure and the observation-deck walk from shirakawa-go.gr.jp, {OWN}.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Bus or tour?</strong> The bus is cheapest and lets you choose your hours. A tour is worth it
            if you want Takayama too: the join-in day from Kanazawa is listed at 8 to 10 hours with an
            English-speaking licensed guide, and can drop you in Takayama instead of bringing you back. Check the
            cancellation terms for snow on the listing; on a two-day trip there is no spare day to move it to.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shirakawa-go &amp; Takayama tour →
            </KlookLink>
            <KlookLink href={shirakawagoGokayamaKanazawaBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              + Gokayama version →
            </KlookLink>
            <KlookLink href={shirakawagoKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Shirakawa-go &amp; Kanazawa day →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book for Two Days in Kanazawa"
          intro="The Shirakawa-go day, the hotel, the train or pass, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={kanazawaTwoDayTripPrep}
        />

        {/* Transport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Kanazawa and Shirakawa-go?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Hokuriku Shinkansen from Tokyo, a reserved highway bus to Shirakawa-go, and the loop bus around
            town. Only the loop bus can be used without a booking.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "Booking", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transportRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={thStyle}>{row.route}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.book}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.hokutetsu.co.jp/highway-bus/takayama/" target="_blank" rel="noopener">hokutetsu.co.jp/highway-bus/takayama/</a>{" "}
            and{" "}
            <a href="https://www.hokutetsu.co.jp/tourism-bus/castle-town/" target="_blank" rel="noopener">/tourism-bus/castle-town/</a>.
            The shinkansen fare and time are JR West&apos;s, from our{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa shinkansen guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kanazawa shinkansen →
            </KlookLink>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hokuriku Arch Pass →
            </KlookLink>
          </div>
        </section>

        {/* Takayama */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Adding Takayama</span>
          <h2 className={styles.sectionTitle}>Can I See Shirakawa-go and Takayama in One Day?</h2>
          <p className={styles.bodyText}>
            Yes, but on your own it is three reserved bus legs. On Hokutetsu&apos;s timetable, one version is
            Kanazawa 8:10 → Shirakawa-go 9:25, Shirakawa-go 12:35 → Takayama 13:25, and Takayama 16:30 → Kanazawa
            18:45. That gives three hours in the village and three in Takayama. The tour does the same day on one
            booking with a guide, and is the easier choice in snow. If you want Takayama properly, end the day there
            and stay the night — our{" "}
            <Link href="/guides/attractions/japan-3-week-itinerary">Japan 3-week itinerary</Link> routes Kanazawa →
            Shirakawa-go → Takayama that way.
          </p>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Admission</span>
          <h2 className={styles.sectionTitle}>How Much Are Kenroku-en, Kanazawa Castle and the 21st Century Museum?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Kenroku-en is {KENROKUEN}, the castle park is free, and the 21st Century Museum&apos;s current exhibition is{" "}
            {MUSEUM}. On Day 2, the bus fare is the main cost.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Place", "Official price", "Hours", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={thStyle}>{row.stop}</td>
                      <td className={styles.tdPrice} style={thStyle}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/info.html" target="_blank" rel="noopener">Kenroku-en</a>,{" "}
            <a href="https://shiro-niwa.pref.ishikawa.lg.jp/kanazawa-castle/info/fee.php" target="_blank" rel="noopener">Kanazawa Castle Park</a>,{" "}
            <a href="https://www.kanazawa21.jp/" target="_blank" rel="noopener">21st Century Museum</a>. The museum&apos;s
            Monday closing is from its site as read on 11 November 2026. No Klook price appears on this page.
          </p>
        </section>

        {/* Arch pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rail pass</span>
          <h2 className={styles.sectionTitle}>Is the Hokuriku Arch Pass Worth It for Kanazawa?</h2>
          <p className={styles.bodyText}>
            Not for a Tokyo–Kanazawa return alone. JR West&apos;s eTicket price for a reserved seat is{" "}
            <strong>{SHINKANSEN}</strong> one way, and the 7-day Hokuriku Arch Pass is <strong>{ARCH_PASS}</strong>.
            It pays when Kanazawa is the middle of a Tokyo → Kanazawa → Kyoto/Osaka trip, because it covers the
            Hokuriku Shinkansen from Tokyo and the run to Kansai — but not the Tokaido Shinkansen back. It does not
            cover the Shirakawa-go bus. Read {RAIL}. Our{" "}
            <Link href="/guides/transport/hokuriku-arch-pass">Hokuriku Arch Pass guide</Link> has the break-even
            sums.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Hokuriku Arch Pass →
            </KlookLink>
          </div>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay in Kanazawa?</h2>
          <p className={styles.bodyText}>
            Near Kanazawa Station for this plan. The shinkansen arrives there, the Shirakawa-go buses leave from
            the West Exit, and the loop bus starts at the East Exit. Omicho and Musashigatsuji, one loop-bus stop
            in, put you closer to the sights and to the market for breakfast.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for Kanazawa"
          intro="Room prices and availability change by date, so each area links to Klook's listing or hotel search for it."
          areas={kanazawaTwoDayStayAreas}
        />

        {/* Winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>What to Wear in Kanazawa and Shirakawa-go in Winter?</h2>
          <p className={styles.bodyText}>
            Waterproof boots with grip, a warm coat and layers. Shirakawa-go is in heavy-snow country; the
            Shirakawa-go Tourist Association says light-up evenings fall to between <strong>−10°C and 0°C</strong>{" "}
            with frozen roads, and recommends insulated waterproof boots, ice spikes and a flashlight. In Kanazawa,
            Kenroku-en&apos;s gravel paths can be slippery.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Do I Need to Book the Shirakawa-go Light-Up?
          </h3>
          <p className={styles.bodyText}>
            Yes. The 41st light-up runs on <strong>11, 17, 24 and 31 January 2027, 17:30–19:30</strong>, and is full
            advance reservation only. No tickets are sold on the day, and from 15:30 people without one cannot enter
            the village — so day visitors by route bus should arrive by 15:20. The last route buses leave before the
            lights come on. Hokutetsu&apos;s light-up bus from Kanazawa (14:30 out, back 21:50) is ¥18,500 adult and
            includes an observation-deck ticket. Read on{" "}
            <a href="https://shirakawa-go.gr.jp/events/441/" target="_blank" rel="noopener">shirakawa-go.gr.jp</a> and{" "}
            <a href="https://www.hokutetsu.co.jp/news/shirakawago-lightup2027/" target="_blank" rel="noopener">hokutetsu.co.jp</a>,{" "}
            {OWN}.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>What Should I Book Before Visiting Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Shirakawa-go bus or tour first, then the train and the hotel. Day 1 needs nothing booked.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "When to book", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={thStyle}>{row.what}</td>
                      <td style={thStyle}>{row.when}</td>
                      <td style={thStyle}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}: hokutetsu.co.jp, shirakawa-go.gr.jp; shinkansen sale rule from JR West, {RAIL}.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The bus seat, the light-up rules and any snow notice all reach you on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
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
        </section>

        <KlookTourPicks
          heading="Guided Days From Kanazawa"
          intro="Shirakawa-go days from Kanazawa Station, and two Kanazawa city days. Durations, pick-up and inclusions are on each listing."
          tours={[shirakawagoTakayamaKanazawaDayTour, shirakawagoGokayamaKanazawaBusTour, shirakawagoKanazawaDayTour, kanazawaGeishaKenrokuenCastleDayTour]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tour: Which Departure to Book" },
              { href: "/guides/transport/tokyo-to-kanazawa", title: "Tokyo to Kanazawa Shinkansen (2026): Time, Price, Passes" },
              { href: "/guides/transport/hokuriku-arch-pass", title: "Hokuriku Arch Pass (2026): Price, Route and Is It Worth It?" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: Kanazawa, Shirakawa-go and Takayama" },
              { href: "/guides/attractions/japan-3-week-itinerary", title: "Japan 3 Week Itinerary: 21 Days, Day by Day" },
              { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
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

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>One day in the city, one day in the village</h2>
            <p className={styles.ctaBannerDesc}>
              Book the Shirakawa-go seat or tour a month out, a hotel by the station, and leave Day 1 free for the
              garden and the teahouse streets.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shirakawagoTakayamaKanazawaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Shirakawa-go Tour →
              </KlookLink>
              <KlookLink href={kanazawaHotels.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Hotels in Kanazawa →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
