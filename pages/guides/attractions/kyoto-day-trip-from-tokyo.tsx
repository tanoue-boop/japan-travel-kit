import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import KlookLink from "../../../components/KlookLink";
import styles from "../../../styles/BestEsimJapan.module.css";
import {
  jrPassWholeJapan,
  kyotoCityFushimiArashiyamaTour,
  kyotoDayTripPrep,
  kyotoEasternWalkingTour,
  kyotoFushimiInariWalkingTour,
  kyotoGionHigashiyamaWalkingTour,
  kyotoHighlightBusTour,
  shinkansenTokyoKyoto,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Kyoto Day Trip from Tokyo, written for the exact phrase. Added 5 Nov 2026 (task
 * jtk-20261105-02). tokyo-to-kyoto compares the ways to travel; this page plans the day.
 *
 * Official reads, 5 Nov 2026:
 *   smart-ex.jp price table          ¥13,970 Tokyo–Kyoto, Nozomi, reserved Ordinary, regular
 *                                    season, one adult one way. The PDF cannot be parsed from
 *                                    here, so the cell was read through the search index for
 *                                    that file; it agrees with data/jr-fares.json.
 *   smart-ex.jp plan page            −¥200 off-peak, +¥200 peak, +¥400 top season.
 *   railway.jr-central.co.jp/nozomi  the 2026–27 all-reserved Nozomi periods.
 *   jr-central.co.jp release of      reserved Nozomi prices rise for purchases from 1 Jul 2027;
 *     16 Oct 2026                    Tokyo–Shin-Osaka ¥14,720 to ¥15,420. No Kyoto total was
 *                                    readable, so none is printed.
 *   traininfo.jr-central.co.jp       Kyoto eastbound board in the search index: Nozomi 60 at
 *                                    21:02, Nozomi 62 at 21:21.
 * Klook's rail pages answer automated reads (train times only, sample date 11 Nov 2026):
 * Nozomi 1 06:00 Tokyo → 08:08 Kyoto; latest departure Nozomi 64 21:38 → 23:38.
 *
 * JR Central's timetable PDFs are encrypted and could not be read, so no first or last
 * train is stated as JR Central's own.
 *
 * Carried from kyoto-2-day-itinerary (kyoto.travel, kiyomizudera.or.jp, shokoku-ji.jp, read
 * 29 Oct 2026): journey times from Kyoto Station, Kiyomizu-dera hours and fees, Kinkaku-ji
 * hours. Carried from kyoto-to-tokyo-shinkansen (japanrailpass.net, 29 Oct 2026): pass
 * prices and the ¥4,960 Nozomi ticket; JR Central's 130 minutes; the baggage rule.
 * Reserved-seat sale rule from tokyo-to-hiroshima-shinkansen (JR Central, 28 Oct 2026).
 *
 * The brief's "2 hours 15 minutes" is replaced by what could be confirmed: 2h 8m to 2h 9m
 * on the sample trains and JR Central's 130 minutes.
 *
 * Tour facts come from the www.klook.com search index, 5 Nov 2026 (HTTP 403 on /activity/).
 * Klook sells no Tokyo-departure Kyoto tour we could find. Nothing here is first-hand and
 * no Klook price appears. Times in the plan table are our own allowance and say so.
 */
const ROUTE = "/guides/attractions/kyoto-day-trip-from-tokyo";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;
const CHECKED = checkedLabel("2026-11-05");
const KYOTO_READ = checkedLabel("2026-10-29");

const ONE_WAY = "¥13,970";
const RETURN = "¥27,940";
const LINK = { color: "var(--red)", fontWeight: 600 };

/** The cost of the day. The fare row is the only figure that varies by date. */
const costRows = [
  { item: "Shinkansen return, Nozomi reserved Ordinary (smartEX)", cost: `${RETURN} (${ONE_WAY} each way)`, note: `Regular season, one adult. Read ${CHECKED}` },
  { item: "Season adjustment", cost: "−¥200 to +¥400 each way", note: `Off-peak −¥200, peak +¥200, top season +¥400. Read ${CHECKED}` },
  { item: "Fushimi Inari Taisha", cost: "Free", note: `No admission charge. Read ${KYOTO_READ}` },
  { item: "Kiyomizu-dera", cost: "¥500 adult", note: `¥200 elementary and junior high. Read ${KYOTO_READ}` },
];

/** Train times are as printed; every other time is our own allowance. */
const planRows = [
  { time: "06:00", stop: "Nozomi 1 leaves Tokyo", detail: "Arrives Kyoto 08:08 on the sample date. A later train works: take time off the last two rows" },
  { time: "About 08:30", stop: "Fushimi Inari Taisha", detail: "JR Nara Line to JR Inari, about 9 minutes from Kyoto Station. Allow 1 hour for the lower gates" },
  { time: "About 10:30", stop: "Kiyomizu-dera", detail: "Open from 6:00. City Bus 100 or 206 to Gojozaka, then about 10 minutes on foot. Allow 1 hour" },
  { time: "About 11:30", stop: "Sannenzaka and Ninenzaka, then lunch", detail: "Walk downhill from the temple gate toward Gion. Allow 2 hours" },
  { time: "About 14:00", stop: "Yasaka Shrine and Gion", detail: "On foot from the lanes. Allow 2 hours for the shrine, Hanamikoji and the Shirakawa area" },
  { time: "About 16:30", stop: "Back to Kyoto Station", detail: "The Higashiyama side is about 35 minutes from the station" },
  { time: "17:00–19:00", stop: "Shinkansen to Tokyo", detail: "Book the seat in advance. Latest departure on Klook's sample date: Nozomi 64 at 21:38" },
];

const compareRows = [
  { what: "Train", self: "You book it", tour: "You book it. No Klook tour found for this guide includes the Tokyo train" },
  { what: "Getting around Kyoto", self: "JR, city buses and walking", tour: "Coach or guide, from Kyoto Station" },
  { what: "Length in Kyoto", self: "Your choice, about 6–8 hours", tour: "About 8 hours (walking) to 8 hours 30 minutes (bus)" },
  { what: "Sights covered", self: "Usually two sides of the city", tour: "Up to three or four sides, with less time at each" },
  { what: "Admission", self: "Pay at each sight", tour: "Check your option: inclusions differ by listing" },
  { what: "If your train is late", self: "Nothing to lose", tour: "Late arrivals and no-shows are not refunded on the Kyoto day tour below" },
  { what: "Cancelling", self: "Train rules only", tour: "Full refund up to 48 hours before on the Kyoto day tour below" },
];

/** Klook durations from the search index, 5 Nov 2026. */
const tourRows = [
  { tour: kyotoCityFushimiArashiyamaTour, hours: "About 8 hours", start: "JR Kyoto Station", who: "The most sights, with an English and Japanese guide" },
  { tour: kyotoHighlightBusTour, hours: "8 hours 30 minutes", start: "Check your booking", who: "Coach day: Kiyomizu-dera, Kinkaku-ji, Fushimi Inari, Arashiyama" },
  { tour: kyotoEasternWalkingTour, hours: "8 hours", start: "Kyoto Station", who: "The eastern side on foot" },
  { tour: kyotoFushimiInariWalkingTour, hours: "3 hours", start: "Check your booking", who: "A guide for one block of a self-planned day" },
  { tour: kyotoGionHigashiyamaWalkingTour, hours: "2 hours", start: "Check your booking", who: "An afternoon guide after a morning alone" },
];

const seeRows = [
  { plan: "Fushimi Inari, Kiyomizu-dera, Gion", verdict: "Fits", why: "South and east sides, 10 and 35 minutes from Kyoto Station. Our recommended day" },
  { plan: "Arashiyama and Fushimi Inari", verdict: "Fits", why: "West and south, 25 and 10 minutes from the station, but they pull in opposite directions" },
  { plan: "Kiyomizu-dera, Gion and Kinkaku-ji", verdict: "Tight", why: "Kinkaku-ji is 40 minutes from the station and open 9:00–17:00, so it needs its own morning or a tour" },
  { plan: "All of the above plus Arashiyama", verdict: "Too much alone", why: "Four sides of the city in one day. Only a coach tour joins them, with short stops" },
];

const nozomiPeriods = "21–23 November 2026, 25 December 2026–5 January 2027, 9–11 January 2027 and 20–22 March 2027";

const faqItems = [
  {
    q: "Can you do a day trip to Kyoto from Tokyo?",
    a: `Yes. The Nozomi takes about 2 hours 10 minutes each way, so an early train and an evening return leave about 6–8 hours in Kyoto. That is enough for Fushimi Inari, Kiyomizu-dera and Gion, but not for the whole city. Times read on ${CHECKED}.`,
  },
  {
    q: "How long is the train from Tokyo to Kyoto?",
    a: `About 2 hours 10 minutes by Nozomi. JR Central gives 130 minutes, and sample trains on Klook's rail page take 2 hours 8 to 9 minutes from Tokyo Station. Read ${CHECKED}.`,
  },
  {
    q: "How much is a day trip to Kyoto from Tokyo?",
    a: `The train is ${RETURN} return on smartEX in a reserved Ordinary seat on the Nozomi, in regular season for one adult. Add ¥500 for Kiyomizu-dera, plus local transport and food. Fushimi Inari is free. A guided tour in Kyoto is extra. Read ${CHECKED}.`,
  },
  {
    q: "Is the JR Pass worth it for a Kyoto day trip?",
    a: `No, not for the day trip alone. The return is ${RETURN}, against ¥50,000 for a 7-day pass bought online or ¥53,000 from an overseas agent. The pass does not cover the Nozomi without a ¥4,960 special ticket each way. It only pays if the rest of your week adds much more rail travel.`,
  },
  {
    q: "What can you see in Kyoto in one day?",
    a: "Pick two sides of the city. Fushimi Inari, Kiyomizu-dera and Gion is the easiest full day. Adding Arashiyama and Kinkaku-ji is realistic only on a coach tour, because the sights sit on different sides of Kyoto.",
  },
  {
    q: "What is the last train from Kyoto to Tokyo?",
    a: `Klook's rail page shows Nozomi 64 at 21:38 as the latest departure on its sample date of 11 November 2026. JR Central's own timetable is not reproduced here, so check your date before relying on it, and plan on an earlier train. Read ${CHECKED}.`,
  },
  {
    q: "Should you book the shinkansen in advance?",
    a: `Book both directions in advance. Reserved seats go on sale at 10:00 one month before travel. On ${nozomiPeriods}, every Nozomi seat is reserved, so a non-reserved ticket will not work on the Nozomi on those dates.`,
  },
  {
    q: "Is it better to stay overnight in Kyoto?",
    a: "If you want Arashiyama or Kinkaku-ji as well, yes. One night gives you an early start at Fushimi Inari and an evening in Gion with no train to catch. Our two-day Kyoto itinerary sets that out.",
  },
  {
    q: "Can you do a Kyoto day trip with children?",
    a: "Yes, but shorten the plan. Fushimi Inari is free and you can stop at the lower gates. Kiyomizu-dera is ¥200 for elementary and junior-high students. Dropping Gion or taking a later train keeps the day manageable.",
  },
  {
    q: "What if it rains on your Kyoto day trip?",
    a: "Fushimi Inari, Kiyomizu-dera and Gion are mostly outdoors, and the official sources checked give no rule that closes them for ordinary rain. Check your tour's weather terms: one Fushimi Inari walking tour on Klook says it runs in rain and may cancel in stormy weather.",
  },
  {
    q: "Do you need to bring luggage on a day trip?",
    a: `Leave large bags at your Tokyo hotel. On the shinkansen, a bag over 160 cm in total dimensions needs a reserved seat with a baggage area, and a ¥1,000 charge applies without one.`,
  },
];

const relatedLinks = [
  { href: "/guides/transport/tokyo-to-kyoto", title: "Tokyo to Kyoto (2026): Every Way to Travel Compared" },
  { href: "/guides/transport/kyoto-to-tokyo-shinkansen", title: "Kyoto to Tokyo Shinkansen: Stations, Seats and Tickets" },
  { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary: What to See and in What Order" },
  { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto" },
  { href: "/guides/attractions/gion-night-walking-tour", title: "Gion Night Walking Tour" },
  { href: "/guides/transport/jr-pass-guide", title: "JR Pass Guide (2026): Prices and Whether It Pays" },
];

const TITLE = "Kyoto Day Trip from Tokyo: Train, Cost & Plan (2026)";
const H1 = "Kyoto Day Trip from Tokyo";
const DESCRIPTION =
  "A Kyoto day trip from Tokyo takes about 2h 10m each way by Nozomi, ¥27,940 return on smartEX, with 6–8 hours in Kyoto. Model day, tours and JR Pass maths.";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function KyotoDayTripFromTokyoPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        {hreflangLinks(ROUTE)}
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
          dangerouslySetInnerHTML={{ __html: articleJsonLd({ route: ROUTE, headline: TITLE, updated }) }}
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
                { "@type": "ListItem", position: 4, name: H1, item: URL },
              ],
            }),
          }}
        />
      </Head>

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
          <span className={styles.breadCurrent}>{H1}</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>{H1}: Train, Cost &amp; a Plan That Fits</h1>
          <p className={styles.heroSubtitle}>
            How to build the day: which trains, which side of Kyoto, and whether a tour or a rail pass helps.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares, dated", "Model day", "Tour vs on your own"].map((t) => (
              <span key={t} className={styles.heroBadge}>
                <span className={styles.heroBadgeCheck}>✓</span> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.disclosure}>
          <p className={styles.disclosureText}>
            <strong>Affiliate disclosure:</strong> Some links on this page are affiliate links.
            We may earn a small commission if you book through them, at no extra cost to you.{" "}
            <Link href="/disclaimer" style={{ color: "var(--text)", fontWeight: 600 }}>Full disclaimer →</Link>
          </p>
        </div>

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Kyoto day trip from Tokyo</strong> is possible with an early start: the Nozomi takes
            about <strong>2 hours 10 minutes</strong> each way, a return in a reserved Ordinary seat on smartEX
            is <strong>{RETURN}</strong> in regular season ({ONE_WAY} each way), and you get about{" "}
            <strong>6–8 hours</strong> in Kyoto. That is enough for Fushimi Inari, Kiyomizu-dera and Gion, but
            not for Arashiyama and Kinkaku-ji as well. Fare and times read on {CHECKED}.
          </p>
        </section>

        <div className={styles.verdictBox}>
          <div className={styles.verdictHeader}>
            <span className={styles.verdictLabel}>Quick Answer</span>
          </div>
          <div className={styles.verdictBody}>
            <div className={styles.verdictGrid} style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Each way</p>
                <p className={styles.verdictStatValue}>About 2h 10m by Nozomi</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Return fare</p>
                <p className={styles.verdictStatValue}>{RETURN}, regular season</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Time in Kyoto</p>
                <p className={styles.verdictStatValue}>About 6–8 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>JR Pass?</p>
                <p className={styles.verdictStatValue}>Not for this trip alone</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book the train first, both ways. Then choose: plan the day yourself
              around two sides of the city, or join a guided day from Kyoto Station to see more.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Tokyo → Kyoto shinkansen →
              </KlookLink>
              <KlookLink href={kyotoCityFushimiArashiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Check the Kyoto day tour →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Yes or no</span>
          <h2 className={styles.sectionTitle}>Can You Do a Day Trip to Kyoto from Tokyo?</h2>
          <p className={styles.bodyText}>
            Yes, as long as you treat Kyoto as a one-day sample rather than the whole city. You spend about 4
            hours 20 minutes on the shinkansen, plus the time to reach Tokyo Station. It suits a trip with no
            Kyoto night. If you have a night to spare, our{" "}
            <Link href="/guides/attractions/kyoto-2-day-itinerary" style={LINK}>two-day Kyoto itinerary</Link>{" "}
            is the better version. For other ways to make the journey, see{" "}
            <Link href="/guides/transport/tokyo-to-kyoto" style={LINK}>Tokyo to Kyoto compared</Link>.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Train time</span>
          <h2 className={styles.sectionTitle}>How Long Is the Train from Tokyo to Kyoto?</h2>
          <p className={styles.bodyText}>
            About 2 hours 10 minutes by Nozomi. JR Central gives 130 minutes for the trip, and the sample
            trains on Klook&apos;s rail page take 2 hours 8 to 9 minutes from Tokyo Station. Klook&apos;s page
            counts 357 trains on its sample date of 11 November 2026, with the first leaving at 06:00.
          </p>
          <p className={styles.bodyText}>
            For the way back, JR Central&apos;s Kyoto departure board showed Nozomi 60 at 21:02 and Nozomi 62
            at 21:21, and Klook&apos;s page shows Nozomi 64 at 21:38 as the latest departure, arriving 23:38.
            Treat these as a guide: check JR Central&apos;s own timetable for your date, as evening times can
            change by date.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Cost</span>
          <h2 className={styles.sectionTitle}>How Much Is a Day Trip to Kyoto from Tokyo?</h2>
          <p className={styles.bodyText}>
            The train is the main cost: {RETURN} return on smartEX, in a reserved Ordinary seat on the Nozomi.
            Fushimi Inari is free and Kiyomizu-dera is ¥500, so sights add little.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Item", "Cost", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td className={styles.tdPrice}>{row.cost}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fare from JR Central&apos;s smartEX price table, checked on {CHECKED}. Prices can change, so
            confirm yours at checkout. JR Central and JR West announced
            on 16 October 2026 that reserved Nozomi prices will rise for purchases from 1 July 2027.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Model day</span>
          <h2 className={styles.sectionTitle}>What Does a Kyoto Day Trip from Tokyo Look Like?</h2>
          <p className={styles.bodyText}>
            Go to the farthest sight first and work back toward the station. This plan starts on the first
            Nozomi, which gives the longest possible day. Each hour you leave later comes off the end of the
            plan.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Time", "Where", "Getting there and time to allow"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planRows.map((row) => (
                    <tr key={row.time}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.time}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.stop}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Train times from Klook&apos;s rail page for 11 November 2026, read {CHECKED}. Other times are our
            planning allowance, not operator figures. Journey times and Kiyomizu-dera details are from Kyoto
            City&apos;s travel guide and the temple&apos;s site, read {KYOTO_READ}.
          </p>
        </section>

        <KlookTripPrep
          label="Book for this day"
          heading="What Should You Book for a Kyoto Day Trip?"
          intro="The train comes first, because your return time sets the length of the day. Everything else can follow it."
          items={kyotoDayTripPrep}
        />

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or not</span>
          <h2 className={styles.sectionTitle}>Should You Take a Tour or Go on Your Own?</h2>
          <p className={styles.bodyText}>
            Go on your own for two sides of the city at your own pace. Join a tour from Kyoto Station to see
            more without planning buses. No Klook tour found for this guide includes the train from Tokyo, so either
            way you book the shinkansen yourself and need a train that reaches Kyoto before the meeting time.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "On your own", "Klook guided day"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.what}>
                      <td className={styles.tdProvider}>{row.what}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.self}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.tour}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Which tour</span>
          <h2 className={styles.sectionTitle}>Which Kyoto Tour Works from Tokyo?</h2>
          <p className={styles.bodyText}>
            Check the meeting time before you book, then pick a train that arrives with time to spare. An
            8-hour tour plus the return train takes up the whole day, so also check where it finishes. Tour
            details read on Klook on {CHECKED}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Length", "Starts", "Best for"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.tour.url}>
                      <td className={styles.tdProvider}>
                        <KlookLink href={row.tour.url} target="_blank" rel="sponsored noopener" style={LINK}>
                          {row.tour.title}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.88rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.start}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <KlookLink href={kyotoCityFushimiArashiyamaTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Kyoto day tour on Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>JR Pass</span>
          <h2 className={styles.sectionTitle}>Is the JR Pass Worth It for a Kyoto Day Trip?</h2>
          <p className={styles.bodyText}>
            No, not on its own. The return is {RETURN}, while a 7-day Ordinary pass is ¥50,000 online or
            ¥53,000 from an overseas agent, so you would need about ¥22,000 or more of other JR travel in the
            same week. The pass also needs a ¥4,960 special ticket each way on the Nozomi, unless you take the
            slower Hikari. Pass figures carried from japanrailpass.net, read {KYOTO_READ}. Our{" "}
            <Link href="/guides/transport/jr-pass-guide" style={LINK}>JR Pass guide</Link> works through
            longer routes.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={jrPassWholeJapan.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the JR Pass on Klook →
            </KlookLink>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>One day</span>
          <h2 className={styles.sectionTitle}>What Can You See in Kyoto in One Day?</h2>
          <p className={styles.bodyText}>
            Two sides of the city on your own. Kyoto&apos;s best-known sights sit to the south, east, west and
            north, so the choice is which to leave out. Times below are from Kyoto Station, read {KYOTO_READ}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Plan", "In one day?", "Why"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {seeRows.map((row) => (
                    <tr key={row.plan}>
                      <td className={styles.tdProvider}>{row.plan}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.verdict}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            For more choices, see <Link href="/guides/attractions/things-to-do-kyoto" style={LINK}>things to do
            in Kyoto</Link>. An evening return also leaves room for a{" "}
            <Link href="/guides/attractions/gion-night-walking-tour" style={LINK}>Gion walking tour</Link>.
          </p>
        </section>

        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book the Shinkansen?</h2>
          <p className={styles.bodyText}>
            Reserved seats go on sale at 10:00 one month before travel, so book as soon as your date is fixed.
            It matters most on {nozomiPeriods}: every Nozomi seat is reserved on those dates, so a non-reserved
            ticket will not get you on a Nozomi. Periods read on JR Central&apos;s site, {CHECKED}.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Tokyo → Kyoto seats on Klook →
            </KlookLink>
          </div>
        </section>

        <EsimCtaBottom />

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
          heading="Kyoto Tours That Start in Kyoto"
          intro="All of these begin in Kyoto, so book your train first and check the meeting time against it."
          tours={[kyotoCityFushimiArashiyamaTour, kyotoHighlightBusTour, kyotoEasternWalkingTour]}
        />

        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {relatedLinks.map((item) => (
              <Link key={item.href} href={item.href} className={styles.relatedCard}>
                <div className={styles.relatedIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="3" width="16" height="14" rx="3" />
                    <line x1="4" y1="10" x2="20" y2="10" />
                    <path d="M7 21l2-4M17 21l-2-4" />
                  </svg>
                </div>
                <div className={styles.relatedMeta}>
                  <p className={styles.relatedTitle}>{item.title}</p>
                  <span className={styles.relatedArrow}>Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Book the return first</h2>
            <p className={styles.ctaBannerDesc}>
              Your evening train sets the length of the day. Fix both directions, then fill the hours in Kyoto.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={shinkansenTokyoKyoto.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Tokyo → Kyoto Shinkansen →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
