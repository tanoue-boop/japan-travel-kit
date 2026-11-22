import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { atmsTripPrep } from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { wiseLink, WISE_REL, WISE_CARD_URL } from "../../../lib/wise-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

const WISE_CARD_CTA = wiseLink("atms-in-japan", WISE_CARD_URL);

/**
 * Every brand list, fee, service hour and withdrawal limit below was read off the
 * operator's own site on this date:
 *
 *   - Seven Bank: sevenbank.co.jp/intlcard/ , /intlcard/card.html , /intlcard/service.html
 *   - Japan Post Bank: jp-bank.japanpost.jp/en/ias/en_ias_index.html
 *   - E-net: enetcom.co.jp/intl/ and its own notice of the limit change (news/2017/news0919)
 *   - Lawson Bank: faq.lawsonbank.jp (faq 350 and 352)
 *
 * Two operators answer an automated read with HTTP 403 — www.aeonbank.co.jp entirely,
 * and www.lawsonbank.jp (its FAQ subdomain does respond). So no AEON Bank figure
 * appears in any table here, and Lawson Bank's fee and hours are left blank rather
 * than borrowed from a comparison site. Figures the pages do not publish — the Seven
 * Bank and E-net fee amounts — are reported as not published, not estimated.
 */
const CHECKED = "26 October 2026";
/**
 * 13 Nov 2026 re-read (task jtk-20261113-C01): sevenbank.co.jp/intlcard/ (brands, 28,000+ ATMs),
 * /intlcard/card.html (fee differs by brand, no amount; hours per brand), /intlcard/service.html
 * (¥100,000, ¥30,000 magnetic stripe); jp-bank.japanpost.jp/en/ias/en_ias_index.html (brands, ¥220,
 * ¥50,000, hours). All unchanged. E-net, Lawson Bank and AEON Bank keep the 26 Oct date.
 */
/**
 * 20 Nov 2026 re-read (task jtk-20261120-C01): sevenbank.co.jp/intlcard/card.html (brand hours;
 * "海外発行カードでの１回の引出限度額は10万円です。ただし、磁気ストライプでのお取引きは3万円です";
 * "海外発行カードのブランドにより手数料が異なります" — still no amount), /intlcard/service.html (same
 * limits); jp-bank.japanpost.jp/en/ias/en_ias_index.html ("an ATM usage fee (\220 (tax included) per
 * use) may apply", 50,000 yen, hours, brands). All unchanged.
 * AEON Bank's English ATM pages answered this time (www.aeonbank.co.jp/atm/en/page02/ and page04/):
 * brands UnionPay, Mastercard, Maestro, Cirrus, Visa, PLUS, JCB, Discover; "The limit for each
 * withdrawal is 50,000 yen"; 24 hours on every brand in its table, while its FAQ says hours vary with
 * the location; UnionPay "ATM fee of JPY 75 (tax included) per withdrawal"; and a fee notice: "From
 * December 16, 2026, when using a Visa, Mastercard, or UnionPay card issued outside of Japan at an AEON
 * Bank ATM, a fee of 880 yen will be charged". So the AEON row is filled in from this date.
 * The task brief suggested "¥110–330 per withdrawal"; no operator page read gives that range, so it is
 * not used.
 */
const RECHECKED = "20 November 2026";
const RECHECKED_ISO = "2026-11-20";
const SEVEN_BANK_URL = "https://www.sevenbank.co.jp/intlcard/";
const JP_BANK_URL = "https://www.jp-bank.japanpost.jp/en/ias/en_ias_index.html";
const AEON_URL = "https://www.aeonbank.co.jp/atm/en/page02/";

