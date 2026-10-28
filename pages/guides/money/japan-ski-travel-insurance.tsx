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
  nisekoSkiSnowboardRental,
  spicyHakubaSkiRental,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

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
const CHECKED = checkedLabel("2026-10-25");

const skiRows = [
  {
    provider: "SafetyWing Nomad Insurance Essential",
    skiing: "Named in the covered-activities list — skiing and snowboarding both. Its own wording: injuries are covered \"as long as you're on piste and wearing a helmet\".",
    offPiste: "Excluded. The list says skiing \"not covered off-piste and/or against the advice of the local ski school or local authoritative body\" — and the add-on does not change it.",
    rescue: "Not covered. The plan's own answer is \"This plan doesn't cover search and rescue.\"",
    gear: "Lost checked luggage up to US$3,000 per plan; no separate winter-sports equipment benefit.",
  },
  {
    provider: "SafetyWing Adventure Sports Add-On (US$10 / 28 days)",
    skiing: "Adds free-style skiing, ski and snowboard jumping, ski-flying and skiing/snowboarding acrobatics to the Essential plan.",
    offPiste: "Still excluded — the add-on's own exclusion list names heli-skiing and off-piste skiing/snowboarding.",
    rescue: "Unchanged: no search and rescue.",
    gear: "Unchanged.",
  },
  {
    provider: "SafetyWing Nomad Insurance Complete",
    skiing: "Sports covered without an add-on, with leisure sports and activities to US$250,000. Same on-piste and helmet condition.",
    offPiste: "Off-piste is still outside the on-piste wording. Professional and high-risk activities are excepted.",
    rescue: "Covered at a recognised ski resort or similar winter sports resort. Not covered at sea, and not during off-site winter sports.",
    gear: "Lost luggage up to US$6,000 lifetime.",
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
    offPiste: "Not addressed on the published pages we could read, so treat it as unconfirmed rather than covered.",
    rescue: "The only one of the three with a named search-and-rescue benefit: up to US$10,000 if you are lost during the trip.",
    gear: "Baggage cover, with an electronic-equipment add-on; no named ski-equipment benefit.",
  },
];

