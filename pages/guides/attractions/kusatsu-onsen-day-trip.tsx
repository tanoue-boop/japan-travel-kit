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
  jrTokyoWidePass,
  klookEsim,
  kusatsuDayBusTourTokyo,
  kusatsuHotels,
  kusatsuOvernightBusTour,
  kusatsuStayAreas,
  kusatsuTripPrep,
  kusatsuYoshinoyaKlook,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kusatsu Onsen as a day trip from Tokyo. Added 18 Nov 2026 (task-jtk-20261118-02).
 *
 * Next to its neighbours: hakone-day-trip-from-tokyo is the 90-minute loop by train;
 * ginzan-onsen-tour is the Yamagata gas-lamp street, a shinkansen plus a bus away;
 * kinosaki-onsen-day-trip is the walk between baths out of Osaka. This page is the
 * Yubatake town from Tokyo — four hours by highway bus, so the question is day or night.
 *
 * Official reads on 18 Nov 2026:
 *   time.jrbuskanto.co.jp/bk03010.html  Joshu Yumeguri (timetable revised 15 Dec 2025):
 *                                       Basta Shinjuku 8:05 → Kusatsu Onsen BT 12:08,
 *                                       9:05 → 13:10, 10:05 → 14:13; back 14:00 → 18:08,
 *                                       16:00 → 20:08, 17:30 → 21:35 (Shinjuku). Also
 *                                       Tokyo Stn Yaesu South departures. Fares to Kusatsu
 *                                       Onsen BT from 1 Dec 2026: C ¥3,700, B ¥3,800,
 *                                       A ¥4,000, S ¥4,300, on board ¥4,500, Tokuwari
 *                                       ¥2,800–¥3,900 (limited seats); child half
 *   jrbuskanto.co.jp (fare PDF)         Naganohara-Kusatsuguchi → Kusatsu Onsen BT ¥900
 *                                       from 1 Dec 2026
 *   jreast.co.jp kusatsu_shima           Ueno → Naganohara-Kusatsuguchi 2h20m, all reserved
 *   timetables.jreast.co.jp/2611         Kusatsu-Shima 1: Ueno 10:00 → 12:18;
 *                                       Kusatsu-Shima 4: 15:43 → Ueno 18:09
 *   kusatsu-onsen.ne.jp/access/train.php JR bus 25 min; Tokyo → Karuizawa Hokuriku
 *                                       Shinkansen about 1h10m, then Kusakaru / Seibu bus
 *                                       1h18m–1h55m
 *   kusatsu-onsen.ne.jp/kankou/          Otaki-no-yu ¥1,200 / ¥600, 9:00–21:00;
 *                                       Goza-no-yu ¥900 / ¥450, 8:00–21:00 Dec–Mar;
 *                                       Shirahata-no-yu 8:00–23:00, Chiyo-no-yu 6:00–23:00,
 *                                       Jizo-no-yu 8:00–22:00, all free
 *   onsen-kusatsu.com                    Sainokawara ¥800 / ¥400, 9:00–20:00 Dec–Mar,
 *                                       2nd Wednesday closes 17:00; three-bath pass
 *                                       ¥2,100 / ¥1,050, no expiry; maintenance closures
 *                                       7–9 Dec (Sainokawara), 10–11 Dec (Goza-no-yu),
 *                                       14–18 Dec (Otaki-no-yu) 2026
 *   kusatsu-onsen.ne.jp/netsunoyu        Yumomi show ¥700 / ¥350, 15:30 16:00 16:30 all
 *                                       year; mornings 10:00–11:00 in winter (2025-26:
 *                                       1 Dec – 28 Feb)
 *   kusatsu-onsen.ne.jp/event/2029.php   Yubatake tree and illumination 21 Nov 2026 –
 *                                       23 Feb 2027, 17:00–24:00
 *   kusatsu-onsen.ne.jp (portal)         Route 292 Shiga-Kusatsu road closed for winter
 *
 * Not printed: the JR fare and limited-express charge, any Klook price.
 */

const ROUTE = "/guides/attractions/kusatsu-onsen-day-trip";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-18");

const BUS_FROM = "¥3,700";
const SAINO = "¥800";
const OTAKI = "¥1,200";
const GOZA = "¥900";
const TEGATA = "¥2,100";
const LOCAL_BUS = "¥900";

