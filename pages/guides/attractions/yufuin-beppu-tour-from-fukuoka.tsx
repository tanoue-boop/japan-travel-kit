import Head from "next/head";
import Link from "next/link";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookLink from "../../../components/KlookLink";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import styles from "../../../styles/BestEsimJapan.module.css";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  fukuokaPrivateCharter,
  jrKyushuRailPass,
  yufuinBeppuBungoMoriTour,
  yufuinBeppuHitaTour,
  yufuinBeppuNoMoriTour,
  yufuinBeppuRopewayTour,
  yufuinBeppuTripPrep,
  yufuinHyotanOnsenTour,
  yufuinKinrinNyoirinjiTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * Yufuin and Beppu as a day out of Fukuoka. Added 6 Nov 2026.
 *
 * Read on 6 November 2026:
 *
 *   beppu-jigoku.com              common ticket ¥2,400 / ¥1,200 from 1 Feb 2025, valid
 *                                 two days, 8:00–17:00 daily; free foot baths at four
 *                                 hells; Oni-ishi no Yu ¥620; about 3 km between the
 *                                 two groups; per-hell facts
 *   jrkyushu.co.jp                Yufuin no Mori timetable of 14 Mar 2026, all reserved,
 *                                 3 trains each way on calendar days; Sonic shortest
 *                                 2 h 1 min, 31 trains a day, online from ¥2,950
 *   nishitetsu.jp, kamenoibus.com Tenjin–Yufuin bus about 2 h 20–25 min
 *   city.yufu.oita.jp             Yufuin Station to Kinrin Lake about 15 minutes on foot
 *   visit-oita.jp, japan.travel   Kinrin Lake mist, Yunotsubo about 1 km, Oita–Yufuin
 *                                 about an hour by JR
 *
 * Gaps left open on purpose: the bus operators' fares disagree (¥2,930 and ¥3,250),
 * so the page prints none. Exact meeting points, child rates and most cancellation
 * terms were not readable, so the page says so. The Beppu–Yufuin bus timetable is an
 * image PDF and gives no time here. Tour rows come from the www.klook.com search
 * index because Klook answers automated reads with HTTP 403. No Klook price appears.
 */

/*
 * Re-read on 17 November 2026 (task-jtk-20261117-C01, "yufuin beppu day trip from fukuoka"):
 *   jrkyushu.co.jp/trains/yufuinnomori/   timetable of 14 Mar 2026: Hakata 9:17→Yufuin 11:31,
 *     10:11→12:32 (→Oita 13:20, Beppu 13:31), 14:38→16:50; back Yufuin 12:01→Hakata 14:19,
 *     (Beppu 14:36) 15:56→18:10, 17:17→19:27. 通常のきっぷ 博多〜由布院 6,130円 (大人, 普通運賃＋
 *     指定席特急料金, the charge varies by travel date); 九州ネットきっぷ 博多〜由布院 5,600円.
 *     Matches the fare-revision guidebook reading of 15 Nov (¥5,600 + ¥530 おトク額 = ¥6,130);
 *     the guidebook PDF itself reset the connection on 17 Nov.
 *   www.klook.com search index: the Fukuoka Yufuin/Beppu day tours listed at 10 hr and
 *     10 hr 30 min. No Klook price is used.
 */
const OWN = checkedLabel("2026-11-06");
const LAST_CHECKED = "2026-11-17";
const TODAY = checkedLabel(LAST_CHECKED);
const YUFUIN_NO_MORI_FARE = "¥6,130";
const YUFUIN_NET_FARE = "¥5,600";
const JRK_TRAIN_URL = "https://www.jrkyushu.co.jp/trains/yufuinnomori/";

