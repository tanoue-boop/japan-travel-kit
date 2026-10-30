import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import JrPassCalculator from "../../../components/JrPassCalculator";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  jrKansaiAreaPass,
  jrKansaiMiniPass,
  jrKansaiWideAreaPass,
  jrPassTripPrep,
  jrPassWholeJapan,
} from "../../../lib/klook-links";

// Merged 2026-10-09 with /guides/transport/jr-pass-worth-it. Both pages answered "is the JR
// Pass worth it" — the same query, with the same break-even arithmetic — and both sat outside
// the top 100 for it. Where their numbers disagreed, the figures from jr-pass-worth-it win:
// they carry the October 2023 price rise and the scheduled October 2026 one, which the
// itinerary table here predated (it still showed Tokyo+Kyoto+Osaka+Hiroshima as a clear win).
// Rewritten 30 Oct 2026 for the October price revision. The USD pass table this page used
// to carry is gone: every figure in it was a conversion of a pre-revision yen price, and a
// conversion is a number we cannot date. Everything is in yen now, which is the currency JR
// sets the pass and the fares in.

/**
 * The regional-pass section and the hotel/eSIM block below were added 26 Oct 2026.
 * The existing JR Pass CTA is unchanged — a JR Pass is a 2% "special activity" in
 * Klook's bands and was this page's only Klook link, so what is new here is the 5%
 * regional passes the same reader should be pricing instead, the 6.5% hotel searches
 * at the stations a pass itinerary stops at, and the 20% eSIM.
 *
 * Every yen figure in the new section is a JR company's own published price, read on
 * the date below. Nothing else is quoted: the Hakone Freepass is Odakyu's and the
 * Osaka Amazing Pass is not a rail pass at all, so both are linked to the guides that
 * carry their operators' figures rather than priced here.
 *
 *   japanrailpass.net   the JAPAN RAIL PASS price table — the online prices and     26 Oct 2026
 *                       the higher Exchange Order prices at overseas agencies
 *   westjr.co.jp        WEST QR Kansai Area Pass prices and HARUKA allowance; the   26 Oct 2026
 *                       WEST QR Kansai Mini Pass price and its limited-express
 *                       rule; the Kansai WIDE Area Pass price and what it adds;
 *                       the end of sales of the earlier Kansai Area Pass
 *
 * JR East's pass pages answer automated reads with HTTP 403, so no JR East figure
 * appears here. No Klook price appears either, for the usual reason.
 */
const PASS_CHECKED = checkedLabel("2026-10-26");

/**
 * The October 2026 price revision, read 30 Oct 2026 and the reason this page was rewritten.
 *
 * Source of every JAPAN RAIL PASS figure below:
 *
 *   japanrailpass.net/en/purchase/price/   the JR Group's own price page. It carries two    30 Oct 2026
 *                                         tables, both headed "Prices of Exchange Orders"
 *                                         — one for buying online, one for buying at an
 *                                         overseas sales office — plus the note "Prices are
 *                                         subject to change. In that case, the price
 *                                         indicated as of purchasing online or issuing the
 *                                         Exchange Order will apply."
 *
 * What the official page shows, and what it does not:
 *
 *   - Overseas agency / Exchange Order:  Ordinary ¥53,000 / ¥84,000 / ¥105,000 (child
 *     ¥27,000 / ¥42,000 / ¥53,000); Green ¥74,000 / ¥116,000 / ¥147,000 (child ¥37,000 /
 *     ¥58,000 / ¥74,000). These are the revised, post-1-October figures.
 *   - Bought online on the official site:  Ordinary ¥50,000 / ¥80,000 / ¥100,000 (child
 *     ¥25,000 / ¥40,000 / ¥50,000); Green ¥70,000 / ¥110,000 / ¥140,000 (child ¥35,000 /
 *     ¥55,000 / ¥70,000). Still the pre-revision figures.
 *   - The page prints no revision notice, no "from 1 October 2026" date and no closing date
 *     for the online prices. So nothing here claims a deadline the JR Group has not published.
 *
 * JNTO (japan.travel) reports the revision as a single across-the-board rise — 7-day Ordinary
 * ¥50,000 → ¥53,000, 14-day ¥80,000 → ¥84,000, 21-day ¥100,000 → ¥105,000, Green ¥70,000 →
 * ¥74,000 / ¥110,000 → ¥116,000 / ¥140,000 → ¥147,000, child half-price throughout, effective
 * 1 October 2026 local time at the place of purchase — and adds that the official website keeps
 * the pre-October prices "for a limited time". Where JNTO and the JR Group disagree, the JR
 * Group's page wins: the revised prices below are shown as the agency channel's, and the
 * pre-revision prices as what the official website still charges. The "before" column is JNTO's
 * record of the announcement, labelled as such in the table footnote.
 */
const PRICE_CHECKED = checkedLabel("2026-10-30");

/**
 * Before and after the 1 October 2026 revision. "Before" is the price both channels charged;
 * "after" is the Exchange Order price an overseas agency or reseller charges now. The third
 * column is what the official website is still charging, read the same day.
 */
const priceRevision = [
  { car: "Ordinary", days: "7 days",  before: "¥50,000 (child ¥25,000)",  after: "¥53,000 (child ¥27,000)",  online: "¥50,000 (child ¥25,000)" },
  { car: "Ordinary", days: "14 days", before: "¥80,000 (child ¥40,000)",  after: "¥84,000 (child ¥42,000)",  online: "¥80,000 (child ¥40,000)" },
  { car: "Ordinary", days: "21 days", before: "¥100,000 (child ¥50,000)", after: "¥105,000 (child ¥53,000)", online: "¥100,000 (child ¥50,000)" },
  { car: "Green",    days: "7 days",  before: "¥70,000 (child ¥35,000)",  after: "¥74,000 (child ¥37,000)",  online: "¥70,000 (child ¥35,000)" },
  { car: "Green",    days: "14 days", before: "¥110,000 (child ¥55,000)", after: "¥116,000 (child ¥58,000)", online: "¥110,000 (child ¥55,000)" },
  { car: "Green",    days: "21 days", before: "¥140,000 (child ¥70,000)", after: "¥147,000 (child ¥74,000)", online: "¥140,000 (child ¥70,000)" },
];

