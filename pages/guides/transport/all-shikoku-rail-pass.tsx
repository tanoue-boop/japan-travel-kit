import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { allShikokuRailPass, naoshimaTeshimaPrivateTour, jrOkayamaHiroshimaYamaguchiAreaPass } from "../../../lib/klook-links-a35";
import { jrKansaiWideAreaPass } from "../../../lib/klook-links";

// Task jtk-20261128-A35 (day 2). Figures read on 28 Nov 2026 from JR Shikoku's own
// sources: shikoku-railwaytrip.com/pass-information/ (current prices through 30 Nov
// 2026, valid lines, exchange offices, the Kojima boundary, the Shodoshima change of
// 1 Oct 2026) and the notice jr-shikoku.co.jp/global/en/news/pdf/
// 20261029_all-shikoku-rail-pass.pdf, read with pdfjs (passes sold from 1 Dec 2026:
// 3-day ¥15,000 / 7-day ¥23,000, children half, reserved seats, Klook/Trip.com QR
// tickets activated within 90 days, Kotohira and TiS Okayama dropped). No Klook price
// is printed (Klook answers automated reads with HTTP 403).
const ROUTE = "/guides/transport/all-shikoku-rail-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://shikoku-railwaytrip.com/pass-information/";
const NOTICE = "https://www.jr-shikoku.co.jp/global/en/news/pdf/20261029_all-shikoku-rail-pass.pdf";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;
const noteLink = { color: "var(--text-muted)" } as const;

