import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA links — Klook affiliate redirects.
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const SKYTREE_URL = "https://www.klook.com/en-US/activity/41352-tokyo-skytree-ticket-tokyo/";
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const TOKYO_TOWER_URL = "https://www.klook.com/en-US/search/?query=Tokyo%20Tower";
const SHIBUYA_SKY_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299140&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F70672-shibuya-sky-tokyo%2F";

const deckRows = [
  {
    deck: "Shibuya Sky",
    height: "~229 m (rooftop)",
    highlight: "Open-air rooftop directly above the Scramble Crossing — the iconic Tokyo shot",
    price: "from ~¥2,500 (advance online adult)",
    area: "Shibuya Station",
  },
  {
    deck: "Tokyo Skytree",
    height: "350 m & 450 m decks (634 m tower)",
    highlight: "Highest views, glass-floor section; Mt. Fuji visible on clear days",
    price: "approx ¥1,800 (350 m); ~¥3,100 combo",
    area: "Oshiage, near Asakusa",
  },
  {
    deck: "Tokyo Tower",
    height: "~150 m & ~250 m decks (332 m tower)",
    highlight: "Retro 1958 landmark; Top Deck tour for the higher level",
    price: "approx ¥3,300 (Top Deck tour)",
    area: "Shiba-koen / Akabanebashi",
  },
  {
    deck: "Tokyo Metropolitan Gov. Building (Tocho)",
    height: "~202 m",
    highlight: "Free admission; great-value city panorama with no ticket",
    price: "Free",
    area: "Shinjuku",
  },
];

const whoFor = [
  {
    title: "Choose Shibuya Sky if…",
    desc: "You want the single most iconic Tokyo view. The open-air rooftop sits directly above the Shibuya Scramble Crossing, so you get the postcard cityscape and that famous crossing shot in one place. It's the best one-and-done photo experience — just book the sunset slot early.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V8l7-4 7 4v13" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Choose Tokyo Skytree if…",
    desc: "You want the highest, furthest views and a glass floor. At 350 m and 450 m, the Skytree decks look out far beyond the city — on a clear day you can pick out Mt. Fuji. It's the choice for sheer altitude and the widest panorama, and it pairs naturally with an Asakusa day.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M8 22h8" />
        <path d="M9 7l3-3 3 3" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Choose Tokyo Tower if…",
    desc: "You want the classic, retro landmark. Opened in 1958 and glowing orange at night, Tokyo Tower is the nostalgic icon of the skyline. The Top Deck tour takes you to the higher level for a more intimate, old-school observation experience right in central Tokyo.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22L12 2l6 20" />
        <path d="M8 15h8" />
        <path d="M9.5 9h5" />
      </svg>
    ),
  },
  {
    title: "Choose Tocho (free) if…",
    desc: "You're on a budget or short on time. The Tokyo Metropolitan Government Building observation decks in Shinjuku reach about 202 m and cost nothing to enter. It's the best free view in the city — ideal if you'd rather save your yen for the experiences below.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="7" height="18" rx="1" />
        <rect x="13" y="3" width="7" height="18" rx="1" />
        <path d="M6.5 7h2M6.5 11h2M6.5 15h2M15.5 7h2M15.5 11h2M15.5 15h2" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide what you want most from the view",
    desc: "The iconic crossing shot points to Shibuya Sky; the highest and furthest views (plus a glass floor) point to Skytree; a classic retro landmark points to Tokyo Tower; and a free panorama points to Tocho in Shinjuku. Pick the priority first, then the deck follows.",
  },
  {
    title: "Book timed entry ahead for the popular decks",
    desc: "Shibuya Sky's sunset slots sell out fastest and are released roughly two weeks ahead, around midnight JST. Skytree and Tokyo Tower are usually easier, but advance online tickets still save time at the entrance and let you pick your slot.",
  },
  {
    title: "Use a reseller if you have a foreign card",
    desc: "Some official ticketing sites reject foreign-issued cards. Klook accepts foreign cards, checks out in English, and issues a scannable e-ticket — a reliable workaround for Shibuya Sky, Skytree, and Tokyo Tower.",
  },
  {
    title: "Time it for clear weather and good light",
    desc: "Distant views — especially Mt. Fuji from Skytree — depend on clear air, which tends to be best in winter and early morning. For Shibuya Sky, aim for sunset; for Tokyo Tower and Tocho, the city after dark is the highlight.",
  },
];

