import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tokyoSubwayTicket } from "../../../lib/klook-links";
import { hakkeijimaSeaParadiseTicket, hakoneKamakuraPass } from "../../../lib/klook-links-a35";

// Task jtk-20261129-A35 (day 3, run 28 Nov 2026). Every figure is from Sea
// Paradise's own price page, read by node fetch on 28 Nov 2026:
// seaparadise.co.jp/price/ (One-Day Pass = the four aquariums Aqua Museum, Dolphin
// Fantasy, Fureai Lagoon, Umi Farm + Pleasure Land rides, some excluded: adult/high
// school 5,900 / senior 65+ 4,300 / elementary+junior high 4,300 / age 4+ 2,600 yen;
// Rakuen Night Pass from 15:00 or 16:00, weekends/holidays/set days 3,900 / 2,600 /
// 2,600 / 1,700; Aqua Resorts Pass, aquariums only, 3,500 / 3,000 / 2,200 / 1,200;
// Night Aqua Resorts Pass 2,800 / 2,400 / 1,700 / 850; Pleasure Land Pass, rides only,
// 3,500 / 3,000 / 3,000 / 1,800; rides can close all day for maintenance; online
// purchase through asoview). Hours vary by date and are not printed. No Klook
// price is printed (403).
const ROUTE = "/guides/attractions/hakkeijima-sea-paradise-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.seaparadise.co.jp/price/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HakkeijimaSeaParadiseTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Hakkeijima Sea Paradise Tickets"
      title="Hakkeijima Sea Paradise Tickets 2026: Price & Passes"
      description="Yokohama Hakkeijima Sea Paradise One-Day Pass is ¥5,900 for adults: four aquariums and the rides. Aquarium-only, ride-only and night passes compared."
      h1={<>Hakkeijima Sea Paradise Tickets 2026: <br />Price &amp; Which Pass to Buy</>}
      subtitle="Yokohama's island aquarium and amusement park: the One-Day Pass, the aquarium-only pass and the evening tickets."
      badges={[`Checked ${CHECKED}`, "One-Day Pass ¥5,900", "Yokohama"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Hakkeijima Sea Paradise <strong>One-Day Pass is ¥5,900 for adults and high school students</strong>,
            ¥4,300 for elementary and junior high pupils and seniors 65+, and ¥2,600 for children from age 4. It
            covers all <strong>four aquariums</strong> — Aqua Museum, Dolphin Fantasy, Fureai Lagoon and Umi Farm —
            and the Pleasure Land rides, with a few exceptions.
          </p>
          <p className={styles.bodyText}>
            Aquariums only, the <strong>Aqua Resorts Pass is ¥3,500</strong>. On weekends, holidays and set days the
            Rakuen Night Pass (from 15:00 or 16:00) is ¥3,900. The park sells online through asoview; Klook sells
            the ticket as well. Sea Paradise price page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hakkeijimaSeaParadiseTicket.url, label: "Check Sea Paradise tickets on Klook →" }}
      stats={[
        { label: "One-Day Pass (adult)", value: "¥5,900" },
        { label: "Aqua Resorts Pass (adult)", value: "¥3,500" },
        { label: "Rakuen Night Pass (adult)", value: "¥3,900" },
        { label: "Pleasure Land Pass (adult)", value: "¥3,500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> with children who want the rides, the One-Day Pass; for the aquariums alone,
          the Aqua Resorts Pass saves ¥2,400 per adult.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is Hakkeijima Sea Paradise?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Seniors 65+ pay the same as elementary and junior high pupils on the One-Day and Rakuen Night passes,
              but more on the aquarium-only passes. Age 4+ means preschool children from 4.
            </p>
          ),
          table: {
            head: ["Pass", "Adult / high school", "Elem. & junior high", "Senior 65+", "Age 4+"],
            rows: [
              ["One-Day Pass (4 aquariums + rides)", "¥5,900", "¥4,300", "¥4,300", "¥2,600"],
              ["Rakuen Night Pass (weekends, holidays, set days)", "¥3,900", "¥2,600", "¥2,600", "¥1,700"],
              ["Aqua Resorts Pass (4 aquariums)", "¥3,500", "¥2,200", "¥3,000", "¥1,200"],
              ["Night Aqua Resorts Pass", "¥2,800", "¥1,700", "¥2,400", "¥850"],
              ["Pleasure Land Pass (rides)", "¥3,500", "¥3,000", "¥3,000", "¥1,800"],
            ],
            note: (
              <>
                Sea Paradise price page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source (Japanese)</a>.
                Rides can close all day for maintenance. Klook sells the ticket at its own price.
              </>
            ),
          },
          ctas: [{ href: hakkeijimaSeaParadiseTicket.url, label: "Book the One-Day Pass on Klook →" }],
        },
        {
          label: "Which pass",
          title: "Which Sea Paradise pass should I buy?",
          body: null,
          table: {
            head: ["If you want…", "Buy"],
            rows: [
              ["Aquariums and rides all day", "One-Day Pass"],
              ["The aquariums only", "Aqua Resorts Pass"],
              ["Rides only", "Pleasure Land Pass (special amusements excluded)"],
              ["An evening visit on a weekend", "Rakuen Night Pass or Night Aqua Resorts Pass"],
            ],
            note: <>Sea Paradise price page, checked {CHECKED}. Night passes start at 15:00 or 16:00 depending on the date.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Same trip: Yokohama and Kamakura",
        intro: "Sea Paradise is on the south side of Yokohama, toward Kamakura. These fit the same trip.",
        tours: [hakoneKamakuraPass, tokyoSubwayTicket],
      }}
      links={
        <p className={styles.bodyText}>
          Make it part of a{" "}
          <Link href="/guides/attractions/yokohama-day-trip" style={linkStyle}>Yokohama day trip</Link> or a{" "}
          <Link href="/guides/attractions/kamakura-day-trip" style={linkStyle}>Kamakura day trip</Link>. For more
          family days out, see the{" "}
          <Link href="/guides/attractions/tokyo-itinerary-with-kids" style={linkStyle}>Tokyo itinerary with kids</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/yomiuriland-tickets" style={linkStyle}>Yomiuriland tickets</Link>.
          {" "}Other aquariums near Tokyo: <Link href="/guides/attractions/enoshima-aquarium-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Enoshima Aquarium</Link> (¥2,800) and <Link href="/guides/attractions/kamogawa-sea-world-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kamogawa Sea World</Link> (¥3,300, about 2 hours from Tokyo).
        </p>
      }
      faq={[
        {
          q: "How much is the Hakkeijima Sea Paradise One-Day Pass?",
          a: `¥5,900 for adults and high school students, ¥4,300 for elementary and junior high pupils and seniors, ¥2,600 for children from 4. Sea Paradise, checked ${CHECKED}.`,
        },
        {
          q: "Can I visit only the aquariums?",
          a: "Yes. The Aqua Resorts Pass covers the four aquariums for ¥3,500 per adult.",
        },
        {
          q: "Is there a night ticket?",
          a: "On weekends, holidays and set days: the Rakuen Night Pass (aquariums + rides) at ¥3,900 and the Night Aqua Resorts Pass at ¥2,800, from 15:00 or 16:00.",
        },
        {
          q: "Are all rides included in the One-Day Pass?",
          a: "Most Pleasure Land rides are, with some exclusions. Rides can also close all day for maintenance; the park publishes a closure calendar.",
        },
        {
          q: "Can I buy Sea Paradise tickets on Klook?",
          a: "Yes. Klook sells the Yokohama Hakkeijima Sea Paradise ticket.",
        },
      ]}
      related={[
        { href: "/guides/attractions/yokohama-day-trip", title: "Yokohama Day Trip" },
        { href: "/guides/attractions/kamakura-day-trip", title: "Kamakura Day Trip" },
        { href: "/guides/attractions/tokyo-itinerary-with-kids", title: "Tokyo Itinerary with Kids" },
        { href: "/guides/attractions/yomiuriland-tickets", title: "Yomiuriland Tickets" },
      ]}
      banner={{
        title: "Four aquariums and the rides",
        desc: "Yokohama Hakkeijima Sea Paradise on one day pass.",
        label: "View Sea Paradise tickets →",
      }}
    />
  );
}
