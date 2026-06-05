import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// NOTE: Wise/Revolut affiliate programmes not yet approved — these are plain links.
// TODO: replace with approved affiliate links once accepted.
const WISE_URL = "https://wise.com/";
const REVOLUT_URL = "https://www.revolut.com/";

const compareRows = [
  { feature: "Monthly / annual fee",  wise: "None (one-off card issue fee)", revolut: "None on Standard plan" },
  { feature: "Exchange rate",         wise: "Mid-market, every day",         revolut: "Mid-market on weekdays" },
  { feature: "Conversion fee",        wise: "Under ~1%",                     revolut: "Free up to ¥300,000/mo, then 0.5%" },
  { feature: "Weekend FX",            wise: "Mid-market (no surcharge)",     revolut: "+1% markup (Fri–Sun, US ET)" },
  { feature: "Free ATM allowance",    wise: "¥30,000 / month",               revolut: "¥25,000 / month" },
  { feature: "Above ATM allowance",   wise: "Small fee",                     revolut: "2%" },
  { feature: "Higher limits",         wise: "—",                             revolut: "Premium / Metal plans" },
  { feature: "App features",          wise: "Simple multi-currency",         revolut: "Advanced budgeting & analytics" },
];

const chooseWise = [
  {
    title: "You want the mid-market rate every day",
    desc: "Wise gives you the mid-market rate seven days a week, including weekends. If you don't want to think about when you spend, Wise removes the weekend-markup question entirely.",
  },
  {
    title: "You'll spend over the weekend",
    desc: "Revolut's Standard plan adds a 1% markup on currency conversion at weekends. If your trip includes weekend shopping, dining, or ATM trips, Wise avoids that surcharge.",
  },
  {
    title: "You prefer simplicity over features",
    desc: "Wise is a straightforward multi-currency account and card. Hold yen, spend yen, done. There's no plan ladder to weigh up and no monthly fee.",
  },
];

const chooseRevolut = [
  {
    title: "You'll spend mainly on weekdays",
    desc: "On the Standard plan, Revolut converts currency free up to ¥300,000 per month on weekdays. For weekday-heavy spending under that cap, you'll pay no conversion fee at all.",
  },
  {
    title: "You want app features and budgeting",
    desc: "Revolut leans into its app: instant spend notifications, spending analytics, budgets, and easy card freezing. If you like managing money in-app, it's the richer experience.",
  },
  {
    title: "You'll pay for a higher tier",
    desc: "Premium and Metal plans remove the weekend markup and raise the free ATM and FX limits. For frequent travellers, a paid tier can tip the balance back toward Revolut.",
  },
];

const faqItems = [
  {
    q: "Which is better for Japan — Wise or Revolut?",
    a: "For most travellers, Wise is the simpler choice because it uses the mid-market exchange rate every day, including weekends, with no monthly fee. Revolut's Standard plan can be just as good — or better — if you spend mainly on weekdays and stay under its ¥300,000 monthly fee-free conversion limit, but it adds a 1% markup at weekends. Heavy travellers who buy a Premium or Metal plan get higher limits and no weekend fee. Both beat a typical home-bank card, which often charges around 3% on foreign spending.",
  },
  {
    q: "Does Revolut really charge more on weekends?",
    a: "On the Standard plan, yes. Revolut applies a 1% markup on currency conversion during the weekend (roughly Friday afternoon to Sunday evening, US Eastern time). Wise does not — it uses the mid-market rate all week. If your Japan trip involves significant weekend spending, that difference can add up. Premium and Metal plans remove the weekend markup. Confirm the current terms on Revolut's official site before relying on this.",
  },
  {
    q: "Which has better ATM limits in Japan?",
    a: "Wise's free ATM allowance is around ¥30,000 per month, slightly higher than Revolut Standard's ~¥25,000 per month. Above those limits, Wise charges a small fee and Revolut charges 2%. Separately, the Japanese ATM operator itself may add a fee (often around ¥220 per withdrawal) regardless of which card you use. Withdraw larger amounts less often to reduce the per-transaction impact.",
  },
  {
    q: "Can I use both Wise and Revolut in Japan?",
    a: "Yes, and many travellers carry both. Using two cards from different providers gives you a backup if one is declined or temporarily blocked, and lets you split spending to stay within each card's fee-free limits. Both work at 7-Eleven (Seven Bank) ATMs, which are the most reliable network for foreign cards in Japan.",
  },
  {
    q: "Do I still need cash if I have Wise or Revolut?",
    a: "Yes. Japan is still partly cash-based — many small restaurants, izakayas, temples, shrines, and market stalls accept cash only. Use your card for hotels, chain stores, and convenience stores, and keep ¥10,000–¥20,000 in cash for everywhere else. Withdraw yen from a 7-Eleven or Japan Post ATM on arrival.",
  },
];

