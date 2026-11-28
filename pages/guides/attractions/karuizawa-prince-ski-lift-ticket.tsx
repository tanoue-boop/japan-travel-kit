import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { karuizawaSkiSnowDayTour, karuizawaShinkansenDayTrip, karuizawaShinjukuDayTour } from "../../../lib/klook-links";
import { karuizawaPrinceLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from Karuizawa Prince Hotel Ski Resort's own page, read by node fetch on 28 Nov 2026:
// princehotels.co.jp/ski/karuizawa/winter/lift/ (window, general: early season 31 Oct-18 Dec 2026 8:30-16:30
// 1-day 8,000, afternoon 7,000; season 19 Dec 2026-22 Mar 2027 8:00-17:00 1-day 10,000, afternoon 9,000; top
// season (selected dates) 12,000 / 11,000; high top season (29 Dec 2026-3 Jan 2027, 9-11 Jan 2027 and selected
// February dates) 13,000 / 12,000; spring 23-31 Mar 2027 8,000 / 7,000; online and member prices 500 yen less in
// each season; children free up to elementary school, 100 yen fee online; afternoon ticket from 12:00, sold from
// 11:30; ticket sales close 30 minutes before closing; sightseeing lift 19 Dec 2026-31 Mar 2027 9:00-16:00).
// The top-season date list on that page has weekday errors, so this page does not repeat it. No Klook price (403).
const ROUTE = "/guides/attractions/karuizawa-prince-ski-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.princehotels.co.jp/ski/karuizawa/winter/lift/";
const HOURS = "https://www.princehotels.co.jp/ski/karuizawa/winter/lift/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KaruizawaPrinceSkiLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Karuizawa Prince ski lift ticket"
      title="Karuizawa Prince Ski Lift Ticket Prices 2026-27"
      description="Karuizawa Prince Hotel Ski Resort 2026-27: ¥10,000 a day for adults in the main season, ¥8,000 now, ¥500 less online, free up to elementary school."
      h1={<>Karuizawa Prince Ski Lift Ticket <br />Prices 2026-27</>}
      subtitle="What a day at the ski slope by Karuizawa Station costs in each part of the 2026-27 season, and how much you save online."
      badges={[`Checked ${CHECKED}`, "Open now", "¥500 off online"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Karuizawa Prince Hotel Ski Resort is <strong>already open: the early season runs from 31 October to 18
            December 2026 at ¥8,000 a day</strong> for adults at the window. From 19 December 2026 to 22 March 2027 a day
            is ¥10,000, rising to ¥12,000 on top-season dates and ¥13,000 over New Year. Buying online saves ¥500.
          </p>
          <p className={styles.bodyText}>
            Children up to elementary school age ride free (¥100 fee online). An afternoon ticket from noon is ¥1,000
            less than a day ticket. Klook sells a one-day lift ticket for the resort. Karuizawa Prince Hotel Ski Resort,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: karuizawaPrinceLiftTicket.url, label: "Check the Karuizawa Prince lift ticket on Klook →" }}
      stats={[
        { label: "1 day, early season", value: "¥8,000" },
        { label: "1 day, main season", value: "¥10,000" },
        { label: "1 day, New Year", value: "¥13,000" },
        { label: "Children", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the same lift costs between ¥8,000 and ¥13,000 depending on the date, so check
          the season of your day first; online tickets are ¥500 cheaper in every season.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult prices for 2026-27. The afternoon ticket can be used from 12:00 (sold from 11:30). Children up to
              elementary school age ride free; online, a ¥100 fee is charged per child.
            </p>
          ),
          table: {
            head: ["Season", "1 day (window)", "1 day (online)", "Afternoon (window)"],
            rows: [
              ["Early: 31 Oct–18 Dec 2026", "¥8,000", "¥7,500", "¥7,000"],
              ["Main: 19 Dec 2026–22 Mar 2027", "¥10,000", "¥9,500", "¥9,000"],
              ["Top season (selected dates)", "¥12,000", "¥11,500", "¥11,000"],
              ["High top (29 Dec–3 Jan, 9–11 Jan and selected Feb dates)", "¥13,000", "¥12,500", "¥12,000"],
              ["Spring: 23–31 Mar 2027", "¥8,000", "¥7,500", "¥7,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Top-season dates are listed on the official page; check yours before you buy.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              The early season runs from 31 October to 18 December 2026, 8:30 a.m. to 4:30 p.m. The main season runs from
              19 December 2026 to 22 March 2027, 8:00 a.m. to 5:00 p.m., and the spring season from 23 to 31 March
              2027. Ticket sales close 30 minutes before the lifts.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: karuizawaPrinceLiftTicket.url, label: "Book the Karuizawa lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Karuizawa",
        intro: "The slope is next to Karuizawa Station and the outlet mall, so a ski morning fits with these.",
        tours: [karuizawaSkiSnowDayTour, karuizawaShinkansenDayTrip, karuizawaShinjukuDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the day in town, see the <Link href="/guides/attractions/karuizawa-day-trip-from-tokyo" style={linkStyle}>Karuizawa day trip from Tokyo</Link>. For other
          ski days near Tokyo, see <Link href="/guides/attractions/tokyo-snow-day-trip" style={linkStyle}>snow day trips from Tokyo</Link> and the{" "}
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Karuizawa Prince lift ticket?",
          a: `A one-day adult ticket is ¥10,000 at the window from 19 December 2026 to 22 March 2027, ¥8,000 in the early season and ¥12,000–13,000 on top-season and New Year dates. Online tickets are ¥500 less. Checked ${CHECKED}.`,
        },
        {
          q: "Is Karuizawa Prince open now?",
          a: "Yes. The 2026-27 early season started on 31 October 2026 and runs to 18 December 2026, 8:30 a.m. to 4:30 p.m.",
        },
        {
          q: "Do children pay?",
          a: "No. Children up to elementary school age ride free; a ¥100 fee applies if you book their ticket online.",
        },
        {
          q: "Is there a half-day ticket?",
          a: "Yes. The afternoon ticket is valid from 12:00 and costs ¥1,000 less than a day ticket in each season.",
        },
        {
          q: "Can I visit the summit without skiing?",
          a: "Yes. A sightseeing lift runs from 19 December 2026 to 31 March 2027, 9:00 a.m. to 4:00 p.m.",
        },
      ]}
      related={[
        { href: "/guides/attractions/karuizawa-day-trip-from-tokyo", title: "Karuizawa Day Trip from Tokyo" },
        { href: "/guides/attractions/tokyo-snow-day-trip", title: "Snow Day Trips from Tokyo" },
        { href: "/guides/attractions/naeba-lift-ticket", title: "Naeba Lift Ticket Prices" },
        { href: "/guides/attractions/fujiten-lift-ticket", title: "Fujiten Lift Ticket Prices" },
      ]}
      banner={{
        title: "Ski an hour from Tokyo",
        desc: "A one-day lift ticket for the slope by Karuizawa Station.",
        label: "View the Karuizawa lift ticket →",
      }}
    />
  );
}
