import Head from "next/head";
import Link from "next/link";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { tokyoTowerTicket, tokyoTowerTripPrep } from "../../../lib/klook-links";
import { gygTokyoTower } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// Sources, all re-read on 8 Nov 2026:
// - tokyotower.co.jp/fee/ — Main Deck and Top Deck Tour prices (WEB vs 窓口),
//   hours and last entry, the note that Main Deck last entry can move earlier
//   when crowded, Tokyo Diamond Tour prices and departures, group and
//   disability rates, the set-ticket list. No foreign-visitor or passport
//   discount and no RED° TOKYO TOWER set appear on it.
// - tokyotower.co.jp (home) — 333 m tower, 150 m / 250 m decks, hours.
//   The /en/ address serves the same Japanese content.
// - tokyotower.co.jp/ticket/ — online sellers and set tickets (names only).
// - tdt.tokyotower.co.jp/topdecktour/ and /topdecktour/faq/ — reserved time,
//   first slot 9:00–9:15, last 22:00–22:15, no date/time change, late arrival
//   voids the booking, 100% cancellation fee from two days before, weather
//   cancellation, one entry only, no time limit on the Top Deck (to 22:45),
//   about 5 minutes from the elevator to the Top Deck gate.
// - eco.mtk.nao.ac.jp/koyomi (NAOJ) — Tokyo sunset times, Nov and Dec 2026.
// The Klook listing was confirmed live through the www.klook.com search index;
// no Klook price appears anywhere on this page.
const P = PRICES.tokyoTower;
const CHECKED = checkedLabel("2026-11-08");

const FEE_URL = "https://www.tokyotower.co.jp/fee/";
const TDT_FAQ_URL = "https://tdt.tokyotower.co.jp/topdecktour/faq/";
const NAOJ_URL = "https://eco.mtk.nao.ac.jp/koyomi/dni/2026/s1311.html";

const priceRows = [
  { ticket: "Main Deck (150 m) — adult", advance: P.adult, door: P.adult },
  { ticket: "Main Deck — high school", advance: "¥1,200", door: "¥1,200" },
  { ticket: "Main Deck — elementary / junior high", advance: "¥900", door: "¥900" },
  { ticket: `Main Deck — child aged ${P.childAges.replace(/^ages /, "")}`, advance: P.child, door: P.child },
  { ticket: "Top Deck Tour (150 m + 250 m) — adult", advance: "¥3,300", door: "¥3,500" },
  { ticket: "Top Deck Tour — high school", advance: "¥3,100", door: "¥3,300" },
  { ticket: "Top Deck Tour — elementary / junior high", advance: "¥2,100", door: "¥2,300" },
  { ticket: "Top Deck Tour — child aged 4 and over", advance: "¥1,500", door: "¥1,700" },
  { ticket: "Tokyo Diamond Tour (150 m + 250 m + lounge) — adult", advance: "¥7,000", door: "¥7,000" },
];

const factRows = [
  { item: "Tower height", value: "333 m", source: "tokyotower.co.jp" },
  { item: "Main Deck height", value: "150 m", source: "tokyotower.co.jp/fee/" },
  { item: "Main Deck hours", value: "9:00–23:00, last entry 22:30 (can move earlier when crowded)", source: "tokyotower.co.jp/fee/" },
  { item: "Top Deck height", value: "250 m (tour also stops at the 150 m Main Deck)", source: "tokyotower.co.jp/fee/" },
  { item: "Top Deck Tour hours", value: "9:00–22:45, last entry 22:15", source: "tokyotower.co.jp/fee/" },
  { item: "Top Deck Tour slots", value: "Reserved entry time; first slot 9:00–9:15, last slot 22:00–22:15", source: "Top Deck Tour FAQ" },
  { item: "Time limit on the Top Deck", value: "None; Top Deck viewing ends 22:45", source: "Top Deck Tour FAQ" },
  { item: "Where Top Deck Tour is sold", value: "Online, and as advance sales at the Foot Town 1F ticket counter", source: "Top Deck Tour FAQ" },
  { item: "Change of date or time", value: "Not possible after purchase", source: "Top Deck Tour FAQ" },
  { item: "Late for your slot", value: "Booking void, no refund; Main Deck still allowed", source: "Top Deck Tour FAQ" },
  { item: "Cancellation", value: "100% fee from two days before the visit date", source: "Top Deck Tour FAQ" },
  { item: "Weather", value: "Tour can be cancelled for wind of 20 m/s or more at the Top Deck, snow or inspections; online tickets refunded", source: "Top Deck Tour FAQ" },
  { item: "Re-entry", value: "One entry only", source: "Top Deck Tour FAQ" },
  { item: "Tokyo Diamond Tour", value: "70 guests a day; departures hourly 12:00–18:00", source: "tokyotower.co.jp/fee/" },
];

