import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const faqGeneral = [
  {
    q: "What is an eSIM?",
    a: "An eSIM (embedded SIM) is a digital SIM card built into your phone. Instead of inserting a physical card, you download a carrier profile via a QR code or app. It works the same way as a regular SIM — giving you calls, texts, and data — but it's faster to set up and lets you switch plans without swapping hardware.",
  },
  {
    q: "Do I need an eSIM for Japan?",
    a: "You don't need one, but it's the most convenient way to get data in Japan. The alternative is buying a physical SIM at the airport, using your home carrier's roaming plan (expensive), or relying on pocket WiFi (requires pickup and return). An eSIM lets you activate data before you land and have Google Maps working as you exit the plane.",
  },
  {
    q: "Does my phone support eSIM?",
    a: "Most phones released after 2018 support eSIM. For iPhones: iPhone XS (2018) and later. For Android: Samsung Galaxy S21 and later, Google Pixel 3 and later, OnePlus 9 and later (most models). Check your phone's settings: on iPhone go to Settings → Cellular → Add eSIM; on Android go to Settings → Network → SIM cards (the wording varies). If the option exists, your phone supports eSIM.",
  },
  {
    q: "What's the difference between eSIM and a physical SIM card for Japan?",
    a: "Both give you mobile data in Japan, but eSIM is faster to set up (no queuing at the airport), cheaper in most cases, and available before you travel. Physical SIM cards require waiting at the airport counter or vending machine after landing. The main advantage of a physical SIM is that it works on phones that don't support eSIM.",
  },
  {
    q: "Can I use my home carrier in Japan instead of buying an eSIM?",
    a: "Yes, but roaming is expensive. Most international carriers charge $10–15 per day for Japan roaming. For a 10-day trip, that's $100–150 just for data — versus $9–18 for a full Japan eSIM plan. Unless your carrier offers a flat travel add-on with good Japan coverage, a dedicated Japan eSIM is almost always cheaper.",
  },
];

const faqProviders = [
  {
    q: "Which eSIM providers work well in Japan?",
    a: "The most reliable Japan eSIM options for tourists are: Airalo (runs on Docomo/SoftBank, easy app, from $4.50), eSIM Go (Docomo coverage, cheapest on the market, from $3.50), Holafly (unlimited data on SoftBank, from $17), and Sakura Mobile (Docomo, includes voice calls, best for longer stays). All four are tested and trusted by travellers.",
  },
  {
    q: "Is Airalo good for Japan?",
    a: "Yes. Airalo is one of the most popular Japan eSIM choices for good reason: it runs on Docomo and SoftBank networks (two of Japan's three main carriers), the app is easy to use, and prices start at $4.50 for 1 GB / 7 days. It's particularly good for short trips and first-time eSIM users. The main limitation is data-only — no calls or SMS.",
  },
  {
    q: "What network does Airalo use in Japan?",
    a: "Airalo Japan eSIM plans run on Docomo and SoftBank networks. Docomo has the widest coverage in Japan, including rural areas, mountains, and remote islands. SoftBank has strong urban and suburban coverage. In practice, most travellers won't notice a difference between the two in tourist areas.",
  },
  {
    q: "Does Holafly work in Japan?",
    a: "Yes. Holafly Japan operates on the SoftBank network and offers unlimited data plans starting from $17 for 5 days. It's a good choice for heavy data users who want unlimited streaming, navigation, and browsing without tracking GB usage. Note that 'unlimited' may be throttled after significant daily usage — Holafly applies a fair-use policy.",
  },
  {
    q: "What is Sakura Mobile and who is it for?",
    a: "Sakura Mobile is a Japan-based carrier that offers both SIM cards and eSIMs specifically designed for tourists and long-term visitors. Unlike Airalo and Holafly, Sakura Mobile includes voice call capability, English-speaking customer support, and plans suitable for stays up to 90 days. It runs on Docomo (Japan's largest carrier). It costs more than budget eSIM options but is the best choice for anyone who needs a Japanese phone number or plans an extended stay.",
  },
];

