import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nozawaOnsenSkiRental, nozawaSnowMonkeyShibuOnsenTour, nozawaSnowMonkeyZenkojiTour } from "../../../lib/klook-links";
import { nozawaOnsenLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Nozawa Onsen Ski Resort's own page, read by node fetch on 28 Nov 2026:
// nozawaski.com/winter/lift_price/ (regular prices 19 Dec 2026-28 Mar 2027, adult / child (junior high and under)
// / senior 60+: 1-day 7,800 / 4,700 / 6,300, day of purchase only, no night skiing; 2-day 14,500 / 8,700 / 11,650,
// consecutive; 3-day 21,200 / 12,700 / 17,000, consecutive; 4-hour 6,700 / 4,000 / 5,350; lift ride 750 / 550;
// Nagasaka gondola ride 3,750 / 2,750, downhill free; night ticket 2,850 / 1,700; IC card deposit 500 yen; one
// preschool child free per adult). Early and spring rates are on a separate page that was not read, so they are
// not printed. No Klook price (403).
const ROUTE = "/guides/attractions/nozawa-onsen-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://nozawaski.com/winter/lift_price/";
const HOURS = "https://nozawaski.com/winter/lift_price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NozawaOnsenLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nozawa Onsen lift ticket"
      title="Nozawa Onsen Lift Ticket Prices 2026-27: 1, 2 & 3 Days"
      description="Nozawa Onsen lift ticket 2026-27: ¥7,800 a day for adults, ¥4,700 for kids up to junior high, ¥14,500 for 2 days. The 4-hour, night and gondola tickets."
      h1={<>Nozawa Onsen Lift Ticket Prices 2026-27: <br />1, 2 &amp; 3 Days</>}
      subtitle="What the Nozawa Onsen Ski Resort lift tickets cost in the 2026-27 main season, for one to three days, by age, and the extras."
      badges={[`Checked ${CHECKED}`, "¥7,800 a day", "Kids ¥4,700"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            In the main season (19 December 2026 to 28 March 2027) a <strong>Nozawa Onsen one-day ticket is ¥7,800 for
            adults</strong>, ¥4,700 for children up to junior high school and ¥6,300 for seniors aged 60 and over. Two
            days are ¥14,500 and three days ¥21,200 for adults, used on consecutive days.
          </p>
          <p className={styles.bodyText}>
            The one-day ticket is valid on the day of purchase and does not cover night skiing (a night ticket is
            ¥2,850). One preschool child rides free with each adult. Add a ¥500 IC card deposit. Klook sells the
            one-day lift ticket. Nozawa Onsen Ski Resort, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nozawaOnsenLiftTicket.url, label: "Check the Nozawa Onsen lift ticket on Klook →" }}
      stats={[
        { label: "1 day, adult", value: "¥7,800" },
        { label: "1 day, child", value: "¥4,700" },
        { label: "2 days, adult", value: "¥14,500" },
        { label: "Night", value: "¥2,850" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> one of the cheaper big resorts in Nagano; for a long stay compare the 3-day ticket
          (¥21,200) with three single days (¥23,400).
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Main-season prices. Children are junior high school age and under; seniors are 60 and over with ID.
              Multi-day tickets run on consecutive days from the day of purchase. A ride on the Nagasaka gondola is
              ¥3,750 for adults, and downhill gondola rides are free. Early-season and spring prices are on a separate
              official page.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Child", "Senior 60+"],
            rows: [
              ["1 day", "¥7,800", "¥4,700", "¥6,300"],
              ["2 days (consecutive)", "¥14,500", "¥8,700", "¥11,650"],
              ["3 days (consecutive)", "¥21,200", "¥12,700", "¥17,000"],
              ["4 hours", "¥6,700", "¥4,000", "¥5,350"],
              ["Night", "¥2,850", "¥1,700", "—"],
              ["Nagasaka gondola, 1 ride", "¥3,750", "¥2,750", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Add the ¥500 IC card deposit, refunded when you return the card. Klook sells the one-day ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When do these prices apply?",
          body: (
            <p className={styles.bodyText}>
              These are the main-season prices, from 19 December 2026 to 28 March 2027. The 4-hour ticket runs for four
              hours from the first gate on the same day. The night ticket is valid on night-skiing days. Prices for the
              start and end of the season are on the official special-season page.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: nozawaOnsenLiftTicket.url, label: "Book the Nozawa ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Nozawa Onsen and the snow monkeys",
        intro: "Rental in the village and a snow monkey afternoon fit around the ski days.",
        tours: [nozawaOnsenSkiRental, nozawaSnowMonkeyShibuOnsenTour, nozawaSnowMonkeyZenkojiTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the trains, the village and the onsen, see <Link href="/guides/attractions/nozawa-onsen-ski" style={linkStyle}>Nozawa Onsen ski</Link>. For more of
          Nagano, see the <Link href="/guides/attractions/jigokudani-snow-monkey-tour" style={linkStyle}>snow monkey tour</Link>,{" "}
          <Link href="/guides/attractions/hakuba-ski-tours" style={linkStyle}>Hakuba ski tours</Link> and the{" "}
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>. Before you go, see{" "}
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Nozawa Onsen lift ticket?",
          a: `A one-day adult ticket is ¥7,800 from 19 Dec 2026 to 28 Mar 2027; children up to junior high pay ¥4,700. Checked ${CHECKED}.`,
        },
        {
          q: "Does the day ticket include night skiing?",
          a: "No. The one-day ticket does not cover night skiing; a night ticket is ¥2,850 for adults.",
        },
        {
          q: "Do multi-day tickets need to be used on consecutive days?",
          a: "Yes. The 2- and 3-day tickets run on consecutive days from the day of purchase.",
        },
        {
          q: "Is there a deposit?",
          a: "Yes. Tickets on an IC card need a ¥500 deposit, refunded when you return the card.",
        },
        {
          q: "Do young children ski free?",
          a: "One preschool child rides free with each adult, passing the gate with the adult.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nozawa-onsen-ski", title: "Nozawa Onsen Ski" },
        { href: "/guides/attractions/jigokudani-snow-monkey-tour", title: "Snow Monkey Tour" },
        { href: "/guides/attractions/hakuba-happo-one-lift-ticket", title: "Happo-one Lift Ticket Prices" },
        { href: "/guides/attractions/tsugaike-kogen-lift-ticket", title: "Tsugaike Lift Ticket Prices" },
      ]}
      banner={{
        title: "Ski Nozawa Onsen",
        desc: "A one-day Nozawa Onsen lift ticket.",
        label: "View the Nozawa Onsen ticket →",
      }}
    />
  );
}
