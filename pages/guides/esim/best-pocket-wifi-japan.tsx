import Head from "next/head";
import Link from "next/link";
import StarRating from "../../../components/StarRating";
import styles from "../../../styles/BestEsimJapan.module.css";
import cardStyles from "../../../styles/SIMCardCard.module.css";
import { formatUsd, pricesCheckedLabel, siteCheapestFrom } from "../../../lib/esim-prices";
import {
  pocketWifi,
  pocketWifis,
  ratesCheckedAt,
  rentalTotal,
  specsCheckedAt,
  type PocketWifi,
} from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

// Every rental number on this page comes from lib/pocket-wifi.ts, which records what the
// linked Klook listing states and when each part of it was last checked. eSIM prices come
// from data/esim-prices.json (refreshed daily) and are only used for the "an eSIM would be
// cheaper" comparison — this page is about which router to rent, not whether to rent one.
// That question belongs to pocket-wifi-vs-esim-japan and is linked, not re-argued, here.
const AIRPORT = pocketWifi("ninja-wifi");
const HOTEL = pocketWifi("hotel-delivery");
const ESIM_FROM = siteCheapestFrom();
const pricesCheckedAt = pricesCheckedLabel();

const badgeColorMap: Record<string, string> = {
  "bg-blue-500": cardStyles.badgeBlue,
  "bg-green-500": cardStyles.badgeGreen,
  "bg-orange-500": cardStyles.badgeOrange,
};

// Rows of the head-to-head table, read off the two listings rather than typed out twice.
const specRows: { label: string; value: (w: PocketWifi) => string }[] = [
  { label: "From, per day", value: (w) => `$${w.fromUsdPerDay.toFixed(2)}` },
  { label: "Data", value: (w) => w.data },
  { label: "Devices", value: (w) => `Up to ${w.maxDevices}` },
  { label: "Battery, rated", value: (w) => w.batteryHours },
  { label: "Network", value: (w) => w.network },
  { label: "How you collect it", value: (w) => w.collect },
  { label: "How you return it", value: (w) => w.returnBy },
  { label: "Klook rating", value: (w) => `${w.rating}/5 · ${w.reviews} reviews · ${w.bookings} booked` },
  { label: "Best for", value: (w) => w.bestFor },
];

/** Trip lengths people actually book, for the "what will it come to" table. */
const TRIP_LENGTHS = [5, 7, 10, 14];

const CHEAPEST_DAY = Math.min(...pocketWifis.map((w) => w.fromUsdPerDay));
const DEAREST_DAY = Math.max(...pocketWifis.map((w) => w.fromUsdPerDay));