const sunsetRows = [
  { date: "1 November 2026", sunset: "16:46" },
  { date: "15 November 2026", sunset: "16:35" },
  { date: "30 November 2026", sunset: "16:28" },
  { date: "15 December 2026", sunset: "16:29" },
  { date: "31 December 2026", sunset: "16:37" },
];

const whoFor = [
  {
    title: "Main Deck only is enough if…",
    desc: "You want the landmark and the view without the upsell. The Main Deck sits at 150 metres, costs ¥1,500 for an adult whichever way you buy it, and has no timed slot. It is the cheapest ticket of Tokyo's three big paid towers.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l4 10h-8l4-10z" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <line x1="6" y1="21" x2="18" y2="21" />
      </svg>
    ),
  },
  {
    title: "Add the Top Deck Tour if…",
    desc: "You want the 250-metre level, which is only sold as a tour with a reserved entry time. It is ¥3,300 for an adult booked online against ¥3,500 at the window, and it includes the Main Deck — so it replaces the cheaper ticket rather than adding to it. The official tour page lists a drink and a photo card as part of it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l8-16 8 16" />
        <path d="M7.5 13h9" />
      </svg>
    ),
  },
  {
    title: "Go after dark if…",
    desc: "You would rather see the city lit than the horizon. The Main Deck runs to 23:00 with last admission at 22:30 — later than Shibuya Sky or Skytree — which makes Tokyo Tower the one deck you can still get into after dinner.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const deckRows = [
  {
    deck: "Tokyo Tower",
    height: "150 m Main Deck · 250 m Top Deck (333 m tower)",
    price: "¥1,500 (Main Deck) · ¥3,300 online (Top Deck Tour)",
    highlight: "The 1958 landmark itself, open until 23:00, and the one deck with Skytree in the view",
    area: "Akabanebashi / Kamiyacho / Onarimon",
  },
  {
    deck: "Tokyo Skytree",
    height: "Floor 350 and Floor 450 (634 m tower)",
    price: "from ¥1,800 (Floor 350) · from ¥3,000 combo",
    highlight: "The highest decks in Tokyo, and the only glass skywalk",
    area: "Oshiage / Tokyo Skytree Station",
  },
  {
    deck: "Shibuya Sky",
    height: "~229 m rooftop",
    price: `${PRICES.shibuyaSky.adult} online`,
    highlight: "Open-air rooftop over the Scramble Crossing — the photo, not the altitude",
    area: "Shibuya Station",
  },
  {
    deck: "Tokyo Metropolitan Gov. Building",
    height: "~202 m",
    price: "Free",
    highlight: "No ticket at all — the best-value city panorama in Tokyo",
    area: "Shinjuku",
  },
];

