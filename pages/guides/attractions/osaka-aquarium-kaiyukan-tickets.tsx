import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kaiyukanLegolandCombo,
  kaiyukanNifrelCombo,
  kaiyukanSameDayPrep,
  osakaAmazingPassKaiyukanCombo,
  osakaAquariumKaiyukanTicket,
  osakaPrivateWalkingTour,
  osakaSkyVistaHalfDayBusTour,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Osaka Aquarium Kaiyukan — the Tempozan aquarium, and the one major Osaka attraction
 * the Amazing Pass does not cover.
 *
 * Sources, all on the operator's own site, kaiyukan.com:
 * - Re-checked 8 Nov 2026: /info/group/ (the only page that prints the full price bands
 *   as text, plus the ¥3,200 and ¥3,500 tier notes), /info/ticket/ (dynamic pricing,
 *   e-tickets from about 30 days before, date-and-time entry, window sells same-day
 *   only), /info/ticket/kaiyukan/ (2 and under free, disability half price plus one
 *   carer), /info/access/ (Osakako Exit 1 approx. 5 min, approx. 1,000 parking spaces),
 *   /program/night/ (17:00–20:00, last admission 19:00, varies by season),
 *   /about/news/20564.html (re-entry ended 15 June 2026), /info/area/ (baby care room,
 *   nursing room, lockers, wheelchair loan, cafe) and /thv/general/ (Ferris wheel 112.5 m).
 * - Last read 22 Oct 2026 and not re-printed on the pages above on 8 Nov: the 15-minute
 *   entry unit, the three official set tickets and the Santa Maria details.
 * - Not given on any official page checked on 8 Nov: a visit length, a crowd forecast,
 *   stroller rules, or November–New Year prices as text (the calendar is per date).
 *
 * Three things that would be easy to get wrong and are deliberately spelled out:
 *
 * - Kaiyukan runs 価格変動制 — dynamic pricing. There is no single admission figure, and
 *   any page quoting one flat number is quoting one day of the calendar. The bands are
 *   the honest answer, and the per-date figure lives on the operator's calendar.
 * - Re-entry ended on 15 June 2026. A lot of third-party advice still assumes you can
 *   leave for lunch at the Marketplace and come back. You cannot.
 * - There is no official Kaiyukan + Tempozan Giant Ferris Wheel set ticket. The
 *   aquarium's own set tickets are Santa Maria, LEGOLAND and the Captain Line shuttle;
 *   the wheel is a separate operator in the same complex.
 *
 * No Klook price appears: the Klook listing is the place to check the figure for a
 * date, and with a date-based price calendar behind it, a single number would be wrong
 * most days anyway.
 */

/** Prices, hours, access, re-entry and facilities: re-checked on kaiyukan.com on this date. */
const CHECKED_ISO = "2026-11-08";
const CHECKED = checkedLabel(CHECKED_ISO);
/** Set tickets and the 15-minute entry unit: last read on kaiyukan.com on this date. */
const SET_CHECKED = checkedLabel("2026-10-22");

const priceRows = [
  {
    tier: "Adult (大人) — high-school age or 16 and over",
    price: "¥2,700 – ¥3,200",
    what: "The band that moves most. Dates in the top ¥3,200 tier accept bookings from 15:00 only",
  },
  {
    tier: "Child (こども) — elementary and junior-high pupils",
    price: "¥1,400 – ¥1,650",
    what: "Roughly half the adult rate across the band",
  },
  {
    tier: "Infant (幼児) — 3 and over",
    price: "¥700 – ¥800",
    what: "A quarter of the adult rate",
  },
  {
    tier: "2 and under",
    price: "Free",
    what: "No ticket needed",
  },
  {
    tier: "Disability certificate holder",
    price: "Half the fee above",
    what: "Plus one free carer ticket. A booklet, the Mirairo ID app or My Number Portal all count as proof",
  },
];

const comboRows = [
  {
    combo: "Santa Maria set ticket",
    what: "Admission plus the sailing-ship cruise around Osaka Harbour — about 45 minutes, boarding any day cruise on the hour",
    note: "Weather and sea dependent, and Santa Maria has a maintenance closure from 13 January to 6 February",
  },
  {
    combo: "Captain Line set ticket",
    what: "Admission plus the shuttle boat to Universal City Port — about a 10-minute crossing",
    note: "The link between the aquarium and Universal Studios Japan that skips the subway",
  },
  {
    combo: "LEGOLAND Discovery Center Osaka set ticket",
    what: "Admission plus the indoor LEGO attraction, which is in the same Tempozan complex",
    note: "LEGOLAND does not admit adults-only or children-only groups",
  },
];

