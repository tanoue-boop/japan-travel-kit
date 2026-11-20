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
  japanNewYearStayAreas,
  japanNewYearTripPrep,
  kyotoCityFushimiArashiyamaTour,
  shinkansenTokyoKyoto,
  tokyoCountdownCruise,
  tokyoNightTourAkihabaraShibuya,
  tokyoSightseeingBusTour,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Japan New Year itinerary, added 20 Nov 2026 (task-jtk-20261120-01).
 *
 * How it differs from its neighbours:
 *  - japan-winter-itinerary is 12 days of winter in general (Hokuriku, Takayama, Kyoto);
 *  - this page is only the five holiday days, 30 Dec – 3 Jan, and what is open on each;
 *  - tokyo-4-day-itinerary / kyoto-2-day-itinerary are the ordinary-week versions.
 *
 * Sources, all read 20 Nov 2026:
 *  - Banks: Banking Act Enforcement Order art. 5 (bank holidays include 31 Dec – 3 Jan), e-Gov;
 *  - Government offices: Act on Holidays of Administrative Organs art. 1 (29 Dec – 3 Jan), e-Gov;
 *  - Tokyo National Museum: closed 26–31 Dec 2026, open 1 Jan 2027 12:00–20:00 (tnm.jp, "subject to change");
 *  - Meiji Jingu: New Year gate times and busiest hours from meijijingu.or.jp/hatsumoude — the schedule
 *    last published (for the 2025–26 holiday); the 2026–27 times had not been posted on 20 Nov 2026;
 *  - Senso-ji: midnight bell at Bentenyama, New Year prayers in the main hall 1–7 Jan (senso-ji.jp);
 *    no New Year opening hours are published, so none are printed;
 *  - Kiyomizu-dera: 6:00–18:00 in December and from 1 January (kiyomizudera.or.jp hours page),
 *    joya no kane on the night of 31 Dec, bell-ringing by reservation;
 *  - Kinkaku-ji: 9:00–17:00, open every day of the year, ¥500 adult (shokoku-ji.jp);
 *  - JR Central winter release, 22 Oct 2026: 449 shinkansen a day 25 Dec – 5 Jan, Nozomi all
 *    reserved-seat, reserved tickets on sale one month ahead at 10:00;
 *  - Tokyo → Kyoto about 2 h 10 min by Nozomi (JR Central, as read for the Japan 10-day itinerary).
 * No all-night train service had been announced for 31 Dec 2026 on 20 Nov 2026, so the page has no
 * all-night-train section. No Klook price appears.
 */

const CHECKED = checkedLabel("2026-11-20");
const JRC_RELEASE = "22 Oct 2026";

const JRC_PDF = "https://jr-central.co.jp/news/release/_pdf/000046107.pdf";
const MEIJI_URL = "https://www.meijijingu.or.jp/hatsumoude/";
const SENSOJI_URL = "https://www.senso-ji.jp/annual_event/02.html";
const TNM_URL = "https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en";
const KIYOMIZU_URL = "https://www.kiyomizudera.or.jp/news/open-hour.php";
const KINKAKU_URL = "https://www.shokoku-ji.jp/kinkakuji/access/";
const BANK_LAW_URL = "https://laws.e-gov.go.jp/law/357CO0000000040";
const GOV_LAW_URL = "https://laws.e-gov.go.jp/law/363AC0000000091";

const ROUTE = "/guides/attractions/japan-new-year-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);

type Day = { day: string; where: string; move: string; time: string; book: ReactNode };

