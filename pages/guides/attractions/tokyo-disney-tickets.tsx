import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { fujiDayTour, tokyoDisneyTripPrep, tokyoSightseeingBusTour } from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygTokyoDisneyResort, gygTokyoDisneySea } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";

const DISNEY_TICKET_URL = "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1304885&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F695-tokyo-disney-resort-1-day-pass-tokyo%2F";

/**
 * Rewritten 28 Oct 2026 for the exact phrase "tokyo disneyland tickets 2026", which was
 * the second-biggest search term bringing this page impressions on Bing (6.2nd there,
 * 9.8th on Google off 129 impressions) without earning the clicks.
 *
 * Every rule and figure below is Tokyo Disney Resort's own, read on 28 Oct 2026 and
 * sourced per row. The resort's main ticket pages are not machine-readable — an
 * automated read of www.tokyodisneyresort.jp and plan.tokyodisneyresort.jp times out —
 * but faq.tokyodisneyresort.jp answers directly, so most of what is printed here is
 * quoted from the official FAQ and attributed to the answer it comes from:
 *
 *   www.tokyodisneyresort.jp/ticket/   the 1-Day Passport's published minimums —        28 Oct 2026
 *                                      大人 ¥8,900–, 中人 ¥7,400–, 小人 ¥5,300– — the age
 *                                      bands, and the sales rule "2カ月先の同日分のチケット
 *                                      を14:00より販売しています".
 *   faq.tokyodisneyresort.jp           「パークチケットは、変動価格制のため、来園日によって   28 Oct 2026
 *     (料金/種類/当日購入/購入場所/        料金が異なります。」·「東京ディズニーランド、東京
 *      払い戻し/再販売/運営時間/            ディズニーシー現地では、パークチケットを販売して
 *      パークホッパー)                     おりません。」·「パークチケットが売り切れで購入でき
 *                                      ない場合は、ご入園いただけません」·「お客様のご都合に
 *                                      よるパークチケットのキャンセルや払い戻しはできません。」
 *                                      ·「売り切れとなったパークチケットの券種が予告なく再販売
 *                                      となる可能性があります。」·「パークの運営時間は、約5カ月
 *                                      前より……告知をしています。」·「1日に2つのパークに入園
 *                                      できる『1デーパークホッパーパスポート（期間限定）』は
 *                                      現在販売していません。」
 *
 * No yen figure is presented as a fixed price: the resort's own position is that the
 * price moves with the visit date, so the figures below are the published minimums and
 * are labelled as such. No Klook price appears anywhere — Klook answers automated reads
 * of its product pages with HTTP 403.
 */
const CHECKED = checkedLabel("2026-10-28");

/** The published minimums, by the resort's own age bands. */
const priceRows = [
  { band: "Adult (大人)", who: "18 and over", price: "From ¥8,900" },
  { band: "Junior (中人)", who: "12–17 — junior and senior high school age", price: "From ¥7,400" },
  { band: "Child (小人)", who: "4–11 — preschool and elementary age", price: "From ¥5,300" },
  { band: "Infant", who: "3 and under", price: "Free" },
];

/** Which passports exist, and when each one lets you through the gate. */
const ticketRows = [
  {
    ticket: "1-Day Passport",
    entry: "From opening time",
    dates: "All days",
    note: "One park for one day, with the date and the park fixed when you buy. This is the ordinary ticket.",
  },
  {
    ticket: "After 3 Passport (holidays only)",
    entry: "From 15:00",
    dates: "Holiday dates",
    note: "A cheaper way into one park for an evening, on the dates it is offered.",
  },
  {
    ticket: "After 5 Passport (weekdays only)",
    entry: "From 17:00",
    dates: "Weekdays",
    note: "The shortest and cheapest entry, for a weeknight visit.",
  },
  {
    ticket: "1-Day Park Hopper (limited period)",
    entry: "—",
    dates: "Not currently on sale",
    note: "The resort's FAQ states it is not being sold at present; to do both parks in one trip, buy a ticket for each park.",
  },
  {
    ticket: "Multi-day passports",
    entry: "—",
    dates: "Not sold",
    note: "The FAQ on ticket types says no passport covering two or more consecutive days is sold.",
  },
];

