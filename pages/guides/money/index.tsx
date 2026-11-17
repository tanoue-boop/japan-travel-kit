import Head from "next/head";
import Link from "next/link";
import type { ReactNode } from "react";
import GuideHub from "../../../components/GuideHub";
import KlookTripPrep from "../../../components/KlookTripPrep";
import PartnerPick, { PartnerTextLink } from "../../../components/PartnerPick";
import { moneyArticles, moneyCategory } from "../../../lib/guides-money";
import { moneyHubPrepaid, tokyoSubwayTicket } from "../../../lib/klook-links";
import { WISE_CARD_URL, wiseLink } from "../../../lib/wise-links";
import { articleDates, pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd, hubItemListJsonLd } from "../../../lib/structured-data";
import styles from "../../../styles/BestEsimJapan.module.css";

const ROUTE = "/guides/money";

export const getStaticProps = () => ({
  props: { updated: pageUpdated(ROUTE), dates: articleDates(moneyArticles.map((a) => a.href)) },
});

const SAFETYWING_URL = "https://safetywing.com/nomad-insurance?referenceID=26614156&utm_source=26614156&utm_medium=Ambassador";
const WISE_CARD_CTA = wiseLink("guides-money-hub", WISE_CARD_URL);

const L = { color: "var(--text)", fontWeight: 600 } as const;
const muted = { marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" } as const;
const td = { fontSize: "0.82rem", color: "var(--text)" } as const;

// task-jtk-20261117-R08: the hub answers "money in Japan — cash or card, where to get yen,
// how much a day, and the insurance question". Title ≤ 60 characters without the
// site-name suffix. Every figure is either re-read on the official site on 17 Nov 2026
// or carried, with its own date, from the guide the row links to.
const TITLE = "Money in Japan 2026: Cash, Cards, ATMs & Travel Insurance";
const H1 = "Money in Japan 2026: Cash or Card, ATMs and Travel Insurance";
const DESC =
  "Money in Japan 2026: Japan cash or card? Pay by card, carry ¥2,000–¥8,000 a day in cash, withdraw up to ¥100,000 at 7-Eleven. Fees, tax-free, insurance.";

/**
 * Sources, and the date each was read:
 *   - sevenbank.co.jp/intlcard/ , /intlcard/card.html , /intlcard/service.html — 28,000+
 *     ATMs, ¥100,000 per withdrawal (¥30,000 on a magnetic stripe), fee "differs by the
 *     brand of the overseas card" with no amount published. Re-read 17 Nov 2026.
 *   - jp-bank.japanpost.jp/en/ias/en_ias_index.html — ¥220 (tax included) per use for
 *     certain overseas cards, ¥50,000 per transaction, post-office ATMs Mon–Sat
 *     7:00–23:00. Re-read 17 Nov 2026.
 *   - wise.com/gb/pricing/card-fees and /us/pricing/card-fees — 250 GBP / 250 USD of ATM
 *     withdrawals free a month, then 2.69% (UK) or 1.95 USD + 1.95% (US). Re-read 17 Nov 2026.
 *   - mlit.go.jp/kankocho/tax-free/page01_000001_00028.html — purchases on or after
 *     1 November 2026 are paid tax-inclusive and refunded after customs confirmation at
 *     departure, within 90 days of purchase; ¥5,000 or more (excluding tax) per day at the
 *     same store. Re-read 17 Nov 2026.
 *   - jnto.go.jp/emergency/eng/mi_guide.html — hospital cases of ¥7.5 million and
 *     ¥10,000,000. Re-read 17 Nov 2026.
 *   - japan.travel/en/plan/ic-card/ — most IC cards take a ¥500 deposit; Welcome Suica and
 *     TOURIST PASMO none. Re-read 17 Nov 2026.
 *   - tokyometro.jp/lang_en/news/223896.html — eleven Kanto operators share the Tap to
 *     Ride contactless service from 25 March 2026. Re-read 17 Nov 2026.
 *   - METI cashless ratio 58.0% for 2025, published 31 March 2026 (cash-vs-card-japan,
 *     read 27 Oct 2026). Cash float, budget and insurance prices are the dated figures on
 *     how-much-yen-to-bring-japan, japan-travel-budget and best-travel-insurance-japan.
 */
const CHECKED = "2026-11-17";

type PayRow = {
  method: string;
  where: string;
  fee: string;
  pick: string;
  source: { href: string; label: string; checked: string };
};

const payRows: PayRow[] = [
  {
    method: "Visa / Mastercard (credit or debit)",
    where: "Convenience stores (7-Eleven lists credit, brand debit and prepaid), hotels, chain restaurants, Tokyo taxis",
    fee: "Your card issuer's foreign transaction fee; Wise converts at the mid-market rate with a fee from 0.24%",
    pick: "Main way to pay. Always choose to be charged in yen (JPY)",
    source: { href: "https://wise.com/gb/pricing/card-fees", label: "wise.com", checked: "2026-11-10" },
  },
  {
    method: "Contactless tap (card or phone)",
    where: "Shops with a tap reader; ticket gates of the eleven Kanto rail operators in Tap to Ride (Tokyo Metro among them, JR East not)",
    fee: "Same as the card",
    pick: "Fine for single rides; an IC card still covers more lines and buses",
    source: { href: "https://www.tokyometro.jp/lang_en/news/223896.html", label: "tokyometro.jp", checked: CHECKED },
  },
  {
    method: "IC card (Suica, PASMO, ICOCA)",
    where: "Trains, subways, city buses, convenience stores, vending machines",
    fee: "¥500 deposit on most cards; none on Welcome Suica, TOURIST PASMO or a phone wallet",
    pick: "Get one on day one for transit",
    source: { href: "https://www.japan.travel/en/plan/ic-card/", label: "japan.travel", checked: CHECKED },
  },
  {
    method: "Cash (yen)",
    where: "Some temple admissions, market stalls and small shops, local buses outside the city tap schemes, coin lockers",
    fee: "None to spend; the cost is in getting it (rows below)",
    pick: "Carry a float of ¥2,000–¥3,000 a day on a budget, ¥5,000–¥8,000 if you eat out",
    source: { href: "https://www.japan.travel/en/plan/currency/", label: "japan.travel", checked: "2026-10-29" },
  },
  {
    method: "7-Eleven ATM (Seven Bank)",
    where: "28,000+ machines in 7-Eleven stores; Visa and Mastercard 00:00–24:00",
    fee: "Varies by card brand; Seven Bank publishes no amount. Limit ¥100,000 per withdrawal (¥30,000 magnetic stripe)",
    pick: "First choice for yen",
    source: { href: "https://www.sevenbank.co.jp/intlcard/", label: "sevenbank.co.jp", checked: CHECKED },
  },
  {
    method: "Japan Post Bank ATM",
    where: "Post offices (Mon–Sat 7:00–23:00, Sun and holidays 7:00–21:00)",
    fee: "¥220 (tax included) per use may apply for certain cards issued abroad; ¥50,000 per transaction",
    pick: "Back-up when no 7-Eleven is near",
    source: { href: "https://www.jp-bank.japanpost.jp/en/ias/en_ias_index.html", label: "jp-bank.japanpost.jp", checked: CHECKED },
  },
  {
    method: "Wise card at an ATM",
    where: "Seven Bank and Japan Post Bank ATMs",
    fee: "No Wise fee on the first 250 GBP / 250 USD a month; then 2.69% (UK) or 1.95 USD + 1.95% (US), plus any ATM fee",
    pick: "Low-cost way to withdraw if your account is in the UK, EU, US or Australia",
    source: { href: "https://wise.com/gb/pricing/card-fees", label: "wise.com", checked: CHECKED },
  },
];

type GoalRow = { goal: string; answer: string; guide: ReactNode };

const goalRows: GoalRow[] = [
  {
    goal: "How much cash to carry",
    answer: "¥10,000–¥20,000 on arrival, then ¥2,000–¥8,000 a day",
    guide: <Link href="/guides/money/how-much-yen-to-bring-japan" style={L}>How much yen to bring</Link>,
  },
  {
    goal: "Where to withdraw yen",
    answer: "7-Eleven (¥100,000 per withdrawal) or a post office (¥50,000)",
    guide: <Link href="/guides/money/atms-in-japan" style={L}>ATMs in Japan</Link>,
  },
  {
    goal: "Cash or card, place by place",
    answer: "Cashless was 58.0% of Japanese consumer spending in 2025 (METI)",
    guide: <Link href="/guides/money/cash-vs-card-japan" style={L}>Cash vs card in Japan</Link>,
  },
  {
    goal: "Which card to bring",
    answer: "A multi-currency debit card such as Wise, plus a no-FX-fee credit card",
    guide: <Link href="/guides/money/best-travel-card-japan" style={L}>Best travel card for Japan</Link>,
  },
  {
    goal: "Wise or Revolut",
    answer: "Free ATM allowances and Revolut's weekend markup side by side",
    guide: <Link href="/guides/money/wise-vs-revolut-japan" style={L}>Wise vs Revolut</Link>,
  },
  {
    goal: "Tax-free shopping",
    answer: "Since 1 Nov 2026: pay the tax, get it back after customs at departure; ¥5,000+ per store per day",
    guide: <Link href="/guides/money/tax-free-shopping-japan" style={L}>Japan tax free shopping</Link>,
  },
  {
    goal: "Daily budget",
    answer: "About ¥14,030–¥20,540 a day on a standard budget, room included",
    guide: <Link href="/guides/money/japan-travel-budget" style={L}>Japan travel budget</Link>,
  },
  {
    goal: "Do I need travel insurance?",
    answer: "Not for entry; JNTO cites a ¥10,000,000 hospital case",
    guide: <Link href="/guides/money/japan-travel-insurance" style={L}>Japan travel insurance</Link>,
  },
  {
    goal: "Which insurance to buy",
    answer: "SafetyWing Essential from US$31.36 for two weeks (age 10–39)",
    guide: <Link href="/guides/money/best-travel-insurance-japan" style={L}>Best travel insurance for Japan</Link>,
  },
];

const faqItems = [
  {
    q: "Do I need cash in Japan?",
    a: "Yes, a little. Cards now cover most spending — METI put Japan's cashless ratio at 58.0% for 2025 — but temple admissions, market stalls, small restaurants and rural buses still often take cash only. A float of ¥2,000–¥3,000 a day on a budget trip, or ¥5,000–¥8,000 if you eat out, is enough, with ¥10,000–¥20,000 on arrival.",
  },
  {
    q: "Which card is best for Japan?",
    a: "For most visitors, a multi-currency debit card such as Wise: it converts at the mid-market rate with a fee from 0.24% and works at 7-Eleven and Japan Post Bank ATMs, with no Wise fee on the first 250 GBP or 250 USD of withdrawals a month (wise.com, read 17 Nov 2026). Add a credit card with no foreign transaction fee for hotels, and always pay in yen rather than your home currency.",
  },
  {
    q: "Where can I withdraw yen in Japan?",
    a: "At a 7-Eleven: Seven Bank runs 28,000+ ATMs that take Visa, Mastercard, UnionPay, JCB, American Express and others issued abroad, up to ¥100,000 per withdrawal. Japan Post Bank ATMs at post offices allow ¥50,000 per transaction and state a ¥220 fee per use for certain overseas cards. Both re-read on the official sites on 17 Nov 2026.",
  },
  {
    q: "How much money do I need per day in Japan?",
    a: "About ¥14,030–¥20,540 per person per day on a standard budget, with the room, three meals, city transport and one paid sight included; long-distance trains are extra (Tokyo to Kyoto is ¥13,970 one way on a reserved Nozomi). Only ¥2,000–¥8,000 of that needs to be cash.",
  },
  {
    q: "Do I need travel insurance for Japan?",
    a: "It is not an entry requirement for tourists, but JNTO lists hospital cases of ¥7.5 million and ¥10,000,000 for treatment plus the flight home. A policy that pays medical bills and evacuation is the part worth buying; SafetyWing Essential is US$31.36 for two weeks at ages 10–39 (read 11 Nov 2026).",
  },
];

export default function GuidesMoneyPage({ updated, dates }: { updated: PageUpdated; dates: Record<string, string> }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="robots" content="index, follow" />
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
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: hubItemListJsonLd(moneyCategory, DESC) }}
        />
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: H1, description: DESC, updated }) }}
        />
      </Head>

      <GuideHub
        category={moneyCategory}
        heading={H1}
        heroDesc="Money in Japan, in one place: when you still need cash, which card to bring, where to withdraw yen, how tax-free works since November 2026, and whether to insure the trip."
        dates={dates}
        lead={
          <>
            <section className={styles.bodySection} style={{ marginBottom: "2rem" }}>
              <p className={styles.bodyText}>
                <strong>
                  In Japan, pay by card and carry a small cash float: about ¥2,000–¥3,000 a day on a budget trip and
                  ¥5,000–¥8,000 if you eat out, for temples, market stalls and rural buses.
                </strong>{" "}
                Cashless payments were <strong>58.0%</strong> of Japanese consumer spending in 2025 (METI), and the
                cheapest yen comes from a <strong>7-Eleven ATM</strong> — 28,000+ machines, up to{" "}
                <strong>¥100,000</strong> per withdrawal — on a card such as Wise with no fee on the first 250 GBP or
                250 USD a month; Japan Post Bank ATMs add <strong>¥220</strong> per use for certain overseas cards. Since{" "}
                <strong>1 November 2026</strong>, tax-free shopping is a refund: you pay the 10% in the shop and get it
                back after the customs check at departure, on purchases of ¥5,000 or more per store per day.
              </p>
              <p className={styles.bodyText} style={{ fontSize: "0.84rem", color: "var(--text-muted)" }}>
                Seven Bank, Japan Post Bank, Wise and the Japan Tourism Agency&apos;s tax-free page re-read on the official
                sites on {CHECKED}; the cash float is the dated figure on our{" "}
                <Link href="/guides/money/how-much-yen-to-bring-japan" style={L}>how much yen to bring</Link> guide.
              </p>
            </section>
            <KlookTripPrep
              label="Pay before you arrive"
              heading="What you can pay for before you land"
              intro="Each of these is a yen cost that would otherwise come out of the cash float or a foreign-card charge on day one. Booked at home, it goes on your card in your own currency."
              items={moneyHubPrepaid}
            />
          </>
        }
        groupLeads={{
          cards: (
            <>
              One card does most of the work; the{" "}
              <Link href="/guides/money/best-travel-card-japan" style={L}>best travel card for Japan</Link> guide picks it
              by the country your account is in, and{" "}
              <Link href="/guides/money/wise-vs-revolut-japan" style={L}>Wise vs Revolut</Link> settles the usual
              shortlist.
            </>
          ),
          cash: (
            <>
              Start with{" "}
              <Link href="/guides/money/how-much-yen-to-bring-japan" style={L}>how much yen to bring</Link>, then the{" "}
              <Link href="/guides/money/atms-in-japan" style={L}>ATMs in Japan</Link> guide for the five networks that take
              a foreign card.
            </>
          ),
          paying: (
            <>
              The rule that changed this month is in{" "}
              <Link href="/guides/money/tax-free-shopping-japan" style={L}>Japan tax free shopping</Link>; which tap
              opens which gate is in{" "}
              <Link href="/guides/money/contactless-payment-japan" style={L}>contactless payment in Japan</Link>.
            </>
          ),
          planning: (
            <>
              The per-day total is in the{" "}
              <Link href="/guides/money/japan-travel-budget" style={L}>Japan travel budget</Link>; whether to insure is in{" "}
              <Link href="/guides/money/japan-travel-insurance" style={L}>do you need travel insurance for Japan</Link>, and
              which policy in{" "}
              <Link href="/guides/money/best-travel-insurance-japan" style={L}>best travel insurance for Japan</Link>.
            </>
          ),
        }}
        picks={
          <>
            <PartnerPick
              label="Before you fly"
              heading="Sort the card, the cover and the first train"
              cta={{ href: WISE_CARD_CTA, label: "Get a Wise card before you fly →" }}
            >
              The <PartnerTextLink href={WISE_CARD_CTA}>Wise card</PartnerTextLink> is the one to order early, because the
              physical card has to reach you before you leave; our{" "}
              <Link href="/guides/money/wise-card-japan" style={L}>Wise card Japan guide</Link>{" "}
              lists the free ATM allowance for each card-issuing country and which Japanese ATMs take it, and the{" "}
              <Link href="/guides/money/atms-in-japan" style={L}>ATMs in Japan guide</Link>{" "}
              sets out the 7-Eleven and Japan Post Bank fees, hours and limits for foreign cards. For medical cover,{" "}
              <PartnerTextLink href={SAFETYWING_URL}>SafetyWing</PartnerTextLink> publishes its price and can be bought
              before you leave or while already abroad. Japan does not make it an entry requirement for tourists, and{" "}
              <Link href="/guides/money/japan-travel-insurance" style={L}>do you need travel insurance for Japan</Link>{" "}
              sets out what an uninsured hospital bill can reach; our{" "}
              <Link href="/guides/money/best-travel-insurance-japan" style={L}>travel insurance comparison</Link> sets it against
              the alternatives. And buying the{" "}
              <PartnerTextLink href={tokyoSubwayTicket.url}>Tokyo Subway Ticket</PartnerTextLink> up front on Klook
              settles the transport cost that is hardest to put on a foreign card once you arrive. Outside Tokyo, the{" "}
              <Link href="/guides/attractions/hakone-free-pass" style={L}>Hakone Free Pass</Link> and the{" "}
              <Link href="/guides/attractions/kansai-area-pass" style={L}>JR Kansai Area Pass</Link> do the same job, and the{" "}
              <Link href="/guides/esim/cheapest-esim-japan" style={L}>cheapest eSIM for Japan</Link> keeps your banking apps online. If the trip includes a shopping day, note that from 1 November 2026{" "}
              <Link href="/guides/money/tax-free-shopping-japan" style={L}>Japan tax free shopping</Link>{" "}
              works as a refund after a customs check at departure, so you pay the 10% up front on your card. One thing
              not to budget for at all is tips: our guide to{" "}
              <Link href="/guides/money/tipping-in-japan" style={L}>tipping in Japan</Link>{" "}
              shows where a service charge or an izakaya otoshi appears instead.
            </PartnerPick>

            {/* Payment table — first row is the conclusion. */}
            <section className={styles.comparisonSection} style={{ marginTop: "2.5rem" }}>
              <span className={styles.sectionLabel}>Cash or card</span>
              <h2 className={styles.sectionTitle}>Japan cash or card: what works where, and what it costs</h2>
              <p className={styles.bodyText}>
                A card pays for most of the trip, an IC card for the trains, and cash for the small places; the cheapest
                cash comes from a 7-Eleven ATM. Each row is one way to pay, with the official page it was read on.
              </p>
              <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Way to pay</th>
                        <th>Where it works</th>
                        <th>Fee / limit</th>
                        <th>Our pick</th>
                        <th>Official source (checked)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.tdProvider} style={{ minWidth: "160px" }}>In short</td>
                        <td style={{ ...td, minWidth: "200px" }}>Card for most places, IC card for transit, cash for the rest</td>
                        <td style={{ ...td, minWidth: "200px" }}>
                          Withdraw at 7-Eleven (¥100,000 a time) on a low-fee card; pay in yen
                        </td>
                        <td style={{ ...td, minWidth: "160px" }}>Card + ¥2,000–¥8,000 a day in cash</td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Rows below</td>
                      </tr>
                      {payRows.map((row) => (
                        <tr key={row.method}>
                          <td className={styles.tdProvider} style={{ minWidth: "160px" }}>{row.method}</td>
                          <td style={{ ...td, minWidth: "200px" }}>{row.where}</td>
                          <td style={{ ...td, minWidth: "200px" }}>{row.fee}</td>
                          <td style={{ ...td, minWidth: "160px" }}>{row.pick}</td>
                          <td style={{ fontSize: "0.82rem", minWidth: "140px" }}>
                            <a href={row.source.href} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>
                              {row.source.label}
                            </a>{" "}
                            <span style={{ color: "var(--text-muted)" }}>({row.source.checked})</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className={styles.bodyText} style={muted}>
                Last checked: {CHECKED}. Official pages: sevenbank.co.jp/intlcard/ · jp-bank.japanpost.jp/en/ias/ ·
                wise.com/gb/pricing/card-fees and wise.com/us/pricing/card-fees · japan.travel/en/plan/ic-card/ ·
                tokyometro.jp (Tap to Ride, 25 March 2026) · mlit.go.jp/kankocho/tax-free (refund method). The 0.24%
                conversion fee is from our best travel card guide (10 Nov 2026) and the cash float from our how-much-yen
                guide (29 Oct 2026). The fee your own bank adds is separate from the ATM&apos;s, and the machine shows its
                own fee on screen before you confirm.
              </p>
            </section>

            {/* Purpose table — first row is the conclusion. */}
            <section className={styles.comparisonSection} style={{ marginTop: "2.5rem" }}>
              <span className={styles.sectionLabel}>Read next</span>
              <h2 className={styles.sectionTitle}>Which money in Japan guide should I read?</h2>
              <p className={styles.bodyText}>
                Pick the question you have; the answer is in the middle column and the detail in the guide.
              </p>
              <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Your question</th>
                        <th>Short answer</th>
                        <th>Read next</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.tdProvider} style={{ minWidth: "170px" }}>In short</td>
                        <td style={{ ...td, minWidth: "260px" }}>
                          Bring a low-fee card, withdraw yen at 7-Eleven, carry a small float, insure the medical side
                        </td>
                        <td style={{ fontSize: "0.82rem", minWidth: "160px" }}>
                          <Link href="/guides/money/cash-vs-card-japan" style={L}>Cash vs card in Japan</Link>
                        </td>
                      </tr>
                      {goalRows.map((row) => (
                        <tr key={row.goal}>
                          <td className={styles.tdProvider} style={{ minWidth: "170px" }}>{row.goal}</td>
                          <td style={{ ...td, minWidth: "260px" }}>{row.answer}</td>
                          <td style={{ fontSize: "0.82rem", minWidth: "160px" }}>{row.guide}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className={styles.bodyText} style={muted}>
                Last checked: {CHECKED} for the ATM, Wise and tax-free rows (sevenbank.co.jp, jp-bank.japanpost.jp,
                wise.com, mlit.go.jp/kankocho/tax-free) and the JNTO hospital case (jnto.go.jp/emergency/eng/mi_guide.html).
                METI&apos;s 58.0% was published on 31 March 2026; the budget and insurance prices carry the date on the
                guide each row links to.
              </p>
            </section>

            {/* Question sections, each answered in the first sentence */}
            <section className={styles.bodySection}>
              <h2 className={styles.sectionTitle}>Do I need cash in Japan?</h2>
              <p className={styles.bodyText}>
                {faqItems[0].a} Place by place, with what each operator says it takes, see{" "}
                <Link href="/guides/money/cash-vs-card-japan" style={L}>cash vs card in Japan</Link>.
              </p>
            </section>
            <section className={styles.bodySection}>
              <h2 className={styles.sectionTitle}>Where can I withdraw yen in Japan?</h2>
              <p className={styles.bodyText}>
                {faqItems[2].a} Hours, limits and the networks in FamilyMart and Lawson are in{" "}
                <Link href="/guides/money/atms-in-japan" style={L}>ATMs in Japan</Link>; to change notes you brought from
                home instead, see{" "}
                <Link href="/guides/money/currency-exchange-japan" style={L}>currency exchange in Japan</Link>.
              </p>
            </section>
            <section className={styles.bodySection}>
              <h2 className={styles.sectionTitle}>Do I need travel insurance for Japan?</h2>
              <p className={styles.bodyText}>
                {faqItems[4].a} Whether you need it, and what to cover, is in{" "}
                <Link href="/guides/money/japan-travel-insurance" style={L}>Japan travel insurance</Link>; which policy to
                buy is in{" "}
                <Link href="/guides/money/best-travel-insurance-japan" style={L}>best travel insurance for Japan</Link>, with{" "}
                <Link href="/guides/money/safetywing-vs-heymondo-japan" style={L}>SafetyWing vs Heymondo</Link> head to
                head. Cover can be bought after departure on{" "}
                <PartnerTextLink href={SAFETYWING_URL}>SafetyWing</PartnerTextLink>, which excludes pre-existing
                conditions, so buy it before you need it.
              </p>
            </section>

            <section className={styles.faqSection} style={{ marginTop: "3rem" }}>
              <span className={styles.sectionLabel}>FAQ</span>
              <h2 className={styles.sectionTitle}>Money in Japan FAQ</h2>
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
          </>
        }
      />
    </>
  );
}
