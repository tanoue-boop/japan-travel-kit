import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, productOfferJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";

// SafetyWing is the only approved insurance affiliate. Heymondo and World Nomads stay plain.
const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";
const HEYMONDO_URL = "https://heymondo.com/";
const WORLDNOMADS_URL = "https://www.worldnomads.com/";

const SPONSORED_REL = "sponsored noopener noreferrer";
const PLAIN_REL = "noopener noreferrer nofollow";

/**
 * Rebuilt 6 Nov 2026 (task jtk-20261106-A24) around the queries in Search Console: "japan
 * travel insurance", "travel insurance japan", "best travel insurance for japan" and "how much
 * is travel insurance to japan" drew over 2,500 impressions in three months at positions 60–80.
 * The page now answers who should buy what, what it costs, when you need it in Japan, and ski
 * cover, in that order.
 *
 * Read on 6 Nov 2026:
 *   safetywing.com/nomad-insurance      US$62.72 per 4 weeks at ages 10–39; US$177.50 a month
 *                                       at 18–39; limits; age bands in the calculator.
 *   safetywing.com/nomad-insurance/faq  no deductible; fixed dates 5–364 days; subscription
 *                                       auto-extends every 28 days to 364; add-ons on
 *                                       subscriptions only; Complete is a 12-month commitment;
 *                                       Essential sold to age 69; children free; exclusions.
 *   heymondo.com/travel-insurance-international/  limits, no published price.
 *   jnto.go.jp/emergency/eng/mi_guide.html        the two cost cases, entry warning, hotline.
 *   mhlw.go.jp/stf/newpage_46516.html             the recommendation and the screening warning.
 *
 * Prices for ages 40–69 and for trips under 4 weeks appear only in SafetyWing's calculator,
 * which could not be read, so the table says so instead of estimating them. Add them once they
 * have been read off a real quote.
 */
const CHECKED = checkedLabel("2026-11-06");

type Row = { who: string; pick: string; why: string; button: boolean };

/** The button is left off the rows whose need SafetyWing does not meet. */
const answerRows: Row[] = [
  {
    who: "First trip, 1 to 3 weeks",
    pick: "SafetyWing Essential, fixed dates",
    why: "US$250,000 limit and no deductible. Fixed-date plans start at 5 days.",
    button: true,
  },
  {
    who: "More than 4 weeks, or no return date",
    pick: "SafetyWing Essential, subscription",
    why: "Extends every 28 days, up to 364 days. You can start it after you have left home.",
    button: true,
  },
  {
    who: "Family with young children",
    pick: "SafetyWing Essential",
    why: "Children aged 14 days to 9 years are added free, up to two per adult.",
    button: true,
  },
  {
    who: "Skiing or snowboarding on marked runs",
    pick: "SafetyWing Essential",
    why: "Both are covered on piste if you wear a helmet. Search and rescue is not covered.",
    button: true,
  },
  {
    who: "Backcountry or off-piste",
    pick: "World Nomads Explorer",
    why: "SafetyWing excludes off-piste on every plan. See our ski insurance guide.",
    button: false,
  },
  {
    who: "You want trip cancellation cover",
    pick: "Heymondo",
    why: "Lists up to US$7,000. SafetyWing Essential does not list cancellation cover.",
    button: false,
  },
  {
    who: "Aged 70 or over",
    pick: "Get a quote and check the age limit",
    why: "SafetyWing Essential is sold up to age 69, so it is not an option here.",
    button: false,
  },
  {
    who: "You have a pre-existing condition",
    pick: "Ask each insurer in writing",
    why: "SafetyWing Essential does not cover pre-existing conditions.",
    button: false,
  },
];

