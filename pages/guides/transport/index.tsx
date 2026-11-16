import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import GuideHub from "../../../components/GuideHub";
import KlookTripPrep from "../../../components/KlookTripPrep";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import { transportArticles, transportCategory } from "../../../lib/guides-transport";
import { jrPassWholeJapan, tokyoSubwayTicket, transportHubArrivalPrep } from "../../../lib/klook-links";
import { articleDates, pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, hubItemListJsonLd } from "../../../lib/structured-data";
import styles from "../../../styles/BestEsimJapan.module.css";

const ROUTE = "/guides/transport";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE), dates: articleDates(transportArticles.map((a) => a.href)) },
});

const L = { color: "var(--text)", fontWeight: 600 } as const;
const muted = { marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" } as const;
const td = { fontSize: "0.82rem", color: "var(--text)" } as const;

// task-jtk-20261116-R06: the hub answers "Japan transportation — what does it cost, and
// which pass do I buy". Every fare below is the figure already printed (and dated) on the
// guide the row links to; the Tokyo Metro, N'EX, JR Tokyo Wide Pass and JAPAN RAIL PASS
// figures were re-read on the official sites on 16 Nov 2026. Title ≤ 60 characters
// without the site-name suffix.
const TITLE = "Japan Transportation Guide 2026: Costs, Passes & IC Cards";
const H1 = "Japan Transportation Guide 2026: Costs, Passes and IC Cards";
const DESC =
  "Transportation in Japan cost, 2026: subway ¥178, Tokyo–Kyoto shinkansen ¥13,970, JR Pass ¥53,000. Japan transportation fare table, which pass to buy.";

/**
 * Sources, and the date each was read:
 *   - tokyometro.jp/en/ticket/regular/index.html — 1–6 km ¥180 ticket / ¥178 IC, up to
 *     ¥330 / ¥324 for 28–40 km. Re-read 16 Nov 2026.
 *   - jreast.co.jp/multi/en/nex/tickets/ — N'EX Narita–Tokyo ¥3,140, Shinagawa / Shibuya /
 *     Shinjuku ¥3,330; JR TOKYO Wide Pass ¥16,000 (3 days). Re-read 16 Nov 2026.
 *   - japanrailpass.net/en/purchase/price/ — 7-day Ordinary ¥53,000 as an Exchange Order,
 *     ¥50,000 bought online; 14-day ¥84,000 / ¥80,000. Re-read 16 Nov 2026. JNTO reports the
 *     ¥50,000 → ¥53,000 revision as effective 1 October 2026 (jr-pass-guide).
 *   - smart-ex.jp smartEX fare list — Tokyo–Kyoto ¥13,970 reserved on a Nozomi; about 2h15
 *     per JR Central Tours (tokyo-to-kyoto, read 7 Nov 2026; kyoto-to-tokyo-shinkansen 11 Nov).
 *   - keisei.co.jp — Skyliner ¥2,580, 41 min to Keisei-Ueno (skyliner-vs-nex, 13 Nov 2026).
 *   - keikyu.co.jp — Haneda T3 to Shinagawa ¥330, 11 min (tokyo-airport-transfer, 25 Oct 2026).
 *   - westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/ — HARUKA One-way Ticket
 *     ¥1,900 to Osaka / Shin-Osaka; nankai.co.jp/en_railway/ticket/rapit — Rapi:t Digital
 *     Ticket ¥1,410 regular seat. Both re-read 16 Nov 2026. Times (about 45 min, from 34 min)
 *     from haruka-vs-nankai-rapit (8 Nov 2026).
 *   - nishinihonjrbus.co.jp top page, 16 Nov 2026: Kansai–Tokyo night routes "2,500 円〜".
 *   - subway.osakametro.co.jp — ¥240 for a 3–7 km ride such as Umeda–Namba (osaka-metro-pass,
 *     11 Nov 2026).
 *   - city.kyoto.lg.jp/kotsu — city bus flat fare ¥230 (kyoto-transportation, 5 Nov 2026).
 *   - West JR Bus — Tokyo–Kyoto night bus ¥3,300–¥12,500, limited fare from ¥2,500, about
 *     7–8 hours (tokyo-to-kyoto, 7 Nov 2026).
 */
const CHECKED = "2026-11-16";

type FareRow = {
  mode: string;
  route: string;
  fare: string;
  time: string;
  guide: ReactNode;
  source: { href: string; label: string; checked: string };
};

const fareRows: FareRow[] = [
  {
    mode: "Subway, Tokyo",
    route: "Tokyo Metro, 1–6 km (most hops between central stations)",
    fare: "¥178 on an IC card, ¥180 ticket (up to ¥324 / ¥330 for 28–40 km)",
    time: "A few minutes per hop",
    guide: <Link href="/guides/transport/tokyo-transportation" style={L}>Tokyo transportation</Link>,
    source: { href: "https://www.tokyometro.jp/en/ticket/regular/index.html", label: "tokyometro.jp", checked: "2026-11-16" },
  },
  {
    mode: "Subway, Osaka",
    route: "Osaka Metro Midosuji Line, Umeda → Namba (3–7 km)",
    fare: "¥240",
    time: "About 7 min",
    guide: <Link href="/guides/transport/osaka-transportation" style={L}>Osaka transportation</Link>,
    source: { href: "https://subway.osakametro.co.jp/en/guide/page/enjoy-eco.php", label: "subway.osakametro.co.jp", checked: "2026-11-11" },
  },
  {
    mode: "City bus, Kyoto",
    route: "Kyoto City Bus, anywhere in the flat-fare area",
    fare: "¥230 adult, ¥120 child",
    time: "Traffic-dependent",
    guide: <Link href="/guides/transport/kyoto-transportation" style={L}>Kyoto transportation</Link>,
    source: { href: "https://www2.city.kyoto.lg.jp/kotsu/webguide/en/", label: "city.kyoto.lg.jp", checked: "2026-11-05" },
  },
  {
    mode: "Shinkansen",
    route: "Tokyo → Kyoto, Nozomi, reserved seat",
    fare: "¥13,970 one way (smartEX, adult, regular season)",
    time: "About 2 h 15 min, no change",
    guide: <Link href="/guides/transport/tokyo-to-kyoto" style={L}>Tokyo to Kyoto</Link>,
    source: { href: "https://smart-ex.jp/en/", label: "smart-ex.jp", checked: "2026-11-07" },
  },
  {
    mode: "Airport train, Narita",
    route: "Keisei Skyliner, Narita → Keisei-Ueno",
    fare: "¥2,580 (¥2,567 on an IC card)",
    time: "41 min",
    guide: <Link href="/guides/transport/skyliner-vs-nex" style={L}>Skyliner vs N&apos;EX</Link>,
    source: { href: "https://www.keisei.co.jp/keisei/tetudou/skyliner/us/", label: "keisei.co.jp", checked: "2026-11-13" },
  },
  {
    mode: "Airport train, Narita",
    route: "Narita Express (N'EX), Narita → Tokyo Station",
    fare: "¥3,140 (¥3,330 to Shinagawa, Shibuya or Shinjuku)",
    time: "From 53 min",
    guide: <Link href="/guides/transport/tokyo-airport-transfer" style={L}>Tokyo airport transfer</Link>,
    source: { href: "https://www.jreast.co.jp/multi/en/nex/tickets/", label: "jreast.co.jp", checked: "2026-11-16" },
  },
  {
    mode: "Airport train, Haneda",
    route: "Keikyu Airport Line, Haneda Terminal 3 → Shinagawa",
    fare: "¥330 (¥327 on an IC card)",
    time: "11 min",
    guide: <Link href="/guides/transport/tokyo-airport-transfer" style={L}>Tokyo airport transfer</Link>,
    source: { href: "https://www.haneda-tokyo-access.com/en/", label: "Keikyu (haneda-tokyo-access.com)", checked: "2026-10-25" },
  },
  {
    mode: "Airport train, Kansai",
    route: "JR Haruka, Kansai Airport → Osaka Station / Nankai Rapi:t → Namba",
    fare: "¥1,900 (HARUKA One-way Ticket) / ¥1,410 (Rapi:t Digital Ticket)",
    time: "About 45 min / from 34 min",
    guide: <Link href="/guides/transport/haruka-vs-nankai-rapit" style={L}>Haruka vs Rapi:t</Link>,
    source: { href: "https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/", label: "westjr.co.jp · nankai.co.jp", checked: "2026-11-16" },
  },
  {
    mode: "Highway bus",
    route: "Tokyo → Kyoto overnight (West JR Bus Seishun Eco Dream)",
    fare: "¥3,300–¥12,500 by date; limited fare from ¥2,500",
    time: "About 7–8 hours",
    guide: <Link href="/guides/transport/tokyo-to-kyoto" style={L}>Tokyo to Kyoto</Link>,
    source: { href: "https://www.nishinihonjrbus.co.jp/", label: "West JR Bus", checked: "2026-11-07" },
  },
];

type PassRow = { trip: string; pass: string; price: string; guide: ReactNode };

const passRows: PassRow[] = [
  {
    trip: "Tokyo only, 3+ subway rides a day",
    pass: "Tokyo Subway Ticket (all Metro and Toei lines)",
    price: "¥1,000 / ¥1,500 / ¥2,000 for 24 / 48 / 72 hours",
    guide: <Link href="/guides/attractions/tokyo-subway-ticket" style={L}>Tokyo Subway Ticket</Link>,
  },
  {
    trip: "Tokyo plus day trips to Nikko, Karuizawa or Mt. Fuji",
    pass: "JR TOKYO Wide Pass",
    price: "¥16,000 for 3 days",
    guide: <Link href="/guides/transport/tokyo-wide-pass" style={L}>JR Tokyo Wide Pass</Link>,
  },
  {
    trip: "Tokyo → Kyoto → Osaka and back, one week",
    pass: "Usually no JR Pass — single shinkansen tickets",
    price: "About ¥28,250 in Hikari fares against a ¥53,000 pass",
    guide: <Link href="/guides/transport/jr-pass-guide" style={L}>JR Pass guide</Link>,
  },
  {
    trip: "Tokyo + Hiroshima + Kanazawa or more long legs in 7 days",
    pass: "JAPAN RAIL PASS",
    price: "¥53,000 (7 days, agency) or ¥50,000 bought online",
    guide: <Link href="/guides/transport/jr-pass-guide" style={L}>JR Pass guide</Link>,
  },
  {
    trip: "Osaka, Kyoto, Nara and Kobe, with the Haruka from the airport",
    pass: "JR Kansai Area Pass",
    price: "¥2,700 (1 day) to ¥6,700 (4 days)",
    guide: <Link href="/guides/attractions/kansai-area-pass" style={L}>Kansai Area Pass</Link>,
  },
  {
    trip: "A Tokyo → Kanazawa → Kyoto/Osaka loop",
    pass: "JR Hokuriku Arch Pass",
    price: "¥35,000 for 7 days",
    guide: <Link href="/guides/transport/hokuriku-arch-pass" style={L}>Hokuriku Arch Pass</Link>,
  },
  {
    trip: "Fukuoka, Beppu, Nagasaki or Kagoshima",
    pass: "JR Kyushu Rail Pass",
    price: "Northern ¥15,000 / ¥17,000; All Kyushu ¥22,000–¥26,000",
    guide: <Link href="/guides/transport/jr-kyushu-rail-pass" style={L}>JR Kyushu Rail Pass</Link>,
  },
  {
    trip: "Osaka sightseeing day on the subway",
    pass: "Enjoy Eco Card (Osaka Metro 1-day pass)",
    price: "¥820 weekdays, ¥620 weekends",
    guide: <Link href="/guides/transport/osaka-metro-pass" style={L}>Osaka Metro Pass</Link>,
  },
  {
    trip: "Kyoto temples by subway and city bus, 5+ rides",
    pass: "Subway & Bus 1-Day Pass",
    price: "¥1,100 adult",
    guide: <Link href="/guides/transport/kyoto-subway-bus-pass" style={L}>Kyoto Subway and Bus Pass</Link>,
  },
];

const faqItems = [
  {
    q: "How much does transportation in Japan cost per day?",
    a: "Inside one city, a few hundred yen to about ¥1,000: a Tokyo Metro hop is ¥178 on an IC card, an Osaka Metro ride from Umeda to Namba ¥240 and a Kyoto city bus ¥230, so three or four rides come to roughly ¥550–¥1,000. A city day pass caps it — ¥1,000 for the 24-hour Tokyo Subway Ticket, ¥820 for Osaka's Enjoy Eco Card on a weekday, ¥1,100 for Kyoto's Subway & Bus 1-Day Pass. A day that includes a shinkansen leg is far more: Tokyo to Kyoto is ¥13,970 one way on a reserved Nozomi. Fares from the operators, read 5–16 Nov 2026.",
  },
  {
    q: "Is the JR Pass worth it in 2026?",
    a: "Only for a week of long JR legs. The 7-day Ordinary pass is ¥53,000 as an Exchange Order from an overseas agency (¥50,000 bought on the official site, read on japanrailpass.net on 2026-11-16), while a Tokyo–Kyoto–Osaka–Tokyo loop on the Hikari is about ¥28,250 in shinkansen fares. The pass pays off when the covered JR fares in that week pass ¥53,000 — for example Tokyo ⇄ Hiroshima plus Tokyo ⇄ Kanazawa.",
  },
  {
    q: "Do I need an IC card in Japan?",
    a: "Yes, for almost every trip a JR Pass or a shinkansen ticket does not cover. A Suica, PASMO or ICOCA pays subways, private railways and city buses with one tap, and all ten national IC cards have been usable in each other's areas since 23 March 2013. On an iPhone you can add one in Apple Wallet with no deposit; a plastic Suica or PASMO takes a ¥500 deposit, refunded when you hand it in.",
  },
  {
    q: "What is the cheapest way to get from the airport to Tokyo?",
    a: "From Haneda, the Keikyu Airport Line: ¥330 to Shinagawa in 11 minutes from Terminal 3 (¥327 on an IC card). From Narita, the Keisei Main Line Limited Express is cheapest at ¥1,060 to Keisei-Ueno (the Access Express is ¥1,280); the Skyliner is ¥2,580 in 41 minutes and the N'EX ¥3,140 to Tokyo Station from 53 minutes (N'EX re-read on jreast.co.jp on 2026-11-16).",
  },
  {
    q: "Which Japan rail pass should I buy?",
    a: "Match the pass to the region, not to the trip length. Tokyo only: the Tokyo Subway Ticket (¥1,000–¥2,000). Tokyo plus Nikko or Karuizawa: the ¥16,000 JR Tokyo Wide Pass. Osaka–Kyoto–Nara: the JR Kansai Area Pass (¥2,700–¥6,700). A Tokyo–Kanazawa–Kyoto loop: the ¥35,000 Hokuriku Arch Pass. Several long shinkansen legs in one week: the ¥53,000 JAPAN RAIL PASS.",
  },
];

export default function GuidesTransportPage({ updated, dates }: { updated: PageUpdated; dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport & Getting Around", item: "https://www.japan-travel-kit.com/guides/transport" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: hubItemListJsonLd(transportCategory, DESC) }}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: H1, description: DESC, updated }) }}
        />
      </Head>

      <GuideHub
        category={transportCategory}
        heading={H1}
        heroDesc="Transportation in Japan, priced: what a subway ride, a shinkansen seat and the airport train cost, which pass fits your route, and how IC cards pay the rest."
        dates={dates}
        lead={
          <>
            <section className={styles.bodySection} style={{ marginBottom: "2rem" }}>
              <p className={styles.bodyText}>
                A Tokyo subway ride costs <strong>¥178</strong> on an IC card, a reserved Nozomi shinkansen from{" "}
                <strong>Tokyo to Kyoto ¥13,970</strong> one way (about 2 hours 15 minutes), and the airport train into
                Tokyo <strong>¥330</strong> from Haneda or <strong>¥2,580–¥3,140</strong> from Narita on the Skyliner or
                N&apos;EX. The 7-day <strong>JAPAN RAIL PASS is ¥53,000</strong> from an overseas agency since the
                1 October 2026 revision (¥50,000 bought on the official site). For one week on Tokyo, Kyoto and Osaka,
                buy single shinkansen tickets plus an IC card; buy the JR Pass only when the week adds long legs such as
                Hiroshima or Kanazawa, and a regional pass when you stay in one area.
              </p>
              <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
                Tokyo Metro, N&apos;EX and JR Pass prices re-read on the official sites on {CHECKED}; the other fares are
                the dated figures on the guide each row links to.
              </p>
              <p className={styles.bodyText}>
                This page covers Japan as a whole. For the trains inside one city — JR from ¥155 and Tokyo Metro
                from ¥178 on an IC card, and about ¥620–¥840 for a day of four rides — see{" "}
                <Link href="/guides/transport/tokyo-transportation">how to get around Tokyo</Link>.
              </p>
            </section>
            <KlookTripPrep
              label="Before you land"
              heading="What to book before you arrive"
              intro="The airport leg and a regional pass are the two transport bookings that can be fixed before the flight; data on your phone is what makes the rest work."
              items={transportHubArrivalPrep}
            />
          </>
        }
        picks={
          <>
            {/* Fare table — first row is the conclusion. */}
            <section className={styles.comparisonSection} style={{ marginTop: "2.5rem" }}>
              <span className={styles.sectionLabel}>Fares</span>
              <h2 className={styles.sectionTitle}>How much does transportation in Japan cost?</h2>
              <p className={styles.bodyText}>
                City rides are a few hundred yen; the shinkansen and the airport trains are where the money goes. Each
                row is one typical leg, with the guide that explains it.
              </p>
              <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Mode</th>
                        <th>Typical route</th>
                        <th>Adult fare</th>
                        <th>Time</th>
                        <th>Guide</th>
                        <th>Official source (checked)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.tdProvider} style={{ minWidth: "150px" }}>In short</td>
                        <td style={{ ...td, minWidth: "200px" }}>City ride vs long distance</td>
                        <td style={{ ...td, minWidth: "200px" }}>
                          ¥178–¥240 a city ride; ¥13,970 Tokyo–Kyoto by shinkansen; ¥330–¥3,140 from the airport
                        </td>
                        <td style={{ ...td, minWidth: "120px" }}>—</td>
                        <td style={{ fontSize: "0.82rem", minWidth: "140px" }}>
                          <Link href="/guides/transport/jr-pass-guide" style={L}>JR Pass guide</Link>
                        </td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Rows below</td>
                      </tr>
                      {fareRows.map((row) => (
                        <tr key={row.route}>
                          <td className={styles.tdProvider} style={{ minWidth: "150px" }}>{row.mode}</td>
                          <td style={{ ...td, minWidth: "200px" }}>{row.route}</td>
                          <td style={{ ...td, minWidth: "200px" }}>{row.fare}</td>
                          <td style={{ ...td, minWidth: "120px" }}>{row.time}</td>
                          <td style={{ fontSize: "0.82rem", minWidth: "140px" }}>{row.guide}</td>
                          <td style={{ fontSize: "0.82rem", minWidth: "140px" }}>
                            <a href={row.source.href} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>
                              {row.source.label}
                            </a>{" "}
                            <span style={{ color: "var(--text-muted)" }}>({row.source.checked})</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className={styles.bodyText} style={muted}>
                Last checked: {CHECKED}. Official pages: tokyometro.jp/en/ticket/regular/ · jreast.co.jp/multi/en/nex/tickets/ ·
                westjr.co.jp (HARUKA One-way Ticket) · nankai.co.jp (Rapi:t Digital Ticket) · japanrailpass.net/en/purchase/price/
                (re-read {CHECKED}); smart-ex.jp · keisei.co.jp · Keikyu · subway.osakametro.co.jp · city.kyoto.lg.jp/kotsu ·
                West JR Bus, on the date in each row. Adult fares, one way. Shinkansen fares rise in peak season; the bus fare depends on the date.
              </p>
              <p className={styles.bodyText}>
                To see where these fares sit in a whole day — room, meals and one sight included — our{" "}
                <Link href="/guides/money/japan-travel-budget" style={L}>Japan travel budget per day</Link> adds them
                up by travel style and by city.
              </p>
            </section>

            {/* Which-pass table — first row is the conclusion. */}
            <section className={styles.comparisonSection} style={{ marginTop: "2.5rem" }}>
              <span className={styles.sectionLabel}>Passes</span>
              <h2 className={styles.sectionTitle}>Which Japan rail pass should I buy?</h2>
              <p className={styles.bodyText}>
                Pick by region: a city pass for a city stay, a regional JR pass for one area, and the nationwide JR Pass
                only for a week of long legs.
              </p>
              <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Your trip</th>
                        <th>Buy</th>
                        <th>Price (adult)</th>
                        <th>Read next</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.tdProvider} style={{ minWidth: "180px" }}>In short</td>
                        <td style={{ ...td, minWidth: "200px" }}>
                          Regional pass + IC card for most trips; the nationwide JR Pass only for several long legs in 7 days
                        </td>
                        <td style={{ ...td, minWidth: "160px" }}>¥53,000 is the JR Pass bar to beat</td>
                        <td style={{ fontSize: "0.82rem", minWidth: "140px" }}>
                          <Link href="/guides/transport/ic-cards-japan" style={L}>IC cards in Japan</Link>
                        </td>
                      </tr>
                      {passRows.map((row) => (
                        <tr key={row.trip}>
                          <td className={styles.tdProvider} style={{ minWidth: "180px" }}>{row.trip}</td>
                          <td style={{ ...td, minWidth: "200px" }}>{row.pass}</td>
                          <td style={{ ...td, minWidth: "160px" }}>{row.price}</td>
                          <td style={{ fontSize: "0.82rem", minWidth: "140px" }}>{row.guide}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className={styles.bodyText} style={muted}>
                Last checked: {CHECKED} for the JAPAN RAIL PASS (japanrailpass.net/en/purchase/price/) and the JR TOKYO Wide
                Pass (jreast.co.jp/multi/en/nex/tickets/). Other prices as dated on each linked guide: tokyometro.jp,
                westjr.co.jp, jrkyushu.co.jp, subway.osakametro.co.jp, city.kyoto.lg.jp/kotsu. The ¥28,250 loop is
                Tokyo–Kyoto ¥13,850 plus Shin-Osaka–Tokyo ¥14,400 at JR&apos;s window fares on the Hikari.
              </p>
            </section>

            {/* Question sections, each answered in the first sentence */}
            <section className={styles.bodySection}>
              <h2 className={styles.sectionTitle}>Is the JR Pass worth it in 2026?</h2>
              <p className={styles.bodyText}>
                {faqItems[1].a} The{" "}
                <Link href="/guides/transport/shinkansen-guide" style={L}>shinkansen guide</Link> explains Nozomi, Hikari
                and reserved seats; the pass only covers the Nozomi with the extra NOZOMI MIZUHO Ticket.
              </p>
            </section>
            <section className={styles.bodySection}>
              <h2 className={styles.sectionTitle}>Do I need an IC card in Japan?</h2>
              <p className={styles.bodyText}>
                {faqItems[2].a} Which card to get at which airport is in{" "}
                <Link href="/guides/transport/ic-cards-japan" style={L}>IC cards in Japan</Link>.
              </p>
            </section>
            <section className={styles.bodySection}>
              <h2 className={styles.sectionTitle}>What is the cheapest way to get from the airport to Tokyo?</h2>
              <p className={styles.bodyText}>
                {faqItems[3].a} Every option from both airports, with the hotel area each suits, is in the{" "}
                <Link href="/guides/transport/tokyo-airport-transfer" style={L}>Tokyo airport transfer</Link> guide; for
                Kansai Airport, see{" "}
                <Link href="/guides/transport/osaka-airport-transfer" style={L}>Osaka airport transfer</Link>.
              </p>
            </section>

            <PartnerPick
              label="Ready to book"
              heading="Rail and subway passes on Klook"
              cta={{ href: jrPassWholeJapan.url, label: "Check JR Pass options on Klook →" }}
            >
              Once{" "}
              <Link href="/guides/transport/jr-pass-guide" style={L}>our JR Pass guide</Link>{" "}
              has shown the pass pays off on your route, Klook sells the{" "}
              <PartnerTextLink href={jrPassWholeJapan.url}>7, 14 or 21 day JAPAN RAIL PASS</PartnerTextLink>. Our{" "}
              <Link href="/guides/transport/kyoto-to-tokyo-shinkansen" style={L}>Kyoto to Tokyo train guide</Link>{" "}
              shows what the pass covers on the busiest single leg, with the Nozomi ticket priced, and our{" "}
              <Link href="/guides/transport/tokyo-to-kanazawa" style={L}>Tokyo to Kanazawa shinkansen guide</Link>{" "}
              weighs it against the{" "}
              <Link href="/guides/transport/hokuriku-arch-pass" style={L}>Hokuriku Arch Pass</Link>{" "}
              on the Kagayaki — the 7-day pass for a Tokyo → Kanazawa → Osaka loop. For a stay
              based in the capital, the{" "}
              <PartnerTextLink href={tokyoSubwayTicket.url}>Tokyo Subway Ticket</PartnerTextLink> covers all Tokyo Metro
              and Toei Subway lines for 24, 48 or 72 hours;{" "}
              how many rides make the{" "}
              <Link href="/guides/attractions/tokyo-subway-ticket" style={L}>Tokyo Subway Ticket</Link>{" "}
              worth it
              is worked out against the official fares. On a day of only a few rides, tapping{" "}
              <Link href="/guides/transport/ic-cards-japan" style={L}>an IC card such as Suica, PASMO or ICOCA</Link>{" "}
              usually comes out cheaper than a pass. Landing at Narita, our{" "}
              <Link href="/guides/transport/skyliner-vs-nex" style={L}>Skyliner vs N&apos;EX comparison</Link>{" "}
              picks the airport train by the area your hotel is in, and landing at Kansai, our{" "}
              <Link href="/guides/transport/haruka-vs-nankai-rapit" style={L}>Haruka vs Nankai Rapi:t comparison</Link>{" "}
              does the same — the Rapi:t to Namba in a minimum of 34 minutes, the Haruka to Tennoji, Osaka,
              Shin-Osaka and Kyoto. If you will ride JR between Kansai cities too, our{" "}
              <Link href="/guides/attractions/kansai-area-pass" style={L}>JR Kansai Area Pass guide</Link>{" "}
              prices the 1-to-4-day pass, HARUKA included, against the singles. For the train out to Nara, the{" "}
              <Link href="/guides/attractions/nara-day-trip" style={L}>Nara day trip guide</Link>{" "}
              compares the Kintetsu and JR runs from Osaka and Kyoto. In Osaka, our{" "}
              <Link href="/guides/transport/osaka-metro-pass" style={L}>Osaka Metro Pass and Enjoy Eco Card guide</Link>{" "}
              works out how many subway rides the 1-day pass needs to pay off.
            </PartnerPick>

            <section className={styles.faqSection} style={{ marginTop: "3rem" }}>
              <span className={styles.sectionLabel}>FAQ</span>
              <h2 className={styles.sectionTitle}>Japan transportation FAQ</h2>
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
          </>
        }
      />
    </>
  );
}
