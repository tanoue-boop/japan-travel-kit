import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookSameDayCards from "../../../components/KlookSameDayCards";
import BookingEsimCard from "../../../components/BookingEsimCard";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  enoshimaKamakuraFreepassKlook,
  enoshimaKamakuraSameDayCards,
  enoshimaKamakuraTripPrep,
  kamakuraEnoshimaDayTour,
  yokohamaKamakuraPrivateGuide,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Enoshima-Kamakura Freepass: is it worth it. Added 27 Nov 2026 (task-jtk-20261127-02,
 * re-run of 20261125-02 / 20261124-02).
 *
 * Next to its neighbours:
 *  - kamakura-day-trip is the day itself (what to see, JR from Tokyo, admissions);
 *  - hakone-free-pass is Odakyu's other pass;
 *  - this page is only the pass maths: Odakyu's Enoshima-Kamakura Freepass against single
 *    fares, and when JR or a plain return is cheaper.
 *
 * Official reads on 27 Nov 2026:
 *   odakyu-global.com/passes/enoshima-kamakura-freepass/  ¥1,640 adult / ¥430 child from Shinjuku,
 *       ¥810 / ¥410 from Fujisawa; 1 day; Romancecar not included, +¥750 Shinjuku → Katase-Enoshima
 *       (¥50 less through EMot Online Tickets); Odakyu gates take the ticket, Enoden staff check it
 *   odakyu-freepass.jp/enokama/ and /buy.html  free section = Odakyu Fujisawa–Katase-Enoshima + all
 *       Enoden; one round trip departure station ↔ Fujisawa (stopovers on request); collected at the
 *       last station; on sale from one month ahead (EMot), machines sell same-day only
 *   odakyu.jp/romancecar/charges/shinjuku_katase_enoshima/  ticket fares Shinjuku–Fujisawa ¥610
 *       (IC ¥607), Shinjuku–Katase-Enoshima ¥650 (IC ¥649), Fujisawa–Katase-Enoshima ¥170 (IC ¥167);
 *       limited express ¥750 (ticketless ¥700)
 *   enoden.co.jp/en/train/fare/  fareObj matrix: Fujisawa–Hase ¥310, Fujisawa–Kamakura ¥310,
 *       Fujisawa–Enoshima ¥220, Enoshima–Hase ¥260, Enoshima–Kamakura ¥260, Hase–Kamakura ¥200
 *   enoden.co.jp/en/tourism/ticket/noriorikun/  Enoden 1-day pass ¥800 / ¥400
 *   jreast.co.jp/press/2019/yokohama/20200220_y01.pdf  JR's Kamakura-Enoshima Pass ended March 2020
 * Not printed: a JR single fare Tokyo/Shinjuku → Kamakura (the revised-fare search site closed on
 * 30 Sep and the 2026 pamphlet does not list that pair), and any Klook price.
 * No Klook ad id: spare was empty on 27 Nov, so links use ?aid=119070.
 */

const ROUTE = "/guides/attractions/enoshima-kamakura-pass";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const TODAY = checkedLabel("2026-11-27");

const PASS = "¥1,640";

const PASS_URL = "https://odakyu-global.com/passes/enoshima-kamakura-freepass/";
const PASS_JA_URL = "https://www.odakyu-freepass.jp/enokama/buy.html";
const ODAKYU_FARES_URL = "https://www.odakyu.jp/romancecar/charges/shinjuku_katase_enoshima/index.html";
const ENODEN_FARES_URL = "https://www.enoden.co.jp/en/train/fare/";
const NORIORIKUN_URL = "https://www.enoden.co.jp/en/tourism/ticket/noriorikun/";
const JR_PASS_END_URL = "https://www.jreast.co.jp/press/2019/yokohama/20200220_y01.pdf";

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

type Leg = { leg: string; line: string; fare: string; stop: string };

const loopLegs: Leg[] = [
  { leg: "Shinjuku → Fujisawa", line: "Odakyu", fare: "¥610", stop: "Change to the Enoden at Fujisawa" },
  { leg: "Fujisawa → Hase", line: "Enoden", fare: "¥310", stop: "Great Buddha (Kotoku-in) and Hase-dera" },
  { leg: "Hase → Kamakura", line: "Enoden", fare: "¥200", stop: "Tsurugaoka Hachimangu and Komachi-dori" },
  { leg: "Kamakura → Enoshima", line: "Enoden", fare: "¥260", stop: "Walk over the bridge to Enoshima island" },
  { leg: "Katase-Enoshima → Shinjuku", line: "Odakyu", fare: "¥650", stop: "Home" },
];

