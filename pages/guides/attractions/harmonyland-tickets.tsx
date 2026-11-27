import Link from "next/link";
import styles from "../../../styles/BestEsimJapan.module.css";
import ProductTicketGuide from "../../../components/ProductTicketGuide";
import { pageUpdated, type PageUpdated } from "../../../lib/page-dates";
import { checkedLabel } from "../../../lib/attraction-prices";
import { yufuinBeppuRopewayTour, jrKyushuRailPass } from "../../../lib/klook-links";
import { harmonylandTicket, sunqPassKyushu } from "../../../lib/klook-links-a35";

// Task jtk-20261204-A35 (day 8, run 28 Nov 2026). Every figure is from Sanrio Harmonyland's own site, read by node fetch on 28 Nov 2026 through the JSON
// its pages load: harmonyland.jp/wp/ticket (Day Passport 3,600 / 4,200 yen, under 4 free; Afternoon Passport
// from 14:00, online only, 2,200 / 2,800; student passport online 3,100 / 3,700; some attractions excluded) and
// the calendar feed /wp/?mc-api=json (December 2026: 10:00-17:00, closed 2-3, 9-10, 16-17 Dec; last entry one
// hour before closing, per the site's notice). The site lists two prices per ticket without saying which date
// gets which, so the page says "by date". No Klook price is printed.
const ROUTE = "/guides/attractions/harmonyland-tickets";
const CHECKED = checkedLabel("2026-11-28");
const OFFICIAL = "https://www.harmonyland.jp/ticket/";
const HOURS = "https://www.harmonyland.jp/";

export const getStaticProps = () => ({ props: { updated: pageUpdated(ROUTE) } });

const linkStyle = { color: "var(--red)", fontWeight: 600 } as const;

