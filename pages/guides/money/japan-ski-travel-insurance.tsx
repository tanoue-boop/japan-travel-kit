import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  galaNaebaSkiDayTripTokyo,
  hakubaHapponeBusLiftRental,
  hakubaSkiResortDayTourTokyo,
  hakubaSkiSnowboardRental,
  karuizawaSkiSnowDayTour,
  nisekoHirafuLiftPassBusTour,
  nisekoSkiSnowboardRental,
  spicyHakubaSkiRental,
  teineAllInclusiveSkiDayTrip,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

// The same SafetyWing ambassador link the other two insurance guides use — it is
// the only approved insurance affiliate on this site. Heymondo and World Nomads
// are named and compared on their own published policy wording, but deliberately
// get no outbound link here: neither programme is approved yet, so there is no
// raw URL to create. See best-travel-insurance-japan.tsx for the same pattern.
const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";
const SPONSORED_REL = "sponsored noopener noreferrer";

// Klook CTAs. Ski day trips and rental packages sit in the 6.5% tours band, and
// they are the thing a reader books immediately after settling the insurance.
const DAY_TRIP_URL = hakubaSkiResortDayTourTokyo.url;
const RENTAL_URL = nisekoSkiSnowboardRental.url;

// Retitled 6 Nov 2026 (task jtk-20261106-A24) for the searches this page should own: "best
// travel insurance for skiing in japan", "travel insurance for snowboarding in japan" and
// "best travel insurance for a family ski trip to hokkaido". SafetyWing's prices, add-on rules
// and Complete commitment were re-read that day (SW_CHECKED). The rest:
// Every figure and quotation on this page was read on 25 October 2026:
//  - SafetyWing's covered-activities list, the off-piste and heli-skiing
//    exclusions, the helmet and on-piste condition, the Adventure Sports Add-On
//    price, the search-and-rescue answers for both plans, the plan limits and
//    the headline prices: safetywing.com (the Nomad Insurance page, its FAQ and
//    the Nomad Insurance Complete page);
//  - World Nomads' per-plan activity lists and benefit limits: worldnomads.com's
//    own ski/snowboard activity page and its covered-activities help page;
//  - Heymondo's standard cover, its Adventure sports add-on list, its search and
//    rescue limit, its medical maximum and its deductible: heymondo.com's own
//    international and annual travel insurance pages;
//  - the Niseko Rules, the backcountry gate system and the rescue charge:
//    niseko.ne.jp, the resorts' own rules page;
//  - Saitama Prefecture's helicopter rescue fee: pref.saitama.lg.jp's own page on
//    the ordinance; Nagano's position on who pays: pref.nagano.lg.jp.
//
// Re-read 13 Nov 2026 (task jtk-20261113-R03), off safetywing.com/nomad-insurance/policy
// (Essential description of cover) and safetywing.com/nomad-insurance/faq: the skiing and
// snowboarding entries and their off-piste wording, the safety-equipment condition, the
// search-and-rescue exclusion (helicopter named), Complete's ski-resort search and rescue,
// lost checked luggage limits, child and group rules, the add-on price and the plan prices.
// The earlier quotation "as long as you're on piste and wearing a helmet" no longer appears
// on those pages, so it was replaced with the current wording. Niseko Rules re-read the same
// day on niseko.ne.jp. World Nomads' ski page now redirects to a general page, so its values
// stay dated 25 Oct 2026.
const CHECKED = checkedLabel("2026-10-25");
const SW_CHECKED = checkedLabel("2026-11-13");
const LAST_CHECKED = "2026-11-13";

