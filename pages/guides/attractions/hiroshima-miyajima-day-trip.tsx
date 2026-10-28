import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { hiroshimaMiyajimaBusTourUrl, osakaAmazingPass, kyotoHighlightBusTour } from "../../../lib/klook-links";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA link — Klook affiliate redirect (tracking link, listing confirmed live 19 Oct 2026),
// shared with the ticket price table.
const HIROSHIMA_TOUR_URL = hiroshimaMiyajimaBusTourUrl;

// Admissions and hours read off itsukushimajinja.jp, hpmmuseum.jp and miyajima-ropeway.info;
// tour duration and departure points as the Klook listing describes them. All checked
// 19 Oct 2026. No tour price is quoted — Klook answers automated reads of its product pages
// with HTTP 403.
// The shrine, ropeway and museum headline admissions and the check date are owned by
// lib/attraction-prices.ts, shared with the ticket price table.
const CHECKED = checkedLabel(PRICES.itsukushima.checked);

const compareRows = [
  {
    option: "DIY by shinkansen",
    cost: "Bullet-train fares; a rail pass covers Hikari and Sakura but not Nozomi or Mizuho",
    flexibility: "Total — set your own pace and stops",
    effort: "Moderate — book trains, plan the ferry and the tides",
  },
  {
    option: "Guided bus tour",
    cost: "One booking; the listing we checked runs 7 hr 40 min with an okonomiyaki lunch",
    flexibility: "Fixed route & timings",
    effort: "Very low — the coach, the guide and the ferry are all arranged",
  },
];

const admissionRows = [
  { item: "Itsukushima Shrine — adult", price: PRICES.itsukushima.adult },
  { item: "Itsukushima Shrine — high school", price: "¥200" },
  { item: "Itsukushima Shrine — elementary / middle school", price: PRICES.itsukushima.child },
  { item: "Shrine + Treasure Hall combined — adult", price: "¥500" },
  { item: "Miyajima Ropeway — adult, round trip", price: PRICES.miyajimaRopeway.adult },
  { item: "Miyajima Ropeway — child (6–11), round trip", price: PRICES.miyajimaRopeway.child },
  { item: "Peace Memorial Museum — adult", price: PRICES.peaceMuseum.adult },
  { item: "Peace Memorial Museum — high school", price: "¥100" },
  { item: "Peace Memorial Museum — junior high and younger", price: "Free" },
];

