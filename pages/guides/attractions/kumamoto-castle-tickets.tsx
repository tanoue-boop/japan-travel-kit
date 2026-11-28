import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { asoTakachihoFukuokaTour, kumamotoTakachihoRailwayTour } from "../../../lib/klook-links";
import { kumamotoCastleTicket, sunqPassKyushu } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the castle's own English page, read by node fetch on 28 Nov 2026:
// castle.kumamoto-guide.jp/en/info/ (high school and older 800 (groups of 30+ 640), elementary and junior high 300 (240),
// under 6 free; two-facility combo with Wakuwakuza 850 / 300; three-facility combo with Kumamoto City Museum 1,100 / 400;
// hours 9:00-17:00, last admission 16:00, main keep last admission 16:30; weekdays South Gate only, weekends and holidays
// North and South; closed 29 December; ticket offices Ninomaru 8:45-16:00, South Gate 9:00-16:00, North Gate 8:45-16:00,
// Wakuwakuza 8:45-15:45). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/kumamoto-castle-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://castle.kumamoto-guide.jp/en/info/";
const HOURS = "https://castle.kumamoto-guide.jp/en/info/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KumamotoCastleTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kumamoto Castle tickets"
      title="Kumamoto Castle Tickets 2026: Price, Hours & Combo Ticket"
      description="Kumamoto Castle 2026: ¥800 for high school age and over, ¥300 for children, ¥850 with the Wakuwakuza museum. Open 9:00–17:00, last entry 16:00."
      h1={<>Kumamoto Castle Tickets 2026: <br />Price, Hours &amp; Combo Ticket</>}
      subtitle="What entry to the restored keep costs, which gate to use on weekdays, and when the combined tickets are worth it."
      badges={[`Checked ${CHECKED}`, "Adults ¥800", "Closed 29 Dec only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to Kumamoto Castle is ¥800 for high school students and older</strong> and ¥300 for elementary
            and junior high school students; children under 6 are free. A combined ticket with the Wakuwakuza history
            museum at Sakuranobaba Josaien is ¥850, and adding the Kumamoto City Museum makes it ¥1,100.
          </p>
          <p className={styles.bodyText}>
            The castle is open <strong>9 a.m. to 5 p.m.</strong>, with last admission at 4 p.m. (4:30 p.m. for the main
            keep), and closes only on 29 December. On weekdays you enter by the South Gate. Klook sells a dated ticket,
            with a Wakuwakuza option. Kumamoto Castle, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kumamotoCastleTicket.url, label: "Check the Kumamoto Castle ticket on Klook →" }}
      stats={[
        { label: "Adult (high school+)", value: "¥800" },
        { label: "Child", value: "¥300" },
        { label: "With Wakuwakuza", value: "¥850" },
        { label: "Hours", value: "9:00–17:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> pay ¥50 more for the Wakuwakuza combo if you have time for the museum; on weekdays
          plan to walk in by the South Gate.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Group rates apply from 30 people. Visitors aged 65 and over living in Kumamoto City and some others are
              exempt; ask the castle by e-mail for details.
            </p>
          ),
          table: {
            head: ["Ticket", "High school and older", "Elementary / junior high"],
            rows: [
              ["Kumamoto Castle", "¥800", "¥300"],
              ["Castle + Wakuwakuza", "¥850", "¥300"],
              ["Castle + Wakuwakuza + City Museum", "¥1,100", "¥400"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Children under 6 are free. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Kumamoto Castle open?",
          body: (
            <p className={styles.bodyText}>
              From 9 a.m. to 5 p.m., with last admission at 4 p.m.; the main keep takes its last visitors at 4:30 p.m. It is
              closed on 29 December and may close in severe weather. On weekdays only the South Gate is open; on weekends and
              holidays you can use the North or South Gate.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kumamotoCastleTicket.url, label: "Book Kumamoto Castle on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of central Kyushu",
        intro: "Kumamoto is the gateway to Aso and Takachiho, so the castle pairs with these.",
        tours: [asoTakachihoFukuokaTour, kumamotoTakachihoRailwayTour, sunqPassKyushu],
      }}
      links={
        <p className={styles.bodyText}>
          For a route through Kyushu, see the <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5-day itinerary</Link> and the
          <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass</Link>. From Fukuoka, the
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2-day itinerary</Link> covers the city end of the trip.
        </p>
      }
      faq={[
        {
          q: "How much is Kumamoto Castle?",
          a: `¥800 for high school students and older and ¥300 for elementary and junior high school students; under 6 is free. Checked ${CHECKED}.`,
        },
        {
          q: "Is there a combined ticket?",
          a: "Yes. Castle and Wakuwakuza is ¥850 for adults; castle, Wakuwakuza and the Kumamoto City Museum is ¥1,100.",
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 17:00, with last admission at 16:00 and last entry to the main keep at 16:30.",
        },
        {
          q: "Which gate do I use?",
          a: "On weekdays the South Gate only. On weekends and holidays, the North or South Gate.",
        },
        {
          q: "When is it closed?",
          a: "On 29 December, and it may close in severe weather.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5-Day Itinerary" },
        { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass" },
        { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2-Day Itinerary" },
        { href: "/guides/attractions/yufuin-beppu-tour-from-fukuoka", title: "Yufuin & Beppu Tours" },
      ]}
      banner={{
        title: "Kyushu’s great castle, restored",
        desc: "Dated admission to Kumamoto Castle.",
        label: "View the Kumamoto Castle ticket →",
      }}
    />
  );
}
