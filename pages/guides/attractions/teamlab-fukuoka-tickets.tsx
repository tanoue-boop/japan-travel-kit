import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import BookingEsimCard from "../../../components/BookingEsimCard";
import KlookStayAreas from "../../../components/KlookStayAreas";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import {
  dazaifuYanagawaDayTour,
  fukuokaStayAreas,
  fukuokaTeamlabBusTour,
  fukuokaTouristCityPass,
  klookPassFukuoka,
  teamlabForestFukuokaTicket,
  teamlabFukuokaTripPrep,
  yanagawaItoshimaDayTour,
} from "../../../lib/klook-links";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { checkedLabel } from "../../../lib/attraction-prices";
import { EsimCtaBottom, EsimCtaTop } from "../../../components/EsimCta";

/**
 * teamLab Fukuoka Tickets — written 29 Oct 2026 for the exact phrase
 * "teamLab Fukuoka Tickets", which is what people search even though the venue's
 * own name is "teamLab Forest Fukuoka – SBI SECURITIES".
 *
 * This is the fifth teamLab venue on this site, after Planets in Toyosu,
 * Borderless in Azabudai Hills, the night-only Botanical Garden in Osaka and
 * Biovortex in Kyoto. The first thing checked before writing it was whether
 * Fukuoka still has a currently-operating permanent teamLab at all — it does:
 * teamlab.art's own /e/forest/ page is live and sells tickets, and the venue
 * operator BOSS E・ZO FUKUOKA lists it as the 5th-floor facility.
 *
 * It needed its own page for three reasons rather than a line on another: it is
 * the cheapest adult tier of the five, it is the only one built around physical
 * movement rather than walking through installations, and it is the only one
 * inside an entertainment complex — which is why half the practical questions
 * about it are really questions about BOSS E・ZO and the baseball dome next door.
 *
 * Every figure here is an official one, read on 29 October 2026 and sourced per
 * claim:
 *
 *   teamlab.art/e/forest/     the venue's own page: hours of 11:00–19:00 on
 *   teamlab.art/faq/forest/   weekdays and 10:00–19:00 on Saturdays, Sundays and
 *                             holidays; adult (16 and over) from ¥2,400 with
 *                             "prices may differ during the high season"; the
 *                             ¥2,000 high-school/university/vocational student
 *                             tier with student ID, ¥1,000 for ages 4–15 and free
 *                             for 3 and under; the peak-date tiers of ¥2,700,
 *                             ¥2,200 and ¥1,200; the rule that children 12 and
 *                             under need an accompanying guardian, one adult per
 *                             three children, and that the guardian also needs a
 *                             ticket; the address at BOSS E・ZO FUKUOKA 5F,
 *                             2-2-6 Jigyohama, Chuo-ku; the two spaces, The
 *                             Catching and Collecting Forest and The Athletics
 *                             Forest; that tickets are sold at the door but not
 *                             once a date has sold out in advance
 *   e-zofukuoka.com           the venue operator: the 5th-floor location; the
 *                             last-entry rule of 30 minutes before closing; the
 *                             approximately 60-minute visit; the periodic
 *                             Fukuoka-resident and Kyushu-resident price tickets
 *                             on the official ticket site only
 *   e-zofukuoka.com/en/access the access figures: 15 minutes on foot from exit 3
 *                             of Tojinmachi Station on the Fukuoka City Subway;
 *                             the Nishitetsu Bus stops "PayPay Dome" 9 minutes
 *                             and "Kyushu Medical Center" 3 minutes from gate 5;
 *                             the zero-minute walk from Mizuho PayPay Dome, which
 *                             connects to the 3rd floor by the dome deck; the
 *                             event-day direct buses from the Tenjin Expressway
 *                             Bus Terminal and Hakata Bus Terminal stands 6 and 7
 *
 * Both teamlab.art pages are client-rendered — an automated read returns the
 * page title and nothing else — so their figures come from the www.teamlab.art
 * search index for those URLs, and the e-zofukuoka.com figures from that site's
 * own index, which is the same method used on the Osaka and Kyoto teamLab pages.
 * That is why every table carries its check date.
 *
 * The suggested 1-to-2-hour duration is Klook's own, off its listing, confirmed
 * through the www.klook.com search index the same day. Nothing here is
 * first-hand, and no Klook price appears anywhere: Klook answers automated reads
 * of its product pages with HTTP 403.
 *
 * Commission note: this is a museum admission, so the Klook ticket is not
 * assumed to pay the 6.5% tours band. The Fukuoka bus day that contains the
 * museum, the two Dazaifu/Yanagawa days and the three Fukuoka hotel searches are
 * the 6.5% links, and the two city passes the 5% ones. No GetYourGuide button
 * appears: GetYourGuide has a Fukuoka location page but no teamLab Forest
 * listing we could confirm, and an unverified second seller is worse than none.
 */
