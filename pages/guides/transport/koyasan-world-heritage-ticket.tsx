import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kumanoKoyaTwoDayTour, kumanoSanzanExpressTour } from "../../../lib/klook-links";
import { koyasanWorldHeritageTicket, koyasanOkunoinDayTour } from "../../../lib/klook-links-a35";

// Task jtk-20261128-A35 (day 2). Every figure is from Nankai's own page for the
// ticket, read by node fetch on 28 Nov 2026: nankai.co.jp/traffic/digital/koyasan.html
// (contents: round trip to Koyasan Station, two-day Nankai Rinkan Bus pass except the
// Tatsuri, Koya-Ryujin and Kyoto-Koyasan lines, coupons; on sale year-round from one
// month before; 2 consecutive days; example fares from Namba 3,980 / 2,000 yen and
// with the outbound Koya limited express 4,910 / 2,460 yen; no child-only sales; up to
// 8 per payment; smartphone and credit card needed). The English summary page on
// nankai.co.jp does not print the fare. No Klook price is printed.
const ROUTE = "/guides/transport/koyasan-world-heritage-ticket";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.nankai.co.jp/traffic/digital/koyasan.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KoyasanWorldHeritageTicketPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Koyasan World Heritage Ticket"
      title="Koyasan World Heritage Ticket 2026: Price & How to Use"
      description="Nankai's Koyasan World Heritage Digital Ticket is ¥3,980 from Namba: train round trip, 2 days of Koyasan buses incl. Okunoin, and coupons. How it works."
      h1={<>Koyasan World Heritage Ticket 2026: <br />Price, What&apos;s Included &amp; How to Use</>}
      subtitle="Nankai's two-day digital ticket from Osaka to Mt. Koya: the train there and back, the buses on the mountain, and discount coupons for the temples."
      badges={[`Checked ${CHECKED}`, "¥3,980 from Namba", "2 days"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Koyasan World Heritage Digital Ticket costs <strong>¥3,980 for adults from Namba</strong> (child
            ¥2,000), or <strong>¥4,910 with an outbound seat on the Limited Express Koya</strong> (child ¥2,460). It
            includes a <strong>round-trip train ticket to Koyasan Station</strong>, a{" "}
            <strong>two-day pass for Nankai Rinkan buses on Koyasan</strong> (including to Okunoin), and coupons for
            Kongobu-ji, the Kondo, the Konpon Daito, the Reihokan and shops. Everything is valid for 2 consecutive
            days from the date you choose.
          </p>
          <p className={styles.bodyText}>
            It is a smartphone ticket: you scan a QR code at the gates and show the bus ticket screen to the driver.
            Nankai sells it from one month before the travel date; Klook sells it as well. Nankai&apos;s ticket page,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: koyasanWorldHeritageTicket.url, label: "Check the Koyasan ticket on Klook →" }}
      stats={[
        { label: "From Namba (adult / child)", value: "¥3,980 / ¥2,000" },
        { label: "With Koya limited express (outbound)", value: "¥4,910 / ¥2,460" },
        { label: "Validity", value: "2 consecutive days" },
        { label: "Buses", value: "Nankai Rinkan Bus on Koyasan, 2 days" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the simplest way to do Koyasan from Osaka without a tour — one ticket for the
          train, the mountain buses and the temple discounts. Stay overnight at a temple and the two days cover the
          return.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Koyasan World Heritage Ticket?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The fare depends on the station you start from; Nankai gives Namba as its example. The limited-express
              version includes the outbound Koya seat only.
            </p>
          ),
          table: {
            head: ["From Namba", "Adult", "Child"],
            rows: [
              ["Train + bus ticket", "¥3,980", "¥2,000"],
              ["With outbound Limited Express Koya seat", "¥4,910", "¥2,460"],
            ],
            note: (
              <>
                Nankai, Koyasan World Heritage Digital Ticket page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source (Japanese)</a>.
                Nankai does not sell child tickets on their own. Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "What's included",
          title: "What does the Koyasan World Heritage Ticket include?",
          body: null,
          table: {
            head: ["Part", "Detail"],
            rows: [
              ["Train", "Round trip to Koyasan Station (fare only, or with the outbound Koya limited express seat)"],
              ["Bus", "Nankai Rinkan Bus on Koyasan for 2 days, except the Tatsuri, Koya-Ryujin and Kyoto-Koyasan lines"],
              ["Coupons", "Admission and facility discounts at Kongobu-ji, the Kondo, the Konpon Daito and the Reihokan; shop and café discounts"],
              ["Validity", "2 consecutive days from the date you choose, for train, bus and coupons alike"],
            ],
            note: <>Nankai ticket page, checked {CHECKED}. Benefits may change, Nankai notes.</>,
          },
        },
        {
          label: "How to use",
          title: "How do I buy and use the Koyasan ticket?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              You need a smartphone. Nankai&apos;s own sales take Visa, Mastercard, JCB, American Express and Diners
              Club.
            </p>
          ),
          table: {
            head: ["Step", "Detail"],
            rows: [
              ["Buy", "From one month before the travel date, all year; up to 8 tickets per payment"],
              ["Train", "Hold the QR code to the reader on a compatible ticket gate"],
              ["Bus", "Tap “use ticket” on the bus ticket screen when getting off and show the driver"],
              ["Groups", "One phone can show several tickets (swipe), or tickets can be shared to others' phones"],
              ["Refund", "Only if train, bus and coupons are all unused and the ticket is still valid"],
            ],
            note: <>Nankai ticket page, checked {CHECKED}.</>,
          },
          ctas: [{ href: koyasanWorldHeritageTicket.url, label: "Book the Koyasan ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Koyasan with a guide",
        intro: "If you'd rather not plan the trains and buses, these guided trips cover Koyasan and the Kumano side.",
        tours: [koyasanOkunoinDayTour, kumanoKoyaTwoDayTour, kumanoSanzanExpressTour],
      }}
      links={
        <p className={styles.bodyText}>
          Koyasan is one end of the pilgrimage in our{" "}
          <Link href="/guides/attractions/kumano-kodo-tour" style={linkStyle}>Kumano Kodo tour guide</Link>. For the Osaka days
          around it, see{" "}
          <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link>, the{" "}
          <Link href="/guides/attractions/osaka-3-day-itinerary" style={linkStyle}>Osaka 3 day itinerary</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>Kansai 5 day itinerary</Link>. Going on
          round the Kii Peninsula to Kumano and Ise, the{" "}
          <Link href="/guides/transport/ise-kumano-wakayama-area-pass" style={linkStyle}>Ise-Kumano-Wakayama Area Tourist Pass</Link>{" "}
          is JR&apos;s pass for that loop.
        </p>
      }
      faq={[
        {
          q: "How much is the Koyasan World Heritage Ticket?",
          a: `From Namba: ¥3,980 for adults and ¥2,000 for children, or ¥4,910 / ¥2,460 with an outbound Limited Express Koya seat. Nankai, checked ${CHECKED}.`,
        },
        {
          q: "Does the Koyasan ticket include the bus to Okunoin?",
          a: "Yes. It includes two days of Nankai Rinkan buses on Koyasan; only the Tatsuri, Koya-Ryujin and Kyoto-Koyasan lines are excluded.",
        },
        {
          q: "How long is the Koyasan World Heritage Ticket valid?",
          a: "Two consecutive days from the date you choose, for the train, the bus and the coupons.",
        },
        {
          q: "Is there a child-only ticket?",
          a: "No. Nankai does not sell child tickets on their own; children travel on child tickets bought with an adult's.",
        },
        {
          q: "Do I need a smartphone?",
          a: "Yes. It is a digital ticket: a QR code for the train gates and a ticket screen for the bus, bought with a credit card.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kumano-kodo-tour", title: "Kumano Kodo Tour" },
        { href: "/guides/transport/ise-kumano-wakayama-area-pass", title: "Ise-Kumano-Wakayama Area Tourist Pass 2026: Price & Map" },
        { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
        { href: "/guides/transport/osaka-transportation", title: "Getting Around Osaka" },
      ]}
      banner={{
        title: "Osaka to Mt. Koya on one ticket",
        desc: "Train there and back, two days of mountain buses and temple discounts.",
        label: "View the Koyasan ticket →",
      }}
    />
  );
}