const faqItems = [
  {
    q: "How much does pocket WiFi cost in Japan?",
    a: `The two rentals linked on this page advertise ${formatUsd(CHEAPEST_DAY)} and ${formatUsd(DEAREST_DAY)} per day on Klook, checked ${ratesCheckedAt}. On those rates a seven-day trip works out at roughly ${formatUsd(rentalTotal(HOTEL, 7))} to ${formatUsd(rentalTotal(AIRPORT, 7))} for the router — a flat cost, not per person, however many of you share it. Both figures are floors rather than quotes: they are the advertised cheapest booking, and the price Klook shows you rises with rental length, in peak season, and with the currency you book in.`,
  },
  {
    q: "Where do you pick up pocket WiFi in Japan?",
    a: `It depends which rental you book. ${AIRPORT.name} is collected and returned at an airport counter, and its listing covers all of Japan's international airports; Klook's own counter sheet for it names Narita Terminals 1 and 2, Haneda, Kansai Terminal 1, Chubu Centrair, New Chitose, Fukuoka, Naha, Komatsu, Kagoshima, Shizuoka and Asahikawa. The other rental skips the airport altogether and is delivered to your hotel, but only in Tokyo, Osaka, Nagoya, Fukuoka and Hokkaido.`,
  },
  {
    q: "How do I return pocket WiFi in Japan?",
    a: `Two different routines. The airport rental goes back over the counter you collected it from, so you need to build the stop into your departure. The hotel-delivery rental comes with a prepaid return envelope — you drop it into any Japan Post box, which means you can post it on your last morning and go straight to the airport.`,
  },
  {
    q: "How many devices can share one pocket WiFi?",
    a: `Not as many as is usually claimed, and it differs between the two. The airport rental's listing states up to ${AIRPORT.maxDevices} connected devices; the hotel-delivery one states up to ${HOTEL.maxDevices}. Count devices, not people — a couple with two phones, a tablet and a laptop is already four.`,
  },
  {
    q: "Is Ninja WiFi worth renting?",
    a: `It is the most booked of the two. Its Klook listing shows ${AIRPORT.rating}/5 from ${AIRPORT.reviews} reviews with ${AIRPORT.bookings} bookings, and sells unlimited data on ${AIRPORT.network} with a power bank included, ${AIRPORT.batteryHours} of rated battery and up to ${AIRPORT.maxDevices} devices. The reason to look elsewhere is the device limit: if you need more than ${AIRPORT.maxDevices} connections, the hotel-delivery rental allows ${HOTEL.maxDevices}.`,
  },
  {
    q: "Can pocket WiFi be delivered to my hotel in Tokyo?",
    a: `Yes. The hotel-delivery rental on this page covers hotels in Tokyo, Osaka, Nagoya, Fukuoka and Hokkaido, and goes back by prepaid envelope in a post box rather than at a counter. The trade-off is the gap between landing and check-in: nothing is waiting for you at the airport, so you are offline until you reach the hotel.`,
  },
  {
    q: "Which network does Japan pocket WiFi run on?",
    a: `Both listings on this page state SoftBank as the local operator, with coverage described as the whole of Japan. Network is rarely what separates Japan rentals — all three national carriers cover the tourist route well — so decide on device limit, collection method and price instead.`,
  },
  {
    q: "Is a pocket WiFi or an eSIM better for Japan?",
    a: `For one person, an eSIM: Japan plans start from ${ESIM_FROM} (checked ${pricesCheckedAt}), there is nothing to collect, carry, charge or return, and a solo traveller gets no benefit from a device limit of ${HOTEL.maxDevices}. A router wins when the cost is shared — three or more people, or any trip where a laptop, a tablet or a phone that cannot take an eSIM has to get online too.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/best-pocket-wifi-japan") } });

const HEADLINE = "Best Pocket WiFi in Japan (2026): Rental Prices & Pickup Compared";
const DESCRIPTION =
  "Which pocket WiFi to rent in Japan — two Klook rentals compared on price per day, device limit, battery, and airport pickup against hotel delivery.";

export default function BestPocketWifiJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Best Pocket WiFi in Japan 2026: Prices &amp; Pickup | Japan Travel Kit</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/best-pocket-wifi-japan" />
        <meta property="og:title" content="Best Pocket WiFi in Japan (2026): Rental Prices &amp; Pickup Compared" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/best-pocket-wifi-japan" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Pocket WiFi in Japan (2026): Rental Prices &amp; Pickup Compared" />
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
            Best Pocket WiFi in Japan (2026):<br />Rental Prices &amp; Pickup Compared
          </h1>
          <p className={styles.heroSubtitle}>
            Every Japan rental sells the same thing — unlimited data on a national network.<br />
            What actually differs is the device limit and where the router meets you.
          </p>
          <div className={styles.heroBadges}>
            {[`Rates checked ${ratesCheckedAt}`, `Specs checked ${specsCheckedAt}`, "Both listings unlimited"].map((t) => (
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

        {/* Quick Answer */}
        <section className={styles.choiceSection}>
          <span className={styles.sectionLabel}>Quick Answer</span>
          <h2 className={styles.sectionTitle}>Which Rental Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            Japan&apos;s rental market hides a boring truth: the routers are much the same. Both of
            the rentals we link run unlimited data on {AIRPORT.network}, both are rated at{" "}
            {AIRPORT.batteryHours} of battery, both include a power bank. So the choice comes down
            to two things that are easy to check and easy to get wrong —{" "}
            <strong>how many devices you need to connect, and whether the router is waiting at the
            airport or at your hotel</strong>. {AIRPORT.name} is collected at an airport counter and
            allows up to {AIRPORT.maxDevices} devices, from ${AIRPORT.fromUsdPerDay.toFixed(2)} a
            day. The hotel-delivery rental allows up to {HOTEL.maxDevices} and is cheaper per day,
            from ${HOTEL.fromUsdPerDay.toFixed(2)}, but nothing meets you at arrivals. Rates checked{" "}
            {ratesCheckedAt}; everything else read off the listings {specsCheckedAt}.
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
                <a
                  href={AIRPORT.affiliateUrl}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ marginTop: "1rem", display: "inline-flex" }}
                >
                  {AIRPORT.ctaText} →
                </a>
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
                <a
                  href={HOTEL.affiliateUrl}
                  className={styles.pickCta}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  style={{ marginTop: "1rem", display: "inline-flex" }}
                >
                  {HOTEL.ctaText} →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Head-to-head table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>The Two Rentals, Side by Side</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    {pocketWifis.map((w) => (
                      <th key={w.id}>{w.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specRows.map((row) => (
                    <tr key={row.label}>
                      <td className={styles.tdProvider}>{row.label}</td>
                      {pocketWifis.map((w) => (
                        <td key={w.id} className={styles.tdNetwork}>{row.value(w)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            * Every row is what the linked Klook listing states. Daily rates are the advertised
            cheapest booking, hand-checked {ratesCheckedAt}; device limits, battery, network,
            collection, return, ratings and review counts were read off the listings{" "}
            {specsCheckedAt}. Ratings and review counts are Klook&apos;s own figures, not ours.
          </p>
        </section>

        {/* How the pricing works */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Japan Pocket WiFi Pricing Actually Works</h2>
          <p className={styles.bodyText}>
            A rental is priced per day, so the headline number is small and the bill is not. The
            figures on this page — ${HOTEL.fromUsdPerDay.toFixed(2)} and $
            {AIRPORT.fromUsdPerDay.toFixed(2)} a day — are each listing&apos;s advertised{" "}
            <em>from</em> rate: the cheapest rental length, booked in advance, in US dollars. Read
            them as a floor and never as a quote. Three things push the number you are shown above
            it: a longer rental, a peak-season date, and the currency Klook decides to price you in.
          </p>
          <p className={styles.bodyText}>
            The table below multiplies out those floors so you can see the shape of the cost before
            you open the booking widget. The useful thing about it is what it does{" "}
            <em>not</em> change: the total is the same whether one person uses the router or{" "}
            {HOTEL.maxDevices} devices do. That is the whole economic case for renting one, and it
            is why the arithmetic turns over at a particular headcount — worked out in our{" "}
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
                    <th>Trip length</th>
                    {pocketWifis.map((w) => (
                      <th key={w.id}>{w.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRIP_LENGTHS.map((days) => (
                    <tr key={days}>
                      <td className={styles.tdProvider}>{days} days</td>
                      {pocketWifis.map((w) => (
                        <td key={w.id} className={styles.tdPrice}>
                          {formatUsd(rentalTotal(w, days))}
                          <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>
                            {" "}(${w.fromUsdPerDay.toFixed(2)}/day)
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            * Daily rate × days, on the advertised <em>from</em> rates checked {ratesCheckedAt}.
            A floor for the whole group, not a per-person price and not a quote.
          </p>
        </section>

        {/* Pickup and return */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Pickup &amp; return</span>
          <h2 className={styles.sectionTitle}>Getting the Router, and Getting Rid of It</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            This is the part travellers under-plan, and it is the one real difference between the
            two rentals. One meets you in the terminal and has to be handed back in a terminal; the
            other meets you at your hotel and goes home in the post.
          </p>
          <div className={styles.stepsList}>
            {[
              {
                title: "Book before you fly, not on arrival",
                desc: "The advertised from-rate is the advance-booking rate, and a hotel delivery has to arrive before you do. Neither rental is something to sort out in the arrivals hall.",
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

        {/* Choosing on devices, battery, data */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How to choose</span>
          <h2 className={styles.sectionTitle}>Devices, Battery and Data: What to Match Against</h2>
          <p className={styles.bodyText}>
            <strong>Count devices, not people.</strong> &ldquo;Up to 10 devices&rdquo; is repeated so
            often about Japan rentals that it is treated as a constant, and it is not: these two
            listings state {AIRPORT.maxDevices} and {HOTEL.maxDevices}. A couple travelling with two
            phones, a tablet and a laptop is already at four, and a family of four is usually at six
            or seven. If your count is near the limit, book the {HOTEL.maxDevices}-device rental and
            stop thinking about it.
          </p>
          <p className={styles.bodyText}>
            <strong>Treat battery as a planning constraint.</strong> Both are rated at{" "}
            {AIRPORT.batteryHours}. A rated figure is a best case, and a router being used as a
            hotspot by four phones does not hit its best case. Both rentals include a power bank,
            which is the reason this matters less than it used to — but only if you carry it and a
            cable.
          </p>
          <p className={styles.bodyText}>
            <strong>Data is where there is nothing to decide.</strong> Both listings sell unlimited
            data on {AIRPORT.network}, with coverage described as the whole of Japan. Network is not
            a differentiator in this market — all three Japanese carriers cover the tourist route
            well — so any rental comparison that leads on &ldquo;nationwide 4G coverage&rdquo; is
            selling you something every rental already has. Compare the device limit, the collection
            method and the price instead.
          </p>
        </section>

        {/* The two rentals */}
        <section className={styles.picksSection}>
          <span className={styles.sectionLabel}>The rentals</span>
          <h2 className={styles.sectionTitle}>Both Rentals in Full</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1.5rem" }}>
            Ratings and review counts below are Klook&apos;s, shown on the listing each card links
            to. Daily rates are the advertised cheapest booking as of {ratesCheckedAt}; everything
            else was read off the listings on {specsCheckedAt}.
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
                    <div className={cardStyles.priceBlock}>
                      <p className={cardStyles.priceFrom}>From</p>
                      <p className={cardStyles.price}>${item.fromUsdPerDay.toFixed(2)}</p>
                      <p className={cardStyles.priceCurrency}>USD / day · checked {ratesCheckedAt}</p>
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
                    <a
                      href={item.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className={cardStyles.ctaBtn}
                    >
                      {item.ctaText}
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* When an eSIM is the better buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The other option</span>
          <h2 className={styles.sectionTitle}>When You Should Not Rent One at All</h2>
          <p className={styles.bodyText}>
            Everything above assumes you have decided to rent. For a lot of trips that is the wrong
            decision, and it is worth two minutes before you book. A router is a flat cost shared
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
            names the provider to buy if you land on that side of it.
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
