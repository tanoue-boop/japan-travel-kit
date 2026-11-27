import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { iseShrineOkageGuidedTour, kintetsuRailPass } from "../../../lib/klook-links";
import { tobaAquariumTicket, parqueEspanaTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from Toba Aquarium's own site, read by node fetch on 28 Nov 2026:
// aquarium.co.jp/ryoukin/ (individual adult 2,800 yen, elementary and junior high 1,600, age 3+ 800;
// annual passport 9,000, online only from 1 Jan 2026) and /eigyo/ (open every day 9:30-17:00, last entry
// 16:00; 9:00-17:30 at Golden Week, 1-28 Aug and Silver Week; about 10 min on foot from JR / Kintetsu Toba
// Station). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/toba-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://aquarium.co.jp/ryoukin/";
const HOURS = "https://aquarium.co.jp/eigyo/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TobaAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Toba Aquarium Tickets"
      title="Toba Aquarium Tickets 2026: Price, Hours & Access"
      description="Toba Aquarium in Mie is ¥2,800 for adults, ¥1,600 for school-age children and ¥800 for age 3+. Open daily 9:30–17:00; 10 minutes on foot from Toba Station."
      h1={<>Toba Aquarium Tickets 2026: <br />Price, Hours &amp; Access</>}
      subtitle="The aquarium on the Ise-Shima coast: ticket prices, opening hours and the walk from Toba Station."
      badges={[`Checked ${CHECKED}`, "¥2,800 adult", "Toba, Mie"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Toba Aquarium ticket is <strong>¥2,800 for adults</strong>, ¥1,600 for elementary and junior high
            pupils and ¥800 for children aged 3 and over.
          </p>
          <p className={styles.bodyText}>
            It is <strong>open every day, 9:30–17:00</strong> (last entry 16:00), and about 10 minutes on foot from JR
            and Kintetsu Toba Station. Klook sells an admission ticket. Toba Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: tobaAquariumTicket.url, label: "Check Toba Aquarium tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,800" },
        { label: "Elementary–junior high", value: "¥1,600" },
        { label: "Hours", value: "9:30–17:00" },
        { label: "Closed", value: "Never" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> pair it with Ise Grand Shrine on a day out from Nagoya or Osaka on Kintetsu, and
          arrive before 16:00.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Groups of 25 or more pay less. An annual passport is ¥9,000 for adults and, from 1 January 2026, is sold
              online only.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult", "¥2,800"],
              ["Elementary & junior high", "¥1,600"],
              ["Child (age 3+)", "¥800"],
              ["Annual passport, adult", "¥9,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells admission at its own price; show the voucher at the counter.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              Every day of the year, 9:30–17:00 with last entry at 16:00; at Golden Week, 1–28 August and Silver Week the
              hours are 9:00–17:30. The aquarium is about 10 minutes on foot from Toba Station, served by JR and Kintetsu.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: tobaAquariumTicket.url, label: "Book Toba Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Ise and Shima",
        intro: "Ise Grand Shrine is a few stops away, and Shima Spain Village is further down the Kintetsu line.",
        tours: [iseShrineOkageGuidedTour, parqueEspanaTicket, kintetsuRailPass],
      }}
      links={
        <p className={styles.bodyText}>
          For the trip, see the <Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>Kintetsu Rail Pass</Link>,
          <Link href="/guides/attractions/shima-spain-village-tickets" style={linkStyle}>Shima Spain Village tickets</Link>, the
          <Link href="/guides/transport/ise-kumano-wakayama-area-pass" style={linkStyle}>Ise-Kumano-Wakayama Area Pass</Link> and the
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2-day itinerary</Link>.
          {" "}Also by Toba Station, <Link href="/guides/attractions/mikimoto-pearl-island-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Mikimoto Pearl Island</Link> is ¥1,650 for adults, with ama diver demonstrations through the day.
        </p>
      }
      faq={[
        {
          q: "How much is Toba Aquarium?",
          a: `¥2,800 for adults, ¥1,600 for elementary and junior high pupils and ¥800 for children aged 3 and over. Checked ${CHECKED}.`,
        },
        {
          q: "What are Toba Aquarium's hours?",
          a: "9:30–17:00 every day, last entry 16:00; 9:00–17:30 at Golden Week, in August and at Silver Week.",
        },
        {
          q: "Is Toba Aquarium ever closed?",
          a: "No. The aquarium opens every day of the year.",
        },
        {
          q: "How do I get to Toba Aquarium?",
          a: "It is about 10 minutes on foot from Toba Station, on the JR and Kintetsu lines.",
        },
        {
          q: "Can I buy Toba Aquarium tickets on Klook?",
          a: "Yes. Klook sells an admission ticket; show the voucher at the counter.",
        },
      ]}
      related={[
        { href: "/guides/transport/kintetsu-rail-pass", title: "Kintetsu Rail Pass" },
        { href: "/guides/attractions/shima-spain-village-tickets", title: "Shima Spain Village Tickets" },
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2-Day Itinerary" },
        { href: "/guides/attractions/nabana-no-sato-illumination-tickets", title: "Nabana no Sato Illumination" },
      ]}
      banner={{
        title: "The aquarium on the Ise-Shima coast",
        desc: "Admission to Toba Aquarium.",
        label: "View Toba Aquarium tickets →",
      }}
    />
  );
}