const days: Day[] = [
  {
    day: "Day 1 — 30 Dec",
    where: "Arrive in Tokyo; Asakusa and Senso-ji, Nakamise-dori, Ueno",
    move: "Skyliner from Narita to Ueno, or the train from Haneda; then the subway",
    time: "Arrival day; Asakusa 2–3 hours",
    book: (
      <>
        <K href={asakusaSensojiTwoHourTour.url}>Asakusa &amp; Senso-ji walk</K>; hotel for 4 nights
      </>
    ),
  },
  {
    day: "Day 2 — 31 Dec",
    where: "Harajuku and Shibuya by day; the countdown at Meiji Jingu (open all night) or on a Tokyo Bay cruise",
    move: "Subway to Meiji-jingumae; the cruise boards at Hinode Pier",
    time: "Day out, then 22:00 – after midnight",
    book: (
      <>
        <K href={tokyoCountdownCruise.url}>Countdown cruise 2026-27</K> or a{" "}
        <K href={tokyoNightTourAkihabaraShibuya.url}>Tokyo night tour</K> (check it runs on 31 Dec)
      </>
    ),
  },
  {
    day: "Day 3 — 1 Jan",
    where: "Hatsumode (first shrine visit): Meiji Jingu or Senso-ji; Tokyo National Museum opens 12:00–20:00",
    move: "Subway — Meiji-jingumae, Asakusa, Ueno",
    time: "A slow day: shrine 1–2 hours plus queues",
    book: <K href={tokyoSubwayTicket.url}>72-hour Tokyo Subway Ticket (31 Dec – 2 Jan)</K>,
  },
  {
    day: "Day 4 — 2 Jan",
    where: "Hatsuuri (first sales) at stores that open on 2 Jan; Senso-ji if you went to Meiji Jingu on Day 3",
    move: "Subway — Ginza, Shinjuku",
    time: "A full day",
    book: (
      <>
        <K href={tokyoSightseeingBusTour.url}>Tokyo bus day tour</K> (check the date); Kyoto hotel
      </>
    ),
  },
  {
    day: "Day 5 — 3 Jan",
    where: "Shinkansen to Kyoto; Kiyomizu-dera (open to 18:00) or Kinkaku-ji (to 17:00) in the afternoon",
    move: "Tokaido Shinkansen, Tokyo → Kyoto about 2 h 10 min by Nozomi — reserved seats only",
    time: "Half a day travelling, half sightseeing",
    book: (
      <>
        <K href={shinkansenTokyoKyoto.url}>Tokyo → Kyoto shinkansen seat</K>;{" "}
        <K href={kyotoCityFushimiArashiyamaTour.url}>Kyoto day tour</K> for 4 Jan
      </>
    ),
  },
];

type Open = { place: string; dec31: string; jan1: string; jan23: string; source: ReactNode };

