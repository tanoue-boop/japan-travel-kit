import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  tokyoBayDinnerCruiseSymphony,
  tokyoBaySunsetBoatCruise,
  tokyoBayYakatabuneDinnerCruise,
  tokyoBayYakatabuneDinnerShow,
} from "../../../lib/klook-links";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * The Tokyo Bay cruise entry guide. Two completely different products are sold under
 * the one search term — a 1,000-seat cruising restaurant and a low-slung wooden
 * houseboat — and the page exists mainly to separate them before anyone books.
 *
 * Every time and fare below was read off the operator's own site on 21 Oct 2026 and is
 * dated in the copy: symphony-cruise.co.jp (the Symphony's four sailings and its
 * boarding-only and meal-plan prices), yakatabune-kumiai.jp (the Tokyo Yakatabune
 * Cooperative's cruising times, charter minimums and starting price) and
 * suijobus.co.jp (Tokyo Cruise water-bus fares and journey times).
 *
 * No Klook price appears: Klook answers automated reads of its product pages with HTTP
 * 403, so there is no figure from a listing we could have verified. Durations and
 * boarding points attributed to a listing come from that listing's own description.
 */

const CHECKED_ISO = "2026-10-21";
const CHECKED = checkedLabel(CHECKED_ISO);

/** The Symphony's own timetable and its cheapest fare on each sailing. */
const symphonyRows = [
  {
    cruise: "Lunch cruise",
    time: "11:50 – 14:00 (130 min)",
    boardingOnly: "¥3,600 adult / ¥1,800 child",
    withFood: "Italian course from ¥9,000 Mon–Fri, ¥10,000 weekends and holidays",
  },
  {
    cruise: "Afternoon cruise",
    time: "15:00 – 15:50 (50 min)",
    boardingOnly: "¥1,800 adult / ¥900 child",
    withFood: "Tea-time plan with coffee ¥2,800 Mon–Fri, ¥3,300 weekends and holidays",
  },
  {
    cruise: "Sunset cruise",
    time: "16:20 – 18:20 (120 min)",
    boardingOnly: "¥3,600 adult / ¥1,800 child",
    withFood: "Italian course from ¥11,000 Mon–Fri, ¥12,000 weekends and holidays",
  },
  {
    cruise: "Dinner cruise",
    time: "19:00 – 21:30 (150 min)",
    boardingOnly: "¥4,400 adult / ¥2,200 child",
    withFood: "Italian course from ¥14,000 Mon–Fri, ¥15,000 weekends and holidays",
  },
];

/** The three kinds of boat sold as a "Tokyo Bay cruise", side by side. */
const boatRows = [
  {
    kind: "Yakatabune (traditional houseboat)",
    duration: "2 to 2 hr 30 min cruising time",
    cost: "From ¥13,000 per person, meal and free-flowing drinks included",
    board: "Each boathouse's own pier (free) or a public pier (fee); departures between 11:00 and 20:00",
    bestFor: "An evening that is the dinner, with tatami seating and an open deck off Odaiba",
    source: "yakatabune-kumiai.jp",
  },
  {
    kind: "The Symphony (cruising restaurant)",
    duration: "50 to 150 min depending on the sailing",
    cost: "Boarding only from ¥1,800; with a meal from ¥2,800",
    board: "Hinode Pier, 2-7-104 Kaigan, Minato-ku — one minute from Hinode Station on the Yurikamome",
    bestFor: "A fixed timetable, a proper dining room and the option to sail without buying dinner",
    source: "symphony-cruise.co.jp",
  },
  {
    kind: "Tokyo Cruise water bus",
    duration: "About 20 to 90 min, point to point",
    cost: "Hinode–Odaiba Seaside Park ¥600; Asakusa–Hinode ¥1,000; Asakusa–Odaiba ¥2,000",
    board: "Asakusa, Hinode Pier, Odaiba Seaside Park, Toyosu and others",
    bestFor: "Seeing the bay for the price of a train fare, as transport rather than an event",
    source: "suijobus.co.jp",
  },
];

const whoFor = [
  {
    title: "Book a yakatabune if…",
    desc: `The meal is the point and you want the traditional version. The Tokyo Yakatabune Cooperative lists cruising times of 2 to 2 hours 30 minutes from ¥13,000 per person, with the yakatabune meal and free-flowing drinks in the price, and departures at a time you choose between 11:00 and 20:00. The catch is the group size: a charter takes 10 to 120 adults, with a higher minimum at weekends and in July–September, so couples and pairs book a joined boat (noriai), which takes bookings from two people. Read off the cooperative's own site on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h18l-2 4H5z" />
        <path d="M5 17V9h14v8" />
        <path d="M9 9V5h6v4" />
      </svg>
    ),
  },
  {
    title: "Book the Symphony if…",
    desc: `You want a fixed timetable and a real dining room, or you want to sail without committing to a full dinner. It runs four sailings a day out of Hinode Pier — 11:50, 15:00, 16:20 and 19:00 — and sells a boarding-only ticket on each one, from ¥1,800 for an adult on the 50-minute afternoon sailing. That is the cheapest verified seat on a dedicated Tokyo Bay cruise anywhere. Prices read off symphony-cruise.co.jp on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 18h20l-2 3H4z" />
        <path d="M4 18V8h16v10" />
        <path d="M7 11h3M14 11h3M7 14h3M14 14h3" />
      </svg>
    ),
  },
  {
    title: "Take the water bus if…",
    desc: `You only want to be on the water, and you would rather spend the money elsewhere. Tokyo Cruise runs scheduled boats between Asakusa, Hinode Pier, Odaiba Seaside Park and Toyosu: Hinode to Odaiba Seaside Park is about 20 minutes for ¥600, Asakusa to Hinode about 40 minutes for ¥1,000, and Asakusa straight through to Odaiba about 70 minutes for ¥2,000. It is transport, not an event — no meal, no reserved table. Fares read off suijobus.co.jp on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 19c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
        <path d="M5 15V7h14v8" />
        <path d="M12 7V4" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Decide which boat before you decide which date",
    desc: "This is the whole decision. A yakatabune is a low wooden houseboat where you sit at a long table and the meal runs the length of the cruise; the Symphony is a four-deck cruising restaurant with a timetable and a boarding-only ticket. Searching for a Tokyo Bay cruise returns both, and they are not substitutes for each other.",
  },
  {
    title: "Pick the sailing, because it sets the view",
    desc: `The Symphony's own timetable is lunch 11:50 to 14:00, afternoon 15:00 to 15:50, sunset 16:20 to 18:20 and dinner 19:00 to 21:30. The afternoon sailing is 50 minutes and the cheapest; the sunset sailing is the one that gives you daylight, dusk and the lit skyline in a single two-hour run. Times read off symphony-cruise.co.jp on ${CHECKED}, and the operator notes they can shift with sea conditions.`,
  },
  {
    title: "Check the group minimum before you plan a yakatabune",
    desc: `Two people cannot charter a houseboat. The cooperative publishes a range of 10 to 120 adults for a private boat, with a higher minimum at weekends and in July–September, and sells joined boats — where your group shares the vessel with others at a separate table — from two people. If you are a couple, the joined boat is the booking, and the listings on Klook are mostly that format.`,
  },
  {
    title: "Book the dates that sell out, early",
    desc: "Cherry-blossom season on the Sumida, the summer fireworks nights over the bay, and Christmas and New Year sailings are the dates where boats fill and operators run one-off special cruises at their own prices. Everything else is far more relaxed. If your trip includes one of those dates and you want to be on the water for it, treat it as the first booking of the trip, not the last.",
  },
  {
    title: "Allow for the boarding cut-off, not the departure time",
    desc: `A boat leaves without you in a way a restaurant does not. The Symphony asks that boarding formalities be completed 15 minutes before departure and its English access page tells visitors to arrive 30 minutes ahead; there is no parking at the pier, so public transport is assumed. Hinode Pier is a one-minute walk from Hinode Station on the Yurikamome, about 12 minutes from the south exit of Hamamatsucho on the JR Yamanote Line, and about 15 minutes from Daimon on the Toei Oedo Line. Checked ${CHECKED}.`,
  },
  {
    title: "Read the cancellation terms on the listing you choose",
    desc: "They are not the same across operators or across resellers, and this is the one thing a search summary will not get right for your booking. Dinner cruises with a per-head meal tend to have the tightest terms; a boarding-only ticket or a water-bus fare has the least at stake. Scheduled water-bus services can also be cancelled at short notice in bad weather, which the operator states outright.",
  },
];

