import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  hakoneCruiseCableCarTour,
  hakoneFreepass,
  hakoneLoopBusTour,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA links — the two Klook listings this page uses. Both are existing constants in
// lib/klook-links.ts rather than new ones: listing 821 (the pass, Klook's 5%
// passes-and-transport band, and the listing Klook itself titles "Hakone Free Pass")
// and listing 87293 (the guided loop, 6.5%). Re-confirmed live through the
// www.klook.com search index on 25 Oct 2026.
const HAKONE_PASS_URL = hakoneFreepass.url;
const HAKONE_TOUR_URL = hakoneLoopBusTour.url;

// Every figure on this page was read off the operators' own sites on 25 October 2026:
// the pass prices, the eight covered modes, the Romancecar surcharge and the journey
// time from odakyu-global.com; the ropeway and cruise fares and the retail list from
// hakonenavi.jp. Legs whose fare tables could not be read on an official page are
// deliberately absent from the break-even table rather than estimated.
const CHECKED = checkedLabel("2026-10-25");

const PASS_2_DAY_SHINJUKU = "¥7,100";
const PASS_3_DAY_SHINJUKU = "¥7,500";
const PASS_2_DAY_ODAWARA = "¥6,000";
const ROMANCECAR = "¥1,200";

const priceRows = [
  { pass: "2-day, from Shinjuku", adult: PASS_2_DAY_SHINJUKU, child: "¥1,600" },
  { pass: "3-day, from Shinjuku", adult: PASS_3_DAY_SHINJUKU, child: "¥1,850" },
  { pass: "2-day, from Odawara (Hakone area only)", adult: PASS_2_DAY_ODAWARA, child: "¥1,500" },
  { pass: "3-day, from Odawara (Hakone area only)", adult: "¥6,400", child: "¥1,750" },
  { pass: "Romancecar surcharge, Shinjuku → Hakone-Yumoto (not included)", adult: ROMANCECAR, child: "¥600" },
];

const coverageRows = [
  {
    mode: "Odakyu Line (Shinjuku ⇄ Odawara ⇄ Hakone-Yumoto)",
    included: "✓ Unlimited rides",
    note: "On the Shinjuku version only. The Odawara pass starts at Odawara and leaves you to reach it yourself.",
  },
  {
    mode: "Hakone Tozan Train (Hakone-Yumoto ⇄ Gora)",
    included: "✓ Unlimited rides",
    note: "The switchback mountain railway — the first leg of the loop from Hakone-Yumoto.",
  },
  {
    mode: "Hakone Tozan Cable Car (Gora ⇄ Sounzan)",
    included: "✓ Unlimited rides",
    note: "A funicular, not a ropeway: it climbs the ridge from Gora to the ropeway's lower station.",
  },
  {
    mode: "Hakone Ropeway (Sounzan ⇄ Owakudani ⇄ Togendai)",
    included: "✓ Unlimited rides",
    note: "The Owakudani volcanic valley leg, and the most expensive single ride on the loop.",
  },
  {
    mode: "Hakone Sightseeing Cruise (Lake Ashi pirate ships)",
    included: "✓ Unlimited rides",
    note: "Togendai to Hakone-machi-ko or Moto-Hakone-ko across Lake Ashi.",
  },
  {
    mode: "Hakone Tozan Bus (designated areas)",
    included: "✓ Unlimited rides",
    note: "How you close the loop back to Hakone-Yumoto or Odawara without retracing the whole route.",
  },
  {
    mode: "Odakyu Highway Bus",
    included: "✓ Unlimited rides",
    note: "Within the designated Hakone sections — one of the eight modes Odakyu lists.",
  },
  {
    mode: "Tokai Bus (designated areas)",
    included: "✓ Unlimited rides",
    note: "The eighth mode, covering the designated sections on the far side of the lake.",
  },
  {
    mode: "Limited Express Romancecar",
    included: "✗ Not included",
    note: `A separate reserved-seat charge: ${ROMANCECAR} adult, ¥600 child, Shinjuku to Hakone-Yumoto.`,
  },
  {
    mode: "Shinkansen to Odawara",
    included: "✗ Not included",
    note: "Odawara is a shinkansen stop, but the pass is an Odakyu product — buy the Odawara version if you arrive that way.",
  },
];

