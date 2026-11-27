import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { yufuinBeppuNoMoriTour, kumamotoCastleTakachihoTour } from "../../../lib/klook-links";
import { sunqPassKyushu, huisTenBoschTicket, gunkanjimaCruiseTour } from "../../../lib/klook-links-a35";

// Task jtk-20261130-A35 (day 4, run 28 Nov 2026). Every figure is from the SUNQ PASS
// Steering Committee's own site, read by node fetch on 28 Nov 2026: sunqpass.jp/about/
// price images (Northern Kyushu + Shimonoseki 3-day: digital 10,000 / paper 12,000 yen;
// Southern Kyushu 3-day: 8,500 / 10,000; All Kyushu + Shimonoseki 3-day: 12,000 / 14,000;
// 4-day: 15,000 / 17,000; digital = any 3 of 5 days or any 4 of 7 days, paper = consecutive
// days) and sunqpass.jp/en/about/ (about 2,400 routes: expressway buses, local buses and
// some ferries in Kyushu's seven prefectures and around Shimonoseki; not valid on the
// Fukuoka-Nagato/Hagi expressway bus or the overnight Fukuoka-Kagoshima bus; some
// expressway routes need a seat reservation). The Northern 2-day ticket's price is
// shown inconsistently on the site, so it is not printed. No Klook price is printed.
const ROUTE = "/guides/transport/sunq-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.sunqpass.jp/en/about/";
const RESERVE = "https://www.sunqpass.jp/en/reserve/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SunqPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="SUNQ Pass"
      title="SUNQ Pass 2026: Kyushu Bus Pass Price & Coverage"
      description="SUNQ Pass prices for 2026: All Kyushu 3-day ¥12,000, 4-day ¥15,000, Northern ¥10,000, Southern ¥8,500 (digital). What it covers and how to buy."
      h1={<>SUNQ Pass 2026: <br />Kyushu Bus Pass Price &amp; Coverage</>}
      subtitle="The unlimited bus and ferry pass for Kyushu and Shimonoseki: the five types, digital versus paper prices, and the routes it leaves out."
      badges={[`Checked ${CHECKED}`, "From ¥8,500", "Kyushu"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The SUNQ Pass gives unlimited rides on about 2,400 bus routes — <strong>expressway buses, local buses
            and some ferries</strong> — in Kyushu&apos;s seven prefectures and around Shimonoseki. The digital
            ticket costs <strong>¥12,000 for All Kyushu (3 days)</strong>, ¥15,000 for All Kyushu (4 days),
            ¥10,000 for Northern Kyushu (3 days) and ¥8,500 for Southern Kyushu (3 days). Paper tickets cost
            ¥1,500–¥2,000 more.
          </p>
          <p className={styles.bodyText}>
            The digital 3-day ticket can be used on <strong>any 3 days within 5</strong> (the 4-day ticket, any 4
            within 7); paper tickets run on consecutive days. Some expressway routes need a seat reservation. Klook
            sells the pass too. SUNQ PASS Steering Committee, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: sunqPassKyushu.url, label: "Check the SUNQ Pass on Klook →" }}
      stats={[
        { label: "All Kyushu 3 days (digital)", value: "¥12,000" },
        { label: "All Kyushu 4 days (digital)", value: "¥15,000" },
        { label: "Northern Kyushu 3 days (digital)", value: "¥10,000" },
        { label: "Southern Kyushu 3 days (digital)", value: "¥8,500" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> Northern Kyushu covers Fukuoka, Nagasaki, Saga, Oita and Kumamoto — enough for
          Fukuoka, Yufuin, Beppu and Nagasaki. Take All Kyushu only if you are also heading to Kagoshima or
          Miyazaki. The pass covers buses, not JR trains.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the SUNQ Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Digital tickets are bought on a smartphone; paper tickets are sold at bus company counters and
              designated travel agencies. Northern Kyushu and All Kyushu also include Shimonoseki in Yamaguchi
              Prefecture.
            </p>
          ),
          table: {
            head: ["Pass", "Digital", "Paper"],
            rows: [
              ["All Kyushu + Shimonoseki, 3 days", "¥12,000 (any 3 of 5 days)", "¥14,000 (3 days in a row)"],
              ["All Kyushu + Shimonoseki, 4 days", "¥15,000 (any 4 of 7 days)", "¥17,000 (4 days in a row)"],
              ["Northern Kyushu + Shimonoseki, 3 days", "¥10,000 (any 3 of 5 days)", "¥12,000 (3 days in a row)"],
              ["Southern Kyushu, 3 days", "¥8,500 (any 3 of 5 days)", "¥10,000 (3 days in a row)"],
            ],
            note: (
              <>
                SUNQ PASS prices, tax included, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                A Northern Kyushu 2-day ticket is also sold; see the official site for its price. Klook sells the
                pass at its own price.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "Where can you use the SUNQ Pass?",
          body: (
            <p className={styles.bodyText}>
              Northern Kyushu: Fukuoka, Saga, Nagasaki, Oita and Kumamoto prefectures plus Shimonoseki. Southern
              Kyushu: Kumamoto, Miyazaki and Kagoshima. A few stops in Kumamoto Prefecture on long-distance routes
              (Hitoyoshi, Yatsushiro, Yamato-cho) are outside the Northern pass, and routes through Aso and
              Kurokawa Onsen cannot be used with the Southern pass. No pass covers the Fukuoka–Nagato/Hagi
              expressway bus or the overnight Fukuoka–Kagoshima bus. Some expressway routes need a{" "}
              <a href={RESERVE} target="_blank" rel="noopener" style={linkStyle}>seat reservation</a>.
            </p>
          ),
          ctas: [{ href: sunqPassKyushu.url, label: "Buy the SUNQ Pass on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Kyushu",
        intro: "Bookings that fit a bus trip around northern Kyushu.",
        tours: [huisTenBoschTicket, gunkanjimaCruiseTour, yufuinBeppuNoMoriTour, kumamotoCastleTakachihoTour],
      }}
      links={
        <p className={styles.bodyText}>
          If you would rather take the train, compare the{" "}
          <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass</Link>. For routes
          and days, see the{" "}
          <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5-day itinerary</Link>, the{" "}
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2-day itinerary</Link> and the{" "}
          <Link href="/guides/attractions/yufuin-beppu-tour-from-fukuoka" style={linkStyle}>Yufuin and Beppu day trip guide</Link>.
          {" "}For a single day in and around Fukuoka, compare the <Link href="/guides/transport/fukuoka-tourist-city-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Fukuoka Tourist City Pass</Link> (¥2,500, ¥2,800 with Dazaifu) and the <Link href="/guides/transport/dazaifu-yanagawa-pass" style={{ color: "var(--red)", fontWeight: 600 }}>Dazaifu & Yanagawa pass</Link> (¥3,620 with the Yanagawa boat).
        </p>
      }
      faq={[
        {
          q: "How much is the SUNQ Pass?",
          a: `Digital tickets: All Kyushu ¥12,000 for 3 days or ¥15,000 for 4 days, Northern Kyushu ¥10,000 and Southern Kyushu ¥8,500 for 3 days. Paper tickets cost ¥1,500–¥2,000 more. SUNQ PASS, checked ${CHECKED}.`,
        },
        {
          q: "Does the SUNQ Pass cover trains?",
          a: "No. It covers expressway buses, local buses and some ferries. For JR trains you need a JR Kyushu Rail Pass or regular tickets.",
        },
        {
          q: "What is the difference between the digital and paper SUNQ Pass?",
          a: "The digital 3-day pass can be used on any 3 days within 5 from first use (4-day: any 4 within 7) and costs less. Paper passes run on consecutive days.",
        },
        {
          q: "Do I need to reserve seats with the SUNQ Pass?",
          a: "Only on some expressway bus routes. The SUNQ Pass site links to the online seat reservation service for those routes.",
        },
        {
          q: "Which buses are not covered?",
          a: "The Fukuoka–Nagato/Hagi expressway bus and the overnight Fukuoka–Kagoshima bus are not covered by any SUNQ Pass.",
        },
      ]}
      related={[
        { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass" },
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5-Day Itinerary" },
        { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2-Day Itinerary" },
        { href: "/guides/attractions/yufuin-beppu-tour-from-fukuoka", title: "Yufuin & Beppu Day Trip" },
      ]}
      banner={{
        title: "Kyushu by bus",
        desc: "Unlimited expressway and local buses across Kyushu with the SUNQ Pass.",
        label: "View the SUNQ Pass →",
      }}
    />
  );
}
