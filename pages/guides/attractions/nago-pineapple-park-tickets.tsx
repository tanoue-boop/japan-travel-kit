import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { churaumiAquariumTicket, okinawaChuraumiKouriFullDayTour } from "../../../lib/klook-links";
import { nagoPineappleParkTicket, jungliaOkinawaTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Nago Pineapple
// Park's own site (renewed 17 Nov 2026), read by node fetch on 28 Nov 2026:
// nagopine.com/access (open every day 10:00-18:00, last entry 17:30; closes for typhoons;
// 60 minutes or more; adult 16+ 1,500 yen, child 4-15 800, under 4 free; group of 10+
// 1,350 / 720; free parking for 200 cars; about 90 min by car from Naha Airport by the
// Okinawa Expressway, 25-30 min by car from the Churaumi Aquarium / Ocean Expo Park;
// nearest bus stop Meio Daigaku Iriguchi) and /faq (Pineapple Train from the car park to
// the entrance; about 60 minutes from boarding the train; open in rain).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/nago-pineapple-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.nagopine.com/access";
const FAQ_URL = "https://www.nagopine.com/faq";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NagoPineappleParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nago Pineapple Park Tickets"
      title="Nago Pineapple Park Tickets 2026: Price, Hours & Access"
      description="Nago Pineapple Park is ¥1,500 for adults and ¥800 for children 4–15, open every day 10:00–18:00. About 25–30 minutes by car from the Churaumi Aquarium."
      h1={<>Nago Pineapple Park Tickets 2026: <br />Price, Hours &amp; Access</>}
      subtitle="The pineapple theme park in Nago, northern Okinawa: admission, opening hours, how long to allow and how it fits a Churaumi day."
      badges={[`Checked ${CHECKED}`, "¥1,500 adult", "Nago, Okinawa"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Nago Pineapple Park is <strong>¥1,500 for adults</strong> (16 and over) and ¥800 for children aged 4 to
            15; under-4s are free. The Pineapple Train carries you from the car park to the entrance, and the park
            suggests about 60 minutes from boarding.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>every day, 10:00–18:00</strong> (last entry 17:30), including in rain, but can close
            for typhoons. It is about 90 minutes by car from Naha Airport and 25–30 minutes from the Churaumi
            Aquarium. Klook sells the ticket. Nago Pineapple Park, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nagoPineappleParkTicket.url, label: "Check Nago Pineapple Park tickets on Klook →" }}
      stats={[
        { label: "Adult (16+)", value: "¥1,500" },
        { label: "Child (4–15)", value: "¥800" },
        { label: "Hours", value: "10:00–18:00" },
        { label: "Time needed", value: "60 min +" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> an hour-long stop on the drive between Naha and the Churaumi Aquarium. Arrive by
          17:30, and allow longer in holiday periods when the train queues.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Nago Pineapple Park?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Parking is free. Some attractions and experiences inside cost extra. The discount for Okinawa residents is
              sold only at the park counter.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (16+)", "¥1,500"],
              ["Child (4–15)", "¥800"],
              ["Under 4", "Free"],
              ["Group of 10+ (adult / child)", "¥1,350 / ¥720"],
            ],
            note: (
              <>
                Nago Pineapple Park prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price; show the QR code at the counter.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Open every day 10:00–18:00, last entry 17:30; it may close or change hours for typhoons. By car, take
              the Okinawa Expressway from Naha Airport (about 90 minutes) or drive 25–30 minutes from the Churaumi
              Aquarium and Ocean Expo Park. By bus, the nearest stop is Meio Daigaku Iriguchi.{" "}
              <a href={FAQ_URL} target="_blank" rel="noopener" style={linkStyle}>Official FAQ</a>.
            </p>
          ),
          ctas: [{ href: nagoPineappleParkTicket.url, label: "Book Nago Pineapple Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: northern Okinawa",
        intro: "The park is 25–30 minutes by car from the Churaumi Aquarium, so it pairs with the aquarium or another northern park.",
        tours: [churaumiAquariumTicket, jungliaOkinawaTicket, okinawaChuraumiKouriFullDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link>,{" "}
          <Link href="/guides/attractions/okinawa-churaumi-aquarium-tickets" style={linkStyle}>Churaumi Aquarium
          tickets</Link>,{" "}
          <Link href="/guides/attractions/junglia-okinawa-tickets" style={linkStyle}>JUNGLIA tickets</Link> and{" "}
          <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link> if you are
          not driving.
          {" "}Nearby in Nago, <Link href="/guides/attractions/busena-marine-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Busena Marine Park</Link> is ¥2,100 for adults for the underwater observatory and the glass-bottom boat.
          {" "}Further north, the <Link href="/guides/attractions/kouri-ocean-tower-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kouri Ocean Tower</Link> on Kouri Island is ¥1,000 for ages 16 and over and ¥500 for ages 6–15.
        </p>
      }
      faq={[
        {
          q: "How much is Nago Pineapple Park?",
          a: `¥1,500 for adults (16 and over) and ¥800 for children aged 4 to 15; under-4s are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "Every day 10:00–18:00, with last entry at 17:30. It can close or change hours for typhoons.",
        },
        {
          q: "How long do I need at Nago Pineapple Park?",
          a: "The park suggests about 60 minutes from boarding the Pineapple Train; longer at holidays, when the rides queue.",
        },
        {
          q: "How far is it from the Churaumi Aquarium?",
          a: "About 25–30 minutes by car, according to the park.",
        },
        {
          q: "Can I buy Nago Pineapple Park tickets on Klook?",
          a: "Yes. Klook sells an admission ticket; show the QR code at the counter.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Okinawa Churaumi Aquarium Tickets" },
        { href: "/guides/attractions/junglia-okinawa-tickets", title: "JUNGLIA Okinawa Tickets" },
        { href: "/guides/attractions/ryukyu-mura-tickets", title: "Ryukyu Mura Tickets" },
      ]}
      banner={{
        title: "Pineapples in northern Okinawa",
        desc: "Admission to Nago Pineapple Park.",
        label: "View Nago Pineapple Park tickets →",
      }}
    />
  );
}