/** Requirement (c): one row per ATM network, every cell from the operator's own page. */
const atmNetworks = [
  {
    name: "Seven Bank",
    sub: "ATMs in 7-Eleven stores",
    where: "Inside 7-Eleven stores, plus airports and shopping centres — Seven Bank counts over 28,000 machines.",
    brands: "Visa, PLUS, Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, DISCOVER, Diners Club — with the caveat that some cards carrying those marks may still not be accepted.",
    fee: "No amount published. Seven Bank states only that the fee differs by the brand of the overseas card.",
    hours: "Visa/PLUS and Mastercard/Maestro/Cirrus 00:00–24:00. UnionPay, JCB and Discover 00:10–23:50, American Express 00:05–23:50, Diners Club 00:05–23:55.",
    limit: "¥100,000 per withdrawal, or ¥30,000 if the transaction is read from the magnetic stripe.",
  },
  {
    name: "Japan Post Bank",
    sub: "ATMs at post offices",
    where: "Post offices nationwide, plus Japan Post Bank ATMs in some convenience stores.",
    brands: "“VISA, PLUS, Mastercard, Maestro, Cirrus, JCB, China Unionpay and DISCOVER”.",
    fee: "“When using certain cards issued abroad, an ATM usage fee (¥220 (tax included) per use) may apply”.",
    hours: "ATMs at post offices: Mon–Sat 7:00–23:00; Sundays, holidays, 1–3 January and 31 December 7:00–21:00. Its ATMs inside convenience stores: 0:05–23:55 (from 7:00 on the third Monday).",
    limit: "“Single transaction withdrawal limit is 50,000 yen”.",
  },
  {
    name: "E-net",
    sub: "ATMs in FamilyMart, Don Quijote",
    where: "FamilyMart, Don Quijote, Daily Yamazaki and Poplar stores — not every branch has one.",
    brands: "Visa, Mastercard, UnionPay (銀聯) and JCB.",
    fee: "No amount published. The fee is set by the handling bank, and the card issuer may add one of its own.",
    hours: "24 hours a day, 365 days a year.",
    limit: "¥100,000 per IC-chip withdrawal; ¥40,000 if the transaction uses the magnetic stripe.",
  },
  {
    name: "Lawson Bank",
    sub: "ATMs in Lawson stores",
    where: "Lawson stores and some commercial facilities — but only part of its ATM estate takes overseas cards, so the screen is the test.",
    brands: "Visa, Mastercard, JCB and UnionPay.",
    fee: "Not confirmed on the official site — see the note under the table.",
    hours: "Not confirmed on the official site — see the note under the table.",
    limit: "¥50,000 per withdrawal.",
  },
  {
    name: "AEON Bank",
    sub: "ATMs in AEON malls",
    where: "AEON malls, MINISTOP and other convenience stores, airports and major stations.",
    brands: "UnionPay, Mastercard, Maestro, Cirrus, Visa, PLUS, JCB and Discover.",
    fee: "UnionPay ¥75 (tax included) per withdrawal now. From 16 December 2026: ¥880 per withdrawal on Visa, Mastercard and UnionPay cards issued abroad.",
    hours: "24 hours for every brand in its table — but AEON's FAQ says hours follow the opening hours of the site.",
    limit: "¥50,000 per withdrawal.",
  },
];

const howToUseSteps = [
  {
    title: "Look for the English-language option immediately",
    desc: "On Seven Bank and Japan Post Bank ATMs an English option appears on the first screen. Select it before doing anything else — the menus are much easier to navigate in English, and you will avoid picking the wrong service by accident.",
  },
  {
    title: "Choose 'Withdrawal' from the main menu",
    desc: "Select 'Withdrawal' (or 'Cash advance' on some machines). You will be prompted to insert your card — or on some machines, insert the card first and then choose a language. Follow the on-screen prompts.",
  },
  {
    title: "Enter your PIN",
    desc: "Japanese ATMs ask for a numeric PIN. Seven Bank's own instruction if the PIN is rejected is to contact the company that issued the card, so sort out any doubt about your PIN before you fly rather than at the machine.",
  },
  {
    title: "Select JPY and enter your withdrawal amount",
    desc: "Withdraw in Japanese yen. Seven Bank offers the choice between yen and your home currency on Visa and Mastercard only — not on JCB, Discover, UnionPay, American Express or Diners Club — and the home-currency figure is converted by whoever offers the conversion, at their rate rather than your own bank's.",
  },
  {
    title: "If the amount is refused, lower it",
    desc: "Seven Bank's instruction for a withdrawal over the limit is to reduce the amount and try again. Its cap is ¥100,000 per withdrawal, ¥30,000 on a magnetic-stripe read; Japan Post Bank and Lawson Bank cap a single transaction at ¥50,000; E-net at ¥100,000 by chip and ¥40,000 by stripe.",
  },
  {
    title: "Take your card, your cash and the receipt",
    desc: "Seven Bank machines return the card before the notes. Keep the receipt if you want the record of what the withdrawal cost — the machine shows the fee on screen before you confirm, which is the one place the amount is always stated.",
  },
];

