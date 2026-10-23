import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import styles from "../../../styles/BestEsimJapan.module.css";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel, PRICES } from "../../../lib/attraction-prices";
import {
  osakaAmazingPass,
  osakaCastleNishinomaruWalkingTour,
  osakaCastleTicket,
  osakaCastleUmedaTonboriDayTour,
  osakaSkyVistaHalfDayBusTour,
} from "../../../lib/klook-links";

/**
 * Osaka Castle — the main tower, and the four other paid things inside the same walls
 * that almost nobody budgets for.
 *
 * Sources, all read on 23 Oct 2026 and nothing here first-hand:
 *
 * - osakacastle.net, the castle museum's own site: the ¥1,200 admission (noted there as
 *   effective 1 April 2025), the 9:00–18:00 hours with ticket sales ending at 17:30, the
 *   note that entry may be restricted earlier when the building is busy, the 28 Dec – 1
 *   Jan closure, and the full station-and-exit list on /access/.
 * - osaka-info.jp (Osaka Convention & Tourism Bureau, the city's official tourism site)
 *   for the ¥600 university/high-school band, the free junior-high-and-under band, the
 *   "about 15 to 20 minutes on foot from any of the stations" walk, and the official
 *   60-minute visit estimate.
 * - osaka-amazing-pass.com/en/service_free.html, the pass operator's own facility list,
 *   for the five Osaka Castle Park facilities the pass covers and the regular fee and
 *   hours of each: the museum, the Nishinomaru Garden, the Yagura turret, the KAIYODO
 *   Figure Museum at Miraiza and the Gozabune boat.
 * - osaka-info.jp again for the Gozabune fare bands and the 10:00–16:30 last departure,
 *   and osakacastlepark.jp for the 2026 cherry-blossom night opening of the garden.
 * - The www.klook.com search index for activity 30110 and the Gozabune's ~20-minute
 *   circuit. Klook answers automated reads of /activity/ pages with HTTP 403.
 *
 * Two judgement calls worth flagging:
 *
 * - The Nishinomaru Garden fee is ¥300 on the pass operator's facility list and still
 *   ¥200 on one of the city tourism site's older spot pages. The page uses ¥300, says so,
 *   and tells the reader to confirm at the gate — a ¥100 garden fee is not worth a wrong
 *   number either way.
 * - There is no standalone Gozabune listing in Klook's index, so the boat is described as
 *   a kiosk purchase or a pass inclusion rather than linked to a product that does not
 *   exist. The 6.5% CTAs here are the two guided walks and the castle ticket itself.
 *
 * No Klook price appears: the product pages cannot be read, so no figure could be verified.
 */

/** Every figure on this page was read on this date. */
const CHECKED_ISO = "2026-10-23";
const CHECKED = checkedLabel(CHECKED_ISO);

/** The pass price is owned by lib/attraction-prices.ts, shared with the ticket price table. */
const PASS_1_DAY = PRICES.osakaAmazingPass.adult;

const priceRows = [
  {
    tier: "Adult",
    price: "¥1,200",
    what: "Covers the eight floors of the main tower and the Toyotomi Stone Wall Museum on the same day",
  },
  {
    tier: "University and high school students",
    price: "¥600",
    what: "Student ID required at the window; overseas students are asked for an ISIC card. No ID means the adult rate",
  },
  {
    tier: "Junior high school students and younger",
    price: "Free",
    what: "Proof of age required — a student handbook, insurance card or passport all count",
  },
  {
    tier: "Group rate, 15 or more paying",
    price: "¥1,080 / ¥540",
    what: "Adult and student rates respectively; the free band stays free",
  },
  {
    tier: "Osaka Amazing Pass holder",
    price: "Free",
    what: "One entry per pass day, with no time-of-day restriction on this facility",
  },
];

