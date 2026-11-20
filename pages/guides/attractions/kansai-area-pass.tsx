import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { jrHarukaUrl, jrKansaiAreaPass, jrKansaiMiniPass, kansaiAreaPassSameDayPrep } from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// CTA links — both in Klook's 5% passes-and-transport band. The pass listing (1107)
// is a new constant in lib/klook-links.ts, confirmed live through the www.klook.com
// search index on 25 Oct 2026; the Haruka link (18400) is the one
// /guides/transport/haruka-vs-nankai-rapit already uses, reused rather than re-minted.
const KANSAI_PASS_URL = jrKansaiAreaPass.url;
const HARUKA_URL = jrHarukaUrl;

// Re-read on 3 November 2026 (task jtk-20261103-06):
//   - westjr.co.jp/global/en/ticket/westqr/kansaiarea/ — WEST QR prices, validity,
//     coverage, HARUKA reserved-seat rule, sales channel (overseas agencies only),
//     activation and eligibility.
//   - westjr.co.jp/travel-information/en/tickets-passes/jrwest-rail-pass/kansai/ —
//     the old pass: "Sales ended as of September 30, 2026" and its superseded prices.
//   - westjr.co.jp/global/en/ticket/westqr/kansaimini/ — Kansai Mini Pass.
//   - westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/ and
//     westjr.co.jp/global/en/ticket/westqr/haruka/ — HARUKA One-way Ticket fares.
//   - japanrailpass.net/en/purchase/price/ — nationwide JAPAN RAIL PASS after the
//     1 October 2026 revision.
//   - osaka-amazing-pass.com/en/ — Osaka Amazing Pass prices.
//   - the 23 Dec 2024 joint notice by JR West and nine other operators (hanshin.co.jp
//     press PDF) — KANSAI ONE PASS sales end.
// The Kansai WIDE Area Pass figure was read on 25 October 2026; JR West's page for it
// returned 404 on 3 November, so it carries its own date.
//
// Re-read on 13 November 2026 (task jtk-20261113-R04): the WEST QR Kansai Area Pass,
// old Kansai Area Pass, WEST QR HARUKA One-way Ticket and WEST QR Kansai Mini Pass
// pages on westjr.co.jp; westjr.co.jp/global/en/ticket/pass/kansai_hiroshima/
// (Kansai-Hiroshima Area Pass, 5 days ¥17,000 / ¥8,500); and
// kintetsu.co.jp/foreign/english/ticket/ (KINTETSU RAIL PASS ¥1,900 / ¥3,700 /
// ¥4,900 / ¥6,700). The nationwide JR Pass, OSAKA AMAZING PASS and KANSAI ONE PASS
// figures were not re-read and keep their 3 November date (PREV_CHECKED).
// Ordinary JR fares between Osaka and Kyoto / Nara / Himeji are deliberately not
// printed: no current official fare table for those pairs could be pinned down on
// 13 Nov, so the break-even table uses only the official HARUKA One-way fares.
//
// Re-read on 20 November 2026 (task jtk-20261120-R07), by node fetch: the WEST QR
// Kansai Area Pass page (prices, coverage, HARUKA reserved-seat rule, no shinkansen,
// overseas-agency-only sale), the WEST QR HARUKA One-way Ticket page (fares for
// tickets sold from 1 Nov 2026), the Kansai WIDE Area Pass page at
// westjr.co.jp/global/en/ticket/pass/kansai_wide/ (5 days ¥12,000 / ¥6,000; reserved
// Sanyo Shinkansen Shin-Osaka ⇔ Okayama; exchange order or JR-WEST ONLINE TRAIN
// RESERVATION) and JR West's ICOCA guide at westjr.co.jp/global/en/howto/icoca/
// (visitor-design ICOCA ¥2,000 including a ¥500 deposit, sold at the JR ticket office
// at Kansai-airport Station). Kansai Mini, Kansai-Hiroshima and Kintetsu keep their
// 13 Nov date (R04_CHECKED).
const CHECKED = checkedLabel("2026-11-20");
const R04_CHECKED = checkedLabel("2026-11-13");
const PREV_CHECKED = checkedLabel("2026-11-03");
const CHECKED_ISO = "2026-11-20";
const OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/";
const HARUKA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/westqr/haruka/";
const WIDE_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/ticket/pass/kansai_wide/";
const ICOCA_OFFICIAL_URL = "https://www.westjr.co.jp/global/en/howto/icoca/";

// Kansai Area Pass vs Kansai WIDE Area Pass vs ICOCA — first row is the verdict.
const vsWideRows = [
  {
    option: "Bottom line",
    area: "Kyoto, Osaka, Nara, Kobe, Himeji and Kansai Airport by JR → Kansai Area Pass",
    shinkansen: "Need the shinkansen to Okayama, or Kinosaki Onsen / Amanohashidate / Shirahama → WIDE",
    price: "Staying inside one city on the subway → ICOCA",
    who: "",
  },
  {
    option: "JR West Kansai Area Pass (WEST QR)",
    area: "JR West ordinary trains around Kyoto, Osaka, Nara, Kobe, Himeji, Wakayama, Otsu, Tsuruga and Iga-Ueno; HARUKA non-reserved unlimited, reserved twice",
    shinkansen: "✗ No shinkansen; no limited express except the HARUKA",
    price: "¥2,700 (1 day) · ¥4,700 (2) · ¥5,500 (3) · ¥6,700 (4), adult",
    who: "A 1–4 day Kansai trip that starts or ends at Kansai Airport",
  },
  {
    option: "JR West Kansai WIDE Area Pass",
    area: "Everything in the Area Pass plus Okayama, Takamatsu, Kinosaki Onsen, Amanohashidate, Tottori and Shirahama; reserved seats on the HARUKA, KUROSHIO, KONOTORI, SUPER HAKUTO and others",
    shinkansen: "✓ Sanyo Shinkansen reserved seats, Shin-Osaka ⇔ Okayama only (not Tokaido to Tokyo)",
    price: "¥12,000 for 5 consecutive days, adult (¥6,000 child)",
    who: "Five days with at least one long day trip beyond Himeji",
  },
  {
    option: "ICOCA (JR West IC card)",
    area: "Pay-as-you-go on railways and buses across Japan's IC card area — JR, subway, private lines and buses",
    shinkansen: "Not a pass: each fare is deducted from the balance",
    price: "Visitor-design ICOCA ¥2,000 including a ¥500 deposit (JR ticket office, Kansai-airport Station)",
    who: "One-city stays, subway and private-railway days, and topping up beside a pass",
  },
];

