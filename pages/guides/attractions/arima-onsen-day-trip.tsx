import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import {
  arimaHimejiRokkoDayTour,
  arimaKinGinBusPackage,
  arimaRokkoNightViewDayTour,
  arimaRokkoOutletBusTour,
  arimaTaikoNoYuSpa,
  rokkoHikingArimaBathingTour,
  rokkosanTouristPass,
} from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { articleJsonLd } from "../../../lib/structured-data";

// CTA links. The headline CTA is the guided day out of Osaka (6.5% tours band);
// the Rokkosan Tourist Pass is the 5% passes band and the independent-traveller
// alternative; the Kin no Yu / Gin no Yu bus package is the only Klook product
// that actually bundles the two municipal bathhouses. See lib/klook-links.ts.
const TOUR_URL = arimaHimejiRokkoDayTour.url;
const BATH_BUS_URL = arimaKinGinBusPackage.url;
const PASS_URL = rokkosanTouristPass.url;
const TAIKO_URL = arimaTaikoNoYuSpa.url;

// Every figure on this page was read on 25 October 2026:
//  - Kin no Yu and Gin no Yu admissions, hours, closed days and the 2-Spa Ticket
//    from arimaspa-kingin.jp (the bathhouses' own site, run by the Kobe Tourism
//    Bureau's Arima office) and visit.arima-onsen.com, the Arima Onsen Tourist
//    Association's own English directory;
//  - Taiko no Yu's admissions, hours and tattoo rule from taikounoyu.com;
//  - the coach fares and the departure/arrival times from
//    nishinihonjrbus.co.jp's own Arima Express page;
//  - the ¥280 Sannomiya–Tanigami subway fare from Kobe City's own page on the
//    municipalised Hokushin line, and the Arimaguchi change from shintetsu.co.jp;
//  - the door-to-door times from Osaka, Kyoto, Itami and Kansai Airport from the
//    Arima Onsen Tourist Association's own transportation page.
const CHECKED = checkedLabel("2026-10-25");

const KIN_ADULT = "¥800";
const GIN_ADULT = "¥700";
const TWO_SPA = "¥1,200";

const accessRows = [
  {
    route: "Osaka Station → Arima Onsen, coach",
    operator: "West JR Bus, Arima Express",
    fare: "¥1,400 (¥1,000 on the advance fare)",
    time: "About 65 min — 08:50 departure arrives 09:55",
    note: "From the JR Highway Bus Terminal at Osaka Station. One vehicle, no changes: the simplest way to do this as a day trip.",
  },
  {
    route: "Shin-Osaka → Arima Onsen, coach",
    operator: "West JR Bus, Arima Express",
    fare: "¥1,250 (¥1,000 on the advance fare)",
    time: "Under an hour",
    note: "The stop to use if you are arriving on the shinkansen and not going into central Osaka first.",
  },
  {
    route: "Sannomiya or Shin-Kobe → Arima Onsen, coach",
    operator: "West JR Bus, Arima Express",
    fare: "¥780 (¥700 on the advance fare)",
    time: "About 30 min — 08:50 departure arrives 09:20",
    note: "The cheapest and fastest run of all. Arima is administratively part of Kobe, and this is the ride that proves it.",
  },
  {
    route: "Sannomiya → Arima Onsen, train",
    operator: "Kobe Municipal Subway + Kobe Electric Railway",
    fare: "¥280 for the subway leg, plus the Shintetsu fare",
    time: "Two changes",
    note: "Subway to Tanigami, then a Shintetsu train towards Sanda, changing at Arimaguchi. Scenic, but it buys you nothing over the coach.",
  },
  {
    route: "Itami Airport (ITM) → Arima Onsen",
    operator: "Arima Onsen Tourist Association's own figure",
    fare: "Not published as one fare",
    time: "About 30 min",
    note: "The closest airport to the town by a wide margin — worth knowing if you are choosing between Kansai's two airports.",
  },
  {
    route: "Kansai Airport (KIX) → Arima Onsen",
    operator: "Arima Onsen Tourist Association's own figure",
    fare: "Not published as one fare",
    time: "About 90 min",
    note: "Doable on an arrival day, but it is 90 minutes with luggage and the baths close in the evening.",
  },
];