const whoFor = [
  {
    title: "Do it yourself if…",
    desc: "You're comfortable with bullet trains and want to control the day. The shinkansen makes Hiroshima reachable in roughly 90 minutes to two hours from Osaka or Kyoto, and both the Peace Park and the Miyajima ferry are straightforward to navigate solo.",
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
    desc: `You'd rather not manage the coach, the ferry and the tides. The listing we checked runs 7 hours 40 minutes with an English-speaking guide, a scenic ferry route for the torii photograph and a Hiroshima okonomiyaki lunch, and offers departures from Hiroshima, Osaka, Kyoto or Fukuoka — so if you are coming from Kansai, check which departure point you are booking. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6v12M16 6v12" />
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="7" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Allow a full day either way…",
    desc: "Hiroshima and Miyajima together make a long day out from Kansai. Build in the ferry crossing and the time it takes to do the Peace Memorial Park justice, and treat it as a single full-day trip rather than something to rush.",
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
    title: "Take the shinkansen to Hiroshima",
    desc: "From Osaka it's roughly 90 minutes and from Kyoto about 100–120 minutes by bullet train. If you hold a Japan Rail Pass, note it's valid on Hikari and Sakura services but not on the fastest Nozomi and Mizuho trains — plan around that to avoid an extra fare.",
  },
  {
    title: "Visit the Peace Memorial Park",
    desc: `The Peace Memorial Park sits in central Hiroshima, with the UNESCO-listed Atomic Bomb Dome at its edge. It is a place of remembrance, so allow time to walk it thoughtfully. The museum is ¥200 for an adult, ¥100 for a high-school student and free for junior-high age and younger, and it opens at 7:30 — closing at 19:00 from March to July and September to November, 18:00 from December to February and 20:00 in August. The early-morning and late-evening extensions need an online reservation. Checked ${CHECKED}.`,
  },
  {
    title: "Cross to Miyajima by ferry",
    desc: "From the mainland it's a ferry of about 10 minutes to Miyajima island. The crossing itself is part of the experience, with the island's famous torii gate coming into view as you approach.",
  },
  {
    title: "See Itsukushima Shrine and its floating torii",
    desc: `Itsukushima Shrine and its great torii are UNESCO-listed, and the shrine is cheap to enter: ¥300 for an adult, ¥200 for a high-school student and ¥100 for elementary and middle-school children, or ¥500 for an adult combined ticket with the Treasure Hall. At high tide the torii appears to float. For the wider view, the Mt. Misen ropeway is ¥2,000 return for an adult and ¥1,000 for ages 6 to 11, and it runs up only until 16:00. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How do I get to Hiroshima from Osaka or Kyoto?",
    a: "By shinkansen it's roughly 90 minutes from Osaka and about 100–120 minutes from Kyoto. If you have a Japan Rail Pass, it covers the Hikari and Sakura bullet trains but not the faster Nozomi and Mizuho services — so check which train you board to avoid paying a separate fare.",
  },
  {
    q: "Can I see both Hiroshima and Miyajima in one day?",
    a: "Yes, and it's the classic pairing — but plan for a full day. You'll want enough time to walk the Peace Memorial Park thoughtfully, then take the roughly 10-minute ferry across to Miyajima for Itsukushima Shrine and its floating torii. Going by shinkansen independently or on a guided bus tour both make a same-day round trip from Kansai realistic.",
  },
  {
    q: "Does the Japan Rail Pass work on the train to Hiroshima?",
    a: "Partly. The nationwide Japan Rail Pass is valid on Hikari and Sakura shinkansen to Hiroshima, but not on the fastest Nozomi and Mizuho trains. If you have a pass, board a Hikari or Sakura service; the journey is only modestly longer and you avoid an additional ticket.",
  },
  {
    q: "How much does it cost to visit Itsukushima Shrine and the torii?",
    a: `Less than people expect. Itsukushima Shrine is ¥300 for an adult, ¥200 for a high-school student and ¥100 for elementary and middle-school children; a combined ticket with the Treasure Hall is ¥500 for an adult. The torii itself needs no ticket — you see it from the shore and from the ferry. The expensive optional extra is the Mt. Misen ropeway at ¥2,000 return for an adult, ¥1,100 one way. Read off the official shrine and ropeway sites on ${CHECKED} and subject to change.`,
  },
  {
    q: "What does the whole day cost in admissions?",
    a: `Very little, which is worth knowing before you book a tour on the assumption that it saves money on entry. An adult paying their own way at both ends — the Peace Memorial Museum at ¥200 and Itsukushima Shrine at ¥300 — spends ¥500 on admissions for the day. Transport is where the cost sits: the shinkansen fare, or the tour price. Adding the Mt. Misen ropeway at ¥2,000 return more than quadruples the admissions bill on its own. Checked ${CHECKED}.`,
  },
  {
    q: "When does the floating torii actually 'float'?",
    a: "The great torii of Itsukushima Shrine appears to float on the water at high tide, while at low tide you can often walk out across the sand toward it. Both are worth seeing, so it's worth checking the tide times for your visit and planning which you'd prefer to catch.",
  },
  {
    q: "Are there any closures or reservations I should know about?",
    a: `Three timing details worth checking. The Peace Memorial Museum's extended early-morning and evening hours need a prior online reservation, and the museum closes on 30 and 31 December and for a period in mid-February. The Miyajima Ropeway runs up only until 16:00, with the last descent in the late afternoon, so it is easy to arrive on the island too late for it. And the tides decide whether the torii is floating or standing on sand — both are worth seeing, but only one is the photograph most people have in mind. Checked ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/hiroshima-miyajima-day-trip") } });

export default function HiroshimaMiyajimaDayTripPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Hiroshima and Miyajima Day Trip (2026): Is 1 Day Enough?</title>
        <meta
          name="description"
          content="Hiroshima and Miyajima in one day in 2026: official admissions for the Peace Memorial Museum and Itsukushima Shrine, plus the JR Pass Nozomi catch."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/hiroshima-miyajima-day-trip" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Hiroshima and Miyajima Day Trip (2026): Is 1 Day Enough?" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/hiroshima-miyajima-day-trip" />
        <meta property="og:description" content="Hiroshima and Miyajima in one day in 2026: official admissions for the Peace Memorial Museum and Itsukushima Shrine, plus the JR Pass Nozomi catch." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hiroshima and Miyajima Day Trip (2026): Is 1 Day Enough?" />
        <meta name="twitter:description" content="Hiroshima and Miyajima in one day in 2026: official admissions for the Peace Memorial Museum and Itsukushima Shrine, plus the JR Pass Nozomi catch." />
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
              route: "/guides/attractions/hiroshima-miyajima-day-trip",
              headline: "Hiroshima and Miyajima Day Trip (2026): Is 1 Day Enough?",
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
                { "@type": "ListItem", position: 4, name: "Hiroshima & Miyajima Day Trip", item: "https://www.japan-travel-kit.com/guides/attractions/hiroshima-miyajima-day-trip" },
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
          <span className={styles.breadCurrent}>Hiroshima &amp; Miyajima Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Hiroshima and Miyajima Day Trip (2026):<br />Is One Day Enough?
          </h1>
          <p className={styles.heroSubtitle}>
            Two UNESCO sites in one long day from Kansai: the Peace Memorial Park and Atomic Bomb Dome, then
            Miyajima&apos;s floating torii. Here&apos;s how to do it by shinkansen — or by guided tour.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Two UNESCO Sites", "Shinkansen or Tour"].map((t) => (
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
                <p className={styles.verdictStatLabel}>From Osaka</p>
                <p className={styles.verdictStatValue}>~90 min by shinkansen</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Kyoto</p>
                <p className={styles.verdictStatValue}>~100–120 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Miyajima ferry</p>
                <p className={styles.verdictStatValue}>~10 min crossing</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Admissions, both sites</p>
                <p className={styles.verdictStatValue}>¥500 adult</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> one day is enough, but only just, and only if you accept it as the
              whole day. The Peace Memorial Park and Miyajima&apos;s torii are about an hour apart with a
              ferry in between, and the two admissions come to ¥500 for an adult — the cost of this trip is
              almost entirely the train. Go by shinkansen if you want to set the pace, minding that a Japan
              Rail Pass covers Hikari and Sakura but not Nozomi or Mizuho. Take the coach if you would rather
              not think about tides and ferry timetables; check which city your chosen departure leaves from.
            </p>
            <KlookLink href={HIROSHIMA_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Browse Hiroshima Day Tours →
            </KlookLink>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>A Day of Remembrance and Beauty</h2>
          <p className={styles.bodyText}>
            A Hiroshima and Miyajima day trip brings together two very different but deeply moving places. In the
            city, the Peace Memorial Park and the Atomic Bomb Dome stand as a sober, UNESCO-listed reminder of
            1945 and a powerful call for peace. A short ferry away, the island of Miyajima offers one of
            Japan&apos;s most photographed sights: the great torii of Itsukushima Shrine, also UNESCO-listed,
            appearing to float on the sea at high tide.
          </p>
          <p className={styles.bodyText}>
            We have written this guide with respect for the history involved, focusing on the practical facts
            you need to plan a thoughtful visit — how to get there, what the two admissions actually cost,
            and the handful of timings that can quietly wreck a day trip. For the fares and the Nozomi
            exclusion, see our{" "}
            <Link href="/guides/transport/shinkansen-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              shinkansen guide
            </Link>.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Shinkansen vs tour</span>
          <h2 className={styles.sectionTitle}>DIY by Bullet Train vs a Guided Tour</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Tour duration, inclusions and departure points as the Klook listing described them on {CHECKED}.
            We do not quote a tour price — Klook blocks automated reads of its product pages, so open the
            listing for the figure on your date and departure city.
          </p>
        </section>

        {/* Admissions */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it costs</span>
          <h2 className={styles.sectionTitle}>Admissions, and the One Expensive Extra</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The two headline sights are among the cheapest major attractions in Japan. The thing that moves
            the number is the Mt. Misen ropeway, which costs four times the two admissions put together.
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
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off itsukushimajinja.jp, miyajima-ropeway.info and hpmmuseum.jp on {CHECKED}. The ropeway
            one-way fare is ¥1,100 for an adult and ¥550 for a child, and it runs up only until 16:00.
            Group and other discounts exist at all three. Subject to change — confirm before you go.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which suits you</span>
          <h2 className={styles.sectionTitle}>How Should You Visit?</h2>
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
          <h2 className={styles.sectionTitle}>The Route, Step by Step</h2>
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

        {/* Good to know */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Good to know</span>
          <h2 className={styles.sectionTitle}>The Timings That Catch People Out</h2>
          <p className={styles.bodyText}>
            Three clocks run against you on this trip, and none of them is the shinkansen. The Miyajima
            Ropeway only runs up until 16:00, so an afternoon arrival on the island often means skipping Mt.
            Misen entirely. The Peace Memorial Museum&apos;s extended early and late hours need an online
            reservation, and it closes on 30 and 31 December and for a spell in mid-February. And the tides
            decide what the great torii looks like on the day you arrive. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            For bullet-train classes, seat reservations and where a rail pass does and does not apply, see our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> and{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link>. If you are basing yourself in
            Kansai for this, our <Link href="/guides/attractions/things-to-do-osaka">Osaka</Link> and{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">Kyoto</Link> round-ups cover the days either
            side.
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
          heading="Booking the Hiroshima Day"
          intro="The guided coach that covers both sites, plus the Kansai bookings worth having if you are basing yourself there. Open a listing for the current price on your date and departure city."
          tours={[
            {
              title: "Hiroshima & Miyajima 1-day bus tour",
              desc: "Atomic Bomb Dome, Itsukushima Shrine and an okonomiyaki lunch in 7 hr 40 min, departing Hiroshima, Osaka, Kyoto or Fukuoka",
              url: HIROSHIMA_TOUR_URL,
            },
            osakaAmazingPass,
            kyotoHighlightBusTour,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/himeji-castle-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V9l3-2 4 2 4-2 3 2v12" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Himeji Castle Day Trip (2026): ¥2,500 Admission, and Times From Osaka &amp; Kyoto</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide (2026): Bullet Trains, Seats &amp; the JR Pass</p>
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
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Plan your Hiroshima day</h2>
            <p className={styles.ctaBannerDesc}>
              Going by shinkansen gives you full control over the day. If you&apos;d rather have the trains, ferry,
              and lunch arranged for you, a guided tour covers both Hiroshima and Miyajima with an English guide.
            </p>
            <KlookLink href={HIROSHIMA_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              Browse Hiroshima Day Tours →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
