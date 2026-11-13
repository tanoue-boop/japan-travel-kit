import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import KlookTripPrep from "../../../components/KlookTripPrep";
import { jrHarukaUrl, nankaiRapitUrl, osakaAirportArrivalPrep, osakaAirportStayAreas } from "../../../lib/klook-links";
import { checkedLabel } from "../../../lib/attraction-prices";
import { pocketWifi } from "../../../lib/pocket-wifi";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Rebuilt 6 Nov 2026 around the answer (task jtk-20261106-05): the page lands on
 * how-do-I-get-there questions, so the first body paragraph answers them and every
 * heading is the question.
 *
 * Read on 6 November 2026:
 *   westjr.co.jp          HARUKA One-way Ticket: ¥1,600 Tennoji, ¥1,900 Osaka/Shin-Osaka,
 *                         ¥2,700 Kyoto, child half; foreign passport plus Temporary
 *                         Visitor status; cannot be bought inside Japan.
 *   nankai.co.jp          Rapi:t minimum 34 min, Airport Express about 45 min; express
 *                         ticket ¥700 / ¥350 (+¥300 onboard, -¥150 ticketless); Digital
 *                         Ticket ¥1,410 / ¥710, Super Seat ¥1,590 / ¥910.
 *   kate.co.jp            Kansai Airport limousine buses, timetables and the midnight
 *                         bus notice; the Nankai Namba midnight bus is suspended.
 *   osaka-monorail.co.jp  Osaka-Airport to Hotarugaike ¥200, about 3 min.
 *
 * Read through the search index on the same date, because the sites refuse automated
 * reads (HTTP 403 or a certificate error):
 *   kansai-airport.or.jp  Haruka times, first and last trains, taxi table, 20% surcharge.
 *   okkbus.co.jp          Itami to Umeda ¥650, 25–30 min; Itami to Shin-Osaka ¥510, 25 min.
 *   osaka-airport.co.jp   Itami stop 9 to Osaka Station, about 30 minutes.
 *
 * Not confirmed from an operator, so deliberately not stated: Nankai's ordinary fare,
 * Nankai's last train and the regular Haruka fare. Klook prices are never quoted.
 */
const CHECKED = checkedLabel("2026-11-06");

const kixLimousineUrl =
  "https://affiliate.klook.com/redirect?aid=119070&aff_adid=1265375&k_site=https%3A%2F%2Fwww.klook.com%2Fen-GB%2Factivity%2F18203-kansai-airport-one-way-transfer-osaka%2F";

const ninjaWifi = pocketWifi("ninja-wifi");

const arrivalPrep = [
  ...osakaAirportArrivalPrep.slice(0, 1),
  {
    label: "Pocket WiFi for airport pickup",
    why: "An alternative to the eSIM for a group or an older phone. It is collected and returned at an airport counter, and counter hours can bind an early or late flight.",
    ctaLabel: "Check the WiFi rental →",
    url: ninjaWifi.affiliateUrl,
  },
  ...osakaAirportArrivalPrep.slice(1),
];

const kixOptions = [
  { option: "Nankai Rapi:t to Namba",           time: "From 34 min",        price: "¥1,410 Digital Ticket",  bestFor: "Namba, Dotonbori" },
  { option: "Nankai Airport Express to Namba",  time: "About 45 min",       price: "Ordinary fare only",     bestFor: "Namba with no seat ticket" },
  { option: "JR Haruka to Tennoji",             time: "About 35 min",       price: "¥1,600 discounted",      bestFor: "Tennoji, Abeno" },
  { option: "JR Haruka to Osaka Station",       time: "About 45 min",       price: "¥1,900 discounted",      bestFor: "Umeda" },
  { option: "JR Haruka to Shin-Osaka",          time: "About 50 min",       price: "¥1,900 discounted",      bestFor: "Shinkansen connections" },
  { option: "Limousine Bus to Namba (OCAT)",    time: "About 50 min",       price: "¥1,400",                 bestFor: "Heavy luggage, Namba" },
  { option: "Limousine Bus to Osaka Station",   time: "About 60 min",       price: "¥1,800",                 bestFor: "Heavy luggage, Umeda" },
  { option: "Limousine Bus to Uehommachi",      time: "About 55 min",       price: "¥1,800",                 bestFor: "Uehommachi, Shinsaibashi" },
  { option: "Metered taxi to Kita-ku, Osaka",   time: "About 50 min",       price: "About ¥24,400 with tolls", bestFor: "Groups, door to door" },
];

