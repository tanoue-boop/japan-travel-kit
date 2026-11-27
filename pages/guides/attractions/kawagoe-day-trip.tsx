import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kawagoeDayTripPrep,
  kawagoeKimonoVasara,
  kawagoeMorningWalkingTour,
  kawagoePrivateCarTour,
  seibuKawagoePass,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kawagoe day trip from Tokyo, added 20 Nov 2026 (task-jtk-20261120-02).
 *
 * Sources, all read 20 Nov 2026:
 *  - Tobu Tojo Line Ikebukuro → Kawagoe about 30 min (tobu.co.jp/en/access/kawagoe), ¥490 ticket /
 *    ¥481 IC (tobu.co.jp use-pasmo page, fares as of end of March 2026);
 *  - Seibu-Shinjuku → Hon-Kawagoe ¥600 / ¥592 IC (Seibu fare search, after the 14 Mar 2026 revision);
 *    Limited Express Koedo about 44 min, surcharge ¥600 (seiburailway.jp); the Koedo is replaced by
 *    the "Tokiiro Express" from spring 2027 (Seibu release of 19 Feb 2026);
 *  - JR Saikyo / Kawagoe Line direct, Shinjuku → Kawagoe 51–58 min, Shibuya 62 min (JR East December
 *    2026 timetable). The JR fare is not printed: no JR East page gives it after the revision;
 *  - SEIBU KAWAGOE PASS ¥1,000, with Loop Bus ¥1,500; Kawagoe Access Ticket ¥1,800 (seiburailway.jp/en);
 *    Tobu KAWAGOE DISCOUNT PASS Premium ¥1,200 (tobu.co.jp/en);
 *  - Hon-Kawagoe → Toki no Kane 15 min on foot; Kawagoe Station → bus to Ichibangai + 2 min; Toki no Kane
 *    rings at 6:00, 12:00, 15:00, 18:00; Kashiya Yokocho about 30 shops (city.kawagoe.saitama.jp);
 *    lane about 80 m (koedo.or.jp English map);
 *  - Kita-in ¥400 adult, hours by season (kitain.net);
 *  - Kawagoe City Museum ¥200, Honmaru Goten ¥100 (city site); Kurazukuri Museum closed for
 *    earthquake-proofing to March 2027;
 *  - Tobu Koedo Meisho Meguri bus ¥220–230 a ride, Koedo Kawagoe 1-day bus pass ¥500 (tobu-bus.com);
 *  - Kawagoe Kimono Day, the 8th, 18th and 28th of each month (koedo.or.jp).
 * No Klook price appears.
 */

const CHECKED = checkedLabel("2026-11-20");

const TOBU_ACCESS_URL = "https://www.tobu.co.jp/en/access/kawagoe/";
const TOBU_FARE_URL = "https://www.tobu.co.jp/campaign/use-pasmo/";
const TOBU_PASS_URL = "https://www.tobu.co.jp/en/ticket/kawagoe/premium.html";
const SEIBU_FARE_URL = "https://www.seiburailway.jp/unchinkaitei_202603/";
const SEIBU_LTD_URL = "https://www.seiburailway.jp/en/railway/limitedexpress/";
const SEIBU_KOEDO_TIME_URL = "https://www.seiburailway.jp/en/ticket/seibu1daypass/";
const SEIBU_PASS_URL = "https://www.seiburailway.jp/en/ticket/seibukawagoepass/";
const SEIBU_ACCESS_TICKET_URL = "https://www.seiburailway.jp/en/ticket/kawagoeaccessticket/";
const SEIBU_TOKIIRO_URL = "https://www.seiburailway.jp/newsroom/news/20260219_TOKIIRO/";
const JR_TT_URL = "https://timetables.jreast.co.jp/2612/train/150/152641.html";
const TOKI_URL = "https://www.city.kawagoe.saitama.jp/kanko/k-spots/1011557/1011562.html";
const KASHIYA_URL = "https://www.city.kawagoe.saitama.jp/kanko/k-spots/1011557/1011568.html";
const KITAIN_URL = "https://kitain.net/information/visit/";
const HIKAWA_URL = "https://www.kawagoehikawa.jp/access/";
const MUSEUM_URL = "https://www.city.kawagoe.saitama.jp/museum/1013701/1013703.html";
const HONMARU_URL = "https://www.city.kawagoe.saitama.jp/museum/honmaru/1011573.html";
const KURA_URL = "https://www.city.kawagoe.saitama.jp/kanko/k-spots/1011557/1011560.html";
const BUS_URL = "https://www.tobu-bus.com/pc/area/koedo.html";
const KIMONO_DAY_URL = "https://koedo.or.jp/feature/%E5%B7%9D%E8%B6%8A%E3%81%8D%E3%82%82%E3%81%AE%E3%81%AE%E6%97%A5/";

