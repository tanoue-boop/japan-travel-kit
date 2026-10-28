import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  fujiQHighlandQPack,
  fujiQHighlandPass,
  fujiQHighlandAdmission,
  tokyoMtFujiHighwayBus,
  mtFujiPass,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";

// Pass price bands, the free-entry rule, the coaster names and the rail/bus access
// below were read off fujiq.jp (/en/, /en/ticket/ and /en/access/) on 20 Oct 2026.
// The four Klook listings were confirmed live through the www.klook.com search index
// the same day; Klook answers automated reads of its product pages with HTTP 403, so
// no Klook price appears on this page.
// The adult and elementary 1-Day Pass bands and the check date are owned by
// lib/attraction-prices.ts, shared with the ticket price table.
const P = PRICES.fujiQHighland;
const CHECKED = checkedLabel(P.checked);

const priceRows = [
  { ticket: "Park entry (no rides)", day: "Free", afternoon: "Free" },
  { ticket: "1-Day Pass — adult (18–64)", day: P.adult, afternoon: "¥4,100 – ¥6,000" },
  { ticket: "1-Day Pass — junior / senior high", day: "¥5,500 – ¥7,400", afternoon: "¥3,800 – ¥5,700" },
  { ticket: "1-Day Pass — elementary", day: P.child, afternoon: "¥3,500 – ¥4,200" },
  { ticket: "1-Day Pass — toddler (1 and over)", day: "¥2,100 – ¥2,600", afternoon: "¥1,700 – ¥2,100" },
  { ticket: "1-Day Pass — senior (65+)", day: "¥2,100 – ¥2,600", afternoon: "¥1,700 – ¥2,100" },
];

