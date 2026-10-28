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
  ghibliParkNagoyaBusTour,
  ghibliParkTicket,
  ghibliParkTicketHotelPackage,
  ghibliParkTripPrep,
  shoryudoHighwayBusPass,
} from "../../../lib/klook-links";
import { gygGhibliPark, gygNagoyaEntryTickets } from "../../../lib/gyg-links";

/**
 * Ghibli Park Tickets — the first Nagoya-area guide on this site.
 *
 * Every price, sale rule, opening hour and closed day below comes from the park's
 * own site, and every transport figure from the operator that runs the service.
 * Nothing here is first-hand and nothing is estimated:
 *
 *   ghibli-park.jp/en/ticket/     the two O-Sanpo Day Passes and their weekday     26 Oct 2026
 *                                 and weekend prices; the sale date and time; the
 *                                 two named sellers; the Grand Warehouse entry
 *                                 times; the ID rule; the same-day building tickets
 *   ghibli-park.jp/calendar/      hours, and the weekly Tuesday closure            26 Oct 2026
 *   ghibli-park.jp/en/directions/ the Linimo route and the Meitetsu shuttle        26 Oct 2026
 *   meitetsu-bus.co.jp            the direct bus: 40 minutes, ¥1,200 / ¥600, and   26 Oct 2026
 *                                 that it runs only on park opening days
 *   linimo.jp                     Fujigaoka → Ai-Chikyuhaku Kinen Koen fare        26 Oct 2026
 *
 * Deliberately absent: a Linimo journey time (neither the operator's Japanese nor
 * its English station pages publish one), and any Klook or GetYourGuide price —
 * both answer automated reads of their product pages with HTTP 403.
 *
 * Commission note: the park ticket itself is a park admission, so the headline
 * Klook CTAs are the Nagoya bus tour and the ticket-plus-hotel package, with
 * GetYourGuide beside the bare ticket. See lib/klook-links.ts.
 */

/** The date every figure on this page was read off the official sites. */
const OWN = checkedLabel("2026-10-26");

const priceRows = [
  {
    pass: "O-Sanpo Day Pass Standard",
    covers: "Ghibli's Grand Warehouse, Mononoke Village and Valley of Witches",
    adult: "¥3,300 weekday / ¥3,800 weekend & holiday",
    child: "¥1,650 / ¥1,900 (ages 4–12)",
  },
  {
    pass: "O-Sanpo Day Pass Premium",
    covers:
      "All five areas, plus the interiors of World Emporium, Satsuki and Mei's House, Okino Residence, Howl's Castle and The House of Witches",
    adult: "¥7,300 weekday / ¥7,800 weekend & holiday",
    child: "¥3,650 / ¥3,900 (ages 4–12)",
  },
];

const areaRows = [
  {
    area: "Ghibli's Grand Warehouse",
    pass: "Standard and Premium",
    note: "The indoor centrepiece, and the only area with a designated entry time on your ticket. Premium adds the World Emporium interior",
  },
  {
    area: "Valley of Witches",
    pass: "Standard and Premium",
    note: "Standard gets you into the area; Howl's Castle, Okino Residence and The House of Witches are Premium, or limited same-day tickets sold inside the area",
  },
  {
    area: "Mononoke Village",
    pass: "Standard and Premium",
    note: "The outdoor village, included on both passes",
  },
  {
    area: "Hill of Youth",
    pass: "Premium only",
    note: "Not on the Standard pass at all",
  },
  {
    area: "Dondoko Forest",
    pass: "Premium only",
    note: "Satsuki and Mei's House is here, and its interior is a Premium inclusion",
  },
];

const accessRows = [
  {
    route: "Meitetsu direct bus from Nagoya Station",
    detail:
      "Meitetsu Bus Center (Nagoya Station) to Ai-Chikyuhaku Kinen Koen, non-stop. The operator's own figure is 40 minutes, ¥1,200 for an adult and ¥600 for a child",
    catch:
      "Runs only on days Ghibli Park is open, and the direct buses are suspended on closure days. Nine services on weekdays (seven non-stop) from 08:20; ten at weekends and on holidays, all non-stop, from 07:55",
  },
  {
    route: "Subway + Linimo",
    detail:
      "Nagoya Station to Fujigaoka, the eastern terminus of the Higashiyama subway line, then the Linimo (Aichi Rapid Transit Tobu Kyuryo Line) to Ai-Chikyuhaku Kinen Koen. Linimo's own fare for that leg is ¥400 for an adult and ¥200 for a child",
    catch:
      "The park is immediately outside the station at Exit 2. Neither Linimo's Japanese nor its English station pages publish a journey time for the leg, so we do not state one",
  },
  {
    route: "From Tokyo or Osaka",
    detail:
      "The Tokaido Shinkansen to Nagoya, then either of the two routes above — the Meitetsu Bus Center is in the Nagoya Station complex and the Higashiyama subway line runs beneath it",
    catch:
      "Worth checking the park's calendar before the train: a Tuesday arrival is a closed day, and the direct bus does not run on closed days either",
  },
];

