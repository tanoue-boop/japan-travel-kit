import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kyotoSubwayBusPassTripPrep } from "../../../lib/klook-links";

/**
 * Sources, all read on 15 November 2026 (Kyoto City Transportation Bureau). Every fare,
 * date and coverage line on this page comes from one of these; the figures match
 * kyoto-transportation (read 5 Nov 2026). No Klook price appears.
 *
 *   city.kyoto.lg.jp/kotsu/page/0000028378  Subway & Bus 1-Day Pass: ¥1,100 / ¥550, valid on
 *                                            the day of use; subway, all city buses (outside the
 *                                            flat-fare area too, EX buses included), Kyoto Bus to
 *                                            Ohara / Iwakura / Ichihara / Daikakuji / Kiyotaki /
 *                                            Kokedera minus seasonal routes 51 (Mt Hiei) and 95
 *                                            (Ohara–Kurama), Keihan Bus (Yamashina / Daigo and the
 *                                            centre), JR Bus Kyoto Sta–Toganoo; sold at info
 *                                            offices, pass offices, bus depots, subway windows,
 *                                            on city buses (can sell out) and as a KANSAI MaaS
 *                                            coupon exchanged at Kyoto Ekimae / Kotochika offices
 *   city.kyoto.lg.jp/kotsu/page/0000028376  Subway 1-Day Pass: ¥800 / ¥400, both lines; subway
 *                                            windows, ticket machines (valid on the day bought
 *                                            only) and info offices
 *   city.kyoto.lg.jp/kotsu/page/0000028337  Bus 1-Day Pass: sales ended 30 Sep 2023, use ended
 *                                            31 Mar 2024
 *   city.kyoto.lg.jp/kotsu/page/0000351261  resident-priority fare (page dated 11 Nov 2026):
 *                                            flat-fare area within FY2027, ¥200 residents,
 *                                            about ¥350–¥400 others, national approval needed;
 *                                            the 1-Day Pass "under consideration"
 *   city.kyoto.lg.jp/kotsu/page/0000324695  IC cards on buses: touch about 1 s when leaving;
 *                                            short balance paid in cash; PiTaPa postpay only
 *   www2.city.kyoto.lg.jp/kotsu/webguide    fare_bus ¥230 / ¥120, EX ¥500 / ¥250; fare_tika
 *                                            ¥220–¥360 (child ¥110–¥180) from 1 Oct 2025
 */
const LAST_CHECKED = "2026-11-15";
const CHECKED = checkedLabel(LAST_CHECKED);
const OFFICIAL_REL = "noopener noreferrer";
const KOTSU = "https://www.city.kyoto.lg.jp/kotsu/page/";

const PASS_URL =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1266287&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F118071-kyoto-city-subway-and-bus-ticket%2F";

const ticketRows = [
  {
    ticket: "Subway & Bus 1-Day Pass",
    price: "¥1,100 (child ¥550)",
    covers: "Both subway lines, every Kyoto City Bus route (EX100 / EX101 included), and set Kyoto Bus, Keihan Bus and JR Bus routes. Valid until the end of service on the day you use it",
    buy: "City Bus & Subway Information Offices, subway station windows, bus depots, on city buses (limited, can sell out), or a KANSAI MaaS coupon exchanged at Kyoto Station",
  },
  {
    ticket: "Subway 1-Day Pass",
    price: "¥800 (child ¥400)",
    covers: "Karasuma Line (Kokusaikaikan–Takeda) and Tozai Line (Rokujizo–Uzumasa Tenjingawa) only. No buses",
    buy: "Subway station windows and ticket machines (a machine ticket is valid only on the day bought), information offices",
  },
  {
    ticket: "Bus 1-Day Pass (the old ¥700 one)",
    price: "Discontinued",
    covers: "Sales ended 30 September 2023; it could not be used after 31 March 2024",
    buy: "Not sold",
  },
  {
    ticket: "ICOCA / Suica (pay per ride)",
    price: "¥230 a bus ride; ¥220–¥360 a subway ride",
    covers: "City buses, both subway lines, plus JR local trains and the Randen, which neither pass covers",
    buy: "A card you already have, or see our IC card guide",
  },
];

