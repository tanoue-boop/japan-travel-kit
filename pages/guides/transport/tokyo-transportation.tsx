import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const keyRoutes = [
  { from: "Shinjuku", to: "Shibuya",    line: "Yamanote Line",  time: "5 min",  price: "¥160" },
  { from: "Tokyo",    to: "Ueno",       line: "Yamanote Line",  time: "8 min",  price: "¥160" },
  { from: "Shinjuku", to: "Akihabara",  line: "Chuo/Sobu Line", time: "20 min", price: "¥220" },
  { from: "Shibuya",  to: "Harajuku",   line: "Yamanote Line",  time: "2 min",  price: "¥160" },
  { from: "Asakusa",  to: "Shinjuku",   line: "Toei Oedo Line", time: "40 min", price: "¥280" },
];

const dayPasses = [
  { pass: "Tokyo Metro 1-day", price: "¥600",   covers: "Tokyo Metro only (9 lines)",  worth: "Sometimes" },
  { pass: "Tokyo Metro 2-day", price: "¥1,000", covers: "Tokyo Metro only (9 lines)",  worth: "Sometimes" },
  { pass: "Tokyo Free Kippu",  price: "¥1,600", covers: "All Tokyo lines (JR + Metro + Toei)", worth: "Rarely" },
];

const tokyoLines = [
  {
    title: "JR Lines (Japan Railways)",
    desc: "JR East operates the Yamanote Line and several other key Tokyo routes. You pay per journey — IC cards work on all JR lines and there's no day pass that covers JR alone in Tokyo.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
        <path d="M4 11H2v5l2 2h16l2-2v-5H4Z" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Tokyo Metro (9 lines)",
    desc: "The main subway network covering central Tokyo with 9 colour-coded lines. Reaches Shibuya, Shinjuku, Akihabara, Ginza, Roppongi, and most major tourist areas. IC cards accepted.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    title: "Toei Subway (4 lines)",
    desc: "Operated by the Tokyo Metropolitan Government. Four lines — Asakusa, Mita, Shinjuku, and Oedo. Not part of the Tokyo Metro network, so transfers between the two are charged separately.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M3 15h18M9 3v18" />
      </svg>
    ),
  },
];

const trainTips = [
  {
    title: "Avoid rush hour",
    desc: "Tokyo trains are extremely crowded during morning rush (07:30–09:00) and evening rush (17:30–19:30). If you have a flexible schedule, leave your hotel after 09:30 for a much more comfortable experience.",
  },
  {
    title: "Women-only carriages",
    desc: "Most Tokyo train lines designate one or two carriages as women-only during rush hours (typically 07:30–09:30 on weekdays). These are clearly marked on the platform floor. Men should board other carriages during these times.",
  },
  {
    title: "Keep noise to a minimum",
    desc: "Tokyo trains are quiet. Phone calls are considered rude — step onto the platform if you need to call. On Priority Seating (silvery-grey seats near the doors), phones should be on silent.",
  },
  {
    title: "Use Google Maps for routing",
    desc: "Google Maps is the most reliable navigation tool for Tokyo's complex train network. It shows real-time routes, transfers, fares, and even which carriage to board for the fastest exit. Apple Maps and Hyperdia are also useful.",
  },
];

const faqItems = [
  {
    q: "What is the best way to get around Tokyo?",
    a: "An IC card (Suica or Pasmo) loaded with credit is the single most useful thing for navigating Tokyo. It works on every train, subway, bus, and even in convenience stores. Tap in at the turnstile, tap out when you exit, and the correct fare is deducted automatically — no need to buy individual tickets.",
  },
  {
    q: "Should I get a day pass for Tokyo trains?",
    a: "For most tourists, day passes rarely save money. The Tokyo Metro 1-day pass (¥600) only makes sense if you take five or more Metro journeys in one day — which is possible if you're covering a lot of ground. The Tokyo Free Kippu (¥1,600) covers all lines but is almost never worth it unless you're doing an unusually busy day of sightseeing. An IC card with pay-as-you-go is more flexible for most itineraries.",
  },
  {
    q: "Can I use Suica on all Tokyo trains?",
    a: "Yes. Suica (and Pasmo) work on all major train and subway operators in Tokyo — JR East, Tokyo Metro, Toei Subway, and most private railways. You can also use it on local buses. The only place Suica doesn't work is on long-distance shinkansen or special rapid trains that require a separate ticket.",
  },
  {
    q: "How do I get from Shinjuku to Shibuya?",
    a: "The fastest route is the Yamanote Line — just 5 minutes and ¥160 with an IC card. Trains run every 2–4 minutes during the day. From Shinjuku station, follow signs for the Yamanote Line (circular green line) and take a train in the direction of Osaki or Shinagawa.",
  },
  {
    q: "Is Google Maps accurate for Tokyo trains?",
    a: "Yes, very accurate. Google Maps has real-time Tokyo train schedules, shows transfer instructions, fare estimates, and even carriage position recommendations. It's the most widely used navigation tool by both tourists and locals in Tokyo. Download offline maps for your area as a backup.",
  },
];

