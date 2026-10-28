import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { siteCheapestFrom } from "../../../lib/esim-prices";
import { cashVsCardTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { wiseLink, WISE_REL, WISE_CARD_URL, WISE_VERIFIED } from "../../../lib/wise-links";

/** One tracked Wise link, placed after the "which card" answer. */
const WISE_CARD_CTA = wiseLink("cash-vs-card-japan", WISE_CARD_URL);

/**
 * Every brand list, fee and percentage on this page was read off the operator's
 * or the ministry's own page on this date. Nothing here is an estimate, and the
 * cells that say "not published" say it because nobody publishes it — not
 * because a comparison site had a number we chose not to borrow.
 */
const CHECKED = "27 October 2026";

/** The rail rows come from operator pages read on this earlier date. */
const RAIL_CHECKED = "23 October 2026";

/** ATM figures carried over from our ATM guide, read on each operator's own pages. */
const ATM_CHECKED = "26 October 2026";

/**
 * METI's own figures, published 31 March 2026. The ministry revised its method
 * for the 2025 calculation — the headline ratio now divides by household final
 * consumption less imputed rent on owner-occupied housing (the "domestic
 * indicator"), with a separate indicator kept for international comparison —
 * which is why the 2024 number is restated at 52.5% rather than the 42.8% that
 * was published for 2024 under the old denominator.
 */
const METI = {
  year: "2025",
  ratio: "58.0%",
  amount: "¥162.7 trillion",
  previousYear: "52.5%",
  creditShare: "82.7%",
  creditAmount: "¥134.6 trillion",
  codeShare: "10.2%",
  published: "31 March 2026",
} as const;

/**
 * Requirement (c): place by place, what each operator says it takes. The last
 * column is the point of the table — it is the operator's own statement, so the
 * reader can see the difference between "we checked" and "nobody publishes it".
 */
const placeRows = [
  {
    place: "Convenience stores",
    sub: "7-Eleven, FamilyMart, Lawson",
    cash: "Yes",
    card: "Yes",
    ic: "Yes",
    published:
      "7-Eleven lists credit cards, brand debit and brand prepaid cards, transit IC money, nanaco, iD, QUICPay and Rakuten Edy, plus barcode apps including PayPay, Alipay+ and WeChat Pay.",
  },
  {
    place: "Trains — Tokyo Metro, Toei and eight other Kanto operators",
    sub: "Also Osaka Metro, Nankai, Fukuoka City Subway",
    cash: "Yes, at ticket machines",
    card: "Yes at the gate; passes only at the machine",
    ic: "Yes",
    published:
      "Tokyo Metro runs Tap to Ride on all its lines for Visa, Mastercard, JCB, American Express, Diners Club, Discover and UnionPay, adult fares only. Its multi-function machines take a card for a pass — not for an ordinary ticket or an IC top-up, which take coins and notes.",
  },
  {
    place: "Trains — JR East",
    sub: "Yamanote, Chuo, Keihin-Tohoku, Narita Express",
    cash: "Yes",
    card: "No, not at the gate",
    ic: "Yes",
    published:
      `JR East is not among the eleven Kanto operators in the Tap to Ride scheme, so a contactless card will not open a Yamanote Line gate. Checked ${RAIL_CHECKED}.`,
  },
  {
    place: "Taxis",
    sub: "km Taxi, Tokyo",
    cash: "Yes",
    card: "Yes",
    ic: "Yes",
    published:
      "km Taxi lists VISA, Mastercard, American Express, JCB, Diners Club and Saison; Suica, PASMO, KITACA, manaca, TOICA, ICOCA, Hayakaken, nimoca, SUGOCA and iD; and ten code-payment apps including PayPay, UnionPay, WeChat Pay and Alipay.",
  },
  {
    place: "Temples & shrines",
    sub: "Admission and offerings",
    cash: "Yes",
    card: "Not published",
    ic: "Not published",
    published:
      "Kiyomizu-dera's own FAQ sets out who pays the admission and who is exempt and says nothing at all about how it is paid. No major temple publishes card acceptance at the gate, so this is the one row where the answer is cash by default rather than by statement.",
  },
  {
    place: "Market stalls & street food",
    sub: "Tsukiji Outer Market as the test case",
    cash: "Yes",
    card: "Shop by shop",
    ic: "Shop by shop",
    published:
      "Tsukiji Outer Market's official directory prints the methods for each shop, and they differ: one knife shop lists cash, credit card, phone payment and transit IC; one food shop lists cash and credit card with a ¥5,000 minimum on the card.",
  },
  {
    place: "Hotels",
    sub: "Toyoko Inn as the test case",
    cash: "Yes",
    card: "Yes",
    ic: "Not listed",
    published:
      "Toyoko Inn states payment at check-in or check-out by cash, credit card, smartphone QR code payment, member points, or its own vouchers and gift cards — and takes ¥200 off when the card is charged online in advance instead.",
  },
  {
    place: "Vending machines",
    sub: "Coca-Cola multi-money machines",
    cash: "Yes",
    card: "Contactless, on the newer machines",
    ic: "Yes",
    published:
      "Coca-Cola's multi-money machines list Kitaca, Suica, PASMO, TOICA, manaca, ICOCA, PiTaPa, SUGOCA, nimoca and Hayakaken, plus iD, Rakuten Edy, nanaco, WAON and QUICPay, and contactless Visa, Mastercard, JCB and American Express — while stating that what is accepted differs machine by machine.",
  },
];

const atmGuide = [
  {
    rank: 1,
    name: "Seven Bank (ATMs in 7-Eleven)",
    desc:
      "The first machine to try. Seven Bank counts over 28,000 ATMs — inside 7-Eleven stores, and at airports and shopping centres — and takes the longest list of overseas brands of any Japanese network: Visa, PLUS, Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, DISCOVER and Diners Club. Visa and Mastercard run 00:00–24:00, and the cap is ¥100,000 per withdrawal, or ¥30,000 if the machine reads the magnetic stripe rather than the chip.",
  },
  {
    rank: 2,
    name: "Japan Post Bank (郵便局 / ゆうちょ)",
    desc:
      "Post offices nationwide, including places with no convenience store. It accepts “VISA, PLUS, Mastercard, Maestro, Cirrus, JCB, China Unionpay and DISCOVER”, and it is the only network of the five that publishes a fee: “when using certain cards issued abroad, an ATM usage fee (¥220 (tax included) per use) may apply”. Two catches — a single withdrawal is capped at ¥50,000, and the post-office machines shut overnight (Mon–Sat 7:00–23:00).",
  },
  {
    rank: 3,
    name: "E-net (ATMs in FamilyMart, Don Quijote)",
    desc:
      "The machine in a FamilyMart is an E-net machine. It takes Visa, Mastercard, UnionPay and JCB issued overseas, states a flat 24 hours a day and 365 days a year, and allows ¥100,000 per withdrawal by IC chip (¥40,000 by magnetic stripe). It publishes no fee amount: the charge is set by the handling bank, and your issuer may add its own.",
  },
];

const cashPros = [
  "Works everywhere, with no brand list to check first",
  "The only thing a temple gate, a festival stall or a rural bus is certain to take",
  "No exchange-rate margin applied at the moment of payment",
  "Tipping isn't a thing in Japan, so exact change is all that's ever needed",
];

const cashCons = [
  "A fee on every withdrawal: the machine's, plus whatever your own bank charges",
  "Only Japan Post Bank publishes its machine fee (¥220 incl. tax per use), so the amount usually appears for the first time on screen",
  "Single-withdrawal caps mean planning: ¥100,000 at Seven Bank, ¥50,000 at Japan Post Bank",
  "No chargeback if it is lost or stolen",
];

const cardPros = [
  "Accepted at every chain, department store and hotel we could find a published list for",
  "Opens ticket gates on Tokyo Metro, Toei and eight other Kanto operators, and on Osaka Metro",
  "Settles the large, plannable costs — flights, hotels, passes, tours — before you leave home",
  "A multi-currency card gives you the mid-market rate instead of a desk rate",
];

const cardCons = [
  "Temples, shrines, market stalls and most local buses do not publish card acceptance at all",
  "Some cards add a foreign-transaction fee to every purchase for the whole trip",
  "Japanese ticket machines take cards for passes but not for ordinary tickets or IC top-ups",
  "Chip-and-PIN may be required, and some terminals reject cards carrying an accepted mark",
];

const contactlessRows = [
  {
    method: "IC card (Suica / Pasmo / ICOCA)",
    trains: "Everywhere",
    convenience: "Yes",
    vending: "Yes",
    taxis: "Yes",
    temples: "No",
  },
  {
    method: "Contactless Visa / Mastercard",
    trains: "Most private & subway, not JR East",
    convenience: "Yes",
    vending: "Newer machines",
    taxis: "Yes",
    temples: "No",
  },
  {
    method: "QR pay (PayPay etc.)",
    trains: "No",
    convenience: "Yes",
    vending: "Some",
    taxis: "Yes",
    temples: "No",
  },
  {
    method: "Cash",
    trains: "Ticket machines only",
    convenience: "Yes",
    vending: "Yes",
    taxis: "Yes",
    temples: "Yes",
  },
];

const noTipPlaces = [
  { place: "Restaurants", why: "Service charge is built into all menu prices" },
  { place: "Taxis", why: "Not customary — the meter and any published surcharge are the full fare" },
  { place: "Hotels", why: "Not expected; staff are paid a professional wage" },
  { place: "Convenience stores", why: "Transaction is impersonal; a tip would cause confusion" },
  { place: "Barbers & salons", why: "Not customary; the price listed is the full price" },
];

const faqItems = [
  {
    q: "Is Japan more cash or card in 2026?",
    a: `More card, on the only official measure of it — but not by enough to leave the cash at home. Japan's Ministry of Economy, Trade and Industry calculated the country's cashless payment ratio for ${METI.year} at ${METI.ratio} of consumer spending, or ${METI.amount}, published ${METI.published}; credit cards were ${METI.creditShare} of that total (${METI.creditAmount}) and code payments ${METI.codeShare}. The ministry revised its method for this calculation, so the comparable figure for the previous year is ${METI.previousYear} rather than the 42.8% published for 2024 under the old denominator. What the ratio does not tell you is which of your own payments fall in the remaining share: temple admissions, market stalls, small independent restaurants and most local buses, which is where the yen in your pocket goes.`,
  },
  {
    q: "Should I travel to Japan with cash or a credit card?",
    a: `Both, with a job for each. The card is for everything with a published brand list — hotels, chains, department stores, taxis, convenience stores, airport trains and the ticket gates of Tokyo Metro, Toei and eight other Kanto operators — and for the big costs you can settle before you fly. The cash is for the places that publish nothing: Kiyomizu-dera's FAQ covers who pays its admission and says nothing about how, Tsukiji Outer Market's own shop directory shows shops that take cash only or set a ¥5,000 minimum on a card, and buses outside the city tap schemes still want coins or an IC card. Travelling to Japan with cash or a credit card alone both work badly for the same reason: each leaves out a part of the day. Operator pages checked ${CHECKED}.`,
  },
  {
    q: "Can I pay temple and shrine admission by card in Japan?",
    a: `Assume not. We could not find a major temple that publishes card acceptance for admission: Kiyomizu-dera's own FAQ sets out who pays the fee and who is exempt — teachers on school trips, holders of a disability certificate and their companions — and says nothing about payment method, and no equivalent published statement exists for the big Kyoto or Tokyo sites. Offertory boxes are cash by definition. A few hundred yen in coins and one ¥1,000 note per temple is the practical amount, which is why the cash figure on this page is per day rather than per trip. Checked ${CHECKED}.`,
  },
  {
    q: "Do I need cash in Japan?",
    a: `Yes, for four things that recur daily: temple and shrine admissions and offerings, market stalls and street food, small independent restaurants and izakaya, and local buses and coin lockers outside the city tap schemes. Everything else now has a published list of accepted brands — 7-Eleven, km Taxi in Tokyo, Toyoko Inn, Coca-Cola's vending machines and Tokyo Metro's ticket gates all print theirs. Carrying ¥10,000–¥20,000 and topping up at a convenience-store ATM covers the first group without turning you into a courier for the second.`,
  },
  {
    q: "How much cash should I bring to Japan?",
    a: `Less than most lists suggest, because withdrawing is easy and cheap relative to the exchange desk. Seven Bank allows ¥100,000 in a single withdrawal and Japan Post Bank ¥50,000, and the machine's fee is charged per withdrawal rather than per yen — so one large withdrawal on arrival beats five small ones, and neither needs to happen before you fly. Arriving with a usable amount in yen is still worth it for the first bus or locker; past that, the ATM inside any 7-Eleven is the cheaper source. ATM figures checked ${ATM_CHECKED}.`,
  },
  {
    q: "Which ATMs accept foreign cards in Japan?",
    a: `Five networks, all of them outside the big commercial banks: Seven Bank in 7-Eleven stores, Japan Post Bank at post offices, E-net in FamilyMart and Don Quijote, part of the Lawson Bank estate, and AEON Bank in its malls. Branch ATMs at Mizuho, MUFG and SMBC are not the ones to try. Seven Bank takes the longest brand list — Visa, PLUS, Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, DISCOVER and Diners Club — and allows the most per withdrawal at ¥100,000. Brands and limits read off each operator's own pages on ${ATM_CHECKED}.`,
  },
  {
    q: "Does Japan prefer Visa or Mastercard?",
    a: `Neither, in any way that affects you: every published list we checked includes both. Seven Bank's ATM brand list names Visa, PLUS, Mastercard, Maestro and Cirrus together; km Taxi names VISA and Mastercard together; Tokyo Metro's Tap to Ride names Visa and Mastercard together. Where the lists get shorter it is American Express, Diners Club and Discover that drop off first, and Seven Bank adds the caveat that a card carrying an accepted mark may still be declined. JCB is Japan's own network and is accepted everywhere, but few travellers hold one.`,
  },
  {
    q: "Do contactless payments work on Japanese trains?",
    a: `On many operators now, and the answer changed in March 2026. Tokyo Metro states that it runs Tap to Ride on all of its lines, together with Toei Subway and eight other Kanto operators, for Visa, Mastercard, JCB, American Express, Diners Club, Discover and UnionPay — adult fares only, and the card may not be used for more than one passenger. Osaka Metro, Nankai, Fukuoka City Subway and part of JR Kyushu run equivalent schemes. JR East does not: on the Yamanote Line and the Narita Express you still need an IC card, a paper ticket or a pass. Operator pages checked ${RAIL_CHECKED}.`,
  },
  {
    q: "Can I use Apple Pay or Google Pay in Japan?",
    a: `Yes, and the useful version is the IC card rather than the credit card. Add Suica or Pasmo to Apple Wallet or Google Pay and the phone taps the same readers a plastic IC card does — every railway and bus, convenience stores, and the vending machines on Coca-Cola's multi-money list. Tapping with an ordinary credit card set as the default is a different transaction: a contactless card payment, which works at retail terminals and at the gates of the operators above, and not on JR East.`,
  },
  {
    q: "Can tourists use PayPay or LINE Pay in Japan?",
    a: `It's possible, but not straightforward. PayPay requires a Japanese phone number and bank account for full top-up functionality, though limited tourist support launched in 2024. LINE Pay has similar restrictions. For most tourists, a Suica IC card and a contactless Visa or Mastercard will cover everything you need — skip QR pay entirely.`,
  },
  {
    q: "Should I tip in Japan?",
    a: `No. Tipping is not part of Japanese culture and is not expected anywhere — from restaurants and taxis to hotels and salons. Service staff are paid a professional wage and are not dependent on tips. In most situations, the best way to show appreciation is a sincere 'arigatou gozaimasu' and a small bow.`,
  },
  {
    q: "Do you tip at ryokan in Japan?",
    a: `There is a traditional ryokan practice called 'kokorozuke' (心付け) — a small gratuity presented in an envelope to your assigned host (nakai-san) at the start of your stay. This is entirely optional, increasingly rare even among Japanese guests, and is usually ¥1,000–¥3,000 per person if given. It is a formal gesture, not a casual tip. Many ryokan staff will refuse it politely; if in doubt, simply don't.`,
  },
];

const pageTitle = "Cash vs Card in Japan 2026: Where You Still Need Yen";
const pageDescription =
  "Cash vs card in Japan 2026: METI puts cashless at 58.0% of consumer spending, but temples, stalls and local buses still want yen. Place-by-place table.";
const headline = "Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/cash-vs-card-japan") } });

