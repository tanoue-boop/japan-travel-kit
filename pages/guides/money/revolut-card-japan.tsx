import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// NOTE: Revolut affiliate programme not yet approved — plain link for now.
// TODO: replace with approved affiliate link once accepted.
const REVOLUT_URL = "https://www.revolut.com/";

const planRows = [
  { plan: "Standard", fx: "Free to weekday limit (¥300k/mo JP*), then 0.5%", weekend: "+1% markup", atm: "Free to ~¥25,000/mo (JP*), then 2%" },
  { plan: "Premium",  fx: "Higher limit — confirm",             weekend: "No markup",   atm: "Higher limit — confirm" },
  { plan: "Metal",    fx: "Higher limit — confirm",             weekend: "No markup",   atm: "Higher limit — confirm" },
];

const howToSteps = [
  {
    title: "Order the card and set up the app",
    desc: "Revolut is app-first. Sign up, order the physical card (or use a virtual card for online and contactless), and top up your balance before you travel so you're ready on arrival.",
  },
  {
    title: "Spend on weekdays to avoid the markup",
    desc: "On the Standard plan, currency conversion is free up to a weekday monthly limit (around ¥300,000 on a Japan-registered account; the cap depends on your account's country). Conversion at the weekend (roughly Friday afternoon to Sunday evening, US Eastern time) carries a 1% markup. Where you can, time larger conversions for weekdays — or upgrade to a plan with no weekend fee.",
  },
  {
    title: "Always choose to pay in yen (JPY)",
    desc: "At terminals and ATMs you may be offered your home currency — this is Dynamic Currency Conversion (DCC) and the merchant sets the rate, typically 3–5% worse. Decline it and pay in JPY so Revolut handles the conversion.",
  },
  {
    title: "Use 7-Eleven (Seven Bank) ATMs for cash",
    desc: "Seven Bank ATMs inside 7-Eleven stores are the most reliable for foreign cards, run 24/7, and have an English menu. Keep withdrawals within your plan's free ATM allowance (around ¥25,000/month on a Japan-registered Standard account; it depends on your account's country) to avoid the 2% fee, and note the Japanese ATM operator may add its own charge.",
  },
];

const pros = [
  "Free weekday currency conversion up to a monthly limit (¥300,000 on a Japan-registered Standard account)",
  "Feature-rich app: instant notifications, budgets, card freeze",
  "Premium and Metal plans remove the weekend markup and raise limits",
  "Works at 7-Eleven, Japan Post, and AEON ATMs",
  "Better value than a typical ~3% home-bank card",
];

const cons = [
  "Standard plan adds a 1% markup on weekend conversions",
  "Free ATM allowance (≈¥25,000/mo on a Japan account) is lower than Wise's, then 2%",
  "Third-party ATM operator fees apply on top",
  "Best limits require a paid Premium or Metal plan",
];

const faqItems = [
  {
    q: "Does Revolut work in Japan?",
    a: "Yes. Revolut's card works at Japanese ATMs and at terminals accepting Visa or Mastercard. The most reliable ATMs for foreign cards are Seven Bank (inside 7-Eleven), Japan Post, and AEON. Because Japan is still partly cash-based, use Revolut for hotels, chain stores, and convenience stores, and keep some cash for smaller venues.",
  },
  {
    q: "What are Revolut's fees in Japan?",
    a: "These depend on your account's registration country and plan. On a Japan-registered Standard account, weekday currency conversion is free up to around ¥300,000 per month, then 0.5%, and weekend conversions carry a 1% markup; ATM withdrawals are free up to about ¥25,000 per month, then 2% (minimum around €1/£1). Accounts registered elsewhere differ — for example, UK/Eurozone Standard ATM allowances are roughly £200/€200 per month or about five withdrawals. The Japanese ATM operator may also add its own fee. Premium and Metal plans raise the limits and remove the weekend markup. Confirm current figures on the official Revolut site.",
  },
  {
    q: "Is the Revolut weekend fee a problem for Japan trips?",
    a: "It depends on your spending pattern. On the Standard plan, conversions made over the weekend (roughly Friday afternoon to Sunday evening, US Eastern time) cost 1% more. For a trip with heavy weekend shopping or dining, that adds up — in which case Wise (no weekend markup) or a Revolut Premium/Metal plan may suit you better. For weekday-heavy spending under the fee-free limit, it's rarely an issue.",
  },
  {
    q: "Is Revolut Premium or Metal worth it for Japan?",
    a: "For a single short trip, the free Standard plan is usually enough. A paid Premium or Metal plan can pay off if you'll spend heavily, withdraw a lot of cash, or want to avoid the weekend markup entirely, since they raise the free FX and ATM limits and add travel perks. Weigh the monthly fee against how much you expect to convert and withdraw, and confirm the current plan terms on Revolut's site.",
  },
  {
    q: "Revolut or Wise for Japan?",
    a: "Both are strong. Wise uses the mid-market rate every day, including weekends, with a slightly higher free ATM allowance — simpler for most travellers. Revolut can be better for weekday-heavy spending under its ¥300,000 fee-free limit, or for those who want its app features or a paid plan. Many travellers carry both as backups. See our dedicated Wise vs Revolut comparison for the full breakdown.",
  },
];

