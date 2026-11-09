import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  tokyoSubwayTicket,
  subwayCityViewCombo,
  naritaBusSubwayCombo,
  tokyoSightseeingBusTour,
  fujiDayTour,
  shinjukuNightFoodWalkingTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { PRICES } from "../../../lib/attraction-prices";

// Every price, fare and rule on this page was read off tokyometro.jp on 8 November 2026:
//   /en/ticket/travel/   Tokyo Subway Ticket prices, validity, lines, who can buy, QR version
//   /en/ticket/regular/  Tokyo Metro single fares by distance (IC and paper, adult and child)
//   /en/ticket/1day/     Tokyo Metro 24-hour Ticket and the Common One-day Ticket
//   /en/ticket/age/      fare age bands
//   /en/ticket/airport_bus/  airport bundles that include the pass
//   /lang_en/news/223056.html  QR version usable on Metro and Toei from 25 March 2026
// The 24-hour adult and child prices are shared with lib/attraction-prices.ts.
const P = PRICES.tokyoSubwayTicket;
const CHECKED = "8 November 2026";
const OFFICIAL = "https://www.tokyometro.jp/en/ticket/travel/index.html";

const priceRows = [
  { pass: "24-hour ticket", adult: P.adult, child: P.child, perDay: "¥1,000 / day" },
  { pass: "48-hour ticket", adult: "¥1,500", child: "¥750", perDay: "¥750 / day" },
  { pass: "72-hour ticket", adult: "¥2,000", child: "¥1,000", perDay: "¥667 / day" },
];

// Rides needed to beat the pass price with single IC fares: ceil(price / fare).
const breakEvenRows = [
  { pass: "24-hour (¥1,000)", short: "6 rides", mid: "5 rides", perDay: "5–6 in the 24 hours" },
  { pass: "48-hour (¥1,500)", short: "9 rides", mid: "8 rides", perDay: "about 4–5 a day" },
  { pass: "72-hour (¥2,000)", short: "12 rides", mid: "10 rides", perDay: "about 3–4 a day" },
];

const fareRows = [
  { band: "1–6 km", ic: "¥178", paper: "¥180", child: "¥89" },
  { band: "7–11 km", ic: "¥209", paper: "¥210", child: "¥104" },
  { band: "12–19 km", ic: "¥252", paper: "¥260", child: "¥126" },
  { band: "20–27 km", ic: "¥293", paper: "¥300", child: "¥146" },
  { band: "28–40 km", ic: "¥324", paper: "¥330", child: "¥162" },
];

const ageRows = [
  { band: "Adult", ages: "12 and over", fare: "Adult price" },
  { band: "Child", ages: "6 to 11", fare: "Child price (half)" },
  { band: "Toddler", ages: "1 to 6, not yet at elementary school", fare: "Free, up to two per adult or child; a third pays the child fare" },
  { band: "Infant", ages: "Under 1", fare: "Free" },
];

const whoFor = [
  {
    title: "Buy the 72-hour if…",
    desc: "You have three subway-heavy days in central Tokyo. At ¥2,000 it works out to about ¥667 a day, which four short Metro rides already exceed. This is the version that pays for itself on an ordinary sightseeing day rather than a frantic one.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Skip it if…",
    desc: "Your itinerary runs along the Yamanote Line. The pass covers Tokyo Metro and Toei Subway only — JR is not included, and Shibuya, Shinjuku, Shinagawa and Ueno are all Yamanote stops. A pay-as-you-go IC card handles both networks without the arithmetic.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 8l8 8M16 8l-8 8" />
      </svg>
    ),
  },
  {
    title: "The 24-hour is the marginal one…",
    desc: "At ¥1,000 you need five Metro rides of 7–11 km, or six of the shortest band, in a single 24-hour window to break even. That is a lot for one day unless you are deliberately crossing the city. Check your route before you buy this tier.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Count your subway rides, not your days",
    desc: `The clock runs in hours from first use, not calendar days, so a 24-hour ticket first tapped at 15:00 is valid until 15:00 the next day. That makes an afternoon-arrival day and the following morning a single 24-hour window. Count the Metro and Toei rides inside it — against ¥178–¥324 a ride, five or six is where the ¥1,000 tier starts to pay.`,
  },
  {
    title: "Check whether your route is actually subway",
    desc: "The pass excludes JR, including the Yamanote Line, and private railways. Asakusa, Oshiage, Ginza, Roppongi, Omotesando and Tsukiji are all subway; Shibuya, Shinjuku, Ueno and Akihabara are reachable by subway but are also Yamanote stops you may end up using instead.",
  },
  {
    title: "Buy online before you land",
    desc: "Tokyo Metro's official page sells the pass online, as a standard ticket or as a QR version sent to your phone. Klook sells the same pass with an English checkout; the listing for your date says whether you ride on a QR code or collect a ticket, and where.",
  },
  {
    title: "Keep an IC card anyway",
    desc: "Even with the pass, a Suica or Pasmo covers the JR rides, buses and convenience stores the pass does not. Nobody in Tokyo uses only a subway pass, and carrying both is the normal setup rather than a redundancy.",
  },
];

