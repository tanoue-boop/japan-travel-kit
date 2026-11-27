import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { inuyamaMeijiMuraMeitetsuPass, nagoyaSamuraiInuyamaDayTour, legolandJapanTicket } from "../../../lib/klook-links";
import { meijiMuraTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). meijimura.com answers automated reads
// with 403, so every figure is from the museum's own pages as shown in the search index
// restricted to meijimura.com on 28 Nov 2026: /guide/price/ (admission adult 2,500 yen,
// high school 1,500, junior high and elementary 700; preschoolers free; donation ticket
// 3,000; groups of 20+ 2,200 / 1,200 / 500; annual "resident registration" 7,500 / 4,500 /
// 2,100), /guide/open/ (November 9:30-16:00, December-February 10:00-16:00, entry until 30
// min before closing, weekend and holiday extensions noted on the calendar; closed 14-18
// and 31 December 2026). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/meiji-mura-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.meijimura.com/guide/price/";
const HOURS = "https://www.meijimura.com/guide/open/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MeijiMuraTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Meiji Mura Tickets"
      title="Meiji Mura Tickets 2026: Price, Hours & Inuyama Combo"
      description="Meiji Mura, the open-air museum near Inuyama, is ¥2,500 for adults and ¥700 for pupils, open 10:00–16:00 in winter. December closures and Inuyama combo."
      h1={<>Meiji Mura Tickets 2026: <br />Price, Hours &amp; Inuyama Combo</>}
      subtitle="The open-air museum of Meiji-era buildings north of Nagoya: prices by age, winter hours and closed days."
      badges={[`Checked ${CHECKED}`, "¥2,500 adult", "Aichi"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Meiji Mura ticket is <strong>¥2,500 for adults</strong>, ¥1,500 for high school students and ¥700 for
            junior high and elementary school pupils; preschool children enter free.
          </p>
          <p className={styles.bodyText}>
            From December to February it is open <strong>10:00–16:00</strong> (November 9:30–16:00), with entry until
            30 minutes before closing; some weekends and holidays run later. It is closed{" "}
            <strong>14–18 and 31 December 2026</strong>. Klook sells the admission and a set with Inuyama Castle
            and a Meitetsu day pass. Meiji Mura, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: meijiMuraTicket.url, label: "Check Meiji Mura tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,500" },
        { label: "High school", value: "¥1,500" },
        { label: "Junior high / elementary", value: "¥700" },
        { label: "Winter hours", value: "10:00–16:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> with winter closing at 16:00, arrive by late morning, and check the December closures
          before you go.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Meiji Mura?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              A ¥3,000 admission with a donation towards the buildings is also sold. Groups of 20 or more pay less.
            </p>
          ),
          table: {
            head: ["Ticket", "Admission", "Group (20+)", "Annual pass"],
            rows: [
              ["Adult", "¥2,500", "¥2,200", "¥7,500"],
              ["High school", "¥1,500", "¥1,200", "¥4,500"],
              ["Junior high and elementary", "¥700", "¥500", "¥2,100"],
              ["Preschool", "Free", "Free", "—"],
            ],
            note: (
              <>
                Meiji Mura prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours",
          title: "When is Meiji Mura open?",
          body: (
            <p className={styles.bodyText}>
              December to February 10:00–16:00, November 9:30–16:00; last entry 30 minutes before closing. Closed
              days in December 2026 are the 14th to 18th and the 31st. The official calendar shows the later
              weekend closing times.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Hours and closed days</a>.
            </p>
          ),
          ctas: [{ href: meijiMuraTicket.url, label: "Book Meiji Mura on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Inuyama",
        intro: "Inuyama Castle is in the same area. These Klook products cover the castle and the train from Nagoya.",
        tours: [inuyamaMeijiMuraMeitetsuPass, nagoyaSamuraiInuyamaDayTour, legolandJapanTicket],
      }}
      links={
        <p className={styles.bodyText}>
          To plan the rest of the trip, see the{" "}
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2-day itinerary</Link> and{" "}
          <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>Nagoya Castle tickets</Link>. With
          children,{" "}
          <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>LEGOLAND Japan</Link> and{" "}
          <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>Ghibli Park</Link> are other Aichi
          days.
        </p>
      }
      faq={[
        {
          q: "How much is Meiji Mura?",
          a: `¥2,500 for adults, ¥1,500 for high school students and ¥700 for junior high and elementary pupils; preschoolers are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are Meiji Mura's opening hours?",
          a: "10:00–16:00 from December to February and 9:30–16:00 in November, with entry until 30 minutes before closing. Some weekends and holidays close later.",
        },
        {
          q: "When is Meiji Mura closed in December 2026?",
          a: "14 to 18 December and 31 December 2026.",
        },
        {
          q: "Is there a ticket with Inuyama Castle?",
          a: "Yes. Klook sells a set with Inuyama Castle, Meiji Mura and a one-day Meitetsu pass; it is not sold to Japanese passport holders.",
        },
        {
          q: "Can I buy Meiji Mura tickets on Klook?",
          a: "Yes. Klook sells a Meiji Mura admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2-Day Itinerary" },
        { href: "/guides/attractions/nagoya-castle-tickets", title: "Nagoya Castle Tickets" },
        { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets" },
        { href: "/guides/attractions/ghibli-park-tickets", title: "Ghibli Park Tickets" },
      ]}
      banner={{
        title: "Meiji-era Japan in one village",
        desc: "Admission to Meiji Mura near Inuyama.",
        label: "View Meiji Mura tickets →",
      }}
    />
  );
}
