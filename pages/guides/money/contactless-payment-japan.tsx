import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { contactlessTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

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
 * Which tap works where. The "trains" column is the one that changed: a contactless
 * Visa now opens a gate on most of Tokyo's private and subway network but still not
 * on JR East, so neither "✓" nor "✗" is honest and the cell says what it is.
 */
const paymentMethods = [
  {
    method: "IC card (Suica / Pasmo / ICOCA)",
    trains: "Everywhere",
    convenience: "✓",
    restaurants: "Partial",
    taxis: "Partial",
    stores: "Partial",
  },
  {
    method: "Contactless Visa / Mastercard",
    trains: "Most private & subway, not JR East",
    convenience: "✓",
    restaurants: "✓",
    taxis: "Partial",
    stores: "✓",
  },
  {
    method: "QR pay (PayPay etc.)",
    trains: "✗",
    convenience: "✓",
    restaurants: "✓",
    taxis: "✗",
    stores: "✓",
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
    network: "Tokyu, Keio, Keikyu, Odakyu, Seibu, Tobu, Sotetsu, Yokohama Minatomirai",
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
    tap: "No — these are reserved seats and coach tickets, not gate fares",
    how: "Buy the ticket or seat online before you fly and collect or scan it on arrival. A tap at a gate cannot reserve you a seat with luggage space.",
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
    desc: "Top up at any JR station machine. Most accept Visa and Mastercard. Add ¥2,000–¥5,000 for a full day of transit and convenience store shopping.",
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
    q: "Can I use a Visa card to ride the subway in Tokyo?",
    a: `Yes, on both subway operators. Tokyo Metro's own announcement states that eleven Kanto railway operators — including Tokyo Metro and the Bureau of Transportation of the Tokyo Metropolitan Government, which runs Toei Subway — began mutual use of the Tap to Ride contactless service on Wednesday 25 March 2026, covering 54 lines at 729 stations, and that cards supporting tap payment (credit, debit or prepaid) and smartphones with such a card registered are eligible. Two conditions come with it. Tobu, one of the eleven, states that contactless may be used only when both the departure and arrival stations support the service, that only adult fares apply — there is no child fare — and that one card may not be used to pay for more than one passenger. And Tokyo Metro states the lines and stations covered vary with the operator, with more to be added. JR East is not among the eleven, so a Visa card will not open a Yamanote Line gate. Operator pages checked ${CHECKED}.`,
  },
  {
    q: "Is an IC card still sold to tourists in Japan?",
    a: `Yes. PASMO's official site describes TOURIST PASMO as a PASMO for international visitors, priced from ¥1,000 to ¥10,000 depending on where you buy it, valid for 28 days from the date of purchase, with no deposit charged and value added to the card not refunded. It lists sales at Haneda Airport (Keikyu) and Narita Airport (Keisei), at ticket machines and information centres. JR East sells the equivalent Welcome Suica through its JR EAST Travel Service Centers and dedicated machines at both Narita terminals and Haneda Terminal 3 — check its site for the current price and validity before you rely on a figure. Checked ${CHECKED}.`,
  },
  {
    q: "Do contactless payments work on Japanese trains?",
    a: `It depends on the operator, and the answer changed in March 2026. A contactless Visa, Mastercard, JCB, American Express, Diners Club, Discover or UnionPay card now opens ticket gates on Tokyo Metro, Toei Subway and eight other Kanto operators (from 25 March 2026, 54 lines and 729 stations on Tokyo Metro's figures), on Osaka Metro (all stations since 29 October 2024), on 97 of Nankai's 105 stations, at all 36 Fukuoka City Subway stations and at 92 JR Kyushu stations in its Fukuoka area. It does not work on JR East, which is not part of the Kanto scheme, nor on most local buses and regional lines. An IC card — Suica, Pasmo or ICOCA — is still the only tap that works on all of them. Operator pages checked ${CHECKED}.`,
  },
  {
    q: "Do I need a Suica card if I have Apple Pay?",
    a: "Not a physical one, no — but you do need the Suica itself. Add Suica or Pasmo to Apple Wallet (Wallet app → + → Transit Card → Suica) and your phone taps the same IC readers a plastic card does, on every railway, bus and convenience store that takes IC. Tapping Apple Pay with an ordinary credit card set as the default is a different transaction: that is a contactless card payment, so it works at the retail terminals and at the gates of the operators listed above, and not on JR East. If you want one tap that works everywhere, it has to be the Suica, not the credit card.",
  },
  {
    q: "What's the difference between Suica and Pasmo?",
    a: "Suica is issued by JR East; Pasmo is issued by Tokyo Metro and private railways. In practice, both are accepted interchangeably on all trains and buses across Japan and at all IC card payment terminals. The brand doesn't matter — either works everywhere.",
  },
  {
    q: "Can tourists use PayPay or LINE Pay in Japan?",
    a: "It's possible, but not straightforward. PayPay requires a Japanese phone number and bank account for full top-up functionality, though limited tourist support launched in 2024. LINE Pay has similar restrictions. For most tourists, a Suica IC card and a contactless Visa or Mastercard will cover everything you need — skip QR pay entirely.",
  },
  {
    q: "Where is contactless not accepted in Japan?",
    a: "Four places, reliably: small independent restaurants and izakaya, temple and shrine admissions, market stalls and street food, and coin lockers and some local buses. Add JR East ticket gates for credit cards specifically. None of these take a card of any kind in many cases, which is why the practical answer is still a contactless card for the large transactions, an IC card for transit and small purchases, and ¥10,000–¥20,000 in cash for the rest.",
  },
];

const canonicalUrl = "https://www.japan-travel-kit.com/guides/money/contactless-payment-japan";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/contactless-payment-japan") } });

export default function ContactlessPaymentJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Contactless Payment in Japan (2026) | Japan Travel Kit</title>
        <meta
          name="description"
          content="Can you use contactless payment in Japan? Yes — and since March 2026 a credit card also opens most Tokyo subway and private railway gates, but not JR East. Operator by operator."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Contactless Payment in Japan (2026): What Actually Works" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:description" content="Can you use contactless payment in Japan? Yes — and since March 2026 a credit card also opens most Tokyo subway and private railway gates, but not JR East." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contactless Payment in Japan (2026): What Actually Works" />
        <meta name="twitter:description" content="Can you use contactless payment in Japan? Yes — and since March 2026 a credit card also opens most Tokyo subway and private railway gates, but not JR East." />
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
              headline: "Contactless Payment in Japan (2026): IC Cards, QR Pay & Tap-to-Pay Explained",
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
            Contactless Payment in Japan (2026):<br />What Actually Works
          </h1>
          <p className={styles.heroSubtitle}>
            Your contactless Visa now opens most Tokyo subway gates — but not a JR
            East one. Here is which tap works on which network.
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

        {/* Answer first */}
        <section className={styles.bodySection} style={{ marginBottom: "2.5rem" }}>
          <h2 className={styles.sectionTitle}>Can You Use Contactless Payment in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>
              Yes — a contactless Visa or Mastercard is accepted at convenience stores, chains, department
              stores, hotels and most city restaurants, and since 25 March 2026 it also opens ticket gates on
              Tokyo Metro, Toei Subway and eight other Kanto railway operators.
            </strong>{" "}
            Tokyo Metro states those eleven operators began mutual use of the Tap to Ride service that day,
            covering 54 lines at 729 stations. Osaka Metro has taken contactless cards at every station since
            29 October 2024, Nankai at 97 of its 105 stations, and Fukuoka City Subway at all 36 of its
            stations with a published daily maximum of ¥640.
          </p>
          <p className={styles.bodyText}>
            The exception is the one most visitors ride first: <strong>JR East</strong> — the Yamanote, Chuo and
            Narita Express — is not among the eleven, so a credit card tap does nothing at a JR gate. That is
            what a Japanese <strong>IC card</strong> (Suica, Pasmo, ICOCA) is still for: it is the only tap
            accepted on every railway and bus in the country. QR pay apps are the third system, and tourists
            can skip them.
          </p>
          <p className={styles.bodyText}>
            Which leaves the question a yes-or-no answer cannot settle, and the reason this page has a table in
            it: given that you can now tap for most journeys, what is still worth buying before you fly?{" "}
            <a href="#prepay" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Jump to what to prepay instead of tapping ↓
            </a>
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Every station count, cap and date on this page was read off the operator&apos;s own site on{" "}
            {CHECKED}. Coverage is still expanding, so check the operator before a journey you cannot afford to
            get wrong.
          </p>
        </section>

        {/* The operator table — the part an AI summary of "can you tap in Japan" leaves out */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Network by network</span>
          <h2 className={styles.sectionTitle}>Can I Tap My Credit Card on Trains in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            On most private railways and city subways, yes; on JR East, no. The split does not follow any rule
            you could guess from the station, so it is worth knowing which operator you are about to ride
            before you leave your IC card in the hotel.
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
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Which Contactless Method Works Where?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            An IC card is the only one of the three that works on every railway and bus; a contactless credit
            card is the better tap for shops, restaurants and hotels. Carry both and use each for what it is
            good at.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Method", "Trains & Subways", "Convenience Stores", "Restaurants", "Taxis", "Department Stores"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((m) => (
                    <tr key={m.method}>
                      <td className={styles.tdProvider}>{m.method}</td>
                      <td style={{ fontSize: "0.88rem" }}>{m.trains}</td>
                      <td>{m.convenience}</td>
                      <td>{m.restaurants}</td>
                      <td>{m.taxis}</td>
                      <td>{m.stores}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* IC Card section */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Method 1</span>
          <h2 className={styles.sectionTitle}>Do I Need a Suica Card If I Have Apple Pay?</h2>
          <p className={styles.bodyText}>
            Not a physical card — but you do need the Suica itself, loaded into Apple Wallet or Google Pay.
            Tapping Apple Pay with an ordinary credit card as the default is a card payment, not an IC
            transaction, and the two are accepted in different places.
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
          <a
            href={SUICA_URL}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
          >
            Get Suica on Klook →
          </a>
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
          <h2 className={styles.sectionTitle}>Where Is Contactless Not Accepted in Japan?</h2>
          <p className={styles.bodyText}>
            At JR East ticket gates for credit cards specifically, and — for every kind of card — at small
            independent restaurants, temple and shrine admissions, market and street-food stalls, coin lockers
            and many local buses.
          </p>
          <p className={styles.bodyText}>
            Two of those are worth planning around rather than discovering. Coin lockers are the one that
            catches people on arrival day with luggage; and temple entries are usually a few hundred yen each,
            which adds up over a Kyoto itinerary. Both want coins, not a card.
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
            for working out whether a pass beats tapping per journey on your own itinerary.
          </p>
        </section>

        {/* Klook: the things a tap at a gate cannot buy */}
        <KlookTripPrep
          heading="Book These Before You Fly"
          intro="These are the rows above that a ticket gate cannot sell you — a reserved seat, a timed entry, a pass that stops counting. Each one is bought in your own currency before you leave:"
          items={contactlessTripPrep}
        />

        {/* How to get Suica steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Getting started</span>
          <h2 className={styles.sectionTitle}>How Do You Get and Top Up an IC Card?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
            Either load Suica onto your phone before you fly, or buy a card on arrival — then top it up with
            cash or a card at any station machine. Four steps, start to finish.
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
                <p className={styles.relatedTitle}>Tokyo Airport Limousine Bus (2026): Routes, Fares &amp; Booking</p>
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
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): What Actually Works?</p>
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