const legRows = [
  {
    leg: "Hakone Ropeway, Sounzan ⇄ Togendai (full route)",
    adult: "¥2,000 one way / ¥3,000 return",
    child: "¥700 one way / ¥1,000 return",
    source: "hakonenavi.jp fare notice, in force since 1 October 2025",
  },
  {
    leg: "Hakone Sightseeing Cruise, Togendai ⇄ Hakone-machi / Moto-Hakone",
    adult: "¥1,200 one way (+¥600 special cabin)",
    child: "¥600 one way (+¥300 special cabin)",
    source: "hakonenavi.jp",
  },
  {
    leg: "Romancecar surcharge, Shinjuku → Hakone-Yumoto",
    adult: `${ROMANCECAR} (not covered by the pass)`,
    child: "¥600 (not covered by the pass)",
    source: "odakyu-global.com",
  },
];

const worthRows = [
  {
    plan: "Two days in Hakone, one night in an onsen inn",
    verdict: "✓ Buy the 2-day pass",
    why: `The pass is priced for exactly this. ${PASS_2_DAY_SHINJUKU} from Shinjuku covers the trains out and back plus every leg of the loop, and Odakyu's own published comparison puts the same Hakone route at ¥9,200 via JR against ${PASS_2_DAY_SHINJUKU} via Odakyu with the pass — ¥2,100 saved for an adult.`,
  },
  {
    plan: "Arriving by shinkansen at Odawara, or already staying in Hakone",
    verdict: "✓ Buy the Odawara version",
    why: `${PASS_2_DAY_ODAWARA} instead of ${PASS_2_DAY_SHINJUKU}, because it drops the Odakyu Line leg from Shinjuku you are not going to use. Same eight modes inside Hakone.`,
  },
  {
    plan: "A single day trip from Tokyo, back the same night",
    verdict: "~ Only if you ride the whole loop",
    why: "There is no 1-day version, so you pay for a second day you will not use. The full loop is still worth more than the pass price — the ropeway alone is ¥2,000 and the lake cruise ¥1,200 — but if you are only going as far as Hakone-Yumoto for an onsen and lunch, buy singles.",
  },
  {
    plan: "One or two stops only — Hakone-Yumoto, or just Owakudani",
    verdict: "✗ Skip it",
    why: "Two short legs do not come close to the pass price, and the second day of validity is dead money. Pay per ride, or take a guided coach day tour where the whole day is priced as one ticket.",
  },
  {
    plan: "You want the loop done for you, with no timetables",
    verdict: "✗ Take a day tour instead",
    why: "A guided coach covers Owakudani, Lake Ashi and Hakone Shrine on a fixed departure and gets you back to Tokyo the same evening, which is a different purchase from a transport pass. It is also the only version that works if you have one day and no appetite for five changes.",
  },
];