const openRows: Open[] = [
  {
    place: "Tokaido Shinkansen (Tokyo – Kyoto – Osaka)",
    dec31: "Runs",
    jan1: "Runs",
    jan23: "Runs",
    source: (
      <>
        449 trains a day 25 Dec – 5 Jan; every Nozomi reserved-seat only.{" "}
        <a href={JRC_PDF} target="_blank" rel="noopener noreferrer">JR Central, {JRC_RELEASE}</a>
      </>
    ),
  },
  {
    place: "Meiji Jingu (Tokyo)",
    dec31: "Opens 6:40; open all night into 1 Jan",
    jan1: "Open to 18:30",
    jan23: "6:40–18:00",
    source: (
      <>
        Last published New Year schedule (2026–27 times not yet posted).{" "}
        <a href={MEIJI_URL} target="_blank" rel="noopener noreferrer">meijijingu.or.jp</a>
      </>
    ),
  },
  {
    place: "Senso-ji (Asakusa, Tokyo)",
    dec31: "New Year bell at midnight (Bentenyama)",
    jan1: "New Year prayers in the main hall from 0:00",
    jan23: "New Year prayers continue to 7 Jan",
    source: (
      <>
        No holiday opening hours published.{" "}
        <a href={SENSOJI_URL} target="_blank" rel="noopener noreferrer">senso-ji.jp</a>
      </>
    ),
  },
  {
    place: "Tokyo National Museum (Ueno)",
    dec31: "Closed (26–31 Dec)",
    jan1: "Open 12:00–20:00",
    jan23: "Open (reopened 1 Jan)",
    source: (
      <>
        &ldquo;Subject to change&rdquo;.{" "}
        <a href={TNM_URL} target="_blank" rel="noopener noreferrer">tnm.jp</a>
      </>
    ),
  },
  {
    place: "Kiyomizu-dera (Kyoto)",
    dec31: "6:00–18:00; New Year bell that night",
    jan1: "6:00–18:00",
    jan23: "6:00–18:00",
    source: (
      <>
        Posted hours for December and from 1 January.{" "}
        <a href={KIYOMIZU_URL} target="_blank" rel="noopener noreferrer">kiyomizudera.or.jp</a>
      </>
    ),
  },
  {
    place: "Kinkaku-ji (Kyoto)",
    dec31: "9:00–17:00",
    jan1: "9:00–17:00",
    jan23: "9:00–17:00",
    source: (
      <>
        Open every day of the year, ¥500 adult.{" "}
        <a href={KINKAKU_URL} target="_blank" rel="noopener noreferrer">shokoku-ji.jp</a>
      </>
    ),
  },
  {
    place: "Bank branches",
    dec31: "Closed",
    jan1: "Closed",
    jan23: "Closed",
    source: (
      <>
        Bank holidays include 31 Dec – 3 Jan by law.{" "}
        <a href={BANK_LAW_URL} target="_blank" rel="noopener noreferrer">e-Gov</a>
      </>
    ),
  },
  {
    place: "National government offices",
    dec31: "Closed",
    jan1: "Closed",
    jan23: "Closed",
    source: (
      <>
        Closed 29 Dec – 3 Jan by law.{" "}
        <a href={GOV_LAW_URL} target="_blank" rel="noopener noreferrer">e-Gov</a>
      </>
    ),
  },
];

const crowdRows = [
  {
    where: "Meiji Jingu — busiest",
    when: "22:00 on 31 Dec to 3:00 on 1 Jan, and from 10:00 on 1–3 Jan",
    what: "The shrine's own guidance, asking visitors to spread out their visit",
    source: <a href={MEIJI_URL} target="_blank" rel="noopener noreferrer">meijijingu.or.jp</a>,
  },
  {
    where: "Senso-ji — busiest",
    when: "Midnight, when the bell is struck at 0:00 on 1 Jan",
    what: "The temple describes the outer hall and the approach packed with visitors at that moment",
    source: <a href={SENSOJI_URL} target="_blank" rel="noopener noreferrer">senso-ji.jp</a>,
  },
  {
    where: "Tokaido Shinkansen",
    when: "25 Dec – 5 Jan",
    what: "Nozomi all reserved-seat, no unreserved cars; up to 13 Nozomi an hour on the busiest days",
    source: <a href={JRC_PDF} target="_blank" rel="noopener noreferrer">JR Central, {JRC_RELEASE}</a>,
  },
];