export default function CashVsCardJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/cash-vs-card-japan" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/cash-vs-card-japan" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
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
              route: "/guides/money/cash-vs-card-japan",
              headline,
              updated,
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Cash vs Card</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Cash vs Card in Japan (2026):<br />Where Cards Work and Where You Need Yen
          </h1>
          <p className={styles.heroSubtitle}>
            Cashless now covers most Japanese spending — and almost none of the places a visitor
            runs into cash. Brand lists and fees from each operator&apos;s own pages, checked {CHECKED}.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, `Cashless ${METI.ratio} (METI, ${METI.year})`, `Figures checked ${CHECKED}`].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            This doesn&apos;t affect our recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Rule (1): answer the question in the first paragraph of the body, before the Quick Answer box. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              Carry both: a card covers nearly everything you will plan for in Japan, and a couple of
              ¥10,000 notes cover what it will not.
            </strong>{" "}
            Japan&apos;s Ministry of Economy, Trade and Industry put the country&apos;s cashless payment
            ratio for {METI.year} at {METI.ratio} of consumer spending — {METI.amount}, of which credit
            cards were {METI.creditShare} — published {METI.published}, and at the places visitors
            actually use the operators print the brands they take: 7-Eleven lists credit, brand debit,
            brand prepaid and transit IC money; km Taxi in Tokyo lists six card brands and nine IC cards;
            Toyoko Inn takes a card at the desk; and Tokyo Metro now opens its ticket gates to a
            contactless Visa on all of its lines. The gap is the small, old and outdoor end of the day:
            Kiyomizu-dera&apos;s own FAQ says nothing about paying its admission by card, Tsukiji Outer
            Market&apos;s shop directory lists shops that take cash only or set a ¥5,000 minimum on a card,
            and local buses outside the city tap schemes still want coins or an IC card — so
            ¥10,000–¥20,000 in your pocket, topped up at a convenience-store ATM rather than bought at an
            exchange desk at home, is the amount that gets you through a day of those.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cashless share ({METI.year}, METI)</p>
                <p className={styles.verdictStatValue}>{METI.ratio}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cash to carry per day</p>
                <p className={styles.verdictStatValue}>¥10,000–¥20,000</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best ATM for a foreign card</p>
                <p className={styles.verdictStatValue}>Seven Bank (7-Eleven)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> put the plannable costs on a low-fee card before you fly —
              hotels, airport trains, passes, tours, data — and keep cash for temple gates, market stalls,
              independent restaurants and rural buses. Those four are the only categories on this page
              where no operator publishes a card.
            </p>
          </div>
        </div>

        {/* Q1 — rule (3): the search query verbatim as the heading, answered in the first sentence.
            Rule (2): the by-place table, with the date every cell was checked. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle}>Is Japan more cash or card?</h2>
          <p className={styles.bodyText}>
            More card, on the only official measure: METI&apos;s cashless payment ratio for {METI.year} was{" "}
            {METI.ratio} of consumer spending ({METI.amount}), against {METI.previousYear} the year before
            on the same basis. The Japan cash vs card question is really about the other share — and that
            share is concentrated in a short, predictable list of places, which is what the table sets out.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Where", "Cash", "Card", "IC card", "What the operator publishes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {placeRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ minWidth: "150px" }}>
                        {row.place}
                        <span className={styles.tdBestFor} style={{ display: "block", fontWeight: 400 }}>{row.sub}</span>
                      </td>
                      <td style={{ fontSize: "0.82rem", fontWeight: 600 }}>{row.cash}</td>
                      <td style={{ fontSize: "0.82rem", fontWeight: 600 }}>{row.card}</td>
                      <td style={{ fontSize: "0.82rem", fontWeight: 600 }}>{row.ic}</td>
                      <td style={{ fontSize: "0.82rem", minWidth: "230px" }}>{row.published}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Sources, all read {CHECKED} except where noted: METI&apos;s {METI.year} cashless payment ratio
            release (published {METI.published}); 7-Eleven Japan&apos;s accepted-payment page; Tokyo
            Metro&apos;s Tap to Ride and multi-function ticket machine pages; km Taxi&apos;s payment page;
            Kiyomizu-dera&apos;s FAQ; Tsukiji Outer Market&apos;s shop directory; Toyoko Inn&apos;s
            Specified Commercial Transactions disclosure; and Coca-Cola Japan&apos;s multi-money vending
            machine page. The JR East row and the other rail schemes come from the operators&apos; own
            pages read on {RAIL_CHECKED} for our{" "}
            <Link href="/guides/money/contactless-payment-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              contactless payment guide
            </Link>
            . Two cells say &ldquo;not published&rdquo; because nobody publishes them, not because a figure
            was available elsewhere.
          </p>
        </section>

        {/* Q2 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>Do I need cash in Japan in 2026?</h2>
          <p className={styles.bodyText}>
            Yes — for four things, and only four. Temple and shrine admissions and offerings; market stalls
            and street food; small independent restaurants and izakaya; and local buses, trams and coin
            lockers outside the city tap schemes. Everything else on this page has a published list of
            accepted brands, which is a different kind of answer from &ldquo;probably fine&rdquo;.
          </p>
          <p className={styles.bodyText}>
            That is why &ldquo;cash or credit card in Japan&rdquo; is the wrong framing. Both work, for
            different halves of the day, and the mistake that costs money is not picking the wrong one —
            it is paying a foreign-transaction fee on the card half and an exchange-desk margin on the cash
            half. Where the cash comes from matters more than how much of it you carry:{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              which ATMs take a foreign card
            </Link>{" "}
            and{" "}
            <Link href="/guides/money/currency-exchange-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              where exchanging actually beats withdrawing
            </Link>{" "}
            are the two decisions worth making before you fly.
          </p>
        </section>

        {/* Rule (5): the Klook block sits directly behind the "pay for it before you fly" paragraph —
            the part of the answer an AI summary cannot complete for the reader. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Prepay</span>
          <h2 className={styles.sectionTitle}>How to need less cash: pay the big things before you fly</h2>
          <p className={styles.bodyText}>
            The cash-versus-card question shrinks with every item already paid for. Airport trains, city
            transport passes, day tours and mobile data are all normally settled in yen on arrival — at a
            counter, in a queue, sometimes in cash — and all four can be bought on a card from home in your
            own currency instead. Do that and the yen you carry is only ever for temple gates and food
            stalls, which is a few notes rather than a trip&apos;s budget.
          </p>
        </section>

        <KlookTripPrep
          heading="Costs You Can Put on a Card Before You Leave"
          intro="These three are among the few Japanese travel costs that can be settled in your own currency, on a card, before the cash question arises at all:"
          items={cashVsCardTripPrep}
        />

        {/* Q3 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How much</span>
          <h2 className={styles.sectionTitle}>How much cash should I carry in Japan?</h2>
          <p className={styles.bodyText}>
            ¥10,000–¥20,000 on you, topped up every couple of days — not a trip&apos;s worth brought from
            home. The reason is arithmetic rather than caution: a Japanese ATM fee is charged per
            withdrawal, not per yen, so the cheap pattern is few and large. Seven Bank allows ¥100,000 in a
            single withdrawal and Japan Post Bank ¥50,000, and a 7-Eleven is open when the exchange desk is
            not. ATM figures read off the operators&apos; own pages on {ATM_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Arriving with some yen is still worth it — the first bus, a locker, a vending machine before
            you have found a machine that takes your card. Past that first hour, withdrawing beats
            exchanging for most currencies, and the daily limit that binds is usually your own bank&apos;s
            rather than the machine&apos;s. If you want the amount broken down against what things actually
            cost, our{" "}
            <Link href="/guides/money/japan-travel-budget" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan travel budget guide
            </Link>{" "}
            prices a day out line by line.
          </p>
        </section>

        {/* Q4 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Can I use a credit card everywhere in Japan?</h2>
          <p className={styles.bodyText}>
            No — and the exceptions are specific enough to plan around. Convenience stores, hotels, taxis,
            department stores and chain restaurants publish their brand lists. Temples and shrines publish
            nothing. Market stalls differ shop by shop, and the Tsukiji Outer Market directory shows both
            extremes on the same street — one shop listing cash, card, phone payment and transit IC, another
            listing cash and card with a ¥5,000 minimum on the card.
          </p>
          <p className={styles.bodyText}>
            Two Japan-specific catches are worth knowing even where cards are taken. Ticket machines are
            split: Tokyo Metro&apos;s multi-function machines accept VISA, Mastercard, JCB, American
            Express, Diners Club and Discover for a pass, but an ordinary ticket or an IC top-up takes coins
            and notes. And Seven Bank, the most permissive ATM network in the country, still prints the
            caveat that a card carrying one of its accepted marks may not be accepted — so a second card
            from a different network is the cheapest insurance on the trip.
          </p>
        </section>

        {/* Q5 — rule (5): the Wise CTA sits directly after this answer, and nowhere else on the page. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cards</span>
          <h2 className={styles.sectionTitle}>Which card is best to use in Japan?</h2>
          <p className={styles.bodyText}>
            A multi-currency debit card that gives the mid-market exchange rate and includes a free monthly
            ATM allowance — Wise for most visitors — because in Japan you will use the same card for both
            halves of the problem: paying by card where cards are taken, and withdrawing the cash for where
            they are not. A card with a foreign-transaction fee charges you on the first half and an ATM fee
            on the second, every day of the trip.
          </p>
          <a href={WISE_CARD_CTA} className={styles.verdictBtn} target="_blank" rel={WISE_REL}>
            Get a Wise card before you fly →
          </a>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            The free allowance, the fee above it and the one-off card cost all depend on the country your
            account is registered in, so the figures are kept where they are checked rather than repeated
            here:{" "}
            <Link href="/guides/money/wise-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Wise card in Japan
            </Link>{" "}
            has the current numbers, and{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the best travel card for Japan
            </Link>{" "}
            compares it against the alternatives on fees and ATM limits.
          </p>
        </section>

        {/* Cash reality */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The reality</span>
          <h2 className={styles.sectionTitle}>Why Japan Still Runs on Cash at the Edges</h2>
          <p className={styles.bodyText}>
            The national picture and the visitor&apos;s picture are not the same thing. METI&apos;s{" "}
            {METI.ratio} cashless share for {METI.year} is dominated by credit cards at{" "}
            {METI.creditShare} of the total and code payments at {METI.codeShare} — the former mostly used
            by residents on large and recurring spending, the latter on apps that need a Japanese bank
            account. Neither tells you anything about a ¥500 admission at a temple gate.
          </p>
          <p className={styles.bodyText}>
            What has genuinely changed is transport, and recently. Tokyo Metro, Toei Subway and eight other
            Kanto operators began mutual use of Tap to Ride in March 2026; Osaka Metro has run its own
            scheme since October 2024; Nankai, Fukuoka City Subway and part of JR Kyushu have followed. JR
            East has not, which is why an IC card is still the only tap that works on every line.
          </p>
          <p className={styles.bodyText}>
            <strong>The safe rule:</strong> keep ¥10,000–¥20,000 on you. You will use it, and a 7-Eleven is
            close enough that topping up is never a detour.
          </p>
        </section>

        {/* Pros & Cons: Cash */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Cash in Japan: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {cashPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cashCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pros & Cons: Card */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>Cards in Japan: Pros &amp; Cons</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {cardPros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cardCons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ATM Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>ATM guide</span>
          <h2 className={styles.sectionTitle}>Best ATMs for Foreign Cards in Japan</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            Branch ATMs at the big commercial banks (Mizuho, MUFG, SMBC) are not the ones to try. Five
            networks take cards issued abroad; these are the three that publish enough about themselves to
            plan around, read on {ATM_CHECKED}:
          </p>
          <div className={styles.stepsList}>
            {atmGuide.map((atm) => (
              <div key={atm.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{atm.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{atm.name}</p>
                  <p className={styles.stepDesc}>{atm.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.5rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            On fees, the honest answer is that four of the five networks do not publish one. Japan Post Bank
            is the exception at ¥220 (tax included) per use for certain cards issued abroad; Seven Bank says
            only that it varies by brand, and E-net that it is set by the handling bank. The machine shows
            the charge on screen before you confirm, and your own bank&apos;s fee is separate and additional —{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the full network comparison
            </Link>{" "}
            has the brand lists, hours and limits side by side.
          </p>
        </section>

        {/* Travel card tips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Pro tip</span>
          <h2 className={styles.sectionTitle}>How to Minimise Fees in Japan</h2>
          <p className={styles.bodyText}>
            There are three places a Japan trip leaks money, and none of them is the exchange rate you see
            quoted. First, a foreign-transaction fee on the card half of your spending, charged on every
            purchase for the whole trip. Second, your own bank&apos;s fee on each withdrawal, charged per
            withdrawal rather than per yen — which is why four withdrawals of ¥25,000 cost four fees where
            one of ¥100,000 costs one. Third, an exchange desk&apos;s margin, which is the widest of the
            three and the easiest to avoid entirely.
          </p>
          <p className={styles.bodyText}>
            A multi-currency card fixes the first two together: the mid-market rate on purchases, and a free
            monthly ATM allowance before any percentage applies. Wise states that its card gives &ldquo;
            {WISE_VERIFIED.rateClaim}&rdquo;, with free withdrawals up to a monthly allowance set by the
            country your account is registered in — {WISE_VERIFIED.freeAtmUk} on a UK-registered account,
            then {WISE_VERIFIED.overAtmFeeUk} of the excess — read off Wise&apos;s own pages on{" "}
            {WISE_VERIFIED.checkedAt}. Allowances differ by account country, so check yours rather than
            ours.
          </p>
          <p className={styles.bodyText}>
            Some US checking accounts reimburse foreign ATM fees, which changes the arithmetic again. The
            terms move, so the comparison is kept where it is checked:{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              best travel card for Japan
            </Link>
            .
          </p>
        </section>

        {/* Contactless payments */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Contactless</span>
          <h2 className={styles.sectionTitle}>Contactless Payments: IC Cards, Tap-to-Pay &amp; QR</h2>
          <p className={styles.bodyText}>
            Japan has three contactless systems and one of them is older than the others: IC cards (Suica,
            Pasmo, ICOCA), tap-to-pay credit cards, and QR pay apps (PayPay, LINE Pay). For a visitor, the
            first two both matter and the third mostly does not.
          </p>
          <p className={styles.bodyText}>
            <strong>IC cards work on every line.</strong> Trains, buses, convenience stores, taxis and the
            vending machines on Coca-Cola&apos;s multi-money list — a Suica covers transit and small
            purchases from the moment you land. Buy a Welcome Suica or TOURIST PASMO at Narita or Haneda, or
            add Suica to Apple Wallet or Google Pay before you fly, and top up at any station machine with
            coins and notes.
          </p>
          <p className={styles.bodyText}>
            <strong>Contactless credit cards now open some ticket gates too</strong> — Tokyo Metro, Toei and
            eight other Kanto operators since March 2026, Osaka Metro since October 2024 — but{" "}
            <strong>not JR East</strong>. <strong>QR pay is mostly for residents:</strong> PayPay and LINE
            Pay need a Japanese bank account for full functionality, so skip them.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Method", "Trains", "Convenience stores", "Vending machines", "Taxis", "Temples & stalls"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contactlessRows.map((row) => (
                    <tr key={row.method}>
                      <td className={styles.tdProvider}>{row.method}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.trains}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.convenience}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.vending}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.taxis}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.temples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Rail cells from the operators&apos; own pages read {RAIL_CHECKED}; store, taxi and vending cells
            from 7-Eleven, km Taxi and Coca-Cola Japan read {CHECKED}. Full details on getting and using an
            IC card:{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Suica &amp; Pasmo guide →
            </Link>{" "}
            and operator by operator:{" "}
            <Link href="/guides/money/contactless-payment-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              contactless payment in Japan →
            </Link>
          </p>
        </section>

        {/* Tipping */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tipping</span>
          <h2 className={styles.sectionTitle}>Tipping in Japan: Don&apos;t</h2>
          <p className={styles.bodyText}>
            Tipping is not part of Japanese culture and is not expected anywhere. Service is built into the
            price, staff are paid a professional wage, and leaving cash on the table or handing money to a
            taxi driver can cause confusion — staff will often chase you down to return it. In an upscale
            restaurant or ryokan, the attempt can even imply you were dissatisfied.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Why no tip</th>
                  </tr>
                </thead>
                <tbody>
                  {noTipPlaces.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The exceptions</strong> are narrow and optional: a <em>kokorozuke</em> envelope (¥1,000–¥3,000 per
            person) for your host at a high-end ryokan, and a small voluntary gratuity for an independent private tour
            guide. Neither is expected.
          </p>
          <p className={styles.bodyText}>
            <strong>Instead of tipping:</strong> say a clear &ldquo;arigatou gozaimasu&rdquo; with eye contact, bow
            slightly as you leave, and leave a positive Google review — small family-run restaurants and guesthouses
            value this far more than money.
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/best-travel-insurance-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6a10 10 0 0 1 8-4z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Insurance for Japan 2026: Cover and Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/atms-in-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <line x1="8" y1="7" x2="16" y2="7" />
                  <line x1="8" y1="11" x2="16" y2="11" />
                  <line x1="8" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>ATMs in Japan (2026): Which Accept Foreign Cards &amp; What the Fees Are</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="6" y1="15" x2="10" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Fees and ATM Limits Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/wise-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise Card in Japan (2026): ATM Fees, Free Limits &amp; Which ATMs Take It</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/contactless-payment-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8a8 8 0 0 1 0 8M10 5a12 12 0 0 1 0 14M14 2a16 16 0 0 1 0 20" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Contactless Payment in Japan (2026): What Actually Works</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" />
                  <path d="M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget (2026): What a Trip to Tokyo Actually Costs</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <line x1="9" y1="3" x2="9" y2="10" />
                  <line x1="15" y1="3" x2="15" y2="10" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                  <line x1="9" y1="14" x2="9" y2="14" />
                  <line x1="12" y1="14" x2="12" y2="14" />
                  <line x1="15" y1="14" x2="15" y2="14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan: Where to Get the Best Rate</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Money &amp; Payment Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/tax-free-shopping-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <circle cx="12" cy="12.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tax-Free Shopping in Japan (2026): How to Get Your Consumption Tax Back</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Get your Japan eSIM sorted too</h2>
            <p className={styles.ctaBannerDesc}>
              While you&apos;re planning your money strategy — don&apos;t forget data.
              Get connected the moment you land with a Japan eSIM from {siteCheapestFrom()}.
            </p>
            <a
              href="https://airalo.pxf.io/c/7213504/1268485/15608"
              className={styles.ctaBannerBtn}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Get Airalo Japan eSIM →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