const buySteps = [
  {
    title: "Work out which month your date is in — tickets appear two months ahead",
    desc: "The park's own ticket page states that tickets go on sale two months in advance, on the 10th, at 2 p.m. Japan time. So a date in, say, March opens on 10 January at 14:00 JST. There is no rolling daily release to wait for: it is one date, once a month.",
  },
  {
    title: "Pick Standard or Premium before the clock, not after",
    desc: "Premium is roughly double the Standard price and is the only way into Hill of Youth, Dondoko Forest and the five named building interiors. Decide first — at 2 p.m. on the 10th you want to be choosing a time slot, not a pass type.",
  },
  {
    title: "Buy from one of the two sellers the park names",
    desc: "For overseas buyers, the park's English ticket page names LAWSON TICKET and Klook. Both sell online and both are accessible from outside Japan; tickets are not sold at the park gates at all.",
  },
  {
    title: "Choose the Grand Warehouse entry time",
    desc: "Ghibli's Grand Warehouse is the one area with a designated entry time. The park lists 9 a.m., 10, 11, 12, 1 p.m. and 2 p.m., with the 9 a.m. slot available only on days the park opens at 9. You must be inside the Grand Warehouse no later than one hour after your reservation time.",
  },
  {
    title: "Travel with the passport that matches the booking",
    desc: "The park states you may be selected at random to show identification on entry, that the person named on the tickets must be present and able to provide ID, and that buying tickets on behalf of other visitors is prohibited. It asks you to bring your passport. No refunds, and no changes to dates, times, pass types or quantities.",
  },
];