const bathRows = [
  {
    bath: "Kin no Yu (the gold bath)",
    adult: KIN_ADULT,
    child: "¥350",
    hours: "08:00–22:00, last entry 21:30",
    closed: "Every 2nd and 4th Tuesday — open if that is a national holiday, closed the next day — and 1 January",
  },
  {
    bath: "Gin no Yu (the silver bath)",
    adult: GIN_ADULT,
    child: "¥300",
    hours: "09:00–21:00, last entry 20:30",
    closed: "The 1st and 3rd Tuesday of every month, and 1 January",
  },
  {
    bath: "2-Spa Ticket (both)",
    adult: TWO_SPA,
    child: "—",
    hours: "As above for each bathhouse",
    closed: "Each bathhouse keeps its own closed Tuesdays — which is the catch",
  },
  {
    bath: "Taiko no Yu (the big day spa)",
    adult: "¥2,750 weekdays, ¥2,970 weekends and holidays",
    child: "¥1,430 / ¥1,239 elementary; ¥550 / ¥440 ages 3–5",
    hours: "10:00–22:00, last entry 21:00",
    closed: "Occasional maintenance days, published on its own site",
  },
];

const planRows = [
  {
    plan: "Half day from Kobe",
    shape: "Coach out at 09:50 from Sannomiya, back mid-afternoon",
    what: "Kin no Yu, the Yumoto-zaka slope of shops above it, and the free Taiko no Ashiyu foot bath — roughly three hours in the town.",
    verdict: "Enough. Arima is a small town: the two bathhouses are a few minutes apart and the old streets take under an hour to walk.",
  },
  {
    plan: "Full day from Osaka",
    shape: "08:50 coach from Osaka Station, arrive 09:55; last coaches back in the evening",
    what: `Kin no Yu first (it opens at 08:00, earliest of the three), lunch in the town, then Gin no Yu on the ${TWO_SPA} 2-Spa Ticket, and the Rokko-Arima ropeway up to the Rokko summit for the view over Osaka Bay before coming back down.`,
    verdict: "The version worth the travel time, and the only one that uses the mountain as well as the town.",
  },
  {
    plan: "Full day with Himeji or the outlets",
    shape: "A guided coach day out of Osaka",
    what: "Himeji Castle and the Mt. Rokko observation deck, or the Sanda outlets and the Rokko night view, with Arima in the middle.",
    verdict: "Pick this if Arima is the stop rather than the destination — none of those combinations is realistic on public transport in a day.",
  },
  {
    plan: "Overnight instead",
    shape: "One night in a ryokan",
    what: "The private baths and the kaiseki dinner that the day-trip version cannot reach, plus the town after the coaches have gone.",
    verdict: "The honest alternative. Arima's day-use baths close between 21:00 and 22:00, so an evening here is only really available to people staying.",
  },
];

const compareRows = [
  {
    option: "Coach + 2-Spa Ticket, arranged yourself",
    cost: `From Sannomiya: ¥780 each way plus ${TWO_SPA}. From Osaka Station: ¥1,400 each way, or ¥1,000 on the advance fare`,
    gets: "Both municipal bathhouses and complete control of the timings. Nothing is reserved, so nothing can be sold out.",
    pick: "The default, and comfortably the cheapest. Check the closed Tuesdays before you set the date.",
  },
  {
    option: "Kin no Yu & Gin no Yu + round-trip coach, one booking",
    cost: "Check the listing for your date",
    gets: "The same two bathhouses and the non-stop return coach from Kobe in a single checkout, valid for three days including the boarding date.",
    pick: "If you would rather hold one voucher than buy a coach ticket and two bath tickets in cash — and if you might shift the day by 24 hours.",
  },
  {
    option: "Guided coach day from Osaka",
    cost: "Check the listing for your date",
    gets: "Himeji Castle or the Sanda outlets plus the Mt. Rokko deck with Arima in the middle, and a guide.",
    pick: "If Arima is one stop on a bigger day. These combinations are not realistic on buses and trains inside one day.",
  },
  {
    option: "Rokkosan Tourist Pass",
    cost: "Check the listing for your date",
    gets: "The transport to and around Mt. Rokko — the listing names the cable car and the Rokko Sanjo buses, plus discounts at the mountain attractions.",
    pick: "If the mountain is the point and the onsen is the reward at the bottom of it.",
  },
  {
    option: "Taiko no Yu, the big day spa",
    cost: "¥2,750 on a weekday, ¥2,970 at the weekend, adult",
    gets: "One large complex with both springs, outdoor baths and stone saunas, and a ticket that lasts all day rather than one bath.",
    pick: "A rainy day, or a day where the bathing is the whole plan. Note its published rule: it refuses admission to anyone with a tattoo.",
  },
];