// The cover-item table: one row per thing a ski trip in Japan actually claims for.
// Only values read on SafetyWing's own policy wording and FAQ; anything those pages do
// not state is "Check the policy wording", never a guess.
const coverRows = [
  {
    item: "Bottom line",
    essential: "Covers on-piste skiing and snowboarding for medical treatment and medical evacuation. No search and rescue, no off-piste.",
    complete: "Adds search and rescue at a recognised ski resort. A 12-month plan, not a single-trip one.",
    other: "Confirm that skiing is named, where the off-piste line is drawn, and whether rescue is a separate benefit.",
  },
  {
    item: "On-piste skiing and snowboarding",
    essential: "Covered. Both are in the covered-activities list. Safety equipment such as a helmet must be worn as the sport requires.",
    complete: "Covered. Sports are included without an add-on; professional and high-risk activities are excepted.",
    other: "Check the policy wording.",
  },
  {
    item: "Off-piste inside the resort boundary",
    essential: "Excluded: \"not covered off-piste\". The US$10 Adventure Sports Add-On keeps off-piste on its exclusion list.",
    complete: "Check the policy wording.",
    other: "World Nomads: covered within resort boundaries on every plan (its own activity list, read 25 Oct 2026).",
  },
  {
    item: "Backcountry (through a resort gate)",
    essential: "Excluded: off-piste means outside marked territory or against the advice of the ski school or authority.",
    complete: "Check the policy wording. Search and rescue during off-site winter sports is not covered.",
    other: "World Nomads: named only on the Explorer plan (read 25 Oct 2026).",
  },
  {
    item: "Helicopter rescue / search and rescue",
    essential: "Not covered. The exclusions name search and rescue \"including air transfer services via helicopter\". Medical evacuation to a hospital is covered to US$100,000 lifetime.",
    complete: "Covered at a recognised ski resort or similar winter sports resort. Not at sea, not during off-site winter sports.",
    other: "Check the policy wording.",
  },
  {
    item: "Skis, board or rental gear lost or stolen",
    essential: "No named ski-equipment benefit. Lost checked luggage up to US$3,000 per period, US$500 per item.",
    complete: "Check the policy wording.",
    other: "Check the policy wording.",
  },
  {
    item: "Unused lift pass or ski school after an injury",
    essential: "Not listed in the description of cover. Check the policy wording.",
    complete: "Check the policy wording.",
    other: "Check the policy wording.",
  },
  {
    item: "Runs or lifts closed by bad weather",
    essential: "Not listed in the description of cover. Check the policy wording.",
    complete: "Check the policy wording.",
    other: "Check the policy wording.",
  },
];

const skiRows = [
  {
    provider: "SafetyWing Nomad Insurance Essential",
    skiing: "Named in the covered-activities list — skiing and snowboarding both. Appropriate safety equipment, such as a helmet, must be worn as the sport requires.",
    offPiste: "Excluded. The list says skiing \"not covered off-piste and/or against the advice of the local ski school or local authoritative body\" — and the add-on does not change it.",
    rescue: "Not covered. The plan's own answer is \"This plan doesn't cover search and rescue.\"",
    gear: "Lost checked luggage up to US$3,000 per period (US$500 per item); no separate winter-sports equipment benefit.",
  },
  {
    provider: "SafetyWing Adventure Sports Add-On (US$10 / 28 days, subscriptions only)",
    skiing: "Adds free-style skiing, ski and snowboard jumping, ski-flying and skiing/snowboarding acrobatics to the Essential plan.",
    offPiste: "Still excluded — the add-on's own exclusion list names heli-skiing and off-piste skiing/snowboarding. Cover is up to US$100,000 lifetime.",
    rescue: "Unchanged: no search and rescue.",
    gear: "Unchanged.",
  },
  {
    provider: "SafetyWing Nomad Insurance Complete",
    skiing: "Sports covered without an add-on, with leisure sports and activities to US$250,000. Professional and high-risk activities are excepted.",
    offPiste: "Not stated on the FAQ; check the policy wording. Search and rescue during off-site winter sports is not covered.",
    rescue: "Covered at a recognised ski resort or similar winter sports resort. Not covered at sea, and not during off-site winter sports.",
    gear: "Check the policy wording.",
  },
  {
    provider: "World Nomads Standard",
    skiing: "Skiing and snowboarding listed, including dry slope, heli and snowblading; nordic skiing on marked trails.",
    offPiste: "Covered off piste when you are inside resort boundaries — that is the wording. Outside the boundary is not on this plan.",
    rescue: "Emergency evacuation US$400,000–700,000 across the range; US$125,000 emergency medical on this plan.",
    gear: "US$1,000 of gear.",
  },
  {
    provider: "World Nomads Explorer",
    skiing: "Adds the more extreme end: acrobatics, free-style, jumping, racing, terrain park.",
    offPiste: "This is the plan that names backcountry, outside-resort-boundary and alpine ski touring, plus helicopter and snowcat access.",
    rescue: "US$150,000 emergency medical on this plan, same evacuation range.",
    gear: "US$2,000 of gear.",
  },
  {
    provider: "Heymondo",
    skiing: "Its published standard cover names sledding in ski resorts; its Adventure sports add-on list does not name downhill skiing either way.",
    offPiste: "Not addressed on the published pages checked, so treat it as unconfirmed rather than covered.",
    rescue: "The only one of the three with a named search-and-rescue benefit: up to US$10,000 if you are lost during the trip.",
    gear: "Baggage cover, with an electronic-equipment add-on; no named ski-equipment benefit.",
  },
];