/**
 * JR-published prices only, adult unless stated. The JR Pass row is the yardstick
 * the other three are measured against, which is why it is first.
 */
const regionalPassRows = [
  {
    pass: "JAPAN RAIL PASS, Ordinary",
    operator: "JR Group",
    price: "¥53,000 / ¥84,000 / ¥105,000 as an Exchange Order from an overseas agency since 1 October 2026; still ¥50,000 / ¥80,000 / ¥100,000 bought on the official website",
    length: "7 / 14 / 21 days",
    adds: "Nationwide JR, most shinkansen (not Nozomi or Mizuho), JR buses and the Miyajima ferry",
  },
  {
    pass: "WEST QR Kansai Area Pass",
    operator: "JR West",
    price: "¥2,700 / ¥4,700 / ¥5,500 / ¥6,700",
    length: "1 / 2 / 3 / 4 consecutive days",
    adds: "JR West ordinary, rapid and special rapid trains around Kansai, plus unlimited HARUKA non-reserved seats and two reserved HARUKA seats. No shinkansen at any length",
  },
  {
    pass: "WEST QR Kansai Mini Pass",
    operator: "JR West",
    price: "¥3,000 (child ¥1,500)",
    length: "3 consecutive days",
    adds: "Ordinary, rapid and special rapid trains only. JR West states it cannot be used on any limited express, the HARUKA included",
  },
  {
    pass: "Kansai WIDE Area Pass",
    operator: "JR West",
    price: "¥12,000 (child ¥6,000)",
    length: "5 consecutive days",
    adds: "Everything above plus reserved Sanyo Shinkansen seats between Shin-Osaka and Okayama, and the runs to Kinosaki Onsen, Shirahama and Takamatsu",
  },
];

/**
 * The current price by channel, both tables from japanrailpass.net on PRICE_CHECKED.
 * Adult first, child in brackets; "child" is 6 to 11 at the time of use on the JR
 * Group's own definition.
 */
const passTypes = [
  { type: "Ordinary",          duration: "7 days",  agency: "¥53,000 (¥27,000)",  online: "¥50,000 (¥25,000)" },
  { type: "Ordinary",          duration: "14 days", agency: "¥84,000 (¥42,000)",  online: "¥80,000 (¥40,000)" },
  { type: "Ordinary",          duration: "21 days", agency: "¥105,000 (¥53,000)", online: "¥100,000 (¥50,000)" },
  { type: "Green (1st class)", duration: "7 days",  agency: "¥74,000 (¥37,000)",  online: "¥70,000 (¥35,000)" },
  { type: "Green (1st class)", duration: "14 days", agency: "¥116,000 (¥58,000)", online: "¥110,000 (¥55,000)" },
  { type: "Green (1st class)", duration: "21 days", agency: "¥147,000 (¥74,000)", online: "¥140,000 (¥70,000)" },
];

/**
 * Recalculated 30 Oct 2026 against ¥53,000 rather than ¥50,000, and the rise moves two
 * rows. Every total is the sum of the one-way reference fares in data/jr-fares.json, which
 * is our own JR dataset of rounded Hikari/Sakura reserved-seat fares as of September 2026,
 * not an operator price table — the one exception is Tokyo ⇄ Kyoto at ¥13,970 each way,
 * which is a confirmed figure. The arithmetic, so the table can be checked:
 *
 *   Golden Route     13,970 + 580 + 14,720                  = ¥29,270
 *   Kyoto+Hiroshima  13,970 + 11,400 + 19,080               = ¥44,450
 *   Big loop         14,380 + 8,420 + 11,400 + 19,080       = ¥53,280
 *   Kyushu + Tohoku  23,390 ×2 + 11,410 ×2                  = ¥69,600
 */
const itineraries = [
  { route: "Tokyo only", fares: "~¥0 intercity JR", verdict: "Skip", win: false },
  { route: "Kansai only (Kyoto / Osaka / Nara / Kobe)", fares: "~¥3,000–¥6,000", verdict: "Skip", win: false },
  { route: "Golden Route round trip (Tokyo → Kyoto → Osaka → Tokyo)", fares: "~¥29,300", verdict: "Skip — ¥23,700 cheaper individually", win: false },
  { route: "Tokyo → Kyoto → Hiroshima → Tokyo (one loop)", fares: "~¥44,500", verdict: "Skip — ¥8,500 short of the pass", win: false },
  { route: "Tokyo → Kanazawa → Kyoto → Hiroshima → Tokyo", fares: "~¥53,300", verdict: "Borderline — clears ¥53,000 by ¥300", win: false },
  { route: "Tokyo ⇄ Hakata (Fukuoka) plus Tokyo ⇄ Sendai", fares: "~¥69,600", verdict: "✓ Worth it", win: true },
  { route: "Multi-region (Tokyo + Tohoku / Hokkaido / Kyushu)", fares: "~¥70,000+", verdict: "✓ Worth it", win: true },
];

const buyIt = [
  "You're compressing several long-distance legs into one week (e.g. Tokyo–Hiroshima–Kanazawa)",
  "Your trip reaches far regions — Hokkaido, Tohoku, or Kyushu — by rail",
  "You'll backtrack a lot (out-and-back day trips on the Shinkansen)",
  "You value the flexibility of hopping on any covered train without buying tickets each time",
];