const whoFor = [
  {
    title: "Q Pack if…",
    desc: "You are coming from Tokyo without a car. It bundles the 1-Day Free Pass with the round-trip highway bus from Shinjuku or Ueno, so the whole day is one booking instead of three — and the bus ends at the park's own terminal rather than at a station you then have to transfer from.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M3 11h18M7 17v3M17 17v3" />
      </svg>
    ),
  },
  {
    title: "Pass only if…",
    desc: "You are already in the Fuji Five Lakes area, or you are arriving by train. The 1-Day Pass is unlimited rides and starts at ¥6,000 for an adult, which is the figure worth comparing against buying individual ride tickets inside the park.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
        <path d="M3 21h18" />
      </svg>
    ),
  },
  {
    title: "Entry only if…",
    desc: "The rides are not the point. Entry to Fuji-Q is free, and you can pay for individual attractions at the machines inside — which is the sensible route if you are there for the Mt. Fuji views, the Naruto and Thomas areas, or one single coaster.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20l6-12 3 5 2-3 7 10z" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Know that entry is free — the pass is for the rides",
    desc: `Fuji-Q's own ticket page says the park is free to enter, with ride tickets sold at machines inside. So the question is never whether to buy a ticket; it is whether to buy the 1-Day Pass or pay per ride. Checked ${CHECKED}.`,
  },
  {
    title: "Check the price for your date, not the headline figure",
    desc: `The pass is priced by season and by date: ¥6,000 to ¥7,900 for an adult 1-Day Pass, and ¥4,100 to ¥6,000 for the Afternoon Pass from 13:00. Fuji-Q publishes month-by-month tables, so look up the date you are actually going before you budget for it. Checked ${CHECKED}.`,
  },
  {
    title: "Decide how you are getting there before you buy the pass",
    desc: "This is what separates the Klook listings. The Q Pack includes the round-trip highway bus from Tokyo; the plain pass does not. If you are travelling by train — JR to Otsuki, then the Fujikyuko Line to Fuji-Q Highland Station — the plain pass is the one you want.",
  },
  {
    title: "Check the operating hours for your date",
    desc: `Hours move around: the English site showed 9:00 to 19:00 on the day we checked and publishes a per-date park-hours page alongside a live operating status for the rides. Both are worth a look the morning you go, because a coaster can be down on the day. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much are Fuji-Q Highland tickets?",
    a: `Entry to Fuji-Q Highland is free. What costs money is riding: the 1-Day Pass is ¥6,000 to ¥7,900 for an adult aged 18–64, ¥5,500 to ¥7,400 for a junior or senior high-school student, ¥4,400 to ¥5,100 for an elementary-school child and ¥2,100 to ¥2,600 for a toddler aged 1 and over or a senior aged 65 and over. The Afternoon Pass, valid from 13:00, is ¥4,100 to ¥6,000 for an adult. Prices vary by date. Figures read off fujiq.jp on ${CHECKED}.`,
  },
  {
    q: "Is entry to Fuji-Q Highland really free?",
    a: `Yes — the official ticket page states that Fuji-Q Highland has free entrance, and that visitors buy ride tickets from machines inside the park. That makes it unusual among Japanese theme parks and genuinely useful if you are travelling with someone who does not ride: they can come in, see the park and the Mt. Fuji views, and pay nothing. Checked ${CHECKED}.`,
  },
  {
    q: "What is the Fuji-Q Highland Q Pack?",
    a: "It is the 1-Day Free Pass sold together with a round-trip highway bus transfer from Tokyo, choosing Shinjuku or Ueno as your departure point. The listing describes direct access to the park within about three hours of leaving Tokyo, with the pass handed to you on the bus against your voucher. For a visitor without a car it removes the two awkward parts of the day — the transfer and the separate ticket purchase.",
  },
  {
    q: "Is the 1-Day Pass worth it, or should I pay per ride?",
    a: "It comes down to how many of the big coasters you intend to ride. The pass starts at ¥6,000 for an adult, so if you are there for Fujiyama and one or two others, individual ride tickets bought inside can work out cheaper — and entry costs nothing either way. If you want an unlimited day across Fujiyama, Eejanaika, Takabisha and Tentekomai, the pass is the obvious buy. Check the current per-ride prices at the machines against the pass price for your date.",
  },
  {
    q: "How do I get to Fuji-Q Highland from Tokyo?",
    a: `Two routes. By train, take a JR service to Otsuki and transfer to the Fujikyuko Line, which has its own Fuji-Q Highland Station. By road, the highway bus from Tokyo runs to a terminal in the Highland Resort Hotel & Spa car park, right at the park — which is why the bus-inclusive Q Pack is the simpler option for a day trip. Access details read off the official site on ${CHECKED}.`,
  },
  {
    q: "What are the main roller coasters at Fuji-Q Highland?",
    a: "The four the park itself leads with are Fujiyama, billed as the King of Coasters; Eejanaika, a fourth-dimension hypercoaster; Takabisha, which it bills as the steepest roller coaster; and Tentekomai, a sky roller. There are also themed areas built around Naruto, Thomas the Tank Engine and San-X characters, which is what makes the free-entry rule useful for mixed groups.",
  },
  {
    q: "Can you see Mt. Fuji from Fuji-Q Highland?",
    a: "The park sits at the foot of the mountain near Kawaguchiko, and the mountain is the backdrop to it on a clear day — the highway bus listing sells the view on the way in as part of the trip. As anywhere in the Fuji Five Lakes, visibility depends on the weather, and the cooler, drier months give better odds than midsummer. Treat it as the reason to pick a clear forecast rather than a guarantee.",
  },
  {
    q: "Should I combine Fuji-Q with the rest of the Fuji area?",
    a: "If the coasters are the main event, no — a full day on the pass is a full day. If you are riding only a couple of things, Fuji-Q Highland Station is on the Fujikyuko Line one stop from Kawaguchiko, which puts the lake, the ropeway and the Fuji viewpoints within reach of the same day. That is the case where a Mt. Fuji area pass covering local buses and trains does more for you than the ride pass.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/fuji-q-highland-tickets") } });

const TITLE = "Fuji-Q Highland Tickets (2026): Pass Prices and the Q Pack";
const DESCRIPTION =
  "Fuji-Q Highland tickets in 2026: entry is free, the 1-Day Pass is ¥6,000–¥7,900 for an adult by date, and the Q Pack adds the highway bus from Tokyo.";

export default function FujiQHighlandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/fuji-q-highland-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/fuji-q-highland-tickets" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
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
              route: "/guides/attractions/fuji-q-highland-tickets",
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
                { "@type": "ListItem", position: 4, name: "Fuji-Q Highland Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/fuji-q-highland-tickets" },
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
          <span className={styles.breadCurrent}>Fuji-Q Highland Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Fuji-Q Highland Tickets (2026):<br />Free Pass Prices, the Q Pack &amp; How to Get There
          </h1>
          <p className={styles.heroSubtitle}>
            Entry to the park is free — what you are buying is the right to ride. The 1-Day Pass is ¥6,000
            to ¥7,900 for an adult depending on the date, and if you are coming from Tokyo the Q Pack bundles
            that pass with the round-trip highway bus, which makes the whole day one booking.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Free park entry"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Park entry</p>
                <p className={styles.verdictStatValue}>Free</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1-Day Pass (adult)</p>
                <p className={styles.verdictStatValue}>¥6,000 – ¥7,900</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Afternoon Pass (adult)</p>
                <p className={styles.verdictStatValue}>¥4,100 – ¥6,000, from 13:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Tokyo</p>
                <p className={styles.verdictStatValue}>Q Pack (pass + highway bus)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> do not buy an entry ticket — there is no such thing, entry is free.
              Buy the 1-Day Pass if you want unlimited rides, the Afternoon Pass if you are arriving after
              lunch, or nothing at all and pay per ride at the machines inside. Coming from Tokyo without a
              car, the Q Pack is the one to book: it is the same pass with the round-trip bus from Shinjuku
              or Ueno attached. Pass prices read off fujiq.jp on {CHECKED}.
            </p>
            <KlookLink href={fujiQHighlandQPack.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check the Fuji-Q Q Pack on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What You Are Buying at Fuji-Q</h2>
          <p className={styles.bodyText}>
            Fuji-Q Highland is the coaster park at the foot of Mt. Fuji, near Kawaguchiko. The park it leads
            with is four rides — Fujiyama, which it calls the King of Coasters, the fourth-dimension
            Eejanaika, the steep-drop Takabisha and the Tentekomai sky roller — plus themed areas built
            around Naruto, Thomas the Tank Engine and San-X characters.
          </p>
          <p className={styles.bodyText}>
            The ticket structure is different from every other big Japanese park, and it is worth getting
            straight before you book. There is no admission fee: you walk in free and either buy a 1-Day
            Pass for unlimited rides or pay for individual attractions at the machines inside. The pass price
            then moves with the date, across a ¥1,900 band for an adult.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Fuji-Q Highland Pass Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "1-Day", "Afternoon (from 13:00)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.day}</td>
                      <td className={styles.tdPrice}>{row.afternoon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off fujiq.jp on {CHECKED} and subject to change — the park prices by date and publishes
            month-by-month tables, so check the figure for your own date. Entry to the park itself is free
            whether or not you buy a pass; individual ride tickets are sold at machines inside.
          </p>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Q Pack, Pass, or Nothing at All?</h2>
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

        {/* The three Klook listings, Q Pack (bus-inclusive) first. */}
        <KlookTourPicks
          heading="The Three Fuji-Q Listings, in Order"
          intro="All three are the same park; what differs is whether the transport and the rides are in the price. The Q Pack is the one to book from Tokyo, the plain pass if you are arriving by train, and the admission ticket if you are going for the views and the themed areas rather than the coasters."
          tours={[fujiQHighlandQPack, fujiQHighlandPass, fujiQHighlandAdmission]}
        />

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Fuji-Q Highland Tickets</h2>
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
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>Train via Otsuki, or the Bus to the Gate</h2>
          <p className={styles.bodyText}>
            By rail, the route is a JR service to Otsuki and then the Fujikyuko Line, which has a station
            named after the park: Fuji-Q Highland. By road, the highway bus from Tokyo terminates at a bus
            terminal inside the Highland Resort Hotel &amp; Spa car park, which is at the park itself rather
            than a walk away. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            That difference is why the bus-inclusive Q Pack exists and why it is usually the better buy for a
            day trip: the coach drops you at the gate and takes you back, and there is no rail transfer at
            Otsuki to time. If you would rather keep the day flexible, our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              independent Mt. Fuji day trip guide
            </Link>{" "}
            covers the same corridor without a park ticket attached.
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

        {/* Transport-only alternatives for anyone skipping the Q Pack. */}
        <KlookTourPicks
          heading="Getting There Without the Q Pack"
          intro="If you already have a pass, or you want the Fuji Five Lakes rather than the coasters, these two cover the journey on their own — the highway bus serves Fuji-Q Highland and Kawaguchiko, and the area pass covers the local buses and trains once you are there."
          tours={[tokyoMtFujiHighwayBus, mtFujiPass]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 17s2-3 5-3 4 3 7 3 4-3 4-3" />
                  <path d="M5 12l4-7 4 6 2-2 4 5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20l6-12 3 5 2-3 7 10z" />
                  <line x1="2" y1="20" x2="22" y2="20" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <path d="M3 11h18M7 17v3M17 17v3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-2.8L7 19l1-6-4-4 5.5-.5z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18M3 12h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sanrio Puroland Tickets (2026): Prices, Variable Pricing &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets (2026): Prices, Main Deck vs Top Deck &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
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
            <h2 className={styles.ctaBannerTitle}>One booking for the whole day</h2>
            <p className={styles.ctaBannerDesc}>
              The Q Pack puts the 1-Day Free Pass and the round-trip highway bus from Shinjuku or Ueno on one
              voucher, with an English checkout — which is the difference between a day trip and a logistics
              exercise.
            </p>
            <KlookLink href={fujiQHighlandQPack.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View the Fuji-Q Q Pack →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
