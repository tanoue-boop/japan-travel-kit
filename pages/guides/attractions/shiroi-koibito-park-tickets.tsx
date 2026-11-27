import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { otaruSnowParkDayTour, sapporoJozankeiBuddhaDayTour } from "../../../lib/klook-links";
import { shiroiKoibitoParkTicket, otaruAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from Shiroi Koibito Park's own site (ISHIYA), read by node fetch on 28 Nov 2026:
// shiroikoibitopark.jp/en/about.html (paid area: adult 16+ 1,200 yen, child 4 to junior high 600, under 3
// free; groups of 20+ 900 / 500; 10:00-17:30, last admission 16:30), /en/attractions.html (paid area includes
// the Shiroikoibito Factory, BIGBOX, Chocotopia House; Dream Kitchen courses 1,500-2,000 yen; Cacao Pod 500 yen)
// and /en/access.html (Miyanosawa, Nishi-ku, Sapporo; parking 300 yen an hour, 3 hours for 300 yen with a paid
// ticket; no free shuttle bus). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/shiroi-koibito-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.shiroikoibitopark.jp/en/about.html";
const HOURS = "https://www.shiroikoibitopark.jp/en/attractions.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShiroiKoibitoParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Shiroi Koibito Park"
      title="Shiroi Koibito Park Tickets 2026: Price, Hours & Factory"
      description="Shiroi Koibito Park in Sapporo: the paid area is ¥1,200 for adults and ¥600 for children, 10:00–17:30 (last entry 16:30). Factory, workshops and parking."
      h1={<>Shiroi Koibito Park Tickets 2026: <br />Price, Hours &amp; Factory</>}
      subtitle="The chocolate factory park of ISHIYA in Sapporo: what the paid area costs, opening hours, the cookie workshops and parking."
      badges={[`Checked ${CHECKED}`, "¥1,200 paid area", "Sapporo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The paid area of Shiroi Koibito Park is <strong>¥1,200 for adults</strong> (16 and over) and ¥600 for
            children aged 4 to junior high school; under-3s are free. It includes the Shiroikoibito Factory, where you
            watch the biscuits being made, and the Chocotopia House.
          </p>
          <p className={styles.bodyText}>
            The paid area opens 10:00–17:30, with last admission at 16:30. Cookie workshops cost ¥1,500–2,000 on top.
            The park is in Miyanosawa, Nishi-ku, Sapporo. Klook sells paid-area tickets. Shiroi Koibito Park, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: shiroiKoibitoParkTicket.url, label: "Check Shiroi Koibito Park tickets on Klook →" }}
      stats={[
        { label: "Adult (16+)", value: "¥1,200" },
        { label: "Child (4–15)", value: "¥600" },
        { label: "Hours", value: "10:00–17:30" },
        { label: "Last entry", value: "16:30" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the shops and the clock tower are free; pay for the paid area if you want the factory
          line and the exhibits, and book a workshop slot online in advance.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The paid-area ticket covers the factory, BIGBOX, Chocotopia House and Gulliver Town. Workshops at Dream
              Kitchen are extra: ¥1,500 for the Shiroi Koibito making or drawing course, ¥1,800 for the chocolate pie
              course and ¥2,000 for cookie decoration. Parking is ¥300 an hour (three hours for ¥300 with a paid ticket).
            </p>
          ),
          table: {
            head: ["Ticket", "General", "Groups (20+)"],
            rows: [
              ["Adult (16+)", "¥1,200", "¥900"],
              ["Child (4 to junior high)", "¥600", "¥500"],
              ["Under 3", "Free", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells paid-area admission at its own price; workshops are booked separately.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and where is it?",
          body: (
            <p className={styles.bodyText}>
              The paid area, including the factory, opens 10:00–17:30, with last admission at 16:30; New Year hours may
              change. The mechanical clock tower plays on the hour from 10:00 to 17:00. The park is at Miyanosawa 2-2-11-36,
              Nishi-ku, Sapporo. There is no free shuttle bus, so come by subway, bus or taxi; the car park charges ¥300
              an hour.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: shiroiKoibitoParkTicket.url, label: "Book Shiroi Koibito Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Sapporo and Otaru",
        intro: "Otaru is west of Sapporo on the JR line, and day tours from Sapporo go to Jozankei.",
        tours: [otaruAquariumTicket, otaruSnowParkDayTour, sapporoJozankeiBuddhaDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the trip, see the <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3-day itinerary</Link>, the
          <Link href="/guides/attractions/otaru-day-trip-from-sapporo" style={linkStyle}>Otaru day trip from Sapporo</Link> and the
          <Link href="/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>Sapporo Snow Festival tours</Link>. For another Hokkaido ticket, see
          <Link href="/guides/attractions/noboribetsu-bear-park-tickets" style={linkStyle}>Noboribetsu Bear Park</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Shiroi Koibito Park?",
          a: `The paid area is ¥1,200 for adults (16+) and ¥600 for children aged 4 to junior high school; under-3s are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "10:00–17:30, with last admission to the paid area at 16:30.",
        },
        {
          q: "Can I see the factory?",
          a: "Yes. The Shiroikoibito Factory is part of the paid area, where you can watch Shiroi Koibito and Saqu being made.",
        },
        {
          q: "How much are the workshops?",
          a: "¥1,500 to ¥2,000 per course at Dream Kitchen, on top of the paid-area ticket. Reservations are online only.",
        },
        {
          q: "Is there a free shuttle bus?",
          a: "No. The park says there is no free shuttle bus to or from Shiroi Koibito Park.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sapporo-3-day-itinerary", title: "Sapporo 3-Day Itinerary" },
        { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo" },
        { href: "/guides/attractions/otaru-aquarium-tickets", title: "Otaru Aquarium Tickets" },
        { href: "/guides/attractions/noboribetsu-bear-park-tickets", title: "Noboribetsu Bear Park Tickets" },
      ]}
      banner={{
        title: "Inside the Shiroi Koibito factory",
        desc: "Paid-area admission to Shiroi Koibito Park.",
        label: "View Shiroi Koibito Park tickets →",
      }}
    />
  );
}
