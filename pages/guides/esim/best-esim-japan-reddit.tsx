import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  getProvider,
  priceFrom,
  priceFromLabel,
  pricesCheckedLabel,
  unlimitedFromLabel,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";

// Every price quoted on this page is read from data/esim-prices.json (refreshed daily),
// so the figures the threads argue over are always checked against today's catalogue.
const link = (id: EsimProviderId) => getProvider(id).affiliateUrl;
const pricesCheckedAt = pricesCheckedLabel();

// Holafly runs no affiliate programme we can join (impact: Airalo only — checked 9 Oct 2026),
// so its purchase CTA points at Airalo's unlimited plans, the closest approved alternative.
const HOLAFLY_ALT_LABEL = "Get Airalo unlimited eSIM →";
const HOLAFLY_ALT_NOTE = "Holafly is not available through our links — Airalo is our recommended alternative.";

const comparisonRows = [
  { provider: "Airalo", price: `From ${priceFrom("airalo")}`, data: "1–20 GB, plus unlimited", network: getProvider("airalo").network, verdict: "The default reply — and it holds up" },
  { provider: "Holafly", price: `From ${priceFrom("holafly")}`, data: "Unlimited only", network: getProvider("holafly").network, verdict: "No longer the cheapest unlimited" },
  { provider: "eSIM Go", price: `From ${priceFrom("esimgo")}`, data: "1–100 GB, plus unlimited", network: getProvider("esimgo").network, verdict: "Still the budget winner" },
  { provider: "Sakura Mobile", price: `From ${priceFrom("sakura")}`, data: "9–90 GB, plus unlimited", network: getProvider("sakura").network, verdict: "Right for long stays, as advised" },
];

// The four claims that recur most in Japan eSIM threads, each checked against current pricing.
const redditQAs = [
  {
    q: '"Just buy Airalo before you go" — still the right default?',
    a: `Yes, with one correction. Airalo is reliable on SoftBank/KDDI and installs from its own iOS app, which is why it gets recommended so often. But the threads usually present it as the cheap option too, and that has not been true for a while: Airalo starts at ${priceFrom("airalo")} while eSIM Go starts at ${priceFrom("esimgo")}. Pick Airalo for the app and the support, not for the price.`,
  },
  {
    q: '"Holafly is the one to get for unlimited" — does the price still justify it?',
    a: `Less often than the threads suggest. Holafly's cheapest unlimited plan is ${unlimitedFromLabel("holafly")} against ${unlimitedFromLabel("airalo")} from Airalo and ${unlimitedFromLabel("esimgo")} from eSIM Go. The recommendation dates from a period when Holafly was one of very few unlimited sellers. The hotspot cap of 1 GB/day is also rarely mentioned in those comments and matters if you tether.`,
  },
  {
    q: '"Unlimited means unlimited" — what does the fine print actually say?',
    a: "No hard cap, but no provider sells genuinely unmetered full-speed data. Holafly caps hotspot use at 1 GB/day. eSIM Go's unlimited tier is \"Unlimited Essential\" and drops speed after a daily high-speed allowance. Airalo applies a fair-use policy. Sakura Mobile is unlimited on-device but limits hotspot by plan length. If a thread tells you one of these is uncapped, it is the fine print that is out of date, not the price.",
  },
  {
    q: '"Get Docomo for the countryside" — does the network choice matter?',
    a: "It matters less than it used to, but the advice is sound in direction. Docomo still has the broadest rural reach, and eSIM Go and Sakura Mobile both ride it. Airalo and Holafly run on SoftBank/KDDI, which is excellent in cities and along the main tourist corridors. In genuinely remote mountains or on small islands, coverage thins out whoever you buy from.",
  },
];

