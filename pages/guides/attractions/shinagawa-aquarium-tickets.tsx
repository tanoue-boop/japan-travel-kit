import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { legolandDiscoveryCenterTokyoTicket } from "../../../lib/klook-links";
import { shinagawaAquariumTicket, maxellAquaParkShinagawaTicket, sumidaAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Every figure is from Shinagawa
// Aquarium's own Japanese pages, read by node fetch on 28 Nov 2026: aquarium.gr.jp/price
// (10:00-17:00, entry until 16:30; adult high school and up 1,350 yen, elementary and
// junior high 600, age 4+ 300, 65+ 1,200; disability rate half; Shinagawa residents,
// workers and students 800 / 400 / 200 / 700 at the counter only), the top page and
// /access_bus (free shuttle bus from the east exit rotary stop 6 at Oimachi Station, about
// 15 minutes, schedule on a calendar; address 3-2-1 Katsushima, Shinagawa-ku).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/shinagawa-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.aquarium.gr.jp/price";
const BUS = "https://www.aquarium.gr.jp/access_bus";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShinagawaAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Shinagawa Aquarium Tickets"
      title="Shinagawa Aquarium Tickets 2026: Price, Hours & Free Bus"
      description="Shinagawa Aquarium is ¥1,350 for adults and ¥600 for pupils, open 10:00–17:00, with a free shuttle bus from Oimachi. Not the same as Maxell Aqua Park."
      h1={<>Shinagawa Aquarium Tickets 2026: <br />Price, Hours &amp; Free Bus</>}
      subtitle="The aquarium in Katsushima, Shinagawa — not the Maxell Aqua Park by Shinagawa Station: prices, hours and the free bus."
      badges={[`Checked ${CHECKED}`, "¥1,350 adult", "Tokyo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Shinagawa Aquarium ticket is <strong>¥1,350 for adults</strong> (high school and up), ¥600 for
            elementary and junior high pupils, ¥300 for children aged 4 and over and ¥1,200 for over-65s.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>10:00–17:00</strong>, with entry until 16:30. A free shuttle bus runs from stop 6 at
            the east exit of Oimachi Station (about 15 minutes). This is a different aquarium from Maxell Aqua
            Park Shinagawa. Klook sells the ticket. Shinagawa Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: shinagawaAquariumTicket.url, label: "Check Shinagawa Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,350" },
        { label: "Elementary / junior high", value: "¥600" },
        { label: "Hours", value: "10:00–17:00" },
        { label: "Shuttle", value: "Free from Oimachi" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> at ¥1,350 it costs about half the adult price of Maxell Aqua Park
          (¥2,800). Check the shuttle calendar, and arrive by 16:30.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Shinagawa Aquarium?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              With a disability certificate, the holder and one companion pay half. Local residents get a discount
              at the counter only.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (high school and up)", "¥1,350"],
              ["Senior (65+)", "¥1,200"],
              ["Elementary and junior high", "¥600"],
              ["Child (4+)", "¥300"],
            ],
            note: (
              <>
                Shinagawa Aquarium prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "How do you get to Shinagawa Aquarium?",
          body: (
            <p className={styles.bodyText}>
              The aquarium is at 3-2-1 Katsushima, Shinagawa-ku. The free shuttle bus leaves from stop 6 at the east
              exit bus rotary of Oimachi Station (JR, Tokyu and Rinkai lines) and takes about 15 minutes; it does not
              run on closed days.{" "}
              <a href={BUS} target="_blank" rel="noopener" style={linkStyle}>Shuttle schedule</a>.
            </p>
          ),
          ctas: [{ href: shinagawaAquariumTicket.url, label: "Book Shinagawa Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "More aquariums and indoor tickets in Tokyo",
        intro: "For a second stop, or to compare with the other Shinagawa aquarium.",
        tours: [maxellAquaParkShinagawaTicket, sumidaAquariumTicket, legolandDiscoveryCenterTokyoTicket],
      }}
      links={
        <p className={styles.bodyText}>
          Compare{" "}
          <Link href="/guides/attractions/maxell-aqua-park-shinagawa-tickets" style={linkStyle}>Maxell Aqua Park Shinagawa</Link>,{" "}
          <Link href="/guides/attractions/sumida-aquarium-tickets" style={linkStyle}>Sumida Aquarium</Link> and{" "}
          <Link href="/guides/attractions/sunshine-aquarium-tickets" style={linkStyle}>Sunshine Aquarium</Link>. With
          children, the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          has more ideas.
        </p>
      }
      faq={[
        {
          q: "How much is Shinagawa Aquarium?",
          a: `¥1,350 for adults (high school and up), ¥1,200 for over-65s, ¥600 for elementary and junior high pupils and ¥300 for children aged 4 and over. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "10:00–17:00, with entry until 16:30.",
        },
        {
          q: "Is there a free bus?",
          a: "Yes. A free shuttle runs from stop 6 at the east exit of Oimachi Station, about 15 minutes; check the calendar on the official site.",
        },
        {
          q: "Is it the same as Maxell Aqua Park Shinagawa?",
          a: "No. Maxell Aqua Park is by Shinagawa Station; Shinagawa Aquarium is in Katsushima, reached from Oimachi.",
        },
        {
          q: "Can I buy Shinagawa Aquarium tickets on Klook?",
          a: "Yes. Klook sells a Shinagawa Aquarium e-ticket, valid any time within opening hours on the day.",
        },
      ]}
      related={[
        { href: "/guides/attractions/maxell-aqua-park-shinagawa-tickets", title: "Maxell Aqua Park Shinagawa Tickets" },
        { href: "/guides/attractions/sumida-aquarium-tickets", title: "Sumida Aquarium Tickets" },
        { href: "/guides/attractions/sunshine-aquarium-tickets", title: "Sunshine Aquarium Tickets" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
      ]}
      banner={{
        title: "An aquarium in Shinagawa",
        desc: "Admission to Shinagawa Aquarium in Katsushima.",
        label: "View Shinagawa Aquarium tickets →",
      }}
    />
  );
}
