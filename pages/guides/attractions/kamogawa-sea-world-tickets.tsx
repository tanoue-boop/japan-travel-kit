import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  kamogawaSeaWorldTicket,
  hakkeijimaSeaParadiseTicket,
  enoshimaAquariumTicket,
  maxellAquaParkShinagawaTicket,
} from "../../../lib/klook-links-a35";

// Task jtk-20261201-A35 (day 5, run 28 Nov 2026). Every figure is from Kamogawa Sea
// World's own pages, read by node fetch on 28 Nov 2026: /english/price_ticket/admission/
// (adult (high school and older) 3,300 yen, elementary and junior high 2,000, infant 4+
// 1,300, over 65 3,000; all performances included), /guide/time/ (Japanese; December 2026:
// 9:00-16:00 most days, 9:00-16:30 on 27-29 and 31 Dec, 9:00-17:00 on 30 Dec; closed 2, 9
// and 15-17 Dec 2026, and 13-14, 20 and 26-28 Jan 2027; ticket sales end one hour before
// closing. The English time page labels every row "January", so the Japanese page is used)
// and /english/access/route/ (JR Wakashio limited express from Tokyo to Awa-Kamogawa, about
// 2 hours, then a free shuttle bus about 10 minutes; AQUSEA express bus from Tokyo Midtown
// Yaesu, about 2 hours). No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/attractions/kamogawa-sea-world-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.kamogawa-seaworld.jp/english/price_ticket/admission/";
const HOURS = "https://www.kamogawa-seaworld.jp/guide/time/";
const ACCESS = "https://www.kamogawa-seaworld.jp/english/access/route/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KamogawaSeaWorldTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Kamogawa Sea World Tickets"
      title="Kamogawa Sea World Tickets 2026: Price, Hours & Access"
      description="Kamogawa Sea World is ¥3,300 for adults and ¥2,000 for children, shows included. December hours, closed days and the 2-hour trip from Tokyo."
      h1={<>Kamogawa Sea World Tickets 2026: <br />Price, Hours &amp; Getting There</>}
      subtitle="The seaside aquarium in Kamogawa, Chiba: prices by age, the closed days this winter and the train or bus from Tokyo."
      badges={[`Checked ${CHECKED}`, "¥3,300 adult", "Chiba"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Kamogawa Sea World ticket is <strong>¥3,300 for adults</strong> (high school and older), ¥2,000 for
            elementary and junior high school pupils, ¥1,300 for children aged 4 and up and ¥3,000 for visitors over
            65. Admission includes all the performances.
          </p>
          <p className={styles.bodyText}>
            In December 2026 it opens <strong>9:00–16:00</strong> on most days and is{" "}
            <strong>closed on 2, 9 and 15–17 December</strong>; ticket sales end an hour before closing. Check each
            date on the{" "}
            <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>official hours page</a>. From Tokyo it is
            about 2 hours by the JR Wakashio limited express or the AQUSEA express bus. Klook sells the ticket.
            Kamogawa Sea World, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: kamogawaSeaWorldTicket.url, label: "Check Kamogawa Sea World tickets on Klook →" }}
      stats={[
        { label: "Adult", value: "¥3,300" },
        { label: "Elementary / junior high", value: "¥2,000" },
        { label: "December hours", value: "9:00–16:00" },
        { label: "From Tokyo", value: "About 2 hours" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> it is a full day from Tokyo, so check the closed days first and leave early —
          in winter the last tickets are sold at 15:00 on most days.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Kamogawa Sea World?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Visitors over 65 may be asked for proof of age. All prices include consumption tax and every
              performance.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (high school and older)", "¥3,300"],
              ["Elementary and junior high school", "¥2,000"],
              ["Infant (age 4 and up)", "¥1,300"],
              ["Over 65", "¥3,000"],
            ],
            note: (
              <>
                Kamogawa Sea World prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours",
          title: "When is Kamogawa Sea World open?",
          body: (
            <p className={styles.bodyText}>
              December 2026: 9:00–16:00 on most days, 9:00–16:30 on 27–29 and 31 December and 9:00–17:00 on 30
              December. Closed on 2, 9 and 15–17 December, and in January 2027 on 13–14, 20 and 26–28 January.
            </p>
          ),
          table: {
            head: ["Date", "Hours"],
            rows: [
              ["1, 3–8, 10–14, 18–26 Dec", "9:00–16:00"],
              ["2, 9, 15–17 Dec", "Closed"],
              ["27–29, 31 Dec", "9:00–16:30"],
              ["30 Dec", "9:00–17:00"],
            ],
            note: <>Kamogawa Sea World opening hours (Japanese page), checked {CHECKED}.</>,
          },
        },
        {
          label: "Getting there",
          title: "How do I get to Kamogawa Sea World from Tokyo?",
          body: (
            <p className={styles.bodyText}>
              Take the JR Wakashio limited express from Tokyo Station to Awa-Kamogawa (about 2 hours), then the free
              shuttle bus (about 10 minutes; times vary by day). The AQUSEA express bus from Tokyo Midtown Yaesu
              runs to the aquarium in about 2 hours. See the{" "}
              <a href={ACCESS} target="_blank" rel="noopener" style={linkStyle}>access page</a>.
            </p>
          ),
          ctas: [{ href: kamogawaSeaWorldTicket.url, label: "Book Kamogawa Sea World on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "More aquarium days from Tokyo",
        intro: "Closer to central Tokyo: aquariums in Yokohama, on the Shonan coast and at Shinagawa Station.",
        tours: [hakkeijimaSeaParadiseTicket, enoshimaAquariumTicket, maxellAquaParkShinagawaTicket],
      }}
      links={
        <p className={styles.bodyText}>
          With children, the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          has more ideas. Nearer the city, compare{" "}
          <Link href="/guides/attractions/hakkeijima-sea-paradise-tickets" style={linkStyle}>Hakkeijima Sea Paradise</Link>{" "}
          in Yokohama,{" "}
          <Link href="/guides/attractions/enoshima-aquarium-tickets" style={linkStyle}>Enoshima Aquarium</Link> and{" "}
          <Link href="/guides/attractions/maxell-aqua-park-shinagawa-tickets" style={linkStyle}>Maxell Aqua Park Shinagawa</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is Kamogawa Sea World?",
          a: `¥3,300 for adults (high school and older), ¥2,000 for elementary and junior high pupils, ¥1,300 for children aged 4 and up and ¥3,000 for over-65s. Checked ${CHECKED}.`,
        },
        {
          q: "Is Kamogawa Sea World open every day?",
          a: "No. In December 2026 it closes on 2, 9 and 15–17 December, and in January 2027 on 13–14, 20 and 26–28 January.",
        },
        {
          q: "What are the opening hours in winter?",
          a: "Usually 9:00–16:00 in December, a little later at the end of the year. Ticket sales end one hour before closing.",
        },
        {
          q: "How long does it take from Tokyo?",
          a: "About 2 hours by the JR Wakashio limited express to Awa-Kamogawa plus a 10-minute free shuttle, or about 2 hours by the AQUSEA express bus.",
        },
        {
          q: "Are the shows included in the ticket?",
          a: "Yes. The admission fee includes all performances.",
        },
      ]}
      related={[
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/hakkeijima-sea-paradise-tickets", title: "Hakkeijima Sea Paradise Tickets" },
        { href: "/guides/attractions/enoshima-aquarium-tickets", title: "Enoshima Aquarium Tickets" },
        { href: "/guides/attractions/maxell-aqua-park-shinagawa-tickets", title: "Maxell Aqua Park Shinagawa Tickets" },
      ]}
      banner={{
        title: "Orcas and belugas on the Boso coast",
        desc: "Admission to Kamogawa Sea World, all shows included.",
        label: "View Kamogawa Sea World tickets →",
      }}
    />
  );
}
