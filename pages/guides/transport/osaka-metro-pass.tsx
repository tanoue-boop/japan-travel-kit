import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

const METRO_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1267428&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F11515-osaka-metro-1-2-day-pass-osaka%2F";

const CHECKED = "20 October 2026";

const TITLE = "Osaka Metro Pass 2026: Price, 1-Day vs 2-Day & Enjoy Eco Card Compared";
const DESCRIPTION =
  "Osaka Metro Pass price for 2026: ¥820/¥620 for one day, ¥1,200 for 30 hours, ¥310 for children. This guide compares it with the Enjoy Eco Card, lists pick-up points and the buses it does not cover.";

/** Rows = passes, so the Osaka Amazing Pass sits in the same table. Prices checked 2026-10-20. */
const passRows = [
  {
    pass: "Osaka Metro Pass — 1 day",
    sub: "Sold as the Enjoy Eco Card at machines, or as a QR ticket",
    adult: "¥820 weekdays / ¥620 Sat, Sun & holidays",
    child: "¥310",
    valid: "First service to last service on the day of use",
    covers: "All Osaka Metro lines except Yumeshima Station, plus Osaka City Bus (some routes excluded)",
  },
  {
    pass: "Yoh-okoshi 30h Pass",
    sub: "The nearest thing to a 2-day Osaka Metro Pass in 2026",
    adult: "¥1,200",
    child: "¥600",
    valid: "30 hours from the first tap, so it spans two calendar days",
    covers: "All Osaka Metro lines including Yumeshima Station — no buses at all",
  },
  {
    pass: "Osaka Amazing Pass — 1 day",
    sub: "Travel plus free admissions",
    adult: "¥2,500",
    child: "Not sold",
    valid: "The day of use",
    covers: "Osaka Metro and Osaka City Bus, plus free entry to more than 40 facilities",
  },
  {
    pass: "Osaka Amazing Pass — 2 day",
    sub: "Travel plus free admissions",
    adult: "¥3,300",
    child: "Not sold",
    valid: "The day of first use and the following day",
    covers: "Osaka Metro and Osaka City Bus, plus free entry to more than 40 facilities",
  },
  {
    pass: "ICOCA (pay as you go)",
    sub: "No pass at all",
    adult: "¥240 for a 2-ku ride",
    child: "Half fare",
    valid: "No expiry",
    covers: "Osaka Metro, JR, private railways and buses — everything, at full fare",
  },
];

const vsRows = [
  { scenario: "One day, on a weekend or holiday", pick: "Enjoy Eco Card", note: "At ¥620 it pays for itself in three ¥240 rides, and anyone can buy it at a station machine." },
  { scenario: "One day, on a weekday",            pick: "Enjoy Eco Card", note: "¥820 breaks even at four rides, and it carries the same discounts as the digital 1-day pass." },
  { scenario: "Travelling with children",         pick: "Enjoy Eco Card", note: "The child price is ¥310 every day of the week — the cheapest child fare of any Osaka pass." },
  { scenario: "An afternoon arrival plus a full next day", pick: "Yoh-okoshi 30h Pass", note: "30 hours from your first tap covers a late start and the whole of the following day, which a calendar-day pass cannot." },
  { scenario: "A day built around museums and decks", pick: "Osaka Amazing Pass", note: "Travel plus more than 40 free admissions for ¥2,500 — worth it only if you actually enter three or more paid sights." },
  { scenario: "Only 2–3 rides in a day",          pick: "ICOCA / Suica",  note: "Pay-as-you-go is cheaper than any day pass at this level of use." },
];