/** Re-read on the operators' own sites for the 18 Nov 2026 pass (task R-series, Nov 18). */
const FARES_ISO = "2026-11-18";
const FARES_CHECKED = checkedLabel(FARES_ISO);

/**
 * The fare table at the top of the page. First row is the answer. Every figure was read on
 * 18 Nov 2026 off suijobus.co.jp/en/price/ (Tokyo Cruise), the Symphony's afternoon and
 * dinner plan pages on symphony-cruise.co.jp, and yakatabune-kumiai.jp.
 */
const fareRows = [
  {
    boat: "Cheapest Tokyo Bay cruise: Tokyo Cruise water bus, Hinode Pier → Odaiba Seaside Park",
    fare: "¥600 adult / ¥300 child",
    time: "About 20 min",
    source: "suijobus.co.jp",
  },
  {
    boat: "Tokyo Cruise water bus, Asakusa → Hinode Pier",
    fare: "¥1,000 adult / ¥500 child (¥1,400 on Hotaluna)",
    time: "About 40 min",
    source: "suijobus.co.jp",
  },
  {
    boat: "Tokyo Cruise Hotaluna or Emeraldas, Asakusa → Odaiba Seaside Park",
    fare: "¥2,000 adult / ¥1,000 child",
    time: "About 55–60 min",
    source: "suijobus.co.jp",
  },
  {
    boat: "Tokyo Cruise Himiko, Asakusa → Toyosu",
    fare: "¥2,600 adult / ¥1,300 child",
    time: "About 90 min",
    source: "suijobus.co.jp",
  },
  {
    boat: "Symphony afternoon cruise, boarding only (Hinode Pier)",
    fare: "¥1,800 adult / ¥900 child",
    time: "15:00–15:50",
    source: "symphony-cruise.co.jp",
  },
  {
    boat: "Symphony dinner cruise, boarding only (Hinode Pier)",
    fare: "¥4,400 adult / ¥2,200 child",
    time: "19:00–21:30",
    source: "symphony-cruise.co.jp",
  },
  {
    boat: "Symphony dinner cruise with an Italian course",
    fare: "From ¥14,000 Mon–Fri, ¥15,000 weekends and holidays",
    time: "19:00–21:30",
    source: "symphony-cruise.co.jp",
  },
  {
    boat: "Yakatabune houseboat (Tokyo Yakatabune Cooperative)",
    fare: "Usually ¥13,000 adult, meal and free-flowing drinks included",
    time: "About 2 hr to 2 hr 30 min",
    source: "yakatabune-kumiai.jp",
  },
];

