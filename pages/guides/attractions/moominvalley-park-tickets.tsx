import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { seibuKawagoePass, kawagoeMorningWalkingTour, kawagoeKimonoVasara } from "../../../lib/klook-links";
import { moominvalleyParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from Moominvalley Park / metsa's own site, read by node fetch on 28 Nov 2026:
// metsa-hanno.com/en/fee/ (one-day pass: advance 3,900 yen adult, 1,000 child aged 4 to high school; on the
// day 4,300 / 1,300; same-day tickets on sale until 1 hour before closing; parking 1,000 yen weekdays, 1,500
// weekends), the site header (28 Nov 2026: park 10:00-20:00), the news list (both areas closed 12-14 Jan 2027)
// and /access/ (free shuttle buses from Komagawa and Higashi-Hanno stations every day, free direct bus from
// Kawagoe by reservation, Seibu digital ticket with the bus from Hanno Station north exit).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/moominvalley-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://metsa-hanno.com/en/fee/";
const HOURS = "https://metsa-hanno.com/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MoominvalleyParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Moominvalley Park"
      title="Moominvalley Park Tickets 2026: Price, Hours & Access"
      description="Moominvalley Park in Hanno, Saitama: one-day pass ¥3,900 in advance or ¥4,300 on the day for adults, ¥1,000 for children. Hours, closed days and buses."
      h1={<>Moominvalley Park Tickets 2026: <br />Price, Hours &amp; Access</>}
      subtitle="The Moomin theme park by Lake Miyazawa in Hanno, Saitama: what the one-day pass costs, when it is open and the buses from the station."
      badges={[`Checked ${CHECKED}`, "¥3,900 in advance", "Hanno, Saitama"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Moominvalley Park one-day pass is <strong>¥3,900 for adults bought in advance</strong> or ¥4,300 on the
            day. Children aged 4 up to high school pay ¥1,000 in advance or ¥1,300 on the day. Same-day tickets are
            sold until one hour before closing.
          </p>
          <p className={styles.bodyText}>
            Hours change by date; on 28 November 2026 the park opened 10:00–20:00. It is closed from 12 to 14
            January 2027. Free shuttle buses run every day from Higashi-Hanno and Komagawa stations. Klook sells the
            one-day pass. Moominvalley Park, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: moominvalleyParkTicket.url, label: "Check Moominvalley Park tickets on Klook →" }}
      stats={[
        { label: "Adult (advance)", value: "¥3,900" },
        { label: "Adult (on the day)", value: "¥4,300" },
        { label: "Child 4–18", value: "¥1,000–1,300" },
        { label: "Closed", value: "12–14 Jan 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the pass before the day to save ¥400 per adult, and use the free shuttle from
          Higashi-Hanno or Komagawa if you are not on the Seibu line.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Advance tickets are sold online and at convenience stores; on-the-day tickets at the ticket booth. Children
              are aged 4 and over up to high school age. Parking is ¥1,000 a day on weekdays (free for the first two
              hours) and ¥1,500 at weekends and on holidays.
            </p>
          ),
          table: {
            head: ["One-day pass", "Advance", "On the day"],
            rows: [
              ["Adult", "¥3,900", "¥4,300"],
              ["Child (4 to high school)", "¥1,000", "¥1,300"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells the one-day pass at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Opening hours change by date, so check the calendar; on 28 November 2026 the park opened 10:00–20:00. The
              park and metsä Village are both closed from 12 to 14 January 2027. Free shuttle buses run every day from
              Higashi-Hanno Station and Komagawa Station, and a free direct bus from Kawagoe Station needs a
              reservation. Seibu Railway sells a digital day ticket that includes the route bus from the north exit of
              Hanno Station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: moominvalleyParkTicket.url, label: "Book Moominvalley Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Kawagoe and the Seibu line",
        intro: "Kawagoe is on the way from Tokyo, and the park runs a free direct bus from Kawagoe Station.",
        tours: [seibuKawagoePass, kawagoeMorningWalkingTour, kawagoeKimonoVasara],
      }}
      links={
        <p className={styles.bodyText}>
          For the day out, see the <Link href="/guides/attractions/kawagoe-day-trip" style={linkStyle}>Kawagoe day trip</Link> and the
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>. For other character parks, see
          <Link href="/guides/attractions/sanrio-puroland-tickets" style={linkStyle}>Sanrio Puroland tickets</Link> and the
          <Link href="/guides/attractions/ghibli-museum-tickets" style={linkStyle}>Ghibli Museum</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Moominvalley Park?",
          a: `A one-day pass is ¥3,900 for adults in advance and ¥4,300 on the day; children aged 4 to high school pay ¥1,000 in advance or ¥1,300. Checked ${CHECKED}.`,
        },
        {
          q: "What time does Moominvalley Park open?",
          a: "Hours change by date. On 28 November 2026 the park opened 10:00–20:00; check the official calendar for your day.",
        },
        {
          q: "Is Moominvalley Park closed in January?",
          a: "Yes. Moominvalley Park and metsä Village are closed from 12 to 14 January 2027.",
        },
        {
          q: "How do I get to Moominvalley Park from Tokyo?",
          a: "By train to Hanno, Higashi-Hanno or Komagawa. Free shuttle buses run daily from Higashi-Hanno and Komagawa, and a route bus runs from Hanno Station north exit.",
        },
        {
          q: "Do small children need a ticket?",
          a: "Children under 4 enter free; from age 4 up to high school the child price applies.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kawagoe-day-trip", title: "Kawagoe Day Trip" },
        { href: "/guides/attractions/sanrio-puroland-tickets", title: "Sanrio Puroland Tickets" },
        { href: "/guides/attractions/ghibli-museum-tickets", title: "Ghibli Museum Tickets" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
      ]}
      banner={{
        title: "A day in Moominvalley",
        desc: "One-day pass for Moominvalley Park.",
        label: "View Moominvalley Park tickets →",
      }}
    />
  );
}
