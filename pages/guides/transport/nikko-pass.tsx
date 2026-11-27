import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { nikkoWorldHeritageDayTour, nikkoPrivateDayTour } from "../../../lib/klook-links";
import { nikkoPassTobu, nikkoHeritageWalkingTour } from "../../../lib/klook-links-a35";

// Task jtk-20261128-A35 (day 2). Every figure is from Tobu Railway's own English
// pages, read by node fetch on 28 Nov 2026: tobu.co.jp/en/ticket/nikko-pass/
// (both prices and validity), /en/ticket/nikko/all.html and /en/ticket/nikko/city.html
// (zones: one Asakusa–Shimo-Imaichi round trip, Tobu lines Shimo-Imaichi–Tobu-Nikko–
// Shin-Fujiwara, buses, the Chuzenji cruise season, the Astraea day-use onsen, the
// Akechidaira Ropeway suspension to 31 Aug 2027, what is not included). No Klook
// price is printed.
const ROUTE = "/guides/transport/nikko-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.tobu.co.jp/en/ticket/nikko-pass/";
const ALL_URL = "https://www.tobu.co.jp/en/ticket/nikko/all.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteLink = { color: "var(--text-muted)" } as const;

export default function NikkoPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="NIKKO PASS"
      title="Nikko Pass 2026: All Area vs World Heritage Area Price"
      description="Tobu's NIKKO PASS: World Heritage Area ¥3,000 for 2 days, All Area ¥8,000 for 4 days, each with one Asakusa–Nikko round trip. What's covered and not."
      h1={<>NIKKO PASS 2026: <br />All Area vs World Heritage Area</>}
      subtitle="Tobu Railway's two passes from Asakusa to Nikko — what each covers, what neither includes, and which one fits a day trip or a longer stay."
      badges={[`Checked ${CHECKED}`, "From ¥3,000 · 2 days", "From Asakusa"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Tobu sells two NIKKO PASSes. The <strong>World Heritage Area pass is ¥3,000 for adults (child ¥1,500),
            valid 2 days</strong>; the <strong>All Area pass is ¥8,000 (child ¥4,000), valid 4 days</strong>. Both
            include <strong>one round trip between Asakusa and Shimo-Imaichi</strong> and Tobu trains between
            Shimo-Imaichi, Tobu-Nikko and Shin-Fujiwara (for Kinugawa Onsen). The World Heritage pass adds Tobu buses
            inside the World Heritage area; the All Area pass adds all Tobu buses in Nikko, for Lake Chuzenji and Okunikko, and the Chuzenji cruise in season.
          </p>
          <p className={styles.bodyText}>
            Neither includes the limited express supplement (SPACIA, Revaty) or shrine and temple admission. Tobu&apos;s
            pass pages, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: nikkoPassTobu.url, label: "Check the NIKKO PASS on Klook →" }}
      stats={[
        { label: "World Heritage Area", value: "¥3,000 / child ¥1,500 · 2 days" },
        { label: "All Area", value: "¥8,000 / child ¥4,000 · 4 days" },
        { label: "From Tokyo", value: "1 round trip Asakusa ⇔ Shimo-Imaichi" },
        { label: "Not included", value: "Limited express ticket, shrine admission" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> for a day or two at Toshogu, Rinnoji and Kinugawa Onsen, the ¥3,000 World
          Heritage Area pass. If Lake Chuzenji or Okunikko are on the plan, the All Area pass is the one
          with the buses up the mountain.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the NIKKO PASS?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Two versions, each a fixed number of consecutive days from the first day of use.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Child", "Valid"],
            rows: [
              ["NIKKO PASS world heritage area", "¥3,000", "¥1,500", "2 days"],
              ["NIKKO PASS all area", "¥8,000", "¥4,000", "4 days"],
            ],
            note: (
              <>
                Tobu Railway, NIKKO PASS pages, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={noteLink}>Official source</a>. Klook sells the pass at
                its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "NIKKO PASS All Area vs World Heritage Area: what's covered?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The trains are the same on both; the difference is the buses and the extras above Nikko town.
            </p>
          ),
          table: {
            head: ["Included", "World Heritage Area", "All Area"],
            rows: [
              ["Asakusa ⇔ Shimo-Imaichi", "1 round trip", "1 round trip"],
              ["Tobu lines Shimo-Imaichi – Tobu-Nikko – Shin-Fujiwara", "Yes", "Yes"],
              ["Tobu Bus", "Lines within the World Heritage area", "All lines in Nikko"],
              ["Lake Chuzenji sightseeing cruise", "No", "Mid-April to 30 November"],
              ["Nikko Edomura shuttle bus", "No", "Yes"],
              ["Hybrid bus (Odashirogahara)", "No", "Mid-April to 30 November"],
              ["Nikko Astraea Hotel day-use onsen", "No", "Once"],
              ["Limited express supplement", "No", "No"],
              ["Shrine and temple admission", "No", "No"],
            ],
            note: (
              <>
                Tobu Railway pass pages, checked {CHECKED}.{" "}
                <a href={ALL_URL} target="_blank" rel="noopener" style={noteLink}>All Area details</a>. Admission to Tobu
                World Square and EDO WONDERLAND is also not included; both passes give discounts there.
              </>
            ),
          },
        },
        {
          label: "Good to know",
          title: "What does the NIKKO PASS not include?",
          body: null,
          table: {
            head: ["Item", "What Tobu says"],
            rows: [
              ["Limited express", "SPACIA, SPACIA X and Revaty need a separate limited express ticket"],
              ["SL Taiju", "Needs a reserved seat ticket"],
              ["Admission", "Shrines and temples in Nikko, Tobu World Square and EDO WONDERLAND are not included"],
              ["Akechidaira Ropeway", "Suspended from 16 January 2026 to 31 August 2027 (may be extended)"],
            ],
            note: <>Tobu Railway pass pages, checked {CHECKED}.</>,
          },
          ctas: [{ href: nikkoPassTobu.url, label: "Book the NIKKO PASS on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Nikko with a guide",
        intro: "A join-in walk round the shrines once you arrive, or a guided day from Tokyo if you'd rather not plan the trains.",
        tours: [nikkoHeritageWalkingTour, nikkoWorldHeritageDayTour, nikkoPrivateDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          Our{" "}
          <Link href="/guides/attractions/nikko-day-trip" style={linkStyle}>Nikko day trip guide</Link>{" "}
          has the route and timings. For the rest of the week, see{" "}
          <Link href="/guides/attractions/things-to-do-tokyo" style={linkStyle}>things to do in Tokyo</Link>, the{" "}
          <Link href="/guides/attractions/tokyo-5-day-itinerary" style={linkStyle}>Tokyo 5 day itinerary</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/tokyo-7-day-itinerary" style={linkStyle}>Tokyo 7 day itinerary</Link>. The pass starts
          at Asakusa — getting there is in{" "}
          <Link href="/guides/transport/tokyo-transportation" style={linkStyle}>getting around Tokyo</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the NIKKO PASS?",
          a: `World Heritage Area: ¥3,000 adult, ¥1,500 child, valid 2 days. All Area: ¥8,000 adult, ¥4,000 child, valid 4 days. Tobu Railway, checked ${CHECKED}.`,
        },
        {
          q: "Does the NIKKO PASS include the train from Tokyo?",
          a: "Yes, one round trip between Asakusa and Shimo-Imaichi on Tobu trains. The limited express (SPACIA, Revaty) needs a separate limited express ticket.",
        },
        {
          q: "Which NIKKO PASS covers Lake Chuzenji?",
          a: "The All Area pass. It covers all Tobu Bus lines in Nikko and the Lake Chuzenji cruise from mid-April to 30 November. The World Heritage Area pass covers buses inside the World Heritage area only.",
        },
        {
          q: "Does the NIKKO PASS include Toshogu Shrine admission?",
          a: "No. Admission to Nikko's shrines and temples is not included in either pass.",
        },
        {
          q: "Does the NIKKO PASS cover Kinugawa Onsen?",
          a: "Yes. Both passes cover Tobu lines between Shimo-Imaichi, Tobu-Nikko and Shin-Fujiwara, which includes Kinugawa Onsen.",
        },
      ]}
      related={[
        { href: "/guides/attractions/nikko-day-trip", title: "Nikko Day Trip from Tokyo" },
        { href: "/guides/attractions/things-to-do-tokyo", title: "Things to Do in Tokyo" },
        { href: "/guides/attractions/kawagoe-day-trip", title: "Kawagoe Day Trip" },
        { href: "/guides/transport/tokyo-transportation", title: "Getting Around Tokyo" },
      ]}
      banner={{
        title: "Asakusa to Nikko and back",
        desc: "Both passes include one Tobu round trip from Asakusa; add the limited express ticket if you want the faster train.",
        label: "View the NIKKO PASS →",
      }}
    />
  );
}