const ROUTE = "/guides/attractions/kawagoe-day-trip";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

const routeRows: ReactNode[][] = [
  [
    <><strong>Best: Ikebukuro → Kawagoe, Tobu Tojo Line</strong></>,
    "About 30 min",
    "¥490 ticket / ¥481 IC",
    "Kawagoe Station: bus to Ichibangai, then 2 min on foot",
  ],
  [
    "Seibu-Shinjuku → Hon-Kawagoe, Seibu Limited Express Koedo",
    "About 44 min",
    "¥600 fare + ¥600 limited express (IC fare ¥592)",
    "Hon-Kawagoe: 15 min on foot to the Toki no Kane bell tower",
  ],
  [
    "Shinjuku → Kawagoe, JR Saikyo / Kawagoe Line (direct trains)",
    "51–58 min",
    "Not printed — no JR East page gives the revised fare",
    "Kawagoe Station: as Tobu; covered by a Japan Rail Pass",
  ],
  [
    "Shibuya → Kawagoe, JR Saikyo / Kawagoe Line (direct trains)",
    "About 62 min",
    "Not printed",
    "The no-change ride from Shibuya",
  ],
];

const seibuTobuRows: ReactNode[][] = [
  [
    <><strong>Tobu Tojo Line (from Ikebukuro)</strong></>,
    "About 30 min",
    "¥490 (¥481 IC), no surcharge",
    "Kawagoe or Kawagoeshi; bus to Ichibangai + 2 min walk",
    "KAWAGOE DISCOUNT PASS Premium ¥1,200 (round trip + Tobu buses)",
  ],
  [
    <><strong>Seibu Shinjuku Line (from Seibu-Shinjuku)</strong></>,
    "About 44 min by Limited Express Koedo",
    "¥600 (¥592 IC) + ¥600 for the Koedo",
    "Hon-Kawagoe; 15 min on foot to Toki no Kane",
    "SEIBU KAWAGOE PASS ¥1,000 (round trip, Koedo extra); with Loop Bus ¥1,500",
  ],
];

const halfDayRows: ReactNode[][] = [
  ["09:30", "Tobu Tojo Line from Ikebukuro", "About 30 min", "IC card or KAWAGOE DISCOUNT PASS Premium"],
  ["10:00", "Kimono dressing and hair at a rental shop", "About 1 hour", <K key="k" href={kawagoeKimonoVasara.url}>Kimono slot (book ahead)</K>],
  ["11:00", "Bus to Ichibangai; the warehouse street (kurazukuri)", "1 hour", "Bus ¥220–230, or the ¥500 day pass"],
  ["12:00", "Toki no Kane — the bell rings at 12:00", "15 min", "No"],
  ["12:30", "Kashiya Yokocho (candy alley), then lunch", "1.5 hours", "No"],
  ["14:00", "Kita-in: the paid route and the 500 Rakan", "1 hour", "No — last entry 30 min before closing"],
  ["15:30", "Return the kimono; Tobu back to Ikebukuro", "1 hour", "Check the shop's return time"],
];

const fullDayRows: ReactNode[][] = [
  ["09:00", "Seibu Limited Express Koedo from Seibu-Shinjuku", "About 44 min", "Koedo seat ¥600"],
  ["10:00", "Kimono rental, then Kita-in", "2 hours", <K key="k" href={kawagoeKimonoVasara.url}>Kimono slot</K>],
  ["12:00", "Toki no Kane at noon, warehouse street, lunch", "1.5 hours", "No"],
  ["13:30", "Kashiya Yokocho", "30 min", "No"],
  ["14:15", "Kawagoe Hikawa Shrine (bus stop at the gate)", "1 hour", "No"],
  ["15:30", "Honmaru Goten and Kawagoe City Museum", "1 hour", "Closed Mondays"],
  ["17:00", "Return the kimono; train back to Tokyo", "1 hour", "No"],
];