const costRows = [
  {
    plan: "SafetyWing Nomad Insurance Essential",
    price: "US$62.72 per 4 weeks, ages 18–39",
    what: "On-piste skiing and snowboarding in the covered list, US$250,000 overall limit, US$100,000 lifetime emergency evacuation, no deductible.",
    when: "A one-week or two-week ski trip where you ski inside the ropes. The cheapest route to cover that actually names skiing.",
  },
  {
    plan: "Essential + Adventure Sports Add-On",
    price: "+US$10 per 28 days",
    what: "Free-style, jumping, ski-flying and acrobatics on top. Off-piste and heli-skiing stay excluded.",
    when: "Park riders. It is ten dollars, and it is not what buys you backcountry cover — nothing in this plan does.",
  },
  {
    plan: "SafetyWing Nomad Insurance Complete",
    price: "US$177.50 per month, ages 18–39",
    what: "US$1,500,000 annual medical maximum, sports without an add-on, and search and rescue at a recognised ski resort.",
    when: "A long winter in Japan, or anyone who wants the resort search-and-rescue clause. This is the one clause that changes the risk picture.",
  },
  {
    plan: "World Nomads Standard / Explorer",
    price: "Quoted per trip by age and dates",
    what: "US$125,000 / US$150,000 emergency medical, US$1,000 / US$2,000 of gear, and the only off-piste wording of the three.",
    when: "Short, dated trips — and the Explorer plan if you intend to go through a backcountry gate.",
  },
  {
    plan: "Heymondo",
    price: "Quoted per trip; US$250 deductible on medical claims",
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
    note: "Also the condition SafetyWing's own wording attaches to on-piste cover: on piste and wearing a helmet. The resort rule and the policy rule point the same way.",
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
    q: "Does travel insurance cover skiing in Japan?",
    a: `Usually yes for on-piste skiing, and usually no the moment you leave the marked runs. SafetyWing's Nomad Insurance names skiing and snowboarding in its covered-activities list, with the condition that injuries are covered "as long as you're on piste and wearing a helmet", and the same list says skiing is "not covered off-piste and/or against the advice of the local ski school or local authoritative body". World Nomads goes further on its own published lists: all its plans include skiing and snowboarding "on piste or off piste within resort boundaries", and only the Explorer plan adds backcountry and outside-resort-boundary terrain. Heymondo's published standard cover names sledding in ski resorts and its Adventure sports add-on list does not name downhill skiing, so confirm that one in writing. All read off the providers' own pages on ${CHECKED}.`,
  },
  {
    q: "Is off-piste skiing covered?",
    a: `Not by default anywhere, and the distinction that matters is not "off-piste" but "inside or outside the resort boundary". SafetyWing excludes off-piste skiing and snowboarding outright, and its US$10 Adventure Sports Add-On does not change that — the add-on's own exclusions name heli-skiing and off-piste. World Nomads covers off-piste within resort boundaries on every plan, and names backcountry, outside-resort-boundary, alpine ski touring and helicopter or snowcat access only on the Explorer plan. So if you intend to go through a Niseko or Hakuba backcountry gate, that is a plan-level decision you make before you buy, not an add-on you tick at checkout.`,
  },
  {
    q: "How much does ski travel insurance for Japan cost?",
    a: `SafetyWing publishes US$62.72 per 4 weeks for Nomad Insurance Essential at ages 18–39, with the Adventure Sports Add-On at an extra US$10 per 28 days, and US$177.50 a month for Nomad Insurance Complete at the same ages. World Nomads and Heymondo are both quoted per trip by age and dates, so neither has a list price — Heymondo publishes a US$250 deductible on medical claims, and SafetyWing has no deductible on either plan. Figures read on ${CHECKED}. The useful way to read them: the winter-sports decision costs ten dollars if you ride the park, and about three times the premium if you want the Complete plan's resort search-and-rescue clause.`,
  },
  {
    q: "Who pays for a mountain rescue in Japan?",
    a: `It depends on where you are and who comes to get you, and the answer is not uniformly "the state". In Nagano — Hakuba, Nozawa Onsen, Shiga Kogen — the prefecture's published position is that it does not charge individuals for fire-and-disaster helicopter mountain rescue, treating it as an extension of the free municipal rescue service. Saitama, by contrast, charges a statutory fee of ¥8,000 per 5 minutes of flight time in designated mountain areas, with an average past rescue of about an hour. And at Niseko, the resorts' own Niseko Rules state a minimum charge of ¥100,000 for a rescue outside the boundaries. Checked ${CHECKED}.`,
  },
  {
    q: "What are the Niseko Rules, and why do they matter for your insurance?",
    a: "They are the Niseko resorts' own published rules for leaving the patrolled area, and they line up almost exactly with where the insurance stops. Always use the gates; never duck a boundary rope; never enter an off-limits area; backcountry riding is prohibited when the gates are closed; wear a helmet and carry an avalanche beacon in backcountry areas; elementary-school children are not allowed out there unless accompanied. Break them and the resorts can confiscate your lift pass and ban you — and you will be charged for a rescue, from ¥100,000. Since every standard policy excludes riding against the advice of the local authority, a rule breach and a claim denial are the same event.",
  },
  {
    q: "Does an insurance add-on let you ski the backcountry?",
    a: "Not SafetyWing's. This is the single most common misreading of winter-sports cover: the Adventure Sports Add-On buys you free-style, jumping, ski-flying and acrobatics, and its own exclusion list still names heli-skiing and off-piste skiing and snowboarding. If backcountry is the point of your trip to Japan, the thing you need is a plan whose activity list names backcountry — World Nomads' Explorer plan does, on its own published list — not a ten-dollar upgrade on a plan that excludes it.",
  },
  {
    q: "Are my skis and snowboard covered?",
    a: `Thinly, and not usually as ski equipment. SafetyWing's Essential plan has lost checked luggage up to US$3,000 per plan and the Complete plan up to US$6,000 lifetime, neither of them a named winter-sports equipment benefit. World Nomads publishes gear limits of US$1,000 on Standard, US$2,000 on Explorer and US$3,000 on Epic, and excludes unattended equipment and wear and tear from everyday use. On a Japan trip there is a simpler answer: rent at the resort. Hakuba and Niseko both have rental shops you can book before you fly, which removes the baggage risk, the airline oversize fee and the question entirely.`,
  },
  {
    q: "Do you really need a helmet for the cover to work?",
    a: "SafetyWing's own wording says injuries while skiing or snowboarding are covered \"as long as you're on piste and wearing a helmet\", and its policy conditions require that appropriate safety equipment is worn for the activity. The Niseko Rules independently require a helmet in backcountry areas. So treat the helmet as a condition of the policy rather than a preference — and note that every rental package in Japan will sell you one for a few hundred yen a day.",
  },
  {
    q: "Can you buy ski insurance after you have arrived in Japan?",
    a: "With SafetyWing, yes — it is a subscription you can start while you are already travelling, and there is no deductible on either plan. What you cannot do anywhere is buy cover for something that has already happened, and pre-existing conditions and anything you already have symptoms of are excluded. Trip-based policies generally apply a waiting period if you buy after departure. The practical rule for a ski trip is to have the policy in force before the first lift, because the first day is statistically the one you are least used to the snow.",
  },
  {
    q: "What happens if you are injured at a Japanese ski resort — who pays the hospital?",
    a: "You do, first. Japanese hospitals and clinics overwhelmingly expect payment at the time of treatment and leave you to claim it back, so the practical requirements are a card with enough headroom and every itemised receipt (領収書). Resort clinics in Hakuba and Niseko see a great many foreign patients and some have English-speaking staff, but a transfer to a prefectural hospital for anything serious will not. This is the argument for a provider with 24/7 assistance that can locate care and talk to the hospital, which is a different question from how high the medical limit is.",
  },
  {
    q: "Is SafetyWing or World Nomads better for a Japan ski trip?",
    a: "On published ski wording, it depends entirely on where you intend to ride. Inside the ropes, SafetyWing names skiing and snowboarding, has no deductible and is cheap, and the Complete plan adds search and rescue at a recognised ski resort — which is the clause most ski trips should actually be shopping for. Outside the ropes, SafetyWing excludes you on every plan, and World Nomads' Explorer plan is the one whose own activity list names backcountry, outside-resort-boundary touring and helicopter access. Neither is better in the abstract; the gate you intend to go through decides it.",
  },
];

