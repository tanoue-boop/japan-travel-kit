import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { aquaWorldOaraiTicket, hitachiAshikagaIlluminationTour, ashikagaStrawberryOutletTour } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from Aqua World Oarai's own pages, read by node fetch on 28 Nov 2026:
// aquaworld-oarai.com/guide/admission/ (adult 2,300, elementary and junior high 1,100, infant 3+ 400, under 3 free;
// web ticket holders enter first when crowded; NIGHT AQUAWORLD on Saturdays 17:45-20:00, last entry 19:00, web
// tickets only, same prices; annual passport 4,600 / 2,200 / 800; parking free, about 750 cars), /guide/ (hours
// 9:00-17:00, last entry 16:00; winter weekday hours 9:00-16:00, last entry 15:00, on 1-4, 14-18 and 21-22 Dec 2026
// and 12 Jan-26 Feb 2027; maintenance closure 7-11 Dec 2026; open over New Year) and /2026/11/24/admission2027/
// (from 8 Mar 2027: 2,500 / 1,200 / 500). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/aqua-world-oarai-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.aquaworld-oarai.com/guide/admission/";
const HOURS = "https://www.aquaworld-oarai.com/guide/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function AquaWorldOaraiTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Aqua World Oarai tickets"
      title="Aqua World Oarai Tickets 2026: Price, Hours & Night Visit"
      description="Aqua World Oarai 2026: adults ¥2,300, children ¥1,100, ages 3+ ¥400, rising to ¥2,500 from 8 March 2027. Hours, winter times, December closure and parking."
      h1={<>Aqua World Oarai Tickets 2026: <br />Price, Hours &amp; Night Visit</>}
      subtitle="What the Ibaraki shark aquarium costs now and after the March 2027 price rise, with the winter hours and closed days."
      badges={[`Checked ${CHECKED}`, "Adults ¥2,300", "Free parking"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Admission to Aqua World Ibaraki Oarai Aquarium is <strong>¥2,300 for adults</strong>, ¥1,100 for elementary and
            junior high school students and ¥400 from age 3. From <strong>8 March 2027 it rises to ¥2,500</strong>, ¥1,200
            and ¥500.
          </p>
          <p className={styles.bodyText}>
            It is open 9 a.m. to 5 p.m. (last entry 4 p.m.), with shorter 9 a.m. to 4 p.m. hours on some winter weekdays, and
            <strong> closed from 7 to 11 December 2026</strong> for maintenance. Parking is free. Klook sells an admission
            e-voucher. Aqua World Oarai, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: aquaWorldOaraiTicket.url, label: "Check the Aqua World Oarai ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,300" },
        { label: "Child (6–15)", value: "¥1,100" },
        { label: "Age 3+", value: "¥400" },
        { label: "From 8 Mar 2027, adult", value: "¥2,500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> going before 8 March 2027 saves ¥200 per adult; avoid 7 to 11 December, when the aquarium
          is closed.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              When the aquarium is crowded, visitors with web tickets or annual passports are let in first. NIGHT AQUAWORLD
              on Saturday evenings costs the same but is sold as a web ticket only.
            </p>
          ),
          table: {
            head: ["Ticket", "Now", "From 8 March 2027"],
            rows: [
              ["Adult", "¥2,300", "¥2,500"],
              ["Elementary and junior high", "¥1,100", "¥1,200"],
              ["Infant (3 and over)", "¥400", "¥500"],
              ["Under 3", "Free", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Aqua World Oarai open?",
          body: (
            <p className={styles.bodyText}>
              Usually 9 a.m. to 5 p.m., last entry 4 p.m. On weekdays of 1 to 4, 14 to 18 and 21 to 22 December 2026 and from 12
              January to 26 February 2027 it closes at 4 p.m. (last entry 3 p.m.). It is closed from 7 to 11 December 2026
              and open over New Year. NIGHT AQUAWORLD runs on most Saturdays from 5:45 to 8 p.m.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: aquaWorldOaraiTicket.url, label: "Book Aqua World Oarai on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Ibaraki and Tochigi",
        intro: "These day tours from Tokyo cover the same coast and the Ashikaga lights.",
        tours: [hitachiAshikagaIlluminationTour, ashikagaStrawberryOutletTour],
      }}
      links={
        <p className={styles.bodyText}>
          For other aquariums near Tokyo, compare <Link href="/guides/attractions/sumida-aquarium-tickets" style={linkStyle}>Sumida Aquarium</Link> and
          <Link href="/guides/attractions/kamogawa-sea-world-tickets" style={linkStyle}>Kamogawa Sea World</Link>. For family plans, see
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo with kids</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Aqua World Oarai?",
          a: `Adults pay ¥2,300, elementary and junior high school students ¥1,100 and children from 3 ¥400. Checked ${CHECKED}.`,
        },
        {
          q: "Is the price going up?",
          a: "Yes. From 8 March 2027 admission becomes ¥2,500 for adults, ¥1,200 for children and ¥500 for infants.",
        },
        {
          q: "Is Aqua World Oarai closed in December?",
          a: "Yes, from 7 to 11 December 2026 for maintenance. It is open over New Year.",
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 17:00 with last entry at 16:00, and 9:00 to 16:00 on some winter weekdays listed on the official site.",
        },
        {
          q: "Is parking free?",
          a: "Yes. The car park holds about 750 cars and is free.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sumida-aquarium-tickets", title: "Sumida Aquarium Tickets" },
        { href: "/guides/attractions/kamogawa-sea-world-tickets", title: "Kamogawa Sea World Tickets" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/sunshine-aquarium-tickets", title: "Sunshine Aquarium Tickets" },
      ]}
      banner={{
        title: "Sharks and sunfish in Ibaraki",
        desc: "An Aqua World Oarai admission e-voucher.",
        label: "View the Oarai ticket →",
      }}
    />
  );
}
