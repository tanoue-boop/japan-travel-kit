import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import { contactlessTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { wiseLink, WISE_CARD_URL, WISE_REL, WISE_VERIFIED } from "../../../lib/wise-links";

// Klook's Suica listing — the purchase that was already on this page, URL unchanged.
const SUICA_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F";

/**
 * Every station count, cap and date on this page was read off the operator's own
 * site on this date. None of it is ours, and none of it is an estimate — which
 * matters here more than on most pages, because the answer changed in March 2026
 * and most of what is written about Japanese ticket gates is now out of date.
 */
const CHECKED = "23 October 2026";

/**
 * The second pass (12 Nov 2026, task F): the Tokyo Metro announcement, Welcome Suica,
 * TOURIST PASMO, 7-Eleven's in-store payment page, Sumitomo Mitsui Card's stera
 * transit operator list and JNTO's FAQ were re-read on this date. Shown as ISO in the
 * "Last checked" line under each table.
 */
const CHECKED_NOV = "12 November 2026";
const LAST_CHECKED_ISO = "2026-11-12";

/** Official sources for the payment table, all read on CHECKED_NOV. */
const SOURCES = {
  sevenEleven: "https://www.sej.co.jp/in/en/payment/",
  tokyoMetro: "https://www.tokyometro.jp/lang_en/news/223896.html",
  stera: "https://www.smbc-card.com/kamei/stera/transit/index.jsp",
  welcomeSuica: "https://www.jreast.co.jp/multi/en/welcomesuica/purchase.html",
  touristPasmo: "https://www.pasmo.co.jp/en/tourist-pasmo/",
  pasmoNotices: "https://www.pasmo.co.jp/visitors/en/",
  jntoFaq: "https://www.japan.travel/en/plan/faq/",
  jntoBudget: "https://www.japan.travel/en/plan/tips-for-budget-travels/",
} as const;

/**
 * Payment method × place. The first row is the conclusion, so a reader (or a
 * summary) that stops after one line still leaves with the right answer. Every
 * other cell is either an official statement from SOURCES or says "check".
 */
const placeColumns = ["Convenience stores", "Chains & department stores", "Trains", "Buses", "Temples & shrines", "Street stalls & small restaurants"];

const paymentPlaces: { method: string; cells: string[]; conclusion?: boolean }[] = [
  {
    method: "Bottom line",
    conclusion: true,
    cells: [
      "Tap a card or IC card",
      "Tap a card",
      "IC card works on every operator; a card works on 11 Kanto operators, not JR East",
      "IC card; card only on some routes",
      "Carry yen",
      "Carry yen",
    ],
  },
  {
    method: "Contactless card (Visa, Mastercard, JCB, Amex) or Apple Pay / Google Pay with that card",
    cells: [
      "Yes — 7-Eleven lists Visa, Mastercard, JCB, Amex, Diners Club, Discover, Apple Pay and Google Pay",
      "Usually",
      "Tokyo Metro, Toei and 9 other Kanto operators (729 stations), Osaka Metro, Nankai, Fukuoka City Subway — not JR East",
      "Some routes — check the operator in the stera transit list",
      "Not a given — check at the gate",
      "Often not — JNTO: smaller shops may take only yen in cash",
    ],
  },
  {
    method: "IC card: Suica, PASMO, Welcome Suica, TOURIST PASMO (card or in Apple / Google Wallet)",
    cells: [
      "Yes — 7-Eleven lists Suica, PASMO and 7 other IC brands",
      "Where the IC mark is shown",
      "Yes, including JR East, across the nationwide IC network",
      "Yes, on IC-area buses",
      "Not a given — check at the gate",
      "Sometimes",
    ],
  },
  {
    method: "Cash (yen)",
    cells: ["Yes (not at fully self-service tills — 7-Eleven)", "Yes", "Yes, at ticket machines", "Yes", "Yes — fees are generally a couple of hundred yen (JNTO)", "Yes"],
  },
  {
    method: "QR / scan-to-pay (Alipay+, WeChat Pay, PayPay)",
    cells: ["Yes at 7-Eleven", "Varies by chain", "No", "No", "Not a given", "Varies"],
  },
];

/**
 * The table this page exists for: operator by operator, can you tap a credit card at
 * the gate. Every `detail` line is the operator's own published figure, read on
 * `CHECKED`. Nothing here is inferred except the JR East row, which is inferred from
 * an official list that does not contain it.
 */
const tapNetworks = [
  {
    network: "Tokyo Metro & Toei Subway",
    tap: "Yes",
    detail:
      "Both are among the eleven Kanto railway operators that began mutual use of the Tap to Ride service on Wednesday 25 March 2026, covering 54 lines at 729 stations. Tokyo Metro had separately announced the service for all of its own lines from spring 2026.",
  },
  {
    network: "Tokyu, Keio, Keikyu, Odakyu, Odakyu Hakone, Seibu, Tobu, Sotetsu, Yokohama Minatomirai",
    tap: "Yes",
    detail:
      "The rest of the same eleven. Tokyo Metro's announcement states that the lines and stations covered vary with the operator and that stations not covered at launch will be added later — so a tap is not yet guaranteed at every gate on every one of them.",
  },
  {
    network: "JR East — Yamanote, Chuo, Keihin-Tohoku, Narita Express",
    tap: "No",
    detail:
      "JR East is not one of the eleven operators named in that announcement. On JR East you still need an IC card, a paper ticket or a pass, which is why the rest of this page still spends time on Suica.",
  },
  {
    network: "Osaka Metro",
    tap: "Yes",
    detail:
      "Osaka Metro states it started the service at all of its stations on 29 October 2024, and added Mastercard to the accepted brands from the first train on 4 March 2025.",
  },
  {
    network: "Nankai — Namba to Kansai Airport, Koyasan, Wakayama",
    tap: "Nearly all stations",
    detail:
      "Nankai states tap-to-ride is usable at 97 of the 105 stations on its network, for Visa, Mastercard, JCB, American Express, Diners Club, Discover and UnionPay.",
  },
  {
    network: "Fukuoka City Subway",
    tap: "Yes, and capped",
    detail:
      "All three lines and all 36 stations. Fukuoka City Subway publishes a daily maximum of ¥640 (¥320 on child and disability fares) from 1 April 2024 and a monthly maximum of ¥12,570 from 1 October 2024 — so the tap behaves like a day pass without being one.",
  },
  {
    network: "JR Kyushu, Fukuoka area",
    tap: "Partly",
    detail:
      "JR Kyushu lists a Fukuoka Area total of 92 stations for its contactless service, rolled out from 1 April 2026, with the shinkansen and some main lines excluded.",
  },
  {
    network: "Local buses, trams and most regional lines",
    tap: "Usually not",
    detail:
      "Outside the city schemes above, buses and rural lines still expect an IC card or cash. This is the gap an IC card is still worth carrying for.",
  },
];

/**
 * What a tap cannot buy. The point of the column order is that the first column is
 * not "can you pay by card" — card payment is mostly solved — but whether the thing
 * is available at a gate or a door at all.
 */
const prepayRows = [
  {
    item: "Airport access: Keisei Skyliner, Narita Express, limousine bus, JR Haruka",
    tap: "Not for a reserved seat on an airport limited express — that is a ticket, not a gate fare",
    how: "Buy the ticket or seat online before you fly and collect or scan it on arrival. A tap at a gate settles a fare; it cannot reserve you a seat with luggage space.",
  },
  {
    item: "Subway passes: Tokyo Subway Ticket, Osaka Amazing Pass",
    tap: "You can tap instead — but you are then charged per journey",
    how: "Buy the 24 / 48 / 72-hour ticket or the 1 / 2-day pass in advance. Worth it above roughly four rides a day, and the Osaka pass also bundles admissions a tap cannot give you.",
  },
  {
    item: "Day tours out of the city (Fuji, Hakone, Nara, Nikko)",
    tap: "No",
    how: "A fixed-departure coach seat, sold online and often full in peak season. There is no counter to tap at.",
  },
  {
    item: "Popular attraction tickets (Skytree, teamLab, Shibuya Sky)",
    tap: "At the door, if a slot is left",
    how: "Most sell timed entry. The card terminal working is not the constraint — the time slot is, so book the slot ahead.",
  },
  {
    item: "Mobile data (eSIM)",
    tap: "No",
    how: "Install it before you fly. Airport SIM counters take cards but cost you a queue on the one day you least want one.",
  },
  {
    item: "Hotel room",
    tap: "Yes, on arrival",
    how: "Prepay at booking in your own currency instead. Tapping at a front desk works, but at whatever rate your card issuer applies that day.",
  },
];

const suicaSteps = [
  {
    title: "Get an IC card, or load one onto your phone",
    desc: "Add Suica or Pasmo to Apple Wallet or Google Pay before you fly, buy a Welcome Suica or TOURIST PASMO at the airport, or order a Suica via Klook and collect it on arrival.",
  },
  {
    title: "Load credit at a ticket machine",
    desc: "Top up with yen at a station ticket machine or a Seven Bank ATM. JR East states a Welcome Suica cannot be topped up with a credit card, and PASMO's TOURIST PASMO page lists cash top-ups at station machines.",
  },
  {
    title: "Tap to ride trains and buses",
    desc: "Touch your card to the IC reader on entry and on exit. The correct fare is deducted automatically — no need to select a destination.",
  },
  {
    title: "Pay at convenience stores and vending machines",
    desc: "At checkout, tell the cashier 'Suica' or hold your card near the reader. Works at 7-Eleven, Lawson, FamilyMart, and most vending machines across Japan.",
  },
];

const faqItems = [
  {
    q: "Can I use contactless cards in Japan?",
    a: `Yes. Convenience stores and large chains take contactless Visa, Mastercard, JCB and American Express — 7-Eleven's own payment page lists those four plus Diners Club and Discover, and Apple Pay and Google Pay for contactless. The gaps are transport and small places: a card opens ticket gates on Tokyo Metro, Toei and nine other Kanto operators but not on JR East, and JNTO notes that smaller shops may accept only yen in cash. Checked ${CHECKED_NOV}.`,
  },
  {
    q: "Can I tap my credit card on Tokyo trains?",
    a: `On the subway and most private railways, yes; on JR East, no. Tokyo Metro states that eleven Kanto operators — Tokyo Metro, Toei, Tokyu, Keio, Keikyu, Odakyu, Odakyu Hakone, Seibu, Tobu, Sotetsu and Yokohama Minatomirai — began mutual use of the Tap to Ride service on 25 March 2026 on 54 lines at 729 stations, with lines and stations varying by operator. JR East, which runs the Yamanote Line and the Narita Express, is not among them. Tobu publishes the conditions (read ${CHECKED}): both stations must support the service, adult fares only, one card per passenger. Tokyo Metro announcement checked ${CHECKED_NOV}.`,
  },
  {
    q: "Do I still need a Suica card?",
    a: `For JR East trains and most buses, yes — an IC card is the only tap accepted on every operator. Visitors can buy a Welcome Suica (¥1,000–¥10,000, valid 28 days including the day of purchase, no refunds, and JR East states it cannot be topped up by credit card) or a TOURIST PASMO (¥1,000–¥10,000 at Haneda, ¥2,000 at Narita, valid 28 days, no deposit, no refunds), or add Suica or PASMO to Apple Wallet. PASMO PASSPORT is no longer sold: PASMO lists its rules as abolished on 4 October 2024. Checked ${CHECKED_NOV}.`,
  },
  {
    q: "Which payments do temples and small restaurants accept?",
    a: `Plan on cash. JNTO's FAQ says smaller shops and remote ryokan may accept only yen in cash, and its budget page puts most temple and shrine fees at a couple of hundred yen where one is charged. Some take IC cards, cards or QR payment, but there is no rule to rely on, so check at the gate or the counter. Checked ${CHECKED_NOV}.`,
  },
  {
    q: "Does a contactless card work on trains outside Tokyo?",
    a: `On several big city networks, yes. Osaka Metro states it has taken contactless cards at all stations since 29 October 2024, Nankai at 97 of its 105 stations, Fukuoka City Subway at all 36 stations with a published daily maximum of ¥640, and JR Kyushu at 92 stations in its Fukuoka area. Beyond those, Sumitomo Mitsui Card's stera transit page counts 236 announced rail, bus and ferry schemes in 46 prefectures (end of September 2026) and lists the operators. Rural lines and many buses still expect an IC card or cash. Operator figures read ${CHECKED}; stera transit list checked ${CHECKED_NOV}.`,
  },
];

const canonicalUrl = "https://www.japan-travel-kit.com/guides/money/contactless-payment-japan";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/contactless-payment-japan") } });

export default function ContactlessPaymentJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Contactless Payment in Japan (2026): Tap to Pay &amp; Trains</title>
        <meta
          name="description"
          content="Contactless payment in Japan: Visa, Mastercard, JCB and Amex tap at konbini, chains and Tokyo subways, not JR East. Yen for temples; prebook airport rides."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Contactless Payment in Japan (2026): Tap to Pay & Trains" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:description" content="Contactless payment in Japan: Visa, Mastercard, JCB and Amex tap at konbini, chains and Tokyo subways, not JR East. Yen for temples; prebook airport rides." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contactless Payment in Japan (2026): Tap to Pay & Trains" />
        <meta name="twitter:description" content="Contactless payment in Japan: Visa, Mastercard, JCB and Amex tap at konbini, chains and Tokyo subways, not JR East. Yen for temples; prebook airport rides." />
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
              route: "/guides/money/contactless-payment-japan",
              headline: "Contactless Payment in Japan (2026): Where Tap to Pay Works",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Money", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Contactless Payment in Japan", item: canonicalUrl },
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
          <Link href="/guides/money" className={styles.breadLink}>Money</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Contactless Payment in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Contactless Payment in Japan (2026):<br />Where Tap to Pay Works
          </h1>
          <p className={styles.heroSubtitle}>
            Cards, Suica, trains, temples — which tap works where, where you still
            need yen, and what to book before you land.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Operator by operator", "For Foreign Visitors"].map((t) => (
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
            This doesn&apos;t affect our editorial recommendations.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <EsimCtaTop />

        {/* Answer first */}
        <section className={styles.bodySection} style={{ marginBottom: "2.5rem" }}>
          <h2 className={styles.sectionTitle}>Can I Use Contactless Cards in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>
              Yes: contactless Visa, Mastercard, JCB and American Express work at Japan&apos;s convenience
              stores and big chains — 7-Eleven lists all four, plus Apple Pay and Google Pay.
            </strong>{" "}
            For trains, an IC card (Suica or PASMO; visitors can buy a Welcome Suica or TOURIST PASMO, as PASMO
            PASSPORT is no longer sold) works on every operator, while a contactless card opens the gates of 11
            Kanto operators including Tokyo Metro and Toei — 729 stations from 25 March 2026 — but not JR East.
            Cash still matters: JNTO notes that smaller shops may accept only yen in cash.
          </p>
          <p className={styles.bodyText}>
            So the working kit is a contactless card for shops and most of Tokyo&apos;s subway, an IC card for
            JR East and buses, and some yen for temples, stalls and small restaurants. The table below sets
            it out place by place, and the{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              cash vs card guide
            </Link>{" "}
            covers how much yen that means.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Payment</th>
                    {placeColumns.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentPlaces.map((row) => (
                    <tr key={row.method}>
                      <td className={styles.tdProvider}>{row.conclusion ? <strong>{row.method}</strong> : row.method}</td>
                      {row.cells.map((c, i) => (
                        <td key={i} style={{ fontSize: "0.85rem" }}>
                          {row.conclusion ? <strong>{c}</strong> : c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED_ISO}. Sources:{" "}
            <a href={SOURCES.sevenEleven} target="_blank" rel="noopener">7-Eleven in-store payment</a>,{" "}
            <a href={SOURCES.tokyoMetro} target="_blank" rel="noopener">Tokyo Metro (Tap to Ride, 11 operators)</a>,{" "}
            <a href={SOURCES.stera} target="_blank" rel="noopener">stera transit operator list (Sumitomo Mitsui Card)</a>,{" "}
            <a href={SOURCES.welcomeSuica} target="_blank" rel="noopener">JR East Welcome Suica</a>,{" "}
            <a href={SOURCES.touristPasmo} target="_blank" rel="noopener">TOURIST PASMO</a>,{" "}
            <a href={SOURCES.jntoFaq} target="_blank" rel="noopener">JNTO FAQ</a>,{" "}
            <a href={SOURCES.jntoBudget} target="_blank" rel="noopener">JNTO budget tips</a>. Station counts for
            Osaka, Nankai and Fukuoka were read on {CHECKED}.
          </p>
        </section>

        {/* Pre-arrival bookings — moved up under the first table (12 Nov 2026) */}
        <div id="before-you-land" />
        <KlookTripPrep
          heading="What Can I Pay For Before I Land?"
          intro="Contactless settles a fare or a shop bill on the day. It cannot hold a reserved seat, a timed entry slot or a coach seat on a day tour — and those are the things that sell out. Pay for these in your own currency before you fly: airport transfers for Narita, Haneda and Kansai, the Tokyo Subway Ticket, popular timed tickets and a day tour."
          items={contactlessTripPrep}
        />
        <BookingEsimCard lead="Tapping a phone to pay needs the phone online for maps, tickets and fare history. Get data before you land." />
        <p className={styles.bodyText} style={{ fontSize: "0.88rem" }}>
          Which to book first: the airport transfer, because it is the first ride of the trip; then any timed
          ticket on a date you cannot move, because those are the slots that go. Tokyo Subway Ticket or
          per-ride taps is a decision you can make on the{" "}
          <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Tokyo Subway Ticket
          </Link>{" "}
          page once you know how many rides a day you will take.
        </p>

        {/* The operator table — the part an AI summary of "can you tap in Japan" leaves out */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Network by network</span>
          <h2 className={styles.sectionTitle}>Can I Tap My Credit Card on Tokyo Trains?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            On Tokyo Metro, Toei and nine other Kanto railways, yes — 54 lines at 729 stations from 25 March
            2026, on Tokyo Metro&apos;s figures; on JR East (Yamanote Line, Chuo Line, Narita Express), no. The
            split does not follow any rule you could guess from the station, so check which operator you are
            about to ride before you leave your IC card in the hotel.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Network", "Credit card at the gate?", "What the operator states"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tapNetworks.map((row) => (
                    <tr key={row.network}>
                      <td className={styles.tdProvider}>{row.network}</td>
                      <td className={styles.tdPrice}>{row.tap}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Three rules apply across the Kanto scheme, as Tobu — one of the eleven — publishes them: both your
            departure and arrival stations must support the service; only adult fares are available, so a child
            cannot travel this way; and one card cannot pay for more than one passenger. Operator pages checked{" "}
            {CHECKED}.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED_ISO} for the Kanto list (
            <a href={SOURCES.tokyoMetro} target="_blank" rel="noopener">Tokyo Metro announcement</a>). For every
            other railway, bus and ferry that takes a Visa tap, the official list is Sumitomo Mitsui Card&apos;s{" "}
            <a href={SOURCES.stera} target="_blank" rel="noopener">stera transit operator list</a> — 236
            announced schemes in 46 prefectures at the end of September 2026, checked {LAST_CHECKED_ISO}.
          </p>
        </section>

        {/* IC Card section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Method 1</span>
          <h2 className={styles.sectionTitle}>Do I Still Need a Suica Card?</h2>
          <p className={styles.bodyText}>
            Yes, if you will ride JR East or local buses — an IC card is the only tap every operator accepts.
            It does not have to be plastic: Suica or PASMO in Apple Wallet works the same way, while Apple Pay
            with an ordinary credit card is a card payment and is accepted in different places.
          </p>
          <p className={styles.bodyText}>
            Two details a quick answer leaves out. JR East&apos;s Welcome Suica (¥1,000–¥10,000, valid 28 days
            including the day of purchase) cannot be topped up with a credit card — only yen, at machines or
            Seven Bank ATMs — and it gives no refund of the balance. TOURIST PASMO (¥1,000–¥10,000 at Haneda,
            ¥2,000 at Narita, 28 days, no deposit) is also non-refundable. Both checked {CHECKED_NOV} on the{" "}
            <a href={SOURCES.welcomeSuica} target="_blank" rel="noopener">JR East</a> and{" "}
            <a href={SOURCES.touristPasmo} target="_blank" rel="noopener">PASMO</a> sites, so load only what you
            will spend.
          </p>
          <p className={styles.bodyText}>
            An IC card is a rechargeable contactless card that works as both a transit pass and a small-value
            payment card. Suica is issued by JR East; Pasmo by Tokyo Metro and private railways. Both are
            accepted interchangeably on all trains, buses, and at IC card payment terminals across Japan —
            including the JR East gates no credit card opens.
          </p>
          <p className={styles.bodyText}>
            They also work at every 7-Eleven, Lawson and FamilyMart, most vending machines, and an increasing
            number of taxis and restaurants. Adding Suica to Apple Wallet works on iPhone 7 and later, and on
            most modern Android phones that support NFC. For the deposit, refunds and top-up mechanics, see our{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              IC cards in Japan guide
            </Link>.
          </p>
          <KlookLink
            href={SUICA_URL}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
          >
            Get Suica on Klook →
          </KlookLink>
        </section>

        {/* Tap-to-pay section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Method 2</span>
          <h2 className={styles.sectionTitle}>Where Does a Tap-to-Pay Credit Card Beat an IC Card?</h2>
          <p className={styles.bodyText}>
            On anything above a few thousand yen: department stores, hotels, restaurants and tax-free
            purchases, where an IC card&apos;s stored balance runs out and the top-up queue starts.
          </p>
          <p className={styles.bodyText}>
            Visa and Mastercard contactless are widely accepted at major retailers, department stores, hotels,
            and most restaurants in tourist areas. Look for the contactless symbol (four curved lines) at the
            payment terminal and tap your card or phone. Since March 2026 the same card also rides most of
            Tokyo&apos;s subway and private railway network, which removes the single biggest reason visitors
            used to need an IC card at all — everywhere except JR East.
          </p>
          <p className={styles.bodyText}>
            One brand note: American Express contactless is less widely accepted in Japanese shops than Visa or
            Mastercard, though it is on the accepted list for the rail schemes above. If your wallet has both,
            lead with Visa.
          </p>
          <p className={styles.bodyText}>
            The card you tap matters more than the terminal: every tap is a foreign-currency transaction, and
            your issuer&apos;s exchange margin repeats on each one. A multi-currency card such as{" "}
            <a href={wiseLink("contactless-payment-japan", WISE_CARD_URL)} target="_blank" rel={WISE_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
              Wise
            </a>{" "}
            states it charges {WISE_VERIFIED.rateClaim} (read {WISE_VERIFIED.checkedAt}); the{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              best travel card for Japan
            </Link>{" "}
            comparison sets the options side by side, and{" "}
            <Link href="/guides/money/atms-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              ATMs in Japan
            </Link>{" "}
            covers where the same card withdraws the yen you still need.
          </p>
        </section>

        {/* QR Pay section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Method 3</span>
          <h2 className={styles.sectionTitle}>Should Tourists Bother With PayPay or QR Pay?</h2>
          <p className={styles.bodyText}>
            No. Full PayPay functionality still assumes a Japanese bank account or phone number, and a Suica
            plus a contactless card already covers nearly everything you will try to pay for.
          </p>
          <p className={styles.bodyText}>
            Japan&apos;s QR pay ecosystem — PayPay, LINE Pay, Rakuten Pay, au PAY — is enormous. Most small
            restaurants, markets, and local shops accept at least one of them. PayPay alone is accepted at over
            6 million locations.
          </p>
          <p className={styles.bodyText}>
            But the setup process is cumbersome compared to simply tapping a card, and the places that take QR
            pay and nothing else are rare. Unless you are on an extended stay, skip it.
          </p>
        </section>

        {/* Where contactless fails */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The gaps</span>
          <h2 className={styles.sectionTitle}>Which Payments Do Temples and Small Restaurants Accept?</h2>
          <p className={styles.bodyText}>
            Plan on yen. JNTO&apos;s FAQ says smaller shops and remote ryokan may accept only cash, and its
            budget page puts most temple and shrine fees, where one is charged, at a couple of hundred yen
            (both checked {CHECKED_NOV}).
          </p>
          <p className={styles.bodyText}>
            Some temples and small restaurants do take IC cards, cards or QR payment, but nothing official says
            which ones, so treat a card as a bonus there rather than the plan. Beyond those, the other places a
            contactless card will not get you through are JR East ticket gates and many local buses.
          </p>
          <p className={styles.bodyText}>
            Coin lockers are the one that catches people on arrival day with luggage. JR East states that
            lockers showing the IC option take a Welcome Suica as both payment and key, so an IC card covers
            those; a locker without that option needs cash.
          </p>
          <p className={styles.bodyText}>
            There is also a quieter gap inside the new rail schemes. Tobu publishes the conditions the whole
            Kanto scheme runs on: both ends of the journey must be at supported stations, only adult fares are
            available, and a single card cannot cover two passengers. JR Kyushu states the same adult-only rule
            and adds that if you enter with a contactless card you must exit at a station with a compatible
            gate (both checked {CHECKED}). So a family travelling together, or anyone riding out to a station
            at the edge of a network, still needs IC cards or paper tickets.
          </p>
          <p className={styles.bodyText}>
            The working combination for all of it: a contactless card for the large transactions, an IC card
            for transit and small purchases, and ¥10,000–¥20,000 in cash. How much cash exactly is answered in{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              cash vs card in Japan
            </Link>.
          </p>
        </section>

        {/* The prepay table — the part a yes/no answer can't cover */}
        <section className={styles.bodySection} id="prepay">
          <span className={styles.sectionLabel}>Buy ahead instead</span>
          <h2 className={styles.sectionTitle}>What Should You Prepay Instead of Tapping?</h2>
          <p className={styles.bodyText}>
            Anything that is a reserved seat, a timed slot or a multi-ride pass — because a tap at a gate
            settles a fare, and it cannot reserve you a seat, hold you an entry time, or stop the meter after
            four journeys.
          </p>
          <p className={styles.bodyText}>
            That is the useful half of the contactless question now that the payment half is mostly solved. The
            table below is ordered the way a trip is: airport first, then getting around, then the days
            themselves.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.25rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Can you tap or use IC?", "How to buy it ahead"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prepayRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tap}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Two of those rows have guides of their own: the{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Tokyo airport limousine bus
            </Link>{" "}
            for the arrival-day run with luggage, and the{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Tokyo Subway Ticket
            </Link>{" "}
            for working out whether a pass beats tapping per journey on your own itinerary. The bookings
            themselves are in the{" "}
            <a href="#before-you-land" style={{ color: "var(--accent)", fontWeight: 600 }}>
              pay-before-you-land block near the top
            </a>.
          </p>
        </section>

        {/* How to get Suica steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Getting started</span>
          <h2 className={styles.sectionTitle}>How Do You Get and Top Up an IC Card?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Either load Suica onto your phone before you fly, or buy a card on arrival — then top it up with
            yen at a station machine. Four steps, start to finish.
          </p>
          <div className={styles.stepsList}>
            {suicaSteps.map((step, i) => (
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
            Tapping your phone needs the phone to stay online for wallets, maps and tickets, so sort data before you land: our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>best eSIM for Japan</Link> picks cover most trips, the <Link href="/guides/esim/japan-esim-unlimited" style={{ color: "var(--accent)", fontWeight: 600 }}>unlimited eSIM comparison</Link> covers heavy use, and our{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" style={{ color: "var(--accent)", fontWeight: 600 }}>airport SIM card guide</Link> covers a phone that cannot take an eSIM. Regional passes are a separate purchase: the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--accent)", fontWeight: 600 }}>JR Kansai Area Pass</Link> is a QR ticket, not a tap-and-go fare.
          </p>
        </section>

        <EsimCtaBottom insurance />

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
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M6 9h4M6 13h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): Is the 24/48/72-Hour Pass Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-limousine-bus" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="12" rx="2" />
                  <circle cx="7.5" cy="19" r="1.5" />
                  <circle cx="16.5" cy="19" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Airport Limousine Bus Tokyo (2026): Narita &amp; Haneda Fares, Times and Stops</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Don&apos;t forget your eSIM for Japan</h2>
            <p className={styles.ctaBannerDesc}>
              Have working data before you land — use Google Maps and translation apps from the airport without hunting for Wi-Fi.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              Best eSIM for Japan →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