const skipIt = [
  "You're staying in Tokyo, or only in the Kansai region (Kyoto/Osaka/Nara)",
  "You're doing the classic Golden Route once (Tokyo–Kyoto–Osaka and back)",
  "You only make one or two intercity trips total",
  "Your longest hops are better flown (Tokyo–Sapporo, Tokyo–Fukuoka)",
];

const alternatives = [
  {
    name: "Individual Shinkansen tickets",
    bestFor: "1–2 intercity trips, including the Golden Route",
    desc: "Buy at station machines, ticket counters, or via Smart EX/EkiNet. For a single Tokyo–Kyoto round trip (~¥27,940 on the Hikari) you pay less than half the ¥53,000 a 7-day pass now costs from an agency. You can also pay the Nozomi supplement (~¥4,960 each way Tokyo–Kyoto) for the fastest service.",
  },
  {
    name: "Regional JR passes",
    bestFor: "Travel concentrated in one area",
    desc: "Cheaper, area-limited passes often beat the national pass: the Kansai WIDE Area Pass (Kyoto/Osaka/Himeji/Okayama), the JR Kyushu Rail Pass, and the Hokuriku Arch Pass (Tokyo–Kanazawa–Osaka). If your trip stays in one region, price these first.",
  },
  {
    name: "Domestic flights",
    bestFor: "Very long hops",
    desc: "For Tokyo–Sapporo or Tokyo–Fukuoka, low-cost carriers (Peach, Jetstar, ANA/JAL specials) are usually cheaper and faster than rail. Book early for the best fares and factor in airport transfer time.",
  },
];

const covered = [
  "Most Shinkansen (Hikari, Sakura, Kodama — not Nozomi/Mizuho)",
  "All JR local and express trains nationwide",
  "JR bus lines",
  "Miyajima Ferry (Hiroshima)",
];

const notCovered = [
  "Nozomi and Mizuho Shinkansen (fastest services)",
  "Tokyo Metro and city subways",
  "Private railways (Kintetsu, Hankyu, etc.)",
];

const steps = [
  {
    title: "Decide which channel first — it is a ¥3,000 decision",
    desc: `The JR Pass cannot be bought inside Japan, so this happens before you fly. Since 1 October 2026 a JR-designated agency or reseller charges ¥53,000 for the 7-day Ordinary pass; the JR Group's own site still charges ¥50,000 for the same pass, read on ${PRICE_CHECKED}. Resellers are not undercutting each other — the agency price is fixed by JR — so the only saving available is choosing the official site, and the only reason not to is if you want a reseller's own checkout, currency or support.`,
  },
  {
    title: "Receive your Exchange Order by mail or email",
    desc: "This is not the pass itself — it's a voucher. Keep it safe. You'll exchange it at a JR Travel Service Center on arrival in Japan. Both channels issue one: the JR Group's own price page heads its online table and its overseas table alike “Prices of Exchange Orders”.",
  },
  {
    title: "Exchange at a JR Travel Service Center at the airport",
    desc: "Available at Narita, Haneda, Osaka Itami, and all major stations. Show your passport and Exchange Order. Takes around 15 minutes.",
  },
  {
    title: "Show your pass at staffed ticket gates",
    desc: "Use the wide staffed gates — not the IC card barriers. For reserved Shinkansen seats (free with the pass), book at any JR ticket counter.",
  },
];

