import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { southernOkinawaDayTrip, shuriCastlePeaceWalkingTour } from "../../../lib/klook-links";
import { okinawaWorldTicket, dmmKariyushiAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from Okinawa World's own
// page, read by node fetch on 28 Nov 2026: gyokusendo.co.jp/okinawaworld/fee/ (adult
// 2,000 yen (15 and over), child 1,000 (ages 4-14); a ticket is needed to enter and entry
// is through Gyokusendo Cave; 9:00-17:30, last entry 16:00; Super Eisa show about 30 min at
// 10:30 / 12:30 / 14:30, Habu and mongoose show about 20 min at 11:30 / 13:30 / 15:30;
// shows in a tent in rain; craft workshops last entry 16:30; about 30-40 minutes by car
// from Naha or the airport; everywhere except the cave is barrier-free). No Klook price.
const ROUTE = "/guides/attractions/okinawa-world-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.gyokusendo.co.jp/okinawaworld/fee/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function OkinawaWorldTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Okinawa World Tickets"
      title="Okinawa World Tickets 2026: Gyokusendo Cave Price & Hours"
      description="Okinawa World and Gyokusendo Cave: ¥2,000 for ages 15 and up, ¥1,000 for ages 4–14, open 9:00–17:30 (last entry 16:00). Show times and getting there."
      h1={<>Okinawa World Tickets 2026: <br />Gyokusendo Cave Price, Hours &amp; Shows</>}
      subtitle="The theme park in Nanjo that you enter through Gyokusendo Cave: ticket prices, opening hours, Eisa show times and the drive from Naha."
      badges={[`Checked ${CHECKED}`, "¥2,000 adult", "Okinawa"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            An Okinawa World ticket is <strong>¥2,000 for ages 15 and up</strong> and ¥1,000 for children aged 4 to
            14. Entry is through Gyokusendo Cave, so the cave is included; you need a ticket to enter the park.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>9:00–17:30, with last entry at 16:00</strong>. The Super Eisa show runs at 10:30,
            12:30 and 14:30 (about 30 minutes). Okinawa World is about 30–40 minutes by car from Naha and from
            the airport. Klook sells the admission ticket. Okinawa World, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: okinawaWorldTicket.url, label: "Check Okinawa World tickets on Klook →" }}
      stats={[
        { label: "Age 15+ / 4–14", value: "¥2,000 / ¥1,000" },
        { label: "Hours", value: "9:00–17:30" },
        { label: "Last entry", value: "16:00" },
        { label: "From Naha", value: "About 30–40 min by car" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> arrive by 15:00 or so to leave time for the cave and a show — last entry is
          16:00. The cave is the one part of the park that is not barrier-free.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Okinawa World?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Children aged 15 and over pay the adult price. Groups of 15 or more and Okinawa residents have their
              own rates.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (15 and over)", "¥2,000"],
              ["Child (4 to 14)", "¥1,000"],
            ],
            note: (
              <>
                Okinawa World prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Shows",
          title: "What time are the Okinawa World shows?",
          body: null,
          table: {
            head: ["Show", "Times", "Length"],
            rows: [
              ["Super Eisa show", "10:30, 12:30, 14:30", "About 30 min"],
              ["Habu and mongoose show", "11:30, 13:30, 15:30", "About 20 min"],
            ],
            note: (
              <>
                Okinawa World show times, checked {CHECKED}. Shows run in a large tent when it rains, but may be
                cancelled when a typhoon is near or in heavy wind and rain.
              </>
            ),
          },
          ctas: [{ href: okinawaWorldTicket.url, label: "Book Okinawa World on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: southern Okinawa",
        intro: "Okinawa World is in Nanjo, in the south of the main island. These fill the rest of a southern day.",
        tours: [southernOkinawaDayTrip, dmmKariyushiAquariumTicket, shuriCastlePeaceWalkingTour],
      }}
      links={
        <p className={styles.bodyText}>
          To plan the trip, see the{" "}
          <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link> and{" "}
          <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link>. In winter, add{" "}
          <Link href="/guides/attractions/okinawa-whale-watching" style={linkStyle}>whale watching from Naha</Link>; on the
          way back to the airport, there is{" "}
          <Link href="/guides/attractions/dmm-kariyushi-aquarium-tickets" style={linkStyle}>DMM Kariyushi Aquarium</Link>.
          {" "}For a full day in the north instead, see <Link href="/guides/attractions/junglia-okinawa-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>JUNGLIA Okinawa tickets</Link> (from ¥8,800 for adults; closed most Mondays from January 2027).
        </p>
      }
      faq={[
        {
          q: "How much is Okinawa World?",
          a: `¥2,000 for ages 15 and up and ¥1,000 for ages 4 to 14. The ticket includes Gyokusendo Cave. Okinawa World, checked ${CHECKED}.`,
        },
        {
          q: "What are Okinawa World's opening hours?",
          a: "9:00–17:30, with last entry at 16:00.",
        },
        {
          q: "Is Gyokusendo Cave included in the ticket?",
          a: "Yes. You enter Okinawa World through Gyokusendo Cave, and a ticket is needed to enter the park.",
        },
        {
          q: "What time is the Eisa show?",
          a: "The Super Eisa show runs three times a day, at 10:30, 12:30 and 14:30, for about 30 minutes. The Habu and mongoose show is at 11:30, 13:30 and 15:30.",
        },
        {
          q: "How do I get to Okinawa World?",
          a: "About 30–40 minutes by car from Naha or from the airport. By public transport, take the monorail to Asahibashi and a Ryukyu Bus from the bus terminal.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours" },
        { href: "/guides/attractions/okinawa-whale-watching", title: "Okinawa Whale Watching" },
        { href: "/guides/attractions/dmm-kariyushi-aquarium-tickets", title: "DMM Kariyushi Aquarium Tickets" },
      ]}
      banner={{
        title: "Into Gyokusendo Cave",
        desc: "Admission to Okinawa World in Nanjo.",
        label: "View Okinawa World tickets →",
      }}
    />
  );
}
