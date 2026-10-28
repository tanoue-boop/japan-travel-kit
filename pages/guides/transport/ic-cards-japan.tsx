import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  jrPassWholeJapan,
  klookEsim,
  osakaAmazingPass,
  tokyoSubwayTicket,
  naritaExpressRoundTripUrl,
  keiseiSkylinerUrl,
  jrHarukaUrl,
  nankaiRapitUrl,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * Answer-first pass, 28 Oct 2026.
 *
 * Why. "ic cards", "ic card", "what is ic card", "suica card japan" are
 * definition queries: an AI answer finishes them without anyone opening a page.
 * Over the 28 days to 27 October this page took 26 impressions at position 69 for
 * "ic cards", 12 at 71 for "ic card", and single-figure impressions for the long
 * tail, while Bing showed it 16 times at an average position of 6.81 for no clicks
 * at all. A page that only explains what an IC card is has nothing left to earn.
 *
 * So the first paragraph answers the definition outright, and the sections after it
 * are the parts an assistant cannot finish for the reader: which of the six cards to
 * buy, what each one costs to get and to give back, and whether a pass beats tapping.
 * The Klook routes sit at those two decisions — the pass question and the JR Pass
 * question — plus the airport pick-up section, rather than at the top of the page.
 *
 * Everything with a number against it was read off the operator's own page or press
 * release on the date in the constant below. Where nobody publishes a figure, the
 * cell says so. Three things the previous draft asserted turned out to be wrong or
 * out of date and are corrected here:
 *
 *   1. "Pasmo: Android only" for the mobile version. Apple Pay PASMO exists, and
 *      Apple's own documentation lists Suica, PASMO, ICOCA and TOICA in Wallet;
 *      meanwhile Mobile PASMO for Android needs a FeliCa handset bought in Japan,
 *      which is the restriction that actually matters to a visitor.
 *   2. PASMO PASSPORT, which PASMO sold out and discontinued. Its replacement,
 *      TOURIST PASMO, launched in May 2026 and is a different product with
 *      different prices.
 *   3. The ¥2,000-in-the-machine instruction, which is JR West's published ICOCA
 *      example rather than a universal rule — Suica, PASMO and the visitor cards
 *      are each sold in their own denominations.
 */

/** The day every operator figure on this page was read. */
const CHECKED_ISO = "2026-10-28";
const CHECKED = checkedLabel(CHECKED_ISO);

/**
 * JR Pass prices come from our own JR Pass guide, which read the JR Group's price
 * table on this date. A second constant rather than a re-stamp: those figures did
 * not get a fresh check today and should not claim one.
 */
const PASS_CHECKED = checkedLabel("2026-10-26");

/** Osaka Metro and Osaka Amazing Pass prices, from our Osaka pass guide. */
const OSAKA_CHECKED = checkedLabel("2026-10-20");

/**
 * The card-by-card table — the one an assistant can lift whole, which is why every
 * row carries the operator that publishes it.
 *
 * Sources, all read on 28 October 2026: JR East's Suica pages (deposit, the ¥220
 * refund fee, the ten-year rule); the PASMO agreement and visitor pages (the ¥1,000
 * sale price including the ¥500 deposit, the ¥220 handling fee, the ¥20,000 cap);
 * JR West's ICOCA page (¥2,000 including the ¥500 deposit, the ¥220 commission, the
 * ¥20,000 cap); JR East's Welcome Suica pages (no deposit, 28 days, no refund); and
 * the PASMO Committee's 17 April 2026 press release for TOURIST PASMO. The Apple
 * Wallet row is Apple's own support documentation.
 */