const tips = [
  {
    title: "Reserve seats — they're free",
    desc: "Seat reservations on Shinkansen are included with the JR Pass. Reserve at any JR ticket counter or via JR Smart EX to guarantee your seat on busy routes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Take Hikari, not Nozomi",
    desc: "The Nozomi and Mizuho are not covered. Hikari and Sakura services are covered and arrive only 10–15 minutes later on most routes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    ),
  },
  {
    title: "Pair with an IC card for city travel",
    desc: "The JR Pass only covers JR lines. Load a Suica or Pasmo with ¥3,000–5,000 for Tokyo Metro, the Osaka Metro, buses, and convenience stores.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "How much is the JR Pass in 2026?",
    a: `Since 1 October 2026 the nationwide adult Ordinary pass is ¥53,000 for 7 days, ¥84,000 for 14 days and ¥105,000 for 21 days as an Exchange Order from a JR-designated agency outside Japan — the channel every reseller sells through. Green Car is ¥74,000, ¥116,000 and ¥147,000. Children aged 6 to 11 pay half. The JR Group's own price page still lists the pre-revision prices for a pass bought on the official website — ¥50,000, ¥80,000 and ¥100,000 Ordinary, ¥70,000, ¥110,000 and ¥140,000 Green — and publishes no closing date for them. Read on japanrailpass.net, ${PRICE_CHECKED}.`,
  },
  {
    q: "How much does the JR Pass cost after the October 2026 price increase?",
    a: `¥3,000 to ¥7,000 more, depending on the pass. On JNTO's record of the JR Group announcement, the adult Ordinary pass went from ¥50,000 to ¥53,000 (7 days), ¥80,000 to ¥84,000 (14 days) and ¥100,000 to ¥105,000 (21 days); Green Car from ¥70,000 to ¥74,000, ¥110,000 to ¥116,000 and ¥140,000 to ¥147,000; child prices from ¥25,000 to ¥27,000, ¥40,000 to ¥42,000 and ¥50,000 to ¥53,000. The rise took effect on 1 October 2026, local time where you buy. On the JR Group's own price page, read ${PRICE_CHECKED}, those revised figures appear in the overseas-agency table only — the online table still shows the old prices.`,
  },
  {
    q: "Can I still buy the JR Pass at the old price?",
    a: `On the JR Group's own site, yes — as things stand. Read on ${PRICE_CHECKED}, japanrailpass.net still lists ¥50,000, ¥80,000 and ¥100,000 for the 7-, 14- and 21-day adult Ordinary pass bought online, the pre-revision prices, against ¥53,000, ¥84,000 and ¥105,000 for an Exchange Order from an overseas agency. JNTO describes this as the official website keeping the pre-October prices "for a limited time". No closing date appears on the official page, and the page's own caveat is that "prices are subject to change", in which case "the price indicated as of purchasing online or issuing the Exchange Order will apply" — so the old price is the price on the day you pay, not a reservation you can hold. If the ¥3,000 matters to your break-even, it is not a decision to leave for later.`,
  },
  {
    q: "Is the JR Pass cheaper online?",
    a: `Yes, by ¥3,000 to ¥7,000. The JR Group's own price table gives ¥50,000, ¥80,000 and ¥100,000 for the 7-, 14- and 21-day adult Ordinary pass bought online, against ¥53,000, ¥84,000 and ¥105,000 for an Exchange Order issued by an overseas JR-designated agency. Green Car follows the same pattern: ¥70,000 online against ¥74,000 for 7 days, ¥140,000 against ¥147,000 for 21. Read on ${PRICE_CHECKED}. Prices are set by JR in both channels, so no reseller is undercutting another — the agency channel is simply the more expensive of the two since the October revision, and a reseller is worth its premium only for its own checkout, currency or support.`,
  },
  {
    q: "Is the JR Pass worth it in 2026?",
    a: `For most travellers, no — and less often than before October 2026. The 7-day Ordinary pass went from ¥29,650 to ¥50,000 in October 2023 and from ¥50,000 to ¥53,000 in October 2026, so you now need roughly ¥53,000 of covered JR travel in a week to get your money back (¥50,000 if you buy on the official site). On our own JR reference fares, the Golden Route — Tokyo, Kyoto, Osaka and back — is about ¥29,300, and even Tokyo → Kyoto → Hiroshima → Tokyo comes to about ¥44,500, ¥8,500 short. The October rise pushed a route that used to clear the bar below it: adding Kanazawa to that loop reaches about ¥53,300, which beats ¥53,000 by ¥300 rather than ¥50,000 by ¥3,300. The pass wins when a trip strings several regions together — Kyushu plus Tohoku in one week comes to about ¥69,600.`,
  },
  {
    q: "How do I work out whether the JR Pass is worth it for my trip?",
    a: "Add up the individual reserved-seat fares for the JR-covered trains you will actually ride and compare the total with the pass price (¥53,000 for 7 days, ¥84,000 for 14, ¥105,000 for 21 from an agency; ¥50,000, ¥80,000 and ¥100,000 on the official site). The calculator on this page does it for you: tick your legs — for example Tokyo–Kyoto ¥13,970 one-way, Tokyo–Hiroshima ¥19,080, Tokyo–Kanazawa ¥14,380 — mark any round trips, and it shows the saving or the shortfall against the agency price. Only JR-operated trains, JR buses and the Miyajima ferry count; subways and private railways don't.",
  },
  {
    q: "Can I use the JR Pass on the Shinkansen?",
    a: "Yes — but not on the Nozomi or Mizuho (the fastest services on the Tokaido and Sanyo lines). The next-fastest options — Hikari and Sakura — are fully covered and add only 10–15 minutes on most journeys. On the Tohoku, Hokuriku, and Kyushu Shinkansen lines, almost all services are covered.",
  },
  {
    q: "Does the JR Pass cover the Tokyo–Kyoto bullet train?",
    a: "Yes — on the Hikari and Kodama services (about ¥13,970 one-way, ¥27,940 round trip). It does not cover the faster Nozomi without paying a separate supplement (around ¥4,960 each way Tokyo–Kyoto). A single Golden Route round trip on covered trains costs roughly ¥29,300, well under the ¥53,000 a 7-day pass costs from an agency and under the ¥50,000 it costs online — so the pass does not pay off for that trip alone either way.",
  },
  {
    q: "Where can I buy the JR Pass?",
    a: "You must purchase the JR Pass outside Japan — either on the JR Group's own site at japanrailpass.net or through an authorised reseller. Prices are set by JR, so no reseller is cheaper than another, but since 1 October 2026 the reseller channel is ¥3,000 to ¥7,000 dearer than the official site. After purchase you receive an Exchange Order, which you redeem at a JR Travel Service Center in Japan, available at major airports and stations.",
  },
  {
    q: "Who is allowed to buy the JR Pass?",
    a: "The JR Pass is for foreign tourists visiting Japan on a short-term \"Temporary Visitor\" entry status. It is not available to residents or long-stay visa holders. You'll need to show your passport with the Temporary Visitor stamp when you exchange your voucher for the pass in Japan.",
  },
  {
    q: "Can I use the JR Pass on the Tokyo subway?",
    a: "No. The JR Pass only covers JR-operated lines. Tokyo Metro and Toei Subway are separate operators and are not covered. Load an IC card (Suica or Pasmo) with cash for all subway, city bus, and private rail travel.",
  },
  {
    q: "What's the difference between Ordinary and Green (1st class)?",
    a: "Green class offers wider seats with a deeper recline and quieter carriages — equivalent to business class. Ordinary class is already comfortable by international standards and is the right choice for most tourists. Green is worth considering for very long journeys or if you plan many long-distance Shinkansen trips.",
  },
  // Added 26 Oct 2026 with the regional-pass section, so the FAQPage markup carries the
  // question that section answers. Its pair, "Should I buy the JR Pass online or from an
  // agency?", was folded into "Is the JR Pass cheaper online?" above on 30 Oct 2026 — same
  // answer, and the shorter form is the one readers actually type.
  {
    q: "Is a regional pass cheaper than the JR Pass?",
    a: `Almost always, if your trip stays in one region. On the operators' own prices, read on ${PASS_CHECKED}: JR West's WEST QR Kansai Area Pass is ¥2,700 for one day and ¥6,700 for four, the WEST QR Kansai Mini Pass is ¥3,000 for three consecutive days, and the Kansai WIDE Area Pass is ¥12,000 for five. A 7-day nationwide Ordinary JR Pass is ¥53,000 from an agency since 1 October 2026, or ¥50,000 online, so the four-day Kansai pass is roughly an eighth of it. The catch is coverage, not price: the Kansai Area Pass includes unlimited non-reserved HARUKA seats but no shinkansen at any length, the Mini Pass cannot be used on any limited express including the HARUKA, and only the WIDE pass adds reserved Sanyo Shinkansen seats between Shin-Osaka and Okayama. Price the cheaper pass against the places you are actually going before you look at the national one.`,
  },
];

