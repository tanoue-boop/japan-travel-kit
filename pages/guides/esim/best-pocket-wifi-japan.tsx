import Head from "next/head";
import Link from "next/link";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import StarRating from "../../../components/StarRating";
import styles from "../../../styles/BestEsimJapan.module.css";
import cardStyles from "../../../styles/SIMCardCard.module.css";
import KlookLink from "../../../components/KlookLink";
import { pricesCheckedLabel, siteCheapestFrom } from "../../../lib/esim-prices";
import { pocketWifi, pocketWifis, specsCheckedAt } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";

// Rental specs for the two Klook products come from lib/pocket-wifi.ts (what each Klook
// listing states). Klook prices are deliberately NOT shown on this page (site rule since
// 2026-11: Klook prices are per-locale and drift) — only prices printed on a company's own
// site are, with the date they were read. eSIM prices come from data/esim-prices.json.
// "Router or eSIM" in depth belongs to pocket-wifi-vs-esim-japan; this page answers it in
// one paragraph and links there.
const AIRPORT = pocketWifi("ninja-wifi");
const HOTEL = pocketWifi("hotel-delivery");
const ESIM_FROM = siteCheapestFrom();
const pricesCheckedAt = pricesCheckedLabel();

const badgeColorMap: Record<string, string> = {
  "bg-blue-500": cardStyles.badgeBlue,
  "bg-green-500": cardStyles.badgeGreen,
  "bg-orange-500": cardStyles.badgeOrange,
};

// Sakura Mobile is its own affiliate programme (10%), not Klook's.
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
const SAKURA_REL = "sponsored noopener noreferrer nofollow";

/** Date the official rental pages below were read. */
const OFFICIAL_CHECKED = "2026-11-11";
const SAKURA_SRC = "https://www.sakuramobile.jp/travel/wifi/";
const JW_SRC = "https://www.japan-wireless.com/";
const JW_RATES_SRC = "https://www.japan-wireless.com/en/rates";

/**
 * Sakura Mobile travel pocket WiFi, as sakuramobile.jp/travel/wifi/ printed it on
 * 2026-11-11: unlimited data on docomo 4G/LTE, up to 15 connections, 20-hour battery,
 * pickup at Narita, Haneda, Kansai and Fukuoka airports or delivery to a hotel, home or
 * post office, return by prepaid envelope in any Japan Post box. Totals per rental length
 * are the page's own figures; JPY only.
 */
const SAKURA_PRICES: { days: number; yen: number }[] = [
  { days: 5, yen: 7500 },
  { days: 7, yen: 9900 },
  { days: 10, yen: 13500 },
  { days: 14, yen: 18300 },
  { days: 30, yen: 37500 },
];
const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const SAKURA_7 = yen(9900);

/** One row per option for the main comparison table. First row is the recommendation. */
const compareRows = [
  {
    name: "Sakura Mobile",
    verdict: "Our pick: most devices, longest battery",
    price: `${SAKURA_7} for 7 days`,
    data: "Unlimited · docomo 4G/LTE",
    devices: "Up to 15",
    battery: "20 hours",
    pickup: "Narita, Haneda, Kansai or Fukuoka airport; or hotel, home or post office delivery",
    ret: "Prepaid envelope, any Japan Post box",
    source: "sakuramobile.jp",
  },
  {
    name: "Japan Wireless",
    verdict: "No fair-usage policy stated",
    price: "From US$4.7 a day (site headline)",
    data: "Unlimited, no daily limit · SoftBank 4G",
    devices: "Up to 8",
    battery: "8–10 hours",
    pickup: "Narita, Haneda, Kansai, Chubu Centrair, Fukuoka or New Chitose airport; or hotel delivery",
    ret: "Prepaid envelope in a post box",
    source: "japan-wireless.com",
  },
  {
    name: AIRPORT.name,
    verdict: "Airport counter, most booked on Klook",
    price: "See current price on Klook",
    data: `${AIRPORT.data} · ${AIRPORT.network}`,
    devices: `Up to ${AIRPORT.maxDevices}`,
    battery: AIRPORT.batteryHours,
    pickup: "Airport counter (Narita, Haneda, Kansai, Chubu, New Chitose, Fukuoka, Naha and others)",
    ret: AIRPORT.returnBy,
    source: "Klook listing",
  },
  {
    name: HOTEL.name,
    verdict: "Hotel delivery booked through Klook",
    price: "See current price on Klook",
    data: `${HOTEL.data} · ${HOTEL.network}`,
    devices: `Up to ${HOTEL.maxDevices}`,
    battery: HOTEL.batteryHours,
    pickup: "Hotel delivery in Tokyo, Osaka, Nagoya, Fukuoka and Hokkaido only",
    ret: HOTEL.returnBy,
    source: "Klook listing",
  },
  {
    name: "eSIM (for comparison)",
    verdict: "Better for one person",
    price: `From ${ESIM_FROM}`,
    data: "Depends on plan; unlimited plans exist",
    devices: "The phone it is installed on (hotspot varies by plan)",
    battery: "Uses your phone's battery",
    pickup: "Nothing to collect — QR code by email",
    ret: "Nothing to return",
    source: "data/esim-prices",
  },
];

