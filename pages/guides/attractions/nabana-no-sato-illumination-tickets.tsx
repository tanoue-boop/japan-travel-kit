import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nabanaNoSatoIlluminationTicket, nagashimaSpaLandTicket, portOfNagoyaAquariumTicket, scmaglevRailwayParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from Nagashima Resort's own Nabana no Sato pages, read by node fetch on 28 Nov 2026:
// nagashima-onsen.co.jp/nabana/illumination/fee/ (season 17 Oct 2026 - 31 May 2027, closed 6-7 Jan 2027;
// 21 Nov - 22 Dec and 26 Dec - 28 Feb: 3,200 yen at the gate, 3,000 at FamilyMart / 7-Eleven, with a 1,000 yen
// voucher and Begonia Garden entry; 23-25 Dec special opening from 15:00 with a date-specified ticket, 5,500 yen
// with a 2,000 yen voucher; children under elementary age free with an adult; free parking), the December
// calendar /nabana/fee/calendar/?ym=202612 (10:00-21:00 weekdays, 10:00-22:00 weekends and 26-31 Dec; 23 Dec
// 15:00-22:00, 24-25 Dec 15:00-23:00; entry closes 30 min before) and /illumination/access/ (direct bus from
// Kintetsu Nagashima Station daily; semi-express from Kintetsu Nagoya about 25 min). No Klook price printed.
const ROUTE = "/guides/attractions/nabana-no-sato-illumination-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.nagashima-onsen.co.jp/nabana/illumination/fee/index.html";
const HOURS = "https://www.nagashima-onsen.co.jp/nabana/fee/calendar/index.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NabanaNoSatoIlluminationTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nabana no Sato Illumination"
      title="Nabana no Sato Illumination 2026: Tickets, Hours & Access"
      description="Nabana no Sato illumination: ¥3,200 at the gate or ¥3,000 at convenience stores, with a ¥1,000 voucher. Open to 21:00–22:00; 23–25 Dec needs a ¥5,500 pass."
      h1={<>Nabana no Sato Illumination 2026: <br />Tickets, Hours &amp; Access</>}
      subtitle="The winter light show at Nabana no Sato in Kuwana, near Nagoya: ticket prices, the Christmas rules, December hours and the Kintetsu train and bus."
      badges={[`Checked ${CHECKED}`, "¥3,200 at the gate", "Kuwana, near Nagoya"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Entry to Nabana no Sato during the illumination is <strong>¥3,200 at the gate</strong> or ¥3,000 from
            FamilyMart and 7-Eleven (21 November – 22 December and 26 December – 28 February). The ticket includes a
            ¥1,000 voucher for food and shops and entry to the Begonia Garden. Children under elementary school age
            go free with an adult.
          </p>
          <p className={styles.bodyText}>
            In December it opens <strong>10:00–21:00 on weekdays</strong> and to 22:00 at weekends; on 23–25 December
            only a ¥5,500 date-specified ticket admits you, from 15:00. The season runs to 31 May 2027. Klook sells
            an illumination ticket. Nabana no Sato, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nabanaNoSatoIlluminationTicket.url, label: "Check Nabana no Sato tickets on Klook →" }}
      stats={[
        { label: "Gate price", value: "¥3,200" },
        { label: "Convenience store", value: "¥3,000" },
        { label: "Weekdays (Dec)", value: "10:00–21:00" },
        { label: "Closed", value: "6–7 Jan 2027" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy before the day, avoid 23–25 December unless you have the special ticket, and
          come on a weekday evening; the park says weekdays are quiet all season.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The price depends on the date. Every illumination ticket includes a voucher you spend inside the
              park and entry to the Begonia Garden, where there is a sound-and-light show after dark. Children under
              elementary school age go free with an adult. Parking for cars is free.
            </p>
          ),
          table: {
            head: ["Dates", "Gate", "Convenience store"],
            rows: [
              ["21 Nov – 22 Dec 2026", "¥3,200", "¥3,000"],
              ["23–25 Dec (from 15:00, date-specified)", "¥5,500", "¥5,500 (advance)"],
              ["26 Dec – 28 Feb 2027", "¥3,200", "¥3,000"],
              ["1 Mar – 31 May 2027", "¥2,500", "¥2,500"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                The ¥3,200 / ¥3,000 tickets carry a ¥1,000 voucher; the ¥5,500 Christmas ticket carries ¥2,000. Ordinary advance tickets are not valid on 23–25 December.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              December 2026: 10:00–21:00 on weekdays and 10:00–22:00 on Saturdays, Sundays and 26–31 December; entry
              closes 30 minutes before. On 23 December it opens 15:00–22:00 and on 24–25 December 15:00–23:00, with the
              date-specified ticket only. The lights are timed to sunset and stay on in the rain. Closed 6–7 January
              2027. By train, take the Kintetsu line from Kintetsu Nagoya to Kintetsu Nagashima (semi-express about 25
              minutes), then the direct bus that runs daily in the season.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: nabanaNoSatoIlluminationTicket.url, label: "Book Nabana no Sato on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Nagashima and Nagoya",
        intro: "Nagashima Spa Land is part of the same Nagashima Resort, and the aquarium and the SCMAGLEV museum are on the Nagoya side.",
        tours: [nagashimaSpaLandTicket, portOfNagoyaAquariumTicket, scmaglevRailwayParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see <Link href="/guides/attractions/nagashima-spa-land-tickets" style={linkStyle}>Nagashima Spa Land tickets</Link>, the
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2-day itinerary</Link> and the
          <Link href="/guides/attractions/japan-winter-itinerary" style={linkStyle}>Japan winter itinerary</Link>. For a light show near Tokyo, see
          the <Link href="/guides/attractions/sagamiko-illumillion-tickets" style={linkStyle}>Sagamiko Illumillion</Link>.
          {" "}For a daytime plan in Mie with children, the <Link href="/guides/attractions/suzuka-circuit-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Suzuka Circuit Park</Link> passport is from ¥4,800 online for adults.
        </p>
      }
      faq={[
        {
          q: "How much is the Nabana no Sato illumination?",
          a: `¥3,200 at the gate or ¥3,000 from FamilyMart and 7-Eleven from 21 November to 22 December and from 26 December to 28 February, with a ¥1,000 voucher. Checked ${CHECKED}.`,
        },
        {
          q: "What are the hours in December?",
          a: "10:00–21:00 on weekdays and 10:00–22:00 on weekends and 26–31 December. On 23–25 December it opens from 15:00 with a date-specified ticket only.",
        },
        {
          q: "Can I go on Christmas Eve?",
          a: "Only with the ¥5,500 date-specified ticket, sold in advance at convenience stores; the gate sells any that remain. Ordinary advance tickets are not valid on 23–25 December.",
        },
        {
          q: "How do I get there from Nagoya?",
          a: "Take the Kintetsu line to Kintetsu Nagashima (semi-express about 25 minutes) and the direct bus to Nabana no Sato.",
        },
        {
          q: "When does the illumination end?",
          a: "On 31 May 2027. The park is closed on 6 and 7 January 2027.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nagashima-spa-land-tickets", title: "Nagashima Spa Land Tickets" },
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2-Day Itinerary" },
        { href: "/guides/attractions/ghibli-park-tickets", title: "Ghibli Park Tickets" },
        { href: "/guides/attractions/toba-aquarium-tickets", title: "Toba Aquarium Tickets" },
      ]}
      banner={{
        title: "The winter lights at Nabana no Sato",
        desc: "Illumination admission, Kuwana.",
        label: "View Nabana no Sato tickets →",
      }}
    />
  );
}
