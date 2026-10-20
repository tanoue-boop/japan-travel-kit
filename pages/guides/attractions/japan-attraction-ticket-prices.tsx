import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import {
  attractionPrices,
  checkedLabel,
  latestChecked,
  pricesInGroup,
  PRICE_GROUP_LABELS,
  type AttractionPrice,
  type PriceGroup,
} from "../../../lib/attraction-prices";

const TITLE = "Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules";
const DESC =
  "Official adult and child admission prices for Japan's ticketed attractions, theme parks, passes and day-trip sites " +
  "in one table — with whether each one has to be booked in advance, and the date every figure was read off the " +
  "operator's own site.";

const GROUP_ORDER: PriceGroup[] = ["tickets", "parks", "passes", "daytrips"];

const ROW_COUNT = attractionPrices.length;
const FREE_COUNT = attractionPrices.filter((p) => p.adult === "Free").length;
const MUST_BOOK = attractionPrices.filter((p) => p.booking === "Required");
const NO_BOOKING = attractionPrices.filter((p) => p.booking === "Not needed");
const DATE_PRICED = attractionPrices.filter((p) => p.adult.includes("–") || p.adult.includes("from"));
const AS_OF = checkedLabel(latestChecked());

/**
 * What is deliberately not in the table, and why. Both operators price by date from a
 * calendar and publish no standing adult figure, so a cell here would be a guess —
 * and neither guide carries a verified check date to attach to one.
 */
const EXCLUDED = [
  {
    name: "Tokyo Disneyland and DisneySea",
    href: "/guides/attractions/tokyo-disney-tickets",
    why: "Every ticket is date-specified with variable pricing and there are no gate sales at all, so the only real answer is the price shown for your date at checkout. What matters instead is booking early — popular dates sell out weeks ahead.",
  },
  {
    name: "Universal Studios Japan",
    href: "/guides/attractions/usj-tickets-express-pass",
    why: "Studio Pass prices are tiered by date, and since May 2025 USJ has not sold same-day tickets at the gate. The Express Pass is a separate variable add-on on top. The guide covers which tier to buy rather than a figure that changes weekly.",
  },
  {
    name: "Grand Sumo tournament tickets",
    href: "/guides/attractions/sumo-tokyo-tickets",
    why: "Seat prices vary by tier and by tournament day, and the official sale opens on a schedule rather than at a fixed price. Around 400 same-day tickets go on sale each day at roughly ¥2,200.",
  },
];

const faqItems = [
  {
    q: "How much do attraction tickets cost in Japan?",
    a: `Across the ${ROW_COUNT} tickets in the table on this page, adult admission runs from free to about ¥7,900. Tokyo's observation decks are the cheapest paid tier — Tokyo Tower's Main Deck is ¥1,500 and Tokyo Skytree's Floor 350 starts at ¥1,800 — while the Tokyo Metropolitan Government Building deck in Shinjuku charges nothing at all. Timed-entry museums sit higher: teamLab Borderless starts at ¥3,400 and teamLab Planets at ¥3,800. Theme parks are the most expensive, from ¥3,900 for a Sanrio Puroland Day Passport to ¥7,900 for a Fuji-Q Highland 1-Day Pass on a peak date. Temple and shrine admissions on the day trips are in a different league entirely: ¥300 for Kotoku-in in Kamakura, ¥300 for Itsukushima Shrine, ¥800 for the Great Buddha Hall at Todai-ji.`,
  },
  {
    q: "Which Japanese attractions have to be booked in advance?",
    a: `${MUST_BOOK.length} of the ${ROW_COUNT} tickets here genuinely require a booking before you arrive: ${MUST_BOOK.map((p) => p.name).join(", ")}. All of them sell a specific date, and most sell a specific entry slot within that date. Tokyo Disney and Universal Studios Japan also require advance tickets, which is why they are discussed separately below rather than given a price here. Everything else in the table can be bought on the day, though two cases are worth booking anyway: Shibuya Sky is ¥500 cheaper online, and Tokyo Skytree's same-day counter adds a ¥500 service fee.`,
  },
  {
    q: "Are tickets cheaper online than at the gate in Japan?",
    a: "Sometimes, and the difference is smaller than people expect. Shibuya Sky is ¥2,500 online against ¥3,000 at the door. Tokyo Skytree's same-day window adds a ¥500 service fee. teamLab Borderless costs ¥200 more per adult bought on site. But Tokyo Tower's Main Deck is ¥1,500 either way, and most temple and museum admissions have no online price at all. Online booking is usually about securing a slot and paying in your own currency, not about saving money.",
  },
  {
    q: "Why does the same Japanese ticket show different prices?",
    a: `Because several operators now price by the date you visit rather than at a flat rate. ${DATE_PRICED.length} of the tickets in this table publish a range or a "from" price for exactly that reason: a Sanrio Puroland Day Passport is ¥3,900 on the quietest dates and ¥6,900 on the busiest, and a Fuji-Q Highland 1-Day Pass runs ¥6,000 to ¥7,900. On those tickets, moving your visit by a day saves far more than shopping around between sellers.`,
  },
  {
    q: "Do Japanese attractions charge a child price?",
    a: "Almost all of them, but the age bands differ by venue and are worth checking against your children's ages rather than assumed. The table's child column names the band for each one. Broadly: temples and museums use ages 6–12, observation decks start charging around age 4 to 6, and theme parks treat anyone up to 17 as a child. Under-3s and under-4s are usually free, and the Hiroshima Peace Memorial Museum is free for junior high school age and below. The Osaka Amazing Pass is the exception that publishes no child rate at all.",
  },
  {
    q: "Can I pay for Japanese attraction tickets with a foreign card?",
    a: "At the venue, yes — cards are widely accepted at ticket windows in Tokyo, Osaka and Kyoto. Online is where it breaks: the official Shibuya Sky site has rejected many foreign-issued cards since July 2024, and the Tokyo Disney site is known to block them too. That is the specific problem a reseller solves — an English checkout that takes a foreign card and issues an e-ticket. It is not about price.",
  },
  {
    q: "How current are the prices on this page?",
    a: `Every row carries the date its figures were read off the operator's own site, and the most recent check here was ${AS_OF}. Nothing on this page is an estimate: where an operator publishes no figure — a child rate, a standing adult price — the cell says so instead of filling the gap. Japanese ticket prices move, and several of these operators changed their pricing structure during 2026, so confirm the current figure at checkout before you travel.`,
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/japan-attraction-ticket-prices") },
});