const CHECKED = checkedLabel("2026-10-29");

/*
 * Re-checked 18 Nov 2026 (SEO pass), from server-rendered HTML rather than a
 * search index this time:
 *   teamlab.art/e/forest/ (__NEXT_DATA__): Adults 16+ ¥2,400, high school /
 *     university students ¥2,000, children 4–15 ¥1,000, 3 and under free, all
 *     paid tiers flagged as fluctuating, "the price may differ during the high
 *     season"; hours "Weekdays: 11:00 - 19:00 / Saturdays, Sundays, Holidays:
 *     10:00 - 19:00", subject to change.
 *   e-zofukuoka.com/teamlabforest/ (operator, JA): ピーク 2,700円 / レギュラー
 *     2,400円 adult, 2,200 / 2,000 student, 1,200 / 1,000 child 4–15, 3 and
 *     under free with a guardian; peak or regular per date on the price calendar.
 *   e-zofukuoka.com/group/ (operator, JA): teamLab Forest Fukuoka
 *     「所要時間：約1時間」 — the official duration used in the new H2 answer.
 * Not re-verified on 18 Nov: the "last entry 30 minutes before closing" rule
 * (operator pages are client-rendered), so it stays only in prose with its
 * 29 Oct date and is no longer in the hours table.
 */
const LAST_CHECKED = "2026-11-18";
const OFFICIAL_URL = "https://www.teamlab.art/e/forest/";
const OPERATOR_URL = "https://e-zofukuoka.com/teamlabforest/";
const OPERATOR_GROUP_URL = "https://e-zofukuoka.com/group/";

const TEAMLAB_URL = teamlabForestFukuokaTicket.url;

const ADULT_REGULAR = "¥2,400";
const ADULT_PEAK = "¥2,700";
const CHILD_REGULAR = "¥1,000";

/** What each tier costs, on teamLab's own published prices. */
const priceRows = [
  {
    ticket: "Adult, 16 and over",
    regular: ADULT_REGULAR,
    peak: ADULT_PEAK,
    note: "teamLab publishes this as “from” — its own wording is that prices may differ during the high season, so the figure you are quoted depends on the date",
  },
  {
    ticket: "Student, high school / university / vocational",
    regular: "¥2,000",
    peak: "¥2,200",
    note: "teamLab limits this tier to students at a Japanese high school or university, with student ID shown at the entrance",
  },
  {
    ticket: "Child, ages 4–15",
    regular: CHILD_REGULAR,
    peak: "¥1,200",
    note: "Children 12 and under need an accompanying guardian — one adult per three children, and the guardian needs a ticket of their own",
  },
  { ticket: "3 and under", regular: "Free", peak: "Free", note: "No ticket needed" },
];

/** Hours, the last-entry rule and how long a visit takes. */
const hoursRows = [
  {
    item: "Weekday hours",
    value: "11:00 – 19:00",
    note: "teamLab's own figure, published as subject to change — and the complex around it varies its hours by season and dome event",
  },
  {
    item: "Saturday, Sunday and holiday hours",
    value: "10:00 – 19:00",
    note: "An hour earlier than a weekday, which is the opposite of what most visitors assume",
  },
  {
    item: "How long to allow",
    value: "About 1 hour",
    note: "BOSS E・ZO FUKUOKA's own stated time required (所要時間：約1時間). Allow longer with children in the Athletics Forest",
  },
  {
    item: "Closed days",
    value: "Published per date on the official ticket calendar",
    note: "There is no weekly closing day to rely on, and the complex adjusts hours around Fukuoka PayPay Dome events — check your own date",
  },
];

