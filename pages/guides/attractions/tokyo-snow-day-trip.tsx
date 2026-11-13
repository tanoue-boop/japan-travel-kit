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
  fujitenSnowFunOishiParkTour,
  galaYuzawaLiftTicket,
  tokyoSnowDayTripPrep,
  yetiBeginnerLessonSnowFunTour,
  yetiDestinationUrl,
  yetiOnsenFullDayTour,
  yetiSkiDayTrip,
  yetiSnowDayTripFromTokyo,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Tokyo snow day trip. Added 11 Nov 2026 (task-jtk-20261111-02), a winter entry page
 * for the reader who wants snow, not a ski day: sledding, a first try on skis, small
 * children and the Mt. Fuji view. gala-yuzawa-ski-day-trip-from-tokyo is the page for
 * skiing proper; this one sends skiers there.
 *
 * Official reads on 11 Nov 2026:
 *   yeti-resort.com (top)          operating on 11 Nov 2026, 9:00–18:00 that day, no
 *                                  night session that day; 2026-27 season pass on sale.
 *   yeti-resort.com/guide/         4 runs (A–D) plus a sled-only slope (12月上旬open予定)
 *                                  and a snow play area (12月下旬open予定) with a kids
 *                                  room next to it; 1,300–1,450 m; plastic sleds only.
 *   yeti-resort.com/faq/           sleds banned on the general slopes; night skiing to
 *                                  22:00 basically to the end of February; wear for
 *                                  adults S–5L and children 80–160; gloves, hats and
 *                                  goggles not rented (sold at the shop); children pay
 *                                  from age 3; the free kids programme has ended.
 *   yeti-resort.com/access/linerbus.html  Shinjuku Station 2 h 30 min, from 12/5; the
 *                                  fare includes a one-day lift ticket; local buses
 *                                  from Gotemba, Mishima and Susono daily.
 *   fujiten.net (top)              2026-2027シーズンは12月中旬のオープンを予定.
 *   fujiten.net/charges/           skiing mid-Dec 2026 to early Apr 2027; lifts
 *                                  9:00–16:30; night 16:00–21:00 on weekends and
 *                                  holidays, 26 Dec 2026 to 7 Mar 2027.
 *   fujiten.net/faq/, /access/     Kawaguchiko Station then taxi about 20 min; a paid
 *                                  seasonal shuttle from Kawaguchiko Station.
 *   fujiten.net/rental/            wear set ¥5,000 adult / ¥3,000 junior a day;
 *                                  sizes 80 cm–4L; sleds ¥800 at Chibikko Ai Land;
 *                                  gloves, hats and sunglasses not rented.
 *   gala.co.jp                     Yukiasobi Park (sled course and free snow area) at
 *                                  the bottom of the Central Area. Season dates and the
 *                                  71-minute train are from the GALA page, read 1 Nov.
 * Yeti's 23 Oct 2026 opening is from press coverage; the page says only that the
 * resort was operating when checked. No Klook price is printed.
 */

const ROUTE = "/guides/attractions/tokyo-snow-day-trip";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const OWN = checkedLabel("2026-11-11");

const placeRows = [
  {
    place: "Fujiyama Snow Resort Yeti",
    where: "Mt. Fuji 2nd Station, Shizuoka (1,300–1,450 m)",
    access: "Yeti's liner bus from Shinjuku, 2 h 30 min (from 5 Dec; fare includes a 1-day lift ticket), or a tour",
    snowPlay: "Sled-only slope (planned early Dec) and snow play area (planned late Dec), kids room next to it",
    season: "Operating for 2026–27 when checked; 9:00–18:00 on 11 Nov",
  },
  {
    place: "Fujiten Snow Resort",
    where: "North side of Mt. Fuji, Narusawa, Yamanashi",
    access: "Train to Kawaguchiko, then taxi about 20 min or the paid seasonal shuttle; or a tour",
    snowPlay: "Chibikko Ai Land kids' snow area, with sleds for hire",
    season: "Opening planned mid-Dec 2026, to early Apr 2027; lifts 9:00–16:30",
  },
  {
    place: "GALA Yuzawa",
    where: "Echigo-Yuzawa, Niigata",
    access: "Shinkansen from Tokyo Station, 71 min on the fastest train; the station is inside the resort",
    snowPlay: "Yukiasobi Park: a sled course and a free snow play area",
    season: "Slopes 19 Dec 2026 to 5 May 2027 (gondola-only days 12–18 Dec)",
  },
];

