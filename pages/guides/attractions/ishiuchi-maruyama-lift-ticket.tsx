import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { galaYuzawaLiftTicket, yuzawaNakazatoLiftRental, echigoYuzawaStationSkiRental } from "../../../lib/klook-links";
import { ishiuchiMaruyamaLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261207-A35 (day 11, run 28 Nov 2026). Every figure is from Ishiuchi Maruyama Ski Resort's own page, read by node fetch on 28 Nov 2026:
// ishiuchi.or.jp/winter/price/ (opening planned 18 Dec 2026; flex 1-day, up to 8.5 hours from the first gate:
// adult window 8,500, web (general) 7,900, web (Japan residents) 5,200-6,800 by date; child 6-15 4,200 / 4,000 /
// 2,800-3,600; senior 65+ window 6,800; kids 4-6 1,500; all-day 1-day 8:30-20:00: adult 9,400 / 8,800 / 5,700-7,500,
// child 4,700 / 4,400, senior 7,600; 4-hour window 6,500, child 3,200, senior 5,300; 2-day 15,300 / 14,500;
// 3-day 21,600 / 20,500; 4-day 28,800 / 27,300; 5-day 36,000 / 34,000; night 16:00-20:00 window 3,800, web 3,600;
// Sunrise Express gondola return 3,500, child 1,800; 3 and under free, one per adult; web tickets must be bought by
// the day before; night skiing to 20:00, 17:00 on non-night days). No Klook price (403).
const ROUTE = "/guides/attractions/ishiuchi-maruyama-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://ishiuchi.or.jp/winter/price/";
const HOURS = "https://ishiuchi.or.jp/winter/price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function IshiuchiMaruyamaLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Ishiuchi Maruyama lift ticket"
      title="Ishiuchi Maruyama Lift Ticket Prices 2026-27: Day & Night"
      description="Ishiuchi Maruyama 2026-27: ¥8,500 a day for adults at the window, ¥7,900 online, ¥9,400 for 8:30–20:00, night ¥3,800. Opens 18 December 2026."
      h1={<>Ishiuchi Maruyama Lift Ticket <br />Prices 2026-27: Day &amp; Night</>}
      subtitle="What a day at Ishiuchi Maruyama costs in 2026-27, the difference between the flex and all-day tickets, and night skiing."
      badges={[`Checked ${CHECKED}`, "¥8,500 a day", "Opens 18 Dec"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The standard <strong>Ishiuchi Maruyama day ticket (up to 8.5 hours from your first gate) is ¥8,500 for
            adults at the window</strong> and ¥7,900 online in 2026-27. The all-day ticket, 8:30 a.m. to 8 p.m. with
            night skiing, is ¥9,400 (¥8,800 online). Children aged 6–15 pay ¥4,200, and night skiing alone is ¥3,800.
          </p>
          <p className={styles.bodyText}>
            The resort plans to open on 18 December 2026. Online tickets must be bought by the day before. Klook sells
            a one-day Ishiuchi Maruyama lift ticket. Ishiuchi Maruyama Ski Resort, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: ishiuchiMaruyamaLiftTicket.url, label: "Check the Ishiuchi Maruyama lift ticket on Klook →" }}
      stats={[
        { label: "1 day (8.5 h), window", value: "¥8,500" },
        { label: "1 day (8.5 h), online", value: "¥7,900" },
        { label: "All day 8:30–20:00", value: "¥9,400" },
        { label: "Night", value: "¥3,800" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the 8.5-hour ticket starts at your first gate, so an 8:30 start covers you until
          5 p.m.; pay the extra ¥900 for the all-day ticket only if you will stay for night skiing.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult prices for 2026-27. Children are 6–15, seniors 65 and over (window only), and kids aged 4–6 pay
              ¥1,500 a day; one child aged 3 or under rides free with each adult. A cheaper online price, which changes
              by date, is sold to residents of Japan.
            </p>
          ),
          table: {
            head: ["Adult ticket", "Window", "Online (general)", "Child 6–15, window"],
            rows: [
              ["Flex 1 day (8.5 hours)", "¥8,500", "¥7,900", "¥4,200"],
              ["All day (8:30–20:00)", "¥9,400", "¥8,800", "¥4,700"],
              ["4 hours", "¥6,500", "—", "¥3,200"],
              ["2 days", "¥15,300", "¥14,500", "¥7,800"],
              ["3 days", "¥21,600", "¥20,500", "¥11,100"],
              ["5 days", "¥36,000", "¥34,000", "¥18,500"],
              ["Night (16:00–20:00)", "¥3,800", "¥3,600", "¥2,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Online tickets must be bought by the day before; they cannot be collected on the day of purchase.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Ishiuchi Maruyama open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              Winter opening is planned for 18 December 2026. The all-day ticket runs from 8:30 a.m. to 8:00 p.m.; night
              skiing runs 4–8 p.m. on night-skiing days, and on other days the lifts close at 5:00 p.m. The Sunrise
              Express gondola return trip is ¥3,500 for adults.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: ishiuchiMaruyamaLiftTicket.url, label: "Book the Ishiuchi Maruyama lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: other Yuzawa-area ski days",
        intro: "Ishiuchi is next to these resorts around Echigo-Yuzawa.",
        tours: [galaYuzawaLiftTicket, yuzawaNakazatoLiftRental, echigoYuzawaStationSkiRental],
      }}
      links={
        <p className={styles.bodyText}>
          For a day trip from Tokyo by shinkansen, see <Link href="/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo" style={linkStyle}>GALA Yuzawa ski day trip from Tokyo</Link> and
          <Link href="/guides/attractions/tokyo-snow-day-trip" style={linkStyle}>snow day trips from Tokyo</Link>. For the rail pass and insurance, see the
          <Link href="/guides/transport/tokyo-wide-pass" style={linkStyle}>JR Tokyo Wide Pass</Link> and
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is an Ishiuchi Maruyama lift ticket?",
          a: `The flex one-day ticket (up to 8.5 hours) is ¥8,500 for adults at the window and ¥7,900 online in 2026-27; the all-day ticket to 8 p.m. is ¥9,400. Checked ${CHECKED}.`,
        },
        {
          q: "When does Ishiuchi Maruyama open?",
          a: "Winter opening is planned for 18 December 2026.",
        },
        {
          q: "What is the difference between the flex and all-day tickets?",
          a: "The flex ticket is valid for up to 8.5 hours from your first gate. The all-day ticket covers 8:30 a.m. to 8 p.m., including night skiing.",
        },
        {
          q: "Is there night skiing?",
          a: "Yes, 4–8 p.m. on night-skiing days. A night ticket is ¥3,800 at the window or ¥3,600 online.",
        },
        {
          q: "How much is it for children?",
          a: "Children aged 6–15 pay ¥4,200 for the flex day ticket at the window, kids aged 4–6 pay ¥1,500, and one child aged 3 or under rides free per adult.",
        },
      ]}
      related={[
        { href: "/guides/attractions/gala-yuzawa-ski-day-trip-from-tokyo", title: "GALA Yuzawa Ski Day Trip" },
        { href: "/guides/attractions/naeba-lift-ticket", title: "Naeba Lift Ticket Prices" },
        { href: "/guides/attractions/maiko-lift-ticket", title: "Maiko Snow Resort Lift Ticket" },
        { href: "/guides/transport/tokyo-wide-pass", title: "JR Tokyo Wide Pass" },
      ]}
      banner={{
        title: "Ski the big slopes of Ishiuchi",
        desc: "A one-day Ishiuchi Maruyama lift ticket.",
        label: "View the Ishiuchi lift ticket →",
      }}
    />
  );
}
