import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import ProviderPlanTable from "../../../components/ProviderPlanTable";
import KlookLink from "../../../components/KlookLink";
import { klookEsim } from "../../../lib/klook-links";
import {
  formatUsd,
  getProvider,
  plansFor,
  priceAtLeastLabel,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
} from "../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Two sources, two dates, deliberately.
//
// Every USD figure on this page comes from data/esim-prices.json, which
// scripts/fetch-esim-prices.mjs refreshes daily from Sakura Mobile's own
// comparison post; `pricesCheckedAt` is that date.
//
// OFFICIAL_CHECKED is the day the rest of it — networks, the 3 GB/day throttle,
// hotspot allowances, the Voice+Data plan, when the days start counting, device
// compatibility, the install steps and the SIM pickup options — was read off
// www.sakuramobile.jp itself: /travel/esim/, /travel/sim/, /travel/price/ and
// /info/setting/travel-esim/. Nothing on this page is a figure we could not find
// on one of those pages.
const pricesCheckedAt = pricesCheckedLabel();
const OFFICIAL_CHECKED = "25 October 2026";

const SAKURA_AFFILIATE = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";

const FROM = priceFromLabel("sakura");
const THIRTY_DAY = priceAtLeastLabel("sakura", 90);
const UNLIMITED_30 = unlimitedFromLabel("sakura", 30);
const AIRALO_FROM = priceFromLabel("airalo");

// Yen prices as Sakura Mobile's own comparison post prints them, read on
// OFFICIAL_CHECKED. The USD column is not hard-coded here — it is looked up from
// the daily tracker so the two can never disagree about which plan costs what.
const sakuraPlans = plansFor("sakura");
function usdFor(days: number, unlimited: boolean): string {
  const plan = sakuraPlans.find((p) => p.days === days && p.unlimited === unlimited);
  return plan ? formatUsd(plan.priceUsd) : "—";
}

const priceRows = [
  { days: 3, capJpy: "¥2,750", unlimitedJpy: "¥3,245" },
  { days: 5, capJpy: "¥3,850", unlimitedJpy: "¥4,565" },
  { days: 7, capJpy: "¥4,620", unlimitedJpy: "¥5,775" },
  { days: 10, capJpy: "¥5,610", unlimitedJpy: "¥7,370" },
  { days: 15, capJpy: "¥7,165", unlimitedJpy: "¥9,680" },
  { days: 30, capJpy: "¥9,900", unlimitedJpy: "¥14,575" },
];

// The difference the product pages actually draw between the two data plans.
// Both wordings in the "After the daily allowance" row are Sakura Mobile's own,
// and they differ by product: the eSIM page says 200 Kbps, the SIM card page
// says 1 Mbps, for the same 3 GB/day plan.
const planDiffRows = [
  { feature: "Network", unlimited: "5G on au (KDDI)", cap: "5G on docomo" },
  { feature: "High-speed data", unlimited: "Unlimited on the phone itself", cap: "Up to 3 GB per day" },
  {
    feature: "After the daily allowance",
    unlimited: "No daily allowance to run out of",
    cap: "Not cut off, but limited to 200 kbps on the eSIM, or 1 Mbps on the physical SIM card",
  },
  {
    feature: "When it resets",
    unlimited: "—",
    cap: "Next day — Sakura Mobile's plan guide describes the allowance as resetting at midnight",
  },
  {
    feature: "Hotspot / tethering",
    unlimited: "Available, with one allowance for the whole trip: 2 GB on 1–3 day plans, 6 GB on 7 days, 15 GB on 15 days, 30 GB on 27–31 days",
    cap: "Available",
  },
  {
    feature: "Japanese phone number",
    unlimited: "No — data only",
    cap: "No — data only on this plan; the separate Voice+Data eSIM adds one",
  },
  {
    feature: "When you can install it",
    unlimited: "Before you fly — you can install it in your home country",
    cap: "Only on the day you want it to start",
  },
  {
    feature: "When the days start counting",
    unlimited: "Once you arrive in Japan",
    cap: "Once you install the eSIM",
  },
];

