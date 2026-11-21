import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import { japanTravelInsuranceTripPrep } from "../../../lib/klook-links";
import { EsimCtaBottom } from "../../../components/EsimCta";

// The same SafetyWing ambassador link the other insurance guides use.
const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";
const SPONSORED_REL = "sponsored nofollow noopener noreferrer";
const PLAIN_REL = "noopener noreferrer nofollow";

/**
 * Restored 13 Nov 2026 (task-jtk-20261113-03). This URL was a 301 to best-travel-insurance-japan
 * from the September 2026 merge, but GSC for 10/14–11/10 still showed 332 impressions at 42.1 for
 * it, against 1,642 at 43.1 for the merge target, on the same queries. The intents are split:
 *   this page                      do you need it, is it mandatory, what care costs, what to cover
 *   best-travel-insurance-japan    which policy to buy (compare, pick)
 *
 * Read on 13 Nov 2026:
 *   mofa.go.jp/j_info/visit/visa/short/novisa.html  visa exemption for 74 countries and regions;
 *                                       no insurance requirement listed.
 *   mofa.go.jp/ca/fna/page22e_000738.html  Long Stay for sightseeing and recreation: documents
 *                                       include proof of private medical travel insurance covering
 *                                       death, injury and illness during the stay.
 *   mofa.go.jp/ca/fna/pagewe_000001_00046.html  Digital Nomad (and spouse/child): insurance with
 *                                       medical cover of JPY 10 million or more.
 *   mhlw.go.jp/stf/newpage_46516.html  "strongly recommend" private health insurance; unpaid fees
 *                                       may mean stricter immigration procedures next time.
 *   jnto.go.jp/emergency/eng/mi_guide.html  without overseas travel insurance "you may be charged
 *                                       the full amount"; cards only at major hospitals, clinics
 *                                       generally cash only; ¥7.5m and ¥10m cases; insurance can be
 *                                       bought after entering Japan; travel insurance does not cover
 *                                       perinatal care; unpaid bills may mean denied entry; hotline.
 *   hokeniryo.metro.tokyo.lg.jp (medical_info_eng/insurance)  enrolled residents pay 30%; foreigners
 *                                       staying more than three months must enrol.
 *   safetywing.com/nomad-insurance      US$62.72 / 4 weeks at 10–39 (Essential); US$250,000 limit;
 *                                       evacuation US$100,000 lifetime; luggage US$500 per item,
 *                                       US$3,000 per plan; trip interruption US$5,000; Essential
 *                                       excludes pre-existing conditions and maternity care;
 *                                       Complete lists trip cancellation US$300 per trip.
 *   safetywing.com/nomad-insurance/faq  buy any time, already abroad or not; pay and claim, direct
 *                                       billing on request; skiing not covered off-piste; cannot
 *                                       guarantee it meets visa requirements.
 * The 14-day fixed-date price (US$31.36 at 10–39) was read off SafetyWing's calculator on 9 Nov 2026.
 *
 * Re-read 21 Nov 2026 (task-jtk-20261121-R02): every line above unchanged, plus
 *   mlit.go.jp/kankocho/en/shisaku/kokusai/traveltojapan.html  Japan Tourism Agency, last update
 *                                       2026/10/27: medical expenses "can be very high", recommends
 *                                       private medical insurance with sufficient coverage; unpaid
 *                                       bills may mean refused entry. The JNTO guide is a JTA page.
 *   mlit.go.jp/kankocho/news08_00002.html  JTA survey, Oct 2023–Feb 2024, 3,069 visitors at five
 *                                       airports: about 4% fell ill or were injured (6 in 10 cold or
 *                                       fever); about 73% had bought private medical insurance.
 *   jnto.go.jp/emergency/eng/mi_guide.html  the after-arrival policy JNTO promotes covers up to
 *                                       ¥10 million in medical costs.
 * The "suggested amount" column of the cover table uses only these published figures: ¥10 million
 * (MOFA Digital Nomad minimum, JNTO case, JNTO's after-arrival policy). No amount is given where no
 * official figure exists. Title/H1 set to "Is It Required & What It Should Cover" for the
 * requirements queries; best-travel-insurance-japan keeps "which policy to buy".
 */
