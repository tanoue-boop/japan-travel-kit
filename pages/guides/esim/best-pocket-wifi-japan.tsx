import Head from "next/head";
import Link from "next/link";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import StarRating from "../../../components/StarRating";
import styles from "../../../styles/BestEsimJapan.module.css";
import cardStyles from "../../../styles/SIMCardCard.module.css";
import KlookLink from "../../../components/KlookLink";
import { cheapestUnlimited, formatUsd, pricesCheckedLabel } from "../../../lib/esim-prices";
import { pocketWifi, pocketWifis, specsCheckedAt } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import { EsimCtaTop } from "../../../components/EsimCta";
import BookingEsimCard from "../../../components/BookingEsimCard";
import { klookEsim } from "../../../lib/klook-links";
import { KLOOK_ESIM_FROM } from "../../../lib/klook-esim-facts";
import { ESIM_PLACEMENT, pageTag } from "../../../lib/esim-placement";
import { simbyeTrackedUrl } from "../../../lib/simbye";

// Rental specs for the two Klook products come from lib/pocket-wifi.ts (what each Klook
// listing states). Klook rental prices are deliberately NOT shown on this page (site rule
// since 2026-11: Klook prices are per-locale and drift) — only prices printed on a
// company's own site are, with the date they were read. eSIM prices come from
// data/esim-prices.json; the Klook eSIM figure is its listing's from-price only.
// "Router or eSIM" in depth belongs to pocket-wifi-vs-esim-japan; this page answers it in
// one short section and links there with the "pocket WiFi vs eSIM" anchor.
const ROUTE = "/guides/esim/best-pocket-wifi-japan";
const TAG = pageTag(ROUTE);
const AIRPORT = pocketWifi("ninja-wifi");
const HOTEL = pocketWifi("hotel-delivery");
const pricesCheckedAt = pricesCheckedLabel();
/** Simbye's cheapest unlimited plan of at least 7 days (list and code price from the daily feed). */
const SIMBYE_WEEK = cheapestUnlimited("simbye", 7);
const SIMBYE_WEEK_PRICE = SIMBYE_WEEK ? formatUsd(SIMBYE_WEEK.discountedUsd ?? SIMBYE_WEEK.priceUsd) : "—";
const SIMBYE_WEEK_DAYS = SIMBYE_WEEK?.days ?? 7;
const SIMBYE_URL = simbyeTrackedUrl(ESIM_PLACEMENT.brandCompare, TAG);

const badgeColorMap: Record<string, string> = {
  "bg-blue-500": cardStyles.badgeBlue,
  "bg-green-500": cardStyles.badgeGreen,
  "bg-orange-500": cardStyles.badgeOrange,
};

// Sakura Mobile is its own affiliate programme (10%), not Klook's.
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";
const SAKURA_REL = "sponsored noopener noreferrer nofollow";

/** Date the official rental pages below were read (Sakura Mobile, Japan Wireless, Ninja WiFi). */
const OFFICIAL_CHECKED = "2026-11-27";
const SAKURA_SRC = "https://www.sakuramobile.jp/travel/wifi/";
const SAKURA_FUP_SRC =
  "https://support.sakuramobile.jp/hc/en-us/articles/29139634752921--Travel-Pocket-WiFi-I-am-confused-about-unlimited-data-What-does-unlimited-data-service-mean";
const JW_SRC = "https://www.japan-wireless.com/";
const JW_RATES_SRC = "https://www.japan-wireless.com/en/rates";
/**
 * Ninja WiFi's own site refuses automated page loads (HTTP 403), so its plan and pickup
 * pages were read through the search index of ninjawifi.com on 2026-11-27: Infinite
 * Unlimited (SoftBank) ¥1,980 a day tax included, 10GB-a-day plan ¥1,320, 5G unlimited
 * (docomo) ¥2,200; "unlimited plans" may be suspended temporarily above 15GB a day
 * (home page); counter pickup free; Haneda Terminal 3 counter 06:30–23:00 (2F), Kansai
 * Terminal 1 06:30–22:30; the Narita Terminal 3 counter is listed as temporarily closed.
 */
const NINJA_CHECKED = "2026-11-27";
const NINJA_PLAN_SRC = "https://ninjawifi.com/en/plan";
const NINJA_HOME_SRC = "https://ninjawifi.com/en";
const NINJA_PICKUP_SRC = "https://ninjawifi.com/en/receive/airport.html";

