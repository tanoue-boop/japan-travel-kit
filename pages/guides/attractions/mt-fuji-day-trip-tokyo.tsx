import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

// TODO: replace with Klook affiliate redirect (aid=119070&aff_adid=...) once generated
const FUJI_TOUR_URL = "https://www.klook.com/en-US/activity/601-mount-fuji-hakone-day-tour-tokyo/";

const compareRows = [
  {
    option: "Group bus tour",
    cost: "from ~$90–180 (2026, variable — confirm at booking)",
    flexibility: "Fixed route & timings",
    effort: "Very low — pickup, guide, all transport sorted",
    bestFor: "First-timers who want the highlights with zero planning",
  },
  {
    option: "Private tour",
    cost: "from ~$399 (2026, variable — confirm at booking)",
    flexibility: "Build your own itinerary & pace",
    effort: "Low — driver/guide handles logistics for your group",
    bestFor: "Families, photographers, or groups wanting a custom day",
  },
  {
    option: "DIY by train",
    cost: "Cheapest — train/bus fares only",
    flexibility: "Total control, but you manage every connection",
    effort: "High — timetables, transfers, weather all on you",
    bestFor: "Confident, budget-minded travelers happy to plan",
  },
];

const whoFor = [
  {
    title: "Take a group bus tour if…",
    desc: "You want the classic highlights — Chureito Pagoda, Lake Kawaguchiko, and a Fuji viewpoint — without juggling timetables. A guide handles the driving and timing, and you simply enjoy the day. It's the easiest, most popular way to see Fuji from Tokyo.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M3 11h18" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="16.5" cy="19" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Book a private tour if…",
    desc: "You're traveling as a family or small group, want to set your own pace, or you're chasing the perfect photo. A private driver-guide lets you mix Kawaguchiko, Oshino Hakkai, and Hakone as you like, and lingers where you want to linger.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    ),
  },
  {
    title: "Go DIY by train if…",
    desc: "You're a confident, budget-minded traveler comfortable with Japanese transit. The Shinjuku to Kawaguchiko run takes about two hours, and from there local buses reach the main sights. It's cheaper, but the timing and weather are entirely on you.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Block out a full day — it's 10–12 hours round trip",
    desc: "A Mt. Fuji day trip from Tokyo is a long one. Shinjuku to Kawaguchiko alone is about two hours each way, and you'll add stops on top. Don't try to squeeze anything else into the same day.",
  },
  {
    title: "Pick your view: Kawaguchiko vs Hakone",
    desc: "The Kawaguchiko side delivers the postcard shots — Chureito Pagoda, the lake, and the 5th Station. The Hakone set swaps in the Owakudani ropeway, a Lake Ashi cruise, and the famous black eggs. Many tours combine elements of both.",
  },
  {
    title: "Aim for clear-view season (roughly Nov–Feb)",
    desc: "Fuji is shy. Drier, clearer winter air from about November to February gives you the best odds of a sharp, cloud-free summit. Summer is greener but often hazy, with the peak hidden behind cloud.",
  },
  {
    title: "Decide tour vs DIY, then book ahead",
    desc: "If you'd rather not wrangle multiple trains and buses against the weather, a guided tour is the easy option. Group tours run roughly $90–180 and private tours from about $399 (2026, variable). Book a few days ahead in peak seasons.",
  },
];

const faqItems = [
  {
    q: "How long does a Mt. Fuji day trip from Tokyo take?",
    a: "Plan for a long day — roughly 10 to 12 hours round trip. Shinjuku to Kawaguchiko is about two hours each way on its own, and you'll add time for the stops you combine, such as Chureito Pagoda, Lake Kawaguchiko, Oshino Hakkai, or the Fuji Subaru Line 5th Station. Guided bus tours typically build this into a single full-day itinerary with pickup and drop-off in Tokyo.",
  },
  {
    q: "Can you actually see Mt. Fuji in a day?",
    a: "Yes — but the mountain is famously shy. On a clear day you'll get superb views from spots like Chureito Pagoda or Lake Kawaguchiko, and you can ascend by road to the 5th Station. On a cloudy or hazy day, Fuji may stay hidden behind cloud for hours. The single biggest factor is the weather, so check the forecast and, where possible, choose a flexible or cancellable booking.",
  },
  {
    q: "What's the best time of year for clear Fuji views?",
    a: "Roughly November to February. The drier, clearer winter air gives you the best odds of a sharp, cloud-free summit, often with snow on top for the classic look. Spring and autumn can be lovely but more variable, while summer is greener yet frequently hazy, with the peak often hidden. If a clear view matters most to you, lean toward the colder months.",
  },
  {
    q: "Is it better to take a tour or do it yourself?",
    a: "It depends on your priorities. Arranging the trip independently means juggling multiple trains and buses, tight timings, and the weather — doable and cheaper for confident travelers, but fiddly. A guided tour is the easy option: a single booking covers transport, timing, and a route through the main sights, so you just turn up. Group bus tours run roughly $90–180 and private tours from about $399 (2026, variable — confirm at booking).",
  },
  {
    q: "Should I visit Hakone or Kawaguchiko?",
    a: "Both sit near Fuji but offer different days out. The Kawaguchiko side is the classic Fuji-viewing area — Chureito Pagoda's five-storey pagoda with Fuji behind it, Lake Kawaguchiko, Oshino Hakkai's spring-water ponds, and the Fuji Subaru Line 5th Station. Hakone is more about the hot-spring resort experience: the Owakudani ropeway, a Lake Ashi cruise, and the famous black eggs (kuro-tamago). Many day tours combine elements of both into one loop.",
  },
];

