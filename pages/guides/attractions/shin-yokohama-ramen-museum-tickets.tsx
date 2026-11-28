import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { cupNoodlesMuseumGuidedTour } from "../../../lib/klook-links";
import { shinYokohamaRamenMuseumTicket, yokohamaAnpanmanMuseumTicket, hakkeijimaSeaParadiseTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the museum's own pages, read by node fetch on 28 Nov 2026:
// raumen.co.jp/guidance/ (same-day admission adult 450, elementary and junior high 100, high school 100 with ID,
// under elementary school free; annual digital pass 500, analog pass 800; hours weekdays 11:00-21:00, weekends and
// holidays 10:30-21:00, ramen last order 30 minutes before closing; closed 31 Dec and 1 Jan; junior high and older
// asked to order one bowl each; re-entry with a stamp at the 1F information desk) and raumen.co.jp/businesshours/
// (27-30 Dec 2026 10:00-21:30). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/shin-yokohama-ramen-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.raumen.co.jp/guidance/";
const HOURS = "https://www.raumen.co.jp/businesshours/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShinYokohamaRamenMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Shin-Yokohama Ramen Museum tickets"
      title="Shin-Yokohama Ramen Museum Tickets 2026: Price & Hours"
      description="Shin-Yokohama Ramen Museum 2026: entry is ¥450 for adults and ¥100 for children; open 11:00–21:00 on weekdays and from 10:30 on weekends. One-bowl rule."
      h1={<>Shin-Yokohama Ramen Museum Tickets 2026: <br />Price &amp; Hours</>}
      subtitle="What entry to the ramen theme museum costs, when the shops serve, and the one rule every visitor should know."
      badges={[`Checked ${CHECKED}`, "Adults ¥450", "One bowl each"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to the Shin-Yokohama Ramen Museum is ¥450 for adults</strong> and ¥100 for elementary and junior
            high school students; high school students also pay ¥100 with ID. Children under school age enter free. The
            ramen itself is paid for at each shop.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>11 a.m. to 9 p.m. on weekdays and 10:30 a.m. to 9 p.m. on weekends and holidays</strong>;
            the shops take last orders 30 minutes before closing. Visitors of junior high age and older are asked to order
            one bowl each. Klook sells an admission voucher. Shin-Yokohama Ramen Museum, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: shinYokohamaRamenMuseumTicket.url, label: "Check the Ramen Museum ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥450" },
        { label: "Child / high school", value: "¥100" },
        { label: "Weekdays", value: "11:00–21:00" },
        { label: "Weekends", value: "10:30–21:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the entry fee is small; the real cost is the ramen. Come hungry, and on a weekday if
          you want shorter queues at the shops.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              For repeat visits there are free-entry passes valid for a year: ¥500 for the digital pass (a LINE account is
              needed) and ¥800 for the card pass. To leave and come back on the same day, get a stamp on your ticket at the
              ground-floor information desk.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult", "¥450"],
              ["Elementary and junior high school", "¥100"],
              ["High school (with student ID)", "¥100"],
              ["Under elementary school age", "Free"],
              ["Annual digital pass", "¥500"],
              ["Annual card pass", "¥800"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Ramen is paid for separately at each shop. Klook sells its voucher at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the Ramen Museum open?",
          body: (
            <p className={styles.bodyText}>
              Weekdays 11 a.m. to 9 p.m.; weekends and holidays 10:30 a.m. to 9 p.m. Last orders at the ramen shops are 30
              minutes before closing. It is closed on 31 December and 1 January; from 27 to 30 December 2026 it opens 10 a.m.
              to 9:30 p.m.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: shinYokohamaRamenMuseumTicket.url, label: "Book the Ramen Museum entry on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Yokohama",
        intro: "The museum is a short train ride from Minatomirai, so it pairs with these.",
        tours: [cupNoodlesMuseumGuidedTour, yokohamaAnpanmanMuseumTicket, hakkeijimaSeaParadiseTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For a full day around it, see the <Link href="/guides/attractions/yokohama-day-trip" style={linkStyle}>Yokohama day trip</Link>. With children, add the
          <Link href="/guides/attractions/yokohama-anpanman-museum-tickets" style={linkStyle}>Yokohama Anpanman Children&apos;s Museum</Link> or
          <Link href="/guides/attractions/hakkeijima-sea-paradise-tickets" style={linkStyle}>Hakkeijima Sea Paradise</Link>; to cook ramen yourself, see the
          <Link href="/guides/attractions/tokyo-cooking-class" style={linkStyle}>Tokyo cooking classes</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Shin-Yokohama Ramen Museum?",
          a: `Entry is ¥450 for adults and ¥100 for elementary and junior high school students; high school students pay ¥100 with ID and children under school age are free. Checked ${CHECKED}.`,
        },
        {
          q: "Do I have to eat ramen?",
          a: "The museum asks visitors of junior high school age and older to order one bowl each. Bowls are paid for at each shop.",
        },
        {
          q: "What are the opening hours?",
          a: "11:00 to 21:00 on weekdays and 10:30 to 21:00 on weekends and holidays. The shops take last orders 30 minutes before closing.",
        },
        {
          q: "When is it closed?",
          a: "On 31 December and 1 January. It may also close without notice after an earthquake or similar event.",
        },
        {
          q: "Can I leave and come back?",
          a: "Yes, on the same day. Get a stamp on the back of your ticket at the ground-floor information desk and show it when you return.",
        },
      ]}
      related={[
        { href: "/guides/attractions/yokohama-day-trip", title: "Yokohama Day Trip" },
        { href: "/guides/attractions/yokohama-anpanman-museum-tickets", title: "Yokohama Anpanman Museum Tickets" },
        { href: "/guides/attractions/tokyo-food-tour", title: "Tokyo Food Tours" },
        { href: "/guides/attractions/tokyo-cooking-class", title: "Tokyo Cooking Classes" },
      ]}
      banner={{
        title: "Ramen from across Japan, one building",
        desc: "Admission to the Shin-Yokohama Ramen Museum.",
        label: "View the Ramen Museum ticket →",
      }}
    />
  );
}