/**
 * Sakura Mobile travel pocket WiFi, as sakuramobile.jp/travel/wifi/ priced it on
 * 2026-11-27 (its price simulator, pricing3.1.js): the regular prices ¥7,500 / ¥9,900 /
 * ¥18,300 are now struck through and the long-term discount brings 5 days to ¥6,380, 7
 * days to ¥7,780 and 14 days to ¥10,560 before tax. `yen` below is the tax-included
 * figure the page prints beside each. Unlimited data on docomo 4G/LTE, up to 15
 * connections, 20-hour battery, pickup at Narita, Haneda, Kansai or Fukuoka airport or
 * delivery to a hotel, home or post office, return by prepaid envelope in any Japan Post
 * box by midnight on the return date. JPY only.
 */
const SAKURA_PRICES: { days: number; yen: number; regular: number }[] = [
  { days: 5, yen: 7018, regular: 7500 },
  { days: 7, yen: 8558, regular: 9900 },
  { days: 14, yen: 11616, regular: 18300 },
];
const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const perDay = (p: { days: number; yen: number }) => yen(Math.round(p.yen / p.days));
const SAKURA_5 = yen(SAKURA_PRICES[0].yen);
const SAKURA_7 = yen(SAKURA_PRICES[1].yen);
const SAKURA_14 = yen(SAKURA_PRICES[2].yen);
/** Sakura Mobile per-day cost, 14-day and 5-day rentals (its own totals ÷ days). */
const SAKURA_DAY_LOW = perDay(SAKURA_PRICES[2]);
const SAKURA_DAY_HIGH = perDay(SAKURA_PRICES[0]);
const NINJA_DAY = yen(1980);
/** Japan Wireless: site headline and the 14-day estimate its rates page printed (taxes included). */
const JW_FROM = "US$4.68";
const JW_14 = "US$88.95";

/** One row per option for the main comparison table. First row is the conclusion. */
const compareRows = [
  {
    name: "Sakura Mobile",
    verdict: "Cheapest per day for a group: 15 devices, 20-hour battery",
    price: `${SAKURA_DAY_LOW}–${SAKURA_DAY_HIGH} a day (${SAKURA_7} for 7 days, tax incl.)`,
    data: "Unlimited · docomo 4G/LTE · 10GB a day guaranteed at high speed",
    devices: "Up to 15",
    pickup: "Narita, Haneda, Kansai or Fukuoka airport; or hotel, home or post office delivery",
    ret: "Prepaid envelope, any Japan Post box",
    href: SAKURA_URL,
    kind: "sakura" as const,
  },
  {
    name: `${AIRPORT.name} (Klook WiFi)`,
    verdict: "Airport counter pickup, most booked on Klook",
    price: `${NINJA_DAY} a day on its own site; Klook price on the listing`,
    data: `${AIRPORT.data} · ${AIRPORT.network}`,
    devices: `Up to ${AIRPORT.maxDevices}`,
    pickup: "Airport counter (Narita, Haneda, Kansai, Chubu, New Chitose, Fukuoka, Naha and others)",
    ret: AIRPORT.returnBy,
    href: AIRPORT.affiliateUrl,
    kind: "klook" as const,
  },
  {
    name: `${HOTEL.name} (Klook WiFi)`,
    verdict: "Waiting at your hotel, posted back",
    price: "See current price on Klook",
    data: `${HOTEL.data} · ${HOTEL.network}`,
    devices: `Up to ${HOTEL.maxDevices}`,
    pickup: "Hotel delivery in Tokyo, Osaka, Nagoya, Fukuoka and Hokkaido only",
    ret: HOTEL.returnBy,
    href: HOTEL.affiliateUrl,
    kind: "klook" as const,
  },
  {
    name: "Japan Wireless",
    verdict: "No fair-usage policy stated",
    price: `From ${JW_FROM} a day (${JW_14} for 14 days, taxes incl.)`,
    data: "Unlimited, no daily cap · SoftBank 4G",
    devices: "Up to 8",
    pickup: "Narita, Haneda or Kansai airport counter; or hotel delivery",
    ret: "Prepaid envelope in a post box by noon the day after the rental ends",
    href: JW_RATES_SRC,
    kind: "official" as const,
  },
  {
    name: "Klook eSIM (no router)",
    verdict: "Solo traveller: cheaper than any router",
    price: `From ${KLOOK_ESIM_FROM} (Klook's from-price; plan not stated)`,
    data: "Unlimited plans: high speed up to 10GB a day · SoftBank 5G / IIJ (Docomo)",
    devices: "1 phone (tethering allowed)",
    pickup: "QR code by email, before you fly",
    ret: "Nothing to return",
    href: klookEsim.url,
    kind: "klook" as const,
  },
  {
    name: "Simbye eSIM (no router)",
    verdict: "Cheapest unlimited eSIM for a week",
    price: `${SIMBYE_WEEK_PRICE} for ${SIMBYE_WEEK_DAYS} days unlimited, with our code`,
    data: "Unlimited: 2GB a day at full speed, then 1 Mbps · all four networks",
    devices: "1 phone (tethering allowed)",
    pickup: "QR code by email, before you fly",
    ret: "Nothing to return",
    href: SIMBYE_URL,
    kind: "simbye" as const,
  },
];

