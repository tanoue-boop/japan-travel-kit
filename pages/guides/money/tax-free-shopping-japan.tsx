import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import {
  osakaPrivateWalkingTour,
  osakaSkyVistaHalfDayBusTour,
  shoppingDistrictStayAreas,
  taxFreeAirportRunPrep,
  taxFreeTripPrep,
  tokyoPrivateShoppingTour,
  tokyoSightseeingBusTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { wiseLink, WISE_REL, WISE_CARD_URL, WISE_VERIFIED } from "../../../lib/wise-links";

const WISE_URL = wiseLink("tax-free-shopping-japan", WISE_CARD_URL);

/**
 * The date every figure and rule on this page was last read off its primary source.
 *
 * Sources, all official: the National Tax Agency (nta.go.jp) for the tax rates
 * (No.6303) and for who counts as an eligible purchaser (No.6559); the Japan
 * Tourism Agency's consumption-tax-free shop site (mlit.go.jp/kankocho/tax-free)
 * for the traveller-facing procedure, including its English traveller page and
 * refund-method FAQ; and the Ministry of Finance's FY2025 tax reform outline
 * (mof.go.jp) for what the 1 November 2026 change abolishes.
 *
 * Nothing on this page is written from experience. Where a figure could not be
 * found on one of those sources it is not stated at all.
 */
const OFFICIAL_CHECKED = "21 Oct 2026";

/** The day the refund method starts applying — by purchase date, not travel date. */
const REFUND_START = "1 November 2026";

/**
 * The seven airports where the Japan Tourism Agency's refund-method FAQ says the
 * customs confirmation can be done online through Visit Japan Web instead of at a
 * terminal, inside the departure lobby's dedicated wireless area.
 */
const VJW_AIRPORTS = "Narita, Haneda, Kansai, Chubu, Fukuoka, New Chitose and Naha";

const changeRows = [
  {
    thing: "What you pay in the shop",
    before: "The tax-free price — the 10% (or 8%) comes off at the till",
    after: "The full tax-inclusive price, the same as a Japanese shopper",
  },
  {
    thing: "How you get the tax back",
    before: "You never pay it, so there is nothing to get back",
    after: "The shop refunds it after customs confirms you are taking the goods out",
  },
  {
    thing: "What you do at the airport",
    before: "Nothing, unless customs stops you for an inspection",
    after: "Show your passport at a tax-free procedure terminal before you check your bags",
  },
  {
    thing: "Deadline",
    before: "No fixed deadline on the purchase itself",
    after: "Customs confirmation within 90 days of the purchase date",
  },
  {
    thing: "Food, drink, cosmetics, medicine",
    before: "Sealed by the shop in special packaging you must not open",
    after: "Special packaging abolished — but using them in Japan still voids the refund",
  },
  {
    thing: "Upper limit",
    before: "¥500,000 per shop per day on consumables",
    after: "Abolished, along with the general-goods / consumables split itself",
  },
];

const conditionRows = [
  {
    condition: "Minimum spend",
    detail: "¥5,000 or more before tax, totalled per shop and per day. Separate shops and separate days do not add up.",
  },
  {
    condition: "Who you have to be",
    detail:
      "A non-resident: a foreign national on short-stay, diplomatic or official status, or a Japanese national who has lived outside Japan continuously for two years or more.",
  },
  {
    condition: "What you show",
    detail: "Your actual passport, at the shop and again at the airport. A photo or a photocopy is not accepted.",
  },
  {
    condition: "What is excluded",
    detail: "Gold and platinum bullion, and anything already exempt from consumption tax.",
  },
  {
    condition: "How much you can buy",
    detail: "Only what you can personally carry out of Japan — the goods have to be with you at the terminal.",
  },
  {
    condition: "Deadline to leave",
    detail: "Customs confirmation within 90 days of the purchase date, for anything bought from 1 November 2026.",
  },
  {
    condition: "Using the goods",
    detail: "Not in Japan. Eat the snacks or open the cosmetics and that purchase record no longer qualifies.",
  },
  {
    condition: "Posting things home",
    detail: "Not by yourself — sending your own tax-free goods home as mail or a parcel was abolished on 31 March 2025.",
  },
];

const taxFreeStores = [
  {
    type: "Department stores",
    examples: "Isetan, Takashimaya, Mitsukoshi, Matsuya, Daimaru",
    howItWorks: "One tax-free desk for the whole building, usually on an upper or basement floor. Keep every receipt from that store that day — they are totalled together.",
  },
  {
    type: "Electronics",
    examples: "Yodobashi Camera, Bic Camera, the Akihabara chains",
    howItWorks: "Dedicated multilingual counters, and the category where 10% on one purchase is worth the most.",
  },
  {
    type: "Discount and variety",
    examples: "Don Quijote",
    howItWorks: "Don Quijote's own English site states that its stores handle tax-free sales and have in-store tax-free counters (donki.com, checked " + OFFICIAL_CHECKED + ").",
  },
  {
    type: "Drugstores",
    examples: "Matsumoto Kiyoshi, Sundrug and similar chains in tourist districts",
    howItWorks: "Cosmetics and medicine. From 1 November 2026 the shop no longer has to seal them in special packaging — but you still cannot use them here.",
  },
  {
    type: "Fashion",
    examples: "Large branches of the chains in Shinjuku, Shibuya, Ginza, Namba and Shinsaibashi",
    howItWorks: "Often handled at the ordinary register rather than a separate desk. Coverage is per branch, not per brand.",
  },
];

const eligibleItems = [
  {
    category: "Electronics and cameras",
    notes: "No category restriction and no upper limit from 1 November 2026, so a single large purchase is the simplest way to clear ¥5,000.",
  },
  {
    category: "Clothing, bags and shoes",
    notes: "Any combination reaching ¥5,000 before tax in one shop on one day. Do not wear the shoes before you fly.",
  },
  {
    category: "Cosmetics and medicine",
    notes: "Eligible, and from 1 November 2026 they no longer have to be sealed in the shop's special packaging. Opening and using them in Japan still voids the refund.",
  },
  {
    category: "Food, snacks and drink",
    notes: "Eligible at the 8% reduced rate. The ¥500,000 consumables cap is abolished from 1 November 2026; eating any of it in Japan is not.",
  },
  {
    category: "Souvenirs and crafts",
    notes: "Ceramics, lacquerware and textiles all qualify. Gold and platinum bullion does not, and never did.",
  },
];

const steps = [
  {
    title: "Find the shop's tax-free desk, or ask at the till",
    desc: "Shops that offer this display the Japan Tax-free Shop symbol mark at the entrance. Coverage is per branch rather than per chain, so a shop in one district may handle it when the same brand in the next does not.",
  },
  {
    title: "Clear ¥5,000 before tax, in that one shop, on that one day",
    desc: "¥5,000 is the floor and it is counted per shop per day. You can combine as many items as you like within one shop on one day; you cannot add two shops together, or two days.",
  },
  {
    title: "Hand over your actual passport",
    desc: "The original, not a photo and not a copy. The procedure has been fully electronic since 1 October 2021 — your purchase record goes to the National Tax Agency's system from the till, so nothing is stapled into your passport any more.",
  },
  {
    title: "Pay — and, from 1 November 2026, register how you want the refund",
    desc: "For purchases from that date you pay the tax-inclusive price and the shop sets up the refund: bank transfer, a credit-card refund, an app, or cash at the departure port. Which of those you get is the shop's choice, so ask before you pay.",
  },
  {
    title: "Do the customs confirmation before you check your bags",
    desc: "At the airport, show your passport at a tax-free procedure terminal in the international departure lobby, with the goods still in your hand luggage. Within 90 days of the purchase date. After bag drop is too late.",
  },
  {
    title: "The refund arrives once customs has confirmed the goods",
    desc: "Nothing is refunded before that confirmation. Japan's consumption tax law sets no rule for how or when the shop pays it out, which is the reason the method varies from shop to shop.",
  },
];

const rules = [
  {
    title: "The confirmation is judged per receipt, not per item",
    desc: "If one item from a purchase record is missing — eaten, used, already posted home — the whole of that record loses the exemption, not just that item. The Japan Tourism Agency's own FAQ states this outright.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="16" x2="13" y2="16" />
      </svg>
    ),
  },
  {
    title: "Do not use tax-free goods in Japan",
    desc: "The exemption exists because the goods are leaving. The special sealed packaging on consumables goes away on 1 November 2026, but the rule behind it does not: if you have used any of it, tell a customs officer rather than using the terminal.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  {
    title: "Always carry your passport",
    desc: "A tax-free sale needs your original passport in the shop. A photo on your phone is not accepted, and there is no way to claim the exemption afterwards on a purchase that was rung up at the full price.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="10" r="3" />
        <path d="M6 18a6 6 0 0 1 12 0" />
      </svg>
    ),
  },
  {
    title: "Keep the goods in your hand luggage on the way out",
    desc: "The terminals sit in the departure lobby before bag drop, and you have to have the goods with you. Pack anything you claimed on into your carry-on, and leave time in case the screen comes back red and customs wants to see it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="7" width="14" height="14" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="12" x2="10" y2="17" />
        <line x1="14" y1="12" x2="14" y2="17" />
      </svg>
    ),
  },
];