/** The booking rules an AI answer stops short of. */
const bookingRows = [
  {
    q: "Is entry timed?",
    a: "Tickets are sold for a date and an admission time on the official ticket site, which is why advance booking is advised for weekends, public holidays, school vacation periods and any date the Fukuoka PayPay Dome next door has an event on.",
  },
  {
    q: "Is there a ticket at the door?",
    a: "Yes, while admission capacity remains — but teamLab is explicit that if a date has sold out in advance, nothing is available at the door. The counter is a fallback, not a plan, and least reliable on exactly the dates you are most likely to visit.",
  },
  {
    q: "Does the price change with the date?",
    a: `Yes. There is a regular-date set and a peak-date set: ${ADULT_REGULAR} against ${ADULT_PEAK} for an adult, ¥2,000 against ¥2,200 for a student and ${CHILD_REGULAR} against ¥1,200 for a child. teamLab's own wording is that prices may differ during the high season, so treat ${ADULT_REGULAR} as a floor rather than the price.`,
  },
  {
    q: "Are there cheaper tickets?",
    a: "Periodically, and only on one channel. BOSS E・ZO FUKUOKA has run Fukuoka-resident and Kyushu-resident price tickets for limited periods, sold exclusively through the official ticket site. They are not available to a visitor from abroad, and they are not on any reseller.",
  },
  {
    q: "What do you need to bring?",
    a: "Your QR ticket, a student ID if anyone is on the student tier, and an adult for every three children aged 12 or under — the guardian requirement is a rule rather than a recommendation, and the guardian needs their own ticket. The Catching and Collecting Forest is played through teamLab's app, so a charged phone is worth more here than at most museums.",
  },
];

/** How this venue differs from the four others in Japan. */
const venueRows = [
  {
    venue: "teamLab Forest Fukuoka",
    where: "BOSS E・ZO FUKUOKA 5F, Jigyohama, Chuo-ku — beside Fukuoka PayPay Dome",
    what: "Two spaces: The Catching and Collecting Forest, played through teamLab's own app, and The Athletics Forest, which you move through physically",
    when: "11:00–19:00 weekdays, 10:00–19:00 weekends and holidays; last entry 30 minutes before closing",
    adult: `From ${ADULT_REGULAR} (${ADULT_PEAK} peak)`,
  },
  {
    venue: "teamLab Biovortex Kyoto",
    where: "Minami-ku, 7 minutes from Kyoto Station",
    what: "Four floors, over 10,000 m², more than 50 artworks — teamLab's largest museum in Japan",
    when: "9:00–21:00, last entry 19:30",
    adult: "¥3,800, variable by slot",
  },
  {
    venue: "teamLab Planets TOKYO",
    where: "Toyosu, Tokyo",
    what: "The barefoot one — you walk through water and across soft ground, and the garden areas are outdoors",
    when: "Timed entry in 30-minute slots",
    adult: "From ¥3,800",
  },
  {
    venue: "teamLab Borderless",
    where: "Azabudai Hills, Tokyo",
    what: "Rooms without a fixed route, where the works move between them — the maze-like one",
    when: "Timed slot or a Flexible Pass",
    adult: "From ¥3,400",
  },
  {
    venue: "teamLab Botanical Garden Osaka",
    where: "Nagai Park, Osaka",
    what: "Open-air and night-only — the garden itself is the venue",
    when: "After dark only",
    adult: "See our Osaka guide",
  },
];

/** Getting there — the part that catches people out, because no station is at the door. */
const accessRows = [
  {
    route: "Fukuoka City Subway to Tojinmachi, then on foot",
    time: "15 minutes on foot from exit 3",
    note: "The venue's own primary route. Tojinmachi is on the subway Airport Line, so it is a direct ride from both Hakata Station and Fukuoka Airport with no change.",
  },
  {
    route: "Nishitetsu Bus to “PayPay Dome”",
    time: "9 minutes on foot from gate 5",
    note: "The nearer of the two bus options for the complex, on the operator's own access page.",
  },
  {
    route: "Nishitetsu Bus to “Kyushu Medical Center”",
    time: "3 minutes on foot from gate 5",
    note: "The shortest walk of any public-transport route to BOSS E・ZO — the stop most visitors have never heard of.",
  },
  {
    route: "From Mizuho PayPay Dome",
    time: "Zero minutes",
    note: "The complex is joined to the dome by its deck at third-floor level, which is why a match day and a museum slot can genuinely be the same afternoon.",
  },
  {
    route: "Event-day direct buses",
    time: "Varies",
    note: "On official game days and during some events, direct buses run from the Tenjin Expressway Bus Terminal and from Hakata Bus Terminal stands 6 and 7. They are temporary services, so they are not a route to count on for an ordinary weekday.",
  },
];

