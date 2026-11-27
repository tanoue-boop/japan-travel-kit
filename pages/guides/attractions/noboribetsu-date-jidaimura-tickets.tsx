import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { noboribetsuToyaOtaruDayTour, noboribetsuToyaNisekoDayTour } from "../../../lib/klook-links";
import { noboribetsuDateJidaimuraTicket, sapporoNoboribetsuAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from the park's own
// English pages, read by node fetch on 28 Nov 2026: edo-trip.jp/en/information/ (free pass
// adult (middle school and older) 3,300 yen, elementary 1,700, age 4+ 600; 65 and older
// 2,600; web coupon to 28 Feb 2027 3,150 / 1,600 / 500; summer 20 Mar - 31 Oct 9:00-17:00,
// winter 1 Nov - 19 Mar 9:00-16:00, entry ends one hour before closing; open year round,
// closed 8-11 March 2027 for inspection; parking 500 yen), /en/2026/09/25/wintertime2026/
// (winter-only SAMURAI-Show at the O-edo Theater from 4 November) and /en/access/ (Donan
// Bus from JR Noboribetsu Station, about 6 minutes; 10 minutes by car from Noboribetsu
// Onsen). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/noboribetsu-date-jidaimura-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://edo-trip.jp/en/information/";
const ACCESS = "https://edo-trip.jp/en/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NoboribetsuDateJidaimuraTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Noboribetsu Date Jidaimura Tickets"
      title="Noboribetsu Date Jidaimura 2026: Tickets, Price & Hours"
      description="Noboribetsu Date Jidaimura is ¥3,300 for adults and ¥1,700 for children, open 9:00–16:00 in winter. Shows, access from Noboribetsu and how to book."
      h1={<>Noboribetsu Date Jidaimura 2026: <br />Tickets, Price &amp; Hours</>}
      subtitle="The Edo-period village between Noboribetsu Station and the onsen town: the free pass price, winter hours and the March 2027 closure."
      badges={[`Checked ${CHECKED}`, "¥3,300 adult", "Hokkaido"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Noboribetsu Date Jidaimura free pass is <strong>¥3,300 for adults</strong> (middle school and
            older), ¥1,700 for elementary school pupils and ¥600 for children aged 4 and up. Visitors aged 65 and
            over pay ¥2,600 with proof of age.
          </p>
          <p className={styles.bodyText}>
            In winter (1 November – 19 March) it is open <strong>9:00–16:00</strong>, and from 20 March to 31 October
            9:00–17:00; entry ends one hour before closing. It is open all year except{" "}
            <strong>8–11 March 2027</strong> for inspection. Klook sells the ticket. Noboribetsu Date Jidaimura,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: noboribetsuDateJidaimuraTicket.url, label: "Check Date Jidaimura tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥3,300" },
        { label: "Elementary", value: "¥1,700" },
        { label: "Winter hours", value: "9:00–16:00" },
        { label: "Last entry (winter)", value: "15:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> in winter, arrive by early afternoon — entry stops at 15:00. It sits between
          JR Noboribetsu Station and the onsen town, so it fits on the way in or out.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Noboribetsu Date Jidaimura?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The park also offers a web coupon (valid to 28 February 2027) and a discount for visitors with a
              disability certificate. Parking is ¥500 per car.
            </p>
          ),
          table: {
            head: ["Ticket", "Free pass", "Web coupon"],
            rows: [
              ["Adult (middle school and older)", "¥3,300", "¥3,150"],
              ["Elementary school", "¥1,700", "¥1,600"],
              ["Child (age 4 and up)", "¥600", "¥500"],
              ["65 and older", "¥2,600", "—"],
            ],
            note: (
              <>
                Noboribetsu Date Jidaimura prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "How do I get to Date Jidaimura?",
          body: (
            <p className={styles.bodyText}>
              From JR Noboribetsu Station, the Donan Bus toward Noboribetsu Onsen takes about 6 minutes; by car it is
              about 10 minutes from Noboribetsu Onsen and 3 minutes from the Noboribetsu-higashi IC. From 4 November
              the winter-only SAMURAI-Show plays at the O-edo Theater. See the{" "}
              <a href={ACCESS} target="_blank" rel="noopener" style={linkStyle}>park&apos;s access page</a>.
            </p>
          ),
          ctas: [{ href: noboribetsuDateJidaimuraTicket.url, label: "Book Date Jidaimura on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Noboribetsu from Sapporo",
        intro: "The JR pass covers the train from Sapporo to Noboribetsu; the day tours from Sapporo add Lake Toya.",
        tours: [sapporoNoboribetsuAreaPass, noboribetsuToyaOtaruDayTour, noboribetsuToyaNisekoDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the train from Sapporo, see the{" "}
          <Link href="/guides/transport/sapporo-noboribetsu-area-pass" style={linkStyle}>Sapporo-Noboribetsu Area Pass</Link>.
          The{" "}
          <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>Hokkaido 7-day itinerary</Link> and
          the{" "}
          <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3-day itinerary</Link> fit
          Noboribetsu into a trip, and{" "}
          <Link href="/guides/attractions/edo-wonderland-tickets" style={linkStyle}>Edo Wonderland in Nikko</Link> is
          the Edo village near Tokyo.
        </p>
      }
      faq={[
        {
          q: "How much is Noboribetsu Date Jidaimura?",
          a: `¥3,300 for adults (middle school and older), ¥1,700 for elementary pupils and ¥600 for children aged 4 and up; ¥2,600 for 65 and older. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "9:00–16:00 from 1 November to 19 March and 9:00–17:00 from 20 March to 31 October. Entry ends one hour before closing.",
        },
        {
          q: "Is Date Jidaimura open every day?",
          a: "It is open all year, except for an inspection closure from 8 to 11 March 2027.",
        },
        {
          q: "How do I get there from Noboribetsu Station?",
          a: "Take the Donan Bus toward Noboribetsu Onsen, about 6 minutes.",
        },
        {
          q: "Can I buy Date Jidaimura tickets on Klook?",
          a: "Yes. Klook sells an admission ticket; the park also sells advance tickets through an external site.",
        },
      ]}
      related={[
        { href: "/guides/transport/sapporo-noboribetsu-area-pass", title: "Sapporo-Noboribetsu Area Pass" },
        { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7-Day Itinerary" },
        { href: "/guides/attractions/sapporo-3-day-itinerary", title: "Sapporo 3-Day Itinerary" },
        { href: "/guides/attractions/edo-wonderland-tickets", title: "Edo Wonderland Tickets" },
      ]}
      banner={{
        title: "An Edo-period village in Noboribetsu",
        desc: "Admission to Noboribetsu Date Jidaimura.",
        label: "View Date Jidaimura tickets →",
      }}
    />
  );
}
