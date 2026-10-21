import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { tokyoSubwayTicket, subwayCityViewCombo, naritaBusSubwayCombo, tokyoSightseeingBusTour } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";

// Pass prices from tokyometro.jp and the Tokyo Metro adult fare table, both read 19 Oct
// 2026. The 24-hour adult and child prices and the check date are owned by
// lib/attraction-prices.ts, shared with the ticket price table.
const P = PRICES.tokyoSubwayTicket;
const CHECKED = checkedLabel(P.checked);

const priceRows = [
  { pass: "24-hour ticket", adult: P.adult, child: P.child, perDay: "¥1,000 / day" },
  { pass: "48-hour ticket", adult: "¥1,500", child: "¥750", perDay: "¥750 / day" },
  { pass: "72-hour ticket", adult: "¥2,000", child: "¥1,000", perDay: "¥667 / day" },
];

const fareRows = [
  { band: "1–6 km", ic: "¥178", paper: "¥180" },
  { band: "7–11 km", ic: "¥209", paper: "¥210" },
  { band: "12–19 km", ic: "¥252", paper: "¥260" },
  { band: "20–27 km", ic: "¥293", paper: "¥300" },
  { band: "28–40 km", ic: "¥324", paper: "¥330" },
];

const whoFor = [
  {
    title: "Buy the 72-hour if…",
    desc: "You have three subway-heavy days in central Tokyo. At ¥2,000 it works out to about ¥667 a day, which four short Metro rides already exceed. This is the version that pays for itself on an ordinary sightseeing day rather than a frantic one.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Skip it if…",
    desc: "Your itinerary runs along the Yamanote Line. The pass covers Tokyo Metro and Toei Subway only — JR is not included, and Shibuya, Shinjuku, Shinagawa and Ueno are all Yamanote stops. A pay-as-you-go IC card handles both networks without the arithmetic.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 8l8 8M16 8l-8 8" />
      </svg>
    ),
  },
  {
    title: "The 24-hour is the marginal one…",
    desc: "At ¥1,000 you need roughly five or six subway rides in a single 24-hour window to break even, depending on distance. That is a lot for one day unless you are deliberately crossing the city. Check your route before you buy this tier.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Count your subway rides, not your days",
    desc: `The clock runs in hours from first use, not calendar days, so a 24-hour ticket first tapped at 15:00 is valid until 15:00 the next day. That makes an afternoon-arrival day and the following morning a single 24-hour window. Count the Metro and Toei rides inside it — against ¥178–¥324 a ride, five or six is where the ¥1,000 tier starts to pay.`,
  },
  {
    title: "Check whether your route is actually subway",
    desc: "The pass excludes JR, including the Yamanote Line, and private railways. Asakusa, Oshiage, Ginza, Roppongi, Omotesando and Tsukiji are all subway; Shibuya, Shinjuku, Ueno and Akihabara are reachable by subway but are also Yamanote stops you may end up using instead.",
  },
  {
    title: "Buy before you land, or at least before the counter",
    desc: "The ticket is sold to overseas visitors, and the official site offers both a physical ticket and a digital QR version. Klook sells the same pass with an English checkout and a voucher you collect on arrival — useful if you would rather not work out which window sells it at the airport.",
  },
  {
    title: "Keep an IC card anyway",
    desc: "Even with the pass, a Suica or Pasmo covers the JR rides, buses and convenience stores the pass does not. Nobody in Tokyo uses only a subway pass, and carrying both is the normal setup rather than a redundancy.",
  },
];