const TITLE = "JR Pass Cost 2026: New Prices & Is It Worth It?";
const DESC =
  "JR Pass cost after the October 2026 price increase: ¥53,000 for 7 days, ¥84,000 for 14, ¥105,000 for 21 — plus a break-even calculator for your route.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/jr-pass-guide") } });

export default function JrPassGuidePage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/jr-pass-guide" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/jr-pass-guide" />
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
              route: "/guides/transport/jr-pass-guide",
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
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "JR Pass Guide", item: "https://www.japan-travel-kit.com/guides/transport/jr-pass-guide" },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>JR Pass Guide</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            JR Pass Cost 2026: New Prices<br />After the October Increase
          </h1>
          <p className={styles.heroSubtitle}>
            The 7-day Ordinary pass went to ¥53,000 on 1 October 2026 — and the official JR site is still
            selling it for ¥50,000. Here are both prices, confirmed, then the honest maths on whether
            either one beats buying tickets.
          </p>
          <div className={styles.heroBadges}>
            {["October 2026 Prices", "Break-Even Calculator", "Cheaper Alternatives"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>The Honest Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>
                From 1 October 2026 the adult Ordinary JR Pass costs ¥53,000 for 7 days, ¥84,000 for 14 days
                and ¥105,000 for 21 days
              </strong>{" "}
              as an Exchange Order from an overseas agency — the channel every reseller sells through. The JR
              Group&apos;s own site is still charging the pre-revision ¥50,000 / ¥80,000 / ¥100,000, read on{" "}
              {PRICE_CHECKED}. A Tokyo ⇄ Kyoto round trip alone does not come close to earning either price
              back (about ¥27,940 against ¥53,000); a week that strings several regions together — Kyushu plus
              Tohoku, say, at about ¥69,600 of covered fares — does.
            </p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>7-day price, agency</p>
                <p className={styles.verdictStatValue}>¥53,000 (Ordinary, adult)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>7-day price, official site</p>
                <p className={styles.verdictStatValue}>¥50,000 — old price, no end date given</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Worth it if</p>
                <p className={styles.verdictStatValue}>Several long-distance legs in 7 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Not worth it if</p>
                <p className={styles.verdictStatValue}>Tokyo only, Kansai only, or Golden Route</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> for the typical first-timer doing Tokyo, Kyoto and Osaka, the JR
              Pass costs <em>more</em> than buying tickets individually, and ¥3,000 more than it did in
              September. The October rise also pushed one route that used to pay off below the line — Tokyo →
              Kanazawa → Kyoto → Hiroshima → Tokyo now clears ¥53,000 by about ¥300. Run your own route through
              the calculator before you decide.
            </p>
            <a href="#jr-pass-calculator" className={styles.verdictBtn}>
              Run the numbers for my route ↓
            </a>
          </div>
        </div>

        {/*
          How much is the JR Pass — the question this page is read for, answered before anything
          else and before the calculator, with both channels' prices and the before/after table.
          Added 30 Oct 2026 with the price revision.
        */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The price</span>
          <h2 className={styles.sectionTitle}>How Much Is the JR Pass in 2026?</h2>
          <p className={styles.bodyText}>
            <strong>
              ¥53,000 for 7 days, ¥84,000 for 14 and ¥105,000 for 21, adult Ordinary car, bought as an
              Exchange Order from a JR-designated agency outside Japan.
            </strong>{" "}
            Green Car is ¥74,000, ¥116,000 and ¥147,000. Children aged 6 to 11 pay half. Those are the prices
            in force since the revision on 1 October 2026, and they are what Klook and every other reseller
            charges, because JR sets the figure and no seller can discount it.
          </p>
          <p className={styles.bodyText}>
            There is a second, cheaper price, and the JR Group publishes it on the same page: a pass bought on
            the official site is still <strong>¥50,000 / ¥80,000 / ¥100,000</strong> Ordinary and ¥70,000 /
            ¥110,000 / ¥140,000 Green — the pre-revision figures. Both tables were read on {PRICE_CHECKED}.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.75rem" }}>
            How much does the JR Pass cost after the October 2026 price increase?
          </h3>
          <p className={styles.bodyText}>
            Between ¥3,000 and ¥7,000 more than before, about 5 to 6 per cent across the range. The table below
            is the whole revision: what each pass cost until 30 September 2026, what an agency charges for it
            now, and what the official site is still charging.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Length", "Until 30 Sep 2026", "From 1 Oct 2026 (agency)", "Official site now"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRevision.map((row) => (
                    <tr key={`${row.car}-${row.days}`}>
                      <td className={styles.tdProvider}>{row.car}</td>
                      <td style={{ whiteSpace: "nowrap", fontSize: "0.88rem" }}>{row.days}</td>
                      <td style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>{row.before}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>{row.after}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent)" }}>{row.online}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Adult price first, child (6–11) in brackets. The last two columns are the JR Group&apos;s own two
            price tables on japanrailpass.net, read {PRICE_CHECKED} — one for an Exchange Order issued at an
            overseas sales office, one for buying online. The &ldquo;until 30 Sep 2026&rdquo; column is JNTO&apos;s
            record of the JR Group announcement of the revision, since the official page only ever shows
            today&apos;s price. The official page carries no revision notice and no deadline of its own; its
            only caveat is that &ldquo;prices are subject to change&rdquo;, in which case &ldquo;the price
            indicated as of purchasing online or issuing the Exchange Order will apply&rdquo;.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.75rem" }}>
            Can I still buy the JR Pass at the old price?
          </h3>
          <p className={styles.bodyText}>
            <strong>On the JR Group&apos;s own site, yes — as things stand on {PRICE_CHECKED}.</strong> The
            online column above is the pre-revision price, and the JR Group has published no closing date for
            it; JNTO describes the arrangement as the official website holding the pre-October prices &ldquo;for
            a limited time&rdquo;. Treat it as exactly that. The price that applies is the one shown on the day
            you pay — the official page says so in as many words — so it is not a rate you can reserve and come
            back to. From an overseas agency the old price is already gone: that channel moved on 1 October,
            local time where you buy.
          </p>

          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.75rem" }}>
            Is the JR Pass cheaper online?
          </h3>
          <p className={styles.bodyText}>
            <strong>Yes, by ¥3,000 on the 7-day pass and up to ¥7,000 on a 21-day Green.</strong> That is the
            whole of the difference between the two columns, and it is the only saving on offer anywhere: the
            price is JR&apos;s in both channels, so no reseller undercuts another. What a reseller sells you
            instead is its own checkout — your currency, your payment method, its support if something goes
            wrong, and in Klook&apos;s case the regional passes and the shinkansen seats in the same basket.
            That is worth ¥3,000 to some readers and nothing at all to others. If it is worth nothing to you,
            buy direct.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Price the JR Pass on Klook →
            </KlookLink>
            <KlookLink href={jrKansaiWideAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or the Kansai WIDE pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Those two links go to Klook, which pays us a commission at no extra cost to you. No Klook price
            appears on this page: its product pages block automated checks, so every figure above is the JR
            Group&apos;s own.
          </p>
        </section>

        {/* What Is the JR Pass? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the JR Pass?</h2>
          <p className={styles.bodyText}>
            The JR Pass (Japan Rail Pass) is a fixed-price rail pass available exclusively to foreign tourists visiting Japan on a temporary visitor visa. It covers unlimited travel on trains, buses, and some ferries operated by Japan Railways Group — the national rail operator.
          </p>
          <p className={styles.bodyText}>
            The pass covers most Shinkansen (bullet trains), all JR local and express trains, JR bus routes, and even the Miyajima Ferry in Hiroshima. One critical rule: <strong>the JR Pass cannot be purchased inside Japan</strong>. You must buy it before arrival and exchange your voucher at a JR Travel Service Center on arrival.
          </p>
          <p className={styles.bodyText}>
            The JR Pass was introduced in 1981 to attract foreign tourists. Today it remains one of the most popular travel products for visitors — but after the 2023 price rise and the smaller one on 1 October 2026, whether it saves you anything depends entirely on your itinerary.
          </p>
        </section>

        {/* Calculator */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Calculator</span>
          <h2 className={styles.sectionTitle}>Does the JR Pass Pay Off for Your Route?</h2>
          <p className={styles.bodyText}>
            Tick the long-distance JR legs you&apos;ll actually ride, choose a pass length, and the calculator compares the
            total of individual reserved-seat tickets against the pass price — instantly, no sign-up. Mark the legs you
            will travel in both directions as round trips, and leave out subways, private railways and city buses: the
            pass never covers them, so they can&apos;t count toward break-even.
          </p>
          <JrPassCalculator />
        </section>

        {/* Conclusion first */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Start here</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It in 2026?</h2>
          <p className={styles.bodyText}>
            <strong>For most travellers, no — and for slightly fewer than before October 2026.</strong> To earn
            a 7-day pass back you need about <strong>¥53,000 of covered JR travel</strong> in a week if you buy
            from an agency, ¥50,000 if you buy on the official site. The classic Golden Route — Tokyo, Kyoto and
            Osaka and back — adds up to roughly ¥29,300 in covered Shinkansen fares, so buying those tickets
            individually saves you well over ¥20,000.
          </p>
          <p className={styles.bodyText}>
            The JR Pass used to be a near-automatic buy. That changed in <strong>October 2023</strong>, when the
            7-day Ordinary pass jumped from <strong>¥29,650 to ¥50,000</strong> — a roughly 70% increase
            overnight — and it tightened again on <strong>1 October 2026</strong>, when the agency price went to
            ¥53,000. The second rise is small next to the first, but it is enough to move a real itinerary:
            Tokyo → Kanazawa → Kyoto → Hiroshima → Tokyo came to about ¥53,300 of covered fares, which used to
            clear ¥50,000 by ¥3,300 and now clears ¥53,000 by ¥300. A route that was a comfortable yes is a
            coin toss.
          </p>
          <p className={styles.bodyText}>
            The pass still wins for one specific traveller: someone covering long distances and several regions in
            a short window. The sections below show exactly where the line falls — then, if your route clears it,
            how to buy and use a pass.
          </p>
        </section>

        {/* Break-even thinking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The math</span>
          <h2 className={styles.sectionTitle}>How to Work Out Your Own Break-Even</h2>
          <p className={styles.bodyText}>
            Forget rules of thumb and do the only calculation that matters: add up the individual fares for
            the JR trips you&apos;d actually take, then compare to the pass price. The pass is worth it only if
            your total exceeds it.
          </p>
          <ul className={styles.bodyList}>
            <li>Tokyo ⇄ Kyoto on the Hikari: about <strong>¥13,970 one-way</strong>, <strong>¥27,940 round trip</strong>.</li>
            <li>The faster Nozomi isn&apos;t covered — it needs a supplement (about <strong>¥4,960 each way</strong> Tokyo–Kyoto), so the pass forces you onto the slightly slower Hikari anyway.</li>
            <li>City subways, private railways, and most buses are <strong>never</strong> covered, so they don&apos;t count toward your total.</li>
            <li>From an agency the 7-day pass is <strong>¥53,000</strong>; 14-day <strong>¥84,000</strong>; 21-day <strong>¥105,000</strong> (Green Car ¥74,000 / ¥116,000 / ¥147,000).</li>
            <li>On the official site the same passes are still <strong>¥50,000 / ¥80,000 / ¥100,000</strong>, so pick your target before you add anything up — the bar moves by ¥3,000 to ¥5,000 depending on where you buy.</li>
          </ul>
          <p className={styles.bodyText}>
            Both sets of figures were read on japanrailpass.net on {PRICE_CHECKED}. The calculator below works
            against the agency price, because that is the one most readers are quoted; if you buy direct, your
            break-even is the lower number and anything within ¥3,000 of the bar flips in your favour.
          </p>
        </section>

        {/* Itinerary table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Real itineraries</span>
          <h2 className={styles.sectionTitle}>Does Your Itinerary Pay Off? (7-day pass, ¥53,000)</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Itinerary", "Covered JR fares", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itineraries.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{row.fares}</td>
                      <td style={{ fontWeight: 700, color: row.win ? "var(--accent)" : "var(--text)" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Verdicts are against the ¥53,000 agency price in force since 1 October 2026; buy on the official
            site at ¥50,000 and the Kanazawa loop becomes a clearer yes while nothing else changes. Tokyo–Kyoto
            at ¥13,970 one way is a confirmed fare; the other totals are sums of the rounded reference fares in
            our own JR dataset, as of September 2026, for covered (Hikari/Sakura) services — not an operator
            price table. They will vary by route, season and seat reservations, so confirm current fares before
            deciding. Figures exclude non-covered subways, private rail, and the Nozomi supplement.
          </p>
        </section>

        {/* Buy / Skip */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>The verdict</span>
          <h2 className={styles.sectionTitle}>When to Buy It — and When to Skip It</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Buy the JR Pass if…</p>
              <ul className={styles.pickList}>
                {buyIt.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Skip it if…</p>
              <ul className={styles.pickList}>
                {skipIt.map((item) => (
                  <li key={item}><span className={styles.conIcon}>✗</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Alternatives */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>If you skip it</span>
          <h2 className={styles.sectionTitle}>Cheaper Alternatives to the JR Pass</h2>
          <p className={styles.bodyText}>
            If the pass doesn&apos;t pay off for your route, you have three solid options — often a mix is best:
          </p>
          <div className={styles.stepsList}>
            {alternatives.map((alt, i) => (
              <div key={alt.name} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{alt.name} <span style={{ fontWeight: 400, color: "var(--text-faint)" }}>— {alt.bestFor}</span></p>
                  <p className={styles.stepDesc}>{alt.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For a deeper look at buying single tickets and using the Shinkansen, see our{" "}
            <Link href="/guides/transport/shinkansen-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              Shinkansen guide
            </Link>{" "}
            and our{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Kyoto comparison
            </Link>.
          </p>
        </section>

        {/* Regional passes — the 5% Klook band, against the 2% the JR Pass itself pays. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Regional passes</span>
          <h2 className={styles.sectionTitle}>Is a Regional Pass Cheaper Than the JR Pass?</h2>
          <p className={styles.bodyText}>
            <strong>Almost always, if your trip stays in one region — and by a wide margin.</strong> Every
            price below is the operator&apos;s own, read on {PASS_CHECKED}. A four-day JR West Kansai Area
            Pass is ¥6,700, which is roughly an eighth of the ¥53,000 a 7-day nationwide Ordinary pass now
            costs from an agency; the five-day Kansai WIDE Area Pass, the one that adds Sanyo Shinkansen seats,
            is ¥12,000. The October 2026 revision was the nationwide pass, so the gap between it and these
            three is wider than it was in September. The question is never &ldquo;which pass is cheaper&rdquo;
            but whether the cheaper pass reaches the places you are going.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price (adult)", "Length", "What it covers"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {regionalPassRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>
                        {row.pass}
                        <span style={{ display: "block", fontWeight: 400, color: "var(--text-faint)", fontSize: "0.8rem" }}>
                          {row.operator}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.adds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            JAPAN RAIL PASS prices are from the JR Group&apos;s own price tables on japanrailpass.net, read on{" "}
            {PRICE_CHECKED}; the three JR West passes are from westjr.co.jp, read on {PASS_CHECKED}. Note the
            two JR Pass figures: buying online is ¥3,000 cheaper on the 7-day Ordinary pass than taking an
            Exchange Order from an overseas agency. One more change to know about — JR West ended sales of the earlier, non-QR
            Kansai Area Pass on 30 September 2026, at ¥2,800 to ¥7,000; passes bought by that date stay valid
            for their period, and the WEST QR version above is what is sold now, ¥100 to ¥300 less at every
            length.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things the table cannot show. First, the Kansai Mini Pass is the cheapest of the three but
            cannot carry you on the HARUKA, so it only beats the Area Pass if you are happy to do the airport
            run on the slow Kansai-Airport Rapid — our{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kansai Area Pass guide
            </Link>{" "}
            works that break-even through. Second, the passes most tourists actually need in a city are not
            JR products at all, so no JR Pass ever covers them: the{" "}
            <Link href="/guides/attractions/hakone-free-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Hakone Freepass
            </Link>{" "}
            is Odakyu&apos;s, the{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka Amazing Pass
            </Link>{" "}
            is a metro-and-admissions pass, and the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo Subway Ticket
            </Link>{" "}
            covers the two subway operators a JR Pass leaves out. Each of those guides carries its own
            operator&apos;s prices, which is why they are not reprinted here.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKansaiAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kansai Area Pass on Klook →
            </KlookLink>
            <KlookLink href={jrKansaiMiniPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kansai Mini Pass on Klook →
            </KlookLink>
            <KlookLink href={jrKansaiWideAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kansai WIDE pass on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Those three links go to Klook, which pays us a commission at no extra cost to you. We quote the
            JR companies&apos; own prices above rather than Klook&apos;s, because Klook&apos;s product pages
            block automated checks.
          </p>
        </section>

        {/* JR Pass Types & Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>JR Pass Types &amp; Prices</h2>
          <p className={styles.bodyText}>
            Six passes, two prices each. This is the same JR Group price page as the table above, laid out by
            pass rather than by the revision — the figure you will actually be quoted, in both channels, with
            the child price alongside it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass Type", "Duration", "Overseas agency", "Official site"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passTypes.map((p, i) => (
                    <tr key={i}>
                      <td className={styles.tdProvider}>{p.type}</td>
                      <td className={styles.tdNetwork}>{p.duration}</td>
                      <td className={styles.tdPrice}>{p.agency}</td>
                      <td className={styles.tdPrice} style={{ color: "var(--accent)" }}>{p.online}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Adult price first, child in brackets; JR defines a child as 6 to 11 at the time of use, with
            elementary-school pupils of 12 or over counted as adults. Both columns are the JR Group&apos;s own
            price tables on japanrailpass.net, read {PRICE_CHECKED}. No reseller discounts either figure — JR
            sets them — so the only choice that changes what you pay is which of the two columns you buy from.
          </p>
        </section>

        {/* What Does the JR Pass Cover? */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>What Does the JR Pass Cover?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Covered</p>
              <ul className={styles.pickList}>
                {covered.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Not Covered</p>
              <ul className={styles.pickList}>
                {notCovered.map((item) => (
                  <li key={item}><span className={styles.conIcon}>✗</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Because city transport is never covered, pair the pass with a{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Suica or Pasmo IC card
            </Link>{" "}
            for subways, buses and convenience stores.
          </p>
        </section>

        {/* How to Buy & Use the JR Pass */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Buy &amp; Use the JR Pass</h2>
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
          {/*
            The second JR Pass CTA, by the collection steps — the point at which a reader who has
            decided yes wants a basket. Klook's pass listings are the 5% band; a single shinkansen
            seat is 2%, which is why the alternatives section below links our own guides instead.
          */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Buy the JAPAN RAIL PASS on Klook →
            </KlookLink>
            <KlookLink href={jrKansaiAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or a Kansai Area Pass instead →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook sells the nationwide pass as a reseller, which is the agency column above rather than the
            official-site column — so decide which channel you want before you click. We do not quote
            Klook&apos;s own figure here: its product pages block automated checks, so the only prices on this
            page are the JR companies&apos;. Both links pay us a commission at no extra cost to you.
          </p>
        </section>

        {/* JR Pass Tips */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Pro tips</span>
          <h2 className={styles.sectionTitle}>JR Pass Tips</h2>
          <div className={styles.whoForGrid}>
            {tips.map((tip) => (
              <div key={tip.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{tip.icon}</div>
                <p className={styles.whoForTitle}>{tip.title}</p>
                <p className={styles.whoForDesc}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What the pass does not buy — hotels at 6.5%, the eSIM at 20%. */}
        <KlookTripPrep
          label="Booked alongside"
          heading="What Should You Book With Your JR Pass?"
          intro="A pass covers trains and nothing else, which makes the rest of a rail trip predictable: you need a bed at the station the shinkansen stops at, and you need data, because every reservation and delay notice lives on a web page."
          items={jrPassTripPrep}
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
            {/* Added 30 Oct 2026: the regional pass that beats this one outright on a Tokyo-only trip. */}
            <Link href="/guides/transport/tokyo-wide-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Tokyo Wide Pass (2026): Price, Coverage and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-to-tokyo-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M12 5v12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto to Tokyo Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Hiroshima Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka to Hiroshima Shinkansen: Times, Fares, Day Trip</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kanazawa" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kanazawa (2026): Kagayaki Times, Seats and Whether a Pass Pays</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/takayama-shirakawago-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 21V12l6-6 6 6v9" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Takayama and Shirakawa-go Tour (2026): Which Departure, and the Bus If You Go Alone</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-10-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 10 Day Itinerary (2026): 10 Days in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-free-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Free Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10h18M5 10V7l7-4 7 4v3" />
                  <path d="M6 10v10M18 10v10M3 20h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="7" r="2" />
                  <circle cx="18" cy="17" r="2" />
                  <path d="M8 7h6a4 4 0 0 1 0 8H10a4 4 0 0 0 0 8" transform="translate(0 -4)" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
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
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Pass pays off for your route?</h2>
            <p className={styles.ctaBannerDesc}>
              If your itinerary clears ¥53,000 of covered JR fares in a week, the 7-, 14- or 21-day pass is
              the version to price — in Ordinary or Green, with the regional passes next to it.
            </p>
            {/*
              Switched 30 Oct 2026 from the bare affiliate URL to the shared constant, so this banner
              and the two CTAs above point at the same listing and pick up the page's ad id.
            */}
            <KlookLink
              href={jrPassWholeJapan.url}
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="sponsored noopener"
            >
              View JR Pass Options →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