/** The first FAQ_SCHEMA_COUNT questions go into FAQPage; the rest stay visible only. */
const FAQ_SCHEMA_COUNT = 5;

const faqItems = [
  {
    q: "Which ATMs in Japan accept foreign cards?",
    a: `Seven Bank (in 7-Eleven), Japan Post Bank (Yucho, at post offices), AEON Bank, E-net (in FamilyMart) and part of Lawson Bank's estate — the convenience-store and post-office networks, not the branch ATMs of the big commercial banks. Seven Bank takes the longest list: Visa, PLUS, Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, Discover and Diners Club. Japan Post Bank and AEON Bank both take Visa, PLUS, Mastercard, Maestro, Cirrus, JCB, UnionPay and Discover. Seven Bank, Japan Post Bank and AEON Bank checked on their own sites on ${RECHECKED}; E-net and Lawson Bank on ${CHECKED}.`,
  },
  {
    q: "How much are ATM fees in Japan?",
    a: `It depends on the network, and three of the five publish an amount. Japan Post Bank: “an ATM usage fee (¥220 (tax included) per use) may apply” to certain cards issued abroad. AEON Bank: ¥75 per withdrawal on UnionPay now, and from 16 December 2026 ¥880 per withdrawal on Visa, Mastercard and UnionPay cards issued abroad. Seven Bank states only that the fee differs by card brand, and E-net that the handling bank sets it — neither prints a figure. Your own card issuer's fee comes on top, and the machine shows its own fee on screen before you confirm. Checked ${RECHECKED}.`,
  },
  {
    q: "Do 7-Eleven ATMs in Japan accept foreign cards?",
    a: `Yes. The ATMs in 7-Eleven stores are Seven Bank machines, and Seven Bank lists Visa, PLUS, Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, Discover and Diners Club for cards issued abroad, noting that some cards with those marks may still not work. The limit is ¥100,000 per withdrawal, or ¥30,000 if the magnetic stripe is read, and Visa and Mastercard cards can be used 00:00–24:00. Seven Bank publishes no fee amount — it states only that the fee differs by card brand — so the figure on screen before you confirm is the one to read. Checked on sevenbank.co.jp on ${RECHECKED}.`,
  },
  {
    q: "Are ATMs in Japan open 24 hours?",
    a: `E-net is the only one of the five that states a flat 24 hours a day, 365 days a year. Seven Bank runs 00:00–24:00 for Visa/PLUS and Mastercard/Maestro/Cirrus, with short nightly gaps for the other brands (UnionPay, JCB and Discover 00:10–23:50, American Express 00:05–23:50, Diners Club 00:05–23:55). Japan Post Bank ATMs at post offices run Mon–Sat 7:00–23:00 and 7:00–21:00 on Sundays and holidays, so they are not an overnight option. Service hours checked ${CHECKED}.`,
  },
  {
    q: "How much cash can I withdraw from a Japanese ATM in one go?",
    a: `Seven Bank allows ¥100,000 per withdrawal and E-net ¥100,000 by IC chip; Japan Post Bank, AEON Bank and Lawson Bank each cap a single transaction at ¥50,000. Your own bank's daily limit applies on top of the machine's, and it is the one the ATM cannot tell you about — check it before you travel. Limits read off the operators' own pages on ${CHECKED}.`,
  },
  {
    q: "Why was my withdrawal capped at ¥30,000 or ¥40,000?",
    a: `Because the machine read the magnetic stripe rather than the chip. Seven Bank drops the per-withdrawal limit to ¥30,000 for a magnetic-stripe transaction and E-net to ¥40,000, against ¥100,000 each on a chip read. A chip card that falls back to the stripe will hit the lower cap, so take the cash in more than one go rather than assuming the card has been refused.`,
  },
  {
    q: "Do FamilyMart ATMs accept foreign cards?",
    a: `Yes — the machines in FamilyMart are E-net ATMs, and E-net accepts Visa, Mastercard, UnionPay and JCB cards issued overseas, 24 hours a day and 365 days a year. The limit is ¥100,000 per withdrawal by IC chip and ¥40,000 by magnetic stripe. E-net does not publish a fee amount: it is set by the handling bank, and your card issuer may add one. Checked ${CHECKED}.`,
  },
  {
    q: "Will the ATM ask me to pay in yen or my home currency?",
    a: `On some brands, yes. Seven Bank states that the choice between your home currency and Japanese yen is available on Visa and Mastercard, and not on JCB, Discover, UnionPay, American Express or Diners Club. Choose yen: the home-currency figure is converted by whoever offers the conversion, at their rate, rather than by your own bank at the rate it publishes.`,
  },
  {
    q: "What should I do if the ATM declines my card?",
    a: `Try a second network before you conclude the card is blocked — the five networks run different brand lists and different hours, so a refusal at one machine is often a brand or a time-of-day gap rather than your card. If the amount was large, lower it: Seven Bank's own instruction for a withdrawal over its limit is to reduce the amount and try again. If the PIN was rejected, Seven Bank's instruction is to contact the company that issued the card.`,
  },
];

