import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { sanrioPurolandTicket } from "../../../lib/klook-links";
import { fujikoMuseumTicket, yomiurilandTicket, ghibliMuseumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from the museum's own page, read by node fetch on 28 Nov 2026:
// fujiko-museum.com/ticket/ (hours 10:00-18:00; timed reservation only, no tickets sold at the museum; adult and
// university 1,000, high and junior high 700, child 4+ 500, 3 and under free; seven entry times 10:00-16:00, each
// with a one-hour entry window, not a time-limited session; official tickets can be cancelled up to 3 days before;
// no parking; shuttle bus from Noborito Station every 10-15 minutes, about 9 minutes, 220 yen adult, 110 child).
// No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/fujiko-f-fujio-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://fujiko-museum.com/ticket/";
const HOURS = "https://fujiko-museum.com/ticket/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function FujikoFFujioMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Fujiko F Fujio Museum tickets"
      title="Fujiko F Fujio Museum Tickets 2026: Price & Entry Times"
      description="Fujiko F Fujio (Doraemon) Museum 2026: ¥1,000 for adults, ¥700 for teens, ¥500 from age 4. Timed entry only, no door sales; shuttle bus from Noborito."
      h1={<>Fujiko F Fujio Museum Tickets 2026: <br />Price &amp; Entry Times</>}
      subtitle="What the Doraemon museum in Kawasaki costs, how the timed entry works, and how to get there from Shinjuku."
      badges={[`Checked ${CHECKED}`, "Adults ¥1,000", "Timed entry"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Tickets for the Kawasaki City Fujiko F Fujio Museum are <strong>¥1,000 for adults</strong> and university
            students, ¥700 for high and junior high school students and ¥500 from age 4; children 3 and under are free.
            There is <strong>no ticket sale at the museum</strong>: every visitor needs a timed ticket bought in advance.
          </p>
          <p className={styles.bodyText}>
            The museum is open 10 a.m. to 6 p.m., with seven entry times from 10 a.m. to 4 p.m.; once inside you can stay
            until closing. A shuttle bus runs from Noborito Station. Klook sells a timed ticket. Fujiko F Fujio Museum,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: fujikoMuseumTicket.url, label: "Check the Fujiko F Fujio Museum ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,000" },
        { label: "Junior/senior high", value: "¥700" },
        { label: "Age 4+", value: "¥500" },
        { label: "Entry times", value: "10:00–16:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the ticket before you go, because the museum sells none at the door; pick an early
          entry time if you want the whole afternoon there.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices include tax. Visitors with a disability certificate and one helper enter free but still need a ticket.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult and university student", "¥1,000"],
              ["High and junior high school", "¥700"],
              ["Child (4 and over)", "¥500"],
              ["3 and under", "Free (no ticket)"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Official tickets can be cancelled up to 3 days before. Klook sells its ticket at its own price and terms.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "Entry times and getting there",
          body: (
            <p className={styles.bodyText}>
              The museum is open 10 a.m. to 6 p.m. Entry is in seven slots on the hour from 10 a.m. to 4 p.m.; each slot can enter
              within one hour, and you can stay until closing. There is no parking. A shuttle bus from Noborito Station
              (Odakyu Line and JR Nambu Line) runs every 10 to 15 minutes and takes about 9 minutes, ¥220 for adults.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: fujikoMuseumTicket.url, label: "Book the Fujiko F Fujio Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of western Tokyo",
        intro: "The museum is near Noborito, close to these family days out.",
        tours: [yomiurilandTicket, ghibliMuseumTicket, sanrioPurolandTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For other character museums, see <Link href="/guides/attractions/ghibli-museum-tickets" style={linkStyle}>Ghibli Museum tickets</Link> and
          <Link href="/guides/attractions/sanrio-puroland-tickets" style={linkStyle}>Sanrio Puroland</Link>. Nearby is <Link href="/guides/attractions/yomiuriland-tickets" style={linkStyle}>Yomiuriland</Link>;
          for family plans, see <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo with kids</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Fujiko F Fujio Museum?",
          a: `Adults and university students pay ¥1,000, high and junior high school students ¥700, and children from 4 ¥500. Children 3 and under are free. Checked ${CHECKED}.`,
        },
        {
          q: "Can I buy tickets at the museum?",
          a: "No. The museum sells no tickets on site; every visit needs a timed ticket bought in advance.",
        },
        {
          q: "How long can I stay?",
          a: "As long as you like until closing at 18:00. The time on the ticket is only your entry window.",
        },
        {
          q: "How do I get there?",
          a: "Take the Odakyu Line or JR Nambu Line to Noborito, then the shuttle bus (about 9 minutes, ¥220 for adults). There is no parking.",
        },
        {
          q: "What are the entry times?",
          a: "Seven a day, on the hour from 10:00 to 16:00, each with a one-hour window to enter.",
        },
      ]}
      related={[
        { href: "/guides/attractions/ghibli-museum-tickets", title: "Ghibli Museum Tickets" },
        { href: "/guides/attractions/yomiuriland-tickets", title: "Yomiuriland Tickets" },
        { href: "/guides/attractions/sanrio-puroland-tickets", title: "Sanrio Puroland Tickets" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
      ]}
      banner={{
        title: "Doraemon day in Kawasaki",
        desc: "A timed ticket for the Fujiko F Fujio Museum.",
        label: "View the museum ticket →",
      }}
    />
  );
}
