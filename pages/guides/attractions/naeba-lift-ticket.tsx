import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { galaYuzawaLiftTicket, yuzawaNakazatoLiftRental, echigoYuzawaStationSkiRental } from "../../../lib/klook-links";
import { naebaNaritaBusLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from Naeba Ski Resort's own page, read by node fetch on 28 Nov 2026:
// princehotels.co.jp/ski/naeba/winter/lift/ (season 18 Dec 2026-4 Apr 2027; window prices: Mt.Naeba 1-day adult
// 11,800, Naeba area 1-day 9,800, Naeba area 8-hour 8,300, 4-hour 6,300; children up to elementary school free
// with a ticket from the counter; Prince Gondola No. 1 / No. 2 sightseeing round trip 3,000, one way 2,000;
// Dragondola sightseeing round trip 4,000, Dragondola 26 Dec 2026-22 Mar 2027; SEIBU PRINCE CLUB members Mt.Naeba
// 10,800, Naeba area 9,000; Mt.Naeba ticket covers Naeba and Kagura (Kagura, Mitsumata, Tashiro); 8- and 4-hour
// tickets cannot ride the Dragondola or use Kagura; adults are junior high school and older; online sales to
// 23:00 the day before; no changes or refunds after purchase). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/naeba-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.princehotels.co.jp/ski/naeba/winter/lift/";
const HOURS = "https://www.princehotels.co.jp/ski/naeba/winter/lift/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NaebaLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Naeba lift ticket"
      title="Naeba Lift Ticket Prices 2026-27: Mt. Naeba & Kagura Pass"
      description="Naeba lift tickets 2026-27: ¥9,800 a day for adults, ¥11,800 for the Mt. Naeba pass with Kagura, free for children up to elementary school. Season dates."
      h1={<>Naeba Lift Ticket Prices 2026-27: <br />Mt. Naeba &amp; Kagura Pass</>}
      subtitle="What a day at Naeba costs in 2026-27, when the Mt. Naeba pass with Kagura is worth it, and the Dragondola dates."
      badges={[`Checked ${CHECKED}`, "¥9,800 a day", "Kids ride free"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>Naeba area one-day ticket is ¥9,800 for adults</strong> at the window in 2026-27. The
            <strong> Mt. Naeba one-day ticket, ¥11,800</strong>, adds Kagura (Kagura, Mitsumata and Tashiro) by the
            Dragondola. An 8-hour ticket is ¥8,300 and a 4-hour ticket ¥6,300. Children up to elementary school age
            ride free with a ticket from the counter.
          </p>
          <p className={styles.bodyText}>
            The season runs from 18 December 2026 to 4 April 2027. Tickets bought online cannot be changed or refunded.
            Klook sells a Naeba day ticket packaged with the direct bus from Narita Airport. Naeba Ski Resort, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: naebaNaritaBusLiftTicket.url, label: "Check the Naeba lift ticket on Klook →" }}
      stats={[
        { label: "Naeba area, 1 day", value: "¥9,800" },
        { label: "Mt. Naeba (with Kagura)", value: "¥11,800" },
        { label: "8 hours", value: "¥8,300" },
        { label: "Children", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the ¥11,800 Mt. Naeba ticket only on a day you will ride the Dragondola to
          Kagura; the 8- and 4-hour tickets do not cover the Dragondola or Kagura at all.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Window prices for 2026-27. Adults are junior high school age and older. Members of SEIBU PRINCE CLUB (free
              to join) pay ¥10,800 for Mt. Naeba and ¥9,000 for the Naeba area day ticket.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Child (to elementary)"],
            rows: [
              ["Naeba area 1 day", "¥9,800", "Free"],
              ["Mt. Naeba 1 day (Naeba + Kagura)", "¥11,800", "Free"],
              ["Naeba area 8 hours", "¥8,300", "Free"],
              ["Naeba area 4 hours", "¥6,300", "Free"],
              ["Dragondola round trip (sightseeing)", "¥4,000", "Free"],
              ["Prince Gondola round trip (sightseeing)", "¥3,000", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells the ticket with the Narita Airport bus as one package, at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Naeba open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              The 2026-27 season runs from 18 December 2026 to 4 April 2027. The Dragondola to Kagura runs from 26 December
              2026 to 22 March 2027. A one-day ticket is valid until the lifts close that day. Online tickets are sold
              until 11 p.m. the day before.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: naebaNaritaBusLiftTicket.url, label: "Book the Naeba lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: other Yuzawa-area ski days",
        intro: "Naeba is a bus ride from Echigo-Yuzawa Station, like these resorts.",
        tours: [galaYuzawaLiftTicket, yuzawaNakazatoLiftRental, echigoYuzawaStationSkiRental],
      }}
      links={
        <p className={styles.bodyText}>
          For a day trip by shinkansen, see <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={linkStyle}>GALA Yuzawa ski day trip from Tokyo</Link> and{" "}
          <Link href="/guides/attractions/tokyo-snow-day-trip" style={linkStyle}>snow day trips from Tokyo</Link>. For a longer trip, see the{" "}
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link> and{" "}
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Naeba lift ticket?",
          a: `A Naeba area one-day ticket is ¥9,800 for adults at the window in 2026-27, and the Mt. Naeba ticket with Kagura is ¥11,800. Children up to elementary school age ride free. Checked ${CHECKED}.`,
        },
        {
          q: "Does the Naeba ticket include Kagura?",
          a: "Only the Mt. Naeba one-day ticket (¥11,800) covers Kagura, Mitsumata and Tashiro. The Naeba area, 8-hour and 4-hour tickets do not.",
        },
        {
          q: "When does Naeba open for 2026-27?",
          a: "The season is scheduled from 18 December 2026 to 4 April 2027. The Dragondola runs from 26 December 2026 to 22 March 2027.",
        },
        {
          q: "Can I get a refund on an online ticket?",
          a: "No. Naeba says tickets cannot be changed, cancelled or refunded after purchase.",
        },
        {
          q: "How much is the Dragondola without skiing?",
          a: "A sightseeing round trip on the Dragondola is ¥4,000 for adults; children up to elementary school ride free.",
        },
      ]}
      related={[
        { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "GALA Yuzawa Ski Day Trip" },
        { href: "/guides/attractions/ishiuchi-maruyama-lift-ticket", title: "Ishiuchi Maruyama Lift Ticket" },
        { href: "/guides/attractions/kandatsu-lift-ticket", title: "Kandatsu Lift Ticket" },
        { href: "/guides/attractions/tokyo-snow-day-trip", title: "Snow Day Trips from Tokyo" },
      ]}
      banner={{
        title: "Ski Naeba straight from Narita",
        desc: "A Naeba lift ticket with the direct airport bus.",
        label: "View the Naeba package →",
      }}
    />
  );
}