const CHECKED = checkedLabel("2026-11-21");
const CALC_CHECKED = checkedLabel("2026-11-09");
const LAST_CHECKED = "2026-11-21";

const requiredRows = [
  {
    who: "Visa-free tourist (up to 90 days for most)",
    answer: "Not required for entry. Strongly recommended",
    detail: "MOFA's visa-exemption list (74 countries and regions) sets no insurance condition. The health ministry strongly recommends private health insurance.",
    source: "MOFA, MHLW",
  },
  {
    who: "Long Stay for sightseeing and recreation visa",
    answer: "Required",
    detail: "The application needs proof of private medical travel insurance covering death, injury and illness during the stay, for the applicant and an accompanying spouse.",
    source: "MOFA",
  },
  {
    who: "Digital Nomad visa (and spouse or child)",
    answer: "Required, ¥10 million medical minimum",
    detail: "Proof of insurance against death, injury or illness, with medical cover of JPY 10 million or more.",
    source: "MOFA",
  },
  {
    who: "Staying more than three months as a resident",
    answer: "Japanese health insurance instead",
    detail: "Foreigners who stay more than three months must enrol in Japan's health insurance; enrolled patients pay 30% at the counter.",
    source: "Tokyo Metropolitan Government",
  },
  {
    who: "Relying on credit card travel cover",
    answer: "Allowed, but check the limits",
    detail: "No rule stops you. Check the card's medical limit and evacuation cover against JNTO's ¥10 million case, and whether the trip has to be paid on that card.",
    source: "JNTO (case figure)",
  },
];

const costRows = [
  {
    what: "No overseas travel insurance",
    figure: "You may be charged the full amount at the hospital",
    source: "JNTO",
  },
  {
    what: "Bicycle collision: collapsed lung and broken ribs",
    figure: "¥7.5 million: surgery, 19 days in hospital, doctor escort, business-class flight home",
    source: "JNTO",
  },
  {
    what: "Heart attack",
    figure: "¥10 million: surgery, 45 days in hospital, doctor escort, business-class flight home",
    source: "JNTO",
  },
  {
    what: "Residents enrolled in Japan's health insurance",
    figure: "Pay 30% of the cost with a health insurance card; 100% without it",
    source: "Tokyo Metropolitan Government",
  },
  {
    what: "Paying on the day",
    figure: "Credit cards only at major hospitals; clinics generally cash only. With a cash-free insurance service, no payment is needed",
    source: "JNTO",
  },
  {
    what: "Pregnancy and childbirth",
    figure: "Travel insurance does not cover perinatal care, which can be expensive",
    source: "JNTO",
  },
  {
    what: "Leaving a bill unpaid",
    figure: "May be denied entry to Japan in future (JNTO); stricter immigration procedures (MHLW)",
    source: "JNTO, MHLW",
  },
];

// First row is the conclusion. "amount" only uses published official figures; where none exists
// the cell says what to match instead of inventing a number.
const coverRows = [
  {
    item: "Medical treatment and hospital stays (the must-have)",
    amount: "¥10 million or more",
    basis: "MOFA's Digital Nomad visa minimum is ¥10 million; JNTO's heart-attack case came to ¥10 million; the after-arrival policy JNTO promotes covers up to ¥10 million.",
    sw: "US$250,000 limit (Essential)",
  },
  {
    item: "Emergency evacuation and the flight home",
    amount: "Its own line, on top of medical",
    basis: "Both JNTO cases (¥7.5 million and ¥10 million) include a doctor escort and a business-class flight home inside the total.",
    sw: "US$100,000 lifetime",
  },
  {
    item: "Paying the hospital",
    amount: "Cash-free service or direct billing",
    basis: "JNTO: cards only at major hospitals, clinics generally cash only; with cash-free insurance no payment is needed on the day.",
    sw: "Pay and claim; direct billing on request",
  },
  {
    item: "Trip cancellation",
    amount: "What you have prepaid and cannot get back",
    basis: "No official figure. Match the limit to your non-refundable hotels, tours and rail passes.",
    sw: "Not listed on Essential; US$300 per trip on Complete",
  },
  {
    item: "Lost luggage and belongings",
    amount: "Per-item limit above your most valuable item",
    basis: "No official figure. Check the per-item cap against your phone or camera, not just the total.",
    sw: "US$500 per item, US$3,000 per plan",
  },
  {
    item: "Skiing and snowboarding",
    amount: "On-piste plus search and rescue in writing",
    basis: "No official figure. Off-piste and heli-skiing are where many policies stop; SafetyWing excludes off-piste.",
    sw: "Covered on piste; not off-piste",
  },
  {
    item: "Pre-existing conditions and pregnancy",
    amount: "Ask the insurer in writing",
    basis: "JNTO notes travel insurance does not cover perinatal care, which can be expensive.",
    sw: "Not covered (pre-existing conditions, maternity care)",
  },
];

