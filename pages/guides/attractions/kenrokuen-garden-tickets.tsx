import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { vasaraKimonoKanazawa, shirakawagoGokayamaKanazawaBusTour } from "../../../lib/klook-links";
import { kenrokuenGardenTicket, jrHokurikuAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261210-A35 (day 14, run 28 Nov 2026). Every figure is from the prefecture's own page, read by node fetch on 28 Nov 2026:
// shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/info.html (open every day; 1 Mar - 15 Oct 7:00-18:00, last entry 17:30;
// 16 Oct - end of Feb 8:00-17:00, last entry 16:30; adult (18+) 320, child (6 to 17) 100, groups 250 / 80; 65+ free with
// ID; free days include cherry blossom season, Hyakumangoku festival, 14-16 Aug, 3 Nov and 31 Dec - 3 Jan; free early
// entry through the Renchimon and Zuishinzaka gates only, 1 Nov - end of Feb 6:00-7:45, last entry 7:30; Shigure-tei
// 9:00-16:30, closed 29 Dec - 3 Jan). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/kenrokuen-garden-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/info.html";
const HOURS = "https://shiro-niwa.pref.ishikawa.lg.jp/kenrokuen-garden/info.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KenrokuenGardenTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kenrokuen tickets"
      title="Kenrokuen Garden Tickets 2026: Price, Hours & Free Entry"
      description="Kenrokuen 2026: ¥320 for adults and ¥100 for ages 6–17; open 8:00–17:00 from mid-October to February, with free early-morning entry and free days."
      h1={<>Kenrokuen Garden Tickets 2026: <br />Price, Hours &amp; Free Entry</>}
      subtitle="What entry to Kanazawa’s famous garden costs, the winter hours, and the early mornings and holidays when it is free."
      badges={[`Checked ${CHECKED}`, "Adults ¥320", "Open every day"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to Kenrokuen is ¥320 for adults</strong> (18 and over) and ¥100 for ages 6 to 17. Visitors aged 65
            and over enter free with ID showing their age, and the garden is free for everyone on some days, including 31
            December to 3 January.
          </p>
          <p className={styles.bodyText}>
            From 16 October to the end of February it is open <strong>8 a.m. to 5 p.m.</strong> (last entry 4:30 p.m.), every
            day. In those months you can also walk in free from 6 a.m. through two gates before the paid hours. Klook sells
            an admission ticket. Kenrokuen, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kenrokuenGardenTicket.url, label: "Check the Kenrokuen ticket on Klook →" }}
      stats={[
        { label: "Adult (18+)", value: "¥320" },
        { label: "Age 6–17", value: "¥100" },
        { label: "Winter hours", value: "8:00–17:00" },
        { label: "Early entry", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the fee is small, so a ticket in hand mainly saves the queue; early risers can see the
          garden free before 7:45 a.m.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Groups pay ¥250 for adults and ¥80 for children. Free days are the cherry blossom week, the Hyakumangoku
              festival, 14–16 August, 3 November and 31 December to 3 January. The Shigure-tei teahouse is separate.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (18 and over)", "¥320"],
              ["Child (6 to 17)", "¥100"],
              ["Group, adult", "¥250"],
              ["Group, child", "¥80"],
              ["Aged 65 and over (with ID)", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Free for everyone on set days and during early-morning entry. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is Kenrokuen open?",
          body: (
            <p className={styles.bodyText}>
              From 16 October to the end of February, 8 a.m. to 5 p.m. (last entry 4:30 p.m.); from 1 March to 15 October, 7 a.m.
              to 6 p.m. (last entry 5:30 p.m.). It is open every day. From 1 November to the end of February, free early entry
              runs from 6 a.m. to 7:45 a.m. (last entry 7:30 a.m.) through the Renchimon and Zuishinzaka gates only.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: kenrokuenGardenTicket.url, label: "Book Kenrokuen on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Kanazawa and Shirakawa-go",
        intro: "The garden is in central Kanazawa, so it pairs with these.",
        tours: [vasaraKimonoKanazawa, shirakawagoGokayamaKanazawaBusTour, jrHokurikuAreaPass],
      }}
      links={
        <p className={styles.bodyText}>
          For a full plan, see the <Link href="/guides/attractions/kanazawa-2-day-itinerary" style={linkStyle}>Kanazawa 2-day itinerary</Link> and
          <Link href="/guides/transport/tokyo-to-kanazawa" style={linkStyle}>Tokyo to Kanazawa by train</Link>. For a winter day out, the
          <Link href="/guides/attractions/shirakawago-winter-light-up" style={linkStyle}>Shirakawa-go winter light-up</Link> is a bus ride away, and the
          <Link href="/guides/transport/hokuriku-area-pass" style={linkStyle}>Hokuriku Area Pass</Link> covers trains around the region.
        </p>
      }
      faq={[
        {
          q: "How much is Kenrokuen?",
          a: `¥320 for adults (18 and over) and ¥100 for ages 6 to 17. Visitors aged 65 and over enter free with ID. Checked ${CHECKED}.`,
        },
        {
          q: "What are the winter hours?",
          a: "From 16 October to the end of February, 8:00 to 17:00 with last entry at 16:30.",
        },
        {
          q: "Can I get in free?",
          a: "Yes, during early-morning entry (6:00 to 7:45 from November to February, through the Renchimon and Zuishinzaka gates) and on free days such as 31 December to 3 January.",
        },
        {
          q: "Is it open every day?",
          a: "Yes. The garden is open every day; only the Shigure-tei teahouse closes over New Year.",
        },
        {
          q: "Is there a combined ticket?",
          a: "Yes. The garden lists combined tickets such as the Kenrokuen Plus One ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "Kanazawa 2-Day Itinerary" },
        { href: "/guides/transport/tokyo-to-kanazawa", title: "Tokyo to Kanazawa" },
        { href: "/guides/attractions/shirakawago-winter-light-up", title: "Shirakawa-go Winter Light-up" },
        { href: "/guides/transport/hokuriku-area-pass", title: "Hokuriku Area Pass" },
      ]}
      banner={{
        title: "Kanazawa’s great garden",
        desc: "Admission to Kenrokuen.",
        label: "View the Kenrokuen ticket →",
      }}
    />
  );
}
