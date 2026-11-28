import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nisekoLiftTicketGearDelivery, nisekoSkiSnowboardRental, nisekoResortShuttleBus } from "../../../lib/klook-links";
import { rusutsuLiftPassBusSapporo } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Niseko United's own page, read by node fetch on 28 Nov 2026:
// niseko.ne.jp/en/lift/ (2026-27 All Mountain Pass: Early Season 28 Nov-11 Dec 2026, not sold online; Regular
// 12-23 Dec 2026 and 1-22 Mar 2027; Peak 24 Dec 2026-28 Feb 2027; Spring 23 Mar-4 Apr 2027; Final 5 Apr-5 May 2027;
// 1-day adult 13,500 peak / 12,600 regular / 8,800 early and spring / 6,300 final; ages 4-12 8,100 / 7,600 /
// 5,300 / 3,800; ages 13-15 and 65+ 11,500 / 10,700 / 7,500 / 5,400; multi-day adult peak 26,500 (2), 39,500 (3),
// 65,500 (5), 91,500 (7); regular 24,700, 36,800, 61,000, 85,200; early 17,300, 25,800, 42,700, 59,600;
// 12-point 7,500; 50-hour 121,200 online only; area seasons: Annupuri and Grand Hirafu to 5 May, Village to
// 4 Apr, Hanazono to 11 Apr 2027; night ski 12 Dec 2026-22 Mar 2027; multi-day tickets consecutive days only;
// purchaser and user must be the same person). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/niseko-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.niseko.ne.jp/en/lift/";
const HOURS = "https://www.niseko.ne.jp/en/lift/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NisekoLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Niseko lift ticket"
      title="Niseko Lift Ticket Prices 2026-27: All Mountain Pass"
      description="Niseko United All Mountain Pass 2026-27: ¥13,500 a day for adults at peak, ¥12,600 regular, ¥8,800 early. Season dates, child rates and multi-day prices."
      h1={<>Niseko Lift Ticket Prices 2026-27: <br />All Mountain Pass</>}
      subtitle="What the Niseko United All Mountain Pass costs in each part of the 2026-27 season, for one day or a week, and when each of the four areas is open."
      badges={[`Checked ${CHECKED}`, "¥13,500 a day at peak", "4 linked areas"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Niseko United All Mountain Pass covers Grand Hirafu, Hanazono, Niseko Village and Annupuri. A
            <strong> one-day adult pass is ¥13,500 in peak season</strong> (24 December 2026 to 28 February 2027),
            ¥12,600 in the regular season (12–23 December and 1–22 March) and ¥8,800 in the early and spring seasons.
            Children aged 4–12 pay ¥8,100 at peak.
          </p>
          <p className={styles.bodyText}>
            All four areas open on 28 November 2026; early-season passes are not sold online. Multi-day passes run on
            consecutive days, and the person who buys the pass must be the person who uses it. Klook sells a Hirafu
            and Hanazono lift ticket with gear delivered to your hotel. Niseko United, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nisekoLiftTicketGearDelivery.url, label: "Check the Niseko lift ticket on Klook →" }}
      stats={[
        { label: "1 day, peak", value: "¥13,500" },
        { label: "1 day, regular", value: "¥12,600" },
        { label: "1 day, early", value: "¥8,800" },
        { label: "Child 4–12, peak", value: "¥8,100" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the price depends on the season more than anything else; from Christmas to the end of
          February a week costs ¥91,500, so check which season your dates fall in before you compare offers.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult prices for the All Mountain Pass. Ages 13–15 and seniors over 65 pay ¥11,500 a day at peak and
              ¥10,700 in the regular season. A 12-point ticket is ¥7,500 for adults, and a 50-hour pass (online only)
              is ¥121,200. In the final season (5 April to 5 May 2027) a day is ¥6,300.
            </p>
          ),
          table: {
            head: ["Adult pass", "Peak", "Regular", "Early / Spring"],
            rows: [
              ["1 day", "¥13,500", "¥12,600", "¥8,800"],
              ["2 days", "¥26,500", "¥24,700", "¥17,300"],
              ["3 days", "¥39,500", "¥36,800", "¥25,800"],
              ["5 days", "¥65,500", "¥61,000", "¥42,700"],
              ["7 days", "¥91,500", "¥85,200", "¥59,600"],
              ["1 day, age 4–12", "¥8,100", "¥7,600", "¥5,300"],
              ["1 day, age 13–15 / 65+", "¥11,500", "¥10,700", "¥7,500"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells a Hirafu and Hanazono ticket with rental at its own price; check which areas the option covers.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is each area open in 2026-27?",
          body: (
            <p className={styles.bodyText}>
              All four areas open on 28 November 2026. Grand Hirafu and Annupuri are scheduled to run to 5 May 2027,
              Hanazono to 11 April and Niseko Village to 4 April. Night skiing runs from 12 December 2026 to 22 March
              2027, and day passes stay valid until night skiing ends on their last day. Dates can change with snow.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: nisekoLiftTicketGearDelivery.url, label: "Book the Niseko lift ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: gear and transfers in Niseko",
        intro: "Rental and the resort shuttle are the other bookings most Niseko trips need.",
        tours: [nisekoSkiSnowboardRental, nisekoResortShuttleBus, rusutsuLiftPassBusSapporo],
      }}
      links={
        <p className={styles.bodyText}>
          Getting there from the airport or the city: <Link href="/guides/transport/sapporo-to-niseko-transfer" style={linkStyle}>Sapporo to Niseko transfer</Link>, with the winter ski bus times.{" "}
          For lessons and the four areas, see <Link href="/guides/attractions/niseko-ski-tours" style={linkStyle}>Niseko ski tours</Link> and the{" "}
          <Link href="/guides/attractions/japan-ski-trip-itinerary" style={linkStyle}>Japan ski trip itinerary</Link>. For other winter days in Hokkaido, see{" "}
          <Link href="/guides/attractions/hokkaido-winter-tours" style={linkStyle}>Hokkaido winter tours</Link> and{" "}
          <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>ski day trips from Sapporo</Link>. Before you go, see{" "}
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Niseko lift ticket?",
          a: `A one-day Niseko United All Mountain Pass is ¥13,500 for adults in peak season (24 Dec 2026–28 Feb 2027), ¥12,600 in the regular season and ¥8,800 in the early and spring seasons. Checked ${CHECKED}.`,
        },
        {
          q: "Does one pass cover all of Niseko?",
          a: "Yes. The All Mountain Pass covers Grand Hirafu, Hanazono, Niseko Village and Annupuri.",
        },
        {
          q: "Can I buy the pass online?",
          a: "Yes, except in the early season (28 Nov–11 Dec 2026), when passes are sold only at the resort. The 50-hour pass is sold only online.",
        },
        {
          q: "Do multi-day passes have to be used on consecutive days?",
          a: "Yes. Niseko United says multi-day passes are valid for consecutive days only.",
        },
        {
          q: "How much is it for children?",
          a: "Ages 4–12 pay ¥8,100 a day at peak and ¥7,600 in the regular season; ages 13–15 pay ¥11,500 and ¥10,700.",
        },
      ]}
      related={[
        { href: "/guides/attractions/niseko-ski-tours", title: "Niseko Ski Tours" },
        { href: "/guides/attractions/rusutsu-lift-ticket", title: "Rusutsu Lift Ticket Prices" },
        { href: "/guides/attractions/kiroro-lift-ticket", title: "Kiroro Lift Ticket Prices" },
        { href: "/guides/attractions/japan-ski-trip-itinerary", title: "Japan Ski Trip Itinerary" },
      ]}
      banner={{
        title: "Ski Niseko with the gear brought to you",
        desc: "A Niseko lift ticket with door-to-door rental.",
        label: "View the Niseko lift ticket →",
      }}
    />
  );
}
