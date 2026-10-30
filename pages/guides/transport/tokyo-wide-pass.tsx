import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  jrTokyoWidePass,
  karuizawaShinkansenDayTrip,
  kawaguchikoYamanakakoBusTour,
  klookEsim,
  naritaExpressRoundTripUrl,
  nikkoCulturalDayTourUrl,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * ---------------------------------------------------------------------------
 * /guides/transport/tokyo-wide-pass — written 30 Oct 2026
 *
 * Sourcing. Every yen figure on this page comes from the operator that sets it:
 *
 *   - JR East, for the pass itself (¥16,000 / ¥8,000), the three-consecutive-day
 *     validity, the valid area, the Tobu through-service rules, the eligibility
 *     wording, the pick-up methods, the N'EX fares and the one worked example JR
 *     East publishes for this pass (about ¥21,500 for the GALA Yuzawa and Nikko
 *     route in reserved seats). jreast.co.jp answers automated reads with HTTP
 *     403, so these were read through a jreast.co.jp-restricted search index of
 *     its own pages — the same fallback pages/guides/transport/tokyo-airport-transfer.tsx
 *     documents and uses. The pages behind each figure are /en/multi/pass/tokyowidepass.html,
 *     /en/multi/pass/tokyowidepass_terms.html, /en/multi/pass/eastpass.html,
 *     /en/multi/nex/tickets/ and the 28 January 2026 press release
 *     /e/press/pdf/0128_pass_en.pdf.
 *   - Fujikyu Railway, for the Fuji Excursion (Fuji Kaiyu) fare of ¥4,200
 *     Shinjuku–Kawaguchiko. Its site could be read directly.
 *   - japanrailpass.net, for the JAPAN RAIL PASS prices, read directly.
 *   - Tokyo Monorail, for the ¥520 / ¥260 Haneda fare — the figure
 *     tokyo-airport-transfer.tsx read off tokyo-monorail.co.jp on 25 Oct 2026,
 *     kept in agreement with it deliberately.
 *
 * What is deliberately absent. There is no fare printed for Tokyo–Nikko,
 * Tokyo–Karuizawa or Tokyo–Echigo-Yuzawa. JR East publishes no point-to-point
 * fare table in English that could be read, and a guessed shinkansen fare is
 * exactly the kind of number that makes a break-even table useless. The
 * arithmetic on this page is therefore built out of the fares that could be
 * sourced — the N'EX round trip, the Fuji Excursion, the monorail — plus JR
 * East's own ¥21,500 example, which is the comparison the operator itself makes.
 *
 * Klook: listing 49927 is the pass (5% band), new in lib/klook-links.ts. The
 * Kawaguchiko, Nikko and Karuizawa day tours and the N'EX round trip are links
 * other guides already use, reused rather than re-minted. No Klook price appears.
 * ---------------------------------------------------------------------------
 */

const CHECKED_ISO = "2026-10-30";
const CHECKED = checkedLabel(CHECKED_ISO);
/** The date tokyo-airport-transfer.tsx read the Tokyo Monorail fare. */
const MONORAIL_CHECKED = checkedLabel("2026-10-25");

const ADULT = "¥16,000";
const CHILD = "¥8,000";
const MODEL_ROUTE = "¥21,500";

const TITLE = "JR Tokyo Wide Pass (2026): Price and Is It Worth It?";
const DESCRIPTION =
  "JR Tokyo Wide Pass price for 2026: ¥16,000 adult, ¥8,000 child for 3 consecutive days of JR East trains around Tokyo — and the routes that pay it back.";

/** Table 1 — what you pay and who is allowed to buy it. Figures from JR East. */
const priceRows = [
  {
    item: "Adult (12 and over)",
    value: ADULT,
    note: `Raised from ¥15,000 on 14 March 2026. A page still quoting ¥15,000 is out of date. Checked ${CHECKED}.`,
  },
  {
    item: "Child (6 to 11)",
    value: CHILD,
    note: "Raised from ¥7,500 on the same date — exactly half the adult price.",
  },
  {
    item: "Child (0 to 5)",
    value: "No ticket needed",
    note: "Klook's listing states under-sixes travel free provided they do not occupy a separate seat; a child pass is needed if they do.",
  },
  {
    item: "Validity",
    value: "3 consecutive days",
    note: "Three consecutive days from a start date you choose, and the pass is valid for the three days printed on it. A gap day is a day you have paid for.",
  },
  {
    item: "Who can buy it",
    value: "Non-Japanese passport holders",
    note: "JR East states the pass is valid only for visitors holding a non-Japanese passport, and does not impose a Temporary Visitor entry requirement the way the nationwide JAPAN RAIL PASS does.",
  },
  {
    item: "What you must show",
    value: "Your original passport",
    note: "Required to buy and to collect. JR East states a photocopy cannot be used, and the passport must be valid for the whole period you use the pass.",
  },
];

