import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrWestAllAreaPass } from "../../../lib/klook-links-a35";
import { hiroshimaMiyajimaJoinDayTour, kanazawaKenrokuenHigashiChayaDayTour, amanohashidateIneFullDayTour } from "../../../lib/klook-links";
import { JRWEST_CHECKED_ISO, JRWEST_PASS_BASE, jrWestBuyRows, jrWestRuleRows } from "../../../lib/jrwest-pass-facts";

// Task jtk-20261127-A35. Every figure is from JR West's own page for the pass,
// read by node fetch on 27 Nov 2026: JRWEST_PASS_BASE + "all/". The other passes
// compared below were read the same day from their own JR West / JR Central pages.
const ROUTE = "/guides/transport/jr-west-all-area-pass";
const CHECKED = checkedLabel(JRWEST_CHECKED_ISO);
const OFFICIAL = `${JRWEST_PASS_BASE}all/`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function JrWestAllAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="JR West All Area Pass"
      title="JR West All Area Pass 2026: Price, Coverage & How to Buy"
      description="The JR-WEST All Area Pass is ¥26,000 for 7 days (child ¥13,000): Sanyo Shinkansen to Hakata plus Hokuriku Shinkansen, no Tokaido. How to buy it on Klook."
      h1={<>JR West All Area Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="One seven-day JR West pass from Kansai Airport to Hakata and up to Kanazawa and Toyama — what it covers, what it does not, and how to buy it before you fly."
      badges={[`Checked ${CHECKED}`, "¥26,000 · 7 days", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The JR-WEST All Area Pass costs <strong>¥26,000 for adults and ¥13,000 for children (6–11)</strong> and
            runs for <strong>7 consecutive days</strong>. It covers the Sanyo Shinkansen between Shin-Osaka and Hakata,
            the Hokuriku Shinkansen between Tsuruga and Joetsu-Myoko, reserved seats on limited expresses such as
            the HARUKA, THUNDERBIRD, KUROSHIO, KONOTORI and YAKUMO, JR West local lines, the JR Miyajima ferry and
            West Japan JR Bus local routes. It does <strong>not</strong> cover the Tokaido Shinkansen (Shin-Osaka to
            Tokyo) or the Kyushu Shinkansen beyond Hakata.
          </p>
          <p className={styles.bodyText}>
            Book it as an exchange order from an agency such as Klook before you fly and swap it for the pass at a
            JR West station with your passport, or reserve it on JR-WEST ONLINE TRAIN RESERVATION from one month
            ahead. Only foreign passport holders entering Japan as Temporary Visitors can use it. Prices from JR
            West&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrWestAllAreaPass.url, label: "Check the JR West All Area Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥26,000 / ¥13,000" },
        { label: "Validity", value: "7 consecutive days" },
        { label: "Shinkansen covered", value: "Sanyo (Shin-Osaka–Hakata), Hokuriku (Tsuruga–Joetsu-Myoko)" },
        { label: "Not covered", value: "Tokaido Shinkansen, Kyushu Shinkansen" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy it for a week that uses both ends of JR West — Hiroshima or Hakata on
          one side, Kanazawa or Toyama on the other. If your week only runs one way from Osaka, a smaller JR West
          pass covers it for less: ¥23,000 to Hakata, ¥19,000 to Kanazawa and Toyama, ¥12,000 as far as Okayama.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the JR West All Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, one price: ¥26,000 for seven consecutive days. Age is set on the day the exchange order is
              issued or the pass is bought, and up to two children aged 1–5 ride free with each pass holder if they
              do not take a reserved seat of their own.
            </p>
          ),
          table: {
            head: ["Pass", "Adult (12+)", "Child (6–11)", "Days"],
            rows: [["JR-WEST All Area Pass", "¥26,000", "¥13,000", "7 consecutive"]],
            note: (
              <>
                JR West, JR-WEST All Area Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the same pass at its own price; open the listing for the figure on your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the JR West All Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              It is the only JR West pass that puts both of JR West&apos;s shinkansen lines in one week. Seats on
              both shinkansen can be reserved or non-reserved; on a train that is reserved-only, you need a seat
              reservation before boarding (free with the pass).
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["Sanyo Shinkansen", "Yes", "Shin-Osaka ⇔ Hakata, reserved and non-reserved seats"],
              ["Hokuriku Shinkansen", "Yes", "Tsuruga ⇔ Joetsu-Myoko, reserved and non-reserved; GranClass and Green cars need extra tickets"],
              ["Limited expresses", "Yes", "Reserved seats on the HARUKA, THUNDERBIRD, KUROSHIO, KONOTORI, YAKUMO and others"],
              ["JR West local, rapid and special rapid trains", "Yes", "Paid “A Seat” cars are charged separately"],
              ["JR West Miyajima Ferry", "Yes", "Miyajimaguchi ⇔ Miyajima; the ¥100 Miyajima visitor tax is paid on boarding"],
              ["West Japan JR Bus", "Local routes only", "Not expressway buses"],
              ["Third-sector links in Hokuriku", "Through trips only", "IR Ishikawa (Kanazawa–Tsubata), Ainokaze Toyama (Toyama–Takaoka), Hapi-Line Fukui (Echizen-Hanando–Fukui); getting off midway is not covered"],
              ["Tokaido Shinkansen", "No", "Shin-Osaka ⇔ Tokyo"],
              ["Kyushu Shinkansen", "No", "Hakata ⇔ Kagoshima-Chuo"],
            ],
            note: <>JR West, JR-WEST All Area Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Which pass",
          title: "JR West All Area Pass vs the smaller JR West passes",
          body: (
            <>
              <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
                The All Area Pass is the sum of the regional passes. If one of the rows below already contains your
                whole route, that pass is cheaper. The ¥3,000 step up from the Sanyo-San&apos;in pass buys the
                Hokuriku side; the ¥7,000 step up from the Kansai-Hokuriku pass buys everything west of Okayama.
              </p>
            </>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Reaches"],
            rows: [
              ["JR-WEST All Area Pass", "¥26,000", "7", "Hakata, Hiroshima, San'in, Kansai, Kanazawa, Toyama"],
              ["Sanyo-San'in Area Pass", "¥23,000", "7", "Hakata, Hiroshima, Okayama, Tottori, Matsue, Kansai — no Hokuriku"],
              ["Kansai-Hokuriku Area Pass", "¥19,000", "7", "Kansai, Fukui, Kanazawa, Toyama, Okayama — no Hiroshima"],
              ["Kansai-San'in Area Pass", "¥18,000", "7", "Kansai, Okayama, Tottori, Matsue, Hagi"],
              ["Kansai WIDE Area Pass", "¥12,000", "5", "Kansai, Okayama, Takamatsu, Kinosaki Onsen, Tottori, Shirahama"],
            ],
            note: <>Each pass&apos;s own JR West page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the JR West All Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR West lists three routes. Buying from Klook is the first one: you get an exchange order, and the pass
              itself is printed when you exchange it in Japan with your passport.
            </p>
          ),
          table: {
            head: ["Where", "What you get", "Then"],
            rows: jrWestBuyRows,
            note: <>JR West, pass page &ldquo;Purchasing a Rail Pass&rdquo;, checked {CHECKED}.</>,
          },
          ctas: [{ href: jrWestAllAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the JR West All Area Pass, and what are the rules?",
          body: null,
          table: {
            head: ["Rule", "What JR West says"],
            rows: jrWestRuleRows,
            note: <>JR West, JR-WEST All Area Pass page, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Book alongside the pass",
        intro:
          "Three guided days at the two ends and the middle of the pass area — each starts at a station the pass reaches.",
        tours: [hiroshimaMiyajimaJoinDayTour, kanazawaKenrokuenHigashiChayaDayTour, amanohashidateIneFullDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          Planning the route first? Our{" "}
          <Link href="/guides/attractions/hiroshima-2-day-itinerary" style={linkStyle}>Hiroshima 2 day itinerary</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/kanazawa-2-day-itinerary" style={linkStyle}>Kanazawa 2 day itinerary</Link>{" "}
          cover the two ends of the pass, and the{" "}
          <Link href="/guides/attractions/japan-14-day-itinerary" style={linkStyle}>Japan 14 day itinerary</Link>{" "}
          shows where a seven-day regional pass fits inside a longer trip. If you also need Tokyo, compare the
          national pass in our{" "}
          <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>JR Pass guide</Link>, and the{" "}
          <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>Hokuriku Arch Pass</Link>{" "}
          for a Tokyo–Kanazawa–Osaka line. For one way only, see the{" "}
          <Link href="/guides/transport/sanyo-sanin-area-pass" style={linkStyle}>Sanyo-San&apos;in Area Pass</Link>{" "}
          or the{" "}
          <Link href="/guides/transport/kansai-hokuriku-area-pass" style={linkStyle}>Kansai-Hokuriku Area Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the JR West All Area Pass?",
          a: `¥26,000 for adults and ¥13,000 for children aged 6 to 11, for 7 consecutive days. JR West's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the JR West All Area Pass cover the Hokuriku Shinkansen?",
          a: "Yes, between Tsuruga and Joetsu-Myoko, in reserved or non-reserved ordinary seats. It does not cover the Hokuriku Shinkansen between Joetsu-Myoko and Tokyo, which is JR East.",
        },
        {
          q: "Can I ride the Nozomi with the JR West All Area Pass?",
          a: "The pass covers the Sanyo Shinkansen between Shin-Osaka and Hakata without naming train types, so seats on that line are covered. The Tokaido Shinkansen between Shin-Osaka and Tokyo is not covered by this pass at all.",
        },
        {
          q: "Can residents of Japan use the JR West All Area Pass?",
          a: "No. It is for holders of a foreign passport entering Japan as a Temporary Visitor (短期滞在). Japanese nationals cannot use it, including those with permanent residence abroad.",
        },
        {
          q: "How many seat reservations can I make with the pass?",
          a: "Seat reservations are free. The first six can be made at a ticket machine; from the seventh, reservations must be made at a JR ticket office.",
        },
      ]}
      related={[
        { href: "/guides/transport/sanyo-sanin-area-pass", title: "Sanyo-San'in Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/kansai-hokuriku-area-pass", title: "Kansai-Hokuriku Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/kansai-hiroshima-area-pass", title: "JR Kansai-Hiroshima Area Pass" },
        { href: "/guides/transport/jr-pass-guide", title: "JR Pass Price 2026: Is It Worth It?" },
      ]}
      banner={{
        title: "Seven days, both shinkansen lines",
        desc: "Book the exchange order before you fly, then swap it for the pass at a JR West station with your passport.",
        label: "View the JR West All Area Pass →",
      }}
    />
  );
}
