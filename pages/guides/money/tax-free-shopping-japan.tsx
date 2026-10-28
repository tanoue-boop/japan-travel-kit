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
 * for the traveller-facing procedure — its traveller special page and its
 * refund-method FAQ, which is where the refund payment methods and the
 * checked-baggage and per-receipt rules come from; JNTO (japan.travel) for the
 * English statement of the 1 November 2026 system; and the Ministry of Finance's
 * FY2025 tax reform outline (mof.go.jp) for what the change abolishes.
 *
 * Nothing on this page is written from experience. Where a figure could not be
 * found on one of those sources it is not stated at all, and where the official
 * sources are silent — above all on when a shop has to pay a refund out — this
 * page says so rather than guessing.
 */
const OFFICIAL_CHECKED = "28 Oct 2026";

/** The day the refund method starts applying — by purchase date, not travel date. */
const REFUND_START = "1 November 2026";

/**
 * The seven airports where the Japan Tourism Agency's refund-method FAQ says the
 * customs confirmation can be done online through Visit Japan Web instead of at a
 * terminal, inside the departure lobby's dedicated wireless area.
 */
const VJW_AIRPORTS = "Narita, Haneda, Kansai, Chubu, Fukuoka, New Chitose and Naha";

/**
 * (1) The comparison the top-ranking pages do not print: what a traveller actually
 * does differently either side of the switch. Four of these rows — how you pay,
 * where the money comes back, the deadline, and what you have to have with you —
 * are the ones people search for.
 */
