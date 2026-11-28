import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { legolandJapanTicket, nagoyaCastleAfterHoursTour } from "../../../lib/klook-links";
import { scmaglevRailwayParkTicket, portOfNagoyaAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from JR Central's own
// English pages, read by node fetch on 28 Nov 2026: museum.jr-central.co.jp/en/facilities/
// (10:00-17:30, last admission 30 min before closing; closed Tuesdays (open on a holiday
// Tuesday, closed the next day) and 28 Dec - 1 Jan; adult 1,200 yen, school child 500,
// child 3+ 200, groups of 20+ 1,000 / 400 / 100; Shinkansen driving simulator 500 yen,
// conventional crew simulator 500 yen, conventional driving simulator 100 yen, first come
// first served with the day's admission ticket; free audio guide in 8 languages over the
// museum Wi-Fi), /en/ (39 rolling stock on display, maglev and conventional) and /en/access/
// (about 2 minutes on foot from Kinjofuto Station; Aonami Line from Nagoya about 24 min; no
// parking). An older English page still shows 1,000 yen; the current facilities page and the
// Japanese page both show 1,200. No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/scmaglev-railway-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://museum.jr-central.co.jp/en/facilities/";
const ACCESS = "https://museum.jr-central.co.jp/en/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ScmaglevRailwayParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="SCMAGLEV and Railway Park Tickets"
      title="SCMAGLEV and Railway Park Tickets 2026: Price & Hours"
      description="SCMAGLEV and Railway Park in Nagoya is ¥1,200 for adults and ¥500 for school children, open 10:00–17:30 and closed Tuesdays. Simulators and access."
      h1={<>SCMAGLEV and Railway Park Tickets 2026: <br />Price, Hours &amp; Simulators</>}
      subtitle="JR Central's railway museum at Kinjofuto, Nagoya: admission, the shinkansen simulator fee, the Tuesday closing day and the Aonami Line."
      badges={[`Checked ${CHECKED}`, "¥1,200 adult", "Nagoya"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A SCMAGLEV and Railway Park ticket is <strong>¥1,200 for adults</strong>, ¥500 for school children and
            ¥200 for children aged 3 and up. The shinkansen driving simulator costs ¥500 extra and is first come,
            first served on the day.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>10:00–17:30</strong> (last admission 17:00) and{" "}
            <strong>closed on Tuesdays</strong> — when a public holiday falls on a Tuesday it opens and closes the
            next day instead — and from 28 December to 1 January. The museum is 2 minutes on foot from Kinjofuto
            Station, about 24 minutes from Nagoya on the Aonami Line. Klook sells the ticket. JR Central, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: scmaglevRailwayParkTicket.url, label: "Check SCMAGLEV and Railway Park tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,200" },
        { label: "School child", value: "¥500" },
        { label: "Hours", value: "10:00–17:30" },
        { label: "Closed", value: "Tuesdays" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go early if you want the shinkansen simulator — tickets are sold first come,
          first served and only one go per person. LEGOLAND Japan is at the same station.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the SCMAGLEV and Railway Park?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Simulator tickets need that day&apos;s admission ticket and are sold at the Information Booth (shinkansen)
              or a vending machine (conventional). The audio guide is free on your phone through the museum Wi-Fi.
            </p>
          ),
          table: {
            head: ["Ticket", "Price", "Group of 20+"],
            rows: [
              ["Adult", "¥1,200", "¥1,000"],
              ["School child", "¥500", "¥400"],
              ["Child (age 3 and up)", "¥200", "¥100"],
              ["Shinkansen driving simulator", "¥500", "—"],
              ["Conventional train crew simulator", "¥500", "—"],
              ["Conventional train driving simulator", "¥100", "—"],
            ],
            note: (
              <>
                JR Central prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the admission ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "How do I get to the SCMAGLEV and Railway Park?",
          body: (
            <p className={styles.bodyText}>
              Take the Aonami Line from Nagoya Station to Kinjofuto (about 24 minutes); the museum is
              about 2 minutes on foot. From Chubu Centrair Airport, ride the Meitetsu line to Nagoya and change. There
              is no parking at the museum. See the{" "}
              <a href={ACCESS} target="_blank" rel="noopener" style={linkStyle}>access page</a>.
            </p>
          ),
          ctas: [{ href: scmaglevRailwayParkTicket.url, label: "Book the SCMAGLEV and Railway Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day in Nagoya",
        intro: "LEGOLAND Japan is at Kinjofuto too; the aquarium and the castle fill the rest of a Nagoya day.",
        tours: [legolandJapanTicket, portOfNagoyaAquariumTicket, nagoyaCastleAfterHoursTour],
      }}
      links={
        <p className={styles.bodyText}>
          Next door, see{" "}
          <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>LEGOLAND Japan tickets</Link>. The{" "}
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2-day itinerary</Link> fits
          the museum into a short stay,{" "}
          <Link href="/guides/attractions/port-of-nagoya-aquarium-tickets" style={linkStyle}>Port of Nagoya Public Aquarium</Link>{" "}
          is the other big family stop by the port, and the{" "}
          <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>Nagoya Castle tickets</Link> guide
          covers the city centre.
          {" "}In the Tokyo area, the <Link href="/guides/attractions/railway-museum-saitama-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Railway Museum in Saitama</Link> is ¥1,500 in advance or ¥1,600 on the day for adults.
        </p>
      }
      faq={[
        {
          q: "How much is the SCMAGLEV and Railway Park?",
          a: `¥1,200 for adults, ¥500 for school children and ¥200 for children aged 3 and up. The shinkansen simulator is ¥500 extra. Checked ${CHECKED}.`,
        },
        {
          q: "Is the SCMAGLEV and Railway Park closed on Tuesdays?",
          a: "Yes. When a public holiday falls on a Tuesday it opens that day and closes the next day. It also closes from 28 December to 1 January.",
        },
        {
          q: "What are the opening hours?",
          a: "10:00 to 17:30, with last admission 30 minutes before closing.",
        },
        {
          q: "How do I get there from Nagoya Station?",
          a: "Take the Aonami Line to Kinjofuto, about 24 minutes, then walk about 2 minutes.",
        },
        {
          q: "Can I buy tickets on Klook?",
          a: "Yes. Klook sells a SCMAGLEV and Railway Park admission ticket; simulator tickets are bought at the museum on the day.",
        },
      ]}
      related={[
        { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets" },
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2-Day Itinerary" },
        { href: "/guides/attractions/port-of-nagoya-aquarium-tickets", title: "Port of Nagoya Aquarium Tickets" },
        { href: "/guides/attractions/nagoya-castle-tickets", title: "Nagoya Castle Tickets" },
      ]}
      banner={{
        title: "39 trains, from maglev to shinkansen",
        desc: "Admission to JR Central's SCMAGLEV and Railway Park.",
        label: "View SCMAGLEV and Railway Park tickets →",
      }}
    />
  );
}
