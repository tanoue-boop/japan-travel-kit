import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tokyoSubwayTicket, sanrioPurolandTicket } from "../../../lib/klook-links";
import { yomiurilandTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from Yomiuriland's
// own price page, read by node fetch on 28 Nov 2026: yomiuriland.com/charge/
// (One-Day Pass: entry + rides + HANA・BIYORI entry via the park's connecting gate,
// some rides excluded; adult 18-64 5,900 / junior+senior high 4,700 / elementary and
// 65+ 4,100 / age 3 to preschool 2,500 yen, official online 5,500 / 4,300 / 3,700 /
// 2,100; After Pass from 15:00 on Jewellumination days 3,100 / 2,500 / 2,200 / 1,500,
// online 2,800 / 2,200 / 1,900 / 1,200; entry only 1,800 / 1,500 / 1,000 / 1,000;
// rides excluded from the One-Day Pass: bungee, Panorama Driving, Sky Shuttle gondola,
// workshops, Giant Sky River in pool season). "35 minutes from Shinjuku" is the park's
// own English page (yomiuriland.com/en/ redirects to its feature page). Hours are on
// a daily calendar, so none are printed. No Klook price is printed (403).
const ROUTE = "/guides/attractions/yomiuriland-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.yomiuriland.com/charge/";
const HOURS = "https://www.yomiuriland.com/information/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function YomiurilandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Yomiuriland Tickets"
      title="Yomiuriland Tickets 2026: One-Day Pass Price & Booking"
      description="Yomiuriland One-Day Pass is ¥5,900 for adults (¥5,500 online), After Pass from ¥3,100 on illumination nights. What's included, what isn't, how to book."
      h1={<>Yomiuriland Tickets 2026: <br />One-Day Pass Price &amp; How to Book</>}
      subtitle="Tokyo's big amusement park in Inagi: what the One-Day Pass costs, which rides it leaves out and the cheaper evening pass."
      badges={[`Checked ${CHECKED}`, "¥5,900 adult", "Tokyo"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Yomiuriland <strong>One-Day Pass is ¥5,900 for adults</strong> (18–64), ¥4,700 for junior and senior
            high school students, ¥4,100 for elementary pupils and seniors 65+, and ¥2,500 for children from 3 to
            preschool. Bought on the <strong>official online site it is ¥400 less</strong> (¥5,500 for adults). It
            covers entry, unlimited rides except a few, and entry to the HANA・BIYORI flower park through the
            park&apos;s connecting gate.
          </p>
          <p className={styles.bodyText}>
            On Jewellumination nights the <strong>After Pass from 15:00 is ¥3,100</strong> for adults (¥2,800
            online). Opening hours change by day; check the park&apos;s{" "}
            <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>hours and calendar page</a>. Klook sells
            the ticket as well. Yomiuriland price page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: yomiurilandTicket.url, label: "Check Yomiuriland tickets on Klook →" }}
      stats={[
        { label: "One-Day Pass (adult)", value: "¥5,900 (online ¥5,500)" },
        { label: "After Pass from 15:00 (adult)", value: "¥3,100 (online ¥2,800)" },
        { label: "Entry only (adult)", value: "¥1,800" },
        { label: "Hours", value: "Daily calendar (official page)" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the One-Day Pass, not entry plus ride tickets, if you plan more than a few
          rides. In winter the After Pass is the cheap way to ride and see the illuminations in one evening.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is a Yomiuriland ticket?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Each ticket has a gate price and a lower official online price. &quot;Elementary&quot; also covers
              seniors 65 and over.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult 18–64", "Junior/senior high", "Elementary / 65+", "Age 3 to preschool"],
            rows: [
              ["One-Day Pass", "¥5,900", "¥4,700", "¥4,100", "¥2,500"],
              ["One-Day Pass, official online", "¥5,500", "¥4,300", "¥3,700", "¥2,100"],
              ["After Pass (from 15:00, illumination days)", "¥3,100", "¥2,500", "¥2,200", "¥1,500"],
              ["After Pass, official online", "¥2,800", "¥2,200", "¥1,900", "¥1,200"],
              ["Entry only", "¥1,800", "¥1,500", "¥1,000", "¥1,000"],
            ],
            note: (
              <>
                Yomiuriland price page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source (Japanese)</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "What's not included",
          title: "Which rides are not covered by the One-Day Pass?",
          body: null,
          table: {
            head: ["Not included", "Note"],
            rows: [
              ["Bungee jump", "Paid separately"],
              ["Panorama Driving", "Paid separately"],
              ["Sky Shuttle gondola", "Paid separately; the gondola from Keio Yomiuri-land Station is ¥300 one way, ¥500 return (age 3+)"],
              ["Workshops", "Paid separately"],
              ["Giant Sky River (in pool season)", "Paid separately"],
            ],
            note: <>Yomiuriland price page, checked {CHECKED}. The After Pass also excludes the Sky-Go-LAND Ferris wheel.</>,
          },
          ctas: [{ href: yomiurilandTicket.url, label: "Book the One-Day Pass on Klook →" }],
        },
        {
          label: "HANA・BIYORI",
          title: "Does the Yomiuriland pass include HANA・BIYORI?",
          body: (
            <p className={styles.bodyText}>
              Yes, the One-Day Pass includes HANA・BIYORI — but only through the connecting gate inside the
              amusement park. You cannot use it at HANA・BIYORI&apos;s own entrance.
            </p>
          ),
        },
      ]}
      sameDay={{
        heading: "Same trip: western Tokyo",
        intro: "Yomiuriland is in Inagi, western Tokyo. These go with a day out on that side of the city.",
        tours: [sanrioPurolandTicket, tokyoSubwayTicket],
      }}
      links={
        <p className={styles.bodyText}>
          Planning Tokyo with children? See the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>,{" "}
          <Link href="/guides/attractions/sanrio-puroland-tickets" style={linkStyle}>Sanrio Puroland tickets</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>. For
          winter lights across the city, see{" "}
          <Link href="/guides/attractions/tokyo-illumination-tours" style={linkStyle}>Tokyo illumination tours</Link>.
          {" "}In central Tokyo, <Link href="/guides/attractions/tokyo-dome-city-attractions-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Tokyo Dome City Attractions</Link> is free to enter; its one-day passport is ¥4,900–5,800 for adults by date.
          {" "}Nearby in Kawasaki, the <Link href="/guides/attractions/fujiko-f-fujio-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Fujiko F Fujio (Doraemon) Museum</Link> is ¥1,000 for adults and ¥500 from age 4, with no tickets sold at the door.
        </p>
      }
      faq={[
        {
          q: "How much is a Yomiuriland One-Day Pass?",
          a: `¥5,900 for adults at the gate, ¥5,500 on the official online site. Junior and senior high ¥4,700, elementary and 65+ ¥4,100, age 3 to preschool ¥2,500. Yomiuriland, checked ${CHECKED}.`,
        },
        {
          q: "Is there an evening ticket?",
          a: "Yes. On Jewellumination days the After Pass gives entry and rides from 15:00: ¥3,100 for adults, ¥2,800 online.",
        },
        {
          q: "Which rides are not included in the One-Day Pass?",
          a: "The bungee jump, Panorama Driving, the Sky Shuttle gondola, workshops and, in pool season, the Giant Sky River, plus coin games.",
        },
        {
          q: "Does the One-Day Pass include HANA・BIYORI?",
          a: "Yes, through the connecting gate inside the amusement park only, not from HANA・BIYORI's own entrance.",
        },
        {
          q: "Can I buy Yomiuriland tickets on Klook?",
          a: "Yes, Klook sells Yomiuriland admission. Yomiuriland also sells its own online tickets.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/sanrio-puroland-tickets", title: "Sanrio Puroland Tickets" },
        { href: "/guides/attractions/hakkeijima-sea-paradise-tickets", title: "Hakkeijima Sea Paradise Tickets" },
        { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo" },
      ]}
      banner={{
        title: "A day at Yomiuriland",
        desc: "Entry and most rides on one pass, 35 minutes from Shinjuku.",
        label: "View Yomiuriland tickets →",
      }}
    />
  );
}
