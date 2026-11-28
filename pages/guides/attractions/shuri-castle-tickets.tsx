import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { shurijoCastleTicket, okinawaWorldTicket, dmmKariyushiAquariumTicket, ryukyuMuraTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the park's own pages, read by node fetch on 28 Nov 2026:
// oki-park.jp/shurijo/info/14 (new fees from 23 Nov 2026 with the start of public viewing inside the Seiden: individual
// adult 1,000, high school 760, elementary and junior high 370, under 6 free; groups of 20+ 800 / 610 / 300; one price with
// or without Seiden viewing; old fee 400 until 21 Nov), /shurijo/ticket_guide/ (Seiden viewing needs the dated
// 'admission with Seiden reservation' ticket at no extra charge; sales open at 13:00 on the 1st of the month two months
// ahead, February 2027 from 1 Dec 2026; the 23 Nov slots sold out; visit takes about 90-120 minutes; same-day web sales
// up to 15 minutes before a slot if free; with-Seiden tickets change until the day before, refund until 2 days before;
// without-Seiden tickets change or refund until the day) and /shurijo/info/15/ (paid area December-March 8:30-18:00,
// last entry 17:30; April-November 8:30-19:00, last entry 18:30; park 8:00-18:30 / 8:00-19:30).
// Whether the Klook voucher carries a Seiden slot is not known, so the page says so.
const ROUTE = "/guides/attractions/shuri-castle-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://oki-park.jp/shurijo/info/14";
const HOURS = "https://oki-park.jp/shurijo/info/15/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShuriCastleTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Shuri Castle tickets"
      title="Shuri Castle Tickets 2026: Price, Hours & Seiden Booking"
      description="Shuri Castle 2026: the paid area is ¥1,000 for adults from 23 Nov 2026, when the rebuilt Seiden opened inside. Dated tickets; 8:30–18:00 in winter."
      h1={<>Shuri Castle Tickets 2026: <br />Price, Hours &amp; Seiden Booking</>}
      subtitle="The new prices since the rebuilt main hall opened, how the timed Seiden tickets work, and the winter hours."
      badges={[`Checked ${CHECKED}`, "Adults ¥1,000", "Seiden open"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>The paid area of Shurijo Castle Park is ¥1,000 for adults</strong> from 23 November 2026, the day the
            rebuilt Seiden (main hall) opened to visitors inside. High school students pay ¥760, elementary and junior high
            school students ¥370, and children under 6 enter free. The price is the same with or without the Seiden.
          </p>
          <p className={styles.bodyText}>
            To go inside the Seiden you need the dated <strong>admission with a Seiden reservation</strong>, which costs no
            extra. From December to March the paid area is open <strong>8:30 a.m. to 6 p.m.</strong> (last entry 5:30 p.m.).
            Klook sells a paid-area admission; check on Klook whether it includes a Seiden time slot. Shurijo Castle Park,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: shurijoCastleTicket.url, label: "Check the Shuri Castle ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,000" },
        { label: "High school", value: "¥760" },
        { label: "Elementary / junior high", value: "¥370" },
        { label: "Winter hours", value: "8:30–18:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> if seeing the new Seiden inside is the point, book the official timed ticket as soon
          as your month goes on sale; if the walls, gates and views are enough, any paid-area admission will do.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Until 21 November 2026 adult entry was ¥400; the new prices came with the opening of the Seiden. Group tickets
              (20 or more) are sold only at the window, and showing a Yui Rail one- or two-day pass at the ticket window gets
              the group price. A one-year pass is ¥2,000 for adults.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "High school", "Elementary / junior high", "Under 6"],
            rows: [
              ["Individual", "¥1,000", "¥760", "¥370", "Free"],
              ["Group (20 or more)", "¥800", "¥610", "¥300", "Free"],
              ["One-year pass", "¥2,000", "¥1,520", "¥740", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Seiden viewing needs the dated ticket with a Seiden reservation, at no extra charge. Klook sells its admission at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Shuri Castle open, and how do Seiden slots work?",
          body: (
            <p className={styles.bodyText}>
              From December to March the paid area is open 8:30 a.m. to 6 p.m. (last entry 5:30 p.m.); from April to November
              8:30 a.m. to 7 p.m. (last entry 6:30 p.m.). The park around it opens from 8 a.m. Seiden tickets go on sale at 1
              p.m. on the first day of the month two months ahead: February 2027 from 1 December 2026. Allow 90 to 120 minutes
              from the Suimui-kan visitor centre.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: shurijoCastleTicket.url, label: "Book Shuri Castle on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of southern Okinawa",
        intro: "Shuri is in Naha, so it pairs with these south and central Okinawa tickets.",
        tours: [okinawaWorldTicket, dmmKariyushiAquariumTicket, ryukyuMuraTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For a full plan, see the <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link>. In the south,
          <Link href="/guides/attractions/okinawa-world-tickets" style={linkStyle}>Okinawa World</Link> has the Gyokusendo cave, and for Ryukyu culture there is
          <Link href="/guides/attractions/ryukyu-mura-tickets" style={linkStyle}>Ryukyu Mura</Link>; see also the <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Shuri Castle?",
          a: `From 23 November 2026 the paid area is ¥1,000 for adults, ¥760 for high school students and ¥370 for elementary and junior high school students; under 6 is free. Checked ${CHECKED}.`,
        },
        {
          q: "Can I go inside the new Seiden?",
          a: "Yes, since 23 November 2026, with the dated admission that includes a Seiden reservation. There is no extra charge for the slot.",
        },
        {
          q: "When do Seiden tickets go on sale?",
          a: "At 13:00 on the first day of the month two months ahead. February 2027 goes on sale on 1 December 2026, March 2027 on 1 January 2027.",
        },
        {
          q: "What are the opening hours in winter?",
          a: "From December to March the paid area is open 8:30 to 18:00 with last entry at 17:30.",
        },
        {
          q: "Can I cancel?",
          a: "Official tickets with a Seiden slot can be changed until the day before and refunded until two days before. Tickets without a slot can be changed or refunded until the day of the visit. Klook tickets follow Klook terms.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/okinawa-world-tickets", title: "Okinawa World Tickets" },
        { href: "/guides/attractions/ryukyu-mura-tickets", title: "Ryukyu Mura Tickets" },
        { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours" },
      ]}
      banner={{
        title: "The Ryukyu kings’ castle, rebuilt",
        desc: "Admission to the paid area of Shurijo Castle Park.",
        label: "View the Shuri Castle ticket →",
      }}
    />
  );
}
