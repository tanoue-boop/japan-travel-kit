import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { asahiyamaZooWinterDayTour, sapporoTvTowerMoiwaSetTicket } from "../../../lib/klook-links";
import { asahiyamaBieiHighlightsTour } from "../../../lib/klook-links-winter-hokkaido";
import { otaruAquariumTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261202-A35 (day 6, run 28 Nov 2026). Zoo figures are from Asahikawa City's
// Asahiyama Zoo pages, read by node fetch on 28 Nov 2026: generalinformation/d052849.html
// (admission adult 1,000 yen, junior high and under free; groups of 25+ 900; annual
// passport 1,400), event/event.html (2026: 11 Nov - 29 Dec 10:30-15:30, last entry 15:00;
// 2027: 2 Jan - 7 Apr 10:30-15:30, special evening opening 5-7 Feb 2027 to 20:30; 4-10 Nov
// 2026 closed) and generalinformation/d053767.html (Sapporo to Asahikawa about 1 h 30 min
// by JR; Asahikawa Station to the zoo about 11.3 km, bus about 40 min from stop 6).
// The Klook products are join-in coach tours (161857, 164281); their prices, routes and
// inclusions are on Klook and are not printed here (Klook answers with 403).
const ROUTE = "/guides/attractions/asahiyama-zoo-day-trip-from-sapporo";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/generalinformation/d052849.html";
const CALENDAR = "https://www.city.asahikawa.hokkaido.jp/asahiyamazoo/event/event.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function AsahiyamaZooDayTripPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Asahiyama Zoo Day Trip from Sapporo"
      title="Asahiyama Zoo Day Trip from Sapporo 2026: Tours & Hours"
      description="Asahiyama Zoo is ¥1,000 for adults and free for children, open 10:30–15:30 in winter. Getting there from Sapporo by train and bus, or on a tour with Biei."
      h1={<>Asahiyama Zoo Day Trip from Sapporo: <br />Tour, Price &amp; Winter Hours</>}
      subtitle="Asahikawa's zoo in winter: admission, the short winter hours, the train-and-bus route and the coach tours from Sapporo."
      badges={[`Checked ${CHECKED}`, "¥1,000 adult", "Hokkaido"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Asahiyama Zoo admission is <strong>¥1,000 for adults</strong>; children of junior high school age and
            under enter free. In winter it is open <strong>10:30–15:30</strong> (last entry 15:00) — from 11
            November to 29 December 2026 and from 2 January to 7 April 2027, with evening openings to 20:30 on 5–7
            February 2027.
          </p>
          <p className={styles.bodyText}>
            On your own, take JR from Sapporo to Asahikawa (about 1 hour 30 minutes) and the bus from stop 6 (about
            40 minutes). The simpler option is a Klook coach tour from Sapporo that pairs the zoo with the Biei
            Blue Pond. Asahiyama Zoo, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: asahiyamaBieiHighlightsTour.url, label: "Check Asahiyama Zoo tours from Sapporo on Klook →" }}
      stats={[
        { label: "Adult", value: "¥1,000" },
        { label: "Junior high and under", value: "Free" },
        { label: "Winter hours", value: "10:30–15:30" },
        { label: "Sapporo → Asahikawa", value: "About 1h30 by JR" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> with only five winter hours at the zoo, a coach tour saves the bus connection.
          Check on Klook whether admission is included in the tour you pick.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Asahiyama Zoo?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Web and convenience-store tickets are sold for the ¥1,000 adult rate only. Groups of 25 or more pay
              ¥900.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult", "¥1,000"],
              ["Junior high school age and under", "Free"],
              ["Annual passport", "¥1,400"],
            ],
            note: (
              <>
                Asahiyama Zoo prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                The Klook tours are priced on Klook.
              </>
            ),
          },
        },
        {
          label: "Hours",
          title: "When is Asahiyama Zoo open in winter?",
          body: (
            <p className={styles.bodyText}>
              2026: 11 November – 29 December, 10:30–15:30. 2027: 2 January – 7 April, 10:30–15:30, with 10:30–20:30
              on 5–7 February. Last entry is 30 minutes before closing.{" "}
              <a href={CALENDAR} target="_blank" rel="noopener" style={linkStyle}>Opening calendar</a>.
            </p>
          ),
          ctas: [{ href: asahiyamaZooWinterDayTour.url, label: "See the winter Asahiyama tour on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Other Hokkaido days from Sapporo",
        intro: "More Klook products for a winter stay in Sapporo.",
        tours: [asahiyamaZooWinterDayTour, otaruAquariumTicket, sapporoTvTowerMoiwaSetTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see{" "}
          <Link href="/guides/attractions/hokkaido-winter-tours" style={linkStyle}>Hokkaido winter tours</Link>, the{" "}
          <Link href="/guides/attractions/furano-biei-tour" style={linkStyle}>Furano and Biei tour</Link> guide, the{" "}
          <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3-day itinerary</Link> and
          the{" "}
          <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>Hokkaido 7-day itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Asahiyama Zoo?",
          a: `¥1,000 for adults; junior high school age and under enter free. Checked ${CHECKED}.`,
        },
        {
          q: "What are Asahiyama Zoo's winter hours?",
          a: "10:30–15:30 (last entry 15:00) from 11 November to 29 December 2026 and from 2 January to 7 April 2027, with evening opening to 20:30 on 5–7 February 2027.",
        },
        {
          q: "How do I get to Asahiyama Zoo from Sapporo?",
          a: "JR from Sapporo to Asahikawa takes about 1 hour 30 minutes; the bus from stop 6 at Asahikawa Station takes about 40 minutes. Coach tours from Sapporo go direct.",
        },
        {
          q: "Is the zoo open over New Year?",
          a: "It closes after 29 December 2026 and reopens on 2 January 2027.",
        },
        {
          q: "Can I book an Asahiyama Zoo tour on Klook?",
          a: "Yes. Klook sells join-in coach tours from Sapporo that visit the zoo, some with the Biei Blue Pond and a winter snowmobile option.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hokkaido-winter-tours", title: "Hokkaido Winter Tours" },
        { href: "/guides/attractions/furano-biei-tour", title: "Furano & Biei Tour" },
        { href: "/guides/attractions/sapporo-3-day-itinerary", title: "Sapporo 3-Day Itinerary" },
        { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7-Day Itinerary" },
      ]}
      banner={{
        title: "Asahiyama Zoo in the snow",
        desc: "Coach tours from Sapporo to Asahikawa's zoo.",
        label: "View Asahiyama Zoo tours →",
      }}
    />
  );
}