const QR_1_DAY = "¥2,700";
const QR_4_DAY = "¥6,700";

const priceRows = [
  { days: "1 day", qrAdult: QR_1_DAY, qrChild: "¥1,350", perDay: "¥2,700", oldAdult: "¥2,800" },
  { days: "2 days", qrAdult: "¥4,700", qrChild: "¥2,350", perDay: "¥2,350", oldAdult: "¥4,800" },
  { days: "3 days", qrAdult: "¥5,500", qrChild: "¥2,750", perDay: "¥1,833", oldAdult: "¥5,800" },
  { days: "4 days", qrAdult: QR_4_DAY, qrChild: "¥3,350", perDay: "¥1,675", oldAdult: "¥7,000" },
];

// Break-even on JR West's own HARUKA One-way Ticket fares (tickets sold from
// 1 Nov 2026) against the WEST QR pass. Only officially published fares are used.
const breakEvenRows = [
  { trip: "Kansai Airport → Kyoto, 1 day", singles: "¥2,700", pass: `${QR_1_DAY} (1-day)`, result: "Same price — every other JR ride that day is free" },
  { trip: "Kansai Airport → Kobe, 1 day", singles: "¥2,300", pass: `${QR_1_DAY} (1-day)`, result: "Pass needs ¥400 of other JR rides that day" },
  { trip: "Kansai Airport → Nara, 1 day", singles: "¥2,200", pass: `${QR_1_DAY} (1-day)`, result: "Pass needs ¥500 of other JR rides that day" },
  { trip: "Kansai Airport → Osaka / Shin-Osaka, 1 day", singles: "¥1,900", pass: `${QR_1_DAY} (1-day)`, result: "Pass needs ¥800 of other JR rides that day" },
  { trip: "Kansai Airport → Tennoji only", singles: "¥1,600", pass: `${QR_1_DAY} (1-day)`, result: "Single is ¥1,100 cheaper — skip the pass" },
  { trip: "Kyoto in and Kyoto out, 2-day stay", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: "¥4,700 (2-day)", result: "Pass is ¥700 cheaper before any other ride" },
  { trip: "Kyoto in, Osaka out, 3 days", singles: "¥2,700 + ¥1,900 = ¥4,600", pass: "¥5,500 (3-day)", result: "Pass needs ¥900 of other JR rides over 3 days" },
  { trip: "Kyoto in and Kyoto out, 4 days", singles: "¥2,700 + ¥2,700 = ¥5,400", pass: `${QR_4_DAY} (4-day)`, result: "Pass needs ¥1,300 of other JR rides over 4 days" },
];

const lineRows = [
  {
    service: "Kansai-Airport Express HARUKA, non-reserved seats",
    allowed: "✓ Unlimited",
    note: "The airport train, from Kansai Airport to Tennoji, Shin-Osaka and Kyoto. This is the single biggest reason to hold the pass.",
  },
  {
    service: "Kansai-Airport Express HARUKA, ordinary-car reserved seat",
    allowed: "✓ Twice",
    note: "Two reserved seats are included at no extra charge. Book them on the WEST-QR website from 30 days before boarding — JR West states they cannot be booked on the train, at ticket machines or at ticket counters.",
  },
  {
    service: "HARUKA Green Car (first class)",
    allowed: "✗ Not covered",
    note: "Needs separate tickets. The pass covers ordinary cars only.",
  },
  {
    service: "JR West Special Rapid, Rapid and Local trains",
    allowed: "✓ Unlimited",
    note: "The ordinary network inside the valid area: Osaka–Kyoto, Osaka–Kobe, Osaka–Nara, Osaka–Himeji and the rest.",
  },
  {
    service: "Shinkansen (Tokaido and Sanyo)",
    allowed: "✗ Never",
    note: "Not on this pass at any length. Shin-Osaka to Kyoto by shinkansen is a separate ticket even on the day your pass is valid.",
  },
  {
    service: "Any other limited express",
    allowed: "✗ Not covered",
    note: "The HARUKA is the only limited express on the pass. Thunderbird, Kuroshio and the rest need their own tickets.",
  },
  {
    service: "Private railways — Hankyu, Keihan, Kintetsu, Nankai",
    allowed: "✗ Not covered",
    note: "The pass is a JR West ticket; JR West's old-pass page sells Keihan and Hankyu access only as separate vouchers. Kyoto's and Osaka's handiest lines for sightseeing are often these, not JR.",
  },
  {
    service: "Osaka Metro, Kyoto subway and city buses",
    allowed: "✗ Not covered",
    note: "No subway, no city bus. Inside either city you still need an IC card or a city pass on top.",
  },
  {
    service: "Paid seats on JR trains (A-Seat) and local Green Cars",
    allowed: "✗ Extra charge",
    note: "Ordinary seats on Special Rapid, Rapid and Local trains are covered; the paid A-Seat and Green Car upgrades are not.",
  },
];

