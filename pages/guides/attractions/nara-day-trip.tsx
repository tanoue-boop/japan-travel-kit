import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { kyotoNaraArashiyamaTour, arashiyamaNaraTodaijiTour, osakaAmazingPass } from "../../../lib/klook-links";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026).
const NARA_TOUR_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1307051&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F87236-kyoto-tour-nara%2F";

// Todai-ji admissions and hours read off todaiji.or.jp on 19 Oct 2026 — the same figures our
// Kyoto-and-Nara tour guide uses. No tour price is quoted: Klook answers automated reads of
// its product pages with HTTP 403.
const CHECKED = "19 October 2026";

const compareRows = [
  {
    option: "DIY by train",
    cost: "Local and express fares only, and an IC card covers them",
    flexibility: "Total — go when and where you like",
    effort: "Low — one easy train, then walk",
  },
  {
    option: "Guided day tour",
    cost: "One booking, usually pairing Nara with half of Kyoto",
    flexibility: "Fixed route & timings",
    effort: "Very low — transport and guide sorted",
  },
];

const admissionRows = [
  { ticket: "Daibutsuden (Great Buddha Hall), adult", price: "¥800" },
  { ticket: "Daibutsuden, ages 6–12", price: "¥400" },
  { ticket: "Daibutsuden + Todaiji Museum, adult", price: "¥1,200" },
  { ticket: "Daibutsuden + Todaiji Museum, ages 6–12", price: "¥600" },
  { ticket: "Nara Park and the deer", price: "Free" },
];

const whoFor = [
  {
    title: "Do it yourself if…",
    desc: "You want the cheapest, simplest version. Nara is barely an hour from Kyoto or Osaka, the main sights cluster around one walkable park, and you can set your own pace — lingering with the deer or leaving early as you like.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="14" rx="3" />
        <line x1="4" y1="10" x2="20" y2="10" />
        <path d="M7 21l2-4M17 21l-2-4" />
      </svg>
    ),
  },
  {
    title: "Take a guided tour if…",
    desc: "You'd rather cover more in one day. Many Nara tours pair it with Kyoto highlights like Arashiyama, Fushimi Inari, or Uji, with transport and an English-speaking guide handling the logistics — efficient if your days are limited.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Go half-day if…",
    desc: "You're short on time. The deer park and Todai-ji can be seen in a focused half-day, leaving the afternoon for Kyoto or Osaka. A full day lets you add Kasuga Taisha and a slower wander through the old streets.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Pick your base — Kyoto or Osaka",
    desc: "Both sit roughly an hour from Nara, so you can day-trip from either. From Kyoto and Osaka there are direct train lines that drop you a short walk from the park, which keeps the trip simple even without a tour.",
  },
  {
    title: "Head straight for Nara Park and the deer",
    desc: "The park is free to walk through and full of free-roaming deer, many of which bow for the crackers (shika senbei) sold by licensed vendors. They are wild animals, so keep food out of sight until you are ready and watch bags and maps — they will nibble paper.",
  },
  {
    title: "See Todai-ji's Great Buddha — this is the part that costs money",
    desc: `Todai-ji's Daibutsuden, one of the world's largest wooden buildings, houses a monumental bronze Great Buddha, and it is the one ticket on a standard Nara day. Admission is ¥800 for an adult and ¥400 for ages 6 to 12; a combined ticket with the Todaiji Museum is ¥1,200 and ¥600. The hall closes at 17:30 from April to October and 17:00 from November to March. Read off Todai-ji's official site on ${CHECKED}.`,
  },
  {
    title: "Add Kasuga Taisha if you have time",
    desc: "Kasuga Taisha, the atmospheric shrine lined with stone and bronze lanterns, sits a wooded walk beyond Todai-ji. The grounds are largely free, with charges for certain inner areas. It is the natural third stop on a full day and an easy thing to drop if you are keeping the trip short.",
  },
];

