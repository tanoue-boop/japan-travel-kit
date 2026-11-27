import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jigokudaniZenkojiSukiyakiTour, naganoSnowMonkeyDayTourTokyo } from "../../../lib/klook-links";
import { suginoharaLiftTicket, nozawaOnsenLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from Myoko Suginohara Ski Resort's own page, read by node fetch on 28 Nov 2026:
// princehotels.co.jp/ski/myoko/winter/lift/ (on-season 19 Dec 2026-28 Mar 2027, 8:30-16:00; lift and gondola:
// 1-day adult 9,000 general / 8,200 member, senior 55+ and junior-senior high school 8,400 / 7,800; 4-hour from
// 10:00 8,000 / 7,500; 2-day 17,000 / 15,800; points valid all season: lift 1,100 (1 point), high-speed lift 2,200
// (2), gondola up 3,300 (3), 1,000 / 2,000 / 3,000 for seniors and teens; children up to elementary school free).
// No Klook price (403).
const ROUTE = "/guides/attractions/myoko-suginohara-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.princehotels.co.jp/ski/myoko/winter/lift/";
const HOURS = "https://www.princehotels.co.jp/ski/myoko/winter/lift/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MyokoSuginoharaLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Myoko Suginohara lift ticket"
      title="Myoko Suginohara Lift Ticket Prices 2026-27"
      description="Myoko Suginohara 2026-27: ¥9,000 a day for adults, ¥8,400 for teens and over-55s, ¥17,000 for 2 days, free up to elementary school. Season dates and hours."
      h1={<>Myoko Suginohara Lift Ticket <br />Prices 2026-27</>}
      subtitle="What a day on the long runs of Myoko Suginohara costs in 2026-27, with the multi-day, half-day and point tickets."
      badges={[`Checked ${CHECKED}`, "¥9,000 a day", "Kids ride free"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>one-day lift and gondola ticket at Myoko Suginohara is ¥9,000 for adults</strong> in the 2026-27
            season (19 December 2026 to 28 March 2027). Junior and senior high school students and people aged 55 and
            over pay ¥8,400. A 4-hour ticket from 10 a.m. is ¥8,000 and a 2-day ticket ¥17,000. Children up to
            elementary school age ride free.
          </p>
          <p className={styles.bodyText}>
            Lifts run 8:30 a.m. to 4:00 p.m. SEIBU PRINCE CLUB members (free to join) pay ¥8,200 a day. Klook sells a
            Suginohara lift ticket that the staff scan on the day. Myoko Suginohara, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: suginoharaLiftTicket.url, label: "Check the Myoko Suginohara lift ticket on Klook →" }}
      stats={[
        { label: "1 day, adult", value: "¥9,000" },
        { label: "1 day, teen / 55+", value: "¥8,400" },
        { label: "2 days", value: "¥17,000" },
        { label: "Children", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the 4-hour ticket is only ¥1,000 less than a full day, so it pays only if you
          arrive after lunch; a full day is the better buy for most skiers.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Lift and gondola tickets for the 2026-27 on-season. Seniors are 55 and over (bring proof of age). Point
              tickets stay valid all season.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Teen / 55+", "Adult, member"],
            rows: [
              ["1 day", "¥9,000", "¥8,400", "¥8,200"],
              ["4 hours (from 10:00)", "¥8,000", "¥7,500", "—"],
              ["2 days", "¥17,000", "¥15,800", "—"],
              ["Lift, 1 ride", "¥1,100", "¥1,000", "—"],
              ["High-speed lift, 1 ride", "¥2,200", "¥2,000", "—"],
              ["Gondola up, 1 ride", "¥3,300", "¥3,000", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Children up to elementary school age ride free.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Suginohara open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              The on-season runs from 19 December 2026 to 28 March 2027, with lifts from 8:30 a.m. to 4:00 p.m. The 4-hour
              ticket runs for four hours from your first gate, from 10 a.m. Hours can change with the weather and
              daylight.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: suginoharaLiftTicket.url, label: "Book the Suginohara lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: northern Nagano",
        intro: "Other winter days on Klook in northern Nagano, next to Myoko.",
        tours: [nozawaOnsenLiftTicket, jigokudaniZenkojiSukiyakiTour, naganoSnowMonkeyDayTourTokyo],
      }}
      links={
        <p className={styles.bodyText}>
          For the snow monkeys and Nozawa nearby, see the <Link href="/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>Jigokudani snow monkey tour</Link> and
          <Link href="/guides/attractions/nozawa-onsen-ski" style={linkStyle}>skiing Nozawa Onsen</Link>. For Hakuba and a full trip plan, see
          <Link href="/guides/attractions/hakuba-ski-tours" style={linkStyle}>Hakuba ski tours</Link> and the
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Myoko Suginohara lift ticket?",
          a: `A one-day lift and gondola ticket is ¥9,000 for adults in 2026-27, ¥8,400 for junior and senior high school students and over-55s. Checked ${CHECKED}.`,
        },
        {
          q: "When is the 2026-27 season?",
          a: "The on-season runs from 19 December 2026 to 28 March 2027, with lifts from 8:30 a.m. to 4:00 p.m.",
        },
        {
          q: "Do children pay?",
          a: "No. Children up to elementary school age ride free at Suginohara.",
        },
        {
          q: "Is there a multi-day ticket?",
          a: "Yes. A 2-day ticket is ¥17,000 for adults and ¥15,800 for teens and over-55s.",
        },
        {
          q: "Is there a cheaper member price?",
          a: "Yes. SEIBU PRINCE CLUB members, free to join, pay ¥8,200 for an adult day ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nozawa-onsen-lift-ticket", title: "Nozawa Onsen Lift Ticket Prices" },
        { href: "/guides/attractions/jigokudani-snow-monkey-tour", title: "Jigokudani Snow Monkey Tour" },
        { href: "/guides/attractions/hakuba-ski-tours", title: "Hakuba Ski Tours" },
        { href: "/guides/attractions/japan-ski-trip-itinerary", title: "Japan Ski Trip Itinerary" },
      ]}
      banner={{
        title: "Ski the long runs of Myoko",
        desc: "A Myoko Suginohara lift ticket, scanned on the day.",
        label: "View the Suginohara lift ticket →",
      }}
    />
  );
}