const fareRows = [
  { route: "Kansai Airport → Namba",           service: "Rapi:t Digital Ticket, Regular Seat",  adult: "¥1,410", child: "¥710",   source: "Nankai" },
  { route: "Kansai Airport → Namba",           service: "Rapi:t Digital Ticket, Super Seat",    adult: "¥1,590", child: "¥910",   source: "Nankai" },
  { route: "Kansai Airport → Tennoji",         service: "HARUKA One-way Ticket",                adult: "¥1,600", child: "¥800",   source: "JR West" },
  { route: "Kansai Airport → Osaka, Shin-Osaka", service: "HARUKA One-way Ticket",              adult: "¥1,900", child: "¥950",   source: "JR West" },
  { route: "Kansai Airport → Kyoto",           service: "HARUKA One-way Ticket",                adult: "¥2,700", child: "¥1,350", source: "JR West" },
];

const itamiBusRows = [
  { item: "One-way fare",            value: "¥2,200 adult, ¥1,100 child" },
  { item: "Round trip",              value: "¥4,000 adult, valid for 14 days" },
  { item: "Journey time",            value: "About 1 hr 10 min to 1 hr 15 min, Itami to Terminal 1" },
  { item: "From KIX Terminal 1",     value: "8 buses a day: 7:30, 8:50, 10:00, 11:00, 12:00, 14:50, 17:50, 19:10" },
  { item: "From Osaka (Itami) Airport", value: "9 buses a day: 7:00, 8:10, 10:40, 11:40, 12:40, 14:40, 15:40, 17:40, 20:20" },
  { item: "Reservations",            value: "None taken, first come first served" },
  { item: "Itami stand",             value: "Departs from stand 5" },
];

const itmOptions = [
  { option: "Limousine Bus to Umeda",        time: "About 25–30 min", price: "¥650",            bestFor: "Umeda hotels, Osaka Station" },
  { option: "Limousine Bus to Shin-Osaka",   time: "About 25 min",    price: "¥510",            bestFor: "Shinkansen connections" },
  { option: "Monorail to Hotarugaike, then Hankyu", time: "About 3 min on the monorail", price: "¥200 monorail, Hankyu fare extra", bestFor: "Rail all the way to Umeda" },
];

const kyotoRows = [
  { option: "JR Haruka",              time: "About 75 min",               price: "¥2,700 discounted one-way", note: "Direct to Kyoto Station" },
  { option: "Limousine Bus",          time: "About 1 hr 25 min to 1 hr 30 min", price: "¥2,800",             note: "To Kyoto Station Hachijo Exit" },
];

const lateRows = [
  { option: "JR Haruka",                     last: "About 22:16 from KIX",   note: "Reaches Osaka Station at about 23:03." },
  { option: "Limousine Bus to Namba (OCAT)", last: "About 21:25, Terminal 1", note: "¥1,400." },
  { option: "Limousine Bus to Kyoto",        last: "About 23:20, Terminal 1", note: "¥2,800." },
  { option: "Limousine Bus to Osaka Station", last: "23:45, Terminal 1",     note: "¥1,800, the last bus at the normal fare." },
  { option: "Midnight bus to Osaka Station", last: "24:15, Terminal 1",      note: "¥2,700 adult, ¥1,350 child. Cashless only, about 60 min, and no extra bus runs if it is full." },
  { option: "Midnight bus to Nankai Namba",  last: "Suspended",              note: "Kansai Airport Transportation lists this route as not running." },
  { option: "Taxi",                          last: "All night",              note: "Kansai Airport's fare page adds 20% between 22:00 and 5:00." },
];

