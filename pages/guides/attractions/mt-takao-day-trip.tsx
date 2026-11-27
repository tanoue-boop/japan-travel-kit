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
  keioMtTakaoTicket,
  mtTakaoHikingTour,
  mtTakaoTripPrep,
  nikkoWorldHeritageDayTour,
  tokyoStayAreas,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Mt Takao day trip, added 22 Nov 2026 (task-jtk-20261122-02).
 *
 * Sources, all read 22 Nov 2026:
 *  - Keio fares from Shinjuku (keio.co.jp/global/routes/stations/shinjuku/): Takaosanguchi ¥430,
 *    IC ¥430;
 *  - Keio Mt.TAKAO reserved-seat train (keio.co.jp/zasekishitei/index_mt.html): Saturdays, Sundays
 *    and holidays only; Shinjuku 10:00 → Takaosanguchi 10:46 (No. 1), 11:00 → 11:45 (No. 3); seat
 *    ticket needed; Keio's Takao area page: "as fast as 43 minutes";
 *  - Keio Takao discount ticket fare table (price_takao.pdf, revised 1 Oct 2025): from Shinjuku,
 *    adult ¥1,450 with the cable car or lift both ways, ¥1,090 with it one way;
 *  - JR East fare revision table (2026unchin-kaitei/assets/pdf/tokutei.pdf): Shinjuku – Takao ¥720,
 *    IC ¥715 from 14 Mar 2026;
 *  - Takao Tozan Railway (takaotozan.co.jp/timeprice/): cable car Kiyotaki – Takaosan about 6 min,
 *    every 15 min, first 8:00, last 17:45 weekdays / 18:00 weekends in Sep–Nov, 17:15 / 17:30 in Dec;
 *    lift about 12 min, 9:00 to 16:30 (May–Nov) / 16:00 (Dec–Apr); adult ¥490 one way, ¥980 return,
 *    child ¥250 / ¥500, the same on both; cash, IC cards and contactless cards;
 *  - Takao Tozan diamond-Fuji page: summit about 40 min on foot from the cable car's Takaosan Station;
 *  - Takao Visitor Center (takaovc.ces-net.jp, course pages): Trail 1 3.8 km, up 1 h 40, down 1 h 20,
 *    paved, "for beginners"; Trail 6 3.3 km, up 1 h 40, down 1 h 30, narrow, stream and stepping
 *    stones; Inariyama 3.1 km, up 1 h 40, down 1 h 20, ridge, roots, slippery after rain; "no trail
 *    without steps"; carry a map and a torch; 2.5 million climbers a year;
 *  - Takao Visitor Center autumn page: leaves at their best mid-November to early December in a
 *    usual year; update of 20 Nov 2026: Kiyotaki, Yakuo-in, summit and Momijidai at their best,
 *    cable car line 50%.
 * Journey times on ordinary Keio and JR trains vary by train and are not printed.
 * No Klook price appears.
 */

const CHECKED = checkedLabel("2026-11-22");

const KEIO_FARE_URL = "https://www.keio.co.jp/global/routes/stations/shinjuku/";
const KEIO_MT_URL = "https://www.keio.co.jp/zasekishitei/index_mt.html";
const KEIO_AREA_URL = "https://www.keio.co.jp/area/takao/";
const KEIO_TICKET_PDF = "https://www.keio.co.jp/unkou_information/bargain_ticket/assets/pdf/price_takao.pdf";
const JR_FARE_PDF = "https://www.jreast.co.jp/2026unchin-kaitei/assets/pdf/tokutei.pdf";
const TOZAN_URL = "https://www.takaotozan.co.jp/timeprice/";
const TOZAN_SUMMIT_URL = "https://www.takaotozan.co.jp/diamond/";
const VC_COURSES_URL = "https://takaovc.ces-net.jp/?page_id=257";
const VC_TRAIL1_URL = "https://takaovc.ces-net.jp/?page_id=3073";
const VC_TRAIL6_URL = "https://takaovc.ces-net.jp/?page_id=3090";
const VC_INARI_URL = "https://takaovc.ces-net.jp/?page_id=3093";
const VC_LEAVES_URL = "https://takaovc.ces-net.jp/?page_id=729";
const VC_LEAVES_NOW_URL = "https://takaovc.ces-net.jp/?p=7758";

const ROUTE = "/guides/attractions/mt-takao-day-trip";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const K = ({ href, children }: { href: string; children: ReactNode }) => (
  <KlookLink href={href} target="_blank" rel="sponsored nofollow noopener">{children}</KlookLink>
);
const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Way = { route: string; time: string; fare: string; note: string; source: ReactNode };