const changeRows = [
  {
    thing: "What you pay in the shop",
    before: "The tax-free price — the 10% (or 8%) comes off at the till",
    after: "The full tax-inclusive price, the same as a Japanese shopper",
  },
  {
    thing: "Where the tax comes back",
    before: "Nowhere — you never pay it, so there is nothing to get back",
    after: "From the shop, or a refund operator it has contracted, after customs confirms the goods are leaving",
  },
  {
    thing: "What you do at the airport",
    before: "Nothing, unless customs stops you for an inspection",
    after: "Scan your passport at a tax-free procedure terminal in the departure lobby, before the airline desk",
  },
  {
    thing: "What you need with you",
    before: "Your original passport, in the shop",
    after: "Your original passport in the shop, and the goods themselves at the airport, unused and not yet checked in",
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

/**
 * (2) Departure day in order. The Japan Tourism Agency's traveller page and FAQ
 * give the sequence and the two hard constraints — before baggage check-in, and
 * before the boarding process — but no page we could find lays it out as a
 * timeline, which is the form the question is actually asked in.
 */
const airportSteps = [
  {
    when: "1 · On arrival at the terminal, before the airline desk",
    where: "International departure lobby",
    what: "Keep the tax-free goods with you in hand luggage. The Japan Tourism Agency's FAQ is explicit that checked baggage cannot be retrieved once you have handed it over, so this has to happen first.",
  },
  {
    when: "2 · The scan",
    where: "A tax-free procedure terminal (kiosk or electronic terminal) in the lobby",
    what: "Present your passport at the terminal. It reads your purchase records from the national system — nothing is stamped or stapled, and no paper form is filled in.",
  },
  {
    when: "3 · The result on screen",
    where: "Same terminal",
    what: "Green means no customs inspection is required and the procedure ends there. Red means an inspection is required.",
  },
  {
    when: "4 · Only if the screen is red",
    where: "The customs inspection area",
    what: "Show the goods to a customs officer. This is the step with no predictable length, which is the reason to be at the airport earlier than usual on a shopping-heavy departure.",
  },
  {
    when: "5 · Then, and not before",
    where: "Airline check-in desk",
    what: "Check your bags. The confirmation has to be complete before the boarding or embarkation process, so there is no going back for it after security either.",
  },
  {
    when: "6 · The refund",
    where: "From the shop, or a refund operator it has contracted",
    what: "Paid after the customs confirmation establishes the tax-free sale. The method is the shop's choice; see the table below.",
  },
];

/**
 * (4) How the money actually reaches you. Every method here is one the Japan
 * Tourism Agency's refund FAQ names — "銀行振込や、クレジットカード送金、アプリ送金、また
 * 税関の確認を受けた出国時の空海港内で現金による返金方法が考えられます" — and the FAQ is
 * equally clear that which one applies is the shop's own decision.
 */
const refundMethods = [
  {
    method: "Bank transfer",
    detail: "To an account you give the shop at the time of purchase. Named in the Japan Tourism Agency's refund FAQ as one of the possible methods.",
  },
  {
    method: "Credit-card refund",
    detail: "Sent back to the card you paid with. Also named in the FAQ; the timing is between the shop and the card issuer, and no official deadline is set for it.",
  },
  {
    method: "App transfer",
    detail: "Through a payment or refund app the shop or its contracted refund operator uses. Named in the FAQ, without naming any particular app.",
  },
  {
    method: "Cash at the airport or seaport",
    detail: "Handed over inside the departure airport or port, after the customs confirmation. The FAQ lists this as possible — it does not say which airports or which shops offer it.",
  },
  {
    method: "Who decides",
    detail: "The shop. The FAQ states refunds are made by each tax-free shop or by a refund operator it has contracted, so the only reliable way to know is to ask at the counter before you pay.",
  },
  {
    method: "When it arrives",
    detail: "Not officially published. The FAQ says the refund follows the customs confirmation, and Japan's consumption tax law sets no deadline for the payout — which is why the wait varies from shop to shop.",
  },
];

/**
 * (5) The cases where nothing is refunded. All seven are from the Japan Tourism
 * Agency's refund FAQ and traveller page; the per-receipt rule is the one that
 * surprises people most, and is quoted there in so many words.
 */
const noRefundCases = [
  {
    situation: "The goods are already in your checked baggage",
    why: "The procedure happens before bag drop, and the FAQ states outright that once you have handed a bag to the airline you cannot get it back to do this.",
  },
  {
    situation: "You opened, ate or used a consumable in Japan",
    why: "Consumables consumed before departure do not qualify. The special sealed packaging goes away on 1 November 2026; the rule it existed to enforce does not.",
  },
  {
    situation: "One item from a receipt is missing",
    why: "The confirmation is made per purchase record. If a single eligible item on that receipt is not in your possession, nothing on the receipt is refunded — not just that item.",
  },
  {
    situation: "More than 90 days have passed since you bought it",
    why: "The customs confirmation has to happen on a departure within 90 days of the purchase date. There is no extension and no claim afterwards.",
  },
  {
    situation: "You went through security or boarded without doing it",
    why: "The procedure has to be completed before the boarding process. Nothing can be claimed retrospectively once you have left.",
  },
  {
    situation: "You gave the goods away or sold them in Japan",
    why: "They are not in your possession at the terminal, so they cannot be confirmed as leaving Japan.",
  },
  {
    situation: "The goods were confirmed but then not exported",
    why: "The consumption tax is collected from you. A confirmation is a statement that the goods are leaving without delay, not a formality.",
  },
];

/**
 * (3) How to check whether a given chain's branch handles tax-free sales. The
 * licence belongs to the shop, not the brand, so the universal answer is the
 * symbol mark at the entrance — but the big chains each publish their own terms,
 * and two of them could be read on 28 Oct 2026. Where a chain's page could not be
 * read, this table says so instead of describing it.
 */
const taxFreeStores = [
  {
    type: "Any shop — the universal check",
    examples: "All of them",
    howToCheck:
      "The Japan Tax-free Shop symbol mark at the entrance. The licence is held by the individual shop, not the chain, so the same brand two stations away may not be covered (Japan Tourism Agency, checked " + OFFICIAL_CHECKED + ").",
  },
  {
    type: "Department stores",
    examples: "Isetan, Takashimaya, Mitsukoshi, Matsuya, Daimaru",
    howToCheck:
      "The store's own floor guide: there is normally one tax-free desk for the whole building, on an upper or basement floor. Keep every receipt from that store that day — they are totalled together against ¥5,000.",
  },
  {
    type: "Discount and variety",
    examples: "Don Quijote",
    howToCheck:
      "Don Quijote's own English tax-free page states that only non-residents qualify, that the minimum is ¥5,000 excluding tax, and that the original passport is required — copies and photos are not accepted (donki.com, checked " +
      OFFICIAL_CHECKED +
      "). On that date the page still described the pre-November rules, including the ¥500,000 consumables band, so take the dates from this page and the branch list from theirs.",
  },
  {
    type: "Fashion",
    examples: "UNIQLO",
    howToCheck:
      "UNIQLO's own tax-free page lists three conditions — a foreign passport, a stay of less than six months, and a purchase of ¥5,000 or more — and its FAQ sends you to the store locator, because not every branch is eligible (uniqlo.com, checked " +
      OFFICIAL_CHECKED +
      ").",
  },
  {
    type: "Homeware",
    examples: "MUJI",
    howToCheck:
      "MUJI's branch pages and the symbol mark at the entrance. Its tax-free page could not be read on " +
      OFFICIAL_CHECKED +
      ", so nothing about a particular branch is stated here — ask at the register, which is where the sale is rung up in most MUJI stores.",
  },
  {
    type: "Electronics",
    examples: "Bic Camera, Yodobashi Camera, the Akihabara chains",
    howToCheck:
      "The in-store signage and the chain's visitor information counter. Neither chain's tax-free page could be read on " +
      OFFICIAL_CHECKED +
      ". This is the category where 10% on one purchase is worth the most, so it is worth asking before you choose a branch.",
  },
  {
    type: "Drugstores",
    examples: "Matsumoto Kiyoshi, Sundrug and similar chains in tourist districts",
    howToCheck:
      "The symbol mark, which these chains display prominently in tourist districts. From 1 November 2026 cosmetics and medicine no longer have to be sealed in special packaging — but you still cannot use them here.",
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
    title: "Pay the tax-inclusive price, and register how you want the refund",
    desc: "This is the part that changed. You pay what a Japanese shopper pays, and the shop sets up the refund: bank transfer, a credit-card refund, an app, or cash at the departure port. Which of those you get is the shop's choice, so ask before you pay.",
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
    q: "How does tax free shopping work in Japan from November 2026?",
    a: `Spend ¥5,000 or more before tax in one shop on one day and show your original passport, and Japan's consumption tax — 10%, or 8% on food and non-alcoholic drink — is refunded on that purchase. For anything bought from ${REFUND_START} you pay the tax-inclusive price in the shop, then present your passport at a tax-free procedure terminal in the international departure lobby, before you check your bags, and the shop pays the refund once customs has confirmed the goods are leaving Japan — within 90 days of the purchase date. (National Tax Agency and Japan Tourism Agency, checked ${OFFICIAL_CHECKED}.)`,
  },
  {
    q: "Is Japan still tax free for tourists?",
    a: `Yes. Nothing about who qualifies or how much you get back has changed: non-residents still get the full 10% consumption tax, or 8% on food and non-alcoholic drink, on purchases of ¥5,000 or more before tax in one shop on one day. What changed on ${REFUND_START} is only where the money comes off — the shop charges the tax-inclusive price and refunds it after a customs confirmation at the airport, instead of discounting it at the till. The date that decides which version applies to you is the purchase date, not your travel date.`,
  },
  {
    q: "What is the minimum purchase for tax free in Japan?",
    a: `¥5,000 before tax, per shop, per day. The Japan Tourism Agency states the threshold as purchases totalling 5,000 yen or more excluding tax at a single store on a single day, so two ¥3,000 purchases in two different shops do not qualify and neither do two ¥3,000 days in the same shop. There is no upper limit for purchases made from ${REFUND_START}: the ¥500,000 per-shop-per-day cap on consumables is abolished on that date, along with the general-goods and consumables split itself. (Checked ${OFFICIAL_CHECKED}.)`,
  },
  {
    q: "How do I get my tax refund at the airport in Japan?",
    a: `Before you check your bags, present your passport at a tax-free procedure terminal in the international departure lobby with the goods still with you. The terminal reads your purchase records and shows a result: green means no customs inspection is required, red means taking the goods to the customs inspection area. The shop — or a refund operator it has contracted — pays the refund after that confirmation, by bank transfer, credit-card refund, app transfer, or cash inside the departure airport or port, depending on the shop. At ${VJW_AIRPORTS} the same confirmation can be done online through Visit Japan Web instead, inside the departure lobby's dedicated wireless area before security. (Japan Tourism Agency, checked ${OFFICIAL_CHECKED}.)`,
  },
  {
    q: "Do I need my passport for tax free shopping in Japan?",
    a: `Yes, twice, and it has to be the original. The shop needs your actual passport to ring the sale up as a tax-free purchase — a photo on your phone or a photocopy is not accepted — and from ${REFUND_START} you need it again at the tax-free procedure terminal at the airport, because the terminal identifies your purchase records by reading it. There is no way to claim the exemption later on a purchase that was rung up at the ordinary price. (National Tax Agency and Japan Tourism Agency, checked ${OFFICIAL_CHECKED}.)`,
  },
  {
    q: "Can I get the refund at Kansai or Fukuoka airport?",
    a: `The customs confirmation, yes. The Japan Tourism Agency says tax-free procedure terminals are installed in international departure lobbies before baggage check-in, and Kansai and Fukuoka are both named among the seven airports — ${VJW_AIRPORTS} — where the same confirmation can alternatively be done online through Visit Japan Web, in the lobby's dedicated wireless area before security. Whether cash is handed over at that particular airport is a separate question and is not published per airport: cash inside the departure airport or port is one of the methods the Agency's FAQ names, but the method is each shop's choice, so ask in the shop before you pay. (Checked ${OFFICIAL_CHECKED}.)`,
  },
  {
    q: "What happens if I pack tax-free items in checked luggage?",
    a: `You lose the refund on them. The Japan Tourism Agency's FAQ is explicit that checked baggage cannot be retrieved once it has been handed to the airline, and that the tax-free procedure has to be done at a terminal before you check in. Because the confirmation is judged per receipt, a single item checked in by mistake takes the whole of that receipt with it. Pack anything you bought tax-free into your hand luggage before you leave the hotel, not at the airport. (Checked ${OFFICIAL_CHECKED}.)`,
  },
  {
    q: "Can I still get tax free after 90 days?",
    a: `No. For purchases made from ${REFUND_START} the customs confirmation has to happen at a departure within 90 days of the purchase date, and the Japan Tourism Agency's FAQ gives no extension and no later claim. On a stay longer than three months that makes the shopping order matter: buy the expensive things in the last 90 days of the trip, not the first week. (Checked ${OFFICIAL_CHECKED}.)`,
  },
  {
    q: "Who qualifies for tax-free shopping in Japan?",
    a: `Non-residents. In practice that means a foreign national in Japan on short-stay, diplomatic or official status, or a Japanese national who has lived outside Japan continuously for two years or more and can document it with a residence certificate, a family-register attachment or a My Number card showing the move abroad. Anything bought for business or for resale does not qualify, whoever buys it. (National Tax Agency No.6559, checked ${OFFICIAL_CHECKED}.)`,
  },
  {
    q: "Do I still pay the consumption tax in the shop from November 2026?",
    a: `Yes. From ${REFUND_START} you pay the same tax-inclusive price as a Japanese shopper and get the tax back afterwards, which is why the change is called the refund method. The date that matters is the purchase date, not your travel date: something bought on 31 October 2026 still comes off at the till, and something bought the next morning does not.`,
  },
  {
    q: "Can I open or use tax-free purchases in Japan?",
    a: `No. The exemption is conditional on the goods leaving Japan, and from ${REFUND_START} the check happens at the airport with the goods in front of you. Consumables no longer have to be sealed in the shop's special packaging from that date, but using them here still voids the refund — and because the confirmation is judged per purchase record, one opened item disqualifies everything on that receipt. If you have used something, say so to a customs officer rather than putting the purchase through a terminal.`,
  },
  {
    q: "Is Don Quijote tax-free for tourists?",
    a: `Don Quijote's own English tax-free page states that only non-residents qualify, that the minimum is ¥5,000 excluding tax, and that the original passport has to be presented — copies and photos are not accepted (donki.com, checked ${OFFICIAL_CHECKED}). On that date the page still described the pre-November rules, so use the branch information from Don Quijote and the dates from the Japan Tourism Agency. For purchases from ${REFUND_START} the customs confirmation at the airport applies at Don Quijote like anywhere else, and the refund method is that store's choice — ask at the counter.`,
  },
  {
    q: "Do I need to declare tax-free goods at customs?",
    a: `From ${REFUND_START}, yes — that is the whole procedure. The confirmation at the tax-free procedure terminal is not optional and not automatic: no confirmation means no refund, and goods that were confirmed but not actually exported attract the consumption tax. For purchases up to 31 October 2026 there is nothing you have to do unless customs stops you, because the tax never left your pocket in the first place.`,
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/money/tax-free-shopping-japan") } });

export default function TaxFreeShoppingJapanPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Japan Tax Free Shopping 2026: Tax Free Japan Refund Rules</title>
        <meta
          name="description"
          content="Japan tax free shopping from 1 Nov 2026: you pay the tax, then get 10% back at an airport terminal. Tax free Japan rules: ¥5,000, 90 days, passport."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Japan Tax Free Shopping 2026: Tax Free Japan Refund Rules" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" />
        <meta property="og:description" content="Japan tax free shopping from 1 Nov 2026: you pay the tax, then get 10% back at an airport terminal. Tax free Japan rules: ¥5,000, 90 days, passport." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Japan Tax Free Shopping 2026: Tax Free Japan Refund Rules" />
        <meta name="twitter:description" content="Japan tax free shopping from 1 Nov 2026: you pay the tax, then get 10% back at an airport terminal. Tax free Japan rules: ¥5,000, 90 days, passport." />
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
              headline: "Japan Tax Free Shopping 2026: How Tax Free Japan Works Under the Refund System",
              description:
                "Japan tax free shopping under the refund system that applies from 1 November 2026: the ¥5,000-per-shop minimum, the 90-day deadline, the airport terminal steps in order, and how the refund is paid.",
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
                { "@type": "ListItem", position: 4, name: "Tax Free Shopping", item: "https://www.japan-travel-kit.com/guides/money/tax-free-shopping-japan" },
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
          <span className={styles.breadCurrent}>Tax Free Shopping</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Japan Tax Free Shopping 2026:<br />How Tax Free Japan Works Under the Refund System
          </h1>
          <p className={styles.heroSubtitle}>
            ¥5,000 before tax in one shop on one day, a non-resident passport, and the 10%
            consumption tax comes back. From {REFUND_START} it comes back at the airport
            rather than at the till.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official sources only", `The ${REFUND_START} refund system`].map((t) => (
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
            The rules on this page come from the National Tax Agency, the Japan Tourism Agency,
            JNTO and the Ministry of Finance, and nothing we earn changes them.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer Box — the first body paragraph answers the question in full */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 600 }}>¥5,000 · 90 days</span>
          </div>
          <div className={styles.verdictBody}>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
              <strong>
                Japan tax free shopping is a refund, not a discount at the till, for anything
                bought from {REFUND_START}.
              </strong>{" "}
              You pay the full tax-inclusive price in the shop, then scan your passport at a
              tax-free procedure terminal in the international departure lobby — before you
              check your bags — and the amount equivalent to the consumption tax, 10% or 8% on
              food and non-alcoholic drink, is refunded once customs has confirmed the goods
              are leaving Japan. Two conditions decide whether you qualify: ¥5,000 or more
              before tax in a single shop on a single day, and that customs confirmation
              happening within 90 days of the purchase date (Japan Tourism Agency and National
              Tax Agency, checked {OFFICIAL_CHECKED}). Purchases made up to 31 October 2026
              are the exception and still come off at the till, so a trip that straddles the
              date has both systems running in it.
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
                <p className={styles.verdictStatValue}>The airport, before bag drop, within 90 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* (1) The before / after comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The 2026 change</span>
          <h2 className={styles.sectionTitle}>Is Japan Still Tax Free for Tourists?</h2>
          <p className={styles.bodyText}>
            <strong>Yes — the exemption is intact, and only the mechanics changed.</strong> Who
            qualifies, the ¥5,000 floor and the 10% (or 8%) you get back are all the same as
            before. From {REFUND_START} Japan moved from an exemption at the till to a refund
            at the border, and the date that decides which version applies is the{" "}
            <strong>purchase date</strong>, not the travel date. Buy on 31 October and the tax
            never leaves your pocket; buy the next morning and you pay it in the shop and
            claim it back on the way out. Every row below is from the Japan Tourism Agency and
            the Ministry of Finance, read {OFFICIAL_CHECKED}.
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
            Three things are quietly better under the new system. The ¥500,000 daily cap on
            consumables goes, as does the split between general goods and consumables that
            produced it — so the ¥5,000 floor is now judged on one combined total — the
            requirement that shops seal food, drink, cosmetics and medicine in special
            packaging goes with it, and the requirement that the goods not be for ordinary
            daily use is abolished too. What does <em>not</em> change is the reason behind the
            packaging: the goods have to leave Japan unused.
          </p>
        </section>

        {/* How it works */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step by step</span>
          <h2 className={styles.sectionTitle}>How Does Tax Free Shopping Work in Japan from November 2026?</h2>
          <p className={styles.bodyText}>
            Japan charges a 10% consumption tax on most things and 8% on food and
            non-alcoholic drink. Its tourist exemption covers that tax in full on qualifying
            purchases, and under the refund system the whole procedure fits in six steps — four
            in the shop and two on the way out.
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
          <h2 className={styles.sectionTitle}>What Is the Minimum Purchase for Tax Free in Japan?</h2>
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

        {/* Who qualifies / passport */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Eligibility</span>
          <h2 className={styles.sectionTitle}>Do I Need My Passport for Tax Free Shopping in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, and from {REFUND_START} you need it twice — in the shop and again at
            the airport.</strong> It has to be the original document both times: a photo on
            your phone and a photocopy are not accepted, and there is no way to claim the
            exemption afterwards on a purchase that was rung up at the ordinary price. The
            passport is what the shop uses to establish that you are an eligible purchaser,
            and what the terminal at the airport reads to find your purchase records.
          </p>
          <p className={styles.bodyText}>
            What the passport has to show is non-residence. The National Tax Agency&apos;s own
            definition has two halves: a foreign national holding short-stay, diplomatic or
            official status under Japan&apos;s immigration law, and a Japanese national who has
            lived outside Japan continuously for two years or more. Almost every tourist
            reading this is in the first group simply by virtue of the entry record they were
            given at the airport.
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
          <h2 className={styles.sectionTitle}>What Can You Buy Tax Free?</h2>
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

        {/* (3) Store by store — how to check a chain */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Store by store</span>
          <h2 className={styles.sectionTitle}>Where Can You Shop Tax Free in Japan, and How Do You Check a Store?</h2>
          <p className={styles.bodyText}>
            At licensed shops, which display the Japan Tax-free Shop symbol mark at the
            entrance. That mark is the only check that works everywhere, because the licence
            belongs to the individual shop rather than the brand above the door — a branch in
            Shinjuku may handle it when the same chain two stations away does not. In the big
            shopping districts — Shinjuku, Ginza, Shibuya, Akihabara, Namba, Shinsaibashi,
            Kyoto&apos;s Shijo — coverage at the larger retailers is close to universal.
          </p>
          <p className={styles.bodyText}>
            Beyond the mark, the big chains publish their own terms, and they are not all
            equally current. The table says where to look for each, and names the two chain
            pages we could read on {OFFICIAL_CHECKED} as well as the ones we could not.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Store type</th>
                    <th>Examples</th>
                    <th>How to check that branch</th>
                  </tr>
                </thead>
                <tbody>
                  {taxFreeStores.map((row) => (
                    <tr key={row.type}>
                      <td className={styles.tdProvider}>{row.type}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.examples}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.howToCheck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            From {REFUND_START} there is a second thing worth asking at the counter: how that
            shop pays the refund. The Japan Tourism Agency&apos;s FAQ states that refunds are
            made by each tax-free shop or by a refund operator it has contracted, and the law
            sets no rule for the method — so bank transfer, a credit-card refund, an app and
            cash at the departure port are all possible, and which one you get is the
            shop&apos;s decision rather than yours.
          </p>
        </section>

        {/* Klook: the shopping day itself — 6.5% band, next to the store-by-store table */}
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

        {/* What you pay to turn home currency into the yen you spend here */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Paying for it</span>
          <h2 className={styles.sectionTitle}>Keeping the Currency Cost Below the Refund</h2>
          <p className={styles.bodyText}>
            The 10% consumption tax is not the only percentage in play on a shopping day. Whatever you spend
            has to become yen first, and an exchange counter takes its cut inside the rate it quotes, where you
            cannot see it. Under the refund system it matters a little more than it used to, because you now
            front the tax as well — on a day built around clearing the ¥5,000-per-shop threshold several
            times, that is the one cost worth settling before you land.
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
            currency instead of yen, decline it. That is the merchant&apos;s rate, not your card&apos;s. A card
            is also the simplest refund route to be offered, since a credit-card refund is one of the methods
            the Japan Tourism Agency names.
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
          <h2 className={styles.sectionTitle}>How Should You Plan a Day of Tax Free Shopping?</h2>
          <p className={styles.bodyText}>
            The ¥5,000-per-shop rule shapes the day more than anything else on this page.
            Two or three large stores beat a dozen small ones, and anything bought under the
            threshold is simply bought at the full price — so it is worth deciding in advance
            which shop the electronics are coming from, and keeping the souvenir run inside a
            single department store rather than spreading it across an arcade.
          </p>
          <p className={styles.bodyText}>
            The 90-day deadline shapes the <em>order</em> of the trip, which is new. On a stay
            of three months or more, the expensive purchases belong in the last 90 days before
            you fly, not the first week — and on any trip the fragile and the edible belong at
            the end, because everything you claim on has to reach the airport unused and in
            your hand luggage.
          </p>
          <p className={styles.bodyText}>
            The second thing the ¥5,000 rule shapes is where you sleep. Ginza, Shinjuku and
            Shinsaibashi are the three districts where the big tax-free retailers sit close
            enough together to clear the threshold several times in an afternoon and still
            carry everything back to the room between stops — which matters more than usual
            under the new system, because the goods have to survive unused until you reach
            the airport.{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
              Where to stay in Osaka
            </Link>{" "}
            and{" "}
            <Link href="/guides/attractions/things-to-do-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              things to do in Tokyo
            </Link>{" "}
            both break the districts down by line, which is the practical way to decide.
          </p>
          <p className={styles.bodyText}>
            And it is worth being honest that a full day of this is tiring. If the trip has
            one shopping day in it, the half-day sightseeing options above are the normal way
            people split it up — and a guided or chartered day is the one way to do several
            districts without carrying the bags between them.
          </p>
        </section>

        {/* Klook: eSIM + subway — the two things worth having before the shopping day */}
        <KlookTripPrep
          heading="Worth Booking Before You Shop"
          intro="Two things that are cheaper or simply easier to sort out before you fly than from the arrivals hall:"
          items={taxFreeTripPrep}
        />

        {/* (2) The airport procedure, in order */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>At the airport</span>
          <h2 className={styles.sectionTitle}>How Do I Get My Tax Refund at the Airport in Japan?</h2>
          <p className={styles.bodyText}>
            <strong>Scan your passport at a tax-free procedure terminal in the international
            departure lobby before you check your bags, and go to the customs inspection area
            only if the screen comes back red.</strong> That is the whole procedure for anything
            bought from {REFUND_START}, and the two constraints that can cost you the money are
            both about timing: it has to be done before baggage check-in, and before the
            boarding process. The table is the order it happens in on departure day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Where</th>
                    <th>What happens</th>
                  </tr>
                </thead>
                <tbody>
                  {airportSteps.map((row) => (
                    <tr key={row.when}>
                      <td className={styles.tdProvider}>{row.when}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.83rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            At {VJW_AIRPORTS} there is an alternative to the queue: the same confirmation can
            be done online through Visit Japan Web, from inside the departure lobby&apos;s
            dedicated wireless area, any time before the security checkpoint. That needs a
            working connection on your phone (Japan Tourism Agency, checked {OFFICIAL_CHECKED}).
          </p>
          <p className={styles.bodyText}>
            One route that used to exist no longer does: posting your own tax-free purchases
            home as mail or a parcel was abolished on 31 March 2025. Shipping arranged by the
            shop itself may still be available — ask in the shop, not at the airport.
          </p>
        </section>

        {/* (4) How the refund is paid */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting the money</span>
          <h2 className={styles.sectionTitle}>How Is the Refund Actually Paid?</h2>
          <p className={styles.bodyText}>
            By the shop, or by a refund operator the shop has contracted — not by customs and
            not by the airport. The Japan Tourism Agency&apos;s refund FAQ names four possible
            methods and says plainly that the choice is the shop&apos;s, which is why the
            question to ask at the till is not <em>whether</em> you get the tax back but{" "}
            <em>how</em>. Everything in this table is from that FAQ, read {OFFICIAL_CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>What the official FAQ says</th>
                  </tr>
                </thead>
                <tbody>
                  {refundMethods.map((row) => (
                    <tr key={row.method}>
                      <td className={styles.tdProvider}>{row.method}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Two things are <strong>not officially published</strong> and are not stated on this
            page: how long a shop has to pay a refund out, and which individual shops or
            airports hand over cash. Any page quoting a number of days for either is not
            quoting the Japan Tourism Agency.
          </p>
        </section>

        {/* (5) When nothing is refunded */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What voids it</span>
          <h2 className={styles.sectionTitle}>When Is the Refund Not Paid?</h2>
          <p className={styles.bodyText}>
            The refund is conditional, and the conditions are checked at the terminal rather
            than taken on trust. These are the cases the Japan Tourism Agency&apos;s traveller
            page and FAQ name, read {OFFICIAL_CHECKED} — the first and the third are the two
            that cost travellers money by accident rather than by intent.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Situation</th>
                    <th>Why nothing is refunded</th>
                  </tr>
                </thead>
                <tbody>
                  {noRefundCases.map((row) => (
                    <tr key={row.situation}>
                      <td className={styles.tdProvider}>{row.situation}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Departure day transport — 5% band, next to the airport procedure above */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Departure day</span>
          <h2 className={styles.sectionTitle}>Leave Early: the Airport Run With More Bags Than You Arrived With</h2>
          <p className={styles.bodyText}>
            The refund procedure has one knock-on effect people do not plan for: you have to
            arrive at the airport with the goods in hand, before bag drop, with enough slack
            for a red screen and a customs inspection that has no fixed length — carrying
            noticeably more than you did on the way in. That makes the trip out to the airport
            a different problem from the trip in. A reserved seat with somewhere to put
            luggage, or a bus that takes cases into the hold, is worth more than the fastest
            connection with two changes, and a booked departure time is what lets you build
            the extra half hour in rather than hope for it.
          </p>
          <p className={styles.bodyText}>
            The city guides have the full comparison —{" "}
            <Link href="/guides/transport/tokyo-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              Narita and Haneda
            </Link>{" "}
            and{" "}
            <Link href="/guides/transport/osaka-airport-transfer" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kansai and Itami
            </Link>{" "}
            — and the options below are the ones that come with a seat and a place for the bags.
          </p>
        </section>

        <KlookTripPrep
          label="Departure day"
          heading="Booked Seats Out to the Airport, Early Enough for the Terminal"
          intro="Narita, Haneda and Kansai runs from the two cities this guide's shopping districts sit in, as a seat you have already paid for rather than a rush-hour local — which is how you make the time the refund procedure needs:"
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
            consumption tax rates (No.6303) and for the definition of an eligible purchaser
            (No.6559), the{" "}
            <strong>Japan Tourism Agency&apos;s consumption-tax-free shop site</strong> —
            its traveller special page and its refund-method FAQ — for the ¥5,000 threshold,
            the 90-day deadline, the airport procedure, the refund methods and the
            checked-baggage and per-receipt rules, <strong>JNTO</strong> (japan.travel) for the
            English statement of the {REFUND_START} system, and the{" "}
            <strong>Ministry of Finance&apos;s FY2025 tax reform outline</strong> for what the
            switch abolishes. Anything we could not confirm on one of those is not on this
            page, and where the official sources are silent — the payout timing above all —
            this page says so. Shop-level details, including whether a particular branch is
            licensed and how it pays a refund out, are the shop&apos;s to state, not ours.
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
            <Link href="/guides/transport/osaka-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-.9 1.7l4.6 3.1-2 3.6-2.6.3a.8.8 0 0 0-.4 1.4l3.1 2.2 2.2 3.1a.8.8 0 0 0 1.4-.4l.3-2.6 3.6-2 3.1 4.6a1 1 0 0 0 1.7-.9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Airport Transfer Guide (2026): KIX &amp; ITM to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka (2026): Best Areas, Compared by Line and Airport</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
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
              From tax free shopping to ATMs and currency exchange — our money guides
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