const tips = [
  "Withdraw in large amounts and rarely, not small amounts and often: the machine's fee is charged per withdrawal, so four withdrawals of ¥25,000 cost four fees and one of ¥100,000 costs one.",
  "Seven Bank puts ATMs in airports as well as stores, so the arrival-day withdrawal does not have to wait for the first convenience store in town.",
  "Keep the receipt if you want the record — the fee itself is shown on the ATM screen before you confirm, which for Seven Bank and E-net is the only place an amount is stated at all.",
  "If you will use an AEON Bank ATM after 16 December 2026, note its new ¥880 fee on Visa, Mastercard and UnionPay cards issued abroad — a 7-Eleven or post office may be cheaper for the same withdrawal.",
  "Coverage thins out away from the cities. Convenience-store density is what makes these five networks usable, and it drops in mountain towns and on smaller islands — take the cash out before you leave an urban centre.",
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/atms-in-japan") } });

const TITLE = "ATMs in Japan 2026: Which Accept Foreign Cards & Fees";
const DESCRIPTION =
  "ATMs in Japan for foreign cards: 7-Eleven ¥100,000 a withdrawal, Japan Post ¥50,000 + ¥220 fee, AEON ¥880 from 16 Dec 2026. Compare all 5, then get Wise.";

export default function AtmsInJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/atms-in-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/atms-in-japan" />
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
              mainEntity: faqItems.slice(0, FAQ_SCHEMA_COUNT).map((item) => ({
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
              route: "/guides/money/atms-in-japan",
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
                { "@type": "ListItem", position: 4, name: "ATMs in Japan", item: "https://www.japan-travel-kit.com/guides/money/atms-in-japan" },
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
          <span className={styles.breadCurrent}>ATMs in Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            ATMs in Japan 2026: <br />Which Accept Foreign Cards, Fees &amp; Limits
          </h1>
          <p className={styles.heroSubtitle}>
            Five ATM networks take a card issued abroad, and only some of them publish what they
            charge. Brands, fees, hours and limits, from each operator&apos;s own pages.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "5 Networks Compared", `Figures checked ${CHECKED}`].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* Answer first — requirement (b). Two sentences, before the Quick Answer box. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              Seven Bank (7-Eleven), Japan Post Bank (Yucho) and AEON Bank ATMs all accept Visa and Mastercard
              cards issued abroad.
            </strong>{" "}
            Seven Bank allows <strong>¥100,000</strong> per withdrawal and publishes no fee amount; Japan Post
            Bank caps a withdrawal at <strong>¥50,000</strong> and says a <strong>¥220</strong> fee may apply;
            AEON Bank caps it at <strong>¥50,000</strong> and charges <strong>¥880</strong> per withdrawal on
            Visa, Mastercard and UnionPay from 16 December 2026. Your own bank&apos;s fee comes on top — all
            three checked on the operators&apos; own sites on {RECHECKED}, with E-net (FamilyMart) and Lawson
            Bank on {CHECKED}. Where an ATM fits next to the card and the cash float is set out in our{" "}
            <Link href="/guides/money" style={{ color: "var(--text)", fontWeight: 600 }}>money in Japan</Link> guide.
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
                <p className={styles.verdictStatLabel}>Widest Brand List</p>
                <p className={styles.verdictStatValue}>Seven Bank</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Open 24/365</p>
                <p className={styles.verdictStatValue}>E-net</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Published Fees</p>
                <p className={styles.verdictStatValue}>¥220 Japan Post; ¥880 AEON from 16 Dec</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>Reach for a 7-Eleven first.</strong> Seven Bank takes the longest list of overseas
              brands, allows ¥100,000 per withdrawal against ¥50,000 at Japan Post Bank, AEON Bank and
              Lawson Bank, and runs around the clock on Visa and Mastercard. The fee is shown on screen
              before you confirm — for Seven Bank and E-net that is the only place an amount appears at all.
            </p>
            <a href={WISE_CARD_CTA} className={styles.verdictBtn} target="_blank" rel={WISE_REL} style={{ display: "inline-block", marginTop: "1rem" }}>
              Get a Wise card before you fly →
            </a>
            <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.7rem", lineHeight: 1.6 }}>
              Affiliate link: we may earn a commission if you sign up, at no extra cost to you.
            </p>
          </div>
        </div>

        <EsimCtaTop />

        {/* Q1 — requirement (c): the network-by-network table. */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Comparison</span>
          <h2 className={styles.sectionTitle}>Which ATMs in Japan accept foreign cards?</h2>
          <p className={styles.bodyText}>
            Seven Bank (7-Eleven), Japan Post Bank, AEON Bank, E-net and part of Lawson Bank — the
            convenience-store and post-office networks, not the branch ATMs of Mizuho, MUFG or SMBC. Seven
            Bank takes the longest brand list of the five and allows the most per withdrawal, ¥100,000.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ATM network", "Where the machines are", "Overseas brands taken", "Fee on the Japanese side", "Service hours", "Limit per withdrawal"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {atmNetworks.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ minWidth: "150px" }}>
                        {row.name}
                        <span className={styles.tdBestFor} style={{ display: "block", fontWeight: 400 }}>{row.sub}</span>
                      </td>
                      <td style={{ fontSize: "0.82rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.brands}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.fee}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.hours}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.82rem", minWidth: "150px" }}>{row.limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem" }}>
            Last checked: {RECHECKED_ISO} (Seven Bank, Japan Post Bank and AEON Bank rows). Official pages:{" "}
            <a href={SEVEN_BANK_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>Seven Bank overseas cards</a>,{" "}
            <a href={JP_BANK_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>Japan Post Bank international ATM service</a>{" "}
            and{" "}
            <a href={AEON_URL} target="_blank" rel="noopener" style={{ fontWeight: 600 }}>AEON Bank cards issued overseas</a>.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.5rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Sources, first read {CHECKED}: Seven Bank&apos;s overseas-card pages (brands and service hours,
            and its ATM-usage page for the limits), Japan Post Bank&apos;s international ATM service page,
            E-net&apos;s overseas-card page plus its own notice of the limit change, and Lawson Bank&apos;s
            FAQ; AEON Bank&apos;s English ATM pages were read on {RECHECKED}. The Lawson Bank gaps are
            deliberate: www.lawsonbank.jp could not be checked, so its brands and ¥50,000 limit come from its
            FAQ subdomain, and its fee and hours are not printed here rather than borrowed from a comparison
            site. Fees change: the ATM screen states the
            charge before you confirm the withdrawal.
          </p>
        </section>

        {/* Klook — requirement (e): moved up to sit directly behind the first table, in the
            "what you can pay for before you withdraw anything" frame. */}
        <KlookTripPrep
          heading="What You Can Pay for Before You Withdraw Anything"
          intro="Every fee above is charged per withdrawal, so the cheapest yen is the yen you never take out. These three are normally paid in yen on arrival and can be settled on a card before you fly instead:"
          items={atmsTripPrep}
        />

        {/* Q2 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Fees</span>
          <h2 className={styles.sectionTitle}>How much are ATM fees in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>¥220 at Japan Post Bank (&ldquo;may apply&rdquo;), and ¥880 at AEON Bank on Visa,
            Mastercard and UnionPay from 16 December 2026</strong> — the two amounts the operators publish.
            AEON charges UnionPay cards ¥75 per withdrawal until then. Seven Bank states only that the fee
            differs by the brand of the overseas card, and E-net that it is set by the handling bank with the
            issuer possibly adding its own — neither prints an amount, which is why none appears here.
            Checked {RECHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["ATM network", "Machine fee per withdrawal (foreign card)", "Limit"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdProvider}>Japan Post Bank</td>
                    <td style={{ fontSize: "0.85rem" }}>¥220 (tax included) &ldquo;may apply&rdquo; on certain cards</td>
                    <td className={styles.tdPrice}>¥50,000</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>AEON Bank</td>
                    <td style={{ fontSize: "0.85rem" }}>UnionPay ¥75 now; ¥880 on Visa, Mastercard and UnionPay from 16 Dec 2026</td>
                    <td className={styles.tdPrice}>¥50,000</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>Seven Bank (7-Eleven)</td>
                    <td style={{ fontSize: "0.85rem" }}>Not published — differs by card brand; shown on screen</td>
                    <td className={styles.tdPrice}>¥100,000 (¥30,000 stripe)</td>
                  </tr>
                  <tr>
                    <td className={styles.tdProvider}>E-net (FamilyMart)</td>
                    <td style={{ fontSize: "0.85rem" }}>Not published — set by the handling bank</td>
                    <td className={styles.tdPrice}>¥100,000 (¥40,000 stripe)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {RECHECKED_ISO} (E-net row: {CHECKED}). Sources:{" "}
            <a href={JP_BANK_URL} target="_blank" rel="noopener">Japan Post Bank</a>,{" "}
            <a href={AEON_URL} target="_blank" rel="noopener">AEON Bank</a>,{" "}
            <a href={SEVEN_BANK_URL} target="_blank" rel="noopener">Seven Bank</a>.
          </p>
          <p className={styles.bodyText}>
            There are two fees on any Japanese withdrawal and they are charged by different parties. The
            machine&apos;s fee is the one above, shown on screen before you confirm. The second is your own
            bank&apos;s: a foreign-ATM fee, a percentage of the amount, or an exchange-rate margin, depending
            on the card. That second fee is the one worth choosing a card over, because it repeats on every
            withdrawal and on every purchase for the whole trip —{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              our travel-card comparison
            </Link>{" "}
            sets out what each type charges. On a Revolut card, that second fee is nothing within your
            plan&apos;s monthly allowance and 2% above it; the allowance for each plan is in{" "}
            <Link href="/guides/money/revolut-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Revolut in Japan
            </Link>
            . Figures checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            The fewer withdrawals you make, the fewer times that second fee repeats — and a tap of the same
            card now settles most chain-store bills and, on Tokyo Metro and Toei, the fare at the gate.{" "}
            <Link href="/guides/money/contactless-payment-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Where contactless payment works in Japan
            </Link>{" "}
            shows which places still need the cash you withdraw here.
          </p>
        </section>

        {/* Q3 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>Are ATMs in Japan open 24 hours?</h2>
          <p className={styles.bodyText}>
            E-net is: it states 24 hours a day, 365 days a year for the overseas cards it takes. Seven Bank
            is effectively so on the two brands most visitors carry — 00:00–24:00 for Visa/PLUS and for
            Mastercard/Maestro/Cirrus — with short nightly gaps on the rest: UnionPay, JCB and Discover
            00:10–23:50, American Express 00:05–23:50, Diners Club 00:05–23:55.
          </p>
          <p className={styles.bodyText}>
            Japan Post Bank is the exception that catches people out. Its ATMs at post offices run Monday to
            Saturday 7:00–23:00, and 7:00–21:00 on Sundays, holidays, 1–3 January and 31 December; its machines
            inside convenience stores run 0:05–23:55, from 7:00 on the third Monday of the month. So a late-night
            withdrawal in Japan means a convenience store, and the store&apos;s own opening hours apply as well
            as the network&apos;s — a 24-hour network inside a shop that shuts at 23:00 is shut at 23:00.
            Service hours checked {CHECKED}.
          </p>
        </section>

        {/* Q4 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Limits</span>
          <h2 className={styles.sectionTitle}>How much cash can I withdraw from a Japanese ATM?</h2>
          <p className={styles.bodyText}>
            ¥100,000 in one go at Seven Bank and at E-net on a chip read, and ¥50,000 at Japan Post Bank, AEON
            Bank and Lawson Bank. Magnetic-stripe transactions are capped lower — ¥30,000 at Seven Bank, ¥40,000 at
            E-net — so a chip card that falls back to the stripe will stop short of the headline figure.
          </p>
          <p className={styles.bodyText}>
            The limit that actually binds is usually your own bank&apos;s daily one, and the machine cannot
            tell you what it is. Check it before you fly, together with whether the card is enabled for
            overseas withdrawals at all. Seven Bank&apos;s own instruction when a withdrawal exceeds its limit
            is simply to reduce the amount and try again — worth knowing, because the screen reads like a
            refusal. Limits checked {CHECKED}. How many withdrawals a trip needs depends on the cash per
            day, which{" "}
            <Link href="/guides/money/how-much-yen-to-bring-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              how much yen to bring
            </Link>{" "}
            sets out by travel style.
          </p>
        </section>

        {/* Q5 — requirement (e): the Wise CTA sits directly after this answer. */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Cards</span>
          <h2 className={styles.sectionTitle}>Which card has the lowest ATM fees in Japan?</h2>
          <p className={styles.bodyText}>
            A multi-currency debit card with a free monthly ATM allowance and the mid-market exchange rate —
            Wise for most visitors — because the Japanese machine&apos;s fee is small and fixed while the
            card side of the bill is a percentage that repeats on every withdrawal. Wise charges nothing on
            withdrawals up to the allowance set by the country your account is registered in, then a
            percentage of the excess; the ATM operator&apos;s own fee still applies on top.
          </p>
          <a href={WISE_CARD_CTA} className={styles.verdictBtn} target="_blank" rel={WISE_REL}>
            Get a Wise card before you fly →
          </a>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            The allowances, the fee above them and the card&apos;s one-off cost differ by account country, so
            the figures are kept where they are checked rather than repeated here:{" "}
            <Link href="/guides/money/wise-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Wise card in Japan
            </Link>{" "}
            for the allowance and the ATMs that take it, and{" "}
            <Link href="/guides/money/best-travel-card-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              best travel card for Japan
            </Link>{" "}
            for the comparison against UK app banks, prepaid cards and no-foreign-transaction-fee credit
            cards. One rule holds whatever you carry: a cash withdrawal on a credit card is a cash advance,
            which is normally a fee plus interest from day one. Take yen out on a debit card.
          </p>
        </section>

        {/* Q6 */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>How much</span>
          <h2 className={styles.sectionTitle}>How much cash should I withdraw for my trip?</h2>
          <p className={styles.bodyText}>
            Enough to cover a few days at a time rather than the whole trip, and in the largest amount the
            machine allows — because the fee is per withdrawal, not per yen, four withdrawals of ¥25,000 cost
            four fees where one of ¥100,000 costs one. Japan still runs on cash for small temples, markets,
            older restaurants and rural buses, so the question is how much of the trip is unavoidably cash,
            not whether to carry any.
          </p>
          <p className={styles.bodyText}>
            Three guides size that properly:{" "}
            <Link href="/guides/money/how-much-yen-to-bring-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              how much yen to bring to Japan
            </Link>{" "}
            gives the per-day cash float and 3, 7 and 14-day totals,{" "}
            <Link href="/guides/money/currency-exchange-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              currency exchange in Japan
            </Link>{" "}
            covers where the rate is worst, and{" "}
            <Link href="/guides/money/japan-travel-budget" style={{ color: "var(--red)", fontWeight: 600 }}>
              the Japan travel budget guide
            </Link>{" "}
            gives daily figures to withdraw against. If most of the trip is already paid for before you fly,
            the cash you need is the cash for the days themselves, which is a much smaller number.
          </p>
        </section>

        {/* Seven Bank detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Best option</span>
          <h2 className={styles.sectionTitle}>Seven Bank ATMs (in 7-Eleven stores)</h2>
          <p className={styles.bodyText}>
            Seven Bank&apos;s machines — inside 7-Eleven stores, and also in airports and shopping centres,
            over 28,000 of them by its own count — take the longest list of overseas brands of any network
            here: Visa, PLUS, Mastercard, Maestro, Cirrus, UnionPay, American Express, JCB, DISCOVER and
            Diners Club. Seven Bank adds the caveat that some cards carrying those marks may still not be
            accepted, so the screen remains the test.
          </p>
          <p className={styles.bodyText}>
            It is also the most permissive on amount: ¥100,000 per withdrawal, dropping to ¥30,000 if the
            transaction is read from the magnetic stripe. An English option appears on the first screen, and
            the machine returns the card before the notes. What Seven Bank does not publish is a fee — it
            states only that the amount differs by the brand of the overseas card, which means the on-screen
            figure before you confirm is the number to read.
          </p>
        </section>

        {/* Japan Post Bank detail */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Backup option</span>
          <h2 className={styles.sectionTitle}>Japan Post Bank ATMs</h2>
          <p className={styles.bodyText}>
            Japan Post Bank tells you the price in advance: &ldquo;when using certain
            cards issued abroad, an ATM usage fee (¥220 (tax included) per use) may apply&rdquo;. It accepts
            &ldquo;VISA, PLUS, Mastercard, Maestro, Cirrus, JCB, China Unionpay and DISCOVER&rdquo;, and caps a
            single withdrawal at ¥50,000 — half of Seven Bank&apos;s ceiling, so a larger amount means two
            transactions and two fees.
          </p>
          <p className={styles.bodyText}>
            Its advantage is reach: post offices are everywhere, including towns where the convenience-store
            networks thin out. Its limitation is hours — Monday to Saturday 7:00–23:00 at post offices, and
            7:00–21:00 on Sundays, holidays, 1–3 January and 31 December. Japan Post Bank ATMs inside
            convenience stores keep longer hours (0:05–23:55, from 7:00 on the third Monday).
          </p>
        </section>

        {/* How to Use */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step by step</span>
          <h2 className={styles.sectionTitle}>How to Use a Japanese ATM</h2>
          <div className={styles.stepsList}>
            {howToUseSteps.map((step, i) => (
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

        {/* Tips */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>Tips for Getting Cash in Japan</h2>
          <ul className={styles.bodyList}>
            {tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/wise-vs-revolut-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise vs Revolut Japan (2026): Which Travel Card Wins?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/revolut-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Can I Use Revolut in Japan? Yes — Fees, ATMs &amp; Limits (2026)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/how-much-yen-to-bring-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <circle cx="12" cy="12" r="2.5" />
                  <path d="M6 12h.01M18 12h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>How Much Yen to Bring to Japan 2026: Cash per Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="7" y1="15" x2="12" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/best-travel-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <line x1="14" y1="15" x2="17" y2="15" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best Travel Card for Japan (2026): Fees and ATM Limits Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/wise-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Wise Card in Japan (2026): ATM Fees, Free Limits &amp; Which ATMs Take It</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 10h8M8 14h8" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan (2026): Best Ways to Get Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l5-5 4 3 6-7" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget 2026: Trip to Tokyo Japan Cost &amp; How Much Things Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <line x1="9" y1="3" x2="9" y2="10" />
                  <line x1="15" y1="3" x2="15" y2="10" />
                  <circle cx="8.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
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
      </div>
    </>
  );
}
