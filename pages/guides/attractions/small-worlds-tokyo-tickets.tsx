import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tokyoBayGoKartTour, tokyoJoypolisPassport, asakusaOdaibaMizubeCruise } from "../../../lib/klook-links";
import { smallWorldsTokyoTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from SMALL WORLDS' own
// English page, read by node fetch on 28 Nov 2026: smallworlds.jp/en/ (ticket: adult 18+
// 3,200 yen, junior 12-17 2,100, child 4-11 1,700, under 3 free; set with Yurikamome
// 1-day pass 3,450 / 2,870 / 2,120; annual passport 9,800 / 7,600 / 5,900; that day's
// hours 9:00-19:00 with last admission 18:00, hours change by day; average visit about 2
// hours; areas Space Center, Global Village, Kansai International Airport, Evangelion
// Hangar and Tokyo-III; Ariake Tennis no Mori station (Yurikamome) 3 min, Kokusai-Tenjijo
// (Rinkai Line) 9 min; no dedicated parking). No Klook price is printed (403).
const ROUTE = "/guides/attractions/small-worlds-tokyo-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://smallworlds.jp/en/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SmallWorldsTokyoTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="SMALL WORLDS Tokyo Tickets"
      title="Small Worlds Tokyo Tickets 2026: Price, Hours & Booking"
      description="SMALL WORLDS Tokyo, the miniature museum in Ariake: ¥3,200 for adults, ¥2,100 for ages 12–17, ¥1,700 for ages 4–11. Hours, areas and how to get there."
      h1={<>Small Worlds Tokyo Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="The indoor 1/80-scale miniature museum in Ariake: ticket prices by age, the Yurikamome set ticket, hours and the five areas."
      badges={[`Checked ${CHECKED}`, "¥3,200 adult", "Tokyo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A SMALL WORLDS Tokyo ticket is <strong>¥3,200 for adults</strong> (18 and over), ¥2,100 for ages 12–17
            and ¥1,700 for ages 4–11; under-3s are free. A set with a Yurikamome 1-day pass costs ¥3,450 for adults.
            The museum says an average visit takes <strong>about 2 hours</strong>.
          </p>
          <p className={styles.bodyText}>
            Opening hours change by day — on 28 November 2026 it was open <strong>9:00–19:00</strong>, last
            admission 18:00 — so check the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener" style={linkStyle}>official calendar</a>. It is 3
            minutes on foot from Ariake Tennis no Mori station on the Yurikamome. Klook sells the ticket. SMALL
            WORLDS, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: smallWorldsTokyoTicket.url, label: "Check SMALL WORLDS tickets on Klook →" }}
      stats={[
        { label: "Adult (18+)", value: "¥3,200" },
        { label: "Ages 12–17 / 4–11", value: "¥2,100 / ¥1,700" },
        { label: "Average visit", value: "About 2 hours" },
        { label: "Nearest station", value: "Ariake Tennis no Mori, 3 min" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> it is fully indoors, so it works on a rainy day, and it is close to teamLab
          Planets in Toyosu. Anime fans should head for the two Evangelion areas.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is SMALL WORLDS Tokyo?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Visitors with a disability certificate (with English text) and one companion pay a lower rate at the
              counter on the day.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (18+)", "Ages 12–17", "Ages 4–11"],
            rows: [
              ["Admission", "¥3,200", "¥2,100", "¥1,700"],
              ["Admission + Yurikamome 1-day pass", "¥3,450", "¥2,870", "¥2,120"],
              ["Annual passport", "¥9,800", "¥7,600", "¥5,900"],
            ],
            note: (
              <>
                SMALL WORLDS prices, tax included, checked {CHECKED}. Under-3s are free.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Inside",
          title: "What is inside SMALL WORLDS?",
          body: (
            <p className={styles.bodyText}>
              Five 1/80-scale areas: Space Center, Global Village, Kansai International Airport, Evangelion Hangar
              and Evangelion Tokyo-III. The museum also runs workshops where you paint and assemble miniatures, and a
              3D-scan plan that makes a 1/80 figure of you to place in an area (from ¥4,800, bought on the day,
              admission separate).
            </p>
          ),
          ctas: [{ href: smallWorldsTokyoTicket.url, label: "Book SMALL WORLDS on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Odaiba and Tokyo Bay",
        intro: "Ariake sits between Toyosu and Odaiba. These fit the same afternoon.",
        tours: [tokyoJoypolisPassport, tokyoBayGoKartTour, asakusaOdaibaMizubeCruise],
      }}
      links={
        <p className={styles.bodyText}>
          Nearby in Toyosu, see{" "}
          <Link href="/guides/attractions/teamlab-planets-tickets" style={linkStyle}>teamLab Planets tickets</Link>; for
          Odaiba, the{" "}
          <Link href="/guides/attractions/tokyo-joypolis-tickets" style={linkStyle}>Tokyo Joypolis guide</Link>. With
          children, see the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>,
          and for anime fans, the{" "}
          <Link href="/guides/attractions/akihabara-anime-tour" style={linkStyle}>Akihabara anime guide</Link>.
          {" "}Another indoor day out with miniatures: <Link href="/guides/attractions/legoland-discovery-center-tokyo-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>LEGOLAND Discovery Center Tokyo</Link> in Odaiba (¥2,350–¥3,300 online, 2–3 hours typical).
        </p>
      }
      faq={[
        {
          q: "How much is SMALL WORLDS Tokyo?",
          a: `¥3,200 for adults, ¥2,100 for ages 12–17 and ¥1,700 for ages 4–11; under-3s are free. SMALL WORLDS, checked ${CHECKED}.`,
        },
        {
          q: "How long do you need at SMALL WORLDS?",
          a: "The museum says the average visit is about 2 hours; about 1 hour if you only see your favourite areas, 3 hours or more with a workshop or the café.",
        },
        {
          q: "What are the opening hours?",
          a: "They change by day; on 28 November 2026 it was open 9:00–19:00 with last admission at 18:00. Check the official calendar for your date.",
        },
        {
          q: "How do I get to SMALL WORLDS?",
          a: "Ariake Tennis no Mori station on the Yurikamome is 3 minutes on foot; Kokusai-Tenjijo station on the Rinkai Line is 9 minutes. There is no dedicated parking.",
        },
        {
          q: "Can I buy SMALL WORLDS tickets on Klook?",
          a: "Yes. Klook sells a SMALL WORLDS Tokyo ticket; the museum also sells tickets online and at the counter.",
        },
      ]}
      related={[
        { href: "/guides/attractions/teamlab-planets-tickets", title: "teamLab Planets Tickets" },
        { href: "/guides/attractions/tokyo-joypolis-tickets", title: "Tokyo Joypolis Tickets" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/akihabara-anime-tour", title: "Akihabara Anime Tour" },
      ]}
      banner={{
        title: "A world at 1/80 scale",
        desc: "Admission to SMALL WORLDS Tokyo in Ariake.",
        label: "View SMALL WORLDS tickets →",
      }}
    />
  );
}
