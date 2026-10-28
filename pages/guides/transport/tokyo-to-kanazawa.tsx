import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import fares from "../../../data/jr-fares.json";
import {
  hokurikuArchPass,
  jrPassWholeJapan,
  kanazawaGeishaKenrokuenCastleDayTour,
  kanazawaKenrokuenHigashiChayaDayTour,
  klookEsim,
  shinkansenTokyoKanazawa,
  shirakawagoKanazawaDayTour,
  shirakawagoTakayamaKanazawaDayTour,
} from "../../../lib/klook-links";

/**
 * Tokyo to Kanazawa on the Hokuriku Shinkansen. Added 27 Oct 2026.
 *
 * What is printed here and where it came from, all read on 27 October 2026:
 *  - the 2 hour 28 minute Kanazawa–Tokyo and 2 hour 8 minute Toyama–Tokyo
 *    journey times, the KAGAYAKI / HAKUTAKA / TSURUGI service names, the
 *    260 km/h maximum speed and the 924-seat capacity, from JR West's own
 *    English Hokuriku Shinkansen page on westjr.co.jp;
 *  - 「かがやき号（全車指定席）」 — the Kagayaki as an all-reserved train — quoted
 *    from JR West's own ticket-rules page on jr-odekake.net;
 *  - the Hakutaka non-reserved car numbers (1–4, and 1–5 on the 551, 571, 573,
 *    575 and 577 with car 5 switched to reserved on some days) from JR West's
 *    E7/W7 series page on jr-odekake.net;
 *  - the Hokuriku Arch Pass price, validity, coverage and exclusions from JR
 *    West's own pass page;
 *  - the HOKURIKU One-way Ticket prices from Osaka and Kyoto, and the fact that
 *    its shinkansen leg is valid "Between Tsuruga and Toyama", from JR West's
 *    own ticket page — which is the cleanest official evidence that the
 *    Kanazawa–Kansai journey now changes at Tsuruga;
 *  - the Kagayaki and Hakutaka names, the four seat classes, the 2h 20m fastest
 *    time and "0 transfer(s)" from Klook's own Tokyo–Kanazawa rail page, which
 *    unlike its /activity/ pages answers automated reads.
 *
 * One deliberate gap, stated in the body rather than hidden. Neither JR East
 * nor JR West publishes the Tokyo–Kanazawa single fare as a static table — both
 * put it behind a route-search tool, and JR East revised its fares on
 * 14 March 2026 — so the only fare figure on this page is our own rounded
 * reference value from data/jr-fares.json, labelled as such in the table and
 * dated to its own "as of". No Klook price appears anywhere: Klook answers
 * automated reads of its product pages with HTTP 403.
 */

const OWN_ISO = "2026-10-27";
const OWN = checkedLabel(OWN_ISO);
/** The date our JR Pass guide read the pass prices it prints. */
const PASS_CHECKED = checkedLabel("2026-10-26");

const yen = (n: number) => `¥${n.toLocaleString("en-US")}`;
const tokyoKanazawa = fares.segments.find((s) => s.id === "tokyo-kanazawa")!;
const kanazawaKyoto = fares.segments.find((s) => s.id === "kanazawa-kyoto")!;
/** "2026-09" -> "September 2026", for the one non-operator figure on the page. */
const FARE_AS_OF = new Date(`${fares.asOf}-01T00:00:00Z`).toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const ARCH_PASS = "¥35,000";
const JR_PASS_7 = "¥50,000";