const steps = [
  {
    title: "Decide Main Deck or Top Deck Tour first",
    desc: `They are two different products, not two tiers of one. The Main Deck ticket is ¥1,500 for an adult and admits you whenever you turn up during opening hours. The Top Deck Tour is ¥3,300 online, carries a reserved entry time, and includes the Main Deck in the price. Checked ${CHECKED}.`,
  },
  {
    title: "Book the Top Deck Tour online for a date and time",
    desc: `This is the only place on the ticket list where booking ahead is cheaper: ¥3,300 for an adult online against ¥3,500 bought on site, with the same ¥200 gap on every tier. Pick the slot carefully — the official FAQ states that the date and time cannot be changed after purchase, and that the full price is charged for cancellations from two days before the visit. Checked ${CHECKED}.`,
  },
  {
    title: "Arrive before your slot, and do not leave the Main Deck",
    desc: `At your reserved time you go to the Top Deck gate on the Main Deck; the official FAQ puts the walk from the elevator at about 5 minutes. Arriving late voids the booking with no refund, although the Main Deck is still open to you. Entry is once only, so if you go back down to the ground there is no way back up. Checked ${CHECKED}.`,
  },
  {
    title: "Use a reseller if your card is issued abroad",
    desc: "The official ticket page sends online buyers to Japanese and international sellers. Klook sells Tokyo Tower admission with an English checkout and an e-ticket, and the same listing carries the Top Deck Tour upgrade. A reseller's own change and cancellation terms are shown on the listing — check them for your date before you pay.",
  },
  {
    title: "Pick your station — Akabanebashi is the closest",
    desc: "Tokyo Tower publishes six walking routes: Akabanebashi on the Toei Oedo Line at 5 minutes, Onarimon on the Mita Line at 6, Kamiyacho on the Hibiya Line at 7, Shibakoen on the Mita Line and Daimon on the Asakusa Line at 10 each, and JR Hamamatsucho at 15.",
  },
];

