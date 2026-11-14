import Head from "next/head";
import Link from "next/link";
import EsimPageAnswer from "../../../components/EsimPageAnswer";
import styles from "../../../styles/BestEsimJapan.module.css";
import tools from "../../../styles/Tools.module.css";
import EsimAnswerTable from "../../../components/EsimAnswerTable";
import EsimRelatedCard from "../../../components/EsimRelatedCard";
import SimbyeOffer from "../../../components/SimbyeOffer";
import {
  cheapestAtLeastGb,
  cheapestPlan,
  cheapestUnlimited,
  formatDate,
  formatUsd,
  getProvider,
  plansFor,
  priceAtLeastLabel,
  unlimitedFromLabel,
  type EsimPlan,
  type EsimProviderId,
} from "../../../lib/esim-prices";
import { esimLink, SIMBYE_SPECS_CHECKED_AT } from "../../../lib/esim-specs";
import { simbyeLink, SIMBYE_DISCOUNT_CODE, SIMBYE_DISCOUNT_PERCENT } from "../../../lib/simbye";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { esimProductJsonLd } from "../../../lib/esim-picks";
import { EsimCtaTop } from "../../../components/EsimCta";

/**
 * Review written from published facts only, 5 Nov 2026. Nothing here is first-hand:
 * partner terms allow only what simbye.com and the price feed state, and this site has
 * no trip or speed test of its own to report.
 *
 * Prices, carriers, tethering, top-up and the unlimited throttle are read from
 * data/esim-prices.json, which scripts/fetch-esim-prices.mjs refreshes daily from
 * Simbye's feed. Validity start, install steps and the "no SMS" wording come from
 * simbye.com/products/esim-japan, the refund terms from /policies/refund-policy and the
 * phone numbers from /pages/mobile-number, all read on SIMBYE_SPECS_CHECKED_AT. The
 * virtual-number prices are in euros and outside the feed, so they are linked, not quoted.
 */
const provider = getProvider("simbye");
const pricesCheckedAt = formatDate(provider.fetchedAt);
const NETWORK = provider.network;
const plans = plansFor("simbye");
const ENTRY = cheapestPlan("simbye");
const TEN_GB = cheapestAtLeastGb("simbye", 10);
const UNLIMITED_WEEK = cheapestUnlimited("simbye", 7);
const FAIR_USE = UNLIMITED_WEEK?.note ?? "2 GB/day at full speed, then unlimited at 1 Mbps";
const NUMBERS_URL = simbyeLink("/pages/mobile-number");

const priceLabel = (p: EsimPlan | null) => (p ? formatUsd(p.priceUsd) : "—");
const yesNo = (v?: boolean) => (v ? "Yes" : "No");

/** The cheapest plan a provider sells that covers a seven-day trip with 5 GB or more. */
const weekPlan = (id: EsimProviderId): EsimPlan | null =>
  plansFor(id).find((p) => p.days >= 7 && (p.unlimited || (p.gb ?? 0) >= 5)) ?? null;

// Title and H1 are one string, so the result has no second wording to pick from.
const TITLE = "Simbye Japan eSIM Review (2026): Prices, Network & Setup";
const DESCRIPTION =
  `Simbye Japan eSIM review: from ${priceLabel(ENTRY)} (${ENTRY?.name}), 10 GB ${priceLabel(TEN_GB)}, on docomo, au, SoftBank and Rakuten. ` +
  `Install by QR before you fly. Data only, ${SIMBYE_DISCOUNT_PERCENT}% code.`;

const pros = [
  "Lowest list price compared here on fixed Japan plans",
  "Tethering allowed on every Japan plan in its feed",
  "A 50 GB plan valid for 180 days",
  "Fixed plans can be topped up without changing the eSIM",
];

const cons = [
  "Data only: no Japanese number, no calls, no SMS",
  "Unlimited means 2 GB a day at full speed, then 1 Mbps",
  "No top-up on unlimited plans",
  "Shortest plan is 7 days: there are no 1-day or 3-day plans",
];

