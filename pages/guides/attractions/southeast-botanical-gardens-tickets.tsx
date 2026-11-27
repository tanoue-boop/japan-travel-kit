import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { churaumiAquariumTicket } from "../../../lib/klook-links";
import { southeastBotanicalGardensTicket, ryukyuMuraTicket, dmmKariyushiAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Southeast Botanical
// Gardens' own site, read by node fetch on 28 Nov 2026: southeast-botanical.jp/information/
// (day 9:30-17:00, adult 15+ 2,000 yen, child 4-14 800; night 17:00-22:00, late Oct - late
// May illumination, 2,500 / 900; 1DAY 9:30-22:00, late Oct - late May, 2,850 / 1,200; 3 and
// under free; during the Christmas and New Year events, entry from 16:30 is charged at the
// event price; open days on the linked calendar) and /access/ (2146 Chibana, Okinawa City;
// car: about 30 min to Naha IC, 25 min on the Okinawa Expressway to Okinawa-Kita IC, then
// about 5 min; bus 190 Chibana line from the Naha Airport domestic terminal about 1 h 25 min
// to Nomin Kenshu Center-mae, then about 3 min by taxi; 350 free parking spaces).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/southeast-botanical-gardens-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.southeast-botanical.jp/information/";
const ACCESS = "https://www.southeast-botanical.jp/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SoutheastBotanicalGardensTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Southeast Botanical Gardens Tickets"
      title="Southeast Botanical Gardens Tickets 2026: Price & Lights"
      description="Southeast Botanical Gardens, Okinawa City: day ¥2,000, night illumination ¥2,500, 1DAY ¥2,850 for adults. Lights 17:00–22:00 until late May; access."
      h1={<>Southeast Botanical Gardens Tickets 2026: <br />Price &amp; Illumination</>}
      subtitle="The botanical gardens in Okinawa City: day, night and 1DAY tickets, the winter illumination season and how to get there from Naha."
      badges={[`Checked ${CHECKED}`, "From ¥2,000", "Okinawa City"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A day ticket (9:30–17:00) is <strong>¥2,000 for adults</strong> (15 and over) and ¥800 for children aged
            4 to 14. During the illumination season, late October to late May, the night ticket (17:00–22:00) is
            ¥2,500 / ¥900 and the 1DAY ticket (9:30–22:00) ¥2,850 / ¥1,200. Under-4s are free.
          </p>
          <p className={styles.bodyText}>
            During the Christmas and New Year events, entry from 16:30 is charged at the event price. Check the open
            days on the official calendar. By car it is about an hour from Naha Airport using the expressway. Klook
            sells the ticket. Southeast Botanical Gardens, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: southeastBotanicalGardensTicket.url, label: "Check Southeast Botanical Gardens tickets on Klook →" }}
      stats={[
        { label: "Day (adult)", value: "¥2,000" },
        { label: "Night (adult)", value: "¥2,500" },
        { label: "1DAY (adult)", value: "¥2,850" },
        { label: "Night hours", value: "17:00–22:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> in winter, go for the night illumination; the 1DAY ticket is only ¥350 more than
          the night ticket if you want to see the gardens in daylight too.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much are Southeast Botanical Gardens tickets?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Night and 1DAY tickets are sold for the illumination season (late October to late May). With a
              disability certificate, the holder and one carer pay half the same-day price. Prices may change without
              notice.
            </p>
          ),
          table: {
            head: ["Ticket", "Hours", "Adult (15+)", "Child (4–14)"],
            rows: [
              ["Day", "9:30–17:00", "¥2,000", "¥800"],
              ["Night (illumination)", "17:00–22:00", "¥2,500", "¥900"],
              ["1DAY (illumination)", "9:30–22:00", "¥2,850", "¥1,200"],
            ],
            note: (
              <>
                Southeast Botanical Gardens prices, checked {CHECKED}. Age 3 and under free.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price; redeem it at the counter inside.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "How do you get there?",
          body: (
            <p className={styles.bodyText}>
              The gardens are at 2146 Chibana, Okinawa City. By car from Naha Airport: about 30 minutes to Naha IC, 25
              minutes on the Okinawa Expressway to Okinawa-Kita IC, then about 5 minutes; parking is free (350
              spaces). By bus: route 190 (Chibana line) from the Naha Airport domestic terminal to Nomin Kenshu
              Center-mae takes about 1 hour 25 minutes, then about 3 minutes by taxi.{" "}
              <a href={ACCESS} target="_blank" rel="noopener" style={linkStyle}>Access page</a>.
            </p>
          ),
          ctas: [{ href: southeastBotanicalGardensTicket.url, label: "Book Southeast Botanical Gardens on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: central Okinawa",
        intro: "Spend the day at a village or an aquarium, then come to the gardens for the evening illumination.",
        tours: [ryukyuMuraTicket, dmmKariyushiAquariumTicket, churaumiAquariumTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/okinawa-3-day-itinerary" style={linkStyle}>Okinawa 3-day itinerary</Link>,{" "}
          <Link href="/guides/attractions/okinawa-day-tours" style={linkStyle}>Okinawa day tours</Link>,{" "}
          <Link href="/guides/attractions/ryukyu-mura-tickets" style={linkStyle}>Ryukyu Mura</Link> and{" "}
          <Link href="/guides/attractions/okinawa-world-tickets" style={linkStyle}>Okinawa World</Link>. For other
          winter lights, see{" "}
          <Link href="/guides/attractions/japan-winter-itinerary" style={linkStyle}>the Japan winter itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Southeast Botanical Gardens?",
          a: `Adults pay ¥2,000 for the day, ¥2,500 for the night illumination and ¥2,850 for the 1DAY ticket; children 4–14 pay ¥800, ¥900 or ¥1,200. Checked ${CHECKED}.`,
        },
        {
          q: "When is the illumination?",
          a: "From late October to late May, 17:00–22:00, according to the gardens' information page.",
        },
        {
          q: "Are prices different at Christmas and New Year?",
          a: "Yes. During those events, entry from 16:30 is charged at the event price.",
        },
        {
          q: "How do I get there by bus?",
          a: "Take route 190 (Chibana line) from the Naha Airport domestic terminal to Nomin Kenshu Center-mae, about 1 hour 25 minutes, then a taxi of about 3 minutes.",
        },
        {
          q: "Can I buy Southeast Botanical Gardens tickets on Klook?",
          a: "Yes. Klook sells day, night and 1DAY tickets; redeem the voucher at the counter inside.",
        },
      ]}
      related={[
        { href: "/guides/attractions/okinawa-3-day-itinerary", title: "Okinawa 3-Day Itinerary" },
        { href: "/guides/attractions/ryukyu-mura-tickets", title: "Ryukyu Mura Tickets" },
        { href: "/guides/attractions/okinawa-world-tickets", title: "Okinawa World Tickets" },
        { href: "/guides/attractions/okinawa-day-tours", title: "Okinawa Day Tours" },
      ]}
      banner={{
        title: "Gardens and winter lights",
        desc: "Admission to Southeast Botanical Gardens, Okinawa City.",
        label: "View Southeast Botanical Gardens tickets →",
      }}
    />
  );
}