const priceRows = [
  { plan: "SafetyWing Essential, subscription", age: "10–39", period: "4 weeks", price: "US$62.72" },
  { plan: "SafetyWing Essential", age: "Under 10", period: "4 weeks", price: "Free with an adult, up to two per adult" },
  { plan: "SafetyWing Essential", age: "40–49", period: "4 weeks", price: "Official calculator only. Not confirmed here" },
  { plan: "SafetyWing Essential", age: "50–59", period: "4 weeks", price: "Official calculator only. Not confirmed here" },
  { plan: "SafetyWing Essential", age: "60–69", period: "4 weeks", price: "Official calculator only. Not confirmed here" },
  { plan: "SafetyWing Essential, fixed dates", age: "Any", period: "5 to 27 days", price: "Official calculator only. Not confirmed here" },
  { plan: "SafetyWing Complete", age: "18–39", period: "Month, 12-month commitment", price: "US$177.50" },
  { plan: "Adventure sports add-on", age: "Any", period: "4 weeks, subscriptions only", price: "+US$10" },
  { plan: "Heymondo", age: "Any", period: "Any", price: "No published price. Quote only" },
  { plan: "World Nomads", age: "Any", period: "Any", price: "No published price. Quote only" },
];

const japanRows = [
  {
    what: "Bicycle collision with a collapsed lung and broken ribs",
    figure: "¥7.5 million: surgery, 19 days in hospital, doctor escort and a business-class flight home",
    source: "JNTO",
  },
  {
    what: "Heart attack",
    figure: "¥10 million: surgery, 45 days in hospital, doctor escort and a business-class flight home",
    source: "JNTO",
  },
  {
    what: "Unpaid hospital bills",
    figure: "JNTO warns that visitors who do not pay may be denied entry in future. The health ministry warns of stricter immigration screening",
    source: "JNTO, MHLW",
  },
  {
    what: "Japan's advice",
    figure: "The health ministry strongly recommends private health insurance with adequate cover",
    source: "MHLW",
  },
  {
    what: "If you are already in Japan",
    figure: "JNTO says private medical insurance you can buy after entering Japan provides sufficient cover during your stay",
    source: "JNTO",
  },
  {
    what: "Finding a hospital",
    figure: "Japan Visitor Hotline, 050-3816-2787, 24 hours a day, 365 days a year",
    source: "JNTO",
  },
];

const compareRows = [
  { factor: "Medical limit", safetywing: "US$250,000 (Essential)", heymondo: "Up to US$10,000,000", worldnomads: "Shown after you enter your residence" },
  { factor: "Published price", safetywing: "US$62.72 per 4 weeks, ages 10–39", heymondo: "None", worldnomads: "None" },
  { factor: "Deductible", safetywing: "None on either plan", heymondo: "“Our Heymondo insurances don't have a deductible”", worldnomads: "Varies by plan" },
  { factor: "Evacuation", safetywing: "US$100,000 lifetime", heymondo: "Medical transport included", worldnomads: "By plan" },
  { factor: "Search and rescue", safetywing: "Not on Essential", heymondo: "Up to US$10,000 if lost during the trip", worldnomads: "By plan" },
  { factor: "Trip cancellation", safetywing: "Not listed on Essential", heymondo: "Up to US$7,000, buy within 7 days of your first trip booking", worldnomads: "By plan" },
  { factor: "Lost luggage", safetywing: "US$500 per item, US$3,000 per plan", heymondo: "Up to US$2,500", worldnomads: "By plan" },
  { factor: "Skiing", safetywing: "On piste with a helmet", heymondo: "Skiing not named on the plan page", worldnomads: "On every plan; backcountry on Explorer" },
];