const installSteps = [
  {
    title: "Check the phone first",
    desc: "Simbye's Japan page says only phones with a built-in eSIM chip work, and the phone must not be locked to one operator. It lists iPhone XS/XR and newer, Samsung Galaxy S20 and newer, and Google Pixel 3 and newer; other Android models vary, so check yours.",
  },
  {
    title: "Buy, then wait for the email",
    desc: "After checkout you get an email with an installation link or QR code.",
  },
  {
    title: "Install over Wi-Fi before you fly",
    desc: "Add the eSIM under Settings → Cellular → Add eSIM on an iPhone, or Settings → Connections → SIM Manager on a Samsung. Simbye says there is no access point to type in by hand.",
  },
  {
    title: "Switch on after landing",
    desc: "Turn on the new line, select it as your data line, and enable data roaming for it. Simbye says the plan only starts counting when the eSIM first connects at your destination.",
  },
];

const suitsRows = [
  {
    title: "Good fit",
    items: [
      "Trips of a week or more where data is all you need",
      "Anyone sharing a connection with a laptop or a partner's phone",
      "Long stays on a large allowance, with the 50 GB plan's 180-day validity",
      "Travellers who want the lowest list price and are happy to use messaging apps for calls",
    ],
  },
  {
    title: "Poor fit",
    items: [
      "Anyone who needs a Japanese phone number: look at Sakura Mobile instead",
      "A 1 to 3-day stay: its shortest plan is 7 days, though it is priced low",
      "Heavy users who need more than 2 GB a day at full speed on an unlimited plan",
      "Phones without eSIM, or locked to one operator",
    ],
  },
];