const faqItems = [
  {
    q: "What is open in Japan on New Year's Day?",
    a: `Shrines, temples and the trains. Meiji Jingu stays open through the night of 31 December and until 18:30 on 1 January on its last published schedule, Senso-ji's New Year prayers start at midnight, Kinkaku-ji in Kyoto opens 9:00–17:00 every day of the year, and the Tokaido Shinkansen runs 449 trains a day from 25 December to 5 January (JR Central). The Tokyo National Museum reopens on 1 January 2027, 12:00–20:00. Bank branches and national government offices are closed. Checked ${CHECKED}.`,
  },
  {
    q: "What is the best 5-day Japan New Year itinerary?",
    a: "30 December: arrive in Tokyo and see Asakusa. 31 December: Harajuku and Shibuya, then the countdown at Meiji Jingu or on a Tokyo Bay cruise. 1 January: hatsumode at Meiji Jingu or Senso-ji and the Tokyo National Museum in the afternoon. 2 January: first sales at the stores that open that day. 3 January: shinkansen to Kyoto for Kiyomizu-dera or Kinkaku-ji.",
  },
  {
    q: "Are banks open in Japan over New Year's?",
    a: `No. Bank holidays in Japan include every day from 31 December to 3 January (Banking Act Enforcement Order, article 5), and national government offices close from 29 December to 3 January (Act on Holidays of Administrative Organs, article 1). Get the cash you need before 31 December. Checked ${CHECKED} on e-Gov.`,
  },
  {
    q: "Is Meiji Jingu open all night on New Year's Eve?",
    a: `Yes, on its last published schedule: the gates open at 6:40 on 31 December and stay open through the night, then close at 18:30 on 1 January; 2 and 3 January are 6:40–18:00. The 2026–27 times had not been posted when checked (${CHECKED}), so look again in December. The shrine lists 22:00–3:00 and after 10:00 on 1–3 January as its busiest hours.`,
  },
  {
    q: "Do shinkansen run over New Year in Japan?",
    a: `Yes, more of them: JR Central plans 449 Tokaido Shinkansen trains a day from 25 December to 5 January, and every Nozomi is reserved-seat only in that period (release of ${JRC_RELEASE}). Reserved tickets go on sale one month before the travel day at 10:00 at JR stations; the smartEX and Express Reservation services take bookings further ahead.`,
  },
  {
    q: "Are museums open in Japan over New Year?",
    a: "Check each one. The Tokyo National Museum, for example, closes from 26 to 31 December 2026 and reopens on 1 January 2027 from 12:00 to 20:00 (tnm.jp, subject to change). Shrines and the big temples are the safe plan for 31 December and 1 January.",
  },
  {
    q: "Should you book hotels early for New Year in Japan?",
    a: "Yes. The holiday week is when Japan itself travels — JR Central runs extra trains for it and makes every Nozomi reserved-only. Book a refundable room now for 30 December – 2 January in Tokyo and from 3 January in Kyoto, then the countdown plan and the Day 5 shinkansen seat.",
  },
  {
    q: "Where should you spend New Year's Eve in Tokyo?",
    a: "At a shrine or temple for midnight — Meiji Jingu is open all night and Senso-ji strikes its bell at 0:00 — or on a dinner cruise on Tokyo Bay with the countdown on deck. The cruise is the one that has to be booked by date.",
  },
];

