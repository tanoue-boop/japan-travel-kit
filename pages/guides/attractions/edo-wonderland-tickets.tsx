import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { edoWonderlandTicket, nikkoPassTobu, nikkoHeritageWalkingTour } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from Edo
// Wonderland's own English pages, read by node fetch on 28 Nov 2026:
// edowonderland.net/en/price/ (1-day adult 5,800 / child 3,000 yen; afternoon
// discount after 14:00, winter after 13:00, 5,000 / 2,600; senior 65+ 4,700 / 4,000;
// preschool free; elementary pays child, junior high and up adult; parking car 800;
// official e-tickets) and edowonderland.net/en/calendar/ (summer season 20 Mar-30 Nov
// 9:00-17:00, winter season 1 Dec-19 Mar 9:30-16:00, closed days on the calendar).
// No Klook price is printed (Klook answers automated reads with 403).
const ROUTE = "/guides/attractions/edo-wonderland-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://edowonderland.net/en/price/";
const CALENDAR = "https://edowonderland.net/en/calendar/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function EdoWonderlandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Edo Wonderland Tickets"
      title="Edo Wonderland Tickets 2026: Price, Hours & Booking"
      description="Edo Wonderland Nikko Edomura is ¥5,800 for adults, ¥5,000 after 14:00 (13:00 in winter). Opening hours by season, closed days and how to book."
      h1={<>Edo Wonderland Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="Nikko Edomura, the Edo-period theme town near Nikko: what a ticket costs, when it opens and the afternoon discount."
      badges={[`Checked ${CHECKED}`, "¥5,800 adult", "Nikko"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            An Edo Wonderland Nikko Edomura <strong>1-day ticket is ¥5,800 for adults</strong> (junior high and
            up) and ¥3,000 for children (elementary school); preschool children are free. After 14:00 — after
            13:00 in winter — the <strong>afternoon discount</strong> brings it to ¥5,000 and ¥2,600. Seniors 65+
            pay ¥4,700 with proof of age.
          </p>
          <p className={styles.bodyText}>
            It opens <strong>9:30–16:00 in the winter season (1 December to 19 March)</strong> and 9:00–17:00 from
            20 March to 30 November, with closed days on the{" "}
            <a href={CALENDAR} target="_blank" rel="noopener" style={linkStyle}>operating calendar</a>. Official
            e-tickets let you skip the ticket counter; Klook sells the ticket too. Edo Wonderland, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: edoWonderlandTicket.url, label: "Check Edo Wonderland tickets on Klook →" }}
      stats={[
        { label: "1 day (adult / child)", value: "¥5,800 / ¥3,000" },
        { label: "Afternoon (adult / child)", value: "¥5,000 / ¥2,600" },
        { label: "Winter hours (1 Dec–19 Mar)", value: "9:30–16:00" },
        { label: "Summer hours (20 Mar–30 Nov)", value: "9:00–17:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go for the full day if you want the theatres and shows; the afternoon ticket
          saves ¥800 but in winter leaves you three hours before the 16:00 close. Check the calendar for closed
          days before you travel.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Edo Wonderland?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Elementary school pupils pay the child price; junior high school students and older pay the adult
              price.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Child", "Senior (65+)"],
            rows: [
              ["1 day", "¥5,800", "¥3,000", "¥4,700"],
              ["Afternoon (after 14:00; winter after 13:00)", "¥5,000", "¥2,600", "¥4,000"],
              ["Preschool children", "Free", "Free", "—"],
              ["Parking (car)", "¥800", "", ""],
            ],
            note: (
              <>
                Edo Wonderland ticket prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Prices include tax. Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours",
          title: "What are Edo Wonderland's opening hours?",
          body: null,
          table: {
            head: ["Season", "Dates", "Hours"],
            rows: [
              ["Winter", "1 December – 19 March", "9:30–16:00"],
              ["Summer", "20 March – 30 November", "9:00–17:00"],
            ],
            note: (
              <>
                Edo Wonderland operating calendar, checked {CHECKED}. Closed days are marked on the calendar and
                may change; the park asks visitors to check before coming.
              </>
            ),
          },
          ctas: [{ href: edoWonderlandTicket.url, label: "Book Edo Wonderland on Klook →" }],
        },
        {
          label: "Good to know",
          title: "What should I know before visiting?",
          body: (
            <p className={styles.bodyText}>
              Entry to the Ninja Theater is not allowed once a performance has started, and theatres, experience
              halls and free facilities can change, cancel or restrict entry without notice. Pets must stay in a
              cage or basket. Guests who have been drinking may be refused entry.
            </p>
          ),
        },
      ]}
      sameDay={{
        heading: "Same trip: Nikko",
        intro: "Edo Wonderland is in Nikko City (470-2 Karakura). These cover the rest of a Nikko trip.",
        tours: [nikkoPassTobu, nikkoHeritageWalkingTour],
      }}
      links={
        <p className={styles.bodyText}>
          Most visitors combine Edo Wonderland with the shrines: see our{" "}
          <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko day trip guide</Link> and the{" "}
          <Link href="/guides/transport/nikko-pass" style={linkStyle}>NIKKO PASS guide</Link> for Tobu&apos;s passes
          from Asakusa. For samurai and ninja in Tokyo itself, see{" "}
          <Link href="/guides/attractions/samurai-ninja-experience-tokyo" style={linkStyle}>samurai and ninja experiences in Tokyo</Link>,
          and for the rest of the city,{" "}
          <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>.
          {" "}In Hokkaido, <Link href="/guides/attractions/noboribetsu-date-jidaimura-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Noboribetsu Date Jidaimura</Link> is a similar Edo-period village near the onsen town.
          {" "}In the same Kinugawa area, <Link href="/guides/attractions/tobu-world-square-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Tobu World Square</Link> shows 102 world landmarks at 1:25 scale (¥2,800 for adults); further north, <Link href="/guides/attractions/nasu-safari-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Nasu Safari Park</Link> is a drive-through safari.
          {" "}For rides in Nasu, <Link href="/guides/attractions/nasu-highland-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Nasu Highland Park</Link> is ¥6,100 for adults with unlimited rides and <Link href="/guides/attractions/rindo-lake-family-ranch-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Rindo Lake Family Ranch</Link> ¥4,900 with its Enjoy Pass.
        </p>
      }
      faq={[
        {
          q: "How much is Edo Wonderland?",
          a: `¥5,800 for adults and ¥3,000 for children for one day; ¥5,000 and ¥2,600 after 14:00 (13:00 in winter). Preschool children are free. Edo Wonderland, checked ${CHECKED}.`,
        },
        {
          q: "What time does Edo Wonderland open?",
          a: "9:30–16:00 from 1 December to 19 March, and 9:00–17:00 from 20 March to 30 November. Closed days are on the official calendar.",
        },
        {
          q: "Is there a senior discount?",
          a: "Yes. Visitors aged 65 or over pay ¥4,700 for the day (¥4,000 in the afternoon) with proof of age.",
        },
        {
          q: "Who pays the child price?",
          a: "Elementary school pupils. Junior high school students and older pay the adult price; preschool children are free.",
        },
        {
          q: "Can I buy Edo Wonderland tickets on Klook?",
          a: "Yes. Klook sells the Edo Wonderland Nikko Edomura ticket; the park also sells its own official e-tickets.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip" },
        { href: "/guides/transport/nikko-pass", title: "NIKKO PASS 2026" },
        { href: "/guides/attractions/samurai-ninja-experience-tokyo", title: "Samurai & Ninja Experience Tokyo" },
        { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo" },
      ]}
      banner={{
        title: "A day in Edo-period Nikko",
        desc: "One-day admission to Edo Wonderland Nikko Edomura.",
        label: "View Edo Wonderland tickets →",
      }}
    />
  );
}