// Physical SIM against eSIM, same provider. Every row is a difference the
// product pages state, not a general eSIM-vs-SIM argument.
const simVsEsimRows = [
  {
    feature: "How you get it",
    esim: "QR code, issued to you — nothing ships",
    sim: "Collected or delivered inside Japan",
  },
  { feature: "Plan lengths sold", esim: "1 to 90 days", sim: "4, 7, 10, 12, 15, 21, 31, 46, 62 and 93 days" },
  {
    feature: "Networks",
    esim: "au (Unlimited) or docomo (3 GB/day)",
    sim: "au (Unlimited) or docomo (3 GB/day)",
  },
  { feature: "Speed once 3 GB is used in a day", esim: "200 kbps", sim: "1 Mbps" },
  {
    feature: "Japanese phone number",
    esim: "Data only — the Voice+Data eSIM is a separate product",
    sim: "No — data only",
  },
  {
    feature: "Device requirement",
    esim: "SIM-free and eSIM-capable; the China, Hong Kong and Macau versions of iPhones and Apple Watches are not compatible",
    sim: "SIM-free (unlocked)",
  },
  { feature: "Lead time", esim: "None — it is issued to you, not posted", sim: "Order at least 3 days before your pickup date" },
  { feature: "Giving it back", esim: "Nothing to return", sim: "No return needed" },
];

// Where a physical SIM can reach you. All four options are named on /travel/sim/.
const pickupRows = [
  {
    where: "Airport counter",
    detail: "Narita, Haneda, Kansai or Fukuoka International Airport",
    note: "The usual choice — you land, collect, and you are online before the train",
  },
  {
    where: "Your hotel",
    detail: "Sakura Mobile ships to any hotel in Japan",
    note: "Receive it at check-in; good if you land late or at an airport with no counter",
  },
  {
    where: "A local post office",
    detail: "Available nationwide",
    note: "Sakura Mobile suggests this for Airbnb stays, where deliveries are awkward",
  },
  {
    where: "A residential address",
    detail: "Pickup is available across Japan, including residential addresses",
    note: "For stays with friends, family or a long-term rental",
  },
];

const pros = [
  "English site, English checkout and an English help centre",
  "eSIM, physical SIM card or pocket WiFi — three ways in, same company",
  "Unlimited 5G on au, or 3 GB a day on docomo",
  "A Japanese phone number is available at all, via the Voice+Data eSIM",
  "Collect at Narita, Haneda, Kansai or Fukuoka, or have it sent to your hotel",
];

const cons = [
  "Several times the price of a data-only travel eSIM",
  "The main eSIM and SIM card plans carry no phone number",
  "Voice+Data needs an in-person ID check after you land",
  "China, Hong Kong and Macau iPhones cannot use the eSIM at all",
  "Hotspot data on the Unlimited plan has a trip allowance, unlike the on-device data",
];