/** Table 2 — what is on the pass and what is not. All from JR East. */
const coverageRows = [
  {
    service: "JR East lines inside the valid area",
    allowed: "✓ Reserved and non-reserved",
    note: "Local, rapid, express and limited express trains, including the shinkansen, in ordinary cars. Reserved seats cost nothing extra.",
  },
  {
    service: "Shinkansen to Karuizawa, GALA Yuzawa and the north edge of the area",
    allowed: "✓ Included",
    note: "JR East names the Hokuriku Shinkansen to Karuizawa and the Joetsu Shinkansen to GALA Yuzawa. GALA Yuzawa station only opens in winter and spring.",
  },
  {
    service: "Fujikyu Railway — all lines, so Kawaguchiko",
    allowed: "✓ Included",
    note: "The whole Fujikyu Railway is on the pass. Reserved seats on the Fujisan Express, Fujisan View Express and Fuji Tozan Densha carry an extra fee.",
  },
  {
    service: "Izu Kyuko, Tokyo Monorail, Rinkai Line, Joshin Dentetsu",
    allowed: "✓ Included",
    note: "All lines of each, plus the New Shuttle between Omiya and the Railway Museum. The monorail is why Haneda is on the pass.",
  },
  {
    service: "JR–Tobu through limited express to Tobu-Nikko",
    allowed: "✓ Reserved seats free",
    note: "The Nikko, Kinugawa and SPACIA Kinugawa through services. Between Kurihashi and Shimo-Imaichi only these through trains count; from Shimo-Imaichi you may also take Tobu regular and rapid trains to Tobu-Nikko and Kinugawa-Onsen.",
  },
  {
    service: "Limited expresses that start or end at a Tobu station",
    allowed: "✗ Not usable",
    note: "JR East is explicit: only the trains that run through from JR lines onto Tobu are covered. A Tobu-originating limited express is not.",
  },
  {
    service: "Tokaido Shinkansen",
    allowed: "✗ Never",
    note: "A different company operates it, so no JR East pass covers it. Tokyo to Kyoto or Osaka is a separate ticket on any day your pass is valid.",
  },
  {
    service: "Green Car and GranClass",
    allowed: "✗ Extra charge",
    note: "The pass is an ordinary-car product. Upgrading needs a separate fee even on a train it otherwise covers.",
  },
  {
    service: "Tokyo Metro, Toei subway and city buses",
    allowed: "✗ Not covered",
    note: "This is a JR East product and it stops at JR gates. Inside Tokyo you still want an IC card or the Tokyo Subway Ticket on top.",
  },
];

/** Table 3 — the break-even arithmetic, built only from fares an operator publishes. */
const fareRows = [
  {
    journey: "Narita Airport ⇄ Tokyo Station, N'EX round-trip ticket",
    fare: "¥5,200 adult, ¥2,600 child",
    source: `JR East, checked ${CHECKED}`,
    note: "Valid 14 days for one out and one back in a reserved ordinary-car seat. Two singles to Shinjuku would be ¥6,660.",
  },
  {
    journey: "Narita Airport → Tokyo, single on the N'EX",
    fare: "¥3,140",
    source: `JR East, checked ${CHECKED}`,
    note: "¥3,330 to Shinagawa, Shibuya or Shinjuku. Every ordinary-car seat on the N'EX can be reserved.",
  },
  {
    journey: "Shinjuku ⇄ Kawaguchiko, Fuji Excursion (Fuji Kaiyu)",
    fare: "¥4,200 each way, ¥8,400 return",
    source: `Fujikyu Railway, checked ${CHECKED}`,
    note: "¥2,580 basic fare plus a ¥1,620 limited express ticket, 1 hr 53 min at the fastest. Four round trips a day, and the train has no non-reserved car.",
  },
  {
    journey: "Haneda Airport ⇄ Hamamatsucho, Tokyo Monorail",
    fare: "¥520 adult, ¥260 child each way",
    source: `Tokyo Monorail, read ${MONORAIL_CHECKED}`,
    note: "13 minutes, about every five minutes. Small money, but it is on the pass and most Tokyo trips use it twice.",
  },
  {
    journey: "JR East's own example: Tokyo → GALA Yuzawa → Omiya → Tobu-Nikko → Shinjuku, reserved seats",
    fare: `About ${MODEL_ROUTE}`,
    source: `JR East, checked ${CHECKED}`,
    note: "The Joetsu Shinkansen both ways to GALA Yuzawa plus the Nikko limited express out and back. Against a ¥16,000 pass that is roughly ¥5,500 saved on two days of travel.",
  },
];