const ecoPoints = [
  {
    title: "Anyone can buy it, and it is the 1-day Osaka Metro Pass",
    desc: `The Enjoy Eco Card and the digital "Osaka Metro / Osaka City Bus 1-day Pass" are the same ticket at the same price — a magnetic card and a QR code. Both are open to residents and tourists alike, with no passport needed. That is why there is no separate, pricier 1-day Osaka Metro Pass to hunt for. Checked ${CHECKED}.`,
  },
  {
    title: "¥820 on weekdays, ¥620 at weekends, ¥310 for children",
    desc: `Osaka Metro lists the adult price as ¥820, falling to ¥620 on Saturdays, Sundays and public holidays, with a flat child price of ¥310 on any day. A 2-ku ride is ¥240, so the weekend card breaks even in three journeys and the weekday card in four. Prices checked ${CHECKED} on subway.osakametro.co.jp.`,
  },
  {
    title: "Discounts at about 20 sightseeing spots",
    desc: (
      <>
        Osaka Metro states that the card gets you an admission discount at <strong>about 20 sightseeing spots</strong> in
        Osaka City when you show it on the date printed on it. Reseller listings sometimes quote 30 — treat the official
        figure of around 20 as the one to plan against, and see our{" "}
        <Link href="/guides/attractions/things-to-do-osaka" style={{ fontWeight: 600 }}>
          things to do in Osaka
        </Link>{" "}
        guide for which sights are worth the entry fee in the first place. Checked {CHECKED}.
      </>
    ),
  },
];