/** Operating hours — set per date, not a standing figure. */
const hoursRows = [
  {
    what: "Opening and closing time",
    detail:
      "Set per date. The resort publishes them on its own operating calendar rather than as standing hours, and the ticket purchase screen shows the hours for whichever date you select.",
  },
  {
    what: "How far ahead hours are published",
    detail: "About five months. The FAQ states operating hours are announced on the official website roughly five months in advance.",
  },
  {
    what: "What this means for a ticket",
    detail:
      "Your date opens for sale about two months ahead, by which point its hours have been published for months — so check the calendar before you buy, not after. An After 5 Passport on a date that closes at 20:00 is a three-hour visit.",
  },
];

/** The buying window, the sell-outs and what you can and cannot undo. */
const buyingRows = [
  {
    q: "When does my date go on sale?",
    a: "Tickets for the same date two months ahead go on sale every day from 14:00 Japan time — so a 1 March visit opens at 14:00 on 1 January. Where the month has no matching date, sale starts at 14:00 on the 1st of the following month.",
  },
  {
    q: "How many can I buy at once?",
    a: "Up to ten tickets per order, and sales for a date can be suspended without notice once that day's number has been reached.",
  },
  {
    q: "Are there gate tickets?",
    a: "No. The FAQ is explicit that park tickets are not sold at Tokyo Disneyland or Tokyo DisneySea. Buying on the day is only possible on the official website or app while allocation remains — and if tickets are sold out, you cannot enter.",
  },
  {
    q: "Any exception to that?",
    a: "Disney Hotel guests, who can buy a same-day ticket at their hotel. Otherwise the website and the app are the only same-day route, alongside some travel agents and convenience stores for tickets bought ahead.",
  },
  {
    q: "Can I cancel for a refund?",
    a: "No. Cancellation and refund for your own reasons are not available, and the FAQ covering bad weather, an earthquake or any other reason for not visiting on the designated date points at the same rule.",
  },
  {
    q: "Can I move the date instead?",
    a: "Yes, and this is the flexibility that exists. An online ticket can be changed within its validity period, before or after the designated entry date, with no limit on the number of changes — each change settles at the new date's price. Changes are made on the website or in the app, not at the parks.",
  },
  {
    q: "My date is sold out — is that final?",
    a: "Not necessarily. The FAQ says a sold-out ticket type can go back on sale without notice, and when another guest moves their ticket to a different date, the slot they vacate returns to the sales pool and is sold online again. Checking back is worth more than it sounds.",
  },
];

const parkRows = [
  {
    park: "Tokyo Disneyland",
    style: "Classic Disney castle park: parades, fireworks, family rides",
    suits: "First-timers, families with younger kids, classic-Disney fans",
    note: "Familiar layout if you've visited other Disney parks",
  },
  {
    park: "Tokyo DisneySea",
    style: "Nautical, water-themed park; more unique to Tokyo, more adult-leaning; alcohol served",
    suits: "Adults, couples, repeat visitors wanting something different",
    note: "Marking its 25th anniversary (April 2026 – March 2027)",
  },
];

