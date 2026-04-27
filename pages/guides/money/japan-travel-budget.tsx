import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const budgetTable = [
  { category: "Accommodation", budget: "¥3,000", mid: "¥10,000", comfortable: "¥25,000" },
  { category: "Food",          budget: "¥2,000", mid: "¥5,000",  comfortable: "¥10,000" },
  { category: "Transport",     budget: "¥1,000", mid: "¥3,000",  comfortable: "¥5,000"  },
  { category: "Activities",    budget: "¥500",   mid: "¥3,000",  comfortable: "¥8,000"  },
  { category: "Misc/Shopping", budget: "¥500",   mid: "¥2,000",  comfortable: "¥5,000"  },
  { category: "Total/day",     budget: "¥7,000", mid: "¥23,000", comfortable: "¥53,000" },
];

const accommodationOptions = [
  { type: "Capsule hotel",           range: "¥3,000–¥5,000/night",   desc: "Clean, compact, and practical. Most include shared showers and lockers. Great for solo travellers." },
  { type: "Guesthouse / hostel",     range: "¥4,000–¥8,000/night",   desc: "Dormitories or private rooms with shared facilities. Social atmosphere; common in tourist areas." },
  { type: "Business hotel",          range: "¥8,000–¥15,000/night",  desc: "The Japanese standard — small but efficient rooms, good location, reliable Wi-Fi. Best value for solo travellers." },
  { type: "Mid-range hotel",         range: "¥15,000–¥30,000/night", desc: "Larger rooms, better amenities. Central Tokyo hotels (Shibuya, Shinjuku area) often at the lower end of this range." },
  { type: "Luxury / ryokan",         range: "¥30,000+/night",        desc: "High-end hotels or traditional inns (ryokan). Often includes dinner and breakfast, seasonal kaiseki meals." },
];

const foodOptions = [
  { type: "Convenience store meal",  price: "¥500–¥800",    desc: "7-Eleven, Lawson, and FamilyMart all serve hot food, onigiri, and sandwiches. Genuinely good quality." },
  { type: "Ramen / teishoku set",    price: "¥800–¥1,200",  desc: "The backbone of Japanese everyday dining. Most ramen shops and set-meal restaurants (teishoku-ya) fall in this range." },
  { type: "Conveyor belt sushi",     price: "¥1,500–¥3,000", desc: "Kaiten-zushi chains like Sushiro and Kurazushi offer excellent value. Budget ¥100–¥150 per plate." },
  { type: "Izakaya dinner",          price: "¥2,000–¥4,000", desc: "Japanese pub-style dining with food and drinks. A fun evening out; most have picture menus for easy ordering." },
  { type: "High-end restaurant",     price: "¥10,000+",      desc: "Tokyo has more Michelin-starred restaurants than any other city in the world. High-end dining is a legitimate travel activity." },
];

const transportOptions = [
  { item: "Tokyo subway (single trip)",       cost: "¥170–¥320",  note: "Fare depends on distance. IC cards (Suica/Pasmo) make paying seamless." },
  { item: "Narita Express to central Tokyo",  cost: "¥3,070",     note: "Reserved seating; takes ~60 minutes to Shinjuku." },
  { item: "Shinkansen: Tokyo → Kyoto",        cost: "¥13,320",    note: "One-way on Hikari (non-reserved). Fastest city-to-city link for most itineraries." },
  { item: "JR Pass (7-day)",                  cost: "¥50,000",    note: "Covers unlimited JR trains including Shinkansen (except Nozomi/Mizuho). Worth it for multi-city trips." },
  { item: "IC card (Suica/Pasmo)",            cost: "Top up as needed", note: "Covers trains, buses, and convenience store purchases." },
];

const savingTips = [
  {
    title: "Eat at convenience stores and supermarkets",
    desc: "7-Eleven, Lawson, and FamilyMart offer hot meals, fresh bento, and snacks at excellent quality for ¥500–¥800. Supermarkets mark down bento boxes after 7pm — look for the yellow discount stickers.",
  },
  {
    title: "Order the lunch set (ranchi setto)",
    desc: "Many restaurants that are expensive at dinner serve the same food at lunch for 30–50% less. The lunch set (ランチセット) typically includes a main dish, rice, soup, and small sides.",
  },
  {
    title: "Use overnight buses for long distances",
    desc: "Night buses (highway buses) between cities cost ¥3,000–¥8,000 — a fraction of the equivalent Shinkansen fare. You also save on a night's accommodation. Popular routes: Tokyo–Osaka, Tokyo–Kyoto.",
  },
  {
    title: "Book accommodation early",
    desc: "Popular business hotels in Tokyo and Kyoto sell out weeks in advance during peak seasons (Golden Week, Obon, Cherry Blossom). Booking 3–6 months ahead secures the lowest rates.",
  },
  {
    title: "Mix free and paid attractions",
    desc: "Many of Japan's best experiences are free: temple grounds, shrine visits, city parks, and neighbourhood walks. Paid attractions (museums, observation decks) are typically ¥500–¥1,000.",
  },
];

