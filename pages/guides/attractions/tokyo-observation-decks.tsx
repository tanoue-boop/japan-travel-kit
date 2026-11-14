import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { observationDecksDayExtras, observationDecksSameDayPrep, skytreeAquariumCombo, subwayCityViewCombo, tokyoSubwayTicket } from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygShibuyaSky, gygTokyoEntryTickets, gygTokyoSkytree, gygTokyoTower } from "../../../lib/gyg-links";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

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

// Re-read 14 Nov 2026 for the comparison rebuild (task-jtk-20261114-R06): the search terms
// landing here are "vs", "instead of" and "alternatives", so the page now leads with the
// choice and leaves the buying detail to the three ticket guides. Read that day:
//   Skytree         en.tokyo-skytree.jp/ticket/ (from ¥1,800 / from ¥3,000, +¥500 at the
//                   counter, Floor 450 add-on ¥1,400), /open-hours/day_hours/ (9:00–22:00 on
//                   Sat 14 Nov), /inquiry/faq/ (cancellation fee inside 30 days).
//   SHIBUYA SKY     gotokyo.org/en/spot/1749 (229 m, ¥2,700 / ¥3,400 online, ¥3,000 / ¥3,700
//                   counter, 10:00–22:30, last 21:20, sold out online = sold out at counter).
//   Tokyo Tower     tokyotower.co.jp/fee/ (333 m tower, Main Deck 150 m ¥1,500, 9:00–23:00,
//                   last 22:30; Top Deck Tour 150 m + 250 m ¥3,300 web / ¥3,500 counter).
//   Tocho           zaimu.metro.tokyo.lg.jp/tochousha/goannai/tenbou (202 m, free, hours,
//                   closing days, no advance or group reservations).
//   Ebisu           gardenplace.jp/special/sp/top_of_yebisu/ (free view space on the
//                   38th–39th-floor TOP of YEBISU level; no hours given on that page).
//   Bunkyo          city.bunkyo.lg.jp/b014/p003985.html (25th-floor lounge, about 105 m, free,
//                   closed for works since 1 Mar 2025, reopening planned early Dec 2026).
//   Tokyo City View art-view.roppongihills.com/en/info (10:00–22:00, last 21:30).
const RECHECKED = checkedLabel("2026-11-14");
const SHIBUYA_ON_SALE_CHECKED = checkedLabel(PRICES.shibuyaSky.checked);

/** The comparison table. Row order follows the verdict line above it. */
const compareRows = [
  {
    deck: "Tokyo Skytree",
    pick: "Highest",
    height: "350 m and 450 m decks",
    open: "No — indoors behind glass",
    price: "From ¥1,800 (Floor 350); from ¥3,000 (350 + 450). +¥500 at the counter; price varies by date",
    hours: "Varies by date; 9:00–22:00 on 14 Nov 2026",
    book: "Advised: timed tickets online; a cancellation fee applies inside 30 days",
    sunset: "Good, and indoors if the weather turns",
    url: SKYTREE_URL,
    cta: "Skytree tickets →",
  },
  {
    deck: "SHIBUYA SKY",
    pick: "Open-air sunset",
    height: "229 m rooftop",
    open: "Yes — rooftop can close in bad weather",
    price: "¥2,700 before 15:00 / ¥3,400 from 15:00 online; ¥3,000 / ¥3,700 at the counter",
    hours: "10:00–22:30, last entry 21:20",
    book: "Yes for sunset: dates go on sale two weeks ahead at 00:00 JST; sold out online means sold out at the counter",
    sunset: "Best of the four — but sunset slots are in the ¥3,400 band",
    url: SHIBUYA_SKY_URL,
    cta: "SHIBUYA SKY tickets →",
  },
  {
    deck: "Tokyo Tower",
    pick: "Cheapest paid, open latest",
    height: "Main Deck 150 m; Top Deck 250 m",
    open: "No — indoor decks",
    price: "¥1,500 Main Deck; Top Deck Tour ¥3,300 online / ¥3,500 at the counter",
    hours: "Main Deck 9:00–23:00, last entry 22:30",
    book: "Main Deck: no — same price on the day. Top Deck: online is ¥200 cheaper",
    sunset: "Better for night views; open latest",
    url: TOKYO_TOWER_URL,
    cta: "Tokyo Tower tickets →",
  },
  {
    deck: "Tokyo Metropolitan Government Building (Tocho)",
    pick: "Free",
    height: "202 m, 45th floor",
    open: "No — indoors",
    price: "Free",
    hours: "South room 9:30–22:00 (last 21:30); North room 9:30–17:30",
    book: "No — reservations are not accepted",
    sunset: "Yes, from the South room, which stays open after dark",
    url: "",
    cta: "",
  },
];