/** Table 4 — the three passes travellers confuse with each other. */
const passRows = [
  {
    pass: "JR Tokyo Wide Pass",
    price: `${ADULT} adult, ${CHILD} child`,
    valid: "3 consecutive days",
    covers:
      "JR East lines around Tokyo and the Kanto area, plus all Fujikyu, Izu Kyuko, Tokyo Monorail, Rinkai, Joshin Dentetsu and the JR–Tobu through limited expresses. No Tokaido Shinkansen.",
    pick: "A Tokyo base with two or three day trips — Kawaguchiko, Nikko, Karuizawa, Izu, GALA Yuzawa",
  },
  {
    pass: "JR EAST PASS",
    price: "¥35,000 for 5 days, ¥50,000 for 10 days (children half)",
    valid: "5 or 10 consecutive days",
    covers:
      "Every JR East line, not just Kanto, plus the Tokyo Monorail, Aoimori Railway, IGR Iwate Galaxy Railway, Sendai Airport Transit, Sanriku Railway and Hokuetsu Express.",
    pick: "Once Sendai, Aomori, Niigata or Nagano are in the plan — more than double the price, and far more than double the map",
  },
  {
    pass: "JR EAST PASS (Nagano, Niigata area)",
    price: "No longer sold",
    valid: "—",
    covers:
      "Withdrawn. JR East ended sales of both the Nagano/Niigata-area and Tohoku-area passes on 13 March 2026 and replaced them with the single JR EAST PASS above.",
    pick: "Nothing — if a page is still recommending it for 2026 travel, that page is out of date",
  },
  {
    pass: "JAPAN RAIL PASS (nationwide)",
    price: "¥50,000 online, ¥53,000 through an overseas agency (7-day, Ordinary)",
    valid: "7, 14 or 21 consecutive days",
    covers:
      "JR lines nationwide, including the Tokaido Shinkansen that no JR East pass touches — but not the Nozomi or Mizuho without a supplement.",
    pick: "Only when the trip leaves eastern Japan. For three days around Tokyo it is more than three times the price",
  },
];

/** Where the pass pays and where it does not — the judgement table. */
const worthRows = [
  {
    plan: "Three days in Tokyo with a Kawaguchiko day and an airport run",
    verdict: "✓ Buy it",
    why: "The N'EX round trip is ¥5,200 and the Fuji Excursion return is ¥8,400 — ¥13,600 of the ¥16,000 in two journeys, before a single Yamanote ride. One more day trip clears it.",
  },
  {
    plan: "A GALA Yuzawa ski day plus a Nikko day",
    verdict: "✓ Buy it",
    why: `JR East's own worked example prices exactly this pair in reserved seats at about ${MODEL_ROUTE}, against ${ADULT} for the pass.`,
  },
  {
    plan: "Three days inside Tokyo, sightseeing on the subway",
    verdict: "✗ Skip it",
    why: "The pass covers no Tokyo Metro or Toei line and no city bus. A Suica plus the Tokyo Subway Ticket costs a fraction of ¥16,000 and goes to more of the places you actually want.",
  },
  {
    plan: "One day trip and nothing else",
    verdict: "✗ Probably not",
    why: "A single Kawaguchiko return at ¥8,400 is barely half the pass. Buy the ticket, keep the ¥7,600, and read the day-trip guide instead.",
  },
  {
    plan: "Tokyo plus Kyoto or Osaka",
    verdict: "✗ Wrong pass",
    why: "The Tokaido Shinkansen is not on it at any length, and the valid area stops well short of Kansai. Price a nationwide pass or buy the shinkansen leg separately.",
  },
  {
    plan: "You hold a Japanese passport",
    verdict: "✗ Not eligible",
    why: "JR East sells it only to holders of a non-Japanese passport, and the original has to be shown at purchase and at collection.",
  },
];

const buySteps = [
  {
    title: "Book online before you fly, on JR East's site or a reseller",
    desc: `JR East sells the pass through its own JR-EAST Train Reservation site, and resellers including Klook sell a voucher version. Either way you are buying the right to collect a pass in Japan rather than something that arrives in the post. Checked ${CHECKED}.`,
  },
  {
    title: "Collect it in Japan, with your passport",
    desc: "JR East gives two methods: a Reserved Seat Ticket Vending Machine fitted with a passport reader — have the IC-chip page ready — or a JR EAST Travel Service Center, where staff check your eligibility and issue the pass. Klook's listing names Haneda and Narita as its redemption points, so check which counter yours uses before you land.",
  },
  {
    title: "Pick your three days, then live with them",
    desc: "The three days are consecutive and printed on the pass. If your Tokyo days are split either side of a Kyoto leg, the pass is the wrong shape for the trip — two day-trip tickets will cost less than a pass with a dead day in the middle.",
  },
  {
    title: "Reserve your seats before you board, not on the train",
    desc: "Reserved ordinary-car seats are included at no extra charge, but JR East requires the seat ticket to be issued first — at a Reserved Seat Ticket Vending Machine, a JR Ticket Office (Midori-no-Madoguchi) or a Travel Center. Do it for the shinkansen and the Fuji Excursion in particular; the Fuji Excursion has no non-reserved car at all.",
  },
  {
    title: "Budget for the subway separately",
    desc: "Nothing about this pass opens a Tokyo Metro or Toei gate. Keep an IC card topped up for the inner-city legs, and read the Tokyo transport guide for which of the two systems your hotel actually sits on.",
  },
];

