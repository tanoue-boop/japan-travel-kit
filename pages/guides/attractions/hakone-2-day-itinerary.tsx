import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  hakone2DayTripPrep,
  hakoneFreepass,
  hakoneGoraKadan,
  hakoneHotels,
  hakoneLoopBusTour,
  hakoneOpenAirMuseumTicket,
  hakoneYoshiikeRyokan,
  romancecarShinjukuHakoneYumoto,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import HotelStayBlock from "../../../components/HotelStayBlock";

/**
 * Hakone 2-day itinerary, added 21 Nov 2026 (task-jtk-20261121-01).
 *
 * How it differs from its neighbours — this page is the one-night, two-day route:
 *  - hakone-day-trip-from-tokyo is the same loop squeezed into one day, back the same night
 *  - hakone-ryokan-private-onsen is the choice of inn, room bath by room bath
 *  - hakone-free-pass is the ticket: prices, coverage, where to buy
 * The Freepass figures here are the ones on hakone-free-pass, re-read today.
 *
 * Every figure below was read on 21 Nov 2026:
 *  - Freepass ¥7,100 / ¥1,600 (2 days from Shinjuku), ¥7,500 (3 days), ¥6,000 from Odawara,
 *    Romancecar +¥1,200 / +¥600, about 80 minutes direct, Odakyu's ¥9,500 worked example:
 *    odakyu-global.com/passes/hakone-freepass/ and hakonenavi.jp free_pass page
 *  - the loop from Shinjuku ¥8,322 in IC-card fares without the pass (¥10,622 with the
 *    Romancecar), ¥7,100 with it (¥9,400 with the Romancecar), ¥1,222 saved: Hakone Navi 4252
 *  - ropeway ¥2,000 / cruise ¥1,700 one way since 1 Oct 2025: Odakyu Hakone fare notice PDF
 *  - Romancecar timetable (first trains out, last trains back): odakyu-global.com/passes/romancecar/
 *  - Day 1 / Day 2 time guide (Tozan Train approx. 40 min, Gora → Owakudani approx. 30 min,
 *    Owakudani 30–60 min, Hakone Shrine approx. 60 min and a 10-minute walk from Moto-Hakone,
 *    Moto-Hakone → Hakone-Yumoto bus approx. 40 min, the luggage service): Odakyu's own
 *    hakonetrip.odakyu-global.com Hakone 2-day itinerary
 *  - ropeway boarding hours, approx. 15 min per section, suspension causes: hakonenavi.jp
 *    ropeway page; maintenance closures 7–24 Dec 2026 and 12 Jan – 26 Feb 2027 with
 *    replacement buses: Odakyu Hakone notice of July 2026 (PDF linked from hakonenavi.jp)
 *  - cruise 25–35 min one way, winter timetable 1 Dec – 19 Mar, fog/wind; Tozan Bus lines
 *    and times to Togendai / Moto-Hakone: hakonenavi.jp cruise page
 *  - Hakone Open-Air Museum ¥2,000 (¥1,800 online), 9:00–17:00, 365 days: hakone-oam.or.jp
 *  - Pola Museum of Art ¥2,200, 9:00–17:00, free shuttle 8 min from Gora, closed 1 Dec 2026
 *    and 8–26 Apr 2027: polamuseum.or.jp/en/info/ and /en/info/access/
 */
const CHECKED_ISO = "2026-11-21";
const CHECKED = checkedLabel(CHECKED_ISO);

