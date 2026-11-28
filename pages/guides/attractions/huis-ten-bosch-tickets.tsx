import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrKyushuRailPass, nagasakiSmallGroupDayTour } from "../../../lib/klook-links";
import { huisTenBoschTicket, gunkanjimaCruiseTour } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from Huis Ten
// Bosch's own English ticket page, read by node fetch on 28 Nov 2026:
// english.huistenbosch.co.jp/ticket/ (1 DAY Passport adult 7,600 / youth 6,600 /
// child 5,000 / preschool 3,800 / senior 5,900 yen "~"; After 3 Passport from 15:00
// 5,900 / 5,100 / 3,900 / 3,000 / 4,700; 1.5 DAY and 2 DAYs Passports on site only;
// prices change on specific days; age bands; web tickets enter by smartphone; the
// JR round-trip + passport "Enjoy! Huis Ten Bosch" ticket). Opening hours are set by
// month on english.huistenbosch.co.jp/opentime/, so no hours are printed. No Klook
// price is printed (Klook answers automated reads with 403).
const ROUTE = "/guides/attractions/huis-ten-bosch-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://english.huistenbosch.co.jp/ticket/";
const HOURS = "https://english.huistenbosch.co.jp/opentime/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HuisTenBoschTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Huis Ten Bosch Tickets"
      title="Huis Ten Bosch Tickets 2026: Price, Passports & Booking"
      description="Huis Ten Bosch 1 DAY Passport from ¥7,600 for adults, After 3 from ¥5,900, with higher prices on set days. Ticket types, age bands and how to book."
      h1={<>Huis Ten Bosch Tickets 2026: <br />Passport Prices &amp; How to Book</>}
      subtitle="The Dutch-town theme park in Sasebo, Nagasaki: which passport to buy, what each costs and where to get it."
      badges={[`Checked ${CHECKED}`, "1 DAY from ¥7,600", "Nagasaki"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Huis Ten Bosch <strong>1 DAY Passport costs from ¥7,600 for adults</strong> (18+), from ¥6,600 for
            youth (junior high and high school), from ¥5,000 for children (elementary school), from ¥3,800 for
            preschoolers aged 4+ and from ¥5,900 for seniors 65+. Children 3 and under are free. The{" "}
            <strong>After 3 Passport</strong> (from 15:00 to closing) starts at ¥5,900 for adults.
          </p>
          <p className={styles.bodyText}>
            The prices are &quot;from&quot; figures: the park raises them on specific days, such as fireworks
            nights. Opening hours are set month by month on the park&apos;s{" "}
            <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>business hours page</a>. Buy a web ticket
            and you enter with your smartphone; Klook sells the ticket too. Huis Ten Bosch ticket page, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: huisTenBoschTicket.url, label: "Check Huis Ten Bosch tickets on Klook →" }}
      stats={[
        { label: "1 DAY Passport (adult)", value: "from ¥7,600" },
        { label: "After 3 Passport (adult)", value: "from ¥5,900" },
        { label: "Children 3 and under", value: "Free" },
        { label: "Hours", value: "Set by month (official page)" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the 1 DAY Passport is the ticket for a full day; the After 3 Passport suits an
          arrival from Fukuoka in the afternoon and the evening lights. Check the date first, because the price
          changes on event days.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is a Huis Ten Bosch ticket?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Every figure on the official page is a starting price. Youth means junior high and high school
              students; child means elementary school; preschool means age 4 up to elementary school.
            </p>
          ),
          table: {
            head: ["Passport", "Adult", "Youth", "Child", "Preschool", "Senior"],
            rows: [
              ["1 DAY Passport", "¥7,600~", "¥6,600~", "¥5,000~", "¥3,800~", "¥5,900~"],
              ["After 3 Passport (15:00 to close)", "¥5,900~", "¥5,100~", "¥3,900~", "¥3,000~", "¥4,700~"],
              ["1.5 DAY Passport (on site only)", "¥11,200~", "¥10,000~", "¥7,700~", "¥6,100~", "¥9,200~"],
              ["2 DAYs Passport", "¥13,400~", "¥11,600~", "¥8,900~", "¥6,800~", "¥10,500~"],
            ],
            note: (
              <>
                Huis Ten Bosch ticket page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Prices change on specific days. Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Which ticket",
          title: "Which Huis Ten Bosch passport should I buy?",
          body: null,
          table: {
            head: ["If you…", "Buy"],
            rows: [
              ["Arrive in the morning and stay all day", "1 DAY Passport"],
              ["Arrive in the afternoon for the evening", "After 3 Passport (entry from 15:00)"],
              ["Stay overnight and arrive on the first afternoon", "1.5 DAY Passport (sold at the park only)"],
              ["Want two full days", "2 DAYs Passport"],
              ["Come by JR", "A round-trip JR ticket with a 1 DAY Passport voucher is also sold"],
            ],
            note: <>Huis Ten Bosch ticket page, checked {CHECKED}.</>,
          },
          ctas: [{ href: huisTenBoschTicket.url, label: "Book the 1 DAY Passport on Klook →" }],
        },
        {
          label: "Before you go",
          title: "What should I check before buying?",
          body: (
            <p className={styles.bodyText}>
              Check the date&apos;s price and hours on the official site. The park lists the price change on
              specific days (fireworks and countdown nights among them) and sets opening hours by month. Web
              tickets are scanned from your phone at the gate, so you do not queue at the ticket windows.
            </p>
          ),
        },
      ]}
      sameDay={{
        heading: "Same trip: Nagasaki",
        intro: "Huis Ten Bosch is in Sasebo, Nagasaki Prefecture. These are the other Nagasaki and Kyushu bookings for the same trip.",
        tours: [gunkanjimaCruiseTour, jrKyushuRailPass, nagasakiSmallGroupDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          Huis Ten Bosch fits a northern Kyushu trip from Fukuoka: see the{" "}
          <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5 day itinerary</Link>, the{" "}
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2 day itinerary</Link>{" "}
          and the{" "}
          <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass guide</Link>. In
          Nagasaki itself, the{" "}
          <Link href="/guides/attractions/gunkanjima-tour" style={linkStyle}>Gunkanjima (Battleship Island) tour</Link>{" "}
          is the other ticket to book ahead.
          {" "}In Nagasaki city, <Link href="/guides/attractions/glover-garden-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Glover Garden</Link> costs ¥1,300 for adults and ¥650 for school-age children.
        </p>
      }
      faq={[
        {
          q: "How much is a Huis Ten Bosch 1 DAY Passport?",
          a: `From ¥7,600 for adults, ¥6,600 for youth, ¥5,000 for children, ¥3,800 for preschoolers and ¥5,900 for seniors. Prices change on specific days. Huis Ten Bosch, checked ${CHECKED}.`,
        },
        {
          q: "Is there a cheaper afternoon ticket?",
          a: "Yes. The After 3 Passport is valid from 15:00 until closing, from ¥5,900 for adults.",
        },
        {
          q: "Do young children need a ticket?",
          a: "Children aged 3 and under are free. Preschoolers from age 4 pay the preschool price.",
        },
        {
          q: "What time does Huis Ten Bosch open?",
          a: "Hours are set month by month and change on event days; the park's business hours page has the calendar.",
        },
        {
          q: "Can I buy Huis Ten Bosch tickets on Klook?",
          a: "Yes, Klook sells Huis Ten Bosch tickets. The official web ticket is scanned from your smartphone at the gate.",
        },
      ]}
      related={[
        { href: "/guides/attractions/gunkanjima-tour", title: "Gunkanjima Tour" },
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5 Day Itinerary" },
        { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass" },
        { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2 Day Itinerary" },
      ]}
      banner={{
        title: "Huis Ten Bosch, one passport",
        desc: "Admission and the park's attractions for the day in Nagasaki.",
        label: "View Huis Ten Bosch tickets →",
      }}
    />
  );
}