const tourRows = [
  { kind: "Snow play + Mt. Fuji sightseeing", tour: "Fujiten & Oishi Park", from: "Tokyo", length: "11 hours", note: "Oishi Park's view of Mt. Fuji over Lake Kawaguchiko, then snow play at Fujiten", url: fujitenSnowFunOishiParkTour.url },
  { kind: "Snow play or ski (choose a package)", tour: "Yeti day trip", from: "Tokyo Station, Shinjuku", length: "11 hours", note: "Ski, snowboard, sledding or shuttle-only packages; not cancelled for rain", url: yetiSnowDayTripFromTokyo.url },
  { kind: "Ski experience for beginners", tour: "Yeti beginner lesson & snow fun", from: "Tokyo (check the listing)", length: "Full day", note: "Transport, rental with jacket and pants, and an instructor; no lift ticket in the beginner package; no helmet or goggles", url: yetiBeginnerLessonSnowFunTour.url },
  { kind: "Snow + hot spring", tour: "Yeti & onsen", from: "Tokyo", length: "07:30–18:30", note: "Snow play or skiing, then Konohana no Yu; ages 3 to 69; free cancellation up to 24 h before", url: yetiOnsenFullDayTour.url },
  { kind: "Ski day", tour: "Yeti ski day trip", from: "Tokyo", length: "Full day", note: "Lift ticket and ski gear; group ski lessons only, no snowboard lessons", url: yetiSkiDayTrip.url },
];

const gearRows = [
  { item: "Snow wear (jacket and pants)", yeti: "For hire: adult S–5L, children 80–160; sizes can run out on busy days", fujiten: "For hire: set ¥5,000 adult, ¥3,000 junior a day; 80 cm to 4L", tip: "Included in the Yeti beginner tour's rental" },
  { item: "Gloves and hat", yeti: "Not for hire (sold at the shop)", fujiten: "Not for hire", tip: "Bring waterproof gloves for every child; wet wool gloves end a sledding day" },
  { item: "Goggles or sunglasses", yeti: "Not for hire (sold at the shop)", fujiten: "Sunglasses not for hire", tip: "Snow glare is strong on a clear day" },
  { item: "Sled", yeti: "Plastic sleds only, on the sled-only slope; banned on the ski slopes", fujiten: "¥800 per sled at Chibikko Ai Land; metal and wooden sleds not allowed", tip: "The Yeti day trip sells a sledding package" },
  { item: "Footwear", yeti: "Ski and board sets include boots", fujiten: "Ski and board sets include boots", tip: "For snow play only, wear waterproof boots from home" },
  { item: "ID", yeti: "—", fujiten: "Rental needs ID (licence or a phone number)", tip: "Carry your passport" },
];

const faqItems = [
  {
    q: "Where can you see snow on a day trip from Tokyo?",
    a: `On the slopes of Mt. Fuji. Fujiyama Snow Resort Yeti (Shizuoka) and Fujiten Snow Resort (Yamanashi) are the two snow areas that day tours from Tokyo use, and Yeti's own liner bus from Shinjuku takes 2 hours 30 minutes. For skiing proper, GALA Yuzawa is 71 minutes from Tokyo Station by shinkansen on the fastest train. Checked ${OWN}.`,
  },
  {
    q: "Can you play in the snow without skiing?",
    a: "Yes. Yeti has a sled-only slope (planned to open in early December) and a snow play area (planned for late December), and Fujiten has the Chibikko Ai Land kids' snow area with sleds for hire at ¥800. Sleds are not allowed on Yeti's ski slopes. On Klook, the Yeti day trip sells a sledding package and the Fujiten & Oishi Park tour is a snow-play day.",
  },
  {
    q: "Yeti or Fujiten: which is better for first-timers?",
    a: "Yeti if you want the earliest season and the simplest transport: it opens in autumn and its liner bus leaves from Shinjuku. Fujiten if you want the Mt. Fuji view and a sightseeing stop in the same day: the Klook tour pairs it with Oishi Park on Lake Kawaguchiko. Fujiten plans to open in mid-December 2026.",
  },
  {
    q: "When does the snow season start near Tokyo?",
    a: "Yeti opens first: it was already operating when checked on 11 November 2026, but its sled slope is planned for early December and its snow play area for late December. Fujiten plans to open in mid-December 2026, and GALA Yuzawa opens its slopes on 19 December 2026. For sledding and snow play, plan from late December.",
  },
  {
    q: "Is a snow day trip from Tokyo good for kids?",
    a: "Yes, with planning. Yeti has a kids room next to its snow play area and charges children from age 3; Fujiten has the Chibikko Ai Land snow area. The Yeti & onsen tour on Klook takes ages 3 to 69. Neither resort rents gloves or hats, so bring them from home.",
  },
  {
    q: "What should you wear for a snow day trip?",
    a: "Waterproof jacket and trousers (both resorts rent them), waterproof gloves and a hat (neither resort rents these), warm socks and waterproof boots. Sunglasses or goggles help on a clear day. Yeti sells gloves, hats and goggles at its shop.",
  },
];