const faqItems = [
  {
    q: "How much is the Tokyo Subway Ticket?",
    a: `From the official Tokyo Metro site: ¥1,000 adult / ¥500 child for the 24-hour ticket, ¥1,500 / ¥750 for the 48-hour, and ¥2,000 / ¥1,000 for the 72-hour. Per day that is ¥1,000, ¥750 and about ¥667 respectively, so the longer tiers are considerably better value. Prices checked on ${CHECKED}.`,
  },
  {
    q: "Is the Tokyo Subway Ticket worth it?",
    a: `It depends on how many subway rides you actually take. Tokyo Metro adult fares run from ¥178 for 1–6 km up to ¥324 for 28–40 km on an IC card, so the ¥1,000 24-hour ticket needs roughly five to six rides in one window to break even. The ¥2,000 72-hour ticket needs only about four rides a day, which an ordinary sightseeing day reaches easily — that tier is the one most visitors come out ahead on. Fares and prices checked on ${CHECKED}.`,
  },
  {
    q: "Does the Tokyo Subway Ticket cover JR and the Yamanote Line?",
    a: "No. It covers all Tokyo Metro and Toei Subway lines and nothing else — JR lines, including the Yamanote Line, and private railways are excluded. This is the single most common reason the pass disappoints: a lot of Tokyo itineraries lean on the Yamanote loop, and those rides are charged separately. If your days mix subway and JR, a pay-as-you-go IC card is the simpler tool.",
  },
  {
    q: "When does the 24 hours start?",
    a: "At first use, not at purchase and not at midnight. A 24-hour ticket first tapped at 15:00 is valid until 15:00 the following day, which means one pass can cover an afternoon of sightseeing and the next morning's travel. The 48- and 72-hour versions work the same way, counting forward in hours from the first tap.",
  },
  {
    q: "Who can buy the Tokyo Subway Ticket?",
    a: "It is sold as a visitor pass. The Klook listing states that the offer is not available to Japanese passport holders, and the pass is marketed through tourist channels rather than ordinary commuter windows. Bring your passport when you collect a physical ticket.",
  },
  {
    q: "Physical ticket or digital QR version?",
    a: "The official Tokyo Metro site offers both: a physical Tokyo Subway Ticket, and a digital QR version that can be distributed to mobile devices. The physical card goes through the gate like any other ticket, which is the less error-prone option if you are travelling as a group and handing passes around. Either way the validity period and the price are the same.",
  },
  {
    q: "Can I use the Tokyo Subway Ticket to get to Tokyo Skytree?",
    a: "Yes. Skytree sits above Oshiage Station, which is served by the Tokyo Metro Hanzomon Line and the Toei Asakusa Line, so the pass covers the journey. Asakusa is two stops away on the same Asakusa Line, which makes Senso-ji and Skytree an easy pair on one pass day.",
  },
  {
    q: "Is there a cheaper Tokyo subway pass?",
    a: "The Tokyo Metro 1-day pass is cheaper, but it covers only the nine Tokyo Metro lines and not the four Toei lines — and the Oedo, Asakusa and Shinjuku lines are Toei. Because Metro and Toei are separate companies, a journey that switches between them is charged as two fares, which is exactly the gap the Tokyo Subway Ticket closes. Our Tokyo transport guide compares the pass options in more detail.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-subway-ticket") } });

const TITLE = "Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?";
const DESC =
  "Tokyo Subway Ticket prices for 2026: ¥1,000 / ¥1,500 / ¥2,000 for 24, 48 and 72 hours. We work the break-even against official Metro fares and explain what the pass excludes.";

