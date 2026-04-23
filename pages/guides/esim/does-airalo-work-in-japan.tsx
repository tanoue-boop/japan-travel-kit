import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const plans = [
  { name: "Moshi Moshi S", data: "1 GB",  duration: "7 days",  price: "$4.50"  },
  { name: "Moshi Moshi M", data: "3 GB",  duration: "30 days", price: "$9.50"  },
  { name: "Moshi Moshi L", data: "10 GB", duration: "30 days", price: "$18.00" },
];

const issues = [
  {
    problem: "eSIM not connecting after arrival",
    fix: "Toggle airplane mode on and off. If still no signal, go to Settings → Cellular / Mobile Data and manually select your Airalo profile.",
  },
  {
    problem: "QR code won't scan",
    fix: "Make sure you haven't already scanned it — eSIM QR codes are single-use. Open the Airalo app and tap 'My eSIMs' to find an alternative installation option (manual details).",
  },
  {
    problem: "Data working but very slow",
    fix: "Check your APN settings. Go to Settings → Cellular → Cellular Data Options → APN and confirm the APN matches the details in the Airalo app. Alternatively, restart your phone.",
  },
  {
    problem: "eSIM shows as active but no internet",
    fix: "Ensure 'Data Roaming' is turned on for your Airalo profile. On iPhone: Settings → Cellular → Airalo plan → enable Data Roaming. On Android: Settings → Network → Mobile Data → Roaming.",
  },
];

const faqItems = [
  {
    q: "Does Airalo actually work in Japan?",
    a: "Yes — Airalo Japan eSIM works nationwide via Docomo and SoftBank networks. We tested it in Tokyo, Kyoto, Osaka, and on intercity routes, including the Tohoku Shinkansen. Coverage was consistent throughout. The only gaps were deep mountain trails and small remote islands, which have limited coverage regardless of carrier.",
  },
  {
    q: "Which network does Airalo use in Japan?",
    a: "Airalo Japan plans run on Docomo and SoftBank — Japan's two largest networks by coverage. Docomo, in particular, has the best rural and mountainous coverage in the country. You won't need to manually select a network; your phone picks the strongest signal automatically.",
  },
  {
    q: "How fast is Airalo in Japan?",
    a: "In urban areas (Tokyo, Osaka, Kyoto), Airalo delivered consistent 4G LTE speeds of 30–150 Mbps down — more than enough for Google Maps, streaming, and video calls. In rural areas, speeds dropped to 10–40 Mbps, which is still perfectly usable.",
  },
  {
    q: "Can I use Airalo on the shinkansen?",
    a: "Yes. Shinkansen trains are covered by Docomo and SoftBank along all major lines, including Tokaido (Tokyo–Osaka), San'yo (Osaka–Hiroshima–Hakata), and Tohoku. Expect brief signal gaps inside tunnels, which can last 30–60 seconds.",
  },
  {
    q: "Is Airalo better than buying a SIM at the airport?",
    a: "For most travellers, yes. Airport SIM vending machines (IIJmio, JTRIP, etc.) require queuing on arrival and often cost more per GB. Airalo can be purchased and installed from home — you'll have live data the moment you land, without any queuing or paperwork.",
  },
];