const hiddenCosts = [
  { cost: "Coin lockers (luggage storage)",  detail: "¥400–¥800 per day at major stations. Useful if checking out before an evening flight. Budget ¥1,000–¥2,000 for a 2-week trip." },
  { cost: "Onsen / public bath entry fee",   detail: "¥500–¥1,500 per visit. Not always mentioned in accommodation costs. Ryokan stays usually include onsen access." },
  { cost: "City tourist taxes",              detail: "Tokyo, Kyoto, and Osaka charge a per-night lodging tax (¥200–¥1,000 depending on room rate). Usually added at checkout." },
  { cost: "Currency exchange fees",          detail: "Airport desks and hotel exchanges charge 5–10% above mid-market. Use a Wise card or 7-Eleven ATM instead — saves ¥2,000–¥5,000 on a typical trip." },
  { cost: "Tipping",                         detail: "Tipping is not customary in Japan and is sometimes considered rude. You do not tip at restaurants, taxis, or hotels. Budget ¥0." },
];

const faqItems = [
  {
    q: "Is Japan expensive for tourists?",
    a: "Japan has a reputation for being expensive, but it is genuinely affordable at the budget level — especially for food and local transport. A backpacker can travel comfortably on ¥7,000–¥10,000 per day (roughly $45–$65). The big costs are long-distance transport (Shinkansen) and accommodation in major cities during peak seasons.",
  },
  {
    q: "How much money should I bring to Japan for 2 weeks?",
    a: "A realistic estimate for 2 weeks: Budget traveller ¥100,000–¥150,000 (roughly $650–$1,000) excluding flights. Mid-range traveller ¥300,000–¥400,000 ($2,000–$2,600). Comfortable traveller ¥600,000+ ($4,000+). These figures cover accommodation, food, transport within Japan, and activities — not international flights.",
  },
  {
    q: "Is Japan cheaper than Europe?",
    a: "For food, local transport, and daily expenses, Japan is comparable to or cheaper than Western Europe. A ramen lunch costs ¥1,000 ($7); a London sandwich costs £6–8 ($8–10). Long-distance transport is more expensive in Japan — the Shinkansen is fast but not cheap — but a JR Pass can offset this if your itinerary involves multiple cities.",
  },
  {
    q: "Can you visit Japan on a budget?",
    a: "Absolutely. Japan has excellent infrastructure for budget travellers: capsule hotels and hostels from ¥3,000/night, convenience store meals from ¥500, free temples and shrines, and an IC card for cheap urban transport. The most effective budget strategy is to spend less on accommodation and food so you can afford the experiences that matter — a Shinkansen ride, a ryokan night, or a high-end meal.",
  },
  {
    q: "How much does food cost per day in Japan?",
    a: "Budget: ¥1,500–¥2,500/day (convenience store meals, ramen, gyudon). Mid-range: ¥4,000–¥7,000/day (sit-down restaurants for every meal, one izakaya dinner). High-end: ¥10,000+/day (kaiseki, omakase sushi, or fine dining). Most travellers end up somewhere in the mid-range naturally — Japan makes it easy to eat well without trying hard.",
  },
];