/** Who rents at the three main gateways, off each airport's own listing. */
const AIRPORTS_CHECKED = "6 Nov 2026";
const counterRows = [
  { airport: "Narita", who: "J WiFi & Mobile, XCom Global, Telecomsquare, JAL ABC, AnyFone Japan, SoftBank Global Rental", hours: "Most 07:00–21:00" },
  { airport: "Haneda Terminal 3", who: "Mobile Center, AnyFone Japan, plus a 24-hour unmanned WiFi rental in front of Mobile Center", hours: "Counters 06:00–23:00" },
  { airport: "Kansai Terminal 1", who: "Global WiFi, Telecom Square, Sakura Mobile", hours: "06:00–23:00" },
];

const faqItems = [
  {
    q: "What is the best pocket WiFi in Japan?",
    a: `On published specs, Sakura Mobile: unlimited data on docomo, up to 15 connected devices, a 20-hour battery and ${SAKURA_7} for 7 days, returned in a prepaid envelope at any Japan Post box (sakuramobile.jp, read ${OFFICIAL_CHECKED}). Japan Wireless allows up to 8 devices with no fair-usage policy, and ${AIRPORT.name} is the airport-counter option at up to ${AIRPORT.maxDevices} devices.`,
  },
  {
    q: "How much does pocket WiFi cost in Japan?",
    a: `Sakura Mobile's own price list is ${yen(7500)} for 5 days, ${SAKURA_7} for 7 days, ${yen(13500)} for 10 days and ${yen(18300)} for 14 days; Japan Wireless advertises from US$4.7 a day (both read ${OFFICIAL_CHECKED}). The cost is per router, not per person, so a group of three or four splits it.`,
  },
  {
    q: "Can I rent pocket WiFi at the airport without booking?",
    a: `Sometimes, but do not plan on it. Kansai Airport's listing for Telecom Square says same-day rental without a reservation is possible only when in stock, and counters close overnight: most at Narita run 07:00–21:00. Airport listings read on ${AIRPORTS_CHECKED}.`,
  },
  {
    q: "How many devices can connect to a pocket WiFi in Japan?",
    a: `It depends on the router: Sakura Mobile states up to 15, the hotel-delivery router on Klook up to ${HOTEL.maxDevices}, Japan Wireless up to 8 and ${AIRPORT.name} up to ${AIRPORT.maxDevices}. Count devices, not people — a couple with two phones, a tablet and a laptop is already four.`,
  },
  {
    q: "Is a pocket WiFi or an eSIM better for Japan?",
    a: `For one person, an eSIM: Japan plans start from ${ESIM_FROM} (checked ${pricesCheckedAt}) and there is nothing to collect, charge or return. A pocket WiFi wins when three or more people or devices share it, or when a laptop, tablet or a phone that cannot take an eSIM needs to get online.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/best-pocket-wifi-japan") } });

// Owns "pocket WiFi Japan" / "best pocket WiFi Japan" (which router to rent). /wifi-pocket
// has 301'd here since 2026-10-19; "router or eSIM" stays with pocket-wifi-vs-esim-japan.
// 2026-11-11 (R07): title/H1/meta lead with the exact query and official Sakura Mobile specs.
const TITLE = "Best Pocket WiFi Japan 2026: Prices, Devices, Pickup";
const HEADLINE = "Best Pocket WiFi Japan (2026): Prices, Devices & Pickup Compared";
const DESCRIPTION =
  "Best pocket WiFi Japan: Sakura Mobile has unlimited docomo data, 15 devices, a 20h battery, ¥9,900 for 7 days. Who should rent one, who needs an eSIM.";

export default function BestPocketWifiJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/best-pocket-wifi-japan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/best-pocket-wifi-japan" />
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
              route: "/guides/esim/best-pocket-wifi-japan",
              headline: HEADLINE,
              updated,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: "/guides/esim/best-pocket-wifi-japan",
              name: "Sakura Mobile Japan pocket WiFi rental (7 days)",
              description: "Unlimited data on docomo 4G/LTE, up to 15 devices, 20-hour battery, airport pickup or hotel delivery, return by prepaid envelope. Price is the 7-day rental as listed on sakuramobile.jp.",
              brand: "Sakura Mobile",
              currency: "JPY",
              lowPrice: 9900,
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
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Best Pocket WiFi in Japan", item: "https://www.japan-travel-kit.com/guides/esim/best-pocket-wifi-japan" },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Best Pocket WiFi</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best Pocket WiFi Japan (2026):<br />Prices, Devices &amp; Pickup Compared
          </h1>
          <p className={styles.heroSubtitle}>
            The best pocket WiFi in Japan on published specs is Sakura Mobile: unlimited docomo
            data, up to 15 devices, a 20-hour battery and {SAKURA_7} for 7 days, posted back in a
            prepaid envelope. Rent a pocket WiFi if three or more people or devices will share it;
            buy an eSIM (from {ESIM_FROM}) if you travel alone, because one phone gets nothing from
            a shared router. For pickup at an airport counter, {AIRPORT.name} allows up to{" "}
            {AIRPORT.maxDevices} devices.
          </p>
          <div className={styles.heroBadges}>
            {[`Official specs checked ${OFFICIAL_CHECKED}`, `Klook listings read ${specsCheckedAt}`, "All options unlimited data"].map((t) => (
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
            This doesn&apos;t affect our review or verdict.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <EsimPageAnswer route="/guides/esim/best-pocket-wifi-japan" />

        {/* Main comparison — first row is the recommendation */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Which Pocket WiFi Is Best in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Sakura Mobile is the best pocket WiFi for most groups in Japan, because it connects up
            to 15 devices and its battery is rated at 20 hours — the two limits that actually bind.
            Every option below sells unlimited data, so compare devices, battery, pickup and return
            instead of the network.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Best for", "Price", "Data · network", "Devices", "Battery", "Pickup", "Return"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider}>{row.name}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.data}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.devices}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.battery}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pickup}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.ret}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Last checked: {OFFICIAL_CHECKED}. Sources:{" "}
            <a href={SAKURA_SRC} target="_blank" rel="noopener noreferrer nofollow">Sakura Mobile pocket WiFi</a>,{" "}
            <a href={JW_SRC} target="_blank" rel="noopener noreferrer nofollow">Japan Wireless</a> and{" "}
            <a href={JW_RATES_SRC} target="_blank" rel="noopener noreferrer nofollow">its rates page</a>{" "}
            (official sites, read {OFFICIAL_CHECKED}); the {AIRPORT.name} and hotel-delivery rows are what
            their Klook listings state (read {specsCheckedAt}) — {AIRPORT.name}&apos;s own site could not be
            read. Klook prices change by date and currency, so check them on the listing. eSIM price from
            our daily price check ({pricesCheckedAt}).
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <a href={SAKURA_URL} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              Check Sakura Mobile pocket WiFi →
            </a>
            <KlookLink href={AIRPORT.affiliateUrl} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              {AIRPORT.ctaText} →
            </KlookLink>
          </div>
        </section>

        {/* Quick Answer */}
        <section className={styles.choiceSection}>
          <span className={styles.sectionLabel}>Quick Answer</span>
          <h2 className={styles.sectionTitle}>Airport Pickup or Hotel Delivery?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            Pick up at the airport if you want data before you leave arrivals; take hotel delivery
            if your flight lands late or you would rather post the router back than queue. The
            two Klook rentals split exactly that way. Both run unlimited data on {AIRPORT.network},
            both are rated at {AIRPORT.batteryHours} of battery and both include a power bank.{" "}
            {AIRPORT.name} is collected at an airport counter and allows up to {AIRPORT.maxDevices}{" "}
            devices; the hotel-delivery rental allows up to {HOTEL.maxDevices}, but nothing meets you
            at arrivals. Sakura Mobile and Japan Wireless offer both routes — airport pickup or
            hotel delivery — with a post-box return. Klook listings read {specsCheckedAt}.
          </p>
          <div className={styles.choiceGrid}>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderSim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 16h20l-8-5V4a2 2 0 0 0-4 0v7z" />
                    <path d="M6 20h12" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Airport pickup if…</p>
                  <p className={styles.choiceCardSubtitle}>{AIRPORT.name}</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> You want data before you leave arrivals</li>
                  <li><span className={styles.choiceCheck}>✓</span> {AIRPORT.maxDevices} devices is enough</li>
                  <li><span className={styles.choiceCheck}>✓</span> You fly out of a Japanese airport with a counter</li>
                  <li><span className={styles.choiceCheck}>✓</span> You are not staying in one of the five delivery regions</li>
                </ul>
                <KlookLink
                  href={AIRPORT.affiliateUrl}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ marginTop: "1rem", display: "inline-flex" }}
                >
                  {AIRPORT.ctaText} →
                </KlookLink>
              </div>
            </div>
            <div className={styles.choiceCard}>
              <div className={`${styles.choiceCardHeader} ${styles.choiceCardHeaderEsim}`}>
                <div className={styles.choiceCardIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                    <path d="M9 21v-7h6v7" />
                  </svg>
                </div>
                <div>
                  <p className={styles.choiceCardTitle}>Hotel delivery if…</p>
                  <p className={styles.choiceCardSubtitle}>{HOTEL.name}</p>
                </div>
              </div>
              <div className={styles.choiceCardBody}>
                <ul className={styles.choiceList}>
                  <li><span className={styles.choiceCheck}>✓</span> You need up to {HOTEL.maxDevices} devices connected</li>
                  <li><span className={styles.choiceCheck}>✓</span> You stay in Tokyo, Osaka, Nagoya, Fukuoka or Hokkaido</li>
                  <li><span className={styles.choiceCheck}>✓</span> You would rather post it back than queue</li>
                  <li><span className={styles.choiceCheck}>✓</span> Your flight lands late or leaves early</li>
                </ul>
                <KlookLink
                  href={HOTEL.affiliateUrl}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ marginTop: "1rem", display: "inline-flex" }}
                >
                  {HOTEL.ctaText} →
                </KlookLink>
              </div>
            </div>
          </div>
        </section>

        {/* Prices — official price list only (no Klook prices on this page) */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Does Pocket WiFi Cost in Japan?</h2>
          <p className={styles.bodyText}>
            A week of pocket WiFi from Sakura Mobile costs {SAKURA_7}, and two weeks cost{" "}
            {yen(18300)}, on its own price list. That is one price for the router, not per person:
            the total is the same whether one phone uses it or 15 devices do, which is the whole
            economic case for renting one — the break-even headcount is worked out in our{" "}
            <Link href="/guides/esim/japan-esim-family-group" style={{ color: "var(--accent)", fontWeight: 600 }}>
              family and group guide
            </Link>
            .
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Rental length", "Sakura Mobile total", "Works out per day", "Split 3 ways"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAKURA_PRICES.map((p) => (
                    <tr key={p.days}>
                      <td className={styles.tdProvider}>{p.days} days{p.days === 7 ? " (most common)" : ""}</td>
                      <td className={styles.tdPrice}>{yen(p.yen)}</td>
                      <td>{yen(Math.round(p.yen / p.days))}</td>
                      <td>{yen(Math.round(p.yen / 3))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Last checked: {OFFICIAL_CHECKED}. Source:{" "}
            <a href={SAKURA_SRC} target="_blank" rel="noopener noreferrer nofollow">sakuramobile.jp/travel/wifi/</a>{" "}
            (totals as listed; payment in JPY only; 10% off when renting two or more devices). Per-day
            and per-person columns are our division of those totals. Japan Wireless advertises
            from US$4.7 a day on{" "}
            <a href={JW_SRC} target="_blank" rel="noopener noreferrer nofollow">japan-wireless.com</a>{" "}
            and lists a ¥40,000 charge for a lost router and SIM without its cover plan (
            <a href={JW_RATES_SRC} target="_blank" rel="noopener noreferrer nofollow">rates page</a>
            , read {OFFICIAL_CHECKED}) — check any company&apos;s loss and damage terms before you decline cover.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <a href={SAKURA_URL} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              Book Sakura Mobile pocket WiFi →
            </a>
            <KlookLink href={HOTEL.affiliateUrl} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              {HOTEL.ctaText} →
            </KlookLink>
          </div>
        </section>

        {/* Pickup and return */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Pickup &amp; return</span>
          <h2 className={styles.sectionTitle}>Where Do You Pick Up and Return Pocket WiFi in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            You pick up pocket WiFi at an airport counter or have it delivered to your hotel, and
            you return it either at the counter or by dropping a prepaid envelope in a Japan Post box.
            Sakura Mobile lists pickup at Narita, Haneda, Kansai and Fukuoka airports plus hotel,
            home or post-office delivery, with a post-box return; {AIRPORT.name} is counter-only both
            ways. This is the part travellers under-plan.
          </p>
          <div className={styles.stepsList}>
            {[
              {
                title: "Book before you fly, not on arrival",
                desc: "A hotel delivery has to arrive before you do, and a walk-up rental at an airport counter depends on what is in stock. Sakura Mobile lets you change the pickup or delivery date up to 3 days before pickup. None of these is something to sort out in the arrivals hall.",
              },
              {
                title: `Airport counter — ${AIRPORT.name}`,
                desc: "The listing covers all of Japan's international airports. Klook's counter sheet for it names Narita Terminals 1 and 2, Haneda, Kansai Terminal 1, Chubu Centrair, New Chitose, Fukuoka, Naha, Komatsu, Kagoshima, Shizuoka and Asahikawa. You walk out of arrivals already online.",
              },
              {
                title: "Hotel delivery — five regions only",
                desc: "The delivery rental covers hotels in Tokyo, Osaka, Nagoya, Fukuoka and Hokkaido. Outside those, it is not an option, and inside them you are offline between landing and check-in — worth an eSIM on your own phone as a stopgap if your first day starts at the airport.",
              },
              {
                title: "Returning at a counter",
                desc: `${AIRPORT.name} goes back where you collected it, so your departure has to leave time for the counter. Check its hours against a red-eye or a 6am flight before you book.`,
              },
              {
                title: "Returning by post",
                desc: "The delivery rental ships with a prepaid return envelope that goes into any Japan Post box. You can post it on your last morning and travel to the airport with nothing to hand over — the single most underrated feature in this category.",
              },
              {
                title: "Charge it like a phone, not like a gadget",
                desc: `Both listings rate the battery at ${AIRPORT.batteryHours}, which is a full sightseeing day only if you start at 100%. Both include a power bank, so use it — the router going flat takes every device on it offline at once.`,
              },
            ].map((step, i) => (
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

        {/* The wider market, for readers searching by airport or by company. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At the airport</span>
          <h2 className={styles.sectionTitle}>Who Rents Pocket WiFi at Japanese Airports?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Airport", "Counters listed", "Hours"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {counterRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.airport}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From the airports&apos; own service listings, read on {AIRPORTS_CHECKED}; the Narita page carries no
            update date, so check a counter&apos;s hours against your flight. All are before security, so a return at
            the counter has to come before you go through. For prepaid SIM cards at the same airports, see our{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" style={{ color: "var(--accent)", fontWeight: 600 }}>
              airport SIM card guide
            </Link>.
          </p>
        </section>

        {/* Choosing on devices, battery, data */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How to choose</span>
          <h2 className={styles.sectionTitle}>How Many Devices Can Connect, and How Long Does the Battery Last?</h2>
          <p className={styles.bodyText}>
            Japan pocket WiFi rentals connect between {AIRPORT.maxDevices} and 15 devices and are
            rated for 8 to 20 hours of battery, depending on the company. Sakura Mobile states 15
            devices and 20 hours; Japan Wireless 8 devices and 8–10 hours; the two Klook rentals{" "}
            {AIRPORT.maxDevices} and {HOTEL.maxDevices} devices on {AIRPORT.batteryHours}.
          </p>
          <p className={styles.bodyText}>
            <strong>Count devices, not people.</strong> &ldquo;Up to 10 devices&rdquo; is repeated so
            often about Japan rentals that it is treated as a constant, and it is not. A couple
            travelling with two phones, a tablet and a laptop is already at four, and a family of
            four is usually at six or seven. If your count is near a router&apos;s limit, book one
            with more headroom.
          </p>
          <p className={styles.bodyText}>
            <strong>Treat battery as a planning constraint.</strong> A rated figure is a best case,
            and a router being used as a hotspot by four phones does not hit its best case. The two
            Klook rentals and Japan Wireless include a power bank, which helps only if you carry it
            and a cable.
          </p>
          <p className={styles.bodyText}>
            <strong>Data is where there is nothing to decide.</strong> Every option on this page sells
            unlimited data — Sakura Mobile on docomo, the others on {AIRPORT.network}. Network is not
            a differentiator in this market — all three Japanese carriers cover the tourist route
            well — so any rental comparison that leads on &ldquo;nationwide 4G coverage&rdquo; is
            selling you something every rental already has. Compare the device limit, the collection
            method and the price instead.
          </p>
        </section>

        {/* The two rentals */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>The rentals</span>
          <h2 className={styles.sectionTitle}>The Two Klook Rentals in Full</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            Ratings and review counts below are Klook&apos;s, shown on the listing each card links
            to, read on {specsCheckedAt}. Prices change with dates and currency, so check the
            current price on the listing.
          </p>
          <div className={styles.picksList}>
            {pocketWifis.map((item) => {
              const badgeCls = badgeColorMap[item.badgeColor] ?? cardStyles.badgeBlue;
              return (
                <article key={item.id} id={item.id} className={cardStyles.card}>
                  <div className={cardStyles.header}>
                    <div className={cardStyles.nameBlock}>
                      <div className={cardStyles.badgeRow}>
                        <span className={`${cardStyles.badge} ${badgeCls}`}>{item.badge}</span>
                      </div>
                      <h3 className={cardStyles.name}>{item.name}</h3>
                      <StarRating rating={item.rating} />
                      <p className={cardStyles.summary}>
                        Listed on Klook as &ldquo;{item.klookTitle}&rdquo; · {item.reviews} reviews ·{" "}
                        {item.bookings} booked
                      </p>
                    </div>
                  </div>

                  <div className={cardStyles.specs}>
                    <div>
                      <p className={cardStyles.specLabel}>Devices</p>
                      <p className={cardStyles.specValue}>Up to {item.maxDevices}</p>
                    </div>
                    <div>
                      <p className={cardStyles.specLabel}>Collect</p>
                      <p className={cardStyles.specValue}>{item.collect}</p>
                    </div>
                    <div>
                      <p className={cardStyles.specLabel}>Return</p>
                      <p className={cardStyles.specValue}>{item.returnBy}</p>
                    </div>
                    <div>
                      <p className={cardStyles.specLabel}>Network</p>
                      <p className={cardStyles.specValue}>{item.network}</p>
                    </div>
                    <div>
                      <p className={cardStyles.specLabel}>Data</p>
                      <p className={cardStyles.specValue}>{item.data}</p>
                    </div>
                    <div>
                      <p className={cardStyles.specLabel}>Battery</p>
                      <p className={cardStyles.specValue}>{item.batteryHours}</p>
                    </div>
                  </div>

                  <div className={cardStyles.proscons}>
                    <div>
                      <p className={`${cardStyles.pcLabel} ${cardStyles.prosLabel}`}>✓ Pros</p>
                      <ul className={cardStyles.pcList}>
                        {item.pros.map((p) => (
                          <li key={p} className={cardStyles.pcItem}>
                            <span className={cardStyles.iconPro}>+</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className={`${cardStyles.pcLabel} ${cardStyles.consLabel}`}>✗ Cons</p>
                      <ul className={cardStyles.pcList}>
                        {item.cons.map((c) => (
                          <li key={c} className={cardStyles.pcItem}>
                            <span className={cardStyles.iconCon}>−</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={cardStyles.cta}>
                    <KlookLink
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={cardStyles.ctaBtn}
                    >
                      {item.ctaText}
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </KlookLink>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* When an eSIM is the better buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The other option</span>
          <h2 className={styles.sectionTitle}>Pocket WiFi or eSIM: Which Should You Get?</h2>
          <p className={styles.bodyText}>
            Get a pocket WiFi if three or more people or devices will share one connection; get an
            eSIM if you travel alone or with one other phone. A router is a flat cost shared
            across any number of devices; an eSIM is a per-person cost with no hardware at all.
            Japan eSIM plans start from {ESIM_FROM} (checked {pricesCheckedAt}), which undercuts
            even a short rental for one person — and a solo traveller gets nothing from a limit of{" "}
            {HOTEL.maxDevices} devices.
          </p>
          <p className={styles.bodyText}>
            Rent the router when the cost is genuinely shared — three or more people, a family with
            tablets, a work trip with a laptop — or when somebody in the party has a handset that
            cannot take an eSIM. Buy an eSIM when you are travelling alone, when you are moving
            between people rather than with them, or when you simply do not want a second device to
            charge and return. If you have not made that call yet, our{" "}
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Pocket WiFi vs eSIM comparison
            </Link>{" "}
            puts the two side by side on price and convenience, and{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Best eSIM for Japan
            </Link>{" "}
            names the provider to buy if you land on that side of it. If the handset that cannot take
            an eSIM belongs to you, our{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>{" "}
            covers a company that sells a physical travel SIM card, an eSIM and a pocket WiFi
            rental side by side; for common eSIM advice checked against current prices, see the{" "}
            <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--accent)", fontWeight: 600 }}>
              best eSIM for Japan Reddit check
            </Link>
            . Not sure your phone can take one? See{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              does an eSIM work in Japan
            </Link>
            ; and for where the connection matters most on a route, our{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary" style={{ color: "var(--accent)", fontWeight: 600 }}>
              10-day Japan itinerary
            </Link>{" "}
            plans the days.
          </p>
          <p className={styles.bodyText}>
            There is also a middle option nobody advertises, because it sells two products instead
            of one: a router for the group plus a cheap eSIM on one phone. It costs a few dollars
            more and it removes the two failure modes that actually ruin a day — being offline
            between landing and hotel check-in, and the router going flat with everybody on it.
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
            <Link href="/guides/esim/japan-sim-card-working-holiday" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan SIM Card for Working Holiday: Plans &amp; Rules</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-home-internet-for-foreigners" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10l9-7 9 7" />
                  <path d="M5 9v11h14V9" />
                  <path d="M10 20v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Home Internet for Foreigners: Prices &amp; Setup</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="18" height="12" rx="2" />
                  <path d="M19 9h2v6h-2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Pocket WiFi vs eSIM for Japan (2026): Which Is Better?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/japan-esim-family-group" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan eSIM for Family &amp; Group Travel: Where the Break-Even Falls</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Still deciding between a router and an eSIM?</h2>
            <p className={styles.ctaBannerDesc}>
              One flat cost shared by the group, or a cheaper plan per person with nothing to carry.
              The comparison runs both numbers.
            </p>
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" className={styles.ctaBannerBtn}>
              Pocket WiFi vs eSIM →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