const compareRows = [
  {
    option: "Bottom line",
    price: "—",
    covers: "Kansai-only trip on JR with the HARUKA → Kansai Area Pass. Nara on the Kintetsu → Kintetsu Rail Pass. Hiroshima on the same trip → Kansai-Hiroshima Area Pass",
    pick: "The KANSAI ONE PASS is an IC card, not an alternative pass",
  },
  {
    option: "WEST QR Kansai Area Pass",
    price: `${QR_1_DAY} (1 day) to ${QR_4_DAY} (4 days), adult`,
    covers: "JR West ordinary trains around Osaka, Kyoto, Kobe, Nara, Himeji, Wakayama, Otsu, Tsuruga and Iga-Ueno, plus unlimited HARUKA non-reserved and two reserved HARUKA seats",
    pick: "The default for a Kansai-only trip that starts or ends at Kansai Airport",
  },
  {
    option: "Kansai Mini Pass",
    price: "¥3,000 for 3 consecutive days, adult (¥1,500 child)",
    covers: "Rapid and local JR West trains plus the Kansai-Airport Rapid Service. The HARUKA needs a separate limited express ticket",
    pick: "Cheapest option if you will do the airport run on the slow Rapid rather than the HARUKA",
  },
  {
    option: "HARUKA One-way Ticket",
    price: "¥1,600 Tennoji, ¥1,900 Osaka / Shin-Osaka, ¥2,300 Kobe, ¥2,200 Nara, ¥2,700 Kyoto (from Kansai Airport)",
    covers: "One airport journey only — no travel between cities afterwards",
    pick: "Only if the airport run is the single JR ride of your whole trip",
  },
  {
    option: "KINTETSU RAIL PASS",
    price: "¥1,900 (1 day), ¥3,700 (2 days), ¥4,900 (5 days), ¥6,700 (5day plus)",
    covers: "Kintetsu lines only — Osaka-Namba to Kintetsu-Nara and Kyoto, and on the 5-day versions Ise-Shima and Nagoya. No JR, no HARUKA",
    pick: "If Nara Park is the main day trip and you are staying near Namba, where Kintetsu, not JR, runs to Nara",
  },
  {
    option: "Kansai-Hiroshima Area Pass",
    price: "¥17,000 for 5 consecutive days, adult (¥8,500 child)",
    covers: "JR West in Kansai plus reserved Sanyo Shinkansen seats Shin-Osaka ⇄ Hiroshima, limited expresses including the HARUKA, and the JR Miyajima Ferry",
    pick: "If Hiroshima and Miyajima are on the same trip — the Kansai Area Pass has no shinkansen at all",
  },
  {
    option: "KANSAI ONE PASS",
    price: "Not a pass price — a rechargeable IC card that pays each fare",
    covers: "Pay-as-you-go on JR, private railways, subways and buses; sales being wound down by March 2027",
    pick: "Not an alternative to the rail pass. For pay-as-you-go, any IC card such as ICOCA does the same job",
  },
  {
    option: "Kansai WIDE Area Pass",
    price: `¥12,000 for 5 consecutive days, adult (¥6,000 child)`,
    covers: "Everything above plus reserved Sanyo Shinkansen seats Shin-Osaka ⇄ Okayama, and Takamatsu, Kinosaki Onsen, Amanohashidate, Tottori and Shirahama",
    pick: "If Himeji is not the far edge of your trip — day trips beyond Kansai change the answer",
  },
  {
    option: "OSAKA AMAZING PASS",
    price: `¥3,500 for 1 day, ¥5,000 for 2 days (read ${PREV_CHECKED})`,
    covers: "Free rides on the buses and trains on its Osaka network map plus entry to its listed attractions — a city pass, not a regional rail pass",
    pick: "For a day spent inside Osaka. It does not replace the Kansai pass's airport run or the Kyoto and Nara hops",
  },
  {
    option: "JAPAN RAIL PASS (nationwide, after the 1 October 2026 revision)",
    price: `7 days, Ordinary Car: ¥50,000 on the official website, ¥53,000 as an Exchange Order from an overseas agency (read ${PREV_CHECKED})`,
    covers: "Nationwide JR including most shinkansen — far more than Kansai, at over seven times the 4-day Kansai price",
    pick: "Only once Tokyo is in the itinerary; see our JR Pass guide for the break-even",
  },
];

const worthRows = [
  {
    plan: "Flying into Kansai Airport and going straight to Kyoto",
    verdict: "✓ Buy the 1-day pass",
    why: `The discounted HARUKA One-way Ticket to Kyoto is ¥2,700 for tickets sold from 1 November 2026 — exactly the price of a 1-day pass. The pass costs nothing extra and every JR ride you take the same day is free on top.`,
  },
  {
    plan: "Three or four days of Osaka, Kyoto, Nara and Kobe with JR between them",
    verdict: "✓ Buy the 3- or 4-day pass",
    why: `${QR_4_DAY} over four days covers both airport runs and the intercity hops. The airport legs alone — ¥2,700 in to Kyoto and ¥1,900 out of Osaka on HARUKA singles — are ¥4,600 of the ¥6,700, leaving ¥2,100 to make up.`,
  },
  {
    plan: "Staying in one city and sightseeing on foot, subway and bus",
    verdict: "✗ Skip it",
    why: "The pass does not touch the Osaka Metro, the Kyoto subway or any city bus. If your days are spent inside one city, an IC card plus a city pass is the cheaper pair, and the pass just duplicates the airport run.",
  },
  {
    plan: "Kyoto temple-hopping with Hankyu, Keihan or Kintetsu",
    verdict: "✗ Wrong pass",
    why: "Fushimi Inari, Arashiyama and Nara are all reachable on private lines that this pass does not cover. Check which operator serves the stops you actually want before buying a JR product.",
  },
  {
    plan: "Tokyo in the same trip, or a shinkansen leg",
    verdict: "✗ Not this one",
    why: "No shinkansen at any length, and the valid area stops well short of Tokyo. Either price a nationwide JAPAN RAIL PASS or buy the shinkansen leg separately and keep the Kansai pass for the Kansai days.",
  },
  {
    plan: "You hold a Japanese passport or live in Japan",
    verdict: "✗ Not eligible",
    why: "JR West sells it only to holders of a passport issued by a foreign government entering Japan as a Temporary Visitor. Japanese nationals cannot use it, and nor can foreign nationals with permanent residence in Japan.",
  },
];

