import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrKansaiWideAreaPass, amanohashidateIneFullDayTour, himejiCastleKokoenGuidedTour, kobeBeefHarbourKitanoDayTour } from "../../../lib/klook-links";
import { JRWEST_CHECKED_ISO, JRWEST_PASS_BASE, jrWestBuyRows, jrWestRuleRows } from "../../../lib/jrwest-pass-facts";

// Task jtk-20261127-A35. Every figure is from JR West's own page for the pass,
// read by node fetch on 27 Nov 2026: JRWEST_PASS_BASE + "kansai_wide/" (price,
// valid trains incl. JR Shikoku conventional lines, exclusions). The WEST QR
// Kansai Area Pass prices are the ones our kansai-area-pass guide re-read on the
// same day (task jtk-20261127-R18).
const ROUTE = "/guides/transport/kansai-wide-area-pass";
const CHECKED = checkedLabel(JRWEST_CHECKED_ISO);
const OFFICIAL = `${JRWEST_PASS_BASE}kansai_wide/`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KansaiWideAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Kansai WIDE Area Pass"
      title="Kansai WIDE Area Pass 2026: Price, Coverage & How to Buy"
      description="The JR Kansai WIDE Area Pass is ¥12,000 for 5 days (child ¥6,000): shinkansen to Okayama, HARUKA, KONOTORI to Kinosaki, Takamatsu. Coverage and how to buy."
      h1={<>Kansai WIDE Area Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Five days of JR West around Kansai and out to Okayama, Takamatsu, Kinosaki Onsen, Amanohashidate, Tottori and Shirahama — what it adds over the Kansai Area Pass."
      badges={[`Checked ${CHECKED}`, "¥12,000 · 5 days", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Kansai WIDE Area Pass costs <strong>¥12,000 for adults and ¥6,000 for children (6–11)</strong> for{" "}
            <strong>5 consecutive days</strong>. It covers reserved seats on the Sanyo Shinkansen between Shin-Osaka
            and Okayama, reserved seats on limited expresses such as the HARUKA, KUROSHIO, KONOTORI and SUPER HAKUTO,
            JR West and JR Shikoku local and rapid trains, and West Japan JR Bus local routes. JR West sells it for
            day trips from Kansai to Okayama, Takamatsu, Kinosaki Onsen, Amanohashidate, Tottori and Shirahama. The
            Tokaido Shinkansen and the Sanyo Shinkansen west of Okayama are not covered.
          </p>
          <p className={styles.bodyText}>
            Buy an exchange order from an agency such as Klook and exchange it at a JR West station with your
            passport, or reserve on JR-WEST ONLINE TRAIN RESERVATION from one month ahead. Foreign passport holders
            entering as Temporary Visitors only. JR West&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrKansaiWideAreaPass.url, label: "Check the Kansai WIDE Area Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥12,000 / ¥6,000" },
        { label: "Validity", value: "5 consecutive days" },
        { label: "Shinkansen", value: "Sanyo, Shin-Osaka ⇔ Okayama (reserved)" },
        { label: "Not covered", value: "Tokaido Shinkansen, Sanyo west of Okayama" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> buy WIDE when the five days include at least one long run out of the Kansai
          core — the shinkansen to Okayama or Himeji, the KONOTORI to Kinosaki Onsen, or the KUROSHIO to
          Shirahama. For Kyoto, Osaka, Nara and Kobe alone, the WEST QR Kansai Area Pass (¥2,700 for one day to
          ¥6,700 for four) is the smaller pass.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Kansai WIDE Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, five days. Ages are set on the day the exchange order is issued or the pass is bought.
            </p>
          ),
          table: {
            head: ["Pass", "Adult (12+)", "Child (6–11)", "Days"],
            rows: [["Kansai WIDE Area Pass", "¥12,000", "¥6,000", "5 consecutive"]],
            note: (
              <>
                JR West, Kansai WIDE Area Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Kansai WIDE Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              WIDE is the Kansai pass with the long-distance trains added. On a reserved-only train, reserve the seat
              (free) before boarding.
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["Sanyo Shinkansen", "Partly", "Shin-Osaka ⇔ Okayama, reserved seats"],
              ["Limited expresses", "Yes", "Reserved seats on the HARUKA, KUROSHIO, KONOTORI, SUPER HAKUTO and others"],
              ["JR West and JR Shikoku local and rapid trains", "Yes", "Paid “A Seat” cars are charged separately"],
              ["West Japan JR Bus", "Local routes only", "Not expressway buses"],
              ["Tokaido Shinkansen", "No", "Shin-Osaka ⇔ Tokyo"],
              ["Sanyo Shinkansen west of Okayama", "No", "Okayama ⇔ Hakata"],
              ["Kyushu Shinkansen", "No", "Hakata ⇔ Kagoshima-Chuo"],
            ],
            note: <>JR West, Kansai WIDE Area Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Which pass",
          title: "Kansai WIDE Area Pass vs Kansai Area Pass",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The Kansai Area Pass (now the WEST QR version) has no shinkansen and no limited express except the
              HARUKA. WIDE costs more because it adds the trains that leave the Kansai core.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Long-distance trains"],
            rows: [
              ["Kansai WIDE Area Pass", "¥12,000", "5", "Shinkansen to Okayama; KONOTORI, KUROSHIO, SUPER HAKUTO, HARUKA"],
              ["WEST QR Kansai Area Pass", "¥2,700 – ¥6,700", "1 – 4", "HARUKA only; no shinkansen"],
              ["Kansai-San'in Area Pass", "¥18,000", "7", "Adds the YAKUMO to Matsue and the San'in coast"],
            ],
            note: (
              <>
                JR West pass pages, checked {CHECKED}. WEST QR prices as re-read in our Kansai Area Pass guide on the
                same day.
              </>
            ),
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Kansai WIDE Area Pass?",
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
          ctas: [{ href: jrKansaiWideAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the Kansai WIDE Area Pass?",
          body: null,
          table: {
            head: ["Rule", "What JR West says"],
            rows: jrWestRuleRows,
            note: <>JR West, Kansai WIDE Area Pass page, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Day trips the pass gets you to",
        intro: "Guided days at three of the places WIDE reaches from Osaka and Kyoto.",
        tours: [amanohashidateIneFullDayTour, himejiCastleKokoenGuidedTour, kobeBeefHarbourKitanoDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          The day trips WIDE is built for each have a guide:{" "}
          <Link href="/guides/attractions/kinosaki-onsen-day-trip" style={linkStyle}>Kinosaki Onsen day trip</Link>,{" "}
          <Link href="/guides/attractions/amanohashidate-ine-day-trip" style={linkStyle}>Amanohashidate and Ine day trip</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/himeji-castle-day-trip" style={linkStyle}>Himeji Castle day trip</Link>. For the
          shorter pass, read our{" "}
          <Link href="/guides/attractions/kansai-area-pass" style={linkStyle}>Kansai Area Pass guide</Link>, and the{" "}
          <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>Kansai 5 day itinerary</Link>{" "}
          for a five-day plan the pass can carry.
        </p>
      }
      faq={[
        {
          q: "How much is the Kansai WIDE Area Pass?",
          a: `¥12,000 for adults and ¥6,000 for children aged 6 to 11, for 5 consecutive days. JR West's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the Kansai WIDE Area Pass cover the shinkansen?",
          a: "Only the Sanyo Shinkansen between Shin-Osaka and Okayama, in reserved seats. The Tokaido Shinkansen (Shin-Osaka to Tokyo, including Kyoto) and the Sanyo Shinkansen west of Okayama are not covered.",
        },
        {
          q: "Can I use the Kansai WIDE Area Pass to Hiroshima?",
          a: "No. The pass stops at Okayama on the Sanyo Shinkansen. For Hiroshima, JR West sells the Kansai-Hiroshima Area Pass and the Sanyo-San'in Area Pass.",
        },
        {
          q: "Does the Kansai WIDE Area Pass include the HARUKA from Kansai Airport?",
          a: "Yes. Reserved seats on the HARUKA are listed among the covered limited expresses.",
        },
        {
          q: "Can I use the Kansai WIDE Area Pass in Shikoku?",
          a: "On JR Shikoku conventional lines inside the pass area, yes: JR West lists JR Shikoku local and rapid trains as covered, and names Takamatsu as a destination.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kansai-area-pass", title: "JR Kansai Area Pass" },
        { href: "/guides/transport/kansai-sanin-area-pass", title: "Kansai-San'in Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/kansai-hiroshima-area-pass", title: "JR Kansai-Hiroshima Area Pass" },
        { href: "/guides/attractions/kinosaki-onsen-day-trip", title: "Kinosaki Onsen Day Trip" },
      ]}
      banner={{
        title: "Five days beyond the Kansai core",
        desc: "Book the exchange order before you fly, then exchange it at a JR West station with your passport.",
        label: "View the Kansai WIDE Area Pass →",
      }}
    />
  );
}
