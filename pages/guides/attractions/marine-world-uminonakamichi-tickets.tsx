import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { teamlabForestFukuokaTicket, dazaifuYanagawaDayTour, fukuokaTouristCityPass } from "../../../lib/klook-links";
import { marineWorldUminonakamichiTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Every figure is from Marine World
// Uminonakamichi's own pages, read by node fetch on 28 Nov 2026: marine-world.jp/general-
// guide/regular-fees/ (adult 2,500 yen, senior 65+ 2,200, high school / college 2,500,
// elementary and junior high 1,200, age 3 to preschool 700; groups 2,200 / 2,200 / 2,200 /
// 1,000 / 600; parking 600 per car), /general-guide/hours/ (normal 9:30-17:30, Golden Week
// and summer to 21:00, December-February 10:00-17:00; entry until one hour before closing;
// closed for 4 days from the third Monday of January, 18-21 January 2027; sea lion and
// dolphin show suspended 12 January - 9 April 2027 for pool repairs) and /access/ (JR
// Kashii Line to Uminonakamichi Station; from Hakata change at Kashii, 11 + 20 min).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/marine-world-uminonakamichi-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://marine-world.jp/general-guide/regular-fees/";
const HOURS = "https://marine-world.jp/general-guide/hours/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MarineWorldUminonakamichiTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Marine World Uminonakamichi Tickets"
      title="Marine World Uminonakamichi Tickets 2026: Price & Hours"
      description="Marine World Uminonakamichi in Fukuoka is ¥2,500 for adults and ¥1,200 for pupils, open 10:00–17:00 in winter. The 2027 show pause and JR access."
      h1={<>Marine World Uminonakamichi Tickets 2026: <br />Price, Hours &amp; Access</>}
      subtitle="Fukuoka's aquarium at Uminonakamichi: prices by age, winter hours, the January closure and the show-pool repairs."
      badges={[`Checked ${CHECKED}`, "¥2,500 adult", "Fukuoka"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Marine World Uminonakamichi ticket is <strong>¥2,500 for adults</strong> and for high school and
            college students, ¥2,200 for over-65s, ¥1,200 for elementary and junior high pupils and ¥700 for
            children from age 3.
          </p>
          <p className={styles.bodyText}>
            From December to February it is open <strong>10:00–17:00</strong> (otherwise 9:30–17:30), with entry
            until one hour before closing. It closes 18–21 January 2027, and the sea lion and dolphin show is
            paused from 12 January to 9 April 2027 for pool repairs. Klook sells the ticket. Marine World,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: marineWorldUminonakamichiTicket.url, label: "Check Marine World tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,500" },
        { label: "Elementary / junior high", value: "¥1,200" },
        { label: "Winter hours", value: "10:00–17:00" },
        { label: "Show pause", value: "12 Jan – 9 Apr 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> if the dolphin show matters, go before 12 January 2027 or after 9 April. In
          winter, be inside by 16:00.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Marine World Uminonakamichi?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The senior rate applies from age 65. Parking is ¥600 per car.
            </p>
          ),
          table: {
            head: ["Ticket", "Individual", "Group"],
            rows: [
              ["Adult", "¥2,500", "¥2,200"],
              ["Senior (65+)", "¥2,200", "¥2,200"],
              ["High school / college", "¥2,500", "¥2,200"],
              ["Elementary and junior high", "¥1,200", "¥1,000"],
              ["Age 3 to preschool", "¥700", "¥600"],
            ],
            note: (
              <>
                Marine World prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Normally 9:30–17:30, later in Golden Week and summer, and 10:00–17:00 from December to February. From
              Hakata, take the JR Kagoshima Line to Kashii (11 minutes) and change to the JR Kashii Line for
              Uminonakamichi (20 minutes).{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Hours and closed days</a>.
            </p>
          ),
          ctas: [{ href: marineWorldUminonakamichiTicket.url, label: "Book Marine World on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Fukuoka",
        intro: "Back in the city, these Klook products fill the rest of a Fukuoka stay.",
        tours: [teamlabForestFukuokaTicket, dazaifuYanagawaDayTour, fukuokaTouristCityPass],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2-day itinerary</Link>,{" "}
          <Link href="/guides/attractions/teamlab-fukuoka-tickets" style={linkStyle}>teamLab Forest Fukuoka tickets</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5-day itinerary</Link>. On a
          rail pass, the{" "}
          <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass</Link> guide explains
          what it covers.
          {" "}For more of the city on the same day, the <Link href="/guides/transport/fukuoka-tourist-city-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Fukuoka Tourist City Pass</Link> is ¥2,500 for one day of buses, trains, subway and ferries.
        </p>
      }
      faq={[
        {
          q: "How much is Marine World Uminonakamichi?",
          a: `¥2,500 for adults and high school or college students, ¥2,200 for over-65s, ¥1,200 for elementary and junior high pupils and ¥700 from age 3. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "10:00–17:00 from December to February and 9:30–17:30 at other times, later in Golden Week and summer. Entry ends one hour before closing.",
        },
        {
          q: "Is the dolphin show running?",
          a: "Not from 12 January to 9 April 2027: the show pool is being repaired and the seating is closed.",
        },
        {
          q: "When is Marine World closed?",
          a: "For four days from the third Monday of January — 18 to 21 January in 2027.",
        },
        {
          q: "Can I buy Marine World tickets on Klook?",
          a: "Yes. Klook sells a Marine World Uminonakamichi admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2-Day Itinerary" },
        { href: "/guides/attractions/teamlab-fukuoka-tickets", title: "teamLab Forest Fukuoka Tickets" },
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5-Day Itinerary" },
        { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass" },
      ]}
      banner={{
        title: "Fukuoka's aquarium by the sea",
        desc: "Admission to Marine World Uminonakamichi.",
        label: "View Marine World tickets →",
      }}
    />
  );
}