export default function TokyoSubwayTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
            __html: articleJsonLd({
              route: "/guides/attractions/tokyo-subway-ticket",
              headline: TITLE,
              updated,
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
                { "@type": "ListItem", position: 4, name: "Tokyo Subway Ticket", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" },
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
          <span className={styles.breadCurrent}>Tokyo Subway Ticket</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Subway Ticket (2026):<br />24, 48 or 72 Hours — Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            The pass is good value on the 72-hour tier and marginal on the 24-hour one. Here are the official
            prices, the break-even against real Metro fares, and the one exclusion that catches people out.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Break-even worked out"].map((t) => (
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
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
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
                <p className={styles.verdictStatLabel}>24 hours</p>
                <p className={styles.verdictStatValue}>¥1,000 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>72 hours</p>
                <p className={styles.verdictStatValue}>¥2,000 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Break-even</p>
                <p className={styles.verdictStatValue}>~4 rides/day on 72h</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Covers JR?</p>
                <p className={styles.verdictStatValue}>No</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the 72-hour ticket at ¥2,000 works out to about ¥667 a day, which four
              short Metro rides already beat — that tier is usually worth it. The 24-hour at ¥1,000 needs five or
              six rides in one window, which is a busier day than most people have. Either way the pass excludes
              JR, so the Yamanote Line is not included. Prices and fares checked on {CHECKED}.
            </p>
            <a href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check the Tokyo Subway Ticket on Klook →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What the Pass Actually Covers</h2>
          <p className={styles.bodyText}>
            The Tokyo Subway Ticket is a visitor pass giving unlimited rides on <strong>all Tokyo Metro and all
            Toei Subway lines</strong> for 24, 48 or 72 hours from the moment you first use it. That combination
            matters: Tokyo Metro and Toei are separate companies, so a journey that switches between the two
            normally costs two fares. The pass removes that penalty entirely.
          </p>
          <p className={styles.bodyText}>
            What it does not cover is JR — and in Tokyo that is a large hole. The Yamanote Line, the loop that
            links Shibuya, Shinjuku, Shinagawa, Tokyo and Ueno, is JR. So are the Chuo and Sobu lines. If your
            days are built around the loop rather than the subway, the pass will sit unused in your pocket.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Tokyo Subway Ticket Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child", "Cost per day"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Adult and child prices read off the official Tokyo Metro site on {CHECKED}. The cost-per-day column
            is our arithmetic, not an official figure. Validity counts forward in hours from first use.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>What a Single Ride Costs Instead</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            To know whether the pass pays, you need the fare it replaces. These are Tokyo Metro&apos;s published
            adult single fares by distance band — the IC-card column is what a Suica or Pasmo charges, and it is
            marginally cheaper than a paper ticket at every band.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Distance", "IC card", "Paper ticket"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td className={styles.tdPrice}>{row.ic}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.paper}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Most central-Tokyo subway hops fall in the first two bands, so call it ¥178–¥209 a ride. Against
            that, the ¥1,000 24-hour ticket needs <strong>five to six rides</strong> in a single window to break
            even. The ¥2,000 72-hour ticket, at about ¥667 a day, needs roughly <strong>four rides a day</strong>{" "}
            — a normal pace once you are changing lines a couple of times per outing. That gap is the whole
            decision.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares read off Tokyo Metro&apos;s adult fare table on {CHECKED}; the quoted prices include the ¥10
            adult barrier-free fee. Toei Subway fares are set separately. Break-even counts are our arithmetic.
          </p>
        </section>

        {/* Who for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which tier</span>
          <h2 className={styles.sectionTitle}>Which Version Should You Buy?</h2>
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

        {/* How to buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Decide and Where to Buy</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            For the wider picture — how Metro, Toei and JR divide up the city, and where an IC card beats any
            pass — see <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link> and our{" "}
            <Link href="/guides/transport/ic-cards-japan">guide to Japanese IC cards</Link>. If you are arriving
            at Narita or Haneda, <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfers</Link>{" "}
            covers the routes into town, several of which are bundled with this pass.
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

        <KlookTourPicks
          heading="Bundles Built Around the Same Pass"
          intro="Klook sells the pass on its own and packaged with an airport transfer or an observation deck. If you were going to buy both anyway, the combos save a checkout."
          tours={[subwayCityViewCombo, naritaBusSubwayCombo, tokyoSightseeingBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-go-kart" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13h2l2-3h8l2 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Street Go-Kart (2026): Rules, IDP Requirement &amp; How to Book</p>
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
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/attractions/warner-bros-studio-tour-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 4l-9 9 2 2 9-9z" />
                  <path d="M5 19l2-6 4 4-6 2z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Warner Bros. Studio Tour Tokyo Tickets (2026): Prices &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three subway days, ¥2,000</h2>
            <p className={styles.ctaBannerDesc}>
              If your Tokyo days run on the Metro and Toei lines rather than the Yamanote loop, the 72-hour
              ticket is the tier that pays for itself. Klook checks out in English on a foreign card.
            </p>
            <a href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View the Tokyo Subway Ticket on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