/** Table 1: getting there — first row is the answer. */
const accessRows = [
  {
    route: "Highway bus (JR Bus Joshu Yumeguri): Basta Shinjuku → Kusatsu Onsen Bus Terminal",
    time: "About 4 hours (e.g. 8:05 → 12:08)",
    fare: `${BUS_FROM}–¥4,300 adult by fare class from 1 Dec 2026; ¥4,500 paid on board; child half`,
    note: "No change of vehicle — it stops at the terminal in the middle of town. Also leaves from Tokyo Station (Yaesu South)",
    source: "time.jrbuskanto.co.jp",
  },
  {
    route: "Train + bus: Ueno → Naganohara-Kusatsuguchi (Ltd. Exp. Kusatsu-Shima), then JR bus",
    time: "2h20m train + 25 min bus (e.g. Ueno 10:00 → 12:18)",
    fare: `JR fare + limited express charge; bus ${LOCAL_BUS} from 1 Dec 2026`,
    note: "All seats reserved. Faster on the rails, but a change to the bus at the station",
    source: "jreast.co.jp; kusatsu-onsen.ne.jp",
  },
  {
    route: "Shinkansen + bus: Tokyo → Karuizawa (Hokuriku Shinkansen), then Kusakaru / Seibu bus",
    time: "About 1h10m + 1h18m–1h55m by bus",
    fare: "Shinkansen fare + bus fare (see each operator)",
    note: "Most trains of the three; pairs with a Karuizawa stop on the way",
    source: "kusatsu-onsen.ne.jp",
  },
  {
    route: "Join-in coach tour from Ikebukuro (Klook)",
    time: "Full day, as listed",
    fare: "On the listing — bath ticket included",
    note: "One booking for the bus both ways and a bath",
    source: "Klook listing",
  },
];

/** Table 2: a timed day trip on the highway bus. */
const dayRows = [
  { time: "8:05", what: "Joshu Yumeguri leaves Basta Shinjuku (seat reserved)", note: "Rest stop at Kamisato SA on the way" },
  { time: "12:08", what: "Arrive at Kusatsu Onsen Bus Terminal; walk down to Yubatake", note: "Lunch in the streets around the square" },
  { time: "13:00", what: `Goza-no-yu, on Yubatake (${GOZA})`, note: "Rebuilt Edo–Meiji-style bathhouse; 8:00–21:00 in winter" },
  { time: "14:00", what: `Sainokawara Park and the open-air bath (${SAINO})`, note: "On foot from Yubatake; 9:00–20:00 in winter" },
  { time: "15:30", what: "Yumomi show at Netsu-no-yu (¥700)", note: "Shows at 15:30, 16:00 and 16:30; tickets sold 30 min before, cash or PayPay" },
  { time: "16:30", what: "Yubatake at dusk — the illumination is lit from 17:00", note: "21 Nov 2026 – 23 Feb 2027" },
  { time: "17:30", what: "Joshu Yumeguri 18 leaves the Bus Terminal", note: "Basta Shinjuku 21:35. Earlier: 14:00 → 18:08, 16:00 → 20:08" },
];

/** Table 3: the day-use baths. */
const bathRows = [
  { bath: "Three-bath pass (Chotto Santo-meguri tegata)", hours: "Each bath's own hours", price: `${TEGATA} adult, ¥1,050 child`, note: "One entry each to Otaki-no-yu, Goza-no-yu and Sainokawara; no expiry; sold at all three" },
  { bath: "Sainokawara open-air bath", hours: "9:00–20:00 (1 Dec – 31 Mar), last entry 19:30", price: `${SAINO} / ¥400`, note: "Closes 17:00 on the 2nd Wednesday (9 Dec, 13 Jan, 10 Feb, 10 Mar). Closed 7–9 Dec 2026" },
  { bath: "Otaki-no-yu", hours: "9:00–21:00, last entry 20:00", price: `${OTAKI} / ¥600`, note: "Restaurant, café and rest rooms; private baths by reservation. Closed 14–18 Dec 2026" },
  { bath: "Goza-no-yu", hours: "8:00–21:00 (1 Dec – 31 Mar), last entry 20:30", price: `${GOZA} / ¥450`, note: "On Yubatake. Closed 10–11 Dec 2026" },
  { bath: "Shirahata-no-yu", hours: "8:00–23:00", price: "Free", note: "Free public bath; closed for cleaning at times, mostly mornings" },
  { bath: "Chiyo-no-yu", hours: "6:00–23:00", price: "Free", note: "Free public bath; cleaning times mostly mornings" },
  { bath: "Jizo-no-yu", hours: "8:00–22:00", price: "Free", note: "Free public bath in the Ura-Kusatsu area; cleaning times mostly mornings" },
];

