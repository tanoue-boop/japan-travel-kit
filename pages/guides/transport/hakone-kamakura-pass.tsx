import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { romancecarShinjukuHakoneYumoto, hakoneLoopBusTour, kamakuraEnoshimaDayTour } from "../../../lib/klook-links";
import { hakoneKamakuraPass } from "../../../lib/klook-links-a35";

// Task jtk-20261128-A35 (day 2). Every figure is from Odakyu's own English pass page,
// read by node fetch on 28 Nov 2026 (odakyu.jp/english/passes/hakone_kamakura/
// redirects to odakyu-global.com/passes/hakone-kamakura-pass/): price, 3 days, all
// Odakyu lines, the transport list, the Romancecar supplement, the digital ticket on
// EMot Online Tickets and the paper ticket at the service centers. No Klook price is
// printed.
const ROUTE = "/guides/transport/hakone-kamakura-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://odakyu-global.com/passes/hakone-kamakura-pass/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HakoneKamakuraPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Hakone Kamakura Pass"
      title="Hakone Kamakura Pass 2026: Price, Coverage & How to Buy"
      description="Odakyu's Hakone Kamakura Pass is ¥8,520 for 3 days (child ¥1,980): all Odakyu lines, Hakone's ropeway and cruise, and the Enoden. Where to buy it."
      h1={<>Hakone Kamakura Pass 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Odakyu's three-day pass for Hakone and Kamakura-Enoshima on one trip — every Odakyu line, Hakone's transport and the Enoden. What it covers and how to buy it."
      badges={[`Checked ${CHECKED}`, "¥8,520 · 3 days", "Digital or paper"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Hakone Kamakura Pass costs <strong>¥8,520 for adults and ¥1,980 for children (6–11)</strong> and is
            valid for <strong>3 consecutive days</strong>. It gives unlimited rides on <strong>all Odakyu lines</strong>{" "}
            from Shinjuku, Hakone&apos;s Tozan train, cable car,
            ropeway, sightseeing cruise and designated buses, and the <strong>Enoden</strong> to Enoshima and
            Kamakura. The Romancecar needs a separate limited-express ticket.
          </p>
          <p className={styles.bodyText}>
            Buy it on Odakyu&apos;s EMot Online Tickets as a QR ticket, at an Odakyu Sightseeing Service Center as a
            paper ticket, or through Klook. Odakyu&apos;s pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: hakoneKamakuraPass.url, label: "Check the Hakone Kamakura Pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥8,520 / ¥1,980" },
        { label: "Validity", value: "3 consecutive days" },
        { label: "Trains", value: "All Odakyu lines + Enoden" },
        { label: "Not included", value: "Romancecar limited-express ticket" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> the pass if Hakone and Kamakura are both on a three-day plan from Shinjuku.
          Hakone alone is the Hakone Freepass; Kamakura and Enoshima alone is the Enoshima-Kamakura Freepass.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Hakone Kamakura Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, three days; Odakyu&apos;s page lists a single adult and child price.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Child (6–11)", "Days"],
            rows: [["Hakone Kamakura Pass", "¥8,520", "¥1,980", "3 consecutive"]],
            note: (
              <>
                Odakyu, Hakone Kamakura Pass page, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Coverage",
          title: "What does the Hakone Kamakura Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Odakyu lists ten transport services on the pass.
            </p>
          ),
          table: {
            head: ["Service", "Covered?"],
            rows: [
              ["Odakyu Line (all lines)", "Unlimited"],
              ["Hakone Tozan Train and Cable Car", "Yes"],
              ["Hakone Ropeway", "Yes"],
              ["Hakone Sightseeing Cruise (Lake Ashi)", "Yes"],
              ["Hakone Tozan Bus, Odakyu Highway Bus, Tokai Bus", "Designated areas"],
              ["“KANKO SHISETSU-MEGURI” sightseeing bus", "Yes"],
              ["Enoshima Electric Railway (Enoden)", "Yes"],
              ["Romancecar limited express", "Supplement extra"],
            ],
            note: <>Odakyu, Hakone Kamakura Pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Hakone Kamakura Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The digital version works on smartphones only; one phone can hold up to four tickets for a group
              travelling together.
            </p>
          ),
          table: {
            head: ["Where", "How it works"],
            rows: [
              ["EMot Online Tickets (Odakyu)", "Buy online, show the QR code at the gate"],
              ["Odakyu Sightseeing Service Center", "Buy on site; a paper ticket is issued"],
              ["Klook", "Book through Klook; its listing sets out how the ticket is issued"],
            ],
            note: <>Odakyu, Hakone Kamakura Pass page, checked {CHECKED}.</>,
          },
          ctas: [{ href: hakoneKamakuraPass.url, label: "Book the Hakone Kamakura Pass on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Book alongside the pass",
        intro: "The Romancecar seat the pass doesn't include, and guided days if you'd rather not plan the route.",
        tours: [romancecarShinjukuHakoneYumoto, hakoneLoopBusTour, kamakuraEnoshimaDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          Compare the single-area passes in our{" "}
          <Link href="/guides/attractions/hakone-free-pass" style={linkStyle}>Hakone Freepass guide</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/enoshima-kamakura-pass" style={linkStyle}>Enoshima-Kamakura pass guide</Link>. For
          the days, see the{" "}
          <Link href="/guides/attractions/kamakura-day-trip" style={linkStyle}>Kamakura day trip</Link>{" "}
          and the{" "}
          <Link href="/guides/attractions/hakone-2-day-itinerary" style={linkStyle}>Hakone 2 day itinerary</Link>. Adding
          Mt. Fuji instead of Kamakura, the{" "}
          <Link href="/guides/transport/fuji-hakone-pass" style={linkStyle}>Fuji Hakone Pass</Link>{" "}
          is Odakyu&apos;s other three-day pass.
        </p>
      }
      faq={[
        {
          q: "How much is the Hakone Kamakura Pass?",
          a: `¥8,520 for adults and ¥1,980 for children aged 6 to 11, valid for 3 days. Odakyu's pass page, checked ${CHECKED}.`,
        },
        {
          q: "Does the Hakone Kamakura Pass include the Romancecar?",
          a: "No. All Odakyu lines are included, but the Romancecar needs a separate limited-express ticket.",
        },
        {
          q: "Does the pass cover the Enoden to Kamakura?",
          a: "Yes. The Enoshima Electric Railway (Enoden) is one of the covered services.",
        },
        {
          q: "Can I use the Hakone Kamakura Pass in Tokyo?",
          a: "On the Odakyu Line only: the pass covers all Odakyu lines, which start at Shinjuku. JR, Tokyo Metro and other lines are not included.",
        },
        {
          q: "Is there a digital Hakone Kamakura Pass?",
          a: "Yes. Odakyu sells it on EMot Online Tickets as a QR ticket for smartphones; up to four tickets can be held on one phone for a group.",
        },
      ]}
      related={[
        { href: "/guides/attractions/hakone-free-pass", title: "Hakone Free Pass" },
        { href: "/guides/attractions/enoshima-kamakura-pass", title: "Enoshima-Kamakura Pass" },
        { href: "/guides/transport/fuji-hakone-pass", title: "Fuji Hakone Pass 2026: Price, Coverage & Where to Buy" },
        { href: "/guides/attractions/kamakura-day-trip", title: "Kamakura Day Trip" },
      ]}
      banner={{
        title: "Hakone and Kamakura on one pass",
        desc: "Three days of every Odakyu line, Hakone's transport and the Enoden.",
        label: "View the Hakone Kamakura Pass →",
      }}
    />
  );
}
