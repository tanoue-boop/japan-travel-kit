import Head from "next/head";
import Link from "next/link";
import KlookTourPicks from "../../../components/KlookTourPicks";
import KlookTripPrep from "../../../components/KlookTripPrep";
import GygCompare, { GygCompareButton } from "../../../components/GygCompare";
import styles from "../../../styles/BestEsimJapan.module.css";
import KlookLink from "../../../components/KlookLink";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { articleJsonLd } from "../../../lib/structured-data";
import { hreflangLinks } from "../../../components/Hreflang";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  legolandJapanHotelPackage,
  legolandJapanSkipPass,
  legolandJapanTicket,
  legolandJapanTripPrep,
  shoryudoHighwayBusPass,
} from "../../../lib/klook-links";
import { gygLegolandJapan, gygNagoyaEntryTickets } from "../../../lib/gyg-links";

/**
 * LEGOLAND Japan Tickets — the second of the two Nagoya-area guides added
 * 26 Oct 2026, and the one where the pricing is genuinely date-variable.
 *
 * Every price, hour, age band and closure below is the operator's own, and every
 * transport figure the railway's own. Nothing is estimated:
 *
 *   legoland.jp/en/tickets/        the 1 Day Pass, the LEGOLAND + SEA LIFE combo   26 Oct 2026
 *                                  and the SEA LIFE-only prices, the 3–18 / 19+
 *                                  age split, the "vary by date" note, and the
 *                                  Overnight Plan starting price
 *   legoland.jp/en/                LEGOLAND 10:00–17:00, SEA LIFE 11:00–18:00      26 Oct 2026
 *   legoland.jp FAQ (About Park)   ages 2 to 12 with their family; "over 40        26 Oct 2026
 *                                  rides, live shows and attractions"
 *   legoland.jp closure page       the dated attraction closures, and that no      26 Oct 2026
 *                                  park-wide closure days are listed
 *   aonamiline.co.jp               Nagoya → Kinjofuto: 24 minutes, 15.2 km,        26 Oct 2026
 *                                  ¥360 adult / ¥180 child
 *
 * Every price here is printed with the operator's own "~", because LEGOLAND
 * states its online rates vary by date — a single figure would be wrong on most
 * days of the year. No Klook or GetYourGuide price appears: both answer automated
 * reads of their product pages with HTTP 403.
 *
 * Commission note: the 1-Day Pass is a park admission, so the headline Klook CTA
 * is the LEGOLAND Japan Hotel package and GetYourGuide sits beside the ticket.
 */

/** The date every figure on this page was read off the official sites. */
const OWN = checkedLabel("2026-10-26");

const priceRows = [
  {
    ticket: "LEGOLAND Japan 1 Day Pass",
    adult: "¥4,900~ (19+)",
    child: "¥3,700~ (3–18)",
    note: "Park admission on its own, over 40 rides, shows and attractions",
  },
  {
    ticket: "LEGOLAND + SEA LIFE 1 Day Combo",
    adult: "¥5,700~",
    child: "¥4,500~",
    note: "Both venues on the same day — SEA LIFE Nagoya is at the resort entrance",
  },
  {
    ticket: "SEA LIFE Nagoya only",
    adult: "¥1,800~",
    child: "¥1,400~",
    note: "The aquarium without the park, for a half day or a wet afternoon",
  },
  {
    ticket: "Overnight Plan (hotel + 2 Day Combo)",
    adult: "¥16,150~ per person",
    child: "¥16,150~ per person",
    note: "The operator's own hotel package, with breakfast and two-day combo tickets included",
  },
];

const hoursRows = [
  { venue: "LEGOLAND Japan", hours: "10:00 – 17:00", note: "The operator's stated opening time; it publishes an operation calendar with date-specific hours and notes hours may change without notice" },
  { venue: "SEA LIFE Nagoya Aquarium", hours: "11:00 – 18:00", note: "Opens an hour later and closes an hour later than the park — which is what makes the combo work as an end to the day" },
];

const closureRows = [
  { item: "Anchors Away", when: "30 November – 11 December 2026" },
  { item: "Rebuild the World Center", when: "4 – 19 November 2026" },
  { item: "Lost Kingdom Adventure", when: "9 – 13 November 2026" },
  { item: "Lloyd's Spinjitzu Spinners", when: "Closed since 16 May 2025, “for the time being”" },
];

