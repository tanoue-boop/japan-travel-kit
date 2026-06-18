import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// CTA link — build-ahead. Plain Klook search link for now.
// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const TOKYO_FOOD_TOUR_URL = "https://www.klook.com/en-US/search/?query=Shinjuku%20izakaya%20bar%20hopping%20Tokyo";

const compareRows = [
  {
    option: "Evening izakaya / bar hop",
    area: "Shinjuku — Omoide Yokocho, Golden Gai",
    style: "Small group, ~3 hrs, food & drinks included",
    note: "Alcohol included — 20+ only",
  },
  {
    option: "Daytime market food walk",
    area: "Tsukiji Outer Market",
    style: "Grazing tour of stalls & shops, family-friendly",
    note: "All ages; lighter on drinks",
  },
];

const whoFor = [
  {
    title: "Go for the evening izakaya crawl if…",
    desc: "You want Tokyo's after-dark side. A Shinjuku bar-hopping tour leads you through the lantern-lit alleys of Omoide Yokocho and the tiny bars of Golden Gai, with yakitori, drinks, and local know-how you'd struggle to find alone. Note these tours include alcohol and are for ages 20 and over.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3h14l-1 9a6 6 0 0 1-12 0z" />
        <path d="M12 21v-3M8 21h8" />
      </svg>
    ),
  },
  {
    title: "Go for a daytime market walk if…",
    desc: "You're travelling with family or prefer to keep it light on alcohol. A Tsukiji Outer Market food tour is a daytime graze through stalls and specialist shops — fresh seafood, tamagoyaki, and snacks — and works for all ages.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16l-1.5 12.5a1 1 0 0 1-1 .9H6.5a1 1 0 0 1-1-.9z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
    ),
  },
  {
    title: "Go guided rather than solo if…",
    desc: "You don't read Japanese, feel unsure about tiny bars with their own etiquette, or just want the stories behind the food. A small-group tour with an English-speaking guide handles ordering, etiquette, and pacing — ideal for a first night out in the city.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 14h1a4 4 0 0 1 4 4v3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick your style — night out or daytime graze",
    desc: "An evening izakaya and bar-hopping tour in Shinjuku is the classic choice for atmosphere and nightlife. A daytime food walk through the Tsukiji Outer Market is the better fit for families or anyone who'd rather keep drinking light. Decide which mood you're after first.",
  },
  {
    title: "Check the age policy if alcohol is included",
    desc: "Most izakaya and bar-hopping tours include alcoholic drinks, so they're restricted to ages 20 and over — Japan's legal drinking age. If you're travelling with under-20s, choose a daytime market or food-walk tour instead, or confirm a non-alcohol option before booking.",
  },
  {
    title: "Know the Shinjuku trio",
    desc: "Omoide Yokocho is a warren of tiny post-war yakitori stalls under red lanterns; Golden Gai is a cluster of minuscule themed bars; and Kabukicho is the surrounding entertainment district. Many have a cash-first, small-room culture, which is exactly why a guide helps.",
  },
  {
    title: "Come hungry and carry some cash",
    desc: "Tours usually run around three hours in a small group and include several tastings, so arrive hungry. Even on a guided tour, it's wise to carry some yen in cash — many of the smallest, most atmospheric spots don't take cards.",
  },
];

const faqItems = [
  {
    q: "What happens on a Tokyo food or izakaya tour?",
    a: "A typical evening tour gathers a small group and an English-speaking guide, then moves between several izakaya and tiny bars — often in Shinjuku's Omoide Yokocho and Golden Gai — sampling dishes like yakitori, gyoza, and fried tofu with sake or beer along the way. Tours usually last around three hours and include the food and drinks, so you taste a range of places in one night.",
  },
  {
    q: "How much does a Tokyo food tour cost?",
    a: "Prices vary by operator, inclusions, and season, but small-group evening tours commonly start from around US$39 per person and rise with the number of tastings and drinks included. Daytime market food walks are often in a similar range. Check exactly what's included — number of stops, dishes, and drinks — when you compare, as that drives the price.",
  },
  {
    q: "Is there an age limit for izakaya bar-hopping tours?",
    a: "Yes. Because izakaya and bar-hopping tours include alcoholic drinks, they're generally limited to ages 20 and over, in line with Japan's legal drinking age. If you're travelling with younger members of your group, look instead at a daytime market food tour (such as Tsukiji), which is family-friendly and lighter on alcohol.",
  },
  {
    q: "Where do Tokyo food tours usually go?",
    a: "Evening tours centre on Shinjuku — the lantern-lit yakitori alley of Omoide Yokocho, the tiny themed bars of Golden Gai, and the Kabukicho entertainment district around them. For a daytime option, the Tsukiji Outer Market is the classic choice, with stalls and shops selling fresh seafood and street snacks to graze through.",
  },
  {
    q: "What food will I try on a Tokyo izakaya tour?",
    a: "Expect izakaya staples: yakitori (grilled chicken skewers), gyoza (dumplings), and fried tofu, typically paired with sake or beer. Exact dishes depend on the venues and the season, and many tours adapt to the group. If you have dietary needs, flag them when booking — smaller bars have limited menus, so advance notice helps.",
  },
  {
    q: "Should I do a food tour or explore on my own?",
    a: "If you read some Japanese and feel comfortable wandering into tiny, cash-only bars, exploring solo is part of the fun. But a guided tour is worth it for a first night out: the guide handles ordering and etiquette, gets you into places you might walk past, and shares the stories behind the food. It's an efficient, low-stress way to taste a lot in one evening.",
  },
];

