import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tokyoJoypolisTicket, skytreeTicket } from "../../../lib/klook-links";
import { tokyoDomeCityAttractionsTicket, spaLaquaTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from Tokyo Dome City's own site, read by node fetch on 28 Nov 2026:
// tokyo-dome.co.jp/en/at-raku/schedule-price (free entry; One-day passport adult 18+ A 4,900 / B 5,300 / C 5,800
// yen; seniors 60+ and junior / senior high 4,300 / 4,700 / 5,200; elementary 3,600 / 4,000 / 4,500; age 3+
// 2,600 / 3,000 / 3,500; Night Discount Passport adult 3,900-4,800, sold from 17:00 when the park closes at 21:00
// or 22:00; Thunder Dolphin 1,800, Big-O 1,000; November hours 10:00-20:00 on most days) and /en/ticket, which
// links to this Klook activity. No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/tokyo-dome-city-attractions-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.tokyo-dome.co.jp/en/at-raku/schedule-price";
const HOURS = "https://www.tokyo-dome.co.jp/en/schedule";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TokyoDomeCityAttractionsTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Tokyo Dome City Attractions"
      title="Tokyo Dome City Attractions 2026: Passport Price & Hours"
      description="Tokyo Dome City Attractions is free to enter; a one-day ride passport is ¥4,900–5,800 for adults by date. Thunder Dolphin ¥1,800; open 10:00–20:00."
      h1={<>Tokyo Dome City Attractions 2026: <br />Passport Price &amp; Hours</>}
      subtitle="The free-entry amusement park beside Tokyo Dome: one-day and night passports, single-ride prices and opening hours."
      badges={[`Checked ${CHECKED}`, "Free entry", "Passport ¥4,900+"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Tokyo Dome City Attractions is <strong>free to enter</strong>; you pay per ride or buy a passport. The
            one-day passport is <strong>¥4,900–5,800 for adults</strong> (18 and over) depending on the date&apos;s price
            band, ¥3,600–4,500 for elementary pupils. A single ride on the Thunder Dolphin coaster is ¥1,800.
          </p>
          <p className={styles.bodyText}>
            In late November 2026 it opens <strong>10:00–20:00</strong> on most days. The park is next to Korakuen and
            Suidobashi stations. Klook sells a ride ticket, linked from the official site. Tokyo Dome City, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: tokyoDomeCityAttractionsTicket.url, label: "Check ride tickets on Klook →" }}
      stats={[
        { label: "Entry", value: "Free" },
        { label: "Passport (adult)", value: "¥4,900–5,800" },
        { label: "Thunder Dolphin", value: "¥1,800" },
        { label: "Hours (Nov)", value: "10:00–20:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> for two or three rides, pay per ride; for a day of rides, the passport pays off.
          Check the date&apos;s band (A, B or C) on the price calendar.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Each date has a price band, A to C, on the park calendar; late November is mostly B. Seniors are 60 and
              over. When the park closes at 21:00 or 22:00, a night passport is sold from 17:00.
            </p>
          ),
          table: {
            head: ["One-day passport", "A", "B", "C"],
            rows: [
              ["Adult (18+)", "¥4,900", "¥5,300", "¥5,800"],
              ["Senior / junior & senior high", "¥4,300", "¥4,700", "¥5,200"],
              ["Elementary", "¥3,600", "¥4,000", "¥4,500"],
              ["Preschool (3+)", "¥2,600", "¥3,000", "¥3,500"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Night Discount Passport, adult: ¥3,900 / ¥4,300 / ¥4,800. Single rides: Thunder Dolphin ¥1,800, Big-O ¥1,000. Klook sells a ride ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              In late November 2026 the park opens 10:00–20:00 on most days; hours change with the weather and the date, so
              check the daily calendar. Single-ride tickets are sold at machines and the Attractions Ticket Counter.
              Tokyo Dome City is reached from Korakuen Station (Tokyo Metro), Kasuga Station (Toei Subway) and JR
              Suidobashi Station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: tokyoDomeCityAttractionsTicket.url, label: "Book rides on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Tokyo Dome City and beyond",
        intro: "Spa LaQua is in the same complex, and Odaiba and Oshiage are a short train ride away.",
        tours: [spaLaquaTicket, tokyoJoypolisTicket, skytreeTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For a family day, see the <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>,
          <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>,
          <Link href="/guides/attractions/tokyo-joypolis-tickets" style={linkStyle}>Tokyo Joypolis tickets</Link> and
          <Link href="/guides/attractions/yomiuriland-tickets" style={linkStyle}>Yomiuriland tickets</Link>.
        </p>
      }
      faq={[
        {
          q: "Is Tokyo Dome City Attractions free?",
          a: `Entry is free; rides are paid one by one or with a passport. Checked ${CHECKED}.`,
        },
        {
          q: "How much is the one-day passport?",
          a: "¥4,900, ¥5,300 or ¥5,800 for adults depending on the date's price band, and ¥3,600–4,500 for elementary pupils.",
        },
        {
          q: "How much is the Thunder Dolphin?",
          a: "¥1,800 per ride.",
        },
        {
          q: "What are the opening hours?",
          a: "In late November 2026, 10:00–20:00 on most days; check the daily calendar for each date.",
        },
        {
          q: "Which station is closest?",
          a: "Korakuen (Tokyo Metro), Kasuga (Toei Subway) and JR Suidobashi are all next to Tokyo Dome City.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/spa-laqua-tokyo-tickets", title: "Spa LaQua Tokyo" },
        { href: "/guides/attractions/tokyo-joypolis-tickets", title: "Tokyo Joypolis Tickets" },
        { href: "/guides/attractions/yomiuriland-tickets", title: "Yomiuriland Tickets" },
      ]}
      banner={{
        title: "Rides beside Tokyo Dome",
        desc: "Ride tickets for Tokyo Dome City Attractions.",
        label: "View ride tickets →",
      }}
    />
  );
}
