import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import JrPassCalculator from "../../../components/JrPassCalculator";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  hokurikuArchPass,
  jrTokyoWidePass,
  jrKansaiAreaPass,
  jrKansaiMiniPass,
  jrKansaiWideAreaPass,
  jrPassTripPrep,
  jrPassWholeJapan,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

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
// First read 30 Oct 2026; re-read unchanged on 12 Nov 2026 (R05), which is the date shown.
const PRICE_CHECKED = checkedLabel("2026-11-12");

/**
 * 12 Nov 2026 (task-jtk-20261112-R05, rank fix for "jr pass price" / "jr rail pass price").
 * Read on 12 November 2026:
 *   japanrailpass.net/en/purchase/price/        both price tables unchanged from 30 Oct: online
 *                                               ¥50,000 / ¥80,000 / ¥100,000 (Green ¥70,000 /
 *                                               ¥110,000 / ¥140,000); Exchange Order ¥53,000 /
 *                                               ¥84,000 / ¥105,000 (Green ¥74,000 / ¥116,000 /
 *                                               ¥147,000); "Prices are subject to change"
 *   japanrailpass.net/en/use/special-ticket/    NOZOMI MIZUHO Ticket: Tokyo–Nagoya ¥4,180,
 *                                               Tokyo–Kyoto ¥4,960, Tokyo–Shin-Osaka ¥4,960,
 *                                               Tokyo–Hiroshima ¥6,500, Shin-Osaka–Hakata ¥4,960;
 *                                               sold from one month before boarding at JR
 *                                               stations; seat limits; refund fee ¥340 / ¥220
 *   jr-group.jp/hikari-ryokin/                  Hikari/Kodama fares "as of October 2026", regular
 *                                               season, reserved: Tokyo–Kyoto ¥13,850, Tokyo–
 *                                               Shin-Osaka ¥14,400, Shin-Osaka–Hiroshima ¥10,420
 *   japan.travel (JNTO news, 2026 price rise)   the 1 October 2026 rise and the official site
 *                                               keeping the old prices "for a limited time"
 * Carried with their own dates: Tokyo–Hiroshima ¥19,560 (Nozomi, Smart EX, JR West, read
 * 28 Oct 2026 for our Tokyo to Hiroshima guide — JR publishes no Hikari/Sakura through fare
 * table for this pair) and Tokyo–Kanazawa ¥14,400 (Kagayaki e-ticket, JR West, read 11 Nov
 * 2026 for our Tokyo to Kanazawa guide).
 * data/jr-fares.json still carries 13970 for Tokyo–Kyoto (the smartEX Nozomi figure) and is
 * left alone because ten other pages read it; the calculator labels its fares as reference
 * values, and the break-even table below uses the operator figures instead.
 */
const TODAY_ISO = "2026-11-12";
const TODAY = checkedLabel(TODAY_ISO);

function LastChecked({ date = TODAY_ISO, sources }: { date?: string; sources: { label: string; href: string }[] }) {
  return (
    <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
      Last checked: {date}. Official source{sources.length > 1 ? "s" : ""}:{" "}
      {sources.map((s, i) => (
        <span key={s.href}>
          {i > 0 ? "; " : ""}
          <a href={s.href} target="_blank" rel="noopener" style={{ color: "var(--text)", fontWeight: 600 }}>
            {s.label}
          </a>
        </span>
      ))}
      .
    </p>
  );
}

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const PASS_7 = 53000;

/** Official one-way fares used in the break-even table (see the R05 note above). */
const F = { kyoto: 13850, osaka: 14400, hiroshima: 19560, kanazawa: 14400 };

const breakEvenRows = [
  { trip: "Tokyo ⇄ Kyoto (Hikari, reserved)", fares: F.kyoto * 2, calc: `${yen(F.kyoto)} × 2` },
  { trip: "Tokyo ⇄ Osaka (Shin-Osaka, Hikari, reserved)", fares: F.osaka * 2, calc: `${yen(F.osaka)} × 2` },
  { trip: "Golden Route: Tokyo → Kyoto, Shin-Osaka → Tokyo", fares: F.kyoto + F.osaka, calc: `${yen(F.kyoto)} + ${yen(F.osaka)}` },
  { trip: "Tokyo ⇄ Hiroshima (Nozomi on Smart EX)", fares: F.hiroshima * 2, calc: `${yen(F.hiroshima)} × 2` },
  { trip: "Tokyo ⇄ Kanazawa (Kagayaki e-ticket)", fares: F.kanazawa * 2, calc: `${yen(F.kanazawa)} × 2` },
  { trip: "Tokyo ⇄ Kyoto and Tokyo ⇄ Kanazawa in one week", fares: F.kyoto * 2 + F.kanazawa * 2, calc: "the two returns above" },
  { trip: "Tokyo ⇄ Hiroshima and Tokyo ⇄ Kanazawa in one week", fares: F.hiroshima * 2 + F.kanazawa * 2, calc: "the two returns above" },
].map((r) => {
  const diff = r.fares - PASS_7;
  return {
    ...r,
    vs: diff >= 0 ? `${yen(diff)} more than the pass` : `${yen(-diff)} less than the pass`,
    verdict: diff >= 10000 ? "Buy the pass" : diff >= 0 ? "Borderline: pass by a little" : "Buy single tickets",
    win: diff >= 0,
  };
});