const faqItems = [
  {
    q: "How much is a Tokyo Bay cruise?",
    a: `From ¥600 to about ¥15,000 per adult, depending on the boat. The Tokyo Cruise water bus from Hinode Pier to Odaiba Seaside Park is ¥600 (about 20 minutes); the Symphony sells boarding-only seats from ¥1,800 on its 50-minute afternoon sailing to ¥4,400 on its dinner sailing, with a dinner course from ¥14,000 on weekdays; and a yakatabune houseboat is usually ¥13,000 with the meal and drinks included. Read on the operators' own sites on ${FARES_CHECKED}.`,
  },
  {
    q: "Which Tokyo Bay cruise goes to Odaiba?",
    a: `The Tokyo Cruise water bus. Hinode Pier to Odaiba Seaside Park is ¥600 and about 20 minutes, and Asakusa to Odaiba Seaside Park on the Hotaluna or Emeraldas is ¥2,000 and about 55 to 60 minutes. The Tokyo Mizube Line also runs an Asakusa–Odaiba cruise, normally Wednesday to Sunday, with cashless-only tickets at Odaiba Seaside Park. Read ${FARES_CHECKED}.`,
  },
  {
    q: "What is the Gozabune Atakemaru samurai cruise?",
    a: `It is a boat built in the style of a shogun's barge that Tokyo Cruise used to list in its fleet. On ${FARES_CHECKED}, Tokyo Cruise's own fleet page listed ten boats without the Atakemaru, and no Atakemaru sailing or fare appeared on its timetable and fares page, so there is no current official fare to quote. For a traditional wooden boat on the bay, a yakatabune houseboat is the bookable option today.`,
  },
  {
    q: "What is the difference between a yakatabune and the Symphony?",
    a: `They are two different evenings. A yakatabune is a traditional low-roofed wooden houseboat: you sit at a long table on tatami, the meal — usually tempura or sukiyaki — runs the whole cruise, drinks are free-flowing, and there is an open deck at the back for the Rainbow Bridge and Tokyo Tower. The cooperative lists cruising times of 2 to 2 hours 30 minutes from ¥13,000 a head. The Symphony is a large cruising restaurant with four decks, a fixed timetable of four sailings a day from Hinode Pier, table service, and the option to buy a boarding-only ticket and skip the meal entirely. Pick the yakatabune for the atmosphere and the Symphony for the view and the flexibility. Checked ${CHECKED}.`,
  },
  {
    q: "What time do Tokyo Bay cruises leave?",
    a: `The Symphony sails four times a day from Hinode Pier: lunch at 11:50 returning 14:00, afternoon at 15:00 returning 15:50, sunset at 16:20 returning 18:20 and dinner at 19:00 returning 21:30. The operator notes these can shift slightly with sea conditions. Yakatabune are more flexible — the cooperative says a chartered boat can leave at a time you specify between 11:00 and 20:00, while a joined boat leaves at the boathouse's set time. The water buses run to a published daytime timetable. Read off the operators' sites on ${CHECKED}.`,
  },
  {
    q: "Do you need to book a Tokyo Bay cruise in advance?",
    a: `For anything with a meal, yes: dinner cruises and yakatabune close bookings before the day, and Tokyo Cruise takes online reservations only until 17:00 the day before. The Hinode Pier to Odaiba Seaside Park water bus is sold at the pier counter on the day only. Read ${FARES_CHECKED}.`,
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/tokyo-bay-cruise") },
});

