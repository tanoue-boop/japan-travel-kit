import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";

// CTA / provider links — SafetyWing is an affiliate link; the rest are normal links for now.
// TODO: replace with approved affiliate link
const HEYMONDO_URL = "https://heymondo.com/";
const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";
// TODO: replace with approved affiliate link
const WORLDNOMADS_URL = "https://www.worldnomads.com/";

// Affiliate links need rel="sponsored"; plain provider links stay nofollow.
const SPONSORED_REL = "sponsored noopener noreferrer";
const PLAIN_REL = "noopener noreferrer nofollow";

/**
 * Rewritten 28 Oct 2026. The page was drawing 781 Google impressions over 28 days at an
 * average position of 51.9, and its October clicks had fallen from three to none: it
 * answered "which provider is nicest" when the search is "what does this cost and how
 * much cover do I need". The lead, the two tables, the eight question headings and the
 * FAQ are new; the three provider CTAs are unchanged.
 *
 * The rewrite also removed the one thing on the old page that was not sourced anywhere —
 * a "$30–$60 for a week, $50–$100 for two" premium table that was an estimate dressed as
 * data. What replaces it is only what the providers and the Japanese government publish,
 * each row attributed and dated:
 *
 *   safetywing.com/nomad-insurance      Nomad Insurance Essential at US$62.72 per      28 Oct 2026
 *                                       4 weeks for ages 18–39, a US$250,000 overall
 *                                       limit, emergency medical evacuation to
 *                                       US$100,000 lifetime, US$5,000 for a ticket
 *                                       home on a family death, travel delay at $60
 *                                       (3–8 h) and $150 (8+ h), "Stay covered across
 *                                       180+ countries. US coverage is extra", and
 *                                       sign-up "before you depart or at any point
 *                                       during your travels".
 *   safetywing.com/nomad-insurance/faq  "Nomad Insurance does not have a deductible    28 Oct 2026
 *                                       on either plan!", the Complete plan's
 *                                       $1.5 million per policy year and US$161.50 a
 *                                       month for ages 18–39, and the Essential plan's
 *                                       on-piste-only skiing with a $10 adventure-sports
 *                                       add-on per 4 weeks.
 *   heymondo.com/travel-insurance-      medical expenses "up to $10,000,000 USD",       28 Oct 2026
 *     international/                    trip cancellation "up to $7,000 USD", baggage
 *                                       "up to $2,500 USD", medical transport
 *                                       "Included", "Our Heymondo insurances don't have
 *                                       a deductible", 24/7 doctor chat, and the three
 *                                       plan families (single trip, annual multi-trip
 *                                       for trips up to 60 days, long stay for 90+ days).
 *   worldnomads.com                     "Coverage and plan availability will depend on   28 Oct 2026
 *                                       your country of residence", "Benefit limits may
 *                                       vary depending on the plan chosen", "you can buy
 *                                       cover anytime, anywhere" with a possible waiting
 *                                       period, and that an activity may need a policy
 *                                       or sporting-level upgrade.
 *   jnto.go.jp/emergency/eng/           the Japan National Tourism Organization's own    28 Oct 2026
 *     mi_guide.html                     guide for falling ill in Japan: a ¥7.5 million
 *                                       bicycle-collision case and a ¥10 million heart
 *                                       attack case, the warning that "foreign visitors
 *                                       who fail to pay their medical expenses may be
 *                                       denied entry into Japan in the future", and the
 *                                       Japan Visitor Hotline on 050-3816-2787.
 *   mhlw.go.jp/stf/newpage_46516.html   the Ministry of Health, Labour and Welfare's     28 Oct 2026
 *                                       own page title and position: 「訪日時の医療機関受診
 *                                       に備えて、民間医療保険の加入を強く推奨します」.
 *
 * No premium is quoted for Heymondo or World Nomads, because neither publishes one — both
 * price per quote. Nothing on this page is first-hand and no policy was purchased to write
 * it; every figure is the body that published it, on the date it was read.
 */
const CHECKED = checkedLabel("2026-10-28");

