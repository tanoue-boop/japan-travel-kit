import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import KlookLink from "../../../components/KlookLink";
import SimbyeOffer from "../../../components/SimbyeOffer";
import EsimUseCaseTable from "../../../components/EsimUseCaseTable";
import { esimPicksCopy } from "../../../lib/esim-picks-copy";
import { pickRows, pickSellerHref } from "../../../lib/esim-picks";
import { klookEsim } from "../../../lib/klook-links";
import { esimSpec } from "../../../lib/esim-specs";
import {
  cheapestUnlimited,
  findPlansForTrip,
  formatUsd,
  getProvider,
  latestCheckedAt,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  siteCheapest,
  unlimitedFromLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, itemListJsonLd } from "../../../lib/structured-data";
import { EsimCtaTop } from "../../../components/EsimCta";
import BookingEsimCard from "../../../components/BookingEsimCard";

// Every price quoted on this page is read from data/esim-prices.json (refreshed daily),
// so the figures the threads argue over are always checked against today's catalogue.
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

const PROVIDERS: EsimProviderId[] = ["simbye", "airalo", "holafly", "esimgo", "sakura"];

/** The cheapest unlimited plan on the whole site that still covers a `days`-day trip. */
function cheapestUnlimitedAcross(days: number): { provider: string; plan: EsimPlan } | null {
  let best: { provider: string; plan: EsimPlan } | null = null;
  for (const id of PROVIDERS) {
    const plan = cheapestUnlimited(id, days);
    if (plan && (!best || plan.priceUsd < best.plan.priceUsd)) best = { provider: getProvider(id).name, plan };
  }
  return best;
}

/** The cheapest fixed-allowance plan that covers `days` days and `gb` GB in total. */
function cheapestAllowanceFor(days: number, gb: number) {
  return findPlansForTrip(days, gb).find((p) => !p.unlimited) ?? null;
}

const siteCheapestPlan = siteCheapest();
const weekUnlimited = cheapestUnlimitedAcross(7);
/** "2026-11-17" — the day the price feed was last read, for the Last checked lines. */
const pricesCheckedIso = (latestCheckedAt() ?? "").slice(0, 10);

/** The cheapest plan of exactly `days` validity, allowance or unlimited. */
function planAt(id: EsimProviderId, days: number, unlimited: boolean): EsimPlan | null {
  const plans = getProvider(id).plans.filter((p) => p.days === days && p.unlimited === unlimited);
  return plans.length ? plans.reduce((a, b) => (b.priceUsd < a.priceUsd ? b : a)) : null;
}

/** "$1.99 (1 GB) · unlimited $19.99" for one provider and trip length. */
function priceCell(id: EsimProviderId, days: number): string {
  const small = planAt(id, days, false);
  const unl = planAt(id, days, true);
  const parts: string[] = [];
  if (small) parts.push(`${formatUsd(small.priceUsd)} (${small.name.replace(/ \/ \d+ days?$/, "")})`);
  if (unl) parts.push(`unlimited ${formatUsd(unl.priceUsd)}`);
  return parts.length ? parts.join(" · ") : "—";
}

const simbye7 = planAt("simbye", 7, false);
const simbye7Unl = planAt("simbye", 7, true);
const airalo7 = planAt("airalo", 7, false);
const esimgo7 = planAt("esimgo", 7, false);
/** True while Simbye sells the cheapest 7-day plan and the cheapest 7-day unlimited of the five. */
const simbyeCheapestWeek = (["airalo", "esimgo", "holafly", "sakura"] as EsimProviderId[]).every((id) => {
  const a = planAt(id, 7, false);
  const u = planAt(id, 7, true);
  return (!a || !simbye7 || simbye7.priceUsd <= a.priceUsd) && (!u || !simbye7Unl || simbye7Unl.priceUsd <= u.priceUsd);
});

/**
 * Table 1. Prices are the providers' own (data/esim-prices.json, read daily); tethering and
 * phone-number terms are from lib/esim-specs.ts (each provider's own site, 22 Oct / 5 Nov 2026).
 * Klook's row carries the listing's own spec lines and no price.
 */
const redditTableRows: { id: EsimProviderId; label: string; why: string; buyLabel: string; buyHref: string }[] = [
  {
    id: "simbye",
    label: simbyeCheapestWeek ? "Our pick: Simbye" : "Simbye",
    why: simbyeCheapestWeek ? "Lowest 7-day price here, allowance and unlimited" : "Low entry price; data only",
    buyLabel: "Get Simbye →",
    buyHref: link("simbye"),
  },
  { id: "airalo", label: "Airalo", why: "Easy app install; not the cheapest", buyLabel: "Get Airalo →", buyHref: link("airalo") },
  { id: "esimgo", label: "eSIM Go (Breeze)", why: "Low entry price; docomo among its networks", buyLabel: "Get eSIM Go →", buyHref: link("esimgo") },
  { id: "holafly", label: "Holafly", why: "Unlimited only; hotspot capped at 1 GB/day", buyLabel: "Airalo unlimited instead →", buyHref: link("airalo") },
  { id: "sakura", label: "Sakura Mobile", why: "Large allowances; the only Japanese-number plan here", buyLabel: "Get Sakura Mobile →", buyHref: link("sakura") },
];

/**
 * Table 2. What goes wrong with a travel eSIM in Japan, and the fix. Each cause is a plan
 * term the provider or listing states itself; no forum comment is quoted or counted.
 */