const faqItems = [
  {
    q: "How do I buy Ghibli Park tickets from overseas?",
    a: `Online, from one of the two sellers the park itself names: LAWSON TICKET or Klook. There is no third option — Ghibli Park states that tickets are not sold at the park, so there is nothing to buy on arrival. Book the exact date, the pass type (Standard or Premium) and an entry time for Ghibli's Grand Warehouse, then travel with the passport matching the name on the booking: the park says you may be selected at random to show identification, that the named person must be present, and that buying tickets on behalf of other visitors is prohibited. No refunds and no changes to date, time, pass type or quantity are accepted. All read on ${OWN}.`,
  },
  {
    q: "When do Ghibli Park tickets go on sale?",
    a: `Two months in advance, on the 10th of the month, at 2 p.m. Japan time — the park's own published rule, read on ${OWN}. That is a single release, not a rolling one: every date in a given month appears at the same moment. A date in March therefore goes on sale at 14:00 JST on 10 January. If you are booking from another time zone, convert that one time rather than checking the site repeatedly, and decide between the Standard and Premium passes beforehand so the only decision left at 2 p.m. is the entry slot.`,
  },
  {
    q: "Do Ghibli Park tickets sell out?",
    a: `Yes — the practical answer is to treat the 2 p.m. release as the moment to book, not a window that stays open. The park sells a fixed number of date- and slot-specified passes with no gate sales at all, which is the structural reason popular dates go. Two published facts tell you how tight it is. The same-day tickets for Okino Residence, Howl's Castle and The House of Witches, sold inside Valley of Witches to Standard pass holders, are explicitly limited and the park states sales end once the day's tickets are sold out. And GetYourGuide, which resells the Premium pass, states on its own Ghibli Park listing that tickets are limited and cannot be guaranteed at the moment you book. Read on ${OWN}.`,
  },
  {
    q: "How do I get to Ghibli Park from Nagoya or Tokyo?",
    a: `From Nagoya there are two routes. Meitetsu runs a direct bus from the Meitetsu Bus Center at Nagoya Station to Ai-Chikyuhaku Kinen Koen in 40 minutes for ¥1,200 for an adult and ¥600 for a child — but only on days the park is open. The rail route is the Higashiyama subway line to its eastern terminus at Fujigaoka, then the Linimo to Ai-Chikyuhaku Kinen Koen, where the park is immediately outside Exit 2; Linimo's fare for that leg is ¥400 for an adult and ¥200 for a child. From Tokyo or Osaka, take the Tokaido Shinkansen to Nagoya and then one of those two — the bus terminal and the subway are both in the Nagoya Station complex. Operator figures read on ${OWN}; neither Linimo page publishes a journey time, so we do not quote one.`,
  },
  {
    q: "How much are Ghibli Park tickets?",
    a: `The Standard O-Sanpo Day Pass is ¥3,300 for an adult on a weekday and ¥3,800 at a weekend or on a public holiday, with children aged 4 to 12 at ¥1,650 and ¥1,900. The Premium pass is ¥7,300 and ¥7,800 for an adult, and ¥3,650 and ¥3,900 for a child. Children aged 0 to 3 are free on both. The park's own English ticket page, read on ${OWN}. The split matters more than the money: Standard covers Ghibli's Grand Warehouse, Mononoke Village and Valley of Witches, while Premium adds Hill of Youth and Dondoko Forest and the interiors of five buildings.`,
  },
  {
    q: "Is the Premium pass worth it over the Standard pass?",
    a: `It depends on whether you want to go inside the buildings. Premium is the only pass that includes the interiors of World Emporium, Satsuki and Mei's House, Okino Residence, Howl's Castle and The House of Witches, and the only one that covers Hill of Youth and Dondoko Forest at all. If those are the images you came for, Standard will not get you there — and the fallback is thin: Standard holders can buy same-day tickets for three of those buildings inside Valley of Witches, but the park states the numbers are limited and sales stop when the day's allocation is gone. If your plan is really about Ghibli's Grand Warehouse, Standard at ¥3,300 to ¥3,800 does that job.`,
  },
  {
    q: "What time does Ghibli Park open and when is it closed?",
    a: `The park's own calendar gives 10:00 to 17:00 on weekdays and 9:00 to 17:00 at weekends and on public holidays, and lists the closed days as every Tuesday — the following weekday when a Tuesday is a public holiday — plus the New Year period and designated maintenance days. Read on ${OWN}. Two knock-on effects are worth planning around: the 9 a.m. Grand Warehouse entry slot only exists on days the park opens at 9, which means weekends and holidays; and Meitetsu's direct bus from Nagoya Station does not run on closed days, so a Tuesday is not simply a quieter visit.`,
  },
  {
    q: "How long do you need at Ghibli Park?",
    a: `Plan a full day if you are on the Premium pass, and most of one on Standard. The reason is the geography rather than the queueing: the five areas are spread across the former Expo 2005 park, and Premium adds the two furthest of them, Hill of Youth and Dondoko Forest, plus five building interiors. Your Grand Warehouse entry time anchors the day — you have to be inside within an hour of it — so build the rest around that slot, and note the 17:00 close applies whichever pass you hold.`,
  },
  {
    q: "Can I visit Ghibli Park and LEGOLAND Japan on the same trip?",
    a: `Easily, but not on the same day. They are on opposite sides of Nagoya — Ghibli Park is east, reached via Fujigaoka and the Linimo, and LEGOLAND Japan is south-west on the Aonami Line at Kinjofuto — and both are full-day parks with a 17:00 close. Two days with a Nagoya Station base is the clean version, since both runs start there. Ghibli Park's Tuesday closure is the thing to plan around first, because it is fixed, while LEGOLAND prices by calendar date — so book the Ghibli date, then fit LEGOLAND around it.`,
  },
];

const TITLE = "Ghibli Park Tickets (2026): Prices and How to Buy Abroad";
const DESCRIPTION =
  "Ghibli Park tickets in 2026: Standard and Premium O-Sanpo Day Pass prices, the 2 p.m. sale two months ahead, and the 2 sellers the park names overseas.";

export const getStaticProps = () => ({ props: { updated: pageUpdated("/guides/attractions/ghibli-park-tickets") } });

