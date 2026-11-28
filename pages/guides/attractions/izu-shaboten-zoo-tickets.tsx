import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hakoneFreepass } from "../../../lib/klook-links";
import { izuShabotenZooTicket, izooTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from the zoo's own page, read by node fetch on 28 Nov 2026:
// izushaboten.com/information/ (hours 9:30-16:00, last entry 15:30, varies by season; November 2026 calendar
// 9:30-16:00 every day; open every day of the year; admission weekday / holiday (weekends, public holidays and long
// holidays): adult (junior high and older) 2,800 / 3,000, elementary 1,400 / 1,500, infant 4+ 700 / 800; paid
// parking; address 1317-13 Futo, Ito). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/izu-shaboten-zoo-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://izushaboten.com/information/";
const HOURS = "https://izushaboten.com/information/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function IzuShabotenZooTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Izu Shaboten Zoo tickets"
      title="Izu Shaboten Zoo Tickets 2026: Price, Hours & Capybaras"
      description="Izu Shaboten Zoo 2026: adults ¥2,800 on weekdays and ¥3,000 on weekends and holidays, children ¥1,400–1,500, ages 4+ ¥700–800. Open 9:30–16:00 every day."
      h1={<>Izu Shaboten Zoo Tickets 2026: <br />Price, Hours &amp; Capybaras</>}
      subtitle="What a day at the capybara hot-bath zoo in Ito costs on weekdays and weekends, and the winter opening hours."
      badges={[`Checked ${CHECKED}`, "From ¥2,800", "Open every day"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Izu Shaboten Zoo is <strong>¥2,800 for adults on weekdays and ¥3,000 on weekends</strong>, public holidays and
            long holidays (adults are junior high school age and older). Elementary school children pay ¥1,400 or ¥1,500,
            and children from 4 pay ¥700 or ¥800.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>9:30 a.m. to 4 p.m.</strong> (last entry 3:30 p.m.) and every day of the year; hours change
            with the season. Parking is paid. Klook sells a web admission ticket. Izu Shaboten Zoo, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: izuShabotenZooTicket.url, label: "Check the Izu Shaboten Zoo ticket on Klook →" }}
      stats={[
        { label: "Adult, weekday", value: "¥2,800" },
        { label: "Adult, weekend", value: "¥3,000" },
        { label: "Elementary", value: "¥1,400–1,500" },
        { label: "Age 4+", value: "¥700–800" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a weekday visit saves ¥200 per adult; arrive by early afternoon, because the gate closes at
          3:30 p.m. in winter.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The holiday price applies on Saturdays, Sundays, public holidays and long school holidays. A welfare discount
              is available with a disability certificate.
            </p>
          ),
          table: {
            head: ["Ticket", "Weekday", "Weekend / holiday"],
            rows: [
              ["Adult (junior high and older)", "¥2,800", "¥3,000"],
              ["Elementary school", "¥1,400", "¥1,500"],
              ["Infant (4 and over)", "¥700", "¥800"],
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
          title: "When is Izu Shaboten Zoo open?",
          body: (
            <p className={styles.bodyText}>
              Every day, 9:30 a.m. to 4 p.m., with last entry at 3:30 p.m.; the zoo says hours change with the season, and its
              calendar shows the hours and price type of each date. Parking is paid.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: izuShabotenZooTicket.url, label: "Book Izu Shaboten Zoo on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Izu and Hakone",
        intro: "Ito is on the Izu Peninsula, south of Atami and Hakone.",
        tours: [izooTicket, hakoneFreepass],
      }}
      links={
        <p className={styles.bodyText}>
          For a trip from Tokyo, see the <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>Hakone 2-day itinerary</Link> and
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo with kids</Link>. For more animal parks, see
          <Link href="/guides/attractions/nasu-safari-park-tickets" style={linkStyle}>Nasu Safari Park</Link> and <Link href="/guides/attractions/mother-farm-tickets" style={linkStyle}>Mother Farm</Link>.
          {" "}Further down the Izukyu line, the <Link href="/guides/attractions/atagawa-tropical-alligator-garden-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Atagawa Tropical and Alligator Garden</Link> is ¥2,000 for adults, a minute from Izu-Atagawa Station.
          {" "}Nearby in Izu Kogen, the <Link href="/guides/attractions/izu-teddy-bear-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Izu Teddy Bear Museum</Link> is ¥1,800 for adults, 9:30–17:00.
        </p>
      }
      faq={[
        {
          q: "How much is Izu Shaboten Zoo?",
          a: `Adults (junior high and older) pay ¥2,800 on weekdays and ¥3,000 on weekends and holidays. Elementary school children pay ¥1,400 or ¥1,500 and children from 4 pay ¥700 or ¥800. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "9:30 to 16:00 with last entry at 15:30; hours change with the season.",
        },
        {
          q: "Is Izu Shaboten Zoo open every day?",
          a: "Yes. The zoo says it is open every day of the year.",
        },
        {
          q: "Which days use the holiday price?",
          a: "Saturdays, Sundays, public holidays and long holiday periods.",
        },
        {
          q: "Is there parking?",
          a: "Yes, paid parking for cars and buses.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakone-2-day-itinerary", title: "Hakone 2-Day Itinerary" },
        { href: "/guides/attractions/nasu-safari-park-tickets", title: "Nasu Safari Park Tickets" },
        { href: "/guides/attractions/mother-farm-tickets", title: "Mother Farm Tickets" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
      ]}
      banner={{
        title: "Capybaras in Izu",
        desc: "A web admission ticket for Izu Shaboten Zoo.",
        label: "View the zoo ticket →",
      }}
    />
  );
}
