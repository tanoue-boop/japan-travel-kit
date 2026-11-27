import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kisshokichiKobeBeefCourse,
  kobeBeefHarbourKitanoDayTour,
  kobeBeefRedOneCourse,
  kobeBeefSakuraTeppanyaki,
  kobeBeefSameDayCards,
  kobeBeefTripPrep,
  kobegyuMiyabiCourse,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kobe beef dinner (and lunch) in Kobe: what it costs and how to book. Added 27 Nov 2026
 * (task-jtk-20261127-02, re-run of 20261125-02 / 20261124-02).
 *
 * Next to its neighbours:
 *  - kobe-day-trip-from-osaka is the day (routes, Kitano, the harbour, Rokko);
 *  - osaka-food-tour is Osaka's own food;
 *  - this page is the meal only: the definition, restaurant prices, booking and how to spot the real thing.
 *
 * Official reads on 27 Nov 2026:
 *   kobe-niku.jp (Kobe Beef Marketing & Distribution Promotion Association) — answers automated reads
 *     with 403, so read through its search-index pages: criteria.html (BMS 6+, yield A/B, carcass
 *     499.9 kg or less), definition.html bylaws (Tajima cattle bred and fattened in Hyogo, heifer or
 *     steer, meat quality 4+, processed in Hyogo), certification/ and faq/ (bronze statue and
 *     registration certificate at designated shops, Nojigiku chrysanthemum stamp, certificate of
 *     authenticity per carcass, 10-digit individual ID number)
 *   mouriya.co.jp/en/head/menu and /en/head   Kobe beef steak ¥6,940–¥35,550 tax incl.; 11:00–22:00;
 *     JR Sannomiya 5 min; TableCheck or phone
 *   tablecheck.com/en/shops/kobe-kobeplaisir/reserve, kobeplaisir-honten.jp/access   Kobe Plaisir:
 *     table lunch ¥7,370–¥11,990, counter dinner course ¥17,710–¥24,310 (+10% dinner service);
 *     card required; private rooms by the day before; no-show / same-day cancel 100%; 5 min walk
 *   bifteck.co.jp/en/menu/sannomiya/(lunch.html), /en/reserve/, /en/restaurant/sannomiya-main/
 *     Bifteck Kawamura: lunch ¥18,700 (sirloin 100 g), dinner course from ¥19,800; "tend to be
 *     crowded, so please make your reservation in advance"; JR Sannomiya west exit 2 min
 *   koubegyuu.com/restaurants/yazawa-honten/ and /redone/   YAZAWA: Kobe beef steak over rice lunch
 *     ¥2,508, courses ¥4,900–¥15,000 booked by the day before (+5% dinner service), Sannomiya 5 min;
 *     RED ONE: lunch course ¥3,900, dinner ¥4,100–¥9,900 (+5% dinner service), reservation only,
 *     Motomachi 3 min
 * Not printed: a "book N weeks ahead" figure (no official source gives one) and any Klook price.
 * No Klook ad id: spare was empty on 27 Nov, so links use ?aid=119070.
 */

const ROUTE = "/guides/attractions/kobe-beef-dinner";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const TODAY = checkedLabel("2026-11-27");

const NIKU_CRITERIA_URL = "https://www.kobe-niku.jp/en/contents/about/criteria.html";
const NIKU_DEF_URL = "https://www.kobe-niku.jp/en/contents/about/definition.html";
const NIKU_CERT_URL = "https://www.kobe-niku.jp/en/contents/certification/index.html";
const NIKU_FAQ_URL = "https://www.kobe-niku.jp/en/contents/faq/index.html";
const MOURIYA_URL = "https://www.mouriya.co.jp/en/head/menu";
const MOURIYA_GION_URL = "https://www.mouriya.co.jp/en/gion/menu";
const PLAISIR_URL = "https://www.tablecheck.com/en/shops/kobe-kobeplaisir/reserve";
const BIFTECK_URL = "https://www.bifteck.co.jp/en/menu/sannomiya/";
const BIFTECK_RESERVE_URL = "https://www.bifteck.co.jp/en/reserve/";
const YAZAWA_URL = "https://www.koubegyuu.com/restaurants/yazawa-honten/";
const REDONE_URL = "https://www.koubegyuu.com/restaurants/redone/";

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Restaurant = { name: ReactNode; type: string; lunch: string; dinner: string; book: string; station: string };

