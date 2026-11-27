import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { hiroshimaMiyajimaJoinDayTour, hiroshimaPeaceHalfDayTour, hiroshimaPeaceMiyajimaBusTour } from "../../../lib/klook-links";
import { jrOkayamaHiroshimaYamaguchiAreaPass } from "../../../lib/klook-links-a35";
import { JRWEST_PASS_BASE, jrWestBuyRows, jrWestRuleRows } from "../../../lib/jrwest-pass-facts";

// Task jtk-20261128-A35 (day 2). Every figure is from JR West's own page for the
// pass, read by node fetch on 28 Nov 2026: JRWEST_PASS_BASE +
// "okayama_hiroshima_yamaguchi/" (price, valid trains, Chugoku JR buses, EKIRIN
// cycles, the trains it cannot be used on). The buy/rule rows are the blocks worded
// the same on every JR-WEST RAIL PASS page (lib/jrwest-pass-facts.ts), re-checked on
// this page the same day. Comparison rows: hiroshima_yamaguchi/ read 28 Nov, the
// others on 27 Nov (day 1).
const ROUTE = "/guides/transport/okayama-hiroshima-yamaguchi-area-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = `${JRWEST_PASS_BASE}okayama_hiroshima_yamaguchi/`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function OkayamaHiroshimaYamaguchiAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Okayama-Hiroshima-Yamaguchi Pass"
      title="Okayama-Hiroshima-Yamaguchi Area Pass 2026: Price & Map"
      description="JR West's Okayama-Hiroshima-Yamaguchi Area Pass is ¥17,000 for 5 days: Sanyo Shinkansen Okayama–Hakata, the Miyajima ferry and JR buses. How to buy."
      h1={<>Okayama-Hiroshima-Yamaguchi Area Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Five days of JR West from Okayama to Hakata — Kurashiki, Hiroshima, Miyajima and Yamaguchi on one pass. What it covers, what it doesn't, and how to buy it before you fly."
      badges={[`Checked ${CHECKED}`, "¥17,000 · 5 days", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Okayama-Hiroshima-Yamaguchi Area Pass costs <strong>¥17,000 for adults and ¥8,500 for children
            (6–11)</strong> for <strong>5 consecutive days</strong>. It covers reserved seats on the Sanyo Shinkansen
            between <strong>Okayama and Hakata</strong>, reserved seats on limited expresses in the area, JR West
            local and rapid trains, the JR West Miyajima ferry, Chugoku JR route buses and EKIRIN rent-a-cycle shops.
            It does not cover the shinkansen between Shin-Osaka and Okayama, or JR Kyushu&apos;s conventional lines.
          </p>
          <p className={styles.bodyText}>
            Buy an exchange order from an agency such as Klook and swap it at a JR West station with your passport,
            or reserve it on JR-WEST ONLINE TRAIN RESERVATION from one month ahead. Foreign passport holders entering
            Japan as Temporary Visitors only. JR West&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrOkayamaHiroshimaYamaguchiAreaPass.url, label: "Check the Okayama-Hiroshima-Yamaguchi Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥17,000 / ¥8,500" },
        { label: "Validity", value: "5 consecutive days" },
        { label: "Shinkansen", value: "Sanyo, Okayama ⇔ Hakata (reserved seats)" },
        { label: "Also covered", value: "Miyajima ferry, Chugoku JR buses, EKIRIN cycles" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the pass for five days that start at Okayama or Kurashiki and run west through
          Hiroshima and Miyajima to Yamaguchi or Hakata. If your trip never goes east of Mihara, the Hiroshima-Yamaguchi
          Area Pass is ¥2,000 cheaper; if it starts in Osaka or Kyoto, the shinkansen to Okayama is not on this pass.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Okayama-Hiroshima-Yamaguchi Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, five days. The child price applies to ages 6–11 on the day the exchange order is issued or
              the pass bought; each pass holder can take up to two children aged 1–5 free.
            </p>
          ),
          table: {
            head: ["Pass", "Adult (12+)", "Child (6–11)", "Days"],
            rows: [["Okayama-Hiroshima-Yamaguchi Area Pass", "¥17,000", "¥8,500", "5 consecutive"]],
            note: (
              <>
                JR West, Okayama-Hiroshima-Yamaguchi Area Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Okayama-Hiroshima-Yamaguchi Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Reserved seats are free but must be booked before boarding; on a train with only reserved seats there is
              no non-reserved option.
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["Sanyo Shinkansen", "Yes", "Okayama ⇔ Hakata, reserved seats"],
              ["Limited expresses in the area", "Yes", "Reserved seats"],
              ["JR West local, rapid and special rapid trains", "Yes", "Inside the pass area"],
              ["JR West Miyajima Ferry", "Yes", "Miyajimaguchi ⇔ Miyajima"],
              ["Chugoku JR route buses", "Yes", "Unlimited rides"],
              ["EKIRIN rent-a-cycle", "Yes", "At shops inside the pass area"],
              ["Sanyo Shinkansen Shin-Osaka ⇔ Okayama", "No", "Buy a separate ticket"],
              ["Conventional lines on Kyushu", "No", "The pass stops at Hakata on the shinkansen"],
            ],
            note: <>JR West, Okayama-Hiroshima-Yamaguchi Area Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Which pass",
          title: "Okayama-Hiroshima-Yamaguchi vs the Hiroshima-Yamaguchi and Kansai-Hiroshima passes",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The three JR West passes for the Hiroshima area differ in where the shinkansen section starts.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Shinkansen section"],
            rows: [
              ["Hiroshima-Yamaguchi Area Pass", "¥15,000", "5", "Mihara ⇔ Hakata"],
              ["Okayama-Hiroshima-Yamaguchi Area Pass", "¥17,000", "5", "Okayama ⇔ Hakata"],
              ["Kansai-Hiroshima Area Pass", "¥17,000", "5", "Shin-Osaka ⇔ Hiroshima"],
              ["Sanyo-San'in Area Pass", "¥23,000", "7", "Shin-Osaka ⇔ Hakata, plus the San'in coast"],
            ],
            note: <>Each pass&apos;s own JR West page; the first two read on {CHECKED}, the Kansai-Hiroshima figure on 13 November 2026, Sanyo-San&apos;in on 27 November 2026.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Okayama-Hiroshima-Yamaguchi Area Pass?",
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
          ctas: [{ href: jrOkayamaHiroshimaYamaguchiAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the Okayama-Hiroshima-Yamaguchi Area Pass?",
          body: null,
          table: {
            head: ["Rule", "What JR West says"],
            rows: jrWestRuleRows,
            note: <>JR West, Okayama-Hiroshima-Yamaguchi Area Pass page, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Hiroshima and Miyajima on the same pass",
        intro: "The pass gets you to Hiroshima and onto the Miyajima ferry; these guided days fill the day once you are there.",
        tours: [hiroshimaMiyajimaJoinDayTour, hiroshimaPeaceHalfDayTour, hiroshimaPeaceMiyajimaBusTour],
      }}
      links={
        <p className={styles.bodyText}>
          For the days themselves, see our{" "}
          <Link href="/guides/attractions/hiroshima-miyajima-day-trip" style={linkStyle}>Hiroshima and Miyajima day trip</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/hiroshima-2-day-itinerary" style={linkStyle}>Hiroshima 2 day itinerary</Link>. Coming from
          Osaka first? The fares for that leg are in{" "}
          <Link href="/guides/transport/osaka-to-hiroshima-shinkansen" style={linkStyle}>Osaka to Hiroshima by shinkansen</Link>, and
          the{" "}
          <Link href="/guides/transport/kansai-hiroshima-area-pass" style={linkStyle}>Kansai-Hiroshima Area Pass</Link>{" "}
          covers it. Without Okayama, the{" "}
          <Link href="/guides/transport/hiroshima-yamaguchi-area-pass" style={linkStyle}>Hiroshima-Yamaguchi Area Pass</Link>{" "}
          is the smaller pass; crossing to Shikoku, see the{" "}
          <Link href="/guides/transport/all-shikoku-rail-pass" style={linkStyle}>ALL SHIKOKU Rail Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Okayama-Hiroshima-Yamaguchi Area Pass?",
          a: `¥17,000 for adults and ¥8,500 for children aged 6 to 11, for 5 consecutive days. JR West's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the pass cover the shinkansen from Osaka?",
          a: "No. The Sanyo Shinkansen is covered only between Okayama and Hakata. Shin-Osaka to Okayama needs a separate ticket or a different pass.",
        },
        {
          q: "Does the Okayama-Hiroshima-Yamaguchi Area Pass include the Miyajima ferry?",
          a: "Yes, the JR West Miyajima Ferry between Miyajimaguchi and Miyajima is listed among the services the pass covers.",
        },
        {
          q: "Can I use the pass on buses?",
          a: "Yes, on Chugoku JR route buses. JR West's page also lists EKIRIN rent-a-cycle shops inside the pass area.",
        },
        {
          q: "Who can buy the Okayama-Hiroshima-Yamaguchi Area Pass?",
          a: "Holders of a foreign passport entering Japan as a Temporary Visitor. Japanese nationals cannot use it, including those with permanent residence abroad.",
        },
      ]}
      related={[
        { href: "/guides/transport/hiroshima-yamaguchi-area-pass", title: "Hiroshima-Yamaguchi Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/kansai-hiroshima-area-pass", title: "JR Kansai-Hiroshima Area Pass" },
        { href: "/guides/transport/sanyo-sanin-area-pass", title: "Sanyo-San'in Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/attractions/hiroshima-miyajima-day-trip", title: "Hiroshima and Miyajima Day Trip" },
      ]}
      banner={{
        title: "Okayama to Hakata in one pass",
        desc: "Book the exchange order before you fly, then exchange it at a JR West station with your passport.",
        label: "View the Okayama-Hiroshima-Yamaguchi Pass →",
      }}
    />
  );
}
