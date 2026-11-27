import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { asakusaSensojiWalkingTour, skytreeTicket } from "../../../lib/klook-links";
import { tokyoNationalMuseumTicket, hanayashikiTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from the Tokyo National Museum's own site, read by node fetch on 28 Nov 2026:
// tnm.jp/modules/r_free_page/index.php?id=113&lang=en (collection exhibitions 1,000 yen adults, 500 university
// students; free for under 18 and over 70 and for persons with disabilities plus one caregiver; online tickets
// valid two months; special exhibitions ticketed separately and include the collection on the same day;
// 9:30-17:00, to 20:00 on Fridays, Saturdays and Sundays before a Monday holiday; last admission 30 minutes
// before closing; closed Mondays (Tuesday after a Monday holiday), 26-31 Dec 2026; 1 Jan 2027 12:00-20:00;
// JR Ueno or Uguisudani 10 minutes on foot). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/tokyo-national-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en";
const HOURS = "https://www.tnm.jp/modules/r_free_page/index.php?id=113&lang=en";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TokyoNationalMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Tokyo National Museum"
      title="Tokyo National Museum Tickets 2026: Price, Hours & Closed"
      description="Tokyo National Museum in Ueno: collection ¥1,000 for adults, free under 18. Open 9:30–17:00, Fri–Sat to 20:00; closed Mondays and 26–31 Dec 2026."
      h1={<>Tokyo National Museum Tickets 2026: <br />Price, Hours &amp; Closed Days</>}
      subtitle="The national museum in Ueno Park: what the collection ticket costs, who goes free, late openings and the year-end closure."
      badges={[`Checked ${CHECKED}`, "¥1,000 adult", "Ueno Park"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A ticket for the Tokyo National Museum collection exhibitions is <strong>¥1,000 for adults</strong> and ¥500
            for university students. Visitors under 18 and over 70 go free (bring proof of age). Special exhibitions
            have their own tickets, which also cover the collection on the same day.
          </p>
          <p className={styles.bodyText}>
            The museum opens 9:30–17:00, and to 20:00 on Fridays and Saturdays. It is closed on Mondays and from 26 to
            31 December 2026, and opens 12:00–20:00 on 1 January 2027. It is 10 minutes on foot from JR Ueno Station.
            Klook sells collection tickets. Tokyo National Museum, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: tokyoNationalMuseumTicket.url, label: "Check Tokyo National Museum tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,000" },
        { label: "University", value: "¥500" },
        { label: "Under 18 / over 70", value: "Free" },
        { label: "Closed", value: "Mondays" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the collection ticket online to skip the gate queue, and use a Friday or Saturday
          evening if your days are full.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Online collection tickets are valid on any open day for two months from purchase. Persons with
              disabilities and one caregiver go free. Special exhibitions are priced separately on their own websites.
            </p>
          ),
          table: {
            head: ["Collection exhibitions", "Price"],
            rows: [
              ["Adult", "¥1,000"],
              ["University student", "¥500"],
              ["Under 18 and over 70", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells the collection ticket at its own price; special exhibitions are separate.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Opening hours are 9:30–17:00, extended to 20:00 on Fridays, Saturdays and on Sundays before a Monday holiday;
              last admission is 30 minutes before closing. The museum is closed on Mondays (on a Monday holiday it opens
              and closes the next day instead) and for the year-end break from 26 to 31 December 2026. On 1 January
              2027 it opens 12:00–20:00. It is 10 minutes on foot from JR Ueno or Uguisudani Station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: tokyoNationalMuseumTicket.url, label: "Book the Tokyo National Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Ueno and Asakusa",
        intro: "Asakusa is a short ride on the Ginza Line from Ueno, and the Skytree is across the river.",
        tours: [asakusaSensojiWalkingTour, hanayashikiTicket, skytreeTicket],
      }}
      links={
        <p className={styles.bodyText}>
          To plan the day, see the <Link href="/guides/attractions/tokyo-2-day-itinerary" style={linkStyle}>Tokyo 2-day itinerary</Link>, the
          <Link href="/guides/attractions/tokyo-4-day-itinerary" style={linkStyle}>Tokyo 4-day itinerary</Link> and
          <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>. Nearby in Asakusa, see
          <Link href="/guides/attractions/asakusa-hanayashiki-tickets" style={linkStyle}>Asakusa Hanayashiki</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Tokyo National Museum?",
          a: `Collection exhibitions are ¥1,000 for adults and ¥500 for university students; under-18s and over-70s go free. Checked ${CHECKED}.`,
        },
        {
          q: "When is the Tokyo National Museum closed?",
          a: "On Mondays (the next day after a Monday holiday) and from 26 to 31 December 2026.",
        },
        {
          q: "Is it open late?",
          a: "Yes. It stays open to 20:00 on Fridays and Saturdays, and on Sundays before a Monday holiday.",
        },
        {
          q: "Does a special exhibition ticket include the collection?",
          a: "Yes. A special exhibition ticket also lets you see the collection exhibitions on the same day.",
        },
        {
          q: "How do I get there?",
          a: "Walk about 10 minutes from JR Ueno or Uguisudani Station, or about 15 minutes from the Tokyo Metro at Ueno.",
        },
      ]}
      related={[
        { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo" },
        { href: "/guides/attractions/tokyo-2-day-itinerary", title: "Tokyo 2-Day Itinerary" },
        { href: "/guides/attractions/asakusa-hanayashiki-tickets", title: "Asakusa Hanayashiki Tickets" },
        { href: "/guides/attractions/tokyo-skytree-tickets", title: "Tokyo Skytree Tickets" },
      ]}
      banner={{
        title: "Japanese art in Ueno Park",
        desc: "Collection ticket for the Tokyo National Museum.",
        label: "View museum tickets →",
      }}
    />
  );
}