const faqItems = [
  {
    q: "How much is the JR Tokyo Wide Pass?",
    a: "It is ¥16,000 for an adult aged 12 or over and ¥8,000 for a child aged 6 to 11, for three consecutive days. Those are the prices JR East has charged since 14 March 2026, when the pass went up from ¥15,000 and ¥7,500 under the same price revision that introduced the new JR EAST PASS — so a page quoting ¥15,000 for 2026 travel is out of date. Children aged 0 to 5 need no ticket unless they occupy a separate seat. Prices read off jreast.co.jp on 30 October 2026.",
  },
  {
    q: "Is the JR Tokyo Wide Pass worth it?",
    a: "It is worth it on a Tokyo trip with two or three real day trips in it, and a waste on a trip spent inside the city. The clearest case for: JR East's own published example — the Joetsu Shinkansen to GALA Yuzawa and back, plus the Nikko limited express out to Tobu-Nikko and back to Shinjuku, all in reserved seats — comes to about ¥21,500 bought separately, against ¥16,000 for the pass. A simpler version gets you most of the way too: a ¥5,200 N'EX round trip from Narita plus a ¥8,400 Fuji Excursion return to Kawaguchiko is ¥13,600 of the ¥16,000 in two journeys. The clearest case against: the pass covers no Tokyo Metro line, no Toei line and no city bus, so three days of Shibuya, Shinjuku and Asakusa get nothing from it. Figures checked 30 October 2026.",
  },
  {
    q: "Does the Tokyo Wide Pass cover the shinkansen?",
    a: "Yes, the JR East shinkansen inside the valid area, in reserved or non-reserved ordinary-car seats at no extra charge — which is how the pass reaches Karuizawa on the Hokuriku Shinkansen and GALA Yuzawa on the Joetsu Shinkansen. It does not cover the Tokaido Shinkansen at any length, because a different company runs it, so Tokyo to Nagoya, Kyoto or Osaka is a separate ticket even on a day your pass is valid. Green Car and GranClass seats need a separate fee on any train.",
  },
  {
    q: "Can I use the Tokyo Wide Pass to Mt Fuji or Kawaguchiko?",
    a: "Yes. The whole of the Fujikyu Railway is on the pass, and JR East names Lake Kawaguchiko among the destinations it reaches, so the Fuji Excursion limited express from Shinjuku through to Kawaguchiko is covered end to end in a reserved ordinary-car seat. Bought separately that journey is ¥4,200 each way on Fujikyu's own figures — ¥2,580 basic fare plus a ¥1,620 limited express ticket — and the fastest run is 1 hour 53 minutes. Two things to note: the Fuji Excursion runs only four round trips a day and has no non-reserved car, so reserve before you board; and reserved seats on the Fujisan Express, Fujisan View Express and Fuji Tozan Densha carry an extra fee. The pass does not cover the buses up to the Fifth Station. Checked 30 October 2026.",
  },
  {
    q: "Where do I buy and pick up the Tokyo Wide Pass?",
    a: "Buy it on JR East's own JR-EAST Train Reservation site, or as a voucher from a reseller such as Klook, and collect the physical pass after you arrive. JR East lists two collection methods: a Reserved Seat Ticket Vending Machine with a passport reader, where you scan the IC chip in your passport, or a JR EAST Travel Service Center, where staff confirm your eligibility and issue it. Klook's listing names Haneda and Narita as redemption points for its voucher. Either way you need the original passport — JR East states a photocopy will not do, and it must be valid for the whole period of use.",
  },
  {
    q: "Can I reserve seats with the Tokyo Wide Pass?",
    a: "Yes, at no extra charge, in ordinary cars. The catch is procedural: JR East requires the seat ticket to be issued before you board, at a Reserved Seat Ticket Vending Machine, a JR Ticket Office (Midori-no-Madoguchi) or a Travel Center — you cannot settle it with the conductor once you are on the train. That matters most on the shinkansen in ski season and on the Fuji Excursion, which has no non-reserved car to fall back on.",
  },
  {
    q: "Can I use it on the Narita Express, and does it reach Haneda?",
    a: "Both airports are on it. Narita Airport sits inside the valid area and the N'EX is a JR East limited express, so the pass covers it in a reserved ordinary-car seat — the fare you avoid is ¥3,140 to Tokyo Station or ¥3,330 to Shinagawa, Shibuya or Shinjuku. Haneda is covered through the Tokyo Monorail, all of whose lines are on the pass; the monorail reaches Hamamatsucho in 13 minutes and would otherwise cost ¥520 for an adult and ¥260 for a child. If the airport run is the only long journey of your trip, buy the ¥5,200 N'EX round-trip ticket instead of a ¥16,000 pass.",
  },
  {
    q: "Does the Tokyo Wide Pass work on the Tokyo Metro or the subway?",
    a: "No. It is a JR East product, so it opens JR gates and the gates of the named partner railways — Fujikyu, Izu Kyuko, Tokyo Monorail, Rinkai, Joshin Dentetsu and the New Shuttle out to the Railway Museum. The Tokyo Metro and Toei subway lines are neither, and nor is any city bus. Most Tokyo trips therefore end up carrying an IC card alongside the pass, or the Tokyo Subway Ticket for the days spent inside the city.",
  },
  {
    q: "Can foreign residents of Japan buy the JR Tokyo Wide Pass?",
    a: "JR East's condition is a non-Japanese passport, and unlike the nationwide JAPAN RAIL PASS it does not add a Temporary Visitor entry requirement — which is why this pass has a reputation for being open to foreign residents. Resellers can be stricter: Klook's listing states that holders of a Japanese passport or Japanese permanent residency are not eligible. If you live in Japan on a non-Japanese passport, that difference is worth settling on the listing or at a Travel Service Center before you pay, because the counter that issues the pass is the one that applies the rule.",
  },
  {
    q: "How does the JR Tokyo Wide Pass compare with the JR EAST PASS?",
    a: "They are different sizes of the same idea. The Tokyo Wide Pass is ¥16,000 for three consecutive days and stops at the edge of the Kanto area; the new JR EAST PASS is ¥35,000 for five consecutive days or ¥50,000 for ten, and covers every JR East line, so Sendai, Aomori, Niigata and Nagano come into range along with the Aoimori, IGR, Sanriku and Hokuetsu Express lines. If your trip is Tokyo plus day trips, the cheaper pass is the right one. One thing to watch when reading older guides: JR East ended sales of the JR EAST PASS (Tohoku area) and the JR EAST PASS (Nagano, Niigata area) on 13 March 2026, so neither is a choice any more. Checked 30 October 2026.",
  },
  {
    q: "What happens if I only use two of the three days?",
    a: "You lose the third. The three days are consecutive and printed on the pass, with no option to spread them across a fortnight, so a trip with a Kyoto leg in the middle of its Tokyo days gets less out of the pass than the price suggests. Count the days you will genuinely spend travelling out of Tokyo before you buy, and if the answer is one, buy that journey as a ticket.",
  },
  {
    q: "Is GALA Yuzawa open all year?",
    a: "No — JR East notes that GALA Yuzawa station itself operates only in winter and spring, so the ski-resort end of the pass is seasonal. Echigo-Yuzawa, one stop away on the Joetsu Shinkansen, is a year-round station. If you are building the trip around snow, check the resort's own opening dates for your travel week before you count a GALA day into the arithmetic.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/tokyo-wide-pass") } });

