import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { saganoRomanticTrainTicket, arashiyamaSaganoHalfDayWalk, kyotoKimonoOokiniArashiyama } from "../../../lib/klook-links";
import { toeiKyotoStudioParkTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from the park's
// own hours-and-tickets page, read by node fetch on 28 Nov 2026:
// eigamura.com/hours-tickets/ (UZUMASA KYOTO VILLAGE / Toei Uzumasa Eigamura; prices
// "until the second-phase opening in spring 2027": 1DAY 10:00-21:00 adult (junior
// high and up) 2,800 / child (3 to elementary) 1,600 yen; night 17:00-21:00 2,000 /
// 1,300; under 3 free; may differ by date; entry until 60 minutes before closing;
// some areas until 18:00; Attraction Pass 1,500 for four paid attractions all day,
// singles 500-800; culture experiences 2,700 each; set tickets: Sagano Romantic Train
// one-way + entry 3,680 / 2,040, Randen 1-day pass + entry 3,200 / 1,770, Kyoto
// Railway Museum + entry adult 3,870, Kyoto bus 2 rides + entry 2,940 / 1,660). No
// Klook price is printed (Klook answers automated reads with 403).
const ROUTE = "/guides/attractions/toei-kyoto-studio-park-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.eigamura.com/hours-tickets/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ToeiKyotoStudioParkTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Toei Kyoto Studio Park Tickets"
      title="Toei Kyoto Studio Park Tickets 2026: Price & Hours"
      description="Toei Kyoto Studio Park (UZUMASA KYOTO VILLAGE) is ¥2,800 for adults, ¥2,000 from 17:00, open 10:00–21:00. Attraction Pass, set tickets and booking."
      h1={<>Toei Kyoto Studio Park Tickets 2026: <br />Price, Hours &amp; Set Tickets</>}
      subtitle="Uzumasa Eigamura, now UZUMASA KYOTO VILLAGE: the period-drama film set you can walk through in Kyoto, and what a day there costs."
      badges={[`Checked ${CHECKED}`, "¥2,800 adult", "Kyoto"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A <strong>1DAY ticket (10:00–21:00) is ¥2,800 for adults</strong> (junior high and up) and ¥1,600 for
            children from 3 to elementary school; under 3 is free. The <strong>night ticket (17:00–21:00) is
            ¥2,000</strong> / ¥1,300. These are the prices until the park&apos;s second phase opens in spring 2027,
            and they can differ by date.
          </p>
          <p className={styles.bodyText}>
            Last entry is <strong>60 minutes before closing</strong>, and some areas close at 18:00. The four paid
            attractions (ninja house, NINJA BATTLE, maze, haunted house) are ¥1,500 together on the Attraction Pass.
            Klook sells the admission ticket. Official hours and tickets page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: toeiKyotoStudioParkTicket.url, label: "Check Toei Kyoto Studio Park tickets on Klook →" }}
      stats={[
        { label: "1DAY (adult / child)", value: "¥2,800 / ¥1,600" },
        { label: "Night from 17:00 (adult / child)", value: "¥2,000 / ¥1,300" },
        { label: "Hours", value: "10:00–21:00" },
        { label: "Attraction Pass", value: "¥1,500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy the 1DAY ticket and come in the daytime — some areas close at 18:00. Add
          the Attraction Pass if you plan two or more of the paid attractions.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Toei Kyoto Studio Park?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult means junior high school and older; child means age 3 to elementary school.
            </p>
          ),
          table: {
            head: ["Ticket", "Hours", "Adult", "Child"],
            rows: [
              ["1DAY", "10:00–21:00", "¥2,800", "¥1,600"],
              ["Night time", "17:00–21:00", "¥2,000", "¥1,300"],
              ["Attraction Pass (4 attractions, all day)", "", "¥1,500", "¥1,500 (age 3+)"],
              ["Culture experiences", "", "¥2,700 each", ""],
            ],
            note: (
              <>
                UZUMASA KYOTO VILLAGE hours and tickets page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source (Japanese)</a>.
                Prices apply until the second phase opens in spring 2027 and may differ by date. Klook sells the
                ticket at its own price.
              </>
            ),
          },
          ctas: [{ href: toeiKyotoStudioParkTicket.url, label: "Book Toei Kyoto Studio Park on Klook →" }],
        },
        {
          label: "Set tickets",
          title: "Are there combo tickets with the Sagano train or Randen?",
          body: null,
          table: {
            head: ["Set (with 1DAY entry)", "Adult", "Child"],
            rows: [
              ["Sagano Romantic Train, one way", "¥3,680", "¥2,040"],
              ["Randen 1-day pass", "¥3,200", "¥1,770"],
              ["Kyoto bus, 2 rides", "¥2,940", "¥1,660"],
              ["Kyoto Railway Museum", "¥3,870", "—"],
            ],
            note: <>Official hours and tickets page, checked {CHECKED}. Sagano train sets are for designated trains only.</>,
          },
        },
        {
          label: "Attractions",
          title: "What does the Attraction Pass cover?",
          body: (
            <p className={styles.bodyText}>
              The ninja trick house (¥600 on its own), NINJA BATTLE (¥800), the Ninja Fort 3D maze (¥600) and the
              haunted house (¥800), as many times as you like in one day, plus a kit for the Shinsengumi
              puzzle-solving game. The SHINOBORI climbing wall is not included. Under-3s and some visitors in
              costume or kimono cannot use some attractions.
            </p>
          ),
        },
      ]}
      sameDay={{
        heading: "Same day: western Kyoto",
        intro: "Uzumasa is on the way to Arashiyama on the Randen line. These fit the same day.",
        tours: [saganoRomanticTrainTicket, arashiyamaSaganoHalfDayWalk, kyotoKimonoOokiniArashiyama],
      }}
      links={
        <p className={styles.bodyText}>
          Pair it with Arashiyama: the{" "}
          <Link href="/guides/attractions/sagano-romantic-train-tickets" style={linkStyle}>Sagano Romantic Train guide</Link>{" "}
          covers the train the set ticket includes. For the rest of the city see{" "}
          <Link href="/guides/attractions/things-to-do-kyoto" style={linkStyle}>things to do in Kyoto</Link> and the{" "}
          <Link href="/guides/attractions/kyoto-2-day-itinerary" style={linkStyle}>Kyoto 2 day itinerary</Link>; for
          samurai and ninja in Tokyo,{" "}
          <Link href="/guides/attractions/samurai-ninja-experience-tokyo" style={linkStyle}>samurai and ninja experiences</Link>.
          {" "}In central Kyoto, the <Link href="/guides/attractions/kyoto-international-manga-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kyoto International Manga Museum</Link> at Karasuma-Oike is ¥1,200 for adults (closed on Wednesdays).
        </p>
      }
      faq={[
        {
          q: "How much is Toei Kyoto Studio Park?",
          a: `¥2,800 for adults and ¥1,600 for children for the 1DAY ticket; ¥2,000 and ¥1,300 from 17:00. Under 3 is free. Prices apply until spring 2027. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "The 1DAY ticket covers 10:00–21:00; last entry is 60 minutes before closing and some areas close at 18:00.",
        },
        {
          q: "Is Toei Kyoto Studio Park the same as UZUMASA KYOTO VILLAGE?",
          a: "Yes. Toei Uzumasa Eigamura (Toei Kyoto Studio Park) now uses the name UZUMASA KYOTO VILLAGE.",
        },
        {
          q: "Are the ninja attractions included?",
          a: "No. They cost ¥600–¥800 each, or ¥1,500 for all four on the Attraction Pass.",
        },
        {
          q: "Can I buy tickets on Klook?",
          a: "Yes. Klook sells the admission ticket; the park also sells its own tickets online.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sagano-romantic-train-tickets", title: "Sagano Romantic Train Tickets" },
        { href: "/guides/attractions/things-to-do-kyoto", title: "Things to Do in Kyoto" },
        { href: "/guides/attractions/kyoto-2-day-itinerary", title: "Kyoto 2 Day Itinerary" },
        { href: "/guides/attractions/edo-wonderland-tickets", title: "Edo Wonderland Tickets" },
      ]}
      banner={{
        title: "Walk onto a Kyoto film set",
        desc: "Admission to Toei Kyoto Studio Park (UZUMASA KYOTO VILLAGE).",
        label: "View Studio Park tickets →",
      }}
    />
  );
}