const faqItems = [
  {
    q: "How does tax-free shopping work in Japan?",
    a: "Spend ¥5,000 or more before tax in one shop on one day, show your original passport, and Japan's consumption tax — 10%, or 8% on food and non-alcoholic drink — is taken off that purchase. For anything bought from 1 November 2026 you pay the tax-inclusive price in the shop and the shop refunds the tax after you present your passport at a tax-free procedure terminal at the airport and customs confirms the goods are leaving Japan, within 90 days of the purchase date. (National Tax Agency and Japan Tourism Agency, checked 21 Oct 2026.)",
  },
  {
    q: "What is the minimum purchase for tax-free shopping in Japan?",
    a: "¥5,000 before tax, per shop, per day. The Japan Tourism Agency states the threshold as purchases totalling 5,000 yen or more excluding tax at a single store on a single day, so two ¥3,000 purchases in two different shops do not qualify and neither do two ¥3,000 days in the same shop. There is no upper limit for purchases made from 1 November 2026: the ¥500,000 per-shop-per-day cap on consumables is abolished on that date, along with the general-goods and consumables split itself. (Checked 21 Oct 2026.)",
  },
  {
    q: "Can I get a tax refund at the airport in Japan?",
    a: "Yes, and from 1 November 2026 that is the only way it works. You pay the full tax-inclusive price in the shop, then present your passport at a tax-free procedure terminal in the international departure lobby — before you check your bags, with the goods still with you — and the terminal tells you whether customs wants to inspect them. Green means you are done; red means taking the goods to the customs inspection area. The shop pays the refund after that confirmation, by bank transfer, credit card, an app or cash at the departure port, depending on the shop. At Narita, Haneda, Kansai, Chubu, Fukuoka, New Chitose and Naha you can do the confirmation online through Visit Japan Web instead, inside the departure lobby's dedicated wireless area before security. (Japan Tourism Agency, checked 21 Oct 2026.)",
  },
  {
    q: "Who qualifies for tax-free shopping in Japan?",
    a: "Non-residents. In practice that means a foreign national in Japan on short-stay, diplomatic or official status, or a Japanese national who has lived outside Japan continuously for two years or more and can document it with a residence certificate, a family-register attachment or a My Number card showing the move abroad. Anything bought for business or for resale does not qualify, whoever buys it. (National Tax Agency No.6559, checked 21 Oct 2026.)",
  },
  {
    q: "Do I still pay the consumption tax in the shop from November 2026?",
    a: "Yes. From 1 November 2026 you pay the same tax-inclusive price as a Japanese shopper and get the tax back afterwards, which is why the change is called the refund method. The date that matters is the purchase date, not your travel date: something bought on 31 October 2026 still comes off at the till, and something bought the next morning does not.",
  },
  {
    q: "How long do I have to take tax-free goods out of Japan?",
    a: "90 days from the purchase date. For purchases made from 1 November 2026 the customs confirmation has to happen within 90 days of the day you bought the goods, so a long stay with early shopping is the one itinerary where this is worth checking. (Japan Tourism Agency, checked 21 Oct 2026.)",
  },
  {
    q: "Can I open or use tax-free purchases in Japan?",
    a: "No. The exemption is conditional on the goods leaving Japan, and from 1 November 2026 the check happens at the airport with the goods in front of you. Consumables no longer have to be sealed in the shop's special packaging from that date, but using them here still voids the refund — and because the confirmation is judged per purchase record, one opened item disqualifies everything on that receipt. If you have used something, say so to a customs officer rather than putting the purchase through a terminal.",
  },
  {
    q: "Is Don Quijote tax-free for tourists?",
    a: "Don Quijote's own English site states that its stores handle tax-free sales and that there are tax-free counters inside the stores (donki.com, checked 21 Oct 2026). The ordinary conditions still apply: ¥5,000 before tax in that branch on that day, your original passport, and — for purchases from 1 November 2026 — the customs confirmation at the airport. Ask at the counter how that branch pays the refund out, because the method is the shop's choice.",
  },
  {
    q: "Do I need to declare tax-free goods at customs?",
    a: "From 1 November 2026, yes — that is the whole procedure. The confirmation at the tax-free procedure terminal is not optional and not automatic: no confirmation means no refund, and goods that were confirmed but not actually exported attract the consumption tax plus a penalty. For purchases up to 31 October 2026 there is nothing you have to do unless customs stops you, because the tax never left your pocket in the first place.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/tax-free-shopping-japan") } });

