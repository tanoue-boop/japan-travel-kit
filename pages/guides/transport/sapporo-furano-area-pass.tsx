import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { sapporoFuranoAreaPass, furanoBieiBluePondDayTour, asahiyamaZooWinterDayTour, otaruCanalCruiseSealCarving } from "../../../lib/klook-links";
import { JRH_CHECKED_ISO, JRH_PASS_URL, jrHokkaidoBuyRows, jrHokkaidoRuleRows } from "../../../lib/jrhokkaido-pass-facts";

// Task jtk-20261127-A35. Every figure is from JR Hokkaido's rail-pass page, read by
// node fetch on 27 Nov 2026 (JRH_PASS_URL): prices, the 4-day validity, the area
// (New Chitose Airport, Sapporo, Otaru, Furano, Biei, Asahikawa; Tomamu excluded),
// and JR Hokkaido's own example of ¥13,520 for a Sapporo–Furano return via Asahikawa.
const ROUTE = "/guides/transport/sapporo-furano-area-pass";
const CHECKED = checkedLabel(JRH_CHECKED_ISO);

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function SapporoFuranoAreaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Sapporo-Furano Area Pass"
      title="Sapporo-Furano Area Pass 2026: Price, Area & Is It Worth It?"
      description="JR Hokkaido's Sapporo-Furano Area Pass is ¥11,000 for 4 days bought ahead (¥12,000 at a station): airport, Otaru, Asahikawa, Biei, Furano. Is it worth it?"
      h1={<>Sapporo-Furano Area Pass 2026: <br />Price, Area &amp; Is It Worth It?</>}
      subtitle="Four days of JR Hokkaido between New Chitose Airport, Sapporo, Otaru, Asahikawa, Biei and Furano — with JR Hokkaido's own fare example showing when it pays."
      badges={[`Checked ${CHECKED}`, "¥11,000 · 4 days", "Non-Japanese passports"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Sapporo-Furano Area Pass costs <strong>¥11,000 for adults and ¥5,500 for children (6–11)</strong> when
            bought before you arrive, or ¥12,000 and ¥6,000 at a JR Hokkaido station, and it is valid for{" "}
            <strong>4 consecutive days</strong>. It covers reserved and non-reserved ordinary seats on JR Hokkaido
            limited express, rapid and local trains between New Chitose Airport, Sapporo, Otaru, Asahikawa, Biei and
            Furano. Tomamu is not included, and neither are JR Hokkaido buses, the Sapporo subway or the streetcar.
          </p>
          <p className={styles.bodyText}>
            JR Hokkaido&apos;s own example: a Sapporo–Furano return via Asahikawa costs ¥13,520 at normal fares, so the
            ¥11,000 pass is cheaper on that trip alone. Any non-Japanese passport holder can use it. Book the exchange
            order on Klook or JR-EAST Train Reservation and collect the pass with your passport. JR Hokkaido&apos;s pass
            page, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: sapporoFuranoAreaPass.url, label: "Check the Sapporo-Furano Area Pass on Klook →" }}
      stats={[
        { label: "Adult, bought ahead / at station", value: "¥11,000 / ¥12,000" },
        { label: "Child (6–11)", value: "¥5,500 / ¥6,000" },
        { label: "Validity", value: "4 consecutive days" },
        { label: "Pays off", value: "One Sapporo–Furano return (¥13,520)" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> worth it as soon as the four days include a return to Furano or Biei, because
          that one trip costs more than the pass. If the trip also reaches Hakodate or eastern Hokkaido, look at the
          Hokkaido Rail Pass instead; for Noboribetsu and Otaru, the Sapporo-Noboribetsu Area Pass is the matching
          pass.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Sapporo-Furano Area Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Buying before you arrive saves ¥1,000 per adult. The pre-purchase price applies to an exchange order from
              a travel agent outside Japan (Klook is one) or a booking on JR-EAST Train Reservation.
            </p>
          ),
          table: {
            head: ["Where bought", "Adult", "Child (6–11)", "Days"],
            rows: [
              ["Before arrival (agent or JR-EAST Train Reservation)", "¥11,000", "¥5,500", "4 consecutive"],
              ["At a designated JR Hokkaido station", "¥12,000", "¥6,000", "4 consecutive"],
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
          title: "Is the Sapporo-Furano Area Pass worth it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Hokkaido prints one comparison, and it is enough to decide: the return trip to Furano by way of
              Asahikawa costs ¥2,520 more than the pass. Every other ride in the four days — the airport train, Otaru,
              a second day in Biei — is then free.
            </p>
          ),
          table: {
            head: ["Trip", "Normal fare", "With the pass"],
            rows: [["Sapporo ⇔ Furano return, via Asahikawa", "¥13,520", "¥11,000 (bought ahead), all other rides in the 4 days included"]],
            note: <>JR Hokkaido&apos;s own example on its rail-pass page, checked {CHECKED}.</>,
          },
        },
        {
          label: "Rules",
          title: "What does the Sapporo-Furano Area Pass cover?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              JR Hokkaido lists New Chitose Airport, Sapporo, Otaru, Furano, Biei and Asahikawa as the places the pass
              connects; Tomamu is outside it.
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
          title: "How do I buy the Sapporo-Furano Area Pass?",
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
          ctas: [{ href: sapporoFuranoAreaPass.url, label: "Book the exchange order on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Days to book on the same pass",
        intro: "Guided days from Sapporo to places on the pass line — Furano and Biei, Asahikawa, Otaru.",
        tours: [furanoBieiBluePondDayTour, asahiyamaZooWinterDayTour, otaruCanalCruiseSealCarving],
      }}
      links={
        <p className={styles.bodyText}>
          The{" "}
          <Link href="/guides/attractions/furano-biei-tour" style={linkStyle}>Furano and Biei tour guide</Link>{" "}
          compares going by train on this pass with a coach day. Our{" "}
          <Link href="/guides/attractions/sapporo-3-day-itinerary" style={linkStyle}>Sapporo 3 day itinerary</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/hokkaido-7-day-itinerary" style={linkStyle}>Hokkaido 7 day itinerary</Link>{" "}
          show where four pass days fit, and the{" "}
          <Link href="/guides/attractions/otaru-day-trip-from-sapporo" style={linkStyle}>Otaru day trip</Link>{" "}
          is on the pass too. Going further than Asahikawa? Read the{" "}
          <Link href="/guides/transport/hokkaido-rail-pass" style={linkStyle}>Hokkaido Rail Pass guide</Link>.
          {" "}In Furano, <Link href="/guides/attractions/furano-lift-ticket" style={{ color: "var(--red)", fontWeight: 600 }}>Furano Ski Resort</Link> sells a one-day adult ticket at ¥9,000 from 5 December 2026 to 22 March 2027.
        </p>
      }
      faq={[
        {
          q: "How much is the Sapporo-Furano Area Pass?",
          a: `¥11,000 for adults and ¥5,500 for children aged 6 to 11 when bought before arrival; ¥12,000 and ¥6,000 at a JR Hokkaido station. Valid 4 consecutive days. JR Hokkaido, checked ${CHECKED}.`,
        },
        {
          q: "Is the Sapporo-Furano Area Pass worth it?",
          a: "Yes if the four days include a Sapporo–Furano return. JR Hokkaido puts that return via Asahikawa at ¥13,520 in normal fares, more than the ¥11,000 pass.",
        },
        {
          q: "Does the Sapporo-Furano Area Pass cover New Chitose Airport?",
          a: "Yes. JR Hokkaido lists New Chitose Airport among the places the pass connects, along with Sapporo, Otaru, Furano, Biei and Asahikawa.",
        },
        {
          q: "Can I reserve seats with the Sapporo-Furano Area Pass?",
          a: "Yes, ordinary reserved seats are included. Every JR Hokkaido limited express is reserved-only, so get a seat ticket before boarding.",
        },
        {
          q: "Does the pass cover the Sapporo subway?",
          a: "No. JR Hokkaido Bus, the Sapporo streetcar and the Sapporo subway are not covered.",
        },
      ]}
      related={[
        { href: "/guides/transport/sapporo-noboribetsu-area-pass", title: "Sapporo-Noboribetsu Area Pass 2026: Price, Area & Is It Worth It?" },
        { href: "/guides/transport/hokkaido-rail-pass", title: "Hokkaido Rail Pass" },
        { href: "/guides/attractions/furano-biei-tour", title: "Furano and Biei Tour" },
        { href: "/guides/attractions/sapporo-3-day-itinerary", title: "Sapporo 3 Day Itinerary" },
      ]}
      banner={{
        title: "Furano and Biei by train",
        desc: "Book ahead for the lower price, then collect the pass with your passport at the airport or Sapporo Station.",
        label: "View the Sapporo-Furano Area Pass →",
      }}
    />
  );
}
