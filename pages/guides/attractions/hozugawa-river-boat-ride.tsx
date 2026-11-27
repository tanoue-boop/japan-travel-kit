import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hozugawaRiverBoatTicket, saganoRomanticTrainTicket, arashiyamaRickshawTour } from "../../../lib/klook-links";
import { toeiKyotoStudioParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from the Hozugawa
// Yusen boat cooperative's own pages, read by node fetch on 28 Nov 2026:
// hozugawakudari.jp/tickets (regular shared boat adult 6,000 / child 4,500 yen, child =
// preschool to elementary; under 80 cm cannot board; about 2 hours; runs in rain with
// a canopy, stops in storms and high water; closed 29 Dec-4 Jan; winter boats from the
// second Monday of December to 9 March, open-sided this winter) and
// hozugawakudari.jp/service/timetable (10 Mar-13 Dec 2026 9:00-15:00, weekday departures
// on the hour 9:00-15:00, weekends and holidays leave when full; 5 Jan-9 Mar 2027 at
// 10:00, 11:30, 13:00, 14:30; inspection days 1 Feb, 10 Feb, 1 Sep 2027).
// No Klook price is printed (Klook answers automated reads with 403).
const ROUTE = "/guides/attractions/hozugawa-river-boat-ride";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.hozugawakudari.jp/tickets";
const TIMETABLE = "https://www.hozugawakudari.jp/service/timetable";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HozugawaRiverBoatRidePage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Hozugawa River Boat Ride"
      title="Hozugawa River Boat Ride 2026: Tickets, Price & Times"
      description="The Hozugawa river boat from Kameoka to Arashiyama is ¥6,000 for adults and takes about 2 hours. Departure times, winter boats, closed days and booking."
      h1={<>Hozugawa River Boat Ride 2026: <br />Tickets, Price &amp; Departure Times</>}
      subtitle="Hozugawa Kudari, the boat down the gorge from Kameoka to Arashiyama: what it costs, when the boats leave and how to book."
      badges={[`Checked ${CHECKED}`, "¥6,000 adult", "Kyoto"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Hozugawa river boat ride (Hozugawa Kudari) costs <strong>¥6,000 for adults</strong> and ¥4,500 for
            children from preschool age to elementary school. The trip down the gorge from Kameoka to Arashiyama
            takes <strong>about 2 hours</strong>, depending on the water level. Passengers under 80 cm tall cannot
            board.
          </p>
          <p className={styles.bodyText}>
            Until 13 December 2026, boats run <strong>9:00–15:00</strong>: on weekdays they leave on the hour, and
            on weekends and holidays they leave as soon as a boat is full. From 5 January to 9 March 2027 the
            timetable has four departures, at 10:00, 11:30, 13:00 and 14:30. There are no boats from 29 December to
            4 January. Klook sells a dated e-ticket. Hozugawa Yusen,{" "}
            <a href={TIMETABLE} target="_blank" rel="noopener" style={linkStyle}>timetable</a> checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hozugawaRiverBoatTicket.url, label: "Check Hozugawa boat tickets on Klook →" }}
      stats={[
        { label: "Adult / child", value: "¥6,000 / ¥4,500" },
        { label: "Time on the river", value: "About 2 hours" },
        { label: "Until 13 Dec 2026", value: "9:00–15:00" },
        { label: "5 Jan–9 Mar 2027", value: "10:00 · 11:30 · 13:00 · 14:30" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> take the boat downstream into Arashiyama and spend the rest of the day there.
          In winter there are only four boats a day, so book a time rather than turning up at the Kameoka pier.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Hozugawa river boat ride?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The same fare applies all year, on the regular shared boats (up to 24 people, depending on the water
              level). Holders of a Japanese disability certificate get 10% off at the window; online booking is at
              the standard fare only.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult", "¥6,000"],
              ["Child (preschool to elementary school)", "¥4,500"],
              ["Under 80 cm tall", "Cannot board"],
              ["Private boat (up to 17 people)", "¥144,000 (¥162,000 in peak periods)"],
            ],
            note: (
              <>
                Hozugawa Yusen fares, tax included, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Times",
          title: "What time do the Hozugawa boats leave?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The boat runs in rain with a canopy over it, but stops in storms and when the river is high. This
              winter the boats run open-sided, so dress warmly.
            </p>
          ),
          table: {
            head: ["Period", "Departures"],
            rows: [
              ["10 Mar – 13 Dec 2026, weekdays", "Every hour, 9:00–15:00"],
              ["10 Mar – 13 Dec 2026, weekends and holidays", "As soon as a boat fills, 9:00–15:00"],
              ["5 Jan – 9 Mar 2027", "10:00, 11:30, 13:00, 14:30"],
              ["29 Dec – 4 Jan", "No boats"],
              ["Safety inspection days 2027", "1 Feb, 10 Feb, 1 Sep"],
            ],
            note: (
              <>
                Hozugawa Yusen timetable, checked {CHECKED}. The fare page says winter boats start on the second
                Monday of December; for the last weeks of December, check the{" "}
                <a href={TIMETABLE} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>timetable</a>.
              </>
            ),
          },
          ctas: [{ href: hozugawaRiverBoatTicket.url, label: "Book the Hozugawa boat on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Arashiyama",
        intro: "The boat ends in Arashiyama. Most people ride the Sagano Romantic Train up to Kameoka first and float back down.",
        tours: [saganoRomanticTrainTicket, arashiyamaRickshawTour, toeiKyotoStudioParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          The usual plan is train up, boat down: see the{" "}
          <Link href="/guides/attractions/sagano-romantic-train-tickets" style={linkStyle}>Sagano Romantic Train tickets guide</Link>{" "}
          for the train, and the{" "}
          <Link href="/guides/attractions/arashiyama-bamboo-forest-tour" style={linkStyle}>Arashiyama bamboo forest guide</Link>{" "}
          for the afternoon. For the rest of the city, see{" "}
          <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>things to do in Kyoto</Link> and the{" "}
          <Link href="/guides/attractions/kyoto-3-day-itinerary" style={linkStyle}>Kyoto 3-day itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Hozugawa river boat ride?",
          a: `¥6,000 for adults and ¥4,500 for children from preschool age to elementary school. Hozugawa Yusen, checked ${CHECKED}.`,
        },
        {
          q: "How long is the Hozugawa boat ride?",
          a: "About 2 hours from Kameoka to Arashiyama, a little shorter or longer depending on the water level.",
        },
        {
          q: "Does the Hozugawa boat run in winter?",
          a: "Yes. From 5 January to 9 March 2027 there are four departures a day, at 10:00, 11:30, 13:00 and 14:30. There are no boats from 29 December to 4 January.",
        },
        {
          q: "Does it run in the rain?",
          a: "Yes, with a canopy over the boat. It is cancelled in storms and when the river is high.",
        },
        {
          q: "Can young children ride?",
          a: "Children under 80 cm tall cannot board. Preschool and elementary school children pay the ¥4,500 child fare.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sagano-romantic-train-tickets", title: "Sagano Romantic Train Tickets" },
        { href: "/guides/attractions/arashiyama-bamboo-forest-tour", title: "Arashiyama Bamboo Forest" },
        { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto" },
        { href: "/guides/attractions/kyoto-3-day-itinerary", title: "Kyoto 3-Day Itinerary" },
      ]}
      banner={{
        title: "Down the gorge to Arashiyama",
        desc: "A dated e-ticket for the Hozugawa river boat from Kameoka.",
        label: "View Hozugawa boat tickets →",
      }}
    />
  );
}