const problemRows = [
  {
    problem: "The data runs out mid-trip",
    cause: `The smallest plans are small: ${simbye7 ? `Simbye's 7-day entry plan is ${simbye7.name.replace(/ \/ \d+ days?$/, "")}` : "entry plans start at 1 GB"}${esimgo7 ? `, eSIM Go's ${esimgo7.name.replace(/ \/ \d+ days?$/, "")}` : ""}.`,
    fix: "Budget about 1 GB a day for maps, trains and messaging; buy the next size up, or unlimited if you tether or stream.",
  },
  {
    problem: "“Unlimited” slows down",
    cause: "Unlimited plans carry a daily high-speed cap or a fair-use rule: Klook's is 10 GB/day, then 128 kbps; eSIM Go's Unlimited Essential slows after a daily allowance; Airalo applies a fair-use policy.",
    fix: "Read the daily high-speed figure on the plan page, not the word unlimited.",
  },
  {
    problem: "The hotspot stops sharing",
    cause: "Holafly caps shareable data at 1 GB/day; Sakura Mobile's unlimited plans carry one hotspot allowance per trip (6 GB on 7 days, 15 GB on 15 days).",
    fix: "If a laptop or a companion will share it, pick a provider that states tethering on every Japan plan: Simbye, or eSIM Go at no extra cost.",
  },
  {
    problem: "Weak signal outside the cities",
    cause: "Each eSIM resells docomo, au (KDDI) or SoftBank; Airalo and Holafly lean on SoftBank, which is strongest in the cities.",
    fix: "For a rural route, pick a plan that names docomo: Simbye, eSIM Go, Sakura Mobile's 3 GB/day plans, or Klook's IIJ (docomo) total-data plans.",
  },
  {
    problem: "It will not install on arrival",
    cause: "Installing needs an internet connection, and a phone still locked to its home carrier may refuse the profile.",
    fix: "Install at home on Wi-Fi before you fly, leave the line off, and switch it on (with data roaming) when you land.",
  },
];

// Trip lengths for table 3. "Data to budget" is a planning rule of thumb (roughly 1 GB a
// day), not a measurement — the prices are live.
const TRIP_LENGTHS = [
  { days: 7, gb: 7, label: "7 days", use: "One week, one or two cities: maps, trains, messaging, some photos." },
  { days: 14, gb: 14, label: "14 days", use: "Two weeks, several cities: the length most itineraries land on." },
  { days: 30, gb: 30, label: "30 days", use: "A month, or a long stay: buy on per-GB price, or look at unlimited." },
];

const tripRows = TRIP_LENGTHS.map((t) => ({
  ...t,
  allowance: cheapestAllowanceFor(t.days, t.gb),
  unlimited: cheapestUnlimitedAcross(t.days),
}));

const comparisonRows = [
  { provider: "Airalo", price: `From ${priceFrom("airalo")}`, data: "1–20 GB, plus unlimited", network: getProvider("airalo").network, verdict: "Easy default; not the cheapest" },
  { provider: "Holafly", price: `From ${priceFrom("holafly")}`, data: "Unlimited only", network: getProvider("holafly").network, verdict: "No longer the cheapest unlimited" },
  { provider: "eSIM Go", price: `From ${priceFrom("esimgo")}`, data: "1–100 GB, plus unlimited", network: getProvider("esimgo").network, verdict: "Starts below Airalo and Holafly" },
  { provider: "Sakura Mobile", price: `From ${priceFrom("sakura")}`, data: "9–90 GB, plus unlimited", network: getProvider("sakura").network, verdict: "Long stays or a Japanese number" },
  { provider: "Simbye", price: `From ${priceFrom("simbye")}`, data: esimSpec("simbye").dataRange, network: getProvider("simbye").network, verdict: "Our pick; lowest entry price in this comparison" },
];

/**
 * Carrier-by-carrier, because the threads argue about networks more than about brands.
 * Every line below is what the named provider's own site (or, for Klook, its search-index
 * entry) states — checked 22 Oct 2026. Nothing here is a speed test of our own.
 */
const networkCards = [
  {
    carrier: "docomo",
    what: "The widest reach outside the cities, which is why it is the network to look for on a rural itinerary.",
    who: [
      "eSIM Go / Breeze — breezesim.com's Japan page names NTT docomo among the networks it covers.",
      "Sakura Mobile — the 3 GB/day data plans are docomo.",
      `${klookEsim.name} — the listing states IIJ (Docomo) 4G LTE for its total-data plans.`,
    ],
  },
  {
    carrier: "SoftBank",
    what: "Strong in the cities and along the main tourist corridors; this is the network most of the cheap tourist eSIMs sit on.",
    who: [
      "Airalo — airalo.com lists Softbank as the primary network for its Moshi Moshi Japan plans, plus two others it does not name (checked 1 Nov 2026).",
      "Holafly — its Japan page names KDDI / Softbank.",
      `${klookEsim.name} — the listing states SoftBank 5G for its per-day plans.`,
    ],
  },
  {
    carrier: "KDDI (au)",
    what: "The third national network, and the one Sakura Mobile puts its unlimited plans on.",
    who: [
      "Sakura Mobile — the unlimited eSIM is advertised as 5G on au.",
      "Holafly — KDDI / Softbank, per its Japan page.",
    ],
  },
];

/**
 * The three things that actually decide which plan you buy, and which the AI summaries of
 * these threads leave out. Sources: each provider's own site and help centre, plus Klook's
 * search-index entry for listing 109393 — all checked 22 Oct 2026.
 */
const specRows = [
  {
    provider: "Airalo",
    unlimited: "Yes, 3–30 days",
    tethering: "Personal hotspot works where your device and the network allow it (Airalo help centre)",
    phone: "No — data only",
  },
  {
    provider: "Holafly",
    unlimited: "Unlimited only",
    tethering: "1 GB of shareable data per day; the trip total scales with plan length",
    phone: "No — its Japan page states there is no local phone number",
  },
  {
    provider: "eSIM Go (Breeze)",
    unlimited: "Yes, 1–15 days",
    tethering: "Tethering stated on every Japan plan, at no extra cost",
    phone: "No — “No SMS or voice calls included. Data only.”",
  },
  {
    provider: "Sakura Mobile",
    unlimited: "Yes, 3–30 days",
    tethering: "Hotspot allowance capped by plan length",
    phone: "Only on the Voice + Data eSIM, which adds a Japanese number and domestic calls",
  },
  {
    provider: "Simbye",
    unlimited: "Yes, 7–30 days",
    tethering: esimSpec("simbye").tetheringShort,
    phone: esimSpec("simbye").phoneNumberShort,
  },
  {
    provider: klookEsim.name,
    unlimited: klookEsim.specData,
    tethering: klookEsim.specTethering,
    phone: klookEsim.specPhoneNumber,
  },
];

/**
 * Live Reddit searches, so a reader can read the threads themselves. These are searches
 * rather than links to individual threads because none could be opened when this was
 * written: Reddit refused the automated read on 6 Nov 2026, and a thread link must not
 * go on this page until someone has opened it. We summarise opinion and quote no comment.
 */
