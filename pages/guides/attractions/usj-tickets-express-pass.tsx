import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygUsj, gygUsjExpressPass } from "../../../lib/gyg-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrHarukaUrl, jrKansaiMiniPass, nankaiRapitUrl, usjStayAreas, usjTripPrep } from "../../../lib/klook-links";

// CTA links — Klook affiliate redirects.
const STUDIO_PASS_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299137&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F46604-universal-studios-japan-e-ticket-osaka-qr-code-direct-entry%2F";
const EXPRESS_PASS_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299138&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F3407-universal-studios-japan-express-pass-osaka%2F";

/**
 * The stay, getting-there and trip-prep sections below were added 26 Oct 2026.
 * The two Klook ticket links above and the GetYourGuide comparison are unchanged —
 * the Studio Pass and the Express Pass are the one pair on this site Klook pays
 * nothing on, so the new sections are the bookings the same reader makes around
 * them: hotels and a day tour at 6.5%, the airport trains and the Kansai rail pass
 * at 5%, the eSIM at 20%.
 *
 * Every figure in those sections carries the body that published it and the date it
 * was read. Nothing here is first-hand, and no Klook price appears anywhere: Klook
 * answers automated reads of its product pages with HTTP 403.
 *
 *   westjr.co.jp              Universal Studios Japan's nearest station and       26 Oct 2026
 *                             "right by Universal-City Station"; the HARUKA's
 *                             direct destinations; the HARUKA One-way Ticket
 *                             prices now and from 1 Nov 2026; the WEST QR Kansai
 *                             Mini Pass price, length and limited-express rule;
 *                             the WEST QR Kansai Area Pass prices and HARUKA
 *                             allowance
 *   nankai.co.jp              the Rapi:t's minimum 34 minutes to Namba and the    26 Oct 2026
 *                             limited express surcharge
 *   discover.osaka-info.jp    the five-minute walk from Universal City Station    26 Oct 2026
 *                             and the 20 minutes from Osaka Station (Osaka
 *                             Convention & Tourism Bureau)
 *
 * JR West publishes no door-to-door journey time for the Yumesaki Line run on its
 * English site, which is why the two timings are the Tourism Bureau's and are
 * attributed to it rather than to JR West.
 */
const CHECKED = checkedLabel("2026-10-26");

const ticketRows = [
  { ticket: "1-Day Studio Pass", what: "Park entry for one day; ride standard attractions in standby queues", price: "Tiered by date — confirm at booking" },
  { ticket: "2-Day Studio Pass", what: "Two consecutive days of entry, often cheaper per day", price: "Tiered by date — confirm at booking" },
  { ticket: "Express Pass (add-on)", what: "Skip-the-line at selected rides + Super Nintendo World timed entry", price: "Variable, often a large add-on — confirm at booking" },
];

const expressRows = [
  { pass: "Express Pass 4", rides: "~4 selected attractions", snw: "Usually includes SNW timed entry (varies)", bestFor: "Short visits, hitting the headline rides" },
  { pass: "Express Pass 7", rides: "~7 selected attractions", snw: "Usually includes SNW timed entry", bestFor: "Most popular — busy weekends & holidays" },
  { pass: "Express Pass 8 / Premium", rides: "Widest attraction coverage", snw: "Includes SNW timed entry", bestFor: "Peak crowds & the 25th-anniversary season" },
];

const whoFor = [
  {
    title: "Off-peak weekday visitor",
    desc: "If you're going on a quiet weekday and you're flexible, a Studio Pass alone can be enough. Use the free Super Nintendo World area timed-entry ticket via the official USJ app, and ride standby queues for everything else.",
  },
  {
    title: "Weekend / holiday visitor",
    desc: "On weekends, holidays, and through the 2026 25th-anniversary season, standby waits can hit 180–240 minutes on top rides. A Studio Pass plus an Express Pass 7 is the realistic way to ride the headliners and guarantee Super Nintendo World.",
  },
  {
    title: "One day, want it all",
    desc: "If you only have a single day and want to cover the big attractions plus SNW without queuing for hours, an Express Pass 7 or 8 is worth the premium. It effectively buys back the time you'd otherwise lose in line.",
  },
];

