import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  hakoneFreepass,
  hakoneLoopBusTour,
  hakoneCruiseCableCarTour,
  fujiHakoneDayTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";

// Freepass prices and coverage from odakyu-global.com, read 19 Oct 2026. The 2-day
// Shinjuku prices and the check date are owned by lib/attraction-prices.ts, shared with
// the ticket price table.
const P = PRICES.hakoneFreepass;
const CHECKED = checkedLabel(P.checked);

const passRows = [
  { pass: "2-day, from Shinjuku", adult: P.adult, child: P.child },
  { pass: "3-day, from Shinjuku", adult: "¥7,500", child: "¥1,850" },
  { pass: "2-day, from Odawara", adult: "¥6,000", child: "¥1,500" },
  { pass: "3-day, from Odawara", adult: "¥6,400", child: "¥1,750" },
  { pass: "Romancecar surcharge, Shinjuku → Hakone-Yumoto", adult: "¥1,200", child: "¥600" },
];

const covered = [
  "Odakyu Line (Shinjuku to Hakone-Yumoto)",
  "Hakone Tozan Train",
  "Hakone Tozan Cable Car",
  "Hakone Ropeway",
  "Hakone Sightseeing Cruise on Lake Ashi",
  "Hakone Tozan Bus (designated areas)",
  "Odakyu Highway Bus",
  "Tokai Bus (designated areas)",
];

const whoFor = [
  {
    title: "Buy the Freepass if…",
    desc: "You want to do the Hakone loop at your own pace. One pass covers eight modes of transport — train, cable car, ropeway, cruise and three bus operators — so you ride as often as you like and stop where you want. The 2-day from Shinjuku is ¥7,100 for an adult.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "Take a coach tour if…",
    desc: "You would rather not navigate five changes in a day, or you want Hakone paired with Mt. Fuji. A guided day tour from Tokyo compresses the loop into a single booking with a guide and a seat, at the cost of setting your own timings.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="11" rx="2" />
        <circle cx="7.5" cy="18.5" r="1.5" />
        <circle cx="16.5" cy="18.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Stay overnight if…",
    desc: "You can spare the night. There is no 1-day Hakone Freepass — the shortest is 2 days — so a single-day visit pays for a pass you only half use. Hakone is an onsen town, and the second day is already bought.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide: independent on the Freepass, or a guided coach day",
    desc: "This is the whole decision. The Freepass gives you the loop on your own timetable; a coach tour gives you a guide, a seat and no navigation. Neither is wrong — but they cost differently and feel completely different.",
  },
  {
    title: "If you take the Freepass, know there is no 1-day version",
    desc: `The pass comes as 2-day or 3-day only. From Shinjuku that is ¥7,100 (adult) for 2 days and ¥7,500 for 3 — the third day costs ¥400. If you are genuinely going for one day, you are paying for a day you will not use. Prices checked ${CHECKED}.`,
  },
  {
    title: "Add the Romancecar surcharge if you want the fast, seated train",
    desc: `The Freepass covers the Odakyu Line but not the Romancecar limited express, which needs a separate ¥1,200 adult (¥600 child) ticket from Shinjuku to Hakone-Yumoto. On a day trip, where the journey out eats into your time in Hakone, it is usually worth it.`,
  },
  {
    title: "Start from Odawara if you are already on that side",
    desc: "The Hakone-area-only version of the pass, bought from Odawara, is ¥6,000 for 2 days instead of ¥7,100 — it drops the Shinjuku–Odawara leg. That is the right pass if you are arriving by shinkansen, which stops at Odawara.",
  },
  {
    title: "Pick up the pass as a QR voucher rather than queuing",
    desc: "Klook sells the Odakyu Freepass as a digital voucher that you scan to board rather than redeeming for a paper ticket, and the listing notes free entry for children aged 0–5 and that the offer is not open to Japanese passport holders.",
  },
];

