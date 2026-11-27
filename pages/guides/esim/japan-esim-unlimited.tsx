import Head from "next/head";
import Link from "next/link";
import { EsimAltLinks } from "../../../components/EsimPageAnswer";
import styles from "../../../styles/BestEsimJapan.module.css";
import SimbyeOffer from "../../../components/SimbyeOffer";
import {
  cheapestAtLeastGb,
  cheapestUnlimited,
  formatUsd,
  getProvider,
  latestCheckedAt,
  plansFor,
  priceAtLeastLabel,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import { EsimCtaTop } from "../../../components/EsimCta";
import BookingEsimCard from "../../../components/BookingEsimCard";

// Every price on this page is read from data/esim-prices.json (refreshed daily).
const pricesCheckedAt = pricesCheckedLabel();
const PRICES_CHECKED_ISO = (latestCheckedAt() ?? "").slice(0, 10) || "not yet checked";
// Daily thresholds, hotspot rules and networks were read off each provider's own site.
// All five were re-read on 18 Nov 2026 (R06). That read changed eSIM Go: its Japan page now
// says unlimited plans get 1 GB of full speed per 24 hours, then a reduced speed, on KDDI and
// NTT Docomo, so the old pooled "Premium" allowance and the Docomo / SoftBank network in the
// price feed are not used on this page.
// R05 (27 Nov 2026) re-read: Sakura Mobile (unlimited on au/KDDI, "no daily limit", hotspot capped
// at 30 GB or less by plan length; 7/10/14/30 days ¥5,775/¥7,370/¥9,240/¥14,575 tax incl.),
// Holafly (1 GB of hotspot data per day bought; FUP up to 1 day), Airalo FUP (3 GB/day, then
// 1 Mbps), Ubigi (Japan Unlimited 15 days US$39 = 30 GB full speed, 30 days US$65 = 60 GB, then
// 2 Mbps; KDDI / NTT Docomo / SoftBank; no 7-day page), Klook 109393 and Simbye via the search
// index (both return 403/429 to scripts): Klook unlimited = 10 GB a day at high speed, then
// 128 kbps, SoftBank 5G; Simbye = 2 GB a day, then 1 Mbps, hotspot allowed.
const TERMS_CHECKED = "27 Nov 2026";
const TERMS_CHECKED_ISO = "2026-11-27";
const ESIMGO_NETWORK = "KDDI (au) / NTT Docomo";
const UBIGI_URL = "https://cellulardata.ubigi.com/rates-and-coverage/japan-data-plans/japan-unlimited-30-days/";
const TERMS_SOURCES = [
  { label: "Simbye", href: "https://simbye.com/products/esim-japan" },
  { label: "Ubigi Japan Unlimited", href: UBIGI_URL },
  { label: "eSIM Go (Breeze)", href: "https://breezesim.com/products/esim-japan" },
  { label: "Airalo fair use policy", href: "https://www.airalo.com/m/resources/unlimited-data-plans-fair-use-policy" },
  { label: "Holafly Japan", href: "https://esim.holafly.com/esim-japan/" },
  { label: "Sakura Mobile travel eSIM", href: "https://www.sakuramobile.jp/travel/esim/" },
];
const linkStyle = { color: "var(--accent)", fontWeight: 600 };
const noteStyle = { marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" };

/** "Last checked … Sources: …" line that sits under every table on this page. */
function SourcesLine({ what }: { what: string }) {
  return (
    <p className={styles.bodyText} style={noteStyle}>
      <strong>Last checked: {TERMS_CHECKED_ISO}</strong> ({what}; prices {PRICES_CHECKED_ISO}). Official pages:{" "}
      <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)" }}>Klook eSIM listing</KlookLink>,{" "}
      {TERMS_SOURCES.map((s, i) => (
        <span key={s.href}>
          <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{s.label}</a>
          {i < TERMS_SOURCES.length - 1 ? ", " : "."}
        </span>
      ))}
    </p>
  );
}
const SIMBYE_UNL_PLAN = cheapestUnlimited("simbye", 7);
const SIMBYE_UNL_PLANS = plansFor("simbye").filter((p) => p.unlimited);
const HOLAFLY_FROM = priceFromLabel("holafly");
const HOLAFLY_5 = unlimitedFromLabel("holafly", 5);
const HOLAFLY_30 = unlimitedFromLabel("holafly", 30);
const SAKURA_UNL = unlimitedFromLabel("sakura", 7);
const SAKURA_UNL_30 = unlimitedFromLabel("sakura", 30);
const AIRALO_10 = priceAtLeastLabel("airalo", 10);
const AIRALO_FROM = priceFromLabel("airalo");
const ESIMGO_10 = priceAtLeastLabel("esimgo", 10);
const SIMBYE_10 = priceAtLeastLabel("simbye", 10);
// Bare prices: these sit in sentences that already say "for 7 days".
const usdFor7Days = (id: EsimProviderId) => {
  const plan = cheapestUnlimited(id, 7);
  return plan ? formatUsd(plan.priceUsd) : "—";
};
const usdAtLeast = (id: EsimProviderId, gb: number) => {
  const plan = cheapestAtLeastGb(id, gb);
  return plan ? formatUsd(plan.priceUsd) : "—";
};
const ESIMGO_UNL = usdFor7Days("esimgo");
const AIRALO_UNL = usdFor7Days("airalo");
const SIMBYE_UNL = usdFor7Days("simbye");
const SIMBYE_UNL_30 = unlimitedFromLabel("simbye", 30);
const SIMBYE_FAIR_USE = "2 GB/day at full speed, then 1 Mbps";

const COMPARED: EsimProviderId[] = ["simbye", "esimgo", "airalo", "holafly", "sakura"];
/** Every unlimited plan of exactly `days` validity among the five, cheapest first. */
function unlimitedPlansAt(days: number) {
  return COMPARED.flatMap((id) =>
    plansFor(id).filter((p) => p.unlimited && p.days === days).map((p) => ({ id, name: getProvider(id).name, price: p.priceUsd })),
  ).sort((a, b) => a.price - b.price);
}
/** "$19.99–$37.95" across the five for one trip length. */
function unlimitedRange(days: number): string {
  const rows = unlimitedPlansAt(days);
  if (!rows.length) return "—";
  const lo = rows[0].price;
  const hi = rows[rows.length - 1].price;
  return lo === hi ? formatUsd(lo) : `${formatUsd(lo)}–${formatUsd(hi)}`;
}
const CHEAPEST_UNL_7 = unlimitedPlansAt(7)[0];

/**
 * Table 3: the cheapest way to buy a trip of N days, unlimited against a large fixed plan.
 * Both come from the daily price feed; the fixed side is the cheapest plan of at least 10
 * or 20 GB that still lasts the whole trip.
 */
function cheapestFixedCovering(days: number, gb: number) {
  const rows = COMPARED.flatMap((id) =>
    plansFor(id)
      .filter((p) => !p.unlimited && !p.dailyCapGb && p.days >= days && (p.gb ?? 0) >= gb)
      .map((p) => ({ id, label: `${getProvider(id).name} ${p.gb} GB / ${p.days} days`, price: p.priceUsd })),
  ).sort((a, b) => a.price - b.price);
  return rows[0] ?? null;
}
const TRIP_LENGTHS = [7, 15, 30];
const tripCostRows = TRIP_LENGTHS.map((days) => {
  const unl = unlimitedPlansAt(days)[0] ?? null;
  return {
    days,
    unl: unl ? `${unl.name} — ${formatUsd(unl.price)}` : "—",
    unlPerDay: unl ? formatUsd(unl.price / days) : "—",
    fixed10: cheapestFixedCovering(days, 10),
    fixed20: cheapestFixedCovering(days, 20),
  };
});

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so Holafly's purchase CTAs point at Airalo's unlimited plans, the closest approved alternative.
const ALT_URL = getProvider("airalo").affiliateUrl;
const ALT_LABEL = "Get Airalo unlimited eSIM →";
const ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";
const altNoteStyle = { fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 };

/** What one unlimited plan costs at each length, or "—" where the provider sells none. */
function unlimitedAt(id: EsimProviderId, days: number): string {
  const plan = plansFor(id).find((p) => p.unlimited && p.days === days);
  return plan ? formatUsd(plan.priceUsd) : "—";
}

/**
 * The answer table: price by trip length, and what each "unlimited" slows to. Prices are
 * the daily feed; thresholds are the same provider-site read as best-esim-japan.
 */
const UNLIMITED_DAYS = [7, 15, 30];
const unlimitedRows: {
  key: string;
  /** Provider in the daily price feed; rows without one carry fixed `prices`. */
  id?: EsimProviderId;
  /** Prices for UNLIMITED_DAYS when the plan is not in the feed. */
  prices?: string[];
  name: string;
  full: string;
  after: string;
  hotspot: string;
  network: string;
  buyHref: string;
  buyLabel: string;
  klook?: boolean;
}[] = [
  { key: "klook", prices: ["By date on Klook", "By date on Klook", "By date on Klook"], name: "Klook eSIM Unlimited — most full speed a day", full: "10 GB a day", after: "128 kbps until the next day", hotspot: "Allowed", network: "SoftBank 5G", buyHref: klookEsim.url, buyLabel: "See Klook eSIM →", klook: true },
  { key: "simbye", id: "simbye", name: "Simbye Unlimited — lowest price", full: "2 GB a day", after: "1 Mbps until the next 24 h", hotspot: "Allowed (counts toward the 2 GB)", network: getProvider("simbye").network, buyHref: getProvider("simbye").affiliateUrl, buyLabel: "Get Simbye →" },
  { key: "sakura", id: "sakura", name: "Sakura Mobile Unlimited — no daily cap", full: "No daily limit (“high speed: unlimited”)", after: "None published", hotspot: "Capped at 30 GB or less, by plan length (2 GB on 1 day)", network: "au (KDDI) 5G", buyHref: "https://p.sakuramobile.jp/idevaffiliate.php?id=486", buyLabel: "Get Sakura Mobile →" },
  { key: "ubigi", prices: ["—", "US$39", "US$65"], name: "Ubigi Japan Unlimited", full: "30 GB per plan (15 days), 60 GB (30 days)", after: "2 Mbps for the rest of the plan", hotspot: "Data sharing allowed", network: "KDDI / NTT Docomo / SoftBank", buyHref: UBIGI_URL, buyLabel: "Ubigi site →" },
  { key: "holafly", id: "holafly", name: "Holafly", full: "No published daily threshold", after: "Fair Usage Policy may slow it for up to 1 day", hotspot: "1 GB per day bought (7 GB on a 7-day plan)", network: getProvider("holafly").network, buyHref: ALT_URL, buyLabel: "No link — Airalo instead →" },
  { key: "airalo", id: "airalo", name: "Airalo Unlimited", full: "3 GB a day (24 h from activation)", after: "1 Mbps until the 24-hour reset", hotspot: "Allowed, no device limit; counts toward the 3 GB", network: getProvider("airalo").network, buyHref: getProvider("airalo").affiliateUrl, buyLabel: "Get Airalo →" },
  { key: "esimgo", id: "esimgo", name: "eSIM Go Unlimited", full: "1 GB per 24 hours", after: "Reduced (speed not stated) until the next 24 h", hotspot: "Allowed on every plan", network: ESIMGO_NETWORK, buyHref: getProvider("esimgo").affiliateUrl, buyLabel: "Get eSIM Go →" },
];

const dataUsageTable = [
  { activity: "Google Maps navigation",          perDay: "~50 MB",   weeklyTotal: "~350 MB" },
  { activity: "Messaging (WhatsApp / LINE)",     perDay: "~20 MB",   weeklyTotal: "~140 MB" },
  { activity: "Social media browsing",           perDay: "~150 MB",  weeklyTotal: "~1 GB"   },
  { activity: "Instagram / photo uploads",       perDay: "~300 MB",  weeklyTotal: "~2 GB"   },
  { activity: "Video calls (30 min/day)",        perDay: "~450 MB",  weeklyTotal: "~3 GB"   },
  { activity: "Streaming video (1 hr/day)",      perDay: "~1,200 MB", weeklyTotal: "~8 GB"  },
];

// Table 2: who needs unlimited, by daily use. The daily figures are the activity estimates in
// dataUsageTable added up; the plan named in each row is matched to its stated daily threshold.
const usageRows = [
  { dailyUse: "Under 0.5 GB",  who: "Maps, trains, messaging, a few photos",          verdict: "Not needed",  verdictClass: "bad" as const,  buy: "A 5–10 GB fixed plan" },
  { dailyUse: "0.5–1 GB",      who: "Plus social media and daily photo uploads",       verdict: "Not usually", verdictClass: "warn" as const, buy: "A 10–20 GB fixed plan" },
  { dailyUse: "1–2 GB",        who: "An hour of HD video or long video calls a day",   verdict: "Yes",         verdictClass: "good" as const, buy: "Simbye Unlimited (2 GB a day at full speed)" },
  { dailyUse: "2–3 GB",        who: "A laptop on the hotspot, remote work",            verdict: "Yes",         verdictClass: "good" as const, buy: "Airalo Unlimited (3 GB a day, no tethering limit)" },
  { dailyUse: "Over 3 GB",     who: "Hours of streaming on the phone itself",          verdict: "Yes",         verdictClass: "good" as const, buy: "Klook eSIM (10 GB a day at full speed) or Sakura Mobile (no daily cap on the phone)" },
];

const planVsDataRows = [
  { usage: "Up to 5 GB",   recommendation: "Simbye, eSIM Go or Airalo",  reason: "Much cheaper than any unlimited plan" },
  { usage: "5 GB – 10 GB", recommendation: `Simbye 10 GB (${usdAtLeast("simbye", 10)}), eSIM Go 10 GB (${usdAtLeast("esimgo", 10)}) or Airalo 10 GB (${usdAtLeast("airalo", 10)})`, reason: "Best price-to-data ratio for typical tourists" },
  { usage: "10 GB – 15 GB", recommendation: `Simbye 20 GB (${usdAtLeast("simbye", 20)}) or Simbye Unlimited (${SIMBYE_UNL} for 7 days)`,  reason: "A larger fixed plan is usually cheaper on anything longer than a week" },
  { usage: "15 GB+",        recommendation: "An unlimited plan, chosen by its daily threshold",  reason: "2–3 GB a day at full speed covers it; past that, Klook eSIM (10 GB a day) or Sakura Mobile, which publishes no daily cap on the phone" },
];

const topPicks = [
  {
    rank: 1,
    name: "Simbye Unlimited",
    badge: "Lowest Confirmed Unlimited Price",
    badgeClass: "pickBadgeGreen" as const,
    summary: `The lowest unlimited list price at 7 days or more: ${SIMBYE_UNL} for a week up to ${SIMBYE_UNL_30} for 30 days (checked ${pricesCheckedAt}), with 2 GB a day at full speed and then 1 Mbps. Runs on ${getProvider("simbye").network}, with tethering allowed. Our top pick unless you regularly pass 2 GB a day.`,
    bestFor: "Most people searching for unlimited: no hard stop, and rarely past 2 GB a day",
    pros: ["Lowest unlimited list price at 7 days or more", "Tethering allowed", "7, 15 and 30-day plans"],
    cons: [SIMBYE_FAIR_USE, "No top-up on unlimited plans", "Data-only — no Japanese number or calls"],
    cta: "Get Simbye Unlimited →",
    href: getProvider("simbye").affiliateUrl,
  },
  {
    rank: 2,
    name: "Klook eSIM Unlimited",
    badge: "Most Full-Speed Data per Day",
    badgeClass: "pickBadgeGreen" as const,
    summary: `Klook's own Japan eSIM sells unlimited plans of 1 to 30 days with 10 GB a day at high speed, then 128 kbps until the next day, on SoftBank 5G (Klook listing, read ${TERMS_CHECKED}). That is the highest daily full-speed allowance of the plans that publish one, and tethering is allowed. Klook sets the price by date and plan length, so it is not quoted here.`,
    bestFor: "Heavy daily use — video, uploads, a hotspot — when you book tickets or transport on Klook anyway",
    pros: ["10 GB a day at full speed", "Tethering allowed", "1 to 30-day plans, one Klook checkout"],
    cons: ["128 kbps after the daily 10 GB", "Price varies by date", "Data-only — no Japanese number"],
    cta: klookEsim.ctaLabel,
    href: klookEsim.url,
    klook: true,
  },
  {
    rank: 3,
    name: "Airalo Unlimited",
    badge: "No Tethering Limit",
    badgeClass: "pickBadgeBlue" as const,
    summary: `From ${AIRALO_UNL} for 7 days (checked ${pricesCheckedAt}). Full speed runs to 3 GB a day, then 1 Mbps until the 24-hour reset, and Airalo states no limit on tethering or on the number of devices. Dearer than Simbye and eSIM Go, for an app and live chat.`,
    bestFor: "A tethered laptop on a trip of up to 30 days, with support on hand",
    pros: ["3 GB a day at full speed", "No stated limit on tethering", "App with 24/7 live chat"],
    cons: ["Dearer than Simbye and eSIM Go at a week", "1 Mbps after the daily 3 GB", "Data-only — no calls or SMS"],
    cta: ALT_LABEL,
    href: ALT_URL,
  },
  {
    rank: 4,
    name: "eSIM Go Unlimited",
    badge: "Unlimited From 1 Day",
    badgeClass: "pickBadgeBlue" as const,
    summary: `From ${ESIMGO_UNL} for 7 days (checked ${pricesCheckedAt}). Its Japan page (read ${TERMS_CHECKED}) gives unlimited plans 1 GB of full speed per 24 hours, then a reduced speed until the next 24-hour period, on KDDI and NTT Docomo. Tethering is allowed on every plan, and it sells unlimited plans from a single day, which Simbye does not.`,
    bestFor: "Short trips of 1 to 5 days where you want no hard stop and use under 1 GB a day",
    pros: ["Unlimited from 1 day", "Tethering on every plan", "Second-lowest 7-day unlimited price here"],
    cons: ["Only 1 GB a day at full speed", "Longest unlimited plan listed is 15 days", "Data-only — no Japanese number or calls"],
    cta: "Get eSIM Go Unlimited →",
    href: getProvider("esimgo").affiliateUrl,
  },
  {
    rank: 5,
    name: "Holafly",
    badge: "No Daily Threshold",
    badgeClass: "pickBadgeOrange" as const,
    summary: `The best-known unlimited eSIM for Japan, with no published daily threshold on the phone itself (its Fair Usage Policy can slow it for up to a day), though hotspot use is capped at 1 GB a day. Runs on ${getProvider("holafly").network}, from ${HOLAFLY_FROM} for a short trip to ${HOLAFLY_30} for a month (checked ${pricesCheckedAt}). Ranked here because it costs more than Simbye and eSIM Go and we have no link to it.`,
    bestFor: "Heavy phone-only use, with no laptop to tether",
    pros: ["No daily threshold on the phone", "1 to 30-day plans", "Buy before you fly — instant QR delivery"],
    cons: ["Hotspot capped at 1 GB per day bought", "Dearer than Simbye and eSIM Go", "Data-only — no voice calls"],
    cta: ALT_LABEL,
    href: ALT_URL,
    note: ALT_NOTE,
  },
  {
    rank: 6,
    name: "Sakura Mobile",
    badge: "Japan-Based Support",
    badgeClass: "pickBadgeOrange" as const,
    summary: `Sakura Mobile's unlimited travel eSIM runs on au/KDDI with no daily limit on the phone and a hotspot cap of 30 GB or less by plan length, from ${SAKURA_UNL} up to ${SAKURA_UNL_30} (¥5,775 for 7 days and ¥14,575 for 30 days, tax included, on its own page), with a 3 GB/day Docomo option for longer stays. It is the Japan-based choice: English phone support, and physical-SIM plans with a voice option for travellers who need to make local calls.`,
    bestFor: "Long-stay travellers and anyone who wants Japan-based English support or a voice-call SIM",
    pros: ["Japan-based English-speaking support", "Unlimited (au/KDDI) or 3 GB/day (Docomo) eSIM plans", "Voice-call SIM plans available", "Plans from 3 to 30+ days"],
    cons: ["The dearest unlimited plan here", "Hotspot allowance depends on plan length", "Slightly slower initial setup"],
    cta: "Get Sakura Mobile Unlimited →",
    href: "https://p.sakuramobile.jp/idevaffiliate.php?id=486",
  },
];

const comparisonRows = [
  { feature: "Data allowance",   holafly: "Unlimited",     simbye: "Unlimited", sakura: "Unlimited or 3 GB/day", airalo: "10 GB (fixed plan)" },
  { feature: "Throttling",       holafly: "Fair Usage Policy, up to 1 day; hotspot 1 GB/day", simbye: SIMBYE_FAIR_USE, sakura: "No daily speed cap stated; hotspot by plan", airalo: "Data stops at cap" },
  { feature: "Network",         holafly: getProvider("holafly").network, simbye: getProvider("simbye").network, sakura: getProvider("sakura").network, airalo: getProvider("airalo").network },
  { feature: "Voice calls",      holafly: "✗",             simbye: "✗", sakura: "SIM plans only", airalo: "✗" },
  { feature: "Min. duration",    holafly: "1 day",         simbye: "7 days", sakura: "3 days",         airalo: "3 days" },
  { feature: "Price from",       holafly: HOLAFLY_FROM,    simbye: SIMBYE_UNL, sakura: SAKURA_UNL,       airalo: AIRALO_FROM },
  { feature: "English support",  holafly: "24/7 chat",     simbye: "Chat and email", sakura: "Email (Japan)",  airalo: "Chat / app" },
];

const faqItems = [
  {
    q: "Is there a truly unlimited eSIM for Japan?",
    a: `On the phone, Sakura Mobile's unlimited eSIM on au (KDDI) is the one listed as "high speed: unlimited" with no daily limit; Holafly publishes no cap either but says a Fair Usage Policy can slow it for up to one day, and both limit hotspot data. Every other unlimited plan slows after a full-speed allowance: eSIM Go after 1 GB per 24 hours, Simbye after 2 GB a day (then 1 Mbps), Airalo after 3 GB a day (1 Mbps), Klook eSIM after 10 GB a day (128 kbps) and Ubigi after 30 GB on 15 days or 60 GB on 30 days (2 Mbps). Terms read on each provider's own page, ${TERMS_CHECKED}.`,
  },
  {
    q: "How much is an unlimited eSIM for Japan?",
    a: `${unlimitedRange(7)} for 7 days, ${unlimitedRange(15)} for 15 days and ${unlimitedRange(30)} for 30 days across Simbye, eSIM Go, Airalo, Holafly and Sakura Mobile (list prices checked ${pricesCheckedAt}); Ubigi charges US$39 for 15 days and US$65 for 30, and Klook prices its unlimited eSIM by date. The cheapest 7-day plan is ${CHEAPEST_UNL_7 ? `${CHEAPEST_UNL_7.name} at ${formatUsd(CHEAPEST_UNL_7.price)}` : "—"}; a 10 GB fixed plan such as Simbye's at ${SIMBYE_10} is cheaper if you use under about 1 GB a day.`,
  },
  {
    q: "Which network do unlimited Japan eSIMs use?",
    a: `Japan's own carriers, which one depending on the provider. Klook's unlimited eSIM runs on SoftBank 5G, Sakura Mobile's on au (KDDI) 5G, Holafly on KDDI and SoftBank, Airalo on SoftBank, eSIM Go on KDDI and NTT Docomo, and Simbye and Ubigi list KDDI, NTT Docomo and SoftBank (Simbye adds Rakuten Mobile). All of them cover Tokyo, Kyoto, Osaka and the main rail routes; Docomo reaches furthest in rural areas.`,
  },
  {
    q: "Can I hotspot with an unlimited Japan eSIM?",
    a: `Yes, on every plan compared here, with different limits. Airalo states no limit on tethering or devices, though hotspot data counts toward its 3 GB a day at full speed; Klook eSIM, Simbye, eSIM Go and Ubigi allow it; Holafly allows 1 GB of shared data per day bought; and Sakura Mobile caps hotspot use at 30 GB or less depending on plan length. For a laptop, Klook eSIM (10 GB a day) or Airalo is the safer choice (read ${TERMS_CHECKED}).`,
  },
  {
    q: "Do I need unlimited data in Japan?",
    a: `Only if you use more than about 1 GB a day: an hour of HD video (about 1.2 GB), several hours of video calls, or a laptop on your hotspot. Maps, trains, messaging and social media come to about 1–3 GB a week, so Simbye's 10 GB plan at ${SIMBYE_10} covers a typical trip; the Japan eSIM data plans guide sizes a fixed plan by trip length.`,
  },
];

const whoShouldGet = [
  {
    title: "Daily video streamers",
    desc: "Watching Netflix, YouTube, or local TV for an hour or more each day. At 1.2 GB per hour of video, you'd need 36 GB for a month — well beyond any fixed plan.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    title: "Remote workers on video calls",
    desc: "Multiple hours of Zoom or Teams meetings per day. A 2-hour daily video call uses around 900 MB — 27 GB over a month.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Content creators uploading daily",
    desc: "Uploading photos, Reels, or video content every day. Upload speeds matter as much as download — Docomo and SoftBank LTE both support solid upload throughput.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-unlimited") } });

