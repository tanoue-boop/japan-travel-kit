import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { fujiDayTour, tokyoDisneyTripPrep, tokyoSightseeingBusTour } from "../../../lib/klook-links";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import { gygTokyoDisneyResort, gygTokyoDisneySea } from "../../../lib/gyg-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

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

/*
 * 11 Nov 2026 (R08): rank work for "tokyo disneyland tickets" (19.9th, 653 impressions / 28 days).
 * Added a where-to-buy table, ticket validity, Disney Premier Access and Happy Entry. All read on
 * 11 Nov 2026 from the resort's English FAQ (faq-en.tokyodisneyresort.jp) and its Disney Hotels page:
 *   - validity: official online purchase = same date one year after purchase; travel agencies,
 *     convenience stores and overseas online travel agencies = same date one month after admission
 *     (answer/680ba03d01fdf7431bafb1d5)
 *   - sold-out tickets may go back on sale; a changed slot is resold online (answer/680ba04d01fdf7431bafb5d8)
 *   - app services: Premier Access is paid, bought after entering; Standby Pass and Entry Request are
 *     free; the 40th Anniversary Priority Pass ended on 31 Aug 2026 (answer/680ba05101fdf7431bafb6b0)
 *   - Premier Access is bought in the app after entering, limited in number, may sell out
 *     (answer/680ba05101fdf7431bafb6b8)
 *   - Happy Entry: Disney Hotel guests, Tokyo Disneyland 15 min early, DisneySea (Fantasy Springs
 *     Hotel, MiraCosta) 5–15 min early, not on check-in day (/en/hotel/topics/info/happy_entry.html)
 * No Premier Access yen figure is printed: the resort's own page could not be read on 11 Nov 2026.
 */
const LAST_CHECKED_PRICES = "2026-10-28";
const LAST_CHECKED_RULES = "2026-11-11";

/** Where to buy — first row is the recommendation. Validity from the resort's FAQ. */
const sellerRows = [
  {
    where: "Our pick: official website or app (tokyodisneyresort.jp)",
    best: "Anyone whose card the official checkout accepts",
    validity: "Same date one year after purchase",
    note: "Date and age changes online, no fee, as often as you like within validity — each change settles at the new date's price.",
  },
  {
    where: "Authorized overseas online travel agency (e.g. Klook)",
    best: "Visitors whose foreign card the official site rejects",
    validity: "Same date one month after the admission date",
    note: "English checkout and foreign cards. Worth a second check when a date shows sold out on the official site. Note the shorter validity.",
  },
  {
    where: "Travel agencies and convenience stores in Japan",
    best: "Residents and visitors already in Japan",
    validity: "Same date one month after the admission date",
    note: "Sold as reservation vouchers. If you miss your date, contact the issuing office before the voucher expires.",
  },
  {
    where: "At the park gates",
    best: "Nobody — not sold",
    validity: "—",
    note: "Park tickets are not sold at Tokyo Disneyland or Tokyo DisneySea. Only Disney Hotel guests can buy a same-day ticket at their hotel.",
  },
];