const faqItems = [
  {
    q: "How do you do an Arima Onsen day trip from Osaka?",
    a: `Take the West JR Bus Arima Express from the JR Highway Bus Terminal at Osaka Station. It is ¥1,400 one way, or ¥1,000 on the operator's advance fare, and the 08:50 departure reaches Arima Onsen at 09:55 — about 65 minutes with no changes. From Shin-Osaka the same service is ¥1,250. The Arima Onsen Tourist Association gives about 60 minutes from Osaka door to door, which matches. Fares and times checked ${CHECKED}.`,
  },
  {
    q: "How long does it take to get to Arima Onsen from Kobe?",
    a: "About 30 minutes, and it is the cheapest approach: the Arima Express from Sannomiya Bus Terminal or Shin-Kobe is ¥780 one way, ¥700 on the advance fare, and the 08:50 departure arrives at 09:20. The train alternative — Kobe Municipal Subway to Tanigami (¥280), then a Kobe Electric Railway train towards Sanda with a change at Arimaguchi — is more interesting and no faster. If you are staying in Kobe rather than Osaka, this is barely a day trip at all.",
  },
  {
    q: "How much are Kin no Yu and Gin no Yu?",
    a: `Kin no Yu, the iron-rich gold bath, is ${KIN_ADULT} for an adult and ¥350 for a child; Gin no Yu, the clear silver bath, is ${GIN_ADULT} and ¥300. The 2-Spa Ticket covering both is ${TWO_SPA}, which is ¥300 less than buying them separately. The operator also publishes a ¥650 Kin no Yu adult rate and a ¥550 Gin no Yu one; its Japanese page presents these as group rates and its English page labels the Kin no Yu figure a weekday price, so confirm which applies at the counter. All read off arimaspa-kingin.jp on ${CHECKED}.`,
  },
  {
    q: "What are Kin no Yu and Gin no Yu's opening hours and closed days?",
    a: `Kin no Yu opens 08:00 to 22:00 with last entry at 21:30, and closes every 2nd and 4th Tuesday — open if that Tuesday is a national holiday, closed the following day instead — plus 1 January. Gin no Yu opens 09:00 to 21:00 with last entry at 20:30, and closes the 1st and 3rd Tuesday of every month, plus 1 January. The two sets of closed Tuesdays do not overlap, which is the useful part: on any given Tuesday one of them is open. It also means the ${TWO_SPA} 2-Spa Ticket is the wrong buy on a Tuesday. Checked ${CHECKED}.`,
  },
  {
    q: "Can you visit Arima Onsen with tattoos?",
    a: `Taiko no Yu, the large day spa, states plainly on its own site that it refuses admission to anyone with a tattoo. For the two municipal bathhouses, Kin no Yu and Gin no Yu, we could not find a published tattoo rule on the official pages as of ${CHECKED} — so treat the answer there as unconfirmed rather than assuming either way, and ask at the counter. The reliable route for a tattooed visitor anywhere in Japan is a private bath: most Arima ryokan have a reservable kashikiri bath, and that sidesteps the question entirely.`,
  },
  {
    q: "Is half a day enough for Arima Onsen, or do you need a full day?",
    a: "Half a day is genuinely enough for the town. Arima is small — Kin no Yu, Gin no Yu, the Yumoto-zaka shopping slope and the Taiko no Ashiyu foot bath are all within a few minutes of each other, and you can walk the old streets in under an hour. A full day is worth it if you add the mountain above the town: the Rokko-Arima ropeway runs up to the Rokko summit and the view over Osaka Bay, which is a different day out and the reason the guided itineraries pair the two.",
  },
  {
    q: "What is the difference between the gold spring and the silver spring?",
    a: "They are two different waters, not two temperatures of the same one. Kinsen, the gold spring, is heavily iron-bearing and salty — it oxidises reddish-brown on contact with air, which is where the colour and the name come from. Ginsen, the silver spring, is clear. Kin no Yu is built on the gold spring and Gin no Yu on the silver, which is why the ¥1,200 2-Spa Ticket exists at all: the two bathhouses are not substitutes for each other.",
  },
  {
    q: "Do you need to book anything in advance for Arima Onsen?",
    a: "For the bathhouses, no — Kin no Yu and Gin no Yu are walk-in and sell tickets at the counter. What is worth booking ahead is the coach, where the advance fare is cheaper (¥1,000 instead of ¥1,400 from Osaka, ¥700 instead of ¥780 from Sannomiya), and anything guided, because a coach day with Himeji or the Rokko night view in it runs on fixed departures with limited seats. If you want the town on a Tuesday, the thing to check is not availability but which bathhouse is shut.",
  },
  {
    q: "Is Arima Onsen worth it as a day trip?",
    a: "If you want a 1,300-year-old onsen town reachable from Osaka in about an hour and Kobe in half that, with two public baths you can walk into for under ¥1,000 each, yes. If you are expecting a secluded mountain hot spring, manage that expectation: Arima is a compact, busy resort town inside the city limits of Kobe, and its day-use baths close in the evening. The version of Arima that people write about — private baths, a kaiseki dinner, the streets after the coaches leave — needs a night, not a day.",
  },
  {
    q: "Can you combine Arima Onsen with Himeji Castle or Mt. Rokko in one day?",
    a: "With Mt. Rokko, easily — the mountain sits directly above the town and the ropeway connects them, which is why the independent full-day plan uses both. With Himeji as well, only on a guided coach day: Himeji is an hour west of Kobe on a different line, and doing all three on public transport means spending the day on platforms. That is the one case where a booked itinerary genuinely buys you something a timetable cannot.",
  },
];

