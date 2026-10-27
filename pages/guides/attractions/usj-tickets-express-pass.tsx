import Head from "next/head";
import Link from "next/link";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygUsj, gygUsjExpressPass } from "../../../lib/gyg-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  jrHarukaUrl,
  jrKansaiMiniPass,
  klookEsim,
  nankaiRapitUrl,
  usjStayAreas,
  usjTripPrep,
} from "../../../lib/klook-links";

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

/**
 * The Express Pass rewrite of 27 Oct 2026 — title, lead, the four tables below, the
 * seven question headings and three new FAQ entries. Written for the exact phrase
 * "universal studios japan express pass", which this page already ranked mid-page
 * for on Bing without earning the click.
 *
 * How usj.co.jp was read, because it decides what this page is allowed to print:
 *
 *   www.usj.co.jp/company/news/              readable. Confirms the 25th-anniversary   27 Oct 2026
 *                                            season (releases of 14 and 28 Sept 2026)
 *                                            and the Holiday Kids Free Pass, on sale
 *                                            from 14 Sept 2026, inviting children
 *                                            nationwide free for the winter.
 *   www.usj.co.jp/company/company_e/          readable. The ticket purchase window:     27 Oct 2026
 *     news/2025/0421/                        "approximately two months prior to
 *                                            visit", lifted to three months on the
 *                                            official WEB Ticket Store and Lawson
 *                                            Ticket for the Osaka Expo period
 *                                            (visit dates to 13 Oct 2025), then
 *                                            reverting to approximately two months.
 *   www.usj.co.jp/web/en/us/tickets/          client-rendered: a direct read returns    27 Oct 2026
 *     express-pass, .../tickets,              the site title and nothing else. Their
 *     .../enjoy/numbered-ticket/              statements quoted below were taken from
 *     timed-entry-ticket,                     the same pages' indexed text, and each
 *     .../news/2026/0630                      is attributed to the page it is on.
 *   member.usj.co.jp, store.usj.co.jp        not machine-readable at all: the member   27 Oct 2026
 *                                            store answers 503, and the WEB Ticket
 *                                            Store sits behind a Queue-it waiting
 *                                            room.
 *
 * So no yen figure for an Express Pass appears on this page. USJ publishes none as a
 * fixed value — the day's price is shown at checkout — and the one surface that would
 * show it cannot be read. The price section prints USJ's own pricing *rules* instead,
 * which is the part that does not go stale.
 */
const CHECKED_USJ = checkedLabel("2026-10-27");

const ticketRows = [
  { ticket: "1-Day Studio Pass", what: "Park entry for one day; ride standard attractions in standby queues", price: "Set per date — the day's price shows at checkout" },
  { ticket: "2-Day Studio Pass", what: "Two consecutive days of entry, often cheaper per day", price: "Set per date — the day's price shows at checkout" },
  { ticket: "Express Pass (add-on)", what: "A shorter, separate queue at a fixed set of attractions. Not park entry — a Studio Pass or Annual Pass is required as well", price: "Set per date, on the system USJ introduced for Express Passes in 2018" },
];

/**
 * Variants. USJ names Express Pass 4 and Express Pass 7 on its own Express Pass
 * page and sells other counts, themed line-ups and area-entry versions alongside
 * them — which ones exist on a given date is a per-date question, so the rows below
 * describe the shape of the line-up rather than claiming a fixed catalogue.
 */
const variantRows = [
  {
    pass: "Express Pass 4",
    covers: "Four attraction slots. USJ describes this one as the pass for the must-see attractions; which four they are is fixed per variant and per date.",
    snw: "Only on the variants that say so",
    bestFor: "A short day, a second visit, or a quiet date where you only want the headliners",
  },
  {
    pass: "Express Pass 7",
    covers: "Seven attraction slots — the larger of the two counts most first-time visitors choose, with the same per-variant attraction list.",
    snw: "Only on the variants that say so",
    bestFor: "One day, first visit, busy date",
  },
  {
    pass: "Other counts and themed variants",
    covers: "USJ also sells Express Passes built around a single attraction or a seasonal line-up, each with its own list. They come and go with the park's events.",
    snw: "Varies by variant",
    bestFor: "A specific ride you cannot leave without, rather than broad coverage",
  },
  {
    pass: "Variants that include area entry",
    covers: "Some Express Passes carry the Area Timed Entry Ticket for Super Nintendo World with them, so you hold the area slot before you arrive.",
    snw: "Yes — that is what the premium buys",
    bestFor: "Anyone for whom Super Nintendo World is the reason for the trip",
  },
];