const TITLE = "Japan New Year Itinerary (2026–27): 5 Days, What's Open";
const DESCRIPTION =
  "Japan New Year Itinerary, 30 Dec–3 Jan: New Year in Japan from Tokyo to Kyoto, what's open in Japan on New Year's Day, and Japan over New Year's bookings.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary: 12 Days, Day by Day (2027)" },
  { href: "/guides/attractions/tokyo-4-day-itinerary", title: "Tokyo 4 Day Itinerary (2026): Day by Day, Day Trip & Costs" },
  { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas Compared" },
  { href: "/guides/attractions/tokyo-illumination-tours", title: "Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free" },
  { href: "/guides/attractions/japan-first-time-itinerary", title: "First Time Japan Itinerary (2026): 9 Days, Day by Day" },
  { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket 2026: 24/48/72-Hour Price, Worth It?" },
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
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

export default function JapanNewYearItineraryPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Japan New Year Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Japan New Year Itinerary</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan New Year Itinerary (2026–27): <br />5 Days From the Tokyo Countdown to Kyoto
          </h1>
          <p className={styles.heroSubtitle}>
            New Year in Japan, 30 December to 3 January: where to be at midnight, what is open on New Year&apos;s
            Day, and the three things to book before you fly.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Opening times from official sites, dated", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatValue}>30 Dec – 3 Jan, 5 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Closed</p>
                <p className={styles.verdictStatValue}>Banks 31 Dec – 3 Jan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Running</p>
                <p className={styles.verdictStatValue}>Shinkansen, 449 trains a day</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The best <strong>Japan New Year itinerary</strong> is five days from 30 December to 3 January:
              arrive in Tokyo on the 30th, count down on the 31st at <strong>Meiji Jingu</strong> (open all night)
              or on a Tokyo Bay cruise, make the first shrine visit of the year on 1 January at Meiji Jingu or{" "}
              <strong>Senso-ji</strong>, shop the first sales on the 2nd, and take the shinkansen to Kyoto (about
              2 hours 10 minutes) on the 3rd. Bank branches are closed from 31 December to 3 January and
              national government offices from 29 December, and the Tokyo National Museum closes 26–31 December, reopening
              on 1 January from 12:00 to 20:00. Shrines, temples and trains keep going: Kinkaku-ji opens 9:00–17:00
              every day of the year, and JR Central runs 449 Tokaido Shinkansen a day from 25 December to 5
              January, with every Nozomi reserved-seat only. Checked {CHECKED} on each operator&apos;s own site.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              This page is only the holiday week. For a longer trip through the rest of winter — Kanazawa,
              Shirakawa-go, Takayama — see the{" "}
              <Link href="/guides/attractions/japan-winter-itinerary">Japan winter itinerary</Link>. Ordinary-week
              versions of the two cities are the{" "}
              <Link href="/guides/attractions/tokyo-4-day-itinerary">Tokyo 4 day itinerary</Link> and the{" "}
              <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2 day itinerary</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={tokyoCountdownCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Tokyo countdown cruise 2026-27 →
              </KlookLink>
              <KlookLink href={japanNewYearStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Hotels in Shinjuku →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same visit"
          heading="Book These for the Five Days"
          intro="The hotel, the New Year's Eve plan, the Day 5 shinkansen seat, the subway ticket, the airport train and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={japanNewYearTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day by day</span>
          <h2 className={styles.sectionTitle}>What Is the Best Japan New Year Itinerary, Day by Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Four nights in Tokyo for the countdown and the first shrine visit, then Kyoto from the 3rd, when the
            city&apos;s temples are still in their New Year days. Each row is one day: where you go, how you move,
            how long it takes and what to book for it.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Japan over New Year&apos;s: the day table</h3>
          <SimpleTable
            head={["Day", "Where", "Getting around", "Time needed", "Book ahead"]}
            rows={days.map((d) => [d.day, d.where, d.move, d.time, d.book])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: Meiji Jingu ({ext(MEIJI_URL, "meijijingu.or.jp")}), Senso-ji (
            {ext(SENSOJI_URL, "senso-ji.jp")}), Tokyo National Museum ({ext(TNM_URL, "tnm.jp")}), Kiyomizu-dera (
            {ext(KIYOMIZU_URL, "kiyomizudera.or.jp")}), Kinkaku-ji ({ext(KINKAKU_URL, "shokoku-ji.jp")}), Tokaido
            Shinkansen ({ext(JRC_PDF, "JR Central release")}). Time at each stop is a planning guide. Tours run
            on the dates their listing shows — check 31 December and 1 January availability before you plan
            around one.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Opening times</span>
          <h2 className={styles.sectionTitle}>What Is Open in Japan on New Year&apos;s Day?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Shrines, temples and the trains are open; bank branches and national government offices are not. Museums are
            the ones to check one by one — the Tokyo National Museum closes for the last six days of December
            and reopens on 1 January. The table has only places whose own site gives the holiday times.
          </p>
          <SimpleTable
            head={["Place", "31 Dec", "1 Jan", "2–3 Jan", "Note & source"]}
            rows={openRows.map((r) => [r.place, r.dec31, r.jan1, r.jan23, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(JRC_PDF, "jr-central.co.jp")}, {ext(MEIJI_URL, "meijijingu.or.jp")},{" "}
            {ext(SENSOJI_URL, "senso-ji.jp")}, {ext(TNM_URL, "tnm.jp")}, {ext(KIYOMIZU_URL, "kiyomizudera.or.jp")},{" "}
            {ext(KINKAKU_URL, "shokoku-ji.jp")}, {ext(BANK_LAW_URL, "Banking Act Enforcement Order, art. 5")},{" "}
            {ext(GOV_LAW_URL, "Act on Holidays of Administrative Organs, art. 1")}. Meiji Jingu&apos;s times are
            from its last published New Year schedule; the 2026–27 version had not been posted on the check
            date. Shops and restaurants set their own holiday days — no general rule is given here.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>What about cash and shopping?</h3>
          <p className={styles.bodyText}>
            Take out the cash you need before 31 December: bank branches do not open again until 4 January. The
            first sales (hatsuuri) start on whichever day each store reopens, and stores publish those dates in
            December, so check the store&apos;s own notice before you plan Day 4 around one.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>New Year&apos;s Eve</span>
          <h2 className={styles.sectionTitle}>Where Should You Spend New Year&apos;s Eve in Tokyo?</h2>
          <p className={styles.bodyText}>
            At a shrine or temple for midnight, or on the water. <strong>Meiji Jingu</strong> opens at 6:40 on
            31 December and does not close for the night, so the first visit of the year can be made at
            0:00 — the shrine lists 22:00 to 3:00 as its busiest hours. <strong>Senso-ji</strong> strikes its
            New Year bell at Bentenyama at 0:00 on 1 January, and the special New Year prayers in the main hall
            begin at the same moment. The third choice is a <strong>countdown cruise</strong> on Tokyo Bay: the
            Klook listing for 2026-27 sails from Hinode Pier for about 2.5 hours with dinner, a band and a toast
            on deck at midnight.
          </p>
          <p className={styles.bodyText}>
            The cruise is the one that sells by date, so book it before the hotel fills around it. Read its
            cancellation terms and the boarding time on the listing before paying. If you would rather be in the
            streets, a guided{" "}
            <K href={tokyoNightTourAkihabaraShibuya.url}>Tokyo night tour</K> runs Ueno, Akihabara and the
            Shibuya crossing; check it is scheduled on 31 December. Hotels for each option are compared in{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link>, and the lights
            still on in late December are in the{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours">Tokyo illuminations</Link> guide.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoCountdownCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Countdown cruise 2026-27 →
            </KlookLink>
            <KlookLink href={tokyoNightTourAkihabaraShibuya.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo night tour →
            </KlookLink>
            <KlookLink href={asakusaSensojiTwoHourTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Asakusa &amp; Senso-ji walk →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Crowds</span>
          <h2 className={styles.sectionTitle}>Is Japan Crowded Over New Year?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes, at the big shrines and on the long-distance trains. Meiji Jingu names its own busiest hours,
            and JR Central makes every Nozomi reserved-seat only from 25 December to 5 January. Neither publishes
            a visitor count, so this table gives the official times and rules rather than numbers.
          </p>
          <SimpleTable
            head={["Where", "When", "What the operator says", "Source"]}
            rows={crowdRows.map((r) => [r.where, r.when, r.what, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(MEIJI_URL, "meijijingu.or.jp")}, {ext(SENSOJI_URL, "senso-ji.jp")},{" "}
            {ext(JRC_PDF, `jr-central.co.jp (release of ${JRC_RELEASE})`)}. For a quieter first visit, go to
            Meiji Jingu early on 2 or 3 January, before 10:00.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>How do you get a shinkansen seat for 3 January?</h3>
          <p className={styles.bodyText}>
            Reserved tickets go on sale one month before the travel day at 10:00 at JR stations — 3 December
            for a 3 January train. JR Central&apos;s smartEX and Express Reservation services take bookings
            further ahead, with a limited number of seats. Klook sells the same Tokyo → Kyoto seats by date.
            Going on to Osaka? Kyoto is the stop before it on the same line.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen →
            </KlookLink>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo Subway Ticket →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>1–3 January</span>
          <h2 className={styles.sectionTitle}>Where Should You Go for Hatsumode, the First Shrine Visit?</h2>
          <p className={styles.bodyText}>
            In Tokyo, Meiji Jingu or Senso-ji — both on the subway ticket, at Meiji-jingumae and Asakusa. Meiji
            Jingu is open until 18:30 on 1 January and 6:40–18:00 on the 2nd and 3rd on its last published
            schedule; Senso-ji holds its New Year prayers in the main hall from 1 to 7 January. After the
            shrine on 1 January, the Tokyo National Museum in Ueno Park is open 12:00–20:00. In Kyoto on the
            3rd, Kiyomizu-dera keeps its 6:00–18:00 hours and Kinkaku-ji 9:00–17:00 (¥500 adult). For the
            following day, a guided{" "}
            <K href={kyotoCityFushimiArashiyamaTour.url}>Kyoto day tour</K> from Kyoto Station covers Fushimi
            Inari, Arashiyama and Kiyomizu-dera; the self-guided route is in the{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2 day itinerary</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoCityFushimiArashiyamaTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kyoto day tour from Kyoto Station →
            </KlookLink>
            <KlookLink href={tokyoSightseeingBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tokyo bus day tour →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hotels</span>
          <h2 className={styles.sectionTitle}>Should You Book Hotels Early for New Year in Japan?</h2>
          <p className={styles.bodyText}>
            Yes — book first, with free cancellation. The New Year week is when Japan itself travels: JR Central
            runs extra trains for it and turns every Nozomi reserved-only. Stay in <strong>Shinjuku</strong> for
            Meiji Jingu (two stops from Harajuku on the Yamanote Line) or <strong>Ueno / Asakusa</strong> for
            Senso-ji and the museum, for the four nights of 30 December to 2 January, then near{" "}
            <strong>Kyoto Station</strong> from the 3rd. Read each room&apos;s cancellation terms before paying;
            the full area comparison is in{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo</Link>.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for New Year in Japan"
          intro="Availability and price are per date, so each area links to Klook's hotel search for it. Read the cancellation terms before paying."
          areas={japanNewYearStayAreas}
        />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Quick questions</span>
          <h2 className={styles.sectionTitle}>Is New Year in Japan Good With Kids?</h2>
          <p className={styles.bodyText}>
            Yes, by day. Avoid the midnight crowds at Meiji Jingu and Senso-ji with small children and make the
            first shrine visit on the morning of 2 or 3 January instead, before Meiji Jingu&apos;s busy hours
            start at 10:00. The Tokyo National Museum&apos;s 1 January opening (12:00–20:00) is an indoor
            afternoon.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>What should you wear?</h3>
          <p className={styles.bodyText}>
            Warm layers and shoes for standing: the midnight visit means an hour or more outdoors in a queue,
            and the queue at the big shrines moves slowly. A hat and gloves help on New Year&apos;s Eve.
          </p>
        </section>

        <BookingEsimCard lead="Holiday timetables, shrine queues and shops closed on different days — get mobile data before you land." />

        <KlookTourPicks
          heading="Tours for the New Year Week"
          intro="The countdown night, the first days of January in Tokyo, and Kyoto from the 3rd. Klook prices and running dates change by date, so open a listing for your days."
          tours={[tokyoCountdownCruise, asakusaSensojiTwoHourTour, tokyoSightseeingBusTour, kyotoCityFushimiArashiyamaTour]}
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
            <h2 className={styles.ctaBannerTitle}>Four nights in Tokyo, then Kyoto on the 3rd</h2>
            <p className={styles.ctaBannerDesc}>
              Book the hotel and the New Year&apos;s Eve plan first, then the Day 5 shinkansen seat when it goes on sale.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={japanNewYearStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Shinjuku hotels →
              </KlookLink>
              <KlookLink href={tokyoCountdownCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Countdown cruise →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
