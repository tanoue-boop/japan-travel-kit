import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  asakusaSensojiTwoHourTour,
  tokyoBayYakatabuneDinnerShow,
  tokyoChristmasStayAreas,
  tokyoChristmasTripPrep,
  tokyoDisneyOneDayPassport,
  tokyoDisneyResortHotels,
  tokyoNightTourAkihabaraShibuya,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Tokyo Christmas itinerary, added 22 Nov 2026 (task-jtk-20261122-01).
 *
 * How it differs from its neighbours:
 *  - tokyo-illumination-tours is every display of the 2026–27 season, October to April;
 *  - japan-winter-itinerary is 12 days of winter across Japan;
 *  - japan-new-year-itinerary is 30 Dec – 3 Jan;
 *  - this page is only 23–25 December, one plan per day, and what fills on the 24th and 25th.
 *
 * Sources, all read 22 Nov 2026 unless marked:
 *  - Cabinet Office list of national holidays 2026 and 2027 (no December holiday);
 *  - Marunouchi Illumination 2026 / Gyoko-dori Illumination 2026 (marunouchi.com, official PDF in
 *    the search index): 12 Nov 2026 – 14 Feb 2027, 16:00–23:00, 16:00–24:00 on 1–31 Dec; Gyoko-dori
 *    27 Nov – 25 Dec 16:00–24:00;
 *  - Roppongi Hills Keyakizaka Illumination: 5 Nov – 25 Dec, 17:00–22:00 (roppongihills.com/sp/christmashills/102/);
 *  - Roppongi Hills Christmas Market 2026: 21 Nov – 25 Dec, 11:00–21:00, free (…/101/; dates also on the
 *    CHRISTMAS HILLS photo-booth entry on the same page);
 *  - Tokyo Christmas Market 2026 (tokyochristmas.net): Shin-Toyosu 20 Nov – 25 Dec, 11:00–21:30, last
 *    entry 20:30; Shiba Park 4–25 Dec, 11:00–22:00, last entry 21:00; adults ¥1,000 weekdays / ¥1,500
 *    weekends and holidays, ¥2,000 on 24–25 Dec; children ¥500 / ¥1,000; preschool free;
 *  - TOKYO SKYTREE Dream Christmas 2026: tower lighting 5 Nov – 25 Dec 17:30–22:00, to 24:00 on 24–25 Dec,
 *    dark on listed dates; Tembo Deck candlelight concert 24–25 Dec 18:00 and 20:00, free with admission;
 *  - Tokyo Disney Resort: Disney Christmas 11 Nov – 25 Dec 2026 (tokyodisneyresort.jp/treasure/christmas2026/);
 *    1-Day Passport adult on the official December calendar "As of 12:50 p.m., November 22, 2026":
 *    ¥10,900 on 23 Dec, ¥11,900 on 24 Dec, ¥12,400 on 25 Dec;
 *  - Symphony (symphony-cruise.co.jp/christmas2026/ and the dinner plan page): regular plans not sold on
 *    24–25 Dec 2026; Christmas plans then, reservations from two months before, prepaid, minimum 20 guests
 *    decided 7 days ahead; dinner 19:00–21:30; Christmas Night Cruise 22:10–23:10 on 25 Dec only;
 *  - KFC Japan release of 11 Nov 2026: Christmas orders from 11 Nov, collection 19–25 Dec, ends when the
 *    planned quantity is reached, early-booking price to 13 Dec;
 *  - Shibuya Sky: dates released at 00:00 JST two weeks ahead, sunset first to sell out (read 17 Nov 2026
 *    for the Shibuya Sky guide).
 * Tokyo Midtown's garden hours, the Mega Illumi and the Blue Grotto are not in the table: they were
 * not re-read on this date. No Klook price appears.
 */

const CHECKED = checkedLabel("2026-11-22");
const SKY_CHECKED = checkedLabel("2026-11-17");

