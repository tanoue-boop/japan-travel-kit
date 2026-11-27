import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, priceById } from "../../../lib/attraction-prices";
import {
  himejiCastleOsakaBusTour,
  jrHarukaUrl,
  jrKansaiAreaPass3276,
  kansai5DayStayAreas,
  kansai5DayTripPrep,
  kansai5DayUsjSameDayCards,
  klookEsim,
  kobeBeefHarbourKitanoDayTour,
  kyotoCityFushimiArashiyamaTour,
  kyotoNaraArashiyamaTour,
  nankaiRapitUrl,
  osakaAmazingPass,
  usjStudioPassUrl,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kansai 5-day itinerary, added 23 Nov 2026 (task-jtk-20261123-01).
 *
 * How it differs from its neighbours:
 *  - osaka-kyoto-3-day-itinerary is three days, Osaka and Kyoto with one day out;
 *  - osaka-3-day-itinerary is Osaka-centred; kyoto-3-day-itinerary is Kyoto-centred;
 *  - japan-5-day-itinerary is Tokyo plus Kyoto;
 *  - this page is five days in and out of Kansai Airport with two day trips (Nara or
 *    Himeji, then Kobe), and the JR pass question for five days.
 *
 * Fares, all adult:
 *  - HARUKA One-way Ticket: Osaka / Shin-Osaka ¥1,900, Kyoto ¥2,700, Kobe ¥2,300 —
 *    westjr.co.jp, carried from osaka-airport-transfer (re-read 23 Nov 2026) and
 *    kansai-area-pass (20 Nov 2026); sold to Temporary Visitor passport holders only,
 *    not inside Japan;
 *  - Rapi:t Kansai Airport → Namba ¥1,410, minimum 34 min (nankai.co.jp, 23 Nov 2026,
 *    via osaka-airport-transfer);
 *  - WEST QR Kansai Area Pass ¥2,700 / ¥4,700 / ¥5,500 / ¥6,700 for 1–4 days
 *    (westjr.co.jp, 20 Nov 2026, the same values as kansai-area-pass);
 *  - JR ordinary fares from JR West's Keihanshin fare table in force since
 *    1 April 2025 (press release of 15 May 2024, 別紙1 and 別紙4, read 23 Nov 2026):
 *    Osaka–Kyoto ¥580, Osaka–Sannomiya ¥420, Kyoto–Nara ¥720, JR Namba–Nara ¥580,
 *    and the 81–90 km band ¥1,460 for Osaka–Himeji (87.9 km; Aboshi, west of Himeji,
 *    joined the zone in the same change). Barrier-free surcharge included.
 *  - Osaka Amazing Pass ¥3,500 and admissions from data/attraction-prices.json.
 * The short Kyoto hops (Kyoto–Inari, Kyoto–Saga-Arashiyama) are left out of the
 * break-even on purpose: they only add to the pass side. No Klook price appears.
 */

const CHECKED = checkedLabel("2026-11-23");
const PASS_CHECKED = checkedLabel("2026-11-20");
const TIMES_CHECKED = checkedLabel("2026-10-29");

const CASTLE = priceById("osakaCastle");
const UMEDA = priceById("umedaSky");
const HIMEJI = priceById("himejiCastle");
const TODAIJI = priceById("todaiji");
const AMAZING = priceById("osakaAmazingPass");

const PASS_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";
const HARUKA_OFFICIAL_URL = "https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/";
const JR_FARE_PDF = "https://www.westjr.co.jp/press/article/items/240515_00_press_keihanshin_unchin.pdf";
const RAPIT_URL = "https://www.nankai.co.jp/en_railway/ticket/rapit";
const KIX_ACCESS_URL = "https://www.kansai-airport.or.jp/en/access/from-airport/train";
const KYOTO_TRAVEL_URL = "https://kyoto.travel/en/";
const AMAZING_URL = "https://www.osaka-amazing-pass.com/en/info.html";

const ROUTE = "/guides/attractions/kansai-5-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Day = { day: string; plan: string; move: string; book: string; klook: ReactNode };

const days: Day[] = [
  {
    day: "Day 1 — Osaka south",
    plan: "Land at Kansai Airport, hotel in Namba, then Dotonbori, Shinsaibashi and Kuromon Market in the evening",
    move: "Nankai Rapi:t to Namba, from 34 min (¥1,410) — or the HARUKA to Shin-Osaka, about 50 min (¥1,900)",
    book: "Airport train seat; hotel for 4 nights",
    klook: (
      <>
        <K href={nankaiRapitUrl}>Rapi:t ticket</K> or <K href={jrHarukaUrl}>HARUKA ticket</K>;{" "}
        <K href={kansai5DayStayAreas[0].url}>Namba hotels</K>; <K href={klookEsim.url}>eSIM</K>
      </>
    ),
  },
  {
    day: "Day 2 — USJ, or Osaka Castle and Umeda",
    plan: `Universal Studios Japan all day — or Osaka Castle at 9:00 (${CASTLE.adult}), the Tombori River Cruise, then the Umeda Sky Building at sunset (${UMEDA.adult})`,
    move: "JR to Universal City for USJ; Osaka Metro for the castle and Umeda",
    book: "USJ ticket and any Express Pass for the date — both dated, no refund",
    klook: (
      <>
        <K href={osakaAmazingPass.url}>Osaka Amazing Pass</K> for the castle day; USJ under the Day 2 cards below
      </>
    ),
  },
  {
    day: "Day 3 — Kyoto Higashiyama and Fushimi Inari",
    plan: "Fushimi Inari at opening light (free, open all day), then Kiyomizu-dera (¥500), Sannenzaka and Gion until dusk",
    move: "JR Special Rapid Osaka → Kyoto about 30 min (¥580); JR Nara Line to Inari, about 10 min from Kyoto Station",
    book: "Nothing compulsory — Fushimi Inari and Gion are free",
    klook: (
      <>
        <K href={kyotoCityFushimiArashiyamaTour.url}>Kyoto day tour</K> or{" "}
        <K href={kansai5DayStayAreas[2].url}>Kyoto Station hotels</K> if you split the stay
      </>
    ),
  },
  {
    day: "Day 4 — Arashiyama and Nara, or Himeji",
    plan: `Arashiyama's bamboo grove before 9:00, then Nara Park and Todai-ji (${TODAIJI.adult}) in the afternoon — or Himeji Castle (${HIMEJI.adult}, 9:00–17:00, last entry 16:00)`,
    move: "Kyoto → Saga-Arashiyama about 25 min; Kyoto → Nara about 41 min on the JR Nara Line (¥720). Osaka → Himeji 1 hr 1 min on the JR Special Rapid",
    book: "Sagano Romantic Train seats in peak season; nothing else",
    klook: (
      <>
        <K href={kyotoNaraArashiyamaTour.url}>Kyoto, Nara &amp; Arashiyama tour</K> or{" "}
        <K href={himejiCastleOsakaBusTour.url}>Himeji Castle tour</K>
      </>
    ),
  },
  {
    day: "Day 5 — Kobe, then the airport",
    plan: "Check out, Kitano's foreign residences and the harbour at Meriken Park in the morning, Kobe beef for lunch, then the airport",
    move: "JR Osaka → Sannomiya about 30 min (¥420); Kobe → Kansai Airport on the HARUKA One-way Ticket (¥2,300)",
    book: "A Kobe beef lunch table; the airport train",
    klook: (
      <>
        <K href={jrHarukaUrl}>HARUKA ticket</K>; the <K href={kobeBeefHarbourKitanoDayTour.url}>Kobe day tour</K> only if you fly on Day 6
      </>
    ),
  },
];

type PassRow = { option: string; nara: string; himeji: string; verdict: string };

const passRows: PassRow[] = [
  {
    option: "Single tickets or ICOCA every day",
    nara: "¥7,660",
    himeji: "¥8,700",
    verdict: "The baseline: ¥1,900 HARUKA in, then the JR fares of Days 3–5",
  },
  {
    option: "HARUKA single on Day 1 + 3-day Kansai Area Pass for Days 3–5 (¥5,500)",
    nara: "¥7,400 — ¥260 less",
    himeji: "¥7,400 — ¥1,300 less",
    verdict: "The one that pays. Kyoto and Arashiyama hops on top only widen the gap",
  },
  {
    option: "HARUKA single on Day 1 + 4-day pass for Days 2–5 (¥6,700)",
    nara: "¥8,600 — ¥940 more",
    himeji: "¥8,600 — ¥100 less",
    verdict: "Day 2 in Osaka uses almost no JR, so the fourth day is wasted",
  },
  {
    option: "4-day pass for Days 1–4 (¥6,700) + Day 5 singles (¥2,720)",
    nara: "¥9,420 — ¥1,760 more",
    himeji: "¥9,420 — ¥720 more",
    verdict: "Covers the cheap arrival leg and misses the dear departure leg",
  },
  {
    option: `Osaka Amazing Pass, Day 2 only (${AMAZING.adult})`,
    nara: "Not JR — a separate decision",
    himeji: "Not JR — a separate decision",
    verdict: `Pays on a day with more than ¥2,680 of admissions: castle ${CASTLE.adult} + Umeda Sky ${UMEDA.adult} + cruise ¥2,000 does it`,
  },
];

type FareRow = { leg: string; fare: string; day: string };

const fareRows: FareRow[] = [
  { leg: "Kansai Airport → Osaka / Shin-Osaka, HARUKA One-way Ticket", fare: "¥1,900", day: "Day 1" },
  { leg: "Osaka ⇄ Kyoto, JR (return)", fare: "¥580 × 2 = ¥1,160", day: "Day 3" },
  { leg: "Osaka → Kyoto, Kyoto → Nara, Nara → JR Namba", fare: "¥580 + ¥720 + ¥580 = ¥1,880", day: "Day 4 (Nara)" },
  { leg: "Osaka ⇄ Himeji, JR (return)", fare: "¥1,460 × 2 = ¥2,920", day: "Day 4 (Himeji)" },
  { leg: "Osaka → Sannomiya, then Kobe → Kansai Airport on the HARUKA One-way Ticket", fare: "¥420 + ¥2,300 = ¥2,720", day: "Day 5" },
];

type BaseRow = { base: string; nights: string; good: string; cost: string };

const baseRows: BaseRow[] = [
  {
    base: "Osaka only (Namba or Umeda)",
    nights: "4 nights, one check-in",
    good: "No luggage move. Every day trip — Kyoto, Nara, Himeji, Kobe — is 30 to 60 minutes from Osaka Station, and Day 5 leaves from the same hotel",
    cost: "Kyoto evenings end with a 30-minute train back; the Arashiyama morning starts with one",
  },
  {
    base: "Osaka 2 nights + Kyoto 2 nights",
    nights: "Nights 1–2 Osaka, nights 3–4 Kyoto",
    good: "Gion after dark and Arashiyama before the crowds without a train first; Nara is 41 minutes from Kyoto Station",
    cost: "One luggage move on Day 3, and Day 5 to Kobe and the airport is the longest travel day. Kyoto charges a banded lodging tax per night",
  },
  {
    base: "Kyoto only",
    nights: "4 nights",
    good: "Only if Kyoto is most of the trip",
    cost: "Day 1 and Day 2 in Osaka become round trips, and Himeji is 1 hr 25 min each way on the Special Rapid",
  },
];

const faqItems = [
  {
    q: "Is 5 days enough for Kansai?",
    a: "Yes, for the four main cities: one day in Osaka's south, one for USJ or Osaka Castle, one for Kyoto's Higashiyama and Fushimi Inari, one for Arashiyama with Nara (or Himeji), and Kobe on the way back to Kansai Airport. What does not fit is a second Kyoto day for Kinkaku-ji and the north-west, or an onsen night such as Arima — add a sixth day for either.",
  },
  {
    q: "Should I stay in Osaka or Kyoto for 5 days?",
    a: "Osaka for four nights is the simplest: one check-in, and Kyoto, Nara, Himeji and Kobe are each 30 to 60 minutes from Osaka Station. Split two and two (Osaka, then Kyoto) if Kyoto evenings and an early Arashiyama matter more than a second luggage move. Staying only in Kyoto makes the Osaka days and Himeji round trips.",
  },
  {
    q: "Is the JR Kansai Area Pass worth it for 5 days?",
    a: `Not the 4-day pass on this plan; the 3-day pass for Days 3 to 5, yes. On single tickets the five days cost ¥7,660 with Nara on Day 4 or ¥8,700 with Himeji. A HARUKA single in (¥1,900) plus the 3-day pass (¥5,500) is ¥7,400 — ¥260 less with Nara, ¥1,300 less with Himeji, before the short Kyoto hops. The 4-day pass (¥6,700) loses because Day 2 in Osaka uses almost no JR. Pass prices from westjr.co.jp, ${PASS_CHECKED}.`,
  },
  {
    q: "Nara or Himeji on Day 4?",
    a: `Nara if you want the deer, Todai-ji's Great Buddha (${TODAIJI.adult}) and can pair it with Arashiyama in the morning — Kyoto to Nara is about 41 minutes on the JR Nara Line. Himeji if you want the castle (${HIMEJI.adult}, last entry 16:00) and accept a whole day for it: 1 hr 1 min each way from Osaka by Special Rapid. Himeji also makes the Kansai Area Pass pay more, because the return fare is ¥2,920.`,
  },
  {
    q: "How do I get from Kansai Airport to Osaka and Kyoto?",
    a: `To Namba, the Nankai Rapi:t from 34 minutes, ¥1,410. To Shin-Osaka or Osaka, the JR HARUKA in about 50 minutes, ¥1,900 on the HARUKA One-way Ticket. To Kyoto, the HARUKA in about 75 minutes, ¥2,700. The HARUKA One-way Ticket is for Temporary Visitor passport holders and cannot be bought inside Japan, so buy it before you fly. Checked ${CHECKED}.`,
  },
  {
    q: "Do I need to book USJ before a Kansai trip?",
    a: "Yes. USJ tickets are dated, prices vary by date, and a pass is valid only for its printed date with no refund. Express Passes are priced on demand and the popular dates sell out first. Book USJ once your Day 2 is fixed; the other four days of this plan need no timed booking except a Sagano Romantic Train seat in peak season.",
  },
  {
    q: "Can I do Kobe on the last day before my flight?",
    a: "Yes, if your flight leaves in the evening. Leave your luggage in a station locker or send it ahead, spend the morning in Kitano and the harbour, eat Kobe beef at lunch, and take the HARUKA One-way Ticket from Kobe to Kansai Airport (¥2,300). Allow time to collect bags and reach the airport two hours before departure.",
  },
];

const TITLE = "Kansai 5 Day Itinerary (2026): Osaka, Kyoto, Nara & Kobe";
const DESCRIPTION =
  "Kansai 5 day itinerary from Kansai Airport: Dotonbori, USJ or Osaka Castle, Kyoto, Nara or Himeji, then Kobe — and whether the JR Kansai Area Pass pays.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "Osaka Kyoto 3 Day Itinerary (2026): Day by Day & Bookings" },
  { href: "/guides/attractions/kansai-area-pass", title: "JR Kansai Area Pass 2026: Price, Coverage & Is It Worth It?" },
  { href: "/guides/attractions/nara-day-trip", title: "Nara Day Trip from Kyoto or Osaka" },
  { href: "/guides/attractions/himeji-castle-day-trip", title: "Himeji Castle Day Trip from Osaka" },
  { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka" },
  { href: "/guides/transport/osaka-airport-transfer", title: "Osaka Airport Transfer: Train vs Bus from KIX & Itami" },
  { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3 Day Itinerary" },
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

export default function Kansai5DayItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kansai 5 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Kansai 5 Day Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kansai 5 Day Itinerary (2026): <br />Osaka, Kyoto, Nara or Himeji, and Kobe
          </h1>
          <p className={styles.heroSubtitle}>
            Five days in and out of Kansai Airport, one plan per day — with the train times, what to book, and
            whether a JR pass pays, worked out on JR West&apos;s own fares.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fares from JR West and Nankai", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Base</p>
                <p className={styles.verdictStatValue}>Osaka, 4 nights</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR fares, 5 days</p>
                <p className={styles.verdictStatValue}>¥7,660 on singles</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best pass</p>
                <p className={styles.verdictStatValue}>3-day, Days 3–5</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The best <strong>Kansai 5 day itinerary</strong> is Day 1 Osaka south (Dotonbori), Day 2 USJ or
              Osaka Castle and Umeda, Day 3 Kyoto&apos;s Higashiyama and Fushimi Inari, Day 4 Arashiyama with
              Nara — or Himeji Castle — and Day 5 Kobe on the way back to Kansai Airport, all from one hotel in
              Osaka. On single tickets the JR legs of those five days cost <strong>¥7,660</strong> with Nara and
              ¥8,700 with Himeji. The <strong>4-day JR Kansai Area Pass (¥6,700) does not pay</strong> on this
              plan, because Day 2 in Osaka uses almost no JR; a HARUKA single in (¥1,900) plus the{" "}
              <strong>3-day pass for Days 3–5 (¥5,500)</strong> is ¥7,400 — ¥260 less with Nara and ¥1,300 less
              with Himeji. JR West fares, checked {CHECKED}.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Three days instead? That is the{" "}
              <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">Osaka Kyoto 3 day itinerary</Link>; a
              trip that stays in one city is the{" "}
              <Link href="/guides/attractions/osaka-3-day-itinerary">Osaka 3 day itinerary</Link> or the{" "}
              <Link href="/guides/attractions/kyoto-3-day-itinerary">Kyoto 3 day itinerary</Link>; and five days
              with Tokyo is the{" "}
              <Link href="/guides/attractions/japan-5-day-itinerary">Japan 5 day itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kansai5DayStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Namba hotels →
              </KlookLink>
              <KlookLink href={kyotoNaraArashiyamaTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Kyoto &amp; Nara day tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same trip"
          heading="What Should You Book for 5 Days in Kansai?"
          intro="The hotel, the Day 4 tour, data, the airport trains and the pass. Klook prices change by date, so open a listing for the figure on your dates."
          items={kansai5DayTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day by day</span>
          <h2 className={styles.sectionTitle}>What Do You Do on Each of the 5 Days in Kansai?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Osaka for the first two days, Kyoto for the third, a day out on the fourth and Kobe on the way out.
            Each row is one day: the plan, how you move and how long it takes, what has to be booked, and the
            Klook product that day uses.
          </p>
          <SimpleTable
            head={["Day", "Plan", "Getting there", "Book ahead", "On Klook"]}
            rows={days.map((d) => [d.day, d.plan, d.move, d.book, d.klook])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(HARUKA_OFFICIAL_URL, "HARUKA One-way Ticket (westjr.co.jp)")},{" "}
            {ext(RAPIT_URL, "Rapi:t (nankai.co.jp)")}, {ext(KIX_ACCESS_URL, "kansai-airport.or.jp")},{" "}
            {ext(JR_FARE_PDF, "JR West Keihanshin fare table")}. Kyoto travel times from{" "}
            {ext(KYOTO_TRAVEL_URL, "kyoto.travel")} ({TIMES_CHECKED}); admissions from each operator&apos;s
            site on the dates in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">attraction price table</Link>. Times are
            planning guides.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day 2</span>
          <h2 className={styles.sectionTitle}>USJ or Osaka Castle on Day 2?</h2>
          <p className={styles.bodyText}>
            USJ takes the whole day and is the one dated, non-refundable booking on this plan: Studio Passes are
            sold for a fixed date about two months ahead, and Express Passes are priced on demand. If USJ is not on
            your list, Day 2 is Osaka Castle at 9:00 ({CASTLE.adult} for the keep), the Tombori River Cruise in
            Dotonbori and the Umeda Sky Building at sunset ({UMEDA.adult}; hours and the rooftop rules in our{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets">Umeda Sky Building tickets</Link> guide) — a day the{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass</Link> ({AMAZING.adult})
            covers, subway included. Times and tickets for the park are in the{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets guide</Link>.
          </p>
          <p className={styles.bodyText}>
            Drivers with a 1949 Geneva International Driving Permit can swap the cruise for an hour on the road:
            an <Link href="/guides/attractions/osaka-go-kart">Osaka go kart</Link> tour runs through Dotonbori and
            Namba from ¥7,000 per person, and JAPANKART&apos;s 90-minute course passes Osaka Castle.
          </p>
        </section>

        <KlookSameDayCards
          heading="What to book for Day 2 in Osaka"
          cards={kansai5DayUsjSameDayCards}
          footnote={
            <>
              Going to the park instead? The{" "}
              <KlookLink href={usjStudioPassUrl} adPlacement="same-day-cards" target="_blank" rel="sponsored nofollow noopener">
                USJ Studio Pass on Klook →
              </KlookLink>{" "}
              is sold for a fixed date; book it before the Express Pass.
            </>
          }
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rail passes</span>
          <h2 className={styles.sectionTitle}>Is the JR Kansai Area Pass Worth It for 5 Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Not the 4-day pass; the 3-day pass for Days 3 to 5, yes. The WEST QR Kansai Area Pass is ¥2,700 for 1
            day, ¥4,700 for 2, ¥5,500 for 3 and ¥6,700 for 4 consecutive days, and there is no 5-day version — so
            the question is which days to cover. The first table is what each JR leg costs on its own; the second
            puts the passes against it.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>The JR legs on single tickets</h3>
          <SimpleTable
            head={["Leg", "Adult fare", "Day"]}
            rows={fareRows.map((r) => [r.leg, r.fare, r.day])}
          />
          <h3 className={styles.sectionTitle} style={h3}>The passes against the singles</h3>
          <SimpleTable
            head={["Option", "With Nara on Day 4", "With Himeji on Day 4", "Verdict"]}
            rows={passRows.map((r) => [r.option, r.nara, r.himeji, r.verdict])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: pass prices {PASS_CHECKED} on {ext(PASS_OFFICIAL_URL, "westjr.co.jp (WEST QR Kansai Area Pass)")},
            the same figures as our <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass guide</Link>;
            HARUKA One-way Ticket {CHECKED} on {ext(HARUKA_OFFICIAL_URL, "westjr.co.jp")}; JR ordinary fares{" "}
            {CHECKED} from {ext(JR_FARE_PDF, "JR West's Keihanshin fare table")} (in force since 1 April 2025);
            the Osaka Amazing Pass on {ext(AMAZING_URL, "osaka-amazing-pass.com")}. ICOCA charges the same fares
            as the singles. Not counted: Kyoto–Inari and Kyoto–Saga-Arashiyama, which only add to the pass side,
            and the subway to and from your hotel.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Which pass should you choose?</h3>
          <p className={styles.bodyText}>
            Buy the HARUKA One-way Ticket for Day 1 before you fly — JR West sells it only to Temporary Visitor
            passport holders and not inside Japan — and start a 3-day Kansai Area Pass on Day 3. It then covers
            Kyoto, Day 4&apos;s Nara or Himeji, and the HARUKA from Kobe to the airport on Day 5, so you buy no
            other JR ticket. On Day 2 use the Osaka Amazing Pass or an ICOCA; neither JR pass helps on the subway.
            The pass does not cover the shinkansen, Kintetsu, Hankyu or Nankai lines, so the Rapi:t to Namba on Day
            1 is always a separate ticket. If Day 4 is Nara from Namba on the Kintetsu instead, the{" "}
            <Link href="/guides/transport/kintetsu-rail-pass">Kintetsu Rail Pass</Link> is the pass to price, though a
            plain return is cheaper on two ¥680 singles.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKansaiAreaPass3276.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kansai Area Pass →
            </KlookLink>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              HARUKA ticket →
            </KlookLink>
            <KlookLink href={osakaAmazingPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Osaka Amazing Pass →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Should I Stay in Osaka or Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Osaka for all four nights, unless Kyoto evenings matter more to you than a second check-in. The day trips
            on this plan all leave from Osaka Station, and Day 5 ends at Kansai Airport, south of Osaka.
          </p>
          <SimpleTable
            head={["Base", "Nights", "What it gives you", "What it costs you"]}
            rows={baseRows.map((r) => [r.base, r.nights, r.good, r.cost])}
          />
          <p className={styles.bodyText} style={note}>
            Travel times: Osaka–Kyoto about 30 min on the JR Special Rapid and Kyoto–Nara about 41 min ({ext(KYOTO_TRAVEL_URL, "kyoto.travel")},{" "}
            {TIMES_CHECKED}); Osaka–Himeji 1 hr 1 min and Kyoto–Himeji 1 hr 25 min on the Special Rapid, from our{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip">Himeji Castle day trip</Link> guide. Hotel prices
            change by date; read the cancellation terms before paying. More areas are compared in{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka</Link>.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Day 4</span>
          <h2 className={styles.sectionTitle}>Nara or Himeji on Day 4?</h2>
          <p className={styles.bodyText}>
            Nara if you want the deer park and Todai-ji&apos;s Great Buddha Hall ({TODAIJI.adult}) and want Arashiyama
            in the same day: the bamboo grove first, before 9:00, then the JR Nara Line from Kyoto (about 41
            minutes, ¥720) and the afternoon in Nara Park. Himeji if you want the white castle and accept that it is the whole day — 1 hr 1 min each way from Osaka on the Special Rapid, with{" "}
            {HIMEJI.adult} admission and last entry at 16:00. Both are free to arrive at without a booking. The
            details are in the <Link href="/guides/attractions/nara-day-trip">Nara day trip</Link> and{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip">Himeji Castle</Link> guides.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What fills up on Day 4?</h3>
          <p className={styles.bodyText}>
            The Sagano Romantic Train in the autumn-leaf and cherry-blossom seasons (when seats open and the
            winter closure are in our{" "}
            <Link href="/guides/attractions/sagano-romantic-train-tickets">Sagano Romantic Train tickets</Link>{" "}
            guide), and the join-in coach tours,
            which sell by date and can be cancelled if they do not reach their minimum group size — read the
            listing&apos;s minimum and cancellation terms before you plan around one. Himeji Castle has no timed entry, but the
            keep can queue for about an hour in peak season. A coach tour from Osaka is the alternative to three
            train changes:{" "}
            <K href={kyotoNaraArashiyamaTour.url}>Kyoto, Nara &amp; Arashiyama day tour</K> or the{" "}
            <K href={himejiCastleOsakaBusTour.url}>Himeji Castle tour from Osaka</K>; ready-made Kyoto and Nara
            days are compared in{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka">Kyoto and Nara day tours from Osaka</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoNaraArashiyamaTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto &amp; Nara day tour →
            </KlookLink>
            <KlookLink href={himejiCastleOsakaBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Himeji Castle tour →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Airport</span>
          <h2 className={styles.sectionTitle}>How Do I Get from Kansai Airport to Osaka and Kyoto?</h2>
          <p className={styles.bodyText}>
            To Namba, the Nankai Rapi:t from 34 minutes, ¥1,410. To Shin-Osaka or Osaka Station, the JR HARUKA in
            about 50 minutes, ¥1,900 on the HARUKA One-way Ticket. To Kyoto, the HARUKA in about 75 minutes, ¥2,700.
            Pick the train that ends where your hotel is: Namba hotels take the Rapi:t, Umeda and Kyoto hotels the
            HARUKA. On the way out, the HARUKA One-way Ticket also runs from Kobe (¥2,300), which is why Day 5 can
            end in Kobe. Checked {CHECKED} on {ext(HARUKA_OFFICIAL_URL, "westjr.co.jp")} and{" "}
            {ext(RAPIT_URL, "nankai.co.jp")}; buses and taxis are in the{" "}
            <Link href="/guides/transport/osaka-airport-transfer">Osaka airport transfer guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nankaiRapitUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Rapi:t ticket →
            </KlookLink>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              HARUKA ticket →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Length</span>
          <h2 className={styles.sectionTitle}>Is 5 Days Enough for Kansai?</h2>
          <p className={styles.bodyText}>
            Yes, for Osaka, Kyoto, Nara or Himeji, and Kobe. What five days leave out is a second Kyoto day — Kinkaku-ji
            and the north-west — and a night at an onsen such as Arima; add a sixth day for either. If you have only
            three, drop Day 4 and Day 5 and follow the{" "}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">Osaka Kyoto 3 day itinerary</Link>. Day 5 in
            Kobe is the easiest to change: it is about 30 minutes from Osaka, and the harbour and Kitano are free —
            see the <Link href="/guides/attractions/kobe-day-trip-from-osaka">Kobe day trip</Link> guide. The one thing
            to book for Day 5 is the lunch table: the{" "}
            <Link href="/guides/attractions/kobe-beef-dinner">Kobe beef restaurant guide</Link> has five restaurants&apos;
            lunch prices from ¥2,508 and how far ahead each needs a booking.
          </p>
        </section>

        <KlookStayAreas
          heading="Where Should You Stay for 5 Days in Kansai?"
          intro="Availability and price change by date, so each area links to Klook's hotel search. Read the cancellation terms before paying."
          areas={kansai5DayStayAreas}
        />

        <BookingEsimCard lead="QR passes, timed USJ entries and five days of train changes — get mobile data before you land." />

        <KlookTourPicks
          heading="Day Tours for the Kansai Days"
          intro="A Kyoto city day, Kyoto and Nara with Arashiyama, Himeji Castle and Kobe. Klook prices and running dates change by date, so open a listing for your days."
          tours={[kyotoCityFushimiArashiyamaTour, kyotoNaraArashiyamaTour, himejiCastleOsakaBusTour, kobeBeefHarbourKitanoDayTour]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Two day trips from Osaka have their own tickets: Nankai&apos;s <Link href="/guides/transport/koyasan-world-heritage-ticket" style={{ color: "var(--red)", fontWeight: 600 }}>Koyasan World Heritage Ticket</Link> for Mt. Koya, and JR&apos;s <Link href="/guides/transport/ise-kumano-wakayama-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Ise-Kumano-Wakayama Area Tourist Pass</Link> for Ise and Kumano.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            An anime day on Awaji Island: <Link href="/guides/attractions/nijigen-no-mori-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Nijigen no Mori tickets</Link> explains the per-attraction prices.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Two more days out with children: <Link href="/guides/attractions/kobe-animal-kingdom-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kobe Animal Kingdom</Link> on Port Island and <Link href="/guides/attractions/adventure-world-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Adventure World</Link> in Shirahama, about 2 hours from Tennoji.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            On the Kobe day, Arima&apos;s <Link href="/guides/attractions/arima-onsen-taiko-no-yu" style={{ color: "var(--red)", fontWeight: 600 }}>Taiko no Yu</Link> is open 10:00–22:00 (¥2,750 weekdays, ¥3,300 from 26 December to 3 January).
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
            <h2 className={styles.ctaBannerTitle}>Four nights in Osaka, five days of Kansai</h2>
            <p className={styles.ctaBannerDesc}>
              Book the hotel and the airport train first, then USJ for its date and the Day 4 tour if you want one.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kansai5DayStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Namba hotels →
              </KlookLink>
              <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                HARUKA ticket →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
