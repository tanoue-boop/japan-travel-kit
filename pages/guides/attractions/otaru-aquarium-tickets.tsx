import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { otaruCanalCruiseSealCarving, sapporoKokusaiSkiOtaruAquariumDayTour, otaruYoichiDayTour } from "../../../lib/klook-links";
import { otaruAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Every figure is from Otaru Aquarium's
// own Japanese pages, read by node fetch on 28 Nov 2026: otaru-aq.jp/guide/tickets/ (winter
// season individual adult high school and up 1,300 yen, elementary and junior high 500,
// age 3+ 300; annual passport 3,600 / 1,400 / 700; annual set pass adult 4,800; parking free),
// /guide/openningtime/ (normal season 14 Mar - 23 Nov 2026; winter season 12 Dec 2026 -
// 23 Feb 2027 10:00-16:00, last entry 15:30; closed 24 Nov - 11 Dec 2026 and 24 Feb - 13 Mar
// 2027) and /guide/access/ (bus from JR Otaru Station bus terminal stop 3; JR + bus + entry
// set ticket sold at JR Hokkaido stations; about 60-70 min by car from Sapporo).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/otaru-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://otaru-aq.jp/guide/tickets/";
const HOURS = "https://otaru-aq.jp/guide/openningtime/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function OtaruAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Otaru Aquarium Tickets"
      title="Otaru Aquarium Tickets 2026: Winter Price, Hours & Closures"
      description="Otaru Aquarium reopens for winter on 12 December 2026: ¥1,300 for adults, ¥500 for pupils, 10:00–16:00. Closed until 11 December and from 24 February."
      h1={<>Otaru Aquarium Tickets 2026: <br />Winter Price, Hours &amp; Closures</>}
      subtitle="The aquarium on the Shukutsu coast outside Otaru: winter prices, the closed weeks either side of the season, and the bus from Otaru Station."
      badges={[`Checked ${CHECKED}`, "¥1,300 adult (winter)", "Otaru"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Otaru Aquarium is <strong>closed from 24 November to 11 December 2026</strong> and reopens for the
            winter season on <strong>12 December 2026</strong>, running until 23 February 2027. Winter admission is{" "}
            <strong>¥1,300 for adults</strong> (high school and up), ¥500 for elementary and junior high pupils
            and ¥300 for children aged 3 and over.
          </p>
          <p className={styles.bodyText}>
            Winter hours are <strong>10:00–16:00</strong>, last entry 15:30. It closes again from 24 February to
            13 March 2027. Klook sells the admission. Otaru Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: otaruAquariumTicket.url, label: "Check Otaru Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult (winter)", value: "¥1,300" },
        { label: "Elementary / junior high", value: "¥500" },
        { label: "Winter hours", value: "10:00–16:00" },
        { label: "Reopens", value: "12 Dec 2026" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> pick a date between 12 December and 23 February, and arrive by 15:30. Parking
          is free.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Otaru Aquarium in winter?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              These are the winter-season prices. Groups of 15 or more pay less.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult (high school +)", "Elementary / junior high", "Age 3+"],
            rows: [
              ["Winter admission", "¥1,300", "¥500", "¥300"],
              ["Annual passport", "¥3,600", "¥1,400", "¥700"],
            ],
            note: (
              <>
                Otaru Aquarium prices, checked {CHECKED}.{" "}
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
              Winter season 12 December 2026 – 23 February 2027, 10:00–16:00 (entry until 15:30). Buses leave from
              stop 3 at the Otaru Station bus terminal. JR Hokkaido also sells an Otaru Aquarium set ticket (train,
              bus and admission) at its main stations. By car it is about 60–70 minutes from Sapporo.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Season dates</a>.
            </p>
          ),
          ctas: [{ href: otaruAquariumTicket.url, label: "Book Otaru Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Otaru",
        intro: "Back in town, these Klook products cover the canal and the coast.",
        tours: [otaruCanalCruiseSealCarving, sapporoKokusaiSkiOtaruAquariumDayTour, otaruYoichiDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the day, see the{" "}
          <Link href="/guides/attractions/otaru-day-trip-from-sapporo" style={linkStyle}>Otaru day trip from Sapporo</Link>.
          Longer trips are in the{" "}
          <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3-day itinerary</Link> and the{" "}
          <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>Hokkaido 7-day itinerary</Link>; for
          another winter animal day, see{" "}
          <Link href="/guides/attractions/asahiyama-zoo-day-trip-from-sapporo" style={linkStyle}>Asahiyama Zoo from Sapporo</Link>.
          {" "}Back in Sapporo, <Link href="/guides/attractions/shiroi-koibito-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Shiroi Koibito Park</Link> is ¥1,200 for adults and ¥600 for children.
        </p>
      }
      faq={[
        {
          q: "Is Otaru Aquarium open in December?",
          a: "From 12 December 2026. It is closed from 24 November to 11 December 2026, then open for the winter season until 23 February 2027.",
        },
        {
          q: "How much is Otaru Aquarium in winter?",
          a: `¥1,300 for adults (high school and up), ¥500 for elementary and junior high pupils and ¥300 for children aged 3 and over. Checked ${CHECKED}.`,
        },
        {
          q: "What are the winter opening hours?",
          a: "10:00–16:00, with last entry at 15:30.",
        },
        {
          q: "How do I get there from Otaru Station?",
          a: "By bus from stop 3 at the Otaru Station bus terminal. JR Hokkaido sells a set ticket with the train, bus and admission.",
        },
        {
          q: "Can I buy Otaru Aquarium tickets on Klook?",
          a: "Yes. Klook sells an Otaru Aquarium admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo" },
        { href: "/guides/attractions/sapporo-3-day-itinerary", title: "Sapporo 3-Day Itinerary" },
        { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7-Day Itinerary" },
        { href: "/guides/attractions/asahiyama-zoo-day-trip-from-sapporo", title: "Asahiyama Zoo Day Trip" },
      ]}
      banner={{
        title: "Winter at Otaru Aquarium",
        desc: "Admission to Otaru Aquarium on the Shukutsu coast.",
        label: "View Otaru Aquarium tickets →",
      }}
    />
  );
}
