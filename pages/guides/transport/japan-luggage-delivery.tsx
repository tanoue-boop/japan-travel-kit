import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  hanedaLimousineBus,
  kansaiAirportLuggageDelivery,
  kantoKansaiLuggageDelivery,
  luggageDeliveryTripPrep,
  naritaLimousineBus,
  osakaKyotoHotelLuggageDelivery,
  tokyoHotelAirportLuggageDelivery,
  tokyoLuggAgentDelivery,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Japan luggage delivery, added 21 Nov 2026 (task-jtk-20261121-02). Klook's report for
 * 21 Nov had two US bookings of the Tokyo hotel ⇄ airport luggage service and the site had
 * no page on luggage forwarding, so this is it.
 *
 * Every figure below was read on 21 Nov 2026 by node fetch:
 *  - Airport TA-Q-BIN (Yamato): drop off by two days before departure (three in some
 *    areas), delivered to the airport by the day before, collected at the counter on the
 *    day; 30 kg limit; rates include the ¥660 airport fee, one way, one parcel, tax in;
 *    some convenience stores refuse parcels over size 180; size table (60–200):
 *    kuronekoyamato.co.jp/ytc/en/send/services/airport/ — the cash rates themselves come
 *    from the JSON that page's calculator loads (/assets/inc/json/services-calc06.json):
 *    Kanto → Narita / Haneda and Kansai → Kansai Airport ¥2,510 (120), ¥3,170 (160),
 *    ¥4,380 (200); Kanto → Kansai Airport ¥3,290 (160)
 *  - ordinary TA-Q-BIN, Kanto → Kansai ¥1,970 (120), ¥2,630 (160), ¥4,390 (200); Kanto →
 *    Chugoku (Hiroshima) ¥2,770 (160): the calculator JSON behind
 *    kuronekoyamato.co.jp/ytc/en/send/services/takkyubin/ (services-calc01.json)
 *  - same-day examples, 160 size: Haneda → Tokyo 23 wards ¥5,780, Kyoto Station → Kyoto
 *    city ¥3,470: kuronekoyamato.co.jp/ytc/en/send/services/same-day-delivery/
 *  - Narita counters, floors, hours, same-day windows: narita-airport.jp/en/service/delivery/baggage/
 *  - Haneda counters: tokyo-haneda.com/en/service/facilities/delivery.html
 *  - Kansai Airport counters, and no counter in Terminal 2: kansai-airport.or.jp/en/service/delivery/delivery-service
 *  - shinkansen oversized baggage, 161–250 cm needs a reserved seat with an oversized
 *    baggage area, over 250 cm not carried: global.jr-central.co.jp/en/info/oversized-baggage/
 *  - Klook listing terms (hotel drop-off by 9:00 for same-day, ready at the airport after
 *    16:00, 180 cm / 30 kg per bag; LuggAgent airport hand-over 9:00–18:00, delivered by
 *    21:00; LuggAgent Kansai hotel hand-over by 11:00): Klook's listings as shown in the
 *    www.klook.com search index on the same day. No Klook price is printed.
 */
const CHECKED_ISO = "2026-11-21";
const CHECKED = checkedLabel(CHECKED_ISO);

const YAMATO_AIRPORT_URL = "https://www.kuronekoyamato.co.jp/ytc/en/send/services/airport/";
const YAMATO_RATES_URL = "https://www.kuronekoyamato.co.jp/ytc/en/send/services/takkyubin/";
const YAMATO_SAMEDAY_URL = "https://www.kuronekoyamato.co.jp/ytc/en/send/services/same-day-delivery/";
const NARITA_URL = "https://www.narita-airport.jp/en/service/delivery/baggage/";
const HANEDA_URL = "https://tokyo-haneda.com/en/service/facilities/delivery.html";
const KIX_URL = "https://www.kansai-airport.or.jp/en/service/delivery/delivery-service";
const JRC_BAGGAGE_URL = "https://global.jr-central.co.jp/en/info/oversized-baggage/";

const AIR_120 = "¥2,510";
const AIR_160 = "¥3,170";
const AIR_200 = "¥4,380";
const AIRPORT_FEE = "¥660";
const TK_120 = "¥1,970";
const TK_160 = "¥2,630";

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

