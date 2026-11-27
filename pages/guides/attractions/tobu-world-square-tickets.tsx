import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nikkoWorldHeritageDayTour } from "../../../lib/klook-links";
import { tobuWorldSquareTicket, edoWonderlandTicket, nikkoPassTobu } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Every figure is from Tobu World
// Square's own Japanese pages, read by node fetch on 28 Nov 2026: tobuws.co.jp/ticket/
// (same-day ticket adult junior-high and up 2,800 yen, child 4+ 1,400; disability 1,400 /
// 800), /information/ (November 2026 9:00-16:00 to 9:00-17:00 by date; December 2026
// 9:30-16:00 every day; January 2027 9:30-16:00 or 16:30, closed 18-24 January 2027; entry
// until one hour before closing), /park-guide/ (102 buildings from 22 countries and
// regions), /park-guide/exhibit/ (1:25 scale) and /access/ (Tobu World Square Station;
// about 2 hours by limited express from Asakusa; bus about 5 min from Kinugawa-Onsen
// Station stop 3). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/tobu-world-square-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.tobuws.co.jp/ticket/";
const HOURS = "https://www.tobuws.co.jp/information/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TobuWorldSquareTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Tobu World Square Tickets"
      title="Tobu World Square Tickets 2026: Price, Hours & Access"
      description="Tobu World Square in Kinugawa is ¥2,800 for adults and ¥1,400 for children, open 9:30–16:00 in December: 102 landmarks at 1:25 scale, 2h from Asakusa."
      h1={<>Tobu World Square Tickets 2026: <br />Price, Hours &amp; Access</>}
      subtitle="The park of miniature world landmarks in Kinugawa, Nikko: prices, winter hours, the January closure and the train from Tokyo."
      badges={[`Checked ${CHECKED}`, "¥2,800 adult", "Kinugawa"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Tobu World Square ticket is <strong>¥2,800 for adults</strong> (junior high school and up) and ¥1,400
            for children aged 4 and over. The park shows 102 buildings from 22 countries and regions at 1:25 scale.
          </p>
          <p className={styles.bodyText}>
            In December 2026 it is open <strong>9:30–16:00</strong> every day, with entry until one hour before
            closing; it closes from 18 to 24 January 2027. It has its own station, Tobu World Square, about two
            hours from Asakusa by limited express. Klook sells the ticket. Tobu World Square, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: tobuWorldSquareTicket.url, label: "Check Tobu World Square tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,800" },
        { label: "Child (4+)", value: "¥1,400" },
        { label: "December hours", value: "9:30–16:00" },
        { label: "Closed", value: "18–24 Jan 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> in winter, arrive by 15:00 — entry ends an hour before the 16:00 close. Pair it
          with Edo Wonderland or the Kinugawa onsen town on the same line.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Tobu World Square?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult covers junior high school and up; children are 4 and over. With a disability certificate the
              ticket is ¥1,400 (adult) or ¥800 (child).
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (junior high +)", "Child (4+)"],
            rows: [
              ["Same-day ticket", "¥2,800", "¥1,400"],
              ["Disability rate", "¥1,400", "¥800"],
            ],
            note: (
              <>
                Tobu World Square prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price; show the Klook QR code at the counter for a paper ticket.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              December 2026: 9:30–16:00 daily. January 2027: 9:30–16:00 or 16:30 depending on the date, closed 18–24
              January. Take the Tobu line to Tobu World Square Station (about 2 hours by limited express from
              Asakusa), or the bus from stop 3 at Kinugawa-Onsen Station, about 5 minutes.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Daily calendar</a>.
            </p>
          ),
          ctas: [{ href: tobuWorldSquareTicket.url, label: "Book Tobu World Square on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Kinugawa and Nikko",
        intro: "Edo Wonderland is in the same Kinugawa area, and the Tobu line continues to Nikko.",
        tours: [edoWonderlandTicket, nikkoPassTobu, nikkoWorldHeritageDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko day trip</Link>,{" "}
          <Link href="/guides/attractions/edo-wonderland-tickets" style={linkStyle}>Edo Wonderland tickets</Link> and the{" "}
          <Link href="/guides/transport/nikko-pass" style={linkStyle}>Nikko Pass</Link> guide. Further north in
          Tochigi,{" "}
          <Link href="/guides/attractions/nasu-safari-park-tickets" style={linkStyle}>Nasu Safari Park</Link> is a
          drive-through safari.
        </p>
      }
      faq={[
        {
          q: "How much is Tobu World Square?",
          a: `¥2,800 for adults (junior high and up) and ¥1,400 for children aged 4 and over. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours in winter?",
          a: "9:30–16:00 every day in December 2026, and 9:30–16:00 or 16:30 in January 2027. Entry ends one hour before closing.",
        },
        {
          q: "Is Tobu World Square closed in January?",
          a: "Yes, from 18 to 24 January 2027.",
        },
        {
          q: "How do I get there from Tokyo?",
          a: "Take the Tobu line from Asakusa to Tobu World Square Station, about 2 hours by limited express, or a 5-minute bus from Kinugawa-Onsen Station.",
        },
        {
          q: "Can I buy Tobu World Square tickets on Klook?",
          a: "Yes. Klook sells an admission ticket; show the QR code at the counter to receive a paper ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip" },
        { href: "/guides/attractions/edo-wonderland-tickets", title: "Edo Wonderland Tickets" },
        { href: "/guides/transport/nikko-pass", title: "Nikko Pass" },
        { href: "/guides/attractions/nasu-safari-park-tickets", title: "Nasu Safari Park Tickets" },
      ]}
      banner={{
        title: "The world at 1:25 scale",
        desc: "Admission to Tobu World Square in Kinugawa.",
        label: "View Tobu World Square tickets →",
      }}
    />
  );
}