const CAO_URL = "https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html";
const MARUNOUCHI_URL = "https://www.marunouchi.com/en/lp/brightholiday2026/";
const MARUNOUCHI_PDF = "https://www.marunouchi.com/lp/brightholiday2026/illumination/marunouchi_illumination_2026.pdf";
const KEYAKI_URL = "https://www.roppongihills.com/sp/christmashills/102/";
const HILLS_MARKET_URL = "https://www.roppongihills.com/sp/christmashills/101/";
const TCM_URL = "https://tokyochristmas.net/";
const TCM_TOYOSU_URL = "https://tokyochristmas.net/shintoyosu/";
const TCM_SHIBA_URL = "https://tokyochristmas.net/shiba/";
const SKYTREE_URL = "https://www.tokyo-skytree.jp/event/christmas2026/";
const TDR_XMAS_URL = "https://www.tokyodisneyresort.jp/treasure/christmas2026/tdl/";
const TDR_PRICE_URL = "https://www.tokyodisneyresort.jp/en/ticket/index/202612/";
const SYMPHONY_URL = "https://www.symphony-cruise.co.jp/christmas2026/";
const SYMPHONY_DINNER_URL = "https://www.symphony-cruise.co.jp/cruising_plan/dinner/dinner_2025/";
const KFC_URL = "https://japan.kfc.co.jp/news_release/8191";
const SKY_URL = "https://www.shibuya-scramble-square.com/sky/ticket/";

const ROUTE = "/guides/attractions/tokyo-christmas-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Day = { day: string; where: string; move: string; time: string; book: ReactNode };

const days: Day[] = [
  {
    day: "Day 1 — Wed 23 Dec",
    where:
      "Marunouchi Nakadori and Gyoko-dori from Tokyo Station (lit 16:00–24:00), then the Roppongi Hills Keyakizaka Illumination (17:00–22:00)",
    move: "Walk from Tokyo Station; Tokyo Metro Hibiya Line from Hibiya to Roppongi",
    time: "Evening, about 16:00–22:00",
    book: (
      <>
        <K href={tokyoNightTourAkihabaraShibuya.url}>Tokyo night tour</K> or a{" "}
        <K href={tokyoBayYakatabuneDinnerShow.url}>yakatabune dinner cruise</K>; hotel for 3 nights
      </>
    ),
  },
  {
    day: "Day 2 — Thu 24 Dec (Christmas Eve)",
    where:
      "A Christmas market by day — Tokyo Christmas Market at Shiba Park or Shin-Toyosu, or the free Roppongi Hills market — then TOKYO SKYTREE, lit to 24:00, or a Tokyo Bay Christmas dinner cruise",
    move: "Toei Mita Line to Onarimon for Shiba Park; Yurikamome to Shin-Toyosu; the cruise boards at Hinode Pier",
    time: "A full day; dinner cruise 19:00–21:30",
    book: (
      <>
        Market ticket (¥2,000 adult on 24 Dec); the Symphony&apos;s Christmas cruise on its own site, or the{" "}
        <K href={tokyoBayYakatabuneDinnerShow.url}>yakatabune cruise</K> if 24 Dec is open
      </>
    ),
  },
  {
    day: "Day 3 — Fri 25 Dec",
    where:
      "Tokyo Disneyland or DisneySea on the last day of Disney Christmas — or Asakusa and Senso-ji by day and Odaiba at night",
    move: "JR Keiyo Line to Maihama; or the Ginza Line to Asakusa, then the Yurikamome from Shimbashi to Odaiba",
    time: "A full day",
    book: (
      <>
        <K href={tokyoDisneyOneDayPassport.url}>Disney 1-Day Passport</K> (¥12,400 adult on 25 Dec) or the{" "}
        <K href={asakusaSensojiTwoHourTour.url}>Asakusa &amp; Senso-ji walk</K>
      </>
    ),
  },
];

type Light = { name: string; where: string; period: string; hours: string; price: string; source: ReactNode };