/** One table row. `child` and `klook` are nullable by design — the cell says so. */
function PriceRow({ price }: { price: AttractionPrice }) {
  return (
    <tr>
      <td className={styles.tdProvider}>
        <Link href={price.href} style={{ color: "var(--text)", fontWeight: 600 }}>
          {price.name}
        </Link>
        <span style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 400 }}>
          {price.ticket}
        </span>
      </td>
      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>
        {price.adult}
        {price.atDoor && (
          <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>
            {price.atDoor} at the door
          </span>
        )}
      </td>
      <td className={styles.tdPrice} style={{ fontWeight: 500 }}>
        {price.child ?? <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>No child rate published</span>}
        {price.childAges && (
          <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>
            {price.childAges}
          </span>
        )}
      </td>
      <td style={{ fontSize: "0.88rem" }}>
        <strong>{price.booking}</strong>
        <span style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)" }}>{price.bookingNote}</span>
      </td>
      <td style={{ fontSize: "0.82rem", whiteSpace: "nowrap" }}>
        {checkedLabel(price.checked)}
        <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>{price.source}</span>
      </td>
      <td style={{ fontSize: "0.8rem" }}>
        <Link href={price.href} style={{ color: "var(--text)", fontWeight: 600, display: "block" }}>
          Full guide →
        </Link>
        {price.klook ? (
          <a
            href={price.klook.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ color: "var(--accent)", fontWeight: 600, display: "block", marginTop: "0.3rem" }}
          >
            {price.klook.label} →
          </a>
        ) : (
          <span style={{ color: "var(--text-muted)", display: "block", marginTop: "0.3rem" }}>No ticket to buy</span>
        )}
      </td>
    </tr>
  );
}

export default function JapanAttractionTicketPricesPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE} | Japan Travel Kit</title>
        <meta name="description" content={DESC} />
        <link
          rel="canonical"
          href="https://www.japan-travel-kit.com/guides/attractions/japan-attraction-ticket-prices"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta
          property="og:url"
          content="https://www.japan-travel-kit.com/guides/attractions/japan-attraction-ticket-prices"
        />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/attractions/japan-attraction-ticket-prices",
              headline: TITLE,
              description: DESC,
              updated,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Things to Do",
                  item: "https://www.japan-travel-kit.com/guides/attractions",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Attraction Ticket Prices",
                  item: "https://www.japan-travel-kit.com/guides/attractions/japan-attraction-ticket-prices",
                },
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
          <span className={styles.breadCurrent}>Attraction Ticket Prices</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Attraction Ticket Prices 2026:<br />Official Prices and Booking Rules
          </h1>
          <p className={styles.heroSubtitle}>
            Every official adult and child admission price we have verified, in one table — with whether the ticket
            has to be booked before you arrive, and the date each figure was read off the operator&apos;s own site.
          </p>
          <div className={styles.heroBadges}>
            {[`${ROW_COUNT} tickets`, "Official prices only", `Checked to ${AS_OF}`].map((t) => (
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
            <strong>Affiliate disclosure:</strong> The Klook links in the last column are affiliate links. We may
            earn a small commission if you book through them, at no extra cost to you. Every price in this table is
            the operator&apos;s own, not a reseller&apos;s.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tickets in this table</p>
                <p className={styles.verdictStatValue}>{ROW_COUNT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Must be booked ahead</p>
                <p className={styles.verdictStatValue}>{MUST_BOOK.length}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Walk up and pay</p>
                <p className={styles.verdictStatValue}>{NO_BOOKING.length}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Free</p>
                <p className={styles.verdictStatValue}>{FREE_COUNT}</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>The short version:</strong> most of Japan is walk-up. Only {MUST_BOOK.length} of the{" "}
              {ROW_COUNT} tickets below actually require a booking before you arrive — the two teamLab museums,
              Sanrio Puroland and the Warner Bros. studio tour — plus Tokyo Disney and Universal Studios Japan,
              which price by date and so have no figure here. Everything else you can buy on the day. Put your
              booking effort where the slot can run out, and spend the rest of your planning time elsewhere.
            </p>
          </div>
        </div>

        {/* Why this page exists */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How to read this</span>
          <h2 className={styles.sectionTitle}>Official Prices, and the Date We Read Them</h2>
          <p className={styles.bodyText}>
            Japanese attraction prices are harder to pin down than they look. Several operators moved to date-based
            pricing during 2026, so there is no single adult figure to quote —{" "}
            {DATE_PRICED.length} of the {ROW_COUNT} tickets below publish a range or a &quot;from&quot; price for
            that reason. Resale listings rank well in search and are often invalid for entry. And a price copied
            from a blog post two years ago can be out by thousands of yen.
          </p>
          <p className={styles.bodyText}>
            So this table has three rules. Every figure is the operator&apos;s own, read off their site rather than
            a reseller&apos;s. Every row states the date it was read, because a Japanese ticket price without a date
            is not usable information. And where an operator publishes nothing — no child rate, no standing adult
            price — the cell says so instead of guessing.
          </p>
          <p className={styles.bodyText}>
            The prices come from the individual guides on this site, which is where the rest of the detail lives:
            the tiers not shown here, opening hours, how to reach each venue, and whether a foreign card works at
            checkout. Each row links to its guide.
          </p>
        </section>

        {/* The table, by group */}
        {GROUP_ORDER.map((group) => {
          const rows = pricesInGroup(group);
          if (!rows.length) return null;
          const meta = PRICE_GROUP_LABELS[group];
          return (
            <section key={group} className={styles.comparisonSection}>
              <span className={styles.sectionLabel}>{rows.length} tickets</span>
              <h2 className={styles.sectionTitle}>{meta.label}</h2>
              <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{meta.desc}</p>
              <div className={styles.tableWrap}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        {["Attraction", "Adult", "Child", "Advance booking", "Checked", "Links"].map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((price) => (
                        <PriceRow key={`${price.href}-${price.name}`} price={price} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          );
        })}

        {/* What is not here */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Not in the table</span>
          <h2 className={styles.sectionTitle}>Three Tickets With No Official Price to Quote</h2>
          <p className={styles.bodyText}>
            Japan&apos;s three biggest ticketed attractions are missing from the table above, and it is for the same
            reason in each case: they publish no standing adult price, only the figure shown for your date at
            checkout. Printing an average would be worse than printing nothing.
          </p>
          <div className={styles.stepsList}>
            {EXCLUDED.map((item, i) => (
              <div key={item.name} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>
                    <Link href={item.href} style={{ color: "var(--text)" }}>{item.name} →</Link>
                  </p>
                  <p className={styles.stepDesc}>{item.why}</p>
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/attractions", title: "Things to Do in Japan: Tickets & Experiences (2026)" },
              {
                href: "/guides/attractions/things-to-do-tokyo",
                title: "Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into",
              },
              {
                href: "/guides/attractions/tokyo-observation-decks",
                title: "Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower",
              },
              {
                href: "/guides/attractions/shibuya-sky-tickets",
                title: "Shibuya Sky Tickets (2026): Price, Best Time & How to Book",
              },
              {
                href: "/guides/attractions/tokyo-subway-ticket",
                title: "Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?",
              },
              {
                href: "/guides/attractions/osaka-attractions-pass",
                title: "Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?",
              },
              { href: "/about", title: "How we check the prices on this site" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                    <path d="M13 6v2M13 11v2M13 16v2" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{link.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
