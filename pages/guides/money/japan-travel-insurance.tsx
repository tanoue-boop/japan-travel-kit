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
const SPONSORED_REL = "sponsored noopener noreferrer";
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
 */
const CHECKED = checkedLabel("2026-11-13");
const CALC_CHECKED = checkedLabel("2026-11-09");
const LAST_CHECKED = "2026-11-13";

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

const coverRows = [
  {
    item: "Medical treatment and hospital stays",
    why: "JNTO's heart-attack case reached ¥10 million. The Digital Nomad visa sets ¥10 million as its medical minimum.",
    look: "A limit well above ¥10 million and no or a low deductible",
    sw: "US$250,000 limit (Essential)",
  },
  {
    item: "Emergency evacuation and the flight home",
    why: "Both JNTO cases include a doctor escort and a business-class flight home.",
    look: "Evacuation and repatriation listed as their own line",
    sw: "US$100,000 lifetime",
  },
  {
    item: "Paying the hospital",
    why: "Clinics generally take cash only; cash-free insurance means no payment on the day.",
    look: "Direct billing or a cash-free service, and a 24-hour assistance line",
    sw: "Pay and claim; direct billing on request",
  },
  {
    item: "Trip cancellation",
    why: "Covers bookings you cannot use if you fall ill before leaving.",
    look: "A cancellation limit that matches your prepaid hotels and tours",
    sw: "Not listed on Essential; US$300 per trip on Complete",
  },
  {
    item: "Lost luggage and belongings",
    why: "Checked bags and the phone you navigate with.",
    look: "Per-item and per-trip limits",
    sw: "US$500 per item, US$3,000 per plan",
  },
  {
    item: "Skiing and snowboarding",
    why: "Japan's ski season runs through the winter; off-piste is where most policies stop.",
    look: "Wording for on-piste, off-piste and search and rescue",
    sw: "Covered on piste; not off-piste",
  },
  {
    item: "Pre-existing conditions and pregnancy",
    why: "JNTO notes travel insurance does not cover perinatal care.",
    look: "Ask the insurer in writing before buying",
    sw: "Not covered (pre-existing conditions, maternity care)",
  },
];

const faqItems = [
  {
    q: "Do you need travel insurance for Japan?",
    a: `It is not an entry requirement for tourists, but Japan's health ministry strongly recommends private health insurance, and JNTO says visitors without overseas travel insurance may be charged the full amount. JNTO lists hospital cases of ¥7.5 million and ¥10 million. Read on ${CHECKED}.`,
  },
  {
    q: "Is travel insurance mandatory for Japan?",
    a: `Not for a tourist entering visa-free: MOFA's visa-exemption list sets no insurance condition. It is mandatory for the Long Stay for sightseeing and recreation visa and the Digital Nomad visa, which requires medical cover of ¥10 million or more. Read on ${CHECKED}.`,
  },
  {
    q: "How much is travel insurance for a Japan trip?",
    a: `SafetyWing Essential lists US$62.72 per 4 weeks at ages 10–39 (read on ${CHECKED}), and its calculator gave US$31.36 for 14 fixed days at 10–39 on ${CALC_CHECKED}, without add-ons. Prices rise with age; your quote depends on age and dates.`,
  },
  {
    q: "Does travel insurance cover foreigners in Japan's hospitals?",
    a: "Yes. Japanese hospitals and clinics treat foreign visitors, and a private travel policy pays the bill either through a cash-free service, so you pay nothing on the day, or by refunding you after you pay. JNTO's search lists hospitals that take foreign patients.",
  },
  {
    q: "Can you buy travel insurance after arriving in Japan?",
    a: `Yes. JNTO says private medical insurance you can buy after entering Japan gives sufficient cover during your stay, and SafetyWing can be bought whether or not you are already abroad. Anything that started before you bought it is not covered. Read on ${CHECKED}.`,
  },
];