const redditSearches = [
  { label: "r/JapanTravelTips: top eSIM threads", href: "https://www.reddit.com/r/JapanTravelTips/search/?q=esim&restrict_sr=1&sort=top" },
  { label: "r/JapanTravel: top eSIM threads", href: "https://www.reddit.com/r/JapanTravel/search/?q=esim&restrict_sr=1&sort=top" },
  { label: "r/JapanTravel: pocket WiFi or eSIM", href: "https://www.reddit.com/r/JapanTravel/search/?q=pocket%20wifi%20esim&restrict_sr=1&sort=top" },
  { label: "r/eSIM: Japan threads", href: "https://www.reddit.com/r/eSIM/search/?q=japan&restrict_sr=1&sort=top" },
];

/**
 * The price-checked shortlist shown at the top: the five eSIMs this page covers, our pick
 * first. Reddit refuses automated reads (re-tried 11 Nov 2026), so nothing here says what
 * Reddit recommends or mentions most. Prices and networks come from data/esim-prices.json,
 * which is read from each provider's own page (sourceUrl) daily.
 */
const SHORTLIST: { id: EsimProviderId; label: string; verdict: string }[] = [
  { id: "simbye", label: "Simbye (our pick)", verdict: "Lowest entry price on the shortlist; data only" },
  { id: "airalo", label: "Airalo", verdict: "Easy app install; not the cheapest" },
  { id: "esimgo", label: "eSIM Go", verdict: "Starts below Airalo; docomo among its networks" },
  { id: "holafly", label: "Holafly", verdict: "Unlimited only; costs more than Airalo or eSIM Go for unlimited" },
  { id: "sakura", label: "Sakura Mobile", verdict: "The only one here with a Japanese-number plan" },
];
const shortlistRows = SHORTLIST.map((s) => ({
  ...s,
  priceFrom: priceFrom(s.id),
  network: getProvider(s.id).network,
  sourceUrl: getProvider(s.id).sourceUrl,
  name: getProvider(s.id).name,
}));

// Four common pieces of Japan eSIM advice, each checked against current pricing.
const redditQAs = [
  {
    q: "Claim: buy Airalo before you go. Still the right default?",
    a: `Yes, with one correction. Airalo runs on SoftBank as its primary network and installs from its own iOS app. It is not the cheap option, though: Airalo starts at ${priceFrom("airalo")} while eSIM Go starts at ${priceFrom("esimgo")} and Simbye at ${priceFrom("simbye")}. Pick Airalo for the app and the support, not for the price.`,
  },
  {
    q: "Claim: Holafly is the one for unlimited. Does the price still justify it?",
    a: `Not on price. Holafly's cheapest unlimited plan is ${unlimitedFromLabel("holafly")} against ${unlimitedFromLabel("airalo")} from Airalo and ${unlimitedFromLabel("esimgo")} from eSIM Go. Its hotspot is also capped at 1 GB/day, which matters if you tether.`,
  },
  {
    q: "Claim: unlimited means unlimited. What does the fine print say?",
    a: "No hard cap, but no provider sells genuinely unmetered full-speed data. Holafly caps hotspot use at 1 GB/day. eSIM Go's unlimited tier is \"Unlimited Essential\" and drops speed after a daily high-speed allowance. Airalo applies a fair-use policy. Sakura Mobile is unlimited on-device but limits hotspot by plan length. Read the fine print of the plan you buy, not the word unlimited.",
  },
  {
    q: "Claim: get docomo for the countryside. Does the network choice matter?",
    a: "The advice is sound in direction. Docomo has the broadest rural reach, and eSIM Go and Sakura Mobile both ride it. Holafly runs on SoftBank/KDDI and Airalo on SoftBank as its primary network (plus two others its Japan page does not name), which is excellent in cities and along the main tourist corridors. In genuinely remote mountains or on small islands, coverage thins out whoever you buy from.",
  },
];

/**
 * The questions people type instead of a keyword, each answered in the first sentence or
 * two. Rendered as headings so the question itself is the heading text.
 */
const askedQuestions = [
  {
    q: "What is the best eSIM for Japan?",
    a: (
      <>
        Our pick is Simbye, from {priceFrom("simbye")}, data only. eSIM Go starts at {priceFrom("esimgo")};
        Airalo starts at {priceFrom("airalo")}, on SoftBank as its primary
        network, with its own app for installation. If you want a Japanese phone number, Sakura Mobile is the
        only provider here that sells one. This page is about what Reddit says; which one to pick for your
        trip, with network, tethering and phone number side by side, is on our{" "}
        <Link href="/guides/esim/best-esim-japan" className={tools.inlineLink}>best eSIM for Japan</Link>{" "}
        comparison.
      </>
    ),
  },
  {
    q: "Do I need an eSIM for Japan?",
    a: (
      <>
        You need some form of data, and an eSIM is the least troublesome form: public Wi-Fi in Japan is
        patchy outside stations and chains, and most trip admin — IC card top-ups, restaurant queue apps,
        train transfers, Visit Japan Web — assumes you are online. A pocket Wi-Fi or a physical SIM also
        works; an eSIM is simply the one you can install before you fly and activate on landing.
      </>
    ),
  },
  {
    q: "Is eSIM available in Japan?",
    a: (
      <>
        Yes. All three national carriers — docomo, SoftBank and KDDI (au) — carry travel eSIM traffic, and
        every provider on this page resells one of them. The constraint is your handset, not the country:
        see{" "}
        <Link href="/guides/esim/does-esim-work-in-japan" className={tools.inlineLink}>does eSIM work in Japan</Link>{" "}
        for the two checks that decide it.
      </>
    ),
  },
  {
    q: "Which is better, Airalo or Holafly?",
    a: (
      <>
        Airalo, for most people, on today&apos;s prices: it sells small allowances from {priceFrom("airalo")}{" "}
        where Holafly sells unlimited only, and its cheapest unlimited plan ({unlimitedFromLabel("airalo")}) is
        below Holafly&apos;s ({unlimitedFromLabel("holafly")}). Holafly&apos;s one clear edge is that you never
        watch a counter — but its hotspot is capped at 1 GB/day, which Airalo does not do. Full breakdown:{" "}
        <Link href="/guides/esim/airalo-vs-holafly-japan" className={tools.inlineLink}>Airalo vs Holafly for Japan</Link>.
      </>
    ),
  },
  {
    q: "How much data do I need for a two-week trip to Japan?",
    a: (
      <>
        Budget roughly 1 GB a day — about 14 GB — if you are using maps, trains, messaging and the odd
        video, and double that if you tether a laptop or stream. On current prices the cheapest plan that
        covers 14 days at that level is{" "}
        {tripRows[1].allowance
          ? `${tripRows[1].allowance.provider}'s ${tripRows[1].allowance.name} at ${formatUsd(tripRows[1].allowance.priceUsd)}`
          : "listed in the table below"}
        . Our{" "}
        <Link href="/guides/esim/japan-esim-2-weeks" className={tools.inlineLink}>two-week Japan eSIM guide</Link>{" "}
        works through the same sum in more detail.
      </>
    ),
  },
];

