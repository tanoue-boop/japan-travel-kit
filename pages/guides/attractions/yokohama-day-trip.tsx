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
  cupNoodlesMuseumGuidedTour,
  yokohamaChinatownGourmetTicket,
  yokohamaDayTripPrep,
  yokohamaKamakuraPrivateGuide,
  yokohamaPrivateCityTour,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Yokohama day trip from Tokyo, added 20 Nov 2026 (task-jtk-20261120-02).
 *
 * The whole day out of Tokyo: trains, the 1-day tickets (the landing page for the Bing query
 * "jr yokohama day pass price"), a half-day and a full-day route, and the sights' prices.
 * Chinatown gets one section only; a food-tour page for it is a separate queue item.
 *
 * Sources, all read 20 Nov 2026:
 *  - Tokyu Toyoko Line Shibuya → Yokohama ¥310 ticket / ¥309 IC (tokyu.co.jp fare tables);
 *    limited express about 27 min (Tokyu's timetable notice of March 2022, the latest that states it);
 *  - Minatomirai Line: through trains from the Toyoko Line, no surcharge; Motomachi-Chukagai about
 *    36 min from Shibuya, 43 from Shinjuku-sanchome, 50 from Ikebukuro; Yokohama → Motomachi-Chukagai
 *    ¥230 / ¥224 IC; 1-day pass ¥460 (mm21railway.co.jp);
 *  - JR East (fares after the 14 Mar 2026 revision): Shibuya → Yokohama specified fare ¥440
 *    (tokutei.pdf); Shinjuku → Yokohama ¥620 / ¥616 IC and Tokyo → Yokohama ¥530 / ¥528 IC from the
 *    revised fare table's distance bands (pamphlet p.18) — no single JR page prints them;
 *    times from the December 2026 timetables: Shonan-Shinjuku special rapid Shinjuku → Yokohama 29 min,
 *    Ikebukuro 36 min; Tokaido Line Tokyo → Yokohama 26 min;
 *  - JR East Yokohama Minatomirai Pass ¥560 / child ¥280 (jreast.co.jp tickets GoodsCd=2483);
 *  - Tokyu Minatomirai Pass from Shibuya ¥920 / child ¥470 (tokyu.co.jp);
 *  - Minato Burari Ticket ¥700 / ¥350, Wide ¥750 / ¥380; city bus 1-day ¥600 (city.yokohama.lg.jp);
 *  - CUPNOODLES MUSEUM ¥500 adult, high school and under free, 10:00–18:00 (last entry 17:00),
 *    closed Tuesdays; My CUPNOODLES Factory ¥500 a cup, about 45 min (cupnoodles-museum.jp);
 *  - Sankeien ¥900 adult / ¥200 child, 9:00–17:00, closed 26–31 Dec (sankeien.or.jp);
 *  - Red Brick Warehouse free, Building 1 10:00–19:00, Building 2 11:00–20:00 (yokohama-akarenga.jp);
 *  - YOKOHAMA AIR CABIN ¥1,000 one way / ¥1,800 round trip (yokohama-air-cabin.jp);
 *  - Osanbashi rooftop open 24 hours (osanbashi.jp); Landmark Tower Sky Garden closed for building
 *    work, reopening 2028 or later (yokohama-landmark.jp).
 * No Klook price appears.
 */

const CHECKED = checkedLabel("2026-11-20");

const TOKYU_FARE_URL = "https://www.tokyu.co.jp/railway/pdf/unchin_10yen.pdf";
const MM_FAQ_URL = "https://www.mm21railway.co.jp/info/faq04.html";
const MM_TICKET_URL = "https://www.mm21railway.co.jp/info/ticket.html";
const JR_TOKUTEI_URL = "https://www.jreast.co.jp/2026unchin-kaitei/assets/pdf/tokutei.pdf";
const JR_FARE_URL = "https://www.jreast.co.jp/2026unchin-kaitei/assets/pdf/pamphlet.pdf";
const JR_TT_URL = "https://timetables.jreast.co.jp/2612/train/035/035841.html";
const JR_PASS_URL = "https://www.jreast.co.jp/tickets/info.aspx?GoodsCd=2483";
const TOKYU_PASS_URL = "https://www.tokyu.co.jp/railway/ticket/value-ticket/minatomirai/index.html";
const BURARI_URL = "https://www.city.yokohama.lg.jp/kotsu/bus/unchin/minatoburari.html";
const BUS_DAY_URL = "https://www.city.yokohama.lg.jp/kotsu/bus/unchin/ichinichi.html";
const CUPNOODLES_URL = "https://www.cupnoodles-museum.jp/ja/yokohama/guide/admission/";
const FACTORY_URL = "https://www.cupnoodles-museum.jp/ja/yokohama/attractions/mc-factory/";
const SANKEIEN_URL = "https://www.sankeien.or.jp/price-service/";
const AKARENGA_URL = "https://www.yokohama-akarenga.jp/";
const AIRCABIN_URL = "https://yokohama-air-cabin.jp/";
const OSANBASHI_URL = "https://osanbashi.jp/floorguide/rooftop";
const LANDMARK_URL = "https://www.yokohama-landmark.jp/skygarden/";
const CHINATOWN_URL = "https://www.chinatown.or.jp/guide/chinatown80/";

const ROUTE = "/guides/attractions/yokohama-day-trip";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

const routeRows: ReactNode[][] = [
  [
    <><strong>Best: Shibuya → Yokohama, Tokyu Toyoko Line</strong></>,
    "Limited express about 27 min; through trains continue to Minatomirai and Motomachi-Chukagai (about 36 min) without a change",
    "¥310 ticket / ¥309 IC to Yokohama",
    "Cheapest and the only line that runs straight into Minato Mirai and Chinatown",
  ],
  [
    "Shinjuku → Yokohama, JR Shonan-Shinjuku Line",
    "Special rapid 29 min; local 34 min",
    "¥620 ticket / ¥616 IC",
    "Change at Yokohama for the Minatomirai Line, or ride JR on to Sakuragicho",
  ],
  [
    "Tokyo Station → Yokohama, JR Tokaido Line",
    "26 min; Keihin-Tohoku Line 38 min, running on to Sakuragicho and Kannai",
    "¥530 ticket / ¥528 IC",
    "Covered by a Japan Rail Pass; the Keihin-Tohoku Line is the no-change ride to Sakuragicho",
  ],
  [
    "Ikebukuro → Yokohama, JR Shonan-Shinjuku Line",
    "Special rapid 36 min",
    "¥720 ticket / ¥715 IC",
    "Or the Fukutoshin Line straight through to Motomachi-Chukagai, about 50 min",
  ],
  [
    "Shibuya → Yokohama, JR",
    "Shonan-Shinjuku Line, direct",
    "¥440 (JR specified fare)",
    "Worth it only if you hold a JR pass or want a JR day ticket at the other end",
  ],
];

const passRows: ReactNode[][] = [
  [
    <><strong>Best for most: Minatomirai Line 1-day pass</strong></>,
    "¥460 (child ¥230)",
    "Every Minatomirai Line station, Yokohama to Motomachi-Chukagai",
    "Not the train from Tokyo",
  ],
  [
    "JR East Yokohama Minatomirai Pass (the “JR Yokohama day pass”)",
    "¥560 (child ¥280)",
    "JR between Yokohama and Shin-Sugita, plus the whole Minatomirai Line",
    "Not the train from Tokyo; sold on Mobile Suica too (adult, same day)",
  ],
  [
    "Tokyu Minatomirai Pass (from Shibuya)",
    "¥920 (child ¥470)",
    "Round trip Shibuya ⇔ Yokohama on Tokyu, plus the Minatomirai Line all day",
    "Includes the train from Tokyo — the one to buy from Shibuya",
  ],
  [
    "Minato Burari Ticket",
    "¥700 (child ¥350); Wide ¥750",
    "City buses incl. the Akaikutsu tourist bus and the Sankeien stops, and the Blue Line subway Yokohama – Yoshinocho",
    "Not JR or the Minatomirai Line; ¥100 off Sankeien for adults",
  ],
  [
    "Yokohama city bus 1-day pass",
    "¥600 (child ¥300)",
    "Yokohama Municipal buses",
    "Buses only",
  ],
];

const halfDayRows: ReactNode[][] = [
  ["09:30", "Train from Shibuya on the Tokyu Toyoko Line, through to Minatomirai", "Under 36 min", "Tokyu Minatomirai Pass or IC card"],
  [
    "10:00",
    "CUPNOODLES MUSEUM — opens 10:00; My CUPNOODLES Factory, about 45 min",
    "1.5 hours",
    <>Advance admission + Factory ticket, sold online until midnight the day before</>,
  ],
  ["11:45", "Red Brick Warehouse (Building 2 opens 11:00), then Osanbashi Pier's rooftop", "1 hour", "No"],
  [
    "13:00",
    "Yamashita Park, then lunch in Chinatown",
    "1.5 hours",
    <>
      Optional: <K href={yokohamaChinatownGourmetTicket.url}>Chinatown meal ticket</K>
    </>,
  ],
  ["14:45", "Motomachi-Chukagai → Shibuya, direct", "About 36 min", "No"],
];

const fullDayRows: ReactNode[][] = [
  ["09:00", "Train from Tokyo to Sakuragicho (JR Keihin-Tohoku Line runs through)", "41 min", "IC card or JR pass"],
  ["09:45", "YOKOHAMA AIR CABIN, Sakuragicho → Unga Park", "Short ride", "No reservations; check the day's running hours on its site"],
  ["10:00", "CUPNOODLES MUSEUM and My CUPNOODLES Factory", "1.5 hours", "Advance Factory ticket"],
  ["11:45", "Red Brick Warehouse and Osanbashi Pier", "1 hour", "No"],
  ["13:00", "Lunch in Chinatown", "1 hour", <K key="k" href={yokohamaChinatownGourmetTicket.url}>Chinatown meal ticket</K>],
  ["14:15", "Bus to Sankeien Garden (Minato Burari Ticket covers the Sankeien stops)", "2 hours incl. the bus", "Last entry 16:30"],
  ["16:45", "Bus back to Yamashita Park and the waterfront at dusk", "1 hour", "No"],
  ["18:00", "Motomachi-Chukagai → Shibuya or Yokohama → Tokyo", "30–40 min", "No"],
];

const sightRows: ReactNode[][] = [
  [<><strong>CUPNOODLES MUSEUM YOKOHAMA</strong></>, "¥500 adult; high school and under free", "10:00–18:00, last entry 17:00; closed Tuesdays (Wed if Tue is a holiday)", ext(CUPNOODLES_URL, "cupnoodles-museum.jp")],
  ["My CUPNOODLES Factory (in the museum)", "¥500 per cup, on top of admission", "Last entry 17:30; about 45 min; same-day numbered tickets or advance online", ext(FACTORY_URL, "cupnoodles-museum.jp")],
  ["Sankeien Garden", "¥900 adult; ¥200 child", "9:00–17:00, last entry 16:30; closed 26–31 Dec", ext(SANKEIEN_URL, "sankeien.or.jp")],
  ["Yokohama Red Brick Warehouse", "Free", "Building 1 10:00–19:00; Building 2 11:00–20:00", ext(AKARENGA_URL, "yokohama-akarenga.jp")],
  ["YOKOHAMA AIR CABIN (ropeway)", "¥1,000 one way; ¥1,800 round trip (child ¥500 / ¥900)", "Stops in strong wind; closed 1 Jan, 13 Jan and 18–29 Jan 2027", ext(AIRCABIN_URL, "yokohama-air-cabin.jp")],
  ["Osanbashi Pier rooftop", "Public park", "Open 24 hours", ext(OSANBASHI_URL, "osanbashi.jp")],
  ["Landmark Tower Sky Garden", "—", "Closed for building work; reopening planned for 2028 or later", ext(LANDMARK_URL, "yokohama-landmark.jp")],
];

const faqItems = [
  {
    q: "How do you get from Tokyo to Yokohama?",
    a: "From Shibuya, take the Tokyu Toyoko Line: about 27 minutes by limited express for ¥310 (¥309 by IC card), and through trains continue to Minatomirai and Motomachi-Chukagai for Chinatown. From Shinjuku the JR Shonan-Shinjuku Line takes 29 minutes for ¥620 (¥616 IC), and from Tokyo Station the JR Tokaido Line takes 26 minutes for ¥530 (¥528 IC). Fares and times read on Tokyu, Minatomirai Railway and JR East pages on 20 Nov 2026.",
  },
  {
    q: "How much is the JR Yokohama day pass?",
    a: "JR East's Yokohama Minatomirai Pass is ¥560 for an adult and ¥280 for a child. It covers JR between Yokohama and Shin-Sugita plus the whole Minatomirai Line for one day, but not the train from Tokyo. From Shibuya, the Tokyu Minatomirai Pass (¥920) includes the round trip from Tokyo; on the spot, the Minatomirai Line's own 1-day pass is ¥460.",
  },
  {
    q: "Is Yokohama worth a day trip from Tokyo?",
    a: "Yes, if you want the waterfront, Chinatown and the Cup Noodles Museum in one easy day: the train is under 30 minutes from Shibuya, Shinjuku or Tokyo Station, nothing needs a guide, and only the Cup Noodles Factory benefits from booking. Choose Kamakura instead if temples are the goal.",
  },
  {
    q: "What are the best things to do in Yokohama?",
    a: "The CUPNOODLES MUSEUM (¥500, make your own cup for another ¥500), the Red Brick Warehouse (free), Osanbashi Pier's rooftop and Yamashita Park on the harbour, Chinatown for lunch, and Sankeien Garden (¥900) if you have a full day. The Landmark Tower Sky Garden observatory is closed until 2028 or later.",
  },
  {
    q: "How long do you need in Yokohama?",
    a: "Half a day covers the Cup Noodles Museum, the Red Brick Warehouse and the harbour, and Chinatown for lunch — about five hours from leaving Shibuya to getting back. A full day adds the AIR CABIN ropeway and Sankeien Garden.",
  },
  {
    q: "Is the Cup Noodles Museum open every day?",
    a: "No. It is closed on Tuesdays (Wednesday when Tuesday is a public holiday) and over New Year — 29 Dec 2026 to 2 Jan 2027 — and also on 23 Nov 2026 and 12–15 Jan 2027. Hours are 10:00–18:00 with last entry at 17:00.",
  },
  {
    q: "Do you need to book the Cup Noodles Museum?",
    a: "Admission needs no booking, but the My CUPNOODLES Factory runs on same-day numbered tickets handed out first come, first served. To be sure of a slot, buy the advance admission-plus-Factory ticket on the museum's site, which is sold until midnight the day before.",
  },
  {
    q: "Is Yokohama good for kids?",
    a: "Yes. High school students and younger enter the Cup Noodles Museum free, and making a cup takes about 45 minutes. The AIR CABIN costs ¥500 one way for a child, and the harbour parks are free.",
  },
];

const TITLE = "Yokohama Day Trip from Tokyo (2026): Trains & Day Passes";
const DESCRIPTION =
  "Yokohama Day Trip from Tokyo: Tokyo to Yokohama in 27 min for ¥310, the JR day pass at ¥560, and things to do in Yokohama with official prices and hours.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/kamakura-day-trip", title: "Kamakura Day Trip From Tokyo (2026): Temples and Fares" },
  { href: "/guides/attractions/kawagoe-day-trip", title: "Kawagoe Day Trip from Tokyo (2026): Seibu vs Tobu & Kimono" },
  { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip From Tokyo 2026: Itinerary, Cost, Tours" },
  { href: "/guides/attractions/tokyo-7-day-itinerary", title: "Tokyo 7 Day Itinerary (2026): Day Trips, Passes & Bookings" },
  { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo (2026): What to Book Ahead" },
  { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards" },
  { href: "/guides/transport/jr-pass-guide", title: "JR Pass Guide 2026: Prices, Is It Worth It and How to Buy" },
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

export default function YokohamaDayTripPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Yokohama Day Trip", item: URL },
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
          <span className={styles.breadCurrent}>Yokohama Day Trip</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Yokohama Day Trip from Tokyo (2026): <br />Trains, Day Passes &amp; a Half-Day Route
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo to Yokohama in under 30 minutes, the 1-day tickets compared, and the things to do in Yokohama
            with their official prices and hours.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fares from Tokyu, JR East & Minatomirai", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Shibuya → Yokohama</p>
                <p className={styles.verdictStatValue}>~27 min, ¥310</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR day pass</p>
                <p className={styles.verdictStatValue}>¥560 on the spot</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Half day</p>
                <p className={styles.verdictStatValue}>3 sights, ~5 hours</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Yokohama day trip from Tokyo</strong> starts with a train of under 30 minutes: the Tokyu
              Toyoko Line limited express from Shibuya takes about 27 minutes for ¥310 (¥309 by IC card), the
              JR Shonan-Shinjuku Line from Shinjuku 29 minutes for ¥620 (¥616 IC), and from Ikebukuro the JR
              special rapid takes 36 minutes for ¥720 — or the Fukutoshin Line runs straight through to
              Chinatown in about 50. Half a day covers three things: the <strong>CUPNOODLES MUSEUM</strong>{" "}
              (¥500, closed Tuesdays), the <strong>Red Brick Warehouse</strong> and the harbour (free), and{" "}
              <strong>Chinatown</strong> for lunch — about five hours from Shibuya and back. Fares and prices
              read on Tokyu, JR East, Minatomirai Railway and each sight&apos;s own site on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={yokohamaPrivateCityTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Yokohama tour with a local →
              </KlookLink>
              <KlookLink href={yokohamaChinatownGourmetTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Chinatown meal + train ticket →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same visit"
          heading="Book These for the Yokohama Day"
          intro="The guided version of the day, the Chinatown ticket from Shibuya, a Tokyo bed and data. Klook prices change by date, so open a listing for the figure on yours."
          items={yokohamaDayTripPrep}
          headingLevel={3}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tokyo to Yokohama</span>
          <h2 className={styles.sectionTitle}>How Do You Get from Tokyo to Yokohama?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By the Tokyu Toyoko Line from Shibuya if you can: it is the cheapest at ¥310, and its through trains
            carry on to Minatomirai and Motomachi-Chukagai, so the train from Tokyo drops you at the museum or
            in Chinatown without a change. From Shinjuku, Ikebukuro or Tokyo Station, JR is quicker to Yokohama
            Station itself.
          </p>
          <SimpleTable head={["Route", "Time", "Adult fare", "Why pick it"]} rows={routeRows} />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: Tokyu fare table ({ext(TOKYU_FARE_URL, "tokyu.co.jp")}), Minatomirai Line
            through-running and times ({ext(MM_FAQ_URL, "mm21railway.co.jp")}), JR East December 2026 timetable (
            {ext(JR_TT_URL, "timetables.jreast.co.jp")}), JR East fares after the 14 March 2026 revision (
            {ext(JR_FARE_URL, "fare table")}, {ext(JR_TOKUTEI_URL, "specified fares")}). The Tokyu time is
            Tokyu&apos;s own figure for the daytime limited express; JR times are the fastest daytime trains.
            The JR Shinjuku, Tokyo and Ikebukuro fares are the revised fare table&apos;s band for each distance.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Does the Japan Rail Pass cover Yokohama?</h3>
          <p className={styles.bodyText}>
            The JR lines do — Tokaido, Keihin-Tohoku and Shonan-Shinjuku — but the Tokyu Toyoko and Minatomirai
            lines do not. With a pass, ride the Keihin-Tohoku Line through to Sakuragicho for the AIR CABIN and
            Minato Mirai, or to Kannai or Ishikawacho for Chinatown. More in the{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> and{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link>.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day passes</span>
          <h2 className={styles.sectionTitle}>Is There a JR Yokohama Day Pass, and What Does It Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes: JR East&apos;s <strong>Yokohama Minatomirai Pass</strong> is ¥560 for an adult and ¥280 for a
            child, for JR between Yokohama and Shin-Sugita and the whole Minatomirai Line — but it starts at
            Yokohama and does not cover the train from Tokyo. For a day of Minato Mirai and Chinatown only, the
            Minatomirai Line&apos;s own ¥460 pass is cheaper; from Shibuya, the Tokyu pass at ¥920 includes the
            round trip.
          </p>
          <SimpleTable head={["Ticket", "Adult (child)", "Covers", "Watch out"]} rows={passRows} />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(MM_TICKET_URL, "mm21railway.co.jp")},{" "}
            {ext(JR_PASS_URL, "jreast.co.jp (Yokohama Minatomirai Pass)")},{" "}
            {ext(TOKYU_PASS_URL, "tokyu.co.jp (Minatomirai Pass)")}, {ext(BURARI_URL, "Minato Burari Ticket")},{" "}
            {ext(BUS_DAY_URL, "city bus 1-day pass")} (city.yokohama.lg.jp). Does a pass pay? Yokohama →
            Motomachi-Chukagai is ¥230 each way on the Minatomirai Line, so two rides already come to the
            ¥460 pass.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Model routes</span>
          <h2 className={styles.sectionTitle}>What Can You Do in Yokohama in Half a Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The museum, the harbour and Chinatown, in that order, from Minatomirai Station down to
            Motomachi-Chukagai — then one direct train back to Shibuya. Start at the museum&apos;s 10:00 opening,
            when the Factory has the most slots left.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Half day from Shibuya</h3>
          <SimpleTable head={["Time", "Where", "Time needed", "Book ahead?"]} rows={halfDayRows} />
          <h3 className={styles.sectionTitle} style={h3}>Full day from Tokyo Station</h3>
          <SimpleTable head={["Time", "Where", "Time needed", "Book ahead?"]} rows={fullDayRows} />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: museum and Factory ({ext(FACTORY_URL, "cupnoodles-museum.jp")}), Red Brick
            Warehouse ({ext(AKARENGA_URL, "yokohama-akarenga.jp")}), Sankeien ({ext(SANKEIEN_URL, "sankeien.or.jp")}),
            AIR CABIN ({ext(AIRCABIN_URL, "yokohama-air-cabin.jp")}), Minato Burari Ticket (
            {ext(BURARI_URL, "city.yokohama.lg.jp")}). Clock times are a planning guide, not a timetable. On a
            Tuesday the museum is closed — swap in Sankeien for the morning.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices and hours</span>
          <h2 className={styles.sectionTitle}>What Are the Best Things to Do in Yokohama, and What Do They Cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Most of Yokohama is free to walk — the harbour, the Red Brick Warehouse, Chinatown&apos;s streets. The
            paid stops are the CUPNOODLES MUSEUM (¥500), Sankeien Garden (¥900) and the AIR CABIN ropeway
            (¥1,000 one way). The Landmark Tower&apos;s Sky Garden observatory is closed until 2028 or later.
          </p>
          <SimpleTable head={["Sight", "Adult price", "Hours", "Official site"]} rows={sightRows} />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED} on each official site linked in the table. The CUPNOODLES MUSEUM is also
            closed on 23 Nov 2026, 29 Dec 2026 – 2 Jan 2027 and 12–15 Jan 2027. AIR CABIN running hours are
            posted on its site as an image and are not repeated here.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={cupNoodlesMuseumGuidedTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Cup Noodles Museum guided tour →
            </KlookLink>
            <KlookLink href={yokohamaPrivateCityTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yokohama tour with a local →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Chinatown</span>
          <h2 className={styles.sectionTitle}>Where Does Chinatown Fit in a Yokohama Day?</h2>
          <p className={styles.bodyText}>
            At lunch, at the end of the route: Chinatown is at Motomachi-Chukagai, the last stop of the
            Minatomirai Line, which is also where the through trains to Shibuya start. The official ChinaTown80
            information centre is a minute from Exit 2, beside the Choyomon gate (
            {ext(CHINATOWN_URL, "chinatown.or.jp")}). The streets are free to walk; for a set meal without
            choosing a restaurant on the spot, the Klook{" "}
            <K href={yokohamaChinatownGourmetTicket.url}>Chinatown Gourmet Trip ticket</K> bundles a Chinatown
            meal coupon with a 1-day Tokyu and Minatomirai ride from Shibuya — read its restaurant list and
            closing days before you choose a date.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Worth it?</span>
          <h2 className={styles.sectionTitle}>Is Yokohama Worth a Day Trip?</h2>
          <p className={styles.bodyText}>
            Yes, as an easy half day: under 30 minutes each way, nothing that needs a guide, and only one
            booking (the Cup Noodles Factory) that helps. It is a city day — harbour, museum, food — rather than
            temples or mountains. For temples on the same JR line, go on to{" "}
            <Link href="/guides/attractions/kamakura-day-trip">Kamakura</Link>, which is past Yokohama on the
            Yokosuka and Shonan-Shinjuku lines (from Shinjuku by Odakyu, the{" "}
            <Link href="/guides/attractions/enoshima-kamakura-pass">Enoshima-Kamakura Freepass</Link> is ¥1,640
            with the Enoden included); for old streets and kimono, the{" "}
            <Link href="/guides/attractions/kawagoe-day-trip">Kawagoe day trip</Link> is the north-side
            equivalent.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Should you take a tour or go on your own?</h3>
          <p className={styles.bodyText}>
            On your own, for most people — the trains are direct and the sights are a walk apart. A private
            guide makes sense for a first visit with a fixed amount of time, or to pair Yokohama with Kamakura in
            one day: the{" "}
            <K href={yokohamaKamakuraPrivateGuide.url}>6-hour Yokohama / Kamakura private trip</K> is led by a
            government-licensed guide. Read the cancellation terms on the listing before paying.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>When is the best time to go?</h3>
          <p className={styles.bodyText}>
            Any day but Tuesday, when the CUPNOODLES MUSEUM is closed. Arrive for the 10:00 opening, and leave
            the harbour for late afternoon. In strong wind the AIR CABIN stops, so check its site on the day.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Is Yokohama good with kids?</h3>
          <p className={styles.bodyText}>
            Yes. Children of high school age and under enter the CUPNOODLES MUSEUM free, and designing a cup at
            the Factory takes about 45 minutes. A child&apos;s AIR CABIN ticket is ¥500 one way, and the harbour
            parks are free space to run.
          </p>
        </section>

        <BookingEsimCard lead="Minato Mirai, the harbour and Chinatown are a walk apart: data keeps the map and the train back open all day." />

        <KlookTourPicks
          heading="Tours and Tickets for Yokohama"
          intro="A host for the day, the museum with a guide, Yokohama with Kamakura, and the Chinatown ticket. Klook prices change by date, so open a listing for yours."
          tours={[yokohamaPrivateCityTour, cupNoodlesMuseumGuidedTour, yokohamaKamakuraPrivateGuide, yokohamaChinatownGourmetTicket]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            With children, the island aquarium and park in the south of the city has its own guide: <Link href="/guides/attractions/hakkeijima-sea-paradise-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Hakkeijima Sea Paradise tickets</Link>.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            With small children, the <Link href="/guides/attractions/yokohama-anpanman-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Yokohama Anpanman Children&apos;s Museum</Link> in Minatomirai is ¥2,200–2,800 for everyone aged 1 and over, by dated web ticket.
          </p>
        </section>
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
                    <rect x="4" y="3" width="16" height="14" rx="3" />
                    <line x1="4" y1="10" x2="20" y2="10" />
                    <path d="M7 21l2-4M17 21l-2-4" />
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
            <h2 className={styles.ctaBannerTitle}>Half a day, under 30 minutes from Tokyo</h2>
            <p className={styles.ctaBannerDesc}>
              Book the Cup Noodles Factory slot on the museum&apos;s site, then a host for the day if you want one.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={yokohamaPrivateCityTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Yokohama tour →
              </KlookLink>
              <KlookLink href={cupNoodlesMuseumGuidedTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Cup Noodles Museum tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