const TITLE = "Japan Travel Insurance 2026: Required? What to Cover & Cost";
const DESCRIPTION =
  "Do you need travel insurance for Japan? Not for entry, but JNTO cites a ¥10 million hospital case. Japan travel insurance: what to cover, what it costs.";
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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/money" className={styles.breadLink}>Money &amp; Payment</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Japan Travel Insurance</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Japan Travel Insurance (2026):<br />Do You Need Travel Insurance for Japan?
          </h1>
          <p className={styles.heroSubtitle}>
            Whether Japan requires it, what a hospital bill can reach without it, and the cover to check before
            you buy, from the government&apos;s own pages.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "MOFA, MHLW and JNTO sources", "Requirements and cost"].map((t) => (
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
              Japan does not require travel insurance for tourists to enter: Japan&apos;s Ministry of Foreign Affairs
              sets no insurance condition for visa-free visitors, and the health ministry strongly recommends it
              instead. Without overseas travel insurance, JNTO says a visitor may be charged the full hospital bill,
              and it lists cases of <strong>¥7.5 million</strong> and <strong>¥10 million</strong>. At minimum, a
              Japan travel insurance policy should cover medical treatment, emergency evacuation home and your
              belongings. Read on {CHECKED}.
            </p>
            <SafetyWingButton label="Check SafetyWing for your dates →" className={styles.verdictBtn} placement="insurance-answer" />
          </div>
        </div>

        <p className={styles.bodyText}>
          Already know you want cover and need to pick a policy?{" "}
          <Link href="/guides/money/best-travel-insurance-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
            Compare the best travel insurance for Japan
          </Link>{" "}
          by trip type, price and medical limit.
        </p>

        {/* 1. Required or not. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Requirements</span>
          <h2 className={styles.sectionTitle}>Do You Need Travel Insurance for Japan?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            As a tourist, no rule makes you buy it, but you should. Two visa types do require it: the Long Stay for
            sightseeing and recreation visa and the Digital Nomad visa, which sets a ¥10 million medical minimum.
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
            <a href="https://www.mhlw.go.jp/stf/newpage_46516.html" target="_blank" rel={PLAIN_REL}>MHLW</a> and{" "}
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
          <h2 className={styles.sectionTitle}>Is Travel Insurance Mandatory for Japan?</h2>
          <p className={styles.bodyText}>
            No, not for a visa-free tourist: MOFA&apos;s visa-exemption list sets no insurance condition for entry.
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
          <h2 className={styles.sectionTitle}>What Does a Hospital Cost in Japan Without Insurance?</h2>
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
            Medical treatment, emergency evacuation and your belongings first; cancellation if you have prepaid a
            lot; ski wording if you are going to the mountains. The last column is SafetyWing Essential&apos;s own
            published line, for comparison.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Cover", "Why it matters in Japan", "What to look for", "SafetyWing Essential"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.look}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.sw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={noteStyle}>
            Last checked: {LAST_CHECKED} on{" "}
            <a href="https://safetywing.com/nomad-insurance" target="_blank" rel={PLAIN_REL}>safetywing.com/nomad-insurance</a> and{" "}
            <a href="https://safetywing.com/nomad-insurance/faq" target="_blank" rel={PLAIN_REL}>SafetyWing&apos;s FAQ</a>.
            Skiing or snowboarding? Our{" "}
            <Link href="/guides/money/japan-ski-travel-insurance">travel insurance for skiing in Japan</Link> guide
            compares on-piste, off-piste and rescue wording insurer by insurer.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <SafetyWingButton label="Check SafetyWing medical cover →" className={styles.verdictBtn} placement="insurance-cover" />
          </div>
        </section>

        {/* Price. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Is Travel Insurance for a Japan Trip?</h2>
          <p className={styles.bodyText}>
            SafetyWing Essential lists US$62.72 per 4 weeks at ages 10–39 (read on {CHECKED}). For a fixed
            two-week trip its calculator gave US$31.36 at ages 10–39 on {CALC_CHECKED}. Conditions: Essential plan,
            in US dollars, no add-ons, no US cover; prices rise with age and your quote depends on your dates.
          </p>
          <p className={styles.bodyText}>
            Price is only half of it. Which policy fits a family, a long stay, a ski week or a trip with lots of
            prepaid bookings is on our page to{" "}
            <Link href="/guides/money/best-travel-insurance-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              compare the best travel insurance for Japan
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

        <KlookTripPrep
          label="Book on the same trip"
          heading="What Else to Book Before You Fly to Japan"
          intro="Insurance covers the trip going wrong. These cover arrival day: a reserved train from the airport and data on your phone for the assistance line and the hospital search."
          items={japanTravelInsuranceTripPrep}
        />

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