/** "Where to go instead of Shibuya Sky" — free or cheaper decks, each read off its own official page. */
const alternativeRows = [
  ["Tokyo Metropolitan Government Building (Shinjuku)", "202 m, 45th floor", "Free", "South room 9:30–22:00, last entry 21:30; closed 1st and 3rd Tuesday", "Skytree, Tokyo Bay and, on clear days, Mt. Fuji"],
  ["Ebisu Garden Place Tower — SKY LOUNGE (TOP of YEBISU)", "38th–39th floor", "Free", "Not stated on the official page", "Tokyo Tower, Skytree and Rainbow Bridge"],
  ["Bunkyo Civic Center observation lounge", "About 105 m, 25th floor", "Free", "Closed for works since 1 Mar 2025; reopening planned for early December 2026 (then 9:00–20:30)", "Skytree to the east; Shinjuku and Mt. Fuji to the west"],
  ["Tokyo Tower Main Deck", "150 m", "¥1,500", "9:00–23:00, last entry 22:30", "The cheapest paid deck, and the latest entry"],
  ["Tokyo City View (Roppongi Hills, 52nd floor)", "52nd floor", "¥2,200 online / ¥2,400 on site (13 Nov 2026 – 14 Feb 2027)", "10:00–22:00, last entry 21:30", "Indoor; Tokyo Tower close by"],
];