const faqItems = [
  {
    q: "How much is the Tokyo Subway Ticket?",
    a: `From the official Tokyo Metro site: ¥1,000 adult / ¥500 child for the 24-hour ticket, ¥1,500 / ¥750 for the 48-hour, and ¥2,000 / ¥1,000 for the 72-hour. Per day that is ¥1,000, ¥750 and about ¥667 respectively, so the longer tiers are considerably better value. Prices checked on ${CHECKED}.`,
  },
  {
    q: "Is the Tokyo Subway Ticket worth it?",
    a: `It depends on how many subway rides you actually take. Tokyo Metro adult fares run from ¥178 for 1–6 km up to ¥324 for 28–40 km on an IC card, so the ¥1,000 24-hour ticket needs five to six rides in one window to break even. The ¥2,000 72-hour ticket needs 10 to 12 rides across its three days, about three or four a day, which an ordinary sightseeing day reaches — that tier is the one most visitors come out ahead on. Fares and prices checked on ${CHECKED}.`,
  },
  {
    q: "Does the Tokyo Subway Ticket cover JR and the Yamanote Line?",
    a: "No. It covers all Tokyo Metro and Toei Subway lines and nothing else — JR lines, including the Yamanote Line, and private railways are excluded. This is the single most common reason the pass disappoints: a lot of Tokyo itineraries lean on the Yamanote loop, and those rides are charged separately. If your days mix subway and JR, a pay-as-you-go IC card is the simpler tool.",
  },
  {
    q: "When does the 24 hours start?",
    a: "At first use, not at purchase and not at midnight — the official page counts 24, 48 or 72 hours from the travel starting time. A 24-hour ticket first tapped at 15:00 is valid until 15:00 the following day, which means one pass can cover an afternoon of sightseeing and the next morning's travel. The 48- and 72-hour versions work the same way, counting forward in hours from the first tap.",
  },
  {
    q: "Who can buy the Tokyo Subway Ticket?",
    a: `Overseas visitors, and Japanese residents who live outside Tokyo, Kanagawa, Saitama, Chiba, Ibaraki, Tochigi, Gunma and Yamanashi, according to the official Tokyo Metro page checked on ${CHECKED}. The official pages checked do not say whether a passport is shown at purchase, so check the listing for your date and carry your passport when you collect a ticket.`,
  },
  {
    q: "Physical ticket or digital QR version?",
    a: "The official Tokyo Metro site offers both: a standard Tokyo Subway Ticket, and a QR version that can be distributed to several mobile devices when you buy more than one. Since 25 March 2026 the QR version can be used on Tokyo Metro and Toei Subway lines directly, so buying and riding happen on one phone. The validity period and the price are the same either way.",
  },
  {
    q: "Can I use the Tokyo Subway Ticket to get to Tokyo Skytree?",
    a: "Yes. Skytree sits above Oshiage Station, which is served by the Tokyo Metro Hanzomon Line and the Toei Asakusa Line, so the pass covers the journey. Asakusa is two stops away on the same Asakusa Line, which makes Senso-ji and Skytree an easy pair on one pass day.",
  },
  {
    q: "Is there a cheaper Tokyo subway pass?",
    a: `The Tokyo Metro 24-hour Ticket is cheaper at ¥700 adult (¥350 child), but it covers only the nine Tokyo Metro lines and not the four Toei lines — and the Oedo, Asakusa and Shinjuku lines are Toei. The Common One-day Ticket for Tokyo Metro & Toei costs ¥1,100 and runs for one day rather than 24 hours, so the ¥1,000 Tokyo Subway Ticket beats it for anyone eligible. Prices from tokyometro.jp, checked ${CHECKED}.`,
  },
  {
    q: "Do children need their own Tokyo Subway Ticket?",
    a: `Children aged 6 to 11 pay the child price, which is half the adult price at every length (¥500 / ¥750 / ¥1,000). Tokyo Metro's age rules let up to two toddlers aged 1 to 6 who are not yet at elementary school ride free with an adult or child, and under-1s ride free. From 12 the adult price applies. Checked on tokyometro.jp, ${CHECKED}.`,
  },
  {
    q: "Can I use the Tokyo Subway Ticket from Narita or Haneda airport?",
    a: "Not on its own. The pass covers Tokyo Metro and Toei Subway lines only, so the airport train or bus is paid separately. Tokyo Metro's airport page lists bundles that add the pass to the airport leg: the Keisei Skyliner & Tokyo Subway Ticket and the Limousine & Subway Pass from Narita, and the Limousine & Subway Pass from Haneda. Each bundle's own site gives the sales points.",
  },
  {
    q: "Does the Tokyo Subway Ticket cover the Toei Oedo and Asakusa lines?",
    a: "Yes. The official page says the pass is valid on all lines of Tokyo Metro and Toei Subway, and the Oedo, Asakusa, Mita and Shinjuku lines are the four Toei lines. That is the main difference from the Tokyo Metro 24-hour Ticket, which stops at the Metro network.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/tokyo-subway-ticket") } });