/** The route, as the operators and the booking page state it. */
const routeRows = [
  {
    item: "Fastest Tokyo ⇄ Kanazawa journey",
    value: "2 hours 28 minutes",
    detail: "JR West's own figure for the E7/W7 on the Hokuriku Shinkansen, given as Kanazawa to Tokyo",
    source: `westjr.co.jp, ${OWN}`,
  },
  {
    item: "Fastest time on the booking page",
    value: "2 hours 20 minutes",
    detail: 'Klook\'s Tokyo–Kanazawa rail page, which also states the route "features 0 transfer(s)"',
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Tokyo ⇄ Toyama, for comparison",
    value: "2 hours 8 minutes",
    detail: "The stop before Kanazawa coming from Tokyo — useful if Toyama or the Tateyama route is your actual target",
    source: `westjr.co.jp, ${OWN}`,
  },
  {
    item: "Services on the line",
    value: "Kagayaki, Hakutaka, Tsurugi",
    detail: "The three E7/W7 services JR West names. The Kagayaki is the fast one and makes the fewest stops; the Tsurugi is the Hokuriku-only shuttle",
    source: `westjr.co.jp, ${OWN}`,
  },
  {
    item: "Kagayaki seating",
    value: "All cars reserved",
    detail: 'JR West writes it as 「かがやき号（全車指定席）」 — there is no non-reserved car on a Kagayaki at all',
    source: `jr-odekake.net, ${OWN}`,
  },
  {
    item: "Hakutaka non-reserved cars",
    value: "Cars 1–4 (1–5 on some services)",
    detail: "JR West lists cars 1–5 as non-reserved on the Hakutaka 551, 571, 573, 575 and 577, with car 5 switched to reserved on some days; cars 1–4 on the others",
    source: `jr-odekake.net, ${OWN}`,
  },
  {
    item: "Seat classes sold for the route",
    value: "Reserved Ordinary, Reserved Green, Gran Class, Non-reserved Ordinary",
    detail: "The four ticket types Klook's route page lists for Tokyo to Kanazawa — Gran Class is the Hokuriku line's first class, above Green",
    source: `klook.com rail page, ${OWN}`,
  },
  {
    item: "Train specification",
    value: "260 km/h, 924 seats",
    detail: "JR West's published maximum operating speed and capacity for the E7/W7 sets that work this route",
    source: `westjr.co.jp, ${OWN}`,
  },
];

/** What it costs — and the one figure here that is not an operator's own. */
const priceRows = [
  {
    item: "Tokyo → Kanazawa, one way, reserved Ordinary",
    price: `About ${yen(tokyoKanazawa.fareYen)}`,
    covers: "Basic fare plus the reserved-seat limited express charge, regular season",
    source: `Our own JR fare dataset, as of ${FARE_AS_OF} — a rounded reference value, not an operator table. See the note below`,
  },
  {
    item: "JR Hokuriku Arch Pass, 7 consecutive days",
    price: `${ARCH_PASS} adult, ¥17,500 child (ages 6–11)`,
    covers:
      "Reserved seats on the Hokuriku Shinkansen between Tsuruga and Tokyo, plus the Kansai area and Toyama, Ishikawa and Fukui. Not the Tokaido Shinkansen (Tokyo ⇄ Shin-Osaka) and not the Sanyo Shinkansen",
    source: `JR West's own pass page, ${OWN}`,
  },
  {
    item: "JAPAN RAIL PASS, 7-day Ordinary",
    price: `${JR_PASS_7} bought online, ¥53,000 as an Exchange Order from an overseas agency`,
    covers: "The whole JR network including the Hokuriku Shinkansen; the 14- and 21-day versions are ¥80,000 and ¥100,000 online",
    source: `The JR Group's own price table, read for our JR Pass guide ${PASS_CHECKED}`,
  },
  {
    item: "HOKURIKU One-way Ticket, Osaka city → Kanazawa",
    price: "¥8,000 adult, ¥4,000 child",
    covers: "The Thunderbird to Tsuruga plus the Hokuriku Shinkansen on to Kanazawa, Ordinary reserved or non-reserved",
    source: `JR West's own ticket page, ${OWN}`,
  },
  {
    item: "HOKURIKU One-way Ticket, Kyoto city → Kanazawa",
    price: "¥6,500 adult, ¥3,250 child",
    covers: "The same combination from Kyoto — the cheapest official way to join the two halves of a Tokyo–Kanazawa–Kyoto loop",
    source: `JR West's own ticket page, ${OWN}`,
  },
  {
    item: "Kanazawa → Kyoto, one way, via Tsuruga",
    price: `About ${yen(kanazawaKyoto.fareYen)}`,
    covers: `Hokuriku Shinkansen to Tsuruga then the Thunderbird, about ${Math.floor(kanazawaKyoto.minutes / 60)} hours ${kanazawaKyoto.minutes % 60} minutes`,
    source: `Our own JR fare dataset, as of ${FARE_AS_OF} — a rounded reference value`,
  },
];