const ODAKYU_PASS_URL = "https://odakyu-global.com/passes/hakone-freepass/";
const NAVI_PASS_URL = "https://www.hakonenavi.jp/international/en/discount_passes/free_pass";
const ROMANCECAR_URL = "https://odakyu-global.com/passes/romancecar/";
const ITINERARY_URL = "https://hakonetrip.odakyu-global.com/feature/hakone-2-day-itinerary/";
const LOOP_URL = "https://www.hakonenavi.jp/international/en/article/4252";
const FARE_NOTICE_URL = "https://www.hakonenavi.jp/international/en/wp-content/uploads/sites/2/2025/09/re_price202510.pdf";
const ROPEWAY_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-ropeway";
const MAINTENANCE_URL = "https://www.hakonenavi.jp/_wp/wp-content/uploads/2025/10/4531bb77512201beed24664cf5b3381e.pdf";
const CRUISE_URL = "https://www.hakonenavi.jp/international/en/transportation/hakone-kankosen";
const STATUS_URL = "https://www.hakonenavi.jp/international/en/status_information";
const OAM_URL = "https://www.hakone-oam.or.jp/en/info/";
const POLA_URL = "https://www.polamuseum.or.jp/en/info/";
const POLA_ACCESS_URL = "https://www.polamuseum.or.jp/en/info/access/";

const PASS_2_DAY = "¥7,100";
const PASS_3_DAY = "¥7,500";
const PASS_ODAWARA = "¥6,000";
const ROMANCECAR = "¥1,200";
const LOOP_REGULAR = "¥8,322";
const LOOP_SAVING = "¥1,222";
const ROPEWAY = "¥2,000";
const CRUISE = "¥1,700";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

// (1) The two days. Row 1 is the answer; each row names the Klook booking it needs, if any.
const dayRows: ReactNode[][] = [
  [
    "The plan in one line",
    "Day 1: the loop. Day 2: two museums, then Tokyo",
    "Freepass covers every ride except the Romancecar seat",
    "Ryokan, Romancecar seat, Freepass",
  ],
  ["Day 1 · 08:00 → 09:24 (weekends) / 08:11 → 09:53 (weekdays)", "Shinjuku → Hakone-Yumoto, Romancecar", "approx. 80–90 min", "Romancecar seat"],
  ["Day 1 · on arrival", "Hand your bags to the luggage service at Hakone-Yumoto Station, sent to your inn", "—", "—"],
  ["Day 1 · late morning", "Hakone Tozan Train, Hakone-Yumoto → Gora", "approx. 40 min to Chokoku-no-Mori, Gora is the next stop", "Freepass"],
  ["Day 1 · midday", "Cable car and Hakone Ropeway, Gora → Sounzan → Owakudani", "approx. 30 min", "Freepass"],
  ["Day 1 · lunch", "Owakudani (volcanic valley, black eggs)", "30–60 min", "—"],
  ["Day 1 · early afternoon", "Hakone Ropeway, Owakudani → Ubako → Togendai", "approx. 30 min (15 + 15)", "Freepass"],
  ["Day 1 · afternoon", "Lake Ashi cruise (pirate ship), Togendai → Moto-Hakone or Hakone-machi", "approx. 25–35 min", "Freepass"],
  ["Day 1 · afternoon", "Hakone Shrine and the lakeside torii, 10 min on foot from Moto-Hakone", "approx. 60 min", "—"],
  ["Day 1 · evening", "Hakone Tozan Bus back to Hakone-Yumoto (or on to your inn); onsen and dinner", "approx. 35–40 min", "Ryokan"],
  ["Day 2 · 9:00", "Hakone Open-Air Museum, 2 min on foot from Chokoku-no-Mori", "90–120 min", "Open-Air Museum ticket"],
  ["Day 2 · late morning", "Free shuttle bus Gora → Pola Museum of Art (every 30 min from 9:15)", "8 min", "—"],
  ["Day 2 · midday", "Pola Museum of Art (Sengokuhara), with a restaurant and café on site", "open 9:00–17:00, last entry 16:30", "—"],
  ["Day 2 · afternoon", "Shuttle back to Gora, Tozan Train down to Hakone-Yumoto, collect your bags", "8 min + approx. 40 min", "Freepass"],
  ["Day 2 · by 19:50 / 19:52", "Hakone-Yumoto → Shinjuku, Romancecar (last train weekdays / weekends)", "approx. 80–96 min on the timetable", "Romancecar seat"],
];