const faqItems = [
  {
    q: "What eSIM do most travellers use for Japan?",
    a: "Airalo is the name that comes up most often in r/JapanTravel, r/eSIM and r/travel threads, cited for reliability and app-based setup. The 'competitive pricing' part of that reputation no longer holds, though — eSIM Go is cheaper at entry level on current pricing.",
  },
  {
    q: "Is Airalo recommended on Reddit for Japan?",
    a: "Yes — Airalo is frequently recommended on r/JapanTravel as a reliable and affordable option. Most users report solid Docomo/SoftBank coverage and smooth setup. The main criticism is that it's data-only, with no voice calls or SMS.",
  },
  {
    q: "What do Reddit users say about Holafly Japan?",
    a: `Holafly gets positive reviews for its unlimited data plan, which appeals to heavy users who don't want to track usage, and sentiment on its Japan coverage is generally good. Two things those comments tend to miss: the 1 GB/day hotspot cap, and the fact that it is now the most expensive unlimited option of the four at ${unlimitedFromLabel("holafly")}.`,
  },
  {
    q: "Is eSIM Go popular on Reddit?",
    a: `eSIM Go is gaining traction as the budget alternative to Airalo. It's frequently recommended for short trips where basic, reliable Docomo coverage is needed without spending much. Its low entry price (${priceFrom("esimgo")}) is the main attraction, and it is the one budget claim in these threads that current pricing still backs up.`,
  },
  {
    q: "What's the consensus on Japan eSIMs on Reddit?",
    a: "The standing advice is: (1) buy before you fly — don't rely on airport SIMs; (2) Airalo for most travellers; (3) Holafly if you want unlimited data; (4) eSIM Go if budget is the priority; (5) Sakura Mobile for voice calls or longer stays. Points 1, 2, 4 and 5 still check out against current pricing. Point 3 does not — Airalo and eSIM Go both sell unlimited Japan data for less than Holafly today.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/best-esim-japan-reddit") } });