const faqItems = [
  {
    q: "How much is the Hakone Freepass?",
    a: `From Odakyu's own site: the 2-day pass from Shinjuku is ¥7,100 for an adult and ¥1,600 for a child, and the 3-day is ¥7,500 / ¥1,850. The Hakone-area-only version from Odawara is ¥6,000 / ¥1,500 for 2 days and ¥6,400 / ¥1,750 for 3. The Romancecar limited express is not included and costs ¥1,200 (adult) or ¥600 (child) extra from Shinjuku to Hakone-Yumoto. Prices checked on ${CHECKED}.`,
  },
  {
    q: "Is there a 1-day Hakone Freepass?",
    a: `No. The pass is sold as a 2-day or 3-day ticket only, which is the single most important thing to know before planning Hakone as a day trip. From Shinjuku the 2-day pass is ¥7,100 for an adult, so a one-day visit means paying for a day of validity you will not use. Either stay the night — Hakone is an onsen town and the second day is already paid for — or take a guided coach day tour instead, where the transport is priced for one day. Checked ${CHECKED}.`,
  },
  {
    q: "What does the Hakone Freepass cover?",
    a: "Unlimited rides on eight modes of transport: the Odakyu Line from Shinjuku to Hakone-Yumoto, the Hakone Tozan Train, the Hakone Tozan Cable Car, the Hakone Ropeway, the Hakone Sightseeing Cruise on Lake Ashi, the Hakone Tozan Bus in designated areas, the Odakyu Highway Bus and the Tokai Bus in designated areas. That set is exactly the classic Hakone loop, which is why the pass is the default way to do it. The Klook listing adds that the pass carries discounts at over 70 local facilities.",
  },
  {
    q: "Is the Romancecar included in the Hakone Freepass?",
    a: `No. The Freepass covers travel on the Odakyu Line, but the Romancecar is a limited express with a separate reserved-seat charge: ¥1,200 for an adult and ¥600 for a child from Shinjuku to Hakone-Yumoto. On a tight day trip it is usually money well spent, because it is the fastest and most comfortable way out of Tokyo and it guarantees you a seat. Checked ${CHECKED}.`,
  },
  {
    q: "Should I do Hakone independently or on a tour?",
    a: "Hakone is one of the easier Japanese day trips to do alone, because the Freepass turns a five-change itinerary into one ticket and the signage on the loop is good. Take a tour if you want Hakone paired with Mt. Fuji in the same day, if you would rather have a guide, or if you are only going for one day — in which case the tour price covers one day of transport rather than the Freepass's minimum of two.",
  },
  {
    q: "What is the Hakone loop?",
    a: "The standard circuit, and what the Freepass is built around: Odakyu Line to Hakone-Yumoto, the Hakone Tozan Train up the mountainside, the cable car, then the ropeway over the Owakudani volcanic valley, down to Lake Ashi for the sightseeing cruise, and a bus back. It can be done in either direction, and most of a day disappears into it comfortably.",
  },
  {
    q: "Can I get to Hakone by shinkansen?",
    a: "Yes — the shinkansen stops at Odawara, which is the gateway station for Hakone and the start point of the cheaper Hakone-area-only Freepass. If you are travelling on a JR Pass, or coming from Kyoto or Osaka rather than Tokyo, Odawara is the natural entry point and the ¥6,000 2-day pass is the one to buy. Our shinkansen guide covers how reservations work.",
  },
  {
    q: "Hakone or Mt. Fuji for a day trip from Tokyo?",
    a: "Hakone gives you more to do and a more reliable day: an onsen town, a volcanic valley, a lake cruise and a transport loop that is a sight in itself. Mt. Fuji gives you the mountain, if the weather cooperates — and the Subaru Line Fifth Station is harder to reach independently. Several tours do both in one day, which is the right answer if you only have one spare day and want to see Fuji at all.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/hakone-day-trip-from-tokyo") } });

const TITLE = "Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour";
const DESC =
  "Hakone Freepass prices from Odakyu for 2026 — ¥7,100 for 2 days from Shinjuku — what the pass covers, why there is no 1-day version, and when a coach day tour is the better buy.";

