import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const dataUsageTable = [
  { activity: "Google Maps navigation",          perDay: "~50 MB",   weeklyTotal: "~350 MB" },
  { activity: "Messaging (WhatsApp / LINE)",     perDay: "~20 MB",   weeklyTotal: "~140 MB" },
  { activity: "Social media browsing",           perDay: "~150 MB",  weeklyTotal: "~1 GB"   },
  { activity: "Instagram / photo uploads",       perDay: "~300 MB",  weeklyTotal: "~2 GB"   },
  { activity: "Video calls (30 min/day)",        perDay: "~450 MB",  weeklyTotal: "~3 GB"   },
  { activity: "Streaming video (1 hr/day)",      perDay: "~1,200 MB", weeklyTotal: "~8 GB"  },
];

const topPicks = [
  {
    rank: 1,
    name: "Holafly",
    badge: "True Unlimited",
    badgeClass: "pickBadgeBlue" as const,
    summary: "Holafly is the only major provider offering genuinely unlimited data for Japan — no hard cap, no throttle after a fixed allowance. Runs on SoftBank. Plans start at around $27 for 5 days up to $89 for 30 days. The higher price is the trade-off for truly unlimited usage.",
    bestFor: "Heavy streamers, remote workers, and anyone unwilling to track their data usage",
    pros: ["No data cap at all", "No throttling after a limit", "Buy before you fly — instant QR delivery", "24/7 chat support"],
    cons: ["Most expensive option", "SoftBank only (slightly less rural coverage than Docomo)", "Data-only — no voice calls"],
    cta: "Get Holafly Japan eSIM →",
    href: "#",
  },
  {
    rank: 2,
    name: "Sakura Mobile",
    badge: "Unlimited + Voice",
    badgeClass: "pickBadgeOrange" as const,
    summary: "Sakura Mobile offers unlimited data plans on the Docomo network — Japan's most extensive coverage. Uniquely among unlimited options, their plans include voice calls and SMS, making them the best choice for travellers who need to make local calls. Monthly plans only.",
    bestFor: "Long-stay travellers and anyone who needs a Japanese phone number or to make calls",
    pros: ["Docomo network (best rural coverage)", "Includes voice calls + SMS", "English-speaking Japan-based support", "Unlimited data with no throttle policy stated"],
    cons: ["Monthly plans only (30 days minimum)", "More expensive than data-cap alternatives", "Activation takes 1–2 business days"],
    cta: "Get Sakura Mobile Unlimited →",
    href: "https://p.sakuramobile.jp/idevaffiliate.php?id=486",
  },
  {
    rank: 3,
    name: "Airalo (10 GB plan)",
    badge: "Best Value",
    badgeClass: "pickBadgeGreen" as const,
    summary: "If your data usage is high but not extreme, Airalo's 10 GB / 30 day plan at $18 is the smartest option. For most travellers — even those doing daily video calls and social media — 10 GB for a month is more than enough. A fraction of the Holafly price.",
    bestFor: "Travellers who think they need unlimited but actually use under 10 GB per month",
    pros: ["$18 for 10 GB / 30 days — outstanding value", "Docomo and SoftBank networks", "Instant activation", "Most travellers won't hit the cap"],
    cons: ["Hard cap at 10 GB (then data stops)", "No calls or SMS", "Not truly unlimited"],
    cta: "Get Airalo Japan eSIM →",
    href: "https://airalo.pxf.io/c/7213504/1268485/15608",
  },
];

const comparisonRows = [
  { feature: "Data allowance",   holafly: "Unlimited",     sakura: "Unlimited",      airalo: "10 GB / 30 days" },
  { feature: "Throttling",       holafly: "None stated",   sakura: "None stated",    airalo: "Data stops at cap" },
  { feature: "Network",         holafly: "SoftBank",      sakura: "Docomo",         airalo: "Docomo + SoftBank" },
  { feature: "Voice calls",      holafly: "✗",             sakura: "✓",              airalo: "✗" },
  { feature: "Min. duration",    holafly: "5 days",        sakura: "30 days",        airalo: "7 days" },
  { feature: "Price from",       holafly: "~$27 / 5 days", sakura: "~$40 / month",  airalo: "$4.50 / 7 days" },
  { feature: "English support",  holafly: "24/7 chat",     sakura: "Email (Japan)",  airalo: "Chat / app" },
];