/** In-park app services — first row is the recommendation. */
const accessRows = [
  {
    service: "Our take: Standby Pass and Entry Request (free)",
    cost: "Free",
    what: "Standby Pass gives a return time for venues that require one; Entry Request lets you try once a day per venue for selected parades, shows and character greetings. Use both before paying for anything.",
  },
  {
    service: "Disney Premier Access",
    cost: "Paid, per access, on top of the park ticket",
    what: "Books a time slot for an eligible attraction (shorter wait) or a viewing area for an eligible parade or show. Bought in the official app after you enter the park, limited in number and can sell out.",
  },
  {
    service: "Regular standby line",
    cost: "Included in the ticket",
    what: "Every attraction can still be ridden by queuing.",
  },
  {
    service: "40th Anniversary Priority Pass",
    cost: "—",
    what: "The free pass ended on 31 August 2026.",
  },
];

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
  {
    what: "Early entry (Happy Entry)",
    detail:
      "Disney Hotel guests only. Tokyo Disneyland entry starts 15 minutes before other guests; at Tokyo DisneySea, for Fantasy Springs Hotel and MiraCosta guests, 5 to 15 minutes before. Usable on every day of the stay including checkout day, not on check-in day, and it needs a park ticket plus a Special Entrance Pass per person.",
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
    q: "Where should you buy Tokyo Disneyland tickets?",
    a: "On the official Tokyo Disney Resort website or app if it accepts your card: a ticket bought there is valid until the same date one year after purchase and its date can be changed online without a fee. If the official checkout rejects a foreign card, an authorized overseas online travel agency such as Klook sells the same dated 1-Day Passports, but the resort's FAQ gives those tickets a shorter validity — the same date one month after the admission date. Neither park sells tickets at the gate. Last checked: 2026-11-11.",
  },
  {
    q: "How long are Tokyo Disneyland tickets valid for?",
    a: "A park ticket bought on the official website or app is valid until the same date one year after the date of purchase — not one year after the admission date. A ticket bought through a travel agency, a convenience store or an overseas online travel agency is valid until the same date one month after the admission date. Within validity you can move the date; after it expires the ticket is invalid. Last checked: 2026-11-11.",
  },
  {
    q: "What is Disney Premier Access, and do you need it?",
    a: "Disney Premier Access is a paid add-on, separate from the park ticket, that books a time slot for an eligible attraction or a viewing area for an eligible show. You buy it in the official Tokyo Disney Resort app after entering the park; it is limited in number and can sell out. You do not need it: every attraction can still be ridden by queuing, and the free Standby Pass and Entry Request remain. The free 40th Anniversary Priority Pass ended on 31 August 2026. Last checked: 2026-11-11.",
  },
  {
    q: "When do Tokyo Disney tickets go on sale?",
    a: `Tickets for the same date two months ahead go on sale every day from 14:00 Japan time — a 1 March visit opens at 14:00 on 1 January — and where the month has no matching date, sale starts at 14:00 on the 1st of the following month. Up to ten tickets can be bought per order, and sales for a date can be suspended without notice once that day's number is reached. Read on ${CHECKED}.`,
  },
  {
    q: "Are the dates on Tokyo Disneyland tickets flexible?",
    a: `The date is fixed when you buy, but it can be moved; there is no refund. Cancellation and refund for your own reasons are not available — the FAQ covering bad weather, an earthquake or any other reason for not going on the designated date points at the same rule. An online ticket can be changed within its validity period, before or after the designated date, with no limit on the number of changes, each settling at the new date's price, through the official website or app rather than at the parks. Read on ${CHECKED}.`,
  },
  {
    q: "My date is sold out — can I still get in?",
    a: "Not with a gate ticket — a sold-out date cannot be entered. But the resort's FAQ says sold-out park tickets may go back on sale without notice, and that when a guest changes their ticket to another date, the slot they leave becomes available for purchase again online, on the official website and in the app. Checking back is worth doing, and so is checking an authorized reseller. Last checked: 2026-11-11.",
  },
  {
    q: "Which should you choose, Tokyo Disneyland or Tokyo DisneySea?",
    a: "A 1-Day Passport covers one park, so you pick. Tokyo Disneyland is the classic castle park — parades and family-friendly attractions that suit first-timers and families with younger children. Tokyo DisneySea is nautical-themed, more unique to Tokyo, leans more adult, serves alcohol, and is marking its 25th anniversary from April 2026 to March 2027. First visit with kids, Disneyland; something distinctive, DisneySea.",
  },
];

