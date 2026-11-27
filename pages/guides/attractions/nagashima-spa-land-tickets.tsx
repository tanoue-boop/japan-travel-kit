import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { kintetsuRailPass, shinkansenTokyoNagoya } from "../../../lib/klook-links";
import { nagashimaSpaLandTicket, nabanaNoSatoNagashimaTour } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from Nagashima
// Resort's own ticket table, read by node fetch on 28 Nov 2026:
// nagashima-onsen.co.jp/resort/fee/ticket_list.html (Passport = park entry + ride
// passport: adult 6,000 / elementary 4,500 / age 2+ 2,800 yen, after 15:00 4,200 /
// 3,200 / 1,900; seniors 65+ 3,000 at the window only; entry only 1,800 / 1,100 / 600,
// after 15:00 1,500 / 1,000 / 500; ride passport added inside 5,200 / 3,900 / 2,500,
// after 15:00 3,600 / 2,800 / 1,700; Yuami-no-Shima onsen add-on 1,000; Wide Passport
// with the pool only in the summer pool season 8,000 / 5,900 / 3,600; parking car
// 1,000; tattoos refused at the pool and Yuami-no-Shima) and
// nagashima-onsen.co.jp/resort/fee/gain.html (advance tickets at FamilyMart and
// 7-Eleven, no exchange needed at the gate). Hours are on the park's daily calendar,
// so none are printed. No Klook price is printed (403).
const ROUTE = "/guides/attractions/nagashima-spa-land-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.nagashima-onsen.co.jp/resort/fee/ticket_list.html";
const PARK = "https://www.nagashima-onsen.co.jp/spaland/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NagashimaSpaLandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nagashima Spa Land Tickets"
      title="Nagashima Spa Land Tickets 2026: Passport Price & Booking"
      description="Nagashima Spa Land Passport (entry + unlimited rides) is ¥6,000 for adults, ¥4,200 after 15:00. Entry-only price, add-ons and where to buy tickets."
      h1={<>Nagashima Spa Land Tickets 2026: <br />Passport Price &amp; Where to Buy</>}
      subtitle="The roller-coaster park at Nagashima Resort, near Nagoya: what the ride passport costs, the cheaper afternoon price and the add-ons."
      badges={[`Checked ${CHECKED}`, "Passport ¥6,000", "Near Nagoya"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Nagashima Spa Land <strong>Passport — park entry plus unlimited rides — is ¥6,000 for adults</strong>,
            ¥4,500 for elementary pupils and ¥2,800 for children from age 2. <strong>After 15:00 it drops to
            ¥4,200</strong> (¥3,200 / ¥1,900). Seniors 65+ pay ¥3,000 at the ticket window. Entry alone is ¥1,800
            for adults, with rides paid on top.
          </p>
          <p className={styles.bodyText}>
            Advance tickets are sold at FamilyMart and 7-Eleven in Japan and go straight through the gate; Klook
            sells the Passport as well. Hours change by day, so check the{" "}
            <a href={PARK} target="_blank" rel="noopener" style={linkStyle}>park&apos;s own page</a> for your date.
            Nagashima Resort ticket table, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nagashimaSpaLandTicket.url, label: "Check the Nagashima Spa Land Passport on Klook →" }}
      stats={[
        { label: "Passport (adult)", value: "¥6,000" },
        { label: "Passport after 15:00 (adult)", value: "¥4,200" },
        { label: "Entry only (adult)", value: "¥1,800" },
        { label: "Parking (car)", value: "¥1,000" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> if you came for the coasters, buy the Passport — entry plus the ride passport
          bought separately costs ¥7,000. The after-15:00 Passport is the cheapest way to ride and stay for the
          evening.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Nagashima Spa Land?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Children under 2 are not listed in the price table. Seniors buy at the window only.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Elementary", "Age 2+", "Senior 65+"],
            rows: [
              ["Passport (entry + unlimited rides)", "¥6,000", "¥4,500", "¥2,800", "¥3,000 (window)"],
              ["Passport after 15:00", "¥4,200", "¥3,200", "¥1,900", "¥3,000 (window)"],
              ["Entry only", "¥1,800", "¥1,100", "¥600", "—"],
              ["Entry only after 15:00", "¥1,500", "¥1,000", "¥500", "—"],
              ["Ride passport added inside the park", "¥5,200", "¥3,900", "¥2,500", "¥2,500"],
            ],
            note: (
              <>
                Nagashima Resort ticket table, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source (Japanese)</a>.
                Klook sells the Passport at its own price.
              </>
            ),
          },
        },
        {
          label: "Add-ons",
          title: "What can I add to a Spa Land ticket?",
          body: null,
          table: {
            head: ["Add-on", "Adult", "Note"],
            rows: [
              ["Yuami-no-Shima hot spring", "¥1,000", "Bought at the Yuami-no-Shima entrance"],
              ["Jumbo Seawater Pool", "¥4,000", "Summer pool season only"],
              ["Wide Passport (entry + rides + pool)", "¥8,000", "Summer pool season only"],
            ],
            note: (
              <>
                Nagashima Resort ticket table, checked {CHECKED}. Guests with tattoos are refused at the pool and at
                Yuami-no-Shima.
              </>
            ),
          },
          ctas: [{ href: nagashimaSpaLandTicket.url, label: "Book the Spa Land Passport on Klook →" }],
        },
        {
          label: "Where to buy",
          title: "Where can I buy Nagashima Spa Land tickets?",
          body: (
            <p className={styles.bodyText}>
              At the park, at FamilyMart and 7-Eleven stores in Japan (no exchange at the gate — you walk straight
              in), or from Klook before you travel. Changes and refunds are not possible on the convenience-store
              advance tickets.
            </p>
          ),
        },
      ]}
      sameDay={{
        heading: "Same trip: Nagoya and Mie",
        intro: "Nagashima Resort is in Kuwana, Mie Prefecture, on the Nagoya side. These fit the same days.",
        tours: [nabanaNoSatoNagashimaTour, kintetsuRailPass, shinkansenTokyoNagoya],
      }}
      links={
        <p className={styles.bodyText}>
          Spa Land is a day from Nagoya: see the{" "}
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2 day itinerary</Link>, the
          other big parks nearby —{" "}
          <Link href="/guides/attractions/ghibli-park-tickets" style={linkStyle}>Ghibli Park</Link> and{" "}
          <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>LEGOLAND Japan</Link> — and the{" "}
          <Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>Kintetsu Rail Pass guide</Link>. Further
          into Mie,{" "}
          <Link href="/guides/attractions/shima-spain-village-tickets" style={linkStyle}>Shima Spain Village</Link>{" "}
          is the other theme park.
          {" "}In the same Nagashima Resort, the <Link href="/guides/attractions/nabana-no-sato-illumination-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Nabana no Sato</Link> illumination is ¥3,200 at the gate (¥3,000 at convenience stores), 10:00–21:00 on December weekdays.
          {" "}For another ride park in Mie, the <Link href="/guides/attractions/suzuka-circuit-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Suzuka Circuit Park</Link> passport is from ¥4,800 online for adults, ¥500 more at the gate.
        </p>
      }
      faq={[
        {
          q: "How much is the Nagashima Spa Land Passport?",
          a: `¥6,000 for adults, ¥4,500 for elementary pupils and ¥2,800 for children from 2; after 15:00 ¥4,200, ¥3,200 and ¥1,900. Nagashima Resort, checked ${CHECKED}.`,
        },
        {
          q: "What does the Passport include?",
          a: "Entry to Nagashima Spa Land and unlimited rides. The hot spring and the summer pool cost extra.",
        },
        {
          q: "Is there a senior price?",
          a: "Yes. The Passport is ¥3,000 for seniors 65+, sold at the ticket window only.",
        },
        {
          q: "Can I buy tickets at a convenience store?",
          a: "Yes, at FamilyMart and 7-Eleven in Japan. The ticket is used at the gate as it is, with no exchange.",
        },
        {
          q: "Can I buy Nagashima Spa Land tickets on Klook?",
          a: "Yes. Klook sells the admission with the unlimited-rides Passport.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2 Day Itinerary" },
        { href: "/guides/attractions/ghibli-park-tickets", title: "Ghibli Park Tickets" },
        { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets" },
        { href: "/guides/attractions/shima-spain-village-tickets", title: "Shima Spain Village Tickets" },
      ]}
      banner={{
        title: "Coasters near Nagoya",
        desc: "Nagashima Spa Land entry with unlimited rides.",
        label: "View Spa Land tickets →",
      }}
    />
  );
}
