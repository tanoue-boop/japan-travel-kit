import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hakubaHapponeBusLiftRental, hakubaExpressBusTokyo } from "../../../lib/klook-links";
import { hakubaGoryu47LiftRental, tsugaikeLiftTicketRental } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Hakuba47's own page, read by node fetch on 28 Nov 2026:
// hakuba47.co.jp/en/lift-tickets/ (2026-27 Hakuba47 and Goryu, ticket window, child 6-12 / youth 13-22 / adult
// 23-64 / senior 65-79: 1-day 4,500 / 6,500 / 10,000 / 9,500; 2-day 8,000 / 11,500 / 18,500 / 17,500; 3-day 11,500
// / 16,500 / 26,000 / 25,000; early (before 15 Dec) and spring (after 10 Mar) 1-day 4,000 / 6,500 / 9,000; half day
// child 3,900, adult 8,500; online first purchase child / adult / senior: 1-day 4,300 / 9,500 / 9,000, 2-day 7,800
// / 17,500 / 17,000, 3-day 11,300 / 25,000 / 24,500, early-bird 1-day 3,800 / 7,500; youth tickets at the Ticket
// Center only; under 5 and 80+ free; prices include a refundable 500 yen card deposit; Hakuba47 gondola round trip
// adult 4,500). No Klook price (403).
const ROUTE = "/guides/attractions/hakuba-goryu-47-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://hakuba47.co.jp/en/lift-tickets/";
const HOURS = "https://hakuba47.co.jp/en/lift-tickets/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HakubaGoryu47LiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Hakuba47 & Goryu lift ticket"
      title="Hakuba47 & Goryu Lift Ticket Prices 2026-27: Day & Online"
      description="Hakuba47 and Goryu lift ticket 2026-27: ¥10,000 a day for adults at the window or ¥9,500 online, ¥6,500 for ages 13–22, ¥4,500 for children."
      h1={<>Hakuba47 &amp; Goryu Lift Ticket Prices 2026-27: <br />Day &amp; Online</>}
      subtitle="What the common Hakuba47 and Goryu ticket costs in 2026-27 at the window and online, by age, with the early and spring rates."
      badges={[`Checked ${CHECKED}`, "¥9,500 online", "Ages 13–22 ¥6,500"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            One ticket covers the linked Hakuba47 and Hakuba Goryu areas. A <strong>one-day ticket is ¥10,000 for adults
            (23–64) at the window or ¥9,500 online</strong>. Youth aged 13–22 pay ¥6,500 (window only, with ID),
            children aged 6–12 ¥4,500 and seniors 65–79 ¥9,500. Children aged 5 and under and adults over 80 ride free.
          </p>
          <p className={styles.bodyText}>
            Before 15 December and after 10 March the adult day ticket is ¥9,000. All prices include a ¥500 card
            deposit that machines at the resort refund. Klook sells the common lift ticket with a ski or snowboard
            rental set. Hakuba47, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hakubaGoryu47LiftRental.url, label: "Check the Hakuba47 & Goryu ticket on Klook →" }}
      stats={[
        { label: "1 day online", value: "¥9,500" },
        { label: "1 day window", value: "¥10,000" },
        { label: "Youth 13–22", value: "¥6,500" },
        { label: "Child 6–12", value: "¥4,500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the youth rate up to age 22 is the one to know; if you are under 23, buy at the window
          with your passport rather than online.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Window prices; online first-purchase prices are lower (adult ¥9,500 a day, ¥17,500 for 2 days, ¥25,000
              for 3 days). Two- and three-day tickets can be used on non-consecutive days in the season. Deposit
              return machines are at Hakuba47, Goryu Escal Plaza and Iimori.
            </p>
          ),
          table: {
            head: ["Window ticket", "Child 6–12", "Youth 13–22", "Adult 23–64", "Senior 65–79"],
            rows: [
              ["1 day", "¥4,500", "¥6,500", "¥10,000", "¥9,500"],
              ["2 days", "¥8,000", "¥11,500", "¥18,500", "¥17,500"],
              ["3 days", "¥11,500", "¥16,500", "¥26,000", "¥25,000"],
              ["1 day, early / spring", "¥4,000", "¥6,500", "¥9,000", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Prices include the refundable ¥500 card deposit. Klook sells the lift ticket with rental at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When do the early and spring rates apply?",
          body: (
            <p className={styles.bodyText}>
              The early rate applies before 15 December 2026 and the spring rate after 10 March 2027; the half-day
              ticket runs from opening to 13:00 or from 12:00 to closing. Lift cards can be recharged online for later
              days and for the other Hakuba Valley resorts.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: hakubaGoryu47LiftRental.url, label: "Book Hakuba47 & Goryu on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: the rest of the Hakuba valley",
        intro: "The other big Hakuba areas and the bus from Tokyo can be booked the same way.",
        tours: [hakubaHapponeBusLiftRental, tsugaikeLiftTicketRental, hakubaExpressBusTokyo],
      }}
      links={
        <p className={styles.bodyText}>
          For access from Tokyo and the other resorts, see <Link href="/guides/attractions/hakuba-ski-tours" style={linkStyle}>Hakuba ski tours</Link> and the
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>. Before you go, see
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Hakuba47 lift ticket?",
          a: `The common Hakuba47 and Goryu one-day ticket is ¥10,000 for adults at the window or ¥9,500 online. Checked ${CHECKED}.`,
        },
        {
          q: "Does the ticket cover Goryu as well?",
          a: "Yes. The Hakuba47 and Goryu ticket covers both linked areas.",
        },
        {
          q: "Is there a youth discount?",
          a: "Yes. Ages 13–22 pay ¥6,500 a day, sold only at the Ticket Center with ID showing your date of birth.",
        },
        {
          q: "Is there a deposit?",
          a: "Yes, ¥500, included in the prices and refunded by machines at Hakuba47, Goryu Escal Plaza and Iimori.",
        },
        {
          q: "Who skis free?",
          a: "Children aged 5 and under and adults aged 80 and over.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakuba-ski-tours", title: "Hakuba Ski Tours" },
        { href: "/guides/attractions/hakuba-happo-one-lift-ticket", title: "Happo-one Lift Ticket Prices" },
        { href: "/guides/attractions/tsugaike-kogen-lift-ticket", title: "Tsugaike Lift Ticket Prices" },
        { href: "/guides/attractions/japan-ski-trip-itinerary", title: "Japan Ski Trip Itinerary" },
      ]}
      banner={{
        title: "Hakuba47 and Goryu with your gear",
        desc: "The common lift ticket and a rental set.",
        label: "View the Hakuba47 & Goryu ticket →",
      }}
    />
  );
}
