import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { churaumiAquariumTicket } from "../../../lib/klook-links";
import { kouriOceanTowerTicket, nagoPineappleParkTicket, busenaMarineParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the tower's own page, read by node fetch on 28 Nov 2026:
// kouri-oceantower.com/facility.html (admission adult 16+ 1,000, child 6-15 500, under elementary school free,
// junior/senior high category abolished; groups of 10+ 900 / 450; hours 10:00-18:00, last entry 17:30; open every
// day, may close in typhoons; restaurant 11:00-18:00; 200 parking spaces; by car about 1h30-2h from Naha via the
// expressways, about 25 minutes from Churaumi Aquarium). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/kouri-ocean-tower-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kouri-oceantower.com/facility.html";
const HOURS = "https://www.kouri-oceantower.com/facility.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KouriOceanTowerTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kouri Ocean Tower tickets"
      title="Kouri Ocean Tower Tickets 2026: Price, Hours & Access"
      description="Kouri Ocean Tower tickets 2026: ¥1,000 for ages 16 and over, ¥500 for ages 6–15, free under school age. Open 10:00–18:00 daily, 25 minutes from Churaumi."
      h1={<>Kouri Ocean Tower Tickets 2026: <br />Price, Hours &amp; Access</>}
      subtitle="What the observation tower on Kouri Island costs, when it is open, and how it fits into a day in northern Okinawa."
      badges={[`Checked ${CHECKED}`, "¥1,000", "Open daily"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to the Kouri Ocean Tower is ¥1,000 for visitors aged 16 and over</strong> and ¥500 for ages 6 to
            15. Children under elementary school age enter free. Groups of ten or more pay ¥900 and ¥450.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>every day from 10 a.m. to 6 p.m.</strong> (last entry 5:30 p.m.), though it can close in a
            typhoon. You get there by car: about 1.5 to 2 hours from Naha on the expressway, or about 25 minutes from
            Churaumi Aquarium. Klook sells an entry ticket. Kouri Ocean Tower, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kouriOceanTowerTicket.url, label: "Check the Kouri Ocean Tower ticket on Klook →" }}
      stats={[
        { label: "Adult (16+)", value: "¥1,000" },
        { label: "Child (6–15)", value: "¥500" },
        { label: "Hours", value: "10:00–18:00" },
        { label: "From Churaumi", value: "about 25 min" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a short, cheap stop on the drive between Churaumi Aquarium and the Motobu coast;
          go in the afternoon after the aquarium and before the last entry at 5:30 p.m.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The separate junior and senior high school price has been abolished, so anyone 16 and over pays the adult
              price. Visitors with a disability certificate and one companion pay half.
            </p>
          ),
          table: {
            head: ["Ticket", "Individual", "Group (10+)"],
            rows: [
              ["Adult (16 and over)", "¥1,000", "¥900"],
              ["Child (6–15)", "¥500", "¥450"],
              ["Under elementary school age", "Free", "Free"],
              ["With disability certificate", "¥500 / ¥250", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                The restaurant and shop are paid separately. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the Kouri Ocean Tower open?",
          body: (
            <p className={styles.bodyText}>
              Every day from 10 a.m. to 6 p.m.; last entry 5:30 p.m. The restaurant serves from 11 a.m. (food last order 5
              p.m.). It can close or change its hours in a typhoon. There are 200 parking spaces.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kouriOceanTowerTicket.url, label: "Book the Kouri Ocean Tower on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: northern Okinawa",
        intro: "Kouri Island is next to the Motobu Peninsula, so the tower pairs with these.",
        tours: [churaumiAquariumTicket, nagoPineappleParkTicket, busenaMarineParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the day around it, see the <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link> and
          <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets" style={linkStyle}>Churaumi Aquarium tickets</Link>. On the way north are
          <Link href="/guides/attractions/nago-pineapple-park-tickets" style={linkStyle}>Nago Pineapple Park</Link> and <Link href="/guides/attractions/busena-marine-park-tickets" style={linkStyle}>Busena Marine Park</Link>;
          without a car, see <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Kouri Ocean Tower?",
          a: `Entry is ¥1,000 for ages 16 and over and ¥500 for ages 6 to 15. Children under elementary school age are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "10:00 to 18:00 every day, with last entry at 17:30. It can close in a typhoon.",
        },
        {
          q: "How do I get there?",
          a: "By car. The tower says it is about 1.5 to 2 hours from Naha on the expressways and about 25 minutes from Churaumi Aquarium.",
        },
        {
          q: "Is there parking?",
          a: "Yes, 200 spaces in three car parks, plus ten bus spaces.",
        },
        {
          q: "Is there a student price?",
          a: "No longer. The junior and senior high school price has been abolished; ages 16 and over pay ¥1,000.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Churaumi Aquarium Tickets" },
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/nago-pineapple-park-tickets", title: "Nago Pineapple Park Tickets" },
        { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours" },
      ]}
      banner={{
        title: "The view over Kouri Bridge",
        desc: "An entry ticket for the Kouri Ocean Tower.",
        label: "View the Kouri Ocean Tower ticket →",
      }}
    />
  );
}
