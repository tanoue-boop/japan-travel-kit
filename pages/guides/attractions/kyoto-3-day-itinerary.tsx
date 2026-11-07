import Head from "next/head";
import Link from "next/link";
import KlookLink from "../../../components/KlookLink";
import KlookStayAreas from "../../../components/KlookStayAreas";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  amanohashidateIneFullDayTour,
  jrHarukaUrl,
  kyotoCityFushimiArashiyamaTour,
  kyotoFushimiInariWalkingTour,
  kyotoGionNightWalkingTour,
  kyotoKimonoAiwafukuKiyomizu,
  kyotoThreeDayStayAreas,
  kyotoThreeDayTripPrep,
  kyotoUjiNaraDayTour,
  saganoHozugawaGuaranteedTour,
  shinkansenTokyoKyoto,
  ujiMatchaGreenTeaHalfDayTour,
  ujiTaihoanWalkingTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";

/**
 * Three full days based in Kyoto. Added 6 Nov 2026.
 *
 * It sits between kyoto-2-day-itinerary (the city only) and
 * osaka-kyoto-3-day-itinerary (two cities). The new decision here is the third
 * day, Nara or Uji, and where to spend three nights.
 *
 * Read on 6 November 2026:
 *   visitnara.jp        Kyoto to Nara 41 min by JR, 34 min by Kintetsu Limited Express
 *   city.uji.kyoto.jp   Kyoto to JR Uji about 16 min by JR Nara Line rapid
 *   kyoto-uji-kankou    JR Uji to Uji Bridge 10 min, bridge to Byodo-in 5 min
 *   byodoin.or.jp       ¥700 / ¥400 / ¥300, Phoenix Hall interior ¥300 extra,
 *                       garden 8:45–17:30, interior 9:30–16:10, 35 people a visit
 *   westjr.co.jp        HARUKA ¥2,700 / ¥1,350 to Kyoto, online booking one month out
 *
 * Carried with their dates from kyoto-2-day-itinerary, which sources each one:
 * Kyoto City's journey times and routing advice, Kiyomizu-dera, Kinkaku-ji, the bus
 * fare, the day passes and the torokko fare. Todai-ji comes from attraction-prices.
 * The "time to allow" column is our planning allowance. No Klook price appears.
 */

const OWN = checkedLabel("2026-11-06");
const CARRIED = checkedLabel("2026-10-29");
const FARES_CHECKED = checkedLabel("2026-10-26");
const SAGANO_CHECKED = checkedLabel("2026-11-07");
const TODAIJI = PRICES.todaiji;
const TODAIJI_CHECKED = checkedLabel(TODAIJI.checked);

type Stop = { time: string; place: string; allow: string; getting: string; booking: string };

const day1: Stop[] = [
  {
    time: "Morning",
    place: "Kiyomizu-dera, then the Sannenzaka and Ninenzaka lanes",
    allow: "2 hours",
    getting: "City Bus 100 or 206 to Gojozaka, then about 10 minutes on foot",
    booking: "No. The temple opens at 6:00",
  },
  {
    time: "Midday",
    place: "Lunch in the Gion end of Shijo; kimono dressing here if you want it",
    allow: "1–1.5 hours",
    getting: "On foot downhill from the lanes",
    booking: "Kimono: yes, it is a dressing slot",
  },
  {
    time: "Afternoon",
    place: "Yasaka Shrine, Maruyama Park and Higashiyama's side streets",
    allow: "2–3 hours",
    getting: "On foot",
    booking: "No",
  },
  {
    time: "Evening",
    place: "Hanamikoji and Gion's Shirakawa lanes, then dinner in Pontocho",
    allow: "2–3 hours",
    getting: "On foot",
    booking: "Only for a guided night walk",
  },
];

