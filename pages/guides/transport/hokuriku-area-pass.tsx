import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrHokurikuAreaPass } from "../../../lib/klook-links-a35";
import { kanazawaGeishaKenrokuenCastleDayTour, shirakawagoKanazawaDayTour, kanazawaHotels } from "../../../lib/klook-links";
import { JRWEST_CHECKED_ISO, JRWEST_PASS_BASE, jrWestRuleRows } from "../../../lib/jrwest-pass-facts";

// Task jtk-20261127-A35. Every figure is from JR West's own page for the pass,
// read by node fetch on 27 Nov 2026: JRWEST_PASS_BASE + "hokuriku/" (price, the
// non-reserved-only rule, valid section Tsuruga ⇔ Kurobe-Unazukionsen, the
// third-sector rules, payment at a JR West station allowed for online bookings).
const ROUTE = "/guides/transport/hokuriku-area-pass";
const CHECKED = checkedLabel(JRWEST_CHECKED_ISO);
const OFFICIAL = `${JRWEST_PASS_BASE}hokuriku/`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HokurikuAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Hokuriku Area Pass"
      title="JR Hokuriku Area Pass 2026: Price, Coverage & How to Buy"
      description="JR West's Hokuriku Area Pass is ¥7,000 for 4 days (child ¥3,500): non-reserved Hokuriku Shinkansen Tsuruga–Kurobe-Unazukionsen and JR lines in Hokuriku."
      h1={<>JR Hokuriku Area Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Four days of JR West inside Fukui, Ishikawa and Toyama — the small pass for a base in Kanazawa — with the non-reserved rule that decides whether it works for you."
      badges={[`Checked ${CHECKED}`, "¥7,000 · 4 days", "Non-reserved seats"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The JR Hokuriku Area Pass costs <strong>¥7,000 for adults and ¥3,500 for children (6–11)</strong> for{" "}
            <strong>4 consecutive days</strong>, and it is valid only inside Toyama, Ishikawa and Fukui. It covers{" "}
            <strong>non-reserved</strong> seats on the Hokuriku Shinkansen between Tsuruga and Kurobe-Unazukionsen and
            on limited expresses, JR West local and rapid trains, and West Japan JR Bus local routes. It does not
            cover the Hokuriku Shinkansen east of Kurobe-Unazukionsen to Tokyo, and it cannot be used on a train that
            has reserved seats only.
          </p>
          <p className={styles.bodyText}>
            Buy an exchange order from an agency such as Klook before you fly, or reserve on JR-WEST ONLINE TRAIN
            RESERVATION from one month ahead (payment by card or at a JR West station). Foreign passport holders
            entering as Temporary Visitors only. JR West&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrHokurikuAreaPass.url, label: "Check the JR Hokuriku Area Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥7,000 / ¥3,500" },
        { label: "Validity", value: "4 consecutive days" },
        { label: "Shinkansen", value: "Tsuruga ⇔ Kurobe-Unazukionsen, non-reserved" },
        { label: "Area", value: "Fukui, Ishikawa, Toyama only" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a pass for days spent moving around Hokuriku from a Kanazawa or Toyama base —
          not for getting there. From Osaka, the seven-day Kansai-Hokuriku Area Pass (¥19,000) includes the trip in;
          from Tokyo, the Hokuriku Shinkansen east of Kurobe-Unazukionsen is not on this pass.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the JR Hokuriku Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, four days. Ages are set on the day the exchange order is issued or the pass is bought.
            </p>
          ),
          table: {
            head: ["Pass", "Adult (12+)", "Child (6–11)", "Days"],
            rows: [["Hokuriku Area Pass", "¥7,000", "¥3,500", "4 consecutive"]],
            note: (
              <>
                JR West, Hokuriku Area Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the JR Hokuriku Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Every seat on this pass is non-reserved. JR West&apos;s page notes that non-reserved seating is not
              available on trains with reserved seats only, so those trains are effectively off the pass.
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["Hokuriku Shinkansen", "Yes, non-reserved", "Tsuruga ⇔ Kurobe-Unazukionsen"],
              ["Limited expresses", "Yes, non-reserved", "Not on reserved-only trains"],
              ["JR West local and rapid trains", "Yes", "Inside the pass area"],
              ["Third-sector links", "Through trips only", "IR Ishikawa (Kanazawa–Tsubata), Ainokaze Toyama (Toyama–Takaoka), Hapi-Line Fukui (Echizen-Hanando–Fukui)"],
              ["West Japan JR Bus", "Local routes only", "Not expressway buses"],
              ["Hokuriku Shinkansen to Tokyo", "No", "Kurobe-Unazukionsen ⇔ Tokyo"],
              ["Reserved seats", "No", "Separate reserved-seat tickets are required"],
            ],
            note: <>JR West, Hokuriku Area Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Which pass",
          title: "Hokuriku Area Pass vs Kansai-Hokuriku and Takayama-Hokuriku",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The Hokuriku Area Pass is the cheapest of the Kanazawa passes because it does not include the journey
              into Hokuriku.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Gets you to Hokuriku from"],
            rows: [
              ["Hokuriku Area Pass", "¥7,000", "4", "Nowhere — inside Fukui, Ishikawa and Toyama only"],
              ["Kansai-Hokuriku Area Pass", "¥19,000", "7", "Kansai Airport, Osaka, Kyoto"],
              ["Takayama-Hokuriku Area Tourist Pass", "¥19,800", "5", "Osaka or Nagoya, via Takayama and Shirakawa-go"],
            ],
            note: <>JR West pass pages and JR Central&apos;s touristpass.jp, checked {CHECKED}.</>,
          },
        },
        {
          label: "Rules",
          title: "Who can use the JR Hokuriku Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              From Klook you receive an exchange order and exchange it in Japan with your passport. The rules below
              are the ones JR West prints for all its rail passes; the free seat reservations do not apply here,
              because this pass is non-reserved.
            </p>
          ),
          table: {
            head: ["Rule", "What JR West says"],
            rows: jrWestRuleRows.filter((r) => r[0] !== "Seat reservations"),
            note: <>JR West, Hokuriku Area Pass page, checked {CHECKED}.</>,
          },
          ctas: [{ href: jrHokurikuAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Kanazawa days to book with the pass",
        intro: "Guided days from Kanazawa, and the hotel search for a Kanazawa base.",
        tours: [kanazawaGeishaKenrokuenCastleDayTour, shirakawagoKanazawaDayTour, kanazawaHotels],
      }}
      links={
        <p className={styles.bodyText}>
          The{" "}
          <Link href="/guides/attractions/kanazawa-2-day-itinerary" style={linkStyle}>Kanazawa 2 day itinerary</Link>{" "}
          plans two days on this pass, and the{" "}
          <Link href="/guides/attractions/shirakawago-winter-light-up" style={linkStyle}>Shirakawa-go winter light-up</Link>{" "}
          guide covers the bus side trip the pass does not include. Getting there from Tokyo is in{" "}
          <Link href="/guides/transport/tokyo-to-kanazawa" style={linkStyle}>Tokyo to Kanazawa</Link>; from Osaka, compare the{" "}
          <Link href="/guides/transport/kansai-hokuriku-area-pass" style={linkStyle}>Kansai-Hokuriku Area Pass</Link>{" "}
          and the{" "}
          <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>Hokuriku Arch Pass</Link>.
          {" "}In Kanazawa, <Link href="/guides/attractions/kenrokuen-garden-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Kenrokuen</Link> costs ¥320 for adults and ¥100 for ages 6–17.
        </p>
      }
      faq={[
        {
          q: "How much is the JR Hokuriku Area Pass?",
          a: `¥7,000 for adults and ¥3,500 for children aged 6 to 11, for 4 consecutive days. JR West's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Can I reserve seats with the Hokuriku Area Pass?",
          a: "No. The pass covers non-reserved seats only; a reserved seat needs a separate reserved-seat ticket, and trains with reserved seats only cannot be used on the pass alone.",
        },
        {
          q: "Does the Hokuriku Area Pass cover the shinkansen from Tokyo to Kanazawa?",
          a: "No. It covers the Hokuriku Shinkansen only between Tsuruga and Kurobe-Unazukionsen. The section from Kurobe-Unazukionsen to Tokyo is excluded.",
        },
        {
          q: "Does the Hokuriku Area Pass go to Osaka or Kyoto?",
          a: "No. It is valid only in Toyama, Ishikawa and Fukui. The Kansai-Hokuriku Area Pass is the JR West pass that adds Kansai.",
        },
        {
          q: "Who can buy the Hokuriku Area Pass?",
          a: "Holders of a foreign passport entering Japan as a Temporary Visitor. Japanese nationals cannot use it.",
        },
      ]}
      related={[
        { href: "/guides/transport/kansai-hokuriku-area-pass", title: "Kansai-Hokuriku Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/takayama-hokuriku-area-pass", title: "Takayama-Hokuriku Area Pass 2026: Price & Shirakawa-go Buses" },
        { href: "/guides/transport/hokuriku-arch-pass", title: "JR Hokuriku Arch Pass 2026" },
        { href: "/guides/attractions/kanazawa-2-day-itinerary", title: "Kanazawa 2 Day Itinerary" },
      ]}
      banner={{
        title: "Four days around Hokuriku",
        desc: "Book the exchange order before you fly, then exchange it at a JR West station with your passport.",
        label: "View the JR Hokuriku Area Pass →",
      }}
    />
  );
}
