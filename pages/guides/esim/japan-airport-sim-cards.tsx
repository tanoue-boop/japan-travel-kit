import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import SimbyeOffer from "../../../components/SimbyeOffer";
import styles from "../../../styles/BestEsimJapan.module.css";
import { cheapestAtLeastGb, getProvider, plansFor, pricesCheckedLabel, siteCheapestFrom } from "../../../lib/esim-prices";
import { formatUsd } from "../../../lib/esim-prices";
import { klookEsim } from "../../../lib/klook-links";
import { pocketWifi } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import { EsimCtaTop } from "../../../components/EsimCta";

/**
 * Restored 6 Nov 2026 (jtk-20261106-A20). The URL had 301'd to best-esim-japan since the
 * 2026-10 consolidation but still drew 256 impressions at position 25 in the 28 days to
 * 3 Nov: "where do I buy a SIM at the airport" is not the question that guide answers.
 * The old page's unsourced prices and hours were not carried over.
 *
 * Every counter, floor and hour below is from the airport's own service listing:
 *   narita-airport.jp/en/service/internet/rental/                  carries no update date
 *   tokyo-haneda.com/en/service/facilities/cellular_phone_rental.html and its shop pages
 *   kansai-airport.or.jp/en/service/internet/rental-wifi-sim and its spot pages
 * Sakura Mobile's prices and pickup airports are off sakuramobile.jp/travel/.
 * All read on 6 Nov 2026. Vending-machine prices are published on none of these pages, so
 * none is printed.
 */
const CHECKED = "6 Nov 2026";
const ROUTE = "/guides/esim/japan-airport-sim-cards";
const SAKURA_URL = "https://p.sakuramobile.jp/idevaffiliate.php?id=486";

const pricesCheckedAt = pricesCheckedLabel();
const ESIM_FROM = siteCheapestFrom();
const SIMBYE_URL = getProvider("simbye").affiliateUrl;
const SIMBYE_10 = cheapestAtLeastGb("simbye", 10);
const SIMBYE_FIXED = plansFor("simbye").filter((p) => !p.unlimited);
const WIFI = pocketWifi("ninja-wifi");

const airportRows = [
  {
    airport: "Narita Terminal 1",
    vending: "GPA SIM vending machines, 1F Central Building and 1F South Wing",
    counters: "J WiFi & Mobile, XCom Global, Telecomsquare, AnyFone Japan, SoftBank Global Rental, JAL ABC",
    hours: "Most 07:00–21:00",
  },
  {
    airport: "Narita Terminal 2",
    vending: "GPA SIM vending machines, 1F Main Building, and 2F before customs",
    counters: "J WiFi & Mobile, XCom Global, Telecomsquare, AnyFone Japan, SoftBank Global Rental, JAL ABC",
    hours: "Most 07:00–21:00",
  },
  {
    airport: "Narita Terminal 3",
    vending: "GPA SIM vending machine, 1F",
    counters: "J WiFi & Mobile, 1F",
    hours: "07:00–21:00",
  },
  {
    airport: "Haneda Terminal 3",
    vending: "None listed",
    counters: "Mobile Center, 2F arrivals and 3F departures; AnyFone Japan, 2F arrivals",
    hours: "2F 06:00–23:00, 3F 06:30–23:00",
  },
  {
    airport: "Kansai Terminal 1",
    vending: "GLOBAL WiFi and JTB SIM vending machines, 1F, listed as 24 hours",
    counters: "GLOBAL WiFi and Sakura Mobile, 1F; Telecom Square, 4F",
    hours: "06:00–23:00; Telecom Square may vary with flights",
  },
];

