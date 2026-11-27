import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { takayamaShirakawagoOneDayBusTour, shirakawagoLineBusTicket } from "../../../lib/klook-links";
import { shinhotakaRopewayTicket, jrTakayamaHokurikuAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from Shin-Hotaka Ropeway's own page, read by node fetch on 28 Nov 2026:
// shinhotaka-ropeway.jp/price/ (open all year, may stop for bad weather or inspections; No. 1 ropeway departs at :00
// and :30, No. 2 at :15 and :45, extra cars when busy; fares adult / child (elementary): No. 1 + No. 2 (Shin-Hotaka
// Onsen to Nishi-Hotakaguchi) return 3,800 / 1,900, one way 2,400 / 1,200; No. 1 only return 700 / 350, one way
// 500 / 250; No. 2 only (Shirakabadaira to Nishi-Hotakaguchi) return 3,700 / 1,850, one way 2,300 / 1,150; luggage
// over 6 kg 1,000 return / 500 one way; skis and snowboards cannot be carried; up ticket valid on the day of issue,
// down within 3 days including that day; junior high and older pay adult; preschool children free with an adult).
// No Klook price (403).
const ROUTE = "/guides/attractions/shinhotaka-ropeway-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://shinhotaka-ropeway.jp/price/";
const HOURS = "https://shinhotaka-ropeway.jp/price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShinhotakaRopewayTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Shin-Hotaka Ropeway tickets"
      title="Shinhotaka Ropeway Tickets 2026: Price, Times & Winter"
      description="Shinhotaka Ropeway: ¥3,800 return for adults on both ropeways, ¥1,900 for children, ¥2,400 one way. Departure times, winter tips and how tickets work."
      h1={<>Shinhotaka Ropeway Tickets 2026: <br />Price, Times &amp; Winter</>}
      subtitle="What the two ropeways into the Northern Alps cost, how often they run, and what to know in winter."
      badges={[`Checked ${CHECKED}`, "¥3,800 return", "Open all year"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>return ticket on both Shin-Hotaka ropeways, from Shin-Hotaka Onsen to Nishi-Hotakaguchi, is ¥3,800
            for adults</strong> and ¥1,900 for elementary school children; one way is ¥2,400. Junior high school students
            and older pay the adult fare, and preschool children ride free with an adult.
          </p>
          <p className={styles.bodyText}>
            The ropeway runs all year: the No. 1 ropeway leaves at :00 and :30 past each hour and the No. 2 at :15 and
            :45. Skis and snowboards cannot be carried. Klook sells the return ticket on both ropeways. Shin-Hotaka
            Ropeway, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: shinhotakaRopewayTicket.url, label: "Check the Shinhotaka Ropeway ticket on Klook →" }}
      stats={[
        { label: "Return, adult", value: "¥3,800" },
        { label: "Return, child", value: "¥1,900" },
        { label: "One way, adult", value: "¥2,400" },
        { label: "Departures", value: "Every 30 min" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the return on both ropeways; the No. 2 ropeway alone is ¥3,700 return, so the
          short No. 1 section from the onsen adds only ¥100.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Regular fares. Children are elementary school age. The up ticket is valid on the day of issue, and the
              down ticket for three days including that day. Luggage over 6 kg needs a luggage ticket.
            </p>
          ),
          table: {
            head: ["Section", "Adult return", "Adult one way", "Child return"],
            rows: [
              ["No. 1 + No. 2 (Shin-Hotaka Onsen – Nishi-Hotakaguchi)", "¥3,800", "¥2,400", "¥1,900"],
              ["No. 2 only (Shirakabadaira – Nishi-Hotakaguchi)", "¥3,700", "¥2,300", "¥1,850"],
              ["No. 1 only (Shin-Hotaka Onsen – Nabedaira Kogen)", "¥700", "¥500", "¥350"],
              ["Luggage over 6 kg (both ropeways)", "¥1,000", "¥500", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells the return on both ropeways; boarding from the middle station is not allowed on that ticket.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When does it run?",
          body: (
            <p className={styles.bodyText}>
              Shin-Hotaka Ropeway runs all year. The No. 1 ropeway leaves Shin-Hotaka Onsen at :00 and :30 past the hour and the
              No. 2 ropeway leaves Shirakabadaira at :15 and :45, with extra cars when it is busy. It can stop for bad
              weather or scheduled inspections; first and last cars change with the season.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: shinhotakaRopewayTicket.url, label: "Book the Shinhotaka Ropeway on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Takayama and Shirakawa-go",
        intro: "Takayama is the usual base for the ropeway and for these.",
        tours: [takayamaShirakawagoOneDayBusTour, shirakawagoLineBusTicket, jrTakayamaHokurikuAreaPass],
      }}
      links={
        <p className={styles.bodyText}>
          For the base town and the villages nearby, see the <Link href="/guides/attractions/takayama-shirakawago-tour" style={linkStyle}>Takayama and Shirakawa-go tour</Link> and the
          <Link href="/guides/transport/shirakawa-go-bus" style={linkStyle}>Shirakawa-go bus</Link>. In winter, add the
          <Link href="/guides/attractions/shirakawago-winter-light-up" style={linkStyle}>Shirakawa-go winter light-up</Link>; for trains, see the
          <Link href="/guides/transport/takayama-hokuriku-area-pass" style={linkStyle}>Takayama-Hokuriku Area Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Shinhotaka Ropeway?",
          a: `A return on both ropeways is ¥3,800 for adults and ¥1,900 for elementary school children; one way is ¥2,400 for adults. Checked ${CHECKED}.`,
        },
        {
          q: "Is the Shinhotaka Ropeway open in winter?",
          a: "Yes. It runs all year, but it can stop for bad weather or scheduled inspections.",
        },
        {
          q: "How often does it run?",
          a: "The No. 1 ropeway leaves at :00 and :30 past each hour and the No. 2 at :15 and :45, with extra cars when busy.",
        },
        {
          q: "Can I take skis or a snowboard?",
          a: "No. Skis, snowboards and uncovered ice axes cannot be carried. Luggage over 6 kg needs a luggage ticket.",
        },
        {
          q: "How long is the ticket valid?",
          a: "The up ticket is valid on the day of issue; the down ticket is valid for three days including that day.",
        },
      ]}
      related={[
        { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama & Shirakawa-go Tour" },
        { href: "/guides/transport/shirakawa-go-bus", title: "Shirakawa-go Bus" },
        { href: "/guides/attractions/shirakawago-winter-light-up", title: "Shirakawa-go Winter Light-Up" },
        { href: "/guides/transport/takayama-hokuriku-area-pass", title: "Takayama-Hokuriku Area Pass" },
      ]}
      banner={{
        title: "Ride up into the Northern Alps",
        desc: "The return ticket on both Shin-Hotaka ropeways.",
        label: "View the ropeway ticket →",
      }}
    />
  );
}
