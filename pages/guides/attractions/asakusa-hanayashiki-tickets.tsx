import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { asakusaGoKartTour, asakusaKimonoYae, asakusaSensojiWalkingTour } from "../../../lib/klook-links";
import { hanayashikiTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Asakusa
// Hanayashiki's own site, read by node fetch on 28 Nov 2026: hanayashiki.net/fee/ (One Day
// Pass, entry + unlimited rides: adult, junior high to 64, 4,600 yen; child 5 to elementary
// 3,400; 65+ 3,400; 0-4 free, some rides charged. Entry only 1,600 / 800 / 800, 0-4 free.
// Ride pass bought inside 3,000 / 2,600 / 2,600. Ride tickets 11 for 1,000 yen, 100 yen each),
// /access/ (2-28-1 Asakusa; 10:00-18:00, varies by season and weather, last entry 30 min
// before closing; Tsukuba Express Asakusa 5 min on foot, Ginza / Asakusa lines and Tobu
// Asakusa 10 min) and en.hanayashiki.net (calls itself the oldest amusement park in Japan;
// notice: the Roller Coaster is suspended for maintenance 30 Nov - 11 Dec 2026).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/asakusa-hanayashiki-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.hanayashiki.net/fee/";
const NOTICE = "https://en.hanayashiki.net/archives/20260505/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function AsakusaHanayashikiTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Asakusa Hanayashiki Tickets"
      title="Asakusa Hanayashiki Tickets 2026: Price, Hours & Rides"
      description="Hanayashiki, Asakusa: entry ¥1,600 for adults, One Day Pass with unlimited rides ¥4,600. Open 10:00–18:00; roller coaster shut 30 Nov – 11 Dec 2026."
      h1={<>Asakusa Hanayashiki Tickets 2026: <br />Price, Hours &amp; Rides</>}
      subtitle="The Asakusa amusement park that calls itself Japan's oldest: entry versus the One Day Pass, ride tickets, opening hours and the December roller-coaster closure."
      badges={[`Checked ${CHECKED}`, "From ¥1,600", "Asakusa"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Entry to Hanayashiki is <strong>¥1,600 for adults</strong> (junior high to 64) and ¥800 for children
            aged 5 to elementary and for over-65s; rides cost extra. The <strong>One Day Pass</strong> with
            unlimited rides is ¥4,600 for adults and ¥3,400 for children and seniors. Under-5s enter free.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>10:00–18:00</strong> (varies with season and weather), last entry 30 minutes before
            closing. The Roller Coaster is suspended for maintenance from 30 November to 11 December 2026. Klook
            sells the ticket. Hanayashiki, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hanayashikiTicket.url, label: "Check Hanayashiki tickets on Klook →" }}
      stats={[
        { label: "Entry (adult)", value: "¥1,600" },
        { label: "One Day Pass", value: "¥4,600" },
        { label: "Hours", value: "10:00–18:00" },
        { label: "Roller Coaster", value: "Shut 30 Nov–11 Dec" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> with children who will ride a lot, the One Day Pass pays; for a look round and a
          ride or two, buy entry and ride tickets (11 for ¥1,000).
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Hanayashiki?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Rides are paid with ride tickets (¥100 each, 11 for ¥1,000) unless you have a pass. The ride pass on its
              own is sold at the ticket house inside the park. Children aged 4 and under ride free with a paying
              companion of junior high age or older, with a few exceptions.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (junior high–64)", "Child (5–elementary)", "65+"],
            rows: [
              ["One Day Pass (entry + unlimited rides)", "¥4,600", "¥3,400", "¥3,400"],
              ["Entry only", "¥1,600", "¥800", "¥800"],
              ["Ride pass (bought inside)", "¥3,000", "¥2,600", "¥2,600"],
            ],
            note: (
              <>
                Asakusa Hanayashiki prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Usually 10:00–18:00; hours change with the season and weather, and the last entry is 30 minutes before
              closing. Hanayashiki is at 2-28-1 Asakusa, 5 minutes on foot from Asakusa Station on the Tsukuba Express
              and 10 minutes from the Ginza line, Asakusa line and Tobu Asakusa stations. The Roller Coaster does not
              run from 30 November to 11 December 2026.{" "}
              <a href={NOTICE} target="_blank" rel="noopener" style={linkStyle}>Maintenance notice</a>.
            </p>
          ),
          ctas: [{ href: hanayashikiTicket.url, label: "Book Hanayashiki on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Asakusa",
        intro: "Hanayashiki is in the Senso-ji area, so a temple walk, a kimono or a kart ride fits the same day.",
        tours: [asakusaSensojiWalkingTour, asakusaKimonoYae, asakusaGoKartTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the day, see{" "}
          <Link href="/guides/attractions/asakusa-kimono-rental" style={linkStyle}>Asakusa kimono rental</Link>,{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo with kids</Link> and{" "}
          <Link href="/guides/attractions/tokyo-skytree-tickets" style={linkStyle}>Tokyo Skytree tickets</Link>. For more ideas, see{" "}
          <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>.
          {" "}A short ride away in Ueno, the <Link href="/guides/attractions/tokyo-national-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Tokyo National Museum</Link> is ¥1,000 for adults (closed Mondays).
        </p>
      }
      faq={[
        {
          q: "How much is Asakusa Hanayashiki?",
          a: `Entry is ¥1,600 for adults and ¥800 for children and over-65s; the One Day Pass with unlimited rides is ¥4,600 for adults. Checked ${CHECKED}.`,
        },
        {
          q: "What are Hanayashiki's opening hours?",
          a: "Usually 10:00–18:00, changing with the season and weather. Last entry is 30 minutes before closing.",
        },
        {
          q: "Is the Hanayashiki roller coaster running?",
          a: "Not from 30 November to 11 December 2026, when it is suspended for scheduled maintenance.",
        },
        {
          q: "How do I get to Hanayashiki?",
          a: "It is 5 minutes on foot from Asakusa Station on the Tsukuba Express, or 10 minutes from the Ginza line, Asakusa line and Tobu stations.",
        },
        {
          q: "Can I buy Hanayashiki tickets on Klook?",
          a: "Yes. Klook sells a Hanayashiki ticket; check which ticket type the option includes before booking.",
        },
      ]}
      related={[
        { href: "/guides/attractions/asakusa-kimono-rental", title: "Asakusa Kimono Rental" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/tokyo-skytree-tickets", title: "Tokyo Skytree Tickets" },
        { href: "/guides/attractions/tokyo-go-kart", title: "Tokyo Go-Kart" },
      ]}
      banner={{
        title: "Rides in old Asakusa",
        desc: "Tickets for Asakusa Hanayashiki.",
        label: "View Hanayashiki tickets →",
      }}
    />
  );
}
