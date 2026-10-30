import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  arimaHimejiRokkoDayTour,
  himejiCastleKokoenGuidedTour,
  himejiCastleOsakaBusTour,
  himejiCastleTownBikeTour,
  himejiEngyojiKokoenDayTour,
  jrKansaiAreaPass,
  jrKansaiWideAreaPass,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA links. The headline CTA is the castle-first coach day out of Osaka (6.5%
// tours band); the rail passes are the 5% passes band and the independent
// traveller's route in. There is no Klook admission ticket for Himeji Castle —
// see the block comment in lib/klook-links.ts.
const TOUR_URL = himejiCastleOsakaBusTour.url;
const GUIDED_URL = himejiCastleKokoenGuidedTour.url;
const PASS_URL = jrKansaiAreaPass.url;
const WIDE_PASS_URL = jrKansaiWideAreaPass.url;

// Every figure on this page was read on 25 October 2026:
//  - admissions, opening hours, closed days, the Koko-en combined ticket, the
//    annual pass and the 1,000-per-hour cap on the keep from himejicastle.jp and
//    Himeji City's own 姫路城ご利用案内 page (city.himeji.lg.jp/castle/0000007671);
//  - the 1.5–2 hour visit length, the hour-long queue in peak season and the
//    90-day digital-ticket window from the castle's own FAQ (himejicastle.jp/en/faq);
//  - the Koko-en ¥400 admission and the ticket-set discount from Himeji City's
//    tourism site, visit-himeji.com;
//  - every journey time from visit-himeji.com's own access page;
//  - the loop-bus fares, the winter weekends-only timetable and the 10% castle
//    discount from Himeji City's 城周辺観光ループバス page;
//  - the WEST QR Kansai Area Pass prices from westjr.co.jp, cross-checked against
//    our own kansai-area-pass guide, which was built from the same page today.
const CHECKED = checkedLabel("2026-10-25");

const ADULT = "¥2,500";
const COMBO = "¥2,600";
const KOKOEN = "¥400";

const accessRows = [
  {
    route: "Osaka Station → Himeji",
    train: "JR Special Rapid Service (JR Kobe Line)",
    time: "1 hr 1 min",
    note: "The default. One train, no changes, and the service the Kansai Area Pass covers. Himeji is the western terminus of the special rapid, so you can sit still the whole way.",
  },
  {
    route: "Shin-Osaka → Himeji",
    train: "Sanyo Shinkansen",
    time: "28 min",
    note: "Less than half the time, but it needs a shinkansen fare on top and it starts at Shin-Osaka rather than Osaka Station. The Kansai Area Pass does not cover it; the WIDE pass does.",
  },
  {
    route: "Kyoto Station → Himeji",
    train: "JR Special Rapid Service",
    time: "1 hr 25 min",
    note: "Long but direct — the same special rapid, further back up the line. Worth knowing before you build a Kyoto day around it.",
  },
  {
    route: "Kyoto Station → Himeji",
    train: "Sanyo Shinkansen",
    time: "44 min",
    note: "This is the one that makes Himeji realistic from Kyoto. It roughly halves the outbound and the return, which is two hours back in your day.",
  },
  {
    route: "Sannomiya (Kobe) → Himeji",
    train: "JR Special Rapid Service",
    time: "40 min",
    note: "The shortest approach of all. If you are based in Kobe, Himeji is barely a day trip — it is an afternoon.",
  },
  {
    route: "Osaka-Umeda → Sanyo-Himeji",
    train: "Hanshin / Sanyo direct limited express",
    time: "1 hr 27 min",
    note: "The private-railway alternative, arriving at Sanyo-Himeji rather than JR Himeji. Slower, and no JR pass touches it. Only useful if you are already on the Hanshin network.",
  },
  {
    route: "Tokyo Station → Himeji",
    train: "Tokaido / Sanyo Shinkansen",
    time: "3 hr 10 min",
    note: "Not a day trip from Tokyo. It is, however, a good stop on the way west — Himeji Station is on the shinkansen line, so the castle costs you a few hours rather than a day.",
  },
  {
    route: "Kansai Airport (KIX) → Himeji",
    train: "Direct bus to Himeji Station",
    time: "2 hr 10 min",
    note: "The airport coach, for an arrival or departure day. With luggage and a 16:00 last entry, treat it as transport rather than as a plan to see the castle.",
  },
];

const priceRows = [
  {
    ticket: "Himeji Castle, adult (18 and over)",
    price: ADULT,
    hours: "09:00–17:00, last admission 16:00",
    note: "Raised from ¥1,000 on 1 March 2026. This is the rate for everyone who does not live in Himeji City, including every overseas visitor.",
  },
  {
    ticket: "Himeji Castle, under 18",
    price: "Free",
    hours: "As above",
    note: "Free for everyone under 18 as of the same change — it replaced the old ¥300 school-age ticket. Bring something that shows the age if they look borderline.",
  },
  {
    ticket: "Himeji Castle, Himeji residents (18 and over)",
    price: "¥1,000",
    hours: "As above",
    note: "The resident rate, not a tourist rate. Himeji operates a resident/non-resident price, which is why you will still see ¥1,000 in older guides.",
  },
  {
    ticket: "Himeji Castle + Koko-en combined ticket",
    price: COMBO,
    hours: "Both open 09:00, castle last entry 16:00",
    note: `${COMBO} against ${ADULT} plus ${KOKOEN} bought separately — ¥300 less. Sold at either the castle or the Koko-en ticket window.`,
  },
  {
    ticket: "Koko-en garden on its own, adult",
    price: KOKOEN,
    hours: "09:00, closing varies by season",
    note: "Also free for under-18s. The garden sits immediately west of the castle on the site of the old western residences.",
  },
  {
    ticket: "Himeji Castle annual pass",
    price: "¥5,000",
    hours: "As above",
    note: "Two visits pay for it. Irrelevant for a day trip, useful to know if you are in Kansai for a long stay.",
  },
  {
    ticket: "Castle loop bus, single ride / 1-day pass",
    price: "¥210 / ¥600 adult",
    hours: "09:00–16:00 weekdays, 09:00–17:00 weekends",
    note: "¥110 and ¥300 for a child. The 1-day pass also takes 10% off Himeji Castle and Koko-en. December to February it runs weekends and holidays only.",
  },
];

const planRows = [
  {
    plan: "Morning from Osaka, back for lunch in Kobe",
    shape: "08:00-ish special rapid out, 09:00 at the gate, back on a train by about 12:30",
    what: "The keep, the walk up through the baileys, and nothing else.",
    verdict: "The sharpest version. Arriving at opening is the single biggest thing you can do about the queues, and it leaves Kobe or Osaka open for the afternoon.",
  },
  {
    plan: "Full day: castle, Koko-en and the castle town",
    shape: "Out mid-morning, back on an evening train",
    what: `The keep (1.5–2 hours), the ${COMBO} combined ticket for Koko-en next door, and the moat-side streets. Lunch in the covered arcade between the station and the castle.`,
    verdict: "The version most people should book. The garden is a short walk and ¥100 on the combined ticket, and it is the part of Himeji that is never crowded.",
  },
  {
    plan: "Himeji plus Mt. Shosha (Engyoji)",
    shape: "A full day, with a ropeway",
    what: "The castle in the morning and the mountain-top Engyoji temple complex in the afternoon, reached by bus and ropeway from the station side.",
    verdict: "The best full day in Himeji, and the one that justifies the travel time from Kyoto. Tight on public transport inside the castle's opening hours — this is where a booked itinerary earns its keep.",
  },
  {
    plan: "Himeji on a wider Hyogo coach day",
    shape: "A join-in day out of Osaka",
    what: "Himeji Castle with Arima Onsen and the Mt. Rokko deck, or with Koko-en and Kobe Harborland.",
    verdict: "Pick this if Himeji is the headline but not the whole day. None of these combinations works on trains and buses inside one day.",
  },
  {
    plan: "A stop on the way west",
    shape: "Two shinkansen legs with the castle in between",
    what: "Coin-locker the bags at Himeji Station, walk 15 minutes up Otemae-dori, do the keep, come back.",
    verdict: "Genuinely efficient if you are going Osaka → Hiroshima. Himeji Station is on the shinkansen and the castle is visible from the concourse.",
  },
];

const compareRows = [
  {
    option: "Train + pay at the castle window",
    cost: `${ADULT} admission, plus the rail fare`,
    gets: "Complete control of the timings, and nothing that can be sold out — the window sells tickets all day.",
    pick: "The default from Osaka or Kobe. The only thing it does not protect you from is the queue at the keep entrance.",
  },
  {
    option: "Train + the castle's own time-slot digital ticket",
    cost: `${ADULT}, bought direct`,
    gets: "A dated, time-slotted entry bought up to 90 days ahead, by card or PayPay, up to five people per transaction.",
    pick: "Spring and autumn weekends. Read the caveat first: it is for a smoother gate, not for priority inside.",
  },
  {
    option: "WEST QR Kansai Area Pass (1–4 days)",
    cost: "¥2,700 / ¥4,700 / ¥5,500 / ¥6,700 adult",
    gets: "Unlimited JR West special rapid, rapid and local trains around Osaka, Kyoto, Kobe, Nara and Himeji, plus the HARUKA from Kansai Airport. Not the shinkansen.",
    pick: "If Himeji is one of several JR day trips in the same few days. One Himeji return alone does not pay for it.",
  },
  {
    option: "Kansai WIDE Area Pass (5 days)",
    cost: "Check the listing for your date",
    gets: "The same conventional network plus Sanyo Shinkansen seats between Shin-Osaka and Okayama — which is the 28-minute route into Himeji.",
    pick: "If you want the shinkansen for Himeji and you are also going to Okayama, Kurashiki or Tottori.",
  },
  {
    option: "Join-in coach day from Osaka",
    cost: "Check the listing for your date",
    gets: "The transport, a guide and a fixed itinerary — castle-only, or castle plus Engyoji, Arima Onsen or Kobe.",
    pick: "If you want Himeji plus something that is not realistic on timetables, or you simply do not want to work out trains.",
  },
  {
    option: "Guided tour starting in Himeji",
    cost: "Check the listing for your date",
    gets: "Three and a half hours of the castle and Koko-en with a guide, starting at Himeji rather than at your hotel.",
    pick: "If you are taking the train anyway and want the history rather than the logistics. Check whether admission is in the price.",
  },
];

const faqItems = [
  {
    q: "How do you do a Himeji Castle day trip from Osaka?",
    a: `Take a JR Special Rapid Service from Osaka Station on the JR Kobe Line: Himeji City's own access page gives 1 hour 1 minute, with no changes, and Himeji is the end of the line so you cannot overshoot. From Shin-Osaka the Sanyo Shinkansen does it in 28 minutes. The castle is about a 15-minute walk straight up Otemae-dori from the station, or a ¥210 ride on the castle loop bus. Admission is ${ADULT} for an adult, free under 18, and the gate shuts at 16:00 even though the castle closes at 17:00 — so aim to be there in the morning. Times and prices checked ${CHECKED}.`,
  },
  {
    q: "How much is Himeji Castle admission in 2026?",
    a: `${ADULT} for an adult aged 18 or over, and free for everyone under 18. That is a change, not a typo: the adult rate went from ¥1,000 to ${ADULT} on 1 March 2026, and the old ¥300 child ticket was abolished at the same time. Himeji residents aged 18 and over still pay ¥1,000, and a group of 30 or more adults pays ¥2,000 each. The combined ticket with the Koko-en garden next door is ${COMBO}, and an annual pass is ¥5,000. Read off himejicastle.jp and Himeji City's own visitor-information page on ${CHECKED}.`,
  },
  {
    q: "What are Himeji Castle's opening hours and last admission?",
    a: `09:00 to 17:00, with last admission at 16:00, and closed on 29 and 30 December. One thing to be careful about: a lot of pages still quote a summer extension to 18:00 between late April and the end of August. As of ${CHECKED} neither himejicastle.jp nor Himeji City's own page lists any seasonal extension — both give 09:00–17:00 flat — so plan around a 16:00 cut-off and treat anything later as a bonus you confirm on the day.`,
  },
  {
    q: "How long do you need at Himeji Castle?",
    a: "The castle's own FAQ says around 1.5 to 2 hours to look around, and that is honest: the route is a one-way climb up through the baileys, six floors of the keep on steep wooden stairs, and back down. Add the Koko-en garden and you are at three hours. Add the queue — the same FAQ warns of waits of around an hour in the crowded season — and a spring Saturday can take four. Budget half a day for the castle alone and a full day if you want Mt. Shosha as well.",
  },
  {
    q: "Do you need to book Himeji Castle tickets in advance?",
    a: `Not to get in — the ticket window sells all day and does not run out. What booking ahead buys you is a time slot: Himeji sells a date-and-time digital ticket from 90 days before your visit, by credit card or PayPay, up to five people per transaction. Read the city's own caveat before you rely on it, though. It exists to speed up the gate and explicitly does not guarantee priority once you are inside, because the keep itself admits 1,000 people an hour and you can still queue at its entrance on a busy day. Checked ${CHECKED}.`,
  },
  {
    q: "Is the Himeji Castle and Koko-en combined ticket worth it?",
    a: `Yes, on the arithmetic alone. The combined ticket is ${COMBO}; the castle is ${ADULT} and Koko-en is ${KOKOEN} separately, so it saves ¥300 — meaning the garden effectively costs ¥100 if you were going to see the castle anyway. Koko-en is a walled set of nine Edo-style gardens on the site of the castle's former western residences, a couple of minutes' walk from the castle exit, and it is the quiet half of the day. Buy it at either ticket window. If you also hold a loop-bus 1-day pass, that takes 10% off both.`,
  },
  {
    q: "Can you visit Himeji Castle as a day trip from Kyoto?",
    a: "Yes, but take the shinkansen. Himeji City gives 1 hour 25 minutes by JR special rapid from Kyoto Station and 44 minutes by Sanyo Shinkansen — so the slow option costs you nearly three hours of return travel against a 16:00 last entry, and the fast one about an hour and a half. From Kyoto, Himeji is a shinkansen day trip or it is a long one. If you are weighing it against other options out of Kyoto, the Sagano area and Nara both cost a fraction of the travel time.",
  },
  {
    q: "What is the best time of day to visit Himeji Castle?",
    a: "Opening, at 09:00. The constraint is not the grounds, which are large, but the keep: it admits 1,000 people an hour, so the queue builds through the morning and peaks in the middle of the day when the coach tours and the shinkansen arrivals overlap. The other good window is the last hour before the 16:00 cut-off, with the caveat that you are then climbing the keep against the clock. Avoid arriving at 13:00 on a weekend in spring.",
  },
  {
    q: "What is Himeji Castle like in cherry blossom season?",
    a: `Spectacular and extremely busy. Himeji City's own warning for late March to early April is that the castle, the surrounding roads and the car parks are busy from before opening to the end of the day — not at a particular hour, all day. The Nishinomaru garden inside the walls is the headline spot, and the castle runs separately ticketed spring evening openings in the Nishinomaru; the 2026 edition ran 27 March to 5 April with entry until 20:30. As of ${CHECKED} the 2027 dates had not been published, so check the castle's own event pages before you build a trip around them.`,
  },
  {
    q: "Is Himeji Castle still worth it at ¥2,500?",
    a: "If you are going to see one castle in Japan, yes — and that is the real framing. Himeji is the only one of Japan's twelve surviving original keeps that is also a complete hilltop complex with its baileys, gates and walls intact, which is why it was Japan's first UNESCO World Heritage site and why it has never been rebuilt in concrete. Osaka Castle is a 1931 reconstruction with a lift. At ¥2,500 it is now one of the more expensive single admissions in Japan, so the honest answer is: worth the money for the castle, not worth the money as one tick on a list of six things.",
  },
  {
    q: "Does the Kansai Area Pass cover the trip to Himeji?",
    a: "It covers the slow way, not the fast way. The current WEST QR Kansai Area Pass — ¥2,700 for one day up to ¥6,700 for four, on JR West's own figures — includes the special rapid, rapid and local trains to Himeji, which is the 1-hour-1-minute service from Osaka. It does not include the Sanyo Shinkansen. For that you need the Kansai WIDE Area Pass, which adds shinkansen seats between Shin-Osaka and Okayama. One Himeji return on its own will not pay for either; two or three JR day trips in the same window will.",
  },
  {
    q: "Is Himeji Castle suitable for children, or with luggage?",
    a: "Children are free and the grounds are easy, but the keep is not: it is six storeys of steep, narrow wooden stairs with no lift, and the castle's own FAQ notes that bags with wheels have to go in a coin locker before you go in. For a toddler in a carrier the climb is manageable; for a pushchair it is not. There are coin lockers at Himeji Station, which is the better place to leave anything large if you are passing through on the way west.",
  },
];

const TITLE = "Himeji Castle Day Trip (2026): ¥2,500 Admission and Times";
const DESCRIPTION =
  "A Himeji Castle day trip is 1 hr 1 min from Osaka by JR rapid and 28 minutes by shinkansen. Admission is ¥2,500, free under 18, or ¥2,600 with Koko-en.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/himeji-castle-day-trip") },
});