const costRows = [
  {
    plan: "SafetyWing Nomad Insurance Essential",
    price: "US$62.72 per 4 weeks, ages 10–39",
    what: "On-piste skiing and snowboarding in the covered list, US$250,000 overall limit, US$100,000 lifetime emergency evacuation, no deductible.",
    when: "A one-week or two-week ski trip where you ski inside the ropes. The cheapest route to cover that actually names skiing.",
  },
  {
    plan: "Essential + Adventure Sports Add-On",
    price: "+US$10 per 28 days, subscriptions only",
    what: "Free-style, jumping, ski-flying and acrobatics on top. Off-piste and heli-skiing stay excluded.",
    when: "Park riders on a subscription. Fixed-date plans cannot take it. It does not buy backcountry cover.",
  },
  {
    plan: "SafetyWing Nomad Insurance Complete",
    price: "US$177.50 per month, ages 18–39, 12-month commitment",
    what: "US$1,500,000 annual medical maximum, sports without an add-on, and search and rescue at a recognised ski resort.",
    when: "Someone who wants a year of health cover anyway. It is a 12-month commitment, so it does not suit a single ski trip.",
  },
  {
    plan: "World Nomads Standard / Explorer",
    price: "Quoted per trip by age and dates",
    what: "US$125,000 / US$150,000 emergency medical, US$1,000 / US$2,000 of gear, and the only off-piste wording of the three.",
    when: "Short, dated trips — and the Explorer plan if you intend to go through a backcountry gate.",
  },
  {
    plan: "Heymondo",
    price: "Quoted per trip; no published price",
    what: "Medical to US$10,000,000 and a named US$10,000 search-and-rescue benefit.",
    when: "If the headline medical limit and the rescue benefit matter more than a published ski clause — but get skiing confirmed in writing first.",
  },
];

const japanRows = [
  {
    item: "Niseko backcountry gates",
    rule: "Always use the gates; never duck a boundary rope; never enter an off-limits area",
    cost: "Lift pass can be confiscated and you can be banned from the resorts",
    note: "The Niseko Rules are the resorts' own published rules, not advice. Rule 1 is the gate; the gates close when conditions are judged dangerous, and going out when they are closed is prohibited.",
  },
  {
    item: "Niseko backcountry rescue",
    rule: "You pay for a rescue outside the boundaries",
    cost: "Minimum ¥100,000",
    note: "A published minimum, not an estimate — and precisely the cost that no standard policy's off-piste exclusion will touch.",
  },
  {
    item: "Helmet and beacon in the backcountry",
    rule: "Everyone in a backcountry area should wear a helmet and carry an avalanche beacon",
    cost: "—",
    note: "SafetyWing's own wording requires appropriate safety equipment, such as a helmet, for the activity, and excludes accidents where proper safety gear was not used. The resort rule and the policy rule point the same way.",
  },
  {
    item: "Children in the backcountry",
    rule: "Elementary-school children are not allowed in backcountry areas unless accompanied by an older companion",
    cost: "—",
    note: "Worth knowing before a family trip to Hirafu, because it is a rule of the resort rather than a parental judgement call.",
  },
  {
    item: "Nagano public helicopter rescue (Hakuba, Nozawa, Shiga Kogen)",
    rule: "The prefecture does not bill individuals for fire-and-disaster helicopter mountain rescue",
    cost: "¥0 from the prefecture",
    note: "Nagano's own published position: the helicopter rescue is treated as an extension of the free municipal ambulance and rescue service. Private rescue teams are a separate bill.",
  },
  {
    item: "Saitama prefectural helicopter rescue",
    rule: "A statutory fee applies in designated mountain areas",
    cost: "¥8,000 per 5 minutes of flight time",
    note: "Raised from ¥5,000 on 1 April 2024. The prefecture gives the past average rescue as about an hour, which is roughly ¥96,000. Proof that \"rescue is free in Japan\" is not a safe assumption.",
  },
];

const faqItems = [
  {
    q: "Does travel insurance cover snowboarding in Japan?",
    a: `Yes on marked runs, if the policy names it. SafetyWing Nomad Insurance lists snowboarding as a covered activity on the same terms as skiing: not covered off-piste or against the advice of the local ski school or authority, and safety equipment such as a helmet must be worn as the sport requires. Snowboard jumping and acrobatics need its US$10 per 28 days Adventure Sports Add-On, sold on subscriptions only. Read on SafetyWing's policy wording and FAQ on ${SW_CHECKED}.`,
  },
  {
    q: "Is off-piste skiing covered?",
    a: `Not by default. SafetyWing excludes off-piste skiing and snowboarding on every plan — outside marked territory or against the advice of the ski school or authority — and its Adventure Sports Add-On keeps off-piste and heli-skiing on its exclusion list (read ${SW_CHECKED}). World Nomads' own activity list covers off piste within resort boundaries on every plan and names backcountry only on its Explorer plan (read ${CHECKED}). Going through a Niseko or Hakuba backcountry gate is a plan you choose before you buy, not an add-on.`,
  },
  {
    q: "What is the best travel insurance for a family ski trip to Hokkaido?",
    a: `For a family skiing marked runs, SafetyWing Nomad Insurance Essential. One child aged 14 days to 9 years per adult, up to two per group, is added at no extra cost; older children pay their own age price, and group members can only be added at purchase. It covers on-piste skiing and snowboarding but not search and rescue or off-piste, and the Niseko Rules bar elementary-school children from backcountry areas unless accompanied. Read on ${SW_CHECKED}.`,
  },
  {
    q: "Do I need ski insurance for Niseko?",
    a: `If you ski only the marked runs, a policy that names skiing covers the medical side. Niseko is where the gaps show: the resorts' own Niseko Rules charge a minimum of ¥100,000 for a rescue outside the boundaries and can confiscate your lift pass for ducking a rope, and SafetyWing Essential excludes search and rescue, including by helicopter. For backcountry gates you need a plan that names backcountry. Niseko Rules and SafetyWing wording read on ${SW_CHECKED}.`,
  },
  {
    q: "What does ski insurance cost for Japan?",
    a: `SafetyWing publishes US$62.72 per 4 weeks for Nomad Insurance Essential at ages 10–39, which covers on-piste skiing and snowboarding. The Adventure Sports Add-On is an extra US$10 per 28 days on subscriptions, and Nomad Insurance Complete is US$177.50 a month at ages 18–39. Prices rise with age and neither plan has a deductible. World Nomads and Heymondo quote per trip, so they have no list price. Read on safetywing.com on ${SW_CHECKED}.`,
  },
];

