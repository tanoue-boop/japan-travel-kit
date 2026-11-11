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
import { SIMBYE_SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";

// Every price on this page is read from data/esim-prices.json (refreshed daily).
const pricesCheckedAt = pricesCheckedLabel();
const PRICES_CHECKED_ISO = (latestCheckedAt() ?? "").slice(0, 10) || "not yet checked";
// Daily thresholds, hotspot rules and networks were read off each provider's own site.
// Airalo, Holafly and Sakura Mobile were re-read on 11 Nov 2026 (R10). Simbye's and eSIM Go's
// product pages refused automated reads that day (HTTP 429), so their last reads stand:
// Simbye 5 Nov 2026 (SIMBYE_SPECS_CHECKED_AT), eSIM Go 29 Oct 2026.
const TERMS_CHECKED = "11 Nov 2026";
const TERMS_CHECKED_ISO = "2026-11-11";
const ESIMGO_TERMS_ISO = "2026-10-29";
const SIMBYE_TERMS_ISO = "2026-11-05";
const TERMS_SOURCES = [
  { label: "Simbye", href: "https://simbye.com/products/esim-japan", checked: SIMBYE_TERMS_ISO },
  { label: "eSIM Go (Breeze)", href: "https://breezesim.com/products/esim-japan", checked: ESIMGO_TERMS_ISO },
  { label: "Airalo fair use policy", href: "https://www.airalo.com/m/resources/unlimited-data-plans-fair-use-policy", checked: TERMS_CHECKED_ISO },
  { label: "Holafly Japan", href: "https://esim.holafly.com/esim-japan/", checked: TERMS_CHECKED_ISO },
  { label: "Sakura Mobile travel eSIM", href: "https://www.sakuramobile.jp/travel/esim/", checked: TERMS_CHECKED_ISO },
];
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
  id: EsimProviderId;
  name: string;
  full: string;
  after: string;
  hotspot: string;
  network: string;
  linked: boolean;
}[] = [
  { id: "simbye", name: "Simbye Unlimited — our pick", full: "2 GB a day", after: "1 Mbps", hotspot: "Allowed", network: getProvider("simbye").network, linked: true },
  { id: "esimgo", name: "eSIM Go Premium Unlimited", full: "30 GB / 5 days, 60 GB / 10, 90 GB / 15", after: "Reduced, stated as fit for 720p video", hotspot: "Allowed on every plan", network: getProvider("esimgo").network, linked: true },
  { id: "airalo", name: "Airalo Unlimited", full: "3 GB a day (24 h from activation)", after: "1 Mbps until the 24-hour reset", hotspot: "Allowed, no device limit; counts toward the 3 GB", network: getProvider("airalo").network, linked: true },
  { id: "holafly", name: "Holafly", full: "No published daily threshold", after: "Fair Usage Policy may slow it for up to 1 day", hotspot: "Capped at 1 GB a day", network: getProvider("holafly").network, linked: false },
  { id: "sakura", name: "Sakura Mobile Unlimited", full: "No daily speed cap stated", after: "None published", hotspot: "2 GB (1–3 days) to 30 GB (27–31 days)", network: "au (KDDI) 5G", linked: true },
];

const dataUsageTable = [
  { activity: "Google Maps navigation",          perDay: "~50 MB",   weeklyTotal: "~350 MB" },
  { activity: "Messaging (WhatsApp / LINE)",     perDay: "~20 MB",   weeklyTotal: "~140 MB" },
  { activity: "Social media browsing",           perDay: "~150 MB",  weeklyTotal: "~1 GB"   },
  { activity: "Instagram / photo uploads",       perDay: "~300 MB",  weeklyTotal: "~2 GB"   },
  { activity: "Video calls (30 min/day)",        perDay: "~450 MB",  weeklyTotal: "~3 GB"   },
  { activity: "Streaming video (1 hr/day)",      perDay: "~1,200 MB", weeklyTotal: "~8 GB"  },
];

