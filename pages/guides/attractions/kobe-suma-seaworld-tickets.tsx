import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kobeFerrisKitanoArimaRokkoDayTour } from "../../../lib/klook-links";
import { kobeSumaSeaworldTicket, kobeAnimalKingdomTicket, kobeNunobikiHerbGardensRopeway } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the aquarium's own pages, read by node fetch on 28 Nov 2026:
// kobesuma-seaworld.jp/en/guide/price_ticket/ (1-day admission by period: Obon / summer / regular / December to
// March excluding spring and winter holidays: adult (high school+) 3,700 / 3,300 / 3,100 / 2,900; child (elementary
// and junior high) 1,800 / 1,800 / 1,800 / 1,700; infant 4-6 the same as child; senior 65+ 3,100 / 2,700 / 2,500 /
// 2,300; tickets on sale up to 2 months ahead from the 1st of each month; calendar: 1-25 Dec 2026 2,900, 26-31 Dec
// 3,100) and /guide/time/ (mostly 10:00-18:00, 9:30-19:00 on some days, last entry 1 hour before closing; closed
// 16-17 Dec 2026 and 19-21 Jan 2027). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/kobe-suma-seaworld-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kobesuma-seaworld.jp/en/guide/price_ticket/";
const HOURS = "https://www.kobesuma-seaworld.jp/guide/time/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KobeSumaSeaworldTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kobe Suma Sea World tickets"
      title="Kobe Suma Sea World Tickets 2026: Price & Closed Days"
      description="Kobe Suma Sea World tickets 2026: adults ¥2,900 from December to March and ¥3,100 in the regular season, children ¥1,700–1,800. Hours and closed days."
      h1={<>Kobe Suma Sea World Tickets 2026: <br />Price &amp; Closed Days</>}
      subtitle="What a day at the orca aquarium on Suma beach costs in each season, how long it is open and the dates it closes."
      badges={[`Checked ${CHECKED}`, "Winter ¥2,900", "Orcas"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A one-day <strong>adult ticket to Kobe Suma Sea World is ¥2,900 on most days from December to March</strong>,
            ¥3,100 in the regular season, ¥3,300 in the summer holidays and ¥3,700 at Obon. Elementary and junior high
            school students, and children aged 4 to 6, pay ¥1,700 to ¥1,800; over-65s ¥2,300 to ¥3,100.
          </p>
          <p className={styles.bodyText}>
            It is usually open <strong>10 a.m. to 6 p.m.</strong>, until 7 p.m. on some days, with last entry one hour
            before closing. It is closed on 16 and 17 December 2026 and 19 to 21 January 2027. Klook sells a one-day
            ticket. Kobe Suma Sea World, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kobeSumaSeaworldTicket.url, label: "Check the Kobe Suma Sea World ticket on Klook →" }}
      stats={[
        { label: "Adult, Dec–Mar", value: "¥2,900" },
        { label: "Adult, regular", value: "¥3,100" },
        { label: "Child (4–15)", value: "¥1,700–1,800" },
        { label: "Senior (65+)", value: "¥2,300–3,100" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> winter is the cheapest season, but the price goes back up to ¥3,100 for the winter
          holidays from 26 December; check the calendar price of your date.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The price is set by season; the official calendar shows the adult price of each date. Tickets go on sale up to
              two months ahead, from the 1st of each month. In December 2026 adults pay ¥2,900 up to the 25th and ¥3,100
              from the 26th.
            </p>
          ),
          table: {
            head: ["1-day ticket", "Dec–Mar*", "Regular", "Summer", "Obon"],
            rows: [
              ["Adult (high school+)", "¥2,900", "¥3,100", "¥3,300", "¥3,700"],
              ["Child (elementary, junior high)", "¥1,700", "¥1,800", "¥1,800", "¥1,800"],
              ["Infant (4–6)", "¥1,700", "¥1,800", "¥1,800", "¥1,800"],
              ["Senior (65+)", "¥2,300", "¥2,500", "¥2,700", "¥3,100"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                *December to March excludes the spring and winter school holidays. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Kobe Suma Sea World open?",
          body: (
            <p className={styles.bodyText}>
              Most days 10 a.m. to 6 p.m.; on some weekends and holidays 9:30 a.m. to 7 p.m. Last entry is one hour before
              closing. The next closed days are 16 and 17 December 2026 and 19, 20 and 21 January 2027.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kobeSumaSeaworldTicket.url, label: "Book Kobe Suma Sea World on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Kobe",
        intro: "Suma is on the western side of Kobe, so it pairs with these.",
        tours: [kobeAnimalKingdomTicket, kobeNunobikiHerbGardensRopeway, kobeFerrisKitanoArimaRokkoDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of Kobe, see the <Link href="/guides/attractions/kobe-day-trip-from-osaka" style={linkStyle}>Kobe day trip from Osaka</Link>,
          <Link href="/guides/attractions/kobe-animal-kingdom-tickets" style={linkStyle}>Kobe Animal Kingdom</Link> and the
          <Link href="/guides/attractions/kobe-nunobiki-herb-gardens-ropeway" style={linkStyle}>Nunobiki Herb Gardens ropeway</Link>; for rail, see the
          <Link href="/guides/transport/kansai-wide-area-pass" style={linkStyle}>Kansai Wide Area Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Kobe Suma Sea World?",
          a: `A one-day adult ticket is ¥2,900 from December to March (outside school holidays), ¥3,100 in the regular season, ¥3,300 in the summer holidays and ¥3,700 at Obon. Children pay ¥1,700–1,800. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "Usually 10:00 to 18:00, and 9:30 to 19:00 on some days. Last entry is one hour before closing.",
        },
        {
          q: "When is it closed?",
          a: "The next closed days are 16 and 17 December 2026 and 19 to 21 January 2027.",
        },
        {
          q: "How far ahead can I buy?",
          a: "Up to two months ahead; sales open on the 1st of each month.",
        },
        {
          q: "Do children aged 4 to 6 pay?",
          a: "Yes. Ages 4 to 6 pay the same as elementary and junior high school students, ¥1,700 to ¥1,800.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka" },
        { href: "/guides/attractions/kobe-animal-kingdom-tickets", title: "Kobe Animal Kingdom Tickets" },
        { href: "/guides/attractions/kobe-nunobiki-herb-gardens-ropeway", title: "Nunobiki Herb Gardens Ropeway" },
        { href: "/guides/transport/kansai-wide-area-pass", title: "Kansai Wide Area Pass" },
      ]}
      banner={{
        title: "Orcas on the Kobe shore",
        desc: "A one-day ticket for Kobe Suma Sea World.",
        label: "View the Suma Sea World ticket →",
      }}
    />
  );
}
