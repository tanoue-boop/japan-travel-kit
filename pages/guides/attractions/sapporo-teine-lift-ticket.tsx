import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kiroroLiftPassShuttleFromSapporo, teineNightSkiingTour } from "../../../lib/klook-links";
import { teineBusLiftTicket, sapporoKokusaiLiftTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Sapporo Teine's own page (Kamori Kanko), read by node fetch on 28 Nov 2026:
// sapporo-teine.com/snow/lift-time (2026-27, counter / online: regular season 19 Dec-7 Mar: 1-day adult 19-64
// 9,800 / 8,800, senior 65+ and 13-18 8,500 / 7,500, child 4-12 6,500 / 5,500; 5-hour adult 7,600 / 6,600; night
// 16:00-20:00 adult 3,900 / 2,900; 25-hour adult 28,500 online only; first-ski period opening-18 Dec: 1-day adult
// 9,400 / 8,400, senior and 13-18 8,100 / 7,100, child 6,200 / 5,200; spring 8-28 Mar: 1-day adult 7,600 / 6,600;
// age 3 and under free; 1-day valid until the end of night skiing) and /snow/lift-fee (online purchase needs user
// registration; the QR code is exchanged at machines on Highland Ski Center 4F and Olympia Ski Center 3F).
// No Klook price (403).
const ROUTE = "/guides/attractions/sapporo-teine-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://sapporo-teine.com/snow/lift-time";
const HOURS = "https://sapporo-teine.com/snow/lift-time";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SapporoTeineLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Sapporo Teine lift ticket"
      title="Sapporo Teine Lift Ticket Prices 2026-27: Day & Night"
      description="Sapporo Teine lift ticket 2026-27: ¥9,800 a day for adults at the counter or ¥8,800 online from 19 December. Night skiing, child rates and the bus."
      h1={<>Sapporo Teine Lift Ticket Prices 2026-27: <br />Day &amp; Night</>}
      subtitle="What a day or an evening at Sapporo Teine costs in 2026-27, counter against online, and the bus-and-lift package from central Sapporo."
      badges={[`Checked ${CHECKED}`, "¥8,800 online", "Night 16:00–20:00"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            In the regular season (19 December 2026 to 7 March 2027) a <strong>Sapporo Teine one-day ticket is ¥9,800
            for adults at the counter or ¥8,800 bought online</strong>. Seniors over 65 and ages 13–18 pay ¥8,500
            (¥7,500 online), and children aged 4–12 ¥6,500 (¥5,500 online). Children aged 3 and under ride free.
          </p>
          <p className={styles.bodyText}>
            The one-day ticket is valid until night skiing ends, and a night ticket for 16:00–20:00 is ¥3,900 (¥2,900
            online). Teine is inside Sapporo city, in Teine-ku. Klook sells the round-trip bus from downtown Sapporo with
            a lift ticket. Sapporo Teine, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: teineBusLiftTicket.url, label: "Check the Teine bus and lift ticket on Klook →" }}
      stats={[
        { label: "1 day online", value: "¥8,800" },
        { label: "1 day counter", value: "¥9,800" },
        { label: "Night online", value: "¥2,900" },
        { label: "Child 4–12 online", value: "¥5,500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy online to save ¥1,000 a day; without a car, the bus-and-lift package is the simplest
          way up from the city.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Regular-season prices. Before 19 December the adult day ticket is ¥9,400 (¥8,400 online); from 8 to 28
              March it is ¥7,600 (¥6,600 online). Online tickets need registration; you exchange the QR code for an IC
              card at the machines on the 4th floor of the Highland Ski Center or the 3rd floor of the Olympia Ski Center.
            </p>
          ),
          table: {
            head: ["Ticket (19 Dec–7 Mar)", "Counter", "Online"],
            rows: [
              ["1 day, adult", "¥9,800", "¥8,800"],
              ["5 hours, adult", "¥7,600", "¥6,600"],
              ["Night, adult", "¥3,900", "¥2,900"],
              ["1 day, 65+ / 13–18", "¥8,500", "¥7,500"],
              ["1 day, child 4–12", "¥6,500", "¥5,500"],
              ["25 hours, adult", "—", "¥28,500"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells the bus and lift ticket package at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When are the seasons and night skiing?",
          body: (
            <p className={styles.bodyText}>
              The first-ski period runs from opening to 18 December 2026, the regular season from 19 December 2026 to
              7 March 2027, and spring skiing from 8 to 28 March 2027. Night tickets cover 16:00–20:00, and a one-day
              ticket is valid until night skiing ends.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: teineBusLiftTicket.url, label: "Book the Teine package on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more snow days from Sapporo",
        intro: "Teine is the closest of the big ski areas to the city; the others make a second day.",
        tours: [kiroroLiftPassShuttleFromSapporo, sapporoKokusaiLiftTicket, teineNightSkiingTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the other resorts within reach of the city, see <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>ski day trips from Sapporo</Link>.
          For the rest of the stay, see the <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3-day itinerary</Link>,{" "}
          <Link href="/guides/attractions/sapporo-snow-festival-tours" style={linkStyle}>Sapporo Snow Festival tours</Link> and{" "}
          <Link href="/guides/attractions/hokkaido-winter-tours" style={linkStyle}>Hokkaido winter tours</Link>. Before you go, see{" "}
          <Link href="/guides/money/japan-ski-travel-insurance" style={linkStyle}>ski travel insurance for Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Sapporo Teine lift ticket?",
          a: `From 19 Dec 2026 to 7 Mar 2027 a one-day adult ticket is ¥9,800 at the counter or ¥8,800 online. Checked ${CHECKED}.`,
        },
        {
          q: "Is there night skiing at Teine?",
          a: "Yes. The night ticket covers 16:00–20:00 and is ¥3,900 for adults at the counter or ¥2,900 online.",
        },
        {
          q: "How do I use an online ticket?",
          a: "You receive a QR code and exchange it for an IC card at the machines in the Highland Ski Center (4F) or Olympia Ski Center (3F).",
        },
        {
          q: "Do children ski free?",
          a: "Children aged 3 and under ride free. Ages 4–12 pay ¥6,500 a day at the counter or ¥5,500 online in the regular season.",
        },
        {
          q: "Is Teine in Sapporo?",
          a: "Yes. Sapporo Teine is in Teine-ku, inside Sapporo city.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sapporo-ski-day-trip", title: "Ski Day Trips from Sapporo" },
        { href: "/guides/attractions/sapporo-kokusai-lift-ticket", title: "Sapporo Kokusai Lift Ticket Prices" },
        { href: "/guides/attractions/kiroro-lift-ticket", title: "Kiroro Lift Ticket Prices" },
        { href: "/guides/attractions/sapporo-3-day-itinerary", title: "Sapporo 3-Day Itinerary" },
      ]}
      banner={{
        title: "Teine from downtown Sapporo",
        desc: "The bus both ways with a lift ticket.",
        label: "View the Teine package →",
      }}
    />
  );
}