const cardRows = [
  {
    card: "Suica",
    sub: "JR East",
    buy: "Ticket machines at JR East stations in the Suica area. Unregistered and registered (My Suica) cards both went back on sale on 1 March 2025 after the chip shortage.",
    deposit: "¥500, inside the purchase price",
    refund: "Deposit back plus the balance less a ¥220 handling fee at a JR East ticket office; with a balance under ¥220 you still get the ¥500 back",
    valid: "No expiry date, but a card unused for 10 years becomes invalid",
    where: "Every area of the ten mutually usable transit IC cards",
  },
  {
    card: "PASMO",
    sub: "PASMO Co. — Tokyo Metro, Toei, private rail and bus",
    buy: "Ticket machines and ticket counters of PASMO Committee operators; sale points differ by operator. Unregistered cards resumed on 1 March 2025.",
    deposit: "¥500 — the sale price is ¥1,000 including it",
    refund: "¥220 handling fee per card (or the balance, if it is smaller), and the ¥500 deposit back",
    valid: "No expiry published on the pages read",
    where: "Same nationwide network; top-ups stop at ¥20,000 (¥10,001 on a bus)",
  },
  {
    card: "ICOCA",
    sub: "JR West",
    buy: "JR West ticket machines and Midori-no-madoguchi offices in the ICOCA area — JR West names the Kansai-Airport Station office for arrivals",
    deposit: "¥500, inside a ¥2,000 purchase that leaves ¥1,500 to spend",
    refund: "¥500 deposit back at a JR ticket office in the area; any balance comes back too, less a ¥220 commission",
    valid: "No expiry published on the pages read",
    where: "“All across Japan on railways and buses, and at stores displaying the IC or ICOCA mark”",
  },
  {
    card: "Welcome Suica",
    sub: "JR East, visitors only",
    buy: "Welcome Suica vending machines at Narita Terminal 1, Narita Terminal 2·3 and Haneda Terminal 3 stations, and JR EAST Travel Service Centers, JAPAN RAIL CAFÉ TOKYO and the TAKANAWA GATEWAY Travel Service Center",
    deposit: "None",
    refund: "None — the balance is not refunded, faulty cards aside",
    valid: "28 days including the day you buy it; invalid on the 29th",
    where: "As Suica. Sold at ¥1,000, ¥2,000, ¥3,000, ¥4,000, ¥5,000 and ¥10,000; top-ups stop at ¥20,000",
  },
  {
    card: "TOURIST PASMO",
    sub: "PASMO Committee, visitors only — launched May 2026",
    buy: "Ticket windows and ticket machines at stations and other locations at Narita and Haneda airports",
    deposit: "None",
    refund: "None, “including unused funds”",
    valid: "28 days from the date of issue",
    where: "As PASMO. ¥2,000 at Narita; ¥1,000–¥10,000 denominations at Haneda, each holding its own purchase price in value",
  },
  {
    card: "Suica / PASMO / ICOCA in Apple Wallet",
    sub: "Mobile Suica and Apple Pay PASMO",
    buy: "The Wallet app: Add → Transit Card → Add New Card creates a brand-new card with no physical card involved",
    deposit: "None — the ¥500 deposit exists to get a plastic card back",
    refund: "Nothing to return, so the deposit question does not arise",
    valid: "No expiry published; the visitor-only Welcome Suica Mobile app issues a Suica valid 180 days",
    where: "As the plastic version, with Express Mode for one card at a time",
  },
];

/**
 * Tap-and-go against a pass, with the arithmetic shown. Tokyo Metro's adult fares
 * and the Tokyo Subway Ticket prices were read on tokyometro.jp on 28 Oct 2026; the
 * Osaka figures come from our Osaka pass guide, which read subway.osakametro.co.jp
 * and osp.osaka-info.jp on 20 Oct 2026.
 */
const passRows = [
  {
    option: "IC card, pay as you go",
    price: "Tokyo Metro adult IC fares: ¥178 (1–6 km) to ¥324 (28–40 km)",
    breakeven: "Nothing to break even on — you pay for what you ride",
    note: "The only option that also covers JR, private rail, buses and shops",
  },
  {
    option: "Tokyo Subway Ticket, 24 hours",
    price: "¥1,000 adult / ¥500 child",
    breakeven: "About 5–6 Metro rides inside one 24-hour window",
    note: "Tokyo Metro and Toei only — not JR, so not the Yamanote Line. Visitors only",
  },
  {
    option: "Tokyo Subway Ticket, 48 hours",
    price: "¥1,500 adult / ¥750 child",
    breakeven: "About 4 rides a day",
    note: "Same coverage; the clock runs from first use, not by calendar day",
  },
  {
    option: "Tokyo Subway Ticket, 72 hours",
    price: "¥2,000 adult / ¥1,000 child",
    breakeven: "About 4 rides a day",
    note: "The tier most three-day visitors come out ahead on",
  },
  {
    option: "Tokyo Metro 24-hour Ticket",
    price: "¥700 adult / ¥350 child",
    breakeven: "About 4 Metro rides in 24 hours",
    note: "Tokyo Metro lines only — no Toei. Anyone can buy it, at any Metro machine",
  },
  {
    option: "Osaka Enjoy Eco Card, 1 day",
    price: "¥820 weekday, ¥620 at weekends, ¥310 child any day",
    breakeven: "3–4 rides at the ¥240 two-zone fare",
    note: "Osaka Metro and city buses. Checked " + OSAKA_CHECKED,
  },
  {
    option: "Osaka Amazing Pass, 1 day",
    price: "¥2,500 (2-day ¥3,300)",
    breakeven: "Not on rides alone — it needs three or more paid sights",
    note: "Travel plus more than 40 free admissions. Checked " + OSAKA_CHECKED,
  },
];

/** Where a tap works, with the operator or ministry page behind each line. */
const worksOn = [
  "Trains and buses across the areas of the ten mutually usable transit IC cards — Kitaca, PASMO, Suica, TOICA, manaca, ICOCA, PiTaPa, SUGOCA, nimoca and Hayakaken, interoperable since 23 March 2013",
  "Tokyo Metro and Toei Subway, and the JR East lines a JR Pass does not cover",
  "Convenience stores: 7-Eleven lists transit IC money alongside credit, debit and the code-payment apps",
  "Vending machines carrying the IC mark — Coca-Cola's multi-money machines list all ten cards",
  "Taxis in the big cities: km Taxi in Tokyo lists Suica, PASMO, ICOCA and seven more",
];

