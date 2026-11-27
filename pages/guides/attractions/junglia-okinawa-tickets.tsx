import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { churaumiKouriNorthernDayTour } from "../../../lib/klook-links";
import { jungliaOkinawaTicket, okinawaWorldTicket, dmmKariyushiAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Every figure is from JUNGLIA's own
// English pages, read by node fetch on 28 Nov 2026: junglia.jp/en/ticket (1 Day Ticket
// adult 12+ 8,000 yen / 8,800 incl. tax "~", child 4-11 5,400 / 5,940; Park & Spa adult
// 10,500 / 11,550, child 6,800 / 7,480; Premium Pass single from 1,700 / 1,870, set from
// 3,300 / 3,630; Spa ticket adult 2,800 / 3,080, child 1,700 / 1,870; under 3 free; free date
// change after purchase), /en/event/afternoon-ticket (Afternoon Ticket from December 2026,
// entry from 13:00, adult 4,500 / 4,950, child 3,100 / 3,410; Quick Visit 1-Ride Ticket
// discontinued), /en/opening-hours (hours published four months ahead; from January 2027
// closed most Mondays except holidays and peak periods), the top page (today 10:00-17:00)
// and /en/access (about 90 min by car or 120 min by direct bus from Naha Airport / Naha;
// parking 2,000 yen per car). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/junglia-okinawa-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://junglia.jp/en/ticket";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function JungliaOkinawaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="JUNGLIA Okinawa Tickets"
      title="JUNGLIA Okinawa Tickets 2026: Price, Premium Pass & Hours"
      description="JUNGLIA Okinawa's 1 Day Ticket is from ¥8,800 for adults and ¥5,940 for children; a ¥4,950 afternoon ticket starts in December. Premium Pass and hours."
      h1={<>JUNGLIA Okinawa Tickets 2026: <br />Price, Premium Pass &amp; Hours</>}
      subtitle="The theme park in northern Okinawa: what each ticket costs, what the Premium Pass is for, and how long it takes from Naha."
      badges={[`Checked ${CHECKED}`, "From ¥8,800 adult", "Okinawa"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A JUNGLIA 1 Day Ticket is <strong>from ¥8,800 for adults (12 and over)</strong> and from ¥5,940 for
            children aged 4–11, tax included; under-3s enter free. The Park &amp; Spa ticket is ¥11,550 for adults.
            A new <strong>Afternoon Ticket</strong> (entry from 13:00) is ¥4,950 for adults from December 2026,
            and the Quick Visit 1-Ride Ticket has been withdrawn.
          </p>
          <p className={styles.bodyText}>
            Today&apos;s park hours were <strong>10:00–17:00</strong>; JUNGLIA publishes each month&apos;s hours
            about four months ahead, and from January 2027 it closes on most Mondays. You can change the date of a
            ticket for free after buying. Klook sells the ticket. JUNGLIA, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jungliaOkinawaTicket.url, label: "Check JUNGLIA tickets on Klook →" }}
      stats={[
        { label: "1 Day, adult", value: "From ¥8,800" },
        { label: "1 Day, child 4–11", value: "From ¥5,940" },
        { label: "Afternoon, adult", value: "¥4,950" },
        { label: "Premium Pass", value: "From ¥1,870" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the dated 1 Day Ticket, then decide on a Premium Pass — it is required for
          GRAVITY DROP and lets you skip the queue at the ride you choose.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is JUNGLIA Okinawa?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices are tax-included and start from the figures below; the official site marks them as
              &quot;from&quot;, so some dates cost more. The Premium Pass is an add-on and needs a park ticket.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (12+)", "Child (4–11)"],
            rows: [
              ["1 Day Ticket", "From ¥8,800", "From ¥5,940"],
              ["1 Day Ticket (Park & Spa)", "¥11,550", "¥7,480"],
              ["Afternoon Ticket (from December 2026, entry 13:00)", "¥4,950", "¥3,410"],
              ["Spa ticket only", "¥3,080", "¥1,870"],
              ["Premium Pass (add-on)", "Single from ¥1,870 · set from ¥3,630", "Same"],
            ],
            note: (
              <>
                JUNGLIA prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "How do you get to JUNGLIA?",
          body: (
            <p className={styles.bodyText}>
              From Naha Airport or central Naha it is about 90 minutes by car or about 120 minutes on the direct
              JUNGLIA EXPRESS bus. Parking by the park is ¥2,000 per car, paid on the day with no reservation.
              Hours change by season and are published month by month on the official calendar.
            </p>
          ),
          ctas: [{ href: jungliaOkinawaTicket.url, label: "Book JUNGLIA on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Okinawa",
        intro: "JUNGLIA is a full day on its own. These are the other Okinawa tickets and tours on Klook.",
        tours: [churaumiKouriNorthernDayTour, okinawaWorldTicket, dmmKariyushiAquariumTicket],
      }}
      links={
        <p className={styles.bodyText}>
          To plan the rest of the trip, see the{" "}
          <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link>, the{" "}
          <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets" style={linkStyle}>Churaumi Aquarium tickets</Link>{" "}
          guide and{" "}
          <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link>. In the south,{" "}
          <Link href="/guides/attractions/okinawa-world-tickets" style={linkStyle}>Okinawa World</Link> has the
          Gyokusendo cave.
          {" "}Also in the north, <Link href="/guides/attractions/nago-pineapple-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Nago Pineapple Park</Link> is ¥1,500 for adults and open every day 10:00–18:00.
        </p>
      }
      faq={[
        {
          q: "How much is a JUNGLIA ticket?",
          a: `The 1 Day Ticket is from ¥8,800 for adults (12+) and from ¥5,940 for children aged 4–11, tax included; under-3s are free. Checked ${CHECKED}.`,
        },
        {
          q: "Is there a cheaper afternoon ticket?",
          a: "Yes. From December 2026 the Afternoon Ticket allows entry from 13:00 until closing: ¥4,950 for adults and ¥3,410 for children. It replaces the Quick Visit 1-Ride Ticket.",
        },
        {
          q: "Do I need a Premium Pass?",
          a: "Only if you want GRAVITY DROP, which requires one, or a set time at another ride. It is an add-on from ¥1,870 (single) or ¥3,630 (set) and needs a park ticket.",
        },
        {
          q: "What are JUNGLIA's opening hours?",
          a: "Hours vary by date and are published about four months ahead; on 28 November 2026 the park was open 10:00–17:00. From January 2027 it is closed on most Mondays.",
        },
        {
          q: "Can I buy JUNGLIA tickets on Klook?",
          a: "Yes. Klook sells JUNGLIA OKINAWA tickets, including options with the Premium Pass.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Churaumi Aquarium Tickets" },
        { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours" },
        { href: "/guides/attractions/okinawa-world-tickets", title: "Okinawa World Tickets" },
      ]}
      banner={{
        title: "A day at JUNGLIA",
        desc: "Dated entry to JUNGLIA OKINAWA in the north of the island.",
        label: "View JUNGLIA tickets →",
      }}
    />
  );
}
