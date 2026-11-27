import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { fujitenSnowFunOishiParkTour, yetiSkiDayTrip } from "../../../lib/klook-links";
import { fujitenLiftTicket, mtFujiPanoramicRopewayTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from Fujiten Snow Resort's own page, read by node fetch on 28 Nov 2026:
// fujiten.net/charges/ (season mid-December 2026 to early April 2027; night skiing 26 Dec 2026-7 Mar 2027 on
// Saturdays, Sundays, holidays and 26-30 Dec, 2-3 Jan, not 31 Dec / 1 Jan; lifts 9:00-16:30, special days
// (9, 10 Jan, 11, 13, 20, 21, 23 Feb) 8:30-16:30, night lifts 16:00-21:00; window 1-day adult / junior / senior:
// weekday 5,800 / 4,000 / 5,000, weekend-holiday-New Year 6,800 / 5,500 / 6,300, special days 7,300 / 6,000 /
// 6,800; 4-hour 4,800 / 3,500 / 4,300, 5,800 / 5,000 / 5,300, 6,300 / 5,500 / 5,800; single ride 1,000; night
// 16:00-21:00 3,000; super 1-day with night 7,800 / 6,500 / 7,300 (special 8,300); super afternoon 13:00-21:00
// 6,800; 500 yen IC deposit on every ticket; junior 4 to elementary, senior 60+, 3 and under free; parking 1,000
// on weekends, holidays and 26 Dec-3 Jan, free on weekdays). No Klook price (403).
const ROUTE = "/guides/attractions/fujiten-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.fujiten.net/charges/";
const HOURS = "https://www.fujiten.net/charges/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function FujitenLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Fujiten lift ticket"
      title="Fujiten Lift Ticket Prices 2026-27: Day, Night & 4 Hour"
      description="Fujiten Snow Resort 2026-27: ¥5,800 a day for adults on weekdays, ¥6,800 on weekends, night ¥3,000, ¥500 IC deposit. Season, hours and how to get there."
      h1={<>Fujiten Lift Ticket Prices 2026-27: <br />Day, Night &amp; 4 Hour</>}
      subtitle="What a day on the Mt. Fuji ski slope near Lake Kawaguchi costs in 2026-27, on weekdays, weekends and at night."
      badges={[`Checked ${CHECKED}`, "¥5,800 weekdays", "Mt. Fuji views"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>one-day lift ticket at Fujiten is ¥5,800 for adults on weekdays</strong> and ¥6,800 on weekends,
            holidays and over New Year (¥7,300 on seven special days). Juniors (age 4 to elementary school) pay ¥4,000
            and ¥5,500. Night skiing (4–9 p.m.) is ¥3,000, and a super one-day ticket with night skiing is ¥7,800 on
            weekends.
          </p>
          <p className={styles.bodyText}>
            Every ticket needs an IC card with a ¥500 deposit, refunded when you return it. The season runs from mid-
            December 2026 to early April 2027. Klook sells a Fujiten lift ticket. Fujiten Snow Resort, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: fujitenLiftTicket.url, label: "Check the Fujiten lift ticket on Klook →" }}
      stats={[
        { label: "1 day, weekday", value: "¥5,800" },
        { label: "1 day, weekend", value: "¥6,800" },
        { label: "Night", value: "¥3,000" },
        { label: "IC deposit", value: "¥500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go on a weekday if you can: the day ticket is ¥1,000 cheaper and parking is free;
          on weekends parking is ¥1,000 a car.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Window prices for 2026-27. Juniors are age 4 to elementary school; seniors are 60 and over; children 3
              and under ride free with a parent. Special days are 9 and 10 January and 11, 13, 20, 21 and 23 February.
            </p>
          ),
          table: {
            head: ["Ticket (adult)", "Weekday", "Weekend / New Year", "Special days"],
            rows: [
              ["1 day (9:00–16:30)", "¥5,800", "¥6,800", "¥7,300"],
              ["4 hours", "¥4,800", "¥5,800", "¥6,300"],
              ["Super 1 day (with night)", "—", "¥7,800", "¥8,300"],
              ["Night (16:00–21:00)", "—", "¥3,000", "¥3,000"],
              ["1 day, junior", "¥4,000", "¥5,500", "¥6,000"],
              ["1 day, senior 60+", "¥5,000", "¥6,300", "¥6,800"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                A ¥500 IC card deposit is added to every ticket.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Fujiten open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              Fujiten plans to open in mid-December 2026 and close in early April 2027. Lifts run 9:00 a.m. to 4:30 p.m.
              (from 8:30 on special days). Night skiing runs 4–9 p.m. on Saturdays, Sundays and holidays from 26 December
              2026 to 7 March 2027, and on 26–30 December and 2–3 January.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: fujitenLiftTicket.url, label: "Book the Fujiten lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Mt. Fuji",
        intro: "Fujiten is near the Fuji Five Lakes, so these fit the same trip.",
        tours: [fujitenSnowFunOishiParkTour, yetiSkiDayTrip, mtFujiPanoramicRopewayTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the lakes below, see the <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={linkStyle}>Lake Kawaguchi day trip from Tokyo</Link> and the
          <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>Mt. Fuji day trip from Tokyo</Link>. For other ski days, see
          <Link href="/guides/attractions/tokyo-snow-day-trip" style={linkStyle}>snow day trips from Tokyo</Link>; for transport around the lakes, see the
          <Link href="/guides/transport/mt-fuji-pass" style={linkStyle}>Mt. Fuji Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Fujiten lift ticket?",
          a: `A one-day adult ticket is ¥5,800 on weekdays and ¥6,800 on weekends, holidays and New Year in 2026-27, and ¥7,300 on seven special days. Checked ${CHECKED}.`,
        },
        {
          q: "When does Fujiten open?",
          a: "Fujiten plans to open in mid-December 2026 and close in early April 2027; the exact date depends on snow.",
        },
        {
          q: "Is there night skiing?",
          a: "Yes, 4–9 p.m. on weekends and holidays from 26 December 2026 to 7 March 2027, plus 26–30 December and 2–3 January. A night ticket is ¥3,000.",
        },
        {
          q: "Is there a deposit?",
          a: "Yes. Every ticket is an IC card with a ¥500 deposit, refunded at the return machine on the first floor of the center house.",
        },
        {
          q: "Do small children pay?",
          a: "Children 3 and under ride free but pass the gate with a parent. Juniors (age 4 to elementary school) pay ¥4,000 on weekdays.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-snow-day-trip", title: "Snow Day Trips from Tokyo" },
        { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "Lake Kawaguchi Day Trip" },
        { href: "/guides/attractions/mt-fuji-panoramic-ropeway-tickets", title: "Mt. Fuji Panoramic Ropeway" },
        { href: "/guides/attractions/karuizawa-prince-ski-lift-ticket", title: "Karuizawa Prince Lift Ticket" },
      ]}
      banner={{
        title: "Ski with Mt. Fuji in front of you",
        desc: "A Fujiten lift ticket on the northern slope of Mt. Fuji.",
        label: "View the Fujiten lift ticket →",
      }}
    />
  );
}
