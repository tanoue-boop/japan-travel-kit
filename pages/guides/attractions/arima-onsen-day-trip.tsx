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
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";
import HotelStayBlock from "../../../components/HotelStayBlock";

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

// Re-checked 13 Nov 2026 (task-jtk-20261113-C01):
//  - arimaspa-kingin.jp/kin-01.htm and gin-01.htm: Kin no Yu adult ¥800 (¥650 on
//    weekdays, peak periods excepted), Gin no Yu ¥700 (¥550 on weekdays), 2-Spa
//    Ticket ¥1,200; hours and closed Tuesdays unchanged.
//  - nishinihonjrbus.co.jp/trans/lp/arima/: "当面の間、大阪エリア発着の便は全便運休",
//    i.e. every Arima Express run to and from Osaka Station, JR Namba and
//    Shin-Osaka is suspended for now; the Kobe runs (Sannomiya/Shin-Kobe, ¥780,
//    ¥700 bought 7+ days ahead, 08:50 → 09:20) run daily.
//  - feel-kobe.jp/en/stories/arimaonsen (VISIT KOBE, Kobe Tourism Bureau):
//    Osaka (Umeda) by Hankyu Bus about 60 min; central Kobe by JR Bus about 30 min.
//  - taikounoyu.com/howto: Taiko no Yu admissions and hours unchanged.
// Re-checked 21 Nov 2026 (task-jtk-20261121-R07):
//  - nishinihonjrbus.co.jp/trans/lp/arima/: Osaka-area runs still all suspended;
//    Sannomiya/Shin-Kobe ¥780 (¥700 7+ days ahead), 08:50 Sannomiya → 09:20.
//  - arimaspa-kingin.jp kin-01 / gin-01: prices, hours and closed Tuesdays as above.
//  - taikounoyu.com/howto: ¥2,750 / ¥2,970, 10:00–22:00 (last entry 21:00), next
//    closed day 6 Jan 2027, tattoos refused.
//  - hankyu.co.jp/en/ticket/otoku/014066.html: Arima Onsen Taiko-no-yu coupon
//    (Hankyu edition 2026) ¥3,250, sold 1 Apr 2026 – 31 Mar 2027 on SURUTTO QRtto,
//    Hankyu all lines + Kobe subway Sannomiya–Tanigami + Shintetsu Tanigami–Arima
//    Onsen for a day, plus Taiko no Yu admission. The Arima & Rokko One-Day
//    Excursion Pass (FY2025, sales to 31 May 2026) is no longer on Hankyu's list of
//    current tickets (hankyu.co.jp/ticket/otoku/), and its pages now return 404.
//  - reserve.489ban.net (Yuya no Yado Koki's own booking engine): day-use plan
//    12:00–18:00, from ¥8,000 per person (two sharing), private silver-spring baths
//    booked at the front desk on the day, no under-12s, free cancellation to 6 days out.
//  Not quoted: the Hankyu coach fare from Umeda and the Shintetsu train fare — neither
//  operator's own page with the fare could be read on 21 Nov.
const RECHECKED_ISO = "2026-11-21";
const JRBUS_URL = "https://www.nishinihonjrbus.co.jp/trans/lp/arima/";
const KINGIN_URL = "https://arimaspa-kingin.jp/kin-01.htm";
const VISIT_KOBE_URL = "https://www.feel-kobe.jp/en/stories/arimaonsen";
const TAIKO_COUPON_URL = "https://www.hankyu.co.jp/en/ticket/otoku/014066.html";
const TAIKO_OFFICIAL_URL = "https://www.taikounoyu.com/howto";
const KOKI_DAYUSE_URL = "https://reserve.489ban.net/client/arimaonsen-koki/0/detail/658286";
const TAIKO_COUPON = "¥3,250";

const KIN_ADULT = "¥800";
const GIN_ADULT = "¥700";
const KIN_WEEKDAY = "¥650";
const GIN_WEEKDAY = "¥550";
const TWO_SPA = "¥1,200";

