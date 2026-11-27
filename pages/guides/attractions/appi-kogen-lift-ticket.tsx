import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { zaoGinzanDayTourFromSendai, zaoTwoDayTourFromTokyo } from "../../../lib/klook-links";
import { appiKogenLiftTicket, shizukuishiLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from APPI's own page, read by node fetch on 28 Nov 2026:
// appi.co.jp/snow-mountain-resort/ticket/ (2026-27 BLUE PASS adult (junior high school and older): early 5-18 Dec
// 2026 and spring 29 Mar-up to 5 May 2027 1-day 4,900, 2-day 9,300, 3-day 13,700; regular 19 Dec 2026-28 Mar 2027
// 1-day 9,500, 2-day 18,500, 3-day 27,500, same at the window and online; GOLD PASS 14,500 and BLACK PASS 33,500
// (30 a day) at the counter only; night ticket 4,000 from 16:00 at the ticket desk, night on Sat, Sun, holidays and
// 24-30 Dec, 12 Feb, 22 Feb; BLUE PASS valid 8:30 to the end of night skiing (last ride 19:30); 500 yen deposit
// included; ages 12 and under living in Tohoku free; others one child free per adult, then 3,500 (2,500 early and
// spring); multi-day passes on consecutive days). Klook's index names the option the 2025-2026 season BLUE PASS.
const ROUTE = "/guides/attractions/appi-kogen-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.appi.co.jp/snow-mountain-resort/ticket/";
const HOURS = "https://www.appi.co.jp/snow-mountain-resort/ticket/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function AppiKogenLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="APPI Kogen lift ticket"
      title="APPI Kogen Lift Ticket Prices 2026-27: Blue, Gold & Black"
      description="APPI Kogen 2026-27: BLUE PASS ¥9,500 a day for adults from 19 December, ¥4,900 early and spring; GOLD ¥14,500, BLACK ¥33,500. Child rules and night skiing."
      h1={<>APPI Kogen Lift Ticket Prices 2026-27: <br />Blue, Gold &amp; Black</>}
      subtitle="What each of APPI’s three passes costs in 2026-27, how the child rule works, and when night skiing runs."
      badges={[`Checked ${CHECKED}`, "¥9,500 a day", "Night skiing included"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>one-day BLUE PASS at APPI Kogen is ¥9,500 for adults</strong> from 19 December 2026 to 28 March
            2027, and ¥4,900 in the early season (5–18 December) and spring. It covers every lift and the gondola from
            8:30 a.m. to the end of night skiing. The GOLD PASS (priority boarding and the summit lounge) is ¥14,500, and
            the BLACK PASS, limited to 30 a day, is ¥33,500.
          </p>
          <p className={styles.bodyText}>
            One child aged 12 or under skis free with each adult; each further child pays ¥3,500. Prices include a
            ¥500 card deposit. Klook sells the one-day BLUE PASS; check the season on the option. APPI, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: appiKogenLiftTicket.url, label: "Check the APPI Kogen lift ticket on Klook →" }}
      stats={[
        { label: "BLUE, 1 day", value: "¥9,500" },
        { label: "BLUE, early / spring", value: "¥4,900" },
        { label: "GOLD, 1 day", value: "¥14,500" },
        { label: "Night ticket", value: "¥4,000" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the BLUE PASS already includes night skiing, so you only need the separate ¥4,000
          night ticket if you arrive after 4 p.m.; the early season is half price.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult BLUE PASS prices (junior high school and older); the window and online prices are the same. Multi-day
              passes run on consecutive days; in the early and spring seasons, 2- and 3-day passes are sold at the resort
              only. All prices include the ¥500 card deposit, refunded when you return the card.
            </p>
          ),
          table: {
            head: ["BLUE PASS (adult)", "Regular: 19 Dec–28 Mar", "Early: 5–18 Dec / Spring"],
            rows: [
              ["1 day", "¥9,500", "¥4,900"],
              ["2 days", "¥18,500", "¥9,300"],
              ["3 days", "¥27,500", "¥13,700"],
              ["GOLD PASS, 1 day", "¥14,500", "—"],
              ["BLACK PASS, 1 day (30 a day)", "¥33,500", "—"],
              ["Night ticket (from 16:00)", "¥4,000", "¥4,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Children 12 and under who live in Tohoku ski free; others ski free one per adult, then ¥3,500 each (¥2,500 early and spring).
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is APPI open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              The early season runs from 5 to 18 December 2026, the regular season from 19 December 2026 to 28 March 2027,
              and spring from 29 March to as late as 5 May 2027. The BLUE PASS is valid from 8:30 a.m. to the last night
              ride at 7:30 p.m. Night skiing runs on Saturdays, Sundays and holidays, 24–30 December, 12 February and 22
              February; night tickets are sold at the ticket desk from 4 p.m.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: appiKogenLiftTicket.url, label: "Book the APPI lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of winter in Tohoku",
        intro: "APPI is in Iwate; these are the other Tohoku winter days on Klook.",
        tours: [shizukuishiLiftTicket, zaoGinzanDayTourFromSendai, zaoTwoDayTourFromTokyo],
      }}
      links={
        <p className={styles.bodyText}>
          For the rail pass that reaches Iwate, see the <Link href="/guides/transport/jr-east-pass" style={linkStyle}>JR East Pass</Link>. For other winter days in
          the north, see <Link href="/guides/attractions/zao-snow-monsters-tour" style={linkStyle}>Zao snow monster tours</Link>, the
          <Link href="/guides/attractions/japan-winter-itinerary" style={linkStyle}>Japan winter itinerary</Link> and the
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is an APPI lift ticket?",
          a: `A one-day BLUE PASS is ¥9,500 for adults from 19 December 2026 to 28 March 2027 and ¥4,900 in the early and spring seasons. The GOLD PASS is ¥14,500 and the BLACK PASS ¥33,500. Checked ${CHECKED}.`,
        },
        {
          q: "Is night skiing included?",
          a: "Yes. The BLUE PASS is valid from 8:30 a.m. to the end of night skiing (last ride 7:30 p.m.) on night-skiing days.",
        },
        {
          q: "Do children ski free at APPI?",
          a: "Children 12 and under who live in Tohoku ski free. Others ski free one per adult, and each further child pays ¥3,500 (¥2,500 early and spring).",
        },
        {
          q: "When does APPI open for 2026-27?",
          a: "The early season starts on 5 December 2026. The regular season is 19 December 2026 to 28 March 2027, and spring runs to as late as 5 May 2027.",
        },
        {
          q: "Is there a deposit?",
          a: "Yes. Every price includes a ¥500 card deposit, refunded when you return the card at the ticket counter.",
        },
      ]}
      related={[
        { href: "/guides/attractions/shizukuishi-lift-ticket", title: "Shizukuishi Lift Ticket Prices" },
        { href: "/guides/attractions/zao-snow-monsters-tour", title: "Zao Snow Monsters Tour" },
        { href: "/guides/transport/jr-east-pass", title: "JR East Pass" },
        { href: "/guides/attractions/japan-ski-trip-itinerary", title: "Japan Ski Trip Itinerary" },
      ]}
      banner={{
        title: "Ski APPI Kogen in Iwate",
        desc: "A one-day APPI BLUE PASS, night skiing included.",
        label: "View the APPI lift ticket →",
      }}
    />
  );
}
