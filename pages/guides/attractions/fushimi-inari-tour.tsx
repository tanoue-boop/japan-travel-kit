import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookLink from "../../../components/KlookLink";
import {
  fushimiInari90MinuteTour,
  fushimiInariGuidedWalk,
  fushimiInariHiddenHikingTour,
  fushimiInariSakeTour,
  fushimiInariSameDayPrep,
  fushimiInariShortWalkingTour,
  fushimiInariToursListUrl,
  kyotoCityFushimiArashiyamaTour,
  kyotoEasternWalkingTour,
  kyotoFushimiInariWalkingTour,
  kyotoHighlightBusTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";

/**
 * Fushimi Inari tour, added 5 Nov 2026 for the exact phrase. The page sells the 6.5%
 * Klook tours band; the hotel is 6.5%, the kimono 6.5%, the pass 5% and the eSIM 20%.
 *
 * Every fact below was read on 5 Nov 2026:
 *
 *   inari.jp                The shrine's own site. /access/ and /en/access/ for the
 *                           trains (Kyoto Station to Inari about 5 minutes, two stations;
 *                           Keihan 5 minutes on foot), bus and parking; /request/ for the
 *                           17 prohibited acts dated 1 Jan 2022; /trip/map01/ for
 *                           Ichinomine at 233 m; /about/faq/ for about 10,000 torii;
 *                           /rite/ for 8 Nov; /news/topics/ for the kagura hours notice of
 *                           30 Oct 2026 and the conduct request of 7 Sep 2026. The shrine's
 *                           site does NOT publish opening hours or an admission line.
 *   ja.kyoto.travel         Kyoto City Tourism Association listing 448: no gate closure,
 *                           open all year, amulet office 8:00–18:00, 120 minutes including
 *                           the mountain. /comfort/ for the hourly crowd forecast.
 *   totteoki.kyoto.travel   Kyoto's "Totteoki" project, 4 Nov 2025: "24時間拝観可能",
 *                           "境内自由".
 *   kyoto.travel            Taxi-driver tips, 17 Nov 2025 ("Open twenty-four hours a day");
 *                           the Fushimi access page (JR about 9 minutes, avoid City Bus
 *                           South No. 5, Keihan 22 minutes from Gion-shijo); the DMO Kyoto
 *                           guided tour, 1 Aug 2025.
 *   japan.travel/en/spot/1128   "It takes between two to three hours to tour the mountain".
 *   Klook listings          /activity/ pages answer automated reads with HTTP 403, so the
 *                           listings were read as www.klook.com search-index copies.
 *                           Anything an index copy did not show is marked as such in the
 *                           table rather than filled in. No Klook price appears anywhere.
 *
 * The two official time figures differ (120 minutes and two to three hours; 5 and 9 minutes
 * from Kyoto Station) and the page shows both rather than choosing. We found no official
 * step count, and no official hour-by-hour crowd figure we could read, so neither is stated.
 */
const CHECKED = checkedLabel("2026-11-05");
const ROUTE = "/guides/attractions/fushimi-inari-tour";
const NOT_SHOWN = "Not in the listing text";

/** The shrine's own hours and costs, with who publishes each. */
const visitRows = [
  { what: "Admission", detail: "Free. Kyoto's official listing wording is \"grounds free\"", source: "totteoki.kyoto.travel" },
  { what: "Grounds", detail: "Open 24 hours, no gate closure, open all year", source: "ja.kyoto.travel, kyoto.travel" },
  { what: "Amulet office", detail: "8:00–18:00", source: "ja.kyoto.travel" },
  { what: "Kagura", detail: "9:00–16:00 from 1 Nov 2026 until further notice; reception closes 15:30", source: "inari.jp notice, 30 Oct 2026" },
  { what: "Mountain round", detail: "2–3 hours; Kyoto's listing allows 120 minutes for the whole visit", source: "japan.travel, ja.kyoto.travel" },
  { what: "Height", detail: "233 m at Ichinomine, the top of Mount Inari", source: "inari.jp" },
];

/** Klook listing facts only; no prices. */
const tourRows = [
  {
    tour: "Fushimi Inari Shrine Walking Tour",
    url: fushimiInariShortWalkingTour.url,
    length: "1 hr – 1 hr 15",
    meet: "Fukakusa Inarionmaecho, by the shrine",
    covers: "The shrine's history, its foxes, what the red gates mean and cost",
    mountain: NOT_SHOWN,
  },
  {
    tour: "90-minute Fushimi Inari Taisha Walking Guided Tour",
    url: fushimiInari90MinuteTour.url,
    length: "1 hr 30",
    meet: "In front of the JR Inari Station ticket gate",
    covers: "Children from age 1; final details sent 7 to 3 days before; optional one-person guarantee fee",
    mountain: NOT_SHOWN,
  },
  {
    tour: "Fushimi Inari Shrine Walking Guided Tour",
    url: fushimiInariGuidedWalk.url,
    length: "2 hr 30",
    meet: "At the shrine, 68 Fukakusa Yabunouchicho",
    covers: "The shrine and the natural scenery of Mount Inari",
    mountain: "Yes, the listing names Mount Inari; summit not stated",
  },
  {
    tour: "Fushimi Inari Taisha Small Group Walking Tour",
    url: kyotoFushimiInariWalkingTour.url,
    length: "3 hr",
    meet: "Meet with guide; exact point not in the listing text",
    covers: "Small group, the red torii gates and a guide on their history",
    mountain: "Optional hike up Mount Inari",
  },
  {
    tour: "Fushimi Inari Hidden Hiking Tour",
    url: fushimiInariHiddenHikingTour.url,
    length: "3 hr",
    meet: "FamilyMart Nakai Tofukuji",
    covers: "About 7 km on less-visited trails, some of it through bamboo",
    mountain: "Back trails rather than the main gate path",
  },
  {
    tour: "Half Day Walking Tour with Sake Tasting",
    url: fushimiInariSakeTour.url,
    length: "3 hr 40",
    meet: NOT_SHOWN,
    covers: "The shrine plus the Gekkeikan Okura Sake Museum, licensed English-speaking guide",
    mountain: NOT_SHOWN,
  },
];

/** Full-day tours that include the shrine. */
const dayTourRows = [
  {
    tour: "Kyoto City, Fushimi Inari, Arashiyama & Kiyomizu-dera Tour",
    url: kyotoCityFushimiArashiyamaTour.url,
    length: "09:20–17:00",
    meet: "Kyoto Station Hachijo Exit sightseeing bus stop, in front of Kyoto Avanti",
  },
  {
    tour: "Walking Tour of Eastern Kyoto: Fushimi Inari, Kiyomizu & Gion",
    url: kyotoEasternWalkingTour.url,
    length: "8 hr",
    meet: "Kyoto Station",
  },
  {
    tour: "Kyoto One Day Highlight Bus Tour",
    url: kyotoHighlightBusTour.url,
    length: "8 hr 30",
    meet: "Meet at location; address not in the listing text",
  },
];

/** Official routes only. */
const accessRows = [
  {
    route: "Kyoto Station → JR Inari, JR Nara Line",
    time: "About 5 min (shrine) or 9 min (Kyoto City)",
    walk: "The shrine is right by the station",
    note: "Every Miyakoji Rapid, Regional Rapid and local train stops here. The route to use.",
  },
  {
    route: "Gion-shijo → Fushimi-Inari, Keihan Main Line",
    time: "About 22 min",
    walk: "About 5 min east",
    note: "Limited expresses do not stop at Fushimi-Inari. The route from Gion and Kawaramachi.",
  },
  {
    route: "Kyoto Station → Inari Taisha-mae, City Bus South No. 5",
    time: "Not stated; varies by more than 24 min",
    walk: "About 7 min east",
    note: "Kyoto's own guide says to avoid it.",
  },
  {
    route: "Car",
    time: "About 20 min from Kyoto-minami IC",
    walk: "Shrine car parks",
    note: "Worshippers only, closed 30 December to 6 January, and the shrine asks you to come by public transport.",
  },
];

const compareRows = [
  { what: "Cost", tour: "The tour fee; current prices are on Klook", solo: "Free" },
  { what: "Start time", tour: "Fixed by the listing", solo: "Any hour: the grounds do not close" },
  { what: "Explanation", tour: "History, foxes and what the gates mean", solo: "The signs, and this page" },
  { what: "Route", tour: "Set by the guide; the hiking tour leaves the main path", solo: "Yours; turn back whenever you like" },
  { what: "Being late", tour: "On the hiking tour you cannot join and are not refunded", solo: "No penalty" },
  { what: "Reaching the top", tour: "Check the listing: none of the listing text promises the summit", solo: "Your choice; allow 2–3 hours" },
];

/** The shrine's own list, dated 1 January 2022: the ones a visitor is likely to break. */
const ruleRows = [
  { rule: "Eating and drinking", status: "Only in the free rest area. No eating while walking or standing to eat in the grounds." },
  { rule: "Photos", status: "Do not block the narrow path to take them. Commercial shoots are prohibited." },
  { rule: "Drones", status: "Prohibited." },
  { rule: "Dogs and pets", status: "No walking or visiting with them, except assistance dogs and similar." },
  { rule: "Strollers", status: "Do not leave them outside the designated places." },
  { rule: "Wild birds and animals", status: "Do not approach or feed them." },
  { rule: "Sitting and noise", status: "No loud noise or sitting on the grounds. The shrine repeated this on 7 Sep 2026, adding dance performances that block paths." },
  { rule: "Smoking and fire", status: "Prohibited." },
  { rule: "Dress", status: "No wedding dresses, or clothing unsuited to worship, in the grounds." },
];

const faqItems = [
  {
    q: "Is a Fushimi Inari tour worth it?",
    a: "Worth it if you want the shrine explained, or if a booked start is what gets you out of bed early. Not needed just to see the gates: the grounds are free and open 24 hours, and JR Inari puts you at the entrance. If you are only buying one guided hour, the 1-hour and 90-minute walks do that job; the 3-hour tours are for people who also want the mountain.",
  },
  {
    q: "How long does it take to hike Fushimi Inari?",
    a: `Two to three hours to tour the mountain, on Japan's national tourism site, and Kyoto's own listing allows 120 minutes for a visit including the mountain. Read on ${CHECKED}. The top, Ichinomine, is 233 m. If you only want the Senbon Torii, the Okusha prayer hall sits just past them, so you can turn back there and keep the visit much shorter.`,
  },
  {
    q: "What is the best time to visit Fushimi Inari?",
    a: "Early morning. Kyoto's official tourism site calls the shrine a perfect spot for early in the morning, when the gates glow in the dawn light, and it also recommends late afternoon and early evening. Japan's national tourism site suggests late morning to mid-afternoon for the walk itself, so that is a daylight plan, not a quiet one. For your date, Kyoto's comfort map forecasts the area hour by hour from 06:00 to 23:00.",
  },
  {
    q: "Is Fushimi Inari free?",
    a: `Yes. Kyoto's official tourism project lists the grounds as free to enter. A tour costs money, but walking the Senbon Torii and the mountain does not. Read on ${CHECKED}.`,
  },
  {
    q: "Is Fushimi Inari open 24 hours?",
    a: `Yes. Kyoto's official sources say it is open twenty-four hours a day, with no gate closure and no closing day. What keeps hours is the rest of the shrine: the amulet office lists 8:00–18:00, and kagura runs 9:00–16:00 from 1 November 2026 until further notice. Read on ${CHECKED}.`,
  },
  {
    q: "How do I get to Fushimi Inari from Kyoto Station?",
    a: `Take the JR Nara Line to JR Inari, two stations and about 5 minutes on the shrine's site or about 9 on Kyoto City's. Every Miyakoji Rapid, Regional Rapid and local train stops there, and the main approach is right outside. Kyoto City advises against City Bus South No. 5, which it expects to vary by more than 24 minutes. Read on ${CHECKED}.`,
  },
  {
    q: "Do you need to book a Fushimi Inari tour in advance?",
    a: "You need no booking to visit the shrine. You do need one for a tour, and earlier is safer for the 90-minute walk, which sends final details 7 to 3 days before the date and sells an optional fee to guarantee it runs for one person. Klook shows what is left on your date.",
  },
  {
    q: "What should I wear to Fushimi Inari?",
    a: "Shoes with good grip, above anything else. The way up is a mountain path with stone stairs, and Klook's hiking tour warns the ground can be slippery. The official sources checked give no step count. The shrine bans wedding dresses and clothing unsuited to worship in the grounds, and in a rental kimono it is sensible to stay on the lower gates.",
  },
  {
    q: "Can you visit Fushimi Inari in the rain?",
    a: "Yes. The grounds do not close, but wet stone stairs are slippery, so think twice about the full mountain round. Kyoto's comfort map has a rain setting, because the weather changes the forecast crowd. Check a tour's weather rule at checkout, since the listing text does not state one.",
  },
  {
    q: "Is Fushimi Inari OK for kids and strollers?",
    a: "The lower gates suit children; the full round is a 2–3 hour mountain walk. The shrine asks that strollers are not left outside designated places, so plan to carry a small child on the stairs. The 90-minute Klook walk takes children from age 1, and the hiking tour asks parents of children under 8 to request permission before booking.",
  },
  {
    q: "Can you eat at Fushimi Inari?",
    a: "Not while walking in the grounds. The shrine's rules allow eating and drinking only in the free rest area, and rule out eating on the move or standing up to eat. Do your snacking outside the grounds, and take your rubbish with you.",
  },
];

const TITLE = "Fushimi Inari Tour 2026: Hike Time, Hours & Best Time";
const DESCRIPTION =
  "A Fushimi Inari tour runs 1 to 3 hours 40, but the shrine is free and open 24 hours. Compare Klook tours, the 2–3 hour hike, trains and the best time.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
    { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
    { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
    { "@type": "ListItem", position: 4, name: "Fushimi Inari Tour", item: `https://www.japan-travel-kit.com${ROUTE}` },
  ],
};

const relatedGuides = [
  { href: "/guides/attractions/kyoto-cooking-class", title: "Kyoto Cooking Class (2026): Sushi, Ramen, Wagashi Compared" },
  { href: "/guides/attractions/arashiyama-bamboo-forest-tour", title: "Arashiyama Bamboo Forest Tour (2026): Best Time, Tours and Routes From Kyoto" },
  { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto (2026): Temples, Timing and What to Book" },
  { href: "/guides/attractions/gion-night-walking-tour", title: "Gion Night Walking Tour 2026: Times, Types & Photo Rules" },
  { href: "/guides/attractions/kyoto-kimono-rental", title: "Kyoto Kimono Rental (2026): Which Area, What's Included, When to Return" },
  { href: "/guides/attractions/where-to-stay-in-kyoto", title: "Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time" },
  { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "Osaka Kyoto 3 Day Itinerary (2026): Day by Day & Bookings" },
];

const chevron = (
  <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" };
const linkStyle = { color: "var(--red)", fontWeight: 600 };

export default function FushimiInariTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {chevron}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {chevron}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {chevron}
          <span className={styles.breadCurrent}>Fushimi Inari Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Fushimi Inari Tour 2026:<br />Hike Time, Hours &amp; the Best Time to Go
          </h1>
          <p className={styles.heroSubtitle}>
            Six Klook tours side by side, the shrine&apos;s own rules, and an honest answer on whether you need
            a guide at all.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Free, open 24 hours", "1 hr to 3 hr 40 tours", "Tour vs on your own"].map((t) => (
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

        {/* Lead paragraph: the whole answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Fushimi Inari tour</strong> on Klook lasts from <strong>1 hour to 3 hours 40</strong>, but
            you do not need one to get in: Fushimi Inari Taisha is <strong>free and open 24 hours</strong>, every
            day, on Kyoto&apos;s official listings. The walk through the Senbon Torii and round Mount Inari,
            233 m at the top, takes <strong>2–3 hours</strong>, and JR Inari Station is 5 to 9 minutes from Kyoto
            Station by the JR Nara Line. Go <strong>early in the morning</strong> to miss the crowds. A guide adds
            the explanation and a fixed start; 1-hour and 90-minute walks cover the lower shrine, and the 3-hour
            tours add the mountain. Read on {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Admission</p>
                <p className={styles.verdictStatValue}>Free, open 24 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Mountain round</p>
                <p className={styles.verdictStatValue}>2–3 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Klook tours</p>
                <p className={styles.verdictStatValue}>1 hr to 3 hr 40</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Kyoto Station</p>
                <p className={styles.verdictStatValue}>JR Nara Line, 5–9 min</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> take the 3-hour small-group walk if you want the mountain with a guide,
              a 1-hour or 90-minute walk if you only want the story, and no tour at all if you just want the
              gates at dawn.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoFushimiInariWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the Fushimi Inari tour on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tours</span>
          <h2 className={styles.sectionTitle}>Which Fushimi Inari Tour Should You Book?</h2>
          <p className={styles.bodyText}>
            Decide how much of the mountain you want, then check the meeting point. The six listings run from an
            hour at the lower shrine to a 7 km hike on the back trails, and they meet in different places, so a
            tour&apos;s start point is part of the choice.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Klook tour", "Length", "Meeting point", "What it covers", "Mount Inari"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener">{row.tour}</KlookLink>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.meet}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.mountain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Read on {CHECKED} from the Klook listings as they appear in search results. Where a cell says the
            detail was not in the listing text, Klook shows it on
            the listing or at checkout. Inclusions and cancellation terms were mostly not in that text, so check
            them before paying. Current prices are on Klook.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={fushimiInari90MinuteTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the 90-minute walk →
            </KlookLink>
            <KlookLink href={fushimiInariHiddenHikingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the hidden hiking tour →
            </KlookLink>
          </div>
        </section>

        {/* Full day */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Full-day tours</span>
          <h2 className={styles.sectionTitle}>Is There a Kyoto Day Tour That Includes Fushimi Inari?</h2>
          <p className={styles.bodyText}>
            Yes, and it is the better buy if you have one day for the whole city. These start at or near Kyoto
            Station and put the shrine on a route with Kiyomizu-dera, Arashiyama or Kinkaku-ji, so you trade time
            on the mountain for not planning the buses.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Klook tour", `Time (read ${CHECKED})`, "Meeting point"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayTourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>
                        <KlookLink href={row.url} target="_blank" rel="sponsored noopener">{row.tour}</KlookLink>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.meet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Want a guide at dawn? Klook also sells a Kyoto Early Morning Tour covering Fushimi Inari, Arashiyama
            and the Golden Temple, and its travel blog says that tour reaches the shrine at 7:00. The listing
            itself is not quoted here, so confirm the start and the meeting point on{" "}
            <KlookLink href={fushimiInariToursListUrl} target="_blank" rel="sponsored noopener" style={linkStyle}>
              Klook&apos;s Fushimi Inari page
            </KlookLink>
            .
          </p>
        </section>

        {/* Free / hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours and cost</span>
          <h2 className={styles.sectionTitle}>Is Fushimi Inari Free, and When Is It Open?</h2>
          <p className={styles.bodyText}>
            Yes, it is free, and the grounds never close. The hours that do exist belong to the amulet office and
            to prayers, so a dawn or late-night visit gets you the gates but not the counters.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `Fushimi Inari Taisha (read ${CHECKED})`, "Source"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visitRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            The shrine&apos;s own site does not publish opening hours or an admission line, so those rows come from
            Kyoto&apos;s official tourism sites. On 8 November the shrine&apos;s calendar lists Hitaki-sai at 13:00 and
            torchlit mikagura at 18:00, and DMO Kyoto&apos;s own guided tour does not run on event days, so check
            the date if your tour falls on a festival.
          </p>
        </section>

        {/* Hike */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The hike</span>
          <h2 className={styles.sectionTitle}>How Long Does It Take to Hike Fushimi Inari?</h2>
          <p className={styles.bodyText}>
            Two to three hours for the mountain, on Japan&apos;s national tourism site; Kyoto&apos;s listing allows
            120 minutes for a visit that includes it. Those are the only official figures given, so use the
            longer one if you are not a regular walker. The shrine counts about 10,000 torii along the mountain
            paths, so the gates do not stop at the famous stretch.
          </p>
          <p className={styles.bodyText}>
            You can stop early. The Okusha prayer hall is just past the Senbon Torii on the shrine&apos;s own map,
            which makes it a natural turning point for anyone short of time, in sandals or with small children.
          </p>
        </section>

        {/* Best time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing and crowds</span>
          <h2 className={styles.sectionTitle}>What Is the Best Time to Visit Fushimi Inari?</h2>
          <p className={styles.bodyText}>
            Early morning. Kyoto&apos;s official tourism site names it as a perfect place for the early hours, when
            the gates glow in the dawn light, and notes that the shrine office will be open around the time you
            get back down. Its second pick is late afternoon and early evening, which it calls a delightfully
            eerie stroll. Japan&apos;s national tourism site suggests late morning to mid-afternoon, with a light
            lunch on the hike, which suits daylight and legs better than it suits a quiet walk.
          </p>
          <p className={styles.bodyText}>
            For your own date, use{" "}
            <a href="https://ja.kyoto.travel/comfort/fushimi/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Kyoto&apos;s comfort map
            </a>
            . It rates the area around the shrine on a five-step scale for each hour from 06:00 to 23:00, and you
            can switch it to the weather expected on the day. A guided tour with a fixed daytime start cannot
            choose a quiet hour, so compare it against the forecast before you book.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Fushimi Inari from Kyoto Station?</h2>
          <p className={styles.bodyText}>
            Take the JR Nara Line to JR Inari: two stations, and the approach to the shrine is right outside. The
            shrine says about 5 minutes and Kyoto City says about 9, and every rapid and local train stops there.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", `Time (read ${CHECKED})`, "Then on foot", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.walk}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Times are from inari.jp and Kyoto&apos;s official &ldquo;Comfortable access to Fushimi&rdquo; page. If your
            tour meets at FamilyMart Nakai Tofukuji rather than the shrine, follow the map in your booking. Our{" "}
            <Link href="/guides/transport/kyoto-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kyoto transportation guide
            </Link>{" "}
            covers the rest of the city.
          </p>
        </section>

        <BookingEsimCard lead="Heading to Fushimi Inari? Get mobile data before you land." />

        {/* Tour vs solo */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or on your own</span>
          <h2 className={styles.sectionTitle}>Is a Fushimi Inari Tour Worth It?</h2>
          <p className={styles.bodyText}>
            It is worth it if you want to know what you are looking at. It is not needed to see the gates: the
            shrine charges nothing, the approach starts outside the station, and going alone lets you pick the quiet hour.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `On a Klook tour (read ${CHECKED})`, "On your own"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.solo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book a Fushimi Inari Tour in Advance?</h2>
          <p className={styles.bodyText}>
            The shrine needs no booking; a tour does. Set your date on Klook before you plan the rest of the day,
            because availability is the one thing this page cannot show you. Three listed details should decide
            how far ahead you go:
          </p>
          <ul className={styles.bodyText}>
            <li>The 90-minute walk sends final details 7 to 3 days before the date, and tells you to check with reception if none arrive.</li>
            <li>That walk also sells an optional fee to guarantee a departure for one person, so solo travellers should read that option first.</li>
            <li>The hiking tour starts on time: miss it and you cannot join, reschedule or get a refund.</li>
          </ul>
          <div className={styles.pickCtaRow}>
            <KlookLink href={kyotoFushimiInariWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              See dates for the 3-hour walk →
            </KlookLink>
            <KlookLink href={fushimiInariShortWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              See the 1-hour walk →
            </KlookLink>
            <KlookLink href={fushimiInariGuidedWalk.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              See the 2 hr 30 walk →
            </KlookLink>
          </div>
        </section>

        {/* Clothing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What to wear</span>
          <h2 className={styles.sectionTitle}>What Should You Wear to Fushimi Inari?</h2>
          <p className={styles.bodyText}>
            Wear shoes with good grip. The route up is a mountain path with long runs of stone stairs, and
            Klook&apos;s hiking tour says the ground can be slippery; the official sources checked give no step count. Its older
            regional listing adds a cap and sunglasses for summer, and long sleeves and trousers against mosquitoes.
            The shrine&apos;s only dress rule bars wedding dresses and clothing unsuited to worship in the grounds.
          </p>
          <p className={styles.bodyText}>
            Going in a kimono? Keep to the lower gates and check your return time. Our{" "}
            <Link href="/guides/attractions/kyoto-kimono-rental" style={linkStyle}>Kyoto kimono rental guide</Link>{" "}
            compares the shops by area.
          </p>
        </section>

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Rain</span>
          <h2 className={styles.sectionTitle}>Can You Visit Fushimi Inari in the Rain?</h2>
          <p className={styles.bodyText}>
            Yes. The grounds stay open, and the wet stone is the thing to plan around, so a rainy day is a case for
            turning back at the Okusha prayer hall rather than doing the whole mountain. Kyoto&apos;s comfort map has
            rain and heavy-rain settings, because weather moves the forecast crowd. The listing text gives no
            weather rule for tours, so check it at checkout.
          </p>
        </section>

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Children</span>
          <h2 className={styles.sectionTitle}>Is Fushimi Inari OK for Kids?</h2>
          <p className={styles.bodyText}>
            Yes for the lower gates, and a harder call for the full round, which is a 2–3 hour mountain walk.
            Strollers will not get you up the stairs, and the shrine asks that none are left outside designated
            places. The 90-minute Klook walk takes children from age 1. The hiking tour asks parents of children
            under 8 to request permission before booking, and is not recommended for anyone who has trouble
            walking.
          </p>
        </section>

        {/* Rules */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rules</span>
          <h2 className={styles.sectionTitle}>What Are the Rules at Fushimi Inari?</h2>
          <p className={styles.bodyText}>
            The shrine publishes a list of 17 prohibited acts, dated 1 January 2022. These are the ones a visitor
            is most likely to run into, and a tour does not exempt you from any of them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Topic", `The shrine's rule (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ruleRows.map((row) => (
                    <tr key={row.rule}>
                      <td className={styles.tdProvider}>{row.rule}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <KlookTourPicks
          heading="Rather Book a Guided Half Day?"
          intro="If the shrine is one stop in a longer day, these two add a second reason to go: a sake museum in Fushimi, or the east of the city on foot."
          tours={[fushimiInariSakeTour, kyotoEasternWalkingTour]}
        />

        <KlookTripPrep
          label="Book for the same day"
          heading="What Else to Book for Your Fushimi Inari Day"
          intro="The shrine is free, so the bookings around it decide how the day goes: a bed close to the train, the kimono, the pass and the data."
          items={fushimiInariSameDayPrep}
        />

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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{guide.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Walk the gates with a guide</h2>
            <p className={styles.ctaBannerDesc}>
              From an hour at the lower shrine to three hours on the mountain, with meeting points that differ by
              listing. Check your date on Klook.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={kyotoFushimiInariWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Fushimi Inari Tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
