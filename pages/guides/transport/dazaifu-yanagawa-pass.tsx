import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import {
  dazaifuYanagawaTravelPass,
  yanagawaStrawberryDazaifuTour,
  teamlabForestFukuokaTicket,
  fukuokaTouristCityPass,
} from "../../../lib/klook-links";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Nishitetsu's own
// page, read by node fetch on 28 Nov 2026: ensen24.jp/kippu/en/dazaifu-yanagawa/ (linked
// from nishitetsu.jp/en/ticket/): Dazaifu & Yanagawa Sightseeing Ticket Pack = Nishitetsu
// train round trip Fukuoka (Tenjin) / Yakuin - Dazaifu - Yanagawa - back, in either order,
// plus a punting (river boat) ticket at Yanagawa Kanko Kaihatsu's Shogetsu boarding area;
// digital 3,620 yen adult / 1,810 child, paper at Fukuoka (Tenjin) and Yakuin 3,730 / 1,870;
// paper valid one month from purchase, digital 30 days; two days from first use; stopovers
// only at Dazaifu and Yanagawa; automatic gates cannot be used; boat registration closes at
// 15:00; one-way boat, back to the station by free shuttle, bus or taxi; 1 Dec - end Feb
// kotatsu boats except in rain or snow; Dazaifu and Yanagawa coupons.
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/transport/dazaifu-yanagawa-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.ensen24.jp/kippu/en/dazaifu-yanagawa/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function DazaifuYanagawaPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Dazaifu & Yanagawa Pass"
      title="Dazaifu & Yanagawa Pass 2026: Price, Boat Ride & Rules"
      description="Nishitetsu's Dazaifu & Yanagawa pack: trains from Tenjin to both towns plus the Yanagawa river boat, ¥3,620 digital or ¥3,730 paper, valid 2 days."
      h1={<>Dazaifu &amp; Yanagawa Pass 2026: <br />Price, Boat Ride &amp; Rules</>}
      subtitle="Nishitetsu's ticket pack from Fukuoka: what it includes, the digital and paper prices, the stopover rules and the winter kotatsu boats."
      badges={[`Checked ${CHECKED}`, "¥3,620 digital", "Fukuoka"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Dazaifu &amp; Yanagawa ticket pack covers <strong>Nishitetsu trains</strong> from Fukuoka (Tenjin) or
            Yakuin to Dazaifu, on to Yanagawa and back, in either order, <strong>plus the Yanagawa river boat</strong>.
            It is ¥3,620 for adults as a digital ticket (¥1,810 for children), or ¥3,730 (¥1,870) on paper at Tenjin
            and Yakuin.
          </p>
          <p className={styles.bodyText}>
            It is good for <strong>two days</strong> from first use, with stopovers only at Dazaifu and Yanagawa.
            Boat registration closes at 15:00. Klook sells the pass. Nishitetsu, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: dazaifuYanagawaTravelPass.url, label: "Check the Dazaifu & Yanagawa pass on Klook →" }}
      stats={[
        { label: "Adult (digital)", value: "¥3,620" },
        { label: "Adult (paper)", value: "¥3,730" },
        { label: "Valid", value: "2 days" },
        { label: "Boat check-in", value: "By 15:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> do Dazaifu in the morning and reach Yanagawa in time to register for the boat
          before 15:00. Don&apos;t get off anywhere else — the ticket becomes invalid.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Dazaifu & Yanagawa pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The pack also includes coupons for discounts in both towns, such as ¥100 off Dazaifu Amusement Park and
              at Rokkyu (steamed eel) in Yanagawa. A paper ticket is valid one month from purchase, a digital one 30
              days.
            </p>
          ),
          table: {
            head: ["Ticket", "Adult", "Child"],
            rows: [
              ["Digital ticket", "¥3,620", "¥1,810"],
              ["Paper ticket (Fukuoka (Tenjin) / Yakuin)", "¥3,730", "¥1,870"],
            ],
            note: (
              <>
                Nishitetsu prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price.
              </>
            ),
          },
        },
        {
          label: "Rules and the boat",
          title: "How does the ticket work?",
          body: (
            <p className={styles.bodyText}>
              Use it for two days including the first day of use, in either direction (Fukuoka → Dazaifu → Yanagawa →
              Fukuoka or the reverse). You may leave the station only at Dazaifu and Yanagawa; passing through the
              gates anywhere else, or returning to your starting station first, ends the ticket. The automatic gates
              do not take it, so show it to the staff. For the boat, stop at the punting information desk at
              Nishitetsu Yanagawa Station; boats leave from Yanagawa Kanko Kaihatsu&apos;s Shogetsu boarding area, run
              one way, and a free shuttle, bus or taxi takes you back. From 1 December to the end of February the
              boats have kotatsu heaters, except in rain or snow.{" "}
              <a href={OFFICIAL} target="_blank" rel="noopener" style={linkStyle}>Nishitetsu ticket page</a>.
            </p>
          ),
          ctas: [{ href: dazaifuYanagawaTravelPass.url, label: "Book the Dazaifu & Yanagawa pass on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Also around Fukuoka",
        intro: "For a guided version of the same day, or for the city itself on another day.",
        tours: [yanagawaStrawberryDazaifuTour, teamlabForestFukuokaTicket, fukuokaTouristCityPass],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2-day itinerary</Link>,
          the{" "}
          <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5-day itinerary</Link>, the{" "}
          <Link href="/guides/transport/fukuoka-tourist-city-pass" style={linkStyle}>Fukuoka Tourist City Pass</Link>{" "}
          and{" "}
          <Link href="/guides/attractions/yufuin-beppu-tour-from-fukuoka" style={linkStyle}>Yufuin and Beppu tours
          from Fukuoka</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Dazaifu & Yanagawa pass?",
          a: `¥3,620 for adults as a digital ticket or ¥3,730 on paper (children ¥1,810 / ¥1,870), including trains and the Yanagawa river boat. Checked ${CHECKED}.`,
        },
        {
          q: "How long is it valid?",
          a: "Two days including the first day of use. A paper ticket must be used within one month of purchase, a digital one within 30 days.",
        },
        {
          q: "Can I stop at other stations?",
          a: "No. Stopovers are allowed only at Dazaifu and Yanagawa; leaving the gates anywhere else makes the ticket invalid.",
        },
        {
          q: "When does boat registration close in Yanagawa?",
          a: "Registration for the river boat closes at 15:00, so plan to reach Yanagawa before then.",
        },
        {
          q: "Can I buy the Dazaifu & Yanagawa pass on Klook?",
          a: "Yes. Klook sells the pass; check the listing for how it is issued.",
        },
      ]}
      related={[
        { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2-Day Itinerary" },
        { href: "/guides/transport/fukuoka-tourist-city-pass", title: "Fukuoka Tourist City Pass" },
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5-Day Itinerary" },
        { href: "/guides/transport/sunq-pass", title: "SUNQ Pass" },
      ]}
      banner={{
        title: "Shrine town and canal town",
        desc: "Nishitetsu's Dazaifu & Yanagawa ticket pack.",
        label: "View the Dazaifu & Yanagawa pass →",
      }}
    />
  );
}
