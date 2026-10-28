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
    desc: `The meal is the point and you want the traditional version. The Tokyo Yakatabune Cooperative lists cruising times of 2 to 2 hours 30 minutes from ¥13,000 per person, with the yakatabune meal and free-flowing drinks in the price, and departures at a time you choose between 11:00 and 20:00. The catch is the group size: a charter needs 15 people from Monday to Thursday and 20 from Friday to Sunday, so couples and pairs book a joined boat (noriai), which takes bookings from two people. Read off the cooperative's own site on ${CHECKED}.`,
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
    desc: `You want a fixed timetable and a real dining room, or you want to sail without committing to a full dinner. It runs four sailings a day out of Hinode Pier — 11:50, 15:00, 16:20 and 19:00 — and sells a boarding-only ticket on each one, from ¥1,800 for an adult on the 50-minute afternoon sailing. That is the cheapest seat on a dedicated Tokyo Bay cruise we could verify anywhere. Prices read off symphony-cruise.co.jp on ${CHECKED}.`,
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
    desc: `Two people cannot charter a houseboat. The cooperative publishes minimums of 15 people Monday to Thursday and 20 from Friday to Sunday for a private boat, and sells joined boats — where your group shares the vessel with others at a separate table — from two people. If you are a couple, the joined boat is the booking, and the listings on Klook are mostly that format.`,
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

const faqItems = [
  {
    q: "How much does a Tokyo Bay cruise cost?",
    a: `It depends entirely on which boat, and the range is wide. On the Symphony, the cruising restaurant at Hinode Pier, a boarding-only ticket is ¥1,800 for an adult and ¥900 for a child on the 50-minute afternoon sailing, ¥3,600 and ¥1,800 on the lunch and sunset sailings, and ¥4,400 and ¥2,200 on the dinner sailing. Add a meal and the cheapest plans are ¥2,800 for the afternoon tea-time plan on a weekday and ¥9,000 for the lunch Italian course, rising to ¥14,000 on a weekday dinner. A yakatabune houseboat starts at ¥13,000 per person with the meal and free-flowing drinks included. If you only want to be on the water, the Tokyo Cruise water bus from Hinode Pier to Odaiba Seaside Park is ¥600. All read off the operators' own sites on ${CHECKED}.`,
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
    q: "How long does a Tokyo Bay cruise take?",
    a: `Between 50 minutes and two and a half hours, and you should choose deliberately. The Symphony's afternoon sailing is 50 minutes, its sunset sailing two hours and its dinner sailing two and a half; a yakatabune is listed at 2 to 2 hours 30 minutes; the one-hour small-boat sunset cruise on Klook is the short no-meal option. Add travel to the pier and a 15 to 30-minute boarding window, so a dinner cruise realistically owns your whole evening. Checked ${CHECKED}.`,
  },
  {
    q: "Which sailing has the best view — day, sunset or dinner?",
    a: "Sunset, if the date allows it. A sunset sailing gives you daylight over the bay, the sky going over, and the Rainbow Bridge and the Odaiba skyline lit, all inside one two-hour run — three views for one ticket. A dinner cruise is entirely a night cruise, which is the better choice if the lit skyline is what you came for and you want a long meal with it. A lunch or afternoon sailing is the clearest for photographs of the bridge and the waterfront, and on a clear winter day it is the one with any chance of Mt. Fuji on the horizon.",
  },
  {
    q: "Where do Tokyo Bay cruises depart from?",
    a: `Most of the large boats go from Hinode Pier in Minato-ku, at 2-7-104 Kaigan. It is a one-minute walk from Hinode Station on the Yurikamome line, about 12 minutes on foot from the south exit of Hamamatsucho on the JR Yamanote Line, and about 15 minutes from Daimon on the Toei Oedo Line; there is no parking, so the operator assumes you arrive by train. Yakatabune are different: the cooperative says boats leave from each boathouse&apos;s own pier, which is free to use, or from a public pier for a fee — so the boarding point belongs to the individual boat rather than to the city, and it is the first thing to check on a listing. One of the Klook small-boat listings boards at Shibaura instead. Access details read off the operators' sites on ${CHECKED}.`,
  },
  {
    q: "Do you need to book a Tokyo Bay cruise in advance?",
    a: "For anything with a meal, yes — the galley has to know numbers, so dinner cruises and yakatabune close their bookings well before the day rather than selling at the gangway. A boarding-only Symphony ticket and a water-bus fare are the two that tolerate a late decision. Peak dates are a different question again: cherry-blossom sailings on the Sumida, the summer fireworks nights and the Christmas and New Year cruises sell out and are often priced as separate special itineraries, so book those as early as you book the flight.",
  },
  {
    q: "Can you do a Tokyo Bay cruise with children?",
    a: "Yes, and the fares are built for it. The Symphony publishes a child price on every sailing — ¥900 on the afternoon cruise, ¥1,800 on lunch and sunset, ¥2,200 on dinner for a boarding-only ticket — and the 50-minute afternoon sailing is the right length for a young child. A yakatabune is a long sit-down meal with free-flowing drinks, which suits older children and adults more than toddlers. The water bus is the easy option with a buggy: short, cheap and you can get off at Odaiba Seaside Park.",
  },
  {
    q: "What happens if it rains, and what should you wear?",
    a: "Rain matters less than you would think on the big boats and more than you would like on the small ones. The Symphony and the yakatabune are enclosed, so a wet evening costs you the open deck rather than the cruise; scheduled water-bus services, by contrast, can be cancelled at short notice in bad weather, which the operator states on its own site. Dress for the water rather than the city — it is noticeably colder and windier out in the bay after dark, and the Klook listing for the Symphony dinner cruise tells you to bring a coat for exactly that reason. There is no formal dress code on the sightseeing sailings, though a yakatabune is a tatami-floored boat, so shoes come off.",
  },
  {
    q: "Is a Tokyo Bay cruise worth it, or is an observation deck better?",
    a: "They are not the same view, and if you only do one, pick by what you want to look at. A deck like Shibuya Sky or Skytree puts you above the city looking down at the sprawl; a bay cruise puts you at water level looking back at the skyline, with the Rainbow Bridge overhead and Tokyo Tower and Skytree in the same frame. A cruise is also an evening rather than an hour, and it comes with dinner. Our Tokyo observation decks comparison covers the view-from-above option, including the free one in Shinjuku.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/tokyo-bay-cruise") },
});