/** Which deck for which kind of visit. */
const purposeRows = [
  { who: "First time in Tokyo", pick: "SHIBUYA SKY", why: "The open-air rooftop above the Scramble Crossing is the view most people come for. Book the date as soon as it opens.", url: SHIBUYA_SKY_URL, cta: "SHIBUYA SKY →" },
  { who: "Sunset", pick: "SHIBUYA SKY", why: "Enter 30 to 60 minutes before sunset (16:35 on 15 November). Sunset slots go first, so book on the day sales open.", url: SHIBUYA_SKY_URL, cta: "SHIBUYA SKY →" },
  { who: "Rainy or windy day", pick: "Tokyo Skytree", why: "Indoors, so the deck stays open; buying at the counter on the day (+¥500) keeps the decision open until you see the sky. No refund for poor visibility.", url: SKYTREE_URL, cta: "Skytree →" },
  { who: "With children", pick: "Tokyo Tower or Skytree", why: "Tokyo Tower's Main Deck is ¥900 for elementary and middle-school children and ¥600 from age 4; Skytree is from ¥900 for ages 6–14 and free for 5 and under.", url: TOKYO_TOWER_URL, cta: "Tokyo Tower →" },
  { who: "Mt. Fuji", pick: "Skytree or Tocho, December–February", why: "Clear, cold air gives the best odds; Tocho names December to February as the season with the most days. No deck can promise it.", url: SKYTREE_URL, cta: "Skytree →" },
  { who: "On a budget", pick: "Tocho", why: "Free, 202 m, with Skytree and Tokyo Tower both in view. Check which room is open on your date.", url: "", cta: "" },
  { who: "Late at night", pick: "Tokyo Tower", why: "Main Deck last entry is 22:30, against 21:20 at SHIBUYA SKY and 21:00 at Skytree.", url: TOKYO_TOWER_URL, cta: "Tokyo Tower →" },
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

/** The five in FAQPage — the comparison questions people actually search. */
const faqItems = [
  {
    q: "Which is the best observation deck in Tokyo?",
    a: `It depends on what you want. Tokyo Skytree is the highest, with decks at 350 m and 450 m from ¥1,800; SHIBUYA SKY is the open-air rooftop at 229 m and the best for sunset, at ¥2,700 online before 15:00 or ¥3,400 from 15:00; Tokyo Tower's Main Deck is the cheapest paid deck at ¥1,500 and admits until 22:30; and the Tokyo Metropolitan Government Building in Shinjuku is free at 202 m. Checked ${RECHECKED}.`,
  },
  {
    q: "Tokyo Skytree vs Shibuya Sky: which is better?",
    a: `SHIBUYA SKY is better for an open-air view and sunset: a rooftop 229 m above the Scramble Crossing, ¥2,700–¥3,400 online. Tokyo Skytree is better for height and for bad weather: indoor decks at 350 m and 450 m, from ¥1,800 for Floor 350 or from ¥3,000 for both. Sunset slots at SHIBUYA SKY sell out first, so book those as soon as the date opens. Checked ${RECHECKED}.`,
  },
  {
    q: "Tokyo Tower or Skytree: which should I visit?",
    a: `Choose Skytree for the higher view — its decks are at 350 m and 450 m, against Tokyo Tower's 150 m Main Deck and 250 m Top Deck. Choose Tokyo Tower for the lower price and a late visit: the Main Deck is ¥1,500 with last entry at 22:30, while Skytree starts at ¥1,800 and its last entry is 21:00. Checked ${RECHECKED}.`,
  },
  {
    q: "Where can I go instead of Shibuya Sky?",
    a: `If SHIBUYA SKY is sold out or too dear, the Tokyo Metropolitan Government Building in Shinjuku is free, 202 m up, with the South room open to 22:00. Ebisu Garden Place Tower has a free view space on its 38th–39th-floor restaurant level, facing Tokyo Tower. For a paid alternative, Tokyo Tower's Main Deck is ¥1,500 and Tokyo City View in Roppongi is ¥2,200 online. Checked ${RECHECKED}.`,
  },
  {
    q: "Are there free observation decks in Tokyo?",
    a: `Yes. The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has two free 45th-floor observation rooms at 202 m: the South room runs 9:30–22:00 (last entry 21:30, closed the 1st and 3rd Tuesday) and the North room 9:30–17:30 (closed the 2nd and 4th Monday). Ebisu Garden Place Tower's SKY LOUNGE is also free. The Bunkyo Civic Center lounge (about 105 m, free) is closed for works, with reopening planned for early December 2026. Checked ${RECHECKED}.`,
  },
];

/** Shown on the page under the five above, but not in FAQPage. */
const moreFaqItems = [
  {
    q: "Which is the cheapest Tokyo observation deck?",
    a: `The free one — the Tokyo Metropolitan Government Building in Shinjuku, at 202 metres on the 45th floor, with no ticket involved. Among the paid decks, Tokyo Tower's Main Deck is the cheapest at ¥1,500 for an adult, then Tokyo Skytree's Floor 350 from ¥1,800, then Shibuya Sky at ¥2,700 booked online for an entry before 15:00. The dearest single ticket is now a 15:00-or-later Shibuya Sky entry at ¥3,400, just above Tokyo Tower's ¥3,300 Top Deck tour. Checked ${CHECKED}.`,
  },
  {
    q: "Which Tokyo observation deck is the highest?",
    a: "Tokyo Skytree, by a wide margin. The tower stands 634 m tall, with observation decks at 350 m (the Tembo Deck) and 450 m (the Tembo Galleria). That's well above Shibuya Sky's ~229 m rooftop and Tokyo Tower's decks at roughly 150 m and 250 m, so Skytree offers the highest and furthest-reaching views in Tokyo.",
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

const TITLE = "Best Observation Deck in Tokyo 2026: Skytree vs Shibuya Sky";
const H1 = "Tokyo Skytree vs Shibuya Sky vs Tokyo Tower: Which Should You Visit?";
const DESC =
  "Best observation deck in Tokyo: Skytree is highest (450 m), Shibuya Sky is the open-air sunset pick, Tokyo Tower ¥1,500, Tocho free. Compare, then book.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-observation-decks") } });