const day2: Stop[] = [
  {
    time: "First light, before 7:00",
    place: "Fushimi Inari Taisha and the Senbon Torii",
    allow: "1 hour for the lower gates, 2–3 hours to the summit",
    getting: "JR Nara Line to JR Inari, about 9 minutes from Kyoto Station",
    booking: "No, and no admission",
  },
  {
    time: "Late morning",
    place: "Arashiyama bamboo grove, Tenryu-ji and Togetsukyo",
    allow: "2 hours",
    getting: "Back through Kyoto Station, then JR Sagano Line Rapid, about 11 minutes",
    booking: "No",
  },
  {
    time: "Afternoon",
    place: "Sagano Romantic Train, or Kinkaku-ji before its 17:00 close",
    allow: "25 minutes on the train; 1 hour at Kinkaku-ji",
    getting: "Torokko Saga is beside JR Saga-Arashiyama. For Kinkaku-ji, Kyoto City's route is the Karasuma subway to Kitaoji, then City Bus 204 or 205",
    booking: "Train: yes, reserved seat. Kinkaku-ji: no",
  },
  {
    time: "Evening",
    place: "A quiet night back at your base",
    allow: "Your choice",
    getting: "JR to Kyoto Station, or the subway",
    booking: "No",
  },
];

const day3: Stop[] = [
  {
    time: "Morning (Nara)",
    place: "Nara Park and the Great Buddha Hall at Todai-ji",
    allow: "3 hours",
    getting: "JR from Kyoto Station, about 41 minutes; Kintetsu Limited Express, about 34",
    booking: "No",
  },
  {
    time: "Afternoon (Nara)",
    place: "Kasuga Taisha and the old town",
    allow: "2–3 hours",
    getting: "On foot from Todai-ji",
    booking: "No",
  },
  {
    time: "Morning (Uji)",
    place: "Byodo-in and, if you want it, the Phoenix Hall interior",
    allow: "1.5–2 hours",
    getting: "JR Nara Line rapid, about 16 minutes, then about 15 minutes on foot",
    booking: "Interior tickets are limited to 35 people a visit",
  },
  {
    time: "Afternoon (Uji)",
    place: "Matcha and tea around the Uji Bridge, or back to Kyoto",
    allow: "2 hours",
    getting: "On foot",
    booking: "Only for a guided tea tour",
  },
  {
    time: "Evening (either)",
    place: "Back in Kyoto for your last dinner",
    allow: "Your choice",
    getting: "The same line back to Kyoto Station",
    booking: "No",
  },
];

const dayTables = [
  {
    key: "day1",
    label: "Day 1",
    heading: "Day 1: Kiyomizu-dera, Higashiyama and Gion",
    intro: "One walkable district, so this is the easiest day and the one to wear a kimono. Everything from the temple gate to Gion is downhill or on foot.",
    rows: day1,
  },
  {
    key: "day2",
    label: "Day 2",
    heading: "Day 2: Fushimi Inari at Dawn, Then Arashiyama",
    intro: "The early start. Both sights are at their best before the coaches arrive, and both are on JR lines from Kyoto Station, which is why this day suits a station base.",
    rows: day2,
  },
  {
    key: "day3",
    label: "Day 3",
    heading: "Day 3: Nara or Uji",
    intro: "One day trip. Use the Nara rows or the Uji rows, not both. The comparison below helps you choose.",
    rows: day3,
  },
];

const dayThreeRows = [
  { q: "Train from Kyoto Station", nara: "About 41 min by JR, about 34 by Kintetsu Limited Express", uji: "About 16 min by JR Nara Line rapid" },
  { q: "On foot from the station", nara: "A short walk into Nara Park", uji: "About 10 min to Uji Bridge, 5 more to Byodo-in" },
  { q: "Main paid sight", nara: `Todai-ji Great Buddha Hall, ${TODAIJI.adult} adult`, uji: "Byodo-in ¥700 adult, Phoenix Hall interior ¥300 extra" },
  { q: "Hours", nara: "8:00–17:00 November to March, 7:30–17:30 April to October", uji: "Garden 8:45–17:30, interior 9:30–16:10" },
  { q: "Time needed", nara: "A full day", uji: "A half day" },
  { q: "Choose it for", nara: "The free-roaming deer and the Great Buddha", uji: "Matcha and a shorter, quieter day" },
];