// (1) Method × deadline × price × where you collect. Row 1 is the answer.
const methodRows: ReactNode[][] = [
  [
    "Short answer",
    "Airport: 2 days before your flight (3 in some areas)",
    `${AIR_160} for a size-160 case, Tokyo → Narita / Haneda`,
    "The courier's counter on the departure floor",
  ],
  [
    "Hotel front desk → airport (Yamato TA-Q-BIN or Sagawa, if the hotel handles it)",
    "Hand in by 2 days before departure; the hotel's own cut-off can be earlier",
    `${AIR_120} (size 120) · ${AIR_160} (160) · ${AIR_200} (200), cash, ${AIRPORT_FEE} airport fee included`,
    "Courier counter at your departure airport, on the day",
  ],
  [
    "Convenience store → airport (Yamato)",
    "Same 2-day rule; the store hands it to Yamato",
    "Same rates; some stores refuse parcels over size 180",
    "Courier counter at your departure airport",
  ],
  [
    "Airport counter → hotel, on arrival",
    "Same day only from the morning windows below; otherwise it arrives later",
    "Haneda → Tokyo 23 wards, same day: ¥5,780 (size 160, Yamato example)",
    "Your hotel's front desk",
  ],
  [
    "Hotel → hotel, Tokyo → Kyoto or Osaka (TA-Q-BIN)",
    "Ask the counter for the delivery date; plan on not having the case that night",
    `${TK_120} (size 120) · ${TK_160} (160), cash`,
    "The next hotel's front desk",
  ],
  [
    "Klook: Tokyo hotel ⇄ Narita / Haneda (Airporter)",
    "Same day: at the hotel by 9:00; ready at the airport after 16:00",
    "Booked per bag in advance — open the listing for your date",
    "The airport counter named on the voucher",
  ],
  [
    "Klook: Tokyo-area hotel → Osaka-area hotel, same day (LuggAgent)",
    "Booked in advance; hand-over time on the listing",
    "Booked per bag — open the listing for your date",
    "The Osaka-area hotel's front desk, same evening",
  ],
];

// (2) Where you collect a bag you sent to the airport.
const counterRows: ReactNode[][] = [
  ["Short answer", "Departure floor, before security — Yamato, JAL ABC or Sagawa, whichever the slip names", "Kansai Airport Terminal 2 has no counter: collect in Terminal 1"],
  ["Narita T1 North Wing", "4F: Yamato and JAL ABC, 07:00–21:00", "Arrivals 1F: Yamato 06:30–22:30, JAL ABC, Sagawa (same-day orders 06:30–14:00)"],
  ["Narita T1 South Wing", "4F: Yamato, JAL ABC and Sagawa, 07:00–21:00", "Arrivals 1F: Yamato 06:30–22:30, JAL ABC"],
  ["Narita T2", "3F: Yamato and JAL ABC, 07:00–21:00", "Arrivals 1F: Yamato 06:30–22:30, JAL ABC, Sagawa"],
  ["Narita T3", "1F: Yamato, 06:30–22:30", "No same-day hotel delivery from T3"],
  ["Haneda T3 (international)", "3F Departure Lobby: JAL ABC, 24 hours · 2F: Yamato, 6:00–23:00", "Arrivals 2F: Yamato 5:00–23:00, JAL ABC 4:00–25:00"],
  ["Haneda T2 (international area)", "3F International Departure Lobby: Yamato 5:45–23:00, JAL ABC 6:15–23:00", "2F International Arrival Lobby: Yamato 5:45–23:00, JAL ABC 6:15–22:00"],
  ["Haneda T1 / T2 domestic", "1F: Yamato 7:00–21:00, Sagawa 7:00–20:00", "Same counters send bags out"],
  ["Kansai Airport T1", "4F: Yamato (north) 6:30–22:30, JAL ABC (south) 06:30–23:00; Sagawa, Aeroplaza 2F, 8:00–21:00", "Send from 1F: Yamato 6:30–22:30, JAL ABC 06:30–22:30"],
  ["Kansai Airport T2", "No counter — collect on T1 4F", "—"],
];

