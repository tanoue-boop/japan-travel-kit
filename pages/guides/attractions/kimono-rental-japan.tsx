import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const KIMONO_ASAKUSA_URL = "https://www.klook.com/en-US/activity/24284-kimono-rental-asakusa-tokyo/";
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const KIMONO_KYOTO_URL = "https://www.klook.com/en-US/activity/84720-kimono-rental-kyoto/";

const areaRows = [
  {
    area: "Asakusa (Tokyo)",
    backdrops: "Senso-ji temple, Nakamise shopping street, Tokyo Skytree views",
    vibe: "Lively, easy big-city day out",
    when: "You're already on a Tokyo trip and want a half-day add-on",
    booking: "Many shops near the station; book ahead on weekends",
  },
  {
    area: "Kyoto",
    backdrops: "Kiyomizu-dera, Gion's old streets, Fushimi Inari's torii gates",
    vibe: "Classic, atmospheric, postcard old-town",
    when: "You want the most photogenic, traditional setting",
    booking: "Sells out fast in cherry-blossom & autumn seasons",
  },
];

const whoFor = [
  {
    title: "Choose Asakusa if…",
    desc: "You're basing yourself in Tokyo and want kimono as an easy half-day add-on. Shops cluster near Asakusa Station, so you can be dressed and walking toward Senso-ji within the hour — a low-effort way to fit the experience into a packed Tokyo itinerary.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Choose Kyoto if…",
    desc: "You want the picture-perfect version. Kyoto's preserved streets, wooden machiya houses, and shrines make every photo look like a postcard — the lanes around Kiyomizu-dera and Gion were practically made for kimono. It's the classic, most atmospheric choice.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V10l8-6 8 6v11" />
        <path d="M4 21h16" />
        <path d="M12 4v17" />
        <path d="M8 21v-5M16 21v-5" />
      </svg>
    ),
  },
  {
    title: "Going in summer?",
    desc: "From roughly June through September, most shops offer the lighter, cooler yukata instead of a full kimono. It's the comfortable choice in the heat and humidity, looks great at summer festivals and fireworks, and is often a touch cheaper too.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Book online and pick your area",
    desc: "Reserve a shop in Asakusa or Kyoto in advance, especially in spring and autumn when slots and the best designs sell out. Online booking locks in your time, confirms what's included, and usually offers an English-friendly checkout.",
  },
  {
    title: "Arrive and choose your kimono",
    desc: "At the shop you'll browse hundreds of patterns and colours, then pick an obi (sash) and accessories to match. Many shops have multilingual staff to help you coordinate a look you're happy with.",
  },
  {
    title: "Get dressed — and add a hair-set",
    desc: "A professional dresser (kitsuke) puts the kimono on for you; it only takes around 20–30 minutes. Most shops offer an optional hair-set, which finishes the look and photographs especially well.",
  },
  {
    title: "Explore — then return the same day",
    desc: "Head out and enjoy the sights. Same-day return is standard: most shops ask you to bring the outfit back by around 5–6 pm (roughly 17:00–18:00, varies by shop). Check your shop's exact cut-off so you don't have to rush.",
  },
];

const faqItems = [
  {
    q: "How much does kimono rental cost in Japan?",
    a: "Prices vary widely by area, plan, and season, so we don't quote a single fixed figure. A basic same-day plan typically starts from a few thousand yen, with premium or antique kimono, hair-set, and photo add-ons costing more. Summer yukata plans are often a little cheaper. Prices are variable in 2026 — confirm the exact figure for your shop and date at booking.",
  },
  {
    q: "What's included in a kimono rental plan?",
    a: "A typical plan includes the kimono itself, an obi (sash), and the accessories needed to complete the outfit, plus professional dressing (kitsuke) by trained staff. A hair-set is usually an optional add-on, and you'll choose from hundreds of designs and patterns. Many shops also rent footwear and a bag, and offer extras like photo shoots, rickshaw rides, or premium and antique kimono.",
  },
  {
    q: "Do I need to book kimono rental in advance?",
    a: "It's strongly recommended, and during peak seasons it's essential. In cherry-blossom (spring) and autumn-foliage seasons, popular shops, time slots, and the best designs sell out — sometimes well ahead. Booking online secures your slot, confirms what's included, and saves you queuing on the day. Off-peak weekdays are more relaxed, but advance booking is still the safer bet.",
  },
  {
    q: "Should I rent a kimono in Asakusa or Kyoto?",
    a: "Both are excellent — it depends on your trip. Asakusa in Tokyo is the easy add-on: shops sit near the station, and Senso-ji temple and Nakamise street make a lively, photogenic backdrop without leaving the city. Kyoto is the classic, more atmospheric choice, with preserved old-town streets around Gion, Kiyomizu-dera, and Fushimi Inari's torii gates — the most postcard-perfect setting. Choose Asakusa for convenience on a Tokyo trip, Kyoto for the traditional scenery.",
  },
  {
    q: "What time do I have to return the kimono?",
    a: "Same-day return is standard. Most shops ask you to bring the outfit back by around 5–6 pm — typically 17:00 to 18:00, depending on the shop and plan. Some offer next-morning return for an extra fee. Always check your shop's exact cut-off time when you book so you can plan your day around it.",
  },
  {
    q: "Can men and children rent kimono too?",
    a: "Yes. Most rental shops offer men's kimono and children's sizes alongside women's, so couples, families, and groups can all dress up together. Children's plans are often cheaper, and many shops have couple or group packages. If you have a specific size or a men's plan in mind, check the shop's options when booking.",
  },
];

