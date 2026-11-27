import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import {
  tokyoSubwayTicketSameDayPrep,
  tokyoSubwayTicket,
  subwayCityViewCombo,
  naritaBusSubwayCombo,
  tokyoSightseeingBusTour,
  fujiDayTour,
  shinjukuNightFoodWalkingTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// Every price, fare and rule on this page was read off tokyometro.jp on 8 November 2026:
//   /en/ticket/travel/   Tokyo Subway Ticket prices, validity, lines, who can buy, QR version
//   /en/ticket/regular/  Tokyo Metro single fares by distance (IC and paper, adult and child)
//   /en/ticket/1day/     Tokyo Metro 24-hour Ticket and the Common One-day Ticket
//   /en/ticket/age/      fare age bands
//   /en/ticket/airport_bus/  airport bundles that include the pass
//   /lang_en/news/223056.html  QR version usable on Metro and Toei from 25 March 2026
// Re-read on 16 November 2026: /en/ticket/travel/, /en/ticket/1day/ and /en/ticket/regular/
// (all figures unchanged), plus the joint Tokyo Metro / Toei notice of 30 January 2026
// (metroNews260130_g05.pdf): from 14 March 2026 the Tokyo Subway Ticket went from
// ¥800 / ¥1,200 / ¥1,500 to ¥1,000 / ¥1,500 / ¥2,000 (child ¥400 / ¥600 / ¥750 to
// ¥500 / ¥750 / ¥1,000) and the Common One-day Ticket from ¥900 to ¥1,100.
// No Toei single fare is printed: only Tokyo Metro's fare table was read.
// Re-read on 23 November 2026 (task jtk-20261123-R01): /en/ticket/travel/, the Japanese
// /ticket/value/travel/ page, /en/ticket/regular/, /en/ticket/1day/, /en/ticket/age/, the
// 30 January 2026 notice, and the English sales-location list (travel/pdf/info_ticket_en.pdf):
// Narita T1 / T2 arrival lobbies, Haneda T3 2F (Keikyu Tourist Information Center and Tokyo
// Tourist Information Center), Tokyo Metro pass offices and tourist information desks, 12
// BicCamera stores, 3 Sofmap stores and hotels; passport check when bought in Japan. The
// Japanese page: ticket and QR versions run from the first gate pass; sales are capped at the
// number of days of the stay; the IC version (for smartEX users) runs from purchase.
// JR TOKYO Wide Pass ¥16,000 / child ¥8,000, three consecutive days, JR East lines and the
// listed partner lines (jreast.co.jp/en/multi/pass/tokyowidepass.html, read the same day).
// The 24-hour adult and child prices are shared with lib/attraction-prices.ts.
const P = PRICES.tokyoSubwayTicket;
const CHECKED = "23 November 2026";
const LAST_CHECKED = "2026-11-23";
const OFFICIAL = "https://www.tokyometro.jp/en/ticket/travel/index.html";
const OFFICIAL_1DAY = "https://www.tokyometro.jp/en/ticket/1day/index.html";
const OFFICIAL_FARES = "https://www.tokyometro.jp/en/ticket/regular/index.html";
const PRICE_NOTICE = "https://www.tokyometro.jp/news/images_h/metroNews260130_g05.pdf";
const SALES_LIST = "https://www.tokyometro.jp/ticket/value/travel/pdf/info_ticket_en.pdf";
const JR_WIDE = "https://www.jreast.co.jp/en/multi/pass/tokyowidepass.html";

const priceRows = [
  { pass: "24-hour ticket", adult: P.adult, child: P.child, perDay: "¥1,000 / day", before: "¥800" },
  { pass: "48-hour ticket", adult: "¥1,500", child: "¥750", perDay: "¥750 / day", before: "¥1,200" },
  { pass: "72-hour ticket", adult: "¥2,000", child: "¥1,000", perDay: "¥667 / day", before: "¥1,500" },
];

// Rides per day at Tokyo Metro adult IC fares, against the pass. Simple multiplication.
const perDayRows = [
  { rides: 2, short: "¥356", mid: "¥418", long: "¥504", verdict: "Pay as you go" },
  { rides: 3, short: "¥534", mid: "¥627", long: "¥756", verdict: "72-hour wins only on 12 km+ rides (¥756 vs ¥667)" },
  { rides: 4, short: "¥712", mid: "¥836", long: "¥1,008", verdict: "72-hour wins; 24-hour only on 12 km+ rides" },
  { rides: 5, short: "¥890", mid: "¥1,045", long: "¥1,260", verdict: "72-hour wins; 24-hour from 7–11 km rides" },
  { rides: 6, short: "¥1,068", mid: "¥1,254", long: "¥1,512", verdict: "Any version wins" },
];

// Trip length → which ticket. Built from the 72-hour clock (first gate pass) and the
// itinerary pages on this site; day trips out of Tokyo are not on the pass.
const tripLengthRows = [
  { days: "2 days", pass: "48-hour (¥1,500)", why: "Two subway days in one 48-hour window", href: "/guides/attractions/tokyo-2-day-itinerary", label: "Tokyo 2-day itinerary" },
  { days: "3 days", pass: "72-hour (¥2,000)", why: "About ¥667 a day; the default for three city days", href: "/guides/attractions/tokyo-3-day-itinerary", label: "Tokyo 3-day itinerary" },
  { days: "4 days", pass: "72-hour (¥2,000)", why: "Started on Day 1, it runs to the same time on Day 4", href: "/guides/attractions/tokyo-4-day-itinerary", label: "Tokyo 4-day itinerary" },
  { days: "5 days", pass: "72-hour + IC card", why: "Pass on the three city days, IC card on day-trip days", href: "/guides/attractions/tokyo-5-day-itinerary", label: "Tokyo 5-day itinerary" },
  { days: "7 days", pass: "24-hour tickets on the heavy days + IC card", why: "Day trips split the city days, and a 72-hour clock keeps running through them", href: "/guides/attractions/tokyo-7-day-itinerary", label: "Tokyo 7-day itinerary" },
];

// From Tokyo Metro's English sales-location list (info_ticket_en.pdf), read 23 Nov 2026.
const salesRows = [
  { where: "Narita Airport", detail: "Terminal 1, 1F arrival lobby; Terminal 2, 1F arrival lobby (Zones A and B)" },
  { where: "Haneda Airport", detail: "Terminal 3, 2F: Keikyu Tourist Information Center and Tokyo Tourist Information Center Haneda Airport" },
  { where: "Tokyo Metro stations", detail: "Pass offices and tourist information at Ueno, Ginza, Shinjuku, Tokyo, Omotesando, Ikebukuro, Iidabashi, Takadanobaba and Otemachi, among others" },
  { where: "BicCamera / Sofmap", detail: "12 BicCamera stores (Ikebukuro, Yurakucho, Shinjuku, Shibuya, AKIBA, Skytree Town and more) and 3 Sofmap stores in Akihabara" },
  { where: "Hotels and tourist centres", detail: "A list of Tokyo hotels plus tourist information centres in Shinjuku, Shibuya, Asakusa, Ginza and Ikebukuro" },
  { where: "Online", detail: "Tokyo Metro's official page (ticket or QR version), or Klook" },
];

const compareRows = [
  {
    name: "Tokyo Subway Ticket",
    price: "¥1,000 / ¥1,500 / ¥2,000 (24 / 48 / 72 h)",
    lines: "All 9 Tokyo Metro + all 4 Toei Subway lines",
    validity: "24, 48 or 72 hours from first use",
    who: "Overseas visitors; residents outside Tokyo and 7 nearby prefectures",
    where: "Narita / Haneda counters, Metro stations, BicCamera; online (official or Klook)",
  },
  {
    name: "Tokyo Metro 24-hour Ticket",
    price: "¥700 (child ¥350)",
    lines: "Tokyo Metro only — no Oedo, Asakusa, Mita or Shinjuku lines",
    validity: "24 hours from first use",
    who: "Anyone",
    where: "Ticket machines at all Tokyo Metro stations (same day); online store (advance)",
  },
  {
    name: "Common One-day Ticket (Metro & Toei)",
    price: "¥1,100 (child ¥550)",
    lines: "All Tokyo Metro + Toei Subway lines",
    validity: "One day (same-day ticket: the day of purchase)",
    who: "Anyone",
    where: "Ticket machines at Tokyo Metro and Toei stations",
  },
  {
    name: "Suica / PASMO, pay per ride",
    price: "¥178–¥324 per Tokyo Metro ride (adult IC)",
    lines: "Metro, Toei, JR (Yamanote) and buses",
    validity: "No pass window: each ride is charged",
    who: "Anyone",
    where: "See our IC card guide",
  },
  {
    name: "JR TOKYO Wide Pass",
    price: "¥16,000 (child ¥8,000)",
    lines: "JR East lines (Yamanote included) and listed partner lines; no Tokyo Metro or Toei",
    validity: "3 consecutive days",
    who: "As set on JR East's pass page",
    where: "JR East or Klook",
  },
];

// Rides needed to beat the pass price with single IC fares: ceil(price / fare).
const breakEvenRows = [
  { pass: "24-hour (¥1,000)", short: "6 rides", mid: "5 rides", perDay: "5–6 in the 24 hours" },
  { pass: "48-hour (¥1,500)", short: "9 rides", mid: "8 rides", perDay: "about 4–5 a day" },
  { pass: "72-hour (¥2,000)", short: "12 rides", mid: "10 rides", perDay: "about 3–4 a day" },
];

const fareRows = [
  { band: "1–6 km", ic: "¥178", paper: "¥180", child: "¥89" },
  { band: "7–11 km", ic: "¥209", paper: "¥210", child: "¥104" },
  { band: "12–19 km", ic: "¥252", paper: "¥260", child: "¥126" },
  { band: "20–27 km", ic: "¥293", paper: "¥300", child: "¥146" },
  { band: "28–40 km", ic: "¥324", paper: "¥330", child: "¥162" },
];

const ageRows = [
  { band: "Adult", ages: "12 and over", fare: "Adult price" },
  { band: "Child", ages: "6 to 11", fare: "Child price (half)" },
  { band: "Toddler", ages: "1 to 6, not yet at elementary school", fare: "Free, up to two per adult or child; a third pays the child fare" },
  { band: "Infant", ages: "Under 1", fare: "Free" },
];

const whoFor = [
  {
    title: "Buy the 72-hour if…",
    desc: "You have three subway-heavy days in central Tokyo. At ¥2,000 it works out to about ¥667 a day, which four short Metro rides already exceed. This is the version that pays for itself on an ordinary sightseeing day rather than a frantic one.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Skip it if…",
    desc: "Your itinerary runs along the Yamanote Line. The pass covers Tokyo Metro and Toei Subway only — JR is not included, and Shibuya, Shinjuku, Shinagawa and Ueno are all Yamanote stops. A pay-as-you-go IC card handles both networks without the arithmetic.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 8l8 8M16 8l-8 8" />
      </svg>
    ),
  },
  {
    title: "The 24-hour is the marginal one…",
    desc: "At ¥1,000 you need five Metro rides of 7–11 km, or six of the shortest band, in a single 24-hour window to break even. That is a lot for one day unless you are deliberately crossing the city. Check your route before you buy this tier.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Count your subway rides, not your days",
    desc: `The clock runs in hours from first use, not calendar days, so a 24-hour ticket first tapped at 15:00 is valid until 15:00 the next day. That makes an afternoon-arrival day and the following morning a single 24-hour window. Count the Metro and Toei rides inside it — against ¥178–¥324 a ride, five or six is where the ¥1,000 tier starts to pay.`,
  },
  {
    title: "Check whether your route is actually subway",
    desc: "The pass excludes JR, including the Yamanote Line, and private railways. Asakusa, Oshiage, Ginza, Roppongi, Omotesando and Tsukiji are all subway; Shibuya, Shinjuku, Ueno and Akihabara are reachable by subway but are also Yamanote stops you may end up using instead.",
  },
  {
    title: "Buy online before you land",
    desc: "Tokyo Metro's official page sells the pass online, as a standard ticket or as a QR version sent to your phone. Klook sells the same pass with an English checkout; the listing for your date says whether you ride on a QR code or collect a ticket, and where.",
  },
  {
    title: "Keep an IC card anyway",
    desc: "Even with the pass, a Suica or Pasmo covers the JR rides, buses and convenience stores the pass does not. Nobody in Tokyo uses only a subway pass, and carrying both is the normal setup rather than a redundancy.",
  },
];

