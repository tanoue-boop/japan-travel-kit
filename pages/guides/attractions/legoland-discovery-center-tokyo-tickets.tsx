import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { legolandDiscoveryCenterTokyoTicket, tokyoJoypolisPassport, asakusaOdaibaMizubeCruise } from "../../../lib/klook-links";
import { smallWorldsTokyoTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Every figure is from LEGOLAND
// Discovery Center Tokyo's own English pages, read by node fetch on 28 Nov 2026:
// /tokyo/en/tickets-passes/ (Online Saver from 2,350 up to 3,300 yen, prices vary by date
// and time, up to 30% off when booked in advance; book at least 24 hours ahead; under 3
// free; adults must come with a child 15 or under; weekend and holiday play may be limited
// to 3 hours; Unlimited Play Annual Pass 7,000 yen; annual-pass friend ticket 1,900; 4D
// Cinema closed for maintenance 30 Nov - 4 Dec 2026), /plan/before-you-visit/opening-times/
// (28 and 29 Nov 2026 10:00-19:00), /plan/information/faqs/ (typical visit 2-3 hours, no
// outside food) and the top page (Odaiba-kaihinkoen Station). No Klook price is printed.
const ROUTE = "/guides/attractions/legoland-discovery-center-tokyo-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.legolanddiscoverycenter.com/tokyo/en/tickets-passes/";
const HOURS = "https://www.legolanddiscoverycenter.com/tokyo/en/plan/before-you-visit/opening-times/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function LegolandDiscoveryCenterTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="LEGOLAND Discovery Center Tokyo Tickets"
      title="LEGOLAND Discovery Center Tokyo Tickets 2026: Price & Hours"
      description="LEGOLAND Discovery Center Tokyo in Odaiba is ¥2,350–¥3,300 online. Adults need a child with them; hours 10:00–19:00 and the 4D Cinema closure."
      h1={<>LEGOLAND Discovery Center Tokyo: <br />Tickets, Price &amp; Hours</>}
      subtitle="The indoor LEGO centre in Odaiba: what a ticket costs, the rule for adults, time slots and opening hours."
      badges={[`Checked ${CHECKED}`, "¥2,350–¥3,300", "Odaiba"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            An online ticket for LEGOLAND Discovery Center Tokyo is <strong>¥2,350 to ¥3,300</strong>, depending
            on the date and time slot; booking ahead saves up to 30%. Under-3s are free.{" "}
            <strong>Adults (16+) must come with at least one child</strong> aged 15 or under, except on Adult
            Night events.
          </p>
          <p className={styles.bodyText}>
            It was open <strong>10:00–19:00</strong> on 28 and 29 November 2026. The time on the ticket is your entry
            slot; once inside you can stay, though play may be limited to 3 hours on weekends and holidays. The 4D
            Cinema is closed 30 November – 4 December 2026. Klook sells the ticket. LEGOLAND Discovery Center
            Tokyo, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: legolandDiscoveryCenterTokyoTicket.url, label: "Check LEGOLAND Discovery Center Tokyo on Klook →" }}
      stats={[
        { label: "Online", value: "¥2,350–¥3,300" },
        { label: "Under 3", value: "Free" },
        { label: "Hours", value: "10:00–19:00" },
        { label: "Typical visit", value: "2–3 hours" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> it is an indoor playground for families — adults alone cannot enter. Book
          online at least a day ahead, when the price is lowest, and pick your entry slot.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is LEGOLAND Discovery Center Tokyo?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Book online at least 24 hours ahead for the best price. Each person gets one QR code for entry.
            </p>
          ),
          table: {
            head: ["Ticket", "Price", "Notes"],
            rows: [
              ["Online Saver", "¥2,350–¥3,300", "Date and time slot; price varies"],
              ["Unlimited Play Annual Pass", "¥7,000", "12 months, pre-booking required"],
              ["Annual pass holder's friend", "¥1,900", "Conditions apply"],
            ],
            note: (
              <>
                LEGOLAND Discovery Center Tokyo prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price; the official site has a time-slot booking for tickets bought from other sellers.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and where is it?",
          body: (
            <p className={styles.bodyText}>
              Hours are posted day by day (10:00–19:00 on the dates we checked). The centre is close to
              Odaiba-kaihinkoen Station. Outside food is not allowed except for babies or children with
              food allergies.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Opening times</a>.
            </p>
          ),
          ctas: [{ href: legolandDiscoveryCenterTokyoTicket.url, label: "Book LEGOLAND Discovery Center on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Odaiba and the bay",
        intro: "Joypolis is another indoor ticket in Odaiba, and the water bus links Odaiba with Asakusa.",
        tours: [tokyoJoypolisPassport, asakusaOdaibaMizubeCruise, smallWorldsTokyoTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the day, see{" "}
          <Link href="/guides/attractions/tokyo-joypolis-tickets" style={linkStyle}>Tokyo Joypolis tickets</Link> and the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>.{" "}
          <Link href="/guides/attractions/small-worlds-tokyo-tickets" style={linkStyle}>SMALL WORLDS Tokyo</Link> is
          another miniature world, and the{" "}
          <Link href="/guides/attractions/tokyo-bay-cruise" style={linkStyle}>Tokyo Bay cruise</Link> guide covers
          boats to Odaiba.
          {" "}In Osaka, <Link href="/guides/attractions/legoland-discovery-center-osaka-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>LEGOLAND Discovery Center Osaka</Link> at Tempozan is ¥2,900–3,300 online for ages 3 and over.
        </p>
      }
      faq={[
        {
          q: "How much is LEGOLAND Discovery Center Tokyo?",
          a: `¥2,350 to ¥3,300 online, depending on the date and time; under-3s are free. Checked ${CHECKED}.`,
        },
        {
          q: "Can adults go without children?",
          a: "No. Adults (16+) must be with at least one child aged 15 or under, except at Adult Night events.",
        },
        {
          q: "What are the opening hours?",
          a: "They are posted day by day; on 28 and 29 November 2026 it was open 10:00–19:00.",
        },
        {
          q: "How long does a visit take?",
          a: "Typically 2–3 hours. On weekends and holidays play may be limited to 3 hours.",
        },
        {
          q: "Can I buy LEGOLAND Discovery Center Tokyo tickets on Klook?",
          a: "Yes. Klook sells a LEGOLAND Discovery Center Tokyo ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-joypolis-tickets", title: "Tokyo Joypolis Tickets" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/small-worlds-tokyo-tickets", title: "SMALL WORLDS Tokyo Tickets" },
        { href: "/guides/attractions/tokyo-bay-cruise", title: "Tokyo Bay Cruise" },
      ]}
      banner={{
        title: "LEGO play in Odaiba",
        desc: "Entry to LEGOLAND Discovery Center Tokyo.",
        label: "View LEGOLAND Discovery Center tickets →",
      }}
    />
  );
}
