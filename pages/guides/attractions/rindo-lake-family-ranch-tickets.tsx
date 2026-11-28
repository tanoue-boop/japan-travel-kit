import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { rindoLakeFamilyRanchTicket, nasuHighlandParkTicket, nasuSafariParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the ranch's own pages, read by node fetch on 28 Nov 2026:
// rindo.co.jp/charge (Enjoy Pass set (entry + unlimited rides) adult (junior high+) 4,900, elementary 4,100, 3 to
// preschool 3,800 (with 1,000 rindoru play money), senior 65+ 4,400; entry only 1,600 / 800 / 800 / 1,100; Enjoy Pass
// only 3,300 / 3,300 / 3,000 / 3,300; twilight from 2 hours before closing: entry 800 / 400 / 400 / 800, pass
// 1,650 / 1,650 / 1,100 / 1,650, entry until 1 hour before closing; dogs free; parking 1,000 a car, free on weekdays
// outside peak periods) and rindo.co.jp/calendar (Nov 2026 9:30-16:30 or 17:00; Dec 2026 10:00-16:00, last entry
// 15:00, closed 1-3, 8-10, 15-17, 22-24 Dec; open daily 25 Dec - 3 Jan). No Klook price (Klook answers 403).
const ROUTE = "/guides/attractions/rindo-lake-family-ranch-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.rindo.co.jp/charge";
const HOURS = "https://www.rindo.co.jp/calendar";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function RindoLakeFamilyRanchTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Rindo Lake Family Ranch tickets"
      title="Rindo Lake Family Ranch Tickets 2026: Price, Hours & Pass"
      description="Rindo Lake Family Ranch 2026: entry ¥1,600 for adults, ¥4,900 with the Enjoy Pass for unlimited rides, ¥800 in the last two hours. Winter opening days."
      h1={<>Rindo Lake Family Ranch Tickets 2026: <br />Price, Hours &amp; Pass</>}
      subtitle="What the lakeside ranch and ride park in Nasu Kogen costs, the twilight rate, and the days it opens in December."
      badges={[`Checked ${CHECKED}`, "Entry ¥1,600", "Dogs free"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to Nasu Kogen Rindo Lake Family Ranch is ¥1,600 for adults</strong> (junior high school and older)
            and ¥800 for children from 3. With the <strong>Enjoy Pass for unlimited rides, the set is ¥4,900</strong> for
            adults, ¥4,100 for elementary school children and ¥3,800 for ages 3 to preschool. In the last two hours, entry
            is ¥800 for adults.
          </p>
          <p className={styles.bodyText}>
            In December 2026 it opens 10 a.m. to 4 p.m. (last entry 3 p.m.) and is closed on Tuesdays to Thursdays until 24
            December, then open daily from 25 December. Dogs enter free. Klook sells a one-day admission. Rindo Lake Family
            Ranch, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: rindoLakeFamilyRanchTicket.url, label: "Check the Rindo Lake Family Ranch ticket on Klook →" }}
      stats={[
        { label: "Entry, adult", value: "¥1,600" },
        { label: "Entry + Enjoy Pass", value: "¥4,900" },
        { label: "Entry, last 2 hours", value: "¥800" },
        { label: "Dogs", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> with children who ride, the Enjoy Pass set is the ticket; for the farm animals and
          the lake alone, entry is enough.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The Enjoy Pass is a wristband for the person wearing it; a few attractions are free only the first time. Over-65s
              pay ¥1,100 entry or ¥4,400 with the pass. Parking is ¥1,000 a car, and free on most weekdays.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (junior high+)", "Elementary", "Age 3 to preschool"],
            rows: [
              ["Entry + Enjoy Pass", "¥4,900", "¥4,100", "¥3,800"],
              ["Entry only", "¥1,600", "¥800", "¥800"],
              ["Enjoy Pass only", "¥3,300", "¥3,300", "¥3,000"],
              ["Entry, last 2 hours", "¥800", "¥400", "¥400"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                The age 3 to preschool set includes 1,000 rindoru play money. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the ranch open in winter?",
          body: (
            <p className={styles.bodyText}>
              In December 2026 the ranch opens from 10 a.m. to 4 p.m., with last entry at 3 p.m. It is closed on 1–3, 8–10, 15–17
              and 22–24 December, and open every day from 25 December into the New Year. In November it opened 9:30 a.m. to 4:30
              p.m. on most days.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: rindoLakeFamilyRanchTicket.url, label: "Book Rindo Lake Family Ranch on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Nasu",
        intro: "The Nasu plateau parks are a short drive apart, so the ranch pairs with these.",
        tours: [nasuHighlandParkTicket, nasuSafariParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For another day in Nasu, see <Link href="/guides/attractions/nasu-highland-park-tickets" style={linkStyle}>Nasu Highland Park</Link> and
          <Link href="/guides/attractions/nasu-safari-park-tickets" style={linkStyle}>Nasu Safari Park</Link>. Towards Nikko are
          <Link href="/guides/attractions/edo-wonderland-tickets" style={linkStyle}>Edo Wonderland</Link> and the <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko day trip</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Rindo Lake Family Ranch?",
          a: `Entry is ¥1,600 for adults and ¥800 for children from 3. Entry with the unlimited-ride Enjoy Pass is ¥4,900 for adults, ¥4,100 for elementary school children and ¥3,800 for ages 3 to preschool. Checked ${CHECKED}.`,
        },
        {
          q: "Is there a cheaper late ticket?",
          a: "Yes. From two hours before closing, entry is ¥800 for adults and ¥400 for children, and the Enjoy Pass ¥1,650. Entry closes one hour before closing.",
        },
        {
          q: "Is it open in December?",
          a: "Yes, 10:00 to 16:00 with last entry at 15:00, but closed on 1–3, 8–10, 15–17 and 22–24 December 2026. It opens every day from 25 December.",
        },
        {
          q: "Can I bring my dog?",
          a: "Yes. Dogs enter free on a lead and collar; a dog ride pass is ¥1,000.",
        },
        {
          q: "How much is parking?",
          a: "¥1,000 a car, free on weekdays outside the spring and summer holiday periods.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nasu-highland-park-tickets", title: "Nasu Highland Park Tickets" },
        { href: "/guides/attractions/nasu-safari-park-tickets", title: "Nasu Safari Park Tickets" },
        { href: "/guides/attractions/edo-wonderland-tickets", title: "Edo Wonderland Tickets" },
        { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip" },
      ]}
      banner={{
        title: "A lake, a farm and rides in Nasu",
        desc: "A one-day admission to Rindo Lake Family Ranch.",
        label: "View the Rindo Lake ticket →",
      }}
    />
  );
}