export default function JapanTravelBudgetPage() {
  return (
    <>
      <Head>
        <title>Japan Travel Budget 2026: Daily Costs | Japan Travel Kit</title>
        <meta
          name="description"
          content="How much does Japan cost per day? We break down realistic budgets for backpackers, mid-range, and comfortable travellers — with 2026 prices for food, transport, and accommodation."
        />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/money/japan-travel-budget" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan Travel Budget 2026: Daily Costs | Japan Travel Kit" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/money/japan-travel-budget" />
        <meta property="og:description" content="How much does Japan cost per day? We break down realistic budgets for backpackers, mid-range, and comfortable travellers — with 2026 prices for food, transport, and accommodation." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Travel Budget 2026: Daily Costs | Japan Travel Kit" />
        <meta name="twitter:description" content="How much does Japan cost per day? We break down realistic budgets for backpackers, mid-range, and comfortable travellers — with 2026 prices for food, transport, and accommodation." />
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
              headline: "Japan Travel Budget Guide (2026): How Much Does Japan Cost?",
              dateModified: "2026-04-27",
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
                { "@type": "ListItem", position: 1, name: "Home",              item: "https://japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",            item: "https://japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money & Payment",   item: "https://japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Japan Travel Budget", item: "https://japan-travel-kit.com/guides/money/japan-travel-budget" },
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Japan Travel Budget</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>💴</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Japan Travel Budget Guide (2026):<br />How Much Does Japan Cost?
          </h1>
          <p className={styles.heroSubtitle}>
            Japan is not as expensive as you think — if you know where to spend and where to save.
            Here&apos;s a realistic daily budget breakdown.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All Budget Levels", "2026 Prices"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Budget Traveller</p>
                <p className={styles.verdictStatValue}>¥7,000–¥10,000/day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Mid-Range Traveller</p>
                <p className={styles.verdictStatValue}>¥15,000–¥25,000/day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Comfortable Traveller</p>
                <p className={styles.verdictStatValue}>¥30,000–¥50,000/day</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Biggest costs:</strong> Accommodation and long-distance transport (Shinkansen).
              Food and local transport are surprisingly affordable at every budget level.
              A convenience store meal costs ¥500–¥800; a subway ride costs ¥170–¥320.
            </p>
          </div>
        </div>

        {/* Daily Budget Breakdown */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Daily Budget Breakdown</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Budget</th>
                    <th>Mid-Range</th>
                    <th>Comfortable</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetTable.map((row) => (
                    <tr key={row.category} style={row.category === "Total/day" ? { fontWeight: 700, background: "#f8fafc" } : {}}>
                      <td className={styles.tdProvider}>{row.category}</td>
                      <td className={styles.tdPrice}>{row.budget}</td>
                      <td style={{ fontWeight: 600, color: "#0d1b4b" }}>{row.mid}</td>
                      <td style={{ color: "#6b7280" }}>{row.comfortable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Prices are per person per day and exclude international flights. Long-distance Shinkansen fares are not included in the daily transport figure — add these separately based on your itinerary.
          </p>
        </section>

        {/* Accommodation */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Accommodation</span>
          <h2 className={styles.sectionTitle}>Accommodation Costs in Japan</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Price Range</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {accommodationOptions.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.type}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.range}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Business hotels represent the best value for solo travellers. Chains like Toyoko Inn, Dormy Inn, and APA Hotel offer clean, well-located rooms with private bathrooms for ¥8,000–¥12,000. For couples, the per-person cost drops to ¥4,000–¥6,000 — making a private hotel room competitive with hostel dorms.
          </p>
        </section>

        {/* Food */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Food</span>
          <h2 className={styles.sectionTitle}>Food Costs in Japan</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Meal Type</th>
                    <th>Price Range</th>
                    <th>What You Get</th>
                  </tr>
                </thead>
                <tbody>
                  {foodOptions.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.type}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Japan&apos;s food culture rewards curiosity rather than budget. Some of the best meals you&apos;ll eat — a bowl of ramen at a local shop, a sushi set at a market — cost under ¥1,500. Save your splurge budget for one high-end meal rather than eating expensively every day.
          </p>
        </section>

        {/* Transport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Transport</span>
          <h2 className={styles.sectionTitle}>Transport Costs in Japan</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Journey</th>
                    <th>Cost</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {transportOptions.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Transport is the most variable cost in Japan. If you stay in one city, ¥1,000–¥2,000/day covers local trains easily. Multi-city itineraries (Tokyo → Kyoto → Osaka → Hiroshima) add significant Shinkansen costs — calculate your specific routes using the{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            to see whether a pass makes sense.
          </p>
        </section>

        {/* How to Save */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Budget tips</span>
          <h2 className={styles.sectionTitle}>How to Save Money in Japan</h2>
          <div className={styles.stepsList}>
            {savingTips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hidden Costs */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Watch out</span>
          <h2 className={styles.sectionTitle}>Hidden Costs to Watch Out For</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Cost</th>
                    <th>What to Expect</th>
                  </tr>
                </thead>
                <tbody>
                  {hiddenCosts.map((row) => (
                    <tr key={row.cost}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap", minWidth: "180px" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): What Actually Works?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                  <line x1="14" y1="15" x2="17" y2="15" />
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
          </div>
        </section>
      </div>
    </>
  );
}