const faqItems = [
  {
    q: "Is Holafly really unlimited in Japan?",
    a: "Holafly's Japan plan has no stated data cap — they do not throttle after a certain amount of usage. In practice, travellers using Holafly for streaming, video calls, and navigation consistently report no slowdowns. However, Holafly runs on SoftBank, not Docomo — SoftBank has slightly less rural coverage, but covers all major tourist routes and cities reliably.",
  },
  {
    q: "Do most travellers actually need unlimited data in Japan?",
    a: "Probably not. A typical tourist using Google Maps, WhatsApp, social media, and occasional Google searches uses around 1–3 GB per week. Even with daily video calls, 10 GB for a month is enough for most people. The main cases where unlimited genuinely matters: daily video streaming, live content creation, or working remotely with video calls for several hours a day.",
  },
  {
    q: "What happens when an Airalo Japan eSIM hits its data cap?",
    a: "When you use all your data on Airalo, your connection stops entirely — you won't be throttled to a slower speed, you'll simply lose data access. You can purchase an additional plan from the Airalo app and it tops up your eSIM without needing to scan a new QR code. If you're worried about running out, the 10 GB plan ($18 for 30 days) is sufficient for almost all non-streaming use.",
  },
  {
    q: "Can I use a Japan unlimited eSIM for working remotely?",
    a: "Yes. Holafly's unlimited plan and Sakura Mobile's unlimited plan both support remote work use cases — Zoom, Teams, Google Meet, file uploads. Docomo and SoftBank both support 4G LTE at speeds fast enough for video calls (typically 30–100 Mbps in cities). Co-working spaces in major cities often have faster WiFi if you need sustained high-speed connections.",
  },
  {
    q: "Is there a cheaper alternative to Holafly for unlimited data?",
    a: "The closest affordable alternative is Airalo's 10 GB / 30 day plan at $18. For most travellers, this is functionally unlimited. If you genuinely need no cap — for streaming, live gaming, or heavy video uploads — Holafly is the right tool. There is no cheaper provider offering genuinely unlimited data in Japan at the time of writing.",
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

export default function JapanEsimUnlimitedPage() {
  return (
    <>
      <Head>
        <title>Best Unlimited eSIM for Japan 2026 | Japan Travel Kit</title>
        <meta
          name="description"
          content="Need unlimited data in Japan? We compare Holafly, Sakura Mobile, and Airalo on true unlimited vs large fixed plans — with honest findings on speed and value."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/japan-esim-unlimited" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Unlimited eSIM for Japan 2026 | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/japan-esim-unlimited" />
        <meta property="og:description" content="Need unlimited data in Japan? We compare Holafly, Sakura Mobile, and Airalo on true unlimited vs large fixed plans — with honest findings on speed and value." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Unlimited eSIM for Japan 2026 | Japan Travel Kit" />
        <meta name="twitter:description" content="Need unlimited data in Japan? We compare Holafly, Sakura Mobile, and Airalo on true unlimited vs large fixed plans — with honest findings on speed and value." />
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
              headline: "Best Unlimited eSIM for Japan (2026): Top Picks for Heavy Users",
              dateModified: "2026-04-29",
              publisher: {
                "@type": "Organization",
                name: "Japan Travel Kit",
                url: "https://japan-travel-kit.com",
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
                { "@type": "ListItem", position: 1, name: "Home",               item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",             item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards",   item: "https://japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Best Unlimited eSIM", item: "https://japan-travel-kit.com/guides/esim/japan-esim-unlimited" },
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
          <span className={styles.breadCurrent}>Best Unlimited eSIM</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📶</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best Unlimited eSIM for Japan (2026):<br />Top Picks for Heavy Users
          </h1>
          <p className={styles.heroSubtitle}>
            Holafly, Sakura Mobile, or a large fixed plan? We break down which one is actually worth paying for — and who should skip unlimited entirely.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Honest Speed Findings", "True Unlimited vs Fixed"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>True unlimited pick</p>
                <p className={styles.verdictStatValue}>Holafly (from ~$27)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Unlimited + voice</p>
                <p className={styles.verdictStatValue}>Sakura Mobile</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best value (most users)</p>
                <p className={styles.verdictStatValue}>Airalo 10 GB — $18</p>
              </div>
            </div>
            <a
              href="#"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Holafly Japan eSIM →
            </a>
          </div>
        </div>

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
                      <td style={{ fontSize: "0.85rem", color: "#374151" }}>{row.perDay}</td>
                      <td className={styles.tdPrice}>{row.weeklyTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            A typical tourist (Maps + messaging + social media) uses <strong>1–3 GB per week</strong>. Airalo&apos;s 10 GB / 30-day plan at $18 covers most people completely. Unlimited only makes sense if you&apos;re streaming video daily, doing multi-hour video calls, or uploading large files.
          </p>
        </section>

        {/* Best Unlimited section */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>Top picks</span>
          <h2 className={styles.sectionTitle}>Best Unlimited eSIMs for Japan</h2>
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
                    <a href={pick.href} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
                      {pick.cta}
                    </a>
                  </div>
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
                    <th>Sakura Mobile</th>
                    <th>Airalo 10 GB</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.ftFeature}>{row.feature}</td>
                      <td style={{ fontSize: "0.85rem", color: "#374151" }}>{row.holafly}</td>
                      <td style={{ fontSize: "0.85rem", color: "#374151" }}>{row.sakura}</td>
                      <td style={{ fontSize: "0.85rem", color: "#374151" }}>{row.airalo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Is Holafly really unlimited */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Honest answer</span>
          <h2 className={styles.sectionTitle}>Is Holafly Really Unlimited in Japan?</h2>
          <p className={styles.bodyText}>
            Based on available user reports and testing, Holafly Japan does not throttle or cap data usage. Travellers who use Holafly for streaming, video calls, and all-day navigation consistently report no slowdowns even after heavy daily use.
          </p>
          <p className={styles.bodyText}>
            The caveat: Holafly uses the SoftBank network in Japan. SoftBank has excellent coverage in cities, tourist areas, and along major train routes — but Docomo has broader reach in rural areas. For popular tourist destinations (Tokyo, Kyoto, Osaka, Hiroshima, Hokkaido cities), this makes no practical difference.
          </p>
          <p className={styles.bodyText}>
            Holafly is the correct choice when you genuinely cannot predict your data usage, prefer peace of mind over optimising cost, or plan to stream video daily. It is not necessary for typical tourist use.
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
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how Holafly, Airalo, eSIM Go, and Sakura Mobile compare on price, speed, and features in our full comparison guide.
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
