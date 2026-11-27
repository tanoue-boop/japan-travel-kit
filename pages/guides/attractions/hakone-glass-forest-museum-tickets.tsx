import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hakoneFreepass, hakoneOpenAirMuseumTicket } from "../../../lib/klook-links";
import { hakoneGlassMuseumTicket, yunessunTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from the Hakone Glass Forest's own site, read by node fetch on 28 Nov 2026:
// hakone-garasunomori.jp/entrance/ (adult 1,800 yen, high school and university 1,300, elementary and junior
// high 600; seniors 65+ 1,700; groups of 15+ 1,600 / 1,100 / 500; 10:00-17:30, last entry 17:00; winter closure
// for 11 days from the day after Coming of Age Day; same-day re-entry; parking 500 yen a day; Tozan bus from
// Odawara about 40 min or from Hakone-Yumoto about 25 min for Kojiri Togendai; sightseeing bus S or M line from
// Gora about 20 min) and /entrance/ticket/ (printable discount: 1,700 / 1,200 / 500).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/hakone-glass-forest-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.hakone-garasunomori.jp/entrance/";
const HOURS = "https://www.hakone-garasunomori.jp/entrance/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HakoneGlassForestMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Hakone Glass Forest"
      title="Hakone Glass Forest Museum 2026: Ticket Price & Hours"
      description="Hakone Glass Forest (Venetian Glass Museum) in Sengokuhara: ¥1,800 for adults, ¥1,300 students, ¥600 children. Open 10:00–17:30; bus from Hakone-Yumoto."
      h1={<>Hakone Glass Forest Museum 2026: <br />Ticket Price &amp; Hours</>}
      subtitle="The Venetian glass museum and garden in Sengokuhara, Hakone: what entry costs, opening hours, the winter closure and the bus."
      badges={[`Checked ${CHECKED}`, "¥1,800 adult", "Sengokuhara, Hakone"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Entry to the <strong>Hakone Glass Forest</strong> (Venetian Glass Museum) is <strong>¥1,800 for adults</strong>,
            ¥1,300 for high school and university students and ¥600 for elementary and junior high school children.
            Visitors aged 65 and over pay ¥1,700.
          </p>
          <p className={styles.bodyText}>
            It opens 10:00–17:30 (last entry 17:00) and closes for 11 days in winter, from the day after Coming of Age
            Day in January. From Hakone-Yumoto, the Tozan bus for Kojiri Togendai takes about 25 minutes. Klook sells
            admission tickets. Hakone Glass Forest, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hakoneGlassMuseumTicket.url, label: "Check Hakone Glass Forest tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,800" },
        { label: "Students", value: "¥1,300" },
        { label: "Children", value: "¥600" },
        { label: "Hours", value: "10:00–17:30" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> it sits on the bus route between Hakone-Yumoto and Lake Ashi, so it fits between the
          ropeway loop and the onsen without a separate trip.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Same-day re-entry is allowed if you ask at reception before leaving. The museum also publishes a discount
              page to show at the counter (¥1,700 for adults); it cannot be combined with other discounts. Parking next
              to the museum is ¥500 a day.
            </p>
          ),
          table: {
            head: ["Ticket", "Regular", "Groups (15+)"],
            rows: [
              ["Adult", "¥1,800", "¥1,600"],
              ["High school / university", "¥1,300", "¥1,100"],
              ["Elementary / junior high", "¥600", "¥500"],
              ["Senior (65+)", "¥1,700", "—"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells admission at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open and how do you get there?",
          body: (
            <p className={styles.bodyText}>
              The museum opens 10:00–17:30, with last entry at 17:00. It closes for 11 days from the day after Coming of
              Age Day (the second Monday of January), and hours can change in bad weather. By bus: the Hakone Tozan bus
              for Kojiri Togendai takes about 25 minutes from Hakone-Yumoto or about 40 minutes from Odawara; from Gora,
              the sightseeing facilities bus (S or M line) takes about 20 minutes.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: hakoneGlassMuseumTicket.url, label: "Book the Hakone Glass Forest on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: around Hakone",
        intro: "The Hakone Free Pass covers the Tozan bus, and the Open-Air Museum and Yunessun are on the same side of the mountain.",
        tours: [hakoneFreepass, hakoneOpenAirMuseumTicket, yunessunTicket],
      }}
      links={
        <p className={styles.bodyText}>
          To plan the day, see the <Link href="/guides/attractions/hakone-day-trip-from-tokyo" style={linkStyle}>Hakone day trip from Tokyo</Link>, the
          <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>Hakone 2-day itinerary</Link> and the
          <Link href="/guides/attractions/hakone-free-pass" style={linkStyle}>Hakone Free Pass</Link>. For another museum, see the
          <Link href="/guides/attractions/hakone-open-air-museum-tickets" style={linkStyle}>Hakone Open-Air Museum</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Hakone Glass Forest?",
          a: `¥1,800 for adults, ¥1,300 for high school and university students, ¥600 for elementary and junior high school children, and ¥1,700 for visitors aged 65+. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "10:00–17:30, with last entry at 17:00.",
        },
        {
          q: "Is it closed in winter?",
          a: "Yes, for 11 days from the day after Coming of Age Day in January. Hours can also change in bad weather.",
        },
        {
          q: "How do I get there by bus?",
          a: "Take the Hakone Tozan bus for Kojiri Togendai from Hakone-Yumoto (about 25 minutes) or Odawara (about 40 minutes), or the sightseeing bus S or M line from Gora (about 20 minutes).",
        },
        {
          q: "Is it the same as the Venetian Glass Museum?",
          a: "Yes. The Hakone Glass Forest is a museum of Venetian glass with a garden, in Sengokuhara.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakone-free-pass", title: "Hakone Free Pass" },
        { href: "/guides/attractions/hakone-open-air-museum-tickets", title: "Hakone Open-Air Museum Tickets" },
        { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip from Tokyo" },
        { href: "/guides/attractions/yunessun-tickets", title: "Yunessun Tickets" },
      ]}
      banner={{
        title: "Venetian glass in the Hakone hills",
        desc: "Admission to the Hakone Glass Forest.",
        label: "View Glass Forest tickets →",
      }}
    />
  );
}
