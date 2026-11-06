import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { observationDecksSameDayPrep, skytreeAquariumCombo, subwayCityViewCombo, tokyoSubwayTicket } from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygShibuyaSky, gygTokyoEntryTickets, gygTokyoSkytree, gygTokyoTower } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";

// CTA links — Klook affiliate redirects (tracking links, all three listings confirmed live
// 19 Oct 2026).
const SKYTREE_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304894&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F41352-tokyo-skytree%2F";
const TOKYO_TOWER_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304895&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F4911-tokyo-tower-main-observatory-ticket-tokyo%2F";
const SHIBUYA_SKY_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299140&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F70672-shibuya-sky-tokyo%2F";

// Rebuilt 6 Nov 2026 for "best observation deck in tokyo" and "shibuya sky vs skytree"
// (Bing: 18 impressions, no clicks, position 6.72). Every figure was re-read that day:
//
//   Shibuya Sky     gotokyo.org/en/spot/1749 (Tokyo Metropolitan Government): adult prices,
//                   hours, 229 m, stay length, rooftop closure, sold-out rule. The operator's
//                   own /sky/ pages are client-rendered and return only navigation.
//   Skytree         en.tokyo-skytree.jp /ticket, /open-hours/day_hours, /inquiry/faq;
//                   gotokyo.org/en/spot/6 for walking minutes and the weekend opening.
//   Tokyo Tower     tokyotower.co.jp /fee, /access and the home page's hours notice.
//   Tocho           zaimu.metro.tokyo.lg.jp/tochousha/goannai/tenbou; gotokyo.org/en/spot/74
//                   for Tochomae Station.
//   Tokyo City View art-view.roppongihills.com/en/info; tcv.roppongihills.com/en.
//   Azabudai Hills  azabudai-hills.com /access and /shop_list/2007.
//   Sunset          eco.mtk.nao.ac.jp/koyomi/dni/2026 (National Astronomical Observatory).
//
// Shibuya Sky's on-sale rule was not re-read (the release is an image-font PDF), so it keeps
// PRICES.shibuyaSky.checked. Headline figures still come from lib/attraction-prices.ts.
const CHECKED = checkedLabel(PRICES.tochoDeck.checked);

const priceRows = [
  { deck: "Shibuya Sky", ticket: "Adult, rooftop", online: "¥2,700 before 15:00 · ¥3,400 from 15:00", counter: "¥3,000 before 15:00 · ¥3,700 from 15:00" },
  { deck: "Tokyo Skytree", ticket: "Adult, Floor 350", online: "From ¥1,800", counter: "Online price + ¥500 service fee" },
  { deck: "Tokyo Skytree", ticket: "Adult, Floor 350 + 450", online: "From ¥3,000", counter: "Online price + ¥500 service fee" },
  { deck: "Tokyo Tower", ticket: "Adult, Main Deck", online: "¥1,500", counter: "¥1,500" },
  { deck: "Tokyo Tower", ticket: "Adult, Top Deck Tour", online: "¥3,300", counter: "¥3,500" },
  { deck: "Tocho (South and North)", ticket: "Everyone", online: "Free", counter: "Free" },
  { deck: "Tokyo City View", ticket: "Adult, 13 Nov 2026 – 14 Feb 2027", online: "¥2,200", counter: "¥2,400" },
];

const hoursRows = [
  { deck: "Shibuya Sky", hours: "10:00–22:30", last: "21:20", closed: "New Year's Day; temporary closures possible" },
  { deck: "Tokyo Skytree", hours: "10:00–22:00 weekdays; opens 9:00 at weekends and on holidays", last: "21:00", closed: "No closed day listed; hours change by date" },
  { deck: "Tokyo Tower Main Deck", hours: "9:00–23:00", last: "22:30", closed: "None listed" },
  { deck: "Tokyo Tower Top Deck Tour", hours: "9:00–22:45", last: "22:15", closed: "None listed" },
  { deck: "Tocho South room", hours: "9:30–22:00", last: "21:30", closed: "1st and 3rd Tuesday; 29–31 Dec, 2–3 Jan; inspection days" },
  { deck: "Tocho North room", hours: "9:30–17:30", last: "17:00", closed: "2nd and 4th Monday; 29–31 Dec, 2–3 Jan; inspection days" },
  { deck: "Tokyo City View", hours: "10:00–22:00", last: "21:30", closed: "10–12 Nov 2026" },
];