const TITLE = "Tokyo Subway Ticket 2026: 24/48/72-Hour Price, Worth It?";
const DESC =
  "Tokyo Subway Ticket price for 24, 48 or 72 Hours: ¥1,000, ¥1,500, ¥2,000 on all Metro and Toei lines. Rides to break even, where to buy, and JR rules.";

export default function TokyoSubwayTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
              route: "/guides/attractions/tokyo-subway-ticket",
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
                { "@type": "ListItem", position: 4, name: "Tokyo Subway Ticket", item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-subway-ticket" },
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
          <span className={styles.breadCurrent}>Tokyo Subway Ticket</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tokyo Subway Ticket 2026:<br />Price for 24, 48 or 72 Hours, and Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            The Tokyo Subway Ticket gives unlimited rides on every Tokyo Metro and Toei Subway line for 24, 48 or
            72 hours from first use, at ¥1,000, ¥1,500 or ¥2,000 for adults (children half price; official prices
            checked {CHECKED}). It pays off if you take five or six single subway rides in 24 hours, or three to
            four a day on the 72-hour ticket. JR lines, including the Yamanote Line, are not covered.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Break-even worked out"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>24 hours</p>
                <p className={styles.verdictStatValue}>¥1,000 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>72 hours</p>
                <p className={styles.verdictStatValue}>¥2,000 adult</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Break-even</p>
                <p className={styles.verdictStatValue}>3–4 rides/day on 72h</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Covers JR?</p>
                <p className={styles.verdictStatValue}>No</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the 72-hour ticket at ¥2,000 works out to about ¥667 a day, which four
              short Metro rides already beat — that tier is usually worth it. The 24-hour at ¥1,000 needs five or
              six rides in one window, which is a busier day than most people have. The clock starts at first use,
              not at purchase. Either way the pass excludes
              JR, so the Yamanote Line is not included. Prices and fares checked on {CHECKED}.
            </p>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
              Check the Tokyo Subway Ticket on Klook →
            </KlookLink>
          </div>
        </div>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much is the Tokyo Subway Ticket?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ¥1,000 for 24 hours, ¥1,500 for 48 hours and ¥2,000 for 72 hours for adults, with children paying
            half. The pass covers <strong>all Tokyo Metro and all Toei Subway lines</strong>, which matters because
            the two are separate companies with separate fares.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child", "Cost per day"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Adult and child prices read off the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener">official Tokyo Metro Tokyo Subway Ticket page</a> on{" "}
            {CHECKED}. The cost-per-day column is simple division, not an official figure.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            What is the child price, and who counts as a child?
          </h3>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Fare band", "Age", "What they pay"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ageRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.ages}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Age bands from Tokyo Metro&apos;s Fares According to Age page, checked {CHECKED}. A six-year-old who
            has not started elementary school still counts as a toddler.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Tokyo Subway Ticket worth it?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes on the 72-hour ticket for most subway-based trips, and only on a busy day for the 24-hour one.
            The table counts how many single IC-card rides it takes to cost more than the pass.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass (adult)", "Rides at ¥178 (1–6 km)", "Rides at ¥209 (7–11 km)", "Pace needed"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakEvenRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.short}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.mid}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Pass prices and Tokyo Metro IC fares read off tokyometro.jp on {CHECKED}. Ride counts are the pass
            price divided by one fare, rounded up. Toei Subway sets its own fares, which are not used here.
          </p>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            What does a single subway ride cost instead?
          </h3>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            These are Tokyo Metro&apos;s published single fares by distance band. The IC-card column is what a
            Suica or Pasmo charges, marginally less than a paper ticket at every band.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Distance", "Adult IC card", "Adult paper ticket", "Child IC card"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.band}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.band}</td>
                      <td className={styles.tdPrice}>{row.ic}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.paper}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Most central-Tokyo subway hops fall in the first two bands, so call it ¥178–¥209 a ride. The ¥2,000
            72-hour ticket, at about ¥667 a day, is beaten by four short rides a day — a normal pace once you are
            changing lines a couple of times per outing. The cheaper Tokyo Metro 24-hour Ticket (¥700) stops at
            the Metro network, so it only competes on days with no Toei rides.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fares read off Tokyo Metro&apos;s fare table on {CHECKED}; adult fares include the ¥10 barrier-free fee.
          </p>
          <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta} style={{ marginTop: "1rem" }}>
            Check Tokyo Subway Ticket dates on Klook →
          </KlookLink>
        </section>

        {/* Where to buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where do I buy and exchange the Tokyo Subway Ticket?</h2>
          <p className={styles.bodyText}>
            Buy it online before you fly. Tokyo Metro&apos;s official page sells two versions online: a standard
            Tokyo Subway Ticket and a QR version, which can be sent to several phones when one person buys for a
            group. Since 25 March 2026 the QR version can be used on Tokyo Metro and Toei Subway lines directly, so
            purchase and riding happen on one phone.
          </p>
          <p className={styles.bodyText}>
            For the standard ticket, the official pages checked on {CHECKED} do not list the stations or machines
            where an online purchase is exchanged; the voucher you receive gives the collection point, so check it
            before you head for a station. Booking through Klook works the same way: the listing for your date says
            whether you ride on a QR code or collect a ticket, and where.
          </p>
          <p className={styles.bodyText}>
            Arriving by plane, the pass does not cover the airport leg. Tokyo Metro&apos;s airport page lists
            bundles that add it: the Keisei Skyliner &amp; Tokyo Subway Ticket and the Limousine &amp; Subway Pass
            from Narita, and the Limousine &amp; Subway Pass from Haneda.{" "}
            <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfers</Link> compares the routes
            into town.
          </p>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--sumi)", marginTop: "1.75rem", marginBottom: "0.5rem" }}>
            Who can buy the Tokyo Subway Ticket?
          </h3>
          <p className={styles.bodyText}>
            Overseas visitors, and Japanese residents who live outside Tokyo, Kanagawa, Saitama, Chiba, Ibaraki,
            Tochigi, Gunma and Yamanashi. The official pages checked do not say whether a passport is shown at
            purchase, so check the listing for your date and carry your passport when you collect a ticket.
          </p>
          <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta} style={{ marginTop: "1rem" }}>
            Book the Tokyo Subway Ticket on Klook →
          </KlookLink>
        </section>

        <KlookTourPicks
          heading="What to Book for the Same Trip"
          intro="Two Tokyo bookings that sell out on popular dates: a full-day trip out of the city, and an evening food walk in Shinjuku. Check the listing for your date."
          tours={[fujiDayTour, shinjukuNightFoodWalkingTour]}
        />

        <BookingEsimCard lead="Riding the subway on a QR ticket? Get mobile data before you land." />

        {/* JR */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What it excludes</span>
          <h2 className={styles.sectionTitle}>Does the Tokyo Subway Ticket cover JR lines?</h2>
          <p className={styles.bodyText}>
            No. It covers Tokyo Metro and Toei Subway only, so JR lines — including the Yamanote Line — and
            private railways are paid separately. In Tokyo that is a large hole: the Yamanote loop that links
            Shibuya, Shinjuku, Shinagawa, Tokyo and Ueno is JR, and so are the Chuo and Sobu lines.
          </p>
          <p className={styles.bodyText}>
            For a JR-only hop, tap a Suica or Pasmo and pay the single fare; see our{" "}
            <Link href="/guides/transport/ic-cards-japan">guide to Japanese IC cards</Link>. Many JR stops also have
            a subway station a short walk away, so check the subway route first in a map app before paying for the
            JR leg. If your days are built around the loop rather than the subway,{" "}
            <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link> explains how JR, Metro
            and Toei divide up the city.
          </p>
        </section>

        {/* Validity */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Validity</span>
          <h2 className={styles.sectionTitle}>Does the 24-hour ticket start when I buy it or when I first use it?</h2>
          <p className={styles.bodyText}>
            When you first use it. The official page counts 24, 48 or 72 hours from the travel starting time, not
            from purchase and not by calendar day, so a 24-hour ticket first used at 15:00 runs until 15:00 the next
            day.
          </p>
          <p className={styles.bodyText}>
            That is why the 72-hour ticket fits a three-night, four-day trip: start it on your first subway ride
            after landing at, say, 14:00, and it runs until 14:00 on day four, covering the last morning too. Our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3-day itinerary</Link> shows how
            three full days in the city fit together; on the{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary">5-day itinerary</Link>, cover the three busiest
            subway days with the pass and pay by IC card on the rest. For what to fill the days with, see{" "}
            <Link href="/guides/attractions/things-to-do-tokyo">things to do in Tokyo</Link>.
          </p>
        </section>

        {/* Who for */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which tier</span>
          <h2 className={styles.sectionTitle}>Which version should you buy: 24, 48 or 72 hours?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How do I decide which ticket to buy?</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            For the wider picture — how Metro, Toei and JR divide up the city, and where an IC card beats any
            pass — see <Link href="/guides/transport/tokyo-transportation">getting around Tokyo</Link> and our{" "}
            <Link href="/guides/transport/ic-cards-japan">guide to Japanese IC cards</Link>. If you are arriving
            at Narita or Haneda, <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfers</Link>{" "}
            covers the routes into town, several of which are bundled with this pass.
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

        <KlookTourPicks
          heading="Bundles Built Around the Same Pass"
          intro="Klook sells the pass on its own and packaged with an airport transfer or an observation deck. If you were going to buy both anyway, the combos save a checkout."
          tours={[subwayCityViewCombo, naritaBusSubwayCombo, tokyoSightseeingBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 9 Nov 2026: two days routed on the 48-hour ticket. */}
            <Link href="/guides/attractions/tokyo-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 2 Day Itinerary (2026): Day by Day, and What to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
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
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-go-kart" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13h2l2-3h8l2 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Go Kart 2026: Price, IDP Rules and Which Tour to Book</p>
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
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
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
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets (2026): Price, Best Time &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three subway days, ¥2,000</h2>
            <p className={styles.ctaBannerDesc}>
              If your Tokyo days run on the Metro and Toei lines rather than the Yamanote loop, the 72-hour
              ticket is the tier that pays for itself. Klook checks out in English on a foreign card.
            </p>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View the Tokyo Subway Ticket on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