const faqItems = [
  {
    q: "Do you need travel insurance for Japan?",
    a: `Japan's health ministry strongly recommends it for visitors, and the Japan National Tourism Organization (JNTO) lists treatment cases of ¥7.5 million and ¥10 million, flights home included. JNTO also warns that visitors who do not pay their medical bills may be denied entry in future. Read on ${CHECKED}.`,
  },
  {
    q: "How much is travel insurance to Japan?",
    a: `SafetyWing Essential is US$62.72 per 4 weeks for ages 10–39, and SafetyWing says prices increase with age. Prices for older ages and shorter fixed dates appear in its calculator, so they are not quoted here. Heymondo and World Nomads publish no price. Read on ${CHECKED}.`,
  },
  {
    q: "What is the best travel insurance for Japan?",
    a: "For most visitors, a medical policy with a high limit and no deductible, which is why SafetyWing Essential is our pick for ordinary trips. Choose Heymondo if you want cancellation cover, and World Nomads Explorer if you ride the backcountry.",
  },
  {
    q: "What is the best travel health insurance for Japan?",
    a: `Check the medical limit and evacuation line first. SafetyWing Essential lists US$250,000 for treatment and hospital stays and US$100,000 lifetime for evacuation. Heymondo lists medical expenses up to US$10,000,000. Both clear the ¥10 million case JNTO publishes. Read on ${CHECKED}.`,
  },
  {
    q: "Does travel insurance cover skiing in Japan?",
    a: "It depends on the plan and the terrain. SafetyWing covers skiing and snowboarding on piste with a helmet and excludes off-piste. Our Japan ski insurance guide compares the wording of each insurer.",
  },
  {
    q: "Can you buy travel insurance after arriving in Japan?",
    a: `Yes. JNTO says insurance you can buy after entering Japan provides sufficient cover during your stay, and SafetyWing lets you sign up during your travels. Anything you already have when you buy will not be covered. Read on ${CHECKED}.`,
  },
  {
    q: "Is credit card travel insurance enough for Japan?",
    a: "Check your own card's limit and evacuation cover against the ¥10 million case JNTO publishes, and whether the trip must be paid on that card. Card benefits vary, so there is no single answer.",
  },
  {
    q: "Does SafetyWing cover Japan if I live there?",
    a: `No. SafetyWing's FAQ says your destination cannot be your home country, where you principally live. It is for visitors. Read on ${CHECKED}.`,
  },
];

const TITLE = "Best Travel Insurance for Japan 2026: Who Needs What, Cost";
const DESCRIPTION =
  "Japan travel insurance in 2026: which policy suits your trip, what it costs from US$62.72 per 4 weeks, when you need it, and what ski cover includes.";
const ROUTE = "/guides/money/best-travel-insurance-japan";
const PAGE_URL = `https://www.japan-travel-kit.com${ROUTE}`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SafetyWingButton({ label, className }: { label: string; className: string }) {
  return (
    <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={className} data-placement="insurance-answer">
      {label}
    </a>
  );
}