export default function KimonoRentalJapanPage() {
  return (
    <>
      <Head>
        <title>Kimono Rental in Japan (2026): Kyoto &amp; Asakusa — Prices &amp; How to Book | Japan Travel Kit</title>
        <meta
          name="description"
          content="Kimono rental in Japan for 2026: what's included, typical prices, and how to book in Kyoto vs Asakusa. Compare areas, see the booking steps, and rent with confidence."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Kimono Rental in Japan (2026): Kyoto & Asakusa — Prices & How to Book" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" />
        <meta property="og:description" content="Kimono rental in Japan for 2026: what's included, typical prices, and how to book in Kyoto vs Asakusa. Compare areas, see the booking steps, and rent with confidence." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kimono Rental in Japan (2026): Kyoto & Asakusa — Prices & How to Book" />
        <meta name="twitter:description" content="Kimono rental in Japan for 2026: what's included, typical prices, and how to book in Kyoto vs Asakusa. Compare areas, see the booking steps, and rent with confidence." />
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
              headline: "Kimono Rental in Japan (2026): Kyoto & Asakusa — Prices & How to Book",
              dateModified: "2026-06-15",
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
                { "@type": "ListItem", position: 4, name: "Kimono Rental in Japan", item: "https://www.japan-travel-kit.com/guides/attractions/kimono-rental-japan" },
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
          <span className={styles.breadCurrent}>Kimono Rental in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>👘</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Kimono Rental in Japan (2026):<br />Kyoto &amp; Asakusa — Prices &amp; How to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Dress up and wander Japan&apos;s most beautiful streets. Here&apos;s what a rental includes,
            roughly what it costs, and whether to do it in Kyoto or Asakusa.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Kyoto vs Asakusa", "Same-Day Return"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Price</p>
                <p className={styles.verdictStatValue}>From a few thousand yen (variable)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Includes</p>
                <p className={styles.verdictStatValue}>Kimono, obi, accessories + dressing</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Asakusa (Tokyo) or Kyoto</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Return</p>
                <p className={styles.verdictStatValue}>Same day, by ~5–6 pm</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> A kimono rental gets you a full outfit plus professional dressing for a
              day of sightseeing. Choose <strong>Asakusa</strong> for an easy Tokyo add-on or <strong>Kyoto</strong>{" "}
              for the classic old-town scenery — and book ahead in spring and autumn, when slots sell out.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={KIMONO_ASAKUSA_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kimono Rental — Asakusa →
              </a>
              <a href={KIMONO_KYOTO_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kimono Rental — Kyoto →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is a Kimono Rental?</h2>
          <p className={styles.bodyText}>
            Renting a kimono for the day is one of the most popular ways for visitors to experience traditional
            Japan. For a single fee, a shop kits you out in a full outfit — the kimono, an <strong>obi</strong>{" "}
            (sash), and the accessories that complete the look — and a trained dresser puts it all on for you.
            You then keep it for the day, wander the sights, and bring it back the same evening.
          </p>
          <p className={styles.bodyText}>
            Two areas dominate: <strong>Asakusa</strong> in Tokyo, near the famous Senso-ji temple, and{" "}
            <strong>Kyoto</strong>, with its atmospheric old streets and shrines. Both have dozens of shops, often
            with multilingual staff and hundreds of designs to choose from. The main decisions are simply{" "}
            <em>which area</em> suits your trip and <em>which add-ons</em> — hair-set, photo shoot, rickshaw ride
            — you want.
          </p>
        </section>

        {/* Area comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to rent</span>
          <h2 className={styles.sectionTitle}>Asakusa vs Kyoto at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "Best backdrops", "Vibe", "When to choose", "Booking notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.backdrops}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.vibe}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Prices and inclusions vary by shop, plan, and season (2026, variable — confirm at booking). In both
            areas, spring cherry-blossom and autumn-foliage seasons are the busiest, so reserve early.
          </p>
        </section>

        {/* Which area suits whom */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which area suits you</span>
          <h2 className={styles.sectionTitle}>Asakusa, Kyoto, or Summer Yukata?</h2>
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

        {/* What's included */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What you get</span>
          <h2 className={styles.sectionTitle}>What&apos;s Included &amp; Common Add-Ons</h2>
          <p className={styles.bodyText}>
            A standard plan covers the <strong>kimono, obi, and accessories</strong>, plus professional dressing
            (<em>kitsuke</em>) — staff dress you properly in about 20–30 minutes, since a kimono is tricky to put
            on yourself. You&apos;ll choose from hundreds of patterns, and most shops also include footwear and a
            small bag. A <strong>hair-set</strong> is the most common optional extra and really finishes the look.
          </p>
          <p className={styles.bodyText}>
            Popular add-ons include a <strong>professional photo shoot</strong>, a <strong>rickshaw</strong>{" "}
            (<em>jinrikisha</em>) ride through the old streets, and premium or antique kimono for a more refined
            outfit. In summer (roughly June–September), most shops switch to the lighter{" "}
            <strong>yukata</strong>, which is cooler in the heat and perfect for festivals and fireworks. If
            you&apos;re planning your Tokyo days around an Asakusa rental, our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo transport guide
            </Link>{" "}
            helps you get there easily.
          </p>
        </section>

        {/* How it works */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Kimono Rental Works</h2>
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="3" width="12" height="18" rx="2" />
                  <line x1="6" y1="8" x2="18" y2="8" />
                  <line x1="6" y1="14" x2="18" y2="14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Dress up for the day</h2>
            <p className={styles.ctaBannerDesc}>
              Book a kimono rental in Asakusa or Kyoto — full outfit, professional dressing, and an optional
              hair-set. Reserve ahead in spring and autumn, when the best slots and designs sell out fast.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={KIMONO_ASAKUSA_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Asakusa Kimono Rental →
              </a>
              <a href={KIMONO_KYOTO_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Kyoto Kimono Rental →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