const lights: Light[] = [
  {
    name: "Marunouchi Illumination 2026",
    where: "Marunouchi Nakadori, about 1.2 km — Tokyo Station (Marunouchi side)",
    period: "12 Nov 2026 – 14 Feb 2027",
    hours: "16:00–23:00; 16:00–24:00 from 1 to 31 Dec",
    price: "Free",
    source: ext(MARUNOUCHI_PDF, "marunouchi.com"),
  },
  {
    name: "Gyoko-dori Illumination 2026",
    where: "Gyoko-dori, Tokyo Station to the Imperial Palace Outer Garden",
    period: "27 Nov – 25 Dec 2026",
    hours: "16:00–24:00",
    price: "Free",
    source: ext(MARUNOUCHI_PDF, "marunouchi.com"),
  },
  {
    name: "Roppongi Hills Keyakizaka Illumination “SNOW & BLUE”",
    where: "Keyakizaka-dori, about 400 m — Roppongi",
    period: "5 Nov – 25 Dec 2026",
    hours: "17:00–22:00 (may change without notice)",
    price: "Free",
    source: ext(KEYAKI_URL, "roppongihills.com"),
  },
  {
    name: "TOKYO SKYTREE Dream Christmas lighting",
    where: "The tower, Sumida — Tokyo Skytree or Oshiage",
    period: "5 Nov – 25 Dec 2026; dark on 7 and 12 Nov and 1, 5, 6, 9, 12 and 19 Dec",
    hours: "17:30–22:00; to 24:00 on 24 and 25 Dec",
    price: "Free to see from the street; the Tembo Deck is a ticket",
    source: ext(SKYTREE_URL, "tokyo-skytree.jp"),
  },
  {
    name: "Roppongi Hills Christmas Market 2026",
    where: "O-yane Plaza, Roppongi Hills — Roppongi",
    period: "21 Nov – 25 Dec 2026",
    hours: "11:00–21:00",
    price: "Free entry",
    source: ext(HILLS_MARKET_URL, "roppongihills.com"),
  },
  {
    name: "Tokyo Christmas Market 2026 in Shin-Toyosu",
    where: "Toyosu 6-4, Koto — Shin-Toyosu (Yurikamome), 2 min on foot",
    period: "20 Nov – 25 Dec 2026",
    hours: "11:00–21:30, last entry 20:30",
    price: "Adult ¥1,000 weekdays, ¥1,500 weekends and holidays; ¥2,000 on 24–25 Dec. Child ¥500 (¥1,000 on 24–25 Dec); preschool free",
    source: ext(TCM_TOYOSU_URL, "tokyochristmas.net"),
  },
  {
    name: "Tokyo Christmas Market 2026 in Shiba Park",
    where: "Onarimon Station square, Shiba Park — Onarimon (Toei Mita Line) exit A6, 1 min",
    period: "4 – 25 Dec 2026",
    hours: "11:00–22:00, last entry 21:00 (opening day from 16:00)",
    price: "Adult ¥1,000 weekdays, ¥1,500 weekends; ¥2,000 on 24–25 Dec. Child ¥500 (¥1,000 on 24–25 Dec); preschool free",
    source: ext(TCM_SHIBA_URL, "tokyochristmas.net"),
  },
  {
    name: "Disney Christmas (Tokyo Disneyland and Tokyo DisneySea)",
    where: "Both parks — Maihama (JR Keiyo Line)",
    period: "11 Nov – 25 Dec 2026",
    hours: "Park hours; the Disneyland Christmas parade is about 45 minutes, once a day",
    price: "Park ticket — 1-Day Passport adult ¥10,900 / ¥11,900 / ¥12,400 on 23 / 24 / 25 Dec",
    source: ext(TDR_XMAS_URL, "tokyodisneyresort.jp"),
  },
];

type Busy = { what: string; when: string; rule: string; source: ReactNode };