type Scenario = { day: string; singles: string; pass: string; verdict: string };

const scenarios: Scenario[] = [
  { day: "The full loop above: Shinjuku → Hase → Kamakura → Enoshima → Shinjuku", singles: "¥2,030", pass: PASS, verdict: "Pass saves ¥390" },
  { day: "Odakyu to Fujisawa and back, plus the Enoden 1-day pass ¥800", singles: "¥2,020", pass: PASS, verdict: "Pass saves ¥380" },
  { day: "Kamakura only: Odakyu to Fujisawa, Enoden to Kamakura and back the same way", singles: "¥1,840", pass: PASS, verdict: "Pass saves ¥200" },
  { day: "Enoshima only: Odakyu Shinjuku ↔ Katase-Enoshima, no Enoden", singles: "¥1,300", pass: PASS, verdict: "Pass costs ¥340 more — buy single tickets" },
  { day: "Out by Romancecar to Katase-Enoshima", singles: "Fare + ¥750 limited express", pass: `${PASS} + ¥750`, verdict: "Same saving; the ¥750 is extra either way" },
];

type FareRow = { from: string; ticket: string; ic: string; source: ReactNode };

const fareRows: FareRow[] = [
  { from: "Odakyu: Shinjuku ↔ Fujisawa", ticket: "¥610", ic: "¥607", source: ext(ODAKYU_FARES_URL, "odakyu.jp") },
  { from: "Odakyu: Shinjuku ↔ Katase-Enoshima", ticket: "¥650", ic: "¥649", source: ext(ODAKYU_FARES_URL, "odakyu.jp") },
  { from: "Odakyu: Fujisawa ↔ Katase-Enoshima (free section)", ticket: "¥170", ic: "¥167", source: ext(ODAKYU_FARES_URL, "odakyu.jp") },
  { from: "Enoden: Fujisawa ↔ Kamakura or Hase", ticket: "¥310", ic: "—", source: ext(ENODEN_FARES_URL, "enoden.co.jp") },
  { from: "Enoden: Enoshima ↔ Kamakura or Hase", ticket: "¥260", ic: "—", source: ext(ENODEN_FARES_URL, "enoden.co.jp") },
  { from: "Enoden: Fujisawa ↔ Enoshima", ticket: "¥220", ic: "—", source: ext(ENODEN_FARES_URL, "enoden.co.jp") },
  { from: "Enoden: Hase ↔ Kamakura", ticket: "¥200", ic: "—", source: ext(ENODEN_FARES_URL, "enoden.co.jp") },
  { from: "Enoden 1-day pass “Noriorikun”", ticket: "¥800 (child ¥400)", ic: "—", source: ext(NORIORIKUN_URL, "enoden.co.jp") },
];

type JrRow = { option: string; covers: string; note: string };

const jrRows: JrRow[] = [
  { option: "Odakyu Enoshima-Kamakura Freepass", covers: "Odakyu return to Fujisawa, Odakyu Fujisawa–Katase-Enoshima and every Enoden ride, 1 day", note: `${PASS} from Shinjuku; the cheapest way to do the full loop` },
  { option: "JR to Kamakura, then Enoden single tickets", covers: "JR Yokosuka or Shonan-Shinjuku Line to Kamakura, about 50–60 minutes from Tokyo", note: "Covered by a Japan Rail Pass; without one, pay the JR fare on an IC card plus each Enoden ride" },
  { option: "JR Kamakura-Enoshima Pass", covers: "Discontinued", note: "JR East stopped selling it at the end of March 2020" },
];