/** Hours, entry rules and facilities, each with the official page it came from. */
const factRows = [
  {
    item: "How tickets work",
    value: "Date-and-time entry, dynamic price per date; e-tickets on sale from, in principle, 30 days before",
    source: "kaiyukan.com/info/ticket/",
    checked: CHECKED,
  },
  {
    item: "Ticket window",
    value: "Same-day tickets only, from opening to last admission; your preferred entry time may be gone",
    source: "kaiyukan.com/info/ticket/",
    checked: CHECKED,
  },
  {
    item: "Busiest-date rules",
    value: "¥3,200 adult dates: bookings from 15:00 only. ¥3,500 adult dates: no bookings taken",
    source: "kaiyukan.com/info/group/",
    checked: CHECKED,
  },
  {
    item: "Evening programme",
    value: "17:00–20:00, last admission 19:00; times change by season",
    source: "kaiyukan.com/program/night/",
    checked: CHECKED,
  },
  {
    item: "Re-entry",
    value: "Ended from 15 June 2026 — one entry per ticket",
    source: "kaiyukan.com/about/news/20564.html",
    checked: CHECKED,
  },
  {
    item: "Under 3",
    value: "2 and under free",
    source: "kaiyukan.com/info/ticket/kaiyukan/",
    checked: CHECKED,
  },
  {
    item: "Babies",
    value: "Baby care room (changing beds, formula-water dispenser) and nursing room",
    source: "kaiyukan.com/info/area/",
    checked: CHECKED,
  },
  {
    item: "Lockers and wheelchairs",
    value: "Lockers near the entrance, in Kaiyukan Hall and by the museum shop; wheelchair loan at the information desk",
    source: "kaiyukan.com/info/area/",
    checked: CHECKED,
  },
  {
    item: "Getting there",
    value: "Osakako Station (Chuo Line) Exit 1, approx. 5 min on foot; approx. 1,000 parking spaces",
    source: "kaiyukan.com/info/access/",
    checked: CHECKED,
  },
];

