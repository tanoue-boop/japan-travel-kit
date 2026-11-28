import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { izuTeddyBearMuseumTicket, izuShabotenZooTicket, atagawaAlligatorGardenTicket, mtFujiShizuokaAreaPassMini } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the museum's own page, read by node fetch on 28 Nov 2026:
// teddynet.co.jp/izu/info/ (admission adult 1,800, junior and senior high 1,200, elementary 1,000, under elementary and
// 75+ free, groups of 10+ 100 off; 9:30-17:00, last entry 16:30; closed on the second Tuesday of February, March, June and
// December (open if a holiday; in June the second Tuesday and Wednesday); open over New Year and Golden Week; shop and tea
// room without admission; Odoriko express from Tokyo to Izu-Kogen about 2 h 10 min; 9 minutes on foot from the
// Sakuranamiki exit). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/izu-teddy-bear-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.teddynet.co.jp/izu/info/";
const HOURS = "https://www.teddynet.co.jp/izu/info/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function IzuTeddyBearMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Izu Teddy Bear Museum tickets"
      title="Izu Teddy Bear Museum Tickets 2026: Price & Hours"
      description="Izu Teddy Bear Museum 2026: ¥1,800 for adults, ¥1,200 for junior and senior high, ¥1,000 for elementary. Open 9:30–17:00, 9 min from Izu-Kogen Station."
      h1={<>Izu Teddy Bear Museum Tickets 2026: <br />Price &amp; Hours</>}
      subtitle="What entry to the teddy bear museum in Izu Kogen costs, the few days it closes, and how to reach it by train."
      badges={[`Checked ${CHECKED}`, "Adults ¥1,800", "Open 9:30–17:00"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to the Izu Teddy Bear Museum is ¥1,800 for adults</strong>, ¥1,200 for junior and senior high
            school students and ¥1,000 for elementary school children. Younger children and visitors aged 75 and over enter
            free.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>9:30 a.m. to 5 p.m.</strong> (last entry 4:30 p.m.) and closes only on the second Tuesday of
            February, March, June and December, which is 8 December in 2026. It is about 9 minutes on foot from Izu-Kogen
            Station. Klook sells an admission ticket. Izu Teddy Bear Museum, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: izuTeddyBearMuseumTicket.url, label: "Check the Izu Teddy Bear Museum ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,800" },
        { label: "Junior / senior high", value: "¥1,200" },
        { label: "Elementary", value: "¥1,000" },
        { label: "Hours", value: "9:30–17:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> an easy add-on to an Izu Kogen day by train; avoid 8 December, and the shop and tea
          room are open to everyone.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Groups of 10 or more get ¥100 off each ticket, not combined with other discounts. The shop, tea room and cookie
              shop can be used without buying admission.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult", "¥1,800"],
              ["Junior and senior high school", "¥1,200"],
              ["Elementary school", "¥1,000"],
              ["Under elementary school age", "Free"],
              ["Aged 75 and over", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Tax included. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the museum open, and how do I get there?",
          body: (
            <p className={styles.bodyText}>
              From 9:30 a.m. to 5 p.m., with last entry at 4:30 p.m. It closes on the second Tuesday of February, March, June and
              December (opening if that day is a holiday) and is open over New Year. From Tokyo the Odoriko express reaches
              Izu-Kogen Station in about 2 hours 10 minutes; the museum is about 9 minutes on foot from the Sakuranamiki exit.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: izuTeddyBearMuseumTicket.url, label: "Book the Izu Teddy Bear Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of the Izu coast",
        intro: "Izu Kogen is on the Izukyu line, so the museum pairs with these.",
        tours: [izuShabotenZooTicket, atagawaAlligatorGardenTicket, mtFujiShizuokaAreaPassMini],
      }}
      links={
        <p className={styles.bodyText}>
          Nearby is <Link href="/guides/attractions/izu-shaboten-zoo-tickets" style={linkStyle}>Izu Shaboten Zoo</Link>, and further down the line the
          <Link href="/guides/attractions/atagawa-tropical-alligator-garden-tickets" style={linkStyle}>Atagawa Tropical and Alligator Garden</Link>. For trains, see the
          <Link href="/guides/transport/mt-fuji-shizuoka-area-pass" style={linkStyle}>Mt Fuji Shizuoka Area Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Izu Teddy Bear Museum?",
          a: `¥1,800 for adults, ¥1,200 for junior and senior high school students and ¥1,000 for elementary school children; younger children and over-75s are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "9:30 to 17:00, with last entry at 16:30.",
        },
        {
          q: "When is it closed?",
          a: "On the second Tuesday of February, March, June and December (8 December in 2026), unless that day is a holiday. In June it also closes on the following Wednesday.",
        },
        {
          q: "How do I get there from Tokyo?",
          a: "Take the Odoriko express to Izu-Kogen Station, about 2 hours 10 minutes, then walk about 9 minutes from the Sakuranamiki exit.",
        },
        {
          q: "Can I visit the shop without a ticket?",
          a: "Yes. The shop, tea room and cookie shop are open without admission.",
        },
      ]}
      related={[
        { href: "/guides/attractions/izu-shaboten-zoo-tickets", title: "Izu Shaboten Zoo Tickets" },
        { href: "/guides/attractions/atagawa-tropical-alligator-garden-tickets", title: "Atagawa Alligator Garden Tickets" },
        { href: "/guides/transport/mt-fuji-shizuoka-area-pass", title: "Mt Fuji Shizuoka Area Pass" },
        { href: "/guides/attractions/hakone-2-day-itinerary", title: "Hakone 2-Day Itinerary" },
      ]}
      banner={{
        title: "Teddy bears in Izu Kogen",
        desc: "Admission to the Izu Teddy Bear Museum.",
        label: "View the Teddy Bear Museum ticket →",
      }}
    />
  );
}