const passPoints = [
  {
    title: "The 26-hour and 48-hour tickets are gone",
    desc: `Most pages still quoting a ¥1,000 1-day or ¥1,800 2-day "Osaka Metro Pass" are describing the Osaka Metro 26-hour and 48-hour tickets. Osaka Metro ended sales of both on 30 September 2026. If you see those prices quoted for 2026 travel, the page is out of date. Checked ${CHECKED}.`,
  },
  {
    title: "The Yoh-okoshi 30h Pass replaced them at ¥1,200",
    desc: `From 1 October 2026 Osaka Metro sells the Yoh-okoshi 30h Pass at ¥1,200 for adults and ¥600 for children, on sale until 30 September 2027. It runs for 30 hours from your first tap rather than to the last train, so an afternoon arrival still gets a full second day out of it. Checked ${CHECKED}.`,
  },
  {
    title: "It reaches Yumeshima, but it does not touch the buses",
    desc: `The 30h Pass covers all Osaka Metro lines including Yumeshima Station on the extended Chuo Line. The trade-off is that Osaka City Bus, the Imazato Liner and on-demand buses are all excluded — the 1-day pass is the one that includes buses. Checked ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much is the Osaka Metro Pass?",
    a: "The 1-day Osaka Metro Pass costs ¥820 for adults on weekdays and ¥620 on Saturdays, Sundays and public holidays, with a child price of ¥310 on any day — that is the Enjoy Eco Card, sold either as a magnetic card or as a digital QR ticket. For longer coverage, the Yoh-okoshi 30h Pass is ¥1,200 for adults and ¥600 for children and runs 30 hours from your first tap. Osaka Metro ended sales of the older 26-hour (¥1,000) and 48-hour (¥1,800) tickets on 30 September 2026, so those prices are no longer current. Prices checked 20 October 2026 on subway.osakametro.co.jp.",
  },
  {
    q: "Where do I pick up the Osaka Metro Pass?",
    a: "If you want the physical 1-day card, buy it on the spot at any Osaka Metro station — the ticket machines, the commuter pass sales offices and the station stands all sell it, so nothing needs collecting. The digital versions, including the Yoh-okoshi 30h Pass, are bought through the SURUTTO QRtto website or the e METRO app and arrive as a QR code with nothing to collect at all. If you book a voucher through a reseller such as Klook instead, you exchange it at an Osaka Metro ticket office or at the Kansai Tourist Information Center in Terminal 1 at Kansai International Airport, and you will be asked for your passport. Checked 20 October 2026.",
  },
  {
    q: "Does the Osaka Metro Pass cover Universal Studios Japan buses?",
    a: "No. Osaka Tourism Bureau lists buses bound for Universal Studios Japan among the routes excluded from the 1-day pass, alongside buses to IKEA Tsuruhama, airport buses and on-demand buses. The Yoh-okoshi 30h Pass excludes every bus route outright. Universal Studios Japan is reached by JR to Universal City Station, which no Osaka Metro pass covers, so budget that fare separately on an ICOCA. Checked 20 October 2026.",
  },
  {
    q: "Osaka Metro Pass or Enjoy Eco Card — which should tourists buy?",
    a: "For a single day there is nothing to choose between them, because the 1-day Osaka Metro Pass is the Enjoy Eco Card: same ¥820 weekday price, same ¥620 weekend price, same ¥310 child price. Buy the card at a station machine if you want to decide on the day, or the QR version if you would rather have it on your phone. The real decision is whether to step up to the ¥1,200 Yoh-okoshi 30h Pass, which is worth it when your sightseeing straddles two calendar days and you can live without the buses.",
  },
  {
    q: "How long is one day on the Osaka Metro Pass?",
    a: "It is a calendar day, not 24 hours. Osaka Tourism Bureau defines the 1-day pass as valid from the first service to the last service on the day you use it, and the 2-day version of a pass as valid from the first service on your first day to the last service the following day. An evening start therefore wastes most of a 1-day pass — which is the gap the 30-hour pass is designed to fill, since its clock starts when you do.",
  },
  {
    q: "Does the Osaka Metro Pass reach Yumeshima?",
    a: "Only the 30-hour pass does. Osaka Metro excludes Yumeshima Station from the Enjoy Eco Card and the digital 1-day pass, because including it would mean repricing the ticket around the ¥90 surcharge on the Cosmosquare–Yumeshima section. With a 1-day pass you pay that section separately — ¥330 for a 2-ku adult ride including the surcharge. The Yoh-okoshi 30h Pass covers all Osaka Metro lines including Yumeshima Station. Checked 20 October 2026.",
  },
  {
    q: "Is a day pass worth it in Osaka?",
    a: "More often than in Tokyo, yes. A 2-ku Osaka Metro ride is ¥240, so the break-even point is four rides for the ¥820 weekday card, three for the ¥620 weekend card, and five for the ¥1,200 30-hour pass. Most sightseeing days clear three or four rides without trying, especially if you are hopping between Umeda, Namba and Tennoji.",
  },
  {
    q: "Can I use ICOCA instead of a day pass?",
    a: "Yes, and for light days it is cheaper. An ICOCA (or a Suica from Tokyo — they are interchangeable) works on the Osaka Metro, JR, private railways and buses on a pay-as-you-go basis, and it is the only option that covers the JR run out to Universal Studios Japan. It is the better choice if you will only take two or three rides. A day pass wins once you are making four or more journeys.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/osaka-metro-pass") } });

export default function OsakaMetroPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" />
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home",      item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides",    item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                { "@type": "ListItem", position: 4, name: "Osaka Metro Pass", item: "https://www.japan-travel-kit.com/guides/transport/osaka-metro-pass" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/osaka-metro-pass",
              headline: TITLE,
              description: DESCRIPTION,
              updated,
            }),
          }}
        />
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
          <span className={styles.breadCurrent}>Osaka Metro Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Metro Pass 2026: Price,<br />1-Day vs 2-Day &amp; Enjoy Eco Card Compared
          </h1>
          <p className={styles.heroSubtitle}>
            The 1-day pass is ¥820, or ¥620 at weekends. The two-day option is now a 30-hour
            pass at ¥1,200. Here is which one to buy, and what neither of them covers.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Official Sources", "Break-Even Maths"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1-day price</p>
                <p className={styles.verdictStatValue}>¥820 / ¥620 weekends</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Two-day option</p>
                <p className={styles.verdictStatValue}>30h Pass, ¥1,200</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Child price</p>
                <p className={styles.verdictStatValue}>¥310 (1-day)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> The 1-day <strong>Osaka Metro Pass is the Enjoy Eco Card</strong> — the same
              ticket at the same ¥820 weekday / ¥620 weekend price, sold as a card at station machines or as a QR code
              on your phone, with children at ¥310. There is no longer a 2-day version: Osaka Metro stopped selling the
              26-hour and 48-hour tickets on 30 September 2026 and replaced them with the{" "}
              <strong>Yoh-okoshi 30h Pass at ¥1,200</strong> (¥600 for children), which runs 30 hours from your first
              tap and covers Yumeshima but no buses. Buy the ¥620–820 1-day card for a single day; step up to the
              ¥1,200 30-hour pass when your sightseeing straddles two calendar days. Only taking two or three rides?
              Use a pay-as-you-go <strong>ICOCA</strong>.
            </p>
            <KlookLink
              href={METRO_URL}
              className={styles.pickCta}
              target="_blank"
              rel="sponsored noopener"
              style={{ marginTop: "1rem", display: "inline-block" }}
            >
              Check Osaka Metro Pass prices on Klook →
            </KlookLink>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              Prices and conditions checked {CHECKED} on subway.osakametro.co.jp, osaka-info.jp and osp.osaka-info.jp.
              For the full rundown on lines, hubs and IC cards, see our{" "}
              <Link href="/guides/transport/osaka-transportation" style={{ fontWeight: 600 }}>getting around Osaka guide</Link>.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Every price in one place</span>
          <h2 className={styles.sectionTitle}>Osaka Metro Pass Prices Compared</h2>
          <p className={styles.bodyText}>
            &quot;Osaka Metro Pass&quot; is a label travellers use rather than an official product name, which is why the
            prices quoted online disagree. These are the tickets actually on sale, with the official figures as of{" "}
            {CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child", "Valid for", "Covers"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>
                        {row.pass}
                        <span style={{ display: "block", fontWeight: 400, fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          {row.sub}
                        </span>
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.valid}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Osaka Metro prices from subway.osakametro.co.jp; Osaka Amazing Pass prices from osp.osaka-info.jp. All
            checked {CHECKED}. The Amazing Pass is a different proposition — travel plus free admissions — and we break
            it down in the{" "}
            <Link href="/guides/attractions/osaka-attractions-pass" style={{ fontWeight: 600 }}>
              Osaka Amazing Pass guide
            </Link>
            .
          </p>
        </section>

        {/* Enjoy Eco Card */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>The 1-day pass</span>
          <h2 className={styles.sectionTitle}>The 1-Day Osaka Metro Pass Is the Enjoy Eco Card</h2>
          <div className={styles.stepsList}>
            {ecoPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Osaka Metro Pass / 30h */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>The two-day question</span>
          <h2 className={styles.sectionTitle}>There Is No 2-Day Osaka Metro Pass Any More</h2>
          <div className={styles.stepsList}>
            {passPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <KlookLink
            href={METRO_URL}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Check Osaka Metro Pass prices on Klook →
          </KlookLink>
        </section>

        {/* How long is a day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Validity</span>
          <h2 className={styles.sectionTitle}>How Long &quot;One Day&quot; Actually Lasts</h2>
          <p className={styles.bodyText}>
            This is the detail that catches people out. Osaka Tourism Bureau defines a 1-day pass as valid{" "}
            <strong>from the first service to the last service on the day you use it</strong> — not 24 hours from your
            first tap. Where a pass is sold in a two-day form, it runs from the first service on your first day of use
            to the last service the following day, and the two days have to be consecutive. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            On the physical Enjoy Eco Card, the date is printed on the card the moment you put it through a gate, and it
            is valid only for that printed date. The digital 1-day pass behaves the same way but adds a purchase window:
            you have 30 days from buying it to start using it.
          </p>
          <p className={styles.bodyText}>
            The <strong>Yoh-okoshi 30h Pass</strong> is the exception, and the reason it is worth knowing about. Its
            30 hours count from your first tap, so a 4pm start on day one still leaves you covered until 10pm on day
            two. If you land at lunchtime and want to start sightseeing straight away — or you are building a trip
            around a{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={{ fontWeight: 600 }}>
              Kyoto and Nara day tour from Osaka
            </Link>{" "}
            with Osaka Metro rides at both ends of it — the rolling clock is worth the extra ¥380 over a weekday 1-day
            card.
          </p>
        </section>

        {/* What it does not cover */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Exclusions</span>
          <h2 className={styles.sectionTitle}>What the Osaka Metro Pass Does Not Cover</h2>
          <p className={styles.bodyText}>
            The 1-day pass covers all Osaka Metro lines and all Osaka City Bus routes, with named exceptions. Osaka
            Tourism Bureau lists the excluded buses as those bound for{" "}
            <strong>IKEA Tsuruhama and Universal Studios Japan, airport buses and on-demand buses</strong>; Osaka Metro
            words it as buses bound for IKEA Tsuruhama and other specific routes set out in the Osaka City Bus
            regulations. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Universal Studios Japan is the exclusion that costs people money, because the park is reached by JR to
            Universal City Station rather than by Osaka Metro at all. No Osaka Metro pass covers that leg, so put it on
            an ICOCA and budget for it separately — our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass" style={{ fontWeight: 600 }}>
              USJ tickets and Express Pass guide
            </Link>{" "}
            covers what the park day itself costs.
          </p>
          <p className={styles.bodyText}>
            <strong>Yumeshima Station</strong> is the other gap. Osaka Metro excludes it from the Enjoy Eco Card and the
            digital 1-day pass, because folding it in would mean repricing the ticket around the ¥90 surcharge on the
            Cosmosquare–Yumeshima section of the Chuo Line. With a 1-day pass you pay that section separately: ¥330 for a
            2-ku adult ride, surcharge included. The Yoh-okoshi 30h Pass does include Yumeshima, but excludes Osaka City
            Bus, the Imazato Liner and on-demand buses outright. Checked {CHECKED}.
          </p>
        </section>

        {/* Which to use */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which to use</span>
          <h2 className={styles.sectionTitle}>Which Pass Fits Your Trip?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip looks like", "Best choice", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vsRows.map((row) => (
                    <tr key={row.scenario}>
                      <td className={styles.tdProvider}>{row.scenario}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)", whiteSpace: "nowrap" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where to buy */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where to Buy and Pick Up Each Pass</h2>
          <p className={styles.bodyText}>
            The <strong>Enjoy Eco Card</strong> needs no advance booking and nothing collecting. Osaka Metro sells it
            inside the stations at three places: the ticket machines, the commuter pass sales offices, and the station
            stands. Decide on the day, based on how much you plan to move around. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The <strong>digital 1-day pass</strong> and the <strong>Yoh-okoshi 30h Pass</strong> are sold through the
            SURUTTO QRtto website and the e METRO app, and arrive as a QR code you hold over the gate reader — again,
            nothing to pick up. The 30h Pass is on sale from 1 October 2026 until 30 September 2027.
          </p>
          <p className={styles.bodyText}>
            If you would rather pay in your own currency before you fly, resellers list a voucher version. Klook sells
            an Osaka Metro 1-day / 2-day tourist pass under activity 11515, and exchange happens at an Osaka Metro
            ticket office or at the Kansai Tourist Information Center in Terminal 1 at Kansai International Airport, with
            your passport. Because the underlying tickets changed on 1 October 2026, check on the product page which
            ticket and which price you are actually buying before you book.
          </p>
          <KlookLink
            href={METRO_URL}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-block" }}
          >
            Check Osaka Metro Pass prices on Klook →
          </KlookLink>
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
            <Link href="/guides/attractions/osaka-castle-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V9l2-2 2 2V5l4-3 4 3v4l2-2 2 2v12z" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Castle Tickets (2026): Prices, Hours and What the Pass Covers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/umeda-sky-building-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="5" height="15" />
                  <rect x="15" y="6" width="5" height="15" />
                  <path d="M4 6h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Umeda Sky Building Tickets (2026): Prices, Hours and the Best Time to Go</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                  <path d="M4 11H2v5l2 2h16l2-2v-5H4Z" />
                  <circle cx="7.5" cy="16.5" r="1.5" />
                  <circle cx="16.5" cy="16.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h18v10H3z" />
                  <path d="M8 7v10M16 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two days in Osaka?</h2>
            <p className={styles.ctaBannerDesc}>
              Compare the voucher price against the ¥1,200 Yoh-okoshi 30h Pass before you book, and check which ticket
              the listing covers.
            </p>
            <KlookLink href={METRO_URL} className={styles.ctaBannerBtn} target="_blank" rel="sponsored noopener">
              Check Osaka Metro Pass prices on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