const doesNotWork = [
  "One journey that crosses from one IC area into another — the mutual-use rules do not allow it, commuter-pass exceptions aside",
  "A shinkansen seat: the limited-express ticket is a separate purchase from the fare, so a bare tap at the gate will not board one",
  "Temples, shrines and most market stalls, where no operator publishes card acceptance at all",
  "A balance above ¥20,000 — both PASMO and JR West cap the card there",
  "PiTaPa shopping: PASMO's own page notes PiTaPa sits outside the electronic-money side of the mutual-use scheme",
];

const steps = [
  {
    title: "Decide between a deposit card and a visitor card first",
    desc: `A Suica, PASMO or ICOCA costs ¥500 in deposit that you can get back; a Welcome Suica or a TOURIST PASMO costs no deposit and expires after 28 days with no refund of what is left on it. The deposit card is the better buy if you expect to come back, because the balance does not expire. Checked ${CHECKED}.`,
  },
  {
    title: "At a station machine: buy a Suica or a PASMO",
    desc: `Suica comes from a JR East ticket machine inside the Suica area, PASMO from the machines and counters of the PASMO Committee operators — Tokyo Metro, Toei, the private railways and the bus companies, whose sale points differ by operator. Both unregistered and registered versions have been on sale again since 1 March 2025, after the semiconductor shortage that stopped them in 2023. PASMO's own sale price is ¥1,000 including the ¥500 deposit. Checked ${CHECKED}.`,
  },
  {
    title: "At Kansai Airport: buy an ICOCA at the ticket office",
    desc: `JR West names the Midori-no-madoguchi at Kansai-Airport Station and prices a new ICOCA at ¥2,000 including the ¥500 deposit, which leaves ¥1,500 to spend. The card can then be topped up to ¥20,000 and used, in JR West's words, “all across Japan on railways and buses, and at stores displaying the IC or ICOCA mark”. Checked ${CHECKED}.`,
  },
  {
    title: "On an iPhone: make one in the Wallet app, with no card at all",
    desc: `Apple's own instructions are Add → Transit Card → pick Suica, PASMO, ICOCA or TOICA → Add New Card → choose an amount. There is no ¥500 deposit, because there is no plastic to hand back, and no queue at a machine. Express Mode — tapping without unlocking the phone — is switched on automatically for your first transit card and can only be on for one card at a time. Checked ${CHECKED}.`,
  },
  {
    title: "Top up at a machine, or in the app",
    desc: `Any ticket machine marked チャージ takes cash and updates the balance instantly, and the JR East machines in the Suica area let you switch the display language before you start. The ceiling is ¥20,000 on PASMO and ICOCA alike, and ¥10,001 when you top up on a bus. Checked ${CHECKED}.`,
  },
];

const mobileSections = [
  {
    title: "iPhone and Apple Watch",
    desc: "Apple lists Suica, PASMO, ICOCA and TOICA for Wallet. You need an iPhone 8 or 8 Plus or later — iPhone 7 or later for Suica specifically — or an Apple Watch Series 3 or later, Series 2 or later if it was bought in Japan, plus an Apple Account with two-factor authentication and an eligible payment card already in Wallet.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Android: check where the phone was bought",
    desc: "Mobile PASMO needs a FeliCa-equipped Android phone running Android 6.0 or later with the Osaifu-Keitai app, and PASMO states that Android handsets bought outside Japan are generally not supported and that the service is in Japanese only. A phone bought abroad is usually a plastic card or an iPhone decision, not an Android one.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="9" y1="14" x2="9" y2="14" />
        <line x1="12" y1="14" x2="12" y2="14" />
        <line x1="15" y1="14" x2="15" y2="14" />
      </svg>
    ),
  },
  {
    title: "Welcome Suica Mobile, for visitors",
    desc: "JR East released an iOS-only app for overseas visitors on 6 March 2025 that issues and tops up a Suica, valid for 180 days from issue, and sells ticketless express seats on the Narita Express and other limited expresses. Some countries' rules mean you may not be able to set it up until you have landed.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.18 12 19.79 19.79 0 0 1 1.07 3.4 2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
      </svg>
    ),
  },
];

/**
 * The Klook routes. Three slots, each behind an answer that leaves a decision open:
 * the pass question (5% band), the JR Pass question (5%), and the airport pick-up
 * section (5% transport plus the 20% eSIM). The existing Suica CTA in the Quick
 * Answer box is untouched.
 */
type KlookPath = { label: string; why: string; cta: string; url: string };

const passPaths: KlookPath[] = [
  {
    label: "Tokyo Subway Ticket (24 / 48 / 72 hour)",
    why: "The pass the arithmetic above is about. It is sold to visitors only, so booking it is the version that does not involve finding the right counter on arrival.",
    cta: "Check the subway ticket →",
    url: tokyoSubwayTicket.url,
  },
  {
    label: "Osaka Amazing Pass (1-day / 2-day)",
    why: "Osaka's answer bundles the Metro and the city buses with more than 40 admissions — the half of the value an IC card cannot price against at all.",
    cta: "Check the Osaka pass →",
    url: osakaAmazingPass.url,
  },
];