const faqItems = [
  {
    q: "Which Tokyo observation deck is best?",
    a: "It depends on what you want. For the single most iconic view, Shibuya Sky wins — its open-air rooftop sits directly above the Shibuya Scramble Crossing. For the highest and furthest views with a glass floor, choose Tokyo Skytree. For a classic retro landmark, Tokyo Tower is the nostalgic pick. And if you're on a budget, the free Tokyo Metropolitan Government Building decks in Shinjuku give you a great panorama at no cost.",
  },
  {
    q: "Which Tokyo observation deck is the highest?",
    a: "Tokyo Skytree, by a wide margin. The tower stands 634 m tall, with observation decks at 350 m (the Tembo Deck) and 450 m (the Tembo Galleria). That's well above Shibuya Sky's ~229 m rooftop and Tokyo Tower's decks at roughly 150 m and 250 m, so Skytree offers the highest and furthest-reaching views in Tokyo.",
  },
  {
    q: "Are there any free observation decks in Tokyo?",
    a: "Yes. The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has observation decks at about 202 m that are free to enter. It's the best no-cost city view in Tokyo and a smart choice if you'd rather spend your budget on the paid decks or other experiences. Hours and deck availability can vary, so confirm before you go (2026, subject to change — confirm on arrival).",
  },
  {
    q: "Shibuya Sky vs Skytree — which should I pick?",
    a: "Shibuya Sky is about the experience and the photo: an open-air rooftop ~229 m above the Scramble Crossing, best at sunset, and the most iconic single view in the city. Tokyo Skytree is about altitude and reach: decks at 350 m and 450 m, a glass-floor section, and far-distance views including Mt. Fuji on clear days. Choose Shibuya Sky for the iconic crossing shot and atmosphere; choose Skytree for the highest, widest panorama. For a deeper look at Shibuya Sky specifically, see our full Shibuya Sky tickets guide.",
  },
  {
    q: "Can you see Mt. Fuji from a Tokyo observation deck?",
    a: "On a clear day, yes. Tokyo Skytree offers the best chance thanks to its height (350 m and 450 m decks), but Mt. Fuji can also be visible from Shibuya Sky and other high decks when the air is clear. Visibility is weather-dependent and tends to be best in the cooler, drier months and in the early morning — there's never a guarantee on any given day.",
  },
];

