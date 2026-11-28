import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrKansaiHiroshimaAreaPass } from "../../../lib/klook-links";
import { okayamaCastleTicket, kojimaBusDenimPass, jrOkayamaHiroshimaYamaguchiAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the castle's own page, read by node fetch on 28 Nov 2026:
// okayama-castle.jp/guide (9:00-17:30, last entry 17:00; closed 29-31 Dec; adult (15+) 500 (groups of 20+ 400), junior
// high and younger free; combined tickets Korakuen + keep 800, + Hayashibara Museum 1,280, + Yumeji Art Museum 1,440;
// tram from JR Okayama bound for Higashiyama about 5 minutes to Shiroshita, then about 10 minutes on foot).
// No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/okayama-castle-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://okayama-castle.jp/guide";
const HOURS = "https://okayama-castle.jp/guide";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function OkayamaCastleTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Okayama Castle tickets"
      title="Okayama Castle Tickets 2026: Price, Hours & Korakuen Combo"
      description="Okayama Castle 2026: the keep is ¥500 for ages 15 and over and free for younger children; ¥800 with Korakuen Garden. Open 9:00–17:30, last entry 17:00."
      h1={<>Okayama Castle Tickets 2026: <br />Price, Hours &amp; Korakuen Combo</>}
      subtitle="What entry to the black castle costs, the combined ticket with Korakuen Garden, and how to walk there from the station tram."
      badges={[`Checked ${CHECKED}`, "Adults ¥500", "Under 15 free"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to the keep of Okayama Castle is ¥500</strong> for visitors aged 15 and over; junior high school
            students and younger enter free. The <strong>combined ticket with Korakuen Garden is ¥800</strong>, the easiest
            way to see both sides of the river.
          </p>
          <p className={styles.bodyText}>
            The keep is open <strong>9 a.m. to 5:30 p.m.</strong> (last entry 5 p.m.) and closed from 29 to 31 December. From
            JR Okayama Station, take the tram for Higashiyama to Shiroshita (about 5 minutes) and walk about 10 minutes.
            Klook sells a keep admission. Okayama Castle, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: okayamaCastleTicket.url, label: "Check the Okayama Castle ticket on Klook →" }}
      stats={[
        { label: "Adult (15+)", value: "¥500" },
        { label: "Junior high and younger", value: "Free" },
        { label: "With Korakuen", value: "¥800" },
        { label: "Hours", value: "9:00–17:30" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the ¥800 combined ticket if you will also walk through Korakuen; on its own the keep
          is a short, cheap visit.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Groups of 20 or more pay ¥400. Other combined tickets add the Hayashibara Museum of Art (¥1,280 with Korakuen and
              the keep) or the Yumeji Art Museum (¥1,440).
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Keep, aged 15 and over", "¥500"],
              ["Junior high school and younger", "Free"],
              ["Korakuen + keep", "¥800"],
              ["Korakuen + keep + Hayashibara Museum of Art", "¥1,280"],
              ["Korakuen + keep + Yumeji Art Museum", "¥1,440"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Group rate ¥400 from 20 people. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Okayama Castle open?",
          body: (
            <p className={styles.bodyText}>
              From 9 a.m. to 5:30 p.m., with last entry at 5 p.m. It is closed from 29 to 31 December and may close for bad
              weather or inspections. The tram for Higashiyama from JR Okayama Station takes about 5 minutes to Shiroshita,
              then it is about 10 minutes on foot.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: okayamaCastleTicket.url, label: "Book Okayama Castle on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Okayama and the Inland Sea",
        intro: "Okayama is on the Sanyo Shinkansen, so the castle pairs with these.",
        tours: [kojimaBusDenimPass, jrOkayamaHiroshimaYamaguchiAreaPass, jrKansaiHiroshimaAreaPass],
      }}
      links={
        <p className={styles.bodyText}>
          For trains, see the <Link href="/guides/transport/okayama-hiroshima-yamaguchi-area-pass" style={linkStyle}>Okayama-Hiroshima-Yamaguchi Area Pass</Link> and the
          <Link href="/guides/transport/kansai-hiroshima-area-pass" style={linkStyle}>Kansai-Hiroshima Area Pass</Link>. Nearby in Kojima, the
          <Link href="/guides/attractions/betty-smith-jeans-making-experience" style={linkStyle}>Betty Smith jeans making experience</Link> makes a second stop.
        </p>
      }
      faq={[
        {
          q: "How much is Okayama Castle?",
          a: `¥500 for visitors aged 15 and over; junior high school students and younger are free. Checked ${CHECKED}.`,
        },
        {
          q: "Is there a ticket with Korakuen?",
          a: "Yes. Korakuen Garden and the castle keep together are ¥800.",
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 17:30, with last entry at 17:00.",
        },
        {
          q: "When is it closed?",
          a: "From 29 to 31 December, and occasionally for weather or inspections.",
        },
        {
          q: "How do I get there from Okayama Station?",
          a: "Take the tram bound for Higashiyama to Shiroshita (about 5 minutes) and walk about 10 minutes.",
        },
      ]}
      related={[
        { href: "/guides/transport/okayama-hiroshima-yamaguchi-area-pass", title: "Okayama-Hiroshima-Yamaguchi Area Pass" },
        { href: "/guides/transport/kansai-hiroshima-area-pass", title: "Kansai-Hiroshima Area Pass" },
        { href: "/guides/attractions/betty-smith-jeans-making-experience", title: "Betty Smith Jeans Making" },
        { href: "/guides/attractions/hiroshima-2-day-itinerary", title: "Hiroshima 2-Day Itinerary" },
      ]}
      banner={{
        title: "The black castle by Korakuen",
        desc: "Admission to the keep of Okayama Castle.",
        label: "View the Okayama Castle ticket →",
      }}
    />
  );
}