/** What sets the price. USJ's own rules, each attributed to the page it is on. */
const pricingRows = [
  {
    what: "Express Pass price",
    usj: "Types and prices of valid Express Passes vary depending on the day.",
    source: "Universal Express Pass page, usj.co.jp",
  },
  {
    what: "How long that has been true",
    usj: "Express Passes were set in 2018 using a similar demand-based pricing system, and there are no plans to change them.",
    source: "“Pricing for Studio Passes to Change”, 30 June 2026, usj.co.jp",
  },
  {
    what: "Studio Pass price (the admission you also need)",
    usj: "For tickets sold from 1 July 2026, covering park admission from 1 September 2026, daily prices are re-evaluated by demand. Child and senior prices change too; Annual Passes are excluded.",
    source: "“Pricing for Studio Passes to Change”, 30 June 2026, usj.co.jp",
  },
  {
    what: "USJ's own advice",
    usj: "Prices may increase, so purchase as early as possible.",
    source: "“Pricing for Studio Passes to Change”, 30 June 2026, usj.co.jp",
  },
];

/** The buying window and the sell-out rules. */
const windowRows = [
  {
    q: "How far ahead can I buy?",
    a: "Approximately two months before your visit date, on the official WEB Ticket Store and Lawson Ticket (website and the Loppi machines inside Lawson stores).",
    source: "Purchase-period release, 21 April 2025, usj.co.jp",
  },
  {
    q: "Has that window ever been longer?",
    a: "Yes. It was lifted to three months for the Osaka Expo period, for visit dates up to 13 October 2025, and USJ said it would revert to approximately two months after that.",
    source: "Purchase-period release, 21 April 2025, usj.co.jp",
  },
  {
    q: "How many are sold per day?",
    a: "A limited number each day — USJ's own page says they are often sold out in advance.",
    source: "Universal Express Pass page, usj.co.jp",
  },
  {
    q: "Can I move it to another date?",
    a: "No. An Express Pass bought in advance is valid only for the date printed on it, and a time-designated slot you arrive late for is neither refunded nor re-booked to another time.",
    source: "Universal Express Pass page, usj.co.jp",
  },
];

/** Buy or skip, by the kind of date you are going on. */
const needRows = [
  {
    date: "Quiet weekday, outside Japanese school holidays",
    verdict: "Usually skip",
    why: "Standby queues are at their shortest, and the free area timed-entry route through the official app is the most likely to still have slots when you walk in.",
  },
  {
    date: "Saturday or Sunday",
    verdict: "Buy",
    why: "Weekend demand is what the date-based pricing is pricing. This is the ordinary case for an Express Pass, and the cheaper variants go first.",
  },
  {
    date: "Japanese public holiday or a long weekend",
    verdict: "Buy, and buy early",
    why: "Domestic demand stacks on top of visitor demand, and the day's allocation is capped. On these dates the variant you want is the one most likely to be gone.",
  },
  {
    date: "25th-anniversary and winter holiday dates",
    verdict: "Buy as soon as your date opens",
    why: `2026 is USJ's 25th-anniversary year, and USJ's own newsroom put a Holiday Kids Free Pass on sale on 14 September 2026 inviting children nationwide into the park free this winter — more families on the same dates, read on ${CHECKED_USJ}.`,
  },
  {
    date: "Super Nintendo World is the reason you are going",
    verdict: "Buy a variant that includes area entry",
    why: "It is the only way to hold the area slot before you arrive. The free route exists, but it is first-come inside the park on the day.",
  },
];