export default function BestEsimJapanRedditPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Best eSIM for Japan Reddit 2026: Which Advice Still Holds | Japan Travel Kit</title>
        <meta
          name="description"
          content="r/JapanTravel recommends the same four Japan eSIMs every time. We check each claim against this month's prices — three hold up, one is badly out of date."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/best-esim-japan-reddit" />
        <meta property="og:title" content="Best eSIM for Japan Reddit 2026: Which Advice Still Holds" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/best-esim-japan-reddit" />
        <meta property="og:description" content="r/JapanTravel recommends the same four Japan eSIMs every time. We check each claim against this month's prices — three hold up, one is badly out of date." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best eSIM for Japan Reddit 2026: Which Advice Still Holds" />
        <meta name="twitter:description" content="r/JapanTravel recommends the same four Japan eSIMs every time. We check each claim against this month's prices — three hold up, one is badly out of date." />
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
              headline: "Best eSIM for Japan: Reddit's Advice, Fact-Checked (2026)",
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
          <span className={styles.breadCurrent}>Best eSIM Japan Reddit</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best eSIM for Japan:<br />Reddit&apos;s Advice, Fact-Checked (2026)
          </h1>
          <p className={styles.heroSubtitle}>
            The same four recommendations come up in every r/JapanTravel eSIM thread.
            We checked each one against this month&apos;s actual prices and plan terms.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Claims checked against live prices", "Where the threads are out of date"].map((t) => (
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
            This doesn&apos;t influence which services we cover or how we summarise Reddit opinion.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Which thread advice still holds</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              Three of Reddit&apos;s four standing recommendations survive a price check;
              one does not. <strong>Airalo</strong> is still the safe default, but not because
              it is cheap — <strong>eSIM Go</strong> undercuts it, as the budget threads say.
              The claim that has aged worst is <strong>&ldquo;get Holafly for
              unlimited&rdquo;</strong>: it is now the most expensive of the four unlimited
              options, not the obvious one. Prices checked {pricesCheckedAt}.
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
            <a
              href={link("airalo")}
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* How to read the threads */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Why the threads drift</span>
          <h2 className={styles.sectionTitle}>Reddit Is Right About Providers, Wrong About Prices</h2>
          <p className={styles.bodyText}>
            Japan eSIM threads on <strong>r/JapanTravel</strong>, <strong>r/eSIM</strong> and{" "}
            <strong>r/travel</strong> have an unusual property: the shortlist of providers has
            been stable for years, while the numbers attached to them have not. A comment
            recommending a provider &ldquo;from about $4&rdquo; keeps collecting upvotes long
            after that tier was repriced, and nobody goes back to edit it. The result is advice
            that is directionally sound and numerically stale.
          </p>
          <p className={styles.bodyText}>
            So this page does not re-rank the providers — our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "#1d4ed8", fontWeight: 600 }}>
              full Japan eSIM comparison
            </Link>{" "}
            already does that. It takes the four claims you will actually meet in those threads
            and checks each against the current catalogue, which we re-read daily. Where a
            recommendation still stands, we say so; where it has drifted, we show the gap.
          </p>
        </section>

        {/* Airalo section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Most recommended</span>
          <h2 className={styles.sectionTitle}>Most Recommended: Airalo</h2>
          <p className={styles.bodyText}>
            On r/JapanTravel, Airalo is the single most recommended eSIM for Japan. Threads asking
            &ldquo;which eSIM should I use?&rdquo; regularly attract top-voted comments recommending Airalo
            specifically for its reliable Docomo and SoftBank network access, competitive pricing,
            and the ease of its app-based setup.
          </p>
          <p className={styles.bodyText}>
            Common Reddit praise: &ldquo;Just buy Airalo before you go&rdquo; has become almost the default reply
            on r/JapanTravel. Users cite the hassle-free setup (QR code scan before departure,
            activate on landing) as the key advantage over airport SIMs. That part is accurate —
            and Airalo&apos;s entry tier is {priceFromLabel("airalo")}, which keeps it accessible
            even if it is no longer the cheapest on the list.
          </p>
          <p className={styles.bodyText}>
            Reddit criticisms: The most frequent complaint is that Airalo is data-only — no voice
            calls and no Japanese phone number. Users who need a local number are usually pointed
            toward Sakura Mobile instead. A small number of users report slower customer support response times,
            though most say the service worked without needing support.
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
            Holafly is Reddit&apos;s go-to recommendation for travellers who want unlimited data
            without tracking usage. On r/JapanTravel and r/eSIM, it&apos;s frequently recommended
            for people who plan to navigate constantly, stream video, or use hotspots throughout
            the day.
          </p>
          <p className={styles.bodyText}>
            The appeal is simple: a flat price for unlimited data removes the anxiety of watching
            your GB count during a busy travel day. For a two-week trip with heavy navigation use,
            Reddit users often suggest Holafly as the most stress-free option.
          </p>
          <p className={styles.bodyText}>
            Where the advice has drifted: Holafly is no longer the cheapest way to buy unlimited
            Japan data, and on current pricing it is the dearest of the four. Its entry unlimited
            plan is {unlimitedFromLabel("holafly")}, against {unlimitedFromLabel("esimgo")} from
            eSIM Go and {unlimitedFromLabel("airalo")} from Airalo. The threads also rarely mention
            the 1 GB/day hotspot cap, which is the detail that matters if you planned to tether a
            laptop or share with travel companions. SoftBank — Holafly&apos;s network here — is
            also slightly thinner than Docomo outside the cities.
          </p>
          <a
            href={link("airalo")}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
          >
            {HOLAFLY_ALT_LABEL}
          </a>
          <p style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.6rem", lineHeight: 1.6 }}>
            {HOLAFLY_ALT_NOTE} Our full{" "}
            <Link href="/guides/esim/holafly-japan-review" style={{ color: "#1d4ed8", fontWeight: 600 }}>
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
            eSIM Go (sold to consumers as Breeze) has gained visibility on Reddit over the past
            year, particularly among budget travellers and those on short trips. Its entry tier is{" "}
            {priceFromLabel("esimgo")} — still the cheapest among the established providers, which
            is the one budget claim the threads get exactly right.
          </p>
          <p className={styles.bodyText}>
            Reddit sentiment: Users praise eSIM Go for using Docomo — Japan&apos;s most extensive
            network — at a lower price than Airalo. Setup is straightforward, and the service
            works reliably in cities and popular tourist areas. For a 1–2 week trip where you
            just need maps and messaging, several threads recommend eSIM Go as the clear budget winner.
          </p>
          <p className={styles.bodyText}>
            Reddit criticisms: Fewer reviews than Airalo mean less data on edge cases. Some users
            note that customer support response can be slower. For longer trips or heavier data
            needs, the consensus shifts back toward Airalo or Holafly.
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

        {/* Common Reddit Q&A */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Claim check</span>
          <h2 className={styles.sectionTitle}>The Four Recurring Claims, Checked</h2>
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
            Reddit&apos;s collective wisdom on Japan eSIMs is clear and consistent: <strong>Airalo is
            the default recommendation</strong> for most travellers. It&apos;s affordable, reliable, and
            easy to set up — which is exactly what most travellers need.
          </p>
          <p className={styles.verdictText}>
            The nuance is in the edge cases, and in one correction. Travellers on tight budgets or
            short trips will find eSIM Go hard to beat at {priceFrom("esimgo")}. Those staying
            longer than a month or needing a Japanese phone number should look at Sakura Mobile.
            But if a thread tells you Holafly is the obvious unlimited pick, check the price before
            you act on it — Airalo and eSIM Go both sell unlimited for less today.
          </p>
          <p className={styles.verdictText}>
            The one thing Reddit unanimously agrees on: <strong>buy before you fly</strong>.
            Airport SIMs cost more, require queuing, and may be closed when you arrive.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>All Four Providers: Side by Side</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider", "Price from", "Data", "Network", "Reddit Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.data}</td>
                      <td className={styles.tdNetwork}>{row.network}</td>
                      <td>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Go with Reddit&apos;s top pick</h2>
            <p className={styles.ctaBannerDesc}>
              Airalo is the recommendation that survives the price check — easy setup,
              24/7 support, from {priceFromLabel("airalo")}.
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
