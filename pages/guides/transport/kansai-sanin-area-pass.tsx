import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrKansaiSaninAreaPass } from "../../../lib/klook-links-a35";
import { kinosakiCrabLunchDayTour, kinosakiHotels, himejiCastleKokoenGuidedTour } from "../../../lib/klook-links";
import { JRWEST_CHECKED_ISO, JRWEST_PASS_BASE, jrWestBuyRows, jrWestRuleRows } from "../../../lib/jrwest-pass-facts";

// Task jtk-20261127-A35. Every figure is from JR West's own page for the pass,
// read by node fetch on 27 Nov 2026: JRWEST_PASS_BASE + "kansai_sanin/" (price,
// valid trains, exclusions, the "Have Fun in Shimane Pass" set at ¥18,800).
const ROUTE = "/guides/transport/kansai-sanin-area-pass";
const CHECKED = checkedLabel(JRWEST_CHECKED_ISO);
const OFFICIAL = `${JRWEST_PASS_BASE}kansai_sanin/`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KansaiSaninAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Kansai-San'in Area Pass"
      title="Kansai-San'in Area Pass 2026: Price, Coverage & How to Buy"
      description="JR West's Kansai-San'in Area Pass is ¥18,000 for 7 days (child ¥9,000): Kansai to Tottori, Matsue and Hagi on the SUPER HAKUTO, YAKUMO and KONOTORI."
      h1={<>Kansai-San&apos;in Area Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Seven days of JR West from Kansai Airport, Kyoto and Osaka to Okayama and the San'in coast — Tottori, Shimane and Hagi — and what the pass leaves out."
      badges={[`Checked ${CHECKED}`, "¥18,000 · 7 days", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Kansai-San&apos;in Area Pass costs <strong>¥18,000 for adults and ¥9,000 for children (6–11)</strong>{" "}
            for <strong>7 consecutive days</strong>. It covers reserved seats on the Sanyo Shinkansen between
            Shin-Osaka and Okayama, reserved seats on limited expresses such as the HARUKA, YAKUMO, KONOTORI and SUPER
            HAKUTO, JR West local lines and West Japan JR Bus local routes, for trips from Kansai to San&apos;in
            (Tottori, Shimane, Hagi) and Okayama. The Tokaido Shinkansen and the Sanyo Shinkansen west of Okayama are
            not covered.
          </p>
          <p className={styles.bodyText}>
            Buy an exchange order from an agency such as Klook and exchange it at a JR West station with your
            passport, or reserve on JR-WEST ONLINE TRAIN RESERVATION from one month ahead. Foreign passport holders
            entering as Temporary Visitors only. JR West&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrKansaiSaninAreaPass.url, label: "Check the Kansai-San'in Area Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥18,000 / ¥9,000" },
        { label: "Validity", value: "7 consecutive days" },
        { label: "To San'in by", value: "SUPER HAKUTO, YAKUMO, KONOTORI (reserved)" },
        { label: "Not covered", value: "Tokaido Shinkansen, Sanyo west of Okayama" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the pass for a week that adds Tottori or Matsue to Kyoto and Osaka. If
          Hiroshima is in the same week, the Sanyo-San&apos;in Area Pass (¥23,000) covers both coasts; if the trip
          goes no further than Kinosaki Onsen or Okayama in five days, the Kansai WIDE Area Pass (¥12,000) is the
          smaller one.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Kansai-San'in Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Seven days, one price. JR West also listed the pass bundled with the &ldquo;Have Fun in Shimane
              Pass&rdquo; on the day checked.
            </p>
          ),
          table: {
            head: ["Product", "Adult (12+)", "Child (6–11)", "Days"],
            rows: [
              ["Kansai-San'in Area Pass", "¥18,000", "¥9,000", "7 consecutive"],
              ["Pass + Have Fun in Shimane Pass", "¥18,800", "Not listed", "7 consecutive"],
            ],
            note: (
              <>
                JR West, Kansai-San&apos;in Area Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Kansai-San'in Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The San&apos;in coast is reached by limited express, not shinkansen. On a reserved-only train, reserve the
              seat (free) before boarding.
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["Sanyo Shinkansen", "Partly", "Shin-Osaka ⇔ Okayama, reserved seats"],
              ["Limited expresses", "Yes", "Reserved seats on the HARUKA, YAKUMO, KONOTORI, SUPER HAKUTO and others"],
              ["JR West local, rapid and special rapid trains", "Yes", "Paid “A Seat” cars are charged separately"],
              ["West Japan JR Bus", "Local routes only", "Not expressway buses"],
              ["Tokaido Shinkansen", "No", "Shin-Osaka ⇔ Tokyo"],
              ["Sanyo Shinkansen west of Okayama", "No", "Okayama ⇔ Hakata"],
              ["Kyushu Shinkansen", "No", "Hakata ⇔ Kagoshima-Chuo"],
            ],
            note: <>JR West, Kansai-San&apos;in Area Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Which pass",
          title: "Kansai-San'in Area Pass vs Kansai WIDE and Sanyo-San'in",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Three JR West passes reach the San&apos;in side. They differ in length and how far west they go.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Reaches"],
            rows: [
              ["Kansai WIDE Area Pass", "¥12,000", "5", "Kansai, Okayama, Takamatsu, Kinosaki Onsen, Tottori, Shirahama"],
              ["Kansai-San'in Area Pass", "¥18,000", "7", "Kansai, Okayama, Tottori, Shimane, Hagi"],
              ["Sanyo-San'in Area Pass", "¥23,000", "7", "All of the above plus Hiroshima, Yamaguchi and Hakata"],
            ],
            note: <>Each pass&apos;s own JR West page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Kansai-San'in Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              From Klook you receive an exchange order; the pass is printed when you exchange it in Japan with your
              passport.
            </p>
          ),
          table: {
            head: ["Where", "What you get", "Then"],
            rows: jrWestBuyRows,
            note: <>JR West, pass page &ldquo;Purchasing a Rail Pass&rdquo;, checked {CHECKED}.</>,
          },
          ctas: [{ href: jrKansaiSaninAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the Kansai-San'in Area Pass?",
          body: null,
          table: {
            head: ["Rule", "What JR West says"],
            rows: jrWestRuleRows,
            note: <>JR West, Kansai-San&apos;in Area Pass page, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Stops on the way to San'in",
        intro: "Two stops on the way out of Kansai — Kinosaki Onsen and Himeji — with a guided day or a night's stay to book.",
        tours: [kinosakiCrabLunchDayTour, kinosakiHotels, himejiCastleKokoenGuidedTour],
      }}
      links={
        <p className={styles.bodyText}>
          Our{" "}
          <Link href="/guides/attractions/kinosaki-onsen-day-trip" style={linkStyle}>Kinosaki Onsen day trip</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/himeji-castle-day-trip" style={linkStyle}>Himeji Castle day trip</Link>{" "}
          guides cover two stops this pass reaches. For the Kyoto and Osaka days around them, see the{" "}
          <Link href="/guides/attractions/osaka-kyoto-3-day-itinerary" style={linkStyle}>Osaka and Kyoto 3 day itinerary</Link>, and for
          a shorter, cheaper pass the{" "}
          <Link href="/guides/transport/kansai-wide-area-pass" style={linkStyle}>Kansai WIDE Area Pass</Link>. Adding Hiroshima? Read the{" "}
          <Link href="/guides/transport/sanyo-sanin-area-pass" style={linkStyle}>Sanyo-San&apos;in Area Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Kansai-San'in Area Pass?",
          a: `¥18,000 for adults and ¥9,000 for children aged 6 to 11, for 7 consecutive days. JR West's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the Kansai-San'in Area Pass cover the YAKUMO to Matsue?",
          a: "Yes. Reserved seats on the YAKUMO limited express are listed among the covered trains, along with the HARUKA, KONOTORI and SUPER HAKUTO.",
        },
        {
          q: "Does the Kansai-San'in Area Pass cover Hiroshima?",
          a: "No. On the Sanyo Shinkansen it covers only Shin-Osaka to Okayama. The Sanyo-San'in Area Pass is the JR West pass that adds Hiroshima.",
        },
        {
          q: "Can I use the pass on the Tokaido Shinkansen between Kyoto and Shin-Osaka?",
          a: "No. The Tokaido Shinkansen is excluded; use the JR conventional lines, which the pass covers.",
        },
        {
          q: "Who can buy the Kansai-San'in Area Pass?",
          a: "Holders of a foreign passport entering Japan as a Temporary Visitor. Japanese nationals cannot use it.",
        },
      ]}
      related={[
        { href: "/guides/transport/kansai-wide-area-pass", title: "Kansai WIDE Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/sanyo-sanin-area-pass", title: "Sanyo-San'in Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/jr-west-all-area-pass", title: "JR West All Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/attractions/kinosaki-onsen-day-trip", title: "Kinosaki Onsen Day Trip" },
      ]}
      banner={{
        title: "Kansai to the San'in coast",
        desc: "Book the exchange order before you fly, then exchange it at a JR West station with your passport.",
        label: "View the Kansai-San'in Area Pass →",
      }}
    />
  );
}