/** Which ticket, for which trip. */
const compareRows = [
  {
    option: "A single reserved ticket each way",
    cost: `About ${yen(tokyoKanazawa.fareYen)} one way on our reference figure`,
    gets: "A seat on a Kagayaki, the fastest service, with nothing else bought and nothing else to plan.",
    pick: "The default. If Kanazawa is a there-and-back trip or one leg of a route that does not loop, individual tickets beat every pass on this page.",
  },
  {
    option: "JR Hokuriku Arch Pass, 7 days",
    cost: `${ARCH_PASS} adult, ¥17,500 child`,
    gets: "Tokyo in, Kanazawa in the middle, Kansai out — plus the airport runs at both ends and the local JR West lines in Hokuriku.",
    pick: "The one pass actually shaped like this trip: Tokyo → Kanazawa → Kyoto/Osaka in a week, flying out of a different airport from the one you flew into.",
  },
  {
    option: "JAPAN RAIL PASS, 7-day Ordinary",
    cost: `${JR_PASS_7} online`,
    gets: "Every JR line in the country, so Hiroshima or Tohoku as well as Hokuriku.",
    pick: "Only if your week has several more long legs in it. A Tokyo–Kanazawa–Kyoto loop alone does not reach the break-even.",
  },
  {
    option: "HOKURIKU One-way Ticket from Kyoto or Osaka",
    cost: "¥6,500 from Kyoto city, ¥8,000 from Osaka city",
    gets: "The Thunderbird and the shinkansen through Tsuruga as one ticket, in one direction.",
    pick: "For the second half of the loop, if you are not buying a pass. It is a JR West product, so it does nothing for the Tokyo leg.",
  },
  {
    option: "Non-reserved on a Hakutaka",
    cost: "Less than a reserved ticket; the saving is the reserved-seat charge",
    gets: "Cars 1–4 on most Hakutaka services, first come first served, on a slower train with more stops.",
    pick: "If you are travelling light outside peak season and would rather not commit to a train. There is no such option on a Kagayaki.",
  },
  {
    option: "The day sold as a tour out of Kanazawa",
    cost: "Check the listing for your date",
    gets: "Kenroku-en, the Higashi Chaya teahouse district and the castle in a guided day, or Shirakawa-go and Takayama as a round trip south.",
    pick: "Once the rail is settled. Kanazawa is a two-day city and the Shirakawa-go bus is the part of the trip that genuinely rewards a booking.",
  },
];