export default function HimejiCastleDayTripPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/himeji-castle-day-trip" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/himeji-castle-day-trip" />
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
              route: "/guides/attractions/himeji-castle-day-trip",
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
                { "@type": "ListItem", position: 3, name: "Things to Do", item: "https://www.japan-travel-kit.com/guides/attractions" },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Himeji Castle Day Trip",
                  item: "https://www.japan-travel-kit.com/guides/attractions/himeji-castle-day-trip",
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
          <span className={styles.breadCurrent}>Himeji Castle Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Himeji Castle Day Trip (2026):<br />¥2,500 Admission, and Times From Osaka &amp; Kyoto
          </h1>
          <p className={styles.heroSubtitle}>
            Japan&apos;s one surviving original hilltop castle, an hour from Osaka — and two and a half times
            more expensive than it was last winter. What it costs, when to arrive, and how the queue works.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official 2026 admissions", "The 16:00 cut-off"].map((t) => (
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

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Adult admission</p>
                <p className={styles.verdictStatValue}>{ADULT} (free under 18)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Osaka Station</p>
                <p className={styles.verdictStatValue}>1 hr 1 min, direct</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Open</p>
                <p className={styles.verdictStatValue}>09:00–17:00, last entry 16:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time inside</p>
                <p className={styles.verdictStatValue}>1.5–2 hours</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A <strong>Himeji Castle day trip</strong> takes <strong>1 hour 1 minute</strong> from{" "}
              <strong>Osaka Station</strong> on a direct JR Special Rapid Service, or{" "}
              <strong>28 minutes</strong> from Shin-Osaka on the Sanyo Shinkansen; from Kyoto it is 1 hr 25 min
              by special rapid and <strong>44 minutes</strong> by shinkansen. Admission is{" "}
              <strong>{ADULT}</strong> for an adult aged 18 or over and <strong>free under 18</strong> — up
              from ¥1,000 on <strong>1 March 2026</strong> — or <strong>{COMBO}</strong> on the combined ticket
              with the Koko-en garden. The castle opens <strong>09:00 to 17:00</strong> but the{" "}
              <strong>last admission is 16:00</strong>, it closes on 29 and 30 December, and the keep itself
              admits <strong>1,000 people an hour</strong>, so the queue is the thing to plan around: arrive at
              opening, allow <strong>1.5–2 hours</strong> inside, and expect up to an hour of waiting in peak
              season. All figures read off Himeji City&apos;s and the castle&apos;s own pages on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Himeji Day From Osaka →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kansai Area Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>What changed</span>
          <h2 className={styles.sectionTitle}>Why Does Himeji Castle Now Cost ¥2,500?</h2>
          <p className={styles.bodyText}>
            Because Himeji City decided it should. On <strong>1 March 2026</strong> the adult admission went
            from ¥1,000 to <strong>{ADULT}</strong> for anyone who does not live in the city, while residents
            kept the ¥1,000 rate and under-18s became free everywhere. The city&apos;s stated reason is
            conservation: Himeji is 83 separate structures, and keeping them standing over the coming decade
            is a programme measured in tens of billions of yen rather than in ticket revenue.
          </p>
          <p className={styles.bodyText}>
            Two practical consequences for a day trip. First, almost every guide, blog post and AI answer
            still quotes ¥1,000 — if a page gives you that number, it has not been updated this year.
            Second, at {ADULT} the castle is now a decision rather than a default: it is one of the most
            expensive single admissions in Japan, and it is worth going in knowing exactly what you are
            buying, which is the only complete original hilltop castle left in the country.
          </p>
        </section>

        {/* Access table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Himeji From Osaka or Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            From Osaka, the direct special rapid is the answer and the shinkansen is a luxury. From Kyoto it
            is the other way round — the slow train turns Himeji into a travel day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Service", "Journey time", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={`${row.route}-${row.train}`}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.train}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every journey time above is Himeji City&apos;s own figure from visit-himeji.com, read on {CHECKED}.
            No single-ticket rail fare appears in this table on purpose: neither JR West nor Sanyo publishes a
            route-by-route fare table we could read on {CHECKED}, only a live search tool, so the cost anchors
            on this page are the published pass prices instead. For the city end of the journey, see{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Osaka
            </Link>
            {" "}and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kansai Area Pass
            </Link>
            , which covers the special rapid to Himeji but not the shinkansen.
          </p>
        </section>

        {/* Prices table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>How Much Is Himeji Castle, and What Are the Opening Hours?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price", "Hours", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Read the hours column as <strong>16:00</strong>, not 17:00. The castle&apos;s published closing
            time is 17:00 but the gate stops selling and admitting at <strong>16:00</strong>, and since the
            route through the keep is a one-way climb you want more than an hour in hand. It also closes on{" "}
            <strong>29 and 30 December</strong> — the only two days of the year.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Admissions, hours, closed days, the combined ticket and the annual pass read off himejicastle.jp
            and Himeji City&apos;s own 姫路城ご利用案内 page on {CHECKED}; the Koko-en admission and the
            ticket-set discount from the city&apos;s tourism site; the loop-bus fares, the winter
            weekends-only timetable and the 10% discount from the city&apos;s own loop-bus page. One
            correction worth making explicitly: many sites still list a summer extension to 18:00 from late
            April to the end of August. Neither official page carried it on {CHECKED}, so this guide does
            not print it.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book Himeji Castle Tickets in Advance?</h2>
          <p className={styles.bodyText}>
            Not to get in. The ticket window sells all day, there is no daily cap on the grounds, and nothing
            about Himeji &quot;sells out&quot; the way a timed museum slot does. What advance booking buys you
            is a <strong>time slot</strong>: Himeji sells a date-and-time digital ticket from{" "}
            <strong>90 days before</strong> your visit, paid by credit card or <strong>PayPay</strong> only,
            for up to <strong>five people per transaction</strong>.
          </p>
          <p className={styles.bodyText}>
            Then read the city&apos;s own caveat, because it is the honest part and almost nobody repeats it:
            the digital ticket exists to make the <em>gate</em> smoother and{" "}
            <strong>does not guarantee priority viewing</strong> once you are inside. The real bottleneck is
            the keep, which admits <strong>1,000 people an hour</strong>; on a busy day you queue at the
            keep&apos;s entrance whether or not you pre-booked. So the thing that actually shortens your
            Himeji day is arriving at <strong>09:00</strong>, not buying ahead.
          </p>
          <p className={styles.bodyText}>
            Note what this means for the booking platforms: there is <strong>no advance admission ticket for
            Himeji Castle on Klook</strong> — every Himeji listing there is a tour, and castle entry on those
            is either included in the tour price or paid at the window on the day. If you want a timed entry,
            buy it direct from the city. If you want the transport and a guide handled, that is what a tour
            is for, and the cancellation window and the minimum party size are the two things to check on the
            listing before you book a date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check a Himeji Coach Day →
            </KlookLink>
            <KlookLink href={GUIDED_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Guided Castle &amp; Koko-en →
            </KlookLink>
          </div>
        </section>

        {/* Plans */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>How long to give it</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need, and What Does a Himeji Day Look Like?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "Shape of the day", "What you fit in", "Verdict"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.shape}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The castle&apos;s own estimate is <strong>1.5 to 2 hours</strong> inside, and the same FAQ warns
            of waits of <strong>about an hour</strong> in the crowded season. Walking from Himeji Station
            takes roughly 15 minutes straight up Otemae-dori with the castle in front of you the whole way,
            which is one of the easier approaches to any major sight in Japan. If you would rather ride, the{" "}
            <strong>castle loop bus</strong> is ¥210 a trip or ¥600 for a 1-day pass that also takes{" "}
            <strong>10% off</strong> both the castle and Koko-en — but check the calendar, because from{" "}
            <strong>December to February it only runs at weekends and on holidays</strong>.
          </p>
        </section>

        {/* Koko-en */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Next door</span>
          <h2 className={styles.sectionTitle}>Is the Koko-en Combined Ticket Worth It?</h2>
          <p className={styles.bodyText}>
            On price, it is barely a question. The combined ticket is <strong>{COMBO}</strong>; the castle at{" "}
            {ADULT} plus Koko-en at {KOKOEN} comes to ¥2,900 bought separately. So the garden costs{" "}
            <strong>¥100</strong> if you buy them together — and it is also free for under-18s, like the
            castle. You can buy the set at either ticket window.
          </p>
          <p className={styles.bodyText}>
            What you get for the ¥100 is the counterweight to the keep. Koko-en is a walled group of
            Edo-style gardens laid out on the site of the castle&apos;s former western residences, a couple
            of minutes from the castle exit, with ponds, a tea house and almost none of the crowd that was
            just ahead of you on the stairs. If the castle is the one hour of your Himeji day that is busy,
            the garden is the hour that is not.
          </p>
        </section>

        {/* Tour vs train */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Should You Book a Tour, a Rail Pass, or Just Buy a Ticket?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "What it costs", "What it gets you", "When to pick it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.gets}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Three things to settle on a listing rather than here, because none of them is a published figure:
            whether the departure is actually running on your date — most join-in coach days have a minimum
            party size and a seasonal calendar — what the cancellation window is, and{" "}
            <strong>whether castle admission is included or paid on the day</strong>. That last one has moved
            by ¥1,500 per adult since February, so a tour price quoted before March 2026 and a tour price
            quoted now are not comparing the same thing.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Himeji Coach Day From Osaka →
            </KlookLink>
            <KlookLink href={PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Kansai Area Pass →
            </KlookLink>
            <KlookLink href={WIDE_PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              WIDE Pass (Shinkansen) →
            </KlookLink>
          </div>
        </section>

        {/* Sakura */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Spring</span>
          <h2 className={styles.sectionTitle}>When Is Cherry Blossom Season at Himeji Castle, and How Bad Is It?</h2>
          <p className={styles.bodyText}>
            Late March into early April, and the crowding is a different shape from the rest of the year.
            Himeji City&apos;s own warning for that window is not &quot;busy at midday&quot; but busy{" "}
            <strong>from before opening until closing</strong>, taking in the roads around the castle and the
            car parks as well as the grounds. If you are going in that fortnight, the 09:00 trick stops
            working and you should simply accept the queue, or go on a weekday.
          </p>
          <p className={styles.bodyText}>
            The blossom itself is inside the walls: the <strong>Nishinomaru</strong> garden, the western
            bailey, is the spot people photograph, with the keep behind the trees. The castle also runs a
            separately ticketed spring evening opening of the Nishinomaru — the 2026 edition ran{" "}
            <strong>27 March to 5 April</strong>, 18:30 to 21:00, with entry until 20:30 and its own ¥600
            adult ticket. As of {CHECKED} the 2027 dates had not been announced, so if an evening under the
            blossom is the reason for the trip, check the castle&apos;s own event pages before you book
            flights around it rather than assuming the same fortnight.
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
          heading="Guided Himeji Days and Coach Trips"
          intro="Four ways to have the castle organised for you, and they differ in what else is in the day: the castle on its own out of Osaka, the castle with the Engyoji temple complex above the city, a guided walk of the castle and Koko-en that starts in Himeji, or a wider Hyogo day that adds Arima Onsen and Mt. Rokko. Open a listing for availability on your dates — and check whether castle admission is included or paid at the gate."
          tours={[himejiCastleOsakaBusTour, himejiEngyojiKokoenDayTour, himejiCastleKokoenGuidedTour, arimaHimejiRokkoDayTour, himejiCastleTownBikeTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/*
              Added 30 Oct 2026: Himeji is a Sanyo Shinkansen day trip, so the reader here is
              exactly the one pricing a national pass against a Kansai one — and the national
              pass price changed on 1 October.
            */}
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Cost 2026: New Prices &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kobe-day-trip-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kobe Day Trip from Osaka (2026): Routes, the Beef and What Fits in a Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kansai-area-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kansai Area Pass (2026): Prices, What It Covers &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/arima-onsen-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c2 3-1 4 0 6 1.5 2.5 4 2.5 4 6a4 4 0 0 1-8 0c0-3.5 2.5-3.5 4-6 1-2-2-3 0-6z" />
                  <path d="M4 21h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Arima Onsen Day Trip (2026): From Osaka or Kobe, and What the Baths Cost</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/hiroshima-miyajima-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M6 17V9l6-4 6 4v8" />
                  <path d="M10 17v-4h4v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-castle-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V9l3-2 4 2 4-2 3 2v12" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Castle Tickets (2026): Prices, Hours and What the Pass Covers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyoto and Nara Day Tour From Osaka (2026): Which Itinerary to Book</p>
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
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
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
            <h2 className={styles.ctaBannerTitle}>An hour from Osaka, and 1,000 people an hour up the keep</h2>
            <p className={styles.ctaBannerDesc}>
              Arrive at 09:00, allow two hours, and remember the gate shuts at 16:00. If you would rather have
              the trains and the timings handled — or want Engyoji in the same day — a coach day does both.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Himeji Day Trips →
              </KlookLink>
              <KlookLink href={PASS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kansai Area Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