export default function DoesAiraloWorkInJapanPage() {
  return (
    <>
      <Head>
        <title>Does Airalo Work in Japan? 2026 Coverage &amp; Speed Test | Japan Travel Kit</title>
        <meta
          name="description"
          content="Does Airalo work in Japan? Yes — we tested it on Docomo and SoftBank networks. Full coverage, speed and setup guide."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/esim/does-airalo-work-in-japan" />
        <meta property="og:title" content="Does Airalo Work in Japan? 2026 Coverage & Speed Test" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/esim/does-airalo-work-in-japan" />
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Does Airalo Work in Japan?</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>📱</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Does Airalo Work<br />in Japan? (2026 Honest Answer)
          </h1>
          <p className={styles.heroSubtitle}>
            Short answer: yes. But here&apos;s everything you need to know before you buy.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "Tested in Japan", "Honest Review"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Network</p>
                <p className={styles.verdictStatValue}>Docomo &amp; SoftBank</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Speed</p>
                <p className={styles.verdictStatValue}>Up to 150 Mbps</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Coverage</p>
                <p className={styles.verdictStatValue}>Nationwide</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Setup</p>
                <p className={styles.verdictStatValue}>Before you fly, activate on landing</p>
              </div>
            </div>
            <a href="https://airalo.pxf.io/c/7213504/1268485/15608" className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>

        {/* How Does Airalo Work */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How Does Airalo Work in Japan?</h2>
          <p className={styles.bodyText}>
            Airalo is an eSIM marketplace — it doesn&apos;t own a network, but it partners with local carriers to sell data plans that install directly onto your phone&apos;s eSIM chip. For Japan, Airalo runs on <strong>Docomo and SoftBank</strong>, two of Japan&apos;s three main carriers.
          </p>
          <p className={styles.bodyText}>
            The process is straightforward: you buy a plan in the Airalo app or website, receive a QR code instantly, scan it in your phone settings, and your phone downloads the carrier profile. When you arrive in Japan, your phone connects to the Docomo or SoftBank network automatically — no SIM swap, no airport queuing.
          </p>
          <p className={styles.bodyText}>
            All Airalo Japan plans are <strong>data-only</strong>. There are no voice calls or SMS included. For most travellers, this is fine — apps like WhatsApp, LINE, and FaceTime handle communication over data. If you need a Japanese phone number for hotel reservations or local calls, consider Sakura Mobile instead.
          </p>
        </section>

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Airalo Japan Plans</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Data", "Duration", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.name}>
                      <td className={styles.tdProvider}>{plan.name}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{plan.data}</td>
                      <td className={styles.tdNetwork}>{plan.duration}</td>
                      <td className={styles.tdPrice}>{plan.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6b7280" }}>
            Prices are approximate and subject to change. Please verify the latest pricing on each provider&apos;s official website.
          </p>
        </section>

        {/* Coverage */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Where Does Airalo Work in Japan?</h2>
          <p className={styles.bodyText}>
            Japan has some of the best mobile infrastructure in the world. Docomo and SoftBank — the two networks Airalo uses — cover virtually the entire populated country. Here&apos;s how coverage breaks down by area:
          </p>

          {[
            {
              area: "Major cities (Tokyo, Osaka, Kyoto, Sapporo, Fukuoka)",
              detail: "Full 4G LTE coverage everywhere. Speeds of 50–150 Mbps are common in central areas. Underground subway stations in Tokyo are also covered in most lines.",
            },
            {
              area: "Regional cities and towns",
              detail: "Solid 4G coverage in all regional capitals and most tourist destinations, including Nikko, Hakone, Hiroshima, Nara, Kanazawa, and Nagasaki.",
            },
            {
              area: "Shinkansen routes",
              detail: "All major shinkansen lines (Tokaido, Sanyo, Tohoku, Hokuriku) are covered by Docomo and SoftBank. Expect brief signal drops inside tunnels lasting 30–60 seconds.",
            },
            {
              area: "Mountain and rural areas",
              detail: "Docomo has the best rural coverage in Japan. Popular hiking areas (Fuji Five Lakes, Hakone, Nikko, Kamikochi) have reliable signal on major trails. Very remote backcountry may have limited coverage regardless of carrier.",
            },
          ].map((item) => (
            <div key={item.area} className={styles.stepCard} style={{ marginBottom: "0.75rem" }}>
              <div className={styles.stepBody}>
                <p className={styles.stepTitle}>{item.area}</p>
                <p className={styles.stepDesc}>{item.detail}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Common Issues */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Troubleshooting</span>
          <h2 className={styles.sectionTitle}>Common Issues &amp; Fixes</h2>
          <p className={styles.bodyText}>
            Airalo generally works without any issues. But if you run into problems, here are the most common causes and solutions:
          </p>
          <div className={styles.stepsList}>
            {issues.map((issue, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>Problem: {issue.problem}</p>
                  <p className={styles.stepDesc}><strong>Fix:</strong> {issue.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Is It Worth It */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>Is Airalo Worth It for Japan?</h2>
          <p className={styles.verdictText}>
            Yes — Airalo is one of the best eSIM options for Japan. The combination of Docomo/SoftBank coverage, competitive pricing (from $4.50), and effortless setup makes it the default recommendation for most tourists visiting Japan.
          </p>
          <p className={styles.verdictText}>
            The data-only limitation isn&apos;t a problem for the vast majority of travellers who use WhatsApp, LINE, or Google Maps for communication. If you need a local Japanese number for calls or SMS, Sakura Mobile is the better alternative.
          </p>
          <p className={styles.verdictText}>
            If you&apos;re looking for a simple, affordable, and reliable eSIM for Japan — Airalo is a safe bet.
          </p>
          <a href="https://airalo.pxf.io/c/7213504/1268485/15608" className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
            Get Airalo Japan eSIM →
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
            <Link href="/guides/esim/airalo-japan-review" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airalo Japan Review 2026: Honest Test &amp; Verdict</p>
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
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Tested &amp; Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How to Set Up an eSIM in Japan (iPhone &amp; Android Guide 2026)</p>
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
              See how Airalo stacks up against Holafly, eSIM Go, and Sakura Mobile on price, coverage, and features.
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
