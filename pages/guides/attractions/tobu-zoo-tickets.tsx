import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { skytreeTicket } from "../../../lib/klook-links";
import { tobuZooTicket, nikkoPassTobu, sumidaAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Every figure is from Tobu Zoo's own
// Japanese pages, read by node fetch on 28 Nov 2026: tobuzoo.com/ticket/ (admission adult
// 18+ 2,300 yen, 12-17 1,800, 3-11 1,000, 60+ 1,500, 2 and under free; admission + ride
// pass set 5,900 / 5,400 / 4,300 / 4,600; ride pass alone 3,600 / 3,600 / 3,300 / 3,100;
// ride ticket 100 yen; rides need a ride pass or tickets), /winter_illuminations/about/
// (Winter Illumination 24 Oct 2026 - 28 Feb 2027, 17:00-20:00, 24-25 Dec to 21:00; daily
// 5-31 Dec and 2-6 Jan, otherwise weekends and holidays), the top page (28 Nov 2026 hours
// 10:00-20:00) and /access/ (Tobu-Dobutsu-Koen Station, 600 m / 10 min on foot; from
// Tokyo Skytree by limited express Ryomo from 35 min). No Klook price is printed.
const ROUTE = "/guides/attractions/tobu-zoo-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.tobuzoo.com/ticket/";
const ILLUMI = "https://www.tobuzoo.com/winter_illuminations/about/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function TobuZooTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Tobu Zoo Tickets"
      title="Tobu Zoo Tickets 2026: Price, Ride Pass & Illumination"
      description="Tobu Zoo admission is ¥2,300 for adults and ¥1,000 for children; with unlimited rides it is ¥5,900. Winter illumination dates and the train from Tokyo."
      h1={<>Tobu Zoo Tickets 2026: <br />Price, Ride Pass &amp; Illumination</>}
      subtitle="The zoo and amusement park in Miyashiro, Saitama: admission, the ride pass, winter illumination nights and getting there."
      badges={[`Checked ${CHECKED}`, "¥2,300 adult", "Saitama"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Tobu Zoo admission is <strong>¥2,300 for adults</strong> (18 and over), ¥1,800 for ages 12–17, ¥1,000
            for children aged 3–11 and ¥1,500 for over-60s; under-3s are free. Rides are not included: the set
            with an <strong>unlimited ride pass is ¥5,900</strong> for adults, or buy ride tickets at ¥100 each.
          </p>
          <p className={styles.bodyText}>
            The Winter Illumination runs 17:00–20:00 until 28 February 2027 (daily from 5 to 31 December, otherwise
            mostly weekends and holidays), and daytime visitors can stay for it. The park is 10 minutes on foot
            from Tobu-Dobutsu-Koen Station. Klook sells the ticket. Tobu Zoo, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: tobuZooTicket.url, label: "Check Tobu Zoo tickets on Klook →" }}
      stats={[
        { label: "Adult (18+)", value: "¥2,300" },
        { label: "Child (3–11)", value: "¥1,000" },
        { label: "With ride pass", value: "¥5,900" },
        { label: "Illumination", value: "17:00–20:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> for a zoo day, admission is enough. If the children want more than a few rides,
          the ¥5,900 set costs the same as admission plus the ride pass bought inside, so decide on the day.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Tobu Zoo?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              A 12-year-old in elementary school pays the child rate; an 18-year-old in high school pays the 12–17
              rate. Over-60s show proof of age.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult 18+", "12–17", "3–11", "60+"],
            rows: [
              ["Admission", "¥2,300", "¥1,800", "¥1,000", "¥1,500"],
              ["Admission + unlimited rides", "¥5,900", "¥5,400", "¥4,300", "¥4,600"],
              ["Ride pass only (admission extra)", "¥3,600", "¥3,600", "¥3,300", "¥3,100"],
            ],
            note: (
              <>
                Tobu Zoo prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "How do you get to Tobu Zoo?",
          body: (
            <p className={styles.bodyText}>
              The nearest station is Tobu-Dobutsu-Koen, 600 m (about 10 minutes) on foot. From Tokyo Skytree Station
              the limited express Ryomo takes from 35 minutes. Hours change by day; on illumination days the park
              stays open to 20:00 (21:00 on 24–25 December).{" "}
              <a href={ILLUMI} target="_blank" rel="noopener" style={linkStyle}>Illumination calendar</a>.
            </p>
          ),
          ctas: [{ href: tobuZooTicket.url, label: "Book Tobu Zoo on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same line: Skytree and Nikko",
        intro: "Tobu Zoo is on the Tobu line between Tokyo Skytree and Nikko.",
        tours: [skytreeTicket, sumidaAquariumTicket, nikkoPassTobu],
      }}
      links={
        <p className={styles.bodyText}>
          With children, the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          has more ideas. Before the train, see{" "}
          <Link href="/guides/attractions/tokyo-skytree-tickets" style={linkStyle}>Tokyo Skytree tickets</Link>; further
          up the line, the{" "}
          <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko day trip</Link>. For more of the city,{" "}
          <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Tobu Zoo?",
          a: `Admission is ¥2,300 for adults, ¥1,800 for ages 12–17, ¥1,000 for ages 3–11 and ¥1,500 for over-60s. Checked ${CHECKED}.`,
        },
        {
          q: "Are rides included in admission?",
          a: "No. Buy the admission and unlimited-ride set (¥5,900 for adults), a ride pass on its own, or ride tickets at ¥100 each.",
        },
        {
          q: "When is the Winter Illumination?",
          a: "24 October 2026 – 28 February 2027, 17:00–20:00 (to 21:00 on 24–25 December). Every day from 5 to 31 December and 2 to 6 January, otherwise on weekends and holidays.",
        },
        {
          q: "How do I get to Tobu Zoo from Tokyo?",
          a: "Take the Tobu line to Tobu-Dobutsu-Koen Station, then walk 10 minutes. The limited express Ryomo from Tokyo Skytree takes from 35 minutes.",
        },
        {
          q: "Can I buy Tobu Zoo tickets on Klook?",
          a: "Yes. Klook sells a Tobu Zoo admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/tokyo-skytree-tickets", title: "Tokyo Skytree Tickets" },
        { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip" },
        { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo" },
      ]}
      banner={{
        title: "A zoo with rides",
        desc: "Admission to Tobu Zoo in Saitama.",
        label: "View Tobu Zoo tickets →",
      }}
    />
  );
}
