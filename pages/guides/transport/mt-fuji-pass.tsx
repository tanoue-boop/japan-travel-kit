import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tokyoMtFujiHighwayBus, kawaguchikoYamanakakoBusTour } from "../../../lib/klook-links";
import { mtFujiMultiAttractionPass, fujiHakonePass } from "../../../lib/klook-links-a35";

// Task jtk-20261128-A35 (day 2). Every figure is from Fujikyu's own English page for
// the pass, read by node fetch on 28 Nov 2026 (bus.fujikyu.co.jp/mtpass/en/ redirects
// to bus.fujikyu.co.jp/otoku/mtpass/): 1/2/3-day prices for adults (12+) and children
// (6–11), foreign travellers only, the seven counters, the passport check, no refund,
// extension or reissue. The page itself says its details are "current as of November
// 2024". The list of included facilities is in Fujikyu's brochure and is not repeated
// here. No Klook price is printed.
const ROUTE = "/guides/transport/mt-fuji-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://bus.fujikyu.co.jp/otoku/mtpass/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MtFujiPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Mt. Fuji Pass"
      title="Mt. Fuji Pass 2026: Price, What's Included & How to Buy"
      description="Fujikyu's Mt. Fuji Pass is ¥7,500 for 1 day, ¥10,200 for 2 and ¥12,400 for 3: buses and trains round Mt. Fuji plus attraction entry. Foreigners only."
      h1={<>Mt. Fuji Pass 2026: <br />Price, What&apos;s Included &amp; How to Buy</>}
      subtitle="Fujikyu's pass for foreign visitors: buses and trains around Mt. Fuji and the Fuji Five Lakes, with entry to popular sights. Prices, where to buy it and the rules."
      badges={[`Checked ${CHECKED}`, "From ¥7,500 · 1 day", "Foreign visitors only"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Mt. Fuji Pass costs <strong>¥7,500 for 1 day, ¥10,200 for 2 days and ¥12,400 for 3 days</strong>{" "}
            for adults (12 and over); children aged 6–11 pay half (¥3,750 / ¥5,100 / ¥6,200). It gives{" "}
            <strong>unlimited rides on buses and trains around Mt. Fuji</strong> and includes entrance tickets and
            special deals at popular leisure facilities. It is sold to foreign travellers only.
          </p>
          <p className={styles.bodyText}>
            Buy it online (Klook sells it) or at seven counters including Kawaguchiko, Mt. Fuji, Gotemba and Mishima
            stations; show your passport when buying or collecting it. Fujikyu&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: mtFujiMultiAttractionPass.url, label: "Check the Mt. Fuji Pass on Klook →" }}
      stats={[
        { label: "1 day (adult / child)", value: "¥7,500 / ¥3,750" },
        { label: "2 days (adult / child)", value: "¥10,200 / ¥5,100" },
        { label: "3 days (adult / child)", value: "¥12,400 / ¥6,200" },
        { label: "Who", value: "Foreign travellers only, passport shown" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a pass for one to three days on the Kawaguchiko side, worth comparing against
          the entry fees you plan to pay anyway. Getting there from Tokyo is not part of it — the highway bus or the
          train to Otsuki is separate.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Mt. Fuji Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Three lengths. Fujikyu&apos;s page notes its details are current as of November 2024 and subject to
              change.
            </p>
          ),
          table: {
            head: ["Length", "Adult (12+)", "Child (6–11)"],
            rows: [
              ["1 day", "¥7,500", "¥3,750"],
              ["2 days", "¥10,200", "¥5,100"],
              ["3 days", "¥12,400", "¥6,200"],
            ],
            note: (
              <>
                Fujikyu, Mt. Fuji Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                The included facilities and deals are listed in Fujikyu&apos;s brochure, linked from that page. Klook
                sells the pass at its own price.
              </>
            ),
          },
        },
        {
          label: "Buying",
          title: "Where can I buy the Mt. Fuji Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Online through Fujikyu&apos;s purchase link or an agent such as Klook, or at a counter. Check the
              counter&apos;s opening hours before you go.
            </p>
          ),
          table: {
            head: ["Counter"],
            rows: [
              ["Kawaguchiko Station"],
              ["Mt. Fuji Station"],
              ["Gotemba Station"],
              ["Yamanakako Asahigaoka Bus Terminal"],
              ["Mishima Station"],
              ["Shin-Fuji Station"],
              ["Fujinomiya Station"],
            ],
            note: <>Fujikyu, Mt. Fuji Pass page, checked {CHECKED}.</>,
          },
          ctas: [{ href: mtFujiMultiAttractionPass.url, label: "Book the Mt. Fuji Pass on Klook →" }],
        },
        {
          label: "Rules",
          title: "Who can use the Mt. Fuji Pass?",
          body: null,
          table: {
            head: ["Rule", "What Fujikyu says"],
            rows: [
              ["Who", "Foreign travellers only; show your passport when buying or picking up the pass"],
              ["Refunds and extensions", "None, for any reason — including closed facilities or delayed buses, trains or flights"],
              ["Lost pass", "Not reissued"],
              ["Resale", "Resale and exchange for cash are prohibited"],
              ["Questions", "mt.fujipass@fujikyu.co.jp (English and Chinese)"],
            ],
            note: <>Fujikyu, Mt. Fuji Pass page, checked {CHECKED}.</>,
          },
        },
      ]}
      sameDay={{
        heading: "Getting there and the alternatives",
        intro: "The highway bus from Tokyo the pass doesn't include, a guided lakes day, and Odakyu's pass if Hakone is on the same trip.",
        tours: [tokyoMtFujiHighwayBus, kawaguchikoYamanakakoBusTour, fujiHakonePass],
      }}
      links={
        <p className={styles.bodyText}>
          Plan the day with our{" "}
          <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={linkStyle}>Kawaguchiko day trip from Tokyo</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>Mt. Fuji day trip</Link>{" "}
          guides. Fuji-Q Highland has its own ticket options in{" "}
          <Link href="/guides/attractions/fuji-q-highland-tickets" style={linkStyle}>Fuji-Q Highland tickets</Link>, and a night
          by the lake is in{" "}
          <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" style={linkStyle}>Kawaguchiko ryokan with a Mt. Fuji view</Link>.
          Prefer a guided day? See{" "}
          <Link href="/guides/attractions/mt-fuji-day-tour-from-tokyo" style={linkStyle}>Mt. Fuji day tours from Tokyo</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Mt. Fuji Pass?",
          a: `Adults (12+): ¥7,500 for 1 day, ¥10,200 for 2 days, ¥12,400 for 3 days. Children (6–11): ¥3,750, ¥5,100 and ¥6,200. Fujikyu's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Who can buy the Mt. Fuji Pass?",
          a: "Foreign travellers only. You must show your passport at the counter when buying or picking up the pass.",
        },
        {
          q: "Does the Mt. Fuji Pass include the bus from Tokyo?",
          a: "Fujikyu describes it as unlimited rides on buses and trains around the Mt. Fuji area. The Tokyo highway bus is not described as included; book it separately.",
        },
        {
          q: "Where can I pick up the Mt. Fuji Pass?",
          a: "At Mt. Fuji Station, Kawaguchiko Station, Gotemba Station, Yamanakako Asahigaoka Bus Terminal, Mishima Station, Shin-Fuji Station or Fujinomiya Station.",
        },
        {
          q: "Can I get a refund on the Mt. Fuji Pass?",
          a: "No. Fujikyu gives no refunds or extensions for any reason, including closed facilities or transport delays, and does not reissue lost passes.",
        },
      ]}
      related={[
        { href: "/guides/transport/fuji-hakone-pass", title: "Fuji Hakone Pass 2026: Price, Coverage & Where to Buy" },
        { href: "/guides/transport/mt-fuji-shizuoka-area-pass", title: "Mt. Fuji-Shizuoka Area Tourist Pass Mini 2026" },
        { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "Kawaguchiko Day Trip from Tokyo" },
        { href: "/guides/attractions/fuji-q-highland-tickets", title: "Fuji-Q Highland Tickets" },
      ]}
      banner={{
        title: "One to three days round Mt. Fuji",
        desc: "Buses, trains and attraction entry on one pass for foreign visitors.",
        label: "View the Mt. Fuji Pass →",
      }}
    />
  );
}