// (2) Freepass against single tickets — the same official figures as hakone-free-pass.
const passRows: ReactNode[][] = [
  [`Two days on the Freepass from Shinjuku: ${PASS_2_DAY}`, `Day 1's loop alone is ${LOOP_REGULAR} in single fares`, `${LOOP_SAVING} saved on Day 1; Day 2's rides add nothing`],
  ["The loop from Shinjuku without the pass (Odakyu return, Tozan Train, cable car, ropeway, cruise, bus)", LOOP_REGULAR, "Hakone Navi total, IC-card fares"],
  ["The same loop with the Freepass", PASS_2_DAY, `${LOOP_SAVING} cheaper`],
  ["With the Romancecar both ways: without / with the pass", "¥10,622 / ¥9,400", "Hakone Navi; Odakyu's own example at station prices is ¥9,500"],
  ["Inside that total: Hakone Ropeway, Sounzan → Togendai, one way", ROPEWAY, "Fare since 1 Oct 2025"],
  ["Inside that total: Lake Ashi cruise, Togendai → Moto-Hakone / Hakone-machi, one way", CRUISE, "Fare since 1 Oct 2025"],
  ["Romancecar seat, Shinjuku ⇄ Hakone-Yumoto, each way", `${ROMANCECAR} (child ¥600)`, "Not included in any Freepass"],
  ["A third day", `${PASS_3_DAY} for 3 days`, "¥400 more than the 2-day pass"],
  ["Arriving by shinkansen at Odawara instead", `${PASS_ODAWARA} for 2 days`, "Hakone only, no Odakyu return to Shinjuku"],
];

// (3) What stops, and when — only what the operators publish.
const closureRows: ReactNode[][] = [
  ["Short answer", "The ropeway and the boat are the two that stop; trains, buses and museums carry on", "Check Hakone Navi's live status on the morning of Day 1"],
  ["Hakone Ropeway — weather", "Stops in winds of 30 m/s or more, extreme weather or mechanical trouble", "Boarding 9:00–17:00 Feb–Nov, 9:00–16:15 Dec–Jan"],
  ["Hakone Ropeway — maintenance, Owakudani ⇄ Sounzan", "Closed 7–24 December 2026 (18 days)", "Replacement bus about every 15 min, approx. 10 min; the Freepass is valid on it"],
  ["Hakone Ropeway — maintenance, Togendai ⇄ Ubako ⇄ Owakudani", "Closed 12 January – 26 February 2027 (46 days)", "Replacement bus about every 15 min, approx. 15 min; the Freepass is valid on it"],
  ["Lake Ashi cruise", "Departure time or destination can change, or sailings stop, in heavy fog or strong wind", "Winter timetable 1 Dec – 19 Mar; some sailings take longer"],
  ["Hakone Tozan Bus", "Runs, but traffic can delay it and a full bus may not let you on", "Leave margin before the last Romancecar"],
  ["Pola Museum of Art", "Closed 1 December 2026 and 8–26 April 2027, shuttle bus included", "Otherwise open every day, except in bad weather"],
  ["Hakone Open-Air Museum", "Open 365 days a year", "9:00–17:00, last entry 16:30"],
];

