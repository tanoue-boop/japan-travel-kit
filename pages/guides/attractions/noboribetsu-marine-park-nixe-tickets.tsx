import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nixeMarineParkTicket, noboribetsuBearParkTicket, noboribetsuDateJidaimuraTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the park's own page, read by node fetch on 28 Nov 2026:
// nixe-aqua.com/guide/ (hours 9:00-17:00, last entry and ticket sales end 16:30; closed 12-16 Apr 2027, otherwise open
// every day; admission adult (junior high+) 3,200, child (4 to elementary) 1,600, 3 and under free; groups of 10+
// 2,900 / 1,450; welfare 1,800 / 1,000; annual pass 8,000 / 4,000 / senior 65+ 7,000; parking car 500, bus 1,500,
// motorcycle 200, 750 car spaces; luggage delivery to 14 Noboribetsu Onsen hotels 1,200 a piece, accepted 9:00-14:30,
// delivered 15:30-17:00; luggage storage 500 a piece). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/noboribetsu-marine-park-nixe-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://nixe-aqua.com/guide/";
const HOURS = "https://nixe-aqua.com/guide/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NoboribetsuMarineParkNixeTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Noboribetsu Marine Park Nixe tickets"
      title="Noboribetsu Marine Park Nixe Tickets 2026: Price & Hours"
      description="Noboribetsu Marine Park Nixe 2026: ¥3,200 for adults, ¥1,600 for ages 4–12, free for 3 and under. Open 9:00–17:00 daily; parking ¥500; luggage delivery."
      h1={<>Noboribetsu Marine Park Nixe Tickets 2026: <br />Price &amp; Hours</>}
      subtitle="What the aquarium castle at Noboribetsu costs, when it is open, and the luggage service that sends your bags to the onsen hotel."
      badges={[`Checked ${CHECKED}`, "Adults ¥3,200", "Open daily"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Admission to Noboribetsu Marine Park Nixe is ¥3,200 for adults</strong> (junior high school and older)
            and ¥1,600 for children from 4 to elementary school age. Children aged 3 and under are free. Groups of ten or
            more pay ¥2,900 and ¥1,450.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>9 a.m. to 5 p.m. every day</strong> (ticket sales end at 4:30 p.m.); the only closure
            announced is 12 to 16 April 2027. Parking is ¥500 a car. Klook sells an admission ticket. Noboribetsu Marine
            Park Nixe, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nixeMarineParkTicket.url, label: "Check the Nixe ticket on Klook →" }}
      stats={[
        { label: "Adult (junior high+)", value: "¥3,200" },
        { label: "Child (4–12)", value: "¥1,600" },
        { label: "Hours", value: "9:00–17:00" },
        { label: "Parking", value: "¥500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a good first stop on the way to a Noboribetsu Onsen hotel; hand your suitcase to the
          luggage service before 2:30 p.m. and it is at the hotel by evening.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Payment is by cash, card, WeChat Pay, Alipay or UnionPay. The annual pass is ¥8,000 for adults, ¥4,000 for
              children and ¥7,000 for over-65s.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (junior high+)", "Child (4 to elementary)"],
            rows: [
              ["Individual", "¥3,200", "¥1,600"],
              ["Group (10 or more)", "¥2,900", "¥1,450"],
              ["With disability certificate", "¥1,800", "¥1,000"],
              ["Annual pass", "¥8,000", "¥4,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Children aged 3 and under are free. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Nixe open?",
          body: (
            <p className={styles.bodyText}>
              Every day from 9 a.m. to 5 p.m.; ticket sales and last entry end at 4:30 p.m. The park is closed from 12 to 16
              April 2027. The car park opens at 8:30 a.m. (¥500 a car, cash only). Bags handed in at the gate building from 9
              a.m. to 2:30 p.m. are delivered to 14 Noboribetsu Onsen hotels between 3:30 and 5 p.m. for ¥1,200 a piece.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: nixeMarineParkTicket.url, label: "Book Noboribetsu Marine Park Nixe on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Noboribetsu",
        intro: "Nixe is in Noboribetsu, like these two parks, so it pairs with them.",
        tours: [noboribetsuBearParkTicket, noboribetsuDateJidaimuraTicket],
      }}
      links={
        <p className={styles.bodyText}>
          In Noboribetsu, add <Link href="/guides/attractions/noboribetsu-bear-park-tickets" style={linkStyle}>Noboribetsu Bear Park</Link> or
          <Link href="/guides/attractions/noboribetsu-date-jidaimura-tickets" style={linkStyle}>Date Jidaimura</Link>. For another aquarium, compare
          <Link href="/guides/attractions/otaru-aquarium-tickets" style={linkStyle}>Otaru Aquarium</Link>; for the train, see the
          <Link href="/guides/transport/sapporo-noboribetsu-area-pass" style={linkStyle}>Sapporo-Noboribetsu Area Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Noboribetsu Marine Park Nixe?",
          a: `Admission is ¥3,200 for adults (junior high school and older) and ¥1,600 for children from 4 to elementary school age. Ages 3 and under are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 17:00. Ticket sales and last entry end at 16:30.",
        },
        {
          q: "Is it open every day?",
          a: "Yes, apart from a closure from 12 to 16 April 2027.",
        },
        {
          q: "Can I send my luggage to the hotel?",
          a: "Yes. Bags handed in at the gate building from 9:00 to 14:30 are delivered to 14 Noboribetsu Onsen hotels between 15:30 and 17:00, for ¥1,200 a piece.",
        },
        {
          q: "How much is parking?",
          a: "¥500 for a car, ¥1,500 for a bus and ¥200 for a motorcycle, paid in cash. There are 750 car spaces.",
        },
      ]}
      related={[
        { href: "/guides/attractions/noboribetsu-bear-park-tickets", title: "Noboribetsu Bear Park Tickets" },
        { href: "/guides/attractions/noboribetsu-date-jidaimura-tickets", title: "Noboribetsu Date Jidaimura" },
        { href: "/guides/attractions/otaru-aquarium-tickets", title: "Otaru Aquarium Tickets" },
        { href: "/guides/transport/sapporo-noboribetsu-area-pass", title: "Sapporo-Noboribetsu Area Pass" },
      ]}
      banner={{
        title: "An aquarium in a castle",
        desc: "Admission to Noboribetsu Marine Park Nixe.",
        label: "View the Nixe ticket →",
      }}
    />
  );
}
