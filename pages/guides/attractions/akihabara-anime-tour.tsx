import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import {
  akihabaraAnimeMangaMaidCafeTour,
  akihabaraAnimeMangaPrivateTour,
  akihabaraElectricTownWalk,
  akihabaraOtakuFiveHourTour,
  akihabaraOtakuUniverseTour,
  akihabaraPrivateAnimeLoverTour,
  akihabaraTripPrep,
  tokyoNightTourAkihabaraShibuya,
  tokyoSubwayTicket,
} from "../../../lib/klook-links";

/**
 * Akihabara as a booking decision rather than a district write-up, for the
 * reader searching "Akihabara Anime Tour". Added 1 Nov 2026.
 *
 * The term hides two questions that want opposite answers. Some readers want a
 * guided walk and are really asking which of the six Klook listings to pick.
 * Others have typed "tour" meaning "what do I do there" and would be better off
 * with four shop addresses and the opening times — because unlike almost every
 * other page in this category, the free version of this day is genuinely good.
 * So the page answers the solo version honestly first, with the shops' own
 * published hours, then says plainly what a guide adds that you cannot buy
 * separately: a maid café with seating guaranteed, and someone who can read the
 * floor signage.
 *
 * Sources, all read 1 November 2026.
 *
 *   jreast.co.jp station info (StationCd=41)  Akihabara is JR Yamanote (JY03),
 *                              Keihin-Tohoku / Negishi (JK28) and Chuo-Sobu
 *                              local (JB19).
 *   tokyometro.jp/station/akihabara/           Tokyo Metro Hibiya Line; the page
 *                              lists JR East, Tsukuba Express and Toei Subway as
 *                              the connecting operators.
 *   animate.co.jp/shop/akihabara/              Sotokanda 4-3-1. Buildings 1 and 2
 *                              10:00-21:00 every day; ANNEX 10:00-21:00 weekdays
 *                              and 10:00-20:00 weekends and holidays.
 *   akihabara-radiokaikan.co.jp (page_id=3496) Sotokanda 1-15-16, shop floors
 *                              10:00-20:00.
 *   superpotato.com/shop/akihabara/            Sotokanda 1-11-2, 3F-5F,
 *                              11:00-20:00 every day, open year-round.
 *   mandarake.co.jp/dir/cmp/                   Sotokanda 3-11-12, 12:00-20:00,
 *                              open year-round, 4 minutes from the Electric Town
 *                              Exit.
 *   global.maidreamin.com/shop/                Seven Akihabara branches, all
 *                              11:30-23:00 Mon-Fri and 10:30-23:00 Sat, Sun and
 *                              holidays.
 *   maidreamin.com/first-time_maidreamin/      Entrance charge per hour of
 *                              seating: adult 880 yen, university or vocational
 *                              student 660 yen, middle or high school 550 yen,
 *                              elementary 330 yen, under elementary age free,
 *                              60+ 440 yen, all tax included and varying by
 *                              branch and time of day. Photography: food and
 *                              yourself fine, maids only with permission or via
 *                              the paid cheki.
 *   maidreamin.com/faq/                        The same photography rule stated
 *                              as "no maid, kitchen cast or other customer in
 *                              the shot"; under-school-age children enter free.
 *
 * Kanda Myojin is named because two of the tours route through it, but no hours
 * are printed for it: its own English site publishes an address and a phone
 * number and no visiting hours, so there is nothing here we could verify.
 *
 * Klook prices are absent throughout — its /activity/ pages answer automated
 * reads with HTTP 403. The six listings were confirmed live and in their en-US
 * form through the www.klook.com search index on the same date; see
 * lib/klook-links.ts.
 */

const CHECKED = "1 November 2026";

const tourRows = [
  {
    tour: "Join-in Electric & Anime Town walk",
    length: "Listed at 3 hours",
    covers: "District history, a retro arcade and Super Potato, figure shops, a guided maid-café visit",
  },
  {
    tour: "Anime, manga, video games & maid café tour",
    length: "Departures listed at 14:00 and 18:00, groups of 1–10",
    covers: "Anime, figure and classic-game shops with an English- or Japanese-speaking guide, maid café with seating guaranteed",
  },
  {
    tour: "Private half day with an anime-lover guide",
    length: "Listed as a private half day",
    covers: "Maid café plus Kanda Myojin shrine — the mixed-interest option",
  },
  {
    tour: "Private anime & manga walking tour",
    length: "Listed as a private half day",
    covers: "Manga, figure and game shops at your own pace, no group to keep up with",
  },
  {
    tour: "Tokyo otaku tour (Akihabara anime & game culture)",
    length: "Listed at 5 hours",
    covers: "A private group meeting in Akihabara Electric Town — the whole-afternoon version",
  },
  {
    tour: "Evening tour: Ueno, Akihabara, Shibuya & karaoke",
    length: "Listed at 4 hours 50 minutes",
    covers: "Akihabara as one stop of three, train fares between them included",
  },
];

