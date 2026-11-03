import Head from "next/head";
import Link from "next/link";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  keiseiSkylinerUrl,
  naritaExpressRoundTripUrl,
  skylinerVsNexSameDayPrep,
} from "../../../lib/klook-links";

/**
 * Skyliner vs N'EX — restored 3 Nov 2026 (task jtk-20261103-05).
 *
 * The September 2026 merge 301'd this URL to tokyo-airport-transfer. Search Console
 * for 24–30 Oct still showed 44 impressions at an average position of 7.89 on the old
 * URL (107 at 8.56 over 28 days), on "nex vs skyliner", "skyliner vs nex", "keisei
 * skyliner vs nex" and "skyliner nex". The 301 is out of lib/redirects.js. Division of
 * labour: tokyo-airport-transfer compares every option from both airports; this page
 * answers one question — which of the two Narita trains, by destination.
 *
 * Every figure was read off the operators' own sites on 3 Nov 2026:
 *   keisei.co.jp   jp/skyliner/ticket.php (fare ¥1,280 + Liner ¥1,300, IC, child,
 *                  全車指定席, sales from one month out), us/faq/ (fare breakdown,
 *                  power outlets, 1.52 m luggage space), us/skyliner/ (three services
 *                  an hour, 41 min Ueno–T2·3, luggage space in each car),
 *                  us/tickets/coupon.php (discount ¥2,310 / ¥4,500, 36 min to Nippori,
 *                  round-trip exchange at the airport only), us/keisei_wifi/ (free
 *                  Wi-Fi on board), us/directions/*.php (Tokyo 47, Ikebukuro 48,
 *                  Shibuya 64 min on Skyliner + JR, Asakusa 50 min on the Access
 *                  Express — those pages still print the pre-revision ¥2,470 fare, so
 *                  only their times are used).
 *   jreast.co.jp   en/multi/nex/tickets/ (one-way fares by station, same price all
 *                  year, unreserved-seat tickets, seats from one month out),
 *                  multi/en/nex/ (53 min to Tokyo, stops, luggage area, outlets,
 *                  6–8 Nov 2026 partial suspension), multi/pass/nex.html (Round Trip
 *                  Ticket ¥5,200 / ¥2,600, 14 days, foreign passports, pick-up at the
 *                  two airport stations only, free Wi-Fi, regular round-trip fares).
 *   japanrailpass.net  en/about_jrp/route/ (valid on all JR Group limited expresses;
 *                  private railways pay their own fare) and en/purchase/price/.
 * JR East's pages publish no N'EX time to Shinjuku, Shibuya or Yokohama and no
 * frequency, so none is printed. The limousine bus row reuses the figures this site
 * read off limousinebus.co.jp on 22 Oct 2026 for tokyo-airport-limousine-bus.
 * Nothing on this page is first-hand. No Klook price is quoted.
 */

const CHECKED_ISO = "2026-11-03";
const CHECKED = checkedLabel(CHECKED_ISO);
const BUS_CHECKED = checkedLabel("2026-10-22");