const ways: Way[] = [
  {
    route: "Keio Line, Shinjuku → Takaosanguchi (direct)",
    time: "Mt.TAKAO seat train 45–46 min; ordinary trains by timetable",
    fare: "¥430 (IC ¥430)",
    note: "The simplest way: Takaosanguchi is the station at the foot of Trail 1 and the cable car",
    source: ext(KEIO_FARE_URL, "keio.co.jp"),
  },
  {
    route: "Keio Mt.TAKAO reserved-seat train",
    time: "Shinjuku 10:00 → 10:46, 11:00 → 11:45",
    fare: "¥430 plus a seat ticket",
    note: "Saturdays, Sundays and holidays only",
    source: ext(KEIO_MT_URL, "keio.co.jp"),
  },
  {
    route: "Keio Takao discount ticket (from Shinjuku)",
    time: "—",
    fare: "Adult ¥1,450 with the cable car or lift both ways; ¥1,090 one way",
    note: "Keio return plus the cable car or lift; sold at Keio and Inokashira Line ticket machines",
    source: ext(KEIO_TICKET_PDF, "Keio fare table (PDF)"),
  },
  {
    route: "JR Chuo Line, Shinjuku → Takao, then Keio one stop",
    time: "By train type; change at Takao",
    fare: "JR ¥720 (IC ¥715), plus the Keio fare for one stop",
    note: "For a JR pass holder: Takao is the JR station, Takaosanguchi is one Keio stop further",
    source: ext(JR_FARE_PDF, "JR East fare table (PDF)"),
  },
];

type Trail = { trail: string; length: string; up: string; down: string; surface: string; source: ReactNode };

const trails: Trail[] = [
  {
    trail: "Trail 1 (Omotesando) — the easiest",
    length: "3.8 km",
    up: "1 h 40 min",
    down: "1 h 20 min",
    surface: "Paved road from the foot, “for beginners”; steep below the lift — careful in rain; many steps above Yakuo-in",
    source: ext(VC_TRAIL1_URL, "Takao Visitor Center"),
  },
  {
    trail: "Trail 6 (Biwa Falls course)",
    length: "3.3 km",
    up: "1 h 40 min",
    down: "1 h 30 min",
    surface: "Narrow path along a stream, stepping stones, cliffs near them; long steps at the end",
    source: ext(VC_TRAIL6_URL, "Takao Visitor Center"),
  },
  {
    trail: "Inariyama course",
    length: "3.1 km",
    up: "1 h 40 min",
    down: "1 h 20 min",
    surface: "Wide ridge path with exposed roots and many steps; slippery after rain; one viewpoint over central Tokyo",
    source: ext(VC_INARI_URL, "Takao Visitor Center"),
  },
  {
    trail: "Cable car top (Takaosan Station) → summit",
    length: "On Trail 1",
    up: "About 40 min on foot",
    down: "—",
    surface: "The cable car or the lift saves the steep lower half of Trail 1",
    source: ext(TOZAN_SUMMIT_URL, "takaotozan.co.jp"),
  },
];

type Ride = { ride: string; fare: string; time: string; hours: string; source: ReactNode };

const rides: Ride[] = [
  {
    ride: "Cable car, Kiyotaki ⇄ Takaosan",
    fare: "Adult ¥490 one way, ¥980 return; child ¥250 / ¥500",
    time: "About 6 min, every 15 min",
    hours: "From 8:00; last 17:45 weekdays / 18:00 weekends and holidays in Sep–Nov, 17:15 / 17:30 in Dec",
    source: ext(TOZAN_URL, "takaotozan.co.jp"),
  },
  {
    ride: "Two-seat chairlift, Sanroku ⇄ Sanjo",
    fare: "Same as the cable car",
    time: "About 12 min",
    hours: "9:00 – 16:30 May–Nov, to 16:00 Dec–Apr",
    source: ext(TOZAN_URL, "takaotozan.co.jp"),
  },
];