const faqPlans = [
  {
    q: "How much data do I need for Japan?",
    a: "For typical tourist use — Google Maps, messaging, light browsing, and a few photos — 1 GB per day is a reasonable estimate. A 10-day trip would use around 8–10 GB. If you use maps heavily for driving, stream video, or work remotely, budget 2 GB+ per day. Most travellers find a 3–5 GB plan sufficient for a week-long trip to Japan.",
  },
  {
    q: "How much does a Japan eSIM cost?",
    a: "Japan eSIM prices vary by provider and plan size. Budget options: eSIM Go starts at around $3.50 for 1 GB, Airalo from $4.50 for 1 GB / 7 days. Mid-range: Airalo 3 GB / 30 days at $9.50, eSIM Go 5 GB at around $11. Unlimited: Holafly from $17 for 5 days. Voice-capable: Sakura Mobile from around $20 for 7 days. For a typical tourist week, expect to pay $10–20.",
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
];

const faqSetup = [
  {
    q: "When should I activate my Japan eSIM?",
    a: "Install the eSIM (scan the QR code) before you leave home — this takes 2–5 minutes and requires a Wi-Fi connection. However, most plans start counting days from the first time you connect to a network in Japan, not from when you install the profile. Switch to the Japan eSIM data line once your plane lands, so your plan starts when you need it.",
  },
  {
    q: "How do I install a Japan eSIM on iPhone?",
    a: "1. On Wi-Fi, go to Settings → Cellular → Add eSIM. 2. Choose 'Use QR Code' and scan the code from your provider's email or app. 3. Follow the prompts to label the new plan (e.g., 'Japan'). 4. When you land in Japan, go to Settings → Cellular and switch your active data line to the Japan eSIM. Your home SIM stays installed for calls and messages if needed.",
  },
  {
    q: "How do I install a Japan eSIM on Android?",
    a: "The exact steps vary by device, but generally: go to Settings → Connections (or Network) → SIM Manager → Add eSIM. Scan the QR code from your provider. On Samsung: Settings → Connections → SIM Manager → Add mobile plan. On Google Pixel: Settings → Network & internet → SIMs → Add a SIM. Make sure your phone is on Wi-Fi during installation.",
  },
  {
    q: "Can I use my home SIM and Japan eSIM at the same time?",
    a: "Yes, if your phone supports dual SIM (one physical + one eSIM). Keep your home SIM active so people can still reach you on your regular number, and use the Japan eSIM for data. On iPhone, go to Settings → Cellular and set the Japan eSIM as the 'Primary' data line while keeping your home SIM active for calls. This is the most common setup for international travellers.",
  },
];

const faqTrouble = [
  {
    q: "My Japan eSIM won't connect — what should I do?",
    a: "Try these steps in order: 1. Make sure the correct eSIM line is selected as your data line in Settings → Cellular. 2. Toggle Airplane Mode on and off to reset the connection. 3. Check that data roaming is enabled for the eSIM line (Settings → Cellular → Japan eSIM → Data Roaming: On). 4. Restart your phone. 5. If still no connection, check your provider's support — there may be a network outage or the APN settings may need to be configured manually.",
  },
  {
    q: "Why is my Japan eSIM speed slow?",
    a: "A few possible causes: you've used most of your data allowance (many plans throttle speed after a threshold), you're in a low-coverage area (tunnels, rural mountains), or peak network congestion in crowded tourist areas like Shibuya or Kyoto Station. Try toggling Airplane Mode. If speeds don't improve and you're under your data limit, contact your provider's support.",
  },
];

const allFaq = [...faqGeneral, ...faqProviders, ...faqPlans, ...faqSetup, ...faqTrouble];

const canonicalUrl = "https://japan-travel-kit.com/guides/esim/japan-esim-faq";

export default function JapanEsimFaqPage() {
  return (
    <>
      <Head>
        <title>Japan eSIM FAQ (2026): Every Question Answered | Japan Travel Kit</title>
        <meta
          name="description"
          content="Every common question about Japan eSIMs answered — which providers work, how much data you need, how to install on iPhone and Android, and troubleshooting tips."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Japan eSIM FAQ (2026): Every Question Answered" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:description" content="Every common question about Japan eSIMs answered — which providers work, how much data you need, how to install, and troubleshooting tips." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan eSIM FAQ (2026): Every Question Answered" />
        <meta name="twitter:description" content="Every common question about Japan eSIMs answered — which providers work, how much data you need, how to install, and troubleshooting tips." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: allFaq.map((item) => ({
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
              headline: "Japan eSIM FAQ (2026): Every Common Question Answered",
              dateModified: "2026-05-26",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM", item: "https://japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Japan eSIM FAQ", item: canonicalUrl },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Japan eSIM FAQ</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📶</span> Updated May 2026
          </p>
          <h1 className={styles.heroTitle}>
            Japan eSIM FAQ (2026):<br />Every Common Question Answered
          </h1>
          <p className={styles.heroSubtitle}>
            Which providers work, how much data you need, how to install, and what to do if it stops working.
          </p>
          <div className={styles.heroBadges}>
            {["Updated May 2026", "20+ Questions Answered", "All Major Providers"].map((t) => (
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
            This doesn&apos;t affect our answers or recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* General Questions */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>Getting started</span>
          <h2 className={styles.sectionTitle}>General eSIM Questions</h2>
          <div className={styles.faqList}>
            {faqGeneral.map((item, i) => (
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

        {/* Providers section CTA */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Pick</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Overall</p>
                <p className={styles.verdictStatValue}>Airalo — from $4.50</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Budget</p>
                <p className={styles.verdictStatValue}>eSIM Go — from $3.50</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best Unlimited</p>
                <p className={styles.verdictStatValue}>Holafly — from $17</p>
              </div>
            </div>
            <a href="https://airalo.pxf.io/c/7213504/1268485/15608" className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* Providers FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>Providers</span>
          <h2 className={styles.sectionTitle}>Japan eSIM Providers &amp; Networks</h2>
          <div className={styles.faqList}>
            {faqProviders.map((item, i) => (
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
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <a href="https://airalo.pxf.io/c/7213504/1268485/15608" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo →
            </a>
            <a href="https://breezesim.com?sca_ref=11082101.AF8vabyRKN" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ background: "linear-gradient(135deg,#1e3a5f 0%,#2c5282 100%)" }}>
              Get eSIM Go →
            </a>
            <a href="https://p.sakuramobile.jp/idevaffiliate.php?id=486" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow" style={{ background: "linear-gradient(135deg,#9b2335 0%,#c0392b 100%)" }}>
              Get Sakura Mobile →
            </a>
          </div>
        </section>

        {/* Plans FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>Plans &amp; pricing</span>
          <h2 className={styles.sectionTitle}>Data Plans &amp; Pricing</h2>
          <div className={styles.faqList}>
            {faqPlans.map((item, i) => (
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

        {/* Setup FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>Setup</span>
          <h2 className={styles.sectionTitle}>Installation &amp; Activation</h2>
          <div className={styles.faqList}>
            {faqSetup.map((item, i) => (
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

        {/* Troubleshooting FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>Troubleshooting</span>
          <h2 className={styles.sectionTitle}>Problems &amp; Fixes</h2>
          <div className={styles.faqList}>
            {faqTrouble.map((item, i) => (
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
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (Step-by-Step)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to buy your Japan eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare Airalo, eSIM Go, Holafly, and Sakura Mobile on price, data, and coverage — and pick the right plan for your trip.
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