const whoFor = [
  {
    title: "Buy a date-and-time e-ticket if…",
    desc: `You are going at a weekend, in a holiday period, or at all if you can plan it. The operator's own e-ticket fixes your date and entry time and goes on sale from about 30 days before your visit date, and the operator warns that a same-day window ticket may not get you the time you want. Read on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
        <circle cx="12" cy="15" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Go late in the day if…",
    desc: `You want it quieter and you want it cheaper. From 17:00 the lighting and music change for the evening programme, and on a 20:00-closing day the last admission is 19:00. Dates in the top ¥3,200 adult tier only accept reservations from 15:00, so the busiest days push you towards the better half of them anyway. Checked ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    ),
  },
  {
    title: "Buy a combo if…",
    desc: "Your day is the whole Tempozan waterfront rather than the tank. The aquarium's own set tickets add the Santa Maria harbour cruise, the Captain Line shuttle to Universal City, or LEGOLAND next door. Note what is not on that list: the Tempozan Giant Ferris Wheel is a separate operator, so there is no official aquarium-and-wheel ticket.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15h18l-2 5H5z" />
        <path d="M12 3v9M12 3l6 3-6 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Check your date on the price calendar before anything else",
    desc: `Kaiyukan runs dynamic pricing — 価格変動制 in its own words — so the admission is set per date to match demand. There is no single figure to look up: the adult band runs ¥2,700 to ¥3,200, and the operator also notes a ¥3,200 tier that only takes bookings from 15:00 and a ¥3,500 tier that takes none at all. Your date decides which. Read on ${CHECKED}.`,
  },
  {
    title: "Pick an entry time, not just a day",
    desc: `The official e-ticket is a date-and-time ticket (read on ${CHECKED}), with entry set in 15-minute units (read on ${SET_CHECKED}). That is the lever you have over the crowd: the operator holds visitor numbers steady per time slot, and on its busiest dates it only takes bookings from 15:00.`,
  },
  {
    title: "Book from about 30 days out",
    desc: `The operator states that e-tickets go on sale from, in principle, 30 days before your visit date, and that the window sells same-day tickets only, from opening to last admission. So there is a real booking window here — not the two-week midnight scramble a timed Tokyo deck demands, but far from unlimited either. Read on ${CHECKED}.`,
  },
  {
    title: "Use a reseller if you want an English checkout or a foreign card",
    desc: "The official e-ticket system is Japanese-first. Klook's listing is the English-language route to the same admission, taking a foreign card and giving you a code to scan — and it is also where the combo tickets and the Osaka Amazing Pass bundle sit in one place. Confirm the cancellation window and whether your listing is date-specified before you pay, because both are set per listing.",
  },
  {
    title: "Plan to stay inside — re-entry has ended",
    desc: `This is the rule many third-party guides have not caught up with. Kaiyukan ended re-entry on 15 June 2026, stating that it wanted to keep visitor numbers steady within each time slot. Lunch at the Tempozan Marketplace and a second lap afterwards is no longer an option: one entry, one visit. Read on ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much are Osaka Aquarium Kaiyukan tickets?",
    a: `There is no single price, because Kaiyukan prices by date. The bands the operator publishes are ¥2,700–3,200 for an adult (high-school age or 16 and over), ¥1,400–1,650 for a child at elementary or junior-high school, ¥700–800 for an infant aged 3 and over, and free for anyone 2 or under. Holders of a disability certificate pay half, with one carer admitted free. The operator also notes that dates in the ¥3,200 adult tier accept reservations only from 15:00, and that dates in a ¥3,500 tier accept none. Check the price calendar for your own date. All read off kaiyukan.com on ${CHECKED}.`,
  },
  {
    q: "Why does the Kaiyukan ticket price change by date?",
    a: `Because the aquarium chose to. Kaiyukan states that it has introduced 価格変動制 — dynamic pricing — in order to set a "fair price" matching demand and so admit more visitors. In practice that means a quiet Tuesday in February and a Golden Week Saturday are different products at different prices, and no fixed figure on any third-party page can be right for both. It also means the price itself is a crowd signal: if your date is at the top of the band, it is going to be busy. The stated reason read on ${SET_CHECKED}; the variable-price notice re-checked on ${CHECKED}.`,
  },
  {
    q: "What are the Osaka Aquarium Kaiyukan opening hours?",
    a: `They vary by date, and the operator publishes them on a calendar rather than as a fixed schedule — it asks visitors to check their own date, which is the honest instruction to pass on. The pattern to expect is a 10:00 opening and a 20:00 close, with last admission one hour before closing, and closing days are a handful in January and February (read on ${SET_CHECKED}). The evening programme page gives 17:00–20:00 with last admission at 19:00 and notes that times change by season (read on ${CHECKED}). Confirm your date on the calendar before you build a day around it.`,
  },
  {
    q: "Are there coin lockers at Kaiyukan?",
    a: `Yes, in three places: near the aquarium entrance, in Kaiyukan Hall and near the museum shop. The ones in the hall and by the shop can be used without an aquarium ticket, and there are more lockers in the Tempozan Marketplace and under the Ferris wheel. Wheelchairs are lent at the information desk. Read off kaiyukan.com/info/area/ on ${CHECKED}.`,
  },
  {
    q: "Are Kaiyukan tickets more expensive over the New Year holidays?",
    a: `Check the calendar for your date, because the official pages checked on ${CHECKED} do not print November-to-New-Year prices as text — each date's figure appears only on the price calendar. What the operator does publish is the shape of the top end: adult dates at ¥3,200 accept bookings from 15:00 only, and adult dates at ¥3,500 accept no bookings at all. If your date is in a holiday period, look it up as soon as e-tickets open, about 30 days ahead.`,
  },
  {
    q: "How long do you need at Kaiyukan?",
    a: `Allow two to three hours. The official pages checked on ${CHECKED} do not give a visit length, so that figure is planning advice rather than an operator number: the route runs you up to the top floor and then spirals down past the tanks in one direction, so you walk it once rather than wandering. Two hours is a brisk visit; three lets you stop at the Pacific tank for the whale sharks. Since re-entry ended on 15 June 2026, plan the whole visit as one block — you cannot step out and come back.`,
  },
  {
    q: "Do you need to book Kaiyukan tickets in advance?",
    a: `Strongly advised rather than mandatory, and for two separate reasons. The operator recommends buying its date-and-time e-ticket in advance and warns that a same-day ticket may not get you in at the time you want — the window sells same-day tickets only, and you may have to queue for one. Beyond the queue, booking is how you pick an entry time, which is the main thing you control. E-tickets open from, in principle, 30 days before your visit date. Read on ${CHECKED}.`,
  },
  {
    q: "What is the quietest time to visit Kaiyukan?",
    a: `Late in the day, and the ticketing structure points you there. From 17:00 the lighting and music change for the evening programme — the same tanks, a different experience — and the last admission on a 20:00-closing day is 19:00. The price calendar backs it up: dates in the top ¥3,200 adult tier accept bookings only from 15:00, which is the operator steering demand away from the morning on its busiest days. If you have a choice of date at all, a weekday out of the school holidays beats any time-of-day trick. Checked ${CHECKED}.`,
  },
  {
    q: "How do you get to Osaka Aquarium Kaiyukan?",
    a: `The main route is Osaka Metro's Chuo Line to Osakako Station — officially 大阪港駅（海遊館前）, "Osakako, in front of Kaiyukan" — then Exit 1 and about a five-minute walk. From the Universal Studios side, the Captain Line shuttle boat lands at Kaiyukan Nishi Hatoba, right at the door. Osaka City Bus stops at Tempozan Harbor Village and Nankai Bus at Kaiyukan (Tempozan), and there are around 1,000 parking spaces. All read off kaiyukan.com/info/access/ on ${CHECKED}.`,
  },
  {
    q: "Can you re-enter Kaiyukan if you go out for lunch?",
    a: `No, not any more — and this is the detail most guides still get wrong. Kaiyukan announced that it would end re-entry from 15 June 2026, giving as its reason that it wanted to hold visitor numbers steady within each time slot so people could look at the exhibits at their own pace. Eat before you go in or after you come out; the Tempozan Marketplace next door is where most people do, and your admission ticket also works as a discount coupon there. Read on ${CHECKED}.`,
  },
  {
    q: "Is Kaiyukan included in the Osaka Amazing Pass?",
    a: "No, and it is the single most expensive omission on the pass. The Osaka Amazing Pass covers unlimited Osaka Metro and city buses plus free entry to more than 40 facilities — Osaka Castle, the Umeda Sky Building, Tsutenkaku, the river cruises — but not Kaiyukan and not Universal Studios Japan. The practical consequence is scheduling: give Kaiyukan its own half-day rather than buying a second pass day for it. If you want both in one purchase, Klook sells an Amazing Pass and Kaiyukan combo, which is the only single checkout that covers the two.",
  },
  {
    q: "Can you combine Kaiyukan with the Tempozan Ferris wheel or the Santa Maria?",
    a: `Partly, and the distinction matters when you are buying. The aquarium sells official set tickets for three things: the Santa Maria, a sailing-ship replica that cruises Osaka Harbour in about 45 minutes with day sailings on the hour; the Captain Line shuttle to Universal City Port, about ten minutes across the water; and LEGOLAND Discovery Center Osaka in the same complex. The Tempozan Giant Ferris Wheel — 112.5 metres, in the same Harbor Village — is not on that list and is run by a separate operator, so there is no official aquarium-and-wheel ticket. Buy that one on the day. Set tickets read off kaiyukan.com on ${SET_CHECKED}; the wheel's 112.5 m height on ${CHECKED}.`,
  },
  {
    q: "Is Kaiyukan worth it with small children?",
    a: `It is one of the easier major attractions in Osaka for a family, with the caveats being practical rather than about enjoyment. Entry is free under 3 and ¥700–800 for a 3-year-old and up, the route is a single one-way walk rather than a maze, and the headline exhibits — the whale sharks in the Pacific tank, the Antarctic penguins — are the ones small children actually want. The building has a baby care room with changing beds and a formula-water dispenser, plus a nursing room. The things to plan around are the end of re-entry, which makes the visit one unbroken block, and the fact that the shortest realistic stay is about two hours. The official pages checked do not set out stroller rules, so ask at the entrance if you need to know before you go. Prices and facilities read on ${CHECKED}.`,
  },
  {
    q: "Is Kaiyukan a good rainy-day option in Osaka?",
    a: "One of the best, with one gap. The aquarium is entirely indoors and the Tempozan Marketplace next door is covered, so a wet afternoon costs you nothing inside — but Exit 1 at Osakako is still a five-minute walk away, and the two obvious pairings, the Santa Maria harbour cruise and the Ferris wheel, are exactly the parts of a Tempozan day the rain spoils. The Santa Maria in particular sails subject to weather and sea conditions. If the forecast is bad, buy the admission alone and leave the water for another day.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/osaka-aquarium-kaiyukan-tickets") },
});