const faqItems = [
  {
    q: "How much are LEGOLAND Japan tickets?",
    a: `The operator's own online rates start at ¥4,900~ for an adult 1 Day Pass and ¥3,700~ for a child aged 3 to 18, with the LEGOLAND and SEA LIFE Nagoya combo from ¥5,700~ and ¥4,500~, and SEA LIFE on its own from ¥1,800~ and ¥1,400~. Read on ${OWN}. The “~” is LEGOLAND's, not ours: the park states these are online promotional rates that vary by date, and it publishes a price list and calendar for date-specific figures — so a single number for “a LEGOLAND Japan ticket” would be wrong on most days of the year. Note the unusual age split too: “child” runs to 18 and “adult” starts at 19, which is cheaper than most Japanese parks for a teenager.`,
  },
  {
    q: "Is LEGOLAND Japan worth it for adults?",
    a: `Judge it against what the park says it is for rather than against other theme parks. LEGOLAND Japan's own FAQ describes it as a park “enjoyed by children from 2 to 12 years of age along with their entire family”, with over 40 rides, live shows and attractions and a MINILAND built from Lego bricks — it is a family park that happens to admit adults, not a park aimed at them. Two concrete signals point the same way: the adult band only begins at 19, so the pricing treats an 18-year-old as a child; and at least one attraction, The Beetle Bounce, is restricted to passengers under the age of 16. Read on ${OWN}. If you are travelling without children, the honest answer is that Nagoya has cheaper ways to spend a day and Ghibli Park is the one in the region built for adult visitors as much as young ones.`,
  },
  {
    q: "What age is LEGOLAND Japan for?",
    a: `The operator's own answer is children aged 2 to 12 with their family, which is narrower than most big parks and is the single most useful fact on this page. Ticketing uses a different split again — children are 3 to 18 and adults 19 and over — so a 2-year-old is inside the target age but a 3-year-old is the youngest paying visitor. Individual rides have their own limits on top: the park publishes a facility and attraction status page, which as we read it on ${OWN} listed The Beetle Bounce as restricted to passengers under 16. If your children are older than about 12, check the ride list against their heights and interests before you buy.`,
  },
  {
    q: "How do I get to LEGOLAND Japan from Nagoya Station?",
    a: `Take the Aonami Line from Nagoya Station to its southern terminus, Kinjofuto, which is adjacent to the resort. Aonami's own fare table gives the journey as 24 minutes over 15.2 km, at ¥360 for an adult and ¥180 for a child, read on ${OWN}. There is no transfer and no other train: the Aonami Line is the only railway to Kinjofuto, which also means it is the only railway out again at the end of the day, so check the last departures against the park's 17:00 close and SEA LIFE's 18:00 one. From Tokyo or Osaka, take the Tokaido Shinkansen to Nagoya — the Aonami Line platforms are in the same station complex.`,
  },
  {
    q: "What are LEGOLAND Japan's opening hours and closed days?",
    a: `The operator states LEGOLAND Japan at 10:00–17:00 and SEA LIFE Nagoya Aquarium at 11:00–18:00, and notes that hours may change without notice; it publishes an operation calendar with date-specific hours. As we read its facility closure page on ${OWN}, no park-wide closure days were listed at all — unlike Ghibli Park, which closes every Tuesday. What the closure page does list is individual attractions out of service, which is the thing actually worth checking before a date: Anchors Away was down from 30 November to 11 December 2026, Rebuild the World Center from 4 to 19 November 2026, Lost Kingdom Adventure from 9 to 13 November 2026, and Lloyd's Spinjitzu Spinners had been closed since 16 May 2025 “for the time being”.`,
  },
  {
    q: "Is the SEA LIFE Nagoya combo ticket worth adding?",
    a: `On the listed starting prices, the combo is ¥800 more than the park alone for both an adult and a child — ¥5,700~ against ¥4,900~, and ¥4,500~ against ¥3,700~ — while a SEA LIFE-only ticket starts at ¥1,800~ for an adult and ¥1,400~ for a child. Read on ${OWN}. Both sets of figures are “from” prices that vary by date, so check your own date rather than assuming the ¥800 gap holds. The timing argument is stronger than the price one anyway: SEA LIFE is open until 18:00 against the park's 17:00, and it sits at the resort entrance, so it absorbs the hour after the park shuts rather than competing with it.`,
  },
  {
    q: "Should I buy a Skip Pass for LEGOLAND Japan?",
    a: `Only for a date in a Japanese school holiday or a long weekend, and only if your children have two or three must-ride attractions. The Skip Pass is sold separately from admission — in a three-ride pack or an unlimited version — and it does not include park entry, so it is an addition to a 1 Day Pass rather than an alternative to one. It is also worth checking the attraction closure page first: a Skip Pass is worth less on a date when one of the headline rides is out of service, and the operator publishes those dates in advance.`,
  },
  {
    q: "Is it worth staying at the LEGOLAND Japan Hotel?",
    a: `It answers a real problem with this park, which is that 10:00 to 17:00 is a short day for a family that has travelled to Nagoya to get there. The operator sells an Overnight Plan from ¥16,150~ per person that includes breakfast and two-day combo tickets, read on ${OWN} — so the comparison is not “hotel versus no hotel” but “one day plus a hotel night versus two park days with the Aonami Line twice”. If you are coming from Tokyo or Osaka by shinkansen, that second morning is usually the difference between seeing the park and rushing it.`,
  },
  {
    q: "Can I do LEGOLAND Japan and Ghibli Park on the same trip?",
    a: `Yes, on separate days. They are on opposite sides of Nagoya: LEGOLAND is south-west at Kinjofuto on the Aonami Line, 24 minutes from Nagoya Station, and Ghibli Park is east, reached via the Higashiyama subway line to Fujigaoka and then the Linimo. Both are full-day parks closing at 17:00, so a single day would short-change both. A Nagoya Station base is the clean answer, since both runs start there — and plan around Ghibli Park's Tuesday closure first, because that one is fixed while LEGOLAND's pricing moves by date.`,
  },
];