const steps = [
  {
    title: "Check that your route is actually JR",
    desc: "Do this before the arithmetic. Osaka–Kyoto, Osaka–Kobe, Osaka–Nara and Osaka–Himeji are all JR West routes the pass covers. Fushimi Inari on the Keihan, Arashiyama on the Hankyu or the Randen, and Nara on the Kintetsu are not. If most of your sightseeing stops sit on private lines, no amount of adding up makes a JR pass the right purchase.",
  },
  {
    title: "Count the days, not the rides",
    desc: `The pass is sold for 1, 2, 3 or 4 consecutive days, at ${QR_1_DAY}, ¥4,700, ¥5,500 and ${QR_4_DAY} for an adult, children half. Consecutive is the word that matters: a gap day in the middle is a day you have paid for. If your Kansai days are split either side of a Tokyo leg, buy two short passes or none. Prices checked ${CHECKED}.`,
  },
  {
    title: "Reserve your two HARUKA seats online before you board",
    desc: "The pass includes unlimited HARUKA non-reserved travel plus an ordinary-car reserved seat twice. JR West states the reserved seats are booked on the WEST-QR website from 30 days before boarding — not on the train, at ticket machines or at ticket counters. Worth it on the airport run with luggage, and worth saving for the two legs where you will have cases.",
  },
  {
    title: "Buy the voucher before you fly, then activate it on the day",
    desc: "JR West sells the WEST QR version only as a voucher through overseas travel agencies; it states the pass cannot be bought at travel agencies in Japan or through JR-WEST Online Train Reservation, and there is no station sale. You register the voucher on the WEST-QR site, then press the \"Use ticket\" button after 04:00 on your start day and scan the QR code at the gates. There is no paper pass and no exchange queue — but you do need a phone with internet access, which is its own argument for having data on arrival.",
  },
  {
    title: "Check you are eligible before you buy",
    desc: "Eligibility is a foreign-government passport with Temporary Visitor entry status. Japanese nationals — including those with permanent residence abroad — are not eligible at all, so check this before the voucher is issued.",
  },
];

