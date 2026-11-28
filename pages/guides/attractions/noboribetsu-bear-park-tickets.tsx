import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { noboribetsuToyaOtaruDayTour } from "../../../lib/klook-links";
import { noboribetsuBearParkTicket, noboribetsuDateJidaimuraTicket, sapporoNoboribetsuAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from Noboribetsu Bear Park's own site (Noboribetsu Onsen Cable), read by node fetch on
// 28 Nov 2026: bearpark.jp/en/ (adult 3,200 yen, child 4 to elementary 1,600, under 3 free; the return ropeway
// is included; 21 Oct - 20 Apr ticket sales 9:30-15:50, park closes 16:30; 21 Apr - 20 Oct 9:00-16:20, 17:00;
// ropeway about 7 minutes; visit about 60-90 minutes; closed 5-23 Apr 2027 for inspection; parking 500 yen),
// /access/ (ropeway station in Noboribetsu Onsen town; free shuttle from the onsen town on weekdays only since
// 12 Sep 2026) and /ropeway/ (1,260 m, about 300 m rise). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/noboribetsu-bear-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://bearpark.jp/en/";
const HOURS = "https://bearpark.jp/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NoboribetsuBearParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Noboribetsu Bear Park"
      title="Noboribetsu Bear Park 2026: Ticket Price, Hours & Ropeway"
      description="Noboribetsu Bear Park is ¥3,200 for adults and ¥1,600 for children, with the return ropeway included. Winter hours 9:30–16:30; closed 5–23 April 2027."
      h1={<>Noboribetsu Bear Park 2026: <br />Ticket Price, Hours &amp; Ropeway</>}
      subtitle="The bear park on the mountain above Noboribetsu Onsen in Hokkaido: what the ticket costs, the ropeway, winter hours and the 2027 closure."
      badges={[`Checked ${CHECKED}`, "¥3,200 with ropeway", "Noboribetsu Onsen"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Noboribetsu Bear Park is <strong>¥3,200 for adults</strong> and ¥1,600 for children aged 4 to elementary
            school; under-3s are free. The price includes the return ropeway, which is the only way up to the park
            (about 7 minutes each way).
          </p>
          <p className={styles.bodyText}>
            From 21 October to 20 April tickets are sold 9:30–15:50 and the park closes at 16:30. It is closed from 5
            to 23 April 2027 for the legal ropeway inspection. The ropeway station is in Noboribetsu Onsen town. Klook
            sells admission tickets. Noboribetsu Bear Park, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: noboribetsuBearParkTicket.url, label: "Check Noboribetsu Bear Park tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥3,200" },
        { label: "Child (4–12)", value: "¥1,600" },
        { label: "Winter hours", value: "9:30–16:30" },
        { label: "Ropeway", value: "about 7 min" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> allow 60 to 90 minutes at the top plus the ropeway, and arrive before 15:50 in winter,
          when ticket sales stop.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The admission fee includes the return ropeway ride. Children are age 4 to elementary school (6th grade);
              under-3s are free. Credit cards, WeChat Pay and Alipay are accepted. Parking at the ropeway is ¥500 for a
              car.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult", "¥3,200"],
              ["Child (4 to elementary school)", "¥1,600"],
              ["Age 3 and under", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells admission at its own price; the ropeway is included in the park ticket.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              From 21 October to 20 April, ticket sales run 9:30–15:50 and the park closes at 16:30; from 21 April to
              20 October it is 9:00–16:20 and 17:00. The park is closed from 5 to 23 April 2027 for ropeway inspection
              and maintenance. The ropeway station is in the centre of Noboribetsu Onsen, and the gondola climbs about
              300 m over 1,260 m. A free shuttle runs from the onsen town to the ropeway on weekdays only.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: noboribetsuBearParkTicket.url, label: "Book Noboribetsu Bear Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: around Noboribetsu",
        intro: "Date Jidaimura is also in Noboribetsu, and the area pass and day tours start in Sapporo.",
        tours: [noboribetsuDateJidaimuraTicket, sapporoNoboribetsuAreaPass, noboribetsuToyaOtaruDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the trip, see the <Link href="/guides/transport/sapporo-noboribetsu-area-pass" style={linkStyle}>Sapporo-Noboribetsu Area Pass</Link>, the
          <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>Hokkaido 7-day itinerary</Link> and the
          <Link href="/guides/attractions/hokkaido-winter-tours" style={linkStyle}>Hokkaido winter tours</Link>. Nearby, see
          <Link href="/guides/attractions/noboribetsu-date-jidaimura-tickets" style={linkStyle}>Noboribetsu Date Jidaimura</Link>.
          {" "}For an aquarium at Noboribetsu, <Link href="/guides/attractions/noboribetsu-marine-park-nixe-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Noboribetsu Marine Park Nixe</Link> is ¥3,200 for adults and ¥1,600 for ages 4–12, open 9:00–17:00.
        </p>
      }
      faq={[
        {
          q: "How much is Noboribetsu Bear Park?",
          a: `¥3,200 for adults and ¥1,600 for children aged 4 to elementary school, with the return ropeway included. Checked ${CHECKED}.`,
        },
        {
          q: "Is the ropeway included?",
          a: "Yes. The return ropeway fare is part of the admission fee; the ropeway is the only way to reach the park.",
        },
        {
          q: "What are the winter hours?",
          a: "From 21 October to 20 April, tickets are sold 9:30–15:50 and the park closes at 16:30.",
        },
        {
          q: "When is Noboribetsu Bear Park closed?",
          a: "From 5 to 23 April 2027 for the legal ropeway inspection and maintenance. It reopens on 24 April 2027.",
        },
        {
          q: "How long does a visit take?",
          a: "About 60 to 90 minutes at the park, plus about 7 minutes on the ropeway each way.",
        },
      ]}
      related={[
        { href: "/guides/attractions/noboribetsu-date-jidaimura-tickets", title: "Noboribetsu Date Jidaimura" },
        { href: "/guides/transport/sapporo-noboribetsu-area-pass", title: "Sapporo-Noboribetsu Area Pass" },
        { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7-Day Itinerary" },
        { href: "/guides/attractions/shiroi-koibito-park-tickets", title: "Shiroi Koibito Park Tickets" },
      ]}
      banner={{
        title: "Bears above the onsen town",
        desc: "Admission with the return ropeway.",
        label: "View Bear Park tickets →",
      }}
    />
  );
}