const restaurants: Restaurant[] = [
  {
    name: <strong>Cheapest real Kobe beef: lunch</strong>,
    type: "Any type",
    lunch: "From ¥2,508 (rice bowl) or ¥3,900 (course)",
    dinner: "Courses from ¥4,100; ¥15,000–¥30,000 for teppanyaki or a premium steakhouse",
    book: "Book online or by phone by the day before",
    station: "Sannomiya or Motomachi",
  },
  {
    name: ext(PLAISIR_URL, "Kobe Plaisir"),
    type: "Teppanyaki (JA Zen-Noh Hyogo)",
    lunch: "¥7,370–¥11,990 (table plate); counter course from ¥9,570",
    dinner: "Counter course ¥17,710–¥24,310, plus 10% service",
    book: "TableCheck (card needed) or phone; no-show or same-day cancellation charged 100%",
    station: "5 min from JR Sannomiya",
  },
  {
    name: ext(BIFTECK_URL, "Bifteck Kawamura, Sannomiya"),
    type: "Steakhouse, cooked in front of you",
    lunch: "¥18,700 (sirloin 100 g)",
    dinner: "Course ¥19,800 (100 g) to ¥30,800 (180 g)",
    book: "Online form or phone; the restaurant asks for advance booking at lunch and dinner",
    station: "2 min from JR Sannomiya west exit",
  },
  {
    name: ext(MOURIYA_URL, "MOURIYA Honten"),
    type: "Steakhouse (Kobe beef steak sets)",
    lunch: "Kobe beef steak sets from ¥6,940 (round 120 g)",
    dinner: "One menu all day, 11:00–22:00; A5 sirloin and fillet sets ¥20,700–¥35,550",
    book: "TableCheck or phone",
    station: "5 min from JR Sannomiya",
  },
  {
    name: ext(REDONE_URL, "KOBE BEEF RED ONE"),
    type: "Casual steakhouse",
    lunch: "Lunch course ¥3,900",
    dinner: "Courses ¥4,100–¥9,900, plus 5% service",
    book: "Reservation only: TableCheck or phone",
    station: "3 min from Motomachi",
  },
  {
    name: ext(YAZAWA_URL, "Kobe Beef Yakiniku YAZAWA"),
    type: "Yakiniku (grill-it-yourself)",
    lunch: "Kobe beef steak over rice ¥2,508 (limited number)",
    dinner: "Courses ¥4,900–¥15,000, plus 5% service",
    book: "Courses by the day before, online or by phone; no same-day course orders",
    station: "5 min from Sannomiya",
  },
];

type CheckRow = { sign: string; where: string; what: string };

const checkRows: CheckRow[] = [
  { sign: "Bronze statue of a Tajima bull", where: "At the shop front", what: "Shows the shop is registered with the association to buy and sell Kobe beef" },
  { sign: "Registration certificate", where: "Displayed with the statue", what: "The shop's own certificate from the Kobe Beef Marketing & Distribution Promotion Association" },
  { sign: "10-digit individual ID number", where: "On display in the restaurant or butcher", what: "Look it up in the Tajima Beef Certification System to see the animal's lineage, farm and whether it was certified as Kobe beef" },
  { sign: "Nojigiku (chrysanthemum) stamp and certificate", where: "On the carcass; a certificate of authenticity is issued per animal", what: "Ask to see the certificate or a copy" },
];

const faqItems = [
  {
    q: "How much is Kobe beef in Kobe?",
    a: "From about ¥2,500 to ¥4,000 at lunch: YAZAWA's Kobe beef steak over rice is ¥2,508 and RED ONE's lunch course is ¥3,900. Dinner courses start at ¥4,100 at RED ONE and run ¥17,710–¥24,310 at Kobe Plaisir's teppanyaki counter and ¥19,800–¥30,800 at Bifteck Kawamura. Several add a 5–10% service charge at dinner. Prices from each restaurant's own site, checked 27 November 2026.",
  },
  {
    q: "Do I need to book Kobe beef in advance?",
    a: "Yes, for dinner and for courses. RED ONE takes reservations only, YAZAWA sells its courses only when booked by the day before, Kobe Plaisir's private rooms must be booked by the day before, and Bifteck Kawamura asks for advance booking because lunch and dinner are busy. Most take bookings on TableCheck in English; cancelling on the day can cost the full price.",
  },
  {
    q: "How can I tell real Kobe beef?",
    a: "Look for the bronze statue of a Tajima bull and the registration certificate at the shop front, and ask for the 10-digit individual ID number, which you can check in the Tajima Beef Certification System. Real Kobe beef comes from Tajima cattle bred and fattened in Hyogo, graded yield A or B with meat quality 4 or above and a marbling score (BMS) of 6 or above.",
  },
  {
    q: "Can I eat Kobe beef in Osaka or Tokyo?",
    a: "Yes, at shops registered with the Kobe Beef Marketing & Distribution Promotion Association, which display the bronze statue and certificate wherever they are. MOURIYA, for one, has a branch in Gion, Kyoto. Kobe has the most choice and the lowest lunch prices, and Sannomiya is about 30 minutes from Osaka by train.",
  },
  {
    q: "Is Kobe beef the same as wagyu?",
    a: "Kobe beef is one brand of wagyu. Only beef from Tajima cattle raised in Hyogo that passes the association's grading (yield A or B, quality 4 or above, BMS 6 or above, carcass 499.9 kg or less) may be called Kobe beef. Wagyu from elsewhere, or Tajima beef that misses the grade, is not Kobe beef.",
  },
];