const faqItems = [
  {
    q: "How does luggage delivery work in Japan?",
    a: `You hand the case to a courier — Yamato Transport's TA-Q-BIN (takkyubin), Sagawa or JAL ABC — at a hotel front desk, a convenience store or a courier counter, fill in a waybill with the address, and pay by size. To an airport, Yamato asks for the bag two days before your flight (three in some areas); it is at the airport the day before and you collect it at the counter on departure day. Rates from Tokyo to Narita or Haneda are ${AIR_120} for size 120, ${AIR_160} for 160 and ${AIR_200} for 200 in cash, ${AIRPORT_FEE} airport fee included. Checked ${CHECKED}.`,
  },
  {
    q: "How much does it cost to send luggage to the airport?",
    a: `With Yamato, from anywhere in the Tokyo area to Narita or Haneda: ${AIR_120} for a size-120 parcel (up to 120 cm added up and 15 kg), ${AIR_160} for size 160 (160 cm, 25 kg) and ${AIR_200} for size 200 (200 cm, 30 kg), cash, one way, tax and the ${AIRPORT_FEE} airport fee included. The same three prices apply from Kansai to Kansai Airport. Parcels over 30 kg are not accepted. Cashless payment is slightly cheaper. Checked on Yamato's own rate calculator ${CHECKED}.`,
  },
  {
    q: "How early should you send luggage to Narita or Haneda?",
    a: "Two days before your departure date, or three in some areas, by the sending deadline of the counter you use — that is Yamato's rule for Airport TA-Q-BIN. A hotel can set an earlier cut-off of its own, so ask at the desk the day you arrive. If you are leaving tomorrow, the same-day hotel-to-airport services sold on Klook are the option: the Airporter listing needs the bag at the hotel by 9:00 and has it at the airport after 16:00.",
  },
  {
    q: "Can you send luggage from Tokyo to Kyoto?",
    a: `Yes. Ordinary TA-Q-BIN from the Tokyo area to Kansai is ${TK_120} for size 120 and ${TK_160} for size 160 in cash, and it goes to the next hotel's front desk. The delivery date depends on the two addresses, so ask the counter and plan to be without the case for a night. For the same day, LuggAgent sells a Kanto-to-Kansai hotel-to-hotel service on Klook. Either way you skip the shinkansen rule for bags over 160 cm, which need a reserved seat with an oversized baggage area.`,
  },
  {
    q: "Do hotels in Japan forward luggage?",
    a: "It depends on the hotel, so ask at check-in. Where the front desk handles TA-Q-BIN or Sagawa, staff take the case, help with the waybill and hand it to the courier; it is the hotel's service, with the hotel's own cut-off. Where it does not, a convenience store or a Yamato sales office takes the same parcel at the same rate (Yamato issues waybills at both), and a booked service such as Airporter or LuggAgent collects from the hotel desk.",
  },
  {
    q: "Can I send luggage from the airport to my hotel on arrival?",
    a: "Yes, from the arrivals-floor counters at Narita, Haneda and Kansai Airport. Same-day delivery has a morning window: at Narita, Yamato's same-day service runs 06:30–10:30 from Terminals 1 and 2 and Sagawa takes same-day orders 06:30–14:00 for 10 Tokyo wards and selected Urayasu hotels. Yamato's example price from Haneda to the 23 wards is ¥5,780 for a size-160 case. Later than that, the bag arrives the next day.",
  },
  {
    q: "What is takkyubin?",
    a: "Takkyubin (宅急便, TA-Q-BIN) is Yamato Transport's door-to-door parcel service, and the word Japanese travellers use for sending luggage ahead in general. The price is set by parcel size (length + width + height) and the distance between regions, not by the number of bags in a booking.",
  },
  {
    q: "Where do I pick up luggage I sent to the airport?",
    a: "At the counter of the company on your slip, on the departure floor before security: Narita T1 4F and T2 3F, Haneda T3 3F Departure Lobby (JAL ABC) or 2F (Yamato), and Kansai Airport T1 4F. Kansai Airport Terminal 2 has no counter, so Terminal 2 passengers collect in Terminal 1. For a flight before 7:00 at Narita, contact the delivery company in advance.",
  },
];

// The primary query leads the title, H1 and description word for word.
const TITLE = "Japan Luggage Delivery 2026: Takkyubin Prices & Deadlines";
const DESCRIPTION =
  "Japan Luggage Delivery: luggage forwarding Japan by takkyubin from ¥2,510, how to send luggage to airport Tokyo 2 days ahead, and each airport's counter.";
