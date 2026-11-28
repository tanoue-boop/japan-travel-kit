import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrSanyoSaninAreaPass, hiroshimaMiyajimaJoinDayTour, hiroshimaPeaceHalfDayTour, hiroshimaMiyajimaFerryDayTour } from "../../../lib/klook-links";
import { JRWEST_CHECKED_ISO, JRWEST_PASS_BASE, jrWestBuyRows, jrWestRuleRows } from "../../../lib/jrwest-pass-facts";

// Task jtk-20261127-A35. Every figure is from JR West's own page for the pass,
// read by node fetch on 27 Nov 2026: JRWEST_PASS_BASE + "sanyo_sanin/" (price,
// valid trains, the "Have Fun in Yamaguchi Pass" set at ¥23,500). The comparison
// rows come from the other JR West pass pages read the same day.
const ROUTE = "/guides/transport/sanyo-sanin-area-pass";
const CHECKED = checkedLabel(JRWEST_CHECKED_ISO);
const OFFICIAL = `${JRWEST_PASS_BASE}sanyo_sanin/`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SanyoSaninAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Sanyo-San'in Area Pass"
      title="Sanyo-San'in Area Pass 2026: Price, Coverage & How to Buy"
      description="JR West's Sanyo-San'in Area Pass is ¥23,000 for 7 days (child ¥11,500): Sanyo Shinkansen Shin-Osaka–Hakata, the YAKUMO and Miyajima ferry. How to buy."
      h1={<>Sanyo-San&apos;in Area Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Seven days of JR West from Kansai Airport to Hakata, with Hiroshima, Miyajima, Okayama, Tottori and Matsue on the way — what the pass covers and how to buy it before you fly."
      badges={[`Checked ${CHECKED}`, "¥23,000 · 7 days", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Sanyo-San&apos;in Area Pass costs <strong>¥23,000 for adults and ¥11,500 for children (6–11)</strong>{" "}
            for <strong>7 consecutive days</strong>. It covers reserved and non-reserved seats on the Sanyo Shinkansen
            between Shin-Osaka and Hakata, reserved seats on limited expresses such as the HARUKA, YAKUMO and
            KONOTORI, JR West local lines, the JR Miyajima ferry and West Japan JR Bus local routes. The Tokaido
            Shinkansen (Shin-Osaka–Tokyo) and the Kyushu Shinkansen (south of Hakata) are not covered.
          </p>
          <p className={styles.bodyText}>
            Buy an exchange order from an agency such as Klook and swap it at a JR West station with your passport,
            or reserve it on JR-WEST ONLINE TRAIN RESERVATION from one month ahead. Foreign passport holders entering
            Japan as Temporary Visitors only. JR West&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrSanyoSaninAreaPass.url, label: "Check the Sanyo-San'in Area Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥23,000 / ¥11,500" },
        { label: "Validity", value: "7 consecutive days" },
        { label: "Shinkansen", value: "Sanyo, Shin-Osaka ⇔ Hakata" },
        { label: "Also covered", value: "YAKUMO to Matsue, Miyajima ferry, Kansai Airport HARUKA" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the pass for a week that goes past Hiroshima — to Yamaguchi, Hakata or the
          San&apos;in coast. If you turn back at Hiroshima, JR West&apos;s five-day Kansai-Hiroshima Area Pass is the
          smaller one; if you also want Kanazawa, the All Area Pass adds the Hokuriku side for ¥3,000 more.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Sanyo-San'in Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, seven days. JR West also sells it bundled with sightseeing tickets: on the day checked, its
              pass page listed the pass with the &ldquo;Have Fun in Yamaguchi Pass&rdquo; (5 facilities) at ¥23,500.
            </p>
          ),
          table: {
            head: ["Product", "Adult (12+)", "Child (6–11)", "Days"],
            rows: [
              ["Sanyo-San'in Area Pass", "¥23,000", "¥11,500", "7 consecutive"],
              ["Pass + Have Fun in Yamaguchi Pass (5 facilities)", "¥23,500", "Not listed", "7 consecutive"],
            ],
            note: (
              <>
                JR West, Sanyo-San&apos;in Area Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Sanyo-San'in Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The Sanyo Shinkansen is covered end to end inside JR West, and the San&apos;in side is reached by limited
              express. On a reserved-only train, book the seat (free) before boarding.
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["Sanyo Shinkansen", "Yes", "Shin-Osaka ⇔ Hakata, reserved and non-reserved; Green cars need extra tickets"],
              ["Limited expresses", "Yes", "Reserved seats on the HARUKA, YAKUMO, KONOTORI and others"],
              ["JR West local, rapid and special rapid trains", "Yes", "Paid “A Seat” cars are charged separately"],
              ["JR West Miyajima Ferry", "Yes", "Miyajimaguchi ⇔ Miyajima; pay the ¥100 Miyajima visitor tax on boarding"],
              ["West Japan JR Bus", "Local routes only", "Not expressway buses"],
              ["Tokaido Shinkansen", "No", "Shin-Osaka ⇔ Tokyo"],
              ["Kyushu Shinkansen", "No", "Hakata ⇔ Kagoshima-Chuo"],
            ],
            note: <>JR West, Sanyo-San&apos;in Area Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Which pass",
          title: "Sanyo-San'in Area Pass vs the Kansai-Hiroshima and All Area passes",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              All three are JR West passes sold to foreign visitors. The deciding question is how far west and how far
              north the week goes.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Shinkansen reach"],
            rows: [
              ["Kansai-Hiroshima Area Pass", "¥17,000", "5", "Shin-Osaka ⇔ Hiroshima"],
              ["Sanyo-San'in Area Pass", "¥23,000", "7", "Shin-Osaka ⇔ Hakata, plus the San'in coast"],
              ["JR-WEST All Area Pass", "¥26,000", "7", "Shin-Osaka ⇔ Hakata, plus Tsuruga ⇔ Joetsu-Myoko"],
            ],
            note: <>Each pass&apos;s own JR West page; the Kansai-Hiroshima figure was read on 13 November 2026, the others on {CHECKED}.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Sanyo-San'in Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              From Klook you receive an exchange order; the pass is issued when you exchange it in Japan with your
              passport.
            </p>
          ),
          table: {
            head: ["Where", "What you get", "Then"],
            rows: jrWestBuyRows,
            note: <>JR West, pass page &ldquo;Purchasing a Rail Pass&rdquo;, checked {CHECKED}.</>,
          },
          ctas: [{ href: jrSanyoSaninAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the Sanyo-San'in Area Pass?",
          body: null,
          table: {
            head: ["Rule", "What JR West says"],
            rows: jrWestRuleRows,
            note: <>JR West, Sanyo-San&apos;in Area Pass page, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Hiroshima and Miyajima on the same pass",
        intro: "The pass gets you to Hiroshima and onto the Miyajima ferry; these guided days fill the day once you are there.",
        tours: [hiroshimaMiyajimaJoinDayTour, hiroshimaPeaceHalfDayTour, hiroshimaMiyajimaFerryDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the stops on the way, see our{" "}
          <Link href="/guides/attractions/hiroshima-miyajima-day-trip" style={linkStyle}>Hiroshima and Miyajima day trip</Link>,
          the{" "}
          <Link href="/guides/attractions/hiroshima-2-day-itinerary" style={linkStyle}>Hiroshima 2 day itinerary</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2 day itinerary</Link>{" "}
          for the Hakata end. The single-ticket fares the pass replaces are in{" "}
          <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>Osaka to Hiroshima by shinkansen</Link>, and if
          Kyushu comes next, the{" "}
          <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass</Link>{" "}
          starts where this one stops. Adding Kanazawa? The{" "}
          <Link href="/guides/transport/jr-west-all-area-pass" style={linkStyle}>JR West All Area Pass</Link>{" "}
          covers both. Crossing to Shikoku? The{" "}
          <Link href="/guides/transport/all-shikoku-rail-pass" style={linkStyle}>ALL SHIKOKU Rail Pass</Link>{" "}
          starts at Kojima. For five days in the west only, the{" "}
          <Link href="/guides/transport/okayama-hiroshima-yamaguchi-area-pass" style={linkStyle}>Okayama-Hiroshima-Yamaguchi Area Pass</Link>{" "}
          is the smaller pass.
          {" "}In Matsue, <Link href="/guides/attractions/matsue-castle-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Matsue Castle</Link> costs ¥1,200 for adults, open 8:30–17:00 from October to March.
        </p>
      }
      faq={[
        {
          q: "How much is the Sanyo-San'in Area Pass?",
          a: `¥23,000 for adults and ¥11,500 for children aged 6 to 11, for 7 consecutive days. JR West's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the Sanyo-San'in Area Pass cover the shinkansen to Hakata?",
          a: "Yes. It covers reserved and non-reserved seats on the Sanyo Shinkansen between Shin-Osaka and Hakata. It does not cover the Kyushu Shinkansen south of Hakata or the Tokaido Shinkansen to Tokyo.",
        },
        {
          q: "Does the pass include the Miyajima ferry?",
          a: "Yes, the JR West Miyajima Ferry between Miyajimaguchi and Miyajima. The ¥100 Miyajima visitor tax is paid separately when you board.",
        },
        {
          q: "Can I use the Sanyo-San'in Area Pass from Kansai Airport?",
          a: "Yes. Reserved seats on the HARUKA limited express are listed among the covered trains.",
        },
        {
          q: "Who can buy the Sanyo-San'in Area Pass?",
          a: "Holders of a foreign passport entering Japan as a Temporary Visitor. Japanese nationals cannot use it, and you must show your passport to receive the pass.",
        },
      ]}
      related={[
        { href: "/guides/transport/jr-west-all-area-pass", title: "JR West All Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/kansai-hiroshima-area-pass", title: "JR Kansai-Hiroshima Area Pass" },
        { href: "/guides/transport/kansai-sanin-area-pass", title: "Kansai-San'in Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "Hiroshima and Miyajima Day Trip" },
      ]}
      banner={{
        title: "Kansai to Hakata in one pass",
        desc: "Book the exchange order before you fly, then exchange it at a JR West station with your passport.",
        label: "View the Sanyo-San'in Area Pass →",
      }}
    />
  );
}
