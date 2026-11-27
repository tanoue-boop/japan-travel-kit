import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  shirakawagoLineBusTicket,
  takayamaShirakawagoOneDayBusTour,
  shirakawagoLightUpTakayamaDayTour,
} from "../../../lib/klook-links";
import { jrTakayamaHokurikuAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Nohi Bus's own
// page, read by node fetch on 28 Nov 2026: nouhibus.co.jp/route_bus/shirakawago_en/
// (Takayama Nohi Bus Center - Shirakawa-go about 50 min; 16 round trips a day, some by
// reservation; onward to Kanazawa, Toyama and Takaoka; one-way fares valid through
// 30 Nov 2026: Takayama - Shirakawa-go 2,800, - Toyama 3,800, - Kanazawa 4,200, - Takaoka
// 3,300; Shirakawa-go - Toyama 2,400, - Kanazawa 2,800, - Takaoka 2,200; effective
// 1 Dec 2026: 2,900 / 3,900 / 4,400 / 3,400 and 2,400 / 2,900 / 2,200; mobile tickets for
// non-reserved buses; under-6s free if not taking a seat, one per accompanying passenger).
// The Klook product (149343) is a non-reserved seat ticket between Takayama and
// Shirakawa-go, one way or return (Klook search index). No Klook price is printed.
const ROUTE = "/guides/transport/shirakawa-go-bus";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.nouhibus.co.jp/route_bus/shirakawago_en/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShirakawaGoBusPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Shirakawa-go Bus"
      title="Shirakawa-go Bus 2026: Takayama & Kanazawa Fares, Tickets"
      description="Shirakawa-go bus fares from 1 Dec 2026: Takayama ¥2,900 (about 50 min), Kanazawa ¥2,900, Toyama ¥2,400 one way. Reservations and tickets."
      h1={<>Shirakawa-go Bus 2026: <br />Takayama &amp; Kanazawa Fares, Tickets</>}
      subtitle="The Nohi Bus line between Takayama, Shirakawa-go, Kanazawa and Toyama: new fares from 1 December 2026, journey time and how to book."
      badges={[`Checked ${CHECKED}`, "¥2,900 from Takayama", "Gifu"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            From <strong>1 December 2026</strong>, the bus from Takayama to Shirakawa-go is <strong>¥2,900</strong>{" "}
            one way (¥2,800 until 30 November) and takes about 50 minutes. Shirakawa-go to Kanazawa is ¥2,900 and to
            Toyama ¥2,400. There are 16 round trips a day between Takayama and Shirakawa-go.
          </p>
          <p className={styles.bodyText}>
            Some services need a reservation; the rest are non-reserved, with mobile tickets. Klook sells a
            non-reserved ticket between Takayama and Shirakawa-go, one way or return. Nohi Bus, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: shirakawagoLineBusTicket.url, label: "Check the Takayama–Shirakawa-go bus on Klook →" }}
      stats={[
        { label: "Takayama ⇄ Shirakawa-go", value: "¥2,900" },
        { label: "Shirakawa-go ⇄ Kanazawa", value: "¥2,900" },
        { label: "Journey (Takayama)", value: "About 50 min" },
        { label: "Round trips", value: "16 a day" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> check the timetable for the R mark first. On non-reserved buses a mobile or Klook
          ticket is enough; reservation-only buses, including runs on to Kanazawa or Toyama, must be booked.
        </>
      }
      sections={[
        {
          label: "Fares",
          title: "How much is the Shirakawa-go bus?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One-way adult fares. Children under 6 ride free if they do not take a seat (one per accompanying
              passenger); a child taking a seat pays the child fare.
            </p>
          ),
          table: {
            head: ["Route (one way)", "To 30 Nov 2026", "From 1 Dec 2026"],
            rows: [
              ["Takayama – Shirakawa-go", "¥2,800", "¥2,900"],
              ["Takayama – Kanazawa", "¥4,200", "¥4,400"],
              ["Takayama – Toyama", "¥3,800", "¥3,900"],
              ["Shirakawa-go – Kanazawa", "¥2,800", "¥2,900"],
              ["Shirakawa-go – Toyama", "¥2,400", "¥2,400"],
              ["Shirakawa-go – Takaoka", "¥2,200", "¥2,200"],
            ],
            note: (
              <>
                Nohi Bus fares, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the Takayama – Shirakawa-go ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Booking",
          title: "Do you need to reserve?",
          body: (
            <p className={styles.bodyText}>
              Some services are reservation-only (marked R in the timetable); book those online or through the
              operators&apos; reservation centres. All other buses are non-reserved, and Nohi Bus sells mobile tickets
              for them. The Klook ticket is for non-reserved buses between Takayama Nohi Bus Center and Shirakawa-go.
              Services to Kanazawa, Toyama and Takaoka are shared with Hokuriku Tetsudo, Toyama Chiho Tetsudo and
              Kaetsunou Bus.{" "}
              <a href={OFFICIAL} target="_blank" rel="noopener" style={linkStyle}>Timetable and fares</a>.
            </p>
          ),
          ctas: [{ href: shirakawagoLineBusTicket.url, label: "Book the Shirakawa-go bus on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Takayama and Shirakawa-go",
        intro: "A guided tour does the same route in a day; the JR area pass covers the bus as part of a longer trip.",
        tours: [takayamaShirakawagoOneDayBusTour, shirakawagoLightUpTakayamaDayTour, jrTakayamaHokurikuAreaPass],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/takayama-shirakawago-tour" style={linkStyle}>Takayama and Shirakawa-go
          tour</Link> guide, the{" "}
          <Link href="/guides/attractions/shirakawago-winter-light-up" style={linkStyle}>Shirakawa-go winter
          light-up</Link>, the{" "}
          <Link href="/guides/attractions/kanazawa-2-day-itinerary" style={linkStyle}>Kanazawa 2-day itinerary</Link>{" "}
          and the{" "}
          <Link href="/guides/transport/takayama-hokuriku-area-pass" style={linkStyle}>Takayama-Hokuriku Area
          Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the bus from Takayama to Shirakawa-go?",
          a: `¥2,900 one way from 1 December 2026 (¥2,800 until 30 November). Checked ${CHECKED}.`,
        },
        {
          q: "How long is the bus from Takayama to Shirakawa-go?",
          a: "About 50 minutes from Takayama Nohi Bus Center, with 16 round trips a day.",
        },
        {
          q: "How much is the bus from Shirakawa-go to Kanazawa?",
          a: "¥2,900 one way from 1 December 2026 (¥2,800 before). Takayama to Kanazawa is ¥4,400.",
        },
        {
          q: "Do I need to reserve the Shirakawa-go bus?",
          a: "Only on services marked as reservation-only; the other buses are non-reserved, and mobile tickets are sold for them.",
        },
        {
          q: "Can I buy the Shirakawa-go bus ticket on Klook?",
          a: "Yes. Klook sells a non-reserved ticket between Takayama and Shirakawa-go, one way or return.",
        },
      ]}
      related={[
        { href: "/guides/attractions/takayama-shirakawago-tour", title: "Takayama & Shirakawa-go Tour" },
        { href: "/guides/attractions/shirakawago-winter-light-up", title: "Shirakawa-go Winter Light-Up" },
        { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "Kanazawa 2-Day Itinerary" },
        { href: "/guides/transport/takayama-hokuriku-area-pass", title: "Takayama-Hokuriku Area Pass" },
      ]}
      banner={{
        title: "Takayama to Shirakawa-go",
        desc: "Nohi Bus non-reserved ticket.",
        label: "View the Shirakawa-go bus ticket →",
      }}
    />
  );
}
