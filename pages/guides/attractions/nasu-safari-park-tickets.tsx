import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nasuSafariParkTicket, tobuWorldSquareTicket, edoWonderlandTicket, nikkoPassTobu } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Every figure is from Nasu Safari
// Park's own Japanese pages, read by node fetch on 28 Nov 2026: nasusafari.com/guide/
// (admission adult junior-high and up 3,200 yen, group 2,880; child 3 to elementary
// 1,900, group 1,710; disability half price; the way you enter the safari zone costs extra;
// four seasonal hour patterns 9:00-16:30, 9:30-16:30, 9:30-15:00, 10:00-16:30 with safari-zone
// entry ending between 14:15 and 15:45; parking about 350 cars free), /entry/ (Lion Bus
// +1,200 adult / 600 child, about 40-45 min, no reservation; Wild Ride +1,500, about 50 min,
// reservation; safari car rental +3,000 for 5 seats, +4,000 minivan; own car with Safari
// Guide +1,000) and /access/ (buses from Nasushiobara and Kuroiso stations toward Nasu
// Yumoto). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/nasu-safari-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.nasusafari.com/guide/";
const ENTRY = "https://www.nasusafari.com/entry/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NasuSafariParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nasu Safari Park Tickets"
      title="Nasu Safari Park Tickets 2026: Price, Lion Bus & Hours"
      description="Nasu Safari Park is ¥3,200 for adults and ¥1,900 for children, plus ¥1,200 for the Lion Bus or ¥3,000 for a safari car. Seasonal hours and access."
      h1={<>Nasu Safari Park Tickets 2026: <br />Price, Lion Bus &amp; Hours</>}
      subtitle="The drive-through safari park in the Nasu highlands, Tochigi: admission, the four ways into the safari zone, and opening hours."
      badges={[`Checked ${CHECKED}`, "¥3,200 adult", "Tochigi"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Nasu Safari Park admission is <strong>¥3,200 for adults</strong> (junior high school and up) and ¥1,900
            for children from age 3 to elementary school. Getting into the safari zone costs extra: the{" "}
            <strong>Lion Bus is ¥1,200</strong> for adults and ¥600 for children, the caged Wild Ride bus ¥1,500,
            a park rental car from ¥3,000, or ¥1,000 for the Safari Guide if you drive your own car.
          </p>
          <p className={styles.bodyText}>
            Hours change by season: the park opens between 9:00 and 10:00 and closes at 15:00 or 16:30, and entry
            to the safari zone ends earlier (14:15–15:45). Klook sells the admission ticket. Nasu Safari Park,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nasuSafariParkTicket.url, label: "Check Nasu Safari Park tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥3,200" },
        { label: "Child (3+)", value: "¥1,900" },
        { label: "Lion Bus", value: "+¥1,200" },
        { label: "Parking", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> without a car, the Lion Bus is the simple choice — no booking, about 40–45
          minutes. Book the Wild Ride the day before if you want the caged bus.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Nasu Safari Park?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Admission and the way into the safari zone are paid separately. Groups of 15 or more pay ¥2,880 (adult)
              and ¥1,710 (child).
            </p>
          ),
          table: {
            head: ["Ticket", "Price", "Notes"],
            rows: [
              ["Admission, adult (junior high and up)", "¥3,200", ""],
              ["Admission, child (age 3 to elementary)", "¥1,900", ""],
              ["Lion Bus", "+¥1,200 adult · +¥600 child", "About 40–45 min, no reservation"],
              ["Wild Ride", "+¥1,500", "About 50 min, reserve online by the day before"],
              ["Safari car (park rental)", "+¥3,000 (5 seats) · +¥4,000 (minivan)", "No reservation"],
              ["Your own car", "+¥1,000 Safari Guide", "Some car types are refused"],
            ],
            note: (
              <>
                Nasu Safari Park prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Admission</a>{" "}
                and{" "}
                <a href={ENTRY} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>entry methods</a>.
                Klook sells the admission ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              The official calendar uses four patterns (9:00–16:30, 9:30–16:30, 9:30–15:00 and 10:00–16:30); check
              the date before you go. Without a car, take a bus from Nasushiobara or Kuroiso Station towards Nasu
              Yumoto and the ropeway. Parking for about 350 cars is free.
            </p>
          ),
          ctas: [{ href: nasuSafariParkTicket.url, label: "Book Nasu Safari Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Tochigi",
        intro: "Nasu is in the north of Tochigi; Kinugawa and Nikko are in the same prefecture.",
        tours: [tobuWorldSquareTicket, edoWonderlandTicket, nikkoPassTobu],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of Tochigi, see the{" "}
          <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko day trip</Link>,{" "}
          <Link href="/guides/attractions/edo-wonderland-tickets" style={linkStyle}>Edo Wonderland tickets</Link> and{" "}
          <Link href="/guides/attractions/tobu-world-square-tickets" style={linkStyle}>Tobu World Square tickets</Link>.
          If you travel by shinkansen, the{" "}
          <Link href="/guides/transport/jr-east-pass" style={linkStyle}>JR East Pass</Link> guide covers the rail
          passes for the Tohoku line.
          {" "}For capybaras, <Link href="/guides/attractions/izu-shaboten-zoo-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Izu Shaboten Zoo</Link> in Izu is ¥2,800 for adults on weekdays and ¥3,000 on weekends.
          {" "}Nearby in Nasu, <Link href="/guides/attractions/nasu-highland-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Nasu Highland Park</Link> is ¥1,600 for adults to enter (¥6,100 with unlimited rides) and <Link href="/guides/attractions/rindo-lake-family-ranch-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Rindo Lake Family Ranch</Link> ¥1,600 (¥4,900 with rides); both open on fewer days in winter.
        </p>
      }
      faq={[
        {
          q: "How much is Nasu Safari Park?",
          a: `Admission is ¥3,200 for adults (junior high and up) and ¥1,900 for children from age 3. The way into the safari zone is extra. Checked ${CHECKED}.`,
        },
        {
          q: "How much is the Lion Bus?",
          a: "¥1,200 for adults and ¥600 for children on top of admission. It takes about 40–45 minutes and needs no reservation.",
        },
        {
          q: "Can I drive my own car through the park?",
          a: "Yes, with the ¥1,000 Safari Guide. Open cars, very low cars and cars with a rear spare tyre may be refused; a park rental car is ¥3,000 or ¥4,000.",
        },
        {
          q: "What are the opening hours?",
          a: "They change with the season: opening 9:00–10:00 and closing 15:00 or 16:30, with safari-zone entry ending between 14:15 and 15:45. Check the official calendar.",
        },
        {
          q: "Can I buy Nasu Safari Park tickets on Klook?",
          a: "Yes. Klook sells a Nasu Safari Park admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip" },
        { href: "/guides/attractions/edo-wonderland-tickets", title: "Edo Wonderland Tickets" },
        { href: "/guides/attractions/tobu-world-square-tickets", title: "Tobu World Square Tickets" },
        { href: "/guides/transport/jr-east-pass", title: "JR East Pass" },
      ]}
      banner={{
        title: "Lions and giraffes in Nasu",
        desc: "Admission to Nasu Safari Park in Tochigi.",
        label: "View Nasu Safari Park tickets →",
      }}
    />
  );
}