const faqItems = [
  {
    q: "Can you do Kusatsu Onsen as a day trip from Tokyo?",
    a: `Yes, with about five hours in town. The JR Bus Joshu Yumeguri leaves Basta Shinjuku at 8:05 and reaches Kusatsu Onsen Bus Terminal at 12:08; the 17:30 back gets to Shinjuku at 21:35. That is enough for two baths, Yubatake and the yumomi show. Read on JR Bus Kanto's timetable ${OWN}.`,
  },
  {
    q: "How do you get from Tokyo to Kusatsu Onsen?",
    a: `By the Joshu Yumeguri highway bus from Basta Shinjuku or Tokyo Station, about 4 hours to the middle of town, ${BUS_FROM}–¥4,300 from 1 December 2026. Or the all-reserved Limited Express Kusatsu-Shima from Ueno to Naganohara-Kusatsuguchi (2h20m) and a 25-minute JR bus (${LOCAL_BUS}). A third route is the Hokuriku Shinkansen to Karuizawa and a bus of 1h18m–1h55m.`,
  },
  {
    q: "How much is the Kusatsu Onsen bus from Tokyo?",
    a: `From 1 December 2026, JR Bus Kanto's fares from Tokyo or Shinjuku to Kusatsu Onsen Bus Terminal are ${BUS_FROM} (C fare), ¥3,800 (B), ¥4,000 (A) and ¥4,300 (S), depending on the departure; ¥4,500 if you pay on board. Limited Tokuwari seats are ¥2,800–¥3,900. Children pay half.`,
  },
  {
    q: "How much are the baths in Kusatsu?",
    a: `Sainokawara open-air bath is ${SAINO}, Goza-no-yu ${GOZA} and Otaki-no-yu ${OTAKI} for adults. The three-bath pass is ${TEGATA} with no expiry. Shirahata-no-yu, Chiyo-no-yu and Jizo-no-yu are free public baths. Read on the official sites ${OWN}.`,
  },
  {
    q: "Is Kusatsu worth it in winter?",
    a: "Yes, if you plan for snow. Yubatake is lit from 17:00 to midnight between 21 November 2026 and 23 February 2027, and the open-air bath stays open to 20:00. The trade-offs: the baths open later from 1 December (Sainokawara 9:00, Goza-no-yu 8:00), the Shiga-Kusatsu road over the mountains is closed for winter, and buses can run late on snowy roads.",
  },
  {
    q: "Bus or train to Kusatsu for a day trip?",
    a: "The bus. It leaves Shinjuku at 8:05 and stops in the middle of Kusatsu at 12:08, with returns until 17:30. On the train, Kusatsu-Shima 1 (Ueno 10:00 → 12:18) and Kusatsu-Shima 4 (Naganohara-Kusatsuguchi 15:43 → Ueno 18:09) leave only a couple of hours in town once the 25-minute bus each way is counted.",
  },
  {
    q: "Are any baths closed in December 2026?",
    a: "Yes, for maintenance: Sainokawara 7–9 December, Goza-no-yu 10–11 December and Otaki-no-yu 14–18 December 2026. Sainokawara also closes at 17:00 on the second Wednesday of each month. The three free public baths close for cleaning at times, mostly in the morning.",
  },
  {
    q: "Kusatsu or Hakone for an onsen day trip from Tokyo?",
    a: "Hakone is the easy day: about 80 minutes from Shinjuku by Romancecar and a loop of ropeways and boats. Kusatsu is about four hours each way, but it is the hot-spring town itself — Yubatake, free public baths and the yumomi show. For Kusatsu, a night is the better trip if you can give it one.",
  },
];

