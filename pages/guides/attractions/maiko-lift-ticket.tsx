import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { galaYuzawaLiftTicket, yuzawaNakazatoLiftRental, yuzawaIwapparaSkiDayTourTokyo } from "../../../lib/klook-links";
import { maikoLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from MAIKO SNOW RESORT's own page, read by node fetch on 28 Nov 2026:
// maiko-resort.com/winter/lift.html (2026-27 opening planned 19 Dec 2026; adult / junior and senior high school /
// elementary: 1day 7,300 / 6,300 / 3,600; 2days 13,300 / 11,300 / 6,600; 3days 19,100 / 16,100 / 9,400; 4days
// 24,700 / 20,700 / 12,000; 5days 30,100 / 25,100 / 14,400; 5-hour 6,800 / 5,800 / 3,400; night from 15:30
// 2,300 / 1,800 / 1,200; 3-point 2,100 and 6-point 4,200; gondola priority lane 2,500 a day; up to two preschool
// children per guardian free; Maiko gondola 8:30-15:00 weekdays, 8:00-15:30 weekends; night 29 Dec 2026-1 Jan 2027
// and Saturdays and Sundays 2 Jan-13 Mar 2027, 15:30-20:00 on Saturdays; no night skiing on weekdays and holidays).
// No Klook price (403).
const ROUTE = "/guides/attractions/maiko-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.maiko-resort.com/winter/lift.html";
const HOURS = "https://www.maiko-resort.com/winter/lift.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MaikoLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Maiko lift ticket"
      title="Maiko Snow Resort Lift Ticket Prices 2026-27"
      description="Maiko Snow Resort 2026-27: ¥7,300 a day for adults, ¥6,300 for high school students, ¥3,600 for children, 5 days ¥30,100. Opens 19 December 2026."
      h1={<>Maiko Snow Resort Lift Ticket <br />Prices 2026-27</>}
      subtitle="What a day at Maiko costs in 2026-27, the multi-day and 5-hour tickets, night skiing and the gondola priority lane."
      badges={[`Checked ${CHECKED}`, "¥7,300 a day", "Opens 19 Dec"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>one-day lift ticket at Maiko Snow Resort is ¥7,300 for adults</strong> in 2026-27, ¥6,300 for
            junior and senior high school students and ¥3,600 for elementary school children. A 5-hour ticket is ¥6,800
            and night skiing from 3:30 p.m. is ¥2,300. Up to two preschool children per adult ride free.
          </p>
          <p className={styles.bodyText}>
            Maiko plans to open on 19 December 2026. A gondola priority lane costs ¥2,500 a day on top of a lift ticket.
            Klook sells a one-day ticket you collect from the machine with a QR code. MAIKO SNOW RESORT, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: maikoLiftTicket.url, label: "Check the Maiko lift ticket on Klook →" }}
      stats={[
        { label: "1 day, adult", value: "¥7,300" },
        { label: "1 day, teen", value: "¥6,300" },
        { label: "1 day, child", value: "¥3,600" },
        { label: "5 hours", value: "¥6,800" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> multi-day tickets save more each day you add, and five days cost ¥30,100 against
          ¥36,500 for five single days.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices for 2026-27. Teens are junior and senior high school students; children are elementary school age.
              The 5-hour ticket runs five hours from your first ride.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Teen", "Child"],
            rows: [
              ["1 day", "¥7,300", "¥6,300", "¥3,600"],
              ["2 days", "¥13,300", "¥11,300", "¥6,600"],
              ["3 days", "¥19,100", "¥16,100", "¥9,400"],
              ["5 days", "¥30,100", "¥25,100", "¥14,400"],
              ["5 hours", "¥6,800", "¥5,800", "¥3,400"],
              ["Night (from 15:30)", "¥2,300", "¥1,800", "¥1,200"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Up to two preschool children per guardian ride free; a lift ticket from the counter is still needed.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Maiko open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              Maiko plans to open on 19 December 2026. The Maiko gondola runs 8:30 a.m. to 3:00 p.m. on weekdays and 8:00 a.m.
              to 3:30 p.m. on weekends. Night skiing runs from 29 December 2026 to 1 January 2027 and on Saturdays and
              Sundays from 2 January to 13 March 2027 (3:30–8 p.m. on Saturdays); there is no night skiing on weekdays.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: maikoLiftTicket.url, label: "Book the Maiko lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: other Yuzawa-area ski days",
        intro: "Maiko is near Echigo-Yuzawa, like these resorts.",
        tours: [galaYuzawaLiftTicket, yuzawaNakazatoLiftRental, yuzawaIwapparaSkiDayTourTokyo],
      }}
      links={
        <p className={styles.bodyText}>
          For a day trip from Tokyo by shinkansen, see <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={linkStyle}>GALA Yuzawa ski day trip from Tokyo</Link> and{" "}
          <Link href="/guides/attractions/tokyo-snow-day-trip" style={linkStyle}>snow day trips from Tokyo</Link>. For the rail pass, see the{" "}
          <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>JR Tokyo Wide Pass</Link>; for a longer plan, the{" "}
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Maiko lift ticket?",
          a: `A one-day ticket is ¥7,300 for adults, ¥6,300 for junior and senior high school students and ¥3,600 for elementary school children in 2026-27. Checked ${CHECKED}.`,
        },
        {
          q: "When does Maiko open?",
          a: "Maiko Snow Resort plans to open for 2026-27 on 19 December 2026.",
        },
        {
          q: "Is there night skiing?",
          a: "Yes, from 29 December 2026 to 1 January 2027 and on weekends from 2 January to 13 March 2027. A night ticket is ¥2,300 for adults.",
        },
        {
          q: "Do small children pay?",
          a: "Up to two preschool children per guardian ride free; collect their lift tickets at a ticket office.",
        },
        {
          q: "What is the gondola priority lane?",
          a: "A ¥2,500 one-day add-on that lets you use the priority boarding lane of the gondola; it must be used with a lift ticket that covers the gondola.",
        },
      ]}
      related={[
        { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "GALA Yuzawa Ski Day Trip" },
        { href: "/guides/attractions/ishiuchi-maruyama-lift-ticket", title: "Ishiuchi Maruyama Lift Ticket" },
        { href: "/guides/attractions/kandatsu-lift-ticket", title: "Kandatsu Lift Ticket" },
        { href: "/guides/transport/tokyo-wide-pass", title: "JR Tokyo Wide Pass" },
      ]}
      banner={{
        title: "Skip the counter at Maiko",
        desc: "A one-day Maiko lift ticket, collected with a QR code.",
        label: "View the Maiko lift ticket →",
      }}
    />
  );
}