const faqItems = [
  {
    q: "How much are Tokyo Tower tickets?",
    a: `Main Deck admission on the official site is ¥1,500 for an adult, ¥1,200 for a high-school student, ¥900 for elementary and junior-high children and ¥600 for a child aged 4 and over. The Top Deck Tour, which covers both the 150 m and 250 m levels, is ¥3,300 for an adult booked online or ¥3,500 at the window, with child tiers from ¥1,500. Prices read off tokyotower.co.jp on ${CHECKED}.`,
  },
  {
    q: "What is the difference between the Main Deck and the Top Deck?",
    a: `The Main Deck is the 150-metre observation level and the one the standard ticket covers. The Top Deck is the 250-metre level, and it is sold only as the Top Deck Tour — a reserved-time entry that includes the Main Deck as well. You do not buy the two separately: the Top Deck Tour replaces the Main Deck ticket. Checked ${CHECKED}.`,
  },
  {
    q: "Is it cheaper to buy Tokyo Tower tickets in advance?",
    a: `For the Top Deck Tour, yes — ¥3,300 online against ¥3,500 at the window for an adult, a ¥200 saving per person, with the same ¥200 gap on every child tier. For the Main Deck the price is ¥1,500 either way, so booking ahead there saves you the ticket queue rather than money. Checked ${CHECKED}.`,
  },
  {
    q: "What time does Tokyo Tower close?",
    a: `The Main Deck runs 9:00 to 23:00 with last admission at 22:30, and the Top Deck Tour runs 9:00 to 22:45 with last admission at 22:15. The official fee page notes that Main Deck last entry can move earlier when it is crowded, and hours can change for events, so confirm the date you are going. Checked ${CHECKED}.`,
  },
  {
    q: "How do I get to Tokyo Tower?",
    a: "Six routes are published on the official access page. Akabanebashi Station on the Toei Oedo Line is closest at a 5-minute walk, followed by Onarimon on the Toei Mita Line at 6 minutes and Kamiyacho on the Tokyo Metro Hibiya Line at 7. Shibakoen (Mita Line) and Daimon (Asakusa Line) are both about 10 minutes, and JR Hamamatsucho is about 15. All of the subway options are covered by a Tokyo Subway Ticket; JR is not.",
  },
  {
    q: "Tokyo Tower or Tokyo Skytree — which should I pick?",
    a: "Skytree is higher and newer: Floor 350 and Floor 450, from ¥1,800 for an adult, with far-distance views that include Mt. Fuji on a clear day. Tokyo Tower is the landmark, is cheaper at ¥1,500, closes much later, and has one thing Skytree structurally cannot — Skytree in the view. If you want maximum altitude, go to Skytree. If you want the red 333-metre tower that defines the Tokyo skyline, and a late slot, go to Tokyo Tower.",
  },
  {
    q: "Can you see Mt. Fuji from Tokyo Tower?",
    a: "On a clear day it is possible, but the odds are lower than from Skytree simply because the decks are lower — 150 m and 250 m against 350 m and 450 m. Visibility is best in the cooler, drier months and in the early morning, and there is never a guarantee on any given day. Treat Fuji as a bonus rather than the reason to buy the ticket.",
  },
  {
    q: "Is Tokyo Tower worth it compared with the free decks?",
    a: "The Tokyo Metropolitan Government Building in Shinjuku has decks at about 202 metres and charges nothing, so on height-per-yen it wins outright. What it does not give you is the building itself: Tokyo Tower is a 1958 landmark, lit at night, and the visit is as much about standing inside it as about the panorama. At ¥1,500 for the Main Deck that is a reasonable trade — but if your budget is tight, see Tocho for free and spend the money elsewhere.",
  },
  {
    q: "Can I change the date or time of a Top Deck Tour ticket?",
    a: `Not on an official ticket. The Top Deck Tour FAQ states that the date and time cannot be changed after purchase, that cancellations for your own reasons — including bad weather that does not stop the tour — are not accepted, and that the full price is charged from two days before the visit. If the tower itself cancels the tour, for example for wind of 20 m/s or more at the Top Deck, online purchases are refunded. Checked ${CHECKED}.`,
  },
  {
    q: "What happens if I am late for my Top Deck Tour slot?",
    a: `The official FAQ states that the booking becomes invalid and is not refunded, although you can still visit the Main Deck. Slots run from 9:00–9:15 to a last one at 22:00–22:15, and the walk from the elevator to the Top Deck gate is about 5 minutes, so be on the Main Deck before your time starts. Checked ${CHECKED}.`,
  },
  {
    q: "Is there a Tokyo Tower discount for foreign passport holders?",
    a: `The official fee page checked on ${CHECKED} lists no foreign-visitor or passport discount. The discounts it does list are group rates for 20 or more people and a disability rate of about half price for the holder and one companion. "Passport" tickets seen on reseller sites are for RED° TOKYO TOWER, a separate gaming venue in the Foot Town building, not the observation decks; the official Tokyo Tower ticket pages checked do not list it or a set with it.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-tower-tickets") } });

const TITLE = "Tokyo Tower Tickets 2026: Price, Main Deck vs Top Deck";
const DESCRIPTION =
  "Tokyo Tower tickets price: Main Deck (150 m) ¥1,500, Top Deck Tour (250 m) ¥3,300 online. Main Deck vs Top Deck, hours to 23:00, best time, booking rules.";

const linkStyle = { color: "var(--text)", fontWeight: 600 } as const;

export default function TokyoTowerTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-tower-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-tower-tickets" />
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
            __html: articleJsonLd({
              route: "/guides/attractions/tokyo-tower-tickets",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Tower Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-tower-tickets" },
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
          <span className={styles.breadCurrent}>Tokyo Tower Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Tower Tickets 2026:<br />Price, Main Deck vs Top Deck &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo Tower tickets come in two kinds: the Main Deck (150 m) at ¥1,500 for an adult, the same price
            online and at the window, and the Top Deck Tour (250 m, reserved entry time) at ¥3,300 online or
            ¥3,500 at the window (official site, checked {CHECKED}). For the view alone the Main Deck is
            enough; to go to the top for sunset into the night, book the Top Deck Tour online for a date and
            time. Last entry is 22:30 for the Main Deck and 22:15 for the Top Deck Tour.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Open to 23:00"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Main Deck (150 m)</p>
                <p className={styles.verdictStatValue}>¥1,500 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Top Deck Tour (250 m)</p>
                <p className={styles.verdictStatValue}>¥3,300 online / ¥3,500 door</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>9:00–23:00 (last entry 22:30)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Closest station</p>
                <p className={styles.verdictStatValue}>Akabanebashi, 5 min walk</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> if you only want the view, buy the Main Deck ticket — ¥1,500, no
              timed slot, and the price is identical online and at the window. If you want the 250-metre
              level, book the Top Deck Tour online instead: it is ¥200 cheaper per person than the window
              price, it carries a reserved entry time that cannot be changed, and it already includes the
              Main Deck. Prices read off the official site on {CHECKED}.
            </p>
            <KlookLink href={tokyoTowerTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Tokyo Tower tickets on Klook →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What does a Tokyo Tower ticket get you?</h2>
          <p className={styles.bodyText}>
            Tokyo Tower is a 333-metre broadcasting tower in Shiba-koen, finished in 1958 and still the
            shape most people picture when they picture Tokyo. It has two paid levels: the Main Deck at 150
            metres, and the Top Deck at 250 metres, which is sold only as a tour with a reserved entry time.
          </p>
          <p className={styles.bodyText}>
            That split is the whole decision. The Main Deck is an ordinary walk-up admission at a flat
            ¥1,500 for an adult; the Top Deck Tour is more than double that and behaves like a timed ticket.
            Everything below is the official pricing, the hours, the booking rules, and the one case where
            booking in advance actually saves money.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much are Tokyo Tower tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult pays ¥1,500 for the Main Deck and ¥3,300 online or ¥3,500 at the window for the Top Deck
            Tour, which includes the Main Deck. Only the Top Deck Tour is cheaper online.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", textAlign: "left", fontSize: "0.8rem", padding: "0.5rem", color: "var(--text-muted)" }}>
                  Official prices, checked {CHECKED} on tokyotower.co.jp/fee/. The fee page does not split the
                  Tokyo Diamond Tour price by online and window.
                </caption>
                <thead>
                  <tr>
                    {["Ticket", "Online", "At the window"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.advance}</td>
                      <td className={styles.tdPrice}>{row.door}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off{" "}
            <a href={FEE_URL} target="_blank" rel="noopener" style={linkStyle}>tokyotower.co.jp/fee/</a>{" "}
            on {CHECKED} and subject to change — confirm at booking. The Tokyo Diamond Tour is a separate
            premium tour with a lounge, limited to 70 guests a day.
          </p>
        </section>

        {/* Hours, heights, rules */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours and rules</span>
          <h2 className={styles.sectionTitle}>What time does Tokyo Tower close?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Main Deck closes at 23:00 with last entry at 22:30, and the Top Deck Tour closes at 22:45 with
            last entry at 22:15 — both open at 9:00. The official fee page adds that Main Deck last entry can
            move earlier when it is crowded.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", textAlign: "left", fontSize: "0.8rem", padding: "0.5rem", color: "var(--text-muted)" }}>
                  Checked {CHECKED} on tokyotower.co.jp/fee/, the tokyotower.co.jp home page and the official
                  Top Deck Tour FAQ.
                </caption>
                <thead>
                  <tr>
                    {["Item", "Official figure or rule", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Top Deck Tour rules from the{" "}
            <a href={TDT_FAQ_URL} target="_blank" rel="noopener" style={linkStyle}>official Top Deck Tour FAQ</a>
            . The tour and the Tokyo Diamond Tour can be cancelled in bad weather, so check the day before.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Is the Tokyo Tower Top Deck worth it?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            It is worth it if the extra 100 metres matter to you: the Top Deck is at 250 m against the Main
            Deck&apos;s 150 m, for ¥1,800 more online. For the landmark and a city view, the Main Deck alone
            is enough.
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

        {/* Best time */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>What is the best time to visit Tokyo Tower?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For daylight, dusk and the lit city in one visit, arrive a little before sunset — around 16:30 in
            November and December. For the night view alone, the late hours are the advantage: the Main Deck
            admits you until 22:30.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <caption style={{ captionSide: "bottom", textAlign: "left", fontSize: "0.8rem", padding: "0.5rem", color: "var(--text-muted)" }}>
                  Tokyo sunset times from the National Astronomical Observatory of Japan, checked {CHECKED}.
                </caption>
                <thead>
                  <tr>
                    {["Date", "Sunset in Tokyo"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sunsetRows.map((row) => (
                    <tr key={row.date}>
                      <td className={styles.tdProvider}>{row.date}</td>
                      <td className={styles.tdPrice}>{row.sunset}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            If you want the Top Deck at sunset, book a slot that starts before the time in the table — slots
            cannot be changed after purchase. The tower is also part of the evening from below: the{" "}
            <Link href="/guides/attractions/tokyo-illumination-tours" style={linkStyle}>Tokyo winter illumination guide</Link>{" "}
            covers the light-up season around it, and a{" "}
            <Link href="/guides/attractions/tokyo-bay-cruise" style={linkStyle}>Tokyo Bay cruise</Link>{" "}
            shows the tower from the water. Sunset times from the{" "}
            <a href={NAOJ_URL} target="_blank" rel="noopener" style={linkStyle}>NAOJ calendar</a>.
          </p>
        </section>

        {/* How long */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Time needed</span>
          <h2 className={styles.sectionTitle}>How long do you need at Tokyo Tower?</h2>
          <p className={styles.bodyText}>
            The official sources checked do not give a set visit length, and there is no time limit on the
            Top Deck — viewing there runs until 22:45. What the Top Deck Tour FAQ does state is that the walk
            from the elevator to the Top Deck gate takes about 5 minutes and that entry is once only, so plan
            the Main Deck and the Top Deck as one continuous visit. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            For where the tower fits in a wider plan, the{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>Tokyo 3-day itinerary</Link>{" "}
            puts it on the evening of a central-Tokyo day.
          </p>
        </section>

        {/* vs other decks */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Tokyo Tower or Tokyo Skytree: which is better?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Skytree is better for height — decks at 350 m and 450 m — and Tokyo Tower is better for price,
            late hours and the landmark itself. Tokyo Tower has the cheapest paid ticket of the three big
            decks and the latest closing time; for the details on the others, see the{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets" style={linkStyle}>Tokyo Skytree tickets guide</Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={linkStyle}>Shibuya Sky tickets guide</Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Height", "Price (approx)", "Highlight", "Area / nearest"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tokyo Tower figures read off the official site on {CHECKED}; the other three are the official
            prices covered in the{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={linkStyle}>
              Tokyo observation decks comparison
            </Link>
            . All are approximate and subject to change.
          </p>
        </section>

        {/* Discounts and sets */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Discounts</span>
          <h2 className={styles.sectionTitle}>Are there Tokyo Tower discounts or set tickets?</h2>
          <p className={styles.bodyText}>
            There is no foreign-visitor or passport discount on the official fee page. The discounts it lists
            are group rates (from ¥1,350 an adult for 20 to 49 people on the Main Deck) and a disability rate
            for the holder and one companion (¥750 an adult on the Main Deck). Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The official ticket page names four set tickets — Bungee VR, a tea-ceremony seat on the deck,
            teamLab Planets and a subway pass — without prices; check the seller&apos;s listing for your
            date. It does not list a set with RED° TOKYO TOWER, the separate gaming venue in the Foot Town
            building that reseller &quot;passport&quot; tickets refer to.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do I book Tokyo Tower Top Deck Tour tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Book online for a date and an entry time, then be at the Top Deck gate on the Main Deck when your
            slot starts. The slot cannot be changed after purchase.
          </p>
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <KlookLink href={tokyoTowerTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Tokyo Tower tickets on Klook →
            </KlookLink>
            <GygCompareButton slug="tokyo-tower-tickets" listing={gygTokyoTower} />
          </div>
        </section>

        <KlookTripPrep
          label="Same day, same booking"
          heading="What should you book for the rest of a Tokyo Tower day?"
          intro="An observation deck fills an hour or two. These book on the same Klook account as the ticket — an evening on the bay or in the city, a daytime bus loop, the subway pass for the five Metro and Toei stations around the tower, and data for the day."
          items={tokyoTowerTripPrep()}
        />

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>What else do people ask about Tokyo Tower tickets?</h2>
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
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 21V9l6-6 6 6v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 18a5 5 0 0 0-10 0" />
                  <line x1="12" y1="2" x2="12" y2="9" />
                  <line x1="2" y1="22" x2="22" y2="22" />
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
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sanrio Puroland Tickets (2026): Prices, Variable Pricing &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/fuji-q-highland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fuji-Q Highland Tickets (2026): Free Pass Prices, the Q Pack &amp; How to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the deck, skip the window</h2>
            <p className={styles.ctaBannerDesc}>
              Klook sells Tokyo Tower admission with an English checkout, an e-ticket and the Top Deck Tour
              upgrade on the same listing — useful if a Japanese attraction site has already refused your
              card.
            </p>
            <KlookLink href={tokyoTowerTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Tokyo Tower tickets →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