const priceRows = [
  { stop: "Kiyomizu-dera (Day 1)", price: "¥500 adult, ¥200 elementary and junior high", hours: "6:00–18:00 (18:30 in July and August)", source: `kiyomizudera.or.jp, ${CARRIED}` },
  { stop: "Fushimi Inari Taisha (Day 2)", price: "Free", hours: "Gate paths are open outside office hours", source: `Kyoto City, ${CARRIED}` },
  { stop: "Bamboo grove and Togetsukyo (Day 2)", price: "Free", hours: "Open paths; Tenryu-ji charges separately", source: `Kyoto City, ${CARRIED}` },
  { stop: "Sagano Romantic Train (Day 2)", price: "¥880 adult, ¥440 child one way to 29 Dec 2026; ¥1,500 and ¥750 with a seat from 1 Mar 2027", hours: "7.3 km, 25 minutes; closed 30 Dec 2026 – 28 Feb 2027", source: `Operator's fare, ${SAGANO_CHECKED}` },
  { stop: "Kinkaku-ji (Day 2)", price: "Confirm at the gate", hours: "9:00–17:00", source: `shokoku-ji.jp, ${CARRIED}; the temple's revised fare is published as an image we could not read` },
  { stop: "Todai-ji Great Buddha Hall (Day 3, Nara)", price: `${TODAIJI.adult} adult, ${TODAIJI.child} ${TODAIJI.childAges}`, hours: "8:00–17:00 November to March, 7:30–17:30 April to October", source: `todaiji.or.jp, ${TODAIJI_CHECKED}` },
  { stop: "Byodo-in (Day 3, Uji)", price: "¥700 adult, ¥400 junior and senior high, ¥300 elementary; Phoenix Hall interior ¥300 extra", hours: "Garden 8:45–17:30; interior 9:30–16:10, every 20 minutes", source: `byodoin.or.jp, ${OWN}` },
  { stop: "Subway & Bus 1-Day Pass", price: "¥1,100 adult, ¥550 child", hours: "One calendar day", source: `Kyoto City Transportation Bureau, ${FARES_CHECKED}` },
];

const accessRows = [
  { route: "Tokyo → Kyoto, Tokaido Shinkansen", time: "About 130 min by Nozomi, 170 by Hikari", fare: "By date and seat class", source: `kyoto.travel, ${CARRIED}` },
  { route: "Kansai Airport → Kyoto, limited express HARUKA", time: "About 75–80 min, direct", fare: "¥2,700 adult, ¥1,350 child on JR West's one-way ticket", source: `westjr.co.jp, ${OWN}` },
];

const checklist = [
  {
    title: "As soon as your dates are fixed: the hotel",
    desc: "Three nights in one place makes this the largest booking of the trip. Cherry blossom and autumn leaf weeks are when to do it first. Rates and availability are per hotel and per date, so we do not quote a window.",
  },
  {
    title: "One month out: the HARUKA",
    desc: "JR West opens online reservations at 10:00 JST one month before boarding. The discounted ticket cannot be bought inside Japan, so settle it before you fly.",
  },
  {
    title: "A few weeks out: the shinkansen and the Sagano train",
    desc: "Lock in the arrival seat once the hotel is booked, and the Sagano Romantic Train if it is on Day 2. The train is closed from 30 December 2026 to 28 February 2027, a new train with a seat fee starts on 1 March 2027, and seats are reserved, so check your date first.",
  },
  {
    title: "A week or two out: the kimono slot and tours",
    desc: "Kimono dressing is an appointment, with a same-day return by 17:30 on the Yumeyakata listing. Gion night walks and the Day 3 guided tours are bookable by date, so hold them once the plan is settled.",
  },
  {
    title: "Nothing to book: the temples",
    desc: "Kiyomizu-dera, Fushimi Inari, the bamboo grove, Kinkaku-ji, Todai-ji and Byodo-in's garden are all walk-up.",
  },
];

