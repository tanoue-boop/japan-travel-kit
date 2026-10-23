import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { kyotoNaraArashiyamaTour, kyotoHighlightBusTour, osakaAmazingPassUrl } from "../../../lib/klook-links";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA links — Klook affiliate redirects (tracking links, both listings confirmed live
// 19 Oct 2026). The pass link is shared with the ticket price table.
const OSAKA_AMAZING_PASS_URL = osakaAmazingPassUrl;
const KAIYUKAN_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304901&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F598-osaka-aquarium-kaiyukan-japan%2F";

// Pass prices and coverage read off the official site, osp.osaka-info.jp/en, on 19 Oct 2026.
// Individual facility admissions are deliberately absent from the table below: Kaiyukan prices
// by date from a calendar rather than a fixed rate, and several of the included venues do the
// same, so a standalone figure would be wrong as often as right. The column says what the pass
// does with each one instead.
// The 1-day price and the check date are owned by lib/attraction-prices.ts, shared with
// the ticket price table.
const PASS_1_DAY = PRICES.osakaAmazingPass.adult;
const PASS_2_DAY = "¥3,300";
const CHECKED = checkedLabel(PRICES.osakaAmazingPass.checked);

const includedRows = [
  { attraction: "Osaka Metro, subway and city buses (Osaka city)", included: "✓ Unlimited rides", note: "The half of the pass you use whether you plan to or not" },
  { attraction: "Osaka Castle (Castle Tower)", included: "✓ Free admission", note: "The city's landmark, and the usual first stop on a pass day" },
  { attraction: "Umeda Sky Building — Floating Garden Observatory", included: "✓ Free admission", note: "The open-air rooftop ring in the north of the city" },
  { attraction: "Tsutenkaku Tower", included: "✓ Free admission", note: "The Shinsekai landmark, walkable with the kushikatsu streets" },
  { attraction: "HEP FIVE Ferris Wheel", included: "✓ Free admission", note: "In Umeda, so it pairs with the Sky Building on one trip north" },
  { attraction: "Tombori River Cruise and other river cruises", included: "✓ Free admission", note: "Runs through Dotonbori — easy to slot in after dark" },
  { attraction: "Universal Studios Japan (USJ)", included: "✗ Not included", note: "Its own Studio Pass, online only; the pass saves you nothing here" },
  { attraction: "Osaka Aquarium Kaiyukan", included: "✗ Not included", note: "Separate ticket, priced by date — check the calendar for your day" },
];

const whoFor = [
  {
    title: "Worth it if…",
    desc: "You plan to hit several included sights in a single day — say Osaka Castle, the Umeda Sky Building observatory, Tsutenkaku, and a river cruise — while criss-crossing the city by subway. The included transport plus 40+ free admissions add up fast, and a busy day can clear the pass price on attractions alone.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  {
    title: "Maybe skip it if…",
    desc: "Your Osaka wishlist is mostly USJ and Kaiyukan — neither is on the pass. If you're only visiting one or two included spots, or you walk most places, buying single tickets and a simple IC card may cost less than the pass.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  },
  {
    title: "1-day vs 2-day",
    desc: `The second day costs ${PASS_2_DAY} against ${PASS_1_DAY}, so an extra ¥800 — which is cheap if you genuinely sightsee on both days and wasted if one of them is USJ or Kaiyukan, since the pass does nothing for you there. Choose 1-day if your trip has one city day and one blockbuster day, which is the usual shape. Choose 2-day only if both days are city days. Prices checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="16" y1="2" x2="16" y2="6" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check your list against the inclusions first",
    desc: "Do this before the arithmetic, because it is where the decision usually gets made. Osaka Castle, the Umeda Sky Building observatory, Tsutenkaku, the HEP FIVE Ferris wheel and the river cruises are all on the pass; Universal Studios Japan and the Kaiyukan are not. If two or more of your must-sees are in the first group, the pass is likely worth it. If your list is the second group, stop here.",
  },
  {
    title: "Pick 1-day or 2-day",
    desc: `The 1-day pass is ${PASS_1_DAY} and the 2-day is ${PASS_2_DAY}, so the second day adds ¥800 — good value if both days are city sightseeing, and dead money if one of them is a theme-park day the pass does not touch. Both bundle unlimited Osaka Metro and city bus travel within their valid period. Prices checked ${CHECKED}.`,
  },
  {
    title: "Buy online — the pass is now fully digital",
    desc: "The Osaka Amazing Pass is digital, with no physical card to collect. Booking through a reseller like Klook gives you an English checkout, foreign-card support, and a QR code or voucher you activate on first use.",
  },
  {
    title: "Activate on your sightseeing day and scan to enter",
    desc: "The pass starts when you first use it, so activate it on the day you'll sightsee most. Scan it at participating facilities and at subway/bus gates within Osaka city; keep your separate USJ and Kaiyukan tickets handy, since those aren't covered.",
  },
];

const faqItems = [
  {
    q: "Is the Osaka Amazing Pass worth it?",
    a: `Usually, for a city sightseeing day. The 1-day pass is ${PASS_1_DAY} and bundles unlimited Osaka Metro and city bus travel with free admission to more than 40 facilities. A day that takes in three or four of them — Osaka Castle, the Umeda Sky Building observatory, Tsutenkaku, a river cruise — while crossing the city by subway clears ${PASS_1_DAY} without much effort. It stops paying in two situations: a light day with one or two stops, and a day built around USJ or Kaiyukan, neither of which is included. Price read off the official site on ${CHECKED}.`,
  },
  {
    q: "What's included in the Osaka Amazing Pass?",
    a: `Two things: unlimited rides on the Osaka Metro and city buses within Osaka city, plus free admission to more than 40 facilities. The headline inclusions are Osaka Castle, the Umeda Sky Building Floating Garden Observatory, Tsutenkaku, the HEP FIVE Ferris wheel and the river cruises through Dotonbori. The facility list changes periodically, so check the current one before buying — read off the official site on ${CHECKED}.`,
  },
  {
    q: "Does the Osaka Amazing Pass include USJ or Kaiyukan?",
    a: "No — and this is the single most useful thing to know before buying. Universal Studios Japan and the Osaka Aquarium Kaiyukan are both excluded from the Osaka Amazing Pass, and both are among the most expensive things to do in the city. Each sells its own ticket: USJ through its Studio Pass, online only, and Kaiyukan on a date-based price calendar rather than a fixed rate. If one of them is the reason you are in Osaka, give it its own day and do not buy a pass for it.",
  },
  {
    q: "Is the Osaka Amazing Pass digital now?",
    a: "Yes. The Osaka Amazing Pass is now fully digital — there's no physical card to pick up. You receive a QR code or voucher you activate on first use, then scan to enter facilities and pass through subway and bus gates within Osaka city.",
  },
  {
    q: "Should I get the 1-day or 2-day Osaka Amazing Pass?",
    a: "Choose the 1-day pass for a single intense sightseeing day, where the unlimited same-day transport and back-to-back admissions deliver the most value. The 2-day pass lets you spread the included facilities across two days at a gentler pace. Pick based on how packed your itinerary is rather than simply the headline price.",
  },
  {
    q: "Does the Osaka Amazing Pass include transport?",
    a: "Yes — it includes unlimited rides on the Osaka Metro/subway and city buses within Osaka city for its valid period. Because transport is bundled in, you generally don't need a separate transit pass for the days you're using the Amazing Pass. If you want to compare standalone transit options for other days, see our Osaka Metro pass guide.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/osaka-attractions-pass") } });

export default function OsakaAttractionsPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It? | Japan Travel Kit</title>
        <meta
          name="description"
          content="Osaka Amazing Pass 2026: the official ¥2,500 one-day and ¥3,300 two-day prices, what the 40-plus free admissions cover, and the two attractions everyone assumes are on it that are not."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" />
        <meta property="og:description" content="Osaka Amazing Pass 2026: the official ¥2,500 one-day and ¥3,300 two-day prices, what the 40-plus free admissions cover, and the two attractions everyone assumes are on it that are not." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?" />
        <meta name="twitter:description" content="Osaka Amazing Pass 2026: the official ¥2,500 one-day and ¥3,300 two-day prices, what the 40-plus free admissions cover, and the two attractions everyone assumes are on it that are not." />
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
              route: "/guides/attractions/osaka-attractions-pass",
              headline: "Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?",
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
                { "@type": "ListItem", position: 4, name: "Osaka Amazing Pass", item: "https://www.japan-travel-kit.com/guides/attractions/osaka-attractions-pass" },
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
          <span className={styles.breadCurrent}>Osaka Amazing Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Amazing Pass (2026):<br />¥2,500 a Day — Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            ¥2,500 buys a day of unlimited Osaka Metro plus free entry to more than 40 facilities. The catch
            is which two it leaves out — and they are the two most visitors come for.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "What it excludes"].map((t) => (
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
                <p className={styles.verdictStatLabel}>1-day pass</p>
                <p className={styles.verdictStatValue}>{PASS_1_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2-day pass</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Not included</p>
                <p className={styles.verdictStatValue}>USJ &amp; Kaiyukan</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Format</p>
                <p className={styles.verdictStatValue}>Fully digital</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> at {PASS_1_DAY} for one day, the Osaka Amazing Pass clears its price
              on any day that mixes three or four included sights with a lot of subway — which is most
              first-time Osaka itineraries. The thing to check before buying is not the arithmetic but the
              list: <strong>Universal Studios Japan and the Osaka Aquarium Kaiyukan are not on it</strong>,
              and those are the two attractions visitors most often assume are. If your Osaka plan is mostly
              one of those, skip the pass for that day. Prices read off the official site on {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={OSAKA_AMAZING_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Osaka Amazing Pass →
              </a>
              <a href={KAIYUKAN_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Kaiyukan Aquarium Ticket →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Osaka Amazing Pass?</h2>
          <p className={styles.bodyText}>
            The <strong>Osaka Amazing Pass</strong> combines two benefits in one: unlimited rides on the Osaka
            Metro and city buses within Osaka city, plus free admission to more than 40 facilities. It is{" "}
            {PASS_1_DAY} for one day and {PASS_2_DAY} for two, and it is fully digital — there is no physical
            card to collect. Prices and coverage read off the official site on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Included highlights span the city&apos;s biggest names: <strong>Osaka Castle</strong>, the{" "}
            <strong>Umeda Sky Building</strong> Floating Garden Observatory, <strong>Tsutenkaku</strong>, the{" "}
            <strong>HEP FIVE Ferris wheel</strong> and the river cruises through Dotonbori. The one big caveat:{" "}
            <strong>Universal Studios Japan</strong> and the <strong>Osaka Aquarium Kaiyukan</strong> are{" "}
            <em>not</em> included, so plan those as separate tickets — and as separate days.
          </p>
        </section>

        {/* Included vs not table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Included vs not</span>
          <h2 className={styles.sectionTitle}>What the Amazing Pass Covers (and What It Doesn&apos;t)</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Attraction", "On Amazing Pass?", "What that means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {includedRows.map((row) => (
                    <tr key={row.attraction}>
                      <td className={styles.tdProvider}>{row.attraction}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.included}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Coverage read off the official Osaka Amazing Pass site on {CHECKED}; the full list runs to more
            than 40 facilities. We do not print standalone admissions for the included venues, because several
            of them — Kaiyukan in particular — price by date from a calendar rather than at a fixed rate, so
            any figure here would be wrong as often as right. Check the venue on your date if you want to do
            the arithmetic precisely.
          </p>
        </section>

        {/* Is the pass worth it / who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Is the pass worth it?</span>
          <h2 className={styles.sectionTitle}>Does the Osaka Amazing Pass Pay Off?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            The question is simpler than the arithmetic suggests. At {PASS_1_DAY}, a day that visits three or
            four included facilities and crosses the city several times by subway is almost certainly ahead —
            and in Osaka that describes a normal first-time itinerary. What decides it is the list, not the
            sums: if your must-sees are USJ and the Kaiyukan, no amount of adding up helps, because the pass
            covers neither. Because transport is bundled in, you will not also need a separate{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka Metro pass
            </Link>{" "}
            on the days you use the Amazing Pass.
          </p>
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

        {/* Kaiyukan note */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Not on the pass</span>
          <h2 className={styles.sectionTitle}>USJ &amp; Kaiyukan: Buy These Separately</h2>
          <p className={styles.bodyText}>
            The two attractions visitors most often assume are covered — and are not — are USJ and the{" "}
            <strong>Osaka Aquarium Kaiyukan</strong>. Kaiyukan is famous for its enormous central tank and
            resident whale sharks, and it sells its own ticket on a date-based price calendar rather than a
            fixed rate, so check the figure for your day rather than budgeting from a round number. It is well
            worth a visit; just plan it outside the Amazing Pass.
          </p>
          <p className={styles.bodyText}>
            For the theme park, see our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Universal Studios Japan tickets and Express Pass guide
            </Link>{" "}
            — USJ has its own Studio Pass and online-only rules, and Super Nintendo World needs timed entry on
            top. The practical consequence is scheduling rather than money: give USJ or Kaiyukan its own day
            and buy a 1-day Amazing Pass for the city day, rather than a 2-day pass you half-waste. Our{" "}
            <Link href="/guides/attractions/things-to-do-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka round-up
            </Link>{" "}
            lays that split out.
          </p>
        </section>

        {/* How to use / step-by-step */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Choose &amp; Use the Pass</h2>
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

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>Getting Into Osaka &amp; Around the City</h2>
          <p className={styles.bodyText}>
            Most of the Amazing Pass sights sit on the Osaka Metro network, which the pass covers in full within
            Osaka city. Arriving from Kansai Airport first? Compare your options in our{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={{ color: "var(--red)", fontWeight: 600 }}>
              Haruka vs Nankai Rapi:t guide
            </Link>
            , then weigh standalone transit for non-pass days with the{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka Metro pass vs Enjoy Eco Card comparison
            </Link>
            .
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
          heading="Days Out From the Same Base"
          intro="Osaka is the cheapest place in Kansai to sleep, which makes it the sensible departure point for the Kyoto and Nara days. Open a listing for the current price on your date."
          tours={[kyotoNaraArashiyamaTour, kyotoHighlightBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/osaka-castle-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V9l2-2 2 2V5l4-3 4 3v4l2-2 2 2v12z" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Castle Tickets (2026): Prices, Hours and What the Pass Covers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/umeda-sky-building-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="5" height="15" />
                  <rect x="15" y="6" width="5" height="15" />
                  <path d="M4 6h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Umeda Sky Building Tickets (2026): Prices, Hours and the Best Time to Go</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-4 7-6 11-6 3 0 5 1 7 3-2 2-4 3-7 3-4 0-8-2-11 0z" />
                  <circle cx="15" cy="9" r="0.8" fill="currentColor" stroke="none" />
                  <path d="M3 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Aquarium Kaiyukan Tickets (2026): Prices, Hours and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11a8 8 0 0 1 16 0v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
                  <path d="M12 3v8M9 6h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
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
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass vs Enjoy Eco Card (2026): Which to Buy?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nara-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>See more of Osaka for less</h2>
            <p className={styles.ctaBannerDesc}>
              Bundle unlimited city transport with 40+ free admissions on the Osaka Amazing Pass — and add a
              Kaiyukan aquarium ticket, since the whale sharks aren&apos;t on the pass.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={OSAKA_AMAZING_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Osaka Amazing Pass →
              </a>
              <a href={KAIYUKAN_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kaiyukan Ticket →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
