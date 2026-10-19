import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { skytreeAquariumCombo, subwayCityViewCombo, tokyoSubwayTicket } from "../../../lib/klook-links";

// CTA links — Klook affiliate redirects (tracking links, all three listings confirmed live
// 19 Oct 2026).
const SKYTREE_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304894&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F41352-tokyo-skytree%2F";
const TOKYO_TOWER_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304895&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F4911-tokyo-tower-main-observatory-ticket-tokyo%2F";
const SHIBUYA_SKY_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1299140&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F70672-shibuya-sky-tokyo%2F";

// Every price on this page is an official one, read on 19 Oct 2026: Tokyo Tower from
// tokyotower.co.jp/fee, the Tocho deck from metro.tokyo.lg.jp, and Shibuya Sky and Skytree
// from the dedicated guides on this site that verified them against the operators' own sites.
const CHECKED = "19 October 2026";

const deckRows = [
  {
    deck: "Shibuya Sky",
    height: "~229 m rooftop",
    highlight: "Open-air rooftop directly above the Scramble Crossing — the iconic Tokyo shot",
    price: "¥2,500 online · ¥3,000 at the door",
    area: "Shibuya Station",
  },
  {
    deck: "Tokyo Skytree",
    height: "Floor 350 and Floor 450 (634 m tower)",
    highlight: "The highest decks in Tokyo and the only glass skywalk; Mt. Fuji on clear days",
    price: "from ¥1,800 (Floor 350) · from ¥3,000 combo",
    area: "Oshiage, near Asakusa",
  },
  {
    deck: "Tokyo Tower",
    height: "Main Deck ~150 m, Top Deck ~250 m (332 m tower)",
    highlight: "The retro 1958 landmark; the Top Deck is a guided tour rather than a free wander",
    price: "¥1,500 Main Deck · ¥3,300 Top Deck online",
    area: "Shiba-koen / Akabanebashi",
  },
  {
    deck: "Metropolitan Gov. Building (Tocho)",
    height: "202 m, 45th floor",
    highlight: "A full city panorama with the Skytree and Tokyo Tower both in view",
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
    desc: `You want the classic retro landmark, and the Main Deck is enough. At ¥1,500 for an adult it is the cheapest paid deck of the three, and it is open until 23:00 with last entry at 22:30 — the latest of any of them. The Top Deck is a separate guided tour at ¥3,300 booked online or ¥3,500 at the counter, which is more than Shibuya Sky costs. Checked ${CHECKED}.`,
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
    desc: `You want to know whether a paid deck is worth it at all. The Tokyo Metropolitan Government Building's observation room in Shinjuku is on the 45th floor at 202 metres and costs nothing, with both the Skytree and Tokyo Tower in view. The South room runs 9:30–22:00, last entry 21:30, closed the first and third Tuesday of the month; the North runs 9:30–17:30, closed the second and fourth Monday. Go here first and spend the saved yen on something a view cannot give you. Checked ${CHECKED}.`,
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
    a: `There is no single answer, but there is a cheapest one: the Tokyo Metropolitan Government Building in Shinjuku, which is free and reaches 202 metres. Of the paid decks, Shibuya Sky at ¥2,500 online buys the open-air rooftop above the Scramble Crossing and the most recognisable view in the city; Tokyo Skytree from ¥1,800 buys the most altitude and the only glass skywalk; Tokyo Tower's Main Deck at ¥1,500 buys the retro landmark and the latest closing time. Prices checked ${CHECKED}.`,
  },
  {
    q: "Which is the cheapest Tokyo observation deck?",
    a: `The free one — the Tokyo Metropolitan Government Building in Shinjuku, at 202 metres on the 45th floor, with no ticket involved. Among the paid decks, Tokyo Tower's Main Deck is the cheapest at ¥1,500 for an adult, then Tokyo Skytree's Floor 350 from ¥1,800, then Shibuya Sky at ¥2,500 booked online. The most expensive single ticket is Tokyo Tower's Top Deck tour at ¥3,300 — which costs more than Shibuya Sky for a lower view. Read off the operators' own sites on ${CHECKED}.`,
  },
  {
    q: "Which Tokyo observation deck is the highest?",
    a: "Tokyo Skytree, by a wide margin. The tower stands 634 m tall, with observation decks at 350 m (the Tembo Deck) and 450 m (the Tembo Galleria). That's well above Shibuya Sky's ~229 m rooftop and Tokyo Tower's decks at roughly 150 m and 250 m, so Skytree offers the highest and furthest-reaching views in Tokyo.",
  },
  {
    q: "Are there any free observation decks in Tokyo?",
    a: `Yes — one, and it is good enough to change the decision. The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has an observation room on the 45th floor at 202 metres, free to enter, with both the Skytree and Tokyo Tower visible from it. The South room is open 9:30–22:00 with last entry at 21:30 and closes on the first and third Tuesday of each month; the North room runs 9:30–17:30 and closes on the second and fourth Monday. Read off metro.tokyo.lg.jp on ${CHECKED}; confirm the room is open on your date before travelling across town for it.`,
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

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-observation-decks") } });

export default function TokyoObservationDecksPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower | Japan Travel Kit</title>
        <meta
          name="description"
          content="Tokyo observation decks compared for 2026 on official prices: Shibuya Sky at ¥2,500, Skytree from ¥1,800, Tokyo Tower from ¥1,500 — and the Metropolitan Government Building, 202 m up and free."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" />
        <meta property="og:description" content="Tokyo observation decks compared for 2026 on official prices: Shibuya Sky at ¥2,500, Skytree from ¥1,800, Tokyo Tower from ¥1,500 — and the Metropolitan Government Building, 202 m up and free." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower" />
        <meta name="twitter:description" content="Tokyo observation decks compared for 2026 on official prices: Shibuya Sky at ¥2,500, Skytree from ¥1,800, Tokyo Tower from ¥1,500 — and the Metropolitan Government Building, 202 m up and free." />
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
              headline: "Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Observation Decks", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-observation-decks" },
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
          <span className={styles.breadCurrent}>Tokyo Observation Decks</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDots} />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            <span>🌆</span> Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Observation Decks (2026):<br />Shibuya Sky vs Skytree vs Tokyo Tower
          </h1>
          <p className={styles.heroSubtitle}>
            Four ways to look down on Tokyo, compared on official prices — the iconic rooftop, the tallest
            tower, the retro landmark, and the one in Shinjuku that charges nothing at all.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "One is free"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Cheapest paid deck</p>
                <p className={styles.verdictStatValue}>Tokyo Tower Main, ¥1,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best free option</p>
                <p className={styles.verdictStatValue}>Tocho, Shinjuku — 202 m</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> go up the free one first. The Metropolitan Government Building in
              Shinjuku puts you 202 metres above the city for nothing, with the Skytree and Tokyo Tower both
              in the frame — which tells you quickly whether a paid deck is worth it to you. If it is, pick by
              what you want rather than by height: <strong>Shibuya Sky</strong> at ¥2,500 for the open-air
              rooftop above the Scramble Crossing, <strong>Skytree</strong> from ¥1,800 for the altitude and
              the glass skywalk, <strong>Tokyo Tower</strong> at ¥1,500 for the 1958 landmark and the latest
              closing time. Note that Tokyo Tower&apos;s ¥3,300 Top Deck tour costs more than Shibuya Sky for a
              lower view. Prices checked {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <a href={SHIBUYA_SKY_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Shibuya Sky Tickets →
              </a>
              <a href={SKYTREE_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
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
            Below we compare them side by side on height, official price, highlight and location, then help
            you choose on what matters most to you. Every figure here was read off the operator&apos;s own
            site on {CHECKED} and is subject to change — confirm at booking.
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
                    {["Deck", "Height", "Highlight", "Adult price", "Area / nearest"].map((h) => (
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
            Adult prices read off the operators&apos; own sites on {CHECKED}. Skytree is from ¥1,800 for Floor
            350 and from ¥3,000 for the Floor 350 + 450 combo booked online; adding Floor 450 on the day costs
            ¥1,400 on top, so the combo is the cheaper route if you want both — see our{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo Skytree tickets guide
            </Link>{" "}
            for the ¥500 same-day service fee as well. Tokyo Tower&apos;s Top Deck is ¥3,300 online and ¥3,500
            at the counter. Subject to change — confirm at booking.
          </p>
        </section>

        {/* Shibuya Sky detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shibuya Sky</span>
          <h2 className={styles.sectionTitle}>Shibuya Sky — The Iconic Rooftop</h2>
          <p className={styles.bodyText}>
            Shibuya Sky is the open-air rooftop deck atop Shibuya Scramble Square, about 229 metres above one of
            the busiest crossings on earth. Standing on the rooftop looking straight down over the Shibuya
            Scramble Crossing is the single most recognisable observation experience in Tokyo, and at ¥2,500 for
            an adult booked online — against ¥3,000 at the door — it is not expensive for what it is. The
            sunset slots are the prize, and the first to go.
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
            far-reaching views — there is a glass-floor section for the brave, and on a clear day you can see
            all the way to Mt. Fuji. Floor 350 is from ¥1,800 for an adult and the Floor 350 + 450 combo is
            from ¥3,000 online; adding Floor 450 once you are inside costs ¥1,400 on top of a Floor 350
            ticket, which makes buying the combo up front the cheaper way to see both.
          </p>
          <p className={styles.bodyText}>
            Skytree sits in Oshiage, near Asakusa, so it pairs neatly with a day exploring old Tokyo. It is
            generally easier to book than Shibuya Sky, but the same-day counter adds a ¥500 service fee, so
            buying online still saves money as well as time — our{" "}
            <Link href="/guides/attractions/tokyo-skytree-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Skytree tickets guide
            </Link>{" "}
            has the full tier table.
          </p>
        </section>

        {/* Tokyo Tower detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tokyo Tower</span>
          <h2 className={styles.sectionTitle}>Tokyo Tower — The Retro Landmark</h2>
          <p className={styles.bodyText}>
            Opened in 1958 and standing 332 metres tall, Tokyo Tower is the nostalgic icon of the skyline —
            an orange-and-white lattice that glows over central Tokyo at night. The Main Deck is ¥1,500 for an
            adult, ¥1,200 for a high-school student, ¥900 for elementary and middle-school children and ¥600
            for ages four and up, and it stays open until 23:00 with last entry at 22:30. The higher level is
            reached on the Top Deck tour, which is a separate guided experience at ¥3,300 booked online or
            ¥3,500 at the counter.
          </p>
          <p className={styles.bodyText}>
            That pricing is worth pausing on. The Top Deck tour costs more than Shibuya Sky and takes you
            lower, so it only makes sense if the tower itself is the draw rather than the view from it. The
            Main Deck, on the other hand, is the cheapest paid deck in the city and the last one still letting
            people in late at night. Read off tokyotower.co.jp on {CHECKED}.
          </p>
        </section>

        {/* Tocho / free detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Free option</span>
          <h2 className={styles.sectionTitle}>Tocho — The Best Free View</h2>
          <p className={styles.bodyText}>
            The Tokyo Metropolitan Government Building (Tocho) in Shinjuku has an observation room on the 45th
            floor at 202 metres, and admission is free. From it you can see both the Skytree and Tokyo Tower,
            which is the point: it gives you the whole skyline including the two things you might otherwise
            pay to stand on top of. The panorama over western Tokyo is good, and on clear days Mt. Fuji is in
            range.
          </p>
          <p className={styles.bodyText}>
            The catch is the opening pattern, and it does catch people. The South room runs 9:30–22:00 with
            last entry at 21:30 and closes on the first and third Tuesday of each month; the North room runs
            9:30–17:30 and closes on the second and fourth Monday. Check which room is open on your date
            before crossing town. Read off metro.tokyo.lg.jp on {CHECKED}.
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

        <KlookTourPicks
          heading="Combos and Passes Worth a Look"
          intro="Two bundles that pair a deck with something else, plus the subway ticket that gets you between them. Open a listing for the current price on your date."
          tours={[skytreeAquariumCombo, subwayCityViewCombo, tokyoSubwayTicket]}
        />

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
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
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
              <a href={SHIBUYA_SKY_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Shibuya Sky →
              </a>
              <a href={SKYTREE_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Skytree →
              </a>
              <a href={TOKYO_TOWER_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Tokyo Tower →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
