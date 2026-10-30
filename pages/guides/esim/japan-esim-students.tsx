import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import EsimAnswerTable from "../../../components/EsimAnswerTable";
import EsimRelatedCard from "../../../components/EsimRelatedCard";
import {
  cheapestUnlimited,
  formatUsd,
  getProvider,
  plansFor,
  priceAtLeastLabel,
  priceFromLabel,
  pricesCheckedLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { esimLink, esimSpec, HOLAFLY_ALT_LABEL, HOLAFLY_ALT_NOTE, SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Three sources, three dates.
//
// - Every USD price comes from data/esim-prices.json, refreshed daily from each
//   provider's own site; `pricesCheckedAt` is that date.
// - The phone-number and tethering clauses come from lib/esim-specs.ts, read off the
//   providers' own pages on SPECS_CHECKED_AT.
// - SAKURA_OFFICIAL_CHECKED is the day the Sakura Mobile plan lengths, the Voice + Data
//   product and the install timing below were read off www.sakuramobile.jp itself
//   (/travel/esim/, /travel/sim/, /travel/price/).
//
// Nothing on this page is first-hand. There is no student discount to quote because no
// provider publishes one.
const pricesCheckedAt = pricesCheckedLabel();
const SAKURA_OFFICIAL_CHECKED = "25 Oct 2026";

/**
 * A study month, as opposed to a tourist week: the cheapest plan a provider sells that
 * stays valid for a month and carries at least 20 GB. 20 GB is the tier that covers the
 * 10–15 GB/month campus-WiFi estimate below with headroom for a travel weekend.
 * `plansFor` is sorted cheapest first, so the first match is the cheapest.
 */
const studyMonth = (id: EsimProviderId): EsimPlan | null =>
  plansFor(id).find((p) => p.days >= 28 && (p.unlimited || (p.gb ?? 0) >= 20)) ?? null;

const dataLabel = (p: EsimPlan | null) => (p ? (p.unlimited ? "Unlimited" : `${p.gb} GB`) : "—");
const priceLabel = (p: EsimPlan | null) => (p ? formatUsd(p.priceUsd) : "—");

const ESIMGO_MONTH = studyMonth("esimgo");
const AIRALO_MONTH = studyMonth("airalo");
const SAKURA_MONTH = studyMonth("sakura");
const HOLAFLY_MONTH = cheapestUnlimited("holafly", 30);

const TITLE = `Best eSIM for Japan Students 2026: ${dataLabel(ESIMGO_MONTH)} for ${priceLabel(ESIMGO_MONTH)}`;
const DESCRIPTION =
  `${dataLabel(ESIMGO_MONTH)} for a study month is ${priceLabel(ESIMGO_MONTH)} on eSIM Go, ` +
  `${priceLabel(AIRALO_MONTH)} on Airalo. Neither includes a Japanese phone number — only ` +
  `Sakura Mobile does. Prices ${pricesCheckedAt}.`;

const dataUsage = [
  { activity: "Online classes (video streaming)", perDay: "~500 MB" },
  { activity: "Social media (Instagram, TikTok)", perDay: "~200 MB" },
  { activity: "Google Maps & navigation", perDay: "~50 MB" },
  { activity: "Streaming (Netflix, YouTube)", perDay: "~500 MB" },
  { activity: "Total (study + social)", perDay: "~1–2 GB" },
];

const stayOptions = [
  {
    title: "Short exchange (1–4 weeks)",
    desc: `eSIM Go or Airalo. eSIM Go's 10 GB / 30-day plan is ${priceAtLeastLabel("esimgo", 10)}; Airalo's equivalent is ${priceAtLeastLabel("airalo", 10)} and adds in-app top-up, which matters if you guess your allowance wrong.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    title: "A term (1–3 months)",
    desc: `Either a ${dataLabel(ESIMGO_MONTH)} plan renewed each month, or Sakura Mobile, whose own pages sell a travel eSIM for 1 to 90 days and a SIM card in lengths up to 93 days — and whose separate Voice + Data eSIM is the only product here that comes with a Japanese number (read ${SAKURA_OFFICIAL_CHECKED}).`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Longer than that (6+ months)",
    desc: "Past the point where you hold a residence card, a domestic MVNO contract is where the cost comparison ends up — those carriers sell to residents, not visitors, so no tourist eSIM competes. We quote no price for them: they are not in our daily tracker, and a figure we cannot check is worse than none.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const studentTips = [
  {
    title: "Put the heavy traffic on campus WiFi",
    desc: "Many Japanese universities — Tokyo, Kyoto, Osaka, Waseda, Keio among them — take part in eduroam, so a student from a participating home institution connects with their existing credentials. Lectures, downloads and streaming over that connection are what keeps a 20 GB plan sufficient.",
  },
  {
    title: "Check the balance weekly, not on the last day",
    desc: "Airalo and eSIM Go both show remaining data in the app. Running dry is only expensive if you discover it late, because the fix is buying a second plan rather than adding to the one you have.",
  },
  {
    title: "Airalo's top-up is the reason to pay the difference",
    desc: `Airalo's ${dataLabel(AIRALO_MONTH)} month is ${priceLabel(AIRALO_MONTH)} against eSIM Go's ${priceLabel(ESIMGO_MONTH)}. The gap buys in-app top-up: you add data without installing a second profile. Worth it in a first term, when you have no idea what you use.`,
  },
  {
    title: "Stacking short plans is the expensive mistake",
    desc: `Four consecutive one-week plans cost far more than one ${dataLabel(ESIMGO_MONTH)} / 30-day plan at ${priceLabel(ESIMGO_MONTH)}, and each one has to be installed. Buy by the month from the start.`,
  },
];

const faqItems = [
  {
    q: "Is there a student discount on Japan eSIMs?",
    a: `No. None of the four providers publishes a student rate, a campus plan or an education discount, so a student pays what anyone else pays. What a student can do that a tourist cannot is buy by the month: eSIM Go's ${dataLabel(ESIMGO_MONTH)} / 30-day plan is ${priceLabel(ESIMGO_MONTH)}, and four short-trip plans bought back to back cost far more for the same data. Prices checked ${pricesCheckedAt}.`,
  },
  {
    q: "What is the cheapest eSIM for studying in Japan?",
    a: `eSIM Go, at ${priceLabel(ESIMGO_MONTH)} for ${dataLabel(ESIMGO_MONTH)} over 30 days — the lowest price per GB at study-month sizes of the four providers here. Airalo's nearest plan is ${priceLabel(AIRALO_MONTH)}, Sakura Mobile's ${priceLabel(SAKURA_MONTH)} and an unlimited month on Holafly ${priceLabel(HOLAFLY_MONTH)}. Its entry tier starts at ${priceFromLabel("esimgo")} if you only need a few days.`,
  },
  {
    q: "Do I need a Japanese phone number as an exchange student?",
    a: `For a one-term exchange, usually not: university WiFi, a messaging app and an eSIM cover it. You do need one to open most bank accounts, to sign a phone contract and for many part-time job applications, because those forms want a domestic number. No travel eSIM here provides one — eSIM Go's Japan plans state "No SMS or voice calls included. Data only.", Airalo's and Holafly's are data-only too. Sakura Mobile's separate Voice + Data eSIM adds a Japanese number and domestic calls, which makes it the only route on this page to one (read off sakuramobile.jp on ${SAKURA_OFFICIAL_CHECKED}).`,
  },
  {
    q: "Is 20 GB a month enough for a student in Japan?",
    a: `It depends on one thing: whether lectures and downloads go over campus WiFi. With eduroam or dorm WiFi for the heavy traffic, the table on this page puts a study-and-social day at roughly 1–2 GB, so 20 GB a month has headroom. Attending classes over mobile data instead pushes past 30 GB, at which point an unlimited month (${priceLabel(HOLAFLY_MONTH)} on Holafly) stops looking expensive.`,
  },
  {
    q: "Can I use a Japan eSIM on a student visa?",
    a: "Yes. There is no SIM registration for visitors to Japan and no plan here is tied to a visa type, so a tourist eSIM works the same on a student visa, a working-holiday visa or a visa waiver. The restriction runs the other way: domestic MVNO contracts, which are the cheaper option for a long stay, generally need a residence card first.",
  },
  {
    q: "How long before I fly should I buy it?",
    a: `There is no rush, with one exception. Install the profile before you fly, leave it switched off and turn it on when you land — the pattern the setup guide walks through for every provider. Sakura Mobile's 3 GB/day plan is the exception: its own plan guide says that one can only be installed on the day you want it to start, and the days count from install rather than from arrival, while its unlimited plan can be installed at home and starts counting once you are in Japan (read ${SAKURA_OFFICIAL_CHECKED}).`,
  },
  {
    q: "Can I keep my home number and use a Japan eSIM?",
    a: "Yes, on any dual-SIM handset — your home SIM stays in place for calls and texts while the Japan eSIM carries the data. Set the Japan eSIM as the default data line and turn data roaming off on the home SIM so it cannot connect by accident. Most iPhones from the XS onwards and most recent Android flagships do this.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-students") } });