const faqItems = [
  {
    q: "How much are teamLab Fukuoka tickets?",
    a: `${ADULT_REGULAR} for an adult aged 16 and over on a regular date and ${ADULT_PEAK} on a peak one, and ${CHILD_REGULAR} (peak ¥1,200) for ages 4 to 15; 3 and under are free. Students at a Japanese high school or university pay ¥2,000 (peak ¥2,200) with ID. Which dates are peak is shown on the operator's price calendar — checked ${LAST_CHECKED} on teamlab.art and e-zofukuoka.com.`,
  },
  {
    q: "How long does teamLab Fukuoka take?",
    a: `About 1 hour — BOSS E・ZO FUKUOKA, the building's operator, states the time required as 約1時間 (about one hour), checked ${LAST_CHECKED}. Allow longer with children, who tend to stay in the Athletics Forest, and plan it as one block of an afternoon at BOSS E・ZO rather than a whole outing.`,
  },
  {
    q: "What time is teamLab Fukuoka open?",
    a: `11:00 to 19:00 on weekdays and 10:00 to 19:00 on Saturdays, Sundays and public holidays, on teamLab's official page checked ${LAST_CHECKED}. Hours are subject to change, and BOSS E・ZO FUKUOKA adjusts them around Mizuho PayPay Dome events, so check your own date before you go.`,
  },
  {
    q: "How do I get to teamLab Fukuoka?",
    a: "No station is at the door, and that is the single most useful thing to know. The venue's own primary route is the Fukuoka City Subway to Tojinmachi, then 15 minutes on foot from exit 3 — Tojinmachi is on the Airport Line, so it is a direct ride from Hakata Station and from Fukuoka Airport with no change. By bus it is shorter: the Nishitetsu stop “Kyushu Medical Center” is 3 minutes from gate 5 and “PayPay Dome” is 9. And if you are already at Mizuho PayPay Dome, it is a zero-minute walk — the complex joins the dome by its deck at third-floor level.",
  },
  {
    q: "Do I need to book teamLab Fukuoka in advance?",
    a: "For a weekend, a public holiday, a school vacation period or any date the dome next door has an event on, yes. For an ordinary weekday afternoon, usually not. Tickets are sold at the door while admission capacity remains — but teamLab is explicit that once a date has sold out in advance there is nothing at the counter, and the dates that sell out are exactly the ones you are most likely to be visiting on. Booking also fixes the price you pay, which matters here because the adult tier moves between regular and peak dates.",
  },
];

const TITLE = "teamLab Fukuoka Tickets 2026: Price, Hours & Time Needed";
const DESCRIPTION =
  "teamLab Fukuoka tickets: ¥2,400 adult (¥2,700 peak), ¥1,000 ages 4–15; open 11:00–19:00 (weekends 10:00), about 1 hour inside. Book on Klook.";

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/teamlab-fukuoka-tickets") },
});