/** What "unlimited" means at each company, in its own words. First row is the conclusion. */
const unlimitedRows = [
  { name: "Japan Wireless", rule: "No fair-usage policy, no daily cap and no throttling; it credits the rental if policy throttling ever happens", src: JW_RATES_SRC, srcLabel: "japan-wireless.com/en/rates" },
  { name: "Sakura Mobile", rule: "10GB a day guaranteed at high speed; above that the speed may drop, and the allowance resets at midnight", src: SAKURA_FUP_SRC, srcLabel: "Sakura Mobile support" },
  { name: "Ninja WiFi", rule: "Unlimited plans may be suspended temporarily above 15GB in a day; the 10GB-a-day plan (¥1,320) slows after 10GB", src: NINJA_HOME_SRC, srcLabel: "ninjawifi.com" },
  { name: "Simbye eSIM", rule: "2GB a day at full speed, then unlimited at 1 Mbps", src: SIMBYE_URL, srcLabel: "Simbye Japan eSIM" },
  { name: "Klook eSIM", rule: "Unlimited plans run at high speed up to 10GB a day", src: klookEsim.url, srcLabel: "Klook listing (read 6 Nov 2026)" },
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
    q: "Do I need WiFi in Japan in 2026?",
    a: `You need mobile data for maps, train routes and translation, but not necessarily a pocket WiFi: a solo traveller is better served by an eSIM, from ${KLOOK_ESIM_FROM} on Klook or ${SIMBYE_WEEK_PRICE} for ${SIMBYE_WEEK_DAYS} days of unlimited data on Simbye (checked ${pricesCheckedAt}). A pocket WiFi pays off when three or more people or devices share it — Sakura Mobile's router is ${SAKURA_7} for 7 days in total, tax included, for up to 15 devices (sakuramobile.jp, ${OFFICIAL_CHECKED}).`,
  },
  {
    q: "How much is pocket WiFi in Japan?",
    a: `About ${SAKURA_DAY_LOW} to ${NINJA_DAY} a day for unlimited data. Sakura Mobile charges ${SAKURA_5} for 5 days, ${SAKURA_7} for 7 and ${SAKURA_14} for 14 (tax included, ${SAKURA_DAY_LOW}–${SAKURA_DAY_HIGH} a day), Ninja WiFi lists ${NINJA_DAY} a day for its Infinite Unlimited plan, and Japan Wireless advertises from ${JW_FROM} a day (all on the companies' own sites, ${OFFICIAL_CHECKED}). The price is per router, not per person.`,
  },
  {
    q: "Where do I pick up pocket WiFi at Narita or Haneda?",
    a: `At the rental company's counter in the arrivals area, booked before you fly. Ninja WiFi's Haneda counter is on the 2nd floor of Terminal 3 (06:30–23:00) and its Kansai counter in the Terminal 1 arrivals lobby (06:30–22:30); its Narita Terminal 3 counter is listed as temporarily closed (ninjawifi.com, ${NINJA_CHECKED}). Sakura Mobile and Japan Wireless also hand routers over at Narita, Haneda and Kansai, or deliver to your hotel.`,
  },
  {
    q: "Is unlimited pocket WiFi really unlimited?",
    a: `Not always. Japan Wireless states no fair-usage policy and no throttling; Sakura Mobile guarantees 10GB a day at high speed and may slow the router above that; Ninja WiFi says its unlimited plans may be suspended temporarily above 15GB in a day (each company's own site, ${OFFICIAL_CHECKED}). The limit matters most when several people stream or run a laptop on one router.`,
  },
  {
    q: "Is pocket WiFi or eSIM better for Japan?",
    a: `For one or two people, an eSIM: Simbye's ${SIMBYE_WEEK_DAYS}-day unlimited plan is ${SIMBYE_WEEK_PRICE} with our code (checked ${pricesCheckedAt}) against ${SAKURA_7} for a 7-day Sakura Mobile router, and there is nothing to collect, charge or return. A pocket WiFi is better when three or more people or devices share it, or when a phone cannot take an eSIM.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

// Owns "pocket WiFi Japan" / "Japan WiFi rental" (rental prices, which router to rent).
// /wifi-pocket has 301'd here since 2026-10-19; "router or eSIM" stays with
// pocket-wifi-vs-esim-japan, which links here for the per-day rental prices.
// 2026-11-11 (R07): title/H1/meta lead with the exact query and official Sakura Mobile specs.
// 2026-11-18 (R05): title leads with per-day rental prices; H1 adds "Japan WiFi rental".
// 2026-11-27 (R02): "Pocket WiFi Rental in Japan (2026): Prices Compared", the shape the
// top results use; brand dropped from the title to stay within 60 characters.
const TITLE = "Pocket WiFi Rental in Japan (2026): Prices Compared";
const HEADLINE = "Pocket WiFi Rental in Japan (2026): Prices Compared";
const DESCRIPTION =
  "Pocket WiFi Japan price: a rental costs ¥830–¥1,980 a day. Pick up at Narita, Haneda or Kansai or get hotel delivery. Solo? A Klook eSIM costs less.";

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
              description: "Unlimited data on docomo 4G/LTE, up to 15 devices, 20-hour battery, airport pickup or hotel delivery, return by prepaid envelope. Price is the 7-day rental, tax included, as listed on sakuramobile.jp.",
              brand: "Sakura Mobile",
              currency: "JPY",
              lowPrice: SAKURA_PRICES[1].yen,
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
                { "@type": "ListItem", position: 4, name: "Pocket WiFi Rental in Japan", item: "https://www.japan-travel-kit.com/guides/esim/best-pocket-wifi-japan" },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Pocket WiFi Rental in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Pocket WiFi Rental in Japan (2026): <br />Prices Compared
          </h1>
          <p className={styles.heroSubtitle}>
            Unlimited-data routers from Sakura Mobile, Japan Wireless and Ninja WiFi (on Klook),
            compared on price per day, devices, airport pickup and return — with the eSIM a solo
            traveller should buy instead.
          </p>
          <div className={styles.heroBadges}>
            {[`Official prices checked ${OFFICIAL_CHECKED}`, `Klook listings read ${specsCheckedAt}`, "All options unlimited data"].map((t) => (
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

        {/* Lead answer: price per day, pickup/return, router or eSIM — in numbers */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A pocket WiFi rental in Japan costs about {SAKURA_DAY_LOW} to {NINJA_DAY} a day for
            unlimited data: Sakura Mobile charges {SAKURA_7} for 7 days and {SAKURA_14} for 14 days,
            tax included, Ninja WiFi lists {NINJA_DAY} a day for its unlimited plan and Japan Wireless
            starts from {JW_FROM} a day (each company&apos;s own site, checked {OFFICIAL_CHECKED}). You
            collect the router at an airport counter at Narita, Haneda or Kansai, or have it delivered
            to your hotel, and return it at the counter or in a prepaid envelope in any Japan Post box.
            Travelling alone, a Klook eSIM (from {KLOOK_ESIM_FROM}) or Simbye&apos;s {SIMBYE_WEEK_DAYS}-day
            unlimited eSIM at {SIMBYE_WEEK_PRICE} costs less than the {SAKURA_7} a 7-day router does,
            and there is nothing to pick up or return.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <KlookLink href={AIRPORT.affiliateUrl} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Book Klook WiFi: airport pickup →
            </KlookLink>
            <KlookLink href={HOTEL.affiliateUrl} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Book Klook WiFi: hotel delivery →
            </KlookLink>
            <KlookLink href={klookEsim.url} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              Solo? Check Klook eSIM →
            </KlookLink>
          </div>
        </section>

        <EsimPageAnswer route={ROUTE} />

        {/* Main comparison — first row is the conclusion */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Which Pocket WiFi Rental in Japan Is Cheapest?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Sakura Mobile is the cheapest pocket WiFi rental per day for a group in Japan: {SAKURA_DAY_LOW}–
            {SAKURA_DAY_HIGH} a day, tax included, for up to 15 devices. For one phone, either eSIM in the
            last two rows costs less than any router.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Company", "Best for", "Price per day", "Data · network", "Devices", "Pickup", "Return", ""].map((h, i) => (
                      <th key={h || `c${i}`}>{h}</th>
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
                      <td style={{ fontSize: "0.88rem" }}>{row.pickup}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.ret}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>
                        {row.kind === "klook" ? (
                          <KlookLink href={row.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)", fontWeight: 600 }}>
                            Klook →
                          </KlookLink>
                        ) : row.kind === "official" ? (
                          <a href={row.href} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)", fontWeight: 600 }}>
                            Official site →
                          </a>
                        ) : (
                          <a href={row.href} target="_blank" rel={SAKURA_REL} style={{ color: "var(--accent)", fontWeight: 600 }}>
                            {row.kind === "sakura" ? "Sakura Mobile →" : "Simbye →"}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Last checked: {OFFICIAL_CHECKED}. Sources:{" "}
            <a href={SAKURA_SRC} target="_blank" rel="noopener noreferrer nofollow">Sakura Mobile pocket WiFi</a>{" "}
            (price simulator, long-term discount applied) and{" "}
            <a href={SAKURA_FUP_SRC} target="_blank" rel="noopener noreferrer nofollow">its unlimited-data FAQ</a>,{" "}
            <a href={JW_SRC} target="_blank" rel="noopener noreferrer nofollow">Japan Wireless</a> and{" "}
            <a href={JW_RATES_SRC} target="_blank" rel="noopener noreferrer nofollow">its rates page</a>,{" "}
            <a href={NINJA_PLAN_SRC} target="_blank" rel="noopener noreferrer nofollow">Ninja WiFi plans</a>. Sakura
            Mobile&apos;s per-day figures are its 14-day and 5-day tax-included totals divided by the days. Devices,
            pickup and return for the two Klook WiFi rows are what their Klook listings state (read {specsCheckedAt});
            Klook rental prices change by date and currency, so check them on the listing. The Klook eSIM figure is
            the listing&apos;s from-price (read 6 Nov 2026); the Simbye price is from our daily price check ({pricesCheckedAt}).
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <KlookLink href={AIRPORT.affiliateUrl} className={styles.pickCta} target="_blank" rel="noopener noreferrer nofollow">
              {AIRPORT.ctaText} →
            </KlookLink>
            <a href={SAKURA_URL} target="_blank" rel={SAKURA_REL} className={styles.pickCta}>
              Check Sakura Mobile pocket WiFi →
            </a>
          </div>
        </section>

        {/* Do I need it at all */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Do you need one?</span>
          <h2 className={styles.sectionTitle}>Do I Need WiFi in Japan in 2026?</h2>
          <p className={styles.bodyText}>
            You need mobile data in Japan for maps, train routes and translation, but a pocket WiFi only
            pays off when three or more people or devices share it. Free WiFi in stations, hotels and
            convenience stores does not cover the walk between them, so one or two travellers are better
            off with an eSIM on each phone and a group with a router it splits.
          </p>
        </section>

        <BookingEsimCard lead="Travelling alone or as a couple? One eSIM per phone is cheaper than a router and there is nothing to collect or return." />

        <EsimCtaTop />

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
          <h2 className={styles.sectionTitle}>How Much Is Pocket WiFi in Japan?</h2>
          <p className={styles.bodyText}>
            A week of pocket WiFi from Sakura Mobile costs {SAKURA_7} in total, 5 days cost{" "}
            {SAKURA_5} and two weeks cost {SAKURA_14}, tax included, on its own price list; Ninja WiFi&apos;s
            unlimited plan at {NINJA_DAY} a day comes to {yen(1980 * 7)} for a week, and Japan Wireless
            quotes {JW_14} for 14 days. That is one price for the router, not per person:
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
                    {["Rental length", "Sakura Mobile total (tax incl.)", "Per day", "Per person, 3 sharing", "Per person, 4 sharing", `Ninja WiFi at ${NINJA_DAY}/day`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[SAKURA_PRICES[1], SAKURA_PRICES[0], SAKURA_PRICES[2]].map((p) => (
                    <tr key={p.days}>
                      <td className={styles.tdProvider}>{p.days} days{p.days === 7 ? " (most common trip)" : ""}</td>
                      <td className={styles.tdPrice}>{yen(p.yen)}</td>
                      <td>{perDay(p)}</td>
                      <td>{yen(Math.round(p.yen / 3))}</td>
                      <td>{yen(Math.round(p.yen / 4))}</td>
                      <td>{yen(1980 * p.days)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Last checked: {OFFICIAL_CHECKED}. Source:{" "}
            <a href={SAKURA_SRC} target="_blank" rel="noopener noreferrer nofollow">sakuramobile.jp/travel/wifi/</a>{" "}
            (tax-included totals from its price simulator, after the long-term discount on regular prices of{" "}
            {SAKURA_PRICES.map((p) => `${yen(p.regular)} for ${p.days} days`).join(", ")} before tax; payment in
            JPY only; 10% off when renting two or more devices) and{" "}
            <a href={NINJA_PLAN_SRC} target="_blank" rel="noopener noreferrer nofollow">ninjawifi.com/en/plan</a>{" "}
            (Infinite Unlimited, SoftBank, {NINJA_DAY} a day tax included, checked {NINJA_CHECKED}; options
            cost extra). Per-day, per-person and Ninja WiFi totals are our arithmetic on those
            figures. Japan Wireless advertises
            from {JW_FROM} a day and printed {JW_14} for 14 days, taxes included, on{" "}
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
          <h2 className={styles.sectionTitle}>Where Do I Pick Up Pocket WiFi at Narita or Haneda?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            You pick up pocket WiFi at Narita or Haneda from the rental company&apos;s counter in arrivals,
            booked before you fly, or have it delivered to your hotel instead. Ninja WiFi&apos;s Haneda
            counter is on the 2nd floor of Terminal 3 (06:30–23:00) and its Kansai counter in the Terminal
            1 arrivals lobby (06:30–22:30), with free counter pickup; its Narita Terminal 3 counter is
            listed as temporarily closed (
            <a href={NINJA_PICKUP_SRC} target="_blank" rel="noopener noreferrer nofollow">ninjawifi.com airport counters</a>,
            checked {NINJA_CHECKED}). Sakura Mobile hands over at Narita, Haneda, Kansai and Fukuoka airports
            or delivers to a hotel, home or post office, with a post-box return by midnight on the return
            date; Japan Wireless has counters at Narita, Haneda and Kansai or delivers to your hotel (official
            sites, {OFFICIAL_CHECKED}).
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
            Last checked: 2026-11-06. From the airports&apos; own service listings (
            <a href="https://www.narita-airport.jp/en/" target="_blank" rel="noopener noreferrer nofollow">Narita</a>,{" "}
            <a href="https://tokyo-haneda.com/en/" target="_blank" rel="noopener noreferrer nofollow">Haneda</a>,{" "}
            <a href="https://www.kansai-airport.or.jp/en/" target="_blank" rel="noopener noreferrer nofollow">Kansai</a>
            ), read on {AIRPORTS_CHECKED}; the Narita page carries no
            update date, so check a counter&apos;s hours against your flight. All are before security, so a return at
            the counter has to come before you go through. For prepaid SIM cards at the same airports, see our{" "}
            <Link href="/guides/esim/japan-airport-sim-cards" style={{ color: "var(--accent)", fontWeight: 600 }}>
              SIM card at the airport guide
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
            <strong>Network matters less than the daily limit.</strong> Every rental on this page sells
            unlimited data — Sakura Mobile on docomo, the others on {AIRPORT.network} — but
            &ldquo;unlimited&rdquo; means something different at each company, as the next table shows.
          </p>
        </section>

        {/* What "unlimited" means */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Unlimited data</span>
          <h2 className={styles.sectionTitle}>Is Unlimited Pocket WiFi Really Unlimited?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Only at Japan Wireless, which states no fair-usage policy and no throttling; Sakura Mobile
            guarantees 10GB a day at high speed, and Ninja WiFi says its unlimited plans may be suspended
            temporarily above 15GB in a day. The limit matters most when several people stream, take video
            calls or run a laptop on one router all day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Company", "What “unlimited” means", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {unlimitedRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.name}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rule}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        {row.src.includes("klook.com") ? (
                          <KlookLink href={row.src} target="_blank" rel="noopener noreferrer nofollow">{row.srcLabel}</KlookLink>
                        ) : (
                          <a href={row.src} target="_blank" rel={row.src === SIMBYE_URL ? SAKURA_REL : "noopener noreferrer nofollow"}>{row.srcLabel}</a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Last checked: {OFFICIAL_CHECKED}. Sources:{" "}
            <a href={JW_RATES_SRC} target="_blank" rel="noopener noreferrer nofollow">Japan Wireless rates and FAQ</a>,{" "}
            <a href={SAKURA_FUP_SRC} target="_blank" rel="noopener noreferrer nofollow">Sakura Mobile unlimited-data FAQ</a>,{" "}
            <a href={NINJA_HOME_SRC} target="_blank" rel="noopener noreferrer nofollow">Ninja WiFi</a> (its pages
            give different thresholds for different plans, so check the plan you book). The Simbye rule is from our
            daily price feed ({pricesCheckedAt}); the Klook eSIM rule is from its listing (read 6 Nov 2026).
            Every eSIM plan&apos;s daily cap, network and hotspot limit is compared on the{" "}
            <Link href="/guides/esim/japan-esim-unlimited" style={{ color: "var(--accent)", fontWeight: 600 }}>unlimited data eSIM for Japan</Link>{" "}
            page.
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

        {/* Router or eSIM — short answer only; the full comparison lives on pocket-wifi-vs-esim-japan */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The other option</span>
          <h2 className={styles.sectionTitle}>Pocket WiFi or eSIM for Japan?</h2>
          <p className={styles.bodyText}>
            Get a pocket WiFi if three or more people or devices will share one connection; get an eSIM if
            you travel alone or as a couple with one phone each. A {SIMBYE_WEEK_DAYS}-day unlimited Simbye
            eSIM is {SIMBYE_WEEK_PRICE} with our code (checked {pricesCheckedAt}) against {SAKURA_7} for a
            7-day Sakura Mobile router, and an eSIM has nothing to collect, charge or return. The full{" "}
            <Link href="/guides/esim/pocket-wifi-vs-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              pocket WiFi vs eSIM
            </Link>{" "}
            comparison works through price by group size, battery and what happens when you split up.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <BookingEsimCard lead="One or two of you? An eSIM per phone:" />
          </div>
          <p className={styles.bodyText}>
            If you land on the eSIM side,{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Best eSIM for Japan
            </Link>{" "}
            names the provider to buy and the{" "}
            <Link href="/guides/esim/japan-esim-price-tracker" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Japan eSIM cost
            </Link>{" "}
            tracker gives an eSIM&apos;s price per day to set against a router&apos;s. Not sure your phone can
            take one? See{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              does an eSIM work in Japan
            </Link>
            ; if it cannot, the{" "}
            <Link href="/guides/esim/sakura-mobile-review" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Sakura Mobile review
            </Link>{" "}
            covers a company that sells a travel SIM card, an eSIM and a pocket WiFi side by side. Moving into a
            flat rather than touring? The monthly cost of a home router or fibre line is in{" "}
            <Link href="/guides/esim/japan-home-internet-for-foreigners" style={{ color: "var(--accent)", fontWeight: 600 }}>
              home internet in Japan for foreigners
            </Link>
            ; common eSIM advice is checked against current prices in the{" "}
            <Link href="/guides/esim/best-esim-japan-reddit" style={{ color: "var(--accent)", fontWeight: 600 }}>
              best eSIM for Japan Reddit check
            </Link>
            , and our{" "}
            <Link href="/guides/attractions/japan-10-day-itinerary" style={{ color: "var(--accent)", fontWeight: 600 }}>
              10-day Japan itinerary
            </Link>{" "}
            plans the days the connection has to cover.
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