/** NOZOMI MIZUHO Ticket prices, japanrailpass.net, read TODAY. */
const nozomiRows = [
  { section: "Tokyo – Kyoto", price: "¥4,960" },
  { section: "Tokyo – Shin-Osaka", price: "¥4,960" },
  { section: "Tokyo – Hiroshima", price: "¥6,500" },
  { section: "Shin-Osaka – Hakata (Mizuho/Nozomi)", price: "¥4,960" },
  { section: "Tokyo – Nagoya", price: "¥4,180" },
];

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

// The 30 Oct 2026 itinerary table (sums of data/jr-fares.json reference fares) was replaced
// on 12 Nov 2026 by breakEvenRows above, which uses operator fares only.

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
    desc: "Buy at station machines, ticket counters, or via Smart EX/EkiNet. A Tokyo–Kyoto round trip on the Hikari is ¥27,700 at the window (¥13,850 each way, JR Group, as of October 2026), barely half the ¥53,000 a 7-day pass costs from an agency — and without a pass you can take the Nozomi on an ordinary ticket.",
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
    a: `The adult Ordinary JR Pass costs ¥53,000 for 7 days, ¥84,000 for 14 days and ¥105,000 for 21 days when bought from a JR-designated agency outside Japan, the prices in force since 1 October 2026. The Green Car pass is ¥74,000, ¥116,000 and ¥147,000, and children aged 6 to 11 pay about half. The JR Group's own site, japanrailpass.net, still sells the same passes for ¥50,000, ¥80,000 and ¥100,000 (Green ¥70,000, ¥110,000 and ¥140,000) and publishes no end date for that. Read on japanrailpass.net, ${TODAY}.`,
  },
  {
    q: "Is the JR Pass worth it for Tokyo, Kyoto and Osaka?",
    a: `No. Tokyo to Kyoto on the Hikari is ¥13,850 one way and Shin-Osaka to Tokyo ¥14,400 (JR Group, as of October 2026), so the whole Golden Route is about ¥28,250 in shinkansen fares, ¥24,750 less than a ¥53,000 7-day pass. A 7-day pass starts to pay off only when the covered JR fares in that week pass ¥53,000 (¥50,000 if you buy on the official site), for example Tokyo ⇄ Hiroshima plus Tokyo ⇄ Kanazawa at about ¥67,920.`,
  },
  {
    q: "Can I use the JR Pass on the Nozomi?",
    a: `Only with an extra ticket. The JR Pass covers the Hikari, Kodama and Sakura but not the Nozomi or Mizuho; for those you buy a NOZOMI MIZUHO Ticket for each ride, ¥4,960 Tokyo–Kyoto or Tokyo–Shin-Osaka and ¥6,500 Tokyo–Hiroshima. It is sold at JR stations in Japan from one month before boarding, seats are limited, and refunds before travel cost ¥340 (reserved) or ¥220 (non-reserved). Read on japanrailpass.net, ${TODAY}.`,
  },
  {
    q: "Where should I buy the JR Pass?",
    a: `On the official site if price is all that matters: japanrailpass.net sells the 7-day Ordinary pass for ¥50,000 against ¥53,000 from an overseas agency or reseller, a ¥3,000 to ¥7,000 difference across the range. JR sets both prices, so no reseller undercuts another. Buy from a reseller such as Klook only if you want its checkout, currency or support, or want to add a regional pass in the same basket. Either way the price is the one shown on the day you pay, and you collect the pass in Japan on your passport.`,
  },
  {
    q: "Is a regional pass cheaper than the JR Pass?",
    a: `Almost always, if your trip stays in one region. On JR West's own prices, read ${PASS_CHECKED}, the WEST QR Kansai Area Pass is ¥2,700 for one day and ¥6,700 for four, and the Kansai WIDE Area Pass is ¥12,000 for five days; JR West's Hokuriku Arch Pass, Tokyo to Kanazawa and Tsuruga for seven consecutive days, is ¥35,000. A 7-day nationwide pass is ¥53,000 from an agency. Check that the cheaper pass reaches the places you are going: the Kansai Area Pass covers no shinkansen, and the Hokuriku Arch Pass excludes the Tokaido Shinkansen.`,
  },
];

