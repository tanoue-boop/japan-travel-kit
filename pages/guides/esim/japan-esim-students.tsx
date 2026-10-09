import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  cheapestAtLeastGb,
  formatUsd,
  getProvider,
  priceAtLeastLabel,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Prices and affiliate links come from data/esim-prices.json (refreshed daily).
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

// A semester-length month of data, priced per provider. 20 GB is the tier that matches the
// 10–15 GB/month campus-WiFi estimate below with headroom for a travel weekend.
const monthly20 = (id: EsimProviderId) => {
  const plan = cheapestAtLeastGb(id, 20);
  return plan ? `${formatUsd(plan.priceUsd)} (${plan.name})` : "—";
};

const dataUsage = [
  { activity: "Online classes (video streaming)", perDay: "~500 MB" },
  { activity: "Social media (Instagram, TikTok)", perDay: "~200 MB" },
  { activity: "Google Maps & navigation",         perDay: "~50 MB" },
  { activity: "Streaming (Netflix, YouTube)",     perDay: "~500 MB" },
  { activity: "Total (study + social)",           perDay: "~1–2 GB" },
];

const stayOptions = [
  {
    title: "Short exchange (1–4 weeks)",
    desc: `eSIM Go or Airalo are the best value for short exchange programmes and summer courses. eSIM Go's 10 GB / 30-day plan is ${priceAtLeastLabel("esimgo", 10)}; Airalo's equivalent is ${priceAtLeastLabel("airalo", 10)} and adds in-app top-up, which matters if you guess your allowance wrong.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    title: "Mid-term study (1–3 months)",
    desc: "Sakura Mobile's monthly SIM plans are designed for multi-month stays. You get a Japanese phone number, English customer support, and the option to add voice calls — essential for university admin and part-time jobs.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Long-term study (6+ months)",
    desc: "After six months, registering as a resident and getting a Japanese SIM (MVNO like IIJmio, Mineo, or Rakuten Mobile) often becomes cheaper than any tourist eSIM. Prices from ¥1,000/month for a data-only plan.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const studentTips = [
  {
    title: "Maximise your university WiFi",
    desc: "Japanese universities typically have fast, reliable WiFi on campus — including in dormitories at many institutions. Use WiFi for all data-heavy tasks (video lectures, downloads, streaming) and save your eSIM data for when you're out.",
  },
  {
    title: "Monitor your data usage",
    desc: "Check your data balance weekly via the provider's app. Airalo and eSIM Go both have apps that show real-time usage. Running out unexpectedly is easy to avoid if you check regularly.",
  },
  {
    title: "Airalo's top-up feature saves money",
    desc: "If you run out of data mid-plan, Airalo lets you top up from the app without scanning a new QR code. This makes it practical for a longer stay — buy a 10 GB base plan and top up as needed rather than over-estimating upfront.",
  },
  {
    title: "Consider a monthly plan for multi-month stays",
    desc: "Buying repeated short-term plans is more expensive than a monthly plan over time. Sakura Mobile's monthly plans renew automatically and include the option to add a voice number — useful for university administration.",
  },
];

const faqItems = [
  {
    q: "What is the cheapest eSIM for studying in Japan?",
    a: `eSIM Go is the cheapest starting point, with Japan plans from ${priceFromLabel("esimgo")}. For a study month, its 20 GB tier at ${monthly20("esimgo")} is the lowest price per GB of the four providers. Students staying beyond three months should compare that against a Japanese MVNO SIM, which usually undercuts every tourist eSIM once you can register as a resident.`,
  },
  {
    q: "Can I use eSIM for a 3-month student visa in Japan?",
    a: "Yes. There is no SIM restriction tied to visa type — you can use any eSIM regardless of whether you're on a tourist visa, student visa, or working holiday visa. However, for stays of 3 months or more, you may find Sakura Mobile's monthly SIM plans more cost-effective than repeatedly renewing tourist eSIM plans.",
  },
  {
    q: "Is 10 GB enough for a month in Japan as a student?",
    a: `It depends on whether you have campus WiFi. With eduroam or dorm WiFi for lectures and downloads, 10 GB a month is comfortable. Relying entirely on mobile data for online classes pushes you past it inside two weeks. The step up is 20 GB — ${monthly20("esimgo")} on eSIM Go or ${monthly20("airalo")} on Airalo — which is cheaper than any unlimited plan and usually enough.`,
  },
  {
    q: "Can I keep my home SIM and use a Japan eSIM?",
    a: "Yes, if your phone supports dual SIM (physical + eSIM). You keep your home SIM for calls and SMS from home, and use the Japan eSIM for local data. Most modern iPhones (XS and later) and many Android phones support this configuration. Check that your phone is unlocked before travelling.",
  },
  {
    q: "Do Japanese universities have good WiFi?",
    a: "Yes. Most Japanese universities have campus-wide WiFi, and many participate in eduroam — meaning students from participating institutions worldwide can connect automatically. Dormitory WiFi quality varies, but most major universities (Tokyo, Kyoto, Osaka, Waseda, Keio) provide reliable campus connectivity.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/japan-esim-students") } });

export default function JapanEsimStudentsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan Students 2026: Budget Picks | Japan Travel Kit</title>
        <meta
          name="description"
          content="The best budget eSIM for studying in Japan in 2026. We compare eSIM Go, Airalo, Sakura Mobile and Holafly for short exchanges and long-term study stays."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/japan-esim-students" />
        <meta property="og:title" content="Best eSIM for Japan Students 2026: Budget Picks" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/japan-esim-students" />
        <meta property="og:description" content="The best budget eSIM for studying in Japan in 2026. We compare eSIM Go, Airalo, Sakura Mobile and Holafly for short exchanges and long-term study stays." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best eSIM for Japan Students 2026: Budget Picks" />
        <meta name="twitter:description" content="The best budget eSIM for studying in Japan in 2026. We compare eSIM Go, Airalo, Sakura Mobile and Holafly for short exchanges and long-term study stays." />
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Best eSIM for Japan for Students (2026): Budget Picks",
              dateModified: updated.iso,
              author: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://www.japan-travel-kit.com",
              },
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
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📚</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan for Students (2026):<br />Budget Picks
          </h1>
          <p className={styles.heroSubtitle}>
            Priced per study month, not per tourist week — and the point at which
            a Japanese SIM becomes cheaper than any eSIM.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Priced per month", "Phone number options"].map((t) => (
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
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              There is no student discount on any Japan eSIM, so this comes down to two
              decisions a tourist never has to make. <strong>First, buy by the month, not the
              week</strong>: a 20 GB / 30-day plan is {monthly20("esimgo")} on eSIM Go, where
              four consecutive short-trip plans would cost far more for the same data.{" "}
              <strong>Second, decide whether you need a Japanese phone number</strong> — for
              university admin, a bank account or a part-time job you probably do, and{" "}
              <strong>Sakura Mobile</strong> is the only provider here that offers one.
              Past roughly three months, stop buying tourist eSIMs altogether and register for
              a domestic MVNO SIM. Prices checked {pricesCheckedAt}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest study month (20 GB)</p>
                <p className={styles.verdictStatValue}>eSIM Go — {monthly20("esimgo")}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Need a Japanese number</p>
                <p className={styles.verdictStatValue}>Sakura Mobile only</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Staying 6+ months</p>
                <p className={styles.verdictStatValue}>Domestic MVNO beats every eSIM</p>
              </div>
            </div>
          </div>
        </div>

        {/* What students need */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Student Picks Differ from Tourist Picks</h2>
          <p className={styles.bodyText}>
            Our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              main Japan eSIM comparison
            </Link>{" "}
            ranks on what matters for a one- or two-week trip: how fast you can get online, and
            how little a few gigabytes cost. Neither question is the deciding one when you are
            here for a term.
          </p>
          <p className={styles.bodyText}>
            Three things change the ranking. <strong>Plan validity</strong> — a 7-day plan is
            irrelevant, so the provider with the cheapest entry tier is not necessarily the
            cheapest per month. <strong>A Japanese phone number</strong> — not a feature tourists
            ever need, and the reason Sakura Mobile outranks cheaper options for many students.
            And <strong>the exit point</strong>: every tourist eSIM stops being the rational
            choice once you have a residence card and can sign up with a domestic MVNO.
          </p>
        </section>

        {/* Best eSIMs for Students */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>Best eSIMs for Students in Japan</h2>

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
                  The cheapest study month of the four. eSIM Go sells 30-day plans the whole way
                  up its range — {monthly20("esimgo")} for 20 GB, and tiers above that — so you
                  can buy a term&apos;s worth of data in one purchase instead of stacking
                  short-trip plans. It runs on {getProvider("esimgo").network}, which also gives
                  it the broadest reach if your campus is outside a major city.
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
                      <li><span className={styles.proIcon}>+</span>Docomo — widest coverage off campus</li>
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
                <a
                  href={link("esimgo")}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Get eSIM Go Japan →
                </a>
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
                  Slightly dearer than eSIM Go — {monthly20("airalo")} for 20 GB against{" "}
                  {monthly20("esimgo")} — and worth the difference for one student-specific reason:
                  in-app top-up. If you misjudge a month you add data from the app in seconds
                  rather than buying and installing a whole second profile mid-term. Plans run
                  from {priceFromLabel("airalo")} upwards on {getProvider("airalo").network}.
                </p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>Students who can&apos;t predict their monthly usage yet</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.proIcon}>+</span>In-app top-up — no new QR code needed</li>
                      <li><span className={styles.proIcon}>+</span>20 GB / 30 days at {monthly20("airalo")}</li>
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
                <a
                  href={link("airalo")}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Get Airalo Japan eSIM →
                </a>
              </div>
            </div>

            {/* Sakura Mobile */}
            <div className={styles.pickCard}>
              <div className={styles.pickCardHeader}>
                <div className={styles.pickRank}>
                  <span className={styles.pickNumber}>3</span>
                  <div className={styles.pickMeta}>
                    <span className={`${styles.pickBadge} ${styles.pickBadgeOrange}`}>Best Long-Term</span>
                    <span className={styles.pickName}>Sakura Mobile</span>
                  </div>
                </div>
              </div>
              <div className={styles.pickCardBody}>
                <p className={styles.pickSummary}>
                  Sakura Mobile is the only tourist-focused provider that offers genuine voice call plans —
                  giving you a real Japanese phone number. This is invaluable for students who need to
                  register for university services, open a bank account, or apply for part-time jobs.
                  Monthly SIM plans run on the Docomo network with English-speaking support staff.
                </p>
                <div className={styles.pickTarget}>
                  <span className={styles.pickTargetLabel}>Best for:</span>
                  <span>Students staying 1–3 months who need a Japanese phone number</span>
                </div>
                <div className={styles.pickGrid}>
                  <div className={styles.pickPros}>
                    <p className={styles.pickListLabel}>Pros</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.proIcon}>+</span>Japanese phone number included</li>
                      <li><span className={styles.proIcon}>+</span>English customer support</li>
                      <li><span className={styles.proIcon}>+</span>Monthly plans — no repeated renewals</li>
                      <li><span className={styles.proIcon}>+</span>Docomo network</li>
                    </ul>
                  </div>
                  <div className={styles.pickCons}>
                    <p className={styles.pickListLabel}>Cons</p>
                    <ul className={styles.pickList}>
                      <li><span className={styles.conIcon}>−</span>More expensive per GB than eSIM Go</li>
                      <li><span className={styles.conIcon}>−</span>Minimum 1-month commitment</li>
                    </ul>
                  </div>
                </div>
                <a
                  href={link("sakura")}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Get Sakura Mobile SIM →
                </a>
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
                  Only worth it if you have no campus WiFi to fall back on. An unlimited month is{" "}
                  {unlimitedFromLabel("holafly", 30)} on Holafly and {unlimitedFromLabel("airalo", 30)}{" "}
                  on Airalo — three to four times a 20 GB plan. That maths only works if you are
                  attending lectures over mobile data. Note too that Holafly caps hotspot use at
                  1 GB/day, which is the one thing a student tethering a laptop actually needs.
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
                      <li><span className={styles.conIcon}>−</span>3–4× the cost of a 20 GB plan</li>
                      <li><span className={styles.conIcon}>−</span>Hotspot capped at 1 GB/day</li>
                      <li><span className={styles.conIcon}>−</span>No Japanese phone number</li>
                    </ul>
                  </div>
                </div>
                <a
                  href={link("airalo")}
                  className={styles.pickCta}
                  target="_blank"
                  rel="sponsored noopener"
                >
                  {HOLAFLY_ALT_LABEL}
                </a>
                <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.6rem", lineHeight: 1.6 }}>
                  {HOLAFLY_ALT_NOTE}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data usage table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Data guide</span>
          <h2 className={styles.sectionTitle}>How Much Data Do Students Need?</h2>
          <p className={styles.bodyText}>
            Estimated daily data usage for a typical student lifestyle in Japan. These figures assume
            university WiFi is used on campus and eSIM data is used when off campus.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Activity", "Estimated Data Per Day"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataUsage.map((row) => (
                    <tr key={row.activity}>
                      <td className={styles.tdProvider}>{row.activity}</td>
                      <td style={{ fontWeight: 700, color: "#c62828" }}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Using campus WiFi for heavy tasks means <strong>10–15 GB per month</strong> is usually sufficient
            for most students. Streaming everything over mobile data can push usage to 30+ GB monthly.
          </p>
        </section>

        {/* Stay length options */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>By stay length</span>
          <h2 className={styles.sectionTitle}>Short Exchange vs Long-Term Study</h2>
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

        {/* University WiFi section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Campus connectivity</span>
          <h2 className={styles.sectionTitle}>Can I Use eSIM at Japanese Universities?</h2>
          <p className={styles.bodyText}>
            Japanese universities generally have good campus WiFi. Many of Japan&apos;s top universities — Tokyo,
            Kyoto, Osaka, Waseda, Keio, and others — participate in the <strong>eduroam</strong> network,
            which means students from participating home institutions can connect automatically with their
            home university credentials.
          </p>
          <p className={styles.bodyText}>
            The most cost-effective strategy for students is to <strong>use campus WiFi for data-heavy
            tasks</strong> (video lectures, large downloads, streaming) and switch to your eSIM when out
            exploring the city, commuting, or travelling during holidays. This approach keeps your monthly
            data needs low and makes a 10–15 GB plan sufficient for most months.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>Tips for Students Using eSIM in Japan</h2>
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
            <Link href="/guides/esim/japan-esim-data-plans" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM Data Plans Compared: Every Plan by Price per GB</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/sakura-mobile-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sakura Mobile Review 2026: Best SIM for Long Stays?</p>
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
              See how eSIM Go, Airalo, Sakura Mobile, and Holafly compare on price, data, and coverage
              in our full Japan eSIM comparison guide.
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
