import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kawagoeMorningWalkingTour, kawagoeKimonoVasara } from "../../../lib/klook-links";
import { railwayMuseumSaitamaTicket, moominvalleyParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the museum's own page, read by node fetch on 28 Nov 2026:
// railway-museum.jp/information/ (admission, tax included: advance (until the day before) general 1,500, elementary
// to high school 500, infant 3 to preschool 200; on the day 1,600 / 600 / 300; online advance tickets need no
// membership; tickets with mini-train or simulator reservations only from Seven Ticket; ticket machines sell same-day
// tickets from 10:00, payment by transport IC card or cash; annual passport 6,200 / 2,500 / 1,000; weekday afternoon
// pass from 12:00 4,800 / 2,000 / 800; hours 10:00-17:00, last entry 16:30; closed Tuesdays and over New Year).
// No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/railway-museum-saitama-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.railway-museum.jp/information/";
const HOURS = "https://www.railway-museum.jp/information/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function RailwayMuseumSaitamaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Railway Museum tickets"
      title="Railway Museum Saitama Tickets 2026: Price, Hours & Booking"
      description="The Railway Museum in Saitama 2026: adults ¥1,500 in advance or ¥1,600 on the day, children ¥500–600. Open 10:00–17:00, closed Tuesdays. How to book."
      h1={<>Railway Museum Saitama Tickets 2026: <br />Price, Hours &amp; Booking</>}
      subtitle="What entry to JR East’s museum in Omiya costs, why buying the day before saves ¥100, and which tickets include the simulators."
      badges={[`Checked ${CHECKED}`, "From ¥1,500", "Closed Tuesdays"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Adult entry to the Railway Museum is ¥1,500 if bought by the day before</strong> and ¥1,600 on the
            day. Elementary to high school students pay ¥500 in advance or ¥600 on the day, and children from 3 to
            preschool age ¥200 or ¥300.
          </p>
          <p className={styles.bodyText}>
            The museum is open <strong>10 a.m. to 5 p.m. (last entry 4:30 p.m.) and closed on Tuesdays</strong> and over
            New Year. Tickets with a mini-train or simulator slot are sold only through Seven Ticket. Klook sells a dated
            advance ticket. The Railway Museum, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: railwayMuseumSaitamaTicket.url, label: "Check the Railway Museum ticket on Klook →" }}
      stats={[
        { label: "Adult, advance", value: "¥1,500" },
        { label: "Adult, on the day", value: "¥1,600" },
        { label: "Child (6–18), advance", value: "¥500" },
        { label: "Hours", value: "10:00–17:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the day before to save ¥100 a person and skip the ticket machines; if the
          simulators matter, book the Seven Ticket version with a slot instead.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              All prices include tax. Same-day tickets are sold at the museum machines from 10 a.m., paid by transport IC
              card or cash. For repeat visits the annual passport is ¥6,200 for adults.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Elementary to high school", "Age 3 to preschool"],
            rows: [
              ["Advance (until the day before)", "¥1,500", "¥500", "¥200"],
              ["On the day", "¥1,600", "¥600", "¥300"],
              ["Annual passport", "¥6,200", "¥2,500", "¥1,000"],
              ["Weekday afternoon pass (1 year)", "¥4,800", "¥2,000", "¥800"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Children under 3 are not listed in the fee table. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the Railway Museum open?",
          body: (
            <p className={styles.bodyText}>
              From 10 a.m. to 5 p.m., with last entry at 4:30 p.m. It is closed every Tuesday and over the New Year holidays;
              the museum calendar shows the exceptions.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: railwayMuseumSaitamaTicket.url, label: "Book the Railway Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Saitama",
        intro: "Omiya is in Saitama, like Kawagoe and Hanno, so the museum pairs with these.",
        tours: [kawagoeMorningWalkingTour, kawagoeKimonoVasara, moominvalleyParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the day, see the <Link href="/guides/attractions/kawagoe-day-trip" style={linkStyle}>Kawagoe day trip</Link> or
          <Link href="/guides/attractions/moominvalley-park-tickets" style={linkStyle}>Moominvalley Park</Link>. Other train museums: the
          <Link href="/guides/attractions/kyoto-railway-museum-tickets" style={linkStyle}>Kyoto Railway Museum</Link> and the
          <Link href="/guides/attractions/scmaglev-railway-park-tickets" style={linkStyle}>SCMAGLEV and Railway Park</Link> in Nagoya.
        </p>
      }
      faq={[
        {
          q: "How much is the Railway Museum in Saitama?",
          a: `Adults pay ¥1,500 in advance or ¥1,600 on the day; elementary to high school students ¥500 or ¥600; children from 3 to preschool ¥200 or ¥300. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "10:00 to 17:00, with last entry at 16:30.",
        },
        {
          q: "Which day is it closed?",
          a: "Every Tuesday, and over the New Year holidays. Check the museum calendar for exceptions.",
        },
        {
          q: "How do I book the simulators or the mini train?",
          a: "Tickets with a mini-train, E5, D51 or conductor simulator reservation are sold only through Seven Ticket.",
        },
        {
          q: "Can I pay with Suica?",
          a: "Yes. The museum ticket machines take transport IC cards and cash.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kawagoe-day-trip", title: "Kawagoe Day Trip" },
        { href: "/guides/attractions/kyoto-railway-museum-tickets", title: "Kyoto Railway Museum Tickets" },
        { href: "/guides/attractions/scmaglev-railway-park-tickets", title: "SCMAGLEV and Railway Park" },
        { href: "/guides/transport/jr-east-pass", title: "JR East Pass" },
      ]}
      banner={{
        title: "Japan’s trains, from steam to shinkansen",
        desc: "A dated advance ticket for the Railway Museum.",
        label: "View the Railway Museum ticket →",
      }}
    />
  );
}
