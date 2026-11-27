import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { yufuinBeppuNoMoriTour, yufuinBeppuHitaTour } from "../../../lib/klook-links";
import { beppuJigokuTicket, harmonylandTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from the Beppu Jigoku association's own page, read by node fetch on 28 Nov 2026:
// beppu-jigoku.com/fee/index.html (common ticket for the seven hells from 1 Feb 2025: adult (high school and older)
// 2,400, child (elementary and junior high) 1,200; groups of 20+ 2,000 / 1,000; sold at every hell; valid on the day
// of purchase and the next day; one entry per hell; hours 8:00-17:00 at all seven, open every day; parking about 615
// spaces in total; the seven: Umi, Chinoike, Tatsumaki, Shiraike, Oniishibozu, Oniyama, Kamado). No Klook price (403).
const ROUTE = "/guides/attractions/beppu-hells-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.beppu-jigoku.com/fee/index.html";
const HOURS = "https://www.beppu-jigoku.com/fee/index.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function BeppuHellsTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Beppu hells tickets"
      title="Hells of Beppu Tickets 2026: Price, Hours & 7 Hells Pass"
      description="Hells of Beppu tickets 2026: one common ticket for all seven hells is ¥2,400 for adults and ¥1,200 for children, valid for 2 days. Hours 8:00–17:00 daily."
      h1={<>Hells of Beppu Tickets 2026: <br />Price, Hours &amp; 7 Hells Pass</>}
      subtitle="What the common ticket for the seven hells of Beppu costs, how long it is valid and how the hells are split between two areas."
      badges={[`Checked ${CHECKED}`, "¥2,400 for all 7", "Valid 2 days"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The <strong>common ticket for all seven Beppu hells is ¥2,400 for adults</strong> (high school and older) and
            ¥1,200 for elementary and junior high school students. It is sold at every hell, so buy it at the first one you
            visit. It is <strong>valid on the day of purchase and the next day</strong>, with one entry per hell.
          </p>
          <p className={styles.bodyText}>
            All seven hells are open from 8 a.m. to 5 p.m. every day. Klook sells the seven-hell ticket, and a version with
            a Kamenoi Bus one-day pass. Beppu Jigoku association, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: beppuJigokuTicket.url, label: "Check the Beppu hells ticket on Klook →" }}
      stats={[
        { label: "Adult, all 7 hells", value: "¥2,400" },
        { label: "Child (6–15)", value: "¥1,200" },
        { label: "Valid", value: "2 days" },
        { label: "Hours", value: "8:00–17:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the ¥2,400 ticket covers all seven hells over two days, so you can split them across
          an afternoon and the next morning.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices since 1 February 2025. The ticket is stamped with the purchase date and covers Umi, Chinoike, Tatsumaki,
              Shiraike, Oniishibozu, Oniyama and Kamado Jigoku once each.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (high school+)", "Child (elementary/junior high)"],
            rows: [
              ["Common ticket, 7 hells", "¥2,400", "¥1,200"],
              ["Group of 20 or more", "¥2,000", "¥1,000"],
              ["With disability certificate", "¥1,200", "¥600"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Resale of the ticket is not allowed. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When are the Beppu hells open?",
          body: (
            <p className={styles.bodyText}>
              All seven hells are open from 8 a.m. to 5 p.m., every day of the year. Together the seven hells have about 615 parking
              spaces.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: beppuJigokuTicket.url, label: "Book the Beppu hells ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Oita",
        intro: "Beppu sits between Yufuin and Oita, so the hells pair with these.",
        tours: [harmonylandTicket, yufuinBeppuNoMoriTour, yufuinBeppuHitaTour],
      }}
      links={
        <p className={styles.bodyText}>
          For a day trip, see <Link href="/guides/attractions/yufuin-beppu-tour-from-fukuoka" style={linkStyle}>Yufuin and Beppu tours from Fukuoka</Link>. For a longer trip,
          see the <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5-day itinerary</Link> and the
          <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass</Link>; Sanrio fans can add <Link href="/guides/attractions/harmonyland-tickets" style={linkStyle}>Harmonyland</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Beppu hells ticket?",
          a: `The common ticket for all seven hells is ¥2,400 for adults (high school and older) and ¥1,200 for elementary and junior high school students. Checked ${CHECKED}.`,
        },
        {
          q: "How long is the ticket valid?",
          a: "On the day of purchase and the next day. Each hell can be entered once.",
        },
        {
          q: "What are the opening hours?",
          a: "All seven hells open from 8:00 to 17:00 every day of the year.",
        },
        {
          q: "Where do I buy the ticket?",
          a: "At the ticket office of any of the seven hells. Buy it at the first hell you visit.",
        },
        {
          q: "Is there parking at the hells?",
          a: "Yes. The seven hells have about 615 parking spaces between them; Umi Jigoku has the most, with 230.",
        },
      ]}
      related={[
        { href: "/guides/attractions/yufuin-beppu-tour-from-fukuoka", title: "Yufuin & Beppu Tours from Fukuoka" },
        { href: "/guides/attractions/harmonyland-tickets", title: "Harmonyland Tickets" },
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5-Day Itinerary" },
        { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass" },
      ]}
      banner={{
        title: "All seven hells, one ticket",
        desc: "The Beppu Jigoku common ticket, valid for two days.",
        label: "View the Beppu hells ticket →",
      }}
    />
  );
}
