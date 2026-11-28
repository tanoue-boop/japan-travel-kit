import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { mtFujiShizuokaAreaPassMini, mtFujiMultiAttractionPass, fujiHakonePass } from "../../../lib/klook-links-a35";
import { kawaguchikoYamanakakoBusTour } from "../../../lib/klook-links";

// Task jtk-20261128-A35 (day 2). Every figure is from JR Central's touristpass.jp,
// read by node fetch on 28 Nov 2026: touristpass.jp/en/fuji_shizuoka/ (price, 3 days,
// the JR sections, Izuhakone Railway, the five bus operators' lines, the Shimizu Port
// Cruise and Suruga Bay Ferry, the Tokaido Shinkansen exclusion, booking routes).
// No Klook price is printed.
const ROUTE = "/guides/transport/mt-fuji-shizuoka-area-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://touristpass.jp/en/fuji_shizuoka/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function MtFujiShizuokaAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Mt. Fuji-Shizuoka Pass Mini"
      title="Mt. Fuji-Shizuoka Area Tourist Pass Mini 2026: Price & Map"
      description="JR Central's Mt. Fuji-Shizuoka Area Tourist Pass Mini is ¥6,500 for 3 days: JR Atami–Toyohashi, Izuhakone Railway, Fuji buses and the Suruga Bay ferry."
      h1={<>Mt. Fuji-Shizuoka Area Tourist Pass Mini 2026: <br />Price, Coverage &amp; How to Buy</>}
      subtitle="Three days of JR local and limited-express trains across Shizuoka, with buses to the Mt. Fuji side and a ferry across Suruga Bay. What it covers and what it doesn't."
      badges={[`Checked ${CHECKED}`, "¥6,500 · 3 days", "No shinkansen"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Mt. Fuji-Shizuoka Area Tourist Pass Mini costs <strong>¥6,500 for adults and ¥3,250 for children
            (6–11)</strong> for <strong>3 consecutive days</strong>. It covers non-reserved seats on JR conventional
            trains between <strong>Atami and Toyohashi</strong> (Tokaido Main Line), Numazu – Matsuda (Gotemba Line)
            and Fuji – Shimobe-onsen (Minobu Line), the Izuhakone Railway to Shuzenji, listed bus lines including
            Gotemba – Kawaguchiko and Shin-Fuji – Mt. Fuji station, and the Suruga Bay Ferry. The Tokaido Shinkansen is
            not included.
          </p>
          <p className={styles.bodyText}>
            Book on JR-WEST ONLINE TRAIN RESERVATION from one month before (10:00 JST), buy an exchange order from a
            travel agent outside Japan such as Klook, or buy at a listed ticket office. JR Central&apos;s
            touristpass.jp, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: mtFujiShizuokaAreaPassMini.url, label: "Check the Mt. Fuji-Shizuoka pass on Klook →" }}
      stats={[
        { label: "Adult / child (6–11)", value: "¥6,500 / ¥3,250" },
        { label: "Validity", value: "3 consecutive days" },
        { label: "JR trains", value: "Atami ⇔ Toyohashi, Gotemba and Minobu lines" },
        { label: "Not covered", value: "Tokaido Shinkansen, sleeper trains" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a pass for three days based in Shizuoka — Atami, Mishima, Shuzenji, Shimizu,
          Hamamatsu and the Fuji side via Gotemba or Shin-Fuji. It does not cover the trip from Tokyo (Atami is the
          eastern end), and the shinkansen is excluded.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Mt. Fuji-Shizuoka Area Tourist Pass Mini?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              One length, three consecutive days.
            </p>
          ),
          table: {
            head: ["Pass", "Adult", "Child (6–11)", "Days"],
            rows: [["Mt. Fuji-Shizuoka Area Tourist Pass Mini", "¥6,500", "¥3,250", "3 consecutive"]],
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
          title: "What does the Mt. Fuji-Shizuoka pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR trains on three lines plus one private railway, five bus operators&apos; listed routes and two boats.
            </p>
          ),
          table: {
            head: ["Operator", "Section"],
            rows: [
              ["JR Tokaido Main Line", "Atami – Toyohashi (non-reserved seats, limited express included)"],
              ["JR Gotemba Line", "Numazu – Matsuda"],
              ["JR Minobu Line", "Fuji – Shimobe-onsen"],
              ["Izuhakone Railway", "Mishima – Shuzenji"],
              ["Fujikyuko Bus", "Gotemba – Kawaguchiko, Gotemba – Premium Outlets, Gotemba – GrinPa, Shin-Fuji – Mt. Fuji station, Shin-Fuji – Fuji station south exit"],
              ["Tokai Bus", "Mishima – Yamanaka Castle ruins, Numazu – Numazu Minato Shinsenkan, Shuzenji – Shuzenji Onsen, Shuzenji – Toi Port"],
              ["Izuhakone Bus, Shizutetsu Bus, Entetsu Bus", "Numazu Port, IZU-MITO Sea Paradise, Miho, Kanzanji Onsen and other listed lines"],
              ["Mt. Fuji Shimizu Port Cruise", "Hinode – Hinode (no boarding or leaving at Miho)"],
              ["Suruga Bay Ferry", "Shimizu Port – Toi Port; check in at the counter first"],
              ["Tokaido Shinkansen, sleeper trains", "Not covered"],
            ],
            note: <>JR Central, touristpass.jp, checked {CHECKED}. The ferry stops once a year for inspection as well as in bad weather.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Mt. Fuji-Shizuoka Area Tourist Pass Mini?",
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
          ctas: [{ href: mtFujiShizuokaAreaPassMini.url, label: "Book the exchange order on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Other ways round Mt. Fuji",
        intro: "If your Fuji days are on the Kawaguchiko side rather than Shizuoka, these cover that side instead.",
        tours: [mtFujiMultiAttractionPass, fujiHakonePass, kawaguchikoYamanakakoBusTour],
      }}
      links={
        <p className={styles.bodyText}>
          Compare the Shizuoka side with the lakes in our{" "}
          <Link href="/guides/attractions/mt-fuji-day-trip-tokyo" style={linkStyle}>Mt. Fuji day trip from Tokyo</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/kawaguchiko-day-trip-from-tokyo" style={linkStyle}>Kawaguchiko day trip</Link>{" "}
          guides. Between Tokyo and Kyoto the shinkansen passes through Shizuoka — fares are in{" "}
          <Link href="/guides/transport/tokyo-to-kyoto" style={linkStyle}>Tokyo to Kyoto</Link>. For the Kawaguchiko side by
          bus and train, the{" "}
          <Link href="/guides/transport/mt-fuji-pass" style={linkStyle}>Mt. Fuji Pass</Link>{" "}
          is Fujikyu&apos;s own pass.
          {" "}On the Izu coast, the <Link href="/guides/attractions/atagawa-tropical-alligator-garden-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Atagawa Tropical and Alligator Garden</Link> by Izu-Atagawa Station is ¥2,000 for adults.
          {" "}Near Mishima, the <Link href="/guides/attractions/mishima-skywalk-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Mishima Skywalk</Link> costs from ¥1,100 for adults, and in Izu Kogen the <Link href="/guides/attractions/izu-teddy-bear-museum-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Izu Teddy Bear Museum</Link> is ¥1,800.
        </p>
      }
      faq={[
        {
          q: "How much is the Mt. Fuji-Shizuoka Area Tourist Pass Mini?",
          a: `¥6,500 for adults and ¥3,250 for children aged 6 to 11, for 3 consecutive days. JR Central's touristpass.jp, checked ${CHECKED}.`,
        },
        {
          q: "Does the Mt. Fuji-Shizuoka pass cover the shinkansen?",
          a: "No. The Tokaido Shinkansen and sleeper trains are excluded; riding them needs the additional fares and fees.",
        },
        {
          q: "Can I get to Kawaguchiko with the pass?",
          a: "Yes, by Fujikyuko Bus between Gotemba station and Kawaguchiko station, which is one of the covered bus lines.",
        },
        {
          q: "Does the pass cover the trip from Tokyo?",
          a: "No. The Tokaido Main Line section starts at Atami; Tokyo to Atami needs its own ticket.",
        },
        {
          q: "Is the Suruga Bay ferry included?",
          a: "Yes, the Suruga Bay Ferry between Shimizu Port and Toi Port. Go to the reception counter before boarding.",
        },
      ]}
      related={[
        { href: "/guides/transport/mt-fuji-pass", title: "Mt. Fuji Pass 2026: Price, What's Included & How to Buy" },
        { href: "/guides/transport/fuji-hakone-pass", title: "Fuji Hakone Pass 2026: Price, Coverage & How to Buy" },
        { href: "/guides/attractions/mt-fuji-day-trip-tokyo", title: "Mt. Fuji Day Trip from Tokyo" },
        { href: "/guides/attractions/kawaguchiko-day-trip-from-tokyo", title: "Kawaguchiko Day Trip from Tokyo" },
      ]}
      banner={{
        title: "Three days across Shizuoka",
        desc: "Book the exchange order before you fly, then collect the pass at an exchange location in Japan.",
        label: "View the Mt. Fuji-Shizuoka pass →",
      }}
    />
  );
}
