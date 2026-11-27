import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { suzukaCircuitParkTicket, nagashimaSpaLandTicket, nabanaNoSatoIlluminationTicket, tobaAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from Suzuka Circuit's own page, read by node fetch on 28 Nov 2026:
// suzukacircuit.jp/park/fee/ (as of 23 Nov 2026; prices change by date; web tickets 500 yen less than the gate;
// calendar shows advance adult prices of admission 2,000-2,400 and park passport 4,800-5,800 for Nov 2026-Feb 2027;
// base table: park passport web 4,800 / 3,400 / 2,200, gate 5,300 / 3,900 / 2,700 (adult high school+, child
// elementary and junior high, infant 3 to preschool); admission only web 2,000 / 1,000 / 800, gate 2,500 / 1,500 /
// 1,300; birthday passport web 4,500 / 3,100 / 2,000; hours on the calendar mostly 10:00-17:00, 9:30-17:30 on some
// days). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/suzuka-circuit-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.suzukacircuit.jp/park/fee/";
const HOURS = "https://www.suzukacircuit.jp/park/fee/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SuzukaCircuitParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Suzuka Circuit Park tickets"
      title="Suzuka Circuit Park Tickets 2026: Price, Hours & Passport"
      description="Suzuka Circuit Park tickets 2026: the ride passport is ¥4,800–5,800 online for adults, ¥500 more at the gate; admission only from ¥2,000. Hours by date."
      h1={<>Suzuka Circuit Park Tickets 2026: <br />Price, Hours &amp; Passport</>}
      subtitle="What the park passport and admission-only tickets cost at the motor theme park in Mie, and why the price depends on the day."
      badges={[`Checked ${CHECKED}`, "Passport from ¥4,800", "¥500 off online"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The <strong>Suzuka Circuit Park passport</strong> (entry plus unlimited rides) is <strong>¥4,800 to ¥5,800 for
            adults</strong> when bought online, depending on the date; at the gate it costs ¥500 more. On a standard day the
            online passport is ¥3,400 for children and ¥2,200 for infants (3 to preschool). Admission only starts at ¥2,000.
          </p>
          <p className={styles.bodyText}>
            The park is open from 10 a.m. to 5 p.m. on most days, 9:30 a.m. to 5:30 p.m. on some. Online tickets are for one
            date. Klook sells the passport, admission-only and fast-ride tickets. Suzuka Circuit, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: suzukaCircuitParkTicket.url, label: "Check the Suzuka Circuit Park ticket on Klook →" }}
      stats={[
        { label: "Passport, adult (online)", value: "from ¥4,800" },
        { label: "Passport, child (online)", value: "from ¥3,400" },
        { label: "Admission only", value: "from ¥2,000" },
        { label: "Gate price", value: "+¥500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> with children who ride, the passport is the ticket to buy; adults who only watch can
          take the admission-only ticket. Buying online saves ¥500 a person.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The table shows a standard-price day. On busier days the adult online prices rise to ¥2,200–2,400 for admission
              and ¥5,300–5,800 for the passport; the official calendar shows each date.
            </p>
          ),
          table: {
            head: ["Ticket (standard day)", "Adult (high school+)", "Child (6–15)", "Infant (3 to preschool)"],
            rows: [
              ["Park passport, online", "¥4,800", "¥3,400", "¥2,200"],
              ["Park passport, gate", "¥5,300", "¥3,900", "¥2,700"],
              ["Admission only, online", "¥2,000", "¥1,000", "¥800"],
              ["Admission only, gate", "¥2,500", "¥1,500", "¥1,300"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Online tickets are for a set date. Klook sells its tickets at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Suzuka Circuit Park open?",
          body: (
            <p className={styles.bodyText}>
              On most days on the official calendar the park opens from 10 a.m. to 5 p.m.; some days run from 9:30 a.m.
              to 5:30 p.m. Check the date on the official calendar, which also shows closed days and the price of each day.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: suzukaCircuitParkTicket.url, label: "Book Suzuka Circuit Park on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Mie and Nagoya",
        intro: "Suzuka is between Nagoya and Ise, so it pairs with these.",
        tours: [nagashimaSpaLandTicket, nabanaNoSatoIlluminationTicket, tobaAquariumTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For a trip around it, see the <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2-day itinerary</Link>. Nearby parks:
          <Link href="/guides/attractions/nagashima-spa-land-tickets" style={linkStyle}>Nagashima Spa Land</Link>, <Link href="/guides/attractions/nabana-no-sato-illumination-tickets" style={linkStyle}>Nabana no Sato</Link>
          and <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>LEGOLAND Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is a Suzuka Circuit Park ticket?",
          a: `The park passport with unlimited rides is ¥4,800 to ¥5,800 online for adults depending on the date, and ¥500 more at the gate. Admission only starts at ¥2,000 online. Checked ${CHECKED}.`,
        },
        {
          q: "What does the park passport include?",
          a: "Park entry and unlimited rides on the attractions. The admission-only ticket does not include rides.",
        },
        {
          q: "Is it cheaper online?",
          a: "Yes. Suzuka Circuit says web tickets are ¥500 cheaper than buying at the gate on the day.",
        },
        {
          q: "What are the opening hours?",
          a: "Mostly 10:00 to 17:00, and 9:30 to 17:30 on some days. Check the date on the official calendar.",
        },
        {
          q: "Who counts as a child?",
          a: "Child prices are for elementary and junior high school students; the infant price is for ages 3 to preschool. High school students pay the adult price.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nagashima-spa-land-tickets", title: "Nagashima Spa Land Tickets" },
        { href: "/guides/attractions/nabana-no-sato-illumination-tickets", title: "Nabana no Sato Illumination" },
        { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets" },
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2-Day Itinerary" },
      ]}
      banner={{
        title: "Rides at the home of Japanese racing",
        desc: "A Suzuka Circuit Park passport for one date.",
        label: "View the Suzuka ticket →",
      }}
    />
  );
}