const harukaVsRapitRows = [
  { feature: "Operator",           haruka: "JR West",                                   rapit: "Nankai (private rail)" },
  { feature: "One-way fare",       haruka: "¥1,900 Osaka or Shin-Osaka, ¥2,700 Kyoto (discounted)", rapit: "¥1,410 (Digital Ticket)" },
  { feature: "Journey time",       haruka: "Tennoji 35, Osaka 45, Shin-Osaka 50, Kyoto 75 min", rapit: "From 34 min to Namba" },
  { feature: "Covered by JR Pass", haruka: "Yes",                                       rapit: "No" },
  { feature: "Kansai Area Pass",   haruka: "Non-reserved seats covered",                rapit: "No" },
  { feature: "Direct to",          haruka: "Tennoji, Osaka, Shin-Osaka, Kyoto",         rapit: "Namba" },
  { feature: "Discount option",    haruka: "HARUKA One-way Ticket",                     rapit: "Rapi:t Digital Ticket" },
];

const destinationRows = [
  { dest: "Namba (Dotonbori, Shinsaibashi)", pick: "Nankai Rapi:t", note: "From 34 min direct, with no change of train." },
  { dest: "Umeda / Osaka Station", pick: "Haruka", note: "About 45 min direct. The limousine bus is about 60 min." },
  { dest: "Tennoji",        pick: "Haruka", note: "About 35 min direct on the JR Haruka." },
  { dest: "Shin-Osaka",     pick: "Haruka", note: "About 50 min direct, for a Shinkansen connection." },
  { dest: "Uehommachi",     pick: "Limousine Bus", note: "About 55 min with no train change, ¥1,800." },
  { dest: "Kyoto",          pick: "Haruka", note: "About 75 min direct, no transfer (¥2,700 discounted one-way, or covered by a JR Pass)." },
];

const harukaPoints = [
  {
    title: "Covered by the JR Pass",
    desc: "The Haruka is operated by JR West and is covered by the Japan Rail Pass. Pass holders can reserve a seat at the JR ticket office at Kansai-airport Station, which JR West lists as open from 5:30am to 11:00pm.",
  },
  {
    title: "Direct connections to Osaka, Kyoto and Shin-Osaka",
    desc: "The Haruka runs directly from Kansai Airport to Tennoji (about 35 min), Osaka Station (about 45 min), Shin-Osaka (about 50 min) and Kyoto (about 75 min). If you are continuing to Kyoto or boarding the Shinkansen at Shin-Osaka, you stay in one seat the whole way.",
  },
  {
    title: "A discounted one-way ticket for foreign visitors",
    desc: "JR West's HARUKA One-way Ticket is for holders of a foreign passport entering Japan as a Temporary Visitor. JR West says it cannot be bought inside Japan, so arrange it before you fly. An ICOCA card is a separate purchase from the ticket machines at the station.",
  },
  {
    title: "Runs every 30 to 40 minutes through the day",
    desc: "Kansai Airport lists one train every 30 to 40 minutes from 9am to 8pm and one an hour outside those hours. The first departure is about 6:31am on weekdays and 6:40am on weekends and holidays, and the last is about 10:16pm.",
  },
];

const rapiTPoints = [
  {
    title: "Fastest connection to Namba",
    desc: "Nankai states a minimum of 34 minutes between Kansai Airport and Namba. Namba is the station for Dotonbori and Shinsaibashi, and one of Osaka's two main hubs alongside Umeda.",
  },
  {
    title: "Not covered by the JR Pass",
    desc: "The Rapi:t runs on the Nankai private railway, not JR, so a JR Pass does not cover it. Nankai sells a Rapi:t Digital Ticket that combines the train fare and the express ticket for one chosen date, and it can be refunded in the app until five minutes before departure if unused.",
  },
  {
    title: "Two seat classes, one journey time",
    desc: "Every Rapi:t rider needs a limited express ticket on top of the train fare: ¥700 adult for a Regular Seat or ¥910 for a Super Seat, plus ¥300 if you buy onboard or ¥150 less through Nankai's ticketless service. Both classes are on the same train, so a Super Seat buys more room, not a faster trip.",
  },
];