const whoFor = [
  {
    title: "Long-stay travellers",
    desc: "The eSIM is sold for up to 90 days and the physical SIM for up to 93, in single-day steps — so a six-week stay is one purchase rather than a chain of short plans.",
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
    title: "Travellers who need a Japanese number",
    desc: "Almost every travel eSIM for Japan is data only. Sakura Mobile's Voice+Data eSIM is the exception: a Japanese number, SMS and domestic calls, in exchange for an in-person ID check once you are in the country.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: "Rural & countryside explorers",
    desc: "Docomo has the widest rural coverage of any Japanese carrier, and the 3 GB/day plan is the one that rides it. If you are heading to Tohoku, Shikoku or rural Kyushu, that is the plan to pick — the Unlimited plan runs on au instead.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Anyone whose phone cannot take an eSIM",
    desc: "A locked handset, an older phone, or a China, Hong Kong or Macau iPhone rules out most travel eSIMs. Sakura Mobile still has a physical SIM card and a pocket WiFi rental to fall back on.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

// The install flow as Sakura Mobile's own setup guide writes it.
const setupSteps = [
  {
    title: "Turn off every other eSIM and SIM on the phone",
    desc: "Sakura Mobile's setup guide opens with this: switch off any other eSIM or physical SIM besides theirs before you start, so the install does not land on the wrong line.",
  },
  {
    title: "Get on stable WiFi",
    desc: "The profile downloads over the internet, so you need a connection that will not drop halfway — hotel or home WiFi, not an airport hotspot you are walking away from.",
  },
  {
    title: "Issue the QR code, then scan or long-press it",
    desc: "Sakura Mobile issues the eSIM as a QR code. Display it, then scan it with the phone you want it on — or long-press it if the code is already on that screen. There is no manual SM-DP+ entry step in the guide.",
  },
  {
    title: "On Android, finish the APN settings",
    desc: "Android needs one more step that iPhone does not: name sakuramobile, APN vmobile.jp, username sakura@sakuramobile.jp, password sakura, auth type PAP or CHAP — all in lower case.",
  },
  {
    title: "Install at the right moment for your plan",
    desc: "Unlimited can be installed before you fly: the usage period starts once you arrive in Japan. The 3 GB/day plan starts the moment you install it, so install that one only after you land. Voice+Data cannot be activated before you arrive at all.",
  },
];

const faqItems = [
  {
    q: "Can I use Sakura Mobile for hotspot/tethering?",
    a: "Yes. Every travel eSIM and SIM card plan lists hotspot as available. The catch is on the Unlimited plan, where the on-device data is unlimited but the hotspot is not: you get one hotspot allowance for the whole trip, sized by plan length — 2 GB on 1–3 day plans, 3 GB on 4 days, 6 GB on 7 days, 9 GB on 10 days, 15 GB on 15 days and 30 GB on 27–31 day plans. The 3 GB/day plan lists hotspot as available without a separate figure. Read from Sakura Mobile's eSIM plan page on 25 October 2026.",
  },
  {
    q: "When does the plan start counting days?",
    a: "It depends which plan you buy. For the Unlimited eSIM, the usage period starts once you arrive in Japan, and you can install the eSIM in advance from your country of departure. For the 3 GB/day data eSIM, the usage period starts once you install the eSIM — Sakura Mobile says to install it on the day you want to start using it. For the 3 GB/day Voice+Data eSIM, the period starts after you arrive in Japan and complete the in-person ID verification; it cannot be activated before you arrive. Read from Sakura Mobile's eSIM plan page on 25 October 2026.",
  },
  {
    q: "Does Sakura Mobile work with an iPhone bought in China or Hong Kong?",
    a: "Not as an eSIM. Sakura Mobile's compatibility note is explicit: the China, Hong Kong and Macau versions of Apple Watches and iPhones are not compatible with eSIM. Those handsets ship without eSIM hardware, so this is a device limit rather than a Sakura Mobile one. The physical travel SIM card is the way round it, provided the phone is SIM-free (unlocked), and a pocket WiFi rental works with any device. Read from Sakura Mobile's eSIM plan page on 25 October 2026.",
  },
  {
    q: "Does Sakura Mobile have English support?",
    a: "Yes, and it is the clearest reason to pay the premium. Sakura Mobile is a Japanese company that sells to visitors in English: the plan pages, the checkout, the device compatibility checker, the eSIM setup guides and the help centre at support.sakuramobile.jp are all English-language. Most Japanese prepaid SIMs assume you read Japanese, which is where a mid-trip problem turns expensive.",
  },
  {
    q: "Can I make phone calls with Sakura Mobile?",
    a: "Only on one specific plan. The Unlimited and 3 GB/day data plans — eSIM and physical SIM alike — are marked \"No phone number, data only\". The 3 GB/day Voice+Data eSIM is the one that gives you a Japanese number, SMS and domestic calls: up to 120 minutes on plans of 10 days or less, 240 minutes from 11 to 30 days, 360 minutes from 31 to 60 days and 480 minutes from 61 to 90 days. Japanese law requires an in-person ID check before it starts. Read 25 October 2026.",
  },
  {
    q: "Is Sakura Mobile good for rural Japan?",
    a: "The 3 GB/day plan is the one to take if rural coverage is the priority, because that is the plan on docomo — the carrier with the broadest rural reach in Japan. The Unlimited plan runs on au (KDDI) instead, which is strong but not the rural benchmark. If your itinerary is Tohoku, rural Hokkaido, the Noto Peninsula or inland Shikoku, the plan you pick matters as much as the provider.",
  },
  {
    q: "Where does the physical SIM card reach me?",
    a: "Four ways, all inside Japan: an airport counter at Narita, Haneda, Kansai or Fukuoka International Airport; any hotel in Japan; a local post office, available nationwide and suggested for Airbnb stays; or a residential address. Sakura Mobile asks you to order at least 3 days before your pickup date so it arrives on time, and nothing needs to be posted back afterwards. Read from Sakura Mobile's SIM card page on 25 October 2026.",
  },
  {
    q: "How long can a Sakura Mobile plan run?",
    a: "The travel eSIM is sold in single-day steps from 1 to 90 days, and the physical SIM card in fixed lengths up to 93 days. Buying the length you need up front is also cheaper than stacking short plans, and buying two or more at once takes 10% off automatically — Sakura Mobile applies that to both eSIMs and SIM cards. Read 25 October 2026.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/sakura-mobile-review") } });