// The five questions in FAQPage (23 Nov 2026): the 2026 price plus the four the task named
// (when the 72 hours start, child price, JR, buying at the airport). The rest sit in
// `moreQuestions`, rendered as question headings outside the FAQPage.
const faqItems = [
  {
    q: "How much is the Tokyo Subway Ticket in 2026?",
    a: `¥1,000 for 24 hours, ¥1,500 for 48 hours and ¥2,000 for 72 hours for adults; children aged 6 to 11 pay ¥500, ¥750 and ¥1,000. These prices have applied since 14 March 2026, when Tokyo Metro and Toei raised them from ¥800, ¥1,200 and ¥1,500, so older guides quoting ¥800 are out of date. Checked on tokyometro.jp on ${CHECKED}.`,
  },
  {
    q: "When does the 72-hour Tokyo Subway Ticket start counting?",
    a: `At the first ticket gate you pass, not at purchase and not at midnight. Tokyo Metro counts 72 hours from that first gate, so a ticket first used at 14:00 on a Monday runs until 14:00 on Thursday; the 24- and 48-hour tickets work the same way. The IC version loaded onto a PASMO, sold only to smartEX and Express Reservation users, is the exception and counts from purchase. Checked on tokyometro.jp, ${CHECKED}.`,
  },
  {
    q: "How much is the Tokyo Subway Ticket for children?",
    a: `Half the adult price: ¥500 for 24 hours, ¥750 for 48 hours and ¥1,000 for 72 hours, for ages 6 to 11 (a 12-year-old still at elementary school also counts as a child). Up to two children aged 1 to 6 who are not yet at elementary school ride free with each paying passenger, and under-1s are free. Checked on tokyometro.jp, ${CHECKED}.`,
  },
  {
    q: "Can I use the Tokyo Subway Ticket on JR lines?",
    a: "No. It is valid on all Tokyo Metro and Toei Subway lines and nothing else, so JR lines (including the Yamanote Line and the Narita Express), private railways and buses are paid separately. Pay those rides with Suica or PASMO; for JR day trips out of Tokyo, JR East's separate JR TOKYO Wide Pass costs ¥16,000 for three consecutive days.",
  },
  {
    q: "Can I buy the Tokyo Subway Ticket at Narita or Haneda airport?",
    a: `Yes. Tokyo Metro's sales list names the Terminal 1 and Terminal 2 arrival lobbies (1F) at Narita and the Keikyu Tourist Information Center and the Tokyo Tourist Information Center on Terminal 3's 2nd floor at Haneda; a passport is checked when you buy in Japan. The pass does not cover the airport train or bus itself, which is why Skyliner and Limousine Bus bundles exist. Checked ${CHECKED}.`,
  },
];

