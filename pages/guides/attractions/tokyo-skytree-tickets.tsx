import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import { GygCompareButton } from "../../../components/GygCompare";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { hreflangLinks } from "../../../components/Hreflang";
import { gygTokyoSkytree } from "../../../lib/gyg-links";
import {
  skytreeTicket,
  skytreeAquariumCombo,
  fujiHakoneDayTour,
  tokyoSightseeingBusTour,
  skytreeTripPrep,
  skytreeSameDayCards,
} from "../../../lib/klook-links";

// P01 (14 Nov 2026): the subway ticket moved up into the same-day cards under the main CTA,
// so the Around-the-tower block drops it rather than list it twice.
const aroundTowerItems = skytreeTripPrep.filter((item) => !skytreeSameDayCards.some((c) => c.url === item.url));
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// Prices, tiers and hours below were read off tokyo-skytree.jp on 19 Oct 2026 and
// re-read on 10 Nov 2026 (prices unchanged; hours, cancellation and access added). The
// Floor 350 adult and child figures and that date are owned by lib/attraction-prices.ts,
// which also feeds /guides/attractions/japan-attraction-ticket-prices.
const P = PRICES.tokyoSkytree;
const CHECKED = checkedLabel(P.checked);

// R02 (19 Nov 2026): prices re-read on en.tokyo-skytree.jp/ticket/ and www.tokyo-skytree.jp/ticket/
// (unchanged: from ¥1,800 / ¥900, combo from ¥3,000 / ¥1,500, Tembo Galleria add-on ¥1,400 / ¥700,
// +¥500 per ticket at the 4F counter and machines). Neither page publishes a weekday / weekend
// table — both say the price for your date is shown on the web booking site — so the weekday
// and weekend columns below carry the same "from" figure and say so. Hours and sunset for
// 19 Nov 2026 from en.tokyo-skytree.jp/open-hours/day_hours/ (10:00–22:00, last 21:00, sunset
// 16:31). Tokyo Tower from tokyotower.co.jp/fee/ the same day.
const SKYTREE_TICKET_URL = "https://en.tokyo-skytree.jp/ticket/";
const SKYTREE_HOURS_URL = "https://en.tokyo-skytree.jp/open-hours/day_hours/";
const TOKYO_TOWER_FEE_URL = "https://www.tokyotower.co.jp/fee/";
const SHIBUYA_SKY_CHECKED = checkedLabel(PRICES.shibuyaSky.checked);

const priceRows = [
  {
    ticket: "Bottom line: combo (350 m + 450 m) online, adult",
    weekday: "from ¥3,000",
    weekend: "from ¥3,000",
    sameDay: "Your date's price + ¥500",
  },
  { ticket: "Tembo Deck (350 m) — adult (15+)", weekday: P.adult, weekend: P.adult, sameDay: "Your date's price + ¥500" },
  { ticket: "Tembo Deck (350 m) — child (6–14)", weekday: P.child, weekend: P.child, sameDay: "Your date's price + ¥500" },
  { ticket: "Combo, 350 m + 450 m — child (6–14)", weekday: "from ¥1,500", weekend: "from ¥1,500", sameDay: "Your date's price + ¥500" },
  { ticket: "Tembo Galleria (450 m) added on site — adult", weekday: "Not sold on its own", weekend: "Not sold on its own", sameDay: "¥1,400 (no fee)" },
  { ticket: "Tembo Galleria (450 m) added on site — child", weekday: "Not sold on its own", weekend: "Not sold on its own", sameDay: "¥700 (no fee)" },
  { ticket: "Age 5 and under", weekday: "Free", weekend: "Free", sameDay: "Free" },
];

const floorRows = [
  { item: "Bottom line", deck: "Enough for the view", galleria: "Worth it if height is the point; buy it in the combo" },
  { item: "Height", deck: "Floors 340, 345 and 350", galleria: "Floors 445 and 450; highest point 451.2 m (Sorakara Point)" },
  { item: "How you get in", deck: "Included in every ticket", galleria: "Tembo Shuttle from Floor 350; needs a Tembo Deck ticket first" },
  { item: "Adult price", deck: "from ¥1,800", galleria: "+¥1,200 in the online combo (from ¥3,000), or +¥1,400 added on the day" },
  { item: "Crowds and sell-outs", deck: "On-site times depend on the day; there may be a queue", galleria: "On-day add-on sale can be paused for capacity; the combo holds your entry" },
  { item: "Fee on the day", deck: "+¥500 per ticket at the counter and machines", galleria: "No fee on the add-on" },
];

