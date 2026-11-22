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
  tokyoBayYakatabuneDinnerShow,
  tokyoCountdownCruise,
  tokyoNewYearsEveStayAreas,
  tokyoNewYearsEveTripPrep,
  tokyoNightTourAkihabaraShibuya,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Tokyo New Year's Eve, added 22 Nov 2026 (task-jtk-20261122-02).
 *
 * How it differs from its neighbours:
 *  - japan-new-year-itinerary is five days, 30 Dec – 3 Jan, Tokyo then Kyoto;
 *  - tokyo-christmas-itinerary is 23–25 Dec;
 *  - this page is only the night of 31 Dec and New Year's Day in Tokyo: where to be at
 *    midnight, and which trains run after it.
 *
 * Sources, all read 22 Nov 2026 unless marked:
 *  - JR East "冬の臨時列車の運転について", 22 Oct 2026 (jreast.co.jp/press/2026/20261022_ho.pdf):
 *    extra trains after the last regular train on 31 Dec on six lines — Yamanote 1:00–4:50 (every
 *    10–30 min), Keihin-Tohoku/Negishi Sakuragicho–Omiya 1:00–4:00 (10–80 min), Chuo-Sobu local
 *    Mitaka–Chiba 0:10–4:40 (10–125 min), Chuo Rapid (Mitaka 1:30/2:20/3:00, Takao 0:40/1:30/2:10),
 *    Yokosuka Line (Yokohama 2:30/4:00, Zushi 1:30/3:10), Sobu/Narita Line (Chiba 1:20/3:10, Narita
 *    2:10/3:50); in route searches from 7 Dec; holiday timetable 30 Dec – 3 Jan;
 *  - Tokyo Metro and Toei: no 2026–27 New Year notice on tokyometro.jp or kotsu.metro.tokyo.jp on
 *    22 Nov 2026 — the page says "awaiting the official announcement", nothing else;
 *  - Meiji Jingu (meijijingu.or.jp/hatsumoude/): the schedule posted on the page (no year on it):
 *    31 Dec 6:40, open through the night; 1 Jan to 18:30; 2–3 Jan 6:40–18:00; busiest 22:00–3:00
 *    and from 10:00 on 1–3 Jan;
 *  - Senso-ji (senso-ji.jp/annual_event/24.html and /02.html): bell at Bentenyama at 0:00, 108
 *    strokes in about 40 minutes; New Year prayers in the main hall from 0:00, 1–7 Jan;
 *  - Zojoji (zojoji.or.jp/news/1415.html, 1 Nov 2026): from this year the bell ceremony is 21:30
 *    and the bell-ringing 21:45 to about 23:00 on 31 Dec, no longer at midnight; bell tickets
 *    ¥2,000 from 1 Dec 9:00 (event page ev_hatsumoude.html);
 *  - Shibuya City (city.shibuya.tokyo.jp/kusei/shisaku/jorei-toshin/sbykankyo.html): drinking in
 *    public places around Shibuya Station banned 18:00–5:00 all year since 1 Oct 2024; no 2026–27
 *    countdown notice on the city's site on 22 Nov 2026;
 *  - Klook 98401 listing (en-US): Countdown Cruise 2026-2027, Symphony, about 2.5 hours from Hinode
 *    Pier, buffet or course dinner, champagne toast on deck at midnight;
 *  - Read 20 Nov 2026 for japan-new-year-itinerary: Tokyo National Museum closed 26–31 Dec, open 1 Jan
 *    12:00–20:00 (tnm.jp); bank holidays 31 Dec – 3 Jan and government offices 29 Dec – 3 Jan (e-Gov).
 * No Klook price appears.
 */

const CHECKED = checkedLabel("2026-11-22");
const NY_CHECKED = checkedLabel("2026-11-20");

const JRE_PDF = "https://www.jreast.co.jp/press/2026/20261022_ho.pdf";
const METRO_NEWS = "https://www.tokyometro.jp/news/";
const TOEI_NEWS = "https://www.kotsu.metro.tokyo.jp/pickup_information/news/subway/";
const MEIJI_URL = "https://www.meijijingu.or.jp/hatsumoude/";
const SENSOJI_BELL_URL = "https://www.senso-ji.jp/annual_event/24.html";
const SENSOJI_URL = "https://www.senso-ji.jp/annual_event/02.html";
const ZOJOJI_URL = "https://www.zojoji.or.jp/news/1415.html";
const ZOJOJI_EVENT_URL = "https://www.zojoji.or.jp/event/ev_hatsumoude.html";
const SHIBUYA_URL = "https://www.city.shibuya.tokyo.jp/kusei/shisaku/jorei-toshin/sbykankyo.html";
const TNM_URL = "https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en";
const BANK_LAW_URL = "https://laws.e-gov.go.jp/law/357CO0000000040";
const GOV_LAW_URL = "https://laws.e-gov.go.jp/law/363AC0000000091";