export default function AllShikokuRailPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="ALL SHIKOKU Rail Pass"
      title="All Shikoku Rail Pass 2026: Price & December Changes"
      description="ALL SHIKOKU Rail Pass prices change on 1 December 2026: 3 days ¥15,000, 7 days ¥23,000 (now ¥12,000 / ¥20,000). Coverage, reserved seats, how to buy."
      h1={<>ALL SHIKOKU Rail Pass 2026: <br />Price, Coverage &amp; the December Changes</>}
      subtitle="JR Shikoku is changing its pass for visitors on 1 December 2026 — new prices, two lengths instead of four, and reserved seats included. Here is what the pass covers and how to buy it."
      badges={[`Checked ${CHECKED}`, "From 1 Dec: ¥15,000 / 3 days", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            For passes sold <strong>from 1 December 2026</strong>, the ALL SHIKOKU Rail Pass costs{" "}
            <strong>¥15,000 for 3 days and ¥23,000 for 7 days</strong> (children 6–11 half price), and it now
            includes <strong>reserved seats</strong> in ordinary cars. Until 30 November 2026 it is sold in four
            lengths: 3 days ¥12,000, 4 days ¥15,000, 5 days ¥17,000 and 7 days ¥20,000 (bought outside Japan; ¥500
            more in Japan). It covers all JR Shikoku and Tosa Kuroshio Railway lines, plus the Asa Coast Railway,
            Kotoden (Takamatsu-Kotohira) and Tosaden trams.
          </p>
          <p className={styles.bodyText}>
            Klook sells it as a QR ticket you activate once on your own phone within 90 days of purchase, so there is
            no exchange counter to visit. It is for foreign passport holders entering Japan as Temporary Visitors.
            JR Shikoku&apos;s pass page and its 29 October 2026 notice, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: allShikokuRailPass.url, label: "Check the ALL SHIKOKU Rail Pass on Klook →" }}
      stats={[
        { label: "3 days (sold from 1 Dec 2026)", value: "¥15,000 / child ¥7,500" },
        { label: "7 days (sold from 1 Dec 2026)", value: "¥23,000 / child ¥11,500" },
        { label: "Seats", value: "Reserved seats included from 1 Dec" },
        { label: "Klook version", value: "QR ticket, activate within 90 days" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the pass for touring Shikoku by train — Takamatsu, Kotohira, Tokushima, Kochi and
          Matsuyama. The price rises for passes sold from 1 December 2026; what counts is the date you buy, not the
          date you travel.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the ALL SHIKOKU Rail Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Shikoku&apos;s notice applies the new prices to passes sold on or after 1 December 2026 (for sales
              outside Japan, the local date). Only 3-day and 7-day passes are listed from that date.
            </p>
          ),
          table: {
            head: ["Length", "Sold until 30 Nov 2026 (outside Japan)", "Sold until 30 Nov 2026 (in Japan)", "Sold from 1 Dec 2026"],
            rows: [
              ["3 days", "¥12,000 (child ¥6,000)", "¥12,500 (child ¥6,250)", "¥15,000 (child ¥7,500)"],
              ["4 days", "¥15,000 (child ¥7,500)", "¥15,500 (child ¥7,750)", "Not listed"],
              ["5 days", "¥17,000 (child ¥8,500)", "¥17,500 (child ¥8,750)", "Not listed"],
              ["7 days", "¥20,000 (child ¥10,000)", "¥20,500 (child ¥10,250)", "¥23,000 (child ¥11,500)"],
            ],
            note: (
              <>
                JR Shikoku pass page and notice of 29 October 2026, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={noteLink}>Pass page</a> ·{" "}
                <a href={NOTICE} target="_blank" rel="noopener" style={noteLink}>Notice (PDF)</a>. Child = 6 to 11. Klook sells
                the pass at its own price.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the ALL SHIKOKU Rail Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The railways of all four prefectures. From the mainland, the pass starts at Kojima on the Seto-Ohashi
              Line — Okayama to Kojima needs its own ticket.
            </p>
          ),
          table: {
            head: ["Service", "Covered?", "Detail"],
            rows: [
              ["JR Shikoku, all lines", "Yes", "Limited express, rapid and local trains; reserved seats from passes sold 1 Dec 2026"],
              ["Tosa Kuroshio Railway", "Yes", "All lines"],
              ["Asa Coast Railway", "Yes", "Including the dual-mode vehicles, except Muroto services on weekends and holidays"],
              ["Kotoden (Takamatsu-Kotohira Electric Railroad)", "Yes", "All lines"],
              ["Tosaden Kotsu trams", "Yes", "All lines, Kochi"],
              ["JR Seto-Ohashi Line", "From Kojima south", "Okayama ⇔ Kojima not covered"],
              ["Sunrise Seto sleeper", "No", ""],
              ["Shodoshima Ferry and Olive Bus", "No, from 1 Oct 2026", "Passes bought by 30 Sep 2026 still valid on them"],
            ],
            note: <>JR Shikoku pass page and 29 October 2026 notice, checked {CHECKED}.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the ALL SHIKOKU Rail Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Shikoku names three routes. For passes sold from 1 December 2026, Kotohira Station and the TiS
              Okayama branch no longer sell or exchange the pass.
            </p>
          ),
          table: {
            head: ["Where", "What you get", "Then"],
            rows: [
              ["Klook (or Trip.com)", "A QR ticket", "Activate it once on your own phone within 90 days of purchase, then ride"],
              ["A travel agency outside Japan", "An exchange order (MCO), valid 3 months", "Exchange at Takamatsu, Matsuyama, Tokushima or Kochi Station, from one month before the first day"],
              ["JR-WEST ONLINE TRAIN RESERVATION", "A reservation", "From one month before the first day; collect at Takamatsu, Matsuyama, Tokushima or Kochi Station"],
              ["In Shikoku", "The pass", "Major JR Shikoku stations and JR Shikoku Tour branches, from one month before"],
            ],
            note: <>JR Shikoku pass page and 29 October 2026 notice, checked {CHECKED}.</>,
          },
          ctas: [{ href: allShikokuRailPass.url, label: "Book the QR pass on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the ALL SHIKOKU Rail Pass?",
          body: null,
          table: {
            head: ["Rule", "What JR Shikoku says"],
            rows: [
              ["Who", "Holders of a passport issued by a government other than Japan, with Temporary Visitor status"],
              ["Days", "Three or seven consecutive days (passes sold from 1 Dec 2026)"],
              ["Seats", "Reserved and non-reserved ordinary seats on limited expresses; reserved ordinary seats on rapid and local trains"],
              ["Full trains", "On a service that is fully booked you may not be able to board"],
              ["Child", "Ages 6 to 11, half price"],
            ],
            note: <>JR Shikoku notice of 29 October 2026, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Shikoku and the Seto Inland Sea on the same trip",
        intro: "The art islands off Takamatsu and the JR West passes that get you to the bridge at Kojima.",
        tours: [naoshimaTeshimaPrivateTour, jrOkayamaHiroshimaYamaguchiAreaPass, jrKansaiWideAreaPass],
      }}
      links={
        <p className={styles.bodyText}>
          Reaching Shikoku from Kansai or Hiroshima? The{" "}
          <Link href="/guides/transport/kansai-wide-area-pass" style={linkStyle}>Kansai WIDE Area Pass</Link>, the{" "}
          <Link href="/guides/transport/okayama-hiroshima-yamaguchi-area-pass" style={linkStyle}>Okayama-Hiroshima-Yamaguchi Area Pass</Link>{" "}
          and the{" "}
          <Link href="/guides/transport/sanyo-sanin-area-pass" style={linkStyle}>Sanyo-San&apos;in Area Pass</Link>{" "}
          are the JR West options for the mainland side. For how regional passes compare with the national one, see
          the{" "}
          <Link href="/guides/transport/jr-pass-guide" style={linkStyle}>JR Pass guide</Link>, and for a longer
          route that can include Shikoku, the{" "}
          <Link href="/guides/attractions/japan-3-week-itinerary" style={linkStyle}>Japan 3 week itinerary</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the ALL SHIKOKU Rail Pass from December 2026?",
          a: `For passes sold from 1 December 2026: ¥15,000 for 3 days and ¥23,000 for 7 days; children aged 6 to 11 pay half. JR Shikoku notice of 29 October 2026, checked ${CHECKED}.`,
        },
        {
          q: "What is the price if I buy before 1 December 2026?",
          a: "Bought outside Japan by 30 November 2026: 3 days ¥12,000, 4 days ¥15,000, 5 days ¥17,000, 7 days ¥20,000. Bought in Japan or on JR-WEST ONLINE TRAIN RESERVATION, each is ¥500 more.",
        },
        {
          q: "Are 4-day and 5-day passes still sold?",
          a: "JR Shikoku's notice lists only 3-day and 7-day passes for sales from 1 December 2026.",
        },
        {
          q: "Does the ALL SHIKOKU Rail Pass cover Okayama?",
          a: "No. On the Seto-Ohashi Line it is valid from Kojima southward; Okayama to Kojima needs a separate ticket.",
        },
        {
          q: "Does the Klook version need to be exchanged?",
          a: "No. JR Shikoku's notice says QR tickets bought through Klook and Trip.com are activated once on your own device within 90 days of purchase and then used directly.",
        },
      ]}
      related={[
        { href: "/guides/transport/okayama-hiroshima-yamaguchi-area-pass", title: "Okayama-Hiroshima-Yamaguchi Area Pass 2026: Price & Map" },
        { href: "/guides/transport/kansai-wide-area-pass", title: "Kansai WIDE Area Pass 2026" },
        { href: "/guides/transport/jr-pass-guide", title: "JR Pass Guide" },
        { href: "/guides/attractions/japan-3-week-itinerary", title: "Japan 3 Week Itinerary" },
      ]}
      banner={{
        title: "Four prefectures, one pass",
        desc: "Klook's QR version is activated on your phone — no exchange office needed.",
        label: "View the ALL SHIKOKU Rail Pass →",
      }}
    />
  );
}