const faqItems = [
  {
    q: "How long is the train from Tokyo to Kanazawa?",
    a: `About two and a half hours, direct, with no changes. JR West's own page for the E7/W7 sets that work the Hokuriku Shinkansen gives Kanazawa to Tokyo as 2 hours 28 minutes, and Toyama — the stop before it — as 2 hours 8 minutes; read on ${OWN}. Klook's booking page for the route puts the fastest departure at 2 hours 20 minutes and states the route "features 0 transfer(s)", read the same day. The spread between those two figures is the difference between a Kagayaki, which makes the fewest stops, and a Hakutaka, which calls at most of the Nagano and Joetsu stations on the way. Either way, there is no transfer and no reason to break the journey.`,
  },
  {
    q: "How much is the Shinkansen from Tokyo to Kanazawa?",
    a: `Roughly ${yen(tokyoKanazawa.fareYen)} one way for a reserved Ordinary seat, on our own rounded reference figure as of ${FARE_AS_OF} — and we are deliberately not quoting an operator price. Neither JR East nor JR West publishes the Tokyo–Kanazawa fare as a static table: both put it behind a route-search tool, and JR East revised its fares on 14 March 2026, so any figure you find reprinted on a travel site is likely to predate that. The honest way to get the exact number for your date is the booking page, which prices the four classes — reserved Ordinary, reserved Green, Gran Class and non-reserved Ordinary — against the train you actually pick. What we can print from an operator's own page are the alternatives: the Hokuriku Arch Pass at ${ARCH_PASS} for seven days, and the HOKURIKU One-way Ticket at ¥6,500 from Kyoto city or ¥8,000 from Osaka city for the other half of a loop.`,
  },
  {
    q: "Is the JR Pass worth it for Tokyo to Kanazawa?",
    a: `Not the nationwide one, usually — and quite often the Hokuriku Arch Pass is. A 7-day nationwide Ordinary JAPAN RAIL PASS is ${JR_PASS_7} bought online (${PASS_CHECKED}), which is roughly three and a half single Tokyo–Kanazawa fares on our reference figure, so a there-and-back trip to Kanazawa does not come close to paying for it. The Hokuriku Arch Pass is ${ARCH_PASS} for seven consecutive days on JR West's own page and covers reserved seats on the Hokuriku Shinkansen between Tsuruga and Tokyo plus the Kansai area, Toyama, Ishikawa and Fukui — which is exactly the shape of a Tokyo → Kanazawa → Kyoto or Osaka trip. The catch is printed on the same page: it does not cover the Tokaido Shinkansen between Tokyo and Shin-Osaka, so it only works if you go out one way and back the other. Our JR Pass guide has the break-even calculator for your own legs.`,
  },
  {
    q: "Do I need to reserve seats on the Kagayaki?",
    a: `Yes — there is no choice. JR West writes the service as 「かがやき号（全車指定席）」, all cars reserved, on its own ticket-rules page; read on ${OWN}. A Kagayaki has no non-reserved car, so you cannot board one on a basic fare and an express ticket alone. The Hakutaka is the service that does have non-reserved seating: JR West lists cars 1 to 5 as non-reserved on the Hakutaka 551, 571, 573, 575 and 577 — with car 5 switched to reserved on some days — and cars 1 to 4 on the others. If you are holding a rail pass, reserving is free and takes a minute at a ticket office or machine; if you are holding a Kagayaki ticket, the reservation is the ticket.`,
  },
  {
    q: "Kagayaki or Hakutaka — which should you take?",
    a: `Kagayaki if the time matters, Hakutaka if flexibility does. The Kagayaki is the limited-stop service and the one that gets you there in about two and a half hours, but every seat on it is reserved, so you are committed to a departure. The Hakutaka stops more often, takes longer, and has non-reserved cars at the front — cars 1 to 4 on most services, 1 to 5 on five named ones — which means you can walk up and board. Both are E7 or W7 sets with the same seats, the same Green Car and the same Gran Class, at JR West's published 260 km/h and 924 seats, so the difference is stops and commitment rather than comfort. The third name on the line, the Tsurugi, is the Hokuriku-only shuttle and does not run through to Tokyo.`,
  },
  {
    q: "Can you get from Kanazawa to Kyoto or Osaka without changing?",
    a: `Not since the line was extended to Tsuruga. The Hokuriku Shinkansen now runs Tokyo–Kanazawa–Tsuruga, and from Tsuruga you change across the platform onto the Limited Express Thunderbird for Kyoto and Osaka. JR West's own HOKURIKU One-way Ticket page makes the split explicit: the ticket covers "Limited Express THUNDERBIRD & Hokuriku Shinkansen", with the shinkansen leg valid "Between Tsuruga and Toyama". Read on ${OWN}. In practice it is one timed cross-platform change rather than a journey broken in two, and the official one-way tickets price the whole thing — ¥6,500 adult and ¥3,250 child from Kyoto city, ¥8,000 and ¥4,000 from Osaka city. Our own reference figure for Kanazawa to Kyoto bought as ordinary tickets is about ${yen(kanazawaKyoto.fareYen)}.`,
  },
  {
    q: "Is there a cheaper way from Tokyo to Kanazawa than the Shinkansen?",
    a: `Yes, and it costs you the evening. Overnight and daytime highway coaches run Tokyo to Kanazawa for a fraction of a shinkansen ticket, and the budget airlines serve Komatsu, Kanazawa's airport, from Haneda. Neither is covered by any JR pass and neither is faster — the coach is roughly three times the journey time. The reason most visitors still take the train is that two and a half hours door to door is short enough to make Kanazawa a two-night stop rather than a logistics exercise, and the Hokuriku Shinkansen's cheap seat is the non-reserved Hakutaka car rather than a different mode of transport. If price is the binding constraint, compare the coach against the non-reserved Hakutaka fare, not against the Kagayaki.`,
  },
  {
    q: "Should you stop at Karuizawa or Nagano on the way?",
    a: `Only if you are not in a hurry, because the fast train does not. The Hokuriku Shinkansen runs Tokyo–Ueno–Omiya and then up through Karuizawa, Nagano, Joetsumyoko and Toyama to Kanazawa, but the Kagayaki skips most of that; the Hakutaka is the service that calls at them. Both Karuizawa and Nagano make sensible breaks on a route you are travelling once — Karuizawa in particular is close enough to Tokyo to be a day trip in its own right, which our Karuizawa guide covers. The practical point is the ticket: a journey broken for a few hours is normally still one ticket, but a journey broken overnight is two, and on an all-reserved Kagayaki each leg needs its own seat.`,
  },
  {
    q: "What is there to do in Kanazawa when you arrive?",
    a: `Three things within a bus ride of the station, and one bus ride out of it. Kenroku-en, one of Japan's three great gardens, sits next to the Kanazawa Castle grounds; the Higashi Chaya district is the preserved teahouse quarter where the geisha houses were; and Omicho Market is the covered fish market in between. A guided day joins all three, sometimes with a temarizushi-making session attached. The bus ride out is the one that needs planning: Shirakawa-go is 1 hour 15 minutes and ¥2,800 from the Kanazawa Station West Exit on a reserved-seat service that Hokuriku Railroad says must be booked before boarding — our Takayama and Shirakawa-go tour guide has the fares both ways and the four reservation-only 2027 light-up dates.`,
  },
  {
    q: "How far ahead should you book Tokyo to Kanazawa?",
    a: `Reserved seats open 30 days ahead and most of the year a few days is plenty — with four exceptions that are not negotiable. Golden Week in late April and early May, the mid-August Obon week, the New Year period, and the four January evenings of the Shirakawa-go light-up, which pull every seat on the Hokuriku line towards Kanazawa and Takayama. Gran Class, which is the small first-class car and the one thing on this train that genuinely sells out, is worth booking as early as you can in any season. If you are holding a pass, the reservation costs nothing, so there is no reason to leave it — and if you are buying a single ticket for a Kagayaki, remember that the reservation is not optional on that service.`,
  },
];