const accessRows = [
  {
    route: "Best pick: Sannomiya or Shin-Kobe → Arima Onsen, coach",
    operator: "West JR Bus, Arima Express",
    fare: "¥780 (¥700 bought 7+ days ahead)",
    time: "About 30 min — 08:50 departure arrives 09:20",
    pass: "Not the Kansai Area Pass. Klook's Kin no Yu + Gin no Yu package includes this coach both ways",
    note: "Runs daily and is the cheapest and fastest run of all. From Osaka, take a JR train to Sannomiya and board here.",
  },
  {
    route: "Osaka (Umeda) → Arima Onsen, coach",
    operator: "Hankyu Bus",
    fare: "Not quoted — check Hankyu Bus for your date",
    time: "About 60 min (VISIT KOBE's figure)",
    pass: "No rail pass covers it",
    note: "The direct coach from Osaka while the West JR Osaka runs are suspended. Leaves from Hankyu Sanbangai in Umeda.",
  },
  {
    route: "Osaka (Umeda) → Arima Onsen, train",
    operator: "Hankyu + Kobe Municipal Subway + Kobe Electric Railway",
    fare: `Covered by the ${TAIKO_COUPON} Taiko-no-yu coupon; otherwise ¥280 for the subway leg plus the Hankyu and Shintetsu fares`,
    time: "Three trains — Hankyu to Kobe-sannomiya, subway to Tanigami, Shintetsu to Arima Onsen (change at Arimaguchi)",
    pass: `Yes — Hankyu's Arima Onsen Taiko-no-yu coupon, ${TAIKO_COUPON}, covers all three legs for a day plus Taiko no Yu admission`,
    note: "The only Osaka route a current pass covers. The coupon is valid via Sannomiya only, not via Shinkaichi.",
  },
  {
    route: "Shin-Osaka / Osaka Station → Arima Onsen, coach",
    operator: "West JR Bus, Arima Express",
    fare: "¥1,250 / ¥1,400 when running",
    time: "Suspended for now",
    pass: "—",
    note: "West JR Bus states that every Osaka-area run is suspended until further notice. From Shin-Osaka, take a train to Shin-Kobe and board the ¥780 coach there.",
  },
  {
    route: "Sannomiya → Arima Onsen, train",
    operator: "Kobe Municipal Subway + Kobe Electric Railway",
    fare: "¥280 for the subway leg, plus the Shintetsu fare",
    time: "Two changes",
    pass: "Taiko-no-yu coupon (from Hankyu stations)",
    note: "Subway to Tanigami, then a Shintetsu train towards Sanda, changing at Arimaguchi. Scenic, but it buys you nothing over the coach.",
  },
  {
    route: "Itami Airport (ITM) → Arima Onsen",
    operator: "Arima Onsen Tourist Association's own figure",
    fare: "Not published as one fare",
    time: "About 30 min",
    pass: "—",
    note: "The closest airport to the town by a wide margin — worth knowing if you are choosing between Kansai's two airports.",
  },
  {
    route: "Kansai Airport (KIX) → Arima Onsen",
    operator: "Arima Onsen Tourist Association's own figure",
    fare: "Not published as one fare",
    time: "About 90 min",
    pass: "—",
    note: "Doable on an arrival day, but it is 90 minutes with luggage and the baths close in the evening.",
  },
];