const FAQ_Q_LATE = "What if I land after the SIM counters close?";
const faqItems = [
  {
    q: "Can I buy a SIM card at the airport in Japan?",
    a: `Yes, at Narita, Haneda and Kansai. All three airports list prepaid SIM sales in their public areas, either at staffed counters or from vending machines; Narita lists counters across Terminals 1, 2 and 3, Haneda at Mobile Center in Terminal 3, and Kansai in Terminal 1. Read on each airport's own site on ${CHECKED}.`,
  },
  {
    q: "Can I buy a SIM card at Narita Airport?",
    a: `Yes. Narita's listing shows GPA SIM vending machines in all three terminals and staffed counters including J WiFi & Mobile, XCom Global, Telecomsquare and AnyFone Japan, most open 07:00–21:00, all before security. Terminal 3 has the fewest options: one vending machine and J WiFi & Mobile on 1F. Narita's page carries no update date, so check it before you rely on a counter. Read on ${CHECKED}.`,
  },
  {
    q: "How much is a SIM card at a Japanese airport?",
    a: `It depends on the seller, and none of the airport pages print a price. As a published reference, Sakura Mobile's Travel SIM starts at ¥3,850 with tax and its Travel eSIM at ¥1,375, read on sakuramobile.jp on ${CHECKED}. The cheapest eSIM in this site's comparison is ${ESIM_FROM} (checked ${pricesCheckedAt}), so a SIM bought on arrival is rarely the low-cost option.`,
  },
  {
    q: FAQ_Q_LATE,
    a: `Kansai's Terminal 1 lists SIM vending machines as open 24 hours, and Haneda lists a 24-hour unmanned WiFi rental in front of Mobile Center in Terminal 3. Narita's counters mostly close at 21:00 and its current page lists no hours for the vending machines. The way to avoid the question is an eSIM installed before you fly, which works whenever you land. Read on ${CHECKED}.`,
  },
  {
    q: "Is an airport SIM or an eSIM better for Japan?",
    a: `An eSIM, if your phone is unlocked and takes one: it costs less, you can install it at home, and it is working when you land. A physical SIM is the right answer when your phone cannot take an eSIM. If several people or devices need data, compare a rented router in our pocket WiFi guide.`,
  },
  {
    q: "Do airport SIM cards come with a Japanese phone number?",
    a: `Assume not. Sakura Mobile describes its Travel SIM as data-only with no phone number, and a tourist SIM from a vending machine should be read the same way unless the pack says otherwise. If you need a number, see our guide to Japanese phone numbers for foreigners. Read on ${CHECKED}.`,
  },
];