const hoursRows = [
  {
    place: "animate Akihabara (Sotokanda 4-3-1)",
    hours: "Buildings 1 & 2: 10:00–21:00 daily. ANNEX: 10:00–21:00 weekdays, 10:00–20:00 weekends and holidays",
    note: "The earliest opener on this list",
  },
  {
    place: "Akihabara Radio Kaikan (Sotokanda 1-15-16)",
    hours: "10:00–20:00 (shop floors)",
    note: "Directly beside the station's Electric Town Exit",
  },
  {
    place: "Super Potato Akihabara (Sotokanda 1-11-2, 3F–5F)",
    hours: "11:00–20:00 daily, open year-round",
    note: "The retro-game floors two of the tours visit",
  },
  {
    place: "Mandarake Complex (Sotokanda 3-11-12)",
    hours: "12:00–20:00, open year-round",
    note: "Four minutes' walk from the Electric Town Exit; the latest to open",
  },
  {
    place: "maidreamin (seven Akihabara branches)",
    hours: "11:30–23:00 Mon–Fri; 10:30–23:00 Sat, Sun and holidays",
    note: "Seating is charged by the hour — see the table below",
  },
];

const accessRows = [
  {
    route: "JR Yamanote Line (JY03)",
    detail: "The loop line — two stops from Ueno, four from Tokyo Station",
    exit: "Electric Town Exit (電気街口) for every shop on this page",
  },
  {
    route: "JR Keihin-Tohoku / Negishi Line (JK28)",
    detail: "Same platforms as the Yamanote at Akihabara, faster northbound and southbound",
    exit: "Electric Town Exit",
  },
  {
    route: "JR Chuo-Sobu Line, local (JB19)",
    detail: "The east–west line, direct from Shinjuku without changing",
    exit: "Electric Town Exit",
  },
  {
    route: "Tokyo Metro Hibiya Line",
    detail: "The only subway line at Akihabara itself — and the one a Tokyo Subway Ticket covers",
    exit: "Follow signs to the Electric Town Exit above ground",
  },
  {
    route: "Tsukuba Express",
    detail: "Its Tokyo terminus is Akihabara; Tokyo Metro lists it as a connecting operator here",
    exit: "Electric Town Exit",
  },
];

const maidCafeRows = [
  { who: "Adult", fee: "¥880" },
  { who: "University or vocational student", fee: "¥660" },
  { who: "Middle or high school student", fee: "¥550" },
  { who: "Elementary school", fee: "¥330" },
  { who: "Under elementary school age", fee: "Free" },
  { who: "Age 60 and over", fee: "¥440" },
];

