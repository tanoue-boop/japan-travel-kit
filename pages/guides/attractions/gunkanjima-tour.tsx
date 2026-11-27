import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrKyushuRailPass, nagasakiInasayamaDayTour } from "../../../lib/klook-links";
import { gunkanjimaCruiseTour, huisTenBoschTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from the operator
// Gunkanjima Concierge's own site, read by node fetch on 28 Nov 2026:
// gunkanjima-concierge.com (Standard weekday adult 5,500 / junior+senior high 4,500 /
// elementary 3,000 / preschool 2,000 yen; weekends, holidays and school holidays
// 6,000 / 5,000 / 3,500 / 2,500; Premium from 9,000 / 8,000 / 6,000; Super Premium
// from 11,000 / 10,000 / 8,000; all plans include the Gunkanjima Digital Museum; the
// island's own landing fee is charged separately; under-3s cannot board; check-in at
// the Digital Museum 9:00-10:10 / 12:00-13:20, sailing from Tokiwa pier about 10:30 /
// 13:40, landing 11:35-12:20 / 14:40-15:25, back about 13:05 / 16:10; free museum
// re-entry after the tour). The Klook listing 127726 checks in at the same museum
// with the same sailing times in the search index. No Klook price is printed.
const ROUTE = "/guides/attractions/gunkanjima-tour";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.gunkanjima-concierge.com/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function GunkanjimaTourPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Gunkanjima Tour"
      title="Gunkanjima Tour 2026: Battleship Island Price & Times"
      description="Battleship Island landing cruise from Nagasaki: ¥5,500 on weekdays, ¥6,000 on weekends, sailing 10:30 and 13:40 from Tokiwa pier. Plans and booking."
      h1={<>Gunkanjima Tour 2026: <br />Battleship Island Price, Times &amp; Booking</>}
      subtitle="The landing cruise to Hashima (Battleship Island) from Nagasaki: what each plan costs, when the boats sail and how to book."
      badges={[`Checked ${CHECKED}`, "From ¥5,500", "2 sailings a day"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Gunkanjima Concierge&apos;s <strong>Standard landing tour costs ¥5,500 for adults on weekdays</strong>{" "}
            (junior and senior high ¥4,500, elementary ¥3,000, preschool ¥2,000) and{" "}
            <strong>¥6,000 on weekends, holidays and school holidays</strong>. Every plan includes the Gunkanjima
            Digital Museum; the island&apos;s own landing fee is charged separately. Children under 3 cannot board.
          </p>
          <p className={styles.bodyText}>
            There are <strong>two sailings a day from Tokiwa pier, about 10:30 and 13:40</strong>. You check in at
            the Digital Museum first (9:00–10:10 or 12:00–13:20), land on the island for about 45 minutes and are
            back about 13:05 or 16:10. Tours are booked online in advance; Klook sells the cruise as well. Operator
            site, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: gunkanjimaCruiseTour.url, label: "Check the Battleship Island cruise on Klook →" }}
      stats={[
        { label: "Standard, weekday (adult)", value: "¥5,500" },
        { label: "Standard, weekend/holiday", value: "¥6,000" },
        { label: "Sailings", value: "about 10:30 and 13:40" },
        { label: "Landing fee", value: "Separate" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> book a sailing, not just a day — there are only two, and you must check in at
          the museum before you walk to the pier. Landings depend on the sea, so keep a spare day if the island
          matters to you.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Gunkanjima tour?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The three plans differ in where you sit on the boat; all of them include the museum and the landing.
            </p>
          ),
          table: {
            head: ["Plan", "Seat", "Adult", "Junior/senior high", "Elementary"],
            rows: [
              ["Standard (weekday)", "1st floor, unreserved", "¥5,500", "¥4,500", "¥3,000"],
              ["Standard (weekend, holiday, school holiday)", "1st floor, unreserved", "¥6,000", "¥5,000", "¥3,500"],
              ["Premium", "2nd floor, reserved centre", "from ¥9,000", "from ¥8,000", "from ¥6,000"],
              ["Super Premium", "2nd floor, reserved window", "from ¥11,000", "from ¥10,000", "from ¥8,000"],
            ],
            note: (
              <>
                Gunkanjima Concierge, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source (Japanese)</a>.
                Prices include tax; the island&apos;s landing fee is extra. Klook sells the tour at its own price.
              </>
            ),
          },
        },
        {
          label: "Times",
          title: "What time does the Battleship Island tour leave?",
          body: null,
          table: {
            head: ["Step", "Morning", "Afternoon"],
            rows: [
              ["Check in at the Gunkanjima Digital Museum", "9:00–10:10", "12:00–13:20"],
              ["Sail from Tokiwa pier", "about 10:30", "about 13:40"],
              ["On the island", "11:35–12:20", "14:40–15:25"],
              ["Back at Tokiwa", "about 13:05", "about 16:10"],
            ],
            note: <>Gunkanjima Concierge, checked {CHECKED}. Times are a guide and change with the day&apos;s sailing conditions.</>,
          },
          ctas: [{ href: gunkanjimaCruiseTour.url, label: "Book the Gunkanjima cruise on Klook →" }],
        },
        {
          label: "If you can't land",
          title: "What if the boat cannot land?",
          body: (
            <p className={styles.bodyText}>
              Landing depends on the sea. The operator gives an earlier return when the boat cannot land (about
              12:15 for the morning sailing, 15:20 for the afternoon). Before landing, the boat circles the island
              so you can photograph the west side. After the tour you can go back into the Digital Museum free (last entry 16:30).
            </p>
          ),
        },
      ]}
      sameDay={{
        heading: "Same trip: Nagasaki",
        intro: "The tour takes half a day. These are the other Nagasaki bookings for the trip.",
        tours: [huisTenBoschTicket, nagasakiInasayamaDayTour, jrKyushuRailPass],
      }}
      links={
        <p className={styles.bodyText}>
          Nagasaki is usually a day or two of a Kyushu trip: see the{" "}
          <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5 day itinerary</Link>, the{" "}
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2 day itinerary</Link>{" "}
          and the{" "}
          <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass guide</Link>. The
          other big Nagasaki ticket is{" "}
          <Link href="/guides/attractions/huis-ten-bosch-tickets" style={linkStyle}>Huis Ten Bosch</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Gunkanjima tour?",
          a: `Gunkanjima Concierge's Standard plan is ¥5,500 for adults on weekdays and ¥6,000 on weekends, holidays and school holidays; Premium seats from ¥9,000 and Super Premium from ¥11,000. The island's landing fee is extra. Checked ${CHECKED}.`,
        },
        {
          q: "What time does the Battleship Island boat leave?",
          a: "About 10:30 and 13:40 from Tokiwa pier in Nagasaki, after check-in at the Gunkanjima Digital Museum.",
        },
        {
          q: "How long is the Gunkanjima tour?",
          a: "About three to four hours from check-in to return, with roughly 45 minutes on the island when the boat can land.",
        },
        {
          q: "Can small children join?",
          a: "Children under 3 cannot board on any plan, for safety reasons. Preschoolers from 3 pay the preschool fare.",
        },
        {
          q: "Is the Gunkanjima tour on Klook?",
          a: "Yes. Klook sells a Battleship Island cruise from Nagasaki that checks in at the Gunkanjima Digital Museum.",
        },
      ]}
      related={[
        { href: "/guides/attractions/huis-ten-bosch-tickets", title: "Huis Ten Bosch Tickets" },
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5 Day Itinerary" },
        { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass" },
        { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2 Day Itinerary" },
      ]}
      banner={{
        title: "Land on Battleship Island",
        desc: "The landing cruise from Nagasaki with the Digital Museum.",
        label: "View the Gunkanjima cruise →",
      }}
    />
  );
}