const faqItems = [
  {
    q: "Is 2 days enough for Hakone?",
    a: `Yes, for the classic sights. Day 1 covers the loop — Tozan Train, cable car, ropeway over Owakudani, the Lake Ashi cruise and Hakone Shrine — and Day 2 the Hakone Open-Air Museum and the Pola Museum of Art before the Romancecar home. Odakyu's own 2-day plan allows about 5 hours on Day 1 and 7–8 hours on Day 2, lunch not included. A third day costs ¥400 more on the Freepass (${PASS_3_DAY}). Checked ${CHECKED}.`,
  },
  {
    q: "How long does it take to get from Shinjuku to Hakone?",
    a: `About 80 minutes direct from Shinjuku to Hakone-Yumoto on the Odakyu Romancecar, all seats reserved, for a ${ROMANCECAR} seat ticket on top of the Freepass (¥600 for a child). On the timetable checked ${CHECKED}, the first weekend train leaves Shinjuku at 07:00 and arrives at 08:26, and Odakyu's 2-day plan allows about 90 minutes. The ordinary Odakyu trains the Freepass covers take longer and usually mean a change at Odawara.`,
  },
  {
    q: "Is the Hakone Freepass worth it for 2 days?",
    a: `Yes. The 2-day pass from Shinjuku is ${PASS_2_DAY}, and Hakone Navi (Odakyu Hakone's own site) puts the Day 1 loop from Shinjuku at ${LOOP_REGULAR} in single IC-card fares, so the pass saves ${LOOP_SAVING} on the first day and the Day 2 Tozan Train and buses ride free. The Romancecar seat (${ROMANCECAR} each way) is extra either way. Checked ${CHECKED}.`,
  },
  {
    q: "Where should I stay for a Hakone overnight trip from Tokyo?",
    a: "Hakone-Yumoto or Gora. Hakone-Yumoto is where the Romancecar stops, so arrival and departure with bags are simplest; Gora is at the top of the Tozan Train, next to the cable car for the loop and one stop from the Open-Air Museum for Day 2. Lake Ashi inns put you by the boat but further from both. Rooms with their own open-air bath are compared in our Hakone ryokan with private onsen guide.",
  },
  {
    q: "What if the Hakone Ropeway is closed?",
    a: `Take the Hakone Tozan Bus to the lake instead: from Hakone-Yumoto, the T Line reaches Togendai in about 40 minutes and the H Line Moto-Hakone in about 40, both on the Freepass. If the closure is only for the day, swap the days and do the museums first. The ropeway's planned maintenance closures are 7–24 December 2026 (Owakudani–Sounzan) and 12 January – 26 February 2027 (Togendai–Owakudani), with replacement buses that accept the Freepass. Checked ${CHECKED}.`,
  },
  {
    q: "Can I send my luggage ahead in Hakone?",
    a: "Yes. Odakyu's own 2-day plan uses the Hakone Luggage Transport Service: hand your bags in at the counter inside Hakone-Yumoto Station on Day 1 and they go to your inn; on Day 2 the inn sends them back and you collect them at Hakone-Yumoto between 1:30 PM and 6:30 PM for same-day delivery. Availability and cut-off times vary by season, so use it early in the day.",
  },
  {
    q: "What time is the last Romancecar back to Shinjuku?",
    a: `From Hakone-Yumoto, 19:50 on weekdays (arriving Shinjuku 21:26) and 19:52 at weekends and on holidays (arriving 21:25), on Odakyu's timetable read on ${CHECKED}. Book the seat with your dates: the Pola Museum closes at 17:00 and its last shuttle to Gora leaves at 16:50, so there is plenty of margin.`,
  },
  {
    q: "Is a Hakone 2 day itinerary worth it in winter?",
    a: "Yes, with two adjustments. The ropeway's last boarding moves to 16:15 in December and January, and the Lake Ashi cruise runs a winter timetable from 1 December to 19 March on which some sailings take longer, so start the loop in the morning. Check the ropeway maintenance dates above before you pick your days.",
  },
];

// The primary query leads the title, H1 and description word for word.
const TITLE = "Hakone 2 Day Itinerary (2026): Loop, Ryokan Night & Freepass";
const DESCRIPTION =
  "Hakone 2 Day Itinerary for a Hakone overnight trip from Tokyo: what to do in Hakone in 2 days, a timed Hakone itinerary and the ¥7,100 Freepass.";
const ROUTE = "/guides/attractions/hakone-2-day-itinerary";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
                  >
                    {cell}
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