export default function TokyoObservationDecksPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" />
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
              route: "/guides/attractions/tokyo-observation-decks",
              headline: H1,
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
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            The best observation deck in Tokyo, chosen by what you want from it — height, an open-air
            sunset, a late night or a free view — with the free alternatives to Shibuya Sky.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Free alternatives"].map((t) => (
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
          <h2 className={styles.sectionTitle}>Which is the best observation deck in Tokyo?</h2>
          <p className={styles.bodyText}>
            The highest observation deck in Tokyo is <strong>Tokyo Skytree</strong>, whose Tembo Galleria is
            450 m up, with adult tickets from ¥1,800 for Floor 350 or from ¥3,000 for both floors. The best
            for an open-air sunset is <strong>SHIBUYA SKY</strong>, a rooftop 229 m above the Scramble
            Crossing at ¥2,700 online before 15:00 or ¥3,400 from 15:00. The free one is the{" "}
            <strong>Tokyo Metropolitan Government Building</strong> (Tocho) in Shinjuku, whose 45th-floor
            observation rooms are 202 m up, and <strong>Tokyo Tower</strong>&apos;s ¥1,500 Main Deck is the
            cheapest paid deck and the last to stop admitting, at 22:30. Checked on each official site on{" "}
            {RECHECKED}.
          </p>
          <p className={styles.bodyText}>
            This page is for choosing. Once you have picked, the{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo Skytree tickets guide
            </Link>
            , the{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Shibuya Sky tickets guide
            </Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/tokyo-tower-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo Tower tickets guide
            </Link>{" "}
            have every ticket tier and how to book each one.
          </p>
        </section>

        {/* Comparison table — the verdict is the first row. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>How do Skytree, Shibuya Sky, Tokyo Tower and Tocho compare?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Pick it for", "Height", "Open-air?", "Adult ticket (official)", "Hours", "Book ahead?", "Sunset?", ""].map((h, i) => (
                      <th key={`${h}-${i}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9} style={{ fontSize: "0.9rem" }}>
                      <strong>Verdict:</strong> highest = Tokyo Skytree (450 m) · open-air sunset = SHIBUYA SKY ·
                      cheapest paid and latest entry = Tokyo Tower (¥1,500, last entry 22:30) · free = Tocho (202 m).
                    </td>
                  </tr>
                  {compareRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.pick}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.open}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.book}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sunset}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>
                        {row.url ? (
                          <KlookLink href={row.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                            {row.cta}
                          </KlookLink>
                        ) : (
                          "Free — no ticket"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-14 —{" "}
            <a href="https://en.tokyo-skytree.jp/ticket/" target="_blank" rel="noopener noreferrer">Tokyo Skytree tickets</a>,{" "}
            <a href="https://en.tokyo-skytree.jp/open-hours/day_hours/" target="_blank" rel="noopener noreferrer">Skytree hours</a>,{" "}
            <a href="https://www.gotokyo.org/en/spot/1749/index.html" target="_blank" rel="noopener noreferrer">SHIBUYA SKY (Tokyo government tourism site)</a>,{" "}
            <a href="https://www.tokyotower.co.jp/fee/" target="_blank" rel="noopener noreferrer">Tokyo Tower prices and hours</a>,{" "}
            <a href="https://www.zaimu.metro.tokyo.lg.jp/tochousha/goannai/tenbou" target="_blank" rel="noopener noreferrer">Tocho observation rooms</a>.
            SHIBUYA SKY&apos;s two-week on-sale rule is from the operator&apos;s release, read on {SHIBUYA_ON_SALE_CHECKED}.
            Skytree&apos;s last entry (21:00) and its no-refund rule for poor visibility were read on {CHECKED}. Prices
            change by date; confirm at booking.
          </p>
        </section>

        {/* Same-day bookings, directly under the decision. The deck tickets pay the low
            bands, so the 6.5% hotels, the 5% subway ticket and the 20% eSIM go here. */}
        <KlookTripPrep
          label="Book for the same day"
          heading="What should I book for the same day as a Tokyo observation deck?"
          intro="A sunset or night slot ends after dark, so the bed near the deck matters more than it looks. These five cover the night, the rides between decks and data for the e-ticket."
          items={observationDecksSameDayPrep}
        />

        <EsimCtaTop />

        {/* Alternatives — "where to go instead of Shibuya Sky" */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Alternatives</span>
          <h2 className={styles.sectionTitle}>Where to go instead of Shibuya Sky?</h2>
          <p className={styles.bodyText}>
            If SHIBUYA SKY is sold out or costs more than you want to pay, go up the Tokyo Metropolitan
            Government Building in Shinjuku: it is free, 202 m up, and the South room is open until 22:00. Ebisu
            Garden Place Tower&apos;s SKY LOUNGE is a second free option, facing Tokyo Tower.
          </p>
          <DeckTable
            head={["Alternative", "Height / floor", "Adult price", "Hours", "What you see"]}
            rows={alternativeRows}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-14 —{" "}
            <a href="https://www.zaimu.metro.tokyo.lg.jp/tochousha/goannai/tenbou" target="_blank" rel="noopener noreferrer">Tocho</a>,{" "}
            <a href="https://www.gotokyo.org/en/spot/74/index.html" target="_blank" rel="noopener noreferrer">Tocho on the Tokyo tourism site</a>,{" "}
            <a href="https://gardenplace.jp/special/sp/top_of_yebisu/" target="_blank" rel="noopener noreferrer">Ebisu Garden Place (TOP of YEBISU)</a>,{" "}
            <a href="https://www.city.bunkyo.lg.jp/b014/p003985.html" target="_blank" rel="noopener noreferrer">Bunkyo Civic Center lounge</a>,{" "}
            <a href="https://www.tokyotower.co.jp/fee/" target="_blank" rel="noopener noreferrer">Tokyo Tower</a>,{" "}
            <a href="https://art-view.roppongihills.com/en/info/index.html" target="_blank" rel="noopener noreferrer">Tokyo City View</a>.
            Only places whose own site says entry is free are listed as free.
          </p>
        </section>

        {/* Which for which trip */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By trip</span>
          <h2 className={styles.sectionTitle}>Which Tokyo observation deck should I choose for my trip?</h2>
          <p className={styles.bodyText}>
            First visit or sunset: SHIBUYA SKY. Rain, height or Mt. Fuji: Tokyo Skytree. Late night or a
            cheaper ticket: Tokyo Tower. No budget at all: Tocho.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["If you want…", "Go to", "Why", ""].map((h, i) => (
                      <th key={`${h}-${i}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {purposeRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.pick}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>
                        {row.url ? (
                          <KlookLink href={row.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                            {row.cta}
                          </KlookLink>
                        ) : (
                          "Free"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-14 for prices, hours and child fares (official sites above). Sunset time is the
            National Astronomical Observatory of Japan&apos;s 2026 table; the Mt. Fuji season is from Tocho and
            Skytree, read on {CHECKED}.
          </p>
        </section>

        {/* Versus */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Tokyo Skytree vs Shibuya Sky: which is better?</h2>
          <p className={styles.bodyText}>
            SHIBUYA SKY is better for an open-air view and sunset photos over the Scramble Crossing. Tokyo
            Skytree is better for height, for a cheaper ticket and for a day when the weather is doubtful, because
            its decks are indoors.
          </p>
          <DeckTable
            head={["", "SHIBUYA SKY", "Tokyo Skytree"]}
            rows={versusRows.map((r) => [r.what, r.shibuya, r.skytree])}
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-14 for height, prices and hours (
            <a href="https://www.gotokyo.org/en/spot/1749/index.html" target="_blank" rel="noopener noreferrer">SHIBUYA SKY</a>,{" "}
            <a href="https://en.tokyo-skytree.jp/ticket/" target="_blank" rel="noopener noreferrer">Tokyo Skytree</a>); visit
            length, Mt. Fuji and refund rules read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SHIBUYA_SKY_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check SHIBUYA SKY dates on Klook →
            </KlookLink>
            <KlookLink href={SKYTREE_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Tokyo Skytree dates on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Tokyo Tower or Skytree */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tower vs tower</span>
          <h2 className={styles.sectionTitle}>Tokyo Tower or Skytree?</h2>
          <p className={styles.bodyText}>
            Pick Skytree for height: its decks are at 350 m and 450 m, against Tokyo Tower&apos;s 150 m Main Deck
            and 250 m Top Deck. Pick Tokyo Tower for price and a late evening: the Main Deck is ¥1,500 with last
            entry at 22:30, while Skytree starts at ¥1,800 and its last entry is 21:00. Checked {RECHECKED}.
          </p>
          <p className={styles.bodyText}>
            Skytree, at 634 m, is the taller structure; Tokyo Tower is 333 m, and from Skytree&apos;s decks or
            Tocho it is one of the landmarks you are looking at. Skytree pairs with an Asakusa day, Tokyo
            Tower with Shiba Park and Roppongi.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={SKYTREE_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Tokyo Skytree tickets on Klook →
            </KlookLink>
            <KlookLink href={TOKYO_TOWER_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Tokyo Tower tickets on Klook →
            </KlookLink>
          </div>
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
            Checked {CHECKED}. &ldquo;Not published&rdquo; means the operator gives no figure, so none is
            estimated here. To fit a deck into a wider plan, see our{" "}
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
            Opened in 1958 and standing 333 metres tall by its operator&apos;s own figure, Tokyo Tower is the nostalgic icon of the skyline —
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
            people in late at night. Read off tokyotower.co.jp on {RECHECKED}.
          </p>
        </section>

        {/* Tocho / free detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Free option</span>
          <h2 className={styles.sectionTitle}>Are there free observation decks in Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes: the Tokyo Metropolitan Government Building in Shinjuku is free and 202 m up, and Ebisu Garden
            Place Tower&apos;s SKY LOUNGE is free too (checked {RECHECKED}). The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has an observation room on the 45th
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
            Yes. <strong>Azabudai Hills</strong> has no confirmed ticketed deck. Its official listing
            shows the Hills House Sky Room Cafe &amp; Bar on the 34th floor of Mori JP Tower, open 9:00–21:00 with
            no reservations and a view of Tokyo Tower. Treat it as a cafe with a view. Kamiyacho Station Exit 5
            connects directly. Checked {CHECKED}. Tokyo City View, Ebisu and the Bunkyo Civic Center are in the
            alternatives table above.
          </p>
        </section>

        {/* Who it's for / which to choose */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which to choose</span>
          <h2 className={styles.sectionTitle}>Who is each Tokyo observation deck for?</h2>
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
            viewpoints. Tokyo Tower&apos;s site does not mention the view, so it is not claimed here. No deck can
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

        {/* The rest of the day around a deck. The hotels, subway ticket and eSIM moved up
            under the comparison table (14 Nov 2026); the tours and transfer stay here. */}
        <KlookTripPrep
          label="The rest of the day"
          heading="What else fits around a Tokyo observation deck?"
          intro="A deck is one or two hours of one day. These three cover the daytime, the evening after a sunset slot, and the trip in from the airport."
          items={observationDecksDayExtras}
        />
        <p className={styles.bodyText}>
          Still choosing an area? Our{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
            where to stay in Tokyo guide
          </Link>{" "}
          compares them.
        </p>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Tokyo observation decks: common questions</h2>
          <div className={styles.faqList}>
            {[...faqItems, ...moreFaqItems].map((item, i) => (
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
