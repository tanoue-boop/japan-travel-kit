import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tokyoBayGoKartTour, tokyoBaySunsetBoatCruise } from "../../../lib/klook-links";
import { maxellAquaParkShinagawaTicket, sumidaAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from the aquarium's own
// Japanese pages, read by node fetch on 28 Nov 2026: aqua-park.jp/aqua/info/ (admission,
// same-day or advance: adult 2,800 yen (high school students 1,800 with ID), elementary and
// junior high 1,300, child 4+ 800; annual passport 5,200 / 2,500 / 1,500; attractions
// separate: Dolphin Party 500 yen (age 6+), Port of Pirates 500 yen (120 cm+); hours
// 24 Sep - 23 Dec 2026 10:00-20:00 (last entry 19:00), 24-25 Dec 10:00-19:30 (last entry
// 19:00), 26-31 Dec 10:00-20:00 (last entry 19:00); later dates on request; disability
// certificate holder and one companion half price) and /aqua/access/ (inside Shinagawa
// Prince Hotel, 4-10-30 Takanawa; about 2 min on foot from the Takanawa exit of Shinagawa
// Station; Keikyu from Haneda domestic terminal fastest 14 min, international 11 min).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/maxell-aqua-park-shinagawa-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.aqua-park.jp/aqua/info/";
const ACCESS = "https://www.aqua-park.jp/aqua/access/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MaxellAquaParkShinagawaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Maxell Aqua Park Shinagawa Tickets"
      title="Maxell Aqua Park Shinagawa Tickets 2026: Price & Hours"
      description="Maxell Aqua Park Shinagawa is ¥2,800 for adults and ¥1,300 for children, open 10:00–20:00 in December, 2 minutes from Shinagawa Station. How to book."
      h1={<>Maxell Aqua Park Shinagawa Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="The aquarium inside the Shinagawa Prince Hotel: prices by age, evening hours over Christmas and the rides that cost extra."
      badges={[`Checked ${CHECKED}`, "¥2,800 adult", "Tokyo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Maxell Aqua Park Shinagawa ticket is <strong>¥2,800 for adults</strong>, ¥1,300 for elementary and
            junior high school pupils and ¥800 for children aged 4 and up. High school students pay ¥1,800 with a
            student ID. The two rides inside cost ¥500 each on top.
          </p>
          <p className={styles.bodyText}>
            Until 23 December 2026 it is open <strong>10:00–20:00</strong> (last entry 19:00); on 24–25 December it
            closes at 19:30, and from 26 to 31 December it is back to 10:00–20:00. It is inside the Shinagawa Prince
            Hotel, about <strong>2 minutes on foot</strong> from the Takanawa exit of Shinagawa Station. Klook sells
            the ticket. Maxell Aqua Park Shinagawa, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: maxellAquaParkShinagawaTicket.url, label: "Check Maxell Aqua Park tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,800" },
        { label: "Elementary / junior high", value: "¥1,300" },
        { label: "December hours", value: "10:00–20:00" },
        { label: "Last entry", value: "19:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> it stays open until 20:00, so it works as an evening stop on an arrival or
          departure day — the fastest Keikyu trains from Haneda take 11–14 minutes.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Maxell Aqua Park Shinagawa?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Guests staying at four Prince hotels in Takanawa and Shinagawa get a lower price at the ticket centre.
              Visitors with a disability certificate and one companion pay half.
            </p>
          ),
          table: {
            head: ["Ticket", "Admission", "Annual passport"],
            rows: [
              ["Adult", "¥2,800", "¥5,200"],
              ["High school (with student ID)", "¥1,800", "—"],
              ["Elementary and junior high school", "¥1,300", "¥2,500"],
              ["Child (age 4 and up)", "¥800", "¥1,500"],
              ["Dolphin Party ride (age 6+)", "¥500", "—"],
              ["Port of Pirates ride (120 cm+)", "¥500", "—"],
            ],
            note: (
              <>
                Maxell Aqua Park Shinagawa prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Getting there",
          title: "Where is Maxell Aqua Park Shinagawa?",
          body: (
            <p className={styles.bodyText}>
              Inside the Shinagawa Prince Hotel (4-10-30 Takanawa, Minato-ku), about 2 minutes on foot from the
              Takanawa exit of Shinagawa Station (shinkansen, JR and Keikyu). From Haneda Airport the Keikyu line
              takes 11 minutes at the fastest from the international terminal. See the{" "}
              <a href={ACCESS} target="_blank" rel="noopener" style={linkStyle}>access page</a>.
            </p>
          ),
          ctas: [{ href: maxellAquaParkShinagawaTicket.url, label: "Book Maxell Aqua Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day around Tokyo Bay",
        intro: "Shinagawa is on the bay side of the city. These add a ride, a cruise or another aquarium.",
        tours: [tokyoBayGoKartTour, tokyoBaySunsetBoatCruise, sumidaAquariumTicket],
      }}
      links={
        <p className={styles.bodyText}>
          With children, the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          has more indoor ideas. Compare{" "}
          <Link href="/guides/attractions/sumida-aquarium-tickets" style={linkStyle}>Sumida Aquarium</Link> at the
          Skytree and{" "}
          <Link href="/guides/attractions/sunshine-aquarium-tickets" style={linkStyle}>Sunshine Aquarium</Link> in
          Ikebukuro, and see{" "}
          <Link href="/guides/attractions/where-to-stay-in-tokyo" style={linkStyle}>where to stay in Tokyo</Link> for
          Shinagawa hotels.
          {" "}Not to be confused with <Link href="/guides/attractions/shinagawa-aquarium-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Shinagawa Aquarium</Link> in Katsushima, reached by free bus from Oimachi (¥1,350 for adults).
        </p>
      }
      faq={[
        {
          q: "How much is Maxell Aqua Park Shinagawa?",
          a: `¥2,800 for adults, ¥1,300 for elementary and junior high pupils and ¥800 for children aged 4 and up; high school students pay ¥1,800 with ID. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "10:00–20:00 (last entry 19:00) until 23 December 2026 and from 26 to 31 December; on 24–25 December it closes at 19:30.",
        },
        {
          q: "Are the rides included?",
          a: "No. Dolphin Party (age 6+) and Port of Pirates (120 cm and taller) cost ¥500 per ride on top of admission.",
        },
        {
          q: "How far is it from Shinagawa Station?",
          a: "About 2 minutes on foot from the Takanawa exit; it is inside the Shinagawa Prince Hotel.",
        },
        {
          q: "Can I buy tickets on Klook?",
          a: "Yes. Klook sells a dated Maxell Aqua Park Shinagawa admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/sumida-aquarium-tickets", title: "Sumida Aquarium Tickets" },
        { href: "/guides/attractions/sunshine-aquarium-tickets", title: "Sunshine Aquarium Tickets" },
        { href: "/guides/attractions/where-to-stay-in-tokyo", title: "Where to Stay in Tokyo" },
      ]}
      banner={{
        title: "An evening aquarium at Shinagawa Station",
        desc: "Admission to Maxell Aqua Park Shinagawa.",
        label: "View Maxell Aqua Park tickets →",
      }}
    />
  );
}