const ROUTE = "/guides/transport/skyliner-vs-nex";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const compareRows = [
  { feature: "Operator", skyliner: "Keisei Electric Railway (private)", nex: "JR East" },
  {
    feature: "One-way adult fare",
    skyliner: "¥2,580 (¥1,280 fare + ¥1,300 Liner ticket); ¥2,567 with an IC card",
    nex: "¥3,140 to Tokyo; ¥3,330 to Shinagawa, Shibuya or Shinjuku; ¥4,480 to Yokohama (Ordinary car)",
  },
  {
    feature: "Discount for visitors",
    skyliner: "Skyliner Discount Ticket online: ¥2,310 one-way, ¥4,500 round trip",
    nex: "N'EX TOKYO Round Trip Ticket: ¥5,200 for two rides in 14 days (foreign passport holders)",
  },
  {
    feature: "Fastest published time",
    skyliner: "36 min Terminal 2·3 → Nippori; 41 min to Ueno",
    nex: "53 min Narita Airport → Tokyo Station",
  },
  {
    feature: "Where it goes without a change",
    skyliner: "Nippori and Keisei-Ueno only",
    nex: "Tokyo, Shinagawa, Shibuya, Shinjuku; Musashi-Kosugi, Yokohama, Totsuka, Ōfuna on the Ōfuna-bound trains",
  },
  {
    feature: "Trains",
    skyliner: "Three an hour (Keisei)",
    nex: "Not stated on the JR East pages read — check the timetable when you book",
  },
  {
    feature: "Seats",
    skyliner: "All seats reserved",
    nex: "Reserved seats, plus a same-price unreserved-seat ticket that uses any free Ordinary seat",
  },
  {
    feature: "Large luggage",
    skyliner: "A luggage space in every car (1.52 m wide), with cameras",
    nex: "Large-luggage areas, no reservation, first come first served; overhead racks",
  },
  { feature: "Free Wi-Fi", skyliner: "Yes (KEISEI FREE Wi-Fi)", nex: "Yes" },
  { feature: "Power outlet", skyliner: "Every seat", nex: "Every seat" },
  {
    feature: "JR Pass",
    skyliner: "Not valid — private railway, pay the full fare",
    nex: "Valid, reserved Ordinary seat at no extra charge",
  },
  {
    feature: "Book from",
    skyliner: "One month before the travel date",
    nex: "One month before the travel date",
  },
];

const alternativeRows = [
  {
    option: "Keisei Skyliner",
    time: "36 min to Nippori, 41 to Ueno",
    fare: "¥2,580 (¥2,310 online discount)",
    note: "Fastest into east Tokyo; seat guaranteed",
    checked: CHECKED,
  },
  {
    option: "Narita Express (N'EX)",
    time: "From 53 min to Tokyo Station",
    fare: "¥3,140 Tokyo, ¥3,330 Shinjuku / Shibuya; ¥5,200 round trip",
    note: "The only no-change train to the west side and Yokohama",
    checked: CHECKED,
  },
  {
    option: "Keisei Access Express",
    time: "50 min to Asakusa",
    fare: "The base fare only — no ¥1,300 Liner ticket",
    note: "Same Narita Sky Access line as the Skyliner, ordinary commuter seats",
    checked: CHECKED,
  },
  {
    option: "Airport Limousine Bus",
    time: "1 h 40 min to Tokyo Station on the timetable",
    fare: "¥3,100 Tokyo Station; ¥3,600 Shinjuku or Shibuya",
    note: "Two bags in the hold, stops at hotels; traffic-dependent",
    checked: BUS_CHECKED,
  },
];

const destinationRows = [
  {
    dest: "Ueno",
    pick: "Skyliner",
    note: "The terminus: 41 minutes from Terminal 2·3, no change.",
  },
  {
    dest: "Asakusa",
    pick: "Access Express (or Skyliner + subway)",
    note: "Keisei's Access Express reaches Asakusa in 50 minutes with no change and no Liner charge.",
  },
  {
    dest: "Tokyo Station",
    pick: "N'EX",
    note: "53 minutes with no change. Keisei puts Skyliner + JR at 47 minutes, but that excludes the change at Nippori.",
  },
  {
    dest: "Shinjuku",
    pick: "N'EX",
    note: "A direct stop at ¥3,330 — the Skyliner needs a JR change at Nippori.",
  },
  {
    dest: "Shibuya",
    pick: "N'EX",
    note: "A direct stop at ¥3,330. Skyliner + JR is 64 minutes on Keisei's figure, before the change.",
  },
  {
    dest: "Ikebukuro",
    pick: "Skyliner + JR",
    note: "The N'EX does not stop here; Keisei puts Skyliner + JR at 48 minutes, excluding the change.",
  },
  {
    dest: "Yokohama",
    pick: "N'EX",
    note: "The Ōfuna-bound N'EX stops at Yokohama, ¥4,480. The Skyliner does not come close.",
  },
];

