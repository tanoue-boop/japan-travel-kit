import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { atagawaAlligatorGardenTicket, izuShabotenZooTicket, izooTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the garden's own page, read by node fetch on 28 Nov 2026:
// bananawani.jp/information/ (hours 9:00-17:00, last entry 16:30, open every day; free parking for 150 cars and 10
// buses; 1 minute on foot from Izu-Atagawa Station on the Izukyu line; admission adult 2,000, child (4 to elementary)
// 1,000, under 4 free; annual pass 4,600 / 2,300; one ticket covers the main garden (alligators and plants) and the
// annex (fruit, red pandas); no pets). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/atagawa-tropical-alligator-garden-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://bananawani.jp/information/";
const HOURS = "https://bananawani.jp/information/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function AtagawaAlligatorGardenTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Atagawa Alligator Garden tickets"
      title="Atagawa Alligator Garden Tickets 2026: Price & Hours"
      description="Atagawa Tropical and Alligator Garden 2026: ¥2,000 for adults, ¥1,000 for ages 4–12, free under 4. Open 9:00–17:00 daily, by Izu-Atagawa Station."
      h1={<>Atagawa Tropical &amp; Alligator Garden Tickets 2026: <br />Price &amp; Hours</>}
      subtitle="What the alligator and tropical plant garden in Higashi-Izu costs, when it is open and how close it is to the station."
      badges={[`Checked ${CHECKED}`, "Adults ¥2,000", "Open daily"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to the Atagawa Tropical and Alligator Garden is ¥2,000 for adults</strong> and ¥1,000 for
            children from 4 to elementary school age; under-4s are free. One ticket covers the alligator garden, the
            tropical greenhouses and the fruit annex with the red pandas.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>every day from 9 a.m. to 5 p.m.</strong> (last entry 4:30 p.m.) and is a one-minute walk
            from Izu-Atagawa Station on the Izukyu line. Parking is free. Klook sells an e-ticket. Atagawa Tropical and
            Alligator Garden, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: atagawaAlligatorGardenTicket.url, label: "Check the Atagawa garden ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,000" },
        { label: "Child (4–12)", value: "¥1,000" },
        { label: "Hours", value: "9:00–17:00" },
        { label: "From the station", value: "1 min on foot" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> an easy stop by train on the Izu coast; the station is next to the gate, so it fits
          between Ito and Shimoda without a car.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices include tax. The annual pass is ¥4,600 for adults and ¥2,300 for children. Groups of 15 or more are
              asked to phone for the group rate.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Child (4 to elementary)"],
            rows: [
              ["Admission (all areas)", "¥2,000", "¥1,000"],
              ["Annual pass", "¥4,600", "¥2,300"],
              ["With disability certificate", "¥1,000", "¥500"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Under-4s are free. Pets are not allowed. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the garden open?",
          body: (
            <p className={styles.bodyText}>
              Every day from 9 a.m. to 5 p.m.; last entry is 4:30 p.m. It is one minute on foot from Izu-Atagawa Station on the
              Izukyu line, and there is free parking for 150 cars.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: atagawaAlligatorGardenTicket.url, label: "Book the Atagawa garden on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of the Izu Peninsula",
        intro: "Atagawa is on the Izukyu line between Ito and Shimoda, so it pairs with these.",
        tours: [izuShabotenZooTicket, izooTicket],
      }}
      links={
        <p className={styles.bodyText}>
          On the same coast, see <Link href="/guides/attractions/izu-shaboten-zoo-tickets" style={linkStyle}>Izu Shaboten Zoo</Link>. For the way there, see the
          <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>Hakone 2-day itinerary</Link> and the
          <Link href="/guides/transport/mt-fuji-shizuoka-area-pass" style={linkStyle}>Mt. Fuji-Shizuoka Area Pass</Link>.
          {" "}Up the Izukyu line at Izu-Kogen, the <Link href="/guides/attractions/izu-teddy-bear-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Izu Teddy Bear Museum</Link> is ¥1,800 for adults and ¥1,000 for elementary school children.
        </p>
      }
      faq={[
        {
          q: "How much is the Atagawa Tropical and Alligator Garden?",
          a: `Admission is ¥2,000 for adults and ¥1,000 for children from 4 to elementary school age. Under-4s are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 17:00 every day, with last entry at 16:30.",
        },
        {
          q: "How do I get there?",
          a: "It is a one-minute walk from Izu-Atagawa Station on the Izukyu line.",
        },
        {
          q: "Is parking free?",
          a: "Yes. There is free parking for 150 cars and 10 buses.",
        },
        {
          q: "Does one ticket cover every area?",
          a: "Yes. The ticket covers the main garden (alligators and tropical plants) and the annex with the fruit trees and red pandas.",
        },
      ]}
      related={[
        { href: "/guides/attractions/izu-shaboten-zoo-tickets", title: "Izu Shaboten Zoo Tickets" },
        { href: "/guides/attractions/hakone-2-day-itinerary", title: "Hakone 2-Day Itinerary" },
        { href: "/guides/transport/mt-fuji-shizuoka-area-pass", title: "Mt. Fuji-Shizuoka Area Pass" },
      ]}
      banner={{
        title: "Alligators and bananas by the sea",
        desc: "An e-ticket for the Atagawa Tropical and Alligator Garden.",
        label: "View the Atagawa ticket →",
      }}
    />
  );
}