const ROUTE = "/guides/attractions/tokyo-new-years-eve";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Slot = { time: string; what: string; where: string; source: ReactNode };

const timetable: Slot[] = [
  {
    time: "21:45 – about 23:00",
    what: "Zojoji's New Year bell — moved earlier from this year; it no longer rings at midnight",
    where: "Zojoji, Shiba Park — Onarimon or Shibakoen (Toei Mita Line)",
    source: ext(ZOJOJI_URL, "zojoji.or.jp"),
  },
  {
    time: "22:00",
    what: "Meiji Jingu's busiest window begins (22:00 – 3:00). The gates stay open through the night",
    where: "Meiji Jingu — Harajuku (JR) or Meiji-jingumae (subway), 1 min",
    source: ext(MEIJI_URL, "meijijingu.or.jp"),
  },
  {
    time: "Before midnight",
    what: "Last regular trains of 31 December. Times differ by line and station — check a route search on the night",
    where: "All lines",
    source: ext(JRE_PDF, "JR East"),
  },
  {
    time: "0:00",
    what: "Senso-ji strikes its bell at Bentenyama: 3 opening strokes, then 108, in about 40 minutes. New Year prayers start in the main hall",
    where: "Senso-ji — Asakusa (Ginza Line, Toei Asakusa Line)",
    source: ext(SENSOJI_BELL_URL, "senso-ji.jp"),
  },
  {
    time: "0:00",
    what: "Countdown on the water: champagne toast on deck, on Klook's listing for the 2026-2027 sailing",
    where: "Tokyo Bay, from Hinode Pier — about 2.5 hours on board",
    source: <K href={tokyoCountdownCruise.url}>Klook listing</K>,
  },
  {
    time: "0:10 – 4:40",
    what: "JR extra trains: Chuo-Sobu local line, Mitaka – Chiba, every 10–125 minutes",
    where: "Shinjuku, Yoyogi, Akihabara, Ryogoku",
    source: ext(JRE_PDF, "JR East"),
  },
  {
    time: "0:40, 1:30, 2:10",
    what: "JR extra trains: Chuo Line Rapid from Takao (from Mitaka at 1:30, 2:20 and 3:00)",
    where: "Takao – Mitaka",
    source: ext(JRE_PDF, "JR East"),
  },
  {
    time: "1:00 – 4:50",
    what: "JR extra trains: Yamanote Line both ways, every 10–30 minutes; Keihin-Tohoku – Negishi Line 1:00 – 4:00, every 10–80 minutes",
    where: "Harajuku, Shibuya, Shinjuku, Tokyo, Shimbashi, Ueno",
    source: ext(JRE_PDF, "JR East"),
  },
  {
    time: "Until 2:00 and after",
    what: "Tokyo Metro and Toei subway: 2026–27 New Year service awaiting the official announcement",
    where: "All subway lines",
    source: (
      <>
        {ext(METRO_NEWS, "tokyometro.jp")}, {ext(TOEI_NEWS, "kotsu.metro.tokyo.jp")}
      </>
    ),
  },
];

type Shrine = { place: string; dec31: string; jan1: string; crowd: string; access: string; source: ReactNode };