const faqItems = [
  {
    q: "Is the Enoshima-Kamakura Freepass worth it?",
    a: `Yes, if you ride the Enoden at least twice. The pass costs ${PASS} from Shinjuku, and the Odakyu legs alone (Shinjuku to Fujisawa ¥610, Katase-Enoshima back to Shinjuku ¥650) come to ¥1,260, so the pass pays once your Enoden rides top ¥380. A loop through Hase, Kamakura and Enoshima costs ¥2,030 in single tickets, so the pass saves ¥390. For Enoshima alone, a ¥1,300 Odakyu return is cheaper.`,
  },
  {
    q: "Where do I buy the Enoshima-Kamakura Freepass?",
    a: "At Odakyu stations: the ticket machines (for use the same day only) and the ticket windows, the Odakyu Sightseeing Service Centers, or online through Odakyu's EMot Online Tickets from one month before your date. Klook also sells it as a digital QR ticket. It is sold for departures from Odakyu stations, with the price set by the station you start from.",
  },
  {
    q: "Does the Enoshima-Kamakura Freepass include the Enoden?",
    a: "Yes. The whole Enoden line, Fujisawa to Kamakura, is unlimited for the day, along with the Odakyu line between Fujisawa and Katase-Enoshima. Show the pass to Enoden staff at the gate. The Odakyu ride from your starting station to Fujisawa is one round trip only.",
  },
  {
    q: "Can I use the Enoshima-Kamakura Freepass on the Romancecar?",
    a: "Yes, with a limited express ticket on top. From Shinjuku to Katase-Enoshima the Romancecar ticket is ¥750 for an adult (¥380 for a child), and ¥50 less when bought through EMot Online Tickets. The pass covers the fare part only.",
  },
  {
    q: "Can I use a Japan Rail Pass to get to Kamakura and Enoshima?",
    a: "To Kamakura, yes: the JR Yokosuka and Shonan-Shinjuku lines run there in about 50 to 60 minutes from Tokyo. The Enoden and Odakyu are private railways, so the rail pass does not cover them, and JR's own Kamakura-Enoshima Pass stopped being sold in March 2020. With a JR Pass, take JR to Kamakura and pay the Enoden by IC card or buy the ¥800 Enoden day pass.",
  },
];

const TITLE = "Enoshima-Kamakura Freepass: ¥1,640 — Is It Worth It? (2026)";
const DESCRIPTION =
  "The Enoshima-Kamakura Freepass is ¥1,640 from Shinjuku; the same Enoden loop costs ¥2,030 in single fares. When it pays, where to buy it, the Romancecar.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE) },
});

const crumbSep = (
  <><svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg><span className="sr-only"> / </span></>
);

const related = [
  { href: "/guides/attractions/kamakura-day-trip", title: "Kamakura Day Trip From Tokyo: Great Buddha, Hase-dera and the Fares" },
  { href: "/guides/attractions/hakone-free-pass", title: "Hakone Freepass: Is It Worth It?" },
  { href: "/guides/attractions/yokohama-day-trip", title: "Yokohama Day Trip from Tokyo" },
  { href: "/guides/attractions/tokyo-7-day-itinerary", title: "Tokyo 7 Day Itinerary: Day Trips, Passes & Bookings" },
  { href: "/guides/attractions/tokyo-4-day-itinerary", title: "Tokyo 4 Day Itinerary" },
  { href: "/guides/attractions", title: "More Things to Do in Japan →" },
];

