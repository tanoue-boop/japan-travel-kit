import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { enoshimaKamakuraFreepassKlook, kamakuraEnoshimaDayTour } from "../../../lib/klook-links";
import { enoshimaAquariumTicket, hakkeijimaSeaParadiseTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from Enoshima
// Aquarium's own English page, read by node fetch on 28 Nov 2026: enosui.com/en/ (2026
// hours March-November 9:00-17:00, December-February 10:00-17:00, subject to change in
// holiday weeks; entry and ticket sales close 1 hour before closing; general admission
// adult 2,800 yen, senior high 1,800, junior high and elementary 1,300, age 3+ 900, under 3
// free; annual passport 5,600 / 3,600 / 2,600 / 1,800; groups of 20+ 2,520 / 1,620 / 1,170
// / 810; high school students show ID; unlimited same-day re-entry; address 2-19-1 Katase
// Kaigan, Fujisawa). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/enoshima-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.enosui.com/en/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function EnoshimaAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Enoshima Aquarium Tickets"
      title="Enoshima Aquarium Tickets 2026: Price, Hours & Booking"
      description="Enoshima Aquarium is ¥2,800 for adults and ¥1,300 for younger pupils, open 10:00–17:00 from December. Re-entry rules, the annual pass and booking."
      h1={<>Enoshima Aquarium Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="Enosui, on Katase Beach facing Enoshima: prices by age, winter hours and how to fit it into a Kamakura and Enoshima day."
      badges={[`Checked ${CHECKED}`, "¥2,800 adult", "Enoshima"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            An Enoshima Aquarium ticket is <strong>¥2,800 for adults</strong>, ¥1,800 for senior high school
            students, ¥1,300 for junior high and elementary school pupils and ¥900 for children aged 3 and up;
            under-3s enter free. You can leave and come back as often as you like on the same day.
          </p>
          <p className={styles.bodyText}>
            From December to February it is open <strong>10:00–17:00</strong> (March–November 9:00–17:00), with
            entry and ticket sales ending one hour before closing; hours can change in holiday weeks such as the
            New Year. Klook sells the ticket. Enoshima Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: enoshimaAquariumTicket.url, label: "Check Enoshima Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,800" },
        { label: "Junior high / elementary", value: "¥1,300" },
        { label: "Winter hours", value: "10:00–17:00" },
        { label: "Re-entry", value: "Same day" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> keep the ticket — same-day re-entry lets you walk over to Enoshima island and
          come back. In winter, be inside by 16:00.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Enoshima Aquarium?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Senior high school students show a student ID. Groups of 20 or more pay about 10% less.
            </p>
          ),
          table: {
            head: ["Ticket", "General admission", "Annual passport"],
            rows: [
              ["Adult", "¥2,800", "¥5,600"],
              ["Senior high school", "¥1,800", "¥3,600"],
              ["Junior high and elementary school", "¥1,300", "¥2,600"],
              ["Child (age 3 and up)", "¥900", "¥1,800"],
            ],
            note: (
              <>
                Enoshima Aquarium prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "Where is Enoshima Aquarium?",
          body: (
            <p className={styles.bodyText}>
              2-19-1 Katase Kaigan, Fujisawa, on the beach opposite Enoshima island. Large luggage is not allowed
              inside (paid lockers are available), pets are not admitted except assistance dogs, and flash is not
              allowed in some exhibit areas.
            </p>
          ),
          ctas: [{ href: enoshimaAquariumTicket.url, label: "Book Enoshima Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Enoshima and Kamakura",
        intro: "The Enoden links Enoshima with Kamakura. These cover the train and the rest of the day.",
        tours: [enoshimaKamakuraFreepassKlook, kamakuraEnoshimaDayTour, hakkeijimaSeaParadiseTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the day, see the{" "}
          <Link href="/guides/attractions/kamakura-day-trip" style={linkStyle}>Kamakura day trip</Link> and the{" "}
          <Link href="/guides/attractions/enoshima-kamakura-pass" style={linkStyle}>Enoshima-Kamakura Freepass</Link>{" "}
          guide. With children, the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          has more ideas, and{" "}
          <Link href="/guides/attractions/hakkeijima-sea-paradise-tickets" style={linkStyle}>Hakkeijima Sea Paradise</Link>{" "}
          is the aquarium island in Yokohama.
        </p>
      }
      faq={[
        {
          q: "How much is Enoshima Aquarium?",
          a: `¥2,800 for adults, ¥1,800 for senior high students, ¥1,300 for junior high and elementary pupils and ¥900 for children aged 3 and up. Checked ${CHECKED}.`,
        },
        {
          q: "What are Enoshima Aquarium's opening hours?",
          a: "10:00–17:00 from December to February and 9:00–17:00 from March to November. Entry ends one hour before closing; holiday weeks can differ.",
        },
        {
          q: "Can I leave and come back?",
          a: "Yes. Re-entry is unlimited on the same day; show your ticket at the entrance again.",
        },
        {
          q: "Is there an annual pass?",
          a: "Yes: ¥5,600 for adults, ¥3,600 for senior high, ¥2,600 for junior high and elementary, and ¥1,800 for children aged 3 and up.",
        },
        {
          q: "Can I buy Enoshima Aquarium tickets on Klook?",
          a: "Yes. Klook sells an Enoshima Aquarium admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kamakura-day-trip", title: "Kamakura Day Trip" },
        { href: "/guides/attractions/enoshima-kamakura-pass", title: "Enoshima-Kamakura Freepass" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/hakkeijima-sea-paradise-tickets", title: "Hakkeijima Sea Paradise Tickets" },
      ]}
      banner={{
        title: "An aquarium facing Enoshima",
        desc: "Admission to Enoshima Aquarium in Fujisawa.",
        label: "View Enoshima Aquarium tickets →",
      }}
    />
  );
}
