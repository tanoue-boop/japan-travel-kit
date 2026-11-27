import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { galaYuzawaLiftTicket, yuzawaNakazatoLiftRental, echigoYuzawaStationSkiRental } from "../../../lib/klook-links";
import { kandatsuLiftRental } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from Kandatsu Snow Resort's own page, read by node fetch on 28 Nov 2026:
// kandatsu.com/price/ (pre-season 11-18 Dec 2026 8:00-16:00; top season 19 Dec 2026-28 Mar 2027 7:00 (weekdays
// 8:00)-16:00; New Year 30 Dec 2026-3 Jan 2027 7:00-16:00; spring 29 Mar-11 Apr 2027 8:00-16:00; night 18:00-2:00
// on Fridays, Saturdays and nights before holidays 18 Dec 2026-27 Mar 2027 and every night 29 Dec-2 Jan; window
// 1-day adult / child (elementary): weekdays, Sundays, holidays and New Year 5,800 / 3,500, Saturdays and special
// days 6,800 / 4,000; daytime 4-hour 4,700 / 3,000 and 4,900 / 3,500; web 1-day (on sale from 19 Dec) by the day
// before 5,300 / 3,000 and 5,800 / 3,500, same day 5,500 / 3,000 and 6,000 / 3,500; early-bird 4,500 sold to
// 10 Dec, valid to 28 Mar; night 4,900 / 3,500; night 4-hour 3,900 / 3,000; 1 ride 1,000; free on your birthday).
// No Klook price (403).
const ROUTE = "/guides/attractions/kandatsu-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kandatsu.com/price/";
const HOURS = "https://www.kandatsu.com/price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KandatsuLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kandatsu lift ticket"
      title="Kandatsu Lift Ticket Prices 2026-27: Day, Night & Online"
      description="Kandatsu Snow Resort 2026-27: ¥5,800 a day for adults (¥6,800 on Saturdays), ¥5,300 online, night skiing to 2 a.m. for ¥4,900. Season dates and hours."
      h1={<>Kandatsu Lift Ticket Prices 2026-27: <br />Day, Night &amp; Online</>}
      subtitle="What a day at Kandatsu costs in 2026-27, how the Saturday and online prices differ, and the late-night skiing."
      badges={[`Checked ${CHECKED}`, "¥5,800 a day", "Night to 2 a.m."]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>one-day lift ticket at Kandatsu is ¥5,800 for adults</strong> on weekdays, Sundays, holidays and
            New Year, and ¥6,800 on Saturdays and special days. Online the day before, it is ¥5,300 and ¥5,800.
            Elementary school children pay ¥3,500. Night skiing, 6 p.m. to 2 a.m. on Fridays and Saturdays, is ¥4,900.
          </p>
          <p className={styles.bodyText}>
            Pre-season skiing starts on 11 December 2026 and the top season runs from 19 December to 28 March 2027. On
            your birthday, a day ticket is free with photo ID. Klook sells a Kandatsu day ticket with ski or snowboard
            gear and ski wear. Kandatsu Snow Resort, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kandatsuLiftRental.url, label: "Check the Kandatsu lift ticket on Klook →" }}
      stats={[
        { label: "1 day, weekday / Sunday", value: "¥5,800" },
        { label: "1 day, Saturday", value: "¥6,800" },
        { label: "Online, day before", value: "¥5,300" },
        { label: "Night (18:00–2:00)", value: "¥4,900" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> avoid Saturdays if you can, when every ticket costs more; buying online the day
          before saves ¥500 on any date.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult and child (elementary school) prices for 2026-27. Online day tickets go on sale from 19 December. An
              early-bird ticket at ¥4,500, valid to 28 March, is on sale until 10 December.
            </p>
          ),
          table: {
            head: ["Ticket", "Weekday / Sun / holiday", "Saturday / special", "Child (Sat)"],
            rows: [
              ["1 day, window", "¥5,800", "¥6,800", "¥3,500 (¥4,000)"],
              ["1 day, online by the day before", "¥5,300", "¥5,800", "¥3,000 (¥3,500)"],
              ["1 day, online same day", "¥5,500", "¥6,000", "¥3,000 (¥3,500)"],
              ["4 hours (daytime)", "¥4,700", "¥4,900", "¥3,000 (¥3,500)"],
              ["Night (18:00–2:00)", "¥4,900", "¥4,900", "¥3,500"],
              ["Night 4 hours", "¥3,900", "¥3,900", "¥3,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells the day ticket with gear and ski wear at its own price; unused tickets or rentals are not refunded.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Kandatsu open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              Pre-season runs from 11 to 18 December 2026 (8:00 a.m. to 4:00 p.m.). The top season runs from 19 December 2026
              to 28 March 2027, from 7:00 a.m. (8:00 on weekdays) to 4:00 p.m., and spring from 29 March to 11 April 2027.
              Night skiing runs 6 p.m. to 2 a.m. on Fridays, Saturdays and nights before holidays, and every night from
              29 December to 2 January.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kandatsuLiftRental.url, label: "Book the Kandatsu lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: other Yuzawa-area ski days",
        intro: "Kandatsu is in Yuzawa, like these resorts.",
        tours: [galaYuzawaLiftTicket, yuzawaNakazatoLiftRental, echigoYuzawaStationSkiRental],
      }}
      links={
        <p className={styles.bodyText}>
          For a day trip from Tokyo by shinkansen, see <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={linkStyle}>GALA Yuzawa ski day trip from Tokyo</Link> and
          <Link href="/guides/attractions/tokyo-snow-day-trip" style={linkStyle}>snow day trips from Tokyo</Link>. For the rail pass and insurance, see the
          <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>JR Tokyo Wide Pass</Link> and
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Kandatsu lift ticket?",
          a: `A one-day adult ticket is ¥5,800 on weekdays, Sundays and holidays and ¥6,800 on Saturdays and special days in 2026-27. Online the day before, it is ¥5,300 and ¥5,800. Checked ${CHECKED}.`,
        },
        {
          q: "When does Kandatsu open?",
          a: "Pre-season skiing starts on 11 December 2026, and the top season runs from 19 December 2026 to 28 March 2027.",
        },
        {
          q: "Is there night skiing?",
          a: "Yes, from 6 p.m. to 2 a.m. on Fridays, Saturdays and nights before holidays, and every night from 29 December to 2 January. A night ticket is ¥4,900.",
        },
        {
          q: "Is it free on my birthday?",
          a: "Yes. Kandatsu gives a free day ticket on your birthday if you show original ID with your photo and date of birth.",
        },
        {
          q: "How much is it for children?",
          a: "Elementary school children pay ¥3,500 for a day ticket at the window (¥4,000 on Saturdays).",
        },
      ]}
      related={[
        { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "GALA Yuzawa Ski Day Trip" },
        { href: "/guides/attractions/ishiuchi-maruyama-lift-ticket", title: "Ishiuchi Maruyama Lift Ticket" },
        { href: "/guides/attractions/naeba-lift-ticket", title: "Naeba Lift Ticket Prices" },
        { href: "/guides/attractions/tokyo-snow-day-trip", title: "Snow Day Trips from Tokyo" },
      ]}
      banner={{
        title: "Ski Kandatsu with the gear ready",
        desc: "A Kandatsu day ticket with rental and ski wear.",
        label: "View the Kandatsu package →",
      }}
    />
  );
}
