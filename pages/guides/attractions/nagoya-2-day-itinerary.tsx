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
  centrairMeitetsuAirportTicket,
  centrairPrivateTransfer,
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  ghibliParkTicketHotelPackage,
  klookEsim,
  legolandJapanHotelPackage,
  legolandJapanTicket,
  nagoyaCastleAfterHoursTour,
  nagoyaCastleKlookUrl,
  nagoyaParkStayAreas,
  nagoyaTwoDayTripPrep,
  shinkansenNagoyaKyoto,
  shinkansenNagoyaOsaka,
  shinkansenTokyoNagoya,
  takayamaShirakawagoNagoyaDayTrip,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Two days in Nagoya: the castle, Osu and Sakae on Day 1, then Ghibli Park or
 * LEGOLAND Japan on Day 2. Added 17 Nov 2026 (task-jtk-20261117-01).
 *
 * Next to its neighbours:
 *  - nagoya-castle-tickets answers "what does the castle cost and can I go in";
 *  - ghibli-park-tickets answers "which pass, when do tickets go on sale";
 *  - legoland-japan-tickets answers "LEGOLAND prices, ages and the Aonami Line";
 *  - tokyo-to-nagoya-shinkansen answers "which train and ticket from Tokyo";
 *  - this page answers "how to spend two days with Nagoya as the base".
 *
 * Official reads on 17 Nov 2026:
 *   ghibli-park.jp/en/ticket/     Standard ¥3,300 weekday / ¥3,800 weekend & holiday (child 4–12
 *                                 ¥1,650 / ¥1,900, 0–3 free); Premium ¥7,300 / ¥7,800; on sale two
 *                                 months ahead on the 10th at 14:00 JST; January 2027 went on sale
 *                                 10 Nov 2026; advance only, not sold at the park; LAWSON TICKET or
 *                                 Klook overseas; Grand Warehouse entry 9 a.m. (on 9 a.m. days) to
 *                                 2 p.m., enter within an hour; other areas final entry 16:30
 *   ghibli-park.jp/en/calendar/   Weekdays 10:00–17:00, weekends and holidays 9:00–17:00
 *   legoland.jp/en/               LEGOLAND 10:00–17:00, SEA LIFE Nagoya 11:00–18:00
 *   meitetsu.co.jp/eng/airport-access/, /train/Ticket/first_class/
 *                                 μticket ¥450 on top of the regular ticket; μSKY all first-class;
 *                                 the μSKY's 28 minutes Meitetsu Nagoya ⇄ Centrair is Meitetsu's
 *                                 own figure (read through its English page's search index entry)
 *   nagoya-info.jp/en/gourmet/    hitsumabushi, miso-katsu, tebasaki, miso-nikomi udon as Nagoya
 *                                 dishes (city tourism site)
 *
 * Carried with their own dates: Nagoya Castle ¥1,000, 9:00–16:30, keep closed, Nagoyajo Exit 7
 * 5 min, Osu Kannon Exit 2 3 min, Nagoya → Kyoto 33 min / Shin-Osaka 47 min, smartEX ¥5,710 /
 * ¥6,480 (14 Nov 2026, nagoya-castle-tickets); Tokyo → Nagoya 1h33m fastest and smartEX ¥11,100
 * (28 Oct 2026, tokyo-to-nagoya-shinkansen); Ghibli Park Tuesday closure (12 Nov 2026); Meitetsu
 * direct bus 40 min / ¥1,200, Linimo ¥400, Aonami Line 24 min / ¥360, LEGOLAND from ¥4,900~ and
 * its 2–12 target age (26 Oct 2026, ghibli-park-tickets and legoland-japan-tickets).
 *
 * Not printed: a Centrair base rail fare (only an older airport-page figure was found), restaurant
 * prices, and any Klook price.
 */

const ROUTE = "/guides/attractions/nagoya-2-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-17");
const CASTLE = checkedLabel("2026-11-14");
const RAIL = checkedLabel("2026-10-28");
const GHIBLI = checkedLabel("2026-11-12");
const PARKS = checkedLabel("2026-10-26");