const TITLE = "JR Pass Price 2026: 7, 14 & 21-Day Costs and Is It Worth It?";
const DESC =
  "JR Pass price 2026: ¥53,000 for 7 days, ¥84,000 for 14, ¥105,000 for 21 (Green from ¥74,000). A Tokyo–Kyoto return is ¥27,700, so see which routes pay off.";

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
            JR Pass Price 2026: 7, 14 &amp; 21-Day Costs<br />and Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            Both JR Pass prices after the 1 October 2026 revision, the official fares they have to beat, and
            the Nozomi ticket the pass does not include.
          </p>
          <div className={styles.heroBadges}>
            {["October 2026 Prices", "Break-Even Table", "Nozomi Supplement"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first (12 Nov 2026, R05): the first body paragraph is the complete answer. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              The JR Pass price in 2026 is ¥53,000 for 7 days, ¥84,000 for 14 days and ¥105,000 for 21 days
              for an adult Ordinary car pass bought from an overseas agency, the prices JR set on 1 October 2026;
              the JR Group&apos;s own website still sells the same passes for ¥50,000, ¥80,000 and ¥100,000.
            </strong>{" "}
            The Green Car pass costs ¥74,000, ¥116,000 and ¥147,000. A Tokyo ⇄ Kyoto round trip on the Hikari
            costs ¥27,700, so that trip alone does not earn the pass back; a 7-day pass pays off only when the JR
            fares in that week pass ¥53,000, as Tokyo ⇄ Hiroshima plus Tokyo ⇄ Kanazawa (about ¥67,920) does.
            Prices from japanrailpass.net and fares from the JR Group, checked {TODAY}.
          </p>
        </section>

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
              {TODAY}. A Tokyo ⇄ Kyoto round trip alone does not come close to earning either price
              back (¥27,700 on the Hikari against ¥53,000); a week with two long returns — Tokyo ⇄ Hiroshima
              and Tokyo ⇄ Kanazawa, about ¥67,920 — does.
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
              September. Check your own route in the break-even table and the calculator below before you
              decide.
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
        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The price</span>
          <h2 className={styles.sectionTitle}>How much is the JR Pass in 2026?</h2>
          <p className={styles.bodyText}>
            <strong>
              ¥53,000 for 7 days, ¥84,000 for 14 and ¥105,000 for 21, adult Ordinary car, bought as an
              Exchange Order from a JR-designated agency outside Japan.
            </strong>{" "}
            Green Car is ¥74,000, ¥116,000 and ¥147,000. Children aged 6 to 11 pay about half. Those are the
            prices in force since the revision on 1 October 2026, and they are what every reseller charges,
            because JR sets the figure and no seller can discount it.
          </p>
          <p className={styles.bodyText}>
            There is a second, cheaper price, and the JR Group publishes it on the same page: a pass bought on
            the official site is still <strong>¥50,000 / ¥80,000 / ¥100,000</strong> Ordinary and ¥70,000 /
            ¥110,000 / ¥140,000 Green — the pre-revision figures. Both tables were read on {TODAY}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass (adult)", "Overseas agency / reseller", "Official site (japanrailpass.net)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer: cheapest JR Pass</td>
                    <td colSpan={2} style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      7-day Ordinary: ¥53,000 from an agency, ¥50,000 on the official site. It pays off only if
                      your JR fares in that week top the price.
                    </td>
                  </tr>
                  {passTypes.map((p) => (
                    <tr key={`${p.type}-${p.duration}`}>
                      <td className={styles.tdProvider}>{p.type}, {p.duration}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>{p.agency}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent)" }}>{p.online}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Child price (6–11) in brackets.
          </p>
          <LastChecked
            sources={[
              { label: "JAPAN RAIL PASS prices (JR Group)", href: "https://japanrailpass.net/en/purchase/price/" },
              { label: "JNTO: 2026 price increase", href: "https://www.japan.travel/en/ca/news/price-increases-are-coming-to-the-nationwide-japan-rail-pass-2026/" },
            ]}
          />

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
            Where should I buy the JR Pass?
          </h3>
          <p className={styles.bodyText}>
            <strong>
              On the official site, japanrailpass.net, if price is all that matters: it is cheaper by ¥3,000 on
              the 7-day pass and up to ¥7,000 on a 21-day Green.
            </strong>{" "}
            That is the
            whole of the difference between the two columns, and it is the only saving on offer anywhere: the
            price is JR&apos;s in both channels, so no reseller undercuts another. What a reseller sells you
            instead is its own checkout — your currency, your payment method, its support if something goes
            wrong, and in Klook&apos;s case the regional passes and the shinkansen seats in the same basket.
            That is worth ¥3,000 to some readers and nothing at all to others. If it is worth nothing to you,
            buy direct.
          </p>
          <p className={styles.bodyText}>
            Three things no price table tells you. The official site&apos;s old price has no published end date
            and applies only on the day you pay, so it cannot be held. The Nozomi ticket a pass holder needs is
            sold only in Japan, from one month before the train, with a limited number of seats per train. And
            if your trip stays in one region, the cheaper pass is usually a regional one: the{" "}
            <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass</Link> for Kyoto, Osaka and Nara,
            the <Link href="/guides/transport/tokyo-wide-pass">JR Tokyo Wide Pass</Link> for Kanto day trips, or
            the <Link href="/guides/transport/hokuriku-arch-pass">Hokuriku Arch Pass</Link> for Tokyo to Kanazawa.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Price the JR Pass on Klook →
            </KlookLink>
            <KlookLink href={jrKansaiWideAreaPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or the Kansai WIDE pass →
            </KlookLink>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JR Tokyo Wide Pass →
            </KlookLink>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hokuriku Arch Pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Those links go to Klook, which pays us a commission at no extra cost to you. No Klook price
            appears on this page: Klook prices change by date, so every figure above is the JR
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

        {/* Worth it — rebuilt 12 Nov 2026 (R05) on operator fares only. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass worth it for Tokyo, Kyoto and Osaka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>No: the whole Tokyo → Kyoto → Osaka → Tokyo route costs about ¥28,250 in Hikari fares, ¥24,750
            less than a ¥53,000 7-day pass.</strong> The pass pays off only when the JR fares you would otherwise
            buy in one week pass ¥53,000 (¥50,000 if you buy on the official site), which in practice means two
            long returns from Tokyo, such as Hiroshima and Kanazawa.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip in one week", "Fares without a pass", "Against a ¥53,000 7-day pass", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td colSpan={3} style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      Buy the 7-day pass only for two or more long returns in a week (e.g. Hiroshima + Kanazawa,
                      ¥67,920). Tokyo, Kyoto and Osaka alone: buy single tickets.
                    </td>
                  </tr>
                  {breakEvenRows.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.trip}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                        {yen(row.fares)}
                        <span style={{ display: "block", fontWeight: 400, color: "var(--text-faint)", fontSize: "0.78rem" }}>
                          {row.calc}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.vs}</td>
                      <td style={{ fontSize: "0.86rem", fontWeight: 700, color: row.win ? "var(--accent)" : "var(--text)" }}>
                        {row.verdict}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[
              { label: "JR Group Hikari/Kodama fares (as of Oct 2026)", href: "https://jr-group.jp/hikari-ryokin/" },
              { label: "JAPAN RAIL PASS prices", href: "https://japanrailpass.net/en/purchase/price/" },
            ]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            One adult, one way, regular season, reserved Ordinary seat; reserved seats cost ¥200 more in the
            busy season and ¥400 more in the busiest. Tokyo–Kyoto ¥13,850 and Tokyo–Shin-Osaka ¥14,400 are the
            JR Group&apos;s Hikari window fares, read {TODAY}. Tokyo–Hiroshima ¥19,560 is JR West&apos;s Smart EX
            Nozomi fare, read {checkedLabel("2026-10-28")} for our{" "}
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen">Tokyo to Hiroshima shinkansen guide</Link>,
            because JR publishes no Hikari/Sakura through-fare table for that pair. Tokyo–Kanazawa ¥14,400 is JR
            West&apos;s Kagayaki e-ticket fare, read {checkedLabel("2026-11-11")} for our{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa">Tokyo to Kanazawa guide</Link>. The local JR hop
            between Kyoto and Osaka is not included.
          </p>
          <p className={styles.bodyText}>
            The table answers the price question only. For how those legs fit into a real trip, day by day, see
            the <Link href="/guides/attractions/japan-10-day-itinerary">10-day Japan itinerary</Link>, the{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">14-day itinerary</Link> and the{" "}
            <Link href="/guides/attractions/japan-3-week-itinerary">3-week itinerary</Link>, each of which says
            whether its route earns the pass back; for a single Tokyo–Osaka trip, the{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen">Tokyo to Osaka shinkansen guide</Link> has
            every fare and train. On a 14-day pass the bar is ¥84,000 and on a 21-day pass ¥105,000.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Route clears ¥53,000? JR Pass on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Nozomi — the supplement the pass does not include. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Nozomi</span>
          <h2 className={styles.sectionTitle}>Can I use the JR Pass on the Nozomi?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Only with a separate NOZOMI MIZUHO Ticket, ¥4,960 Tokyo–Kyoto or Tokyo–Shin-Osaka and ¥6,500
            Tokyo–Hiroshima, bought for every ride.</strong> The pass itself covers the Hikari, Kodama and Sakura,
            which take a little longer on the same line, so most pass holders simply ride those.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Section (one way)", "NOZOMI MIZUHO Ticket"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Answer</td>
                    <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>
                      A Nozomi round trip Tokyo ⇄ Kyoto on a pass costs ¥9,920 extra; on the Hikari it costs nothing.
                    </td>
                  </tr>
                  {nozomiRows.map((row) => (
                    <tr key={row.section}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.section}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--sumi)" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <LastChecked
            sources={[{ label: "japanrailpass.net NOZOMI MIZUHO Ticket", href: "https://japanrailpass.net/en/use/special-ticket/" }]}
          />
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Same price for Green, reserved and non-reserved seats. It is sold only to pass holders, at JR ticket
            machines and offices in Japan, from one month before the day of travel; seats are limited per train,
            so it can sell out when the train itself still has space. Refunds before travel cost ¥340 (reserved
            or Green) or ¥220 (non-reserved), and a lost ticket is not refunded.
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
            </Link>; for the trip back, our{" "}
            <Link href="/guides/transport/kyoto-to-tokyo-shinkansen" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kyoto to Tokyo train guide
            </Link>{" "}
            shows which trains the pass covers leaving Kyoto and what the Nozomi ticket costs.
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
            works that break-even through, and the Tokyo-side equivalent, JR East&apos;s three-day pass for Kanto
            day trips, has its own in our{" "}
            <Link href="/guides/transport/tokyo-wide-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR Tokyo Wide Pass guide
            </Link>
            . Second, the passes most tourists actually need in a city are not
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
            Those three links go to Klook, which pays us a commission at no extra cost to you. The prices above are the
            JR companies&apos; own rather than Klook&apos;s, because Klook&apos;s prices
            change by date.
          </p>
        </section>

        {/* The "JR Pass Types & Prices" table moved into the price section on 12 Nov 2026. */}

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
            official-site column — so decide which channel you want before you click. Klook&apos;s own
            figure is not quoted here: Klook prices change by date, so the only prices on this
            page are the JR companies&apos;. Both links pay us a commission at no extra cost to you.
          </p>
        </section>

        <BookingEsimCard lead="Pass sorted? Keep maps and train times on your phone." />

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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 5 Nov 2026: one return that does not pay for the pass. */}
            <Link href="/guides/attractions/kyoto-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto Day Trip from Tokyo: Train, Cost &amp; Plan (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 4 Nov 2026: the rail pass guide for this route. */}
            <Link href="/guides/transport/hokuriku-arch-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hokuriku Arch Pass (2026): Price, Route and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-first-time-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>First Time Japan Itinerary (2026): 9 Days, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Osaka Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 3 Nov 2026: JR East's single regional pass, which beats this one on an eastern-Japan-only trip. */}
            <Link href="/guides/transport/jr-east-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR East Pass (2026): Price, Coverage and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 3 Nov 2026: JR Hokkaido's island pass, the cheaper choice for a fly-in Hokkaido trip. */}
            <Link href="/guides/transport/hokkaido-rail-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hokkaido Rail Pass (2026): Price and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
                <p className={styles.relatedTitle}>Osaka to Hiroshima Shinkansen (2026): Time and Price</p>
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
                <p className={styles.relatedTitle}>Japan Itinerary 10 Days (2026): 10 Days in Japan, Day by Day</p>
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
            <Link href="/guides/attractions/japan-3-week-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 3 Week Itinerary (2026): 21 Days, JR Pass &amp; Bookings</p>
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
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Timed Itinerary, Cost and Tours</p>
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
