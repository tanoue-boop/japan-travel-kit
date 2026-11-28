import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { churaumiAquariumTicket } from "../../../lib/klook-links";
import { busenaMarineParkTicket, nagoPineappleParkTicket, jungliaOkinawaTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from Busena Marine Park's own pages, read by node fetch on 28 Nov 2026:
// busena-marinepark.com/charge.html (underwater observatory adult 1,050, child 4 to junior high 530; glass-bottom
// boat 1,560 / 780; set 2,100 / 1,050; group discounts from 10; observatory Nov-Mar 9:00-17:30, last entry 17:00,
// Apr-Oct 9:00-18:00, last 17:30; boat Nov-Mar every hour at :10, :30 and :50, first 9:10, last 17:00, 36 seats;
// free shuttle bus from the beach house every 20 minutes) and /information/ (all facilities closed on 6, 13, 18, 22,
// 25 and 29 Dec 2026; low-tide notices warn the boat may not sail). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/busena-marine-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.busena-marinepark.com/charge.html";
const HOURS = "https://www.busena-marinepark.com/charge.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function BusenaMarineParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Busena Marine Park tickets"
      title="Busena Marine Park Tickets 2026: Observatory & Glass Boat"
      description="Busena Marine Park 2026: underwater observatory ¥1,050, glass-bottom boat ¥1,560, both ¥2,100 for adults. Boat times, winter hours and December closures."
      h1={<>Busena Marine Park Tickets 2026: <br />Observatory &amp; Glass Boat</>}
      subtitle="What the underwater observatory and glass-bottom boat in Nago cost, how often the boat sails, and the closed days in December."
      badges={[`Checked ${CHECKED}`, "Set ¥2,100", "Boat every 20 min"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            At Busena Marine Park the <strong>underwater observatory is ¥1,050</strong> for adults and the
            <strong> glass-bottom boat ¥1,560</strong>; <strong>both together are ¥2,100</strong>. Children aged 4 to junior
            high school pay half (¥530, ¥780 and ¥1,050).
          </p>
          <p className={styles.bodyText}>
            From November to March the observatory is open 9 a.m. to 5:30 p.m. (last entry 5 p.m.) and the boat leaves at
            :10, :30 and :50 past each hour until 5 p.m. The park is <strong>closed on 6, 13, 18, 22, 25 and 29 December
            2026</strong>. Klook sells observatory and boat tickets. Busena Marine Park, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: busenaMarineParkTicket.url, label: "Check the Busena tickets on Klook →" }}
      stats={[
        { label: "Observatory", value: "¥1,050" },
        { label: "Glass-bottom boat", value: "¥1,560" },
        { label: "Both (set)", value: "¥2,100" },
        { label: "Child (4–15)", value: "Half price" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the ¥2,100 set saves ¥510 on doing both; check the December closed days and the low-tide
          notices before you drive up to Nago.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Child prices are for ages 4 to junior high school. Groups of 10 or more get a discount. A free shuttle bus runs
              from the beach house to the observatory.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Child (4 to junior high)"],
            rows: [
              ["Underwater observatory", "¥1,050", "¥530"],
              ["Glass-bottom boat", "¥1,560", "¥780"],
              ["Set (observatory + boat)", "¥2,100", "¥1,050"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells its tickets at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Busena Marine Park open?",
          body: (
            <p className={styles.bodyText}>
              November to March: the observatory is open 9 a.m. to 5:30 p.m. (last entry 5 p.m.); the boat sails at :10, :30 and
              :50 past the hour from 9:10 a.m., with the last boat at 5 p.m. April to October the observatory stays open to
              6 p.m. All facilities close on 6, 13, 18, 22, 25 and 29 December 2026, and the boat may not sail at low tide.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: busenaMarineParkTicket.url, label: "Book Busena Marine Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of northern Okinawa",
        intro: "Busena is in Nago on the way to the Motobu Peninsula, so it pairs with these.",
        tours: [churaumiAquariumTicket, nagoPineappleParkTicket, jungliaOkinawaTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For a trip plan, see the <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link> and
          <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link>. Nearby in the north: <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets" style={linkStyle}>Churaumi Aquarium</Link>
          and <Link href="/guides/attractions/nago-pineapple-park-tickets" style={linkStyle}>Nago Pineapple Park</Link>.
          {" "}On the same drive, the <Link href="/guides/attractions/kouri-ocean-tower-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kouri Ocean Tower</Link> is ¥1,000 for adults, 10:00–18:00 every day.
        </p>
      }
      faq={[
        {
          q: "How much is Busena Marine Park?",
          a: `The underwater observatory is ¥1,050 for adults, the glass-bottom boat ¥1,560, and a set of both ¥2,100. Children aged 4 to junior high pay half. Checked ${CHECKED}.`,
        },
        {
          q: "How often does the glass-bottom boat sail?",
          a: "From November to March at 10, 30 and 50 minutes past each hour, from 9:10 to the last boat at 17:00.",
        },
        {
          q: "Is Busena Marine Park closed in December?",
          a: "Yes, on 6, 13, 18, 22, 25 and 29 December 2026 for all facilities.",
        },
        {
          q: "What are the observatory hours?",
          a: "9:00 to 17:30 (last entry 17:00) from November to March, and 9:00 to 18:00 (last entry 17:30) from April to October.",
        },
        {
          q: "Can the boat be cancelled?",
          a: "Yes. The park posts notices on low-tide days that the glass-bottom boat may not sail, and it can stop for bad weather.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Okinawa Churaumi Aquarium" },
        { href: "/guides/attractions/nago-pineapple-park-tickets", title: "Nago Pineapple Park" },
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours" },
      ]}
      banner={{
        title: "See the reef without getting wet",
        desc: "Busena underwater observatory and glass-bottom boat tickets.",
        label: "View the Busena tickets →",
      }}
    />
  );
}