const tips = [
  {
    title: "KIX is on an artificial island, so factor in extra time",
    desc: "Kansai International Airport is built on a reclaimed island off the Osaka coast, and every road and rail journey crosses the same bridge. Leave extra time when you return for a departing flight.",
  },
  {
    title: "Check which terminal you land at",
    desc: "Limousine buses stop at Terminal 2 first and then Terminal 1, about 15 minutes later. The times in this guide are Terminal 1 times, so a Terminal 2 arrival should board earlier.",
  },
  {
    title: "Buy an ICOCA at the station",
    desc: "ICOCA is the local Kansai IC card. JR West says it is sold from the ticket machines at Kansai-airport Station, and that credit cards cannot be used to buy one, so keep some cash for it.",
  },
  {
    title: "JR Pass users: take the Haruka",
    desc: "If you hold a JR Pass and are heading to Osaka, Kyoto or Shin-Osaka, the Haruka is covered. Reserve a seat at the JR office at the station on arrival, because a Rapi:t ticket is a separate cost for pass holders.",
  },
  {
    title: "ITM is much closer to the city than KIX",
    desc: "Itami Airport (ITM) handles domestic flights only and sits north of central Osaka. The limousine bus to Umeda takes about 25 to 30 minutes, so a connection from a domestic flight into the city is short.",
  },
];