export default function BestTravelInsuranceJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={PAGE_URL} />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
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
                { "@type": "ListItem", position: 4, name: "Best Travel Insurance for Japan", item: PAGE_URL },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: productOfferJsonLd({
              route: ROUTE,
              name: "SafetyWing Nomad Insurance Essential",
              description: "Travel medical insurance with a US$250,000 overall limit, billed every 4 weeks; the published price is for ages 10–39.",
              brand: "SafetyWing",
              currency: "USD",
              lowPrice: 62.72,
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
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Best Travel Insurance for Japan (2026):<br />Who Should Buy What, and What It Costs
          </h1>
          <p className={styles.heroSubtitle}>
            Which Japan travel insurance suits your trip, the prices insurers publish, when you would need
            it, and how ski cover works.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Published prices only", "JNTO and MHLW figures"].map((t) => (
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
            <strong>Not insurance advice.</strong> This is general information. Cover and prices vary by age,
            trip length, residence and plan, so read the policy wording before you buy. SafetyWing links are
            affiliate links; we may earn a commission at no extra cost to you. Heymondo and World Nomads links
            are not. <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer first, with the button. */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              For most visitors, the best travel insurance for Japan is <strong>SafetyWing Essential</strong>:
              a US$250,000 limit, no deductible, and <strong>US$62.72 per 4 weeks</strong> at ages 10–39. Choose
              Heymondo if you need trip cancellation cover, and World Nomads Explorer if you ride the
              backcountry. Read on {CHECKED}.
            </p>
            <SafetyWingButton label="Check SafetyWing for your dates →" className={styles.verdictBtn} />
          </div>
        </div>

        {/* 1. Conclusion, by traveller. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The answer</span>
          <h2 className={styles.sectionTitle}>Japan Travel Insurance: Who Should Buy What</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Our pick", "Why", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {answerRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.88rem" }}>
                        {row.button && <SafetyWingButton label="Check SafetyWing →" className={styles.pickCta} />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read on the insurers&apos; own pages on {CHECKED}. SafetyWing has no button on four rows because
            it does not meet that need. Quotes:{" "}
            <a href={HEYMONDO_URL} target="_blank" rel={PLAIN_REL}>Heymondo</a> and{" "}
            <a href={WORLDNOMADS_URL} target="_blank" rel={PLAIN_REL}>World Nomads</a>.
          </p>
        </section>

        {/* 2. Prices. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How Much Is Travel Insurance to Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            SafetyWing Essential costs US$62.72 per 4 weeks at ages 10–39, and SafetyWing says prices increase
            with age. These are the published prices for each age and length confirmed on its site.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Age", "Period", "Price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={`${row.plan}-${row.age}-${row.period}`}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.age}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.period}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Conditions: SafetyWing&apos;s published prices, in US dollars, read on {CHECKED}. They exclude add-ons
            and US cover, and are not a personal quote. Its calculator figures are not listed here, so rows marked
            &ldquo;Official calculator only&rdquo; have no figure. They are not estimated here.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Get your price from SafetyWing →" className={styles.verdictBtn} />
          </div>
        </section>

        {/* 3. When you need it, public sources only. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>In Japan</span>
          <h2 className={styles.sectionTitle}>When Would You Need Insurance in Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            If you are hurt or fall ill. These examples and warnings come from Japan&apos;s tourism organization
            and health ministry.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Situation", "What the official source says", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {japanRows.map((row) => (
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
            JNTO: guide for travellers who fall ill in Japan. MHLW: Ministry of Health, Labour and Welfare, page
            for international visitors. Both read on {CHECKED}. If you may need to pay a hospital yourself and
            claim later, see our <Link href="/guides/money/best-travel-card-japan">best travel card for Japan</Link>{" "}
            guide, and keep every receipt.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Check SafetyWing medical cover →" className={styles.verdictBtn} />
          </div>
        </section>

        {/* 4. Ski and snowboard. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Winter</span>
          <h2 className={styles.sectionTitle}>Does Travel Insurance Cover Skiing and Snowboarding in Japan?</h2>
          <p className={styles.bodyText}>
            On marked runs, usually yes. SafetyWing covers skiing and snowboarding on piste if you wear a
            helmet. It excludes off-piste on every plan, and Essential does not cover search and rescue. Our{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">best travel insurance for skiing in Japan</Link>{" "}
            guide compares the wording of each insurer.
          </p>
          <p className={styles.bodyText}>
            Planning the trip itself? See our guides to{" "}
            <Link href="/guides/attractions/niseko-ski-tours">Niseko ski tours</Link>, a{" "}
            <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo">Gala Yuzawa day trip from Tokyo</Link>{" "}
            and a <Link href="/guides/attractions/hokkaido-7-day-itinerary">7-day Hokkaido itinerary</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Check SafetyWing for a ski trip →" className={styles.verdictBtn} />
          </div>
        </section>

        {/* Side by side. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>SafetyWing vs Heymondo vs World Nomads</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "SafetyWing", "Heymondo", "World Nomads"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.factor}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.factor}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.safetywing}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.heymondo}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.worldnomads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            SafetyWing and Heymondo read on {CHECKED}; World Nomads from its own pages on 25 Oct 2026. For those
            two insurers head to head, see{" "}
            <Link href="/guides/money/safetywing-vs-heymondo-japan">SafetyWing vs Heymondo for Japan</Link>.
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
            {[
              { href: "/guides/money/japan-ski-travel-insurance", title: "Best Travel Insurance for Skiing in Japan (2026)" },
              { href: "/guides/money/safetywing-vs-heymondo-japan", title: "SafetyWing vs Heymondo for Japan (2026): Which to Pick" },
              { href: "/guides/money/best-travel-card-japan", title: "Best Travel Card for Japan (2026): Fees and ATM Limits" },
              { href: "/guides/money/japan-travel-budget", title: "Japan Travel Budget 2026: Trip to Tokyo Cost, Day by Day" },
              { href: "/guides/money", title: "All Japan Money & Payment Guides →" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