export default function TokyoObservationDecksPage() {
  return (
    <>
      <Head>
        <title>Best Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower | Japan Travel Kit</title>
        <meta
          name="description"
          content="Compare Tokyo's best observation decks in 2026: Shibuya Sky, Tokyo Skytree, Tokyo Tower, and the free Tocho. Heights, prices, highlights, and which one to pick."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Best Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" />
        <meta property="og:description" content="Compare Tokyo's best observation decks in 2026: Shibuya Sky, Tokyo Skytree, Tokyo Tower, and the free Tocho. Heights, prices, highlights, and which one to pick." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower" />
        <meta name="twitter:description" content="Compare Tokyo's best observation decks in 2026: Shibuya Sky, Tokyo Skytree, Tokyo Tower, and the free Tocho. Heights, prices, highlights, and which one to pick." />
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
              headline: "Best Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower",
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
                { "@type": "ListItem", position: 4, name: "Best Tokyo Observation Decks", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" },
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
          <span className={styles.breadCurrent}>Best Tokyo Observation Decks</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🌆</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Best Tokyo Observation Decks (2026):<br />Shibuya Sky vs Skytree vs Tokyo Tower
          </h1>
          <p className={styles.heroSubtitle}>
            Four ways to look down on Tokyo — the iconic rooftop, the tallest tower, the retro landmark, and
            the free one. Here&apos;s how they compare and which to pick for your visit.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Heights & Prices", "Which to Choose"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Most iconic view</p>
                <p className={styles.verdictStatValue}>Shibuya Sky (~229 m rooftop)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Highest & furthest</p>
                <p className={styles.verdictStatValue}>Skytree (350 m / 450 m)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Classic landmark</p>
                <p className={styles.verdictStatValue}>Tokyo Tower (1958 icon)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best free option</p>
                <p className={styles.verdictStatValue}>Tocho, Shinjuku (~202 m)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Pick <strong>Shibuya Sky</strong> for the iconic crossing shot,{" "}
              <strong>Skytree</strong> for the highest views and a glass floor, <strong>Tokyo Tower</strong>{" "}
              for the retro landmark, and <strong>Tocho</strong> if you want a free panorama. Most travellers
              do Shibuya Sky plus one of the towers.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={SHIBUYA_SKY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Shibuya Sky Tickets →
              </a>
              <a href={SKYTREE_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Tokyo Skytree Tickets →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Four Decks, Four Very Different Views</h2>
          <p className={styles.bodyText}>
            Tokyo&apos;s skyline is best appreciated from above, and there&apos;s no single &ldquo;best&rdquo;
            deck — each one trades on something different. Shibuya Sky is about atmosphere and the perfect photo;
            Tokyo Skytree is about sheer height and distance; Tokyo Tower is about nostalgia and a central
            landmark; and the Tokyo Metropolitan Government Building (Tocho) is about getting a genuinely good
            view for free.
          </p>
          <p className={styles.bodyText}>
            Below we compare them side by side on height, price, highlight, and location, then help you choose
            based on what matters most to you. Prices are approximate for 2026 and subject to change — always
            confirm at booking.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>Tokyo Observation Decks Compared</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Deck", "Height", "Highlight", "Price (approx)", "Area / nearest"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deckRows.map((row) => (
                    <tr key={row.deck}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.deck}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.height}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.highlight}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Heights and prices are approximate and as of 2026, subject to change — confirm at booking. Skytree
            pricing is roughly ¥1,800 for the 350 m Tembo Deck, plus about ¥1,400 to add the 450 m Tembo
            Galleria, or a combo around ¥3,100.
          </p>
        </section>

        {/* Shibuya Sky detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shibuya Sky</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky — The Iconic Rooftop</h2>
          <p className={styles.bodyText}>
            Shibuya Sky is the open-air rooftop deck atop Shibuya Scramble Square, about 229 metres above one of
            the busiest crossings on earth. Standing on the rooftop looking straight down over the Shibuya
            Scramble Crossing is the single most iconic observation experience in Tokyo, and at around ¥2,500 for
            an advance online adult ticket it&apos;s also excellent value. The sunset slots are the prize — and
            the first to sell out.
          </p>
          <p className={styles.bodyText}>
            Because it&apos;s the most photographed deck in the city, booking has a few quirks worth getting
            right — for prices, the best time to go, and how to book even with a foreign card,{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              see our full Shibuya Sky tickets guide
            </Link>.
          </p>
        </section>

        {/* Skytree detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tokyo Skytree</span>
          <h2 className={styles.sectionTitle}>Tokyo Skytree — The Highest Views</h2>
          <p className={styles.bodyText}>
            At 634 metres, Tokyo Skytree is the tallest tower in Japan, with two observation decks: the Tembo
            Deck at 350 m and the Tembo Galleria at 450 m. It&apos;s the choice for sheer altitude and
            far-reaching views — there&apos;s a glass-floor section for the brave, and on a clear day you can
            see all the way to Mt. Fuji. Pricing is approximately ¥1,800 for the 350 m deck, with about ¥1,400
            extra to add the 450 m galleria, or a combo ticket around ¥3,100.
          </p>
          <p className={styles.bodyText}>
            Skytree sits in Oshiage, near Asakusa, so it pairs neatly with a day exploring old Tokyo. It&apos;s
            generally easier to book than Shibuya Sky, but advance online tickets still save time at the
            entrance.
          </p>
        </section>

        {/* Tokyo Tower detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tokyo Tower</span>
          <h2 className={styles.sectionTitle}>Tokyo Tower — The Retro Landmark</h2>
          <p className={styles.bodyText}>
            Opened in 1958 and standing 332 metres tall, Tokyo Tower is the nostalgic icon of the skyline —
            an orange-and-white lattice that glows over central Tokyo at night. It has a main deck and a higher
            level reached via the Top Deck tour, which runs at approximately ¥3,300. The views aren&apos;t the
            highest in the city, but the tower itself is the attraction: a piece of Showa-era Tokyo that&apos;s
            beautiful both to look out from and to photograph from below.
          </p>
        </section>

        {/* Tocho / free detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Free option</span>
          <h2 className={styles.sectionTitle}>Tocho — The Best Free View</h2>
          <p className={styles.bodyText}>
            If you&apos;d rather not pay for a view, head to the Tokyo Metropolitan Government Building (Tocho)
            in Shinjuku. Its observation decks sit at about 202 metres and admission is free. The panorama over
            western Tokyo is genuinely good — and on clear days you may catch Mt. Fuji — making it the smartest
            budget choice if you&apos;d rather spend your yen on the paid decks or other experiences. Hours and
            deck availability can vary (2026, subject to change — confirm on arrival).
          </p>
        </section>

        {/* Who it's for / which to choose */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which to choose</span>
          <h2 className={styles.sectionTitle}>Which Deck Is Right for You?</h2>
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

        {/* How to plan / book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Plan &amp; Book</h2>
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
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-4 7 4v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Tokyo Tickets (2026): Planets vs Borderless &amp; How to Book</p>
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
            <h2 className={styles.ctaBannerTitle}>Book your Tokyo view</h2>
            <p className={styles.ctaBannerDesc}>
              Whether you want the iconic Shibuya rooftop, the highest views from Skytree, or the retro Tokyo
              Tower, booking online saves time at the entrance — and lets you lock in the best slots.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={SHIBUYA_SKY_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Shibuya Sky →
              </a>
              <a href={SKYTREE_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Tokyo Skytree →
              </a>
              <a href={TOKYO_TOWER_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                Tokyo Tower →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