const whoFor = [
  {
    title: "Choose Tokyo Disneyland if…",
    desc: "You're visiting with younger children or it's your first Disney park anywhere. The layout follows the classic castle-park formula, with daytime parades and an emphasis on family-friendly attractions — an easy, familiar day out.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V11l4-3 5 4 5-4 4 3v10z" />
        <path d="M12 21v-5" />
        <path d="M7 11V6l2-2 2 2v2" />
      </svg>
    ),
  },
  {
    title: "Choose Tokyo DisneySea if…",
    desc: "You want something you can't get at any other Disney resort, and you're an adult or travelling without small children. DisneySea leans more grown-up, its themed harbours are unique to Tokyo, and — unlike Disneyland — it serves alcohol.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12V7a7 7 0 0 1 14 0v5" />
        <path d="M4 16c2 1.5 4-1.5 8 0s6-1.5 8 0" />
      </svg>
    ),
  },
  {
    title: "Going in 2026? Note the anniversary",
    desc: "Tokyo DisneySea is celebrating its 25th anniversary from April 2026 to March 2027. Anniversary seasons draw bigger crowds on popular dates, and with variable pricing those dates are also the expensive ones — so book the moment your date opens, two months ahead.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 5.4 5.6.5-4.2 3.8 1.3 5.7L12 14.8 6.9 17.4l1.3-5.7L4 7.9l5.6-.5z" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Fix the date and the park before anything else",
    desc: "Every Tokyo Disney ticket is date- and park-specified, and the 1-Day Park Hopper that let you do both in a day is not currently sold. Two parks means two tickets on two days.",
  },
  {
    title: "Check that date's hours on the operating calendar",
    desc: "Hours are set per date and published about five months ahead. They decide whether an After 5 Passport is an evening or a sliver of one, and whether the fireworks fall inside your visit.",
  },
  {
    title: "Be at the checkout at 14:00 JST, two months out",
    desc: "That is when your date goes on sale. Put it in your calendar in your own time zone — 14:00 in Tokyo is 05:00 in London and midnight in New York — because the day's allocation is capped and sales can stop without notice.",
  },
  {
    title: "Use Klook if a foreign card is the problem",
    desc: "The official Tokyo Disney Resort site frequently rejects or blocks foreign-issued credit cards. Klook is an officially authorized seller that accepts foreign cards and checks out in English, which is why many overseas visitors use it.",
  },
  {
    title: "Link your e-ticket QR into the official app",
    desc: "After buying you receive an e-ticket QR code, which you can register in the official Tokyo Disney Resort app — also where you manage in-park features on the day. Set it up before you arrive.",
  },
];

const faqItems = [
  {
    q: "How much are Tokyo Disneyland tickets in 2026?",
    a: `There is no single price: Tokyo Disney Resort states plainly that park tickets are priced by the visit date. What it publishes are the minimums for a 1-Day Passport — from ¥8,900 for an adult (18 and over), from ¥7,400 for a junior (12–17), from ¥5,300 for a child (4–11), and free for 3 and under — with the actual figure for your date shown once you select it. Read on ${CHECKED}. A peak date, and especially a DisneySea 25th-anniversary date, sits well above the floor.`,
  },
  {
    q: "Do you need to buy Tokyo Disney tickets in advance?",
    a: `Effectively yes. The resort's own FAQ states that park tickets are not sold at Tokyo Disneyland or Tokyo DisneySea, so there is no gate to buy at. Buying on the day is possible on the official website or app only while that date still has allocation, and the FAQ is blunt about the consequence: if tickets are sold out, you cannot enter. Read on ${CHECKED}.`,
  },
  {
    q: "When do Tokyo Disney tickets go on sale?",
    a: `Tickets for the same date two months ahead go on sale every day from 14:00 Japan time — a 1 March visit opens at 14:00 on 1 January — and where the month has no matching date, sale starts at 14:00 on the 1st of the following month. Up to ten tickets can be bought per order, and sales for a date can be suspended without notice once that day's number is reached. Read on ${CHECKED}.`,
  },
  {
    q: "Which Tokyo Disney ticket should you buy?",
    a: "The 1-Day Passport for a full day in one park, an After 5 Passport if you want a cheap weeknight evening, and an After 3 Passport for a holiday-date evening from 15:00. If you want both parks, you buy a separate ticket for each — the 1-Day Park Hopper is not currently on sale. No multi-day passport is sold either, so a two-park trip is two dated tickets.",
  },
  {
    q: "What are the Tokyo Disney park opening hours?",
    a: `They are set per date rather than published as standing hours, and the resort announces them on its official website about five months in advance; the ticket purchase screen also shows the hours for the date you select. Check the operating calendar for your own date before you buy — it is what decides whether an evening passport is worth the saving. Read on ${CHECKED}.`,
  },
  {
    q: "Can you change the date on a Tokyo Disney ticket, or get a refund?",
    a: `No refund, but yes to a date change. Cancellation and refund for your own reasons are not available — the FAQ covering bad weather, an earthquake or any other reason for not going on the designated date points at the same rule. An online ticket can be changed within its validity period, before or after the designated date, with no limit on the number of changes, each settling at the new date's price, through the official website or app rather than at the parks. Read on ${CHECKED}.`,
  },
  {
    q: "My date is sold out — can I still get in?",
    a: `Possibly. The resort's FAQ says a sold-out ticket type can go back on sale without notice, and that when a guest changes their ticket to another date the slot they leave returns to the original sales pool and is sold online again. So checking back on the official site and the app is worth doing — and so is a second seller, since allocations are per seller as well as per day. Read on ${CHECKED}.`,
  },
  {
    q: "Can you buy Tokyo Disney tickets with a foreign credit card?",
    a: "On the official Tokyo Disney Resort website, often no — it frequently rejects or blocks foreign-issued cards, a long-running frustration for overseas visitors. The usual workaround is Klook, an officially authorized seller that accepts foreign cards, checks out in English, and issues an e-ticket QR you can register in the official Tokyo Disney Resort app.",
  },
  {
    q: "Which should you choose, Tokyo Disneyland or Tokyo DisneySea?",
    a: "A 1-Day Passport covers one park, so you pick. Tokyo Disneyland is the classic castle park — parades and family-friendly attractions that suit first-timers and families with younger children. Tokyo DisneySea is nautical-themed, more unique to Tokyo, leans more adult, serves alcohol, and is marking its 25th anniversary from April 2026 to March 2027. First visit with kids, Disneyland; something distinctive, DisneySea.",
  },
  {
    q: "How do you get to Tokyo Disney Resort?",
    a: "Maihama station on the JR Keiyo Line, 15 to 20 minutes out of Tokyo Station, then the Disney Resort Line monorail or a short walk to the Disneyland gates. It is a commute to make before opening and again after the night show, which is the argument for staying at Maihama or one stop out if your date is a weekend or an anniversary date.",
  },
];