const moreQuestions = [
  {
    q: "How much is one subway ride in Tokyo?",
    a: `On Tokyo Metro, an adult single ride costs ¥178 to ¥324 on an IC card such as Suica or PASMO, or ¥180 to ¥330 on a paper ticket, depending on distance; children pay about half. Most central-Tokyo hops are in the first two bands, ¥178 or ¥209. Toei Subway sets its own fares. Fares from Tokyo Metro's fare table, checked ${CHECKED}.`,
  },
  {
    q: "Physical ticket or digital QR version?",
    a: "The official Tokyo Metro site offers both: a standard Tokyo Subway Ticket, and a QR version that can be distributed to several mobile devices when you buy more than one. Since 25 March 2026 the QR version can be used on Tokyo Metro and Toei Subway lines directly, so buying and riding happen on one phone. The validity period and the price are the same either way.",
  },
  {
    q: "Can I use the Tokyo Subway Ticket to get to Tokyo Skytree?",
    a: "Yes. Skytree sits above Oshiage Station, which is served by the Tokyo Metro Hanzomon Line and the Toei Asakusa Line, so the pass covers the journey. Asakusa is two stops away on the same Asakusa Line, which makes Senso-ji and Skytree an easy pair on one pass day.",
  },
  {
    q: "Is there a cheaper Tokyo subway pass?",
    a: `The Tokyo Metro 24-hour Ticket is cheaper at ¥700 adult (¥350 child), but it covers only the nine Tokyo Metro lines and not the four Toei lines — and the Oedo, Asakusa and Shinjuku lines are Toei. The Common One-day Ticket for Tokyo Metro & Toei costs ¥1,100 (¥900 before 14 March 2026) and runs for one day rather than 24 hours, so the ¥1,000 Tokyo Subway Ticket beats it for anyone eligible. Prices from tokyometro.jp, checked ${CHECKED}.`,
  },
  {
    q: "Does the Tokyo Subway Ticket cover the Toei Oedo and Asakusa lines?",
    a: "Yes. The official page says the pass is valid on all lines of Tokyo Metro and Toei Subway, and the Oedo, Asakusa, Mita and Shinjuku lines are the four Toei lines. That is the main difference from the Tokyo Metro 24-hour Ticket, which stops at the Metro network.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-subway-ticket") } });