export default function TokyoFoodTourPage() {
  return (
    <>
      <Head>
        <title>Tokyo Food &amp; Izakaya Tours (2026): Shinjuku Bar Hopping &amp; What to Eat | Japan Travel Kit</title>
        <meta
          name="description"
          content="Tokyo food and izakaya tours in 2026: Shinjuku bar hopping through Omoide Yokocho and Golden Gai, what to eat, costs, the 20+ alcohol rule, and a daytime Tsukiji market option."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-food-tour" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Food & Izakaya Tours (2026): Shinjuku Bar Hopping & What to Eat" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-food-tour" />
        <meta property="og:description" content="Tokyo food and izakaya tours in 2026: Shinjuku bar hopping through Omoide Yokocho and Golden Gai, what to eat, costs, the 20+ alcohol rule, and a daytime Tsukiji market option." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Food & Izakaya Tours (2026): Shinjuku Bar Hopping & What to Eat" />
        <meta name="twitter:description" content="Tokyo food and izakaya tours in 2026: Shinjuku bar hopping through Omoide Yokocho and Golden Gai, what to eat, costs, the 20+ alcohol rule, and a daytime Tsukiji market option." />
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
              headline: "Tokyo Food & Izakaya Tours (2026): Shinjuku Bar Hopping & What to Eat",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Food & Izakaya Tours", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-food-tour" },
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
          <span className={styles.breadCurrent}>Tokyo Food &amp; Izakaya Tours</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🏮</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Food &amp; Izakaya Tours (2026):<br />Shinjuku Bar Hopping &amp; What to Eat
          </h1>
          <p className={styles.heroSubtitle}>
            The lantern-lit alleys of Shinjuku are made for an izakaya crawl — yakitori, sake, and tiny bars you&apos;d
            never find alone. Here&apos;s how the tours work, what to eat, and the rules to know.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Shinjuku Nightlife", "Small-Group Tours"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Where</p>
                <p className={styles.verdictStatValue}>Shinjuku alleys &amp; bars</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Length</p>
                <p className={styles.verdictStatValue}>~3 hrs, small group</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From</p>
                <p className={styles.verdictStatValue}>~US$39 (food/drinks incl.)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Age</p>
                <p className={styles.verdictStatValue}>20+ if alcohol included</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> An evening izakaya and bar-hopping tour through Shinjuku&apos;s Omoide
              Yokocho and Golden Gai is the easiest way into Tokyo&apos;s nightlife — a guide gets you into tiny
              bars and handles the etiquette. Alcohol-inclusive tours are 20 and over; for families, a daytime
              Tsukiji market food walk is the alternative.
            </p>
            <a href={TOKYO_FOOD_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Tokyo Food Tours →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Take a Food Tour in Tokyo?</h2>
          <p className={styles.bodyText}>
            Tokyo has more restaurants than any city on earth, and some of its best are the hardest to walk into:
            counter-only izakaya, six-seat bars, and smoky yakitori stalls where the menus are in Japanese and the
            etiquette is unwritten. A food tour cuts straight through that. In a single evening you taste a string
            of places with a guide who orders for you, explains what you&apos;re eating, and gets you past the
            doorways you&apos;d otherwise hesitate at.
          </p>
          <p className={styles.bodyText}>
            The spiritual home of the Tokyo crawl is <strong>Shinjuku</strong>, where the post-war alley of Omoide
            Yokocho, the tiny bars of Golden Gai, and the neon of Kabukicho sit side by side. Below we compare the
            evening crawl with a daytime market option, then cover what to eat and the practical rules.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Two styles</span>
          <h2 className={styles.sectionTitle}>Evening Crawl vs Daytime Market Walk</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Area", "Style", "Good to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Formats, inclusions, and prices vary by operator and season (2026, variable — confirm at booking).
            Alcohol-inclusive tours are restricted to ages 20 and over.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>Who Should Take One?</h2>
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
          <h2 className={styles.sectionTitle}>How to Pick &amp; Book</h2>
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

        {/* Note on age / drinking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Good to know</span>
          <h2 className={styles.sectionTitle}>The 20+ Rule &amp; Cash Culture</h2>
          <p className={styles.bodyText}>
            Japan&apos;s legal drinking age is 20, and any tour that includes alcohol — which covers most izakaya
            and bar-hopping crawls — is therefore limited to guests aged 20 and over. If your group includes
            under-20s, pick a daytime market food walk such as Tsukiji, or confirm a non-alcoholic alternative
            with the operator before you book.
          </p>
          <p className={styles.bodyText}>
            The other practical point is cash: the smallest, most characterful bars often don&apos;t take cards, so
            carry some yen even on a guided tour. While you&apos;re planning the night, our{" "}
            <Link href="/guides/attractions/tokyo-observation-decks" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo observation decks guide
            </Link>{" "}
            pairs well — a sunset view before dinner makes an easy lead-in to a Shinjuku food crawl.
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
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M8 22h8" />
                  <path d="M9 7l3-3 3 3" />
                  <path d="M8 12h8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
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
            <h2 className={styles.ctaBannerTitle}>Eat your way through Shinjuku</h2>
            <p className={styles.ctaBannerDesc}>
              A small-group izakaya and bar-hopping tour is the easiest way into Tokyo&apos;s nightlife — yakitori,
              sake, and tiny bars with a guide to lead the way. Alcohol-inclusive tours are for ages 20 and over.
            </p>
            <a href={TOKYO_FOOD_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              Browse Tokyo Food Tours →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
