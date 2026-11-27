import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { legolandJapanTicket, nagoyaCastleAfterHoursTour } from "../../../lib/klook-links";
import { portOfNagoyaAquariumTicket, scmaglevRailwayParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from the aquarium's own
// Japanese pages, read by node fetch on 28 Nov 2026: nagoyaaqua.jp/fee/ (aquarium ticket
// adult and high school 2,030 yen, elementary and junior high 1,010, child 4+ 500; same-day
// re-entry allowed; 4-facility ticket (aquarium, icebreaker Fuji, Port Building observation
// room, Nagoya Maritime Museum) 2,440 / 1,210 / 500 (aquarium fee for small children), sold
// at the aquarium counter until 14:00; Nagoya city one-day / 24-hour subway / Donichi Eco
// ticket holders pay 1,830 / 810 / 400; annual passport 5,190 / 2,540 / 1,220; advance tickets
// at Ticket Pia and convenience stores) and the home page (entry until one hour before
// closing; Port Building, icebreaker Fuji and Port House closed 1 Aug - 30 Nov 2026,
// reopening 1 Dec). The aquarium's own daily hours are not printed (the page shows them by
// date only). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/port-of-nagoya-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://nagoyaaqua.jp/fee/";
const HOURS = "https://nagoyaaqua.jp/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function PortOfNagoyaAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Port of Nagoya Aquarium Tickets"
      title="Port of Nagoya Public Aquarium Tickets 2026: Price"
      description="Port of Nagoya Public Aquarium is ¥2,030 for adults and high school, ¥1,010 for younger pupils, with same-day re-entry. Combo ticket, discounts, booking."
      h1={<>Port of Nagoya Public Aquarium Tickets 2026: <br />Price, Discounts &amp; How to Book</>}
      subtitle="The aquarium at Nagoya Port's Garden Pier: prices by age, the 4-facility combo ticket and the subway-pass discount."
      badges={[`Checked ${CHECKED}`, "¥2,030 adult", "Nagoya"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Port of Nagoya Public Aquarium ticket is <strong>¥2,030 for adults and high school students</strong>,
            ¥1,010 for elementary and junior high school pupils and ¥500 for children aged 4 and up. You can go out
            and come back in on the same day.
          </p>
          <p className={styles.bodyText}>
            Entry ends one hour before closing; the hours for each day are on the{" "}
            <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>official site</a>. Showing a Nagoya city
            subway one-day or 24-hour ticket for that date brings the adult price down to ¥1,830. Klook sells the
            ticket. Port of Nagoya Public Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: portOfNagoyaAquariumTicket.url, label: "Check Port of Nagoya Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult / high school", value: "¥2,030" },
        { label: "Elementary / junior high", value: "¥1,010" },
        { label: "4-facility combo (adult)", value: "¥2,440" },
        { label: "Re-entry", value: "Same day" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the 4-facility ticket adds the icebreaker Fuji, the Port Building observation
          room and the maritime museum for ¥410 more — those three reopen on 1 December 2026.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Port of Nagoya Public Aquarium?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The 4-facility ticket is sold at the aquarium counter until 14:00, and unused facilities can be visited
              on another day. Discounts do not combine.
            </p>
          ),
          table: {
            head: ["Ticket", "Aquarium only", "4-facility ticket", "With subway day ticket"],
            rows: [
              ["Adult and high school", "¥2,030", "¥2,440", "¥1,830"],
              ["Elementary and junior high", "¥1,010", "¥1,210", "¥810"],
              ["Child (age 4 and up)", "¥500", "¥500", "¥400"],
            ],
            note: (
              <>
                Port of Nagoya Public Aquarium prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Annual pass",
          title: "Is there an annual pass?",
          body: (
            <p className={styles.bodyText}>
              Yes: ¥5,190 for adults and high school students, ¥2,540 for elementary and junior high pupils and
              ¥1,220 for children aged 4 and up, with lower family rates. Advance tickets are also sold through
              Ticket Pia and convenience stores in Japan.
            </p>
          ),
          ctas: [{ href: portOfNagoyaAquariumTicket.url, label: "Book the Port of Nagoya Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day in Nagoya",
        intro: "The Aonami Line from Nagoya Station runs to Kinjofuto for the railway park and LEGOLAND.",
        tours: [scmaglevRailwayParkTicket, legolandJapanTicket, nagoyaCastleAfterHoursTour],
      }}
      links={
        <p className={styles.bodyText}>
          For a full day, see the{" "}
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2-day itinerary</Link>. At
          Kinjofuto,{" "}
          <Link href="/guides/attractions/scmaglev-railway-park-tickets" style={linkStyle}>SCMAGLEV and Railway Park</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>LEGOLAND Japan</Link> make a second
          stop, and the{" "}
          <Link href="/guides/attractions/nagoya-castle-tickets" style={linkStyle}>Nagoya Castle tickets</Link> guide
          covers the city centre.
        </p>
      }
      faq={[
        {
          q: "How much is the Port of Nagoya Public Aquarium?",
          a: `¥2,030 for adults and high school students, ¥1,010 for elementary and junior high pupils and ¥500 for children aged 4 and up. Checked ${CHECKED}.`,
        },
        {
          q: "Can I re-enter the aquarium?",
          a: "Yes, as many times as you like on the same day.",
        },
        {
          q: "What does the 4-facility ticket include?",
          a: "The aquarium, the icebreaker Fuji, the Port Building observation room and the Nagoya Maritime Museum: ¥2,440 for adults. The last three are closed until 30 November 2026.",
        },
        {
          q: "Is there a discount with a subway pass?",
          a: "Yes. With a Nagoya city one-day, 24-hour subway or Donichi Eco ticket dated that day, adults pay ¥1,830.",
        },
        {
          q: "Can I buy tickets on Klook?",
          a: "Yes. Klook sells a Port of Nagoya Public Aquarium admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2-Day Itinerary" },
        { href: "/guides/attractions/scmaglev-railway-park-tickets", title: "SCMAGLEV and Railway Park Tickets" },
        { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets" },
        { href: "/guides/attractions/nagoya-castle-tickets", title: "Nagoya Castle Tickets" },
      ]}
      banner={{
        title: "Orcas and belugas at Nagoya Port",
        desc: "Admission to the Port of Nagoya Public Aquarium.",
        label: "View Port of Nagoya Aquarium tickets →",
      }}
    />
  );
}