const bathRows = [
  {
    bath: "Best first bath: Kin no Yu (the gold bath)",
    adult: `${KIN_ADULT} (${KIN_WEEKDAY} on weekdays)`,
    child: "¥350",
    hours: "08:00–22:00, last entry 21:30",
    closed: "Every 2nd and 4th Tuesday — open if that is a national holiday, closed the next day — and 1 January",
  },
  {
    bath: "Gin no Yu (the silver bath)",
    adult: `${GIN_ADULT} (${GIN_WEEKDAY} on weekdays)`,
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
    closed: "Maintenance days only — the next one listed is 6 January 2027",
  },
  {
    bath: "Yuya no Yado Koki (private bath, day use)",
    adult: "From ¥8,000 per person, two sharing a room (+¥75 bathing tax)",
    child: "Not available to children 12 and under",
    hours: "12:00–18:00, up to 6 hours in a room; four private silver-spring baths, booked at the front desk on the day",
    closed: "Availability is per date and room type — check the plan calendar. Free cancellation up to 6 days before",
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
    shape: "JR train to Sannomiya, then the 08:50 coach, arriving 09:20; or the Hankyu coach from Umeda (about 60 min)",
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
    cost: `From Sannomiya: ¥780 each way (¥700 bought 7+ days ahead) plus ${TWO_SPA}. The West JR Osaka runs are suspended for now`,
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
    q: "Is Arima Onsen worth a day trip from Osaka?",
    a: `Yes, if you want a 1,300-year-old onsen town about 60 minutes from Osaka (Umeda) by Hankyu coach, with two public baths you walk into for ${KIN_ADULT} (Kin no Yu) and ${GIN_ADULT} (Gin no Yu). It is a compact, busy town inside the Kobe city limits rather than a secluded mountain spring, and the day-use baths close between 21:00 and 22:00 — the private baths and the kaiseki dinner belong to people staying the night. Checked ${RECHECKED_ISO}.`,
  },
  {
    q: "Which pass covers Arima Onsen?",
    a: `From Osaka, Hankyu's Arima Onsen Taiko-no-yu coupon (Hankyu edition 2026, ${TAIKO_COUPON}, adults only) covers Hankyu trains, the Kobe subway from Sannomiya to Tanigami and the Kobe Electric Railway to Arima Onsen for one day, plus Taiko no Yu admission; it is sold on SURUTTO QRtto until 31 March 2027. The Arima & Rokko One-Day Excursion Pass sold until 31 May 2026 and is not on Hankyu's current list. The Kansai Area Pass reaches Sannomiya but not the Arima coach or the Kobe subway. From Kobe, Klook sells Kin no Yu and Gin no Yu with the round-trip Arima Express coach, valid three days including the boarding date. Checked ${RECHECKED_ISO}.`,
  },
  {
    q: "Can you use a private onsen in Arima for a day?",
    a: "Yes. Yuya no Yado Koki sells a day-use plan on its own booking engine: a room from 12:00 to 18:00 (up to six hours) with its four private silver-spring baths, which you book at the front desk on the day, from ¥8,000 per person with two sharing a room, plus the ¥75 bathing tax. Children 12 and under cannot use it, and cancellation is free up to six days before. Kin no Yu, Gin no Yu and Taiko no Yu have shared baths only. Checked 2026-11-21.",
  },
  {
    q: "How long do you need in Arima Onsen?",
    a: "About three hours covers the town: Kin no Yu, the Yumoto-zaka slope of shops, the free Taiko no Ashiyu foot bath and the old lanes are all a few minutes apart. Give it a full day if you add the Rokko-Arima ropeway up to the Rokko summit and the view over Osaka Bay, or if you book a private bath, since that day-use plan runs from 12:00 to 18:00.",
  },
  {
    q: "Are tattoos allowed at Arima Onsen?",
    a: `Not at Taiko no Yu: its own site states that it refuses admission to anyone with a tattoo. For Kin no Yu and Gin no Yu the official pages give no published tattoo rule as of ${RECHECKED_ISO}, so treat it as unconfirmed and ask at the counter. A private bath booked for your party alone, such as a ryokan's day-use plan, avoids the question.`,
  },
];