export default function TaxFreeShoppingJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Tax-Free Shopping in Japan 2026: Rules &amp; Airport Refund | Japan Travel Kit</title>
        <meta
          name="description"
          content="¥5,000 per shop per day, a non-resident passport, and — from 1 November 2026 — a customs terminal before bag drop. The official rules for Japan's new tax-refund method."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tax-Free Shopping in Japan 2026: Rules & Airport Refund | Japan Travel Kit" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" />
        <meta property="og:description" content="¥5,000 per shop per day, a non-resident passport, and — from 1 November 2026 — a customs terminal before bag drop. The official rules for Japan's new tax-refund method." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tax-Free Shopping in Japan 2026: Rules & Airport Refund | Japan Travel Kit" />
        <meta name="twitter:description" content="¥5,000 per shop per day, a non-resident passport, and — from 1 November 2026 — a customs terminal before bag drop. The official rules for Japan's new tax-refund method." />
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
              route: "/guides/money/tax-free-shopping-japan",
              headline: "Tax-Free Shopping in Japan (2026): The ¥5,000 Rule and the New Airport Refund",
              description:
                "Japan's tourist tax exemption: the ¥5,000-per-shop minimum, who counts as a non-resident, and how the refund method that starts on 1 November 2026 works at the airport.",
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
                { "@type": "ListItem", position: 4, name: "Tax-Free Shopping", item: "https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" },
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
          <span className={styles.breadCurrent}>Tax-Free Shopping</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Tax-Free Shopping in Japan (2026):<br />The ¥5,000 Rule and the New Airport Refund
          </h1>
          <p className={styles.heroSubtitle}>
            ¥5,000 before tax in one shop on one day, a non-resident passport, and the 10%
            consumption tax comes back. From {REFUND_START} it comes back at the airport
            rather than at the till.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official sources only", `Covers the ${REFUND_START} change`].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.
            The rules on this page come from the National Tax Agency, the Japan Tourism Agency
            and the Ministry of Finance, and nothing we earn changes them.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>¥5,000 minimum</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>
                Three conditions: ¥5,000 or more before tax in a single shop on a single day,
                a non-resident passport, and the goods leaving Japan with you.
              </strong>{" "}
              What you get back is Japan&apos;s consumption tax — 10%, or 8% on food and
              non-alcoholic drink (National Tax Agency, checked {OFFICIAL_CHECKED}).
              Where you get it back changes on {REFUND_START}: until then it comes off at
              the till, and from that date you pay the tax-inclusive price in the shop and
              the shop refunds the tax after you show your passport at a customs terminal
              in the international departure lobby — before bag drop, within 90 days of the
              purchase date (Japan Tourism Agency, checked {OFFICIAL_CHECKED}).
            </p>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Tax you get back</p>
                <p className={styles.verdictStatValue}>10%, or 8% on food &amp; drink</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Minimum purchase</p>
                <p className={styles.verdictStatValue}>¥5,000 before tax, per shop per day</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Who qualifies</p>
                <p className={styles.verdictStatValue}>Non-residents, on their own passport</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where you claim it</p>
                <p className={styles.verdictStatValue}>From {REFUND_START}: the airport, before bag drop</p>
              </div>
            </div>
          </div>
        </div>

        {/* What changes on 1 November 2026 */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The 2026 change</span>
          <h2 className={styles.sectionTitle}>What Changes on 1 November 2026?</h2>
          <p className={styles.bodyText}>
            Japan is moving from an exemption at the till to a refund at the border. The
            Ministry of Finance&apos;s FY2025 tax reform outline sets the switch for goods
            sold from {REFUND_START}, and what matters for a traveller is that the date
            is tied to the <strong>purchase date</strong>, not the travel date. Buy on
            31 October and the tax never leaves your pocket; buy the next morning and you
            pay it in the shop and claim it back on the way out.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>Bought up to 31 Oct 2026</th>
                    <th>Bought from 1 Nov 2026</th>
                  </tr>
                </thead>
                <tbody>
                  {changeRows.map((row) => (
                    <tr key={row.thing}>
                      <td className={styles.tdProvider}>{row.thing}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.before}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Two things are quietly better under the new system. The ¥500,000 daily cap on
            consumables goes, as does the split between general goods and consumables that
            produced it — so the ¥5,000 floor is now judged on one combined total — and the
            requirement that shops seal food, drink, cosmetics and medicine in special
            packaging goes with it. The requirement that the goods not be for ordinary daily
            use is also abolished. What does <em>not</em> change is the reason behind the
            packaging: the goods have to leave Japan unused.
          </p>
        </section>

        {/* How it works */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step by step</span>
          <h2 className={styles.sectionTitle}>How Does Tax-Free Shopping Work in Japan?</h2>
          <p className={styles.bodyText}>
            Japan charges a 10% consumption tax on most things and 8% on food and
            non-alcoholic drink. Its tourist exemption covers that tax in full on qualifying
            purchases, and the whole procedure fits in six steps.
          </p>
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

        {/* Minimum spend + conditions table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The conditions</span>
          <h2 className={styles.sectionTitle}>What Is the Minimum Purchase for Tax-Free Shopping in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>¥5,000 before tax, per shop, per day.</strong> The Japan Tourism Agency
            puts it as purchases totalling 5,000 yen or more excluding tax at a single store
            on a single day — which is why a ¥3,000 purchase in two different shops gets you
            nothing, and neither does ¥3,000 today and ¥3,000 tomorrow in the same shop. The
            practical consequence is that a tax-free day means fewer, larger stops rather
            than browsing everywhere, and that department stores are easy mode: every
            receipt from the same store on the same day counts toward the one total.
          </p>
          <p className={styles.bodyText}>
            There is no ceiling on purchases made from {REFUND_START}. Every other condition
            is in the table below, and all of it is from the National Tax Agency and the
            Japan Tourism Agency, read {OFFICIAL_CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Condition</th>
                    <th>What it means</th>
                  </tr>
                </thead>
                <tbody>
                  {conditionRows.map((row) => (
                    <tr key={row.condition}>
                      <td className={styles.tdProvider}>{row.condition}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Who qualifies */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Eligibility</span>
          <h2 className={styles.sectionTitle}>Who Qualifies for Tax-Free Shopping in Japan?</h2>
          <p className={styles.bodyText}>
            Non-residents. The National Tax Agency&apos;s own definition has two halves: a
            foreign national holding short-stay, diplomatic or official status under Japan&apos;s
            immigration law, and a Japanese national who has lived outside Japan continuously
            for two years or more. Almost every tourist reading this is in the first group
            simply by virtue of the entry stamp they were given at the airport.
          </p>
          <p className={styles.bodyText}>
            The second group is the one that trips people up. A Japanese passport holder
            living abroad does qualify, but has to prove it — the Agency names a residence
            certificate, a family-register attachment, or a My Number card showing the move
            abroad, created within six months before the most recent entry to Japan. A
            foreign resident of Japan on a work or student visa does not qualify at all,
            whatever passport they hold.
          </p>
          <p className={styles.bodyText}>
            One condition applies to everyone: the purchase has to be for yourself. Anything
            bought for a business, or to resell, is outside the scheme (National Tax Agency
            No.6559, checked {OFFICIAL_CHECKED}).
          </p>
        </section>

        {/* What you can buy */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Eligible items</span>
          <h2 className={styles.sectionTitle}>What Can You Buy Tax-Free?</h2>
          <p className={styles.bodyText}>
            From {REFUND_START} the categories stop mattering: the general-goods and
            consumables split is abolished, so everything in one shop on one day is totalled
            together against the ¥5,000 floor. The exclusions are narrow — gold and platinum
            bullion, and anything that is already exempt from consumption tax — plus one
            practical limit: you may only buy what you can personally carry out, because the
            goods have to be with you at the terminal on the way out.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibleItems.map((row) => (
                    <tr key={row.category}>
                      <td className={styles.tdProvider}>{row.category}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Where to shop */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Where to go</span>
          <h2 className={styles.sectionTitle}>Where Can You Shop Tax-Free in Japan?</h2>
          <p className={styles.bodyText}>
            At licensed shops, which display the Japan Tax-free Shop symbol mark at the
            entrance. That mark is the only reliable check: the licence belongs to the
            individual shop, not the brand above the door, so a branch in Shinjuku may handle
            it when the same chain two stations away does not. In the big shopping districts —
            Shinjuku, Ginza, Shibuya, Akihabara, Namba, Shinsaibashi, Kyoto&apos;s Shijo —
            coverage at the larger retailers is close to universal.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Store type</th>
                    <th>Examples</th>
                    <th>How it usually works</th>
                  </tr>
                </thead>
                <tbody>
                  {taxFreeStores.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider}>{row.type}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.examples}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.howItWorks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            From {REFUND_START} there is a second thing worth asking at the counter: how that
            shop pays the refund. The law sets no rule for it, so bank transfer, a
            credit-card refund, an app and cash at the departure port are all possible, and
            which one you get is the shop&apos;s decision rather than yours.
          </p>
        </section>

        {/* What you pay to turn home currency into the yen you spend here */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Paying for it</span>
          <h2 className={styles.sectionTitle}>Keeping the Currency Cost Below the Refund</h2>
          <p className={styles.bodyText}>
            The 10% consumption tax is not the only percentage in play on a shopping day. Whatever you spend
            has to become yen first, and an exchange counter takes its cut inside the rate it quotes, where you
            cannot see it. On a day built around clearing the ¥5,000-per-shop threshold several times,
            that is the one cost worth settling before you land.
          </p>
          <p className={styles.bodyText}>
            A multi-currency card is the cheaper route because the pricing is stated rather than hidden. Wise
            says on its pricing page that it uses {WISE_VERIFIED.rateClaim} (checked{" "}
            {WISE_VERIFIED.checkedAt}). For the cash the smaller shops still want, the free ATM allowance
            depends on the country where your account is registered — Wise&apos;s UK card page gives free
            withdrawals up to {WISE_VERIFIED.freeAtmUk}, and {WISE_VERIFIED.overAtmFeeUk} above that allowance
            (checked {WISE_VERIFIED.checkedAt}).
          </p>
          <p className={styles.bodyText}>
            One habit matters whichever card you bring: when a terminal offers to charge you in your home
            currency instead of yen, decline it. That is the merchant&apos;s rate, not your card&apos;s.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <a href={WISE_URL} className={styles.pickCta} target="_blank" rel={WISE_REL}>
              Get a Wise card →
            </a>
            <Link href="/guides/money/currency-exchange-japan" className={styles.pickCtaInternal}>
              Compare every way to get yen →
            </Link>
          </div>
        </section>

        {/* Planning the shopping day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Planning the day</span>
          <h2 className={styles.sectionTitle}>How Should You Plan a Day of Tax-Free Shopping?</h2>
          <p className={styles.bodyText}>
            The ¥5,000-per-shop rule shapes the day more than anything else on this page.
            Two or three large stores beat a dozen small ones, and anything bought under the
            threshold is simply bought at the full price — so it is worth deciding in advance
            which shop the electronics are coming from, and keeping the souvenir run inside a
            single department store rather than spreading it across an arcade.
          </p>
          <p className={styles.bodyText}>
            The second thing the rule shapes is where you sleep. Ginza, Shinjuku and
            Shinsaibashi are the three districts where the big tax-free retailers sit close
            enough together to clear the threshold several times in an afternoon and still
            carry everything back to the room between stops — which matters more than usual
            under the new system, because the goods have to survive unused until you reach
            the airport.
          </p>
          <p className={styles.bodyText}>
            And it is worth being honest that a full day of this is tiring. If the trip has
            one shopping day in it, the half-day sightseeing options below are the normal way
            people split it up — and a guided or chartered day is the one way to do several
            districts without carrying the bags between them.
          </p>
        </section>

        {/* Klook: the shopping day itself — 6.5% band */}
        <KlookTourPicks
          heading="Tours That Fit Around a Shopping Day"
          intro="Both cities have half-day and chartered options that leave the rest of the day for the shops. Listings confirmed live on Klook; prices and availability are Klook's."
          tours={[tokyoPrivateShoppingTour, tokyoSightseeingBusTour, osakaSkyVistaHalfDayBusTour, osakaPrivateWalkingTour]}
        />

        {/* Klook: hotels in the shopping districts — 6.5% band */}
        <KlookStayAreas
          heading="Where to Stay if the Trip Is Built Around Shopping"
          intro="Four districts where the ¥5,000-per-shop minimum is easy to clear on foot, and where you can drop bags at the hotel between stops rather than carrying them all day."
          areas={shoppingDistrictStayAreas}
        />

        {/* Klook: eSIM + subway — the two things worth having before the shopping day */}
        <KlookTripPrep
          heading="Worth Booking Before You Shop"
          intro="Two things that are cheaper or simply easier to sort out before you fly than from the arrivals hall:"
          items={taxFreeTripPrep}
        />

        {/* The airport procedure */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>At the airport</span>
          <h2 className={styles.sectionTitle}>Can I Get a Tax Refund at the Airport in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Yes — and from {REFUND_START} that is the only way it works.</strong> For
            anything bought from that date, the sequence at the airport is: go to a tax-free
            procedure terminal in the international departure lobby, with the goods still with
            you, and present your passport. The screen then tells you whether customs wants to
            see the goods. Green and you are finished; red and you take them to the customs
            inspection area. The shop pays the refund once that confirmation exists, and not
            before.
          </p>
          <p className={styles.bodyText}>
            Three details decide whether this goes smoothly. First, <strong>the terminals sit
            before bag drop</strong> — once a suitcase is checked in you cannot show what is
            inside it, and the Japan Tourism Agency&apos;s FAQ is explicit that you cannot get
            it back for this. Pack anything you claimed on into hand luggage. Second, the
            confirmation is judged <strong>per purchase record</strong>: one missing item from
            a receipt disqualifies everything on that receipt, not just the item. Third, the
            terminal itself takes seconds, but a red result does not — leave slack on a
            shopping-heavy departure.
          </p>
          <p className={styles.bodyText}>
            At {VJW_AIRPORTS} there is an alternative: the same confirmation can be done
            online through Visit Japan Web, from inside the departure lobby&apos;s dedicated
            wireless area, any time before the security checkpoint. That needs a working
            connection on your phone and a few minutes you are not spending in a queue
            (Japan Tourism Agency, checked {OFFICIAL_CHECKED}).
          </p>
          <p className={styles.bodyText}>
            One route that used to exist no longer does: posting your own tax-free purchases
            home as mail or a parcel was abolished on 31 March 2025. Shipping arranged by the
            shop itself may still be available — ask in the shop, not at the airport.
          </p>
        </section>

        {/* Departure day transport — 5% band, next to the paragraph that needs it */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Departure day</span>
          <h2 className={styles.sectionTitle}>Getting to the Airport With More Bags Than You Arrived With</h2>
          <p className={styles.bodyText}>
            The refund procedure has one knock-on effect people do not plan for: you have to
            arrive at the airport with the goods in hand, with enough time for a possible
            inspection, carrying noticeably more than you did on the way in. That makes the
            trip out to the airport a different problem from the trip in — a reserved seat
            with somewhere to put luggage, or a bus that takes cases into the hold, is worth
            more than the fastest connection with two changes.
          </p>
        </section>

        <KlookTripPrep
          label="Departure day"
          heading="Booked Seats Out to the Airport"
          intro="The airport runs from the two cities this guide's shopping districts sit in, as a seat you have already paid for rather than a rush-hour local:"
          items={taxFreeAirportRunPrep}
        />

        {/* Important Rules */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Important rules</span>
          <h2 className={styles.sectionTitle}>Important Rules to Know</h2>
          <div className={styles.whoForGrid}>
            {rules.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
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

        {/* Sources */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Sources</span>
          <h2 className={styles.sectionTitle}>Where These Figures Come From</h2>
          <p className={styles.bodyText}>
            Every rate, threshold and deadline on this page was read off a primary official
            source on {OFFICIAL_CHECKED}: the <strong>National Tax Agency</strong> for the
            consumption tax rates and for the definition of an eligible purchaser, the{" "}
            <strong>Japan Tourism Agency&apos;s consumption-tax-free shop site</strong> —
            including its English traveller page and its refund-method FAQ — for the ¥5,000
            threshold and the procedure at the airport, and the{" "}
            <strong>Ministry of Finance&apos;s FY2025 tax reform outline</strong> for what the{" "}
            {REFUND_START} switch abolishes. Anything we could not confirm on one of those is
            not on this page. Shop-level details — whether a particular branch is licensed,
            and how it pays a refund out — are the shop&apos;s to state, not ours.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/money/cash-vs-card-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Cash vs Card in Japan (2026): Where Cards Work and Where You Need Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/japan-travel-budget" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Travel Budget 2026: Trip to Tokyo Japan Cost &amp; How Much Things Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/currency-exchange-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="2" y1="20" x2="2" y2="16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Currency Exchange in Japan (2026): Best Ways to Get Yen</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9 1.7l4.6 3.1-2 3.6-2.6.3a.8.8 0 0 0-.4 1.4l3.1 2.2 2.2 3.1a.8.8 0 0 0 1.4-.4l.3-2.6 3.6-2 3.1 4.6a1 1 0 0 0 1.7-.9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
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
            <h2 className={styles.ctaBannerTitle}>Make the most of your yen</h2>
            <p className={styles.ctaBannerDesc}>
              From tax-free shopping to ATMs and currency exchange — our money guides
              help you spend smarter in Japan.
            </p>
            <Link href="/guides/money" className={styles.ctaBannerBtn}>
              View All Money Guides →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