const shrines: Shrine[] = [
  {
    place: "Meiji Jingu",
    dec31: "Opens 6:40 and stays open through the night",
    jan1: "Open to 18:30; 2–3 Jan 6:40–18:00",
    crowd: "Busiest 22:00 on 31 Dec to 3:00, and after 10:00 on 1–3 Jan",
    access: "Harajuku (JR), Meiji-jingumae (Chiyoda and Fukutoshin lines), 1 min",
    source: ext(MEIJI_URL, "meijijingu.or.jp — schedule as posted, no year on it"),
  },
  {
    place: "Senso-ji",
    dec31: "Bell at Bentenyama from 0:00, about 40 minutes",
    jan1: "New Year prayers in the main hall from 0:00, 1–7 Jan",
    crowd: "Outer hall and approach packed at midnight, on the temple's own description",
    access: "Asakusa (Ginza Line, Toei Asakusa Line)",
    source: (
      <>
        {ext(SENSOJI_BELL_URL, "senso-ji.jp")} · {ext(SENSOJI_URL, "New Year prayers")}
      </>
    ),
  },
  {
    place: "Zojoji",
    dec31: "Bell ceremony 21:30; bell-ringing 21:45 to about 23:00 (new times from 2026)",
    jan1: "New Year services; the temple's 2026–27 gate times not posted",
    crowd: "Bell-ringing tickets ¥2,000, a small number, from 1 Dec at 9:00 at the temple office",
    access: "Shiba Park — Onarimon or Shibakoen (Toei Mita Line)",
    source: (
      <>
        {ext(ZOJOJI_URL, "zojoji.or.jp notice, 1 Nov 2026")} · {ext(ZOJOJI_EVENT_URL, "New Year page")}
      </>
    ),
  },
];

type Open = { what: string; days: string; source: ReactNode };

const openRows: Open[] = [
  {
    what: "Meiji Jingu and Senso-ji — open",
    days: "Meiji Jingu to 18:30 on 1 Jan, 6:40–18:00 on 2–3 Jan; Senso-ji New Year prayers 1–7 Jan",
    source: (
      <>
        {ext(MEIJI_URL, "meijijingu.or.jp")}, {ext(SENSOJI_URL, "senso-ji.jp")}
      </>
    ),
  },
  { what: "JR East trains — holiday timetable", days: "30 Dec – 3 Jan", source: ext(JRE_PDF, "JR East, 22 Oct 2026") },
  {
    what: "Tokyo Metro and Toei — timetable",
    days: "2026–27 schedule awaiting the official announcement",
    source: (
      <>
        {ext(METRO_NEWS, "tokyometro.jp")}, {ext(TOEI_NEWS, "kotsu.metro.tokyo.jp")}
      </>
    ),
  },
  {
    what: "Tokyo National Museum — closed, then open",
    days: `Closed 26–31 Dec; open 1 Jan 12:00–20:00 (read ${NY_CHECKED})`,
    source: ext(TNM_URL, "tnm.jp"),
  },
  { what: "Bank branches — closed", days: "31 Dec – 3 Jan (bank holidays by law)", source: ext(BANK_LAW_URL, "e-Gov") },
  { what: "National government offices — closed", days: "29 Dec – 3 Jan", source: ext(GOV_LAW_URL, "e-Gov") },
];

const faqItems = [
  {
    q: "What do people do on New Year's Eve in Tokyo?",
    a: `Most go to a shrine or temple. Meiji Jingu stays open through the night of 31 December, and Senso-ji strikes its New Year bell at 0:00 — the first shrine visit of the year, hatsumode, starts at midnight. Others count down on a Tokyo Bay cruise. From 2026 Zojoji rings its bell earlier, from 21:45 to about 23:00. Checked ${CHECKED} on each site.`,
  },
  {
    q: "Does the Tokyo subway run all night on New Year's Eve?",
    a: `JR East does run extra trains after the last regular train on 31 December 2026 on six lines — the Yamanote Line from about 1:00 to 4:50, every 10–30 minutes, and the Chuo-Sobu local line from 0:10 to 4:40 (JR East, 22 October 2026). For Tokyo Metro and the Toei subway, the 2026–27 New Year service is awaiting the official announcement (none posted on ${CHECKED}).`,
  },
  {
    q: "Where is the best countdown in Tokyo?",
    a: "For the shrine at midnight, Meiji Jingu, open all night; for the bell at 0:00, Senso-ji in Asakusa; for a seat and a toast, the countdown cruise on Tokyo Bay, the one plan sold by date. Zojoji's bell now ends at about 23:00. Shibuya bans drinking in public around the station from 18:00 to 5:00 all year, and no 2026–27 countdown had been posted on the city's site.",
  },
  {
    q: "Do I need to book a New Year's Eve cruise?",
    a: "Yes. The countdown cruise is one sailing on one night, sold ahead by date — Klook lists the Symphony's 2026-2027 Countdown Cruise from Hinode Pier at about 2.5 hours with dinner and a champagne toast on deck. Book it, and a hotel near the JR lines that run extra trains, before December.",
  },
  {
    q: "What is hatsumode in Tokyo?",
    a: "Hatsumode is the first shrine or temple visit of the new year. In Tokyo the big ones are Meiji Jingu (open through the night of 31 December, to 18:30 on 1 January), Senso-ji (New Year prayers in the main hall from 0:00, through 7 January) and Zojoji. Meiji Jingu names 22:00–3:00 and after 10:00 on 1–3 January as its busiest hours.",
  },
  {
    q: "Is Meiji Jingu open all night on New Year's Eve?",
    a: `Yes, on the schedule posted on its site: the gates open at 6:40 on 31 December and stay open through the night, then close at 18:30 on 1 January. The page carries no year, so look again in December (checked ${CHECKED}).`,
  },
  {
    q: "What is closed in Tokyo on January 1?",
    a: `Bank branches (31 December – 3 January are bank holidays) and national government offices (29 December – 3 January). Many museums close at the end of December — the Tokyo National Museum is shut 26–31 December and reopens on 1 January, 12:00–20:00 (read ${NY_CHECKED}). Shrines, temples and the trains run.`,
  },
  {
    q: "Is it safe to go to Shibuya on New Year's Eve?",
    a: "It is crowded, and the rules are strict: Shibuya City bans drinking on the street and in parks around Shibuya Station from 18:00 to 5:00 every day of the year (since 1 October 2024). If you want a countdown with a crowd, a shrine at midnight is the more usual Tokyo choice.",
  },
];