const TITLE = "Kusatsu Onsen Day Trip from Tokyo: Bus, Baths & Winter";
const DESCRIPTION =
  "Kusatsu Onsen Day Trip from Tokyo: Tokyo to Kusatsu Onsen is 4 hours on the Kusatsu Onsen bus from Shinjuku, from ¥3,700, plus bath prices and a day plan.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function KusatsuOnsenDayTripPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kusatsu Onsen Day Trip", item: URL },
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
          <span className={styles.breadCurrent}>Kusatsu Onsen Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kusatsu Onsen Day Trip from Tokyo (2026–27): <br />Kusatsu Onsen Bus, Baths and Winter
          </h1>
          <p className={styles.heroSubtitle}>
            The hot-spring town built around Yubatake, the steaming field of spring water in its main square —
            four hours from Shinjuku by bus, so the real question is a long day or one night.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official bus times & fares", "Bath prices and hours", "Timed day trip"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Highway bus from Shinjuku</p>
                <p className={styles.verdictStatValue}>About 4 hours, from {BUS_FROM}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Train + bus from Ueno</p>
                <p className={styles.verdictStatValue}>2h20m + 25 min bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time in town on a day trip</p>
                <p className={styles.verdictStatValue}>About 5 hours by bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Open-air bath</p>
                <p className={styles.verdictStatValue}>Sainokawara, {SAINO}</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Kusatsu Onsen day trip from Tokyo</strong> works by bus: the JR Bus{" "}
              <strong>Joshu Yumeguri</strong> takes about <strong>4 hours</strong> from Basta Shinjuku to Kusatsu
              Onsen Bus Terminal (8:05 → 12:08) for <strong>{BUS_FROM}–¥4,300</strong> from 1 December 2026. By rail,
              the Limited Express Kusatsu-Shima takes <strong>2h20m</strong> from Ueno to Naganohara-Kusatsuguchi,
              then a 25-minute bus. In town: <strong>Yubatake</strong>, the <strong>Sainokawara</strong> open-air bath
              ({SAINO}), Goza-no-yu ({GOZA}), three free public baths and the yumomi show. A day trip is possible, with
              about five hours there — but with eight hours on the road, one night is the better trip. Read on
              official sites {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kusatsuDayBusTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Kusatsu Day Bus Tour →
              </KlookLink>
              <KlookLink href={kusatsuHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Kusatsu Onsen Ryokan →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What to Book for Kusatsu Onsen"
          intro="The day tour or the ryokan, a pass if Kusatsu is one of several JR days, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={kusatsuTripPrep}
        />

        <EsimCtaTop />

        {/* Day trip */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day or night</span>
          <h2 className={styles.sectionTitle}>Can You Do Kusatsu Onsen as a Day Trip From Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, by the highway bus: 8:05 from Basta Shinjuku arrives at 12:08, and the last bus back leaves Kusatsu at
            17:30 for Shinjuku at 21:35. That gives about five hours — two paid baths, a free one, Yubatake and the
            yumomi show. The train is worse for a day: Kusatsu-Shima 1 leaves Ueno at 10:00, and Kusatsu-Shima 4 back
            leaves Naganohara-Kusatsuguchi at 15:43.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Time", "What", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayRows.map((row) => (
                    <tr key={row.time}>
                      <td className={styles.tdProvider} style={thStyle}>{row.time}</td>
                      <td style={thStyle}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}: bus times from{" "}
            <a href="http://time.jrbuskanto.co.jp/bk03010.html" target="_blank" rel="noopener">JR Bus Kanto&apos;s timetable</a>{" "}
            (revised 15 December 2025); bath hours from{" "}
            <a href="https://onsen-kusatsu.com/sainokawara/guide/" target="_blank" rel="noopener">onsen-kusatsu.com</a>{" "}
            and{" "}
            <a href="https://www.kusatsu-onsen.ne.jp/kankou/1090.php" target="_blank" rel="noopener">kusatsu-onsen.ne.jp</a>;
            show times from{" "}
            <a href="https://www.kusatsu-onsen.ne.jp/netsunoyu/show.html" target="_blank" rel="noopener">Netsu-no-yu</a>.
            The clock times between arrival and the bus home are a plan, not an official schedule.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Tour or bus on your own?</strong> The join-in tour from Ikebukuro puts the coach both ways and a
            bath ticket on one booking. On your own, the bus seat is the thing to fix first — Tokuwari fares are limited
            seats on some departures. Check the snow and cancellation terms on either before paying.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kusatsuDayBusTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Day bus tour with bath ticket →
            </KlookLink>
            <KlookLink href={kusatsuOvernightBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Bus tour with one night →
            </KlookLink>
          </div>
        </section>

        {/* Access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get From Tokyo to Kusatsu Onsen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Kusatsu Onsen bus is the direct way: the Joshu Yumeguri runs from Basta Shinjuku and Tokyo Station to
            the bus terminal in the middle of town in about four hours. By rail, the Kusatsu-Shima limited express takes
            2h20m from Ueno to Naganohara-Kusatsuguchi, then a 25-minute JR bus. A third route goes by Hokuriku
            Shinkansen to Karuizawa and a 1h18m–1h55m bus.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare", "Notes", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
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
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="http://time.jrbuskanto.co.jp/bk03010.html" target="_blank" rel="noopener">time.jrbuskanto.co.jp</a>,{" "}
            <a href="https://www.jrbuskanto.co.jp/jwp/topics/topics01/naganohara.html" target="_blank" rel="noopener">jrbuskanto.co.jp</a>{" "}
            (local bus fare from 1 December 2026),{" "}
            <a href="https://www.jreast.co.jp/en/multi/traininformation/kusatsu_shima/" target="_blank" rel="noopener">jreast.co.jp</a>,{" "}
            <a href="https://www.kusatsu-onsen.ne.jp/access/train.php" target="_blank" rel="noopener">kusatsu-onsen.ne.jp/access</a>.
            The JR fare is not printed here. Until 30 November 2026 the bus fares to Kusatsu are ¥3,700–¥4,100.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            How Much Is the Kusatsu Onsen Bus From Tokyo?
          </h3>
          <p className={styles.bodyText}>
            From 1 December 2026: {BUS_FROM} (C fare), ¥3,800 (B), ¥4,000 (A) or ¥4,300 (S) from Tokyo, Shinjuku,
            Nakano-sakaue or Nerima to Kusatsu Onsen Bus Terminal — which fare applies depends on the departure — or
            ¥4,500 if you pay on board. Tokuwari fares of ¥2,800–¥3,900 are limited seats on some buses, sold online or
            at a ticket office only. Children pay half. Book on JR Bus&apos;s Kosoku Bus Net.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Does the JR TOKYO Wide Pass Help?
          </h3>
          <p className={styles.bodyText}>
            Only on the Karuizawa route, and only if Kusatsu is one of several JR days. JR East sells the pass at
            ¥16,000 for three days; the Klook listing names Karuizawa among what it reaches. The bus from Karuizawa to
            Kusatsu is not JR, and the highway bus is not covered at all. Which other day trips make up the
            difference is worked out in our{" "}
            <Link href="/guides/transport/tokyo-wide-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR Tokyo Wide Pass
            </Link>{" "}
            guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check the JR TOKYO Wide Pass →
            </KlookLink>
          </div>
        </section>

        {/* Baths */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The baths</span>
          <h2 className={styles.sectionTitle}>How Much Are the Baths in Kusatsu Onsen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The three big day-use baths cost {SAINO} (Sainokawara open-air bath), {GOZA} (Goza-no-yu) and {OTAKI}{" "}
            (Otaki-no-yu) for adults; the three-bath pass is <strong>{TEGATA}</strong> and never expires. The town&apos;s
            public baths — Shirahata-no-yu, Chiyo-no-yu and Jizo-no-yu — are free.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Bath", "Hours (winter)", "Price (adult / child)", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bathRows.map((row) => (
                    <tr key={row.bath}>
                      <td className={styles.tdProvider} style={thStyle}>{row.bath}</td>
                      <td style={thStyle}>{row.hours}</td>
                      <td className={styles.tdPrice} style={thStyle}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://onsen-kusatsu.com/sainokawara/guide/" target="_blank" rel="noopener">onsen-kusatsu.com (Sainokawara)</a>,{" "}
            <a href="https://onsen-kusatsu.com/tickets/" target="_blank" rel="noopener">onsen-kusatsu.com (pass)</a>,{" "}
            <a href="https://www.kusatsu-onsen.ne.jp/kankou/1092.php" target="_blank" rel="noopener">Otaki-no-yu</a>,{" "}
            <a href="https://www.kusatsu-onsen.ne.jp/kankou/1090.php" target="_blank" rel="noopener">Goza-no-yu</a>,{" "}
            <a href="https://www.kusatsu-onsen.ne.jp/kankou/1097.php" target="_blank" rel="noopener">Shirahata-no-yu</a>.
            Child prices apply from age 3 to primary school. From 1 April the Sainokawara and Goza-no-yu open at 7:00.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Is the Three-Bath Pass Worth It?
          </h3>
          <p className={styles.bodyText}>
            Only if you will use all three: it saves ¥800 against paying ¥2,900 separately. On a five-hour day trip, two
            of the three plus a free bath is the more realistic plan — and the pass has no expiry, so the third can wait
            for a night in town.
          </p>
        </section>

        {/* Winter */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>Is Kusatsu Worth It in Winter?</h2>
          <p className={styles.bodyText}>
            Yes — with snow on the roofs and the open-air bath steaming, winter is when Kusatsu looks most like its
            pictures. Yubatake has a tree and illumination from <strong>21 November 2026 to 23 February 2027</strong>,
            lit 17:00 to midnight, so a day visitor on the 17:30 bus sees only the first half hour. From 1 December the
            baths open later (Sainokawara 9:00, Goza-no-yu 8:00), and Route 292 over the Shiga-Kusatsu pass is closed
            for winter, so Kusatsu cannot be combined with Shiga Kogen by road. Read on{" "}
            <a href="https://www.kusatsu-onsen.ne.jp/event/2029.php" target="_blank" rel="noopener">kusatsu-onsen.ne.jp</a>, {OWN}.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Should You Wear in Kusatsu in Winter?
          </h3>
          <p className={styles.bodyText}>
            Warm layers you can take off fast and shoes with grip — you change in and out at every bath, and the walks
            between them are outdoors in snow season. Bring a small towel; Sainokawara sells its own if you forget.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            When Is the Yumomi Show?
          </h3>
          <p className={styles.bodyText}>
            At Netsu-no-yu on Yubatake, six times a day: 15:30, 16:00 and 16:30 all year, plus three morning shows that
            move to 10:00, 10:30 and 11:00 in winter (the 2025–26 winter timetable ran 1 December to 28 February). ¥700
            for adults, ¥350 for primary-school children; tickets go on sale 30 minutes before each show, cash or PayPay,
            no reservations.
          </p>
        </section>

        {/* Which onsen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Which onsen</span>
          <h2 className={styles.sectionTitle}>Kusatsu, Hakone or Ginzan Onsen From Tokyo?</h2>
          <p className={styles.bodyText}>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo">Hakone</Link> is the easy day trip — about 80
            minutes from Shinjuku by Romancecar, with ropeways and a lake cruise. Kusatsu is the onsen town itself: Yubatake, free public
            baths and the yumomi show, at four hours each way.{" "}
            <Link href="/guides/attractions/ginzan-onsen-tour">Ginzan Onsen</Link> is the snow-and-gas-lamp street in
            Yamagata, further still. From Osaka, the equivalent walk between baths is{" "}
            <Link href="/guides/attractions/kinosaki-onsen-day-trip">Kinosaki Onsen</Link>.
          </p>
        </section>

        {/* Ryokan */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Should You Stay a Night in Kusatsu?</h2>
          <p className={styles.bodyText}>
            If you can, yes. A night takes eight hours of bus off a single day and gives you the lit Yubatake and an
            evening at the baths, which stay open to 20:00–21:00 (the free ones later). Fix the room first, then the
            bus seat for the same dates. Klook prices change by date, so open a listing for the figure on yours.
          </p>
        </section>

        <KlookStayAreas
          heading="Kusatsu Onsen Ryokan on Klook"
          intro="The town-wide hotel search, a small ryokan, and a bus tour that includes the night."
          areas={kusatsuStayAreas}
        />

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Is Kusatsu OK With Kids?</h2>
          <p className={styles.bodyText}>
            Yes at the big baths, which all sell child tickets (ages 3 to primary school): ¥400 at Sainokawara, ¥450 at
            Goza-no-yu, ¥600 at Otaki-no-yu. Check each ryokan&apos;s age
            rules — the Yoshinoya listing on Klook, for one, does not accept children. Highway bus fares for children are
            half.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Bus QR tickets, return times and snow notices all reach you on your phone.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
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
          heading="Kusatsu Tours and Ryokan on Klook"
          intro="A day coach from Ikebukuro, the same with one night, and a small ryokan. Times, inclusions and room details are on each listing."
          tours={[kusatsuDayBusTourTokyo, kusatsuOvernightBusTour, kusatsuYoshinoyaKlook, kusatsuHotels]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip From Tokyo (2026): Timed Itinerary, Cost and Tours" },
              { href: "/guides/attractions/ginzan-onsen-tour", title: "Ginzan Onsen Tour (2026–27): Day Trip, Winter and Gas Lamps" },
              { href: "/guides/attractions/kinosaki-onsen-day-trip", title: "Kinosaki Onsen Day Trip: From Osaka, Bath Pass & Ryokan" },
              { href: "/guides/attractions/jigokudani-snow-monkey-tour", title: "Jigokudani Snow Monkey Tour" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-6h6v6" />
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
            <h2 className={styles.ctaBannerTitle}>A long day at Yubatake, or a night of baths</h2>
            <p className={styles.ctaBannerDesc}>
              Book the coach day with its bath ticket — or a ryokan, and see the square lit after dark.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kusatsuDayBusTourTokyo.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Day Tour →
              </KlookLink>
              <KlookLink href={kusatsuHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kusatsu Ryokan →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