/** Where the Express Pass is actually sold. */
const buyRows = [
  {
    where: "USJ WEB Ticket Store (official)",
    what: "Every variant on sale for your date, at the day's price",
    note: "Opens approximately two months ahead. Expect a queue system on popular release days.",
  },
  {
    where: "Lawson Ticket — website and Loppi machines",
    what: "USJ's other named official channel",
    note: "Named alongside the WEB Ticket Store in USJ's 21 April 2025 purchase-period release.",
  },
  {
    where: "Klook",
    what: "The Express Pass as a standalone listing, with an English checkout, foreign-card payment and an e-ticket",
    note: "USJ's own timed-entry page says area entry can also be secured in advance through select travel agencies.",
  },
  {
    where: "GetYourGuide",
    what: "The Express Pass sold on its own, as a second seller",
    note: "Worth a look when your date has gone on the first one — allocations are per seller as well as per day.",
  },
];

const steps = [
  {
    title: "Fix the date first, then buy the Studio Pass",
    desc: "Everything else on this page is keyed to the date. USJ no longer sells tickets at the gate on the day, so the Studio Pass is an online purchase — and it is the admission the Express Pass does not include.",
  },
  {
    title: "Decide whether the date needs an Express Pass",
    desc: "Use the buy-or-skip table above. A quiet weekday often does not need one; a weekend, a Japanese public holiday or an anniversary date does.",
  },
  {
    title: "Check whether the variant carries Super Nintendo World",
    desc: "Area entry is a separate inclusion, not a given. If Super Nintendo World is the reason for the visit, buy a variant that says it includes the Area Timed Entry Ticket.",
  },
  {
    title: "Install the official USJ app before you travel",
    desc: `USJ's own timed-entry page says the official app is required to obtain Area Timed Entry Tickets and Standby Entry Tickets from 5 January 2026, and that you register your admission ticket in it first. Read on ${CHECKED_USJ}.`,
  },
  {
    title: "Arrive before opening",
    desc: "Gates can open earlier than the published time on busy days. Being there early is what makes the free area timed-entry route realistic if you did not buy a variant that includes it.",
  },
];

const faqItems = [
  {
    q: "Do I need to buy USJ tickets in advance?",
    a: "Yes. Universal Studios Japan stopped selling same-day tickets at the gate, so you buy online before you go. Booking through a reseller like Klook gives you an English checkout, accepts foreign cards, and delivers an e-ticket you can scan at entry.",
  },
  {
    q: "Is the USJ Express Pass worth it in 2026?",
    a: `On busy dates, yes. 2026 is USJ's 25th-anniversary year — the park's own newsroom carried anniversary releases on 14 and 28 September 2026, read on ${CHECKED_USJ} — and on a weekend or a public holiday the Express Pass is what turns multi-hour standby queues into a short separate line, with area entry for Super Nintendo World on the variants that include it. On a quiet off-peak weekday it is far less essential: the standby queues are shortest and the free app route into the area is most likely to have slots left.`,
  },
  {
    q: "What's the difference between Express Pass 4 and Express Pass 7?",
    a: "The number is how many attraction slots the pass covers — four or seven. USJ describes Express Pass 4 as the one for the must-see attractions, and Express Pass 7 is the broader of the two. The actual attraction list is fixed per variant and per date, and area entry for Super Nintendo World is only on the variants that say so, so check the inclusions for your own date before buying.",
  },
  {
    q: "Can I use a USJ Express Pass without a Studio Pass?",
    a: `No. USJ's own Express Pass page states that a Studio Pass — or an Annual Pass — is required to enter the park, and that separate theme park admission is needed on top of the Express Pass. The Express Pass only shortens the queue once you are inside. Read on ${CHECKED_USJ}.`,
  },
  {
    q: "How far in advance can I buy the Universal Studios Japan Express Pass?",
    a: `Approximately two months before your visit date. USJ's own purchase-period release of 21 April 2025 says tickets — Studio Pass, Express and the rest — go on sale on the official WEB Ticket Store and Lawson Ticket about two months ahead, that the window was lifted to three months for the Osaka Expo period for visit dates up to 13 October 2025, and that it would then revert to approximately two months. Read on ${CHECKED_USJ}.`,
  },
  {
    q: "Can I change the date on a USJ Express Pass or get a refund?",
    a: `Treat it as fixed. USJ's own Express Pass page states that a pass bought in advance is valid only for the date printed on it, and that if you arrive late for a time-designated attraction there is no refund and no change to another time slot. Read on ${CHECKED_USJ}.`,
  },
  {
    q: "How do I get into Super Nintendo World?",
    a: `There are two routes, and they are USJ's own: in advance, with an Express Pass variant that includes the Area Timed Entry Ticket, or through the official USJ app once you are inside the park. USJ's timed-entry page also says the official app is required to obtain Area Timed Entry Tickets and Standby Entry Tickets from 5 January 2026, and that you register your admission ticket in the app first. Read on ${CHECKED_USJ}. On a quiet day you may walk in, but that is not something to plan a trip around.`,
  },
  {
    q: "How much is the Universal Studios Japan Express Pass?",
    a: `USJ publishes no fixed figure. Its own Express Pass page says the types and prices of valid Express Passes vary depending on the day, and its 30 June 2026 release on Studio Pass pricing says Express Passes have been priced on a demand-based system since 2018 with no change planned. The day's price appears at checkout, which is why no yen figure is quoted here — read on ${CHECKED_USJ}.`,
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

const TITLE = "Universal Studios Japan Express Pass 2026: Types, Prices & Do You Need One";
const DESCRIPTION =
  "Universal Studios Japan Express Pass 2026: what Express Pass 4 and 7 cover, why USJ Express Pass prices change by date, when it sells out, how to buy it, and when you can skip it.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/usj-tickets-express-pass") } });

