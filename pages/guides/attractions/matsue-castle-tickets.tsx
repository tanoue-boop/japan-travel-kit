import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrSanyoSaninAreaPass } from "../../../lib/klook-links";
import { matsueCastleTicket, jrKansaiSaninAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the castle's own page, read by node fetch on 28 Nov 2026:
// matsue-castle.jp/userguide/index (keep entry hours 1 Apr - 30 Sep 8:30-18:00, last 17:30; 1 Oct - 31 Mar 8:30-17:00,
// last 16:30; open every day; Honmaru gates 8:00-18:30 / 8:00-17:30, free; from 1 Jul 2026 keep entry 1,200 (group 960),
// elementary and junior high free; shoes off inside the keep; e-tickets; combined tickets with other Matsue facilities
// 1,760 (three, 10 days) and 1,520 (two, 10 days)). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/matsue-castle-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.matsue-castle.jp/userguide/index";
const HOURS = "https://www.matsue-castle.jp/userguide/index";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MatsueCastleTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Matsue Castle tickets"
      title="Matsue Castle Tickets 2026: Price, Hours & Combo Pass"
      description="Matsue Castle 2026: the national-treasure keep costs ¥1,200 for adults since July 2026, and school-age children enter free. Open 8:30–17:00 Oct–Mar."
      h1={<>Matsue Castle Tickets 2026: <br />Price, Hours &amp; Combo Pass</>}
      subtitle="What entry to one of Japan’s original castle keeps costs after the 2026 price change, and when it opens in each season."
      badges={[`Checked ${CHECKED}`, "Adults ¥1,200", "Children free"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to the keep of Matsue Castle is ¥1,200 for adults</strong> from 1 July 2026, when the price rose
            to fund major repairs. Elementary and junior high school students now enter free. The castle grounds (Honmaru)
            are free.
          </p>
          <p className={styles.bodyText}>
            From October to March the keep is open <strong>8:30 a.m. to 5 p.m.</strong> (last entry 4:30 p.m.), and every
            day of the year. Shoes come off at the entrance and go in a bag. Klook sells a keep admission. Matsue Castle,
            checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: matsueCastleTicket.url, label: "Check the Matsue Castle ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,200" },
        { label: "Elementary / junior high", value: "Free" },
        { label: "Oct–Mar", value: "8:30–17:00" },
        { label: "Apr–Sep", value: "8:30–18:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> one of only twelve original castle keeps in Japan, and since children no longer
          pay, a cheap visit for families.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Groups pay ¥960 each. Combined tickets with other Matsue sights are ¥1,520 for two facilities and ¥1,760 for
              three, each valid for 10 days including the day of purchase. Some cards and tickets give a discount; show them
              before paying.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Keep, adult", "¥1,200"],
              ["Keep, group", "¥960"],
              ["Elementary and junior high school", "Free"],
              ["Two-facility combined ticket", "¥1,520"],
              ["Three-facility combined ticket", "¥1,760"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Prices from 1 July 2026. The Honmaru grounds are free. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Matsue Castle open?",
          body: (
            <p className={styles.bodyText}>
              From 1 October to 31 March the keep is open 8:30 a.m. to 5 p.m. (last entry 4:30 p.m.); from 1 April to 30 September
              8:30 a.m. to 6 p.m. (last entry 5:30 p.m.). It is open every day. The Honmaru gates open from 8 a.m. and close at
              5:30 p.m. in winter.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: matsueCastleTicket.url, label: "Book Matsue Castle on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: rail passes for the San’in coast",
        intro: "Matsue is on the San’in line, so the castle fits these JR West passes.",
        tours: [jrKansaiSaninAreaPass, jrSanyoSaninAreaPass],
      }}
      links={
        <p className={styles.bodyText}>
          To get there by JR, see the <Link href="/guides/transport/kansai-sanin-area-pass" style={linkStyle}>Kansai &amp; San&apos;in Area Pass</Link>, the
          <Link href="/guides/transport/sanyo-sanin-area-pass" style={linkStyle}>Sanyo-San&apos;in Area Pass</Link> and the
          <Link href="/guides/transport/jr-west-all-area-pass" style={linkStyle}>JR West All Area Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Matsue Castle?",
          a: `Entry to the keep is ¥1,200 for adults from 1 July 2026. Elementary and junior high school students enter free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "October to March 8:30 to 17:00 (last entry 16:30); April to September 8:30 to 18:00 (last entry 17:30).",
        },
        {
          q: "Is it closed on any days?",
          a: "No. The keep is open every day of the year.",
        },
        {
          q: "Do I take my shoes off?",
          a: "Yes. Shoes come off at the entrance and are carried in a shoe bag.",
        },
        {
          q: "Is there a combined ticket?",
          a: "Yes. Combined tickets with other Matsue facilities are ¥1,520 for two and ¥1,760 for three, valid for 10 days.",
        },
      ]}
      related={[
        { href: "/guides/transport/kansai-sanin-area-pass", title: "Kansai & San’in Area Pass" },
        { href: "/guides/transport/sanyo-sanin-area-pass", title: "Sanyo-San’in Area Pass" },
        { href: "/guides/transport/jr-west-all-area-pass", title: "JR West All Area Pass" },
        { href: "/guides/attractions/hiroshima-2-day-itinerary", title: "Hiroshima 2-Day Itinerary" },
      ]}
      banner={{
        title: "An original castle keep on the San’in coast",
        desc: "Admission to the keep of Matsue Castle.",
        label: "View the Matsue Castle ticket →",
      }}
    />
  );
}