const tourRows = [
  {
    tour: yufuinBeppuNoMoriTour,
    name: "Yufuin no Mori, Nyoirin-ji, Dazaifu & the hells",
    time: "10 hours 30 minutes",
    beppu: "Route with Umi Jigoku and the train, or route with Umi and Kamado Jigoku tickets",
    extras: "Yufuin town, Nyoirin-ji, Dazaifu. Chinese and English guide",
    note: "Meals and insurance excluded. One itinerary starts at 08:30",
  },
  {
    tour: yufuinBeppuRopewayTour,
    name: "Dazaifu, Yufuin, Beppu Ropeway & Kamado Jigoku",
    time: "10 hours",
    beppu: "Kamado Jigoku, Beppu Ropeway",
    extras: "Yufuin town, Dazaifu. Onsen egg and lemon soda",
    note: "Seats by order of arrival. Umi Jigoku replaces the ropeway during maintenance, at your own cost",
  },
  {
    tour: yufuinKinrinNyoirinjiTour,
    name: "Nyoirin-ji, Mt. Yufu, Yufuin, Kinrin Lake & the hells",
    time: "10 hours",
    beppu: "Umi Jigoku and Kamado Jigoku",
    extras: "Yufuin, Kinrin Lake named, Mt. Yufu view, Nyoirin-ji. Chinese, English and Cantonese",
    note: "Minimum 4 people. Traffic controls can reduce Mt. Yufu to a window view",
  },
  {
    tour: yufuinHyotanOnsenTour,
    name: "Hyotan Onsen, Yufuin, Dazaifu & Umi Jigoku",
    time: "About 10 hours",
    beppu: "Umi Jigoku, Hyotan Onsen",
    extras: "Yufuin, Dazaifu",
    note: "Seats first come, first served. Read what the onsen stop covers",
  },
  {
    tour: yufuinBeppuHitaTour,
    name: "Yufuin, Beppu & Hita old town",
    time: "10 hours",
    beppu: "Beppu; read the listing for which hell",
    extras: "Yufuin, Hita old town",
    note: "Free exploring after arrival at each stop",
  },
  {
    tour: yufuinBeppuBungoMoriTour,
    name: "Dazaifu, Bungo-Mori, Beppu & Yufuin bus tour",
    time: "10 hours 30 minutes",
    beppu: "Beppu; read the listing for which hell",
    extras: "Dazaifu, Bungo-Mori, Kinrin Lake. Japanese and English guide",
    note: "No toilet on the bus. Below the minimum, cancelled 3 days ahead with a full refund",
  },
];

const routeRows = [
  {
    route: "Answer: both towns in one day → coach tour; Yufuin only or a night there → Yufuin no Mori",
    time: "Tour 10 to 10.5 hours door to door; train 2 hours 12 to 2 hours 21 minutes to Yufuin",
    detail: `Train ${YUFUIN_NO_MORI_FARE} one way (adult, fare + reserved-seat express charge), so about ¥12,260 return before the Beppu leg`,
    source: "Klook listings; jrkyushu.co.jp",
    checked: TODAY,
  },
  {
    route: "Coach tour, Fukuoka → Yufuin and Beppu → Fukuoka",
    time: "10 to 10.5 hours in total",
    detail: "One booking, no changes. Price per date on the listing",
    source: "Klook listings",
    checked: TODAY,
  },
  {
    route: "Limited express Yufuin no Mori, Hakata → Yufuin",
    time: "2 hours 12 to 2 hours 21 minutes (back: 2 hours 10 to 2 hours 18 minutes)",
    detail: `${YUFUIN_NO_MORI_FARE} adult one way; ${YUFUIN_NET_FARE} as an online Kyushu Net ticket. The express charge varies by travel date. All seats reserved. 3 trains each way (Hakata 9:17, 10:11, 14:38), on the days of JR Kyushu's calendar`,
    source: "jrkyushu.co.jp",
    checked: TODAY,
  },
  {
    route: "Yufuin no Mori 3, Hakata → Beppu",
    time: "3 hours 20 minutes (Hakata 10:11, Yufuin 12:32, Beppu 13:31)",
    detail: "The one train that runs on to Oita and Beppu; No. 4 comes back from Beppu at 14:36",
    source: "jrkyushu.co.jp",
    checked: TODAY,
  },
  {
    route: "Limited express Sonic, Hakata ↔ Oita and Beppu line",
    time: "Shortest 2 hours 1 minute",
    detail: "31 trains a day each way. Online fares from ¥2,950, on the 3-day advance ticket",
    source: "jrkyushu.co.jp",
    checked: OWN,
  },
  {
    route: "Oita → Yufuin, JR Kyudai Line",
    time: "About an hour",
    detail: "The JR link if you loop back through Oita",
    source: "japan.travel",
    checked: OWN,
  },
  {
    route: "Highway bus, Tenjin → Yufuin Station",
    time: "About 2 hours 20 to 2 hours 25 minutes",
    detail: "Fare and seats on the operator's page",
    source: "nishitetsu.jp, kamenoibus.com",
    checked: OWN,
  },
  {
    route: "Beppu Station → hells at Kannawa, Kamenoi bus",
    time: "About 20 minutes",
    detail: "Buses 2, 5, 24 and 41. Chinoike is a further bus, about 40 minutes and ¥390 from Beppu Station",
    source: "beppu-jigoku.com",
    checked: OWN,
  },
];

