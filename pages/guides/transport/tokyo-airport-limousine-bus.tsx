import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";

const NARITA_BUS_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264852&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F2274-narita-airport-limousine-bus-tokyo%2F";
const HANEDA_BUS_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264856&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F150434-haneda-airport-limousine-bus-tokyo%2F";

const fareRows = [
  { airport: "Narita (NRT)", time: "90–120 min", price: "¥3,200",  note: "Traffic-dependent; longer in rush hour" },
  { airport: "Haneda (HND)", time: "30–60 min",  price: "¥1,200",  note: "Much closer to the city than Narita" },
];

const whenBusWins = [
  {
    title: "You have heavy or bulky luggage",
    desc: "The limousine bus loads your bags into the cargo hold — no wrestling suitcases up station stairs or through crowded train carriages. This is the single biggest reason travellers choose the bus over the Skyliner or N'EX.",
  },
  {
    title: "You want zero transfers",
    desc: "Many routes run directly to major hotels and districts, so you board once and get off near your door. With young children, elderly travellers, or a lot of gear, skipping every transfer is worth a slightly longer ride.",
  },
  {
    title: "You land late at night or very early",
    desc: "Airport buses run later into the evening than most airport trains. If your flight arrives after the trains wind down, the bus is often the cheapest option left before a taxi. Confirm the last departure for your route — times are a 2026 guide and can change.",
  },
  {
    title: "Your hotel is right by a bus stop",
    desc: "If your accommodation is on or near a limousine-bus route, the door-to-near-door convenience can beat a faster train that still leaves you with a transfer and a walk at the other end.",
  },
];

const destinationPoints = [
  {
    title: "Major hotels & city hubs",
    desc: "Limousine buses serve major hotel areas and hubs including Shinjuku, Tokyo Station, Ginza, Akasaka, and Ikebukuro, with some routes stopping at individual hotels. Routing is organised via the Tokyo City Air Terminal (TCAT) network.",
  },
  {
    title: "Leisure destinations",
    desc: "Selected routes also serve leisure spots such as the Odaiba bay area and the Tokyo Disney Resort. Exact routes, journey times, and fares for these vary — treat them as a 2026 guide and confirm before booking.",
  },
  {
    title: "Both Narita and Haneda",
    desc: "Buses operate from both airports. From Narita, allow 90–120 minutes to central Tokyo (¥3,200). From Haneda, the same trip is far shorter at 30–60 minutes (¥1,200), since Haneda sits much closer to the city.",
  },
];

const tipPoints = [
  {
    title: "Book ahead in busy periods",
    desc: "Pre-booking guarantees a seat on popular routes during peak travel seasons and saves queuing at the airport counter after a long flight. It also locks in your fare.",
  },
  {
    title: "Build in a buffer for traffic",
    desc: "Tokyo expressway traffic is heaviest around 7–9am and 5–8pm. From Narita especially, add extra time if you travel during rush hour — the train is more predictable when the roads are jammed.",
  },
  {
    title: "Consider luggage forwarding instead",
    desc: "If you'd rather take a fast train but dread the bags, takkyubin courier services ship luggage from the airport to your hotel for roughly ¥1,500–3,000 per bag (a 2026 guide), arriving the next day. Travel light by train and let your cases follow.",
  },
];

const faqItems = [
  {
    q: "Is the airport limousine bus better than the train in Tokyo?",
    a: "It depends on your priorities. The bus wins when you have heavy luggage, want a transfer-free ride to your hotel, land late at night, or are staying right by a bus stop. The train (Skyliner or N'EX) wins on speed and predictability, especially in rush-hour traffic. For most light-luggage travellers heading to a station-side hotel, the train is faster; for everyone hauling big suitcases, the bus is easier.",
  },
  {
    q: "How much is the limousine bus from Narita to Tokyo?",
    a: "Around ¥3,200 one-way, with a journey of roughly 90–120 minutes depending on traffic. That's similar in price to the train but slower — the trade-off is that you load your luggage into the hold and, on many routes, ride directly to a major hotel area without changing.",
  },
  {
    q: "How much is the limousine bus from Haneda?",
    a: "About ¥1,200 one-way, taking roughly 30–60 minutes. Haneda is much closer to central Tokyo than Narita, so the bus is both cheaper and quicker from there. For many central hotels it's a genuinely convenient door-to-near-door option.",
  },
  {
    q: "Does the airport bus run late at night?",
    a: "Airport limousine buses generally run later into the evening than the airport trains, which makes them a useful option for late arrivals before you're left with only a taxi. Exact last-departure times vary by route and change over time, so confirm the schedule for your specific destination when you book.",
  },
  {
    q: "Should I book the airport bus in advance?",
    a: "It's worth it during busy travel periods — pre-booking guarantees a seat, locks in the fare, and saves queuing at the counter after landing. On quieter days you can usually buy at the airport, but advance booking removes the uncertainty after a long flight.",
  },
];