const faqItems = [
  {
    q: "Do you need travel insurance for Japan?",
    a: `Not to enter as a tourist: MOFA's visa exemption for 74 countries and regions sets no insurance condition. You should still buy it. Japan's health ministry and the Japan Tourism Agency strongly recommend private medical insurance, a visitor without it may be charged the full hospital bill, and JNTO lists cases of ¥7.5 million and ¥10 million. Read on ${CHECKED}.`,
  },
  {
    q: "Is travel insurance required for a Japan visa?",
    a: `Only for some visas. MOFA lists proof of medical travel insurance among the documents for the Long Stay for sightseeing and recreation visa, and the Digital Nomad visa needs medical cover of ¥10 million or more. Visa-free short stays have no insurance condition; for any other visa, check the document list of the embassy you apply to. Read on ${CHECKED}.`,
  },
  {
    q: "How much is a hospital visit in Japan without insurance?",
    a: `The full amount. Residents in Japan's health insurance pay 30% at the counter and 100% without their card; a visitor without overseas travel insurance may be charged everything. JNTO's two published cases came to ¥7.5 million (bicycle collision, 19 days in hospital and the flight home) and ¥10 million (heart attack, 45 days). Read on ${CHECKED}.`,
  },
  {
    q: "Does Japan travel insurance cover skiing?",
    a: `Often on piste only. SafetyWing's FAQ covers skiing and snowboarding but not off-piste or against the advice of the local ski school, and heli-skiing is excluded even with its adventure add-on. Check the on-piste, off-piste and search-and-rescue wording before a ski trip. Read on ${CHECKED}.`,
  },
  {
    q: "What is the cheapest travel insurance for Japan?",
    a: `There is no single cheapest policy, because most insurers only quote. Of the plans that publish a price, SafetyWing Essential lists US$62.72 per 4 weeks at ages 10–39 (read on ${CHECKED}), and its calculator gave US$31.36 for 14 fixed days at 10–39 on ${CALC_CHECKED}. Our best travel insurance for Japan guide compares the options by price and medical limit.`,
  },
];

const TITLE = "Japan Travel Insurance 2026: Is It Required? What to Cover";
const H1 = "Japan Travel Insurance 2026: Is It Required & What It Should Cover";
const DESCRIPTION =
  "Do you need travel insurance for Japan? Not for tourist entry, but you may pay the full bill. What travel insurance for Japan should cover: ¥10m+ medical.";
const ROUTE = "/guides/money/japan-travel-insurance";
const PAGE_URL = `https://www.japan-travel-kit.com${ROUTE}`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

function SafetyWingButton({ label, className, placement }: { label: string; className: string; placement: string }) {
  return (
    <a href={SAFETYWING_URL} target="_blank" rel={SPONSORED_REL} className={className} data-placement={placement}>
      {label}
    </a>
  );
}

