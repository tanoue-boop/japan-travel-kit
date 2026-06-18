import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA link — Klook affiliate redirect.
const TEA_CEREMONY_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307860&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F160630-traditional-japanese-tea-ceremony-experience-in-kyoto%2F";

const compareRows = [
  {
    city: "Kyoto",
    setting: "Gion, Kiyomizu & Daitoku-ji areas; traditional machiya tea rooms",
    matcha: "Uji matcha heartland",
    pairing: "Often combined with kimono rental",
  },
  {
    city: "Tokyo",
    setting: "Central venues and tea houses, easy to slot into a city day",
    matcha: "Quality matcha, broad choice of sessions",
    pairing: "Good for a short, convenient introduction",
  },
];

const whoFor = [
  {
    title: "Go in Kyoto if…",
    desc: "You want the most atmospheric setting. Kyoto is the home of the tea ceremony and of nearby Uji matcha, with traditional tea rooms around Gion, Kiyomizu, and Daitoku-ji. It pairs naturally with a kimono rental for a fully traditional half-day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 21h14" />
        <path d="M6 21V10l6-4 6 4v11" />
        <path d="M10 21v-5h4v5" />
      </svg>
    ),
  },
  {
    title: "Go in Tokyo if…",
    desc: "You're short on time or not visiting Kyoto. Tokyo has plenty of beginner-friendly venues with English-speaking hosts, easy to fit into a city day. You still get the full ritual — whisking matcha and a seasonal sweet — in a convenient central location.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="9" width="18" height="11" rx="2" />
        <path d="M7 9V6a5 5 0 0 1 10 0v3" />
      </svg>
    ),
  },
  {
    title: "Choose carefully if…",
    desc: "You have mobility needs or are pregnant. Some ceremonies involve kneeling (seiza) and, where kimono is included, dressing — so certain venues advise against attendance during pregnancy. Many offer chair-based seating; confirm what's available before you book.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Choose your city and setting",
    desc: "Kyoto offers the most traditional atmosphere — historic tea rooms in Gion or near Kiyomizu, in the Uji matcha heartland — while Tokyo has convenient, beginner-friendly venues that slot easily into a busy itinerary. Decide which fits your route first.",
  },
  {
    title: "Pick a session length and format",
    desc: "Experiences typically run about 20 to 60 minutes. Shorter sessions focus on watching the matcha being prepared and tasting it with a sweet; longer ones explain the etiquette and may let you whisk your own bowl. Most have English-speaking hosts, so first-timers are well looked after.",
  },
  {
    title: "Check seating and any restrictions",
    desc: "Traditional seating is on tatami in the kneeling seiza position, which not everyone finds comfortable. Many venues offer chairs or table seating — worth confirming if you need it. Note that some ceremonies, especially those combined with kimono, advise against attendance during pregnancy, so check the policy.",
  },
  {
    title: "Consider pairing it with a kimono",
    desc: "A popular combination is to rent a kimono and then attend a tea ceremony in it, making a single, immersive cultural half-day. If that appeals, book the kimono and the ceremony together, or pick a venue that bundles both.",
  },
];

const faqItems = [
  {
    q: "What is a Japanese tea ceremony?",
    a: "The Japanese tea ceremony (chanoyu, or sado, 'the way of tea') is the ritual preparation and serving of matcha — powdered green tea — whisked to a froth and served with a seasonal sweet (wagashi). It's as much about hospitality, mindfulness, and seasonal aesthetics as about the drink itself. Visitor experiences distil this into a guided session, usually with an English-speaking host.",
  },
  {
    q: "How long does a tea ceremony experience take?",
    a: "Most visitor experiences run between about 20 and 60 minutes. Shorter sessions centre on watching the matcha being prepared and tasting it with a sweet, while longer ones explain the etiquette and history and may invite you to whisk your own bowl. Pick the length that suits your schedule and how deeply you want to go.",
  },
  {
    q: "Should I do a tea ceremony in Tokyo or Kyoto?",
    a: "Both are excellent. Kyoto is the spiritual home of the tea ceremony and sits near the Uji matcha region, with atmospheric traditional tea rooms around Gion and Kiyomizu — and it pairs beautifully with a kimono rental. Tokyo offers convenient, beginner-friendly venues that are easy to fit into a city day. Choose Kyoto for atmosphere, Tokyo for convenience.",
  },
  {
    q: "Is a tea ceremony suitable for beginners and children?",
    a: "Yes. Most visitor experiences are designed for first-timers, with English-speaking hosts who walk you through what to do, so no prior knowledge is needed. Many welcome children too. If you have specific needs — dietary, mobility, or otherwise — mention them when booking, as venues vary in what they can accommodate.",
  },
  {
    q: "Do I have to kneel, and can I attend if I'm pregnant?",
    a: "Traditional seating is on tatami in the seiza (kneeling) position, but many venues offer chairs or table seating — ask when you book. Because some ceremonies involve kneeling and, where kimono is included, being dressed in one, certain venues advise against attendance during pregnancy. Policies differ, so confirm directly with the operator before booking.",
  },
  {
    q: "What's the background of the tea ceremony?",
    a: "The way of tea has deep roots in Zen Buddhism; matcha was popularised in Japan after the monk Eisai brought tea-drinking practices from China, and the ceremony was later refined into the form known today. You don't need any of this history to enjoy a session — hosts share as much or as little as you like — but it adds meaning to the ritual.",
  },
];