export default function TokyoAirportLimousineBusPage() {
  return (
    <>
      <Head>
        <title>Tokyo Airport Limousine Bus 2026: When the Bus Beats the Train | Japan Travel Kit</title>
        <meta
          name="description"
          content="When is the Tokyo airport limousine bus better than the train? We cover Narita & Haneda fares, journey times, destinations, and when the bus beats the Skyliner or N'EX in 2026."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-airport-limousine-bus" />
        <meta property="og:title" content="Tokyo Airport Limousine Bus (2026): When the Bus Beats the Train" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-airport-limousine-bus" />
        <meta property="og:description" content="When is the Tokyo airport limousine bus better than the train? We cover Narita & Haneda fares, journey times, destinations, and when the bus beats the Skyliner or N'EX in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Airport Limousine Bus (2026): When the Bus Beats the Train" />
        <meta name="twitter:description" content="When is the Tokyo airport limousine bus better than the train? We cover Narita & Haneda fares, journey times, destinations, and when the bus beats the Skyliner or N'EX in 2026." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",      item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",    item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Tokyo Airport Limousine Bus", item: "https://www.japan-travel-kit.com/guides/transport/tokyo-airport-limousine-bus" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Tokyo Airport Limousine Bus (2026): When the Bus Beats the Train",
              dateModified: "2026-06-03",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo Airport Limousine Bus</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🚌</span> Updated June 2026
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Airport Limousine Bus (2026):<br />When the Bus Beats the Train
          </h1>
          <p className={styles.heroSubtitle}>
            The train is usually faster — but for heavy bags, late arrivals, and door-to-door ease, the bus often wins.
          </p>
          <div className={styles.heroBadges}>
            {["Updated June 2026", "Narita & Haneda", "2026 Fares"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Narita bus</p>
                <p className={styles.verdictStatValue}>90–120 min, ¥3,200</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Haneda bus</p>
                <p className={styles.verdictStatValue}>30–60 min, ¥1,200</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bus wins when</p>
                <p className={styles.verdictStatValue}>Heavy bags / no transfers</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> Take the limousine bus when you have <strong>heavy luggage</strong>, want a
              <strong> transfer-free ride</strong> to your hotel, land <strong>late at night</strong>, or are staying
              right by a stop. Otherwise the <strong>train is faster</strong> — especially in rush-hour traffic.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              This guide focuses on the bus. For the train side of the decision, see{" "}
              <Link href="/guides/transport/skyliner-vs-nex" style={{ fontWeight: 600 }}>Skyliner vs N&apos;EX</Link>,
              and for every option compared, our{" "}
              <Link href="/guides/transport/tokyo-airport-transfer" style={{ fontWeight: 600 }}>Tokyo airport transfer guide</Link>.
            </p>
          </div>
        </div>

        {/* Fares table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fares &amp; times</span>
          <h2 className={styles.sectionTitle}>Limousine Bus Fares from Each Airport</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Airport", "Time", "Price", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider}>{row.airport}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Fares and times are approximate 2026 figures to central Tokyo and vary by route and traffic — confirm before booking. Journey times to your specific stop may differ.
          </p>
        </section>

        {/* When the bus wins */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>When to choose the bus</span>
          <h2 className={styles.sectionTitle}>Four Times the Bus Beats the Train</h2>
          <div className={styles.stepsList}>
            {whenBusWins.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Where it goes</span>
          <h2 className={styles.sectionTitle}>Where the Limousine Bus Takes You</h2>
          <div className={styles.stepsList}>
            {destinationPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={NARITA_BUS_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Book Narita Limousine Bus on Klook →
            </a>
            <a href={HANEDA_BUS_URL} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Book Haneda Limousine Bus on Klook →
            </a>
          </div>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Practical tips</span>
          <h2 className={styles.sectionTitle}>Tips for Taking the Airport Bus</h2>
          <div className={styles.stepsList}>
            {tipPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verdict */}
        <section className={styles.verdictSection}>
          <span className={styles.sectionLabel}>Bottom line</span>
          <h2 className={styles.sectionTitle}>The Verdict</h2>
          <p className={styles.verdictText}>
            The limousine bus isn&apos;t about speed — the Skyliner and N&apos;EX will almost always get you there
            faster. It&apos;s about <strong>ease</strong>: bags in the hold, no transfers, and on many routes a stop
            right by your hotel.
          </p>
          <p className={styles.verdictText}>
            Choose the bus if you&apos;re travelling heavy, arriving late, or staying near a stop. Choose the train if
            speed and predictability matter more — particularly from Narita during rush hour. For the train comparison,
            see <Link href="/guides/transport/skyliner-vs-nex" style={{ fontWeight: 600 }}>Skyliner vs N&apos;EX</Link>.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/skyliner-vs-nex" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="10" rx="2" />
                  <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                  <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
                  <circle cx="17" cy="17" r="1" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Skyliner vs N&apos;EX (2026): Best Train from Narita to Tokyo?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Compare Japan Transport Options →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Travelling with heavy luggage?</h2>
            <p className={styles.ctaBannerDesc}>
              Skip the station stairs. Book the airport limousine bus online, load your bags into the hold, and ride
              straight toward your hotel.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={NARITA_BUS_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Narita Bus →
              </a>
              <a href={HANEDA_BUS_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
                Haneda Bus →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
