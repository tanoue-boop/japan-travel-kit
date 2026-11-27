import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { seibuKawagoePass, kusatsuDayBusTourTokyo } from "../../../lib/klook-links";
import { sunshineAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from Sunshine City's
// own aquarium pages, read by node fetch on 28 Nov 2026: sunshinecity.jp/aquarium/ticket/
// (adult = high school and up 2,600-3,200 yen depending on the date, child = elementary
// and junior high 1,300, infant age 4+ 800; date price calendar; last entry 30 minutes
// before closing; entry may be limited on weekends, holidays and B/C/D days, so a dated
// time slot is recommended; advance tickets at FamilyMart still need a web numbered
// ticket) and sunshinecity.jp/aquarium/ (closed 14 Jan 2027). The daily hours are loaded
// by script and were not readable, so no hours are printed. No Klook price is printed.
const ROUTE = "/guides/attractions/sunshine-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://sunshinecity.jp/aquarium/ticket/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SunshineAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Sunshine Aquarium Tickets"
      title="Sunshine Aquarium Tickets 2026: Ikebukuro Price & Booking"
      description="Sunshine Aquarium in Ikebukuro is ¥2,600–¥3,200 for adults depending on the date, ¥1,300 for children and ¥800 for ages 4+. Busy days and how to book."
      h1={<>Sunshine Aquarium Tickets 2026: <br />Ikebukuro Price &amp; How to Book</>}
      subtitle="The aquarium in Sunshine City, Ikebukuro: date-based prices, busy days and the timed-entry booking."
      badges={[`Checked ${CHECKED}`, "From ¥2,600", "Tokyo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Sunshine Aquarium tickets cost <strong>¥2,600–¥3,200 for adults</strong> (high school age and up),
            depending on the date, ¥1,300 for elementary and junior high school pupils, and ¥800 for children aged 4
            and up. The aquarium is in Sunshine City, Ikebukuro.
          </p>
          <p className={styles.bodyText}>
            On weekends, holidays and other busy days entry may be limited, so the aquarium recommends booking a
            date and time in advance. Last entry is <strong>30 minutes before closing</strong>; daily hours are on
            the <a href={OFFICIAL} target="_blank" rel="noopener" style={linkStyle}>official page</a>. It is closed
            on 14 January 2027. Klook sells the ticket. Sunshine Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: sunshineAquariumTicket.url, label: "Check Sunshine Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult (high school+)", value: "¥2,600–¥3,200" },
        { label: "Elementary / junior high", value: "¥1,300" },
        { label: "Child (age 4+)", value: "¥800" },
        { label: "Last entry", value: "30 min before closing" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> check the price calendar for your date before you buy, and on weekends and
          holidays book a time slot rather than queueing.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Sunshine Aquarium?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The adult price depends on the date (A to D days on the aquarium&apos;s price calendar); the child and
              infant prices do not change.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (high school age and up)", "¥2,600–¥3,200 by date"],
              ["Child (elementary and junior high school)", "¥1,300"],
              ["Infant (age 4 and up)", "¥800"],
            ],
            note: (
              <>
                Sunshine Aquarium prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>{" "}
                (with the price calendar). Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Booking",
          title: "Do you need to book Sunshine Aquarium in advance?",
          body: (
            <p className={styles.bodyText}>
              Not always, but on weekends, holidays and the busier B, C and D price days the aquarium may limit
              entry, and it recommends a dated, timed booking. Advance tickets bought at FamilyMart convenience
              stores still need a free web numbered ticket for entry.
            </p>
          ),
          ctas: [{ href: sunshineAquariumTicket.url, label: "Book Sunshine Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: from Ikebukuro",
        intro: "Ikebukuro is the starting point for Seibu trains to Kawagoe and for some bus tours out of Tokyo.",
        tours: [seibuKawagoePass, kusatsuDayBusTourTokyo],
      }}
      links={
        <p className={styles.bodyText}>
          From Ikebukuro, see the{" "}
          <Link href="/guides/attractions/kawagoe-day-trip" style={linkStyle}>Kawagoe day trip guide</Link>. With
          children, the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          has more ideas, and{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>where to stay in Tokyo</Link> covers
          Ikebukuro as a base. The other big aquarium in the city is{" "}
          <Link href="/guides/attractions/sumida-aquarium-tickets" style={linkStyle}>Sumida Aquarium at the Skytree</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Sunshine Aquarium?",
          a: `¥2,600–¥3,200 for adults depending on the date, ¥1,300 for elementary and junior high pupils and ¥800 for children aged 4 and up. Sunshine Aquarium, checked ${CHECKED}.`,
        },
        {
          q: "Why does the adult price change?",
          a: "The aquarium sets the adult price by date on a price calendar; busier days cost more. Child and infant prices stay the same.",
        },
        {
          q: "Do I need to book Sunshine Aquarium?",
          a: "On weekends, holidays and busy days entry may be limited, and the aquarium recommends booking a date and time in advance.",
        },
        {
          q: "When is the last entry?",
          a: "30 minutes before closing. Daily opening hours are on the aquarium's ticket page.",
        },
        {
          q: "Can I buy Sunshine Aquarium tickets on Klook?",
          a: "Yes. Klook sells a Sunshine Aquarium ticket; the aquarium also sells its own tickets online.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sumida-aquarium-tickets", title: "Sumida Aquarium Tickets" },
        { href: "/guides/attractions/kawagoe-day-trip", title: "Kawagoe Day Trip" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo" },
      ]}
      banner={{
        title: "An aquarium in Ikebukuro",
        desc: "Admission to Sunshine Aquarium in Sunshine City.",
        label: "View Sunshine Aquarium tickets →",
      }}
    />
  );
}