export default function JapanEsimStudentsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-students" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-students" />
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
              route: "/guides/esim/japan-esim-students",
              headline: "Best eSIM for Japan for Students (2026): Priced by the Study Month",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "eSIM for Students", item: "https://www.japan-travel-kit.com/guides/esim/japan-esim-students" },
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
          <span className={styles.breadCurrent}>eSIM for Students</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan for Students (2026):<br />Priced by the Study Month
          </h1>
          <p className={styles.heroSubtitle}>
            {dataLabel(ESIMGO_MONTH)} for {priceLabel(ESIMGO_MONTH)} a month, and the two
            decisions a tourist never has to make.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, `From ${priceLabel(ESIMGO_MONTH)} a month`, "Phone-number options"].map((t) => (
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
            This doesn&apos;t affect our recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box — the whole answer, before anything else */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>
                Buy eSIM Go&apos;s {dataLabel(ESIMGO_MONTH)} / 30-day plan at{" "}
                {priceLabel(ESIMGO_MONTH)} if you have campus WiFi and do not need a Japanese
                phone number; buy Sakura Mobile&apos;s Voice + Data eSIM if you do.
              </strong>{" "}
              There is no student discount on any Japan eSIM — none of the four providers
              publishes one — so the saving comes from buying by the month instead of the week.
              Airalo&apos;s nearest month is {priceLabel(AIRALO_MONTH)} and buys you in-app
              top-up; Sakura Mobile&apos;s data month is {priceLabel(SAKURA_MONTH)}, and its
              separate Voice + Data eSIM is the only product here that comes with a Japanese
              number — which university admin, a bank account and most part-time job
              applications will ask for. An unlimited month is{" "}
              {priceLabel(HOLAFLY_MONTH)} on Holafly, worth it only if you are attending
              lectures over mobile data. Past the point where you hold a residence card, a
              domestic MVNO contract undercuts all of them. Prices checked {pricesCheckedAt};
              phone-number and tethering terms {SPECS_CHECKED_AT}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest study month</p>
                <p className={styles.verdictStatValue}>
                  eSIM Go — {priceLabel(ESIMGO_MONTH)} / {dataLabel(ESIMGO_MONTH)}
                </p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Need a Japanese number</p>
                <p className={styles.verdictStatValue}>Sakura Mobile Voice + Data</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Student discount</p>
                <p className={styles.verdictStatValue}>None published by anyone</p>
              </div>
            </div>
          </div>
        </div>

        {/* The table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>Which eSIM Is Cheapest for a Study Month?</h2>
          <p className={styles.bodyText}>
            One row per provider, showing the cheapest plan each sells that lasts a month and
            carries at least {dataLabel(ESIMGO_MONTH)} — the comparison a term makes, rather
            than the one a week does.
          </p>
          <EsimAnswerTable
            pick={(id) => (id === "holafly" ? HOLAFLY_MONTH : studyMonth(id))}
            note="The cheapest plan each provider sells with at least 28 days' validity and 20 GB or more; Holafly sells unlimited only, so its row is an unlimited month."
          />
        </section>

        {/* Why student picks differ */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Do Student Picks Differ from Tourist Picks?</h2>
          <p className={styles.bodyText}>
            Our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              main Japan eSIM comparison
            </Link>{" "}
            ranks on what matters for a one- or two-week trip: how fast you get online and how
            little a few gigabytes cost. Neither question decides it when you are here for a term.
          </p>
          <p className={styles.bodyText}>
            Three things change the order. <strong>Validity</strong> — a 7-day plan is irrelevant,
            so the provider with the cheapest entry tier is not necessarily the cheapest per month.
            <strong> A Japanese phone number</strong> — not a feature tourists need, and the reason
            Sakura Mobile outranks cheaper options for many students. And <strong>the exit
            point</strong>: every tourist eSIM stops being the rational choice once you have a
            residence card and can sign a domestic contract.
          </p>
        </section>

        {/* Best eSIMs for Students */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>Which Provider Should a Student Buy From?</h2>

          <div className={styles.picksList}>
            {/* eSIM Go */}
            <div className={styles.pickCard}>
              <div className={styles.pickCardHeader}>
                <div className={styles.pickRank}>
                  <span className={styles.pickNumber}>1</span>
                  <div className={styles.pickMeta}>
                    <span className={`${styles.pickBadge} ${styles.pickBadgeGreen}`}>Best Budget</span>
                    <span className={styles.pickName}>eSIM Go</span>
                  </div>
                </div>
              </div>
              <div className={styles.pickCardBody}>
                <p className={styles.pickSummary}>
                  The cheapest study month of the four: {priceLabel(ESIMGO_MONTH)} for{" "}
                  {dataLabel(ESIMGO_MONTH)} over 30 days. eSIM Go sells 30-day plans the whole way
                  up its range, so a term&apos;s data is one purchase rather than four stacked
                  short-trip plans. It runs on {getProvider("esimgo").network}, which also gives it
                  the broadest reach if your campus is outside a major city. Tethering is stated
                  on every one of its Japan plans at no extra cost, which matters when the laptop
                  needs the connection too.
                </p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>Any stay under three months where you don&apos;t need a phone number</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.proIcon}>+</span>Cheapest per GB at study-month sizes</li>
                      <li><span className={styles.proIcon}>+</span>30-day validity across the whole range</li>
                      <li><span className={styles.proIcon}>+</span>Tethering stated at no extra cost</li>
                    </ul>
                  </div>
                  <div className={styles.pickCons}>
                    <p className={styles.pickListLabel}>Cons</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.conIcon}>−</span>No Japanese phone number</li>
                      <li><span className={styles.conIcon}>−</span>No in-app top-up if you run dry</li>
                      <li><span className={styles.conIcon}>−</span>Email-only support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Airalo */}
            <div className={styles.pickCard}>
              <div className={styles.pickCardHeader}>
                <div className={styles.pickRank}>
                  <span className={styles.pickNumber}>2</span>
                  <div className={styles.pickMeta}>
                    <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>Best Balance</span>
                    <span className={styles.pickName}>Airalo</span>
                  </div>
                </div>
              </div>
              <div className={styles.pickCardBody}>
                <p className={styles.pickSummary}>
                  {priceLabel(AIRALO_MONTH)} for {dataLabel(AIRALO_MONTH)} against eSIM Go&apos;s{" "}
                  {priceLabel(ESIMGO_MONTH)}, and the difference buys one student-specific thing:
                  in-app top-up. Misjudge a month and you add data from the app rather than
                  installing a second profile mid-term. Plans run from {priceFromLabel("airalo")}{" "}
                  upwards on {getProvider("airalo").network}.
                </p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>A first term, when you can&apos;t predict your monthly usage yet</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.proIcon}>+</span>In-app top-up — no new QR code needed</li>
                      <li><span className={styles.proIcon}>+</span>{dataLabel(AIRALO_MONTH)} / 30 days at {priceLabel(AIRALO_MONTH)}</li>
                      <li><span className={styles.proIcon}>+</span>24/7 live chat support</li>
                    </ul>
                  </div>
                  <div className={styles.pickCons}>
                    <p className={styles.pickListLabel}>Cons</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.conIcon}>−</span>No Japanese phone number</li>
                      <li><span className={styles.conIcon}>−</span>Costs more per GB than eSIM Go</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sakura Mobile */}
            <div className={styles.pickCard}>
              <div className={styles.pickCardHeader}>
                <div className={styles.pickRank}>
                  <span className={styles.pickNumber}>3</span>
                  <div className={styles.pickMeta}>
                    <span className={`${styles.pickBadge} ${styles.pickBadgeOrange}`}>Only Phone Number</span>
                    <span className={styles.pickName}>Sakura Mobile</span>
                  </div>
                </div>
              </div>
              <div className={styles.pickCardBody}>
                <p className={styles.pickSummary}>
                  The only provider on this page that can give you a Japanese number:{" "}
                  {esimSpec("sakura").phoneNumber}. Its travel eSIM is sold for 1 to 90 days and
                  its SIM card in lengths up to 93 days, so a term fits inside one purchase, and
                  support is in English. Its month here is {priceLabel(SAKURA_MONTH)} for{" "}
                  {dataLabel(SAKURA_MONTH)} on docomo, with a {SAKURA_MONTH?.dailyCapGb} GB daily
                  cap rather than one pooled allowance. Plan lengths and the Voice + Data product
                  read off sakuramobile.jp on {SAKURA_OFFICIAL_CHECKED}.
                </p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>Students who need a Japanese number for admin, a bank or a part-time job</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.proIcon}>+</span>Voice + Data eSIM adds a Japanese number</li>
                      <li><span className={styles.proIcon}>+</span>English customer support</li>
                      <li><span className={styles.proIcon}>+</span>Sold in lengths up to 90–93 days</li>
                    </ul>
                  </div>
                  <div className={styles.pickCons}>
                    <p className={styles.pickListLabel}>Cons</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.conIcon}>−</span>Dearest per GB of the four</li>
                      <li><span className={styles.conIcon}>−</span>Daily cap rather than one pooled allowance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Holafly */}
            <div className={styles.pickCard}>
              <div className={styles.pickCardHeader}>
                <div className={styles.pickRank}>
                  <span className={styles.pickNumber}>4</span>
                  <div className={styles.pickMeta}>
                    <span className={`${styles.pickBadge} ${styles.pickBadgeBlue}`}>Unlimited Data</span>
                    <span className={styles.pickName}>Holafly</span>
                  </div>
                </div>
              </div>
              <div className={styles.pickCardBody}>
                <p className={styles.pickSummary}>
                  Only worth it with no campus WiFi to fall back on. An unlimited month is{" "}
                  {priceLabel(HOLAFLY_MONTH)} — roughly three times a {dataLabel(ESIMGO_MONTH)}{" "}
                  plan — which adds up only if you are attending lectures over mobile data. Note
                  too that its hotspot is capped at 1 GB of shareable data a day, which is exactly
                  what a student tethering a laptop needs most.
                </p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>Online classes over mobile data, with no usable campus or dorm WiFi</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.proIcon}>+</span>Nothing to monitor or top up</li>
                      <li><span className={styles.proIcon}>+</span>Fine for a month of video lectures</li>
                    </ul>
                  </div>
                  <div className={styles.pickCons}>
                    <p className={styles.pickListLabel}>Cons</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.conIcon}>−</span>~3× the cost of a {dataLabel(ESIMGO_MONTH)} plan</li>
                      <li><span className={styles.conIcon}>−</span>Hotspot capped at 1 GB/day</li>
                      <li><span className={styles.conIcon}>−</span>No Japanese phone number</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data usage table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Does a Student Need per Month?</h2>
          <p className={styles.bodyText}>
            A planning estimate rather than a measurement: these are the per-day figures we use to
            size a plan, assuming campus WiFi carries the lectures and downloads and the eSIM
            carries everything off campus.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Activity", "Estimated data per day"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataUsage.map((row) => (
                    <tr key={row.activity}>
                      <td className={styles.tdProvider}>{row.activity}</td>
                      <td style={{ fontWeight: 700, color: "var(--accent)" }}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            With campus WiFi doing the heavy lifting, <strong>10–15 GB a month</strong> is usually
            enough, which is why {dataLabel(ESIMGO_MONTH)} at {priceLabel(ESIMGO_MONTH)} is the
            tier to buy — it leaves room for a travel weekend. Streaming everything over mobile
            data pushes past 30 GB, where an unlimited month becomes the cheaper answer.
          </p>
        </section>

        {/* Phone number section — the long-stay Sakura route */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Phone number</span>
          <h2 className={styles.sectionTitle}>Do You Need a Japanese Phone Number?</h2>
          <p className={styles.bodyText}>
            For a one-term exchange, usually not. For anything involving a form, usually yes: most
            bank accounts, any domestic phone contract and a lot of part-time job applications ask
            for a Japanese number, and a foreign one will not be accepted.
          </p>
          <p className={styles.bodyText}>
            No travel eSIM on this page provides one. {esimSpec("esimgo").phoneNumber}{" "}
            {esimSpec("holafly").phoneNumber}. Sakura Mobile is the exception — its separate
            Voice + Data eSIM adds a Japanese number and domestic calls — and for a stay in months
            rather than weeks, its own pages sell the travel eSIM for 1 to 90 days and the SIM card
            in lengths up to 93 days, so one purchase covers a term instead of three renewals
            (read off sakuramobile.jp on {SAKURA_OFFICIAL_CHECKED}).
          </p>
          <a
            href={esimLink("sakura")}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            See Sakura Mobile&apos;s long-stay plans →
          </a>
          <p className={styles.bodyText} style={{ marginTop: "0.9rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Plan lengths, networks, the daily cap and the Voice + Data product are broken down in
            our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>
            , with the yen prices its own comparison post prints.
          </p>
        </section>

        {/* Stay length options */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>By stay length</span>
          <h2 className={styles.sectionTitle}>Which Plan Fits a Month, a Term or a Year?</h2>
          <div className={styles.whoForGrid}>
            {stayOptions.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The part an AI answer can't do for you — and the CTA */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Before you buy</span>
          <h2 className={styles.sectionTitle}>Will It Work on Your Phone, and When Should You Buy?</h2>
          <p className={styles.bodyText}>
            Three checks, in this order. They take about two minutes and no answer engine can run
            them for you, because two of the three depend on the handset in your hand.
          </p>
          <div className={styles.stepsList}>
            {[
              {
                title: "Does the handset have eSIM hardware?",
                desc: "On an iPhone, Settings → General → About and scroll to EID; if an EID row is listed, the hardware is there. On Android the same EID appears under About phone. That covers iPhone XS and later, Pixel 3 and later and Galaxy S20 and later — but iPhones bought in mainland China shipped without eSIM, whatever the model.",
              },
              {
                title: "Is it carrier-locked?",
                desc: "A handset bought on contract may refuse a third-party eSIM profile even though the hardware supports one. Ask your home carrier to unlock it before you fly rather than after you land — our setup guide puts that at 24–48 hours with most carriers.",
              },
              {
                title: "When do the days start counting?",
                desc: `Install the profile at home, leave it switched off, turn it on when you land. The exception is Sakura Mobile's 3 GB/day plan: its own guide says it can only be installed on the day you want it to start and the days run from install, while its unlimited plan installs at home and starts counting on arrival (read ${SAKURA_OFFICIAL_CHECKED}).`,
              },
            ].map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.2rem" }}>
            Checks passed? Then the purchase is the cheap study month, or Airalo if you want
            top-up, or Sakura Mobile if you need the number. Full walkthroughs:{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the compatibility checks
            </Link>{" "}
            and{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the install steps per phone
            </Link>
            .
          </p>
          <div className={styles.pickCtaRow}>
            <a href={esimLink("esimgo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get eSIM Go — {priceLabel(ESIMGO_MONTH)} / {dataLabel(ESIMGO_MONTH)} →
            </a>
            <a href={esimLink("airalo")} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo — top-up from the app →
            </a>
            <a href={esimLink("airalo")} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              {HOLAFLY_ALT_LABEL}
            </a>
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.6rem", lineHeight: 1.6 }}>
            {HOLAFLY_ALT_NOTE}
          </p>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>How Do You Keep a Study Month Cheap?</h2>
          <div className={styles.stepsList}>
            {studentTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/esim/japan-sim-card-for-students" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-5 9 5-9 5-9-5z" />
                  <path d="M7 11v5c0 1 2 2 5 2s5-1 5-2v-5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card for Students: Plans &amp; Residence Card</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-phone-number-for-foreigners" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 3 5a1 1 0 0 1 1-1z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Phone Number for Foreigners: 070/080/090 Plans</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <EsimRelatedCard href="/guides/esim/best-esim-japan">
              Best eSIM for Japan 2026: Top 4 Picks Compared
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/sakura-mobile-review">
              Sakura Mobile Review 2026: eSIM &amp; SIM Card Plans and Prices
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-sim-card-vs-esim-2026">
              Japan SIM Card vs eSIM (2026): Which Should You Choose?
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-android">
              Best eSIM for Japan on Android (2026): Picks and Setup
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-business">
              Best eSIM for Japan for Business Travel (2026)
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-family-group">
              Japan eSIM for Family &amp; Group Travel (2026): Cost Per Head
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/esim-go-japan-review">
              eSIM Go Japan Review 2026: Prices, Networks and Tethering
            </EsimRelatedCard>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how eSIM Go, Airalo, Sakura Mobile and Holafly compare on price, data and
              coverage in our full Japan eSIM comparison.
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