const faqItems = [
  {
    q: "What is the best eSIM for Japan according to Reddit?",
    a: `Reddit has no official ranking, and prices quoted in old threads go stale. Checked against each provider's own site on ${pricesCheckedAt}, Simbye is the best value: ${simbye7 ? `${formatUsd(simbye7.priceUsd)} for ${simbye7.name}` : `from ${priceFrom("simbye")}`}${simbye7Unl ? ` or ${formatUsd(simbye7Unl.priceUsd)} for unlimited 7 days` : ""}, on ${getProvider("simbye").network}. Airalo${airalo7 ? ` (${formatUsd(airalo7.priceUsd)} for ${airalo7.name})` : ""} is the easy-app default on SoftBank, and Klook eSIM suits travellers who already book their trip on Klook.`,
  },
  {
    q: "Is Klook eSIM good for Japan?",
    a: `Yes, if you already book tickets or transport on Klook. Its listing "${klookEsim.listingTitle}" runs per-day plans on SoftBank 5G and total-data plans on IIJ (docomo) 4G LTE, with ${klookEsim.specData.toLowerCase()}. Tethering is supported and it is data only, with no phone number (listing checked ${klookEsim.specsCheckedAt}). Klook prices change by date, so check the listing for today's options.`,
  },
  {
    q: "Which network is best for an eSIM in Japan?",
    a: "docomo, if your route leaves the cities: it has the widest reach in rural areas. SoftBank and au (KDDI) are strong in the cities and along the main tourist corridors. Simbye, eSIM Go, Sakura Mobile's 3 GB/day plans and Klook's total-data plans name docomo; Airalo names SoftBank as its primary network and Holafly KDDI / SoftBank (each provider's own page, checked 22 Oct–1 Nov 2026).",
  },
  {
    q: "Do I need unlimited data in Japan?",
    a: `Usually not. About 1 GB a day covers maps, trains and messaging, and an allowance plan costs less: ${simbye7 && simbye7Unl ? `Simbye's ${simbye7.name} is ${formatUsd(simbye7.priceUsd)} against ${formatUsd(simbye7Unl.priceUsd)} for unlimited 7 days` : "allowance plans start well below unlimited"}. Unlimited is worth it if you stream video, tether a laptop or share with a companion, and even then a daily high-speed cap applies (Klook: 10 GB/day, then 128 kbps).`,
  },
  {
    q: "When should I install my Japan eSIM?",
    a: "Before you fly, at home on Wi-Fi: installing needs an internet connection. Leave the new line switched off, then on landing turn it on and enable data roaming for it. Check on the plan page whether validity starts at installation or at first connection in Japan, and install accordingly.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/best-esim-japan-reddit") } });

const TITLE = "Best eSIM for Japan Reddit 2026: Picks, Networks, Prices";
const META_DESCRIPTION =
  `Best eSIM for Japan reddit question, price-checked: Simbye from ${priceFrom("simbye")}, ` +
  `Airalo ${airalo7 ? `${formatUsd(airalo7.priceUsd)} a week` : `from ${priceFrom("airalo")}`}, Klook eSIM on SoftBank/docomo. ` +
  `Compare networks, caps, fixes.`;