const ROUTE = "/guides/transport/japan-luggage-delivery";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={styles.tableWrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={c === 0 ? styles.tdProvider : undefined}
                    style={c === 0 ? (r === 0 ? { fontWeight: 700 } : undefined) : { fontSize: "0.88rem", fontWeight: r === 0 ? 700 : undefined }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Source({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function JapanLuggageDeliveryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`https://www.japan-travel-kit.com${ROUTE}`} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={`https://www.japan-travel-kit.com${ROUTE}`} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Japan Luggage Delivery", item: `https://www.japan-travel-kit.com${ROUTE}` },
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Japan Luggage Delivery</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Luggage Delivery (2026): <br />Takkyubin Prices, Deadlines &amp; Airport Counters
          </h1>
          <p className={styles.heroSubtitle}>
            Luggage forwarding in Japan, from the couriers&apos; own rate tables: how to send luggage to the airport
            in Tokyo or Osaka, how far ahead, what it costs by size, and where you pick it up.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Yamato's own rates", "Narita, Haneda & KIX counters"].map((t) => (
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

        {/* The answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Japan luggage delivery</strong> works like this: you hand your case to a courier —{" "}
            <strong>Yamato&apos;s TA-Q-BIN (takkyubin)</strong>, Sagawa or JAL ABC — at the hotel front desk, a
            convenience store or a courier counter, and collect it somewhere else. To send luggage to the airport,
            Yamato needs it <strong>two days before your flight</strong> (three in some areas), and from anywhere
            in the Tokyo area to Narita or Haneda it costs <strong>{AIR_120} for a size-120 case, {AIR_160} for size
            160 and {AIR_200} for size 200</strong> in cash, the {AIRPORT_FEE} airport fee included; the price is
            size × distance, so Kansai to Kansai Airport is the same. The flat per-bag services sold on Klook
            (Airporter, LuggAgent) run <strong>the same day</strong> instead: bag at the Tokyo hotel by 9:00, ready
            at the airport after 16:00. Yamato&apos;s figures were checked on its own rate tables on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Moving between cities rather than flying out? A case over 160 cm (length + width + height) needs a
            reserved seat with an oversized baggage area on the Tokaido and Sanyo Shinkansen — the{" "}
            <Link href="/guides/transport/shinkansen-guide" style={linkStyle}>
              shinkansen guide
            </Link>{" "}
            covers that booking — or you send the case ahead and ride with a day pack.
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
                <p className={styles.verdictStatLabel}>Send to the airport</p>
                <p className={styles.verdictStatValue}>2 days before</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Size-160 case, Tokyo → NRT / HND</p>
                <p className={styles.verdictStatValue}>{AIR_160}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tokyo → Kyoto hotel, size 160</p>
                <p className={styles.verdictStatValue}>{TK_160}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Weight limit (Yamato)</p>
                <p className={styles.verdictStatValue}>30 kg</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              Two or more days before you fly, the hotel desk and Yamato are the cheap route. Leaving tomorrow, or
              want the bag gone the same morning? Book a same-day hotel-to-airport service before you arrive — the
              cut-off is early.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={tokyoHotelAirportLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Tokyo hotel ⇄ airport delivery →
              </KlookLink>
              <KlookLink href={kantoKansaiLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Tokyo → Osaka same day →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book on the same trip"
          heading="What Should You Book with Your Luggage Delivery?"
          intro="The delivery itself, the hotel it goes to, data for the tracking page, and the airport ride you take without the case. Klook prices change by date, so open a listing for the figure on your days."
          items={luggageDeliveryTripPrep}
        />

        <EsimCtaTop />

        {/* (1) Methods */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The options</span>
          <h2 className={styles.sectionTitle}>How Does Luggage Delivery Work in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            You choose where to hand the bag in and where it should wait for you; the courier charges by size and by
            the two regions. The first four rows are Yamato&apos;s own rates and rules, the last two are booked
            services with a per-bag price fixed when you book.
          </p>
          <Table head={["Method", "Deadline", "Price (Yamato, cash, one way)", "Where you collect it"]} rows={methodRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} — <Source href={YAMATO_AIRPORT_URL}>Yamato Airport TA-Q-BIN</Source>,{" "}
            <Source href={YAMATO_RATES_URL}>Yamato TA-Q-BIN rates</Source>,{" "}
            <Source href={YAMATO_SAMEDAY_URL}>Yamato Same-day Delivery Service</Source>. Size is length + width +
            height: size 120 is up to 120 cm and 15 kg, 160 up to 160 cm and 25 kg, 180 and 200 up to 30 kg; no side
            may exceed 170 cm. Cashless payment is a little cheaper than the cash prices shown. The Klook rows are
            the listings&apos; own terms on the same day.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoHotelAirportLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check Tokyo hotel ⇄ Narita / Haneda →
            </KlookLink>
            <KlookLink href={tokyoLuggAgentDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Staying in an Airbnb? LuggAgent Tokyo →
            </KlookLink>
          </div>
        </section>

        {/* Cost */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Does It Cost to Send Luggage to the Airport?</h2>
          <p className={styles.bodyText}>
            {AIR_160} for a typical large suitcase (size 160) from Tokyo to Narita or Haneda with Yamato, cash, one
            way — {AIR_120} for a medium case (size 120) and {AIR_200} for the largest (size 200). Those prices
            already include the {AIRPORT_FEE} airport fee, and the same three apply from Osaka or Kyoto to Kansai
            Airport. Sending across regions costs more: a size-160 case from Tokyo to Kansai Airport is ¥3,290.
            Each bag is priced on its own, so two cases are two fees.
          </p>
          <p className={styles.bodyText}>
            A same-day service costs more than the two-day rate — Yamato&apos;s own same-day example, Haneda to a
            hotel in the 23 wards, is ¥5,780 for size 160 — and the booked services on Klook are priced per bag on
            the listing. What you are paying for is time: the bag leaves the morning you check out.
          </p>
        </section>

        {/* Timing */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>How Early Should You Send Luggage to Narita or Haneda?</h2>
          <p className={styles.bodyText}>
            Two days before your departure date — three in some areas — by the counter&apos;s sending deadline.
            Flying on Saturday means handing the case in on Thursday, and living out of a day bag for two nights. The
            bag reaches the airport the day before you fly and waits at the courier&apos;s counter. A hotel that
            handles the courier sets its own collection time, so ask on arrival rather than on the last evening.
          </p>
          <p className={styles.bodyText}>
            If two days is too long, the same-day route is a booked service: the Airporter listing on Klook takes the
            bag at a Tokyo hotel by 9:00 and has it at Narita or Haneda after 16:00, which suits an evening flight.
            For a morning flight, keep the bag and book the ride instead — the{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={linkStyle}>
              Tokyo airport transfer guide
            </Link>{" "}
            compares the N&apos;EX, the Skyliner and the limousine bus, which puts up to two bags in the hold.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={naritaLimousineBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Narita limousine bus →
            </KlookLink>
            <KlookLink href={hanedaLimousineBus.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Haneda limousine bus →
            </KlookLink>
          </div>
        </section>

        {/* (2) Airport counters */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At the airport</span>
          <h2 className={styles.sectionTitle}>Where Do You Pick Up Luggage at Narita, Haneda and Kansai Airport?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            At the counter of the company printed on your slip, on the departure floor before security. Allow time to
            queue before check-in, and at Kansai Airport remember that Terminal 2 has no counter at all.
          </p>
          <Table head={["Airport / terminal", "Collect (sent to the airport)", "Send out on arrival"]} rows={counterRows} />
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} — <Source href={NARITA_URL}>Narita Airport, baggage delivery</Source>,{" "}
            <Source href={HANEDA_URL}>Haneda Airport, home delivery</Source>,{" "}
            <Source href={KIX_URL}>Kansai Airport, carriers</Source>. At Narita, Yamato&apos;s same-day service from
            the arrivals counters runs 06:30–10:30 (06:30–09:50 at T3), and for a flight leaving before 7:00 the
            airport asks you to contact your delivery company in advance. JAL ABC at Kansai Airport asks for a phone
            reservation three or four days before departure.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaKyotoHotelLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Osaka / Kyoto hotel → Kansai Airport →
            </KlookLink>
            <KlookLink href={kansaiAirportLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Kansai Airport ⇄ Osaka hotel →
            </KlookLink>
          </div>
        </section>

        <BookingEsimCard lead="A bag travelling without you comes with a tracking number and a hotel address in Japanese — both are on your phone the day it moves." />

        {/* Tokyo → Kyoto */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Between cities</span>
          <h2 className={styles.sectionTitle}>Can You Send Luggage from Tokyo to Kyoto?</h2>
          <p className={styles.bodyText}>
            Yes — ordinary TA-Q-BIN from the Tokyo area to Kansai is {TK_120} for size 120 and {TK_160} for size 160
            in cash, delivered to the next hotel&apos;s front desk; Tokyo to Hiroshima is ¥2,770 for size 160. Ask the
            counter for the delivery date for your two addresses and pack an overnight bag. The alternative is to
            take the case on the train: on the{" "}
            <Link href="/guides/transport/tokyo-to-osaka-shinkansen" style={linkStyle}>
              Tokyo to Osaka shinkansen
            </Link>{" "}
            and the Tokyo–Kyoto Nozomi, a case of 161–250 cm needs a reserved seat with an oversized baggage area,
            and anything over 250 cm is not carried (JR Central, checked {CHECKED}).
          </p>
          <p className={styles.bodyText}>
            For the same day, LuggAgent&apos;s Kanto-to-Kansai service on Klook carries the case hotel to hotel while
            you ride. In Kyoto, Yamato&apos;s same-day example from the Kyoto Station counter to a hotel in the city is
            ¥3,470 for size 160.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kantoKansaiLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check same-day Tokyo → Osaka delivery →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {CHECKED_ISO} — <Source href={YAMATO_RATES_URL}>Yamato TA-Q-BIN rates</Source>,{" "}
            <Source href={YAMATO_SAMEDAY_URL}>Yamato Same-day Delivery Service</Source>,{" "}
            <Source href={JRC_BAGGAGE_URL}>JR Central, oversized baggage</Source>.
          </p>
        </section>

        {/* Hotels */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hotels</span>
          <h2 className={styles.sectionTitle}>Do Hotels in Japan Forward Luggage?</h2>
          <p className={styles.bodyText}>
            It depends on the hotel, so ask at check-in. Where the front desk handles TA-Q-BIN or Sagawa, staff take
            the case, help with the waybill and keep it until the courier collects, by the hotel&apos;s own cut-off.
            Where it does not, a convenience store takes the same Yamato parcel at the same price — some stores
            cannot take anything over size 180 — and a booked service such as Airporter or LuggAgent picks up from
            the front desk.
          </p>
          <p className={styles.bodyText}>
            Ski trips are the other case where sending ahead pays: Yamato runs a separate Ski TA-Q-BIN for boards
            and boots — the{" "}
            <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>
              Japan ski trip itinerary
            </Link>{" "}
            covers the rest of that week. Arriving in Kansai instead, the{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={linkStyle}>
              Osaka airport transfer guide
            </Link>{" "}
            covers the HARUKA and the Rapi:t from Kansai Airport, and{" "}
            <Link href="/guides/transport/kansai-airport-to-kyoto" style={linkStyle}>Kansai Airport to Kyoto</Link>{" "}
            compares the HARUKA with the limousine bus, which takes cases in the hold.
          </p>
        </section>

        <KlookTourPicks
          heading="Luggage Services on Klook"
          intro="Booked per bag with the price fixed at checkout. Open a listing for the current price and the hand-in time on your date."
          tours={[tokyoHotelAirportLuggageDelivery, tokyoLuggAgentDelivery, kantoKansaiLuggageDelivery, osakaKyotoHotelLuggageDelivery, kansaiAirportLuggageDelivery]}
        />

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Japan Luggage Delivery FAQ</h2>
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
            {[
              ["/guides/transport/tokyo-airport-transfer", "Tokyo Airport Transfer Guide (2026): Narita & Haneda to the City"],
              ["/guides/transport/osaka-airport-transfer", "Osaka Airport Transfer Guide (2026): KIX & ITM to the City"],
              ["/guides/transport/shinkansen-guide", "Shinkansen Guide 2026: Tickets, Passes & Tips for First-Timers"],
              ["/guides/transport/tokyo-to-osaka-shinkansen", "Tokyo to Osaka Shinkansen 2026: Price, Time & Tickets"],
              ["/guides/transport/tokyo-airport-limousine-bus", "Airport Limousine Bus Tokyo 2026: Fares, Times & Booking"],
              ["/guides/attractions/where-to-stay-in-tokyo", "Where to Stay in Tokyo 2026: Best Areas by Trip Type"],
              ["/guides/transport", "More Transport Guides →"],
            ].map(([href, title]) => (
              <Link key={href} href={href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="7" width="12" height="13" rx="2" />
                    <path d="M9 7V4h6v3" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Send the case, keep the day</h2>
            <p className={styles.ctaBannerDesc}>
              Two days ahead, Yamato&apos;s rates are the cheapest route. For the same day, book the bag before you
              arrive — the Airporter listing wants it at the hotel by 9:00.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={tokyoHotelAirportLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Tokyo hotel ⇄ airport →
              </KlookLink>
              <KlookLink href={osakaKyotoHotelLuggageDelivery.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Osaka / Kyoto → Kansai Airport →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