const TITLE = "Tokyo Disneyland Tickets 2026: Prices, Where to Buy & Rules";
const DESCRIPTION =
  "Tokyo Disneyland tickets 2026: 1-Day Passport from ¥8,900, priced by date, no gate sales, on sale 2 months ahead at 14:00 JST. Where to buy, then book.";

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
            Tokyo Disneyland Tickets 2026:<br />Prices, Where to Buy &amp; Rules
          </h1>
          <p className={styles.heroSubtitle}>
            Date-specified tickets, variable pricing, no gate sales and no refunds. Here is what a passport
            costs, where to buy it, when your date goes on sale, and which park to pick.
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
            <strong>Tokyo Disneyland tickets</strong> in 2026 cost from <strong>¥8,900</strong> for an adult
            1-Day Passport, from <strong>¥7,400</strong> for ages 12–17 and from <strong>¥5,300</strong> for
            ages 4–11 (free for 3 and under), and the actual price depends on the visit date.
            Tickets are not sold at either park&apos;s gate, so you buy on the official Tokyo Disney Resort
            website or app — or an authorized seller such as Klook if the official site rejects your card —
            from <strong>two months ahead, daily at 14:00 Japan time</strong>.
            One ticket covers one park on one date: Tokyo Disneyland suits a first visit and younger
            children, Tokyo DisneySea suits adults and its 25th anniversary year (April 2026 – March 2027).
          </p>
          <p className={styles.bodyText}>
            A sold-out date cannot be entered, refunds are not available, and the date can be moved as often
            as you like within validity. Prices and age bands read on the resort&apos;s ticket page on{" "}
            {CHECKED}; validity and in-park rules read on its FAQ on 11 November 2026. Planning more of
            Tokyo? Compare the city&apos;s other dated tickets in our{" "}
            <Link href="/guides/attractions/teamlab-tokyo-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>
              teamLab Tokyo tickets comparison
            </Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--text)", fontWeight: 600 }}>
              things to do in Tokyo
            </Link>{" "}
            guide.
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

        <BookingEsimCard />

        <EsimCtaTop />

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
            <strong>Last checked: {LAST_CHECKED_PRICES}</strong> · Source: https://www.tokyodisneyresort.jp/en/ticket/index.html
            (prices) and https://faq-en.tokyodisneyresort.jp/ (rules).{" "}
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
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {LAST_CHECKED_RULES}</strong> · Source: https://faq-en.tokyodisneyresort.jp/
            (operating hours) and https://www.tokyodisneyresort.jp/en/hotel/topics/info/happy_entry.html (Happy
            Entry). Happy Entry does not guarantee 15 minutes in the park: the resort notes entry at the
            hotel&apos;s special entrance can take time on busy days.
          </p>
        </section>

        {/* Where to buy — added 11 Nov 2026 (R08). First row is the recommendation. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where Should You Buy Tokyo Disneyland Tickets?</h2>
          <p className={styles.bodyText}>
            On the official Tokyo Disney Resort website or app if it accepts your card — tickets bought there
            stay valid for a year from purchase. If it rejects a foreign card, an authorized overseas seller
            such as Klook sells the same dated passports, valid until one month after the admission date.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where to buy", "Best for", "Ticket valid until", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sellerRows.map((row) => (
                    <tr key={row.where}>
                      <td className={styles.tdProvider}>{row.where}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.best}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.validity}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {LAST_CHECKED_RULES}</strong> · Source:
            https://faq-en.tokyodisneyresort.jp/answer/680ba03d01fdf7431bafb1d5/ (validity) and the resort&apos;s
            FAQ on park tickets (no gate sales, same-day purchase, Disney Hotel exception).
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={DISNEY_TICKET_URL} target="_blank" rel="noopener noreferrer nofollow" className={styles.pickCta}>
              Official site rejected your card? Check Klook →
            </KlookLink>
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

        {/* Premier Access — added 11 Nov 2026 (R08). First row is the recommendation. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Skipping the line</span>
          <h2 className={styles.sectionTitle}>Do You Need Disney Premier Access?</h2>
          <p className={styles.bodyText}>
            No. Disney Premier Access is a paid add-on bought in the official app after you enter the park, and
            every attraction can still be ridden by queuing. The free 40th Anniversary Priority Pass ended on 31
            August 2026; the free Standby Pass and Entry Request remain.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Service", "Cost", "What it does"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {LAST_CHECKED_RULES}</strong> · Source:
            https://faq-en.tokyodisneyresort.jp/answer/680ba05101fdf7431bafb6b0/ and
            https://faq-en.tokyodisneyresort.jp/answer/680ba05101fdf7431bafb6b8/. Premier Access prices are set
            per attraction or show and shown in the app, so no figure is printed here that the resort&apos;s
            own page does not show.
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
        <p className={styles.bodyText}>
          Flying straight in? The Airport Limousine Bus runs direct from Narita (¥2,900 adult) and
          Haneda (¥1,300) to the Disney resort hotels and parks, with your cases in the hold — fares
          read off limousinebus.co.jp on 9 Nov 2026; routes and timetables are in the{" "}
          <Link href="/guides/transport/tokyo-airport-limousine-bus">Airport Limousine Bus guide</Link>.
        </p>
        {/* Added 12 Nov 2026: the hotel half of the park day. */}
        <p className={styles.bodyText}>
          Choosing the hotel itself? Our{" "}
          <Link href="/guides/attractions/tokyo-disney-hotels">Tokyo Disney hotels guide</Link> compares the
          Disney Hotels, Official Hotels and Partner Hotels on how you reach the gates, which ones get Happy
          Entry, and when rooms open — four months ahead for Disney Hotels, before your ticket date opens.
        </p>

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

        <EsimCtaBottom />

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
            {/* Added 3 Nov 2026: the family version of the Tokyo route — Disney, LEGOLAND Discovery, Sanrio, child fares. */}
            <Link href="/guides/attractions/tokyo-itinerary-with-kids" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Itinerary with Kids: 5 Days, Day by Day (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
                <p className={styles.relatedTitle}>Airport Limousine Bus Tokyo (2026): Narita &amp; Haneda Fares, Times and Stops</p>
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
            <Link href="/guides/attractions/teamlab-planets-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Price, Hours and How to Book</p>
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
