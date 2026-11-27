import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tokyoBayYakatabuneDinnerCruise } from "../../../lib/klook-links";
import { motherFarmTicket, kamogawaSeaWorldTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from Mother Farm's own site, read by node fetch on 28 Nov 2026:
// motherfarm.co.jp/ticket/ (adult, junior high and over, 1,800 yen; child 4 to 12, 900; dog 700),
// /schedule/ (December - January: weekdays 10:00-16:00, weekends and holidays 9:30-16:00; New Year uses
// weekend hours; closed 14-18 Dec 2026, 6-8 and 12-15 Jan 2027) and /access/ (direct bus from JR Kimitsu
// Station south exit, stop 1, about 35 min). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/mother-farm-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.motherfarm.co.jp/ticket/index.php";
const HOURS = "https://www.motherfarm.co.jp/schedule/index.php";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MotherFarmTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Mother Farm Tickets"
      title="Mother Farm Chiba Tickets 2026: Price, Hours & Bus"
      description="Mother Farm in Chiba is ¥1,800 for adults and ¥900 for children. Winter hours 10:00–16:00 on weekdays; closed 14–18 Dec 2026; bus from Kimitsu Station."
      h1={<>Mother Farm Chiba Tickets 2026: <br />Price, Hours &amp; Bus</>}
      subtitle="The farm park on the Boso Peninsula: admission, winter hours and closed days, and the bus from JR Kimitsu Station."
      badges={[`Checked ${CHECKED}`, "¥1,800 adult", "Chiba"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Mother Farm admission is <strong>¥1,800 for adults</strong> (junior high and over) and ¥900 for children
            aged 4 to 12. Dogs are ¥700 each.
          </p>
          <p className={styles.bodyText}>
            In December and January it opens <strong>10:00–16:00 on weekdays</strong> and 9:30–16:00 at weekends; it is
            closed on 14–18 December 2026 and on 6–8 and 12–15 January 2027. A direct bus runs from JR Kimitsu Station
            (about 35 minutes). Klook sells an admission ticket. Mother Farm, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: motherFarmTicket.url, label: "Check Mother Farm tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,800" },
        { label: "Child (4–12)", value: "¥900" },
        { label: "Weekdays (Dec)", value: "10:00–16:00" },
        { label: "Closed", value: "14–18 Dec" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a day trip from Tokyo by the Uchibo Line and bus; in winter the park closes at
          16:00, so start early.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Discount coupons without an expiry date
              have not been accepted since 1 August 2025, when the prices changed.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (junior high and over)", "¥1,800"],
              ["Child (age 4 to 12)", "¥900"],
              ["Dog (per dog)", "¥700"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells admission at its own price; show the voucher at the gate.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              December – January: weekdays 10:00–16:00, weekends and holidays 9:30–16:00 (the New Year period uses the
              weekend hours). Closed 14–18 December 2026 and 6–8 and 12–15 January 2027. From February to November the
              park opens longer. By train, take the JR Uchibo Line to Kimitsu Station; the direct bus leaves from stop 1
              at the south exit and takes about 35 minutes.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: motherFarmTicket.url, label: "Book Mother Farm on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Chiba and Tokyo Bay",
        intro: "Kamogawa Sea World is on the same peninsula, and a bay dinner cruise fits on the way back into Tokyo.",
        tours: [kamogawaSeaWorldTicket, tokyoBayYakatabuneDinnerCruise],
      }}
      links={
        <p className={styles.bodyText}>
          For a family trip, see the <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>,
          <Link href="/guides/attractions/kamogawa-sea-world-tickets" style={linkStyle}>Kamogawa Sea World tickets</Link> and the
          <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>Tokyo 7-day itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Mother Farm?",
          a: `¥1,800 for adults (junior high and over) and ¥900 for children aged 4 to 12. Checked ${CHECKED}.`,
        },
        {
          q: "What are Mother Farm's winter hours?",
          a: "In December and January, 10:00–16:00 on weekdays and 9:30–16:00 on weekends and holidays.",
        },
        {
          q: "When is Mother Farm closed?",
          a: "On 14–18 December 2026 and on 6–8 and 12–15 January 2027.",
        },
        {
          q: "How do I get to Mother Farm from Tokyo?",
          a: "Take the JR Uchibo Line to Kimitsu Station and the direct bus from the south exit, about 35 minutes.",
        },
        {
          q: "Can I bring a dog?",
          a: "Yes, for ¥700 per dog; you sign the park's terms at the gate and some areas are off limits to dogs.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/kamogawa-sea-world-tickets", title: "Kamogawa Sea World Tickets" },
        { href: "/guides/attractions/tokyo-7-day-itinerary", title: "Tokyo 7-Day Itinerary" },
        { href: "/guides/attractions/yomiuriland-tickets", title: "Yomiuriland Tickets" },
      ]}
      banner={{
        title: "Sheep and flowers on the Boso hills",
        desc: "Admission to Mother Farm, Chiba.",
        label: "View Mother Farm tickets →",
      }}
    />
  );
}