export default function GhibliParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href="https://www.japan-travel-kit.com/guides/attractions/ghibli-park-tickets" />
        {hreflangLinks("/guides/attractions/ghibli-park-tickets")}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:url" content="https://www.japan-travel-kit.com/guides/attractions/ghibli-park-tickets" />
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
              route: "/guides/attractions/ghibli-park-tickets",
              headline: "Ghibli Park Tickets (2026): Prices and How to Buy Abroad",
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
                  name: "Ghibli Park Tickets",
                  item: "https://www.japan-travel-kit.com/guides/attractions/ghibli-park-tickets",
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
          <span className={styles.breadCurrent}>Ghibli Park Tickets</span>
        </div>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Updated {updated.label}</p>
          <h1 className={styles.heroTitle}>
            Ghibli Park Tickets (2026):<br />Prices, When They Go On Sale and How to Buy From Overseas
          </h1>
          <p className={styles.heroSubtitle}>
            There are no gate sales. Everything depends on being ready at 2 p.m. Japan time on the 10th of
            the month, two months before your date.
          </p>
          <div className={styles.heroBadges}>
            {[`Updated ${updated.label}`, "Official prices", "Sale date & time"].map((t) => (
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
                <p className={styles.verdictStatLabel}>Standard pass (adult)</p>
                <p className={styles.verdictStatValue}>¥3,300 / ¥3,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Premium pass (adult)</p>
                <p className={styles.verdictStatValue}>¥7,300 / ¥7,800</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>On sale</p>
                <p className={styles.verdictStatValue}>2 months ahead, 10th, 14:00 JST</p>
              </div>
              <div className={styles.verdictStat}>
                <p className={styles.verdictStatLabel}>Gate sales</p>
                <p className={styles.verdictStatValue}>None at all</p>
              </div>
            </div>
            <p className={styles.verdictText}>
              <strong>In short:</strong> buy online from LAWSON TICKET or Klook — the two sellers the park
              itself names — two months before your date, at 2 p.m. Japan time on the 10th. Weekday prices
              are the lower figure, weekends and public holidays the higher. Premium is the only pass that
              opens the building interiors, Hill of Youth and Dondoko Forest.
            </p>
            <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
              <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored noopener" className={styles.verdictBtn}>
                Check the Nagoya Ghibli Park tour →
              </KlookLink>
              <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                Check Ghibli Park tickets →
              </KlookLink>
              <GygCompareButton slug="ghibli-park-tickets" listing={gygGhibliPark} />
            </div>
          </div>
        </div>

        {/* Answer-first intro */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>The short answer</span>
          <h2 className={styles.sectionTitle}>What Do Ghibli Park Tickets Cost and How Do You Get Them?</h2>
          <p className={styles.bodyText}>
            <strong>Ghibli Park tickets</strong> are date-specified O-Sanpo Day Passes with{" "}
            <strong>no gate sales at all</strong>, and they come in two tiers: the{" "}
            <strong>Standard</strong> pass at <strong>¥3,300</strong> for an adult on a weekday and{" "}
            <strong>¥3,800</strong> at a weekend or on a public holiday, and the <strong>Premium</strong> pass
            at <strong>¥7,300</strong> and <strong>¥7,800</strong>. Children aged 4 to 12 pay half —{" "}
            ¥1,650/¥1,900 and ¥3,650/¥3,900 — and under-4s are free. They go on sale{" "}
            <strong>two months in advance, on the 10th of the month, at 2 p.m. Japan time</strong>, and the
            park names exactly two sellers for overseas buyers: <strong>LAWSON TICKET and Klook</strong>. The
            park is in Nagakute, east of Nagoya; Meitetsu&apos;s direct bus from Nagoya Station takes{" "}
            <strong>40 minutes</strong> for <strong>¥1,200</strong>. Every figure here is the park&apos;s or
            the operator&apos;s own, read on {OWN}.
          </p>
          <p className={styles.bodyText}>
            The rest of this page is the detail that decides whether you get the date you want: what each
            pass actually opens, the entry-time rule on Ghibli&apos;s Grand Warehouse, the Tuesday closure
            that also stops the direct bus, and the two routes in from Nagoya Station.
          </p>
        </section>

        {/* Price table */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Pricing</span>
          <h2 className={styles.sectionTitle}>Ghibli Park Ticket Prices</h2>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Pass", "What it opens", "Adult", "Child"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.pass}>
                      <td className={styles.tdProvider}>{row.pass}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.covers}</td>
                      <td className={styles.tdPrice} style={{ fontSize: "0.88rem" }}>{row.adult}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.child}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Ghibli Park&apos;s own English ticket page, read on {OWN}. The lower figure in each pair is the
            weekday price and the higher one the weekend and public-holiday price. Children aged 0 to 3 are
            free on both passes. The park states that no refunds and no changes to dates, times, ticket types
            or quantities are accepted, and that reselling is prohibited. These sit alongside every other
            attraction we have checked in our{" "}
            <Link href="/guides/attractions/japan-attraction-ticket-prices">
              Japan attraction ticket prices table
            </Link>
            .
          </p>
        </section>

        {/* What each pass opens */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>The five areas</span>
          <h2 className={styles.sectionTitle}>Which Areas Does Each Pass Cover?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            This is the decision the price difference is really about. Ghibli Park is five separate areas
            spread across the former Expo 2005 site, and the Standard pass covers three of them without the
            building interiors.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Area", "On which pass", "What to know"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {areaRows.map((row) => (
                    <tr key={row.area}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.area}</td>
                      <td style={{ fontSize: "0.88rem" }}>{row.pass}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            From the park&apos;s own ticket page, read on {OWN}. Ghibli&apos;s Grand Warehouse is the only
            area with a designated entry time: the park lists 9 a.m., 10, 11, 12, 1 p.m. and 2 p.m., with the
            9 a.m. slot only on days the park opens at 9, and you must be inside no later than one hour after
            your reservation time.
          </p>
        </section>

        {/* How to book */}
        <section className={styles.installSection}>
          <span className={styles.sectionLabel}>Step-by-step</span>
          <h2 className={styles.sectionTitle}>How Do I Buy Ghibli Park Tickets From Overseas?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            <strong>Online, from LAWSON TICKET or Klook — the two sellers the park itself names.</strong>{" "}
            There is no third route and nothing to buy at the gate, so the whole exercise is about being ready
            at the right minute with the right decisions already made.
          </p>
          <div className={styles.stepsList}>
            {buySteps.map((step, i) => (
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
            <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check Ghibli Park tickets on Klook →
            </KlookLink>
            <KlookLink href={ghibliParkTicketHotelPackage.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the ticket + Nagoya hotel package →
            </KlookLink>
            <GygCompareButton slug="ghibli-park-tickets" listing={gygGhibliPark} />
          </div>
        </section>

        {/* Sell-out / availability */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Availability</span>
          <h2 className={styles.sectionTitle}>Do Ghibli Park Tickets Sell Out?</h2>
          <p className={styles.bodyText}>
            <strong>Treat the 2 p.m. release as the moment to book, not a window that stays open.</strong>{" "}
            The park sells a fixed number of date- and slot-specified passes and nothing at the gate, which is
            the structural reason popular dates go.
          </p>
          <p className={styles.bodyText}>
            Two published facts show how tight it is. The same-day tickets that let a Standard pass holder
            into Okino Residence, Howl&apos;s Castle and The House of Witches are sold inside Valley of
            Witches on the day, and the park states the number is limited and sales end once the day&apos;s
            tickets are sold out. And GetYourGuide, which resells the Premium pass, states on its own Ghibli
            Park listing that tickets are limited and cannot be guaranteed at the moment of booking. Both read
            on {OWN}. If your date has gone on one seller, the useful move is to check the other and the
            guided versions of the day rather than to wait for a release that does not come.
          </p>
          <div className={styles.pickCtaRow} style={{ marginTop: "1rem" }}>
            <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
              Check the Nagoya bus tour with park entry →
            </KlookLink>
            <GygCompareButton slug="ghibli-park-tickets" listing={gygNagoyaEntryTickets} label="Compare Nagoya tickets on GetYourGuide →" />
          </div>
        </section>

        {/* Getting there */}
        <section className={styles.comparisonSection}>
          <span className={styles.sectionLabel}>Getting there</span>
          <h2 className={styles.sectionTitle}>How Do I Get to Ghibli Park From Nagoya or Tokyo?</h2>
          <p className={styles.bodyText} style={{ marginBottom: "1rem" }}>
            The park sits in Nagakute, east of Nagoya, on the former Expo 2005 site. Two routes from Nagoya
            Station, and one of them stops running on the days the park is closed.
          </p>
          <div className={styles.tableWrap}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {["Route", "What the operator publishes", "The catch"].map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {accessRows.map((row) => (
                    <tr key={row.route}>
                      <td className={styles.tdProvider} style={{ whiteSpace: "nowrap" }}>{row.route}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.detail}</td>
                      <td style={{ fontSize: "0.85rem" }}>{row.catch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.bodyText} style={{ marginTop: "1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            The bus figures are Meitetsu Bus&apos;s own and the shuttle counts the park&apos;s, both read on{" "}
            {OWN}; the Linimo fare is Aichi Rapid Transit&apos;s published fare table, read the same day. Our{" "}
            <Link href="/guides/transport/shinkansen-guide">shinkansen guide</Link> covers the Tokaido run
            into Nagoya and whether a rail pass is worth it for it.
          </p>
        </section>

        {/* Hours and closures */}
        <section className={styles.bodySection}>
          <span className={styles.sectionLabel}>Hours</span>
          <h2 className={styles.sectionTitle}>What Time Does Ghibli Park Open, and When Is It Closed?</h2>
          <p className={styles.bodyText}>
            <strong>10:00 to 17:00 on weekdays, 9:00 to 17:00 at weekends and on public holidays</strong>, and
            closed <strong>every Tuesday</strong> — the following weekday when a Tuesday falls on a public
            holiday — plus the New Year period and designated maintenance days. The park&apos;s own calendar,
            read on {OWN}, and it notes that dates and hours can change.
          </p>
          <p className={styles.bodyText}>
            Two consequences worth planning around. The 9 a.m. Ghibli&apos;s Grand Warehouse entry slot only
            exists on days the park opens at 9, which in practice means weekends and holidays — the quietest
            start is therefore on the busiest sort of day. And Meitetsu&apos;s direct bus from Nagoya Station
            runs only on park opening days, so a Tuesday is not a quieter visit with a longer journey; it is
            no visit at all.
          </p>
        </section>

        {/* Klook supporting block */}
        <KlookTripPrep
          label="Booked alongside"
          heading="What Else Does a Ghibli Park Day Need Booked?"
          intro="The ticket is only one of the bookings this day takes, and the other two are decided by your entry time: a 9 a.m. Grand Warehouse slot is a different morning from a 2 p.m. one, and the direct bus does not run on the days the park is shut."
          items={ghibliParkTripPrep}
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
          slug="ghibli-park-tickets"
          heading="If Your Date Has Gone, Where Else Is It Sold?"
          intro="The park names two sellers for overseas buyers, and a date- and slot-specified pass with no gate sales is exactly the kind of ticket that disappears. GetYourGuide lists the Premium pass and the guided versions of the same day — it states on its own listing that tickets are limited and cannot be guaranteed at booking, which is the honest position for any reseller of this park."
          listings={[gygGhibliPark, gygNagoyaEntryTickets]}
        />

        {/* Klook tours */}
        <KlookTourPicks
          heading="The Rest of a Nagoya Trip"
          intro="Ghibli Park is a full day with a hard 17:00 close, which leaves the travel days around it open. These are the bookings that follow from that — a guided version of the park day itself, a night by the gates, and the regional pass if Chubu is more than one stop."
          tours={[ghibliParkNagoyaBusTour, ghibliParkTicketHotelPackage, shoryudoHighwayBusPass]}
        />

        {/* Related articles */}
        <section className={styles.relatedSection}>
          <span className={styles.sectionLabel}>Related guides</span>
          <h2 className={styles.sectionTitle}>Keep Reading</h2>
          <div className={styles.relatedGrid}>
            <Link href="/guides/attractions/legoland-japan-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="9" width="16" height="11" rx="2" />
                  <path d="M8 9V6h8v3M9 13h.01M15 13h.01" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>LEGOLAND Japan Tickets (2026): Prices, Hours and Is It Worth It?</p>
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
            <Link href="/guides/attractions/tokyo-disney-tickets" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
                  <path d="M13 6v2M13 11v2M13 16v2" />
                </svg>
              </div>
              <div className={styles.relatedMeta}>
                <p className={styles.relatedTitle}>Tokyo Disney Tickets (2026): Disneyland &amp; DisneySea — How to Buy</p>
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
            <Link href="/guides/attractions/japan-attraction-ticket-prices" className={styles.relatedCard}>
              <div className={styles.relatedIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M3 12h18M3 18h12" />
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
            <h2 className={styles.ctaBannerTitle}>Be ready at 2 p.m. on the 10th</h2>
            <p className={styles.ctaBannerDesc}>
              Two months ahead, one release, no gate sales. Decide Standard or Premium first, know which
              Grand Warehouse slot you want, and have the seller open before the hour.
            </p>
            <div className={styles.pickCtaRow}>
              <KlookLink href={ghibliParkNagoyaBusTour.url} target="_blank" rel="sponsored noopener" className={styles.ctaBannerBtn}>
                View the Nagoya Ghibli Park tour →
              </KlookLink>
              <KlookLink href={ghibliParkTicket.url} target="_blank" rel="sponsored noopener" className={styles.pickCta}>
                View Ghibli Park tickets →
              </KlookLink>
              <GygCompareButton slug="ghibli-park-tickets" listing={gygGhibliPark} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