const faqItems = [
  {
    q: "Is the Skyliner or N'EX better?",
    a: `Neither in general — the better one is the one that reaches your hotel's station without a change. The Keisei Skyliner is ¥2,580 and runs non-stop to Nippori in as little as 36 minutes and Keisei-Ueno in 41, so it wins for Ueno, Asakusa and the east side. The JR Narita Express (N'EX) is ¥3,140 to Tokyo Station in as little as 53 minutes and ¥3,330 to Shinagawa, Shibuya and Shinjuku with no change, and some trains continue to Yokohama, so it wins for the west side, and outright if you hold a JR Pass. Fares read off keisei.co.jp and jreast.co.jp on ${CHECKED}.`,
  },
  {
    q: "Which is cheaper, Skyliner or Narita Express?",
    a: `One way, the Skyliner: ¥2,580 to Ueno or Nippori, or ¥2,310 with Keisei's online discount, against ¥3,140 for the N'EX to Tokyo Station and ¥3,330 to Shinjuku or Shibuya. For a round trip by a foreign passport holder the gap closes: Keisei's online return is ¥4,500, and JR East's N'EX TOKYO Round Trip Ticket is ¥5,200 for one ride in and one ride out within 14 days, to or from any JR station in its Tokyo area. If your hotel is on the west side, the Skyliner plus a JR or subway ride from Nippori adds a fare the N'EX ticket already includes. Read on ${CHECKED}.`,
  },
  {
    q: "Is the N'EX covered by the JR Pass?",
    a: `Yes. The JAPAN RAIL PASS scope page lists all JR Group limited express trains, and the Narita Express is a JR East limited express that is not among the exceptions. JR East states that reserved Ordinary seats are available to pass holders at no additional charge; the Green Car is not. The Skyliner is a Keisei private railway train, so the JR Pass does not cover it. Since 1 October 2026 a 7-day Ordinary pass costs ¥50,000 bought on the official site and ¥53,000 through an overseas agency. Read on japanrailpass.net and jreast.co.jp on ${CHECKED}.`,
  },
  {
    q: "Do I need to book the Skyliner in advance?",
    a: `You need a seat ticket before you board, because Keisei runs the Skyliner as all-reserved — but you do not have to buy it before you fly. Seats go on sale one month before the travel date, and Keisei sells them at the Skyliner ticket counters in the airport stations on the day. Booking ahead buys the ¥2,310 online price instead of ¥2,580 and lets you skip the counter. Keisei runs three Skyliners an hour, so a full train usually means waiting for the next one. Read on ${CHECKED}.`,
  },
  {
    q: "Skyliner or N'EX to Shinjuku?",
    a: `The N'EX. Shinjuku is one of its stops — ¥3,330 in an Ordinary car with no change. The Skyliner ends at Ueno, so Shinjuku means changing to JR at Nippori with your luggage. If you hold the N'EX TOKYO Round Trip Ticket (¥5,200), the return leg to Narita can start from a different station, for example Tokyo instead of Shinjuku. JR East does not publish a single Narita–Shinjuku time on its N'EX pages, so check the timetable for your train. Read on ${CHECKED}.`,
  },
  {
    q: "What is the cheapest way from Narita to Tokyo?",
    a: `By train, Keisei's Access Express: it uses the same Narita Sky Access line as the Skyliner without the ¥1,300 Liner ticket, and reaches Asakusa in 50 minutes with no change. The trade-off is ordinary commuter seating with no guaranteed seat or dedicated luggage space. If you want a guaranteed seat, the cheapest is the Skyliner at ¥2,310 with Keisei's online discount. The Airport Limousine Bus is ¥3,100 to Tokyo Station and ¥3,600 to Shinjuku (read on ${BUS_CHECKED}), dearer than either train but with your bags in the hold.`,
  },
  {
    q: "Is the N'EX running normally in November 2026?",
    a: `Not on every day. JR East's N'EX pages carry a notice that some Narita Express services are cancelled from Friday 6 November to Sunday 8 November 2026, linked to its Yokosuka tunnel works page. If you land on those dates, check that page before you book; the Skyliner is not affected by that notice. Read on ${CHECKED}.`,
  },
  {
    q: "Can I use the N'EX TOKYO Round Trip Ticket to go Tokyo → Narita first?",
    a: `No. JR East states the first ride must be Narita Airport → the Tokyo area and the second the Tokyo area → Narita Airport, within 14 days; the reverse order is not allowed. The two stations do not have to match, so you can arrive at Shinjuku and leave from Tokyo Station, and you can change to another JR train within the area without leaving the gates. Pick-up is only at Narita Airport Terminal 1 or Terminal 2·3 station, with your passport. Read on ${CHECKED}.`,
  },
  {
    q: "What happens if my flight is late and I miss my reserved train?",
    a: `For the N'EX, JR East says you can cancel and rebook online before departure, and if you miss the reserved train you can still ride a later N'EX the same day in any free seat, giving it up if its holder arrives. For the Skyliner, the Keisei pages read do not set out a missed-train rule, so ask at the Skyliner counter in the airport station before you board. A reserved seat is tied to one train on both lines, so a delayed arrival is the main reason to keep some slack in the booking. Read on ${CHECKED}.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const TITLE = "Skyliner vs N'EX (2026): Which Narita Train Is Better?";
const DESC =
  "Skyliner vs N'EX from Narita: Skyliner ¥2,580 and 36 min to Nippori; N'EX ¥3,140 and 53 min to Tokyo Station, ¥5,200 round trip. Pick by your station.";

export default function SkylinerVsNexPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESC, updated }),
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
                { "@type": "ListItem", position: 4, name: "Skyliner vs N'EX", item: URL },
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Skyliner vs N&apos;EX</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Skyliner vs N&apos;EX (2026):<br />Which Narita Airport Train Should You Take?
          </h1>
          <p className={styles.heroSubtitle}>
            One runs to Ueno, the other to Tokyo Station, Shinjuku, Shibuya and Yokohama. The
            station your hotel is nearest decides it — fares, times and ticket rules from the two
            operators&apos; own sites.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares, dated", "By destination"].map((t) => (
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

        {/* Quick Answer — the judgment, then the first CTA */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              <strong>Skyliner vs N&apos;EX comes down to where you are going.</strong> For{" "}
              <strong>Ueno, Nippori or Asakusa</strong>, take the <strong>Keisei Skyliner</strong> —
              as little as <strong>36 minutes to Nippori</strong> and 41 to Ueno for{" "}
              <strong>¥2,580</strong> (¥2,310 bought online). For{" "}
              <strong>Tokyo Station, Shinjuku, Shibuya or Yokohama</strong>, take the{" "}
              <strong>N&apos;EX</strong> — about <strong>53 minutes to Tokyo Station for ¥3,140</strong>,{" "}
              ¥3,330 to Shinjuku or Shibuya, or <strong>¥5,200 for a 14-day round trip</strong> on a
              foreign passport. Choose the train that gets you there with no change; a JR Pass
              covers the N&apos;EX and not the Skyliner. Fares and times read off keisei.co.jp and
              jreast.co.jp on {CHECKED}.
            </p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)", marginTop: "1rem" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>East Tokyo (Ueno, Asakusa)</p>
                <p className={styles.verdictStatValue}>Skyliner, ¥2,580</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>West Tokyo, Yokohama</p>
                <p className={styles.verdictStatValue}>N&apos;EX, ¥3,140–4,480</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Round trip, foreign passport</p>
                <p className={styles.verdictStatValue}>N&apos;EX ¥5,200 / Skyliner ¥4,500</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass holder</p>
                <p className={styles.verdictStatValue}>N&apos;EX, free seat</p>
              </div>
            </div>
            <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem" }}>
              The decision is made once you know the station. Both tickets are seat bookings for a
              specific train, so if you buy ahead, pick the one that matches it:
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "0.5rem" }}>
              <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Ueno side: the Skyliner ticket on Klook →
              </KlookLink>
              <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                West side: the N&apos;EX round trip →
              </KlookLink>
            </div>
            <p className={styles.bodyText} style={{ fontSize: "0.82rem", marginTop: "0.75rem", color: "var(--text-muted)" }}>
              No Klook price is quoted here — open the listing for the current figure and the
              cancellation terms for your date. Comparing the bus and taxi too? Our{" "}
              <Link href="/guides/transport/tokyo-airport-transfer">Tokyo airport transfer guide</Link>{" "}
              covers every option from Narita and Haneda.
            </p>
          </div>
        </div>

        {/* Notice */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>6–8 November 2026:</strong> JR East&apos;s N&apos;EX pages carry a notice that
            some Narita Express services are cancelled from Friday 6 to Sunday 8 November 2026
            because of tunnel works. Landing on those dates? Check JR East&apos;s notice before you
            book. Read on {CHECKED}.
          </p>
        </div>

        {/* Is the Skyliner or N'EX better? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The decision</span>
          <h2 className={styles.sectionTitle}>Is the Skyliner or N&apos;EX Better?</h2>
          <p className={styles.bodyText}>
            <strong>The Skyliner is better for the east of Tokyo, the N&apos;EX for the west and
            Yokohama — and neither is better everywhere.</strong> The two lines barely overlap. The
            Skyliner runs non-stop on Keisei&apos;s own line to Nippori and Keisei-Ueno and nowhere
            else; the N&apos;EX runs on JR to Tokyo, Shinagawa, Shibuya and Shinjuku, and its
            Ōfuna-bound trains continue to Musashi-Kosugi, Yokohama, Totsuka and Ōfuna.
          </p>
          <p className={styles.bodyText}>
            So the useful question is not &quot;which train is faster&quot; but &quot;which train
            reaches my station without a change&quot;. Changing at Nippori with a large suitcase is
            the cost the Skyliner&apos;s lower fare leaves you with if you are staying in Shinjuku;
            paying ¥560 more for the N&apos;EX to Tokyo Station is the cost of not taking the
            Skyliner if you are staying in Ueno. If you hold a JR Pass, the N&apos;EX costs nothing
            extra and the Skyliner costs the full fare, which usually settles it.
          </p>
        </section>

        {/* Head-to-head table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Skyliner vs N&apos;EX at a Glance</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Keisei Skyliner", "Narita Express (N'EX)"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.skyliner}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.nex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read on {CHECKED}: Skyliner fares, seats and sales from Keisei&apos;s Japanese ticket
            page and English FAQ, the discount and the 36-minute figure from its Skyliner Discount
            Ticket page, frequency and the 41-minute Ueno figure from its Skyliner Overview, Wi-Fi
            from its KEISEI FREE Wi-Fi page. N&apos;EX fares from JR East&apos;s N&apos;EX ticket
            page, which states they are the same all year; children pay half the fare and
            reserved-seat charge. The 53-minute figure, stops, luggage and outlets are from its
            N&apos;EX page, the round-trip ticket and Wi-Fi from its N&apos;EX TOKYO Round Trip
            Ticket page. JR Pass validity from japanrailpass.net. Prices change — confirm when
            you book.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Skyliner ticket on Klook →
            </KlookLink>
            <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the N&apos;EX round trip on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Same-day bookings, under the table CTA */}
        <KlookTripPrep
          label="Book for the same day"
          heading="What to Book Alongside Your Airport Train"
          intro="The train gets you to a station; the rest of the arrival day is a bed near it, a way to ride the subway afterwards and data on your phone. These are booked on the same Klook account as the train ticket. No prices are quoted — open each listing for the current figure."
          items={skylinerVsNexSameDayPrep}
        />

        {/* By destination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By destination</span>
          <h2 className={styles.sectionTitle}>Which Train for Your Hotel?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Staying near", "Take", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Skyliner-plus-JR times and the Access Express time are Keisei&apos;s own route pages,
            from Narita Airport Terminal 2·3, read on {CHECKED}; Keisei notes that they exclude the
            time to change trains. JR East&apos;s N&apos;EX pages publish only the 53-minute Tokyo
            Station figure, so no N&apos;EX time is given for Shinjuku, Shibuya or Yokohama. Not
            sure which area to stay in? Our{" "}
            <Link href="/guides/attractions/where-to-stay-in-tokyo">where to stay in Tokyo guide</Link>{" "}
            compares the neighbourhoods.
          </p>
        </section>

        {/* Alternatives */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The other options</span>
          <h2 className={styles.sectionTitle}>Skyliner vs N&apos;EX vs Access Express vs Limousine Bus</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["From Narita", "Time", "Adult fare", "Worth knowing", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {alternativeRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Train rows from keisei.co.jp and jreast.co.jp. The bus row is from the operator&apos;s
            own line pages at limousinebus.co.jp, read for our{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">Tokyo airport limousine bus guide</Link>{" "}
            on {BUS_CHECKED}, which lists every route and the two-bag hold rule.
          </p>
        </section>

        {/* Which is cheaper */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>Which Is Cheaper, Skyliner or Narita Express?</h2>
          <p className={styles.bodyText}>
            <strong>One way, the Skyliner: ¥2,580, or ¥2,310 bought online, against ¥3,140 for the
            N&apos;EX to Tokyo Station.</strong> The Skyliner fare is a ¥1,280 base fare plus a
            ¥1,300 Liner ticket (¥2,567 if you tap an IC card for the base fare), and children pay
            ¥1,290. The N&apos;EX is ¥3,140 to Tokyo, ¥3,330 to Shinagawa, Shibuya or Shinjuku,
            and ¥4,480 to Yokohama in an Ordinary car.
          </p>
          <p className={styles.bodyText}>
            Round trips narrow the gap. Keisei&apos;s online return is ¥4,500 (¥2,240 a child) and
            can only be exchanged at the two airport stations. JR East&apos;s N&apos;EX TOKYO Round
            Trip Ticket is ¥5,200 (¥2,600 a child) for foreign passport holders: one ride in, one
            ride out, within 14 days, against regular returns of ¥6,280 to Tokyo, ¥6,660 to
            Shinjuku or Shibuya and ¥8,960 to Yokohama. Because it covers any JR station in its
            Tokyo area without leaving the gates, a west-side hotel can make the ¥5,200 N&apos;EX
            ticket the cheaper door-to-door choice, once the Skyliner&apos;s onward fare from
            Nippori is added. Read on {CHECKED}.
          </p>
        </section>

        {/* JR Pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Is the N&apos;EX Covered by the JR Pass?</h2>
          <p className={styles.bodyText}>
            <strong>Yes — the N&apos;EX is a JR East limited express, and the JAPAN RAIL PASS
            covers all JR Group limited express trains; the Skyliner is not covered.</strong> The
            pass&apos;s own scope page names the exceptions (NOZOMI and MIZUHO, Gran Class, and
            the non-JR sections of through trains), and the Narita Express is not among them. JR
            East states that reserved Ordinary seats are available to pass holders at no extra
            charge, from a ticket office, a reserved-seat machine or online; the Green Car is not
            included.
          </p>
          <p className={styles.bodyText}>
            The pass price went up for agency purchases on 1 October 2026: a 7-day Ordinary pass
            is ¥50,000 on the official site and ¥53,000 from an overseas agency. Whether it pays
            for itself is a question of the whole trip rather than the airport ride — our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> has the break-even
            calculator. Read on japanrailpass.net and jreast.co.jp on {CHECKED}.
          </p>
        </section>

        {/* Book in advance */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do I Need to Book the Skyliner in Advance?</h2>
          <p className={styles.bodyText}>
            <strong>You need a seat ticket before boarding, but not before you fly.</strong> Keisei
            runs the Skyliner as all-reserved, puts seats on sale one month before the travel date,
            and sells them at the Skyliner ticket counters in the airport stations on the day. With three Skyliners an
            hour, a sold-out train usually means waiting for the next one rather than giving up on
            the Skyliner.
          </p>
          <p className={styles.bodyText}>
            What booking ahead actually buys is the price and the queue: ¥2,310 online instead of
            ¥2,580 at the counter, and an e-ticket instead of a line at the arrivals station. The
            N&apos;EX works the same way — seats from one month out, and an unreserved-seat ticket
            at the same price if you would rather not commit to a train. The round-trip tickets for
            both have to be collected at a Narita airport station. Read on {CHECKED}.
          </p>
        </section>

        {/* Shinjuku */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shinjuku</span>
          <h2 className={styles.sectionTitle}>Skyliner or N&apos;EX to Shinjuku?</h2>
          <p className={styles.bodyText}>
            <strong>The N&apos;EX: Shinjuku is one of its stops, ¥3,330 with no change.</strong>{" "}
            The Skyliner ends at Ueno, so reaching Shinjuku means changing to JR at Nippori — a
            cheaper ticket, a second train and a transfer with your luggage. The same logic applies
            to Shibuya, which the N&apos;EX also serves directly at ¥3,330. If you are coming back
            through Narita within 14 days on a foreign passport, the ¥5,200 round trip is the
            ticket to price first. Read on {CHECKED}.
          </p>
        </section>

        {/* Cheapest */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On a budget</span>
          <h2 className={styles.sectionTitle}>What Is the Cheapest Way from Narita to Tokyo?</h2>
          <p className={styles.bodyText}>
            <strong>By train, Keisei&apos;s Access Express: the Skyliner&apos;s line without the
            ¥1,300 Liner ticket, 50 minutes to Asakusa with no change.</strong> You give up the
            guaranteed seat and the luggage space, which on a commuter train at rush hour is a real
            trade with a big case. With a guaranteed seat, the cheapest option is the Skyliner at
            ¥2,310 bought online. The Airport Limousine Bus is ¥3,100 to Tokyo Station and ¥3,600
            to Shinjuku — dearer than either train but the only one that takes your bags off you;
            our{" "}
            <Link href="/guides/transport/tokyo-airport-limousine-bus">limousine bus guide</Link>{" "}
            has every route. Train figures read on {CHECKED}; bus figures on {BUS_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Once you are in the city, neither airport ticket covers the Tokyo Metro or Toei subway.
            Our{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket">Tokyo Subway Ticket guide</Link>{" "}
            works out when the 24/48/72-hour pass pays, and the{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3-day itinerary</Link>{" "}
            starts from either side of the city.
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

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {[
              { href: "/guides/transport/tokyo-airport-transfer", title: "Tokyo Airport Transfer Guide (2026): Narita & Haneda to the City" },
              { href: "/guides/transport/tokyo-airport-limousine-bus", title: "Tokyo Airport Limousine Bus (2026): Narita & Haneda Fares, Times and Stops" },
              { href: "/guides/transport/jr-pass-guide", title: "JR Pass Guide 2026: Is It Worth It for Your Japan Trip?" },
              { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo (2026): Best Areas Compared" },
              { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3 Day Itinerary (2026): What to Book, in What Order" },
              { href: "/guides/attractions/tokyo-subway-ticket", title: "Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?" },
              { href: "/guides/transport", title: "All Japan Transport Guides →" },
            ].map((g) => (
              <Link key={g.href} href={g.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="14" rx="3" />
                    <line x1="4" y1="10" x2="20" y2="10" />
                    <path d="M7 21l2-4M17 21l-2-4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{g.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the train that matches your station</h2>
            <p className={styles.ctaBannerDesc}>
              Ueno, Nippori or Asakusa: the Skyliner. Tokyo Station, Shinjuku, Shibuya or Yokohama:
              the N&apos;EX. Both are seat bookings for a specific train — check the cancellation
              terms shown for your date before you pay.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={keiseiSkylinerUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Skyliner ticket on Klook →
              </KlookLink>
              <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                N&apos;EX round trip →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
