import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { skytreeTicket, asakusaSensojiWalkingTour, asakusaGoKartTour } from "../../../lib/klook-links";
import { sumidaAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from Sumida Aquarium's
// own pages, read by node fetch on 28 Nov 2026: sumida-aquarium.com/about/price/ (adult
// 2,700 yen, high school 2,000, junior high and elementary 1,400, child age 3+ 900; annual
// passport 6,000 / 4,400 / 3,100 / 2,000; shortened hours: 30 Nov closes 17:00 (last entry
// 16:00), 6 Dec closes 18:00 (last entry 17:00)) and /about/access/ (no closed days; entry
// and ticket sales until one hour before closing; hours on the daily calendar; Tokyo
// Solamachi 5F-6F, Tokyo Skytree Town; Tokyo Skytree station on the Tobu Skytree Line,
// Oshiage station 5 min on foot). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/sumida-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.sumida-aquarium.com/about/price/";
const HOURS = "https://www.sumida-aquarium.com/about/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SumidaAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Sumida Aquarium Tickets"
      title="Sumida Aquarium Tickets 2026: Price, Hours & Booking"
      description="Sumida Aquarium at Tokyo Skytree is ¥2,700 for adults, ¥2,000 for high school and ¥1,400 for younger students. Opening hours, the annual pass and booking."
      h1={<>Sumida Aquarium Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="The aquarium on the 5th and 6th floors of Tokyo Solamachi, at the foot of the Skytree: prices by age, hours and how to combine it with the tower."
      badges={[`Checked ${CHECKED}`, "¥2,700 adult", "Tokyo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Sumida Aquarium ticket is <strong>¥2,700 for adults</strong>, ¥2,000 for high school students, ¥1,400
            for junior high and elementary school pupils and ¥900 for children aged 3 and up. The aquarium is on the
            5th and 6th floors of Tokyo Solamachi in Tokyo Skytree Town.
          </p>
          <p className={styles.bodyText}>
            It is <strong>open every day</strong>; entry and ticket sales end one hour before closing, and the
            closing time for each day is on the{" "}
            <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>official calendar</a>. On 30 November
            2026 it closes at 17:00 and on 6 December at 18:00 for private events. Klook sells the ticket. Sumida
            Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: sumidaAquariumTicket.url, label: "Check Sumida Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,700" },
        { label: "High school", value: "¥2,000" },
        { label: "Junior high / elementary", value: "¥1,400" },
        { label: "Closed days", value: "None" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> it sits in the same building as the Skytree, so pair the two on one visit.
          Arrive at least an hour before closing — that is when the last tickets are sold.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Sumida Aquarium?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Junior high and high school students show a student ID at the counter. Visitors with a Japanese
              disability certificate and one companion pay half.
            </p>
          ),
          table: {
            head: ["Ticket", "One visit", "Annual passport"],
            rows: [
              ["Adult", "¥2,700", "¥6,000"],
              ["High school", "¥2,000", "¥4,400"],
              ["Junior high and elementary school", "¥1,400", "¥3,100"],
              ["Child (age 3 and up)", "¥900", "¥2,000"],
            ],
            note: (
              <>
                Sumida Aquarium prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "Where is Sumida Aquarium?",
          body: (
            <p className={styles.bodyText}>
              Tokyo Solamachi 5F–6F, Tokyo Skytree Town (1-1-2 Oshiage, Sumida-ku). It is right by Tokyo Skytree
              station on the Tobu Skytree Line and a 5-minute walk from Oshiage station (Hanzomon, Asakusa and Keisei
              lines). The aquarium has no parking of its own.
            </p>
          ),
          ctas: [{ href: sumidaAquariumTicket.url, label: "Book Sumida Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Skytree and Asakusa",
        intro: "Asakusa is one stop from Tokyo Skytree station on the Tobu line. These fill the rest of the day.",
        tours: [skytreeTicket, asakusaSensojiWalkingTour, asakusaGoKartTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the tower upstairs, see the{" "}
          <Link href="/guides/attractions/tokyo-skytree-tickets" style={linkStyle}>Tokyo Skytree tickets guide</Link>.
          With children, the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          has more rainy-day ideas, and the{" "}
          <Link href="/guides/attractions/tokyo-3-day-itinerary" style={linkStyle}>Tokyo 3-day itinerary</Link> fits
          the Skytree into a first trip. See also{" "}
          <Link href="/guides/attractions/sunshine-aquarium-tickets" style={linkStyle}>Sunshine Aquarium in Ikebukuro</Link>.
          {" "}Compare <Link href="/guides/attractions/maxell-aqua-park-shinagawa-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Maxell Aqua Park Shinagawa</Link>, open until 20:00, and <Link href="/guides/attractions/kamogawa-sea-world-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kamogawa Sea World</Link>, a day trip to the Boso coast.
          {" "}A cheaper option: <Link href="/guides/attractions/shinagawa-aquarium-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Shinagawa Aquarium</Link>, ¥1,350 for adults, open 10:00–17:00 with a free bus from Oimachi Station.
        </p>
      }
      faq={[
        {
          q: "How much is Sumida Aquarium?",
          a: `¥2,700 for adults, ¥2,000 for high school students, ¥1,400 for junior high and elementary school pupils and ¥900 for children aged 3 and up. Sumida Aquarium, checked ${CHECKED}.`,
        },
        {
          q: "What are Sumida Aquarium's opening hours?",
          a: "It is open every day, with the closing time for each date on the official calendar. Entry ends one hour before closing.",
        },
        {
          q: "Is Sumida Aquarium in Tokyo Skytree?",
          a: "It is in Tokyo Solamachi, the shopping complex at the base of the Skytree, on the 5th and 6th floors. The Skytree observation decks need a separate ticket.",
        },
        {
          q: "Is there an annual pass?",
          a: "Yes: ¥6,000 for adults, ¥4,400 for high school, ¥3,100 for junior high and elementary, and ¥2,000 for children aged 3 and up.",
        },
        {
          q: "Can I buy Sumida Aquarium tickets on Klook?",
          a: "Yes. Klook sells a Sumida Aquarium ticket; the aquarium also sells advance tickets on its own site.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-skytree-tickets", title: "Tokyo Skytree Tickets" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/tokyo-3-day-itinerary", title: "Tokyo 3-Day Itinerary" },
        { href: "/guides/attractions/sunshine-aquarium-tickets", title: "Sunshine Aquarium Tickets" },
      ]}
      banner={{
        title: "Penguins under the Skytree",
        desc: "Admission to Sumida Aquarium in Tokyo Solamachi.",
        label: "View Sumida Aquarium tickets →",
      }}
    />
  );
}
