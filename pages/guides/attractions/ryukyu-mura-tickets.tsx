import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { churaumiAquariumTicket } from "../../../lib/klook-links";
import { ryukyuMuraTicket, southeastBotanicalGardensTicket, dmmKariyushiAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Ryukyu Mura's own
// site, read by node fetch on 28 Nov 2026: ryukyumura.co.jp/information/ (open every day;
// today's hours shown as 9:30-17:00; adult 2,000 yen, high school 1,500 with student ID,
// child 6-15 800, under 6 free; cheaper web advance tickets; 1130 Yamada, Onna; about 30 km
// north of Naha Airport on Route 58, about 60 min by car or taxi; Okinawa Bus / Ryukyu Bus
// Nago-bound routes from Naha about 60 min to Ryukyu Mura-mae). The web advance price is
// not printed (not stated on that page). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/ryukyu-mura-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.ryukyumura.co.jp/information/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function RyukyuMuraTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Ryukyu Mura Tickets"
      title="Ryukyu Mura Tickets 2026: Price, Hours & Bus from Naha"
      description="Ryukyu Mura in Onna, Okinawa: ¥2,000 for adults, ¥1,500 for high school students, ¥800 for children 6–15. Open daily 9:30–17:00; 60 min from Naha."
      h1={<>Ryukyu Mura Tickets 2026: <br />Price, Hours &amp; Bus from Naha</>}
      subtitle="The village of old Okinawan houses in Onna: admission, opening hours and the bus or drive from Naha."
      badges={[`Checked ${CHECKED}`, "¥2,000 adult", "Onna, Okinawa"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Ryukyu Mura is <strong>¥2,000 for adults</strong>, ¥1,500 for high school students (with student ID)
            and ¥800 for children aged 6 to 15; under-6s are free. Web tickets bought in advance are cheaper.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>every day</strong>, 9:30–17:00 on 28 November 2026. It is about 60 minutes from
            Naha Airport by car, or about 60 minutes by Nago-bound bus from Naha to the Ryukyu Mura-mae stop. Klook
            sells the ticket. Ryukyu Mura, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: ryukyuMuraTicket.url, label: "Check Ryukyu Mura tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,000" },
        { label: "High school", value: "¥1,500" },
        { label: "Child (6–15)", value: "¥800" },
        { label: "Hours", value: "9:30–17:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> an hour north of Naha on Route 58, by car or by Nago-bound bus.
          Buy ahead for the lower web price.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Ryukyu Mura?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The high school rate needs a student ID shown at the gate. Ryukyu Mura sells cheaper web tickets in
              advance; its information page does not state the web price.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult", "¥2,000"],
              ["High school (student ID)", "¥1,500"],
              ["Child (6–15)", "¥800"],
              ["Under 6", "Free"],
            ],
            note: (
              <>
                Ryukyu Mura prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price; exchange the voucher for a paper ticket at the gate.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Open every day; the official page showed 9:30–17:00 for 28 November 2026. Ryukyu Mura is at 1130
              Yamada, Onna, about 30 km north of Naha Airport on Route 58 (about 60 minutes by car or taxi). By bus,
              take an Okinawa Bus or Ryukyu Bus route bound for Nago from Naha (about 60 minutes) to Ryukyu Mura-mae.{" "}
              <a href={OFFICIAL} target="_blank" rel="noopener" style={linkStyle}>Information page</a>.
            </p>
          ),
          ctas: [{ href: ryukyuMuraTicket.url, label: "Book Ryukyu Mura on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: central and northern Okinawa",
        intro: "Ryukyu Mura is on Route 58, about an hour north of Naha, on the way to the northern sights.",
        tours: [dmmKariyushiAquariumTicket, southeastBotanicalGardensTicket, churaumiAquariumTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link>,{" "}
          <Link href="/guides/attractions/okinawa-world-tickets" style={linkStyle}>Okinawa World tickets</Link>,{" "}
          <Link href="/guides/attractions/dmm-kariyushi-aquarium-tickets" style={linkStyle}>DMM Kariyushi Aquarium</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Ryukyu Mura?",
          a: `¥2,000 for adults, ¥1,500 for high school students with ID and ¥800 for children aged 6 to 15; under-6s are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are Ryukyu Mura's opening hours?",
          a: "It is open every day; the official page showed 9:30–17:00 on 28 November 2026.",
        },
        {
          q: "How do I get to Ryukyu Mura by bus?",
          a: "Take an Okinawa Bus or Ryukyu Bus route bound for Nago from Naha, about 60 minutes, and get off at Ryukyu Mura-mae.",
        },
        {
          q: "How far is Ryukyu Mura from Naha Airport?",
          a: "About 30 km north on Route 58, roughly 60 minutes by car or taxi.",
        },
        {
          q: "Can I buy Ryukyu Mura tickets on Klook?",
          a: "Yes. Klook sells an admission ticket; exchange the voucher for a paper ticket at the gate.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/okinawa-world-tickets", title: "Okinawa World Tickets" },
        { href: "/guides/attractions/nago-pineapple-park-tickets", title: "Nago Pineapple Park Tickets" },
        { href: "/guides/attractions/southeast-botanical-gardens-tickets", title: "Southeast Botanical Gardens Tickets" },
      ]}
      banner={{
        title: "Old Okinawa in Onna",
        desc: "Admission to Ryukyu Mura.",
        label: "View Ryukyu Mura tickets →",
      }}
    />
  );
}