const breakEvenRows = [
  { rides: "1", bus: "¥230",   subway: "¥220",   verdict: "Pay per ride" },
  { rides: "2", bus: "¥460",   subway: "¥440",   verdict: "Pay per ride" },
  { rides: "3", bus: "¥690",   subway: "¥660",   verdict: "Pay per ride" },
  { rides: "4", bus: "¥920",   subway: "¥880",   verdict: "Bus day: pay per ride (¥180 less). Subway day: the ¥800 pass (¥80 less)" },
  { rides: "5", bus: "¥1,150", subway: "¥1,100", verdict: "Subway & Bus Pass saves ¥50; Subway Pass saves ¥300" },
  { rides: "6", bus: "¥1,380", subway: "¥1,320", verdict: "Subway & Bus Pass saves ¥280; Subway Pass saves ¥520" },
];

const vsRows = [
  { scenario: "Five or more rides mixing bus and subway", pick: "Subway & Bus Pass", note: "Kinkaku-ji, Ginkaku-ji and Kiyomizu-dera all end in a bus ride or a walk, and the pass covers the ¥500 EX buses with no extra charge." },
  { scenario: "Four or more rides, all on the subway",    pick: "Subway-only Pass",  note: "¥800 against ¥880 at the lowest ¥220 fare, and it pays sooner on longer rides." },
  { scenario: "Arashiyama or Fushimi Inari by train",     pick: "Suica / ICOCA",     note: "JR and the Randen are not covered by either pass, so pay per ride on these days." },
  { scenario: "Four rides or fewer",                      pick: "Suica / ICOCA",     note: "Pay-as-you-go is cheaper than the ¥1,100 pass at this level of use." },
];

const noticePoints = [
  {
    title: "Leave big suitcases out of it",
    desc: "The city asks visitors not to bring large luggage on to its buses, which fill up in peak season. Store bags at Kyoto Station or send them to the hotel before a bus-based sightseeing day.",
  },
  {
    title: "Kibune, Kurama and Mt Hiei are outside it",
    desc: "The Kyoto Bus part of the pass stops at Ohara, Iwakura, Ichihara, Daikakuji, Kiyotaki and Kokedera, and the seasonal Mt Hiei (51) and Ohara–Kurama (95) routes are excluded. Ohara is covered; Kibune and Kurama are not.",
  },
  {
    title: "It is a day ticket, not 24 hours",
    desc: "The pass runs until the end of service on the day you first use it. A Subway 1-Day Pass bought from a ticket machine is valid only on the day it is bought.",
  },
];

const buyPoints = [
  {
    title: "In Kyoto: offices, stations and buses",
    desc: "City Bus & Subway Information Offices, commuter-pass offices, bus depots and subway station windows sell the Subway & Bus 1-Day Pass. City buses sell it on board too, but the stock is limited and can run out. It is a separate card ticket, not something loaded on to an IC card.",
  },
  {
    title: "Online before you go",
    desc: "The bureau sells a KANSAI MaaS digital coupon that you exchange for the pass at the Kyoto Ekimae or Kotochika Kyoto information office; the coupon itself cannot be used to ride. A Klook voucher works the same way: buy in advance, exchange after you arrive.",
  },
];

