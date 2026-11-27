import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hakubaHapponeBusLiftRental, hakubaSkiSnowboardRental, naganoHakubaShuttleBus } from "../../../lib/klook-links";
import { hakubaGoryu47LiftRental } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Hakuba Happo-one's own page, read by node fetch on 28 Nov 2026:
// happo-one.jp/en/ticket/ (2026-27 ticket window, adult 18-64 / child 6-17 / senior 65+: early season 1-18 Dec
// 2026 1-day 6,400 / 3,200 / 6,000; peak season 19 Dec 2026-22 Mar 2027 1-day 9,800 / 4,900 / 9,500, 2-day
// 19,600 / 9,800 / 19,000, half-day 8,100 / 4,050; spring 23 Mar-5 May 2027 1-day 6,400 / 3,200 / 6,000; web
// top-up 1-day peak 9,500; early bird web tickets until 30 Nov; preschool children free; two-day tickets usable on
// two non-consecutive days; Hakuba Valley Ticket adult 13+ / child 6-12: 1-day 11,100 / 6,400, 2-day 21,800 /
// 12,500, 3-day 32,200 / 18,100, 5-day 53,400 / 29,700, 10 resorts, free Hakuba Valley bus on ski days).
// No Klook price (403).
const ROUTE = "/guides/attractions/hakuba-happo-one-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.happo-one.jp/en/ticket/";
const HOURS = "https://www.happo-one.jp/en/ticket/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HakubaHappoOneLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Happo-one lift ticket"
      title="Hakuba Happo-one Lift Ticket Prices 2026-27: Day & Valley"
      description="Hakuba Happo-one lift ticket 2026-27: ¥9,800 a day for adults at peak, ¥6,400 early and in spring, ¥4,900 for children. Plus the Hakuba Valley ticket."
      h1={<>Hakuba Happo-one Lift Ticket Prices 2026-27: <br />Day &amp; Valley</>}
      subtitle="What a day at Happo-one costs in each season of 2026-27, the child and senior rates, and when the Hakuba Valley ticket is worth it."
      badges={[`Checked ${CHECKED}`, "¥9,800 at peak", "Opens 1 Dec"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>Happo-one one-day ticket is ¥9,800 for adults in peak season</strong> (19 December 2026 to 22
            March 2027) and ¥6,400 in the early season (1–18 December) and in spring. Children aged 6–17 pay half
            (¥4,900 at peak) and seniors over 65 pay ¥9,500. Children aged 5 and under ride free.
          </p>
          <p className={styles.bodyText}>
            If you want to ski other resorts in the valley, the Hakuba Valley ticket is ¥11,100 a day for adults and
            covers ten ski areas plus the Hakuba Valley bus. Klook sells a Happo-one package with the round-trip bus
            from Tokyo, the lift ticket and rental. Hakuba Happo-one, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hakubaHapponeBusLiftRental.url, label: "Check the Happo-one package on Klook →" }}
      stats={[
        { label: "1 day, peak", value: "¥9,800" },
        { label: "1 day, early / spring", value: "¥6,400" },
        { label: "Child 6–17, peak", value: "¥4,900" },
        { label: "Valley ticket", value: "¥11,100" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> stay on the Happo-one ticket if you will ski only Happo-one; pay ¥1,300 more for the
          Valley ticket on days you plan to move to Goryu, Tsugaike or Iwatake.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Ticket window prices. Children are aged 6–17 (junior and senior high school students show a student ID).
              Two-day tickets can be used on two days that are not consecutive. If the lifts close for weather you can
              use the ticket on another date, but there are no refunds. Web top-ups for an existing IC ticket are
              slightly cheaper (¥9,500 a day at peak).
            </p>
          ),
          table: {
            head: ["Ticket", "Adult 18–64", "Child 6–17", "Senior 65+"],
            rows: [
              ["1 day, peak", "¥9,800", "¥4,900", "¥9,500"],
              ["2 days, peak", "¥19,600", "¥9,800", "¥19,000"],
              ["Half day, peak", "¥8,100", "¥4,050", "—"],
              ["1 day, early (1–18 Dec)", "¥6,400", "¥3,200", "¥6,000"],
              ["1 day, spring (from 23 Mar)", "¥6,400", "¥3,200", "¥6,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                The Hakuba Valley ticket uses different age groups: ¥11,100 a day for ages 13 and over, ¥6,400 for ages 6–12. Klook sells its package at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When are the seasons?",
          body: (
            <p className={styles.bodyText}>
              The early season runs from 1 to 18 December 2026, the peak season from 19 December 2026 to 22 March 2027,
              and the spring season from 23 March to 5 May 2027. Early-bird web tickets are on sale until 30 November.
              The Hakuba Valley ticket also covers the Hakuba Valley bus on the days you ski.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: hakubaHapponeBusLiftRental.url, label: "Book the Happo-one package on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Hakuba transfers and rental",
        intro: "Most Hakuba trips also need the bus from Nagano or Tokyo and a rental set.",
        tours: [hakubaSkiSnowboardRental, naganoHakubaShuttleBus, hakubaGoryu47LiftRental],
      }}
      links={
        <p className={styles.bodyText}>
          For access from Tokyo and the other resorts, see <Link href="/guides/attractions/hakuba-ski-tours" style={linkStyle}>Hakuba ski tours</Link> and the
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>. Nearby, see
          <Link href="/guides/attractions/nozawa-onsen-ski" style={linkStyle}>Nozawa Onsen ski</Link> and the
          <Link href="/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>snow monkey tour</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Happo-one lift ticket?",
          a: `A one-day adult ticket is ¥9,800 from 19 Dec 2026 to 22 Mar 2027 and ¥6,400 in the early season (1–18 Dec) and from 23 Mar 2027. Checked ${CHECKED}.`,
        },
        {
          q: "When does Happo-one open?",
          a: "The 2026-27 early season starts on 1 December 2026.",
        },
        {
          q: "What is the Hakuba Valley ticket?",
          a: "A common ticket for ten ski areas, including Happo-one, Goryu, Hakuba47, Iwatake and Tsugaike: ¥11,100 a day for ages 13 and over, with the Hakuba Valley bus included on ski days.",
        },
        {
          q: "Do children ski free?",
          a: "Children aged 5 and under ride free; collect their ticket at the counter. Ages 6–17 pay ¥4,900 a day at peak.",
        },
        {
          q: "Can a 2-day ticket be used on separate days?",
          a: "Yes, on two non-consecutive days, but not by two people on the same day.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakuba-ski-tours", title: "Hakuba Ski Tours" },
        { href: "/guides/attractions/hakuba-goryu-47-lift-ticket", title: "Hakuba47 & Goryu Lift Ticket Prices" },
        { href: "/guides/attractions/tsugaike-kogen-lift-ticket", title: "Tsugaike Lift Ticket Prices" },
        { href: "/guides/attractions/nozawa-onsen-lift-ticket", title: "Nozawa Onsen Lift Ticket Prices" },
      ]}
      banner={{
        title: "Happo-one from Tokyo in one booking",
        desc: "Bus, lift ticket and rental together.",
        label: "View the Happo-one package →",
      }}
    />
  );
}