export default function BestEsimJapanRedditPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/best-esim-japan-reddit" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/best-esim-japan-reddit" />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
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
              route: "/guides/esim/best-esim-japan-reddit",
              headline: TITLE,
              updated,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: itemListJsonLd({
              route: "/guides/esim/best-esim-japan-reddit",
              name: "Japan eSIM picks by need",
              description: "Which Japan eSIM to buy for each kind of trip.",
              items: pickRows.map(({ id, seller }) => ({
                href: pickSellerHref[seller],
                title: esimPicksCopy.en.rows[id].need,
              })),
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Best eSIM for Japan Reddit</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan Reddit 2026: <br />Picks, Networks, Prices
          </h1>
          <p className={styles.heroSubtitle}>
            The eSIMs travellers weigh up for Japan, checked against official prices: networks, 7- and
            15-day costs, common problems and their fixes, and which plan fits 7, 14 or 30 days.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Claims checked against live prices", "Official prices, checked daily"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t influence which services we cover or how we check them.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>The short answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              If you searched Reddit for the best eSIM for Japan, the answer on today&apos;s official prices is{" "}
              <strong>Simbye</strong>:{" "}
              {simbye7 ? `${formatUsd(simbye7.priceUsd)} for ${simbye7.name}` : `from ${priceFrom("simbye")}`}
              {simbye7Unl ? ` or ${formatUsd(simbye7Unl.priceUsd)} for unlimited 7 days` : ""}, on{" "}
              {getProvider("simbye").network}. <strong>Airalo</strong> costs{" "}
              {airalo7 ? `${formatUsd(airalo7.priceUsd)} for ${airalo7.name}` : `from ${priceFrom("airalo")}`} on
              SoftBank, and <strong>Klook eSIM</strong> runs on SoftBank 5G or IIJ (docomo), the easy add-on if
              the rest of your trip is already booked on Klook.
            </p>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              The cheapest unlimited week on current prices is{" "}
              <strong>
                {weekUnlimited
                  ? `${weekUnlimited.provider} at ${formatUsd(weekUnlimited.plan.priceUsd)} (${weekUnlimited.plan.name})`
                  : "listed in the table below"}
              </strong>
              , and the cheapest Japan eSIM of any size is{" "}
              <strong>
                {siteCheapestPlan
                  ? `${siteCheapestPlan.provider}'s ${siteCheapestPlan.name} at ${formatUsd(siteCheapestPlan.priceUsd)}`
                  : "listed in the table below"}
              </strong>
              . Every price is read from the providers&apos; own sites, last checked {pricesCheckedAt}.
            </p>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>eSIM Go</strong> starts at {priceFrom("esimgo")} and <strong>Airalo</strong> at{" "}
              {priceFrom("airalo")}: Airalo is an easy default, but not the cheap one. If you need a Japanese
              phone number, <strong>Sakura Mobile</strong> is the only provider here that sells one.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Holds up</p>
                <p className={styles.verdictStatValue}>Airalo — from {priceFrom("airalo")}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Holds up</p>
                <p className={styles.verdictStatValue}>eSIM Go — from {priceFrom("esimgo")}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Out of date</p>
                <p className={styles.verdictStatValue}>Holafly unlimited — {priceFrom("holafly")}</p>
              </div>
            </div>
            <a href={link("simbye")} className={styles.verdictBtn} target="_blank" rel="sponsored nofollow noopener">
              Get Simbye Japan eSIM from {priceFrom("simbye")} →
            </a>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.7rem", lineHeight: 1.6 }}>
              Already booking tickets or transport on Klook?{" "}
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                {klookEsim.ctaLabel}
              </KlookLink>{" "}
              — one checkout for the eSIM and the rest of the trip. Prefer Airalo&apos;s app?{" "}
              <a href={link("airalo")} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Get Airalo Japan eSIM
              </a>
              .
            </p>
          </div>
        </div>

        {/* The two high-rate options (Simbye 25%, Klook eSIM 20%) straight after the answer. */}
        <BookingEsimCard lead="Get online the moment you land in Japan" />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compared</span>
          <h2 className={styles.sectionTitle}>Which Japan eSIM is best for a 7- or 15-day trip?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            {simbyeCheapestWeek
              ? "Simbye: it has the lowest 7-day price of the five, both for a small allowance and for unlimited."
              : "Simbye has the lowest entry price of the five."}{" "}
            Pick Sakura Mobile instead if you need a Japanese phone number, and Klook eSIM if the rest of the trip
            is in a Klook basket.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["eSIM", "Network", "7 days", "15 days", "Japanese number", "Tethering", "Why pick it", "Buy"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {redditTableRows.slice(0, 1).map((row) => (
                    <tr key={row.id}>
                      <td className={styles.tdProvider}>{row.label}</td>
                      <td className={styles.tdNetwork}>{getProvider(row.id).network}</td>
                      <td className={styles.tdPrice}>{priceCell(row.id, 7)}</td>
                      <td className={styles.tdPrice}>{priceCell(row.id, 15)}</td>
                      <td>{esimSpec(row.id).phoneNumberShort}</td>
                      <td>{esimSpec(row.id).tetheringShort}</td>
                      <td>{row.why}</td>
                      <td>
                        <a href={row.buyHref} target="_blank" rel="sponsored nofollow noopener" className={tools.inlineLink}>
                          {row.buyLabel}
                        </a>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className={styles.tdProvider}>Klook eSIM</td>
                    <td className={styles.tdNetwork}>{klookEsim.specNetwork}</td>
                    <td className={tools.tdMuted}>{klookEsim.priceUnknownLabel}</td>
                    <td className={tools.tdMuted}>{klookEsim.priceUnknownLabel}</td>
                    <td>{klookEsim.specPhoneNumber}</td>
                    <td>{klookEsim.specTethering}</td>
                    <td>One checkout with your Klook tickets and transport</td>
                    <td>
                      <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={tools.inlineLink}>
                        Check Klook eSIM →
                      </KlookLink>
                    </td>
                  </tr>
                  {redditTableRows.slice(1).map((row) => (
                    <tr key={row.id}>
                      <td className={styles.tdProvider}>{row.label}</td>
                      <td className={styles.tdNetwork}>{getProvider(row.id).network}</td>
                      <td className={styles.tdPrice}>{priceCell(row.id, 7)}</td>
                      <td className={styles.tdPrice}>{priceCell(row.id, 15)}</td>
                      <td>{esimSpec(row.id).phoneNumberShort}</td>
                      <td>{esimSpec(row.id).tetheringShort}</td>
                      <td>{row.why}</td>
                      <td>
                        <a href={row.buyHref} target="_blank" rel="sponsored nofollow noopener" className={tools.inlineLink}>
                          {row.buyLabel}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {pricesCheckedIso}. Prices are each provider&apos;s cheapest allowance and unlimited plan
            of exactly 7 or 15 days, from its own Japan page:{" "}
            {shortlistRows.map((row, i) => (
              <span key={row.id}>
                <a href={row.sourceUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className={tools.inlineLink}>
                  {row.name}
                </a>
                {i < shortlistRows.length - 1 ? ", " : "."}
              </span>
            ))}{" "}
            Number and tethering terms from the same sites (22 Oct 2026; Simbye 5 Nov 2026). Klook eSIM: network,
            tethering and number from its{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" className={tools.inlineLink}>
              listing
            </KlookLink>{" "}
            ({klookEsim.specsCheckedAt}); Klook prices change by date, so none is printed.
          </p>
          <a href={link("simbye")} className={styles.pickCta} target="_blank" rel="sponsored nofollow noopener">
            Get Simbye Japan eSIM from {priceFrom("simbye")} →
          </a>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Common problems</span>
          <h2 className={styles.sectionTitle}>What goes wrong with a Japan eSIM, and how do you avoid it?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Most failures come down to three things: a data allowance that is too small, a network that is thin
            on your route, and installing too late. Each fix below is a plan term you can check before paying.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Problem", "Why it happens", "How to avoid it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {problemRows.map((row) => (
                    <tr key={row.problem}>
                      <td className={styles.tdProvider}>{row.problem}</td>
                      <td>{row.cause}</td>
                      <td>{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {pricesCheckedIso} (plan sizes); caps, hotspot and network terms from{" "}
            <a href={getProvider("holafly").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>Holafly</a>,{" "}
            <a href={getProvider("sakura").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>Sakura Mobile</a>,{" "}
            <a href={getProvider("esimgo").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>eSIM Go</a>,{" "}
            <a href={getProvider("simbye").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>Simbye</a>{" "}
            and{" "}
            <a href={getProvider("airalo").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>Airalo</a>{" "}
            (22 Oct–5 Nov 2026) and the Klook listing ({klookEsim.specsCheckedAt}). Setup steps:{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={tools.inlineLink}>how to set up an eSIM for Japan</Link>.
          </p>
        </section>

        <EsimCtaTop />

        <EsimUseCaseTable copy={esimPicksCopy.en} checkedLabel={pricesCheckedAt} />

        {/* Where the opinions come from */}
        <section className={styles.bodySection} id="read-it-yourself">
          <span className={styles.sectionLabel}>Read it yourself</span>
          <h2 className={styles.sectionTitle}>Where can you read the Reddit threads yourself?</h2>
          <p className={styles.bodyText}>
            In the Japan travel subreddits, sorted by top posts. This page quotes no comment and does not count
            votes; it checks common Japan eSIM advice against current prices{" "}
            <Link href="#claim-check" className={tools.inlineLink}>further down</Link>. These searches open on Reddit:
          </p>
          <ul className={styles.bodyList}>
            {redditSearches.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* How to read the threads */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Why prices drift</span>
          <h2 className={styles.sectionTitle}>Why Old eSIM Advice Can Be Wrong About Prices</h2>
          <p className={styles.bodyText}>
            Forum advice stays online long after the plan it describes has been repriced, and a price in
            an old comment is rarely edited. Before acting on any figure you read in a thread, check it
            against the provider&apos;s own page.
          </p>
          <p className={styles.bodyText}>
            So this page does not re-rank the providers — our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              full Japan eSIM comparison
            </Link>{" "}
            already does that. It takes four common pieces of Japan eSIM advice and checks each against
            the current catalogue, which is re-read daily. Where the advice still stands, this page says
            so; where the price has moved, it shows the gap.
          </p>
        </section>

        {/* Question-led answers */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Asked and answered</span>
          <h2 className={styles.sectionTitle}>The Questions People Actually Type</h2>
          {askedQuestions.map((item) => (
            <div key={item.q} style={{ marginBottom: "1.75rem" }}>
              <h3 className={styles.sectionTitle} style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                {item.q}
              </h3>
              <p className={styles.bodyText} style={{ marginBottom: 0 }}>{item.a}</p>
            </div>
          ))}
        </section>

        {/* Networks */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Networks</span>
          <h2 className={styles.sectionTitle}>Which network is best for an eSIM in Japan: docomo, SoftBank or KDDI?</h2>
          <p className={styles.bodyText}>
            docomo, if your route leaves the cities; in the cities all three are strong. Japan has three
            national networks, and no travel eSIM has one of its own — every provider
            here resells one or two of them. That is why &ldquo;which eSIM&rdquo; and &ldquo;which
            network&rdquo; are not the same question, and why two eSIMs at very different prices can
            behave identically on the same train. Each line below is what the provider&apos;s own site
            states, checked 22 Oct 2026.
          </p>
          <div className={styles.stepsList}>
            {networkCards.map((card, i) => (
              <div key={card.carrier} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{card.carrier}</p>
                  <p className={styles.stepDesc}>{card.what}</p>
                  <ul className={styles.bodyList}>
                    {card.who.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            One thing worth saying plainly: in genuinely remote mountains or on the small islands,
            coverage thins out on all three networks. The docomo advantage is real but it is a margin,
            not a different map.
          </p>
        </section>

        {/* Plans by trip length */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By trip length</span>
          <h2 className={styles.sectionTitle}>Which eSIM plan should you buy for 7, 14 or 30 days?</h2>
          <p className={styles.bodyText}>
            {tripRows[0].allowance
              ? `For a week, ${tripRows[0].allowance.provider}'s ${tripRows[0].allowance.name} at ${formatUsd(tripRows[0].allowance.priceUsd)} is the cheapest plan that covers it; `
              : ""}
            this is the decision that settles what you actually pay. Budget roughly <strong>1 GB a day</strong>{" "}
            for maps, trains, messaging and the occasional video, and double it if you stream or tether a
            laptop. The two right-hand columns are the cheapest plan on the whole site that covers each
            trip, read from the providers&apos; own sites on {pricesCheckedAt}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Trip length", "What it is for", "Data to budget", "Cheapest plan that covers it", "Cheapest unlimited"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tripRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.tdProvider}>{row.label}</td>
                      <td>{row.use}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>~{row.gb} GB</td>
                      <td className={styles.tdPrice}>
                        {row.allowance
                          ? `${formatUsd(row.allowance.priceUsd)} — ${row.allowance.provider} ${row.allowance.name}`
                          : "—"}
                      </td>
                      <td className={row.unlimited ? styles.tdPrice : tools.tdMuted}>
                        {row.unlimited
                          ? `${formatUsd(row.unlimited.plan.priceUsd)} — ${row.unlimited.provider} ${row.unlimited.plan.name}`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {pricesCheckedIso}, across Simbye, Airalo, eSIM Go, Holafly and Sakura Mobile (official
            pages:{" "}
            <a href={getProvider("simbye").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>simbye.com</a>,{" "}
            <a href={getProvider("airalo").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>airalo.com</a>,{" "}
            <a href={getProvider("esimgo").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>breezesim.com</a>,{" "}
            <a href={getProvider("holafly").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>holafly.com</a>,{" "}
            <a href={getProvider("sakura").sourceUrl} target="_blank" rel="nofollow noopener noreferrer" className={tools.inlineLink}>sakuramobile.jp</a>).
            &ldquo;Data to budget&rdquo; is a rule of thumb of about 1 GB a day.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two notes on reading that table. A plan with more validity than your trip is often cheaper than
            the one sized to it — a 30-day allowance regularly undercuts the 7-day version of the same
            data, so buy on price, not on tidiness. And unlimited only pays for itself if your real use is
            well above the budget column: for a 7-day trip the gap between the allowance plan and unlimited
            is the price of a couple of train tickets, which is money worth spending only if you tether or
            stream.
          </p>
          <p className={styles.bodyText}>
            Buy it before you fly, not at the airport. Install the profile at home on your own Wi-Fi, leave
            it switched off, and turn it on when you land. Our{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              step-by-step eSIM setup guide
            </Link>{" "}
            covers the install, and{" "}
            <Link href="/guides/esim/japan-esim-2-weeks" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the two-week guide
            </Link>{" "}
            works through the 14-day sum in more detail.
          </p>
          {/* Klook sits here, at the point the reader is choosing a plan, because its own listing
              covers the same tiers — and because Klook is where many readers are already checking out. */}
          <div style={{ marginTop: "1.5rem", padding: "1.25rem", border: "1px solid var(--rule)", borderRadius: "var(--radius-sm)" }}>
            <p className={styles.bodyText} style={{ marginBottom: "0.75rem" }}>
              <strong>One more place to buy it:</strong> Klook sells a Japan eSIM of its own, listed as{" "}
              &ldquo;{klookEsim.listingTitle}&rdquo;. Its listing names {klookEsim.specData.toLowerCase()},
              running on {klookEsim.specNetwork}, with tethering supported and no phone number — so it
              covers the same tiers as the table above (listing checked {klookEsim.specsCheckedAt}). No price
              is quoted for it, because Klook prices change by date and an unverified figure is not
              printed here.
            </p>
            <KlookLink
              href={klookEsim.url}
              className={styles.pickCta}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
        </section>

        {/* How to choose */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How to choose</span>
          <h2 className={styles.sectionTitle}>Do you need unlimited data, a phone number or tethering?</h2>
          <p className={styles.bodyText}>
            Three questions settle almost every Japan eSIM choice. Everything in the table is what each provider&apos;s own
            site or help centre states, checked 22 Oct 2026 — no prices here, because the terms are what
            differ.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Unlimited available", "Tethering / hotspot", "Japanese phone number"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td>{row.unlimited}</td>
                      <td>{row.tethering}</td>
                      <td>{row.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Unlimited or an allowance?</strong> An allowance is cheaper for ordinary trip use, and
            none of the &ldquo;unlimited&rdquo; plans is unmetered: Holafly caps the hotspot, eSIM Go&apos;s
            Unlimited Essential slows after a daily high-speed allowance, Airalo applies a fair-use policy
            and Sakura Mobile limits hotspot by plan length. Buy unlimited to stop watching the counter, not
            because you expect uncapped speed.
          </p>
          <p className={styles.bodyText}>
            <strong>Do you need a phone number?</strong> Only if something will send you a Japanese SMS or
            you need to be called — a restaurant confirming a booking, a clinic, a landlord. Of the
            providers on this page, only Sakura Mobile sells a Voice + Data eSIM with a Japanese number
            and domestic call minutes; everything else, Klook included, is data only, and you keep your home
            number on your other SIM.
          </p>
          <p className={styles.bodyText}>
            <strong>Will you tether?</strong> If a laptop or a travel companion will be sharing the
            connection, the hotspot terms matter more than the headline price — Holafly&apos;s 1 GB/day
            shareable cap is the one to check first.
          </p>
          <p className={styles.bodyText}>
            This page checks common advice against prices. For every unlimited plan by price and daily limit, see our{" "}
            <Link href="/guides/esim/japan-esim-unlimited" style={{ color: "var(--accent)", fontWeight: 600 }}>Japan eSIM unlimited data</Link> comparison; for
            the lowest price at each size, our{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>cheapest eSIM for Japan</Link> ranking; and for a
            group sharing one connection, our{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>pocket WiFi guide</Link>.
          </p>
        </section>

        {/* Device check */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you pay</span>
          <h2 className={styles.sectionTitle}>Check Your Phone Takes an eSIM — and Is Not Locked</h2>
          <p className={styles.bodyText}>
            Two conditions, both checkable in under a minute, and failing either one makes the rest of this
            page academic. Both are worth checking before you pay, not in the arrivals hall.
          </p>
          <div className={styles.stepsList}>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>1</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Does the handset have eSIM hardware?</p>
                <p className={styles.stepDesc}>
                  On iPhone, open Settings → General → About and scroll to the bottom: if an{" "}
                  <strong>EID</strong> row is listed, the phone has eSIM hardware. That covers iPhone XS
                  (2018) and every later model — but not iPhones bought in mainland China, which ship
                  without eSIM. On Android, the same EID appears under the About phone screen.
                </p>
              </div>
            </div>
            <div className={styles.stepCard}>
              <span className={styles.stepNum}>2</span>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>Is it carrier-unlocked?</p>
                <p className={styles.stepDesc}>
                  A handset still locked to your home carrier may refuse a second profile, and that is a
                  call to your carrier, not something a provider can fix for you — so make it before you
                  fly rather than from the arrivals hall. US-market iPhone 14 and later are eSIM-only and
                  ship unlocked, so there is nothing to clear.
                </p>
              </div>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Both checks in full, with the screens:{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              does eSIM work in Japan
            </Link>
            , and{" "}
            <Link href="/guides/esim/japan-esim-iphone" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the iPhone-specific version
            </Link>{" "}
            if that is what you are travelling with.
          </p>
        </section>

        {/* Airalo section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Easy default</span>
          <h2 className={styles.sectionTitle}>Is Airalo good for Japan?</h2>
          <p className={styles.bodyText}>
            Yes as an easy default, not as the cheapest. For Japan, it installs from its own app before you fly and switches on when you land, and its
            Japan page names SoftBank as the primary network. Its entry tier is {priceFromLabel("airalo")},
            which keeps it accessible even though it is no longer the cheapest on the list.
          </p>
          <p className={styles.bodyText}>
            The limit to know: Airalo is data-only — no voice calls and no Japanese phone number. If you need
            a local number, Sakura Mobile&apos;s Voice + Data eSIM is the plan that sells one; see our{" "}
            <Link href="/guides/esim/sakura-mobile-review" className={tools.inlineLink}>Sakura Mobile review</Link>.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Get Airalo Japan eSIM →
          </a>
        </section>

        {/* Holafly section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>For unlimited data</span>
          <h2 className={styles.sectionTitle}>For Unlimited Data: Holafly</h2>
          <p className={styles.bodyText}>
            Holafly sells unlimited plans only, which is its appeal: a
            flat price, and no GB counter to watch during a busy travel day.
          </p>
          <p className={styles.bodyText}>
            Where the price has moved: Holafly is no longer the cheapest way to buy unlimited
            Japan data. Its entry unlimited
            plan is {unlimitedFromLabel("holafly")}, against {unlimitedFromLabel("esimgo")} from
            eSIM Go and {unlimitedFromLabel("airalo")} from Airalo. Also check
            the 1 GB/day hotspot cap, which is the detail that matters if you planned to tether a
            laptop or share with travel companions. SoftBank — Holafly&apos;s network here — is
            also slightly thinner than Docomo outside the cities.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored nofollow noopener"
          >
            {HOLAFLY_ALT_LABEL}
          </a>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            {HOLAFLY_ALT_NOTE} Our full{" "}
            <Link href="/guides/esim/holafly-japan-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Holafly Japan review
            </Link>{" "}
            covers the plan terms in detail.
          </p>
        </section>

        {/* eSIM Go section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Best budget option</span>
          <h2 className={styles.sectionTitle}>Best Budget Option: eSIM Go</h2>
          <p className={styles.bodyText}>
            eSIM Go (sold to consumers as Breeze) has an entry tier of{" "}
            {priceFromLabel("esimgo")}, below Airalo&apos;s, and breezesim.com&apos;s Japan page names NTT
            docomo among its networks (checked 22 Oct 2026) — the network with the widest reach outside the
            cities.
          </p>
          <p className={styles.bodyText}>
            For a 1–2 week trip where you mainly need maps and messaging, that combination of a low entry
            price and docomo coverage is the case for it. For a Japanese phone number or a month-plus stay,
            look at Sakura Mobile instead.
          </p>
          <a
            href={link("esimgo")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Get eSIM Go Japan →
          </a>
        </section>

        {/* Simbye: our pick on price. No sentiment is reported for any provider on this page. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Our pick</span>
          <h2 className={styles.sectionTitle}>Why is Simbye our pick for Japan?</h2>
          <p className={styles.bodyText}>
            Because of the price check itself: its entry tier is{" "}
            {priceFromLabel("simbye")}, under eSIM Go&apos;s {priceFromLabel("esimgo")}, and its feed lists{" "}
            {getProvider("simbye").network}. It is data only, with no Japanese number.{" "}
            <Link href="/guides/esim/simbye-japan-review" className={tools.inlineLink}>Simbye in detail →</Link>
          </p>
          <SimbyeOffer />
        </section>

        {/* Common advice, checked */}
        <section className={styles.bodySection} id="claim-check">
          <span className={styles.sectionLabel}>Claim check</span>
          <h2 className={styles.sectionTitle}>Four Common Pieces of Advice, Checked</h2>
          <div className={styles.stepsList}>
            {redditQAs.map((qa, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{qa.q}</p>
                  <p className={styles.stepDesc}>{qa.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Our Verdict</h2>
          <p className={styles.verdictText}>
            <strong>Simbye is our pick</strong> for a data-only Japan trip, from {priceFrom("simbye")}.{" "}
            <strong>Airalo</strong> remains a sound, easy-to-install default — just not the cheapest one.
          </p>
          <p className={styles.verdictText}>
            The nuance is in the edge cases, and in one correction. Travellers on tight budgets or
            short trips will find eSIM Go hard to beat at {priceFrom("esimgo")}. Those staying
            longer than a month or needing a Japanese phone number should look at Sakura Mobile.
            And if you read that Holafly is the obvious unlimited pick, check the price before
            you act on it — Airalo and eSIM Go both sell unlimited for less today.
          </p>
          <p className={styles.verdictText}>
            Whichever you pick, <strong>buy before you fly</strong>: an eSIM installs at home on your own
            Wi-Fi, while an airport counter means a queue and opening hours to match your flight.
          </p>
          <p className={styles.verdictText}>
            And if the rest of your trip is already in a Klook basket — tickets, passes, airport
            transfers — buying the eSIM in the same checkout is the shortest route to being online
            when you land. Its listing covers the same tiers as the providers above; there is just no
            verified price to rank it on.
          </p>
          <div className={styles.pickCtaRow}>
            <a
              href={link("airalo")}
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
            <KlookLink
              href={klookEsim.url}
              className={styles.pickCta}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>All Five Options: Side by Side</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Price from", "Data", "Network", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{row.data}</td>
                      <td className={styles.tdNetwork}>{row.network}</td>
                      <td>{row.verdict}</td>
                    </tr>
                  ))}
                  {/* Klook also sells a Japan eSIM. Its listing blocks automated price reads, so it gets a
                      row with the tiers and networks its own listing names, but no price — and it is not
                      ranked against the four above, whose prices are re-read daily. */}
                  <tr>
                    <td className={styles.tdProvider}>{klookEsim.name}</td>
                    <td className={tools.tdMuted}>{klookEsim.priceUnknownLabel}</td>
                    <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{klookEsim.specData}</td>
                    <td className={styles.tdNetwork}>{klookEsim.specNetwork}</td>
                    <td>
                      Unranked: Klook prices change by date.{" "}
                      <KlookLink href={klookEsim.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                        Open →
                      </KlookLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices are each provider&apos;s cheapest plan, read from its official site on {pricesCheckedAt}.
            The Klook row carries no price, because Klook prices change with the date and plan you choose, so
            it is not ranked against the others. Its data tiers and networks are what the listing itself
            states, checked on {klookEsim.specsCheckedAt}.
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
            <Link href="/guides/esim/airalo-vs-holafly-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 3h5v5" /><path d="M8 21H3v-5" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo vs Holafly for Japan: Which Is Better?</p>
                <span className={styles.relatedArrow}>Read comparison →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-2-weeks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM for 2 Weeks: How Much Data You Need</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.2 4.2l2.9 2.9M16.9 16.9l2.9 2.9M1 12h4M19 12h4M4.2 19.8l2.9-2.9M16.9 7.1l2.9-2.9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM for Japan: Step by Step</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Prefer the easy-install default?</h2>
            <p className={styles.ctaBannerDesc}>
              Airalo installs from its own app before you fly, from {priceFromLabel("airalo")}.
              Not the cheapest — Simbye starts at {priceFrom("simbye")}.
            </p>
            <a
              href={link("airalo")}
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