const sightRows: ReactNode[][] = [
  [<><strong>Kita-in Temple</strong></>, "¥400 adult; ¥200 elementary & junior high", "To 23 Nov: 9:00–16:30 (Sun/holidays 16:50). 24 Nov – Feb: 9:00–16:00 (16:20). Closed 25 Dec – 8 Jan", ext(KITAIN_URL, "kitain.net")],
  ["Toki no Kane (bell tower)", "Free (outside)", "Rings at 6:00, 12:00, 15:00 and 18:00", ext(TOKI_URL, "city.kawagoe.saitama.jp")],
  ["Kashiya Yokocho (candy alley)", "Free to walk", "About 30 shops along an 80 m lane; each shop sets its hours", ext(KASHIYA_URL, "city.kawagoe.saitama.jp")],
  ["Kawagoe Hikawa Shrine", "Free", "Open to visit freely", ext(HIKAWA_URL, "kawagoehikawa.jp")],
  ["Kawagoe City Museum", "¥200; junior high and under free", "9:00–17:00, last entry 16:30; closed Mondays and the 4th Friday", ext(MUSEUM_URL, "city.kawagoe.saitama.jp")],
  ["Honmaru Goten (castle palace)", "¥100", "As the City Museum", ext(HONMARU_URL, "city.kawagoe.saitama.jp")],
  ["Kurazukuri Museum", "—", "Closed for earthquake-proofing until March 2027", ext(KURA_URL, "city.kawagoe.saitama.jp")],
];

const faqItems = [
  {
    q: "How do you get from Tokyo to Kawagoe?",
    a: "From Ikebukuro, the Tobu Tojo Line takes about 30 minutes to Kawagoe for ¥490 (¥481 by IC card), with no surcharge. From Seibu-Shinjuku, the Seibu Limited Express Koedo takes about 44 minutes to Hon-Kawagoe for a ¥600 fare plus ¥600 for the seat. From Shinjuku or Shibuya, JR Saikyo Line direct trains take 51–62 minutes. Read on Tobu, Seibu and JR East pages on 20 Nov 2026.",
  },
  {
    q: "Is Seibu or Tobu better for Kawagoe?",
    a: "Tobu from Ikebukuro is quicker and cheaper: about 30 minutes for ¥490. Seibu suits a Shinjuku hotel: the Koedo takes about 44 minutes and stops at Hon-Kawagoe, 15 minutes on foot from the Toki no Kane bell tower, and the SEIBU KAWAGOE PASS (¥1,000, for non-Japanese passport holders) covers the round trip without the Koedo seat.",
  },
  {
    q: "How long do you need in Kawagoe?",
    a: "Half a day — about six hours from Ikebukuro and back — covers the warehouse street, the Toki no Kane bell tower, Kashiya Yokocho and Kita-in, with a kimono. A full day adds Kawagoe Hikawa Shrine and the Honmaru Goten castle palace.",
  },
  {
    q: "Can you rent a kimono in Kawagoe?",
    a: "Yes. Kimono rental shops in Kawagoe dress you, set your hair and lend the bag and sandals for the day; book the dressing slot ahead and check the return time. On the 8th, 18th and 28th of each month — Kawagoe Kimono Day — shops taking part give offers to people walking in kimono or yukata.",
  },
  {
    q: "How much does Kita-in cost?",
    a: "¥400 for an adult and ¥200 for elementary and junior high school students, for the paid route that ends at the 500 Rakan statues. From 24 November to the end of February it opens 9:00–16:00 on weekdays (16:20 on Sundays and holidays), and it closes from 25 December to 8 January.",
  },
  {
    q: "When does the Toki no Kane bell ring?",
    a: "Four times a day, at 6:00, 12:00, 15:00 and 18:00, according to Kawagoe city. The noon ring is the easiest to plan a walk around.",
  },
  {
    q: "Is Kawagoe worth a day trip from Tokyo?",
    a: "Yes, for old streets close to the city: the Edo-period warehouse buildings, the bell tower and the candy alley are about 30 minutes from Ikebukuro, and the town is one of the easiest places near Tokyo to walk around in a kimono. Choose Nikko for shrines and mountains.",
  },
  {
    q: "Is the Kurazukuri Museum open?",
    a: "No. Kawagoe city lists the Kurazukuri Museum as closed for earthquake-proofing work until March 2027. The Kawagoe City Museum (¥200) and Honmaru Goten (¥100) are open; both close on Mondays.",
  },
];

