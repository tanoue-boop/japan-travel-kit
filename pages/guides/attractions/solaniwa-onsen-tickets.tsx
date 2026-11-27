import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { santaMariaDayCruise, tempozanFerrisWheel } from "../../../lib/klook-links";
import { solaniwaOnsenTicket, nifrelTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from Solaniwa Onsen's own page, read by node fetch on 28 Nov 2026:
// solaniwa.com/price/ (hours 11:00-23:00, last entry 22:00, baths to 22:30; morning bath 6:00-9:30, last entry 8:30,
// not on closing days or the day after; adult admission by ticket type A 2,310, B 2,640, C 3,080, D 3,300, E 3,630;
// after 17:00 A/B 1,980, C 2,420, no night price on D/E; child (4 to elementary school) 1,320; 70 and over 1,800;
// under 4 free; yukata and towels included; bedrock bath A/B 1,100, C/D/E 1,320, adults only; private open-air
// baths 8,800 / 12,100 / 15,400 per room for 90 minutes plus admission; closing days 9 Dec 2026, 13 Jan, 3 Feb and
// 10 Mar 2027; bathing tax 150 extra for adults paying over 1,500). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/solaniwa-onsen-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://solaniwa.com/price/";
const HOURS = "https://solaniwa.com/price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SolaniwaOnsenTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Solaniwa Onsen tickets"
      title="Solaniwa Onsen Tickets 2026: Prices, Hours & Night Rate"
      description="Solaniwa Onsen Osaka 2026: adults ¥2,310–3,630 by date type, ¥1,980 after 5 p.m. on A/B days, children ¥1,320. Hours, closing days and the night rate."
      h1={<>Solaniwa Onsen Tickets 2026: <br />Prices, Hours &amp; Night Rate</>}
      subtitle="What a day at the onsen theme park by Bentencho costs, which date type you will pay, and when the night rate starts."
      badges={[`Checked ${CHECKED}`, "From ¥2,310", "Yukata included"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Adult admission to Solaniwa Onsen is ¥2,310 to ¥3,630</strong>, depending on the ticket type (A to E)
            of your date on the official calendar. After 5 p.m. it drops to <strong>¥1,980 on A and B days</strong> and
            ¥2,420 on C days. Children from 4 to elementary school age pay ¥1,320; under-4s are free.
          </p>
          <p className={styles.bodyText}>
            It is open from 11 a.m. to 11 p.m. (last entry 10 p.m.). Yukata, towels and toiletries are included. The bath
            tax of ¥150 is extra for adults. Klook sells an admission ticket. Solaniwa Onsen, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: solaniwaOnsenTicket.url, label: "Check the Solaniwa Onsen ticket on Klook →" }}
      stats={[
        { label: "Adult, type A day", value: "¥2,310" },
        { label: "Adult, type E day", value: "¥3,630" },
        { label: "After 5 p.m. (A/B)", value: "¥1,980" },
        { label: "Child (4–12)", value: "¥1,320" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> check the ticket type of your date first; on an A or B day, arriving after 5 p.m.
          saves ¥330–660 per adult, but D and E days have no night rate.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Admission includes yukata, bath towels and the amenities. Over-70s pay ¥1,800 on any day. The bedrock bath
              (adults only) is ¥1,100 extra on A/B days and ¥1,320 on C/D/E days.
            </p>
          ),
          table: {
            head: ["Ticket type of the day", "Adult", "Adult after 5 p.m."],
            rows: [
              ["A", "¥2,310", "¥1,980"],
              ["B", "¥2,640", "¥1,980"],
              ["C", "¥3,080", "¥2,420"],
              ["D", "¥3,300", "No night rate"],
              ["E", "¥3,630", "No night rate"],
              ["Child (4 to elementary school)", "¥1,320", "¥1,320"],
              ["70 and over", "¥1,800", "¥1,800"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                The ¥150 bath tax is extra for adults. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Solaniwa Onsen open?",
          body: (
            <p className={styles.bodyText}>
              Daily from 11 a.m. to 11 p.m.; last entry is 10 p.m. and the large baths close at 10:30 p.m. A morning bath runs
              from 6 a.m. to 9:30 a.m. (last entry 8:30). The next closing days are 9 December 2026, 13 January, 3 February
              and 10 March 2027; there is no morning bath on those days or the day after.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: solaniwaOnsenTicket.url, label: "Book the Solaniwa Onsen ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Osaka Bay",
        intro: "Solaniwa is a short ride from the Osaka Bay area, so it pairs with these.",
        tours: [santaMariaDayCruise, tempozanFerrisWheel, nifrelTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For where it fits in a trip, see <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link> and the
          <Link href="/guides/attractions/osaka-3-day-itinerary" style={linkStyle}>Osaka 3-day itinerary</Link>. For another big bathhouse, compare
          <Link href="/guides/attractions/spa-world-osaka-tickets" style={linkStyle}>Spa World Osaka</Link>; for transport, see <Link href="/guides/transport/osaka-transportation" style={linkStyle}>getting around Osaka</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Solaniwa Onsen?",
          a: `Adult admission is ¥2,310 to ¥3,630 depending on the ticket type (A to E) of the day, and ¥1,980 after 5 p.m. on A and B days. Children 4 to elementary school age pay ¥1,320. Checked ${CHECKED}.`,
        },
        {
          q: "What are the Solaniwa Onsen hours?",
          a: "Daily 11:00 to 23:00, last entry 22:00. A morning bath runs 6:00 to 9:30 except on closing days and the day after.",
        },
        {
          q: "Is a yukata included?",
          a: "Yes. Yukata, bath and face towels, shampoo, body soap and other amenities are included in the admission fee.",
        },
        {
          q: "When is Solaniwa Onsen closed?",
          a: "The coming closing days are 9 December 2026, 13 January 2027, 3 February 2027 and 10 March 2027.",
        },
        {
          q: "Is there a cheaper night rate?",
          a: "Yes. From 5 p.m. adults pay ¥1,980 on A and B days and ¥2,420 on C days. D and E days have no night rate.",
        },
      ]}
      related={[
        { href: "/guides/attractions/spa-world-osaka-tickets", title: "Spa World Osaka Tickets" },
        { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
        { href: "/guides/attractions/nifrel-osaka-tickets", title: "NIFREL Osaka Tickets" },
        { href: "/guides/attractions/osaka-3-day-itinerary", title: "Osaka 3-Day Itinerary" },
      ]}
      banner={{
        title: "An onsen evening in Osaka",
        desc: "Admission to Solaniwa Onsen with yukata and towels.",
        label: "View the Solaniwa ticket →",
      }}
    />
  );
}