const parkRows = [
  {
    place: "Osaka Castle Museum (the main tower)",
    fee: "¥1,200 adult",
    hours: "9:00 – 18:00 (last entry 17:30)",
    pass: "Free with the pass",
    note: "The ticket includes the Toyotomi Stone Wall Museum. Closed 28 December – 1 January",
  },
  {
    place: "Nishinomaru Garden",
    fee: "¥300 (¥350 in cherry-blossom season)",
    hours: "Mar–Oct 9:00 – 17:00 · Nov–Feb 9:00 – 16:30 (last entry 30 min before)",
    pass: "Free with the pass",
    note: "The lawn with the postcard view of the tower and about 300 cherry trees. Closed Mondays and over New Year",
  },
  {
    place: "Osaka-jo Gozabune boat",
    fee: "¥1,800 adult (16+), ¥900 school age, ¥1,200 for 65+, preschoolers free",
    hours: "10:00 – 16:30 (last departure)",
    pass: "Free with the pass, but you exchange the ticket on arrival",
    note: "A roughly 20-minute circuit of the inner moat. Children of junior high age and under are not carried unaccompanied",
  },
  {
    place: "Osaka Castle Yagura (turret)",
    fee: "¥900, high school age and older",
    hours: "10:00 – 16:30 (last entry 16:00)",
    pass: "Free with the pass",
    note: "The Important Cultural Property turrets — the interior of the defences rather than the keep",
  },
  {
    place: "KAIYODO Figure Museum, Miraiza Osaka-jo",
    fee: "¥1,000 adult / ¥500 child",
    hours: "9:30 – 17:30 (last entry 17:00)",
    pass: "Free with the pass",
    note: "Inside the former army headquarters building at the foot of the keep; Miraiza itself is free to walk into",
  },
];

const accessRows = [
  {
    station: "JR Osakajokoen (Osaka Loop Line)",
    walk: "About 15–20 min",
    note: "The usual arrival for visitors — comes in past the Osaka-jo Hall side, with the park café strip on the way",
  },
  {
    station: "JR / Osaka Metro Morinomiya",
    walk: "About 15–20 min",
    note: "Metro exits 1 and 3-B. The southern approach, quieter than the Osakajokoen path",
  },
  {
    station: "Osaka Metro Tanimachi 4-chome",
    walk: "About 15–20 min",
    note: "Tanimachi Line exit 1-B, Chuo Line exit 9. The western approach through the Otemon gate — the historically correct way in",
  },
  {
    station: "Osaka Metro / Keihan Temmabashi",
    walk: "About 15–20 min",
    note: "Metro Tanimachi Line exit 3. The northern approach, closest to the Gozabune boarding point",
  },
  {
    station: "Osaka Metro Osaka Business Park",
    walk: "About 15–20 min",
    note: "Nagahori Tsurumi-ryokuchi Line exit 1 — useful if you are staying in the OBP towers",
  },
];

const whoFor = [
  {
    title: "Go at 9:00 if…",
    desc: `You want the keep without the queue. The tower opens at 9:00 and the museum's own site warns that entry may be restricted earlier than the 17:30 cut-off when the building is busy — so the opening hour is the one slot that is never rationed. It also leaves the whole afternoon for the garden and the boat. Read on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Go in the afternoon if…",
    desc: "The park matters more to you than the museum. The grounds are free and open long after the keep shuts at 18:00, the tower is floodlit after dark, and the walk in from Otemon at golden hour is the best photograph on the site. Just note the earlier closers inside the walls: the boat stops at 16:30 and the turrets at 16:30 too.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    ),
  },
  {
    title: "Buy the pass if…",
    desc: `You are doing more than the keep. The five paid facilities inside Osaka Castle Park add up to ¥5,200 at the gate for one adult — and all five are free on the Osaka Amazing Pass at ${PASS_1_DAY} a day, with the subway thrown in. Two of them clear the pass price on their own. Facility list read on ${CHECKED}.`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
        <path d="M12 6v12" strokeDasharray="2 3" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Count the paid things before you buy anything",
    desc: `The main tower is ¥1,200, and that is where most people stop reading. Inside the same walls there are four more paid facilities — the Nishinomaru Garden, the Gozabune boat, the Yagura turrets and the KAIYODO Figure Museum at Miraiza — totalling ¥5,200 for one adult. Whether you want two of those or all five is the decision that sets your ticket, not the keep. Read on ${CHECKED}.`,
  },
  {
    title: "If it is two or more, the pass wins outright",
    desc: `All five are free admissions on the Osaka Amazing Pass, which is ${PASS_1_DAY} for a day. The keep plus the boat is ¥3,000 at the gate; the keep plus the garden plus the boat is ¥3,300. Either clears the pass price inside one set of walls, with unlimited Osaka Metro and city buses left over for the rest of the day.`,
  },
  {
    title: "If it is just the keep, buy the single ticket ahead",
    desc: "The museum sells tickets through its own web booking site, and Klook's listing is the English-language route to the same admission on a foreign card. Neither is mandatory — the window sells on the day — but both put a code in your phone instead of a queue at the gate, which matters on a spring weekend. Confirm the cancellation window shown on your own booking before you pay.",
  },
  {
    title: "Book the Gozabune in person, on the day",
    desc: "The boat is the one thing here you cannot settle in advance: tickets are sold at the kiosk on the north side of the keep, just west of the Gokurakubashi bridge, and pass holders exchange for a timed boarding slip at the same counter. Seats are limited and boarding is only allowed at the time printed on the slip, so do that early in the day rather than at 16:00.",
  },
  {
    title: "Allow an hour for the keep and a second for the walls",
    desc: `Osaka's official tourism site puts the museum visit at about 60 minutes, which is right for eight floors and a lift to the top. The park around it is a separate hour or two: the moats, the Otemon approach and the Toyotomi-era stone wall are the parts you do not pay for and the parts most worth the time. Estimate read on ${CHECKED}.`,
  },
];

