import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { jrKansaiHokurikuAreaPass } from "../../../lib/klook-links-a35";
import { kanazawaKenrokuenHigashiChayaDayTour, shirakawagoKanazawaDayTour, amanohashidateIneFullDayTour } from "../../../lib/klook-links";
import { JRWEST_CHECKED_ISO, JRWEST_PASS_BASE, jrWestBuyRows, jrWestRuleRows } from "../../../lib/jrwest-pass-facts";

// Task jtk-20261127-A35. Every figure is from JR West's own page for the pass,
// read by node fetch on 27 Nov 2026: JRWEST_PASS_BASE + "kansai_hokuriku/" (price,
// valid and excluded trains, the third-sector rules, the three "Have Fun" sets).
const ROUTE = "/guides/transport/kansai-hokuriku-area-pass";
const CHECKED = checkedLabel(JRWEST_CHECKED_ISO);
const OFFICIAL = `${JRWEST_PASS_BASE}kansai_hokuriku/`;

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function KansaiHokurikuAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Kansai-Hokuriku Area Pass"
      title="Kansai-Hokuriku Area Pass 2026: Price, Coverage & How to Buy"
      description="JR West's Kansai-Hokuriku Area Pass is ¥19,000 for 7 days (child ¥9,500): Thunderbird, Hokuriku Shinkansen from Tsuruga, HARUKA. Coverage and how to buy."
      h1={<>Kansai-Hokuriku Area Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Seven days of JR West between Kansai Airport, Kyoto, Osaka, Fukui, Kanazawa and Toyama — the pass for an Osaka-side trip to Kanazawa."
      badges={[`Checked ${CHECKED}`, "¥19,000 · 7 days", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Kansai-Hokuriku Area Pass costs <strong>¥19,000 for adults and ¥9,500 for children (6–11)</strong> for{" "}
            <strong>7 consecutive days</strong>. It covers reserved seats on the Hokuriku Shinkansen between Tsuruga
            and Joetsu-Myoko, on the Sanyo Shinkansen between Shin-Osaka and Okayama, and on limited expresses such
            as the THUNDERBIRD, HARUKA and KONOTORI, plus JR West local lines and West Japan JR Bus local routes. It
            does not cover the Hokuriku Shinkansen east of Joetsu-Myoko to Tokyo, the Tokaido Shinkansen, or the
            Sanyo Shinkansen west of Okayama.
          </p>
          <p className={styles.bodyText}>
            Buy an exchange order from an agency such as Klook and exchange it at a JR West station with your
            passport, or reserve on JR-WEST ONLINE TRAIN RESERVATION from one month ahead. Foreign passport holders
            entering as Temporary Visitors only. JR West&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: jrKansaiHokurikuAreaPass.url, label: "Check the Kansai-Hokuriku Area Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥19,000 / ¥9,500" },
        { label: "Validity", value: "7 consecutive days" },
        { label: "Kansai ⇔ Kanazawa", value: "THUNDERBIRD to Tsuruga, then Hokuriku Shinkansen" },
        { label: "Not covered", value: "Tokyo side of the Hokuriku Shinkansen, Tokaido Shinkansen" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the pass for a trip that flies into Kansai and goes up to Kanazawa or Toyama
          and back. If you arrive in Tokyo and leave from Osaka, the Hokuriku Arch Pass covers that line instead;
          if Kanazawa is a side trip from Nagoya with Takayama and Shirakawa-go, look at the Takayama-Hokuriku pass.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Kansai-Hokuriku Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Seven days, one price. JR West also listed three bundles with prefecture sightseeing passes on the day
              checked.
            </p>
          ),
          table: {
            head: ["Product", "Adult (12+)", "Child (6–11)", "Days"],
            rows: [
              ["Kansai-Hokuriku Area Pass", "¥19,000", "¥9,500", "7 consecutive"],
              ["Pass + Have Fun in Fukui Pass", "¥19,800", "Not listed", "7 consecutive"],
              ["Pass + Have Fun in Ishikawa Pass (3 facilities)", "¥21,200", "Not listed", "7 consecutive"],
              ["Pass + Have Fun in Toyama Pass", "¥19,800", "Not listed", "7 consecutive"],
            ],
            note: (
              <>
                JR West, Kansai-Hokuriku Area Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Kansai-Hokuriku Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Since the Hokuriku Shinkansen reached Tsuruga, the Osaka–Kanazawa run is the THUNDERBIRD to Tsuruga and
              the shinkansen on from there; both legs are on the pass with reserved seats.
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["Hokuriku Shinkansen", "Yes", "Tsuruga ⇔ Joetsu-Myoko, reserved seats"],
              ["Sanyo Shinkansen", "Partly", "Shin-Osaka ⇔ Okayama, reserved seats"],
              ["Limited expresses", "Yes", "Reserved seats on the HARUKA, THUNDERBIRD, KONOTORI and others"],
              ["SUPER HAKUTO / SUPER INABA", "Partly", "A separate fare is needed for Kamigori ⇔ Tottori"],
              ["JR West local, rapid and special rapid trains", "Yes", "Paid “A Seat” cars are charged separately"],
              ["Third-sector links in Hokuriku", "Through trips only", "IR Ishikawa (Kanazawa–Tsubata), Ainokaze Toyama (Toyama–Takaoka), Hapi-Line Fukui (Echizen-Hanando–Fukui)"],
              ["West Japan JR Bus", "Local routes only", "Not expressway buses"],
              ["Hokuriku Shinkansen to Tokyo", "No", "Joetsu-Myoko ⇔ Tokyo"],
              ["Tokaido Shinkansen", "No", "Shin-Osaka ⇔ Tokyo"],
              ["Sanyo Shinkansen west of Okayama", "No", "Okayama ⇔ Hakata"],
            ],
            note: <>JR West, Kansai-Hokuriku Area Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Which pass",
          title: "Kansai-Hokuriku Area Pass vs Hokuriku Arch Pass and the other Kanazawa passes",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Four passes reach Kanazawa. They differ in where the trip starts.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Days", "Best for"],
            rows: [
              ["Kansai-Hokuriku Area Pass", "¥19,000", "7", "Kansai ⇔ Kanazawa / Toyama and back"],
              ["Hokuriku Area Pass", "¥7,000", "4", "Days inside Fukui, Ishikawa and Toyama only (non-reserved seats)"],
              ["Takayama-Hokuriku Area Tourist Pass", "¥19,800", "5", "Osaka or Nagoya via Takayama and Shirakawa-go"],
              ["Hokuriku Arch Pass", "¥35,000", "7", "Tokyo ⇔ Kanazawa ⇔ Osaka in one line"],
            ],
            note: (
              <>
                JR West pass pages and JR Central&apos;s touristpass.jp, checked {CHECKED}; the Hokuriku Arch Pass
                figure is from our Hokuriku Arch Pass guide.
              </>
            ),
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Kansai-Hokuriku Area Pass?",
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
          ctas: [{ href: jrKansaiHokurikuAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the Kansai-Hokuriku Area Pass?",
          body: null,
          table: {
            head: ["Rule", "What JR West says"],
            rows: jrWestRuleRows,
            note: <>JR West, Kansai-Hokuriku Area Pass page, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Kanazawa days to book with the pass",
        intro: "Guided days that start in Kanazawa, plus one on the Kyoto side that the pass also reaches.",
        tours: [kanazawaKenrokuenHigashiChayaDayTour, shirakawagoKanazawaDayTour, amanohashidateIneFullDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          Our{" "}
          <Link href="/guides/attractions/kanazawa-2-day-itinerary" style={linkStyle}>Kanazawa 2 day itinerary</Link>{" "}
          plans the days at the far end, and the{" "}
          <Link href="/guides/attractions/takayama-shirakawago-tour" style={linkStyle}>Takayama and Shirakawa-go tour guide</Link>{" "}
          covers the side trip into the mountains. On the Kansai side, the{" "}
          <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>Kansai 5 day itinerary</Link>{" "}
          shows how a week splits between Kyoto, Osaka and a longer trip. Coming from Tokyo instead? Read{" "}
          <Link href="/guides/transport/tokyo-to-kanazawa" style={linkStyle}>Tokyo to Kanazawa</Link>{" "}
          and the{" "}
          <Link href="/guides/transport/hokuriku-arch-pass" style={linkStyle}>Hokuriku Arch Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Kansai-Hokuriku Area Pass?",
          a: `¥19,000 for adults and ¥9,500 for children aged 6 to 11, for 7 consecutive days. JR West's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the Kansai-Hokuriku Area Pass cover the Thunderbird?",
          a: "Yes. Reserved seats on the THUNDERBIRD limited express are listed among the covered trains, and the Hokuriku Shinkansen between Tsuruga and Joetsu-Myoko is covered too.",
        },
        {
          q: "Can I go from Kanazawa to Tokyo on the Kansai-Hokuriku Area Pass?",
          a: "No. The Hokuriku Shinkansen between Joetsu-Myoko and Tokyo is excluded. For a Tokyo–Kanazawa–Osaka line, JR West's Hokuriku Arch Pass is the pass that covers it.",
        },
        {
          q: "Is the Kansai-Hokuriku Area Pass valid on the Tokaido Shinkansen between Kyoto and Shin-Osaka?",
          a: "No. The Tokaido Shinkansen is excluded. Between Kyoto and Osaka use the JR conventional lines, which the pass covers.",
        },
        {
          q: "Does the pass cover Shirakawa-go?",
          a: "No bus to Shirakawa-go is listed on the pass page; it covers West Japan JR Bus local routes only. The Takayama-Hokuriku Area Tourist Pass is the one that includes the Shirakawa-go buses.",
        },
      ]}
      related={[
        { href: "/guides/transport/hokuriku-area-pass", title: "JR Hokuriku Area Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/takayama-hokuriku-area-pass", title: "Takayama-Hokuriku Area Pass 2026: Price & Shirakawa-go Buses" },
        { href: "/guides/transport/hokuriku-arch-pass", title: "JR Hokuriku Arch Pass 2026" },
        { href: "/guides/transport/jr-west-all-area-pass", title: "JR West All Area Pass 2026: Price, Coverage & How to Buy" },
      ]}
      banner={{
        title: "Kansai to Kanazawa, seven days",
        desc: "Book the exchange order before you fly, then exchange it at a JR West station with your passport.",
        label: "View the Kansai-Hokuriku Area Pass →",
      }}
    />
  );
}