export default function TokyoWidePassPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-wide-pass" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-wide-pass" />
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
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.japan-travel-kit.com" },
                { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.japan-travel-kit.com/guides" },
                { "@type": "ListItem", position: 3, name: "Transport", item: "https://www.japan-travel-kit.com/guides/transport" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "JR Tokyo Wide Pass",
                  item: "https://www.japan-travel-kit.com/guides/transport/tokyo-wide-pass",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/tokyo-wide-pass",
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
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
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
          <span className={styles.breadCurrent}>JR Tokyo Wide Pass</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            JR Tokyo Wide Pass (2026):<br />Price, What It Covers &amp; Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            Three consecutive days of JR East trains around Tokyo, the Fuji Excursion to Kawaguchiko included.
            Here is what JR East charges, where the pass stops, and the routes that pay it back.
          </p>
          <div className={styles.heroBadges}>
            {[`Prices checked ${CHECKED}`, "Official JR East figures", "Break-even arithmetic"].map((t) => (
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
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        {/* Quick Answer */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Adult</p>
                <p className={styles.verdictStatValue}>{ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Child (6–11)</p>
                <p className={styles.verdictStatValue}>{CHILD}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Valid for</p>
                <p className={styles.verdictStatValue}>3 consecutive days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shinkansen</p>
                <p className={styles.verdictStatValue}>Yes — not Tokaido</p>
              </div>
            </div>
            {/* Answer-first: this is the article's first body paragraph, not the hero line. */}
            <p className={styles.verdictText}>
              The <strong>JR Tokyo Wide Pass</strong> is JR East&apos;s <strong>{ADULT}</strong> ticket
              ({CHILD} for children aged 6 to 11) for <strong>three consecutive days</strong> of unlimited travel in
              reserved or non-reserved ordinary-car seats on JR East local, rapid, express, limited express and{" "}
              <strong>shinkansen</strong> services inside its Kanto-area map — plus <strong>all of the Fujikyu
              Railway</strong> (so the Fuji Excursion runs straight through to <strong>Kawaguchiko</strong>), all of
              Izu Kyuko, the <strong>Tokyo Monorail</strong> to Haneda, the Rinkai Line, Joshin Dentetsu, the New
              Shuttle between Omiya and the Railway Museum, and the <strong>JR–Tobu through limited expresses to
              Tobu-Nikko</strong>. It reaches Karuizawa on the Hokuriku Shinkansen and GALA Yuzawa on the Joetsu
              Shinkansen, and it never covers the Tokaido Shinkansen, the Tokyo Metro or a city bus. JR East&apos;s own
              worked example — Tokyo to GALA Yuzawa and back to Omiya, then the Nikko limited express out to Tobu-Nikko
              and back to Shinjuku, all reserved — comes to about <strong>{MODEL_ROUTE}</strong> bought separately, so
              the pass saves roughly ¥5,500 on that pair of days. Sold only to holders of a non-Japanese passport, and
              collected in Japan on that passport. Prices read off jreast.co.jp on {CHECKED}.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1rem" }}>
              <KlookLink
                href={jrTokyoWidePass.url}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                JR Tokyo Wide Pass on Klook →
              </KlookLink>
              <KlookLink
                href={naritaExpressRoundTripUrl}
                target="_blank"
                rel="sponsored noopener"
                className={styles.verdictBtn}
                style={{ flex: "1 1 200px" }}
              >
                Just the N&apos;EX Round Trip Instead →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Is the JR Tokyo Wide Pass?</h2>
          <p className={styles.bodyText}>
            {ADULT} for an adult, {CHILD} for a child, three consecutive days. The reason you will see other numbers
            quoted is a price revision: JR East raised the pass on <strong>14 March 2026</strong>, in the same round of
            changes that created the new JR EAST PASS.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["What", "Figure", "The condition attached"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Prices, validity and eligibility read off JR East&apos;s own pass pages on {CHECKED}; the ¥15,000 to{" "}
            {ADULT} change comes from its 28 January 2026 press release on new and revised passes. The under-six rule is
            as Klook&apos;s listing states it. For the nationwide pass and its break-even calculator, see our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>
            .
          </p>
        </section>

        {/* Coverage */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>What it covers</span>
          <h2 className={styles.sectionTitle}>What Does the JR Tokyo Wide Pass Actually Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            JR East&apos;s own wording is that the pass is valid for reserved and non-reserved seats in ordinary cars of
            local, rapid, express and limited express trains — shinkansen included — on JR East lines inside the area on
            its map, plus <strong>all</strong> Fujikyu Railway, Izu Kyuko, Tokyo Waterfront Area Rapid Transit (Rinkai),
            Tokyo Monorail and Joshin Dentetsu lines, and the Saitama New Urban Transit (New Shuttle) between Omiya and
            the Railway Museum. The exclusions decide this purchase more often than the inclusions, so read the bottom of
            the table first.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Service", "On the pass?", "What that means"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coverageRows.map((row) => (
                    <tr key={row.service}>
                      <td className={styles.tdProvider}>{row.service}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.allowed}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Coverage and exclusions read off JR East&apos;s pass page and its transportation conditions on {CHECKED}.
            The named destinations JR East itself attaches to the pass are Lake Kawaguchiko, Kusatsu, Nikko, Izu, GALA
            Yuzawa and Karuizawa; the precise boundary stations are on the official map, which is worth opening if your
            day trip sits near the edge. For the city layer the pass leaves out, see{" "}
            <Link href="/guides/transport/tokyo-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Tokyo
            </Link>{" "}
            and{" "}
            <Link href="/guides/transport/ic-cards-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              IC cards in Japan
            </Link>
            .
          </p>
        </section>

        {/* Break-even */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Break-even</span>
          <h2 className={styles.sectionTitle}>Is the JR Tokyo Wide Pass Worth It?</h2>
          <p className={styles.bodyText}>
            The honest way to answer this is to add up the journeys you would buy anyway. Every fare below is one the
            operator publishes — we have left out Tokyo–Nikko, Tokyo–Karuizawa and Tokyo–Echigo-Yuzawa singles, because
            JR East does not publish a readable English fare table for them and a guessed shinkansen fare would make the
            whole table worthless. What JR East does publish for those routes is a worked example, and it is the last row.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Journey", "Normal fare", "Source", "Detail"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.journey}>
                      <td className={styles.tdProvider}>{row.journey}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>The arithmetic that settles it.</strong> Land at Narita, buy the N&apos;EX round trip at ¥5,200, and
            take one day out to Kawaguchiko on the Fuji Excursion at ¥8,400 return: that is <strong>¥13,600 of the{" "}
            {ADULT}</strong> in two journeys, before you have tapped through a single Yamanote gate. Add the Haneda
            monorail at ¥520 each way if you fly out of the other airport, and a second day trip finishes the job. The
            pass therefore wins on a three-day stay with two excursions in it, and loses on a three-day stay spent inside
            Tokyo — where it covers no subway line at all.
          </p>
          <div className={styles.tableWrap} style={{ marginTop: "1.5rem" }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Your trip", "Verdict", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {worthRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Two things to settle on the listing rather than here, because neither is a published fare: the{" "}
            <strong>cancellation and date-change terms</strong>, which matter because you nominate three consecutive days
            and ski-season dates sell out first, and <strong>which collection point</strong> your voucher names — the
            counters at Haneda and Narita keep different hours from the machines, and a late landing can mean collecting
            the pass the following morning rather than on arrival.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check the JR Tokyo Wide Pass →
            </KlookLink>
            <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Compare the N&apos;EX Round Trip →
            </KlookLink>
          </div>
        </section>

        {/* Mt Fuji / Kawaguchiko */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Mt Fuji</span>
          <h2 className={styles.sectionTitle}>Can I Use the Tokyo Wide Pass to Mt Fuji or Kawaguchiko?</h2>
          <p className={styles.bodyText}>
            Yes, and it is the single best reason most people buy it. Because <strong>all</strong> Fujikyu Railway lines
            are on the pass, the <strong>Fuji Excursion</strong> — Fuji Kaiyu on Fujikyu&apos;s own signage — runs
            through from Shinjuku onto the Fujikyu line and into Kawaguchiko without you buying anything extra. Fujikyu
            prices that journey at <strong>¥4,200</strong> one way (¥2,580 basic fare plus a ¥1,620 limited express
            ticket) and puts the fastest run at <strong>1 hour 53 minutes</strong>. Read on {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Two practical catches. The Fuji Excursion runs <strong>four round trips a day</strong>, with one more in
            some seasons, and the train has <strong>no non-reserved car at all</strong> — so a pass without a seat
            ticket is a pass you cannot board. Get the reservation issued at a machine or ticket office before you go to
            the platform. And reserved seats on the <strong>Fujisan Express, Fujisan View Express and Fuji Tozan
            Densha</strong> carry a fee on top of the pass.
          </p>
          <p className={styles.bodyText}>
            What the pass does not do is get you up the mountain. The buses from Kawaguchiko to the Subaru Line Fifth
            Station are not on it, and nor is any Fuji-area sightseeing bus. If the point of the day is the view rather
            than the train, a coach tour that collects you in Tokyo often works out simpler than a pass plus bus
            tickets — our{" "}
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kawaguchiko day trip guide
            </Link>{" "}
            and{" "}
            <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Mt Fuji day trip guide
            </Link>{" "}
            compare the two properly.
          </p>
          <KlookLink
            href={kawaguchikoYamanakakoBusTour.url}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "0.5rem", display: "inline-block" }}
          >
            Compare a Kawaguchiko day tour on Klook →
          </KlookLink>
        </section>

        {/* Shinkansen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Shinkansen</span>
          <h2 className={styles.sectionTitle}>Does the Tokyo Wide Pass Cover the Shinkansen?</h2>
          <p className={styles.bodyText}>
            It covers the JR East shinkansen inside the valid area, in an ordinary car, with reserved seats included at
            no extra charge. That is what turns a three-day Tokyo stay into something wider: the Hokuriku Shinkansen
            takes you to <strong>Karuizawa</strong>, the Joetsu Shinkansen to <strong>GALA Yuzawa</strong> — a station
            JR East notes is open only in winter and spring — and the Tohoku Shinkansen runs north to the edge of the
            map.
          </p>
          <p className={styles.bodyText}>
            The line it never covers is the <strong>Tokaido Shinkansen</strong>, because JR East does not operate it. If
            your trip has Kyoto, Osaka or Nagoya in it, that leg is a separate ticket whatever pass is in your pocket —
            see{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={{ color: "var(--red)", fontWeight: 600 }}>
              Tokyo to Kyoto
            </Link>{" "}
            for what it costs and{" "}
            <Link href="/guides/transport/shinkansen-guide" style={{ color: "var(--red)", fontWeight: 600 }}>
              our shinkansen guide
            </Link>{" "}
            for how the ticket types work. <strong>Green Car and GranClass</strong> seats also sit outside the pass and
            need a separate fee, even on a train it otherwise covers.
          </p>
          <p className={styles.bodyText}>
            For the Karuizawa end of the map specifically, the pass and a day tour answer different questions: the pass
            gives you the train and leaves the day to you, a tour books the day and the transport together. Our{" "}
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" style={{ color: "var(--red)", fontWeight: 600 }}>
              Karuizawa day trip guide
            </Link>{" "}
            works through both, and the{" "}
            <Link href="/guides/attractions/nikko-day-trip" style={{ color: "var(--red)", fontWeight: 600 }}>
              Nikko day trip guide
            </Link>{" "}
            does the same for the route JR East builds its own example around.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={karuizawaShinkansenDayTrip.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Karuizawa Shinkansen Day Trip →
            </KlookLink>
            <KlookLink href={nikkoCulturalDayTourUrl} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Nikko Day Tour from Tokyo →
            </KlookLink>
          </div>
        </section>

        {/* Pass comparison */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>JR Tokyo Wide Pass vs JR EAST PASS vs the JR Pass</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "Price (adult)", "Valid for", "What it covers", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {passRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.valid}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            JR East figures read off its own pass pages and its 28 January 2026 press release on {CHECKED}; JAPAN RAIL
            PASS prices read off japanrailpass.net the same day, where the 7-day Ordinary pass is ¥50,000 bought online
            and ¥53,000 through an overseas agency (14-day ¥80,000 / ¥84,000, 21-day ¥100,000 / ¥105,000). The row that
            trips people up is the third: the <strong>JR EAST PASS (Nagano, Niigata area)</strong> and the Tohoku-area
            version both stopped being sold on 13 March 2026, so guides recommending them for this winter are
            describing a pass you cannot buy. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Pass guide
            </Link>{" "}
            has the nationwide break-even, and{" "}
            <Link href="/guides/transport/tokyo-to-kanazawa" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo to Kanazawa
            </Link>{" "}
            covers the Hokuriku route once you go past Karuizawa.
          </p>
        </section>

        {/* Buying */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Buying it</span>
          <h2 className={styles.sectionTitle}>Where Do I Buy and Pick Up the Tokyo Wide Pass?</h2>
          <div className={styles.stepsList}>
            {buySteps.map((step, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            One eligibility detail is worth checking on the listing before you pay, because the two sellers word it
            differently. <strong>JR East</strong> asks only for a non-Japanese passport, with no Temporary Visitor entry
            requirement; <strong>Klook&apos;s listing</strong> states that holders of a Japanese passport or Japanese
            permanent residency are not eligible. If you live in Japan on a foreign passport, that difference decides
            whether to buy from the reseller or from JR East direct — the counter issuing the pass applies its own
            seller&apos;s rule. Checked {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              View the JR Tokyo Wide Pass →
            </KlookLink>
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              {klookEsim.ctaLabel}
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            The eSIM is there for a practical reason rather than a padded one: seat reservations, the JR-EAST Train
            Reservation site and the voucher you have to show all want a working phone the moment you land. Our{" "}
            <Link href="/guides/esim/best-esim-japan" style={{ color: "var(--text)", fontWeight: 600 }}>
              best eSIM for Japan
            </Link>{" "}
            comparison ranks the alternatives on verified prices.
          </p>
        </section>

        {/* Seat reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Can I Reserve Seats With the Tokyo Wide Pass?</h2>
          <p className={styles.bodyText}>
            Yes — reserved ordinary-car seats are part of the pass, at no extra charge. The procedure is the bit to get
            right: JR East requires the <strong>seat ticket to be issued before you board</strong>, at a Reserved Seat
            Ticket Vending Machine, a JR Ticket Office (Midori-no-Madoguchi) or a Travel Center. There is no settling it
            with the conductor.
          </p>
          <p className={styles.bodyText}>
            Where it matters most: the <strong>Fuji Excursion</strong>, which has no non-reserved car, and the{" "}
            <strong>Joetsu Shinkansen in ski season</strong>, when the GALA Yuzawa trains fill with day-trippers
            carrying skis. The through limited expresses to Tobu-Nikko — <strong>Nikko, Kinugawa and SPACIA
            Kinugawa</strong> — are also reserved-seat services on this pass, and JR East is clear that only the trains
            running through from JR lines count: a limited express that starts at a Tobu station is not on the pass at
            all.
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

        <KlookTourPicks
          heading="The Day Trips This Pass Is Bought For"
          intro="The pass covers the train; these listings cover the day at the other end, which is where a coach tour sometimes beats a rail pass outright. Open a listing for the current price on your dates."
          tours={[jrTokyoWidePass, kawaguchikoYamanakakoBusTour, karuizawaShinkansenDayTrip]}
        />

        {/* Related */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Prices, Is It Worth It and How to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18l6-13 5 8 3-4 4 9z" />
                  <line x1="2" y1="21" x2="22" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kawaguchiko Day Trip From Tokyo (2026): Routes, Fares and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/nikko-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V9l7-5 7 5v12" />
                  <path d="M10 21v-6h4v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Nikko Day Trip From Tokyo (2026): Getting There, Costs and Whether to Take a Tour</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip From Tokyo (2026): Shinkansen Times, the Five Stops and Tour vs DIY</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 11V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
                  <path d="M4 11H2v5l2 2h16l2-2v-5H4Z" />
                  <circle cx="7.5" cy="16.5" r="1.5" />
                  <circle cx="16.5" cy="16.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 16l20-6-7 10-3-4z" />
                  <path d="M12 16l-1 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hakone-free-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h18v10H3z" />
                  <path d="M8 7v10M16 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hakone Free Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <circle cx="8" cy="14.5" r="1.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Transport Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three days, and the Kanto map opens up</h2>
            <p className={styles.ctaBannerDesc}>
              {ADULT} for three consecutive days of JR East trains, the Fuji Excursion to Kawaguchiko and the
              shinkansen to Karuizawa included. If one day trip is all you have planned, buy that journey instead.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={jrTokyoWidePass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the JR Tokyo Wide Pass →
              </KlookLink>
              <KlookLink href={naritaExpressRoundTripUrl} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View N&apos;EX Round Trip Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