/** What the three providers actually publish. Blank-looking cells are the point. */
const coverRows = [
  {
    plan: "SafetyWing — Nomad Insurance Essential",
    medical: "US$250,000 overall limit",
    evac: "US$100,000 lifetime max",
    excess: "No deductible on either plan",
    premium: "US$62.72 per 4 weeks, ages 18–39",
  },
  {
    plan: "SafetyWing — Nomad Insurance Complete",
    medical: "US$1.5 million per policy year, as full health cover",
    evac: "Included; the plan adds routine care, check-ups and sports",
    excess: "No deductible on either plan",
    premium: "US$161.50 a month, ages 18–39",
  },
  {
    plan: "Heymondo — single trip, annual multi-trip or long stay",
    medical: "Medical expenses up to US$10,000,000",
    evac: "Medical transport and repatriation included",
    excess: "“Our Heymondo insurances don't have a deductible”",
    premium: "Not published — priced per quote",
  },
  {
    plan: "World Nomads — Standard or Explorer",
    medical: "Published only once you select your country of residence",
    evac: "Overseas medical and emergency evacuation, limits by plan",
    excess: "Varies by plan and residence",
    premium: "Not published — priced per quote",
  },
];

/** What Japan itself publishes about the bill. This is the part that sets the limit. */
const japanCostRows = [
  {
    what: "Bicycle collision — pneumothorax and rib fractures, surgery and a hospital stay",
    figure: "About ¥7.5 million",
    source: "JNTO, guide for falling ill in Japan",
  },
  {
    what: "Acute heart attack — surgery, a long stay and transport home",
    figure: "About ¥10 million",
    source: "JNTO, guide for falling ill in Japan",
  },
  {
    what: "What a visitor pays of that",
    figure: "All of it. Japan's national health insurance is for residents, so a short-term visitor is billed the full uninsured rate",
    source: "MHLW and JNTO",
  },
  {
    what: "Japan's own advice",
    figure: "「訪日時の医療機関受診に備えて、民間医療保険の加入を強く推奨します」 — private medical insurance is strongly recommended before you need a doctor here",
    source: "Ministry of Health, Labour and Welfare",
  },
  {
    what: "What happens if the bill goes unpaid",
    figure: "JNTO warns that visitors who fail to pay their medical expenses may be denied entry into Japan in future",
    source: "JNTO",
  },
  {
    what: "Free help finding a hospital",
    figure: "Japan Visitor Hotline, 050-3816-2787 — JNTO's 24/7 call centre in English, Chinese and Korean",
    source: "JNTO",
  },
];

const whatToLookFor = [
  {
    rank: 1,
    name: "A medical limit that covers Japan's worst case, not its average one",
    desc: `JNTO's own illness guide prices a bicycle collision with surgery at about ¥7.5 million and a heart attack with a long stay and transport home at about ¥10 million — roughly US$50,000 and US$67,000 at any recent rate. A US$250,000 limit clears both comfortably; a credit card's US$20,000 of incidental cover does not. Read on ${CHECKED}.`,
  },
  {
    rank: 2,
    name: "Emergency evacuation as a separate line",
    desc: "Repatriation is the item that turns a large bill into an unpayable one, and it is usually capped separately from medical expenses. SafetyWing's Essential plan states US$100,000 lifetime for emergency medical evacuation; Heymondo includes medical transport and repatriation in its international plan. Check that line specifically, not just the headline limit.",
  },
  {
    rank: 3,
    name: "English-speaking 24/7 assistance",
    desc: "When you are unwell in a country whose language you don't read, a 24-hour English line or in-app medical chat is worth more than a slightly cheaper premium. Heymondo publishes 24/7 doctor chat and video consultation in its app. Japan also runs the free Japan Visitor Hotline on 050-3816-2787 in English, Chinese and Korean — useful for finding a hospital that will see you, whoever insures you.",
  },
  {
    rank: 4,
    name: "The way it pays — upfront versus direct billing",
    desc: "Most Japanese hospitals take payment first and leave you to claim, so the practical question is how much your card can carry on the day. Keep every itemised receipt (領収書) and any medical report. Where an insurer can arrange payment directly for a larger bill, contact the assistance line before treatment rather than after.",
  },
  {
    rank: 5,
    name: "Winter sports and adventure cover, named",
    desc: "Japan's skiing is a reason people come, and standard cover rarely includes it. SafetyWing's FAQ states that on the Essential plan skiing is covered on-piste only and adventure sports need a US$10 add-on every four weeks; World Nomads says an activity may require a policy or sporting-level upgrade. Confirm your own activity is named in the wording before you rely on it.",
  },
];