const whoFor = [
  {
    title: "Book a guided tour if…",
    desc: "You want the maid café without the awkwardness, or you have one afternoon and no appetite for working out which of six floors holds the thing you came for. A guide also unlocks the part you cannot buy separately: the listing we checked states that maid-café seating is guaranteed on the tour, and it runs with an English- or Japanese-speaking guide for a group of between 1 and 10.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />
      </svg>
    ),
  },
  {
    title: "Go on your own if…",
    desc: "You already know what you are shopping for, or you would rather spend ninety minutes in one shop than twenty in five. Akihabara is the rare Tokyo day where the free version is genuinely good: animate opens at 10:00, Radio Kaikan at 10:00, Super Potato at 11:00 and Mandarake Complex at 12:00, and all four are within a few minutes of the Electric Town Exit.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20l5-2 3-12 3 12 5 2" />
        <circle cx="12" cy="4" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Book the private version if…",
    desc: "The group does not share the interest. One private listing routes a maid café together with Kanda Myojin shrine, which is the compromise that keeps a non-fan happy for a morning; the other simply removes the group, so you can stop where you like. Both are listed as half days.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M17 11h4M19 9v4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide whether you are shopping or sightseeing",
    desc: "If you have a list of titles and figures, go alone — nothing a guide does helps you buy. If the appeal is the atmosphere, the maid café and understanding what you are looking at, the guided version is worth the money, because those are the three things hardest to arrange from outside Japan.",
  },
  {
    title: "Match the length to the rest of your day",
    desc: `The guided options we checked on ${CHECKED} split cleanly: 3 hours for the join-in walk, a listed half day for either private tour, 5 hours for the private-group otaku tour, and 4 hours 50 minutes for the evening run that treats Akihabara as one stop between Ueno and Shibuya. Only the five-hour one eats a whole afternoon.`,
  },
  {
    title: "Check the departure time before anything else",
    desc: "This is the detail that decides the day. The best-booked listing we checked runs at 14:00 and 18:00 — there is no morning option on it, so a plan that has you in Akihabara at 10:00 means either a different listing or a different day. The shops open from 10:00 and the latest of the four closes at 20:00, so an 18:00 start is a shopping tour with two hours of shops left in it.",
  },
  {
    title: "Book ahead — the inventory here is small",
    desc: "Two departures a day and a stated cap of 10 people is roughly 20 seats a day on the headline listing, and the private tours are one party at a time by definition. That is not an attraction with a turnstile; a wet Saturday in school holidays clears it. Klook shows each listing's own cancellation terms and cut-off on the product page — read that line before you commit to a date, since the private and join-in formats do not always share a policy.",
  },
  {
    title: "Read the age line if children are coming",
    desc: "Tour listings set their own minimum ages and the maid cafés set their own too — maidreamin publishes an elementary-school entrance charge and lets under-school-age children in free, which tells you children are expected rather than tolerated. The tour listing is the one to check, because a late evening departure is a different proposition from a 14:00 one.",
  },
];

