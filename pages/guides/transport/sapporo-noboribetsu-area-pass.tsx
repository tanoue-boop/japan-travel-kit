import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { sapporoNoboribetsuAreaPass } from "../../../lib/klook-links-a35";
import { otaruCanalCruiseSealCarving, capeKamuiOtaruCanalCruiseDayTour, noboribetsuToyaOtaruDayTour } from "../../../lib/klook-links";
import { JRH_CHECKED_ISO, JRH_PASS_URL, jrHokkaidoBuyRows, jrHokkaidoRuleRows } from "../../../lib/jrhokkaido-pass-facts";

// Task jtk-20261127-A35. Every figure is from JR Hokkaido's rail-pass page, read by
// node fetch on 27 Nov 2026 (JRH_PASS_URL): prices, 4-day validity, the area (New
// Chitose Airport, Sapporo, Otaru, Noboribetsu; Toya excluded) and JR Hokkaido's own
// example of ¥13,380 for a Sapporo–Noboribetsu return plus a Sapporo–Otaru return.
const ROUTE = "/guides/transport/sapporo-noboribetsu-area-pass";
const CHECKED = checkedLabel(JRH_CHECKED_ISO);

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SapporoNoboribetsuAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Sapporo-Noboribetsu Area Pass"
      title="Sapporo-Noboribetsu Area Pass 2026: Price & Is It Worth It?"
      description="JR Hokkaido's Sapporo-Noboribetsu Area Pass is ¥10,000 for 4 days bought ahead (¥11,000 at a station): New Chitose Airport, Otaru, Noboribetsu."
      h1={<>Sapporo-Noboribetsu Area Pass 2026: <br />Price &amp; Is It Worth It?</>}
      subtitle="Four days of JR Hokkaido between New Chitose Airport, Sapporo, Otaru and Noboribetsu — and JR Hokkaido's own fare example that shows when it pays."
      badges={[`Checked ${CHECKED}`, "¥10,000 · 4 days", "Non-Japanese passports"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Sapporo-Noboribetsu Area Pass costs <strong>¥10,000 for adults and ¥5,000 for children (6–11)</strong>{" "}
            when bought before you arrive, or ¥11,000 and ¥5,500 at a JR Hokkaido station, and it is valid for{" "}
            <strong>4 consecutive days</strong>. It covers reserved and non-reserved ordinary seats on JR Hokkaido
            limited express, rapid and local trains between New Chitose Airport, Sapporo, Otaru and Noboribetsu.
            Toya is not included, and neither are JR Hokkaido buses, the Sapporo subway or the streetcar.
          </p>
          <p className={styles.bodyText}>
            JR Hokkaido&apos;s own example: a Sapporo–Noboribetsu return plus a Sapporo–Otaru return cost ¥13,380 at
            normal fares (¥9,780 + ¥3,600). Any non-Japanese passport holder can use the pass. Book the exchange
            order on Klook or JR-EAST Train Reservation and collect the pass with your passport. JR Hokkaido&apos;s
            pass page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: sapporoNoboribetsuAreaPass.url, label: "Check the Sapporo-Noboribetsu Area Pass on Klook →" }}
      stats={[
        { label: "Adult, bought ahead / at station", value: "¥10,000 / ¥11,000" },
        { label: "Child (6–11)", value: "¥5,000 / ¥5,500" },
        { label: "Validity", value: "4 consecutive days" },
        { label: "Pays off", value: "Noboribetsu return alone is ¥9,780" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> a Noboribetsu return is ¥9,780, so adding the airport train or one Otaru trip
          in the same four days takes the normal fares past the ¥10,000 pass. For Furano and Biei, the
          Sapporo-Furano Area Pass is the matching pass; for Lake Toya, the pass does not reach.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Sapporo-Noboribetsu Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Buying before you arrive saves ¥1,000 per adult. The pre-purchase price applies to an exchange order from
              a travel agent outside Japan (Klook is one) or a booking on JR-EAST Train Reservation.
            </p>
          ),
          table: {
            head: ["Where bought", "Adult", "Child (6–11)", "Days"],
            rows: [
              ["Before arrival (agent or JR-EAST Train Reservation)", "¥10,000", "¥5,000", "4 consecutive"],
              ["At a designated JR Hokkaido station", "¥11,000", "¥5,500", "4 consecutive"],
            ],
            note: (
              <>
                JR Hokkaido, rail-pass page, checked {CHECKED}.{" "}
                <a href={JRH_PASS_URL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price; open the listing for your date.
              </>
            ),
          },
        },
        {
          label: "Worth it",
          title: "Is the Sapporo-Noboribetsu Area Pass worth it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Hokkaido&apos;s example uses two day trips from Sapporo. The pass is ¥3,380 cheaper on those two alone,
              before counting the airport train.
            </p>
          ),
          table: {
            head: ["Trip", "Normal fare"],
            rows: [
              ["Sapporo ⇔ Noboribetsu return", "¥9,780"],
              ["Sapporo ⇔ Otaru return", "¥3,600"],
              ["Total", "¥13,380 — against ¥10,000 for the pass bought ahead"],
            ],
            note: <>JR Hokkaido&apos;s own example on its rail-pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Rules",
          title: "What does the Sapporo-Noboribetsu Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Hokkaido lists New Chitose Airport, Sapporo, Otaru and Noboribetsu as the places the pass connects;
              Toya is outside it.
            </p>
          ),
          table: {
            head: ["Rule", "What JR Hokkaido says"],
            rows: jrHokkaidoRuleRows,
            note: <>JR Hokkaido, rail-pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Buying",
          title: "How do I buy the Sapporo-Noboribetsu Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Three routes. The first two get the lower price.
            </p>
          ),
          table: {
            head: ["Where", "Price", "Then"],
            rows: jrHokkaidoBuyRows,
            note: <>JR Hokkaido, rail-pass page, checked {CHECKED}.</>,
          },
          ctas: [{ href: sapporoNoboribetsuAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Otaru and Noboribetsu days to book",
        intro: "Two Otaru days for the pass's other end, and the coach day that adds Lake Toya, which the pass does not reach.",
        tours: [otaruCanalCruiseSealCarving, capeKamuiOtaruCanalCruiseDayTour, noboribetsuToyaOtaruDayTour],
      }}
      links={
        <p className={styles.bodyText}>
          Our{" "}
          <Link href="/guides/attractions/otaru-day-trip-from-sapporo" style={linkStyle}>Otaru day trip from Sapporo</Link>{" "}
          covers one of the two trips in JR Hokkaido&apos;s example, and the{" "}
          <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3 day itinerary</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>Hokkaido 7 day itinerary</Link>{" "}
          show where the pass days fit. For winter, see{" "}
          <Link href="/guides/attractions/hokkaido-winter-tours" style={linkStyle}>Hokkaido winter tours</Link>; for the whole island, the{" "}
          <Link href="/guides/transport/hokkaido-rail-pass" style={linkStyle}>Hokkaido Rail Pass guide</Link>.
          {" "}Near JR Noboribetsu Station, <Link href="/guides/attractions/noboribetsu-date-jidaimura-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Noboribetsu Date Jidaimura</Link> costs ¥3,300 for adults; winter entry ends at 15:00.
          {" "}At Noboribetsu Onsen, <Link href="/guides/attractions/noboribetsu-bear-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Noboribetsu Bear Park</Link> is ¥3,200 for adults (ropeway included); in Sapporo, <Link href="/guides/attractions/shiroi-koibito-park-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Shiroi Koibito Park</Link> is ¥1,200.
          {" "}At Noboribetsu, <Link href="/guides/attractions/noboribetsu-marine-park-nixe-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Noboribetsu Marine Park Nixe</Link> is ¥3,200 for adults and ¥1,600 for ages 4–12.
        </p>
      }
      faq={[
        {
          q: "How much is the Sapporo-Noboribetsu Area Pass?",
          a: `¥10,000 for adults and ¥5,000 for children aged 6 to 11 when bought before arrival; ¥11,000 and ¥5,500 at a JR Hokkaido station. Valid 4 consecutive days. JR Hokkaido, checked ${CHECKED}.`,
        },
        {
          q: "Is the Sapporo-Noboribetsu Area Pass worth it?",
          a: "Usually, if Noboribetsu is in the four days. JR Hokkaido puts a Sapporo–Noboribetsu return at ¥9,780 and a Sapporo–Otaru return at ¥3,600, ¥13,380 together against ¥10,000 for the pass.",
        },
        {
          q: "Does the Sapporo-Noboribetsu Area Pass cover Lake Toya?",
          a: "No. JR Hokkaido states that Toya is not included in the pass area.",
        },
        {
          q: "Does the pass cover New Chitose Airport?",
          a: "Yes. New Chitose Airport is one of the places JR Hokkaido lists for the pass, with Sapporo, Otaru and Noboribetsu.",
        },
        {
          q: "Who can use the Sapporo-Noboribetsu Area Pass?",
          a: "Any non-Japanese passport holder. You show the passport itself when you buy or exchange the pass; a residence card or a copy is not accepted.",
        },
      ]}
      related={[
        { href: "/guides/transport/sapporo-furano-area-pass", title: "Sapporo-Furano Area Pass 2026: Price, Area & Is It Worth It?" },
        { href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass" },
        { href: "/guides/attractions/otaru-day-trip-from-sapporo", title: "Otaru Day Trip from Sapporo" },
        { href: "/guides/attractions/hokkaido-7-day-itinerary", title: "Hokkaido 7 Day Itinerary" },
      ]}
      banner={{
        title: "Noboribetsu and Otaru by train",
        desc: "Book ahead for the lower price, then collect the pass with your passport at the airport or Sapporo Station.",
        label: "View the Sapporo-Noboribetsu Area Pass →",
      }}
    />
  );
}