const TITLE = "Arima Onsen Day Trip (2026): From Osaka or Kobe, and Costs";
const DESCRIPTION =
  "An Arima Onsen day trip is 65 minutes and ¥1,400 by coach from Osaka, or 30 minutes from Sannomiya. Kin no Yu is ¥800 and Gin no Yu ¥700.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/arima-onsen-day-trip") },
});

export default function ArimaOnsenDayTripPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/arima-onsen-day-trip" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/arima-onsen-day-trip" />
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
              route: "/guides/attractions/arima-onsen-day-trip",
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
                  name: "Arima Onsen Day Trip",
                  item: "https://www.japan-travel-kit.com/guides/attractions/arima-onsen-day-trip",
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
          <span className={styles.breadCurrent}>Arima Onsen Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Arima Onsen Day Trip (2026):<br />From Osaka or Kobe, and What the Baths Cost
          </h1>
          <p className={styles.heroSubtitle}>
            A 1,300-year-old hot spring town inside the Kobe city limits, an hour from Osaka by coach. Two
            public baths you can walk into — on the right day of the week.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official bus fares & bath prices", "The closed Tuesdays"].map((t) => (
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
                <p className={styles.verdictStatLabel}>From Osaka Station</p>
                <p className={styles.verdictStatValue}>¥1,400, ~65 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Sannomiya</p>
                <p className={styles.verdictStatValue}>¥780, ~30 min</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Kin no Yu / Gin no Yu</p>
                <p className={styles.verdictStatValue}>{KIN_ADULT} / {GIN_ADULT}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Both on one ticket</p>
                <p className={styles.verdictStatValue}>{TWO_SPA}</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              An <strong>Arima Onsen day trip</strong> takes about <strong>65 minutes and ¥1,400</strong> on
              the West JR Bus Arima Express from <strong>Osaka Station</strong> (the 08:50 arrives 09:55), or
              about <strong>30 minutes and ¥780</strong> from <strong>Sannomiya</strong> in Kobe — one coach,
              no changes, either way. In the town, the two municipal bathhouses are walk-in:{" "}
              <strong>Kin no Yu</strong>, the iron-rich gold bath, is {KIN_ADULT} and opens{" "}
              <strong>08:00–22:00</strong>; <strong>Gin no Yu</strong>, the clear silver bath, is {GIN_ADULT}{" "}
              and opens <strong>09:00–21:00</strong>; a <strong>{TWO_SPA} 2-Spa Ticket</strong> covers both.
              The one trap is the day of the week — Kin no Yu shuts on the <strong>2nd and 4th
              Tuesday</strong> and Gin no Yu on the <strong>1st and 3rd</strong>. Half a day is enough for the
              town; a full day is worth it only if you add Mt. Rokko above it. Fares and admissions read off
              the operators&apos; own sites on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Guided Day From Osaka →
              </KlookLink>
              <KlookLink href={BATH_BUS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Both Baths + Coach →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Is Arima Onsen, and Why Is It a Day Trip?</h2>
          <p className={styles.bodyText}>
            Arima is one of Japan&apos;s oldest hot spring towns and, geographically, a slightly absurd one:
            it sits in the hills on the far side of Mt. Rokko but inside the city limits of{" "}
            <strong>Kobe</strong>, which is why you can be in a 1,300-year-old onsen town half an hour after
            leaving a Kobe bus terminal. From Osaka it is about an hour. That combination — genuinely old
            town, genuinely short journey — is the whole case for going.
          </p>
          <p className={styles.bodyText}>
            What makes it a planning problem rather than a simple outing is the opening calendar. The two
            public baths are municipal facilities with fixed Tuesday closures that do not fall on the same
            Tuesdays, the day-use spas close in the evening, and most of what people picture when they
            picture Arima — private baths, a kaiseki dinner, the streets after the last coach — belongs to
            people who are staying the night. Get the day of the week right and the rest is easy.
          </p>
        </section>

        {/* Access table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Arima Onsen From Osaka or Kobe?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The coach wins from everywhere. It is direct, it is cheap, and the rail alternative needs two
            changes to arrive at the same time.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Operator", "One-way fare", "Journey time", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.operator}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Coach fares and the sample departures read off West JR Bus&apos;s own Arima Express page on{" "}
            {CHECKED}; the ¥280 subway leg from Kobe City&apos;s page on the municipalised Hokushin line, and
            the Arimaguchi change from Kobe Electric Railway. The door-to-door times for Osaka, Itami and
            Kansai Airport are the Arima Onsen Tourist Association&apos;s own figures. For the city end of
            either journey, see{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Osaka
            </Link>
            {" "}and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kansai Area Pass
            </Link>
            , which covers JR West trains around Kobe but not this coach and not the Kobe subway.
          </p>
        </section>

        {/* Baths table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The baths</span>
          <h2 className={styles.sectionTitle}>How Much Are Kin no Yu and Gin no Yu, and When Are They Shut?</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Bathhouse", "Adult", "Child", "Hours", "Closed"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bathRows.map((row) => (
                    <tr key={row.bath}>
                      <td className={styles.tdProvider}>{row.bath}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.closed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Read the closed column before the price column. <strong>Kin no Yu shuts on the 2nd and 4th
            Tuesday</strong> of the month and <strong>Gin no Yu on the 1st and 3rd</strong> — so on any given
            Tuesday one of the two is open, and the {TWO_SPA} 2-Spa Ticket is the one thing you should not buy
            that day. Both also close on 1 January. Kin no Yu opens earliest, at 08:00, which is what makes an
            early coach out of Osaka worth taking.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Admissions, hours and closed days read off arimaspa-kingin.jp and the Arima Onsen Tourist
            Association&apos;s own English directory on {CHECKED}; Taiko no Yu&apos;s from taikounoyu.com the
            same day. One ambiguity worth flagging rather than hiding: the operator also publishes a ¥650
            adult rate for Kin no Yu and ¥550 for Gin no Yu, presented as group rates on its Japanese pages
            and the Kin no Yu figure as a weekday price on its English one. Ask at the counter which applies.
          </p>
        </section>

        {/* Tattoos */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tattoos</span>
          <h2 className={styles.sectionTitle}>Can You Bathe in Arima Onsen With a Tattoo?</h2>
          <p className={styles.bodyText}>
            One of the three has a published answer. <strong>Taiko no Yu</strong>, the large day spa, states
            on its own site that it refuses admission to anyone with a tattoo. For{" "}
            <strong>Kin no Yu</strong> and <strong>Gin no Yu</strong> we could not find a published tattoo
            rule on the official pages as of {CHECKED} — so rather than tell you either way, we will say that
            it is unconfirmed, and that the counter is the place to ask.
          </p>
          <p className={styles.bodyText}>
            The route that does not depend on anyone&apos;s rulebook is a <em>kashikiri</em> — a private bath
            booked for your party alone. Most Arima ryokan have one, and it is also the only way to get the
            town&apos;s water after the public baths close at 21:00 and 22:00. If a tattoo is the deciding
            factor, an overnight stay is the answer rather than a day trip.
          </p>
        </section>

        {/* Model plans */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>How long to give it</span>
          <h2 className={styles.sectionTitle}>Is Half a Day Enough, or Do You Need a Full Day?</h2>
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
            The town itself is small enough that three hours covers it: Kin no Yu, the{" "}
            <strong>Yumoto-zaka</strong> slope of shops above it, the free <strong>Taiko no Ashiyu</strong>{" "}
            foot bath, and the old lanes. What turns it into a full day is the mountain — the Rokko-Arima
            ropeway runs from the town up to the Rokko summit, and the view from the top over Osaka Bay is
            what the guided itineraries are really selling. If you have one day in Kansai and have not seen
            Kyoto yet, see{" "}
            <Link href="/guides/attractions/kyoto-nara-day-tour-from-osaka" style={{ color: "var(--red)", fontWeight: 600 }}>
              Kyoto and Nara day tours from Osaka
            </Link>
            {" "}instead and keep Arima for a second visit.
          </p>
        </section>

        {/* Tour vs DIY */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>Should You Book a Tour or Arrange It Yourself?</h2>
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
            Three things to settle on a listing rather than here, because none of them is a published fare:
            whether a guided departure is actually running on your date — most of the Rokko combinations have
            a minimum party size and a seasonal calendar — what the cancellation window is, and whether the
            bath-and-coach voucher is dated or valid across a few days. That last one matters more than it
            sounds: it is what lets you move an Arima day by 24 hours when a Tuesday closure or the weather
            gets in the way.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Check a Guided Day →
            </KlookLink>
            <KlookLink href={BATH_BUS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Both Baths + Coach →
            </KlookLink>
            <KlookLink href={PASS_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Rokkosan Tourist Pass →
            </KlookLink>
          </div>
        </section>

        {/* Taiko no Yu */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The third option</span>
          <h2 className={styles.sectionTitle}>What About Taiko no Yu, the Big Day Spa?</h2>
          <p className={styles.bodyText}>
            Taiko no Yu is the alternative to the two small municipal bathhouses: one large complex with both
            the gold and silver springs, outdoor baths and stone saunas, open{" "}
            <strong>10:00 to 22:00</strong> with last entry at 21:00. Admission is{" "}
            <strong>¥2,750 on a weekday</strong> and <strong>¥2,970 at the weekend</strong> for an adult,
            ¥1,239 and ¥1,430 for an elementary-school child, and ¥440 and ¥550 for ages 3 to 5; there is also
            a cheaper night-time rate after 19:30. A ticket covers the whole day rather than one bath, which
            makes it the rainy-day answer and the answer for a group that wants to spread out. Its two
            published restrictions are worth reading before you buy: <strong>no re-entry</strong> once you
            leave, and <strong>no admission for anyone with a tattoo</strong>. Prices and rules read off
            taikounoyu.com on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TAIKO_URL} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
              Taiko no Yu Day Spa Ticket →
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
          heading="Guided Arima Days Out of Osaka"
          intro="All four are coach days with Arima in them, and they differ in what else they reach: Himeji and the Rokko deck, the Sanda outlets and the Rokko night view, the ropeway and the town, or a forest walk over the mountain that finishes in the hot springs. Open a listing for availability and the current price on your dates."
          tours={[arimaHimejiRokkoDayTour, arimaRokkoOutletBusTour, arimaRokkoNightViewDayTour, rokkoHikingArimaBathingTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
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
            <Link href="/guides/attractions/sagano-romantic-train-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sagano Romantic Train Tickets (2026): Prices, Seats &amp; When It Runs</p>
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
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
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
            <h2 className={styles.ctaBannerTitle}>An hour from Osaka, 1,300 years older</h2>
            <p className={styles.ctaBannerDesc}>
              Two public baths for under ¥1,000 each, or one booking that bundles both with the coach. Check
              the Tuesday closures against your date first — that is the only thing about Arima that goes
              wrong.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Guided Arima Days →
              </KlookLink>
              <KlookLink href={BATH_BUS_URL} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Baths + Coach →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