const faqItems = [
  {
    q: "How do I get to Mt Takao from Tokyo?",
    a: `Take the Keio Line from Shinjuku to Takaosanguchi, the station at the foot of the mountain: ¥430, or ¥430 by IC card (Keio). At weekends and on holidays the reserved-seat Mt.TAKAO train leaves Shinjuku at 10:00 and arrives at 10:46. On JR it is the Chuo Line to Takao (¥720, IC ¥715), then one stop on Keio. Checked ${CHECKED}.`,
  },
  {
    q: "Which Mt Takao trail is easiest?",
    a: "Trail 1, the Omotesando: 3.8 km and paved from the foot, which the Takao Visitor Center calls the route for beginners — about 1 hour 40 minutes up and 1 hour 20 minutes down. Take the cable car or the lift halfway and it is about 40 minutes on foot from the cable car's top station to the summit.",
  },
  {
    q: "When is the best time to see autumn leaves on Mt Takao?",
    a: "In a usual year, mid-November to early December, according to the Takao Visitor Center. In its update of 20 November 2026, the leaves at the foot (Kiyotaki), around Yakuo-in, at the summit and at Momijidai were at their best and the cable car line was at 50%. Weekends in that season are the busiest days, so go early or on a weekday.",
  },
  {
    q: "Do I need hiking boots for Mt Takao?",
    a: "Not for Trail 1, which is paved — trainers with grip are enough. For Trail 6 (stepping stones in a stream) or the Inariyama ridge (roots, slippery after rain), wear shoes with a good tread. The Visitor Center notes every trail has steps, and asks hikers to carry a map and a torch: there are no lights on the mountain after sunset.",
  },
  {
    q: "How much is the Mt Takao cable car?",
    a: `Adults ¥490 one way and ¥980 return; children ¥250 and ¥500. The chairlift costs the same. The cable car takes about 6 minutes and runs every 15 minutes from 8:00; in December the last car is 17:15 on weekdays and 17:30 at weekends. You can pay by cash, IC card or contactless credit card (Takao Tozan Railway, checked ${CHECKED}).`,
  },
  {
    q: "Is the Keio Mt Takao discount ticket worth it?",
    a: "If you take the cable car or lift both ways, yes: from Shinjuku it is ¥1,450 for an adult, against ¥860 for the Keio return plus ¥980 for the cable car return bought separately. With the cable car one way it is ¥1,090. It is sold at Keio and Inokashira Line ticket machines, except at Takaosanguchi itself.",
  },
  {
    q: "How long do you need for a Mt Takao day trip?",
    a: "Half a day to a full day. Allow about 45 minutes each way on the Mt.TAKAO seat train (longer on most ordinary trains), 1 hour 40 minutes up Trail 1 on foot — or the cable car plus about 40 minutes — and time at Yakuo-in and the summit. Start the walk down well before the last cable car: 17:15 on weekdays in December.",
  },
  {
    q: "Can you do Mt Takao with kids?",
    a: "Yes. Trail 1 is paved and wide, and the cable car or chairlift takes you halfway; children aged 6 to 11 pay the child fare and under-6s ride free with an adult (one free child per paying passenger). Trail 6, with stepping stones and narrow sections, is the one to skip with small children.",
  },
];