function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
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
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map((c, j) => (
                  <td key={j} className={j === 0 ? styles.tdProvider : undefined} style={{ fontSize: "0.88rem" }}>
                    {c}
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

const note = { marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;
const h3 = { fontSize: "1.1rem", marginTop: "1.5rem" } as const;

export default function EnoshimaKamakuraPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Enoshima-Kamakura Freepass", item: URL },
              ],
            }),
          }}
        />
      </Head>

      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/" className={styles.breadLink}>Home</Link>
          {crumbSep}
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          {crumbSep}
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          {crumbSep}
          <span className={styles.breadCurrent}>Enoshima-Kamakura Freepass</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Enoshima-Kamakura Freepass (2026): <br />Is It Worth It from Shinjuku?
          </h1>
          <p className={styles.heroSubtitle}>
            Odakyu&apos;s one-day pass against the single tickets for the same day — Odakyu out and back, and the
            Enoden between Fujisawa, Enoshima, Hase and Kamakura.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Odakyu & Enoden fares, dated", "Break-even table"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pass from Shinjuku</p>
                <p className={styles.verdictStatValue}>{PASS}, 1 day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Same loop, single tickets</p>
                <p className={styles.verdictStatValue}>¥2,030</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Pays when</p>
                <p className={styles.verdictStatValue}>2+ Enoden rides</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>Enoshima-Kamakura Freepass costs {PASS}</strong> for an adult from Shinjuku (¥430 for a child)
              and is valid for one day: an Odakyu round trip to Fujisawa, plus unlimited rides on the{" "}
              <strong>Enoden</strong> and on the Odakyu line between Fujisawa and Katase-Enoshima (odakyu-global.com,{" "}
              {TODAY}). The same day on single tickets — Shinjuku to Fujisawa, the Enoden to Hase, Kamakura and Enoshima,
              and Katase-Enoshima back to Shinjuku — <strong>costs ¥2,030, so the pass saves ¥390</strong>. It pays as
              soon as you ride the Enoden twice; for Enoshima alone, a ¥1,300 Odakyu return is cheaper.
            </p>
            <p className={styles.verdictText} style={{ marginTop: "0.75rem" }}>
              For what to see on the day, use the{" "}
              <Link href="/guides/attractions/kamakura-day-trip">Kamakura day trip guide</Link>; for Odakyu&apos;s
              other pass, the <Link href="/guides/attractions/hakone-free-pass">Hakone Freepass</Link>.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={enoshimaKamakuraFreepassKlook.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Enoshima-Kamakura Freepass →
              </KlookLink>
              <KlookLink href={kamakuraEnoshimaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Kamakura & Enoshima day tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <KlookTripPrep
          label="Book these before the day"
          heading="What Should You Book for Kamakura and Enoshima?"
          intro="The pass itself, a guided option if you would rather not route the day, and data. Klook prices change by date, so open a listing for the figure on your day."
          items={enoshimaKamakuraTripPrep}
        />

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the Enoshima-Kamakura Freepass Worth It?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Yes for any day with two or more Enoden rides. The Odakyu legs alone come to ¥1,260 from Shinjuku, so the
            remaining ¥380 of the {PASS} pass is covered by two Enoden rides of ¥200 or more.
          </p>
          <SimpleTable
            head={["Your day (adult, from Shinjuku)", "Single tickets", "Freepass", "Verdict"]}
            rows={scenarios.map((s) => [s.day, s.singles, s.pass, s.verdict])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY}. Pass price on {ext(PASS_URL, "odakyu-global.com")} and{" "}
            {ext(PASS_JA_URL, "odakyu-freepass.jp")}; Odakyu ticket fares on {ext(ODAKYU_FARES_URL, "odakyu.jp")};
            Enoden fares on {ext(ENODEN_FARES_URL, "enoden.co.jp")}. Single-ticket totals use paper-ticket fares.
          </p>

          <h3 className={styles.sectionTitle} style={h3}>The full loop, leg by leg</h3>
          <SimpleTable
            head={["Leg", "Line", "Adult fare", "Stop for"]}
            rows={[
              ...loopLegs.map((l) => [l.leg, l.line, l.fare, l.stop]),
              [<strong key="t">Total on single tickets</strong>, "", <strong key="f">¥2,030</strong>, `Freepass ${PASS} — saves ¥390`],
            ]}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY}, {ext(ODAKYU_FARES_URL, "odakyu.jp")} and {ext(ENODEN_FARES_URL, "enoden.co.jp")}.
            Enoshima (Enoden) and Katase-Enoshima (Odakyu) are both inside the pass&apos;s free area.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={enoshimaKamakuraFreepassKlook.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Freepass as a QR ticket →
            </KlookLink>
          </div>
        </section>

        <KlookSameDayCards heading="Book on the same day as the pass" cards={enoshimaKamakuraSameDayCards} />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fares</span>
          <h2 className={styles.sectionTitle}>How Much Are the Single Fares Without the Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            ¥610 from Shinjuku to Fujisawa and ¥650 to Katase-Enoshima on Odakyu, and ¥200–¥310 a ride on the Enoden.
            The Enoden also sells its own 1-day pass, “Noriorikun”, at ¥800.
          </p>
          <SimpleTable
            head={["Section", "Ticket", "IC card", "Source"]}
            rows={fareRows.map((r) => [r.from, r.ticket, r.ic, r.source])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY}. Odakyu fares from Odakyu&apos;s Romancecar fare table (fare columns), Enoden fares
            from the Enoden fare search, Noriorikun on {ext(NORIORIKUN_URL, "enoden.co.jp")}.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR</span>
          <h2 className={styles.sectionTitle}>Is the Freepass Better Than Taking JR?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Without a Japan Rail Pass, yes for the full loop: JR has no equivalent pass any more. With a JR Pass, take JR
            to Kamakura and pay the Enoden separately.
          </p>
          <SimpleTable
            head={["Option", "What it covers", "When it makes sense"]}
            rows={jrRows.map((r) => [r.option, r.covers, r.note])}
          />
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY}. Pass on {ext(PASS_URL, "odakyu-global.com")}; JR&apos;s Kamakura-Enoshima Pass end of
            sale in {ext(JR_PASS_END_URL, "JR East's press release")}; JR journey time as in our{" "}
            <Link href="/guides/attractions/kamakura-day-trip">Kamakura day trip guide</Link>. A JR single fare is not
            given here: JR East revised its fares on 14 March 2026, and its revised-fare search has since closed.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Buying</span>
          <h2 className={styles.sectionTitle}>Where Do I Buy the Enoshima-Kamakura Freepass?</h2>
          <p className={styles.bodyText}>
            At any Odakyu station, or online. Odakyu sells it at station ticket machines (for use the same day only) and
            ticket windows, at the Odakyu Sightseeing Service Centers, and through EMot Online Tickets from one month
            before your date; it is also sold as a digital QR ticket on Klook. The price depends on the Odakyu station you
            start from — {PASS} from Shinjuku, ¥810 from Fujisawa. Insert the paper ticket at Odakyu gates and show it to
            Enoden staff. The last station you leave through keeps it.
          </p>
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY} on {ext(PASS_URL, "odakyu-global.com")} and {ext(PASS_JA_URL, "odakyu-freepass.jp")}.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Enoden</span>
          <h2 className={styles.sectionTitle}>Does the Freepass Include the Enoden?</h2>
          <p className={styles.bodyText}>
            Yes — the whole Enoden line from Fujisawa to Kamakura, as many times as you like that day, plus the Odakyu
            line between Fujisawa and Katase-Enoshima. The Odakyu ride from your starting station to Fujisawa is one
            round trip only; you may break the journey on the way if you tell the station staff. Rides outside that area,
            such as JR or the Shonan Monorail, are paid separately. If a line is suspended for bad weather and you have
            not ridden it at all that day, that part is refunded at the last station.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Romancecar</span>
          <h2 className={styles.sectionTitle}>Can I Use the Freepass on the Romancecar?</h2>
          <p className={styles.bodyText}>
            Yes, by adding a limited express ticket: ¥750 for an adult from Shinjuku to Katase-Enoshima (¥380 for a
            child), or ¥700 bought ticketless through EMot Online Tickets. The pass covers the fare only, so the
            Romancecar costs the same extra whether you hold the pass or not.
          </p>
          <p className={styles.bodyText} style={note}>
            Last checked: {TODAY}, limited express charges on {ext(ODAKYU_FARES_URL, "odakyu.jp")} and{" "}
            {ext(PASS_URL, "odakyu-global.com")}.
          </p>
        </section>

        <BookingEsimCard lead="The QR pass, the Enoden timetable and the walk from Hase to the Great Buddha — get mobile data before you land." />

        <KlookTourPicks
          heading="Guided Options for Kamakura and Enoshima"
          intro="A guided day from Tokyo, or a licensed private guide for six hours. Klook prices change by date, so open a listing for your day."
          tours={[kamakuraEnoshimaDayTour, yokohamaKamakuraPrivateGuide, enoshimaKamakuraFreepassKlook]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            If Hakone is on the same trip, the <Link href="/guides/transport/hakone-kamakura-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Hakone Kamakura Pass</Link> covers both areas and all Odakyu lines for three days.
          </p>
        </section>
        <EsimCtaBottom />

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

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M3 9h18M8 2v4M16 2v4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{r.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two Enoden rides and the pass has paid</h2>
            <p className={styles.ctaBannerDesc}>
              Get the Freepass as a QR ticket before the day, or let a guide route it for you.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={enoshimaKamakuraFreepassKlook.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Enoshima-Kamakura Freepass →
              </KlookLink>
              <KlookLink href={kamakuraEnoshimaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                Kamakura day tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