const TITLE = "Tokyo Snow Day Trip (2026–27): Yeti, Fujiten or Gala";
const DESCRIPTION =
  "Tokyo snow day trip guide: a snow day trip from Tokyo to Yeti or Fujiten for sledding without skiing, open dates, what to wear and a Fujiten snow day trip.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

export default function TokyoSnowDayTripPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Tokyo Snow Day Trip", item: URL },
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
          <span className={styles.breadCurrent}>Tokyo Snow Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Snow Day Trip (2026–27):<br />Sledding and Snow Play at Yeti or Fujiten
          </h1>
          <p className={styles.heroSubtitle}>
            A snow day trip from Tokyo for people who want snow more than a ski day: sledding, a first try on
            skis, small children and a view of Mt. Fuji.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "2026–27 opening dates", "No-ski options", "Kids and clothing"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Yeti or Fujiten, on Mt. Fuji</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Shinjuku</p>
                <p className={styles.verdictStatValue}>2 h 30 min by Yeti&apos;s liner bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Without skiing</p>
                <p className={styles.verdictStatValue}>Sled slopes and snow play areas</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Snow play from</p>
                <p className={styles.verdictStatValue}>December (planned dates below)</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              For a <strong>Tokyo snow day trip</strong>, the usual choice is a bus tour to the snow on Mt. Fuji:{" "}
              <strong>Fujiyama Snow Resort Yeti</strong> or <strong>Fujiten Snow Resort</strong>. Yeti&apos;s own
              liner bus from Shinjuku takes <strong>2 hours 30 minutes</strong>, and a tour from Tokyo is about{" "}
              <strong>11 hours door to door</strong>. You do not need to ski: both have sledding and snow play areas,
              and a tour with wear and rental included means you arrive empty-handed. To ski properly, take the
              shinkansen to <strong>GALA Yuzawa</strong> instead, 71 minutes from Tokyo Station on the fastest train.
              Checked on the resorts&apos; own sites, {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={fujitenSnowFunOishiParkTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Fujiten snow day with a Fuji view →
              </KlookLink>
              <KlookLink href={yetiSnowDayTripFromTokyo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Yeti day trip from Tokyo →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book with the tour"
          heading="Book These on the Same Day as Your Snow Day Trip"
          intro="A hotel by the Shinjuku departure, the airport bus and data. Klook prices change by date, so open a listing for the figure on your dates."
          items={tokyoSnowDayTripPrep}
        />

        <EsimCtaTop />

        {/* Places */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to go</span>
          <h2 className={styles.sectionTitle}>Where Can You See Snow on a Day Trip from Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>On Mt. Fuji, at Yeti or Fujiten, or in Niigata at GALA Yuzawa.</strong> Yeti and Fujiten are
            the snow areas the day tours from Tokyo use, and both have space for sledding. GALA is the ski
            resort with its own shinkansen station.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Place", "Where", "Getting there from Tokyo", "Snow play area", "2026–27 season"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {placeRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.place}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.access}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.snowPlay}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.season}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Yeti from yeti-resort.com (top page, area guide, FAQ and liner bus pages) and Fujiten from fujiten.net
            (top page, hours and fees, FAQ and access), all checked {OWN}. GALA Yuzawa&apos;s season dates and train
            time from gala.co.jp, checked 1 November 2026; its snow play park from gala.co.jp, checked {OWN}.
            Snow and weather can move every date, so check the resort&apos;s page in the week you go.
          </p>
        </section>

        {/* No ski */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>No skiing needed</span>
          <h2 className={styles.sectionTitle}>Can You Play in the Snow Without Skiing?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, at all three.</strong> Yeti has a sled-only slope and a separate snow play area with a
            kids room next to it; only ordinary plastic sleds are allowed there, and sleds are banned on the ski
            slopes. Fujiten&apos;s kids&apos; snow area, Chibikko Ai Land, hires sleds for ¥800 each. GALA&apos;s
            Yukiasobi Park, at the bottom of the Central Area, has a sled course and a free snow play area.
          </p>
          <p className={styles.bodyText}>
            On a tour, pick the package that matches: the Yeti day trip sells a sledding package next to its ski and
            snowboard ones, and the Fujiten tour is a snow-play day with a sightseeing stop.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yetiSnowDayTripFromTokyo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Yeti sledding package →
            </KlookLink>
            <KlookLink href={fujitenSnowFunOishiParkTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Fujiten snow fun tour →
            </KlookLink>
          </div>
        </section>

        {/* Yeti vs Fujiten */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Choosing</span>
          <h2 className={styles.sectionTitle}>Yeti or Fujiten: Which One Is Better for First-Timers?</h2>
          <p className={styles.bodyText}>
            <strong>Yeti for the simplest day, Fujiten for the Mt. Fuji view and a sightseeing stop.</strong> Yeti
            opens earliest, sits at 1,300–1,450 m on Mt. Fuji itself, and has its own liner bus from Shinjuku plus
            tours from Tokyo Station and Shinjuku. Its four runs (A to D) plus the sled slope make a small area to find your way around on a first day. Fujiten faces
            Mt. Fuji from the north, has an observation lift, and the Klook tour pairs it with Oishi Park on Lake
            Kawaguchiko, the classic view of the mountain over the water.
          </p>
          <p className={styles.bodyText}>
            A clear view of the summit is never certain: cloud can hide it on any day, at either resort. If skiing
            is the main event rather than the snow, the{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              GALA Yuzawa ski day trip
            </Link>{" "}
            has sixteen courses and the lift and rental prices.
          </p>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tours</span>
          <h2 className={styles.sectionTitle}>Fujiten Snow Day Trip or Yeti Tour: Which Snow Day Trip from Tokyo Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Choose by what you want from the day:</strong> snow play only, a first ski lesson, a hot spring
            afterwards, or Mt. Fuji sightseeing on the way.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Type", "Tour", "Departs", "Length", "What the listing says", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.kind}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.from}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.85rem" }}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          Check dates →
                        </KlookLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From each Klook listing, checked {OWN}. No price is printed, because Klook prices change by date and
            package. Meeting points, what the package includes and the cancellation window are set per listing.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yetiDestinationUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              All Yeti tours on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Season */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>When to go</span>
          <h2 className={styles.sectionTitle}>When Does the Snow Season Start near Tokyo?</h2>
          <p className={styles.bodyText}>
            <strong>Yeti opens in autumn, but snow play starts in December.</strong> Yeti was already operating when
            checked on {OWN} (9:00–18:00 that day), on early-season runs. Its sled-only slope is planned for early
            December and its snow play area for late December. Fujiten plans to open in mid-December 2026 and run
            to early April 2027. GALA Yuzawa opens its slopes on 19 December 2026.
          </p>
          <p className={styles.bodyText}>
            <strong>Best time:</strong> late December to February for a sledding day, when all the snow areas are
            planned to be open. Yeti&apos;s liner bus from Shinjuku starts on 5 December. If your trip is fixed to a
            weekend or the New Year holiday, book the tour once the date is set rather than waiting for the weather
            forecast, and check the listing&apos;s cancellation window when you do.
          </p>
        </section>

        {/* Getting there yourself */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On your own</span>
          <h2 className={styles.sectionTitle}>How Do You Get There Without a Tour?</h2>
          <p className={styles.bodyText}>
            <strong>Yeti:</strong> the resort&apos;s liner bus from Shinjuku Station (2 hours 30 minutes, from 5
            December, with a one-day lift ticket in the fare), or a local bus from Gotemba, Mishima or Susono
            stations. <strong>Fujiten:</strong> the train to Kawaguchiko Station, then a taxi of about 20 minutes or
            the paid shuttle that runs in season. The tours are simpler with children, because the gear is sorted at
            the resort and the coach waits for you.
          </p>
        </section>

        {/* Clothing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What to wear</span>
          <h2 className={styles.sectionTitle}>What Should You Wear for a Snow Day Trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Rent the snow wear, bring your own gloves and hat.</strong> Both resorts hire jackets and
            trousers in adult and children&apos;s sizes, and neither hires gloves or hats.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Yeti", "Fujiten", "Tip"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gearRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.yeti}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.fujiten}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From yeti-resort.com (FAQ and area guide) and fujiten.net (rental page), checked {OWN}. Fujiten&apos;s
            one-day rental prices are its own; Yeti&apos;s are on its rental page. Rental stock is limited on busy
            days at both.
          </p>
        </section>

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Children</span>
          <h2 className={styles.sectionTitle}>Is a Snow Day Trip Good for Kids?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, and the snow play areas are made for them.</strong> Yeti charges children from age 3, has a
            kids room next to the snow play area and a nappy-changing table in the rental building; its free kids
            programme has ended, and a paid lesson for young children is planned. Fujiten&apos;s Chibikko Ai Land is
            its children&apos;s snow area. On Klook, the Yeti &amp; onsen tour takes ages 3 to 69. An 11-hour day is
            long for small children, so pack snacks and a change of clothes. For more family days, see the{" "}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo itinerary with kids
            </Link>
            .
          </p>
        </section>

        {/* Weather */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather and cancellations</span>
          <h2 className={styles.sectionTitle}>What Happens If It Rains or Snows Heavily?</h2>
          <p className={styles.bodyText}>
            <strong>The tours usually still run.</strong> The Yeti day trip listing says it is not cancelled for rain,
            and that pick-up and drop-off times can change with traffic and weather. The Yeti &amp; onsen tour lists
            free cancellation up to 24 hours before. Each listing sets its own cancellation window, so read it
            before you pay. If you plan to ski or snowboard rather than just play in the snow, check that your
            policy names it first: our guide to{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">travel insurance for skiing and snowboarding in Japan</Link>{" "}
            covers on-piste cover, helmets and rescue.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yetiOnsenFullDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Yeti &amp; onsen tour →
            </KlookLink>
            <KlookLink href={yetiBeginnerLessonSnowFunTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Beginner lesson &amp; snow fun →
            </KlookLink>
          </div>
        </section>

        {/* Winter trip */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Plan the winter</span>
          <h2 className={styles.sectionTitle}>How Does a Snow Day Fit a Winter Trip?</h2>
          <p className={styles.bodyText}>
            It is one day from a Tokyo base. Our{" "}
            <Link href="/guides/attractions/japan-winter-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan winter itinerary
            </Link>{" "}
            places the snow days across a longer trip, and the{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Mt. Fuji day tour guide
            </Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kawaguchiko day trip guide
            </Link>{" "}
            cover the sightseeing day around the lakes if snow is not the point.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={galaYuzawaLiftTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              GALA Yuzawa lift ticket →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="Tour pick-up messages, resort hours and road closures all reach your phone. Get mobile data before you land." />

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
          heading="Snow Day Trips from Tokyo on Klook"
          intro="Snow play, a first lesson, a hot spring or a Mt. Fuji view. Durations, meeting points and inclusions are on each listing."
          tours={[fujitenSnowFunOishiParkTour, yetiSnowDayTripFromTokyo, yetiBeginnerLessonSnowFunTour, yetiOnsenFullDayTour, yetiSkiDayTrip]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "Gala Yuzawa Ski Day Trip from Tokyo" },
              { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
              { href: "/guides/attractions/mt-fuji-day-tour-from-tokyo", title: "Mt. Fuji Day Tour from Tokyo" },
              { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
              { href: "/guides/attractions", title: "More Things to Do in Japan →" },
            ].map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M4.9 6l14.2 12M4.9 18L19.1 6" />
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
            <h2 className={styles.ctaBannerTitle}>Snow on Mt. Fuji, back in Tokyo for dinner</h2>
            <p className={styles.ctaBannerDesc}>
              Snow play with a view at Fujiten, or the Yeti day with a sledding package.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={fujitenSnowFunOishiParkTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Fujiten Snow Day →
              </KlookLink>
              <KlookLink href={yetiSnowDayTripFromTokyo.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Yeti Day Trip →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