const TITLE = "Ski Travel Insurance for Japan (2026): Off-Piste Cover";
const DESCRIPTION =
  "Ski insurance for Japan: on-piste cover is standard, SafetyWing excludes off-piste even with its US$10 add-on, and Niseko's rescue minimum is ¥100,000.";

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
          <span className={styles.breadCurrent}>Ski Travel Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Best Travel Insurance for Skiing in Japan (2026):<br />Off-Piste, Rescue Costs and What Is Covered
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
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On-piste skiing</p>
                <p className={styles.verdictStatValue}>Standard — with a helmet</p>
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
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>best travel insurance for skiing in Japan</strong> is whichever policy names your
              terrain, because every mainstream provider draws the same line in a different place.{" "}
              <strong>SafetyWing</strong> lists skiing and snowboarding as covered activities — its wording is
              that injuries are covered <em>&quot;as long as you&apos;re on piste and wearing a
              helmet&quot;</em> — and <strong>excludes off-piste outright</strong>, including with its{" "}
              <strong>US$10 per 28 days</strong> Adventure Sports Add-On, whose own exclusions still name
              heli-skiing and off-piste. <strong>World Nomads</strong> covers off piste{" "}
              <em>within resort boundaries</em> on every plan and names backcountry and outside-resort-boundary
              terrain only on its <strong>Explorer</strong> plan. <strong>Heymondo</strong> publishes the
              largest medical maximum and the only named <strong>US$10,000</strong> search-and-rescue benefit,
              but its published activity lists do not settle downhill skiing. Why it matters in Japan
              specifically: the <strong>Niseko Rules</strong> state a{" "}
              <strong>minimum ¥100,000 charge</strong> for a rescue outside the resort boundaries, and
              SafetyWing&apos;s Essential plan says plainly{" "}
              <em>&quot;This plan doesn&apos;t cover search and rescue.&quot;</em> All quotations read off the
              providers&apos; and resorts&apos; own pages on {CHECKED}.
            </p>
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
            <strong>On piste.</strong> <strong>Wearing a helmet</strong> — SafetyWing states that injuries
            while skiing or snowboarding are covered &quot;as long as you&apos;re on piste and wearing a
            helmet&quot;, and its conditions require appropriate safety equipment for the activity.{" "}
            <strong>Not against local advice</strong> — the covered list excludes skiing &quot;against the
            advice of the local ski school or local authoritative body&quot;, which in Japan means the patrol
            and the gate system, not a vague notion of recklessness.
          </p>
          <p className={styles.bodyText}>
            That third condition is the one that does the work, because Japanese resorts publish their rules
            and close their gates on a daily basis. Ducking a rope at Niseko is not an ambiguous judgement
            call that an adjuster might take your side on; it is a documented breach of the resort&apos;s
            own published rules, which is exactly what the exclusion is written to catch. For the wider
            comparison across all three insurers, see our{" "}
            <Link href="/guides/money/best-travel-insurance-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              best travel insurance for Japan
            </Link>{" "}
            roundup.
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
            and annual travel insurance pages. All read on {CHECKED}. Cover varies by country of residence
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
            <strong>Heymondo</strong> we cannot resolve from its published pages: its standard cover names
            sledding in ski resorts and its Adventure sports add-on list names rafting, canyoning, diving
            under 20 m, bouldering to 8 m and trekking to 5,000 m, but not downhill skiing in either
            direction. That is not the same as an exclusion, and we are not going to report it as one — but
            it does mean a Japan ski trip is a case to get confirmed before you pay. Our{" "}
            <Link href="/guides/money/safetywing-vs-heymondo-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              SafetyWing vs Heymondo comparison
            </Link>{" "}
            covers how the two differ on everything else.
          </p>
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
            to its most expensive plan. The only policy wording in this comparison that covers search and
            rescue at a ski resort at all is <strong>SafetyWing&apos;s Complete plan</strong>, and even that
            says it does not apply at sea or &quot;during off-site winter sports&quot;.
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
          <h2 className={styles.sectionTitle}>How Much Does Ski Travel Insurance for Japan Cost?</h2>
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
            SafetyWing Essential and <strong>US$177.50 a month</strong> for Complete, both at ages 18–39 —
            are what make the trade-off legible: the gap between them is roughly what the resort
            search-and-rescue clause costs. Prices read on {CHECKED}; see also our{" "}
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
          tours={[hakubaSkiResortDayTourTokyo, hakubaHapponeBusLiftRental, galaNaebaSkiDayTripTokyo, karuizawaSkiSnowDayTour, nisekoSkiSnowboardRental, hakubaSkiSnowboardRental, spicyHakubaSkiRental]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