export default function UsjTicketsExpressPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" />
        {hreflangLinks("/guides/attractions/usj-tickets-express-pass")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" />
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
              route: "/guides/attractions/usj-tickets-express-pass",
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
                { "@type": "ListItem", position: 4, name: "Universal Studios Japan Express Pass", item: "https://www.japan-travel-kit.com/guides/attractions/usj-tickets-express-pass" },
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
          <span className={styles.breadCurrent}>Universal Studios Japan Express Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Universal Studios Japan Express Pass 2026:<br />Types, Prices &amp; Do You Need One
          </h1>
          <p className={styles.heroSubtitle}>
            Express Pass 4 and Express Pass 7, what each one covers, why the price changes with your
            date, and the dates a Studio Pass on its own is enough.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Express Pass 4 vs 7", "Super Nintendo World", "Buy or skip"].map((t) => (
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

        {/* Lead paragraph — the whole answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The <strong>Universal Studios Japan Express Pass</strong> is a paid add-on that puts you in a
            shorter, separate queue at a fixed set of attractions — it is not park admission, so you still
            need a Studio Pass (or an Annual Pass) for the same date. It is sold as numbered variants —{" "}
            <strong>Express Pass 4</strong> and <strong>Express Pass 7</strong> are the two most visitors
            choose, alongside themed line-ups and versions that carry Super Nintendo World area entry — each
            tied to one date, each with its own attraction list, and each priced by the day: USJ&apos;s own
            page says the types and prices of valid Express Passes vary depending on the day, and that only a
            limited number are sold per day and they are often sold out in advance. So the short answer on
            whether you need one is the date: a weekend, a Japanese public holiday or a 25th-anniversary date
            is what an Express Pass is for, and a quiet weekday usually is not. All read on {CHECKED_USJ}.
          </p>
        </section>

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
                <p className={styles.verdictStatLabel}>Price</p>
                <p className={styles.verdictStatValue}>Varies by date — no fixed figure</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On sale</p>
                <p className={styles.verdictStatValue}>About 2 months ahead, capped per day</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> buy the Studio Pass for entry, then decide the Express Pass on your
              date. Express Pass 7 if it is one busy day and you want the headliners; Express Pass 4 if the
              date is quieter or you only want the top few; a variant with area entry if Super Nintendo World
              is the point of the trip.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={STUDIO_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ Studio Pass →
              </KlookLink>
              <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                USJ Express Pass →
              </KlookLink>
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

        {/* Q1 — what it is */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The pass itself</span>
          <h2 className={styles.sectionTitle}>What is the Universal Studios Japan Express Pass?</h2>
          <p className={styles.bodyText}>
            It is a dated add-on that lets you use a shorter Express Pass lane at a fixed set of attractions
            instead of the standby queue. It is <strong>not</strong> park entry: USJ&apos;s own Express Pass
            page says separate theme park admission is required, so a Studio Pass or an Annual Pass has to
            cover the same day. Read on {CHECKED_USJ}.
          </p>
          <p className={styles.bodyText}>
            Two further details matter before you compare variants. Some of the attractions on a pass are
            time-designated and some are not — for the ones that are not, USJ says you can use them any time
            during operating hours — and you show a QR code at the attraction&apos;s Express Pass entrance.
            And the pass only ever covers the attractions printed on it, which is why the variant you buy is
            a bigger decision than the number on the front.
          </p>
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
            USJ pricing rules read on usj.co.jp, {CHECKED_USJ}. No yen figure appears in this table because
            USJ publishes none as a fixed value — see the price section below.
          </p>
        </section>

        {/* Q2 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How much is the Universal Studios Japan Express Pass?</h2>
          <p className={styles.bodyText}>
            There is no single answer, and that is USJ&apos;s own position rather than a hedge: its Express
            Pass page says the types and prices of valid Express Passes vary depending on the day, and its 30
            June 2026 release on Studio Pass pricing says Express Passes have been priced on a demand-based
            system since 2018, with no change planned. What you can plan around is the rules, so those are
            what this table prints.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "What USJ states", `Source (read ${CHECKED_USJ})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.usj}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Why no price band is quoted: the two surfaces that would show one cannot be read. USJ&apos;s
            member ticket pages answered an automated read with HTTP 503 on {CHECKED_USJ}, and the official
            WEB Ticket Store sits behind a virtual waiting room. Rather than repeat a figure from a
            third-party page, this guide prints USJ&apos;s pricing rules and sends you to the day&apos;s own
            checkout price.
          </p>
        </section>

        {/* Q3 — 4 or 7 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which variant</span>
          <h2 className={styles.sectionTitle}>Express Pass 4 or 7 — Which Should I Buy?</h2>
          <p className={styles.bodyText}>
            Express Pass 7 on a busy date and a first visit; Express Pass 4 on a quieter date, a short day or
            a return visit where you only want the top few rides. The number is how many attraction slots the
            pass covers, and the attraction list itself is fixed per variant and per date — so read the
            inclusions for your own date rather than the number on the front.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Variant", "What it covers", "Super Nintendo World", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {variantRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.snw}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Variant names and the area-entry rule read on usj.co.jp, {CHECKED_USJ}. Which variants exist on a
            given date is a per-date question — the line-up changes with the park&apos;s events, so the rows
            above describe the shape of it rather than a fixed catalogue.
          </p>
        </section>

        {/* Q4 — do I need one, then the CTA stack */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Buy or skip</span>
          <h2 className={styles.sectionTitle}>Do I Need an Express Pass for Universal Studios Japan?</h2>
          <p className={styles.bodyText}>
            It depends almost entirely on the date, not on you. On a quiet weekday a Studio Pass on its own
            is usually enough; on a weekend, a Japanese public holiday or a 25th-anniversary date, an Express
            Pass is the difference between riding the headliners and queuing for them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your date", "Express Pass?", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {needRows.map((row) => (
                    <tr key={row.date}>
                      <td className={styles.tdProvider}>{row.date}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* The decision point is the right place for the two sellers, and for the
              rest of the trip underneath them. Nothing above is deleted — these are
              the same destinations the page already carries, brought to the moment a
              reader has just decided. */}
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.pickCta}>
              Check the Express Pass on Klook →
            </KlookLink>
            <GygCompareButton
              slug="usj-tickets-express-pass"
              listing={gygUsjExpressPass}
              label="Compare the Express Pass on GetYourGuide →"
            />
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            And once the date is fixed, three bookings follow from it — the room next to the gates, the way
            in from Kansai Airport, and the data you need for the park&apos;s own app on the day:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={usjStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Universal City hotels on Klook →
            </KlookLink>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the HARUKA ticket on Klook →
            </KlookLink>
            <KlookLink href={jrKansaiMiniPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kansai Mini Pass on Klook →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Klook eSIM options →
            </KlookLink>
          </div>
        </section>

        {/* Q5 — sell-outs and the buying window */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Sell-outs</span>
          <h2 className={styles.sectionTitle}>When Does the USJ Express Pass Sell Out?</h2>
          <p className={styles.bodyText}>
            Whenever the day&apos;s allocation goes — USJ&apos;s own page says a limited number are available
            each day and that they are often sold out in advance, so there is no safe lead time, only an
            earlier one. The window you are buying inside is about two months long, which is the single most
            useful thing to know about it.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Question", "What USJ publishes", `Source (read ${CHECKED_USJ})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {windowRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Practically, that makes the Express Pass the first thing you book after the flights and the room,
            not the last. It also makes a second seller worth a look rather than a nicety: allocations are
            held per seller as well as per day, so a date that has gone on one site is not always gone
            everywhere.
          </p>
        </section>

        {/* Q6 — how to buy */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>How to buy</span>
          <h2 className={styles.sectionTitle}>How Do I Buy the Universal Studios Japan Express Pass?</h2>
          <p className={styles.bodyText}>
            Online, for a specific date, from USJ directly or from a reseller. USJ&apos;s own purchase-period
            release names the official WEB Ticket Store and Lawson Ticket as its channels and puts the window
            at approximately two months before the visit date; resellers sell the same dated product with an
            English checkout.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "What you get", "Worth knowing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Channels and window from USJ&apos;s purchase-period release of 21 April 2025; the travel-agency
            route into Super Nintendo World from USJ&apos;s timed-entry page. Both read on {CHECKED_USJ}.
            Whichever seller you use, the pass is dated and changes and refunds are restricted — see the
            cancellation line in the FAQ below before you commit to a date.
          </p>
          <div className={styles.stepsList} style={{ marginTop: "1.5rem" }}>
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

        {/* Q7 — Super Nintendo World */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Super Nintendo World</span>
          <h2 className={styles.sectionTitle}>Does the Express Pass Include Super Nintendo World?</h2>
          <p className={styles.bodyText}>
            Only if the variant says so. Area entry is a separate inclusion, not something every Express Pass
            carries — USJ&apos;s own timed-entry page describes two routes into the area: in advance, with
            certain Universal Express Passes or through select travel agencies, or through the official USJ
            app once you are inside the park.
          </p>
          <p className={styles.bodyText}>
            The app route is the free one, and it is the one that has tightened. USJ states that from 5
            January 2026 the official app is required to obtain Area Timed Entry Tickets and Standby Entry
            Tickets: you register your park admission ticket in the app, then pick the area, the number of
            people and a time, and show the QR code at the area entrance. Read on {CHECKED_USJ}. It is
            first-come on the day, which is exactly why an Express Pass variant that includes area entry is
            the only way to hold a Super Nintendo World slot before you travel. Install the app and register
            the ticket before you fly — doing it in a queue on a data-less phone is the avoidable version of
            this problem.
          </p>
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
            compares all four areas on the lines and the airport route to each, and our{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              two days in Osaka itinerary
            </Link>{" "}
            shows where a park day fits around the rest of the city.
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
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the HARUKA ticket on Klook →
            </KlookLink>
            <KlookLink href={nankaiRapitUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Nankai Rapi:t on Klook →
            </KlookLink>
            <KlookLink href={jrKansaiMiniPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kansai Mini Pass on Klook →
            </KlookLink>
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
            {/* Was a second, duplicate card for the airport transfer guide — the link
                above is unchanged and this slot now carries the two-day itinerary,
                which is the guide a park-day reader actually needs next. */}
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 2 Day Itinerary (2026): Day by Day, and What to Book</p>
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
              Buy the Studio Pass online for entry, then add the Express Pass variant your date needs — the
              day&apos;s allocation is capped, and the variants with Super Nintendo World area entry go first.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={EXPRESS_PASS_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                View USJ Tickets &amp; Passes →
              </KlookLink>
              <GygCompareButton slug="usj-tickets-express-pass" listing={gygUsjExpressPass} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