const TITLE = "Osaka Aquarium Kaiyukan Tickets (2026): Price, Hours, Slots";
const DESC =
  "Kaiyukan ticket price 2026: Osaka aquarium tickets are dated and priced by day, adult ¥2,700–3,200, child ¥1,400–1,650, under 3 free. Hours and re-entry.";

export default function OsakaAquariumKaiyukanTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-aquarium-kaiyukan-tickets" />
        {hreflangLinks("/guides/attractions/osaka-aquarium-kaiyukan-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-aquarium-kaiyukan-tickets" />
        <meta property="og:description" content={DESC} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
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
              route: "/guides/attractions/osaka-aquarium-kaiyukan-tickets",
              headline: TITLE,
              description: DESC,
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
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Osaka Aquarium Kaiyukan Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/osaka-aquarium-kaiyukan-tickets",
                },
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
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Osaka Aquarium Kaiyukan Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka Aquarium Kaiyukan Tickets (2026):<br />Price, Hours and Time Slots
          </h1>
          <p className={styles.heroSubtitle}>
            Kaiyukan tickets are dated and priced by day: ¥2,700–3,200 for an adult, with your
            entry time chosen when you book. Below: the official price bands, the best time to go,
            how long to allow, and the re-entry rule that changed in June 2026.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official price bands, dated", "Re-entry rule explained"].map((t) => (
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

        {/* Answer-first opening paragraph */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>Osaka Aquarium Kaiyukan tickets are date-and-time tickets with a price that changes
            by date:</strong> an adult pays <strong>¥2,700–¥3,200</strong>, a child at elementary or
            junior-high school <strong>¥1,400–¥1,650</strong>, an infant aged 3 and over{" "}
            <strong>¥700–¥800</strong>, and anyone 2 or under nothing (kaiyukan.com, checked {CHECKED}).
            It is about a five-minute walk from Exit 1 of Osakako Station on the Chuo Line, and two to
            three hours is enough for the one-way route. On the busiest dates the price sits at the top
            of the band and the booking window narrows — ¥3,200 adult dates take reservations from
            15:00 only and ¥3,500 dates take none — so pick your date and entry time and buy the
            e-ticket ahead, which goes on sale about 30 days before.
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
                <p className={styles.verdictStatLabel}>Adult admission</p>
                <p className={styles.verdictStatValue}>¥2,700–3,200, by date</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>How long to allow</p>
                <p className={styles.verdictStatValue}>2–3 hours, one way round</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting there</p>
                <p className={styles.verdictStatValue}>Osakako Exit 1, 5 min walk</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Booking</p>
                <p className={styles.verdictStatValue}>Dated e-ticket, 30 days ahead</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Osaka Aquarium Kaiyukan tickets do not have one price. The
              aquarium runs dynamic pricing, so an adult pays somewhere between{" "}
              <strong>¥2,700 and ¥3,200</strong> depending on the date, a school-age child{" "}
              <strong>¥1,400–1,650</strong>, an infant of 3 and over <strong>¥700–800</strong>, and
              under-3s nothing. Buy the official date-and-time e-ticket, which fixes your entry time
              and opens about <strong>30 days</strong> before your visit — the ticket window sells
              same-day only, so that is also how you skip the queue.
              Allow <strong>two to three hours</strong> and plan it as one unbroken block:{" "}
              <strong>re-entry ended on 15 June 2026</strong>. It is a five-minute walk from Exit 1
              at Osakako on the Chuo Line, and it is <strong>not</strong> covered by the Osaka
              Amazing Pass. All read off kaiyukan.com on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Kaiyukan tickets on Klook →
              </KlookLink>
              <KlookLink href={osakaAmazingPassKaiyukanCombo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                With the Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Osaka Aquarium Kaiyukan?</h2>
          <p className={styles.bodyText}>
            Kaiyukan is the aquarium at Tempozan, on the water in Osaka&apos;s Minato ward, and it is
            built around one idea: a walk through the habitats of the Pacific Rim, with the
            enormous Pacific tank and its whale sharks at the centre of it. The operator puts
            the collection at roughly <strong>620 species and 30,000 creatures</strong>, which
            includes the Antarctic penguins most visitors come out talking about.
          </p>
          <p className={styles.bodyText}>
            Three things make the ticket worth thinking about rather than just buying. The price
            moves with the date, so there is a cheap version of this visit and an expensive one. The
            entry time is fixed when you book, which is the only real control you have over the
            crowd. And since June 2026 you cannot leave and come back, so the visit has to be
            planned as one block rather than split around lunch. The rest of this page is those
            three decisions and the numbers behind them.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How much is Osaka Aquarium Kaiyukan in 2026?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            An adult ticket costs ¥2,700 to ¥3,200 and a child&apos;s ¥1,400 to ¥1,650, depending on
            the date — Kaiyukan states that admission is a variable price (入館料は変動価格), and the
            figure for your day appears on its price calendar. These are the published bands, checked
            on {CHECKED}:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Who", "Admission", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.tier}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tier}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Bands read off kaiyukan.com on {CHECKED} — the group-booking page is the one that prints
            them as text, while the main ticket page shows the exact figure only once you pick a
            date on its calendar. The operator adds two notes worth knowing: dates in the ¥3,200
            adult tier accept reservations from 15:00 only, and dates in a ¥3,500 tier accept no
            reservations at all. The pages checked do not print November-to-New-Year prices as text,
            so look up holiday dates on the calendar itself. Subject to change — confirm your own date
            before you buy. For admissions across the rest of Japan, each with its own check date, see
            our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check Kaiyukan tickets for your date on Klook →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Klook&apos;s price also moves by date, so check the listing for your day and its
            cancellation terms before you pay.
          </p>
        </section>

        {/* Official facts table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Rules and facilities</span>
          <h2 className={styles.sectionTitle}>What Are the Kaiyukan Ticket Rules, Hours and Facilities?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Entry is by date and time, re-entry has ended, and the evening runs to 20:00 with last
            admission at 19:00. Each line below is from the official page named, with the date it was
            checked:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Official", "Source", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {factRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.8rem" }}>{row.source}</td>
                      <td style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>{row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which ticket */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which ticket</span>
          <h2 className={styles.sectionTitle}>Which Kaiyukan Ticket Should You Buy?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kaiyukan admission on Klook →
            </KlookLink>
            <KlookLink href={kaiyukanLegolandCombo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              With LEGOLAND next door →
            </KlookLink>
            <KlookLink href={kaiyukanNifrelCombo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              With NIFREL at Expocity →
            </KlookLink>
          </div>
        </section>

        {/* Hours */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hours and crowds</span>
          <h2 className={styles.sectionTitle}>What Is the Best Time to Visit Kaiyukan?</h2>
          <p className={styles.bodyText}>
            <strong>Late afternoon on a weekday outside the school holidays.</strong> The official pages
            checked on {CHECKED} do not publish a crowd forecast, but the booking rules point the same
            way: on its top-priced adult dates (¥3,200) Kaiyukan takes reservations from 15:00 only, and
            the evening programme runs <strong>17:00–20:00 with last admission at 19:00</strong>, with
            times changing by season.
          </p>
          <p className={styles.bodyText}>
            Opening hours sit on the same calendar as the prices, published per date, and the site asks
            you to check your own day. The shape to expect is a <strong>10:00 opening and a 20:00 close,
            with last admission an hour before</strong>, and closing days are a small number of dates in
            January and February (read on {SET_CHECKED}). From 17:00 the lighting and music change for the
            evening programme — the same ticket and the same tanks, in the half of the day the price
            calendar steers you towards on its busiest dates.
          </p>
        </section>

        {/* Time needed */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Time needed</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need at Kaiyukan?</h2>
          <p className={styles.bodyText}>
            <strong>Two to three hours.</strong> The official pages checked on {CHECKED} do not give a
            visit length, so treat that as planning advice: the route takes you to the top of the
            building and then down past the tanks in one direction, so you walk it once. Two hours is a
            brisk lap; three leaves time at the Pacific tank for the whale sharks and a stop at Cafe
            R.O.F, which sits behind the Japan Trench tank with some seats facing it.
          </p>
          <p className={styles.bodyText}>
            That leaves half a day. Tempozan is out on the bay, so the simplest pairing is the other
            half of the waterfront — the Ferris wheel or the Santa Maria — or Universal Studios Japan
            across the water. Our{" "}
            <Link href="/guides/attractions/osaka-2-day-itinerary">Osaka 2-day itinerary</Link> puts
            Kaiyukan into a full day with the routing worked out, and the{" "}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">Osaka and Kyoto 3-day
            itinerary</Link> uses it as the rainy-day or child-led option for Day 3.
          </p>
        </section>

        {/* Re-entry */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Re-entry</span>
          <h2 className={styles.sectionTitle}>Can You Re-enter Kaiyukan?</h2>
          <p className={styles.bodyText}>
            <strong>No.</strong> Kaiyukan ended re-entry from <strong>15 June 2026</strong>, announced on
            21 May 2026 as one of its measures to keep the number of visitors per time slot steady so that
            people can look at the exhibits at their own pace (kaiyukan.com/about/news/20564.html, checked{" "}
            {CHECKED}).
          </p>
          <p className={styles.bodyText}>
            Eat before you go in or after you come out. The drink stand SEA SAW is in the area before the
            ticket gate, the Tempozan Marketplace is next door, and lockers in Kaiyukan Hall and by the
            museum shop can be used without a ticket — useful for leaving bags before you go through.
          </p>
        </section>

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Is Kaiyukan Easy With Babies and Small Children?</h2>
          <p className={styles.bodyText}>
            <strong>Yes, on the official facilities list.</strong> Anyone 2 or under goes free, and the
            building has a <strong>baby care room</strong> with changing beds and a formula-water
            dispenser, plus a <strong>nursing room</strong>. Wheelchairs are lent at the information
            desk. All read off kaiyukan.com on {CHECKED}. The official pages checked do not set out
            stroller rules, so ask at the entrance if that decides your day.
          </p>
          <p className={styles.bodyText}>
            The plan for a family is the same as anyone&apos;s, only more so: book an entry time so a
            small child is not standing in the same-day queue, and remember that with re-entry gone a nap
            or a meal has to happen before or after, not halfway through. If the trip is built around
            children, our{" "}
            <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka guide</Link>{" "}
            compares bases, including Universal City, which is a short Captain Line crossing from the
            aquarium.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Osaka Aquarium Kaiyukan Tickets</h2>
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
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Kaiyukan tickets on Klook →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Same day, same booking"
          heading="What Else Should You Book for a Kaiyukan Day?"
          intro="Two to three hours at the aquarium leaves the rest of the day open, and the pass that skips Kaiyukan still pays on the other day. These book on the same Klook account as the ticket."
          items={kaiyukanSameDayPrep}
        />

        {/* Combos */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Combos</span>
          <h2 className={styles.sectionTitle}>What Can You Combine Kaiyukan With?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The aquarium sells official set tickets for exactly three things. Prices for all of them
            sit on the same date calendar as the admission, so there is no fixed figure to quote:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Set ticket", "What it adds", "Worth knowing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comboRows.map((row) => (
                    <tr key={row.combo}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.combo}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Note what is <strong>not</strong> on that list. The <strong>Tempozan Giant Ferris
            Wheel</strong> — 112.5 metres above the ground and one of the largest in the world, in
            the same Harbor Village as the aquarium — is run by a separate operator, so there is no
            official aquarium-and-wheel combination. Buy that ticket on the day. The{" "}
            <strong>Captain Line</strong> set ticket is the one worth a second look if your trip
            includes Universal Studios Japan: it is a ten-minute boat crossing from Universal City
            Port straight to the aquarium&apos;s door, which turns two attractions on opposite sides
            of the water into one afternoon. Our{" "}
            <Link href="/guides/attractions/usj-tickets-express-pass">USJ tickets and Express Pass guide</Link>{" "}
            covers what the park itself needs booking-wise. Set tickets read off kaiyukan.com on{" "}
            {SET_CHECKED}; the wheel&apos;s 112.5 m height re-checked on {CHECKED}.
          </p>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Kaiyukan?</h2>
          <p className={styles.bodyText}>
            Osaka Metro&apos;s <strong>Chuo Line to Osakako Station</strong>, which the aquarium
            calls 大阪港駅（海遊館前） — &quot;Osakako, in front of Kaiyukan&quot; — then{" "}
            <strong>Exit 1 and about a five-minute walk</strong>. That is the route almost everyone
            takes, and the Chuo Line runs through the middle of the city, so Hommachi is a direct
            ride and most other central stations are one change away. Our{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka guide</Link>{" "}
            explains how the Chuo Line fits the rest of the network, and the{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass guide</Link> works out
            whether a day pass beats tapping an IC card on a day like this one.
          </p>
          <p className={styles.bodyText}>
            Three other ways in, all from the operator&apos;s own access page: the{" "}
            <strong>Captain Line</strong> shuttle boat from Universal City Port, which lands at
            Kaiyukan Nishi Hatoba right at the entrance; Osaka City Bus to Tempozan Harbor Village or
            Nankai Bus to Kaiyukan (Tempozan), both a few steps from the door; and by car, with around
            1,000 parking spaces. All read on {CHECKED}.
          </p>
        </section>

        {/* The pass question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The pass question</span>
          <h2 className={styles.sectionTitle}>Is Kaiyukan on the Osaka Amazing Pass?</h2>
          <p className={styles.bodyText}>
            <strong>No</strong> — and this is the single most expensive thing the Osaka Amazing Pass
            leaves out. The pass bundles unlimited Osaka Metro and city bus travel with free entry to
            more than 40 facilities, including Osaka Castle, the Umeda Sky Building observatory,
            Tsutenkaku and the river cruises. Kaiyukan is not one of them, and neither is Universal
            Studios Japan. Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link>{" "}
            has the full inclusion list and the break-even arithmetic.
          </p>
          <p className={styles.bodyText}>
            The consequence is about scheduling rather than money. A city day that takes in three or
            four pass facilities is where the pass earns its price; a day built around Kaiyukan is
            not, so buying a second pass day for it wastes most of what you paid for. The shape that
            works — and the one our{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka guide</Link>{" "}
            lays out across a two or three-day trip — is one pass day for the city and one unpassed
            day for the blockbuster. If you would rather settle both in a single checkout anyway,
            Klook sells the Amazing Pass with a Kaiyukan ticket attached, which is the only product
            that does.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={osakaAmazingPassKaiyukanCombo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Amazing Pass + Kaiyukan on Klook →
            </KlookLink>
            <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Just the aquarium →
            </KlookLink>
          </div>
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

        <KlookTourPicks
          heading="The Rest of an Osaka Day"
          intro="Kaiyukan takes two to three hours of a day, which leaves the other half open — and Tempozan is a long way from the parts of Osaka most people want to see. Both of these cover the Castle, Dotonbori and Shinsekai end of the city. Klook prices change by date, so open a listing for the current figure and the meeting point."
          tours={[osakaSkyVistaHalfDayBusTour, osakaPrivateWalkingTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 3 Nov 2026: the first Okinawa page — for a reader adding the islands to the trip. */}
            <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Okinawa Churaumi Aquarium Tickets 2026: Price, Hours, Access</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-castle-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 21V9l2-2 2 2V5l4-3 4 3v4l2-2 2 2v12z" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Castle Tickets (2026): Prices, Hours and What the Pass Covers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/umeda-sky-building-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="5" height="15" />
                  <rect x="15" y="6" width="5" height="15" />
                  <path d="M4 6h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Umeda Sky Building Tickets (2026): Prices, Hours and the Best Time to Go</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
                  <path d="M12 6v12" strokeDasharray="2 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass 2026: ¥3,500 Price, Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Osaka (2026): Subway, Trains &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="16" height="12" rx="2" />
                  <path d="M4 11h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass 2026: Price, 1-Day vs 2-Day &amp; Enjoy Eco Card Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
                  <path d="M9 10h6M9 14h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>More Things to Do in Japan →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Pick the slot, not just the day</h2>
            <p className={styles.ctaBannerDesc}>
              The price moves by date and the crowd moves by hour, so the entry time is the decision
              worth making. Book ahead for an English checkout, a foreign card that works, and a
              code to scan instead of a window queue — and check the cancellation window shown for
              your own date before you pay.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={osakaAquariumKaiyukanTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kaiyukan tickets on Klook →
              </KlookLink>
              <KlookLink href={osakaAmazingPassKaiyukanCombo.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                With the Amazing Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
