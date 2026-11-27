import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { iseShrineOkageGuidedTour } from "../../../lib/klook-links";
import { mikimotoPearlIslandTicket, tobaAquariumTicket, parqueEspanaTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261205-A35 (day 9, run 28 Nov 2026). Every figure is from Mikimoto Pearl Island's own site, read by node fetch on 28 Nov 2026:
// mikimoto-pearl-island.jp/en/営業案内 (adult 1,650 yen, child 6-15 820; groups of 20+ 1,320 / 660; entry
// includes the Pearl Museum, ama demonstration and Memorial Hall; hours 27 Nov - 22 Dec 2026 9:00-16:30, 23-31
// Dec 9:00-17:00, 1-5 Jan 2027 9:00-17:30, 6 Jan - 18 Mar 9:00-17:00; ticket sales end 60 minutes before
// closing; closed 8-10 Dec 2026; Toba W Coupon with Toba Aquarium 4,000 yen adult, online only), /en/海女時間
// (ama demonstrations 9:30, 10:30, 11:30, 13:30, 14:30, 15:30, 16:30; last at 15:30 on 16:30-closing days) and
// /en/アクセス (about 5 minutes on foot from Kintetsu / JR Toba Station; parking 600 yen for 2 hours).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/mikimoto-pearl-island-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.mikimoto-pearl-island.jp/en/%E5%96%B6%E6%A5%AD%E6%A1%88%E5%86%85";
const HOURS = "https://www.mikimoto-pearl-island.jp/en/%E6%B5%B7%E5%A5%B3%E6%99%82%E9%96%93";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MikimotoPearlIslandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Mikimoto Pearl Island"
      title="Mikimoto Pearl Island Tickets 2026: Price, Hours & Ama"
      description="Mikimoto Pearl Island in Toba: ¥1,650 for adults, ¥820 for children 6–15, including the Pearl Museum and ama diver show. Hours, show times and access."
      h1={<>Mikimoto Pearl Island Tickets 2026: <br />Price, Hours &amp; Ama Show</>}
      subtitle="The island in Toba where cultured pearls began: what entry costs, December hours, the ama diver demonstration times and the walk from Toba Station."
      badges={[`Checked ${CHECKED}`, "¥1,650 adult", "5 min from Toba Station"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Entry to Mikimoto Pearl Island is <strong>¥1,650 for adults</strong> and ¥820 for children aged 6 to 15.
            It includes the Pearl Museum, the Kokichi Mikimoto Memorial Hall and the ama diver demonstration.
          </p>
          <p className={styles.bodyText}>
            From 27 November to 22 December 2026 it opens 9:00–16:30 (9:00–17:00 from 23 December), and it is closed
            from 8 to 10 December 2026. Ticket sales end an hour before closing. The island is about 5 minutes on foot
            from Toba Station (Kintetsu and JR). Klook sells admission tickets. Mikimoto Pearl Island, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: mikimotoPearlIslandTicket.url, label: "Check Mikimoto Pearl Island tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,650" },
        { label: "Child (6–15)", value: "¥820" },
        { label: "Dec hours", value: "9:00–16:30" },
        { label: "Closed", value: "8–10 Dec 2026" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> time your visit around an ama demonstration (hourly from 9:30), and pair it with Toba
          Aquarium, which is also near the station.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One ticket covers the Pearl Museum, the Memorial Hall and the ama diver demonstration. The island also
              sells a combined ticket with Toba Aquarium (Toba W Coupon, ¥4,000 for adults, online only). Parking is ¥600
              for two hours.
            </p>
          ),
          table: {
            head: ["Ticket", "Regular", "Groups (20+)"],
            rows: [
              ["Adult", "¥1,650", "¥1,320"],
              ["Child (6–15)", "¥820", "¥660"],
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
          title: "When is it open and when are the ama demonstrations?",
          body: (
            <p className={styles.bodyText}>
              In 2026 the island opens 9:00–16:30 from 27 November to 22 December and 9:00–17:00 from 23 to 31 December;
              in 2027, 9:00–17:30 from 1 to 5 January and 9:00–17:00 from 6 January to 18 March. It is closed from 8 to
              10 December 2026, and ticket sales end 60 minutes before closing. The ama demonstrations are at 9:30,
              10:30, 11:30, 13:30, 14:30 and 15:30 (and 16:30 on later-closing days). The island is about 5 minutes on
              foot from Kintetsu and JR Toba Station.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: mikimotoPearlIslandTicket.url, label: "Book Mikimoto Pearl Island on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Toba and Ise",
        intro: "Toba Aquarium is near the same station, Ise Grand Shrine is a short train ride away, and Shima Spain Village is further down the Kintetsu line.",
        tours: [tobaAquariumTicket, iseShrineOkageGuidedTour, parqueEspanaTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the trip, see the <Link href="/guides/transport/kintetsu-rail-pass" style={linkStyle}>Kintetsu Rail Pass</Link>, the
          <Link href="/guides/transport/ise-kumano-wakayama-area-pass" style={linkStyle}>Ise-Kumano-Wakayama Area Pass</Link> and
          <Link href="/guides/attractions/toba-aquarium-tickets" style={linkStyle}>Toba Aquarium tickets</Link>. Further down the line, see
          <Link href="/guides/attractions/shima-spain-village-tickets" style={linkStyle}>Shima Spain Village</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Mikimoto Pearl Island?",
          a: `¥1,650 for adults and ¥820 for children aged 6 to 15. Entry includes the Pearl Museum, the Memorial Hall and the ama demonstration. Checked ${CHECKED}.`,
        },
        {
          q: "What time are the ama diver demonstrations?",
          a: "At 9:30, 10:30, 11:30, 13:30, 14:30 and 15:30, plus 16:30 on days when the island closes later.",
        },
        {
          q: "What are the December 2026 hours?",
          a: "9:00–16:30 from 27 November to 22 December, and 9:00–17:00 from 23 to 31 December. Closed from 8 to 10 December 2026.",
        },
        {
          q: "How do I get to Mikimoto Pearl Island?",
          a: "Take the Kintetsu or JR line to Toba Station; the island is about 5 minutes on foot.",
        },
        {
          q: "Is there a combined ticket with Toba Aquarium?",
          a: "Yes. The Toba W Coupon covers both for ¥4,000 per adult and is sold online only.",
        },
      ]}
      related={[
        { href: "/guides/attractions/toba-aquarium-tickets", title: "Toba Aquarium Tickets" },
        { href: "/guides/attractions/shima-spain-village-tickets", title: "Shima Spain Village Tickets" },
        { href: "/guides/transport/kintetsu-rail-pass", title: "Kintetsu Rail Pass" },
        { href: "/guides/transport/ise-kumano-wakayama-area-pass", title: "Ise-Kumano-Wakayama Area Pass" },
      ]}
      banner={{
        title: "Where cultured pearls began",
        desc: "Admission to Mikimoto Pearl Island.",
        label: "View Pearl Island tickets →",
      }}
    />
  );
}
