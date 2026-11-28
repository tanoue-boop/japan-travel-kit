import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { legolandJapanTicket } from "../../../lib/klook-links";
import { higashiyamaZooTicket, scmaglevRailwayParkTicket, portOfNagoyaAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the zoo's own page, read by node fetch on 28 Nov 2026:
// higashiyama.city.nagoya.jp/english/ (hours 9:00-16:50, tickets sold until 16:30; closed Mondays, or the next weekday
// when Monday is a holiday, and 29 Dec - 1 Jan; adult (high school and up) 500; groups of 30+ 450, 100+ 400; annual
// pass 2,000; garden and Sky Tower ticket 640; junior high and younger free; parking 800 a car, 1,600 spaces;
// 3 minutes from exit 3 of Higashiyama Koen Station, 7 minutes from exit 6 of Hoshigaoka Station).
// No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/higashiyama-zoo-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.higashiyama.city.nagoya.jp/english/";
const HOURS = "https://www.higashiyama.city.nagoya.jp/english/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HigashiyamaZooTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Higashiyama Zoo tickets"
      title="Higashiyama Zoo Tickets 2026: Price, Hours & Sky Tower"
      description="Higashiyama Zoo and Botanical Gardens 2026: ¥500 for adults, free for junior high and younger, ¥640 with the Sky Tower. Open 9:00–16:50, closed Mondays."
      h1={<>Higashiyama Zoo Tickets 2026: <br />Price, Hours &amp; Sky Tower</>}
      subtitle="What Nagoya’s zoo and botanical gardens cost, when they open, and the combined ticket with the Sky Tower."
      badges={[`Checked ${CHECKED}`, "Adults ¥500", "Junior high free"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to Higashiyama Zoo and Botanical Gardens is ¥500 for adults</strong> (high school and older), and
            <strong>free for junior high school students and younger</strong>. The ticket with the Higashiyama Sky Tower is
            ¥640.
          </p>
          <p className={styles.bodyText}>
            It is open 9 a.m. to 4:50 p.m. (tickets until 4:30 p.m.) and closed on Mondays, or the next weekday when Monday is
            a holiday, and from 29 December to 1 January. It is three minutes from exit 3 of Higashiyama Koen Station. Klook
            sells entry and Sky Tower tickets. Higashiyama Zoo and Botanical Gardens, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: higashiyamaZooTicket.url, label: "Check the Higashiyama Zoo ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥500" },
        { label: "Junior high and younger", value: "Free" },
        { label: "With Sky Tower", value: "¥640" },
        { label: "Hours", value: "9:00–16:50" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> one of the cheapest big days out in Nagoya; arrive early, because some animals go back
          to their houses from about 4 p.m.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The same ticket covers the zoo and the botanical gardens. Groups of 30 or more pay ¥450 per adult, groups of 100
              or more ¥400. The annual pass is ¥2,000.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (high school and older)", "¥500"],
              ["Junior high school and younger", "Free"],
              ["Zoo, gardens and Sky Tower", "¥640"],
              ["Group of 30+ (per adult)", "¥450"],
              ["Annual pass", "¥2,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Parking is ¥800 a car. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Higashiyama Zoo open?",
          body: (
            <p className={styles.bodyText}>
              From 9 a.m. to 4:50 p.m.; tickets are sold until 4:30 p.m., and some animals go back inside from about 4 p.m.
              It is closed on Mondays (the next weekday when Monday is a holiday) and from 29 December to 1 January. Exit 3 of
              Higashiyama Koen Station on the Higashiyama subway line is a three-minute walk.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: higashiyamaZooTicket.url, label: "Book Higashiyama Zoo on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Nagoya",
        intro: "Higashiyama is on the subway from Nagoya Station, so the zoo pairs with these.",
        tours: [scmaglevRailwayParkTicket, portOfNagoyaAquariumTicket, legolandJapanTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2-day itinerary</Link> and
          <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>Nagoya Castle</Link>. For another day with children, see the
          <Link href="/guides/attractions/port-of-nagoya-aquarium-tickets" style={linkStyle}>Port of Nagoya Aquarium</Link> or the
          <Link href="/guides/attractions/scmaglev-railway-park-tickets" style={linkStyle}>SCMAGLEV and Railway Park</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Higashiyama Zoo?",
          a: `Entry is ¥500 for adults (high school and older). Junior high school students and younger are free. Checked ${CHECKED}.`,
        },
        {
          q: "How much is the Sky Tower ticket?",
          a: "The ticket for the zoo, botanical gardens and Higashiyama Sky Tower is ¥640.",
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 16:50, with tickets sold until 16:30.",
        },
        {
          q: "Which day is it closed?",
          a: "Mondays (or the next weekday when Monday is a public holiday) and 29 December to 1 January.",
        },
        {
          q: "How do I get there?",
          a: "Three minutes on foot from exit 3 of Higashiyama Koen Station on the Higashiyama subway line; Hoshigaoka Station is closer to the botanical gardens.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2-Day Itinerary" },
        { href: "/guides/attractions/nagoya-castle-tickets", title: "Nagoya Castle Tickets" },
        { href: "/guides/attractions/port-of-nagoya-aquarium-tickets", title: "Port of Nagoya Aquarium" },
        { href: "/guides/attractions/scmaglev-railway-park-tickets", title: "SCMAGLEV and Railway Park" },
      ]}
      banner={{
        title: "Nagoya’s zoo for ¥500",
        desc: "Entry or Sky Tower tickets for Higashiyama.",
        label: "View the Higashiyama Zoo ticket →",
      }}
    />
  );
}
