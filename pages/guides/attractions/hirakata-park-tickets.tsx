import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hirakataParkTicket, kyotoRailwayMuseumTicket, kidsPlazaOsakaTicket, nifrelTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from Hirakata Park's own site (Keihan), read by node fetch on 28 Nov 2026:
// hirakatapark.co.jp/information/calendar/ (entry + Free Pass 5,300 yen online / 5,400 at the gate for adults,
// 4,500 / 4,600 elementary, 3,200 / 3,300 kids 2+; entry only 1,900 / 2,000, 1,100 / 1,200; Free Pass alone
// 3,400; from 16:00 on illumination days entry + pass 3,900 / 4,300; entry + Winter Carnival 2,600 / 2,700;
// adults are junior high age and over; December 2026 calendar: closed 1-4, 7-11 and 17 Dec, open 10:00-17:00
// on 14-16 and 18 Dec, 10:00-20:00 on weekends and 19-23, 26-30 Dec, 10:00-21:00 on 24-25 Dec, 10:00-17:00 on
// 31 Dec, closed 1 Jan 2027) and /information/access/ (Hirakatakoen Station on the Keihan line).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/hirakata-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.hirakatapark.co.jp/information/calendar/";
const HOURS = "https://www.hirakatapark.co.jp/information/calendar/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HirakataParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Hirakata Park"
      title="Hirakata Park Tickets 2026: Price, Free Pass & Hours"
      description="Hirakata Park between Osaka and Kyoto: entry ¥1,900 online, entry plus Free Pass ¥5,300 for adults. December hours, closed days and the Keihan station."
      h1={<>Hirakata Park Tickets 2026: <br />Price, Free Pass &amp; Hours</>}
      subtitle="The amusement park on the Keihan line between Osaka and Kyoto: what entry and the Free Pass cost, the December calendar, and how to get there."
      badges={[`Checked ${CHECKED}`, "¥5,300 with rides", "Keihan line"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Hirakata Park sells entry and rides separately. <strong>Entry plus the Free Pass is ¥5,300 for adults</strong>
            bought online (¥5,400 at the gate); entry alone is ¥1,900 online or ¥2,000 at the gate. Elementary
            school children pay ¥4,500 with the Free Pass, and kids from age 2 pay ¥3,200.
          </p>
          <p className={styles.bodyText}>
            The park does not open every day in winter: in December 2026 it is closed on 1–4, 7–11 and 17
            December, and opens 10:00–20:00 at weekends and from 19 December. It is next to Hirakatakoen Station on
            the Keihan line. Klook sells admission tickets. Hirakata Park, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hirakataParkTicket.url, label: "Check Hirakata Park tickets on Klook →" }}
      stats={[
        { label: "Entry + Free Pass", value: "¥5,300 online" },
        { label: "Entry only", value: "¥1,900 online" },
        { label: "Kids (2+)", value: "¥3,200 with pass" },
        { label: "Station", value: "Hirakatakoen" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy entry plus the Free Pass if you plan more than a few rides, and check the calendar
          first, because many December weekdays are closed days.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Online prices are for Asoview and KKday; the gate price is ¥100 more. Adults are junior high school age and
              over; kids are age 2 up to school age. Rides need the Free Pass or single ride tickets. On illumination
              days a ticket from 16:00 (entry plus a night Free Pass) is ¥3,900 online or ¥4,300 at the gate.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Elementary", "Kids (2+)"],
            rows: [
              ["Entry + Free Pass (online)", "¥5,300", "¥4,500", "¥3,200"],
              ["Entry + Free Pass (gate)", "¥5,400", "¥4,600", "¥3,300"],
              ["Entry only (online)", "¥1,900", "¥1,100", "¥1,100"],
              ["Entry only (gate)", "¥2,000", "¥1,200", "¥1,200"],
              ["Entry + Winter Carnival (online)", "¥2,600", "¥1,800", "¥1,800"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells admission at its own price; check whether the option includes the Free Pass.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open in December and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              In December 2026 the park is closed on 1–4, 7–11 and 17 December. It opens 10:00–20:00 on 5–6, 12–13
              and 19–23 December and from 26 to 30 December, 10:00–21:00 on 24 and 25 December, and 10:00–17:00 on
              14–16, 18 and 31 December. It is closed on 1 January 2027. The park is beside Hirakatakoen Station on
              the Keihan line between Osaka and Kyoto.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: hirakataParkTicket.url, label: "Book Hirakata Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Osaka and Kyoto on the Keihan line",
        intro: "Hirakata sits between the two cities, so a museum in Kyoto or Osaka fits on the same day.",
        tours: [kyotoRailwayMuseumTicket, kidsPlazaOsakaTicket, nifrelTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link>, the
          <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" style={linkStyle}>Osaka and Kyoto 3-day itinerary</Link> and the
          <Link href="/guides/attractions/osaka-3-day-itinerary" style={linkStyle}>Osaka 3-day itinerary</Link>. With children, see
          <Link href="/guides/attractions/kids-plaza-osaka-tickets" style={linkStyle}>Kids Plaza Osaka</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Hirakata Park?",
          a: `Entry plus the Free Pass is ¥5,300 for adults online and ¥5,400 at the gate. Entry only is ¥1,900 online or ¥2,000 at the gate. Checked ${CHECKED}.`,
        },
        {
          q: "Is Hirakata Park open every day?",
          a: "No. In December 2026 it is closed on 1–4, 7–11 and 17 December, and on 1 January 2027. Check the official calendar before you go.",
        },
        {
          q: "What are the opening hours?",
          a: "They change by date: 10:00–20:00 on most December weekends and holidays, 10:00–17:00 on some weekdays, and 10:00–21:00 on 24 and 25 December 2026.",
        },
        {
          q: "How do I get to Hirakata Park?",
          a: "Take the Keihan Main Line to Hirakatakoen Station; the park is beside the station.",
        },
        {
          q: "Do children need a ticket?",
          a: "Yes, from age 2. Kids from 2 to school age pay ¥3,200 for entry plus the Free Pass online, and elementary school children ¥4,500.",
        },
      ]}
      related={[
        { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
        { href: "/guides/attractions/kids-plaza-osaka-tickets", title: "Kids Plaza Osaka Tickets" },
        { href: "/guides/attractions/kyoto-railway-museum-tickets", title: "Kyoto Railway Museum Tickets" },
        { href: "/guides/attractions/nifrel-osaka-tickets", title: "NIFREL Osaka Tickets" },
      ]}
      banner={{
        title: "Rides between Osaka and Kyoto",
        desc: "Admission to Hirakata Park.",
        label: "View Hirakata Park tickets →",
      }}
    />
  );
}
