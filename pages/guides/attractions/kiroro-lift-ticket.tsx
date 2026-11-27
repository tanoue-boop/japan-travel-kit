import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kiroroLiftPassShuttleFromSapporo, nisekoHirafuLiftPassBusTour } from "../../../lib/klook-links";
import { teineBusLiftTicket, shiroiKoibitoParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Kiroro Snow World's own page, read by node fetch on 28 Nov 2026:
// kiroro.co.jp/lift_price/ (high season 12 Dec 2026-11 Apr 2027 / early and spring 28 Nov-11 Dec 2026 and
// 12 Apr-5 May 2027: 1-day adult 9,200 / 5,800, senior 65+ and youth 13-18 8,000 / 5,400, child 6-12 5,500 /
// 3,800; 4-hour adult 7,800 / 5,500; 2-day 18,400, 3-day 27,600, 5-day 46,000 adult at high season; night pass
// 3,000 adult, high season only; multi-day passes usable on non-consecutive days; 500 yen KIROCA deposit; children
// 5 and under ride free with a guardian but need a card; webstore saves up to 5%; tickets bought online from
// other websites, except partner companies, are not valid; opening 28 Nov 2026). The table heading on that page
// reads "2025-26" but every date in it is in the 2026-27 season. No Klook price (403).
const ROUTE = "/guides/attractions/kiroro-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kiroro.co.jp/lift_price/";
const HOURS = "https://www.kiroro.co.jp/lift_price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KiroroLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kiroro lift ticket"
      title="Kiroro Lift Ticket Prices 2026-27: Day Pass & Bus"
      description="Kiroro lift ticket 2026-27: ¥9,200 a day for adults from 12 December, ¥5,800 in the early season, ¥7,800 for 4 hours. Child rates and the bus from Sapporo."
      h1={<>Kiroro Lift Ticket Prices 2026-27: <br />Day Pass &amp; Bus</>}
      subtitle="What a day at Kiroro Snow World costs in each season of 2026-27, the multi-day and night passes, and the ski bus package from Sapporo."
      badges={[`Checked ${CHECKED}`, "¥9,200 a day", "Opens 28 Nov"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Kiroro <strong>one-day lift pass is ¥9,200 for adults in the high season</strong> (12 December 2026 to
            11 April 2027) and ¥5,800 in the early and spring seasons. Youth aged 13–18 and seniors over 65 pay ¥8,000
            at high season, and children aged 6–12 pay ¥5,500. A 4-hour pass is ¥7,800.
          </p>
          <p className={styles.bodyText}>
            Kiroro opens on 28 November 2026. Passes are loaded on a KIROCA card with a ¥500 deposit. Kiroro warns that
            passes bought online from websites other than its Webstore and partner companies are not valid. Klook sells
            a 6-hour pass with the round-trip shuttle from Sapporo as one package. Kiroro, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kiroroLiftPassShuttleFromSapporo.url, label: "Check the Kiroro pass and shuttle on Klook →" }}
      stats={[
        { label: "1 day, high season", value: "¥9,200" },
        { label: "1 day, early", value: "¥5,800" },
        { label: "4 hours", value: "¥7,800" },
        { label: "Child 6–12", value: "¥5,500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> if you are staying in Sapporo, the bus-and-pass package saves arranging the transfer;
          if you are staying at Kiroro, buy the pass from the Kiroro Webstore.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Multi-day passes can be used on days that are not consecutive. The night pass (¥3,000 for adults) is sold
              in the high season only. Children aged 5 and under ride free with a guardian but still need a card. The
              Webstore is up to 5% cheaper than these counter prices.
            </p>
          ),
          table: {
            head: ["Adult pass", "High season", "Early / Spring"],
            rows: [
              ["1 day", "¥9,200", "¥5,800"],
              ["4 hours", "¥7,800", "¥5,500"],
              ["2 days", "¥18,400", "¥11,600"],
              ["3 days", "¥27,600", "¥17,400"],
              ["5 days", "¥46,000", "¥29,000"],
              ["1 day, youth 13–18 / 65+", "¥8,000", "¥5,400"],
              ["1 day, child 6–12", "¥5,500", "¥3,800"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells a 6-hour pass with the Sapporo shuttle at its own price; that pass type is not on the counter price list.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the season?",
          body: (
            <p className={styles.bodyText}>
              Kiroro Snow World opens on 28 November 2026. The early season runs to 11 December, the high season from
              12 December 2026 to 11 April 2027, and the spring season from 12 April to 5 May 2027. The night pass is
              sold in the high season only. Kiroro is in Akaigawa, Yoichi District, west of Sapporo.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kiroroLiftPassShuttleFromSapporo.url, label: "Book the Kiroro package on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Sapporo, Otaru and other ski areas",
        intro: "Kiroro is a day out from Sapporo, like the other resorts on these buses.",
        tours: [nisekoHirafuLiftPassBusTour, teineBusLiftTicket, shiroiKoibitoParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the other resorts within reach of the city, see <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>ski day trips from Sapporo</Link>.
          For the rest of the trip, see the <Link href="/guides/attractions/otaru-day-trip-from-sapporo" style={linkStyle}>Otaru day trip from Sapporo</Link>,
          <Link href="/guides/attractions/hokkaido-winter-tours" style={linkStyle}>Hokkaido winter tours</Link> and the
          <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3-day itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Kiroro lift ticket?",
          a: `A one-day pass is ¥9,200 for adults from 12 Dec 2026 to 11 Apr 2027 and ¥5,800 in the early and spring seasons. Checked ${CHECKED}.`,
        },
        {
          q: "When does Kiroro open for 2026-27?",
          a: "Kiroro Snow World opens on 28 November 2026 and is scheduled to run to 5 May 2027.",
        },
        {
          q: "Can I buy a Kiroro pass on another website?",
          a: "Kiroro says passes bought online from websites other than its own Webstore and its partner companies are not valid. Klook sells a shuttle-and-pass package from Sapporo.",
        },
        {
          q: "Is there a deposit?",
          a: "Yes. Passes are loaded on a KIROCA card with a refundable ¥500 deposit.",
        },
        {
          q: "Do children ski free?",
          a: "Children aged 5 and under ride free with a guardian but need a card. Ages 6–12 pay ¥5,500 a day in the high season.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sapporo-ski-day-trip", title: "Ski Day Trips from Sapporo" },
        { href: "/guides/attractions/sapporo-teine-lift-ticket", title: "Sapporo Teine Lift Ticket Prices" },
        { href: "/guides/attractions/niseko-lift-ticket", title: "Niseko Lift Ticket Prices" },
        { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo" },
      ]}
      banner={{
        title: "Kiroro from Sapporo in one booking",
        desc: "A 6-hour pass with the round-trip shuttle.",
        label: "View the Kiroro package →",
      }}
    />
  );
}
