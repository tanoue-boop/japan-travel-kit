import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { yokohamaChinatownGourmetTicket, cupNoodlesMuseumGuidedTour } from "../../../lib/klook-links";
import { yokohamaAnpanmanMuseumTicket, hakkeijimaSeaParadiseTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from the museum's own pages, read by node fetch on 28 Nov 2026:
// yokohama-anpanman.jp/guide/ (2nd/3rd floor museum: everyone aged 1 and over 2,200-2,800 yen, tax included; dated
// web tickets required; ground floor shops and restaurants free; calendar shows last entry 16:00) and /qa/ (tickets
// are web-only, sold from 28 days before at 10:00 until entry time; up to 10 per order; on-site sale only for
// disability discounts; cancellation free until 8:59 on the day; entry not before the time on the ticket, not a
// time-limited session; same-day re-entry; no age limit; children up to elementary school with a guardian). Top
// page: renewal of three areas opens 16 Apr 2027. No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/yokohama-anpanman-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.yokohama-anpanman.jp/guide/";
const HOURS = "https://www.yokohama-anpanman.jp/guide/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function YokohamaAnpanmanMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Yokohama Anpanman Museum tickets"
      title="Yokohama Anpanman Museum Tickets 2026: Price & Booking"
      description="Yokohama Anpanman Children's Museum 2026: dated web tickets only, ¥2,200–2,800 for everyone aged 1+, on sale 28 days before. Ground floor shops are free."
      h1={<>Yokohama Anpanman Museum Tickets 2026: <br />Price &amp; Booking</>}
      subtitle="What a ticket for the Anpanman museum in Minatomirai costs, when it goes on sale and what you can see without one."
      badges={[`Checked ${CHECKED}`, "¥2,200–2,800", "Ages 1+"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Tickets for the Yokohama Anpanman Children&apos;s Museum are <strong>¥2,200 to ¥2,800 for everyone aged 1 and
            over</strong>, adults included; the price depends on the date. The 2nd and 3rd floor museum needs a
            <strong> dated web ticket</strong>, sold from 28 days before at 10 a.m.; there is no ticket window for general
            sale.
          </p>
          <p className={styles.bodyText}>
            The ground-floor shops and restaurants are free to enter. Last entry to the museum is 4 p.m. on the official
            calendar. Klook sells a dated ticket valid only at the Yokohama museum. Yokohama Anpanman Children&apos;s
            Museum, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: yokohamaAnpanmanMuseumTicket.url, label: "Check the Yokohama Anpanman ticket on Klook →" }}
      stats={[
        { label: "Ages 1 and over", value: "¥2,200–2,800" },
        { label: "Under 1", value: "Free" },
        { label: "On sale", value: "28 days before" },
        { label: "Last entry", value: "16:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> book the date as soon as it opens 28 days ahead, because the museum sells no general
          tickets on site; under-1s are free and adults pay the same as children.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One price for adults and children aged 1 and over, set by the date (tax included). You can enter from the time
              on the ticket and stay until closing; same-day re-entry is allowed.
            </p>
          ),
          table: {
            head: ["Who", "Price", "Where to buy"],
            rows: [
              ["Aged 1 and over (adults too)", "¥2,200–2,800 by date", "Dated web ticket"],
              ["Under 1", "Free", "—"],
              ["Ground floor shops and food", "Free entry", "No ticket needed"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Cancellation is free until 8:59 a.m. on the day for official tickets. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open?",
          body: (
            <p className={styles.bodyText}>
              The official calendar shows last entry to the 2nd and 3rd floor museum at 4 p.m.; check your date there for opening
              time and closed days. Tickets can be bought until your entry time if any are left. A large renewal of three
              areas opens on 16 April 2027.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: yokohamaAnpanmanMuseumTicket.url, label: "Book the Anpanman Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Yokohama",
        intro: "The museum is in Minatomirai, so a family day fits with these.",
        tours: [hakkeijimaSeaParadiseTicket, yokohamaChinatownGourmetTicket, cupNoodlesMuseumGuidedTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the day, see the <Link href="/guides/attractions/yokohama-day-trip" style={linkStyle}>Yokohama day trip from Tokyo</Link> and
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo with kids</Link>. For another family day, see
          <Link href="/guides/attractions/hakkeijima-sea-paradise-tickets" style={linkStyle}>Hakkeijima Sea Paradise</Link> and <Link href="/guides/attractions/sanrio-puroland-tickets" style={linkStyle}>Sanrio Puroland</Link>.
          {" "}For a ramen lunch, the <Link href="/guides/attractions/shin-yokohama-ramen-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Shin-Yokohama Ramen Museum</Link> is ¥450 for adults and ¥100 for children, free under school age.
        </p>
      }
      faq={[
        {
          q: "How much is the Yokohama Anpanman Museum?",
          a: `Tickets are ¥2,200 to ¥2,800 depending on the date, for everyone aged 1 and over. Under-1s are free. Checked ${CHECKED}.`,
        },
        {
          q: "Do adults need a ticket?",
          a: "Yes. Adults and children aged 1 and over pay the same price for the 2nd and 3rd floor museum.",
        },
        {
          q: "Can I buy tickets at the door?",
          a: "No. The museum sells dated web tickets only (from 28 days before); the ticket window is for disability discounts and similar cases.",
        },
        {
          q: "Is the ground floor free?",
          a: "Yes. The ground-floor shops and restaurants can be used without a ticket.",
        },
        {
          q: "Can I leave and come back?",
          a: "Yes, on the same day. Show the ticket you used at the 2nd floor entrance.",
        },
      ]}
      related={[
        { href: "/guides/attractions/yokohama-day-trip", title: "Yokohama Day Trip from Tokyo" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/hakkeijima-sea-paradise-tickets", title: "Hakkeijima Sea Paradise" },
        { href: "/guides/attractions/sanrio-puroland-tickets", title: "Sanrio Puroland Tickets" },
      ]}
      banner={{
        title: "Anpanman day in Yokohama",
        desc: "A dated ticket for the Minatomirai museum.",
        label: "View the Anpanman ticket →",
      }}
    />
  );
}