const busyRows: Busy[] = [
  {
    what: "Symphony dinner cruise, Tokyo Bay",
    when: "24–25 Dec",
    rule: "Only Christmas plans sail; the regular plans are not sold. Bookings open two months before the date, are prepaid, and each cruise needs 20 guests, decided 7 days ahead. The Christmas Night Cruise (22:10–23:10) is 25 Dec only",
    source: ext(SYMPHONY_URL, "symphony-cruise.co.jp"),
  },
  {
    what: "KFC Christmas orders",
    when: "Collection 19–25 Dec",
    rule: "Orders since 11 Nov in store and on KFC Net Order; taking orders stops when the planned quantity is reached. Early-booking price to 13 Dec",
    source: ext(KFC_URL, "japan.kfc.co.jp"),
  },
  {
    what: "Tokyo Christmas Market",
    when: "24–25 Dec",
    rule: "The two dearest days: adult ¥2,000 against ¥1,000 on a weekday. Last entry 20:30 (Shin-Toyosu) or 21:00 (Shiba Park)",
    source: ext(TCM_URL, "tokyochristmas.net"),
  },
  {
    what: "TOKYO SKYTREE Tembo Deck",
    when: "24–25 Dec, 18:00 and 20:00",
    rule: "Candlelight concert, free with deck admission; entry to it may be restricted when crowded",
    source: ext(SKYTREE_URL, "tokyo-skytree.jp"),
  },
  {
    what: "Shibuya Sky evening slots",
    when: "Any evening",
    rule: `Each date goes on sale at 00:00 JST two weeks ahead — 10 Dec for 24 Dec — and sunset sells out first (read ${SKY_CHECKED})`,
    source: ext(SKY_URL, "shibuya-scramble-square.com"),
  },
  {
    what: "Tokyo Disney Resort",
    when: "25 Dec",
    rule: "¥12,400 for an adult 1-Day Passport, the top price on the December calendar — the same as 26 Dec and the Saturdays 5, 12 and 19 Dec",
    source: ext(TDR_PRICE_URL, "tokyodisneyresort.jp"),
  },
];

const faqItems = [
  {
    q: "Is Christmas a holiday in Japan?",
    a: `No. 25 December is not one of Japan's national holidays — the Cabinet Office's list for 2026 has none in December — so it is an ordinary working day. In 2026 it falls on a Friday. Christmas in Japan is a seasonal event: lights, markets and dinners out, not a day off. Checked ${CHECKED}.`,
  },
  {
    q: "What is the best 3-day Tokyo Christmas itinerary?",
    a: "23 December: the Marunouchi lights from Tokyo Station (16:00–24:00 in December) and the Keyakizaka Illumination in Roppongi (17:00–22:00). 24 December: a Christmas market by day, then TOKYO SKYTREE lit until midnight or a Tokyo Bay dinner cruise. 25 December: Tokyo Disneyland or DisneySea on the last day of Disney Christmas, or Asakusa and Odaiba.",
  },
  {
    q: "Where are the best Christmas lights in Tokyo in 2026?",
    a: `Marunouchi Nakadori — about 1.2 km of street trees from Tokyo Station, lit 16:00–24:00 throughout December and free — with Gyoko-dori lit to midnight until 25 December. The Roppongi Hills Keyakizaka Illumination runs 17:00–22:00 to 25 December, and TOKYO SKYTREE's Christmas lighting stays on until 24:00 on 24 and 25 December. Checked ${CHECKED} on each operator's site.`,
  },
  {
    q: "Do I need to book Christmas Eve dinner in Tokyo?",
    a: "Yes, for anything with a view or a set menu. On the Symphony on Tokyo Bay only Christmas plans sail on 24 and 25 December 2026; they open two months before the date and are prepaid. Christmas Eve in Japan is an evening for couples, so the tables that go first are the dinner cruises and restaurants with a view. Book the evening before the hotel fills around it.",
  },
  {
    q: "Is Tokyo Disneyland crowded at Christmas?",
    a: `Expect it to be busy on 24 and 25 December. The resort prices tickets by date, and on its December calendar an adult 1-Day Passport is ¥11,900 on 24 December and ¥12,400 on 25 December — the top price, the same as 26 December and the December Saturdays — against ¥10,900 on most weekdays (as of 22 November 2026). 25 December is the last day of Disney Christmas. Buy the ticket for a fixed date before you go.`,
  },
  {
    q: "What is open in Tokyo on December 25?",
    a: "Almost everything, because it is not a holiday. It is also the last night of most Christmas events: the Keyakizaka Illumination, Gyoko-dori, the SKYTREE Christmas lighting, the Roppongi Hills and Tokyo Christmas markets and Disney Christmas all end on 25 December 2026. Marunouchi Nakadori stays lit until 14 February 2027.",
  },
  {
    q: "Why do people eat KFC at Christmas in Japan?",
    a: "Fried chicken from KFC is a Christmas dinner habit in Japan, and it is ordered ahead. KFC Japan took Christmas orders from 11 November 2026 for collection between 19 and 25 December, and stops taking them once the planned quantity is reached. If you are staying somewhere with a table, order early; on 24 December, KFC Net Order collections before 13:00 or after 20:00 count as off-peak.",
  },
  {
    q: "How much is the Tokyo Christmas Market in 2026?",
    a: "Adults ¥1,000 on weekdays and ¥1,500 at weekends and holidays, rising to ¥2,000 on 24 and 25 December; children ¥500, or ¥1,000 on 24–25 December; preschool children free. The same prices apply at both sites, Shin-Toyosu (20 November – 25 December) and Shiba Park (4–25 December). The Roppongi Hills Christmas Market is free to enter.",
  },
];