const towerRows = [
  {
    deck: "Bottom line",
    price: "Skytree for height, Shibuya Sky for the open-air sunset, Tokyo Tower for the cheapest and latest",
    hours: "",
    sunset: "",
  },
  {
    deck: "Tokyo Skytree (350 m / 450 m)",
    price: "from ¥1,800 (350 m); from ¥3,000 (350 m + 450 m); +¥500 on the day",
    hours: "10:00–22:00, last admission 21:00 (19 Nov 2026; varies by date)",
    sunset: "Indoors behind glass; sunset 16:31 on 19 Nov 2026",
  },
  {
    deck: "SHIBUYA SKY (229 m rooftop)",
    price: `${PRICES.shibuyaSky.adult} online (before / from 15:00)`,
    hours: "10:00–22:30, last entry 21:20",
    sunset: "Open-air; sunset slots fall in the higher band",
  },
  {
    deck: "Tokyo Tower (150 m / 250 m)",
    price: "¥1,500 Main Deck; Top Deck Tour ¥3,300 web / ¥3,500 counter",
    hours: "Main Deck 9:00–23:00, last entry 22:30",
    sunset: "Indoor decks; open latest of the three",
  },
];

// Hours, change and cancellation rules and access, read off en.tokyo-skytree.jp
// (/, /open-hours/, /ticket/cancel/, /ticket/web-purchase/, /ticket/congestion/,
// /access/public-transport/, /floor/tembogalleria/) on 10 Nov 2026.
const visitRows = [
  { item: "Opening hours (10 Nov 2026)", detail: "10:00–22:00, last admission 21:00. Hours are set per date and \"may change without prior notice\"; last admission is always one hour before closing." },
  { item: "Changing the date or time", detail: "Not possible. Cancel the ticket and buy a new one; the same applies to switching between the combo and the Tembo Deck ticket." },
  { item: "Cancellation fee (official online tickets)", detail: "0% up to 31 days before the visit, 20% from 30 days before until the entry time, 100% after it. No fee within 59 minutes of purchase." },
  { item: "Buying on the day", detail: "4th-floor counter and ticket machines, +¥500 per ticket. Availability of times \"depends on the day\" and there may be a queue." },
  { item: "Tembo Galleria (450 m)", detail: "445–450 m, highest point 451.2 m (Sorakara Point). Reached by the Tembo Shuttle from Floor 350; on-day add-on sale may be suspended for capacity." },
  { item: "Quieter times", detail: "Weekday afternoons, first thing in the morning, and the late hours before closing, per the official crowd forecast page." },
  { item: "Nearest stations", detail: "Tokyo Skytree Station (Tobu Skytree Line) and Oshiage (Skytree-mae) Station (Hanzomon Line and others). About a 5-minute ride from Asakusa; about 20 minutes from Tokyo Station." },
];