// Title kept to 60 characters; the H1 opens with the same words in the same order.
// 23 Nov 2026: the 14 March 2026 price rise is the subject (price-change rule).
const TITLE = "Tokyo Subway Ticket 2026: New ¥1,000–¥2,000 Price, Worth It?";
const DESC =
  "Tokyo Subway Ticket 2026: ¥1,000/¥1,500/¥2,000 for 24/48/72 hours since 14 March (was ¥800–¥1,500). Break-even by rides, where to buy, vs Suica & JR pass.";

export default function TokyoSubwayTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
            __html: articleJsonLd({
              route: "/guides/attractions/tokyo-subway-ticket",
              headline: TITLE,
              updated,
            }),
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
                { "@type": "ListItem", position: 4, name: "Tokyo Subway Ticket", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" },
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Tokyo Subway Ticket</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Subway Ticket 2026: New ¥1,000–¥2,000 Prices &amp; Is It Worth It?{" "}
            <span style={{ display: "block", fontSize: "0.55em", fontWeight: 600, marginTop: "0.5rem" }}>
              24/48/72-hour prices since 14 March 2026, break-even by rides, vs Suica and the JR TOKYO Wide Pass
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            Unlimited rides on every Tokyo Metro and Toei Subway line for 24, 48 or 72 hours from the first gate,
            now ¥1,000, ¥1,500 or ¥2,000 for adults after the March 2026 price rise. Where to buy it at Narita,
            Haneda or BicCamera, and which length fits a 2-, 3-, 4-, 5- or 7-day Tokyo trip.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Break-even worked out"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first (23 Nov 2026) */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The Tokyo Subway Ticket costs <strong>¥1,000 for 24 hours, ¥1,500 for 48 hours and ¥2,000 for 72
            hours</strong> for adults (children ¥500 / ¥750 / ¥1,000) since 14 March 2026, up from ¥800, ¥1,200 and
            ¥1,500. On the 72-hour ticket, about ¥667 a day, it pays off from <strong>three subway rides a day</strong>{" "}
            if they are 12 km or longer (¥252 each on an IC card) and from four short ones (¥178 each). It covers all
            9 Tokyo Metro and all 4 Toei Subway lines, but not JR, private railways or buses.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} on the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener">official Tokyo Metro Tokyo Subway Ticket page</a>, the{" "}
            <a href={PRICE_NOTICE} target="_blank" rel="noopener">Tokyo Metro / Toei price-change notice of 30 January 2026</a> and{" "}
            <a href={OFFICIAL_FARES} target="_blank" rel="noopener">Tokyo Metro&apos;s fare table</a>.
          </p>
          <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta} style={{ marginTop: "0.75rem" }}>
            Check Tokyo Subway Ticket dates on Klook →
          </KlookLink>
        </section>

        {/* Disclosure */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>24 hours</p>
                <p className={styles.verdictStatValue}>¥1,000 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>72 hours</p>
                <p className={styles.verdictStatValue}>¥2,000 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Break-even</p>
                <p className={styles.verdictStatValue}>3–4 rides/day on 72h</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Covers JR?</p>
                <p className={styles.verdictStatValue}>No</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the 72-hour ticket at ¥2,000 works out to about ¥667 a day, which four
              short Metro rides already beat — that tier is usually worth it. The 24-hour at ¥1,000 needs five or
              six rides in one window, which is a busier day than most people have. The clock starts at first use,
              not at purchase. Either way the pass excludes
              JR, so the Yamanote Line is not included. Prices and fares checked on {CHECKED}.
            </p>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check the Tokyo Subway Ticket on Klook →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much is the Tokyo Subway Ticket?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ¥1,000 for 24 hours, ¥1,500 for 48 hours and ¥2,000 for 72 hours for adults, with children paying
            half. The pass covers <strong>all Tokyo Metro and all Toei Subway lines</strong>, which matters because
            the two are separate companies with separate fares.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child", "Cost per day", "Before 14 Mar 2026", "Lines", "Where to buy"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} style={{ fontSize: "0.9rem" }}>
                      <strong>Not sure? Take the 72-hour ticket:</strong> ¥2,000 is about ¥667 a day, which four short
                      Metro rides a day already beat. The 24-hour only pays on a day of five or six rides.
                    </td>
                  </tr>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.perDay}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.before}</td>
                      <td style={{ fontSize: "0.88rem" }}>All Tokyo Metro + Toei Subway (no JR)</td>
                      <td style={{ fontSize: "0.88rem" }}>Narita / Haneda counters, Metro stations, BicCamera; online (official or Klook)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Adult and child prices from the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener">official Tokyo Metro Tokyo Subway Ticket page</a>; the
            pre-March prices from the{" "}
            <a href={PRICE_NOTICE} target="_blank" rel="noopener">Tokyo Metro / Toei notice of 30 January 2026</a>,
            which set the new prices from 14 March 2026. The cost-per-day column is simple division, not an
            official figure.
          </p>
          <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta} style={{ marginTop: "0.75rem" }}>
            Check Tokyo Subway Ticket prices for your dates on Klook →
          </KlookLink>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            What is the child price, and who counts as a child?
          </h3>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Fare band", "Age", "What they pay"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ageRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.ages}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Age bands from Tokyo Metro&apos;s Fares According to Age page, checked {CHECKED}. A six-year-old who
            has not started elementary school still counts as a toddler.
          </p>
        </section>

        {/* 72-hour (23 Nov 2026) */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>72 hours</span>
          <h2 className={styles.sectionTitle}>How much is the 72-hour Tokyo Subway Ticket?</h2>
          <p className={styles.bodyText}>
            <strong>¥2,000 for adults and ¥1,000 for children</strong>, up from ¥1,500 and ¥750 before 14 March
            2026. That is about ¥667 a day across three days, against ¥1,000 for a single 24-hour ticket, which
            makes it the cheapest per day of the three lengths.
          </p>
          <p className={styles.bodyText}>
            The 72 hours run from the first ticket gate you pass, not from purchase, so a ticket first used at 14:00
            on a Monday is valid until 14:00 on Thursday. Tokyo Metro&apos;s Japanese page caps the number of tickets
            sold at the number of days of your stay, and a passport is checked when you buy one in Japan. Prices from the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener">official Tokyo Subway Ticket page</a>, checked{" "}
            {CHECKED}.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Tokyo Subway Ticket worth it?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes on the 72-hour ticket for most subway-based trips, and only on a busy day for the 24-hour one.
            The table counts how many single IC-card rides it takes to cost more than the pass.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass (adult)", "Rides at ¥178 (1–6 km)", "Rides at ¥209 (7–11 km)", "Pace needed"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakEvenRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.short}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.mid}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Pass prices and Tokyo Metro IC fares read off tokyometro.jp on {CHECKED}. Ride counts are the pass
            price divided by one fare, rounded up. Toei Subway sets its own fares, which are not used here.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            How many rides a day make the Tokyo Subway Ticket cheaper?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Three on longer rides, four on short ones. The table multiplies a day&apos;s rides by the adult IC fare
            for each distance band and sets the total against the 72-hour ticket&apos;s ¥667 a day and the 24-hour
            ticket&apos;s ¥1,000.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Rides a day", "At ¥178 (1–6 km)", "At ¥209 (7–11 km)", "At ¥252 (12–19 km)", "Cheaper option"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} style={{ fontSize: "0.9rem" }}>
                      <strong>Break-even on the 72-hour ticket: 3 rides a day of 12 km+, or 4 short rides. On the 24-hour ticket: 4–6 rides.</strong>
                    </td>
                  </tr>
                  {perDayRows.map((row) => (
                    <tr key={row.rides}>
                      <td className={styles.tdProvider}>{row.rides}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.short}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.mid}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.long}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Fares from Tokyo Metro&apos;s{" "}
            <a href={OFFICIAL_FARES} target="_blank" rel="noopener">regular ticket fare page</a> (1–6 km ¥178,
            7–11 km ¥209, 12–19 km ¥252 on an IC card); pass prices from the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener">Tokyo Subway Ticket page</a>. Totals are simple
            multiplication.
          </p>
          <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta} style={{ marginTop: "0.75rem" }}>
            Book the Tokyo Subway Ticket on Klook →
          </KlookLink>

          <KlookTripPrep
            label="Book on the same order"
            heading="What to Book With the Tokyo Subway Ticket"
            headingLevel={3}
            intro="The pass covers the subway and nothing else. The airport train, a guided day out and mobile data for the QR version are the three things it leaves open; the day tour sells by date, so check availability and the cancellation terms on each listing before you fly."
            items={tokyoSubwayTicketSameDayPrep}
          />

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            What does a single subway ride cost instead?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            These are Tokyo Metro&apos;s published single fares by distance band. The IC-card column is what a
            Suica or Pasmo charges, marginally less than a paper ticket at every band.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Distance", "Adult IC card", "Adult paper ticket", "Child IC card"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td className={styles.tdPrice}>{row.ic}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.paper}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Most central-Tokyo subway hops fall in the first two bands, so call it ¥178–¥209 a ride. The ¥2,000
            72-hour ticket, at about ¥667 a day, is beaten by four short rides a day — a normal pace once you are
            changing lines a couple of times per outing. The cheaper Tokyo Metro 24-hour Ticket (¥700) stops at
            the Metro network, so it only competes on days with no Toei rides.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares read off Tokyo Metro&apos;s fare table on {CHECKED}; adult fares include the ¥10 barrier-free fee.
          </p>
          <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta} style={{ marginTop: "1rem" }}>
            Check Tokyo Subway Ticket dates on Klook →
          </KlookLink>
        </section>

        {/* Comparison (16 Nov 2026) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Tokyo Subway Ticket vs Suica vs JR TOKYO Wide Pass: which should you buy?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For days inside Tokyo on the subway, the Tokyo Subway Ticket: ¥2,000 covers three days of Metro and
            Toei, while Suica or PASMO wins on days of two or three rides or days built around the JR Yamanote Line.
            The ¥16,000 JR TOKYO Wide Pass is a different tool, for JR day trips such as Nikko or Karuizawa, and it
            does not cover Tokyo Metro or Toei at all.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Adult price", "Lines", "Valid for", "Who can buy", "Where to buy"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} style={{ fontSize: "0.9rem" }}>
                      <strong>Verdict:</strong> Metro + Toei for 2–3 days → Tokyo Subway Ticket; one Metro-only day →
                      Tokyo Metro 24-hour Ticket; JR-heavy days or few rides → Suica / PASMO; two or more JR day
                      trips in 3 days → JR TOKYO Wide Pass.
                    </td>
                  </tr>
                  {compareRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider}>{row.name}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.lines}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.validity}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Sources (Tokyo Metro):{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener">Tokyo Subway Ticket</a>,{" "}
            <a href={OFFICIAL_1DAY} target="_blank" rel="noopener">Tokyo Metro 24-hour Ticket and Common One-day Ticket</a>,{" "}
            <a href={OFFICIAL_FARES} target="_blank" rel="noopener">single fares</a>; JR East:{" "}
            <a href={JR_WIDE} target="_blank" rel="noopener">JR TOKYO Wide Pass</a>. The Common One-day Ticket was ¥900
            until 13 March 2026. How Suica and PASMO work for visitors is in our{" "}
            <Link href="/guides/transport/ic-cards-japan">Japan IC card</Link> guide, and the JR pass&apos;s
            break-even is in our <Link href="/guides/transport/tokyo-wide-pass">JR TOKYO Wide Pass guide</Link>.
          </p>
        </section>

        {/* Itinerary length (23 Nov 2026) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By trip length</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Subway Ticket for a 2, 3, 4, 5 or 7-day Tokyo itinerary?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Match the ticket to your subway days, not to the whole trip: 48 hours for two city days, 72 hours for
            three or four, and 72 hours plus an IC card once day trips out of Tokyo enter the plan, because the pass
            stops at the subway network and its clock keeps running on the days you are away.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip length", "Ticket", "Why", "Day-by-day plan"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{ fontSize: "0.9rem" }}>
                      <strong>Rule of thumb:</strong> 2 days → 48-hour; 3–4 days → 72-hour; 5+ days with day trips →
                      72-hour (or 24-hour tickets) for the city days and an IC card for the rest.
                    </td>
                  </tr>
                  {tripLengthRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.days}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        <Link href={row.href}>{row.label}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Prices and the first-gate clock from the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener">official Tokyo Subway Ticket page</a>; the day plans are
            this site&apos;s itineraries.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The <Link href="/guides/attractions/tokyo-2-day-itinerary">2-day Tokyo itinerary</Link> is routed on one
            48-hour ticket, and the <Link href="/guides/attractions/tokyo-3-day-itinerary">3-day plan</Link> on one
            72-hour ticket. The <Link href="/guides/attractions/tokyo-4-day-itinerary">4-day itinerary</Link> starts
            the 72 hours on Day 1 so they reach the Day 4 morning; the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5-day itinerary</Link> keeps the pass for the city
            days, and the <Link href="/guides/attractions/tokyo-7-day-itinerary">7-day itinerary</Link> uses 24-hour
            tickets on its heavy subway days because the day trips sit between them.
          </p>
        </section>

        {/* Where to buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where to buy the Tokyo Subway Ticket: airport, BicCamera or a Klook voucher?</h2>
          <p className={styles.bodyText}>
            At the Narita or Haneda arrival counters, at Tokyo Metro pass offices and tourist information desks, at
            12 BicCamera stores, or online before you fly. Tokyo Metro&apos;s sales list checks your passport when
            you buy in Japan, and the official page online sells a standard ticket and a QR version that can be sent
            to several phones.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "Sales points on Tokyo Metro's list"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2} style={{ fontSize: "0.9rem" }}>
                      <strong>Simplest:</strong> buy online before you fly, or at the arrivals counter at Narita or
                      Haneda with your passport.
                    </td>
                  </tr>
                  {salesRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} on Tokyo Metro&apos;s{" "}
            <a href={SALES_LIST} target="_blank" rel="noopener">sales-location list (PDF)</a> and the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener">Tokyo Subway Ticket page</a>. Opening hours differ by
            counter; the list gives them for the station desks.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Since 25 March 2026 the QR version can be used on Tokyo Metro and Toei Subway lines directly, so
            purchase and riding happen on one phone. Through Klook, the listing for your date says whether you ride
            on a QR code or exchange a voucher for a ticket, and where. Tokyo Metro&apos;s list also notes that
            showing the Tokyo Subway Ticket at BicCamera and Sofmap gets an extra discount of up to 7% on tax-free
            household electrical goods, with some products excluded.
          </p>
          <p className={styles.bodyText}>
            Arriving by plane, the pass does not cover the airport leg. Tokyo Metro&apos;s airport page lists
            bundles that add it: the Keisei Skyliner &amp; Tokyo Subway Ticket and the Limousine &amp; Subway Pass
            from Narita, and the Limousine &amp; Subway Pass from Haneda. The{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">Airport Limousine Bus Tokyo guide</Link> has the
            bus half of that bundle — fares and timetable times by route — our{" "}
            <Link href="/guides/transport/skyliner-vs-nex">Skyliner vs N&apos;EX comparison</Link> settles which
            airport train suits your hotel&apos;s station, and the{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link> compares the routes
            into town.
          </p>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Who can buy the Tokyo Subway Ticket?
          </h3>
          <p className={styles.bodyText}>
            Overseas visitors, and Japanese residents who live outside Tokyo, Kanagawa, Saitama, Chiba, Ibaraki,
            Tochigi, Gunma and Yamanashi. When an overseas visitor buys it in Japan, the passport is checked to
            confirm a short-term stay, so carry it to the counter.
          </p>
          <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta} style={{ marginTop: "1rem" }}>
            Book the Tokyo Subway Ticket on Klook →
          </KlookLink>
        </section>

        <KlookTourPicks
          heading="What to Book for the Same Trip"
          intro="Two Tokyo bookings that sell out on popular dates: a full-day trip out of the city, and an evening food walk in Shinjuku. Check the listing for your date."
          tours={[fujiDayTour, shinjukuNightFoodWalkingTour]}
        />

        <BookingEsimCard lead="Riding the subway on a QR ticket? Get mobile data before you land." />

        {/* JR */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What it excludes</span>
          <h2 className={styles.sectionTitle}>Does the Tokyo Subway Ticket cover JR lines?</h2>
          <p className={styles.bodyText}>
            No. It covers Tokyo Metro and Toei Subway only, so JR lines — including the Yamanote Line — and
            private railways are paid separately. In Tokyo that is a large hole: the Yamanote loop that links
            Shibuya, Shinjuku, Shinagawa, Tokyo and Ueno is JR, and so are the Chuo and Sobu lines. The Seibu
            Ikebukuro Line is a private railway too, which matters if you hold{" "}
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets">Harry Potter Studio Tour Tokyo tickets</Link>:
            the Seibu ride from Ikebukuro to Toshimaen is not covered, while the Toei Oedo Line from Shinjuku to the
            same station is.
          </p>
          <p className={styles.bodyText}>
            For a JR-only hop, tap a Suica or Pasmo and pay the single fare; which to get is in our{" "}
            <Link href="/guides/transport/ic-cards-japan">Suica vs PASMO</Link> comparison. Many JR stops also have
            a subway station a short walk away, so check the subway route first in a map app before paying for the
            JR leg. If your days are built around the loop rather than the subway,{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link> explains how JR, Metro
            and Toei divide up the city.
          </p>
        </section>

        {/* Validity */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Validity</span>
          <h2 className={styles.sectionTitle}>Does the 24-hour ticket start when I buy it or when I first use it?</h2>
          <p className={styles.bodyText}>
            When you first use it. The official page counts 24, 48 or 72 hours from the travel starting time, not
            from purchase and not by calendar day, so a 24-hour ticket first used at 15:00 runs until 15:00 the next
            day.
          </p>
          <p className={styles.bodyText}>
            That is why the 72-hour ticket fits a three-night, four-day trip: start it on your first subway ride
            after landing at, say, 14:00, and it runs until 14:00 on day four, covering the last morning too. Our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3-day itinerary</Link> shows how
            three full days in the city fit together; on the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5-day itinerary</Link>, cover the three busiest
            subway days with the pass and pay by IC card on the rest. For what to fill the days with, see{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link>.
          </p>
        </section>

        {/* Who for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which tier</span>
          <h2 className={styles.sectionTitle}>Which version should you buy: 24, 48 or 72 hours?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do I decide which ticket to buy?</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            For the wider picture — how Metro, Toei and JR divide up the city, and where an IC card beats any
            pass — see <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link> and our{" "}
            <Link href="/guides/transport/ic-cards-japan">guide to Japanese IC cards</Link>. If you are arriving
            at Narita or Haneda, <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfers</Link>{" "}
            covers the routes into town, several of which are bundled with this pass.
          </p>
        </section>

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

        {/* More questions — outside the FAQPage, which carries the five above */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>More questions</span>
          <h2 className={styles.sectionTitle}>More Tokyo Subway Ticket Questions</h2>
          {moreQuestions.map((item) => (
            <div key={item.q}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.25rem", marginBottom: "0.4rem" }}>
                {item.q}
              </h3>
              <p className={styles.bodyText}>{item.a}</p>
            </div>
          ))}
        </section>

        <KlookTourPicks
          heading="Bundles Built Around the Same Pass"
          intro="Klook sells the pass on its own and packaged with an airport transfer or an observation deck. If you were going to buy both anyway, the combos save a checkout."
          tours={[subwayCityViewCombo, naritaBusSubwayCombo, tokyoSightseeingBusTour]}
        />
        <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.88rem" }}>
          Pass or bus? A guided half-day costs more than three days of this ticket but needs no route planning — our{" "}
          <Link href="/guides/attractions/tokyo-sightseeing-bus-tour" style={{ color: "var(--red)", fontWeight: 600 }}>
            Tokyo sightseeing bus tour guide
          </Link>{" "}
          compares Hato Bus, the Sky Hop Bus and the subway on cost and freedom.
        </p>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 15 Nov 2026: the guided alternative to the subway for a first half-day. */}
            <Link href="/guides/attractions/tokyo-sightseeing-bus-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Bus Tours 2026: Hop-On Hop-Off vs Hato Bus (Prices)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 9 Nov 2026: two days routed on the 48-hour ticket. */}
            <Link href="/guides/attractions/tokyo-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-limousine-bus" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="12" rx="2" />
                  <path d="M2 11h20" />
                  <circle cx="7" cy="19" r="1.5" />
                  <circle cx="17" cy="19" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airport Limousine Bus Tokyo 2026: Fares, Times &amp; Booking</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-go-kart" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13h2l2-3h8l2 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Go Kart 2026: Street Karting in Japan, Price &amp; IDP</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 4l-9 9 2 2 9-9z" />
                  <path d="M5 19l2-6 4 4-6 2z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Warner Bros. Studio Tour Tokyo Tickets (2026): Prices &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three subway days, ¥2,000</h2>
            <p className={styles.ctaBannerDesc}>
              If your Tokyo days run on the Metro and Toei lines rather than the Yamanote loop, the 72-hour
              ticket is the tier that pays for itself. Klook checks out in English on a foreign card.
            </p>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              View the Tokyo Subway Ticket on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
