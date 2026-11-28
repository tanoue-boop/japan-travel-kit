import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nagasakiInasayamaDayTour } from "../../../lib/klook-links";
import { gloverGardenTicket, gunkanjimaCruiseTour, huisTenBoschTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the garden's own page, read by node fetch on 28 Nov 2026:
// glover-garden.jp/guide (from 1 Apr 2026 general (15 and over, excluding students) 1,300, children (elementary to high
// school) 650; annual pass 3,250 / 1,620; hours 8:00-18:00, last entry 20 minutes before closing; night openings in some
// periods (12-31 Oct to 20:00 or 21:30); 1 Nov - 31 Dec 8:00-18:00, last entry 17:40; disability reduction for the holder
// and one carer). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/glover-garden-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://glover-garden.jp/guide";
const HOURS = "https://glover-garden.jp/guide";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function GloverGardenTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Glover Garden tickets"
      title="Glover Garden Tickets 2026: Price, Hours & Night Opening"
      description="Glover Garden in Nagasaki 2026: ¥1,300 for adults (15+) and ¥650 for school-age children since April 2026. Open 8:00–18:00, with seasonal night opening."
      h1={<>Glover Garden Tickets 2026: <br />Price, Hours &amp; Night Opening</>}
      subtitle="What entry to Nagasaki’s hillside garden of western-style houses costs after the 2026 price change, and when it stays open late."
      badges={[`Checked ${CHECKED}`, "Adults ¥1,300", "Open 8:00–18:00"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to Glover Garden is ¥1,300 for adults</strong> (15 and over) and ¥650 for elementary, junior high
            and high school students, after Nagasaki City raised the fee on 1 April 2026. An annual pass is ¥3,250.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>8 a.m. to 6 p.m.</strong> through December, with last entry 20 minutes before closing; in
            some periods it opens into the evening. Klook sells an admission ticket. Glover Garden, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: gloverGardenTicket.url, label: "Check the Glover Garden ticket on Klook →" }}
      stats={[
        { label: "Adult (15+)", value: "¥1,300" },
        { label: "Child (6–18)", value: "¥650" },
        { label: "Hours", value: "8:00–18:00" },
        { label: "Last entry", value: "17:40" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> older guides quote the pre-2026 price, so budget ¥1,300 a head; the gates open at
          8 a.m. if you want the hillside quiet.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The annual pass is ¥3,250 for adults and ¥1,620 for children. Disability certificate holders and one carer pay a
              reduced fee (¥650 for adults living outside Nagasaki City).
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (15 and over)", "¥1,300"],
              ["Elementary to high school", "¥650"],
              ["Annual pass, adult", "¥3,250"],
              ["Annual pass, child", "¥1,620"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Prices from 1 April 2026. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Glover Garden open?",
          body: (
            <p className={styles.bodyText}>
              From 8 a.m. to 6 p.m., with last entry 20 minutes before closing (5:40 p.m.); this is the schedule from 1 November to
              31 December 2026. In some periods it stays open into the evening, as it did to 8 p.m. or 9:30 p.m. in late October;
              check the night-opening schedule.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: gloverGardenTicket.url, label: "Book Glover Garden on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Nagasaki",
        intro: "The garden is near Oura and the harbour, so it pairs with these.",
        tours: [gunkanjimaCruiseTour, nagasakiInasayamaDayTour, huisTenBoschTicket],
      }}
      links={
        <p className={styles.bodyText}>
          From the harbour below, the <Link href="/guides/attractions/gunkanjima-tour" style={linkStyle}>Gunkanjima tour</Link> leaves for Battleship Island, and
          <Link href="/guides/attractions/huis-ten-bosch-tickets" style={linkStyle}>Huis Ten Bosch</Link> is the other big Nagasaki day. For a route, see the
          <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5-day itinerary</Link> and the <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Glover Garden?",
          a: `¥1,300 for adults (15 and over) and ¥650 for elementary to high school students, since 1 April 2026. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "8:00 to 18:00, with last entry at 17:40. In some periods it stays open into the evening.",
        },
        {
          q: "Is there an annual pass?",
          a: "Yes: ¥3,250 for adults and ¥1,620 for children.",
        },
        {
          q: "Did the price go up?",
          a: "Yes. Nagasaki City changed the fee on 1 April 2026; older guides show the earlier, lower price.",
        },
        {
          q: "Is it accessible?",
          a: "There are moving walkways and slopes, but most paths are stone and sloped, so wheelchair users need help. Electric wheelchairs are lent free.",
        },
      ]}
      related={[
        { href: "/guides/attractions/gunkanjima-tour", title: "Gunkanjima Tour" },
        { href: "/guides/attractions/huis-ten-bosch-tickets", title: "Huis Ten Bosch Tickets" },
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5-Day Itinerary" },
        { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass" },
      ]}
      banner={{
        title: "Nagasaki’s hillside garden",
        desc: "Admission to Glover Garden.",
        label: "View the Glover Garden ticket →",
      }}
    />
  );
}