const faqItems = [
  {
    q: "Is 3 days in Kyoto enough?",
    a: `Yes. Three days covers the eastern and southern sights, Arashiyama in the west, and one day trip. Two days forces you to skip the day trip, and a fourth day is mainly useful for a longer trip such as Amanohashidate and Ine. Staying three nights also means you only unpack once. Kyoto City's journey times from Kyoto Station are 10 minutes to Fushimi Inari, 25 to Arashiyama and 35 to Higashiyama, read ${CARRIED}.`,
  },
  {
    q: "What should I do on a 3 day Kyoto itinerary?",
    a: `Day 1: Kiyomizu-dera, Higashiyama and Gion, all on foot once you are there. Day 2: Fushimi Inari before 7:00, then Arashiyama, then the Sagano Romantic Train or Kinkaku-ji. Day 3: a day trip to Nara, or a shorter one to Uji. Only a few things need booking: your hotel and long-distance train, a kimono slot, and the Sagano train if you take it.`,
  },
  {
    q: "Should I do Nara or Uji as a day trip from Kyoto?",
    a: `Choose Nara for the deer and the Great Buddha, and Uji for matcha and a shorter day. Nara is about 41 minutes from Kyoto Station by JR and takes a full day; Todai-ji's hall is ${TODAIJI.adult}. Uji is about 16 minutes by JR Nara Line rapid and suits a half day; Byodo-in is ¥700, with the Phoenix Hall interior ¥300 extra. On a first trip we would choose Nara. Read ${OWN}, Todai-ji ${TODAIJI_CHECKED}.`,
  },
  {
    q: "Where should I stay for 3 days in Kyoto?",
    a: `Kyoto Station for all three nights is the default. The shinkansen and HARUKA arrive there, and Fushimi Inari, Arashiyama, Nara and Uji are all direct or one-change JR rides. Choose Shijo-Kawaramachi for all three nights if evenings in Pontocho matter more to you. Choose Gion for two nights and Kyoto Station for one if you want Kiyomizu-dera on foot at 6:00, but that means moving your bags once.`,
  },
  {
    q: "Do I need a bus pass for 3 days in Kyoto?",
    a: `Probably not. The Subway & Bus 1-Day Pass is ¥1,100 and a flat bus ride is ¥230, so it takes about five rides in a day to break even. On this plan Day 1 is mostly on foot, and Days 2 and 3 use JR, which neither Kyoto pass covers. Read ${FARES_CHECKED}. Our getting around Kyoto guide compares the options.`,
  },
  {
    q: "What does this itinerary cost in admissions?",
    a: `About ¥1,300 for one adult on the Nara version: Kiyomizu-dera ¥500 and Todai-ji ${TODAIJI.adult}. The Uji version is about ¥1,200, or ¥1,500 with the Phoenix Hall interior. Fushimi Inari, the bamboo grove and Togetsukyo are free. Kinkaku-ji and the Sagano train (¥880 to 29 December 2026, ¥1,500 with a seat from 1 March 2027) are extra if you choose them, and we do not quote Kinkaku-ji because its revised fare is published as an image we could not read.`,
  },
  {
    q: "Does this plan work in rain or with children?",
    a: `Yes, with one change each. In rain, skip the upper Fushimi Inari paths, which are steep and stepped, and swap the Sagano train's open car for Kinkaku-ji or a covered market. With children, stay on the lower Fushimi Inari gates and choose the Uji half day over a full day in Nara, though the Nara deer are a strong reason to go the other way. Byodo-in is ¥300 at elementary age and Todai-ji ${TODAIJI.child} for ${TODAIJI.childAges}.`,
  },
  {
    q: "Which day should the kimono day be?",
    a: `Day 1. It is the walking day, the shops are close by, and the loop through Higashiyama and Gion returns you near the shop before a 17:30 same-day return, which is the deadline on the Yumeyakata listing. Day 2 starts too early and covers too much ground, and Day 3 leaves the city.`,
  },
];

const TITLE = "Kyoto 3 Day Itinerary (2026): Day by Day, and Bookings";
const DESCRIPTION =
  "A Kyoto 3 day itinerary with three nights in one base: Kiyomizu-dera and Gion, Fushimi Inari and Arashiyama at dawn, then Nara or Uji, and what to book.";