const CASTLE_ADULT = "¥1,000";
const GHIBLI_STD = "¥3,300–¥3,800";
const GHIBLI_PREM = "¥7,300–¥7,800";
const LEGO_ADULT = "¥4,900~";
const BUS = "¥1,200";
const AONAMI = "¥360";
const SMART_EX_TOKYO = "¥11,100";
const MU_TICKET = "¥450";

const officialLink = { color: "var(--text)", fontWeight: 600 } as const;
const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

function LastChecked({ date, sources }: { date: string; sources: { label: string; href: string }[] }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      Last checked {date}. Official source{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? ", " : ""}
          <a href={s.href} target="_blank" rel="noopener" style={officialLink}>
            {s.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

const SRC = {
  ghibliTicket: { label: "ghibli-park.jp/en/ticket/", href: "https://ghibli-park.jp/en/ticket/" },
  ghibliCalendar: { label: "ghibli-park.jp/en/calendar/", href: "https://ghibli-park.jp/en/calendar/" },
  ghibliAccess: { label: "ghibli-park.jp/en/directions/", href: "https://ghibli-park.jp/en/directions/" },
  legoland: { label: "legoland.jp/en/", href: "https://www.legoland.jp/en/" },
  castle: { label: "nagoyajo.city.nagoya.jp", href: "https://www.nagoyajo.city.nagoya.jp/en/" },
  nagoyaInfo: { label: "nagoya-info.jp", href: "https://www.nagoya-info.jp/en/" },
  meitetsu: { label: "meitetsu.co.jp (airport access)", href: "https://www.meitetsu.co.jp/eng/airport-access/" },
  smartEx: { label: "smart-ex.jp", href: "https://smart-ex.jp/en/" },
  aonami: { label: "aonamiline.co.jp", href: "https://www.aonamiline.co.jp/" },
};

type Row = { day: string; where: string; move: string; book: string };

/** Table 1: the two days at a glance — the first row is the answer. */
const overviewRows: Row[] = [
  {
    day: "Day 1 — the city",
    where: "Nagoya Castle and the Hommaru Palace, Osu Kannon and the Osu arcades, Sakae in the evening; Nagoya dishes for dinner",
    move: "Subway: Meijo Line to Nagoyajo, then on to Kamimaezu / Osu Kannon and Sakae",
    book: `Nothing essential — the castle is ${CASTLE_ADULT} at the gate or online`,
  },
  {
    day: "Day 2 — option A",
    where: "Ghibli Park (Expo 2005 Aichi Commemorative Park, Nagakute)",
    move: `Meitetsu direct bus from Nagoya Station, 40 min, ${BUS}`,
    book: "Yes — a dated ticket and a Grand Warehouse entry time, sold two months ahead, never at the park",
  },
  {
    day: "Day 2 — option B",
    where: "LEGOLAND Japan and SEA LIFE Nagoya (Kinjofuto)",
    move: `Aonami Line from Nagoya Station, 24 min, ${AONAMI}`,
    book: "A dated ticket; online rates vary by date",
  },
  {
    day: "Day 2 — option C",
    where: "Takayama and Shirakawa-go",
    move: "A coach day from Nagoya Station",
    book: "The tour",
  },
];

type Stop = { time: string; place: string; allow: string; getting: string; booking: string };

const day1: Stop[] = [
  {
    time: "9:00",
    place: "Nagoya Castle — grounds and the Hommaru Palace (the keep is closed inside)",
    allow: "1 h – 1 h 30 (the castle's own figure)",
    getting: "Meijo Line to Nagoyajo, Exit 7, about 5 min on foot",
    booking: `${CASTLE_ADULT} adult, junior high and under free; open 9:00–16:30, palace last entry 16:00`,
  },
  {
    time: "11:00",
    place: "Osu Kannon and the Osu shopping arcades; lunch",
    allow: "1–2 hours (planning allowance)",
    getting: "Meijo Line to Kamimaezu (2 min to the arcades), or Tsurumai Line to Osu Kannon, Exit 2, 3 min",
    booking: "No; antique market on the 18th and 28th",
  },
  {
    time: "14:00",
    place: "Arrive from Tokyo instead? Start here: castle after lunch, Osu after",
    allow: "Tokyo → Nagoya 1h33m on the fastest NOZOMI",
    getting: "Tokaido Shinkansen, then the subway from Nagoya Station",
    booking: `A reserved seat (smartEX ${SMART_EX_TOKYO})`,
  },
  {
    time: "17:00",
    place: "Sakae — evening, then dinner: hitsumabushi (eel over rice), miso-katsu or tebasaki wings",
    allow: "2–3 hours",
    getting: "Subway to Sakae",
    booking: "No",
  },
];

const day2Ghibli: Stop[] = [
  {
    time: "8:30",
    place: "Meitetsu Bus Center, Nagoya Station — stop 24 on the 4th floor",
    allow: "40 min to the park on the direct bus",
    getting: `Direct bus, ${BUS} adult / ¥600 child; runs only on park opening days, some trips cashless only`,
    booking: "The park ticket, booked ahead",
  },
  {
    time: "9:00–14:00",
    place: "Ghibli's Grand Warehouse at your booked entry time",
    allow: "Enter within one hour of your slot; early entry is not allowed",
    getting: "Ai-Chikyuhaku Kinen Koen, the park is outside Exit 2",
    booking: `Standard pass ${GHIBLI_STD} adult; 9 a.m. slots only on days the park opens at 9`,
  },
  {
    time: "Rest of the day",
    place: "Valley of Witches and Mononoke Village (Standard); all five areas on Premium",
    allow: "Until 17:00 close; final entry to the open areas 16:30",
    getting: "On foot inside the park",
    booking: `Premium ${GHIBLI_PREM} for the building interiors`,
  },
  {
    time: "Evening",
    place: "Back to Nagoya Station",
    allow: "40 min by bus",
    getting: "Direct bus, or the Linimo (¥400) and the Higashiyama subway via Fujigaoka",
    booking: "No",
  },
];

const day2Lego: Stop[] = [
  {
    time: "9:30",
    place: "Aonami Line, Nagoya Station → Kinjofuto",
    allow: "24 min, no change",
    getting: `${AONAMI} adult / ¥180 child`,
    booking: "No",
  },
  {
    time: "10:00–17:00",
    place: "LEGOLAND Japan",
    allow: "The full opening day",
    getting: "Kinjofuto Station is next to the resort",
    booking: `1 Day Pass from ${LEGO_ADULT} adult (19+); rates vary by date`,
  },
  {
    time: "17:00–18:00",
    place: "SEA LIFE Nagoya, at the resort entrance",
    allow: "About an hour before it closes at 18:00",
    getting: "On foot",
    booking: "Combo ticket, or SEA LIFE only",
  },
  {
    time: "Evening",
    place: "Aonami Line back to Nagoya Station",
    allow: "24 min",
    getting: "The only railway out of Kinjofuto",
    booking: "No",
  },
];

/** Table 3: getting there and getting around. */
const transportRows = [
  {
    route: "Tokyo → Nagoya, Tokaido Shinkansen",
    time: "1h33m fastest NOZOMI, no change",
    fare: `${SMART_EX_TOKYO} smartEX NOZOMI reserved, regular season`,
    note: "JR Pass covers the HIKARI, not the NOZOMI",
    source: RAIL,
  },
  {
    route: "Kyoto → Nagoya",
    time: "33 min fastest, no change",
    fare: "¥5,710 smartEX NOZOMI reserved",
    note: "The natural next stop either side of Nagoya",
    source: CASTLE,
  },
  {
    route: "Shin-Osaka → Nagoya",
    time: "47 min fastest, no change",
    fare: "¥6,480 smartEX NOZOMI reserved",
    note: "Same train line as from Kyoto",
    source: CASTLE,
  },
  {
    route: "Centrair Airport → Meitetsu Nagoya",
    time: "28 min on the μSKY (Meitetsu)",
    fare: `Regular ticket + ${MU_TICKET} μticket (μSKY is all first-class)`,
    note: "μtickets go on sale a month ahead; ¥500 extra if bought on board",
    source: OWN,
  },
  {
    route: "Nagoya Station → Ghibli Park",
    time: "40 min, Meitetsu direct bus",
    fare: `${BUS} adult / ¥600 child`,
    note: "Stop 24, 4F Meitetsu Bus Center; runs only on park days. Or subway + Linimo (Linimo leg ¥400)",
    source: PARKS,
  },
  {
    route: "Nagoya Station → LEGOLAND Japan",
    time: "24 min, Aonami Line to Kinjofuto",
    fare: `${AONAMI} adult / ¥180 child`,
    note: "No change of train",
    source: PARKS,
  },
  {
    route: "Nagoya Station → Nagoya Castle",
    time: "Subway to Nagoyajo (Meijo Line), Exit 7, 5 min on foot",
    fare: "Subway fare",
    note: "Nagoya Station is not on the Meijo Line, so allow for one change",
    source: CASTLE,
  },
];

/** Table 4: Ghibli Park or LEGOLAND — the answer row first. */
const parkRows = [
  {
    item: "Choose it if",
    ghibli: "You know the films — adults and older children",
    lego: "Your children are about 2 to 12 (the park's own target age)",
  },
  {
    item: "Getting a ticket",
    ghibli: "Hard: one monthly release, two months ahead on the 10th at 14:00 JST; never sold at the park",
    lego: "Easy: dated online tickets, prices vary by date",
  },
  {
    item: "Adult price",
    ghibli: `Standard ${GHIBLI_STD}; Premium ${GHIBLI_PREM} (weekday–weekend)`,
    lego: `1 Day Pass from ${LEGO_ADULT} (19+)`,
  },
  {
    item: "Child price",
    ghibli: "Ages 4–12 half price; 0–3 free",
    lego: "Ages 3–18 pay the child rate (from ¥3,700~)",
  },
  {
    item: "Hours",
    ghibli: "10:00–17:00 weekdays, 9:00–17:00 weekends and holidays",
    lego: "10:00–17:00; SEA LIFE 11:00–18:00",
  },
  {
    item: "Closed",
    ghibli: "Every Tuesday (next weekday if a holiday), New Year, maintenance days",
    lego: "No park-wide closure days listed; individual rides close on set dates",
  },
  {
    item: "From Nagoya Station",
    ghibli: `40 min by direct bus, ${BUS}`,
    lego: `24 min by Aonami Line, ${AONAMI}`,
  },
];

const faqItems = [
  {
    q: "How should I spend 2 days in Nagoya?",
    a: `Day 1 in the city: Nagoya Castle (${CASTLE_ADULT}, 9:00–16:30), Osu Kannon and the Osu arcades, then Sakae and a Nagoya dinner such as hitsumabushi or miso-katsu. Day 2 at Ghibli Park (40 minutes by direct bus from Nagoya Station) or LEGOLAND Japan (24 minutes by Aonami Line). Park hours read on the official sites ${OWN}.`,
  },
  {
    q: "Is Nagoya worth visiting?",
    a: "Yes, as a stop between Tokyo and Kyoto rather than a detour: it is 1h33m from Tokyo and 33 minutes from Kyoto on the fastest NOZOMI. It has Ghibli Park and LEGOLAND Japan, and the castle's rebuilt Hommaru Palace is open even though the keep is closed.",
  },
  {
    q: "Can you do Ghibli Park as a day trip from Nagoya?",
    a: `Yes. Meitetsu's direct bus leaves stop 24 on the 4th floor of the Meitetsu Bus Center at Nagoya Station and takes 40 minutes for ${BUS} (operator figures, ${PARKS}). It runs only on park opening days. The park is open 10:00–17:00 on weekdays and 9:00–17:00 at weekends, and closed on Tuesdays.`,
  },
  {
    q: "When do Ghibli Park tickets go on sale?",
    a: `On the 10th of the month, two months before your visit month, at 14:00 Japan time. January 2027 went on sale on 10 November 2026; on that rule, February 2027 dates open on 10 December 2026. The park notes sale dates may change. Read on ghibli-park.jp ${OWN}.`,
  },
  {
    q: "Ghibli Park or LEGOLAND Japan — which should I choose?",
    a: `Ghibli Park for adults and older children who know the films, if you can get a ticket: they sell out by date and are never sold at the gate. LEGOLAND Japan for children aged about 2 to 12, its own target age; tickets are easy to get and priced by date, from ${LEGO_ADULT} for an adult.`,
  },
  {
    q: "Where should I stay in Nagoya?",
    a: "Near Nagoya Station. The shinkansen, the direct bus to Ghibli Park, the Aonami Line to LEGOLAND and the Meitetsu trains to Centrair Airport all leave from there. Stay out by Ghibli Park only for a 9 a.m. Grand Warehouse slot on a weekend.",
  },
  {
    q: "How do I get from Tokyo to Nagoya?",
    a: `By Tokaido Shinkansen: 1h33m on the fastest NOZOMI, ${SMART_EX_TOKYO} for a reserved seat on smartEX in the regular season (${RAIL}). A JR Pass covers the HIKARI, not the NOZOMI.`,
  },
  {
    q: "What food should I eat in Nagoya?",
    a: "Nagoya's city tourism site lists hitsumabushi (grilled eel over rice, eaten three ways), miso-katsu (pork cutlet with a miso sauce), tebasaki (fried chicken wings) and miso-nikomi udon as the local dishes. Day 1's dinner in Sakae or at Nagoya Station is the time for them.",
  },
];

const TITLE = "Nagoya 2 Day Itinerary (2026): Ghibli Park or LEGOLAND";
const DESCRIPTION =
  "Nagoya 2 day itinerary: the castle, Osu and Sakae on Day 1, Ghibli Park or LEGOLAND on Day 2. A Nagoya itinerary for 2 days in Nagoya, with fares.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

function StopTable({ rows }: { rows: Stop[] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["Time", "Where", "Time to allow", "Getting there", "Booking / cost"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
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
  );
}

export default function Nagoya2DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Nagoya 2 Day Itinerary", item: URL },
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Nagoya 2 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Nagoya 2 Day Itinerary (2026): <br />2 Days in Nagoya With Ghibli Park or LEGOLAND
          </h1>
          <p className={styles.heroSubtitle}>
            One day for the castle, Osu and a Nagoya dinner; one day at a park — and the tickets, trains and hotel to
            sort before you go.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official times & fares, dated", "A table for each day", "Ghibli Park vs LEGOLAND"].map((t) => (
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
                <p className={styles.verdictStatValue}>Nagoya Castle, Osu, Sakae, a Nagoya dinner</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Ghibli Park or LEGOLAND Japan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nagoya Stn → Ghibli / LEGOLAND</p>
                <p className={styles.verdictStatValue}>40 min bus / 24 min Aonami Line</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>1h33m by NOZOMI, {SMART_EX_TOKYO}</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Nagoya 2 day itinerary</strong> is one day in the city and one day at a park. On{" "}
              <strong>Day 1</strong>, see <strong>Nagoya Castle ({CASTLE_ADULT}, 9:00–16:30)</strong>, Osu Kannon and
              the Osu arcades, then Sakae and a dinner of hitsumabushi or miso-katsu. On <strong>Day 2</strong>, go to{" "}
              <strong>Ghibli Park — 40 minutes by direct bus from Nagoya Station</strong> — or{" "}
              <strong>LEGOLAND Japan, 24 minutes on the Aonami Line</strong>. From Tokyo, the NOZOMI takes{" "}
              <strong>1h33m</strong> at <strong>{SMART_EX_TOKYO}</strong> reserved.{" "}
              <Link href="/guides/attractions/ghibli-park-tickets">Ghibli Park tickets</Link> go on sale two
              months ahead on the 10th at 14:00 JST — February 2027 dates on 10 December 2026. Park figures read on the
              official sites {OWN}; castle {CASTLE}; rail {RAIL}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={nagoyaParkStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Nagoya Station Hotels →
              </KlookLink>
              <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Ghibli Park Ticket →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Overview */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Nagoya itinerary</span>
          <h2 className={styles.sectionTitle}>How Should I Spend 2 Days in Nagoya?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            City first, park second. Day 1 needs nothing booked and fits around a morning shinkansen; Day 2 is the one
            to plan, because a Ghibli Park ticket has to be bought two months out. This Nagoya itinerary uses Nagoya
            Station as the base for both nights.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Day", "Where", "Getting there", "What to book"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {overviewRows.map((row) => (
                    <tr key={row.day}>
                      <td className={styles.tdProvider} style={thStyle}>{row.day}</td>
                      <td style={thStyle}>{row.where}</td>
                      <td style={thStyle}>{row.move}</td>
                      <td style={thStyle}>{row.book}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked date={OWN} sources={[SRC.ghibliTicket, SRC.legoland, SRC.castle]} />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Castle figures read {CASTLE}; bus and Aonami Line figures from Meitetsu and Aonami Line, {PARKS}.
          </p>
        </section>

        {/* Day 1 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 1</span>
          <h2 className={styles.sectionTitle}>What Should I Do on Day 1 in Nagoya?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Nagoya Castle at opening, Osu for lunch, Sakae for the evening — all on the subway. The castle&apos;s keep is
            closed inside for its low earthquake resistance, but the Hommaru Palace is open and the castle itself
            suggests 1 to 1.5 hours.
          </p>
          <StopTable rows={day1} />
          <LastChecked date={CASTLE} sources={[SRC.castle, SRC.nagoyaInfo]} />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Dishes from Nagoya&apos;s city tourism site, {OWN}. &ldquo;Time to allow&rdquo; marked as a planning allowance
            is not an official figure.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Can You Go Inside Nagoya Castle?
          </h3>
          <p className={styles.bodyText}>
            Into the grounds and the Hommaru Palace, yes; into the main keep, no. The city has closed the keep with no
            reopening date while it plans a wooden rebuild. Prices, the palace and the after-hours tour are in our{" "}
            <Link href="/guides/attractions/nagoya-castle-tickets">Nagoya Castle tickets guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nagoyaCastleKlookUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nagoya Castle tours &amp; tickets →
            </KlookLink>
            <KlookLink href={nagoyaCastleAfterHoursTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              After-hours palace tour →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 Ghibli */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2, option A</span>
          <h2 className={styles.sectionTitle}>Can You Do Ghibli Park as a Day Trip From Nagoya?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes — it is 40 minutes from Nagoya Station on Meitetsu&apos;s direct bus, and the park closes at 17:00, so
            you are back for dinner. The catch is the ticket: it is dated, carries a timed entry to Ghibli&apos;s Grand
            Warehouse, goes on sale two months ahead on the 10th at 14:00 JST, and is never sold at the park. The park
            is closed on Tuesdays, and the direct bus does not run on closed days.
          </p>
          <StopTable rows={day2Ghibli} />
          <LastChecked date={OWN} sources={[SRC.ghibliTicket, SRC.ghibliCalendar, SRC.ghibliAccess]} />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Bus and Linimo fares from the operators, {PARKS}; Tuesday closure from the park&apos;s calendar, {GHIBLI}.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Which pass?</strong> Standard covers the Grand Warehouse, Mononoke Village and Valley of Witches;
            Premium adds Hill of Youth, Dondoko Forest and the building interiors such as Howl&apos;s Castle and
            Satsuki and Mei&apos;s House. There are no refunds or changes, so pick the date after the shinkansen is
            settled. The full sale calendar and seller list are in our{" "}
            <Link href="/guides/attractions/ghibli-park-tickets">Ghibli Park tickets guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Ghibli Park bus tour from Nagoya →
            </KlookLink>
            <KlookLink href={ghibliParkTicketHotelPackage.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Ticket + Nagoya hotel →
            </KlookLink>
            <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Ghibli Park ticket →
            </KlookLink>
          </div>
        </section>

        {/* Day 2 LEGOLAND */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 2, option B</span>
          <h2 className={styles.sectionTitle}>Is LEGOLAND Japan a Good Day 2 With Kids?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For children of about 2 to 12, yes — that is the park&apos;s own target age. It is 24 minutes from Nagoya
            Station on the Aonami Line, open 10:00–17:00, and SEA LIFE Nagoya at the entrance stays open until 18:00,
            which fills the last hour.
          </p>
          <StopTable rows={day2Lego} />
          <LastChecked date={OWN} sources={[SRC.legoland, SRC.aonami]} />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ticket prices and the Aonami Line figures read {PARKS}. Prices, ages and the Skip Pass are in our{" "}
            <Link href="/guides/attractions/legoland-japan-tickets">LEGOLAND Japan tickets guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={legolandJapanHotelPackage.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              LEGOLAND Japan Hotel →
            </KlookLink>
            <KlookLink href={legolandJapanTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              LEGOLAND ticket →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book for Two Days in Nagoya"
          intro="The hotel, a day tour, the airport leg and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={nagoyaTwoDayTripPrep}
        />

        {/* Ghibli vs LEGOLAND */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Choosing Day 2</span>
          <h2 className={styles.sectionTitle}>Ghibli Park or LEGOLAND Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Ghibli Park for adults and older children who know the films, if a ticket is still available for your
            date; LEGOLAND Japan for families with children of about 2 to 12, and for any trip booked less than a
            month or two out.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Ghibli Park", "LEGOLAND Japan"].map((h) => (
                      <th key={h || "item"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={thStyle}>{row.item}</td>
                      <td style={thStyle}>{row.ghibli}</td>
                      <td style={thStyle}>{row.lego}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked date={OWN} sources={[SRC.ghibliTicket, SRC.ghibliCalendar, SRC.legoland]} />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            LEGOLAND prices, ages and closures read {PARKS}; Ghibli Park closures {GHIBLI}. LEGOLAND&apos;s
            &ldquo;~&rdquo; is the operator&apos;s: its online rates vary by date.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What If Neither Park Suits You?
          </h3>
          <p className={styles.bodyText}>
            Take a coach day to Takayama and Shirakawa-go from Nagoya Station instead: about two hours in each, on a
            long day out. Our <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go
            tour guide</Link> compares the departures. Read the cancellation and weather terms on the listing before you book —
            on a two-day trip there is no spare day to move to.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={takayamaShirakawagoNagoyaDayTrip.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Takayama &amp; Shirakawa-go day from Nagoya →
            </KlookLink>
          </div>
        </section>

        {/* Transport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Nagoya, and From Nagoya to the Parks?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Tokaido Shinkansen from Tokyo, Kyoto or Osaka, the Meitetsu μSKY from Centrair Airport, then a bus or
            one train to either park. Every leg starts or ends at Nagoya Station.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "Notes", "Checked"].map((h) => (
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
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked date={OWN} sources={[SRC.meitetsu, SRC.smartEx, SRC.aonami, SRC.ghibliAccess]} />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Each row carries the date its figure was read. Shinkansen times and smartEX fares are the regular-season
            NOZOMI figures; the train choice, the JR Pass and luggage rules are in our{" "}
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen">Tokyo to Nagoya shinkansen guide</Link>. From
            Osaka-Namba, the slower Kintetsu line reaches Kintetsu-Nagoya for a ¥2,860 basic fare plus a ¥1,930 limited
            express charge, and the 5-day{" "}
            <Link href="/guides/transport/kintetsu-rail-pass">Kintetsu Rail Pass</Link> covers that fare and Ise-Shima
            as well.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Nagoya shinkansen →
            </KlookLink>
            <KlookLink href={shinkansenNagoyaKyoto.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nagoya → Kyoto →
            </KlookLink>
            <KlookLink href={shinkansenNagoyaOsaka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nagoya → Osaka →
            </KlookLink>
            <KlookLink href={centrairMeitetsuAirportTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Centrair airport train →
            </KlookLink>
            <KlookLink href={centrairPrivateTransfer.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Centrair private car →
            </KlookLink>
          </div>
        </section>

        {/* Worth it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Worth it?</span>
          <h2 className={styles.sectionTitle}>Is Nagoya Worth Visiting?</h2>
          <p className={styles.bodyText}>
            Yes, as a stop on the Tokyo–Kyoto line rather than a detour: Nagoya is from 1h33m from Tokyo on a NOZOMI
            (JR Central&apos;s timetable, 18 Nov 2026) and 33 minutes from Kyoto on the fastest NOZOMI — our{" "}
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen">bullet train from Tokyo to Nagoya</Link> guide has
            every train type and the ¥11,100 smartEX fare. It has Ghibli Park and LEGOLAND Japan, the country&apos;s only LEGOLAND resort, and a castle
            whose palace you can go into. If you get off here, buy separate tickets for each leg — Tokyo to Nagoya,
            then Nagoya to Kyoto or Shin-Osaka.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay in Nagoya?</h2>
          <p className={styles.bodyText}>
            <strong>Nagoya Station</strong> for two nights. The shinkansen, the direct bus to Ghibli Park, the Aonami
            Line to LEGOLAND and the Meitetsu trains to Centrair all leave from the station complex. Stay near{" "}
            <strong>Ghibli Park</strong> (Nagakute and Seto) only for a 9 a.m. Grand Warehouse slot on a weekend or
            holiday, when the park opens at 9:00 — or at the LEGOLAND Japan Hotel for a family that wants two park
            mornings.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for Nagoya"
          intro="Room prices and availability change by date, so each area links to Klook's hotel search for it."
          areas={nagoyaParkStayAreas}
        />

        {/* When to go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>Which Days of the Week Work Best for 2 Days in Nagoya?</h2>
          <p className={styles.bodyText}>
            Avoid a Tuesday for Day 2 if it is Ghibli Park: the park closes every Tuesday, or the next weekday when the
            Tuesday is a public holiday. A weekend gives Ghibli Park&apos;s 9:00 opening and the 9 a.m. Grand Warehouse
            slot, but costs ¥500 more per adult on the Standard pass. LEGOLAND lists no park-wide closure days; check
            its ride closures for your date. On Day 1, the Osu antique market at Osu Kannon is on the 18th and 28th.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The Ghibli Park QR ticket, the bus stop and the Aonami Line timetable all live on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares the alternatives.
          </p>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Heading south to Ise and Kumano from Nagoya? The <Link href="/guides/transport/ise-kumano-wakayama-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Ise-Kumano-Wakayama Area Tourist Pass</Link> covers the loop to Osaka in five days.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Two theme parks a day from Nagoya: <Link href="/guides/attractions/nagashima-spa-land-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Nagashima Spa Land</Link> (Passport ¥6,000 for adults) and, further into Mie, <Link href="/guides/attractions/shima-spain-village-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Shima Spain Village</Link>.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            By the port, the <Link href="/guides/attractions/port-of-nagoya-aquarium-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Port of Nagoya Public Aquarium</Link> (¥2,030) and, at Kinjofuto, the <Link href="/guides/attractions/scmaglev-railway-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>SCMAGLEV and Railway Park</Link> (¥1,200, closed Tuesdays).
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            North of the city near Inuyama, <Link href="/guides/attractions/meiji-mura-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Meiji Mura</Link> is ¥2,500 for adults and open 10:00–16:00 in winter (closed 14–18 and 31 December 2026).
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For an evening out of the city, <Link href="/guides/attractions/nabana-no-sato-illumination-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Nabana no Sato</Link> in Kuwana is lit until 21:00 on December weekdays (¥3,200); for a day on the coast, <Link href="/guides/attractions/toba-aquarium-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Toba Aquarium</Link> is ¥2,800 for adults.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            With children, <Link href="/guides/attractions/suzuka-circuit-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Suzuka Circuit Park</Link> in Mie has a ride passport from ¥4,800 online for adults and ¥3,400 for children.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For animals, <Link href="/guides/attractions/higashiyama-zoo-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Higashiyama Zoo</Link> and Botanical Gardens is ¥500 for adults and free for junior high and younger; closed Mondays.
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
          heading="Guided Days and Park Bookings From Nagoya"
          intro="The Ghibli Park bus day, the ticket with a hotel night, the LEGOLAND hotel and the Takayama day. Durations, pick-up and inclusions are on each listing."
          tours={[ghibliParkNagoyaBusTour, ghibliParkTicketHotelPackage, legolandJapanHotelPackage, takayamaShirakawagoNagoyaDayTrip]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/ghibli-park-tickets", title: "Ghibli Park Tickets 2026: How to Buy, Prices & Release Dates" },
              { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?" },
              { href: "/guides/attractions/nagoya-castle-tickets", title: "Nagoya Castle Tickets 2026: Price, Hours & Can You Go Inside" },
              { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass" },
              { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tour (2027): Which Departure" },
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
            <h2 className={styles.ctaBannerTitle}>One day in the city, one day at a park</h2>
            <p className={styles.ctaBannerDesc}>
              Book two nights at Nagoya Station, settle Day 2 before the tickets go, and leave Day 1 for the castle and
              a hitsumabushi dinner.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={nagoyaParkStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Nagoya Station Hotels →
              </KlookLink>
              <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Ghibli Park Bus Day →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
