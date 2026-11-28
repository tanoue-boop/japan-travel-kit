import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { furanoBieiBluePondDayTour, asahiyamaZooWinterDayTour } from "../../../lib/klook-links";
import { furanoSkiBusLiftTicket, shiroiKoibitoParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Furano Ski Resort's own page (Prince Snow Resorts), read by node fetch on 28 Nov 2026:
// princehotels.co.jp/ski/furano/winter/lift/ (2026-27 season 28 Nov 2026-5 May 2027; 1-day adult / senior 60+:
// first ski 28 Nov-4 Dec 7,500 / 7,000, regular 5 Dec-22 Mar 9,000 / 8,500, spring 23 Mar-5 May 7,500 / 7,000;
// SEIBU PRINCE CLUB members 6,000 / 7,500 / 6,000 adult; tickets free up to elementary school age, collected at
// the counter; day ticket 8:30 to sunset or closing, spring 9:00-16:00; 4-hour 8,200 / 7,700; night weekdays
// 16:00-18:00 3,100, 26 Dec-3 Jan and weekends/holidays 16:00-19:30 3,900, Furano zone from mid-December and
// Kitanomine zone from late December to 21 Mar 2027; Furano Ropeway round trip 3,700). No Klook price (403).
const ROUTE = "/guides/attractions/furano-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.princehotels.co.jp/ski/furano/winter/lift/";
const HOURS = "https://www.princehotels.co.jp/ski/furano/winter/lift/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function FuranoLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Furano lift ticket"
      title="Furano Lift Ticket Prices 2026-27: Day Pass, Night & Bus"
      description="Furano Ski Resort 2026-27: a day is ¥9,000 for adults from 5 December, ¥7,500 early and in spring, and free for children up to elementary school age."
      h1={<>Furano Lift Ticket Prices 2026-27: <br />Day Pass, Night &amp; Bus</>}
      subtitle="What a day at Furano Ski Resort costs in 2026-27, the free child tickets, night skiing, and the ski bus from Sapporo with the lift ticket."
      badges={[`Checked ${CHECKED}`, "¥9,000 a day", "Kids free"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>one-day lift ticket at Furano Ski Resort is ¥9,000 for adults</strong> in the regular season
            (5 December 2026 to 22 March 2027) and ¥7,500 in the first-ski period (28 November to 4 December) and in
            spring. Seniors aged 60 and over pay ¥500 less. Lift tickets are free for children up to elementary school
            age; collect the free ticket at the counter.
          </p>
          <p className={styles.bodyText}>
            The day ticket runs from 8:30 until sunset or closing. Members of SEIBU PRINCE CLUB (free to join) pay
            ¥7,500 in the regular season. Klook sells the Hokkaido Ski Bus from Sapporo with the lift ticket handed out
            on board. Furano Ski Resort, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: furanoSkiBusLiftTicket.url, label: "Check the Furano ski bus and lift ticket on Klook →" }}
      stats={[
        { label: "1 day, regular", value: "¥9,000" },
        { label: "1 day, early / spring", value: "¥7,500" },
        { label: "4 hours", value: "¥8,200" },
        { label: "Children", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> families save most here because children ski free; join the free SEIBU PRINCE CLUB if
          you are buying adult tickets at the resort.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              General prices; SEIBU PRINCE CLUB members pay ¥6,000 in the first-ski and spring periods and ¥7,500 in the
              regular season. Seniors are 60 and over, with ID. A Furano Ropeway round trip is ¥3,700. Tickets bought
              online cannot be changed or refunded.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Senior 60+"],
            rows: [
              ["1 day, regular (5 Dec–22 Mar)", "¥9,000", "¥8,500"],
              ["1 day, first ski (28 Nov–4 Dec)", "¥7,500", "¥7,000"],
              ["1 day, spring (23 Mar–5 May)", "¥7,500", "¥7,000"],
              ["4 hours", "¥8,200", "¥7,700"],
              ["Night, weekdays", "¥3,100", "¥2,900"],
              ["Night, weekends and 26 Dec–3 Jan", "¥3,900", "¥3,700"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells the Sapporo ski bus with the lift ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and when is night skiing?",
          body: (
            <p className={styles.bodyText}>
              The 2026-27 season runs from 28 November 2026 to 5 May 2027. Day tickets run from 8:30 until sunset or
              closing, and 9:00–16:00 in spring. Night skiing is 16:00–18:00 on weekdays and 16:00–19:30 at weekends,
              on holidays and from 26 December to 3 January, from mid-December (Furano zone) or late December
              (Kitanomine zone) to 21 March 2027.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: furanoSkiBusLiftTicket.url, label: "Book the Furano ski bus on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Furano, Biei and Asahikawa in winter",
        intro: "The Furano area has winter sightseeing too, and Klook sells day tours for it from Sapporo.",
        tours: [furanoBieiBluePondDayTour, asahiyamaZooWinterDayTour, shiroiKoibitoParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the area, see the <Link href="/guides/attractions/furano-biei-tour" style={linkStyle}>Furano and Biei tour guide</Link> and the{" "}
          <Link href="/guides/transport/sapporo-furano-area-pass" style={linkStyle}>Sapporo–Furano Area Pass</Link>. For a longer winter trip, see{" "}
          <Link href="/guides/attractions/hokkaido-winter-tours" style={linkStyle}>Hokkaido winter tours</Link> and the{" "}
          <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>Hokkaido 7-day itinerary</Link>. Before you go, see{" "}
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Furano lift ticket?",
          a: `A one-day adult ticket is ¥9,000 from 5 Dec 2026 to 22 Mar 2027, and ¥7,500 from 28 Nov to 4 Dec and from 23 Mar to 5 May 2027. Checked ${CHECKED}.`,
        },
        {
          q: "Do children ski free at Furano?",
          a: "Yes. Lift tickets are free for children up to elementary school age; pick up the free ticket at the counter. Preschool children must ride with a guardian.",
        },
        {
          q: "Is there night skiing?",
          a: "Yes, from mid-December to 21 March 2027: 16:00–18:00 on weekdays (¥3,100) and 16:00–19:30 at weekends, on holidays and over New Year (¥3,900).",
        },
        {
          q: "When is the season?",
          a: "From 28 November 2026 to 5 May 2027.",
        },
        {
          q: "Is there a member discount?",
          a: "Yes. SEIBU PRINCE CLUB members (free to join) pay ¥7,500 a day in the regular season instead of ¥9,000.",
        },
      ]}
      related={[
        { href: "/guides/attractions/furano-biei-tour", title: "Furano & Biei Tours" },
        { href: "/guides/transport/sapporo-furano-area-pass", title: "Sapporo–Furano Area Pass" },
        { href: "/guides/attractions/hokkaido-winter-tours", title: "Hokkaido Winter Tours" },
        { href: "/guides/attractions/niseko-lift-ticket", title: "Niseko Lift Ticket Prices" },
      ]}
      banner={{
        title: "Furano from Sapporo by ski bus",
        desc: "The bus both ways with the lift ticket.",
        label: "View the Furano ski bus →",
      }}
    />
  );
}