const providers = [
  {
    name: "Heymondo",
    badge: "Highest Published Medical Limit",
    badgeColor: "var(--accent)",
    url: HEYMONDO_URL,
    rel: PLAIN_REL,
    pros: [
      "Medical expenses up to US$10,000,000 on its international plan",
      "Medical transport and repatriation included",
      "No deductible — “Our Heymondo insurances don't have a deductible”",
      "24/7 doctor chat and video consultation in the app",
      "Three plan families: single trip, annual multi-trip for trips up to 60 days, long stay for 90+ days",
    ],
    cons: [
      "Publishes no price at all — every figure comes from a quote",
      "Trip cancellation is capped at US$7,000 and baggage at US$2,500",
      "Winter sports and adventure activities need checking against the wording for your own plan",
    ],
    verdict: `The strongest published cover of the three for an ordinary Japan trip: a US$10,000,000 medical limit and included repatriation sit a long way above anything JNTO's own worst-case examples reach, and the in-app doctor chat is the feature that matters most in a country where you cannot read the signage. Its weakness is price transparency — there is no published premium to compare, so you have to quote it. Figures read on ${CHECKED}.`,
  },
  {
    name: "SafetyWing",
    badge: "Only Published Price",
    badgeColor: "var(--sumi)",
    url: SAFETYWING_URL,
    rel: SPONSORED_REL,
    pros: [
      "The only one of the three that publishes a premium: US$62.72 per 4 weeks for ages 18–39 on Nomad Insurance Essential",
      "US$250,000 overall limit and US$100,000 lifetime emergency medical evacuation",
      "No deductible on either plan",
      "Subscription billing — buy before you leave or while already abroad, cancel when you are done",
      "The Complete plan steps up to US$1.5 million per policy year with routine care and sports included",
    ],
    cons: [
      "Published price is for ages 18–39 — it rises with age, so quote your own band",
      "Essential covers skiing on-piste only; adventure sports are a US$10 add-on every 4 weeks",
      "Leaner trip benefits than a comprehensive trip policy: US$5,000 towards a ticket home on a family death, travel delay at $60 for 3–8 hours and $150 beyond",
    ],
    verdict: `The one you can price before you click anything, and the natural fit for a long or open-ended stay because it bills every four weeks rather than per trip. US$250,000 of cover is ample against the ¥7.5m and ¥10m cases JNTO publishes; the gap to Heymondo is in the trip-side benefits and the ski wording. Figures read on ${CHECKED}.`,
  },
  {
    name: "World Nomads",
    badge: "Widest Activity List",
    badgeColor: "var(--sumi)",
    url: WORLDNOMADS_URL,
    rel: PLAIN_REL,
    pros: [
      "Built around adventure activities — the usual pick for a ski or hiking trip",
      "Overseas medical cover including hospital bills, doctor visits and emergency evacuation or repatriation",
      "“You can buy cover anytime, anywhere” — including once you are already travelling",
      "Trip-based cover including cancellation, delay and baggage",
    ],
    cons: [
      "Publishes no limits or prices until you select your country of residence — “Coverage and plan availability will depend on your country of residence”",
      "“Benefit limits may vary depending on the plan chosen”, so two travellers can hold very different cover under the same brand",
      "A policy bought while travelling may have a waiting period before cover starts",
      "“Not all activities, sports, and experiences are covered under every plan” — an upgrade may be required",
    ],
    verdict: `The pick if the trip is built around Niseko, Hakuba or the hiking, because the activity list is where it competes. The honest caveat is that nothing about it can be compared on this page: it publishes no limit and no premium until it knows where you live, so treat the quote as the specification. Wording read on ${CHECKED}.`,
  },
];

const compareRows = [
  { factor: "Policy type", heymondo: "Single trip, annual multi-trip, long stay", safetywing: "Subscription (4-weekly)", worldnomads: "Single / multi-trip" },
  { factor: "Published medical limit", heymondo: "Up to US$10,000,000", safetywing: "US$250,000 (Essential)", worldnomads: "Not published until residence selected" },
  { factor: "Published premium", heymondo: "None — quote only", safetywing: "US$62.72 / 4 weeks, ages 18–39", worldnomads: "None — quote only" },
  { factor: "Deductible", heymondo: "None stated", safetywing: "None on either plan", worldnomads: "Varies by plan" },
  { factor: "Medical chat / app", heymondo: "24/7 doctor chat and video", safetywing: "App-based claims", worldnomads: "24/7 assistance" },
  { factor: "Skiing / adventure", heymondo: "Check the wording for your plan", safetywing: "On-piste only; US$10 add-on per 4 weeks", worldnomads: "Upgrade may be required" },
  { factor: "Buy after departure", heymondo: "Yes", safetywing: "Yes", worldnomads: "Yes, possible waiting period" },
];