const ROUTE = "/guides/attractions/kyoto-3-day-itinerary";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/attractions/arashiyama-bamboo-forest-tour", title: "Arashiyama Bamboo Forest Tour (2026): Best Time, Tours and Routes From Kyoto" },
  { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary (2026): Day by Day, and What to Book" },
  { href: "/guides/attractions/osaka-kyoto-3-day-itinerary", title: "Osaka Kyoto 3 Day Itinerary (2026): Day by Day & Bookings" },
  { href: "/guides/attractions/amanohashidate-ine-day-trip", title: "Amanohashidate Day Trip (2026): Ine Boathouses, Tours and Trains From Kyoto" },
  { href: "/guides/attractions/nara-day-trip", title: "Nara Day Trip (2026): From Osaka or Kyoto, and What Todai-ji Costs" },
  { href: "/guides/attractions/fushimi-inari-tour", title: "Fushimi Inari Tour 2026: Hike Time, Hours & Best Time" },
  { href: "/guides/attractions/gion-night-walking-tour", title: "Gion Night Walking Tour 2026: Times, Types & Photo Rules" },
  { href: "/guides/attractions/kyoto-kimono-rental", title: "Kyoto Kimono Rental (2026): Which Area, What's Included, When to Return" },
  { href: "/guides/attractions/where-to-stay-in-kyoto", title: "Where to Stay in Kyoto (2026): Best Areas, Compared by Line and Travel Time" },
  { href: "/guides/transport/kyoto-to-tokyo-shinkansen", title: "Kyoto to Tokyo Shinkansen: Times, Fares, JR Pass" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function Kyoto3DayItineraryPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content={URL} />
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
            __html: articleJsonLd({ route: ROUTE, headline: TITLE, description: DESCRIPTION, updated }),
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
                { "@type": "ListItem", position: 4, name: "Kyoto 3 Day Itinerary", item: URL },
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
          <span className={styles.breadCurrent}>Kyoto 3 Day Itinerary</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Kyoto 3 Day Itinerary (2026):<br />Day by Day, and What to Book
          </h1>
          <p className={styles.heroSubtitle}>
            Three nights in one base: the east of the city, the south and west at dawn, and one day trip.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices & hours, dated", "A table for each day", "Nara or Uji compared"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Day 1</p>
                <p className={styles.verdictStatValue}>Kiyomizu-dera, Higashiyama, Gion</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 2</p>
                <p className={styles.verdictStatValue}>Fushimi Inari at dawn, Arashiyama</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Day 3</p>
                <p className={styles.verdictStatValue}>Nara (41 min) or Uji (16 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Where to stay</p>
                <p className={styles.verdictStatValue}>3 nights at Kyoto Station</p>
              </div>
            </div>
            {/* Answer-first: the first body paragraph of the article, not the hero line. */}
            <p className={styles.verdictText}>
              A good <strong>Kyoto 3 day itinerary</strong> spends <strong>Day 1</strong> on foot around{" "}
              <strong>Kiyomizu-dera</strong> (¥500, open from 6:00), Higashiyama and Gion, starts{" "}
              <strong>Day 2</strong> at <strong>Fushimi Inari before 7:00</strong> and moves on to Arashiyama,
              and uses <strong>Day 3</strong> for <strong>Nara</strong> (about 41 minutes by JR) or{" "}
              <strong>Uji</strong> (about 16 minutes). Stay <strong>three nights near Kyoto Station</strong>,
              and arrive the evening before Day 1. Prices and times come from official sites, each dated below.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={kyotoThreeDayStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Kyoto Station Hotels →
              </KlookLink>
              <KlookLink href={kyotoCityFushimiArashiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Guided Kyoto Day →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Overview */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Is 3 Days in Kyoto Enough?</h2>
          <p className={styles.bodyText}>
            Yes. Three days is enough for the main sights on each side of the city and one day trip, without
            moving hotels. This guide is for <strong>three nights in Kyoto only</strong>. If you have less time,
            our <Link href="/guides/attractions/kyoto-2-day-itinerary">Kyoto 2 day itinerary</Link> covers the
            city without a day trip. If you are splitting the time between two cities, our{" "}
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">Osaka Kyoto 3 day itinerary</Link> is
            the better fit.
          </p>
          <p className={styles.bodyText}>
            The plan has a simple order: the walking day first, the early start second, and the day trip last.
            Three full days needs three nights, so arrive the evening before Day 1 and leave the morning after
            Day 3. If you have a fourth day, our{" "}
            <Link href="/guides/attractions/amanohashidate-ine-day-trip">Amanohashidate day trip</Link> guide
            covers the longer trip north to the Sea of Japan.
          </p>
        </section>

        {/* Day tables */}
        {dayTables.map((day) => (
          <section key={day.key} className={styles.comparisonSection}>
            <span className={styles.sectionLabel}>{day.label}</span>
            <h2 className={styles.sectionTitle}>{day.heading}</h2>
            <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>{day.intro}</p>
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["Time of day", "Where", "Time to allow", "Getting there", "Booking needed?"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {day.rows.map((row) => (
                      <tr key={row.place}>
                        <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.time}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.place}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.allow}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.getting}</td>
                        <td style={{ fontSize: "0.88rem" }}>{row.booking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              {day.key === "day1" && (
                <>
                  <KlookLink href={kyotoKimonoAiwafukuKiyomizu.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                    Kiyomizu kimono rental →
                  </KlookLink>
                  <KlookLink href={kyotoGionNightWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                    Gion night walk →
                  </KlookLink>
                </>
              )}
              {day.key === "day2" && (
                <>
                  <KlookLink href={kyotoFushimiInariWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                    Fushimi Inari walking tour →
                  </KlookLink>
                  <KlookLink href={saganoHozugawaGuaranteedTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                    Sagano train &amp; river boat →
                  </KlookLink>
                  <KlookLink href={kyotoCityFushimiArashiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                    Fushimi &amp; Arashiyama guided day →
                  </KlookLink>
                </>
              )}
              {day.key === "day3" && (
                <>
                  <KlookLink href={kyotoUjiNaraDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                    Kyoto, Uji &amp; Nara day tour →
                  </KlookLink>
                  <KlookLink href={ujiMatchaGreenTeaHalfDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                    Uji matcha half-day tour →
                  </KlookLink>
                </>
              )}
            </div>
          </section>
        ))}
        <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
          The &ldquo;time to allow&rdquo; column is our own planning allowance, not an operator figure. Kyoto
          journey times are Kyoto City&apos;s, read {CARRIED}.
        </p>

        {/* Nara or Uji */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Day 3 decision</span>
          <h2 className={styles.sectionTitle}>Should You Do Nara or Uji as a Day Trip From Kyoto?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            On a first trip, choose Nara for the deer and the Great Buddha. Choose Uji if you care more about
            matcha or want a shorter, gentler last day.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "Nara", "Uji"].map((h) => (
                      <th key={h || "row"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dayThreeRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.nara}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.uji}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Nara and Uji journey times and Byodo-in figures read {OWN}; Todai-ji read {TODAIJI_CHECKED}. In
            November 2026 Byodo-in lists planned maintenance at the Phoenix Hall and closes the museum&apos;s
            Tobira-e Room from 2 to 27 November, so check its site first. More detail in our{" "}
            <Link href="/guides/attractions/nara-day-trip" style={{ color: "var(--text)", fontWeight: 600 }}>
              Nara day trip guide
            </Link>{" "}
            and{" "}
            <Link href="/guides/attractions/japan-matcha-experiences" style={{ color: "var(--text)", fontWeight: 600 }}>
              matcha experiences guide
            </Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={kyotoUjiNaraDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Both in one tour →
            </KlookLink>
            <KlookLink href={ujiTaihoanWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Uji walk with tea ceremony →
            </KlookLink>
            <KlookLink href={amanohashidateIneFullDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Or go further: Amanohashidate →
            </KlookLink>
          </div>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Prices &amp; hours</span>
          <h2 className={styles.sectionTitle}>What Does a Kyoto 3 Day Itinerary Cost in Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About ¥1,300 of admissions for one adult on the Nara version, or ¥1,200 on the Uji version, because
            several of the main stops are free.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Stop", "Official price", "Hours", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.stop}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Subject to change, so confirm at the gate. No Klook price appears on this page: Klook blocks automated
            reads of its product pages, so open a listing for the figure on your date.
          </p>
        </section>

        {/* Where to stay */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Where to stay</span>
          <h2 className={styles.sectionTitle}>Where Should You Stay for 3 Days in Kyoto?</h2>
          <p className={styles.bodyText}>
            <strong>Kyoto Station for all three nights</strong> is the simplest answer. Day 2 and Day 3 both
            begin on JR lines from there, and your arrival and departure need no transfer.{" "}
            <strong>Shijo-Kawaramachi for three nights</strong> suits you if dinner in Pontocho and Nishiki
            Market on foot matter more. <strong>Gion for two nights, then Kyoto Station for one</strong> gives
            you Kiyomizu-dera on foot at 6:00, at the cost of moving your bags once. For the full comparison,
            read our{" "}
            <Link href="/guides/attractions/where-to-stay-in-kyoto">where to stay in Kyoto guide</Link>.
          </p>
        </section>

        <KlookStayAreas
          heading="Hotel Searches for the Three Options Above"
          intro="Rooms and prices change by date, so each option links to Klook's own hotel search."
          areas={kyotoThreeDayStayAreas}
        />

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Kyoto From Tokyo or Kansai Airport?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            By Tokaido Shinkansen from Tokyo, or the HARUKA limited express from Kansai Airport. Both arrive at
            Kyoto Station.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Journey time", "Fare", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.time}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.fare}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The nationwide JR Pass does not cover Nozomi, so check that before you buy one for this route. JR
            West&apos;s HARUKA ticket is for foreign passport holders entering as temporary visitors. Compare
            the trains in our <Link href="/guides/transport/tokyo-to-kyoto">Tokyo to Kyoto guide</Link> and
            our <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Nankai Rapi:t guide</Link>.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Tokyo → Kyoto shinkansen →
            </KlookLink>
            <KlookLink href={jrHarukaUrl} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Kansai Airport HARUKA →
            </KlookLink>
          </div>
        </section>

        {/* Bus pass */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting around</span>
          <h2 className={styles.sectionTitle}>Do You Need a Bus Pass for 3 Days in Kyoto?</h2>
          <p className={styles.bodyText}>
            Probably not. The Subway &amp; Bus 1-Day Pass is <strong>¥1,100</strong> and a bus ride is a flat{" "}
            <strong>¥230</strong>, so you need about five rides in a day to break even. Day 1 is mostly on foot,
            and Days 2 and 3 rely on JR, which the pass does not cover. Pay as you go unless you plan a
            bus-heavy day. Fares read {FARES_CHECKED}. Our{" "}
            <Link href="/guides/transport/kyoto-transportation">getting around Kyoto guide</Link> has the
            details.
          </p>
        </section>

        {/* Checklist */}
        <section className={styles.whoForSection}>
          <span className={styles.sectionLabel}>Booking checklist</span>
          <h2 className={styles.sectionTitle}>What Should You Book Before You Leave?</h2>
          <p className={styles.bodyText}>
            In this order. The HARUKA date is JR West&apos;s; the other windows are our planning advice, not
            operator rules.
          </p>
          <div className={styles.whoForGrid}>
            {checklist.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="The Klook Bookings for a 3 Day Kyoto Trip"
          intro="The arrival, the appointment and the data. Klook blocks automated price reads, so open a listing for the figure on your dates."
          items={kyotoThreeDayTripPrep}
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

        <KlookTourPicks
          heading="Guided Options for Each Day"
          intro="One listing for each day of this plan, if you would rather leave the routing to someone else."
          tours={[kyotoGionNightWalkingTour, kyotoCityFushimiArashiyamaTour, kyotoUjiNaraDayTour, ujiMatchaGreenTeaHalfDayTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{guide.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Three nights, one base, one day trip</h2>
            <p className={styles.ctaBannerDesc}>
              Book the hotel and your train first. Everything else in Kyoto can wait until the plan is settled.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={kyotoThreeDayStayAreas[0].url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Kyoto Station Hotels →
              </KlookLink>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Shinkansen Tickets →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