const faqItems = [
  {
    q: "How much is Simbye's Japan eSIM?",
    a: `From ${priceLabel(ENTRY)} for ${ENTRY?.name}. A 10 GB plan is ${priceAtLeastLabel("simbye", 10)}, and unlimited starts at ${unlimitedFromLabel("simbye", 7)}. Those are list prices from Simbye's feed, checked ${pricesCheckedAt}; the code ${SIMBYE_DISCOUNT_CODE} takes ${SIMBYE_DISCOUNT_PERCENT}% off eSIM plans.`,
  },
  {
    q: "Which network does Simbye use in Japan?",
    a: `Simbye's price feed lists ${NETWORK}, and its Japan page says "You never pick a network by hand." The same page says the 50 GB plan runs on NTT Docomo only, so check the plan you are buying if the carrier matters to you. Read ${SIMBYE_SPECS_CHECKED_AT}.`,
  },
  {
    q: "Can you tether on a Simbye Japan eSIM?",
    a: `Yes. Tethering is marked true on every Japan plan in its feed, and its Japan page says hotspot use is "Allowed — for a laptop, tablet or a travel companion". Read ${SIMBYE_SPECS_CHECKED_AT}.`,
  },
  {
    q: "How do I install a Simbye Japan eSIM, and when does the plan start?",
    a: `After checkout Simbye emails an installation link or QR code; install it over Wi-Fi before you fly. "Your plan only starts counting when the eSIM first connects at your destination," according to its Japan page, so installing at home does not use up days. Read ${SIMBYE_SPECS_CHECKED_AT}.`,
  },
  {
    q: "Is Simbye's unlimited plan really unlimited in Japan?",
    a: `Not at full speed. The feed states "${FAIR_USE}". You stay connected past the threshold, and Simbye's own FAQ says high-resolution streaming will not work well at that speed.`,
  },
  {
    q: "Does Simbye give you a Japanese phone number?",
    a: `No. The Japan eSIM is data only: its page says "Calls and texts: Not included" and that SMS verification codes will not reach it. Simbye does sell separate virtual numbers, but they are US, UK, Dutch and Australian numbers, not Japanese ones. If you need a Japanese number, Sakura Mobile's Voice + Data eSIM is the route among the providers compared here.`,
  },
  {
    q: "What are Simbye's virtual phone numbers for?",
    a: `Receiving SMS and verification codes on a US (+1), UK (+44), Dutch (+31) or Australian (+61) number. Simbye says they are "made for receiving: outgoing calls and SMS are not possible", and that compatibility may vary by service. Incoming calls are a paid add-on on the UK, Dutch and Australian numbers. The discount code does not apply to them.`,
  },
  {
    q: "Can you get a refund from Simbye?",
    a: `Its refund policy gives a full refund if the eSIM was never installed or activated and no data was used, requested within 30 days of purchase. Refunds are generally not possible once data has been used, except for a verified network failure. Top-ups are non-refundable once applied. Read ${SIMBYE_SPECS_CHECKED_AT}.`,
  },
  {
    q: "Is Simbye cheaper than Airalo and eSIM Go in Japan?",
    a: `On list price, yes at the tiers compared here: 10 GB is ${priceAtLeastLabel("simbye", 10)} on Simbye, ${priceAtLeastLabel("esimgo", 10)} on eSIM Go and ${priceAtLeastLabel("airalo", 10)} on Airalo, checked ${pricesCheckedAt}. Airalo's plans come with live chat and shorter validity options, and eSIM Go sells larger allowances.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/esim/simbye-japan-review") } });

export default function SimbyeJapanReviewPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/esim/simbye-japan-review" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/esim/simbye-japan-review" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: esimProductJsonLd("simbye", "/guides/esim/simbye-japan-review", "Simbye Japan eSIM", "Data-only Japan eSIM on NTT docomo, KDDI/au, SoftBank and Rakuten Mobile."),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/esim/simbye-japan-review",
              headline: "Simbye Japan Review (2026): Prices, Networks and Discount Code",
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
              mainEntity: faqItems.slice(0, 5).map((item) => ({
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com/" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "eSIM & SIM Cards", item: "https://www.japan-travel-kit.com/guides/esim" },
                { "@type": "ListItem", position: 4, name: "Simbye Review", item: "https://www.japan-travel-kit.com/guides/esim/simbye-japan-review" },
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
          <Link href="/guides/esim" className={styles.breadLink}>eSIM</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Simbye Japan Review</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Prices checked {pricesCheckedAt}</p>
          <h1 className={styles.heroTitle}>
            {TITLE}
          </h1>
          <p className={styles.heroSubtitle}>
            The lowest list prices in this comparison for a Japan eSIM, what they buy, and what they do not.
          </p>
          <div className={styles.heroBadges}>
            {[`From ${priceLabel(ENTRY)}`, "Prices checked daily", "Tethering allowed"].map((t) => (
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
            <strong>Affiliate disclosure:</strong> Simbye is an affiliate partner of this site. We earn a
            commission if you buy through the Simbye links on this page, at no extra cost to you. This
            review is written from Simbye&apos;s published plans and terms, not from a trip or a speed test
            of our own.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <EsimPageAnswer route="/guides/esim/simbye-japan-review" />

        {/* Quick Verdict — the whole answer, first */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Verdict</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>
                Buy it if you only need data and price decides this for you; buy Sakura Mobile instead
                if you need a Japanese phone number.
              </strong>{" "}
              Simbye has the lowest list prices compared here on fixed Japan plans: {priceLabel(ENTRY)} for{" "}
              {ENTRY?.name} and {priceLabel(TEN_GB)} for {TEN_GB?.name}, with tethering allowed. Its feed
              lists {NETWORK}. Unlimited starts at {unlimitedFromLabel("simbye", 7)} but is capped at 2 GB
              a day of full speed. It is data only, with no Japanese number, calls or SMS. Prices checked{" "}
              {pricesCheckedAt}; terms read on simbye.com on {SIMBYE_SPECS_CHECKED_AT}.
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Price from</p>
                <p className={styles.verdictStatValue}>{priceLabel(ENTRY)} — {ENTRY?.name}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tethering</p>
                <p className={styles.verdictStatValue}>Allowed</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Japanese number</p>
                <p className={styles.verdictStatValue}>No — data only</p>
              </div>
            </div>
            <a href={esimLink("simbye")} className={styles.verdictBtn} target="_blank" rel="sponsored noopener">
              Get Simbye Japan — from {priceLabel(ENTRY)} →
            </a>
          </div>
        </div>

        <EsimCtaTop />

        {/* Plans table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>What Does Simbye Cost for Japan?</h2>
          <p className={styles.bodyText}>
            Every single-country Japan plan in Simbye&apos;s feed. &ldquo;With code&rdquo; is the feed&apos;s
            own discounted price, not our arithmetic.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "List price", "With code", "Price / GB", "Tethering", "Top-up", ""].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id}>
                      <td className={styles.tdProvider}>
                        {plan.name}
                        {plan.note && <span className={tools.tdNote}>{plan.note}</span>}
                      </td>
                      <td className={styles.tdPrice}>{formatUsd(plan.priceUsd)}</td>
                      <td className={styles.tdPrice}>{plan.discountedUsd ? formatUsd(plan.discountedUsd) : "—"}</td>
                      <td className={plan.perGb === null ? tools.tdMuted : undefined} style={{ whiteSpace: "nowrap" }}>
                        {plan.perGb === null ? "—" : `${formatUsd(plan.perGb)}/GB`}
                      </td>
                      <td>{yesNo(plan.tethering)}</td>
                      <td>{yesNo(plan.topUp)}</td>
                      <td>
                        <a href={plan.link ?? esimLink("simbye")} className={styles.tdLink} target="_blank" rel="sponsored noopener">
                          Buy →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            USD prices from Simbye&apos;s own feed, checked {pricesCheckedAt}. The &ldquo;Buy&rdquo; links open
            Simbye&apos;s Japan page, where you choose the plan.
          </p>
        </section>

        {/* Discount */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Discount</span>
          <h2 className={styles.sectionTitle}>Is There a Simbye Discount Code?</h2>
          <p className={styles.bodyText}>
            Yes, for readers of this site. It covers every eSIM plan; Simbye&apos;s phone numbers are not
            included. As an affiliate we earn a commission on purchases that use it.
          </p>
          <SimbyeOffer />
        </section>

        {/* Networks and terms */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Which Networks, and How Long Does a Plan Last?</h2>
          <p className={styles.bodyText}>
            <strong>Networks.</strong> The feed lists {NETWORK} for Japan, and marks the plans as
            5G-capable. Simbye&apos;s Japan page says &ldquo;You never pick a network by hand&rdquo; and
            that 5G applies where your phone supports it. The same page says the 50 GB plan runs on NTT
            Docomo only, so if the carrier matters, check that plan before you buy.
          </p>
          <p className={styles.bodyText}>
            <strong>Tethering.</strong> Marked true on every Japan plan in the feed. The Japan page says
            hotspot use is &ldquo;Allowed — for a laptop, tablet or a travel companion&rdquo;.
          </p>
          <p className={styles.bodyText}>
            <strong>Validity.</strong> Plans run from 7 to 180 days, and &ldquo;your plan only starts
            counting when the eSIM first connects at your destination.&rdquo; That makes installing at home
            safe.
          </p>
          <p className={styles.bodyText}>
            <strong>Unlimited.</strong> The feed states &ldquo;{FAIR_USE}&rdquo;. Simbye&apos;s FAQ adds that
            you stay connected past the threshold but high-resolution streaming will not work well. Unlimited
            plans cannot be topped up.
          </p>
        </section>

        {/* Setup */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Setup</span>
          <h2 className={styles.sectionTitle}>How Do You Set Up a Simbye eSIM?</h2>
          <div className={styles.stepsList}>
            {installSteps.map((step, i) => (
              <div key={step.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.2rem" }}>
            Steps as Simbye&apos;s Japan page gives them. More detail per phone:{" "}
            <Link href="/guides/esim/how-to-set-up-esim-japan" className={tools.inlineLink}>
              how to set up an eSIM for Japan
            </Link>{" "}
            and{" "}
            <Link href="/guides/esim/does-esim-work-in-japan" className={tools.inlineLink}>
              the compatibility checks
            </Link>
            .
          </p>
        </section>

        {/* Pros & Cons */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Assessment</span>
          <h2 className={styles.sectionTitle}>What Are the Trade-offs?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Pros</p>
              <ul className={styles.pickList}>
                {pros.map((p) => (
                  <li key={p}><span className={styles.proIcon}>+</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Cons</p>
              <ul className={styles.pickList}>
                {cons.map((c) => (
                  <li key={c}><span className={styles.conIcon}>−</span>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fit</span>
          <h2 className={styles.sectionTitle}>Who Should Buy Simbye, and Who Shouldn&apos;t?</h2>
          <div className={styles.pickGrid}>
            {suitsRows.map((col, i) => (
              <div key={col.title} className={i === 0 ? styles.pickPros : styles.pickCons}>
                <p className={styles.pickListLabel}>{col.title}</p>
                <ul className={styles.pickList}>
                  {col.items.map((item) => (
                    <li key={item}>
                      <span className={i === 0 ? styles.proIcon : styles.conIcon}>{i === 0 ? "+" : "−"}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Phone numbers */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Phone numbers</span>
          <h2 className={styles.sectionTitle}>Does Simbye Sell a Phone Number for Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Not a Japanese one.</strong> The Japan eSIM itself is data only: its page says
            &ldquo;Calls and texts: Not included&rdquo; and that SMS verification codes will not reach it.
          </p>
          <p className={styles.bodyText}>
            Separately, Simbye sells virtual numbers from the <strong>USA, UK, Netherlands and
            Australia</strong>, for receiving SMS and verification codes. They need no SIM or eSIM: codes
            appear in the Simbye app or on its site. Simbye says they are &ldquo;made for receiving: outgoing
            calls and SMS are not possible&rdquo;, and that compatibility may vary by service. They will not
            give you a Japanese number, so they do not help with a form that asks for one. The discount code
            does not apply to them.{" "}
            <a href={NUMBERS_URL} className={tools.inlineLink} target="_blank" rel="sponsored noopener">
              See Simbye&apos;s virtual numbers →
            </a>
          </p>
          <p className={styles.bodyText}>
            If you do need a Japanese number, see{" "}
            <Link href="/guides/esim/japan-phone-number-for-foreigners" className={tools.inlineLink}>
              how a foreigner gets a Japanese phone number
            </Link>{" "}
            and our{" "}
            <Link href="/guides/esim/sakura-mobile-review" className={tools.inlineLink}>
              Sakura Mobile review
            </Link>
            . Numbers read on {SIMBYE_SPECS_CHECKED_AT}.
          </p>
        </section>

        {/* The table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Side by side</span>
          <h2 className={styles.sectionTitle}>How Does Simbye Compare with the Other Four?</h2>
          <p className={styles.bodyText}>
            One week in Japan, 5 GB or more: the cheapest plan each provider sells that covers it, with the
            two clauses the price alone does not tell you.
          </p>
          <EsimAnswerTable
            pick={weekPlan}
            note="The cheapest plan each provider sells with at least 7 days' validity and 5 GB or more; Holafly sells unlimited only."
          />
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <Link href="/guides/esim/best-esim-japan" className={tools.inlineLink}>Full comparison, with a pick per trip →</Link>{" "}
            <Link href="/guides/esim/cheapest-esim-japan" className={tools.inlineLink}>Cheapest eSIMs for Japan →</Link>{" "}
            <Link href="/guides/esim/japan-esim-data-plans" className={tools.inlineLink}>Every plan by price per GB →</Link>
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
            <EsimRelatedCard href="/guides/esim/best-esim-japan">
              Best eSIM for Japan 2026: Compared by Price &amp; Network
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/cheapest-esim-japan">
              Cheapest eSIM for Japan 2026: Best Budget Picks
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/esim-go-japan-review">
              eSIM Go Japan Review 2026: Prices, Networks and Tethering
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/airalo-japan-review">
              Airalo Japan Review 2026: Is It Worth It?
            </EsimRelatedCard>
            <EsimRelatedCard href="/guides/esim/japan-esim-unlimited">
              Best Unlimited eSIM for Japan (2026): Top Picks for Heavy Users
            </EsimRelatedCard>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Compare all Japan eSIM options</h2>
            <p className={styles.ctaBannerDesc}>
              See how Simbye stacks up against Airalo, eSIM Go, Holafly and Sakura Mobile on price, data
              and network.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              View Full eSIM Comparison →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
