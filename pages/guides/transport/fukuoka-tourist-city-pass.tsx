import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { fukuokaTouristCityPass, teamlabForestFukuokaTicket, dazaifuYanagawaTravelPass } from "../../../lib/klook-links";
import { marineWorldUminonakamichiTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261203-A35 (day 7, run 28 Nov 2026). Every figure is from Fukuoka City's
// official tourism site, read by node fetch on 28 Nov 2026 (yokanavi.com/en/tourist-city-pass/
// redirects to gofukuoka.jp/citypass.html, which nishitetsu.jp/en/ticket/ also links to):
// one-day unlimited rides on buses, trains, subways and ferries; Fukuoka City adult 2,500 yen,
// child 1,250; Fukuoka City + Dazaifu 2,800 / 1,400; not valid on the Dazaifu Liner bus
// "Tabito"; valid for one day only; only for overseas tourists on a short-stay visa, passport
// shown at the counter; digital version in an app available to visitors from South Korea,
// Taiwan and Thailand; sales points include the Tenjin and Hakata bus terminals, Fukuoka
// Airport bus terminals, Nishitetsu Fukuoka (Tenjin) Station, the subway customer centres at
// Tenjin and Hakata and the Hakata Station General Information Center; paper version: scratch
// off the date, show it to the bus driver when getting off and to station staff at the gate.
// No Klook price is printed (Klook answers with 403).
const ROUTE = "/guides/transport/fukuoka-tourist-city-pass";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://gofukuoka.jp/citypass.html";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function FukuokaTouristCityPassPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Transport", href: "/guides/transport" }}
      crumb="Fukuoka Tourist City Pass"
      title="Fukuoka Tourist City Pass 2026: Price, Dazaifu & How to Buy"
      description="Fukuoka Tourist City Pass: ¥2,500 for a day of buses, trains, subway and ferries, or ¥2,800 with Dazaifu. Who can buy it, where, and how to use it."
      h1={<>Fukuoka Tourist City Pass 2026: <br />Price, Dazaifu &amp; Where to Buy</>}
      subtitle="Fukuoka's one-day pass for overseas visitors: the city and Dazaifu versions, who can buy it, where to pick it up and how to use it on buses and trains."
      badges={[`Checked ${CHECKED}`, "From ¥2,500", "Fukuoka"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            The Fukuoka Tourist City Pass gives <strong>one day of unlimited rides</strong> on buses, trains,
            subways and ferries. The Fukuoka City version is <strong>¥2,500 for adults</strong> (¥1,250 for
            children); the version that adds Dazaifu is ¥2,800 (¥1,400). It is not valid on the Dazaifu Liner bus
            &quot;Tabito&quot;.
          </p>
          <p className={styles.bodyText}>
            Only overseas tourists on a short-stay visa can buy it, showing a passport at a counter such as Hakata
            Bus Terminal or Fukuoka Airport. Klook sells the pass. Fukuoka City, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: fukuokaTouristCityPass.url, label: "Check the Fukuoka Tourist City Pass on Klook →" }}
      stats={[
        { label: "Fukuoka City", value: "¥2,500" },
        { label: "+ Dazaifu", value: "¥2,800" },
        { label: "Child", value: "¥1,250 / ¥1,400" },
        { label: "Valid", value: "1 day" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> worth it on a day with several rides across the city, or with a Dazaifu trip for
          ¥300 more. Bring your passport to collect it.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is the Fukuoka Tourist City Pass?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Both versions are valid for one day. Holders also get discounts at listed facilities, such as Fukuoka
              City Museum. The Dazaifu Liner bus &quot;Tabito&quot; is not covered by either version.
            </p>
          ),
          table: {
            head: ["Version", "Adult", "Child"],
            rows: [
              ["Fukuoka City", "¥2,500", "¥1,250"],
              ["Fukuoka City + Dazaifu", "¥2,800", "¥1,400"],
            ],
            note: (
              <>
                Fukuoka City tourism prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.
                Klook sells the pass at its own price.
              </>
            ),
          },
        },
        {
          label: "Buying and using it",
          title: "Who can buy it and how do you use it?",
          body: (
            <p className={styles.bodyText}>
              The pass is only for overseas tourists staying in Japan on a short-stay visa; show your passport at the
              counter. Counters include the Nishitetsu Tenjin Expressway Bus Terminal, Hakata Bus Terminal, the
              Fukuoka Airport bus terminals, Nishitetsu Fukuoka (Tenjin) Station, the subway customer centres at
              Tenjin and Hakata, and the Hakata Station General Information Center. A digital version in an app is
              only for visitors from South Korea, Taiwan and Thailand. With the paper pass, scratch off the date, show
              it to the bus driver when you get off, and to station staff at the ticket gate.{" "}
              <a href={OFFICIAL} target="_blank" rel="noopener" style={linkStyle}>Official pass page</a>.
            </p>
          ),
          ctas: [{ href: fukuokaTouristCityPass.url, label: "Book the Fukuoka Tourist City Pass on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: Fukuoka and Dazaifu",
        intro: "Use the pass to reach the city's sights; for a longer Dazaifu and Yanagawa day, Nishitetsu's own ticket pack covers the boat too.",
        tours: [teamlabForestFukuokaTicket, marineWorldUminonakamichiTicket, dazaifuYanagawaTravelPass],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the{" "}
          <Link href="/guides/attractions/fukuoka-2-day-itinerary" style={linkStyle}>Fukuoka 2-day itinerary</Link>,{" "}
          <Link href="/guides/attractions/teamlab-fukuoka-tickets" style={linkStyle}>teamLab Fukuoka tickets</Link>,
          the{" "}
          <Link href="/guides/transport/dazaifu-yanagawa-pass" style={linkStyle}>Dazaifu &amp; Yanagawa pass</Link>{" "}
          and, for travel beyond the city, the{" "}
          <Link href="/guides/transport/jr-kyushu-rail-pass" style={linkStyle}>JR Kyushu Rail Pass</Link> and{" "}
          <Link href="/guides/transport/sunq-pass" style={linkStyle}>SUNQ Pass</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Fukuoka Tourist City Pass?",
          a: `¥2,500 for adults and ¥1,250 for children for Fukuoka City, or ¥2,800 and ¥1,400 including Dazaifu. Checked ${CHECKED}.`,
        },
        {
          q: "Does the Fukuoka Tourist City Pass cover Dazaifu?",
          a: "Only the Fukuoka City + Dazaifu version (¥2,800 for adults). Neither version covers the Dazaifu Liner bus \"Tabito\".",
        },
        {
          q: "Who can buy the pass?",
          a: "Overseas tourists staying in Japan on a short-stay visa, who must show their passport at the sales counter.",
        },
        {
          q: "Where can I buy it?",
          a: "At counters including Hakata Bus Terminal, the Fukuoka Airport bus terminals, Nishitetsu Fukuoka (Tenjin) Station and the Hakata Station General Information Center.",
        },
        {
          q: "Can I buy the Fukuoka Tourist City Pass on Klook?",
          a: "Yes. Klook sells the pass; check the listing for where to collect it.",
        },
      ]}
      related={[
        { href: "/guides/attractions/fukuoka-2-day-itinerary", title: "Fukuoka 2-Day Itinerary" },
        { href: "/guides/transport/dazaifu-yanagawa-pass", title: "Dazaifu & Yanagawa Pass" },
        { href: "/guides/transport/jr-kyushu-rail-pass", title: "JR Kyushu Rail Pass" },
        { href: "/guides/transport/sunq-pass", title: "SUNQ Pass" },
      ]}
      banner={{
        title: "One day around Fukuoka",
        desc: "The Fukuoka Tourist City Pass.",
        label: "View the Fukuoka Tourist City Pass →",
      }}
    />
  );
}