// Retitled 13 Nov 2026 (R03): exact "travel insurance for skiing in japan" and "snowboarding"
// up front; "family" and "Hokkaido" in the description for the 1.2-position, 0%-CTR query.
const TITLE = "Travel Insurance for Skiing & Snowboarding in Japan (2026)";
const DESCRIPTION =
  "Travel insurance for skiing in Japan: snowboarding, off-piste and helicopter rescue cover compared, and the best pick for a family ski trip to Hokkaido.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/money/japan-ski-travel-insurance") },
});

export default function JapanSkiTravelInsurancePage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/japan-ski-travel-insurance" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/japan-ski-travel-insurance" />
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
              route: "/guides/money/japan-ski-travel-insurance",
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
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Travel Insurance for Skiing in Japan",
                  item: "https://www.japan-travel-kit.com/guides/money/japan-ski-travel-insurance",
                },
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
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Travel Insurance for Skiing</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Travel Insurance for Skiing in Japan: Snowboarding, Off-Piste &amp; Family Trips (2026)
          </h1>
          <p className={styles.heroSubtitle}>
            On-piste skiing is standard cover almost everywhere. One gate at Niseko or Hakuba moves you
            outside every standard policy — and into a published ¥100,000 rescue bill.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "From published policy wording", "The off-piste line"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Not advice */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Not insurance advice.</strong> This is general information, compiled from the providers&apos;
            own published policy and coverage pages on {CHECKED}. Cover and price vary by age, country of
            residence, trip length and plan, and the wording changes. Read the policy document for your own
            quote before you buy — and get anything ambiguous confirmed in writing. Some links on this page,
            including the <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} style={{ color: "var(--text)", fontWeight: 600 }}>SafetyWing</a>{" "}
            and Klook links, are affiliate links; we may earn a small commission at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            {/* Answer-first (R03, 13 Nov 2026): the first body paragraph, ahead of the stat grid. */}
            <p className={styles.verdictText} style={{ marginTop: 0, marginBottom: "1rem" }}>
              <strong>Travel insurance for skiing in Japan</strong> needs to cover four things: emergency
              medical treatment, rescue and evacuation off the mountain, your skis, board or rental gear, and
              unused lift passes or lessons after an injury. <strong>Off-piste and backcountry</strong> riding
              is excluded or conditional on most policies: SafetyWing&apos;s Essential plan excludes it, even with its{" "}
              <strong>US$10</strong> Adventure Sports Add-On, and World Nomads covers off piste only inside
              resort boundaries except on its Explorer plan. <strong>SafetyWing Nomad Insurance
              Essential</strong> (<strong>US$62.72 per 4 weeks</strong>, ages 10–39) names skiing and
              snowboarding as covered activities but excludes search and rescue, including by helicopter;
              its Complete plan covers search and rescue at a recognised ski resort. SafetyWing wording read
              on {SW_CHECKED}; World Nomads on {CHECKED}.
            </p>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On-piste skiing &amp; snowboarding</p>
                <p className={styles.verdictStatValue}>Covered — wear a helmet</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Off-piste / backcountry</p>
                <p className={styles.verdictStatValue}>Plan-level, not an add-on</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Niseko backcountry rescue</p>
                <p className={styles.verdictStatValue}>From ¥100,000, billed to you</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest named ski cover</p>
                <p className={styles.verdictStatValue}>US$62.72 / 4 weeks</p>
              </div>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={styles.verdictBtn}>
                Get a SafetyWing quote →
              </a>
              <KlookLink href={RENTAL_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Reserve Ski Rental →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Cover table (R03): what a ski trip actually claims for, item by item. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cover checklist</span>
          <h2 className={styles.sectionTitle}>What Does Ski Travel Insurance Cover in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            On-piste skiing and snowboarding is covered on SafetyWing; off-piste, backcountry and helicopter
            search and rescue are not on its Essential plan. Lift-pass refunds and weather closures are not
            listed in its description of cover, so check the wording of any policy before you rely on them.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Cover item", "SafetyWing Essential", "SafetyWing Complete", "Any other policy"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.essential}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.complete}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED}. Sources: SafetyWing&apos;s Essential description of cover
            (https://safetywing.com/nomad-insurance/policy) and FAQ
            (https://safetywing.com/nomad-insurance/faq). World Nomads values from worldnomads.com, read on{" "}
            {CHECKED}. Cover varies by country of residence and policy version; the document attached to your
            quote is the one that counts.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={styles.verdictBtn}>
              Check SafetyWing ski cover →
            </a>
          </div>
        </section>

        <EsimCtaTop />

        {/* The core question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The one distinction</span>
          <h2 className={styles.sectionTitle}>Does Travel Insurance Cover Skiing in Japan?</h2>
          <p className={styles.bodyText}>
            For skiing on the marked runs, yes, and more often than people expect — this is not a sport you
            normally have to buy an upgrade for. SafetyWing&apos;s Nomad Insurance names both{" "}
            <strong>skiing</strong> and <strong>snowboarding</strong> in its covered-activities list, along
            with ice skating, sledding and ice climbing under 4,500 m. World Nomads lists skiing and
            snowboarding on every plan it sells. The question is never really &quot;is skiing
            covered?&quot;; it is <strong>which skiing</strong>.
          </p>
          <p className={styles.bodyText}>
            There are three conditions attached that are easy to miss, and all three are in the
            providers&apos; own wording rather than in the small print of a reviewer&apos;s opinion.{" "}
            <strong>On piste</strong> — SafetyWing&apos;s list says skiing and snowboarding are &quot;not
            covered off-piste&quot;. <strong>Wearing a helmet</strong> — its policy wording requires that
            appropriate safety equipment, such as a helmet, is worn as the activity requires, and it excludes
            accidents where proper safety gear was not used.{" "}
            <strong>Not against local advice</strong> — the covered list excludes skiing &quot;against the
            advice of the local ski school or local authoritative body&quot;, which in Japan means the patrol
            and the gate system, not a vague notion of recklessness.
          </p>
          <p className={styles.bodyText}>
            That third condition is the one that does the work, because Japanese resorts publish their rules
            and close their gates on a daily basis. Ducking a rope at Niseko is not an ambiguous judgement
            call that an adjuster might take your side on; it is a documented breach of the resort&apos;s
            own published rules, which is exactly what the exclusion is written to catch. For cover on the rest of your trip, see our{" "}
            <Link href="/guides/money/best-travel-insurance-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              best travel insurance for Japan
            </Link>{" "}
            guide. Heading out from Tokyo for a day? See the{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Gala Yuzawa ski day trip from Tokyo
            </Link>{" "}
            or, for snow play rather than skiing, the{" "}
            <Link href="/guides/attractions/tokyo-snow-day-trip" style={{ color: "var(--red)", fontWeight: 600 }}>
              snow day trip from Tokyo
            </Link>{" "}
            guide. Staying in Sapporo? The{" "}
            <Link href="/guides/attractions/sapporo-ski-day-trip" style={{ color: "var(--red)", fontWeight: 600 }}>
              Sapporo ski day trip
            </Link>{" "}
            guide compares Teine, Kiroro and Rusutsu.
          </p>
        </section>

        {/* Comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>How Each Insurer Treats Skiing, Off-Piste, Rescue and Gear</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Every cell below is the provider&apos;s own published wording or figure, not our interpretation
            of it. Where a provider does not address something, the cell says so rather than guessing.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "How skiing is treated", "Off-piste", "Search & rescue", "Equipment"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skiRows.map((row) => (
                    <tr key={row.provider}>
                      <td className={styles.tdProvider}>{row.provider}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.skiing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.offPiste}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rescue}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.gear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            SafetyWing rows from safetywing.com — the Nomad Insurance page, its FAQ and the Nomad Insurance
            Complete page. World Nomads rows from worldnomads.com&apos;s own ski and snowboard activity page
            and its covered-activities help page. Heymondo rows from heymondo.com&apos;s own international
            and annual travel insurance pages. All read on {CHECKED}; SafetyWing rows re-read on {SW_CHECKED}. Cover varies by country of residence
            and by the version of the policy you are sold, so the document attached to your quote is the one
            that counts.
          </p>
        </section>

        {/* Off-piste */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The exclusion</span>
          <h2 className={styles.sectionTitle}>Is Off-Piste Skiing Covered?</h2>
          <p className={styles.bodyText}>
            Not as standard, and the useful way to think about it is not &quot;on-piste versus off-piste&quot;
            but <strong>inside versus outside the resort boundary</strong> — because that is the line the two
            providers with published ski wording actually draw, and they draw it differently.
          </p>
          <p className={styles.bodyText}>
            <strong>SafetyWing excludes off-piste on every plan.</strong> Its covered list says skiing and
            snowboarding are &quot;not covered off-piste&quot;, and the Adventure Sports Add-On — the thing
            people assume fixes this — explicitly keeps <strong>heli-skiing</strong> and{" "}
            <strong>off-piste skiing/snowboarding</strong> on its own exclusion list. Ten dollars buys you
            free-style, jumping, ski-flying and acrobatics. It does not buy you a tree run outside the ropes.
          </p>
          <p className={styles.bodyText}>
            <strong>World Nomads splits it by plan.</strong> On its own published activity lists, every plan
            including Standard covers skiing and snowboarding &quot;on piste or off piste within resort
            boundaries&quot;, and only the <strong>Explorer</strong> plan names
            &quot;backcountry/outside of resort boundary/alpine ski touring&quot; and access &quot;by
            helicopter/snow cat&quot;. So for Japan&apos;s famous sidecountry — the gated terrain that is the
            whole reason people fly to Hokkaido — this is a plan you choose at purchase, not a box you tick
            later.
          </p>
          <p className={styles.bodyText}>
            <strong>Heymondo</strong> is not resolved by its published pages: its standard cover names
            sledding in ski resorts and its Adventure sports add-on list names rafting, canyoning, diving
            under 20 m, bouldering to 8 m and trekking to 5,000 m, but not downhill skiing in either
            direction. That is not the same as an exclusion, and it is not reported as one here — but
            it does mean a Japan ski trip is a case to get confirmed before you pay. Our{" "}
            <Link href="/guides/money/safetywing-vs-heymondo-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              SafetyWing vs Heymondo comparison
            </Link>{" "}
            covers how the two differ on everything else.
          </p>
        </section>

        {/* The two searches the title cannot carry. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Snowboarders</span>
          <h2 className={styles.sectionTitle}>Does Travel Insurance Cover Snowboarding in Japan?</h2>
          <p className={styles.bodyText}>
            Yes, on marked runs, wherever the policy names it — snowboarding is treated the same as skiing.
            SafetyWing lists both, on the same off-piste and safety-equipment conditions, and World Nomads lists
            them together on every plan. Park riding is where they split:
            on SafetyWing, snowboard jumping and acrobatics need the US$10 Adventure Sports Add-On, and fixed-date
            plans cannot take it, so a park rider needs a subscription. SafetyWing wording re-read on{" "}
            {SW_CHECKED}.
          </p>
          <span className={styles.sectionLabel} style={{ marginTop: "1.5rem" }}>Families</span>
          <h2 className={styles.sectionTitle}>What Is the Best Travel Insurance for a Family Ski Trip to Hokkaido?</h2>
          <p className={styles.bodyText}>
            For a family skiing marked runs at Niseko, Rusutsu or Teine, SafetyWing Nomad Insurance Essential is
            our pick, because young children ride free: one child aged 14 days to 9 years per adult, up to two
            children per group, is included at no extra cost. On-piste skiing and snowboarding are covered for
            every member, and it does not cover search and rescue or off-piste. Read on {SW_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Four things to check for children and companions before you pay:
          </p>
          <ul className={styles.bodyText} style={{ paddingLeft: "1.25rem" }}>
            <li>
              <strong>Ages.</strong> A third child, or any child aged 10 or over, pays the regular price for
              their age bracket.
            </li>
            <li>
              <strong>Add everyone at once.</strong> SafetyWing states a group member can only be added at a
              purchase point, so buy one policy for the whole family rather than adding a child later.
            </li>
            <li>
              <strong>Helmets for everyone.</strong> The policy requires safety equipment such as a helmet as
              the activity requires; rent children&apos;s helmets with the skis.
            </li>
            <li>
              <strong>If a parent is hospitalised.</strong> Essential&apos;s travel cover includes transportation
              home for your children if you are hospitalised. The Niseko Rules also bar elementary-school
              children from backcountry areas unless accompanied by an older companion.
            </li>
          </ul>
          <p className={styles.bodyText}>
            Plan the trip with our{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link>,{" "}
            <Link href="/guides/attractions/sapporo-ski-day-trip">Sapporo ski day trip</Link> and{" "}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary">7-day Hokkaido itinerary</Link> guides.
            Source: SafetyWing FAQ (https://safetywing.com/nomad-insurance/faq) and Niseko Rules
            (https://www.niseko.ne.jp/en/niseko-rules/). Last checked: {LAST_CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={styles.verdictBtn}>
              Check SafetyWing for a family trip →
            </a>
          </div>
        </section>

        {/* Niseko: the resort the backcountry exclusion bites hardest at. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Niseko</span>
          <h2 className={styles.sectionTitle}>Do I Need Ski Insurance for Niseko?</h2>
          <p className={styles.bodyText}>
            If you ski only the marked runs, a policy that names skiing covers the medical side; Niseko is where
            the gaps show. The resorts&apos; own Niseko Rules charge a <strong>minimum of ¥100,000</strong> for a
            rescue outside the boundaries, and a lift pass can be confiscated for ducking a rope. SafetyWing
            Essential excludes search and rescue, including by helicopter, so for the backcountry gates you need
            a plan whose activity list names backcountry. Niseko Rules and SafetyWing wording read on{" "}
            {SW_CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Lessons, transfers and lift passes are the bookings that fill first in peak weeks; see{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link> for the four areas and the
            transfer options.
          </p>
        </section>

        {/* Book on the same trip (R03): Klook ski tours, 6.5% tours band. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Book on the same trip</span>
          <h2 className={styles.sectionTitle}>What to Book with Your Ski Insurance</h2>
          <p className={styles.bodyText}>
            The insurance covers you; the lift days still need booking. Check whether the lift ticket and rental
            are in the package, and the cancellation window, on each listing before you pay.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={nisekoHirafuLiftPassBusTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Niseko lift pass + bus from Sapporo →
            </KlookLink>
            <KlookLink href={teineAllInclusiveSkiDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Teine all-inclusive ski day →
            </KlookLink>
            <KlookLink href={galaNaebaSkiDayTripTokyo.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Ski day trip from Tokyo →
            </KlookLink>
            <KlookLink href={RENTAL_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Niseko ski rental →
            </KlookLink>
          </div>
        </section>

        {/* Japan specifics */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Japan specifics</span>
          <h2 className={styles.sectionTitle}>Who Pays for a Mountain Rescue in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            This is the part that almost no international insurance comparison covers, and it is the reason
            the off-piste exclusion matters more in Japan than it sounds. Rescue in Japan is not uniformly
            free, and the resorts themselves publish what they will charge you.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "The published rule", "What it costs", "Why it matters"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {japanRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.rule}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Put the two halves together and the picture is uncomfortable but clear. The one cost that is
            genuinely large and genuinely chargeable — a rescue from outside the ropes — is the one cost that
            SafetyWing&apos;s Essential plan states plainly it does not cover, and that World Nomads attaches
            to its most expensive plan. SafetyWing&apos;s <strong>Complete plan</strong> covers search and rescue at a recognised ski
            resort, but not at sea or &quot;during off-site winter sports&quot;, and it is a 12-month
            commitment.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Niseko rules and the ¥100,000 rescue minimum from niseko.ne.jp, the resorts&apos; own rules page.
            Saitama&apos;s ¥8,000-per-5-minutes helicopter fee and the one-hour average from Saitama
            Prefecture&apos;s own page on the ordinance, which also records the rise from ¥5,000 on 1 April
            2024. Nagano&apos;s position on not billing individuals from the prefecture&apos;s own published
            answer. All read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={styles.verdictBtn}>
              Compare SafetyWing plans →
            </a>
          </div>
        </section>

        {/* Cost table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>What Does Ski Insurance Cost for Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            SafetyWing Essential costs US$62.72 per 4 weeks at ages 10–39 and covers on-piste skiing and
            snowboarding; World Nomads and Heymondo quote per trip. Last checked: {LAST_CHECKED}, on
            https://safetywing.com/nomad-insurance/faq.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Published price", "What you get for it", "When it is the right buy"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two of the five rows have no list price, and that is not an omission: World Nomads and Heymondo
            both quote per trip from your age and dates, so the only honest number is the one your own quote
            returns. The two figures that are published — <strong>US$62.72 per 4 weeks</strong> for
            SafetyWing Essential at ages 10–39 and <strong>US$177.50 a month</strong> for Complete at ages 18–39.
            Complete is a 12-month commitment, so the resort search-and-rescue clause is not a one-trip
            purchase. Prices read on {SW_CHECKED}; see also our{" "}
            <Link href="/guides/money/japan-travel-budget" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan travel budget guide
            </Link>{" "}
            for where insurance sits against the rest of a winter trip.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={styles.verdictBtn}>
              Get a SafetyWing quote →
            </a>
          </div>
        </section>

        {/* What to book next */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>After the policy</span>
          <h2 className={styles.sectionTitle}>What to Book Next: Lift Days and Rental</h2>
          <p className={styles.bodyText}>
            Once the cover is settled, the two things worth booking before you fly are the{" "}
            <strong>rental</strong> and, if you are based in Tokyo rather than at a resort, the{" "}
            <strong>day trip</strong>. Rental first, because it removes a real insurance problem: nobody&apos;s
            policy gives skis and boards a generous benefit — SafetyWing has no named winter-sports equipment
            cover at all, and World Nomads&apos; gear limits run from US$1,000 to US$3,000 and exclude
            unattended equipment. Flying your own gear to Japan means paying an oversize fee to carry an
            underinsured asset. Booking a rental set in Hakuba or Niseko ahead of time avoids both, and
            avoids the 08:00 queue at the shop on your first morning.
          </p>
          <p className={styles.bodyText}>
            On the day trips, three details are worth checking on the listing rather than guessing at, and
            none of them is a price: <strong>whether the date is inside the operating season</strong> — the
            Yuzawa and Hakuba day trips are winter-only and the resorts&apos; own seasons differ by weeks at
            each end — <strong>whether the lift ticket and the rental are in the package or extra</strong>,
            and <strong>what the cancellation window is</strong>, which matters more for snow than for
            anything else you book in Japan. A warm week in January genuinely closes runs.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={DAY_TRIP_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Hakuba Day Trip From Tokyo →
            </KlookLink>
            <KlookLink href={RENTAL_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Niseko Ski Rental →
            </KlookLink>
          </div>
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

        <KlookTourPicks
          heading="Ski Days and Rental to Book Once the Cover Is Sorted"
          intro="Day trips from Tokyo for a short winter stay, and rental sets in Hakuba and Niseko that you reserve before you fly rather than queue for at 08:00. Open a listing for availability and the current price on your dates — and check whether the lift ticket is in the package."
          tours={[nisekoHirafuLiftPassBusTour, teineAllInclusiveSkiDayTrip, hakubaSkiResortDayTourTokyo, hakubaHapponeBusLiftRental, galaNaebaSkiDayTripTokyo, karuizawaSkiSnowDayTour, nisekoSkiSnowboardRental, hakubaSkiSnowboardRental, spicyHakubaSkiRental]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 10 Nov 2026: a ski day out of a Sapporo hotel — Teine, Kiroro or Rusutsu. */}
            <Link href="/guides/attractions/sapporo-ski-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sapporo Ski Day Trip (2026–27): Teine, Kiroro or Rusutsu</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 1 Nov 2026: the resort this page's Niseko rental and lesson advice is about. */}
            <Link href="/guides/attractions/niseko-ski-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Niseko Ski Tours (2027): Transfers, Lessons &amp; the Four Areas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 1 Nov 2026: the one-day ski trip a Tokyo-only itinerary can still insure. */}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Gala Yuzawa Ski Day Trip from Tokyo: 71 Min, ¥8,000 Lifts</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 1 Nov 2026: the island week a Niseko or Rusutsu ski trip is usually bolted onto. */}
            <Link href="/guides/attractions/hokkaido-7-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hokkaido 7 Day Itinerary: 7 Days in Hokkaido, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 1 Nov 2026: the non-ski day a Hokkaido snow week needs when the weather closes the lifts. */}
            <Link href="/guides/attractions/otaru-day-trip-from-sapporo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17l1-5h12l1 5M9 12V7h6v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Otaru Day Trip from Sapporo (2027): ¥800, 33 Min by JR</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 30 Oct 2026: the February event most Hokkaido ski trips are planned around. */}
            <Link href="/guides/attractions/sapporo-snow-festival-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5L4.9 17.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sapporo Snow Festival Tours (2027): 4–11 Feb, Free Sites</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-winter-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10" />
                  <path d="M12 6l-2.5-2M12 6l2.5-2M12 18l-2.5 2M12 18l2.5 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Winter Itinerary: 12 Days, Day by Day (2027)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-insurance-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6a10 10 0 0 1 8-4z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Insurance for Japan (2026): Compared &amp; Reviewed</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/safetywing-vs-heymondo-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6a10 10 0 0 1 8-4z" />
                  <path d="M9 11h6M12 8v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>SafetyWing vs Heymondo for Japan (2026): Which Should You Pick?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget 2026: Trip to Tokyo Japan Cost &amp; How Much Things Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip From Tokyo (2026): Shinkansen Times, the Five Stops and Tour vs DIY</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Fees and ATM Limits Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Money &amp; Payment Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>One gate decides which policy you needed</h2>
            <p className={styles.ctaBannerDesc}>
              Inside the ropes, on-piste cover with a helmet is enough and it is cheap. Through a backcountry
              gate, you are outside every standard policy and inside a published ¥100,000 rescue charge.
              Decide which trip you are taking before you buy, not at the top of the lift.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={styles.ctaBannerBtn}>
                Get a SafetyWing quote →
              </a>
              <KlookLink href={RENTAL_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Ski Rental →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