const faqItems = [
  {
    q: "How much are Osaka Castle tickets?",
    a: `An adult ticket to the main tower — the Osaka Castle Museum — is ¥1,200. University and high school students pay ¥600 with student ID, and junior high school students and younger go free with proof of age. Groups of 15 or more paying visitors pay ¥1,080 and ¥540. The ticket also covers the Toyotomi Stone Wall Museum on the same day. Overseas students are asked for an ISIC card; without ID you are charged the adult rate. All read off osakacastle.net and Osaka's official tourism site on ${CHECKED}.`,
  },
  {
    q: "What are the Osaka Castle opening hours?",
    a: `The main tower is open 9:00 to 18:00, with ticket sales and last admission ending at 17:30 — thirty minutes before closing. It is closed from 28 December to 1 January. One detail from the museum's own site that matters on a busy day: it reserves the right to restrict entry earlier than 17:30 when visitor numbers are high, so a 17:00 arrival at cherry-blossom time is a gamble rather than a plan. The park itself has no gate and no closing time. Read on ${CHECKED}.`,
  },
  {
    q: "How long do you need at Osaka Castle?",
    a: `Osaka's official tourism site puts the museum at about 60 minutes, and that is an honest figure: eight floors of exhibits with a lift to the observation level at the top, walked in one direction. Budget a second hour at least for the grounds — the outer and inner moats, the Otemon gate approach and the Toyotomi-era stone wall are free and are what makes the site worth the trip. If you are adding the garden and the boat, treat the castle as a half-day rather than a stop.`,
  },
  {
    q: "What else inside Osaka Castle Park costs money?",
    a: `Four things beyond the keep, and together they are the reason a castle visit can cost ¥5,200 instead of ¥1,200. The Nishinomaru Garden is ¥300 (¥350 in cherry-blossom season), open 9:00–17:00 from March to October and 9:00–16:30 from November to February, closed Mondays. The Osaka-jo Gozabune boat is ¥1,800 for an adult of 16 and over, ¥900 at school age, ¥1,200 for 65 and over and free for preschoolers, running 10:00 to 16:30. The Yagura turrets are ¥900 for high school age and older, 10:00–16:30 with last entry at 16:00. The KAIYODO Figure Museum inside Miraiza Osaka-jo is ¥1,000 for an adult and ¥500 for a child, 9:30–17:30. Everything else in the park — the moats, the gates, the stone walls, the Miraiza building itself — is free. Fees read on ${CHECKED}.`,
  },
  {
    q: "Is Osaka Castle free with the Osaka Amazing Pass?",
    a: `Yes, and so are the four other paid facilities inside the park. The pass operator's own list covers the Osaka Castle Museum, the Nishinomaru Garden, the Osaka Castle Yagura, the KAIYODO Figure Museum at Miraiza and the Gozabune boat — ¥5,200 of gate prices for one adult against a ${PASS_1_DAY} one-day pass. Unlike the Umeda Sky Building, which the pass only covers before 15:00, none of the castle facilities carries a time-of-day restriction, though the Gozabune does require you to exchange the pass for a timed boarding slip at its own counter. Facility list read on ${CHECKED}.`,
  },
  {
    q: "Is the Osaka Amazing Pass worth it just for Osaka Castle?",
    a: `For two facilities, yes — and that is a low bar. The keep (¥1,200) plus the Gozabune boat (¥1,800) is ¥3,000 at the gate against a ${PASS_1_DAY} pass; the keep plus the garden plus the boat is ¥3,300. Either way you are ahead before a single train, and the pass also carries unlimited Osaka Metro and city buses on the day. For the keep alone it loses: ¥1,200 against ${PASS_1_DAY} only comes back if you ride enough subway to cover the gap, which a single castle trip will not. Our Osaka Amazing Pass guide works the same arithmetic across the whole city.`,
  },
  {
    q: "How do you get to Osaka Castle?",
    a: `Five stations serve it and all of them are about a 15 to 20-minute walk — the park is large and the keep is in the middle of it, so there is no short option. JR Osakajokoen on the Osaka Loop Line is the usual arrival; Morinomiya is the southern approach on both JR and the Metro; Osaka Metro Tanimachi 4-chome (Tanimachi Line exit 1-B, Chuo Line exit 9) brings you in through the Otemon gate, which is the historically correct way; Temmabashi on the Metro and the Keihan is the northern one, nearest the Gozabune; and Osaka Business Park suits anyone staying in the OBP towers. City buses stop at Osakajo Otemae and Babacho, and the river boats call at Osakajo-ko. Stations and exits read off osakacastle.net on ${CHECKED}.`,
  },
  {
    q: "When is Osaka Castle least crowded?",
    a: `Early, and outside the first fortnight of April. The tower opens at 9:00 and the museum's own site notes it may cap entry before the 17:30 cut-off when numbers are high, which tells you where the pressure is — the middle of the day. The spring peak is specific and worth avoiding or seeking out deliberately: in 2026 the Nishinomaru Garden's cherry-blossom night opening ran 20 March to 12 April, with hours extended to 21:00, last entry at 20:30 and the ¥350 ticket. That is the most beautiful fortnight on the site and by a wide margin the busiest. A weekday morning outside it is a different place.`,
  },
  {
    q: "Do you need to book Osaka Castle tickets in advance?",
    a: "No. There is no timed entry, nothing sells out, and the window at the keep sells on the day throughout opening hours. Booking ahead buys convenience: the museum has its own web booking site, and Klook's listing is the English-language route to the same admission with a foreign card and a code to scan. The two things you genuinely cannot leave until late in the day are the Gozabune boat, which has limited seats and a timed boarding slip, and a guided tour, which needs a party and a start time.",
  },
  {
    q: "Is Osaka Castle worth visiting with children?",
    a: "The pricing says yes: junior high school students and younger are free with proof of age, which makes the keep one of the cheapest major attractions in the city for a family. The practical notes are the distances and the stairs. Every station is a 15 to 20-minute walk from the keep, the museum is eight floors with a lift that gets busy, and the open approach has very little shade in midsummer. The park compensates — it is one of the few places in central Osaka where children can simply run. The Gozabune is the add-on they tend to remember, but junior-high-age children and under are not carried without an adult.",
  },
  {
    q: "Is Osaka Castle any good in the rain?",
    a: "Partly, and the split is clean. The keep is an eight-floor indoor museum, so the ¥1,200 is unaffected by weather, and the KAIYODO Figure Museum at Miraiza is indoors too. What rain takes away is the rest: the Gozabune runs on the open moat, the Nishinomaru Garden is a lawn, the turrets are reached across open ground, and the 15 to 20-minute walk from every station has no cover. On a wet day, buy the keep alone and leave the water and the garden for another one.",
  },
];

