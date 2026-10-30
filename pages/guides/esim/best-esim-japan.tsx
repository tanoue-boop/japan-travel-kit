import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import { simCards } from "../../../lib/sim-cards";
import {
  allEsimPlans,
  cheapestAtLeastGb,
  cheapestPlan,
  cheapestUnlimited,
  formatDate,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceAtLeastLabel,
  priceFromLabel,
  unlimitedFromLabel,
  type EsimPlanRow,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";

/**
 * Rank pass, 29 Oct 2026.
 *
 * Why. Over the 28 days to 26 October this page took 263 impressions for a single
 * click at an average position of 20.08 — "best esim japan 2026" at 13.7, "best esim
 * for japan" at 8.7, "best esim for japan iphone" at 61.8, plus the question forms
 * ("what is the best esim for japan", "do i need an esim for japan", "which esim to
 * use in japan"). A page whose first element is a comparison table answers none of
 * those in the snippet: the reader has to read nine columns to find out which one is
 * for them.
 *
 * So the first body paragraph now names a pick per kind of trip with the days, the
 * GB and the carrier against it, and the sections after it carry the things the
 * pages ranking above this one have and this one did not: a pick per itinerary, a
 * days-to-GB table, which carrier each plan actually rides, what "unlimited" slows
 * to and whether you can tether, whether a Japanese phone number is on offer, and
 * when the clock starts versus when a refund is still possible.
 *
 * Every provider term below was read off the provider's own site on the date in
 * SPECS_CHECKED; prices stay on data/esim-prices.json, which the daily job re-reads.
 * Holafly is still in the comparison table and still has no CTA — it runs no
 * affiliate programme we can join, so there is no path to it to build.
 */

// "Price From" / "Cheapest Plan" in the quick comparison come from data/esim-prices.json,
// which is refreshed daily by scripts/fetch-esim-prices.mjs.
const pricesCheckedAt = formatDate(latestCheckedAt());

/**
 * The day every provider *term* on this page was read — networks, fair-use
 * thresholds, hotspot caps, phone-number availability, refund and start rules.
 * Separate from `pricesCheckedAt`, which is the price job's own timestamp: a figure
 * should only claim the check it actually got.
 *
 * Sources read 29 Oct 2026: airalo.com/japan-esim and Airalo's unlimited-data
 * fair-use policy page; breezesim.com/products/esim-japan (eSIM Go's consumer brand)
 * and its Asia product page; sakuramobile.jp/travel/esim; airalo.com/asia-esim.
 * The Klook rows are older on purpose — Klook answers automated reads of
 * /activity/109393 with HTTP 403, so they come from its search index on the date in
 * `klookEsim.specsCheckedAt` and carry no price.
 */
const SPECS_CHECKED = "29 Oct 2026";

const TITLE = "Best eSIM for Japan 2026: Compared by Price & Network";
const DESCRIPTION =
  "Best eSIM for Japan: a comparison of Airalo, eSIM Go, Sakura Mobile and Klook on price, data and network — Docomo, au or SoftBank. Checked Oct 2026.";
const OG_TITLE = "Best eSIM for Japan 2026: Compared by Price & Network";

// Where a CTA goes when we have no affiliate link for a provider. Was /sim-cards until that
// page was merged into this one (2026-10-09); the plan table is the closest equivalent.
const PLANS_HREF = "/guides/esim/japan-esim-data-plans";

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT = {
  esimId: "airalo" as EsimProviderId,
  ctaLabel: "Get Airalo unlimited eSIM →",
  note: "Holafly is not available through our links — Airalo is our recommended alternative.",
};

type TopPick = {
  id: string;
  esimId: EsimProviderId;
  rank: number;
  bestFor: string;
  badgeCls: string;
  target: string;
  ctaLabel: string;
  ctaExternal: boolean;
  /** Set when we can't link the provider itself — the CTA points at an approved partner instead. */
  ctaAlt?: typeof HOLAFLY_ALT;
};

const topPicks: TopPick[] = [
  {
    id: "airalo-japan",
    esimId: "airalo" as EsimProviderId,
    rank: 1,
    bestFor: "Best Overall",
    badgeCls: styles.pickBadgeBlue,
    target: "Most travellers — reliable, affordable, incredibly easy to set up.",
    ctaLabel: "Get Airalo eSIM →",
    ctaExternal: false,
  },
  {
    id: "holafly-japan",
    esimId: "holafly" as EsimProviderId,
    rank: 2,
    bestFor: "Best Unlimited",
    badgeCls: styles.pickBadgeOrange,
    target: "Heavy data users: remote workers, streamers, daily video callers.",
    ctaLabel: "Get Holafly eSIM →",
    ctaExternal: false,
    ctaAlt: HOLAFLY_ALT,
  },
  {
    id: "esim-go-japan",
    esimId: "esimgo" as EsimProviderId,
    rank: 3,
    bestFor: "Best Value",
    badgeCls: styles.pickBadgeBlue,
    target: "Budget travellers or those on a multi-country trip through Asia.",
    ctaLabel: "Get eSIM Go →",
    ctaExternal: true,
  },
  {
    id: "sakura-mobile",
    esimId: "sakura" as EsimProviderId,
    rank: 4,
    bestFor: "Best for Long Stay",
    badgeCls: styles.pickBadgeGreen,
    target: "Long-stay visitors (1 month+) who need voice calls and English support.",
    ctaLabel: "Get Sakura Mobile →",
    ctaExternal: false,
  },
];

/**
 * Cheapest plan that actually covers a trip of `days` days needing `gb` GB in total.
 *
 * `findPlansForTrip` in lib/esim-prices would do this, but it ranks Holafly too, and
 * Holafly is the one provider on this page with no link to send anyone to — naming it
 * as "the plan to buy" would be a recommendation we cannot act on. Daily-capped plans
 * (Sakura's 3 GB/day family) are measured on cap × trip days, not the plan's headline
 * total, which is the only honest way to compare them with a fixed allowance.
 */
function cheapestForTrip(days: number, gb: number): EsimPlanRow | null {
  const rows = allEsimPlans
    .filter((p) => {
      if (p.providerId === "holafly") return false;
      if (p.days < days) return false;
      if (p.unlimited) return true;
      if (p.dailyCapGb) return p.dailyCapGb * days >= gb;
      return (p.gb ?? 0) >= gb;
    })
    .sort((a, b) => a.priceUsd - b.priceUsd || a.days - b.days);
  return rows[0] ?? null;
}

/** "eSIM Go 10 GB / 30 days — $13.99", or "—" when nothing on sale covers the trip. */
function tripPlanLabel(days: number, gb: number): string {
  const p = cheapestForTrip(days, gb);
  return p ? `${p.provider} ${p.name} — ${formatUsd(p.priceUsd)}` : "—";
}

/** The plans the answer paragraph and the itinerary table name, so prose and table agree. */
const SHORT_TRIP_PLAN = cheapestAtLeastGb("esimgo", 10);
const LONG_TRIP_PLAN = cheapestAtLeastGb("esimgo", 20);
const ESIMGO_UNLIMITED = cheapestUnlimited("esimgo", 7);
const AIRALO_UNLIMITED = cheapestUnlimited("airalo", 7);
const SAKURA_DAILY_LONG = allEsimPlans.find((p) => p.id === "sakura-90-gb-30-days") ?? null;

/** "$13.99 (10 GB / 30 days)", or "—" if the provider has stopped selling anything like it. */
function planLabel(plan: { priceUsd: number; name: string } | null): string {
  return plan ? `${formatUsd(plan.priceUsd)} (${plan.name})` : "—";
}

/**
 * Which eSIM to buy, by the shape of the trip rather than by provider — the question
 * "best esim for japan" is actually asking, and the one a nine-column comparison table
 * makes the reader answer for themselves.
 *
 * Prices interpolate from data/esim-prices.json. Everything else was read on
 * SPECS_CHECKED: the carrier lists and the tethering lines off breezesim.com and
 * sakuramobile.jp, the fair-use threshold off Airalo's own policy page, the regional
 * country counts off airalo.com/asia-esim and breezesim.com/products/esim-asia.
 */
const itineraryPicks = [
  {
    trip: "10 days or less, ordinary tourist use",
    pick: "eSIM Go (Breeze) fixed allowance",
    detail: () =>
      `${planLabel(SHORT_TRIP_PLAN)} — 10 GB is a gigabyte a day for a ten-day trip with room left over, and the plan rides NTT Docomo, KDDI, Rakuten Mobile and SoftBank, connecting to "the strongest available signal" rather than one carrier.`,
  },
  {
    trip: "2 to 4 weeks",
    pick: "eSIM Go for the allowance, Sakura Mobile for a daily cap",
    detail: () =>
      `${planLabel(LONG_TRIP_PLAN)} covers 21 days at a gigabyte a day on the same four carriers. If you would rather have a fresh allowance every morning, Sakura Mobile's 3 GB/day family runs on Docomo 5G — ${planLabel(SAKURA_DAILY_LONG)} — and limits you to 200 kbps only after 3 GB in a single day.`,
  },
  {
    trip: "Rural Japan, the mountains, the islands",
    pick: "A plan that rides Docomo, or one that rides all four",
    detail: () =>
      "Sakura Mobile's 3 GB/day plans are Docomo 5G, and eSIM Go's are multi-carrier with automatic selection. Airalo's Japan eSIM is SoftBank and KDDI; the Klook listing is SoftBank 5G on its per-day plans and docomo 4G LTE on its total-data plans.",
  },
  {
    trip: "Unlimited data — remote work, streaming, a tethered laptop",
    pick: "eSIM Go Premium Unlimited, or Airalo Unlimited",
    detail: () =>
      `${planLabel(ESIMGO_UNLIMITED)} gives 30 GB over 5 days, 60 GB over 10 or 90 GB over 15 at full speed, and after that "your data speed will be reduced (but is still suitable for streaming 720p video)", with "tethering on every plan". Airalo's ${planLabel(AIRALO_UNLIMITED)} runs at full speed to 3 GB a day, then 1 Mbps until the 24-hour reset, and states "there is no limit on tethering or the number of devices you connect".`,
  },
  {
    trip: "You need a Japanese phone number",
    pick: "Sakura Mobile Voice + Data eSIM",
    detail: () =>
      "The only plan of the five with a Japanese number, calls and SMS: au (KDDI) 5G, 3 GB a day, and 120 call minutes on 1–10 day plans, 240 on 11–60 and 360 on 61 days or more. It needs an in-person ID check in Japan, and the usage period starts after that check rather than on arrival.",
  },
  {
    trip: "Japan plus South Korea or Taiwan on one trip",
    pick: "A regional Asia eSIM instead of a Japan-only one",
    detail: () =>
      "Airalo's Asia eSIM covers \"18 Countries and Networks\" and lists Japan, South Korea and Taiwan among them; Breeze's eSIM Asia covers \"13 countries and networks\", with no country list on the page read. Both are separate products from the Japan plans priced on this page.",
  },
];

/**
 * How much data a Japan trip actually needs, and the cheapest plan on sale that covers
 * it. The GB columns are arithmetic on a planning figure — 0.5 GB a day for maps,
 * messaging and a few photos, 1 GB a day once you add video calls and some streaming —
 * and the plan column is live price data, so the two never drift apart.
 *
 * The planning figure is deliberately modest against what the providers themselves
 * treat as heavy: Airalo's fair-use threshold is 3 GB in a day, Sakura's daily cap is
 * 3 GB, and the Klook listing's unlimited tier runs 10 GB a day at full speed. A
 * gigabyte a day is well inside all three.
 */
const dataNeedRows = [10, 14, 21].map((days) => ({
  days,
  light: days * 0.5,
  normal: days,
}));

/**
 * Which carrier each plan actually rides. The reason this matters is that the brand on
 * the checkout page is not the network: four of the five resell the same three or four
 * Japanese carriers, and only the plan tells you which.
 *
 * Read on SPECS_CHECKED off each provider's own site, except the Klook row — see the
 * note on `klookEsim`.
 */
const networkRows = [
  {
    provider: "Airalo (Moshi Moshi Japan)",
    carriers: "SoftBank and KDDI",
    how: "The Japan product page names SoftBank as the primary network with further carriers behind it. Data only.",
    checked: SPECS_CHECKED,
  },
  {
    provider: "eSIM Go (Breeze)",
    carriers: "NTT Docomo, KDDI, Rakuten Mobile, SoftBank",
    how: "“Your device automatically connects to the strongest available signal.” Data only — “No SMS or voice calls included.”",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile — 3 GB/day plans",
    carriers: "Docomo 5G",
    how: "The daily-cap family. Hotspot available; no phone number, no voice, no SMS.",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile — Unlimited and Voice + Data",
    carriers: "au (KDDI) 5G",
    how: "Unlimited is data only; Voice + Data adds a Japanese number and needs an in-person ID check.",
    checked: SPECS_CHECKED,
  },
  {
    provider: klookEsim.name,
    carriers: klookEsim.specNetwork,
    how: `${klookEsim.specPhoneNumber}. Tethering: ${klookEsim.specTethering.toLowerCase()}. From Klook's own listing, not from the page itself — it answers automated reads with HTTP 403.`,
    checked: klookEsim.specsCheckedAt,
  },
];

/**
 * What "unlimited" means on each plan, and whether the allowance covers a hotspot.
 * No plan on sale for Japan is unlimited at full speed indefinitely; the figures below
 * are each provider's own published threshold and each provider's own wording for what
 * happens after it.
 */
const unlimitedRows = [
  {
    plan: "Airalo Unlimited (Japan)",
    full: "3 GB per day",
    after: "1 Mbps “for the rest of that day”; the allowance “resets every 24 hours, counted from the time you activated your eSIM”",
    hotspot: "“No limit on tethering or the number of devices you connect”",
    checked: SPECS_CHECKED,
  },
  {
    plan: "eSIM Go Premium Unlimited",
    full: "30 GB over 5 days, 60 GB over 10, 90 GB over 15",
    after: "“Your data speed will be reduced (but is still suitable for streaming 720p video)”",
    hotspot: "“Tethering on every plan”, at no extra charge",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile Unlimited (au 5G)",
    full: "Unlimited on the device itself",
    after: "No on-device threshold published on the page read",
    hotspot: "Capped by plan length — 2 GB to 30 GB depending on how long the plan runs",
    checked: SPECS_CHECKED,
  },
  {
    plan: "Sakura Mobile 3 GB/day (Docomo 5G)",
    full: "3 GB per day",
    after: "“Your speed will be limited to 200 Kbps after using 3 GB of data per day”",
    hotspot: "Available",
    checked: SPECS_CHECKED,
  },
  {
    plan: `${klookEsim.name} — unlimited tier`,
    full: "10 GB per day",
    after: "128 kbps after the daily 10 GB, per the listing",
    hotspot: "Supported",
    checked: klookEsim.specsCheckedAt,
  },
];

/**
 * When the clock starts, and when a refund is still possible. This is the part people
 * get wrong: installing early is right on one provider and expensive on another,
 * because one starts the validity period on install and the others on first connection
 * in Japan.
 */
const timingRows = [
  {
    provider: "Airalo",
    starts:
      "“The validity period of your eSIM package starts when one of the following happens: When you connect to a supported network in its coverage area or When you install your eSIM.” Most packages start on the network connection — the package's own Validity Policy says which.",
    install: "Safe to install at home for most packages; check the package's Validity Policy first",
    refund: "A refund request can be raised from the Airalo account; expired or fully used eSIMs are not eligible",
    checked: SPECS_CHECKED,
  },
  {
    provider: "eSIM Go (Breeze)",
    starts: "“Plan validity starts on first data use in Japan, not at purchase.”",
    install: "“Install before you fly.”",
    refund:
      "“If you haven't used any data, you're entitled to a full refund — no questions asked,” processed within 3 business days",
    checked: SPECS_CHECKED,
  },
  {
    provider: "Sakura Mobile",
    starts:
      "Unlimited data-only: “the usage period starts once you arrive to Japan”. 3 GB/day data: “usage period starts once you install the eSIM”. Voice + Data: after arrival and the in-person ID check.",
    install: "Install on arrival for the 3 GB/day plans — installing at home starts the clock",
    refund: "No refund terms published on the page read",
    checked: SPECS_CHECKED,
  },
  {
    provider: klookEsim.name,
    starts: `Sold as a QR-code voucher (“${klookEsim.listingTitle}”); no start rule stated in the listing data available`,
    install: "Not stated — check the listing",
    refund: "Not stated — check the listing",
    checked: klookEsim.specsCheckedAt,
  },
];

const installSteps = [
  {
    title: "Purchase & receive your QR code",
    desc: "Buy online before you travel. You'll receive a QR code by email within minutes — delivered straight to your inbox.",
  },
  {
    title: "Scan the QR code in Settings",
    desc: "Go to Settings → Cellular (or Mobile Data) → Add eSIM → Scan QR Code. Takes under 2 minutes. You can do this at home before you even pack.",
  },
  {
    title: "Activate on arrival",
    desc: "Switch to your Japan eSIM profile as your plane lands. You'll have a 4G signal before you reach baggage claim — no airport SIM vending machine needed.",
  },
];

const faqItems = [
  {
    q: "What is an eSIM and do I need one for Japan?",
    a: "An eSIM is a digital SIM built into your phone — no physical card needed. You download a profile via QR code and it works instantly. You don't need an eSIM to visit Japan, but it's by far the most convenient option: buy and install before you fly, activate on landing.",
  },
  {
    q: "Which phones support eSIM in Japan?",
    a: "Most modern phones support eSIM: iPhone XS and later, Google Pixel 3 and later, Samsung Galaxy S20 and later, and many other Android flagships. Check your phone's Settings → About to confirm. Note: some carrier-locked phones may not support eSIM.",
  },
  {
    q: "Can I keep my home SIM active while using a Japan eSIM?",
    a: "Yes — this is one of the biggest advantages of eSIM. Most dual-SIM phones let you use both SIMs simultaneously. Keep your home SIM active for calls and texts while your Japan eSIM handles data.",
  },
  {
    q: "Is Airalo or Holafly better for Japan?",
    a: "Airalo is better for most people — it's cheaper, has flexible data caps, and uses both Docomo and SoftBank. Holafly wins if you genuinely need unlimited data (remote work, heavy streaming) and the premium price is justified for your trip.",
  },
  {
    q: "What if my eSIM doesn't work after landing in Japan?",
    a: "First, check that Data Roaming is enabled for your eSIM profile. If still no signal, toggle Airplane Mode on/off to force a network scan. All providers listed here offer 24/7 live chat support — Airalo and Holafly are especially responsive.",
  },
  {
    q: "What's the difference between eSIM and a physical SIM card for Japan?",
    a: "Both give you mobile data in Japan, but eSIM is faster to set up (no queuing at the airport), cheaper in most cases, and available before you travel. Physical SIM cards require waiting at the airport counter or vending machine after landing. The main advantage of a physical SIM is that it works on phones that don't support eSIM.",
  },
  {
    q: "Can I use my home carrier in Japan instead of buying an eSIM?",
    a: "Yes, but roaming is expensive. Most international carriers charge $10–15 per day for Japan roaming. For a 10-day trip, that's $100–150 just for data — versus $9–18 for a full Japan eSIM plan. Unless your carrier offers a flat travel add-on with good Japan coverage, a dedicated Japan eSIM is almost always cheaper.",
  },
  {
    q: "What network does Airalo use in Japan?",
    a: "Airalo Japan eSIM plans run on Docomo and SoftBank networks. Docomo has the widest coverage in Japan, including rural areas, mountains, and remote islands. SoftBank has strong urban and suburban coverage. In practice, most travellers won't notice a difference between the two in tourist areas.",
  },
  {
    q: "What is Sakura Mobile and who is it for?",
    a: "Sakura Mobile is a Japan-based carrier that offers both SIM cards and eSIMs specifically designed for tourists and long-term visitors. Unlike Airalo and Holafly, Sakura Mobile includes voice call capability, English-speaking customer support, and plans suitable for stays up to 90 days. It runs on Docomo (Japan's largest carrier). It costs more than budget eSIM options but is the best choice for anyone who needs a Japanese phone number or plans an extended stay.",
  },
  {
    q: "How much data do I need for Japan?",
    a: "For typical tourist use — Google Maps, messaging, light browsing, and a few photos — 1 GB per day is a reasonable estimate. A 10-day trip would use around 8–10 GB. If you use maps heavily for driving, stream video, or work remotely, budget 2 GB+ per day. Most travellers find a 3–5 GB plan sufficient for a week-long trip to Japan.",
  },
  {
    q: "How much does a Japan eSIM cost?",
    a: `Japan eSIM prices vary by provider and plan size (checked ${pricesCheckedAt}). Budget options: eSIM Go from ${priceFromLabel("esimgo")}, Airalo from ${priceFromLabel("airalo")}. Mid-range: a 5 GB plan is ${priceAtLeastLabel("esimgo", 5)} from eSIM Go or ${priceAtLeastLabel("airalo", 5)} from Airalo. Unlimited: Holafly from ${unlimitedFromLabel("holafly")}. Japan-based with English phone support: Sakura Mobile from ${priceFromLabel("sakura")}. For a typical tourist week, expect to pay $10–20.`,
  },
  {
    q: "Is unlimited data worth it for a Japan trip?",
    a: "For most tourists: no. Japan has excellent Wi-Fi coverage in hotels, convenience stores, and tourist areas. A 3–5 GB plan covers a typical week of maps, messaging, and browsing. Unlimited plans (like Holafly) cost 2–3x more and mainly benefit heavy users who stream video, use video calls frequently, or travel to areas with poor Wi-Fi. If you're unsure, start with a 5 GB plan and consider whether you need more.",
  },
  {
    q: "Can I top up my eSIM once I'm in Japan?",
    a: "Yes — most providers support in-app top-ups without needing a new QR code. With Airalo, purchase an additional plan through the app and it tops up your existing eSIM profile automatically. eSIM Go and Sakura Mobile have similar top-up flows. Holafly unlimited plans are fixed-duration and require purchasing a new plan if you stay longer.",
  },
  {
    q: "Do Japan eSIM plans include calls and SMS?",
    a: "Most tourist-oriented eSIM plans — including Airalo, eSIM Go, and Holafly — are data-only. They don't include voice calls or SMS. For calls in Japan, you can use WhatsApp, LINE, or FaceTime over data. If you genuinely need a Japanese phone number with voice capability, Sakura Mobile is the best option among the main providers.",
  },
  {
    q: "When should I activate my Japan eSIM?",
    a: "Install the eSIM (scan the QR code) before you leave home — this takes 2–5 minutes and requires a Wi-Fi connection. However, most plans start counting days from the first time you connect to a network in Japan, not from when you install the profile. Switch to the Japan eSIM data line once your plane lands, so your plan starts when you need it.",
  },
  {
    // Migrated from /sim-cards when that page was merged in (2026-10-09).
    q: "Which network has the best coverage in Japan?",
    a: "Docomo has the most extensive rural coverage, which is why it is worth choosing deliberately if your itinerary leaves the main cities — eSIM Go and Sakura Mobile both ride it. SoftBank and KDDI (used by Airalo and Holafly) are excellent in cities and along the tourist corridors. For the standard Tokyo–Kyoto–Osaka–Hiroshima route, any of the four works well and you will not notice the difference.",
  },
  {
    // Migrated from /sim-cards when that page was merged in (2026-10-09).
    q: "When should I buy my Japan SIM or eSIM?",
    a: "Buy an eSIM before you leave home and activate it the moment your plane lands — there is no reason to wait, and nothing sells out. A physical SIM is different: airport counters and vending machines do run out of popular options in peak season, and pre-ordering a Sakura Mobile SIM for airport or hotel collection is both cheaper than buying on arrival and safer than hoping.",
  },
  {
    // Added 29 Oct 2026 — the three questions the new body sections answer, in the
    // short form an answer engine can lift. Every figure read on the provider's own
    // site on the date named.
    q: "Can I get a Japanese phone number with an eSIM?",
    a: `Only from Sakura Mobile. Its Voice + Data eSIM runs on au (KDDI) 5G with 3 GB of high-speed data a day and includes a Japanese number, voice calls and SMS — 120 call minutes on 1–10 day plans, 240 on 11–60 days and 360 on 61 days or more — but it requires an in-person ID check in Japan, and the usage period starts after that check. Airalo, eSIM Go and the Klook listing are all data only: no number, no SMS, no voice. If you only need SMS to receive verification codes, keep your home SIM active in the other slot and let the eSIM carry data. Checked ${SPECS_CHECKED}.`,
  },
  {
    q: "Does unlimited data slow down?",
    a: `Yes — every "unlimited" Japan plan has a published threshold. Airalo slows to 1 Mbps for the rest of the day once you pass 3 GB, and the allowance "resets every 24 hours, counted from the time you activated your eSIM". eSIM Go's Premium Unlimited gives 30 GB over 5 days, 60 GB over 10 or 90 GB over 15 at full speed, after which "your data speed will be reduced (but is still suitable for streaming 720p video)". Sakura Mobile's unlimited plan is unlimited on the device but caps the hotspot at 2–30 GB depending on plan length, and its 3 GB/day plans drop to 200 kbps after 3 GB in a day. The Klook listing's unlimited tier runs 10 GB a day at full speed, then 128 kbps. Airalo and eSIM Go figures checked ${SPECS_CHECKED}; the Klook figures come from its listing data of ${klookEsim.specsCheckedAt}.`,
  },
  {
    q: "Can I get a refund if I never use my Japan eSIM?",
    a: `It depends on the provider. eSIM Go states that "if you haven't used any data, you're entitled to a full refund — no questions asked", processed within 3 business days. Airalo lets you raise a refund request from your account, and notes that expired or fully used eSIMs are not eligible. Sakura Mobile publishes no refund terms on its travel eSIM page, and the Klook listing's terms could not be read. The related trap is timing rather than money: eSIM Go's validity "starts on first data use in Japan, not at purchase", but Sakura Mobile's 3 GB/day plans start "once you install the eSIM" — so install those on arrival, not at home. Checked ${SPECS_CHECKED}.`,
  },
  {
    q: "Why is my Japan eSIM speed slow?",
    a: "A few possible causes: you've used most of your data allowance (many plans throttle speed after a threshold), you're in a low-coverage area (tunnels, rural mountains), or peak network congestion in crowded tourist areas like Shibuya or Kyoto Station. Try toggling Airplane Mode. If speeds don't improve and you're under your data limit, contact your provider's support.",
  },
];

/**
 * One Klook eSIM slot, for the two places on this page where a reader has just been
 * handed a decision — the pick-by-itinerary table and the days-to-GB table. Klook's
 * eSIM band is the highest on the site, and its listing is the one a reader already
 * booking tickets there can add without a second account; what it cannot do is quote a
 * price here, because the product page answers automated reads with HTTP 403.
 */
function KlookEsimSlot({ why }: { why: string }) {
  return (
    <div className={styles.pickTarget} style={{ marginTop: "1.25rem", flexWrap: "wrap", gap: "0.6rem" }}>
      <span className={styles.pickTargetLabel}>Also on Klook:</span>
      <span>
        {why}{" "}
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
  );
}

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/best-esim-japan") } });

export default function BestEsimJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/best-esim-japan" />
        {hreflangLinks("/guides/esim/best-esim-japan")}
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/best-esim-japan" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={OG_TITLE} />
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
              route: "/guides/esim/best-esim-japan",
              headline: TITLE,
              updated,
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Best eSIM Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Prices checked {pricesCheckedAt}
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan 2026:<br />Compared by Price &amp; Network
          </h1>
          <p className={styles.heroSubtitle}>
            Every major Japan eSIM on one page, with a pick for each kind of trip —
            and which carrier each plan actually rides.
          </p>
          <div className={styles.heroBadges}>
            {["Prices checked daily", "5 eSIMs Compared", "Independent Review"].map((t) => (
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
            <strong>Affiliate disclosure:</strong> Some links below are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our rankings or reviews.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, before the table — a pick per kind of trip, with the numbers in it. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For a trip of <strong>10 days or less</strong> with ordinary tourist use, the pick is{" "}
            <strong>eSIM Go&apos;s {planLabel(SHORT_TRIP_PLAN)}</strong> — 10 GB is a gigabyte a day with room
            left over, and the plan rides NTT Docomo, KDDI, Rakuten Mobile and SoftBank, taking whichever
            signal is strongest; for <strong>two to four weeks</strong>, the same provider&apos;s{" "}
            <strong>{planLabel(LONG_TRIP_PLAN)}</strong> covers 21 days at the same rate. If you want{" "}
            <strong>unlimited</strong> rather than an allowance, eSIM Go&apos;s{" "}
            <strong>{planLabel(ESIMGO_UNLIMITED)}</strong> runs 30 GB over 5 days or 60 GB over 10 at full
            speed before it drops to a 720p-capable rate, and Airalo&apos;s{" "}
            <strong>{planLabel(AIRALO_UNLIMITED)}</strong> runs full speed to 3 GB a day, then 1 Mbps until
            the 24-hour reset, with no cap on tethering. Only <strong>Sakura Mobile</strong> sells a{" "}
            <strong>Japanese phone number</strong>: its Voice + Data eSIM on au (KDDI) 5G, 3 GB a day with
            120–360 call minutes depending on plan length, and an in-person ID check after you land.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Prices read off each provider&apos;s own site on {pricesCheckedAt} by the job that re-reads them
            daily. Networks, fair-use thresholds, hotspot caps, phone-number availability and refund rules
            read on {SPECS_CHECKED}; the Klook rows are from its own listing data of{" "}
            {klookEsim.specsCheckedAt}, because Klook answers automated reads of the product page with
            HTTP 403.
          </p>
        </section>

        {/* Quick Comparison Table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle}>Quick Comparison</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Best For", "Price From", "Cheapest Plan", "Network", "Voice / SMS", "Physical SIM", "Rating", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {topPicks.map(({ id, esimId, bestFor, ctaLabel, ctaAlt }) => {
                    const sim = simCards.find((s) => s.id === id)!;
                    const cheapest = cheapestPlan(esimId);
                    const affiliateUrl = getProvider(ctaAlt?.esimId ?? esimId).affiliateUrl;
                    const url = affiliateUrl === "#" ? PLANS_HREF : affiliateUrl;
                    const isExternal = affiliateUrl !== "#";
                    const label = ctaAlt?.ctaLabel ?? ctaLabel;
                    return (
                      <tr key={id}>
                        <td className={styles.tdProvider}>{sim.provider}</td>
                        <td className={styles.tdBestFor}>{bestFor}</td>
                        <td className={styles.tdPrice}>{cheapest ? formatUsd(cheapest.priceUsd) : "—"}</td>
                        <td className={styles.tdNetwork}>{cheapest ? cheapest.name : "—"}</td>
                        <td className={styles.tdNetwork}>{getProvider(esimId).network}</td>
                        <td>{sim.voiceCall ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>{sim.physicalSim ? <span className={styles.yes}>✓</span> : <span className={styles.no}>✗</span>}</td>
                        <td>
                          <span className={styles.tdRating}>
                            <span style={{ color: "var(--accent)" }}>★</span>
                            {sim.rating}
                          </span>
                        </td>
                        <td>
                          {isExternal ? (
                            <a
                              href={url}
                              className={styles.tdLink}
                              target="_blank"
                              rel={ctaAlt ? "sponsored noopener" : "noopener noreferrer nofollow"}
                            >
                              {label}
                            </a>
                          ) : (
                            <Link href={PLANS_HREF} className={styles.tdLink}>
                              {label}
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Unranked extra: Klook sells a Japan eSIM of its own, but its product page
                      blocks automated price reads, so there is no verified figure to rank it on. */}
                  <tr>
                    <td className={styles.tdProvider}>{klookEsim.name}</td>
                    <td className={styles.tdBestFor}>Booking tickets on Klook already</td>
                    <td className={tools.tdMuted}>{klookEsim.priceUnknownLabel}</td>
                    <td className={tools.tdMuted}>—</td>
                    <td className={tools.tdMuted}>Not stated on the listing</td>
                    <td><span className={styles.no}>✗</span></td>
                    <td><span className={styles.no}>✗</span></td>
                    <td className={tools.tdMuted}>Unranked</td>
                    <td>
                      <KlookLink href={klookEsim.url} className={styles.tdLink} target="_blank" rel="sponsored noopener">
                        {klookEsim.ctaLabel}
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            The Klook row sits outside the ranking on purpose. The four providers above are ranked on
            prices read off their own sites every day; Klook&apos;s eSIM listing could not be read
            automatically on the last attempt ({klookEsim.checkedAt}), so there is no price or data tier to
            place it against them. Open the listing to see the current options.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
            <span className={tools.liveBadge}><span className={tools.liveDot} /> Prices checked daily</span>
            <span>
              &ldquo;Price From&rdquo; is each provider&apos;s cheapest Japan plan as of {pricesCheckedAt}.{" "}
              <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>See every plan, sorted by price per GB →</Link>
            </span>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Only Sakura Mobile sells a voice plan or a physical SIM — the other three are
            data-only eSIMs. If you need a Japanese phone number, or your handset cannot take an
            eSIM at all, that narrows the choice to one before price enters into it. See{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={tools.inlineLink}>
              SIM card vs eSIM for Japan →
            </Link>
          </p>
        </section>

        {/* Q: What is the best eSIM for Japan? — the pick-by-itinerary table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>What is the best eSIM for Japan?</h2>
          <p className={styles.bodyText}>
            There is no single best one, because the four providers are not competing for the same trip.
            eSIM Go is the cheapest per GB and the only one that rides all four Japanese carriers; Airalo is
            the one to pick for unlimited with unrestricted tethering; Sakura Mobile is the only route to a
            Japanese phone number. Find your row:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Your trip</th>
                    <th>What to buy</th>
                    <th>Why — days, GB, carrier, price</th>
                  </tr>
                </thead>
                <tbody>
                  {itineraryPicks.map((row) => (
                    <tr key={row.trip}>
                      <td className={styles.tdProvider} style={{ minWidth: "170px" }}>{row.trip}</td>
                      <td className={styles.tdBestFor} style={{ minWidth: "180px" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "300px" }}>{row.detail()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Prices as of {pricesCheckedAt}; carrier lists, fair-use thresholds and the regional country
            counts read on each provider&apos;s own site on {SPECS_CHECKED}.
          </p>
          <KlookEsimSlot why="If the tickets and transport for this trip are already in a Klook basket, its own Japan eSIM goes on the same checkout — per-day plans on SoftBank 5G, total-data plans on docomo 4G LTE, tethering supported. It is unranked here because the listing blocks automated price reads, so open it to see the current options." />
        </section>

        {/* Q: Which eSIM is best for a 2-week trip? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Two weeks</span>
          <h2 className={styles.sectionTitle}>Which eSIM is best for a 2-week trip to Japan?</h2>
          <p className={styles.bodyText}>
            <strong>{tripPlanLabel(14, 14)}</strong> is the cheapest plan on sale that covers 14 days at a
            gigabyte a day, and <strong>{tripPlanLabel(14, 7)}</strong> is enough if your use is maps,
            messaging and a few photos rather than video. Both are 30-day plans, so the validity is not the
            constraint on a two-week trip — the allowance is.
          </p>
          <p className={styles.bodyText}>
            Two alternatives are worth the extra money for specific reasons rather than in general. Sakura
            Mobile&apos;s {planLabel(allEsimPlans.find((p) => p.id === "sakura-45-gb-15-days") ?? null)}{" "}
            gives you 3 GB every morning on Docomo 5G instead of one pot of data to ration, which suits a
            fortnight that includes the mountains or the smaller islands. And if two weeks of work travel
            means a tethered laptop, {planLabel(cheapestUnlimited("esimgo", 15))} or{" "}
            {planLabel(cheapestUnlimited("airalo", 15))} buys unlimited for the same window — see the
            throttling table below for what each one slows to.
          </p>
        </section>

        {/* Q: How much data do I need in Japan? — the days-to-GB table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sizing the plan</span>
          <h2 className={styles.sectionTitle}>How much data do I need in Japan?</h2>
          <p className={styles.bodyText}>
            Plan on <strong>0.5 GB a day</strong> for maps, messaging, a few photos and the odd timetable
            lookup, and <strong>1 GB a day</strong> once video calls, social video or music streaming are in
            the mix. That puts a 10-day trip at 5–10 GB, a fortnight at 7–14 GB and three weeks at
            10.5–21 GB — comfortably inside what the providers themselves treat as heavy use, since
            Airalo&apos;s fair-use threshold is 3 GB in a day, Sakura Mobile&apos;s daily cap is 3 GB, and the
            Klook listing&apos;s unlimited tier runs 10 GB a day at full speed.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip length</th>
                    <th>At 0.5 GB/day</th>
                    <th>At 1 GB/day</th>
                    <th>Cheapest plan covering the 0.5 GB/day figure</th>
                    <th>Cheapest plan covering the 1 GB/day figure</th>
                  </tr>
                </thead>
                <tbody>
                  {dataNeedRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.days} days</td>
                      <td className={styles.tdPrice}>{row.light} GB</td>
                      <td className={styles.tdPrice}>{row.normal} GB</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>
                        {tripPlanLabel(row.days, row.light)}
                      </td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>
                        {tripPlanLabel(row.days, row.normal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            The GB columns are arithmetic on the planning figures above; the plan columns are the cheapest
            plan on sale that covers them, from prices read {pricesCheckedAt}. Holafly is left out of these
            two columns because there is no link on this site to buy it through. Daily-capped plans are
            measured on cap × trip days rather than their headline total, which is the only like-for-like
            way to put them beside a fixed allowance.{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>
              Every plan, sorted by price per GB →
            </Link>
          </p>
          <KlookEsimSlot why="Klook&rsquo;s own Japan eSIM is sold in tiers from 500 MB to 50 GB plus an unlimited option, so it covers the same sizing — no price is quoted here because the listing could not be read automatically." />
        </section>

        {/* Q: Which network is best in Japan? — carrier table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Networks</span>
          <h2 className={styles.sectionTitle}>Which network is best in Japan: Docomo, au or SoftBank?</h2>
          <p className={styles.bodyText}>
            On the Tokyo–Kyoto–Osaka–Hiroshima route it makes no practical difference — all three cover the
            cities and the shinkansen corridor. The choice matters away from them, where Docomo&apos;s network
            is the one the Japan-based operators build their rural plans on; and none of these providers
            publishes a coverage percentage on the pages read, so the honest way to choose is by what the
            plan actually rides rather than by a claim. The brand on the checkout page is not the network:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Carrier(s) in Japan</th>
                    <th>What the provider states</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {networkRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ minWidth: "180px" }}>{row.provider}</td>
                      <td className={styles.tdNetwork} style={{ minWidth: "180px" }}>{row.carriers}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "280px" }}>{row.how}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            If you do not want to choose a carrier at all, eSIM Go&apos;s is the plan that does not make you:
            it is the only one of the five whose own page names four carriers and states that the device
            connects to the strongest available signal.
          </p>
        </section>

        {/* "Unlimited", throttling and hotspot */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The small print</span>
          <h2 className={styles.sectionTitle}>What &ldquo;unlimited&rdquo; actually means, and whether you can tether</h2>
          <p className={styles.bodyText}>
            No unlimited Japan plan is unlimited at full speed. Each one publishes a threshold and a reduced
            speed after it, and the hotspot is where they differ most — one provider puts no limit on
            tethering, another caps it in gigabytes. If a tethered laptop is the reason you are buying
            unlimited, this is the column that decides it:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Full speed up to</th>
                    <th>After that</th>
                    <th>Hotspot / tethering</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {unlimitedRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider} style={{ minWidth: "170px" }}>{row.plan}</td>
                      <td className={styles.tdPrice} style={{ minWidth: "150px", whiteSpace: "normal" }}>{row.full}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "240px" }}>{row.after}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.hotspot}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Wording in quotation marks is the provider&apos;s own, read on the date in the last column. Holafly
            is the fifth unlimited seller and caps its hotspot at 1 GB a day; it is in the comparison table
            above and has no link here, because it runs no affiliate programme this site can join.{" "}
            <Link href="/guides/esim/japan-esim-unlimited" className={tools.inlineLink}>
              Unlimited eSIMs for Japan, in detail →
            </Link>
          </p>
        </section>

        {/* Phone numbers, SMS and voice */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Calls and SMS</span>
          <h2 className={styles.sectionTitle}>Japanese phone numbers, SMS and voice</h2>
          <p className={styles.bodyText}>
            Four of the five are data only — no Japanese number, no SMS, no voice. eSIM Go states it
            outright (&ldquo;No SMS or voice calls included. Data only.&rdquo;), Airalo&apos;s Japan packages
            are data-only with no number, and the Klook listing describes its service type as{" "}
            {klookEsim.specPhoneNumber.toLowerCase()}.
          </p>
          <p className={styles.bodyText}>
            The exception is <strong>Sakura Mobile&apos;s Voice + Data eSIM</strong>: au (KDDI) 5G, 3 GB of
            high-speed data a day, a Japanese number with calls and SMS, and included call minutes that scale
            with the plan — 120 minutes on 1–10 day plans, 240 on 11–60 days and 360 on 61 days or more. It
            carries one condition the data-only plans do not: an in-person ID check in Japan, and the usage
            period starts after that check rather than when you land. Read on sakuramobile.jp on{" "}
            {SPECS_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            If what you actually need is SMS to receive verification codes from your bank, you do not need a
            Japanese number at all: keep your home SIM active alongside the eSIM and let the eSIM carry the
            data. For calls, LINE is what Japan itself uses, and WhatsApp or FaceTime work over data.{" "}
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={tools.inlineLink}>
              Long-stay plans with a number →
            </Link>
          </p>
        </section>

        {/* Refunds and install timing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>When the clock starts, and when a refund is still possible</h2>
          <p className={styles.bodyText}>
            Installing early is the right move on one provider and an expensive mistake on another, because
            the providers do not agree on what starts the validity period. The difference is worth a day or
            two of a short plan:
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>What starts the clock</th>
                    <th>Install before you fly?</th>
                    <th>Refund if unused</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider} style={{ minWidth: "140px" }}>{row.provider}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "300px" }}>{row.starts}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.install}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "220px" }}>{row.refund}</td>
                      <td className={tools.tdMuted} style={{ whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Q: Do I need an eSIM for Japan? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you buy anything</span>
          <h2 className={styles.sectionTitle}>Do I need an eSIM for Japan?</h2>
          <p className={styles.bodyText}>
            No — nothing about entering Japan requires one, and hotels, convenience stores, stations and most
            cafés have Wi-Fi. What an eSIM buys is the part between those: the train platform where the
            timetable changed, the bus stop that needs a map, the restaurant queue that wants a QR menu.
            Japan&apos;s cheapest option on this page is{" "}
            {planLabel(cheapestPlan("esimgo"))} from eSIM Go, which is less than most carriers charge for a
            single day of roaming.
          </p>
          <p className={styles.bodyText}>
            Two checks matter more than the price. Your handset has to support eSIM and be carrier-unlocked,
            and your plan has to match how you travel rather than how long you are away — a 30-day plan with
            5 GB on it is the wrong purchase for a fortnight of video calls.{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" className={tools.inlineLink}>
              Will an eSIM work in Japan on your phone? →
            </Link>
          </p>
        </section>

        {/* Q: iPhone and Android */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>By handset</span>
          <h2 className={styles.sectionTitle}>Which eSIM works best on iPhone and Android in Japan?</h2>
          <p className={styles.bodyText}>
            The same ones, on both. None of the four providers sells an iPhone-only or Android-only Japan
            plan — they are standard eSIM profiles, installed from a QR code or an activation link, and the
            provider you pick should be decided by the tables above rather than by your handset. What differs
            is the check you make before buying and the menu you install from.
          </p>
          <p className={styles.bodyText}>
            On an iPhone it is iPhone XS or later and an unlocked handset, with the profile added under
            Settings → Cellular; on Android it is the EID check, and the menu sits in a different place on
            Samsung, Pixel, Xperia and OnePlus. Each has its own guide:{" "}
            <Link href="/guides/esim/japan-esim-iphone" className={tools.inlineLink}>
              Japan eSIM on iPhone →
            </Link>{" "}
            and{" "}
            <Link href="/guides/esim/japan-esim-android" className={tools.inlineLink}>
              Japan eSIM on Android →
            </Link>
          </p>
        </section>

        {/* Top Picks */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Our picks</span>
          <h2 className={styles.sectionTitle}>Top 4 Japan eSIMs</h2>
          <div className={styles.picksList}>
            {topPicks.map(({ id, esimId, rank, bestFor, badgeCls, target, ctaLabel, ctaAlt }) => {
              const sim = simCards.find((s) => s.id === id)!;
              const affiliateUrl = getProvider(ctaAlt?.esimId ?? esimId).affiliateUrl;
              const url = affiliateUrl === "#" ? PLANS_HREF : affiliateUrl;
              const isExternal = affiliateUrl !== "#";
              const label = ctaAlt?.ctaLabel ?? ctaLabel;
              return (
                <article key={id} id={id} className={styles.pickCard}>
                  <div className={styles.pickCardHeader}>
                    <div className={styles.pickRank}>
                      <span className={styles.pickNumber}>{rank}</span>
                      <div className={styles.pickMeta}>
                        <span className={`${styles.pickBadge} ${badgeCls}`}>{bestFor}</span>
                        <span className={styles.pickName}>{sim.name}</span>
                      </div>
                    </div>
                    <span className={styles.pickRating}>
                      <span style={{ color: "var(--accent)" }}>★</span>
                      {sim.rating}
                    </span>
                  </div>
                  <div className={styles.pickCardBody}>
                    <p className={styles.pickSummary}>{sim.summary}</p>
                    <div className={styles.pickTarget}>
                      <span className={styles.pickTargetLabel}>Best for:</span>
                      <span>{target}</span>
                    </div>
                    <div className={styles.pickGrid}>
                      <div className={styles.pickPros}>
                        <p className={styles.pickListLabel}>Pros</p>
                        <ul className={styles.pickList}>
                          {sim.pros.map((p) => (
                            <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.pickCons}>
                        <p className={styles.pickListLabel}>Cons</p>
                        <ul className={styles.pickList}>
                          {sim.cons.map((c) => (
                            <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.pickCtaRow}>
                      {isExternal ? (
                        <a
                          href={url}
                          className={styles.pickCta}
                          target="_blank"
                          rel={ctaAlt ? "sponsored noopener" : "noopener noreferrer nofollow"}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link href={PLANS_HREF} className={styles.pickCta}>
                          {label}
                        </Link>
                      )}
                      <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                        Compare all plans
                      </Link>
                    </div>
                    {ctaAlt && (
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                        {ctaAlt.note}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Fifth slot, deliberately unranked — see the note under the comparison table. */}
          <article id="klook-japan-esim" className={styles.pickCard} style={{ marginTop: "1.5rem" }}>
            <div className={styles.pickCardHeader}>
              <div className={styles.pickRank}>
                <div className={styles.pickMeta}>
                  <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>Also available</span>
                  <span className={styles.pickName}>{klookEsim.name}</span>
                </div>
              </div>
            </div>
            <div className={styles.pickCardBody}>
              <p className={styles.pickSummary}>{klookEsim.note}</p>
              <div className={styles.pickTarget}>
                <span className={styles.pickTargetLabel}>Best for:</span>
                <span>
                  Travellers already buying Japan tickets or transport on Klook who want the eSIM on the
                  same account.
                </span>
              </div>
              <div className={styles.pickCtaRow}>
                <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
                  {klookEsim.ctaLabel}
                </KlookLink>
                <Link href={PLANS_HREF} className={styles.pickCtaInternal}>
                  Compare all plans
                </Link>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
                Listed on Klook as &ldquo;{klookEsim.listingTitle}&rdquo;. No price or data allowance is quoted
                here because the listing could not be read automatically on {klookEsim.checkedAt}.
              </p>
            </div>
          </article>
        </section>

        {/* How to Install */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How to Install a Japan eSIM</h2>
          <div className={styles.stepsList}>
            {installSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
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

        {/* Deep dives — these answer questions this comparison deliberately keeps short. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Going deeper</span>
          <h2 className={styles.sectionTitle}>If Your Situation Is More Specific</h2>
          <p className={styles.bodyText}>
            This page ranks the four providers for a typical trip. Several common situations
            change the answer, and each has its own guide:
          </p>
          <ul className={styles.pickList}>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Will an eSIM work in Japan at all?
              </Link>{" "}
              — the three checks on your handset to make before you buy anything.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--accent)", fontWeight: 600 }}>
                SIM card vs eSIM
              </Link>{" "}
              — the two situations where a physical SIM is the only option, regardless of price.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-students" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Students and long study stays
              </Link>{" "}
              — priced by the month, and when a domestic MVNO beats every tourist eSIM.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-family-group" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Families and groups
              </Link>{" "}
              — the headcount at which one shared Pocket WiFi beats an eSIM each.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-business" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Business travel
              </Link>{" "}
              — the hotspot clause rather than the price, because a tethered laptop triples a day.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/japan-esim-android" style={{ color: "var(--accent)", fontWeight: 600 }}>
                On Android
              </Link>{" "}
              — the EID check, and the menu to open on Samsung, Pixel, Xperia and OnePlus.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/esim-go-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
                eSIM Go in detail
              </Link>{" "}
              — our cheapest pick, one provider at a time: prices, networks and tethering.
            </li>
            <li>
              <span className={styles.proIcon}>▸</span>
              <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--accent)", fontWeight: 600 }}>
                What Reddit recommends
              </Link>{" "}
              — the standing r/JapanTravel advice, checked against this month&apos;s prices.
            </li>
          </ul>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* The sizing question this page's picks assume an answer to — how many GB a
                3, 5, 7, 10, 14 or 30-day trip needs — lives on the data-plans page. */}
            <Link href="/guides/esim/japan-esim-data-plans" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM Data Plans 2026: How Much Data Do You Need?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-sim-card-long-term-stay" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <path d="M11 18h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card for Long Term Stay: 90+ Day Plans</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/cheapest-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10M9.5 9.5a2 2 0 0 1 2-1.5h1a1.8 1.8 0 0 1 .3 3.55l-2.6.9A1.8 1.8 0 0 0 14.5 14a2 2 0 0 1-2 1.5h-1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cheapest eSIM for Japan 2026: Best Budget Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Best SIM for Long Stays?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-unlimited" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Unlimited eSIM for Japan (2026): Top Picks for Heavy Users</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-iphone" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="7" y="2" width="10" height="20" rx="2" />
                  <line x1="10.5" y1="5" x2="13.5" y2="5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan on iPhone (2026): Setup &amp; Picks</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/airalo-vs-holafly-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo vs Holafly for Japan: Which eSIM Wins?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to compare every plan?</h2>
            <p className={styles.ctaBannerDesc}>
              Every Japan eSIM plan from all four providers, sorted by price per GB and updated daily.
            </p>
            <Link href={PLANS_HREF} className={styles.ctaBannerBtn}>
              View All Plans by Price per GB →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