const TITLE = "Tokyo Disneyland Tickets 2026: Prices, Rules & DisneySea";
const DESCRIPTION =
  "Tokyo Disneyland tickets in 2026 start at ¥8,900 for an adult and are date-specified: no gate sales, sales open two months ahead, and no refunds.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-disney-tickets") } });

export default function TokyoDisneyTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-disney-tickets" />
        {hreflangLinks("/guides/attractions/tokyo-disney-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-disney-tickets" />
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
              route: "/guides/attractions/tokyo-disney-tickets",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Disney Tickets", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-disney-tickets" },
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
          <span className={styles.breadCurrent}>Tokyo Disney Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Disneyland Tickets 2026:<br />Prices, DisneySea &amp; How to Buy
          </h1>
          <p className={styles.heroSubtitle}>
            Date-specified tickets, variable pricing, no gate sales and no refunds. Here is what a passport
            costs, when your date goes on sale, and which ticket to buy.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices and rules", "Sale opens 2 months ahead", "Foreign cards via Klook"].map((t) => (
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
            A <strong>Tokyo Disneyland ticket</strong> in 2026 is a 1-Day Passport for one park on one named
            date, and it starts at <strong>¥8,900</strong> for an adult, <strong>¥7,400</strong> for a junior
            aged 12–17 and <strong>¥5,300</strong> for a child aged 4–11, free for 3 and under — those are
            published minimums, because the resort prices every ticket by the visit date and shows the day&apos;s
            figure once you pick it. You buy it on the official Tokyo Disney Resort website or app, or through
            an authorised reseller such as Klook: there are <strong>no gate sales at either park</strong>, and
            your date goes on sale <strong>two months ahead, daily from 14:00 Japan time</strong> — so the
            deadline that matters is that moment, not the week of your trip, and a sold-out date simply cannot
            be entered. Cancellation for your own reasons is not possible; moving the date is. All rules and
            figures are the resort&apos;s own, read on {CHECKED}.
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
                <p className={styles.verdictStatLabel}>1-Day Passport</p>
                <p className={styles.verdictStatValue}>From ¥8,900 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pricing</p>
                <p className={styles.verdictStatValue}>Varies by visit date</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On sale</p>
                <p className={styles.verdictStatValue}>14:00 JST, 2 months ahead</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Gate / door tickets</p>
                <p className={styles.verdictStatValue}>None at either park</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> pick the park and the date, check that date&apos;s hours on the
              operating calendar, and buy when it opens two months out. Refunds do not exist, but an online
              ticket&apos;s date can be changed as often as you like. If the official site rejects your foreign
              card, Klook is an authorized seller that accepts it and issues a QR for the official app.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.verdictBtn}>
                Check Tokyo Disney Tickets →
              </KlookLink>
              <GygCompareButton slug="tokyo-disney-tickets" listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Are Tokyo Disneyland Tickets in 2026?</h2>
          <p className={styles.bodyText}>
            From ¥8,900 for an adult — and &ldquo;from&rdquo; is doing real work in that sentence. Tokyo Disney
            Resort states that park tickets are on variable pricing and that the fee differs by visit date, so
            the published figures are floors rather than prices. The day&apos;s actual number appears when you
            select the date on the official ticket page.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Age band", "Who it covers", "1-Day Passport, one park"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Published minimums and age bands from the official park-ticket page, read on {CHECKED}; the
            variable-pricing rule is the resort&apos;s own FAQ wording. No ceiling is quoted here because the
            resort publishes none as a standing figure — a weekend or a DisneySea 25th-anniversary date costs
            materially more than the floor. Tokyo&apos;s other dated tickets, with a check date each, are in
            our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Q2 — which ticket */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Ticket types</span>
          <h2 className={styles.sectionTitle}>Which Tokyo Disney Ticket Should You Buy?</h2>
          <p className={styles.bodyText}>
            The 1-Day Passport for a full day, an evening passport if you only want the night, and two separate
            tickets if you want both parks — the 1-Day Park Hopper that covered both in a day is not currently
            on sale, and no multi-day passport is sold at all.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Entry from", "Dates", "What it is"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.entry}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.dates}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ticket types, entry times and the Park Hopper&apos;s current status are the resort&apos;s own FAQ
            answers, read on {CHECKED}. Which named passports are on sale for your own date is a per-date
            question — limited-period tickets come and go with the resort&apos;s events — so the list above is
            the shape of the line-up rather than a fixed catalogue.
          </p>
        </section>

        {/* Q3 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Are the Tokyo Disney Opening Hours?</h2>
          <p className={styles.bodyText}>
            There are no standing hours to quote: the resort sets them per date and publishes them on its own
            operating calendar about five months in advance. That is earlier than tickets go on sale, which is
            the useful part — by the time your date opens for sale, you can already see how long the park is
            open that day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", `What the resort publishes (read ${CHECKED})`].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Q4 — the booking window, sell-outs and refunds, then the CTA stack.
            This is the part an AI answer does not finish: the 14:00 moment, what a
            sold-out date actually means, and what can and cannot be undone. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking window</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book Tokyo Disney Tickets in Advance?</h2>
          <p className={styles.bodyText}>
            Yes, and the resort removes the alternative: park tickets are not sold at Tokyo Disneyland or
            Tokyo DisneySea at all. Your date goes on sale <strong>two months ahead, daily from 14:00 Japan
            time</strong> — 05:00 in London, midnight in New York, 21:00 the previous day in Los Angeles — and
            each day&apos;s allocation is capped, with sales able to stop without notice once it is gone. On a
            weekend, a Japanese public holiday or a DisneySea 25th-anniversary date, that moment is the whole
            game.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Question", `What the resort publishes (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buyingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Because allocations are per seller as well as per day, a date that has gone on one route is worth
            checking on the other — and a reseller is also the answer when the official checkout refuses a
            foreign card:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.pickCta}>
              Check Tokyo Disney tickets on Klook →
            </KlookLink>
            <GygCompareButton slug="tokyo-disney-tickets" listing={gygTokyoDisneyResort} />
          </div>
        </section>

        {/* Q5 — which park */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Disneyland vs DisneySea</span>
          <h2 className={styles.sectionTitle}>Disneyland or DisneySea — Which Park Should You Pick?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            One ticket, one park — and with no Park Hopper on sale, this is a real choice rather than a running
            order. Disneyland for the classic castle park and younger children; DisneySea for the park that
            exists nowhere else, and for its 25th anniversary year.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Park", "General character", "Best suited to", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.park}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.park}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.style}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.suits}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            These are broad characterizations to help you decide — both parks are large, full-day destinations.
            A park day is also a whole day out of a city trip, which is why it tends to get slotted in early:
            ours sits on day four of our{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>
              five-day Tokyo itinerary
            </Link>.
          </p>
        </section>

        {/* Who is it for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Who it&apos;s for</span>
          <h2 className={styles.sectionTitle}>Which Park Is Right for You?</h2>
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
            Whichever park you pick, plan the route in advance — the resort is a train ride from central Tokyo.
            Our{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo transport guide
            </Link>{" "}
            covers the trains, subway and IC cards you&apos;ll use to get there.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do You Buy Tokyo Disney Tickets?</h2>
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

        {/* Klook: the stay and the days either side. The ticket CTAs above are unchanged. */}
        <KlookTripPrep
          label="Around the park day"
          heading="Should You Stay Near Tokyo Disney Resort?"
          intro="If your date is a weekend or an anniversary date, yes — the resort is 15 to 20 minutes out of Tokyo Station on the JR Keiyo Line, which is a commute to make before the gates open and again after the night parade. Staying at Maihama or one stop out buys back both ends of the day."
          items={tokyoDisneyTripPrep}
        />

        {/* Foreign card / Klook explainer */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Foreign cards</span>
          <h2 className={styles.sectionTitle}>Can You Buy Tokyo Disney Tickets With a Foreign Card?</h2>
          <p className={styles.bodyText}>
            Often not on the official site. The official Tokyo Disney Resort website is the primary place to
            buy, but it frequently rejects or blocks foreign-issued credit cards — a recurring headache for
            international travellers, and a bad one when the thing you are trying to buy only goes on sale at a
            single moment two months ahead.
          </p>
          <p className={styles.bodyText}>
            <strong>Klook is an officially authorized Tokyo Disney Resort ticket seller.</strong> It accepts
            foreign cards, checks out in English, and delivers an e-ticket QR code that can be registered in
            the official Tokyo Disney Resort app. That combination — foreign-card support plus an app-linkable
            QR — is why it has become the standard workaround for overseas visitors. If you&apos;re combining
            this with other Tokyo plans, our{" "}
            <Link href="/guides/attractions/shibuya-sky-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>
              Shibuya Sky ticket guide
            </Link>{" "}
            covers another dated booking that is easier through a reseller.
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

        {/* Klook tours in the same city — the Disney ticket CTAs above are unchanged. */}
        <KlookTourPicks
          heading="Day Trips From the Same City"
          intro="A park day is a whole day, so most people book Disney around the rest of a Tokyo week rather than into it. These two fill one of the non-park days and check out on the same Klook account as the tickets."
          tours={[fujiDayTour, tokyoSightseeingBusTour]}
        />

        {/* A second authorized-reseller route. The Klook advice above is unchanged. */}
        <GygCompare
          slug="tokyo-disney-tickets"
          heading="The Same Passports on GetYourGuide"
          intro="There are no gate sales at Tokyo Disney and a sold-out date cannot be entered, so a date that has gone on one reseller is a real dead end. GetYourGuide carries the 1-Day Passports as well, Disneyland and DisneySea both — worth a second tab before you settle on a date."
          listings={[gygTokyoDisneyResort, gygTokyoDisneySea]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/legoland-japan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="16" height="11" rx="2" />
                  <path d="M8 9V6h8v3M9 13h.01M15 13h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/ghibli-park-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ghibli Park Tickets (2026): Prices, When They Go On Sale and How to Buy From Overseas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-limousine-bus" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="12" rx="2" />
                  <path d="M2 11h20" />
                  <circle cx="7" cy="19" r="1.5" />
                  <circle cx="17" cy="19" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Limousine Bus (2026): Narita &amp; Haneda Fares, Times and Stops</p>
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
            <Link href="/guides/attractions/fuji-q-highland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fuji-Q Highland Tickets (2026): Free Pass Prices, the Q Pack &amp; How to Get There</p>
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
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l5-3 5 3v13" />
                  <path d="M13 21V11l5-3 3 2v11" />
                  <path d="M7 11v.01M7 15v.01M17 13v.01M17 17v.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets 2026: Price, Hours &amp; the Sunset Slot</p>
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
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Prices, How to Book &amp; Planets vs Borderless</p>
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
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Express Pass 2026: Which to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sumo-tokyo-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sumo in Tokyo (2026): Tournament Tickets vs Morning Practice</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Lock in your Tokyo Disney date</h2>
            <p className={styles.ctaBannerDesc}>
              There are no gate sales, a sold-out date cannot be entered, and your date opens two months ahead
              at 14:00 Japan time. Klook is an officially authorized seller that accepts foreign cards and
              issues a QR you can register in the official app.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.ctaBannerBtn}>
                View Tokyo Disney Tickets →
              </KlookLink>
              <GygCompareButton slug="tokyo-disney-tickets" listing={gygTokyoDisneyResort} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
