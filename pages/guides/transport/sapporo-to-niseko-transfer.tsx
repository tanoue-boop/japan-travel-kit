import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  hokkaidoPrivateCarCharterNiseko,
  japanWinterStayAreas,
  nisekoResortShuttleBus,
  nisekoTransferTripPrep,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Sapporo / New Chitose Airport to Niseko, added 28 Nov 2026 (task-jtk-20261128-02).
 *
 * How it differs from niseko-ski-tours: that page compares what to book at Niseko
 * (lift-and-bus tours, lessons, rental); this one is only the journey — every way
 * from Sapporo or New Chitose to the Niseko resorts in winter, with times, fares,
 * booking rules and operating dates.
 *
 * Read on 28 Nov 2026:
 *   nisekobus.co.jp/timetable/ and /uploads/2026冬-スキーバス.pdf  Niseko ski bus
 *     (Niseko Bus / Chuo Bus, reservation required) 12 Dec 2026 – 22 Mar 2027.
 *     New Chitose domestic terminal 10:00, 13:40, 14:40, 15:30 → Niseko Hirafu
 *     Welcome Center 13:33, 17:13, 18:13, 19:03 (rest stop at Kinoko Okoku). Hirafu
 *     → airport 8:00, 9:00, 10:00, 15:30 → 11:28, 12:28, 13:28, 18:58. Sapporo
 *     Station North Exit 7:50, 9:20 → Hirafu 10:56, 12:26 → Iroha 11:35, 13:05;
 *     Hirafu → Sapporo 14:39, 15:59 → Sapporo Station 17:45, 19:05. Fares Chitose–
 *     Niseko and Sapporo–Niseko: ¥6,000 one way (child ¥3,000), ¥10,000 return
 *     (child ¥5,000). Booking: Chuo Bus Sapporo Terminal 0570-200-600.
 *   nisekobus.co.jp/uploads/2026冬-高速ニセコ号_Compress-1.pdf  Chuo Bus Kosoku
 *     Niseko-go, winter timetable from 11 Dec 2026, no reservation, IC cards and
 *     contactless cards: Sapporo Station-mae 8:35, 10:35, 13:35 → Kutchan Jujigai
 *     11:14, 13:14, 16:14 → Niseko Iroha 11:47, 13:47, 16:47; Niseko → Sapporo
 *     10:08, 13:18, 15:48 → 13:23 (13:18 weekends), 16:33, 19:03. Fares from
 *     Sapporo: Kutchan ¥2,320, Hon-dori ¥2,560, Iroha ¥2,820.
 *   chuo-bus.co.jp/highway/ (Kosoku Niseko-go)  about 3 hr 05 min, 123 km, toilet on
 *     board, large bags in the trunk.
 *   access-n.jp/winter2026/skibus/detail/101chitose_rusutsu_niseko.html  Hokkaido
 *     Resort Liner (Hokkaido Access Network), airport → Niseko ¥6,000 (child ¥5,000),
 *     1 Dec 2026 – 30 Mar 2027, return 2 Dec 2026 – 31 Mar 2027, daily; about 2 hr
 *     30 min to Hirafu 1st car park when it runs direct, about 10 min more via
 *     Rusutsu; booking required; flight-to-bus 45 min domestic / 90 international;
 *     ski equipment plus one bag; cancellation 30% (7–2 days), 40% (day before), 50%
 *     (on the day), 100% (no-show).
 *   access-n.jp/winter2026/skibus/detail/sapporo_rusutsu_niseko.html  Sapporo hotels
 *     → Niseko ¥6,000, 2 Dec 2026 – 31 Mar 2027, daily.
 *   niseko.ne.jp/en/getting-to-niseko/  from New Chitose: direct bus 2.5 hrs ¥6,000
 *     booking required; train + local bus 3 hrs ¥6,200 no booking; rental car 2 hrs
 *     from ¥8,000/day; private transfer 2 hrs from ¥25,000.
 *   niseko.ne.jp/en/getting-to-niseko2/  Sapporo → Otaru about 32 min, Otaru →
 *     Niseko local about 90 min, "train services are limited"; buses and taxis from
 *     Kutchan or Niseko stations to the resorts; heavy snow may delay or cancel
 *     buses December–March; book the airport bus at least 3 days ahead, seats fill
 *     late December to early January; ski bus 3–3.5 hrs, private/rental 2–2.5 hrs.
 *   jrhokkaido.co.jp (IC card notice)  IC cards cannot be used to Kutchan or Niseko;
 *     buy a paper ticket.
 * No JR Sapporo–Kutchan fare is printed: JR Hokkaido's English fare table does not
 * list it. No Klook price.
 */