const TITLE = "Tokyo Christmas Itinerary 2026: 3 Days, Lights & Markets";
const DESCRIPTION =
  "Tokyo Christmas Itinerary for 23–25 Dec 2026: Christmas in Tokyo day by day, things to do in Tokyo at Christmas, and Tokyo in December lights and markets.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/tokyo-illumination-tours", title: "Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free" },
  { href: "/guides/attractions/japan-new-year-itinerary", title: "Japan New Year Itinerary (2026–27): 5 Days, What's Open" },
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
  { href: "/guides/attractions/tokyo-bay-cruise", title: "Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices" },
  { href: "/guides/attractions/tokyo-observation-decks", title: "Best Observation Deck in Tokyo: Skytree vs Shibuya Sky vs Tokyo Tower" },
  { href: "/guides/attractions/tokyo-disney-tickets", title: "Tokyo Disneyland Tickets 2026: Prices, Dates & How to Buy" },
  { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary (2026): What to Book, and in What Order" },
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

export default function TokyoChristmasItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo Christmas Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo Christmas Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Christmas Itinerary 2026: <br />3 Days, 23 to 25 December
          </h1>
          <p className={styles.heroSubtitle}>
            Christmas in Tokyo, one plan per day: the lights, the markets, Christmas Eve dinner and Disney on
            the 25th — with the dates, hours and prices from each official site.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Dates and prices from official sites", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Dates</p>
                <p className={styles.verdictStatValue}>23–25 Dec 2026, 3 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Marunouchi lights</p>
                <p className={styles.verdictStatValue}>16:00–24:00, free</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Market on 24–25 Dec</p>
                <p className={styles.verdictStatValue}>¥2,000 adult</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The best <strong>Tokyo Christmas itinerary</strong> is three days, 23 to 25 December 2026. Day 1 is
              the lights: <strong>Marunouchi Nakadori</strong> from Tokyo Station, lit 16:00–24:00 throughout
              December and free, then the Roppongi Hills <strong>Keyakizaka Illumination</strong>, 17:00–22:00 until
              25 December, also free. Day 2, Christmas Eve, is a Christmas market by day — the Tokyo Christmas
              Market in Shiba Park (11:00–22:00) or Shin-Toyosu (11:00–21:30), ¥2,000 for an adult on 24–25
              December, or the free Roppongi Hills market (11:00–21:00) — then TOKYO SKYTREE, lit until 24:00 on
              24 and 25 December, or a Tokyo Bay dinner cruise from 19:00 to 21:30. Day 3 is Tokyo Disneyland or
              DisneySea on the last day of Disney Christmas (11 November – 25 December; adult 1-Day Passport
              ¥12,400 that day), or Asakusa by day and Odaiba at night. Christmas is not a public holiday in
              Japan: 25 December is an ordinary working day. Christmas Eve is the evening couples go out, so the
              dinner tables and cruises on the 24th are the bookings that go first. And KFC fried chicken is a
              Christmas dinner you order ahead — KFC Japan hands over its Christmas orders from 19 to 25 December.
              Checked {CHECKED} on each operator&apos;s own site.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              This page is only the three days around Christmas. Every display of the season, October to April, is
              in the <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations guide</Link>; a
              longer trip through the rest of winter is the{" "}
              <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link>; and 30
              December to 3 January has its own{" "}
              <Link href="/guides/attractions/japan-new-year-itinerary">Japan New Year itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Tokyo night tour →
              </KlookLink>
              <KlookLink href={tokyoChristmasStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Hotels near Tokyo Station →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same trip"
          heading="What Should You Book for Christmas in Tokyo?"
          intro="The night tour, the dinner cruise, the hotel, data and the subway ticket. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoChristmasTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day by day</span>
          <h2 className={styles.sectionTitle}>Christmas in Tokyo: What Do You Do on Each of the Three Days?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Lights on the 23rd, a market and an evening out on the 24th, Disney or Asakusa on the 25th. Each row
            is one day: where you go, how you move, how long it takes, and what to book for it.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Things to do in Tokyo at Christmas: the day table</h3>
          <SimpleTable
            head={["Day", "Where", "Getting around", "Time needed", "Book ahead"]}
            rows={days.map((d) => [d.day, d.where, d.move, d.time, d.book])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(MARUNOUCHI_PDF, "marunouchi.com")}, {ext(KEYAKI_URL, "roppongihills.com")},{" "}
            {ext(TCM_URL, "tokyochristmas.net")}, {ext(SKYTREE_URL, "tokyo-skytree.jp")},{" "}
            {ext(SYMPHONY_URL, "symphony-cruise.co.jp")}, {ext(TDR_XMAS_URL, "tokyodisneyresort.jp")},{" "}
            {ext(TDR_PRICE_URL, "Tokyo Disney Resort price calendar")}. Times are planning guides. Tours run on
            the dates their listing shows — check 23–25 December before you plan around one.
          </p>
          <p className={styles.bodyText}>
            Want more days either side? The ordinary-week plans are the{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link>, the{" "}
            <Link href="/guides/attractions/tokyo-4-day-itinerary">Tokyo 4 day itinerary</Link> and the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">Tokyo 5 day itinerary</Link>.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Holiday or not</span>
          <h2 className={styles.sectionTitle}>Is Christmas a Holiday in Japan?</h2>
          <p className={styles.bodyText}>
            No. The Cabinet Office&apos;s list of national holidays for 2026 has none in December, so 25 December
            — a Friday this year — is an ordinary working day ({ext(CAO_URL, "cao.go.jp")}, checked {CHECKED}).
            Christmas in Japan is a season of lights, markets and dinners out rather than a day off, and most of
            the Christmas events close on the evening of the 25th.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Why do people eat KFC at Christmas in Japan?</h3>
          <p className={styles.bodyText}>
            Fried chicken from KFC is a Christmas dinner habit, and it is ordered in advance. KFC Japan opened its
            Christmas orders on 11 November 2026, in store and on KFC Net Order, for collection between 19 and 25
            December, and stops taking orders once the planned quantity is reached ({ext(KFC_URL, "KFC Japan release")}).
            On KFC Net Order, collections all day 19–23 December and before 13:00 or after 20:00 on 24–25 December
            count as off-peak.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tokyo in December</span>
          <h2 className={styles.sectionTitle}>Where Are the Best Christmas Lights in Tokyo in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Marunouchi Nakadori for the longest walk and the latest finish — lit to midnight all December — and
            Roppongi&apos;s Keyakizaka slope for the classic Christmas view. Most of the Christmas displays and both
            markets end on 25 December. Every row is the 2026 season as its operator published it.
          </p>
          <SimpleTable
            head={["Lights or market", "Where", "2026 dates", "Hours", "Price", "Source"]}
            rows={lights.map((r) => [r.name, r.where, r.period, r.hours, r.price, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(MARUNOUCHI_PDF, "Marunouchi Illumination 2026 (PDF)")},{" "}
            {ext(MARUNOUCHI_URL, "MARUNOUCHI BRIGHT HOLIDAY")}, {ext(KEYAKI_URL, "Keyakizaka Illumination")},{" "}
            {ext(HILLS_MARKET_URL, "Roppongi Hills Christmas Market")}, {ext(TCM_TOYOSU_URL, "Tokyo Christmas Market, Shin-Toyosu")},{" "}
            {ext(TCM_SHIBA_URL, "Shiba Park")}, {ext(SKYTREE_URL, "TOKYO SKYTREE")},{" "}
            {ext(TDR_XMAS_URL, "Tokyo Disney Resort")}. Operators may change hours without notice. More displays,
            including the ones that run into February, are in the{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations guide</Link>.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Which Christmas market should you choose?</h3>
          <p className={styles.bodyText}>
            The Roppongi Hills Christmas Market is free and small — 10 stalls in O-yane Plaza, its 20th year — and
            sits next to the Keyakizaka lights, so it fits Day 1 as well as Day 2. The Tokyo Christmas Market is the
            big ticketed one: in 2026 it has left Hibiya Park and Jingu Gaien for two new sites, Shin-Toyosu by the
            water and Shiba Park (exit A6 of Onarimon, not Shibakoen Station). On 24 and 25 December an adult pays
            ¥2,000, twice the weekday price, so a weekday visit on the 23rd is the cheaper choice.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo night tour →
            </KlookLink>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo Subway Ticket →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Christmas Eve</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book Christmas Eve Dinner in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, for anything with a view or a set menu. Christmas Eve is the evening couples go out in Japan, and
            the operators run it differently from an ordinary night: the Symphony on Tokyo Bay sells only its
            Christmas plans on 24 and 25 December 2026, prepaid. The table lists what changes on those two days.
          </p>
          <SimpleTable
            head={["What", "When", "What the operator says", "Source"]}
            rows={busyRows.map((r) => [r.what, r.when, r.rule, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(SYMPHONY_URL, "Symphony Christmas Cruise 2026")} and{" "}
            {ext(SYMPHONY_DINNER_URL, "its dinner plans page")}, {ext(KFC_URL, "KFC Japan")},{" "}
            {ext(TCM_URL, "tokyochristmas.net")}, {ext(SKYTREE_URL, "tokyo-skytree.jp")},{" "}
            {ext(TDR_PRICE_URL, "Tokyo Disney Resort price calendar")}; Shibuya Sky {SKY_CHECKED} (
            {ext(SKY_URL, "shibuya-scramble-square.com")}). No operator publishes a visitor count for these
            nights, so the table gives their rules and prices, not crowd figures.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Which dinner cruise for Christmas Eve?</h3>
          <p className={styles.bodyText}>
            The Symphony sails from Hinode Pier, dinner 19:00–21:30; on 24–25 December book its Christmas plan on
            the Symphony&apos;s own site, where dates open two months ahead. A yakatabune houseboat is the smaller,
            traditional alternative: the Klook{" "}
            <K href={tokyoBayYakatabuneDinnerShow.url}>yakatabune dinner cruise</K> sells by date, so book it for
            23 December or check whether the 24th is still open on its calendar. The boats are compared in the{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise">Tokyo Bay cruise guide</Link>, and the lit skyline
            from above in{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">Tokyo observation decks</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoBayYakatabuneDinnerShow.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yakatabune dinner cruise →
            </KlookLink>
            <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo night tour →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>25 December</span>
          <h2 className={styles.sectionTitle}>Is Tokyo Disneyland Crowded at Christmas?</h2>
          <p className={styles.bodyText}>
            Expect 24 and 25 December to be busy. Tokyo Disney Resort prices its tickets by date, and on its
            December calendar an adult 1-Day Passport is ¥11,900 on 24 December and ¥12,400 on 25 December — the
            top price, shared with 26 December and the Saturdays of 5, 12 and 19 December — against ¥10,900 on most
            weekdays, including the 23rd ({ext(TDR_PRICE_URL, "tokyodisneyresort.jp")}, as of 22 November 2026).
            The 25th is the last day of Disney Christmas, with the &ldquo;Toys Wonderous Christmas!&rdquo; parade
            (about 45 minutes, once a day) at Tokyo Disneyland. Buy the ticket for a fixed date and park before you
            go; ticket types and how to buy are in{" "}
            <Link href="/guides/attractions/tokyo-disney-tickets">Tokyo Disney tickets</Link>.
          </p>
          <p className={styles.bodyText}>
            Not Disney? Spend the 25th in Asakusa — a guided{" "}
            <K href={asakusaSensojiTwoHourTour.url}>Asakusa &amp; Senso-ji walk</K> takes 2 hours — then go to
            Odaiba for the bay at night, and finish at Keyakizaka or the SKYTREE on their last Christmas evening.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoDisneyOneDayPassport.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo Disney 1-Day Passport →
            </KlookLink>
            <KlookLink href={tokyoDisneyResortHotels.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hotels near Tokyo Disney Resort →
            </KlookLink>
            <KlookLink href={asakusaSensojiTwoHourTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Asakusa &amp; Senso-ji walk →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Last day</span>
          <h2 className={styles.sectionTitle}>What Is Open in Tokyo on December 25?</h2>
          <p className={styles.bodyText}>
            Almost everything — it is not a holiday. It is also the last night of most Christmas events: the
            Keyakizaka Illumination, Gyoko-dori, the SKYTREE Christmas lighting (on until 24:00), the Roppongi Hills
            and Tokyo Christmas markets and Disney Christmas all end on 25 December 2026. The Symphony&apos;s
            Christmas Night Cruise, 22:10–23:10, sails on the 25th only. Marunouchi Nakadori stays lit until 14
            February 2027, so the lights do not end with Christmas. Checked {CHECKED}.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What should you wear in Tokyo in December?</h3>
          <p className={styles.bodyText}>
            A warm coat, gloves and shoes for standing: the lights and markets are outdoors after dark, and a
            cruise deck is colder still. The Symphony&apos;s Christmas plans do not take children under junior-high
            age on most plans, and the market sites have no parking.
          </p>
        </section>

        <KlookStayAreas
          heading="Where Should You Stay for Christmas in Tokyo?"
          intro="Availability and price change by date, so each area links to Klook's hotel search. Read the cancellation terms before paying."
          areas={tokyoChristmasStayAreas}
        />

        <BookingEsimCard lead="Market last-entry times, lighting changes and dated QR tickets — get mobile data before you land." />

        <KlookTourPicks
          heading="Tours for the Christmas Days"
          intro="An evening of the lit city, a dinner on the bay and Asakusa on the 25th. Klook prices and running dates change by date, so open a listing for your days."
          tours={[tokyoNightTourAkihabaraShibuya, tokyoBayYakatabuneDinnerShow, asakusaSensojiTwoHourTour]}
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
            <h2 className={styles.ctaBannerTitle}>Three nights by Tokyo Station, 23–25 December</h2>
            <p className={styles.ctaBannerDesc}>
              Book the hotel and the Christmas Eve evening first, then the market and Disney tickets for their dates.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoChristmasStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Tokyo Station hotels →
              </KlookLink>
              <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Tokyo night tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