const TITLE = "Tokyo Bay Cruise Price 2026: Odaiba, Symphony, Water Bus";
const DESC =
  "Tokyo Bay cruise prices: water bus Hinode–Odaiba ¥600, Symphony from ¥1,800 boarding only, yakatabune ¥13,000. Book on Klook or with the operator.";
/** The water-bus fares in the hero, re-read on suijobus.co.jp/en/price/ for task jtk-20261110-C01. */
const WATER_BUS_CHECKED = checkedLabel("2026-11-10");

export default function TokyoBayCruisePage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/tokyo-bay-cruise" />
        {hreflangLinks("/guides/attractions/tokyo-bay-cruise")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/tokyo-bay-cruise" />
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
              route: "/guides/attractions/tokyo-bay-cruise",
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
                  name: "Tokyo Bay Cruise",
                  item: "https://www.japan-travel-kit.com/guides/attractions/tokyo-bay-cruise",
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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Tokyo Bay Cruise</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Bay Cruise (2026): <br />Prices, Odaiba Boats and Dinner Cruises
          </h1>
          <p className={styles.heroSubtitle}>
            To ride cheaply, take the Tokyo Cruise water bus (Hinode Pier to Odaiba Seaside Park, ¥600, about
            20 minutes, read {WATER_BUS_CHECKED}) or the Symphony&apos;s 50-minute afternoon sailing at ¥1,800
            boarding only. For the night view with dinner, book the Symphony&apos;s 19:00 dinner cruise (course
            from ¥14,000 on weekdays) or a yakatabune houseboat from ¥13,000 with drinks included (both read on
            the operators&apos; sites on {CHECKED}).
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Operator prices, dated", "Four sailings compared"].map((t) => (
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

        {/* Answer-first block, added 18 Nov 2026: opening answer, official fare table, landing-query H2s. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>A Tokyo Bay cruise costs ¥600 to about ¥15,000 per adult</strong>, depending on the boat.
            The cheapest is the Tokyo Cruise water bus from Hinode Pier to Odaiba Seaside Park at{" "}
            <strong>¥600 for about 20 minutes</strong>; the Symphony restaurant ship sells boarding-only seats
            from <strong>¥1,800</strong> (50-minute afternoon sailing) to <strong>¥4,400</strong> (dinner
            sailing), and a yakatabune houseboat is usually <strong>¥13,000</strong> with dinner and drinks
            included. Fares read on the operators&apos; own sites on {FARES_CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Boat and route", "Adult fare", "Time", "Operator site"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={row.boat}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.boat}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: 2026-11-18. Official sources:{" "}
            <a href="https://www.suijobus.co.jp/en/price/" target="_blank" rel="noopener noreferrer">suijobus.co.jp/en/price</a>,{" "}
            <a href="https://www.symphony-cruise.co.jp/cruising_plan/dinner/dinner_2025/" target="_blank" rel="noopener noreferrer">symphony-cruise.co.jp</a>,{" "}
            <a href="https://www.yakatabune-kumiai.jp/" target="_blank" rel="noopener noreferrer">yakatabune-kumiai.jp</a>.
            One-way fares; child fares are for ages 6 to 11.
          </p>

          <h2 className={styles.sectionTitle}>How Much Is a Tokyo Bay Cruise?</h2>
          <p className={styles.bodyText}>
            ¥600 at the bottom and about ¥15,000 at the top for an adult. A seat with no meal costs ¥600 to
            ¥2,600 on the Tokyo Cruise water buses and ¥1,800 to ¥4,400 on the Symphony; with dinner, the
            Symphony&apos;s Italian course starts at ¥14,000 on weekdays (¥15,000 at weekends) and a yakatabune
            is usually ¥13,000 including drinks. All read {FARES_CHECKED}.
          </p>

          <h2 className={styles.sectionTitle}>Which Tokyo Bay Cruise Goes to Odaiba?</h2>
          <p className={styles.bodyText}>
            The Tokyo Cruise water bus: Hinode Pier to Odaiba Seaside Park is ¥600 and about 20 minutes, and
            Asakusa to Odaiba Seaside Park on the Hotaluna or Emeraldas is ¥2,000 and about 55 to 60 minutes.
            The Tokyo Mizube Line also runs an Asakusa–Odaiba cruise, normally Wednesday to Sunday, and its
            Odaiba Seaside Park counter is cashless only (
            <a href="https://www.tokyo-park.or.jp/water/waterbus/" target="_blank" rel="noopener noreferrer">tokyo-park.or.jp</a>,
            read {FARES_CHECKED}; its fare is shown by a calculator, so it is not quoted here).
          </p>

          <h2 className={styles.sectionTitle}>What Is the Gozabune Atakemaru Samurai Cruise?</h2>
          <p className={styles.bodyText}>
            It is a boat built in the style of a shogun&apos;s barge that Tokyo Cruise used to list in its
            fleet. On {FARES_CHECKED}, Tokyo Cruise&apos;s own fleet page listed ten boats without the
            Atakemaru, and no Atakemaru sailing or fare appeared on its timetable, so there is no current
            official fare to quote. For a traditional wooden boat on the bay, the yakatabune houseboat below
            is the bookable option.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoBayYakatabuneDinnerCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check yakatabune and bay cruises on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Cheapest seat</p>
                <p className={styles.verdictStatValue}>¥1,800 adult, 50 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Yakatabune</p>
                <p className={styles.verdictStatValue}>From ¥13,000, 2–2.5 hrs</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Main pier</p>
                <p className={styles.verdictStatValue}>Hinode, 1 min from the Yurikamome</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Best sailing</p>
                <p className={styles.verdictStatValue}>Sunset, 16:20–18:20</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> a Tokyo Bay cruise is one of two things. The Symphony is a
              cruising restaurant at Hinode Pier with four sailings a day — 11:50, 15:00, 16:20 and
              19:00 — and a boarding-only ticket from ¥1,800 for an adult, or a meal plan from ¥2,800.
              A yakatabune is a traditional wooden houseboat, listed at 2 to 2 hours 30 minutes from
              ¥13,000 a head with dinner and free-flowing drinks included, and a charter takes 10 to 120 adults
              — couples book a joined boat instead. Prices and times read off
              symphony-cruise.co.jp and yakatabune-kumiai.jp on {CHECKED}.
            </p>
            <KlookLink
              href={tokyoBayYakatabuneDinnerCruise.url}
              target="_blank"
              rel="sponsored nofollow noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check Tokyo Bay cruises on Klook →
            </KlookLink>
          </div>
        </div>

        <EsimCtaTop />

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is a Tokyo Bay Cruise?</h2>
          <p className={styles.bodyText}>
            It is a loose term covering every boat that takes sightseers out onto the water between
            the Sumida River mouth and Odaiba, past the Rainbow Bridge with Tokyo Tower on one side
            and Tokyo Skytree behind. Three kinds of boat do it, and the difference between them is
            larger than the difference between any two of them and a restaurant on land.
          </p>
          <p className={styles.bodyText}>
            The yakatabune is the old one — a flat, low-roofed wooden houseboat, lanterns along the
            eaves, tatami seating at a long table, and a meal that lasts the whole cruise. The
            Symphony is the modern one: a four-deck cruising restaurant on a published timetable out
            of Hinode Pier, with table service and, unusually, a ticket that lets you sail without
            buying dinner. And the Tokyo Cruise water buses are simply scheduled boats between piers,
            priced like transport because that is what they are.
          </p>
          <p className={styles.bodyText}>
            The water bus lands at Odaiba Seaside Park, in front of DECKS Tokyo Beach, and that is where a
            boat pairs with an afternoon indoors: Joypolis sells an Evening Passport from 15:00, so the park
            and an evening sailing fit into one day. Our{" "}
            <Link href="/guides/attractions/tokyo-joypolis-tickets">Tokyo Joypolis tickets</Link> guide has
            the Passport prices and an Odaiba day plan.
          </p>
        </section>

        {/* The three boats */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Yakatabune, the Symphony or the Water Bus?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Every figure below is the operator&apos;s own, with the site it came from.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Boat", "Time on the water", "Cost", "Where you board", "Best for", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {boatRows.map((row) => (
                    <tr key={row.kind}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.kind}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.duration}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.85rem" }}>{row.cost}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.board}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off those three operators&apos; own sites on {CHECKED}, and subject to change —
            confirm when you book. Yakatabune prices vary by boathouse; ¥13,000 is the cooperative&apos;s
            published starting figure with the meal and free-flowing drinks included.
          </p>
        </section>

        {/* Symphony prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Symphony Cruise Prices by Sailing</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The Symphony is the one operator that publishes a full price list for every sailing, which
            makes it the useful benchmark. Note the boarding-only column: it is the cheapest way onto a
            dedicated bay cruise, and most people do not know it exists.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Sailing", "Departure and duration", "Boarding only", "Cheapest plan with food"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {symphonyRows.map((row) => (
                    <tr key={row.cruise}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.cruise}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.boardingOnly}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.withFood}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off symphony-cruise.co.jp on {CHECKED} and subject to change — the operator also notes
            that sailing times can shift with sea conditions. Higher plans run well above these figures,
            and Christmas and New Year sailings are priced as separate itineraries — what sails on 24 and 25
            December is in the{" "}
            <Link href="/guides/attractions/tokyo-christmas-itinerary" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo Christmas itinerary
            </Link>, and the 31 December countdown sailing, with the trains home after midnight, is in{" "}
            <Link href="/guides/attractions/tokyo-new-years-eve" style={{ color: "var(--text)", fontWeight: 600 }}>
              Tokyo New Year&apos;s Eve
            </Link>. For the admissions in this
            guide across the rest of Japan, each with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoBayDinnerCruiseSymphony.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Symphony dinner cruise on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Which version */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Which version</span>
          <h2 className={styles.sectionTitle}>Which Boat Should You Book?</h2>
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

        {/* Steps */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book a Tokyo Bay Cruise</h2>
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
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            A cruise is an evening, so it pairs with a daytime plan rather than competing with one. Our{" "}
            <Link href="/guides/attractions/tokyo-3-day-itinerary">Tokyo 3 day itinerary</Link> sets out
            which stops need a timed ticket and which do not, and{" "}
            <Link href="/guides/attractions/tokyo-observation-decks">Tokyo observation decks</Link> covers
            the view-from-above alternative if you would rather look down at the bay than across it. If
            you are putting the whole evening around food,{" "}
            <Link href="/guides/attractions/tokyo-food-tour">Tokyo food and izakaya tours</Link> is the
            land-based version of the same night out.
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
          heading="Tokyo Bay Cruises You Can Book From Abroad"
          intro="Four bookable bay cruises — the Symphony, two yakatabune formats and the one-hour small boat — all confirmed live on 21 October 2026. Klook prices change by date, so open a listing for the current figure, the boarding point and the cancellation terms on your date."
          tours={[
            tokyoBayDinnerCruiseSymphony,
            tokyoBayYakatabuneDinnerCruise,
            tokyoBayYakatabuneDinnerShow,
            tokyoBaySunsetBoatCruise,
          ]}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            If the boat lands you in Odaiba, <Link href="/guides/attractions/legoland-discovery-center-tokyo-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>LEGOLAND Discovery Center Tokyo</Link> is close to Odaiba-kaihinkoen Station.
          </p>
        </section>
        <EsimCtaBottom />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 22 Nov 2026: 23–25 Dec in Tokyo, with the Christmas Eve cruise rules. */}
            <Link href="/guides/attractions/tokyo-christmas-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Christmas Itinerary 2026: 3 Days, Lights &amp; Markets</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 22 Nov 2026: 31 Dec in Tokyo — the countdown cruise, shrines and late trains. */}
            <Link href="/guides/attractions/tokyo-new-years-eve" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo New Year&apos;s Eve 2026: Countdown, Trains &amp; Hatsumode</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/shibuya-sky-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21V8l5-3 5 3v13" />
                  <path d="M13 21V11l5-3 3 2v11" />
                  <path d="M7 11v.01M7 15v.01M17 13v.01M17 17v.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shibuya Sky Tickets 2026: Price, Hours &amp; the Sunset Slot</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-illumination-tours" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="4" />
                  <path d="M12 2v2M12 18v4M4 10H2M22 10h-2M5.6 3.6 7 5M18.4 3.6 17 5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Illuminations 2026: Dates, Hours and Which Ones Are Free</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-joypolis-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <circle cx="12" cy="10" r="2" />
                  <path d="M8 20h8M12 16v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Joypolis Tickets 2026: Passport Price &amp; Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-observation-decks" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Observation Decks (2026): Shibuya Sky vs Skytree vs Tokyo Tower</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-tower-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l4 10h-8l4-10z" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Tower Tickets 2026: Price, Main Deck vs Top Deck</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tsukiji-market-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-4 7-5 10-5s6 2 8 5c-2 3-5 5-8 5s-7-1-10-5z" />
                  <circle cx="16" cy="12" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tsukiji Market Food Tour (2026): Hours, What to Eat and Which Tour to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-food-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 3v8a3 3 0 0 0 6 0V3" />
                  <path d="M7 11v10" />
                  <path d="M17 3c-1.5 2-2 4-2 6s.5 3 2 3 2-1 2-3-.5-4-2-6z" />
                  <path d="M17 12v9" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Food and Izakaya Tours (2026): Shinjuku Bar Hopping and What to Eat</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-skytree-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Skytree Tickets (2026): Prices, Floor 350 vs 450 &amp; How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo 3 Day Itinerary (2026): What to Book, and in What Order</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
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
            <Link href="/guides/attractions/asakusa-kimono-rental" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 4 4-4" />
                  <path d="M6 21V8l2-5M18 21V8l-2-5" />
                  <path d="M6 14h12" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Asakusa Kimono Rental (2026): Return Times, Hair Sets and Where to Photograph</p>
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
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the boat, then the date</h2>
            <p className={styles.ctaBannerDesc}>
              Anything with a meal closes its bookings before the day, and the fireworks, blossom and
              Christmas sailings go long before that. Klook checks out in English, takes foreign cards,
              and shows each listing&apos;s own cancellation terms before you pay.
            </p>
            <KlookLink href={tokyoBayYakatabuneDinnerCruise.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
              View Tokyo Bay cruises on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