export default function HarmonylandTicketsPage({ updated }: { updated: PageUpdated }) {
  return (
    <ProductTicketGuide
      route={ROUTE}
      category={{ name: "Attractions", href: "/guides/attractions" }}
      crumb="Harmonyland Tickets"
      title="Harmonyland Tickets 2026: Price, Hours & Closed Days"
      description="Sanrio Harmonyland in Oita: Day Passport ¥3,600 or ¥4,200 by date, under-4s free. Open 10:00–17:00 in December 2026, closed some Wednesdays and Thursdays."
      h1={<>Harmonyland Tickets 2026: <br />Price, Hours &amp; Closed Days</>}
      subtitle="Sanrio's character park in Oita Prefecture: the passport prices, December opening days and how the online tickets work."
      badges={[`Checked ${CHECKED}`, "¥3,600 day passport", "Oita, Kyushu"]}
      updated={updated}
      answer={
        <>
          <p className={styles.bodyText}>
            A Harmonyland <strong>Day Passport is ¥3,600 or ¥4,200</strong>, depending on the date; children under 4
            go free. An Afternoon Passport, sold online only, lets you in from 14:00 for ¥2,200 or ¥2,800. Some
            attractions are not covered by the passport.
          </p>
          <p className={styles.bodyText}>
            In December 2026 the park opens <strong>10:00–17:00</strong> and is closed on 2–3, 9–10 and 16–17 December;
            last entry is one hour before closing. Klook sells a passport ticket. Sanrio Harmonyland, checked {CHECKED}.
          </p>
        </>
      }
      main={{ href: harmonylandTicket.url, label: "Check Harmonyland tickets on Klook →" }}
      stats={[
        { label: "Day Passport", value: "¥3,600 / ¥4,200" },
        { label: "Afternoon (online)", value: "¥2,200 / ¥2,800" },
        { label: "Hours (Dec)", value: "10:00–17:00" },
        { label: "Under 4", value: "Free" },
      ]}
      verdict={
        <>
          <strong>In short:</strong> check the calendar first; in December the park closes on some Wednesdays and
          Thursdays. From 18 December it opens every day to the end of the year.
        </>
      }
      sections={[
        {
          label: "Price",
          title: "How much is it?",
          body: (
            <p className={styles.bodyText} style={{ marginBottom: "1.25rem" }}>
              The park publishes two prices for each passport and sets the price by date. The student passport
              (junior high to university, online only) and the afternoon ticket are not sold at the park gate.
            </p>
          ),
          table: {
            head: ["Ticket", "Price"],
            rows: [
              ["Day Passport", "¥3,600 or ¥4,200"],
              ["Afternoon Passport (from 14:00, online only)", "¥2,200 or ¥2,800"],
              ["Student Passport (online only)", "¥3,100 or ¥3,700"],
              ["Under 4", "Free"],
            ],
            note: (
              <>
                Official prices, checked {CHECKED}.{" "}
                <a href={OFFICIAL} target="_blank" rel="noopener" style={{ color: "var(--text-muted)" }}>Official source</a>.{" "}
                Klook sells a passport at its own price; show the voucher at the gate.
              </>
            ),
          },
        },
        {
          label: "Hours and access",
          title: "When is it open?",
          body: (
            <p className={styles.bodyText}>
              December 2026: 10:00–17:00, closed on 2, 3, 9, 10, 16 and 17 December, then open every day from 18 to 31
              December. Last entry is one hour before closing. Check the park calendar for later months.{" "}
              <a href={HOURS} target="_blank" rel="noopener" style={linkStyle}>Official calendar</a>.
            </p>
          ),
          ctas: [{ href: harmonylandTicket.url, label: "Book Harmonyland on Klook →" }],
        },
      ]}
      sameDay={{
        heading: "Same trip: Beppu, Yufuin and the Kyushu passes",
        intro: "Harmonyland is in Oita, so it pairs with a day in Beppu or Yufuin and a bus or rail pass for the region.",
        tours: [sunqPassKyushu, yufuinBeppuRopewayTour, jrKyushuRailPass],
      }}
      links={
        <p className={styles.bodyText}>
          For the rest of the trip, see the <Link href="/guides/attractions/kyushu-5-day-itinerary" style={linkStyle}>Kyushu 5-day itinerary</Link>, the
          <Link href="/guides/attractions/yufuin-beppu-tour-from-fukuoka" style={linkStyle}>Yufuin and Beppu tour from Fukuoka</Link> and the
          <Link href="/guides/transport/sunq-pass" style={linkStyle}>SUNQ Pass</Link>. For the Tokyo park, see
          <Link href="/guides/attractions/sanrio-puroland-tickets" style={linkStyle}>Sanrio Puroland tickets</Link>.
          {" "}On the same trip to Oita, the <Link href="/guides/attractions/beppu-hells-tickets" style={{ color: "var(--red)", fontWeight: 600 }}>Hells of Beppu</Link> common ticket is ¥2,400 for adults and ¥1,200 for children.
        </p>
      }
      faq={[
        {
          q: "How much is Harmonyland?",
          a: `A Day Passport is ¥3,600 or ¥4,200 depending on the date; children under 4 are free. Checked ${CHECKED}.`,
        },
        {
          q: "What are the opening hours?",
          a: "In December 2026, 10:00–17:00, with last entry one hour before closing.",
        },
        {
          q: "Which days is Harmonyland closed in December?",
          a: "On 2, 3, 9, 10, 16 and 17 December 2026. It opens every day from 18 December to the end of the year.",
        },
        {
          q: "Is there a cheaper afternoon ticket?",
          a: "Yes. The Afternoon Passport admits you from 14:00 for ¥2,200 or ¥2,800, sold online only.",
        },
        {
          q: "Can I buy Harmonyland tickets on Klook?",
          a: "Yes. Klook sells a passport ticket; show the voucher at the gate.",
        },
      ]}
      related={[
        { href: "/guides/attractions/sanrio-puroland-tickets", title: "Sanrio Puroland Tickets" },
        { href: "/guides/attractions/kyushu-5-day-itinerary", title: "Kyushu 5-Day Itinerary" },
        { href: "/guides/transport/sunq-pass", title: "SUNQ Pass" },
        { href: "/guides/attractions/yufuin-beppu-tour-from-fukuoka", title: "Yufuin & Beppu Tour" },
      ]}
      banner={{
        title: "Sanrio's park in Kyushu",
        desc: "Day passport for Harmonyland, Oita.",
        label: "View Harmonyland tickets →",
      }}
    />
  );
}
