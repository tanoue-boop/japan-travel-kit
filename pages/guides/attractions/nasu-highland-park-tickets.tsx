import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nasuHighlandParkTicket, nasuSafariParkTicket, rindoLakeFamilyRanchTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the park's own pages, read by node fetch on 28 Nov 2026:
// nasuhai.co.jp/charge (admission only adult (junior high+) 1,600, child (3 to elementary) 800, senior 65+ 800;
// Fantasy Pass set (entry + 1-day unlimited rides) 6,100 / 4,400 / 4,400; Fantasy Pass only 4,500 / 3,600 / 3,600;
// twilight from 14:00: set 3,850 / 2,600 / 2,600, pass only 2,250 / 1,800 / 1,800, admission unchanged; parking
// 1,000 a car (1,500 at Golden Week and Obon); dogs 500 entry) and nasuhai.co.jp/info (Nov 2026 mostly 9:30-16:30;
// Dec 2026 10:00-16:00 on Fri-Sun and daily 24 Dec - 11 Jan, closed 1-3, 7-10, 14-17, 21-23 Dec; from 12 Jan 2027
// closed on weekdays, weekends 10:00-15:00 with only some rides; 22-23 Feb open; 27-28 Feb 10:00-16:00).
// No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/nasu-highland-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.nasuhai.co.jp/charge";
const HOURS = "https://www.nasuhai.co.jp/info";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NasuHighlandParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nasu Highland Park tickets"
      title="Nasu Highland Park Tickets 2026: Price, Hours & Winter Days"
      description="Nasu Highland Park 2026: entry ¥1,600 for adults, ¥6,100 with the Fantasy Pass for unlimited rides, ¥3,850 after 2 p.m. Winter opening days and hours."
      h1={<>Nasu Highland Park Tickets 2026: <br />Price, Hours &amp; Winter Days</>}
      subtitle="What entry and the unlimited-ride Fantasy Pass cost at the Nasu amusement park, the 2 p.m. twilight rate, and the winter days it opens."
      badges={[`Checked ${CHECKED}`, "Entry ¥1,600", "Ride pass set ¥6,100"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to Nasu Highland Park is ¥1,600 for adults</strong> (junior high school and older) and ¥800 for
            children from 3 and over-65s. With the <strong>Fantasy Pass for unlimited rides, the set is ¥6,100</strong>
            for adults and ¥4,400 for children. Arriving from 2 p.m., the set drops to ¥3,850 and ¥2,600.
          </p>
          <p className={styles.bodyText}>
            In winter the park opens on fewer days: in December 2026 on Fridays to Sundays and every day from 24 December to
            11 January, 10 a.m. to 4 p.m.; from 12 January it opens only on weekends. Klook sells an admission ticket. Nasu
            Highland Park, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nasuHighlandParkTicket.url, label: "Check the Nasu Highland Park ticket on Klook →" }}
      stats={[
        { label: "Entry, adult", value: "¥1,600" },
        { label: "Entry + Fantasy Pass", value: "¥6,100" },
        { label: "Set after 2 p.m.", value: "¥3,850" },
        { label: "Parking", value: "¥1,000" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> if you will ride more than a few attractions, take the Fantasy Pass set; on a short
          afternoon visit the twilight set from 2 p.m. saves ¥2,250 per adult.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The Fantasy Pass can also be bought on its own (¥4,500 for adults) after entering. Twilight prices apply from 2
              p.m., when tickets for them go on sale; entry-only prices do not change. Parking is ¥1,000 a car.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (junior high+)", "Child (3 to elementary)", "Senior (65+)"],
            rows: [
              ["Entry only", "¥1,600", "¥800", "¥800"],
              ["Entry + Fantasy Pass", "¥6,100", "¥4,400", "¥4,400"],
              ["Fantasy Pass only", "¥4,500", "¥3,600", "¥3,600"],
              ["Entry + Fantasy Pass from 2 p.m.", "¥3,850", "¥2,600", "¥2,600"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Senior prices need proof of age. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Nasu Highland Park open in winter?",
          body: (
            <p className={styles.bodyText}>
              In December 2026 the park opens 10 a.m. to 4 p.m. on Fridays, Saturdays and Sundays, and every day from 24 December
              to 11 January; it is closed on 1–3, 7–10, 14–17 and 21–23 December. From 12 January 2027 it is closed on
              weekdays (except 22 and 23 February) and opens on weekends from 10 a.m. to 3 p.m. with only some rides running.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: nasuHighlandParkTicket.url, label: "Book Nasu Highland Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Nasu",
        intro: "The Nasu plateau has several parks a short drive apart, so this one pairs with these.",
        tours: [nasuSafariParkTicket, rindoLakeFamilyRanchTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For another day in Nasu, see <Link href="/guides/attractions/nasu-safari-park-tickets" style={linkStyle}>Nasu Safari Park</Link> and
          <Link href="/guides/attractions/rindo-lake-family-ranch-tickets" style={linkStyle}>Rindo Lake Family Ranch</Link>. Nearer Nikko are
          <Link href="/guides/attractions/edo-wonderland-tickets" style={linkStyle}>Edo Wonderland</Link> and <Link href="/guides/attractions/tobu-world-square-tickets" style={linkStyle}>Tobu World Square</Link>;
          see also the <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko day trip</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Nasu Highland Park?",
          a: `Entry is ¥1,600 for adults and ¥800 for children (3 to elementary school) and over-65s. Entry with the unlimited-ride Fantasy Pass is ¥6,100 for adults and ¥4,400 for children. Checked ${CHECKED}.`,
        },
        {
          q: "Is there a cheaper afternoon ticket?",
          a: "Yes. From 14:00 the entry and Fantasy Pass set is ¥3,850 for adults and ¥2,600 for children and seniors.",
        },
        {
          q: "Is it open in winter?",
          a: "On fewer days. In December 2026 it opens Friday to Sunday, and daily from 24 December to 11 January, 10:00–16:00. From 12 January 2027 it opens on weekends only, 10:00–15:00, with some rides.",
        },
        {
          q: "How much is parking?",
          a: "¥1,000 a car, rising to ¥1,500 at Golden Week and Obon.",
        },
        {
          q: "Can I bring my dog?",
          a: "Yes. Dogs pay ¥500 entry after registering a consent form; a dog ride pass is extra.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nasu-safari-park-tickets", title: "Nasu Safari Park Tickets" },
        { href: "/guides/attractions/rindo-lake-family-ranch-tickets", title: "Rindo Lake Family Ranch Tickets" },
        { href: "/guides/attractions/edo-wonderland-tickets", title: "Edo Wonderland Tickets" },
        { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip" },
      ]}
      banner={{
        title: "Rides on the Nasu plateau",
        desc: "Admission to Nasu Highland Park.",
        label: "View the Nasu Highland Park ticket →",
      }}
    />
  );
}
