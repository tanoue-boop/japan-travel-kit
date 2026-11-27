import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hiroshimaMiyajimaJoinDayTour, hiroshimaPeaceHalfDayTour, hiroshimaMiyajimaFerryDayTour } from "../../../lib/klook-links";
import { jrHiroshimaYamaguchiAreaPass } from "../../../lib/klook-links-a35";
import { JRWEST_PASS_BASE, jrWestBuyRows, jrWestRuleRows } from "../../../lib/jrwest-pass-facts";

// Task jtk-20261128-A35 (day 2). Every figure is from JR West's own page for the
// pass, read by node fetch on 28 Nov 2026: JRWEST_PASS_BASE + "hiroshima_yamaguchi/"
// (price, valid trains, the trains it cannot be used on). The buy/rule rows are the
// blocks worded the same on every JR-WEST RAIL PASS page (lib/jrwest-pass-facts.ts),
// re-checked on this page the same day.
const ROUTE = "/guides/transport/hiroshima-yamaguchi-area-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = `${JRWEST_PASS_BASE}hiroshima_yamaguchi/`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HiroshimaYamaguchiAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Hiroshima-Yamaguchi Area Pass"
      title="Hiroshima-Yamaguchi Area Pass 2026: Price, Map & How to Buy"
      description="JR West's Hiroshima-Yamaguchi Area Pass is ¥15,000 for 5 days (child ¥7,500): Sanyo Shinkansen Mihara–Hakata, local JR lines and the Miyajima ferry."
      h1={<>Hiroshima-Yamaguchi Area Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Five days of JR West between Hiroshima, Miyajima, Yamaguchi and Hakata. What the pass covers, where it stops, and how to buy it before you fly."
      badges={[`Checked ${CHECKED}`, "¥15,000 · 5 days", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Hiroshima-Yamaguchi Area Pass costs <strong>¥15,000 for adults and ¥7,500 for children (6–11)</strong>{" "}
            for <strong>5 consecutive days</strong>. It covers reserved seats on the Sanyo Shinkansen between{" "}
            <strong>Mihara and Hakata</strong>, reserved seats on limited expresses in the area, JR West local and
            rapid trains, and the JR West Miyajima ferry. It does not cover the Sanyo Shinkansen east of Mihara
            (towards Shin-Osaka), the Tokaido Shinkansen or the Kyushu Shinkansen.
          </p>
          <p className={styles.bodyText}>
            Buy an exchange order from an agency such as Klook and swap it at a JR West station with your passport,
            or reserve it on JR-WEST ONLINE TRAIN RESERVATION from one month ahead. Foreign passport holders entering
            Japan as Temporary Visitors only. JR West&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrHiroshimaYamaguchiAreaPass.url, label: "Check the Hiroshima-Yamaguchi Area Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥15,000 / ¥7,500" },
        { label: "Validity", value: "5 consecutive days" },
        { label: "Shinkansen", value: "Sanyo, Mihara ⇔ Hakata (reserved seats)" },
        { label: "Also covered", value: "JR West Miyajima ferry" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the cheapest JR West pass for Hiroshima, Miyajima and Yamaguchi, and the one that
          reaches Hakata by shinkansen. It does not get you to Hiroshima from Osaka, Kyoto or Okayama — for that, the
          Kansai-Hiroshima or Okayama-Hiroshima-Yamaguchi passes start further east.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Hiroshima-Yamaguchi Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, five days. The child price applies to ages 6–11 on the day the exchange order is issued or
              the pass bought; each pass holder can take up to two children aged 1–5 free.
            </p>
          ),
          table: {
            head: ["Pass", "Adult (12+)", "Child (6–11)", "Days"],
            rows: [["Hiroshima-Yamaguchi Area Pass", "¥15,000", "¥7,500", "5 consecutive"]],
            note: (
              <>
                JR West, Hiroshima-Yamaguchi Area Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Hiroshima-Yamaguchi Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Reserved seats are free but must be booked before boarding; on a train with only reserved seats there is
              no non-reserved option.
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["Sanyo Shinkansen", "Yes", "Mihara ⇔ Hakata, reserved seats"],
              ["Limited expresses in the area", "Yes", "Reserved seats"],
              ["JR West local, rapid and special rapid trains", "Yes", "Inside the pass area"],
              ["JR West Miyajima Ferry", "Yes", "Miyajimaguchi ⇔ Miyajima"],
              ["Sanyo Shinkansen Mihara ⇔ Shin-Osaka", "No", "Buy a separate ticket"],
              ["Tokaido Shinkansen", "No", "Shin-Osaka ⇔ Tokyo"],
              ["Kyushu Shinkansen", "No", "Hakata ⇔ Kagoshima-Chuo"],
            ],
            note: <>JR West, Hiroshima-Yamaguchi Area Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Which pass",
          title: "Hiroshima-Yamaguchi vs the Okayama-Hiroshima-Yamaguchi and Kansai-Hiroshima passes",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The deciding question is where your trip enters the Hiroshima area.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Shinkansen section"],
            rows: [
              ["Hiroshima-Yamaguchi Area Pass", "¥15,000", "5", "Mihara ⇔ Hakata"],
              ["Okayama-Hiroshima-Yamaguchi Area Pass", "¥17,000", "5", "Okayama ⇔ Hakata"],
              ["Kansai-Hiroshima Area Pass", "¥17,000", "5", "Shin-Osaka ⇔ Hiroshima"],
            ],
            note: <>Each pass&apos;s own JR West page; the first two read on {CHECKED}, the Kansai-Hiroshima figure on 13 November 2026.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Hiroshima-Yamaguchi Area Pass?",
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
          ctas: [{ href: jrHiroshimaYamaguchiAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the Hiroshima-Yamaguchi Area Pass?",
          body: null,
          table: {
            head: ["Rule", "What JR West says"],
            rows: jrWestRuleRows,
            note: <>JR West, Hiroshima-Yamaguchi Area Pass page, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Hiroshima and Miyajima on the same pass",
        intro: "The pass covers the trains and the Miyajima ferry; these guided days fill the day once you are there.",
        tours: [hiroshimaMiyajimaJoinDayTour, hiroshimaPeaceHalfDayTour, hiroshimaMiyajimaFerryDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          Plan the days with our{" "}
          <Link href="/guides/attractions/hiroshima-2-day-itinerary" style={linkStyle}>Hiroshima 2 day itinerary</Link>, the{" "}
          <Link href="/guides/attractions/hiroshima-miyajima-day-trip" style={linkStyle}>Hiroshima and Miyajima day trip</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/hiroshima-peace-memorial-tours" style={linkStyle}>Peace Memorial tours guide</Link>. For the
          Hakata end, see the{" "}
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2 day itinerary</Link>. Getting to
          Hiroshima from Tokyo or Osaka first? Compare{" "}
          <Link href="/guides/transport/tokyo-to-hiroshima-shinkansen" style={linkStyle}>Tokyo to Hiroshima by shinkansen</Link>{" "}
          and the{" "}
          <Link href="/guides/transport/okayama-hiroshima-yamaguchi-area-pass" style={linkStyle}>Okayama-Hiroshima-Yamaguchi Area Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Hiroshima-Yamaguchi Area Pass?",
          a: `¥15,000 for adults and ¥7,500 for children aged 6 to 11, for 5 consecutive days. JR West's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the Hiroshima-Yamaguchi Area Pass cover Osaka to Hiroshima?",
          a: "No. Its shinkansen section is Mihara to Hakata only. The Sanyo Shinkansen between Mihara and Shin-Osaka is listed among the trains it cannot be used on.",
        },
        {
          q: "Does the pass go to Hakata (Fukuoka)?",
          a: "Yes, on reserved seats of the Sanyo Shinkansen as far as Hakata. The Kyushu Shinkansen south of Hakata is not covered.",
        },
        {
          q: "Is the Miyajima ferry included?",
          a: "Yes, the JR West Miyajima Ferry between Miyajimaguchi and Miyajima is covered.",
        },
        {
          q: "Who can buy the Hiroshima-Yamaguchi Area Pass?",
          a: "Holders of a foreign passport entering Japan as a Temporary Visitor. Japanese nationals cannot use it, including those with permanent residence abroad.",
        },
      ]}
      related={[
        { href: "/guides/transport/okayama-hiroshima-yamaguchi-area-pass", title: "Okayama-Hiroshima-Yamaguchi Area Pass 2026: Price & Map" },
        { href: "/guides/transport/kansai-hiroshima-area-pass", title: "JR Kansai-Hiroshima Area Pass" },
        { href: "/guides/attractions/hiroshima-2-day-itinerary", title: "Hiroshima 2 Day Itinerary" },
        { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "Hiroshima and Miyajima Day Trip" },
      ]}
      banner={{
        title: "Hiroshima to Hakata for five days",
        desc: "Book the exchange order before you fly, then exchange it at a JR West station with your passport.",
        label: "View the Hiroshima-Yamaguchi Area Pass →",
      }}
    />
  );
}