const TITLE = "Sakura Mobile Review 2026: eSIM and SIM Card Plans";
const DESCRIPTION =
  "Sakura Mobile review 2026: eSIM and SIM card plans and prices in yen, au against docomo, phone number, tethering, and where to pick a SIM card up.";

export default function SakuraMobileReviewPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/sakura-mobile-review" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/sakura-mobile-review" />
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
              route: "/guides/esim/sakura-mobile-review",
              headline: TITLE,
              description: DESCRIPTION,
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
          <span className={styles.breadCurrent}>Sakura Mobile Review</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Prices checked {pricesCheckedAt}
          </p>
          <h1 className={styles.heroTitle}>
            Sakura Mobile Review 2026:<br />eSIM &amp; SIM Card Plans and Prices
          </h1>
          <p className={styles.heroSubtitle}>
            Unlimited on au, 3 GB a day on docomo, or a physical SIM card you collect at the airport —
            and the rare option of a Japanese phone number. Here is what each one costs.
          </p>
          <div className={styles.heroBadges}>
            {["Prices checked daily", "Independently Reviewed", "Physical SIM & eSIM"].map((t) => (
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
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Answer first. The hero subtitle above sells the page; this paragraph answers it. */}
        <p className={styles.bodyText}>
          <strong>Sakura Mobile</strong> is a Japanese company that sells prepaid data to visitors — as an
          eSIM, as a physical SIM card, or as a pocket WiFi rental — and it sells that data in two shapes:{" "}
          <strong>Unlimited</strong> on au (KDDI) 5G, or <strong>3 GB a day</strong> on docomo 5G, both of them
          data only, with a separate <strong>3 GB/day Voice+Data eSIM</strong> if you need an actual Japanese
          phone number. Budget roughly <strong>¥2,750 for 3 days</strong> and <strong>¥9,900 for 30</strong> on
          the 3 GB/day plan, or <strong>¥3,245</strong> and <strong>¥14,575</strong> for the same two lengths
          unlimited. That price makes it the right call for a long stay, for rural Japan, for a phone that
          cannot take an eSIM, and for anyone who needs a number to give a restaurant — and the wrong call if
          you want a week of data as cheaply as possible. Plan details read from sakuramobile.jp on{" "}
          {OFFICIAL_CHECKED}; USD prices tracked daily, last checked {pricesCheckedAt}.
        </p>

        {/* Quick Verdict */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
            <div className={styles.verdictStarRow}>
              <div className={styles.verdictStars}>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starFull}>★</span>
                <span className={styles.starHalf}>★</span>
              </div>
              <span className={styles.verdictScore}>4.4 / 5</span>
            </div>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best For</p>
                <p className={styles.verdictStatValue}>Long stays, rural Japan, a Japanese number</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price From</p>
                <p className={styles.verdictStatValue}>{FROM}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>{getProvider("sakura").network}</p>
              </div>
            </div>
            <a href={SAKURA_AFFILIATE} className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Sakura Mobile →
            </a>
          </div>
        </div>

        {/* What is Sakura Mobile */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What is Sakura Mobile?</h2>
          <p className={styles.bodyText}>
            Sakura Mobile is a Japan-focused SIM and eSIM provider built for foreign visitors. Unlike global
            eSIM marketplaces such as Airalo, it is a Japan specialist: the plans, the airport counters, the
            compatibility checker and the help centre all exist for people arriving in Japan with a foreign
            handset, and all of it is in English.
          </p>
          <p className={styles.bodyText}>
            It sells three products. The <strong>travel eSIM</strong> is issued as a QR code and runs 1 to 90
            days. The <strong>travel SIM card</strong> is a physical SIM you collect at an airport or have
            posted to a hotel, sold in fixed lengths up to 93 days. The <strong>pocket WiFi</strong> rental is
            the fallback for a phone that can take neither — Sakura Mobile lists it from 299 JPY/day
            (329 JPY/day, tax incl.), read on {OFFICIAL_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The thing worth knowing before you compare it to anything else: the standard eSIM and SIM plans are
            data only. Sakura Mobile marks them &ldquo;No phone number, data only&rdquo;, the same as Airalo or
            Holafly. What it has that they do not is a separate <strong>Voice+Data eSIM</strong>, which does
            come with a Japanese number — at the cost of an in-person ID check once you are in the country.
          </p>
        </section>

        {/* Unlimited vs 3 GB/day */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Plan types</span>
          <h2 className={styles.sectionTitle}>Unlimited or 3 GB/day: which Sakura Mobile plan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            These are two different products on two different carriers, not two sizes of the same thing. The
            Unlimited plan is au (KDDI) and has no daily cap on the phone itself; the 3 GB/day plan is docomo,
            throttles once you pass 3 GB in a day, and comes back to full speed the next day. Everything below
            was read from Sakura Mobile&apos;s own plan pages on {OFFICIAL_CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Unlimited data</th>
                    <th>3 GB/day data</th>
                  </tr>
                </thead>
                <tbody>
                  {planDiffRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftEsim}>{row.unlimited}</td>
                      <td className={styles.ftSim}>{row.cap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            In practice: take <strong>3 GB/day</strong> if you are going rural, or if 3 GB a day is plainly
            enough and you would rather have docomo. Take <strong>Unlimited</strong> if you stream, navigate
            and video-call all day, or if you want to install the eSIM at home rather than fumble with it at
            the airport — but check the hotspot allowance first if other people will be sharing the connection.
          </p>
        </section>

        {/* Pricing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much does Sakura Mobile cost?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            A week costs <strong>¥4,620</strong> on 3 GB/day or <strong>¥5,775</strong> unlimited; a month is{" "}
            <strong>¥9,900</strong> and <strong>¥14,575</strong>. The yen figures below are Sakura Mobile&apos;s
            own, from the comparison table it publishes, read on {OFFICIAL_CHECKED}; the USD column is the same
            plan in our daily tracker, last refreshed {pricesCheckedAt}. Buying two or more eSIMs or SIM cards
            in one order takes 10% off automatically.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Trip length</th>
                    <th>3 GB/day (docomo)</th>
                    <th>Unlimited (au)</th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.days}>
                      <td className={styles.ftFeature}>{row.days} days</td>
                      <td className={styles.tdPrice}>
                        {row.capJpy}
                        <span className={tools.tdNote}>{usdFor(row.days, false)}</span>
                      </td>
                      <td className={styles.tdPrice}>
                        {row.unlimitedJpy}
                        <span className={tools.tdNote}>{usdFor(row.days, true)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            On tax: Sakura Mobile&apos;s comparison table prints one yen figure per plan with no tax label,
            while its product pages quote their headline prices both ways — the travel eSIM as
            &ldquo;from 1,250 JPY (1,375 JPY, tax incl.)&rdquo;, the travel SIM card as
            &ldquo;from 3,500 JPY (3,850 JPY, tax incl.)&rdquo;. Every figure in the table above is exactly
            1.1× a round yen amount, which is what a tax-included total looks like, so read them as totals and
            confirm yours at checkout. Sakura Mobile also notes that payment is processed in yen only and
            prices shown in other currencies are for reference.
          </p>
          <div style={{ marginTop: "1.75rem" }}>
            <ProviderPlanTable providerId="sakura" />
          </div>
        </section>

        {/* Unlimited, really? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The fine print</span>
          <h2 className={styles.sectionTitle}>Is Sakura Mobile unlimited really unlimited?</h2>
          <p className={styles.bodyText}>
            On the phone itself, yes. Sakura Mobile describes the Unlimited plan as &ldquo;High speed:
            unlimited&rdquo; with no fair-use throttle quoted against the data you use on the handset — which
            is unusual, because most &ldquo;unlimited&rdquo; Japan eSIMs are a daily allowance with a slow lane
            behind it.
          </p>
          <p className={styles.bodyText}>
            The limit is on the <strong>hotspot</strong>. Tethering is available on the Unlimited plan, but it
            draws on a separate allowance sized by plan length and spent across the whole trip, not reset each
            day: 2 GB on 1–3 day plans, 3 GB on 4 days, 6 GB on 7 days, 9 GB on 10 days, 15 GB on 15 days and
            30 GB on 27–31 day plans. If you are the one sharing a connection with a travelling partner or a
            laptop, that number — not the word &ldquo;unlimited&rdquo; — is the one to size your plan against.
            Read on {OFFICIAL_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The 3 GB/day plan is explicit about its own limit: past 3 GB in a day you are not disconnected, but
            the speed drops to 200 kbps on the eSIM, or 1 Mbps on the physical SIM card, until the allowance
            comes back the next day.
          </p>
        </section>

        {/* Phone number */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Calls &amp; SMS</span>
          <h2 className={styles.sectionTitle}>Does Sakura Mobile give you a Japanese phone number?</h2>
          <p className={styles.bodyText}>
            Only on one plan. The Unlimited and 3 GB/day data plans — eSIM and physical SIM alike — are marked
            &ldquo;No phone number, data only&rdquo;. The plan that does give you a number is the{" "}
            <strong>3 GB/day Voice+Data eSIM</strong>, which runs on au 5G and adds a Japanese number, SMS and
            domestic calling on top of the same 3 GB a day.
          </p>
          <p className={styles.bodyText}>
            Calling time is capped by plan length: up to <strong>120 minutes</strong> of domestic calls on
            plans of 10 days or less, <strong>240 minutes</strong> from 11 to 30 days,{" "}
            <strong>360 minutes</strong> from 31 to 60 days and <strong>480 minutes</strong> from 61 to 90 days.
          </p>
          <p className={styles.bodyText}>
            Two conditions come with it, and both are Sakura Mobile&apos;s own wording. Under Japanese law the
            Voice+Data eSIM requires <strong>in-person ID verification</strong> before the service starts, and
            the eSIM <strong>cannot be activated before you arrive in Japan</strong> — the usage period begins
            after you land and complete that check. So it is a plan you commit to in advance and switch on
            after the border, not something you can set up the night before. Read on {OFFICIAL_CHECKED}.
          </p>
        </section>

        {/* Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup guide</span>
          <h2 className={styles.sectionTitle}>How do I set up the Sakura Mobile eSIM?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            You scan a QR code — Sakura Mobile&apos;s setup guide offers no manual SM-DP+ entry — after turning
            off your other lines and getting on stable WiFi. Android then needs the APN filling in by hand;
            iPhone does not. The whole thing is five steps, and the only one that catches people out is{" "}
            <em>when</em> to do it.
          </p>
          <div className={styles.stepsList}>
            {setupSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Steps and APN values read from Sakura Mobile&apos;s travel eSIM setting guide on {OFFICIAL_CHECKED}.{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={tools.inlineLink}>
              Our general Japan eSIM setup walkthrough →
            </Link>
          </p>
        </section>

        {/* Device compatibility */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Compatibility</span>
          <h2 className={styles.sectionTitle}>Which phones work with Sakura Mobile?</h2>
          <p className={styles.bodyText}>
            Two conditions, and one exception that trips up more travellers than it should. The phone has to be{" "}
            <strong>SIM-free (unlocked)</strong> — Sakura Mobile advises checking that before you buy anything —
            and for the eSIM it also has to support eSIM at all.
          </p>
          <p className={styles.bodyText}>
            The exception is Apple hardware sold in greater China. Sakura Mobile states plainly that{" "}
            <strong>the China, Hong Kong and Macau versions of iPhones and Apple Watches are not compatible
            with eSIM</strong>. Those models were built without eSIM, so no provider can work round it. If that
            is your phone, the physical travel SIM card is the answer, or a pocket WiFi if the handset is locked
            as well. Sakura Mobile runs a device compatibility checker on its own site; use it before you pay.
            Read on {OFFICIAL_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            <Link href="/guides/esim/japan-esim-iphone" className={tools.inlineLink}>
              Which iPhones can run a Japan eSIM →
            </Link>
          </p>
        </section>

        {/* SIM card or eSIM */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>SIM vs eSIM</span>
          <h2 className={styles.sectionTitle}>Is the Sakura Mobile SIM card or eSIM better?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The eSIM for almost everyone: nothing ships, there is no lead time, and you can have it on the phone
            before you leave home. The <strong>Sakura Mobile SIM card</strong> wins in three cases — your phone
            cannot take an eSIM, your phone is a China, Hong Kong or Macau iPhone, or you want the gentler
            throttle, because the physical SIM drops to 1 Mbps after 3 GB in a day where the eSIM drops to
            200 kbps.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Travel eSIM</th>
                    <th>Travel SIM card</th>
                  </tr>
                </thead>
                <tbody>
                  {simVsEsimRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td className={styles.ftEsim}>{row.esim}</td>
                      <td className={styles.ftSim}>{row.sim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read from Sakura Mobile&apos;s eSIM and SIM card pages on {OFFICIAL_CHECKED}.{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={tools.inlineLink}>
              SIM card vs eSIM for Japan, across all providers →
            </Link>
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.6rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The Voice + Data product is the reason Sakura Mobile appears on the three pages where a
            Japanese number is the deciding factor:{" "}
            <Link href="/guides/esim/japan-esim-students" className={tools.inlineLink}>students and long study stays</Link>,{" "}
            <Link href="/guides/esim/japan-esim-business" className={tools.inlineLink}>business travel</Link>{" "}
            and{" "}
            <Link href="/guides/esim/japan-esim-android" className={tools.inlineLink}>Android handsets</Link>, where
            its plan is also the one that needs an APN entered by hand.
          </p>
        </section>

        {/* Pickup */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Collection</span>
          <h2 className={styles.sectionTitle}>Where do I pick up a Sakura Mobile SIM card?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            At an airport counter at <strong>Narita, Haneda, Kansai or Fukuoka</strong>, at your hotel, at a
            local post office, or at a residential address — Sakura Mobile delivers across Japan. Order at
            least <strong>3 days before your pickup date</strong>, and nothing needs posting back at the end.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Where</th>
                    <th>What Sakura Mobile offers</th>
                    <th>When it suits</th>
                  </tr>
                </thead>
                <tbody>
                  {pickupRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.ftFeature}>{row.where}</td>
                      <td className={styles.ftEsim}>{row.detail}</td>
                      <td className={styles.ftSim}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Pickup options read from Sakura Mobile&apos;s SIM card page on {OFFICIAL_CHECKED}. Pocket WiFi is
            collected and returned the same ways.
          </p>
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {pros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Fit</span>
          <h2 className={styles.sectionTitle}>Who Is Sakura Mobile Best For?</h2>
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

        {/* Sakura Mobile vs Airalo vs Klook eSIM — the "which do I buy" table, with both
            checkouts directly underneath it, because this is where the decision gets made. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Sakura Mobile vs Airalo vs Klook eSIM: which is cheaper?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Airalo, on price. A month of Airalo data starts at {priceAtLeastLabel("airalo", 5)} against
            Sakura Mobile&apos;s {THIRTY_DAY}, and that gap is the whole argument: Airalo is a data-only eSIM
            marketplace, Sakura Mobile is a Japanese carrier reseller with airport counters, physical SIMs and
            an optional phone number. Klook sells a Japan eSIM of its own, which is worth opening if you are
            already booking Japan tickets there — we quote no price for it, because its listing blocks
            automated reads.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th>Sakura Mobile</th>
                    <th>Airalo</th>
                    <th>{klookEsim.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.ftFeature}>SIM type</td>
                    <td className={styles.ftEsim}>Physical SIM + eSIM</td>
                    <td className={styles.ftSim}>eSIM only</td>
                    <td className={styles.ftSim}>eSIM only</td>
                  </tr>
                  <tr>
                    <td className={styles.ftFeature}>Network</td>
                    <td className={styles.ftEsim}>{getProvider("sakura").network}</td>
                    <td className={styles.ftSim}>{getProvider("airalo").network}</td>
                    <td className={styles.ftSim}>{klookEsim.specNetwork}</td>
                  </tr>
                  <tr>
                    <td className={styles.ftFeature}>Japanese phone number</td>
                    <td className={styles.ftEsim}>Data only, but a Voice+Data eSIM is sold separately</td>
                    <td className={styles.ftSim}>✗ Data only</td>
                    <td className={styles.ftSim}>{klookEsim.specPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td className={styles.ftFeature}>Price (30 days)</td>
                    <td className={styles.ftEsim}>{THIRTY_DAY} · unlimited {UNLIMITED_30}</td>
                    <td className={styles.ftSim}>{priceAtLeastLabel("airalo", 5)}</td>
                    <td className={tools.tdMuted}>{klookEsim.priceUnknownLabel}</td>
                  </tr>
                  <tr>
                    <td className={styles.ftFeature}>Best for</td>
                    <td className={styles.ftEsim}>Long stays, rural routes, a phone number</td>
                    <td className={styles.ftSim}>Short data-only trips</td>
                    <td className={styles.ftSim}>Travellers already booking Japan on Klook</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Both checkouts, side by side, split by reader rather than by commission. */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              {klookEsim.ctaLabel}
            </KlookLink>
            <a href={SAKURA_AFFILIATE} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Sakura Mobile →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.9rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Short trip, data only?</strong> Open the Klook eSIM — one checkout alongside whatever
            tickets and transport you are already booking there, and nothing to collect on arrival.{" "}
            <strong>Need a Japanese phone number, a physical SIM, or a month or more in Japan?</strong> That is
            Sakura Mobile, and the premium buys something Klook and Airalo do not sell. No Klook price appears
            here: its listing could not be read automatically on {klookEsim.checkedAt}, so compare it against
            the figures above on the listing itself.
          </p>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Verdict</h2>
          <p className={styles.verdictText}>
            Sakura Mobile sells something the eSIM marketplaces do not: a Japanese carrier reseller with an
            English front door, three ways to get connected, and the only realistic route to a Japanese phone
            number as a short-term visitor. If you are staying a month or longer, heading well beyond the big
            cities, or carrying a phone that cannot take an eSIM, it is the one to open.
          </p>
          <p className={styles.verdictText}>
            The premium is real — from {FROM} (checked {pricesCheckedAt}), several times Airalo&apos;s
            entry-level plan ({AIRALO_FROM}). What it buys is docomo or au 5G, an airport counter, a help
            centre that answers in English, and the option of a number. For the right traveller that is worth
            paying for; for a week of data in Tokyo it plainly is not.
          </p>
          <p className={styles.verdictText}>
            Two things to get right before you buy. Pick the <strong>plan</strong> as carefully as the
            provider: Unlimited is au and installs before you fly, 3 GB/day is docomo and starts the moment you
            install it. And if anyone will be tethering off your phone, size the trip against the hotspot
            allowance, not the word unlimited.
          </p>
          <a href={SAKURA_AFFILIATE} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
            Get Sakura Mobile →
          </a>
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
            <Link href="/guides/esim/japan-sim-card-working-holiday" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card for Working Holiday: Plans &amp; Rules</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-home-internet-for-foreigners" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10l9-7 9 7" />
                  <path d="M5 9v11h14V9" />
                  <path d="M10 20v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Home Internet for Foreigners: Prices &amp; Setup</p>
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
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <line x1="12" y1="6" x2="12" y2="18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card vs eSIM 2026: Which Should You Buy?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="9" height="14" rx="1" />
                  <rect x="13" y="5" width="9" height="14" rx="1" />
                  <line x1="11" y1="12" x2="13" y2="12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2026): Which Is Better?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/esim-go-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>eSIM Go Japan Review 2026: Best Budget eSIM?</p>
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
              See how Sakura Mobile stacks up against Airalo, Holafly, and eSIM Go on price,
              coverage, and features.
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