const hellRows = [
  {
    hell: "Umi Jigoku (Sea Hell)",
    why: "The largest of the hells: a cobalt blue pond at about 98°C, with a free foot bath",
    area: "Kannawa group",
    pick: "The default. Giant water lilies flower here from early May to early November",
  },
  {
    hell: "Chinoike Jigoku (Blood Pond Hell)",
    why: "A red mud pond of about 1,300 m², about 78°C. Called Japan's oldest natural hell",
    area: "About 3 km from the Kannawa group",
    pick: "The most striking colour, but the listed tours name Umi and Kamado instead",
  },
  {
    hell: "Tatsumaki Jigoku (Dragon Whirl Hell)",
    why: "A geyser with force for about 30 m, capped by a roof",
    area: "Beside Chinoike",
    pick: "A sign lamp turns red when it is close to erupting",
  },
  {
    hell: "Kamado Jigoku (Cooking Pot Hell)",
    why: "Three foot baths, including a sand-steam one",
    area: "Kannawa group",
    pick: "The most to do for a short stop",
  },
];

/** The first five are the search questions and go into FAQPage; the rest stay on the page only. */
const faqItems = [
  {
    q: "Can you do a Yufuin and Beppu day trip from Fukuoka?",
    a: `Yes. That is what the coach tours sell, in 10 to 10.5 hours with Beppu's hells and Yufuin in one booking. By train it is possible but tight: 2 hours 12 to 2 hours 21 minutes to Yufuin on the Yufuin no Mori, about 2 hours back from Beppu by Sonic, and a cross-country leg between them. The hells close at 17:00, so plan around that. Train times checked ${TODAY}.`,
  },
  {
    q: "How much is the Yufuin no Mori from Fukuoka to Yufuin?",
    a: `${YUFUIN_NO_MORI_FARE} one way for an adult from Hakata to Yufuin, fare plus reserved-seat express charge, on JR Kyushu's own Yufuin no Mori page (the charge varies by travel date). The online Kyushu Net ticket is ${YUFUIN_NET_FARE}. Every seat is reserved, and it runs three times each way on JR Kyushu's calendar days. Checked ${TODAY}.`,
  },
  {
    q: "Is a Yufuin and Beppu tour better than the train?",
    a: "For one day that covers both towns, yes. The tour removes the cross-country leg and gets you to the hells before they close. The train is better if you are staying overnight in Yufuin or Beppu, or if riding the Yufuin no Mori is the point of the trip. Note that it is all reserved and runs only on calendar days.",
  },
  {
    q: "How long is a Yufuin and Beppu day tour from Fukuoka, and how much is it?",
    a: `10 to 10.5 hours, as the Klook listings state them (checked ${TODAY}), from about US$44 per person on the Yufuin no Mori and Beppu Ropeway tours (Klook, 27 Nov 2026; prices change by date). One listing notes that Japanese law caps vehicle use at 10 hours a day, so guides may reorder or drop a stop for traffic or weather. Expect short stops rather than a slow day.`,
  },
  {
    q: "How far is Yufuin from Fukuoka?",
    a: `2 hours 12 to 2 hours 21 minutes from Hakata on the Yufuin no Mori (timetable of 14 March 2026, checked ${TODAY}), and about 2 hours 20 to 2 hours 25 minutes by highway bus from Tenjin to Yufuin Station (read ${OWN}). Beppu is 3 hours 20 minutes from Hakata on Yufuin no Mori 3, the one train that runs on past Yufuin.`,
  },
  {
    q: "Which Beppu hell is the best?",
    a: `Umi Jigoku for most people. It is the largest, a cobalt blue pond at about 98°C with a free foot bath. Chinoike Jigoku is the red pond, but it is about 3 km from the main group and the tours listed here do not name it. All seven are on one ¥2,400 common ticket, valid for two days, and open 8:00 to 17:00 every day. Read ${OWN}.`,
  },
  {
    q: "Do Yufuin tours include an onsen?",
    a: "Mostly no. The standard tours include a foot bath at most, and the Beppu hell foot baths are free to anyone with admission. The exception here is the Hyotan Onsen tour, which puts an onsen facility on the route. Read what your package covers, and note that Klook's Hyotan Onsen page says to bring a towel or rent one. If a real soak is the point, stay overnight.",
  },
  {
    q: "How much free time do you get in Yufuin?",
    a: "Listings do not state it, so treat this as a rough guide. One reviewer reported about 2 hours of free time in Yufuin. The walk from Yufuin Station to Kinrin Lake is about 15 minutes, so 2 hours covers the lake and the Yunotsubo street with lunch.",
  },
  {
    q: "What is the best season for this tour?",
    a: "Autumn and winter suit Kinrin Lake, because the mist forms on early mornings. A day tour usually reaches Yufuin later than that, so do not book for the mist alone. Umi Jigoku's giant water lilies flower from early May to early November. In winter, listings warn of cancellation in heavy snow.",
  },
  {
    q: "Can you do this day trip with children?",
    a: "Yes, but check the child rule and age bands on the listing for your date first. The hells common ticket is ¥1,200 for elementary and junior high pupils. The real issue is 10 hours or more, mostly on a coach, and one tour's bus has no toilet. A private car solves that if your group can share the cost.",
  },
  {
    q: "What is the cancellation policy on these tours?",
    a: `It varies by listing, so check the terms for your date. Klook's destination page shows free cancellation on the Dazaifu, Yufuin and Beppu Ropeway tour. The Bungo-Mori bus tour cancels with a full refund if it misses its minimum 3 days ahead. Related Fukuoka listings confirm typhoon or heavy snow cancellations by 18:00 the day before. On the Yufuin no Mori tour, late arrivals, changed meeting points and leaving early are not refunded. Read as of ${OWN}.`,
  },
  {
    q: "Where do these tours leave from?",
    a: "All of them leave from Fukuoka, and the exact point depends on the tour and package. A Hakata or Tenjin meeting point is not shown for each listing, and one itinerary starts from a Fukuoka hotel at 08:30. Check the meeting point on the listing before you pay, especially if you are also choosing a hotel.",
  },
];