const useCases = [
  {
    title: "First trip, one to three weeks",
    desc: "Heymondo if you want the largest published medical limit and in-app English support; SafetyWing if you want to know the price before you start. Both clear Japan's published worst-case bills with room to spare.",
  },
  {
    title: "Long stay, working holiday or nomad",
    desc: "SafetyWing's subscription is the natural fit — billed every four weeks, cancellable when you leave, and buyable after you have already gone. Heymondo's long-stay plan family covers 90-day-plus trips if you prefer trip-based cover.",
  },
  {
    title: "Ski or snowboard trip (Niseko, Hakuba, Nozawa)",
    desc: "World Nomads at the right sporting level, or Heymondo with the winter-sports wording confirmed. SafetyWing's Essential plan is on-piste only unless you add adventure sports, which is the detail that catches people out in Japan's backcountry.",
  },
];

const faqItems = [
  {
    q: "Do you need travel insurance for Japan?",
    a: `It is not a visa condition, but Japan's own government asks you to have it: the Ministry of Health, Labour and Welfare publishes a page headed 「訪日時の医療機関受診に備えて、民間医療保険の加入を強く推奨します」 — private medical insurance is strongly recommended before you need a doctor here. The reason is arithmetic. National health insurance covers residents, not visitors, so you pay the full uninsured rate, and JNTO's own illness guide prices a bicycle collision with surgery at about ¥7.5 million and a heart attack with a long stay and transport home at about ¥10 million. JNTO also warns that visitors who fail to pay may be denied entry to Japan in future. Read on ${CHECKED}.`,
  },
  {
    q: "How much does travel insurance for Japan cost?",
    a: `Only one of the three providers on this page publishes a number: SafetyWing's Nomad Insurance Essential is US$62.72 per 4 weeks for ages 18–39, and its Complete plan US$161.50 a month for the same band, both rising with age. Heymondo and World Nomads publish no premium at all — they price per quote, on your age, trip length, residence and plan — so any single figure you see quoted for them is someone's guess. Get a quote for your own dates and compare it against that SafetyWing figure as the reference point. Read on ${CHECKED}.`,
  },
  {
    q: "How much medical cover do you need for Japan?",
    a: `Enough to clear about ¥10 million, which is the larger of the two worked examples JNTO publishes — roughly US$67,000 at any recent exchange rate — and then a margin for evacuation, which is capped separately and is the item that runs highest. SafetyWing's Essential plan at a US$250,000 overall limit plus US$100,000 of lifetime evacuation covers that; Heymondo's international plan states medical expenses up to US$10,000,000 with medical transport included. What does not cover it is a credit card's incidental travel benefit, which is typically an order of magnitude smaller. Read on ${CHECKED}.`,
  },
  {
    q: "Which travel insurance is best for Japan?",
    a: "There is no single winner. On published cover, Heymondo is the strongest: medical expenses up to US$10,000,000, repatriation included, no deductible, 24/7 doctor chat. On published price, SafetyWing is the only one that has one, and its four-weekly billing suits long or undated stays. On activities, World Nomads is the usual pick for a ski trip because the activity list is its selling point — at the cost of publishing nothing until it knows your country of residence. Match it to the trip rather than looking for a universal answer.",
  },
  {
    q: "Does travel insurance cover skiing in Japan?",
    a: `Only where the wording says so. SafetyWing's own FAQ states that on the Essential plan skiing is covered on-piste only, and that adventure sports require a US$10 add-on every four weeks; World Nomads says not all activities are covered under every plan and that an upgrade may be needed. In Japan that distinction is sharper than elsewhere, because the powder people fly in for is often just outside the ropes. Confirm your activity is named before you travel — our ski-specific guide goes through it in detail. Read on ${CHECKED}.`,
  },
  {
    q: "Can you buy travel insurance after arriving in Japan?",
    a: `Yes, and JNTO's own guide says so — it notes that private medical insurance you can purchase after entering Japan provides sufficient coverage during your stay. SafetyWing states you can sign up before you depart or at any point during your travels, and World Nomads that you can buy cover anytime, anywhere, with the caveat that a policy bought while travelling may have a waiting period before cover starts. Anything already wrong with you when you buy will not be covered, so buying before you leave home is still the better plan. Read on ${CHECKED}.`,
  },
  {
    q: "How do insurance claims work at Japanese hospitals?",
    a: "Most Japanese hospitals take payment on the day and leave you to claim it back, so the practical limit is what your card can carry — see our Japan travel card guide for the daily ceilings. Keep every itemised receipt (領収書) and any medical report; both are what the claim is built on. Where your insurer can arrange payment directly for a larger bill, call the assistance line before treatment rather than afterwards. JNTO's free Japan Visitor Hotline on 050-3816-2787 operates 24/7 in English, Chinese and Korean and can help you find a hospital that will see a foreign visitor.",
  },
  {
    q: "Is credit card travel insurance enough for Japan?",
    a: `Rarely, and the reason is the limit rather than the principle. Card cover is typically tens of thousands of dollars where Japan's published worst cases run to about ¥10 million, it often requires the trip to be paid on the card, and evacuation is frequently excluded or tightly capped. As a comparison point, SafetyWing publishes US$250,000 of cover with no deductible for US$62.72 per 4 weeks at ages 18–39 — read on ${CHECKED} — which is a small fraction of a single night in a Japanese hospital.`,
  },
];