const steps = [
  {
    title: "Buy your Studio Pass online — before you arrive",
    desc: "Since May 2025, USJ no longer sells same-day tickets at the gate, so online purchase is effectively required. Klook is an official USJ partner with English checkout and foreign-card support.",
  },
  {
    title: "Decide whether you need an Express Pass",
    desc: "Check your visit date against expected crowds. For weekends, holidays, and the anniversary season, add an Express Pass; for a quiet weekday you may not need one.",
  },
  {
    title: "Sort out Super Nintendo World entry",
    desc: "SNW often uses timed entry on busy days. An Express Pass that includes SNW timed entry guarantees access; otherwise, get a free area timed-entry ticket through the official USJ app once you're inside.",
  },
  {
    title: "Arrive before opening",
    desc: "Gates can open earlier than the official time on busy days. Arriving 30–60 minutes early helps you secure SNW timed-entry tickets and get a head start on standby queues.",
  },
];

const faqItems = [
  {
    q: "Do I need to buy USJ tickets in advance?",
    a: "Yes. Since May 2025, Universal Studios Japan stopped selling same-day tickets at the gate, so you need to buy online before you go. Booking through an official partner like Klook gives you an English checkout, accepts foreign cards, and delivers an e-ticket you can scan at entry.",
  },
  {
    q: "Is the USJ Express Pass worth it in 2026?",
    a: "On busy days, yes. 2026 is USJ's 25th-anniversary season, and standby waits on the most popular rides can reach 180–240 minutes. An Express Pass turns those multi-hour waits into priority entry and, on most variants, guarantees Super Nintendo World timed entry. On a quiet off-peak weekday it's less essential — but for weekends, holidays, and anniversary crowds it's close to a must-have if you want to ride the headliners.",
  },
  {
    q: "What's the difference between Express Pass 4, 7, and 8?",
    a: "The number roughly reflects how many selected attractions you can skip the line for — Express Pass 4 covers around four, Express Pass 7 around seven, and the 8/Premium tiers cover the widest range. Most variants also include a Super Nintendo World timed-entry ticket. Express Pass 7 is the most popular balance of coverage and price; 8/Premium suits the busiest days. Exact attraction lists vary by date, so check what's included before buying.",
  },
  {
    q: "How do I get into Super Nintendo World?",
    a: "On busy days, Super Nintendo World uses timed entry. There are two reliable ways in: buy an Express Pass that includes an SNW timed-entry ticket, or get a free area timed-entry ticket through the official USJ app after you enter the park. On quiet days you may be able to walk in, but don't count on it during weekends, holidays, or the anniversary season.",
  },
  {
    q: "How much are USJ tickets?",
    a: "USJ uses tiered, date-based pricing, so the same ticket costs more on busy dates than quiet ones. Because prices change by date and demand, we don't quote a fixed figure — check the live price for your specific date at the time of booking. Express Passes are a separate add-on on top of the Studio Pass and vary widely by date.",
  },
  // Added 26 Oct 2026 with the stay, getting-there and trip-prep sections, so the
  // FAQPage markup carries the same three questions the page now answers in full.
  {
    q: "Where should I stay for Universal Studios Japan?",
    a: `Universal City if you want to be at the gates at opening, Umeda or Osaka Station otherwise. The park gates are approximately five minutes on foot from Universal City Station on the JR Yumesaki Line, and the park is about 20 minutes from Osaka Station — both figures are the Osaka Convention & Tourism Bureau's own, read on ${CHECKED}. JR West's own destination page names Universal-city Station as the park's nearest station and describes the park as "right by" it. The trade-off is the rest of the trip: Umeda and Osaka Station keep you on the main JR network, while the Universal City hotels are a small cluster and so are the first rooms to go on a busy date.`,
  },
  {
    q: "How do I get to USJ from Kansai Airport or Osaka Station?",
    a: `The station is Universal City on the JR Yumesaki (Sakurajima) Line, usually reached by changing at Nishikujo, and the Osaka Convention & Tourism Bureau puts the park at about 20 minutes from Osaka Station. From Kansai Airport there is no direct train: JR West's HARUKA runs to Tennoji, Osaka, Shin-Osaka and Kyoto with no change — the discounted one-way for foreign passport holders entering as temporary visitors is ¥1,300 to Tennoji and ¥1,800 to Osaka or Shin-Osaka through 31 October 2026, rising to ¥1,600 and ¥1,900 on 1 November 2026 — or Nankai's Rapi:t reaches Namba in a minimum of 34 minutes on a ¥700 adult limited express ticket on top of the fare. From either, take the Loop Line to Nishikujo and the Yumesaki Line on. All figures read on ${CHECKED}.`,
  },
  {
    q: "Is USJ covered by any Osaka or Kansai pass?",
    a: `The park itself is not on the Osaka Amazing Pass, and no Osaka Metro pass covers the JR run out to Universal City. On the rail side, JR West's own Kansai Area Pass page describes the WEST QR Kansai Mini Pass as "Kyoto, Universal Studios Japan, Osaka, Namba, Kobe and Nara 3-Day Unlimited Rides" — it is ¥3,000 for an adult and ¥1,500 for a child over three consecutive days on ordinary, rapid and special rapid trains, and it cannot be used on any limited express including the HARUKA. The WEST QR Kansai Area Pass does cover the HARUKA, with unlimited non-reserved seats plus two reserved, at ¥2,700 for one day up to ¥6,700 for four. Read on ${CHECKED}. None of them includes park admission — that is always a separate Studio Pass.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/usj-tickets-express-pass") } });

export default function UsjTicketsExpressPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy | Japan Travel Kit</title>
        <meta
          name="description"
          content="USJ now requires online tickets and Super Nintendo World needs timed entry. We explain Studio Pass tiers, whether the Express Pass is worth it, and what to buy in 2026."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" />
        {hreflangLinks("/guides/attractions/usj-tickets-express-pass")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Universal Studios Japan Tickets & Express Pass (2026): What to Buy" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" />
        <meta property="og:description" content="USJ now requires online tickets and Super Nintendo World needs timed entry. We explain Studio Pass tiers, whether the Express Pass is worth it, and what to buy in 2026." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Universal Studios Japan Tickets & Express Pass (2026): What to Buy" />
        <meta name="twitter:description" content="USJ now requires online tickets and Super Nintendo World needs timed entry. We explain Studio Pass tiers, whether the Express Pass is worth it, and what to buy in 2026." />
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
              route: "/guides/attractions/usj-tickets-express-pass",
              headline: "Universal Studios Japan Tickets & Express Pass (2026): What to Buy",
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
                { "@type": "ListItem", position: 4, name: "USJ Tickets & Express Pass", item: "https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" },
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
          <span className={styles.breadCurrent}>USJ Tickets &amp; Express Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Universal Studios Japan Tickets &amp;<br />Express Pass (2026): What to Buy
          </h1>
          <p className={styles.heroSubtitle}>
            Online tickets are now required, Super Nintendo World needs timed entry, and 2026 is the
            25th-anniversary crush. Here&apos;s exactly what to buy for your visit.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Studio Pass + Express Pass", "Super Nintendo World"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Everyone needs</p>
                <p className={styles.verdictStatValue}>A Studio Pass (online)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Add Express Pass if</p>
                <p className={styles.verdictStatValue}>Weekend / holiday / anniversary</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Super Nintendo World</p>
                <p className={styles.verdictStatValue}>Needs timed entry on busy days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Buy at the gate?</p>
                <p className={styles.verdictStatValue}>No — online only since 2025</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Buy a Studio Pass online for entry. On busy dates — and 2026 is
              busy — add an Express Pass to skip multi-hour queues and guarantee Super Nintendo World.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={STUDIO_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ Studio Pass →
              </a>
              <a href={EXPRESS_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ Express Pass →
              </a>
            </div>
            {/* Both Klook CTAs above are unchanged. The Express Pass is the one ticket
                on this site that sells out earliest, so a second seller goes here too. */}
            <div className={styles.pickCtaRow} style={{ marginTop: "0.75rem" }}>
              <GygCompareButton
                slug="usj-tickets-express-pass"
                listing={gygUsjExpressPass}
                label="Compare the Express Pass on GetYourGuide →"
              />
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>How USJ Tickets Work in 2026</h2>
          <p className={styles.bodyText}>
            There are two things to understand before you buy. First, the <strong>Studio Pass</strong> is your
            park entry — everyone needs one, and since May 2025 you can no longer buy it at the gate on the day.
            It&apos;s online-only, with tiered pricing that&apos;s higher on busy dates.
          </p>
          <p className={styles.bodyText}>
            Second, the <strong>Express Pass</strong> is an optional add-on that lets you skip the standby line
            at selected attractions and, on most variants, includes a timed-entry ticket for{" "}
            <strong>Super Nintendo World</strong>. It is not park entry on its own — you buy it on top of a
            Studio Pass. With 2026 being USJ&apos;s 25th-anniversary season, crowds are heavy and the Express
            Pass is far more valuable than in a quiet year.
          </p>
        </section>

        {/* Ticket types table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Ticket types</span>
          <h2 className={styles.sectionTitle}>USJ Ticket Types at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "What it is", "Pricing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            USJ uses tiered, date-based pricing — the same ticket costs more on busy dates. We don&apos;t quote
            fixed figures; check the live price for your date at booking (2026, variable, confirm at checkout).
          </p>
        </section>

        {/* Express pass tiers */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Express Pass tiers</span>
          <h2 className={styles.sectionTitle}>Express Pass 4 vs 7 vs 8</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Express Pass", "Ride skips", "Super Nintendo World", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {expressRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rides}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The exact attractions covered and whether Super Nintendo World timed entry is included vary by
            variant and date — always check the inclusions for your specific date before buying.
          </p>
        </section>

        {/* Who should buy what */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Who buys what</span>
          <h2 className={styles.sectionTitle}>What Should You Buy?</h2>
          <div className={styles.stepsList}>
            {whoFor.map((item, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.title}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book &amp; Plan Your Visit</h2>
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

        {/* Where to stay — the 6.5% Klook band, keyed to the one line that reaches the park. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should I Stay for Universal Studios Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Universal City if you want to be at the gates at opening, Umeda or Osaka Station
            otherwise.</strong> The park gates are approximately five minutes on foot from Universal City
            Station on the JR Yumesaki Line, and the park is about 20 minutes from Osaka Station — both
            figures are the Osaka Convention &amp; Tourism Bureau&apos;s own, read on {CHECKED}. JR West&apos;s
            own destination page for the park names Universal-city Station as the nearest station and
            describes the park as &ldquo;right by&rdquo; it, read the same day.
          </p>
          <p className={styles.bodyText}>
            That walk is the whole argument. On a date with an Express Pass on it you want to be through the
            turnstiles early, and Universal City is the only area that turns the journey into a five-minute
            walk. The counter-argument is the rest of the trip: Umeda and Osaka Station keep you on the main
            JR network, and the Universal City hotels are a small cluster, so they are the first rooms to go
            on a busy date. Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
              where to stay in Osaka guide
            </Link>{" "}
            compares all four areas on the lines and the airport route to each.
          </p>
        </section>

        <KlookStayAreas
          heading="USJ Hotel Search, Area by Area"
          intro="Which rooms are left and at what price is a per-date question, so each area links straight into Klook's own hotel search for it. Set the date on your Studio Pass and compare Universal City against one of the JR-side bases — on a quiet weekday the difference is usually price, and on an anniversary weekend it is usually availability."
          areas={usjStayAreas}
        />

        {/* Getting there — question heading, JR West and Nankai facts, and the 5% band. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to USJ From Kansai Airport or Osaka Station?</h2>
          <p className={styles.bodyText}>
            USJ is in Konohana-ku, western Osaka, and the station is Universal City on the JR Yumesaki
            (Sakurajima) Line — usually reached by changing at Nishikujo. JR West names Universal-city
            Station as the park&apos;s nearest station, and the Osaka Convention &amp; Tourism Bureau puts the
            gates at approximately five minutes on foot from it and the park at about 20 minutes from Osaka
            Station. Both read on {CHECKED}. JR West does not publish a door-to-door time for the Yumesaki
            run on its English site, so we do not print one.
          </p>
          <p className={styles.bodyText}>
            From <strong>Kansai Airport</strong> there are two sensible ways into the city, and neither of
            them reaches the park directly. JR West&apos;s HARUKA runs from the airport to Tennoji, Osaka,
            Shin-Osaka and Kyoto with no change; its discounted one-way ticket — sold only to holders of a
            foreign passport entering as a temporary visitor — is ¥1,300 to Tennoji and ¥1,800 to Osaka or
            Shin-Osaka through 31 October 2026, rising to ¥1,600 and ¥1,900 on 1 November 2026, with child
            fares at half. Nankai&apos;s Rapi:t runs to Namba in a minimum of 34 minutes with no transfer, on
            a ¥700 adult or ¥350 child limited express ticket on top of the ordinary fare — ¥300 more if you
            buy it onboard, ¥150 less ticketless. JR West and Nankai figures, both read on {CHECKED}. Either
            way you then take the Loop Line to Nishikujo and the Yumesaki Line on from there.
          </p>
          <p className={styles.bodyText}>
            One pass is worth knowing about: JR West&apos;s own Kansai Area Pass page describes the{" "}
            <strong>WEST QR Kansai Mini Pass</strong> as &ldquo;Kyoto, Universal Studios Japan, Osaka, Namba,
            Kobe and Nara 3-Day Unlimited Rides&rdquo;, and the pass itself is ¥3,000 for an adult and ¥1,500
            for a child over three consecutive days on ordinary trains, special rapid and rapid services
            included. It cannot be used on any limited express, the HARUKA included — JR West states that
            needs a separate ticket. The <strong>WEST QR Kansai Area Pass</strong> is the one that does cover
            the HARUKA (unlimited non-reserved, plus two reserved seats), at ¥2,700 for one day up to ¥6,700
            for four. All read on {CHECKED}. Neither pass touches the Osaka Metro, and no Osaka Metro pass
            reaches Universal City.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the HARUKA ticket on Klook →
            </a>
            <a href={nankaiRapitUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Nankai Rapi:t on Klook →
            </a>
            <a href={jrKansaiMiniPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kansai Mini Pass on Klook →
            </a>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Plan your route with our{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              Osaka airport transfer guide
            </Link>{" "}
            (including Haruka vs Nankai Rapi:t) and our{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              Getting Around Osaka guide
            </Link>{" "}
            for day pass options, or our{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kansai Area Pass guide
            </Link>{" "}
            for the JR passes above in full.
          </p>
        </section>

        {/* The rest of an Osaka trip — 5% pass, 6.5% day tour, 20% eSIM. */}
        <KlookTripPrep
          label="Booked alongside"
          heading="What Else Should I Book for an Osaka Trip?"
          intro="A park day is one day. These three are what the same trip usually needs around it, and the first one is on the list mainly so you do not buy it for the wrong reason."
          items={usjTripPrep}
        />

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
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport</p>
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
                  <path d="M3 10h18M5 10V7l7-4 7 4v3" />
                  <path d="M6 10v10M18 10v10M3 20h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-5-9-2-3-6-1 5-7 8z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
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
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="16" rx="2" />
                  <path d="M4 11h16M8 19l-1 2M16 19l1 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass vs Enjoy Eco Card (2026): Which Should Tourists Buy?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* The Express Pass is capped per day and dated, which is the whole reason a
            second seller belongs on this page rather than just a second link. */}
        <GygCompare
          slug="usj-tickets-express-pass"
          heading="USJ Tickets and Express Passes on GetYourGuide"
          intro="Express Passes are capped per day and tied to the date on them, so the one you want is often simply not there any more. GetYourGuide sells the Express Pass on its own — same caveat as everywhere else, it does not include park admission — and the Studio Pass separately. If your date has gone above, try here before you change the date of your trip."
          listings={[gygUsjExpressPass, gygUsj]}
        />

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Skip the queues at USJ</h2>
            <p className={styles.ctaBannerDesc}>
              Buy your Studio Pass online (required since 2025) and add an Express Pass to beat the
              25th-anniversary crowds and guarantee Super Nintendo World.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={EXPRESS_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                View USJ Tickets &amp; Passes →
              </a>
              <GygCompareButton slug="usj-tickets-express-pass" listing={gygUsjExpressPass} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
