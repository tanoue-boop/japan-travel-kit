import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { tempozanFerrisWheel, santaMariaDayCruise } from "../../../lib/klook-links";
import { legolandDiscoveryOsakaTicket, solaniwaOnsenTicket } from "../../../lib/klook-links-a35";

// Task jtk-20261209-A35 (day 13, run 28 Nov 2026). Every figure is from the centre's own pages, read by node fetch on 28 Nov 2026:
// legolanddiscoverycenter.com/osaka/tickets-passes/ (dated ticket, variable price, lowest 2,900, highest 3,300, for
// ages 3 and over, up to 31% off; buying by the day before saves up to 900; adults (16+) alone or children (15 and
// under) alone are not admitted; at busy times visits may be limited to about 3 hours; VR attraction 800 extra,
// weekdays 11:00-16:00, weekends 11:00-17:00; annual pass 6,000; Tempozan Marketplace 3F) and
// /osaka/en/plan/before-you-visit/opening-times/ (hours on 28 Nov 2026: 10:00-19:00). No Klook price (403).
const ROUTE = "/guides/attractions/legoland-discovery-center-osaka-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.legolanddiscoverycenter.com/osaka/tickets-passes/";
const HOURS = "https://www.legolanddiscoverycenter.com/osaka/en/plan/before-you-visit/opening-times/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function LegolandDiscoveryOsakaTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="LEGOLAND Discovery Center Osaka tickets"
      title="LEGOLAND Discovery Center Osaka Tickets 2026: Price & Rules"
      description="LEGOLAND Discovery Center Osaka 2026: dated tickets ¥2,900–3,300 online for ages 3+, up to ¥900 off if bought by the day before. Adults need a child."
      h1={<>LEGOLAND Discovery Center Osaka Tickets 2026: <br />Price &amp; Rules</>}
      subtitle="What the indoor LEGO attraction at Tempozan costs, why booking the day before matters, and the rule that adults must come with a child."
      badges={[`Checked ${CHECKED}`, "From ¥2,900", "Ages 3+"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            <strong>A dated online ticket for LEGOLAND Discovery Center Osaka is ¥2,900 to ¥3,300</strong>, depending on
            the date and time, and the same price applies to everyone aged 3 and over. Buying by the day before saves up to
            ¥900 against the on-the-day price.
          </p>
          <p className={styles.bodyText}>
            <strong>Adults (16 and over) cannot enter without a child, and children (15 and under) cannot enter without an
            adult.</strong> It is on the 3rd floor of Tempozan Marketplace; on 28 November it was open 10 a.m. to 7 p.m. Klook
            sells a dated ticket. LEGOLAND Discovery Center Osaka, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: legolandDiscoveryOsakaTicket.url, label: "Check the LEGOLAND Osaka ticket on Klook →" }}
      stats={[
        { label: "Online, lowest", value: "¥2,900" },
        { label: "Online, highest", value: "¥3,300" },
        { label: "Book by the day before", value: "up to ¥900 off" },
        { label: "VR ride", value: "+¥800" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> book the day before for the lowest price, and plan on about three hours; it is an
          indoor half-day that pairs with the Kaiyukan area.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The time you pick is your entry time; you can still enter after it, but may wait at busy times. On weekends and
              holidays visits can be limited to about three hours. The VR ride is ¥800 extra, valid on the day only.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Dated ticket, online (age 3+)", "¥2,900–3,300"],
              ["VR attraction (extra)", "¥800"],
              ["Disability ticket (one carer free)", "¥1,600"],
              ["Annual pass", "¥6,000"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Prices vary by date and time. Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open?",
          body: (
            <p className={styles.bodyText}>
              Hours vary by date; on 28 November 2026 the centre was open from 10 a.m. to 7 p.m. The VR ride runs 11 a.m. to 4
              p.m. on weekdays and 11 a.m. to 5 p.m. on weekends and holidays. Check the official hours page for your date.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: legolandDiscoveryOsakaTicket.url, label: "Book LEGOLAND Discovery Center Osaka on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same day: more of Osaka Bay",
        intro: "Tempozan is the Osaka Bay waterfront, so the centre pairs with these.",
        tours: [tempozanFerrisWheel, santaMariaDayCruise, solaniwaOnsenTicket],
      }}
      links={
        <p className={styles.bodyText}>
          For more with children in Osaka, see <Link href="/guides/attractions/kids-plaza-osaka-tickets" style={linkStyle}>Kids Plaza Osaka</Link> and
          <Link href="/guides/attractions/things-to-do-osaka" style={linkStyle}>things to do in Osaka</Link>. The aquarium next door is
          <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" style={linkStyle}>Kaiyukan</Link>; compare the
          <Link href="/guides/attractions/legoland-discovery-center-tokyo-tickets" style={linkStyle}>Tokyo centre</Link> and <Link href="/guides/attractions/legoland-japan-tickets" style={linkStyle}>LEGOLAND Japan</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is LEGOLAND Discovery Center Osaka?",
          a: `Dated online tickets are ¥2,900 to ¥3,300 depending on the date and time, the same for everyone aged 3 and over. Checked ${CHECKED}.`,
        },
        {
          q: "Can adults go without children?",
          a: "No. Adults aged 16 and over are not admitted without a child, and children aged 15 and under not without an adult.",
        },
        {
          q: "Is it cheaper to book ahead?",
          a: "Yes. The centre says buying by the day before saves up to ¥900.",
        },
        {
          q: "How long can I stay?",
          a: "On weekends, holidays and other busy days the centre may limit visits to about three hours.",
        },
        {
          q: "Where is it?",
          a: "On the 3rd floor of Tempozan Marketplace, next to the Kaiyukan aquarium on Osaka Bay.",
        },
      ]}
      related={[
        { href: "/guides/attractions/kids-plaza-osaka-tickets", title: "Kids Plaza Osaka Tickets" },
        { href: "/guides/attractions/legoland-discovery-center-tokyo-tickets", title: "LEGOLAND Discovery Center Tokyo" },
        { href: "/guides/attractions/legoland-japan-tickets", title: "LEGOLAND Japan Tickets" },
        { href: "/guides/attractions/things-to-do-osaka", title: "Things to Do in Osaka" },
      ]}
      banner={{
        title: "LEGO play, indoors, by Osaka Bay",
        desc: "A dated ticket for LEGOLAND Discovery Center Osaka.",
        label: "View the LEGOLAND Osaka ticket →",
      }}
    />
  );
}
