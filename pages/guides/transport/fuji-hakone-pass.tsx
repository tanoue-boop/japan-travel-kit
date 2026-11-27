import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { romancecarShinjukuHakoneYumoto, hakoneLoopBusTour } from "../../../lib/klook-links";
import { fujiHakonePass, mtFujiMultiAttractionPass } from "../../../lib/klook-links-a35";

// Task jtk-20261128-A35 (day 2). Every figure is from Odakyu's own English pass page,
// read by node fetch on 28 Nov 2026 (odakyu.jp/english/passes/fujihakone/ redirects to
// odakyu-global.com/passes/fuji-hakone-pass/): price, 3 days, the Shinjuku–Odawara
// round trip, the transport list, the three excluded sections, the Romancecar
// supplement, the paper ticket at the Odakyu Sightseeing Service Centers. No Klook
// price is printed (Klook answers automated reads with HTTP 403).
const ROUTE = "/guides/transport/fuji-hakone-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://odakyu-global.com/passes/fuji-hakone-pass/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function FujiHakonePassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Fuji Hakone Pass"
      title="Fuji Hakone Pass 2026: Price, Coverage & Where to Buy"
      description="Odakyu's Fuji Hakone Pass is ¥11,100 for 3 days (child ¥3,600): Shinjuku–Odawara round trip plus Hakone and Fuji Five Lakes transport. What's excluded."
      h1={<>Fuji Hakone Pass 2026: <br />Price, Coverage &amp; Where to Buy</>}
      subtitle="Odakyu's three-day pass for Hakone and the Mt. Fuji lakes in one trip from Shinjuku — what it covers, the gaps between the two areas, and how to buy it."
      badges={[`Checked ${CHECKED}`, "¥11,100 · 3 days", "From Shinjuku"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Fuji Hakone Pass costs <strong>¥11,100 for adults and ¥3,600 for children (6–11)</strong> and is
            valid for <strong>3 consecutive days</strong>. It includes a discounted round trip on the Odakyu Line
            between Shinjuku and Odawara, unlimited rides on Hakone&apos;s Tozan train, cable car, ropeway, sightseeing
            cruise and designated buses, and on the Fujikyu Railway (Otsuki – Kawaguchiko) and designated Fujikyu buses
            around Mt. Fuji. The Romancecar needs a separate limited-express ticket.
          </p>
          <p className={styles.bodyText}>
            On site it is sold as a paper ticket at the Odakyu Sightseeing Service Centers in Shinjuku West and
            Odawara; Klook sells it as an e-voucher you exchange there. Odakyu&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: fujiHakonePass.url, label: "Check the Fuji Hakone Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥11,100 / ¥3,600" },
        { label: "Validity", value: "3 consecutive days" },
        { label: "Included", value: "Shinjuku ⇔ Odawara round trip (Odakyu)" },
        { label: "Not included", value: "Romancecar supplement, JR Chuo Line, Shinjuku highway buses" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the pass if you will see both Hakone and the Kawaguchiko side on one trip from
          Shinjuku. If your trip is Hakone only, Odakyu&apos;s Hakone Freepass is the narrower pass; if it is Fuji only,
          Fujikyu&apos;s Mt. Fuji Pass covers that side without the Odakyu round trip.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Fuji Hakone Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, three days, from Shinjuku. Part of the proceeds goes to Mt. Fuji conservation, according to
              Odakyu.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Child (6–11)", "Days"],
            rows: [["Fuji Hakone Pass", "¥11,100", "¥3,600", "3 consecutive"]],
            note: (
              <>
                Odakyu, Fuji Hakone Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Fuji Hakone Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Hakone and the Fuji Five Lakes are both covered, but the link between Tokyo and Kawaguchiko is not: the
              JR Chuo Line and the Shinjuku highway buses cost extra.
            </p>
          ),
          table: {
            head: ["Service", "Covered?"],
            rows: [
              ["Odakyu Line, Shinjuku ⇔ Odawara", "Round trip"],
              ["Hakone Tozan Train and Cable Car", "Yes"],
              ["Hakone Ropeway", "Yes"],
              ["Hakone Sightseeing Cruise (Lake Ashi)", "Yes"],
              ["Hakone Tozan Bus, Odakyu Highway Bus, Tokai Bus", "Designated areas"],
              ["“KANKO SHISETSU-MEGURI” sightseeing bus", "Yes"],
              ["Fujikyu Railway, Otsuki ⇔ Kawaguchiko", "Yes"],
              ["Fujikyu Bus", "Designated areas at Mt. Fuji"],
              ["Romancecar limited express", "Supplement extra"],
              ["JR Chuo Line, Shinjuku ⇔ Otsuki", "No"],
              ["Chuo Expressway bus, Shinjuku ⇔ Kawaguchiko / Fuji-Q / Mt. Fuji Station", "No"],
              ["Odakyu Highway Bus, Shinjuku ⇔ Tomei-Gotemba", "No (Tomei-Gotemba ⇔ Gotemba Station is covered)"],
            ],
            note: <>Odakyu, Fuji Hakone Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Buying",
          title: "Where do I buy the Fuji Hakone Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Odakyu sells it at its Sightseeing Service Centers as a paper ticket, shown at gates or to drivers.
              Klook&apos;s listing is an e-voucher that you exchange for that paper ticket at a service center before
              first use.
            </p>
          ),
          table: {
            head: ["Where", "How it works"],
            rows: [
              ["Odakyu Sightseeing Service Center (Shinjuku West or Odawara)", "Buy on site; a paper ticket is issued"],
              ["Klook", "E-voucher; exchange it for the paper ticket at a service center"],
            ],
            note: <>Odakyu, Fuji Hakone Pass page, checked {CHECKED}. Klook&apos;s exchange terms are on its listing.</>,
          },
          ctas: [{ href: fujiHakonePass.url, label: "Book the Fuji Hakone Pass on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Book alongside the pass",
        intro: "The Romancecar seat the pass doesn't include, a guided Hakone loop, and Fujikyu's own pass for more days on the Fuji side.",
        tours: [romancecarShinjukuHakoneYumoto, hakoneLoopBusTour, mtFujiMultiAttractionPass],
      }}
      links={
        <p className={styles.bodyText}>
          For Hakone only, compare our{" "}
          <Link href="/guides/attractions/hakone-free-pass" style={linkStyle}>Hakone Freepass guide</Link>; for the
          days themselves, the{" "}
          <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>Hakone 2 day itinerary</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={linkStyle}>Kawaguchiko day trip from Tokyo</Link>. A
          night by the lake? See{" "}
          <Link href="/guides/attractions/kawaguchiko-ryokan-mt-fuji-view" style={linkStyle}>Kawaguchiko ryokan with a Mt. Fuji view</Link>.
          Adding Kamakura instead of Fuji, the{" "}
          <Link href="/guides/transport/hakone-kamakura-pass" style={linkStyle}>Hakone Kamakura Pass</Link>{" "}
          is Odakyu&apos;s other three-day pass.
        </p>
      }
      faq={[
        {
          q: "How much is the Fuji Hakone Pass?",
          a: `¥11,100 for adults and ¥3,600 for children aged 6 to 11, valid for 3 days. Odakyu's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the Fuji Hakone Pass include the Romancecar?",
          a: "No. The Odakyu round trip between Shinjuku and Odawara is included, but the Romancecar needs a separate limited-express ticket.",
        },
        {
          q: "Does the Fuji Hakone Pass include the Hakone Ropeway and Lake Ashi cruise?",
          a: "Yes. The Hakone Ropeway, the Hakone Sightseeing Cruise, the Hakone Tozan Train and Cable Car and the Hakone Tozan Bus in designated areas are all covered.",
        },
        {
          q: "Does the Fuji Hakone Pass cover the bus from Shinjuku to Kawaguchiko?",
          a: "No. The Chuo Expressway bus from Shinjuku to Kawaguchiko, Fuji-Q Highland or Mt. Fuji Station is excluded, as is the JR Chuo Line from Shinjuku to Otsuki.",
        },
        {
          q: "Where can I buy the Fuji Hakone Pass?",
          a: "At the Odakyu Sightseeing Service Center in Shinjuku West or Odawara, which issues a paper ticket. Klook's e-voucher is exchanged there.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakone-free-pass", title: "Hakone Free Pass" },
        { href: "/guides/transport/hakone-kamakura-pass", title: "Hakone Kamakura Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/transport/mt-fuji-pass", title: "Mt. Fuji Pass 2026: Price, What's Included & How to Buy" },
        { href: "/guides/attractions/hakone-day-trip-from-tokyo", title: "Hakone Day Trip from Tokyo" },
      ]}
      banner={{
        title: "Hakone and Mt. Fuji on one ticket",
        desc: "Three days from Shinjuku, with both areas' trains, buses, ropeway and cruise.",
        label: "View the Fuji Hakone Pass →",
      }}
    />
  );
}