export const getStaticProps = () => ({
  props: { updated: pageUpdated("/guides/attractions/osaka-castle-tickets") },
});

const TITLE = "Osaka Castle Tickets (2026): Prices, Hours and What the Pass Covers";
const DESC =
  "Osaka Castle tickets are ¥1,200 for an adult, ¥600 for a student and free below high school, with the main tower open 9:00–18:00 and last admission at 17:30. Plus the four other paid facilities inside the park, the 15–20 minute walk from every station, and the ¥5,200 the Amazing Pass covers.";

export default function OsakaCastleTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{`${TITLE} | Japan Travel Kit`}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/osaka-castle-tickets" />
        {hreflangLinks("/guides/attractions/osaka-castle-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/osaka-castle-tickets" />
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
              route: "/guides/attractions/osaka-castle-tickets",
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
                  name: "Osaka Castle Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/osaka-castle-tickets",
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
          <span className={styles.breadCurrent}>Osaka Castle Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Osaka Castle Tickets (2026):<br />Prices, Hours and What the Pass Covers
          </h1>
          <p className={styles.heroSubtitle}>
            The keep is ¥1,200 and takes about an hour. The four other paid things inside the
            same walls are where a castle visit quietly turns into ¥5,200 — unless you are
            holding the city pass.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices, dated", "All five park facilities priced"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Main tower</p>
                <p className={styles.verdictStatValue}>¥1,200 adult, ¥600 student</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>9:00–18:00, last entry 17:30</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>How long to allow</p>
                <p className={styles.verdictStatValue}>About 60 min inside</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Getting there</p>
                <p className={styles.verdictStatValue}>15–20 min walk, any station</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> Osaka Castle tickets to the main tower are{" "}
              <strong>¥1,200</strong> for an adult, <strong>¥600</strong> for a university or high
              school student with ID, and <strong>free</strong> for junior high school students and
              younger — one ticket, which also covers the Toyotomi Stone Wall Museum. The tower is
              open <strong>9:00 to 18:00 with last admission at 17:30</strong>, closed 28 December
              to 1 January, and Osaka&apos;s official tourism site puts the visit at{" "}
              <strong>about 60 minutes</strong>. Every station is a{" "}
              <strong>15 to 20-minute walk</strong> away. The number almost nobody budgets for:
              four more paid facilities sit inside the park — the Nishinomaru Garden, the Gozabune
              boat, the Yagura turrets and the KAIYODO Figure Museum — and{" "}
              <strong>all five together are ¥5,200 at the gate, or free on a {PASS_1_DAY} Osaka
              Amazing Pass</strong>. All read on {CHECKED}.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <a href={osakaCastleTicket.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check Osaka Castle tickets on Klook →
              </a>
              <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Osaka Amazing Pass →
              </a>
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Overview</span>
          <h2 className={styles.sectionTitle}>What Does an Osaka Castle Ticket Actually Buy?</h2>
          <p className={styles.bodyText}>
            One building. The ¥1,200 ticket admits you to the <strong>Osaka Castle Museum</strong> —
            the reconstructed keep, eight floors of exhibits on Toyotomi Hideyoshi and the sieges
            that ended his line, with a lift and an observation level at the top — plus the{" "}
            <strong>Toyotomi Stone Wall Museum</strong> on the same day. That is the whole of what
            the headline ticket covers.
          </p>
          <p className={styles.bodyText}>
            Everything else at Osaka Castle is either free or separately priced, and that distinction
            is what this page is for. The moats, the gates, the Otemon approach and the Miraiza
            building at the foot of the keep all cost nothing to walk through. The garden, the
            boat on the inner moat, the turrets and the figure museum each have their own fee, their
            own earlier closing time, and their own queue. Add all five and you are at{" "}
            <strong>¥5,200</strong> for one adult inside a single set of walls — which is also why
            the castle is the strongest single argument for the city pass in Osaka. Fees read on{" "}
            {CHECKED}.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>How Much Are Osaka Castle Tickets?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Flat bands, no dynamic pricing, no advance discount — the ticket costs the same at the
            window as online. The museum&apos;s own site dates the current fee to 1 April 2025:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Who", "Admission", "Notes"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.tier}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.88rem" }}>{row.tier}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.price}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Read off osakacastle.net and Osaka&apos;s official tourism site on {CHECKED}. Subject to
            change — confirm before you buy. For the admissions we track across the rest of Japan,
            each with its own check date, see our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices" style={{ color: "var(--text)", fontWeight: 600 }}>
              Japan attraction ticket prices table
            </Link>.
          </p>
        </section>

        {/* Hours */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>When Is Osaka Castle Open?</h2>
          <p className={styles.bodyText}>
            The main tower is open <strong>9:00 to 18:00, with ticket sales and last admission
            ending at 17:30</strong> — thirty minutes before the doors close. It is shut from{" "}
            <strong>28 December to 1 January</strong> and open every other day of the year.
          </p>
          <p className={styles.bodyText}>
            One line on the museum&apos;s own site is worth reading twice: it reserves the right to{" "}
            <strong>restrict entry earlier than 17:30 when visitor numbers are high</strong>. In
            practice that makes a late-afternoon arrival in cherry-blossom season a gamble rather
            than a plan — and it is the clearest signal the operator gives about when the building
            is full. The park outside the keep has no gate and no closing time, so the walls and the
            floodlit tower are available long after the museum shuts. Hours read on {CHECKED}.
          </p>
          <div className={styles.whoForGrid} style={{ marginTop: "1.5rem" }}>
            {whoFor.map((item) => (
              <div key={item.title} className={styles.whoForCard}>
                <div className={styles.whoForIcon}>{item.icon}</div>
                <p className={styles.whoForTitle}>{item.title}</p>
                <p className={styles.whoForDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The five facilities */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Inside the walls</span>
          <h2 className={styles.sectionTitle}>What Else Inside Osaka Castle Park Costs Money?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Five paid facilities, one park. The keep is the one everybody buys; the other four are
            where the budget goes, and three of them close earlier than the tower does:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Facility", "Regular fee", "Hours", "On the pass?", "Worth knowing"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parkRows.map((row) => (
                    <tr key={row.place}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.place}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.84rem" }}>{row.fee}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.84rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.82rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Fees and hours read off the Osaka Amazing Pass operator&apos;s own facility list on{" "}
            {CHECKED}, with the Gozabune fare bands and the garden&apos;s closed days from Osaka&apos;s
            official tourism site the same day. One caveat we would rather state than hide: the
            Nishinomaru Garden is <strong>¥300</strong> on the pass operator&apos;s current list and
            still <strong>¥200</strong> on an older city tourism page, so treat the garden fee as
            ¥200–300 and confirm at the gate. Everything else in the park — the moats, the Otemon
            approach, the stone walls, the Miraiza building itself — is free.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <a href={osakaCastleTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Castle ticket on Klook →
            </a>
            <a href={osakaCastleNishinomaruWalkingTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Castle &amp; Nishinomaru walking tour →
            </a>
          </div>
        </section>

        {/* The pass question */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The pass question</span>
          <h2 className={styles.sectionTitle}>Does the Osaka Amazing Pass Pay for Itself at the Castle?</h2>
          <p className={styles.bodyText}>
            <strong>On two facilities, yes.</strong> The pass operator&apos;s list covers all five
            paid places inside Osaka Castle Park — the museum, the Nishinomaru Garden, the Yagura
            turrets, the KAIYODO Figure Museum and the Gozabune boat. That is <strong>¥5,200</strong>{" "}
            of gate prices for one adult against a <strong>{PASS_1_DAY}</strong> one-day pass, and
            unlike the Umeda Sky Building there is no time-of-day cut-off on any of them.
          </p>
          <p className={styles.bodyText}>
            The arithmetic is short. The keep plus the Gozabune is <strong>¥3,000</strong>. The keep
            plus the garden plus the boat is <strong>¥3,300</strong>. Either clears a {PASS_1_DAY}{" "}
            pass without leaving the castle grounds, with unlimited Osaka Metro and city buses left
            over for the rest of the day. For the keep alone the pass loses — ¥1,200 against{" "}
            {PASS_1_DAY} needs a lot of subway to make up — so the honest rule is: one facility, buy
            the ticket; two or more, buy the pass.
          </p>
          <p className={styles.bodyText}>
            The one trap worth knowing before you build a pass day around the castle is on the other
            side of the city. Our{" "}
            <Link href="/guides/attractions/umeda-sky-building-tickets">Umeda Sky Building tickets guide</Link>{" "}
            explains why the pass only covers that observatory <strong>before 15:00</strong>, which
            is the detail that decides the order of a pass day: Umeda deck in the morning, castle in
            the afternoon, not the reverse. Our{" "}
            <Link href="/guides/attractions/osaka-attractions-pass">Osaka Amazing Pass guide</Link>{" "}
            has the full 40-plus inclusion list, the two-day price and the two big exclusions, and{" "}
            <Link href="/guides/attractions/things-to-do-osaka">things to do in Osaka</Link> lays out
            how to split a two or three-day trip around them. Facility list read on {CHECKED}.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1.25rem" }}>
            <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Osaka Amazing Pass on Klook →
            </a>
            <a href={osakaCastleTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Just the main tower →
            </a>
          </div>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do You Get to Osaka Castle?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            Five stations serve the park and <strong>every one of them is about a 15 to 20-minute
            walk</strong> from the keep — the grounds are that big, and there is no shortcut. Which
            one you choose changes the approach rather than the distance:
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Station", "Walk to the keep", "What the approach is like"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.station}>
                      <td className={styles.tdProvider} style={{ fontSize: "0.86rem" }}>{row.station}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.86rem", whiteSpace: "nowrap" }}>{row.walk}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem" }}>
            City buses stop at Osakajo Otemae and Babacho, and the river boats call at Osakajo-ko on
            the north side. Stations and exits read off osakacastle.net on {CHECKED}; walking times
            from Osaka&apos;s official tourism site the same day. Our{" "}
            <Link href="/guides/transport/osaka-transportation">getting around Osaka guide</Link>{" "}
            explains how the Chuo and Tanimachi lines fit the rest of the network, and the{" "}
            <Link href="/guides/transport/osaka-metro-pass">Osaka Metro pass guide</Link> works out
            whether a plain day pass beats tapping an IC card if you are not buying the Amazing Pass.
          </p>
        </section>

        {/* Booking */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How to Book Osaka Castle Tickets</h2>
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
            <a href={osakaCastleTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Osaka Castle tickets on Klook →
            </a>
            <a href={osakaCastleUmedaTonboriDayTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              With the Umeda deck and the river cruise →
            </a>
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
          heading="Guided, or the Rest of the City"
          intro="An hour in the keep and an hour on the walls is half a day, and the castle sits awkwardly between Umeda and Dotonbori. The first of these is the guided version of the grounds and the garden; the second covers the castle, the Umeda deck and the river cruise in one day. Klook blocks automated price reads, so open a listing for the current figure and the meeting point."
          tours={[osakaCastleNishinomaruWalkingTour, osakaCastleUmedaTonboriDayTour, osakaSkyVistaHalfDayBusTour]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/umeda-sky-building-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="5" height="15" />
                  <rect x="15" y="6" width="5" height="15" />
                  <path d="M4 6h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Umeda Sky Building Tickets (2026): Prices, Hours and the Best Time to Go</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-attractions-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
                  <path d="M12 6v12" strokeDasharray="2 3" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Amazing Pass (2026): ¥2,500 a Day — Is It Worth It?</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/things-to-do-osaka" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3 7h-6l3-7z" />
                  <line x1="12" y1="9" x2="12" y2="21" />
                  <line x1="6" y1="21" x2="18" y2="21" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Things to Do in Osaka (2026): Where the Pass Pays and Where It Doesn&apos;t</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c3-5 9-7 14-4 2 1 3 3 4 4-3 5-9 7-14 4-2-1-3-3-4-4z" />
                  <circle cx="8" cy="11" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Aquarium Kaiyukan Tickets (2026): Prices, Hours and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/usj-tickets-express-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17c4 0 4-9 9-9s5 9 9 9" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Universal Studios Japan Tickets &amp; Express Pass (2026): What to Buy</p>
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
            <Link href="/guides/transport/osaka-metro-pass" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="6" width="16" height="12" rx="2" />
                  <path d="M4 11h16" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Metro Pass 2026: Price, 1-Day vs 2-Day &amp; Enjoy Eco Card Compared</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16v5a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z" />
                  <path d="M9 10h6M9 14h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Japan Attraction Ticket Prices 2026: Official Prices and Booking Rules</p>
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
            <h2 className={styles.ctaBannerTitle}>One facility or five?</h2>
            <p className={styles.ctaBannerDesc}>
              That is the only question that costs you money here. The keep alone is ¥1,200 and the
              single ticket is the right buy. Add the boat, the garden or the turrets and the city
              pass is cheaper before you leave the walls — and it carries the subway too. Check the
              cancellation window shown on your own booking before you pay.
            </p>
            <div className={styles.pickCtaRow}>
              <a href={osakaCastleTicket.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View Osaka Castle tickets on Klook →
              </a>
              <a href={osakaAmazingPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Osaka Amazing Pass →
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
