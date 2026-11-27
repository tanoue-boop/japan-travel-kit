import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { teamlabBiovortexKyotoTicket } from "../../../lib/klook-links";
import { kyotoRailwayMuseumTicket, kyotoAquariumTicket, toeiKyotoStudioParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). kyotorailwaymuseum.jp answers automated
// reads with an Incapsula block, so the figures were read from the museum's own pages in
// the search index (allowed_domains kyotorailwaymuseum.jp) on 28 Nov 2026: general (18+)
// 1,500 yen, university and high school 1,300, junior high and elementary 500, child age 3+
// 200; general rises to 1,900 yen from 1 March 2027, other categories unchanged (news
// release); 10:00-17:00, no entry after 16:30; closed Wednesdays and 30 Dec - 1 Jan, open on
// public holidays and in spring (25 Mar - 7 Apr) and summer (21 Jul - 31 Aug) breaks.
// Access from Kyoto Aquarium's own access page (same park, Umekoji-Kyotonishi station).
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/kyoto-railway-museum-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kyotorailwaymuseum.jp/en/tickets/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KyotoRailwayMuseumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kyoto Railway Museum Tickets"
      title="Kyoto Railway Museum Tickets 2026: Price & Hours"
      description="Kyoto Railway Museum is ¥1,500 for adults (¥1,900 from 1 March 2027), open 10:00–17:00 and closed Wednesdays. Prices by age, access and booking."
      h1={<>Kyoto Railway Museum Tickets 2026: <br />Price, Hours &amp; How to Book</>}
      subtitle="JR West's railway museum at Umekoji, next to Kyoto Aquarium: prices by age, the March 2027 price rise and the Wednesday closing day."
      badges={[`Checked ${CHECKED}`, "¥1,500 adult", "Kyoto"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Kyoto Railway Museum ticket is <strong>¥1,500 for adults</strong> (18 and over), ¥1,300 for
            university and high school students, ¥500 for junior high and elementary school pupils and ¥200 for
            children aged 3 and up. From <strong>1 March 2027</strong> the adult price rises to ¥1,900; the other
            prices stay the same.
          </p>
          <p className={styles.bodyText}>
            The museum is open <strong>10:00–17:00</strong> (no entry after 16:30) and{" "}
            <strong>closed on Wednesdays</strong> and from 30 December to 1 January. It opens on public holidays
            and during the spring and summer school breaks. Klook sells the ticket. Kyoto Railway Museum, checked{" "}
            {CHECKED}.
          </p>
        </>
      }
      main={{ href: kyotoRailwayMuseumTicket.url, label: "Check Kyoto Railway Museum tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,500" },
        { label: "From 1 Mar 2027", value: "¥1,900" },
        { label: "Hours", value: "10:00–17:00" },
        { label: "Closed", value: "Wednesdays" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> avoid Wednesdays, and pair it with Kyoto Aquarium in the same park, Umekoji
          Park. Visiting before March 2027 saves ¥400 per adult.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Kyoto Railway Museum?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The museum announced the new adult price in a news release; student and child prices are unchanged.
            </p>
          ),
          table: {
            head: ["Ticket", "Until 28 Feb 2027", "From 1 Mar 2027"],
            rows: [
              ["Adult (18 and over)", "¥1,500", "¥1,900"],
              ["University and high school", "¥1,300", "¥1,300"],
              ["Junior high and elementary school", "¥500", "¥500"],
              ["Child (age 3 and up)", "¥200", "¥200"],
            ],
            note: (
              <>
                Kyoto Railway Museum prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours",
          title: "When is the Kyoto Railway Museum open?",
          body: (
            <p className={styles.bodyText}>
              10:00 to 17:00, with no entry after 16:30. It closes every Wednesday and from 30 December to 1 January,
              but opens on public holidays and in the spring (25 March – 7 April) and summer (21 July – 31 August)
              breaks. The museum is in Umekoji Park, a short walk from Umekoji-Kyotonishi Station on the JR Sagano
              Line, one stop from Kyoto.
            </p>
          ),
          ctas: [{ href: kyotoRailwayMuseumTicket.url, label: "Book the Kyoto Railway Museum on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Umekoji and Kyoto Station",
        intro: "Kyoto Aquarium is in the same park, and teamLab Biovortex is near Kyoto Station.",
        tours: [kyotoAquariumTicket, teamlabBiovortexKyotoTicket, toeiKyotoStudioParkTicket],
      }}
      links={
        <p className={styles.bodyText}>
          Across the park, see{" "}
          <Link href="/guides/attractions/kyoto-aquarium-tickets" style={linkStyle}>Kyoto Aquarium tickets</Link>. Near
          the station,{" "}
          <Link href="/guides/attractions/teamlab-kyoto-tickets" style={linkStyle}>teamLab Biovortex Kyoto</Link>{" "}
          makes a second indoor stop. The{" "}
          <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>things to do in Kyoto</Link> guide and
          the{" "}
          <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>Kyoto 2-day itinerary</Link> fit it
          into a short stay.
        </p>
      }
      faq={[
        {
          q: "How much is the Kyoto Railway Museum?",
          a: `¥1,500 for adults, ¥1,300 for university and high school students, ¥500 for junior high and elementary pupils and ¥200 for children aged 3 and up. The adult price rises to ¥1,900 from 1 March 2027. Checked ${CHECKED}.`,
        },
        {
          q: "Is the Kyoto Railway Museum closed on Wednesdays?",
          a: "Yes, every Wednesday, plus 30 December to 1 January. It opens on public holidays and during the spring and summer school breaks.",
        },
        {
          q: "What are the opening hours?",
          a: "10:00 to 17:00, with no entry after 16:30.",
        },
        {
          q: "How do I get there from Kyoto Station?",
          a: "Take the JR Sagano Line one stop to Umekoji-Kyotonishi; the museum is in Umekoji Park, which you can also walk to from Kyoto Station.",
        },
        {
          q: "Can I buy Kyoto Railway Museum tickets on Klook?",
          a: "Yes. Klook sells a Kyoto Railway Museum admission ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kyoto-aquarium-tickets", title: "Kyoto Aquarium Tickets" },
        { href: "/guides/attractions/teamlab-kyoto-tickets", title: "teamLab Biovortex Kyoto Tickets" },
        { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto" },
        { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2-Day Itinerary" },
      ]}
      banner={{
        title: "JR West's railway museum in Kyoto",
        desc: "Admission to the Kyoto Railway Museum at Umekoji.",
        label: "View Kyoto Railway Museum tickets →",
      }}
    />
  );
}