const TITLE = "Arima Onsen Day Trip from Osaka 2026: Pass & Private Baths";
const DESCRIPTION =
  "Arima Onsen day trip from Osaka: ~60 min by coach. Arima Onsen pass ¥3,250 incl. Taiko no Yu; Kin no Yu ¥800; private onsen day use from ¥8,000.";

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
          </svg><span className="sr-only"> / </span>
          <Link href="/guides" className={styles.breadLink}>Guides</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <Link href="/guides/attractions" className={styles.breadLink}>Things to Do</Link>
          <svg className={styles.breadSep} width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg><span className="sr-only"> / </span>
          <span className={styles.breadCurrent}>Arima Onsen Day Trip</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Arima Onsen Day Trip from Osaka (2026): <br />Pass, Kin no Yu &amp; Private Baths
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
                <p className={styles.verdictStatLabel}>From Osaka (Umeda)</p>
                <p className={styles.verdictStatValue}>~60 min by coach</p>
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
              Arima Onsen is about <strong>60 minutes from Osaka (Umeda)</strong> by Hankyu coach and about{" "}
              <strong>30 minutes and ¥780 from Sannomiya</strong> in Kobe on the West JR Bus Arima Express
              (the 08:50 arrives 09:20), whose Osaka Station runs are suspended for now. In the town,{" "}
              <strong>Kin no Yu</strong> (the gold bath, 08:00–22:00) costs <strong>{KIN_ADULT}</strong> for an
              adult and <strong>Gin no Yu</strong> (the silver bath, 09:00–21:00) costs{" "}
              <strong>{GIN_ADULT}</strong>, or {KIN_WEEKDAY} and {GIN_WEEKDAY} on weekdays, and a{" "}
              <strong>{TWO_SPA} 2-Spa Ticket</strong> covers both. The pass from Osaka is Hankyu&apos;s{" "}
              <strong>Arima Onsen Taiko-no-yu coupon, {TAIKO_COUPON}</strong>: a day of Hankyu, Kobe subway and
              Shintetsu trains to Arima plus Taiko no Yu admission; a private bath for the day starts at{" "}
              <strong>¥8,000 per person</strong> at Yuya no Yado Koki. Check the day first: Kin no Yu closes on
              the <strong>2nd and 4th Tuesday</strong> and Gin no Yu on the <strong>1st and 3rd</strong>. Last
              checked: {RECHECKED_ISO} on the{" "}
              <a href={JRBUS_URL} target="_blank" rel="noopener">West JR Bus</a>,{" "}
              <a href={KINGIN_URL} target="_blank" rel="noopener">Kin no Yu / Gin no Yu</a>,{" "}
              <a href={TAIKO_COUPON_URL} target="_blank" rel="noopener">Hankyu</a> and{" "}
              <a href={VISIT_KOBE_URL} target="_blank" rel="noopener">VISIT KOBE</a> sites.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Book a guided day from Osaka →
              </KlookLink>
              <KlookLink href={BATH_BUS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Both Baths + Coach →
              </KlookLink>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>Is Arima Onsen Worth a Day Trip from Osaka?</h2>
          <p className={styles.bodyText}>
            Yes, for a 1,300-year-old onsen town an hour from Osaka with two walk-in public baths under ¥1,000
            each — as long as you expect a compact resort town rather than a secluded mountain spring, and
            check the closed Tuesdays before you pick a date.
          </p>
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
          <p className={styles.bodyText}>
            If you want the Sea of Japan side instead — public baths to walk between and
            snow crab in winter — that is a longer trip; our{" "}
            <Link href="/guides/attractions/kinosaki-onsen-day-trip">Kinosaki Onsen day trip guide</Link>{" "}
            has the train times from Osaka and the bath pass.
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
                    {["Route", "Operator", "One-way fare", "Journey time", "Pass that covers it", "Notes"].map((h) => (
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
                      <td style={{ fontSize: "0.88rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {RECHECKED_ISO}</strong> —{" "}
            <a href={JRBUS_URL} target="_blank" rel="noopener">West JR Bus Arima Express</a> (fares, the
            08:50 Sannomiya departure and the suspension of every Osaka-area run) and{" "}
            <a href={VISIT_KOBE_URL} target="_blank" rel="noopener">VISIT KOBE</a> (about 60 min from Osaka
            Umeda by Hankyu Bus, about 30 min from central Kobe). The ¥280 subway leg is from Kobe City&apos;s page on the municipalised Hokushin line, and
            the Arimaguchi change from Kobe Electric Railway ({CHECKED}). The door-to-door times for Osaka, Itami and
            Kansai Airport are the Arima Onsen Tourist Association&apos;s own figures. For the city end of
            either journey, see{" "}
            <Link href="/guides/transport/osaka-transportation" style={{ color: "var(--text)", fontWeight: 600 }}>
              getting around Osaka
            </Link>
            {" "}and the{" "}
            <Link href="/guides/attractions/kansai-area-pass" style={{ color: "var(--text)", fontWeight: 600 }}>
              Kansai Area Pass
            </Link>
            , which covers JR West trains around Kobe but not this coach and not the Kobe subway. The{" "}
            <a href={TAIKO_COUPON_URL} target="_blank" rel="noopener">Taiko-no-yu coupon</a> terms are
            Hankyu&apos;s own page ({RECHECKED_ISO}).
          </p>
        </section>

        {/* Pass CTA directly under the access table */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Passes</span>
          <h2 className={styles.sectionTitle}>Which Pass Covers Arima Onsen?</h2>
          <p className={styles.bodyText}>
            From Osaka, Hankyu&apos;s <strong>Arima Onsen Taiko-no-yu coupon ({TAIKO_COUPON}, adults
            only)</strong> is the one current pass that covers the whole rail trip and a bath: Hankyu trains to
            Kobe-sannomiya, the Kobe subway to Tanigami and the Kobe Electric Railway to Arima Onsen for one
            day, with Taiko no Yu admission. It is a smartphone ticket sold on SURUTTO QRtto until 31 March
            2027, paid by credit card only, and it cannot be used on Taiko no Yu&apos;s closed days. The older
            Arima &amp; Rokko One-Day Excursion Pass sold until 31 May 2026 and is no longer on Hankyu&apos;s
            current ticket list.
          </p>
          <p className={styles.bodyText}>
            From Kobe, the simpler buy is one booking for both municipal bathhouses and the round-trip Arima
            Express coach — West JR Bus has paused its own version of that ticket. Two things to settle on the
            listing rather than here: whether the voucher covers your exact date range (the bath-and-coach
            set runs three days including the boarding date), and the cancellation rule. If the mountain
            matters as much as the bath, the Rokkosan Tourist Pass covers the Rokko cable car and the summit
            buses above the town.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TAIKO_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Taiko no Yu Ticket →
            </KlookLink>
            <KlookLink href={BATH_BUS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Kin no Yu + Gin no Yu + Coach →
            </KlookLink>
            <KlookLink href={PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Rokkosan Tourist Pass →
            </KlookLink>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            Rather not change trains three times? A guided coach day from Osaka puts Arima with the Mt. Rokko
            deck — and Himeji Castle or the Sanda outlets — in one booking.
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Guided Arima Day from Osaka →
            </KlookLink>
            <KlookLink href={rokkoHikingArimaBathingTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Rokko Hike + Arima Bath →
            </KlookLink>
          </div>
        </section>

        <EsimCtaTop />

        {/* Baths table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The baths</span>
          <h2 className={styles.sectionTitle}>How Much Are Arima&apos;s Day-Use Baths, and When Are They Shut?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Kin no Yu is {KIN_ADULT} ({KIN_WEEKDAY} on weekdays), Gin no Yu {GIN_ADULT} ({GIN_WEEKDAY}), Taiko no Yu
            ¥2,750 on a weekday, and a private bath with a room for the afternoon from ¥8,000 per person.</p>
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
            early start worth making.
          </p>
          <p className={styles.bodyText} style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            <strong>Last checked: {RECHECKED_ISO}</strong> —{" "}
            <a href={KINGIN_URL} target="_blank" rel="noopener">arimaspa-kingin.jp</a> (Kin no Yu and Gin no
            Yu), <a href={TAIKO_OFFICIAL_URL} target="_blank" rel="noopener">taikounoyu.com</a>{" "}
            (Taiko no Yu) and{" "}
            <a href={KOKI_DAYUSE_URL} target="_blank" rel="noopener">Yuya no Yado Koki&apos;s day-use plan</a>{" "}
            (its own booking engine). The {KIN_WEEKDAY} and {GIN_WEEKDAY} weekday adult rates exclude New Year, Golden
            Week and Obon. Taiko no Yu adds the ¥75 Kobe bathing tax on top of the admission.
          </p>
        </section>

        {/* Private baths */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Private baths</span>
          <h2 className={styles.sectionTitle}>Can You Use a Private Onsen in Arima for a Day?</h2>
          <p className={styles.bodyText}>
            Yes, at a ryokan rather than a public bathhouse. <strong>Yuya no Yado Koki</strong> sells a day-use
            plan on its own booking engine: a room from <strong>12:00 to 18:00</strong>, both the gold and
            silver springs in its indoor baths, and four <em>kashikiri</em> (private) silver-spring baths you
            can use as often as they are free, reserved at the front desk on the day. It starts at{" "}
            <strong>¥8,000 per person</strong> with two sharing a room, plus the ¥75 bathing tax; children 12
            and under cannot book it, and cancellation is free up to six days before. Kin no Yu, Gin no Yu and
            Taiko no Yu have shared baths only. Checked {RECHECKED_ISO}.
          </p>
          <p className={styles.bodyText}>
            The catch is the clock: check-in is from 12:00, so a private-bath day suits the Hankyu coach or
            a late-morning Arima Express rather than the 08:50 early start built around Kin no Yu. Compared
            with Hakone, where the private-bath question is mostly about overnight rooms, see our{" "}
            <Link href="/guides/attractions/hakone-ryokan-private-onsen">Hakone ryokan with private onsen
            guide</Link>.
          </p>
        </section>

        {/* Tattoos */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Tattoos</span>
          <h2 className={styles.sectionTitle}>Are Tattoos Allowed at Arima Onsen?</h2>
          <p className={styles.bodyText}>
            One of the three has a published answer. <strong>Taiko no Yu</strong>, the large day spa, states
            on its own site that it refuses admission to anyone with a tattoo. For{" "}
            <strong>Kin no Yu</strong> and <strong>Gin no Yu</strong> the official pages checked do not give a published
            tattoo rule as of {RECHECKED_ISO} — so rather than an answer either way, treat it as unconfirmed, and
            the counter as the place to ask.
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
          <h2 className={styles.sectionTitle}>How Long Do You Need in Arima Onsen?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            About three hours for the town itself; a full day if you add the Rokko-Arima ropeway and the summit,
            or book a private bath for the afternoon.
          </p>
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

        {/* A28: Klook hotel search by area (6.5%) — components/HotelStayBlock.tsx */}
        <HotelStayBlock city="arima" />

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
            <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check a Guided Day →
            </KlookLink>
            <KlookLink href={BATH_BUS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Both Baths + Coach →
            </KlookLink>
            <KlookLink href={PASS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
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
            taikounoyu.com on {RECHECKED_ISO}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={TAIKO_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Taiko no Yu Day Spa Ticket →
            </KlookLink>
          </div>
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
          heading="Guided Arima Days Out of Osaka"
          intro="All four are coach days with Arima in them, and they differ in what else they reach: Himeji and the Rokko deck, the Sanda outlets and the Rokko night view, the ropeway and the town, or a forest walk over the mountain that finishes in the hot springs. Open a listing for availability and the current price on your dates."
          tours={[arimaHimejiRokkoDayTour, arimaRokkoOutletBusTour, arimaRokkoNightViewDayTour, rokkoHikingArimaBathingTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 13 Nov 2026: the Sea of Japan onsen town, its seven public baths and the crab season. */}
            <Link href="/guides/attractions/kinosaki-onsen-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kinosaki Onsen Day Trip (2026): From Osaka, Bath Pass and Ryokan</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 6 Nov 2026: the Kii Mountains pilgrimage road, as a day from Osaka or a two-day walk. */}
            <Link href="/guides/attractions/kumano-kodo-tour" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kumano Kodo Tour (2026): Day Trips, the Nakahechi and How Far You Walk</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 6 Nov 2026: the sandbar and the Ine boathouses as a day out. */}
            <Link href="/guides/attractions/amanohashidate-ine-day-trip" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Amanohashidate Day Trip (2026): Ine Boathouses, Tours and Trains From Kyoto</p>
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
                <p className={styles.relatedTitle}>Sagano Romantic Train Tickets 2026: When to Book &amp; Seats</p>
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
                <p className={styles.relatedTitle}>Osaka Amazing Pass 2026: ¥3,500, Worth It? + 1-Day Plan</p>
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
              <KlookLink href={TOUR_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Guided Arima Days →
              </KlookLink>
              <KlookLink href={BATH_BUS_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View Baths + Coach →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