const accessRows = [
  { deck: "Shibuya Sky", time: "About 90 minutes usually; no time limit", access: "Directly connected to Shibuya Station" },
  { deck: "Tokyo Skytree", time: "About 1 hour for Floor 350; 1 to 1.5 hours for both floors", access: "Tokyo Skytree Station or Oshiage Station, 1 min on foot" },
  { deck: "Tokyo Tower", time: "Not published", access: "Akabanebashi 5 min, Onarimon 6 min, Kamiyacho 7 min" },
  { deck: "Tocho", time: "Not published", access: "Tochomae Station Exit A4, about 1 min on foot" },
  { deck: "Tokyo City View", time: "Not published", access: "Roppongi Station (Hibiya Line) Exit 1C, 3 min on foot" },
];

const versusRows = [
  { what: "Height", shibuya: "229 m rooftop", skytree: "350 m and 450 m decks" },
  { what: "Setting", shibuya: "Open-air rooftop", skytree: "Indoors, behind glass" },
  { what: "Adult ticket", shibuya: "¥2,700 / ¥3,400 online", skytree: "From ¥1,800 (Floor 350), from ¥3,000 (both)" },
  { what: "Last admission", shibuya: "21:20", skytree: "21:00" },
  { what: "Typical visit", shibuya: "About 90 minutes", skytree: "1 to 1.5 hours" },
  { what: "Mt. Fuji", shibuya: "To the west on a clear day", skytree: "Depends on visibility; best in cold, clear air" },
  { what: "Bad weather", shibuya: "Rooftop can close", skytree: "Views can white out; no refund for poor visibility" },
];

const sunsetRows = [
  { date: "15 March", sunset: "17:48", enter: "About 16:50–17:20" },
  { date: "15 June", sunset: "18:58", enter: "About 18:00–18:30" },
  { date: "15 September", sunset: "17:49", enter: "About 16:50–17:20" },
  { date: "15 November", sunset: "16:35", enter: "About 15:35–16:05" },
  { date: "15 December", sunset: "16:29", enter: "About 15:30–16:00" },
];

