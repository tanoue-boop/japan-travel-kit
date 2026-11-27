import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { southernOkinawaDayTrip, keramaHalfDaySnorkelNaha } from "../../../lib/klook-links";
import { dmmKariyushiAquariumTicket, okinawaWorldTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from DMM Kariyushi
// Aquarium's own English pages, read by node fetch on 28 Nov 2026:
// en.kariyushi-aquarium.com/fee-ticket/ (individual rates by Value / Regular / Peak day:
// adult 18+ 3,100 / 3,250 / 3,500 yen, ages 13-17 2,500 / 2,650 / 2,900, ages 4-12
// 2,000 / 2,150 / 2,400, 3 and under free with a guardian; online tickets are Regular
// admission only; same-day tickets at the machines and counter) and /opening-hours/
// (normal hours 9:00-19:00, last admission 60 minutes before closing; the calendar marks
// each day's price band and any different hours, e.g. 25 Nov 2026 9:00-18:00; about 20
// minutes by car from Naha Airport; 3-35 Toyosaki, Tomigusuku). No Klook price is printed.
const ROUTE = "/guides/attractions/dmm-kariyushi-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://en.kariyushi-aquarium.com/fee-ticket/";
const CALENDAR = "https://en.kariyushi-aquarium.com/opening-hours/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function DmmKariyushiAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="DMM Kariyushi Aquarium Tickets"
      title="DMM Kariyushi Aquarium Tickets 2026: Price & Hours"
      description="DMM Kariyushi Aquarium in Okinawa is ¥3,100–¥3,500 for adults depending on the day, open 9:00–19:00, 20 minutes from Naha Airport. Prices by age, booking."
      h1={<>DMM Kariyushi Aquarium Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="The aquarium in Tomigusuku, near Naha Airport: Value, Regular and Peak day prices, opening hours and how to buy."
      badges={[`Checked ${CHECKED}`, "From ¥3,100", "Okinawa"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            DMM Kariyushi Aquarium costs <strong>¥3,100–¥3,500 for adults</strong> (18 and over), ¥2,500–¥2,900 for
            ages 13–17 and ¥2,000–¥2,400 for ages 4–12, depending on whether the day is a Value, Regular or Peak
            day. Children aged 3 and under are free with a guardian.
          </p>
          <p className={styles.bodyText}>
            Normal hours are <strong>9:00–19:00</strong>, with last admission 60 minutes before closing; some days
            close earlier, so check the{" "}
            <a href={CALENDAR} target="_blank" rel="noopener" style={linkStyle}>operating calendar</a>. It is about 20
            minutes by car from Naha Airport. Klook sells the ticket. DMM Kariyushi Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: dmmKariyushiAquariumTicket.url, label: "Check DMM Kariyushi Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult (18+)", value: "¥3,100–¥3,500" },
        { label: "Ages 13–17 / 4–12", value: "From ¥2,500 / ¥2,000" },
        { label: "Normal hours", value: "9:00–19:00" },
        { label: "From Naha Airport", value: "About 20 min by car" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> close to the airport, so it fits an arrival or departure day. Look up your
          date on the calendar: it sets both the price band and the closing time.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is DMM Kariyushi Aquarium?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Each date on the calendar is a Value, Regular or Peak day. The aquarium&apos;s own online tickets are
              sold at the Regular price only; same-day tickets are sold at the machines and counter.
            </p>
          ),
          table: {
            head: ["Ticket", "Value", "Regular", "Peak"],
            rows: [
              ["Adult (18 and over)", "¥3,100", "¥3,250", "¥3,500"],
              ["Ages 13–17", "¥2,500", "¥2,650", "¥2,900"],
              ["Ages 4–12", "¥2,000", "¥2,150", "¥2,400"],
              ["Age 3 and under", "Free", "Free", "Free"],
            ],
            note: (
              <>
                DMM Kariyushi Aquarium prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours",
          title: "What are DMM Kariyushi Aquarium's opening hours?",
          body: (
            <p className={styles.bodyText}>
              Normal hours are 9:00–19:00, with last admission 60 minutes before closing. Some dates have different
              hours (25 November 2026, for example, closed at 18:00), and the aquarium may limit admission when it
              is busy. The address is 3-35 Toyosaki, Tomigusuku.
            </p>
          ),
          ctas: [{ href: dmmKariyushiAquariumTicket.url, label: "Book DMM Kariyushi Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: southern Okinawa",
        intro: "Tomigusuku is south of Naha, on the way to the island's southern sights.",
        tours: [okinawaWorldTicket, southernOkinawaDayTrip, keramaHalfDaySnorkelNaha],
      }}
      links={
        <p className={styles.bodyText}>
          For the bigger aquarium in the north, see{" "}
          <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets" style={linkStyle}>Churaumi Aquarium tickets</Link>.
          To plan the trip, see the{" "}
          <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link> and{" "}
          <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link>; nearby in Nanjo is{" "}
          <Link href="/guides/attractions/okinawa-world-tickets" style={linkStyle}>Okinawa World and Gyokusendo Cave</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is DMM Kariyushi Aquarium?",
          a: `¥3,100–¥3,500 for adults, ¥2,500–¥2,900 for ages 13–17 and ¥2,000–¥2,400 for ages 4–12, depending on the day's price band. Under-4s are free. DMM Kariyushi Aquarium, checked ${CHECKED}.`,
        },
        {
          q: "What are DMM Kariyushi Aquarium's opening hours?",
          a: "Normally 9:00–19:00, with last admission an hour before closing. Some dates close earlier; check the operating calendar.",
        },
        {
          q: "How far is DMM Kariyushi Aquarium from Naha Airport?",
          a: "About 20 minutes by car; the straight-line distance is about 5 km.",
        },
        {
          q: "What are Value, Regular and Peak days?",
          a: "Price bands set by date on the aquarium's calendar. Adults pay ¥3,100 on Value days, ¥3,250 on Regular days and ¥3,500 on Peak days.",
        },
        {
          q: "Can I buy DMM Kariyushi Aquarium tickets on Klook?",
          a: "Yes. Klook sells a DMM Kariyushi Aquarium ticket; the aquarium also sells Regular-price tickets online.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Churaumi Aquarium Tickets" },
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours" },
        { href: "/guides/attractions/okinawa-world-tickets", title: "Okinawa World Tickets" },
      ]}
      banner={{
        title: "An aquarium by Naha Airport",
        desc: "Admission to DMM Kariyushi Aquarium in Tomigusuku.",
        label: "View DMM Kariyushi tickets →",
      }}
    />
  );
}