const TITLE = "Kobe Beef Dinner in Kobe (2026): Prices & How to Book";
const DESCRIPTION =
  "Kobe beef in Kobe: lunch from ¥2,508, dinner courses ¥4,100–¥30,800 at five restaurants, how to book by the day before, and how to spot real Kobe beef.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka: Routes, the Beef and What Fits in a Day" },
  { href: "/guides/attractions/osaka-food-tour", title: "Osaka Food Tour" },
  { href: "/guides/attractions/kansai-5-day-itinerary", title: "Kansai 5 Day Itinerary" },
  { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
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

export default function KobeBeefDinnerPage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Kobe Beef Dinner", item: URL },
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
          <span className={styles.breadCurrent}>Kobe Beef Dinner</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kobe Beef Dinner in Kobe (2026): <br />Prices, Booking and the Real Thing
          </h1>
          <p className={styles.heroSubtitle}>
            Five restaurants&apos; own menus side by side — teppanyaki, steakhouse and yakiniku — with what lunch and
            dinner cost and how far ahead each one needs a booking.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Prices from each restaurant's own site", "How to check the 10-digit ID"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Lunch</p>
                <p className={styles.verdictStatValue}>From ¥2,508</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Dinner course</p>
                <p className={styles.verdictStatValue}>¥4,100–¥30,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Book</p>
                <p className={styles.verdictStatValue}>By the day before</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Kobe beef</strong> is beef from Tajima cattle bred and fattened in Hyogo that grades yield A or B,
              meat quality 4 or above and <strong>marbling (BMS) 6 or above</strong>, certified by the Kobe Beef
              Marketing &amp; Distribution Promotion Association. In Kobe it costs <strong>from ¥2,508 at lunch</strong>{" "}
              (a steak rice bowl) or ¥3,900 for a lunch course, and <strong>¥4,100 to ¥30,800 for a dinner course</strong>,
              from casual steakhouses to teppanyaki counters (restaurants&apos; own sites, {TODAY}). Book dinner and any
              course <strong>by the day before</strong> — several restaurants sell courses only by reservation.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              For the rest of the day — Kitano, the harbour and the Rokko night view — see the{" "}
              <Link href="/guides/attractions/kobe-day-trip-from-osaka">Kobe day trip from Osaka</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kobeBeefSakuraTeppanyaki.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Kobe beef teppanyaki →
              </KlookLink>
              <KlookLink href={kobeBeefHarbourKitanoDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Kobe day tour with the beef →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these before the day"
          heading="Where Can You Book a Kobe Beef Table Online?"
          intro="Three Kobe restaurants bookable as a course on Klook, a guided day with the meal included, and data. Klook prices change by date, so open a listing for the figure on your day."
          items={kobeBeefTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is Kobe Beef in Kobe?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From ¥2,508 at lunch to about ¥30,000 for a dinner course. Lunch is the cheap way in at every type of
            restaurant; teppanyaki and premium steakhouses cost the most at dinner.
          </p>
          <SimpleTable
            head={["Restaurant", "Type", "Lunch", "Dinner", "How to book", "Nearest station"]}
            rows={restaurants.map((r) => [r.name, r.type, r.lunch, r.dinner, r.book, r.station])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY}. Prices include tax; service charges as shown. Sources:{" "}
            {ext(PLAISIR_URL, "Kobe Plaisir on TableCheck")}, {ext(BIFTECK_URL, "bifteck.co.jp")},{" "}
            {ext(MOURIYA_URL, "mouriya.co.jp")}, {ext(REDONE_URL, "RED ONE")} and {ext(YAZAWA_URL, "YAZAWA")} on
            koubegyuu.com. Menus change; the restaurant&apos;s own page has the price for your date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kobeBeefRedOneCourse.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              RED ONE course on Klook →
            </KlookLink>
            <KlookLink href={kobegyuMiyabiCourse.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kobegyu Miyabi course →
            </KlookLink>
            <KlookLink href={kisshokichiKobeBeefCourse.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Kisshokichi course →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards heading="Book on the same day as the table" cards={kobeBeefSameDayCards} />

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book Kobe Beef in Advance?</h2>
          <p className={styles.bodyText}>
            Yes for dinner and for any course. KOBE BEEF RED ONE takes reservations only; YAZAWA sells its yakiniku
            courses only when booked by the day before and takes no course orders on the day; Kobe Plaisir needs its
            private teppanyaki rooms booked by the day before and charges the full meal for a no-show or same-day
            cancellation; Bifteck Kawamura says lunch and dinner tend to be crowded and asks for advance booking. Most
            of these take English bookings on TableCheck, which asks for a card. None of them gives a number of weeks;
            for a Friday or Saturday dinner, book as soon as your date is fixed.
          </p>
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY} on {ext(REDONE_URL, "koubegyuu.com")}, {ext(PLAISIR_URL, "tablecheck.com")} and{" "}
            {ext(BIFTECK_RESERVE_URL, "bifteck.co.jp")}.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The real thing</span>
          <h2 className={styles.sectionTitle}>How Can I Tell Real Kobe Beef?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Look for the bronze bull and the certificate at the door, and ask for the 10-digit ID number. Only Tajima
            cattle bred and fattened in Hyogo, processed in Hyogo, and graded yield A or B, quality 4 or above, BMS 6
            or above and a carcass of 499.9 kg or less may be sold as Kobe beef.
          </p>
          <SimpleTable
            head={["Sign", "Where you see it", "What it tells you"]}
            rows={checkRows.map((r) => [r.sign, r.where, r.what])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY}, Kobe Beef Marketing &amp; Distribution Promotion Association:{" "}
            {ext(NIKU_CRITERIA_URL, "grading criteria")}, {ext(NIKU_DEF_URL, "bylaws")},{" "}
            {ext(NIKU_CERT_URL, "certification")} and {ext(NIKU_FAQ_URL, "FAQ")} (kobe-niku.jp).
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Outside Kobe</span>
          <h2 className={styles.sectionTitle}>Can I Eat Kobe Beef in Osaka or Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes, at shops registered with the association, which display the same bronze statue and certificate outside
            Hyogo; MOURIYA, for example, runs a branch in Gion, Kyoto ({ext(MOURIYA_GION_URL, "mouriya.co.jp")}). Ask
            for the 10-digit ID wherever you eat it. Kobe itself has the widest choice and the cheapest lunches, and
            Sannomiya is about 30 minutes from Osaka by JR, Hanshin or Hankyu — the{" "}
            <Link href="/guides/attractions/kobe-day-trip-from-osaka">Kobe day trip guide</Link> has the trains. For
            Osaka&apos;s own food, see the <Link href="/guides/attractions/osaka-food-tour">Osaka food tour guide</Link>.
          </p>
        </section>

        <BookingEsimCard lead="Booking vouchers, the restaurant's map pin and the train back to Osaka — get mobile data before you land." />

        <KlookTourPicks
          heading="Kobe Beef Bookings and Tours"
          intro="Three restaurant courses with the table reserved, and a guided day from Osaka with the meal included. Klook prices change by date, so open a listing for your day."
          tours={[kobeBeefSakuraTeppanyaki, kobeBeefRedOneCourse, kobegyuMiyabiCourse, kobeBeefHarbourKitanoDayTour]}
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
            <h2 className={styles.ctaBannerTitle}>Book the table first, then plan the day</h2>
            <p className={styles.ctaBannerDesc}>
              The table is the only part of a Kobe day that sells out. Reserve it, then fit the harbour and Kitano around it.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kobeBeefSakuraTeppanyaki.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kobe beef teppanyaki →
              </KlookLink>
              <KlookLink href={kobeBeefHarbourKitanoDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Day tour with Kobe beef →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