const TITLE = "Best Travel Insurance for Japan 2026: Cover and Cost";
const DESCRIPTION =
  "Best travel insurance for Japan in 2026 on published figures: SafetyWing from US$62.72 per 4 weeks, Heymondo cover to $10,000,000, and what Japan bills.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/best-travel-insurance-japan") } });

export default function BestTravelInsuranceJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/best-travel-insurance-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/best-travel-insurance-japan" />
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
              route: "/guides/money/best-travel-insurance-japan",
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
                { "@type": "ListItem", position: 3, name: "Money & Payment", item: "https://www.japan-travel-kit.com/guides/money" },
                { "@type": "ListItem", position: 4, name: "Best Travel Insurance for Japan", item: "https://www.japan-travel-kit.com/guides/money/best-travel-insurance-japan" },
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
          <span className={styles.breadCurrent}>Best Travel Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Best Travel Insurance for Japan 2026:<br />Cover, Cost &amp; What Japan Bills
          </h1>
          <p className={styles.heroSubtitle}>
            Heymondo, SafetyWing and World Nomads on their own published limits and prices — set against the
            figures Japan&apos;s own government publishes for what treatment here costs.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Published limits only", "JNTO & MHLW figures", "By trip type"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Disclaimer */}
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Not insurance advice.</strong> This is general information only — not insurance advice.
            Coverage and prices vary by age, trip length, country of residence and plan, and change over time.
            Always get a quote and read the policy wording before you buy. Confirm the latest details on the
            official{" "}
            <a href={HEYMONDO_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--text)", fontWeight: 600 }}>Heymondo</a>,{" "}
            <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} style={{ color: "var(--text)", fontWeight: 600 }}>SafetyWing</a>, and{" "}
            <a href={WORLDNOMADS_URL} target="_blank" rel="noopener noreferrer nofollow" style={{ color: "var(--text)", fontWeight: 600 }}>World Nomads</a>{" "}
            sites. Some links on this page are affiliate links; we may earn a commission at no extra cost to
            you. <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Lead paragraph — the whole answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            The <strong>best travel insurance for Japan</strong> is whichever policy clears Japan&apos;s own
            published medical bills, and those are larger than most travellers expect: JNTO&apos;s official
            guide for falling ill here prices a bicycle collision with surgery at about{" "}
            <strong>¥7.5 million</strong> and a heart attack with a long stay and transport home at about{" "}
            <strong>¥10 million</strong>, all of which a short-term visitor pays in full because national
            health insurance covers residents only. Against that, <strong>SafetyWing</strong> publishes
            US$250,000 of cover with no deductible at <strong>US$62.72 per 4 weeks</strong> for ages 18–39 —
            the only published premium of the three — while <strong>Heymondo</strong> states medical expenses
            up to <strong>US$10,000,000</strong> with repatriation included and prices per quote, and{" "}
            <strong>World Nomads</strong> publishes neither limit nor price until it knows your country of
            residence, competing instead on the activity list for a ski trip. Japan&apos;s Ministry of Health,
            Labour and Welfare puts it plainly: private medical insurance is strongly recommended before you
            need a doctor here. All figures read on {CHECKED}.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Highest published cover</p>
                <p className={styles.verdictStatValue}>Heymondo — to US$10m</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Only published price</p>
                <p className={styles.verdictStatValue}>SafetyWing — US$62.72 / 4 wks</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Ski &amp; adventure</p>
                <p className={styles.verdictStatValue}>World Nomads (upgrade may apply)</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Key rule:</strong> size the policy against Japan&apos;s bill, not against the premium.
              About ¥10 million is the larger of the two cases JNTO publishes, so a limit in the hundreds of
              thousands of dollars — with evacuation listed separately — is the floor, and a credit card&apos;s
              incidental cover is not it.
            </p>
          </div>
        </div>

        {/* Q1 — do you need it, and what Japan bills. The CTA stack sits here, at the
            point the reader has just seen the number the policy has to clear — the part
            an AI answer does not finish. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>First things first</span>
          <h2 className={styles.sectionTitle}>Do You Need Travel Insurance for Japan?</h2>
          <p className={styles.bodyText}>
            Nothing at the border requires it — and Japan&apos;s own health ministry asks you to have it
            anyway. The reason is that you are billed the full uninsured rate as a visitor, and the figures
            Japan publishes for what that comes to are not small. These are the official ones rather than
            estimates.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "What Japan publishes", `Source (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {japanCostRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.figure}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The two case figures and the entry warning are the Japan National Tourism Organization&apos;s own
            guide for travellers who fall ill in Japan; the insurance recommendation is the Ministry of Health,
            Labour and Welfare&apos;s page on seeing a doctor as a visitor. Both read on {CHECKED}.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Those are the numbers a policy has to clear. Quoting takes a couple of minutes and the premium is
            age- and date-dependent, so the only way to compare them properly is to run all three for your own
            trip:
          </p>
          <div className={styles.pickCtaRow}>
            {providers.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel={p.rel} className={styles.pickCta}>
                Get a {p.name} quote →
              </a>
            ))}
          </div>
        </section>

        {/* Q2 — cost */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost and cover</span>
          <h2 className={styles.sectionTitle}>How Much Does Travel Insurance for Japan Cost?</h2>
          <p className={styles.bodyText}>
            One of the three publishes a price. SafetyWing shows US$62.72 per 4 weeks for ages 18–39 on its
            Essential plan and US$161.50 a month for its Complete plan in the same band; Heymondo and World
            Nomads quote rather than publish, so the honest answer for them is &ldquo;get the quote&rdquo;
            rather than a range invented for a page. What all three do publish is their cover, which is the
            part worth comparing before the price.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Provider and plan", "Medical limit", "Evacuation / repatriation", "Deductible", `Published premium (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.medical}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.evac}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.excess}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every cell is the provider&apos;s own published wording, read on {CHECKED}. Premiums rise with age
            and vary with trip length and country of residence, so the SafetyWing figures are the published
            18–39 band rather than what you will pay. No estimated premium appears anywhere on this page —
            where a provider publishes none, the cell says so. For the two app-first providers side by side,
            see our{" "}
            <Link href="/guides/money/safetywing-vs-heymondo-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              SafetyWing vs Heymondo guide
            </Link>.
          </p>
        </section>

        {/* Q3 — how much cover */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Criteria</span>
          <h2 className={styles.sectionTitle}>How Much Cover Do You Need for Japan?</h2>
          <div className={styles.stepsList}>
            {whatToLookFor.map((item) => (
              <div key={item.rank} className={styles.stepCard}>
                <span className={styles.stepNum}>{item.rank}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{item.name}</p>
                  <p className={styles.stepDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Q4 — the providers */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The three providers</span>
          <h2 className={styles.sectionTitle}>Which Travel Insurance Is Best for Japan?</h2>
          <p className={styles.bodyText}>
            Heymondo on published cover, SafetyWing on published price and long stays, World Nomads on
            activities. Each block below is built from that provider&apos;s own published figures and wording,
            read on {CHECKED} — not from a score.
          </p>

          {providers.map((p) => (
            <div key={p.name} className={styles.providerBlock}>
              <div className={styles.providerHeader}>
                <h3 className={styles.providerName}>{p.name}</h3>
                <span className={styles.providerBadge} style={{ background: p.badgeColor }}>
                  {p.badge}
                </span>
              </div>
              <div className={styles.pickGrid}>
                <div className={styles.pickPros}>
                  <p className={styles.pickListLabel}>Pros</p>
                  <ul className={styles.pickList}>
                    {p.pros.map((item) => (
                      <li key={item}><span className={styles.proIcon}>+</span>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pickCons}>
                  <p className={styles.pickListLabel}>Cons</p>
                  <ul className={styles.pickList}>
                    {p.cons.map((item) => (
                      <li key={item}><span className={styles.conIcon}>−</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={styles.bodyText} style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
                <strong>Our verdict:</strong> {p.verdict}
              </p>
              <a href={p.url} target="_blank" rel={p.rel} className={styles.verdictBtn} style={{ marginTop: "1rem" }}>
                Get a {p.name} quote →
              </a>
            </div>
          ))}
        </section>

        {/* Q5 — side by side */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>Heymondo vs SafetyWing vs World Nomads — What Differs?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Factor", "Heymondo", "SafetyWing", "World Nomads"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.heymondo}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.safetywing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.worldnomads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off the three providers&apos; own sites on {CHECKED}. Plans change and so do limits — confirm
            on the provider&apos;s site before you buy, and note that World Nomads&apos; figures depend on
            where you live, which is why its column says so rather than guessing.
          </p>
        </section>

        {/* Q6 — by trip type */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>By trip type</span>
          <h2 className={styles.sectionTitle}>Which Should You Pick for Your Trip?</h2>
          <div className={styles.stepsList}>
            {useCases.map((uc, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{uc.title}</p>
                  <p className={styles.stepDesc}>{uc.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            For a ski trip the detail that matters is off-piste and rescue cover, which our{" "}
            <Link href="/guides/money/japan-ski-travel-insurance" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan ski travel insurance guide
            </Link>{" "}
            goes through line by line. And if you are still sizing the whole trip, the premium sits alongside
            every other cost in our{" "}
            <Link href="/guides/money/japan-travel-budget" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan travel budget
            </Link>.
          </p>
        </section>

        {/* Q7 — why Japan specifically */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Japan context</span>
          <h2 className={styles.sectionTitle}>Why Does Cover Matter Specifically in Japan?</h2>
          <p className={styles.bodyText}>
            Japan is extremely safe, so the risk is financial rather than physical. As a short-term visitor you
            are outside the national health insurance system and pay the uninsured rate in full — which is how
            a cycling accident reaches about ¥7.5 million and a cardiac event about ¥10 million in JNTO&apos;s
            own worked examples, read on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Three Japan-specific factors are worth weighing. The language barrier, which is why 24/7 English
            support or in-app medical chat earns its premium, and why JNTO&apos;s free Japan Visitor Hotline on
            050-3816-2787 is worth saving to your phone. The seasons — typhoon season from June to October
            brings flight and train disruption, and winter brings world-class but injury-prone skiing. And the
            payment culture: hospitals generally take payment on the day, so what matters is how much your card
            can carry, which our{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              best travel card for Japan
            </Link>{" "}
            guide covers alongside the ATM limits in{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              cash vs card in Japan
            </Link>.
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
            <Link href="/guides/money/japan-ski-travel-insurance" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ski Travel Insurance for Japan (2026): Off-Piste Cover</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6a10 10 0 0 1 8-4z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Fees and ATM Limits</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/safetywing-vs-heymondo-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M5 8h14M5 16h14" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>SafetyWing vs Heymondo for Japan (2026): Which to Pick</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v2m0 8v2m-4-6h2a2 2 0 1 0 0-4H9a2 2 0 1 0 0 4h2a2 2 0 1 0 0 4H9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget 2026: Trip to Tokyo Cost, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan 2026: Where You Still Need Yen</p>
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

        {/* CTA Banner — the three quotes, in one place, at the end. */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Quote all three for your dates</h2>
            <p className={styles.ctaBannerDesc}>
              Japan&apos;s own published worst cases run to about ¥10 million, and two of these three providers
              price only on a quote. Running all three takes a few minutes and is the only way to compare the
              premium against the cover.
            </p>
            <div className={styles.pickCtaRow}>
              {providers.map((p) => (
                <a key={p.name} href={p.url} target="_blank" rel={p.rel} className={styles.ctaBannerBtn}>
                  {p.name} quote →
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