const faqItems = [
  {
    q: "Is there still a Kyoto bus one-day pass?",
    a: "No. Kyoto City stopped selling the ¥700 Bus 1-Day Pass on 30 September 2023, and it could not be used after 31 March 2024. The only day ticket that covers city buses now is the Subway & Bus 1-Day Pass at ¥1,100 (¥550 for children), which also covers both subway lines.",
  },
  {
    q: "How much is the Kyoto subway and bus one-day pass in 2026?",
    a: "¥1,100 for adults and ¥550 for children, per Kyoto City Transportation Bureau on 15 November 2026. The Subway 1-Day Pass, which covers the two subway lines but no buses, is ¥800 (¥400 for children). Kyoto City plans a higher non-resident bus fare within fiscal 2027, but the price of the day pass under that plan has not been decided.",
  },
  {
    q: "Is the Kyoto one-day pass worth it?",
    a: "Yes, from five rides. A city-bus ride is ¥230, so four rides cost ¥920 and five cost ¥1,150, against ¥1,100 for the Subway & Bus 1-Day Pass. On a subway-only day the ¥800 Subway 1-Day Pass pays from the fourth ride at the lowest ¥220 fare. For four rides or fewer, pay per ride with an IC card.",
  },
  {
    q: "Can I use ICOCA on Kyoto buses?",
    a: "Yes. Kyoto City Bus accepts ICOCA, Suica and other transport IC cards: touch the reader on the fare box for about a second as you get off. If the balance is short, pay the rest in cash. An IC card does not lower the ¥230 fare, and it cannot hold the day pass, which is a separate ticket.",
  },
  {
    q: "Does the pass cover JR trains to Arashiyama?",
    a: "No. The pass covers Kyoto's two subway lines, the city buses and set private bus routes, but not JR or the Randen. The JR Sagano Line to Saga-Arashiyama and the JR Nara Line to Inari need a separate fare: use an IC card, or the JR-only Kansai Area Pass if you are also visiting Osaka, Nara or Kobe.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/kyoto-subway-bus-pass") } });