const noteStyle = { marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" } as const;

export default function JapanTravelInsurancePage({ updated }: { updated: PageUpdated }) {
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
                { "@type": "ListItem", position: 4, name: "Japan Travel Insurance", item: PAGE_URL },
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Japan Travel Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>{H1}</h1>
          <p className={styles.heroSubtitle}>
            Whether Japan requires it, what a hospital bill can reach without it, and the cover to check before
            you buy, from the government&apos;s own pages.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "MOFA, MHLW, JTA and JNTO sources", "Requirements and cover"].map((t) => (
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
            <strong>Not insurance or immigration advice.</strong> This is general information; check the policy
            wording and your own visa conditions. SafetyWing and Klook links are affiliate links; we may earn a
            commission at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer first: the opening paragraph of the body. */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.verdictText}>
              Japan does not require travel insurance for a short tourist visit: MOFA&apos;s visa exemption for 74
              countries and regions sets no insurance condition, and only some longer-stay visas, such as the Digital
              Nomad visa, ask for it. A foreign visitor without travel insurance may be charged the full hospital
              bill, and JNTO lists cases of <strong>¥7.5 million</strong> and <strong>¥10 million</strong> for
              treatment, hospital stay and the flight home. Japan travel insurance should therefore cover at least
              <strong> ¥10 million in medical costs</strong> plus emergency evacuation. Read on {CHECKED}.
            </p>
            <SafetyWingButton label="Check SafetyWing for your dates →" className={styles.verdictBtn} placement="insurance-answer" />
            <p className={styles.bodyText} style={{ marginTop: "0.9rem", marginBottom: 0 }}>
              <strong>Ready to pick a policy?</strong> Compare the{" "}
              <Link href="/guides/money/best-travel-insurance-japan" style={{ color: "var(--red)", fontWeight: 700 }}>
                best travel insurance for Japan →
              </Link>{" "}
              by trip type, price and medical limit.
            </p>
          </div>
        </div>

        <KlookTripPrep
          label="Before you fly"
          heading="Before You Fly: Data and the Airport Train"
          intro="Insurance covers the trip going wrong. These cover arrival day: data on your phone for the assistance line and JNTO's hospital search, and a reserved train from the airport."
          items={japanTravelInsuranceTripPrep}
        />

        {/* 1. Required or not. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Requirements</span>
          <h2 className={styles.sectionTitle}>Do You Need Travel Insurance for Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            As a tourist, no rule makes you buy it, but you should. Two visa types do require it: the Long Stay for
            sightseeing and recreation visa and the Digital Nomad visa, which sets a ¥10 million medical minimum.
            In the Japan Tourism Agency&apos;s airport survey of 3,069 visitors (October 2023 to February 2024), about
            73% had bought private medical insurance and about 4% fell ill or were injured during the trip, six in
            ten of them with a cold or fever.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your situation", "Required?", "What the official source says", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {requiredRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.answer}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {LAST_CHECKED}. Sources:{" "}
            <a href="https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html" target="_blank" rel={PLAIN_REL}>MOFA, visa exemption</a>,{" "}
            <a href="https://www.mofa.go.jp/ca/fna/page22e_000738.html" target="_blank" rel={PLAIN_REL}>MOFA, Long Stay for sightseeing and recreation</a>,{" "}
            <a href="https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html" target="_blank" rel={PLAIN_REL}>MOFA, Digital Nomad</a>,{" "}
            <a href="https://www.mhlw.go.jp/stf/newpage_46516.html" target="_blank" rel={PLAIN_REL}>MHLW</a>,{" "}
            <a href="https://www.mlit.go.jp/kankocho/en/shisaku/kokusai/traveltojapan.html" target="_blank" rel={PLAIN_REL}>Japan Tourism Agency</a>,{" "}
            <a href="https://www.mlit.go.jp/kankocho/news08_00002.html" target="_blank" rel={PLAIN_REL}>JTA visitor medical survey (2024)</a> and{" "}
            <a href="https://www.hokeniryo.metro.tokyo.lg.jp/iryo/iryo_hoken/medical_info_eng/insurance" target="_blank" rel={PLAIN_REL}>Tokyo Metropolitan Government</a>.
            Applying for a visa that requires cover? SafetyWing&apos;s FAQ says it cannot guarantee its plans meet a
            given visa&apos;s requirements, so check the wording against the consulate&apos;s list.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Get a SafetyWing quote for Japan →" className={styles.verdictBtn} placement="insurance-required" />
          </div>
        </section>

        {/* Mandatory, as its own question. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Entry rules</span>
          <h2 className={styles.sectionTitle}>Is Travel Insurance Required for a Japan Visa?</h2>
          <p className={styles.bodyText}>
            Only for some visas. MOFA lists proof of medical travel insurance for the Long Stay for sightseeing and
            recreation visa, and medical cover of ¥10 million or more for the Digital Nomad visa. A visa-free
            tourist needs none: MOFA&apos;s visa-exemption list sets no insurance condition for entry. For any other
            visa, the embassy&apos;s own document list is the one to follow.
          </p>
          <p className={styles.bodyText}>
            The catch is the bill: the health ministry warns that unpaid medical fees can mean stricter immigration
            procedures on your next visit, and JNTO says such visitors may be denied entry in future.
          </p>
          <p className={styles.bodyText}>
            Credit card cover counts as insurance if its limits are high enough. Card benefits differ from card to
            card, so read your own card&apos;s medical limit, evacuation line and whether the fare has to be paid on
            that card before relying on it.
          </p>
        </section>

        {/* 2. Cost of care. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost of care</span>
          <h2 className={styles.sectionTitle}>How Much Is a Hospital Visit in Japan Without Insurance?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The full amount. Residents in Japan&apos;s health insurance pay 30% at the counter; a visitor without
            overseas travel insurance may be charged everything, and JNTO&apos;s two published cases came to ¥7.5
            million and ¥10 million.
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
                  {costRows.map((row) => (
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
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {LAST_CHECKED}. Sources:{" "}
            <a href="https://www.jnto.go.jp/emergency/eng/mi_guide.html" target="_blank" rel={PLAIN_REL}>JNTO, guide for when you are feeling ill</a>,{" "}
            <a href="https://www.hokeniryo.metro.tokyo.lg.jp/iryo/iryo_hoken/medical_info_eng/insurance" target="_blank" rel={PLAIN_REL}>Tokyo Metropolitan Government, medical insurance</a>{" "}
            and <a href="https://www.mhlw.go.jp/stf/newpage_46516.html" target="_blank" rel={PLAIN_REL}>MHLW</a>.
            JNTO credits the two case figures to Tokio Marine International Assistance. If you may have to pay
            first and claim later, carry some yen (
            <Link href="/guides/money/how-much-yen-to-bring-japan">how much yen to bring to Japan</Link>) and a card
            that works at Japanese ATMs (<Link href="/guides/money/atms-in-japan">ATMs in Japan</Link>).
          </p>
        </section>

        {/* Hospitals and foreigners. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>In hospital</span>
          <h2 className={styles.sectionTitle}>Does Travel Insurance Cover Foreigners in Japan&apos;s Hospitals?</h2>
          <p className={styles.bodyText}>
            Yes. Japanese hospitals and clinics treat foreign visitors, and a private travel policy pays either
            through a cash-free service, so nothing is due on the day, or by refunding you after you pay. SafetyWing
            works on pay and claim, with direct billing set up on request.
          </p>
          <p className={styles.bodyText}>
            JNTO&apos;s{" "}
            <a href="https://www.jnto.go.jp/emergency/eng/mi_guide.html" target="_blank" rel={PLAIN_REL}>medical institution search</a>{" "}
            filters hospitals by language and by the cards they take, and the Japan Visitor Hotline, 050-3816-2787,
            answers 24 hours a day, 365 days a year in English, Chinese and Korean. For an ambulance, call 119. Read
            on {CHECKED}.
          </p>
        </section>

        {/* 3. What to cover. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Checklist</span>
          <h2 className={styles.sectionTitle}>What Should Japan Travel Insurance Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            At least ¥10 million in medical cover, with emergency evacuation home as its own line. That is the
            figure MOFA sets for the Digital Nomad visa and the size of JNTO&apos;s heart-attack case. Then
            cancellation if you have prepaid a lot, and ski wording if you are going to the mountains. Amounts are
            given only where an official source publishes one; the last column is SafetyWing Essential&apos;s own
            published line, for comparison.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Cover", "Suggested amount", "Basis (official sources)", "SafetyWing Essential"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem", fontWeight: 600 }}>{row.amount}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.basis}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {LAST_CHECKED}. Sources:{" "}
            <a href="https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html" target="_blank" rel={PLAIN_REL}>MOFA, Digital Nomad</a>,{" "}
            <a href="https://www.jnto.go.jp/emergency/eng/mi_guide.html" target="_blank" rel={PLAIN_REL}>JNTO, guide for when you are feeling ill</a>,{" "}
            <a href="https://www.mlit.go.jp/kankocho/en/shisaku/kokusai/traveltojapan.html" target="_blank" rel={PLAIN_REL}>Japan Tourism Agency</a>,{" "}
            <a href="https://safetywing.com/nomad-insurance" target="_blank" rel={PLAIN_REL}>safetywing.com/nomad-insurance</a> and{" "}
            <a href="https://safetywing.com/nomad-insurance/faq" target="_blank" rel={PLAIN_REL}>SafetyWing&apos;s FAQ</a>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Check SafetyWing medical cover →" className={styles.verdictBtn} placement="insurance-cover" />
          </div>
        </section>

        {/* Skiing, as its own question. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Ski trips</span>
          <h2 className={styles.sectionTitle}>Does Japan Travel Insurance Cover Skiing?</h2>
          <p className={styles.bodyText}>
            Often on piste only. SafetyWing&apos;s FAQ covers skiing and snowboarding, but not off-piste or against
            the advice of the local ski school, and heli-skiing stays excluded even with its adventure add-on.
            Before a ski trip, read three lines in any policy: on-piste, off-piste and search and rescue. Read on{" "}
            {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Going to Niseko, Hakuba or Nozawa? Our{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">Japan ski travel insurance</Link> guide compares
            that wording insurer by insurer.
          </p>
        </section>

        {/* Price. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>What Is the Cheapest Travel Insurance for Japan?</h2>
          <p className={styles.bodyText}>
            There is no single cheapest policy, because most insurers only give a quote. SafetyWing Essential lists US$62.72 per 4 weeks at ages 10–39 (read on {CHECKED}). For a fixed
            two-week trip its calculator gave US$31.36 at ages 10–39 on {CALC_CHECKED}. Conditions: Essential plan,
            in US dollars, no add-ons, no US cover; prices rise with age and your quote depends on your dates.
          </p>
          <p className={styles.bodyText}>
            Price is only half of it. Which policy fits a family, a long stay, a ski week or a trip with lots of
            prepaid bookings is on our page comparing the{" "}
            <Link href="/guides/money/best-travel-insurance-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              best travel insurance for Japan
            </Link>
            , and the two insurers most readers end up choosing between are set side by side in{" "}
            <Link href="/guides/money/safetywing-vs-heymondo-japan">SafetyWing vs Heymondo for Japan</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Get your price from SafetyWing →" className={styles.verdictBtn} placement="insurance-price" />
          </div>
        </section>

        {/* When to buy: what an AI summary will not settle. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>When Should You Buy Travel Insurance for Japan?</h2>
          <p className={styles.bodyText}>
            If you want cancellation cover, buy when you book the hotels and tours, because cover only applies to
            things that happen after the policy starts. Otherwise buy before you fly. You can still buy after landing: JNTO says insurance bought after entering Japan gives
            sufficient cover during your stay, and SafetyWing can be bought whether or not you are already abroad.
            Anything that started before the policy did will not be covered.
          </p>
        </section>

        <EsimCtaBottom />

        {/* FAQ */}
        <section className={styles.faqSection}>
          <span className={styles.sectionLabel}>FAQ</span>
          <h2 className={styles.sectionTitle}>Japan Travel Insurance FAQ</h2>
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
              { href: "/guides/money/best-travel-insurance-japan", title: "Best Travel Insurance for Japan (2026): Compared" },
              { href: "/guides/money/safetywing-vs-heymondo-japan", title: "SafetyWing vs Heymondo for Japan (2026)" },
              { href: "/guides/money/japan-ski-travel-insurance", title: "Travel Insurance for Skiing & Snowboarding in Japan" },
              { href: "/guides/money/japan-travel-budget", title: "Japan Travel Budget 2026: Cost per Day" },
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