function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function Hakone2DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
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
                { "@type": "ListItem", position: 4, name: "Hakone 2 Day Itinerary", item: `https://www.japan-travel-kit.com${ROUTE}` },
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
          <span className={styles.breadCurrent}>Hakone 2 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hakone 2 Day Itinerary (2026): <br />The Loop, a Ryokan Night &amp; the Museums
          </h1>
          <p className={styles.heroSubtitle}>
            A Hakone overnight trip from Tokyo, timed from the operators&apos; own pages: what to do in Hakone in 2
            days, where to sleep, what the Freepass saves, and what to do when the ropeway stops.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official Odakyu times and fares", "Ropeway closures 2026–27"].map((t) => (
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

        {/* The answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The best <strong>Hakone 2 day itinerary</strong> starts with the Odakyu Romancecar from Shinjuku to
            Hakone-Yumoto, <strong>about 80 minutes direct</strong> for a {ROMANCECAR} seat ticket, on a{" "}
            <strong>{PASS_2_DAY} two-day Hakone Freepass</strong> that covers the Odakyu return and every ride in
            Hakone. <strong>Day 1</strong> is the loop: the Hakone Tozan Train to Gora (about 40 minutes), the cable
            car and ropeway up to Owakudani (about 30 minutes), the ropeway down to Togendai, the Lake Ashi pirate
            ship to Moto-Hakone (25–35 minutes) and the bus back — {LOOP_REGULAR} in single fares, so the pass has
            paid for itself by the evening. <strong>Day 2</strong> is the Hakone Open-Air Museum (¥2,000, from 9:00)
            and the Pola Museum of Art (¥2,200, a free 8-minute shuttle from Gora), then the Romancecar home; the
            last one leaves Hakone-Yumoto at 19:50 on weekdays. All figures were checked on Odakyu&apos;s and the
            museums&apos; own sites on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            This page is the one-night, two-day route. If you only have one day, the{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>
              Hakone day trip from Tokyo
            </Link>{" "}
            fits the same loop into a single day; for the inn itself, our{" "}
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>
              Hakone ryokan with private onsen
            </Link>{" "}
            guide compares rooms bath by bath; and the ticket — prices, coverage, where to buy — is on the{" "}
            <Link href="/guides/attractions/hakone-free-pass" style={linkStyle}>
              Hakone Freepass
            </Link>{" "}
            page.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinjuku → Hakone-Yumoto</p>
                <p className={styles.verdictStatValue}>approx. 80 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Freepass, 2 days</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 1 loop, single fares</p>
                <p className={styles.verdictStatValue}>{LOOP_REGULAR}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Romancecar seat</p>
                <p className={styles.verdictStatValue}>+{ROMANCECAR} each way</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              Book the night first — it is the part that fills up — then the Romancecar seats for both days. Ride the
              loop on Day 1 while the weather is known, and keep the museums, which do not stop for wind, for Day 2.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Check Hakone ryokan on Klook →
              </KlookLink>
              <KlookLink href={romancecarShinjukuHakoneYumoto.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Romancecar seats →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What Should You Book Before Your Hakone Overnight Trip?"
          intro="The night, the Day 2 museum, data for the live status page, the Romancecar seats and the pass. Klook prices change by date, so open a listing for the figure on your days."
          items={hakone2DayTripPrep}
        />

        <EsimCtaTop />

        {/* (1) The two-day timetable */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day by day</span>
          <h2 className={styles.sectionTitle}>What to Do in Hakone in 2 Days: The Hakone Itinerary, Hour by Hour</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Day 1 is the full loop from Hakone-Yumoto to Lake Ashi and back; Day 2 is two museums near Gora and an
            evening train to Tokyo. The ride times are Odakyu&apos;s and the operators&apos; own figures; the clock
            times are an example, built on the first morning Romancecars.
          </p>
          <Table head={["When", "Where and how", "Time", "Book ahead"]} rows={dayRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} — <Source href={ITINERARY_URL}>Odakyu HAKONE TRIP, Hakone 2-day itinerary</Source>,{" "}
            <Source href={ROMANCECAR_URL}>Odakyu Romancecar timetable</Source>,{" "}
            <Source href={ROPEWAY_URL}>Hakone Ropeway (Hakone Navi)</Source>,{" "}
            <Source href={CRUISE_URL}>Hakone Sightseeing Cruise (Hakone Navi)</Source>,{" "}
            <Source href={OAM_URL}>Hakone Open-Air Museum</Source>,{" "}
            <Source href={POLA_ACCESS_URL}>Pola Museum of Art access</Source>. Romancecar times are from the timetable
            in force since 14 March 2026; Odakyu gives about 80 minutes direct on its Freepass page and allows about 90
            in its own 2-day plan.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={romancecarShinjukuHakoneYumoto.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Romancecar seats for your dates →
            </KlookLink>
            <KlookLink href={hakoneOpenAirMuseumTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Day 2: Open-Air Museum ticket →
            </KlookLink>
          </div>
        </section>

        {/* Is 2 days enough */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How long</span>
          <h2 className={styles.sectionTitle}>Is 2 Days Enough for Hakone?</h2>
          <p className={styles.bodyText}>
            Yes, for the classic Hakone sights: two days is enough for the full loop and two museums without
            rushing. Odakyu&apos;s own 2-day plan budgets about 5 hours of sightseeing on Day 1 and 7–8 hours on Day
            2, lunch not included. One day can hold the loop, but not the museums and an onsen evening as well. A
            third day costs only ¥400 more on the Freepass ({PASS_3_DAY}).
          </p>
          <p className={styles.bodyText}>
            If Hakone is one stop on a longer trip, our{" "}
            <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>
              Tokyo 7 day itinerary
            </Link>{" "}
            shows where it sits in a week. If Mt. Fuji is the other overnight you are weighing, the{" "}
            <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" style={linkStyle}>
              Kawaguchiko ryokan with a Mt. Fuji view
            </Link>{" "}
            guide covers the lake on the other side of the mountain, and a{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>
              Mt. Fuji day tour from Tokyo
            </Link>{" "}
            does it without a night away.
          </p>
        </section>

        {/* Best order */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The loop</span>
          <h2 className={styles.sectionTitle}>What Is the Best Order for the Hakone Loop?</h2>
          <p className={styles.bodyText}>
            Counter-clockwise from Hakone-Yumoto: up on the Tozan Train to Gora, the cable car to Sounzan, the
            ropeway over Owakudani to Togendai, the boat across Lake Ashi to Moto-Hakone, and the bus back down. It
            is the order Odakyu&apos;s own plans use, and it puts the ropeway — the leg that stops for wind and has
            the earliest close, 17:00 (16:15 in December and January) — in the middle of the day. The ropeway runs
            a gondola about every minute, roughly 15 minutes per section, and you can get off at Owakudani and
            board again on the same ticket.
          </p>
          <p className={styles.bodyText}>
            The loop also works clockwise (bus to Moto-Hakone first), which suits an inn by Lake Ashi. On a 2-day
            trip the more useful choice is which day: ride it on Day 1 and you still have Day 2 if the ropeway is
            stopped in the morning.
          </p>
        </section>

        {/* Stay overnight */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The night</span>
          <h2 className={styles.sectionTitle}>Should You Stay Overnight in Hakone?</h2>
          <p className={styles.bodyText}>
            Yes, if you can spare the night: a Hakone overnight trip from Tokyo turns a rushed loop into an onsen
            evening and a morning at the museums, and the 2-day Freepass you need for one day already covers the
            second. Stay in <strong>Hakone-Yumoto</strong> for the easiest arrival and departure with bags (the
            Romancecar stops here), or in <strong>Gora</strong> for a short ride to the ropeway on Day 1 and one stop
            to the Open-Air Museum on Day 2. Send the bags ahead with the luggage service at Hakone-Yumoto Station
            and you ride the loop with nothing but a day pack.
          </p>
          <p className={styles.bodyText}>
            A room with its own open-air bath is a room type rather than a hotel feature, and weekend and autumn
            dates go first. Two inns at the two ends of this route, from our{" "}
            <Link href="/guides/attractions/hakone-ryokan-private-onsen" style={linkStyle}>
              Hakone ryokan with private onsen, 10 inns by area
            </Link>
            : {hakoneYoshiikeRyokan.title}, about 7 minutes on foot from Hakone-Yumoto Station with two
            room types that have an open-air bath, and {hakoneGoraKadan.title}, about 5 minutes on foot from Gora
            Station with several such room types. That guide also lists the six inns with a bath in every room,
            from Miyanoshita on this train line to Sengokuhara.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Compare Hakone ryokan for your dates →
            </KlookLink>
            <KlookLink href={hakoneYoshiikeRyokan.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              {hakoneYoshiikeRyokan.title} →
            </KlookLink>
            <KlookLink href={hakoneGoraKadan.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              {hakoneGoraKadan.title} →
            </KlookLink>
          </div>
        </section>

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="hakone" />

        {/* (2) Freepass vs single tickets */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The pass</span>
          <h2 className={styles.sectionTitle}>Is the Hakone Freepass Worth It for 2 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes. The {PASS_2_DAY} pass from Shinjuku is already {LOOP_SAVING} cheaper than the Day 1 loop in single
            fares, and the Day 2 rides on the Tozan Train and buses cost nothing more. It runs for two calendar days,
            to the last service on the second, which is exactly this trip.
          </p>
          <Table head={["Item (adult)", "Price", "Note"]} rows={passRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} — <Source href={ODAKYU_PASS_URL}>odakyu-global.com (Hakone Freepass)</Source>,{" "}
            <Source href={NAVI_PASS_URL}>hakonenavi.jp (Hakone Freepass)</Source>,{" "}
            <Source href={LOOP_URL}>Hakone Navi (loop total)</Source>,{" "}
            <Source href={FARE_NOTICE_URL}>Odakyu Hakone fare notice (PDF)</Source>. Hakone Navi does not split the{" "}
            {LOOP_REGULAR} by ride, so the Tozan Train, cable car and bus are not priced one by one. Show the pass for
            discounts at around 70 spots in Hakone; the list changes, so none is priced here.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the Hakone Freepass on Klook →
            </KlookLink>
            <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              The night it covers: Hakone ryokan →
            </KlookLink>
          </div>
        </section>

        {/* (3) Closures */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Weather and closures</span>
          <h2 className={styles.sectionTitle}>What If the Hakone Ropeway Is Closed?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Take the Hakone Tozan Bus to the lake instead — from Hakone-Yumoto the T Line reaches Togendai in about
            40 minutes and the H Line Moto-Hakone in about 40, both on the Freepass — or swap the days and do the
            museums first. During the planned maintenance closures a replacement bus runs on the closed section
            and accepts the Freepass.
          </p>
          <Table head={["What", "When it stops", "Worth knowing"]} rows={closureRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} — <Source href={ROPEWAY_URL}>Hakone Ropeway (Hakone Navi)</Source>,{" "}
            <Source href={MAINTENANCE_URL}>Odakyu Hakone ropeway maintenance notice, July 2026 (PDF, Japanese)</Source>,{" "}
            <Source href={CRUISE_URL}>Hakone Sightseeing Cruise (Hakone Navi)</Source>,{" "}
            <Source href={STATUS_URL}>Hakone Navi live transport status</Source>,{" "}
            <Source href={POLA_URL}>Pola Museum of Art</Source>, <Source href={OAM_URL}>Hakone Open-Air Museum</Source>.
            If a ride on a paper Freepass is suspended and you did not use it, it is refunded at the last station you
            travel to; the{" "}
            <Link href="/guides/attractions/hakone-free-pass" style={linkStyle}>
              Hakone Freepass guide
            </Link>{" "}
            has the refund rules for the digital pass.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            A booked ryokan night and Romancecar seat are what a closed ropeway makes awkward, not the pass. Read the
            cancellation terms on each booking when you make it, and if you would rather not manage the swap
            yourself, a guided coach covers Owakudani and Lake Ashi on one booking.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hakoneLoopBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Compare a guided Hakone tour →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="The ropeway and the Lake Ashi boat can stop for wind or fog — check Hakone Navi's live status on your phone before you leave the inn." />

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get from Shinjuku to Hakone-Yumoto?</h2>
          <p className={styles.bodyText}>
            On the Odakyu Romancecar, about 80 minutes direct, all seats reserved. The seat ticket is {ROMANCECAR} for
            an adult and ¥600 for a child each way on top of the Freepass, and booking it through Odakyu&apos;s EMot
            Online Tickets is ¥50 cheaper than at the station. On the timetable checked {CHECKED}, the first weekend
            train leaves Shinjuku at 07:00 (arriving 08:26) and the first weekday train at 07:37 (arriving 09:22). The
            ordinary Odakyu trains the Freepass includes take longer, usually with a change at Odawara. Arriving on a
            shinkansen or a JR pass instead? Get off at Odawara and buy the Odawara version of the pass (
            {PASS_ODAWARA} for 2 days).
          </p>
        </section>

        <KlookTourPicks
          heading="Bookings for the Two Days"
          intro="The night, the Day 2 museum, the train, the pass, and the guided version of the loop if you would rather not ride it on your own. Open a listing for the current price on your dates."
          tours={[hakoneHotels, hakoneOpenAirMuseumTicket, romancecarShinjukuHakoneYumoto, hakoneFreepass, hakoneLoopBusTour]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Adding a third day? Odakyu&apos;s <Link href="/guides/transport/fuji-hakone-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Fuji Hakone Pass</Link> adds Kawaguchiko, and the <Link href="/guides/transport/hakone-kamakura-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Hakone Kamakura Pass</Link> adds Kamakura and Enoshima.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For a spa stop on either day, see <Link href="/guides/attractions/yunessun-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Yunessun tickets</Link> (Kowakien): Yunessun, Mori no Yu and the Passport.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Prices and hours for the sculpture park are in <Link href="/guides/attractions/hakone-open-air-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Hakone Open-Air Museum tickets</Link> (adults ¥2,000, or ¥1,800 online).
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            In Sengokuhara, the <Link href="/guides/attractions/hakone-glass-forest-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Hakone Glass Forest</Link> (Venetian Glass Museum) is ¥1,800 for adults.
          </p>
        </section>
        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Hakone 2 Day Itinerary FAQ</h2>
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
            {[
              ["/guides/attractions/hakone-day-trip-from-tokyo", "Hakone Day Trip From Tokyo (2026): Timed Itinerary, Cost and Tours"],
              ["/guides/attractions/hakone-ryokan-private-onsen", "Hakone Ryokan with Private Onsen: 10 Inns by Area (2026)"],
              ["/guides/attractions/hakone-free-pass", "Hakone Freepass 2026: Price from Shinjuku & Is It Worth It?"],
              ["/guides/attractions/tokyo-7-day-itinerary", "Tokyo 7 Day Itinerary (2026): Day Trips, Passes & Bookings"],
              ["/guides/attractions/mt-fuji-day-tour-from-tokyo", "Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See"],
              ["/guides/attractions/kawaguchiko-ryokan-mt-fuji-view", "Kawaguchiko Ryokan with Mt Fuji View (2026): 6 Inns"],
              ["/guides/attractions", "More Things to Do in Japan →"],
            ].map(([href, title]) => (
              <Link key={href} href={href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18l6-13 5 8 3-4 4 9z" />
                    <line x1="2" y1="21" x2="22" y2="21" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the night, then the train</h2>
            <p className={styles.ctaBannerDesc}>
              The ryokan is the part of a Hakone 2 day itinerary that fills up; the Romancecar seat and the Freepass
              can follow once your dates are fixed.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={hakoneHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Hakone ryokan →
              </KlookLink>
              <KlookLink href={hakoneFreepass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Hakone Freepass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
