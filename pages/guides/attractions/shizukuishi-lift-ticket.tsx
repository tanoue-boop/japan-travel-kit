import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { zaoGinzanDayTourFromSendai, zaoTwoDayTourFromTokyo } from "../../../lib/klook-links";
import { shizukuishiLiftTicket, appiKogenLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from Shizukuishi Ski Resort's own page, read by node fetch on 28 Nov 2026:
// princehotels.co.jp/ski/shizukuishi/winter/lift/ (ropeway and lift 1-day, 8:30 to 16:30 or sunset: adult (high
// school and older) 6,800 general / 6,300 member, senior 60+ and junior high 6,200 / 5,700; New Year 26 Dec-3 Jan
// 7,000 / 6,500 and 6,400 / 5,900; 4-hour from purchase 6,500 / 5,900, New Year 6,700 / 6,100; lift 1 ride 1,500,
// high-speed lift 1 ride 2,000; ropeway one way 2,000, return 3,000; children up to elementary school ride free with
// a free ticket from the counter; season pass valid 19 Dec 2026-22 Mar 2027). The page gives no opening date beyond
// the season pass dates. Klook's index lists activity 100688 as an early-bird 1-day lift ticket. No Klook price.
const ROUTE = "/guides/attractions/shizukuishi-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.princehotels.co.jp/ski/shizukuishi/winter/lift/";
const HOURS = "https://www.princehotels.co.jp/ski/shizukuishi/winter/lift/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShizukuishiLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Shizukuishi lift ticket"
      title="Shizukuishi Ski Resort Lift Ticket Prices 2026-27"
      description="Shizukuishi Ski Resort 2026-27: ¥6,800 a day for adults with the ropeway, ¥6,200 for juniors and over-60s, 4 hours ¥6,500, free up to elementary school."
      h1={<>Shizukuishi Ski Resort Lift Ticket <br />Prices 2026-27</>}
      subtitle="What a day below Mt. Iwate costs in 2026-27, with the New Year rates, the 4-hour ticket and the ropeway."
      badges={[`Checked ${CHECKED}`, "¥6,800 a day", "Kids ride free"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>one-day ropeway and lift ticket at Shizukuishi is ¥6,800 for adults</strong> (high school age and
            older) in 2026-27, and ¥7,000 over New Year (26 December to 3 January). Junior high school students and
            people aged 60 and over pay ¥6,200. A 4-hour ticket is ¥6,500, and children up to elementary school age ride
            free with a free ticket from the counter.
          </p>
          <p className={styles.bodyText}>
            The day ticket runs from 8:30 a.m. to 4:30 p.m. or sunset. SEIBU PRINCE CLUB members (free to join) pay ¥500
            less. Klook sells a Shizukuishi one-day lift ticket listed as an early-bird ticket, so check the dates it
            covers. Shizukuishi Ski Resort, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: shizukuishiLiftTicket.url, label: "Check the Shizukuishi lift ticket on Klook →" }}
      stats={[
        { label: "1 day, adult", value: "¥6,800" },
        { label: "1 day, New Year", value: "¥7,000" },
        { label: "4 hours", value: "¥6,500" },
        { label: "Children", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the 4-hour ticket saves only ¥300 on a full day, so buy the day ticket unless you
          are certain to stop by lunchtime.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Ropeway and lift prices for 2026-27. Adults are high school age and older; seniors are 60 and over (bring
              proof). Children up to elementary school age ride free; collect a free ticket at the counter.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Junior high / 60+", "Adult, member"],
            rows: [
              ["1 day", "¥6,800", "¥6,200", "¥6,300"],
              ["1 day, New Year (26 Dec–3 Jan)", "¥7,000", "¥6,400", "¥6,500"],
              ["4 hours", "¥6,500", "¥5,900", "—"],
              ["4 hours, New Year", "¥6,700", "¥6,100", "—"],
              ["Lift, 1 ride / high-speed lift", "¥1,500 / ¥2,000", "—", "—"],
              ["Ropeway one way / return", "¥2,000 / ¥3,000", "—", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                The official page does not give an opening date; the season pass is valid from 19 December 2026 to 22 March 2027.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Shizukuishi open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              The 2026-27 season pass is valid from 19 December 2026 to 22 March 2027; the official lift page does not list a
              separate opening date. Day tickets run from 8:30 a.m. to 4:30 p.m. or sunset, and the 4-hour ticket runs
              four hours from purchase.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: shizukuishiLiftTicket.url, label: "Book the Shizukuishi lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of winter in Tohoku",
        intro: "Shizukuishi is in Iwate; these are the other Tohoku winter days on Klook.",
        tours: [appiKogenLiftTicket, zaoGinzanDayTourFromSendai, zaoTwoDayTourFromTokyo],
      }}
      links={
        <p className={styles.bodyText}>
          For the rail pass that reaches Morioka, see the <Link href="/guides/transport/jr-east-pass" style={linkStyle}>JR East Pass</Link>. For other winter days in
          the north, see <Link href="/guides/attractions/zao-snow-monsters-tour" style={linkStyle}>Zao snow monster tours</Link>, the
          <Link href="/guides/attractions/japan-winter-itinerary" style={linkStyle}>Japan winter itinerary</Link> and the
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Shizukuishi lift ticket?",
          a: `A one-day ropeway and lift ticket is ¥6,800 for adults in 2026-27 and ¥7,000 over New Year. Junior high students and over-60s pay ¥6,200. Checked ${CHECKED}.`,
        },
        {
          q: "Do children pay at Shizukuishi?",
          a: "No. Children up to elementary school age ride the ropeway and lifts free; pick up a free ticket at the lift ticket counter.",
        },
        {
          q: "When does Shizukuishi open?",
          a: "The official lift page gives the season pass validity, 19 December 2026 to 22 March 2027, but no separate opening date.",
        },
        {
          q: "How long is a day ticket valid?",
          a: "From 8:30 a.m. to 4:30 p.m. or sunset. The 4-hour ticket runs for four hours from purchase.",
        },
        {
          q: "How much is the ropeway alone?",
          a: "The Shizukuishi Ropeway is ¥2,000 one way and ¥3,000 return.",
        },
      ]}
      related={[
        { href: "/guides/attractions/appi-kogen-lift-ticket", title: "APPI Kogen Lift Ticket Prices" },
        { href: "/guides/attractions/zao-snow-monsters-tour", title: "Zao Snow Monsters Tour" },
        { href: "/guides/transport/jr-east-pass", title: "JR East Pass" },
        { href: "/guides/attractions/japan-winter-itinerary", title: "Japan Winter Itinerary" },
      ]}
      banner={{
        title: "Ski below Mt. Iwate",
        desc: "A one-day Shizukuishi lift ticket.",
        label: "View the Shizukuishi lift ticket →",
      }}
    />
  );
}