export default function HakoneDayTripFromTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/hakone-day-trip-from-tokyo" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/hakone-day-trip-from-tokyo" />
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
              route: "/guides/attractions/hakone-day-trip-from-tokyo",
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
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Hakone Day Trip From Tokyo",
                  item: "https://www.japan-travel-kit.com/guides/attractions/hakone-day-trip-from-tokyo",
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
          <span className={styles.breadCurrent}>Hakone Day Trip From Tokyo</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Hakone Day Trip From Tokyo (2026):<br />Freepass Prices vs a Day Tour
          </h1>
          <p className={styles.heroSubtitle}>
            The Hakone Freepass turns a five-change loop into one ticket — but the shortest version lasts two
            days. Here are the official prices, what the pass covers, and when a coach tour wins instead.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official Odakyu prices", "No 1-day pass exists"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Freepass, 2-day</p>
                <p className={styles.verdictStatValue}>¥7,100 from Shinjuku</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Freepass, 3-day</p>
                <p className={styles.verdictStatValue}>¥7,500 (+¥400)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Romancecar</p>
                <p className={styles.verdictStatValue}>+¥1,200, not included</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1-day pass?</p>
                <p className={styles.verdictStatValue}>Does not exist</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> if you are staying a night, buy the Freepass — ¥7,100 for two days from
              Shinjuku, covering eight modes of transport around the loop. If you really are going for one day
              only, a guided coach tour prices the transport for one day rather than two, and can pair Hakone
              with Mt. Fuji. Prices read off Odakyu&apos;s own site on {CHECKED}.
            </p>
            <a href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check the Hakone Freepass on Klook →
            </a>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What a Hakone Day Looks Like</h2>
          <p className={styles.bodyText}>
            Hakone is an onsen town in a caldera about 90 minutes south-west of Tokyo, and the standard visit is
            a loop rather than a destination: Odakyu Line to Hakone-Yumoto, the Hakone Tozan Train up the
            mountainside, a cable car, the ropeway over the steaming Owakudani valley, a cruise across Lake Ashi
            and a bus back. The transport <em>is</em> the sightseeing.
          </p>
          <p className={styles.bodyText}>
            That is also why the Hakone Freepass exists. Buying each of those legs separately is a lot of
            tickets; the pass bundles them, plus discounts around the area. The catch — and it is the thing most
            day-trip planners miss — is that the shortest Freepass is <strong>two days</strong>.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Hakone Freepass Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things stand out. The third day costs only ¥400 more than the second, so if there is any chance
            of staying on, take the 3-day. And the Odawara version is ¥1,100 cheaper because it drops the
            Shinjuku–Odawara leg — the right pass if you are arriving by shinkansen, which stops at Odawara.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off Odakyu&apos;s official English site on {CHECKED}. Subject to change — confirm at purchase.
          </p>
        </section>

        {/* What it covers */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>The Eight Modes of Transport</h2>
          <p className={styles.bodyText}>
            Odakyu lists the Freepass as covering unlimited rides on eight modes of transport:
          </p>
          <ul className={styles.bodyList}>
            {covered.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.bodyText}>
            Between them, those eight are the entire classic loop — which is the reason the pass is the default
            answer for Hakone rather than one option among several. What is <strong>not</strong> covered is the
            Romancecar limited express seat charge: ¥1,200 for an adult from Shinjuku to Hakone-Yumoto. On a
            compressed day trip, that is usually worth paying.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Coverage list and the Romancecar surcharge from Odakyu&apos;s official site, checked {CHECKED}.
          </p>
        </section>

        {/* Who for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which approach</span>
          <h2 className={styles.sectionTitle}>Freepass, Coach Tour, or Stay the Night?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            If you want Mt. Fuji in the same day, the combined tours are the only realistic way to do it — our{" "}
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo">Mt. Fuji day tour guide</Link> compares
            the Fuji-only and Fuji-plus-Hakone options side by side.
          </p>
        </section>

        {/* How to plan */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Plan a Hakone Day Trip</h2>
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
            Coming from further afield, or weighing a rail pass? The{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers the Odawara
            approach, and the <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> works out
            whether a pass is worth it for your itinerary. For the Tokyo end of the journey, see{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link>.
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
          heading="The Pass and the Tours"
          intro="The Freepass for an independent loop, or a guided coach day if you would rather not navigate it. Open a listing for the price on your date."
          tours={[hakoneFreepass, hakoneLoopBusTour, hakoneCruiseCableCarTour, fujiHakoneDayTour]}
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
            <Link href="/guides/attractions/kamakura-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kamakura Day Trip From Tokyo (2026): Great Buddha, Hase-dera &amp; the Fares</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
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
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 16V8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <path d="M6 20l2-4M18 20l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
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
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M7 20h10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
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
            <h2 className={styles.ctaBannerTitle}>Eight modes of transport, one ticket</h2>
            <p className={styles.ctaBannerDesc}>
              Klook sells the Odakyu Hakone Freepass as a QR voucher you scan to board, with no counter
              redemption. Children aged 0–5 travel free on the listing.
            </p>
            <a href={hakoneFreepass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View the Hakone Freepass on Klook →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