const faqItems = [
  {
    q: "How do I get to Nara from Kyoto or Osaka?",
    a: "Nara is about an hour from both cities by train, with direct lines that drop you a short walk from Nara Park. That proximity is exactly why it's such a popular day trip — you can go independently with a simple train ride, or join a guided tour that handles the transport for you.",
  },
  {
    q: "Is Nara worth a day trip?",
    a: "For most visitors, yes. In a compact, walkable area you get the free-roaming deer of Nara Park, the Great Buddha at Todai-ji, and the lantern-lined Kasuga Taisha shrine. It's easy to reach from Kyoto or Osaka, works as a half-day or full day, and offers a calmer counterpoint to the bigger cities.",
  },
  {
    q: "Should I do Nara by train or on a guided tour?",
    a: "Going by train is the cheapest and simplest option — Nara is close, the sights cluster around one park, and you control your own pace. A guided tour costs more but often bundles Nara with Kyoto highlights such as Arashiyama, Fushimi Inari, or Uji, with transport and a guide sorted. Choose DIY for budget and flexibility, a tour for convenience and coverage.",
  },
  {
    q: "Are the Nara deer safe, and can I feed them?",
    a: "The deer are wild animals that roam freely, and you can feed them special crackers (shika senbei) sold by licensed vendors around the park. Many will bow for food. Keep crackers hidden until you're ready, feed one at a time, and watch loose paper, maps, and bags — they're known to nibble. Supervise young children, as the deer can get pushy at feeding time.",
  },
  {
    q: "How much does it cost to enter Todai-ji?",
    a: `The Daibutsuden (Great Buddha Hall) is ¥800 for an adult and ¥400 for ages 6 to 12, and a combined ticket with the Todaiji Museum is ¥1,200 for an adult and ¥600 for a child. Groups of 30 or more pay less. Nara Park and the deer lawns are free to wander, and Kasuga Taisha's grounds are largely free, with charges for certain inner areas — so on a typical day in Nara, Todai-ji is the only admission you actually pay. Read off Todai-ji's official site on ${CHECKED} and subject to change.`,
  },
  {
    q: "What are Todai-ji's opening hours?",
    a: `The Great Buddha Hall is open 7:30–17:30 from April to October and 8:00–17:00 from November to March. The Todaiji Museum runs 9:30–17:30 with last admission at 17:00 in the April–October period, and 9:30–17:00 with last admission at 16:30 from November to March. This matters on short winter days, and especially on a guided tour whose timings you do not control — a late-running itinerary can reach the hall after the doors have shut. Checked ${CHECKED}.`,
  },
  {
    q: "How long do I need in Nara?",
    a: "A focused half-day is enough for the deer park and Todai-ji, leaving the rest of the day for Kyoto or Osaka. A full day lets you add Kasuga Taisha and slow down — wandering the old town, the lantern paths, and the wider park at a relaxed pace.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/nara-day-trip") } });