// Owns "unlimited eSIM Japan". "Best" is left to best-esim-japan and "cheapest" to
// cheapest-esim-japan, so the three do not compete for one another's term.
// R10 (11 Nov 2026): the title carries "japan esim unlimited data" and the H1 "unlimited esim
// japan", the two largest query shapes landing here in GSC.
// R06 (18 Nov 2026): the title keeps "Japan eSIM Unlimited Data 2026" and adds the question the
// top results answer ("is it really unlimited?"); the H1 opens with the same words in the same
// order and carries "unlimited eSIM Japan" in its second half.
// R05 (27 Nov 2026): the page now leads with the question itself ("unlimited data eSIM for Japan",
// "is it really unlimited?"). "Cost" stays out of the title and H1 — the cost queries belong to
// japan-esim-price-tracker, which this page links with a "Japan eSIM cost" anchor. The title drops
// the parentheses the H1 keeps so it fits 60 characters without the brand.
const TITLE = "Unlimited Data eSIM for Japan 2026: Is It Really Unlimited?";
const H1_LEAD = "Unlimited Data eSIM for Japan (2026):";
const H1_SUB = "Is It Really Unlimited?";
const H1 = `${H1_LEAD} ${H1_SUB}`;
const DESCRIPTION = `Unlimited data eSIM for Japan from ${SIMBYE_UNL} for 7 days, but most slow after 1–10 GB a day. Daily caps, networks and hotspot limits for 7 plans.`;

export default function JapanEsimUnlimitedPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-unlimited" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-unlimited" />
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
              route: "/guides/esim/japan-esim-unlimited",
              headline: H1,
              updated,
            }),
          }}
        />
        {SIMBYE_UNL_PLAN && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: productOfferJsonLd({
                route: "/guides/esim/japan-esim-unlimited",
                name: "Simbye Japan Unlimited eSIM",
                description: "Unlimited Japan eSIM: 2 GB a day at full speed, then 1 Mbps, in 7, 15 and 30-day plans.",
                brand: "Simbye",
                currency: "USD",
                lowPrice: SIMBYE_UNL_PLAN.priceUsd,
                highPrice: Math.max(...SIMBYE_UNL_PLANS.map((p) => p.priceUsd)),
                offerCount: SIMBYE_UNL_PLANS.length,
              }),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",               item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",             item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards",   item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Unlimited eSIM", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-unlimited" },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Unlimited eSIM</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Prices checked {pricesCheckedAt}
          </p>
          <h1 className={styles.heroTitle}>
            {H1_LEAD}{" "}<br />{H1_SUB}
          </h1>
          <p className={styles.heroSubtitle}>
            What each Japan eSIM with unlimited data costs for 7, 15 and 30 days, how much runs at full speed before it slows, which network it uses, and which one you can tether a laptop to.
          </p>
          <div className={styles.heroBadges}>
            {["Prices checked daily", "Fair-use limits compared", `Terms read ${TERMS_CHECKED}`].map((t) => (
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

        {/* The answer: a pick in the first sentence, then the table the query is asking for. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Most <strong>unlimited data eSIMs for Japan</strong> are unlimited only at a reduced speed: eSIM Go slows
            after 1 GB per 24 hours, Simbye after 2 GB a day (then 1 Mbps), Airalo after 3 GB a day (1 Mbps), Klook
            eSIM after 10 GB a day (128 kbps) and Ubigi after 30 GB on a 15-day plan or 60 GB on a 30-day plan (2
            Mbps). <strong>Sakura Mobile&apos;s unlimited eSIM on au (KDDI) is the one with no daily speed limit on
            the phone</strong>, with Holafly publishing no cap but reserving a Fair Usage slowdown of up to one day,
            and both cap hotspot data. Unlimited plans run {unlimitedRange(7)} for 7 days and {unlimitedRange(30)} for
            30 days (list prices checked {pricesCheckedAt}; terms read {TERMS_CHECKED}).
          </p>
          <p className={styles.bodyText}>
            For the most full-speed data a day, buy <strong>Klook eSIM Unlimited (10 GB a day, SoftBank 5G)</strong>;
            for the lowest price, <strong>Simbye Unlimited at {SIMBYE_UNL} for 7 days</strong> ({unlimitedAt("simbye", 15)} for
            15 days, {unlimitedAt("simbye", 30)} for 30), with tethering allowed on both.{" "}
            <strong>You need unlimited data in Japan</strong> only if you use more than about 1 GB a day; Maps,
            messaging and social media come to about 1–3 GB a week, so Simbye&apos;s 10 GB plan at {SIMBYE_10} covers
            a typical trip. What every Japan eSIM costs, fixed plans included, is in the{" "}
            <Link href="/guides/esim/japan-esim-price-tracker" style={linkStyle}>Japan eSIM cost</Link> tracker.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem", flexWrap: "wrap", gap: "0.6rem" }} data-placement="unlimited-answer">
            <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              {klookEsim.ctaLabel}
            </KlookLink>
            <a href={getProvider("simbye").affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Get Simbye Unlimited — {SIMBYE_UNL} / 7 days →
            </a>
          </div>
        </section>

        <BookingEsimCard lead="Want no hard stop on your data? Unlimited plans:" />

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest unlimited</p>
                <p className={styles.verdictStatValue}>Simbye — {SIMBYE_UNL} / 7 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Most full speed a day + tethering</p>
                <p className={styles.verdictStatValue}>Klook eSIM — 10 GB/day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>No daily cap on the phone</p>
                <p className={styles.verdictStatValue}>Sakura Mobile (au) — {usdFor7Days("sakura")}</p>
              </div>
            </div>
            <a
              href={getProvider("simbye").affiliateUrl}
              className={styles.verdictBtn}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Get Simbye Unlimited →
            </a>
            <KlookLink href={klookEsim.url} className={styles.verdictBtn} target="_blank" rel="sponsored nofollow noopener" style={{ marginTop: "0.6rem" }}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
        </div>

        <SimbyeOffer />
        <div data-placement="esim-page-answer">
          <EsimAltLinks />
        </div>

        <EsimCtaTop />

        {/* Answer table: price by trip length, then what each "unlimited" slows to. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compared</span>
          <h2 className={styles.sectionTitle}>Is There a Truly Unlimited eSIM for Japan?</h2>
          <p className={styles.bodyText}>
            On the phone, yes: Sakura Mobile&apos;s unlimited eSIM on au (KDDI) has no daily speed limit, and Holafly
            publishes none. Every other plan below is unlimited at a reduced speed once its full-speed allowance is
            used, so the two numbers to compare are that allowance and the speed it drops to.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Network", ...UNLIMITED_DAYS.map((d) => `${d} days`), "Full speed per day", "After that", "Tethering", "Buy"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={UNLIMITED_DAYS.length + 6} style={{ fontSize: "0.86rem", color: "var(--text)", fontWeight: 600 }}>
                      Bottom line: only Sakura Mobile on au has no daily speed limit on the phone (Holafly publishes
                      none either); Klook eSIM gives the most full-speed data a day (10 GB); Simbye is the cheapest
                      unlimited plan at 7 days or more ({SIMBYE_UNL}).
                    </td>
                  </tr>
                  {unlimitedRows.map((row) => (
                    <tr key={row.key}>
                      <td className={styles.tdProvider} style={{ minWidth: "150px" }}>{row.name}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "130px" }}>{row.network}</td>
                      {UNLIMITED_DAYS.map((d, i) => (
                        <td key={d} className={styles.tdPrice}>{row.id ? unlimitedAt(row.id, d) : row.prices?.[i] ?? "—"}</td>
                      ))}
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "130px" }}>{row.full}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "120px" }}>{row.after}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "130px" }}>{row.hotspot}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "120px" }}>
                        {row.klook ? (
                          <KlookLink href={row.buyHref} target="_blank" rel="sponsored nofollow noopener" style={linkStyle}>{row.buyLabel}</KlookLink>
                        ) : (
                          <a href={row.buyHref} target="_blank" rel={row.key === "ubigi" ? "noopener noreferrer nofollow" : "sponsored nofollow noopener"} style={linkStyle}>{row.buyLabel}</a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourcesLine what="fair-use, tethering and network terms on each provider's page" />
          <p className={styles.bodyText} style={noteStyle}>
            Sakura Mobile lists its unlimited eSIM at ¥5,775 for 7 days, ¥7,370 for 10, ¥9,240 for 14 and ¥14,575 for
            30 (tax included); the table shows the USD feed price. Ubigi sells no 7-day unlimited plan for Japan.
          </p>
          <p className={styles.bodyText} style={noteStyle}>
            Unlimited plans from more providers — Maya Mobile, Nomad, Jetpac, aloSIM, Mobal and Japan Wireless — are
            in the <Link href="/guides/esim/japan-esim-price-tracker" style={{ color: "var(--accent)" }}>Japan eSIM price tracker</Link>,
            sorted by price per day and updated monthly.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <a href={getProvider("simbye").affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Get Simbye Unlimited — {SIMBYE_UNL} / 7 days →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Prices are each provider&apos;s list price in USD, read {pricesCheckedAt} by the job that re-reads them
            daily; &ldquo;—&rdquo; means no plan of that length is on sale. Holafly has no link on this site; our{" "}
            <Link href="/guides/esim/holafly-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>Holafly Japan review</Link>{" "}
            covers it in full, and Sakura Mobile&apos;s Japan-based support and voice SIM are in our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--accent)", fontWeight: 600 }}>Sakura Mobile review</Link>.
            Students on a study-abroad month or term rarely need unlimited — the tiers they do need are priced in{" "}
            <Link href="/guides/esim/japan-esim-students" style={{ color: "var(--accent)", fontWeight: 600 }}>Japan eSIM for students</Link>.
            The wider comparison, fixed plans included, is in our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>best eSIM for Japan guide</Link>; whether
            the common &ldquo;go unlimited&rdquo; forum advice holds up is checked on the{" "}
            <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--accent)", fontWeight: 600 }}>best eSIM for Japan reddit</Link>{" "}
            page; and if a fixed
            plan is enough, our{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>cheapest eSIM for Japan</Link>{" "}
            ranking sorts them by price per GB and shows what an eSIM costs in Japan at 1 GB, 10 GB and unlimited, and the{" "}
            <Link href="/guides/esim/japan-esim-data-plans" style={{ color: "var(--accent)", fontWeight: 600 }}>Japan eSIM data plans guide</Link>{" "}
            works out how many GB a fixed plan needs for your trip length. What unlimited data costs per day against a fixed
            plan&apos;s price per GB, at the median across every provider, is in the{" "}
            <Link href="/guides/esim/japan-esim-price-tracker" style={{ color: "var(--accent)", fontWeight: 600 }}>Japan eSIM cost</Link>{" "}
            tracker. Sharing one connection across a group is usually cheaper with a rented router: see{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>unlimited pocket WiFi in Japan</Link>,
            where each rental company&apos;s daily data limit is listed.
          </p>
          <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
            <span className={styles.pickTargetLabel}>Also on Klook:</span>
            <span>
              Klook&apos;s own Japan eSIM has an unlimited tier at 10 GB a day, then 128 kbps, per its listing. No price
              is quoted here because Klook prices change by date.{" "}
              <KlookLink
                href={klookEsim.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {klookEsim.ctaLabel}
              </KlookLink>
            </span>
          </div>
        </section>

        {/* Fair use: the question most "unlimited" searches are really asking. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Price and fair use</span>
          <h2 className={styles.sectionTitle}>How Much Is an Unlimited eSIM for Japan?</h2>
          <p className={styles.bodyText}>
            An unlimited eSIM for Japan runs {unlimitedRange(7)} for 7 days, {unlimitedRange(15)} for 15 days and{" "}
            {unlimitedRange(30)} for 30 days across Simbye, eSIM Go, Airalo, Holafly and Sakura Mobile (checked{" "}
            {pricesCheckedAt}), with Ubigi at US$39 for 15 days and US$65 for 30, and Klook pricing by date. The
            cheapest per day at a week or more is Simbye ({SIMBYE_UNL} for 7 days).
          </p>
          <p className={styles.bodyText}>
            What that buys is set by the fair-use terms. The data never stops on these plans, but the full speed usually does:
            eSIM Go slows after 1 GB per 24 hours, Simbye after 2 GB a day and Airalo after 3 GB a day, the last two to
            1 Mbps, with Airalo&apos;s day counted from when you activated the eSIM, not midnight. Klook eSIM runs to
            10 GB a day before dropping to 128 kbps, and Ubigi gives 30 GB (15 days) or 60 GB (30 days) for the whole
            plan, then 2 Mbps.
          </p>
          <p className={styles.bodyText}>
            Sakura Mobile&apos;s unlimited eSIM on au (KDDI) lists &ldquo;high speed: unlimited&rdquo; with no daily cap,
            and Holafly publishes no threshold, though its Japan page says a Fair Usage Policy can restrict speed for no
            more than one day to manage network traffic (prices by trip length are in the{" "}
            <Link href="/guides/esim/holafly-japan-review" style={linkStyle}>Holafly Japan review</Link>). Both limit
            the hotspot. Airalo also says its host networks may manage traffic at busy times, separately from the 3 GB
            rule. At 1 Mbps, maps, messaging and web pages still work; HD video does not.
          </p>
          <h2 className={styles.sectionTitle} style={{ marginTop: "1.75rem" }}>
            Can I Hotspot With an Unlimited Japan eSIM?
          </h2>
          <p className={styles.bodyText}>
            Yes on every plan here, with different limits. Airalo sets no limit on tethering or devices but counts
            hotspot data toward its 3 GB a day; Klook eSIM, Simbye, eSIM Go and Ubigi allow it; Holafly allows 1 GB of
            shared data per day bought; and Sakura Mobile caps hotspot use at 30 GB or less depending on plan length
            (2 GB on a 1-day plan). If the laptop is for work, the{" "}
            <Link href="/guides/esim/japan-esim-business" style={linkStyle}>
              best eSIM for a business trip to Japan
            </Link>{" "}
            sizes a working week at 3–4 GB a day and covers the Japanese-number question.
          </p>
          <h2 className={styles.sectionTitle} style={{ marginTop: "1.75rem" }}>
            Which Network Do Unlimited Japan eSIMs Use?
          </h2>
          <p className={styles.bodyText}>
            One or more of Japan&apos;s own networks, never a network of their own. Klook&apos;s unlimited eSIM runs
            on SoftBank 5G; Ubigi lists KDDI, NTT Docomo and SoftBank; Simbye lists{" "}
            {getProvider("simbye").network}; eSIM Go lists {ESIMGO_NETWORK}; Holafly lists{" "}
            {getProvider("holafly").network}; Airalo lists {getProvider("airalo").network}; and Sakura Mobile&apos;s
            unlimited plan runs on au (KDDI) 5G, with its 3 GB-a-day plan on Docomo. All of them are data only, with no
            Japanese phone number, except Sakura Mobile&apos;s separate Voice + Data eSIM.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Last checked: {TERMS_CHECKED_ISO}, on each provider&apos;s own page listed under the price table.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem", flexWrap: "wrap", gap: "0.6rem" }}>
            <a href={getProvider("simbye").affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Get Simbye Unlimited →
            </a>
            <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
        </section>

        {/* Table 2: who needs unlimited, by daily use. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Reality check</span>
          <h2 className={styles.sectionTitle}>Do I Need Unlimited Data in Japan?</h2>
          <p className={styles.bodyText}>
            Only if you use more than about 1 GB a day. Below that, a fixed plan is cheaper and never slows down; the{" "}
            <Link href="/guides/esim/japan-esim-data-plans" style={linkStyle}>Japan eSIM data plans guide</Link> sizes
            one by trip length, while this page covers only the unlimited plans.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Your daily use</th>
                    <th>Typical traveller</th>
                    <th>Need unlimited?</th>
                    <th>Buy this</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{ fontSize: "0.86rem", color: "var(--text)", fontWeight: 600 }}>
                      Bottom line: unlimited pays off above about 1 GB a day; most sightseeing trips use less.
                    </td>
                  </tr>
                  {usageRows.map((row) => (
                    <tr key={row.dailyUse}>
                      <td className={styles.ftFeature}>{row.dailyUse}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.who}</td>
                      <td>
                        <span
                          className={row.verdictClass === "good" ? styles.ftWinnerEsim : styles.ftWinnerSim}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            padding: "0.15rem 0.55rem",
                            borderRadius: "var(--radius-sm)",
                            background: row.verdictClass === "warn" ? "var(--paper-deep)" : undefined,
                            color: row.verdictClass === "warn" ? "var(--text)" : undefined,
                          }}
                        >
                          {row.verdict}
                        </span>
                      </td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.buy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourcesLine what="daily full-speed thresholds and hotspot rules; daily use is an estimate from the activity table below" />
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            How much common activities use per day and per week (approximate):
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Activity", "Per Day", "Per Week"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataUsageTable.map((row) => (
                    <tr key={row.activity}>
                      <td className={styles.tdProvider}>{row.activity}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.perDay}</td>
                      <td className={styles.tdPrice}>{row.weeklyTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            A typical tourist (Maps + messaging + social media) uses <strong>1–3 GB per week</strong>. Simbye&apos;s 10 GB
            plan at {SIMBYE_10} covers most people completely. Unlimited only makes sense if you&apos;re streaming video
            daily, doing multi-hour video calls, or working from a tethered laptop.
          </p>
        </section>

        {/* Best Unlimited section */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>The Unlimited Japan eSIMs, Ranked</h2>
          <div className={styles.picksList}>
            {topPicks.map((pick) => (
              <div key={pick.name} className={styles.pickCard}>
                <div className={styles.pickCardHeader}>
                  <div className={styles.pickRank}>
                    <span className={styles.pickNumber}>{pick.rank}</span>
                    <div className={styles.pickMeta}>
                      <span className={`${styles.pickBadge} ${styles[pick.badgeClass]}`}>{pick.badge}</span>
                      <span className={styles.pickName}>{pick.name}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.pickCardBody}>
                  <p className={styles.pickSummary}>{pick.summary}</p>
                  <div className={styles.pickTarget}>
                    <span className={styles.pickTargetLabel}>Best for:</span>
                    <span>{pick.bestFor}</span>
                  </div>
                  <div className={styles.pickGrid}>
                    <div className={styles.pickPros}>
                      <p className={styles.pickListLabel}>Pros</p>
                      <ul className={styles.pickList}>
                        {pick.pros.map((p) => (
                          <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.pickCons}>
                      <p className={styles.pickListLabel}>Cons</p>
                      <ul className={styles.pickList}>
                        {pick.cons.map((c) => (
                          <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={styles.pickCtaRow}>
                    {pick.klook ? (
                      <KlookLink href={pick.href} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
                        {pick.cta}
                      </KlookLink>
                    ) : (
                      <a href={pick.href} className={styles.pickCta} target="_blank" rel={pick.note ? "sponsored nofollow noopener" : "noopener noreferrer nofollow"}>
                        {pick.cta}
                      </a>
                    )}
                  </div>
                  {pick.note && <p style={altNoteStyle}>{pick.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unlimited vs Fixed comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>Unlimited vs Large Fixed Plans: Full Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Holafly</th>
                    <th>Simbye Unlimited</th>
                    <th>Sakura Mobile</th>
                    <th>Airalo 10 GB</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.holafly}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.simbye}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.sakura}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.airalo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourcesLine what="throttling, network and minimum-length terms on each provider's page" />
        </section>

        <SimbyeOffer />

        {/* Unlimited vs Large Data: rule of thumb */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost logic</span>
          <h2 className={styles.sectionTitle}>Is Unlimited or a Large Data Plan Cheaper for My Trip?</h2>
          <p className={styles.bodyText}>
            For a week, the cheapest unlimited plan costs about what a 20 GB fixed plan does; over 15 or 30 days a
            10–20 GB fixed plan costs a fraction of unlimited, as long as you stay under about 1 GB a day.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip length</th>
                    <th>Cheapest unlimited</th>
                    <th>Per day</th>
                    <th>Cheapest 10 GB+ lasting the trip</th>
                    <th>Cheapest 20 GB+ lasting the trip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} style={{ fontSize: "0.86rem", color: "var(--text)", fontWeight: 600 }}>
                      Bottom line: under about 1 GB a day, the fixed plan is the cheaper buy at every length; over that,
                      the unlimited plan.
                    </td>
                  </tr>
                  {tripCostRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.ftFeature}>{row.days} days</td>
                      <td className={styles.tdPrice}>{row.unl}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>{row.unlPerDay}</td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>
                        {row.fixed10 ? `${row.fixed10.label} — ${formatUsd(row.fixed10.price)}` : "—"}
                      </td>
                      <td style={{ fontSize: "0.85rem", color: "var(--text)" }}>
                        {row.fixed20 ? `${row.fixed20.label} — ${formatUsd(row.fixed20.price)}` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourcesLine what="list prices of Simbye, eSIM Go, Airalo, Holafly and Sakura Mobile, re-read daily" />
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem", flexWrap: "wrap", gap: "0.6rem" }}>
            <a href={getProvider("simbye").affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              Get Simbye — unlimited or 10 GB →
            </a>
            <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Use this as a rule of thumb when deciding between unlimited and a fixed-data plan:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Expected Usage</th>
                    <th>Better Choice</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  {planVsDataRows.map((row) => (
                    <tr key={row.usage}>
                      <td className={styles.ftFeature}>{row.usage}</td>
                      <td className={styles.ftEsim}>{row.recommendation}</td>
                      <td className={styles.tdNetwork}>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <SourcesLine what="daily thresholds; plan prices from the daily feed" />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The 10 GB mark is the break-even point. Below it, a fixed plan is dramatically cheaper. Above
            it, compare a larger fixed plan with Simbye Unlimited at {SIMBYE_UNL} before you pay more.
          </p>
        </section>

        {/* Is Holafly really unlimited */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Honest answer</span>
          <h2 className={styles.sectionTitle}>Is Holafly Really Unlimited in Japan?</h2>
          <p className={styles.bodyText}>
            On the phone, largely yes: it publishes no daily threshold, though its Japan page says a Fair Usage Policy can restrict speed for no more than one day. Through a hotspot, no: tethering is limited to 1 GB per day purchased (7 GB on a 7-day plan, Holafly&apos;s Japan page, 22 Nov 2026), so a laptop is the case it does not cover (read {TERMS_CHECKED}).
          </p>
          <p className={styles.bodyText}>
            The network caveat: Holafly lists {getProvider("holafly").network} in Japan, not Docomo. Both cover cities, tourist areas and major train routes well, while Docomo has broader reach in rural areas. For popular tourist destinations (Tokyo, Kyoto, Osaka, Hiroshima, Hokkaido cities), this makes no practical difference.
          </p>
          <p className={styles.bodyText}>
            <strong>Speed follows the host network, not the brand.</strong> Sakura Mobile&apos;s unlimited plan
            runs on au (KDDI) 5G, and Simbye and eSIM Go both connect to whichever carrier is strongest.
          </p>
          <p className={styles.bodyText}>
            Holafly suits you if you cannot predict your phone use and will not tether. We have no link to it, so
            the alternative we send readers to is Airalo Unlimited. It is not necessary for typical tourist use.
            Prices by day, networks and the Klook eSIM / Simbye comparison are in the{" "}
            <Link href="/guides/esim/holafly-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>Holafly Japan review</Link>.
          </p>
        </section>

        {/* Who Should Get Unlimited */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Who needs it</span>
          <h2 className={styles.sectionTitle}>Who Should Get an Unlimited Japan eSIM</h2>
          <div className={styles.whoForGrid}>
            {whoShouldGet.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Most trips do not need unlimited at all. A fortnight usually fits in 10 GB, and{" "}
            <Link href="/guides/esim/japan-esim-2-weeks" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM for 2 weeks
            </Link>{" "}
            works out how many GB 14 days takes. Travelling as a family, one phone&apos;s hotspot can carry the
            children&apos;s devices: see{" "}
            <Link href="/guides/esim/japan-esim-family-group" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM for families
            </Link>{" "}
            for shared data against one eSIM each.
          </p>
        </section>

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
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/holafly-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Holafly Japan eSIM Review 2026: Price, Network &amp; Limits</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Prices, Plans &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how Simbye, Holafly, Airalo, eSIM Go, and Sakura Mobile compare on price, speed, and features in our full comparison guide.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              View Full eSIM Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