export default function WiseVsRevolutJapanPage() {
  return (
    <>
      <Head>
        <title>Wise vs Revolut for Japan 2026: Which Travel Card Wins? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Wise or Revolut for Japan? We compare exchange rates, weekend fees, ATM limits, and plans so you know which travel card saves you more in 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/wise-vs-revolut-japan" />
        <meta property="og:title" content="Wise vs Revolut for Japan (2026): Which Travel Card Wins?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/wise-vs-revolut-japan" />
        <meta property="og:description" content="Wise or Revolut for Japan? We compare exchange rates, weekend fees, ATM limits, and plans so you know which travel card saves you more in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wise vs Revolut for Japan (2026): Which Travel Card Wins?" />
        <meta name="twitter:description" content="Wise or Revolut for Japan? We compare exchange rates, weekend fees, ATM limits, and plans so you know which travel card saves you more in 2026." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",            item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",          item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Wise vs Revolut", item: "https://www.japan-travel-kit.com/guides/money/wise-vs-revolut-japan" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Wise vs Revolut for Japan (2026): Which Travel Card Wins?",
              dateModified: "2026-06-03",
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
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Wise vs Revolut</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💳</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Wise vs Revolut for Japan (2026):<br />Which Travel Card Wins?
          </h1>
          <p className={styles.heroSubtitle}>
            Two of the best travel cards for Japan — but they win in different situations. Here&apos;s how to pick.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Fees & Rates Compared", "ATM Limits"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclaimer */}
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon}>ℹ️</span>
          <p className={styles.disclosureText}>
            <strong>Not financial advice.</strong> This guide is general information only. Fees, limits, and plans
            are current as of 2026 and can change — always confirm the latest on the official{" "}
            <a href={WISE_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>Wise</a>{" "}
            and{" "}
            <a href={REVOLUT_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>Revolut</a>{" "}
            fees pages before you rely on them.
          </p>
        </div>

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best every-day rate</p>
                <p className={styles.verdictStatValue}>Wise</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best weekday free FX</p>
                <p className={styles.verdictStatValue}>Revolut (¥300k/mo)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best for weekend spend</p>
                <p className={styles.verdictStatValue}>Wise</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> <strong>Wise</strong> wins for simplicity and weekend spending — the
              mid-market rate applies all week. <strong>Revolut</strong> wins for weekday-heavy trips under its
              ¥300,000 fee-free limit, and for travellers who want richer app features or a paid plan.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Comparing more than these two? See our{" "}
              <Link href="/guides/money/best-travel-card-japan" style={{ fontWeight: 600 }}>best travel card for Japan</Link>{" "}
              roundup, which also covers Charles Schwab, Starling, and Monzo.
            </p>
          </div>
        </div>

        {/* Head-to-head table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Wise vs Revolut at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Wise", "Revolut (Standard)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.wise}</td>
                      <td>{row.revolut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Figures are a 2026 guide and vary by plan and region — confirm current fees on each provider&apos;s official site. Revolut&apos;s Premium and Metal plans remove the weekend markup and raise the free limits.
          </p>
        </section>

        {/* Choose Wise */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Pick Wise if…</span>
          <h2 className={styles.sectionTitle}>When Wise Wins</h2>
          <div className={styles.stepsList}>
            {chooseWise.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={WISE_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Visit Wise →
          </a>
        </section>

        {/* Choose Revolut */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Pick Revolut if…</span>
          <h2 className={styles.sectionTitle}>When Revolut Wins</h2>
          <div className={styles.stepsList}>
            {chooseRevolut.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={REVOLUT_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Visit Revolut →
          </a>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>The Verdict</h2>
          <p className={styles.verdictText}>
            For a typical Japan trip, <strong>Wise</strong> is the easier recommendation: the mid-market rate every
            day of the week, no monthly fee, and a slightly higher free ATM allowance. You never have to think about
            what day it is before you tap your card.
          </p>
          <p className={styles.verdictText}>
            <strong>Revolut</strong> shines for weekday-heavy spenders who stay under its ¥300,000 fee-free limit, and
            for travellers who value its app or are happy to pay for a Premium or Metal plan. Carrying both is a smart
            move — you get a backup card and can spread spending across each provider&apos;s free limits.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/wise-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise Card in Japan (2026): Fees, ATMs &amp; How to Use It</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/revolut-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Revolut in Japan (2026): Fees, ATMs &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Top Picks for Foreign Visitors</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan (2026): Best Ways to Get Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Set up your card before you fly</h2>
            <p className={styles.ctaBannerDesc}>
              App-based cards can take several days to arrive by post. Order ahead so you land in Japan ready to spend
              at the mid-market rate.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={WISE_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Visit Wise →
              </a>
              <a href={REVOLUT_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Visit Revolut →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
