import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kintetsuRailPass, iseShrineOkageGuidedTour } from "../../../lib/klook-links";
import { parqueEspanaTicket, iseKumanoWakayamaAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from Shima Spain
// Village's own English page, read by node fetch on 28 Nov 2026:
// parque-net.com/foreign/index.html (1-day Passport adult 18-64 5,900 / junior 12-17
// 4,700 / child 3-11 4,100 / senior 65+ 4,700 yen; 2-day Passport 8,000 / 6,400 /
// 5,600 / 6,400; the price includes admission, shows and attractions, but Carmen
// Hall, Carnival House and Treasure Hunting in Dragon's Castle cost extra; access by
// Kintetsu limited express Nagoya-Ugata about 2 h 10 min, Osaka(Uehommachi)-Ugata
// about 2 h 30 min, then Mie Kotsu bus about 13 min; Himawari-no-Yu hot spring adult
// 1,400 / child 1,000). Park hours are on parque-net.com/calendar/, not printed here.
// No Klook price is printed (403).
const ROUTE = "/guides/attractions/shima-spain-village-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.parque-net.com/foreign/index.html";
const CALENDAR = "https://www.parque-net.com/calendar/index.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShimaSpainVillageTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Shima Spain Village Tickets"
      title="Shima Spain Village Tickets 2026: Parque España Price"
      description="Parque España 1-day Passport is ¥5,900 for adults: admission, shows and rides. 2-day price, what costs extra and getting there by Kintetsu from Osaka."
      h1={<>Shima Spain Village Tickets 2026: <br />Parque España Price &amp; Access</>}
      subtitle="The Spanish-themed park in Ise-Shima, Mie: what the Passport costs, what it leaves out and how to get there."
      badges={[`Checked ${CHECKED}`, "1-day ¥5,900", "Ise-Shima"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Parque España <strong>1-day Passport is ¥5,900 for adults</strong> (18–64), ¥4,700 for juniors
            (12–17) and seniors 65+, and ¥4,100 for children aged 3–11. The <strong>2-day Passport is ¥8,000</strong>{" "}
            for adults. It includes park admission, the shows and the attractions; Carmen Hall, Carnival House and
            Treasure Hunting in Dragon&apos;s Castle cost extra.
          </p>
          <p className={styles.bodyText}>
            By train, take the <strong>Kintetsu limited express to Ugata</strong> (about 2 h 10 min from Nagoya,
            2 h 30 min from Osaka) and the Mie Kotsu bus (about 13 min). Opening days and hours are on the{" "}
            <a href={CALENDAR} target="_blank" rel="noopener" style={linkStyle}>park calendar</a>. Klook sells the
            Passport. Shima Spain Village English page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: parqueEspanaTicket.url, label: "Check Parque España tickets on Klook →" }}
      stats={[
        { label: "1-day Passport (adult)", value: "¥5,900" },
        { label: "2-day Passport (adult)", value: "¥8,000" },
        { label: "From Osaka (Kintetsu)", value: "about 2 h 30 min + bus" },
        { label: "From Nagoya (Kintetsu)", value: "about 2 h 10 min + bus" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> it is a long way for one day from Osaka or Nagoya, so consider pairing it with
          Ise Grand Shrine or staying a night. The 2-day Passport costs ¥2,100 more than the 1-day for adults.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Shima Spain Village?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Prices include tax. Juniors and seniors pay the same.
            </p>
          ),
          table: {
            head: ["Passport", "Adult 18–64", "Junior 12–17", "Child 3–11", "Senior 65+"],
            rows: [
              ["1-day Passport", "¥5,900", "¥4,700", "¥4,100", "¥4,700"],
              ["2-day Passport", "¥8,000", "¥6,400", "¥5,600", "¥6,400"],
            ],
            note: (
              <>
                Shima Spain Village English page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Carmen Hall, Carnival House and Treasure Hunting in Dragon&apos;s Castle cost extra. Klook sells the
                ticket at its own price.
              </>
            ),
          },
          ctas: [{ href: parqueEspanaTicket.url, label: "Book the Parque España Passport on Klook →" }],
        },
        {
          label: "Getting there",
          title: "How do I get to Shima Spain Village?",
          body: null,
          table: {
            head: ["From", "Route", "Time"],
            rows: [
              ["Nagoya", "Kintetsu limited express to Ugata, then Mie Kotsu bus", "about 2 h 10 min + 13 min"],
              ["Osaka (Uehommachi)", "Kintetsu limited express to Ugata, then Mie Kotsu bus", "about 2 h 30 min + 13 min"],
              ["Tokyo", "Nozomi to Nagoya (about 1 h 40 min), then as from Nagoya", ""],
            ],
            note: <>Shima Spain Village English page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Hot spring",
          title: "Is there a hot spring at Shima Spain Village?",
          body: (
            <p className={styles.bodyText}>
              Yes: Himawari-no-Yu, in the same resort as the park, with indoor and open-air baths. It is not part of the
              Passport — bathing is ¥1,400 for ages 12 and over and ¥1,000 for ages 4–11, and park visitors get a
              discounted rate.
            </p>
          ),
        },
      ]}
      sameDay={{
        heading: "Same trip: Ise-Shima",
        intro: "Ise-Shima is a Kintetsu trip from Osaka or Nagoya. These cover the rest of it.",
        tours: [kintetsuRailPass, iseShrineOkageGuidedTour, iseKumanoWakayamaAreaPass],
      }}
      links={
        <p className={styles.bodyText}>
          The train is covered in our{" "}
          <Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>Kintetsu Rail Pass guide</Link>. Coming
          from Nagoya, see the{" "}
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2 day itinerary</Link>{" "}
          and the region&apos;s other parks,{" "}
          <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>LEGOLAND Japan</Link> and{" "}
          <Link href="/guides/attractions/nagashima-spa-land-tickets" style={linkStyle}>Nagashima Spa Land</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Shima Spain Village?",
          a: `The Parque España 1-day Passport is ¥5,900 for adults, ¥4,700 for juniors and seniors, ¥4,100 for children 3–11; the 2-day Passport is ¥8,000 for adults. Checked ${CHECKED}.`,
        },
        {
          q: "What does the Passport include?",
          a: "Park admission, the shows and the attractions. Carmen Hall, Carnival House and Treasure Hunting in Dragon's Castle cost extra.",
        },
        {
          q: "How do I get to Parque España from Osaka?",
          a: "Kintetsu limited express from Osaka Uehommachi to Ugata (about 2 h 30 min), then the Mie Kotsu bus (about 13 min).",
        },
        {
          q: "Is the hot spring included?",
          a: "No. Himawari-no-Yu is ¥1,400 for ages 12+ and ¥1,000 for ages 4–11, with a discount for park visitors.",
        },
        {
          q: "Can I buy Shima Spain Village tickets on Klook?",
          a: "Yes. Klook sells the Shima Spain Village PARQUE ESPANA admission.",
        },
      ]}
      related={[
        { href: "/guides/transport/kintetsu-rail-pass", title: "Kintetsu Rail Pass" },
        { href: "/guides/attractions/nagashima-spa-land-tickets", title: "Nagashima Spa Land Tickets" },
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2 Day Itinerary" },
        { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets" },
      ]}
      banner={{
        title: "Spain in Ise-Shima",
        desc: "Parque España admission, shows and rides on one Passport.",
        label: "View Parque España tickets →",
      }}
    />
  );
}
