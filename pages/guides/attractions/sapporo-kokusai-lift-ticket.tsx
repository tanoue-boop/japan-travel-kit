import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { sapporoKokusaiSkiOtaruAquariumDayTour } from "../../../lib/klook-links";
import { sapporoKokusaiLiftTicket, teineBusLiftTicket, shiroiKoibitoParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261206-A35 (day 10, run 28 Nov 2026). Every figure is from Sapporo Kokusai Ski Resort's own page, read by node fetch on 28 Nov 2026:
// sapporo-kokusai.jp/price/ (2026-27, counter / web: 1-day general, regular period 20 Nov 2026-31 Mar 2027,
// 7,000 / 6,700; spring 1 Apr-5 May 2027 6,500 / 6,200; senior 60+ 6,000 / 5,700; grand senior 65+ 5,700 / 5,400;
// junior and senior high school 4,000 / 3,700; elementary 2,800 / 2,500; preschool free with an IC card deposit;
// 4-hour general 6,500 / 6,200, spring 6,000 / 5,700; Sky Cabin round trip adult 3,200; IC card deposit 500 yen
// added; address 937 Jozankei, Minami-ku, Sapporo). No Klook price (403).
const ROUTE = "/guides/attractions/sapporo-kokusai-lift-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.sapporo-kokusai.jp/price/";
const HOURS = "https://www.sapporo-kokusai.jp/price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SapporoKokusaiLiftTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Sapporo Kokusai lift ticket"
      title="Sapporo Kokusai Ski Resort 2026-27: Lift Ticket Prices"
      description="Sapporo Kokusai lift ticket 2026-27: ¥7,000 a day for adults or ¥6,700 online, ¥2,800 for elementary pupils, open to 5 May. Plus the 4-hour ticket."
      h1={<>Sapporo Kokusai Ski Resort 2026-27: <br />Lift Ticket Prices</>}
      subtitle="What a day at Sapporo Kokusai above Jozankei costs in 2026-27, by age, online against the counter, and the Sky Cabin for non-skiers."
      badges={[`Checked ${CHECKED}`, "¥6,700 online", "Open to 5 May"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>Sapporo Kokusai one-day ticket is ¥7,000 for adults, or ¥6,700 bought online</strong>, from
            20 November 2026 to 31 March 2027, and ¥6,500 (¥6,200 online) from 1 April to 5 May 2027. Elementary school
            children pay ¥2,800 and junior and senior high school students ¥4,000. Preschool children ride free.
          </p>
          <p className={styles.bodyText}>
            Add a ¥500 deposit for the IC card, refunded when you return it. The resort is at Jozankei in Minami-ku,
            in the south of Sapporo city. Klook sells a Sapporo Kokusai lift ticket. Sapporo Kokusai, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: sapporoKokusaiLiftTicket.url, label: "Check the Sapporo Kokusai lift ticket on Klook →" }}
      stats={[
        { label: "1 day online", value: "¥6,700" },
        { label: "1 day counter", value: "¥7,000" },
        { label: "Elementary", value: "¥2,800" },
        { label: "Season ends", value: "5 May 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> one of the cheaper day tickets near Sapporo, with a long season; buy online to save
          ¥300 and bring the card back for the deposit.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Seniors aged 60 and over pay ¥6,000 (¥5,700 online), and those aged 65 and over ¥5,700 (¥5,400 online),
              with ID. A 4-hour ticket is ¥6,500 (¥6,200 online). The Sky Cabin gondola round trip is ¥3,200 for adults
              and can be ridden for sightseeing. Ride tickets are not sold online.
            </p>
          ),
          table: {
            head: ["1-day ticket", "Counter", "Online"],
            rows: [
              ["Adult (20 Nov–31 Mar)", "¥7,000", "¥6,700"],
              ["Adult (1 Apr–5 May)", "¥6,500", "¥6,200"],
              ["Senior 60+", "¥6,000", "¥5,700"],
              ["Senior 65+", "¥5,700", "¥5,400"],
              ["Junior / senior high school", "¥4,000", "¥3,700"],
              ["Elementary school", "¥2,800", "¥2,500"],
              ["4 hours, adult", "¥6,500", "¥6,200"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Prices do not include the ¥500 IC card deposit. Klook sells the lift ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the season and where is it?",
          body: (
            <p className={styles.bodyText}>
              The regular period runs from 20 November 2026 to 31 March 2027 and the spring period from 1 April to
              5 May 2027. The resort is at 937 Jozankei, Minami-ku, Sapporo, above the Jozankei hot spring area.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: sapporoKokusaiLiftTicket.url, label: "Book Sapporo Kokusai on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Sapporo snow days and Otaru",
        intro: "Klook sells the other Sapporo ski days and a Kokusai day that adds the Otaru Aquarium.",
        tours: [sapporoKokusaiSkiOtaruAquariumDayTour, teineBusLiftTicket, shiroiKoibitoParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the other resorts within reach of the city, see <Link href="/guides/attractions/sapporo-ski-day-trip" style={linkStyle}>ski day trips from Sapporo</Link>.
          For the rest of the stay, see the <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3-day itinerary</Link>, the
          <Link href="/guides/attractions/otaru-day-trip-from-sapporo" style={linkStyle}>Otaru day trip from Sapporo</Link> and
          <Link href="/guides/attractions/hokkaido-winter-tours" style={linkStyle}>Hokkaido winter tours</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Sapporo Kokusai lift ticket?",
          a: `A one-day adult ticket is ¥7,000 at the counter or ¥6,700 online from 20 Nov 2026 to 31 Mar 2027. Checked ${CHECKED}.`,
        },
        {
          q: "When is Sapporo Kokusai open?",
          a: "From 20 November 2026 to 5 May 2027, with spring prices from 1 April.",
        },
        {
          q: "Is there a deposit?",
          a: "Yes. Add ¥500 for the IC card; it is refunded when you return the card.",
        },
        {
          q: "How much is it for children?",
          a: "Elementary school children pay ¥2,800 (¥2,500 online). Preschool children ride free but need an IC card with the deposit.",
        },
        {
          q: "Can non-skiers ride the gondola?",
          a: "Yes. The Sky Cabin round trip is ¥3,200 for adults and ¥2,500 for elementary school children.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sapporo-ski-day-trip", title: "Ski Day Trips from Sapporo" },
        { href: "/guides/attractions/sapporo-teine-lift-ticket", title: "Sapporo Teine Lift Ticket Prices" },
        { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo" },
        { href: "/guides/attractions/kiroro-lift-ticket", title: "Kiroro Lift Ticket Prices" },
      ]}
      banner={{
        title: "Ski above Jozankei",
        desc: "A Sapporo Kokusai lift ticket.",
        label: "View the Sapporo Kokusai ticket →",
      }}
    />
  );
}
