import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { iseShrineOkageGuidedTour, kumanoSanzanPilgrimageTour, kumanoKodoPrivateWalk } from "../../../lib/klook-links";
import { iseKumanoWakayamaAreaPass } from "../../../lib/klook-links-a35";

// Task jtk-20261128-A35 (day 2). Every figure is from JR Central's touristpass.jp,
// read by node fetch on 28 Nov 2026: touristpass.jp/en/ise_kumano/ (price, 5 days,
// up to six free reserved seats, the JR and Ise Railway sections, Wakayama Electric
// Railway, the Mie Kotsu and Kumano Gobo Nankai bus lines, the all-reserved Nanki
// period 25 Dec 2026 – 5 Jan 2027, booking routes). No Klook price is printed.
const ROUTE = "/guides/transport/ise-kumano-wakayama-area-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://touristpass.jp/en/ise_kumano/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function IseKumanoWakayamaAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Ise-Kumano-Wakayama Pass"
      title="Ise-Kumano-Wakayama Area Tourist Pass 2026: Price & Map"
      description="JR Central's Ise-Kumano-Wakayama Area Tourist Pass is ¥16,500 for 5 days: JR round the Kii Peninsula from Osaka or Nagoya, plus Ise and Kumano buses."
      h1={<>Ise-Kumano-Wakayama Area Tourist Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Five days round the Kii Peninsula — Ise Grand Shrine, Kumano Kodo, Nachi Falls and Wakayama — starting in Osaka or Nagoya. What the pass covers and how to buy it."
      badges={[`Checked ${CHECKED}`, "¥16,500 · 5 days", "Up to 6 free reserved seats"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Ise-Kumano-Wakayama Area Tourist Pass costs <strong>¥16,500 for adults and ¥8,250 for children
            (6–11)</strong> for <strong>5 consecutive days</strong>. It covers non-reserved seats on JR and Ise
            Railway limited express, express, rapid and local trains on the loop from Nagoya round the Kii Peninsula
            to Osaka and Kansai Airport, with <strong>reserved seats on JR limited expresses free up to six
            times</strong>. Buses to Ise Grand Shrine, Nachi Falls and Kumano Hongu Taisha are included.
          </p>
          <p className={styles.bodyText}>
            Book on JR-WEST ONLINE TRAIN RESERVATION from one month before (10:00 JST), buy an exchange order from a
            travel agent outside Japan such as Klook, or buy at a listed ticket office. JR Central&apos;s
            touristpass.jp, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: iseKumanoWakayamaAreaPass.url, label: "Check the Ise-Kumano-Wakayama pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥16,500 / ¥8,250" },
        { label: "Validity", value: "5 consecutive days" },
        { label: "Reserved seats", value: "JR limited expresses, free up to 6 times" },
        { label: "Buses", value: "Ise, Nachi Falls, Kumano Hongu Taisha" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the pass for a Kii Peninsula loop — Nagoya to Ise, down the coast to Kumano and
          Nachi, then Shirahama and Wakayama to Osaka. From 25 December 2026 to 5 January 2027 every seat on the
          Limited Express &ldquo;Nanki&rdquo; is reserved, so pick up the free reserved-seat ticket before boarding.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Ise-Kumano-Wakayama Area Tourist Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, five consecutive days.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Child (6–11)", "Days"],
            rows: [["Ise-Kumano-Wakayama Area Tourist Pass", "¥16,500", "¥8,250", "5 consecutive"]],
            note: (
              <>
                JR Central, touristpass.jp, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Ise-Kumano-Wakayama pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Trains on the loop and the bus lines that reach the shrines. Sights marked with an extra fee on
              JR Central&apos;s map are charged separately.
            </p>
          ),
          table: {
            head: ["Operator", "Section"],
            rows: [
              ["JR (Kansai, Kisei, Hanwa lines)", "Nagoya – round the Kii Peninsula – within Osaka City; Hineno – Kansai Airport"],
              ["JR Sangu Line", "Taki – Toba (for Ise)"],
              ["JR Kansai, Katamachi, Osaka Higashi lines", "Kameyama, Kizu and Kyuhoji – within Osaka City"],
              ["Ise Railway", "Kawarada – Tsu"],
              ["Wakayama Electric Railway", "Wakayama – Kishi"],
              ["Mie Kotsu buses", "Geku–Naiku line, Ise/Futami/Toba “CAN Bus”, Owase and Kumanoshi lines"],
              ["Kumano Gobo Nankai Bus", "Kii Katsuura – Nachisan, Shingu – Kii Katsuura, Shingu – Hongu Taisha, and others"],
            ],
            note: <>JR Central, touristpass.jp, checked {CHECKED}. Non-reserved seats unless you use one of the six free reservations.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Ise-Kumano-Wakayama Area Tourist Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Central lists three ways. Klook is the &ldquo;travel agent outside Japan&rdquo; route: you receive an
              exchange order and collect the pass at an exchange location in Japan.
            </p>
          ),
          table: {
            head: ["Where", "How it works"],
            rows: [
              ["Online", "JR-WEST ONLINE TRAIN RESERVATION, from one month before boarding (10:00 JST); collect at a pickup location"],
              ["Travel agent outside Japan (e.g. Klook)", "Exchange order, exchanged in Japan at an exchange location"],
              ["At a station", "Ticket offices listed by JR Central"],
            ],
            note: <>JR Central, touristpass.jp, checked {CHECKED}.</>,
          },
          ctas: [{ href: iseKumanoWakayamaAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Ise and Kumano, booked alongside",
        intro: "Guided days at Ise Grand Shrine and on the Kumano Kodo, for the stops the pass takes you to.",
        tours: [iseShrineOkageGuidedTour, kumanoSanzanPilgrimageTour, kumanoKodoPrivateWalk],
      }}
      links={
        <p className={styles.bodyText}>
          Our{" "}
          <Link href="/guides/attractions/kumano-kodo-tour" style={linkStyle}>Kumano Kodo tour guide</Link>{" "}
          compares walking it yourself with a guided day. Starting in Nagoya, see the{" "}
          <Link href="/guides/attractions/nagoya-2-day-itinerary" style={linkStyle}>Nagoya 2 day itinerary</Link>{" "}
          and{" "}
          <Link href="/guides/transport/tokyo-to-nagoya-shinkansen" style={linkStyle}>Tokyo to Nagoya by shinkansen</Link>; starting in
          Osaka, the{" "}
          <Link href="/guides/attractions/kansai-5-day-itinerary" style={linkStyle}>Kansai 5 day itinerary</Link>. Koyasan is
          not on this pass — the{" "}
          <Link href="/guides/transport/koyasan-world-heritage-ticket" style={linkStyle}>Koyasan World Heritage Ticket</Link>{" "}
          covers it from Osaka. Stopping in Shirahama? See{" "}
          <Link href="/guides/attractions/adventure-world-tickets" style={linkStyle}>Adventure World tickets</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Ise-Kumano-Wakayama Area Tourist Pass?",
          a: `¥16,500 for adults and ¥8,250 for children aged 6 to 11, for 5 consecutive days. JR Central's touristpass.jp, checked ${CHECKED}.`,
        },
        {
          q: "Does the pass include buses to Nachi Falls and Kumano Hongu Taisha?",
          a: "Yes. Kumano Gobo Nankai Bus lines Kii Katsuura – Nachisan and Shingu – Hongu Taisha front are among the covered routes.",
        },
        {
          q: "Can I reserve seats with the Ise-Kumano-Wakayama pass?",
          a: "Yes, reserved seats on JR limited expresses are free up to six times. From 25 December 2026 to 5 January 2027 the Limited Express Nanki is reserved-only.",
        },
        {
          q: "Can I start the pass in Osaka?",
          a: "Yes. The covered JR sections run to stations within Osaka City and to Kansai Airport, so the loop can start or end in Osaka or Nagoya.",
        },
        {
          q: "Does the pass cover Ise Grand Shrine buses?",
          a: "Yes. Mie Kotsu's Geku–Naiku line and the Ise/Futami/Toba excursion bus “CAN Bus” are covered.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kumano-kodo-tour", title: "Kumano Kodo Tour" },
        { href: "/guides/transport/koyasan-world-heritage-ticket", title: "Koyasan World Heritage Ticket 2026: Price & How to Use" },
        { href: "/guides/transport/takayama-hokuriku-area-pass", title: "Takayama-Hokuriku Area Tourist Pass 2026" },
        { href: "/guides/attractions/nagoya-2-day-itinerary", title: "Nagoya 2 Day Itinerary" },
      ]}
      banner={{
        title: "Round the Kii Peninsula on one pass",
        desc: "Book the exchange order before you fly, then collect the pass at an exchange location in Japan.",
        label: "View the Ise-Kumano-Wakayama pass →",
      }}
    />
  );
}