export default function NaraDayTripPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs | Japan Travel Kit</title>
        <meta
          name="description"
          content="Nara day trip in 2026: under an hour by train from Osaka or Kyoto, a free deer park, and Todai-ji's official ¥800 Great Buddha Hall admission — the only ticket a standard visit needs."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/nara-day-trip" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/nara-day-trip" />
        <meta property="og:description" content="Nara day trip in 2026: under an hour by train from Osaka or Kyoto, a free deer park, and Todai-ji's official ¥800 Great Buddha Hall admission — the only ticket a standard visit needs." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs" />
        <meta name="twitter:description" content="Nara day trip in 2026: under an hour by train from Osaka or Kyoto, a free deer park, and Todai-ji's official ¥800 Great Buddha Hall admission — the only ticket a standard visit needs." />
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
              headline: "Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs",
              dateModified: updated.iso,
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
                { "@type": "ListItem", position: 4, name: "Nara Day Trip", item: "https://www.japan-travel-kit.com/guides/attractions/nara-day-trip" },
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
          <span className={styles.breadCurrent}>Nara Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🦌</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Nara Day Trip (2026):<br />From Osaka or Kyoto, and What Todai-ji Costs
          </h1>
          <p className={styles.heroSubtitle}>
            An hour from Kyoto or Osaka: 1,200-plus bowing deer, the Great Buddha at Todai-ji, and lantern-lined
            Kasuga Taisha. Here&apos;s how to do it by train — or by guided tour — and what to expect.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Train or Tour", "Half or Full Day"].map((t) => (
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
                <p className={styles.verdictStatLabel}>From Kyoto / Osaka</p>
                <p className={styles.verdictStatValue}>~1 hour by train</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Main draws</p>
                <p className={styles.verdictStatValue}>Deer, Todai-ji, Kasuga Taisha</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Todai-ji hall</p>
                <p className={styles.verdictStatValue}>¥800 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Nara Park</p>
                <p className={styles.verdictStatValue}>Free</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Nara is the cheapest good day out in Kansai. It is under an hour by
              train from either Kyoto or Osaka, the park and the deer cost nothing, and the Great Buddha Hall
              at Todai-ji is ¥800 for an adult — which is the only admission a standard visit involves. A
              half-day covers the park and Todai-ji; a full day adds Kasuga Taisha and a slower wander. Take
              a guided tour only if you want half of Kyoto bolted onto the same day, and check whether the
              ¥800 is in the price, because some itineraries stop at the park.
            </p>
            <a href={NARA_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Nara Day Tours →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why Nara Makes Such an Easy Day Trip</h2>
          <p className={styles.bodyText}>
            Nara was Japan&apos;s capital long before Kyoto, and it has held onto a quiet, historic feel that
            makes it a refreshing break from the bigger cities. The reason it works so well as a day trip is
            simple geography: it sits roughly an hour by train from both Kyoto and Osaka, and its headline sights
            are clustered around a single large park you can cross on foot.
          </p>
          <p className={styles.bodyText}>
            That compactness means you don&apos;t have to choose between Nara and everything else — many visitors
            fold it into a Kansai itinerary as a half-day, or give it a full day to slow right down. Below we
            compare doing it independently versus on a guided tour, then walk through the route and the practical
            details.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Train vs tour</span>
          <h2 className={styles.sectionTitle}>DIY by Train vs a Guided Tour</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Cost", "Flexibility", "Effort"].map((h) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Most guided options pair Nara with Kyoto highlights such as Arashiyama, Fushimi Inari or Uji — our{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kyoto and Nara day tour comparison
            </Link>{" "}
            puts four of those itineraries side by side. We do not quote tour prices here, because Klook
            blocks automated reads of its product pages — open a listing for the figure on your date.
          </p>
        </section>

        {/* Admissions */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it costs</span>
          <h2 className={styles.sectionTitle}>The One Ticket You Actually Pay For</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Nara is unusually cheap for a day with this much in it, because the deer park — the thing most
            people come for — costs nothing. The Great Buddha Hall is the single admission on a standard
            visit.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {admissionRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "#6b7280" }}>
            Read off Todai-ji&apos;s official site on {CHECKED}. Groups of 30 or more pay less. The Great
            Buddha Hall is open 7:30–17:30 from April to October and 8:00–17:00 from November to March.
            Subject to change — confirm before you go.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>How Should You Do Nara?</h2>
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

        {/* Route / steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>A Simple Nara Route</h2>
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

        <KlookTourPicks
          heading="Nara With Kyoto, in One Day"
          intro="The guided itineraries that fold Nara Park and Todai-ji into a Kyoto day out of Osaka, plus the Osaka pass if you are basing yourself there. Open a listing for the current price on your date."
          tours={[
            {
              title: "Kyoto & Nara day trip: Kiyomizu-dera, Fushimi Inari & Nara Park",
              desc: "The temple-and-shrine version of the day, departing from either Osaka or Kyoto",
              url: NARA_TOUR_URL,
            },
            kyotoNaraArashiyamaTour,
            arashiyamaNaraTodaijiTour,
            osakaAmazingPass,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7" />
                  <path d="M9 11h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Kyoto (2026): Temples, Timing and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Metro, IC Cards &amp; Passes</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Kansai Airport to Osaka &amp; Kyoto</p>
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
            <h2 className={styles.ctaBannerTitle}>Plan your Nara day</h2>
            <p className={styles.ctaBannerDesc}>
              Going independently by train is cheap and easy. If you&apos;d rather pack more into one day, a
              guided tour can pair Nara with Kyoto highlights and sort the transport for you.
            </p>
            <a href={NARA_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              Browse Nara Day Tours →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
