import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kyotoFushimiInariWalkingTour } from "../../../lib/klook-links";
import { kyotoAquariumTicket, kyotoRailwayMuseumTicket, toeiKyotoStudioParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from Kyoto Aquarium's
// own English pages, read by node fetch on 28 Nov 2026: en.kyoto-aquarium.com/about/price/
// (general admission adult 2,600 yen, high school 2,000, junior high and elementary 1,400,
// age 3+ 900; annual passport 5,800 / 4,400 / 3,100 / 2,000; high school students show ID;
// disability certificate holder and one companion half price) and /about/access/ (closed
// days: none, open all year; admission and ticket sales until one hour before closing;
// hours on the daily calendar; 35-1 Kankijicho, Shimogyo-ku, inside Umekoji Park; about
// 15 min on foot from Kyoto Station central exit, about 7 min from Umekoji-Kyotonishi on the
// JR Sagano (San'in) Line; no parking). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/kyoto-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://en.kyoto-aquarium.com/about/price/";
const HOURS = "https://en.kyoto-aquarium.com/about/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KyotoAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kyoto Aquarium Tickets"
      title="Kyoto Aquarium Tickets 2026: Price, Hours & Booking"
      description="Kyoto Aquarium is ¥2,600 for adults, ¥2,000 for high school and ¥1,400 for younger pupils, open every day near Kyoto Station. Hours, access and booking."
      h1={<>Kyoto Aquarium Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="The aquarium in Umekoji Park, 15 minutes on foot from Kyoto Station: prices by age, opening days and how to pair it with the Railway Museum next door."
      badges={[`Checked ${CHECKED}`, "¥2,600 adult", "Kyoto"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Kyoto Aquarium ticket is <strong>¥2,600 for adults</strong>, ¥2,000 for high school students, ¥1,400
            for junior high and elementary school pupils and ¥900 for children aged 3 and up. The aquarium is in
            Umekoji Park, about 15 minutes on foot from the central exit of Kyoto Station.
          </p>
          <p className={styles.bodyText}>
            It is <strong>open all year</strong> with no closed days. Entry and ticket sales end one hour before
            closing, and the closing time for each date is on the{" "}
            <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>official calendar</a>. Klook sells a
            dated ticket you show on your phone. Kyoto Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kyotoAquariumTicket.url, label: "Check Kyoto Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,600" },
        { label: "High school", value: "¥2,000" },
        { label: "Junior high / elementary", value: "¥1,400" },
        { label: "Closed days", value: "None" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the Kyoto Railway Museum is in the same park, so the two make
          an easy half day from Kyoto Station. Arrive at least an hour before closing.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Kyoto Aquarium?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              High school students show a student ID at the counter. Visitors with a disability certificate and one
              companion pay half price.
            </p>
          ),
          table: {
            head: ["Ticket", "One visit", "Annual passport"],
            rows: [
              ["Adult", "¥2,600", "¥5,800"],
              ["High school", "¥2,000", "¥4,400"],
              ["Junior high and elementary school", "¥1,400", "¥3,100"],
              ["Child (age 3 and up)", "¥900", "¥2,000"],
            ],
            note: (
              <>
                Kyoto Aquarium prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "Where is Kyoto Aquarium?",
          body: (
            <p className={styles.bodyText}>
              35-1 Kankijicho, Shimogyo-ku, inside Umekoji Park. Walk about 15 minutes from the central exit of Kyoto
              Station, or about 7 minutes from Umekoji-Kyotonishi Station, one stop from Kyoto on the JR Sagano Line.
              City buses stop at Shichijo Omiya / Kyoto Aquarium-mae. There is no parking.
            </p>
          ),
          ctas: [{ href: kyotoAquariumTicket.url, label: "Book Kyoto Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Umekoji and western Kyoto",
        intro: "The Railway Museum is in the same park, and Umekoji-Kyotonishi is on the line out to Uzumasa and Arashiyama.",
        tours: [kyotoRailwayMuseumTicket, toeiKyotoStudioParkTicket, kyotoFushimiInariWalkingTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the museum across the park, see{" "}
          <Link href="/guides/attractions/kyoto-railway-museum-tickets" style={linkStyle}>Kyoto Railway Museum tickets</Link>.
          The{" "}
          <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>things to do in Kyoto</Link> guide and
          the{" "}
          <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>Kyoto 2-day itinerary</Link> fit it
          into a short stay, and{" "}
          <Link href="/guides/attractions/where-to-stay-in-kyoto" style={linkStyle}>where to stay in Kyoto</Link>{" "}
          covers the hotels around Kyoto Station.
          {" "}Across the Seto Inland Sea, the <Link href="/guides/attractions/shikoku-aquarium-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Shikoku Aquarium</Link> in Kagawa is ¥2,600 for adults and ¥1,400 for children.
        </p>
      }
      faq={[
        {
          q: "How much is Kyoto Aquarium?",
          a: `¥2,600 for adults, ¥2,000 for high school students, ¥1,400 for junior high and elementary school pupils and ¥900 for children aged 3 and up. Kyoto Aquarium, checked ${CHECKED}.`,
        },
        {
          q: "What are Kyoto Aquarium's opening hours?",
          a: "It is open every day of the year; the closing time for each date is on the official calendar, and entry ends one hour before closing.",
        },
        {
          q: "How do I get to Kyoto Aquarium from Kyoto Station?",
          a: "Walk about 15 minutes from the central exit, or ride one stop on the JR Sagano Line to Umekoji-Kyotonishi and walk about 7 minutes.",
        },
        {
          q: "Is there an annual pass?",
          a: "Yes: ¥5,800 for adults, ¥4,400 for high school, ¥3,100 for junior high and elementary, and ¥2,000 for children aged 3 and up.",
        },
        {
          q: "Can I buy Kyoto Aquarium tickets on Klook?",
          a: "Yes. Klook sells a dated Kyoto Aquarium ticket shown on your phone; the aquarium also sells advance tickets on its own site.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kyoto-railway-museum-tickets", title: "Kyoto Railway Museum Tickets" },
        { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto" },
        { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2-Day Itinerary" },
        { href: "/guides/attractions/where-to-stay-in-kyoto", title: "Where to Stay in Kyoto" },
      ]}
      banner={{
        title: "An aquarium 15 minutes from Kyoto Station",
        desc: "Admission to Kyoto Aquarium in Umekoji Park.",
        label: "View Kyoto Aquarium tickets →",
      }}
    />
  );
}