const steps = [
  {
    title: "Decide where your pass should start — Shinjuku or Odawara",
    desc: `This is the only decision that changes the price by more than ¥400. From Shinjuku the 2-day pass is ${PASS_2_DAY_SHINJUKU} and includes the Odakyu Line out and back; from Odawara it is ${PASS_2_DAY_ODAWARA} and covers Hakone only. Buy the Odawara version if you are arriving by shinkansen, coming from Kyoto or Osaka, or already sleeping in Hakone. Prices checked ${CHECKED}.`,
  },
  {
    title: "Pick 2-day or 3-day — there is no 1-day pass",
    desc: `The third day costs ¥400 from Shinjuku (${PASS_2_DAY_SHINJUKU} to ${PASS_3_DAY_SHINJUKU}) and ¥400 from Odawara, which makes it the cheapest extension on this page. There is no 1-day Hakone Free Pass at all, so a day trip means buying two days of validity.`,
  },
  {
    title: "Add the Romancecar seat if you are doing Hakone in a day",
    desc: `The pass covers the Odakyu Line but not the Limited Express Romancecar, which is ${ROMANCECAR} extra for an adult and ¥600 for a child from Shinjuku to Hakone-Yumoto — about 80 minutes, all seats reserved. Buying the limited express ticket through Odakyu's EMot Online Tickets is ¥50 cheaper than the station price.`,
  },
  {
    title: "Buy it before you are standing at a machine",
    desc: "Odakyu sells the pass through EMot Online Tickets, at Odakyu Line stations, at 7-Eleven (7-Ticket), at Odakyu Travel stores, at Hakone Tozan Railway ticket machines and at information centres around Hakone. Klook sells it as a digital voucher with an English checkout, which is the route that works if your card is issued abroad.",
  },
  {
    title: "Watch the validity rule — it is calendar days, not 48 hours",
    desc: "Odakyu counts the date of purchase as day one regardless of the time you bought it, so a 2-day pass bought at 18:00 expires after the last service the following day. Buy it on the morning you travel, not the night before.",
  },
];

const faqItems = [
  {
    q: "How much is the Hakone Free Pass?",
    a: `From Odakyu's own site: the 2-day pass from Shinjuku is ${PASS_2_DAY_SHINJUKU} for an adult and ¥1,600 for a child, and the 3-day is ${PASS_3_DAY_SHINJUKU} / ¥1,850. The Hakone-area-only version bought from Odawara is ${PASS_2_DAY_ODAWARA} / ¥1,500 for 2 days and ¥6,400 / ¥1,750 for 3. The Limited Express Romancecar is not included and costs ${ROMANCECAR} for an adult or ¥600 for a child extra from Shinjuku to Hakone-Yumoto. Prices checked ${CHECKED}.`,
  },
  {
    q: "Is there a 1-day Hakone pass?",
    a: `Not from Odakyu. The Hakone Free Pass is sold as a 2-day or a 3-day ticket only, which is the single most useful thing to know before planning Hakone as a day trip — a one-day visit means paying for a day of validity you will not use. The two sensible answers are to stay the night, since Hakone is an onsen town and the second day is already paid for, or to take a guided coach day tour, where the whole day is priced as one ticket. Checked ${CHECKED}.`,
  },
  {
    q: "What does the Hakone Free Pass cover?",
    a: `Unlimited rides on eight modes of transport, as Odakyu lists them: the Odakyu Line, the Hakone Tozan Train, the Hakone Tozan Cable Car, the Hakone Ropeway, the Hakone Sightseeing Cruise on Lake Ashi, the Hakone Tozan Bus in designated areas, the Odakyu Highway Bus and Tokai Bus in designated areas. It also carries discounts at facilities around the loop. The Limited Express Romancecar and the shinkansen to Odawara are not covered. Coverage read off odakyu-global.com on ${CHECKED}.`,
  },
  {
    q: "Is the Hakone Free Pass worth it?",
    a: `Yes if you ride the loop, no if you do one or two legs. The two most expensive rides alone — the Hakone Ropeway at ¥2,000 one way and the Lake Ashi cruise at ¥1,200 one way for an adult — come to ¥3,200 before the trains out of Tokyo, so a full loop over two days clears ${PASS_2_DAY_SHINJUKU} without effort. Odakyu's own published comparison puts the Hakone route at ¥9,200 using JR against ${PASS_2_DAY_SHINJUKU} using Odakyu with the 2-day pass, a ¥2,100 saving for an adult. Where it stops paying is a short visit: Hakone-Yumoto for an onsen and lunch does not justify two days of validity. Fares checked ${CHECKED}.`,
  },
  {
    q: "Does the Hakone Free Pass include the Romancecar?",
    a: `No. The pass covers travel on the Odakyu Line, but the Romancecar is a limited express with a separate reserved-seat charge — ${ROMANCECAR} for an adult and ¥600 for a child from Shinjuku to Hakone-Yumoto. On a tight day trip it is usually money well spent: it is the fastest route out of Tokyo at about 80 minutes direct, and every seat is reserved, so you are not standing with luggage. Buying it through EMot Online Tickets is ¥50 cheaper than at the station. Checked ${CHECKED}.`,
  },
  {
    q: "How long does it take from Shinjuku to Hakone-Yumoto?",
    a: "About 80 minutes direct on the Limited Express Romancecar, according to Odakyu. That is the fast version, and it needs the separate limited express ticket. On the ordinary Odakyu Line services the pass covers in full, the same trip takes longer and usually involves a change at Odawara — fine on a two-day trip, less fine if you are trying to ride the whole loop and be back in Tokyo the same night.",
  },
  {
    q: "Where do you buy the Hakone Free Pass, and do you need to collect anything?",
    a: "Odakyu sells it through EMot Online Tickets, at Odakyu Line stations, at 7-Eleven (7-Ticket), at Odakyu Travel stores, at Hakone Tozan Railway ticket machines and at information centres in the Hakone area. Resellers such as Klook issue it as a digital voucher with an English checkout, which is the practical route if the Japanese payment pages reject your card. Either way there is nothing to post and nothing to queue for on arrival if you buy online.",
  },
  {
    q: "Shinjuku version or Odawara version — which should I buy?",
    a: `Buy the Shinjuku version if you are travelling out from Tokyo on the Odakyu Line, because it includes that leg both ways. Buy the Odawara version — ${PASS_2_DAY_ODAWARA} for 2 days instead of ${PASS_2_DAY_SHINJUKU} — if you are arriving at Odawara by shinkansen, coming up from Kyoto or Osaka, or already staying in Hakone. The two versions cover the same eight modes once you are inside Hakone; the ¥1,100 difference is the Shinjuku–Odawara leg and nothing else.`,
  },
  {
    q: "Is 2 days of validity really 48 hours?",
    a: "No, and this catches people out. Odakyu counts the date of purchase as the first day of validity regardless of what time you bought it, so a 2-day pass bought on a Saturday evening expires after the last train or bus on Sunday, not on Monday evening. Buy it on the morning you actually start travelling.",
  },
  {
    q: "What happens if the ropeway or the cruise is not running?",
    a: "Both are weather-dependent, and the ropeway in particular can be suspended at short notice because of wind or volcanic-gas conditions at Owakudani. Hakone Navi publishes a transport status page for exactly this, so check it the morning you travel rather than on arrival at Sounzan — and remember that a pass does not entitle you to a refund for a leg you chose not to ride.",
  },
];