const TITLE = "Tokyo New Year's Eve 2026: Countdown, Trains & Hatsumode";
const DESCRIPTION =
  "Tokyo New Year's Eve 2026: New Year's Eve in Tokyo hour by hour, the Tokyo countdown at shrines or on a cruise, hatsumode Tokyo hours and late trains.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/japan-new-year-itinerary", title: "Japan New Year Itinerary (2026–27): 5 Days, What's Open" },
  { href: "/guides/attractions/tokyo-christmas-itinerary", title: "Tokyo Christmas Itinerary 2026: 3 Days, Lights & Markets" },
  { href: "/guides/attractions/tokyo-bay-cruise", title: "Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices" },
  { href: "/guides/attractions/tokyo-illumination-tours", title: "Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free" },
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
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

export default function TokyoNewYearsEvePage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo New Year's Eve", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo New Year&apos;s Eve</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo New Year&apos;s Eve 2026: <br />Countdown, Late Trains and Hatsumode
          </h1>
          <p className={styles.heroSubtitle}>
            New Year&apos;s Eve in Tokyo from 22:00 to 2:00: the shrines and bells at midnight, the countdown
            cruise, and which trains run after the last one — from each official site.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Times from official sites", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Meiji Jingu</p>
                <p className={styles.verdictStatValue}>Open all night</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Senso-ji bell</p>
                <p className={styles.verdictStatValue}>0:00, about 40 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Yamanote extra trains</p>
                <p className={styles.verdictStatValue}>1:00–4:50</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              On <strong>Tokyo New Year&apos;s Eve</strong>, 31 December 2026, there are four ways to see in the year:
              the countdown at <strong>Meiji Jingu</strong>, which stays open through the night; the New Year bell at{" "}
              <strong>Senso-ji</strong> in Asakusa, struck at 0:00 and rung 108 times in about 40 minutes;{" "}
              <strong>Zojoji</strong>&apos;s bell, which from this year rings earlier, 21:45 to about 23:00; or a{" "}
              <strong>countdown cruise</strong> on Tokyo Bay, about 2.5 hours from Hinode Pier with a toast on deck at
              midnight. Hatsumode — the first shrine visit of the year — starts at midnight at all of them. After the
              last regular train, JR East runs extra trains on six lines: the Yamanote Line from about 1:00 to 4:50,
              every 10–30 minutes, and the Chuo-Sobu local line from 0:10 to 4:40 (JR East, 22 October 2026). For
              Tokyo Metro and the Toei subway, the 2026–27 New Year service is awaiting the official announcement.
              Checked {CHECKED} on each operator&apos;s own site.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              This page is the night of 31 December and New Year&apos;s Day in Tokyo. Five days over the holiday,
              Tokyo then Kyoto, are the{" "}
              <Link href="/guides/attractions/japan-new-year-itinerary">Japan New Year itinerary</Link>; the week
              before is the <Link href="/guides/attractions/tokyo-christmas-itinerary">Tokyo Christmas itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoCountdownCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Tokyo countdown cruise 2026-27 →
              </KlookLink>
              <KlookLink href={tokyoNewYearsEveStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Hotels in Shinjuku →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same trip"
          heading="What Should You Book for New Year's Eve in Tokyo?"
          intro="The countdown cruise, the hotel, a night tour, data and the subway ticket. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoNewYearsEveTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>22:00 to 2:00</span>
          <h2 className={styles.sectionTitle}>What Do People Do on New Year&apos;s Eve in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Most go to a shrine or temple for midnight — the first visit of the year — and a smaller number count
            down on the water. The table runs from 22:00 on 31 December to 2:00 on 1 January: what happens, where,
            and the source for each time.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>New Year&apos;s Eve in Tokyo 2026: the night, hour by hour</h3>
          <SimpleTable
            head={["Time", "What happens", "Where", "Source"]}
            rows={timetable.map((r) => [r.time, r.what, r.where, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(JRE_PDF, "JR East winter extra trains (PDF, 22 Oct 2026)")},{" "}
            {ext(MEIJI_URL, "Meiji Jingu")}, {ext(SENSOJI_BELL_URL, "Senso-ji")}, {ext(ZOJOJI_URL, "Zojoji")},{" "}
            {ext(METRO_NEWS, "Tokyo Metro news")}, {ext(TOEI_NEWS, "Toei news")}. JR East says the extra trains
            appear in its route searches from 7 December. Times marked &ldquo;about&rdquo; are the operators&apos; own.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>After midnight</span>
          <h2 className={styles.sectionTitle}>Does the Tokyo Subway Run All Night on New Year&apos;s Eve?</h2>
          <p className={styles.bodyText}>
            JR does; for the subway, the 2026–27 schedule is awaiting the official announcement. JR East will run
            extra trains after the last regular service on 31 December 2026 on six lines: the Yamanote Line both
            ways (about 1:00–4:50, every 10–30 minutes), the Keihin-Tohoku – Negishi Line between Sakuragicho and
            Omiya (1:00–4:00, every 10–80 minutes), the Chuo-Sobu local line between Mitaka and Chiba (0:10–4:40,
            every 10–125 minutes), and a few trains each on the Chuo Line Rapid, the Yokosuka Line and the Sobu and
            Narita lines ({ext(JRE_PDF, "JR East, 22 Oct 2026")}). From 30 December to 3 January JR runs its holiday
            timetable. Tokyo Metro and the Toei subway had posted no 2026–27 New Year notice on {CHECKED}; look at{" "}
            {ext(METRO_NEWS, "tokyometro.jp")} and {ext(TOEI_NEWS, "kotsu.metro.tokyo.jp")} in December.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Does the Tokyo Subway Ticket cover the night trains?</h3>
          <p className={styles.bodyText}>
            No — the <K href={tokyoSubwayTicket.url}>Tokyo Subway Ticket</K> covers Tokyo Metro and Toei only, so the
            JR extra trains after midnight are a separate fare (an IC card such as Suica covers both). It is the
            ticket for the days around it: Meiji-jingumae, Asakusa and Onarimon are all subway stations. The JR
            Yamanote Line stops at Harajuku for Meiji Jingu, which is why a hotel on that loop is the easy way home.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hatsumode Tokyo</span>
          <h2 className={styles.sectionTitle}>Where Is the Best Countdown in Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For the shrine at midnight, Meiji Jingu; for the bell at 0:00, Senso-ji; for a seat and a toast, the
            bay cruise. Zojoji, below Tokyo Tower, now finishes its bell before midnight. The table gives each
            one&apos;s hours on 31 December and 1 January, and when it is most crowded, as the shrine or temple
            publishes it.
          </p>
          <SimpleTable
            head={["Shrine or temple", "31 Dec", "1 Jan", "Crowds and tickets", "Station", "Source"]}
            rows={shrines.map((r) => [r.place, r.dec31, r.jan1, r.crowd, r.access, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(MEIJI_URL, "meijijingu.or.jp/hatsumoude")},{" "}
            {ext(SENSOJI_BELL_URL, "senso-ji.jp (bell)")}, {ext(SENSOJI_URL, "senso-ji.jp (New Year prayers)")},{" "}
            {ext(ZOJOJI_URL, "zojoji.or.jp (bell time change, 1 Nov 2026)")}. Meiji Jingu&apos;s schedule page carries
            no year; it may be updated in December. Senso-ji publishes no New Year gate hours.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What about the Shibuya countdown?</h3>
          <p className={styles.bodyText}>
            Shibuya City bans drinking on the street and in parks around Shibuya Station from 18:00 to 5:00 every
            day of the year, since 1 October 2024 ({ext(SHIBUYA_URL, "city.shibuya.tokyo.jp")}), and no 2026–27
            countdown had been posted on the city&apos;s site on {CHECKED}. The crossing will be busy; it is not an
            event with a programme. For a lit skyline at night on another evening, see the{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations guide</Link>.
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
          <span className={styles.sectionLabel}>On the water</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book a New Year&apos;s Eve Cruise?</h2>
          <p className={styles.bodyText}>
            Yes. It is one sailing on one night, sold ahead by date. Klook lists the Symphony&apos;s{" "}
            <K href={tokyoCountdownCruise.url}>Countdown Cruise 2026-2027</K> from Hinode Pier at about 2.5 hours, with a
            buffet or a course dinner and a champagne toast on deck at midnight. Before paying, check that the date
            on the listing is 31 December 2026, and read its cancellation terms — a sailing in a strong wind is the
            operator&apos;s call. Hinode Pier is on the Yurikamome from Shimbashi; after the cruise, the JR extra
            trains on the Yamanote and Keihin-Tohoku lines stop at Hamamatsucho and Shimbashi. How the Symphony
            compares with a yakatabune is in the{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise">Tokyo Bay cruise guide</Link>.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What about a New Year&apos;s Eve dinner?</h3>
          <p className={styles.bodyText}>
            Book it for an earlier night if 31 December is full. The{" "}
            <K href={tokyoBayYakatabuneDinnerShow.url}>yakatabune dinner cruise</K> and the{" "}
            <K href={tokyoNightTourAkihabaraShibuya.url}>Tokyo night tour</K> both sell by date, so check whether their
            calendars show 31 December; if not, put them on the 29th or 30th and keep the 31st for the shrine.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoCountdownCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Countdown cruise 2026-27 →
            </KlookLink>
            <KlookLink href={tokyoBayYakatabuneDinnerShow.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yakatabune dinner cruise →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>1 to 3 January</span>
          <h2 className={styles.sectionTitle}>What Is Open and Closed in Tokyo on 1–3 January?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shrines, temples and the trains are open; banks and government offices are shut, and many museums
            close at the end of December. Each row is from the operator or the law that sets it.
          </p>
          <SimpleTable head={["What", "1–3 January", "Source"]} rows={openRows.map((r) => [r.what, r.days, r.source])} />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED} (Tokyo National Museum, banks and government offices: {NY_CHECKED}). Department
            stores and restaurants set their own holiday hours; check each one. What is open on each of the five
            holiday days, in Tokyo and Kyoto, is in the{" "}
            <Link href="/guides/attractions/japan-new-year-itinerary">Japan New Year itinerary</Link>.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What should you wear on New Year&apos;s Eve in Tokyo?</h3>
          <p className={styles.bodyText}>
            A warm coat, gloves and shoes for standing in a queue: shrine approaches and the cruise deck are
            outdoors at midnight. With small children, skip the midnight crowd and go on the morning of 2 or 3
            January, before Meiji Jingu&apos;s busy hours from 10:00.
          </p>
        </section>

        <KlookStayAreas
          heading="Where Should You Stay for New Year's Eve in Tokyo?"
          intro="Near a JR line that runs extra trains after midnight. Availability and price change by date, so each area links to Klook's hotel search. Read the cancellation terms before paying."
          areas={tokyoNewYearsEveStayAreas}
        />

        <BookingEsimCard lead="Night-train route searches, shrine queues and a taxi at 1:00 — get mobile data before you land." />

        <KlookTourPicks
          heading="Bookable Plans Around New Year's Eve"
          intro="The countdown sailing, a dinner on the bay and a night tour. Klook prices and running dates change by date, so open a listing for your days."
          tours={[tokyoCountdownCruise, tokyoBayYakatabuneDinnerShow, tokyoNightTourAkihabaraShibuya]}
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
            <h2 className={styles.ctaBannerTitle}>Midnight on 31 December, booked</h2>
            <p className={styles.ctaBannerDesc}>
              Book the hotel and the countdown cruise first; the shrines need no ticket, only time.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoCountdownCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Countdown cruise →
              </KlookLink>
              <KlookLink href={tokyoNewYearsEveStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Shinjuku hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