export default function TokyoTransportationPage() {
  return (
    <>
      <Head>
        <title>Getting Around Tokyo 2026: Trains, Subway &amp; IC Cards | Japan Travel Kit</title>
        <meta
          name="description"
          content="How to get around Tokyo in 2026. We explain the Yamanote Line, Tokyo Metro, IC cards, and key routes — so you can navigate Japan's biggest city with confidence."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://japan-travel-kit.com/guides/transport/tokyo-transportation" />
        <meta property="og:title" content="Getting Around Tokyo 2026: Trains, Subway & IC Cards" />
        <meta property="og:url" content="https://japan-travel-kit.com/guides/transport/tokyo-transportation" />
        <meta property="og:description" content="How to get around Tokyo in 2026. We explain the Yamanote Line, Tokyo Metro, IC cards, and key routes — so you can navigate Japan's biggest city with confidence." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Getting Around Tokyo 2026: Trains, Subway & IC Cards" />
        <meta name="twitter:description" content="How to get around Tokyo in 2026. We explain the Yamanote Line, Tokyo Metro, IC cards, and key routes — so you can navigate Japan's biggest city with confidence." />
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
              headline: "Getting Around Tokyo (2026): Trains, Subway & IC Cards Explained",
              dateModified: "2026-04-30",
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
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Getting Around Tokyo", item: "https://japan-travel-kit.com/guides/transport/tokyo-transportation" },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Getting Around Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚆</span> Updated April 2026
          </p>
          <h1 className={styles.heroTitle}>
            Getting Around Tokyo (2026):<br />Trains, Subway &amp; IC Cards Explained
          </h1>
          <p className={styles.heroSubtitle}>
            Tokyo has the world&apos;s most complex train network — but once you know the basics, it&apos;s surprisingly easy to navigate.
          </p>
          <div className={styles.heroBadges}>
            {["Updated April 2026", "All Train Lines", "Beginner Friendly"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Best Option</p>
                <p className={styles.verdictStatValue}>IC Card (Suica / Pasmo)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Most Useful Line</p>
                <p className={styles.verdictStatValue}>Yamanote Line</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day Pass Worth It?</p>
                <p className={styles.verdictStatValue}>Rarely for most tourists</p>
              </div>
            </div>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.verdictBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Suica IC Card on Klook →
            </a>
          </div>
        </div>

        {/* Tokyo Network Basics */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Tokyo&apos;s Train Network: The Basics</h2>
          <div className={styles.whoForGrid}>
            {tokyoLines.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem" }}>
            The good news: you don&apos;t need to memorise all of this. An IC card works across all operators,
            and Google Maps handles routing automatically. Just tap in, follow the map, and tap out.
          </p>
        </section>

        {/* Yamanote Line */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Essential line</span>
          <h2 className={styles.sectionTitle}>The Yamanote Line</h2>
          <p className={styles.bodyText}>
            The Yamanote Line is the green circular JR line that loops around central Tokyo. It&apos;s the single most
            useful line for tourists and connects almost every major destination in one continuous loop.
          </p>
          <p className={styles.bodyText}>
            Key stations on the Yamanote Line include: <strong>Shinjuku</strong> (shopping, nightlife),
            <strong> Shibuya</strong> (scramble crossing, fashion), <strong>Harajuku</strong> (Takeshita Street, Meiji Shrine),
            <strong> Ebisu &amp; Osaki</strong> (quieter dining), <strong>Shinagawa</strong> (shinkansen connections),
            <strong> Tokyo</strong> (Tokyo Station, Imperial Palace), <strong>Ueno</strong> (museums, zoo, Senso-ji nearby),
            <strong> Akihabara</strong> (electronics, anime), and <strong>Ikebukuro</strong> (shopping, Sunshine City).
          </p>
          <p className={styles.bodyText}>
            Because it&apos;s a loop, you can travel in either direction — just pick the direction with fewer stops.
            Trains run every 2–4 minutes during the day and every 5–10 minutes late at night. Last trains run around midnight;
            after that, a taxi or ride-share is your only option.
          </p>
        </section>

        {/* Metro & Toei */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Subway</span>
          <h2 className={styles.sectionTitle}>Tokyo Metro &amp; Toei Subway</h2>
          <p className={styles.bodyText}>
            Tokyo Metro operates 9 lines covering central and eastern Tokyo, including the Ginza Line (oldest subway
            in Asia), Hibiya Line, and Chiyoda Line. Toei Subway adds 4 more lines, including the Oedo Line which
            reaches Roppongi, Shinjuku, and Asakusa in a loop shape.
          </p>
          <p className={styles.bodyText}>
            The practical difference for tourists: Tokyo Metro and Toei are separate companies, so a journey
            requiring a transfer between the two will be charged as two separate fares. An IC card handles this
            automatically — you don&apos;t need to think about it.
          </p>
          <p className={styles.bodyText}>
            The <strong>Tokyo Metro 1-day pass (¥600)</strong> covers all 9 Metro lines unlimited. It makes sense if you
            plan to take 5+ Metro rides in a single day — for example, a day visiting Asakusa, Ginza, Roppongi, and Shibuya.
          </p>
        </section>

        {/* IC Card section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>IC cards</span>
          <h2 className={styles.sectionTitle}>IC Card in Tokyo: Suica vs Pasmo</h2>
          <p className={styles.bodyText}>
            <strong>Suica</strong> (issued by JR East) and <strong>Pasmo</strong> (issued by Tokyo Metro and private railways)
            are interchangeable for all practical purposes in Tokyo. Both work on every train, subway, bus, and in most
            convenience stores, vending machines, and some restaurants.
          </p>
          <p className={styles.bodyText}>
            The easiest way to get a Suica is through the <strong>Wallet app on iPhone</strong> or <strong>Google Pay on Android</strong>
            — no physical card required. Alternatively, buy a physical Suica or Pasmo at any major station, or pre-order
            a Suica on Klook before you travel to have it ready to use when you land.
          </p>
          <div style={{ margin: "1.5rem 0" }}>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.pickCta}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Pre-order Suica IC Card on Klook →
            </a>
          </div>
        </section>

        {/* Key Routes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Key routes</span>
          <h2 className={styles.sectionTitle}>Getting Around: Key Routes</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From", "To", "Line", "Time", "Price (IC)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keyRoutes.map((row) => (
                    <tr key={`${row.from}-${row.to}`}>
                      <td className={styles.tdProvider}>{row.from}</td>
                      <td className={styles.tdProvider}>{row.to}</td>
                      <td className={styles.tdNetwork}>{row.line}</td>
                      <td style={{ fontWeight: 700, color: "#0d1b4b" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#9ca3af" }}>
            Prices shown are approximate IC card fares. Cash ticket fares are slightly higher.
          </p>
        </section>

        {/* Day Passes */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day passes</span>
          <h2 className={styles.sectionTitle}>Day Pass Options in Tokyo</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price", "Covers", "Worth It?"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayPasses.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td className={styles.tdBestFor}>{row.covers}</td>
                      <td style={{ color: row.worth === "Rarely" ? "#c62828" : "#374151", fontWeight: 600 }}>{row.worth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For most tourists, pay-as-you-go with an IC card is cheaper and more flexible. Day passes only make
            financial sense on unusually busy days of sightseeing with many short journeys.
          </p>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>Tips for Using Tokyo Trains</h2>
          <div className={styles.stepsList}>
            {trainTips.map((tip, i) => (
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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget Guide (2026): How Much Does Japan Cost?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Pre-order your Suica IC Card</h2>
            <p className={styles.ctaBannerDesc}>
              Skip the queues at Tokyo Station. Get your Suica ready before you land and tap straight through
              the turnstile on arrival.
            </p>
            <a
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Suica on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