const jrPassPaths: KlookPath[] = [
  {
    label: "JAPAN RAIL PASS (7, 14 or 21 day)",
    why: "Worth pricing against your own route before you commit, because it covers JR and nothing else — the subway, the private lines and the buses stay on the IC card either way.",
    cta: "Check the JR Pass →",
    url: jrPassWholeJapan.url,
  },
];

const airportPaths: KlookPath[] = [
  {
    label: "Narita Express (N'EX) round-trip ticket",
    why: "A reserved seat rather than a fare, so no tap at a gate produces one — and it is the train that leaves from the station where the Welcome Suica machines are.",
    cta: "Check the N'EX round trip →",
    url: naritaExpressRoundTripUrl,
  },
  {
    label: "Keisei Skyliner ticket",
    why: "Same point on the Keisei side: the Skyliner seat is a separate purchase from the fare, and Keisei-Ueno puts you where a PASMO is easy to top up.",
    cta: "Check the Skyliner ticket →",
    url: keiseiSkylinerUrl,
  },
  {
    label: "JR Haruka airport express ticket",
    why: "The Kansai Airport train, from the station whose Midori-no-madoguchi is where JR West tells arrivals to buy an ICOCA.",
    cta: "Check the Haruka ticket →",
    url: jrHarukaUrl,
  },
  {
    label: "Nankai Limited Express Rapi:t ticket",
    why: "The Nankai alternative into Namba — again a reserved seat, which the IC card beside it cannot buy.",
    cta: "Check the Rapi:t ticket →",
    url: nankaiRapitUrl,
  },
  {
    label: "Klook Japan eSIM",
    why: "An IC card balance is read from a screen, and the station app that tells you which line to tap onto needs data before you have found the Wi-Fi.",
    cta: "See eSIM options on Klook →",
    url: klookEsim.url,
  },
];

const faqItems = [
  {
    q: "What is an IC card in Japan?",
    a: `An IC card is a rechargeable contactless smart card that pays train, subway and bus fares and works as electronic money in shops. You touch it to the reader going in and coming out, and the fare is taken off the balance. Ten of them — Kitaca, PASMO, Suica, TOICA, manaca, ICOCA, PiTaPa, SUGOCA, nimoca and Hayakaken — have been mutually usable since 23 March 2013, so one card covers trains and buses in every participating area from Hokkaido to Kyushu. A visitor normally ends up with Suica, PASMO or ICOCA, or the 28-day Welcome Suica or TOURIST PASMO. Checked ${CHECKED}.`,
  },
  {
    q: "What is the best IC card for tourists in Japan?",
    a: `Whichever one the machine in front of you sells. Suica, PASMO and ICOCA carry the same ¥500 deposit, the same ¥220 refund fee and the same national coverage, so there is no card to hunt for — only a machine. Suica comes from JR East machines, PASMO from Tokyo Metro, Toei, private rail and bus operators, ICOCA from JR West. If your trip is under four weeks and you would rather not deal with a refund at all, the no-deposit Welcome Suica and TOURIST PASMO do the same job for 28 days. Checked ${CHECKED}.`,
  },
  {
    q: "How much does a Suica or PASMO card cost, and do I get the deposit back?",
    a: `PASMO's own sale price is ¥1,000, of which ¥500 is a deposit that cannot be spent on fares or shopping. Suica works the same way, with the ¥500 deposit inside the purchase price. You get that ¥500 back when you hand the card in: JR East and PASMO both deduct a ¥220 handling fee from the remaining balance — or the whole balance if it is less than ¥220 — and return the ¥500 regardless. A card with ¥1,000 on it therefore refunds ¥1,280. ICOCA is priced at ¥2,000 including the ¥500 deposit, leaving ¥1,500 to spend, and JR West charges the same ¥220 commission. Checked ${CHECKED}.`,
  },
  {
    q: "Can I use Suica on my iPhone?",
    a: `Yes, and you can create one without ever touching a plastic card. Apple's documentation covers Suica, PASMO, ICOCA and TOICA in Wallet: Add → Transit Card → Add New Card → choose an amount. It needs an iPhone 8 or 8 Plus or later, or an iPhone 7 or later for Suica specifically, or an Apple Watch Series 3 or later — Series 2 or later if bought in Japan — plus an Apple Account with two-factor authentication and an eligible payment card in Wallet. There is no ¥500 deposit, and Express Mode lets you tap through a gate without unlocking the phone, for one transit card at a time. Checked ${CHECKED}.`,
  },
  {
    q: "Do I need an IC card if I have a JR Pass?",
    a: `Yes, for everything the pass does not cover. A JAPAN RAIL PASS buys JR travel and nothing else, so Tokyo Metro, Toei Subway, the private railways and city buses are all still unpaid, along with every convenience store and vending machine. The nationwide Ordinary pass is ¥50,000 for 7 days bought online, or ¥53,000 as an Exchange Order from an overseas agency, read ${PASS_CHECKED} — spending any part of that on a subway ride is simply not possible. An IC card alongside it costs ¥500 in refundable deposit.`,
  },
  {
    q: "Is an IC card cheaper than a subway pass?",
    a: `It depends on how much you move. Tokyo Metro's adult IC fares run from ¥178 for 1–6 km to ¥324 for 28–40 km, so a day of three or four short hops costs roughly ¥550–¥700 on the card. The Tokyo Subway Ticket is ¥1,000 for 24 hours, ¥1,500 for 48 and ¥2,000 for 72 — the 24-hour tier needs about five or six rides to break even, while the 72-hour tier only needs about four a day. In Osaka the Enjoy Eco Card is ¥820 on a weekday and ¥620 at weekends against a ¥240 two-zone fare, so three or four rides cover it. Pass prices and Metro fares checked ${CHECKED}; Osaka prices ${OSAKA_CHECKED}.`,
  },
  {
    q: "Can I use Suica outside Tokyo?",
    a: `Yes. Suica is one of the ten cards in the nationwide mutual-use scheme that began on 23 March 2013, so it is accepted on trains and buses in the Kitaca, PASMO, manaca, TOICA, PiTaPa, ICOCA, SUGOCA, nimoca and Hayakaken areas as well as its own. The one rule to know is that a single journey may not cross from one area into another — tap out before the boundary and start again. Checked ${CHECKED}.`,
  },
  {
    q: "How do I charge my IC card in Japan?",
    a: `At any ticket vending machine marked チャージ or carrying an IC logo: insert the card and cash, pick the amount, and the balance updates on the spot. JR East's machines in the Suica area start in Japanese and let you change language before you begin. The ceiling is ¥20,000 on PASMO and on ICOCA, and ¥10,001 if you top up on a bus. On an iPhone, the same thing happens in the Wallet app with no machine involved. Checked ${CHECKED}.`,
  },
  {
    q: "What happens if my IC card runs out of money at the gate?",
    a: "The gate stays shut and the reader beeps at you. Find the fare adjustment machine (精算機) inside the gates, insert the card, pay the difference, and walk out normally. Every staffed station has one near the gate line, and the machines handle an IC card as readily as a paper ticket.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/ic-cards-japan") } });

