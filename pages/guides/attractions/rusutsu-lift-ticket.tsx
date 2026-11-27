import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { rusutsuResortShuttleBus, nisekoLiftTicketGearDelivery, nisekoHirafuLiftPassBusTour } from "../../../lib/klook-links";
import { rusutsuLiftPassBusSapporo } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Rusutsu Resort's own page, read by node fetch on 28 Nov 2026:
// rusutsu.com/en/winter-lift-tickets/ (regular season 19 Dec 2026-14 Mar 2027, counter price with online price in
// brackets: 1-day adult 19-64 16,700 (13,200), senior 65+ and youth 13-18 12,500 (9,800), child 4-12 8,300 (6,400);
// 5-hour adult 14,500 (11,600); 2-day 26,000, 3-day 39,000, 5-day 65,000 adult at the counter; night 4,000; 25-hour
// 39,000 (36,000); Early Season 1 scheduled 28 Nov-11 Dec 2026, 1-day adult 7,900; Early Season 2 12-18 Dec 10,500;
// Spring 15-31 Mar 2027 10,500; online purchase needs the Rusutsu App, on sale from 19 Dec 2026; children 3 and under
// free; ID required for age; night skiing mid-Dec 2026-30 Mar 2027, 16:00-20:00, last lift 19:45; Center ticket
// counter 8:15-16:45; information list item dated 27/11/2026 "Notice of Ski Area Opening Postponement").
// No Klook price (403).
const ROUTE = "/guides/attractions/rusutsu-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://rusutsu.com/en/winter-lift-tickets/";
const HOURS = "https://rusutsu.com/en/winter-lift-tickets/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function RusutsuLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Rusutsu lift ticket"
      title="Rusutsu Lift Ticket Prices 2026-27: Day, 5 Hour & Online"
      description="Rusutsu lift ticket 2026-27: ¥16,700 a day for adults at the counter or ¥13,200 online from 19 December. Early-season rates, children and night skiing."
      h1={<>Rusutsu Lift Ticket Prices 2026-27: <br />Day, 5 Hour &amp; Online</>}
      subtitle="What a day at Rusutsu costs at the counter and online in 2026-27, the early and spring rates, and the bus package from Sapporo."
      badges={[`Checked ${CHECKED}`, "¥13,200 online", "¥16,700 at the counter"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            In the regular season (19 December 2026 to 14 March 2027) a <strong>Rusutsu one-day ticket is ¥16,700 for
            adults at the counter or ¥13,200 online</strong> through the Rusutsu App. Seniors and youth aged 13–18 pay
            ¥12,500 (¥9,800 online) and children aged 4–12 ¥8,300 (¥6,400 online). Children aged 3 and under ride free.
          </p>
          <p className={styles.bodyText}>
            Before 19 December the day ticket is ¥7,900 to 11 December and ¥10,500 from 12 to 18 December, sold at the
            ticket office only. On 27 November 2026 Rusutsu posted a notice that the ski area opening is postponed, so
            check before you go. Klook sells a one-day pass with the round-trip bus from Sapporo. Rusutsu, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: rusutsuLiftPassBusSapporo.url, label: "Check the Rusutsu pass and bus on Klook →" }}
      stats={[
        { label: "1 day online", value: "¥13,200" },
        { label: "1 day counter", value: "¥16,700" },
        { label: "5 hours online", value: "¥11,600" },
        { label: "Child 4–12 online", value: "¥6,400" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the counter price is ¥3,500 more than online, so buy in the app or as a package;
          the Klook pass is valid only on the day of the bus.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Regular-season adult prices. Online sales are limited to the 25-hour, top-up 5-hour, 5-hour and 1-day
              tickets and start on 19 December 2026; other tickets are sold at the counter. You need ID showing your age
              when you buy. The 25-hour ticket is ¥39,000 at the counter or ¥36,000 online.
            </p>
          ),
          table: {
            head: ["Adult ticket", "Counter", "Online"],
            rows: [
              ["1 day", "¥16,700", "¥13,200"],
              ["5 hours", "¥14,500", "¥11,600"],
              ["2 days", "¥26,000", "—"],
              ["3 days", "¥39,000", "—"],
              ["5 days", "¥65,000", "—"],
              ["Night (16:00–20:00)", "¥4,000", "—"],
              ["1 day, child 4–12", "¥8,300", "¥6,400"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells a one-day pass with the Sapporo bus at its own price; the pass works only on the day of the bus.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open?",
          body: (
            <p className={styles.bodyText}>
              The early season was scheduled from 28 November 2026, but on 27 November Rusutsu posted a notice that the
              opening is postponed. The regular season runs from 19 December 2026 to 14 March 2027 and the spring
              season from 15 to 31 March 2027. Night skiing runs from mid-December to 30 March, 16:00–20:00 (last lift
              19:45). The Center ticket counter opens 8:15–16:45.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: rusutsuLiftPassBusSapporo.url, label: "Book the Rusutsu package on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Rusutsu, Niseko and the transfers",
        intro: "Rusutsu sits between Sapporo and Niseko, so many trips combine the two.",
        tours: [rusutsuResortShuttleBus, nisekoLiftTicketGearDelivery, nisekoHirafuLiftPassBusTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the neighbouring resort, see <Link href="/guides/attractions/niseko-ski-tours" style={linkStyle}>Niseko ski tours</Link>. For days out from the city, see
          <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>ski day trips from Sapporo</Link>; for a longer trip, see the
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link> and the
          <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>Hokkaido 7-day itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Rusutsu lift ticket?",
          a: `In the regular season (19 Dec 2026–14 Mar 2027) a one-day adult ticket is ¥16,700 at the counter or ¥13,200 online. Checked ${CHECKED}.`,
        },
        {
          q: "How do I buy Rusutsu tickets online?",
          a: "Through the Rusutsu App. You get a QR code and collect your IC card at a pick-up box at the resort. Online sales start on 19 December 2026.",
        },
        {
          q: "Is Rusutsu open in late November?",
          a: "The early season was scheduled from 28 November 2026, but Rusutsu posted a notice on 27 November that the opening is postponed. Check the official site.",
        },
        {
          q: "Is there night skiing?",
          a: "Yes, from mid-December to 30 March 2027, 16:00–20:00. The adult night ticket is ¥4,000.",
        },
        {
          q: "Do young children ski free?",
          a: "Yes, children aged 3 and under ride the lifts free. Ages 4–12 pay ¥8,300 a day at the counter or ¥6,400 online.",
        },
      ]}
      related={[
        { href: "/guides/attractions/niseko-lift-ticket", title: "Niseko Lift Ticket Prices" },
        { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours" },
        { href: "/guides/attractions/sapporo-ski-day-trip", title: "Ski Day Trips from Sapporo" },
        { href: "/guides/attractions/kiroro-lift-ticket", title: "Kiroro Lift Ticket Prices" },
      ]}
      banner={{
        title: "Rusutsu from Sapporo in one booking",
        desc: "A one-day pass with the round-trip bus.",
        label: "View the Rusutsu package →",
      }}
    />
  );
}