const CHECKED = checkedLabel("2026-11-28");

const ROUTE = "/guides/transport/sapporo-to-niseko-transfer";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const SKIBUS_URL = "https://www.nisekobus.co.jp/timetable/";
const KOSOKU_URL = "https://www.chuo-bus.co.jp/highway/?t=26&ope=list&o=1";
const LINER_URL = "https://www.access-n.jp/winter2026/skibus/detail/101chitose_rusutsu_niseko.html";
const LINER_SAPPORO_URL = "https://www.access-n.jp/winter2026/skibus/detail/sapporo_rusutsu_niseko.html";
const NU_URL = "https://www.niseko.ne.jp/en/getting-to-niseko/";
const NU_SAPPORO_URL = "https://www.niseko.ne.jp/en/getting-to-niseko2/";
const JR_IC_URL = "https://www.jrhokkaido.co.jp/CM/Info/notice_en/pdf/ic_card_202408_en.pdf";

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type ModeRow = { mode: string; time: string; fare: string; booking: string; season: string };

const modeRows: ModeRow[] = [
  {
    mode: "Best for most: ski bus (Hokkaido Resort Liner or Niseko Bus)",
    time: "About 2 hr 30 min airport → Hirafu (Resort Liner, direct); 3 hr 06 min Sapporo → Hirafu (Niseko Bus)",
    fare: "¥6,000 one way; ¥10,000 return on Niseko Bus",
    booking: "Required",
    season: "Resort Liner 1 Dec 2026 – 30 Mar 2027; Niseko Bus 12 Dec 2026 – 22 Mar 2027",
  },
  {
    mode: "Chuo Bus Kosoku Niseko-go (from Sapporo)",
    time: "2 hr 39 min to Kutchan, 3 hr 12 min to Annupuri / Iroha",
    fare: "¥2,320 to Kutchan, ¥2,820 to Iroha",
    booking: "Not taken; pay on board, IC cards accepted",
    season: "All year; winter timetable from 11 Dec 2026, 3 a day",
  },
  {
    mode: "JR via Otaru and Kutchan",
    time: "Sapporo → Otaru about 32 min, Otaru → Niseko about 90 min; about 3 hr from the airport with the bus on",
    fare: "About ¥6,200 from the airport with the local bus (Niseko United); the JR part is covered by the Hokkaido Rail Pass",
    booking: "Not needed; paper ticket (no IC card past Otaru)",
    season: "All year; few trains past Otaru",
  },
  {
    mode: "Private transfer",
    time: "About 2 hr from the airport; allow more on snowy roads",
    fare: "From ¥25,000 per vehicle (Niseko United)",
    booking: "Required",
    season: "All year",
  },
  {
    mode: "Rental car",
    time: "About 2 hr from the airport",
    fare: "From ¥8,000 a day, plus fuel",
    booking: "Required; winter tyres included",
    season: "All year",
  },
];

const busRows = [
  ["New Chitose (domestic) → Hirafu", "10:00, 13:40, 14:40, 15:30", "13:33, 17:13, 18:13, 19:03", "¥6,000"],
  ["Hirafu → New Chitose (domestic)", "8:00, 9:00, 10:00, 15:30", "11:28, 12:28, 13:28, 18:58", "¥6,000"],
  ["Sapporo Station North Exit → Hirafu", "7:50, 9:20", "10:56, 12:26 (Iroha 11:35, 13:05)", "¥6,000"],
  ["Hirafu → Sapporo Station", "14:39, 15:59", "17:45, 19:05", "¥6,000"],
  ["Sapporo Station-mae → Kutchan (Kosoku Niseko-go)", "8:35, 10:35, 13:35", "11:14, 13:14, 16:14 (Iroha 11:47, 13:47, 16:47)", "¥2,320 (¥2,820 to Iroha)"],
];