export default function TeamlabFukuokaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/teamlab-fukuoka-tickets" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/teamlab-fukuoka-tickets" />
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
              route: "/guides/attractions/teamlab-fukuoka-tickets",
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
                  name: "teamLab Fukuoka Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/teamlab-fukuoka-tickets",
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
          <span className={styles.breadCurrent}>teamLab Fukuoka Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            teamLab Fukuoka Tickets (2026): <br />teamLab Forest Price and Hours
          </h1>
          <p className={styles.heroSubtitle}>
            The cheapest of the five teamLab venues in Japan, and the only one you move through rather than
            walk around. An hour on the 5th floor of BOSS E・ZO FUKUOKA, next to the baseball dome.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, checked", "Regular vs peak dates", "vs Tokyo, Kyoto & Osaka"].map((t) => (
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

        {/* Lead paragraph — the whole answer, before anything else on the page. */}
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            <strong>
              teamLab Fukuoka tickets (teamLab Forest Fukuoka) are {ADULT_REGULAR} for an adult ({ADULT_PEAK}
              on peak dates) and {CHILD_REGULAR} for ages 4–15, and a visit takes about 1 hour.
            </strong>{" "}
            It is open 11:00–19:00 on weekdays and 10:00–19:00 at weekends and on holidays, on the 5th floor of
            BOSS E・ZO FUKUOKA beside Mizuho PayPay Dome (teamLab and the operator&apos;s official pages,
            checked {LAST_CHECKED}).
          </p>
          <p className={styles.bodyText}>
            The separate night show at the castle,{" "}
            <em>teamLab: Digitized Fukuoka Castle Ruins 2026-2027</em>, runs at Maizuru Park from 30 October
            2026 to 11 January 2027 on its own ticket (dates from teamlab.art, read on 11 November 2026).
          </p>
          <div className={styles.pickCtaRow} style={{ margin: "0 0 1.25rem" }}>
            <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
              Check teamLab Forest Fukuoka Tickets →
            </KlookLink>
          </div>
          <p className={styles.bodyText}>
            <strong>teamLab Fukuoka tickets</strong> — for{" "}
            <em>teamLab Forest Fukuoka – SBI SECURITIES</em>, the permanent museum on the{" "}
            <strong>5th floor of BOSS E・ZO FUKUOKA</strong> at 2-2-6 Jigyohama in Chuo-ku — are{" "}
            <strong>{ADULT_REGULAR}</strong> for an adult aged 16 and over on a regular date and{" "}
            <strong>{ADULT_PEAK}</strong> on a peak one, <strong>¥2,000</strong> or ¥2,200 for a high school,
            university or vocational student with ID, <strong>{CHILD_REGULAR}</strong> or ¥1,200 for ages 4
            to 15, and free for children of 3 and under. It opens <strong>11:00–19:00</strong> on weekdays and{" "}
            <strong>10:00–19:00</strong> at weekends and on holidays, with{" "}
            <strong>last entry 30 minutes before closing</strong>, and the operator puts a visit at{" "}
            <strong>about 60 minutes</strong> — the shortest of the five teamLab venues in Japan. No station
            is at the door: the venue&apos;s own route is the Fukuoka City Subway to{" "}
            <strong>Tojinmachi</strong>, then <strong>15 minutes on foot</strong> from exit 3. Tickets are
            sold at the door while capacity remains, but not once a date has sold out in advance — so a
            weekend, a holiday or a dome event day is worth booking. Every figure read on {CHECKED} from
            teamlab.art and the venue operator&apos;s own site.
          </p>
          <p className={styles.bodyText}>
            <strong>How it differs from the other four.</strong> Fukuoka&apos;s is the physical one: two
            spaces, <em>The Catching and Collecting Forest</em>, which is played through teamLab&apos;s own
            app, and <em>The Athletics Forest</em>, which you move through with your body — against the
            barefoot water rooms of{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets">teamLab Planets in Toyosu</Link>, the
            maze-like galleries of{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets">teamLab Borderless</Link>, the
            four-floor scale of{" "}
            <Link href="/guides/attractions/teamlab-kyoto-tickets">teamLab Biovortex Kyoto</Link> and the
            night-only garden of{" "}
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets">teamLab Botanical Garden Osaka</Link>.
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
                <p className={styles.verdictStatLabel}>Adult price</p>
                <p className={styles.verdictStatValue}>{ADULT_REGULAR} regular / {ADULT_PEAK} peak</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>11:00–19:00 weekdays, 10:00 weekends</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>How long</p>
                <p className={styles.verdictStatValue}>About 60 minutes</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting there</p>
                <p className={styles.verdictStatValue}>Tojinmachi exit 3, 15 min walk</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> book ahead for a weekend, a holiday, a school vacation date or a day
              the dome next door has an event — those are the dates that sell out, and once a date is gone
              there is nothing at the counter. Booking also locks in whether you pay the regular or the peak
              tier. On an ordinary weekday the door is fine, and the hour is better spent as part of an
              afternoon at BOSS E・ZO than as a trip of its own.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                Check teamLab Fukuoka Tickets →
              </KlookLink>
              <KlookLink href={fukuokaTeamlabBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.verdictBtn}>
                The Museum Inside a Full Day →
              </KlookLink>
            </div>
          </div>
        </div>

        <EsimCtaTop />

        {/* Q1 — price */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Price</span>
          <h2 className={styles.sectionTitle}>How Much Are teamLab Fukuoka Tickets?</h2>
          <p className={styles.bodyText}>
            {ADULT_REGULAR} for an adult on a regular date and {ADULT_PEAK} on a peak one, and {CHILD_REGULAR}{" "}
            (peak ¥1,200) for ages 4 to 15 — the cheapest adult admission of the five teamLab venues in Japan.
            Whether your date is regular or peak is set on the operator&apos;s price calendar, and teamLab
            states that prices may differ during the high season.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Regular date", "Peak date", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.ticket}</td>
                      <td className={styles.tdPrice}>{row.regular}</td>
                      <td className={styles.tdPrice}>{row.peak}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener">teamLab Forest Fukuoka official page (teamlab.art)</a>{" "}
            and{" "}
            <a href={OPERATOR_URL} target="_blank" rel="noopener">BOSS E・ZO FUKUOKA&apos;s teamLab Forest page</a>{" "}
            (regular and peak prices).
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Which dates count as peak is published on the official ticket calendar rather than as a rule, so
            confirm your own date before you budget for it.
            These figures sit alongside every other attraction checked in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>, which carries the check date for each one.
          </p>
        </section>

        {/* Landing query 「チームラボ 福岡 所要時間」 (18 Nov 2026) */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Time needed</span>
          <h2 className={styles.sectionTitle}>How Long Does teamLab Fukuoka Take?</h2>
          <p className={styles.bodyText}>
            About 1 hour: BOSS E・ZO FUKUOKA, which runs the building, states the time required for teamLab
            Forest Fukuoka as 約1時間 (about one hour). Allow longer with children, who tend to linger in the
            Athletics Forest, and plan the visit as one block of an afternoon at BOSS E・ZO rather than a whole
            outing.
          </p>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} —{" "}
            <a href={OPERATOR_GROUP_URL} target="_blank" rel="noopener">BOSS E・ZO FUKUOKA attractions and time required</a>.
          </p>
        </section>

        <BookingEsimCard lead="teamLab Fukuoka booked? Get mobile data before you land." />

        {/* Q2 — hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Time Is teamLab Fukuoka Open?</h2>
          <p className={styles.bodyText}>
            11:00 to 19:00 on weekdays and 10:00 to 19:00 on Saturdays, Sundays and holidays. The weekend opens{" "}
            <em>earlier</em>, not later, and teamLab publishes both as subject to change.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["", "teamLab Forest Fukuoka", "Notes"].map((h) => (
                      <th key={h || "blank"}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.value}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last checked: {LAST_CHECKED} —{" "}
            <a href={OFFICIAL_URL} target="_blank" rel="noopener">teamLab Forest Fukuoka official page (teamlab.art)</a>{" "}
            (hours) and{" "}
            <a href={OPERATOR_GROUP_URL} target="_blank" rel="noopener">BOSS E・ZO FUKUOKA</a> (time required).
          </p>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Last entry was published by BOSS E・ZO FUKUOKA as 30 minutes before closing when read on{" "}
            {CHECKED}. The complex adjusts its hours seasonally and around Fukuoka PayPay Dome events, so a
            date-specific check is the only safe one.
          </p>
        </section>

        {/* Q3 — booking, the part an AI answer does not finish */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Booking</span>
          <h2 className={styles.sectionTitle}>Do You Need to Book teamLab Fukuoka in Advance?</h2>
          <p className={styles.bodyText}>
            For a weekend, a public holiday, a school vacation date or any day the dome next door has an event
            on — yes. For an ordinary weekday — usually not. The rule that decides it is teamLab&apos;s own:
            tickets <em>are</em> sold at the door while admission capacity remains, but{" "}
            <strong>once a date has sold out in advance there is nothing at the counter</strong>. That makes
            the door least reliable on exactly the dates most visitors turn up on. Booking ahead also fixes
            which price tier you pay, which matters at a venue whose adult admission moves between{" "}
            {ADULT_REGULAR} and {ADULT_PEAK}.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Question", `What the operator publishes (read ${CHECKED})`].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingRows.map((row) => (
                    <tr key={row.q}>
                      <td className={styles.tdProvider}>{row.q}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1.25rem" }}>
            Two routes, because they answer different questions. The bare ticket is the one to open if the
            slot is all you need; the Fukuoka bus day is the one that puts the same visit inside a full
            itinerary, which is the better buy given how short an hour is:
          </p>
          <div className={styles.pickCtaRow}>
            <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              teamLab Fukuoka ticket on Klook →
            </KlookLink>
            <KlookLink href={fukuokaTeamlabBusTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Fukuoka day with teamLab →
            </KlookLink>
          </div>
        </section>

        {/* Q4 — access */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to teamLab Fukuoka?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The thing to know before anything else: <strong>no subway station is at the door</strong>. This
            is not a museum you step out of a ticket gate into, which is what makes it the one teamLab venue
            where the journey needs a decision. The venue&apos;s own primary route is Tojinmachi plus a
            quarter-hour walk; two bus stops are considerably closer; and if you are already at the baseball
            dome you are effectively there.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "Walk / time", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.route}</td>
                      <td style={{ fontSize: "0.88rem", whiteSpace: "nowrap" }}>{row.time}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            The practical consequence is that a transport pass is worth more here than at a venue with a
            station underneath it. The <strong>Fukuoka Tourist City Pass</strong> covers the city subway, the
            Nishitetsu and Showa buses, JR, Nishitetsu trains and the municipal ferry on one ticket and is
            collected at the Fukuoka Airport international terminal — and its own listing states it is not
            sold to Japanese passport holders. Our{" "}
            <Link href="/guides/transport/ic-cards-japan">IC cards guide</Link> covers the pay-as-you-go
            alternative if a pass is overkill for one afternoon. Neither covers the trains out of Fukuoka; for
            Yufuin, Nagasaki or Kumamoto on the same trip, the{" "}
            <Link href="/guides/transport/jr-kyushu-rail-pass">JR Kyushu Rail Pass</Link> starts at ¥15,000 for 3
            days of Northern Kyushu — and it does not cover the city subway to Tojinmachi. Our{" "}
            <Link href="/guides/attractions/kyushu-5-day-itinerary">Kyushu 5-day itinerary</Link> puts teamLab
            on Day 1 before those trips.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={fukuokaTouristCityPass.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Fukuoka Tourist City Pass →
            </KlookLink>
            <KlookLink href={klookPassFukuoka.url} target="_blank" rel="sponsored nofollow noopener" className={styles.pickCta}>
              Klook Pass Fukuoka →
            </KlookLink>
          </div>
        </section>

        {/* Q5 — vs the other four venues */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Compare</span>
          <h2 className={styles.sectionTitle}>teamLab Fukuoka vs Tokyo, Kyoto and Osaka — Which Is Which?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            They are five different products rather than five branches of one, and the differences are big
            enough to decide a trip on. Fukuoka&apos;s is the physical, app-driven, hour-long and cheapest
            one. If you want the half-day, that is Kyoto; the barefoot water, Toyosu; the maze, Azabudai
            Hills; the open-air night walk, Osaka.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Venue", "Where", "What it is", "When", "Adult price"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {venueRows.map((row) => (
                    <tr key={row.venue}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.venue}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.where}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.what}</td>
                      <td style={{ fontSize: "0.86rem" }}>{row.when}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem" }}>{row.adult}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The Fukuoka row was read on {CHECKED}; the other four carry the dates from our own guides for
            those venues, each against teamLab&apos;s own published prices —{" "}
            <Link href="/guides/attractions/teamlab-planets-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>Planets</Link>,{" "}
            <Link href="/guides/attractions/teamlab-borderless-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>Borderless</Link>,{" "}
            <Link href="/guides/attractions/teamlab-kyoto-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>Biovortex Kyoto</Link>{" "}
            and{" "}
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" style={{ color: "var(--text)", fontWeight: 600 }}>Botanical Garden Osaka</Link>.
            Adult admission is variable or date-tiered at all five, so every figure here is a floor.
          </p>
        </section>

        {/* Klook: the rest of the day */}
        <KlookTripPrep
          label="The rest of the day"
          heading="What Else Should You Book Around a teamLab Fukuoka Slot?"
          intro="Sixty minutes is not a day, and that is the single most important planning fact about this venue. These are the bookings that follow from the slot — a day out that returns to Hakata in time for it, somewhere to stay on the same waterfront, and the pass that covers the subway-plus-walk the museum needs."
          items={teamlabFukuokaTripPrep}
        />

        {/* Where to stay */}
        <KlookStayAreas
          heading="Where to Stay for a teamLab Fukuoka Visit"
          intro="Three areas, and the choice comes down to whether the museum is the reason you are in Fukuoka or one evening of a wider trip. Which rooms are left and at what price is a per-date question, so each area links into Klook's own hotel search for it."
          areas={fukuokaStayAreas}
        />

        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            Another Fukuoka ticket: <Link href="/guides/attractions/marine-world-uminonakamichi-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Marine World Uminonakamichi</Link> (¥2,500 for adults; the dolphin show pauses 12 January – 9 April 2027).
          </p>
        </section>
        <section className={styles.bodySection}>
          <p className={styles.bodyText}>
            For a day of buses and trains around the city, the <Link href="/guides/transport/fukuoka-tourist-city-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Fukuoka Tourist City Pass</Link> is ¥2,500 for overseas visitors.
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

        {/* Klook tours in the same city */}
        <KlookTourPicks
          heading="Days Out From the Same City"
          intro="A teamLab slot fills an hour, which leaves most of a Fukuoka day open. All three of these leave and return to Hakata Station, which is a direct Airport Line ride from Tojinmachi — so a late-afternoon museum slot joins onto the end of any of them without a transfer. Klook prices change by date, so open a listing for the figure on your dates."
          tours={[fukuokaTeamlabBusTour, dazaifuYanagawaDayTour, yanagawaItoshimaDayTour, klookPassFukuoka]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            {/* Added 15 Nov 2026: the museum as one afternoon of two days in Fukuoka. */}
            <Link href="/guides/attractions/fukuoka-2-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Fukuoka 2 Day Itinerary (2026): Dazaifu, Yanagawa or Yufuin</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 7 Nov 2026: the whole of northern Kyushu from a Fukuoka base. */}
            <Link href="/guides/attractions/kyushu-5-day-itinerary" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Kyushu 5 Day Itinerary (2026): Fukuoka, Beppu, Kumamoto and Takachiho</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            {/* Added 6 Nov 2026: a day out of Fukuoka to Kyushu's hot spring towns. */}
            <Link href="/guides/attractions/yufuin-beppu-tour-from-fukuoka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Yufuin and Beppu Tour from Fukuoka (2026): Tours, Trains and Onsen Time</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-kyoto-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="1.5" />
                  <circle cx="17.5" cy="10.5" r="1.5" />
                  <circle cx="8.5" cy="7.5" r="1.5" />
                  <circle cx="6.5" cy="12.5" r="1.5" />
                  <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Kyoto Tickets: Prices, Hours &amp; Booking</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-planets-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Planets Tickets (2026): Price, Hours and How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-borderless-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="1.5" />
                  <circle cx="17.5" cy="10.5" r="1.5" />
                  <circle cx="8.5" cy="7.5" r="1.5" />
                  <circle cx="6.5" cy="12.5" r="1.5" />
                  <path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-1.4-1-1.9-1-3a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-9-9z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Borderless Tickets (2026): Price, How to Book and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/teamlab-botanical-garden-osaka-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c0-6 3-9 7-10-1 5-3 8-7 10z" />
                  <path d="M12 21c0-6-3-9-7-10 1 5 3 8 7 10z" />
                  <path d="M12 21V11" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>teamLab Botanical Garden Osaka Tickets: Prices &amp; Hours</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v6a3 3 0 0 0 0 6v2H4v-2a3 3 0 0 0 0-6z" />
                  <path d="M12 7v10" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Attraction Ticket Prices (2026): Every Admission, Checked and Dated</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/ic-cards-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="18" height="12" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>IC Cards in Japan (2026): Suica, ICOCA and Which One to Get</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/jr-pass-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="14" rx="3" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M7 21l2-4M17 21l-2-4" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>JR Pass Guide (2026): Is It Worth It, and Which Pass?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/esim/best-esim-japan" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="2" width="12" height="20" rx="2" />
                  <path d="M11 18h2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Best eSIM for Japan (2026): Providers Compared on Price and Network</p>
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
            <h2 className={styles.ctaBannerTitle}>An hour on the 5th floor, and the rest of the day</h2>
            <p className={styles.ctaBannerDesc}>
              {ADULT_REGULAR} on a regular date and {ADULT_PEAK} on a peak one, with last entry 30 minutes
              before a 19:00 close. Book ahead for a weekend or a dome event day — once a date sells out
              there is nothing at the counter.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <KlookLink href={TEAMLAB_URL} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View teamLab Fukuoka Tickets →
              </KlookLink>
              <KlookLink href={dazaifuYanagawaDayTour.url} target="_blank" rel="sponsored nofollow noopener" className={styles.ctaBannerBtn}>
                View the Dazaifu &amp; Yanagawa Day →
              </KlookLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