// 27 Nov 2026 (C02): time and price in the title. Tour from-price = www.klook.com search-index
// snapshot of listings 95611 and 129252 (US$44.39 each) on PRICE_ISO; Klook answers automated
// reads with 403 and prices change by date. Train fare re-read on jrkyushu.co.jp the same day.
const PRICE_ISO = "2026-11-27";
const TITLE = "Yufuin & Beppu Day Tour from Fukuoka: Time & Price";
const H1_LINE = "Yufuin & Beppu Day Tour from Fukuoka (2026):";
const DESCRIPTION =
  "Yufuin & Beppu day tour from Fukuoka: 10–10.5 hours by coach from about US$44 on Klook. By train, Yufuin no Mori takes 2h12–2h21 and costs ¥6,130 one way.";

const ROUTE = "/guides/attractions/yufuin-beppu-tour-from-fukuoka";
const URL = `https://www.japan-travel-kit.com${ROUTE}`;

const relatedGuides = [
  { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass 2026: Prices, New Oct 1 Pass & Worth It?" },
  { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2 Day Itinerary (2026): Dazaifu, Yanagawa or Yufuin" },
  { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5 Day Itinerary (2026): Fukuoka, Beppu, Kumamoto and Takachiho" },
  { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Fukuoka Tickets 2026: Price, Hours & Booking" },
  { href: "/guides/attractions/japan-14-day-itinerary", title: "Japan 14-Day Itinerary (2026): 2 Weeks in Japan, Day by Day" },
  { href: "/guides/attractions/japan-10-day-itinerary", title: "Japan Itinerary 10 Days: Tokyo, Kyoto, Osaka & Hakone (2026)" },
  { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "Hiroshima and Miyajima Day Trip (2026): Is One Day Enough?" },
  { href: "/guides/transport/jr-pass-guide", title: "JR Pass Cost 2026: New Prices & Is It Worth It?" },
];

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

export default function YufuinBeppuTourFromFukuokaPage({ updated }: { updated: PageUpdated }) {
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
              mainEntity: faqItems.slice(0, 5).map((item) => ({
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
                { "@type": "ListItem", position: 4, name: "Yufuin and Beppu Tour from Fukuoka", item: URL },
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
          <span className={styles.breadCurrent}>Yufuin and Beppu Tour from Fukuoka</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            {H1_LINE} <br />Time, Price &amp; Tour vs Train
          </h1>
          <p className={styles.heroSubtitle}>
            Two hot spring towns in one long day from Fukuoka. The choice is which stops your coach makes, and
            whether you get a bath at all.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official fares & times, dated", "Six tours compared", "Tour or train"].map((t) => (
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

        {/* Lead paragraph: the whole answer, in the body rather than the hero. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            A <strong>Yufuin Beppu day trip from Fukuoka</strong> takes <strong>10 to 10.5 hours</strong> on a
            shared coach tour that covers Beppu&apos;s hot spring &ldquo;hells&rdquo; and free time in Yufuin in one
            booking, from <strong>about US$44</strong> per person on Klook (checked {PRICE_ISO}; prices change by
            date). By train, the limited express <strong>Yufuin no Mori</strong> runs Hakata to Yufuin in{" "}
            <strong>2 hours 12 to 2 hours 21 minutes</strong> for <strong>{YUFUIN_NO_MORI_FARE}</strong> one way
            (adult, JR Kyushu, checked {LAST_CHECKED}), and only one of its three daily trains goes on to Beppu. For
            both towns in one day, book the tour; take the train for Yufuin alone or a night there.
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
                <p className={styles.verdictStatLabel}>Tour day</p>
                <p className={styles.verdictStatValue}>10 to 10.5 hours</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hakata to Yufuin by train</p>
                <p className={styles.verdictStatValue}>2h12 to 2h21, {YUFUIN_NO_MORI_FARE}</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Beppu hells</p>
                <p className={styles.verdictStatValue}>8:00–17:00, ¥2,400 for all seven</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Bath included?</p>
                <p className={styles.verdictStatValue}>Usually a foot bath only</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> start with the Yufuin no Mori and hells tour. Choose the Hyotan Onsen tour
              if you want an onsen on the route, and the train if you are staying the night.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={yufuinBeppuNoMoriTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Yufuin &amp; Beppu Hells Tour →
              </KlookLink>
              <KlookLink href={yufuinHyotanOnsenTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Tour With Hyotan Onsen →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* One day */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The day</span>
          <h2 className={styles.sectionTitle}>Can You Do Beppu and Yufuin in One Day From Fukuoka?</h2>
          <p className={styles.bodyText}>
            Yes, by coach. Every tour below covers both in 10 to 10.5 hours. That length is close to the limit:
            one listing says vehicle use is capped at 10 hours under Japanese law, and guides may change the
            order or drop a stop for traffic or weather. Expect short stops rather than a slow day.
          </p>
          <p className={styles.bodyText}>
            If Fukuoka is one stop of a longer trip, this fits as a spare day. See our{" "}
            <Link href="/guides/attractions/teamlab-fukuoka-tickets">teamLab Forest Fukuoka guide</Link> for an
            evening in the city, our{" "}
            <Link href="/guides/attractions/fukuoka-2-day-itinerary">Fukuoka 2 day itinerary</Link> for this day
            against Dazaifu and the Yanagawa canals, and our{" "}
            <Link href="/guides/attractions/japan-14-day-itinerary">Japan 14 day itinerary</Link> for how the
            route fits together.
          </p>
        </section>

        {/* Tours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare tours</span>
          <h2 className={styles.sectionTitle}>Which Yufuin and Beppu Tour Should You Book?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Pick the Yufuin no Mori tour if you want the train as well. Pick the Kinrin Lake tour if the lake is
            the priority, the Hyotan Onsen tour for a bath, and the Hita tour for an old town rather than
            Dazaifu.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Tour", "Length", "In Beppu", "Other stops", "Good to know", "Checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tourRows.map((row) => (
                    <tr key={row.name}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>
                        <KlookLink href={row.tour.url} target="_blank" rel="sponsored nofollow noopener" style={{ color: "var(--accent)", fontWeight: 600 }}>
                          {row.name}
                        </KlookLink>
                      </td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.beppu}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.extras}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                      <td style={{ fontSize: "0.82rem" }}>{OWN}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            All six leave from Fukuoka. These rows come from the listings as they appear in search results,
            so not every field is shown. Open the
            listing for the current price, the exact meeting point and what your package includes. The ropeway
            maintenance dates shown there were 22 June to 17 July 2026, so check for later notices.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yufuinBeppuNoMoriTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Yufuin no Mori &amp; hells tour →
            </KlookLink>
            <KlookLink href={yufuinKinrinNyoirinjiTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tour with Kinrin Lake →
            </KlookLink>
            <KlookLink href={yufuinBeppuRopewayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tour with the ropeway →
            </KlookLink>
          </div>
        </section>

        {/* Tour or train */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Tour or train</span>
          <h2 className={styles.sectionTitle}>Is a Yufuin Tour Better Than the Train?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            For both towns in one day, yes. For Yufuin alone, or with a night there, take the train. The Yufuin no
            Mori is 2 hours 12 to 2 hours 21 minutes and {YUFUIN_NO_MORI_FARE} one way to Yufuin, and Beppu is about
            2 hours back by Sonic, so you would spend over four hours on express trains alone, before the leg
            between the towns.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Time", "Good to know", "Source & date checked"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routeRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.source}, {row.checked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {PRICE_ISO} for the Hakata–Yufuin {YUFUIN_NO_MORI_FARE} adult fare ({YUFUIN_NET_FARE} Kyushu
            Net ticket) on the{" "}
            <a href={JRK_TRAIN_URL} target="_blank" rel="noopener">JR Kyushu Yufuin no Mori page</a>, and for the Klook
            from-price of about US$44 on the Yufuin no Mori and Beppu Ropeway tours; timetable of 14 March 2026 read{" "}
            {LAST_CHECKED}. Tour lengths as the Klook listings state them; open a listing for the price on your date.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            <strong>Going by train?</strong> Check the Yufuin no Mori calendar first, because it does not run
            every day and every seat is reserved. Some trains continue past Yufuin toward Beppu. For a stay of a
            few days, Klook&apos;s guide lists Hakata, Yufuin and Beppu inside the North Kyushu pass. On a pass, each
            Yufuin no Mori seat still has to be reserved —{" "}
            <Link href="/guides/transport/jr-kyushu-rail-pass#seats" style={{ color: "var(--red)", fontWeight: 600 }}>
              does the JR Kyushu Pass cover the Yufuin no Mori
            </Link>{" "}
            explains the six free reservations on the Northern pass.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={jrKyushuRailPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              JR Kyushu Rail Pass →
            </KlookLink>
            <KlookLink href={fukuokaPrivateCharter.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Private car from Fukuoka →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The Yufuin no Mori times are on JR Kyushu&apos;s timetable of 14 March 2026. The Sonic figure is the
            shortest on its Oita and Beppu page. The bus operators show different fares, so check yours on the operator&apos;s site.
            Whether the pass beats two Yufuin no Mori tickets is worked out in our{" "}
            <Link href="/guides/transport/jr-kyushu-rail-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              JR Kyushu Rail Pass guide
            </Link>
            .
          </p>
        </section>

        <BookingEsimCard lead="Planning Yufuin and Beppu? Get mobile data before you land." />

        {/* Hells */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Beppu</span>
          <h2 className={styles.sectionTitle}>Which Beppu Hell Is the Best?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Umi Jigoku, for most people on a short stop. Seven hells share one common ticket at{" "}
            <strong>¥2,400</strong> for an adult and <strong>¥1,200</strong> for elementary and junior high
            pupils, valid for two days, and they open <strong>8:00 to 17:00</strong> every day. Tours usually
            stop at one or two, so check which ones before you book.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Hell", "What it is", "Where", "Why choose it"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hellRows.map((row) => (
                    <tr key={row.hell}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.hell}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.why}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.area}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.pick}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            All figures from beppu-jigoku.com, read {OWN}. The common ticket price dates from 1 February 2025.
            The operators publish no individual prices on that page. A tour&apos;s tickets may be
            included or extra, so read your listing.
          </p>
        </section>

        {/* Onsen */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Onsen</span>
          <h2 className={styles.sectionTitle}>Do Yufuin Tours Include an Onsen?</h2>
          <p className={styles.bodyText}>
            Mostly no. Standard tours stop at the hells, which are for looking at, and the bath you get is a{" "}
            <strong>foot bath</strong>. Four hells have one, free with admission: Umi, Chinoike, Oni-ishi Bozu
            and Kamado. A full bath needs either the Hyotan Onsen tour, which puts an onsen on the route, or a
            night in town. Oni-ishi no Yu beside the hells is a separately priced bath at ¥620 for an adult, but
            a coach stop may not leave time for it.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yufuinHyotanOnsenTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Hyotan Onsen tour →
            </KlookLink>
          </div>
        </section>

        {/* Yufuin */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Yufuin</span>
          <h2 className={styles.sectionTitle}>What Can You See in Yufuin on a Tour?</h2>
          <p className={styles.bodyText}>
            Yunotsubo Kaido and Kinrin Lake, if you keep moving. The Yunotsubo shopping street runs about 1 km
            between the station and the lake, with about 70 shops on the Japan National Tourism Organization&apos;s
            figures. Yufu City puts the walk from the station to the lake at about 15 minutes. Listings do not
            state the time in Yufuin; one reviewer reported about 2 hours.
          </p>
        </section>

        {/* Season */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>When to go</span>
          <h2 className={styles.sectionTitle}>What Is the Best Season for a Yufuin and Beppu Tour?</h2>
          <p className={styles.bodyText}>
            Autumn is the pick, for colour at Kinrin Lake in November. The lake&apos;s famous mist forms on early
            mornings from autumn to winter, which a day tour from Fukuoka will usually miss, so do not book for
            it alone. Umi Jigoku&apos;s giant water lilies flower from early May to early November. In typhoon
            season and heavy snow, related listings confirm any cancellation by 18:00 the day before.
          </p>
        </section>

        {/* Children */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Families</span>
          <h2 className={styles.sectionTitle}>Can You Do This Tour With Children?</h2>
          <p className={styles.bodyText}>
            Yes, if they cope with 10 hours or more, mostly on a coach. Check the age bands on the
            listing for your date before you pay. The hells ticket is ¥1,200 for elementary and junior high
            pupils. Seats on several tours go by order of arrival, and the Bungo-Mori tour&apos;s bus has no
            toilet. The private car is the easier option for a family if the total cost works for you.
          </p>
        </section>

        {/* Cancellation */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>When Should You Book, and Can You Cancel?</h2>
          <p className={styles.bodyText}>
            Book once your Fukuoka dates are fixed. There is no fixed sell-out date, because availability is per
            tour and per day. These are shared tours that can miss a minimum, so a date may be cancelled
            days ahead. Leave room in your plans for that.
          </p>
          <p className={styles.bodyText}>
            Terms differ by listing. Klook&apos;s destination page shows free cancellation on the ropeway tour.
            The Bungo-Mori tour cancels with a full refund if it misses its minimum 3 days ahead. On the Yufuin
            no Mori tour, there is no refund for arriving late or leaving early, the coach does not wait, and you
            cannot join midway. Policies differ by listing, so read yours before you pay. Terms read {OWN}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={yufuinBeppuNoMoriTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Check your date on Klook →
            </KlookLink>
            <KlookLink href={yufuinBeppuHitaTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Tour with Hita old town →
            </KlookLink>
          </div>
        </section>

        <KlookTripPrep
          label="Before you go"
          heading="What Should You Book Around a Fukuoka Day Tour?"
          intro="A day of 10 hours or more starts and ends at your hotel, so the base matters as much as the tour. Open a listing for the price on your dates."
          items={yufuinBeppuTripPrep}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Going on your own by expressway bus? See the <Link href="/guides/transport/sunq-pass" style={{ color: "var(--red)", fontWeight: 600 }}>SUNQ Pass</Link> for unlimited buses in northern Kyushu.
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For a day trip by train instead, the <Link href="/guides/transport/dazaifu-yanagawa-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Dazaifu & Yanagawa pass</Link> covers Nishitetsu trains and the Yanagawa river boat (¥3,620 digital).
          </p>
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
          heading="Yufuin and Beppu Tours on Klook"
          intro="The four listings most readers will choose between. Open one for the current price, the meeting point and the package options on your date."
          tours={[
            yufuinBeppuNoMoriTour,
            yufuinKinrinNyoirinjiTour,
            yufuinHyotanOnsenTour,
            yufuinBeppuRopewayTour,
          ]}
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
            <h2 className={styles.ctaBannerTitle}>Two hot spring towns, one coach</h2>
            <p className={styles.ctaBannerDesc}>
              A tour covers Beppu and Yufuin in 10 to 10.5 hours from Fukuoka, with no connections to plan.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={yufuinBeppuNoMoriTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Hells Tour →
              </KlookLink>
              <KlookLink href={yufuinKinrinNyoirinjiTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Kinrin Lake Tour →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
