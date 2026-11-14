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
import fares from "../../../data/jr-fares.json";
import {
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  inuyamaMeijiMuraMeitetsuPass,
  klookEsim,
  nagoyaCastleAfterHoursTour,
  nagoyaCastleKlookUrl,
  nagoyaCastleTripPrep,
  nagoyaParkStayAreas,
  nagoyaSamuraiInuyamaDayTour,
  shinkansenNagoyaKyoto,
  shinkansenNagoyaOsaka,
  shinkansenTokyoNagoya,
  takayamaShirakawagoNagoyaDayTrip,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Nagoya Castle tickets — price, hours, the closed keep, and how a Nagoya stop
 * fits between Tokyo and Kyoto. Added 14 Nov 2026 (task-jtk-20261114-02).
 *
 * Next to its neighbours:
 *  - tokyo-to-nagoya-shinkansen answers "how do I get to Nagoya";
 *  - ghibli-park-tickets / legoland-japan-tickets answer the two park days;
 *  - this page answers "what does Nagoya Castle cost, can I go in, and is the stop worth it".
 *
 * Official reads on 14 Nov 2026:
 *   nagoyajo.city.nagoya.jp/info/fee/   Fees changed 1 Oct 2026 (R8): adult ¥1,000 (¥900 for 30+,
 *                                       ¥800 for 100+); Nagoya residents 65+ ¥300; junior high and
 *                                       under free. Tokugawa-en combined ¥1,040 (cash only). Cash,
 *                                       cards, transit IC, e-money and QR (PayPay) at the counter;
 *                                       web tickets through asoview.
 *   nagoyajo.city.nagoya.jp/en/information/  9:00–16:30; Hommaru Palace and Nishinomaru Okura
 *                                       Museum last entry 16:00; closed 29 Dec – 1 Jan; Meijo Line
 *                                       Nagoyajo (M07). Palace about 10 min on foot from the Main or
 *                                       East Gate.
 *   nagoyajo.city.nagoya.jp/en/         "The tower keep and some other structures cannot be entered."
 *   nagoyajo.city.nagoya.jp/guide/tenshu/  Keep closed for its low earthquake resistance; no
 *                                       reopening date given. The city runs a wooden
 *                                       reconstruction project (/save/tenshu/).
 *   nagoyajo.city.nagoya.jp/info/faq/   1 h to 1 h 30 to see the grounds and the palace properly;
 *                                       you can still enter the castle with the keep closed; coin
 *                                       lockers and wheelchairs at the Main and East Gates.
 *   nagoya-info.jp (city tourism)       Nagoyajo Station Exit 7, 5 min; Atsuta Jingu: Jingu-nishi
 *                                       Exit 2, 7 min to the west gate, Meitetsu Jingu-mae 3 min;
 *                                       Osu Kannon: Osu Kannon Station Exit 2, 3 min; antique market
 *                                       on the 18th and 28th.
 *   inuyama-castle.jp                   ¥1,000 adult, ¥200 elementary and junior high; 9:00–17:00,
 *                                       last entry 16:30; closed 29–31 Dec; Meitetsu Nagoya →
 *                                       Inuyama about 25 min; Inuyama Station about 20 min on foot.
 *   smart-ex.jp reserved fare PDF       NOZOMI, regular season, as of 1 Apr 2025: Tokyo–Nagoya
 *                                       ¥11,100, Nagoya–Kyoto ¥5,710, Nagoya–Shin-Osaka ¥6,480.
 *   Klook rail pages (read by fetch)    Nagoya → Kyoto shortest 33 min; → Osaka (Shin-Osaka)
 *                                       shortest 47 min; 0 transfers.
 *
 * Carried with their own dates: Tokyo → Nagoya 1 h 26 min shortest (Klook rail page,
 * 28 Oct 2026, via tokyo-to-nagoya-shinkansen); Ghibli Park's direct bus 40 min / ¥1,200
 * (Meitetsu, 26 Oct 2026) and Tuesday closure (12 Nov 2026), via ghibli-park-tickets; the
 * stopover rule (JR Central, 13 Nov 2026). The Tokyo–Nagoya reference fare and minutes
 * come from data/jr-fares.json, the same source tokyo-to-nagoya-shinkansen uses.
 *
 * Not printed: Atsuta Jingu's own site was down for maintenance on 14 Nov 2026, so no
 * hours or fees for it; a keep completion date (none published); any Klook price.
 */

const ROUTE = "/guides/attractions/nagoya-castle-tickets";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-14");
const RAIL = checkedLabel("2026-10-28");
const PARKS = checkedLabel("2026-10-26");
const GHIBLI = checkedLabel("2026-11-12");

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const tokyoNagoya = fares.segments.find((s) => s.id === "tokyo-nagoya")!;

const ADULT = "¥1,000";
const INUYAMA = "¥1,000";
const SMART_EX_TOKYO = "¥11,100";
const SMART_EX_KYOTO = "¥5,710";
const SMART_EX_OSAKA = "¥6,480";

/** Table 1: price and hours — first row is the answer. */
const priceRows = [
  { item: "Adult admission (from 1 October 2026)", value: ADULT, note: "¥900 each for groups of 30+, ¥800 for 100+" },
  { item: "Junior high school students and younger", value: "Free", note: "No ticket needed for children up to junior high" },
  { item: "Nagoya residents aged 65+", value: "¥300", note: "Photo ID showing address and age required" },
  { item: "Opening hours", value: "9:00–16:30", note: "Hommaru Palace last entry 16:00 — about 10 minutes on foot from the gates" },
  { item: "Closed", value: "29 December – 1 January", note: "Open every other day of the year" },
  { item: "Main keep (tenshukaku)", value: "Closed inside", note: "Closed for low earthquake resistance; the city plans a wooden rebuild, no reopening date" },
  { item: "Nearest station", value: "Nagoyajo (Meijo Line, M07)", note: "Exit 7, about 5 minutes on foot. The station was called Shiyakusho until its renaming" },
  { item: "How to pay", value: "At the gate or online", note: "Cash, credit cards, transit IC cards, e-money and PayPay at the counter; web tickets through asoview" },
];

type Stop = { place: string; allow: string; getting: string; cost: string };

/** Table 2: half a day to a full day in Nagoya. */
const stopRows: Stop[] = [
  {
    place: "Nagoya Castle (grounds + Hommaru Palace)",
    allow: "1 h – 1 h 30 (the castle's own figure)",
    getting: "Meijo Line to Nagoyajo, Exit 7, 5 min on foot",
    cost: `${ADULT} adult; junior high and under free`,
  },
  {
    place: "Atsuta Jingu",
    allow: "About 1 hour (planning allowance)",
    getting: "Meijo Line to Jingu-nishi, Exit 2, 7 min to the west gate; or Meitetsu Jingu-mae, 3 min",
    cost: "Not printed — the shrine's site was offline when checked",
  },
  {
    place: "Osu Kannon and the Osu shopping streets",
    allow: "1–2 hours (planning allowance)",
    getting: "Tsurumai Line to Osu Kannon, Exit 2, 3 min; or Kamimaezu, 2 min to the arcades",
    cost: "Street and temple grounds; antique market on the 18th and 28th",
  },
  {
    place: "Ghibli Park (Nagakute)",
    allow: "A full day — timed Grand Warehouse entry",
    getting: "Meitetsu direct bus from Nagoya Station, 40 min, ¥1,200 adult",
    cost: "Tickets sold ahead only; closed Tuesdays",
  },
  {
    place: "Inuyama Castle (original keep)",
    allow: "Half a day including the trains",
    getting: "Meitetsu Nagoya → Inuyama about 25 min, then about 20 min on foot",
    cost: `${INUYAMA} adult, ¥200 elementary & junior high; 9:00–17:00, last entry 16:30`,
  },
];

/** Table 3: getting to Nagoya — first row is the busiest leg. */
const railRows = [
  {
    route: "Tokyo → Nagoya",
    time: `1 h 26 min fastest NOZOMI (Klook, ${RAIL}); about ${Math.floor(tokyoNagoya.minutes / 60)} h ${tokyoNagoya.minutes % 60} min by HIKARI`,
    fare: `${SMART_EX_TOKYO} smartEX NOZOMI reserved; ${yen(tokyoNagoya.fareYen)} reference fare`,
    note: "JR Pass covers the HIKARI, not the NOZOMI",
  },
  {
    route: "Nagoya → Kyoto",
    time: "33 min fastest, no change",
    fare: `${SMART_EX_KYOTO} smartEX NOZOMI reserved`,
    note: "The natural next stop west",
  },
  {
    route: "Nagoya → Shin-Osaka",
    time: "47 min fastest, no change",
    fare: `${SMART_EX_OSAKA} smartEX NOZOMI reserved`,
    note: "Separate tickets for each leg if you get off in Nagoya",
  },
];

const faqItems = [
  {
    q: "How much are Nagoya Castle tickets?",
    a: `${ADULT} for an adult from 1 October 2026, and free for junior high school students and younger. Nagoya residents aged 65 and over pay ¥300. Buy at the Main or East Gate counter (cash, cards, transit IC or PayPay) or as a web ticket through asoview. Read on nagoyajo.city.nagoya.jp ${OWN}.`,
  },
  {
    q: "Can you go inside Nagoya Castle?",
    a: "You can enter the castle grounds and go inside the rebuilt Hommaru Palace, but not the main keep. The keep is closed because of its low earthquake resistance, the city is planning to rebuild it in wood, and no reopening date has been published.",
  },
  {
    q: "What are Nagoya Castle's opening hours?",
    a: "9:00 to 16:30, with last entry to the Hommaru Palace at 16:00. It is closed from 29 December to 1 January. The palace is about 10 minutes on foot from the Main or East Gate, so arrive at the gate by about 15:45 to see it.",
  },
  {
    q: "How long do you need at Nagoya Castle?",
    a: "1 hour to 1 hour 30 minutes to see the grounds and the Hommaru Palace properly — that is the castle's own figure. Add about 10 minutes each way from Nagoyajo Station.",
  },
  {
    q: "What is the nearest station to Nagoya Castle?",
    a: "Nagoyajo Station on the Meijo subway line (M07), Exit 7, about 5 minutes on foot. The station used to be called Shiyakusho (City Hall), and older maps still use that name.",
  },
  {
    q: "Is Nagoya worth a stop between Tokyo and Kyoto?",
    a: `For a half day, yes: the NOZOMI reaches Nagoya in about 1 h 26 min from Tokyo and goes on to Kyoto in 33 minutes, so the castle and Osu fit between two trains. Buy separate Tokyo → Nagoya and Nagoya → Kyoto tickets — a shinkansen ticket cannot be broken for a stopover. Stay a night if you want Ghibli Park or Inuyama.`,
  },
  {
    q: "Do I need to book Nagoya Castle tickets in advance?",
    a: "No. Tickets are sold at the gate every open day and there is no timed entry. A web ticket through asoview only saves the queue at the counter. The parts worth booking are a guided tour, a Ghibli Park ticket or an Inuyama day.",
  },
  {
    q: "Is Inuyama Castle better than Nagoya Castle?",
    a: `They are different visits. Inuyama has an original keep you can climb (${INUYAMA} adult, 9:00–17:00) and is about 25 minutes from Nagoya on the Meitetsu line plus about 20 minutes on foot. Nagoya Castle has the rebuilt Hommaru Palace but its keep is closed. With one free day, Nagoya Castle at 9:00 and Inuyama in the afternoon fit together.`,
  },
];

const TITLE = "Nagoya Castle Tickets 2026: Price, Hours & Can You Go Inside";
const DESCRIPTION =
  "Nagoya Castle tickets: ¥1,000 adults, junior high and under free. Nagoya Castle price, Nagoya Castle hours (9:00–16:30), the closed keep and a Nagoya stop.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const thStyle = { fontSize: "0.88rem" } as const;
const noteStyle = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function NagoyaCastleTicketsPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Nagoya Castle Tickets", item: URL },
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
          <span className={styles.breadCurrent}>Nagoya Castle Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Nagoya Castle Tickets 2026:<br />Price, Hours and Whether You Can Go Inside
          </h1>
          <p className={styles.heroSubtitle}>
            The castle is a walk-up ticket with a closed keep and an open palace. What turns a Nagoya stop into
            a good day is what you pair it with.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices from 1 Oct 2026", "Half-day and full-day plans", "Shinkansen times on to Kyoto & Osaka"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Adult ticket</p>
                <p className={styles.verdictStatValue}>{ADULT} (junior high &amp; under free)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>9:00–16:30, closed 29 Dec – 1 Jan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Inside the keep?</p>
                <p className={styles.verdictStatValue}>No — closed; the palace is open</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Station</p>
                <p className={styles.verdictStatValue}>Nagoyajo (Meijo Line), Exit 7, 5 min</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Nagoya Castle tickets</strong> cost <strong>{ADULT}</strong> for an adult from 1 October
              2026, and children up to junior high school get in <strong>free</strong>. The castle is open{" "}
              <strong>9:00–16:30</strong> (last entry to the Hommaru Palace at 16:00) and closes only from 29
              December to 1 January. The nearest station is <strong>Nagoyajo</strong> on the Meijo subway line
              (formerly Shiyakusho), 5 minutes from Exit 7. The main keep is <strong>closed inside</strong> for its
              low earthquake resistance while the city plans a wooden rebuild, with no reopening date; the rebuilt
              Hommaru Palace is open. Allow 1 to 1.5 hours. Read on nagoyajo.city.nagoya.jp {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={nagoyaSamuraiInuyamaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Nagoya → Inuyama Castle Tour →
              </KlookLink>
              <KlookLink href={nagoyaParkStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hotels by Nagoya Station →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price &amp; hours</span>
          <h2 className={styles.sectionTitle}>How Much Are Nagoya Castle Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {ADULT} for an adult since the fee change on 1 October 2026, and nothing for children up to junior
            high. There is no timed entry and no date on the ticket, so you can buy at the gate on the day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Nagoya Castle price & hours", "Official figure", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={thStyle}>{row.item}</td>
                      <td className={styles.tdPrice} style={thStyle}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.nagoyajo.city.nagoya.jp/info/fee/" target="_blank" rel="noopener">nagoyajo.city.nagoya.jp/info/fee</a>,{" "}
            <a href="https://www.nagoyajo.city.nagoya.jp/en/information/" target="_blank" rel="noopener">visitor information</a>,{" "}
            <a href="https://www.nagoya-info.jp/spot/detail/1/" target="_blank" rel="noopener">nagoya-info.jp (Nagoya City tourism)</a>.
            The Tokugawa-en combined ticket is ¥1,040, cash only. No Klook price appears on this page.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Are Nagoya Castle&apos;s Hours?
          </h3>
          <p className={styles.bodyText}>
            9:00 to 16:30 every day except 29 December to 1 January. The Hommaru Palace and the Nishinomaru Okura
            Treasure Museum take their last visitors at 16:00, and the palace is about 10 minutes on foot from the
            Main or East Gate — so be at the gate by about 15:45 if the palace is the reason you came.
          </p>
        </section>

        {/* Inside */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The keep</span>
          <h2 className={styles.sectionTitle}>Can You Go Inside Nagoya Castle?</h2>
          <p className={styles.bodyText}>
            Into the grounds and the palace, yes; into the main keep, no. The castle&apos;s own site states that
            &ldquo;the tower keep and some other structures cannot be entered&rdquo;: the concrete keep rebuilt
            after the war was closed because of its low earthquake resistance, and the city is running a project
            to reconstruct it in wood. No reopening date is published. The castle&apos;s FAQ answers the obvious
            follow-up directly — you can still enter, for the <strong>Hommaru Palace</strong>, the Important
            Cultural Property buildings, the gardens and the stone walls. The keep is seen from outside.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            If climbing an original keep matters to you, that is <strong>Inuyama Castle</strong>, about 25 minutes
            from Nagoya on the Meitetsu line: {INUYAMA} for an adult, 9:00–17:00, last entry 16:30. Its own site
            shows a live waiting time for the keep — 70 minutes when read on Saturday 14 November 2026 — so
            arrive near opening on a weekend.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nagoyaSamuraiInuyamaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Inuyama day tour from Nagoya →
            </KlookLink>
            <KlookLink href={inuyamaMeijiMuraMeitetsuPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Inuyama + Meiji-Mura + Meitetsu pass →
            </KlookLink>
          </div>
        </section>

        {/* How to buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How to buy</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book Nagoya Castle Tickets in Advance?</h2>
          <p className={styles.bodyText}>
            No. Tickets are sold at the Main Gate and East Gate counters every open day, and the counter takes
            cash, major credit cards, transit IC cards, e-money and PayPay. The castle also sells web tickets
            through asoview, which only saves the counter queue. Coin lockers and a limited number of wheelchairs
            (not reservable) are at both gates. The castle&apos;s own admission ticket is not linked from this
            page; Klook&apos;s{" "}
            <KlookLink href={nagoyaCastleKlookUrl} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Nagoya Castle page
            </KlookLink>{" "}
            lists the tours that include it.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Is Worth Booking Ahead?
          </h3>
          <p className={styles.bodyText}>
            The parts with limited places. A guided after-hours tour of the Hommaru Palace runs only on the dates
            its listing offers; Ghibli Park tickets are released on the 10th of the month two months ahead at 14:00 JST
            and are never sold at the gate; and guided days to Inuyama or Shirakawa-go run on fixed departures
            with their own cancellation deadlines on each listing. Read the cancellation terms before you pay
            — a stop that depends on a train connection is the one most likely to change.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nagoyaCastleAfterHoursTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hommaru Palace after-hours tour →
            </KlookLink>
            <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ghibli Park tickets →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What Should I Book for a Nagoya Stop?"
          intro="The castle is a walk-up ticket, so the bookings are the day around it: an Inuyama tour or pass, a hotel by the station, and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={nagoyaCastleTripPrep}
        />

        {/* How long */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Half day or full day</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need at Nagoya Castle?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            1 hour to 1 hour 30 minutes for the grounds and the Hommaru Palace, on the castle&apos;s own figure.
            A half day adds Atsuta Jingu or Osu; a full day adds Inuyama Castle or Ghibli Park instead.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Time to allow", "Getting there", "Cost / note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stopRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={thStyle}>{row.place}</td>
                      <td style={thStyle}>{row.allow}</td>
                      <td style={thStyle}>{row.getting}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked {OWN}:{" "}
            <a href="https://www.nagoyajo.city.nagoya.jp/info/faq/" target="_blank" rel="noopener">Nagoya Castle FAQ</a>,{" "}
            <a href="https://www.nagoya-info.jp/spot/detail/11/" target="_blank" rel="noopener">Atsuta Jingu</a> and{" "}
            <a href="https://www.nagoya-info.jp/spot/detail/13/" target="_blank" rel="noopener">Osu Kannon</a> on nagoya-info.jp,{" "}
            <a href="https://inuyama-castle.jp/" target="_blank" rel="noopener">inuyama-castle.jp</a>. Ghibli Park bus
            from Meitetsu ({PARKS}) and closing day from the park ({GHIBLI}), as in our{" "}
            <Link href="/guides/attractions/ghibli-park-tickets">Ghibli Park tickets guide</Link>. &ldquo;Planning
            allowance&rdquo; times are not official figures.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            What Is the Best Order for a Day in Nagoya?
          </h3>
          <p className={styles.bodyText}>
            Castle first, at 9:00: the palace closes its door at 16:00, and the Meijo Line loops on to Jingu-nishi
            for Atsuta Jingu and Kamimaezu for Osu, so the afternoon runs south on one subway line. For a family
            day, swap the afternoon for{" "}
            <Link href="/guides/attractions/legoland-japan-tickets">LEGOLAND Japan</Link>, 24 minutes from Nagoya
            Station on the Aonami Line. Ghibli Park and Inuyama each want their own day.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Ghibli Park bus tour →
            </KlookLink>
            <KlookLink href={takayamaShirakawagoNagoyaDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Takayama &amp; Shirakawa-go from Nagoya →
            </KlookLink>
          </div>
        </section>

        {/* Worth a stop */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Is Nagoya Worth a Stop Between Tokyo and Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For half a day, yes. Nagoya is about 1 h 26 min from Tokyo by NOZOMI and 33 minutes short of Kyoto,
            so a morning train, the castle and Osu, and an evening train on to Kyoto fit in one day. Buy two
            tickets: JR Central allows a stopover on the basic fare, but the shinkansen&apos;s limited express
            ticket cannot be broken, and smartEX allows none.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Fare (adult, one way)", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {railRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={thStyle}>{row.route}</td>
                      <td style={thStyle}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            smartEX fares: regular season, from{" "}
            <a href="https://smart-ex.jp/en/product/plan/service/" target="_blank" rel="noopener">smart-ex.jp</a>&apos;s
            reserved-seat table (as of 1 April 2025), read {OWN}; ¥200 less off-peak, more in peak seasons. Kyoto
            and Shin-Osaka times from Klook&apos;s rail pages, {OWN}. The {yen(tokyoNagoya.fareYen)} and HIKARI time
            are this site&apos;s reference values, the same ones used in our{" "}
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen">Tokyo to Nagoya shinkansen guide</Link>, which
            also covers the stopover rule (JR Central, read 13 Nov 2026).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoNagoya.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Nagoya shinkansen →
            </KlookLink>
            <KlookLink href={shinkansenNagoyaKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nagoya → Kyoto shinkansen →
            </KlookLink>
            <KlookLink href={shinkansenNagoyaOsaka.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Nagoya → Shin-Osaka shinkansen →
            </KlookLink>
          </div>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.25rem" }}>
            Where Do I Leave My Luggage?
          </h3>
          <p className={styles.bodyText}>
            The castle has coin lockers at the Main and East Gates. With a suitcase, leaving it at Nagoya Station
            before the subway saves carrying it through the grounds and the palace. On a full itinerary,
            our <Link href="/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary">Tokyo, Kyoto and Osaka 7-day
            itinerary</Link> shows where a Nagoya half day fits.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Should I Stay a Night in Nagoya?</h2>
          <p className={styles.bodyText}>
            Only if the stop includes Ghibli Park, Inuyama or a mountain day to Takayama and Shirakawa-go. The
            castle alone fits between two trains. For a night, stay by Nagoya Station: the shinkansen, the subway
            to Nagoyajo and the Meitetsu trains to Inuyama all leave from there. If a tour or a Ghibli Park slot
            fixes the date, book the room at the same time.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for a Night in Nagoya"
          intro="Room prices and availability change by date, so each area links to Klook's hotel search for it."
          areas={nagoyaParkStayAreas}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Subway changes, the castle&apos;s cashless counter and a tour&apos;s meeting message all run on your
            phone.{" "}
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
          heading="Tours for a Nagoya Stop"
          intro="The castle after hours, Inuyama's original keep, Ghibli Park and the mountains. Durations, meeting points and inclusions are on each listing."
          tours={[nagoyaCastleAfterHoursTour, nagoyaSamuraiInuyamaDayTour, ghibliParkNagoyaBusTour, takayamaShirakawagoNagoyaDayTrip]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/transport/tokyo-to-nagoya-shinkansen", title: "Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass" },
              { href: "/guides/attractions/ghibli-park-tickets", title: "Ghibli Park Tickets 2026: How to Book, Prices & Sale Dates" },
              { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?" },
              { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama and Shirakawa-go Tour (2027): Which Departure" },
              { href: "/guides/attractions/tokyo-kyoto-osaka-7-day-itinerary", title: "Tokyo Kyoto Osaka Itinerary (2026): 7 Days in Japan" },
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
            <h2 className={styles.ctaBannerTitle}>Buy the castle at the gate; book the day around it</h2>
            <p className={styles.ctaBannerDesc}>
              {ADULT} at the counter, palace by 16:00 — then Inuyama&apos;s original keep, Ghibli Park or a night
              by Nagoya Station before the train on to Kyoto.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={nagoyaSamuraiInuyamaDayTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Inuyama Day Tour →
              </KlookLink>
              <KlookLink href={nagoyaParkStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Nagoya Station Hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