/**
 * The search terms stay verbatim in the title, the H1 and the description. "IC cards"
 * and "Suica" are the two phrases this page takes impressions for; "PASMO" and "ICOCA"
 * are the comparison the ranking pages carry and this one did not. 50 characters, well
 * inside the 60 the en budget allows, because Bing truncates earlier than Google and
 * this page was taking impressions there at position 6.81 for no clicks at all.
 */
const TITLE = "IC Cards Japan 2026: Suica, PASMO & ICOCA Compared";
const DESCRIPTION =
  "IC cards in Japan explained: what Suica, PASMO, ICOCA, Welcome Suica and Mobile Suica cost, where to buy each, and which one to get. Checked Oct 2026.";

/** One Klook slot — same shape as components/KlookTripPrep.tsx, inline so it can sit behind a specific answer. */
function KlookPicks({ items }: { items: KlookPath[] }) {
  return (
    <ul className={styles.pickList} style={{ marginTop: "1rem" }}>
      {items.map((item) => (
        <li key={item.url}>
          <span className={styles.proIcon}>▸</span>
          <span>
            <strong>{item.label}</strong> — {item.why}{" "}
            <KlookLink
              href={item.url}
              target="_blank"
              rel="sponsored noopener"
              style={{ color: "var(--accent)", fontWeight: 600, whiteSpace: "nowrap" }}
            >
              {item.cta}
            </KlookLink>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function IcCardsJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/ic-cards-japan" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/ic-cards-japan" />
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
              route: "/guides/transport/ic-cards-japan",
              headline: TITLE,
              description: DESCRIPTION,
              updated,
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>IC Cards Japan</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            IC Cards Japan 2026:<br />Suica, PASMO &amp; ICOCA Compared
          </h1>
          <p className={styles.heroSubtitle}>
            Six cards, one network. What each one costs to get, what it costs to give back, and which to buy at the airport.
          </p>
          <div className={styles.heroBadges}>
            {[`Checked ${CHECKED}`, "Operator prices only", "Six cards compared"].map((t) => (
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
            We may earn a small commission if you buy through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* The answer, in the first paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            An <strong>IC card</strong> is a rechargeable contactless card that pays train, subway and bus fares in Japan
            and doubles as electronic money in shops — you touch it to the reader going in and out, and the fare comes off
            the balance. A visitor can use <strong>Suica</strong> (JR East), <strong>PASMO</strong> (Tokyo Metro, Toei and
            the private operators) or <strong>ICOCA</strong> (JR West), all three of which carry a refundable{" "}
            <strong>¥500 deposit</strong> inside the purchase price and work on the same national network; the 28-day,
            no-deposit <strong>Welcome Suica</strong> and <strong>TOURIST PASMO</strong>, sold at Narita and Haneda; or a
            card made straight in the <strong>Apple Wallet</strong> app on an iPhone, with no deposit and no machine. You
            buy the plastic ones at station ticket machines and offices — PASMO prices a new card at ¥1,000 including the
            deposit, JR West prices a new ICOCA at ¥2,000 with ¥1,500 of it spendable — and you get the ¥500 back on
            return, less a ¥220 handling fee taken out of whatever balance is left. Figures read on the operators&apos; own
            pages on {CHECKED}.
          </p>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Which card</p>
                <p className={styles.verdictStatValue}>Suica, PASMO or ICOCA — same network</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Deposit</p>
                <p className={styles.verdictStatValue}>¥500, refundable (¥220 fee on the balance)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>No-deposit visitor cards</p>
                <p className={styles.verdictStatValue}>Welcome Suica &amp; TOURIST PASMO, 28 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On an iPhone</p>
                <p className={styles.verdictStatValue}>Suica, PASMO, ICOCA or TOICA in Wallet</p>
              </div>
            </div>
            <KlookLink href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264844&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F16917-suica-ic-card-tokyo%2F" className={styles.verdictBtn} target="_blank" rel="noopener noreferrer nofollow">
              Get Suica on Klook →
            </KlookLink>
          </div>
        </div>

        {/* The card-by-card table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At a glance</span>
          <h2 className={styles.sectionTitle}>Every IC card a visitor can buy, compared</h2>
          <p className={styles.bodyText}>
            Six products, each with its own deposit, its own refund rule and its own expiry. Every cell below is the
            operator&apos;s own published wording, read on {CHECKED}; where nobody publishes a figure, the cell says so
            rather than estimating one.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Card</th>
                    <th>Where to buy</th>
                    <th>Deposit</th>
                    <th>Refund</th>
                    <th>Valid for</th>
                    <th>Where it works</th>
                  </tr>
                </thead>
                <tbody>
                  {cardRows.map((row) => (
                    <tr key={row.card}>
                      <td className={styles.tdProvider} style={{ minWidth: "160px" }}>
                        {row.card}
                        <span className={styles.tdBestFor} style={{ display: "block", fontWeight: 400 }}>{row.sub}</span>
                      </td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "220px" }}>{row.buy}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)" }}>{row.deposit}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.refund}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)" }}>{row.valid}</td>
                      <td style={{ fontSize: "0.82rem", color: "var(--text)", minWidth: "200px" }}>{row.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Sources, all read {CHECKED}: JR East for Suica and Welcome Suica; the PASMO agreement and visitor pages, and
            the PASMO Committee&apos;s 17 April 2026 TOURIST PASMO release; JR West for ICOCA; Apple&apos;s own support
            documentation for the Wallet row. Suica, PASMO and the unregistered versions of both returned to sale on
            1 March 2025 after the chip shortage that suspended them in 2023.
          </p>
        </section>

        {/* Q: What is an IC card in Japan? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>What is an IC card in Japan?</h2>
          <p className={styles.bodyText}>
            It is a prepaid contactless smart card for transport fares that also works as electronic money. You load it
            with cash, touch it to the reader at the gate on the way in and the way out, and the fare is deducted — no
            fare table to read, no ticket to buy, no coins to find.
          </p>
          <p className={styles.bodyText}>
            The part that matters more than the definition is that there is not really a choice of network. Ten cards —
            Kitaca, PASMO, Suica, TOICA, manaca, ICOCA, PiTaPa, SUGOCA, nimoca and Hayakaken — have been mutually usable
            since 23 March 2013, so a Suica bought at Narita opens a gate in Fukuoka and an ICOCA bought at Kansai Airport
            opens one in Tokyo. The choice is between the <em>cards</em>: a ¥500-deposit card you can hand back, a 28-day
            visitor card you cannot, or a card that only exists on your phone.
          </p>
          <p className={styles.bodyText}>
            Beyond the gates, the cards pay at shops showing the IC mark. 7-Eleven lists transit IC money alongside credit
            and code payments, Coca-Cola&apos;s multi-money vending machines list all ten cards, and km Taxi in Tokyo lists
            ten IC brands of its own — though the company is clear that what a given machine accepts differs machine by
            machine. Our{" "}
            <Link href="/guides/money/contactless-payment-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              contactless payment guide
            </Link>{" "}
            has the place-by-place detail.
          </p>
        </section>

        {/* Q: Suica or PASMO */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The comparison</span>
          <h2 className={styles.sectionTitle}>Suica or PASMO: which should I get?</h2>
          <p className={styles.bodyText}>
            Buy whichever the machine in front of you sells. On the operators&apos; own terms the two are the same product:
            a ¥500 deposit inside the purchase price, a ¥220 handling fee deducted from the balance on refund with the
            ¥500 returned regardless, a ¥20,000 ceiling on the balance, and the same national acceptance. PASMO prices a
            new card at ¥1,000 including the deposit; Suica is sold the same way at JR East machines.
          </p>
          <p className={styles.bodyText}>
            The real differences are about where you are standing. <strong>Suica</strong> comes from JR East ticket
            machines inside the Suica area, so it is the card you get if you arrive on a JR line.{" "}
            <strong>PASMO</strong> comes from the PASMO Committee operators — Tokyo Metro, Toei, the private railways and
            the bus companies — and the sale points differ from operator to operator, which is why PASMO&apos;s own site
            tells you to check the operator&apos;s page. <strong>ICOCA</strong> is the JR West version, and the one JR West
            points Kansai Airport arrivals at.
          </p>
          <p className={styles.bodyText}>
            One thing that has changed and is still wrong on most pages: unregistered Suica and PASMO cards were suspended
            in June 2023 and registered ones in July 2023 in a semiconductor shortage. Registered cards came back on
            1 September 2024 and unregistered ones on 1 March 2025, so a walk-up purchase is possible again. In the
            meantime PASMO PASSPORT sold out and was discontinued; its replacement, <strong>TOURIST PASMO</strong>,
            launched in May 2026 at Narita and Haneda. Checked {CHECKED}.
          </p>
        </section>

        {/* Q: Can I use Suica on my iPhone? */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Phones</span>
          <h2 className={styles.sectionTitle}>Can I use Suica on my iPhone?</h2>
          <p className={styles.bodyText}>
            Yes — and you can create a brand-new card in the Wallet app without owning a plastic one. Apple&apos;s own
            instructions are Add → Transit Card → pick <strong>Suica, PASMO, ICOCA or TOICA</strong> → Add New Card →
            choose an amount. There is no ¥500 deposit, because there is no card to hand back, and Express Mode — tapping
            through a gate without unlocking the phone — is turned on automatically for your first transit card, one card
            at a time. Android is the case to check before you fly, not after. Checked {CHECKED}.
          </p>
          <div className={styles.whoForGrid}>
            {mobileSections.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Q: Do I need an IC card if I have a JR Pass? */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With a pass</span>
          <h2 className={styles.sectionTitle}>Do I need an IC card if I have a JR Pass?</h2>
          <p className={styles.bodyText}>
            Yes. A JAPAN RAIL PASS buys JR travel and only JR travel, so Tokyo Metro, Toei Subway, every private railway
            and almost every city bus sit outside it — as do convenience stores, vending machines and taxis. In Tokyo that
            is most of the moving you will do on a sightseeing day, and there is no way to spend any part of the pass on
            it.
          </p>
          <p className={styles.bodyText}>
            The arithmetic is lopsided enough to settle the question. The nationwide Ordinary pass is ¥50,000 for 7 days
            bought online, or ¥53,000 as an Exchange Order from an overseas agency, read {PASS_CHECKED}; the IC card
            beside it costs ¥500 in deposit you get back. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--accent)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            prices a pass against the legs you actually plan to ride.
          </p>
          <KlookPicks items={jrPassPaths} />
        </section>

        {/* Q: Is an IC card cheaper than a subway pass? */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The maths</span>
          <h2 className={styles.sectionTitle}>Is an IC card cheaper than a subway pass?</h2>
          <p className={styles.bodyText}>
            For most days, yes — and the exception is specific enough to name. Tokyo Metro&apos;s adult IC fares run from
            ¥178 for 1–6 km to ¥324 for 28–40 km, so three or four short hops cost roughly ¥550–¥700 on a tapped card.
            A pass only wins once the ride count passes its break-even, which is about five or six rides in a day for the
            ¥1,000 24-hour ticket, and about four rides a day for the ¥2,000 72-hour one.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Price</th>
                    <th>Break-even</th>
                    <th>What it covers</th>
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider} style={{ minWidth: "180px" }}>{row.option}</td>
                      <td style={{ fontSize: "0.84rem", color: "var(--text)", minWidth: "180px" }}>{row.price}</td>
                      <td style={{ fontSize: "0.84rem", color: "var(--text)" }}>{row.breakeven}</td>
                      <td style={{ fontSize: "0.84rem", color: "var(--text)", minWidth: "200px" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two catches the price alone does not show. The Tokyo Subway Ticket covers Tokyo Metro and Toei but{" "}
            <strong>not JR</strong>, so the Yamanote Line is not on it and an IC card is still needed; and it is sold to
            overseas visitors and to domestic visitors from outside the Tokyo region, with a passport check if you buy it
            in Japan. Our{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Tokyo Subway Ticket guide
            </Link>{" "}
            and{" "}
            <Link href="/guides/transport/osaka-metro-pass" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Osaka Metro Pass guide
            </Link>{" "}
            do the break-even in full.
          </p>
          <KlookPicks items={passPaths} />
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Tokyo Metro fares and Tokyo Subway Ticket prices read on tokyometro.jp, {CHECKED}; the Osaka figures on
            subway.osakametro.co.jp and osp.osaka-info.jp, {OSAKA_CHECKED}. Klook&apos;s own prices are not quoted here —
            its product pages block automated checks.
          </p>
        </section>

        {/* Airport pick-up */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>On arrival</span>
          <h2 className={styles.sectionTitle}>Where do I buy an IC card at the airport?</h2>
          <p className={styles.bodyText}>
            <strong>Narita and Haneda.</strong> JR East sells the Welcome Suica from dedicated vending machines at Narita
            Terminal 1, Narita Terminal 2·3 and Haneda Terminal 3 stations, and over a counter at the JR EAST Travel
            Service Centers there and at Tokyo, Shibuya, Shinjuku, Ikebukuro, Ueno, Yokohama and Sendai, plus JAPAN RAIL
            CAFÉ TOKYO and the TAKANAWA GATEWAY Travel Service Center. On the PASMO side, TOURIST PASMO is sold at ticket
            windows and ticket machines at stations and other locations at both airports — ¥2,000 at Narita, and in
            ¥1,000 to ¥10,000 denominations at Haneda. Neither takes a deposit; neither refunds what is left.
          </p>
          <p className={styles.bodyText}>
            <strong>Kansai.</strong> JR West points arrivals at the Midori-no-madoguchi at Kansai-Airport Station, where a
            new ICOCA is ¥2,000 including the ¥500 deposit, leaving ¥1,500 on the card. That is the one of the three
            airports where the card you buy is a deposit card rather than an expiring one.
          </p>
          <p className={styles.bodyText}>
            The airport train is the thing the card cannot buy for you. Every express below sells a reserved seat
            separately from the fare, so no tap at a gate produces one — which is exactly why they are worth having before
            you land, next to{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the Tokyo airport-transfer comparison
            </Link>{" "}
            and{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit" style={{ color: "var(--accent)", fontWeight: 600 }}>
              the Haruka vs Rapi:t one
            </Link>{" "}
            for Kansai.
          </p>
          <KlookPicks items={airportPaths} />
        </section>

        {/* How to Get an IC Card */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to get an IC card, in order</h2>
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

        {/* Where Can I Use an IC Card? */}
        <section className={styles.prosConsSection}>
          <span className={styles.sectionLabel}>Coverage</span>
          <h2 className={styles.sectionTitle}>Where can I use an IC card?</h2>
          <div className={styles.pickGrid}>
            <div className={styles.pickPros}>
              <p className={styles.pickListLabel}>Works here</p>
              <ul className={styles.pickList}>
                {worksOn.map((item) => (
                  <li key={item}><span className={styles.proIcon}>✓</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.pickCons}>
              <p className={styles.pickListLabel}>Does not work for</p>
              <ul className={styles.pickList}>
                {doesNotWork.map((item) => (
                  <li key={item}><span className={styles.conIcon}>✗</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.84rem", color: "var(--text-muted)" }}>
            Mutual-use scheme and area rules from the operators&apos; own pages; the shop, vending-machine and taxi lists
            are the ones we read for our{" "}
            <Link href="/guides/money/cash-vs-card-japan" style={{ color: "var(--accent)", fontWeight: 600 }}>
              cash vs card guide
            </Link>{" "}
            on 27 October 2026. Checked {CHECKED}.
          </p>
        </section>

        {/* Returning Your IC Card */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you leave</span>
          <h2 className={styles.sectionTitle}>Getting the ¥500 deposit back</h2>
          <p className={styles.bodyText}>
            Hand a Suica back at a JR East ticket office, an ICOCA at a JR West Midori-no-madoguchi inside the ICOCA area,
            or a PASMO at a PASMO operator&apos;s counter. You get the ¥500 deposit plus whatever is on the card, less a
            ¥220 handling fee taken out of the balance. JR East is explicit that the ¥500 comes back whether or not the
            balance covers that fee: ¥1,000 on the card refunds ¥1,280, ¥100 on the card refunds ¥500, and an empty card
            still refunds ¥500. Checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            A Welcome Suica or a TOURIST PASMO has nothing to hand back — no deposit was taken, and neither issuer refunds
            the remaining value. Both expire 28 days after purchase, so anything you load on day 27 is money you have
            decided to spend. That is the trade for not queuing at a refund counter on your last morning.
          </p>
          <p className={styles.bodyText}>
            Keeping a deposit card is usually the better call if you expect to return: the balance does not expire, though
            JR East invalidates a Suica that has gone 10 years without use — at which point you can move the balance to a
            new card or take a refund of the balance less the fee, with the ¥500 on top. Checked {CHECKED}.
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
            <Link href="/guides/money/contactless-payment-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="6" width="22" height="13" rx="2" />
                  <path d="M6 12h4M14 10c1.5 1.3 1.5 2.7 0 4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Contactless Payment in Japan: Where a Tap Actually Works</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo: Lines, Fares &amp; Passes Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 11h20" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass 2026: Price, 1-Day vs 2-Day &amp; Enjoy Eco Card</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4" />
                  <path d="M17 21l-2-4" />
                  <line x1="7" y1="21" x2="17" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M15 2v4a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan 2026: Top 4 Picks Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Japan Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Don&apos;t forget your eSIM</h2>
            <p className={styles.ctaBannerDesc}>
              An IC card handles your transport payments — a Japan eSIM handles your connectivity.
              Get set up before you fly.
            </p>
            <Link href="/guides/esim/best-esim-japan" className={styles.ctaBannerBtn}>
              Find the Best eSIM for Japan →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