// Five questions, matching the question headings in the body (FAQPage).
const faqItems = [
  {
    q: "How much is the JR Kansai Area Pass?",
    a: `${QR_1_DAY} for 1 day, ¥4,700 for 2 days, ¥5,500 for 3 days and ${QR_4_DAY} for 4 consecutive days for an adult; a child aged 6 to 11 pays half (¥1,350 / ¥2,350 / ¥2,750 / ¥3,350). These are the prices of JR West's WEST QR Kansai Area Pass, the version sold now. The old paper Kansai Area Pass (¥2,800 / ¥4,800 / ¥5,800 / ¥7,000) stopped selling on 30 September 2026. Read off westjr.co.jp on ${CHECKED}.`,
  },
  {
    q: "Kansai Area Pass vs Kansai Wide Area Pass: which is better?",
    a: `The Kansai Area Pass for most first trips; the Kansai WIDE Area Pass only if you go beyond Himeji. The Area Pass is ${QR_1_DAY}–${QR_4_DAY} for 1 to 4 days and has no shinkansen. The WIDE pass is ¥12,000 for 5 consecutive days and adds reserved Sanyo Shinkansen seats between Shin-Osaka and Okayama plus Kinosaki Onsen, Amanohashidate, Tottori, Shirahama and Takamatsu. If your plan is Kyoto, Osaka, Nara, Kobe and Himeji, the 4-day Area Pass at ${QR_4_DAY} costs ¥5,300 less. Both read off westjr.co.jp on ${CHECKED}.`,
  },
  {
    q: "Does the Kansai Area Pass cover the Haruka from Kansai Airport?",
    a: `Yes. JR West's WEST QR page allows unlimited rides in non-reserved seats on the Limited Express HARUKA between Kansai Airport and Tennoji, Shin-Osaka and Kyoto, plus an ordinary-car reserved seat twice, booked on the WEST-QR website from 30 days before boarding — not on the train or at station counters. The Green Car needs separate tickets. The Nankai Rapi:t to Namba is not covered. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Kansai Area Pass worth it for Kyoto and Osaka?",
    a: `Yes if you land at Kansai Airport and move between Kyoto and Osaka by JR; no if you stay in one city on the subway. The HARUKA One-way Ticket from Kansai Airport to Kyoto is ¥2,700 for tickets sold from 1 November 2026 — the same as a 1-day pass — and on a 3-day trip in to Kyoto and out of Osaka the two singles (¥4,600) leave the 3-day pass (¥5,500) only ¥900 to make up on JR hops. It never helps on the Osaka Metro, the Kyoto subway, city buses or the Kintetsu, Hankyu, Keihan and Nankai lines. Fares read off westjr.co.jp on ${CHECKED}.`,
  },
  {
    q: "Can I use the Kansai Area Pass on the shinkansen?",
    a: `No. JR West states the WEST QR Kansai Area Pass "cannot be used on the Shinkansen, even if you pay an additional fare" — Shin-Osaka to Kyoto by bullet train is a separate ticket. For a Kansai pass with a shinkansen section, the Kansai WIDE Area Pass (¥12,000, 5 days) includes reserved Sanyo Shinkansen seats Shin-Osaka ⇔ Okayama, and the Kansai-Hiroshima Area Pass (¥17,000, 5 days) Shin-Osaka ⇔ Hiroshima. Checked ${CHECKED} (Kansai-Hiroshima ${R04_CHECKED}).`,
  },
];

const TITLE = "JR West Kansai Area Pass 2026: Price & vs Kansai Wide Pass";
const DESCRIPTION =
  "JR West Kansai Area Pass 2026 price: 1-day ¥2,700, 3-day ¥5,500. HARUKA from Kansai Airport included, no shinkansen. vs Kansai Wide Area Pass & ICOCA.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/kansai-area-pass") } });

export default function KansaiAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kansai-area-pass" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kansai-area-pass" />
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
              route: "/guides/attractions/kansai-area-pass",
              headline: TITLE,
              description: DESCRIPTION,
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
                { "@type": "ListItem", position: 4, name: "Kansai Area Pass", item: "https://www.japan-travel-kit.com/guides/attractions/kansai-area-pass" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: "/guides/attractions/kansai-area-pass",
              name: "WEST QR Kansai Area Pass",
              description: DESCRIPTION,
              brand: "JR West",
              currency: "JPY",
              lowPrice: 2700,
              highPrice: 6700,
              offerCount: 4,
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
          <span className={styles.breadCurrent}>Kansai Area Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            JR West Kansai Area Pass 2026: <br />Price &amp; vs Kansai Wide Pass
          </h1>
          <p className={styles.heroSubtitle}>
            The 1-day and 3-day price, what the HARUKA from Kansai Airport covers, and when the Kansai Wide
            Area Pass or an ICOCA card is the better buy.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official JR West prices", "vs Kansai Wide Area Pass"].map((t) => (
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

        {/* The answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The <strong>JR West Kansai Area Pass</strong> costs <strong>{QR_1_DAY} for 1 day, ¥4,700 for 2 days,
            ¥5,500 for 3 days and {QR_4_DAY} for 4 days</strong> for an adult (children 6–11 half), according to
            JR West&apos;s official WEST QR page checked on {CHECKED}. It covers JR West trains between{" "}
            <strong>Kyoto, Osaka, Nara, Kobe and Kansai Airport</strong>, including unlimited non-reserved seats
            on the <strong>HARUKA</strong> airport express, but not the shinkansen or the Kintetsu, Hankyu,
            Keihan and Nankai lines. Choose the <strong>Kansai Wide Area Pass</strong> (¥12,000 for 5 days) only
            if you go beyond Himeji to Okayama, Kinosaki Onsen or Amanohashidate, and an <strong>ICOCA</strong>{" "}
            card instead of either if you stay inside one city on the subway.
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
                <p className={styles.verdictStatLabel}>1 day</p>
                <p className={styles.verdictStatValue}>{QR_1_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>4 days</p>
                <p className={styles.verdictStatValue}>{QR_4_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Haruka</p>
                <p className={styles.verdictStatValue}>Included (2 reserved)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinkansen</p>
                <p className={styles.verdictStatValue}>Not included</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>JR West Kansai Area Pass</strong> costs <strong>{QR_1_DAY} for 1 day</strong>, ¥4,700 for
              2, ¥5,500 for 3 and <strong>{QR_4_DAY} for 4 days</strong> (adult; children 6–11 half — JR
              West&apos;s WEST QR Kansai Area Pass, read off westjr.co.jp on {CHECKED}). It gives unlimited
              non-reserved rides on the <strong>HARUKA between Kansai Airport and Tennoji, Shin-Osaka and
              Kyoto</strong> (plus two reserved seats) and on JR West Special Rapid, Rapid and Local trains
              around Osaka, Kyoto, Kobe, Nara and Himeji. It does <strong>not</strong> cover the shinkansen,
              any other limited express, the Osaka Metro or Kyoto subway, city buses, or the private railways
              — Hankyu, Keihan, Kintetsu and Nankai. It pays off when you <strong>land at Kansai Airport and
              head for Kyoto</strong>: the HARUKA single to Kyoto is also ¥2,700, so the 1-day pass costs the
              same and every other JR ride that day is free. The paper version stopped selling on 30 September
              2026.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kansai Area Pass on Klook →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Single Haruka Ticket Instead →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Kansai Area Pass?</h2>
          <p className={styles.bodyText}>
            It is the smallest and cheapest of JR West&apos;s regional passes, and the one most first-time
            Kansai visitors actually need. For 1 to 4 consecutive days it gives unlimited rides on JR West
            ordinary trains — local, Rapid and Special Rapid — inside an area JR West describes as covering{" "}
            <strong>Osaka, Kyoto, Kobe, Nara, Himeji, Wakayama, Otsu, Tsuruga and Iga-Ueno</strong>, and it
            adds the one thing a plain IC card cannot: the Kansai-Airport Express HARUKA, unlimited in
            non-reserved seats and twice in an ordinary-car reserved seat.
          </p>
          <p className={styles.bodyText}>
            One change matters more than the price in 2026. JR West&apos;s own page now states that sales of
            the Kansai Area Pass <strong>ended as of 30 September 2026</strong>, with passes bought before
            that date still valid for their full period. The product has not gone away — it has become the{" "}
            <strong>WEST QR Kansai Area Pass</strong>, the same 1-to-4-day coverage sold as a QR code you
            register online and scan at the gate, at slightly lower prices. If you read an older guide
            quoting ¥2,800 for a day, that is the superseded figure.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much is the JR Kansai Area Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {QR_1_DAY} for 1 day, ¥4,700 for 2, ¥5,500 for 3 and {QR_4_DAY} for 4 consecutive days for an adult,
            and exactly half for a child aged 6 to 11. JR West publishes one price list for the WEST QR pass and
            no separate price by sales channel.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Length", "Adult (WEST QR)", "Child 6–11", "Adult per day", "Old paper pass, adult"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Bottom line</td>
                    <td className={styles.tdPrice} colSpan={4} style={{ fontSize: "0.88rem" }}>
                      1 day ({QR_1_DAY}) costs the same as the HARUKA single to Kyoto; 4 days ({QR_4_DAY}) is the
                      cheapest per day at ¥1,675
                    </td>
                  </tr>
                  {priceRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.days}</td>
                      <td className={styles.tdPrice}>{row.qrAdult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.qrChild}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.perDay}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.oldAdult}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} — official source:{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>
              JR West, WEST QR Kansai Area Pass
            </a>
            . The old-pass column (JR West: &quot;Sales ended as of September 30, 2026&quot;) is there only so you
            can recognise a stale quote. Per-day figures are the adult price divided by the days. The pass is
            valid from 04:00 on the start day to 24:00 on the last day, Japan time, over consecutive days.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Kansai Area Pass on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            Before you buy, check two things on the listing that no fare table answers: the redemption window
            of the voucher against your flight dates, and the agency&apos;s refund terms — JR West refunds
            nothing once &quot;Use ticket&quot; has been pressed.
          </p>
          <KlookTripPrep
            label="Book on the same trip"
            heading="What to Book Alongside the Kansai Area Pass"
            intro="The pass moves you between cities; the rest of the trip is a bed near the JR lines it covers, a guided day to Nara or Himeji, and data for the QR code. No prices are quoted — open each listing for the current figure."
            items={kansaiAreaPassSameDayPrep}
          />
        </section>

        {/* Kansai Area Pass vs Kansai WIDE Area Pass vs ICOCA (R07) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Area vs Wide vs ICOCA</span>
          <h2 className={styles.sectionTitle}>Kansai Area Pass vs Kansai Wide Area Pass: which is better?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Kansai Area Pass, for a trip that stays between Kyoto, Osaka, Nara, Kobe and Himeji: its 4-day
            price ({QR_4_DAY}) is ¥5,300 less than the 5-day Kansai Wide Area Pass (¥12,000). The Wide pass
            earns its price only with a long day out — the Sanyo Shinkansen to Okayama, or Kinosaki Onsen,
            Amanohashidate or Shirahama by reserved limited express. ICOCA is not a pass at all; it pays each
            fare, which suits a stay inside one city.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Area covered", "Shinkansen", "Price (adult)", "Best for"].map((h) => (
                      <th key={h || "option"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsWideRows.map((row, i) =>
                    i === 0 ? (
                      <tr key={row.option}>
                        <td className={styles.tdProvider}>{row.option}</td>
                        <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.area}</td>
                        <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.shinkansen}</td>
                        <td className={styles.tdPrice} colSpan={2} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      </tr>
                    ) : (
                      <tr key={row.option}>
                        <td className={styles.tdProvider}>{row.option}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.shinkansen}</td>
                        <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} — official sources:{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>
              JR West, WEST QR Kansai Area Pass
            </a>
            ,{" "}
            <a href={WIDE_OFFICIAL_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>
              JR West, Kansai WIDE Area Pass
            </a>{" "}
            and{" "}
            <a href={ICOCA_OFFICIAL_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>
              JR West, ICOCA guide
            </a>
            . How you get each one differs: the Area Pass is a WEST QR voucher sold only by overseas travel
            agencies, with no exchange step; the Wide pass is an exchange order from an overseas agency, or a
            booking on JR-WEST ONLINE TRAIN RESERVATION collected at a JR West station with your passport; the
            visitor-design ICOCA is bought at the JR ticket office at Kansai-airport Station. The Wide pass
            runs from 00:00 on its first day, the Area Pass from 04:00. Neither pass covers the Tokaido
            Shinkansen to Tokyo.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
            Whichever you pick, a day trip is where the pass is paid back: the{" "}
            <Link href="/guides/attractions/himeji-castle-day-trip" style={{ color: "var(--text)", fontWeight: 600 }}>
              Himeji Castle day trip
            </Link>{" "}
            sits at the far edge of the Area Pass, and the{" "}
            <Link href="/guides/attractions/amanohashidate-ine-day-trip" style={{ color: "var(--text)", fontWeight: 600 }}>
              Amanohashidate day trip
            </Link>{" "}
            is one that needs the Wide pass.
          </p>
        </section>

        {/* Lines table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Included vs not</span>
          <h2 className={styles.sectionTitle}>What does the Kansai Area Pass cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR West ordinary trains — Special Rapid, Rapid and Local — inside the Kansai valid area, plus the
            HARUKA airport express (unlimited non-reserved, two reserved seats). Nothing else: no shinkansen, no
            other limited express, no subway, bus or private railway. The exclusions decide this purchase more
            often than the inclusions do.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Service", "On the pass?", "What that means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lineRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allowed}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Coverage read off westjr.co.jp on {CHECKED}. For the city layer the pass leaves out, see{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Osaka
            </Link>{" "}
            and{" "}
            <Link href="/guides/transport/kyoto-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Kyoto
            </Link>
            , both of which cover the subway, bus and{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              IC card
            </Link>{" "}
            options you will still need on top.
          </p>
        </section>

        {/* Airport use */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>From the airport</span>
          <h2 className={styles.sectionTitle}>Does the Kansai Area Pass cover the Haruka from Kansai Airport?</h2>
          <p className={styles.bodyText}>
            Yes. Non-reserved seats on the HARUKA between Kansai Airport and Tennoji, Shin-Osaka and Kyoto are
            unlimited, and an ordinary-car reserved seat is included twice (the Green Car is extra).
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem" }}>Can I use the Kansai Area Pass on the shinkansen?</h3>
          <p className={styles.bodyText}>
            No. JR West states the pass &quot;cannot be used on the Shinkansen, even if you pay an additional
            fare&quot;. The Kansai Wide Area Pass is the Kansai pass that includes one — reserved Sanyo
            Shinkansen seats between Shin-Osaka and Okayama.
          </p>
          <p className={styles.bodyText}>
            On arrival day, press &quot;Use ticket&quot; (after 04:00), scan the QR code at the JR gate at Kansai
            Airport and board the HARUKA to <strong>Tennoji</strong>, <strong>Shin-Osaka</strong> or{" "}
            <strong>Kyoto</strong>. Shin-Osaka to Kyoto by bullet train is a separate ticket even on a day the
            pass is valid; if a shinkansen leg to Hiroshima is in the plan, the Kansai-Hiroshima Area Pass in the
            comparison table below is the one that includes it.
          </p>
          <p className={styles.bodyText}>
            The two reserved seats are what you want on the day you are carrying cases. JR West states they are
            booked on the WEST-QR website from 30 days before boarding, and cannot be booked on the train, at
            ticket machines or at ticket counters — so book them before you fly. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            For Namba and the Dotonbori side of Osaka, the HARUKA does not help — that is the Nankai, which
            the pass does not cover. Our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={{ color: "var(--red)", fontWeight: 600 }}>
              Haruka vs Nankai Rapi:t comparison
            </Link>{" "}
            sets the two routes against each other by destination rather than by fare, and the broader{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka airport transfer guide
            </Link>{" "}
            covers Itami as well. In short: your hotel decides whether this pass is the right airport ticket
            at all.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Kansai Area Pass with the Haruka →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Haruka One-way Ticket →
            </KlookLink>
          </div>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Which other Kansai pass could replace the Kansai Area Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For a Kansai-only trip that uses JR and the HARUKA, the Kansai Area Pass is the one to buy. The
            Kintetsu Rail Pass is for Nara on the Kintetsu, the Kansai-Hiroshima Area Pass is for a shinkansen
            leg west, and the KANSAI ONE PASS is an IC card, not a pass.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Price (adult)", "What it covers", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} for JR West&apos;s Kansai Area, HARUKA One-way and Kansai WIDE Area Pass
            pages (westjr.co.jp); the Kansai Mini and Kansai-Hiroshima Area Pass pages and Kintetsu
            (kintetsu.co.jp/foreign/english/ticket/) on {R04_CHECKED}; the nationwide pass off japanrailpass.net, the OSAKA AMAZING PASS
            off its official site and the KANSAI ONE PASS notice on {PREV_CHECKED}. If Nara is your main day out,
            our{" "}
            <Link href="/guides/transport/kintetsu-rail-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kintetsu Rail Pass guide
            </Link>{" "}
            works out when the Kintetsu pass beats singles; for a day inside Osaka, the{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Osaka Amazing Pass guide
            </Link>{" "}
            covers the city pass the Kansai Area Pass does not replace. For Kinosaki Onsen, the Kansai Area
            Pass cannot be used on the Konotori limited express, while the WIDE pass includes its reserved
            seats; our{" "}
            <Link href="/guides/attractions/kinosaki-onsen-day-trip" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kinosaki Onsen day trip guide
            </Link>{" "}
            has the Konotori times from Osaka. The HARUKA One-way Ticket is the discounted single for foreign passport holders entering
            as temporary visitors; the fares shown apply to tickets sold from 1 November 2026, when JR West
            raised them — the Kyoto single now equals the 1-day pass. For the nationwide pass break-even, see
            our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>
            ; for a loop that starts in Tokyo and reaches Kansai through Kanazawa, the 7-day{" "}
            <Link href="/guides/transport/hokuriku-arch-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Hokuriku Arch Pass
            </Link>{" "}
            covers the Thunderbird and the HARUKA as well as the Hokuriku Shinkansen; for Hiroshima, which no Kansai pass reaches, the{" "}
            <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={{ color: "var(--text)", fontWeight: 600 }}>
              Osaka to Hiroshima Shinkansen guide
            </Link>{" "}
            compares the JR West Kansai-Hiroshima Area Pass with single tickets. ICOCA &amp; HARUKA is left out: JR West&apos;s current English pages did not show a price for it
            on the check date.
          </p>
        </section>

        {/* Is the pass worth it — judgement table, with the CTA directly after */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Is the pass worth it?</span>
          <h2 className={styles.sectionTitle}>Is the Kansai Area Pass worth it for Kyoto and Osaka?</h2>
          <p className={styles.bodyText}>
            Yes if you fly into Kansai Airport and travel between Kyoto and Osaka by JR; no if you stay in one
            city on the subway. On the 1-day model (Kansai Airport to Kyoto) the HARUKA single is ¥2,700, the
            same as the 1-day pass; on the 3-day model (in to Kyoto, out of Osaka) the two singles come to
            ¥4,600 against ¥5,500 for the 3-day pass, so ¥900 of JR hops in between pays it back.
          </p>
          <div className={styles.tableWrap} style={{ marginBottom: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip", "HARUKA One-way singles", "Pass for the same days", "Result"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Bottom line</td>
                    <td colSpan={3} className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>
                      Buy the pass for a Kyoto arrival or when both airport runs fall inside it; skip it if the
                      airport run to Tennoji or Osaka is your only JR ride
                    </td>
                  </tr>
                  {breakEvenRows.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider}>{row.trip}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.singles}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {CHECKED_ISO} — official sources:{" "}
            <a href={HARUKA_OFFICIAL_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>
              JR West, WEST QR HARUKA One-way Ticket
            </a>{" "}
            (adult fares for tickets sold from 1 November 2026) and{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>
              WEST QR Kansai Area Pass
            </a>
            . The single is one-way, so a round trip is two singles, and the pass covers the return only if
            both airport runs fall inside its consecutive days. For the Kyoto–Osaka, Osaka–Nara or
            Osaka–Himeji hops that make up the rest, check the fare for your own stations on JR West&apos;s fare
            search — those ordinary fares are not printed here.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              The pass pays — check the Kansai Area Pass →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              The single wins — check the Haruka ticket →
            </KlookLink>
          </div>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Verdict", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things to settle on the listing rather than here, because neither is a published fare: which
            version of the pass is being sold for your travel date — the QR code or an exchange order you
            collect in Japan — and the cancellation terms, which matter because the pass is tied to
            consecutive dates you nominate. Vouchers are typically sold with a redemption window rather than a
            fixed date, so check that window against your flight before you buy.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check the Kansai Area Pass →
            </KlookLink>
            <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Compare a Single Haruka Ticket →
            </KlookLink>
          </div>
        </section>

        {/* Break-even itineraries */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Which Itineraries Pay the Pass Back?</h2>
          <p className={styles.bodyText}>
            The honest comparator for a visitor is not the standard fare but the discounted{" "}
            <strong>HARUKA One-way Ticket</strong>, which is the cheapest legitimate airport single JR West
            sells to foreign passport holders. For tickets sold from <strong>1 November 2026</strong> that is
            ¥1,600 to Tennoji, ¥1,900 to Osaka or Shin-Osaka, ¥2,700 to Kyoto, ¥2,300 to Kobe and ¥2,200 to
            Nara. Those are the numbers the pass has to beat.
          </p>
          <p className={styles.bodyText}>
            <strong>A Kyoto arrival, 1-day pass ({QR_1_DAY}).</strong> The Kyoto single is ¥2,700 — the pass
            price exactly. You pay nothing extra for the airport run and every JR ride that day, including a
            Kyoto–Nara or Kyoto–Osaka hop, rides free on top.
          </p>
          <p className={styles.bodyText}>
            <strong>Four days across Kansai, 4-day pass ({QR_4_DAY}).</strong> Fly into Kansai and out of it:
            Kyoto in at ¥2,700 and Osaka out at ¥1,900 is ¥4,600 of the {QR_4_DAY} spent on
            the two airport legs alone. The remaining ¥2,100 has to come from four days of intercity hops —
            Kyoto to Nara, Osaka to Kobe, Osaka to Himeji — which it comfortably does if you use JR for them.
            It does <em>not</em> if those days are spent inside one city on the subway, because none of that is
            on the pass. For an Osaka-only day, the{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Osaka Metro Pass (the Enjoy Eco Card)
            </Link>{" "}
            covers the subway and city buses for one calendar day instead.
          </p>
          <p className={styles.bodyText}>
            <strong>Where it fails.</strong> A trip with a gap day in the middle of the pass window, or one
            that reaches Nara on the Kintetsu and Arashiyama on the Hankyu, or one that includes a shinkansen
            leg to Tokyo. In all three the arithmetic is lost before you start. Fares checked {CHECKED}.
            If you only want one day out, a{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka">Kyoto and Nara day tour from Osaka</Link>{" "}
            includes the coach, so no rail pass is needed for that day.
          </p>
        </section>

        {/* Kansai One Pass — a different product people search alongside this one */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Not the same product</span>
          <h2 className={styles.sectionTitle}>Was the KANSAI ONE PASS discontinued?</h2>
          <p className={styles.bodyText}>
            Yes — sales are being wound down, and it was never a JR rail pass. KANSAI ONE PASS is a
            rechargeable transit IC card for visitors. In a joint notice dated 23 December 2024, JR West, Hankyu,
            Kintetsu, Keihan, Nankai, Hanshin, Osaka Metro, Osaka City Bus and the Kyoto and Kobe municipal
            transport bureaus said each operator would stop selling it from 1 November 2025 once its stock ran
            out, with all sales due to end by the end of fiscal 2026 (March 2027).
          </p>
          <p className={styles.bodyText}>
            The same notice says cards already bought keep working as a rechargeable IC card, while the shop and
            attraction perks end with fiscal 2026. The card was never a substitute for the Kansai Area Pass: an IC
            card pays each fare, the pass replaces them. Checked {PREV_CHECKED}.
          </p>
        </section>

        {/* Where to buy — WEST QR has no exchange step */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where can I buy and exchange the Kansai Area Pass?</h2>
          <p className={styles.bodyText}>
            Buy it as a WEST-QR voucher from an overseas travel agency before you fly; there is nothing to
            exchange in Japan. JR West states the pass cannot be bought at travel agencies in Japan or via
            JR-WEST ONLINE TRAIN RESERVATION, and lists no station sale.
          </p>
          <ol className={styles.bodyText} style={{ paddingLeft: "1.25rem" }}>
            <li>Buy the voucher from an overseas travel agency (Klook is one).</li>
            <li>Register the voucher details on the WEST-QR usage website printed on it.</li>
            <li>Book your two HARUKA reserved seats there, from 30 days before boarding.</li>
            <li>On your first day, press &quot;Use ticket&quot; after 04:00 and scan the QR code at the gate.</li>
          </ol>
          <p className={styles.bodyText}>
            Changes and refunds before &quot;Use ticket&quot; go through the agency you bought from, which may
            charge its own fee; after &quot;Use ticket&quot; JR West gives no refund, including for delays or
            suspensions. A smartphone with internet is required (a companion&apos;s phone can display it).
            Eligibility is a passport issued by a foreign government and Temporary Visitor entry status —
            Japanese nationals cannot use it. The old paper pass, sold until 30 September 2026, was the one
            with an exchange order to swap at a JR West station. Checked {CHECKED} on{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener" style={{ color: "var(--text)" }}>
              westjr.co.jp
            </a>
            .
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Buy the Kansai Area Pass voucher →
            </KlookLink>
          </div>
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

        <KlookTourPicks
          heading="The Two Kansai Rail Passes Side by Side"
          intro="Both listings are the JR West products described above, sold with an English checkout. The Area Pass includes the Haruka; the Mini Pass is cheaper and does not. Open a listing for the current price on your dates."
          tours={[jrKansaiAreaPass, jrKansaiMiniPass]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 13 Nov 2026: the Sea of Japan onsen town, inside the WIDE pass. */}
            <Link href="/guides/attractions/kinosaki-onsen-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kinosaki Onsen Day Trip (2026): From Osaka, Bath Pass and Ryokan</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 6 Nov 2026: the Kii Mountains pilgrimage road, as a day from Osaka or a two-day walk. */}
            <Link href="/guides/attractions/kumano-kodo-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kumano Kodo Tour (2026): Day Trips, the Nakahechi and How Far You Walk</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 6 Nov 2026: the sandbar and the Ine boathouses as a day out. */}
            <Link href="/guides/attractions/amanohashidate-ine-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Amanohashidate Day Trip (2026): Ine Boathouses, Tours and Trains From Kyoto</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 5 Nov 2026: west of the pass area, for a longer loop. */}
            <Link href="/guides/attractions/hiroshima-peace-memorial-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hiroshima Peace Memorial Tour: Guides, Museum &amp; Tickets</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 4 Nov 2026: the rail pass guide for this route. */}
            <Link href="/guides/transport/kintetsu-rail-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kintetsu Rail Pass (2026): Prices and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 30 Oct 2026: the itinerary this pass is usually bought for, with the three-day break-even worked through. */}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Kyoto 3 Day Itinerary (2026): Day by Day &amp; Bookings</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 3 Nov 2026 (jtk-20261103-06): two JR day trips the pass covers end to end. */}
            <Link href="/guides/attractions/himeji-castle-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V9l3-2 4 2 4-2 3 2v12" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Himeji Castle Day Trip (2026): ¥2,500 Admission and Times</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kobe-day-trip-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kobe Day Trip from Osaka (2026): Routes, the Beef and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-6-7 10-3-4z" />
                  <path d="M12 16l-1 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18M7 21l1.5-4M17 21l-1.5-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass vs Enjoy Eco Card (2026): Which to Buy?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass 2026: ¥3,500, Worth It? + 1-Day Plan</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18h18M6 18V9l6-5 6 5v9" />
                  <path d="M9 18v-5h6v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
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
            <h2 className={styles.ctaBannerTitle}>Turn the airport run into the whole region</h2>
            <p className={styles.ctaBannerDesc}>
              One to four days of JR West trains around Osaka, Kyoto, Kobe, Nara and Himeji, with the Haruka
              from Kansai Airport included. If the airport run is your only JR ride, buy the single instead.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={KANSAI_PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Kansai Area Pass →
              </KlookLink>
              <KlookLink href={HARUKA_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Haruka Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