const faqItems = [
  {
    q: "What is the cheapest way from KIX to Osaka city?",
    a: "Of the fares confirmed with an operator, the limousine bus to Namba (OCAT) is ¥1,400 for an adult. The Nankai Airport Express needs only the ordinary train fare and no seat ticket, and takes about 45 minutes to Namba; check the current fare on Nankai's fare search. If you hold a JR Pass, the Haruka is covered.",
  },
  {
    q: "Can I use the JR Pass from Kansai Airport?",
    a: "Yes. The Haruka Limited Express is operated by JR West and is covered by the Japan Rail Pass. Reserve a seat at the JR ticket office at Kansai-airport Station. The train runs directly to Tennoji, Osaka, Shin-Osaka and Kyoto.",
  },
  {
    q: "How long does it take from KIX to Osaka?",
    a: "It depends on where in Osaka you are going. The Nankai Rapi:t reaches Namba in a minimum of 34 minutes. The JR Haruka reaches Tennoji in about 35 minutes, Osaka Station in about 45 and Shin-Osaka in about 50. The limousine bus takes about 50 minutes to Namba (OCAT) and about 60 to Osaka Station.",
  },
  {
    q: "What is the difference between KIX and ITM?",
    a: "Kansai International Airport (KIX) handles international flights and some domestic routes, and sits on an artificial island south of the city. Itami Airport (ITM) handles domestic flights only and is north of central Osaka. For visitors arriving from abroad, KIX is almost certainly your arrival point.",
  },
  {
    q: "Is there a direct train from Kansai Airport to Kyoto?",
    a: "Yes. The JR Haruka Limited Express runs directly from Kansai Airport to Kyoto Station in about 75 minutes with no transfer. JR Pass holders are covered, and eligible foreign visitors can use JR West's HARUKA One-way Ticket at ¥2,700 for an adult.",
  },
  {
    q: "Haruka or Nankai Rapi:t — which is better?",
    a: "It comes down to your destination. For Namba, Dotonbori and Shinsaibashi, the Nankai Rapi:t is the direct train, from 34 minutes. For Tennoji, Osaka Station, Shin-Osaka or Kyoto, the JR Haruka runs there directly and a JR Pass covers it.",
  },
  {
    q: "Is the Rapi:t cheaper than the Haruka?",
    a: "On the discounted tickets, yes. Nankai's Rapi:t Digital Ticket to Namba is ¥1,410 for an adult, while JR West's HARUKA One-way Ticket is ¥1,600 to Tennoji and ¥1,900 to Osaka or Shin-Osaka. They go to different stations, though, and a JR Pass covers the Haruka but not the Rapi:t.",
  },
  {
    q: "Is there a direct bus from Kansai Airport to Itami Airport?",
    a: "Yes. A direct limousine bus links the two airports in about 1 hour 10 to 15 minutes from Terminal 1, for ¥2,200 for an adult. There are 8 departures a day from Terminal 1 and 9 from Itami, with no reservations taken. Gaps between buses can be nearly three hours.",
  },
  {
    q: "Can I buy the Haruka discount ticket at Kansai Airport?",
    a: "No. JR West says the HARUKA One-way Ticket cannot be bought inside Japan. It is sold through overseas travel agencies and JR-WEST ONLINE TRAIN RESERVATION before you travel, then collected in Japan with your passport.",
  },
  {
    q: "What is the last way into Osaka from KIX at night?",
    a: "The last Haruka leaves at about 22:16. The last limousine bus to Osaka Station at the normal ¥1,800 fare leaves Terminal 1 at 23:45, and a cashless-only midnight bus leaves at 24:15 for ¥2,700. The Nankai Namba midnight bus is suspended. Check Nankai's timetable search for its last train.",
  },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/transport/osaka-airport-transfer") } });

export default function OsakaAirportTransferPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>Osaka Airport Transfer 2026: KIX &amp; Itami Fares Compared</title>
        <meta
          name="description"
          content="Osaka Airport Transfer fares checked Nov 2026: Rapi:t and Haruka from Kansai, Itami to Umeda, the direct KIX to Itami bus, and late-night arrival options."
        />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/transport/osaka-airport-transfer" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Osaka Airport Transfer 2026: KIX &amp; Itami Fares Compared" />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/transport/osaka-airport-transfer" />
        <meta property="og:description" content="Osaka Airport Transfer fares checked Nov 2026: Rapi:t and Haruka from Kansai, Itami to Umeda, the direct KIX to Itami bus, and late-night arrival options." />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Japan Travel Kit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Osaka Airport Transfer 2026: KIX &amp; Itami Fares Compared" />
        <meta name="twitter:description" content="Osaka Airport Transfer fares checked Nov 2026: Rapi:t and Haruka from Kansai, Itami to Umeda, the direct KIX to Itami bus, and late-night arrival options." />
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
                { "@type": "ListItem", position: 4, name: "Osaka Airport Transfer", item: "https://www.japan-travel-kit.com/guides/transport/osaka-airport-transfer" },
              ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: articleJsonLd({
              route: "/guides/transport/osaka-airport-transfer",
              headline: "Osaka Airport Transfer Guide (2026): KIX & ITM to the City",
              updated,
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
          <span className={styles.breadCurrent}>Osaka Airport Transfer</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Updated {updated.label}
          </p>
          <h1 className={styles.heroTitle}>
            Osaka Airport Transfer Guide (2026):<br />KIX &amp; ITM to the City
          </h1>
          <p className={styles.heroSubtitle}>
            Osaka has two airports — Kansai International and Itami. Here&apos;s the fastest and cheapest way to get into the city from each.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "KIX & ITM", "Haruka vs Rapi:t"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* The answer, in the first body paragraph */}
        <p className={styles.bodyText}>
          <strong>From Kansai Airport (KIX) to Namba</strong>, take the Nankai Rapi:t: a minimum of 34 minutes and
          ¥1,410 on Nankai&apos;s Rapi:t Digital Ticket. <strong>To Osaka Station, Shin-Osaka or Kyoto</strong>, take
          the JR Haruka: about 45, 50 and 75 minutes, at ¥1,900 to Osaka or Shin-Osaka and ¥2,700 to Kyoto on JR
          West&apos;s discounted one-way for foreign visitors. <strong>From Itami (ITM) to Umeda</strong>, the
          limousine bus takes about 25 to 30 minutes and costs ¥650. <strong>Between KIX and Itami</strong>, a direct
          limousine bus takes about 1 hour 10 to 15 minutes and costs ¥2,200. Adult fares and times are from Nankai,
          JR West, Kansai Airport Transportation and Osaka Airport Transport, checked on {CHECKED}.
        </p>

        {/* Quick Answer Box */}
        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>KIX to Namba</p>
                <p className={styles.verdictStatValue}>Rapi:t (from 34 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>KIX to Osaka Station</p>
                <p className={styles.verdictStatValue}>Haruka (about 45 min)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Itami to Umeda</p>
                <p className={styles.verdictStatValue}>Limousine Bus (¥650)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>KIX to Itami</p>
                <p className={styles.verdictStatValue}>Direct bus (¥2,200)</p>
              </div>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* KIX Options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Kansai International Airport (KIX)</span>
          <h2 className={styles.sectionTitle}>How do I get from Kansai Airport to Osaka city?</h2>
          <p className={styles.bodyText}>
            Take the Nankai Rapi:t if you are staying in Namba and the JR Haruka if you are staying in Umeda, Tennoji
            or Shin-Osaka. The limousine bus suits heavy luggage, and a taxi is the costly door-to-door option.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Adult price", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kixOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            One-way adult figures, checked {CHECKED}: Nankai, JR West, Kansai Airport Transportation, and Kansai
            Airport&apos;s taxi table. The discounted Haruka price is JR West&apos;s HARUKA One-way Ticket for eligible
            foreign visitors. Times can run longer in traffic.
          </p>
        </section>

        {/* By destination */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>By destination</span>
          <h2 className={styles.sectionTitle}>Which airport train is best for my hotel area?</h2>
          <p className={styles.bodyText}>
            Pick the service that stops at your hotel&apos;s station, because a change of train with luggage costs more
            than a few minutes of journey time.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Destination", "Best pick", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {destinationRows.map((row) => (
                    <tr key={row.dest}>
                      <td className={styles.tdProvider}>{row.dest}</td>
                      <td className={styles.tdPrice}>{row.pick}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.5rem" }}>
            <KlookLink href={jrHarukaUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check the Haruka ticket on Klook →
            </KlookLink>
            <KlookLink href={nankaiRapitUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check the Rapi:t ticket on Klook →
            </KlookLink>
            <KlookLink href={kixLimousineUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check the limousine bus on Klook →
            </KlookLink>
          </div>
        </section>

        {/* What to book before arrival */}
        <KlookTripPrep
          label="Before you land"
          heading="What should I book before I arrive in Osaka?"
          intro={"With the airport ride settled, these are the other things worth having in place. Our where-to-stay guide below compares the hotel areas by line and airport."}
          items={arrivalPrep}
        />
        <p className={styles.bodyText}>
          Still choosing a base? See{" "}
          <Link href="/guides/attractions/where-to-stay-in-osaka">where to stay in Osaka</Link>, and plan the days
          around it with our <Link href="/guides/attractions/osaka-2-day-itinerary">2-day Osaka itinerary</Link> or{" "}
          <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary">3-day Osaka and Kyoto itinerary</Link>.
        </p>

        {/* Fares */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Fares</span>
          <h2 className={styles.sectionTitle}>How much is the train from Kansai Airport to Osaka?</h2>
          <p className={styles.bodyText}>
            Expect ¥1,410 to Namba on the Rapi:t Digital Ticket and ¥1,900 to Osaka Station or Shin-Osaka on the HARUKA
            One-way Ticket. Both are discounted one-way adult tickets; other tickets cost differently.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Ticket", "Adult", "Child", "Source"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fareRows.map((row) => (
                    <tr key={`${row.route}-${row.service}`}>
                      <td className={styles.tdProvider}>{row.route}</td>
                      <td>{row.service}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{row.child}</td>
                      <td>{row.source}, {CHECKED}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            JR West&apos;s page notes that its prices changed for tickets sold on or after 1 November 2026. Without the
            Digital Ticket, the Rapi:t costs the ordinary train fare plus a ¥700 adult limited express ticket, and the
            Nankai Airport Express needs the ordinary fare alone. This table leaves out the ordinary Nankai fare and the
            regular Haruka fare because neither could be read from the operator on this date. Check both operators&apos;
            fare searches before you travel.
          </p>
        </section>

        {/* Haruka vs Rapi:t */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Head-to-head</span>
          <h2 className={styles.sectionTitle}>Haruka or Rapi:t: which train should I take?</h2>
          <p className={styles.bodyText}>
            Take the Rapi:t for Namba and the Haruka for everywhere else on this list. They do not share a city station,
            so your hotel decides, not the fare. See the full{" "}
            <Link href="/guides/transport/haruka-vs-nankai-rapit">Haruka vs Rapi:t comparison</Link>.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "JR Haruka", "Nankai Rapi:t"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {harukaVsRapitRows.map((row) => (
                    <tr key={row.feature}>
                      <td className={styles.tdProvider}>{row.feature}</td>
                      <td>{row.haruka}</td>
                      <td>{row.rapit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            One-way adult fares from JR West and Nankai, checked {CHECKED}. Haruka times are from Kansai Airport.
          </p>
        </section>

        {/* Haruka discount */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Haruka discount</span>
          <h2 className={styles.sectionTitle}>Is the Haruka discount ticket worth it?</h2>
          <p className={styles.bodyText}>
            Yes, if you qualify and the Haruka is your train. JR West&apos;s HARUKA One-way Ticket is ¥1,900 to Osaka or
            Shin-Osaka and ¥2,700 to Kyoto, and it includes a reserved or non-reserved ordinary seat with no separate
            express ticket, checked {CHECKED}.
          </p>
          <p className={styles.bodyText}>
            Three limits matter. You need a foreign passport and Temporary Visitor status. JR West says it cannot be
            bought inside Japan, so a plan to buy it at the airport will not work. And you cannot get off at an
            intermediate station, because doing so makes the ticket invalid. If you are riding JR on other trips the
            same day, price the <Link href="/guides/attractions/kansai-area-pass">Kansai Area Pass</Link> as well, since
            it covers the Haruka&apos;s non-reserved seats.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrHarukaUrl} className={styles.pickCta} target="_blank" rel="sponsored noopener">
              Check the Haruka ticket on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Kyoto */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Kansai Airport to Kyoto</span>
          <h2 className={styles.sectionTitle}>Can I get from Kansai Airport to Kyoto directly?</h2>
          <p className={styles.bodyText}>
            Yes. The JR Haruka runs direct to Kyoto Station in about 75 minutes, and a limousine bus runs direct in about
            1 hour 25 to 30 minutes.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Adult price", "Arrives"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kyotoRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            JR West, Kansai Airport and Kansai Airport Transportation, checked {CHECKED}. Only buses towards the airport
            require a reservation.
          </p>
          <p className={styles.bodyText}>
            Heading to Kyoto? The 1-day{" "}
            <Link href="/guides/attractions/kansai-area-pass">JR Kansai Area Pass</Link> costs the same ¥2,700 as the
            HARUKA One-way Ticket to Kyoto, and covers every other JR ride that day too.
          </p>
        </section>

        {/* KIX to ITM */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Between the two airports</span>
          <h2 className={styles.sectionTitle}>How do I get from KIX to Itami (ITM) Airport?</h2>
          <p className={styles.bodyText}>
            Take the direct limousine bus: about 1 hour 10 to 15 minutes from Terminal 1 and ¥2,200 for an adult. It is
            infrequent, with 8 departures a day from Terminal 1, so check the times against your flight first.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["KIX to Itami bus", `Checked ${CHECKED}`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itamiBusRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Kansai Airport Transportation timetable. Some trips are run by Hankyu Kanko Bus. There is no bus from Terminal
            1 between 12:00 and 14:50, so allow for gaps. Confirm the time on the operator&apos;s timetable before you travel.
          </p>
        </section>

        {/* ITM Options */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Itami Airport (ITM)</span>
          <h2 className={styles.sectionTitle}>How do I get from Itami Airport to Osaka?</h2>
          <p className={styles.bodyText}>
            Take the limousine bus: about 25 to 30 minutes to Umeda for ¥650, or about 25 minutes to Shin-Osaka for ¥510.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Time", "Adult price", "Best For"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itmOptions.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td>{row.time}</td>
                      <td className={styles.tdPrice}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Osaka Airport Transport and Osaka Monorail figures, checked {CHECKED}. Itami handles domestic flights only, so
            most international visitors arrive at KIX. The Umeda bus leaves from stop 9.
          </p>
        </section>

        {/* Late night */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Late arrivals</span>
          <h2 className={styles.sectionTitle}>What if I land late at night at KIX?</h2>
          <p className={styles.bodyText}>
            After the last Haruka at about 22:16, use the limousine bus to Osaka Station: the last normal-fare bus leaves
            Terminal 1 at 23:45, and a cashless midnight bus leaves at 24:15. After that, plan on a taxi or a night at the
            airport.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Option", "Last departure", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lateRows.map((row) => (
                    <tr key={row.option}>
                      <td className={styles.tdProvider}>{row.option}</td>
                      <td>{row.last}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            Kansai Airport and Kansai Airport Transportation, checked {CHECKED}. Nankai&apos;s last train is not confirmed
            here from an operator page, so check Nankai&apos;s timetable search for your date.
          </p>
        </section>

        {/* Haruka Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Haruka Limited Express</span>
          <h2 className={styles.sectionTitle}>What should I know about the Haruka?</h2>
          <div className={styles.stepsList}>
            {harukaPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <KlookLink
              href={jrHarukaUrl}
              className={styles.pickCta}
              target="_blank"
              rel="sponsored noopener"
            >
              Book Haruka Express Tickets on Klook →
            </KlookLink>
            <KlookLink
              href="https://affiliate.klook.com/redirect?aid=119070&aff_adid=1264855&k_site=https%3A%2F%2Fwww.klook.com%2Factivity%2F1420-7-day-whole-japan-rail-pass-jr-pass%2F"
              className={styles.pickCta}
              target="_blank"
              rel="sponsored noopener"
            >
              Book JR Pass (includes Haruka) on Klook →
            </KlookLink>
          </div>
        </section>

        {/* Rapi:t Guide */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Nankai Rapi:t</span>
          <h2 className={styles.sectionTitle}>What should I know about the Rapi:t?</h2>
          <div className={styles.stepsList}>
            {rapiTPoints.map((point, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{point.title}</p>
                  <p className={styles.stepDesc}>{point.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <KlookLink
            href={nankaiRapitUrl}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Nankai Rapi:t Tickets on Klook →
          </KlookLink>
        </section>

        {/* Limousine Bus */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Airport Limousine Bus</span>
          <h2 className={styles.sectionTitle}>Should I take the limousine bus from Kansai Airport?</h2>
          <p className={styles.bodyText}>
            Take it if you have heavy luggage or a stop near your hotel. The Airport Limousine Bus serves both KIX and ITM,
            with direct routes to Osaka Station, Namba (OCAT), Uehommachi and Kyoto. Airport departures to the city take no
            reservations, so seats are first come, first served.
          </p>
          <p className={styles.bodyText}>
            On the way back out, allow extra time if you shopped tax-free: from 1 November 2026{" "}
            <Link href="/guides/money/tax-free-shopping-japan" style={{ color: "var(--red)", fontWeight: 600 }}>
              Japan tax free shopping is a refund
            </Link>{" "}
            that needs a customs check at a terminal in the Kansai Airport departure lobby before you check your
            bags, with the goods still in your hand luggage.
          </p>
          <KlookLink
            href={kixLimousineUrl}
            className={styles.pickCta}
            target="_blank"
            rel="sponsored noopener"
            style={{ marginTop: "1.5rem", display: "inline-block" }}
          >
            Book Kansai Airport Limousine Bus on Klook →
          </KlookLink>
        </section>

        {/* Tips */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Tips</span>
          <h2 className={styles.sectionTitle}>What should I know before arriving at Kansai Airport?</h2>
          <div className={styles.stepsList}>
            {tips.map((tip, i) => (
              <div key={i} className={styles.stepCard}>
                <span className={styles.stepNum}>{i + 1}</span>
                <div className={styles.stepBody}>
                  <p className={styles.stepTitle}>{tip.title}</p>
                  <p className={styles.stepDesc}>{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <BookingEsimCard lead="Landing at Kansai? Get mobile data before you fly." />

        {/* Where to stay for easy airport access */}
        <KlookStayAreas
          heading="Where should I stay for an easy airport run?"
          intro="Kansai Airport splits neatly by hotel: the Rapi:t serves one side of Osaka and the Haruka the other, and whichever one stops near your hotel is usually the right answer. If the booking is still open, choosing one of these areas settles both the arrival and the trip back out."
          areas={osakaAirportStayAreas}
        />

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

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/where-to-stay-in-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Where to Stay in Osaka 2026: Namba vs Umeda vs USJ, the Best Areas Compared</p>
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
            <Link href="/guides/transport/haruka-vs-nankai-rapit" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="5" width="16" height="11" rx="2" />
                  <path d="M4 11h16M8 16l-1 3M16 16l1 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Haruka vs Nankai Rapi:t (2026): Best Train from Kansai Airport?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka 2-Day Itinerary</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka and Kyoto 3-Day Itinerary</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/tokyo-airport-transfer" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Airport Transfer Guide (2026): Narita &amp; Haneda to the City</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide 2026: Is It Worth It for Your Japan Trip?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan 2026: Suica, Pasmo &amp; How to Use Them</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Travelling across Japan by rail?</h2>
            <p className={styles.ctaBannerDesc}>
              A JR Pass covers the Haruka from Kansai Airport and all Shinkansen services between Osaka, Kyoto, and Tokyo. Find out if it&apos;s worth it for your itinerary.
            </p>
            <Link href="/guides/transport/jr-pass-guide" className={styles.ctaBannerBtn}>
              Read the JR Pass Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
