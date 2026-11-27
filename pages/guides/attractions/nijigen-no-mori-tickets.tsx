import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nijigenNarutoTicket, nijigenGodzillaTicket, nijigenDragonQuestTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from Nijigen no
// Mori's own English price page, read by node fetch on 28 Nov 2026:
// nijigennomori.com/en/price/ (park admission free, a ticket per attraction; advance
// timed tickets online or same-day at each attraction's desk; NARUTO & BORUTO
// Shinobi-Zato Light adult 12+ 3,300-4,100 / child 5-11 1,800-2,200 yen, Golden
// 4,800-5,600 / 3,100-3,500; Godzilla Interception Operation Light 2,800-3,600 /
// 1,800-2,200, Golden 4,800-5,600 / 3,100-3,500, on-site counter +500 yen; Dragon
// Quest Island Light 3,400-4,500 / 1,800-2,500, Golden 5,400-6,500 / 3,100-3,800;
// children must be with someone 12+; prices vary by season; park hours 10:00-20:30
// weekdays and weekends, varying by season). No Klook price is printed (403).
const ROUTE = "/guides/attractions/nijigen-no-mori-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://nijigennomori.com/en/price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function NijigenNoMoriTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Nijigen no Mori Tickets"
      title="Nijigen no Mori Tickets 2026: Naruto, Godzilla Prices"
      description="Nijigen no Mori on Awaji Island is free to enter; each attraction has its own ticket. NARUTO from ¥3,300, Godzilla from ¥2,800, Dragon Quest from ¥3,400."
      h1={<>Nijigen no Mori Tickets 2026: <br />NARUTO, Godzilla &amp; Dragon Quest Prices</>}
      subtitle="The anime park on Awaji Island: how its per-attraction tickets work, what the Light and Golden tickets cost, and its hours."
      badges={[`Checked ${CHECKED}`, "Free entry", "Awaji Island"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>Entry to Nijigen no Mori is free; you buy a ticket for each attraction.</strong> The NARUTO
            &amp; BORUTO Shinobi-Zato <strong>Light Ticket is ¥3,300–¥4,100 for adults</strong> (12+) and
            ¥1,800–¥2,200 for children 5–11; Godzilla Interception Operation starts at ¥2,800 and Dragon Quest
            Island at ¥3,400. Prices move within those ranges by season.
          </p>
          <p className={styles.bodyText}>
            The park is open <strong>10:00–20:30</strong>, with hours varying by season. Advance tickets are for a
            time slot and sold online; same-day tickets are sold at each attraction&apos;s desk. Klook sells the
            NARUTO, Godzilla and Dragon Quest tickets. Nijigen no Mori price page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nijigenNarutoTicket.url, label: "Check the NARUTO & BORUTO ticket on Klook →" }}
      stats={[
        { label: "Park entry", value: "Free" },
        { label: "NARUTO Light (adult)", value: "¥3,300–¥4,100" },
        { label: "Godzilla Light (adult)", value: "¥2,800–¥3,600" },
        { label: "Hours", value: "10:00–20:30 (seasonal)" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> pick the attractions first, then the ticket level. The Light Ticket covers
          each attraction&apos;s main experience; the Golden Ticket adds the extras.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much are Nijigen no Mori tickets?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Adult means 12 and over; child means 5–11, and children must be accompanied by someone 12 or older.
              Each attraction also sells premium tickets with goods.
            </p>
          ),
          table: {
            head: ["Attraction", "Light (adult / child)", "Golden (adult / child)"],
            rows: [
              ["NARUTO & BORUTO Shinobi-Zato", "¥3,300–4,100 / ¥1,800–2,200", "¥4,800–5,600 / ¥3,100–3,500"],
              ["Godzilla Interception Operation", "¥2,800–3,600 / ¥1,800–2,200", "¥4,800–5,600 / ¥3,100–3,500"],
              ["Dragon Quest Island", "¥3,400–4,500 / ¥1,800–2,500", "¥5,400–6,500 / ¥3,100–3,800"],
            ],
            note: (
              <>
                Nijigen no Mori price page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Prices vary by season. Godzilla tickets bought at the on-site counter cost ¥500 more. Klook sells
                the tickets at its own price.
              </>
            ),
          },
        },
        {
          label: "What's included",
          title: "What does the NARUTO Light Ticket include?",
          body: null,
          table: {
            head: ["Ticket", "Includes"],
            rows: [
              ["Light", "Shinobi-Zato admission, the Ten-no-maki 3D maze, the Chi-no-maki mission rally and the projection mapping after dusk"],
              ["Golden", "The Light Ticket plus one special mission"],
            ],
            note: <>Nijigen no Mori price page, checked {CHECKED}.</>,
          },
          ctas: [{ href: nijigenNarutoTicket.url, label: "Book the NARUTO & BORUTO ticket on Klook →" }],
        },
        {
          label: "Godzilla",
          title: "What does the Godzilla ticket include?",
          body: (
            <p className={styles.bodyText}>
              The Godzilla Light Ticket includes the pre-theatre, one zip line ride and the Godzilla cell shooting
              game. The Golden Ticket adds the Godzilla Museum, the special-effects studio and a puzzle-solving game.
            </p>
          ),
          ctas: [{ href: nijigenGodzillaTicket.url, label: "Book the Godzilla ticket on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day at Nijigen no Mori",
        intro: "Each attraction is its own ticket, so a day here means choosing two or three of them.",
        tours: [nijigenGodzillaTicket, nijigenDragonQuestTicket],
      }}
      links={
        <p className={styles.bodyText}>
          Awaji Island lies across the strait from Kobe: see the{" "}
          <Link href="/guides/attractions/kobe-day-trip-from-osaka" style={linkStyle}>Kobe day trip from Osaka</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link>. For
          anime in Tokyo, see the{" "}
          <Link href="/guides/attractions/akihabara-anime-tour" style={linkStyle}>Akihabara anime tour guide</Link>,
          and for the wider region the{" "}
          <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>Kansai 5 day itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "Is Nijigen no Mori free to enter?",
          a: "Yes. Entry to the park is free; each attraction (NARUTO, Godzilla, Dragon Quest and others) has its own ticket.",
        },
        {
          q: "How much is the NARUTO ticket at Nijigen no Mori?",
          a: `The Light Ticket is ¥3,300–¥4,100 for adults and ¥1,800–¥2,200 for children 5–11; the Golden Ticket ¥4,800–¥5,600. Prices vary by season. Checked ${CHECKED}.`,
        },
        {
          q: "How much is the Godzilla attraction?",
          a: "The Light Ticket is ¥2,800–¥3,600 for adults (pre-theatre, one zip line ride, shooting game); ¥500 more at the on-site counter.",
        },
        {
          q: "What are Nijigen no Mori's hours?",
          a: "10:00–20:30 on weekdays and weekends, varying by season. Each attraction has its own last admission time.",
        },
        {
          q: "Can I buy Nijigen no Mori tickets on Klook?",
          a: "Yes. Klook sells separate tickets for NARUTO & BORUTO Shinobi-Zato, Godzilla Interception Operation and Dragon Quest Island.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kobe-day-trip-from-osaka", title: "Kobe Day Trip from Osaka" },
        { href: "/guides/attractions/akihabara-anime-tour", title: "Akihabara Anime Tour" },
        { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
        { href: "/guides/attractions/kansai-5-day-itinerary", title: "Kansai 5 Day Itinerary" },
      ]}
      banner={{
        title: "NARUTO on Awaji Island",
        desc: "The Shinobi-Zato ninja village at Nijigen no Mori.",
        label: "View the NARUTO ticket →",
      }}
    />
  );
}
