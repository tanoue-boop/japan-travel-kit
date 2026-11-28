import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kobeBeefHarbourKitanoDayTour, arimaTaikoNoYuSpa, kobeNadaSakeHalfDayTour } from "../../../lib/klook-links";
import { kobeAnimalKingdomTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from Kobe Animal
// Kingdom's own pages, read by node fetch on 28 Nov 2026: kobe-oukoku.com/information/fees
// (adult = junior high and up 2,400 yen, senior 65+ 1,900, elementary 1,200, ages 4-5 500,
// tax included; annual "Kingdom Pass" 8,500 / 6,700 / 4,000 / 1,700; advance web tickets,
// convenience-store tickets and Port Liner set tickets) and /information/calendar
// (November 2026: 10:00-17:00, closed on Thursdays 5, 12, 19 and 26 Nov). Address
// 7-1-9 Minatojima-minamimachi, Chuo-ku, Kobe. No Klook price is printed (403).
const ROUTE = "/guides/attractions/kobe-animal-kingdom-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kobe-oukoku.com/information/fees";
const CALENDAR = "https://www.kobe-oukoku.com/information/calendar";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KobeAnimalKingdomTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kobe Animal Kingdom Tickets"
      title="Kobe Animal Kingdom Tickets 2026: Price, Hours & Booking"
      description="Kobe Animal Kingdom on Port Island is ¥2,400 for adults, ¥1,200 for elementary pupils and ¥500 for ages 4–5. Opening hours, closed days and booking."
      h1={<>Kobe Animal Kingdom Tickets 2026: <br />Price, Hours &amp; Closed Days</>}
      subtitle="The animal and flower park on Port Island, Kobe: admission by age, the opening calendar and how to book."
      badges={[`Checked ${CHECKED}`, "¥2,400 adult", "Kobe"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Kobe Animal Kingdom admission is <strong>¥2,400 for adults</strong> (junior high school and up), ¥1,900
            for seniors 65 and over, ¥1,200 for elementary school pupils and ¥500 for children aged 4 and 5. The
            park is on Port Island in Chuo-ku, Kobe.
          </p>
          <p className={styles.bodyText}>
            In November 2026 it opens <strong>10:00–17:00 and closes on Thursdays</strong>; hours and closed days for
            other months are on the{" "}
            <a href={CALENDAR} target="_blank" rel="noopener" style={linkStyle}>operating calendar</a>. Klook sells
            the admission ticket. Kobe Animal Kingdom, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kobeAnimalKingdomTicket.url, label: "Check Kobe Animal Kingdom tickets on Klook →" }}
      stats={[
        { label: "Adult (junior high+)", value: "¥2,400" },
        { label: "Elementary / age 4–5", value: "¥1,200 / ¥500" },
        { label: "November hours", value: "10:00–17:00" },
        { label: "November closed days", value: "Thursdays" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> an easy half day from Kobe or Osaka. Check the calendar first — in November
          2026 the park closes every Thursday.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Kobe Animal Kingdom?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Seniors show official proof of age at the gate. Groups of 15 or more get a group rate if they book at
              least 3 days ahead.
            </p>
          ),
          table: {
            head: ["Ticket", "Admission", "Annual pass"],
            rows: [
              ["Adult (junior high school and up)", "¥2,400", "¥8,500"],
              ["Senior (65 and over)", "¥1,900", "¥6,700"],
              ["Elementary school", "¥1,200", "¥4,000"],
              ["Child (age 4 and 5)", "¥500", "¥1,700"],
            ],
            note: (
              <>
                Kobe Animal Kingdom prices, tax included, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "How do you get to Kobe Animal Kingdom?",
          body: (
            <p className={styles.bodyText}>
              The park is on Port Island (7-1-9 Minatojima-minamimachi), on the Port Liner from Sannomiya. Parking is
              limited, and the park itself recommends the train. It also sells set tickets that bundle admission with
              the Port Liner (and with the Hanshin line).
            </p>
          ),
          ctas: [{ href: kobeAnimalKingdomTicket.url, label: "Book Kobe Animal Kingdom on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Kobe",
        intro: "Port Island is minutes from central Kobe. These cover the rest of the day.",
        tours: [kobeBeefHarbourKitanoDayTour, kobeNadaSakeHalfDayTour, arimaTaikoNoYuSpa],
      }}
      links={
        <p className={styles.bodyText}>
          To build the day, see the{" "}
          <Link href="/guides/attractions/kobe-day-trip-from-osaka" style={linkStyle}>Kobe day trip from Osaka</Link>{" "}
          and, for dinner, the{" "}
          <Link href="/guides/attractions/kobe-beef-dinner" style={linkStyle}>Kobe beef dinner guide</Link>. For an onsen
          afternoon, see the{" "}
          <Link href="/guides/attractions/arima-onsen-day-trip" style={linkStyle}>Arima Onsen day trip</Link>, and for
          the wider trip, the{" "}
          <Link href="/guides/attractions/osaka-3-day-itinerary" style={linkStyle}>Osaka 3-day itinerary</Link>.
          {" "}Another Kobe ticket: the <Link href="/guides/attractions/kobe-nunobiki-herb-gardens-ropeway" style={{ color: "var(--red)", fontWeight: 600 }}>Nunobiki Herb Gardens & Ropeway</Link> above Shin-Kobe (¥2,500 round trip for adults).
          {" "}For orcas, <Link href="/guides/attractions/kobe-suma-seaworld-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kobe Suma Sea World</Link> costs ¥2,900–3,700 for adults by season and ¥1,700–1,800 for children.
        </p>
      }
      faq={[
        {
          q: "How much is Kobe Animal Kingdom?",
          a: `¥2,400 for adults (junior high school and up), ¥1,900 for seniors 65+, ¥1,200 for elementary pupils and ¥500 for children aged 4–5. Kobe Animal Kingdom, checked ${CHECKED}.`,
        },
        {
          q: "What are Kobe Animal Kingdom's opening hours?",
          a: "In November 2026 it is open 10:00–17:00. Check the operating calendar for other months.",
        },
        {
          q: "Is Kobe Animal Kingdom closed on Thursdays?",
          a: "In November 2026, yes — it closes on 5, 12, 19 and 26 November. Check the calendar for the month you are visiting.",
        },
        {
          q: "Is there an annual pass?",
          a: "Yes, the Kingdom Pass: ¥8,500 for adults, ¥6,700 for seniors, ¥4,000 for elementary pupils and ¥1,700 for ages 4–5, sold online only.",
        },
        {
          q: "Can I buy Kobe Animal Kingdom tickets on Klook?",
          a: "Yes. Klook sells a Kobe Animal Kingdom admission ticket; the park also sells web tickets and set tickets with the Port Liner.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka" },
        { href: "/guides/attractions/kobe-beef-dinner", title: "Kobe Beef Dinner" },
        { href: "/guides/attractions/arima-onsen-day-trip", title: "Arima Onsen Day Trip" },
        { href: "/guides/attractions/osaka-3-day-itinerary", title: "Osaka 3-Day Itinerary" },
      ]}
      banner={{
        title: "A half day on Port Island",
        desc: "Admission to Kobe Animal Kingdom.",
        label: "View Kobe Animal Kingdom tickets →",
      }}
    />
  );
}
