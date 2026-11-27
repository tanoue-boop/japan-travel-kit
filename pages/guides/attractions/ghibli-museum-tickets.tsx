import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { ghibliMuseumTicket } from "../../../lib/klook-links-a35";
import { shinjukuNightFoodWalkingTour, goldenGaiFoodTastingExperience, shinjukuBarHoppingNightTour } from "../../../lib/klook-links";

// Task jtk-20261127-A35. Every figure is from the museum's own English site, read by
// node fetch on 27 Nov 2026: ghibli-museum.jp/en/tickets/ (prices by age, advance
// reservation only, LAWSON TICKET release at 10:00 JST on the 10th for the next
// month, dated entry time with no exit time, the Sunrise Tours JTB bus tour, the
// no-resale line) and /en/hours-and-directions/ (10:00–18:00, address, JR Mitaka
// south exit 15 min on foot, ~20 min from Shinjuku on the Chuo Line, community bus
// every 15 min at ¥230 adult). The current film and exhibition are from the same
// pages' sidebar. Klook's own price is not printed (Klook answers automated reads
// with HTTP 403).
const ROUTE = "/guides/attractions/ghibli-museum-tickets";
const CHECKED = checkedLabel("2026-11-27");
const TICKETS_URL = "https://www.ghibli-museum.jp/en/tickets/";
const HOURS_URL = "https://www.ghibli-museum.jp/en/hours-and-directions/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function GhibliMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Things to Do", href: "/guides/attractions" }}
      crumb="Ghibli Museum Tickets"
      title="Ghibli Museum Tickets 2026: Price, Release Date & Booking"
      description="Ghibli Museum tickets are ¥1,000 for adults and sold only in advance: LAWSON TICKET opens next month at 10:00 JST on the 10th. Open 10:00–18:00."
      h1={<>Ghibli Museum Tickets 2026: <br />Price, Release Date &amp; Booking</>}
      subtitle="The Ghibli Museum in Mitaka sells no tickets at the door. Here is when each month goes on sale, what it costs, and the two ways to book from overseas."
      badges={[`Checked ${CHECKED}`, "Adults ¥1,000", "Advance booking only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Ghibli Museum tickets cost <strong>¥1,000 for ages 19 and over</strong>, ¥700 for 13–18, ¥400 for 7–12,
            ¥100 for 4–6, and nothing for 3 and under. <strong>Every visit needs a dated ticket bought in
            advance</strong> — nothing is sold at the museum. The official online seller, LAWSON TICKET, releases a
            whole month at <strong>10:00 JST on the 10th of the month before</strong> (February tickets go on sale on
            10 January), and each ticket fixes an entry date and time but no exit time.
          </p>
          <p className={styles.bodyText}>
            The museum is open 10:00–18:00 and is a 15-minute walk from the south exit of JR Mitaka Station, about 20
            minutes from Shinjuku on the JR Chuo Line. If the LAWSON date you want is gone or you would rather not
            queue online at release time, Klook sells dated entry as a travel agent at its own price. Figures from the
            museum&apos;s site, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: ghibliMuseumTicket.url, label: "Check Ghibli Museum tickets on Klook →" }}
      stats={[
        { label: "Adult (19+)", value: "¥1,000" },
        { label: "Hours", value: "10:00–18:00, dated entry time" },
        { label: "On sale", value: "10th of the previous month, 10:00 JST (LAWSON TICKET)" },
        { label: "At the door", value: "No tickets sold" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> decide your Tokyo dates first, then be online at 10:00 Japan time on the 10th
          of the month before. LAWSON TICKET at ¥1,000 is the cheapest route; Klook costs more but is the fallback
          for travellers who missed release day or want an agent to handle it.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much are Ghibli Museum tickets?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              These are the museum&apos;s own prices, the ones LAWSON TICKET charges. A travel agent such as Klook sets
              its own price on top.
            </p>
          ),
          table: {
            head: ["Age", "Price"],
            rows: [
              ["19 and over", "¥1,000"],
              ["13 to 18", "¥700"],
              ["7 to 12", "¥400"],
              ["4 to 6", "¥100"],
              ["3 and under", "Free"],
            ],
            note: (
              <>
                Ghibli Museum, Mitaka, tickets page, checked {CHECKED}.{" "}
                <a href={TICKETS_URL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
              </>
            ),
          },
        },
        {
          label: "Release dates",
          title: "When do Ghibli Museum tickets go on sale?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Not a lottery: LAWSON TICKET sells a whole month at once, at 10:00 JST on the 10th of the month before,
              and popular slots go first. Convert 10:00 JST to your own time zone before the day.
            </p>
          ),
          table: {
            head: ["Visit month", "LAWSON TICKET opens (10:00 JST)"],
            rows: [
              ["January 2027", "10 December 2026"],
              ["February 2027", "10 January 2027"],
              ["March 2027", "10 February 2027"],
            ],
            note: (
              <>
                From the museum&apos;s rule &ldquo;10 a.m. (JST) on the 10th of each month for the subsequent
                month&rdquo;, checked {CHECKED}. The museum calendar on the same page marks closed days.
              </>
            ),
          },
        },
        {
          label: "Booking",
          title: "How do I book Ghibli Museum tickets from overseas?",
          body: (
            <>
              <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
                The museum names two routes for visitors outside Japan; Klook is a third, as a travel agent. The museum
                also states that buying tickets for resale is not allowed.
              </p>
            </>
          ),
          table: {
            head: ["Route", "What you get", "Notes"],
            rows: [
              ["LAWSON TICKET (online, English)", "A dated, timed ticket at ¥1,000", "Opens 10:00 JST on the 10th for the next month"],
              ["Sunrise Tours JTB bus tour", "A tour with the museum among several stops", "Booked on Sunrise Tours' English site"],
              ["Klook (travel agent)", "Dated entry through Klook, at Klook's price", "Read the listing for its booking window and confirmation timing"],
            ],
            note: <>Ghibli Museum tickets page, checked {CHECKED}. Klook&apos;s terms are on its listing.</>,
          },
          ctas: [{ href: ghibliMuseumTicket.url, label: "See Klook's Ghibli Museum dates →" }],
        },
        {
          label: "Getting there",
          title: "How do I get to the Ghibli Museum?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Take the JR Chuo Line to Mitaka (about 20 minutes from Shinjuku), then walk 15 minutes from the south
              exit or take the community bus, which runs every 15 minutes during opening hours.
            </p>
          ),
          table: {
            head: ["Item", "Detail"],
            rows: [
              ["Address", "1-1-83 Shimorenjaku, Mitaka-shi, Tokyo 181-0013"],
              ["Hours", "10:00–18:00 (entry at the time on your ticket)"],
              ["Train", "JR Chuo Line to Mitaka, about 20 min from Shinjuku; 15 min on foot from the south exit"],
              ["Community bus", "From JR Mitaka Station every 15 min: adult ¥230 (cash or IC), child 7–12 ¥120 cash / ¥50 IC"],
              ["Now showing", "Short film “Treasure Hunting”, 19 November – 26 December 2026"],
              ["Exhibition", "“The Studio of Yuriko Yamawaki — Treasure from an Artist's Clutter”, from 19 November 2025"],
            ],
            note: (
              <>
                Ghibli Museum, hours and directions page, checked {CHECKED}.{" "}
                <a href={HOURS_URL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
              </>
            ),
          },
        },
      ]}
      sameDay={{
        heading: "Shinjuku the same evening",
        intro: "Mitaka is about 20 minutes from Shinjuku on the Chuo Line, so the museum fits before a guided evening there.",
        tours: [shinjukuNightFoodWalkingTour, goldenGaiFoodTastingExperience, shinjukuBarHoppingNightTour],
      }}
      links={
        <p className={styles.bodyText}>
          The Ghibli Museum is different from Ghibli Park near Nagoya, which has its own release dates in our{" "}
          <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>Ghibli Park tickets guide</Link>. For the rest of
          the Tokyo days, see{" "}
          <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>, the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/tokyo-4-day-itinerary" style={linkStyle}>Tokyo 4 day itinerary</Link>. Getting to Mitaka on
          the JR lines is covered in{" "}
          <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>getting around Tokyo</Link>.
          {" "}Another storybook park near Tokyo: <Link href="/guides/attractions/moominvalley-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Moominvalley Park</Link> in Hanno (¥3,900 in advance for adults).
        </p>
      }
      faq={[
        {
          q: "How much are Ghibli Museum tickets?",
          a: `¥1,000 for ages 19 and over, ¥700 for 13 to 18, ¥400 for 7 to 12, ¥100 for 4 to 6, free for 3 and under. Ghibli Museum site, checked ${CHECKED}.`,
        },
        {
          q: "When do Ghibli Museum tickets go on sale?",
          a: "On LAWSON TICKET at 10:00 JST on the 10th of each month, for the following month. For example, February tickets go on sale on 10 January.",
        },
        {
          q: "Can I buy Ghibli Museum tickets at the door?",
          a: "No. All admission is by advance reservation, and no reservation or ticket purchase can be made at the museum.",
        },
        {
          q: "How long can I stay in the Ghibli Museum?",
          a: "Tickets fix an entry date and time but have no set exit time; you can stay until the museum closes at 18:00.",
        },
        {
          q: "Is the Ghibli Museum the same as Ghibli Park?",
          a: "No. The Ghibli Museum is in Mitaka, western Tokyo. Ghibli Park is in Aichi near Nagoya and sells its own tickets.",
        },
      ]}
      related={[
        { href: "/guides/attractions/ghibli-park-tickets", title: "Ghibli Park Tickets 2026: How to Buy, Prices & Release Dates" },
        { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo" },
      ]}
      banner={{
        title: "Missed the 10th?",
        desc: "LAWSON TICKET is the cheapest route on release day; Klook sells dated entry as a travel agent at its own price.",
        label: "View Ghibli Museum tickets on Klook →",
      }}
    />
  );
}