const TITLE = "Mt Takao Day Trip (2026): Trains, Trails & Cable Car Fares";
const DESCRIPTION =
  "Mt Takao Day Trip: Mount Takao from Tokyo by Keio Line for ¥430, Takaosan hiking on Trails 1, 6 and Inariyama, cable car fares and autumn leaves.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/tokyo-7-day-itinerary", title: "Tokyo 7 Day Itinerary (2026): Day Trips, Passes & Bookings" },
  { href: "/guides/attractions/kamakura-day-trip", title: "Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera and the Fares" },
  { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip From Tokyo (2026): Getting There, Costs and Whether to Take a Tour" },
  { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself" },
  { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo 2026: Top Picks and Ticket Prices" },
  { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained" },
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

export default function MtTakaoDayTripPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Mt Takao Day Trip", item: URL },
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
          <span className={styles.breadCurrent}>Mt Takao Day Trip</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Mt Takao Day Trip from Tokyo: <br />Trains, Trails and the Cable Car
          </h1>
          <p className={styles.heroSubtitle}>
            Mount Takao from Tokyo in one day: the Keio train from Shinjuku, which trail to walk, and what the cable
            car costs — from the railway&apos;s and the Visitor Center&apos;s own pages.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Fares and trail times from official sites", "No Klook prices — check per date"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Shinjuku → Takaosanguchi</p>
                <p className={styles.verdictStatValue}>¥430, Keio Line</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Trail 1 to the summit</p>
                <p className={styles.verdictStatValue}>3.8 km, 1 h 40 up</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cable car</p>
                <p className={styles.verdictStatValue}>¥490 one way, 6 min</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Mt Takao day trip</strong> starts at Shinjuku: the <strong>Keio Line</strong> runs direct to
              Takaosanguchi, at the foot of the mountain, for ¥430 (IC ¥430), and the reserved-seat Mt.TAKAO train
              does it in 46 minutes at weekends and on holidays (Shinjuku 10:00 → 10:46). From the station, the{" "}
              <strong>cable car</strong> climbs to Takaosan Station in about 6 minutes for ¥490 one way (¥980 return),
              or the chairlift in about 12 minutes for the same fare. From the cable car&apos;s top station it is about
              40 minutes on foot along <strong>Trail 1</strong> to the summit; walking the whole of Trail 1 from
              the bottom is 3.8 km, about 1 hour 40 minutes up and 1 hour 20 minutes down, paved and the beginners&apos;
              route. The <strong>autumn leaves</strong> are at their best from mid-November to early December in a usual
              year, and on 20 November 2026 the Visitor Center reported the foot, Yakuo-in and the summit at their
              best. Checked {CHECKED} on Keio, Takao Tozan Railway and Takao Visitor Center pages.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              Mt Takao is a half-day to full-day trip from the city. A week with longer day trips — Hakone, Nikko,
              Kamakura — is the <Link href="/guides/attractions/tokyo-7-day-itinerary">Tokyo 7 day itinerary</Link>;
              the single-day guides are the <Link href="/guides/attractions/kamakura-day-trip">Kamakura day trip</Link> and the{" "}
              <Link href="/guides/attractions/nikko-day-trip">Nikko day trip</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={mtTakaoHikingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Mt. Takao hiking tour →
              </KlookLink>
              <KlookLink href={keioMtTakaoTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Keio + cable car ticket →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these on the same trip"
          heading="What Should You Book for a Mt Takao Day Trip?"
          intro="A guided hiking day, a Shinjuku hotel, the Keio and cable car ticket and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={mtTakaoTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Mt Takao from Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By the Keio Line from Shinjuku to Takaosanguchi, ¥430, with no change. JR is the alternative for a pass
            holder: the Chuo Line to Takao, then one stop on Keio. Each row is the operator&apos;s own fare.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Mount Takao from Tokyo: trains and fares</h3>
          <SimpleTable
            head={["Route", "Time", "Adult fare", "Good to know", "Source"]}
            rows={ways.map((r) => [r.route, r.time, r.fare, r.note, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(KEIO_FARE_URL, "Keio fares from Shinjuku")},{" "}
            {ext(KEIO_MT_URL, "Mt.TAKAO train timetable")}, {ext(KEIO_AREA_URL, "Keio Takao area")} (the fastest
            seat train &ldquo;as fast as 43 minutes&rdquo;), {ext(KEIO_TICKET_PDF, "Keio Takao discount ticket (PDF, revised 1 Oct 2025)")},{" "}
            {ext(JR_FARE_PDF, "JR East fares from 14 March 2026 (PDF)")}. Ordinary trains vary by service — check a
            route search for your departure.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Is there a pass for Mt Takao?</h3>
          <p className={styles.bodyText}>
            Keio&apos;s own Takao discount ticket bundles the Keio return with the cable car or chairlift: from Shinjuku,
            ¥1,450 for an adult with both ways on the cable car, against ¥860 for the Keio return plus ¥980 for the
            cable car. Klook sells a version for visitors — the{" "}
            <K href={keioMtTakaoTicket.url}>Keio 1-Day Ticket with the Mt. Takao cable car and chairlift</K>, for one
            date; its listing says it is not sold to Japanese passport holders. The Tokyo Subway Ticket does not cover
            the Keio Line.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={keioMtTakaoTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Keio + Mt. Takao cable car ticket →
            </KlookLink>
            <KlookLink href={tokyoStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hotels in Shinjuku →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Takaosan hiking</span>
          <h2 className={styles.sectionTitle}>Which Mt Takao Trail Is Easiest?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Trail 1. It is the paved main route past Yakuo-in temple, and the Takao Visitor Center calls it the one for
            beginners. Trail 6 follows a stream and Inariyama follows a ridge; the standard times up are the same, but
            the ground is rougher. The Visitor Center gives these as guides only.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem" }}>Takaosan hiking: the three trails to the summit</h3>
          <SimpleTable
            head={["Trail", "Length", "Up", "Down", "Ground", "Source"]}
            rows={trails.map((r) => [r.trail, r.length, r.up, r.down, r.surface, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(VC_COURSES_URL, "Takao Visitor Center course map")},{" "}
            {ext(VC_TRAIL1_URL, "Trail 1")}, {ext(VC_TRAIL6_URL, "Trail 6")}, {ext(VC_INARI_URL, "Inariyama")},{" "}
            {ext(TOZAN_SUMMIT_URL, "Takao Tozan Railway")} (cable car to summit). Trail closures are posted by the Visitor
            Center.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Which route up and which route down?</h3>
          <p className={styles.bodyText}>
            A common plan is one way on foot and one way on the cable car or lift. Walk up Inariyama or Trail 6 from the
            station and come down on Trail 1 and the cable car; or ride up, walk the last 40 minutes on Trail 1 to the
            summit, and walk down the whole trail (1 hour 20 minutes). Trail 1 has the most maples, the Visitor
            Center says, so it is the route for the leaves. The mountain has about 2.5 million climbers a year, so
            weekend mornings in November are the crowded ones.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cable car and lift</span>
          <h2 className={styles.sectionTitle}>How Much Is the Mt Takao Cable Car, and When Does It Run?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ¥490 one way and ¥980 return for an adult, the same on the chairlift. The cable car runs every 15 minutes
            from 8:00; the lift opens at 9:00 and closes earlier, at 16:30 until November and 16:00 from December.
          </p>
          <SimpleTable
            head={["Ride", "Fare", "Ride time", "Hours", "Source"]}
            rows={rides.map((r) => [r.ride, r.fare, r.time, r.hours, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked {CHECKED}: {ext(TOZAN_URL, "Takao Tozan Railway timetable and fares")}. The return discount
            ended on 30 September 2025. Pay by cash, IC card (Suica, PASMO) or contactless credit card; hours change at
            New Year and for maintenance. Children 6–11 pay the child fare; one under-6 rides free with each adult or
            child.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Autumn leaves</span>
          <h2 className={styles.sectionTitle}>When Is the Best Time to See Autumn Leaves on Mt Takao?</h2>
          <p className={styles.bodyText}>
            Mid-November to early December in a usual year, according to the Takao Visitor Center
            ({ext(VC_LEAVES_URL, "takaovc.ces-net.jp")}). Its update of 20 November 2026 put the foot (Kiyotaki), Yakuo-in,
            the summit and Momijidai at their best, with the cable car line at about half colour
            ({ext(VC_LEAVES_NOW_URL, "Visitor Center update")}). The best spots it lists are Kiyotaki, the cable car line,
            the area around Takaosan Station, Yakuo-in, the summit, Momijidai, Ichichodaira and Kobotoke-Shiroyama.
          </p>
          <h3 className={styles.sectionTitle} style={h3}>Should you take a guided tour?</h3>
          <p className={styles.bodyText}>
            Only if you would rather not plan it: the train and the trail are simple. A guided{" "}
            <K href={mtTakaoHikingTour.url}>Mt. Takao one-day hiking tour</K> sells by date in the foliage season, so
            check its calendar before planning around it. For a full-day tour further from the city, the{" "}
            <K href={nikkoWorldHeritageDayTour.url}>Nikko World Heritage day tour</K> leaves from Shinjuku.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={mtTakaoHikingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Mt. Takao hiking tour →
            </KlookLink>
            <KlookLink href={nikkoWorldHeritageDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Nikko day tour from Tokyo →
            </KlookLink>
          </div>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What to wear</span>
          <h2 className={styles.sectionTitle}>Do I Need Hiking Boots for Mt Takao?</h2>
          <p className={styles.bodyText}>
            Not for Trail 1, which is paved; trainers with grip will do. For Trail 6&apos;s stepping stones or the
            Inariyama ridge, with roots and mud after rain, wear shoes with a proper tread. The Visitor Center says
            every trail has steps, and asks you to carry a map and a torch, because there are no lights on the
            mountain after dark — in December the last cable car down is 17:15 on weekdays. Bring a layer: the summit
            is colder than Shinjuku.
          </p>
        </section>

        <BookingEsimCard lead="The trail map, the last cable car and the train home — get mobile data before you land." />

        <KlookTourPicks
          heading="Mt Takao and Other Day Trips from Tokyo"
          intro="A guided Mt Takao day, the Keio and cable car ticket, and a full-day tour to Nikko. Klook prices and running dates change by date, so open a listing for your day."
          tours={[mtTakaoHikingTour, keioMtTakaoTicket, nikkoWorldHeritageDayTour]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Further along the Chuo Line, the <Link href="/guides/attractions/sagamiko-illumillion-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Sagamiko Illumillion</Link> lights up from 16:00 (entry ¥2,000 for adults on ordinary days).
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
            <h2 className={styles.ctaBannerTitle}>One day on Mt Takao, from Shinjuku</h2>
            <p className={styles.ctaBannerDesc}>
              Book the guided day if you want one, or the Keio and cable car ticket for your date, and a hotel by the
              Keio Line.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={mtTakaoHikingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Mt. Takao hiking tour →
              </KlookLink>
              <KlookLink href={tokyoStayAreas[0].url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Shinjuku hotels →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