const faqItems = [
  {
    q: "Is an Akihabara anime tour worth it?",
    a: "It depends on what you came for. If you are shopping, no — the shops are free to enter, four of the big ones sit within a few minutes of JR Akihabara's Electric Town Exit, and a guide cannot help you buy. If you want the maid café, the context and the parts of the district you would walk past, yes: the best-booked listing we checked states that maid-café seating is guaranteed and that it runs with an English- or Japanese-speaking guide for a group of 1 to 10, and both of those are genuinely hard to arrange on your own. Listings checked " + CHECKED + ".",
  },
  {
    q: "How long do you need in Akihabara?",
    a: "Three to five hours covers it, which is exactly the range the guided tours are sold in. The join-in Electric & Anime Town walk is listed at 3 hours, either private walking tour is listed as a half day, and the Tokyo otaku tour is listed at 5 hours; the evening tour that takes in Ueno and Shibuya as well is listed at 4 hours 50 minutes in total. On your own, three hours is enough for animate, Radio Kaikan, Super Potato and Mandarake Complex at a walking pace, and a full day only if you intend to go floor by floor.",
  },
  {
    q: "What time do Akihabara shops open?",
    a: "Between 10:00 and 12:00, and most close at 20:00 or 21:00. From their own sites on " + CHECKED + ": animate Akihabara buildings 1 and 2 open 10:00–21:00 daily (the ANNEX closes at 20:00 at weekends and on holidays), Akihabara Radio Kaikan's shop floors run 10:00–20:00, Super Potato is 11:00–20:00 every day and open year-round, and Mandarake Complex is 12:00–20:00 and also year-round. The maidreamin maid cafés are the outlier — 11:30 to 23:00 on weekdays and 10:30 to 23:00 at weekends and on holidays. A 09:00 arrival in Akihabara has nothing open in it.",
  },
  {
    q: "Can kids join an Akihabara anime tour?",
    a: "Usually, but the age rule lives on the individual listing rather than on the district, so check it there — a tour departing at 18:00 is a different proposition from one at 14:00. The maid café part is set up for children: maidreamin's own price list charges ¥330 for an elementary-school child and nothing at all for under-school-age children, against ¥880 for an adult, per hour of seating. Arcades, capsule-toy machines and purikura booths all work for children too. Charges read off maidreamin's site on " + CHECKED + ".",
  },
  {
    q: "How do I get to Akihabara?",
    a: "By JR, and leave by the Electric Town Exit. JR East lists three lines at Akihabara: the Yamanote loop (JY03), the Keihin-Tohoku and Negishi Line (JK28) and the Chuo-Sobu local line (JB19), which is the direct one from Shinjuku. Tokyo Metro's Hibiya Line is the only subway line at the station itself, and the Tsukuba Express terminates there; Tokyo Metro's own page also lists Toei Subway among the connecting operators. If you hold a Tokyo Subway Ticket, note that it covers the Hibiya Line and none of the three JR lines.",
  },
  {
    q: "Can you take photos inside Akihabara shops and maid cafés?",
    a: "Assume no until a sign or a member of staff says otherwise, and treat the maid café as the clearest case. maidreamin states its rule on its own site: photographing your food and yourself is fine, photographing maids without permission is not, and photos and video are acceptable as long as no maid, kitchen cast member or other customer is in the shot — a paid cheki is the sanctioned way to get a picture with a maid. Shop-floor rules are set shop by shop and are not published centrally, so the safe default is to ask. Rule read on maidreamin's site on " + CHECKED + ".",
  },
  {
    q: "Do I need to book an Akihabara anime tour in advance?",
    a: "Yes, more than the size of the district suggests. The headline listing runs two departures a day — 14:00 and 18:00 — with a stated group size of 1 to 10, which is around 20 places a day; the private tours take one party at a time. There is no ticket window to fall back on, so a wet weekend or a school-holiday afternoon can leave nothing bookable on your date. Open the listing for your day and check its own cancellation terms and booking cut-off at the same time.",
  },
  {
    q: "What does a maid café cost if I just walk in?",
    a: "maidreamin, which runs seven branches in Akihabara, charges an entrance fee per hour of seating on top of whatever you order: ¥880 for an adult, ¥660 for a university or vocational student, ¥550 for a middle or high school student, ¥330 for an elementary-school child, free under school age and ¥440 from age 60, all tax included. Its own site notes the fee varies by branch and time of day and is confirmed before you are seated. The guided tours include a maid-café visit with seating guaranteed instead, which is the part that matters on a busy evening. Charges read on " + CHECKED + ".",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/akihabara-anime-tour") } });

export default function AkihabaraAnimeTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Akihabara Anime Tour (2026): Hours, Shops &amp; Booking</title>
        <meta
          name="description"
          content="An Akihabara anime tour runs 3 to 5 hours from JR Akihabara Station. Compare guided tours with going it alone, plus shop hours, kids and how to book."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/akihabara-anime-tour" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Akihabara Anime Tour (2026): Hours, Shops & Booking" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/akihabara-anime-tour" />
        <meta property="og:description" content="An Akihabara anime tour runs 3 to 5 hours from JR Akihabara Station. Compare guided tours with going it alone, plus shop hours, kids and how to book." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Akihabara Anime Tour (2026): Hours, Shops & Booking" />
        <meta name="twitter:description" content="An Akihabara anime tour runs 3 to 5 hours from JR Akihabara Station. Compare guided tours with going it alone, plus shop hours, kids and how to book." />
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
              route: "/guides/attractions/akihabara-anime-tour",
              headline: "Akihabara Anime Tour (2026): Guided Tours, Shop Hours & How to Get There",
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
                { "@type": "ListItem", position: 4, name: "Akihabara Anime Tour", item: "https://www.japan-travel-kit.com/guides/attractions/akihabara-anime-tour" },
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
          <span className={styles.breadCurrent}>Akihabara Anime Tour</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Akihabara Anime Tour (2026):<br />Guided Tours, Shop Hours &amp; How to Get There
          </h1>
          <p className={styles.heroSubtitle}>
            Three hours, five hours or a private half day — and an honest answer on whether you
            need a guide at all in a district where every shop is free to walk into.
          </p>
          <div className={styles.heroBadges}>
            {[`Checked ${CHECKED}`, "JR Akihabara, Electric Town Exit", "Indoor & Year-Round"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Where it starts</p>
                <p className={styles.verdictStatValue}>JR Akihabara, Electric Town Exit</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Guided tour length</p>
                <p className={styles.verdictStatValue}>3 hours to 5 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Shops open</p>
                <p className={styles.verdictStatValue}>10:00–12:00, close 20:00–21:00</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cost on your own</p>
                <p className={styles.verdictStatValue}>Free to walk in</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> an Akihabara anime tour starts at JR Akihabara Station&apos;s
              Electric Town Exit and runs 3 to 5 hours — the join-in Electric &amp; Anime Town walk
              is listed at 3 hours, the two private walking tours at a half day each, and the Tokyo
              otaku tour at 5 hours. The best-booked listing departs at 14:00 and 18:00 only, for a
              group of 1 to 10, with an English- or Japanese-speaking guide. Going on your own costs
              nothing and the four landmark shops all open within a few minutes&apos; walk of that exit
              — animate from 10:00, Radio Kaikan from 10:00, Super Potato from 11:00, Mandarake
              Complex from 12:00. What a guide actually buys you is the maid café with seating
              guaranteed and someone who can read the Japanese-only floor signage. Tour details and
              every opening time above checked {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={akihabaraAnimeMangaMaidCafeTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Akihabara tour times &amp; dates →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Worth it? — the answer-first body paragraph */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The honest version</span>
          <h2 className={styles.sectionTitle}>Is an Akihabara Anime Tour Worth It?</h2>
          <p className={styles.bodyText}>
            An Akihabara anime tour is worth booking for the maid café and the context, and not worth
            booking if you came to shop. The guided walks sold for the district run 3 to 5 hours from
            JR Akihabara Station&apos;s Electric Town Exit, and every shop they enter is free to walk
            into on your own — animate, Akihabara Radio Kaikan, Super Potato and Mandarake Complex are
            all within a few minutes of that exit and all open by 12:00. What the tour adds is narrower
            and more specific than the listings imply: the one we checked on {CHECKED} states that
            maid-café seating is guaranteed and that the guide speaks English or Japanese for a group
            of between 1 and 10 — which covers the two parts of Akihabara that a first-time visitor
            genuinely cannot arrange from outside Japan.
          </p>
          <p className={styles.bodyText}>
            That makes this an unusual page in this category. Most of the attractions we write about
            cannot be done without a ticket; Akihabara can be done entirely for free, and done well.
            So the sections below give you the solo version properly — the shops&apos; own published
            hours, the station exits, what a maid café charges if you simply walk in — and then set the
            guided options against it, with the departure times and lengths each listing states. Decide
            on that rather than on the photos.
          </p>
        </section>

        {/* Tour comparison table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour types</span>
          <h2 className={styles.sectionTitle}>Which Akihabara Tours Exist, and How Long They Run</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Length / departures", "What the listing covers"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour}>
                      <td className={styles.tdProvider}>{row.tour}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.length}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.covers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Lengths, departure times and group sizes as the Klook listings state them, checked {CHECKED}.
            No prices appear here: Klook answers automated reads of its product pages with HTTP 403, so
            there is no figure we could have verified — open a listing for the price on your date.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={akihabaraAnimeMangaMaidCafeTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Compare Akihabara tours on Klook →
            </KlookLink>
          </div>
        </section>

        {/* How long */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Timing</span>
          <h2 className={styles.sectionTitle}>How Long Do You Need in Akihabara?</h2>
          <p className={styles.bodyText}>
            Three hours is enough and five is generous, which is exactly the band the tours are sold in.
            On your own, three hours walks you through animate, Radio Kaikan, Super Potato and Mandarake
            Complex without rushing, because they sit within a few minutes of each other and of the
            Electric Town Exit. A full day only makes sense if you intend to work through the floors
            rather than the shops — these are buildings of five and six storeys, each floor a different
            category, and that is where an afternoon disappears.
          </p>
          <p className={styles.bodyText}>
            The constraint is the clock at both ends. Nothing on the list above is open at 09:00, and the
            earliest closing time is 20:00 — so a day that starts at 13:00 has about seven usable hours in
            it, and one that starts at 17:00 has three. That matters for the guided options too: the
            headline listing&apos;s two departures are 14:00 and 18:00, and the 18:00 start leaves two
            hours before the shops begin shutting.
          </p>
        </section>

        {/* Shop hours table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Opening hours</span>
          <h2 className={styles.sectionTitle}>What Time Do Akihabara Shops Open?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Place", "Published hours", "Note"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider}>{row.place}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Every time above is from the operator&apos;s own site, read on {CHECKED}. Only these five are
            listed because only these five publish their hours in a form we could check — Kanda Myojin
            shrine, which two of the private tours route through, publishes an address and a phone number
            and no visiting hours, so none are quoted for it here.
          </p>
        </section>

        {/* Access table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Akihabara?</h2>
          <p className={styles.bodyText}>
            Akihabara is a JR station first and a subway station second, and the shops are all on one
            side of it. Leave by the Electric Town Exit (電気街口) and you are in the middle of the
            district; leave by the Showa-dori side and you have a detour. Three JR lines, one Tokyo Metro
            line and the Tsukuba Express call there.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Line", "What it is good for", "Exit to use"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.exit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            One pass trap worth knowing before you buy. The{" "}
            <Link href="/guides/attractions/tokyo-subway-ticket" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Tokyo Subway Ticket
            </Link>{" "}
            covers Tokyo Metro and Toei Subway, which at Akihabara means the Hibiya Line and nothing else
            — not the Yamanote, not the Keihin-Tohoku, not the Chuo-Sobu. If your Akihabara day is bolted
            onto a Ginza or Roppongi day, the pass works; if you are arriving from Shinjuku on the
            Chuo-Sobu, you are paying the JR fare regardless. Lines confirmed on JR East&apos;s and Tokyo
            Metro&apos;s own station pages on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoSubwayTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Tokyo Subway Ticket →
            </KlookLink>
          </div>
        </section>

        {/* Guided vs solo */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Guided or solo</span>
          <h2 className={styles.sectionTitle}>Guided Tour or Going on Your Own?</h2>
          <div className={styles.whoForGrid}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Maid cafe charges */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Maid café</span>
          <h2 className={styles.sectionTitle}>What Does a Maid Café Cost If You Walk In?</h2>
          <p className={styles.bodyText}>
            This is the one part of an Akihabara day with a published price, and it is not what most
            visitors expect: you pay an entrance charge for each hour you are seated, and then pay for
            what you order on top. maidreamin — which runs seven branches in Akihabara, all open 11:30 to
            23:00 on weekdays and 10:30 to 23:00 at weekends and on holidays — sets that charge by age.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Who", "Entrance charge, per hour of seating"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {maidCafeRows.map((row) => (
                    <tr key={row.who}>
                      <td className={styles.tdProvider}>{row.who}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            maidreamin&apos;s own published charges, tax included, read on {CHECKED}. The site notes the
            fee varies by branch and time of day and is confirmed before you are seated, and that food and
            drink are charged separately. Other maid cafés set their own prices.
          </p>
          <p className={styles.bodyText}>
            Which is why the tours put the maid café at the centre of their pitch rather than the shops.
            The listing we checked states that seating is guaranteed, and on a Saturday evening in a
            28-seat room up three flights of stairs, that is the part worth paying for.
          </p>
        </section>

        {/* Photography */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Photos</span>
          <h2 className={styles.sectionTitle}>Can You Take Photos Inside?</h2>
          <p className={styles.bodyText}>
            Assume not until a sign or a member of staff tells you otherwise. The maid café is the clearest
            case because the rule is published: maidreamin states that photographing your food or yourself
            is fine, that photographing maids without permission is not, and that photos and video are
            acceptable so long as no maid, kitchen cast member or other customer appears in the shot. If
            you want a picture with a maid, the sanctioned route is the paid cheki — the commemorative
            instant photo on the menu.
          </p>
          <p className={styles.bodyText}>
            Shop floors are a different matter, and the honest answer is that there is no district-wide
            rule to quote. Individual stores set their own policy, many post it only at the entrance or on
            the shelf, and none of the four shops in the table above publishes a photography rule on its
            website. The working assumption that will not get you in trouble: no photos of staff, no photos
            of other customers, and ask before you photograph stock. Rules read on maidreamin&apos;s own
            site on {CHECKED}; everything else here is the absence of a published rule rather than
            permission.
          </p>
        </section>

        {/* Kids */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>With children</span>
          <h2 className={styles.sectionTitle}>Can Kids Join an Akihabara Anime Tour?</h2>
          <p className={styles.bodyText}>
            Generally yes, with one caveat and one warning. The caveat is that each tour listing sets its
            own minimum age, so that line is the one to read rather than anything written about the
            district — and a listing whose departures are 14:00 and 18:00 means the family option is the
            earlier one. The warning is simply the hour: an 18:00 start runs into the evening in a district
            full of arcades.
          </p>
          <p className={styles.bodyText}>
            The maid café is set up for children rather than merely tolerant of them. maidreamin&apos;s own
            price list charges ¥330 for an elementary-school child and nothing for a child under school
            age, against ¥880 for an adult, per hour of seating. Arcades, capsule-toy machines and purikura
            photo booths need no reservation and no language, which makes them the easiest hour of the day
            with younger children. Charges read on {CHECKED}.
          </p>
        </section>

        {/* Rain */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Weather</span>
          <h2 className={styles.sectionTitle}>What If It Rains?</h2>
          <p className={styles.bodyText}>
            Akihabara is the Tokyo wet-weather plan, which is also why it is harder to book on a wet day
            than a dry one. Almost everything is indoors and vertical: the shops in the table above occupy
            whole buildings, the arcades and capsule-toy floors are indoors, and the maid cafés are on the
            second, third and sixth floors of their buildings. The only outdoor element in any of this is
            the walk between them, and the longest of those is four minutes.
          </p>
          <p className={styles.bodyText}>
            The corollary is the booking advice. A guided walk with two departures a day and a stated cap of
            10 is a small amount of inventory, and a rainy Saturday is exactly when every other visitor
            reaches the same conclusion about Akihabara. If your trip has one flexible indoor day in it,
            book the tour for a date rather than keeping it in reserve.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={akihabaraAnimeMangaMaidCafeTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              See which Akihabara dates are open →
            </KlookLink>
          </div>
        </section>

        {/* How to choose and book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Choose and Book</h2>
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
            <KlookLink href={akihabaraAnimeMangaMaidCafeTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check Akihabara tour times &amp; dates →
            </KlookLink>
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

        <KlookTourPicks
          heading="Every Akihabara Tour We Could Confirm"
          intro={`The six listings behind the comparison table, in the order the table uses them, plus the evening run that treats Akihabara as one stop of three. All confirmed live and on sale on ${CHECKED}; open a listing for the price and the dates still open on yours.`}
          tours={[
            akihabaraAnimeMangaMaidCafeTour,
            akihabaraElectricTownWalk,
            akihabaraOtakuFiveHourTour,
            akihabaraPrivateAnimeLoverTour,
            akihabaraAnimeMangaPrivateTour,
            akihabaraOtakuUniverseTour,
            tokyoNightTourAkihabaraShibuya,
          ]}
        />

        <KlookTripPrep
          heading="What an Akihabara Day Actually Needs Booked"
          intro="Three of these four are decided before you land, and the first one has a trap in it specific to this district — Akihabara's main lines are JR, not subway."
          items={akihabaraTripPrep}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/things-to-do-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Tokyo (2026): What to Book Ahead and What to Walk Into</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 11h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/samurai-ninja-experience-tokyo" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4l5 5-9 9-5 1 1-5z" />
                  <path d="M3 21l3-3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Samurai &amp; Ninja Experience in Tokyo (2026): Where to Go</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-go-kart" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 13h2l2-3h8l2 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Street Go-Kart (2026): Rules, IDP Requirement &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-joypolis-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="11" rx="4" />
                  <path d="M7 11v3M5.5 12.5h3" />
                  <circle cx="16" cy="11.5" r="1" />
                  <circle cx="18.5" cy="14" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Joypolis Tickets (2026): Passport Prices, Hours and Height Limits</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-subway-ticket" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Subway Ticket (2026): 24, 48 or 72 Hours — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-night-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3v8a3 3 0 0 0 6 0V3" />
                  <path d="M9 11v10" />
                  <path d="M17 3c1.5 2 1.5 5 0 7v11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Night Food Tour (2026): Omoide Yokocho, Golden Gai and the 20+ Rule</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-transportation" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Getting Around Tokyo (2026): Trains, Subway &amp; IC Cards Explained</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/money/tax-free-shopping-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12l-8 8-8-8 8-8h6a2 2 0 0 1 2 2z" />
                  <circle cx="16" cy="8" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tax-Free Shopping in Japan (2026): How to Get Your Consumption Tax Back</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the part you cannot just walk into</h2>
            <p className={styles.ctaBannerDesc}>
              The shops are free and open from 10:00. The maid café with seating guaranteed, the guide who
              can read the floor signage and the two fixed departure times are the parts that need a date
              on them — and on two departures a day, a wet weekend clears them.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={akihabaraAnimeMangaMaidCafeTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                Check Akihabara tour times &amp; dates →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
