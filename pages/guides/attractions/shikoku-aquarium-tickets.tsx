import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { shikokuAquariumTicket, allShikokuRailPass, shodoshimaFerryTakamatsu, takamatsuCharterCarTour } from "../../../lib/klook-links-a35";

// Task jtk-20261208-A35 (day 12, run 28 Nov 2026). Every figure is from the aquarium's own pages, read by node fetch on 28 Nov 2026:
// shikoku-aquarium.jp/ticket/ (adult (high school / 16 and older) 2,600, elementary and junior high 1,400, infant 3+
// 700; with disability certificates 1,300 / 700 / 350; groups 2,340 / 1,260 / 630; closed 2-4 Feb 2027 for
// maintenance; address Hama Ichibancho 4, Utazu) and the top page (today's hours 9:00-18:00, last entry 17:30;
// notice of changed hours on 22 Dec 2026 for a private hire). No Klook price is printed (Klook answers 403).
const ROUTE = "/guides/attractions/shikoku-aquarium-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://shikoku-aquarium.jp/ticket/";
const HOURS = "https://shikoku-aquarium.jp/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function ShikokuAquariumTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Shikoku Aquarium tickets"
      title="Shikoku Aquarium Tickets 2026: Price, Hours & Closures"
      description="Shikoku Aquarium 2026: adults ¥2,600, elementary and junior high ¥1,400, ages 3+ ¥700. Open 9:00–18:00 (last entry 17:30); closed 2–4 February 2027."
      h1={<>Shikoku Aquarium Tickets 2026: <br />Price, Hours &amp; Closures</>}
      subtitle="What admission to the aquarium on the Kagawa shore costs, its opening hours, and the dates it is closed or changes hours."
      badges={[`Checked ${CHECKED}`, "Adults ¥2,600", "Open 9:00–18:00"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            Admission to the Shikoku Aquarium in Utazu, Kagawa is <strong>¥2,600 for adults</strong> (high school and 16 and
            older), ¥1,400 for elementary and junior high school students and ¥700 from age 3.
          </p>
          <p className={styles.bodyText}>
            It is open <strong>9 a.m. to 6 p.m.</strong> (last entry 5:30 p.m.). It is closed for maintenance from 2 to 4
            February 2027, and hours change on 22 December 2026 for a private event. Klook sells an admission ticket.
            Shikoku Aquarium, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: shikokuAquariumTicket.url, label: "Check the Shikoku Aquarium ticket on Klook →" }}
      stats={[
        { label: "Adult", value: "¥2,600" },
        { label: "Elementary/junior high", value: "¥1,400" },
        { label: "Age 3+", value: "¥700" },
        { label: "Hours", value: "9:00–18:00" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> one price all year; just avoid 2 to 4 February 2027 and check the changed hours on 22
          December 2026.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              Visitors with a disability certificate pay half (¥1,300, ¥700 and ¥350). Groups get a discount.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Adult (high school, 16 and older)", "¥2,600"],
              ["Elementary and junior high", "¥1,400"],
              ["Infant (3 and over)", "¥700"],
              ["With disability certificate, adult", "¥1,300"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells its ticket at its own price.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is the Shikoku Aquarium open?",
          body: (
            <p className={styles.bodyText}>
              The aquarium shows its hours as 9 a.m. to 6 p.m., with last entry at 5:30 p.m. It closes from 2 to 4 February 2027 for
              maintenance, and on 22 December 2026 the hours change because of a private hire.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: shikokuAquariumTicket.url, label: "Book the Shikoku Aquarium on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: more of Kagawa",
        intro: "Utazu is west of Takamatsu, the base for these.",
        tours: [allShikokuRailPass, shodoshimaFerryTakamatsu, takamatsuCharterCarTour],
      }}
      links={
        <p className={styles.bodyText}>
          For getting around Shikoku, see the <Link href="/guides/transport/all-shikoku-rail-pass" style={linkStyle}>All Shikoku Rail Pass</Link>. For other aquariums in
          western Japan, compare <Link href="/guides/attractions/osaka-aquarium-kaiyukan-tickets" style={linkStyle}>Osaka Aquarium Kaiyukan</Link> and
          <Link href="/guides/attractions/kyoto-aquarium-tickets" style={linkStyle}>Kyoto Aquarium</Link>.
        </p>
      }
      faq={[
        {
          q: "How much is the Shikoku Aquarium?",
          a: `Adults (high school and 16 and older) pay ¥2,600, elementary and junior high school students ¥1,400 and children from 3 ¥700. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "9:00 to 18:00, with last entry at 17:30.",
        },
        {
          q: "When is the Shikoku Aquarium closed?",
          a: "From 2 to 4 February 2027 for maintenance. Hours also change on 22 December 2026.",
        },
        {
          q: "Where is the Shikoku Aquarium?",
          a: "In Utazu, Kagawa Prefecture, on the Seto Inland Sea west of Takamatsu.",
        },
        {
          q: "Is there a discount for disabilities?",
          a: "Yes. With a disability certificate the price is ¥1,300 for adults, ¥700 for children and ¥350 for infants.",
        },
      ]}
      related={[
        { href: "/guides/transport/all-shikoku-rail-pass", title: "All Shikoku Rail Pass" },
        { href: "/guides/attractions/osaka-aquarium-kaiyukan-tickets", title: "Osaka Aquarium Kaiyukan" },
        { href: "/guides/attractions/kyoto-aquarium-tickets", title: "Kyoto Aquarium Tickets" },
        { href: "/guides/attractions/okinawa-churaumi-aquarium-tickets", title: "Okinawa Churaumi Aquarium" },
      ]}
      banner={{
        title: "An aquarium on the Seto Inland Sea",
        desc: "Admission to the Shikoku Aquarium in Kagawa.",
        label: "View the aquarium ticket →",
      }}
    />
  );
}
