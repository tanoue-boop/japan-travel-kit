import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { himejiCastleKokoenGuidedTour, arimaHimejiRokkoDayTour } from "../../../lib/klook-links";
import { himejiCentralParkTicket, kobeAnimalKingdomTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the park's own pages, read by node fetch on 28 Nov 2026:
// central-park.co.jp/ticket/ (all tax included; entry (amusement park, safari, pool, ice skating) adult (junior high+) /
// elementary / infant (3 to preschool) by date class: A 4,200 / 2,400 / 1,300, B 4,400 / 2,600 / 1,400, C 4,600 / 2,800 /
// 1,500; 1day pass (entry + attraction free pass) A 7,000 / 4,900 / 2,400, B 7,200 / 5,100 / 2,500, C 7,400 / 5,300 /
// 2,600; rides not included in entry; drive-through safari by own car or Safari Ride; dogs 500; parking 1,200 a car) and
// central-park.co.jp/calendar/ (window.priceCalendarMap and calendarOverrideMap: Dec 2026 10:00-16:30, closed 1-2, 8-9,
// 15-16 Dec and 12-13, 19-20, 26-27 Jan; class A on Dec weekdays and 21-25 Dec, B on weekends and 26 Dec - 6 Jan; ice
// skating from 19 Dec) and /access/ (Shinki bus from Himeji Station north exit 590 adult, 300 child; departures 10:00 to
// 14:00 hourly, back at 16:00 and 17:00). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/himeji-central-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.central-park.co.jp/ticket/";
const HOURS = "https://www.central-park.co.jp/calendar/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HimejiCentralParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Himeji Central Park tickets"
      title="Himeji Central Park Tickets 2026: Price, Safari & Hours"
      description="Himeji Central Park 2026: entry ¥4,200–4,600 for adults by date, the 1day pass with rides ¥7,000–7,400. Winter hours 10:00–16:30; closed some Tue–Wed."
      h1={<>Himeji Central Park Tickets 2026: <br />Price, Safari &amp; Hours</>}
      subtitle="What the safari and amusement park outside Himeji costs on each kind of day, what entry covers, and the winter closing days."
      badges={[`Checked ${CHECKED}`, "From ¥4,200", "Safari + rides"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to Himeji Central Park is ¥4,200, ¥4,400 or ¥4,600 for adults</strong> (junior high and older)
            depending on the date, covering the safari, the amusement park and, in season, the pool or ice rink. Rides are
            extra; the <strong>1day pass with unlimited rides is ¥7,000 to ¥7,400</strong>. Elementary school children pay
            ¥2,400 to ¥2,800 for entry.
          </p>
          <p className={styles.bodyText}>
            In winter the park opens <strong>10 a.m. to 4:30 p.m.</strong>. In December 2026 it is closed on 1–2, 8–9 and
            15–16 December, then open daily from 17 December to 11 January. Klook sells the park admission. Himeji Central
            Park, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: himejiCentralParkTicket.url, label: "Check the Himeji Central Park ticket on Klook →" }}
      stats={[
        { label: "Entry, adult", value: "¥4,200–4,600" },
        { label: "1day pass, adult", value: "¥7,000–7,400" },
        { label: "Winter hours", value: "10:00–16:30" },
        { label: "Parking", value: "¥1,200" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> weekdays are the cheapest days; buy the 1day pass only if you plan several rides, and
          remember the drive-through safari needs a car or a Safari Ride seat.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              In December 2026 weekdays (and 21–25 December) are the ¥4,200 days and weekends the ¥4,400 days; from 26
              December to 6 January every day is ¥4,400. The drive-through safari is by your own car or on a Safari Ride,
              booked at the park on the day. Parking is ¥1,200 a car, and dogs are ¥500.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (junior high+)", "Elementary", "Age 3 to preschool"],
            rows: [
              ["Entry, A days", "¥4,200", "¥2,400", "¥1,300"],
              ["Entry, B days", "¥4,400", "¥2,600", "¥1,400"],
              ["Entry, C days", "¥4,600", "¥2,800", "¥1,500"],
              ["1day pass, A days", "¥7,000", "¥4,900", "¥2,400"],
              ["1day pass, B days", "¥7,200", "¥5,100", "¥2,500"],
              ["1day pass, C days", "¥7,400", "¥5,300", "¥2,600"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                The date class is shown on the official calendar. Entry does not include rides. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Himeji Central Park open in winter?",
          body: (
            <p className={styles.bodyText}>
              In December 2026 and January 2027 the safari and amusement park open from 10 a.m. to 4:30 p.m. The park is closed
              on 1–2, 8–9 and 15–16 December and on 12–13, 19–20 and 26–27 January, and the ice rink opens from 19 December.
              Shinki buses run from the north exit of Himeji Station (¥590 for adults), with the timetable showing departures
              from 10 a.m. to 2 p.m. and returns at 4 p.m. and 5 p.m.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: himejiCentralParkTicket.url, label: "Book Himeji Central Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Himeji and Kobe",
        intro: "The park is a bus ride from Himeji Station, so it pairs with these.",
        tours: [himejiCastleKokoenGuidedTour, kobeAnimalKingdomTicket, arimaHimejiRokkoDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the castle, see the <Link href="/guides/attractions/himeji-castle-day-trip" style={linkStyle}>Himeji Castle day trip</Link>. The
          <Link href="/guides/transport/kansai-wide-area-pass" style={linkStyle}>Kansai Wide Area Pass</Link> covers the train to Himeji, and in Kobe there is
          <Link href="/guides/attractions/kobe-animal-kingdom-tickets" style={linkStyle}>Kobe Animal Kingdom</Link> for another animal day.
        </p>
      }
      faq={[
        {
          q: "How much is Himeji Central Park?",
          a: `Entry is ¥4,200, ¥4,400 or ¥4,600 for adults depending on the date, and ¥2,400 to ¥2,800 for elementary school children. The 1day pass with rides is ¥7,000 to ¥7,400 for adults. Checked ${CHECKED}.`,
        },
        {
          q: "Does entry include the rides?",
          a: "No. Rides need tickets or the attraction free pass; the 1day pass sets entry and the free pass together.",
        },
        {
          q: "Can I do the safari without a car?",
          a: "Yes, on a Safari Ride, booked at the park on the day. The walking safari is reached by a free shuttle from the amusement park.",
        },
        {
          q: "When is it closed in December?",
          a: "On 1–2, 8–9 and 15–16 December 2026. It opens daily from 17 December to 11 January, 10:00 to 16:30.",
        },
        {
          q: "How do I get there by bus?",
          a: "Shinki buses run from the north exit of Himeji Station; the fare is ¥590 for adults.",
        },
      ]}
      related={[
        { href: "/guides/attractions/himeji-castle-day-trip", title: "Himeji Castle Day Trip" },
        { href: "/guides/transport/kansai-wide-area-pass", title: "Kansai Wide Area Pass" },
        { href: "/guides/attractions/kobe-animal-kingdom-tickets", title: "Kobe Animal Kingdom Tickets" },
        { href: "/guides/attractions/adventure-world-tickets", title: "Adventure World Tickets" },
      ]}
      banner={{
        title: "Safari and rides near Himeji",
        desc: "Admission to Himeji Central Park.",
        label: "View the Himeji Central Park ticket →",
      }}
    />
  );
}