const TITLE = "Tokyo to Kanazawa (2026): Kagayaki Times and Passes";
const DESCRIPTION =
  "Tokyo to Kanazawa is 2h28m direct on the Hokuriku Shinkansen. The Kagayaki is all-reserved; the Hakutaka has non-reserved cars 1–4. Passes compared.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/transport/tokyo-to-kanazawa") },
});

export default function TokyoToKanazawaPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/tokyo-to-kanazawa" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/tokyo-to-kanazawa" />
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
              route: "/guides/transport/tokyo-to-kanazawa",
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Transport & Getting Around",
                  item: "https://www.japan-travel-kit.com/guides/transport",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Tokyo to Kanazawa",
                  item: "https://www.japan-travel-kit.com/guides/transport/tokyo-to-kanazawa",
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
          <Link href="/guides/transport" className={styles.breadLink}>Transport</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo to Kanazawa</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo to Kanazawa (2026):<br />Kagayaki Times, Seats and Whether a Pass Pays
          </h1>
          <p className={styles.heroSubtitle}>
            Two and a half hours, no transfer, and one decision that is made for you: the fast train
            has no non-reserved car at all.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "JR East & JR West figures, dated", "Pass break-even included"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Journey time</p>
                <p className={styles.verdictStatValue}>2h 28m, no transfer</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kagayaki seating</p>
                <p className={styles.verdictStatValue}>All reserved</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hokuriku Arch Pass</p>
                <p className={styles.verdictStatValue}>{ARCH_PASS} / 7 days</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On to Kyoto / Osaka</p>
                <p className={styles.verdictStatValue}>Change at Tsuruga</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              <strong>Tokyo to Kanazawa</strong> is one direct train on the{" "}
              <strong>Hokuriku Shinkansen</strong>: JR West gives the fastest journey as{" "}
              <strong>2 hours 28 minutes</strong>, and the booking page lists a{" "}
              <strong>2 hour 20 minute</strong> departure with <strong>&ldquo;0 transfer(s)&rdquo;</strong>.
              The service to want is the <strong>Kagayaki</strong>, which makes the fewest stops — and which
              JR West writes as <strong>全車指定席</strong>, every car reserved, so the reservation is not
              optional. The <strong>Hakutaka</strong> is the slower service with{" "}
              <strong>non-reserved cars 1–4</strong> (1–5 on five named trains). Tickets come in four classes:
              reserved Ordinary, reserved Green, <strong>Gran Class</strong> and non-reserved Ordinary. On
              passes, the one shaped like this trip is the <strong>Hokuriku Arch Pass</strong> at{" "}
              <strong>{ARCH_PASS}</strong> for seven days — it covers Tokyo to Tsuruga but{" "}
              <strong>not the Tokaido Shinkansen</strong>, so it only pays if you come back the other way.
              And since the line reached Tsuruga, <strong>Kanazawa to Kyoto or Osaka means one change at
              Tsuruga</strong> onto the Thunderbird. All operator figures read on {OWN}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Kanazawa Tickets →
              </KlookLink>
              <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Hokuriku Arch Pass →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Why This Route Is Simpler Than Tokyo to Kyoto</h2>
          <p className={styles.bodyText}>
            Because there is only one line and one operator pairing on it. The Hokuriku Shinkansen runs north
            out of Tokyo through Omiya, climbs over the mountains past Karuizawa and Nagano, and comes down the
            Sea of Japan coast to Toyama and Kanazawa — then on to Tsuruga since the extension opened. There is
            no competing route, no highway bus worth comparing on time, and no equivalent of the Nozomi
            problem that makes Tokyo to Kyoto a pass question before it is a train question.
          </p>
          <p className={styles.bodyText}>
            What there is instead is one unusual rule. The fast service, the <strong>Kagayaki</strong>, is{" "}
            <em>全車指定席</em> — every car reserved. On most shinkansen lines you can buy a basic fare and a
            non-reserved express ticket and get on whatever comes; on a Kagayaki you cannot. JR West publishes
            that in exactly those words on its own ticket-rules page, and it is the single most useful thing
            to know before you turn up at Tokyo Station with a rail pass and no reservation.
          </p>
          <p className={styles.bodyText}>
            The second thing to know is what happens at the far end. Kanazawa used to be a dead end for the
            shinkansen; now the line continues to <strong>Tsuruga</strong>, and the Kansai leg — Kyoto, Osaka
            — is a cross-platform change there onto the <strong>Limited Express Thunderbird</strong>. That
            change is what makes a Tokyo → Kanazawa → Kyoto loop sensible, and it is also what makes the
            Hokuriku Arch Pass the right pass for this trip rather than the national one.
          </p>
        </section>

        {/* Route table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The train</span>
          <h2 className={styles.sectionTitle}>How Long Is the Train From Tokyo to Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Two and a half hours, direct. Every figure below is JR West&apos;s own or the booking page&apos;s
            own, with the source and the date it was read — including the two that decide whether you can
            board without a reservation.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Value", "What it means", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.value}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For how shinkansen tickets work in general — the two-part fare, the seat classes, what a pass does
            and does not open — our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers the mechanics, and{" "}
            <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto</Link> is the same question on the
            busier line.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kanazawa tickets →
            </KlookLink>
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices</span>
          <h2 className={styles.sectionTitle}>How Much Is the Shinkansen From Tokyo to Kanazawa?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            One honest note before the table. Neither JR East nor JR West publishes the Tokyo–Kanazawa single
            fare as a static price list — both put it behind a route-search tool — and JR East revised its
            fares on <strong>14 March 2026</strong>, which means most of the figures circulating on travel
            sites are out of date. So the single-ticket row below is our own rounded reference value, marked
            as such and dated; every pass and official one-way-ticket price beside it is the operator&apos;s
            own.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Price", "What it covers", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change — confirm before buying. {fares.note} The Hokuriku Arch Pass also requires a
            passport at collection and, on JR West&apos;s own page, lets a pass holder take up to two children
            aged 1 to 5 free. No Klook price appears on this page: Klook answers automated reads of its product
            pages with an error, so no figure from it could be verified.
          </p>
        </section>

        {/* Reservations */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Reservations</span>
          <h2 className={styles.sectionTitle}>Do I Need to Reserve Seats on the Kagayaki?</h2>
          <p className={styles.bodyText}>
            Yes, and there is no way around it. JR West&apos;s own ticket-rules page refers to the service as{" "}
            <strong>「かがやき号（全車指定席）」</strong> — the Kagayaki, all cars reserved. A Kagayaki has no
            non-reserved car, which means a basic fare plus a non-reserved express ticket will not get you on
            board, and neither will a rail pass on its own. Read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            The <strong>Hakutaka</strong> is the service that still has walk-up seating, and JR West is
            specific about where: cars <strong>1 to 5</strong> are non-reserved on the Hakutaka{" "}
            <strong>551, 571, 573, 575 and 577</strong>, with car 5 switched to reserved on some days, and
            cars <strong>1 to 4</strong> on the rest. That is the fallback if your plans are loose — at the
            cost of a slower train with more stops.
          </p>
          <p className={styles.bodyText}>
            Three practical consequences. If you hold a <strong>JR Pass or the Hokuriku Arch Pass</strong>,
            the seat reservation is free, so make it: there is no upside to arriving at the gate without one.
            If you are buying a single ticket for a Kagayaki, the reservation <em>is</em> the ticket. And if
            you want <strong>Gran Class</strong> — the small first-class car that only the Hokuriku and Tohoku
            lines have — book it as far ahead as you can, because it is the one part of this train that
            reliably sells out. Reserved seats open 30 days before departure.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Pick a train and seat class →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS →
            </KlookLink>
          </div>
        </section>

        {/* Which ticket */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for Tokyo to Kanazawa?</h2>
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
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.option}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.gets}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The short version: a there-and-back trip to Kanazawa does not justify any pass, a Tokyo →
            Kanazawa → Kansai loop usually justifies the <strong>Hokuriku Arch Pass</strong>, and only a week
            with Hiroshima or Tohoku in it as well justifies the nationwide one. Our{" "}
            <Link href="/guides/transport/jr-pass-guide">JR Pass guide</Link> has a calculator that settles it
            against your own legs, and our{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto guide</Link> covers the
            city at the other end of the loop. One thing no pass covers: the highway buses onward to
            Shirakawa-go, which are private operators — see our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour guide</Link>{" "}
            for those fares.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Hokuriku Arch Pass (7 day) →
            </KlookLink>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              JAPAN RAIL PASS (7/14/21 day) →
            </KlookLink>
          </div>
        </section>

        {/* Onward to Kansai */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Onward</span>
          <h2 className={styles.sectionTitle}>After Kanazawa: Kyoto and Osaka Since the Tsuruga Extension</h2>
          <p className={styles.bodyText}>
            The Hokuriku Shinkansen no longer stops at Kanazawa. It carries on to{" "}
            <strong>Tsuruga</strong>, and that is where the Kansai leg begins: you change at Tsuruga onto the{" "}
            <strong>Limited Express Thunderbird</strong> for Kyoto and Osaka. JR West&apos;s own{" "}
            <strong>HOKURIKU One-way Ticket</strong> page states the combination in those terms — &ldquo;Limited
            Express THUNDERBIRD &amp; Hokuriku Shinkansen&rdquo;, with the shinkansen portion valid
            &ldquo;Between Tsuruga and Toyama&rdquo;. Read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            The official one-way prices for that combination, from the same page: <strong>¥6,500</strong> adult
            and ¥3,250 child from Kyoto city to Kanazawa, <strong>¥8,000</strong> and ¥4,000 from Osaka city,
            with Fukui at ¥5,000 and ¥6,000 and Toyama at ¥7,500 and ¥8,500. Ordinary reserved and
            non-reserved seating are both included; first class is not. Those are one-direction tickets, which
            makes them the natural partner to a Tokyo-side single rather than an alternative to a pass.
          </p>
          <p className={styles.bodyText}>
            Why this matters for the pass decision: the Hokuriku Arch Pass covers precisely this shape —
            Tokyo in, Kanazawa in the middle, Kansai out — and explicitly <strong>excludes</strong> the
            Tokaido Shinkansen between Tokyo and Shin-Osaka. So it rewards a loop and punishes a there-and-back.
            If your trip flies into Haneda or Narita and out of Kansai, this is the pass; if you are coming
            back to Tokyo the way you came, buy singles.
          </p>
        </section>

        {/* At the far end */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>At the far end</span>
          <h2 className={styles.sectionTitle}>What Do You Do With Two Days in Kanazawa?</h2>
          <p className={styles.bodyText}>
            Kanazawa is a small, dense city and the three things it is known for are within a short bus ride
            of the station: <strong>Kenroku-en</strong>, counted as one of Japan&apos;s three great gardens,
            with the <strong>Kanazawa Castle</strong> grounds next to it; the{" "}
            <strong>Higashi Chaya</strong> district, the preserved teahouse quarter; and{" "}
            <strong>Omicho Market</strong>, the covered fish market between them. A guided day joins the
            three, and one listing adds a temarizushi-making session — which is the sort of thing a city
            with its own gold-leaf and lacquer crafts does well.
          </p>
          <p className={styles.bodyText}>
            The day that actually needs booking is the one <em>out</em> of Kanazawa. Shirakawa-go is{" "}
            <strong>1 hour 15 minutes</strong> and <strong>¥2,800</strong> from the Kanazawa Station West Exit
            on a Hokuriku Railroad service that is reserved-seating and must be booked before boarding, and
            the guided day that takes in both the village and the Takayama old town can be bought as a
            one-way drop-off in Takayama rather than a round trip — which turns a day trip into the next leg
            of the journey. Our{" "}
            <Link href="/guides/attractions/takayama-shirakawago-tour">Takayama and Shirakawa-go tour guide</Link>{" "}
            has the fares in both directions and the four reservation-only 2027 light-up evenings.
          </p>
        </section>

        <KlookTourPicks
          heading="Kanazawa and What Lies South of It"
          intro="Two guided days in the city itself — the garden, the teahouse district and the castle, one of them with a temarizushi session — and two that use Kanazawa as the start of the Shirakawa-go run, including the version that drops you in Takayama instead of bringing you back. Open a listing for availability and the current price on your dates."
          tours={[
            kanazawaKenrokuenHigashiChayaDayTour,
            kanazawaGeishaKenrokuenCastleDayTour,
            shirakawagoTakayamaKanazawaDayTour,
            shirakawagoKanazawaDayTour,
          ]}
        />

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

        {/* Before you go */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Before you go</span>
          <h2 className={styles.sectionTitle}>One Thing to Sort Before You Board</h2>
          <p className={styles.bodyText}>
            Data, because every decision on this route is made on a phone. Reserved seats open 30 days out and
            the apps are where you change them; the Tsuruga connection is a timed cross-platform change you
            will want to check against your actual arrival; and the onward bus to Shirakawa-go is a
            Japanese-language reservation system on a road that closes in heavy snow. An eSIM activated before
            you fly means all of that is something you can look up from a platform rather than guess at.{" "}
            <KlookLink href={klookEsim.url} target="_blank" rel="sponsored noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
              See Klook eSIM options →
            </KlookLink>{" "}
            Our{" "}
            <Link href="/guides/esim/best-esim-japan">best eSIM for Japan guide</Link> compares it against the
            alternatives, and our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC card guide</Link> covers tapping through the
            local gates once you are off the shinkansen.
          </p>
        </section>

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Hiroshima Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-winter-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M3.5 7l17 10M20.5 7l-17 10" />
                  <path d="M12 6l-2.5-2M12 6l2.5-2M12 18l-2.5 2M12 18l2.5 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Winter Itinerary: 12 Days, Day by Day (2027)</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide 2026: Tickets, Passes &amp; Tips for First-Timers</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/transport/tokyo-to-kyoto" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 7h16M4 12h16M4 17h10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Kyoto (2026): Cheapest &amp; Fastest Ways to Get There</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/takayama-shirakawago-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M6 21V12l6-6 6 6v9" />
                  <path d="M10 21v-5h4v5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Takayama and Shirakawa-go Tour (2026): Which Departure, and the Bus If You Go Alone</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-14-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20h18M7 20l5-12 5 12" />
                  <path d="M9 14h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Karuizawa Day Trip From Tokyo (2026): Shinkansen Times, the Five Stops and Tour vs DIY</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 15h4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>All Transport &amp; Getting Around Guides →</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Two and a half hours, one reservation</h2>
            <p className={styles.ctaBannerDesc}>
              Book a Kagayaki seat — it has no other kind — and decide the pass question by the shape of your
              week. A loop out through Kanazawa and back through Kansai is what the Hokuriku Arch Pass is for;
              a there-and-back is cheaper on singles.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={shinkansenTokyoKanazawa.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo → Kanazawa Tickets →
              </KlookLink>
              <KlookLink href={hokurikuArchPass.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Hokuriku Arch Pass →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