/** A dated table in the page's standard shell. */
function DeckTable({ head, rows }: { head: string[]; rows: string[][] }) {
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
            {rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, i) => (
                  <td key={i} className={i === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {cell}
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

const deckRows = [
  {
    deck: "Shibuya Sky",
    height: "~229 m rooftop",
    highlight: "Open-air rooftop directly above the Scramble Crossing — the iconic Tokyo shot",
    price: `${PRICES.shibuyaSky.adult} online · ${PRICES.shibuyaSky.atDoor} at the door`,
    area: "Shibuya Station",
  },
  {
    deck: "Tokyo Skytree",
    height: "Floor 350 and Floor 450 (634 m tower)",
    highlight: "The highest decks in Tokyo and the only glass skywalk; Mt. Fuji on clear days",
    price: `${PRICES.tokyoSkytree.adult} (Floor 350) · from ¥3,000 combo`,
    area: "Oshiage, near Asakusa",
  },
  {
    deck: "Tokyo Tower",
    height: "Main Deck ~150 m, Top Deck ~250 m (332 m tower)",
    highlight: "The retro 1958 landmark; the Top Deck is a guided tour rather than a free wander",
    price: `${PRICES.tokyoTower.adult} Main Deck · ¥3,300 Top Deck online`,
    area: "Shiba-koen / Akabanebashi",
  },
  {
    deck: "Metropolitan Gov. Building (Tocho)",
    height: "202 m, 45th floor",
    highlight: "A full city panorama with the Skytree and Tokyo Tower both in view",
    price: PRICES.tochoDeck.adult,
    area: "Shinjuku",
  },
];

const whoFor = [
  {
    title: "Choose Shibuya Sky if…",
    desc: "You want the single most iconic Tokyo view. The open-air rooftop sits directly above the Shibuya Scramble Crossing, so you get the postcard cityscape and that famous crossing shot in one place. It's the best one-and-done photo experience — just book the sunset slot early.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V8l7-4 7 4v13" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Choose Tokyo Skytree if…",
    desc: "You want the highest, furthest views and a glass floor. At 350 m and 450 m, the Skytree decks look out far beyond the city — on a clear day you can pick out Mt. Fuji. It's the choice for sheer altitude and the widest panorama, and it pairs naturally with an Asakusa day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M8 22h8" />
        <path d="M9 7l3-3 3 3" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Choose Tokyo Tower if…",
    desc: `You want the classic retro landmark, and the Main Deck is enough. At ¥1,500 for an adult it is the cheapest paid deck of the three, and it is open until 23:00 with last entry at 22:30 — the latest of any of them. The Top Deck is a separate guided tour at ¥3,300 booked online or ¥3,500 at the counter — more than a daytime Shibuya Sky ticket, and just under a 15:00-or-later one. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22L12 2l6 20" />
        <path d="M8 15h8" />
        <path d="M9.5 9h5" />
      </svg>
    ),
  },
  {
    title: "Choose Tocho (free) if…",
    desc: `You want to know whether a paid deck is worth it at all. The Tokyo Metropolitan Government Building's observation room in Shinjuku is on the 45th floor at 202 metres and costs nothing, with both the Skytree and Tokyo Tower in view. The South room runs 9:30–22:00, last entry 21:30, closed the first and third Tuesday of the month; the North runs 9:30–17:30, last entry 17:00, closed the second and fourth Monday. Go here first and spend the saved yen on something a view cannot give you. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="7" height="18" rx="1" />
        <rect x="13" y="3" width="7" height="18" rx="1" />
        <path d="M6.5 7h2M6.5 11h2M6.5 15h2M15.5 7h2M15.5 11h2M15.5 15h2" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide what you want most from the view",
    desc: "The iconic crossing shot points to Shibuya Sky; the highest and furthest views (plus a glass floor) point to Skytree; a classic retro landmark points to Tokyo Tower; and a free panorama points to Tocho in Shinjuku. Pick the priority first, then the deck follows.",
  },
  {
    title: "Book timed entry ahead for the popular decks",
    desc: `Shibuya Sky dates go on sale at 00:00 Japan time two weeks ahead (operator release, read ${checkedLabel(PRICES.shibuyaSky.checked)}), and an adult ticket sold out online is not available at the counter either. At Skytree the online price also avoids the ¥500 same-day fee. Tokyo Tower's Main Deck costs the same on the day.`,
  },
  {
    title: "Use a reseller if you have a foreign card",
    desc: "Some official ticketing sites reject foreign-issued cards. Klook accepts foreign cards, checks out in English, and issues a scannable e-ticket — a reliable workaround for Shibuya Sky, Skytree, and Tokyo Tower.",
  },
  {
    title: "Time it for clear weather and good light",
    desc: "Distant views depend on clear air, which Skytree and the Tocho deck both put in the cold months. For Shibuya Sky, aim for sunset; for Tokyo Tower and the Tocho South room, the city after dark is the highlight.",
  },
];

const faqItems = [
  {
    q: "Which Tokyo observation deck is best?",
    a: `There is no single answer, but there is a cheapest one: the Tokyo Metropolitan Government Building in Shinjuku, which is free and reaches 202 metres. Of the paid decks, Shibuya Sky at ¥2,700 online for an entry before 15:00 — ¥3,400 from 15:00 — buys the open-air rooftop above the Scramble Crossing and the most recognisable view in the city; Tokyo Skytree from ¥1,800 buys the most altitude and the only glass skywalk; Tokyo Tower's Main Deck at ¥1,500 buys the retro landmark and the latest closing time. Checked ${CHECKED}.`,
  },
  {
    q: "Which is the cheapest Tokyo observation deck?",
    a: `The free one — the Tokyo Metropolitan Government Building in Shinjuku, at 202 metres on the 45th floor, with no ticket involved. Among the paid decks, Tokyo Tower's Main Deck is the cheapest at ¥1,500 for an adult, then Tokyo Skytree's Floor 350 from ¥1,800, then Shibuya Sky at ¥2,700 booked online for an entry before 15:00. The dearest single ticket is now a 15:00-or-later Shibuya Sky entry at ¥3,400, just above Tokyo Tower's ¥3,300 Top Deck tour. Checked ${CHECKED}.`,
  },
  {
    q: "Which Tokyo observation deck is the highest?",
    a: "Tokyo Skytree, by a wide margin. The tower stands 634 m tall, with observation decks at 350 m (the Tembo Deck) and 450 m (the Tembo Galleria). That's well above Shibuya Sky's ~229 m rooftop and Tokyo Tower's decks at roughly 150 m and 250 m, so Skytree offers the highest and furthest-reaching views in Tokyo.",
  },
  {
    q: "Are there any free observation decks in Tokyo?",
    a: `Yes — one, and it is good enough to change the decision. The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has an observation room on the 45th floor at 202 metres, free to enter, with both the Skytree and Tokyo Tower visible from it. The South room is open 9:30–22:00 with last entry at 21:30 and closes on the first and third Tuesday of each month; the North room runs 9:30–17:30 with last entry at 17:00 and closes on the second and fourth Monday. Read off the Tokyo government's site on ${CHECKED}; confirm the room is open on your date before travelling across town for it.`,
  },
  {
    q: "Shibuya Sky vs Skytree — which should I pick?",
    a: `Shibuya Sky is about the experience and the photo: an open-air rooftop 229 m above the Scramble Crossing, ¥2,700 before 15:00 or ¥3,400 from 15:00 online. Tokyo Skytree is about altitude and reach: decks at 350 m and 450 m from ¥1,800, with a glass-floor section. Choose Shibuya Sky for the crossing shot and open air; choose Skytree for the highest panorama and the lower price. Checked ${CHECKED}.`,
  },
  {
    q: "Can you see Mt. Fuji from a Tokyo observation deck?",
    a: `On a clear day, yes. Skytree's own FAQ says the chance depends on visibility and is helped by cold-season air or an early-morning visit; the Tocho deck says December to February has the most days; and the Tokyo government's listing for Shibuya Sky puts Mt. Fuji to the west on a clear day. There is no guarantee on any date. Checked ${CHECKED}.`,
  },
  {
    q: "How long do you need at a Tokyo observation deck?",
    a: `Allow one to two hours. Shibuya Sky has no time limit and people usually spend about 90 minutes there; Skytree's own guide is about an hour for Floor 350 and one to one and a half hours for both floors. Tokyo Tower and Tocho publish no figure. Checked ${CHECKED}.`,
  },
  {
    q: "Can I get a refund if the weather is bad?",
    a: `Do not count on one. Shibuya Sky gives no refund after entry if the rooftop closes, and Skytree tickets are non-refundable after issue, with no refund or exchange for poor visibility. If the forecast looks doubtful, Skytree sells same-day tickets with a ¥500 fee, which keeps the decision open. A reseller sets its own terms, so read them at checkout. Checked ${CHECKED}.`,
  },
  {
    q: "Which Tokyo observation deck stays open latest?",
    a: `Tokyo Tower. Its Main Deck runs to 23:00 with last entry at 22:30, against Shibuya Sky at 22:30 with last admission at 21:20, and Skytree, Tocho's South room and Tokyo City View at 22:00. Hours change by date, so confirm yours. Checked ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-observation-decks") } });

export default function TokyoObservationDecksPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Tokyo Observation Decks 2026: Best Views, Prices and Hours</title>
        <meta
          name="description"
          content="Tokyo Observation Decks compared: Shibuya Sky vs Skytree on price, hours and sunset. Shibuya Sky ¥2,700~, Skytree ¥1,800~, Tokyo Tower ¥1,500, Tocho free."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Observation Decks 2026: Best Views, Prices and Hours" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" />
        <meta property="og:description" content="Tokyo Observation Decks compared: Shibuya Sky vs Skytree on price, hours and sunset. Shibuya Sky ¥2,700~, Skytree ¥1,800~, Tokyo Tower ¥1,500, Tocho free." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Observation Decks 2026: Best Views, Prices and Hours" />
        <meta name="twitter:description" content="Tokyo Observation Decks compared: Shibuya Sky vs Skytree on price, hours and sunset. Shibuya Sky ¥2,700~, Skytree ¥1,800~, Tokyo Tower ¥1,500, Tocho free." />
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
              route: "/guides/attractions/tokyo-observation-decks",
              headline: "Tokyo Observation Decks 2026: Best Views, Prices and Hours",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Observation Decks", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" },
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
          <span className={styles.breadCurrent}>Tokyo Observation Decks</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best Observation Decks in Tokyo (2026):<br />Skytree, Shibuya Sky, Tokyo Tower and Tocho Compared
          </h1>
          <p className={styles.heroSubtitle}>
            Four ways to look down on Tokyo, compared on official prices — the iconic rooftop, the tallest
            tower, the retro landmark, and the one in Shinjuku that charges nothing at all.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "One is free"].map((t) => (
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

        {/* Lead: answers the query before anything else on the page. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>What is the best observation deck in Tokyo?</h2>
          <p className={styles.bodyText}>
            For most first-time visitors the best observation deck in Tokyo is the open-air{" "}
            <strong>Shibuya Sky</strong> (229 m, from ¥2,700 online). The highest is{" "}
            <strong>Tokyo Skytree</strong> (350 m and 450 m, from ¥1,800), and the free one is the{" "}
            <strong>Tokyo Metropolitan Government Building</strong>, or Tocho (202 m). For sunset, book a slot
            about an hour before sunset as early as you can. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Beyond that, each deck trades on something different: Shibuya Sky on atmosphere and the photo,
            Skytree on height and distance, Tokyo Tower on nostalgia and late hours, and Tocho on a good view
            for nothing. Figures below come from each operator&apos;s own site, or from the Tokyo government&apos;s
            tourism site for Shibuya Sky, whose own pages cannot be read automatically. All are subject to
            change, so confirm at booking.
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
                <p className={styles.verdictStatLabel}>Most iconic view</p>
                <p className={styles.verdictStatValue}>Shibuya Sky (~229 m rooftop)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Highest & furthest</p>
                <p className={styles.verdictStatValue}>Skytree (350 m / 450 m)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest paid deck</p>
                <p className={styles.verdictStatValue}>Tokyo Tower Main, ¥1,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best free option</p>
                <p className={styles.verdictStatValue}>Tocho, Shinjuku — 202 m</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> go up the free one first. The Metropolitan Government Building in
              Shinjuku puts you 202 metres above the city for nothing, with the Skytree and Tokyo Tower both
              in the frame — which tells you quickly whether a paid deck is worth it to you. If it is, pick by
              what you want rather than by height: <strong>Shibuya Sky</strong> at ¥2,700 before 15:00 or
              ¥3,400 after for the open-air rooftop above the Scramble Crossing, <strong>Skytree</strong> from
              ¥1,800 for the altitude and the glass skywalk, <strong>Tokyo Tower</strong> at ¥1,500 for the
              1958 landmark and the latest closing time. Note that Tokyo Tower&apos;s ¥3,300 Top Deck tour
              costs less than a 15:00 entry to Shibuya Sky. Checked {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Shibuya Sky Tickets →
              </KlookLink>
              <KlookLink href={SKYTREE_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Tokyo Skytree Tickets →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>How do Tokyo&apos;s observation decks compare on price and height?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Height", "Highlight", "Adult price", "Area / nearest"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Adult prices checked {CHECKED}. Skytree is from ¥1,800 for Floor
            350 and from ¥3,000 for the Floor 350 + 450 combo booked online; adding Floor 450 on the day costs
            ¥1,400 on top, so the combo is the cheaper route if you want both — see our{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo Skytree tickets guide
            </Link>{" "}
            for the ¥500 same-day service fee as well. Tokyo Tower&apos;s Top Deck is ¥3,300 online and ¥3,500
            at the counter. Subject to change — confirm at booking.
          </p>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How much are Tokyo observation deck tickets?</h2>
          <p className={styles.bodyText}>
            Adult tickets run from free at Tocho to ¥3,700 for a Shibuya Sky entry from 15:00 bought at the
            counter. Skytree starts at ¥1,800 and Tokyo Tower&apos;s Main Deck is ¥1,500.
          </p>
          <DeckTable
            head={["Deck", "Ticket", "Online", "Counter"]}
            rows={priceRows.map((r) => [r.deck, r.ticket, r.online, r.counter])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Official prices, checked {CHECKED}. Skytree&apos;s &ldquo;from&rdquo; prices rise on some dates. Other
            Japan attractions are in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What time do Tokyo observation decks close, and when is last entry?</h2>
          <p className={styles.bodyText}>
            Tokyo Tower&apos;s Main Deck stays open latest, to 23:00 with last entry at 22:30. Shibuya Sky stops
            admitting at 21:20 and Skytree at 21:00, so a late plan needs to allow for those times.
          </p>
          <DeckTable
            head={["Deck", "Hours", "Last entry", "Closed"]}
            rows={hoursRows.map((r) => [r.deck, r.hours, r.last, r.closed])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Checked {CHECKED}. If a Tocho closing day falls on a holiday, the room closes on the next weekday
            instead. Tocho can also close at short notice in bad weather. Skytree&apos;s hours change by date, so
            check its calendar for yours.
          </p>
        </section>

        {/* Time and access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Planning</span>
          <h2 className={styles.sectionTitle}>How long does each deck take, and how do you get there?</h2>
          <p className={styles.bodyText}>
            Plan on one to two hours. Shibuya Sky and Skytree are both a minute or less from their stations,
            which makes them easy to fit around the rest of a day.
          </p>
          <DeckTable
            head={["Deck", "Time needed", "Nearest stations"]}
            rows={accessRows.map((r) => [r.deck, r.time, r.access])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Checked {CHECKED}. &ldquo;Not published&rdquo; means the operator gives no figure, so we do not
            estimate one. To fit a deck into a wider plan, see our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo 3-day itinerary
            </Link>.
          </p>
        </section>

        {/* Shibuya Sky detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shibuya Sky</span>
          <h2 className={styles.sectionTitle}>Why go to Shibuya Sky?</h2>
          <p className={styles.bodyText}>
            Shibuya Sky is the open-air rooftop deck atop Shibuya Scramble Square, about 229 metres above one of
            the busiest crossings on earth. Standing on the rooftop looking straight down over the Shibuya
            Scramble Crossing is the single most recognisable observation experience in Tokyo. Admission is
            priced by entry time: ¥2,700 for an adult booked online entering between 10:00 and 14:59 and
            ¥3,400 from 15:00, against ¥3,000 and ¥3,700 at the 14th-floor counter, checked {CHECKED}. The sunset slots are the prize,
            and they always fall in the dearer band.
          </p>
          <p className={styles.bodyText}>
            Because it&apos;s the most photographed deck in the city, booking has a few quirks worth getting
            right — for prices, the best time to go, and how to book even with a foreign card,{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              see our full Shibuya Sky tickets guide
            </Link>.
          </p>
        </section>

        {/* Skytree detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tokyo Skytree</span>
          <h2 className={styles.sectionTitle}>Why go to Tokyo Skytree?</h2>
          <p className={styles.bodyText}>
            At 634 metres, Tokyo Skytree is the tallest tower in Japan, with two observation decks: the Tembo
            Deck at 350 m and the Tembo Galleria at 450 m. It&apos;s the choice for sheer altitude and
            far-reaching views — there is a glass-floor section for the brave, and on a clear day you can see
            all the way to Mt. Fuji. Floor 350 is from ¥1,800 for an adult and the Floor 350 + 450 combo is
            from ¥3,000 online; adding Floor 450 once you are inside costs ¥1,400 on top of a Floor 350
            ticket, which makes buying the combo up front the cheaper way to see both.
          </p>
          <p className={styles.bodyText}>
            Skytree sits in Oshiage, near Asakusa, so it pairs neatly with a day exploring old Tokyo. It is
            generally easier to book than Shibuya Sky, but the same-day counter adds a ¥500 service fee, so
            buying online still saves money as well as time — our{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Skytree tickets guide
            </Link>{" "}
            has the full tier table.
          </p>
        </section>

        {/* Tokyo Tower detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tokyo Tower</span>
          <h2 className={styles.sectionTitle}>Is Tokyo Tower worth it?</h2>
          <p className={styles.bodyText}>
            Opened in 1958 and standing 332 metres tall, Tokyo Tower is the nostalgic icon of the skyline —
            an orange-and-white lattice that glows over central Tokyo at night. The Main Deck is ¥1,500 for an
            adult, ¥1,200 for a high-school student, ¥900 for elementary and middle-school children and ¥600
            for ages four and up, and it stays open until 23:00 with last entry at 22:30. The higher level is
            reached on the Top Deck tour, which is a separate guided experience at ¥3,300 booked online or
            ¥3,500 at the counter.
          </p>
          <p className={styles.bodyText}>
            That pricing is worth pausing on. The Top Deck tour costs more than a daytime Shibuya Sky ticket
            and puts you only about 20 metres higher, so it makes most sense if the tower itself is the draw.
            The Main Deck, on the other hand, is the cheapest paid deck in the city and the last one still letting
            people in late at night. Read off tokyotower.co.jp on {CHECKED}.
          </p>
        </section>

        {/* Tocho / free detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Free option</span>
          <h2 className={styles.sectionTitle}>Is the free Tocho observation deck worth it?</h2>
          <p className={styles.bodyText}>
            The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has an observation room on the 45th
            floor at 202 metres, and admission is free. From it you can see both the Skytree and Tokyo Tower,
            which is the point: it gives you the whole skyline including the two things you might otherwise
            pay to stand on top of. The panorama over western Tokyo is good, and on clear days Mt. Fuji is in
            range.
          </p>
          <p className={styles.bodyText}>
            The catch is the opening pattern, and it does catch people. The South room runs 9:30–22:00 with
            last entry at 21:30 and closes on the first and third Tuesday of each month; the North room runs
            9:30–17:30 with last entry at 17:00 and closes on the second and fourth Monday. Check which room
            is open on your date before crossing town. Read off the Tokyo government&apos;s site on {CHECKED}.
          </p>
        </section>

        {/* Other decks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Other decks</span>
          <h2 className={styles.sectionTitle}>Are there other observation decks in Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes. <strong>Tokyo City View</strong>, on the 52nd floor at Roppongi Hills, is the main paid
            alternative. From 13 November 2026 to 14 February 2027 an adult ticket is ¥2,200 online or ¥2,400 on site, with hours of 10:00–22:00 and last
            admission at 21:30. It is closed 10–12 November 2026, and until 9 November the ticket is ¥1,800
            online or ¥2,000 on site because access to the area facing Mt. Fuji is restricted.
          </p>
          <p className={styles.bodyText}>
            <strong>Azabudai Hills</strong> has no ticketed deck that we could confirm. Its official listing
            shows the Hills House Sky Room Cafe &amp; Bar on the 34th floor of Mori JP Tower, open 9:00–21:00 with
            no reservations and a view of Tokyo Tower. Treat it as a cafe with a view. Kamiyacho Station Exit 5
            connects directly. Checked {CHECKED}.
          </p>
        </section>

        {/* Versus */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky vs Skytree: which is better?</h2>
          <p className={styles.bodyText}>
            Shibuya Sky is better for the open-air rooftop and the crossing below it; Skytree is better for
            height and costs less to enter. If you can only do one and you want sunset photos, take Shibuya
            Sky. If you want the furthest view for the lowest ticket, take Skytree.
          </p>
          <DeckTable
            head={["", "Shibuya Sky", "Tokyo Skytree"]}
            rows={versusRows.map((r) => [r.what, r.shibuya, r.skytree])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Checked {CHECKED}.
          </p>
        </section>

        {/* Who it's for / which to choose */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which to choose</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky vs Skytree: which should I choose?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Pick by what you want from the view, not by height alone. Here is how all four decks divide up.
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Once you have picked a deck, check your date:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Shibuya Sky tickets on Klook →
            </KlookLink>
            <KlookLink href={SKYTREE_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Tokyo Skytree tickets on Klook →
            </KlookLink>
            <KlookLink href={TOKYO_TOWER_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Tokyo Tower tickets on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Sunset */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sunset</span>
          <h2 className={styles.sectionTitle}>When is the best time to visit Shibuya Sky for sunset?</h2>
          <p className={styles.bodyText}>
            Enter 30 to 60 minutes before sunset, so you get daylight, sunset and the city lighting up in one
            visit. Sunset in Tokyo moves by about two and a half hours through the year, so the time to book
            depends on your month, but it always falls in the ¥3,400 band.
          </p>
          <DeckTable
            head={["Date", "Sunset in Tokyo", "Enter around"]}
            rows={sunsetRows.map((r) => [r.date, r.sunset, r.enter])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Sunset times are the National Astronomical Observatory of Japan&apos;s 2026 tables, read on {CHECKED}.
            The earliest sunsets are about 16:28 in early December and the latest about 19:01 in late June.
            Entry times are our suggestion, not an operator rule. For slot-by-slot detail, see our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Shibuya Sky tickets guide
            </Link>.
          </p>
        </section>

        {/* Mt. Fuji */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Mt. Fuji</span>
          <h2 className={styles.sectionTitle}>Which Tokyo observation deck can you see Mt. Fuji from?</h2>
          <p className={styles.bodyText}>
            Skytree, Shibuya Sky and Tocho all list Mt. Fuji as visible on a clear day. Your best odds are in
            the cold months: Tocho says December to February has the most days, and Skytree says cold-season
            air or an early-morning visit helps.
          </p>
          <p className={styles.bodyText}>
            Skytree&apos;s two decks and the Tocho deck are named by Tokyo&apos;s official tourism site as Mt. Fuji
            viewpoints. Tokyo Tower&apos;s site does not mention the view, so we do not claim it. No deck can
            promise it on a given date. Checked {CHECKED}.
          </p>
        </section>

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Bad weather</span>
          <h2 className={styles.sectionTitle}>What happens if it rains at Shibuya Sky?</h2>
          <p className={styles.bodyText}>
            The rooftop may close in bad weather and strong winds, and no refund is given after entry. The
            observation space as a whole may also close in adverse weather, so check the forecast before you
            leave.
          </p>
          <p className={styles.bodyText}>
            The operator&apos;s event pages say that visitors can use the indoor SKY GALLERY when the rooftop
            closes. Elsewhere, Skytree does not refund tickets once issued or for poor visibility, though it
            does sell same-day tickets at its 4th-floor counter for a ¥500 fee, which suits a doubtful
            forecast. At Tokyo Tower, the outdoor staircase stops in rain or storms. Tocho may close at short
            notice. Checked {CHECKED}.
          </p>
        </section>

        {/* How to plan / book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do I need to book Tokyo observation decks in advance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For a Shibuya Sky sunset slot, yes: if adult tickets sell out online, the counter has none either.
            Skytree is worth booking to avoid the ¥500 same-day fee. Tokyo Tower&apos;s Main Deck and Tocho need no
            booking.
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Book a Shibuya Sky slot on Klook →
            </KlookLink>
            <KlookLink href={SKYTREE_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Book Tokyo Skytree on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Klook, directly under the booking decision. The deck tickets pay the low bands,
            so this is where the 6.5 / 5 / 20% products go. Ticket CTAs are unchanged. */}
        <KlookTripPrep
          label="Book for the same day"
          heading="What should I book for the same day as a Tokyo observation deck?"
          intro="A deck is one or two hours of one day. These six cover the rest of it: the daytime, the evening, a bed nearby, the rides between, the trip in from the airport and data on your phone."
          items={observationDecksSameDayPrep}
        />
        <p className={styles.bodyText}>
          Still choosing an area? Our{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
            where to stay in Tokyo guide
          </Link>{" "}
          compares them.
        </p>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Tokyo observation decks: common questions</h2>
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
          heading="Combos and Passes Worth a Look"
          intro="Two bundles that pair a deck with something else, plus the subway ticket that gets you between them. Open a listing for the current price on your date."
          tours={[skytreeAquariumCombo, subwayCityViewCombo, tokyoSubwayTicket]}
        />

        {/* All three decks are sold on GetYourGuide as well. The Klook links above,
            and every height and price on this page, are unchanged. */}
        <GygCompare
          slug="tokyo-observation-decks"
          heading="The Same Three Decks on GetYourGuide"
          intro="Shibuya Sky is the one deck here where the slot you want genuinely sells out, and Skytree and Tokyo Tower both have an upgrade tier that is easier to compare side by side than in sequence. All three have their own GetYourGuide listing."
          listings={[gygShibuyaSky, gygTokyoSkytree, gygTokyoTower]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-illumination-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="4" />
                  <path d="M12 2v2M12 18v4M4 10H2M22 10h-2M5.6 3.6 7 5M18.4 3.6 17 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-4 7 4v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
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
                <p className={styles.relatedTitle}>teamLab Tokyo Tickets (2026): Planets vs Borderless &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-borderless-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Borderless Tickets (2026): Price, How to Book and Time Slots</p>
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
            <h2 className={styles.ctaBannerTitle}>Book your Tokyo view</h2>
            <p className={styles.ctaBannerDesc}>
              Whether you want the iconic Shibuya rooftop, the highest views from Skytree, or the retro Tokyo
              Tower, booking online saves time at the entrance — and lets you lock in the best slots.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Shibuya Sky →
              </KlookLink>
              <KlookLink href={SKYTREE_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Skytree →
              </KlookLink>
              <KlookLink href={TOKYO_TOWER_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Tower →
              </KlookLink>
              <GygCompareButton
                slug="tokyo-observation-decks"
                listing={gygTokyoEntryTickets}
                label="All three on GetYourGuide →"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