const TITLE = "Tokyo Bay Cruise (2026): Yakatabune vs the Symphony";
const DESC =
  "A Tokyo Bay cruise in 2026: the Symphony sails from Hinode Pier 4 times a day with tickets from ¥1,800, and a yakatabune runs 2 hours from ¥13,000.";

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
          </svg>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadCurrent}>Tokyo Bay Cruise</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Tokyo Bay Cruise (2026):<br />Yakatabune vs the Symphony, Times and Prices
          </h1>
          <p className={styles.heroSubtitle}>
            Two very different boats are sold under the same search term. Here is what each
            one costs, how long it takes and which pier it leaves from.
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
              ¥13,000 a head with dinner and free-flowing drinks included, and it needs 15 to 20 people
              to charter — couples book a joined boat instead. Prices and times read off
              symphony-cruise.co.jp and yakatabune-kumiai.jp on {CHECKED}.
            </p>
            <KlookLink
              href={tokyoBayYakatabuneDinnerCruise.url}
              target="_blank"
              rel="sponsored noopener"
              className={styles.verdictBtn}
              style={{ marginTop: "1rem" }}
            >
              Check Tokyo Bay cruises on Klook →
            </KlookLink>
          </div>
        </div>

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
          <h2 className={styles.sectionTitle}>How Much Does a Tokyo Bay Cruise Cost?</h2>
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
            and Christmas and New Year sailings are priced as separate itineraries. For the admissions we
            track across the rest of Japan, each with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={tokyoBayDinnerCruiseSymphony.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
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
          intro="Four bookable bay cruises — the Symphony, two yakatabune formats and the one-hour small boat — all confirmed live on 21 October 2026. Klook blocks automated price reads, so open a listing for the current figure, the boarding point and the cancellation terms on your date."
          tours={[
            tokyoBayDinnerCruiseSymphony,
            tokyoBayYakatabuneDinnerCruise,
            tokyoBayYakatabuneDinnerShow,
            tokyoBaySunsetBoatCruise,
          ]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
                <p className={styles.relatedTitle}>Tokyo Joypolis Tickets (2026): Passport Prices, Hours &amp; Height Limits</p>
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
            <KlookLink href={tokyoBayYakatabuneDinnerCruise.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
              View Tokyo Bay cruises on Klook →
            </KlookLink>
          </div>
        </div>
      </div>
    </>
  );
}