const whoFor = [
  {
    title: "Floor 350 only is enough if…",
    desc: "You want the view and not the upsell. Floor 350 is the main three-storey observation deck and it already looks out over the whole Kanto plain. At from ¥1,800 for an adult it is the cheapest of Tokyo's major paid decks per metre of height.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h-6l3-7z" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "Add Floor 450 if…",
    desc: "Height is the point of the trip. Floor 450 is the Tembo Galleria, a sloping glass skywalk that spirals up to the tower's highest accessible point. The combo is from ¥3,000 online; added on the day it is ¥1,400 on top of a Floor 350 ticket.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "Go late if…",
    desc: "You would rather have the night panorama than the horizon. On the date checked, the decks ran to 22:00 with last admission at 21:00, and the late slots are the ones still showing availability when the daytime ones have gone.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide Floor 350 or the combo before you book",
    desc: "Floor 450 is cheaper as part of the online combo (from ¥3,000 adult) than bought on the day on top of a Floor 350 ticket (¥1,400 extra). If there is any chance you will want the skywalk, buy the combo up front.",
  },
  {
    title: "Book a date-specified ticket online",
    desc: `The official site sells date- and time-specified tickets from the "from" prices above, and the figure for your actual date can be higher. Buying on the day at the 4th-floor counter or the ticket machines adds a ¥500 service fee per ticket — the single clearest reason to book ahead. Checked ${CHECKED}.`,
  },
  {
    title: "Use a reseller if your card is issued abroad",
    desc: "Klook sells the same timed admission with an English checkout and an e-ticket, which avoids the card and language friction several visitors hit on Japanese attraction sites. The listing also carries the Floor 450 combo.",
  },
  {
    title: "Check the hours for your date, not the general ones",
    desc: `Skytree publishes a per-date calendar and says plainly that "opening hours may change without prior notice", with last admission one hour before closing. On the date checked the decks ran 10:00–22:00 with last admission at 21:00.`,
  },
];

// The five questions in FAQPage (task-jtk-20261119-R02). The older answers stay on the page
// under "More questions" but are not in the structured data.
const faqItems = [
  {
    q: "How much are Tokyo Skytree tickets?",
    a: `Tokyo Skytree tickets cost from ¥1,800 for an adult (15+) and from ¥900 for a child aged 6–14 for the Tembo Deck (350 m), and from ¥3,000 / ¥1,500 for the combo with the Tembo Galleria (450 m), booked online with a date and time. Buying on the day at the tower adds ¥500 per ticket. Children aged 5 and under are free. These are "from" prices: the official site publishes no separate weekday and weekend table, and the price for your date shows at checkout. Checked on the official site on ${CHECKED}.`,
  },
  {
    q: "Is the 450m Tembo Galleria worth it?",
    a: `Worth it if height itself is why you are going up: it adds a sloping glass skywalk at 445–450 m, with the highest point at 451.2 m, for ¥1,200 more than the Tembo Deck alone in the online combo (from ¥3,000 against from ¥1,800 for an adult). If the view is the point, the 350 m deck already covers it. If you are unsure, buy the combo: adding the 450 m on the day costs ¥1,400 and the official site says that sale can be paused for capacity. Checked ${CHECKED}.`,
  },
  {
    q: "Should I book Tokyo Skytree tickets in advance?",
    a: `Yes. Buying on the day at the 4th-floor counter or the ticket machines adds a ¥500 service fee per ticket — ¥2,000 for a family of four — and the official site says the times available on the day depend on the day. A date- and time-specified ticket booked online skips both the fee and the counter queue. Note the change rule: official tickets cannot be changed, only cancelled, free up to 31 days before the visit and at 20% from 30 days before. Checked ${CHECKED}.`,
  },
  {
    q: "What time is best to visit Tokyo Skytree?",
    a: `For a quieter deck, a weekday afternoon or the first slot of the morning; for the night view, the hour or two before closing — the three windows the official crowd forecast page points to. On ${CHECKED} the decks were open 10:00–22:00 with last admission at 21:00 and sunset was at 16:31, so a 16:00 slot catches the light change. Hours are set per date, so check the calendar for yours.`,
  },
  {
    q: "Tokyo Skytree or Shibuya Sky?",
    a: `Skytree for height and reach — 350 m and 450 m decks indoors behind glass, from ¥1,800 for an adult. SHIBUYA SKY for the open-air rooftop 229 m above the Scramble Crossing at sunset, at ${PRICES.shibuyaSky.adult} online depending on entry time. If you are picking one for a first visit with clear weather, Skytree gives the wider panorama; for the photo everyone recognises, Shibuya Sky. Skytree prices checked ${CHECKED}; Shibuya Sky ${SHIBUYA_SKY_CHECKED}.`,
  },
];