const TITLE = "Japan Airport SIM Cards 2026: Narita, Haneda, Kansai Hours";
const DESCRIPTION =
  "Where to buy a SIM card at Narita, Haneda and Kansai: counters, hours and 24-hour vending machines from each airport, and when an eSIM is the better buy.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function JapanAirportSimCardsPage({ updated }: { updated: PageUpdated }) {
  const url = `https://www.japan-travel-kit.com${ROUTE}`;
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={url} />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "Simbye Japan eSIM",
              description: "Data-only Japan eSIM to install before you fly, instead of buying a SIM at the airport.",
              brand: "Simbye",
              currency: "USD",
              lowPrice: Math.min(...SIMBYE_FIXED.map((p) => p.priceUsd)),
              highPrice: Math.max(...SIMBYE_FIXED.map((p) => p.priceUsd)),
              offerCount: SIMBYE_FIXED.length,
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
                { "@type": "ListItem", position: 4, name: "Airport SIM Cards", item: url },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM &amp; SIM Cards</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Airport SIM Cards</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Airport SIM Cards 2026:<br />Where to Buy, Hours and Prices
          </h1>
          <p className={styles.heroSubtitle}>
            Counters and vending machines at Narita, Haneda and Kansai, from each airport&apos;s own listing,
            and what to do if you land after they close.
          </p>
          <div className={styles.heroBadges}>
            {[`Read ${CHECKED}`, "From airport listings", "Narita, Haneda, Kansai"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            You can buy a <strong>SIM card at the airport in Japan</strong>: Narita, Haneda and Kansai all list
            prepaid SIM sales before security, at counters that mostly open from 06:00 or 07:00 and close by 21:00
            to 23:00, and Kansai Terminal 1 lists <strong>24-hour SIM vending machines</strong>. But if your phone
            is unlocked and takes an eSIM, you do not need any of them: a Japan eSIM starts at{" "}
            <strong>{ESIM_FROM}</strong> (checked {pricesCheckedAt}), installs at home and works when you land,
            whatever the time. Airport listings read on {CHECKED}.
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
                <p className={styles.verdictStatLabel}>Phone takes an eSIM</p>
                <p className={styles.verdictStatValue}>Buy before you fly, from {ESIM_FROM}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Phone cannot</p>
                <p className={styles.verdictStatValue}>Pre-order a SIM, or use the counter</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Late landing</p>
                <p className={styles.verdictStatValue}>Vending machine, or an eSIM</p>
              </div>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={SIMBYE_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Get Simbye eSIM before you fly →
              </a>
              <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCtaInternal}>
                {klookEsim.ctaLabel}
              </KlookLink>
            </div>
          </div>
        </div>

        <SimbyeOffer />

        <EsimCtaTop />

        {/* By airport */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By airport</span>
          <h2 className={styles.sectionTitle}>Where Can You Buy a SIM Card at Japan&apos;s Airports?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Airport", "SIM vending machines", "Counters", "Counter hours"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {airportRows.map((row) => (
                    <tr key={row.airport}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.airport}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "190px" }}>{row.vending}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "220px" }}>{row.counters}</td>
                      <td style={{ fontSize: "0.85rem", minWidth: "130px" }}>{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From each airport&apos;s own service listing, read on {CHECKED}; Narita&apos;s page carries no update date
            and lists no hours for its vending machines. Not every counter sells a SIM as well as renting routers and
            phones, so check before you queue. Kansai notes that rental services are not available beyond the
            security checkpoint. Its Terminal 2 lists a GLOBAL WiFi counter, 07:00–21:30, and a 24-hour unmanned
            WiFiBOX. Sakura Mobile also offers airport pickup at Fukuoka, New Chitose and Chubu Centrair.
          </p>
        </section>

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is an Airport SIM Compared With an eSIM?</h2>
          <p className={styles.bodyText}>
            The airports do not publish prices, so this uses the sellers that do. Sakura Mobile sells both a
            physical SIM and an eSIM, which makes the gap easy to see.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Published price", "Get it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Simbye eSIM</td>
                    <td className={styles.tdPrice}>From {ESIM_FROM}{SIMBYE_10 ? `; 10 GB ${formatUsd(SIMBYE_10.priceUsd)}` : ""}</td>
                    <td style={{ fontSize: "0.85rem" }}>Online, before you fly</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Sakura Mobile Travel eSIM</td>
                    <td className={styles.tdPrice}>From ¥1,375</td>
                    <td style={{ fontSize: "0.85rem" }}>By email</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Sakura Mobile Travel SIM</td>
                    <td className={styles.tdPrice}>From ¥3,850</td>
                    <td style={{ fontSize: "0.85rem" }}>Airport pickup, or delivered to a hotel or post office</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>{WIFI.name} pocket WiFi</td>
                    <td className={styles.tdPrice}>From ${WIFI.fromUsdPerDay.toFixed(2)} a day</td>
                    <td style={{ fontSize: "0.85rem" }}>Airport counter, on Klook</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Sakura Mobile&apos;s prices include tax, read on sakuramobile.jp on {CHECKED}. eSIM prices checked{" "}
            {pricesCheckedAt}. To see every eSIM by price, use our{" "}
            <Link href="/guides/esim/cheapest-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>cheapest eSIM ranking</Link>; for a
            pick by trip, our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>best eSIM for Japan guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SIMBYE_URL} target="_blank" rel="sponsored noopener" className={styles.pickCta}>Get Simbye eSIM →</a>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
        </section>

        {/* Late landing and the phone that cannot take an eSIM */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Edge cases</span>
          <h2 className={styles.sectionTitle}>{FAQ_Q_LATE}</h2>
          <p className={styles.bodyText}>
            Your options narrow to a machine. Kansai Terminal 1 lists its GLOBAL WiFi and JTB SIM vending machines
            as open 24 hours, and Haneda lists a 24-hour unmanned WiFi rental in front of Mobile Center in Terminal
            3. Narita&apos;s counters mostly close at 21:00, and its current page gives no hours for the vending
            machines. An eSIM bought on your phone still works in this situation, as long as you can get onto the
            airport&apos;s WiFi to download it.
          </p>
          <h2 className={styles.sectionTitle}>What If Your Phone Cannot Take an eSIM?</h2>
          <p className={styles.bodyText}>
            Then a physical SIM or a router is the right purchase, and pre-ordering beats hoping a counter is open.{" "}
            <a href={SAKURA_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Sakura Mobile
            </a>{" "}
            offers pickup at six airports. If several people need data, a{" "}
            <Link href="/guides/esim/best-pocket-wifi-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>pocket WiFi rental</Link>{" "}
            may cost less overall, and our{" "}
            <Link href="/guides/esim/japan-sim-card-vs-esim-2026" style={{ color: "var(--accent)", fontWeight: 600 }}>SIM card vs eSIM guide</Link>{" "}
            goes through the choice.
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

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Skip the airport counter</h2>
            <p className={styles.ctaBannerDesc}>
              Install a Japan eSIM at home and it is working when you land, from {ESIM_FROM}.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={SIMBYE_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Get Simbye eSIM →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