export default function MtFujiDayTripTokyoPage() {
  return (
    <>
      <Head>
        <title>Mt Fuji Day Trip from Tokyo (2026): Tours, Routes &amp; Tips | Japan Travel Kit</title>
        <meta
          name="description"
          content="Plan a Mt Fuji day trip from Tokyo in 2026: how long it takes, the best season for clear views, key stops like Chureito Pagoda and Kawaguchiko, and tour vs DIY by train."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-trip-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mt Fuji Day Trip from Tokyo (2026): Tours, Routes & Tips" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-trip-tokyo" />
        <meta property="og:description" content="Plan a Mt Fuji day trip from Tokyo in 2026: how long it takes, the best season for clear views, key stops like Chureito Pagoda and Kawaguchiko, and tour vs DIY by train." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mt Fuji Day Trip from Tokyo (2026): Tours, Routes & Tips" />
        <meta name="twitter:description" content="Plan a Mt Fuji day trip from Tokyo in 2026: how long it takes, the best season for clear views, key stops like Chureito Pagoda and Kawaguchiko, and tour vs DIY by train." />
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
              headline: "Mt Fuji Day Trip from Tokyo (2026): Tours, Routes & Tips",
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
                { "@type": "ListItem", position: 4, name: "Mt Fuji Day Trip from Tokyo", item: "https://www.japan-travel-kit.com/guides/attractions/mt-fuji-day-trip-tokyo" },
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
          <span className={styles.breadCurrent}>Mt Fuji Day Trip from Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🗻</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Mt Fuji Day Trip from Tokyo (2026):<br />Tours, Routes &amp; Tips
          </h1>
          <p className={styles.heroSubtitle}>
            Japan&apos;s most iconic mountain in a single day. Here&apos;s how long it really takes, the best
            season for clear views, the stops worth combining, and whether to book a tour or go it alone.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Tour vs DIY", "Best Season Tips"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Time needed</p>
                <p className={styles.verdictStatValue}>10–12 hours round trip</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinjuku → Kawaguchiko</p>
                <p className={styles.verdictStatValue}>About 2 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best clear-view season</p>
                <p className={styles.verdictStatValue}>Roughly Nov–Feb</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Easiest way</p>
                <p className={styles.verdictStatValue}>Guided tour (transport sorted)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Seeing Fuji in a day from Tokyo means a long 10–12 hour round trip and a
              lot of moving parts. Doing it yourself by train is cheaper, but a guided bus or private tour bundles
              the transport, timing, and main viewpoints into one booking — the easy option if you&apos;d rather
              not fight timetables and weather.
            </p>
            <a href={FUJI_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check Mt Fuji &amp; Hakone Day Tours →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What a Mt. Fuji Day Trip Looks Like</h2>
          <p className={styles.bodyText}>
            Mt. Fuji is close enough to Tokyo to see and back in a single day, but only just. Expect a full
            outing of roughly 10 to 12 hours door to door. The fastest core leg, Shinjuku to Lake Kawaguchiko,
            takes about two hours each way, and that&apos;s before you add the stops that make the trip worth it.
          </p>
          <p className={styles.bodyText}>
            On the Kawaguchiko side, the classic combination is Arakurayama Sengen Park and its Chureito Pagoda
            (the famous five-storey-pagoda-with-Fuji shot), the village of Oshino Hakkai with its clear
            spring-water ponds, Lake Kawaguchiko itself, and a drive up the Fuji Subaru Line to the 5th Station
            (Go-me). A popular alternative or add-on is the Hakone set: the Owakudani ropeway, a cruise on Lake
            Ashi, and the famous black eggs (kuro-tamago) cooked in the volcanic springs.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>How to go</span>
          <h2 className={styles.sectionTitle}>Group Tour vs Private Tour vs DIY by Train</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Cost", "Flexibility", "Effort", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.option}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.flexibility}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.effort}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Prices are indicative for 2026 and vary by season, group size, and inclusions — confirm at booking.
            DIY by train is genuinely cheaper and entirely possible, but the planning, transfers, and weather
            risk all fall on you. For trains and IC cards, see our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              Getting Around Tokyo guide
            </Link>.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which is right for you</span>
          <h2 className={styles.sectionTitle}>Who Should Choose What</h2>
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

        {/* Step-by-step planning */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Plan Your Fuji Day</h2>
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

        {/* Getting there / DIY note */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Doing it yourself</span>
          <h2 className={styles.sectionTitle}>The DIY Route by Train &amp; Bus</h2>
          <p className={styles.bodyText}>
            If you&apos;re confident with Japanese transit and want to save money, the independent route is
            straightforward in theory. From Shinjuku, a limited express or highway bus reaches Kawaguchiko in
            about two hours, and from there local buses connect Chureito Pagoda, Oshino Hakkai, the lake, and
            the Fuji Subaru Line 5th Station. The catch is timing: miss a bus and your whole day shifts, and a
            single cloudy spell can hide the mountain entirely.
          </p>
          <p className={styles.bodyText}>
            If you&apos;re using rail elsewhere on your trip, check whether a pass helps with our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan Rail Pass guide (2026)
            </Link>. For a day trip alone, though, point-to-point tickets or a guided tour usually make more
            sense than a rail pass.
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
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Rail Pass Guide (2026)</p>
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
            <h2 className={styles.ctaBannerTitle}>See Fuji without the planning</h2>
            <p className={styles.ctaBannerDesc}>
              Skip the timetable maths and weather guesswork. A guided Mt. Fuji &amp; Hakone day tour from Tokyo
              bundles transport, timing, and the main viewpoints into one easy booking.
            </p>
            <a href={FUJI_TOUR_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
              View Mt Fuji &amp; Hakone Day Tours →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