const TITLE = "Hakone Free Pass (2026): Prices, What It Covers & Is It Worth It?";
const DESCRIPTION =
  "Hakone Free Pass prices for 2026 from Odakyu — ¥7,100 for 2 days from Shinjuku, ¥6,000 from Odawara — the eight modes of transport it covers, the ¥1,200 Romancecar surcharge it does not, and why there is no 1-day version.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/hakone-free-pass") } });

export default function HakoneFreePassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/hakone-free-pass" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/hakone-free-pass" />
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
              route: "/guides/attractions/hakone-free-pass",
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                { "@type": "ListItem", position: 4, name: "Hakone Free Pass", item: "https://www.japan-travel-kit.com/guides/attractions/hakone-free-pass" },
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
          <span className={styles.breadCurrent}>Hakone Free Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Hakone Free Pass (2026):<br />Prices, What It Covers &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            One ticket for eight modes of transport around the Hakone loop — and two things it does not
            cover, one of which is the train most visitors want to take.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official Odakyu prices", "No 1-day version"].map((t) => (
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
                <p className={styles.verdictStatLabel}>2-day, from Shinjuku</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_SHINJUKU}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>2-day, from Odawara</p>
                <p className={styles.verdictStatValue}>{PASS_2_DAY_ODAWARA}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>1-day version?</p>
                <p className={styles.verdictStatValue}>Does not exist</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Romancecar</p>
                <p className={styles.verdictStatValue}>+{ROMANCECAR}, not included</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph on the page, not the hero line above. */}
            <p className={styles.verdictText}>
              The <strong>Hakone Free Pass</strong> — Odakyu spells it Freepass — costs{" "}
              <strong>{PASS_2_DAY_SHINJUKU}</strong> for an adult for 2 days from Shinjuku and{" "}
              <strong>{PASS_2_DAY_ODAWARA}</strong> for 2 days from Odawara, with 3-day versions at{" "}
              {PASS_3_DAY_SHINJUKU} and ¥6,400. It buys unlimited rides on <strong>eight modes of
              transport</strong> around the Hakone loop — the Odakyu Line, the Hakone Tozan mountain train,
              the cable car, the Owakudani ropeway, the Lake Ashi pirate-ship cruise and three bus operators
              — and <strong>there is no 1-day version</strong>. The Limited Express Romancecar is not
              included: that is {ROMANCECAR} extra for an adult on top of the pass, Shinjuku to
              Hakone-Yumoto, about 80 minutes direct. Prices read off odakyu-global.com on {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Hakone Free Pass on Klook →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn} style={{ flex: "1 1 200px" }}>
                Hakone Day Tour Instead →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is the Hakone Free Pass?</h2>
          <p className={styles.bodyText}>
            Hakone is not one attraction but a circuit. The classic route climbs out of Hakone-Yumoto on a
            switchback mountain railway, changes to a funicular, crosses the Owakudani volcanic valley by
            ropeway, sails Lake Ashi on a replica pirate ship and comes back by bus — five operators in one
            afternoon. Buying that leg by leg is both expensive and fiddly, which is the problem the{" "}
            <strong>Hakone Free Pass</strong> exists to solve: one ticket, unlimited rides, eight modes of
            transport.
          </p>
          <p className={styles.bodyText}>
            It comes in two shapes. The Shinjuku version includes the Odakyu Line out of Tokyo and back; the
            Odawara version covers Hakone only and costs ¥1,100 less, which is the right buy if you arrive by
            shinkansen or are already staying in the area. Both are sold as 2-day or 3-day tickets — Odakyu
            publishes no 1-day Hakone Free Pass, so a day trip means buying a day of validity you will not
            use. If you want Hakone in a single day without that, the alternative is a guided coach tour, which
            our{" "}
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Hakone day trip guide
            </Link>{" "}
            compares against the pass in detail.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the Hakone Free Pass?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Adult", "Child"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice}>{row.adult}</td>
                      <td className={styles.tdPrice}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices read off Odakyu&apos;s own site, odakyu-global.com, on {CHECKED}. Two things stand out. The
            third day costs only ¥400 more than the second at either start point, so if there is any chance of
            staying on, take the 3-day. And the Odawara version is ¥1,100 cheaper because it drops the
            Shinjuku–Odawara leg — buy it if a shinkansen, not the Odakyu Line, is bringing you in. Every
            figure on this page sits alongside the other passes we have checked in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>
            , which carries the check date for each one.
          </p>
        </section>

        {/* Coverage table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Included vs not</span>
          <h2 className={styles.sectionTitle}>What Does the Hakone Free Pass Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Odakyu counts eight modes of transport. The useful way to read the list is as the loop itself:
            rows two to six are the circuit, in the order you ride them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Transport", "On the pass?", "What that means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverageRows.map((row) => (
                    <tr key={row.mode}>
                      <td className={styles.tdProvider}>{row.mode}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.included}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Coverage list read off odakyu-global.com on {CHECKED}. The pass also carries discounts at
            facilities around the loop — museums, ropeway-side attractions and hot-spring baths — which we do
            not price here because the participating list and the discount both change.
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Does the Loop Cost More Than the Pass?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Short answer: yes, if you ride all of it. Below are the loop fares we could read off the
            operators&apos; own sites. The legs whose fare tables we could not read on an official page are
            deliberately missing rather than estimated, which means the total below is a floor, not the real
            cost of doing the loop piecemeal.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Leg", "Adult", "Child", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {legRows.map((row) => (
                    <tr key={row.leg}>
                      <td className={styles.tdProvider}>{row.leg}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The ropeway and the cruise alone are <strong>¥3,200 one way for an adult</strong>, before the
            mountain train, the cable car, the closing bus or either Odakyu Line leg out of Tokyo. Odakyu
            publishes its own version of this sum: the Hakone route from Shinjuku at <strong>¥9,200 using
            JR</strong> against <strong>{PASS_2_DAY_SHINJUKU} using Odakyu with the 2-day pass</strong> — a
            ¥2,100 saving for an adult. Fares checked {CHECKED}.
          </p>
        </section>

        {/* Is the pass worth it — judgement table, with the CTA directly after it */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Is the pass worth it?</span>
          <h2 className={styles.sectionTitle}>Is the Hakone Free Pass Worth It for Your Trip?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your plan", "Verdict", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Whichever row you landed on, the booking is the same two choices. The pass is a digital voucher
            with an English checkout — worth knowing if the Japanese retail pages reject a foreign card — and
            the guided loop is a fixed departure with a seat, which is the version that fits a single day.
            Check the cancellation terms and the departure date on the listing before you commit; a pass has a
            validity window and a coach has a timetable, and neither waits for a late flight.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the Hakone Free Pass →
            </KlookLink>
            <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Compare a Hakone Day Tour →
            </KlookLink>
          </div>
        </section>

        {/* Buying and using */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Choose and Buy the Pass</h2>
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
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Long Does Shinjuku to Hakone Take?</h2>
          <p className={styles.bodyText}>
            About <strong>80 minutes direct</strong> from Shinjuku to Hakone-Yumoto on the Limited Express
            Romancecar, per Odakyu — all seats reserved, and the {ROMANCECAR} adult surcharge the pass does not
            include. The ordinary Odakyu Line services the pass covers in full take longer and usually mean a
            change at Odawara. On a two-day trip that difference barely matters; on a single day it decides
            whether you finish the loop before the last boat.
          </p>
          <p className={styles.bodyText}>
            Hakone also pairs naturally with the Fuji Five Lakes, which is a separate pass and a separate
            region — our{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Mt. Fuji day trip guide
            </Link>{" "}
            covers the Mt. Fuji Pass and why it does not get you out of Tokyo. If Hakone is one night inside a
            longer route, both our{" "}
            <Link href="/guides/attractions/tokyo-5-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              5-day Tokyo itinerary
            </Link>{" "}
            and the{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary" style={{ color: "var(--red)", fontWeight: 600 }}>
              14-day Japan itinerary
            </Link>{" "}
            show where the Hakone night sits.
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
          heading="If One Day Is All You Have"
          intro="A pass is the right buy for two days in Hakone. For a single day out of Tokyo, these are the guided versions of the same loop — one coach, one fixed departure, back in the city the same evening. Open a listing for the current price on your date."
          tours={[hakoneLoopBusTour, hakoneCruiseCableCarTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/hakone-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Day Trip From Tokyo (2026): Freepass Prices vs a Day Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Trip From Tokyo (2026): How to Get There Yourself</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="18" height="10" rx="2" />
                  <path d="M7 21l1-4M17 21l-1-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Mt. Fuji Day Tour From Tokyo (2026): Which Tour, and What You Actually See</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
                  <path d="M4 12l5-7 4 6 2-2 5 3z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 5-Day Itinerary (2026): 5 Days in Tokyo, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ride the whole Hakone loop on one ticket</h2>
            <p className={styles.ctaBannerDesc}>
              Eight modes of transport, two or three days, and an English checkout that takes a foreign card.
              If you only have one day, the guided coach version of the same loop is the better buy.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={HAKONE_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Hakone Free Pass →
              </KlookLink>
              <KlookLink href={HAKONE_TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Hakone Day Tours →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