export default function KyotoSubwayBusPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Kyoto Subway and Bus Pass 2026: ¥1,100, Worth It at 5 Rides</title>
        <meta
          name="description"
          content="Kyoto subway and bus pass: ¥1,100 a day, worth it from the 5th ¥230 bus ride. The bus-only pass ended in 2023; see when ICOCA is cheaper, then book."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/kyoto-subway-bus-pass" />
        <meta property="og:title" content="Kyoto Subway and Bus Pass 2026: ¥1,100, Worth It at 5 Rides" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/kyoto-subway-bus-pass" />
        <meta property="og:description" content="Kyoto subway and bus pass: ¥1,100 a day, worth it from the 5th ¥230 bus ride. The bus-only pass ended in 2023; see when ICOCA is cheaper, then book." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kyoto Subway and Bus Pass 2026: ¥1,100, Worth It at 5 Rides" />
        <meta name="twitter:description" content="Kyoto subway and bus pass: ¥1,100 a day, worth it from the 5th ¥230 bus ride. The bus-only pass ended in 2023; see when ICOCA is cheaper, then book." />
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
                { "@type": "ListItem", position: 4, name: "Kyoto Subway & Bus Pass", item: "https://www.japan-travel-kit.com/guides/transport/kyoto-subway-bus-pass" },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/kyoto-subway-bus-pass",
              headline: "Kyoto Subway and Bus Pass (2026): Is the ¥1,100 1-Day Pass Worth It?",
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Kyoto Subway &amp; Bus Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Kyoto Subway and Bus Pass (2026): <br />Is the ¥1,100 1-Day Pass Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            A good deal on a five-ride temple day and a waste on a quiet one. Here is where the line falls.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Break-Even Table", "Bus-Only Pass Ended 2023"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The Kyoto Subway &amp; Bus 1-Day Pass costs <strong>¥1,100</strong> for adults (¥550 for children) and pays
            for itself on the <strong>fifth ride</strong> of the day: four ¥230 bus rides cost ¥920, five cost ¥1,150.
            There is <strong>no bus-only one-day pass any more</strong>: Kyoto City stopped selling the ¥700 Bus 1-Day
            Pass on 30 September 2023, and it could not be used after 31 March 2024. On a subway-only day the ¥800
            Subway 1-Day Pass wins from the fourth ride, and for four rides or fewer an ICOCA or Suica card paying per
            ride is cheaper. Fares confirmed with Kyoto City Transportation Bureau on {CHECKED}.
          </p>
        </section>

        <KlookTripPrep
          label="Book before you arrive"
          heading="What to Book Before You Reach Kyoto"
          intro="The day pass is bought on the day; these are worth sorting first. The pass does not cover the JR lines to Fushimi Inari and Arashiyama, so a guided day for those two can replace the routing, and the Kansai Area Pass covers the JR side if Osaka, Nara or Kobe is also on the trip. Guided tours sell by date, so check availability for your date and the cancellation terms on each listing before you fly."
          items={kyotoSubwayBusPassTripPrep}
        />

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Worth it from</p>
                <p className={styles.verdictStatValue}>~5 rides / day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price (adult)</p>
                <p className={styles.verdictStatValue}>¥1,100 Subway &amp; Bus</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Old ¥700 bus pass</p>
                <p className={styles.verdictStatValue}>Discontinued</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Bottom line:</strong> The <strong>Subway &amp; Bus 1-Day Pass (¥1,100)</strong> pays off on a busy
              temple day of five or more rides. For lighter days, or any day built on JR trains to Arashiyama or Fushimi
              Inari, a pay-as-you-go <strong>Suica or ICOCA</strong> is cheaper.
            </p>
            <KlookLink href={PASS_URL} className={styles.verdictBtn} target="_blank" rel="sponsored nofollow noopener" style={{ marginTop: "1rem", display: "inline-block" }}>
              Check the Kyoto Subway &amp; Bus Pass on Klook →
            </KlookLink>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.7rem", lineHeight: 1.6 }}>
              Affiliate link: we may earn a commission if you book, at no extra cost to you.
            </p>
            <p className={styles.bodyText} style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
              This guide weighs up the pass on its own. For the full picture on buses, subway, and JR, see our{" "}
              <Link href="/guides/transport/kyoto-transportation" style={{ fontWeight: 600 }}>getting around Kyoto guide</Link>.
            </p>
          </div>
        </div>

        <EsimCtaTop />

        {/* Pricing */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tickets</span>
          <h2 className={styles.sectionTitle}>How much is the Kyoto subway and bus pass in 2026?</h2>
          <p className={styles.bodyText}>
            ¥1,100 for adults and ¥550 for children, valid until the end of service on the day you use it. It is the
            only day ticket left that covers city buses; the cheaper ¥800 Subway 1-Day Pass covers the two subway lines
            and no buses.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price (adult, child)", "What it covers", "Where to buy"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{ fontWeight: 700, color: "var(--sumi)" }}>
                      Verdict: five or more rides mixing bus and subway, buy the ¥1,100 Subway &amp; Bus 1-Day Pass; four
                      or more on the subway alone, the ¥800 Subway 1-Day Pass; fewer, pay per ride with ICOCA or Suica.
                    </td>
                  </tr>
                  {ticketRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.buy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Sources (Kyoto City Transportation Bureau):{" "}
            <a href={`${KOTSU}0000028378.html`} target="_blank" rel={OFFICIAL_REL}>Subway &amp; Bus 1-Day Pass</a>,{" "}
            <a href={`${KOTSU}0000028376.html`} target="_blank" rel={OFFICIAL_REL}>Subway 1-Day Pass</a>,{" "}
            <a href={`${KOTSU}0000028337.html`} target="_blank" rel={OFFICIAL_REL}>Bus 1-Day Pass (withdrawn)</a>,{" "}
            <a href="https://www2.city.kyoto.lg.jp/kotsu/webguide/ja/fare/fare_bus.html" target="_blank" rel={OFFICIAL_REL}>city bus fares</a>,{" "}
            <a href="https://www2.city.kyoto.lg.jp/kotsu/webguide/ja/fare/fare_tika.html" target="_blank" rel={OFFICIAL_REL}>subway fares</a>.
            The pass is a separate card ticket, not something loaded on to an IC card. For Suica vs PASMO vs ICOCA, see our{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ fontWeight: 600 }}>IC card Japan</Link> guide.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>How many rides make the Kyoto one-day pass worth it?</h2>
          <p className={styles.bodyText}>
            Five bus rides for the ¥1,100 pass, four subway rides for the ¥800 one. The table prices each day at the
            adult city-bus fare of ¥230 and the lowest subway fare of ¥220; longer subway rides (up to ¥360) and the
            ¥500 EX100 / EX101 buses bring the break-even forward.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Rides in a day", "All city bus (¥230 each)", "All subway (¥220 each)", "Cheaper choice"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{ fontWeight: 700, color: "var(--sumi)" }}>
                      Break-even: the 5th bus ride for the ¥1,100 Subway &amp; Bus Pass; the 4th subway ride for the ¥800
                      Subway Pass.
                    </td>
                  </tr>
                  {breakEvenRows.map((row) => (
                    <tr key={row.rides}>
                      <td className={styles.tdProvider}>{row.rides}</td>
                      <td className={styles.tdPrice}>{row.bus}</td>
                      <td style={{ fontWeight: 700, color: "var(--sumi)" }}>{row.subway}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Worked from the adult fares on Kyoto City Transportation Bureau&apos;s{" "}
            <a href="https://www2.city.kyoto.lg.jp/kotsu/webguide/ja/fare/fare_bus.html" target="_blank" rel={OFFICIAL_REL}>bus</a> and{" "}
            <a href="https://www2.city.kyoto.lg.jp/kotsu/webguide/ja/fare/fare_tika.html" target="_blank" rel={OFFICIAL_REL}>subway</a>{" "}
            fare pages. A mixed day of three ¥260 subway rides and three bus rides comes to ¥1,470, so the ¥1,100 pass
            saves ¥370.
          </p>
        </section>

        {/* Bus pass gone */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Bus-only pass</span>
          <h2 className={styles.sectionTitle}>Is there still a Kyoto bus one-day pass?</h2>
          <p className={styles.bodyText}>
            No. The ¥700 Bus 1-Day Pass that older guides still recommend went off sale on 30 September 2023 and could
            not be used after 31 March 2024. The bus-inclusive option now is the ¥1,100 Subway &amp; Bus 1-Day Pass, and
            the alternatives are the ¥800 Subway 1-Day Pass (no buses) or an IC card at ¥230 a bus ride.
          </p>
        </section>

        {/* Resident-priority fare */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coming fare change</span>
          <h2 className={styles.sectionTitle}>Will Kyoto bus fares go up for tourists?</h2>
          <p className={styles.bodyText}>
            Planned, not yet decided. Kyoto City&apos;s plan, last updated on 11 November 2026, is a resident-priority fare
            in the flat-fare area within fiscal 2027 (April 2027 to March 2028): <strong>¥200 for residents</strong> and{" "}
            <strong>about ¥350–¥400 for everyone else</strong>. It still needs a city ordinance change and national
            approval, and what happens to the Subway &amp; Bus 1-Day Pass is listed as &quot;under consideration&quot;. On{" "}
            {CHECKED} the only fare in force is ¥230, and the pass is ¥1,100. Source:{" "}
            <a href={`${KOTSU}0000351261.html`} target="_blank" rel={OFFICIAL_REL}>Kyoto City Transportation Bureau, resident-priority fare outline</a>.
          </p>
        </section>

        {/* ICOCA */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>IC cards</span>
          <h2 className={styles.sectionTitle}>Can I use ICOCA on Kyoto buses?</h2>
          <p className={styles.bodyText}>
            Yes. Kyoto City Bus takes ICOCA, Suica and other transport IC cards: touch the reader on the fare box for
            about a second as you get off, and pay any shortfall in cash if the balance runs low. The card does not
            lower the ¥230 fare, but it also works on JR local trains and the Randen, which neither day pass covers.
            Source:{" "}
            <a href={`${KOTSU}0000324695.html`} target="_blank" rel={OFFICIAL_REL}>Kyoto City Bus, how to ride</a>.
          </p>
          <p className={styles.bodyText}>
            Which ride the card or the pass pays for depends on the sight: the{" "}
            <Link href="/guides/transport/kyoto-transportation" style={{ fontWeight: 600 }}>Kyoto transportation route table</Link>{" "}
            gives the fastest train or bus, ride time and fare from Kyoto Station to Kiyomizu-dera, Kinkaku-ji, Fushimi
            Inari, Arashiyama and Ginkaku-ji.
          </p>
        </section>

        {/* Important notice */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Before you buy</span>
          <h2 className={styles.sectionTitle}>What should I know before buying the pass?</h2>
          <div className={styles.stepsList}>
            {noticePoints.map((point, i) => (
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

        {/* Which pass */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which to use</span>
          <h2 className={styles.sectionTitle}>Which pass (or no pass) fits my day?</h2>
          <p className={styles.bodyText}>
            Count the rides first: five or more with buses in the mix, the Subway &amp; Bus Pass; a subway-only day of four
            or more, the Subway Pass; a JR day to Arashiyama or Fushimi Inari, neither.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your day looks like", "Best choice", "Why"].map((h) => (
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

        {/* Worked example */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Worked example</span>
          <h2 className={styles.sectionTitle}>A Day Where the Pass Wins</h2>
          <p className={styles.bodyText}>
            Picture a classic Kyoto temple day: bus from Kyoto Station to Kinkakuji in the morning, across to
            Kiyomizudera by bus, down to Gion, then the subway back to your hotel — with a detour or two in between.
            That&apos;s five or more rides. Which of those stops charge admission, and which need booking, is
            in our list of{" "}
            <Link href="/guides/attractions/things-to-do-kyoto">things to do in Kyoto in 2026</Link>.
          </p>
          <p className={styles.bodyText}>
            At ¥230 a bus ride, those journeys add up to ¥1,150 or more on a pay-as-you-go card. The ¥1,100 Subway &amp;
            Bus Pass covers the lot, and every extra hop is free. On a day like that, the pass is the clear winner — and
            you skip fumbling for change each time you step off a bus.
          </p>
          <p className={styles.bodyText}>
            Flip it around: a relaxed day walking the Higashiyama district with two rides would cost less on an IC card,
            and the pass would leave you out of pocket. It all comes down to how many times you ride.
          </p>
        </section>

        {/* Where to buy */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Where to buy</span>
          <h2 className={styles.sectionTitle}>Where can I buy the Kyoto subway and bus pass?</h2>
          <p className={styles.bodyText}>
            In Kyoto at the City Bus &amp; Subway Information Offices, subway station windows and on city buses, or online
            in advance as a voucher you exchange in Kyoto. Buying on the bus is the fallback, since on-board stock can sell
            out.
          </p>
          <div className={styles.stepsList}>
            {buyPoints.map((point, i) => (
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
            href={PASS_URL}
            className={styles.pickCta}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Kyoto Subway &amp; Bus Pass on Klook →
          </KlookLink>
        </section>

        <EsimCtaBottom />

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
            <Link href="/guides/attractions/where-to-stay-in-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/kyoto-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4" /><path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Kyoto (2026): Buses, Trains &amp; Taxis Explained</p>
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
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Planning a full day of temples?</h2>
            <p className={styles.ctaBannerDesc}>
              If you&apos;ll be hopping between Kinkakuji, Kiyomizudera, and Gion, lock in the Subway &amp; Bus Pass
              online and exchange it after you arrive.
            </p>
            <KlookLink href={PASS_URL} className={styles.ctaBannerBtn} target="_blank" rel="noopener noreferrer nofollow">
              Book Kyoto Subway &amp; Bus Pass on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