export default function RevolutCardJapanPage() {
  return (
    <>
      <Head>
        <title>Revolut in Japan 2026: Fees, ATMs &amp; Is It Worth It? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Does Revolut work in Japan? We cover plans, weekday and weekend FX fees, ATM limits, how to avoid DCC, and whether Revolut is worth it for your 2026 trip."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/revolut-card-japan" />
        <meta property="og:title" content="Revolut in Japan (2026): Fees, ATMs & Is It Worth It?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/revolut-card-japan" />
        <meta property="og:description" content="Does Revolut work in Japan? We cover plans, weekday and weekend FX fees, ATM limits, how to avoid DCC, and whether Revolut is worth it for your 2026 trip." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Revolut in Japan (2026): Fees, ATMs & Is It Worth It?" />
        <meta name="twitter:description" content="Does Revolut work in Japan? We cover plans, weekday and weekend FX fees, ATM limits, how to avoid DCC, and whether Revolut is worth it for your 2026 trip." />
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
                { "@type": "ListItem", position: 4, name: "Revolut in Japan", item: "https://www.japan-travel-kit.com/guides/money/revolut-card-japan" },
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
              headline: "Revolut in Japan (2026): Fees, ATMs & Is It Worth It?",
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
          <span className={styles.breadCurrent}>Revolut in Japan</span>
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
            Revolut in Japan (2026):<br />Fees, ATMs &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            A feature-packed travel card that&apos;s great value on weekdays — with one catch to watch at the weekend.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Plans Compared", "Weekend Fee Explained"].map((t) => (
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
            <strong>Not financial advice.</strong> This guide is general information only. Fees, limits, and plans are
            current as of 2026, can change, and depend on the country where your Revolut account is registered — always confirm the latest on the official{" "}
            <a href={REVOLUT_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "#92400e", fontWeight: 600 }}>Revolut fees page</a>{" "}
            before you rely on them.
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
                <p className={styles.verdictStatLabel}>Works in Japan?</p>
                <p className={styles.verdictStatValue}>Yes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Weekday free FX</p>
                <p className={styles.verdictStatValue}>Up to ¥300k/mo (JP)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free ATM allowance</p>
                <p className={styles.verdictStatValue}>~¥25,000/mo (JP)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Revolut is excellent value for <strong>weekday spending</strong> under its
              ¥300,000 fee-free limit, with a strong app. The catch on the Standard plan is a <strong>1% weekend
              markup</strong> — avoid it by spending on weekdays or upgrading to a paid plan.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Weighing it against Wise? See our{" "}
              <Link href="/guides/money/wise-vs-revolut-japan" style={{ fontWeight: 600 }}>Wise vs Revolut for Japan</Link>{" "}
              comparison.
            </p>
          </div>
        </div>

        {/* What is Revolut */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Revolut?</h2>
          <p className={styles.bodyText}>
            Revolut is an app-based financial account with a linked debit card, offered across free and paid plan
            tiers (Standard, Premium, and Metal). It converts currency at competitive rates and leans heavily on its
            app, with instant spend notifications, budgeting tools, analytics, and one-tap card freezing.
          </p>
          <p className={styles.bodyText}>
            For travellers, the appeal is fee-free currency conversion within monthly limits, plus the convenience of
            managing everything from your phone. The trade-offs are a weekend conversion markup on the Standard plan
            and a lower free ATM allowance than some rivals — both detailed below.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Plans</span>
          <h2 className={styles.sectionTitle}>Revolut Plans for Japan (2026)</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Currency conversion", "Weekend", "ATM (per month)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.fx}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.weekend}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.atm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            *Free ATM and FX allowances depend on the country where your Revolut account is registered and your plan — not your destination. The yen figures are for a Japan-registered account; UK/Eurozone Standard accounts are roughly £200/€200 per month (or about five ATM withdrawals), with 2% (minimum around €1/£1) above the ATM allowance. Premium and Metal raise the limits and remove the weekend markup, for a monthly fee. These are a 2026 guide — confirm current terms in your app or on the official Revolut site. The Japanese ATM operator may add its own fee on top of Revolut&apos;s.
          </p>
        </section>

        {/* How to use */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>How to use it</span>
          <h2 className={styles.sectionTitle}>How to Use Revolut in Japan</h2>
          <div className={styles.stepsList}>
            {howToSteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <a href={REVOLUT_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ marginTop: "1.5rem", display: "inline-block" }}>
            Visit Revolut →
          </a>
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Revolut Pros &amp; Cons for Japan</h2>
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

        {/* Cash reminder */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Don&apos;t forget cash</span>
          <h2 className={styles.sectionTitle}>You&apos;ll Still Need Some Cash</h2>
          <p className={styles.bodyText}>
            Revolut handles hotels, chain stores, and convenience stores well, but Japan is still partly cash-based —
            small restaurants, izakayas, temples, shrines, and market stalls are often cash only. Withdraw
            ¥20,000–¥30,000 from a 7-Eleven ATM on arrival and keep it topped up as a reserve.
          </p>
          <p className={styles.bodyText}>
            For more on getting the best yen rate, see our{" "}
            <Link href="/guides/money/currency-exchange-japan" style={{ color: "var(--red)", fontWeight: 600 }}>currency exchange guide</Link>,
            and for which machines accept foreign cards, our{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--red)", fontWeight: 600 }}>ATMs in Japan guide</Link>.
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
            <Link href="/guides/money/wise-vs-revolut-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise vs Revolut for Japan (2026): Which Travel Card Wins?</p>
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
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="7" x2="16" y2="7" />
                  <line x1="8" y1="11" x2="16" y2="11" />
                  <line x1="8" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Where to Find Them &amp; How to Use Them</p>
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
            <h2 className={styles.ctaBannerTitle}>Set up Revolut before you fly</h2>
            <p className={styles.ctaBannerDesc}>
              Order the card and top up in the app so you land in Japan ready to spend — and remember to time bigger
              conversions for weekdays on the Standard plan.
            </p>
            <a href={REVOLUT_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Visit Revolut →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