const faqItems = [
  {
    q: "How do I get from Sapporo to Niseko in winter?",
    a: `By ski bus: Niseko Bus leaves Sapporo Station's North Exit at 7:50 and 9:20 and reaches Hirafu in about 3 hours 6 minutes for ¥6,000, bookable from 12 December 2026 to 22 March 2027. Without a booking, Chuo Bus's Kosoku Niseko-go runs three times a day to Kutchan (2 hr 39 min, ¥2,320) and Annupuri. Checked ${CHECKED}.`,
  },
  {
    q: "Is there a direct bus from New Chitose Airport to Niseko?",
    a: "Yes, in winter only, and both need a booking: the Hokkaido Resort Liner (from 1 December 2026, about 2 hours 30 minutes to Hirafu when it runs direct) and Niseko Bus's ski bus (from 12 December 2026, four a day from the domestic terminal). Both are ¥6,000 one way. Leave 45 minutes after a domestic arrival and 90 after an international one.",
  },
  {
    q: "How long is the transfer to Niseko?",
    a: "About 2 hours by private car or rental car from New Chitose Airport, about 2.5 to 3.5 hours by ski bus depending on the stops, and about 3 hours by train and local bus. From Sapporo, the ski bus takes about 3 hours to Hirafu. Snow adds time: Niseko United warns that heavy snow can delay or cancel buses between December and March.",
  },
  {
    q: "Can I take the train from Sapporo to Niseko?",
    a: "Yes, but it is the slowest option: about 32 minutes to Otaru, then about 90 minutes on a local train to Niseko or Kutchan, and buses or taxis to the slopes. Trains past Otaru are infrequent and IC cards are not accepted, so buy a paper ticket. The Hokkaido Rail Pass covers it.",
  },
  {
    q: "How far ahead should I book the Niseko ski bus?",
    a: "Niseko United advises at least 3 days ahead, and earlier for late December to early January, when seats fill fastest. Hokkaido Access Network charges 30% to cancel from 7 to 2 days before, 40% the day before, 50% on the day and 100% for a no-show.",
  },
];