const usageRows = [
  { tripType: "Light tourist",   dailyUse: "~300 MB", total: "~4.2 GB / 2 wk",  verdict: "Not worth it",      verdictClass: "bad" as const },
  { tripType: "Moderate user",   dailyUse: "~600 MB", total: "~8.4 GB / 2 wk",  verdict: "Borderline",        verdictClass: "warn" as const },
  { tripType: "Heavy streamer",  dailyUse: "1 GB+",   total: "14 GB+ / 2 wk",   verdict: "Worth it",          verdictClass: "good" as const },
  { tripType: "Remote worker",   dailyUse: "2 GB+",   total: "28 GB+ / 2 wk",   verdict: "Definitely",        verdictClass: "good" as const },
];

const planVsDataRows = [
  { usage: "Up to 5 GB",   recommendation: "Simbye, eSIM Go or Airalo",  reason: "Much cheaper than any unlimited plan" },
  { usage: "5 GB – 10 GB", recommendation: `Simbye 10 GB (${usdAtLeast("simbye", 10)}), eSIM Go 10 GB (${usdAtLeast("esimgo", 10)}) or Airalo 10 GB (${usdAtLeast("airalo", 10)})`, reason: "Best price-to-data ratio for typical tourists" },
  { usage: "10 GB – 15 GB", recommendation: `Simbye 20 GB (${usdAtLeast("simbye", 20)}) or Simbye Unlimited (${SIMBYE_UNL} for 7 days)`,  reason: "A larger fixed plan is usually cheaper on anything longer than a week" },
  { usage: "15 GB+",        recommendation: "An unlimited plan, chosen by its daily threshold",  reason: "2–3 GB a day at full speed covers it; past that, eSIM Go Premium or Holafly" },
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
    name: "eSIM Go Premium Unlimited",
    badge: "Most Full-Speed Data",
    badgeClass: "pickBadgeBlue" as const,
    summary: `From ${ESIMGO_UNL} for 7 days (checked ${pricesCheckedAt}). Full speed runs to 30 GB over 5 days, 60 GB over 10 or 90 GB over 15, which is a far higher ceiling than a daily 2 or 3 GB, and tethering is allowed on every plan. It also sells unlimited plans from a single day, which Simbye does not.`,
    bestFor: "Remote workers and streamers who burn several GB in one day, then little the next",
    pros: ["Full-speed allowance is pooled across the plan, not per day", "Tethering on every plan", "Unlimited from 1 day"],
    cons: ["Longest plan listed is 15 days", "Dearer than Simbye at a week", "Data-only — no Japanese number or calls"],
    cta: "Get eSIM Go Unlimited →",
    href: getProvider("esimgo").affiliateUrl,
  },
  {
    rank: 3,
    name: "Airalo Unlimited",
    badge: "Tethering & Support",
    badgeClass: "pickBadgeBlue" as const,
    summary: `From ${AIRALO_UNL} for 7 days (checked ${pricesCheckedAt}). Full speed runs to 3 GB a day, then 1 Mbps until the 24-hour reset, and Airalo states no limit on tethering or on the number of devices. The dearest of the three, for an app and live chat.`,
    bestFor: "A tethered laptop on a trip of up to 30 days, with support on hand",
    pros: ["3 GB a day at full speed", "No stated limit on tethering", "App with 24/7 live chat"],
    cons: ["Dearer than Simbye and eSIM Go at a week", "1 Mbps after the daily 3 GB", "Data-only — no calls or SMS"],
    cta: ALT_LABEL,
    href: ALT_URL,
  },
  {
    rank: 4,
    name: "Holafly",
    badge: "No Daily Threshold",
    badgeClass: "pickBadgeOrange" as const,
    summary: `The best-known unlimited eSIM for Japan, with no published daily threshold on the phone itself (its Fair Usage Policy can slow it for up to a day), though hotspot use is capped at 1 GB a day. Runs on ${getProvider("holafly").network}, from ${HOLAFLY_FROM} for a short trip to ${HOLAFLY_30} for a month (checked ${pricesCheckedAt}). Ranked here because it costs more than the three above and we have no link to it.`,
    bestFor: "Heavy phone-only use, with no laptop to tether",
    pros: ["No daily threshold on the phone", "1 to 30-day plans", "Buy before you fly — instant QR delivery"],
    cons: ["Hotspot capped at 1 GB a day", "Dearer than the three above", "Data-only — no voice calls"],
    cta: ALT_LABEL,
    href: ALT_URL,
    note: ALT_NOTE,
  },
  {
    rank: 5,
    name: "Sakura Mobile",
    badge: "Japan-Based Support",
    badgeClass: "pickBadgeOrange" as const,
    summary: `Sakura Mobile's unlimited travel eSIM runs on au/KDDI, from ${SAKURA_UNL} up to ${SAKURA_UNL_30}, with a 3 GB/day Docomo option for longer stays. It is the Japan-based choice: English phone support, and physical-SIM plans with a voice option for travellers who need to make local calls.`,
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
    q: "Is Holafly really unlimited in Japan?",
    a: `Holafly's Japan plan publishes no daily data threshold on the phone, but its Japan page says a Fair Usage Policy can restrict speed for no more than one day, and hotspot use is limited to 1 GB a day, so it is not unlimited for a tethered laptop (read ${TERMS_CHECKED}). It runs on ${getProvider("holafly").network}, not Docomo, which matters only well away from the main cities and tourist routes. We have no link to Holafly; Simbye, eSIM Go and Airalo are the unlimited plans sold through this site.`,
  },
  {
    q: "Do most travellers actually need unlimited data in Japan?",
    a: "Probably not. A typical tourist using Google Maps, WhatsApp, social media, and occasional Google searches uses around 1–3 GB per week. Even with daily video calls, 10 GB for a month is enough for most people. The main cases where unlimited genuinely matters: daily video streaming, live content creation, or remote work involving several hours of video calls per day.",
  },
  {
    q: "What happens when an Airalo Japan eSIM hits its data cap?",
    a: `When you use all your data on Airalo, your connection stops entirely — you won't be throttled to a slower speed, you'll simply lose data access. You can purchase an additional plan from the Airalo app and it will top up your eSIM without requiring a new QR code scan. If you're worried about running out, the 10 GB plan (${AIRALO_10}) is sufficient for almost all non-streaming use.`,
  },
  {
    q: "Can I use a Japan unlimited eSIM for working remotely?",
    a: "Yes, and the column to read is the hotspot one. Remote work usually means a tethered laptop: Airalo states no limit on tethering and eSIM Go allows it on every plan, while Holafly caps the hotspot at 1 GB a day and Sakura Mobile caps it by plan length. A two-hour daily video call uses around 900 MB, which sits inside Simbye's 2 GB a day and Airalo's 3 GB a day. Coworking spaces in major cities are the fallback for large uploads.",
  },
  {
    q: "Is there a cheaper alternative to Holafly for unlimited data?",
    a: `Yes. Simbye Unlimited is ${SIMBYE_UNL} for 7 days and eSIM Go is ${ESIMGO_UNL}, both under Holafly's 7-day price (checked ${pricesCheckedAt}). If you do not need unlimited at all, Simbye's 10 GB plan at ${SIMBYE_10} is functionally unlimited for most travellers; compare every plan in our live price tracker, which is re-checked daily.`,
  },
  {
    q: "How much does unlimited eSIM cost for Japan?",
    a: `As of ${pricesCheckedAt}, Holafly's Japan unlimited plans run from ${HOLAFLY_5} to ${HOLAFLY_30}. Sakura Mobile's unlimited eSIM starts at ${SAKURA_UNL} and Simbye's at ${SIMBYE_UNL}. By contrast, eSIM Go's 10 GB plan is ${ESIMGO_10} and Airalo's 10 GB plan ${AIRALO_10} — typically half the price of an unlimited plan for the same length.`,
  },
  {
    q: "What's the cheapest unlimited Japan eSIM?",
    a: `At 7 days or more, Simbye's plan at ${SIMBYE_UNL} has the lowest list price here, with 2 GB a day at full speed and then 1 Mbps. Holafly's 5-day plan at ${HOLAFLY_5} is a short entry point, and Airalo and eSIM Go sell unlimited plans too — see the live tracker for today's cheapest. If you're willing to consider 'effectively unlimited' fixed plans, eSIM Go's 10 GB at ${ESIMGO_10} is dramatically cheaper and covers what most travellers would consider unlimited usage on a 1–2 week trip.`,
  },
  {
    q: "Can I stream Netflix with an unlimited Japan eSIM?",
    a: "Yes, within the plan's daily threshold. Streaming HD video uses roughly 1.2 GB per hour, so Simbye's 2 GB a day is under two hours at full speed and Airalo's 3 GB a day is two and a half. After that, 1 Mbps is enough for standard-definition video at best. If you stream for longer than that each day, eSIM Go Premium's pooled allowance or Holafly's no-threshold phone plan suits it better.",
  },
  {
    q: "Does unlimited data in Japan really mean unlimited?",
    a: `Mostly not at full speed. Simbye gives 2 GB a day and then 1 Mbps, Airalo 3 GB a day and then 1 Mbps until the reset 24 hours after activation, and eSIM Go Premium pools 30 GB over 5 days, 60 GB over 10 or 90 GB over 15 before speed is reduced. Holafly publishes no daily threshold but says a Fair Usage Policy can slow it for up to a day, and Sakura Mobile's au plan states no daily speed cap; both cap the hotspot. Airalo, Holafly and Sakura terms read ${TERMS_CHECKED_ISO}, Simbye ${SIMBYE_TERMS_ISO}, eSIM Go ${ESIMGO_TERMS_ISO}.`,
  },
  {
    q: "Which unlimited eSIM is best for tethering a laptop in Japan?",
    a: `Airalo or eSIM Go. Airalo's fair use policy states no limit on tethering or on the number of devices, though tethered data counts toward its 3 GB a day at full speed, and eSIM Go allows tethering on every plan; Simbye allows it too, within its 2 GB a day at full speed. Holafly caps the hotspot at 1 GB a day, which rules it out for a laptop, and Sakura Mobile allows 2 GB on a 1–3 day plan up to 30 GB on a 27–31 day plan. Read on ${TERMS_CHECKED_ISO}.`,
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
const TITLE = `Japan eSIM Unlimited Data 2026: From ${SIMBYE_UNL} for 7 Days`;
const H1 = "Unlimited eSIM Japan (2026): Prices, Fair-Use Limits & Tethering";
const DESCRIPTION = `Unlimited eSIM Japan: Simbye is ${SIMBYE_UNL} for 7 days with 2 GB a day at full speed. Fair-use limits, hotspot rules and networks for 5 plans, then buy.`;

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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
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
            Unlimited eSIM Japan (2026):<br />Prices, Fair-Use Limits &amp; Tethering
          </h1>
          <p className={styles.heroSubtitle}>
            What each Japan eSIM with unlimited data costs for 7, 15 and 30 days, how much runs at full speed, which network it uses, and which one you can tether a laptop to.
          </p>
          <div className={styles.heroBadges}>
            {["Prices checked daily", "Daily limits compared", `Terms read ${TERMS_CHECKED}`].map((t) => (
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
            Our pick for a <strong>Japan eSIM with unlimited data</strong> is <strong>Simbye Unlimited at{" "}
            {SIMBYE_UNL} for 7 days</strong> ({unlimitedAt("simbye", 15)} for 15 days, {unlimitedAt("simbye", 30)} for
            30; checked {pricesCheckedAt}), because it has the lowest unlimited list price at 7 days or more, allows
            tethering and gives 2 GB a day at full speed, then 1 Mbps.
          </p>
          <p className={styles.bodyText}>
            <strong>You need unlimited data in Japan</strong> only if you use more than about 1 GB a day: an hour of
            HD video a day, hours of video calls, or a laptop on your hotspot. <strong>You do not need it</strong> for
            Maps, messaging and social media, which come to about 1–3 GB a week, so Simbye&apos;s 10 GB plan at{" "}
            {SIMBYE_10} covers a typical trip.
          </p>
          <p className={styles.bodyText}>
            No &ldquo;unlimited&rdquo; Japan eSIM is unlimited at full speed on every device: Airalo slows to 1 Mbps
            after 3 GB a day, Holafly caps its hotspot at 1 GB a day, and Sakura Mobile&apos;s au plan states no daily
            speed cap but limits the hotspot by plan length (terms read {TERMS_CHECKED}). If you burn several GB in
            one day, <strong>eSIM Go Premium</strong> ({ESIMGO_UNL} for 7 days) pools its full-speed data across the
            plan instead.
          </p>
        </section>

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
                <p className={styles.verdictStatLabel}>Most full-speed data</p>
                <p className={styles.verdictStatValue}>eSIM Go Premium — {ESIMGO_UNL}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for tethering</p>
                <p className={styles.verdictStatValue}>Airalo — {AIRALO_UNL}</p>
              </div>
            </div>
            <a
              href={getProvider("simbye").affiliateUrl}
              className={styles.verdictBtn}
              target="_blank"
              rel="sponsored noopener"
            >
              Get Simbye Unlimited →
            </a>
          </div>
        </div>

        <SimbyeOffer />
        <div data-placement="esim-page-answer">
          <EsimAltLinks />
        </div>

        {/* Answer table: price by trip length, then what each "unlimited" slows to. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compared</span>
          <h2 className={styles.sectionTitle}>How Much Is an Unlimited eSIM for Japan?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", ...UNLIMITED_DAYS.map((d) => `${d} days`), "Full speed up to", "After that", "Hotspot", "Network"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {unlimitedRows.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.tdProvider} style={{ minWidth: "150px" }}>{row.name}</td>
                      {UNLIMITED_DAYS.map((d) => (
                        <td key={d} className={styles.tdPrice}>{unlimitedAt(row.id, d)}</td>
                      ))}
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "130px" }}>{row.full}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "120px" }}>{row.after}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "130px" }}>{row.hotspot}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "130px" }}>{row.network}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {PRICES_CHECKED_ISO}</strong> (prices) and {TERMS_CHECKED_ISO} (Airalo, Holafly and
            Sakura Mobile terms; Simbye {SIMBYE_TERMS_ISO}, eSIM Go {ESIMGO_TERMS_ISO}). Sources:{" "}
            {TERMS_SOURCES.map((s, i) => (
              <span key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)" }}>{s.label}</a>
                {i < TERMS_SOURCES.length - 1 ? ", " : "."}
              </span>
            ))}{" "}
            Unlimited plans from more providers — Maya Mobile, Ubigi, Nomad, Jetpac, aloSIM, Mobal and Japan Wireless — are
            in the <Link href="/guides/esim/japan-esim-price-tracker" style={{ color: "var(--accent)" }}>Japan eSIM price tracker</Link>,
            sorted by price per day and updated monthly.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
            <a href={getProvider("simbye").affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Get Simbye Unlimited — {SIMBYE_UNL} / 7 days →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Prices are each provider&apos;s list price in USD, read {pricesCheckedAt} by the job that re-reads them
            daily; &ldquo;—&rdquo; means no plan of that length is on sale. Simbye&apos;s terms come from its Japan
            page as read on {SIMBYE_SPECS_CHECKED_AT}. Holafly has no link on this site; our{" "}
            <Link href="/guides/esim/holafly-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>Holafly Japan review</Link>{" "}
            covers it in full, and Sakura Mobile&apos;s Japan-based support and voice SIM are in our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--accent)", fontWeight: 600 }}>Sakura Mobile review</Link>.
            The wider comparison, fixed plans included, is in our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>best eSIM for Japan guide</Link>, and if a fixed
            plan is enough, our{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>cheapest eSIM ranking</Link>{" "}
            sorts them by price per GB. Sharing one connection across a group is usually cheaper on a{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>rented pocket WiFi</Link>.
          </p>
          <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
            <span className={styles.pickTargetLabel}>Also on Klook:</span>
            <span>
              Klook&apos;s own Japan eSIM has an unlimited tier at 10 GB a day, then 128 kbps, per its listing. No price
              is quoted here because Klook prices change by date.{" "}
              <KlookLink
                href={klookEsim.url}
                target="_blank"
                rel="sponsored noopener"
                style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
              >
                {klookEsim.ctaLabel}
              </KlookLink>
            </span>
          </div>
        </section>

        {/* Fair use: the question most "unlimited" searches are really asking. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fair use</span>
          <h2 className={styles.sectionTitle}>Is an Unlimited eSIM in Japan Really Unlimited?</h2>
          <p className={styles.bodyText}>
            The data never stops on these plans, but the full speed usually does. Simbye slows to 1 Mbps after 2 GB a
            day and Airalo after 3 GB a day, Airalo&apos;s day being the 24 hours counted from when you activated the
            eSIM, not midnight.
          </p>
          <p className={styles.bodyText}>
            Holafly publishes no threshold, but its Japan page says a Fair Usage Policy can restrict speed for no more
            than one day to manage network traffic. Sakura Mobile&apos;s unlimited eSIM on au (KDDI) is sold as having
            no daily speed cap. Airalo also says its host networks may manage traffic at busy times, separately from
            the 3 GB rule.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>
            Can You Tether a Laptop on an Unlimited Japan eSIM?
          </h3>
          <p className={styles.bodyText}>
            Yes on all five, with different limits. Airalo sets no limit on tethering or devices but counts hotspot
            data toward its 3 GB a day; Simbye and eSIM Go allow it; Holafly caps it at 1 GB a day; and Sakura Mobile
            allows 2 GB on a 1–3 day plan, 6 GB on 7 days and 30 GB on 27–31 days.
          </p>
          <h3 className={styles.sectionTitle} style={{ fontSize: "1.15rem", marginTop: "1.5rem" }}>
            Which Network Does Each Unlimited eSIM Use?
          </h3>
          <p className={styles.bodyText}>
            Simbye lists {getProvider("simbye").network}; eSIM Go lists {getProvider("esimgo").network}; Holafly lists{" "}
            {getProvider("holafly").network}; Airalo lists {getProvider("airalo").network}; and Sakura Mobile&apos;s
            unlimited plan runs on au (KDDI) 5G, with its 3 GB-a-day plan on Docomo. All five are data only, with no
            Japanese phone number, except Sakura Mobile&apos;s separate Voice + Data eSIM.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Last checked: {TERMS_CHECKED_ISO} (Simbye {SIMBYE_TERMS_ISO}, eSIM Go {ESIMGO_TERMS_ISO}), on each
            provider&apos;s own page listed under the price table.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem", flexWrap: "wrap", gap: "0.6rem" }}>
            <a href={getProvider("simbye").affiliateUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Get Simbye Unlimited →
            </a>
            <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
        </section>

        {/* Do You Need Unlimited section */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Reality check</span>
          <h2 className={styles.sectionTitle}>Do You Actually Need Unlimited Data in Japan?</h2>
          <p className={styles.bodyText}>
            Most tourists don&apos;t. Here&apos;s how much data common activities actually use per day and per week:
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
            A typical tourist (Maps + messaging + social media) uses <strong>1–3 GB per week</strong>. Simbye&apos;s 10 GB plan at {SIMBYE_10} covers most people completely. Unlimited only makes sense if you&apos;re streaming video daily, doing multi-hour video calls, or uploading large files.
          </p>
        </section>

        {/* When is unlimited worth it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Honest analysis</span>
          <h2 className={styles.sectionTitle}>When Is Unlimited Worth It?</h2>
          <p className={styles.bodyText}>
            Here&apos;s how typical Japan usage maps to whether unlimited pays off over a two-week trip:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip Type</th>
                    <th>Daily Use</th>
                    <th>Total (2 weeks)</th>
                    <th>Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {usageRows.map((row) => (
                    <tr key={row.tripType}>
                      <td className={styles.ftFeature}>{row.tripType}</td>
                      <td className={styles.ftEsim}>{row.dailyUse}</td>
                      <td className={styles.ftSim}>{row.total}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The honest takeaway:</strong> only the bottom two rows justify an unlimited
            plan. If you&apos;re a typical tourist, you&apos;ll spend twice as much for data you&apos;ll
            never use.
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
                    <a href={pick.href} className={styles.pickCta} target="_blank" rel={pick.note ? "sponsored noopener" : "noopener noreferrer nofollow"}>
                      {pick.cta}
                    </a>
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
        </section>

        <SimbyeOffer />

        {/* Unlimited vs Large Data: rule of thumb */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost logic</span>
          <h2 className={styles.sectionTitle}>Unlimited vs Large Data Plans: Rule of Thumb</h2>
          <p className={styles.bodyText}>
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
            On the phone, largely yes: it publishes no daily threshold, though its Japan page says a Fair Usage Policy can restrict speed for no more than one day. Through a hotspot, no: tethering is capped at 1 GB a day, so a laptop is the case it does not cover (read {TERMS_CHECKED}).
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
                <p className={styles.relatedTitle}>Holafly Japan eSIM Review 2026: Unlimited Data Worth It?</p>
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
