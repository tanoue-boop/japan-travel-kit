import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { arimaTaikoNoYuSpa, kobeBeefSakuraTeppanyaki } from "../../../lib/klook-links";
import { kobeNunobikiHerbGardensRopeway, kobeAnimalKingdomTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from the operator's own
// English page, read by node fetch on 28 Nov 2026: kobeherb.com/en/hours-of-operation-and-fares/
// (daytime 9:30-17:00 round trip adult 2,500 yen, one way 1,900; youth (elementary and
// junior high) 1,250 / 950; preschool free; evening (17:00-21:00) round trip adult 2,000,
// youth 1,200; Bottom > Mid station interval ticket 1,700 / 850 (no garden entry); Christmas
// season (early November to 25 December) has special rates and no night rate; winter
// 12/1-3/19: ropeway up line closes 16:45, down line 17:15, herb gardens 10:00-17:00, every
// day; closed for inspection Sat 23 Jan - Fri 12 Feb 2027; may close in strong wind or
// thunder) and /en/garden-information/ (about 75,000 herbs and flowers of about 200 kinds,
// 12 garden areas, Glasshouse). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/kobe-nunobiki-herb-gardens-ropeway";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kobeherb.com/en/hours-of-operation-and-fares/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KobeNunobikiHerbGardensRopewayPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nunobiki Herb Gardens & Ropeway"
      title="Nunobiki Herb Gardens & Ropeway 2026: Tickets & Hours"
      description="Kobe's Nunobiki ropeway and herb gardens: ¥2,500 round trip for adults by day, ¥1,250 for children. Winter hours, the 2027 closure and how to book."
      h1={<>Kobe Nunobiki Herb Gardens &amp; Ropeway 2026: <br />Tickets, Price &amp; Hours</>}
      subtitle="The ropeway above Shin-Kobe to Japan's largest herb gardens: day and evening fares, winter hours and the inspection closure in early 2027."
      badges={[`Checked ${CHECKED}`, "¥2,500 round trip", "Kobe"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The regular daytime <strong>round-trip ropeway ticket is ¥2,500 for adults</strong> and ¥1,250 for
            elementary and junior high school pupils; preschool children ride free. The ticket includes entry to the
            herb gardens at the top. A one-way ride is ¥1,900 (¥950).
          </p>
          <p className={styles.bodyText}>
            From 1 December to 19 March the last ropeway up is at <strong>16:45</strong> and the last one down at
            17:15; the gardens are open 10:00–17:00 every day. Until 25 December, special Christmas-season fares
            apply — check the{" "}
            <a href={OFFICIAL} target="_blank" rel="noopener" style={linkStyle}>official fares page</a>. The
            ropeway and gardens close for inspection from <strong>23 January to 12 February 2027</strong>. Klook
            sells a round-trip ticket. Kobe Nunobiki Herb Gardens &amp; Ropeway, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kobeNunobikiHerbGardensRopeway.url, label: "Check Nunobiki ropeway tickets on Klook →" }}
      stats={[
        { label: "Round trip (adult)", value: "¥2,500" },
        { label: "Round trip (child)", value: "¥1,250" },
        { label: "Last ride up (winter)", value: "16:45" },
        { label: "Closed", value: "23 Jan – 12 Feb 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> go up in the early afternoon in winter — the last ride up is 16:45. Avoid the
          three-week inspection closure from late January, and expect the ropeway to stop in strong wind.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Nunobiki ropeway?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              &quot;Youth&quot; means elementary and junior high school pupils. The evening fare (after 17:00) is not
              sold in the summer and Christmas seasons, and the interval ticket to the Mid Station does not include
              the herb gardens.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Youth"],
            rows: [
              ["Round trip, daytime (9:30–17:00)", "¥2,500", "¥1,250"],
              ["One way, daytime", "¥1,900", "¥950"],
              ["Round trip, evening (17:00–21:00)", "¥2,000", "¥1,200"],
              ["Bottom → Mid Station only", "¥1,700", "¥850"],
            ],
            note: (
              <>
                Regular fares, Kobe Nunobiki Herb Gardens &amp; Ropeway, checked {CHECKED}. Christmas-season fares differ.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours",
          title: "When does the ropeway run?",
          body: (
            <p className={styles.bodyText}>
              Winter (1 December – 19 March): ropeway every day, last ride up 16:45 and last ride down 17:15; herb
              gardens 10:00–17:00. In spring and autumn the ropeway runs into the evening on weekends and holidays.
              The gardens hold about 75,000 herbs and flowers of some 200 kinds across 12 areas, including a
              Glasshouse.
            </p>
          ),
          ctas: [{ href: kobeNunobikiHerbGardensRopeway.url, label: "Book the Nunobiki ropeway on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day in Kobe",
        intro: "Shin-Kobe is one stop from Sannomiya on the subway. These fill the rest of a Kobe day.",
        tours: [kobeAnimalKingdomTicket, kobeBeefSakuraTeppanyaki, arimaTaikoNoYuSpa],
      }}
      links={
        <p className={styles.bodyText}>
          For a full day in the city, see the{" "}
          <Link href="/guides/attractions/kobe-day-trip-from-osaka" style={linkStyle}>Kobe day trip from Osaka</Link>.
          The{" "}
          <Link href="/guides/attractions/kobe-beef-dinner" style={linkStyle}>Kobe beef dinner guide</Link> covers the
          evening, the{" "}
          <Link href="/guides/attractions/arima-onsen-day-trip" style={linkStyle}>Arima Onsen day trip</Link> goes over
          the mountains, and{" "}
          <Link href="/guides/attractions/kobe-animal-kingdom-tickets" style={linkStyle}>Kobe Animal Kingdom</Link> is on
          Port Island.
          {" "}Over the mountain in Arima, <Link href="/guides/attractions/arima-onsen-taiko-no-yu" style={{ color: "var(--red)", fontWeight: 600 }}>Taiko no Yu</Link> is ¥2,750 for adults on weekdays (next closed 6 January 2027).
          {" "}For an aquarium day in Kobe, <Link href="/guides/attractions/kobe-suma-seaworld-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kobe Suma Sea World</Link> is ¥2,900 for adults in winter and ¥3,100 in the regular season.
        </p>
      }
      faq={[
        {
          q: "How much is the Nunobiki ropeway?",
          a: `The regular daytime round trip is ¥2,500 for adults and ¥1,250 for elementary and junior high pupils; one way is ¥1,900 / ¥950. Christmas-season fares differ until 25 December. Checked ${CHECKED}.`,
        },
        {
          q: "Does the ropeway ticket include the herb gardens?",
          a: "Yes. The round-trip and one-way tickets include the herb gardens; the Bottom to Mid Station interval ticket does not.",
        },
        {
          q: "What are the winter hours?",
          a: "From 1 December to 19 March the last ropeway up is at 16:45 and the last down at 17:15; the gardens open 10:00–17:00.",
        },
        {
          q: "Is the Nunobiki ropeway closed in 2027?",
          a: "Yes, for equipment inspection from Saturday 23 January to Friday 12 February 2027. It may also stop in strong wind or thunder.",
        },
        {
          q: "Can I buy the ticket on Klook?",
          a: "Yes. Klook sells a round-trip ropeway ticket with entry to the herb gardens.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka" },
        { href: "/guides/attractions/kobe-beef-dinner", title: "Kobe Beef Dinner" },
        { href: "/guides/attractions/arima-onsen-day-trip", title: "Arima Onsen Day Trip" },
        { href: "/guides/attractions/kobe-animal-kingdom-tickets", title: "Kobe Animal Kingdom Tickets" },
      ]}
      banner={{
        title: "A ropeway above Shin-Kobe",
        desc: "Round-trip ropeway with entry to the Nunobiki Herb Gardens.",
        label: "View Nunobiki ropeway tickets →",
      }}
    />
  );
}