const TITLE = "Sapporo to Niseko in Winter 2026: Ski Bus, Train & Transfer";
const DESCRIPTION =
  "Sapporo or New Chitose to Niseko in winter: ¥6,000 ski buses (book ahead, about 2.5–3.5 hr), Chuo Bus to Kutchan ¥2,320, JR via Otaru, and private cars.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/niseko-lift-ticket", title: "Niseko Lift Ticket Prices" },
  { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours" },
  { href: "/guides/transport/new-chitose-airport-to-sapporo", title: "New Chitose Airport to Sapporo: Train vs Bus" },
  { href: "/guides/money/japan-ski-travel-insurance", title: "Ski & Snowboard Travel Insurance for Japan" },
  { href: "/guides/attractions/japan-ski-trip-itinerary", title: "Japan Ski Trip Itinerary" },
  { href: "/guides/attractions/rusutsu-lift-ticket", title: "Rusutsu Lift Ticket" },
  { href: "/guides/attractions/kiroro-lift-ticket", title: "Kiroro Lift Ticket" },
  { href: "/guides/transport", title: "More Transport Guides →" },
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

export default function SapporoToNisekoTransferPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Sapporo to Niseko", item: URL },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Sapporo to Niseko</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Sapporo to Niseko in Winter 2026: <br />Ski Bus, Train &amp; Private Transfer
          </h1>
          <p className={styles.heroSubtitle}>
            Every way from Sapporo or New Chitose Airport to the Niseko ski resorts — the booked ski buses, the
            year-round Chuo Bus, the train via Otaru and a private car — with winter times, fares and operating dates.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Winter 2026–27 timetables from the operators", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Airport → Niseko</p>
                <p className={styles.verdictStatValue}>Ski bus ~2.5 hr, ¥6,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Sapporo → Niseko</p>
                <p className={styles.verdictStatValue}>Ski bus ~3 hr, ¥6,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>No booking</p>
                <p className={styles.verdictStatValue}>Chuo Bus ¥2,320 to Kutchan</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              From <strong>New Chitose Airport to Niseko</strong>, the winter <strong>ski bus</strong> takes about{" "}
              <strong>2 hours 30 minutes</strong> to Hirafu for <strong>¥6,000</strong>, and must be booked; the
              Hokkaido Resort Liner runs from 1 December 2026 and Niseko Bus&apos;s ski bus from 12 December. From{" "}
              <strong>Sapporo to Niseko</strong>, Niseko Bus&apos;s ski bus takes about <strong>3 hours</strong> to Hirafu,
              also ¥6,000, while Chuo Bus&apos;s Kosoku Niseko-go needs no booking: <strong>2 hours 39 minutes</strong> to
              Kutchan for <strong>¥2,320</strong>. JR via Otaru takes about 3 hours from the airport with the local bus,
              and a private car about 2 hours from ¥25,000 per vehicle. Operators and Niseko United, checked {CHECKED}.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Comparing ski tours and lessons rather than the ride? See{" "}
              <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link>; lift prices are in{" "}
              <Link href="/guides/attractions/niseko-lift-ticket">Niseko lift ticket</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={nisekoResortShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Niseko shuttle bus →
              </KlookLink>
              <KlookLink href={hokkaidoPrivateCarCharterNiseko.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Private car to Niseko →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Every option</span>
          <h2 className={styles.sectionTitle}>How Do I Get from Sapporo to Niseko in Winter?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By a booked ski bus for most skiers: ¥6,000 to the hotel areas with skis in the trunk. One row per option,
            adult one-way fares; the first row is the answer.
          </p>
          <SimpleTable
            head={["Option", "Time", "Adult fare", "Booking", "Winter operation"]}
            rows={modeRows.map((r) => [r.mode, r.time, r.fare, r.booking, r.season])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28. Sources: {ext(LINER_URL, "Hokkaido Access Network, airport ↔ Rusutsu/Niseko")} and{" "}
            {ext(LINER_SAPPORO_URL, "Sapporo ↔ Rusutsu/Niseko")}; {ext(SKIBUS_URL, "Niseko Bus winter timetables")};{" "}
            {ext(KOSOKU_URL, "Hokkaido Chuo Bus, Kosoku Niseko-go")}; {ext(NU_URL, "Niseko United, getting to Niseko")} and{" "}
            {ext(NU_SAPPORO_URL, "from New Chitose / Sapporo")}; {ext(JR_IC_URL, "JR Hokkaido IC card notice")}. Child
            fares: ¥3,000 on Niseko Bus, ¥5,000 on the Resort Liner.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Airport direct</span>
          <h2 className={styles.sectionTitle}>Is There a Direct Bus from New Chitose Airport to Niseko?</h2>
          <p className={styles.bodyText}>
            Yes — two, both winter-only and both bookable only in advance. The <strong>Hokkaido Resort Liner</strong>{" "}
            (Hokkaido Access Network) runs daily from 1 December 2026 to 30 March 2027, ¥6,000 (child ¥5,000), and
            takes about 2 hours 30 minutes to the Hirafu 1st car park when it goes direct, about 10 minutes longer when
            it calls at Rusutsu first. <strong>Niseko Bus&apos;s ski bus</strong> runs from 12 December 2026 to 22 March
            2027, four a day from the domestic terminal, ¥6,000 one way or ¥10,000 return, with a rest stop on the way.
            Leave at least 45 minutes between a domestic landing and the bus, and 90 after an international one — the
            Resort Liner says it will not wait. Each carries ski equipment plus one other bag per person. Klook sells
            the same kind of seat as the <K href={nisekoResortShuttleBus.url}>Niseko shuttle bus</K>, from the airport or
            Sapporo.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>Winter bus times, 2026–27</h3>
          <SimpleTable head={["Route", "Departs", "Arrives", "Adult one way"]} rows={busRows} />
          <p className={styles.bodyText} style={note}>
            Last checked: 2026-11-28. Source: {ext(SKIBUS_URL, "Niseko Bus, 2026–27 ski bus and Kosoku Niseko-go timetables")}.
            Niseko Bus ski bus 12 Dec 2026 – 22 Mar 2027, booked through Chuo Bus Sapporo Terminal (0570-200-600);
            start and end dates move with the snow. Kosoku Niseko-go winter times from 11 Dec 2026; on weekends the
            first bus back reaches Sapporo at 13:18.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nisekoResortShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Book the Niseko shuttle →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book before you fly"
          heading="What Should You Book Before a Niseko Ski Trip?"
          intro="The bed decides the bus stop, so book the room, then the seat. Klook prices change by date, so open a listing for the figure on yours."
          items={nisekoTransferTripPrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Time</span>
          <h2 className={styles.sectionTitle}>How Long Is the Transfer to Niseko?</h2>
          <p className={styles.bodyText}>
            About 2 to 3.5 hours from New Chitose Airport, depending on how you go. A private car or a rental car is
            about 2 hours; the Resort Liner about 2 hours 30 minutes to Hirafu; Niseko Bus&apos;s airport ski bus 3
            hours 33 minutes to Hirafu with its rest stop; the train and local bus about 3 hours. From Sapporo, the ski
            bus reaches Hirafu in 3 hours 6 minutes, and the Kosoku Niseko-go reaches Kutchan in 2 hours 39 minutes.
            Niseko United warns that heavy snow may delay or cancel buses from December to March, and advises extra
            time on snowy roads for cars — so a same-day flight home is safest on an early bus. A{" "}
            <K href={hokkaidoPrivateCarCharterNiseko.url}>private car charter</K> leaves on your time rather than the
            timetable; Niseko United&apos;s guide price for a private transfer from the airport starts at ¥25,000 per
            vehicle.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokkaidoPrivateCarCharterNiseko.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Private car to Niseko →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>No booking</span>
          <h2 className={styles.sectionTitle}>Can I Get to Niseko Without Booking?</h2>
          <p className={styles.bodyText}>
            Yes, by Chuo Bus or by train. The <strong>Kosoku Niseko-go</strong> leaves Sapporo Station-mae at 8:35, 10:35
            and 13:35 all winter, takes no reservations, accepts IC cards and contactless cards, and reaches Kutchan
            (¥2,320) and then Niseko Annupuri and Iroha (¥2,820) — it does not stop at Hirafu, so Hirafu guests change at
            Kutchan for a local bus or a taxi. The <strong>train</strong> runs Sapporo to Otaru in about 32 minutes and
            then a local train about 90 minutes to Niseko, via Kutchan; trains past Otaru are few, and JR Hokkaido does
            not accept IC cards for journeys to Kutchan or Niseko, so buy a paper ticket. The{" "}
            <Link href="/guides/transport/hokkaido-rail-pass">Hokkaido Rail Pass</Link> covers the train. Arriving by air
            the day before?{" "}
            <Link href="/guides/transport/new-chitose-airport-to-sapporo">New Chitose Airport to Sapporo</Link> has the
            first leg.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>On the mountain</span>
          <h2 className={styles.sectionTitle}>What Should I Sort Out Before the Bus Arrives?</h2>
          <p className={styles.bodyText}>
            The lift pass, the rental and the insurance. Niseko United&apos;s day and multi-day prices are in{" "}
            <Link href="/guides/attractions/niseko-lift-ticket">Niseko lift ticket</Link>; lessons, rental and
            lift-and-bus day tours from Sapporo are compared in{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link>; and off-piste, rescue and
            equipment cover are in <Link href="/guides/money/japan-ski-travel-insurance">ski travel insurance for Japan</Link>.
            The same Resort Liner network also runs to Rusutsu — see{" "}
            <Link href="/guides/attractions/rusutsu-lift-ticket">Rusutsu lift ticket</Link> — and{" "}
            to <Link href="/guides/attractions/kiroro-lift-ticket">Kiroro</Link>, with its own winter ski bus from Sapporo.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={japanWinterStayAreas[7].url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Niseko hotels →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="Bus confirmations, snow notices and the hotel shuttle — get mobile data before you land for Niseko." />

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
            <h2 className={styles.ctaBannerTitle}>Sapporo to Niseko, booked before the snow</h2>
            <p className={styles.ctaBannerDesc}>
              Book the ski bus seat or a private car, then the room — winter seats fill from late December.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={nisekoResortShuttleBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Niseko shuttle bus →
              </KlookLink>
              <KlookLink href={japanWinterStayAreas[7].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Niseko hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