export default function TeaCeremonyJapanPage() {
  return (
    <>
      <Head>
        <title>Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto &amp; What to Expect | Japan Travel Kit</title>
        <meta
          name="description"
          content="Japanese tea ceremony experiences in 2026: what chanoyu involves, how long it takes, Tokyo vs Kyoto, pairing with a kimono, seating and pregnancy notes, and how to book."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tea-ceremony-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto & What to Expect" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tea-ceremony-japan" />
        <meta property="og:description" content="Japanese tea ceremony experiences in 2026: what chanoyu involves, how long it takes, Tokyo vs Kyoto, pairing with a kimono, seating and pregnancy notes, and how to book." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto & What to Expect" />
        <meta name="twitter:description" content="Japanese tea ceremony experiences in 2026: what chanoyu involves, how long it takes, Tokyo vs Kyoto, pairing with a kimono, seating and pregnancy notes, and how to book." />
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
              headline: "Japanese Tea Ceremony Experience (2026): Tokyo, Kyoto & What to Expect",
              dateModified: "2026-06-18",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Japanese Tea Ceremony Experience", item: "https://www.japan-travel-kit.com/guides/attractions/tea-ceremony-japan" },
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Japanese Tea Ceremony</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🍵</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Japanese Tea Ceremony Experience (2026):<br />Tokyo, Kyoto &amp; What to Expect
          </h1>
          <p className={styles.heroSubtitle}>
            Whisked matcha, a seasonal sweet, and a quiet, mindful ritual centuries in the making. Here&apos;s what
            a tea ceremony involves, where to do it, and how to choose the right session.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Beginner-Friendly", "Tokyo & Kyoto"].map((t) => (
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
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "#92400e", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>What it is</p>
                <p className={styles.verdictStatValue}>Whisked matcha + a sweet</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>~20–60 minutes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Tokyo &amp; Kyoto</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Good to know</p>
                <p className={styles.verdictStatValue}>Seiza; pregnancy limits at some venues</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> A tea ceremony is a short, beginner-friendly ritual of whisked matcha and a
              seasonal sweet, usually with an English-speaking host. Kyoto offers the most traditional setting (and
              pairs with kimono); Tokyo is the convenient option. Check seating and any pregnancy restrictions when
              you book.
            </p>
            <a href={TEA_CEREMONY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Tea Ceremony Experiences →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What a Tea Ceremony Actually Is</h2>
          <p className={styles.bodyText}>
            The Japanese tea ceremony — <strong>chanoyu</strong>, or <strong>sado</strong>, &ldquo;the way of
            tea&rdquo; — is the careful preparation and serving of matcha, powdered green tea whisked to a froth and
            served with a seasonal sweet. More than a drink, it&apos;s a practice of hospitality, attentiveness, and
            seasonal beauty, refined over centuries. For visitors, that tradition is distilled into a short, guided
            experience that anyone can enjoy.
          </p>
          <p className={styles.bodyText}>
            You don&apos;t need any background to take part. Sessions are designed for beginners, hosts usually speak
            English, and the focus is on the experience itself — the taste of the matcha, the quiet of the room, and
            the small, deliberate movements of the ritual. Below we cover where to do it, how to choose, and a few
            practical points to check before booking.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to go</span>
          <h2 className={styles.sectionTitle}>Tokyo vs Kyoto for a Tea Ceremony</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["City", "Setting", "Matcha", "Pairs with"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.city}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.city}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.setting}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.matcha}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pairing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Venues, formats, and prices vary (2026, variable — confirm at booking). Both cities offer
            beginner-friendly, English-language sessions.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Where Should You Do It?</h2>
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

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Choose &amp; Book</h2>
          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Good to know */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Good to know</span>
          <h2 className={styles.sectionTitle}>Seating, Pregnancy &amp; Pairing with Kimono</h2>
          <p className={styles.bodyText}>
            Two practical points are worth checking before you book. First, seating: the traditional posture is
            seiza (kneeling on tatami), which not everyone finds comfortable — many venues offer chairs or table
            seating, so ask if you need it. Second, some ceremonies involve kneeling and, where a kimono is
            included, being dressed in one; for that reason certain venues advise against attendance during
            pregnancy. Policies vary, so confirm directly with the operator.
          </p>
          <p className={styles.bodyText}>
            A tea ceremony also pairs wonderfully with a{" "}
            <Link href="/guides/attractions/kimono-rental-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              kimono rental
            </Link>{" "}
            for a fully traditional half-day — especially in Kyoto, where you can wander between the two. For more
            ideas in the city, see our{" "}
            <Link href="/guides/attractions/things-to-do-kyoto" style={{ color: "var(--red)", fontWeight: 600 }}>
              best things to do in Kyoto
            </Link>{" "}
            guide.
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
            <Link href="/guides/attractions/kimono-rental-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M12 7v14" />
                  <path d="M8 3L5 9v8a2 2 0 0 0 2 2M16 3l3 6v8a2 2 0 0 1-2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kimono Rental in Japan (2026): Kyoto &amp; Asakusa — Prices &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2 4 4 .5-3 3 .8 4L12 17l-3.8 1.5.8-4-3-3 4-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Things to Do in Kyoto (2026): Temples, Geisha &amp; Experiences</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Things to Do in Tokyo (2026): Tickets, Attractions &amp; Experiences</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Sit down to the way of tea</h2>
            <p className={styles.ctaBannerDesc}>
              A short, beginner-friendly ceremony in Tokyo or Kyoto is one of Japan&apos;s most rewarding cultural
              experiences. Check seating and any pregnancy restrictions when you book, and consider pairing it with
              a kimono.
            </p>
            <a href={TEA_CEREMONY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              Browse Tea Ceremony Experiences →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