const moreQuestions = [
  {
    q: "What is the difference between Floor 350 and Floor 450?",
    a: "Floor 350 is the Tembo Deck, the main three-storey observation level and the one every ticket includes. Floor 450 is the Tembo Galleria, a sloping glass-walled skywalk that spirals up to the tower's highest accessible point. Floor 450 cannot be visited on its own: you need a Floor 350 ticket first, either as part of an online combo or by adding it on site for ¥1,400 (adult) at the ticket machines.",
  },
  {
    q: "Can I buy the Floor 450 ticket online?",
    a: `Not as a standalone ticket. The official site sells Floor 450 only as part of the combo ticket; if you arrive with a Floor 350 ticket and change your mind, you add Floor 450 at the on-site ticket machines for ¥1,400 (adult) or ¥700 (child 6–14). Buying the combo online is the cheaper route — from ¥3,000 for an adult against ¥1,800 plus ¥1,400 bought in two steps. Checked ${CHECKED}.`,
  },
  {
    q: "What are Tokyo Skytree's opening hours?",
    a: `Skytree runs a per-date calendar rather than one fixed timetable, and the official site notes that "opening hours may change without prior notice" and that the last admission is one hour before closing. On the date checked, the observation decks were open 10:00–22:00 with last admission at 21:00. Check the calendar for your own date before you build an evening around it. Checked ${CHECKED}.`,
  },
  {
    q: "Can you see Mt. Fuji from Tokyo Skytree?",
    a: "On a clear day, yes — and Skytree has the best odds of any deck in the city thanks to its height. Visibility is entirely weather-dependent, and tends to be better in the cooler, drier months and earlier in the day. There is no guarantee on any given date, which is worth remembering before you pay the combo price specifically for the Fuji view.",
  },
  {
    q: "How do I get to Tokyo Skytree?",
    a: "The tower sits above Tokyo Skytree Station on the Tobu Skytree Line and Oshiage Station, which is served by the Tokyo Metro Hanzomon Line, the Toei Asakusa Line and the Keisei Oshiage Line. Oshiage is covered by the Tokyo Subway Ticket, so if you are already carrying that pass the trip there costs nothing extra. Asakusa is two stops away on the Asakusa Line, which makes the two easy to pair in one afternoon.",
  },
  {
    q: "Can I change the date or time of a Tokyo Skytree ticket?",
    a: `No. The official site says purchased admission tickets cannot be changed, so a new date, time or ticket type means cancelling and buying again. For tickets bought on the official online shop, cancelling is free up to 31 days before the visit, costs 20% from 30 days before until the entry time, and is not possible after it; there is no fee within 59 minutes of purchase. Tickets bought through a travel agency or reseller follow that seller's own terms. Checked ${CHECKED}.`,
  },
  {
    q: "What age counts as a child for Tokyo Skytree tickets?",
    a: `Child prices apply from age 6 to 14 — junior high school students and younger. From 15, which includes senior high school students, the adult price applies. Children aged 5 and under enter free. Checked ${CHECKED}.`,
  },
  {
    q: "Can the Tembo Galleria (450 m) sell out on the day?",
    a: `It can be paused. The Tembo Galleria add-on is sold at ticket machines inside the Tembo Deck on the day, and the official site warns that it may have to suspend that sale because of capacity limits. A combo ticket bought online holds the 450 m entry with your time slot instead. Checked ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-skytree-tickets") } });

const TITLE = "Tokyo Skytree Tickets 2026: Prices, 350 vs 450 & Booking";
const DESC =
  "Tokyo Skytree tickets price, checked 19 Nov 2026: Tembo Deck (350 m) from ¥1,800, 350 + 450 m combo from ¥3,000 online, +¥500 per ticket on the day.";

export default function TokyoSkytreeTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-skytree-tickets" />
        {hreflangLinks("/guides/attractions/tokyo-skytree-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-skytree-tickets" />
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
              route: "/guides/attractions/tokyo-skytree-tickets",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Skytree Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-skytree-tickets" },
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
          <span className={styles.breadCurrent}>Tokyo Skytree Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Skytree Tickets 2026: <br />Prices, 350 vs 450 Deck and How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo Skytree tickets cost from ¥1,800 for an adult for the Tembo Deck (350 m) and from ¥3,000 for
            the combo with the Tembo Galleria (450 m), on the official site checked {CHECKED}; the price is set
            per date, so yours can be higher. A date- and time-specified ticket booked online skips the ¥500
            per-ticket fee charged at the on-site counter and machines, and on-site availability depends on the
            day — so book the slot you want, especially an evening one, before you go.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "350 m vs 450 m"].map((t) => (
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

        {/* R02: the answer in the first body paragraph, ahead of the boxes */}
        <p className={styles.bodyText}>
          Tokyo Skytree tickets cost from ¥1,800 for an adult for the Tembo Deck (350 m) and from ¥3,000 for the
          Tembo Deck + Tembo Galleria (450 m) combo, booked online with a date and time on the official site
          (checked {CHECKED}); a child aged 6–14 pays from ¥900 or from ¥1,500. Buying on the day at the tower
          costs your date&apos;s price plus ¥500 per ticket, and the official site publishes no separate weekday
          and weekend table — the price for your date shows at checkout. Buy the combo online if you might want
          the 450 m skywalk: adding it on the day costs ¥1,400 more and that sale can be paused for capacity.
        </p>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Floor 350 (adult)</p>
                <p className={styles.verdictStatValue}>from ¥1,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Combo 350 + 450</p>
                <p className={styles.verdictStatValue}>from ¥3,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Buying on the day</p>
                <p className={styles.verdictStatValue}>+¥500 per ticket</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Under 5s</p>
                <p className={styles.verdictStatValue}>Free</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book a date-specified ticket online. Skytree charges a ¥500 service fee
              per ticket at the same-day counter, so advance booking is cheaper by a published amount rather
              than by luck. If you might want the Floor 450 skywalk, buy the combo up front — adding it on site
              afterwards costs ¥1,400 more. Prices read off the official site on {CHECKED}. Against Shibuya Sky,
              teamLab and Disney — which of them sell out and which sell at the gate — see our{" "}
              <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
                Japan attraction ticket prices
              </Link>{" "}
              table.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check Tokyo Skytree tickets on Klook →
              </KlookLink>
              <GygCompareButton slug="tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>

        {/* P01: the 6.5% / 5% bookings of the same day, directly under the 2% ticket CTA. */}
        <KlookSameDayCards
          heading="Book These for the Same Day as Your Skytree Slot"
          cards={skytreeSameDayCards}
          footnote={
            <>
              Comparing kimono shops first? The{" "}
              <Link href="/guides/attractions/asakusa-kimono-rental" style={{ color: "var(--text)", fontWeight: 600 }}>
                Asakusa kimono rental guide
              </Link>{" "}
              sets the shops side by side, and the{" "}
              <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--text)", fontWeight: 600 }}>
                Tokyo Subway Ticket guide
              </Link>{" "}
              covers which pass length fits.
            </>
          }
        />

        <BookingEsimCard />

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Does a Tokyo Skytree Ticket Include?</h2>
          <p className={styles.bodyText}>
            This page covers Skytree tickets, prices and booking; if you are still deciding which tower to climb,
            our guide to the <Link href="/guides/attractions/tokyo-observation-decks">best observation deck in Tokyo</Link>{" "}
            sets Skytree against Shibuya Sky, Tokyo Tower and the free Tocho deck. Tokyo Skytree sells admission
            to two separate levels. <strong>Floor 350</strong> is the Tembo Deck,
            a three-storey observation level and the one included in every ticket. <strong>Floor 450</strong> is
            the Tembo Galleria, a sloping glass-walled skywalk that spirals up to the tower&apos;s highest
            accessible point — and it cannot be visited on its own.
          </p>
          <p className={styles.bodyText}>
            That two-tier structure is where most of the confusion comes from, because the two levels are priced
            differently depending on whether you buy them together online or separately on the day. The section
            below sets both routes side by side.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Are Tokyo Skytree Tickets in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult pays from ¥1,800 for the Tembo Deck (350 m) and from ¥3,000 for the combo that adds the
            Tembo Galleria (450 m); a child aged 6–14 pays from ¥900 or from ¥1,500. Buying at the tower adds ¥500
            per ticket. For how this compares with every other major ticket in Japan, see the{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">Japan attraction ticket prices table</Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Online, weekday", "Online, weekend / holiday", "On the day at the tower"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row, i) => (
                    <tr key={row.ticket} style={i === 0 ? { fontWeight: 700 } : undefined}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.weekday}</td>
                      <td className={styles.tdPrice}>{row.weekend}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sameDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {P.checked} — <a href={SKYTREE_TICKET_URL} target="_blank" rel="noopener">{SKYTREE_TICKET_URL}</a>.
            The official page lists &ldquo;from&rdquo; prices and does not publish a separate weekday and
            weekend table, so both columns carry the same starting figure; the price shown for your date at
            checkout is the one that applies. The ¥500 on-site service fee applies per ticket at the 4th-floor
            counter and the ticket machines; the Tembo Galleria add-on carries no fee.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Is the 450 m Tembo Galleria Worth It Over the 350 m Deck?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Only if height itself is the point: the combo costs ¥1,200 more than the Tembo Deck alone for an adult
            (from ¥3,000 against from ¥1,800) and lifts you from 350 m to a glass ramp running 445–450 m, with the
            highest point at 451.2 m. If you are unsure, buy the combo online — adding 450 m on the day costs
            ¥1,400 and the official site says that sale can be suspended for capacity.
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Tembo Deck (350 m)", "Tembo Galleria (450 m)"].map((h) => (
                      <th key={h || "item"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {floorRows.map((row, i) => (
                    <tr key={row.item} style={i === 0 ? { fontWeight: 700 } : undefined}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.galleria}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginBottom: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {P.checked} — <a href={SKYTREE_TICKET_URL} target="_blank" rel="noopener">{SKYTREE_TICKET_URL}</a>{" "}
            (prices, add-on and capacity note); floor heights from the official Tembo Galleria floor page,
            read 10 Nov 2026.
          </p>
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

        {/* Booking CTA — directly after the price table and the which-ticket choice */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>Picked your ticket?</strong> Klook sells the TOKYO SKYTREE timed admission with the 350 m +
              450 m combo on the same listing, with an English checkout and an e-ticket. Check the listing for
              your date&apos;s price and slots.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check TOKYO SKYTREE tickets on Klook →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* The rest of the afternoon — the Asakusa-side bookings around the ticket above.
            Sits directly after the price table, the ticket choice and the Skytree CTA, because
            that is where a reader has just decided which ticket to buy and has the rest of
            the day still open. */}
        <KlookTripPrep
          label="Around the tower"
          heading="What Else the Oshiage Side of the Day Needs Booked"
          intro="A deck slot takes an hour or two, and the ticket above is the only part of it that has to be timed. These are the bookings the rest of that afternoon runs on — all on the same side of the river as the tower, and all on the same account as the ticket."
          items={aroundTowerItems}
        />

        {/* At the door */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On the day</span>
          <h2 className={styles.sectionTitle}>Can You Buy Tokyo Skytree Tickets at the Door?</h2>
          <p className={styles.bodyText}>
            Yes — at the 4th-floor ticket counter and the ticket machines — but each ticket costs ¥500 more than
            online, the official site says the times available on the day depend on the day, and there may be a
            queue to buy. The Tembo Galleria add-on is sold at machines inside the Tembo Deck, with no fee, and
            its sale can be suspended when the galleria is at capacity.
          </p>
        </section>

        {/* Best time */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>What Is the Best Time to Visit Tokyo Skytree?</h2>
          <p className={styles.bodyText}>
            For a quiet deck, a weekday afternoon or the first slot of the morning; for the night view, the hour
            or two before closing. Those are the three windows the official crowd forecast page singles out, and
            it warns that New Year, Golden Week and spring break run busier. Sunset changes through the year —
            the official day-hours page gave 16:31 on {CHECKED} — so match an evening slot to the sunset time
            for your date. If Skytree is one stop in a short stay, the{" "}
            <Link href="/guides/attractions/tokyo-2-day-itinerary">Tokyo 2-day itinerary</Link> pairs it with
            Asakusa on the same day, and{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link> lists what else
            needs a timed ticket.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", fontSize: "0.8rem", color: "var(--text-muted)", paddingTop: "0.5rem" }}>
                  Official TOKYO SKYTREE site (en.tokyo-skytree.jp: hours, ticket cancellation, crowd forecast,
                  access and floor pages), checked {CHECKED}.
                </caption>
                <thead>
                  <tr>
                    {["Item", "Official detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visitRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Tokyo Skytree vs Shibuya Sky vs Tokyo Tower: Which Ticket?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Skytree is the altitude pick, from ¥1,800 for the 350 m deck. If what you actually want is the
            open-air Scramble Crossing sunset,{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets">Shibuya Sky tickets</Link> are the better buy; if you
            want the cheapest paid deck and the latest entry,{" "}
            <Link href="/guides/attractions/tokyo-tower-tickets">Tokyo Tower tickets</Link> start at ¥1,500. To see
            Skytree from the water instead, a <Link href="/guides/attractions/tokyo-bay-cruise">Tokyo Bay cruise</Link>{" "}
            from Asakusa to Hinode Pier is ¥1,000 on the Tokyo Cruise water bus.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Adult price", "Hours", "Sunset and night"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {towerRows.map((row, i) =>
                    i === 0 ? (
                      <tr key={row.deck} style={{ fontWeight: 700 }}>
                        <td className={styles.tdProvider}>{row.deck}</td>
                        <td colSpan={3} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      </tr>
                    ) : (
                      <tr key={row.deck}>
                        <td className={styles.tdProvider}>{row.deck}</td>
                        <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.sunset}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: Skytree {P.checked} — <a href={SKYTREE_HOURS_URL} target="_blank" rel="noopener">{SKYTREE_HOURS_URL}</a>;
            Tokyo Tower 2026-11-19 — <a href={TOKYO_TOWER_FEE_URL} target="_blank" rel="noopener">{TOKYO_TOWER_FEE_URL}</a>;
            SHIBUYA SKY prices {PRICES.shibuyaSky.checked} —{" "}
            <a href={PRICES.shibuyaSky.sourceUrl} target="_blank" rel="noopener">{PRICES.shibuyaSky.sourceUrl}</a>{" "}
            (hours from gotokyo.org, 14 Nov 2026).
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem" }}>
            Still choosing a tower? The{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">Tokyo observation decks comparison</Link>{" "}
            sets all of them side by side, free decks included — this page stays on buying the Skytree ticket.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Book Tokyo Skytree Tickets?</h2>
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
            Getting there is the easy part: the tower sits on top of Tokyo Skytree Station and Oshiage, and
            Oshiage is a subway stop — so it is covered by the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket</Link> if you are carrying
            one. Our <Link href="/guides/transport/tokyo-transportation">guide to getting around Tokyo</Link>{" "}
            covers how the Metro and Toei networks fit together.
          </p>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Tokyo Skytree Tickets: Common Questions</h2>
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
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginTop: "1.5rem" }}>More questions</h3>
          <div className={styles.faqList}>
            {moreQuestions.map((item, i) => (
              <details key={item.q} className={styles.faqItem}>
                <summary className={styles.faqSummary}>
                  <span>{faqItems.length + i + 1}. {item.q}</span>
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
          heading="Book It With the Rest of the Day"
          intro="A Skytree slot takes an hour or two. These listings sit on the same Klook account as the ticket, so the rest of the day books in the same checkout."
          tours={[skytreeAquariumCombo, tokyoSightseeingBusTour, fujiHakoneDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-bay-cruise" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 18h20l-2 3H4z" />
                  <path d="M4 18V8h16v10" />
                  <path d="M12 8V4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Bay Cruise (2026): Yakatabune vs the Symphony, Times and Prices</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 14h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Best Observation Deck in Tokyo, Shibuya Sky vs Skytree</p>
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
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck &amp; How to Book</p>
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
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
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
            <Link href="/guides/attractions/teamlab-planets-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Price, Hours and How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book before the counter charges you more</h2>
            <p className={styles.ctaBannerDesc}>
              Same-day tickets carry a ¥500 service fee per person. A date-specified ticket booked online skips
              both the fee and the queue — and Klook checks out in English on a foreign card.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={skytreeTicket.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Tokyo Skytree tickets on Klook →
              </KlookLink>
              <GygCompareButton slug="tokyo-skytree-tickets" listing={gygTokyoSkytree} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