const TITLE = "Kawagoe Day Trip from Tokyo (2026): Seibu vs Tobu & Kimono";
const DESCRIPTION =
  "Kawagoe Day Trip from Tokyo: Tokyo to Kawagoe in 30 min for ¥490, Seibu vs Tobu compared, Kawagoe kimono rental, and Kita-in, the bell tower and a route.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/asakusa-kimono-rental", title: "Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph" },
  { href: "/guides/attractions/kimono-rental-japan", title: "Kimono Rental in Japan 2026: Prices, Best Cities & How Far Ahead to Book" },
  { href: "/guides/attractions/yokohama-day-trip", title: "Yokohama Day Trip from Tokyo (2026): Trains & Day Passes" },
  { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip From Tokyo (2026): Costs and Tour or Not" },
  { href: "/guides/attractions/tokyo-4-day-itinerary", title: "Tokyo 4 Day Itinerary (2026): Day by Day, Day Trip & Costs" },
  { href: "/guides/attractions/tokyo-7-day-itinerary", title: "Tokyo 7 Day Itinerary (2026): Day Trips, Passes & Bookings" },
  { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards" },
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

export default function KawagoeDayTripPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kawagoe Day Trip", item: URL },
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
          <span className={styles.breadCurrent}>Kawagoe Day Trip</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kawagoe Day Trip from Tokyo (2026): <br />Seibu vs Tobu, Kimono &amp; a Half-Day Route
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo to Kawagoe on the two private lines compared, a Kawagoe kimono walk, and Little Edo&apos;s
            warehouse street, bell tower, candy alley and Kita-in with official prices.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fares from Tobu, Seibu & JR East", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Ikebukuro → Kawagoe</p>
                <p className={styles.verdictStatValue}>~30 min, ¥490 (Tobu)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kita-in</p>
                <p className={styles.verdictStatValue}>¥400 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Half day</p>
                <p className={styles.verdictStatValue}>3 sights, ~6 hours</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Kawagoe day trip from Tokyo</strong> starts in Ikebukuro: the Tobu Tojo Line reaches
              Kawagoe in about 30 minutes for ¥490 (¥481 by IC card). From Shinjuku, the Seibu Limited Express
              Koedo takes about 44 minutes to Hon-Kawagoe for ¥600 plus a ¥600 seat, and from Shibuya a JR
              Saikyo Line direct train takes about 62 minutes. Half a day covers three sights: the{" "}
              <strong>Toki no Kane</strong> bell tower (free, rings at 12:00 and 15:00), <strong>Kashiya
              Yokocho</strong> candy alley (about 30 shops, free) and <strong>Kita-in</strong> temple with its 500
              Rakan (¥400) — about six hours from Ikebukuro and back, in a kimono if you book one. Read on Tobu,
              Seibu, JR East, Kawagoe city and Kita-in&apos;s own pages on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kawagoeKimonoVasara.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Kawagoe kimono rental →
              </KlookLink>
              <KlookLink href={kawagoeMorningWalkingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Little Edo walking tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same visit"
          heading="Book These for the Kawagoe Day"
          intro="The kimono slot, the Seibu round trip, a morning guide, a Tokyo bed and data. Klook prices change by date, so open a listing for the figure on yours."
          items={kawagoeDayTripPrep}
          headingLevel={3}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tokyo to Kawagoe</span>
          <h2 className={styles.sectionTitle}>How Do You Get from Tokyo to Kawagoe?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By the Tobu Tojo Line from Ikebukuro, unless your hotel is in Shinjuku: it is the fastest and the
            cheapest, with no seat to buy. From Shinjuku, the Seibu Koedo is a reserved-seat limited express to
            Hon-Kawagoe, the station on the warehouse-district side of town. JR runs direct too, and a Japan Rail
            Pass covers it.
          </p>
          <SimpleTable head={["Route", "Time", "Adult fare", "Arrive at"]} rows={routeRows} />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: Tobu ({ext(TOBU_ACCESS_URL, "time")}, {ext(TOBU_FARE_URL, "fare")}), Seibu (
            {ext(SEIBU_KOEDO_TIME_URL, "Koedo time")}, {ext(SEIBU_LTD_URL, "limited express fee")},{" "}
            {ext(SEIBU_FARE_URL, "fare revision of 14 March 2026")}), JR East December 2026 timetable (
            {ext(JR_TT_URL, "timetables.jreast.co.jp")}), walking times ({ext(TOKI_URL, "Kawagoe city")}). Seibu
            fares are from Seibu&apos;s own fare search after the March 2026 revision. From spring 2027 Seibu
            replaces the Koedo with the &ldquo;Tokiiro Express&rdquo;, which adds stops (
            {ext(SEIBU_TOKIIRO_URL, "Seibu release")}).
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Seibu vs Tobu</span>
          <h2 className={styles.sectionTitle}>Should You Take the Seibu or the Tobu Line to Kawagoe?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Tobu, from Ikebukuro: about 30 minutes for ¥490, with nothing to reserve. Seibu
            is the pick from a Shinjuku base, and for its overseas-visitor pass — the SEIBU KAWAGOE PASS at
            ¥1,000 covers the round trip, and the Koedo seat is extra.
          </p>
          <SimpleTable
            head={["Line", "Time", "Adult fare", "Station and walk", "Visitor pass"]}
            rows={seibuTobuRows}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(TOBU_PASS_URL, "Tobu KAWAGOE DISCOUNT PASS Premium")},{" "}
            {ext(SEIBU_PASS_URL, "SEIBU KAWAGOE PASS")}, {ext(SEIBU_ACCESS_TICKET_URL, "Seibu Kawagoe Access Ticket")}{" "}
            (¥1,800, round trip plus a Koedo seat from Seibu-Shinjuku or Takadanobaba). The SEIBU KAWAGOE PASS is
            for non-Japanese passport holders, adults only. Kawagoe Station to Ichibangai is by bus, then a
            2-minute walk; Tobu&apos;s day bus pass for the Koedo area is ¥500 ({ext(BUS_URL, "tobu-bus.com")}).
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={seibuKawagoePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              SEIBU KAWAGOE PASS →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Model routes</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need in Kawagoe?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Half a day: the warehouse street, the Toki no Kane bell tower, Kashiya Yokocho and Kita-in fit into
            about six hours from Ikebukuro and back, including an hour to be dressed in a kimono. A full day adds
            Kawagoe Hikawa Shrine and the castle palace.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Half day from Ikebukuro, in kimono</h3>
          <SimpleTable head={["Time", "Where", "Time needed", "Book ahead?"]} rows={halfDayRows} />
          <h3 className={styles.sectionTitle} style={h3}>Full day from Shinjuku</h3>
          <SimpleTable head={["Time", "Where", "Time needed", "Book ahead?"]} rows={fullDayRows} />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: Toki no Kane ({ext(TOKI_URL, "Kawagoe city")}), Kita-in (
            {ext(KITAIN_URL, "kitain.net")}), City Museum ({ext(MUSEUM_URL, "Kawagoe city")}), buses (
            {ext(BUS_URL, "tobu-bus.com")}). Clock times are a planning guide, not a timetable. The kimono
            shop&apos;s own return time decides how late the route can run.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices and hours</span>
          <h2 className={styles.sectionTitle}>What Does It Cost to See Kawagoe?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Very little: Kita-in at ¥400 is the only paid stop on the half-day route, and the warehouse street,
            the bell tower, the candy alley and Hikawa Shrine are free. The Kurazukuri Museum is closed until
            March 2027.
          </p>
          <SimpleTable head={["Sight", "Adult price", "Hours", "Official site"]} rows={sightRows} />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED} on each official site linked in the table. Kita-in also closes on the
            afternoon of 2 February, on 3 February and on 2–4 April, and on some temple event days. The Kashiya
            Yokocho lane length is from the {ext("https://koedo.or.jp/wp-content/uploads/KAWAGOE-Sightseeing-Map-Eng.pdf", "Koedo Kawagoe English map")}.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Kawagoe kimono</span>
          <h2 className={styles.sectionTitle}>Can You Rent a Kimono in Kawagoe?</h2>
          <p className={styles.bodyText}>
            Yes — walking the warehouse street in kimono is what many visitors come for. A rental includes the
            dressing, hair styling and the bag and sandals; the{" "}
            <K href={kawagoeKimonoVasara.url}>VASARA Kawagoe listing</K> also has children&apos;s sizes from 95
            to 140 cm. Book the dressing slot first, since it is an appointment, then the train that gets you
            there for it, and read the return time and the cancellation terms on the listing before paying.
          </p>
          <p className={styles.bodyText}>
            Go on the 8th, 18th or 28th of the month if you can: on <strong>Kawagoe Kimono Day</strong>, shops
            taking part give offers to people walking in kimono or yukata (jinbei and samue do not count, and
            some shops join on the 18th only) — {ext(KIMONO_DAY_URL, "koedo.or.jp")}. In winter, wear warm
            layers under the kimono; the route is outdoors most of the day. Kimono rental in Tokyo itself is
            compared in{" "}
            <Link href="/guides/attractions/asakusa-kimono-rental">Asakusa kimono rental</Link>, and across Japan
            in <Link href="/guides/attractions/kimono-rental-japan">kimono rental in Japan by city</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kawagoeKimonoVasara.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kawagoe kimono rental →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Little Edo</span>
          <h2 className={styles.sectionTitle}>What Is There to See in Little Edo Kawagoe?</h2>
          <p className={styles.bodyText}>
            The <strong>warehouse street</strong> of Ichibangai, lined with clay-walled kurazukuri merchant
            houses; the wooden <strong>Toki no Kane</strong> bell tower just off it, which rings four times a day;{" "}
            <strong>Kashiya Yokocho</strong>, a short lane of about 30 old-style sweet shops; and{" "}
            <strong>Kita-in</strong>, the temple whose paid route ends at the 500 Rakan statues. Kawagoe
            Hikawa Shrine and the Honmaru Goten castle palace are a bus ride further on.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Is Kawagoe worth a day trip?</h3>
          <p className={styles.bodyText}>
            Yes, for old streets close to the city — about 30 minutes from Ikebukuro, with nothing to book but the
            kimono. It is a town walk rather than a mountain day; for shrines and waterfalls the{" "}
            <Link href="/guides/attractions/nikko-day-trip">Nikko day trip</Link> is the north-side alternative,
            and for the harbour the{" "}
            <Link href="/guides/attractions/yokohama-day-trip">Yokohama day trip</Link>.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Should you take a tour or go on your own?</h3>
          <p className={styles.bodyText}>
            On your own, for most people. A guide adds the history of the merchant houses: the{" "}
            <K href={kawagoeMorningWalkingTour.url}>Little Edo morning walking tour</K> meets at Hon-Kawagoe
            Station for about 2 hours 15 minutes, and a{" "}
            <K href={kawagoePrivateCarTour.url}>private chartered-car day</K> picks up from a hotel in Tokyo&apos;s
            23 wards — useful for families. Check each listing&apos;s minimum group size and cancellation terms.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>When is the best time to go?</h3>
          <p className={styles.bodyText}>
            A weekday morning, before the warehouse street fills, and in time for the bell at 12:00. Avoid
            Mondays if you want the City Museum and Honmaru Goten, and late December to 8 January if you want
            Kita-in. Kawagoe Kimono Day falls on the 8th, 18th and 28th.
          </p>
        </section>

        <BookingEsimCard lead="The warehouse street, the bell tower and Kita-in are a walk apart: data keeps the map and the train back in hand." />

        <KlookTourPicks
          heading="Kimono, Tours and Tickets for Kawagoe"
          intro="The kimono rental, a guided morning walk, a private car from Tokyo and the Seibu round trip. Klook prices change by date, so open a listing for yours."
          tours={[kawagoeKimonoVasara, kawagoeMorningWalkingTour, kawagoePrivateCarTour, seibuKawagoePass]}
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
                    <path d="M3 21h18M6 21V9l6-4 6 4v12" />
                    <path d="M10 21v-5h4v5" />
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
            <h2 className={styles.ctaBannerTitle}>Little Edo in half a day, 30 minutes from Ikebukuro</h2>
            <p className={styles.ctaBannerDesc}>
              Book the kimono slot first, then the train that gets you there for it.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kawagoeKimonoVasara.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kawagoe kimono →
              </KlookLink>
              <KlookLink href={seibuKawagoePass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Seibu Kawagoe Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