const TITLE = "LEGOLAND Japan Tickets (2026): Prices and Is It Worth It?";
const DESCRIPTION =
  "LEGOLAND Japan tickets in 2026: the 1 Day Pass and SEA LIFE combo prices, the 2-to-12 target age, and the 24-minute Aonami Line run from Nagoya.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/legoland-japan-tickets") } });

export default function LegolandJapanTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/legoland-japan-tickets" />
        {hreflangLinks("/guides/attractions/legoland-japan-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/legoland-japan-tickets" />
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
              route: "/guides/attractions/legoland-japan-tickets",
              headline: "LEGOLAND Japan Tickets (2026): Prices and Is It Worth It?",
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
                  name: "LEGOLAND Japan Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/legoland-japan-tickets",
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
          <span className={styles.breadCurrent}>LEGOLAND Japan Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            LEGOLAND Japan Tickets (2026):<br />Prices, Hours and Is It Worth It?
          </h1>
          <p className={styles.heroSubtitle}>
            A park built for 2 to 12-year-olds, priced by calendar date, 24 minutes from Nagoya Station —
            and closing at 17:00, which is the part that decides your booking.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Operator prices", "Ages 2–12"].map((t) => (
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
                <p className={styles.verdictStatLabel}>1 Day Pass</p>
                <p className={styles.verdictStatValue}>¥4,900~ adult / ¥3,700~ child</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Built for</p>
                <p className={styles.verdictStatValue}>Ages 2–12 and their family</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Hours</p>
                <p className={styles.verdictStatValue}>10:00–17:00 (SEA LIFE to 18:00)</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>From Nagoya Station</p>
                <p className={styles.verdictStatValue}>Aonami Line, 24 min, ¥360</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> the operator&apos;s online rates start at ¥4,900~ for an adult and
              ¥3,700~ for a child aged 3 to 18, and they vary by date — so price your own date rather than
              a headline figure. The park runs 10:00 to 17:00, which is short enough that the hotel package
              with two-day tickets is the booking worth comparing if you have travelled to get there.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={legolandJapanHotelPackage.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the LEGOLAND Japan Hotel →
              </KlookLink>
              <KlookLink href={legolandJapanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Check LEGOLAND Japan tickets →
              </KlookLink>
              <GygCompareButton slug="legoland-japan-tickets" listing={gygLegolandJapan} />
            </div>
          </div>
        </div>

        {/* Answer-first intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>What Do LEGOLAND Japan Tickets Cost?</h2>
          <p className={styles.bodyText}>
            <strong>LEGOLAND Japan tickets</strong> start at <strong>¥4,900~</strong> for an adult 1 Day Pass
            and <strong>¥3,700~</strong> for a child, with the LEGOLAND and SEA LIFE Nagoya combo from{" "}
            <strong>¥5,700~</strong> and <strong>¥4,500~</strong> — the operator&apos;s own online rates,
            which it states <strong>vary by date</strong>, read on {OWN}. The age split is unusual and worth
            knowing: a child is <strong>3 to 18</strong> and an adult <strong>19 and over</strong>, while the
            park describes itself as built for <strong>children aged 2 to 12 with their family</strong>, with
            over 40 rides, live shows and attractions. It is in Nagoya&apos;s Minato ward, reached only by the{" "}
            <strong>Aonami Line</strong> — <strong>24 minutes</strong> and <strong>¥360</strong> from Nagoya
            Station to Kinjofuto, which is next to the gates. Opening hours are{" "}
            <strong>10:00 to 17:00</strong>, with SEA LIFE Nagoya 11:00 to 18:00.
          </p>
          <p className={styles.bodyText}>
            The rest of this page is the part a price cannot tell you: which ticket to pick for your party,
            what the date-based pricing means in practice, which attractions are out of service on the dates
            the operator has already published, and why a 17:00 close changes the booking decision for anyone
            arriving by shinkansen.
          </p>
        </section>

        {/* Prices */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>LEGOLAND Japan Ticket Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Ticket", "Adult (19+)", "Child (3–18)", "What it is"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.ticket}>
                      <td className={styles.tdProvider}>{row.ticket}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.adult}</td>
                      <td style={{ whiteSpace: "nowrap", fontSize: "0.88rem" }}>{row.child}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            LEGOLAND Japan&apos;s own ticket page, read on {OWN}. The &ldquo;~&rdquo; is the operator&apos;s:
            these are online promotional rates and it states they vary by date, with a price list and calendar
            published for date-specific figures. The Overnight Plan figure is per person and includes
            breakfast and two-day combo tickets. There is no standalone 2 Day Pass price on the ticket page —
            the two-day product is sold inside that hotel plan. These sit alongside every other attraction we
            have checked in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">
              Japan attraction ticket prices table
            </Link>
            .
          </p>
        </section>

        {/* Hours */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>Opening Hours and Closed Days</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The hour&apos;s difference between the two venues is the one scheduling fact worth building the
            day around — SEA LIFE is still open after the park has shut.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Venue", "Hours", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hoursRows.map((row) => (
                    <tr key={row.venue}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.venue}</td>
                      <td className={styles.tdPrice} style={{ whiteSpace: "nowrap" }}>{row.hours}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText}>
            On closed days the answer is unusual for a Japanese theme park: as we read LEGOLAND&apos;s own
            facility closure page on {OWN}, <strong>no park-wide closure days were listed at all</strong> —
            unlike Ghibli Park an hour east, which closes every Tuesday. What the page does list is individual
            attractions out of service, and those are the dates actually worth checking before you commit.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Attraction", "Closed"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {closureRows.map((row) => (
                    <tr key={row.item}>
                      <td className={styles.tdProvider}>{row.item}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The closure list as published on {OWN}; the operator updates it, so check it again for your own
            date. It also noted The Beetle Bounce as restricted to passengers under the age of 16, and that
            no other facilities had scheduled closures. Hours may change without notice.
          </p>
        </section>

        {/* Who it's for */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Who it suits</span>
          <h2 className={styles.sectionTitle}>What Age Is LEGOLAND Japan For?</h2>
          <p className={styles.bodyText}>
            <strong>Children aged 2 to 12, with their family</strong> — the operator&apos;s own words on its
            About Park FAQ, read on {OWN}. That is a narrower band than most large parks state, and it is the
            most useful fact on this page, because it answers the question most comparisons dodge.
          </p>
          <p className={styles.bodyText}>
            Ticketing then uses a different split again: a child is 3 to 18 and an adult 19 and over. So a
            two-year-old is squarely in the target age but a three-year-old is the youngest paying visitor,
            and a teenager pays the child rate. Individual rides carry their own limits on top — the
            operator&apos;s facility status page listed The Beetle Bounce as restricted to under-16s when we
            read it. If your children are over about 12, read the ride list before you buy rather than after.
          </p>
        </section>

        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Head to head</span>
          <h2 className={styles.sectionTitle}>Is LEGOLAND Japan Worth It for Adults?</h2>
          <p className={styles.bodyText}>
            <strong>Judge it against what the park says it is for.</strong> LEGOLAND Japan describes itself
            as a park enjoyed by children from 2 to 12 along with their entire family, with over 40 rides,
            live shows and attractions and a MINILAND of Japanese landmarks in Lego. It is a family park that
            admits adults rather than one aimed at them.
          </p>
          <p className={styles.bodyText}>
            Two of its own facts point the same way: the adult price band only starts at 19, and at least one
            attraction is restricted to passengers under 16. If you are travelling without children, the
            honest answer is that the region has better uses for a day — and the obvious one is{" "}
            <Link href="/guides/attractions/ghibli-park-tickets">Ghibli Park</Link>, an hour east of Nagoya,
            which is built for adult visitors as much as for young ones and has a very different booking
            problem. If you are travelling with children in that 2-to-12 band, the question is not whether
            the park is worth it but whether one 10:00-to-17:00 day is enough of it.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={legolandJapanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check LEGOLAND Japan tickets on Klook →
            </KlookLink>
            <KlookLink href={legolandJapanSkipPass.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Skip Pass →
            </KlookLink>
            <GygCompareButton slug="legoland-japan-tickets" listing={gygLegolandJapan} />
          </div>
        </section>

        {/* Getting there */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to LEGOLAND Japan From Nagoya Station?</h2>
          <p className={styles.bodyText}>
            <strong>The Aonami Line to Kinjofuto, which is next to the gates.</strong> Aonami&apos;s own fare
            table gives Nagoya to Kinjofuto as <strong>24 minutes</strong> over <strong>15.2 km</strong>, at{" "}
            <strong>¥360</strong> for an adult and <strong>¥180</strong> for a child — read on {OWN}. No
            transfer, and no alternative: the Aonami Line is the only railway that reaches Kinjofuto.
          </p>
          <p className={styles.bodyText}>
            That single-line access is worth a thought at the end of the day rather than the start. The park
            closes at 17:00 and SEA LIFE at 18:00, and everyone leaving is on the same train — so if your
            evening involves a shinkansen out of Nagoya, leave more slack than the 24 minutes suggests. From
            Tokyo or Osaka the Tokaido Shinkansen puts you in the same station complex as the Aonami Line
            platforms; our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers the booking and
            the luggage rules for that leg.
          </p>
        </section>

        {/* Klook supporting block */}
        <KlookTripPrep
          label="Booked alongside"
          heading="What Else Does a LEGOLAND Japan Day Need Booked?"
          intro="The ticket is the easy part — it is on sale for any date. What actually decides the day is whether you have one 10:00-to-17:00 window or two, and where you sleep the night before."
          items={legolandJapanTripPrep}
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

        {/* Second seller */}
        <GygCompare
          slug="legoland-japan-tickets"
          heading="Where Else Is the Ticket Sold?"
          intro="A park admission is the one product where a second seller is worth opening before you buy: LEGOLAND prices its own online rates by date, and the resellers bundle differently — combos, transfers and skip-the-line are packaged in ways the park's own page does not offer. These open a list rather than a checkout."
          listings={[gygLegolandJapan, gygNagoyaEntryTickets]}
        />

        {/* Klook tours */}
        <KlookTourPicks
          heading="The Rest of a Nagoya Trip"
          intro="A 17:00 close leaves an evening, and a travel day either side. These are the bookings that follow — the hotel at the resort gates, the queue-skip for a school-holiday date, and the regional pass if LEGOLAND is one stop of a Chubu trip."
          tours={[legolandJapanHotelPackage, legolandJapanSkipPass, shoryudoHighwayBusPass]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17h18M5 17V9a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v8" />
                  <path d="M9 9h6" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo to Nagoya Shinkansen: Times, Fares, JR Pass</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/ghibli-park-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Ghibli Park Tickets (2026): Prices, When They Go On Sale and How to Buy From Overseas</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/sanrio-puroland-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Sanrio Puroland Tickets (2026): Prices, Hours and How to Book</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/tokyo-joypolis-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="11" rx="4" />
                  <path d="M7 12h3M8.5 10.5v3M15 11h.01M17.5 13.5h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Joypolis Tickets (2026): Passport Prices, Hours and Height Limits</p>
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
                <p className={styles.relatedTitle}>Japan 14 Day Itinerary (2026): Two Weeks, Day by Day</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c4-6 14-6 18 0-4 6-14 6-18 0z" />
                  <circle cx="9" cy="12" r="1" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Osaka Aquarium Kaiyukan Tickets (2026): Prices, Hours and Time Slots</p>
                <span className={styles.relatedArrow}>Read guide →</span>
              </div>
            </Link>
            <Link href="/guides/transport/shinkansen-guide" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15V7a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" />
                  <path d="M4 15h16M7 19l-2 2M17 19l2 2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Shinkansen Guide (2026): How to Book, Seat Classes and Luggage Rules</p>
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
            <h2 className={styles.ctaBannerTitle}>Price your own date, not a headline</h2>
            <p className={styles.ctaBannerDesc}>
              LEGOLAND Japan&apos;s own rates move with the calendar, and the park shuts at 17:00. Compare a
              single-day ticket against the hotel package with two-day tickets before you decide which one
              your trip actually needs.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={legolandJapanHotelPackage.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the LEGOLAND Japan Hotel →
              </KlookLink>
              <KlookLink href={legolandJapanTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                View LEGOLAND Japan tickets →
              </KlookLink>
              <GygCompareButton slug="legoland-japan-tickets" listing={gygLegolandJapan} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
